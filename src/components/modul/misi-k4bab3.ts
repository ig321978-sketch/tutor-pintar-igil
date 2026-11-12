/**
 * Misi dan tantangan bebas Kelas 4 Bab 3 (Pola Gambar dan Pola Bilangan). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b3.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Pola gambar   : Lab Pola Gambar (Lanjut, Tabel, Buat)      + Mesin Pola Gambar   + Jeruk dan Permen Dina
 *  B Pola bilangan : Lab Pola Bilangan (Selisih, Aturan, Tabel) + Mesin Pola Bilangan + Pameran Pola Kelas 4 (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPolaGambarK4B3A } from "./lab-pola-gambar-k4b3a";
import type { KeadaanPolaBilanganK4B3B } from "./lab-pola-bilangan-k4b3b";

export type KeadaanK4Bab3 = KeadaanPolaGambarK4B3A | KeadaanPolaBilanganK4B3B | KeadaanSelesai;
export type HurufMisiK4B3 = "A" | "B";

const selesai = (k: KeadaanK4Bab3, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab3, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
/** Riwayat alat tertentu memuat id berawalan tertentu. */
const pernahAwalan = (k: KeadaanK4Bab3, alat: string, awalan: string) => k.alat === alat && "pernah" in k && k.pernah.some((p) => p.startsWith(awalan));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B3 = { A: "jeruk-permen", B: "pameran-pola" } as const;
export const ID_MESIN_K4B3 = { A: "mesin-pola-gambar", B: "mesin-pola-bilangan" } as const;

export const MISI_A: DefMisi<KeadaanK4Bab3>[] = [
  { id: "a-jeruk", teks: "Di Lanjut, pilih jeruk 2, 4, 6 dan susun titik kumpulan berikutnya.", wajib: true, cek: (k) => pernah(k, "pola-gambar", "lanjut:jeruk") },
  { id: "a-permen", teks: "Di Lanjut, pilih permen 9, 7, 5 dan susun titik kumpulan berikutnya.", wajib: true, cek: (k) => pernah(k, "pola-gambar", "lanjut:permen") },
  { id: "a-tabel-jeruk", teks: "Di Tabel, isi tabel selisih jeruk sampai kumpulan ke-7. Berapa jeruknya?", wajib: true, cek: (k) => pernah(k, "pola-gambar", "tabel:jeruk:7") },
  { id: "a-tabel-permen", teks: "Di Tabel, isi tabel selisih permen sampai kumpulan ke-5.", wajib: true, cek: (k) => pernah(k, "pola-gambar", "tabel:permen:5") },
  { id: "a-buat", teks: "Di Buat, buat pola membesar dengan selisih +3, lalu buat satu pola mengecil.", wajib: true, cek: (k) => pernah(k, "pola-gambar", "buat:membesar:3") && pernahAwalan(k, "pola-gambar", "buat:mengecil:") },
  { id: "a-mesin", teks: "Selesaikan Mesin Pola Gambar sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B3.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Jeruk dan Permen Dina sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B3.A) },
  { id: "a-tetap", teks: "Di Buat, atur selisih 0 lalu periksa. Apakah polanya membesar atau mengecil?", wajib: false, cek: (k) => pernah(k, "pola-gambar", "buat:tetap") },
  { id: "a-habis", teks: "Di Tabel, lanjutkan permen setelah kumpulan berisi 1. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "pola-gambar", "habis:permen") },
  { id: "a-bintang", teks: "Di Lanjut, pilih bintang 12, 9, 6 dan susun kumpulan berikutnya.", wajib: false, cek: (k) => pernah(k, "pola-gambar", "lanjut:bintang") },
];

export const MISI_B: DefMisi<KeadaanK4Bab3>[] = [
  { id: "b-tiga", teks: "Di Selisih, ketuk semua pasangan 1, 4, 7, 10 lalu tetapkan bedanya.", wajib: true, cek: (k) => pernah(k, "pola-bilangan", "beda:tiga") },
  { id: "b-lima", teks: "Di Selisih, temukan beda pola mengecil 23, 18, 13, 8.", wajib: true, cek: (k) => pernah(k, "pola-bilangan", "beda:lima") },
  { id: "b-tanda", teks: "Coba tetapkan beda dengan tanda terbalik (tambah untuk pola mengecil). Baca penjelasan lab.", wajib: true, cek: (k) => pernah(k, "pola-bilangan", "tanda-salah") },
  { id: "b-telur", teks: "Di Aturan, pilih telur peternak, pasang aturan yang cocok, dan jalankan sampai hari ke-5.", wajib: true, cek: (k) => pernah(k, "pola-bilangan", "aturan:telur:5") },
  { id: "b-rak", teks: "Di Tabel, isi tabel nilai rak buku sampai rak ke-5.", wajib: true, cek: (k) => pernah(k, "pola-bilangan", "nilai:rak:5") },
  { id: "b-mesin", teks: "Selesaikan Mesin Pola Bilangan sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B3.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Pameran Pola Kelas 4 sampai adegan akhir. Ini misi penutup bab.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B3.B) },
  { id: "b-tv", teks: "Di Aturan, jalankan produksi TV sampai bulan ke-6 (Juni).", wajib: false, cek: (k) => pernah(k, "pola-bilangan", "aturan:tv:6") },
  { id: "b-kursi", teks: "Di Tabel, isi tabel nilai kursi gedung sampai baris ke-5.", wajib: false, cek: (k) => pernah(k, "pola-bilangan", "nilai:kursi:5") },
  { id: "b-dua-belas", teks: "Di Selisih, temukan beda pola 7, 19, 31, 43.", wajib: false, cek: (k) => pernah(k, "pola-bilangan", "beda:dua-belas") },
];

const DAFTAR: Record<HurufMisiK4B3, DefMisi<KeadaanK4Bab3>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK4Bab3 = (huruf: string): DefMisi<KeadaanK4Bab3>[] => DAFTAR[huruf as HurufMisiK4B3] ?? MISI_A;
