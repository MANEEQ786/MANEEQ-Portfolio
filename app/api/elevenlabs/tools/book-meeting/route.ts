import { NextRequest, NextResponse } from 'next/server';
import { saveLead, findLeadByEmail, updateLead } from '@/lib/services/airtable';
import { createBooking } from '@/lib/services/calcom';
import { sendEmail } from '@/lib/services/email';
import { userMeetingEmail, teamMeetingEmail } from '@/lib/services/emailTemplates';
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

    const rawName   = String(params.name ?? '').trim();
    const rawEmail  = String(params.email ?? '').trim();
    const startTime = String(params.start_time ?? '').trim();
    const phone     = String(params.phone ?? '').trim();
    const locale    = String(params.locale ?? body.locale ?? 'en').trim();

    const name  = normalizeSpokenName(rawName);
    const email = normalizeSpokenEmail(rawEmail).toLowerCase();

    if (!name || name.length < 2) {
        return NextResponse.json({
            result: 'Missing or invalid name. Please collect the full name before booking.',
        });
    }
    if (!isValidEmail(email)) {
        return NextResponse.json({
            result: `"${rawEmail}" is not a valid email address. Ask the user to type or spell it again.`,
        });
    }
    const companyCheck = await validateCompanyEmail(email);
    if (!companyCheck.valid) {
        return NextResponse.json({
            result: voiceRejectionMessage(companyCheck.reason!) +
                ' Do NOT book the meeting until they provide a valid official company email.',
        });
    }
    if (!startTime) {
        return NextResponse.json({
            result: 'Missing start_time. Call check_availability first to get valid slots.',
        });
    }

    const parsedStart = new Date(startTime);
    if (isNaN(parsedStart.getTime())) {
        return NextResponse.json({
            result: `"${startTime}" is not a valid date. Use the exact start_time value from check_availability.`,
        });
    }
    if (parsedStart.getTime() < Date.now() - 5 * 60 * 1000) {
        return NextResponse.json({
            result: 'The chosen time is in the past. Call check_availability again and pick a future slot.',
        });
    }

    // Pre-save lead stub before Cal.com call
    let airtableRecordId: string | undefined;
    try {
        let existing = await findLeadByEmail(email);
        if (existing?.airtableRecordId) {
            airtableRecordId = existing.airtableRecordId;
        } else {
            await saveLead({ name, email });
            await new Promise(r => setTimeout(r, 1000));
            existing = await findLeadByEmail(email);
            airtableRecordId = existing?.airtableRecordId;
        }
    } catch (err) {
        console.error('[tools/book-meeting] Airtable pre-save failed:', err);
    }

    try {
        const booking = await createBooking({ name, email, phone, startTime });

        const formattedTime = new Date(booking.startTime).toLocaleString('en-GB', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Karachi',
        });
        const readableMeetingTime = `${formattedTime} (PKT)`;

        try {
            const updates = { meetingTime: readableMeetingTime, meetingLink: booking.meetingLink, bookingId: booking.bookingId };
            if (airtableRecordId) {
                await updateLead(airtableRecordId, updates);
            } else {
                const existing = await findLeadByEmail(email);
                if (existing?.airtableRecordId) {
                    await updateLead(existing.airtableRecordId, updates);
                } else {
                    await saveLead({ name, email, ...updates });
                }
            }
        } catch (err) {
            console.error('[tools/book-meeting] Airtable update failed:', err);
        }

        sendEmail(
            email,
            'Demo Meeting Confirmed | Saqib Masood',
            userMeetingEmail({ name, meetingTime: formattedTime, meetingLink: booking.meetingLink, locale }),
        ).catch((err: unknown) => console.error('[SMTP] user email failed:', err));

        const companyEmail = process.env.EMAIL_ROUTING_BOOKING;
        if (companyEmail) {
            sendEmail(
                companyEmail,
                `New Demo Booking - ${name}`,
                teamMeetingEmail({ name, email, meetingTime: formattedTime, meetingLink: booking.meetingLink, bookingId: booking.bookingId, locale }),
            ).catch((err: unknown) => console.error('[SMTP] team email failed:', err));
        }

        return NextResponse.json({
            result: `Meeting booked for ${readableMeetingTime}. Confirmation sent to ${email}.${booking.meetingLink ? ` Link: ${booking.meetingLink}` : ''}`,
        });
    } catch (err) {
        console.error('[tools/book-meeting]', err);
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('already has booking') || msg.includes('not available')) {
            return NextResponse.json({
                result: 'That slot is no longer available. Call check_availability again for fresh slots.',
            });
        }
        return NextResponse.json({
            result: `BOOKING FAILED: ${msg}. Do NOT tell the user the meeting was booked. Apologise and ask them to try again.`,
        });
    }
}
