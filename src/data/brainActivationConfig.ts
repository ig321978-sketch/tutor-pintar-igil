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

export type VariasiKetuk = {
  id: string;
  judul: string;
  instruksi: string;
  themeColor: string;
  ikonKiri: string;
  ikonKanan: string;
  namaKiri: string;
  namaKanan: string;
  tempoBpm: number;
  ketukanPenuh: number;
  ketukanKilat: number;
};

export type BrainActivationModule =
  | (DasarPemanasan & {
      type: "infinity_trace";
      configData: { pathType: "infinity"; minCompletionRatio: number };
    })
  | (DasarPemanasan & {
      type: "cross_crawl_tap";
      configData: { variasi: VariasiKetuk[] };
    })
  | (DasarPemanasan & {
      type: "constellation_connect";
      configData: { points: { id: number; x: number; y: number }[] };
    })
  | (DasarPemanasan & {
      type: "visual_flash_recall";
      configData: { jumlahObjek: number; durasiKilatMs: number };
    });

const VARIASI_KETUK_BAB2: VariasiKetuk[] = [
  {
    id: "rak-buku",
    judul: "Rak Buku",
    instruksi: "Hulu mengetuk rak kiri atau kanan secara acak. Ketuk rak yang sama!",
    themeColor: "from-emerald-400 to-teal-600",
    ikonKiri: "📚",
    ikonKanan: "📖",
    namaKiri: "Rak kiri",
    namaKanan: "Rak kanan",
    tempoBpm: 64,
    ketukanPenuh: 32,
    ketukanKilat: 22,
  },
  {
    id: "roket",
    judul: "Roket Antariksa",
    instruksi: "Hulu mengetuk roket kiri atau kanan secara acak. Ketuk roket yang sama!",
    themeColor: "from-indigo-500 to-purple-600",
    ikonKiri: "🚀",
    ikonKanan: "🛸",
    namaKiri: "Roket kiri",
    namaKanan: "Roket kanan",
    tempoBpm: 76,
    ketukanPenuh: 34,
    ketukanKilat: 24,
  },
  {
    id: "bintang",
    judul: "Bintang Malam",
    instruksi: "Hulu mengetuk bintang kiri atau kanan secara acak. Ketuk bintang yang sama!",
    themeColor: "from-amber-400 to-orange-500",
    ikonKiri: "⭐",
    ikonKanan: "🌟",
    namaKiri: "Bintang kiri",
    namaKanan: "Bintang kanan",
    tempoBpm: 60,
    ketukanPenuh: 30,
    ketukanKilat: 20,
  },
  {
    id: "ombak",
    judul: "Ombak Laut",
    instruksi: "Hulu mengetuk ombak kiri atau kanan secara acak. Ketuk ombak yang sama!",
    themeColor: "from-sky-400 to-cyan-600",
    ikonKiri: "🌊",
    ikonKanan: "🐚",
    namaKiri: "Ombak kiri",
    namaKanan: "Ombak kanan",
    tempoBpm: 70,
    ketukanPenuh: 32,
    ketukanKilat: 22,
  },
  {
    id: "stempel",
    judul: "Stempel Hulu",
    instruksi: "Hulu mengetuk stempel kiri atau kanan secara acak. Ketuk stempel yang sama!",
    themeColor: "from-violet-500 to-fuchsia-600",
    ikonKiri: "🔖",
    ikonKanan: "🦉",
    namaKiri: "Stempel kiri",
    namaKanan: "Stempel kanan",
    tempoBpm: 68,
    ketukanPenuh: 32,
    ketukanKilat: 22,
  },
  {
    id: "lentera",
    judul: "Lentera Senja",
    instruksi: "Hulu mengetuk lentera kiri atau kanan secara acak. Ketuk lentera yang sama!",
    themeColor: "from-rose-400 to-orange-500",
    ikonKiri: "🏮",
    ikonKanan: "🌙",
    namaKiri: "Lentera kiri",
    namaKanan: "Lentera kanan",
    tempoBpm: 72,
    ketukanPenuh: 34,
    ketukanKilat: 22,
  },
];

/**
 * Percobaan pemanasan otak. Saat ini hanya Matematika kelas 3 Bab 2.
 * Bab lain belum didaftarkan.
 */
export const BRAIN_ACTIVATION_REGISTRY: Record<number, BrainActivationModule> = {
  2: {
    moduleId: MODUL_MTK3_BAB2.id,
    chapterNumber: 2,
    title: "Irama Otak: Ketuk Kiri-Kanan",
    instruction: "Hulu mengetuk kiri atau kanan secara acak. Ketuk yang sama!",
    type: "cross_crawl_tap",
    themeColor: "from-emerald-400 to-teal-600",
    mascotEmotion: "excited",
    configData: { variasi: VARIASI_KETUK_BAB2 },
  },
};

export function hariDalamTahun(tanggal = new Date()): number {
  const awal = new Date(tanggal.getFullYear(), 0, 0);
  return Math.floor((tanggal.getTime() - awal.getTime()) / 86_400_000);
}

export function variasiHariIni(
  modul: Extract<BrainActivationModule, { type: "cross_crawl_tap" }>,
  tanggal = new Date(),
): VariasiKetuk {
  const daftar = modul.configData.variasi;
  const indeks = ((hariDalamTahun(tanggal) % daftar.length) + daftar.length) % daftar.length;
  return daftar[indeks];
}

export function modulPemanasan(bab: number): BrainActivationModule | null {
  return BRAIN_ACTIVATION_REGISTRY[bab] ?? null;
}

export function pemanasanUntukSesi(kelas: string, mapel: string, materi: string): BrainActivationModule | null {
  if (kelas.trim().toLowerCase() !== "3 sd") return null;
  if (mapel.trim().toLowerCase() !== "matematika") return null;
  if (!MODUL_MTK3_BAB2.pola.test(materi.trim().toLowerCase())) return null;
  return modulPemanasan(2);
}
