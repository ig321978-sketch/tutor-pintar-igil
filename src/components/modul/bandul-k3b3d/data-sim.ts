/**
 * Data Simulasi Meja Bandul Kelas 3 Bab 3 Sub-Bab D "Bandul Dokter Hana" (hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini.
 * Benda yang ditimbang berbeda dari Story (labu, jagung, wortel, pakan beo): apel, kaleng susu, karung dedak. Berat sasaran berbeda dari Story
 * (1.200, 3.000, 2.000, 1.250, 2.300, 1.400, 3.700, 5.000, 2.200, 2.800, 2.500, 3.800) dan dari tugas CPA. Mind-map dan Infografis memakai data kartu (data-kartu.ts).
 * Semua berat dalam gram dan kelipatan lima puluh gram (bisa dirakit dari bandul timbangan kodok). Diuji: scripts/uji-bandul-k3b3d.mjs.
 */
export type BendaTimbang = {
  id: string;
  nama: string;
  emoji: string;
};
export const BENDA_BANDUL: readonly BendaTimbang[] = [
  { id: "apel", nama: "apel", emoji: "\u{1F34E}" },
  { id: "susu", nama: "kaleng susu", emoji: "\u{1F96B}" },
  { id: "dedak", nama: "karung dedak", emoji: "\u{1F6CD}\u{FE0F}" },
];

/** Rakit: benda punya berat sasaran dalam gram; anak memasang bandul sampai jumlah beratnya sama (banyak jalan benar). */
export const TARGET_RAKIT: readonly { g: number }[] = [{ g: 1650 }, { g: 2750 }, { g: 3150 }];
/** Kilogram ke gram: kilogram dan gram sisa; jawaban kali seribu ditambah sisa. */
export const TARGET_KGG: readonly { kg: number; g: number }[] = [
  { kg: 3, g: 500 },
  { kg: 6, g: 150 },
  { kg: 8, g: 0 },
];
/** Gram ke kilogram: berat dalam gram; jawaban diambil tiap seribu gram sebagai satu kilogram, sisanya gram. */
export const TARGET_GKG: readonly { g: number }[] = [{ g: 4500 }, { g: 7250 }, { g: 9000 }];
/** Jumlah dua berat (gram). */
export const TARGET_JUMLAH: readonly { a: number; b: number }[] = [
  { a: 1500, b: 2400 },
  { a: 2650, b: 1800 },
  { a: 4100, b: 3900 },
];
/** Kurang dua berat (gram): a dikurangi b. */
export const TARGET_KURANG: readonly { a: number; b: number }[] = [
  { a: 6500, b: 2100 },
  { a: 5300, b: 1750 },
  { a: 9000, b: 4800 },
];

export const MISI_BANDUL_TEKS = "Rakit bandul sampai timbangan seimbang, ubah kilogram ke gram dan gram ke kilogram, lalu jumlahkan dan kurangkan berat. Urutannya bebas.";
