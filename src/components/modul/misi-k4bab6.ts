/**
 * Misi dan tantangan bebas Kelas 4 Bab 6 (Piktogram dan Diagram Batang). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b6.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Piktogram : Lab Piktogram (Turus, Susun, Baca) + Mesin Piktogram + Turus Kelas Karel
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPiktoK4B6A } from "./lab-piktogram-k4b6a";

export type KeadaanK4Bab6 = KeadaanPiktoK4B6A | KeadaanSelesai;
export type HurufMisiK4B6 = "A";

const selesai = (k: KeadaanK4Bab6, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab6, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B6 = { A: "turus-karel" } as const;
export const ID_MESIN_K4B6 = { A: "mesin-piktogram" } as const;

export const MISI_A: DefMisi<KeadaanK4Bab6>[] = [
  { id: "a-turus", teks: "Di Turus, catat semua mainan Karel dengan turus tanpa salah, lalu periksa.", wajib: true, cek: (k) => pernah(k, "piktogram", "turus:mainan") },
  { id: "a-warna", teks: "Di Susun, buat piktogram warna kesukaan dengan keterangan 1 simbol = 1 siswa.", wajib: true, cek: (k) => pernah(k, "piktogram", "susun:warna:1") },
  { id: "a-kelas", teks: "Di Susun, buat piktogram siswa per kelas dengan keterangan 1 simbol = 4 siswa.", wajib: true, cek: (k) => pernah(k, "piktogram", "susun:kelas:4") },
  { id: "a-nilai", teks: "Di Baca, tentukan kelas yang siswanya paling banyak dan berapa siswanya.", wajib: true, cek: (k) => pernah(k, "piktogram", "baca:kelas:terbanyak", "baca:kelas:nilai") },
  { id: "a-selisih", teks: "Di Baca, hitung selisih siswa kelas terbanyak dan tersedikit.", wajib: true, cek: (k) => pernah(k, "piktogram", "baca:kelas:selisih") },
  { id: "a-mesin", teks: "Selesaikan Mesin Piktogram sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B6.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Turus Kelas Karel sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B6.A) },
  { id: "a-lupa", teks: "Di Baca, coba pilih banyak simbolnya saja tanpa skala. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "piktogram", "lupa-skala") },
  { id: "a-utuh", teks: "Di Susun, coba buku dipinjam dengan 1 simbol = 4 buku, lalu buat piktogramnya dengan 1 simbol = 2 buku.", wajib: false, cek: (k) => pernah(k, "piktogram", "tak-utuh", "susun:buku:2") },
  { id: "a-total", teks: "Di Baca, hitung banyak siswa semuanya pada piktogram warna kesukaan.", wajib: false, cek: (k) => pernah(k, "piktogram", "baca:warna:total") },
];

const DAFTAR: Record<HurufMisiK4B6, DefMisi<KeadaanK4Bab6>[]> = { A: MISI_A };
export const daftarMisiK4Bab6 = (huruf: string): DefMisi<KeadaanK4Bab6>[] => DAFTAR[huruf as HurufMisiK4B6] ?? MISI_A;
