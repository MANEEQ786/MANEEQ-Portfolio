import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/services/calcom';

/**
 * POST /api/elevenlabs/tools/check-availability
 *
 * ElevenLabs server tool — returns available Cal.com slots for the next 7 days.
 */
export async function POST(req: NextRequest) {
    const secret = process.env.ELEVENLABS_TOOL_SECRET;
    if (secret && req.headers.get('x-tool-secret') !== secret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now  = new Date();
    const from = now.toISOString();
    const to   = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    try {
        const slots = await getAvailableSlots(from, to);

        if (slots.length === 0) {
            return NextResponse.json({
                result: 'No available slots found in the next 30 days. Apologize and ask if the visitor wants to be contacted manually.',
            });
        }

        const top = slots.slice(0, 3);
        const lines = top.map((s, i) => {
            const human = new Date(s.start).toLocaleString('en-GB', {
                weekday: 'short', day: 'numeric', month: 'short',
                hour: 'numeric', minute: '2-digit', hour12: true,
                timeZone: 'Asia/Karachi',
            });
            return `${i + 1}. ${human} | start_time="${s.start}"`;
        });

        return NextResponse.json({
            result: `Available slots (use start_time exactly as shown when calling book_meeting):\n${lines.join('\n')}`,
        });
    } catch (err) {
        console.error('[tools/check-availability]', err);
        return NextResponse.json({
            result: 'Could not check availability right now. Apologize and ask if the visitor wants to be contacted manually.',
        });
    }
}
