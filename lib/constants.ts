import type { NavItem } from "@/types/navigation";

// Primary navigation, mirrors the original theme menu exactly (labels, order,
// nesting) but pointing at the Next.js routes.
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    hasDropdown: true,
    submenu: [
      { label: "Home 01", href: "/" },
      { label: "Home 02", href: "/home-2" },
      { label: "Home 03", href: "/home-3" },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Pages",
    href: "#",
    hasDropdown: true,
    submenu: [
      {
        label: "Our Services",
        href: "/service",
        submenu: [
          { label: "Service", href: "/service" },
          { label: "Service Details", href: "/service-details" },
        ],
      },
      {
        label: "Our Portfolio",
        href: "/portfolio",
        submenu: [
          { label: "Portfolio", href: "/portfolio" },
          { label: "Portfolio Details", href: "/portfolio-details" },
        ],
      },
      { label: "Faq", href: "/faq" },
      { label: "404", href: "/404" },
    ],
  },
  {
    label: "Blog",
    href: "/news-details",
    hasDropdown: true,
    submenu: [
      { label: "Blog Grid", href: "/news" },
      { label: "Blog Classic", href: "/news-classic" },
      { label: "Blog Details", href: "/news-details" },
    ],
  },
  {
    label: "Contact Me",
    href: "/contact",
  },
];

export const SITE = {
  name: "Saqib Masood",
  title: "Saqib Masood",
  description: "Saqib Masood — Founder & Visionary | AI Marketplace Product Owner | AI SaaS, Agentic AI, Voice AI & Enterprise Intelligence Platforms",
  author: "Saqib Masood",
};
