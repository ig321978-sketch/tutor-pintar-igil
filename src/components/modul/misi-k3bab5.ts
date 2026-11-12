/**
 * Misi dan tantangan bebas Kelas 3 Bab 5 (Penyajian Data dalam Tabel). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b5.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat). Tiap lab memuat beberapa tampilan dalam satu alat:
 *  A Mengurutkan dan Membandingkan Data : Lab Data Kelompok (Kumpul, Bandingkan, Cacah) + Mesin Urut + Pemilihan Ketua Kelas.
 *  B Menyajikan Data dalam Bentuk Tabel : Lab Tabel (Turus, Isi Tabel, Baca) + Mesin Tabel + Laporan Kelas (pencapaian bab).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanDataK3B5 } from "./lab-data-k3b5";
import type { KeadaanTabelK3B5 } from "./lab-tabel-k3b5";

export type KeadaanK3Bab5 = KeadaanDataK3B5 | KeadaanTabelK3B5 | KeadaanSelesai;
export type HurufMisiK3B5 = "A" | "B";

const data = (k: KeadaanK3Bab5): k is KeadaanDataK3B5 => k.alat === "data";
const tabel = (k: KeadaanK3Bab5): k is KeadaanTabelK3B5 => k.alat === "tabel";
const selesai = (k: KeadaanK3Bab5, id: string) => k.alat === "selesai" && k.id === id;
const pernahD = (k: KeadaanK3Bab5, ...id: string[]) => data(k) && id.every((p) => k.pernah.includes(p));
const pernahT = (k: KeadaanK3Bab5, ...id: string[]) => tabel(k) && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas (dipakai misi di bawah dan pembungkus React). */
export const ID_SKENARIO_K3B5 = { A: "ketua-kelas", B: "laporan-kelas" } as const;
export const ID_MESIN_K3B5 = { A: "mesin-urut", B: "mesin-tabel" } as const;

/** Sub-Bab A: mengurutkan, data terkecil dan terbesar, jangkauan, selisih, dan banyak nilai. */
export const MISI_A: DefMisi<KeadaanK3Bab5>[] = [
  { id: "a-urut", teks: "Di Kumpul, ubah banyak benda seorang anak, lalu urutkan dari terkecil dan dari terbesar.", wajib: true, cek: (k) => pernahD(k, "urut-kecil", "urut-besar") },
  { id: "a-ujung", teks: "Nyalakan Terkecil dan Terbesar saat data belum diurutkan dan anak pertama bukan yang terkecil.", wajib: true, cek: (k) => pernahD(k, "ujung-acak") },
  { id: "a-jangkauan", teks: "Atur banyak benda sampai jangkauannya tepat 5, dengan Jangkauan menyala.", wajib: true, cek: (k) => pernahD(k, "jangkauan:5") },
  { id: "a-banding", teks: "Di Bandingkan, ketuk dua anak yang selisih bendanya tepat 4.", wajib: true, cek: (k) => pernahD(k, "banding:4") },
  { id: "a-cacah", teks: "Di Cacah, ketuk semua 20 kartu nilai ulangan. Nilai 9 muncul berapa kali? Nilai 10?", wajib: true, cek: (k) => pernahD(k, "cacah:ulangan") },
  { id: "a-mesin", teks: "Selesaikan Mesin Urut sampai semua data diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B5.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Pemilihan Ketua Kelas sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B5.A) },
  { id: "a-nol", teks: "Buat semua anak sama banyak dan nyalakan Jangkauan. Berapa jangkauannya?", wajib: false, cek: (k) => pernahD(k, "jangkauan:0") },
  { id: "a-sama", teks: "Buat dua anak sama-sama terbanyak, dengan Terkecil dan Terbesar menyala.", wajib: false, cek: (k) => pernahD(k, "terbesar-sama") },
  { id: "a-kuis", teks: "Cacah semua kartu nilai kuis. Mengapa data terkecilnya bukan 5?", wajib: false, cek: (k) => pernahD(k, "cacah:kuis") },
];

/** Sub-Bab B: turus kelompok lima, tabel tiga kolom, dan membaca tabel. Sekaligus pencapaian misi bab. */
export const MISI_B: DefMisi<KeadaanK3Bab5>[] = [
  { id: "b-turus", teks: "Di Turus, buat turus 13: dua kelompok lima dan tiga garis.", wajib: true, cek: (k) => pernahT(k, "turus:13") },
  { id: "b-manik", teks: "Di Isi Tabel, cacah semua manik dan isi kolom banyak sampai tabel manik lengkap dan benar.", wajib: true, cek: (k) => pernahT(k, "lengkap:manik") },
  { id: "b-huruf", teks: "Lengkapi tabel huruf STATISTIKA: semua turus dan semua angka banyak.", wajib: true, cek: (k) => pernahT(k, "lengkap:statistika") },
  { id: "b-paling", teks: "Di Baca, cari huruf terbanyak dan huruf tersedikit pada tabel STATISTIKA.", wajib: true, cek: (k) => pernahT(k, "baca:statistika:terbanyak", "baca:statistika:tersedikit") },
  { id: "b-lebih", teks: "Lengkapi tabel nilai ulangan, lalu baca: berapa siswa bernilai lebih dari 7?", wajib: true, cek: (k) => pernahT(k, "baca:nilai:lebih:7") },
  { id: "b-mesin", teks: "Selesaikan Mesin Tabel sampai semua tabel diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B5.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Laporan Kelas sampai adegan akhir. Ini misi penutup bab.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B5.B) },
  { id: "b-dua-puluh", teks: "Buat turus 20. Ada berapa kelompok lima?", wajib: false, cek: (k) => pernahT(k, "turus:20") },
  { id: "b-kurang", teks: "Pada tabel nilai, baca berapa siswa bernilai kurang dari 7.", wajib: false, cek: (k) => pernahT(k, "baca:nilai:kurang:7") },
  { id: "b-sama", teks: "Lengkapi tabel MATEMATIKA dan cari huruf tersedikit. Ada berapa huruf yang sama sedikit?", wajib: false, cek: (k) => pernahT(k, "baca:matematika:tersedikit") },
];

export const daftarMisiK3Bab5 = (huruf: HurufMisiK3B5 | string): DefMisi<KeadaanK3Bab5>[] => (huruf === "B" ? MISI_B : MISI_A);
