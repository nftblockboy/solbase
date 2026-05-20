import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/predict",
        destination: "/markets",
        permanent: true,
      },
      {
        source: "/predict/market/:marketId",
        destination: "/markets/market/:marketId",
        permanent: true,
      },
      {
        source: "/swap",
        destination: "/markets",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/profile/:wallet",
        destination: "/trader/:wallet",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
