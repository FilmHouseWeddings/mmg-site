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
    ];
  },
};

export default nextConfig;
