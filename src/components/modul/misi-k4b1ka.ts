/**
 * Misi dan tantangan bebas Modul Kedua Kelas 4 Bab 1 Sub-Bab A (Bilangan Cacah sampai 10.000). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b1-kedua.mjs. Naskah orisinal IGIL; acuan topik Matematika SD/MI Kelas IV Bab 1 Sub-Bab A.
 *
 * Simulasi bertahap (tiga alat: lab, mesin, skenario):
 *  A Membaca dan menulis: Lab Kemasan (Rakit, Baca, Tulis) + Mesin Baca + Gim Kebun Kira
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKemasanK4B1KA } from "./lab-kemasan-k4b1ka";

export type KeadaanK4B1KA = KeadaanKemasanK4B1KA | KeadaanSelesai;

const selesai = (k: KeadaanK4B1KA, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4B1KA, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B1KA = "kira-gim-kebun-ka";
export const ID_MESIN_K4B1KA = "mesin-baca-ka";

export const MISI_A: DefMisi<KeadaanK4B1KA>[] = [
  { id: "a-tukar", teks: "Di Rakit, tambah dus sampai sepuluh dan lihat sepuluh dus ditukar menjadi satu peti.", wajib: true, cek: (k) => pernah(k, "kemasan", "tukar:dus") },
  { id: "a-rakit", teks: "Rakit 4.152 (koin panen Kira) dengan Bacaan menyala.", wajib: true, cek: (k) => pernah(k, "kemasan", "baca:4152") },
  { id: "a-nol", teks: "Rakit 5.007 dengan Bacaan menyala. Tempat mana yang dilewati saat dibaca?", wajib: true, cek: (k) => pernah(k, "kemasan", "baca:5007") },
  { id: "a-seribu", teks: "Rakit 1.308 dengan Bacaan menyala. Mengapa dibaca seribu?", wajib: true, cek: (k) => pernah(k, "kemasan", "baca:1308") },
  { id: "a-tulis", teks: "Di Tulis, susun kartu angka untuk skor tertinggi gim, lalu tekan Periksa.", wajib: true, cek: (k) => pernah(k, "kemasan", "tulis:4718") },
  { id: "a-mesin", teks: "Selesaikan Mesin Baca sampai semua bilangan diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1KA) },
  { id: "a-skenario", teks: "Selesaikan skenario Gim Kebun Kira sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1KA) },
  { id: "a-sepuluh-ribu", teks: "Rakit 10.000. Berapa peti yang kamu perlukan?", wajib: false, cek: (k) => pernah(k, "kemasan", "rakit:10000") },
  { id: "a-tulis-nol", teks: "Di Tulis, tulis tiga ribu tujuh puluh lima dengan benar.", wajib: false, cek: (k) => pernah(k, "kemasan", "tulis:3075") },
  { id: "a-8209", teks: "Rakit 8.209 dengan Bacaan menyala.", wajib: false, cek: (k) => pernah(k, "kemasan", "baca:8209") },
];

export const daftarMisiK4B1KA = (): DefMisi<KeadaanK4B1KA>[] => MISI_A;
