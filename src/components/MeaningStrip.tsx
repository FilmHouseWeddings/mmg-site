export default function MeaningStrip() {
  const cells = [
    { letter: "M", word: "Make" },
    { letter: "M", word: "Move" },
    { letter: "G", word: "Grow" },
  ];

  return (
    <section className="bg-ink-2 border-t border-b border-line">
      <div className="max-w-shell mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {cells.map(({ letter, word }) => (
            <div key={word} className="flex flex-col items-center justify-center py-12 md:py-16 gap-2">
              <span
                className="font-display font-black text-accent leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
              >
                {letter}
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute">
                {word}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center py-12 md:py-16 gap-2">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-mute mb-1">
              The Company
            </span>
            <span
              className="font-display font-bold text-bone text-center leading-tight"
              style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
            >
              A Media Group
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
