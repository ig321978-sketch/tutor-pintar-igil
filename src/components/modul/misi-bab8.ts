/**
 * Misi dan tantangan bebas Bab 8 (Data). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: Sub-Bab A memakai Laboratorium Data (kelompok, daftar, turus, tabel).
 * Sub-Bab B (sub-bab akhir, pencapaian misi) menambah Pabrik Diagram, Mesin Data Ajaib,
 * dan Sekretaris Kelas.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket).
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

/** Urutan jenis mainan di Laboratorium Data: pesawat, mobil, boneka, bola. */
export type KeadaanData = {
  alat: "data";
  /** Banyak tiap jenis mainan di toko. */
  jumlah: number[];
  /** Banyak tiap jenis yang sudah ada di raknya. */
  rak: number[];
  daftar: boolean;
  turus: boolean;
  tabel: boolean;
  arahTabel: "menurun" | "mendatar";
};

export type KeadaanDiagram = {
  alat: "diagram";
  tema: string;
  jumlah: number[];
  arah: "tegak" | "mendatar";
  lambang: string;
  tabel: boolean;
  kalimat: boolean;
  arahTabel: "menurun" | "mendatar";
  /** Indeks kolom yang sedang dibandingkan (paling banyak dua). */
  banding: number[];
};

export type KeadaanBab8 = KeadaanData | KeadaanDiagram | KeadaanSelesai;

const jumlahSemua = (a: number[]) => a.reduce((x, y) => x + y, 0);

/** Semua mainan sudah di rak masing-masing dan ada mainan. */
export const dataRapi = (k: KeadaanData): boolean => jumlahSemua(k.jumlah) > 0 && jumlahSemua(k.rak) === jumlahSemua(k.jumlah);

const dat = (k: KeadaanBab8): k is KeadaanData => k.alat === "data";
const dia = (k: KeadaanBab8): k is KeadaanDiagram => k.alat === "diagram";
const selesai = (k: KeadaanBab8, id: string) => k.alat === "selesai" && k.id === id;

/** Indeks nilai terbesar (bisa lebih dari satu bila sama). */
const puncak = (a: number[]): number[] => {
  const m = Math.max(...a);
  return a.map((n, i) => (n === m ? i : -1)).filter((i) => i >= 0);
};

/** Semua jenis yang ada (jumlah > 0) sama banyaknya, dan ada lebih dari satu jenis. */
export const semuaSamaBanyak = (a: number[]): boolean => {
  const ada = a.filter((n) => n > 0);
  return ada.length > 1 && ada.every((n) => n === ada[0]);
};

/** Sub-Bab A: mengelompokkan benda dan membaca data dari daftar, turus, dan tabel. */
export const MISI_A: DefMisi<KeadaanBab8>[] = [
  { id: "a-rapi", teks: "Seret semua mainan ke rak yang sama, atau tekan Rapikan semua.", wajib: true, cek: (k) => dat(k) && dataRapi(k) },
  { id: "a-boneka", teks: "Buat boneka paling banyak sendirian, lalu rapikan semua mainan.", wajib: true, cek: (k) => dat(k) && dataRapi(k) && puncak(k.jumlah).length === 1 && puncak(k.jumlah)[0] === 2 },
  { id: "a-sama", teks: "Buat semua mainan yang ada sama banyak, lalu rapikan.", wajib: true, cek: (k) => dat(k) && dataRapi(k) && semuaSamaBanyak(k.jumlah) },
  { id: "a-tabel", teks: "Rapikan mainan, lalu putar tabel jadi mendatar.", wajib: true, cek: (k) => dat(k) && dataRapi(k) && k.tabel && k.arahTabel === "mendatar" },
  { id: "a-bola", teks: "Kurangi bola sampai habis, lalu rapikan. Lihat tabelnya.", wajib: false, cek: (k) => dat(k) && dataRapi(k) && k.jumlah[3] === 0 },
  { id: "a-sepuluh", teks: "Atur mainan sampai jumlah semuanya tepat 10, lalu rapikan.", wajib: false, cek: (k) => dat(k) && dataRapi(k) && jumlahSemua(k.jumlah) === 10 },
];

/** Sub-Bab B (sub-bab akhir): diagram gambar, mesin data, dan sekretaris kelas. */
export const MISI_B: DefMisi<KeadaanBab8>[] = [
  { id: "b-kembar", teks: "Di Pabrik Diagram, buat dua kolom sama tinggi dan paling tinggi.", wajib: true, cek: (k) => dia(k) && puncak(k.jumlah).length === 2 && !semuaSamaBanyak(k.jumlah) && Math.max(...k.jumlah) > 0 },
  { id: "b-banding", teks: "Ketuk dua kolom yang beda tinggi untuk membandingkannya.", wajib: true, cek: (k) => dia(k) && k.banding.length === 2 && k.jumlah[k.banding[0]] !== k.jumlah[k.banding[1]] },
  { id: "b-mesin", teks: "Jalankan Mesin Data Ajaib sampai stasiun terakhir.", wajib: true, cek: (k) => selesai(k, "mesin") },
  { id: "b-skenario", teks: "Bantu Bu Guru memilih dengan data sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "skenario") },
  { id: "b-sama", teks: "Di Pabrik Diagram, buat semua kolom sama tinggi.", wajib: false, cek: (k) => dia(k) && semuaSamaBanyak(k.jumlah) },
  { id: "b-mendatar", teks: "Putar diagram jadi mendatar, lalu ganti lambangnya.", wajib: false, cek: (k) => dia(k) && k.arah === "mendatar" && k.lambang !== "benda" },
  { id: "b-ingat", teks: "Ingat Sub-Bab A: rapikan semua mainan di toko.", wajib: false, cek: (k) => dat(k) && dataRapi(k) },
];

export const daftarMisiBab8 = (sub: string): DefMisi<KeadaanBab8>[] => (sub === "B" ? MISI_B : MISI_A);