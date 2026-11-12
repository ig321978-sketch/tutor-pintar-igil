/**
 * Misi dan tantangan bebas Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b1.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Nilai tempat : Lab Nilai Tempat (Tulis, Baca, Nilai) + Mesin Nilai Tempat + Papan Data Desa
 *  B Banding-urut : Lab Banding (Banding, Garis, Urut)      + Mesin Banding      + Lomba Dakon
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanTempatK5B1A } from "./lab-tempat-k5b1a";
import type { KeadaanBandingK5B1B } from "./lab-banding-k5b1b";

export type KeadaanK5Bab1 = KeadaanTempatK5B1A | KeadaanBandingK5B1B | KeadaanSelesai;
export type HurufMisiK5B1 = "A" | "B";

const selesai = (k: KeadaanK5Bab1, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab1, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B1 = { A: "data-desa", B: "lomba-dakon" } as const;
export const ID_MESIN_K5B1 = { A: "mesin-tempat", B: "mesin-banding" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab1>[] = [
  { id: "a-yohana", teks: "Di Tulis, tulis empat belas ribu lima ratus di tabel nilai tempat, lalu periksa.", wajib: true, cek: (k) => pernah(k, "nilai-tempat", "tulis:14500") },
  { id: "a-nol", teks: "Di Tulis, tulis empat puluh ribu tiga ratus lima puluh. Jangan lupa nol penjaganya.", wajib: true, cek: (k) => pernah(k, "nilai-tempat", "tulis:40350") },
  { id: "a-baca", teks: "Di Baca, pilih bacaan yang tepat untuk banyak penduduk desa.", wajib: true, cek: (k) => pernah(k, "nilai-tempat", "baca:26932") },
  { id: "a-tujuh", teks: "Di Nilai, ketuk digit tujuh pada bilangan pertama, lalu tentukan tempat dan nilainya.", wajib: true, cek: (k) => pernah(k, "nilai-tempat", "nilai:87986:1") },
  { id: "a-empat", teks: "Di Nilai, ketuk digit empat pada bilangan kedua, lalu tentukan tempat dan nilainya.", wajib: true, cek: (k) => pernah(k, "nilai-tempat", "nilai:40350:0") },
  { id: "a-mesin", teks: "Selesaikan Mesin Nilai Tempat sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B1.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Papan Data Desa sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B1.A) },
  { id: "a-enam", teks: "Di Tulis, tulis seratus ribu. Berapa tempat yang terpakai?", wajib: false, cek: (k) => pernah(k, "nilai-tempat", "tulis:100000") },
  { id: "a-digit", teks: "Di Baca, coba pilih bacaan digit satu per satu. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "nilai-tempat", "baca-digit") },
  { id: "a-nolsatuan", teks: "Di Nilai, ketuk nol di tempat satuan pada bilangan kedua. Berapa nilainya?", wajib: false, cek: (k) => pernah(k, "nilai-tempat", "nilai:40350:4") },
];

export const MISI_B: DefMisi<KeadaanK5Bab1>[] = [
  { id: "b-tempat", teks: "Di Banding, periksa pasangan pertama dari kiri sampai ketemu penentunya, lalu pilih tandanya.", wajib: true, cek: (k) => pernah(k, "banding", "banding:78897-87897") },
  { id: "b-ribuan", teks: "Di Banding, bandingkan skor dakon pada pasangan kedua. Penentunya bukan di puluh ribuan.", wajib: true, cek: (k) => pernah(k, "banding", "banding:56560-57000") },
  { id: "b-garis", teks: "Di Garis, letakkan tiga bilangan di sekitar acuan empat puluh ribu pada ruasnya, lalu periksa.", wajib: true, cek: (k) => pernah(k, "banding", "garis:sekitar40") },
  { id: "b-dakon", teks: "Di Urut, urutkan skor dakon dari yang terkecil, lalu periksa.", wajib: true, cek: (k) => pernah(k, "banding", "urut:dakon") },
  { id: "b-turun", teks: "Di Urut, urutkan empat bilangan dari yang terbesar, lalu periksa.", wajib: true, cek: (k) => pernah(k, "banding", "urut:empat") },
  { id: "b-mesin", teks: "Selesaikan Mesin Banding sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B1.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Lomba Dakon sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B1.B) },
  { id: "b-satuan", teks: "Di Banding, coba periksa kolom satuan lebih dulu. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "banding", "dari-satuan") },
  { id: "b-sama", teks: "Di Banding, bandingkan dua bilangan yang kembar pada pasangan terakhir.", wajib: false, cek: (k) => pernah(k, "banding", "banding:13234-13234") },
  { id: "b-tengah", teks: "Di Urut, urutkan tiga bilangan dari yang terkecil. Mana bilangan tengahnya?", wajib: false, cek: (k) => pernah(k, "banding", "urut:tengah") },
];

const DAFTAR: Record<HurufMisiK5B1, DefMisi<KeadaanK5Bab1>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK5Bab1 = (huruf: string): DefMisi<KeadaanK5Bab1>[] => DAFTAR[huruf as HurufMisiK5B1] ?? MISI_A;
