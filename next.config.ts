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
      {
        // Audio Suara Guru statis: nama berkas berupa hash isi ucapan, jadi aman di-cache selamanya.
        source: "/audio-guru/:berkas(.*\\.mp3)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Manifest berubah tiap ada audio baru: boleh basi sebentar, lalu diperbarui di latar.
        source: "/audio-guru/manifest.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
