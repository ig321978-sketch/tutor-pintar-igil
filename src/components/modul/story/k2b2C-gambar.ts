import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 2 Sub-Bab C (soal cerita penjumlahan dan pengurangan, sampai dua puluh):
 * benda bergambar, jalur bilangan, batang cerita, kotak bagian dan utuh, kartu pilihan.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Benda kelompok `e{huruf}`: benda ke-i `e{huruf}{i}`; nama `e{huruf}-nm`; banyaknya `e{huruf}-ln`; angka hitungan `e{huruf}n{i}`.
 * - Jalur bilangan `gb{kunci}`: sumbu `gb{kunci}-as`, tanda `gb{kunci}-k{n}`, angka `gb{kunci}-t{n}`, penanda `gb{kunci}-m{n}`,
 *   loncatan ke-i `gb{kunci}-h{i}` (panah) dengan angka `gb{kunci}-hn{i}`.
 * - Batang cerita `bm{kunci}`: kotak `bm{kunci}-k` (lebar = banyak x UB), angka `bm{kunci}-ln`, nama `bm{kunci}-nm`;
 *   selisih `bd{kunci}`: kotak putus-putus `bd{kunci}-k` di ujung batang yang lebih pendek, angka `bd{kunci}-ln`.
 * - Bagian dan utuh: kotak `pwu-k` (utuh), `pwa-k`, `pwb-k` (bagian), nilainya `pwu-t`, `pwa-t`, `pwb-t`.
 * - Kartu pilihan `c1..c3`: `c{i}-k` dan `c{i}-t`. Pasangan `pr{i}` (garis lurus dari benda ke-i atas ke benda ke-i bawah).
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
export const EMO = {
  burung: "\u{1F426}",
  donat: "\u{1F369}",
  apel: "\u{1F34E}",
  kue: "\u{1F9C1}",
  bola: "⚽",
  bintang: "⭐",
  jeruk: "\u{1F34A}",
  boneka: "\u{1F9F8}",
  kelereng: "\u{1F535}",
  balon: "\u{1F388}",
  mangga: "\u{1F96D}",
};

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

/* ------------------------------ Benda bergambar ------------------------------ */

/** Satu benda bergambar: `e{huruf}{i}`, titik (x, y) = garis dasar tulisan. */
export const benda = (key: string, i: number, x: number, y: number, e: string, u = 18): Obj => emo(`e${key}${i}`, x, y, e, u);
/** Titik pusat benda (di atas garis dasar) untuk hitungan: angka muncul di atasnya. */
export const pusatBenda = (pts: Titik[]): Titik[] => pts.map((p) => ({ x: p.x, y: p.y - 6 }));
/** Titik baris: `n` benda dari x0 dengan jarak dx, garis dasar y. */
export const titikBaris = (n: number, x0: number, y: number, dx = 25): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * dx, y }));
/** Titik tersusun dalam beberapa baris: `n` benda, `kolom` per baris, mulai (x0, y0), jarak dx dan dy. */
export const titikPetak = (n: number, kolom: number, x0: number, y0: number, dx = 25, dy = 26): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + dx * (i % kolom), y: y0 + dy * Math.floor(i / kolom) }));
/** Benda satu kelompok pada titik-titik tertentu. */
export const bendaDi = (key: string, e: string, pts: Titik[], u = 18): Obj[] => pts.map((p, i) => benda(key, i, p.x, p.y, e, u));
/** Nama kelompok; id `e{huruf}-nm`. */
export const namaG = (key: string, x: number, y: number, isi: string, anchor: "start" | "middle" | "end" = "start"): Obj => teks(`e${key}-nm`, x, y, isi, 9, W.biru, { anchor });
/** Banyaknya benda (angka); id `e{huruf}-ln`. */
export const jumlahG = (key: string, x: number, y: number, isi: string): Obj => teks(`e${key}-ln`, x, y, isi, 13, W.merah);
/** Pasangan satu-satu antara benda ke-i baris atas dan benda ke-i baris bawah; id `pr{i}`. */
export const pasang = (i: number, x: number, yAtas: number, yBawah: number): Obj => garis(`pr${i}`, x, yAtas, 0, yBawah - yAtas, W.hijau, 2);
/** Petak kosong putus-putus (tempat benda yang kurang); id `{id}`. */
export const petakKosong = (id: string, x: number, y: number): Obj => kotak(id, x - 10, y - 15, 19, 19, "#FFFFFF", W.merah, { rx: 3, tebal: 1.2, putus: true });

