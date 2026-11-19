/**
 * Data Simulasi Papan Pengumuman Kelas 2 Bab 7 Sub-Bab B "Pengumuman Bu Lia": katak di tali garis angka (maju dan mundur), membandingkan dua bilangan dengan kata,
 * mengurutkan kartu bilangan, dan kartu angka menjadi bilangan terbesar atau terkecil. Berbeda dari Story (Story memakai kepik dan bilangan empat puluh sampai delapan puluh tiga).
 * Diuji: scripts/uji-papan-k2b7b.mjs.
 */
export const MISI_PAPAN_TEKS =
  "Geser katak di tali, bandingkan dua bilangan, urutkan kartu, lalu susun kartu angka. Urutannya bebas.";

/** Tugas katak di tali: bilangan awal, arah, banyak langkah, dan bilangan pertama dan terakhir yang digambar. */
export const GARIS_TUGAS: readonly { mulai: number; arah: "maju" | "mundur"; langkah: number; dari: number; sampai: number }[] = [
  { mulai: 15, arah: "maju", langkah: 4, dari: 12, sampai: 22 },
  { mulai: 96, arah: "mundur", langkah: 3, dari: 90, sampai: 100 },
  { mulai: 7, arah: "maju", langkah: 4, dari: 4, sampai: 14 },
];

/** Pasangan bilangan yang dibandingkan (satu pasangan sama besar). */
export const BANDING_PASANG: readonly (readonly [number, number])[] = [
  [29, 92],
  [45, 41],
  [56, 56],
  [17, 71],
  [84, 38],
];

/** Kartu bilangan yang diurutkan dari yang paling kecil (tampil tidak berurutan). */
export const URUT_SET: readonly (readonly number[])[] = [
  [35, 92, 18, 64],
  [57, 23, 86, 40],
  [66, 12, 43, 75],
];

/** Dua kartu angka dan sasarannya (bilangan terbesar atau terkecil). */
export const KARTU_ANGKA: readonly { a: number; b: number; target: "besar" | "kecil" }[] = [
  { a: 3, b: 8, target: "besar" },
  { a: 6, b: 2, target: "kecil" },
  { a: 9, b: 5, target: "besar" },
];

/** Penanda di tali pada simulasi (emoji katak). */
export const PENANDA_SIM = "\u{1F438}";
