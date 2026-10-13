import { ImageResponse } from "next/og";

export const alt = "MMG: content experts for events, launches and commercials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default share card for any page that does not set its own image.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F4EF",
          padding: 72,
          color: "#16161B",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
          MM<span style={{ color: "#CB2138" }}>G</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Content experts, from the live moment to the finished commercial.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#5E5E66" }}>
            Los Angeles and Orange County
          </div>
        </div>
      </div>
    ),
    size
  );
}
