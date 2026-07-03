import { normalizeSpokenEmail, isValidEmail } from './normalizeSpokenEmail';

export interface ContactValidationResult {
  ok: boolean;
  errors: string[];
  data: { name: string; email: string };
}

export function validateVoiceContact(input: {
  name?: string;
  email?: string;
  confirmedByUser?: boolean;
}): ContactValidationResult {
  const name = String(input.name ?? '').trim();
  const email = normalizeSpokenEmail(String(input.email ?? ''));
  const errors: string[] = [];

  if (!name || name.length < 2 || name.length > 80) {
    errors.push('Name must be between 2 and 80 characters.');
  }
  if (!isValidEmail(email)) {
    errors.push('Email is invalid.');
  }
  if (input.confirmedByUser !== true) {
    errors.push('User must confirm name and email before saving or booking.');
  }

  return { ok: errors.length === 0, errors, data: { name, email } };
}
