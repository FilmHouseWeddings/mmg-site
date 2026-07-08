import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Pillars, { type Pillar, type PillarCategory } from "@/components/Pillars";
import { categories, caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
};

// Preview video/gradient per category — first case study in that category
// with a heroVideo, else the first case study's bg gradient.
const previewCategories: PillarCategory[] = categories.map((cat) => {
  const withVideo = caseStudies.find(
    (cs) => cs.categories.includes(cat.slug) && cs.heroVideo
  );
  const fallback = caseStudies.find((cs) => cs.categories.includes(cat.slug));
  return {
    slug: cat.slug,
    label: cat.label,
    vimeoId: withVideo?.heroVideo?.vimeoId,
    vimeoHash: withVideo?.heroVideo?.vimeoHash,
    bg:
      (withVideo ?? fallback)?.bg ??
      "linear-gradient(155deg,#2b2b33,#0e0e12)",
  };
});

const pillars: Pillar[] = [
  {
    heading: "content creation",
    sentence:
      "Cinematic, whatever the brief — filmed, cut, and delivered ready to run.",
    categorySlugs: categories.map((cat) => cat.slug),
  },
];

export default function WorkPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page header */}
        <section className="pt-[110px] pb-[54px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal>
              <span
                className="block font-mono uppercase text-accent mb-[22px]"
                style={{ fontSize: 11, letterSpacing: "0.22em" }}
              >
                02 / Work
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className="font-display font-semibold m-0 text-ink"
                style={{
                  fontSize: "clamp(40px,7vw,86px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.02em",
                }}
              >
                Work, not words.
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Positioning intro */}
        <section className="pb-[64px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal delay={0.1}>
              <p
                className="text-muted m-0"
                style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "62ch" }}
              >
                We are not a creative agency. We don&rsquo;t pitch concepts and
                we don&rsquo;t want the credit. You bring the idea. We bring
                the crew, the cameras, and fifteen years of making it look
                like it was never hard.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Pillars */}
        <Pillars pillars={pillars} categories={previewCategories} />
      </main>
      <Footer />
    </>
  );
}
