import { NextRequest, NextResponse } from 'next/server';
import { saveLead } from '@/lib/services/airtable';
import { normalizeSpokenEmail, isValidEmail } from '@/lib/voice/normalizeSpokenEmail';
import { normalizeSpokenName } from '@/lib/voice/normalizeName';
import { validateCompanyEmail } from '@/lib/validation/companyEmail.server';
import { voiceRejectionMessage } from '@/lib/validation/companyEmail';

export async function POST(req: NextRequest) {
    const secret = process.env.ELEVENLABS_TOOL_SECRET;
    if (secret && req.headers.get('x-tool-secret') !== secret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const params = (body.parameters && typeof body.parameters === 'object')
        ? body.parameters as Record<string, unknown>
        : body;

    const rawName  = String(params.full_name ?? params.fullName ?? '').trim();
    const rawEmail = String(params.email ?? '').trim();
    const confirmed = params.confirmed_by_user === true || params.confirmedByUser === true;

    const fullName = normalizeSpokenName(rawName);
    const email    = normalizeSpokenEmail(rawEmail).toLowerCase();

    if (!fullName || fullName.length < 2) {
        return NextResponse.json({
            result: 'Missing or invalid name. Please ask the user for their full name again.',
        });
    }
    if (!isValidEmail(email)) {
        return NextResponse.json({
            result: `"${rawEmail}" doesn't look like a valid email. Ask the user to type it in the input field or spell it slowly.`,
        });
    }
    const companyCheck = await validateCompanyEmail(email);
    if (!companyCheck.valid) {
        return NextResponse.json({
            result: voiceRejectionMessage(companyCheck.reason!) +
                ' Do NOT proceed to slots or booking until they provide a valid official company email.',
        });
    }
    if (!confirmed) {
        return NextResponse.json({
            result: 'User has not confirmed their details yet. Ask them to check the confirmation card on screen and click "Confirm Details" before continuing.',
        });
    }

    try {
        await saveLead({ name: fullName, email });

        return NextResponse.json({
            result: `Lead confirmed and saved for ${fullName}. Now ask if they want to book a demo meeting.`,
        });
    } catch (err) {
        console.error('[tools/collect-lead]', err);
        return NextResponse.json({
            result: 'Could not save lead due to a server error. Let the visitor know staff will follow up.',
        });
    }
}
