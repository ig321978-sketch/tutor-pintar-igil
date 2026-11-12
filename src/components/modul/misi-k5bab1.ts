/**
 * Misi dan tantangan bebas Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b1.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Nilai tempat : Lab Nilai Tempat (Tulis, Baca, Nilai) + Mesin Nilai Tempat + Papan Data Desa
 *  B Banding-urut : Lab Banding (Banding, Garis, Urut)      + Mesin Banding      + Lomba Dakon
 *  C Urai-susun   : Lab Susun (Urai, Susun, Tukar)          + Mesin Uraian       + Uang Asep dan Komang
 *  D Operasi      : Lab Operasi (Perkiraan, Bersusun, Kali-Bagi) + Mesin Operasi + Bakti Sosial Nisa (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanTempatK5B1A } from "./lab-tempat-k5b1a";
import type { KeadaanBandingK5B1B } from "./lab-banding-k5b1b";
import type { KeadaanSusunK5B1C } from "./lab-susun-k5b1c";
import type { KeadaanOperasiK5B1D } from "./lab-operasi-k5b1d";

export type KeadaanK5Bab1 = KeadaanTempatK5B1A | KeadaanBandingK5B1B | KeadaanSusunK5B1C | KeadaanOperasiK5B1D | KeadaanSelesai;
export type HurufMisiK5B1 = "A" | "B" | "C" | "D";

const selesai = (k: KeadaanK5Bab1, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab1, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B1 = { A: "data-desa", B: "lomba-dakon", C: "uang-asep", D: "bakti-nisa" } as const;
export const ID_MESIN_K5B1 = { A: "mesin-tempat", B: "mesin-banding", C: "mesin-uraian", D: "mesin-operasi" } as const;

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

export const MISI_C: DefMisi<KeadaanK5Bab1>[] = [
  { id: "c-contoh", teks: "Di Urai, pilih suku-suku bentuk panjang lima puluh dua ribu tiga ratus tujuh, lalu periksa.", wajib: true, cek: (k) => pernah(k, "susun", "urai:52307") },
  { id: "c-nol", teks: "Di Urai, uraikan tujuh puluh ribu delapan puluh. Nol tidak jadi suku, tetapi tempatnya tetap ada.", wajib: true, cek: (k) => pernah(k, "susun", "urai:70080") },
  { id: "c-asep", teks: "Di Susun, susun uang Asep tiga puluh delapan ribu enam ratus dari kartu, lalu periksa.", wajib: true, cek: (k) => pernah(k, "susun", "susun:38600") },
  { id: "c-tiga", teks: "Di Susun, susun uang Komang empat puluh lima ribu enam ratus dengan tepat tiga kartu sepuluh ribu.", wajib: true, cek: (k) => pernah(k, "susun", "susun:45600:p3") },
  { id: "c-tanpa", teks: "Di Susun, susun lagi empat puluh lima ribu enam ratus tanpa kartu sepuluh ribu.", wajib: true, cek: (k) => pernah(k, "susun", "susun:45600:p0") },
  { id: "c-mesin", teks: "Selesaikan Mesin Uraian sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B1.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Uang Asep dan Komang sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B1.C) },
  { id: "c-salah", teks: "Di Urai, coba uraikan tujuh puluh ribu delapan puluh menjadi tujuh puluh ribu dan delapan. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "susun", "urai-70000+8") },
  { id: "c-enam", teks: "Di Susun, susun enam puluh enam ribu enam ratus dengan lima kartu sepuluh ribu, lima belas kartu seribu, dan enam belas kartu seratus.", wajib: false, cek: (k) => pernah(k, "susun", "susun:66600:5-15-16") },
  { id: "c-ratusan", teks: "Di Tukar, tukar seribu empat ratus sampai semuanya menjadi kartu seratus. Berapa kartu seratus?", wajib: false, cek: (k) => pernah(k, "susun", "tukar:1400:14") },
];

export const MISI_D: DefMisi<KeadaanK5Bab1>[] = [
  { id: "d-perkiraan", teks: "Di Perkiraan, bulatkan tiga puluh delapan ribu enam ratus dan dua puluh satu ribu empat ratus, lalu pilih hasil kasarnya.", wajib: true, cek: (k) => pernah(k, "operasi", "perkiraan:38600+21400") },
  { id: "d-tambah", teks: "Di Bersusun, kerjakan tiga puluh dua ribu lima ratus ditambah tiga belas ribu dua ratus lima puluh, kolom demi kolom.", wajib: true, cek: (k) => pernah(k, "operasi", "bersusun:32500+13250") },
  { id: "d-kurang", teks: "Di Bersusun, kerjakan empat puluh tujuh ribu sembilan ratus dikurangi empat puluh lima ribu tujuh ratus lima puluh. Ada kolom yang meminjam.", wajib: true, cek: (k) => pernah(k, "operasi", "bersusun:47900-45750") },
  { id: "d-kali", teks: "Di Kali-Bagi, kerjakan dua belas kali lima ribu dengan memecah menjadi sepuluh kali dan dua kali.", wajib: true, cek: (k) => pernah(k, "operasi", "kali:12x5000") },
  { id: "d-bagi", teks: "Di Kali-Bagi, bagi enam puluh empat ribu dengan empat, lalu cek dengan perkalian.", wajib: true, cek: (k) => pernah(k, "operasi", "bagi:64000d4") },
  { id: "d-mesin", teks: "Selesaikan Mesin Operasi sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B1.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Bakti Sosial Nisa sampai adegan akhir. Ini misi penutup bab.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B1.D) },
  { id: "d-simpan", teks: "Di Bersusun, kerjakan tiga puluh delapan ribu enam ratus ditambah empat belas ribu lima ratus, lalu coba lupa menambahkan simpanan. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "operasi", "lupa-simpan") },
  { id: "d-cocok", teks: "Kerjakan enam puluh tiga ribu lima ratus dikurangi tiga puluh delapan ribu enam ratus di Perkiraan dan di Bersusun, lalu cocokkan hasilnya.", wajib: false, cek: (k) => pernah(k, "operasi", "perkiraan:63500-38600", "bersusun:63500-38600") },
  { id: "d-campur", teks: "Di Kali-Bagi, kerjakan dua kali dua puluh tiga ribu lima ratus ditambah tujuh belas ribu.", wajib: false, cek: (k) => pernah(k, "operasi", "campur:2x23500+17000") },
];

const DAFTAR: Record<HurufMisiK5B1, DefMisi<KeadaanK5Bab1>[]> = { A: MISI_A, B: MISI_B, C: MISI_C, D: MISI_D };
export const daftarMisiK5Bab1 = (huruf: string): DefMisi<KeadaanK5Bab1>[] => DAFTAR[huruf as HurufMisiK5B1] ?? MISI_A;
