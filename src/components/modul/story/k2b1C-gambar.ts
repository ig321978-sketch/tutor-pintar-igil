import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 1 Sub-Bab C (membandingkan dua bilangan atau lebih, sampai lima puluh):
 * permen bergambar, batang puluhan dan kubus satuan, tabel nilai tempat, jalur atau garis bilangan, kartu bilangan.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Benda kelompok `e{huruf}`: benda ke-i `e{huruf}{i}`; nama `e{huruf}-nm`; banyaknya `e{huruf}-ln`; angka hitungan `e{huruf}n{i}`.
 * - Blok bilangan `b{kunci}`: batang puluhan `b{kunci}-p{i}`, kubus satuan `b{kunci}-s{i}`, nama `b{kunci}-nm`, angka `b{kunci}-ln`.
 * - Tabel nilai tempat: kepala `nh-n` `nh-p` `nh-s`; baris `nt{huruf}`: angka `nt{huruf}-n`, puluhan `nt{huruf}-p`, satuan `nt{huruf}-s` (kotak `-nk` `-pk` `-sk`).
 * - Garis bilangan `gb{kunci}`: sumbu `gb{kunci}-as`, tanda `gb{kunci}-k{n}`, angka `gb{kunci}-t{n}`, penanda `gb{kunci}-m{n}`,
 *   loncatan ke-i `gb{kunci}-h{i}` (panah) dengan angka `gb{kunci}-hn{i}`.
 * - Kartu bilangan: `{id}-k` (kotak) dan `{id}-t` (angka).
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
  biruMuda: "#7DD3FC",
};

export const OWL = "\u{1F989}";
export const EMO_PERMEN = "\u{1F36C}";
export const EMO_BUAYA = "\u{1F40A}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.5, ...o });
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

/* ------------------------------ Benda bergambar (permen) ------------------------------ */

/** Satu benda bergambar: `e{huruf}{i}`, titik (x, y) = garis dasar tulisan. */
export const benda = (key: string, i: number, x: number, y: number, e: string, u = 18): Obj => emo(`e${key}${i}`, x, y, e, u);
/** Titik pusat benda (di atas garis dasar) untuk hitungan: angka muncul di atasnya. */
export const pusatBenda = (pts: Titik[]): Titik[] => pts.map((p) => ({ x: p.x, y: p.y - 6 }));
/** Titik baris: `n` benda dari x0 dengan jarak dx, garis dasar y. */
export const titikBaris = (n: number, x0: number, y: number, dx = 25): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * dx, y }));
/** Benda satu kelompok pada titik-titik tertentu. */
export const bendaDi = (key: string, e: string, pts: Titik[], u = 18): Obj[] => pts.map((p, i) => benda(key, i, p.x, p.y, e, u));
/** Nama kelompok; id `e{huruf}-nm`. */
export const namaG = (key: string, x: number, y: number, isi: string): Obj => teks(`e${key}-nm`, x, y, isi, 9, W.biru, { anchor: "start" });
/** Banyaknya benda (angka); id `e{huruf}-ln`. */
export const jumlahG = (key: string, x: number, y: number, isi: string): Obj => teks(`e${key}-ln`, x, y, isi, 13, W.merah);

/* ------------------------------ Blok bilangan: batang puluhan dan kubus satuan ------------------------------ */

export const BAR_W = 10;
export const BAR_H = 40;
export const BAR_DX = 13;
export const KUB = 9;
export const KUB_D = 11;

/** Lebar blok bilangan dengan p batang puluhan (kubus selalu lima kolom). */
export const lebarBlok = (p: number): number => BAR_DX * p + 6 + 5 * KUB_D;
export const xKubus = (x: number, p: number, i: number): number => x + BAR_DX * p + 6 + (i % 5) * KUB_D;
export const yKubus = (y: number, i: number): number => y - BAR_H + Math.floor(i / 5) * KUB_D;

/** Blok p batang puluhan dan s kubus satuan; (x, y) = kiri dan garis dasar batang. Kubus disusun lima kolom dari atas. */
export function blok(key: string, p: number, s: number, x: number, y: number): Obj[] {
  return [
    ...Array.from({ length: p }, (_, i) => kotak(`b${key}-p${i}`, x + BAR_DX * i, y - BAR_H, BAR_W, BAR_H, W.oranye, W.biru, { rx: 2, tebal: 1.2 })),
    ...Array.from({ length: s }, (_, i) => kotak(`b${key}-s${i}`, xKubus(x, p, i), yKubus(y, i), KUB, KUB, W.biruMuda, W.biru, { rx: 1.5, tebal: 1 })),
  ];
}
/** Angka bilangan di kiri blok. */
export const angkaBlok = (key: string, x: number, y: number, isi: string): Obj => teks(`b${key}-ln`, x - 8, y - 12, isi, 12, W.merah, { anchor: "end" });
/** Nama pemilik di kiri blok. */
export const namaBlok = (key: string, x: number, y: number, isi: string): Obj => teks(`b${key}-nm`, x - 8, y - 28, isi, 9, W.biru, { anchor: "end" });
/** Semua id sebuah blok (untuk dihapus atau disorot). */
export const idBlok = (key: string, p: number, s: number, dengan: string[] = []): string[] => [...Array.from({ length: p }, (_, i) => `b${key}-p${i}`), ...Array.from({ length: s }, (_, i) => `b${key}-s${i}`), ...dengan.map((d) => `b${key}-${d}`)];
/** Bingkai putus-putus di sekeliling sepuluh kubus pertama (dua baris penuh) dengan angka sepuluh. */
export const bingkaiSepuluh = (id: string, key: string, x: number, y: number, p: number): Obj[] => [
  kotak(`${id}-k`, xKubus(x, p, 0) - 2, yKubus(y, 0) - 2, 5 * KUB_D + 1, 2 * KUB_D + 1, "#FEF3C7", W.merah, { rx: 3, tebal: 1.2, putus: true, z: -1 }),
  teks(`${id}-t`, xKubus(x, p, 0) + (5 * KUB_D) / 2, yKubus(y, 0) - 6, "10", 9, W.merah),
];

