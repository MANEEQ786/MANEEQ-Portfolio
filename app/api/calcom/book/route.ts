import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/services/calcom';
import { findLeadByEmail, updateLead, saveLead } from '@/lib/services/airtable';
import { sendEmail } from '@/lib/services/email';
import { teamMeetingEmail } from '@/lib/services/emailTemplates';

export async function POST(req: NextRequest) {
    let body: { name?: string; email?: string; slotIso?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { name, email, slotIso } = body;
    if (!name || !email || !slotIso) {
        return NextResponse.json({ error: 'Missing name, email, or slotIso' }, { status: 400 });
    }

    try {
        const booking = await createBooking({ name, email, startTime: slotIso });

        const formattedTime = new Date(booking.startTime).toLocaleString('en-GB', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true,
            timeZone: 'Asia/Karachi',
        });
        const readableMeetingTime = `${formattedTime} (PKT)`;

        // Update Airtable — find by email, update or create
        try {
            const existing = await findLeadByEmail(email);
            const updates = {
                meetingTime: readableMeetingTime,
                meetingLink: booking.meetingLink,
                bookingId: booking.bookingId,
            };
            if (existing?.airtableRecordId) {
                await updateLead(existing.airtableRecordId, updates);
            } else {
                await saveLead({ name, email, ...updates });
            }
        } catch (err) {
            console.error('[calcom/book] Airtable update failed:', err);
        }

        // Email to Saqib
        const companyEmail = process.env.EMAIL_ROUTING_BOOKING ?? 'saqib.masood@visiontact.com';
        sendEmail(
            companyEmail,
            `New Demo Booking — ${name}`,
            teamMeetingEmail({
                name, email,
                meetingTime: formattedTime,
                meetingLink: booking.meetingLink,
                bookingId: booking.bookingId,
            }),
        ).catch((err: unknown) => console.error('[SMTP] team email failed:', err));

        return NextResponse.json({
            bookingId: booking.bookingId,
            meetingLink: booking.meetingLink,
            startTime: booking.startTime,
            formattedTime: readableMeetingTime,
        });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[calcom/book]', err);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
