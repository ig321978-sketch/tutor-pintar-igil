/**
 * Misi dan tantangan bebas Kelas 5 Bab 4 (Keliling Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b4.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Jalur : Lab Jalur (Jalan, Pagar, Banding) + Mesin Jalur + Pagar dan Bingkai
 *  B Segitiga : Lab Segitiga (Jumlah, Sama, Ukur) + Mesin Segitiga + Bendera Pita Segitiga
 *  C Segi Empat : Lab Segi Empat (Persegi Panjang, Persegi, Beda) + Mesin Segi Empat + Kebun dan Papan Tulis
 *  D Segi Banyak : Lab Segi Banyak (Beraturan, Beda, Tabel) + Mesin Segi Banyak + Taman Segi Banyak
 *  E Gabungan : Lab Denah (Luar, Bungkus, Hilang) + Mesin Gabungan + Denah Rumah Asep dan Komang (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanJalurK5B4A } from "./lab-jalur-k5b4a";
import type { KeadaanSegitigaK5B4B } from "./lab-segitiga-k5b4b";
import type { KeadaanSegiEmpatK5B4C } from "./lab-segiempat-k5b4c";
import type { KeadaanSegiBanyakK5B4D } from "./lab-segibanyak-k5b4d";
import type { KeadaanDenahK5B4E } from "./lab-denah-k5b4e";

export type KeadaanK5Bab4 = KeadaanJalurK5B4A | KeadaanSegitigaK5B4B | KeadaanSegiEmpatK5B4C | KeadaanSegiBanyakK5B4D | KeadaanDenahK5B4E | KeadaanSelesai;
export type HurufMisiK5B4 = "A" | "B" | "C" | "D" | "E";

const selesai = (k: KeadaanK5Bab4, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab4, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B4 = { A: "pagar-bingkai", B: "bendera-pita", C: "kebun-papan", D: "taman-segibanyak", E: "denah-rumah" } as const;
export const ID_MESIN_K5B4 = { A: "mesin-jalur", B: "mesin-segitiga", C: "mesin-segiempat", D: "mesin-segibanyak", E: "mesin-gabungan" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab4>[] = [
  { id: "a-persegi", teks: "Di Jalan, susuri persegi sisi empat sentimeter, sisi demi sisi, lalu kembali ke sudut awal.", wajib: true, cek: (k) => pernah(k, "jalur", "jalan:0") },
  { id: "a-pp", teks: "Di Jalan, susuri persegi panjang lima sentimeter dan tiga sentimeter sampai kembali ke sudut awal.", wajib: true, cek: (k) => pernah(k, "jalur", "jalan:1") },
  { id: "a-pagar", teks: "Di Pagar, pasang ruas di semua tepi tanah enam petak panjang dan empat petak lebar, lalu periksa.", wajib: true, cek: (k) => pernah(k, "jalur", "pagar:0") },
  { id: "a-bingkai", teks: "Di Banding, pada bangun lima dan tiga, pilih apa yang dihitung untuk bingkai foto, lalu pilih jalur tepinya.", wajib: true, cek: (k) => pernah(k, "jalur", "perlu:0", "jalur:0") },
  { id: "a-sama", teks: "Di Banding, hitung jalur tepi dan isi bangun lima dan tiga, lalu bangun enam dan dua. Apa yang kamu lihat pada jalurnya?", wajib: true, cek: (k) => pernah(k, "jalur", "jalur:0", "isi:0", "jalur:1", "isi:1") },
  { id: "a-mesin", teks: "Selesaikan Mesin Jalur sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B4.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Pagar dan Bingkai sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B4.A) },
  { id: "a-besar", teks: "Di Jalan, susuri persegi panjang enam sentimeter dan empat sentimeter sampai kembali ke sudut awal.", wajib: false, cek: (k) => pernah(k, "jalur", "jalan:2") },
  { id: "a-pagar-kecil", teks: "Di Pagar, pasang ruas di semua tepi tanah empat petak panjang dan tiga petak lebar, lalu periksa.", wajib: false, cek: (k) => pernah(k, "jalur", "pagar:2") },
  { id: "a-kecil", teks: "Di Banding, hitung jalur tepi dan isi bangun dua petak panjang dan dua petak lebar.", wajib: false, cek: (k) => pernah(k, "jalur", "jalur:2", "isi:2") },
];

export const MISI_B: DefMisi<KeadaanK5Bab4>[] = [
  { id: "b-buku", teks: "Di Jumlah, ketuk ketiga sisi segitiga lima, empat, dan tujuh, lalu pilih kelilingnya.", wajib: true, cek: (k) => pernah(k, "segitiga", "jumlah:0") },
  { id: "b-siku", teks: "Di Jumlah, ketuk ketiga sisi segitiga tiga, empat, dan lima, lalu pilih kelilingnya.", wajib: true, cek: (k) => pernah(k, "segitiga", "jumlah:1") },
  { id: "b-sama-lima", teks: "Di Sama, periksa segitiga yang sisinya lima, lima, dan lima. Lalu pilih kelilingnya dengan tiga dikali sisi.", wajib: true, cek: (k) => pernah(k, "segitiga", "sama:0") },
  { id: "b-sama-enam", teks: "Di Sama, periksa segitiga yang sisinya enam, enam, dan enam. Lalu pilih kelilingnya.", wajib: true, cek: (k) => pernah(k, "segitiga", "sama:1") },
  { id: "b-ukur", teks: "Di Ukur, baca ketiga sisi segitiga pertama pada penggaris, lalu jumlahkan. Dua sisinya sama panjang, tetapi tetap dijumlahkan.", wajib: true, cek: (k) => pernah(k, "segitiga", "ukur:0") },
  { id: "b-mesin", teks: "Selesaikan Mesin Segitiga sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B4.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Bendera Pita Segitiga sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B4.B) },
  { id: "b-tujuh", teks: "Di Sama, periksa segitiga yang sisinya tujuh, tujuh, dan tujuh, lalu pilih kelilingnya.", wajib: false, cek: (k) => pernah(k, "segitiga", "sama:2") },
  { id: "b-kaki", teks: "Di Sama, periksa segitiga sama kaki yang sisinya enam, enam, dan empat. Bolehkah langsung dikali tiga?", wajib: false, cek: (k) => pernah(k, "segitiga", "sama:3") },
  { id: "b-besar", teks: "Di Jumlah, ketuk ketiga sisi segitiga enam, delapan, dan sepuluh, lalu pilih kelilingnya.", wajib: false, cek: (k) => pernah(k, "segitiga", "jumlah:3") },
];

export const MISI_C: DefMisi<KeadaanK5Bab4>[] = [
  { id: "c-pp-lima", teks: "Di Persegi Panjang, hitung keliling persegi panjang lima sentimeter dan tiga sentimeter: jumlahkan panjang dan lebar dulu, lalu kalikan dua.", wajib: true, cek: (k) => pernah(k, "segiempat", "pp:0") },
  { id: "c-pp-empat", teks: "Di Persegi Panjang, hitung keliling persegi panjang empat sentimeter dan dua sentimeter: jumlahkan panjang dan lebar dulu, lalu kalikan dua.", wajib: true, cek: (k) => pernah(k, "segiempat", "pp:1") },
  { id: "c-persegi-tiga", teks: "Di Persegi, hitung keliling persegi yang sisinya tiga sentimeter dengan empat dikali sisi.", wajib: true, cek: (k) => pernah(k, "segiempat", "persegi:0") },
  { id: "c-persegi-lima", teks: "Di Persegi, hitung keliling persegi yang sisinya lima sentimeter dengan empat dikali sisi.", wajib: true, cek: (k) => pernah(k, "segiempat", "persegi:1") },
  { id: "c-beda", teks: "Di Beda, pada persegi panjang delapan dan empat, hitung keliling dan luasnya. Panjang dikali lebar bukan keliling.", wajib: true, cek: (k) => pernah(k, "segiempat", "beda:0") },
  { id: "c-mesin", teks: "Selesaikan Mesin Segi Empat sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B4.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Kebun dan Papan Tulis sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B4.C) },
  { id: "c-pp-tujuh", teks: "Di Persegi Panjang, hitung keliling persegi panjang tujuh sentimeter dan dua sentimeter.", wajib: false, cek: (k) => pernah(k, "segiempat", "pp:2") },
  { id: "c-persegi-enam", teks: "Di Persegi, hitung keliling persegi yang sisinya enam sentimeter.", wajib: false, cek: (k) => pernah(k, "segiempat", "persegi:2") },
  { id: "c-kecil", teks: "Di Beda, hitung keliling dan luas persegi yang sisinya dua sentimeter. Apakah hasilnya sama?", wajib: false, cek: (k) => pernah(k, "segiempat", "beda:1") },
];

export const MISI_D: DefMisi<KeadaanK5Bab4>[] = [
  { id: "d-lima", teks: "Di Beraturan, tentukan banyak sisi segi lima bersisi tiga sentimeter, lalu hitung kelilingnya dengan lima dikali sisi.", wajib: true, cek: (k) => pernah(k, "segibanyak", "ber:0") },
  { id: "d-enam", teks: "Di Beraturan, tentukan banyak sisi segi enam bersisi empat sentimeter, lalu hitung kelilingnya dengan enam dikali sisi.", wajib: true, cek: (k) => pernah(k, "segibanyak", "ber:1") },
  { id: "d-beda", teks: "Di Beda, ketuk semua sisi segi lima yang sisinya dua, tiga, empat, lima, dan enam, lalu jumlahkan. Jangan dikali lima.", wajib: true, cek: (k) => pernah(k, "segibanyak", "beda:0") },
  { id: "d-tabel", teks: "Di Tabel, isi semua baris tabel bersisi dua sentimeter sampai penuh, lalu temukan polanya.", wajib: true, cek: (k) => pernah(k, "segibanyak", "tabel:0") },
  { id: "d-delapan", teks: "Di Beraturan, tentukan banyak sisi segi delapan bersisi dua sentimeter, lalu hitung kelilingnya.", wajib: true, cek: (k) => pernah(k, "segibanyak", "ber:2") },
  { id: "d-mesin", teks: "Selesaikan Mesin Segi Banyak sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B4.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Taman Segi Banyak sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B4.D) },
  { id: "d-enam-tiga", teks: "Di Beraturan, hitung keliling segi enam bersisi tiga sentimeter.", wajib: false, cek: (k) => pernah(k, "segibanyak", "ber:3") },
  { id: "d-tujuh", teks: "Di Beraturan, hitung keliling segi tujuh bersisi tiga sentimeter.", wajib: false, cek: (k) => pernah(k, "segibanyak", "ber:4") },
  { id: "d-beda-dua", teks: "Di Beda, ketuk semua sisi segi lima yang sisinya dua, dua, tiga, empat, dan lima, lalu jumlahkan.", wajib: false, cek: (k) => pernah(k, "segibanyak", "beda:1") },
];

export const MISI_E: DefMisi<KeadaanK5Bab4>[] = [
  { id: "e-luar-l", teks: "Di Luar, ketuk semua sisi luar denah L, lalu pilih kelilingnya. Sekat dalam tidak dijumlah.", wajib: true, cek: (k) => pernah(k, "denah", "luar:0") },
  { id: "e-luar-t", teks: "Di Luar, ketuk semua sisi luar denah T, lalu pilih kelilingnya. Sekat dalam tidak dijumlah.", wajib: true, cek: (k) => pernah(k, "denah", "luar:1") },
  { id: "e-bungkus-l", teks: "Di Bungkus, periksa denah L: apakah pembungkus persegi panjang cocok? Lalu pilih kelilingnya.", wajib: true, cek: (k) => pernah(k, "denah", "bungkus:0") },
  { id: "e-bungkus-u", teks: "Di Bungkus, periksa denah U: apakah pembungkus persegi panjang cocok? Lalu pilih kelilingnya.", wajib: true, cek: (k) => pernah(k, "denah", "bungkus:1") },
  { id: "e-hilang", teks: "Di Hilang, lengkapi dua sisi bertanda tanya pada denah L dengan selisih sisi besar dan sisi kecil, lalu jumlahkan semua sisi.", wajib: true, cek: (k) => pernah(k, "denah", "hilang:0") },
  { id: "e-mesin", teks: "Selesaikan Mesin Gabungan sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B4.E) },
  { id: "e-skenario", teks: "Selesaikan skenario Denah Rumah Asep dan Komang sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B4.E) },
  { id: "e-persegi-panjang", teks: "Di Luar, ketuk semua sisi luar denah persegi panjang yang punya satu sekat tengah, lalu pilih kelilingnya.", wajib: false, cek: (k) => pernah(k, "denah", "luar:2") },
  { id: "e-bungkus-t", teks: "Di Bungkus, periksa denah T: apakah pembungkus persegi panjang cocok? Lalu pilih kelilingnya.", wajib: false, cek: (k) => pernah(k, "denah", "bungkus:2") },
  { id: "e-hilang-dua", teks: "Di Hilang, lengkapi dua sisi bertanda tanya pada denah kedua, lalu jumlahkan semua sisi.", wajib: false, cek: (k) => pernah(k, "denah", "hilang:1") },
];

const DAFTAR: Record<HurufMisiK5B4, DefMisi<KeadaanK5Bab4>[]> = { A: MISI_A, B: MISI_B, C: MISI_C, D: MISI_D, E: MISI_E };
export const daftarMisiK5Bab4 = (huruf: string): DefMisi<KeadaanK5Bab4>[] => DAFTAR[huruf as HurufMisiK5B4] ?? MISI_A;
