/**
 * X/Twitter posts via Apify. Mirrors scripts/refresh-twitter.mjs, including the
 * retry loop for the flaky actor that intermittently returns 0 tweets on HTTP
 * 200, and the GraphQL-object flattening. Preserves last-good on 0 posts.
 */

import { getEnv, requireApifyToken } from './env';
import { fetchWithRetry } from './http';
import type { RefreshResult, TwitterPost, TwitterSnapshot } from './types';

function relativeTime(dateStr?: string): string {
  const then = dateStr ? new Date(dateStr).getTime() : 0;
  if (!then) return '';
  const d = Math.floor((Date.now() - then) / 86_400_000);
  if (d < 1) return 'today';
  if (d < 7) return `${d} ${d === 1 ? 'day' : 'days'} ago`;
  if (d < 30) {
    const w = Math.floor(d / 7);
    return `${w} ${w === 1 ? 'week' : 'weeks'} ago`;
  }
  if (d < 365) {
    const mo = Math.floor(d / 30);
    return `${mo} ${mo === 1 ? 'month' : 'months'} ago`;
  }
  const y = Math.floor(d / 365);
  return `${y} ${y === 1 ? 'year' : 'years'} ago`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function pickText(node: any, legacy: any): string {
  const note = node?.note_tweet?.note_tweet_results?.result?.text;
  if (note) return note;
  return legacy?.full_text || legacy?.text || '';
}

function pickMedia(legacy: any): { type?: string; url?: string } | null {
  const list =
    (legacy?.extended_entities && legacy.extended_entities.media) ||
    (legacy?.entities && legacy.entities.media) ||
    [];
  const m = list[0];
  return m ? { type: m.type || 'photo', url: m.media_url_https || m.media_url || '' } : null;
}

function normUser(u: any, profile: string) {
  if (!u) return { name: '', handle: profile, picture: '', verified: false };
  const legacy = u.legacy || u;
  return {
    name: legacy.name || '',
    handle: legacy.screen_name || profile,
    picture: (legacy.profile_image_url_https || '').replace('_normal', '_400x400'),
    verified: Boolean(u.is_blue_verified || legacy.verified),
  };
}

export async function refreshTwitter(): Promise<RefreshResult<TwitterSnapshot>> {
  const fetchedAt = new Date().toISOString();
  const env = getEnv();

  try {
    const token = requireApifyToken(env);
    const { profile, actor, totalPosts, maxTries } = env.twitter;
    const url = `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${token}`;

    // The actor is flaky: same request intermittently returns 0 tweets on 200,
    // and twitterHandles mode is broken — pass the profile via startUrls.
    let src: any[] = [];
    for (let attempt = 1; attempt <= maxTries; attempt++) {
      const res = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startUrls: [`https://twitter.com/${profile}`], maxItems: totalPosts }),
        timeoutMs: 120_000,
        retries: 1,
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        src = data;
        break;
      }
    }

    const posts: TwitterPost[] = (Array.isArray(src) ? src : [])
      .filter((t) => t && t.id)
      .map((t) => {
        const rt = t.retweeted_status_result && t.retweeted_status_result.result;
        const isRepost = Boolean(rt);
        const legacy = isRepost ? rt.legacy || {} : t;
        const noteNode = isRepost ? rt : t;
        const user = isRepost
          ? rt.core && rt.core.user_result && rt.core.user_result.result
          : t.author;
        const author = normUser(user, profile);

        const restId = isRepost ? rt.rest_id : t.id;
        const link =
          author.handle && restId
            ? `https://x.com/${author.handle}/status/${restId}`
            : t.url || t.twitterUrl || '';

        const m = pickMedia(legacy);
        return {
          id: String(t.id),
          url: link,
          type: isRepost ? 'repost' : 'tweet',
          text: pickText(noteNode, legacy),
          date: t.created_at,
          relative: relativeTime(t.created_at),
          likes: Number(legacy.favorite_count || 0),
          retweets: Number(legacy.retweet_count || 0),
          replies: Number(legacy.reply_count || 0),
          views: Number((t.view_count_info && t.view_count_info.count) || 0),
          isReply: Boolean(!isRepost && t.in_reply_to_status_id_str),
          isPinned: false,
          author,
          media: m,
        };
      })
      .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    if (posts.length === 0) {
      return { source: 'twitter', ok: false, fetchedAt, count: 0, error: 'X returned 0 posts' };
    }

    const data: TwitterSnapshot = { profile, fetchedAt, posts };
    return { source: 'twitter', ok: true, fetchedAt, data, count: posts.length };
  } catch (err) {
    return {
      source: 'twitter',
      ok: false,
      fetchedAt,
      count: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
