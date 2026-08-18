import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/multisys-pokedex",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
};

export default nextConfig;
