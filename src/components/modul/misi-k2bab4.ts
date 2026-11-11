/**
 * Misi dan tantangan bebas Kelas 2 Bab 4 (Posisi Benda dan Pola di Sekitar Kita). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Simulasi bertahap per sub-bab (paling banyak tiga alat):
 *  A (posisi benda): Lab Posisi + Lab Petunjuk Ganda + skenario Panen di Sawah Paman.
 *  B (pola, sub-bab akhir): Pabrik Pola + Mesin Tiga Pemeriksaan + skenario Pesta Pola di Desa,
 *    sekaligus pencapaian misi bab ini.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type KataPosisiMisi = "atas" | "bawah" | "depan" | "belakang" | "kanan" | "kiri";

export type KeadaanLabPosisi = {
  alat: "posisi";
  acuan: string;
  benda: string;
  /** Tempat benda sekarang, atau null bila belum ditaruh. */
  kata: KataPosisiMisi | null;
  /** Kalimat lawan menyala. */
  lawan: boolean;
  /** Peta kotak polos menyala. */
  peta: boolean;
  /** Sudut pandang anak yang membelakangi kita menyala. */
  anak: boolean;
  tabel: boolean;
  /** Kata posisi yang sudah dicoba pada benda. */
  sudah: KataPosisiMisi[];
};

export type KeadaanLabPetunjuk = {
  alat: "petunjuk";
  papan: "kamar" | "taman";
  mode: "mana" | "tepat";
  /** Benda yang menjadi Aku, atau null. */
  target: string | null;
  /** Banyak petunjuk yang sudah disusun. */
  petunjuk: number;
  /** Banyak benda yang masih cocok dengan semua petunjuk. */
  sisa: number;
};

export type KeadaanPabrik = {
  alat: "pabrik";
  jenis: "warna" | "bentuk" | "gerakan" | "suara";
  /** Banyak unsur dalam satuan yang disusun. */
  n: number;
  /** Kode huruf satuan, mis. "AAB". */
  kodeSatuan: string;
  ulang: number;
  /** Panjang satuan terpendek barisan, 0 bila tidak ada. */
  terpendek: number;
  pola: boolean;
  kode: boolean;
  tanda: boolean;
  lanjut: boolean;
  /** Tombol Dengarkan pada jenis Suara sudah ditekan. */
  didengar: boolean;
};

export type KeadaanK2Bab4 = KeadaanLabPosisi | KeadaanLabPetunjuk | KeadaanPabrik | KeadaanSelesai;

const posisi = (k: KeadaanK2Bab4): k is KeadaanLabPosisi => k.alat === "posisi";
const petunjuk = (k: KeadaanK2Bab4): k is KeadaanLabPetunjuk => k.alat === "petunjuk";
const pabrik = (k: KeadaanK2Bab4): k is KeadaanPabrik => k.alat === "pabrik";
const selesai = (k: KeadaanK2Bab4, id: string) => k.alat === "selesai" && k.id === id;

