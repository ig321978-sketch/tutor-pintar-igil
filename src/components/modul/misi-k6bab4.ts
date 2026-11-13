/**
 * Misi dan tantangan bebas Kelas 6 Bab 4 (Peluang). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k6b4.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Skala Peluang : Lab Skala (Tangga, Ujung, Percobaan) + Mesin Skala + Dhien dan Poster Lomba
 *  B Membandingkan Peluang : Lab Banding (Rasio, Banding, Adil) + Mesin Banding + Dhien dan Kotak Hadiah
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanSkalaK6B4A } from "./lab-skala-k6b4a";
import type { KeadaanBandingK6B4B } from "./lab-banding-k6b4b";

export type KeadaanK6Bab4 = KeadaanSkalaK6B4A | KeadaanBandingK6B4B | KeadaanSelesai;
export type HurufMisiK6B4 = "A" | "B";

const selesai = (k: KeadaanK6Bab4, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK6Bab4, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K6B4 = { A: "dhien-poster", B: "dhien-hadiah" } as const;
export const ID_MESIN_K6B4 = { A: "mesin-skala", B: "mesin-banding" } as const;

export const MISI_A: DefMisi<KeadaanK6Bab4>[] = [
  { id: "a-tangga-merah", teks: "Di Tangga, hitung buku merah dan semua buku di rak Dhien, lalu tempatkan buku merah di tangga peluang.", wajib: true, cek: (k) => pernah(k, "skala", "tangga:0") },
  { id: "a-tangga-nol", teks: "Di Tangga, hitung buku hijau di rak Dhien, lalu tempatkan di ujung kiri tangga.", wajib: true, cek: (k) => pernah(k, "skala", "tangga:2") },
  { id: "a-tangga-pasti", teks: "Di Tangga, tempatkan dadu yang semua sisinya angka lima di ujung kanan tangga.", wajib: true, cek: (k) => pernah(k, "skala", "tangga:3") },
  { id: "a-ujung-pasti", teks: "Di Ujung, tempatkan tas pesta di tangga, lalu cari bola yang diganti agar merah pasti dan agar merah tidak mungkin.", wajib: true, cek: (k) => pernah(k, "skala", "ujung:0") },
  { id: "a-percobaan-roda", teks: "Di Percobaan, buat prediksi dari roda merah, hitung catatan putaran, lalu cocokkan catatan dengan prediksi.", wajib: true, cek: (k) => pernah(k, "skala", "percobaan:0") },
  { id: "a-mesin", teks: "Selesaikan Mesin Skala sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B4.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Dhien dan Poster Lomba sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B4.A) },
  { id: "a-tangga-semua", teks: "Di Tangga, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "skala", ...semua("tangga")) },
  { id: "a-ujung-semua", teks: "Di Ujung, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "skala", ...semua("ujung")) },
  { id: "a-percobaan-semua", teks: "Di Percobaan, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "skala", ...semua("percobaan")) },
];

export const MISI_B: DefMisi<KeadaanK6Bab4>[] = [
  { id: "b-rasio-mantap", teks: "Di Rasio, hitung hasil menguntungkan, semua hasil, dan hasil yang tidak menguntungkan pada kotak hadiah Mantap.", wajib: true, cek: (k) => pernah(k, "banding", "rasio:2") },
  { id: "b-banding-koin", teks: "Di Banding, samakan total koin dan dadu, lalu pilih yang lebih mungkin.", wajib: true, cek: (k) => pernah(k, "banding", "banding:0") },
  { id: "b-banding-hadiah", teks: "Di Banding, samakan total kotak Spektakuler dan kotak Mantap, lalu pilih kotak yang lebih mungkin memberi piring biru.", wajib: true, cek: (k) => pernah(k, "banding", "banding:1") },
  { id: "b-adil-sama", teks: "Di Adil, hitung hasil menang dua pemain pada dadu, lalu nilai permainan yang adil.", wajib: true, cek: (k) => pernah(k, "banding", "adil:0") },
  { id: "b-adil-beda", teks: "Di Adil, hitung hasil menang pemain yang hanya punya satu hasil, lalu nilai permainan yang kurang adil.", wajib: true, cek: (k) => pernah(k, "banding", "adil:1") },
  { id: "b-mesin", teks: "Selesaikan Mesin Banding sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B4.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Dhien dan Kotak Hadiah sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B4.B) },
  { id: "b-rasio-semua", teks: "Di Rasio, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "banding", ...semua("rasio")) },
  { id: "b-banding-semua", teks: "Di Banding, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "banding", ...semua("banding")) },
  { id: "b-adil-semua", teks: "Di Adil, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "banding", ...semua("adil")) },
];

const DAFTAR: Record<HurufMisiK6B4, DefMisi<KeadaanK6Bab4>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK6Bab4 = (huruf: string): DefMisi<KeadaanK6Bab4>[] => DAFTAR[huruf as HurufMisiK6B4] ?? MISI_A;
