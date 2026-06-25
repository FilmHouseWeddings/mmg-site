"use client";

import { clients } from "@/lib/content";

export default function ClientMarquee() {
  const track = [...clients, ...clients];

  return (
    <div className="mt-16 border-t border-line pt-8">
      <p className="text-center font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-6">
        Selected Clients
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {track.map((name, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="font-display font-extrabold text-sm md:text-base tracking-[0.06em] uppercase text-bone px-5">
                {name}
              </span>
              <span className="text-accent font-display font-black text-sm select-none">
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
