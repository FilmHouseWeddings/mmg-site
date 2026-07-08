"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { CategorySlug } from "@/lib/content";

export type PillarCategory = {
  slug: CategorySlug;
  label: string;
  vimeoId?: string;
  vimeoHash?: string;
  bg: string;
};

export type Pillar = {
  heading: string;
  sentence: string;
  categorySlugs: CategorySlug[];
};

export default function Pillars({
  pillars,
  categories,
}: {
  pillars: Pillar[];
  categories: PillarCategory[];
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mountedSlugs, setMountedSlugs] = useState<Set<string>>(new Set());
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHoverCapable(mq.matches);
    const listener = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const handleEnter = (slug: string) => {
    if (!hoverCapable) return;
    setMountedSlugs((prev) => {
      if (prev.has(slug)) return prev;
      const next = new Set(prev);
      next.add(slug);
      return next;
    });
    setActiveSlug(slug);
  };

  const handleLeave = () => {
    if (!hoverCapable) return;
    setActiveSlug(null);
  };

  const isActive = activeSlug !== null;
  const categoryBySlug = useRef(new Map(categories.map((c) => [c.slug, c])));
  categoryBySlug.current = new Map(categories.map((c) => [c.slug, c]));

  return (
    <div className="relative">
      {/* Fixed full-page hover preview layer */}
      <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="absolute inset-0 overflow-hidden transition-opacity duration-[400ms] ease-out"
            style={{
              opacity: activeSlug === cat.slug ? 1 : 0,
              background: cat.bg,
            }}
          >
            {cat.vimeoId && mountedSlugs.has(cat.slug) && (
              <iframe
                src={`https://player.vimeo.com/video/${cat.vimeoId}?background=1&autoplay=1&muted=1&loop=1${
                  cat.vimeoHash ? `&h=${cat.vimeoHash}` : ""
                }`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "max(100vw, 177.78vh)",
                  height: "max(100vh, 56.25vw)",
                  border: 0,
                }}
                allow="autoplay; fullscreen"
              />
            )}
            {/* Legibility scrim */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
          </div>
        ))}
      </div>

      {/* Pillar content */}
      {pillars.map((pillar, pIdx) => (
        <section
          key={pillar.heading}
          className="relative z-10 py-[56px] md:py-[90px] transition-colors duration-[400ms]"
        >
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal delay={pIdx * 0.06}>
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
                  {pillar.heading}
                </h2>
                <p
                  className={`m-0 transition-colors duration-[400ms] ${
                    isActive ? "" : "text-ink"
                  }`}
                  style={{
                    fontSize: "clamp(18px,1.6vw,20px)",
                    lineHeight: 1.6,
                    maxWidth: "42ch",
                    color: isActive ? "#F6F4EF" : undefined,
                  }}
                >
                  {pillar.sentence}
                </p>
              </div>
            </Reveal>

            <Reveal delay={pIdx * 0.06 + 0.08}>
              <div className="mt-10 flex flex-wrap gap-3">
                {pillar.categorySlugs.map((slug) => {
                  const cat = categoryBySlug.current.get(slug);
                  if (!cat) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/work/${slug}`}
                      onMouseEnter={() => handleEnter(slug)}
                      onMouseLeave={handleLeave}
                      className="font-mono uppercase whitespace-nowrap rounded-full px-6 py-3 no-underline transition-colors duration-[250ms]"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        background:
                          activeSlug === slug
                            ? "#CB2138"
                            : isActive
                              ? "rgba(246,244,239,.16)"
                              : "rgba(22,22,27,.06)",
                        color:
                          activeSlug === slug || isActive
                            ? "#F6F4EF"
                            : "#16161B",
                      }}
                      onFocus={() => handleEnter(slug)}
                      onBlur={handleLeave}
                    >
                      {cat.label}
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
