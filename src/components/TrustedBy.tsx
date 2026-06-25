"use client";
import Reveal from "./Reveal";
import { clients } from "@/lib/content";

export default function TrustedBy() {
  const items = [...clients, ...clients];

  return (
    <section className="pb-0 pt-[70px]">
      <div className="max-w-[1200px] mx-auto px-9">
        <Reveal>
          <div
            className="font-mono uppercase text-faint mb-[30px]"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            We&apos;ve served
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div
          className="overflow-hidden border-t border-b border-line py-[18px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
            maskImage:
              "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
          }}
        >
          <div
            className="flex whitespace-nowrap w-max"
            style={{ animation: "mmg-ticker 46s linear infinite" }}
          >
            {items.map((client, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="font-display font-extrabold uppercase text-ink px-[26px]"
                  style={{ fontSize: 20, letterSpacing: "-0.01em" }}
                >
                  {client}
                </span>
                <span className="text-accent opacity-100 font-display font-extrabold" style={{ fontSize: 20 }}>
                  /
                </span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <style>{`
        @keyframes mmg-ticker { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="mmg-ticker"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
