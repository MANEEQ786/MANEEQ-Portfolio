/**
 * LinkedIn posts via Apify. Mirrors scripts/refresh-linkedin.mjs.
 * Preserves last-good: returns ok:false when 0 posts come back.
 */

import { getEnv, requireApifyToken } from './env';
import { fetchJson } from './http';
import type { LinkedInPost, LinkedInSnapshot, RefreshResult } from './types';

interface RawLinkedInPost {
  urn?: string;
  url?: string;
  post_type?: string;
  text?: string;
  author?: {
    first_name?: string;
    last_name?: string;
    headline?: string;
    profile_url?: string;
    profile_picture?: string;
    actor_type?: string;
  };
  media?: unknown;
  posted_at?: { date?: string; relative?: string };
  stats?: { total_reactions?: number };
}

export async function refreshLinkedIn(): Promise<RefreshResult<LinkedInSnapshot>> {
  const fetchedAt = new Date().toISOString();
  const env = getEnv();

  try {
    const token = requireApifyToken(env);
    const { profile, actor, totalPosts } = env.linkedin;
    const url = `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${token}`;

    const src = await fetchJson<RawLinkedInPost[]>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: profile, total_posts: totalPosts }),
      timeoutMs: 120_000,
      retries: 1,
    });

    const posts: LinkedInPost[] = (Array.isArray(src) ? src : []).map((p) => {
      const a = p.author || {};
      const m =
        p.media && typeof p.media === 'object' && !Array.isArray(p.media)
          ? (p.media as { type?: string; url?: string; thumbnail?: string })
          : null;
      const pa = p.posted_at || {};
      const st = p.stats || {};
      return {
        id: p.urn || '',
        url: p.url || '',
        type: p.post_type || '',
        text: p.text || '',
        date: pa.date,
        relative: (pa.relative || '').split('•')[0].trim(),
        reactions: Number(st.total_reactions || 0),
        author: {
          name: `${a.first_name || ''} ${a.last_name || ''}`.trim(),
          headline: a.headline || '',
          profileUrl: a.profile_url,
          picture: a.profile_picture,
          type: a.actor_type,
        },
        media: m ? { type: m.type, url: m.url, thumbnail: m.thumbnail } : null,
      };
    });

    if (posts.length === 0) {
      return {
        source: 'linkedin',
        ok: false,
        fetchedAt,
        count: 0,
        error: 'LinkedIn returned 0 posts',
      };
    }

    const data: LinkedInSnapshot = { profile, fetchedAt, posts };
    return { source: 'linkedin', ok: true, fetchedAt, data, count: posts.length };
  } catch (err) {
    return {
      source: 'linkedin',
      ok: false,
      fetchedAt,
      count: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
