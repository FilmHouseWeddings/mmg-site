import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  publishedCaseStudies,
  getCaseStudy,
  getRelated,
  isPlaceholder,
  hasRealCredits,
} from "@/lib/content";
import Reveal from "@/components/Reveal";
import CaseVideo from "@/components/CaseVideo";
import CreditsBlock from "@/components/CreditsBlock";
import PhotoCollage from "@/components/PhotoCollage";
import RelatedProjects from "@/components/RelatedProjects";
import { getThumbnailsBySlug } from "@/lib/vimeo";

export async function generateStaticParams() {
  return publishedCaseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs || !cs.published) {
    return { title: "Project" };
  }

  return {
    title: cs.title,
    description: isPlaceholder(cs.synopsis) ? cs.roleLine : cs.synopsis,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs || !cs.published) notFound();

  const related = getRelated(cs);
  const relatedThumbnails = await getThumbnailsBySlug(related);
  const secondaryMedia = cs.media.slice(1);

  return (
    <main className="bg-paper">
      <div className="max-w-[1200px] mx-auto px-5 md:px-9 pt-8 pb-20 md:pb-28">
        <Reveal>
          <Link
            href="/work"
            className="inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-accent transition-colors duration-200 mb-6"
          >
            ← Work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <CaseVideo
            vimeoId={cs.heroVideo?.vimeoId}
            vimeoHash={cs.heroVideo?.vimeoHash}
            bg={cs.bg}
            hero
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 md:mt-10">
            <h1
              className="font-display font-black text-ink leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
            >
              {cs.title}
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mt-4">
              {cs.roleLine}
            </p>
          </div>
        </Reveal>

        {/* Template sections below auto-appear once real copy replaces the
            [PLACEHOLDER] strings / TBD credits in content.ts. */}
        {!isPlaceholder(cs.synopsis) && (
          <Reveal delay={0.14}>
            <p className="max-w-[680px] text-[19px] leading-[1.6] text-ink mt-8 md:mt-10">
              {cs.synopsis}
            </p>
          </Reveal>
        )}

        {!isPlaceholder(cs.whatWeDid) && (
          <Reveal delay={0.18}>
            <div className="mt-10 md:mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-3">
                What We Did
              </p>
              <p className="max-w-[680px] text-[16px] leading-[1.7] text-muted">
                {cs.whatWeDid}
              </p>
            </div>
          </Reveal>
        )}

        {cs.photos && cs.photos.length > 0 && (
          <Reveal delay={0.22}>
            <div className="mt-14 md:mt-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-5">
                {cs.photosLabel ?? "Photography"}
              </p>
              <PhotoCollage photos={cs.photos} />
            </div>
          </Reveal>
        )}

        {secondaryMedia.length > 0 && (
          <div className="mt-14 md:mt-20 flex flex-col gap-8 md:gap-12">
            {secondaryMedia.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                {item.type === "vimeo" ? (
                  <CaseVideo
                    vimeoId={item.vimeoId}
                    vimeoHash={item.vimeoHash}
                    bg={cs.bg}
                  />
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        )}

        {hasRealCredits(cs.credits) && (
          <div className="mt-16 md:mt-24">
            <CreditsBlock credits={cs.credits} />
          </div>
        )}

        <div className="mt-16 md:mt-24">
          <RelatedProjects items={related} thumbnails={relatedThumbnails} />
        </div>
      </div>
    </main>
  );
}
