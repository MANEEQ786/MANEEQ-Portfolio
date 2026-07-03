export interface NavSubItem {
  label: string;
  href: string;
  submenu?: NavSubItem[];
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  submenu?: NavSubItem[];
}

export type HeaderVariant = "default" | "style-2" | "header-3";
export type FooterVariant = "footer-1" | "footer-2" | "footer-3";
