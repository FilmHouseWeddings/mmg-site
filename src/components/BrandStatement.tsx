import Reveal from "@/components/Reveal";

export default function BrandStatement() {
  return (
    <section className="py-[72px] lg:py-[140px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-9">
        <Reveal delay={0}>
          <p className="font-mono text-accent text-[11px] uppercase tracking-[0.22em] mb-6">
            MMG
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="font-display font-semibold text-ink"
            style={{
              fontSize: "clamp(28px, 3.6vw, 46px)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              maxWidth: "26ch",
            }}
          >
            MMG is a storytelling partner for brands and entities that{" "}
            <span className="text-accent">shape culture.</span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
