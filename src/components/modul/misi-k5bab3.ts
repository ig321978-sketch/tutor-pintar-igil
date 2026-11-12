/**
 * Misi dan tantangan bebas Kelas 5 Bab 3 (Bilangan Pecahan). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b3.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Banding : Lab Banding Pecahan (Garis, Banding, Campuran) + Mesin Banding + Lompat Jauh Yohana
 *  B Jumlah  : Lab Jumlah Arsir (Sama, Beda, Hasil) + Mesin Jumlah + Martabak dan Wingko Komang
 *  C Sisa    : Lab Sisa Arsir (Sama, Beda, Hasil) + Mesin Sisa + Kertas Lukis Yohana dan Lukas (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanBandingK5B3A } from "./lab-banding-k5b3a";
import type { KeadaanJumlahK5B3B } from "./lab-jumlah-k5b3b";
import type { KeadaanSisaK5B3C } from "./lab-sisa-k5b3c";

export type KeadaanK5Bab3 = KeadaanBandingK5B3A | KeadaanJumlahK5B3B | KeadaanSisaK5B3C | KeadaanSelesai;
export type HurufMisiK5B3 = "A" | "B" | "C";

const selesai = (k: KeadaanK5Bab3, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab3, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B3 = { A: "lompat-yohana", B: "martabak-wingko", C: "kertas-lukis" } as const;
export const ID_MESIN_K5B3 = { A: "mesin-banding", B: "mesin-jumlah", C: "mesin-sisa" } as const;

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

export const MISI_B: DefMisi<KeadaanK5Bab3>[] = [
  { id: "b-martabak", teks: "Di Sama, jumlahkan satu per delapan dan dua per delapan. Tentukan pembilangnya, lalu penyebutnya.", wajib: true, cek: (k) => pernah(k, "jumlah", "sama:0") },
  { id: "b-penghapus", teks: "Di Sama, jumlahkan dua per sepuluh dan tiga per sepuluh. Tentukan pembilangnya, lalu penyebutnya.", wajib: true, cek: (k) => pernah(k, "jumlah", "sama:1") },
  { id: "b-wingko", teks: "Di Beda, jumlahkan satu per dua dan satu per tiga. Cari KPK penyebutnya, lalu jumlahkan pembilangnya.", wajib: true, cek: (k) => pernah(k, "jumlah", "beda:0") },
  { id: "b-duabelas", teks: "Di Beda, jumlahkan satu per empat dan satu per enam. Cari KPK penyebutnya, lalu jumlahkan pembilangnya.", wajib: true, cek: (k) => pernah(k, "jumlah", "beda:1") },
  { id: "b-sederhana", teks: "Di Hasil, sederhanakan hasil penjumlahan empat per sembilan dan dua per sembilan, yaitu enam per sembilan.", wajib: true, cek: (k) => pernah(k, "jumlah", "hasil:0") },
  { id: "b-mesin", teks: "Selesaikan Mesin Jumlah sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B3.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Martabak dan Wingko Komang sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B3.B) },
  { id: "b-delapan", teks: "Di Beda, jumlahkan tiga per empat dan satu per delapan. Apa KPK dari empat dan delapan?", wajib: false, cek: (k) => pernah(k, "jumlah", "beda:4") },
  { id: "b-sepuluhan", teks: "Di Beda, jumlahkan dua per lima dan satu per sepuluh. Lalu coba sederhanakan hasilnya di tampilan Hasil.", wajib: false, cek: (k) => pernah(k, "jumlah", "beda:5") },
  { id: "b-campuran", teks: "Di Hasil, ubah hasil penjumlahan tiga per lima dan empat per lima, yaitu tujuh per lima, menjadi pecahan campuran.", wajib: false, cek: (k) => pernah(k, "jumlah", "hasil:3") },
];

export const MISI_C: DefMisi<KeadaanK5Bab3>[] = [
  { id: "c-lukas", teks: "Di Sama, dari dua per tiga ambil satu per tiga. Tentukan pembilang sisanya, lalu penyebutnya.", wajib: true, cek: (k) => pernah(k, "sisa", "sama:0") },
  { id: "c-delapan", teks: "Di Sama, dari enam per delapan ambil dua per delapan. Tentukan pembilang sisanya, lalu penyebutnya.", wajib: true, cek: (k) => pernah(k, "sisa", "sama:1") },
  { id: "c-yohana", teks: "Di Beda, dari dua per tiga ambil satu per dua. Cari KPK penyebutnya, lalu kurangkan pembilangnya.", wajib: true, cek: (k) => pernah(k, "sisa", "beda:0") },
  { id: "c-dua-belas", teks: "Di Beda, dari tiga per empat ambil satu per enam. Cari KPK penyebutnya, lalu kurangkan pembilangnya.", wajib: true, cek: (k) => pernah(k, "sisa", "beda:1") },
  { id: "c-periksa", teks: "Di Hasil, sederhanakan hasil pengurangan enam per delapan dan dua per delapan, lalu periksa dengan penjumlahan.", wajib: true, cek: (k) => pernah(k, "sisa", "hasil:0") },
  { id: "c-mesin", teks: "Selesaikan Mesin Sisa sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B3.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Kertas Lukis Yohana dan Lukas sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B3.C) },
  { id: "c-delapan-empat", teks: "Di Beda, dari tujuh per delapan ambil satu per empat. Apa KPK dari delapan dan empat?", wajib: false, cek: (k) => pernah(k, "sisa", "beda:4") },
  { id: "c-sepuluh", teks: "Di Beda, dari satu per dua ambil satu per lima. Hasilnya berpenyebut sepuluh.", wajib: false, cek: (k) => pernah(k, "sisa", "beda:3") },
  { id: "c-dua-belas-periksa", teks: "Di Hasil, sederhanakan hasil pengurangan tujuh per dua belas dan satu per empat, lalu periksa dengan penjumlahan.", wajib: false, cek: (k) => pernah(k, "sisa", "hasil:3") },
];

const DAFTAR: Record<HurufMisiK5B3, DefMisi<KeadaanK5Bab3>[]> = { A: MISI_A, B: MISI_B, C: MISI_C };
export const daftarMisiK5Bab3 = (huruf: string): DefMisi<KeadaanK5Bab3>[] => DAFTAR[huruf as HurufMisiK5B3] ?? MISI_A;
