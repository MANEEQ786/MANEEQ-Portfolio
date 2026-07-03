import { NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/services/calcom';

export async function GET() {
    try {
        // Start from tomorrow (full UTC day so Cal.com returns all PKT slots) and
        // search a wide horizon so we always surface the *next available* days —
        // if tomorrow is full we automatically roll to the day after, and beyond.
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
        tomorrow.setUTCHours(0, 0, 0, 0);

        const horizon = new Date(tomorrow);
        horizon.setUTCDate(horizon.getUTCDate() + 30); // look up to 30 days ahead

        const nowMs = now.getTime();
        // getAvailableSlots returns slots sorted earliest-first, so the first 3 are
        // always the soonest available — tomorrow's if open, otherwise the next days'.
        const slots = (await getAvailableSlots(tomorrow.toISOString(), horizon.toISOString()))
            .filter(s => new Date(s.start).getTime() > nowMs);

        // fallback = true when nothing is open tomorrow and we rolled to a later day
        const tomorrowEnd = new Date(tomorrow);
        tomorrowEnd.setUTCDate(tomorrowEnd.getUTCDate() + 1);
        const fallback = slots.length > 0 && new Date(slots[0].start).getTime() >= tomorrowEnd.getTime();

        const top4 = slots.slice(0, 3).map((slot, i) => {
            const d = new Date(slot.start);
            // Full label with year so the agent never hallucinates a wrong year
            const label = d.toLocaleString('en-US', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                hour: 'numeric', minute: '2-digit', hour12: true,
                timeZone: 'Asia/Karachi',
            }).replace(' at ', ' at ') + ' PKT';
            return { index: i + 1, label, iso: slot.start };
        });

        return NextResponse.json({ slots: top4, fallback });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[calcom/slots]', err);
        return NextResponse.json({ error: msg }, { status: 503 });
    }
}
