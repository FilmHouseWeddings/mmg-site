import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Copyright Policy",
  description: "MMG's copyright and ownership policy.",
};

export default function CopyrightPolicyPage() {
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
                Copyright Policy
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className="font-display font-semibold m-0 text-ink"
                style={{
                  fontSize: "clamp(32px,5vw,54px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                }}
              >
                Ownership, clearly stated.
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Policy body */}
        <Reveal delay={0.1}>
          <section className="pt-[54px] pb-[70px]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-9 flex flex-col gap-[26px]">
              {/* TODO: real policy text */}
              <p
                className="text-muted m-0"
                style={{ fontSize: 16, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                [PLACEHOLDER] All footage, photography, and deliverables
                produced by MMG remain the intellectual property of the
                commissioning client upon final payment, unless otherwise
                agreed in writing. MMG retains no ownership claim over
                client-supplied concepts, brands, or creative direction.
              </p>
              <p
                className="text-muted m-0"
                style={{ fontSize: 16, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                [PLACEHOLDER] MMG may retain internal archival copies of raw
                and edited material for production and record-keeping
                purposes only, and will not distribute, publish, or otherwise
                use client materials without prior written consent.
              </p>
              <p
                className="text-muted m-0"
                style={{ fontSize: 16, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                [PLACEHOLDER] Any third-party assets, music, or licensed
                material used in production remain subject to their
                respective licensing terms, which will be disclosed to the
                client upon request.
              </p>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
