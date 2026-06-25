import Reveal from "@/components/Reveal";
import { capabilities } from "@/lib/content";

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-ink py-24 md:py-32 px-7">
      <div className="max-w-shell mx-auto">

        {/* Section header */}
        <Reveal>
          <div className="mb-16">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-4">
              01 / Capabilities
            </p>
            <h2
              className="font-display font-black text-bone leading-none mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
            >
              One house, every format.
            </h2>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-mute max-w-xl leading-relaxed">
              Concept to final color, kept under one roof, so nothing gets lost in the
              handoff and the work stays consistent across every deliverable.
            </p>
          </div>
        </Reveal>

        {/* Capability rows */}
        <div className="border-t border-line">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.code} delay={i * 0.06}>
              <div className="group border-b border-line py-6 md:py-7 flex flex-col md:flex-row md:items-start gap-3 md:gap-10 cursor-default transition-all duration-300 hover:pl-4 hover:bg-ink-2/40">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent shrink-0 mt-0.5">
                  {cap.code}
                </span>
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-10 flex-1">
                  <h3
                    className="font-display font-bold text-bone group-hover:text-accent transition-colors duration-300 shrink-0 md:w-64"
                    style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-mute leading-relaxed" style={{ fontSize: "clamp(0.875rem, 1vw, 0.95rem)" }}>
                    {cap.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
