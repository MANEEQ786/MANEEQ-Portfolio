/**
 * Strips common spoken name prefixes and normalises whitespace.
 * Does NOT invent spelling — the result must be confirmed by the user.
 */
export function normalizeSpokenName(input: string): string {
  return input
    .replace(/^my name is\s+/i, '')
    .replace(/^i am\s+/i, '')
    .replace(/^i'm\s+/i, '')
    .replace(/^this is\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}
