/**
 * Upwork freelancer profile via Apify talent search. Mirrors
 * scripts/refresh-upwork.mjs. Upwork has no public profile API and blocks
 * direct profile-URL scraping, so we search by name and match the username.
 *
 * Portrait handling (the Upwork CDN blocks hotlinking):
 *  - Production / Blob available → download and store in Blob; portraitFile is
 *    the Blob URL. We never write to public/ at runtime in production.
 *  - Local dev (no Blob) → write to public/upwork as before for convenience.
 * Preserves last-good: returns ok:false when the freelancer isn't found.
 */

import { getEnv, requireApifyToken } from './env';
import { fetchWithRetry, fetchJson } from './http';
import type { RefreshResult, UpworkSnapshot } from './types';
import { putBinary } from '@/lib/snapshot-store';

/* eslint-disable @typescript-eslint/no-explicit-any */

const BADGES: Record<string, string> = {
  top_rated_plus: 'Top Rated Plus',
  top_rated: 'Top Rated',
  hipo: 'Rising Talent',
};

const SKILL_OVERRIDES: Record<string, string> = {
  saas: 'SaaS', ai: 'AI', ui: 'UI', ux: 'UX', api: 'API', mvp: 'MVP',
};

const prettySkill = (s: string): string =>
  String(s)
    .split('-')
    .map((w) => SKILL_OVERRIDES[w.toLowerCase()] || w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

async function persistPortrait(
  portraitUrl: string,
): Promise<{ portraitFile: string; warning?: string }> {
  if (!portraitUrl) return { portraitFile: '' };

  try {
    const img = await fetchWithRetry(portraitUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.upwork.com/' },
      timeoutMs: 20_000,
      retries: 1,
    });
    const ct = img.headers.get('content-type') || '';
    const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg';
    const buf = Buffer.from(await img.arrayBuffer());

    // putBinary stores to /public on Hostinger (served statically, persistent
    // disk) or to Blob on Vercel — returning the right URL either way.
    const url = await putBinary(`upwork/portrait.${ext}`, buf, ct || 'image/jpeg');
    return { portraitFile: url };
  } catch (e) {
    // Card falls back to the remote portrait URL if we can't persist a copy.
    return {
      portraitFile: '',
      warning: `Portrait download failed: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}

export async function refreshUpwork(): Promise<RefreshResult<UpworkSnapshot>> {
  const fetchedAt = new Date().toISOString();
  const env = getEnv();

  try {
    const token = requireApifyToken(env);
    const { username, searchQuery, actor } = env.upwork;
    const url = `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${token}`;

    const src = await fetchJson<any[]>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery, maxItems: 20 }),
      timeoutMs: 120_000,
      retries: 1,
    });

    const list = Array.isArray(src) ? src : [];
    const f =
      list.find((x) => (x.profileUrl || '').toLowerCase().includes(username.toLowerCase())) || null;

    if (!f) {
      return {
        source: 'upwork',
        ok: false,
        fetchedAt,
        count: 0,
        error: `Could not find "${username}" in ${list.length} search results`,
      };
    }

    const badge =
      BADGES[f.topRatedPlusStatus] && f.topRatedPlusStatus === 'top_rated_plus'
        ? 'Top Rated Plus'
        : BADGES[f.topRatedStatus] || '';

    const portraitUrl = f.portraitUrl || '';
    const { portraitFile, warning } = await persistPortrait(portraitUrl);

    const data: UpworkSnapshot = {
      username,
      fetchedAt,
      profile: {
        name: `${(f.firstName || '').trim()} ${(f.lastName || '').trim()}`.trim(),
        title: f.title || '',
        description: f.description || '',
        portrait: portraitUrl,
        portraitFile,
        url: f.profileUrl || `https://www.upwork.com/freelancers/${username}`,
        hourlyRate: f.hourlyRate || 0,
        currency: f.currency || 'USD',
        badge,
        jobSuccessScore: f.jobSuccessScore || 0,
        totalEarnings: f.totalEarnings || 0,
        totalJobs: f.totalJobs || 0,
        totalHours: f.totalHours || 0,
        location: [f.city, f.country].filter(Boolean).join(', '),
        availabilityBadge: Boolean(f.hasAvailabilityBadge),
        skills: (Array.isArray(f.skills) ? f.skills : []).map(prettySkill),
      },
    };

    return { source: 'upwork', ok: true, fetchedAt, data, count: 1, warning };
  } catch (err) {
    return {
      source: 'upwork',
      ok: false,
      fetchedAt,
      count: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
