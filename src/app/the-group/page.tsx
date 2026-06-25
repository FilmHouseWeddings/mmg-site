import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { divisions } from "@/lib/content";

export const metadata: Metadata = {
  title: "MMG | The Group",
};

export default function TheGroupPage() {
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
                03 / The Group
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
                Built to scale.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="text-muted mt-[26px] mb-0"
                style={{ fontSize: 19, maxWidth: "56ch" }}
              >
                One company, organized like a studio, so it can grow arms
                without losing the standard that holds it together. Three
                disciplines, one roof, one bar for the work.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Divisions list */}
        <section className="pt-5 pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-9">
            {divisions.map((div) => (
              <Reveal key={div.nameAccent}>
                <div
                  className="grid items-baseline gap-10 py-[48px] max-[820px]:grid-cols-1 max-[820px]:gap-[14px]"
                  style={{
                    gridTemplateColumns: "280px 1fr",
                    borderBottom: "1px solid rgba(22,22,27,.12)",
                  }}
                >
                  <div>
                    <div
                      className="font-display font-extrabold text-ink"
                      style={{
                        fontSize: "clamp(28px,4vw,42px)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {div.name}{" "}
                      <b className="text-accent">{div.nameAccent}</b>
                    </div>
                    <div
                      className="font-mono uppercase text-faint mt-[10px]"
                      style={{ fontSize: 11, letterSpacing: "0.14em" }}
                    >
                      {div.role}
                    </div>
                  </div>
                  <div>
                    <p
                      className="font-display font-semibold text-ink m-0 mb-[14px]"
                      style={{ fontSize: 20 }}
                    >
                      {div.lead}
                    </p>
                    <p
                      className="text-muted m-0"
                      style={{ fontSize: 17, maxWidth: "54ch" }}
                    >
                      {div.body}
                    </p>
                  </div>
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
