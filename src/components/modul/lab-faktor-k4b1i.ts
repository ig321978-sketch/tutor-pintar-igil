/**
 * Lab Faktor (Kelas 4 Bab 1, Sub-Bab I: Faktor dan Kelipatan): logika murni. Satu alat, dua tampilan.
 * Sub-Bab I adalah sub-bab terakhir: simulasi ini sekaligus pencapaian misi bab.
 *  Faktor    : bilangan n dipilih (12, 20, 24, 48, 36, 13). Anak mencoba pembagi 1 sampai n. n : d dihitung;
 *              sisa nol berarti faktor (pasangan d × n/d dicatat), sisa lain berarti bukan faktor.
 *  Kelipatan : lompatan k (2 sampai 9) dari 0. Tiap lompatan menambah satu kelipatan (paling banyak 100).
 *              Rentang "lebih dari a dan kurang dari b" menyorot kelipatan yang masuk, tanpa a dan b sendiri.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export const DAFTAR_N = [12, 20, 24, 48, 36, 13];
export const BATAS_I = 100;
export const MIN_K = 2;
export const MAKS_K = 9;
export const MAKS_A = 90;

/** Semua faktor n, dihitung dengan pembagian (bukan daftar tulisan tangan). */
export const faktorDari = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);

export type HasilCoba = { d: number; hasil: number; sisa: number; faktor: boolean; pasangan: number | null };
export function cobaPembagi(n: number, d: number): HasilCoba {
  const sisa = n % d;
  return { d, hasil: Math.floor(n / d), sisa, faktor: sisa === 0, pasangan: sisa === 0 ? n / d : null };
}

/** Kelipatan k sebanyak m lompatan: k, 2k, ... mk. */
export const kelipatanDari = (k: number, m: number): number[] => Array.from({ length: m }, (_, i) => (i + 1) * k);
export const maksLompatan = (k: number): number => Math.floor(BATAS_I / k);

/** Kelipatan k yang lebih dari a dan kurang dari b (a dan b sendiri tidak ikut). */
export const dalamRentang = (k: number, a: number, b: number): number[] => kelipatanDari(k, maksLompatan(k)).filter((v) => v > a && v < b);

/* ------------------------------ Keadaan ------------------------------ */

export type StateFaktorK4B1I = {
  n: number;
  dicoba: number[];
  k: number;
  m: number;
  rentang: boolean;
  a: number;
  b: number;
  pernah: string[];
  pesan: string;
};

export type AksiFaktorK4B1I =
  | { t: "N"; i: number }
  | { t: "COBA"; d: number }
  | { t: "K"; d: 1 | -1 }
  | { t: "LOMPAT"; d: 1 | -1 }
  | { t: "RENTANG" }
  | { t: "A"; d: 1 | -1 }
  | { t: "B"; d: 1 | -1 }
  | { t: "RESET" };

