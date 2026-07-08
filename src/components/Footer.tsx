import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { label: "what we do", href: "/work" },
    { label: "about us", href: "/about" },
    { label: "contact", href: "/contact" },
  ];

  return (
    <footer className="border-t border-line" style={{ paddingTop: 56, paddingBottom: 56 }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-9 flex flex-col gap-10">
        {/* Row 1: mark + nav */}
        <div className="flex justify-between items-start gap-6 flex-wrap">
          <span
            className="font-display font-black text-ink"
            style={{ fontSize: 22, letterSpacing: "-0.05em" }}
          >
            MM<b className="text-accent">G</b>
          </span>

          <nav className="flex gap-[26px] flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono uppercase text-ink no-underline opacity-[0.66] hover:opacity-100 hover:text-accent transition-[opacity,color] duration-[250ms]"
                style={{ fontSize: 11, letterSpacing: "0.14em" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Row 2: mailto + socials */}
        <div className="flex justify-between items-center gap-6 flex-wrap">
          {/* TODO: confirm info@ mailbox exists (Dennis) */}
          <a
            href="mailto:info@makemovegrow.com"
            className="font-display text-ink no-underline border-b border-transparent hover:text-accent hover:border-accent transition-[color,border-color] duration-[250ms]"
            style={{ fontSize: "clamp(18px,2vw,24px)", letterSpacing: "-0.01em" }}
          >
            info@makemovegrow.com
          </a>

          <div className="flex items-center gap-5">
            {/* TODO: real social URLs from Dennis */}
            <a
              href="#"
              aria-label="Instagram"
              className="text-ink hover:text-accent transition-colors duration-[250ms]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14.7" cy="5.3" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-ink hover:text-accent transition-colors duration-[250ms]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="3.5" width="18" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8.3 7.3L12.8 10L8.3 12.7V7.3Z" fill="currentColor" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-ink hover:text-accent transition-colors duration-[250ms]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <rect x="4.6" y="8.2" width="1.8" height="7.2" fill="currentColor" />
                <circle cx="5.5" cy="5.3" r="1.1" fill="currentColor" />
                <path
                  d="M8.6 15.4V8.2H10.3V9.2C10.75 8.5 11.55 8 12.6 8C14.3 8 15.4 9.1 15.4 11.1V15.4H13.6V11.4C13.6 10.3 13.1 9.7 12.2 9.7C11.3 9.7 10.4 10.3 10.4 11.4V15.4H8.6Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div
          className="font-mono text-faint"
          style={{ fontSize: 11, letterSpacing: "0.06em" }}
        >
          © 2026 makemovegrow.{" "}
          <Link
            href="/copyright-policy"
            className="text-faint no-underline hover:text-accent transition-colors duration-[250ms]"
          >
            copyright policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
