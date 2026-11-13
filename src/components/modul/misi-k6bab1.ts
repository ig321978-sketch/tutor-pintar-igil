/**
 * Misi dan tantangan bebas Kelas 6 Bab 1 (Pecahan dan Desimal). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k6b1.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Perkalian Pecahan : Lab Kali Pecahan (Luas, Panah, Tukar) + Mesin Kali Pecahan + Agam dan Kebun Ayah
 *  B Pembagian Pecahan : Lab Bagi Pecahan (Potong, Silang, Muat) + Mesin Bagi Pecahan + Agam, Gelas, dan Sirup
 *  C Bilangan Desimal  : Lab Desimal (Ubah, Tempat, Urut) + Mesin Desimal + Agam, Timbangan, dan Lompat Jauh
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKaliK6B1A } from "./lab-kali-k6b1a";
import type { KeadaanBagiK6B1B } from "./lab-bagi-k6b1b";
import type { KeadaanDesK6B1C } from "./lab-desimal-k6b1c";

export type KeadaanK6Bab1 = KeadaanKaliK6B1A | KeadaanBagiK6B1B | KeadaanDesK6B1C | KeadaanSelesai;
export type HurufMisiK6B1 = "A" | "B" | "C";

const selesai = (k: KeadaanK6Bab1, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK6Bab1, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K6B1 = { A: "agam-kebun", B: "agam-sirup", C: "agam-timbangan" } as const;
export const ID_MESIN_K6B1 = { A: "mesin-kali", B: "mesin-bagi", C: "mesin-desimal" } as const;

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

export const MISI_B: DefMisi<KeadaanK6Bab1>[] = [
  { id: "b-potong", teks: "Di Potong, potong setengah menjadi tiga bagian sama sampai hasil setengah dibagi tiga ketemu.", wajib: true, cek: (k) => pernah(k, "bagi", "potong:0") },
  { id: "b-silang", teks: "Di Silang, balik pembagi tiga, lalu panah silang pada setengah dibagi tiga sampai hasilnya ketemu.", wajib: true, cek: (k) => pernah(k, "bagi", "silang:0") },
  { id: "b-silang-asli", teks: "Di Silang, bagilah enam dengan tiga perempat: balik, kalikan, lalu sederhanakan hasilnya.", wajib: true, cek: (k) => pernah(k, "bagi", "silang:2") },
  { id: "b-muat", teks: "Di Muat, bagilah tiga dengan seperempat sampai hasil yang lebih besar dari tiga ketemu dan dicek dengan perkalian.", wajib: true, cek: (k) => pernah(k, "bagi", "muat:0") },
  { id: "b-muat-enam", teks: "Di Muat, hitung berapa kali tiga perempat muat pada enam, lalu cek hasilnya dengan perkalian.", wajib: true, cek: (k) => pernah(k, "bagi", "muat:1") },
  { id: "b-mesin", teks: "Selesaikan Mesin Bagi Pecahan sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B1.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Agam, Gelas, dan Sirup sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B1.B) },
  { id: "b-potong-semua", teks: "Di Potong, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "bagi", ...semua("potong")) },
  { id: "b-silang-semua", teks: "Di Silang, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "bagi", ...semua("silang")) },
  { id: "b-muat-semua", teks: "Di Muat, selesaikan keenam soal dan cek semuanya sampai benar.", wajib: false, cek: (k) => pernah(k, "bagi", ...semua("muat")) },
];

export const MISI_C: DefMisi<KeadaanK6Bab1>[] = [
  { id: "c-ubah", teks: "Di Ubah, ubah setengah menjadi penyebut sepuluh lalu tulis sebagai desimal.", wajib: true, cek: (k) => pernah(k, "desimal", "ubah:0") },
  { id: "c-ubah-lima", teks: "Di Ubah, ubah seperlima menjadi penyebut sepuluh lalu tulis sebagai desimal.", wajib: true, cek: (k) => pernah(k, "desimal", "ubah:1") },
  { id: "c-tempat", teks: "Di Tempat, tentukan tempat, nilai, dan bacaan angka tujuh pada tiga koma tujuh.", wajib: true, cek: (k) => pernah(k, "desimal", "tempat:0") },
  { id: "c-tempat-seratus", teks: "Di Tempat, tentukan tempat, nilai, dan bacaan angka lima pada dua koma delapan lima.", wajib: true, cek: (k) => pernah(k, "desimal", "tempat:1") },
  { id: "c-urut", teks: "Di Urut, samakan angka di belakang koma, cari yang terkecil, lalu urutkan empat desimal dari kecil ke besar.", wajib: true, cek: (k) => pernah(k, "desimal", "urut:0") },
  { id: "c-mesin", teks: "Selesaikan Mesin Desimal sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K6B1.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Agam, Timbangan, dan Lompat Jauh sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K6B1.C) },
  { id: "c-ubah-semua", teks: "Di Ubah, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "desimal", ...semua("ubah")) },
  { id: "c-tempat-semua", teks: "Di Tempat, selesaikan keenam soal sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "desimal", ...semua("tempat")) },
  { id: "c-urut-semua", teks: "Di Urut, selesaikan keenam soal, dari kecil ke besar dan dari besar ke kecil, sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "desimal", ...semua("urut")) },
];

const DAFTAR: Record<HurufMisiK6B1, DefMisi<KeadaanK6Bab1>[]> = { A: MISI_A, B: MISI_B, C: MISI_C };
export const daftarMisiK6Bab1 = (huruf: string): DefMisi<KeadaanK6Bab1>[] => DAFTAR[huruf as HurufMisiK6B1] ?? MISI_A;