export const awalFaktorK4B1I = (): StateFaktorK4B1I => ({ n: DAFTAR_N[0], dicoba: [], k: 2, m: 0, rentang: false, a: 10, b: 30, pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
export const faktorDitemukan = (x: StateFaktorK4B1I): number[] => x.dicoba.filter((d) => x.n % d === 0).sort((p, q) => p - q);
export const faktorLengkap = (x: StateFaktorK4B1I): boolean => faktorDari(x.n).every((d) => x.dicoba.includes(d));

function catat(x: StateFaktorK4B1I): StateFaktorK4B1I {
  let p = x.pernah;
  for (const d of x.dicoba) p = tambah(p, `${x.n % d === 0 ? "faktor" : "bukan"}:${x.n}:${d}`);
  if (faktorLengkap(x) && x.dicoba.length > 0) {
    p = tambah(p, `lengkap:${x.n}`);
    if (faktorDari(x.n).length === 2) p = tambah(p, "dua-faktor");
  }
  if (x.m > 0) p = tambah(p, `deret:${x.k}:${x.m}`);
  if (x.rentang) p = tambah(p, `rentang:${x.k}:${x.a}:${x.b}`);
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahFaktorK4B1I(x: StateFaktorK4B1I, a: AksiFaktorK4B1I): StateFaktorK4B1I {
  switch (a.t) {
    case "N":
      if (a.i < 0 || a.i >= DAFTAR_N.length) return x;
      return { ...x, n: DAFTAR_N[a.i], dicoba: [], pesan: "" };
    case "COBA": {
      if (a.d < 1 || a.d > x.n) return x;
      if (x.dicoba.includes(a.d)) return { ...x, pesan: `${a.d} sudah dicoba. Coba pembagi lain.` };
      const h = cobaPembagi(x.n, a.d);
      return catat({ ...x, dicoba: [...x.dicoba, a.d], pesan: h.faktor ? `${x.n} : ${a.d} = ${h.hasil}, sisa 0. ${a.d} adalah faktor ${x.n}. Pasangannya: ${a.d} × ${h.pasangan} = ${x.n}.` : `${x.n} : ${a.d} = ${h.hasil}, sisa ${h.sisa}. Ada sisa, jadi ${a.d} bukan faktor ${x.n}.` });
    }
    case "K": {
      const k = x.k + a.d;
      if (k < MIN_K || k > MAKS_K) return { ...x, pesan: `Lompatan ${MIN_K} sampai ${MAKS_K}.` };
      return { ...x, k, m: 0, pesan: "" };
    }
    case "LOMPAT": {
      const m = x.m + a.d;
      if (m < 0) return { ...x, pesan: "Belum ada lompatan." };
      if (m > maksLompatan(x.k)) return { ...x, pesan: `Lompatan ${x.k} paling jauh sampai ${maksLompatan(x.k) * x.k} (batas ${BATAS_I}).` };
      return catat({ ...x, m, pesan: "" });
    }
    case "RENTANG":
      return catat({ ...x, rentang: !x.rentang, pesan: "" });
    case "A": {
      const v = x.a + a.d;
      if (v < 0 || v > MAKS_A) return { ...x, pesan: `Batas bawah 0 sampai ${MAKS_A}.` };
      if (v >= x.b) return { ...x, pesan: "Batas bawah harus lebih kecil dari batas atas." };
      return catat({ ...x, a: v, pesan: "" });
    }
    case "B": {
      const v = x.b + a.d;
      if (v > BATAS_I) return { ...x, pesan: `Batas atas paling besar ${BATAS_I}.` };
      if (v <= x.a) return { ...x, pesan: "Batas atas harus lebih besar dari batas bawah." };
      return catat({ ...x, b: v, pesan: "" });
    }
    case "RESET":
      return awalFaktorK4B1I();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanFaktorK4B1I = { alat: "faktor"; pernah: string[] };
export const keadaanFaktorK4B1I = (x: StateFaktorK4B1I): KeadaanFaktorK4B1I => ({ alat: "faktor", pernah: x.pernah });

/** Pasangan faktor yang sudah ditemukan, dari yang terkecil: "3 × 4 = 12". */
export function pasanganDitemukan(x: StateFaktorK4B1I): string[] {
  const f = faktorDitemukan(x);
  return f.filter((d) => d <= x.n / d).map((d) => `${d} × ${x.n / d} = ${x.n}`);
}

export function ucapFaktorK4B1I(x: StateFaktorK4B1I): string {
  const f = faktorDitemukan(x);
  if (x.dicoba.length === 0) return `Cari faktor ${x.n}. Coba pembagi satu per satu. Faktor adalah pembagi yang sisanya nol.`;
  return faktorLengkap(x) ? `Semua faktor ${x.n} sudah ditemukan: ${f.join(", ")}.` : `Faktor yang sudah ditemukan: ${f.join(", ") || "belum ada"}. Coba pembagi lain.`;
}

export function ucapKelipatanK4B1I(x: StateFaktorK4B1I): string {
  const d = kelipatanDari(x.k, x.m);
  if (x.rentang) {
    const r = dalamRentang(x.k, x.a, x.b);
    return `Kelipatan ${x.k} lebih dari ${x.a} dan kurang dari ${x.b}: ${r.join(", ") || "tidak ada"}.`;
  }
  return x.m === 0 ? `Lompat dari 0 sebanyak ${x.k} setiap kali. Itulah kelipatan ${x.k}.` : `Kelipatan ${x.k}: ${d.join(", ")}.`;
}
