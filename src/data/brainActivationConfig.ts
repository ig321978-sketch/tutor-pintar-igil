import { MODUL_MTK3_BAB2 } from "@/lib/modul-resmi-mtk-3-bab2";

export type BrainActivationType =
  | "infinity_trace"
  | "cross_crawl_tap"
  | "constellation_connect"
  | "visual_flash_recall";

export type EmosiMaskot = "excited" | "pointing" | "celebrating";

type DasarPemanasan = {
  moduleId: string;
  chapterNumber: number;
  title: string;
  instruction: string;
  themeColor: string;
  mascotEmotion: EmosiMaskot;
};

export type BrainActivationModule =
  | (DasarPemanasan & {
      type: "infinity_trace";
      configData: { pathType: "infinity"; minCompletionRatio: number };
    })
  | (DasarPemanasan & {
      type: "cross_crawl_tap";
      configData: { targetRounds: number; tempoBpm: number };
    })
  | (DasarPemanasan & {
      type: "constellation_connect";
      configData: { points: { id: number; x: number; y: number }[] };
    })
  | (DasarPemanasan & {
      type: "visual_flash_recall";
      configData: { jumlahObjek: number; durasiKilatMs: number };
    });

/**
 * Percobaan pemanasan otak. Saat ini hanya Matematika kelas 3 Bab 2.
 * Bab lain belum didaftarkan.
 */
export const BRAIN_ACTIVATION_REGISTRY: Record<number, BrainActivationModule> = {
  2: {
    moduleId: MODUL_MTK3_BAB2.id,
    chapterNumber: 2,
    title: "Irama Otak: Ketuk Kiri-Kanan",
    instruction: "Hulu mengetuk rak kiri atau kanan secara acak. Ketuk rak yang sama!",
    type: "cross_crawl_tap",
    themeColor: "from-emerald-400 to-teal-600",
    mascotEmotion: "excited",
    configData: { targetRounds: 16, tempoBpm: 64 },
  },
};

export function modulPemanasan(bab: number): BrainActivationModule | null {
  return BRAIN_ACTIVATION_REGISTRY[bab] ?? null;
}

export function pemanasanUntukSesi(kelas: string, mapel: string, materi: string): BrainActivationModule | null {
  if (kelas.trim().toLowerCase() !== "3 sd") return null;
  if (mapel.trim().toLowerCase() !== "matematika") return null;
  if (!MODUL_MTK3_BAB2.pola.test(materi.trim().toLowerCase())) return null;
  return modulPemanasan(2);
}
