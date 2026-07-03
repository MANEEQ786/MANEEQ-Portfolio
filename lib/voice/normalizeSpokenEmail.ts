/**
 * Converts common spoken email phrases into a normalized email string.
 * e.g. "hello at vision tact dot com" → "hello@visiontact.com"
 * Never auto-saves; always requires explicit user confirmation.
 */
const DIGIT_WORDS: Record<string, string> = {
  zero: '0', oh: '0', one: '1', two: '2', three: '3', four: '4',
  five: '5', six: '6', seven: '7', eight: '8', nine: '9',
};

export function normalizeSpokenEmail(input: string): string {
  let s = input.toLowerCase().trim();

  // Strip common spoken prefixes
  s = s
    .replace(/^my email( address)? is\s+/i, '')
    .replace(/^email( address)? is\s+/i, '')
    .replace(/^it('s| is)\s+/i, '');

  // Convert spoken digit words to numerals: "five nine three" → "5 9 3"
  // (spaces are collapsed below, yielding "593")
  s = s.replace(
    /\b(zero|oh|one|two|three|four|five|six|seven|eight|nine)\b/g,
    (m) => DIGIT_WORDS[m] ?? m,
  );

  // Convert spoken punctuation
  s = s
    .replace(/\s+at\s+/g, '@')
    .replace(/\s*\(at\)\s*/g, '@')
    .replace(/\s+dot\s+/g, '.')
    .replace(/\s*\(dot\)\s*/g, '.')
    .replace(/\s+underscore\s+/g, '_')
    .replace(/\s+dash\s+/g, '-')
    .replace(/\s+hyphen\s+/g, '-')
    .replace(/\s+plus\s+/g, '+')
    .replace(/,/g, '.')
    .replace(/\s+/g, '');

  return s;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
