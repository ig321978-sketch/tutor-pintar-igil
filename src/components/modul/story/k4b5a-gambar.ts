import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi" (ciri-ciri bangun datar: segi banyak, segitiga, dan enam segiempat), awal cerita Toko Keramik Bu Dewi.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: lantai toko keramik berwarna hangat dengan papan nama TOKO KERAMIK BU DEWI, etalase kayu berrak, keramik hias berbentuk bangun datar (jalur poligon dari koordinat titik sudut),
 * tanda sisi sama panjang (garis kecil), tanda sudut siku-siku (kotak kecil), tanda sisi sejajar (panah), penyiku kayu, dan papan kapur untuk video metode global.
 * Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, membawa tas kain),
 * Bu Dewi (berkerudung krem, membawa katalog), Pak Rudi (berhelm kuning, membawa palu karet). Tanpa ZWJ, emoji paling tinggi U+1FA95.
 * Bangun digambar sebagai jalur tertutup `M x y L ... Z` dari koordinat titik sudut, jadi uji bisa menghitung ulang banyak sisi, panjang sisi, sudut siku-siku, dan sisi sejajar dari gambar.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  hijauTua: "#166534",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF3C7",
  oranye: "#EA580C",
  lantai: "#FFEDD5",
  lantaiTua: "#FDBA74",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  sorot: "#FDE68A",
};
/** Glasir keramik. */
export const G = { merah: "#F87171", biru: "#60A5FA", hijau: "#34D399", kuning: "#FBBF24", pink: "#F472B6", ungu: "#A78BFA", oranye: "#FB923C", tosca: "#2DD4BF", nila: "#818CF8" };

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  megafon: "\u{1F4E2}",
  sponge: "\u{1F9FD}",
  tertawa: "\u{1F602}",
  kuat: "\u{1F4AA}",
  bicara: "\u{1F4AC}",
  matahari: "\u{1F305}",
  guci: "\u{1F3FA}",
  segilima: "\u{1F537}",
  segitiga: "\u{1F53A}",
  penggaris: "\u{1F4CF}",
  pohon: "\u{1F333}",
  lampu: "\u{1F4A1}",
} as const;

type Opsi = Partial<Obj>;
export const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.hijauTua): Obj => teks("jud", 150, 18, isi, 11, warna);

/* ------------------------------ Lantai, papan nama, dan etalase ------------------------------ */
/** Lantai toko dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Papan nama kayu: bingkai `${id}`, tulisan `${id}-s1` (TOKO KERAMIK) dan `${id}-s2` (BU DEWI). Pojok kiri-atas (x, y), lebar w. */
export function papanNama(id: string, x: number, y: number, w = 120): Obj[] {
  return [
    kotak(id, x, y, w, 34, "#FEF3C7", W.kayuTua, { rx: 4, tebal: 2, z: 1 }),
    teks(`${id}-s1`, bulatkan(x + w / 2), y + 14, "TOKO KERAMIK", 8, W.coklat, { z: 2 }),
    teks(`${id}-s2`, bulatkan(x + w / 2), y + 27, "BU DEWI", 8, W.oranye, { z: 2 }),
  ];
}
export const idPapanNama = (id: string): string[] => [id, `${id}-s1`, `${id}-s2`];

/** Etalase kayu: badan `${id}`, papan rak `${id}-r1` dan `${id}-r2`. Pojok kiri-atas (x, y). */
export function etalase(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [
    kotak(id, x, y, w, h, "#FEF3C7", W.kayuTua, { rx: 4, tebal: 2, z: 0 }),
    kotak(`${id}-r1`, x, bulatkan(y + h / 2 - 2), w, 4, W.kayu, W.kayuTua, { rx: 1, tebal: 1, z: 1 }),
    kotak(`${id}-r2`, x, bulatkan(y + h - 4), w, 4, W.kayu, W.kayuTua, { rx: 1, tebal: 1, z: 1 }),
  ];
}

/* ------------------------------ Bangun datar dari koordinat ------------------------------ */
export type Pt = { x: number; y: number };
type Ko = [number, number];
const beraturanN = (n: number, mulai: number, r: number): Ko[] =>
  Array.from({ length: n }, (_, i): Ko => {
    const s = mulai + (i * 2 * Math.PI) / n;
    return [r * Math.cos(s), r * Math.sin(s)];
  });
