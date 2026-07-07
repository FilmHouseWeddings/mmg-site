import Reveal from "./Reveal";

export default function Stance() {
  return (
    <section className="pt-[70px] pb-[70px] border-t border-line">
      <div className="max-w-[1200px] mx-auto px-9">
        <Reveal>
          <div
            className="font-mono uppercase text-accent"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            The Stance
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p
            className="font-display text-ink mt-[22px] max-w-[22ch] md:max-w-[24ch]"
            style={{
              fontWeight: 500,
              fontSize: "clamp(28px,4vw,44px)",
              lineHeight: 1.16,
              letterSpacing: "-0.015em",
            }}
          >
            We are not a creative agency. We don&apos;t pitch concepts and we
            don&apos;t want the credit. You bring the idea. We bring the crew,
            the cameras, and fifteen years of making it look like it was
            never hard.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div
            className="font-mono text-muted mt-[28px] max-w-[52ch]"
            style={{ fontSize: 12, letterSpacing: "0.02em", lineHeight: 1.7 }}
          >
            Your client stays your client. Your idea stays your idea. We
            execute, we deliver, we step back.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
