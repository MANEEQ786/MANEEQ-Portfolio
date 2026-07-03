import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getRefreshStatus } from '@/lib/snapshot-store';
import { SCHEDULE_DESCRIPTION } from '@/lib/platform-refresh/runRefresh';
import type { RefreshStatus, SourceStatus } from '@/lib/platform-refresh/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Strip raw error text for the public (unauthenticated) view. */
function sanitize(status: RefreshStatus) {
  const sources: Record<string, Omit<SourceStatus, 'error'> & { failed?: boolean }> = {};
  for (const [name, s] of Object.entries(status.sources)) {
    sources[name] = {
      ok: s.ok,
      fetchedAt: s.fetchedAt,
      count: s.count,
      warning: s.warning,
      preservedLastGood: s.preservedLastGood,
      failed: !s.ok,
    };
  }
  return {
    lastSuccessfulRefresh: status.lastSuccessfulRefresh,
    lastAttempt: status.lastAttempt,
    sources,
    nextSchedule: status.scheduleDescription || SCHEDULE_DESCRIPTION,
  };
}

/**
 * GET /api/cron/refresh-status
 * Authenticated (Bearer CRON_SECRET) → full status incl. sanitized error text.
 * Unauthenticated → public summary without raw error messages.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET ?? '';
  const auth = request.headers.get('authorization') ?? '';
  const authorized = secret.length > 0 && safeEqual(auth, `Bearer ${secret}`);

  const status = await getRefreshStatus();

  if (!status) {
    return NextResponse.json({
      lastSuccessfulRefresh: null,
      lastAttempt: null,
      sources: {},
      nextSchedule: SCHEDULE_DESCRIPTION,
      note: 'No refresh has run yet.',
    });
  }

  if (authorized) {
    return NextResponse.json({
      lastSuccessfulRefresh: status.lastSuccessfulRefresh,
      lastAttempt: status.lastAttempt,
      durationMs: status.durationMs,
      sources: status.sources,
      nextSchedule: status.scheduleDescription || SCHEDULE_DESCRIPTION,
    });
  }

  return NextResponse.json(sanitize(status));
}
