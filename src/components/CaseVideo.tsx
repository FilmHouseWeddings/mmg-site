"use client";

import { useEffect, useRef, useState } from "react";

interface CaseVideoProps {
  vimeoId?: string;
  vimeoHash?: string;
  bg: string;
  className?: string;
  hero?: boolean;
}

function PlayGlyph() {
  return (
    <div
      className="relative z-10 flex items-center justify-center rounded-full border border-paper/40 transition-colors duration-300 group-hover:border-accent"
      style={{ width: 64, height: 64 }}
    >
      <div
        style={{
          borderLeft: "16px solid #CB2138",
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          marginLeft: 5,
        }}
      />
    </div>
  );
}

export default function CaseVideo({
  vimeoId,
  vimeoHash,
  bg,
  className = "",
  hero = false,
}: CaseVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!vimeoId) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [vimeoId]);

  return (
    <div
      ref={ref}
      className={`group relative aspect-video w-full overflow-hidden ${className}`}
      style={{ background: bg }}
    >
      {vimeoId && inView ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash ?? ""}&badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1`}
          loading="lazy"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute inset-0 h-full w-full"
        />
      ) : vimeoId ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayGlyph />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">
            {hero ? "[PLACEHOLDER] Film coming soon" : "[PLACEHOLDER] Media coming soon"}
          </p>
        </div>
      )}
    </div>
  );
}