/* ------------------------------ Tabel nilai tempat ------------------------------ */

export const NT = { x: 14, w0: 68, w1: 100, w2: 100, rh: 26, y0: 34 };
const ntX = [NT.x, NT.x + NT.w0, NT.x + NT.w0 + NT.w1];
const ntW = [NT.w0, NT.w1, NT.w2];
const NT_KOLOM = ["n", "p", "s"] as const;
export type KolomNT = (typeof NT_KOLOM)[number];

/** Kepala tabel: Bilangan, Puluhan, Satuan. */
export function kepalaNT(): Obj[] {
  const nama = ["Bilangan", "Puluhan", "Satuan"];
  return NT_KOLOM.flatMap((c, i) => [kotak(`nh-${c}-k`, ntX[i], NT.y0, ntW[i], NT.rh, W.lavender, W.biru, { rx: 2, tebal: 1.3 }), teks(`nh-${c}`, ntX[i] + ntW[i] / 2, NT.y0 + NT.rh / 2 + 3.5, nama[i], 9.4, W.biru)]);
}
/** Kotak kosong baris ke-r (mulai 0) dengan huruf `key`. */
export function rangkaNT(key: string, r: number): Obj[] {
  const y = NT.y0 + NT.rh * (r + 1);
  return NT_KOLOM.map((c, i) => kotak(`nt${key}-${c}k`, ntX[i], y, ntW[i], NT.rh, i === 0 ? W.putih : W.krem, W.biru, { rx: 2, tebal: 1.3 }));
}
/** Isi satu sel baris r: kolom n (bilangan), p (puluhan), atau s (satuan). */
export const isiNT = (key: string, r: number, c: KolomNT, isi: string): Obj => {
  const i = NT_KOLOM.indexOf(c);
  return teks(`nt${key}-${c}`, ntX[i] + ntW[i] / 2, NT.y0 + NT.rh * (r + 1) + NT.rh / 2 + 5, isi, c === "n" ? 12 : 14, c === "n" ? W.biru : W.merah);
};
/** Id sel (kotak dan angka) satu kolom baris `key`. */
export const selNT = (key: string, c: KolomNT): string[] => [`nt${key}-${c}k`, `nt${key}-${c}`];

/* ------------------------------ Garis bilangan ------------------------------ */

export type GeoG = { x0: number; y: number; dx: number; dari: number; sampai: number };
export const xBil = (g: GeoG, n: number): number => g.x0 + (n - g.dari) * g.dx;

/** Sumbu, tanda, dan angka garis bilangan dari g.dari sampai g.sampai. */
export function garisBil(key: string, g: GeoG): Obj[] {
  const out: Obj[] = [garis(`gb${key}-as`, xBil(g, g.dari) - 8, g.y, xBil(g, g.sampai) - xBil(g, g.dari) + 16, 0, W.biru, 2)];
  for (let n = g.dari; n <= g.sampai; n += 1) {
    out.push(garis(`gb${key}-k${n}`, xBil(g, n), g.y - 4, 0, 8, W.biru, 1.4));
    out.push(teks(`gb${key}-t${n}`, xBil(g, n), g.y + 15, String(n), 9, W.biru));
  }
  return out;
}
/** Penanda bulat pada bilangan n. */
export const penanda = (key: string, g: GeoG, n: number, warna: string = W.merah): Obj => bulat(`gb${key}-m${n}`, xBil(g, n), g.y, 4.6, warna, W.biru, { z: 2 });
/** Loncatan ke-i dari bilangan `dari` ke arah `arah` (1 maju, -1 mundur): panah dan angka urutnya. */
export const loncatan = (key: string, g: GeoG, dari: number, arah: 1 | -1, i: number): Obj[] => [
  panah(`gb${key}-h${i}`, xBil(g, dari + arah * i), g.y - 11, arah * g.dx, 0, W.hijau, 2.2),
  teks(`gb${key}-hn${i}`, xBil(g, dari + arah * i) + (arah * g.dx) / 2, g.y - 17, String(i + 1), 9, W.merah),
];
