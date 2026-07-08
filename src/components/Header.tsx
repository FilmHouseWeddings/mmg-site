"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "what we do", href: "/work" },
  { label: "about us", href: "/about" },
  { label: "contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll state — drives desktop wordmark/nav <-> monogram/hamburger cross-fade.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body scroll-lock while the mobile drawer / desktop flyout is open.
  useEffect(() => {
    if (open) {
      const { overflow: htmlOverflow } = document.documentElement.style;
      const { overflow: bodyOverflow } = document.body.style;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = htmlOverflow;
        document.body.style.overflow = bodyOverflow;
      };
    }
  }, [open]);

  // ESC to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className="site-header fixed top-0 inset-x-0 z-50 h-[92px] bg-transparent"
      data-scrolled={scrolled}
      data-open={open}
    >
      <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-9">
        {/* Logo slot — wordmark and monogram occupy the same spot and cross-fade */}
        <div className="relative flex h-full min-w-[64px] items-center">
          <Link
            href="/"
            className="site-header__wordmark no-underline text-ink flex flex-col justify-center gap-[4px] leading-none"
          >
            <span
              className="font-display font-black text-ink"
              style={{ fontSize: 32, letterSpacing: "-0.05em" }}
            >
              MM<b className="text-accent">G</b>
            </span>
            <span
              className="font-mono uppercase text-faint"
              style={{ fontSize: 10, letterSpacing: "0.15em" }}
            >
              Make. Move. Grow.
            </span>
          </Link>

          <Link
            href="/"
            className="site-header__monogram absolute left-0 top-1/2 -translate-y-1/2 no-underline text-ink"
            aria-hidden={!scrolled}
            tabIndex={scrolled ? 0 : -1}
          >
            <span
              className="font-display font-black text-ink"
              style={{ fontSize: 22, letterSpacing: "-0.04em" }}
            >
              MM<b className="text-accent">G</b>
            </span>
          </Link>
        </div>

        {/* Right slot — inline nav and hamburger occupy the same spot on desktop */}
        <div className="relative flex h-full min-w-[140px] items-center justify-end">
          <nav
            className="site-header__nav-inline hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative no-underline lowercase font-display font-semibold text-[13px] tracking-normal transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-accent"
                    : "text-ink hover:text-accent"
                }`}
              >
                {isActive(link.href) && (
                  <span className="absolute -top-[13px] left-0 h-[2px] w-full bg-accent" />
                )}
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu-desktop site-menu-mobile"
            aria-label={open ? "Close menu" : "Open menu"}
            className="site-header__hamburger absolute right-0 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 flex-col items-center justify-center lg:h-[22px] lg:w-[22px]"
          >
            <span className="hamburger-line line1" />
            <span className="hamburger-line line2" />
          </button>
        </div>
      </div>

      {/* Desktop flyout — frosted horizontal nav bar, top-right */}
      <div
        id="site-menu-desktop"
        className="site-header__flyout absolute right-6 top-[92px] hidden items-center gap-8 border border-line px-7 py-4 lg:right-9 lg:flex"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`no-underline lowercase font-display font-semibold text-[13px] tracking-normal transition-colors duration-200 ${
              isActive(link.href) ? "text-accent" : "text-ink hover:text-accent"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile top drawer */}
      <nav
        id="site-menu-mobile"
        aria-label="Primary"
        className="site-header__drawer fixed inset-x-0 top-0 flex h-[55vh] w-full flex-col lg:hidden"
      >
        <div className="flex flex-col gap-[25px] pt-[100px] pl-[5%]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`no-underline lowercase font-display font-semibold text-[24px] transition-colors duration-200 ${
                isActive(link.href) ? "text-accent" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-accent transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        &#8593;
      </button>
    </header>
  );
}
