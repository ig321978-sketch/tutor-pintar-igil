import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 1 Sub-Bab A (menghitung, membaca, dan menulis bilangan sampai lima puluh):
 * benda bergambar (emoji) dalam baris atau kotak sepuluh, batang puluhan dan kubus satuan, jalur bilangan, dan garis bilangan.
 * Berkas ini TIDAK dipakai bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Benda kelompok `e{huruf}`: benda ke-i `e{huruf}{i}`; nama `e{huruf}-nm`; banyaknya `e{huruf}-ln`; angka hitungan `e{huruf}n{i}`.
 * - Kotak sepuluh `fr{huruf}{f}` (kotak luar) dengan garis dalam `fr{huruf}{f}-v1..4` dan `-h`; benda ke-i ada di kotak f = i div 10, petak i mod 10
 *   (lima petak tiap baris, dua baris). Angka jumlah sampai kotak f: `fn{huruf}{f}`.
 * - Batang puluhan `p{huruf}{i}-k` (isi `-t`: "10"); kubus satuan `s{huruf}{i}`; nilai bilangan `v{huruf}`.
 * - Jalur bilangan: petak `nl{i}-k` dan angka `nl{i}` (tanda tanya bila disembunyikan); angka langkah `nln{i}`.
 * - Garis bilangan: garis `gl`, tanda `gb{i}-k`, angka `gb{i}`; loncatan `jp{i}` (panah) dan angka loncatan `jl{i}`.
 * - Daftar bilangan: lambang `dl{i}` dan nama `dm{i}`.
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
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka atau kata besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Benda bergambar ------------------------------ */

export const EMO_TAS = "\u{1F392}";
export const EMO_BIRU = "\u{1F535}";
export const EMO_MERAH = "\u{1F534}";
export const EMO_APEL = "\u{1F34E}";
export const EMO_JERUK = "\u{1F34A}";
export const EMO_BALON = "\u{1F388}";
export const EMO_BALOK = "\u{1F9F1}";

/** Satu benda bergambar: `e{huruf}{i}`, titik (x, y) = garis dasar tulisan. */
export const benda = (key: string, i: number, x: number, y: number, e: string, u = 18): Obj => emo(`e${key}${i}`, x, y, e, u);

/** Titik pusat benda (di atas garis dasar) untuk hitungan: angka muncul di atasnya. */
export const pusatBenda = (pts: Titik[], u = 18): Titik[] => pts.map((p) => ({ x: p.x, y: p.y - u * 0.35 }));

/** Titik baris-baris: `n` benda, `perBaris` benda tiap baris, dari (x0, y0) dengan jarak dx dan dy (garis dasar). */
export const titikGrid = (n: number, x0: number, y0: number, dx: number, dy: number, perBaris = 10): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + (i % perBaris) * dx, y: y0 + Math.floor(i / perBaris) * dy }));

/** Benda satu kelompok pada titik-titik tertentu. */
export const bendaDi = (key: string, e: string, pts: Titik[], u = 18): Obj[] => pts.map((p, i) => benda(key, i, p.x, p.y, e, u));

/** Nama kelompok; id `e{huruf}-nm`. */
export const namaG = (key: string, x: number, y: number, isi: string): Obj => teks(`e${key}-nm`, x, y, isi, 8.6, W.biru, { anchor: "start" });

/** Banyaknya benda (angka); id `e{huruf}-ln`. */
export const jumlahG = (key: string, x: number, y: number, isi: string, u = 13): Obj => teks(`e${key}-ln`, x, y, isi, u, W.merah);

/* ------------------------------ Kotak sepuluh ------------------------------ */

export type Kotak10 = { x: number; y: number; c: number };

/** Letak kotak sepuluh ke-f (tiga kotak tiap baris, petak 18): pojok kiri-atas. */
export const letakKotak = (f: number, y0 = 50, c = 18): Kotak10 => ({ x: 8 + (f % 3) * 98, y: y0 + Math.floor(f / 3) * (2 * c + 14), c });

/** Kerangka kotak sepuluh: lima petak kali dua baris. Kotak luar `fr{key}{f}`; berada di belakang benda. */
export function kotakSepuluh(key: string, f: number, g: Kotak10): Obj[] {
  const id = `fr${key}${f}`;
  const garisDalam = (s: string, x: number, y: number, x2: number, y2: number): Obj => garis(`${id}-${s}`, x, y, x2, y2, W.abu, 1.2, { z: -1 });
  return [
    kotak(id, g.x, g.y, 5 * g.c, 2 * g.c, W.putih, W.biru, { rx: 2, tebal: 1.8, z: -2 }),
    ...[1, 2, 3, 4].map((i) => garisDalam(`v${i}`, g.x + i * g.c, g.y, 0, 2 * g.c)),
    garisDalam("h", g.x, g.y + g.c, 5 * g.c, 0),
  ];
}

