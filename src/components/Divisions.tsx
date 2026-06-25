import Reveal from "@/components/Reveal";
import { divisions } from "@/lib/content";

export default function Divisions() {
  return (
    <section id="group" className="bg-ink py-24 md:py-32 px-7">
      <div className="max-w-shell mx-auto">

        {/* Section header */}
        <Reveal>
          <div className="mb-16">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-4">
              03 / The Group
            </p>
            <h2
              className="font-display font-black text-bone leading-none mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
            >
              Built to scale.
            </h2>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-mute max-w-xl leading-relaxed">
              One company, organized like a studio, so it can grow arms without
              losing the standard that holds it together.
            </p>
          </div>
        </Reveal>

        {/* Division cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {divisions.map((div, i) => (
            <Reveal key={div.nameAccent} delay={i * 0.1}>
              <div className="group border border-line bg-ink-3 hover:border-accent hover:bg-ink-2 transition-all duration-300 p-8 flex flex-col gap-6 h-full">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-mute block mb-4">
                    {div.role}
                  </span>
                  <h3
                    className="font-display font-black text-bone leading-none"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.025em" }}
                  >
                    {div.name}
                    <span className="text-accent">{div.nameAccent}</span>
                  </h3>
                </div>
                <p className="text-mute leading-relaxed text-sm flex-1">
                  {div.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