/** Koordinat satuan tiap bangun (y ke bawah): kalikan dengan skala untuk mendapat piksel. */
export const KOORD: Record<string, Ko[]> = {
  persegi: [[0, 0], [4, 0], [4, 4], [0, 4]],
  "persegi-panjang": [[0, 0], [6, 0], [6, 4], [0, 4]],
  jajargenjang: [[2, 0], [8, 0], [6, 4], [0, 4]],
  "belah-ketupat": [[3, 0], [6, 2], [3, 4], [0, 2]],
  "layang-layang": [[3, 0], [6, 2], [3, 7], [0, 2]],
  trapesium: [[1, 0], [4, 0], [6, 4], [0, 4]],
  "segitiga-sama-sisi": beraturanN(3, -Math.PI / 2, 4),
  "segitiga-sama-kaki": [[0, 5], [6, 5], [3, 0]],
  "segitiga-siku": [[0, 0], [0, 3], [4, 3]],
  "segitiga-sembarang": [[0, 5], [7, 5], [3, 0]],
  "segilima-beraturan": beraturanN(5, -Math.PI / 2, 4),
  "segilima-sembarang": [[0, 2], [3, 0], [7, 2], [6, 5], [1, 5]],
  "segienam-beraturan": beraturanN(6, 0, 4),
};
/** Titik relatif terhadap pusat kotak pembatas, berskala `s` piksel tiap satuan. */
export function rel(kunci: string, s: number): Pt[] {
  const t = KOORD[kunci];
  const xs = t.map((p) => p[0]);
  const ys = t.map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  return t.map((p) => ({ x: bulatkan((p[0] - cx) * s), y: bulatkan((p[1] - cy) * s) }));
}
/** Titik mutlak bangun yang berpusat di (cx, cy). */
export const titik = (cx: number, cy: number, kunci: string, s: number): Pt[] => rel(kunci, s).map((p) => ({ x: bulatkan(cx + p.x), y: bulatkan(cy + p.y) }));
/** Keramik (poligon tertutup) berpusat di (cx, cy). */
export function bangun(id: string, cx: number, cy: number, kunci: string, s: number, warna: string, o: Opsi = {}): Obj {
  return { id, t: "jalur", x: cx, y: cy, d: `M${rel(kunci, s).map((p) => `${p.x} ${p.y}`).join(" L")} Z`, warna, garis: W.biru, tebal: 2, z: 2, ...o };
}

const panjang = (a: Pt, b: Pt): number => Math.hypot(b.x - a.x, b.y - a.y);
const sebagai = (a: number, b: number): boolean => Math.abs(a - b) < 0.35;
/** Nomor golongan panjang tiap sisi pada titik mutlak: 0 bila tak sama dengan sisi lain, selain itu 1, 2, ... menurut panjang yang sama. */
export function golongan(p: Pt[]): number[] {
  const l = p.map((q, i) => panjang(q, p[(i + 1) % p.length]));
  const ganda: number[] = [];
  l.forEach((a, i) => {
    if (l.some((b, j) => j !== i && sebagai(a, b)) && !ganda.some((u) => sebagai(u, a))) ganda.push(a);
  });
  return l.map((a) => {
    const g = ganda.findIndex((u) => sebagai(u, a));
    return g < 0 ? 0 : g + 1;
  });
}
/** Tanda sisi sama panjang: garis pendek tegak lurus di tengah tiap sisi, sebanyak nomor golongannya. Id `${id}-t{sisi}{k}`. */
export function tandaSisi(id: string, p: Pt[], warna: string = W.merah, ukuran = 5): Obj[] {
  const gol = golongan(p);
  return p.flatMap((a, i) => {
    if (gol[i] === 0) return [];
    const b = p[(i + 1) % p.length];
    const n = panjang(a, b);
    const dx = (b.x - a.x) / n;
    const dy = (b.y - a.y) / n;
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    return Array.from({ length: gol[i] }, (_, k) => {
      const g = (k - (gol[i] - 1) / 2) * 3.2;
      const cx = mx + dx * g;
      const cy = my + dy * g;
      return garis(`${id}-t${i}${k}`, bulatkan(cx - dy * ukuran), bulatkan(cy + dx * ukuran), bulatkan(2 * dy * ukuran), bulatkan(-2 * dx * ukuran), warna, 1.8, { z: 5 });
    });
  });
}
export const idTandaSisi = (id: string, p: Pt[]): string[] => golongan(p).flatMap((g, i) => Array.from({ length: g }, (_, k) => `${id}-t${i}${k}`));

