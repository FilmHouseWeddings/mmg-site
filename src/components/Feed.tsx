"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { feedCaseStudies, categories, type CaseStudy } from "@/lib/content";
import Reveal from "./Reveal";

function categoryLabel(cs: CaseStudy): string {
  const slug = cs.categories[0];
  if (!slug) return "";
  const match = categories.find((c) => c.slug === slug);
  return match ? match.label : slug;
}

function FeedMedia({ cs }: { cs: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const vimeo =
    cs.heroVideo ??
    (cs.media.find((m) => m.type === "vimeo") as
      | { type: "vimeo"; vimeoId: string; vimeoHash?: string }
      | undefined);

  useEffect(() => {
    if (!vimeo) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [vimeo]);

  return (
    <div
      ref={ref}
      className="relative aspect-video w-full overflow-hidden"
      style={{ background: cs.bg }}
    >
      {vimeo && inView && (
        <iframe
          src={`https://player.vimeo.com/video/${vimeo.vimeoId}?h=${vimeo.vimeoHash ?? ""}&badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1`}
          loading="lazy"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}

export default function Feed() {
  return (
    <section className="pt-20 md:pt-28 pb-20 md:pb-28">
      <div className="max-w-[1400px] mx-auto px-4 md:px-9 flex flex-col gap-14 lg:gap-24">
        {feedCaseStudies.map((cs, index) => {
          const reversed = index % 2 === 1;
          return (
            <Link
              key={cs.slug}
              href={`/project/${cs.slug}`}
              className="group flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-[3%]"
            >
              <Reveal
                className={`w-full lg:w-[49%] ${reversed ? "lg:order-2" : "lg:order-1"}`}
              >
                <FeedMedia cs={cs} />
              </Reveal>

              <Reveal
                delay={0.15}
                className={`w-full lg:w-[48%] flex flex-col items-start ${reversed ? "lg:order-1" : "lg:order-2"}`}
              >
                <span
                  className="hidden lg:inline-block font-mono text-accent uppercase mb-3"
                  style={{ fontSize: 12.8, letterSpacing: "0.02em" }}
                >
                  {categoryLabel(cs)}
                </span>

                <h3
                  className="font-display text-ink m-0 transition-colors duration-200 ease-out group-hover:text-accent"
                  style={{
                    fontSize: "clamp(28px, 3vw, 38px)",
                    fontWeight: 500,
                    lineHeight: 0.9,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cs.title}
                </h3>

                <span className="hidden lg:inline-flex items-center gap-1.5 font-mono text-ink uppercase mt-6 transition-colors duration-200 ease-out group-hover:text-accent">
                  <span style={{ fontSize: 12, letterSpacing: "0.05em" }}>
                    View Project
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Reveal>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
