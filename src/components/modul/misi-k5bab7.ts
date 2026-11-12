/**
 * Misi dan tantangan bebas Kelas 5 Bab 7 (Membandingkan Ciri-Ciri Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b7.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Segitiga : Lab Segitiga (Sedotan, Sudut, Sisi) + Mesin Segitiga + Yohana di Candi Sewu
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanSegitigaK5B7A } from "./lab-segitiga-k5b7a";

export type KeadaanK5Bab7 = KeadaanSegitigaK5B7A | KeadaanSelesai;
export type HurufMisiK5B7 = "A";

const selesai = (k: KeadaanK5Bab7, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab7, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B7 = { A: "yohana-candi" } as const;
export const ID_MESIN_K5B7 = { A: "mesin-segitiga" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab7>[] = [
  { id: "a-bisa", teks: "Di Sedotan, uji sedotan 5, 6, dan 7: ketiga pasangan lolos, lalu pilih bisa jadi segitiga.", wajib: true, cek: (k) => pernah(k, "segitiga", "sedotan:0") },
  { id: "a-gagal", teks: "Di Sedotan, uji sedotan 5, 4, dan 12: ada pasangan yang gagal, lalu pilih tidak bisa.", wajib: true, cek: (k) => pernah(k, "segitiga", "sedotan:1") },
  { id: "a-lurus", teks: "Di Sedotan, uji sedotan 3, 4, dan 7: jumlah dua sisi sama dengan sisi ketiga, sedotan hanya jadi garis lurus, jadi tidak bisa.", wajib: true, cek: (k) => pernah(k, "segitiga", "sedotan:2") },
  { id: "a-sudut", teks: "Di Sudut, hitung sudut ketiga potongan kertas ketiga dan tentukan jenisnya. Lalu tolak potongan keempat, karena dua sudut siku-siku tidak menyisakan sudut ketiga.", wajib: true, cek: (k) => pernah(k, "segitiga", "sudut:2", "sudut:3") },
  { id: "a-sama-sisi", teks: "Di Sisi, impitkan sisi hiasan gapura 6, 6, 6 sampai ketiganya berimpit, tentukan jenisnya, lalu jawab apakah juga sama kaki.", wajib: true, cek: (k) => pernah(k, "segitiga", "sisi:1", "hier:1") },
  { id: "a-mesin", teks: "Selesaikan Mesin Segitiga sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B7.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Yohana di Candi Sewu sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B7.A) },
  { id: "a-sedotan-semua", teks: "Di Sedotan, uji keenam sedotan sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "segitiga", "sedotan:0", "sedotan:1", "sedotan:2", "sedotan:3", "sedotan:4", "sedotan:5") },
  { id: "a-sudut-semua", teks: "Di Sudut, hitung sudut ketiga keenam potongan kertas sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "segitiga", "sudut:0", "sudut:1", "sudut:2", "sudut:3", "sudut:4", "sudut:5") },
  { id: "a-hier-semua", teks: "Di Sisi, tentukan jenis dan jawab pertanyaan hierarki untuk keenam hiasan.", wajib: false, cek: (k) => pernah(k, "segitiga", "hier:0", "hier:1", "hier:2", "hier:3", "hier:4", "hier:5") },
];

const DAFTAR: Record<HurufMisiK5B7, DefMisi<KeadaanK5Bab7>[]> = { A: MISI_A };
export const daftarMisiK5Bab7 = (huruf: string): DefMisi<KeadaanK5Bab7>[] => DAFTAR[huruf as HurufMisiK5B7] ?? MISI_A;
