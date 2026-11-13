/**
 * Misi dan tantangan bebas Kelas 6 Bab 3 (Kubus dan Balok). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k6b3.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Mengonstruksi dan Mengurai : Lab Susunan (Susun, Lapisan, Penyangga) + Mesin Susunan + Tigor dan Tenri Susun Rumah Kubus
 *  B Visualisasi Spasial        : Lab Tampak (Matriks, Tampak, Atas) + Mesin Tampak + Anike Menggambar Tiga Arah
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanSusunanK6B3A } from "./lab-susunan-k6b3a";
import type { KeadaanTampakK6B3B } from "./lab-tampak-k6b3b";

export type KeadaanK6Bab3 = KeadaanSusunanK6B3A | KeadaanTampakK6B3B | KeadaanSelesai;
export type HurufMisiK6B3 = "A" | "B";

const selesai = (k: KeadaanK6Bab3, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK6Bab3, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K6B3 = { A: "tigor-rumah", B: "anike-tampak" } as const;
export const ID_MESIN_K6B3 = { A: "mesin-susunan", B: "mesin-tampak" } as const;

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

export const MISI_B: DefMisi<KeadaanK6Bab3>[] = [
  { id: "b-matriks", teks: "Di Matriks, catat tinggi baris depan dan baris belakang susunan dua kali dua dari contoh Anike, lalu hitung seluruh kubusnya.", wajib: true, cek: (k) => pernah(k, "tampak", "matriks:0") },
  { id: "b-depan", teks: "Di Tampak, ambil tinggi terbesar tiap kolom dari depan, lalu jumlahkan menjadi tampak depan.", wajib: true, cek: (k) => pernah(k, "tampak", "tampak:0") },
  { id: "b-samping", teks: "Di Tampak, ambil tinggi terbesar tiap baris dari samping, lalu jumlahkan menjadi tampak samping.", wajib: true, cek: (k) => pernah(k, "tampak", "tampak:3") },
  { id: "b-atas", teks: "Di Atas, hitung petak terisi dari atas untuk empat kubus yang ditumpuk, lalu bandingkan dengan seluruh kubusnya.", wajib: true, cek: (k) => pernah(k, "tampak", "atas:0") },
  { id: "b-rekonstruksi", teks: "Di Atas, pilih susunan yang cocok dengan ketiga tampak dari contoh Anike, bukan yang hanya cocok pada dua tampak.", wajib: true, cek: (k) => pernah(k, "tampak", "atas:3") },
  { id: "b-mesin", teks: "Selesaikan Mesin Tampak sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B3.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Anike Menggambar Tiga Arah sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B3.B) },
  { id: "b-matriks-semua", teks: "Di Matriks, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "tampak", ...semua("matriks")) },
  { id: "b-tampak-semua", teks: "Di Tampak, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "tampak", ...semua("tampak")) },
  { id: "b-atas-semua", teks: "Di Atas, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "tampak", ...semua("atas")) },
];

const DAFTAR: Record<HurufMisiK6B3, DefMisi<KeadaanK6Bab3>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK6Bab3 = (huruf: string): DefMisi<KeadaanK6Bab3>[] => DAFTAR[huruf as HurufMisiK6B3] ?? MISI_A;
