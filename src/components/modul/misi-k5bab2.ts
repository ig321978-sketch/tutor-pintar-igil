/**
 * Misi dan tantangan bebas Kelas 5 Bab 2 (KPK dan FPB). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b2.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Kelipatan : Lab Lompat Kelipatan (Lompat, Tabel, Cek) + Mesin Kelipatan + Tepuk Kelipatan Nisa
 *  B KPK       : Lab Dua Jalur (Jalur, Irisan, Jadwal)     + Mesin KPK       + Jadwal Renang Yohana
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKelipatanK5B2A } from "./lab-kelipatan-k5b2a";
import type { KeadaanJalurK5B2B } from "./lab-jalur-k5b2b";

export type KeadaanK5Bab2 = KeadaanKelipatanK5B2A | KeadaanJalurK5B2B | KeadaanSelesai;
export type HurufMisiK5B2 = "A" | "B";

const selesai = (k: KeadaanK5Bab2, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab2, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B2 = { A: "tepuk-kelipatan", B: "jadwal-renang" } as const;
export const ID_MESIN_K5B2 = { A: "mesin-kelipatan", B: "mesin-kpk" } as const;

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

const DAFTAR: Record<HurufMisiK5B2, DefMisi<KeadaanK5Bab2>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK5Bab2 = (huruf: string): DefMisi<KeadaanK5Bab2>[] => DAFTAR[huruf as HurufMisiK5B2] ?? MISI_A;
