"use client";

import { useEffect, useState } from "react";

// "Keynote" hero button that opens the local reel video in a centered popup
// with a blurred/dimmed backdrop. Replaces the theme's magnific-popup video.
export default function ShowReel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // lock background scroll while the popup is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Same markup/classes as the original Keynote button (look unchanged) */}
      <a
        href="https://visiontact.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="theme-btn theme-btn-white"
        style={{ background: "#ffffff", color: "#000000" }}
      >
        Explore VisionTact
        <i className="fa-solid fa-arrow-right"></i>
      </a>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(8, 10, 12, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            style={{
              position: "absolute",
              top: "28px",
              right: "28px",
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(255, 255, 255, 0.92)",
              color: "#111",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="fas fa-times"></i>
          </button>

          <video
            src="/Sir/saqib%20video.mp4"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              width: "auto",
              height: "auto",
              borderRadius: "14px",
              boxShadow: "0 24px 70px rgba(0, 0, 0, 0.55)",
              background: "#000",
            }}
          />
        </div>
      )}
    </>
  );
}
