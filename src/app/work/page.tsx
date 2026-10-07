import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Pillars, { type Pillar, type PillarCategory } from "@/components/Pillars";
import ProjectCard from "@/components/ProjectCard";
import { categories, caseStudies } from "@/lib/content";
import { getThumbnailsBySlug } from "@/lib/vimeo";

export const metadata: Metadata = {
  title: "What We Do",
};

// Preview footage per category pill. live-action is still cross-assigned
// ([PLACEHOLDER]) — replace with real live-action footage when available.
const PREVIEW_OVERRIDES: Record<string, string> = {
  branded: "crave-4orce-goldberg",
  "event-coverage": "emmys-governors-ball",
  "live-action": "adizero-lightest-cleat",
};

// Preview video/gradient per category — override slug (if set) → first case
// study in that category with a heroVideo → first case study's bg gradient.
const previewCategories: PillarCategory[] = categories.map((cat) => {
  const overrideSlug = PREVIEW_OVERRIDES[cat.slug];
  const override = overrideSlug ? caseStudies.find((cs) => cs.slug === overrideSlug) : undefined;
  const withVideo =
    override ??
    caseStudies.find((cs) => cs.categories.includes(cat.slug) && cs.heroVideo);
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
      "We handle the whole thing, filming, editing, and delivery, so you get a finished video ready to post or play.",
    categorySlugs: categories.map((cat) => cat.slug),
  },
];

const SERVICES = [
  "Brand films",
  "Event coverage",
  "Photography",
  "Motion graphics",
  "Social cutdowns",
  "Live broadcast",
];

// Public sector proof point for the Cities and public agencies block.
const LANCASTER = caseStudies.find((cs) => cs.slug === "city-of-lancaster-commercial");

export default async function WorkPage() {
  const thumbnails = LANCASTER ? await getThumbnailsBySlug([LANCASTER]) : {};

  return (
    <>
      <Header />
      <main>
        {/* Page header */}
        <section className="pt-[110px] pb-[88px]">
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
                Ideas deserve <span className="text-accent">execution.</span>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Pillars */}
        <Pillars pillars={pillars} categories={previewCategories} />

        {/* Services */}
        <section className="pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal>
              <h2
                className="font-mono uppercase text-accent m-0 mb-[22px] font-normal"
                style={{ fontSize: 11, letterSpacing: "0.22em" }}
              >
                Services
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 list-none m-0 p-0 border-b border-line">
                {SERVICES.map((service, i) => (
                  <li
                    key={service}
                    className="flex items-baseline gap-5 border-t border-line py-5"
                  >
                    <span
                      className="font-mono text-faint"
                      style={{ fontSize: 11, letterSpacing: "0.14em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-display font-semibold text-ink"
                      style={{ fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-0.01em" }}
                    >
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Cities and public agencies */}
        {LANCASTER && (
          <section className="pb-[110px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start">
                <Reveal>
                  <h2
                    className="font-mono uppercase text-accent m-0 mb-[22px] font-normal"
                    style={{ fontSize: 11, letterSpacing: "0.22em" }}
                  >
                    Cities and public agencies
                  </h2>
                  <p
                    className="text-ink m-0 max-w-[460px]"
                    style={{ fontSize: 19, lineHeight: 1.6 }}
                  >
                    We produce for cities and public agencies with the same crew, care, and
                    finish we bring to brands. For the City of Lancaster, that meant a
                    commercial selling the city itself.
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <ProjectCard cs={LANCASTER} thumbnailUrl={thumbnails[LANCASTER.slug]} />
                </Reveal>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
