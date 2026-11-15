import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 3 Sub-Bab C (bangun ruang): bangun datar, kubus, balok, tabung, kerucut, bola, cap permukaan,
 * bayangan, lereng, kartu, dan chip permukaan. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang; kunci `key` hanya huruf kecil a sampai z):
 * - Bangun ruang `ruang(jenis, key, ...)`: kunci diawali dua huruf jenis (kb kubus, bl balok, tb tabung, kr kerucut, bo bola).
 *   Balok dan kubus: permukaan tampak `{key}-fd` (depan), `-fa` (atas), `-fk` (kanan), semuanya jalur segi empat dengan pojok kiri-atas muka depan di (x, y).
 *   Tabung dan kerucut: badan `{key}-bd` dan (tabung) tutup `{key}-ta`. Bola: `{key}-bd` dan kilau `{key}-sn`.
 * - Rusuk balok ke-i `{key}r{i}` (garis, i = 0..11), titik sudut ke-i `{key}t{i}` (bulat, i = 0..7); angka hitungan `{key}rn{i}` dan `{key}tn{i}`.
 * - Nama permukaan `{key}-s{i}` (kartu: `-k` dan `-t0`); chip permukaan `{key}-p{i}` (isi "datar" atau "lengkung").
 * - Bangun datar `dt{key}` (jalur segitiga atau segi empat, atau bulat), namanya `dt{key}-nm`; pojoknya `dt{key}p{i}` (bulat).
 * - Cap `cp{jenis dua huruf}{key}` (kotak atau bulat), bayangan `by{jenis dua huruf}{key}`.
 * - Bola gelinding `rl{key}` (jalur lingkaran dengan jari-jari), tabung berbaring `tg{key}`.
 * - Kartu pilihan `c1..c3`: `c{i}-k` dan `c{i}-t`.
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

/** Kartu pilihan atau kata besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

const f = (n: number): string => n.toFixed(1);
/** Jalur tertutup dari titik-titik: `M x y L x y ... Z` (pojok = banyak titik). */
export const poli = (pts: [number, number][]): string => `M${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L")} Z`;
const K = 0.5523;

/* ------------------------------ Bangun datar ------------------------------ */

export type JenisDatar = "segitiga" | "segiempat" | "lingkaran";
/** Banyak sisi (dan pojok) bangun datar: lingkaran tidak punya. */
export const SISI_DATAR: Record<JenisDatar, number> = { segitiga: 3, segiempat: 4, lingkaran: 0 };
export const NAMA_DATAR: Record<JenisDatar, string> = { segitiga: "segitiga", segiempat: "segi empat", lingkaran: "lingkaran" };

/** Bangun datar berpusat di (cx, cy), ukuran `r` (setengah lebar). Segitiga dan segi empat berupa jalur dengan pojok, lingkaran berupa bulat. */
export function bangunDatar(jenis: JenisDatar, key: string, cx: number, cy: number, r: number, warna: string): Obj[] {
  const id = `dt${key}`;
  if (jenis === "lingkaran") return [bulat(id, cx, cy, r, warna, W.biru, { tebal: 1.8 })];
  const pts: [number, number][] = jenis === "segitiga" ? [[0, -r * 0.95], [r * 1.1, r * 0.8], [-r * 1.1, r * 0.8]] : [[-r * 0.95, -r * 0.95], [r * 0.95, -r * 0.95], [r * 0.95, r * 0.95], [-r * 0.95, r * 0.95]];
  return [{ id, t: "jalur", x: cx, y: cy, d: poli(pts), warna, garis: W.biru, tebal: 1.8 }];
}
/** Penanda pojok (bulat kecil) pada bangun datar bersisi: pojok ke-i `dt{key}p{i}`. */
export function pojokDatar(jenis: JenisDatar, key: string, cx: number, cy: number, r: number): Obj[] {
  const pts: [number, number][] = jenis === "segitiga" ? [[0, -r * 0.95], [r * 1.1, r * 0.8], [-r * 1.1, r * 0.8]] : [[-r * 0.95, -r * 0.95], [r * 0.95, -r * 0.95], [r * 0.95, r * 0.95], [-r * 0.95, r * 0.95]];
  return pts.map((p, i) => bulat(`dt${key}p${i}`, cx + p[0], cy + p[1], 3, W.merah, W.biru, { tebal: 1, z: 2 }));
}

