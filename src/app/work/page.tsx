import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { categories, caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
};

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

        {/* Category blocks */}
        <section className="pt-4 pb-[70px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal>
              <div
                className="font-mono uppercase text-accent mb-[18px]"
                style={{ fontSize: 11, letterSpacing: "0.16em" }}
              >
                Content Creation
              </div>
            </Reveal>
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 0.06}>
                <div
                  className="group flex flex-col gap-5 py-[40px] md:flex-row md:items-center md:justify-between md:gap-8"
                  style={{ borderBottom: "1px solid rgba(22,22,27,.12)" }}
                >
                  <div className="flex-1">
                    <h2
                      className="font-display font-semibold lowercase text-accent m-0"
                      style={{
                        fontSize: "clamp(32px,5vw,58px)",
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {cat.label}
                    </h2>
                    <p
                      className="text-muted mt-[14px] mb-0"
                      style={{ fontSize: 16, maxWidth: "48ch" }}
                    >
                      {cat.blurb}
                    </p>
                  </div>
                  <Link
                    href={`/work/${cat.slug}`}
                    className="font-mono uppercase whitespace-nowrap rounded-full px-6 py-[12px] no-underline transition-colors duration-200 bg-[rgba(22,22,27,.06)] text-ink hover:bg-accent hover:text-paper"
                    style={{ fontSize: 11, letterSpacing: "0.14em" }}
                  >
                    View {cat.label}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Full project grid */}
        <section className="pt-4 pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal>
              <div
                className="font-mono uppercase text-faint mb-[34px]"
                style={{ fontSize: 11, letterSpacing: "0.16em" }}
              >
                All Projects
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-x-8 gap-y-[52px] md:grid-cols-2">
              {caseStudies.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.06}>
                  <ProjectCard cs={cs} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
