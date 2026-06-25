import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MMG | Contact",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Statement */}
        <section className="pt-[120px] pb-[60px]">
          <div className="max-w-[1200px] mx-auto px-9">
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
              Let&apos;s build<br />
              something <span className="text-accent">lasting.</span>
            </h1>
          </div>
        </section>

        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />

        {/* Two-column layout */}
        <section className="pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-9">
            <div className="pt-[70px]">
              <div className="mb-10">
                <div
                  className="font-mono uppercase text-faint mb-[14px]"
                  style={{ fontSize: 11, letterSpacing: "0.16em" }}
                >
                  New projects
                </div>
                <a
                  href="mailto:hello@makemovegrow.com"
                  className="font-display font-semibold text-ink no-underline pb-1 hover:text-accent transition-colors duration-[250ms]"
                  style={{
                    fontSize: "clamp(22px,3.2vw,34px)",
                    letterSpacing: "-0.01em",
                    borderBottom: "1px solid #CB2138",
                  }}
                >
                  hello@makemovegrow.com
                </a>
              </div>

              <div className="mb-10">
                <div
                  className="font-mono uppercase text-faint mb-[14px]"
                  style={{ fontSize: 11, letterSpacing: "0.16em" }}
                >
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
                <div
                  className="font-mono uppercase text-faint mb-[14px]"
                  style={{ fontSize: 11, letterSpacing: "0.16em" }}
                >
                  Follow
                </div>
                <p className="text-muted m-0" style={{ fontSize: 16 }}>
                  Instagram &middot; YouTube &middot; LinkedIn
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
