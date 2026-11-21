/**
 * Logika murni bundel tiket Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari": lima kolom (puluh ribuan, ribuan, ratusan, puluhan, satuan) dengan bundel
 * kardus, dus, pak, ikat, dan lembar; uraian, tukar sepuluh antar kolom, susunan, dan tata letak bundel pada rak. Tanpa React dan tanpa jaringan;
 * diuji di Node: scripts/uji-bundel-k5b1c.mjs. Banyak bundel pada gambar DIGAMBAR sungguh sebanyak datanya (tataBundel).
 * Bilangan sampai sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan (lima angka); seratus ribu tidak dipakai di Sub-Bab ini.
 */

export type Kolom = { bundel: string; tempat: string; bobot: number; ikon: string };

/** Lima kolom dari kiri ke kanan. `bobot` = banyak tiket dalam satu bundel (banyak yang diwakili angka di kolom itu). */
export const KOLOM: readonly Kolom[] = [
  { bundel: "kardus", tempat: "puluh ribuan", bobot: 10000, ikon: "\u{1F4E6}" },
  { bundel: "dus", tempat: "ribuan", bobot: 1000, ikon: "\u{1F381}" },
  { bundel: "pak", tempat: "ratusan", bobot: 100, ikon: "\u{1F3AB}" },
  { bundel: "ikat", tempat: "puluhan", bobot: 10, ikon: "\u{1F380}" },
  { bundel: "lembar", tempat: "satuan", bobot: 1, ikon: "\u{1F4C4}" },
];
export const BANYAK_KOLOM = KOLOM.length;
export const NAMA_BUNDEL: readonly string[] = KOLOM.map((k) => k.bundel);
export const NAMA_TEMPAT: readonly string[] = KOLOM.map((k) => k.tempat);

/** Susunan = banyak bundel tiap kolom (kardus, dus, pak, ikat, lembar). Boleh lebih dari sembilan sesudah penukaran. */
export type Susunan = number[];

/** Lambang dengan titik pemisah ribuan: 24350 menjadi "24.350". */
export const lambang = (n: number): string => {
  const s = String(n);
  return n >= 1000 ? `${s.slice(0, -3)}.${s.slice(-3)}` : s;
};

/** Susunan standar sebuah bilangan (satu angka tiap kolom), dihitung dengan pembagian. */
export const susunanDari = (n: number): Susunan => KOLOM.map((k) => Math.floor(n / k.bobot) % 10);
/** Jumlah seluruh tiket pada susunan. */
export const totalSusunan = (s: Susunan): number => s.reduce((t, c, i) => t + c * KOLOM[i].bobot, 0);
/** Apakah susunan memuat paling banyak sembilan bundel tiap kolom (bentuk biasa)? */
export const bentukBiasa = (s: Susunan): boolean => s.every((c) => c >= 0 && c <= 9);
/** Indeks kolom yang berisi nol pada bilangan standar. */
export const kolomNol = (n: number): number[] => susunanDari(n).map((c, i) => (c === 0 ? i : -1)).filter((i) => i >= 0);
/** Banyak angka nol pada bilangan lima kolom. */
export const banyakNol = (n: number): number => kolomNol(n).length;

/** Bagian uraian tiap kolom yang tidak nol, mis. 24350 menjadi ["20.000", "4.000", "300", "50"]. */
export const bagianUraian = (n: number): string[] => susunanDari(n).flatMap((c, i) => (c === 0 ? [] : [lambang(c * KOLOM[i].bobot)]));
export const teksUraian = (n: number): string => bagianUraian(n).join(" + ");

/** "2 kardus, 4 dus, 3 pak, 5 ikat" (kolom kosong dilewati). */
export const teksSusunan = (s: Susunan): string =>
  s
    .flatMap((c, i) => (c === 0 ? [] : [`${c} ${KOLOM[i].bundel}`]))
    .join(", ");

