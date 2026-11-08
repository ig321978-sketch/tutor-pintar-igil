/**
 * Laboratorium Garis Bilangan Loncat (Bab 6): model PhET. Penjumlahan, pengurangan, dan selisih bilangan
 * sampai 20 digambar sebagai lompatan di garis bilangan. Dua cara: loncat satu-satu atau loncat lewat sepuluh.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const MAKS = 20;

export type Op = "tambah" | "kurang" | "selisih";
export type Strategi = "satuan" | "sepuluh";

export type Loncat = { a: number; b: number };

/** Operan kedua paling banyak berapa untuk operasi dan bilangan pertama ini. */
export function batasOperan(a: number, op: Op): number {
  if (op === "tambah") return MAKS - a;
  if (op === "kurang") return a;
  return MAKS;
}

/** Jepit pasangan bilangan agar sesuai batas operasi. */
export function rapikan(p: Loncat, op: Op): Loncat {
  const a = Math.max(0, Math.min(MAKS, Math.round(p.a)));
  const b = Math.max(0, Math.min(batasOperan(a, op), Math.round(p.b)));
  return { a, b };
}

export const hasilLoncat = (p: Loncat, op: Op): number => (op === "tambah" ? p.a + p.b : op === "kurang" ? p.a - p.b : Math.abs(p.a - p.b));

export type Hop = { dari: number; ke: number; label: string };

/** Rencana lompatan. Selisih: satu lompatan dari bilangan kecil ke bilangan besar. */
export function rencana(p: Loncat, op: Op, strategi: Strategi): Hop[] {
  const { a, b } = p;
  if (op === "selisih") {
    const kecil = Math.min(a, b);
    const besar = Math.max(a, b);
    return kecil === besar ? [] : [{ dari: kecil, ke: besar, label: `${besar - kecil}` }];
  }
  if (b === 0) return [];
  if (op === "tambah") {
    const c = a + b;
    if (strategi === "satuan") return Array.from({ length: b }, (_, i) => ({ dari: a + i, ke: a + i + 1, label: "+1" }));
    if (a < 10 && c > 10) return [{ dari: a, ke: 10, label: `+${10 - a}` }, { dari: 10, ke: c, label: `+${c - 10}` }];
    return [{ dari: a, ke: c, label: `+${b}` }];
  }
  const c = a - b;
  if (strategi === "satuan") return Array.from({ length: b }, (_, i) => ({ dari: a - i, ke: a - i - 1, label: "−1" }));
  if (a > 10 && c < 10) return [{ dari: a, ke: 10, label: `−${a - 10}` }, { dari: 10, ke: c, label: `−${10 - c}` }];
  return [{ dari: a, ke: c, label: `−${b}` }];
}

export function kalimatLoncat(p: Loncat, op: Op): string {
  if (op === "tambah") return `${p.a} + ${p.b} = ${p.a + p.b}`;
  if (op === "kurang") return `${p.a} − ${p.b} = ${p.a - p.b}`;
  const besar = Math.max(p.a, p.b);
  const kecil = Math.min(p.a, p.b);
  return `${besar} − ${kecil} = ${besar - kecil}`;
}

/** Catatan langkah, misalnya "8 → 10 (+2), 10 → 13 (+3)". */
export function catatanLoncat(hops: Hop[]): string {
  return hops.map((h) => `${h.dari} → ${h.ke} (${h.label})`).join(", ");
}

export function ucapanLoncat(p: Loncat, op: Op, strategi: Strategi): string {
  const hops = rencana(p, op, strategi);
  const c = hasilLoncat(p, op);
  if (op === "selisih") {
    return p.a === p.b ? `${p.a} dan ${p.b} sama besar. Selisihnya nol.` : `Selisih ${p.a} dan ${p.b} adalah ${c}. Dari ${Math.min(p.a, p.b)} ke ${Math.max(p.a, p.b)} jaraknya ${c}.`;
  }
  const kata = op === "tambah" ? "ditambah" : "dikurangi";
  const cara = strategi === "satuan" ? `Meloncat satu-satu, ada ${hops.length} lompatan.` : hops.length === 2 ? `Loncat ke sepuluh dulu, lalu sisanya. Hanya ${hops.length} lompatan.` : `Tidak melewati sepuluh, jadi cukup ${hops.length} lompatan.`;
  return `${p.a} ${kata} ${p.b} sama dengan ${c}. ${cara}`;
}
