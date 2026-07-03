/**
 * Orchestrates a full platform refresh:
 *  1. Acquire a best-effort lock (skip if another run holds it).
 *  2. Run sources sequentially (gentle on Apify rate limits). Blog runs after
 *     LinkedIn because it derives covers from the fresh LinkedIn posts.
 *  3. Persist only successful snapshots — never overwrite last-good with empty.
 *  4. Save refresh-status + an immutable history record.
 *  5. Revalidate the pages that read these snapshots.
 *  6. Always release the lock.
 */

import { revalidatePath } from 'next/cache';
import {
  acquireLock,
  releaseLock,
  getSnapshot,
  putSnapshot,
  putRefreshStatus,
  putRefreshHistory,
} from '@/lib/snapshot-store';
import { refreshGitHub } from './github';
import { refreshLinkedIn } from './linkedin';
import { refreshTwitter } from './twitter';
import { refreshUpwork } from './upwork';
import { refreshBlogImages } from './blog';
import type {
  LinkedInSnapshot,
  RefreshResult,
  RefreshSource,
  RefreshStatus,
  SnapshotKey,
  SourceStatus,
} from './types';

export const SCHEDULE_DESCRIPTION =
  'Monday, Wednesday & Friday at 2:00 PM PKT (09:00 UTC)';

const KEY_OF: Record<RefreshSource, SnapshotKey> = {
  github: 'github-profile',
  linkedin: 'linkedin-posts',
  twitter: 'twitter-posts',
  upwork: 'upwork-profile',
  blog: 'blog-images',
};

export interface RunRefreshSummary {
  ok: boolean;
  skipped?: boolean;
  reason?: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  schedule: string;
  scheduleDescription: string;
  sources: Record<string, SourceStatus>;
  savedKeys: SnapshotKey[];
  errors: { source: RefreshSource; error: string }[];
  warning?: string;
}

/**
 * Persist a source result if it succeeded; otherwise keep the last-good snapshot.
 * Returns the per-source status and whether a key was written.
 */
async function handleResult(
  result: RefreshResult,
  savedKeys: SnapshotKey[],
): Promise<SourceStatus> {
  const key = KEY_OF[result.source];

  if (result.ok && result.data) {
    await putSnapshot(key, result.data);
    savedKeys.push(key);
    return {
      ok: true,
      fetchedAt: result.fetchedAt,
      count: result.count,
      warning: result.warning,
    };
  }

  // Failed → do not overwrite. Note whether a previous good snapshot exists.
  const prev = await getSnapshot(key);
  return {
    ok: false,
    error: result.error,
    warning: result.warning,
    preservedLastGood: prev != null,
  };
}

export async function runRefresh(schedule = ''): Promise<RunRefreshSummary> {
  const startMs = Date.now();
  const startedAt = new Date(startMs).toISOString();

  const got = await acquireLock();
  if (!got) {
    const finishedAt = new Date().toISOString();
    return {
      ok: false,
      skipped: true,
      reason: 'Refresh already running',
      startedAt,
      finishedAt,
      durationMs: Date.now() - startMs,
      schedule,
      scheduleDescription: SCHEDULE_DESCRIPTION,
      sources: {},
      savedKeys: [],
      errors: [],
    };
  }

  const sources: Record<string, SourceStatus> = {};
  const savedKeys: SnapshotKey[] = [];
  const errors: { source: RefreshSource; error: string }[] = [];

  try {
    // Sequential to avoid Apify rate-limit collisions.
    const github = await refreshGitHub();
    sources.github = await handleResult(github, savedKeys);

    const linkedin = await refreshLinkedIn();
    sources.linkedin = await handleResult(linkedin, savedKeys);

    const twitter = await refreshTwitter();
    sources.twitter = await handleResult(twitter, savedKeys);

    const upwork = await refreshUpwork();
    sources.upwork = await handleResult(upwork, savedKeys);

    // Blog depends on LinkedIn — pass the fresh snapshot if we got one.
    const linkedinData = linkedin.ok ? (linkedin.data as LinkedInSnapshot) : null;
    const blog = await refreshBlogImages(linkedinData);
    sources.blog = await handleResult(blog, savedKeys);

    for (const [src, st] of Object.entries(sources)) {
      if (!st.ok && st.error) errors.push({ source: src as RefreshSource, error: st.error });
    }

    const finishedMs = Date.now();
    const finishedAt = new Date(finishedMs).toISOString();
    const anyOk = Object.values(sources).some((s) => s.ok);

    const status: RefreshStatus = {
      lastAttempt: startedAt,
      lastSuccessfulRefresh: anyOk ? finishedAt : null,
      durationMs: finishedMs - startMs,
      schedule,
      scheduleDescription: SCHEDULE_DESCRIPTION,
      sources: sources as RefreshStatus['sources'],
    };

    // If nothing succeeded this run, keep the previous lastSuccessfulRefresh.
    if (!anyOk) {
      const prev = await getSnapshot<RefreshStatus>('refresh-status');
      if (prev?.lastSuccessfulRefresh) status.lastSuccessfulRefresh = prev.lastSuccessfulRefresh;
    }

    await putRefreshStatus(status);
    await putRefreshHistory(status, startedAt);

    // Revalidate only after writes complete.
    if (savedKeys.length > 0) {
      revalidatePath('/');
      revalidatePath('/news');
      revalidatePath('/about');
    }

    const warning =
      errors.length && anyOk
        ? `${errors.length} source(s) failed; last-good snapshots preserved.`
        : undefined;

    return {
      ok: anyOk,
      startedAt,
      finishedAt,
      durationMs: finishedMs - startMs,
      schedule,
      scheduleDescription: SCHEDULE_DESCRIPTION,
      sources,
      savedKeys,
      errors,
      warning,
    };
  } finally {
    await releaseLock();
  }
}
