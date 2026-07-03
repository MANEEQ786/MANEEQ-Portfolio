// Maps the original static .html files to their Next.js App Router routes.
// Used by Header/Footer so the markup can keep referencing logical page names
// while emitting clean Next.js routes.

export const routes = {
  "index.html": "/",
  "index-2.html": "/home-2",
  "index-3.html": "/home-3",
  "about.html": "/about",
  "service.html": "/service",
  "service-details.html": "/service-details",
  "portfolio.html": "/portfolio",
  "portfolio-details.html": "/portfolio-details",
  "news.html": "/news",
  "news-classic.html": "/news-classic",
  "news-details.html": "/news-details",
  "faq.html": "/faq",
  "contact.html": "/contact",
  "404.html": "/404",
} as const;

export type LegacyPage = keyof typeof routes;

/** Resolve a legacy "*.html" link to its Next.js route. */
export function route(page: LegacyPage): string {
  return routes[page];
}
