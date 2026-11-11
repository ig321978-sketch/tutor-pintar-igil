/**
 * Lab Pola Segitiga (Kelas 2 Bab 3, Sub-Bab B): model PhET.
 * Satu segi banyak beraturan (3 sampai 8 sisi) diurai menjadi segitiga dengan dua cara:
 * garis dari satu pojok (n − 2 segitiga) atau garis dari titik tengah ke setiap pojok (n segitiga).
 * Gambar, daftar segitiga, tabel pola, dan kalimat berubah bersama.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b3.mjs.
 */

export type Titik = [number, number];

export const MIN_N = 3;
export const MAKS_N = 8;
export const AWAL_N = 4;

export type CaraPola = "pojok" | "tengah";

export const URUT_CARA: CaraPola[] = ["pojok", "tengah"];

export const NAMA_CARA: Record<CaraPola, string> = {
  pojok: "Dari satu pojok",
  tengah: "Dari titik tengah",
};

export const NAMA_N: Record<number, string> = {
  3: "Segitiga",
  4: "Segi empat",
  5: "Segi lima",
  6: "Segi enam",
  7: "Segi tujuh",
  8: "Segi delapan",
};

export const batasN = (n: number) => Math.max(MIN_N, Math.min(MAKS_N, Math.round(n)));

export const banyakSegitiga = (n: number, cara: CaraPola) => (cara === "pojok" ? n - 2 : n);

/** Titik sudut segi banyak beraturan; titik pertama di atas, searah jarum jam. */
export function titikPola(n: number, jari: number, pusat: Titik = [0, 0]): Titik[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
    return [pusat[0] + jari * Math.cos(a), pusat[1] + jari * Math.sin(a)] as Titik;
  });
}

/** Garis pengurai sebagai pasangan titik. Indeks −1 berarti titik tengah. */
export function garisPola(n: number, cara: CaraPola): [number, number][] {
  if (cara === "pojok") return Array.from({ length: Math.max(0, n - 3) }, (_, k) => [0, k + 2] as [number, number]);
  return Array.from({ length: n }, (_, i) => [-1, i] as [number, number]);
}

/** Tiap segitiga sebagai tiga indeks titik (−1 = titik tengah). */
export function segitigaPola(n: number, cara: CaraPola): number[][] {
  if (cara === "pojok") return Array.from({ length: n - 2 }, (_, k) => [0, k + 1, k + 2]);
  return Array.from({ length: n }, (_, i) => [-1, i, (i + 1) % n]);
}

export function titikSegitiga(n: number, cara: CaraPola, jari: number, pusat: Titik = [0, 0]): Titik[][] {
  const t = titikPola(n, jari, pusat);
  return segitigaPola(n, cara).map((tri) => tri.map((i) => (i < 0 ? pusat : t[i])));
}

export function luasSegi(t: Titik[]): number {
  let s = 0;
  for (let i = 0; i < t.length; i += 1) {
    const q = t[(i + 1) % t.length];
    s += t[i][0] * q[1] - q[0] * t[i][1];
  }
  return Math.abs(s) / 2;
}

export type BarisPola = { n: number; nama: string; pojok: number; tengah: number };

export const tabelPola = (): BarisPola[] =>
  Array.from({ length: MAKS_N - MIN_N + 1 }, (_, i) => {
    const n = MIN_N + i;
    return { n, nama: NAMA_N[n], pojok: banyakSegitiga(n, "pojok"), tengah: banyakSegitiga(n, "tengah") };
  });

/** Rumus tertulis untuk satu pilihan. */
export const rumusPola = (n: number, cara: CaraPola) => (cara === "pojok" ? `${n} − 2 = ${n - 2}` : `${n} segitiga, sama dengan banyak sisinya`);

export function kalimatPola(n: number, cara: CaraPola): string {
  const t = banyakSegitiga(n, cara);
  const nama = NAMA_N[n].toLowerCase();
  if (cara === "pojok") {
    return n === 3
      ? `Segitiga sudah berupa 1 segitiga. Dari satu pojok tidak perlu garis: 3 − 2 = 1.`
      : `Dari satu pojok, ${nama} diurai menjadi ${t} segitiga. Banyak sisi dikurangi dua: ${n} − 2 = ${t}.`;
  }
  return `Dari titik tengah ke setiap pojok, ${nama} diurai menjadi ${t} segitiga. Banyaknya sama dengan banyak sisi: ${n}.`;
}

export const selisihCara = (n: number) => banyakSegitiga(n, "tengah") - banyakSegitiga(n, "pojok");

export function ucapanPola(n: number, cara: CaraPola, banding: boolean): string {
  const dasar = kalimatPola(n, cara);
  if (!banding) return dasar;
  const lain: CaraPola = cara === "pojok" ? "tengah" : "pojok";
  return `${dasar} Cara lainnya menghasilkan ${banyakSegitiga(n, lain)} segitiga, selisihnya ${selisihCara(n)}.`;
}
