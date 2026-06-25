import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { label: "Work", href: "/#work" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "The Group", href: "/the-group" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="py-14"
      style={{ borderTop: "1px solid rgba(22,22,27,.12)" }}
    >
      <div className="max-w-[1200px] mx-auto px-9 flex justify-between gap-6 flex-wrap items-start">
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

        <div
          className="font-mono uppercase text-faint text-right"
          style={{ fontSize: 11, letterSpacing: "0.14em", lineHeight: 2 }}
        >
          A Media Group<br />
          Make. Move. Grow.<br />
          Los Angeles
        </div>
      </div>
    </footer>
  );
}
