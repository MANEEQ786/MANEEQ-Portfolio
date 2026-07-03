# Xiomi — Next.js (App Router) Migration

This is the **Xiomi** portfolio/agency HTML template converted 1:1 into a
**Next.js 15 App Router + TypeScript** application. The original design, CSS,
markup structure, animations, images and JavaScript behaviour are preserved
exactly — this is a migration, not a redesign.

The original static template is kept untouched under
[`portfolio/buyer-file/`](portfolio/buyer-file/) for reference/comparison.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
# production:
npm run build && npm run start
```

## Routes

| Original page            | Next.js route        |
| ------------------------ | -------------------- |
| index.html               | `/`                  |
| index-2.html             | `/home-2`            |
| index-3.html             | `/home-3`            |
| about.html               | `/about`             |
| service.html             | `/service`           |
| service-details.html     | `/service-details`   |
| portfolio.html           | `/portfolio`         |
| portfolio-details.html   | `/portfolio-details` |
| news.html                | `/news`              |
| news-classic.html        | `/news-classic`      |
| news-details.html        | `/news-details`      |
| faq.html                 | `/faq`               |
| contact.html             | `/contact`           |
| 404.html                 | `not-found` (any unknown route) |

## Architecture

```
app/
  layout.tsx            # <html>/<head> with the EXACT original CSS order + global chrome
  page.tsx              # home (index.html)
  home-2/, home-3/      # index-2 / index-3
  <route>/page.tsx      # one folder per page
  not-found.tsx         # 404.html
  api/contact/route.ts  # replaces contact.php
components/
  layout/               # Header (3 variants), Footer (3 variants), Preloader,
                        # BackToTop, Offcanvas, ScriptLoader
  sections/contact/     # ContactForm (client component)
lib/                    # routes, constants (nav), validations, utils
types/                  # navigation / contact types
public/assets/          # css, scss, js, img, webfonts — copied verbatim
```

### CSS

All original stylesheets are loaded from [`app/layout.tsx`](app/layout.tsx) in the
**exact original order**:

```
bootstrap.min.css → all.min.css → animate.css → magnific-popup.css →
meanmenu.css → swiper-bundle.min.css → nice-select.css → color.css → main.css
```

The CSS / SCSS files are **not modified**. The SCSS source remains available at
[`public/assets/scss/`](public/assets/scss/) for future editing.

### JavaScript / jQuery plugins

The original vendor scripts are preserved and loaded **client-side in the exact
original order** by [`components/layout/ScriptLoader.tsx`](components/layout/ScriptLoader.tsx):

```
jquery → viewport → bootstrap → nice-select → waypoints → counterup →
swiper → meanmenu → magnific-popup → wow → typed → main.js
```

`main.js` was lightly refactored (no behaviour change) so its plugin
initialisation can be **safely re-run after client-side route changes**:

- One-time global bindings (sticky header, back-to-top, offcanvas toggle, mouse
  cursor, search, project/news hover) use delegated/window handlers so they keep
  working across navigations.
- Re-runnable initialisers (Swiper sliders, WOW, counterup, typed, mobile menu)
  are exposed as `window.themeInit()` and called by `ScriptLoader` on each route
  change, tearing down previous slider/typed instances first to avoid duplicates.

> Note: `icomoon.css`, `circle-progress.js` and `countdowncustom.js` exist in the
> asset folder but were **not** referenced by any original page, so (matching the
> original exactly) they are not loaded.

### Contact form

`contact.php` is replaced by [`app/api/contact/route.ts`](app/api/contact/route.ts).
The form UI/fields are unchanged; it submits via `fetch` to `/api/contact`,
validates `name` / `email` / `message`, and returns plain-text responses so the
original success/error message behaviour is preserved.

Email sending is optional and **safe when unconfigured** — without SMTP env vars
it simply logs the submission server-side. To enable real delivery, copy
[`.env.local.example`](.env.local.example) to `.env.local`, fill in the SMTP
values, and install nodemailer (`npm i nodemailer`).

### Header / Footer variants

The three homepages use different header/footer styles, handled via a `variant`
prop:

- `Header variant="default" | "style-2" | "header-3"`
- `Footer variant="footer-1" | "footer-2" | "footer-3"`

All inner pages use `default` / `footer-1`.
