import { NextRequest, NextResponse } from 'next/server';
import { validateCompanyEmail } from '@/lib/validation/companyEmail.server';
import {
  voiceRejectionMessage,
  formRejectionMessage,
} from '@/lib/validation/companyEmail';

// MX/DNS lookups need the Node.js runtime (not Edge).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/validate-email
 * Body: { email: string, context?: 'voice' | 'form' }
 *
 * Authoritative company-email check (offline lists + real-time disposable API).
 * Returns { valid, reason?, message? }. `message` is tailored to the context.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* empty body → treated as invalid below */
  }

  const email = String(body.email ?? '').trim();
  const context = body.context === 'form' ? 'form' : 'voice';

  const result = await validateCompanyEmail(email);

  if (result.valid) {
    return NextResponse.json({ valid: true });
  }

  const message =
    context === 'form'
      ? formRejectionMessage(result.reason!)
      : voiceRejectionMessage(result.reason!);

  return NextResponse.json({ valid: false, reason: result.reason, message });
}