/** Titik (garis dasar) benda ke-i, yang menempati petak i mod 10 pada kotak sepuluh `g`. */
export const titikPetak = (i: number, g: Kotak10, u = 15): Titik => {
  const p = i % 10;
  return { x: g.x + (p % 5) * g.c + g.c / 2, y: g.y + Math.floor(p / 5) * g.c + g.c / 2 + u * 0.35 };
};

/** Titik benda ke-i di kotak sepuluh (kotak diletakkan menurut `y0` dan `c`). */
export const titikKotak = (i: number, y0 = 50, c = 18, u = 15): Titik => titikPetak(i, letakKotak(Math.floor(i / 10), y0, c), u);

/** Angka jumlah sampai kotak f: `fn{key}{f}`, di bawah kotak. */
export const angkaKotak = (key: string, f: number, isi: string, y0 = 50, c = 18): Obj => {
  const g = letakKotak(f, y0, c);
  return teks(`fn${key}${f}`, g.x + (5 * c) / 2, g.y + 2 * c + 10, isi, 10, W.merah);
};

/* ------------------------------ Batang puluhan dan kubus satuan ------------------------------ */

/** Batang puluhan ke-i: kotak tegak berisi 10 (id `p{key}{i}-k` dan `p{key}{i}-t`). */
export function batangP(key: string, i: number, x0 = 30, y = 46): Obj[] {
  const x = x0 + i * 22;
  return [kotak(`p${key}${i}-k`, x, y, 15, 46, W.langit, W.biru, { rx: 2, tebal: 1.5 }), teks(`p${key}${i}-t`, x + 7.5, y + 27, "10", 7.5, W.biru)];
}

/** Kubus satuan ke-i (id `s{key}{i}`), tersusun lima kubus tiap baris. */
export const kubusS = (key: string, i: number, x0 = 170, y = 56): Obj => kotak(`s${key}${i}`, x0 + (i % 5) * 18, y + Math.floor(i / 5) * 18, 13, 13, W.emas, W.biru, { rx: 2, tebal: 1.3 });

/** Nilai bilangan yang diwakili batang dan kubus; id `v{key}`. */
export const nilaiV = (key: string, isi: string, x = 150, y = 124): Obj => teks(`v${key}`, x, y, isi, 24, W.merah);

/* ------------------------------ Jalur bilangan ------------------------------ */

/** Jalur bilangan: petak berurutan bernilai `nilai` (teks "?" bila disembunyikan), lebar petak w, tinggi 26, di tinggi y. */
export function jalur(nilai: (number | string)[], y = 70, w = 26): Obj[] {
  const x0 = (300 - nilai.length * w) / 2;
  const u = w >= 40 ? 13 : 10;
  return nilai.flatMap((v, i) => [kotak(`nl${i}-k`, x0 + i * w, y, w, 26, W.putih, W.biru, { rx: 2, tebal: 1.4 }), teks(`nl${i}`, x0 + i * w + w / 2, y + 17, String(v), u, W.biru)]);
}

/** Titik pusat petak ke-i pada jalur (untuk angka langkah). */
export const pusatPetak = (n: number, i: number, y = 70, w = 26): Titik => ({ x: (300 - n * w) / 2 + i * w + w / 2, y: y + 14 });

/* ------------------------------ Garis bilangan dengan loncatan ------------------------------ */

export const XG = [34, 108, 182, 256];
export const YG = 110;

/** Garis bilangan kosong (garis dasar `gl`). */
export const garisDasar = (): Obj => garis("gl", 14, YG, 272, 0, W.biru, 2.4);

/** Tanda ke-i pada garis bilangan, bernilai v. */
export const tandaG = (i: number, v: string): Obj[] => [garis(`gb${i}-k`, XG[i], YG - 6, 0, 12, W.biru, 2.4), teks(`gb${i}`, XG[i], YG + 24, v, 12, W.biru)];

/** Loncatan dari tanda i ke tanda i+1: panah `jp{i}` di atas garis dan angka loncatan `jl{i}`. */
export const loncat = (i: number, isi: string): Obj[] => [panah(`jp${i}`, XG[i], YG - 12, XG[i + 1] - XG[i], 0, W.merah, 2.2), teks(`jl${i}`, (XG[i] + XG[i + 1]) / 2, YG - 20, isi, 11, W.merah)];

/* ------------------------------ Daftar lambang dan nama ------------------------------ */

/** Baris daftar ke-i: lambang `dl{i}` di kiri dan nama bilangan `dm{i}` di kanan. */
export const barisDaftar = (i: number, lambang: string, nama: string, y0 = 46): Obj[] => [
  kotak(`dk${i}`, 58, y0 + i * 25, 184, 21, i % 2 === 0 ? W.krem : W.langit, W.abu, { rx: 4, tebal: 1, z: -1 }),
  teks(`dl${i}`, 84, y0 + i * 25 + 15, lambang, 13, W.merah),
  teks(`dm${i}`, 112, y0 + i * 25 + 15, nama, 10.4, W.biru, { anchor: "start" }),
];
