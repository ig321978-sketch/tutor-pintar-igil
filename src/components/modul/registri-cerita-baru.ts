import type { ComponentType } from "react";
import dynamic from "next/dynamic";

type PropsCerita = { speakGuru: (teks: string) => void };

/**
 * Tahap Cerita bergaya Story baru untuk sub-bab Kelas 1 sampai 2 yang tahap lainnya masih memakai data JSON lama.
 * Kunci: `${bab}-${subBab}`. Sub-bab yang tidak ada di sini memakai Cerita lama.
 */
export const CERITA_BARU: Record<string, ComponentType<PropsCerita>> = {
  "mtk-1-bab1-A": dynamic<PropsCerita>(() => import("@/components/modul/video-k1b1a").then((m) => m.VideoK1B1A), { ssr: false }),
};
