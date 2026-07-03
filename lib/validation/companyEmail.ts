/**
 * Company-email validation — CLIENT-SAFE core.
 *
 * Only official company / work email addresses are accepted. This module holds
 * the lightweight checks (format, personal/free providers, fake/placeholder
 * domains, a small curated disposable list) plus the user-facing messages, so it
 * is safe to import into client components without bloating the bundle.
 *
 * The heavy, authoritative checks (the 100k+ `disposable-email-domains` list and
 * the real-time disposable API) live in `companyEmail.server.ts` and run only on
 * the server (exposed to the browser via /api/validate-email).
 */

export type EmailRejectReason =
  | 'invalid'
  | 'personal'
  | 'disposable'
  | 'fake'
  | 'undeliverable';

/** Free / personal mailbox providers — not company-owned. */
const PERSONAL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'ymail.com', 'rocketmail.com',
  'hotmail.com', 'hotmail.co.uk',
  'outlook.com', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me', 'pm.me',
  'aol.com', 'mail.com', 'email.com',
  'yandex.com', 'yandex.ru',
  'gmx.com', 'gmx.net',
  'zoho.com', 'zohomail.com',
]);

/** Obvious placeholder / fake / test / example domains. */
const FAKE_DOMAINS = new Set([
  'example.com', 'example.org', 'example.net',
  'test.com', 'test.org', 'dummy.com', 'fake.com',
  'company.com', 'yourcompany.com', 'mycompany.com',
  'domain.com', 'email.test', 'sample.com', 'demo.com',
]);

/** Small curated disposable set for the offline/client fallback. The full
 *  100k+ list is applied server-side in companyEmail.server.ts. */
export const SMALL_DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'yopmail.com', 'temp-mail.org', 'temp-mail.io',
  '10minutemail.com', 'guerrillamail.com', 'maildrop.cc', 'getnada.com',
  'nada.email', 'sharklasers.com', 'trashmail.com', 'throwawaymail.com',
  'dispostable.com', 'mintemail.com', 'fakeinbox.com', 'tempmail.com',
  'tempmailo.com', 'mohmal.com', 'mailnesia.com', 'spam4.me', 'adsprite.com',
]);

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface CompanyEmailResult {
  valid: boolean;
  reason?: EmailRejectReason;
  /** Domain extracted from the email (lowercased), when parseable. */
  domain?: string;
}

/** True when `domain` equals `blocked` or is a sub-domain of it. */
export function domainMatches(domain: string, blocked: Set<string>): boolean {
  if (blocked.has(domain)) return true;
  for (const b of blocked) {
    if (domain.endsWith('.' + b)) return true;
  }
  return false;
}

export function domainOf(email: string): string {
  const e = email.trim().toLowerCase();
  return e.slice(e.lastIndexOf('@') + 1);
}

/**
 * Synchronous validation (format + personal + fake + small disposable list).
 * No network, no heavy list — safe for the client. For the authoritative check
 * use the async `validateCompanyEmail` from companyEmail.server.ts.
 */
export function validateCompanyEmailSync(email: string): CompanyEmailResult {
  const normalized = (email ?? '').trim().toLowerCase();

  if (!EMAIL_RE.test(normalized)) {
    return { valid: false, reason: 'invalid' };
  }

  const domain = domainOf(normalized);

  if (domainMatches(domain, SMALL_DISPOSABLE_DOMAINS)) {
    return { valid: false, reason: 'disposable', domain };
  }
  if (domainMatches(domain, FAKE_DOMAINS)) {
    return { valid: false, reason: 'fake', domain };
  }
  if (domainMatches(domain, PERSONAL_DOMAINS)) {
    return { valid: false, reason: 'personal', domain };
  }

  return { valid: true, domain };
}

/** Spoken/agent-facing rejection script (matches the booking-agent persona). */
export function voiceRejectionMessage(reason: EmailRejectReason): string {
  switch (reason) {
    case 'personal':
      return 'That looks like a personal email. For a strategy call I can only use your official company email — could you share your work email, for example yourname@yourcompany.com?';
    case 'disposable':
      return 'That email doesn’t belong to a company — it looks like a temporary address. Please share your official working company email.';
    case 'fake':
      return 'That doesn’t look like a real company email. Please share your official working company email address.';
    case 'undeliverable':
      return 'That email doesn’t appear to belong to a company. Please share your official working company email address.';
    case 'invalid':
    default:
      return 'That doesn’t look like a valid email. Please share your official company email — not a Gmail, Yahoo, Hotmail, Outlook, or temporary email.';
  }
}

/** Short rejection message for the website contact form. */
export function formRejectionMessage(reason: EmailRejectReason): string {
  switch (reason) {
    case 'personal':
      return 'Please use your official company email address — free providers like Gmail, Yahoo, Hotmail or Outlook are not accepted.';
    case 'disposable':
      return 'Temporary or disposable email addresses are not accepted. Please use your official company email address.';
    case 'fake':
      return 'Please provide a real company email address, not a test or placeholder one.';
    case 'undeliverable':
      return 'That email domain can’t receive mail. Please use a valid company email address.';
    case 'invalid':
    default:
      return 'Please enter a valid email address.';
  }
}
