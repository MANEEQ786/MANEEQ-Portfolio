import { NextRequest, NextResponse } from 'next/server';
import { findLeadByEmail, updateLead } from '@/lib/services/airtable';
import { rescheduleBooking } from '@/lib/services/calcom';
import { sendEmail } from '@/lib/services/email';
import { userMeetingEmail, teamMeetingEmail } from '@/lib/services/emailTemplates';

/**
 * POST /api/elevenlabs/tools/reschedule-booking
 *
 * ElevenLabs server tool — reschedules an existing Cal.com booking,
 * updates Airtable, and sends confirmation emails.
 */
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

    const bookingId = String(params.booking_id ?? '').trim();
    const startTime = String(params.start_time ?? '').trim();
    const email     = String(params.email ?? '').trim().toLowerCase();
    const name      = String(params.name ?? '').trim();
    const locale    = String(params.locale ?? body.locale ?? 'en').trim();

    if (!bookingId || !startTime) {
        return NextResponse.json({
            result: 'Missing booking_id or start_time. Call find_booking first to get the booking_id, then pick a slot from check_availability.',
        });
    }

    const parsedStart = new Date(startTime);
    if (isNaN(parsedStart.getTime())) {
        return NextResponse.json({ result: `"${startTime}" is not a valid date. Use the exact start_time value from check_availability.` });
    }
    if (parsedStart.getTime() < Date.now() - 5 * 60 * 1000) {
        return NextResponse.json({ result: 'The chosen time is in the past. Please call check_availability again and pick a future slot.' });
    }

    try {
        const newBooking = await rescheduleBooking(bookingId, startTime);

        const formattedTime = new Date(newBooking.startTime).toLocaleString('en-GB', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Karachi',
        });
        const readableMeetingTime = formattedTime + ' (PKT)';

        if (email) {
            try {
                const record = await findLeadByEmail(email);
                if (record?.airtableRecordId) {
                    await updateLead(record.airtableRecordId, {
                        meetingTime: readableMeetingTime,
                        meetingLink: newBooking.meetingLink,
                        bookingId:   newBooking.bookingId,
                    });
                }
            } catch (airtableErr) {
                console.error('[tools/reschedule-booking] Airtable update failed:', airtableErr);
            }
        }

        if (email) {
            sendEmail(
                email,
                'Meeting Rescheduled | Saqib Masood',
                userMeetingEmail({ name: name || email, meetingTime: formattedTime, meetingLink: newBooking.meetingLink, locale }),
            ).catch((err: unknown) => console.error('[SMTP] Reschedule user email failed:', err));
        }

        const companyEmail = process.env.EMAIL_ROUTING_BOOKING;
        if (companyEmail) {
            sendEmail(
                companyEmail,
                `Booking Rescheduled - ${name || email}`,
                teamMeetingEmail({ name: name || email, email, meetingTime: formattedTime, meetingLink: newBooking.meetingLink, bookingId: newBooking.bookingId, locale }),
            ).catch((err: unknown) => console.error('[SMTP] Reschedule team email failed:', err));
        }

        return NextResponse.json({
            result: `Done! Meeting rescheduled to ${formattedTime}.${newBooking.meetingLink ? ` Meeting link: ${newBooking.meetingLink}` : ''} A confirmation email has been sent to ${email}.`,
        });
    } catch (err) {
        console.error('[tools/reschedule-booking]', err);
        const msg = err instanceof Error ? err.message : 'unknown error';

        if (msg.includes('already has booking') || msg.includes('not available')) {
            return NextResponse.json({
                result: 'BOOKING FAILED: That time slot is no longer available. Apologize and call check_availability again to get fresh available slots.',
            });
        }

        return NextResponse.json({
            result: `BOOKING FAILED: ${msg}. Do NOT tell the user the meeting was rescheduled. Apologize and ask them to try again.`,
        });
    }
}
