/**
 * Misi dan tantangan bebas Kelas 5 Bab 5 (Luas Daerah Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b5.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Petak : Lab Petak (Tutup, Baris, Potong) + Mesin Petak + Ubin Alun-Alun
 *  B Rumus : Lab Rumus (Kali, Setengah, Trapesium) + Mesin Rumus + Taman Bentuk-Bentuk
 *  C Gabungan : Lab Gabungan (Uraikan, Silang, Tumpang) + Mesin Gabungan + Denah Yohana dan Komang
 *  D Kawat : Lab Kawat (Kawat, Pilih, Urut) + Mesin Kawat + Kawat Bapak (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPetakK5B5A } from "./lab-petak-k5b5a";
import type { KeadaanRumusK5B5B } from "./lab-rumus-k5b5b";
import type { KeadaanGabunganK5B5C } from "./lab-gabungan-k5b5c";
import type { KeadaanKawatK5B5D } from "./lab-kawat-k5b5d";

export type KeadaanK5Bab5 = KeadaanPetakK5B5A | KeadaanRumusK5B5B | KeadaanGabunganK5B5C | KeadaanKawatK5B5D | KeadaanSelesai;
export type HurufMisiK5B5 = "A" | "B" | "C" | "D";

const selesai = (k: KeadaanK5Bab5, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab5, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B5 = { A: "ubin-alun", B: "taman-bentuk", C: "denah-yohana-komang", D: "kawat-bapak" } as const;
export const ID_MESIN_K5B5 = { A: "mesin-petak", B: "mesin-rumus", C: "mesin-gabungan", D: "mesin-kawat" } as const;

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

export const MISI_C: DefMisi<KeadaanK5Bab5>[] = [
  { id: "c-denah-rumah", teks: "Di Uraikan, pada denah rumah, hitung luas kedua bagian persegi panjang, lalu jumlahkan luas seluruhnya.", wajib: true, cek: (k) => pernah(k, "gabungan", "uraikan:0") },
  { id: "c-papan-nama", teks: "Di Uraikan, pada papan nama, hitung luas jajargenjang dan segitiga dengan rumusnya, lalu jumlahkan luas seluruhnya.", wajib: true, cek: (k) => pernah(k, "gabungan", "uraikan:1") },
  { id: "c-tiga-bagian", teks: "Di Uraikan, pada taman tiga bagian, hitung luas ketiga bagian, lalu jumlahkan luas seluruhnya.", wajib: true, cek: (k) => pernah(k, "gabungan", "uraikan:2") },
  { id: "c-silang", teks: "Di Silang, hitung luas denah L pertama dengan cara satu dan cara dua, lalu periksa bahwa hasil kedua cara sama.", wajib: true, cek: (k) => pernah(k, "gabungan", "silang:0") },
  { id: "c-tumpang", teks: "Di Tumpang, hitung bagian yang menumpuk, lalu luas gabungan dua persegi panjang empat kali tiga yang saling menumpuk.", wajib: true, cek: (k) => pernah(k, "gabungan", "tumpang:0") },
  { id: "c-mesin", teks: "Selesaikan Mesin Gabungan sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B5.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Denah Yohana dan Komang sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B5.C) },
  { id: "c-ruang-tamu", teks: "Di Uraikan, pada ruang tamu, hitung luas kedua bagian persegi panjang, lalu jumlahkan luas seluruhnya.", wajib: false, cek: (k) => pernah(k, "gabungan", "uraikan:3") },
  { id: "c-pintu", teks: "Di Uraikan, pada pintu gerbang, hitung luas persegi panjang dan segitiga, lalu jumlahkan luas seluruhnya.", wajib: false, cek: (k) => pernah(k, "gabungan", "uraikan:4") },
  { id: "c-silang-dua", teks: "Di Silang, hitung luas denah L kedua dengan cara satu dan cara dua, lalu periksa bahwa hasil kedua cara sama.", wajib: false, cek: (k) => pernah(k, "gabungan", "silang:1") },
];

export const MISI_D: DefMisi<KeadaanK5Bab5>[] = [
  { id: "d-dua-puluh", teks: "Di Kawat, atur kerangka dua puluh dan sepuluh dari kawat enam puluh sentimeter, lalu catat bentuknya. Lihat luasnya.", wajib: true, cek: (k) => pernah(k, "kawat", "kawat:20") },
  { id: "d-pipih", teks: "Di Kawat, atur kerangka dua puluh lima dan lima, lalu catat bentuknya. Kelilingnya sama, tetapi luasnya lebih kecil.", wajib: true, cek: (k) => pernah(k, "kawat", "kawat:25") },
  { id: "d-persegi", teks: "Di Kawat, atur persegi lima belas dan lima belas, lalu catat bentuknya. Itulah luas terbesar.", wajib: true, cek: (k) => pernah(k, "kawat", "kawat:15") },
  { id: "d-pilih", teks: "Di Pilih, tentukan untuk pagar kebun, ubin lantai, kerangka kawat, dan pasir lapangan, apakah yang dihitung keliling atau luas.", wajib: true, cek: (k) => pernah(k, "kawat", "pilih:0", "pilih:1", "pilih:2", "pilih:3") },
  { id: "d-urut", teks: "Di Urut, urutkan kelima kerangka kawat dari luas terkecil sampai luas terbesar.", wajib: true, cek: (k) => pernah(k, "kawat", "urut:0") },
  { id: "d-mesin", teks: "Selesaikan Mesin Kawat sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B5.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Kawat Bapak sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B5.D) },
  { id: "d-delapan-belas", teks: "Di Kawat, atur kerangka delapan belas dan dua belas, lalu catat bentuknya.", wajib: false, cek: (k) => pernah(k, "kawat", "kawat:18") },
  { id: "d-pipih-sekali", teks: "Di Kawat, atur kerangka dua puluh delapan dan dua, lalu catat bentuknya. Luasnya sangat kecil.", wajib: false, cek: (k) => pernah(k, "kawat", "kawat:28") },
  { id: "d-dua-dua", teks: "Di Kawat, atur kerangka dua puluh dua dan delapan, lalu catat bentuknya.", wajib: false, cek: (k) => pernah(k, "kawat", "kawat:22") },
];

const DAFTAR: Record<HurufMisiK5B5, DefMisi<KeadaanK5Bab5>[]> = { A: MISI_A, B: MISI_B, C: MISI_C, D: MISI_D };
export const daftarMisiK5Bab5 = (huruf: string): DefMisi<KeadaanK5Bab5>[] => DAFTAR[huruf as HurufMisiK5B5] ?? MISI_A;
