/**
 * Misi dan tantangan bebas Kelas 5 Bab 4 (Keliling Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b4.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Jalur : Lab Jalur (Jalan, Pagar, Banding) + Mesin Jalur + Pagar dan Bingkai
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanJalurK5B4A } from "./lab-jalur-k5b4a";

export type KeadaanK5Bab4 = KeadaanJalurK5B4A | KeadaanSelesai;
export type HurufMisiK5B4 = "A";

const selesai = (k: KeadaanK5Bab4, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab4, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B4 = { A: "pagar-bingkai" } as const;
export const ID_MESIN_K5B4 = { A: "mesin-jalur" } as const;

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

const DAFTAR: Record<HurufMisiK5B4, DefMisi<KeadaanK5Bab4>[]> = { A: MISI_A };
export const daftarMisiK5Bab4 = (huruf: string): DefMisi<KeadaanK5Bab4>[] => DAFTAR[huruf as HurufMisiK5B4] ?? MISI_A;
