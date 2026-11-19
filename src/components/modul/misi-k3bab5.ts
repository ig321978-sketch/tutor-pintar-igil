/**
 * Misi dan tantangan bebas Kelas 3 Bab 5 (Penyajian Data dalam Tabel, tema Bengkel Sepeda Pak Hasan). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b5.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab): A Meja Catat, B Papan Tabel.
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK3Bab5.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanCatat } from "./papan-k3b5a/logika";
import type { KeadaanTabel } from "./tabel-k3b5b/logika";

export type KeadaanK3Bab5 = { alat: "kerangka" } | KeadaanCatat | KeadaanTabel;

/** Sub-Bab A: Meja Catat. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. */
const catat = (k: KeadaanK3Bab5): k is KeadaanCatat => k.alat === "catat";
export const MISI_A: DefMisi<KeadaanK3Bab5>[] = [
  { id: "a-urut", teks: "Geser kartu data sampai berurutan sesuai arah yang diminta, lalu tekan Periksa.", wajib: true, cek: (k) => catat(k) && k.urutBenar.length >= 1 },
  { id: "a-ujung", teks: "Urutkan data, tandai data terkecil dan data terbesar, lalu tekan Periksa.", wajib: true, cek: (k) => catat(k) && k.ujungBenar.length >= 1 },
  { id: "a-jangkau", teks: "Pilih jangkauan, tekan Cek Jangkauan, lalu tekan Periksa.", wajib: true, cek: (k) => catat(k) && k.jangBenar.length >= 1 },
  { id: "a-turus", teks: "Tambah garis turus sebanyak benda, pilih banyaknya, lalu tekan Periksa.", wajib: true, cek: (k) => catat(k) && k.turusBenar.length >= 1 },
  { id: "a-banding", teks: "Pilih hari yang datanya lebih banyak dan selisihnya, lalu tekan Periksa.", wajib: false, cek: (k) => catat(k) && k.bandBenar.length >= 1 },
  { id: "a-tolak", teks: "Coba menandai data sebelum diurutkan, dan lihat alat menolak.", wajib: false, cek: (k) => catat(k) && k.tolak },
];

/** Sub-Bab B: Papan Tabel. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-tabel-k3b5b.mjs. */
const tabel = (k: KeadaanK3Bab5): k is KeadaanTabel => k.alat === "tabel";
export const MISI_B: DefMisi<KeadaanK3Bab5>[] = [
  { id: "b-cacah", teks: "Ketuk jenis sesuai daftar sampai semua tercatat dengan turus berlima, lalu tekan Periksa.", wajib: true, cek: (k) => tabel(k) && k.cacahBenar.length >= 1 },
  { id: "b-isi", teks: "Isi kolom banyak tiap baris sesuai turusnya, lalu tekan Periksa.", wajib: true, cek: (k) => tabel(k) && k.isiBenar.length >= 1 },
  { id: "b-urut", teks: "Geser baris tabel sampai urut sesuai arah yang diminta, lalu tekan Periksa.", wajib: true, cek: (k) => tabel(k) && k.urutBenar.length >= 1 },
  { id: "b-baca", teks: "Tekan Baca kolom banyak, pilih jawaban pertanyaan tabel, lalu tekan Periksa.", wajib: true, cek: (k) => tabel(k) && k.bacaBenar.length >= 1 },
  { id: "b-tolak", teks: "Coba menjawab sebelum membaca kolom banyak, dan lihat alat menolak.", wajib: false, cek: (k) => tabel(k) && k.tolak },
  { id: "b-semua", teks: "Jawab semua pertanyaan baca tabel dengan benar: terbanyak, tersedikit, lebih dari, dan selisih.", wajib: false, cek: (k) => tabel(k) && k.bacaBenar.length >= 4 },
];

export const daftarMisiK3Bab5 = (sub: string): DefMisi<KeadaanK3Bab5>[] =>
  sub === "B" ? MISI_B : MISI_A;
