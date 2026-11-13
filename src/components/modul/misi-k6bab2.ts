/**
 * Misi dan tantangan bebas Kelas 6 Bab 2 (Rasio). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k6b2.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Konsep Rasio      : Lab Rasio (Tulis, Sederhana, Arah) + Mesin Rasio + Artus dan Lahan Bibit
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanRasioK6B2A } from "./lab-rasio-k6b2a";

export type KeadaanK6Bab2 = KeadaanRasioK6B2A | KeadaanSelesai;
export type HurufMisiK6B2 = "A";

const selesai = (k: KeadaanK6Bab2, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK6Bab2, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K6B2 = { A: "artus-bibit" } as const;
export const ID_MESIN_K6B2 = { A: "mesin-rasio" } as const;

export const MISI_A: DefMisi<KeadaanK6Bab2>[] = [
  { id: "a-tulis", teks: "Di Tulis, hitung empat pucuk merah dan enam cemara, tulis rasionya, lalu pilih kalimat setiap empat pucuk merah ada enam cemara.", wajib: true, cek: (k) => pernah(k, "rasio", "tulis:0") },
  { id: "a-tulis-kecil", teks: "Di Tulis, hitung kebun kecil berisi dua pucuk merah dan tiga cemara sampai rasio dan kalimat bacaannya benar.", wajib: true, cek: (k) => pernah(k, "rasio", "tulis:1") },
  { id: "a-sederhana", teks: "Di Sederhana, pilih FPB empat dan enam, lalu bagi kedua suku sampai rasionya paling sederhana.", wajib: true, cek: (k) => pernah(k, "rasio", "sederhana:0") },
  { id: "a-sederhana-sembilan", teks: "Di Sederhana, sederhanakan enam banding sembilan dengan membagi kedua suku memakai FPB.", wajib: true, cek: (k) => pernah(k, "rasio", "sederhana:1") },
  { id: "a-arah", teks: "Di Arah, tulis rasio pucuk merah terhadap cemara, balik urutannya, lalu jelaskan mengapa maknanya berbeda.", wajib: true, cek: (k) => pernah(k, "rasio", "arah:0") },
  { id: "a-mesin", teks: "Selesaikan Mesin Rasio sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B2.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Artus dan Lahan Bibit sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B2.A) },
  { id: "a-tulis-semua", teks: "Di Tulis, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "rasio", ...semua("tulis")) },
  { id: "a-sederhana-semua", teks: "Di Sederhana, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "rasio", ...semua("sederhana")) },
  { id: "a-arah-semua", teks: "Di Arah, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "rasio", ...semua("arah")) },
];

const DAFTAR: Record<HurufMisiK6B2, DefMisi<KeadaanK6Bab2>[]> = { A: MISI_A };
export const daftarMisiK6Bab2 = (huruf: string): DefMisi<KeadaanK6Bab2>[] => DAFTAR[huruf as HurufMisiK6B2] ?? MISI_A;
