import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealEmail from "@/components/RevealEmail";

export const metadata: Metadata = {
  title: "Copyright Policy",
  description: "MMG's copyright and ownership policy.",
};

const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: "Your project, your ownership",
    body: "When you hire Make Move Grow, the final videos, photos, and other deliverables we create for you belong to you once the project is paid in full, unless we agree otherwise in writing. Your brand, ideas, scripts, and creative direction are always yours. We never claim ownership of them.",
  },
  {
    heading: "Raw footage and project files",
    body: "Raw footage, project files, and unused material are not part of the standard deliverables unless your agreement includes them. We keep archive copies for production and record keeping only, and we will not publish or share them without your written permission.",
  },
  {
    heading: "Our portfolio",
    body: "We may show finished work on our website, reel, and social channels only with your approval. If a project is confidential or under embargo, tell us and we will keep it private.",
  },
  {
    heading: "Music, stock, and third party material",
    body: "Licensed music, stock footage, fonts, and other third party material remain subject to their own license terms. We choose licenses that fit your intended use and will share the terms with you on request. Using a deliverable outside those terms, such as on a new platform or in paid advertising, may require an additional license.",
  },
  {
    heading: "Content on this website",
    body: "Unless noted otherwise, the text, design, and media on makemovegrow.com are owned by Make Move Grow or used with permission from our clients and partners. Please do not copy, download, or reuse them without written permission.",
  },
  {
    heading: "Copyright concerns",
    body: (
      <>
        If you believe something on this website infringes your copyright,
        contact us at <RevealEmail /> with a description of the work, where it
        appears on our site, and how to reach you. We will review it and
        respond promptly.
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: "We may update this policy from time to time. The latest version will always be posted on this page.",
  },
  {
    heading: "Contact",
    body: (
      <>
        Make Move Grow
        <br />
        <RevealEmail />
        <br />
        https://www.makemovegrow.com
      </>
    ),
  },
];

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
              <p
                className="font-mono uppercase text-faint m-0"
                style={{ fontSize: 11, letterSpacing: "0.06em" }}
              >
                Last updated: October 12, 2026
              </p>
              <p
                className="text-muted m-0"
                style={{ fontSize: 16, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                This page explains who owns the work we create, how we use it,
                and how we handle copyright on this website.
              </p>
              {sections.map((s) => (
                <div key={s.heading} style={{ maxWidth: "62ch" }}>
                  <h2
                    className="font-display font-semibold text-ink m-0 mb-[10px]"
                    style={{ fontSize: 20, lineHeight: 1.3 }}
                  >
                    {s.heading}
                  </h2>
                  <p
                    className="text-muted m-0"
                    style={{ fontSize: 16, lineHeight: 1.7 }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
