/**
 * Data Simulasi Meja Label Kelas 3 Bab 1 Sub-Bab B "Kartu Harga Bu Wati" (tempat angka), cerita Toko Kelontong Pak Joko: menyusun kartu seratus, sepuluh, dan satu menjadi label,
 * menguraikan bilangan, mengisi tabel tiga tempat dengan ANGKA, menjaga tempat dengan nol, dan mencari tempat yang mewakili jumlah paling besar untuk angka yang sama.
 * Berbeda dari Story (Story memakai 251, 345, 602, 987, 408, dan 804, serta 600, 60, dan 6) dan dari data tugas CPA. Diuji: scripts/uji-kartu-k3b1b.mjs.
 */

export const MISI_LABEL_TEKS = "Susun kartu menjadi label, uraikan bilangan, isi tabel dengan angka, dan jaga tempat dengan nol. Urutannya bebas.";

/** Paling banyak kartu pada satu tempat (satu angka). */
export const BATAS_KARTU = 9;

/** Label yang harus disusun dari kartu seratus, sepuluh, dan satu. */
export const SUSUN_TUGAS: readonly number[] = [324, 517, 683];
/** Bilangan yang diuraikan menjadi jumlah ratusan, puluhan, dan satuan. */
export const URAI_TUGAS: readonly number[] = [462, 739, 815];
/** Bilangan yang tabel tiga tempatnya diisi dengan angka (bukan jumlahnya). */
export const TABEL_TUGAS: readonly number[] = [296, 543, 862];
/** Bilangan yang punya angka nol penjaga tempat: tumpukan kartu ditunjukkan, label harus ditulis lewat tabel. */
export const NOL_TUGAS: readonly number[] = [509, 340, 760];
/** Bilangan dengan angka sama di dua tempat: pilih tempat yang mewakili jumlah paling besar. */
export const SAMA_TUGAS: readonly { n: number; d: number }[] = [
  { n: 232, d: 2 },
  { n: 533, d: 3 },
  { n: 616, d: 6 },
  { n: 377, d: 7 },
];
