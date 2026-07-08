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
              {/* TODO: replace with Dennis's real story */}
              <p
                className="text-muted m-0"
                style={{ fontSize: 17, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                [PLACEHOLDER] MMG started on real sets, not in a pitch deck —
                fifteen years of call sheets, load-ins, and last-minute fixes
                built the way we work today. We&rsquo;re a Los Angeles
                production house that grew out of set discipline: show up
                prepared, solve problems quietly, and deliver on time, every
                time. Agencies and brands bring us the idea; we bring the
                crew that makes it real.
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
                Your campaign, filmed. Your event, captured.
                <br className="hidden md:block" /> Your broadcast, run live.
                Your stills, shot.
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
