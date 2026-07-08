"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/lib/content";

const AUTO_ADVANCE_MS = 6000;

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function HeroSlideshow() {
  const slides = caseStudies.filter((cs) => cs.heroVideo);

  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [brandMounted, setBrandMounted] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Observe when the slideshow enters the viewport before mounting any Vimeo embeds.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Respect prefers-reduced-motion for auto-advance.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Brand statement: fade in on mount, hold, then fade out.
  useEffect(() => {
    const fadeInTimer = requestAnimationFrame(() => setBrandVisible(true));
    const fadeOutTimer = setTimeout(() => setBrandVisible(false), 2500);
    const unmountTimer = setTimeout(() => setBrandMounted(false), 2500 + 800);
    return () => {
      cancelAnimationFrame(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // Auto-advance every 6s, paused permanently after any manual interaction.
  useEffect(() => {
    if (slides.length < 2 || interacted || reducedMotion) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [slides.length, interacted, reducedMotion]);

  if (slides.length === 0) return null;

  function goTo(index: number) {
    setInteracted(true);
    setActive((index + slides.length) % slides.length);
  }

  return (
    <section className="relative px-4 md:px-9 pt-[70px]">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-ink"
        style={{ height: "clamp(420px, 70vh, 820px)" }}
      >
        {slides.map((slide, index) => {
          const isActive = index === active;
          const isNext = index === (active + 1) % slides.length;
          const shouldMount = inView && (isActive || isNext);

          return (
            <div
              key={slide.slug}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.8s ease",
                pointerEvents: isActive ? "auto" : "none",
              }}
              aria-hidden={!isActive}
            >
              <Link href={`/project/${slide.slug}`} className="group absolute inset-0 block">
                <div className="absolute inset-0" style={{ background: slide.bg }} />
                {shouldMount && slide.heroVideo && (
                  <iframe
                    src={`https://player.vimeo.com/video/${slide.heroVideo.vimeoId}?h=${slide.heroVideo.vimeoHash ?? ""}&badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1`}
                    loading="lazy"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute inset-0 h-full w-full"
                  />
                )}

                {/* Bottom scrim for legibility */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
                  }}
                />

                <div className="absolute bottom-0 left-0 p-6 md:p-10">
                  <h2
                    className="font-display text-white m-0"
                    style={{
                      fontSize: "clamp(24px, 3vw, 38px)",
                      fontWeight: 500,
                      lineHeight: 1.05,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className="font-mono text-white/80 mt-2 mb-0"
                    style={{ fontSize: 12, letterSpacing: "0.05em" }}
                  >
                    {slide.roleLine}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}

        {/* Brand statement overlay */}
        {brandMounted && (
          <h1
            className="font-display absolute inset-0 flex items-center justify-center text-center px-6 pointer-events-none m-0"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              opacity: brandVisible ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            Ideas deserve <span className="text-accent">execution.</span>
          </h1>
        )}
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <div className="flex items-center justify-between mt-4 md:mt-5">
          <div className="flex items-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.slug}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className="h-[2px] w-[18px] transition-colors duration-200"
                style={{
                  background:
                    index === active ? "var(--color-accent)" : "rgba(22,22,27,0.2)",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => goTo(active - 1)}
              className="text-accent transition-colors duration-200 hover:text-accent-dark"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goTo(active + 1)}
              className="text-accent transition-colors duration-200 hover:text-accent-dark"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
