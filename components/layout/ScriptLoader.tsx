"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    themeInit?: () => void;
    jQuery?: unknown;
  }
}

// Bump this when any vendor script (esp. main.js) changes, to force browsers to
// fetch the new copy instead of a stale cached one.
const CACHE_BUST = "6";

// Exact original load order. Loaded sequentially (each waits for the previous
// to execute) so the jQuery plugins always find `$` already defined.
const SCRIPTS = [
  "/assets/js/jquery-3.7.1.min.js",
  "/assets/js/viewport.jquery.js",
  "/assets/js/bootstrap.bundle.min.js",
  "/assets/js/jquery.nice-select.min.js",
  "/assets/js/jquery.waypoints.js",
  "/assets/js/jquery.counterup.min.js",
  "/assets/js/swiper-bundle.min.js",
  "/assets/js/jquery.meanmenu.min.js",
  "/assets/js/jquery.magnific-popup.min.js",
  "/assets/js/wow.min.js",
  "/assets/js/typed.min.js",
  "/assets/js/main.js",
];

// Guarantee the preloader is removed, independent of jQuery/main.js. This runs
// from the app bundle (always fresh, never cached stale), so a stale-cached
// main.js can never leave the "Loading" screen stuck on top of the page.
function forceHidePreloader() {
  const pre = document.getElementById("preloader");
  if (!pre) return;
  pre.classList.add("loaded");
  pre.style.opacity = "0";
  pre.style.visibility = "hidden";
  pre.style.display = "none";
}

export default function ScriptLoader() {
  const pathname = usePathname();
  const started = useRef(false);
  const ready = useRef(false);

  // Load all vendor scripts once, in order.
  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let i = 0;
    const loadNext = () => {
      if (i >= SCRIPTS.length) {
        ready.current = true;
        return;
      }
      const src = SCRIPTS[i++];
      const el = document.createElement("script");
      el.src = src + "?v=" + CACHE_BUST;
      el.async = false; // preserve execution order
      el.onload = loadNext;
      el.onerror = loadNext;
      document.body.appendChild(el);
    };
    loadNext();
  }, []);


  // Safety net: never let the preloader stay stuck. main.js normally fades it
  // out within ~1s; if that ever fails (e.g. a stale cached script), force it
  // away shortly after mount so the page is always usable.
  useEffect(() => {
    const t = setTimeout(forceHidePreloader, 1800);
    return () => clearTimeout(t);
  }, []);

  // Re-initialise the theme plugins after a client-side route change.
  // The first page load is handled by main.js's own $(document).ready().
  useEffect(() => {
    if (!ready.current) return;
    const id = window.requestAnimationFrame(() => {
      window.themeInit?.();
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
