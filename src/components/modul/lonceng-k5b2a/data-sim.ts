/**
 * Data Simulasi Lompat Lonceng Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni", awal cerita Pasar Kuliner Malam.
 * Data berbeda dari Story dan dari tugas CPA (jadwal ronda, kembang api, lampu gantung, kios es, parkir, tiket). Tiga sasaran tiap alat.
 * Semua jawaban dihitung dari bilangan lewat logika-data.ts. Diuji: scripts/uji-lonceng-k5b2a.mjs.
 */

/** Lompat: lompat dengan jarak b dari nol sampai kelipatan terakhir yang tidak melewati batas. */
export type SasaranLompat = { b: number; batas: number; benda: string; satuan: string };
export const TARGET_LOMPAT: readonly SasaranLompat[] = [
  { b: 5, batas: 30, benda: "kentongan ronda yang berbunyi", satuan: "menit" },
  { b: 3, batas: 21, benda: "lampu gantung yang berkedip", satuan: "detik" },
  { b: 9, batas: 45, benda: "kios es yang menyajikan es baru", satuan: "menit" },
];

/** Warnai: warnai semua kelipatan b pada tabel bilangan satu sampai `sampai`. */
export type SasaranWarnai = { b: number; sampai: number; benda: string };
export const TARGET_WARNAI: readonly SasaranWarnai[] = [
  { b: 7, sampai: 50, benda: "nomor kios yang dihias" },
  { b: 5, sampai: 30, benda: "meja yang diberi lampion" },
  { b: 8, sampai: 40, benda: "kursi yang diberi bantal" },
];

/** Cek: kurangi n dengan b berulang sampai sisa kurang dari b, lalu putuskan kelipatan atau bukan. */
export type SasaranCek = { n: number; b: number; benda: string; satuan: string };
export const TARGET_CEK: readonly SasaranCek[] = [
  { n: 65, b: 8, benda: "tiket yang terjual", satuan: "tiket" },
  { n: 72, b: 9, benda: "mobil di tempat parkir", satuan: "mobil" },
  { n: 50, b: 6, benda: "gelas es di kios", satuan: "gelas" },
];

/** Kali: atur pengali p sampai p kali b sama dengan sasaran n. */
export type SasaranKali = { b: number; n: number; benda: string; satuan: string };
export const TARGET_KALI: readonly SasaranKali[] = [
  { b: 3, n: 27, benda: "kembang api yang menyala", satuan: "detik" },
  { b: 7, n: 63, benda: "kalender pasaran yang berulang", satuan: "hari" },
  { b: 5, n: 45, benda: "lampu lalu lintas yang berganti", satuan: "detik" },
];

export const MISI_LONCENG_TEKS = "Lompat dengan jarak yang sama, warnai kelipatan pada tabel bilangan, periksa dengan pembagian, dan atur pengali pada alat Kali. Urutannya bebas.";
