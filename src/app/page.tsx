import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import BrandStatement from "@/components/BrandStatement";
import TrustedBy from "@/components/TrustedBy";
import Feed from "@/components/Feed";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { heroSlideCaseStudies } from "@/lib/content";
import { getThumbnailsBySlug } from "@/lib/vimeo";

export default async function Home() {
  // Hero posters: a still per slide so the hero is never an empty box while
  // the Vimeo player boots.
  const posters = await getThumbnailsBySlug(heroSlideCaseStudies);

  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">
          MMG: content experts for brands, PR firms, agencies, and event teams in Los Angeles and Orange County
        </h1>
        <HeroSlideshow posters={posters} />
        <TrustedBy />
        <BrandStatement />
        <Feed />
        <section className="pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto px-4 md:px-9">
            <Link
              href="/work#case-studies"
              className="font-mono text-ink uppercase no-underline hover:text-accent transition-colors duration-200"
              style={{ fontSize: 12, letterSpacing: "0.05em" }}
            >
              Case studies &rarr;
            </Link>
          </div>
        </section>
        <section className="pb-[96px] md:pb-[140px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal>
              <p
                className="font-display font-semibold text-ink m-0"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 46px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  maxWidth: "26ch",
                }}
              >
                Backed by 15 years of experience. Bring us the <span className="text-accent">idea,</span> we&apos;ll execute it.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
