/**
 * Data Simulasi Papan Layar Kelas 2 Bab 8 Sub-Bab B "Bintang Bu Maya" (diagram gambar): menempel lambang pada tiap baris sesuai tabel (lambang boleh diganti, ukuran selalu sama),
 * memilih judul dan keterangan, membandingkan dua baris (kata dan lebihnya), dan menjumlahkan baris. Berbeda dari Story (Story memakai selendang merah, kuning, hijau, dan biru).
 * Diuji: scripts/uji-gambar-k2b8b.mjs.
 */
import type { Lambang } from "./logika-cpa";

export const MISI_LAYAR_TEKS = "Tempel lambang sesuai tabel, beri judul dan keterangan, bandingkan dua baris, lalu jumlahkan. Urutannya bebas.";

/** Lambang awal pada papan layar. Mengganti lambang menjadi yang lain memenuhi tantangan ganti lambang. */
export const LAMBANG_AWAL: Lambang = "bintang";
/** Paling banyak gambar pada satu baris. */
export const BATAS_BARIS = 9;

export type TugasTempel = { judul: string; ket: string; baris: readonly { nama: string; n: number }[] };
/** Tabel data yang harus ditempeli lambang (tiga tabel, tiga jenis tiap tabel). */
export const TEMPEL_TUGAS: readonly TugasTempel[] = [
  { judul: "Camilan Penonton", ket: "Setiap gambar mewakili satu bungkus", baris: [{ nama: "Kacang", n: 6 }, { nama: "Keripik", n: 9 }, { nama: "Kue", n: 4 }] },
  { judul: "Balon Panggung", ket: "Setiap gambar mewakili satu balon", baris: [{ nama: "Oranye", n: 8 }, { nama: "Ungu", n: 1 }, { nama: "Pink", n: 6 }] },
  { judul: "Kursi Penonton", ket: "Setiap gambar mewakili satu kursi", baris: [{ nama: "Depan", n: 6 }, { nama: "Tengah", n: 9 }, { nama: "Belakang", n: 6 }] },
];

/** Pilihan judul dan keterangan untuk tiap tabel (tiga pilihan, `benar` = indeks yang tepat). */
export const JUDUL_PILIHAN: readonly { judul: readonly string[]; ket: readonly string[]; benarJudul: number; benarKet: number }[] = [
  { judul: ["Harga Camilan", "Camilan Penonton", "Penonton Pulang"], ket: ["Setiap gambar mewakili satu bungkus", "Gambar boleh besar atau kecil", "Setiap gambar mewakili dua bungkus"], benarJudul: 1, benarKet: 0 },
  { judul: ["Balon Panggung", "Lampu Panggung", "Tirai Panggung"], ket: ["Setiap gambar mewakili banyak balon", "Warna balon tidak penting", "Setiap gambar mewakili satu balon"], benarJudul: 0, benarKet: 2 },
  { judul: ["Tiket Hari Ini", "Pintu Masuk", "Kursi Penonton"], ket: ["Setiap gambar mewakili satu kursi", "Kursi dihitung dari kanan", "Setiap gambar mewakili satu baris"], benarJudul: 2, benarKet: 0 },
];

/** Dua baris yang dibandingkan: tabel (indeks pada TEMPEL_TUGAS) dan indeks dua barisnya. Satu pasangan sama banyak. */
export const BANDING_TUGAS: readonly { t: number; a: number; b: number }[] = [
  { t: 0, a: 0, b: 1 },
  { t: 1, a: 0, b: 1 },
  { t: 2, a: 0, b: 2 },
];

/** Baris yang dijumlahkan: tabel dan indeks barisnya. */
export const JUMLAH_TUGAS: readonly { t: number; idx: readonly number[] }[] = [
  { t: 0, idx: [0, 2] },
  { t: 1, idx: [0, 2] },
  { t: 2, idx: [0, 1, 2] },
];
