/**
 * Data Simulasi Rak Stok Kelas 3 Bab 1 Sub-Bab A "Toples Permen Pak Joko", awal cerita Toko Kelontong Pak Joko.
 * Benda stok berbeda dari Story (permen): kaleng, sabun, kecap. Bilangan sasaran berbeda dari Story (634, 703, 405, 900) dan dari tugas CPA.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-tempat-k3b1a.mjs.
 */
export type BarangStok = {
  id: string;
  nama: string;
  emoji: string;
  /** Nama satuan dari yang terkecil: lepas, kemasan sepuluh, kemasan seratus. */
  satuan: readonly [string, string, string];
};
export const BARANG_STOK: readonly BarangStok[] = [
  { id: "kaleng", nama: "kaleng", emoji: "\u{1F96B}", satuan: ["kaleng", "pak", "dus"] },
  { id: "sabun", nama: "sabun", emoji: "\u{1F9FC}", satuan: ["sabun", "bungkus", "kardus"] },
  { id: "kecap", nama: "kecap", emoji: "\u{1F376}", satuan: ["botol", "krat", "peti"] },
];

/** Papan dari benda: tiga rak stok (ratusan, puluhan, satuan) yang harus ditulis di papan tiga tempat. */
export const TARGET_PAPAN: readonly number[] = [253, 416, 780];
/** Baca bilangan: papan menunjukkan bilangan, anak memilih cara membacanya. */
export const TARGET_BACA: readonly number[] = [872, 560, 309];
/** Tulis dari kata: kata bilangan, anak menulis angkanya (dua di antaranya memuat nol penjaga tempat). */
export const TARGET_TULIS: readonly number[] = [506, 640, 218];

export const MISI_STOK_TEKS = "Tuang stok sampai sepuluh jadi satu, atur papan tiga tempat, baca bilangannya, lalu tulis dari kata. Urutannya bebas.";
