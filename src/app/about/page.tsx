import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TrustedBy from "@/components/TrustedBy";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MMG is a Los Angeles production house that executes other people's ideas — brand films, corporate events, live broadcast, and photography, delivered with fifteen years of set discipline.",
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

        {/* Stance */}
        <Reveal delay={0.1}>
          <section className="pt-[60px] pb-[10px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <p
                className="font-display text-ink m-0 max-w-[26ch]"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(26px,4vw,42px)",
                  lineHeight: 1.16,
                  letterSpacing: "-0.015em",
                }}
              >
                We are not a creative agency. We don&rsquo;t pitch concepts
                and we don&rsquo;t want the credit. You bring the idea. We
                bring the crew, the cameras, and fifteen years of making it
                look like it was never hard.
              </p>
              <div
                className="font-mono text-muted mt-[26px] max-w-[52ch]"
                style={{ fontSize: 12, letterSpacing: "0.02em", lineHeight: 1.7 }}
              >
                Your client stays your client. Your idea stays your idea. We
                execute, we deliver, we step back.
              </div>
            </div>
          </section>
        </Reveal>

        {/* Story */}
        <Reveal delay={0.14}>
          <section className="pt-[54px] pb-[10px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9">
              <div
                className="font-mono uppercase text-faint mb-[18px]"
                style={{ fontSize: 11, letterSpacing: "0.16em" }}
              >
                Our Story
              </div>
              <p
                className="font-display text-ink m-0 max-w-[40ch]"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(20px,2.8vw,30px)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;Growing up, my father filmed every birthday. He knew
                we&rsquo;d want to relive those moments someday. That changed
                my entire life &mdash; the realization that I could capture a
                moment and preserve it as a time capsule for generations to
                come.&rdquo;
              </p>
              <div
                className="font-mono uppercase text-faint mt-[18px]"
                style={{ fontSize: 11, letterSpacing: "0.16em" }}
              >
                Dennis Mulyar &mdash; Founder
              </div>
              <p
                className="text-muted mt-[30px] mb-0"
                style={{ fontSize: 17, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                MMG is led by Dennis Mulyar, a first-generation Ukrainian
                American filmmaker with a Bachelor&rsquo;s in Film and fifteen
                years on set across entertainment, beauty, and live events
                &mdash; shooting for brands like Nike, Adidas, Paramount+, and
                Snapchat, and for professional athletes across basketball,
                football, and baseball.
              </p>
              <p
                className="text-muted mt-[18px] mb-0"
                style={{ fontSize: 17, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                The instinct behind all of it hasn&rsquo;t changed since those
                birthday tapes: a moment captured well outlasts the day it was
                made. Dennis directs the craft and the crew &mdash; the
                concept stays yours. Based in Los Angeles, on location
                anywhere.
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