/* ------------------------------ Bangun ruang ------------------------------ */

export type Jenis = "kubus" | "balok" | "tabung" | "kerucut" | "bola";
export const URUT_JENIS: Jenis[] = ["kubus", "balok", "tabung", "kerucut", "bola"];
export const AWALAN: Record<Jenis, string> = { kubus: "kb", balok: "bl", tabung: "tb", kerucut: "kr", bola: "bo" };
export const NAMA_RUANG: Record<Jenis, string> = { kubus: "kubus", balok: "balok", tabung: "tabung", kerucut: "kerucut", bola: "bola" };

/** Data bangun ruang yang digambar: permukaan datar, permukaan lengkung, rusuk, titik sudut (null bila tidak dipakai). */
export const RUANG: Record<Jenis, { datar: number; lengkung: number; rusuk: number | null; titik: number | null }> = {
  kubus: { datar: 6, lengkung: 0, rusuk: 12, titik: 8 },
  balok: { datar: 6, lengkung: 0, rusuk: 12, titik: 8 },
  tabung: { datar: 2, lengkung: 1, rusuk: null, titik: null },
  kerucut: { datar: 1, lengkung: 1, rusuk: null, titik: 1 },
  bola: { datar: 0, lengkung: 1, rusuk: null, titik: null },
};

export const WARNA_RUANG: Record<Jenis, [string, string, string]> = {
  kubus: ["#FCA5A5", "#FECACA", "#F87171"],
  balok: ["#FCD34D", "#FDE68A", "#FBBF24"],
  tabung: ["#86EFAC", "#BBF7D0", "#4ADE80"],
  kerucut: ["#C4B5FD", "#DDD6FE", "#A78BFA"],
  bola: ["#7DD3FC", "#BAE6FD", "#38BDF8"],
};

/** Ukuran muka depan dan geser belakang balok (kubus: w = h = s dan kedalaman s; balok: w, h, kedalaman berbeda). */
export const ukuranBox = (jenis: "kubus" | "balok", s: number): { w: number; h: number; ox: number; oy: number } =>
  jenis === "kubus" ? { w: s, h: s, ox: 0.4 * s, oy: 0.4 * s } : { w: 1.6 * s, h: 0.9 * s, ox: 0.4 * s, oy: 0.4 * s };

/** Delapan titik sudut balok relatif terhadap pojok kiri-atas muka depan; nomor 7 tersembunyi. */
export const titikBox = (u: { w: number; h: number; ox: number; oy: number }): [number, number][] => [
  [0, 0],
  [u.w, 0],
  [u.w, u.h],
  [0, u.h],
  [u.ox, -u.oy],
  [u.w + u.ox, -u.oy],
  [u.w + u.ox, u.h - u.oy],
  [u.ox, u.h - u.oy],
];
/** Dua belas rusuk balok: pasangan nomor titik sudut. Tiga terakhir tersembunyi (menyentuh titik 7). */
export const RUSUK_BOX: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 5], [2, 6], [4, 5], [5, 6], [3, 7], [4, 7], [6, 7],
];
export const MUKA_BOX: Record<"fd" | "fa" | "fk", number[]> = { fd: [0, 1, 2, 3], fa: [0, 1, 5, 4], fk: [1, 2, 6, 5] };

/** Pojok kiri-atas muka depan balok yang berpusat di (cx, cy). */
const pojokBox = (jenis: "kubus" | "balok", cx: number, cy: number, s: number) => {
  const u = ukuranBox(jenis, s);
  return { u, x: cx - (u.w + u.ox) / 2, y: cy - (u.h - u.oy) / 2 };
};

const ovalD = (rx: number, ry: number): string =>
  `M${f(rx)} 0 C${f(rx)} ${f(K * ry)} ${f(K * rx)} ${f(ry)} 0 ${f(ry)} C${f(-K * rx)} ${f(ry)} ${f(-rx)} ${f(K * ry)} ${f(-rx)} 0 C${f(-rx)} ${f(-K * ry)} ${f(-K * rx)} ${f(-ry)} 0 ${f(-ry)} C${f(K * rx)} ${f(-ry)} ${f(rx)} ${f(-K * ry)} ${f(rx)} 0 Z`;

