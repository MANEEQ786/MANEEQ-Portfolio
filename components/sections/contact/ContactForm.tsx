"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { validateCompanyEmailSync, formRejectionMessage } from "@/lib/validation/companyEmail";

// Reproduces the original contact form markup exactly, but submits via fetch to
// the Next.js API route (/api/contact) instead of contact.php. The success /
// error text is shown in a `.form-message` element, matching the original
// ajax-mail.js behaviour (it toggled `success` / `error` classes + text), and
// also surfaces as a slide-in popup toast.
export default function ContactForm() {
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Portals need the DOM, so only render the toast after mount.
  useEffect(() => setMounted(true), []);

  // Auto-dismiss the popup after 6s; clean up the timer on unmount.
  useEffect(() => {
    if (!toast) return;
    toastTimer.current = setTimeout(() => setToast(null), 6000);
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [toast]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Client-side gate: only accept official company emails. Uses the
    // authoritative endpoint (offline lists + real-time disposable API) for
    // instant feedback, falling back to offline-only checks if it's unreachable.
    const email = String(formData.get("email") ?? "").trim();
    try {
      const vr = await fetch("/api/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context: "form" }),
      });
      const vdata = await vr.json();
      if (!vdata.valid) {
        setToast({ type: "error", text: String(vdata.message ?? "Please use a valid company email address.") });
        return;
      }
    } catch {
      const company = validateCompanyEmailSync(email);
      if (!company.valid) {
        setToast({ type: "error", text: formRejectionMessage(company.reason!) });
        return;
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new URLSearchParams(formData as unknown as Record<string, string>),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const text = await res.text();
      if (res.ok) {
        setToast({ type: "success", text });
        form.reset();
      } else {
        setToast({
          type: "error",
          text: text || "Oops! An error occurred and your message could not be sent.",
        });
      }
    } catch {
      setToast({
        type: "error",
        text: "Oops! An error occurred and your message could not be sent.",
      });
    }
  }

  return (
    <>
      {/* Slide-in popup notification — portaled to <body> so it isn't clipped by
          any transformed / overflow-hidden ancestor section. */}
      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            style={{
              position: "fixed",
              top: "24px",
              right: toast ? "24px" : "-420px",
              zIndex: 99999,
              maxWidth: "360px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "16px 18px",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
              borderLeft: `4px solid ${toast?.type === "error" ? "#dc2626" : "#14A800"}`,
              opacity: toast ? 1 : 0,
              transition: "right 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
              pointerEvents: toast ? "auto" : "none",
            }}
          >
            <i
              className={`fa-solid ${toast?.type === "error" ? "fa-circle-exclamation" : "fa-circle-check"}`}
              style={{ color: toast?.type === "error" ? "#dc2626" : "#14A800", fontSize: "22px", marginTop: "1px" }}
            ></i>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "#1d1d1f", marginBottom: "2px" }}>
                {toast?.type === "error" ? "Message not sent" : "Message delivered"}
              </div>
              <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.4 }}>{toast?.text}</div>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss"
              style={{ background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: "15px", lineHeight: 1, padding: "2px" }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>,
          document.body
        )}

      <form method="POST" id="contact-form" onSubmit={handleSubmit}>
      <div className="contact-box">
        <div className="row">
          <div className="col-md-6 wow fadeInUp" data-wow-delay=".2s">
            <input type="text" name="name" placeholder="Enter Your Name" />
          </div>
          <div className="col-md-6 wow fadeInUp" data-wow-delay=".5s">
            <input type="tel" name="phone" placeholder="Enter Your Number" />
          </div>
          <div className="col-12 wow fadeInUp" data-wow-delay=".8s">
            <input type="email" name="email" placeholder="Enter Your Email" />
          </div>
          <div className="col-12 wow fadeInUp" data-wow-delay="1.1s">
            <textarea name="message" placeholder="Enter Your Message" style={{ minHeight: "110px" }}></textarea>
          </div>
          <div className="col-12 wow fadeInUp" data-wow-delay="1.4s" style={{ display: "flex", justifyContent: "center", transform: "translateY(30px)" }}>
            <button type="submit" className="theme-btn" style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              Send Message
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}
