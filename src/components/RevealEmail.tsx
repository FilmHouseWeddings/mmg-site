"use client";

import { useState } from "react";

const CODES = [
  100, 101, 110, 110, 105, 115, 64, 109, 97, 107, 101, 109, 111, 118, 101,
  103, 114, 111, 119, 46, 99, 111, 109,
];

interface RevealEmailProps {
  className?: string;
}

export default function RevealEmail({ className }: RevealEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  if (email) {
    return (
      <a
        href={`mailto:${email}`}
        className={
          className ??
          "font-display font-semibold text-ink no-underline hover:text-accent transition-colors duration-[250ms]"
        }
      >
        {email}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label="Reveal email address"
      onClick={() => setEmail(String.fromCharCode(...CODES))}
      className="font-mono uppercase text-muted underline underline-offset-4 decoration-line hover:text-accent transition-colors duration-[250ms] bg-transparent border-0 p-0 cursor-pointer"
      style={{ fontSize: 12, letterSpacing: "0.1em" }}
    >
      Click to reveal email
    </button>
  );
}