/** Ukuran tabung dan kerucut menurut `s`: jari-jari, tinggi badan, dan setengah tinggi elips. */
export const ukuranLengkung = (jenis: "tabung" | "kerucut", s: number): { r: number; h: number; ry: number } => (jenis === "tabung" ? { r: 0.5 * s, h: 1.2 * s, ry: 0.18 * s } : { r: 0.55 * s, h: 1.3 * s, ry: 0.2 * s });
export const jariBola = (s: number): number => 0.62 * s;

/** Satu bangun ruang berpusat di (cx, cy) dengan ukuran `s`. Kunci `key` harus diawali dua huruf jenisnya. */
export function ruang(jenis: Jenis, key: string, cx: number, cy: number, s = 20, o: Opsi = {}): Obj[] {
  if (!key.startsWith(AWALAN[jenis]) || !/^[a-z]+$/.test(key)) throw new Error(`kunci "${key}" harus huruf kecil dan diawali ${AWALAN[jenis]} untuk ${jenis}`);
  const [c0, c1, c2] = WARNA_RUANG[jenis];
  if (jenis === "kubus" || jenis === "balok") {
    const { u, x, y } = pojokBox(jenis, cx, cy, s);
    const p = titikBox(u);
    const muka = (nama: "fd" | "fa" | "fk", warna: string): Obj => ({ id: `${key}-${nama}`, t: "jalur", x, y, d: poli(MUKA_BOX[nama].map((n) => p[n])), warna, garis: W.biru, tebal: 1.5, ...o });
    return [muka("fd", c0), muka("fa", c1), muka("fk", c2)];
  }
  if (jenis === "bola") {
    const r = jariBola(s);
    return [bulat(`${key}-bd`, cx, cy, r, c0, W.biru, { tebal: 1.6, ...o }), bulat(`${key}-sn`, cx - r * 0.35, cy - r * 0.38, r * 0.2, W.putih, undefined, { tebal: 0, op: 0.75, ...o })];
  }
  const { r, h, ry } = ukuranLengkung(jenis, s);
  if (jenis === "tabung") {
    const y0 = cy - (h + ry) / 2;
    const badan = `M${f(-r)} 0 L${f(-r)} ${f(h)} C${f(-r)} ${f(h + K * ry)} ${f(-K * r)} ${f(h + ry)} 0 ${f(h + ry)} C${f(K * r)} ${f(h + ry)} ${f(r)} ${f(h + K * ry)} ${f(r)} ${f(h)} L${f(r)} 0 Z`;
    return [{ id: `${key}-bd`, t: "jalur", x: cx, y: y0, d: badan, warna: c0, garis: W.biru, tebal: 1.5, ...o }, { id: `${key}-ta`, t: "jalur", x: cx, y: y0, d: ovalD(r, ry), warna: c1, garis: W.biru, tebal: 1.5, ...o }];
  }
  const y0 = cy - (h + ry) / 2;
  const badan = `M0 0 L${f(-r)} ${f(h)} C${f(-r)} ${f(h + K * ry)} ${f(-K * r)} ${f(h + ry)} 0 ${f(h + ry)} C${f(K * r)} ${f(h + ry)} ${f(r)} ${f(h + K * ry)} ${f(r)} ${f(h)} Z`;
  return [{ id: `${key}-bd`, t: "jalur", x: cx, y: y0, d: badan, warna: c0, garis: W.biru, tebal: 1.5, ...o }];
};

/** Aksi ubah: pindahkan bangun ruang `key` ke pusat baru (bagian-bagiannya ikut pindah). */
export const pindahRuang = (jenis: Jenis, key: string, cx: number, cy: number, s = 20): (Partial<Obj> & { id: string })[] => ruang(jenis, key, cx, cy, s).map((p) => ({ id: p.id, x: p.x, y: p.y }));

/** Pusat bangun ruang (dari bagian utamanya) untuk keperluan tata letak: dipakai uji untuk mengelompokkan. */
export const pusatRuang = (jenis: Jenis, p: Obj, s: number): Titik => {
  if (jenis === "kubus" || jenis === "balok") {
    const u = ukuranBox(jenis, s);
    return { x: (p.x ?? 0) + (u.w + u.ox) / 2, y: (p.y ?? 0) + (u.h - u.oy) / 2 };
  }
  if (jenis === "bola") return { x: p.x ?? 0, y: p.y ?? 0 };
  const { h, ry } = ukuranLengkung(jenis, s);
  return { x: p.x ?? 0, y: (p.y ?? 0) + (h + ry) / 2 };
};