/* ------------------------------ Jalur bilangan ------------------------------ */

export type GeoG = { x0: number; y: number; dx: number; dari: number; sampai: number };
export const xBil = (g: GeoG, n: number): number => g.x0 + (n - g.dari) * g.dx;

/** Sumbu, tanda, dan angka jalur bilangan dari g.dari sampai g.sampai. */
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

/* ------------------------------ Batang cerita ------------------------------ */

export const UB = 12;
export const BX = 30;
export const BT = 22;

/** Batang bernilai n pada tinggi y (pojok kiri-atas); lebar n x UB. `isi` = angka yang tampak ("?" bila belum diketahui). */
export function batang(key: string, y: number, n: number, warna: string, nama: string, isi: string = String(n)): Obj[] {
  return [
    kotak(`bm${key}-k`, BX, y, n * UB, BT, warna, W.biru, { rx: 4, tebal: 1.6 }),
    teks(`bm${key}-ln`, BX + (n * UB) / 2, y + BT / 2 + 5, isi, 14, W.merah),
    teks(`bm${key}-nm`, BX, y - 4, nama, 9, W.biru, { anchor: "start" }),
  ];
}
/** Selisih: bagian putus-putus di ujung batang yang lebih pendek (panjang `n` mulai dari nilai `dari`). */
export function selisihBatang(key: string, y: number, dari: number, n: number, isi: string = String(n)): Obj[] {
  return [
    kotak(`bd${key}-k`, BX + dari * UB, y, n * UB, BT, "#FFFFFF", W.merah, { rx: 4, tebal: 1.6, putus: true }),
    teks(`bd${key}-ln`, BX + dari * UB + (n * UB) / 2, y + BT / 2 + 5, isi, 14, W.merah),
  ];
}

/* ------------------------------ Bagian dan utuh ------------------------------ */

export const PW = { u: { x: 100, y: 54, w: 100, h: 44 }, a: { x: 30, y: 124, w: 90, h: 44 }, b: { x: 180, y: 124, w: 90, h: 44 } };
/** Kotak utuh (atas) dan dua kotak bagian (bawah) dengan garis penghubung, tanpa isi. */
export function kotakBagianUtuh(): Obj[] {
  const cap = (k: "u" | "a" | "b", isi: string): Obj => teks(`pw${k}-c`, PW[k].x + PW[k].w / 2, PW[k].y + 11, isi, 8.6, W.biru);
  return [
    garis("pwl1", 150, PW.u.y + PW.u.h, PW.a.x + PW.a.w / 2 - 150, PW.a.y - (PW.u.y + PW.u.h), W.biru, 1.6),
    garis("pwl2", 150, PW.u.y + PW.u.h, PW.b.x + PW.b.w / 2 - 150, PW.b.y - (PW.u.y + PW.u.h), W.biru, 1.6),
    kotak("pwu-k", PW.u.x, PW.u.y, PW.u.w, PW.u.h, W.krem, W.biru, { rx: 8, tebal: 1.8 }),
    kotak("pwa-k", PW.a.x, PW.a.y, PW.a.w, PW.a.h, W.hijauMuda, W.biru, { rx: 8, tebal: 1.8 }),
    kotak("pwb-k", PW.b.x, PW.b.y, PW.b.w, PW.b.h, W.pink, W.biru, { rx: 8, tebal: 1.8 }),
    cap("u", "utuh"),
    cap("a", "bagian"),
    cap("b", "bagian"),
  ];
}
/** Nilai di kotak `u`, `a`, atau `b` (id `pw{u|a|b}-t`). */
export const nilaiPW = (k: "u" | "a" | "b", isi: string): Obj => teks(`pw${k}-t`, PW[k].x + PW[k].w / 2, PW[k].y + PW[k].h - 8, isi, 22, W.merah);
