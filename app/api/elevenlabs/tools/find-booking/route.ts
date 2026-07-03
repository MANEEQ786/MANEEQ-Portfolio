import { NextRequest, NextResponse } from 'next/server';
import { findBookingByEmail } from '@/lib/services/calcom';

/**
 * POST /api/elevenlabs/tools/find-booking
 *
 * Looks up an existing booking by attendee email directly from Cal.com.
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

    const email = String(params.email ?? '').trim().toLowerCase();

    if (!email) {
        return NextResponse.json({
            result: 'Email is required to find an existing booking. Please ask the user for their email.',
        });
    }

    try {
        const calBooking = await findBookingByEmail(email);

        if (!calBooking) {
            return NextResponse.json({
                result: `No upcoming booking found for email "${email}". The user may have used a different email, or may not have a booking yet.`,
            });
        }

        const readableTime = new Date(calBooking.startTime).toLocaleString('en-GB', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Karachi',
        }) + ' (PKT)';

        return NextResponse.json({
            result: `Found booking for ${calBooking.attendeeName} (${email}). Current meeting: ${readableTime}. Booking ID: ${calBooking.bookingId}. Now call check_availability to show new slots, then call reschedule_booking with this booking_id and the chosen start_time.`,
        });
    } catch (err) {
        console.error('[tools/find-booking]', err);
        return NextResponse.json({
            result: 'Could not search for the booking due to a server error. Apologize and ask the user to try again.',
        });
    }
}
