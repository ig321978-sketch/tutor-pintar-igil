/**
 * Misi dan tantangan bebas Kelas 6 Bab 3 (Kubus dan Balok). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k6b3.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Mengonstruksi dan Mengurai : Lab Susunan (Susun, Lapisan, Penyangga) + Mesin Susunan + Tigor dan Tenri Susun Rumah Kubus
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanSusunanK6B3A } from "./lab-susunan-k6b3a";

export type KeadaanK6Bab3 = KeadaanSusunanK6B3A | KeadaanSelesai;
export type HurufMisiK6B3 = "A";

const selesai = (k: KeadaanK6Bab3, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK6Bab3, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K6B3 = { A: "tigor-rumah" } as const;
export const ID_MESIN_K6B3 = { A: "mesin-susunan" } as const;

export const MISI_A: DefMisi<KeadaanK6Bab3>[] = [
  { id: "a-susun-l", teks: "Di Susun, hitung semua kubus bentuk L, cari kubus yang kurang untuk kubus besar, lalu urai lantai teratasnya.", wajib: true, cek: (k) => pernah(k, "susunan", "susun:1") },
  { id: "a-lapisan-kecil", teks: "Di Lapisan, hitung kubus satu lantai dan seluruh kubus pada kubus kecil dua kali dua kali dua, lalu sisa bila satu lantai dilepas.", wajib: true, cek: (k) => pernah(k, "susunan", "lapisan:0") },
  { id: "a-lapisan-balok", teks: "Di Lapisan, hitung seluruh kubus balok kardus lima kali tiga kali dua, mulai dari lantai dasar.", wajib: true, cek: (k) => pernah(k, "susunan", "lapisan:2") },
  { id: "a-penyangga-sah", teks: "Di Penyangga, periksa dua kubus yang bertumpu, putuskan susunan itu sah, lalu hitung seluruh kubusnya.", wajib: true, cek: (k) => pernah(k, "susunan", "penyangga:0") },
  { id: "a-penyangga-melayang", teks: "Di Penyangga, temukan kubus yang melayang, tambah penyangga di lantai dasar, lalu hitung seluruh kubusnya.", wajib: true, cek: (k) => pernah(k, "susunan", "penyangga:1") },
  { id: "a-mesin", teks: "Selesaikan Mesin Susunan sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B3.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Tigor dan Tenri Susun Rumah Kubus sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B3.A) },
  { id: "a-susun-semua", teks: "Di Susun, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "susunan", ...semua("susun")) },
  { id: "a-lapisan-semua", teks: "Di Lapisan, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "susunan", ...semua("lapisan")) },
  { id: "a-penyangga-semua", teks: "Di Penyangga, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "susunan", ...semua("penyangga")) },
];

const DAFTAR: Record<HurufMisiK6B3, DefMisi<KeadaanK6Bab3>[]> = { A: MISI_A };
export const daftarMisiK6Bab3 = (huruf: string): DefMisi<KeadaanK6Bab3>[] => DAFTAR[huruf as HurufMisiK6B3] ?? MISI_A;
