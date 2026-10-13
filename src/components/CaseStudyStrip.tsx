"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Photo } from "@/lib/content";

export type StripCard = {
  slug: string;
  client: string;
  photos: Photo[];
};

// Case studies header with one pill per project. On hover (fine pointers only)
// that project's stills fade in behind the section and crossfade, the same idea
// as the category pills in Pillars. Touch devices and reduced motion get plain pills.
export default function CaseStudyStrip({ cards }: { cards: StripCard[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mounted, setMounted] = useState<Set<string>>(new Set());
  const [frame, setFrame] = useState(0);
  const [hoverCapable, setHoverCapable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setHoverCapable(hover.matches);
    setReducedMotion(motion.matches);
    const onHover = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    hover.addEventListener("change", onHover);
    motion.addEventListener("change", onMotion);
    return () => {
      hover.removeEventListener("change", onHover);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  const active = cards.find((c) => c.slug === activeSlug) ?? null;

  useEffect(() => {
    setFrame(0);
    if (!active || reducedMotion || active.photos.length < 2) return;
    const id = window.setInterval(
      () => setFrame((f) => (f + 1) % active.photos.length),
      1400
    );
    return () => window.clearInterval(id);
  }, [active, reducedMotion]);

  const enter = (card: StripCard) => {
    if (!hoverCapable || card.photos.length === 0) return;
    setMounted((prev) => {
      if (prev.has(card.slug)) return prev;
      const next = new Set(prev);
      next.add(card.slug);
      return next;
    });
    setActiveSlug(card.slug);
  };
  const leave = () => setActiveSlug(null);

  if (cards.length === 0) return null;
  const isActive = active !== null;

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden py-[56px] md:py-[90px] scroll-mt-[60px]"
    >
      {/* Hover photo layer, covers the whole section */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {cards.map((card) =>
          mounted.has(card.slug) ? (
            <div
              key={card.slug}
              className="absolute inset-0 transition-opacity duration-[400ms] ease-out"
              style={{ opacity: activeSlug === card.slug ? 1 : 0 }}
            >
              {card.photos.map((photo, i) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover transition-opacity duration-[600ms] ease-out"
                  style={{ opacity: i === frame ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
            </div>
          ) : null
        )}
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-9">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
            <h2
              className="font-display font-semibold lowercase m-0 transition-colors duration-[400ms]"
              style={{
                fontSize: "clamp(32px,4vw,48px)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: isActive ? "#F6F4EF" : "#CB2138",
              }}
            >
              case studies
            </h2>
            <p
              className="m-0 transition-colors duration-[400ms]"
              style={{
                fontSize: "clamp(18px,1.6vw,20px)",
                lineHeight: 1.6,
                maxWidth: "42ch",
                color: isActive ? "#F6F4EF" : "#16161B",
              }}
            >
              What we shot, who it was for, and how it landed.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-3">
            {cards.map((card) => (
              <Link
                key={card.slug}
                href={`/project/${card.slug}`}
                onMouseEnter={() => enter(card)}
                onMouseLeave={leave}
                onFocus={() => enter(card)}
                onBlur={leave}
                className="font-mono uppercase whitespace-nowrap rounded-full px-6 py-3 no-underline transition-colors duration-[250ms]"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  background:
                    activeSlug === card.slug
                      ? "#CB2138"
                      : isActive
                        ? "rgba(246,244,239,.16)"
                        : "rgba(22,22,27,.06)",
                  color: activeSlug === card.slug || isActive ? "#F6F4EF" : "#16161B",
                }}
              >
                {card.client}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
