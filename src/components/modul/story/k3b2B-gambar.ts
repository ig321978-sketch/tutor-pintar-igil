import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 2 Sub-Bab B (Kalimat Matematika Pengurangan): deret permen (bulatan), bagan bilangan awal dan bagian,
 * tabel, bungkus sepuluh, kartu pilihan. Berkas ini TIDAK dipakai bab lain.
 *
 * Id yang dikenali uji (dihitung ulang dari gambar):
 *  bagan `${p}`: batang atas `${p}_T` dengan angka `${p}_Tn`, bagian kiri `${p}_A` dengan `${p}_An`, bagian kanan `${p}_B` dengan `${p}_Bn`;
 *  tabel: sel `${p}_c{i}_{j}` dengan teks `${p}_r{i}_{j}`, kepala `${p}_h{j}`;
 *  deret permen: `${p}_{i}`; bungkus sepuluh: `${p}_k{i}` (bungkus), `${p}_o{i}` (butir lepas).
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  jingga: "#F97316",
  biruGambar: "#2563EB",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan atau kartu angka: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/** Tiga kartu pilihan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. */
export const pilihan = (y: number, isi: string[], u = 18): Obj[] =>
  isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, [14, 107, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], 86, 34, u));

/** Kalimat Matematika di tengah, id `id`. Warna merah bila `besar`. */
export const kalimat = (id: string, y: number, isi: string, u = 22, warna: string = W.biru): Obj => teks(id, 150, y, isi, u, warna);

/* ------------------------------ Deret permen ------------------------------ */

/** Deret `n` bulatan (permen) mulai di (x, y), sepuluh per baris; id `${p}_${i}`. */
export function deret(p: string, n: number, x: number, y: number, warna: string, o: { r?: number; jarak?: number; per?: number } = {}): Obj[] {
  const r = o.r ?? 6;
  const jarak = o.jarak ?? 15;
  const per = o.per ?? 10;
  return Array.from({ length: n }, (_, i) => bulat(`${p}_${i}`, x + r + (i % per) * jarak, y + r + Math.floor(i / per) * jarak, r, warna, W.biru));
}
export const idDeret = (p: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${p}_${i}`);

/* ------------------------------ Bagan bilangan awal dan bagian ------------------------------ */

export type OpsiBagan = { x?: number; y?: number; w?: number; h?: number; atas: string; a: string; b: string; fa?: number; u?: number };
export type Bagan = { p: string; atas: Obj[]; a: Obj[]; b: Obj[]; idAtas: string[]; idA: string[]; idB: string[]; semua: Obj[]; yBawah: number };

/**
 * Batang atas = bilangan awal. Dua batang di bawahnya = bagian yang dikurangkan (kiri) dan sisa (kanan). Angka "?" ditulis merah.
 * `fa` = bagian lebar batang kiri (0 sampai 1) mengikuti perbandingan bilangan yang sebenarnya.
 */
export function bagan(p: string, o: OpsiBagan): Bagan {
  const x = o.x ?? 30;
  const y = o.y ?? 40;
  const w = o.w ?? 240;
  const h = o.h ?? 30;
  const u = o.u ?? 18;
  const fa = Math.max(0.22, Math.min(0.78, o.fa ?? 0.5));
  const wa = Math.round(w * fa);
  const yb = y + h + 8;
  const isi = (id: string, cx: number, cy: number, t: string) => teks(id, cx, cy + u * 0.35, t, u, t === "?" ? W.merah : W.biru);
  const atas = [kotak(`${p}_T`, x, y, w, h, W.emas, W.biru, { rx: 5, tebal: 1.8 }), isi(`${p}_Tn`, x + w / 2, y + h / 2, o.atas)];
  const a = [kotak(`${p}_A`, x, yb, wa, h, W.hijauMuda, W.biru, { rx: 5, tebal: 1.8 }), isi(`${p}_An`, x + wa / 2, yb + h / 2, o.a)];
  const b = [kotak(`${p}_B`, x + wa, yb, w - wa, h, W.langit, W.biru, { rx: 5, tebal: 1.8 }), isi(`${p}_Bn`, x + wa + (w - wa) / 2, yb + h / 2, o.b)];
  return { p, atas, a, b, idAtas: atas.map((q) => q.id), idA: a.map((q) => q.id), idB: b.map((q) => q.id), semua: [...atas, ...a, ...b], yBawah: yb + h };
}

/* ------------------------------ Tabel ------------------------------ */

export type Tabel = { p: string; kepala: Obj[]; baris: (i: number) => Obj[]; sel: (i: number, j: number) => Obj[]; idBaris: (i: number) => string[]; tinggiAkhir: number };

/** Tabel `kolom.length` kolom; sel "?" ditulis merah. Id sel `${p}_c{i}_{j}`, teks `${p}_r{i}_{j}`, kepala `${p}_h{j}`. */
export function tabel(p: string, kolom: string[], isi: string[][], o: { x?: number; y?: number; w?: number; h?: number; u?: number } = {}): Tabel {
  const x = o.x ?? 20;
  const y = o.y ?? 34;
  const w = o.w ?? 260;
  const h = o.h ?? 26;
  const u = o.u ?? 14;
  const lebar = w / kolom.length;
  const kepala = kolom.flatMap((t, j) => [
    kotak(`${p}_hk${j}`, x + j * lebar, y, lebar, h, W.hijauMuda, W.biru, { rx: 0 }),
    teks(`${p}_h${j}`, x + j * lebar + lebar / 2, y + h / 2 + 3.4, t, 9.6, W.biru),
  ]);
  const sel = (i: number, j: number): Obj[] => [
    kotak(`${p}_c${i}_${j}`, x + j * lebar, y + h * (i + 1), lebar, h, W.krem, W.biru, { rx: 0 }),
    teks(`${p}_r${i}_${j}`, x + j * lebar + lebar / 2, y + h * (i + 1) + h / 2 + u * 0.35, isi[i][j], u, isi[i][j] === "?" ? W.merah : W.biru),
  ];
  return {
    p,
    kepala,
    baris: (i) => kolom.flatMap((_, j) => sel(i, j)),
    sel,
    idBaris: (i) => kolom.flatMap((_, j) => [`${p}_c${i}_${j}`, `${p}_r${i}_${j}`]),
    tinggiAkhir: y + h * (isi.length + 1),
  };
}

/* ------------------------------ Bungkus sepuluh ------------------------------ */

/**
 * `bungkus` bungkus berisi sepuluh (kotak berpita) dan `lepas` butir lepas, mulai di (x, y); id `${p}_k{i}` dan `${p}_o{i}`.
 * `warna` untuk bungkus dan butir lepas.
 */
export function bungkus(p: string, jumlah: number, lepas: number, x: number, y: number, warna: string, o: { w?: number; h?: number; jarak?: number } = {}): { bungkus: Obj[]; butir: Obj[]; idBungkus: string[]; idButir: string[] } {
  const w = o.w ?? 28;
  const h = o.h ?? 26;
  const jarak = o.jarak ?? 4;
  const bungkusObj = Array.from({ length: jumlah }, (_, i) => kotak(`${p}_k${i}`, x + i * (w + jarak), y, w, h, warna, W.biru, { rx: 4, tebal: 1.6 }));
  const butir = Array.from({ length: lepas }, (_, i) => bulat(`${p}_o${i}`, x + 6 + i * 13, y + h + 14, 5, warna, W.biru));
  return { bungkus: bungkusObj, butir, idBungkus: bungkusObj.map((q) => q.id), idButir: butir.map((q) => q.id) };
}
