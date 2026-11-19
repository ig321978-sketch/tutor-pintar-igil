/**
 * Misi dan tantangan bebas Kelas 2 Bab 8 (Berbagai Diagram, tema Pentas Seni Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Sub-Bab A memakai Simulasi Meja Catat (turus-k2b8a), Sub-Bab B (akhir bab) Papan Layar (gambar-k2b8b).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B dan menambah tipe keadaannya ke union KeadaanK2Bab8.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanCatat } from "./turus-k2b8a/logika";
import type { KeadaanLayar } from "./gambar-k2b8b/logika";

export type KeadaanK2Bab8 = { alat: "kerangka" } | KeadaanCatat | KeadaanLayar;

/**
 * Sub-Bab A (awal cerita Pentas Seni): Misi Meja Catat, Simulasi Meja Catat (turus-k2b8a). Benda panggung (lampu, kursi lipat, kabel, mikrofon) dan data warna kostum berbeda dari Story.
 * Empat misi wajib dan dua tantangan bebas, tanpa skor. Diuji di scripts/uji-turus-k2b8a.mjs.
 */
const catat = (k: KeadaanK2Bab8): k is KeadaanCatat => k.alat === "catat";
export const MISI_A: DefMisi<KeadaanK2Bab8>[] = [
  { id: "a-pilah", teks: "Pilah semua benda panggung ke baris jenisnya sampai tumpukan kosong.", wajib: true, cek: (k) => catat(k) && k.pilahSelesai },
  { id: "a-turus", teks: "Tulis turus untuk dua jenis benda: satu garis untuk satu benda, lalu tekan Periksa.", wajib: true, cek: (k) => catat(k) && k.turusBenar.length >= 2 },
  { id: "a-tabel", teks: "Lengkapi banyaknya tiap jenis di tabel turus, lalu tekan Periksa.", wajib: true, cek: (k) => catat(k) && k.tabelBenar },
  { id: "a-baca", teks: "Baca diagram turus: pilih jenis yang paling banyak dan lebihnya, lalu tekan Periksa.", wajib: true, cek: (k) => catat(k) && k.bacaBenar },
  { id: "a-data", teks: "Kumpulkan data sendiri: tulis satu garis untuk jawaban tiap anak sampai semuanya tercatat.", wajib: false, cek: (k) => catat(k) && k.dataSelesai },
  { id: "a-sama", teks: "Temukan dua jenis benda yang sama banyak lewat alat Baca.", wajib: false, cek: (k) => catat(k) && k.samaTemu },
];

/**
 * Sub-Bab B (akhir bab, pencapaian misi bab ini): Misi Papan Layar, Simulasi Papan Layar (gambar-k2b8b). Tabel camilan, balon, dan kursi berbeda dari Story (selendang).
 * Empat misi wajib dan dua tantangan bebas, tanpa skor. Diuji di scripts/uji-gambar-k2b8b.mjs.
 */
const layar = (k: KeadaanK2Bab8): k is KeadaanLayar => k.alat === "layar";
export const MISI_B: DefMisi<KeadaanK2Bab8>[] = [
  { id: "b-tempel", teks: "Tempel lambang pada tiap baris sampai sama dengan tabel, lalu tekan Periksa.", wajib: true, cek: (k) => layar(k) && k.tempelBenar.length >= 1 },
  { id: "b-judul", teks: "Pilih judul dan keterangan yang tepat untuk diagram, lalu tekan Periksa.", wajib: true, cek: (k) => layar(k) && k.judulBenar.length >= 1 },
  { id: "b-banding", teks: "Bandingkan dua baris, pilih kata dan lebihnya, lalu tekan Periksa.", wajib: true, cek: (k) => layar(k) && k.bandingBenar.length >= 1 },
  { id: "b-jumlah", teks: "Jumlahkan banyak gambar pada baris yang ditandai, lalu tekan Periksa.", wajib: true, cek: (k) => layar(k) && k.jumlahBenar.length >= 1 },
  { id: "b-ganti", teks: "Ganti lambang menjadi bentuk lain, lalu selesaikan satu diagram dengan lambang itu.", wajib: false, cek: (k) => layar(k) && k.lambangGanti },
  { id: "b-lengkap", teks: "Selesaikan ketiga tabel tempel sampai semua diagramnya tepat.", wajib: false, cek: (k) => layar(k) && k.tempelBenar.length >= 3 },
];

export const daftarMisiK2Bab8 = (sub: string): DefMisi<KeadaanK2Bab8>[] => (sub === "B" ? MISI_B : MISI_A);
