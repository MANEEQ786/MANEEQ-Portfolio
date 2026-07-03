import type { ContactPayload } from "@/types/contact";
import { validateCompanyEmailSync, formRejectionMessage } from "@/lib/validation/companyEmail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  data: ContactPayload;
}

/** Validate the contact form payload (mirrors the original contact.php fields). */
export function validateContact(input: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim();
  const phone = String(input.phone ?? "").trim();
  const subject = String(input.subject ?? "").trim();
  const message = String(input.message ?? "").trim();

  if (!name) errors.push("Please enter your name.");
  if (!email) {
    errors.push("Please enter your email.");
  } else if (!EMAIL_RE.test(email)) {
    errors.push("Please enter a valid email address.");
  } else {
    const company = validateCompanyEmailSync(email);
    if (!company.valid) {
      errors.push(formRejectionMessage(company.reason!));
    }
  }
  if (!message) errors.push("Please enter a message.");

  return {
    valid: errors.length === 0,
    errors,
    data: { name, email, phone, subject, message },
  };
}
