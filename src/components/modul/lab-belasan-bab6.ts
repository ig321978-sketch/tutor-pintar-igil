/**
 * Laboratorium Belasan (Bab 6, Sub-Bab B dan C): menjumlah dan mengurang bilangan belasan dengan satuan
 * memakai pasangan bilangan dan nilai tempat. Satu puluhan tetap, hanya satuan yang berubah.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export type OpBelasan = "tambah" | "kurang";

export type Belasan = { a: number; b: number };

export const MIN_BELASAN = 10;
export const MAKS_BELASAN = 19;

export const satuanDari = (a: number) => a - 10;

/** Batas bawah bilangan awal: pengurangan tanpa meminjam butuh sedikitnya 1 satuan. */
export const minAwal = (op: OpBelasan) => (op === "tambah" ? MIN_BELASAN : MIN_BELASAN + 1);

/** Batas atas bilangan awal: penjumlahan butuh sedikitnya 1 ruang agar hasilnya tetap belasan. */
export const maksAwal = (op: OpBelasan) => (op === "tambah" ? MAKS_BELASAN - 1 : MAKS_BELASAN);

/** Pengurang atau penambah paling banyak berapa agar hasilnya tetap satu puluhan dan tidak sampai 20. */
export function batasB(a: number, op: OpBelasan): number {
  return op === "tambah" ? MAKS_BELASAN - a : satuanDari(a);
}

/** Jepit pasangan agar sah untuk operasi ini. b paling sedikit 1. */
export function rapikanBelasan(m: Belasan, op: OpBelasan): Belasan {
  const a = Math.max(minAwal(op), Math.min(maksAwal(op), Math.round(m.a)));
  const maks = Math.max(1, batasB(a, op));
  const b = Math.max(1, Math.min(maks, Math.round(m.b)));
  return { a, b };
}

export const awalBelasan = (op: OpBelasan): Belasan => (op === "tambah" ? { a: 12, b: 3 } : { a: 15, b: 3 });

export const hasilBelasan = (m: Belasan, op: OpBelasan) => (op === "tambah" ? m.a + m.b : m.a - m.b);

export function uraiBelasan(n: number): { puluhan: number; satuan: number } {
  return { puluhan: Math.floor(n / 10), satuan: n % 10 };
}

export const kalimatBelasan = (m: Belasan, op: OpBelasan) => `${m.a} ${op === "tambah" ? "+" : "−"} ${m.b} = ${hasilBelasan(m, op)}`;

/** Pasangan bilangan: a dipecah jadi 10 dan satuannya, satuan dihitung, lalu 10 digabung lagi. */
export function kalimatPecah(m: Belasan, op: OpBelasan): string[] {
  const s = satuanDari(m.a);
  const h = hasilBelasan(m, op);
  const hs = satuanDari(h);
  return [`${m.a} = 10 + ${s}`, `${s} ${op === "tambah" ? "+" : "−"} ${m.b} = ${hs}`, `10 + ${hs} = ${h}`];
}

/** Memeriksa pengurangan dengan penjumlahan: hasil ditambah yang dikurangkan harus kembali ke bilangan awal. */
export function kalimatPeriksa(m: Belasan): string {
  return `${m.a - m.b} + ${m.b} = ${m.a}`;
}

/** Tabel nilai tempat sebelum dan sesudah. Puluhan tetap 1, hanya satuan yang berubah. */
export function tabelBelasan(m: Belasan, op: OpBelasan): { nama: string; puluhan: number; satuan: number }[] {
  const awal = uraiBelasan(m.a);
  const akhir = uraiBelasan(hasilBelasan(m, op));
  return [
    { nama: `${m.a}`, ...awal },
    { nama: `${hasilBelasan(m, op)}`, ...akhir },
  ];
}

export function ucapanBelasan(m: Belasan, op: OpBelasan, dengan: { tabel: boolean; pecah: boolean; periksa: boolean }): string {
  const h = hasilBelasan(m, op);
  const s = satuanDari(m.a);
  const kata = op === "tambah" ? "ditambah" : "dikurangi";
  const bagian = [`${m.a} ${kata} ${m.b} sama dengan ${h}.`];
  if (dengan.pecah) {
    bagian.push(`${m.a} dipisah menjadi sepuluh dan ${s}.`);
    bagian.push(`${s} ${kata} ${m.b} sama dengan ${satuanDari(h)}.`);
    bagian.push(`Sepuluh ditambah ${satuanDari(h)} sama dengan ${h}.`);
  }
  if (dengan.tabel) bagian.push(`Puluhannya tetap satu. Satuannya berubah dari ${s} menjadi ${satuanDari(h)}.`);
  if (dengan.periksa && op === "kurang") bagian.push(`Periksa: ${h} ditambah ${m.b} sama dengan ${m.a}.`);
  return bagian.join(" ");
}
