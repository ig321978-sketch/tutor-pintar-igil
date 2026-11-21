/**
 * Data Mind-map dan Infografis Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari" (komponen milik Sub-Bab ini, bukan PetaLabel/InfoKartu).
 * Mind-map = rak gudang tiket Bu Lestari: empat rak bersusun, tiap rak punya gambar bundel dan satu label kosong; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis = dua kartu. Kartu 1 = papan rak bundel: tabel DATA dari cerita (jenis bundel, banyak bundel dan tiket Tribun Utara 24.350 dan Tribun Barat 30.402, nol penjaga, jumlah);
 * judul kolom tampil, isi sel kosong sampai diketuk. Kartu 2 = tukar dan susun: susunan Tribun Utara yang berbeda dengan jumlah tetap (tukar sepuluh, banyak cara) dan uraian
 * Tribun Barat yang disusun kembali dengan nol. Kontrak data bersambung dari Sub-Bab A dan B: Utara 24.350 dan Barat 30.402 orang.
 * Semua angka SELALU dihitung dari data lewat logika-data.ts. Suara tanpa digit. Diuji: scripts/uji-bundel-k5b1c.mjs.
 */
import { ejaK5B1 } from "../eja-k5b1";
import { KOLOM, lambang, susunanDari, teksSusunan, teksUraian, totalSusunan, tukarTurun, type Susunan } from "./logika-data";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Empat langkah Mind-map: urai tiap angka, tukar sepuluh, banyak susunan, susun kembali dengan nol. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_BUNDEL: LangkahPeta[] = [
  {
    judul: "Urai tiap angka",
    arti: "Langkah satu. Urai bilangan: ambil tiap angka, sebut kolomnya, lalu tulis bagian itu menurut kolomnya. Jumlah semua bagian sama dengan bilangan semula.",
    ikon: "\u{1F4E6}",
  },
  {
    judul: "Tukar sepuluh",
    arti: "Langkah dua. Tukar bundel: sepuluh bundel di satu kolom sama dengan satu bundel di kolom sebelah kirinya. Boleh ditukar bolak-balik.",
    ikon: "\u{1F501}",
  },
  {
    judul: "Banyak susunan",
    arti: "Langkah tiga. Satu bilangan bisa disusun dengan banyak cara, tetapi jumlah seluruhnya tidak berubah.",
    ikon: "\u{1F500}",
  },
  {
    judul: "Susun dan isi nol",
    arti: "Langkah empat. Susun kembali: taruh tiap bagian ke kolomnya, isi nol di kolom yang kosong, lalu tulis angkanya berurutan menjadi bentuk biasa.",
    ikon: "\u{1F4DD}",
  },
];
export const JUDUL_PETA_BUNDEL = "Rak Gudang Bu Lestari";
export const IKON_JUDUL_PETA_BUNDEL = "\u{1F4E6}";
export const PETUNJUK_PETA_BUNDEL = "Rak gudang Bu Lestari. Ketuk tanda tanya di tiap rak untuk melihat langkahnya.";
export const SELESAI_PETA_BUNDEL = "Rak penuh! Empat langkah sudah kamu buka.";

/* ------------------------------ Infografis kartu 1: rak bundel ------------------------------ */
/** Data Story yang bersambung dari Sub-Bab A dan B: Tribun Utara dan Tribun Barat (orang). */
export const UTARA = 24350;
export const BARAT = 30402;
export const TRIBUN_INFO = [
  { nama: "Utara", n: UTARA },
  { nama: "Barat", n: BARAT },
] as const;
export const KOLOM_INFO_BUNDEL = ["Bundel", "Utara", "Barat"];
/** Banyak bundel kolom `kolom` untuk tribun `t`. */
export const banyakInfo = (t: number, kolom: number): number => susunanDari(TRIBUN_INFO[t].n)[kolom];
/** Banyak tiket yang diwakili bundel itu. */
export const tiketInfo = (t: number, kolom: number): number => banyakInfo(t, kolom) * KOLOM[kolom].bobot;
export const jumlahInfo = (t: number): number => totalSusunan(susunanDari(TRIBUN_INFO[t].n));

