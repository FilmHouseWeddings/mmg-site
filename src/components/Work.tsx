import Reveal from "./Reveal";
import { workTiles } from "@/lib/content";

function PlayPip({ size = 38 }: { size?: number }) {
  const arrow = Math.round(size * 0.26);
  const arrowH = Math.round(size * 0.155);
  return (
    <div
      className="absolute top-[16px] right-[16px] z-10 flex items-center justify-center"
      style={{ width: size, height: size, border: "1px solid rgba(244,242,237,.6)", borderRadius: "50%" }}
    >
      <div style={{ borderLeft: `${arrow}px solid #F4F2ED`, borderTop: `${arrowH}px solid transparent`, borderBottom: `${arrowH}px solid transparent`, marginLeft: 2 }} />
    </div>
  );
}

function TileLabel({ category, title, large = false }: { category: string; title: string; large?: boolean }) {
  return (
    <div
      className="relative"
      style={{ padding: large ? 28 : 20, background: "linear-gradient(to top,rgba(8,8,10,.86),transparent)" }}
    >
      <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em", color: "#f0b9c1" }}>
        {category}
      </div>
      <div
        className="font-display font-bold mt-[6px]"
        style={{ fontSize: large ? "clamp(20px,2.6vw,28px)" : "clamp(15px,1.8vw,19px)", color: "#F4F2ED" }}
      >
        {title}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="pt-24 pb-10">
      <div className="max-w-[1200px] mx-auto px-9">

        {/* Section header */}
        <Reveal>
          <div className="flex justify-between items-end gap-5 flex-wrap mb-[34px]">
            <div>
              <div className="font-mono uppercase text-accent" style={{ fontSize: 12, letterSpacing: "0.16em" }}>
                Selected Work
              </div>
              <div className="font-mono uppercase text-faint mt-3" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
                Film · Events · Live · Brand
              </div>
            </div>
          </div>
        </Reveal>

        {/* Flat 12-col organic grid */}
        <div
          className="grid gap-[18px]"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          {workTiles.map((tile) => {
            const wide = tile.span >= 6;
            const fill = tile.ratio === "fill";
            return (
              <div
                key={tile.title}
                style={{ gridColumn: `span ${tile.span}` }}
                className={`max-lg:[grid-column:1_/_-1]${fill ? " h-full" : ""}`}
              >
                <Reveal className={fill ? "h-full" : undefined}>
                  <div
                    className={`group relative flex flex-col justify-end overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-[350ms] hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(22,22,27,.14)]${fill ? " h-full" : ""}`}
                    style={{ background: tile.bg, ...(!fill && { aspectRatio: tile.ratio }) }}
                  >
                    {tile.vimeoId && (
                      <iframe
                        src={`https://player.vimeo.com/video/${tile.vimeoId}?h=${tile.vimeoHash}&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1`}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        className="absolute inset-0 w-full h-full"
                        style={{ pointerEvents: "none" }}
                        title={tile.title}
                      />
                    )}
                    <PlayPip size={wide ? 42 : 36} />
                    <TileLabel category={tile.category} title={tile.title} large={wide} />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <Reveal>
          <div className="mt-[30px] text-center">
            <a
              href="#work"
              className="font-mono uppercase text-ink no-underline hover:text-accent transition-colors duration-[250ms] pb-[5px]"
              style={{ fontSize: 12, letterSpacing: "0.14em", borderBottom: "1px solid #CB2138" }}
            >
              View all work
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
