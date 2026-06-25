import Reveal from "@/components/Reveal";

const stats = [
  { number: ["1", "5"], accent: [false, true], label: "Years behind the lens" },
  { number: ["Hundreds"], accent: [false], label: "Of films delivered" },
  { number: ["6"], accent: [false], label: "Disciplines, one roof" },
  { number: ["OC", ".", "LA"], accent: [false, true, false], label: "Based, working nationwide" },
];

export default function Stats() {
  return (
    <section className="border-t border-b border-line bg-ink-2">
      <div className="max-w-shell mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex flex-col gap-2 px-6 py-10 md:py-14">
                <div
                  className="font-display font-black text-bone leading-none"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", letterSpacing: "-0.03em" }}
                >
                  {stat.number.map((part, j) => (
                    <span key={j} className={stat.accent[j] ? "text-accent" : ""}>
                      {part}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
