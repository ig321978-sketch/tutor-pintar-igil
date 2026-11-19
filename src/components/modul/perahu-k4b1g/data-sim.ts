/**
 * Data Simulasi Baris Perahu Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni" (perkalian sampai seratus), cerita Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (12 x 5, 14 x 4, 15 x 6, 11 x 5, 24 x 2, 13 x 3) dan dari tugas CPA. Hasil paling besar sembilan puluh sembilan.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-perahu-k4b1g.mjs.
 */
export type Kali = { a: number; b: number };

/** Ulang: tiap perahu memuat `a` penumpang; tambah perahu sebanyak `b` sampai jumlah penumpang tercapai. */
export const TARGET_ULANG: readonly Kali[] = [
  { a: 17, b: 3 },
  { a: 22, b: 4 },
  { a: 31, b: 3 },
];

/** Urai: uraikan `a` menjadi puluhan dan satuan, lalu pilih hasil kali tiap bagian. */
export const TARGET_URAI: readonly Kali[] = [
  { a: 32, b: 3 },
  { a: 41, b: 2 },
  { a: 23, b: 4 },
];

/** Susun: kalikan satuan dulu (tulis dan simpan), lalu puluhan ditambah simpanan. */
export const TARGET_SUSUN: readonly Kali[] = [
  { a: 28, b: 3 },
  { a: 19, b: 4 },
  { a: 36, b: 2 },
];

export const MISI_PERAHU_TEKS = "Tambah perahu sampai penumpang cukup, uraikan bilangan lalu kalikan, dan hitung bersusun. Urutannya bebas.";
