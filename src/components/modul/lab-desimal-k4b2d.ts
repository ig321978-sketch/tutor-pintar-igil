/**
 * Lab Desimal (Kelas 4 Bab 2, Sub-Bab D: Pecahan Desimal Persepuluhan dan Perseratusan): logika murni. Satu alat, tiga tampilan.
 *  Persepuluhan : batang dibagi 10; t bagian diarsir (1 sampai 9) = t/10 = 0,t. Satu angka di belakang koma.
 *  Perseratusan : kisi 10 × 10; h kotak diarsir (1 sampai 99) = h/100 = 0,hh. Dua angka di belakang koma.
 *  Jembatan     : pecahan p/10 atau p/100 dijembatani ke desimal; banyak angka di belakang koma sama dengan banyak nol penyebut.
 * Desimal DISUSUN dari bilangan bulat (hasil bagi dan sisa), tanpa bilangan pecahan mesin: tidak ada kesalahan pembulatan.
 * Persen dan geser koma baru dipakai di sub-bab berikutnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b2.mjs.
 */

export const MIN_T = 1;
export const MAKS_T = 9;
export const MIN_H = 1;
export const MAKS_H = 99;

export type PenyebutD = 10 | 100;

const dua = (n: number): string => String(n).padStart(2, "0");

/** Satu per sepuluh: 0,t. */
export const desimalPersepuluh = (t: number): string => `0,${t}`;
/** Perseratusan: 0,hh (dua angka di belakang koma, nol di depan tetap ditulis). */
export const desimalPerseratus = (h: number): string => `0,${dua(h)}`;
export const desimalJembatan = (p: number, q: PenyebutD): string => (q === 10 ? desimalPersepuluh(p) : desimalPerseratus(p));
/** Banyak angka di belakang koma sama dengan banyak nol pada penyebut (10 → 1, 100 → 2). */
export const banyakAngka = (q: PenyebutD): number => (q === 10 ? 1 : 2);

export function kalimatPersepuluh(t: number): string {
  return `${t}/10 ditulis ${desimalPersepuluh(t)}. Satu angka di belakang koma, penyebutnya 10.`;
}

export function kalimatPerseratus(h: number): string {
  const d = desimalPerseratus(h);
  let s = `${h}/100 ditulis ${d}. Dua angka di belakang koma, penyebutnya 100.`;
  if (h < 10) s += ` Nol setelah koma tetap ditulis: ${d}, bukan 0,${h}.`;
  if (h % 10 === 0) s += ` ${d} sama dengan ${desimalPersepuluh(h / 10)}: nol di ujung boleh dihilangkan.`;
  return s;
}

export function kalimatJembatan(p: number, q: PenyebutD): string {
  const n = banyakAngka(q);
  return `${p}/${q} ditulis ${desimalJembatan(p, q)}. Penyebut ${q} berarti ${n === 1 ? "satu" : "dua"} angka di belakang koma.`;
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateDesimalK4B2D = {
  t: number;
  h: number;
  p: number;
  q: PenyebutD;
  pernah: string[];
  pesan: string;
};

export type AksiDesimalK4B2D =
  | { t: "T"; d: 1 | -1 }
  | { t: "H"; d: 1 | -1 | 10 | -10 }
  | { t: "JP"; d: 1 | -1 | 10 | -10 }
  | { t: "JSET"; p: number; q: PenyebutD }
  | { t: "JQ"; q: PenyebutD }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalDesimalK4B2D = (): StateDesimalK4B2D => ({ t: 3, h: 25, p: 3, q: 10, pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
const klem = (v: number, lo: number, hi: number): number => Math.max(lo, Math.min(hi, v));

function catatJembatan(x: StateDesimalK4B2D): StateDesimalK4B2D {
  return { ...x, pernah: tambah(x.pernah, `bridge:${x.p}/${x.q}`), pesan: `✅ ${kalimatJembatan(x.p, x.q)}` };
}

export function langkahDesimalK4B2D(x: StateDesimalK4B2D, a: AksiDesimalK4B2D): StateDesimalK4B2D {
  switch (a.t) {
    case "T": {
      const v = x.t + a.d;
      if (v < MIN_T || v > MAKS_T) return { ...x, pesan: `Bagian yang diarsir ${MIN_T} sampai ${MAKS_T} (kurang dari satu keseluruhan).` };
      return { ...x, t: v, pernah: tambah(x.pernah, `tenth:${v}`), pesan: `✅ ${kalimatPersepuluh(v)}` };
    }
    case "H": {
      const v = x.h + a.d;
      if (v < MIN_H || v > MAKS_H) return { ...x, pesan: `Kotak yang diarsir ${MIN_H} sampai ${MAKS_H} (kurang dari satu keseluruhan).` };
      let p = tambah(x.pernah, `hundred:${v}`);
      if (v < 10) p = tambah(p, `nol-depan:${v}`);
      if (v % 10 === 0) p = tambah(p, `ujung-nol:${v}`);
      return { ...x, h: v, pernah: p, pesan: `✅ ${kalimatPerseratus(v)}` };
    }
    case "JP": {
      const v = x.p + a.d;
      if (v < 1 || v > x.q - 1) return { ...x, pesan: `Pembilang 1 sampai ${x.q - 1}.` };
      return catatJembatan({ ...x, p: v });
    }
    case "JSET":
      if (!Number.isInteger(a.p) || a.p < 1 || a.p > a.q - 1) return x;
      return catatJembatan({ ...x, p: a.p, q: a.q });
    case "JQ":
      return catatJembatan({ ...x, q: a.q, p: klem(x.p, 1, a.q - 1) });
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalDesimalK4B2D();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanDesimalK4B2D = { alat: "desimal"; pernah: string[] };
export const keadaanDesimalK4B2D = (x: StateDesimalK4B2D): KeadaanDesimalK4B2D => ({ alat: "desimal", pernah: x.pernah });

export const ucapPersepuluhK4B2D = (x: StateDesimalK4B2D): string => `Batang dibagi sepuluh bagian sama besar, ${x.t} bagian diarsir. ${kalimatPersepuluh(x.t)}`;
export const ucapPerseratusK4B2D = (x: StateDesimalK4B2D): string => `Kisi seratus kotak, ${x.h} kotak diarsir. ${kalimatPerseratus(x.h)}`;
export const ucapJembatanK4B2D = (x: StateDesimalK4B2D): string => kalimatJembatan(x.p, x.q);
