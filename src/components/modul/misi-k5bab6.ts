/**
 * Misi dan tantangan bebas Kelas 5 Bab 6 (Sudut). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b6.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Pojok : Lab Pojok (Lipat, Banding, Detektif) + Mesin Pojok + Bingkai Pak Tukang
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPojokK5B6A } from "./lab-pojok-k5b6a";

export type KeadaanK5Bab6 = KeadaanPojokK5B6A | KeadaanSelesai;
export type HurufMisiK5B6 = "A";

const selesai = (k: KeadaanK5Bab6, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab6, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B6 = { A: "tukang-bingkai" } as const;
export const ID_MESIN_K5B6 = { A: "mesin-pojok" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab6>[] = [
  { id: "a-lipat", teks: "Di Lipat, lipat kertas dua kali sampai lipatan kedua menimpa lipatan pertama dengan rapi. Pojoknya menjadi patokan siku-siku.", wajib: true, cek: (k) => pernah(k, "pojok", "lipat:0") },
  { id: "a-banding-siku", teks: "Di Banding, tempelkan patokan ke pojok buku, pojok bingkai foto, dan pojok ubin lantai. Pilih siku-siku untuk ketiganya.", wajib: true, cek: (k) => pernah(k, "pojok", "banding:0", "banding:1", "banding:2") },
  { id: "a-banding-lancip", teks: "Di Banding, tempelkan patokan ke ujung gunting yang terbuka, lalu pilih lebih sempit dari patokan, yaitu lancip.", wajib: true, cek: (k) => pernah(k, "pojok", "banding:3") },
  { id: "a-banding-tumpul", teks: "Di Banding, tempelkan patokan ke bukaan kipas lipat, lalu pilih lebih lebar dari patokan, yaitu tumpul.", wajib: true, cek: (k) => pernah(k, "pojok", "banding:4") },
  { id: "a-detektif", teks: "Di Detektif, periksa keenam pojok benda dengan patokan, lalu pilah mana yang siku-siku dan mana yang bukan.", wajib: true, cek: (k) => pernah(k, "pojok", "detektif:0", "detektif:1", "detektif:2", "detektif:3", "detektif:4", "detektif:5") },
  { id: "a-mesin", teks: "Selesaikan Mesin Pojok sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B6.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Bingkai Pak Tukang sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B6.A) },
  { id: "a-lipat-koran", teks: "Di Lipat, buat patokan siku-siku sekali lagi dari kertas koran.", wajib: false, cek: (k) => pernah(k, "pojok", "lipat:1") },
  { id: "a-banding-atap", teks: "Di Banding, tempelkan patokan ke pojok atap rumah, lalu pilih jenisnya.", wajib: false, cek: (k) => pernah(k, "pojok", "banding:5") },
  { id: "a-banding-semua", teks: "Di Banding, bandingkan keenam pojok benda dengan patokan sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "pojok", "banding:0", "banding:1", "banding:2", "banding:3", "banding:4", "banding:5") },
];

const DAFTAR: Record<HurufMisiK5B6, DefMisi<KeadaanK5Bab6>[]> = { A: MISI_A };
export const daftarMisiK5Bab6 = (huruf: string): DefMisi<KeadaanK5Bab6>[] => DAFTAR[huruf as HurufMisiK5B6] ?? MISI_A;
