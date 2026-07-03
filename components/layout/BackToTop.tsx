'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

function ModalPlayer({ onClose }: { onClose: () => void }) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [progress, setProgress] = useState(0);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);

  // Start video on mount
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  // Sync progress bar + timestamps
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setProgress(v.duration ? v.currentTime / v.duration : 0);
      setCurrent(v.currentTime);
    };
    const onMeta = () => setDuration(v.duration || 0);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    if (v.duration) setDuration(v.duration);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
  }, []);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const btn: React.CSSProperties = {
    background: 'none', border: 'none', color: '#fff',
    cursor: 'pointer', padding: '0 6px', fontSize: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '22px',
      zIndex: 99999,
      width: 'min(340px, 92vw)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.1)',
      background: '#000',
    }}>
      {/* ✕ close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 10,
          width: '30px', height: '30px', borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.7)',
          background: 'rgba(0,0,0,0.6)', color: '#fff',
          fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}
      >✕</button>

      {/* Video */}
      <video
        ref={videoRef}
        playsInline
        onClick={togglePlay}
        style={{
          width: '100%', display: 'block',
          maxHeight: '60vh', objectFit: 'contain',
          background: '#000', cursor: 'pointer',
        }}
      >
        <source src="/Sir/demo.mp4" type="video/mp4" />
      </video>

      {/* Custom controls bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        padding: '8px 10px',
        background: 'rgba(0,0,0,0.85)',
      }}>
        {/* Play / Pause — left */}
        <button onClick={togglePlay} style={btn} aria-label="Play/Pause">
          {playing
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>
          }
        </button>

        {/* Timestamp + Progress stacked */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{
            color: '#fff', fontSize: '13px', fontWeight: 500,
            whiteSpace: 'nowrap', userSelect: 'none',
            fontVariantNumeric: 'tabular-nums', letterSpacing: '0.03em',
          }}>
            {fmt(current)} / {fmt(duration)}
          </span>
          <div
            ref={progressRef}
            onClick={seek}
            style={{
              width: '100%', height: '4px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.25)', cursor: 'pointer', position: 'relative',
            }}
          >
            <div style={{
              height: '100%', borderRadius: '2px',
              background: '#fff', width: `${progress * 100}%`,
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        {/* Mute / Unmute — right */}
        <button onClick={toggleMute} style={btn} aria-label="Mute/Unmute">
          {muted
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M3 9v6h4l5 5V4L7 9H3z"/>
                <line x1="19" y1="9" x2="23" y2="13" stroke="#fff" strokeWidth="2"/>
                <line x1="23" y1="9" x2="19" y2="13" stroke="#fff" strokeWidth="2"/>
              </svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M3 9v6h4l5 5V4L7 9H3z"/>
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="#fff"/>
                <path d="M19 12c0 2.93-1.68 5.47-4.15 6.74l1.45 1.45C18.98 18.6 21 15.5 21 12s-2.02-6.6-4.7-8.19l-1.45 1.45C17.32 6.53 19 9.07 19 12z" fill="#fff"/>
              </svg>
          }
        </button>
      </div>
    </div>
  );
}

export default function BackToTop() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded,  setExpanded]  = useState(false);
  const miniVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      {expanded && <ModalPlayer onClose={() => setExpanded(false)} />}

      {/* ── Widget — anchored at bottom-right ───────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: '30px', right: '22px',
        zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '14px', transition: 'gap 0.3s ease',
      }}>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/971563048781"
          target="_blank" rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: '#25D366', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(37,211,102,0.55)',
            color: '#fff', fontSize: '36px', textDecoration: 'none', flexShrink: 0,
          }}
        >
          <i className="fa-brands fa-whatsapp" />
        </a>

        {/* Circular video */}
        {!dismissed && (
          <div style={{ position: 'relative', width: '155px', height: '155px' }}>

            {/* ✕ dismiss */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Close video"
              style={{
                position: 'absolute', top: '-6px', right: '-6px', zIndex: 20,
                width: '26px', height: '26px', borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.8)',
                background: '#111', color: '#fff',
                fontSize: '12px', fontWeight: 700, lineHeight: 1,
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >✕</button>

            {/* Clickable circle */}
            <div
              onClick={() => setExpanded(true)}
              style={{
                width: '155px', height: '155px', borderRadius: '50%',
                overflow: 'hidden', position: 'relative',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35), 0 0 0 3px rgba(255,255,255,0.18)',
                background: '#000', cursor: 'pointer',
              }}
            >
              <video
                ref={miniVideoRef}
                autoPlay muted loop playsInline
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  display: 'block', pointerEvents: 'none',
                }}
              >
                <source src="/Sir/demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>

      <a id="back-top" className="back-to-top" href="https://wa.me/971563048781"
        target="_blank" rel="noopener noreferrer" style={{ display: 'none' }} />
      <div className="mouse-cursor cursor-outer"></div>
      <div className="mouse-cursor cursor-inner"></div>
    </>
  );
}
