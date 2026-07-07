import Script from "next/script";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="pt-[70px]">
      <div className="max-w-[1200px] mx-auto px-9">
        <Reveal>
          <h1
            className="font-display m-0 text-ink max-w-[16ch]"
            style={{
              fontWeight: 500,
              fontSize: "clamp(34px,5.2vw,64px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            Ideas deserve <span className="text-accent">execution.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="font-mono text-muted mt-[22px] max-w-[46ch]"
            style={{ fontSize: 13, letterSpacing: "0.01em", lineHeight: 1.6 }}
          >
            MMG is a Los Angeles production house. You bring the idea — we bring the
            crew, the cameras, and the finish.
          </div>
        </Reveal>
      </div>

      {/* Full-bleed Vimeo showreel */}
      <Reveal delay={0.1}>
        <div className="relative w-full mt-[48px]" style={{ paddingTop: "52.73%" }}>
          <iframe
            src="https://player.vimeo.com/video/984611824?h=5612e9a8af&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title="MMG Showreel"
          />
        </div>
      </Reveal>

      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
    </section>
  );
}
