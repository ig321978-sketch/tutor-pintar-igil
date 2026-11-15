import type { ComponentType } from "react";
import dynamic from "next/dynamic";

type PropsCerita = { speakGuru: (teks: string) => void };

/**
 * Tahap Cerita bergaya Story baru untuk sub-bab Kelas 1 sampai 2 yang tahap lainnya masih memakai data JSON lama.
 * Kunci: `${bab}-${subBab}`. Sub-bab yang tidak ada di sini memakai Cerita lama.
 */
export const CERITA_BARU: Record<string, ComponentType<PropsCerita>> = {
  "mtk-1-bab1-A": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b1a").then((m) => m.VideoK1B1A), { ssr: false }),
  "mtk-1-bab1-D": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b1d").then((m) => m.VideoK1B1D), { ssr: false }),
  "mtk-1-bab1-C": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b1c").then((m) => m.VideoK1B1C), { ssr: false }),
  "mtk-1-bab1-B": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b1b").then((m) => m.VideoK1B1B), { ssr: false }),
  "mtk-1-bab2-A": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b2a").then((m) => m.VideoK1B2A), { ssr: false }),
  "mtk-1-bab2-B": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b2b").then((m) => m.VideoK1B2B), { ssr: false }),
  "mtk-1-bab2-C": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b2c").then((m) => m.VideoK1B2C), { ssr: false }),
  "mtk-1-bab3-A": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b3a").then((m) => m.VideoK1B3A), { ssr: false }),
  "mtk-1-bab3-B": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b3b").then((m) => m.VideoK1B3B), { ssr: false }),
  "mtk-1-bab3-C": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b3c").then((m) => m.VideoK1B3C), { ssr: false }),
  "mtk-1-bab3-D": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b3d").then((m) => m.VideoK1B3D), { ssr: false }),
  "mtk-1-bab4-A": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b4a").then((m) => m.VideoK1B4A), { ssr: false }),
  "mtk-1-bab4-B": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b4b").then((m) => m.VideoK1B4B), { ssr: false }),
  "mtk-1-bab4-C": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b4c").then((m) => m.VideoK1B4C), { ssr: false }),
  "mtk-1-bab5-A": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b5a").then((m) => m.VideoK1B5A), { ssr: false }),
  "mtk-1-bab5-B": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b5b").then((m) => m.VideoK1B5B), { ssr: false }),
  "mtk-1-bab5-C": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b5c").then((m) => m.VideoK1B5C), { ssr: false }),
  "mtk-1-bab5-D": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b5d").then((m) => m.VideoK1B5D), { ssr: false }),
  "mtk-1-bab6-A": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b6a").then((m) => m.VideoK1B6A), { ssr: false }),
  "mtk-1-bab6-B": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b6b").then((m) => m.VideoK1B6B), { ssr: false }),
  "mtk-1-bab6-C": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b6c").then((m) => m.VideoK1B6C), { ssr: false }),
  "mtk-1-bab7-A": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b7a").then((m) => m.VideoK1B7A), { ssr: false }),
  "mtk-1-bab7-B": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b7b").then((m) => m.VideoK1B7B), { ssr: false }),
};
