import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/capabilities",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/the-group",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
