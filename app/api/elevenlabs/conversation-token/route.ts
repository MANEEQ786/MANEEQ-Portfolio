import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/elevenlabs/conversation-token?locale=en
 *
 * Forward-looking route for ElevenLabs WebRTC mode (requires SDK >= 2.x).
 * Current production sessions still use /api/elevenlabs/signed-url.
 * Never exposes the API key to the browser.
 */
export async function GET(req: NextRequest) {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const locale = req.nextUrl.searchParams.get('locale') || 'en';

    const agentId =
        locale === 'ar'
            ? (process.env.ELEVENLABS_AGENT_ID_AR ?? process.env.ELEVENLABS_AGENT_ID_EN)
            : process.env.ELEVENLABS_AGENT_ID_EN;

    if (!apiKey || !agentId) {
        return NextResponse.json(
            { error: 'ElevenLabs credentials not configured' },
            { status: 500 },
        );
    }

    const url = new URL('https://api.elevenlabs.io/v1/convai/conversation/token');
    url.searchParams.set('agent_id', agentId);

    const res = await fetch(url.toString(), {
        headers: { 'xi-api-key': apiKey },
        cache: 'no-store',
    });

    if (!res.ok) {
        const body = await res.text();
        console.error('[ElevenLabs] Failed to get conversation token:', res.status, body);
        return NextResponse.json({ error: 'Failed to generate conversation token' }, { status: 502 });
    }

    const data = await res.json();
    if (!data.token) {
        return NextResponse.json({ error: 'No token returned from ElevenLabs' }, { status: 502 });
    }

    return NextResponse.json({ token: data.token });
}
