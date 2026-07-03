/**
 * Company-email validation — SERVER-ONLY authoritative checks.
 *
 * Layers on top of the client-safe sync checks:
 *   4. The full `disposable-email-domains` list (100k+ known temp domains).
 *   5. A real-time disposable API (debounce.io) — catches brand-new temp-mail
 *      domains that no static list knows about yet.
 *
 * The `server-only` import guarantees this (and the 100k-domain array it pulls
 * in) never ends up in a client bundle.
 */

import 'server-only';
import { promises as dns } from 'dns';
import disposableList from 'disposable-email-domains';
import {
  validateCompanyEmailSync,
  domainMatches,
  SMALL_DISPOSABLE_DOMAINS,
  type CompanyEmailResult,
} from './companyEmail';

// Full offline disposable set = maintained package + our small curated extras.
const DISPOSABLE_FULL = new Set<string>([
  ...(disposableList as string[]),
  ...SMALL_DISPOSABLE_DOMAINS,
]);

/**
 * Real-time disposable check via debounce.io's free API. Returns true when the
 * domain is a known disposable/temp-mail provider. Fails open (false) on any
 * network/parse error so a transient outage never blocks real users.
 */
async function isDisposableViaApi(email: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `https://disposable.debounce.io/?email=${encodeURIComponent(email)}`,
      { signal: controller.signal },
    );
    clearTimeout(timer);
    if (!res.ok) return false;
    const data = await res.json();
    return String(data?.disposable) === 'true';
  } catch {
    return false;
  }
}

/**
 * Whether the domain can receive email (has MX records, or an A-record fallback
 * per RFC 5321). Returns:
 *   true  — deliverable
 *   false — definitively NOT deliverable (NXDOMAIN / no records) → reject
 *   null  — could not determine (transient DNS error / timeout) → fail open
 *
 * This is what catches throwaway/fake domains like cadbec.com that no disposable
 * list knows about: a real company domain always accepts mail.
 */
async function domainDeliverable(domain: string): Promise<boolean | null> {
  const withTimeout = <T>(p: Promise<T>): Promise<T> =>
    Promise.race([
      p,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('dns-timeout')), 4000),
      ),
    ]);

  try {
    const mx = await withTimeout(dns.resolveMx(domain));
    if (Array.isArray(mx) && mx.length > 0) return true;
    // No MX → fall back to an A record (RFC allows mail to the A host).
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    // Domain doesn't exist or has no MX records at all → not deliverable.
    if (code === 'ENOTFOUND' || code === 'ENODATA') {
      // double-check via A record before rejecting
    } else {
      return null; // transient/unknown DNS issue → don't block the user
    }
  }

  try {
    const a = await withTimeout(dns.resolve(domain));
    return Array.isArray(a) && a.length > 0;
  } catch {
    return false;
  }
}

/**
 * Authoritative validation (all layers). Runs the synchronous checks first, then
 * the full offline disposable list, an MX/deliverability check, then the
 * real-time disposable API. Used by /api/validate-email and the server
 * lead/contact routes.
 */
export async function validateCompanyEmail(email: string): Promise<CompanyEmailResult> {
  const sync = validateCompanyEmailSync(email);
  if (!sync.valid) return sync;

  const domain = sync.domain ?? '';

  if (domainMatches(domain, DISPOSABLE_FULL)) {
    return { valid: false, reason: 'disposable', domain };
  }

  // Reject domains that can't receive mail (fake/throwaway like cadbec.com).
  const deliverable = await domainDeliverable(domain);
  if (deliverable === false) {
    return { valid: false, reason: 'undeliverable', domain };
  }

  if (await isDisposableViaApi(email)) {
    return { valid: false, reason: 'disposable', domain };
  }
  return sync;
}
