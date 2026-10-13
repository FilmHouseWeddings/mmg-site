import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: typically 20 to 30% smaller than WebP for the same photo.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.vimeocdn.com" }],
  },
  async redirects() {
    return [
      {
        source: "/capabilities",
        destination: "/work",
        permanent: true,
      },
      { source: "/copyright-policy", destination: "/", permanent: true },
      { source: "/work/branded", destination: "/work/brand-campaigns", permanent: true },
      { source: "/work/event-coverage", destination: "/work/events-launches", permanent: true },
      { source: "/work/corporate-government", destination: "/work/public-sector", permanent: true },
      { source: "/work/live-action", destination: "/work", permanent: true },
      {
        source: "/the-group",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