/** Tanda sudut siku-siku di titik sudut ke-i: tiga titik yang membentuk kotak kecil di dalam sudut. Id `${id}-q${i}`. */
export function tandaSiku(id: string, p: Pt[], i: number, ukuran = 8, warna: string = W.hijau): Obj {
  const n = p.length;
  const v = p[i];
  const a = p[(i + n - 1) % n];
  const b = p[(i + 1) % n];
  const u = (q: Pt): Pt => ({ x: (q.x - v.x) / panjang(q, v), y: (q.y - v.y) / panjang(q, v) });
  const ua = u(a);
  const ub = u(b);
  const t = [
    [v.x + ua.x * ukuran, v.y + ua.y * ukuran],
    [v.x + (ua.x + ub.x) * ukuran, v.y + (ua.y + ub.y) * ukuran],
    [v.x + ub.x * ukuran, v.y + ub.y * ukuran],
  ];
  return { id: `${id}-q${i}`, t: "jalur", x: 0, y: 0, d: `M${bulatkan(t[0][0])} ${bulatkan(t[0][1])} L${bulatkan(t[1][0])} ${bulatkan(t[1][1])} L${bulatkan(t[2][0])} ${bulatkan(t[2][1])}`, garis: warna, tebal: 1.8, z: 5 };
}
/** Tanda sisi sejajar: panah (dua garis membentuk >) di tengah sisi ke-i, arah sisi ke-j. Id `${id}-j${i}a` dan `${id}-j${i}b`. */
export function tandaSejajar(id: string, p: Pt[], i: number, arahDari: number, warna: string = "#1D4ED8"): Obj[] {
  const a = p[arahDari];
  const b = p[(arahDari + 1) % p.length];
  const n = panjang(a, b);
  const dx = (b.x - a.x) / n;
  const dy = (b.y - a.y) / n;
  const s = p[i];
  const e = p[(i + 1) % p.length];
  const mx = (s.x + e.x) / 2;
  const my = (s.y + e.y) / 2;
  return [
    garis(`${id}-j${i}a`, bulatkan(mx - dx * 3 - dy * 3.2), bulatkan(my - dy * 3 + dx * 3.2), bulatkan(dx * 3 + dy * 3.2), bulatkan(dy * 3 - dx * 3.2), warna, 1.8, { z: 5 }),
    garis(`${id}-j${i}b`, bulatkan(mx - dx * 3 + dy * 3.2), bulatkan(my - dy * 3 - dx * 3.2), bulatkan(dx * 3 - dy * 3.2), bulatkan(dy * 3 + dx * 3.2), warna, 1.8, { z: 5 }),
  ];
}
export const idTandaSejajar = (id: string, i: number): string[] => [`${id}-j${i}a`, `${id}-j${i}b`];

/** Penyiku kayu berbentuk L: sudut luarnya di (x, y), kaki mendatar ke kanan dan kaki tegak ke atas. */
export function penyiku(id: string, x: number, y: number, kaki = 34, tebal = 6): Obj {
  return { id, t: "jalur", x, y, d: `M0 0 L${kaki} 0 L${kaki} ${-tebal} L${tebal} ${-tebal} L${tebal} ${-kaki} L0 ${-kaki} Z`, warna: "#F59E0B", garis: W.kayuTua, tebal: 1.4, z: 6 };
}

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Dewi" | "Pak Rudi";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, membawa kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro berkaus hijau `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl` dan membawa tas kain `${id}-ts`;
 * Bu Dewi berkerudung krem `${id}-kr` dan membawa katalog `${id}-kt`; Pak Rudi berkaus oranye `${id}-bj`, berhelm kuning `${id}-hl`, dan membawa palu karet `${id}-pm`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Rudi" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Laras") {
    out.push(garis(`${id}-ka`, x - 8, bulatkan(y - u * 0.28), 16, 0, "#1F2937", 1.6, { z: 2 }));
    out.push(bulat(`${id}-k1`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Genta") out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.78), 16, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Hendro") {
    out.push(baju("#15803D", "#14532D", 12));
    out.push(kotak(`${id}-tp`, x - 14, bulatkan(y - u * 0.78), 28, 6, "#FDE68A", "#92400E", { rx: 3, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 4, bulatkan(y + 4), 2.2, "#F59E0B", "#92400E", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-ts`, x - 19, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Dewi") {
    out.push(kotak(`${id}-kr`, x - 13, bulatkan(y - u * 0.78), 26, 7, "#FDE68A", "#B45309", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-kt`, x + 11, bulatkan(y + 1), 10, 13, "#FFF7ED", "#9A3412", { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Rudi") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-hl`, x - 10, bulatkan(y - u * 0.8), 20, 7, "#FACC15", "#A16207", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pm`, x + 11, bulatkan(y + 3), 9, 6, "#1F2937", "#111827", { rx: 1, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Rudi" ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-k1`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Dewi" ? [`${id}-kr`, `${id}-kt`] : []),
  ...(nama === "Pak Rudi" ? [`${id}-bj`, `${id}-hl`, `${id}-pm`] : []),
];

/* ------------------------------ Papan kapur (video metode global) ------------------------------ */
export const K = { papan: "#14532D", kapur: "#FEF9C3", kapurMerah: "#FCA5A5", kapurBiru: "#BAE6FD" };

/** Papan tulis hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanTulis(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, K.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanTulis = (id: string): string[] => [id, `${id}-p`];
/** Bangun berkapur di papan tulis (tepi kapur, isi hijau papan). */
export const bangunKapur = (id: string, cx: number, cy: number, kunci: string, s: number, o: Opsi = {}): Obj => bangun(id, cx, cy, kunci, s, "#1F6B3F", { garis: K.kapur, tebal: 1.6, ...o });
