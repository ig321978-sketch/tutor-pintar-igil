/**
 * Misi dan tantangan bebas Kelas 2 Bab 5 (Pecahan). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Simulasi bertahap per sub-bab (paling banyak tiga alat):
 *  A (setengah dari benda utuh): Lab Potong + Mesin Pemeriksa Bagian + skenario Roti Bu Lili.
 *  B (setengah dari kumpulan benda): Lab Kumpulan + Mesin Pembagi Adil + skenario Bagi Adil di Kebun Tika.
 *  C (seperempat, sub-bab akhir): Lab Potong dua garis + Dinding Pecahan + skenario Kue Ulang Tahun Upe,
 *    sekaligus pencapaian misi bab ini.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type BentukMisi = "persegi" | "persegiPanjang" | "lingkaran" | "segitiga";
export type ArahMisi = "tegak" | "datar" | "miring1" | "miring2";
export type NamaBagianMisi = "utuh" | "setengah" | "seperempat" | "lain";
export type NamaWarnaMisi = "kosong" | "utuh" | "setengah" | "seperempat" | "lain";

export type KeadaanLabPotong = {
  alat: "potong";
  bentuk: BentukMisi;
  /** Banyak garis potong yang aktif. */
  garis: number;
  /** Arah garis pertama, atau null bila belum ada garis. */
  arah: ArahMisi | null;
  bagian: number;
  /** Semua bagian sama besar (paling sedikit dua bagian). */
  sama: boolean;
  nama: NamaBagianMisi;
  /** Banyak bagian yang diwarnai. */
  warna: number;
  namaWarna: NamaWarnaMisi;
  batang: boolean;
  tabel: boolean;
  /** Bentuk yang pernah dibelah menjadi dua bagian sama besar. */
  setengahPada: BentukMisi[];
};

export type KeadaanLabKumpulan = {
  alat: "kumpulan";
  n: number;
  jenis: string;
  kiri: number;
  kanan: number;
  /** Dua kelompok sama banyak dan tidak kosong. */
  sama: boolean;
  /** Benda tanpa pasangan. */
  sisa: number;
  pasangan: boolean;
  tabel: boolean;
  /** Banyak benda yang pernah berhasil dibagi dua sama banyak. */
  berhasil: number[];
  /** Jenis benda yang pernah dibagi sama banyak. */
  jenisBerhasil: string[];
};

export type KeadaanDinding = {
  alat: "dinding";
  u: number;
  s: number;
  q: number;
  /** Pasangan batang yang panjang berwarnanya sama dan tidak nol, mis. "s-q". */
  pasangan: string[];
};

export type KeadaanK2Bab5 = KeadaanLabPotong | KeadaanLabKumpulan | KeadaanDinding | KeadaanSelesai;

const potong = (k: KeadaanK2Bab5): k is KeadaanLabPotong => k.alat === "potong";
const kumpulan = (k: KeadaanK2Bab5): k is KeadaanLabKumpulan => k.alat === "kumpulan";
const dinding = (k: KeadaanK2Bab5): k is KeadaanDinding => k.alat === "dinding";
const selesai = (k: KeadaanK2Bab5, id: string) => k.alat === "selesai" && k.id === id;

