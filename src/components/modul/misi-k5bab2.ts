/**
 * Misi dan tantangan bebas Kelas 5 Bab 2 (KPK dan FPB). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b2.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Kelipatan : Lab Lompat Kelipatan (Lompat, Tabel, Cek) + Mesin Kelipatan + Tepuk Kelipatan Nisa
 *  B KPK       : Lab Dua Jalur (Jalur, Irisan, Jadwal)     + Mesin KPK       + Jadwal Renang Yohana
 *  C Faktor    : Lab Susunan Faktor (Susun, Pasangan, Tanda) + Mesin Faktor + Potong Petak Lukas
 *  D FPB       : Lab Faktor Bersama (Daftar, Bagi, Jembatan) + Mesin FPB + Vas Mawar Amelia
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKelipatanK5B2A } from "./lab-kelipatan-k5b2a";
import type { KeadaanJalurK5B2B } from "./lab-jalur-k5b2b";
import type { KeadaanFaktorK5B2C } from "./lab-faktor-k5b2c";
import type { KeadaanBersamaK5B2D } from "./lab-bersama-k5b2d";

export type KeadaanK5Bab2 = KeadaanKelipatanK5B2A | KeadaanJalurK5B2B | KeadaanFaktorK5B2C | KeadaanBersamaK5B2D | KeadaanSelesai;
export type HurufMisiK5B2 = "A" | "B" | "C" | "D";

const selesai = (k: KeadaanK5Bab2, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab2, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B2 = { A: "tepuk-kelipatan", B: "jadwal-renang", C: "potong-petak", D: "vas-mawar" } as const;
export const ID_MESIN_K5B2 = { A: "mesin-kelipatan", B: "mesin-kpk", C: "mesin-faktor", D: "mesin-fpb" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab2>[] = [
  { id: "a-tiga", teks: "Di Lompat, pilih jarak tiga, lalu mendaratlah lima kali dari nol.", wajib: true, cek: (k) => pernah(k, "kelipatan", "lompat:3:5") },
  { id: "a-tujuh", teks: "Di Lompat, pilih jarak tujuh, lalu mendaratlah lima kali dari nol.", wajib: true, cek: (k) => pernah(k, "kelipatan", "lompat:7:5") },
  { id: "a-tabel", teks: "Di Tabel, warnai semua kelipatan empat di tabel seratus, lalu periksa.", wajib: true, cek: (k) => pernah(k, "kelipatan", "tabel:4") },
  { id: "a-habis", teks: "Di Cek, susun dua belas titik dalam kelompok berisi tiga, tentukan sisanya, lalu putuskan apakah dua belas kelipatan tiga.", wajib: true, cek: (k) => pernah(k, "kelipatan", "cek:12:3") },
  { id: "a-sisa", teks: "Di Cek, susun empat belas titik dalam kelompok berisi tiga, tentukan sisanya, lalu putuskan apakah empat belas kelipatan tiga.", wajib: true, cek: (k) => pernah(k, "kelipatan", "cek:14:3") },
  { id: "a-mesin", teks: "Selesaikan Mesin Kelipatan sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B2.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Tepuk Kelipatan Nisa sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B2.A) },
  { id: "a-sepuluh", teks: "Di Lompat, pilih jarak tiga, lalu mendaratlah sepuluh kali. Apa yang kamu lihat pada pendaratan terakhir?", wajib: false, cek: (k) => pernah(k, "kelipatan", "lompat:3:10") },
  { id: "a-sembilan", teks: "Di Tabel, warnai semua kelipatan sembilan. Perhatikan pola warnanya.", wajib: false, cek: (k) => pernah(k, "kelipatan", "tabel:9") },
  { id: "a-empat", teks: "Di Cek, periksa dua puluh lima titik dalam kelompok berisi empat. Apakah dua puluh lima kelipatan empat?", wajib: false, cek: (k) => pernah(k, "kelipatan", "cek:25:4") },
];

export const MISI_B: DefMisi<KeadaanK5Bab2>[] = [
  { id: "b-nisa", teks: "Di Jalur, pilih jarak tiga dan empat, lalu lompatkan kedua pelompat sampai keduanya mendarat di bilangan yang sama.", wajib: true, cek: (k) => pernah(k, "jalur", "jalur:3:4") },
  { id: "b-asep", teks: "Di Jalur, pilih jarak tiga dan lima, lalu lompatkan kedua pelompat sampai keduanya mendarat di bilangan yang sama.", wajib: true, cek: (k) => pernah(k, "jalur", "jalur:3:5") },
  { id: "b-irisan", teks: "Di Irisan, tandai semua bilangan yang ada di kedua daftar kelipatan empat dan lima, lalu pilih yang terkecil.", wajib: true, cek: (k) => pernah(k, "jalur", "irisan:4:5") },
  { id: "b-hari", teks: "Di Jadwal, tentukan lama hari sampai Nisa dan Yohana bertemu lagi, lalu tanggalnya.", wajib: true, cek: (k) => pernah(k, "jalur", "jadwal:3:4") },
  { id: "b-dinda", teks: "Di Jadwal, tentukan lama hari sampai Dinda dan Amelia bertemu lagi, lalu tanggalnya.", wajib: true, cek: (k) => pernah(k, "jalur", "jadwal:5:2") },
  { id: "b-mesin", teks: "Selesaikan Mesin KPK sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B2.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Jadwal Renang Yohana sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B2.B) },
  { id: "b-empatlima", teks: "Di Jalur, pilih jarak empat dan lima. Berapa kali tiap pelompat mendarat sampai bertemu?", wajib: false, cek: (k) => pernah(k, "jalur", "jalur:4:5") },
  { id: "b-enamdelapan", teks: "Di Irisan, tandai kelipatan persekutuan enam dan delapan, lalu pilih yang terkecil.", wajib: false, cek: (k) => pernah(k, "jalur", "irisan:6:8") },
  { id: "b-duatiga", teks: "Di Irisan, tandai kelipatan persekutuan dua dan tiga. Ada berapa bilangan di kedua daftar?", wajib: false, cek: (k) => pernah(k, "jalur", "irisan:2:3") },
];

export const MISI_C: DefMisi<KeadaanK5Bab2>[] = [
  { id: "c-dua-belas", teks: "Di Susun, susun dua belas titik dalam baris yang sama banyak, dan simpan semua susunan yang semua titiknya terpakai.", wajib: true, cek: (k) => pernah(k, "faktor", "susun:12") },
  { id: "c-delapan-belas", teks: "Di Susun, susun delapan belas titik dalam baris yang sama banyak, dan simpan semua susunan yang semua titiknya terpakai.", wajib: true, cek: (k) => pernah(k, "faktor", "susun:18") },
  { id: "c-lima", teks: "Di Susun, susun dua puluh empat titik dalam lima baris, lalu simpan. Apa yang tersisa?", wajib: true, cek: (k) => pernah(k, "faktor", "gagal:24:5") },
  { id: "c-pasangan", teks: "Di Pasangan, cari semua pasangan faktor delapan belas sampai pasangannya bertemu di tengah.", wajib: true, cek: (k) => pernah(k, "faktor", "pasangan:18") },
  { id: "c-tanda", teks: "Di Tanda, tandai semua faktor dua puluh empat, termasuk satu dan dua puluh empat, lalu periksa.", wajib: true, cek: (k) => pernah(k, "faktor", "cek:24") },
  { id: "c-mesin", teks: "Selesaikan Mesin Faktor sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B2.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Potong Petak Lukas sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B2.C) },
  { id: "c-dua-empat", teks: "Di Susun, temukan semua susunan penuh untuk dua puluh empat titik. Ada berapa faktornya?", wajib: false, cek: (k) => pernah(k, "faktor", "susun:24") },
  { id: "c-tiga-enam", teks: "Di Pasangan, cari semua pasangan faktor tiga puluh enam. Pasangan mana yang kembar?", wajib: false, cek: (k) => pernah(k, "faktor", "pasangan:36") },
  { id: "c-tanda-tiga-enam", teks: "Di Tanda, tandai semua faktor tiga puluh enam, lalu periksa.", wajib: false, cek: (k) => pernah(k, "faktor", "cek:36") },
];

export const MISI_D: DefMisi<KeadaanK5Bab2>[] = [
  { id: "d-daftar", teks: "Di Daftar, tandai faktor yang ada di kedua daftar faktor dua belas dan delapan belas, lalu pilih yang terbesar.", wajib: true, cek: (k) => pernah(k, "bersama", "daftar:12:18") },
  { id: "d-satu", teks: "Di Daftar, pilih lima belas dan dua puluh delapan, tandai faktor persekutuannya, lalu pilih yang terbesar.", wajib: true, cek: (k) => pernah(k, "bersama", "daftar:15:28") },
  { id: "d-vas", teks: "Di Bagi, bagi dua puluh empat mawar merah dan delapan belas mawar putih ke vas sebanyak mungkin, tanpa sisa.", wajib: true, cek: (k) => pernah(k, "bersama", "bagi:24:18") },
  { id: "d-paket", teks: "Di Bagi, bagi tiga puluh enam susu, empat puluh delapan lolipop, dan dua puluh empat biskuit ke paket sebanyak mungkin, tanpa sisa.", wajib: true, cek: (k) => pernah(k, "bersama", "bagi:36:48:24") },
  { id: "d-jembatan", teks: "Di Jembatan, pilih FPB dan KPK dari dua belas dan delapan belas, lalu periksa jembatannya.", wajib: true, cek: (k) => pernah(k, "bersama", "jembatan:12:18") },
  { id: "d-mesin", teks: "Selesaikan Mesin FPB sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B2.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Vas Mawar Amelia sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B2.D) },
  { id: "d-delapan", teks: "Di Daftar, pilih delapan dan dua belas. Berapa FPB-nya, dan berapa faktor persekutuannya?", wajib: false, cek: (k) => pernah(k, "bersama", "daftar:8:12") },
  { id: "d-enam", teks: "Di Daftar, pilih enam dan dua belas. Apa yang kamu lihat pada FPB-nya?", wajib: false, cek: (k) => pernah(k, "bersama", "daftar:6:12") },
  { id: "d-jembatan-dua", teks: "Di Jembatan, pilih FPB dan KPK dari dua puluh empat dan delapan belas, lalu periksa jembatannya.", wajib: false, cek: (k) => pernah(k, "bersama", "jembatan:24:18") },
];

const DAFTAR: Record<HurufMisiK5B2, DefMisi<KeadaanK5Bab2>[]> = { A: MISI_A, B: MISI_B, C: MISI_C, D: MISI_D };
export const daftarMisiK5Bab2 = (huruf: string): DefMisi<KeadaanK5Bab2>[] => DAFTAR[huruf as HurufMisiK5B2] ?? MISI_A;
