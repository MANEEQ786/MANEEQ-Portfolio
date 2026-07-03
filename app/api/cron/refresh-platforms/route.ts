import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { runRefresh } from '@/lib/platform-refresh/runRefresh';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** Constant-time string compare (avoids leaking secret length/contents). */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/**
 * GET /api/cron/refresh-platforms
 *
 * Invoked by Vercel Cron (Mon/Wed/Fri 09:00 UTC = 14:00 PKT). Vercel sends
 * `Authorization: Bearer ${CRON_SECRET}` automatically when CRON_SECRET is set.
 * Manual trigger:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://<domain>/api/cron/refresh-platforms
 * Local dev only: append ?manual=1 (no secret needed off-production).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET ?? '';
  const auth = request.headers.get('authorization') ?? '';
  const authorized = secret.length > 0 && safeEqual(auth, `Bearer ${secret}`);

  const url = new URL(request.url);
  const devManual =
    process.env.NODE_ENV !== 'production' && url.searchParams.get('manual') === '1';

  if (!authorized && !devManual) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  // Vercel exposes the matched cron expression on this header.
  const schedule = request.headers.get('x-vercel-cron-schedule') ?? '0 9 * * 1,3,5';

  try {
    const summary = await runRefresh(schedule);

    if (summary.skipped) {
      return NextResponse.json(summary, { status: 409 });
    }
    // 200 if anything succeeded; 207-ish semantics surfaced via `warning`.
    return NextResponse.json(summary, { status: summary.ok ? 200 : 502 });
  } catch (err) {
    // Never include token values in error output.
    const message = err instanceof Error ? err.message : 'Refresh failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
