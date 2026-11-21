/**
 * Data Simulasi Gudang Handuk Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (tempat angka dan banyaknya tiap angka), cerita Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (2.304, 3.204, 3.124, 4.162, 4.612, 5.072, 4.035) dan dari tugas CPA. Bilangan empat angka, satu angka paling banyak sembilan.
 * Mind-map dan Infografis punya data sendiri (data-peta.ts dan data-info.ts). Diuji: scripts/uji-handuk-k4b1b.mjs.
 */

/** Isi: bilangan yang harus diisikan ke gudang (peti = ribuan, kotak = ratusan, ikat = puluhan, lembar = satuan). */
export const TARGET_ISI: readonly number[] = [3427, 5060];

/** Bagan: banyak peti, kotak, ikat, dan lembar yang sudah tersusun; anak menulis angka tiap kolom pada bagan tempat (kolom kosong diisi nol). */
export type TargetBagan = { isi: [number, number, number, number] };
export const TARGET_BAGAN: readonly TargetBagan[] = [{ isi: [6, 0, 3, 5] }, { isi: [4, 8, 0, 1] }];

/** Arti: bilangan dengan satu tempat dilingkari (nomor tempat 0 = ribuan sampai 3 = satuan); anak memilih banyaknya angka itu. */
export type TargetArti = { n: number; tanda: number };
export const TARGET_ARTI: readonly TargetArti[] = [
  { n: 6318, tanda: 1 },
  { n: 8052, tanda: 2 },
  { n: 4790, tanda: 0 },
  { n: 9604, tanda: 3 },
];

/** Tukar: dua tempat yang harus ditukar (nomor tempat), lalu menilai bilangan baru lebih atau kurang dari semula. */
export type TargetTukar = { n: number; a: number; b: number };
export const TARGET_TUKAR: readonly TargetTukar[] = [
  { n: 7240, a: 0, b: 1 },
  { n: 3518, a: 2, b: 3 },
];

export const MISI_HANDUK_TEKS = "Isi gudang sesuai bilangan, tulis bagan tempat, pilih arti sebuah angka, lalu tukar dua tempat. Urutannya bebas.";
