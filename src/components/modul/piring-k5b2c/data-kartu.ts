/**
 * Data Mind-map dan Infografis Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati" (komponen milik Sub-Bab ini, bukan PetaLabel/InfoKartu).
 * Mind-map = meja Bu Wati: lima piring klepon, tiap piring punya satu label kosong; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis = dua kartu. Kartu 1 = papan pita Bu Wati: faktor 12 dan 18 dari pita petak yang dipotong sama panjang (pasangan faktor dan daftar faktor);
 * kartu 2 = faktor 24, satu dan bilangan itu sendiri selalu faktor, dan cek bagi. Kontrak data bersambung dari Sub-Bab A dan B: klepon 12 dan onde-onde 18 (Bu Wati), 24 klepon (Pak Joko).
 * Semua angka SELALU dihitung dari data lewat logika-data.ts. Suara tanpa digit. Diuji: scripts/uji-piring-k5b2c.mjs.
 */
import { ejaK5B1 } from "../eja-k5b1";
import { bagiSisa, faktorDari, pasanganFaktor, teksDaftar } from "./logika-data";

export type LangkahPeta = { judul: string; arti: string; ikon: string };
const ucap = (t: string): string => ejaK5B1(t.replace(/ x /g, " kali "));

/** Lima langkah Mind-map: potong sama panjang, catat bilangan, pasangkan, satu dan dirinya, cek bagi. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_PIRING: LangkahPeta[] = [
  {
    judul: "Potong sama panjang",
    arti: "Langkah satu. Potong dan hitung: bagi benda ke bagian yang sama panjang, tanpa sisa. Panjang tiap bagian adalah faktor, dan banyak bagiannya juga faktor.",
    ikon: "\u{1F361}",
  },
  {
    judul: "Catat tiap bilangan",
    arti: "Langkah dua. Catat tiap bilangan yang muncul, yaitu panjang bagian dan banyak potongan. Kalau ada dua bilangan yang sama, cukup tulis sekali.",
    ikon: "\u{1F4DD}",
  },
  {
    judul: "Pasangkan faktor",
    arti: "Langkah tiga. Pasangkan faktor: dua faktor yang dikalikan menghasilkan bilangan itu adalah satu pasangan. Berhenti mencari ketika pasangannya bertemu di tengah.",
    ikon: "\u{1F517}",
  },
  {
    judul: "Satu dan dirinya",
    arti: "Langkah empat. Satu dan bilangan itu sendiri selalu menjadi faktor, jadi keduanya tidak boleh dibuang dari daftar faktor.",
    ikon: "\u{2B50}",
  },
  {
    judul: "Cek dengan bagi",
    arti: "Langkah lima. Cek dengan bagi: bagi bilangan itu dengan bilangan percobaan. Kalau sisanya nol, itu faktor; kalau bersisa, bukan faktor.",
    ikon: "\u{1F50D}",
  },
];
export const JUDUL_PETA_PIRING = "Meja Bu Wati";
export const IKON_JUDUL_PETA_PIRING = "\u{1F361}";
export const PETUNJUK_PETA_PIRING = "Meja Bu Wati. Ketuk tanda tanya di tiap piring untuk melihat langkahnya.";
export const SELESAI_PETA_PIRING = "Meja penuh! Lima langkah sudah kamu buka.";

/* ------------------------------ Infografis kartu 1: papan pita ------------------------------ */
/** Data Story yang bersambung dari Sub-Bab A dan B: klepon 12 dan onde-onde 18 milik Bu Wati. */
export const BILANGAN_KARTU1: readonly number[] = [12, 18];
/** Data kartu 2: klepon Pak Joko (24). */
export const BILANGAN_KARTU2 = 24;
export const SELALU_BILANGAN: readonly number[] = [12, 18, 24];
export const CEK_KARTU2: readonly { n: number; x: number }[] = [
  { n: 24, x: 5 },
  { n: 24, x: 6 },
];

