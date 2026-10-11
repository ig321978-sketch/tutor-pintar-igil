import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "$IGIL · Tutor AI Kurikulum Merdeka",
    short_name: "IGIL",
    description:
      "Ruang belajar, tutor AI, rapor, dan ranking nasional untuk siswa Kurikulum Merdeka.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#1C01A5",
    theme_color: "#1C01A5",
    lang: "id",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
