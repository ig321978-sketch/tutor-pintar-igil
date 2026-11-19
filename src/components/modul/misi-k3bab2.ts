/**
 * Misi dan tantangan bebas Kelas 3 Bab 2 (Kalimat Matematika, tema Perkemahan Akhir Pekan). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b2.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab): A Tumpukan Kayu, B Pos Persediaan.
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK3Bab2.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanKayu } from "./kayu-k3b2a/logika";
import type { KeadaanPersediaan } from "./botol-k3b2b/logika";

export type KeadaanK3Bab2 = { alat: "kerangka" } | KeadaanKayu | KeadaanPersediaan;

/** Sub-Bab A: Tumpukan Kayu. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-kayu-k3b2a.mjs. */
const kayu = (k: KeadaanK3Bab2): k is KeadaanKayu => k.alat === "kayu";
export const MISI_A: DefMisi<KeadaanK3Bab2>[] = [
  { id: "a-tambah", teks: "Tambah batang kayu sampai tumpukan sama dengan papan jumlah, lalu tekan Periksa.", wajib: true, cek: (k) => kayu(k) && k.tambahBenar.length >= 1 },
  { id: "a-bagan", teks: "Pilih bagian yang belum diketahui pada bagan jumlah dan bagian, lalu tekan Periksa.", wajib: true, cek: (k) => kayu(k) && k.baganBenar.length >= 1 },
  { id: "a-isi", teks: "Isi titik-titik pada kalimat Matematika dengan kartu bilangan yang tepat, lalu tekan Periksa.", wajib: true, cek: (k) => kayu(k) && k.isiBenar.length >= 1 },
  { id: "a-periksa", teks: "Periksa satu hasil dengan menjumlahkan, pilih cocok atau tidak cocok, lalu tekan Periksa.", wajib: true, cek: (k) => kayu(k) && k.periksaBenar.length >= 1 },
  { id: "a-bundel", teks: "Tambah batang satu per satu sampai sepuluh batang lepas ditukar menjadi satu bundel.", wajib: false, cek: (k) => kayu(k) && k.tukar },
  { id: "a-rak", teks: "Catat tiga pasangan berbeda untuk dua rak kayu yang jumlahnya seratus.", wajib: false, cek: (k) => kayu(k) && k.pasangan.length >= 3 },
];

/** Sub-Bab B: Pos Persediaan. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-botol-k3b2b.mjs. */
const persediaan = (k: KeadaanK3Bab2): k is KeadaanPersediaan => k.alat === "persediaan";
export const MISI_B: DefMisi<KeadaanK3Bab2>[] = [
  { id: "b-bagikan", teks: "Bagikan benda dari rak sampai sisanya sesuai sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => persediaan(k) && k.bagikanBenar.length >= 1 },
  { id: "b-kurang", teks: "Cari bilangan yang dikurangkan dengan awal dikurangi sisa, lalu tekan Periksa.", wajib: true, cek: (k) => persediaan(k) && k.kurangBenar.length >= 1 },
  { id: "b-awal", teks: "Cari bilangan awal dengan menambah yang dikurangkan dan sisa, lalu tekan Periksa.", wajib: true, cek: (k) => persediaan(k) && k.awalBenar.length >= 1 },
  { id: "b-periksa", teks: "Periksa satu catatan dengan mengurangkan lagi, pilih cocok atau tidak cocok, lalu tekan Periksa.", wajib: true, cek: (k) => persediaan(k) && k.periksaBenar.length >= 1 },
  { id: "b-pasangan", teks: "Catat dua pasangan berbeda untuk terjual dan sisa yang jumlahnya seratus.", wajib: false, cek: (k) => persediaan(k) && k.pasangan.length >= 2 },
  { id: "b-lengkap", teks: "Cari bilangan yang dikurangkan untuk ketiga kalimat sampai semuanya tepat.", wajib: false, cek: (k) => persediaan(k) && k.kurangBenar.length >= 3 },
];

export const daftarMisiK3Bab2 = (sub: string): DefMisi<KeadaanK3Bab2>[] =>
  sub === "B" ? MISI_B : MISI_A;
