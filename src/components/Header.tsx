"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const showBorder = !isHome || scrolled;

  const navLinks = [
    { label: "Work", href: "/#work", active: isHome },
    { label: "Capabilities", href: "/capabilities", active: pathname === "/capabilities" },
    { label: "The Group", href: "/the-group", active: pathname === "/the-group" },
    { label: "Contact", href: "/contact", active: pathname === "/contact" },
  ];

  return (
    <header
      className="sticky top-0 z-40 transition-[border-color] duration-300"
      style={{
        background: "rgba(246,244,239,.82)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${showBorder ? "rgba(22,22,27,.12)" : "transparent"}`,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-9 flex items-center justify-between h-[100px]">
        <Link
          href="/"
          className="no-underline text-ink flex flex-col justify-center gap-[4px] leading-none"
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

        <nav className="flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono uppercase no-underline transition-[opacity,color] duration-[250ms] max-[680px]:text-[10px] ${
                link.active
                  ? "opacity-100 text-ink"
                  : "opacity-[0.66] text-ink hover:opacity-100 hover:text-accent"
              }`}
              style={{ fontSize: 12, letterSpacing: "0.14em" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
