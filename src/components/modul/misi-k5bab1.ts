/**
 * Misi dan tantangan bebas Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000, tema Hari Pertandingan di Stadion Kota). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b1.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK5Bab1.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanTribun } from "./tribun-k5b1a/logika";
import type { KeadaanUrutan } from "./urutan-k5b1b/logika";
import type { KeadaanBundel } from "./bundel-k5b1c/logika";
import type { KeadaanHitung } from "./hitung-k5b1d/logika";

export type KeadaanK5Bab1 = { alat: "kerangka" } | KeadaanTribun | KeadaanUrutan | KeadaanBundel | KeadaanHitung;

/** Sub-Bab A: Tabel Tribun. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-tribun-k5b1a.mjs. */
const tribun = (k: KeadaanK5Bab1): k is KeadaanTribun => k.alat === "tribun";
export const MISI_A: DefMisi<KeadaanK5Bab1>[] = [
  { id: "a-isi", teks: "Isi angka tiap kolom sesuai bilangan yang diumumkan, lalu tekan Periksa.", wajib: true, cek: (k) => tribun(k) && k.isiBenar.length >= 1 },
  { id: "a-nol", teks: "Beri nol penjaga pada kolom yang tidak disebut, lalu tekan Periksa.", wajib: true, cek: (k) => tribun(k) && k.nolBenar.length >= 1 },
  { id: "a-titik", teks: "Pasang titik pemisah, pilih bacaannya, lalu tekan Periksa.", wajib: true, cek: (k) => tribun(k) && k.titikBenar.length >= 1 },
  { id: "a-urai", teks: "Pilih banyak yang diwakili satu angka menurut kolomnya, lalu tekan Periksa.", wajib: true, cek: (k) => tribun(k) && k.uraiBenar.length >= 1 },
  { id: "a-tolak", teks: "Pasang titik pemisah di tempat yang salah, dan lihat alat menolak.", wajib: false, cek: (k) => tribun(k) && k.tolak },
  { id: "a-dua", teks: "Isi dua bilangan dengan benar tanpa terhenti.", wajib: false, cek: (k) => tribun(k) && k.isiBenar.length >= 2 },
];

/** Sub-Bab B: Garis Urutan. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-urutan-k5b1b.mjs. */
const urutan = (k: KeadaanK5Bab1): k is KeadaanUrutan => k.alat === "urutan";
export const MISI_B: DefMisi<KeadaanK5Bab1>[] = [
  { id: "b-kiri", teks: "Pilih kolom penentu dan tanda untuk dua bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => urutan(k) && k.bandingBenar.length >= 1 },
  { id: "b-garis", teks: "Pilih ruas tempat bilangan di garis berpatokan, lalu tekan Periksa.", wajib: true, cek: (k) => urutan(k) && k.garisBenar.length >= 1 },
  { id: "b-urut", teks: "Ketuk empat bilangan dalam urutan yang diminta, lalu tekan Periksa.", wajib: true, cek: (k) => urutan(k) && k.urutBenar.length >= 1 },
  { id: "b-patokan", teks: "Pilih patokan yang paling dekat dengan bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => urutan(k) && k.patBenar.length >= 1 },
  { id: "b-tolak", teks: "Ketuk bilangan yang belum gilirannya pada alat Urut, dan lihat alat menolak.", wajib: false, cek: (k) => urutan(k) && k.tolakUrut },
  { id: "b-dua", teks: "Urutkan dua kumpulan bilangan dengan benar tanpa terhenti.", wajib: false, cek: (k) => urutan(k) && k.urutBenar.length >= 2 },
];

/** Sub-Bab C: Tukar Bundel. Empat misi wajib dan dua tantangan bebas, id berawalan c-, tanpa skor. Diuji di scripts/uji-bundel-k5b1c.mjs. */
const bundel = (k: KeadaanK5Bab1): k is KeadaanBundel => k.alat === "bundel";
export const MISI_C: DefMisi<KeadaanK5Bab1>[] = [
  { id: "c-urai", teks: "Atur bundel tiap kolom sampai sama dengan bilangan di papan, lalu tekan Periksa.", wajib: true, cek: (k) => bundel(k) && k.uraiBenar.length >= 1 },
  { id: "c-tukar", teks: "Tukar bundel sampai sama dengan susunan sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => bundel(k) && k.tukarBenar.length >= 1 },
  { id: "c-susun", teks: "Isi tiap kolom, termasuk nol, sampai bilangannya tepat, lalu tekan Periksa.", wajib: true, cek: (k) => bundel(k) && k.susunBenar.length >= 1 },
  { id: "c-sama", teks: "Pilih semua susunan yang jumlahnya sama dengan bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => bundel(k) && k.samaBenar.length >= 1 },
  { id: "c-tolak", teks: "Tukar bundel yang tidak cukup untuk ditukar, dan lihat alat menolak.", wajib: false, cek: (k) => bundel(k) && k.tolak },
  { id: "c-dua", teks: "Selesaikan dua susunan tukar dengan benar tanpa terhenti.", wajib: false, cek: (k) => bundel(k) && k.tukarBenar.length >= 2 },
];

/** Sub-Bab D: Susun Hitung. Empat misi wajib dan dua tantangan bebas, id berawalan d-, tanpa skor. Diuji di scripts/uji-hitung-k5b1d.mjs. */
const hitung = (k: KeadaanK5Bab1): k is KeadaanHitung => k.alat === "hitung";
export const MISI_D: DefMisi<KeadaanK5Bab1>[] = [
  { id: "d-jumlah", teks: "Jumlahkan dua bilangan bersusun kolom demi kolom sampai selesai.", wajib: true, cek: (k) => hitung(k) && k.jumlahBenar.length >= 1 },
  { id: "d-kurang", teks: "Kurangkan dua bilangan bersusun, pinjam bila perlu, sampai selesai.", wajib: true, cek: (k) => hitung(k) && k.kurangBenar.length >= 1 },
  { id: "d-kali", teks: "Pisah pengali dan pilih hasil kalinya, lalu tekan Periksa.", wajib: true, cek: (k) => hitung(k) && k.kaliBenar.length >= 1 },
  { id: "d-bagi", teks: "Bagi bilangan per kolom dari kiri sampai selesai.", wajib: true, cek: (k) => hitung(k) && k.bagiBenar.length >= 1 },
  { id: "d-tolak", teks: "Tekan Periksa pada perkalian sebelum memisah pengali, dan lihat alat menolak.", wajib: false, cek: (k) => hitung(k) && k.tolakKali },
  { id: "d-dua", teks: "Selesaikan dua pengurangan bersusun dengan benar tanpa terhenti.", wajib: false, cek: (k) => hitung(k) && k.kurangBenar.length >= 2 },
];

export const daftarMisiK5Bab1 = (sub: string): DefMisi<KeadaanK5Bab1>[] => {
  switch (sub) {
    case "B":
      return MISI_B;
    case "C":
      return MISI_C;
    case "D":
      return MISI_D;
    default:
      return MISI_A;
  }
};