/** Satu rusuk balok ke-i di atas gambar balok berpusat (cx, cy) ukuran s: garis `{key}r{i}` (yang tersembunyi putus-putus). */
export function rusukBox(jenis: "kubus" | "balok", key: string, cx: number, cy: number, s: number, i: number, warna: string = W.merah): Obj {
  const { u, x, y } = pojokBox(jenis, cx, cy, s);
  const p = titikBox(u);
  const [a, b] = RUSUK_BOX[i];
  return garis(`${key}r${i}`, x + p[a][0], y + p[a][1], p[b][0] - p[a][0], p[b][1] - p[a][1], warna, 3, { putus: a === 7 || b === 7, z: 3 });
}
/** Titik sudut balok ke-i: bulat `{key}t{i}`. */
export function titikSudut(jenis: "kubus" | "balok", key: string, cx: number, cy: number, s: number, i: number, warna: string = W.merah): Obj {
  const { u, x, y } = pojokBox(jenis, cx, cy, s);
  const p = titikBox(u)[i];
  return bulat(`${key}t${i}`, x + p[0], y + p[1], 3.4, warna, W.biru, { tebal: 1, z: 3 });
}
/** Titik tengah rusuk ke-i (tempat angka hitungan). */
export function tengahRusuk(jenis: "kubus" | "balok", cx: number, cy: number, s: number, i: number): Titik {
  const { u, x, y } = pojokBox(jenis, cx, cy, s);
  const p = titikBox(u);
  const [a, b] = RUSUK_BOX[i];
  return { x: x + (p[a][0] + p[b][0]) / 2, y: y + (p[a][1] + p[b][1]) / 2 };
}
export function letakTitikSudut(jenis: "kubus" | "balok", cx: number, cy: number, s: number, i: number): Titik {
  const { u, x, y } = pojokBox(jenis, cx, cy, s);
  const p = titikBox(u)[i];
  return { x: x + p[0], y: y + p[1] };
}

/** Chip permukaan ke-i: kartu kecil berisi "datar" atau "lengkung" (id `{key}-p{i}`). */
export function chipPermukaan(key: string, i: number, x: number, y: number, isi: "datar" | "lengkung", w = 52, h = 22): Obj[] {
  return kartu(`${key}-p${i}`, x, y, w, h, isi === "datar" ? W.hijauMuda : W.pink, [isi], 9.4);
}

/** Cap permukaan: bentuk datar yang muncul saat bangun ruang ditekan. kubus: segi empat sama, balok: segi empat panjang, tabung dan kerucut: lingkaran. */
export function cap(jenis: "kubus" | "balok" | "tabung" | "kerucut", key: string, cx: number, cy: number, s: number): Obj[] {
  const id = `cp${AWALAN[jenis]}${key}`;
  if (jenis === "kubus") return [kotak(id, cx - s / 2, cy - s / 2, s, s, W.merahMuda, W.merah, { rx: 2, tebal: 1.8, putus: true })];
  if (jenis === "balok") return [kotak(id, cx - 0.8 * s, cy - 0.45 * s, 1.6 * s, 0.9 * s, W.merahMuda, W.merah, { rx: 2, tebal: 1.8, putus: true })];
  return [bulat(id, cx, cy, jenis === "tabung" ? 0.5 * s : 0.55 * s, W.merahMuda, W.merah, { tebal: 1.8, putus: true })];
}

/** Bayangan (siluet) dari samping: kubus segi empat sama, balok dan tabung segi empat panjang, kerucut segitiga, bola lingkaran. */
export function bayangan(jenis: Jenis, key: string, cx: number, cy: number, s: number): Obj[] {
  const id = `by${AWALAN[jenis]}${key}`;
  const abu = "#64748B";
  if (jenis === "kubus") return [kotak(id, cx - s / 2, cy - s / 2, s, s, abu, abu, { rx: 1 })];
  if (jenis === "balok") return [kotak(id, cx - 0.8 * s, cy - 0.45 * s, 1.6 * s, 0.9 * s, abu, abu, { rx: 1 })];
  if (jenis === "tabung") return [kotak(id, cx - 0.5 * s, cy - 0.6 * s, s, 1.2 * s, abu, abu, { rx: 1 })];
  if (jenis === "kerucut") return [{ id, t: "jalur", x: cx, y: cy, d: poli([[0, -0.65 * s], [0.55 * s, 0.65 * s], [-0.55 * s, 0.65 * s]]), warna: abu, garis: abu, tebal: 1.5 }];
  return [bulat(id, cx, cy, jariBola(s), abu, abu)];
}

