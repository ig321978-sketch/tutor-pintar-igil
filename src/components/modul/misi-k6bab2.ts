/**
 * Misi dan tantangan bebas Kelas 6 Bab 2 (Rasio). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k6b2.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Konsep Rasio      : Lab Rasio (Tulis, Sederhana, Arah) + Mesin Rasio + Artus dan Lahan Bibit
 *  B Kesamaan Rasio    : Lab Senilai (Tabel, Jembatan, Satuan) + Mesin Senilai + Artus, Resep, dan Paket Bibit
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanRasioK6B2A } from "./lab-rasio-k6b2a";
import type { KeadaanSenilaiK6B2B } from "./lab-senilai-k6b2b";

export type KeadaanK6Bab2 = KeadaanRasioK6B2A | KeadaanSenilaiK6B2B | KeadaanSelesai;
export type HurufMisiK6B2 = "A" | "B";

const selesai = (k: KeadaanK6Bab2, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK6Bab2, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K6B2 = { A: "artus-bibit", B: "artus-paket" } as const;
export const ID_MESIN_K6B2 = { A: "mesin-rasio", B: "mesin-senilai" } as const;

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

export const MISI_B: DefMisi<KeadaanK6Bab2>[] = [
  { id: "b-tabel", teks: "Di Tabel, kalikan kedua suku sepuluh banding dua belas dengan lima sampai baris baru dan hasil sederhananya ketemu.", wajib: true, cek: (k) => pernah(k, "senilai", "tabel:0") },
  { id: "b-tabel-petak", teks: "Di Tabel, buat baris untuk lahan dua puluh lima meter persegi dari lima banding enam, lalu pilih pengali yang benar, bukan tambahan.", wajib: true, cek: (k) => pernah(k, "senilai", "tabel:1") },
  { id: "b-jembatan", teks: "Di Jembatan, cari pecahan yang senilai dengan sepuluh per dua belas, pilih pengalinya, lalu cek dengan perkalian silang.", wajib: true, cek: (k) => pernah(k, "senilai", "jembatan:0") },
  { id: "b-satuan", teks: "Di Satuan, cari harga satu bibit dari paket lima bibit, hitung target, lalu bandingkan dengan pembanding.", wajib: true, cek: (k) => pernah(k, "senilai", "satuan:0") },
  { id: "b-hemat", teks: "Di Satuan, hitung harga satu bibit pada paket A dan paket B, lalu tentukan mana yang lebih hemat dibanding pembandingnya.", wajib: true, cek: (k) => pernah(k, "senilai", "satuan:2", "satuan:3") },
  { id: "b-mesin", teks: "Selesaikan Mesin Senilai sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B2.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Artus, Resep, dan Paket Bibit sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B2.B) },
  { id: "b-tabel-semua", teks: "Di Tabel, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "senilai", ...semua("tabel")) },
  { id: "b-jembatan-semua", teks: "Di Jembatan, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "senilai", ...semua("jembatan")) },
  { id: "b-satuan-semua", teks: "Di Satuan, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "senilai", ...semua("satuan")) },
];

const DAFTAR: Record<HurufMisiK6B2, DefMisi<KeadaanK6Bab2>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK6Bab2 = (huruf: string): DefMisi<KeadaanK6Bab2>[] => DAFTAR[huruf as HurufMisiK6B2] ?? MISI_A;
