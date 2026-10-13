import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MMG is a Los Angeles and Orange County content team backed by 15 years of production experience. We back up brands, PR firms, agencies, and event teams, from the live moment to the finished commercial. The concept stays yours. The execution is ours.",
};

function Rows({ items }: { items: string[] }) {
  return (
    <ul className="list-none m-0 p-0 border-b border-line">
      {items.map((t, i) => (
        <li key={t} className="flex items-baseline gap-5 border-t border-line py-5">
          <span className="font-mono text-faint" style={{ fontSize: 11, letterSpacing: "0.14em" }}>{String(i + 1).padStart(2, "0")}</span>
          <span className="font-display font-semibold text-ink" style={{ fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-0.01em" }}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-[110px] pb-[88px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal>
              <span className="block font-mono uppercase text-accent mb-[22px]" style={{ fontSize: 11, letterSpacing: "0.22em" }}>03 / About</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display font-semibold m-0 text-ink" style={{ fontSize: "clamp(40px,7vw,86px)", lineHeight: 0.98, letterSpacing: "-0.02em" }}>
                We execute <span className="text-accent">ideas.</span>
              </h1>
            </Reveal>
          </div>
        </section>
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />
        <section className="py-[60px] md:py-[90px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9 grid md:grid-cols-12 gap-10">
            <Reveal className="md:col-span-4">
              <h2 className="font-display font-semibold text-accent m-0" style={{ fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.02em" }}>who we are</h2>
            </Reveal>
            <Reveal delay={0.05} className="md:col-span-8">
              <p className="text-muted m-0" style={{ fontSize: 19, lineHeight: 1.7, maxWidth: "58ch" }}>Led by fifteen years of production experience, MMG is a Los Angeles and Orange County content team built for brands, PR firms, event producers, and public agencies who need the moment captured and out the door fast. The concept stays yours. The execution is ours.</p>
            </Reveal>
          </div>
        </section>
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />
        <section className="py-[60px] md:py-[90px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <Reveal>
              <h2 className="font-mono uppercase text-accent m-0 mb-[22px] font-normal" style={{ fontSize: 11, letterSpacing: "0.22em" }}>Who we work with</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <Rows items={["Brands", "PR firms", "Event producers", "Public agencies"]} />
            </Reveal>
          </div>
        </section>
        <div style={{ height: 1, background: "rgba(22,22,27,.12)" }} />
      </main>
      <Footer />
    </>
  );
}
