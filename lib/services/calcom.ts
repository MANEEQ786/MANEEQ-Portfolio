/**
 * Cal.com v2 API integration
 * Single-account booking: one API key, one event type.
 */

const CAL_API_BASE = 'https://api.cal.com/v2';

function getApiKey(): string {
    const key = process.env.CALCOM_API_KEY;
    if (!key) throw new Error('CALCOM_API_KEY is not configured');
    return key;
}

function getEventTypeId(): number {
    const id = process.env.CALCOM_EVENT_TYPE_ID;
    if (!id) throw new Error('CALCOM_EVENT_TYPE_ID is not configured');
    return parseInt(id, 10);
}

export interface TimeSlot {
    start: string;
}

export async function getAvailableSlots(dateFrom: string, dateTo: string): Promise<TimeSlot[]> {
    const apiKey = getApiKey();
    const eventTypeId = getEventTypeId();

    const params = new URLSearchParams({
        startTime: dateFrom,
        endTime: dateTo,
        eventTypeId: String(eventTypeId),
    });

    const res = await fetch(`${CAL_API_BASE}/slots/available?${params}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'cal-api-version': '2024-06-14',
        },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Cal.com slots error ${res.status}: ${body}`);
    }

    const json = await res.json();
    const slotsMap: Record<string, { time: string; available?: boolean }[]> =
        json.data?.slots ?? {};

    const slots: TimeSlot[] = [];
    for (const times of Object.values(slotsMap)) {
        for (const slot of times) {
            if (slot.available !== false) {
                slots.push({ start: slot.time });
            }
        }
    }

    return slots.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export interface BookingResult {
    bookingId: string;
    meetingLink: string;
    startTime: string;
}

export async function createBooking(data: {
    name: string;
    email: string;
    phone?: string;
    startTime: string;
    timeZone?: string;
}): Promise<BookingResult> {
    const apiKey = getApiKey();
    const eventTypeId = getEventTypeId();

    const res = await fetch(`${CAL_API_BASE}/bookings`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'cal-api-version': '2024-08-13',
        },
        body: JSON.stringify({
            start: data.startTime,
            eventTypeId,
            attendee: {
                name: data.name,
                email: data.email,
                timeZone: data.timeZone ?? 'Asia/Karachi',
                language: 'en',
            },
        }),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Cal.com booking error ${res.status}: ${body}`);
    }

    const json = await res.json();
    const booking = json.data ?? json;

    return {
        bookingId: String(booking.uid ?? booking.id ?? ''),
        meetingLink: booking.videoCallUrl ?? booking.meetingUrl ?? '',
        startTime: booking.start ?? data.startTime,
    };
}

export interface FoundBooking {
    bookingId: string;
    meetingLink: string;
    startTime: string;
    attendeeName: string;
}

export async function findBookingByEmail(email: string): Promise<FoundBooking | null> {
    const apiKey = getApiKey();

    const params = new URLSearchParams({
        attendeeEmail: email,
        status: 'upcoming',
    });

    const res = await fetch(`${CAL_API_BASE}/bookings?${params}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'cal-api-version': '2024-08-13',
        },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Cal.com find-booking error ${res.status}: ${body}`);
    }

    const json = await res.json();
    const bookings: Record<string, unknown>[] = json.data ?? [];

    if (bookings.length === 0) return null;

    const now = Date.now();
    const future = bookings
        .filter((b) => b.status !== 'cancelled' && new Date(String(b.start)).getTime() > now)
        .sort((a, b) => {
            const aCreated = new Date(String(a.createdAt ?? '1970-01-01')).getTime();
            const bCreated = new Date(String(b.createdAt ?? '1970-01-01')).getTime();
            return bCreated - aCreated;
        });

    const booking = future[0];
    if (!booking) return null;

    const attendees = (booking.attendees as Record<string, string>[] | undefined) ?? [];
    const attendee = attendees.find((a) => a.email?.toLowerCase() === email.toLowerCase());

    return {
        bookingId: String(booking.uid ?? booking.id ?? ''),
        meetingLink: String(booking.meetingUrl ?? booking.videoCallUrl ?? booking.location ?? ''),
        startTime: String(booking.start ?? ''),
        attendeeName: attendee?.name ?? String(booking.title ?? ''),
    };
}

export async function rescheduleBooking(bookingId: string, newStartTime: string): Promise<BookingResult> {
    const apiKey = getApiKey();

    const res = await fetch(`${CAL_API_BASE}/bookings/${encodeURIComponent(bookingId)}/reschedule`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'cal-api-version': '2024-08-13',
        },
        body: JSON.stringify({ start: newStartTime }),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Cal.com reschedule error ${res.status}: ${body}`);
    }

    const json = await res.json();
    const booking = json.data ?? json;

    return {
        bookingId: String(booking.uid ?? booking.id ?? bookingId),
        meetingLink: booking.videoCallUrl ?? booking.meetingUrl ?? '',
        startTime: booking.start ?? newStartTime,
    };
}
