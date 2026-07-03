import Link from "next/link";
import type { HeaderVariant } from "@/types/navigation";

interface HeaderProps {
  /** "default" = header-1 (home-1 + all inner pages), "style-2" = home-2, "header-3" = home-3 */
  variant?: HeaderVariant;
}

// The navigation markup is identical across every page (including the
// hard-coded "active" Home item, exactly like the original template).
function NavMenu({ menuClass }: { menuClass: string }) {
  return (
    <div className="mean__menu-wrapper">
      <div className={menuClass}>
        <nav id="mobile-menu">
          <ul>
            <li className="active">
              <Link href="/#hero" className="border-none">Home</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#services">My Ventures</Link>
            </li>
            <li>
              <Link href="/#blog">Blog</Link>
            </li>
            <li>
              <Link href="/#contact">Contact Me</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function SearchArea() {
  return (
    <>
      {/* Search Area Start */}
      <div className="search-wrap">
        <div className="search-inner">
          <i className="fas fa-times search-close" id="search-close"></i>
          <div className="search-cell">
            <form method="get">
              <div className="search-field-holder">
                <input type="search" className="main-search-input" placeholder="Search..." />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Header({ variant = "default" }: HeaderProps) {
  const headerClass =
    variant === "style-2"
      ? "header-1 style-2"
      : variant === "header-3"
      ? "header-1 header-3"
      : "header-1";

  const logoMain =
    variant === "default"
      ? "/assets/img/logo/Logo-black.svg"
      : "/assets/img/logo/logo-white.svg";

  const ctaText =
    variant === "style-2" ? "Download CV" : variant === "header-3" ? "Lets Talk" : "Hire Me";

  const isVariant = variant !== "default";

  return (
    <>
      {/* Header Section Start */}
      <header className={headerClass} id="header-sticky">
        <div className="container-fluid">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              {/* Logo hidden (visibility:hidden keeps its space so the rest of the navbar stays put) */}
              <div className="logo" style={{ visibility: "hidden" }}>
                <Link href="/" className="header-logo">
                  <img src={logoMain} alt="logo-img" />
                </Link>
                <div className="logo-2">
                  <Link href="/">
                    <img src="/assets/img/logo/Logo-black.svg" alt="" />
                  </Link>
                </div>
              </div>

              {/* Default variant: nav is a sibling before header-right */}
              {!isVariant && <NavMenu menuClass="main-menu" />}

              <div className="header-right d-flex justify-content-end align-items-center">
                {/* Variants: nav lives inside header-right */}
                {isVariant && <NavMenu menuClass="main-menu style-2" />}

                {isVariant && (
                  <a href="#0" className="search-trigger search-icon">
                    <i className="fa-regular fa-magnifying-glass"></i>
                  </a>
                )}

                {isVariant && (
                  <Link href="/contact" className="theme-btn style-2">
                    {ctaText}
                    <i className="fa-sharp fa-regular fa-arrow-right"></i>
                  </Link>
                )}

                <div className="header__hamburger d-xl-none my-auto">
                  <div className={isVariant ? "sidebar__toggle style-2" : "sidebar__toggle"}>
                    <i className="fas fa-bars"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isVariant && <SearchArea />}
    </>
  );
}
