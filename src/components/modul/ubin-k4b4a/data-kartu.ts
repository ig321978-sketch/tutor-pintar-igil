/**
 * Data Mind-map dan Infografis Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (dirancang ulang, tanpa komponen bersama).
 * Mind-map: denah lantai tepi kolam Bu Sinta dengan ubin sungguhan; empat bagian denah (ubin, baris kali kolom, tulisan luas, tangga satuan) masing-masing punya label kosong
 * yang diketuk: judul langkah muncul dan dibacakan Guru. Isi = langkah rangkuman semua metode Sub-Bab A.
 * Infografis: dua kartu dari benda dan angka yang muncul di Story. Kartu 1 = papan jalan Bu Sinta berisi tiga denah (lantai maket 3 x 4 = 12 cm², lantai kolam 5 x 6 = 30 m², denah Genta 4 x 5 = 20 cm²);
 * baris kali kolom dan luas (dengan satuan) kosong sampai diketuk. Kartu 2 = tangga satuan (1 m = 100 cm, 100 x 100 = 10.000, 1 m² = 10.000 cm², 2 m² = 20.000 cm²). Digital saja.
 * Suara tanpa digit: satuan dieja lewat eja-k4b4.ts. Diuji: scripts/uji-ubin-k4b4a.mjs.
 */
import { ejaK4B4 } from "../eja-k4b4";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Empat langkah Mind-map: Cover the Floor, Rows and Columns, satuan baku, dan Unit Square Ladder. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_UBIN: LangkahPeta[] = [
  {
    judul: "Tutup lantai dengan ubin",
    arti: "Langkah satu. Tutup lantai dengan ubin sama besar, tanpa celah dan tanpa tumpang tindih. Banyak ubin itulah luasnya.",
    ikon: "\u{1F9F1}",
  },
  {
    judul: "Hitung baris kali kolom",
    arti: "Langkah dua. Hitung banyak baris dan banyak kolom, lalu kalikan. Hasilnya sama dengan menghitung ubin satu per satu.",
    ikon: "\u{1F4CA}",
  },
  {
    judul: "Tulis satuan luasnya",
    arti: "Langkah tiga. Tulis satuan di belakang bilangan, yaitu sentimeter persegi atau meter persegi. Satuan baku memberi hasil yang sama untuk semua orang.",
    ikon: "\u{1F4CF}",
  },
  {
    judul: "Naik turun tangga satuan",
    arti: "Langkah empat. Satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Turun tangga, bilangannya makin banyak. Naik tangga, bilangannya makin sedikit.",
    ikon: "\u{2B07}\u{FE0F}",
  },
];
export const JUDUL_PETA_UBIN = "Tangga Luas Kolam";
export const IKON_JUDUL_PETA_UBIN = "\u{1F3CA}";
export const PETUNJUK_PETA_UBIN = "Tangga ubin di tepi kolam. Ketuk tanda tanya di tiap anak tangga untuk melihat langkahnya.";
export const SELESAI_PETA_UBIN = "Sampai di atas! Empat langkah sudah kamu buka.";

/** Denah di papan jalan Bu Sinta, semuanya muncul di Story (ubin satu satuan tiap petak). */
export type DenahInfo = { kunci: string; nama: string; b: number; k: number; u: "cm²" | "m²" };
export const DENAH_UBIN: DenahInfo[] = [
  { kunci: "maket", nama: "Lantai maket", b: 3, k: 4, u: "cm²" },
  { kunci: "kolam", nama: "Lantai kolam", b: 5, k: 6, u: "m²" },
  { kunci: "genta", nama: "Denah Genta", b: 4, k: 5, u: "cm²" },
];
export const luasDenah = (d: DenahInfo): number => d.b * d.k;
export const teksKali = (d: DenahInfo): string => `${d.b} × ${d.k}`;
export const teksLuasDenah = (d: DenahInfo): string => `${luasDenah(d)} ${d.u}`;
/** Suara satu kotak kosong (tanpa digit): 0 = baris kali kolom, 1 = luas dengan satuan. */
export function suaraDenah(d: DenahInfo, kol: 0 | 1): string {
  return kol === 0 ? ejaK4B4(`${d.b} baris kali ${d.k} kolom.`) : ejaK4B4(`${d.nama} luasnya ${luasDenah(d)} ${d.u}.`);
}

/** Kartu 2: tangga satuan dari Story (kotak berlabel, isi kosong sampai diketuk). */
export type LangkahTangga = { kunci: string; label: string; isi: string; suara: string };
export const TANGGA_INFO: LangkahTangga[] = [
  { kunci: "sisi", label: "Sisi 1 ubin", isi: "1 m = 100 cm", suara: ejaK4B4("1 m = 100 cm") },
  { kunci: "kali", label: "Luas 1 ubin", isi: "100 × 100 = 10.000", suara: ejaK4B4("100 × 100 = 10.000") },
  { kunci: "satu", label: "Satu meter persegi", isi: "1 m² = 10.000 cm²", suara: ejaK4B4("1 m² = 10.000 cm²") },
  { kunci: "dua", label: "Dua meter persegi", isi: "2 m² = 20.000 cm²", suara: ejaK4B4("2 m² = 20.000 cm²") },
];

export const JUDUL_PAPAN_INFO = "Papan Jalan Bu Sinta";
export const PETUNJUK1_INFO_UBIN = "Papan jalan Bu Sinta berisi tiga denah lantai. Ketuk tanda tanya untuk melihat baris kali kolom dan luasnya.";
export const PETUNJUK2_INFO_UBIN = "Tangga satuan. Ketuk tanda tanya untuk melihat hubungan meter persegi dan sentimeter persegi.";
export const SELESAI1_INFO_UBIN = "Papan lengkap! Luas dihitung dari baris kali kolom, dan satuannya ditulis.";
export const SELESAI2_INFO_UBIN = "Tangga lengkap! Satu meter persegi sama dengan sepuluh ribu sentimeter persegi.";
