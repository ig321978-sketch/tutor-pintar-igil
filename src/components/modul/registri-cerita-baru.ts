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
};
