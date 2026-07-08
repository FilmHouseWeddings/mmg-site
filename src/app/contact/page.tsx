import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealEmail from "@/components/RevealEmail";

export const metadata: Metadata = {
  title: "Contact",
};

const KICKER_CLASS = "font-mono uppercase text-faint mb-[14px]";
const KICKER_STYLE = { fontSize: 11, letterSpacing: "0.16em" };

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Statement */}
        <section className="pt-[120px] pb-[60px]">
          <div className="max-w-[1200px] mx-auto px-9">
            <Reveal>
              <span
                className="block font-mono uppercase text-accent mb-[26px]"
                style={{ fontSize: 11, letterSpacing: "0.22em" }}
              >
                Contact
              </span>
              <h1
                className="font-display font-semibold m-0 text-ink"
                style={{
                  fontSize: "clamp(44px,9vw,116px)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.025em",
                }}
              >
                Let&apos;s build
                <br />
                something <span className="text-accent">lasting.</span>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Hairline rule */}
        <div className="h-px bg-line" />

        {/* Named contact block */}
        <section className="py-[70px] border-b border-line">
          <div className="max-w-[1200px] mx-auto px-9">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <h2
                    className="font-display font-semibold m-0 text-ink"
                    style={{
                      fontSize: "clamp(32px,4.5vw,54px)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Dennis Muyar
                  </h2>
                  <p
                    className="font-mono uppercase text-muted mt-2 mb-0"
                    style={{ fontSize: 12, letterSpacing: "0.12em" }}
                  >
                    Managing Director
                  </p>
                </div>
                <div>
                  <RevealEmail />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* General / Press block */}
        <section className="py-[70px] border-b border-line">
          <div className="max-w-[1200px] mx-auto px-9">
            <Reveal delay={0.05}>
              <div>
                <div className={KICKER_CLASS} style={KICKER_STYLE}>
                  General Inquiry / Press
                </div>
                <a
                  href="mailto:hello@makemovegrow.com"
                  className="font-display font-semibold text-ink no-underline pb-1 hover:text-accent transition-colors duration-[250ms]"
                  style={{
                    fontSize: "clamp(20px,2.6vw,28px)",
                    letterSpacing: "-0.01em",
                    borderBottom: "1px solid #CB2138",
                  }}
                >
                  hello@makemovegrow.com
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Studio + Social */}
        <section className="pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-9">
            <Reveal delay={0.1} className="pt-[70px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className={KICKER_CLASS} style={KICKER_STYLE}>
                    Studio
                  </div>
                  <p className="text-muted m-0" style={{ fontSize: 16 }}>
                    Los Angeles
                  </p>
                  <p className="text-muted m-0" style={{ fontSize: 16 }}>
                    Working nationwide and on location
                  </p>
                </div>

                <div>
                  <div className={KICKER_CLASS} style={KICKER_STYLE}>
                    Follow
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* TODO: real social URLs from Dennis */}
                    <a
                      href="#"
                      className="font-mono uppercase text-muted hover:text-accent transition-colors duration-[250ms] no-underline w-fit"
                      style={{ fontSize: 13, letterSpacing: "0.1em" }}
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="font-mono uppercase text-muted hover:text-accent transition-colors duration-[250ms] no-underline w-fit"
                      style={{ fontSize: 13, letterSpacing: "0.1em" }}
                    >
                      YouTube
                    </a>
                    <a
                      href="#"
                      className="font-mono uppercase text-muted hover:text-accent transition-colors duration-[250ms] no-underline w-fit"
                      style={{ fontSize: 13, letterSpacing: "0.1em" }}
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
