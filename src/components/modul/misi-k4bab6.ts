/**
 * Misi dan tantangan bebas Kelas 4 Bab 6 (Piktogram dan Diagram Batang). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b6.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Piktogram : Lab Piktogram (Turus, Susun, Baca)     + Mesin Piktogram + Turus Kelas Karel
 *  B Batang    : Lab Batang (Bangun, Label, Banding)    + Mesin Batang    + Pameran Data Azizah (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPiktoK4B6A } from "./lab-piktogram-k4b6a";
import type { KeadaanBatangK4B6B } from "./lab-batang-k4b6b";

export type KeadaanK4Bab6 = KeadaanPiktoK4B6A | KeadaanBatangK4B6B | KeadaanSelesai;
export type HurufMisiK4B6 = "A" | "B";

const selesai = (k: KeadaanK4Bab6, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab6, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B6 = { A: "turus-karel", B: "pameran-azizah" } as const;
export const ID_MESIN_K4B6 = { A: "mesin-piktogram", B: "mesin-batang" } as const;

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

export const MISI_B: DefMisi<KeadaanK4Bab6>[] = [
  { id: "b-transport", teks: "Di Bangun, buat diagram batang alat transportasi dengan langkah sumbu 1, lalu periksa.", wajib: true, cek: (k) => pernah(k, "batang", "bangun:transport:1") },
  { id: "b-kelas", teks: "Di Bangun, buat diagram batang siswa per kelas dengan langkah sumbu 4, lalu periksa.", wajib: true, cek: (k) => pernah(k, "batang", "bangun:kelas:4") },
  { id: "b-label", teks: "Di Label, lengkapi judul dan kedua label sumbu diagram alat transportasi yang tegak.", wajib: true, cek: (k) => pernah(k, "batang", "label:transport:tegak") },
  { id: "b-mendatar", teks: "Di Label, ubah diagram buku dipinjam menjadi mendatar dan pasang labelnya dengan benar.", wajib: true, cek: (k) => pernah(k, "batang", "label:buku:mendatar") },
  { id: "b-selisih", teks: "Di Banding, pilih batang Rabu dan Sabtu, lalu hitung selisih buku yang dipinjam.", wajib: true, cek: (k) => pernah(k, "batang", "banding:buku:selisih:rab-sab") },
  { id: "b-mesin", teks: "Selesaikan Mesin Batang sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B6.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Pameran Data Azizah sampai adegan akhir. Ini misi penutup bab.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B6.B) },
  { id: "b-lupa", teks: "Di Banding, coba pilih banyak garisnya saja tanpa langkah sumbu. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "batang", "lupa-skala") },
  { id: "b-total", teks: "Di Banding, hitung banyak siswa semuanya pada diagram alat transportasi.", wajib: false, cek: (k) => pernah(k, "batang", "banding:transport:jumlah") },
  { id: "b-terkecil", teks: "Di Bangun, buat diagram buku dipinjam dengan langkah sumbu terkecil yang memuat semua batang.", wajib: false, cek: (k) => pernah(k, "batang", "bangun:buku:2") },
];

const DAFTAR: Record<HurufMisiK4B6, DefMisi<KeadaanK4Bab6>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK4Bab6 = (huruf: string): DefMisi<KeadaanK4Bab6>[] => DAFTAR[huruf as HurufMisiK4B6] ?? MISI_A;
