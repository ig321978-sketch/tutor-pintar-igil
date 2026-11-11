/* Logika murni Simulasi "Banding dan Urutan" (Bab 5, Sub-Bab D). Tanpa React, tanpa jaringan. */

export const ORANG = ["Kira", "Tika", "Wei"] as const;
export const MAKS = 20;
export const AWAL: [number, number, number] = [12, 15, 9];

/** Tiga pasangan yang bisa dibandingkan, sebagai indeks ke ORANG. */
export const PASANGAN: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
];

export const batasBanding = (n: number) => Math.max(0, Math.min(MAKS, Math.round(n)));

export type Simbol = "<" | ">" | "=";
export const simbol = (a: number, b: number): Simbol => (a < b ? "<" : a > b ? ">" : "=");

/** Kalimat perbandingan dua orang, memakai kata lebih banyak, lebih sedikit, atau sama banyak. */
export function kalimatDua(namaA: string, a: number, namaB: string, b: number): string {
  if (a === b) return `${namaA} dan ${namaB} sama banyak, masing-masing ${a}.`;
  const [banyak, sedikit, nb, ns] = a > b ? [namaA, namaB, a, b] : [namaB, namaA, b, a];
  return `${banyak} punya ${nb}, ${sedikit} punya ${ns}. ${banyak} lebih banyak. ${sedikit} lebih sedikit.`;
}

/** Berpasangan satu-satu: yang berpasangan sebanyak yang lebih sedikit, sisanya milik yang lebih banyak. */
export function pasangkan(a: number, b: number): { berpasangan: number; sisa: number; pemilikSisa: "a" | "b" | null } {
  return { berpasangan: Math.min(a, b), sisa: Math.abs(a - b), pemilikSisa: a === b ? null : a > b ? "a" : "b" };
}

export function kalimatPasangan(namaA: string, a: number, namaB: string, b: number): string {
  const p = pasangkan(a, b);
  if (p.pemilikSisa === null) return `Semua jeruk berpasangan, tidak ada sisa. ${namaA} dan ${namaB} sama banyak.`;
  const pemilik = p.pemilikSisa === "a" ? namaA : namaB;
  const lain = p.pemilikSisa === "a" ? namaB : namaA;
  return `${p.berpasangan} jeruk berpasangan. ${pemilik} punya sisa ${p.sisa}, jadi ${pemilik} lebih banyak dari ${lain}.`;
}

function sebutNama(nama: string[]): string {
  if (nama.length === 1) return nama[0];
  if (nama.length === 2) return `${nama[0]} dan ${nama[1]}`;
  return `${nama.slice(0, -1).join(", ")}, dan ${nama[nama.length - 1]}`;
}

export function indeksTerbanyak(jumlah: number[]): number[] {
  const m = Math.max(...jumlah);
  return jumlah.map((x, i) => (x === m ? i : -1)).filter((i) => i >= 0);
}

export function indeksTersedikit(jumlah: number[]): number[] {
  const m = Math.min(...jumlah);
  return jumlah.map((x, i) => (x === m ? i : -1)).filter((i) => i >= 0);
}

/** Siapa paling banyak dan paling sedikit. Bila ada yang sama, semuanya disebut. */
export function kalimatPaling(jumlah: number[]): string {
  const banyak = indeksTerbanyak(jumlah);
  const sedikit = indeksTersedikit(jumlah);
  if (banyak.length === jumlah.length) return `Ketiganya sama banyak, masing-masing ${jumlah[0]}.`;
  const nb = sebutNama(banyak.map((i) => ORANG[i]));
  const ns = sebutNama(sedikit.map((i) => ORANG[i]));
  return `Paling banyak: ${nb} (${jumlah[banyak[0]]}). Paling sedikit: ${ns} (${jumlah[sedikit[0]]}).`;
}

/** Urutan dari terkecil atau terbesar. Yang sama banyak tetap berurutan sesuai nama. */
export function urutkan(jumlah: number[], naik: boolean): { nama: string; n: number }[] {
  const daftar = jumlah.map((n, i) => ({ nama: ORANG[i] as string, n, i }));
  daftar.sort((p, q) => (naik ? p.n - q.n : q.n - p.n) || p.i - q.i);
  return daftar.map(({ nama, n }) => ({ nama, n }));
}

export function kalimatUrut(jumlah: number[], naik: boolean): string {
  const u = urutkan(jumlah, naik);
  return `${naik ? "Dari terkecil" : "Dari terbesar"}: ${u.map((x) => x.n).join(", ")}.`;
}

export function ucapanPasang(jumlah: number[], pasang: [number, number], dengan: { pasangan: boolean; tanda: boolean }): string {
  const [i, j] = pasang;
  const a = jumlah[i];
  const b = jumlah[j];
  const bagian: string[] = [];
  if (dengan.pasangan) bagian.push(kalimatPasangan(ORANG[i], a, ORANG[j], b));
  if (dengan.tanda) bagian.push(`${a} ${simbol(a, b) === "<" ? "lebih kecil dari" : simbol(a, b) === ">" ? "lebih besar dari" : "sama dengan"} ${b}.`);
  return bagian.join(" ");
}

export function ucapanTiga(jumlah: number[], dengan: { paling: boolean; urut: boolean }): string {
  const bagian: string[] = [];
  if (dengan.paling) bagian.push(kalimatPaling(jumlah));
  if (dengan.urut) bagian.push(`${kalimatUrut(jumlah, true)} ${kalimatUrut(jumlah, false)}`);
  return bagian.join(" ");
}
