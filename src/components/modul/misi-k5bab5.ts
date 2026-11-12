/**
 * Misi dan tantangan bebas Kelas 5 Bab 5 (Luas Daerah Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b5.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Petak : Lab Petak (Tutup, Baris, Potong) + Mesin Petak + Ubin Alun-Alun
 *  B Rumus : Lab Rumus (Kali, Setengah, Trapesium) + Mesin Rumus + Taman Bentuk-Bentuk
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPetakK5B5A } from "./lab-petak-k5b5a";
import type { KeadaanRumusK5B5B } from "./lab-rumus-k5b5b";

export type KeadaanK5Bab5 = KeadaanPetakK5B5A | KeadaanRumusK5B5B | KeadaanSelesai;
export type HurufMisiK5B5 = "A" | "B";

const selesai = (k: KeadaanK5Bab5, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab5, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B5 = { A: "ubin-alun", B: "taman-bentuk" } as const;
export const ID_MESIN_K5B5 = { A: "mesin-petak", B: "mesin-rumus" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab5>[] = [
  { id: "a-tutup-lima", teks: "Di Tutup, tutup daerah lima petak dan dua petak sampai rapat, periksa tutupannya, lalu pilih luasnya.", wajib: true, cek: (k) => pernah(k, "petak", "tutup:0") },
  { id: "a-tutup-tiga", teks: "Di Tutup, tutup daerah tiga petak dan tiga petak sampai rapat, periksa tutupannya, lalu pilih luasnya.", wajib: true, cek: (k) => pernah(k, "petak", "tutup:1") },
  { id: "a-baris-empat", teks: "Di Baris, susun empat baris dan dua kolom petak, lalu pilih banyak petaknya.", wajib: true, cek: (k) => pernah(k, "petak", "baris:0") },
  { id: "a-baris-enam", teks: "Di Baris, susun enam baris dan tiga kolom petak, lalu pilih banyak petaknya.", wajib: true, cek: (k) => pernah(k, "petak", "baris:1") },
  { id: "a-potong", teks: "Di Potong, pindahkan petak yang menonjol dari tangga tiga tingkat sampai menjadi persegi panjang dua baris dan tiga kolom. Luasnya tetap.", wajib: true, cek: (k) => pernah(k, "petak", "potong:0") },
  { id: "a-mesin", teks: "Selesaikan Mesin Petak sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B5.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Ubin Alun-Alun sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B5.A) },
  { id: "a-tutup-empat", teks: "Di Tutup, tutup daerah empat petak dan dua petak sampai rapat, periksa, lalu pilih luasnya.", wajib: false, cek: (k) => pernah(k, "petak", "tutup:2") },
  { id: "a-baris-lima", teks: "Di Baris, susun lima baris dan empat kolom petak, lalu pilih banyak petaknya.", wajib: false, cek: (k) => pernah(k, "petak", "baris:2") },
  { id: "a-potong-empat", teks: "Di Potong, pindahkan petak dari tangga empat tingkat sampai menjadi persegi panjang dua baris dan lima kolom.", wajib: false, cek: (k) => pernah(k, "petak", "potong:1") },
];

export const MISI_B: DefMisi<KeadaanK5Bab5>[] = [
  { id: "b-pp", teks: "Di Kali, hitung luas persegi panjang lima dan dua dengan alas dikali tinggi.", wajib: true, cek: (k) => pernah(k, "rumus", "kali:0") },
  { id: "b-persegi", teks: "Di Kali, hitung luas persegi dengan sisi empat, yaitu sisi dikali sisi.", wajib: true, cek: (k) => pernah(k, "rumus", "kali:1") },
  { id: "b-jajar", teks: "Di Kali, pada jajargenjang beralas delapan, pilih tinggi yang tegak lurus alas, bukan sisi miring, lalu hitung luasnya.", wajib: true, cek: (k) => pernah(k, "rumus", "kali:2") },
  { id: "b-segitiga", teks: "Di Setengah, susun dua segitiga beralas enam dan tinggi empat menjadi persegi panjang, lalu pilih luas satu segitiga.", wajib: true, cek: (k) => pernah(k, "rumus", "setengah:0") },
  { id: "b-trapesium", teks: "Di Trapesium, susun dua trapesium menjadi jajargenjang, pilih alasnya, lalu pilih luas satu trapesium dengan sisi sejajar lima dan tiga.", wajib: true, cek: (k) => pernah(k, "rumus", "trap:0") },
  { id: "b-mesin", teks: "Selesaikan Mesin Rumus sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B5.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Taman Bentuk-Bentuk sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B5.B) },
  { id: "b-belah", teks: "Di Setengah, susun belah ketupat dengan diagonal enam dan empat, lalu pilih luasnya.", wajib: false, cek: (k) => pernah(k, "rumus", "setengah:1") },
  { id: "b-layang", teks: "Di Setengah, susun layang-layang dengan diagonal delapan dan enam, lalu pilih luasnya.", wajib: false, cek: (k) => pernah(k, "rumus", "setengah:2") },
  { id: "b-jajar-enam", teks: "Di Kali, pada jajargenjang beralas enam, pilih tinggi yang tegak lurus alas, lalu hitung luasnya.", wajib: false, cek: (k) => pernah(k, "rumus", "kali:3") },
];

const DAFTAR: Record<HurufMisiK5B5, DefMisi<KeadaanK5Bab5>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK5Bab5 = (huruf: string): DefMisi<KeadaanK5Bab5>[] => DAFTAR[huruf as HurufMisiK5B5] ?? MISI_A;
