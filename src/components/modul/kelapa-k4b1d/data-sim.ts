/**
 * Data Simulasi Kios Kelapa Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis" (menyusun dan menguraikan bilangan), Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (lima ribu dua ratus tujuh puluh; empat ribu ditambah seribu dua ratus tujuh puluh; enam ribu empat ratus tiga; tiga ribu tujuh ratus lima) dan dari tugas CPA.
 * Mind-map dan Infografis memakai data-peta.ts. Diuji: scripts/uji-kelapa-k4b1d.mjs dan scripts/uji-visual-k4b1def.mjs.
 */

/** Pecah: bilangan ditulis di papan; anak mengisi keranjang tiap tempat (ribuan, ratusan, puluhan, satuan) sampai jumlahnya sama. */
export type TargetPecah = { benda: string; n: number };
export const TARGET_PECAH: readonly TargetPecah[] = [
  { benda: "kelapa", n: 6482 },
  { benda: "nanas", n: 3059 },
  { benda: "semangka", n: 8706 },
];

/** Susun: keranjang sudah terisi (ribuan, ratusan, puluhan, satuan); anak memilih bilangan yang tersusun, tempat kosong diisi nol. */
export type TargetSusun = { benda: string; isi: [number, number, number, number] };
export const TARGET_SUSUN: readonly TargetSusun[] = [
  { benda: "kelapa", isi: [4, 2, 0, 5] },
  { benda: "nanas", isi: [7, 0, 3, 6] },
  { benda: "kerang", isi: [2, 9, 0, 0] },
];

/** Bagan: utuh dan satu bagian diketahui (kelipatan seratus); anak memilih bagian yang lain, menekan Cek Bagan, lalu Periksa. */
export type TargetBagan = { utuh: number; bagian: number };
export const TARGET_BAGAN: readonly TargetBagan[] = [
  { utuh: 7000, bagian: 3000 },
  { utuh: 9500, bagian: 4000 },
  { utuh: 6800, bagian: 2000 },
];

/** Lain: satu bilangan diuraikan dengan lebih dari satu cara; anak memilih ribuan bagian pertama dan menyimpan tiga cara yang berbeda. */
export type TargetLain = { benda: string; n: number };
export const TARGET_LAIN: readonly TargetLain[] = [
  { benda: "kelapa", n: 7800 },
  { benda: "nanas", n: 5960 },
  { benda: "semangka", n: 9130 },
];
/** Uang: uang yang dibayar (kelipatan seratus); anak mengatur lembar Rp 2.000 dan keping Rp 1.000, 500, 100 dari kotak kios sampai jumlahnya pas, lalu menyimpan dua uraian berbeda. Data berbeda dari Story (7.300 dan 10.000) dan dari tugas CPA. */
export type TargetUang = { n: number };
export const TARGET_UANG: readonly TargetUang[] = [{ n: 5400 }, { n: 8200 }, { n: 9600 }];
/** Banyak uraian uang berbeda yang harus disimpan untuk satu jumlah uang. */
export const URAIAN_UANG_DIPERLUKAN = 2;
/** Banyak cara berbeda yang harus disimpan untuk satu bilangan. */
export const CARA_DIPERLUKAN = 3;
/** Banyak keranjang paling banyak di satu tempat. */
export const MAKS_KERANJANG = 9;

export const MISI_KELAPA_TEKS = "Pecah bilangan ke keranjang, susun bilangan, isi bagan bagian utuh, lalu cari cara lain. Urutannya bebas.";
