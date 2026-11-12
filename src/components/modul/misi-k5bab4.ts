/**
 * Misi dan tantangan bebas Kelas 5 Bab 4 (Keliling Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b4.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Jalur : Lab Jalur (Jalan, Pagar, Banding) + Mesin Jalur + Pagar dan Bingkai
 *  B Segitiga : Lab Segitiga (Jumlah, Sama, Ukur) + Mesin Segitiga + Bendera Pita Segitiga
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanJalurK5B4A } from "./lab-jalur-k5b4a";
import type { KeadaanSegitigaK5B4B } from "./lab-segitiga-k5b4b";

export type KeadaanK5Bab4 = KeadaanJalurK5B4A | KeadaanSegitigaK5B4B | KeadaanSelesai;
export type HurufMisiK5B4 = "A" | "B";

const selesai = (k: KeadaanK5Bab4, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab4, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B4 = { A: "pagar-bingkai", B: "bendera-pita" } as const;
export const ID_MESIN_K5B4 = { A: "mesin-jalur", B: "mesin-segitiga" } as const;

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

const DAFTAR: Record<HurufMisiK5B4, DefMisi<KeadaanK5Bab4>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK5Bab4 = (huruf: string): DefMisi<KeadaanK5Bab4>[] => DAFTAR[huruf as HurufMisiK5B4] ?? MISI_A;
