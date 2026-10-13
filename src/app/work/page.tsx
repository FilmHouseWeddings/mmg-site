import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Pillars, { type Pillar, type PillarCategory } from "@/components/Pillars";
import CaseStudyStrip, { type StripCard } from "@/components/CaseStudyStrip";
import { categories, caseStudies, publishedCaseStudies, services } from "@/lib/content";
import { getVimeoThumbnail } from "@/lib/vimeo";
import { getServiceHref } from "@/lib/services";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Content experts for brands, PR firms, agencies, and event teams: event and launch coverage, red carpet interviews, same day recaps, cinematic commercials, brand films, and photography. Los Angeles and Orange County.",
};

// Preview footage per category pill. Pills without an override fall back to the
// first project in that category; empty ones show the gradient until work lands.
const PREVIEW_OVERRIDES: Record<string, string> = {
  "events-launches": "emmys-governors-ball",
  "brand-campaigns": "crave-4orce-goldberg",
  "fashion-apparel": "adizero-lightest-cleat",
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
      "We back up your team on events, launches, and press moments. We handle filming, editing, and delivery, so you get finished video and photo ready to post or play.",
    categorySlugs: categories.map((cat) => cat.slug),
  },
];



// Every pill must show something on hover: its own stills, or failing that a
// frame from its video.
async function buildStripCards(): Promise<StripCard[]> {
  return Promise.all(
    publishedCaseStudies
      .filter((cs) => cs.caseStudy)
      .map(async (cs) => {
        let photos = cs.stripPhotos ?? [];
        if (photos.length === 0 && cs.heroVideo) {
          const poster = await getVimeoThumbnail(cs.heroVideo.vimeoId, cs.heroVideo.vimeoHash);
          if (poster) photos = [{ src: poster, alt: cs.title, w: 1280, h: 720 }];
        }
        return { slug: cs.slug, client: cs.client, photos };
      })
  );
}

export default async function WorkPage() {
  const stripCards = await buildStripCards();

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

        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Case studies */}
        <CaseStudyStrip cards={stripCards} />

        {/* Services */}
        <section className="pt-[40px] pb-[110px]">
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
                {services.map((service, i) => {
                  const href = getServiceHref(service);
                  return (
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
                    {/* Services with their own page link to it; the list looks
                        the same until hover. */}
                    {href ? (
                      <Link
                        href={href}
                        className="font-display font-semibold text-ink hover:text-accent transition-colors duration-200 no-underline"
                        style={{ fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-0.01em" }}
                      >
                        {service}
                      </Link>
                    ) : (
                      <span
                        className="font-display font-semibold text-ink"
                        style={{ fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-0.01em" }}
                      >
                        {service}
                      </span>
                    )}
                  </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
