import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 8 Sub-Bab A (mengelompokkan data):
 * benda bergambar (emoji) per kelompok, turus (goresan), daftar, tabel menurun dan mendatar, dan diagram gambar sederhana.
 * Berkas ini TIDAK dipakai bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Benda kelompok `e{huruf}`: benda ke-i `e{huruf}{i}`; nama `e{huruf}-nm`; banyaknya `e{huruf}-ln`; angka hitungan `e{huruf}n{i}`.
 * - Turus kelompok `t{huruf}`: goresan ke-i `t{huruf}-g{i}` (goresan kelima tiap lima dicoret miring); banyaknya `t{huruf}-ln`.
 * - Tabel menurun `id`: judul `id-jd`, kepala `id-h0` `id-h1`, baris r: nama `id-r{r}a`, angka `id-r{r}b`.
 * - Tabel mendatar `id`: judul `id-jd`, label `id-h0` `id-h1`, kolom c: nama `id-c{c}a`, angka `id-c{c}b`.
 * - Diagram gambar `id`: judul `id-jd`, baris r: nama `id-l{r}`, gambar ke-k `id-p{r}{k}`, angka `id-n{r}`.
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

/* ------------------------------ Benda bergambar per kelompok ------------------------------ */

export const EMO_KERETA = "\u{1F682}";
export const EMO_MOBIL = "\u{1F697}";
export const EMO_BONEKA = "\u{1F9F8}";
export const EMO_BOLA = "\u{1F3C0}";
export const EMO_MERAH = "\u{1F534}";
export const EMO_KUNING = "\u{1F7E1}";
export const EMO_HIJAU = "\u{1F7E2}";
export const EMO_KUCING = "\u{1F431}";
export const EMO_KELINCI = "\u{1F430}";
export const EMO_BURUNG = "\u{1F426}";
export const EMO_APEL = "\u{1F34E}";
export const EMO_PISANG = "\u{1F34C}";
export const EMO_JERUK = "\u{1F34A}";

/** Satu benda bergambar: `e{huruf}{i}`, titik (x, y) = garis dasar tulisan. */
export const benda = (key: string, i: number, x: number, y: number, e: string, u = 18): Obj => emo(`e${key}${i}`, x, y, e, u);

/** Titik pusat benda (di atas garis dasar) untuk hitungan: angka muncul di atasnya. */
export const pusatBenda = (pts: Titik[]): Titik[] => pts.map((p) => ({ x: p.x, y: p.y - 6 }));

/** Titik baris: `n` benda dari x0 dengan jarak dx, garis dasar y. */
export const titikBaris = (n: number, x0: number, y: number, dx = 26): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * dx, y }));

/** Benda satu kelompok pada titik-titik tertentu. */
export const bendaDi = (key: string, e: string, pts: Titik[], u = 18): Obj[] => pts.map((p, i) => benda(key, i, p.x, p.y, e, u));

/** Nama kelompok di kiri baris; id `e{huruf}-nm`. */
export const namaG = (key: string, y: number, isi: string, x = 4): Obj => teks(`e${key}-nm`, x, y - 4, isi, 8.6, W.biru, { anchor: "start" });

/** Banyaknya benda (angka) di kanan baris; id `e{huruf}-ln`. */
export const jumlahG = (key: string, y: number, isi: string, x = 268): Obj => teks(`e${key}-ln`, x, y - 3, isi, 12, W.merah);

/* ------------------------------ Turus ------------------------------ */

export const TURUS_LEBAR = 32;

/** Goresan turus ke-i dari kelompok `key` mulai dari x0, tinggi 16, garis dasar y. Goresan kelima dalam tiap lima dicoret miring. */
export function goresan(key: string, i: number, x0: number, y: number, warna: string = W.biru): Obj {
  const g = Math.floor(i / 5);
  const s = i % 5;
  const gx = x0 + g * TURUS_LEBAR;
  if (s < 4) return garis(`t${key}-g${i}`, gx + s * 6, y - 16, 0, 16, warna, 2.2);
  return garis(`t${key}-g${i}`, gx - 3, y - 3, 27, -11, W.merah, 2.2);
}

/** Banyaknya turus (angka) di kanan turus; id `t{huruf}-ln`. */
export const jumlahTurus = (key: string, x: number, y: number, isi: string): Obj => teks(`t${key}-ln`, x, y - 3, isi, 12, W.merah, { anchor: "start" });

/* ------------------------------ Tabel menurun dan mendatar ------------------------------ */

export type Geo = { x: number; y: number; w1: number; w2: number; rh: number; u?: number };