/* ------------------------------ Lereng dan menggelinding ------------------------------ */

/** Lereng lurus dari (LX0, LY0) ke (LX1, LY1). */
export const LERENG = { x0: 24, y0: 70, x1: 276, y1: 130 };
export const sudutLereng = Math.atan2(LERENG.y1 - LERENG.y0, LERENG.x1 - LERENG.x0);
/** Titik di atas lereng pada x tertentu, naik setinggi `naik` tegak lurus lereng. */
export function diLereng(x: number, naik: number): Titik {
  const y = LERENG.y0 + ((x - LERENG.x0) * (LERENG.y1 - LERENG.y0)) / (LERENG.x1 - LERENG.x0);
  return { x: x + naik * Math.sin(sudutLereng), y: y - naik * Math.cos(sudutLereng) };
}
export const gambarLereng = (): Obj[] => [
  garis("lr", LERENG.x0, LERENG.y0, LERENG.x1 - LERENG.x0, LERENG.y1 - LERENG.y0, W.coklat, 4),
  { id: "lr-t", t: "jalur", x: 0, y: 0, d: poli([[LERENG.x1, LERENG.y1], [LERENG.x1, LERENG.y1 + 10], [LERENG.x0, LERENG.y0 + 10], [LERENG.x0, LERENG.y0]]), warna: "#FDE68A", garis: undefined, tebal: 0, z: -1 },
];

/** Bola gelinding: lingkaran jari-jari r dengan garis tengah (supaya putarannya terlihat), berpusat di (x, y). */
export function bolaGelinding(key: string, x: number, y: number, r: number, warna: string = WARNA_RUANG.bola[0], rot = 0): Obj {
  const d = `${ovalD(r, r)} M${f(-r)} 0 L${f(r)} 0`;
  return { id: `rl${key}`, t: "jalur", x, y, d, warna, garis: W.biru, tebal: 1.6, rot };
}
/** Derajat putaran saat bola jari-jari r menempuh lintasan sepanjang `jarak`. */
export const putaranGelinding = (jarak: number, r: number): number => (jarak / r) * (180 / Math.PI);

/** Tabung berbaring (tampak dari samping) berpusat di (x, y), panjang `p` dan tinggi `t`. */
export function tabungBerbaring(key: string, x: number, y: number, p: number, t: number): Obj {
  const ry = t / 2;
  const rx = t * 0.22;
  const d = `M${f(-p / 2 + rx)} ${f(-ry)} L${f(p / 2 - rx)} ${f(-ry)} C${f(p / 2 - rx + K * rx)} ${f(-ry)} ${f(p / 2)} ${f(-K * ry)} ${f(p / 2)} 0 C${f(p / 2)} ${f(K * ry)} ${f(p / 2 - rx + K * rx)} ${f(ry)} ${f(p / 2 - rx)} ${f(ry)} L${f(-p / 2 + rx)} ${f(ry)} C${f(-p / 2 + rx - K * rx)} ${f(ry)} ${f(-p / 2)} ${f(K * ry)} ${f(-p / 2)} 0 C${f(-p / 2)} ${f(-K * ry)} ${f(-p / 2 + rx - K * rx)} ${f(-ry)} ${f(-p / 2 + rx)} ${f(-ry)} Z`;
  return { id: `tg${key}`, t: "jalur", x, y, d, warna: WARNA_RUANG.tabung[0], garis: W.biru, tebal: 1.6 };
}

/** Tanda cocok dan tidak cocok. */
export const cocok = (id: string, x: number, y: number, u = 16): Obj => emo(id, x, y, "✅", u);
export const tidakCocok = (id: string, x: number, y: number, u = 16): Obj => emo(id, x, y, "❌", u);
