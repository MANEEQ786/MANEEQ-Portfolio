/**
 * Fetch helpers for the refresh modules: per-request timeout via AbortController,
 * plus retry with exponential backoff for transient failures. Auth failures
 * (401/403) are never retried — retrying a bad token just wastes time.
 */

export class HttpError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string) {
    super(`HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

export interface FetchOptions extends RequestInit {
  /** Per-attempt timeout in ms (default 30s). */
  timeoutMs?: number;
  /** Number of retries after the first attempt (default 2). */
  retries?: number;
  /** Base backoff in ms; doubles each retry (default 800ms). */
  backoffMs?: number;
}

const isAuthStatus = (s: number) => s === 401 || s === 403;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * fetch() with timeout + retry. Throws HttpError on non-OK responses and the
 * underlying error if the network fails after all retries.
 */
export async function fetchWithRetry(
  url: string,
  { timeoutMs = 30_000, retries = 2, backoffMs = 800, ...init }: FetchOptions = {},
): Promise<Response> {
  let lastErr: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      clearTimeout(timer);

      if (res.ok) return res;

      // Don't retry auth errors — surface immediately.
      if (isAuthStatus(res.status)) {
        throw new HttpError(res.status, await res.text().catch(() => ''));
      }
      // Retry other non-OK statuses (5xx, 429, etc.) if attempts remain.
      lastErr = new HttpError(res.status, await res.text().catch(() => ''));
    } catch (err) {
      clearTimeout(timer);
      // A thrown HttpError for auth must not be retried.
      if (err instanceof HttpError && isAuthStatus(err.status)) throw err;
      lastErr = err;
    }

    if (attempt < retries) await sleep(backoffMs * Math.pow(2, attempt));
  }

  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

/** Convenience: fetch + retry, returning parsed JSON. */
export async function fetchJson<T = unknown>(url: string, opts: FetchOptions = {}): Promise<T> {
  const res = await fetchWithRetry(url, opts);
  return (await res.json()) as T;
}
