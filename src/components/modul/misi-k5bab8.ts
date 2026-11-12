/**
 * Misi dan tantangan bebas Kelas 5 Bab 8 (Data). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b8.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Mengumpulkan data : Lab Data (Turus, Tabel, Mode) + Mesin Data + Anggi dan Donat
 *  B Piktogram : Lab Piktogram (Kunci, Baca, Periksa) + Mesin Piktogram + Anggi dan Kue Apem
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanDataK5B8A } from "./lab-data-k5b8a";
import type { KeadaanPiktogramK5B8B } from "./lab-piktogram-k5b8b";

export type KeadaanK5Bab8 = KeadaanDataK5B8A | KeadaanPiktogramK5B8B | KeadaanSelesai;
export type HurufMisiK5B8 = "A" | "B";

const selesai = (k: KeadaanK5Bab8, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab8, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
const semua = (awalan: string) => [0, 1, 2, 3, 4, 5].map((i) => `${awalan}:${i}`);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B8 = { A: "anggi-donat", B: "anggi-apem" } as const;
export const ID_MESIN_K5B8 = { A: "mesin-data", B: "mesin-piktogram" } as const;

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

const DAFTAR: Record<HurufMisiK5B8, DefMisi<KeadaanK5Bab8>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK5Bab8 = (huruf: string): DefMisi<KeadaanK5Bab8>[] => DAFTAR[huruf as HurufMisiK5B8] ?? MISI_A;
