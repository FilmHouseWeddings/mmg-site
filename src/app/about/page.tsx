import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TrustedBy from "@/components/TrustedBy";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Fifteen years of production experience. MMG is a Los Angeles production house built for brands, agencies, and institutions: brand films, corporate events, live broadcast, and photography, executed at the highest standard. The concept stays yours.",
};

// Experience and working range surfaced under the About headline. These describe
// craft tenure and reach — deliberately not a company founding date.
const STATS: { value: string; label: string }[] = [
  { value: "15 years", label: "Of experience" },
  { value: "Worldwide", label: "Nationwide and on location" },
];

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

            <Reveal delay={0.12}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mt-[46px] max-w-[640px]">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="font-display font-semibold text-ink"
                      style={{
                        fontSize: "clamp(28px,4vw,44px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-mono uppercase text-faint mt-[10px]"
                      style={{ fontSize: 11, letterSpacing: "0.16em" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
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
                MMG exists because executing an idea shouldn&rsquo;t be
                complicated. We take the concept, handle everything it takes
                to bring it to life, and deliver it to the highest standard,
                because our goal is your growth. Every piece of content
                should elevate your brand, so more people see your story and
                hear your message.
              </p>
              <p
                className="text-muted mt-[30px] mb-0"
                style={{ fontSize: 17, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                Led by fifteen years of production experience, MMG is a Los
                Angeles production house built for brands, agencies, and
                institutions that need their story executed at the highest
                level. The team has shot for Nike, Adidas,
                Paramount+, Snapchat, Augustinus Bader, Anastasia Beverly
                Hills, and Sequoia Productions. The concept stays yours. The
                execution is ours.
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
