import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section className="bg-ink py-24 md:py-32 px-7">
      <div className="max-w-shell mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left */}
          <Reveal>
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-4">
                04 / The Company
              </p>
              <h2
                className="font-display font-black text-bone leading-none"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.025em" }}
              >
                Fifteen years.<br />One standard.
              </h2>
            </div>
          </Reveal>

          {/* Right */}
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-6">
              <p
                className="font-display font-semibold text-bone leading-relaxed"
                style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}
              >
                MMG is a multimedia production company built on fifteen years of
                making images that hold up.
              </p>
              <p className="text-mute leading-relaxed">
                Make. Move. Grow. We make the work by hand, we move the people who
                watch it, and we grow the brands we build it for. Corporate and brand
                production held to a craftsman&apos;s standard, from the first concept
                to the final color.
              </p>
              <p className="text-mute leading-relaxed">
                New name, proven hands. The kind of partner a brand calls when the
                moment cannot be redone.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
