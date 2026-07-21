"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { publishedCaseStudies } from "@/lib/content";

const AUTO_ADVANCE_MS = 6000;

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// Cursor-following directional arrow shown over the slide on hover-capable devices.
function CursorArrow({ side }: { side: "left" | "right" }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.45))" }}
    >
      <path
        d={side === "left" ? "M27 12L17 22l10 10" : "M17 12l10 10-10 10"}
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSlideshow() {
  const slides = publishedCaseStudies.filter((cs) => cs.heroVideo);

  const [active, setActive] = useState(0);
  const [navCount, setNavCount] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [arrowSide, setArrowSide] = useState<"left" | "right">("right");
  const [arrowActive, setArrowActive] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [brandMounted, setBrandMounted] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

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

  // Detect hover-capable, fine-pointer devices (desktop) to enable directional zones.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Intro choreography: brand statement fades in on paper, then cross-fades into
  // the revealed slideshow. Runs once per mount. Uses useLayoutEffect (rather than
  // useEffect) so the prefers-reduced-motion skip is applied before first paint,
  // avoiding any flash of the statement/paper frame.
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setRevealed(true);
      setBrandMounted(false);
      return;
    }

    const fadeInTimer = requestAnimationFrame(() => setBrandVisible(true));
    const crossfadeTimer = setTimeout(() => {
      setBrandVisible(false);
      setRevealed(true);
    }, 1300);
    const unmountTimer = setTimeout(() => setBrandMounted(false), 1300 + 600);
    return () => {
      cancelAnimationFrame(fadeInTimer);
      clearTimeout(crossfadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // Auto-advance every 6s, forever. Manual nav restarts the interval (via navCount)
  // rather than killing it. Gated on `revealed` so slide 1 gets its full 6s once
  // the slideshow is actually visible.
  useEffect(() => {
    if (slides.length < 2 || reducedMotion || !revealed) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [slides.length, reducedMotion, navCount, revealed]);

  if (slides.length === 0) return null;

  function goTo(index: number) {
    setNavCount((n) => n + 1);
    setActive((index + slides.length) % slides.length);
  }

  function handleContainerMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (arrowRef.current) {
      arrowRef.current.style.transform = `translate3d(${x - 22}px, ${y - 22}px, 0)`;
    }
    const side = x < rect.width / 2 ? "left" : "right";
    setArrowSide((prev) => (prev === side ? prev : side));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    }
  }

  return (
    <section className="relative px-4 md:px-9 pt-[70px] lg:pt-[128px]">
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden outline-none ${
          revealed ? "bg-ink" : "bg-paper"
        }`}
        style={{ height: "clamp(420px, 70vh, 820px)" }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseMove={handleContainerMouseMove}
        onMouseEnter={() => canHover && setArrowActive(true)}
        onMouseLeave={() => setArrowActive(false)}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
          aria-hidden={!revealed}
        >
        {slides.map((slide, index) => {
          const isActive = index === active;
          const isNext = index === (active + 1) % slides.length;
          const shouldMount = inView && (isActive || isNext);

          const media = (
            <>
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
            </>
          );

          const titleBlock = (
            <div className="font-display text-white m-0">
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
          );

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
              {canHover ? (
                <>
                  <div className="absolute inset-0">{media}</div>

                  {/* Directional hover/click zones (desktop pointer devices only) */}
                  <div
                    className="absolute inset-y-0 left-0 z-10 w-1/2"
                    style={{ cursor: "none" }}
                    onClick={() => goTo(active - 1)}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-y-0 right-0 z-10 w-1/2"
                    style={{ cursor: "none" }}
                    onClick={() => goTo(active + 1)}
                    aria-hidden="true"
                  />

                  <Link
                    href={`/project/${slide.slug}`}
                    className="group absolute bottom-0 left-0 z-20 p-6 md:p-10"
                    onMouseEnter={() => setArrowActive(false)}
                    onMouseLeave={() => setArrowActive(true)}
                  >
                    {titleBlock}
                  </Link>
                </>
              ) : (
                <Link href={`/project/${slide.slug}`} className="group absolute inset-0 block">
                  {media}
                  <div className="absolute bottom-0 left-0 p-6 md:p-10">{titleBlock}</div>
                </Link>
              )}
            </div>
          );
        })}
        </div>

        {/* Cursor-following directional arrow (desktop pointer devices only) */}
        {canHover && (
          <div
            ref={arrowRef}
            className="pointer-events-none absolute top-0 left-0 z-30 transition-opacity duration-150"
            style={{ opacity: arrowActive ? 1 : 0, willChange: "transform" }}
            aria-hidden="true"
          >
            <CursorArrow side={arrowSide} />
          </div>
        )}

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
              transition: brandVisible
                ? "opacity 0.3s ease"
                : "opacity 0.6s ease",
            }}
          >
            Ideas deserve <span className="text-accent">execution.</span>
          </h1>
        )}
      </div>

      {/* Progress bar */}
      {slides.length > 1 && (
        <div
          className="relative w-full mt-4 md:mt-5 overflow-hidden"
          style={{ height: 2, background: "rgba(22,22,27,0.12)" }}
        >
          {!reducedMotion && revealed && (
            <div
              key={`${active}-${navCount}`}
              className="absolute inset-y-0 left-0 bg-accent"
              style={{
                animation: `hero-progress-fill ${AUTO_ADVANCE_MS}ms linear forwards`,
              }}
            />
          )}
        </div>
      )}

      {/* Controls */}
      {slides.length > 1 && (
        <div className="flex items-center justify-between mt-3">
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
              className="p-2 text-accent transition-colors duration-200 hover:text-accent-dark"
            >
              <ChevronLeft className="w-9 h-9 lg:w-7 lg:h-7" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goTo(active + 1)}
              className="p-2 text-accent transition-colors duration-200 hover:text-accent-dark"
            >
              <ChevronRight className="w-9 h-9 lg:w-7 lg:h-7" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