/** Suara satu sel tabel (tanpa digit). */
export function suaraBundel(t: number, kolom: number): string {
  const c = banyakInfo(t, kolom);
  const tribun = TRIBUN_INFO[t].nama;
  const b = KOLOM[kolom].bundel;
  return c === 0
    ? ejaK5B1(`Tribun ${tribun} tidak memakai ${b} sama sekali, jadi kolom ${KOLOM[kolom].tempat} berisi nol.`)
    : ejaK5B1(`Tribun ${tribun} memakai ${c} ${b}, yaitu ${lambang(tiketInfo(t, kolom))} tiket.`);
}
/** Suara baris jumlah: uraian lalu jumlahnya. */
export function suaraJumlahInfo(t: number): string {
  return ejaK5B1(`Uraian Tribun ${TRIBUN_INFO[t].nama}: ${teksUraian(TRIBUN_INFO[t].n)} = ${lambang(jumlahInfo(t))}.`);
}

export const PETUNJUK1_INFO_BUNDEL = "Rak gudang Bu Lestari. Ketuk tanda tanya di tiap kotak untuk melihat banyak bundel dan uraiannya.";
export const SELESAI1_INFO_BUNDEL = "Rak lengkap! Tiap angka ditulis menurut kolomnya, dan nol menjaga kolom yang kosong.";

/* ------------------------------ Infografis kartu 2: tukar dan susun ------------------------------ */
export type BarisTukarInfo = { label: string; susunan: string; jumlah: number; suaraSusunan: string; suaraJumlah: string };
const S0: Susunan = susunanDari(UTARA);
/** Semua kardus ditukar menjadi dus: tiap kardus menjadi sepuluh dus. */
const SEMUA_KARDUS: Susunan = (() => {
  let s: Susunan = S0;
  for (let n = 0; n < S0[0]; n += 1) s = tukarTurun(s, 0) ?? s;
  return s;
})();
/** Semua dus ditukar menjadi pak. */
const SEMUA_DUS: Susunan = (() => {
  let s: Susunan = SEMUA_KARDUS;
  for (let n = 0; n < SEMUA_KARDUS[1]; n += 1) s = tukarTurun(s, 1) ?? s;
  return s;
})();
const SATU_DUS: Susunan = tukarTurun(S0, 1) ?? S0;
export const SUSUNAN_INFO: { label: string; s: Susunan }[] = [
  { label: "Asli", s: S0 },
  { label: "Tukar 1 dus", s: SATU_DUS },
  { label: "Kardus ke dus", s: SEMUA_KARDUS },
  { label: "Dus ke pak", s: SEMUA_DUS },
];
export const BARIS_TUKAR_INFO: BarisTukarInfo[] = [
  ...SUSUNAN_INFO.map((x, r): BarisTukarInfo => ({
    label: x.label,
    susunan: teksSusunan(x.s),
    jumlah: totalSusunan(x.s),
    suaraSusunan: ejaK5B1(r === 0 ? `Susunan asli Tribun Utara: ${teksSusunan(x.s)}.` : `${x.label.startsWith("Tukar") ? "Satu dus ditukar sepuluh pak" : x.label === "Kardus ke dus" ? "Semua kardus ditukar dus" : "Semua dus ditukar pak"}, sehingga susunannya ${teksSusunan(x.s)}.`),
    suaraJumlah: ejaK5B1(`Jumlahnya tetap ${lambang(totalSusunan(x.s))}, karena menukar bundel tidak mengubah jumlah.`),
  })),
  {
    label: "Susun Barat",
    susunan: teksUraian(BARAT),
    jumlah: BARAT,
    suaraSusunan: ejaK5B1(`Bu Lestari memberi uraian Tribun Barat: ${teksUraian(BARAT)}.`),
    suaraJumlah: ejaK5B1(`Kolom ribuan dan puluhan kosong, jadi diisi nol, dan hasilnya ${lambang(BARAT)}.`),
  },
];
export const KOLOM_INFO_TUKAR = ["Cara", "Susunan", "Jumlah"];
export const PETUNJUK2_INFO_BUNDEL = "Tukar dan susun. Ketuk tanda tanya untuk melihat susunan dan jumlahnya.";
export const SELESAI2_INFO_BUNDEL = "Ditukar atau disusun, jumlahnya tetap sama.";