/** Kerangka tabel menurun: judul, kepala dua kolom, nama tiap baris, dan kotak angka kosong. */
export function tabelMenurun(id: string, g: Geo, judulT: string, kepala: [string, string], nama: string[]): Obj[] {
  const u = g.u ?? 9;
  const out: Obj[] = [teks(`${id}-jd`, g.x + (g.w1 + g.w2) / 2, g.y - 5, judulT, u + 1, W.ungu)];
  const sel = (idk: string, x: number, y: number, w: number, warna: string, isi: string) => {
    out.push(kotak(`${idk}-k`, x, y, w, g.rh, warna, W.biru, { rx: 2, tebal: 1.3 }));
    out.push(teks(idk, x + w / 2, y + g.rh / 2 + u * 0.35, isi, u, W.biru));
  };
  sel(`${id}-h0`, g.x, g.y, g.w1, W.lavender, kepala[0]);
  sel(`${id}-h1`, g.x + g.w1, g.y, g.w2, W.lavender, kepala[1]);
  nama.forEach((nm, r) => {
    sel(`${id}-r${r}a`, g.x, g.y + g.rh * (r + 1), g.w1, W.putih, nm);
    out.push(kotak(`${id}-r${r}b-k`, g.x + g.w1, g.y + g.rh * (r + 1), g.w2, g.rh, W.krem, W.biru, { rx: 2, tebal: 1.3 }));
  });
  return out;
}

/** Angka baris r pada tabel menurun. */
export const angkaMenurun = (id: string, g: Geo, r: number, isi: string): Obj => teks(`${id}-r${r}b`, g.x + g.w1 + g.w2 / 2, g.y + g.rh * (r + 1) + g.rh / 2 + (g.u ?? 9) * 0.38, isi, (g.u ?? 9) + 1, W.merah);

/** Kerangka tabel mendatar: judul, dua label di kiri, nama tiap kolom di baris atas, dan kotak angka kosong di baris bawah. */
export function tabelMendatar(id: string, g: Geo, judulT: string, label: [string, string], nama: string[]): Obj[] {
  const u = g.u ?? 9;
  const out: Obj[] = [teks(`${id}-jd`, g.x + (g.w1 + g.w2 * nama.length) / 2, g.y - 5, judulT, u + 1, W.ungu)];
  const sel = (idk: string, x: number, y: number, w: number, warna: string, isi: string) => {
    out.push(kotak(`${idk}-k`, x, y, w, g.rh, warna, W.biru, { rx: 2, tebal: 1.3 }));
    out.push(teks(idk, x + w / 2, y + g.rh / 2 + u * 0.35, isi, u, W.biru));
  };
  sel(`${id}-h0`, g.x, g.y, g.w1, W.lavender, label[0]);
  sel(`${id}-h1`, g.x, g.y + g.rh, g.w1, W.lavender, label[1]);
  nama.forEach((nm, c) => {
    sel(`${id}-c${c}a`, g.x + g.w1 + c * g.w2, g.y, g.w2, W.putih, nm);
    out.push(kotak(`${id}-c${c}b-k`, g.x + g.w1 + c * g.w2, g.y + g.rh, g.w2, g.rh, W.krem, W.biru, { rx: 2, tebal: 1.3 }));
  });
  return out;
}

/** Angka kolom c pada tabel mendatar. */
export const angkaMendatar = (id: string, g: Geo, c: number, isi: string): Obj => teks(`${id}-c${c}b`, g.x + g.w1 + g.w2 * c + g.w2 / 2, g.y + g.rh + g.rh / 2 + (g.u ?? 9) * 0.38, isi, (g.u ?? 9) + 1, W.merah);

/* ------------------------------ Diagram gambar (satu gambar = satu data) ------------------------------ */

export type GeoD = { x: number; y: number; rh: number; dx: number; xl: number };

/** Kerangka diagram gambar: judul dan nama tiap baris. Gambar `id-p{r}{k}`, angka `id-n{r}`. */
export function diagramKerangka(id: string, g: GeoD, judulT: string, nama: string[]): Obj[] {
  return [
    teks(`${id}-jd`, 150, g.y - 8, judulT, 10, W.ungu),
    ...nama.flatMap((nm, r) => [teks(`${id}-l${r}`, g.xl, g.y + r * g.rh + g.rh / 2 + 3, nm, 8.6, W.biru, { anchor: "start" }), kotak(`${id}-b${r}`, g.xl + 50, g.y + r * g.rh + 2, 190, g.rh - 4, W.putih, W.abu, { rx: 3, tebal: 1 })]),
  ];
}

/** Titik pusat gambar ke-k pada baris r diagram. */
export const titikDiagram = (g: GeoD, r: number, k: number): Titik => ({ x: g.xl + 64 + k * g.dx, y: g.y + r * g.rh + g.rh / 2 + 6 });

/** Gambar ke-k pada baris r diagram. */
export const gambarDiagram = (id: string, g: GeoD, r: number, k: number, e: string, u = 16): Obj => {
  const p = titikDiagram(g, r, k);
  return emo(`${id}-p${r}${k}`, p.x, p.y, e, u);
};

/** Angka baris r diagram di kanan. */
export const angkaDiagram = (id: string, g: GeoD, r: number, isi: string): Obj => teks(`${id}-n${r}`, 272, g.y + r * g.rh + g.rh / 2 + 4, isi, 11, W.merah);
