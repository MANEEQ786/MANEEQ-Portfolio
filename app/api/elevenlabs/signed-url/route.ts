import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/elevenlabs/signed-url?locale=en
 *
 * Generates a signed ElevenLabs Conversational AI session URL.
 * Keeps the API key server-side — never exposed to the browser.
 */
export async function GET(req: NextRequest) {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const locale = req.nextUrl.searchParams.get('locale') || 'en';

    const agentId = locale === 'ar'
        ? (process.env.ELEVENLABS_AGENT_ID_AR ?? process.env.ELEVENLABS_AGENT_ID_EN)
        : process.env.ELEVENLABS_AGENT_ID_EN;

    if (!apiKey || !agentId) {
        return NextResponse.json(
            { error: 'ElevenLabs credentials not configured' },
            { status: 500 },
        );
    }

    const res = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${encodeURIComponent(agentId)}`,
        { headers: { 'xi-api-key': apiKey } },
    );

    if (!res.ok) {
        const body = await res.text();
        console.error('[ElevenLabs] Failed to get signed URL:', res.status, body);
        return NextResponse.json({ error: 'Failed to generate session token' }, { status: 502 });
    }

    const data = await res.json();
    if (!data.signed_url) {
        return NextResponse.json({ error: 'No signed URL returned from ElevenLabs' }, { status: 502 });
    }

    return NextResponse.json({ signed_url: data.signed_url });
}
