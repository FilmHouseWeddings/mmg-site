interface TileProps {
  index: string;
  category: string;
  title: string;
  slot: string;
}

export default function Tile({ index, category, title, slot }: TileProps) {
  return (
    <div className="group relative bg-ink-3 border border-line hover:border-accent transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden aspect-[4/5] flex flex-col justify-end p-6">
      {/* Faint index number */}
      <span
        className="absolute top-4 right-5 font-display font-black text-bone/5 select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
        aria-hidden="true"
      >
        {index}
      </span>

      {/* Placeholder fill */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-ink-3/60 to-transparent" />

      {/* Slot note */}
      <p className="relative font-mono text-[9px] tracking-[0.2em] uppercase text-mute/60 mb-3">
        {slot}
      </p>

      {/* Meta */}
      <div className="relative">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent mb-1">
          {category}
        </p>
        <h3 className="font-display font-bold text-bone text-lg leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}