/** Sub-Bab A: setengah dari benda utuh = dua bagian sama besar. */
export const MISI_A: DefMisi<KeadaanK2Bab5>[] = [
  {
    id: "a-persegi",
    teks: "Belah persegi menjadi dua bagian sama besar. Namanya setengah.",
    wajib: true,
    cek: (k) => potong(k) && k.bentuk === "persegi" && k.bagian === 2 && k.sama && k.nama === "setengah",
  },
  {
    id: "a-tidak",
    teks: "Geser garis sampai dua bagian tidak sama besar. Lihat kalimatnya: itu bukan setengah.",
    wajib: true,
    cek: (k) => potong(k) && k.bagian === 2 && !k.sama,
  },
  {
    id: "a-lingkaran",
    teks: "Pilih lingkaran, lalu belah menjadi dua bagian sama besar.",
    wajib: true,
    cek: (k) => potong(k) && k.bentuk === "lingkaran" && k.bagian === 2 && k.sama,
  },
  { id: "a-mesin", teks: "Selesaikan Mesin Pemeriksa Bagian sampai semua bentuk diperiksa.", wajib: true, cek: (k) => selesai(k, "mesin-bagian") },
  { id: "a-roti", teks: "Selesaikan skenario Roti Bu Lili sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "roti-lili") },
  {
    id: "a-miring",
    teks: "Belah persegi dengan garis miring supaya tetap dua bagian sama besar.",
    wajib: false,
    cek: (k) => potong(k) && k.bentuk === "persegi" && (k.arah === "miring1" || k.arah === "miring2") && k.bagian === 2 && k.sama,
  },
  {
    id: "a-segitiga",
    teks: "Pilih segitiga dan cari garis yang membelahnya menjadi dua bagian sama besar.",
    wajib: false,
    cek: (k) => potong(k) && k.bentuk === "segitiga" && k.bagian === 2 && k.sama,
  },
  {
    id: "a-warna",
    teks: "Belah bentuk jadi dua bagian sama besar, lalu warnai satu bagian. Itu setengah.",
    wajib: false,
    cek: (k) => potong(k) && k.bagian === 2 && k.sama && k.warna === 1 && k.namaWarna === "setengah",
  },
  {
    id: "a-batang",
    teks: "Nyalakan Batang perbandingan pada dua bagian sama besar. Dua batangnya sama panjang.",
    wajib: false,
    cek: (k) => potong(k) && k.batang && k.bagian === 2 && k.sama,
  },
  {
    id: "a-semua",
    teks: "Temukan setengah pada tiga bentuk yang berbeda.",
    wajib: false,
    cek: (k) => potong(k) && k.setengahPada.length >= 3,
  },
];

/** Sub-Bab B: setengah dari kumpulan benda. Bilangan genap bisa dibagi dua sama banyak, ganjil tidak. */
export const MISI_B: DefMisi<KeadaanK2Bab5>[] = [
  {
    id: "b-enam",
    teks: "Bagi 6 benda menjadi dua kelompok sama banyak. Setengah dari 6 adalah 3.",
    wajib: true,
    cek: (k) => kumpulan(k) && k.n === 6 && k.sama && k.kiri === 3,
  },
  {
    id: "b-sepuluh",
    teks: "Tambah benda sampai 10, lalu bagi dua sama banyak. Setengah dari 10 adalah 5.",
    wajib: true,
    cek: (k) => kumpulan(k) && k.n === 10 && k.sama && k.kiri === 5,
  },
  {
    id: "b-ganjil",
    teks: "Pilih banyak benda yang ganjil, lalu bagi dua kelompok sedekat mungkin. Selalu tersisa satu.",
    wajib: true,
    cek: (k) => kumpulan(k) && k.n % 2 === 1 && k.kiri > 0 && k.kanan > 0 && k.sisa === 1,
  },
  { id: "b-mesin", teks: "Selesaikan Mesin Pembagi Adil sampai semua kumpulan diperiksa.", wajib: true, cek: (k) => selesai(k, "mesin-kumpulan") },
  { id: "b-tika", teks: "Selesaikan skenario Bagi Adil di Kebun Tika sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "bagi-adil") },
  {
    id: "b-pasang",
    teks: "Nyalakan Pasangan pada dua kelompok sama banyak. Semua benda punya pasangan.",
    wajib: false,
    cek: (k) => kumpulan(k) && k.pasangan && k.sama,
  },
  {
    id: "b-empat",
    teks: "Temukan empat banyak benda yang berbeda dan bisa dibagi dua sama banyak.",
    wajib: false,
    cek: (k) => kumpulan(k) && k.berhasil.length >= 4,
  },
  {
    id: "b-jenis",
    teks: "Bagi dua sama banyak untuk dua jenis benda yang berbeda, misalnya kelereng dan apel.",
    wajib: false,
    cek: (k) => kumpulan(k) && k.jenisBerhasil.length >= 2,
  },
  {
    id: "b-tabel",
    teks: "Nyalakan Tabel pola, lalu bagi benda sampai kelompok sama banyak. Barisnya menyala.",
    wajib: false,
    cek: (k) => kumpulan(k) && k.tabel && k.sama,
  },
];

/** Sub-Bab C (sub-bab akhir): seperempat, dua seperempat sama dengan setengah. Sekaligus pencapaian misi bab ini. */
export const MISI_C: DefMisi<KeadaanK2Bab5>[] = [
  {
    id: "c-empat",
    teks: "Belah satu bentuk dengan dua garis menjadi empat bagian sama besar. Namanya seperempat.",
    wajib: true,
    cek: (k) => potong(k) && k.garis === 2 && k.bagian === 4 && k.sama && k.nama === "seperempat",
  },
  {
    id: "c-satu",
    teks: "Warnai satu dari empat bagian sama besar. Itu seperempat.",
    wajib: true,
    cek: (k) => potong(k) && k.bagian === 4 && k.sama && k.warna === 1 && k.namaWarna === "seperempat",
  },
  {
    id: "c-dua",
    teks: "Warnai dua dari empat bagian sama besar. Dua seperempat menjadi setengah.",
    wajib: true,
    cek: (k) => potong(k) && k.bagian === 4 && k.sama && k.warna === 2 && k.namaWarna === "setengah",
  },
  {
    id: "c-dinding",
    teks: "Di Dinding Pecahan, warnai dua seperempat dan satu setengah. Panjangnya sama.",
    wajib: true,
    cek: (k) => dinding(k) && k.q === 2 && k.s === 1 && k.pasangan.includes("s-q"),
  },
  { id: "c-kue", teks: "Selesaikan skenario Kue Ulang Tahun Upe sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "kue-upe") },
  {
    id: "c-tidak",
    teks: "Belah dengan dua garis sampai empat bagian tidak sama besar. Itu bukan seperempat.",
    wajib: false,
    cek: (k) => potong(k) && k.bagian === 4 && !k.sama,
  },
  {
    id: "c-lingkaran",
    teks: "Pilih lingkaran dan belah menjadi empat bagian sama besar.",
    wajib: false,
    cek: (k) => potong(k) && k.bentuk === "lingkaran" && k.garis === 2 && k.bagian === 4 && k.sama,
  },
  {
    id: "c-utuh",
    teks: "Di Dinding Pecahan, warnai empat seperempat. Panjangnya sama dengan satu utuh.",
    wajib: false,
    cek: (k) => dinding(k) && k.q === 4 && k.u === 1 && k.pasangan.includes("u-q"),
  },
  {
    id: "c-sisa",
    teks: "Warnai tiga dari empat bagian sama besar. Itu belum setengah, belum seperempat, dan belum utuh.",
    wajib: false,
    cek: (k) => potong(k) && k.bagian === 4 && k.sama && k.warna === 3 && k.namaWarna === "lain",
  },
];

export const daftarMisiK2Bab5 = (sub: string): DefMisi<KeadaanK2Bab5>[] => (sub === "C" ? MISI_C : sub === "B" ? MISI_B : MISI_A);
