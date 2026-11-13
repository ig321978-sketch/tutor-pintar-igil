/**
 * Misi dan tantangan bebas Kelas 5 Bab 9 (Bilangan Cacah sampai 1.000.000). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b9.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Baca, tulis, nilai tempat : Lab Nilai Tempat (Baca, Tabel, Nilai) + Mesin Nilai Tempat + Nisa dan Lemari Jepara
 *  B Banding dan urut : Lab Banding (Banding, Urut, Simbol) + Mesin Banding + Lukas dan Sepatu
 *  C Komposisi dan dekomposisi : Lab Susun (Susun, Urai, Cara Lain) + Mesin Susun + Nisa dan Harga Komputer
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanNilaiK5B9A } from "./lab-nilai-k5b9a";
import type { KeadaanBandingK5B9B } from "./lab-banding-k5b9b";
import type { KeadaanSusunK5B9C } from "./lab-susun-k5b9c";

export type KeadaanK5Bab9 = KeadaanNilaiK5B9A | KeadaanBandingK5B9B | KeadaanSusunK5B9C | KeadaanSelesai;
export type HurufMisiK5B9 = "A" | "B" | "C";

const selesai = (k: KeadaanK5Bab9, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab9, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B9 = { A: "nisa-lemari", B: "lukas-sepatu", C: "nisa-komputer" } as const;
export const ID_MESIN_K5B9 = { A: "mesin-nilai", B: "mesin-banding", C: "mesin-susun" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab9>[] = [
  { id: "a-baca", teks: "Di Baca, baca harga lemari 979.875 dari kiri: kelompok sebelum titik dengan kata ribu, lalu kelompok sesudahnya.", wajib: true, cek: (k) => pernah(k, "nilai", "baca:0") },
  { id: "a-baca-nol", teks: "Di Baca, baca harga sepeda motor 500.040 yang punya nol di tengah, tanpa mengucapkan nolnya.", wajib: true, cek: (k) => pernah(k, "nilai", "baca:2") },
  { id: "a-tabel", teks: "Di Tabel, tulis bilangan dalam kata ke enam kolom tempat sampai benar, dengan nol yang ikut ditulis.", wajib: true, cek: (k) => pernah(k, "nilai", "tabel:0") },
  { id: "a-salah", teks: "Di Tabel, temukan kolom yang tertukar pada tabel temanmu dengan mencocokkannya dengan kata bilangannya.", wajib: true, cek: (k) => pernah(k, "nilai", "tabel:0", "salah:0") },
  { id: "a-nilai", teks: "Di Nilai, tentukan nilai angka 9 di ratus ribuan pada 979.875, lalu ubah 999.999 menjadi satu juta dengan menambah 1.", wajib: true, cek: (k) => pernah(k, "nilai", "nilai:0", "juta") },
  { id: "a-mesin", teks: "Selesaikan Mesin Nilai Tempat sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B9.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Nisa dan Lemari Jepara sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B9.A) },
  { id: "a-baca-semua", teks: "Di Baca, baca keenam bilangan sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "nilai", ...semua("baca")) },
  { id: "a-tabel-semua", teks: "Di Tabel, isi tabel keenam bilangan dan temukan kolom yang salah pada tabel keenam teman.", wajib: false, cek: (k) => pernah(k, "nilai", ...semua("tabel"), ...semua("salah")) },
  { id: "a-nilai-semua", teks: "Di Nilai, tentukan tempat dan nilai angka untuk keenam bilangan.", wajib: false, cek: (k) => pernah(k, "nilai", ...semua("nilai")) },
];

export const MISI_B: DefMisi<KeadaanK5Bab9>[] = [
  { id: "b-langsung", teks: "Di Banding, bandingkan harga sepatu Lukas dan Komang: kolom paling kiri langsung berbeda, berhenti di sana, lalu pilih yang lebih besar.", wajib: true, cek: (k) => pernah(k, "banding", "banding:1") },
  { id: "b-geser", teks: "Di Banding, bandingkan dua harga ponsel yang kolom kirinya sama: geser ke kanan sampai kolom pertama yang berbeda, lalu pilih yang lebih besar.", wajib: true, cek: (k) => pernah(k, "banding", "banding:0") },
  { id: "b-satuan", teks: "Di Banding, coba membandingkan dari satuan pada dua nomor undian, lalu lihat mengapa cara itu ditolak.", wajib: true, cek: (k) => pernah(k, "banding", "satuan:2") },
  { id: "b-urut", teks: "Di Urut, urutkan tiga harga sepatu dari yang paling kecil sampai yang paling besar, dan urutkan tiga harga ponsel dari yang paling besar sampai yang paling kecil.", wajib: true, cek: (k) => pernah(k, "banding", "urut:0", "urut:1") },
  { id: "b-simbol", teks: "Di Simbol, pilih tanda lebih kecil dari untuk dua harga motor, dan tanda sama dengan untuk dua bilangan yang sama.", wajib: true, cek: (k) => pernah(k, "banding", "simbol:0", "simbol:1") },
  { id: "b-mesin", teks: "Selesaikan Mesin Banding sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B9.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Lukas dan Sepatu sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B9.B) },
  { id: "b-banding-semua", teks: "Di Banding, bandingkan keenam pasangan bilangan sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "banding", ...semua("banding")) },
  { id: "b-urut-semua", teks: "Di Urut, urutkan keenam kelompok bilangan, naik dan turun, sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "banding", ...semua("urut")) },
  { id: "b-simbol-semua", teks: "Di Simbol, pilih tanda yang tepat untuk keenam pasangan, termasuk dua pasangan yang sama.", wajib: false, cek: (k) => pernah(k, "banding", ...semua("simbol")) },
];

export const MISI_C: DefMisi<KeadaanK5Bab9>[] = [
  { id: "c-susun", teks: "Di Susun, susun harga komputer dari bagiannya (3 ratus ribuan, 2 puluh ribuan, 7 ribuan, dan 1 ratusan) menjadi satu bilangan utuh dengan tempat yang tidak disebut diisi nol.", wajib: true, cek: (k) => pernah(k, "susun", "susun:0") },
  { id: "c-nol", teks: "Di Susun, susun harga sepeda yang punya nol penyangga di tengah sampai benar, tanpa menghapus nolnya.", wajib: true, cek: (k) => pernah(k, "susun", "susun:1") },
  { id: "c-urai", teks: "Di Urai, uraikan harga televisi menjadi jumlah nilai tiap tempat sampai jumlahnya kembali sama dengan bilangan awal.", wajib: true, cek: (k) => pernah(k, "susun", "urai:4") },
  { id: "c-cara", teks: "Di Cara Lain, pecah 1 ratus ribuan harga televisi menjadi 10 puluh ribuan dan lihat bahwa totalnya tetap sama.", wajib: true, cek: (k) => pernah(k, "susun", "cara:4") },
  { id: "c-tolak", teks: "Di Cara Lain, coba menambah isi sebuah kolom begitu saja pada harga televisi, lalu lihat mengapa penambahan itu ditolak.", wajib: true, cek: (k) => pernah(k, "susun", "tolak:4") },
  { id: "c-mesin", teks: "Selesaikan Mesin Susun sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B9.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Nisa dan Harga Komputer sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B9.C) },
  { id: "c-susun-semua", teks: "Di Susun, susun keenam bilangan dari bagiannya sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "susun", ...semua("susun")) },
  { id: "c-urai-semua", teks: "Di Urai, uraikan keenam bilangan sampai jumlahnya kembali ke bilangan awal.", wajib: false, cek: (k) => pernah(k, "susun", ...semua("urai")) },
  { id: "c-cara-semua", teks: "Di Cara Lain, temukan cara lain untuk keenam bilangan dengan memecah satu tempat menjadi sepuluh tempat di kanannya.", wajib: false, cek: (k) => pernah(k, "susun", ...semua("cara")) },
];

const DAFTAR: Record<HurufMisiK5B9, DefMisi<KeadaanK5Bab9>[]> = { A: MISI_A, B: MISI_B, C: MISI_C };
export const daftarMisiK5Bab9 = (huruf: string): DefMisi<KeadaanK5Bab9>[] => DAFTAR[huruf as HurufMisiK5B9] ?? MISI_A;
