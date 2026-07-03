import type { Metadata, Viewport } from "next";
import Preloader from "@/components/layout/Preloader";
import BackToTop from "@/components/layout/BackToTop";
import Offcanvas from "@/components/layout/Offcanvas";
import ScriptLoader from "@/components/layout/ScriptLoader";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.author }],
  icons: {
    icon: "/assets/img/favicon-photo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* CSS loaded in the exact same order as the original HTML pages. */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/meanmenu.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/color.css" />
        <link rel="stylesheet" href="/assets/css/main.css?v=9" />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "saqib-masood", {origin:"https://app.cal.com"});
Cal.ns["saqib-masood"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        `}} />
      </head>
      <body className="body-color">
        <Preloader />
        <BackToTop />
        <Offcanvas />
        {children}
        <ScriptLoader />
      </body>
    </html>
  );
}
