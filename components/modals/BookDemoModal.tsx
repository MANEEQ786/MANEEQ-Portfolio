'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
    ConversationProvider,
    useConversation,
    useConversationClientTool,
} from '@elevenlabs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, PhoneOff, Mic, MicOff, AlertCircle } from 'lucide-react';
import { validateCompanyEmailSync, voiceRejectionMessage } from '@/lib/validation/companyEmail';

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface BookDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface TranscriptMsg {
    id: string;
    role: 'ai' | 'user';
    text: string;
    timestamp: number;
}

/* ─── Waveform ───────────────────────────────────────────────────────────── */

const Waveform = ({ active }: { active: boolean }) => {
    const bars = [3, 5, 8, 5, 3, 7, 10, 7, 3, 5, 8, 5, 3];
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '32px' }}>
            {bars.map((h, i) => (
                <div
                    key={i}
                    style={{
                        width: '4px',
                        height: active ? `${h * 3}px` : '4px',
                        borderRadius: '9999px',
                        background: '#19C96B',
                        transition: 'height 0.2s ease',
                        animationDelay: `${i * 80}ms`,
                        animation: active ? 'pulse 1.5s ease-in-out infinite' : 'none',
                    }}
                />
            ))}
        </div>
    );
};

/* ─── VoiceSession ───────────────────────────────────────────────────────── */

interface VoiceSessionProps {
    isOpen: boolean;
    onStatusChange: (status: string) => void;
    onConnectionChange: (connected: boolean) => void;
    onMeetingBooked: (result: { meetingLink: string; startTime: string; action?: string }) => void;
}

