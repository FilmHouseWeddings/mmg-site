import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import ProjectSections from "@/components/ProjectSections";
import TrustedBy from "@/components/TrustedBy";
import { getCaseStudy, type CaseStudy, type Section } from "@/lib/content";
import {
  publishedServicePages,
  getServicePage,
  realText,
  realItems,
  realFaqs,
} from "@/lib/services";
import { SITE_URL } from "@/lib/seo";
import { getThumbnailsBySlug } from "@/lib/vimeo";

export async function generateStaticParams() {
  return publishedServicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: "Services" };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: { title: page.metaTitle, description: page.metaDescription },
    twitter: { title: page.metaTitle, description: page.metaDescription },
  };
}

const KICKER_CLASS = "font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-3";

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const url = `${SITE_URL}/services/${page.slug}`;
  const proof = page.proofSlugs
    .map((s) => getCaseStudy(s))
    .filter((cs): cs is CaseStudy => Boolean(cs && cs.published));
  const thumbnails = await getThumbnailsBySlug(proof);
  const intro = realText(page.intro);
  const turnaround = realText(page.turnaround);
  const faqs = realFaqs(page.faqs);
  const otherServices = publishedServicePages.filter((s) => s.slug !== page.slug);

  // Deliverables, process, and turnaround share the project page's editorial
  // block, so service pages read like the rest of the site.
  const blocks: Section[] = [
    { kicker: "What you get", bullets: realItems(page.deliverables) },
    { kicker: "How a shoot runs", bullets: realItems(page.process) },
    ...(turnaround.length ? [{ kicker: "Turnaround", body: turnaround }] : []),
    ...(page.sections ?? []),
  ];

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.h1,
      serviceType: page.serviceType,
      description: page.answer,
      url,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: page.areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: page.name, item: url },
      ],
    },
  ];
  if (faqs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <Header />
      <main>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Hero renders without Reveal so the H1 and answer paint on first
            load instead of waiting for hydration. */}
        <section className="pt-[110px] pb-[54px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Link
              href="/services"
              className="block font-mono uppercase text-accent mb-[22px] no-underline hover:text-ink transition-colors duration-200"
              style={{ fontSize: 11, letterSpacing: "0.22em" }}
            >
              {page.kicker}
            </Link>
            <h1
              className="font-display font-semibold m-0 text-ink"
              style={{
                fontSize: "clamp(36px,6vw,72px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                maxWidth: "18ch",
              }}
            >
              {page.h1}
            </h1>
            <p
              className="text-ink mt-[30px] mb-0"
              style={{ fontSize: 20, lineHeight: 1.55, maxWidth: "60ch" }}
            >
              {page.answer}
            </p>
          </div>
        </section>

        <div className="h-px bg-line" />

        <section className="pt-[54px] pb-[30px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            {intro.map((para, i) => (
              <p
                key={i}
                className={`max-w-[680px] text-[17px] leading-[1.7] text-muted${i > 0 ? " mt-5" : " mt-0"}`}
              >
                {para}
              </p>
            ))}

            <ProjectSections sections={blocks} />

            {page.proofStats && page.proofStats.length > 0 && (
              <ProjectSections sections={[{ kicker: "By the numbers", bullets: page.proofStats }]} />
            )}
          </div>
        </section>

        {proof.length > 0 && (
          <section className="pt-[54px] pb-[30px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <Reveal>
                <h2 className={`${KICKER_CLASS} mb-6`}>Recent work</h2>
              </Reveal>
              <div className="grid grid-cols-1 gap-x-8 gap-y-[52px] md:grid-cols-2">
                {proof.map((cs, i) => (
                  <Reveal key={cs.slug} delay={i * 0.06}>
                    <ProjectCard cs={cs} thumbnailUrl={thumbnails[cs.slug]} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.testimonial && (
          <section className="pt-[54px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <Reveal>
                <figure className="m-0 max-w-[760px]">
                  <blockquote
                    className="font-display font-semibold text-ink m-0"
                    style={{ fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.25 }}
                  >
                    “{page.testimonial.quote}”
                  </blockquote>
                  <figcaption className="font-mono uppercase text-muted mt-4" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
                    {page.testimonial.name}, {page.testimonial.title}
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="pt-[54px] pb-[30px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <Reveal>
                <h2 className={KICKER_CLASS}>Questions</h2>
              </Reveal>
              <div className="max-w-[760px] border-t border-line-2 mt-5">
                {faqs.map((f) => (
                  <Reveal key={f.q}>
                    <div className="border-b border-line-2 py-6">
                      <h3
                        className="font-display font-semibold text-ink m-0"
                        style={{ fontSize: 21, lineHeight: 1.25, letterSpacing: "-0.01em" }}
                      >
                        {f.q}
                      </h3>
                      <p className="text-[16px] leading-[1.7] text-muted mt-3 mb-0">{f.a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {otherServices.length > 0 && (
          <section className="pt-[54px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <Reveal>
                <h2 className={KICKER_CLASS}>More services</h2>
                <ul className="list-none m-0 p-0 mt-5 max-w-[760px] border-t border-line-2">
                  {otherServices.map((s) => (
                    <li key={s.slug} className="border-b border-line-2">
                      <Link
                        href={`/services/${s.slug}`}
                        className="block py-4 font-display font-semibold text-ink hover:text-accent transition-colors duration-200 no-underline"
                        style={{ fontSize: 21, letterSpacing: "-0.01em" }}
                      >
                        {s.linkLabel} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}

        <TrustedBy />

        <section className="pt-[90px] pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal>
              <h2
                className="font-display font-semibold m-0 text-ink"
                style={{ fontSize: "clamp(30px,4.5vw,48px)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
              >
                Your concept. <span className="text-accent">Our execution.</span>
              </h2>
              <p className="text-muted mt-5 mb-8" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: "52ch" }}>
                Tell us the date, the place, and what you need delivered. We will come back fast with a plan and a quote.
              </p>
              <Link
                href="/contact"
                className="inline-block font-mono uppercase text-paper bg-ink hover:bg-accent transition-colors duration-[250ms] no-underline px-7 py-[15px]"
                style={{ fontSize: 12, letterSpacing: "0.14em" }}
              >
                Start a project
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