/* ------------------------------ Tukar sepuluh ------------------------------ */
/** Tukar satu bundel kolom `i` dengan sepuluh bundel kolom `i + 1`. Null bila tidak ada bundel untuk ditukar. */
export function tukarTurun(s: Susunan, i: number): Susunan | null {
  if (i < 0 || i >= BANYAK_KOLOM - 1 || s[i] < 1) return null;
  return s.map((c, j) => (j === i ? c - 1 : j === i + 1 ? c + 10 : c));
}
/** Tukar sepuluh bundel kolom `i + 1` dengan satu bundel kolom `i`. Null bila bundelnya kurang dari sepuluh. */
export function tukarNaik(s: Susunan, i: number): Susunan | null {
  if (i < 0 || i >= BANYAK_KOLOM - 1 || s[i + 1] < 10) return null;
  return s.map((c, j) => (j === i ? c + 1 : j === i + 1 ? c - 10 : c));
}
export const samaSusunan = (a: Susunan, b: Susunan): boolean => a.length === b.length && a.every((c, i) => c === b[i]);

/* ------------------------------ Pengecoh yang masuk akal ------------------------------ */
/** Uraian keliru: angka terakhir yang bukan nol dipindah satu kolom ke kiri (mis. lima menjadi lima puluh). */
export function uraianGeserKiri(n: number): string {
  const s = susunanDari(n);
  const k = s.map((c, i) => (c > 0 ? i : -1)).filter((i) => i >= 0).pop() ?? 0;
  if (k === 0) return teksUraian(n);
  return susunanDari(n).flatMap((c, i) => (c === 0 ? [] : [lambang(c * KOLOM[i === k ? k - 1 : i].bobot)])).join(" + ");
}
/** Uraian keliru: satu bagian kehilangan satu nol (mis. dua ratus menjadi dua puluh). */
export function uraianKurangNol(n: number): string {
  const s = susunanDari(n);
  const k = s.map((c, i) => (c > 0 ? i : -1)).filter((i) => i >= 0 && i <= BANYAK_KOLOM - 2)[1] ?? 0;
  return s.flatMap((c, i) => (c === 0 ? [] : [lambang(c * KOLOM[i === k ? Math.min(BANYAK_KOLOM - 1, k + 1) : i].bobot)])).join(" + ");
}
/** Bilangan keliru: satu angka nol hilang (mis. 60.904 menjadi 6.904). */
export function bilanganTanpaNol(n: number): number {
  const t = String(n).split("");
  const i = t.indexOf("0");
  if (i < 0) return n;
  t.splice(i, 1);
  return Number(t.join(""));
}
/** Bilangan keliru: nol pertama bertukar tempat dengan angka sesudahnya (mis. 60.904 menjadi 60.094). */
export function bilanganNolBergeser(n: number): number {
  const t = String(n).split("");
  const i = t.indexOf("0");
  if (i < 0 || i >= t.length - 1) return n;
  [t[i], t[i + 1]] = [t[i + 1], t[i]];
  return Number(t.join(""));
}

/* ------------------------------ Tata letak rak (kanvas 300 lebar) ------------------------------ */
export const TATA = { xNama: 8, xBundel: 90, barisTinggi: 32, atas: 26, lebar: 300, ruang: 204, maksCell: 22 } as const;
/** Tinggi gambar bundel tiap kolom (kardus paling besar). */
export const TINGGI_BUNDEL: readonly number[] = [24, 20, 16, 13, 9];
export type Pt = { x: number; y: number };
export type BarisBundel = { bundel: string; banyak: number; y: number; cell: number; sel: Pt[] };
export type TataBundel = { baris: BarisBundel[]; tinggi: number };

/** Titik tengah tiap bundel, sungguh sebanyak banyak bundel pada kolomnya. Lebar sel menyempit bila bundelnya banyak, supaya muat satu baris. */
export function tataBundel(s: Susunan): TataBundel {
  const baris = s.map((banyak, r): BarisBundel => {
    const y = TATA.atas + r * TATA.barisTinggi + TATA.barisTinggi / 2;
    const cell = banyak > 0 ? Math.min(TATA.maksCell, Math.floor(TATA.ruang / banyak)) : 0;
    return { bundel: KOLOM[r].bundel, banyak, y, cell, sel: Array.from({ length: banyak }, (_, i) => ({ x: TATA.xBundel + i * cell + cell / 2, y })) };
  });
  return { baris, tinggi: TATA.atas + s.length * TATA.barisTinggi + 8 };
}
