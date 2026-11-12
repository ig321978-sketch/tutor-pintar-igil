/**
 * Misi dan tantangan bebas Kelas 5 Bab 9 (Bilangan Cacah sampai 1.000.000). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b9.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Baca, tulis, nilai tempat : Lab Nilai Tempat (Baca, Tabel, Nilai) + Mesin Nilai Tempat + Nisa dan Lemari Jepara
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanNilaiK5B9A } from "./lab-nilai-k5b9a";

export type KeadaanK5Bab9 = KeadaanNilaiK5B9A | KeadaanSelesai;
export type HurufMisiK5B9 = "A";

const selesai = (k: KeadaanK5Bab9, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab9, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B9 = { A: "nisa-lemari" } as const;
export const ID_MESIN_K5B9 = { A: "mesin-nilai" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab9>[] = [
  { id: "a-baca", teks: "Di Baca, baca harga lemari 979.875 dari kiri: kelompok sebelum titik dengan kata ribu, lalu kelompok sesudahnya.", wajib: true, cek: (k) => pernah(k, "nilai", "baca:0") },
  { id: "a-baca-nol", teks: "Di Baca, baca harga sepeda motor 500.040 yang punya nol di tengah, tanpa mengucapkan nolnya.", wajib: true, cek: (k) => pernah(k, "nilai", "baca:2") },
  { id: "a-tabel", teks: "Di Tabel, tulis bilangan dalam kata ke enam kolom tempat sampai benar, dengan nol yang ikut ditulis.", wajib: true, cek: (k) => pernah(k, "nilai", "tabel:0") },
  { id: "a-salah", teks: "Di Tabel, temukan kolom yang tertukar pada tabel temanmu dengan mencocokkannya dengan kata bilangannya.", wajib: true, cek: (k) => pernah(k, "nilai", "tabel:0", "salah:0") },
  { id: "a-nilai", teks: "Di Nilai, tentukan nilai angka 9 di ratus ribuan pada 979.875, lalu ubah 999.999 menjadi satu juta dengan menambah 1.", wajib: true, cek: (k) => pernah(k, "nilai", "nilai:0", "juta") },
  { id: "a-mesin", teks: "Selesaikan Mesin Nilai Tempat sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B9.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Nisa dan Lemari Jepara sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B9.A) },
  { id: "a-baca-semua", teks: "Di Baca, baca keenam bilangan sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "nilai", ...semua("baca")) },
  { id: "a-tabel-semua", teks: "Di Tabel, isi tabel keenam bilangan dan temukan kolom yang salah pada tabel keenam teman.", wajib: false, cek: (k) => pernah(k, "nilai", ...semua("tabel"), ...semua("salah")) },
  { id: "a-nilai-semua", teks: "Di Nilai, tentukan tempat dan nilai angka untuk keenam bilangan.", wajib: false, cek: (k) => pernah(k, "nilai", ...semua("nilai")) },
];

const DAFTAR: Record<HurufMisiK5B9, DefMisi<KeadaanK5Bab9>[]> = { A: MISI_A };
export const daftarMisiK5Bab9 = (huruf: string): DefMisi<KeadaanK5Bab9>[] => DAFTAR[huruf as HurufMisiK5B9] ?? MISI_A;
