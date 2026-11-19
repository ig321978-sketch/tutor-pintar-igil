/**
 * Data Simulasi Papan Dermaga K4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara", cerita Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (Barat 4.358, Timur 4.385, Selatan 4.538) dan dari tugas CPA. Bilangan tampil dengan titik ribuan, suara mengeja kata.
 * Tiga alat: Banding (periksa dari tempat paling kiri, lalu pilih tanda), Urut (geser kartu sampai berurutan naik atau turun), Garis (pasang bilangan pada garis bilangan).
 * Diuji: scripts/uji-dermaga-k4b1c.mjs.
 */
export type Arah = "naik" | "turun";

/** Banding: dua bilangan dibandingkan dari tempat paling kiri; sasaran ketiga sama persis (tanda sama dengan). */
export type TargetBanding = { benda: string; a: number; b: number };
export const TARGET_BANDING: readonly TargetBanding[] = [
  { benda: "Pantai Karang", a: 6274, b: 6247 },
  { benda: "Pantai Pasir", a: 2905, b: 3095 },
  { benda: "Pantai Kelapa", a: 7318, b: 7318 },
];

/** Urut: kartu bilangan tertulis acak; anak menggesernya sampai berurutan (naik = terkecil ke terbesar, turun = sebaliknya). */
export type TargetUrut = { benda: string; data: number[]; arah: Arah };
export const TARGET_URUT: readonly TargetUrut[] = [
  { benda: "tiket pagi", data: [3482, 3248, 3824], arah: "naik" },
  { benda: "tiket siang", data: [5061, 5610, 5016, 5106], arah: "turun" },
  { benda: "tiket sore", data: [8205, 8025, 8502], arah: "naik" },
];

/** Garis: pasang titik pada garis bilangan sebelas tanda (dari `mulai`, tiap petak `langkah`) di bilangan `nilai`. */
export type TargetGaris = { benda: string; mulai: number; langkah: number; nilai: number };
export const TARGET_GARIS: readonly TargetGaris[] = [
  { benda: "papan pantai barat", mulai: 6000, langkah: 100, nilai: 6400 },
  { benda: "papan pantai timur", mulai: 7200, langkah: 10, nilai: 7270 },
  { benda: "papan pantai selatan", mulai: 9000, langkah: 100, nilai: 9300 },
];

export const MISI_DERMAGA_TEKS = "Periksa dua bilangan dari kiri lalu pilih tandanya, urutkan kartu, dan pasang titik pada garis. Urutannya bebas.";
