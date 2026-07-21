import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TrustedBy from "@/components/TrustedBy";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MMG is a Los Angeles production house that executes other people's ideas: brand films, corporate events, live broadcast, and photography, delivered with fifteen years of set discipline.",
};

export default function AboutPage() {
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
                About Us
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
                We execute ideas.
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Story */}
        <Reveal delay={0.1}>
          <section className="pt-[54px] pb-[10px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <div
                className="font-mono uppercase text-faint mb-[18px]"
                style={{ fontSize: 11, letterSpacing: "0.16em" }}
              >
                Our Story
              </div>
              <p
                className="font-display text-ink m-0 max-w-[44ch]"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(20px,2.8vw,30px)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                MMG exists because of a home video. Dennis&rsquo; father
                filmed every birthday. Not for likes, for later.
                Those tapes taught Dennis early that a camera, pointed with
                intent, turns a moment into something a family keeps forever.
              </p>
              <p
                className="text-muted mt-[30px] mb-0"
                style={{ fontSize: 17, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                Fifteen years on set turned that instinct into a discipline.
                A first-generation Ukrainian American filmmaker with a
                Bachelor&rsquo;s in Film, Dennis Mulyar has shot across
                entertainment, beauty, and live events for Nike, Adidas,
                Paramount+, and Snapchat, and for professional athletes
                across basketball, football, and baseball.
              </p>
              <p
                className="text-muted mt-[18px] mb-0"
                style={{ fontSize: 17, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                Today he leads MMG from Los Angeles, directing the craft and
                the crew while the concept stays yours. The brief changes.
                The standard doesn&rsquo;t.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Hairline rule */}
        <div className="mt-[54px]" style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Formats we execute */}
        <Reveal delay={0.18}>
          <section className="pt-[54px] pb-[70px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <div
                className="font-mono uppercase text-faint mb-[22px]"
                style={{ fontSize: 11, letterSpacing: "0.16em" }}
              >
                Formats We Execute
              </div>
              <p
                className="font-display font-semibold text-ink m-0"
                style={{
                  fontSize: "clamp(24px,3.4vw,38px)",
                  lineHeight: 1.24,
                  letterSpacing: "-0.01em",
                }}
              >
                Ads &middot; Brand films &middot; Live events &middot; Live action &middot; Government initiatives &middot; Corporate campaigns
              </p>
            </div>
          </section>
        </Reveal>

        {/* Trusted by ticker */}
        <TrustedBy />
      </main>
      <Footer />
    </>
  );
}
