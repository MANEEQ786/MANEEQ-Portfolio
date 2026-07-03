"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { validateCompanyEmailSync, formRejectionMessage } from "@/lib/validation/companyEmail";

/**
 * "Book a Strategy Call" button.
 *
 * The Cal.com booking popup collects the email inside Cal.com's own (cross-origin)
 * iframe, which we can't validate. So we put our own email form in front of it:
 * the visitor enters their email and submits — validation runs ON SUBMIT (offline
 * lists + real-time disposable API via /api/validate-email). Only a valid official
 * company email opens the Cal.com calendar (prefilled with that email).
 */
export default function StrategyCallButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const calTriggerRef = useRef<HTMLAnchorElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  // Focus the field and allow Esc to close when the modal opens.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); document.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function closeModal() {
    setOpen(false);
    setError(null);
    setLoading(false);
  }

  function openCalendar(validEmail: string) {
    const a = calTriggerRef.current;
    if (!a) return;
    // Prefill the validated email into the Cal.com booking form.
    a.setAttribute(
      "data-cal-config",
      JSON.stringify({ layout: "month_view", useSlotsViewOnSmallScreen: "true", email: validEmail }),
    );
    a.click();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      // Authoritative check (offline lists + real-time disposable API).
      const res = await fetch("/api/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, context: "form" }),
      });
      const data = await res.json();
      if (!data.valid) {
        setError(String(data.message ?? "Please use a valid official company email address."));
        setLoading(false);
        return;
      }
    } catch {
      // Endpoint unreachable → fall back to offline-only checks.
      const sync = validateCompanyEmailSync(value);
      if (!sync.valid) {
        setError(formRejectionMessage(sync.reason!));
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    closeModal();
    openCalendar(value);
  }

  const modal = (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999, display: "flex",
        alignItems: "center", justifyContent: "center", padding: "16px",
        background: "rgba(8,10,12,0.6)", backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: "440px", background: "#0B1117",
          border: "1px solid #28E98C33", borderRadius: "16px", padding: "28px 26px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        <h3 style={{ margin: "0 0 6px", color: "#fff", fontSize: "20px", fontWeight: 800, fontFamily: '"Manrope", sans-serif' }}>
          Book a Strategy Call
        </h3>
        <p style={{ margin: "0 0 18px", color: "#9ca3af", fontSize: "14px", lineHeight: 1.5 }}>
          Please enter your official company email to continue. Free, temporary or
          personal emails are not accepted.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
            placeholder="you@yourcompany.com"
            style={{
              width: "100%", padding: "13px 15px", borderRadius: "10px",
              border: `1.5px solid ${error ? "#ef4444" : "#28E98C55"}`,
              background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "15px",
              outline: "none", boxSizing: "border-box",
            }}
          />
          {error && (
            <p style={{ margin: "10px 0 0", color: "#f87171", fontSize: "13px", lineHeight: 1.45 }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              type="button"
              onClick={closeModal}
              style={{
                flex: "0 0 auto", padding: "12px 18px", borderRadius: "10px",
                border: "none", background: "rgba(255,255,255,0.06)", color: "#fff",
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1, padding: "12px 18px", borderRadius: "10px", border: "none",
                background: "#28E98C", color: "#06231a", fontSize: "14px", fontWeight: 700,
                cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Checking…" : "Continue to Calendar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <a
        href="#"
        className="theme-btn"
        onClick={(e) => { e.preventDefault(); setOpen(true); }}
      >
        Book a Strategy Call
        <i className="fa-solid fa-arrow-right"></i>
      </a>

      {/* Hidden Cal.com trigger — clicked programmatically after validation. */}
      <a
        ref={calTriggerRef}
        href="#"
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: "none" }}
        data-cal-link="saqibmasood/saqib-masood"
        data-cal-namespace="saqib-masood"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        onClick={(e) => e.preventDefault()}
      >
        cal
      </a>

      {mounted && open && createPortal(modal, document.body)}
    </>
  );
}