/** Sub-Bab A: enam kata posisi, kata lawan, sudut pandang, dan menggabungkan petunjuk. */
export const MISI_A: DefMisi<KeadaanK2Bab4>[] = [
  {
    id: "a-atas",
    teks: "Taruh benda di atas benda acuan, lalu nyalakan Lawan. Acuannya jadi di bawah benda.",
    wajib: true,
    cek: (k) => posisi(k) && k.kata === "atas" && k.lawan,
  },
  {
    id: "a-depan",
    teks: "Taruh benda di depan benda acuan, lalu nyalakan Lawan. Acuannya ada di belakang benda.",
    wajib: true,
    cek: (k) => posisi(k) && k.kata === "depan" && k.lawan,
  },
  {
    id: "a-kanan",
    teks: "Taruh benda di sebelah kanan, lalu nyalakan Anak. Kanan anak sama dengan kanan kita.",
    wajib: true,
    cek: (k) => posisi(k) && k.kata === "kanan" && k.anak,
  },
  {
    id: "a-satu",
    teks: "Pilih satu benda sebagai Aku dan beri satu petunjuk. Masih banyak benda yang cocok.",
    wajib: true,
    cek: (k) => petunjuk(k) && k.mode === "mana" && k.target !== null && k.petunjuk === 1 && k.sisa > 1,
  },
  {
    id: "a-dua",
    teks: "Tambah petunjuk sampai hanya satu benda yang cocok. Dua petunjuk sering cukup.",
    wajib: true,
    cek: (k) => petunjuk(k) && k.mode === "mana" && k.petunjuk >= 2 && k.sisa === 1,
  },
  { id: "a-sawah", teks: "Selesaikan skenario Panen di Sawah Paman sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "sawah") },
  {
    id: "a-enam",
    teks: "Coba keenam kata posisi dengan satu benda: atas, bawah, depan, belakang, kanan, kiri.",
    wajib: false,
    cek: (k) => posisi(k) && k.sudah.length === 6,
  },
  {
    id: "a-peta",
    teks: "Nyalakan Peta kotak, lalu taruh benda di sebelah kiri. Lingkaran merah pindah ke kiri.",
    wajib: false,
    cek: (k) => posisi(k) && k.kata === "kiri" && k.peta,
  },
  {
    id: "a-tepat",
    teks: "Pilih cara Tepat di sebelahnya. Satu petunjuk saja sudah cukup untuk satu benda.",
    wajib: false,
    cek: (k) => petunjuk(k) && k.mode === "tepat" && k.petunjuk >= 1 && k.sisa === 1,
  },
  {
    id: "a-taman",
    teks: "Pindah ke Papan Taman dan buat dua petunjuk sampai hanya satu benda yang cocok.",
    wajib: false,
    cek: (k) => petunjuk(k) && k.papan === "taman" && k.petunjuk >= 2 && k.sisa === 1,
  },
];

/** Sub-Bab B (sub-bab akhir): pola, satuan, jenis pola, memeriksa dan melanjutkan. Sekaligus pencapaian misi bab ini. */
export const MISI_B: DefMisi<KeadaanK2Bab4>[] = [
  {
    id: "b-aab",
    teks: "Susun pola A A B: dua unsur sama lalu satu berbeda, diulang tiga kali atau lebih.",
    wajib: true,
    cek: (k) => pabrik(k) && k.kodeSatuan === "AAB" && k.ulang >= 3 && k.pola,
  },
  {
    id: "b-bukan",
    teks: "Isi satuan dengan unsur yang sama saja. Lihat tandanya: semuanya sama, bukan pola.",
    wajib: true,
    cek: (k) => pabrik(k) && k.n >= 2 && /^(.)\1+$/.test(k.kodeSatuan) && !k.pola,
  },
  {
    id: "b-pendek",
    teks: "Susun satuan empat unsur A B A B. Satuan terpendeknya hanya dua unsur.",
    wajib: true,
    cek: (k) => pabrik(k) && k.n === 4 && k.kodeSatuan === "ABAB" && k.terpendek === 2 && k.pola,
  },
  {
    id: "b-suara",
    teks: "Pilih Suara, susun tepuk keras, pelan, diam, lalu ketuk Dengarkan.",
    wajib: true,
    cek: (k) => pabrik(k) && k.jenis === "suara" && k.n >= 3 && k.kodeSatuan.startsWith("ABC") && k.didengar && k.pola,
  },
  { id: "b-mesin", teks: "Selesaikan Mesin Tiga Pemeriksaan sampai semua barisan diperiksa.", wajib: true, cek: (k) => selesai(k, "mesin-pola") },
  { id: "b-pesta", teks: "Selesaikan skenario Pesta Pola di Desa sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "pesta-pola") },
  {
    id: "b-bentuk",
    teks: "Pilih Bentuk dan susun tiga bentuk berbeda dalam satu satuan: A B C.",
    wajib: false,
    cek: (k) => pabrik(k) && k.jenis === "bentuk" && k.kodeSatuan === "ABC" && k.pola,
  },
  {
    id: "b-lanjut",
    teks: "Nyalakan Lanjutkan pada pola dua unsur atau lebih, lalu tebak unsur berikutnya.",
    wajib: false,
    cek: (k) => pabrik(k) && k.lanjut && k.pola && k.n >= 2,
  },
  {
    id: "b-gerak",
    teks: "Pilih Gerakan dan susun pola gerakan dengan dua unsur atau lebih.",
    wajib: false,
    cek: (k) => pabrik(k) && k.jenis === "gerakan" && k.pola && k.n >= 2,
  },
];

export const daftarMisiK2Bab4 = (sub: string): DefMisi<KeadaanK2Bab4>[] => (sub === "B" ? MISI_B : MISI_A);
