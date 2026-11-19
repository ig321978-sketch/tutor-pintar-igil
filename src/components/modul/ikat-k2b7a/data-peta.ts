/**
 * Data Simulasi (Gudang Ikat) Kelas 2 Bab 7 Sub-Bab A "Botol Pak Ujang", awal cerita Bank Sampah Sekolah.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Simulasi memakai benda lain dari Story (kardus, tutup botol, kaus bekas) dan banyak benda lain
 * (dua puluh tujuh, lima puluh delapan, empat puluh tiga). Diuji: scripts/uji-ikat-k2b7a.mjs.
 */
/* ------------------------------ Simulasi: Gudang Ikat (berbeda dari Story) ------------------------------ */
export type BendaSim = { id: string; nama: string; emoji: string; banyak: number; /** Tiga pilihan perkiraan: satu dekat dengan banyak benda sebenarnya. */ kira: readonly number[] };
/** Tiga tumpukan benda bekas. Banyak benda tidak ditulis; anak mengikat sepuluh-sepuluh untuk mengetahuinya. */
export const BENDA_SIM: readonly BendaSim[] = [
  { id: "kardus", nama: "kardus", emoji: "\u{1F4E6}", banyak: 27, kira: [30, 10, 60] },
  { id: "tutup", nama: "tutup botol", emoji: "\u{1F534}", banyak: 58, kira: [30, 60, 100] },
  { id: "kaus", nama: "kaus bekas", emoji: "\u{1F455}", banyak: 43, kira: [20, 40, 70] },
];
/** Perkiraan dianggap dekat bila selisihnya dengan banyak benda sebenarnya paling banyak sepuluh. */
export const BATAS_DEKAT = 10;
export const MISI_IKAT_TEKS =
  "Misi Gudang Ikat: ikat benda sepuluh-sepuluh, taruh puluhan dan satuan di papan, tulis bilangannya, lalu buat perkiraan dan buktikan dengan mengikat. Urutannya bebas.";
