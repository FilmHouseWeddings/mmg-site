import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealEmail from "@/components/RevealEmail";

// Hidden page: not linked from nav or footer and left out of the sitemap.
// It exists so the Google OAuth consent screen has a privacy policy URL.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Make Move Grow collects, uses, and protects your information.",
  robots: { index: false, follow: true },
};

const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: "Information we collect",
    body: "We collect information you give us directly, such as your name, email address, phone number, company name, and any details you share when you contact us, request a quote, or work with us on a project. We may also collect basic website usage data, such as pages visited and browser type, through standard analytics tools.",
  },
  {
    heading: "How we use it",
    body: "We use your information to reply to you, share our work and project information, plan and deliver video production services, send invoices, and improve our website. We may send occasional business emails about our services. You can opt out at any time.",
  },
  {
    heading: "What we don't do",
    body: "We do not sell, rent, or trade your personal information. We share it only with trusted service providers who help us run our business, such as email, scheduling, and payment tools, or when required by law.",
  },
  {
    heading: "Email and Google data",
    body: "We use Google services to send and manage our business email. Any data accessed through Google is used only to send and organize our own email, and is never sold or used for advertising.",
  },
  {
    heading: "Data security",
    body: "We take reasonable steps to protect your information. No method of storage or transfer online is completely secure, but we work to keep your data safe.",
  },
  {
    heading: "Your choices",
    body: (
      <>
        You can ask us to update or delete your information, or to stop
        emailing you, at any time by contacting us at <RevealEmail />. We will
        honor your request promptly.
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

export default function PrivacyPolicyPage() {
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
                Last updated: October 12, 2026
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
                Privacy Policy
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
                className="text-muted m-0"
                style={{ fontSize: 16, lineHeight: 1.7, maxWidth: "62ch" }}
              >
                Make Move Grow (&ldquo;MMG,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us&rdquo;) respects your privacy. This page explains
                what information we collect, how we use it, and the choices
                you have.
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
