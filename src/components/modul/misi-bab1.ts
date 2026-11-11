/**
 * Misi dan tantangan bebas Bab 1 (Bilangan 0 sampai 10). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu Laboratorium Bilangan yang membuka perwakilan sedikit demi sedikit
 * (A: benda; B: + bingkai sepuluh, garis bilangan, bandingkan; C: + tab Katak; D: + pasangan bilangan
 * dan tab Kasir Warung, sekaligus simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type KeadaanBilangan = {
  alat: "bilangan";
  n: number;
  m: number;
  /** Bagian merah yang sudah dibatasi 0 sampai n (sama dengan yang tampil di pasangan bilangan). */
  a: number;
  /** Perwakilan yang benar-benar tampil (sudah diajarkan dan sedang menyala). */
  benda: boolean;
  bingkai: boolean;
  garis: boolean;
  pasangan: boolean;
  banding: boolean;
};

export type KeadaanBab1 = KeadaanBilangan | KeadaanSelesai;

const bil = (k: KeadaanBab1): k is KeadaanBilangan => k.alat === "bilangan";
const selesai = (k: KeadaanBab1, id: string) => k.alat === "selesai" && k.id === id;
const beda = (k: KeadaanBilangan) => Math.abs(k.n - k.m);

/** Sub-Bab A: menghitung 0 sampai 10 dengan benda bernomor. */
export const MISI_A: DefMisi<KeadaanBab1>[] = [
  { id: "a-lima", teks: "Ketuk kotak benda ke-5. Angka 5 muncul.", wajib: true, cek: (k) => bil(k) && k.n === 5 },
  { id: "a-nol", teks: "Buat bilangan nol: tidak ada benda sama sekali.", wajib: true, cek: (k) => bil(k) && k.n === 0 },
  { id: "a-sepuluh", teks: "Isi semua kotak sampai bilangan 10.", wajib: true, cek: (k) => bil(k) && k.n === 10 },
  { id: "a-tujuh", teks: "Buat bilangan 7, lalu dengarkan namanya.", wajib: true, cek: (k) => bil(k) && k.n === 7 },
  { id: "a-sembilan", teks: "Buat bilangan 9. Tinggal satu lagi menjadi 10.", wajib: false, cek: (k) => bil(k) && k.n === 9 },
  { id: "a-dua", teks: "Buat bilangan 2, lalu hitung bendanya satu per satu.", wajib: false, cek: (k) => bil(k) && k.n === 2 },
];

/** Sub-Bab B: membandingkan dengan benda, bingkai sepuluh, dan garis bilangan. */
export const MISI_B: DefMisi<KeadaanBab1>[] = [
  { id: "b-sama", teks: "Atur bilangan pertama dan kedua sampai sama banyak.", wajib: true, cek: (k) => bil(k) && k.banding && k.n === k.m },
  { id: "b-kecil", teks: "Buat bilangan kedua lebih besar dari bilangan pertama.", wajib: true, cek: (k) => bil(k) && k.banding && k.n < k.m },
  { id: "b-jauh", teks: "Buat bilangan pertama lebih besar 5 atau lebih dari bilangan kedua.", wajib: true, cek: (k) => bil(k) && k.banding && k.n - k.m >= 5 },
  { id: "b-bingkai", teks: "Pakai bingkai sepuluh: buat bilangan 8, lalu hitung kotak kosongnya.", wajib: true, cek: (k) => bil(k) && k.bingkai && k.n === 8 },
  { id: "b-garis", teks: "Buat bilangan pertama 3 dan bilangan kedua 9. Lihat letaknya di garis bilangan.", wajib: true, cek: (k) => bil(k) && k.banding && k.garis && k.n === 3 && k.m === 9 },
  { id: "b-selisih", teks: "Buat dua bilangan yang hanya beda satu.", wajib: false, cek: (k) => bil(k) && k.banding && beda(k) === 1 },
  { id: "b-ujung", teks: "Bandingkan bilangan paling kecil dengan paling besar: 0 dan 10.", wajib: false, cek: (k) => bil(k) && k.banding && ((k.n === 0 && k.m === 10) || (k.n === 10 && k.m === 0)) },
];

/** Sub-Bab C: maju dan mundur di garis bilangan, dan Katak Maju Mundur. */
export const MISI_C: DefMisi<KeadaanBab1>[] = [
  { id: "c-sembilan", teks: "Ketuk angka 9 di garis bilangan. Makin ke kanan, makin besar.", wajib: true, cek: (k) => bil(k) && k.garis && k.n === 9 },
  { id: "c-satu", teks: "Geser bilangan ke kiri sampai 1 di garis bilangan.", wajib: true, cek: (k) => bil(k) && k.garis && k.n === 1 },
  { id: "c-katak", teks: "Antar Katak sampai semua misi sungai selesai.", wajib: true, cek: (k) => selesai(k, "katak") },
  { id: "c-nol", teks: "Mundur sampai nol di garis bilangan.", wajib: false, cek: (k) => bil(k) && k.garis && k.n === 0 },
  { id: "c-sebelah", teks: "Buat dua bilangan yang bersebelahan di garis bilangan.", wajib: false, cek: (k) => bil(k) && k.banding && k.garis && beda(k) === 1 },
];

/** Sub-Bab D (sub-bab akhir): pasangan bilangan, sekaligus pencapaian misi bab ini. */
export const MISI_D: DefMisi<KeadaanBab1>[] = [
  { id: "d-sepuluh", teks: "Pecah bilangan 10 menjadi 6 dan 4 dengan Bagian merah.", wajib: true, cek: (k) => bil(k) && k.pasangan && k.n === 10 && k.a === 6 },
  { id: "d-sama", teks: "Bagi bilangan 8 menjadi dua bagian sama banyak: 4 dan 4.", wajib: true, cek: (k) => bil(k) && k.pasangan && k.n === 8 && k.a === 4 },
  { id: "d-nol", teks: "Pecah bilangan 7 dengan Bagian merah 0. Lihat pasangannya.", wajib: true, cek: (k) => bil(k) && k.pasangan && k.n === 7 && k.a === 0 },
  { id: "d-kasir", teks: "Selesaikan skenario Kasir Warung sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "kasir") },
  { id: "d-ingat-banding", teks: "Ingat Sub-Bab B: buat dua bilangan sama banyak.", wajib: false, cek: (k) => bil(k) && k.banding && k.n === k.m },
  { id: "d-ingat-katak", teks: "Ingat Sub-Bab C: antar Katak sampai selesai.", wajib: false, cek: (k) => selesai(k, "katak") },
];

export const daftarMisiBab1 = (sub: string): DefMisi<KeadaanBab1>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : sub === "D" ? MISI_D : MISI_A);
