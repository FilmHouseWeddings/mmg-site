import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import FilterPills from "@/components/FilterPills";
import ProjectCard from "@/components/ProjectCard";
import {
  categories,
  getCaseStudiesByCategory,
  type CategorySlug,
} from "@/lib/content";

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

function getCategory(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "MMG | Work" };
  return { title: `${cat.label} — MMG` };
}

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const projects = getCaseStudiesByCategory(cat.slug as CategorySlug);

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
                className="font-display font-semibold lowercase m-0 text-ink"
                style={{
                  fontSize: "clamp(40px,7vw,86px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.02em",
                }}
              >
                {cat.label}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="text-muted mt-[26px] mb-0"
                style={{ fontSize: 19, maxWidth: "56ch" }}
              >
                {cat.blurb}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Sticky filter bar */}
        <FilterPills active={cat.slug as CategorySlug} sticky />

        {/* Project grid */}
        <section className="pt-[54px] pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            {projects.length === 0 ? (
              <p className="text-muted" style={{ fontSize: 16 }}>
                No projects in this category yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-[52px] md:grid-cols-2">
                {projects.map((cs, i) => (
                  <Reveal key={cs.slug} delay={i * 0.06}>
                    <ProjectCard cs={cs} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
