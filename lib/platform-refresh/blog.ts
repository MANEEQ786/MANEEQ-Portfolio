/**
 * Blog cover images. Mirrors scripts/refresh-blog.mjs: for each LinkedIn
 * newsletter edition, read the post's og:image / twitter:image. Depends on
 * LinkedIn posts, so the orchestrator runs it after refreshLinkedIn and passes
 * the fresh snapshot in. Preserves last-good: ok:false when 0 covers found.
 */

import { fetchWithRetry } from './http';
import { getSnapshot } from '@/lib/snapshot-store';
import type { BlogImages, LinkedInSnapshot, RefreshResult } from './types';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

const EDITION_RE = /newsletter|ai & data intelligence|data intelligence insight/i;

export async function refreshBlogImages(
  linkedinSnapshot?: LinkedInSnapshot | null,
): Promise<RefreshResult<BlogImages>> {
  const fetchedAt = new Date().toISOString();

  try {
    const snap =
      linkedinSnapshot ?? (await getSnapshot<LinkedInSnapshot>('linkedin-posts'));
    const posts = snap?.posts || [];

    const editions = posts.filter(
      (p) => p.type !== 'repost' && EDITION_RE.test(p.text || ''),
    );

    const out: BlogImages = {};
    for (const p of editions) {
      if (!p.url) continue;
      try {
        const res = await fetchWithRetry(p.url, {
          headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
          timeoutMs: 15_000,
          retries: 1,
        });
        const html = await res.text();
        const m =
          html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
          html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
        if (m) out[p.url] = m[1].replace(/&amp;/g, '&');
      } catch {
        // skip this edition's cover; others may still resolve
      }
    }

    if (Object.keys(out).length === 0) {
      return { source: 'blog', ok: false, fetchedAt, count: 0, error: 'Got 0 cover images' };
    }

    return { source: 'blog', ok: true, fetchedAt, data: out, count: Object.keys(out).length };
  } catch (err) {
    return {
      source: 'blog',
      ok: false,
      fetchedAt,
      count: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
