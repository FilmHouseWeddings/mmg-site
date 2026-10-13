"use client";

import { useEffect, useRef, useState } from "react";

const VIMEO_ORIGIN = "https://player.vimeo.com";

// Background Vimeo player that stays transparent until the video is actually
// playing, so the poster underneath shows instead of a black box while the
// player boots. Listens to Vimeo's postMessage API; falls back to showing the
// player after a few seconds if no events arrive.
export default function VimeoBackground({ vimeoId, vimeoHash }: { vimeoId: string; vimeoHash?: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const listen = (value: string) =>
      frame.contentWindow?.postMessage(
        JSON.stringify({ method: "addEventListener", value }),
        VIMEO_ORIGIN
      );
    function onMessage(e: MessageEvent) {
      if (e.origin !== VIMEO_ORIGIN || e.source !== frame?.contentWindow) return;
      let data: { event?: string } | null = null;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data?.event === "ready") {
        listen("play");
        listen("timeupdate");
        listen("playProgress");
      } else if (
        data?.event === "play" ||
        data?.event === "timeupdate" ||
        data?.event === "playProgress"
      ) {
        setPlaying(true);
      }
    }
    window.addEventListener("message", onMessage);
    const fallback = setTimeout(() => setPlaying(true), 6000);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src={`${VIMEO_ORIGIN}/video/${vimeoId}?h=${vimeoHash ?? ""}&badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1`}
      loading="lazy"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      className="absolute inset-0 h-full w-full"
      style={{ opacity: playing ? 1 : 0, transition: "opacity 0.6s ease" }}
    />
  );
}
