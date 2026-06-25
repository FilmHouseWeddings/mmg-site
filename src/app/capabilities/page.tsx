import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { capabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "MMG | Capabilities",
};

export default function CapabilitiesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page header */}
        <section className="pt-[110px] pb-[70px]">
          <div className="max-w-[1200px] mx-auto px-9">
            <Reveal>
              <span
                className="block font-mono uppercase text-accent mb-[22px]"
                style={{ fontSize: 11, letterSpacing: "0.22em" }}
              >
                01 / Capabilities
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
                One house,<br />every format.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="text-muted mt-[26px] mb-0"
                style={{ fontSize: 19, maxWidth: "56ch" }}
              >
                Concept to final color, kept under one roof, so nothing gets
                lost in the handoff and the work stays consistent across every
                deliverable.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Capabilities list */}
        <section className="pt-5 pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-9">
            {capabilities.map((cap) => (
              <Reveal key={cap.code}>
                <div
                  className="group grid items-baseline gap-[30px] py-[38px] pl-0 hover:pl-[14px] transition-[padding-left] duration-[400ms]"
                  style={{
                    gridTemplateColumns: "70px 1fr 1.3fr",
                    borderBottom: "1px solid rgba(22,22,27,.12)",
                  }}
                >
                  <span
                    className="font-mono text-accent"
                    style={{ fontSize: 12 }}
                  >
                    {cap.code}
                  </span>
                  <span
                    className="font-display font-semibold text-ink group-hover:text-accent transition-colors duration-[400ms]"
                    style={{
                      fontSize: "clamp(22px,3vw,34px)",
                      lineHeight: 1.06,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {cap.title}
                  </span>
                  <span className="text-muted" style={{ fontSize: 16 }}>
                    {cap.description}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
