import type { NextConfig } from "next";

const TANPA_CACHE = [
  { key: "Cache-Control", value: "private, no-store, max-age=0, must-revalidate" },
  { key: "Pragma", value: "no-cache" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/tutor",
        headers: TANPA_CACHE,
      },
      {
        source: "/tutor/:path*",
        headers: TANPA_CACHE,
      },
      {
        source: "/ruang-belajar",
        headers: TANPA_CACHE,
      },
      {
        source: "/ruang-belajar/:path*",
        headers: TANPA_CACHE,
      },
    ];
  },
};

export default nextConfig;
