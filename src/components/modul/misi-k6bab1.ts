/**
 * Misi dan tantangan bebas Kelas 6 Bab 1 (Pecahan dan Desimal). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k6b1.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Perkalian Pecahan : Lab Kali Pecahan (Luas, Panah, Tukar) + Mesin Kali Pecahan + Agam dan Kebun Ayah
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKaliK6B1A } from "./lab-kali-k6b1a";

export type KeadaanK6Bab1 = KeadaanKaliK6B1A | KeadaanSelesai;
export type HurufMisiK6B1 = "A";

const selesai = (k: KeadaanK6Bab1, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK6Bab1, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K6B1 = { A: "agam-kebun" } as const;
export const ID_MESIN_K6B1 = { A: "mesin-kali" } as const;

export const MISI_A: DefMisi<KeadaanK6Bab1>[] = [
  { id: "a-luas", teks: "Di Luas, pakai dua ember kecil pada petak berisi lima kotak sampai hasil dua kali tiga per lima ketemu.", wajib: true, cek: (k) => pernah(k, "kali", "luas:0") },
  { id: "a-luas-utuh", teks: "Di Luas, pakai lima ember penuh sampai hasilnya menjadi petak utuh.", wajib: true, cek: (k) => pernah(k, "kali", "luas:1") },
  { id: "a-panah", teks: "Di Panah, tulis bilangan asli sebagai pecahan berpenyebut satu, lalu panah lurus pada dua kali tiga per lima sampai hasilnya ketemu.", wajib: true, cek: (k) => pernah(k, "kali", "panah:0") },
  { id: "a-panah-lebih", teks: "Di Panah, kalikan empat dengan dua per lima sampai hasilnya yang lebih dari satu ketemu.", wajib: true, cek: (k) => pernah(k, "kali", "panah:1") },
  { id: "a-tukar", teks: "Di Tukar, hitung dua per tiga kali lima belas, sederhanakan, lalu balik urutannya dan cek hasilnya sama.", wajib: true, cek: (k) => pernah(k, "kali", "tukar:0") },
  { id: "a-mesin", teks: "Selesaikan Mesin Kali Pecahan sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B1.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Agam dan Kebun Ayah sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B1.A) },
  { id: "a-luas-semua", teks: "Di Luas, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "kali", ...semua("luas")) },
  { id: "a-panah-semua", teks: "Di Panah, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "kali", ...semua("panah")) },
  { id: "a-tukar-semua", teks: "Di Tukar, selesaikan keenam soal dan cek urutannya sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "kali", ...semua("tukar")) },
];

const DAFTAR: Record<HurufMisiK6B1, DefMisi<KeadaanK6Bab1>[]> = { A: MISI_A };
export const daftarMisiK6Bab1 = (huruf: string): DefMisi<KeadaanK6Bab1>[] => DAFTAR[huruf as HurufMisiK6B1] ?? MISI_A;
