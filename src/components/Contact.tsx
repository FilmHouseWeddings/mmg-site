import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-ink-2 border-t border-line py-24 md:py-36 px-7 text-center">
      <div className="max-w-shell mx-auto">

        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute mb-6">
            Tell us about the work
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="font-display font-black uppercase text-bone leading-none mb-12"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", letterSpacing: "-0.03em" }}
          >
            LET&apos;S BUILD SOMETHING<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@mmggroup.co"
              className="inline-flex items-center font-mono text-[11px] tracking-[0.15em] uppercase bg-accent text-bone px-8 py-4 hover:bg-ink hover:text-bone border border-accent transition-all duration-300"
            >
              Start a project
            </a>
            <a
              href="#work"
              className="inline-flex items-center font-mono text-[11px] tracking-[0.15em] uppercase border border-line text-bone px-8 py-4 hover:border-bone transition-all duration-300"
            >
              See the work
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
