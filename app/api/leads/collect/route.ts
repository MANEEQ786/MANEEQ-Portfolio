import { NextRequest, NextResponse } from 'next/server';
import { saveLead } from '@/lib/services/airtable';
import { sendEmail } from '@/lib/services/email';
import { teamLeadEmail } from '@/lib/services/emailTemplates';
import { normalizeSpokenEmail, isValidEmail } from '@/lib/voice/normalizeSpokenEmail';
import { normalizeSpokenName } from '@/lib/voice/normalizeName';
import { validateCompanyEmail } from '@/lib/validation/companyEmail.server';
import { voiceRejectionMessage } from '@/lib/validation/companyEmail';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const params = body.parameters ?? body;

        const rawName  = String(params.full_name ?? params.fullName ?? '').trim();
        const rawEmail = String(params.email ?? '').trim();
        const locale   = String(params.locale ?? body.locale ?? 'en').trim();

        const fullName = normalizeSpokenName(rawName);
        const email    = normalizeSpokenEmail(rawEmail).toLowerCase();

        if (!fullName || fullName.length < 2) {
            return NextResponse.json({ error: 'A valid full name is required.' }, { status: 400 });
        }
        if (!isValidEmail(email)) {
            return NextResponse.json({ error: `"${email}" is not a valid email address.` }, { status: 400 });
        }
        const companyCheck = await validateCompanyEmail(email);
        if (!companyCheck.valid) {
            return NextResponse.json(
                { error: voiceRejectionMessage(companyCheck.reason!), reason: companyCheck.reason },
                { status: 422 },
            );
        }

        await saveLead({ name: fullName, email });

        const companyEmail = process.env.EMAIL_ROUTING_BOOKING;
        if (companyEmail) {
            sendEmail(
                companyEmail,
                `New Voice Lead: ${fullName}`,
                teamLeadEmail({ name: fullName, email, locale }),
            ).catch((err: unknown) => console.error('[SMTP] lead notification failed:', err));
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[/api/leads/collect] error:', err);
        return NextResponse.json({ error: 'Failed to save lead data' }, { status: 500 });
    }
}
