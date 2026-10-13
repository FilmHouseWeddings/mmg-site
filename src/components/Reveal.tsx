"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Fade-up on scroll. The server HTML is always visible: content that is
// already on screen when the page hydrates stays put, so the top of every page
// paints on first load instead of waiting for JavaScript (this used to cost
// 6 to 8 seconds of blank text on mobile). Only blocks that start below the
// fold are hidden, while still off screen, and fade in as they scroll into view.
// No animation library: an IntersectionObserver plus a CSS transition.
type Phase = "static" | "hidden" | "shown";

const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // on screen: leave visible

    setPhase("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style =
    phase === "hidden"
      ? { opacity: 0, transform: "translateY(20px)" }
      : phase === "shown"
        ? {
            opacity: 1,
            transform: "none",
            transition: `opacity 0.8s ${EASE} ${delay}s, transform 0.8s ${EASE} ${delay}s`,
          }
        : undefined;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
