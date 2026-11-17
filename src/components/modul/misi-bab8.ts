/**
 * Misi dan tantangan bebas Bab 8 (Mengenal Diagram, tema Perpustakaan Keliling). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Sub-Bab A memakai Meja Pilah (pustaka-k1b8a), Sub-Bab B (penutup bab) memakai Papan Survei (survei-k1b8b).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B dan menambah tipe keadaannya ke union KeadaanBab8.
 */

import type { DefMisi } from "./misi-simulasi";

import type { KeadaanMeja } from "./pustaka-k1b8a/logika";
import type { KeadaanSurvei } from "./survei-k1b8b/logika";

export type KeadaanBab8 = { alat: "kerangka" } | KeadaanMeja | KeadaanSurvei;

/**
 * Sub-Bab A (awal cerita Perpustakaan Keliling): Misi Meja Pilah bagian satu, Simulasi Meja Pilah (pustaka-k1b8a). Benda di meja sama dengan
 * BENDA_SIM di pustaka-k1b8a/data.ts (pensil empat, gunting dua, klip empat; pensil dan klip sama banyak), diuji di scripts/uji-pustaka-k1b8a.mjs.
 */
const meja = (k: KeadaanBab8): k is KeadaanMeja => k.alat === "meja";
export const MISI_A: DefMisi<KeadaanBab8>[] = [
  { id: "a-pilah", teks: "Pilah semua benda di meja ke rak menurut jenisnya sampai rapi.", wajib: true, cek: (k) => meja(k) && k.terpilah },
  { id: "a-turus", teks: "Hitung turus di ketiga rak: satu benda, satu goresan.", wajib: true, cek: (k) => meja(k) && k.dihitung.length >= 3 },
  { id: "a-tabel", teks: "Lihat tabel dari rak yang sudah rapi, lalu putar tabel menjadi mendatar.", wajib: true, cek: (k) => meja(k) && k.terpilah && k.pernahDatar },
  { id: "a-banding", teks: "Setelah rak rapi, bandingkan dua jenis dan dengar mana yang lebih banyak dan selisihnya.", wajib: true, cek: (k) => meja(k) && k.bandingTuntas >= 1 },
  { id: "a-sama", teks: "Cari dua jenis yang sama banyak, lalu bandingkan keduanya.", wajib: false, cek: (k) => meja(k) && k.samaTuntas >= 1 },
  { id: "a-jumlah", teks: "Minta jumlah semuanya di tabel setelah rak rapi.", wajib: false, cek: (k) => meja(k) && k.terpilah && k.jumlahDilihat },
];

/**
 * Sub-Bab B (penutup bab): Misi Papan Survei, Simulasi Papan Survei (survei-k1b8b). Dua belas anak antre dengan pilihan tetap (kucing enam, ayam dua, ikan satu,
 * burung tiga), berbeda dari Story; diuji di scripts/uji-survei-k1b8b.mjs.
 */
const survei = (k: KeadaanBab8): k is KeadaanSurvei => k.alat === "survei";
export const ANAK_SURVEI_B = 12;
/** Banyak centang tiap jenis setelah dua belas anak ditanya (sama dengan tabelSurvei di survei-k1b8b/logika.ts, diuji). */
export const TABEL_SURVEI_B = [6, 2, 1, 3];
export const MISI_B: DefMisi<KeadaanBab8>[] = [
  { id: "b-tanya", teks: "Tanyai semua anak di antrean satu per satu dan centang satu jawaban untuk tiap anak.", wajib: true, cek: (k) => survei(k) && k.ditanya >= ANAK_SURVEI_B },
  { id: "b-diagram", teks: "Buat diagram gambar yang sama dengan tabel, rapat dari garis bawah.", wajib: true, cek: (k) => survei(k) && k.ditanya >= ANAK_SURVEI_B && k.rapat && k.gambar.every((n, j) => n === TABEL_SURVEI_B[j]) },
  { id: "b-banding", teks: "Bandingkan dua jenis yang banyaknya berbeda, lalu dengar kata lebihnya dan selisihnya.", wajib: true, cek: (k) => survei(k) && k.bandingTuntas >= 1 },
  { id: "b-lapor", teks: "Penutup bab: kirim laporan survei lengkap, tabel dan diagram, kepada Pak Pos.", wajib: true, cek: (k) => survei(k) && k.lapor },
  { id: "b-dobel", teks: "Coba mencentang dua jawaban untuk satu anak, lalu baca pesannya.", wajib: false, cek: (k) => survei(k) && k.dobelDicoba >= 1 },
  { id: "b-mendatar", teks: "Ubah diagram menjadi mendatar setelah datanya lengkap, lalu baca lagi datanya.", wajib: false, cek: (k) => survei(k) && k.mendatarDilihat },
];

export const daftarMisiBab8 = (sub: string): DefMisi<KeadaanBab8>[] => (sub === "B" ? MISI_B : MISI_A);
