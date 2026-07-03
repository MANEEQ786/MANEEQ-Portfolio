'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    ConversationProvider,
    useConversation,
    useConversationClientTool,
} from '@elevenlabs/react';
import { requestProfessionalMicStream } from '@/lib/audio/audioConstraints';
import { measureNoiseLevel, type NoiseLevel } from '@/lib/audio/noisePreflight';
import { normalizeSpokenEmail } from '@/lib/voice/normalizeSpokenEmail';
import { normalizeSpokenName } from '@/lib/voice/normalizeName';
import { voiceRejectionMessage } from '@/lib/validation/companyEmail';

function isAskingForEmail(text: string): boolean {
    const lower = text.toLowerCase();
    const isConfirming =
        lower.includes('let me confirm') || lower.includes("i'll confirm") ||
        lower.includes('is that correct') || lower.includes('is that right') ||
        lower.includes('i have noted') || lower.includes("i've noted") ||
        lower.includes('saved your email') || lower.includes('got your email');
    if (isConfirming) return false;
    return lower.includes('email') && (text.includes('?') || lower.includes('please share') || lower.includes('please provide'));
}

interface BookingContactDraft { fullName: string; email: string; }

type OrbState = 'idle' | 'listening' | 'speaking';

function VoiceOrb({ state }: { state: OrbState }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef  = useRef(state);
    useEffect(() => { stateRef.current = state; }, [state]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const S  = 200;          // internal canvas resolution
        const cx = S / 2;
        const cy = S / 2;
        const R  = S / 2 - 1;

        // Thread definitions — colors, sizes, motion params
        const threads = [
            { color: '#ffffff',  alpha: 0.92, width: 1.2, freq: 0.030, amp: 14, wSpd: 1.2, fSpd: 0.22, fAmp: 18, phase: 0.00 },
            { color: '#d1fae5',  alpha: 0.78, width: 1.8, freq: 0.022, amp: 20, wSpd: 0.9, fSpd: 0.18, fAmp: 22, phase: 0.52 },
            { color: '#a7f3d0',  alpha: 0.72, width: 2.2, freq: 0.038, amp: 11, wSpd: 1.5, fSpd: 0.28, fAmp: 15, phase: 1.04 },
            { color: '#6ee7b7',  alpha: 0.85, width: 1.6, freq: 0.026, amp: 17, wSpd: 1.1, fSpd: 0.20, fAmp: 20, phase: 1.57 },
            { color: '#34d399',  alpha: 0.90, width: 2.5, freq: 0.042, amp: 10, wSpd: 1.8, fSpd: 0.32, fAmp: 12, phase: 2.09 },
            { color: '#10b981',  alpha: 0.82, width: 2.0, freq: 0.018, amp: 24, wSpd: 0.7, fSpd: 0.15, fAmp: 25, phase: 2.62 },
            { color: '#4ade80',  alpha: 0.80, width: 1.5, freq: 0.034, amp: 13, wSpd: 1.3, fSpd: 0.25, fAmp: 17, phase: 3.14 },
            { color: '#86efac',  alpha: 0.68, width: 1.3, freq: 0.050, amp:  8, wSpd: 2.0, fSpd: 0.38, fAmp: 10, phase: 3.67 },
            { color: '#ffffff',  alpha: 0.60, width: 1.0, freq: 0.028, amp: 16, wSpd: 1.0, fSpd: 0.17, fAmp: 20, phase: 4.19 },
            { color: '#bbf7d0',  alpha: 0.75, width: 1.9, freq: 0.020, amp: 22, wSpd: 0.8, fSpd: 0.14, fAmp: 28, phase: 4.71 },
            { color: '#22c55e',  alpha: 0.88, width: 2.8, freq: 0.044, amp: 10, wSpd: 1.6, fSpd: 0.30, fAmp: 14, phase: 5.24 },
            { color: '#ecfdf5',  alpha: 0.55, width: 1.1, freq: 0.032, amp: 15, wSpd: 1.4, fSpd: 0.22, fAmp: 18, phase: 5.76 },
        ].map((t, i) => ({
            ...t,
            baseY: (i / 11) * S * 0.80 + S * 0.10,   // spread evenly across sphere height
        }));

        // Hover position in canvas-space coords (null = not hovering)
        const hover = { x: null as number | null, y: null as number | null };
        const onMove = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect();
            hover.x = (e.clientX - r.left) * (S / r.width);
            hover.y = (e.clientY - r.top)  * (S / r.height);
        };
        const onLeave = () => { hover.x = null; hover.y = null; };
        canvas.addEventListener('mousemove', onMove);
        canvas.addEventListener('mouseleave', onLeave);

        let raf: number;
        let tick = 0;

        const draw = () => {
            const spd = stateRef.current === 'speaking' ? 3.4
                      : stateRef.current === 'listening' ? 2.4
                      : 1.4;
            const isHover = hover.x !== null;
            const hx = hover.x ?? cx;
            const hy = hover.y ?? cy;

            ctx.clearRect(0, 0, S, S);

            /* ── dark sphere background ── */
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.clip();

            const bg = ctx.createRadialGradient(cx, cy * 0.75, 0, cx, cy, R);
            bg.addColorStop(0, '#0d2416');
            bg.addColorStop(1, '#020a05');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, S, S);

            /* ── threads ── */
            threads.forEach(th => {
                const floatY = th.baseY + Math.sin(tick * th.fSpd * spd + th.phase) * th.fAmp;

                // Per-pixel Y with optional hover disturbance
                const getY = (px: number) => {
                    const base = floatY + th.amp * Math.sin(px * th.freq + tick * th.wSpd * spd);
                    if (!isHover) return base;

                    const dx = px - hx;
                    const dy = floatY - hy;

                    // Primary ripple: propagates outward from cursor X, decays with distance
                    const xDecay  = Math.exp(-Math.abs(dx) * 0.016);
                    const yDecay  = Math.exp(-Math.abs(dy) * 0.022);
                    const ripple  = 30 * xDecay * yDecay
                                  * Math.sin(Math.abs(dx) * 0.16 - tick * 10);

                    // Secondary chaos: high-freq noise overlaid on the disturbed zone
                    const chaosZone = Math.exp(-Math.abs(dx) * 0.008) * yDecay;
                    const chaos = 8 * chaosZone
                                * Math.sin(px * 0.7 + tick * 28 + th.phase * 2);

                    return base + ripple + chaos;
                };

                ctx.lineCap = 'round';

                // glow pass
                ctx.beginPath();
                ctx.lineWidth   = th.width * 4;
                ctx.strokeStyle = th.color;
                ctx.globalAlpha = th.alpha * 0.18;
                for (let px = 0; px <= S; px++) {
                    px === 0 ? ctx.moveTo(px, getY(px)) : ctx.lineTo(px, getY(px));
                }
                ctx.stroke();

                // core pass
                ctx.beginPath();
                ctx.lineWidth   = th.width;
                ctx.globalAlpha = th.alpha;
                for (let px = 0; px <= S; px++) {
                    px === 0 ? ctx.moveTo(px, getY(px)) : ctx.lineTo(px, getY(px));
                }
                ctx.stroke();

                // Extra bright thin highlight on the thread closest to cursor
                if (isHover && Math.abs(floatY - hy) < 18) {
                    ctx.beginPath();
                    ctx.lineWidth   = th.width * 0.6;
                    ctx.strokeStyle = '#ffffff';
                    ctx.globalAlpha = 0.55 * Math.exp(-Math.abs(floatY - hy) * 0.055);
                    for (let px = 0; px <= S; px++) {
                        px === 0 ? ctx.moveTo(px, getY(px)) : ctx.lineTo(px, getY(px));
                    }
                    ctx.stroke();
                }
            });

            ctx.globalAlpha = 1;

            /* ── water-surface shimmer layer visible only on hover ── */
            if (isHover) {
                const shimmerGrad = ctx.createLinearGradient(0, hy - 30, 0, hy + 30);
                shimmerGrad.addColorStop(0,   'transparent');
                shimmerGrad.addColorStop(0.35, `rgba(167,243,208,${0.06 + 0.04 * Math.sin(tick * 6)})`);
                shimmerGrad.addColorStop(0.5,  `rgba(255,255,255,${0.09 + 0.05 * Math.sin(tick * 9)})`);
                shimmerGrad.addColorStop(0.65, `rgba(167,243,208,${0.06 + 0.04 * Math.sin(tick * 6)})`);
                shimmerGrad.addColorStop(1,   'transparent');
                ctx.fillStyle   = shimmerGrad;
                ctx.globalAlpha = 1;
                ctx.fillRect(0, 0, S, S);
            }

            /* ── vignette ── */
            const vig = ctx.createRadialGradient(cx, cy, R * 0.40, cx, cy, R);
            vig.addColorStop(0, 'transparent');
            vig.addColorStop(1, 'rgba(0,0,0,0.80)');
            ctx.fillStyle   = vig;
            ctx.globalAlpha = 1;
            ctx.fillRect(0, 0, S, S);

            ctx.restore();

            /* ── specular highlight ── */
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.clip();
            const spec = ctx.createRadialGradient(cx * 0.60, cy * 0.52, 0, cx * 0.60, cy * 0.52, R * 0.52);
            spec.addColorStop(0, 'rgba(255,255,255,0.16)');
            spec.addColorStop(1, 'transparent');
            ctx.fillStyle = spec;
            ctx.fillRect(0, 0, S, S);
            ctx.restore();

            tick += 0.016;
            raf = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(raf);
            canvas.removeEventListener('mousemove', onMove);
            canvas.removeEventListener('mouseleave', onLeave);
        };
    }, []); // runs once; speed is read via ref

    return (
        <div style={{ position: 'relative', width: 160, height: 160, flexShrink: 0 }}>
            {/* Ambient outer glow */}
            <div style={{
                position: 'absolute', inset: '-20%',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(52,211,153,${state === 'speaking' ? 0.30 : state === 'listening' ? 0.18 : 0.09}) 0%, transparent 65%)`,
                filter: 'blur(18px)',
                animation: `siGlow ${state === 'speaking' ? 0.8 : state === 'listening' ? 1.6 : 3}s ease-in-out infinite alternate`,
                transition: 'background 0.6s',
                pointerEvents: 'none',
            }} />

            {/* Ripple rings when active */}
            {state !== 'idle' && [0, 1].map(i => (
                <div key={i} style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '50%',
                    border: '1px solid rgba(74,222,128,0.20)',
                    animation: `siRipple ${state === 'speaking' ? 1.1 : 1.9}s ease-out ${i * (state === 'speaking' ? 0.44 : 0.75)}s infinite`,
                    pointerEvents: 'none',
                }} />
            ))}

            <canvas
                ref={canvasRef}
                width={200}
                height={200}
                style={{
                    width: '100%', height: '100%',
                    borderRadius: '50%',
                    boxShadow: '0 0 0 1px rgba(52,211,153,0.14), 0 18px 50px rgba(0,0,0,0.60)',
                    display: 'block',
                    cursor: 'crosshair',
                }}
            />
        </div>
    );
}
interface CalSlot { index: number; label: string; iso: string; }

interface VoiceSessionProps {
    active: boolean;
    onStatusChange: (s: string) => void;
    onConnectionChange: (c: boolean) => void;
    onMessage: (text: string, role: 'ai' | 'user') => void;
    onMeetingBooked: (r: { meetingLink: string; startTime: string }) => void;
    onSendReady: (fn: (text: string) => void) => void;
    onEndReady: (fn: () => void) => void;
    onMuteReady: (fn: (muted: boolean) => void) => void;
    onContextualUpdateReady: (fn: (text: string) => void) => void;
    onAutoConfirm: (draft: BookingContactDraft) => void;
    onSlotsLoaded: (slots: CalSlot[]) => void;
    onSelectSlot: (index: number) => void;
    onPendingSlot: (index: number) => void;
    onNoiseLevel: (level: NoiseLevel) => void;
}

function VoiceSession({
    onStatusChange, onConnectionChange, onMessage, onMeetingBooked,
    onSendReady, onEndReady, onMuteReady, onContextualUpdateReady,
    onAutoConfirm, onSlotsLoaded, onSelectSlot, onPendingSlot, onNoiseLevel,
}: VoiceSessionProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conv = useConversation() as any;
    const { startSession, endSession, status, isSpeaking, sendUserMessage } = conv;
    const setMuted: ((muted: boolean) => void) | undefined = conv.setMuted;
    const sendContextualUpdate: ((text: string) => void) | undefined = conv.sendContextualUpdate;
    const started = useRef(false);
    const pendingSlotRef = useRef<number | null>(null);
    const localSlotsRef  = useRef<CalSlot[] | null>(null);
    // Hard gate: slots/booking are impossible until an email passes validation.
    const emailValidatedRef = useRef(false);
    const sendContextualUpdateRef = useRef<((text: string) => void) | undefined>(undefined);
    useEffect(() => { sendContextualUpdateRef.current = sendContextualUpdate; }, [sendContextualUpdate]);

    useEffect(() => { if (sendUserMessage) onSendReady(sendUserMessage); }, [sendUserMessage]); // eslint-disable-line
    useEffect(() => { onEndReady(endSession); }, [endSession]); // eslint-disable-line
    useEffect(() => { if (setMuted) onMuteReady(setMuted); }, [setMuted]); // eslint-disable-line
    useEffect(() => { if (sendContextualUpdate) onContextualUpdateReady(sendContextualUpdate); }, [sendContextualUpdate]); // eslint-disable-line
    useEffect(() => () => { endSession(); }, []); // eslint-disable-line

    // lead_info: auto-confirm immediately — user already said yes verbally
    useConversationClientTool('lead_info', async (params: Record<string, unknown>) => {
        const rawName  = String(params.Name ?? params.full_name ?? params.fullName ?? '').trim();
        const rawEmail = String(params.Email ?? params.email ?? '').trim();
        const fullName = normalizeSpokenName(rawName);
        const email    = normalizeSpokenEmail(rawEmail);
        if (!fullName || fullName.length < 2) {
            return 'Could not catch the full name clearly. Please ask the user for their full name again.';
        }
        if (!email || !email.includes('@')) {
            emailValidatedRef.current = false;
            return 'That email does not look valid. Ask the user to type it in the field below or spell it out letter by letter.';
        }

        // Authoritative company-email check via /api/validate-email (format,
        // personal/free, fake, disposable lists, MX deliverability, live API).
        // FAIL CLOSED: only a confirmed valid:true unlocks slots/booking. Any
        // rejection or verification failure blocks the flow.
        emailValidatedRef.current = false;
        try {
            const vr = await fetch('/api/validate-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, context: 'voice' }),
            });
            const vdata = await vr.json();
            if (!vdata.valid) {
                return String(vdata.message ?? voiceRejectionMessage('invalid')) +
                    ' Do NOT call get_slots or book anything until the user provides a valid official company email.';
            }
        } catch {
            return 'I could not verify that email right now. Please ask the user to repeat their official company email so I can check it again. Do NOT call get_slots yet.';
        }

        emailValidatedRef.current = true;
        onAutoConfirm({ fullName, email });
        return 'Contact details received and saved. Call the get_slots tool NOW to retrieve available meeting times.';
    });

    // get_slots: validates the email it is given, then fetches real calendar
    // slots. Validation lives HERE (not only in lead_info) so the company-email
    // rule is enforced on the tool the agent actually calls — no bypass, no loop.
    useConversationClientTool('get_slots', async (params: Record<string, unknown>) => {
        const rawEmail = String(params.email ?? params.Email ?? '').trim();
        const rawName  = String(params.name ?? params.Name ?? '').trim();
        const email    = normalizeSpokenEmail(rawEmail);
        const fullName = normalizeSpokenName(rawName);
        const hasEmail = Boolean(email && email.includes('@'));

        if (hasEmail) {
            // Authoritative company-email check (fail closed — only valid:true proceeds).
            try {
                const vr = await fetch('/api/validate-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, context: 'voice' }),
                });
                const vdata = await vr.json();
                if (!vdata.valid) {
                    emailValidatedRef.current = false;
                    return String(vdata.message ?? voiceRejectionMessage('invalid')) +
                        ' Ask the user for a valid official company email; do not show any times until then.';
                }
            } catch {
                emailValidatedRef.current = false;
                return 'I could not verify that email right now. Please ask the user to repeat their official company email so I can check it again.';
            }
            emailValidatedRef.current = true;
            if (fullName && fullName.length >= 2) onAutoConfirm({ fullName, email });
        } else if (!emailValidatedRef.current) {
            // No email given and none validated earlier (e.g. via lead_info).
            return 'I still need your official company email before I can show any times. Could you please share your work email?';
        }

        try {
            const res = await fetch('/api/calcom/slots');
            const data: { slots?: CalSlot[]; error?: string } = await res.json();
            if (data.error || !data.slots?.length) {
                return 'The calendar has no open times in the next 30 days. Apologise and tell the user Saqib will follow up by email to arrange a time.';
            }
            onSlotsLoaded(data.slots);
            localSlotsRef.current = data.slots;
            const slotLines = data.slots.map(s => `Option ${s.index}: ${s.label}`).join('. ');
            return (
                `Slots loaded. Say this EXACT script to the user, word for word — do NOT paraphrase or change any date or time:\n\n` +
                `"Here are the available meeting slots. ${slotLines}. Which one works best for you?"\n\n` +
                `IMPORTANT FLOW — follow this exactly:\n` +
                `1. Wait for the user to say a number or time.\n` +
                `2. As soon as the user picks a slot, call select_slot with the matching slot_index immediately — the tool will handle verbal confirmation.\n` +
                `3. If the user says NO or wants a different slot after being asked, call select_slot with the new slot_index.`
            );
        } catch {
            return 'Calendar unavailable. Apologise and tell the user Saqib will follow up by email.';
        }
    });

    // select_slot: first call → show UI confirmation card; second call (same index) → book
    useConversationClientTool('select_slot', async (params: Record<string, unknown>) => {
        const index = Number(params.slot_index ?? params.index ?? 1);

        if (pendingSlotRef.current === index) {
            // Agent confirmed (user said yes verbally) — book it
            pendingSlotRef.current = null;
            onSelectSlot(index);
            return `Booking confirmed. The meeting is being scheduled — confirmation will appear on screen shortly.`;
        }

        // First selection — surface the UI confirmation card and ask verbally
        pendingSlotRef.current = index;
        onPendingSlot(index);
        const slotLabel = localSlotsRef.current?.find(s => s.index === index)?.label ?? `Option ${index}`;

        return (
            `A confirmation card has appeared on screen. ` +
            `Ask the user verbally, word for word: "Are you sure you want a slot of ${slotLabel}? Please say yes to confirm or no to choose a different slot." ` +
            `Wait for their answer. If YES (yes / sure / go ahead / correct / sounds good / book it / confirm) → call select_slot with slot_index=${index} again to lock in the booking. ` +
            `If NO / different slot → call select_slot with the new slot_index.`
        );
    });

    useConversationClientTool('display_meeting_result', (params: Record<string, unknown>) => {
        onMeetingBooked({ meetingLink: String(params.meeting_link ?? ''), startTime: String(params.start_time ?? '') });
        return 'Meeting details displayed on screen.';
    });

    const init = useCallback(async () => {
        onStatusChange('Requesting mic...');
        let micStream: MediaStream | null = null;
        try {
            micStream = await requestProfessionalMicStream();
        } catch {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                s.getTracks().forEach(t => t.stop());
            } catch {
                onStatusChange('Mic denied. Please allow and retry.');
                onConnectionChange(false);
                return;
            }
        }
        if (micStream) {
            measureNoiseLevel(micStream, 400)
                .then(({ level }) => { onNoiseLevel(level); })
                .catch(() => {})
                .finally(() => { micStream!.getTracks().forEach(t => t.stop()); });
        }
        await new Promise(r => setTimeout(r, 450));
        onStatusChange('Connecting...');
        try {
            const res = await fetch('/api/elevenlabs/signed-url?locale=en');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const { signed_url } = await res.json();
            startSession({ signedUrl: signed_url });
        } catch (err) {
            onStatusChange(`Error: ${err instanceof Error ? err.message : 'unknown'}`);
            onConnectionChange(false);
        }
    }, [startSession, onStatusChange, onConnectionChange, onNoiseLevel]); // eslint-disable-line

    useEffect(() => { if (!started.current) { started.current = true; init(); } }, []); // eslint-disable-line

    useEffect(() => {
        if (status === 'connected') {
            onConnectionChange(true);
            onStatusChange(isSpeaking ? 'Agent speaking...' : 'Listening...');
        } else if (status === 'connecting') {
            onStatusChange('Connecting...');
        } else if (status === 'disconnected') {
            onConnectionChange(false);
            onStatusChange('Ready to connect');
        }
    }, [status, isSpeaking, onStatusChange, onConnectionChange]); // eslint-disable-line

    return null;
}

interface Msg { id: string; role: 'ai' | 'user'; text: string; }

export default function BookDemoButton() {
    const [active, setActive]         = useState(false);
    const [connected, setConnected]   = useState(false);
    const [status, setStatus]         = useState('');
    const [transcript, setTranscript] = useState<Msg[]>([]);
    const [meeting, setMeeting]       = useState<{ meetingLink: string; startTime: string } | null>(null);
    const [emailMode, setEmailMode]   = useState(false);
    const [emailSent, setEmailSent]   = useState(false);
    const [emailDraft, setEmailDraft] = useState('');
    const [pttMode, setPttMode]       = useState(false);
    const [pttActive, setPttActive]   = useState(false);
    const [noiseLevel, setNoiseLevel] = useState<NoiseLevel | null>(null);

    // Contact state
    const [contactDraft, setContactDraft]         = useState<BookingContactDraft | null>(null);
    const [contactConfirmed, setContactConfirmed] = useState(false);
    const [contactSaving, setContactSaving]       = useState(false);

    // Slot state
    const [slots, setSlots]               = useState<CalSlot[] | null>(null);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [slotsError, setSlotsError]     = useState('');
    const [pendingSlot, setPendingSlot]   = useState<CalSlot | null>(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError]     = useState('');

    // Refs for cross-closure access inside tool handlers
    const contactDraftRef = useRef<BookingContactDraft | null>(null);
    const slotsRef        = useRef<CalSlot[] | null>(null);
    useEffect(() => { contactDraftRef.current = contactDraft; }, [contactDraft]);
    useEffect(() => { slotsRef.current = slots; }, [slots]);

    const transcriptBoxRef        = useRef<HTMLDivElement>(null);
    const emailInputRef           = useRef<HTMLInputElement>(null);
    const sendUserInputRef        = useRef<(text: string) => void>(() => {});
    const endSessionRef           = useRef<() => void>(() => {});
    const setMutedRef             = useRef<(muted: boolean) => void>(() => {});
    const sendContextualUpdateRef = useRef<(text: string) => void>(() => {});
    const lastSentEmailRef        = useRef('');
    const msgCounter              = useRef(0);

    useEffect(() => {
        const box = transcriptBoxRef.current;
        if (box) box.scrollTop = box.scrollHeight;
    }, [transcript]);

    useEffect(() => {
        if (emailMode && !emailSent) setTimeout(() => emailInputRef.current?.focus(), 50);
    }, [emailMode, emailSent]);

    useEffect(() => {
        if (connected) setMutedRef.current(pttMode);
    }, [pttMode, connected]);

    const handleMessage = useCallback((text: string, role: 'ai' | 'user') => {
        if (role === 'user' && text.trim() === lastSentEmailRef.current.trim()) {
            lastSentEmailRef.current = '';
            return;
        }
        msgCounter.current += 1;
        setTranscript(prev => [...prev, { id: `${Date.now()}-${msgCounter.current}`, role, text }]);
        if (role === 'ai') {
            if (isAskingForEmail(text)) { setEmailMode(true); setEmailSent(false); setEmailDraft(''); }
            else if (emailMode) {
                const lower = text.toLowerCase();
                const movedPast = (lower.includes('great') || lower.includes('perfect') || lower.includes('thank') || lower.includes('noted')) && !lower.includes('email');
                if (movedPast) { setEmailMode(false); setEmailSent(false); }
            }
        }
    }, [emailMode]);

    const resetAll = useCallback(() => {
        setActive(false); setConnected(false); setStatus(''); setTranscript([]);
        setMeeting(null); setEmailMode(false); setEmailSent(false); setEmailDraft('');
        setPttMode(false); setPttActive(false); setNoiseLevel(null);
        setContactDraft(null); setContactConfirmed(false); setContactSaving(false);
        setSlots(null); setSlotsLoading(false); setSlotsError(''); setPendingSlot(null);
        setBookingLoading(false); setBookingError('');
        contactDraftRef.current = null; slotsRef.current = null;
    }, []);

    const handleEndCall = useCallback(() => { endSessionRef.current(); resetAll(); }, [resetAll]);

    // Opening a new session must start from a clean slate — otherwise the
    // previous booking's confirmation card (and old transcript/slots) would
    // still be shown while the new agent session is already speaking.
    const handleOpen = useCallback(() => { resetAll(); setActive(true); }, [resetAll]);

    // Auto-end the voice session 3 s after meeting is booked (keeps meeting card visible)
    useEffect(() => {
        if (!meeting) return;
        const timer = setTimeout(() => {
            endSessionRef.current();
            setActive(false);
            setConnected(false);
            setStatus('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [meeting]);

    const handleEmailSubmit = useCallback(() => {
        const email = emailDraft.trim();
        if (!email) return;
        const spokenText = `My email address is ${email}`;
        lastSentEmailRef.current = spokenText;
        sendUserInputRef.current(spokenText);
        msgCounter.current += 1;
        setTranscript(prev => [...prev, { id: `${Date.now()}-${msgCounter.current}`, role: 'user', text: email }]);
        setEmailDraft('');
        setEmailSent(true);
    }, [emailDraft]);

    const handlePttStart = useCallback(() => { setPttActive(true);  setMutedRef.current(false); }, []);
    const handlePttEnd   = useCallback(() => { setPttActive(false); setMutedRef.current(true);  }, []);

    // Called by lead_info client tool — save immediately, no button required
    const handleAutoConfirm = useCallback(async (draft: BookingContactDraft) => {
        setContactDraft(draft);
        contactDraftRef.current = draft;
        setContactConfirmed(false);
        setContactSaving(true);
        setSlotsError('');
        setSlotsLoading(true); // agent will call get_slots next; show loading now

        try {
            const res = await fetch('/api/elevenlabs/tools/collect-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ full_name: draft.fullName, email: draft.email, locale: 'en', confirmed_by_user: true }),
            });
            if (res.ok) setContactConfirmed(true);
        } finally {
            setContactSaving(false);
        }
    }, []);

    // Called by get_slots client tool — store slots so select_slot can look them up
    const handleSlotsLoaded = useCallback((newSlots: CalSlot[]) => {
        setSlots(newSlots);
        slotsRef.current = newSlots;
        setSlotsLoading(false);
    }, []);

    // Called by select_slot on first pick — shows the confirmation card
    const handlePendingSlot = useCallback((index: number) => {
        const slot = slotsRef.current?.find(s => s.index === index) ?? null;
        setPendingSlot(slot);
    }, []);

    // Called when user confirms (button click or agent second call) — books the meeting
    const handleSelectSlot = useCallback(async (index: number) => {
        setPendingSlot(null);
        const draft = contactDraftRef.current;
        const slotList = slotsRef.current;
        if (!draft || !slotList) return;

        const slot = slotList.find(s => s.index === index) ?? slotList[0];
        if (!slot) return;

        setBookingLoading(true);
        setBookingError('');
        try {
            const res = await fetch('/api/calcom/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: draft.fullName, email: draft.email, slotIso: slot.iso }),
            });
            const data: { bookingId?: string; meetingLink?: string; formattedTime?: string; error?: string } = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Booking failed');
            setSlots(null);
            setMeeting({ meetingLink: data.meetingLink ?? '', startTime: data.formattedTime ?? slot.label });
            sendContextualUpdateRef.current(
                `Meeting booked for ${data.formattedTime ?? slot.label}. ` +
                `Say ONLY: "Your meeting is confirmed! A confirmation email is on its way." ` +
                `Do NOT say anything else — no questions, no goodbye, just that one sentence. Then stop.`
            );
        } catch (err) {
            setBookingError(err instanceof Error ? err.message : 'Booking failed.');
            sendContextualUpdateRef.current(`Booking failed. Apologise and ask the user to choose a different slot.`);
        } finally {
            setBookingLoading(false);
        }
    }, []);

    const orbState: OrbState = !active ? 'idle' : status.toLowerCase().includes('speaking') ? 'speaking' : 'listening';

    const noiseBadgeColor = noiseLevel === 'noisy'
        ? { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626' }
        : { bg: '#fffbeb', border: '#fde68a', text: '#d97706' };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <style>{`
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

                /* Blob movement animations — each follows its own organic path */
                @keyframes siBlob1 {
                    0%,100% { transform: translate(4%,  8%) rotate(0deg)   scale(1);    }
                    25%     { transform: translate(-12%,-8%) rotate(45deg)  scale(1.14); }
                    50%     { transform: translate(10%,-14%) rotate(90deg)  scale(0.9);  }
                    75%     { transform: translate(8%,  12%) rotate(140deg) scale(1.07); }
                }
                @keyframes siBlob2 {
                    0%,100% { transform: translate(14%,-10%) rotate(0deg)    scale(1);   }
                    33%     { transform: translate(-9%,  12%) rotate(-55deg)  scale(1.11);}
                    66%     { transform: translate(6%,   14%) rotate(-110deg) scale(0.9); }
                }
                @keyframes siBlob3 {
                    0%,100% { transform: translate(-6%,-12%) scale(1);    }
                    25%     { transform: translate(22%,  4%) scale(1.22);  }
                    50%     { transform: translate(6%,  22%) scale(0.84);  }
                    75%     { transform: translate(-16%, 7%) scale(1.12);  }
                }
                @keyframes siBlob4 {
                    0%,100% { transform: translate(6%,-6%)  rotate(0deg)   scale(1);    }
                    35%     { transform: translate(-11%,13%) rotate(-85deg) scale(1.09); }
                    70%     { transform: translate(13%,  8%) rotate(-175deg)scale(0.93); }
                }
                @keyframes siBlob5 {
                    0%,100% { transform: translate(16%, 12%) scale(1);    }
                    33%     { transform: translate(-13%,-16%)scale(1.16);  }
                    66%     { transform: translate(9%,  -9%) scale(0.88);  }
                }

                /* Ambient glow breathe */
                @keyframes siGlow {
                    from { opacity:0.55; transform:scale(0.88); }
                    to   { opacity:1;    transform:scale(1.12); }
                }

                /* Ripple rings expanding outward */
                @keyframes siRipple {
                    0%   { transform:scale(1);   opacity:0.5; }
                    100% { transform:scale(2.4); opacity:0;   }
                }
            `}</style>

            <ConversationProvider
                onConnect={() => setConnected(true)}
                onDisconnect={() => { setConnected(false); setStatus('Ready to connect'); }}
                onError={(msg) => { setStatus(`Error: ${msg}`); setConnected(false); }}
                onMessage={(msg: { message: string; source?: string; role?: string }) => {
                    if (msg.message) {
                        const role = msg.role === 'agent' || msg.source === 'ai' ? 'ai' : 'user';
                        handleMessage(msg.message, role);
                    }
                }}
            >
                {active && (
                    <VoiceSession
                        active={active}
                        onStatusChange={setStatus}
                        onConnectionChange={setConnected}
                        onMessage={handleMessage}
                        onMeetingBooked={setMeeting}
                        onSendReady={fn => { sendUserInputRef.current = fn; }}
                        onEndReady={fn => { endSessionRef.current = fn; }}
                        onMuteReady={fn => { setMutedRef.current = fn; }}
                        onContextualUpdateReady={fn => { sendContextualUpdateRef.current = fn; }}
                        onAutoConfirm={handleAutoConfirm}
                        onSlotsLoaded={handleSlotsLoaded}
                        onSelectSlot={handleSelectSlot}
                        onPendingSlot={handlePendingSlot}
                        onNoiseLevel={setNoiseLevel}
                    />
                )}

                {/* ── Card ──────────────────────────────────────────── */}
                <div style={{
                    background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px',
                    display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.10)', overflow: 'hidden',
                }}>

                    {/* Header */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '20px 24px 16px', borderBottom: '1px solid #e5e7eb', flexShrink: 0,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                            <div style={{
                                width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                                background: connected ? '#14A800' : '#f3f4f6',
                                boxShadow: connected ? '0 0 14px rgba(20,168,0,0.25)' : 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
                            }}>
                                <i className="fa-solid fa-microphone" style={{ fontSize: '14px', color: connected ? '#fff' : '#9ca3af' }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>Talk to Saqib Masood</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px', flexWrap: 'wrap' }}>
                                    <div style={{
                                        width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                                        background: connected ? '#14A800' : active ? '#fbbf24' : '#d1d5db',
                                        animation: (active || connected) ? 'pulse 1.5s ease-in-out infinite' : 'none',
                                    }} />
                                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                                        {active ? (status || 'Connecting...') : 'Click "Book a Meeting" to start'}
                                    </span>
                                    {noiseLevel && noiseLevel !== 'quiet' && (
                                        <span style={{
                                            fontSize: '10px', padding: '2px 6px', borderRadius: '4px',
                                            background: noiseBadgeColor.bg, color: noiseBadgeColor.text,
                                            border: `1px solid ${noiseBadgeColor.border}`, fontWeight: 600, flexShrink: 0,
                                        }}>
                                            {noiseLevel === 'noisy' ? '⚠ Noisy room' : '⚡ Moderate noise'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '10px' }}>
                            {connected && (
                                <button title={pttMode ? 'Switch to always-on mic' : 'Switch to push-to-talk'} onClick={() => setPttMode(m => !m)} style={{
                                    padding: '6px 10px', borderRadius: '6px',
                                    border: `1.5px solid ${pttMode ? '#14A800' : '#d1d5db'}`,
                                    background: pttMode ? '#f0fdf4' : '#fff',
                                    color: pttMode ? '#14A800' : '#9ca3af',
                                    fontSize: '10px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em',
                                }}>PTT {pttMode ? 'ON' : 'OFF'}</button>
                            )}
                            {!active ? (
                                <button onClick={handleOpen} style={{
                                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                                    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                                    background: '#14A800', color: '#fff',
                                    boxShadow: '0 2px 8px rgba(20,168,0,0.30)',
                                    display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s',
                                }}>
                                    <i className="fa-solid fa-calendar-days" style={{ fontSize: '11px' }} />
                                    Book a Meeting
                                </button>
                            ) : (
                                <button onClick={handleEndCall} style={{
                                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                                    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                                    background: connected ? '#ef4444' : '#f3f4f6',
                                    color: connected ? '#fff' : '#374151',
                                    boxShadow: connected ? '0 2px 8px rgba(239,68,68,0.25)' : 'none', transition: 'all 0.2s',
                                }}>End Call</button>
                            )}
                        </div>
                    </div>

                    {/* ── Meeting confirmed — replaces transcript area ─── */}
                    {meeting ? (
                        <div style={{
                            flex: 1, display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            padding: '32px 24px', gap: '20px',
                            background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 100%)',
                        }}>
                            {/* Big checkmark circle */}
                            <div style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                background: '#22c55e',
                                boxShadow: '0 0 0 12px rgba(34,197,94,0.15), 0 8px 32px rgba(34,197,94,0.35)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                            </div>

                            {/* Confirmed text */}
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '20px', fontWeight: 800, color: '#15803d', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                                    Your meeting has been confirmed!
                                </div>
                                {meeting.startTime && (
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        padding: '6px 14px', borderRadius: '20px',
                                        background: '#fff', border: '1.5px solid #86efac',
                                        fontSize: '13px', fontWeight: 600, color: '#166534',
                                        margin: '4px 0 16px',
                                    }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                                        </svg>
                                        {meeting.startTime}
                                    </div>
                                )}
                                {meeting.meetingLink && (
                                    <div style={{ marginTop: '4px' }}>
                                        <a
                                            href={meeting.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                padding: '10px 24px', borderRadius: '10px',
                                                background: '#22c55e', color: '#fff',
                                                fontWeight: 700, fontSize: '13px', textDecoration: 'none',
                                                boxShadow: '0 4px 14px rgba(34,197,94,0.35)',
                                            }}
                                        >
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 10l-4 4l6 6l4-16l-16 4l6 6l4-4z"/>
                                            </svg>
                                            Join Meeting
                                        </a>
                                    </div>
                                )}
                            </div>

                            <p style={{ margin: 0, fontSize: '12px', color: '#4ade80', textAlign: 'center', letterSpacing: '0.01em' }}>
                                A confirmation email has been sent to your inbox
                            </p>
                        </div>
                    ) : (
                        /* ── Transcript / orb area ─────────────────────── */
                        <div ref={transcriptBoxRef} style={{
                            flex: 1, overflow: 'hidden', overflowY: 'auto', padding: '16px 24px',
                            display: 'flex', flexDirection: 'column', gap: '12px', background: '#f9fafb',
                        }}>
                            {(!active || transcript.length === 0) && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '20px' }}>
                                    <VoiceOrb state={orbState} />
                                    <p style={{ margin: 0, fontSize: '15px', color: '#6b7280', textAlign: 'center', letterSpacing: '0.01em' }}>
                                        {!active
                                            ? 'Click "Book a Meeting" to start'
                                            : connected
                                            ? status.toLowerCase().includes('speaking') ? 'Agent is speaking…' : 'Listening…'
                                            : 'Connecting…'}
                                    </p>
                                </div>
                            )}
                            {transcript.map(msg => (
                                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{
                                        maxWidth: '82%', padding: '10px 14px', fontSize: '13px', lineHeight: 1.5,
                                        borderRadius: msg.role === 'ai' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                                        ...(msg.role === 'ai'
                                            ? { background: '#ffffff', border: '1px solid #e5e7eb', color: '#374151' }
                                            : { background: '#14A800', color: '#ffffff', fontWeight: 500 }),
                                    }}>{msg.text}</div>
                                </div>
                            ))}
                        </div>
                    )}


                    {/* Footer — hidden after meeting is confirmed */}
                    {!meeting && <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', flexShrink: 0, background: '#ffffff' }}>
                        {emailMode && !emailSent && (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <i className="fa-solid fa-envelope" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#9ca3af' }} />
                                    <input
                                        ref={emailInputRef} type="email" placeholder="Type your email address…"
                                        value={emailDraft} onChange={e => setEmailDraft(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                                        style={{
                                            width: '100%', paddingLeft: '34px', paddingRight: '12px',
                                            paddingTop: '10px', paddingBottom: '10px',
                                            border: '1.5px solid #14A800', borderRadius: '8px',
                                            fontSize: '13px', color: '#111827', outline: 'none',
                                            background: '#f9fafb', boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                                <button onClick={handleEmailSubmit} disabled={!emailDraft.trim()} style={{
                                    padding: '10px 18px', borderRadius: '8px', border: 'none',
                                    fontSize: '13px', fontWeight: 600,
                                    cursor: emailDraft.trim() ? 'pointer' : 'not-allowed',
                                    background: emailDraft.trim() ? '#14A800' : '#e5e7eb',
                                    color: emailDraft.trim() ? '#fff' : '#9ca3af',
                                    whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.15s',
                                }}>Send</button>
                            </div>
                        )}
                        {emailMode && emailSent && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', animation: 'pulse 1.2s ease-in-out infinite', flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Email sent — agent will confirm it</p>
                            </div>
                        )}
                        {pttMode && active && !emailMode && (
                            <button
                                onMouseDown={handlePttStart} onMouseUp={handlePttEnd}
                                onMouseLeave={pttActive ? handlePttEnd : undefined}
                                onTouchStart={e => { e.preventDefault(); handlePttStart(); }} onTouchEnd={handlePttEnd}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '8px',
                                    border: `2px solid ${pttActive ? '#14A800' : '#d1d5db'}`,
                                    background: pttActive ? '#14A800' : '#f9fafb',
                                    color: pttActive ? '#fff' : '#374151',
                                    fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', userSelect: 'none',
                                }}>
                                <i className={`fa-solid fa-microphone${pttActive ? '' : '-slash'}`} style={{ fontSize: '12px' }} />
                                {pttActive ? 'Speaking…' : 'Hold to Speak'}
                            </button>
                        )}
                        {!emailMode && !pttMode && (
                            <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af', lineHeight: 1.4 }}>
                                Speak naturally — the agent listens and books everything for you
                            </p>
                        )}
                    </div>}
                </div>
            </ConversationProvider>
        </div>
    );
}
