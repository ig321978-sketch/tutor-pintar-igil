/**
 * Misi dan tantangan bebas Kelas 5 Bab 3 (Bilangan Pecahan). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b3.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Banding : Lab Banding Pecahan (Garis, Banding, Campuran) + Mesin Banding + Lompat Jauh Yohana
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanBandingK5B3A } from "./lab-banding-k5b3a";

export type KeadaanK5Bab3 = KeadaanBandingK5B3A | KeadaanSelesai;
export type HurufMisiK5B3 = "A";

const selesai = (k: KeadaanK5Bab3, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab3, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B3 = { A: "lompat-yohana" } as const;
export const ID_MESIN_K5B3 = { A: "mesin-banding" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab3>[] = [
  { id: "a-garis", teks: "Di Garis, letakkan ketiga lompatan Yohana di garis bilangan: tujuh per delapan, sebelas per empat, dan tujuh per dua.", wajib: true, cek: (k) => pernah(k, "banding", "garis:7:8", "garis:11:4", "garis:7:2") },
  { id: "a-pembilang", teks: "Di Banding, bandingkan satu per dua dan satu per lima. Samakan penyebutnya, lalu pilih tandanya.", wajib: true, cek: (k) => pernah(k, "banding", "banding:0") },
  { id: "a-beda", teks: "Di Banding, bandingkan satu per dua dan tiga per lima. Samakan penyebutnya, lalu pilih tandanya.", wajib: true, cek: (k) => pernah(k, "banding", "banding:2") },
  { id: "a-biasa", teks: "Di Campuran, ubah dua dan tiga per empat menjadi pecahan biasa.", wajib: true, cek: (k) => pernah(k, "banding", "campuran:2:3:4") },
  { id: "a-setengah", teks: "Di Campuran, ubah tiga dan satu per dua menjadi pecahan biasa.", wajib: true, cek: (k) => pernah(k, "banding", "campuran:3:1:2") },
  { id: "a-mesin", teks: "Selesaikan Mesin Banding sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B3.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Lompat Jauh Yohana sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B3.A) },
  { id: "a-penyebut", teks: "Di Banding, bandingkan tiga per delapan dan lima per delapan. Apa yang kamu lihat pada penyebutnya?", wajib: false, cek: (k) => pernah(k, "banding", "banding:1") },
  { id: "a-senilai", teks: "Di Banding, bandingkan satu per tiga dan dua per enam. Apakah keduanya sama besar?", wajib: false, cek: (k) => pernah(k, "banding", "banding:4") },
  { id: "a-empat", teks: "Di Campuran, ubah empat dan satu per empat menjadi pecahan biasa.", wajib: false, cek: (k) => pernah(k, "banding", "campuran:4:1:4") },
];

const DAFTAR: Record<HurufMisiK5B3, DefMisi<KeadaanK5Bab3>[]> = { A: MISI_A };
export const daftarMisiK5Bab3 = (huruf: string): DefMisi<KeadaanK5Bab3>[] => DAFTAR[huruf as HurufMisiK5B3] ?? MISI_A;