function VoiceSession({ isOpen, onStatusChange, onConnectionChange, onMeetingBooked }: VoiceSessionProps) {
    const { startSession, endSession, status, isSpeaking } = useConversation();
    const [hasStarted, setHasStarted] = useState(false);

    useConversationClientTool('collect_lead_info', async (params: Record<string, unknown>) => {
        const fullName = String(params.full_name ?? params.fullName ?? '').trim();
        const email    = String(params.email ?? '').trim();

        if (!fullName || !email) {
            return 'Missing name or email. Please ask the user to provide both.';
        }

        const companyCheck = validateCompanyEmailSync(email);
        if (!companyCheck.valid) {
            return voiceRejectionMessage(companyCheck.reason!) +
                ' Do NOT continue with booking until they provide a valid official company email.';
        }

        try {
            const res = await fetch('/api/leads/collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, locale: 'en' }),
            });
            if (res.status === 422) {
                const data = await res.json().catch(() => ({}));
                return (data.error || voiceRejectionMessage('personal')) +
                    ' Do NOT continue with booking until they provide a valid official company email.';
            }
            if (!res.ok) return 'Could not save lead info right now. Ask the user to try again shortly.';
            return `Lead info saved for ${fullName}. Now ask if they want to book a meeting.`;
        } catch {
            return 'Could not save lead info due to a network error. Ask the user to try again shortly.';
        }
    });

    useConversationClientTool('display_meeting_result', (params: Record<string, unknown>) => {
        onMeetingBooked({
            meetingLink: String(params.meeting_link ?? ''),
            startTime: String(params.start_time ?? ''),
            action: String(params.action ?? 'booked'),
        });
        return 'Displayed on screen';
    });

    const initSession = useCallback(async () => {
        onStatusChange('Requesting microphone...');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(t => t.stop());
        } catch (micErr) {
            console.error('[Mic]', micErr);
            onStatusChange('Microphone access denied. Please allow microphone and try again.');
            onConnectionChange(false);
            return;
        }

        onStatusChange('Connecting to agent...');
        try {
            const res = await fetch('/api/elevenlabs/signed-url?locale=en');
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error((body as { error?: string }).error || `HTTP ${res.status}`);
            }
            const { signed_url } = await res.json();
            if (!signed_url) throw new Error('No signed URL returned');
            startSession({ signedUrl: signed_url });
        } catch (err) {
            console.error('[ElevenLabs] initSession:', err);
            onStatusChange(`Could not connect: ${err instanceof Error ? err.message : 'unknown error'}`);
            onConnectionChange(false);
        }
    }, [startSession, onStatusChange, onConnectionChange]);

    useEffect(() => {
        if (isOpen && !hasStarted) {
            setHasStarted(true);
            initSession();
        }
        if (!isOpen && hasStarted) {
            endSession();
            setHasStarted(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        if (status === 'connected') {
            onConnectionChange(true);
            onStatusChange(isSpeaking ? 'Agent speaking...' : 'Listening...');
        } else if (status === 'connecting') {
            onStatusChange('Connecting...');
        } else if (status === 'disconnected') {
            onConnectionChange(false);
        }
    }, [status, isSpeaking, onStatusChange, onConnectionChange]);

    return null;
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
    const [statusText, setStatusText] = useState('Initializing...');
    const [isConnected, setIsConnected] = useState(false);
    const [errorDetail, setErrorDetail] = useState<string | null>(null);
    const [transcript, setTranscript] = useState<TranscriptMsg[]>([]);
    const [meetingResult, setMeetingResult] = useState<{ meetingLink: string; startTime: string; action?: string } | null>(null);
    const [mounted, setMounted] = useState(false);
    const transcriptEndRef = useRef<HTMLDivElement>(null);
    const msgCounter = useRef(0);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcript]);

    const handleClose = useCallback(() => {
        setStatusText('Initializing...');
        setIsConnected(false);
        setErrorDetail(null);
        setTranscript([]);
        setMeetingResult(null);
        onClose();
    }, [onClose]);

    const handleMeetingBooked = useCallback((result: { meetingLink: string; startTime: string; action?: string }) => {
        setMeetingResult(result);
    }, []);

    const handleConnect = useCallback((_props: { conversationId: string }) => {
        setIsConnected(true);
        setErrorDetail(null);
    }, []);

    const handleDisconnect = useCallback(() => {
        setIsConnected(false);
        setStatusText('Call ended');
    }, []);

    const handleError = useCallback((message: string, context?: unknown) => {
        console.error('[ElevenLabs] onError:', message, context);
        setErrorDetail(message);
        setStatusText('Connection error');
        setIsConnected(false);
    }, []);

    const handleMessage = useCallback((msg: { message: string; source?: string; role?: string }) => {
        if (!msg.message) return;
        msgCounter.current += 1;
        const role = msg.role === 'agent' || msg.source === 'ai' ? 'ai' : 'user';
        setTranscript(prev => [...prev, {
            id: `msg-${Date.now()}-${msgCounter.current}`,
            role,
            text: msg.message,
            timestamp: Date.now(),
        }]);
    }, []);

    const handleUnhandledToolCall = useCallback((params: unknown) => {
        console.error('[ElevenLabs] UNHANDLED client tool call:', params);
    }, []);

    /* ─── Styles ─────────────────────────────────────────────────────────── */

    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        padding: '16px',
    };

    const cardStyle: React.CSSProperties = {
        background: '#0B1117',
        border: '1px solid #31422d',
        borderRadius: '16px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        width: '100%',
        maxWidth: '720px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90dvh',
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px 12px',
        borderBottom: '1px solid #1a2e1b',
        flexShrink: 0,
    };

    const indicatorStyle: React.CSSProperties = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: isConnected ? '#19C96B' : errorDetail ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.05)',
        boxShadow: isConnected ? '0 0 16px rgba(25,201,107,0.3)' : 'none',
        transition: 'all 0.3s ease',
    };

    const dotStyle: React.CSSProperties = {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: isConnected ? '#19C96B' : errorDetail ? '#f87171' : '#fbbf24',
        animation: (isConnected || (!errorDetail)) ? 'pulse 1.5s ease-in-out infinite' : 'none',
    };

    const transcriptAreaStyle: React.CSSProperties = {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 24px',
        minHeight: '200px',
        maxHeight: '340px',
        background: 'rgba(6,11,10,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    };

    const modal = (
        <>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={overlayStyle}
                        onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            style={cardStyle}
                        >
                            <ConversationProvider
                                onConnect={handleConnect}
                                onDisconnect={handleDisconnect}
                                onError={handleError}
                                onMessage={handleMessage}
                                onUnhandledClientToolCall={handleUnhandledToolCall}
                            >
                                <VoiceSession
                                    isOpen={isOpen}
                                    onStatusChange={setStatusText}
                                    onConnectionChange={setIsConnected}
                                    onMeetingBooked={handleMeetingBooked}
                                />

                                {/* Header */}
                                <div style={headerStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={indicatorStyle}>
                                            {isConnected
                                                ? <Mic size={20} color="#fff" />
                                                : errorDetail
                                                    ? <MicOff size={20} color="#f87171" />
                                                    : <Phone size={20} color="#6b7280" />
                                            }
                                        </div>
                                        <div>
                                            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                                                Talk to Expert
                                            </h2>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                                                <div style={dotStyle} />
                                                <span style={{ fontSize: '12px', color: errorDetail ? '#f87171' : '#9ca3af' }}>
                                                    {statusText}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.05)', border: 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                                    >
                                        <X size={16} color="#9ca3af" />
                                    </button>
                                </div>

                                {/* Waveform */}
                                <div style={{ padding: '12px 24px', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #1a2e1b', flexShrink: 0 }}>
                                    <Waveform active={isConnected} />
                                </div>

                                {/* Error Banner */}
                                {errorDetail && (
                                    <div style={{ margin: '12px 24px 0', padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                        <AlertCircle size={16} color="#f87171" style={{ marginTop: '1px', flexShrink: 0 }} />
                                        <div>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#f87171' }}>Connection failed</p>
                                            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(248,113,113,0.8)' }}>{errorDetail}</p>
                                            <button
                                                onClick={() => { setErrorDetail(null); setStatusText('Initializing...'); handleClose(); }}
                                                style={{ fontSize: '12px', color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, marginTop: '4px' }}
                                            >
                                                Close and try again
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Transcript */}
                                <div style={transcriptAreaStyle}>
                                    {transcript.length === 0 && isConnected && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                            <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', margin: 0 }}>
                                                Start speaking... conversation will appear here
                                            </p>
                                        </div>
                                    )}
                                    {transcript.length === 0 && !isConnected && !errorDetail && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ width: '24px', height: '24px', border: '2px solid #1a2e1b', borderTopColor: '#19C96B', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 8px' }} />
                                                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Connecting to agent...</p>
                                            </div>
                                        </div>
                                    )}
                                    {transcript.map((msg) => (
                                        <div
                                            key={msg.id}
                                            style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                                        >
                                            <div style={{
                                                maxWidth: '80%',
                                                padding: '10px 16px',
                                                borderRadius: msg.role === 'ai' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                                                fontSize: '13px',
                                                lineHeight: 1.5,
                                                ...(msg.role === 'ai'
                                                    ? { background: 'rgba(255,255,255,0.05)', border: '1px solid #31422d', color: '#fff' }
                                                    : { background: '#19C96B', color: '#172719', fontWeight: 500 }
                                                ),
                                            }}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={transcriptEndRef} />
                                </div>

                                {/* Meeting Booked Banner */}
                                {meetingResult && (
                                    <div style={{
                                        padding: '12px 24px',
                                        borderTop: '1px solid',
                                        flexShrink: 0,
                                        ...(meetingResult.action === 'rescheduled'
                                            ? { background: '#eff6ff', borderTopColor: '#bfdbfe' }
                                            : { background: '#f0fdf4', borderTopColor: '#bbf7d0' }
                                        ),
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: meetingResult.action === 'rescheduled' ? '#3b82f6' : '#22c55e', flexShrink: 0 }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                                </svg>
                                            </div>
                                            <span style={{ fontSize: '13px', fontWeight: 600, color: meetingResult.action === 'rescheduled' ? '#1e40af' : '#15803d' }}>
                                                {meetingResult.action === 'rescheduled' ? 'Meeting Rescheduled!' : 'Meeting Booked!'}
                                            </span>
                                        </div>
                                        {meetingResult.startTime && (
                                            <p style={{ margin: '2px 0', fontSize: '12px', color: meetingResult.action === 'rescheduled' ? '#1d4ed8' : '#166534' }}>
                                                {meetingResult.startTime}
                                            </p>
                                        )}
                                        {meetingResult.meetingLink && (
                                            <a
                                                href={meetingResult.meetingLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ fontSize: '12px', color: meetingResult.action === 'rescheduled' ? '#2563eb' : '#16a34a', textDecoration: 'underline', display: 'inline-block', marginTop: '2px' }}
                                            >
                                                Join Meeting Link
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* Footer */}
                                <div style={{ padding: '16px 24px', borderTop: '1px solid #1a2e1b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', maxWidth: '200px', lineHeight: 1.4 }}>
                                        Speak naturally with our AI agent
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        style={{
                                            padding: '10px 24px',
                                            borderRadius: '10px',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            ...(isConnected
                                                ? { background: '#ef4444', color: '#fff', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }
                                                : { background: 'rgba(255,255,255,0.05)', color: '#fff' }
                                            ),
                                        }}
                                        onMouseEnter={e => {
                                            if (isConnected) e.currentTarget.style.background = '#dc2626';
                                            else e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                        }}
                                        onMouseLeave={e => {
                                            if (isConnected) e.currentTarget.style.background = '#ef4444';
                                            else e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                        }}
                                    >
                                        {isConnected ? 'End Call' : 'Close'}
                                    </button>
                                </div>
                            </ConversationProvider>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );

    if (!mounted) return null;
    return createPortal(modal, document.body);
}