export type SelPasangan = { kunci: string; n: number; a: number; b: number; teks: string; suara: string };
export type SelDaftar = { kunci: string; n: number; daftar: number[]; teks: string; suara: string };
export type SelSelalu = { kunci: string; n: number; teks: string; suara: string };
export type SelCek = { kunci: string; n: number; x: number; q: number; r: number; baris1: string; baris2: string; suara: string };

/** Pasangan faktor `n` sebagai sel: pita `n` petak dipotong tiap `a` petak menjadi `b` bagian. */
export function selPasangan(awal: string, n: number): SelPasangan[] {
  return pasanganFaktor(n).map(([a, b]) => ({
    kunci: `${awal}${n}-${a}`,
    n,
    a,
    b,
    teks: `${a} x ${b} = ${n}`,
    suara: ucap(`Pita ${n} petak dipotong tiap ${a} petak menjadi ${b} bagian, jadi ${a} berpasangan dengan ${b}, karena ${a} x ${b} = ${n}.`),
  }));
}
export function selDaftar(awal: string, n: number): SelDaftar {
  const daftar = faktorDari(n);
  return {
    kunci: `${awal}${n}-daftar`,
    n,
    daftar,
    teks: teksDaftar(daftar),
    suara: ucap(`Faktor ${n} adalah ${teksDaftar(daftar)}. Semuanya ada ${daftar.length} faktor.`),
  };
}
export const selSelalu = (n: number): SelSelalu => ({
  kunci: `selalu-${n}`,
  n,
  teks: `1 dan ${n}`,
  suara: ucap(`Satu dan ${n} selalu menjadi faktor ${n}, karena 1 x ${n} = ${n}.`),
});
export function selCek(n: number, x: number): SelCek {
  const { q, r } = bagiSisa(n, x);
  return {
    kunci: `cek-${n}-${x}`,
    n,
    x,
    q,
    r,
    baris1: `${n} : ${x} = ${q}${r === 0 ? "" : ` sisa ${r}`}`,
    baris2: r === 0 ? "faktor" : "bukan faktor",
    suara: ucap(r === 0 ? `${n} dibagi ${x} hasilnya ${q}, tanpa sisa, jadi ${x} adalah faktor ${n}.` : `${n} dibagi ${x} hasilnya ${q} dan bersisa ${r}, jadi ${x} bukan faktor ${n}.`),
  };
}

/** Semua sel kartu 1: untuk tiap bilangan, sel pasangan lalu sel daftar. */
export const SEL_KARTU1 = BILANGAN_KARTU1.map((n) => ({ n, pasangan: selPasangan("a", n), daftar: selDaftar("a", n) }));
/** Semua sel kartu 2. */
export const SEL_KARTU2 = {
  pasangan: selPasangan("b", BILANGAN_KARTU2),
  daftar: selDaftar("b", BILANGAN_KARTU2),
  selalu: SELALU_BILANGAN.map(selSelalu),
  cek: CEK_KARTU2.map((c) => selCek(c.n, c.x)),
};
export const banyakSel1 = (): number => SEL_KARTU1.reduce((t, s) => t + s.pasangan.length + 1, 0);
export const banyakSel2 = (): number => SEL_KARTU2.pasangan.length + 1 + SEL_KARTU2.selalu.length + SEL_KARTU2.cek.length;

export const PETUNJUK1_INFO_PIRING = "Papan pita Bu Wati. Ketuk tanda tanya untuk melihat pita yang dipotong dan pasangan faktornya.";
export const SELESAI1_INFO_PIRING = "Papan lengkap! Tiap pasangan faktor membentuk daftar faktor yang lengkap.";
export const PETUNJUK2_INFO_PIRING = "Klepon Pak Joko. Ketuk tanda tanya untuk melihat pasangan, aturan satu, dan cek bagi.";
export const SELESAI2_INFO_PIRING = "Kartu lengkap! Satu dan bilangan itu sendiri selalu faktor, dan sisa nol berarti faktor.";
