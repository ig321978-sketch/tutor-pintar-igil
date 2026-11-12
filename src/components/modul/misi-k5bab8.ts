/**
 * Misi dan tantangan bebas Kelas 5 Bab 8 (Data). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b8.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Mengumpulkan data : Lab Data (Turus, Tabel, Mode) + Mesin Data + Anggi dan Donat
 *  B Piktogram : Lab Piktogram (Kunci, Baca, Periksa) + Mesin Piktogram + Anggi dan Kue Apem
 *  C Diagram batang : Lab Batang (Baca, Skala, Banding) + Mesin Batang + Rani dan Sea Games
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanDataK5B8A } from "./lab-data-k5b8a";
import type { KeadaanPiktogramK5B8B } from "./lab-piktogram-k5b8b";
import type { KeadaanBatangK5B8C } from "./lab-batang-k5b8c";

export type KeadaanK5Bab8 = KeadaanDataK5B8A | KeadaanPiktogramK5B8B | KeadaanBatangK5B8C | KeadaanSelesai;
export type HurufMisiK5B8 = "A" | "B" | "C";

const selesai = (k: KeadaanK5Bab8, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab8, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B8 = { A: "anggi-donat", B: "anggi-apem", C: "rani-seagames" } as const;
export const ID_MESIN_K5B8 = { A: "mesin-data", B: "mesin-piktogram", C: "mesin-batang" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab8>[] = [
  { id: "a-lima", teks: "Di Turus, catat data sayuran favorit sampai satu kategori punya satu kelompok lima penuh: empat garis tegak dan satu garis miring.", wajib: true, cek: (k) => pernah(k, "data", "lima:0") },
  { id: "a-turus", teks: "Di Turus, catat semua jawaban penjualan donat Anggi sampai habis, tanpa ada yang terlewat atau terhitung dua kali.", wajib: true, cek: (k) => pernah(k, "data", "turus:1") },
  { id: "a-tabel", teks: "Di Tabel, isi frekuensi penjualan donat Anggi dari turusnya sampai jumlah frekuensi sama dengan banyak data.", wajib: true, cek: (k) => pernah(k, "data", "tabel:1") },
  { id: "a-salah", teks: "Di Tabel, temukan kategori yang salah pada rekap temanmu dengan membandingkan turus dan jumlah frekuensinya.", wajib: true, cek: (k) => pernah(k, "data", "salah:1") },
  { id: "a-mode", teks: "Di Mode, tunjuk rasa donat dengan frekuensi terbesar, lalu pilih keputusan yang punya alasan dari tabel.", wajib: true, cek: (k) => pernah(k, "data", "mode:1", "putus:1") },
  { id: "a-mesin", teks: "Selesaikan Mesin Data sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B8.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Anggi dan Donat sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B8.A) },
  { id: "a-turus-semua", teks: "Di Turus, catat semua jawaban keenam data sampai habis.", wajib: false, cek: (k) => pernah(k, "data", ...semua("turus")) },
  { id: "a-tabel-semua", teks: "Di Tabel, isi frekuensi keenam data sampai semuanya cocok dengan banyak data.", wajib: false, cek: (k) => pernah(k, "data", ...semua("tabel")) },
  { id: "a-mode-semua", teks: "Di Mode, tentukan mode dan keputusan untuk keenam data, termasuk data yang punya dua kategori sama tinggi.", wajib: false, cek: (k) => pernah(k, "data", ...semua("mode"), ...semua("putus")) },
];

export const MISI_B: DefMisi<KeadaanK5Bab8>[] = [
  { id: "b-kunci", teks: "Di Kunci, pilih kunci 4 untuk data kue apem Anggi dan putuskan bisa dipakai, karena semua frekuensi habis dibagi 4.", wajib: true, cek: (k) => pernah(k, "piktogram", "kunci:0:4") },
  { id: "b-setengah", teks: "Di Kunci, pilih kunci 4 untuk data panen tomat dan putuskan bisa dipakai, karena sisa pembagiannya tepat setengah kunci sehingga ada setengah simbol.", wajib: true, cek: (k) => pernah(k, "piktogram", "kunci:1:4") },
  { id: "b-tolak", teks: "Di Kunci, pilih kunci 5 untuk data kue apem Anggi dan putuskan tidak bisa dipakai, karena ada sisa yang bukan setengah kunci.", wajib: true, cek: (k) => pernah(k, "piktogram", "tolak:0:5") },
  { id: "b-baca", teks: "Di Baca, baca nilai hari Senin pada piktogram pengunjung perpustakaan yang punya setengah simbol: simbol utuh dikali kunci, ditambah setengah kunci.", wajib: true, cek: (k) => pernah(k, "piktogram", "baca:2") },
  { id: "b-periksa", teks: "Di Periksa, temukan cacat piktogram kue apem Anggi, yaitu jumlah simbol yang tidak cocok dengan tabel, lalu perbaiki barisnya.", wajib: true, cek: (k) => pernah(k, "piktogram", "cacat:0", "perbaiki:0") },
  { id: "b-mesin", teks: "Selesaikan Mesin Piktogram sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B8.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Anggi dan Kue Apem sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B8.B) },
  { id: "b-kunci-semua", teks: "Di Kunci, temukan sedikitnya satu kunci yang bisa dipakai untuk keenam data.", wajib: false, cek: (k) => k.alat === "piktogram" && "pernah" in k && [0, 1, 2, 3, 4, 5].every((i) => k.pernah.some((p) => p.startsWith(`kunci:${i}:`))) },
  { id: "b-baca-semua", teks: "Di Baca, baca nilai keenam piktogram sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "piktogram", ...semua("baca")) },
  { id: "b-periksa-semua", teks: "Di Periksa, temukan cacat dan perbaiki keenam piktogram, dari jumlah simbol, ukuran simbol, sampai kunci yang hilang.", wajib: false, cek: (k) => pernah(k, "piktogram", ...semua("cacat"), ...semua("perbaiki")) },
];

export const MISI_C: DefMisi<KeadaanK5Bab8>[] = [
  { id: "c-baca", teks: "Di Baca, ikuti protokol: lihat judul, lihat skala, lalu baca nilai batang medali emas Sea Games tahun 2019.", wajib: true, cek: (k) => pernah(k, "batang", "baca:0") },
  { id: "c-skala", teks: "Di Skala, putuskan bahwa langkah 5 untuk data medali emas Sea Games adalah skala yang baik.", wajib: true, cek: (k) => pernah(k, "batang", "skala:0:5") },
  { id: "c-tolak", teks: "Di Skala, putuskan bahwa langkah 2 dan langkah 10 untuk data medali emas bukan skala yang baik, karena batang melewati bingkai atau terlalu pendek.", wajib: true, cek: (k) => pernah(k, "batang", "tolak:0:2", "tolak:0:10") },
  { id: "c-banding", teks: "Di Banding, cari selisih batang laki-laki dan perempuan tahun 2023, lalu tentukan tren batang laki-laki.", wajib: true, cek: (k) => pernah(k, "batang", "selisih:0", "tren:0") },
  { id: "c-pilih", teks: "Di Banding, pilih diagram batang sebagai penyajian yang tepat untuk membandingkan dua kelompok sekilas.", wajib: true, cek: (k) => pernah(k, "batang", "pilih:0") },
  { id: "c-mesin", teks: "Selesaikan Mesin Batang sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B8.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Rani dan Sea Games sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B8.C) },
  { id: "c-baca-semua", teks: "Di Baca, baca nilai keenam diagram batang sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "batang", ...semua("baca")) },
  { id: "c-skala-semua", teks: "Di Skala, temukan skala yang baik untuk keenam data.", wajib: false, cek: (k) => k.alat === "batang" && "pernah" in k && [0, 1, 2, 3, 4, 5].every((i) => k.pernah.some((p) => p.startsWith(`skala:${i}:`))) },
  { id: "c-banding-semua", teks: "Di Banding, selesaikan selisih, tren, dan penyajian untuk keenam diagram batang ganda.", wajib: false, cek: (k) => pernah(k, "batang", ...semua("selisih"), ...semua("tren"), ...semua("pilih")) },
];

const DAFTAR: Record<HurufMisiK5B8, DefMisi<KeadaanK5Bab8>[]> = { A: MISI_A, B: MISI_B, C: MISI_C };
export const daftarMisiK5Bab8 = (huruf: string): DefMisi<KeadaanK5Bab8>[] => DAFTAR[huruf as HurufMisiK5B8] ?? MISI_A;
