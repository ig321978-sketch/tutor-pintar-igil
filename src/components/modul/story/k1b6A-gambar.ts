import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 6 Sub-Bab A (lebih dari, kurang dari, dan selisih):
 * donat, kelereng, bunga, kupu-kupu, balon, garis pasangan, batang kotak, bingkai sepuluh, dan garis bilangan.
 * Berkas ini TIDAK dipakai bab lain.
 * Benda berhitung: `id{i}` benda utama ke-i (dihitung uji), pelengkap `id{i}-x`. Bingkai: sel `id-c{i}`, titik `id-t{i}`.
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
export const ANAK_EMO = "\u{1F9D2}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const tangan = (x: number, y: number, id = "tg"): Obj => emo(id, x, y, "\u{1F446}", 22);

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, angka: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah, o),
];

/* ------------------------------ Benda berhitung ------------------------------ */

export type Jenis = "donat" | "kelereng" | "balon" | "bunga" | "kupu";
const WARNA_KELERENG = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8", "#FACC15"];
const WARNA_BALON = ["#F87171", "#60A5FA", "#FACC15", "#4ADE80", "#C084FC"];

/** Satu benda berhitung berpusat di (cx, cy). Benda utama berid `id`; donat, balon, dan bunga punya pelengkap `id-x`. */
export function benda(jenis: Jenis, id: string, cx: number, cy: number, r = 8, i = 0, o: Opsi = {}): Obj[] {
  if (jenis === "kelereng") return [bulat(id, cx, cy, r, WARNA_KELERENG[i % 6], W.biru, { tebal: 1.6, ...o })];
  if (jenis === "donat") return [bulat(id, cx, cy, r, "#E8B26A", W.coklat, { tebal: 1.6, ...o }), bulat(`${id}-x`, cx, cy, r * 0.34, W.putih, W.coklat, { tebal: 1, ...o })];
  if (jenis === "bunga") return [bulat(id, cx, cy, r, W.pink, W.merah, { tebal: 1.5, ...o }), bulat(`${id}-x`, cx, cy, r * 0.38, W.emas, W.coklat, { tebal: 1, ...o })];
  if (jenis === "kupu") return [teks(id, cx, cy + r * 0.85, "\u{1F98B}", r * 2.3, W.biru, o)];
  return [bulat(id, cx, cy, r * 0.9, WARNA_BALON[i % 5], W.biru, { tebal: 1.1, ...o }), garis(`${id}-x`, cx, cy + r * 0.9, 0, r * 1.0, W.abu, 1.2, o)];
}

/** Benda sejenis di titik-titik `pts`, id `${id}${i}`. */
export const deret = (jenis: Jenis, id: string, pts: Titik[], r = 8, o: Opsi = {}): Obj[] => pts.flatMap((p, i) => benda(jenis, `${id}${i}`, p.x, p.y, r, i, o));

/** `n` titik sebaris pada tinggi `y`, mulai dari x0 dengan jarak `jarak`. */
export const baris = (n: number, y: number, x0 = 48, jarak = 36): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * jarak, y }));

/** Garis penghubung pasangan: dari baris atas (y1) ke baris bawah (y2) pada kolom i, tegak lurus; id `${id}${i}`. */
export const pasangGaris = (id: string, xs: number[], y1: number, y2: number, r = 8, warna: string = W.hijau): Obj[] => xs.map((x, i) => garis(`${id}${i}`, x, y1 + r + 2, 0, y2 - y1 - 2 * r - 4, warna, 2.2));

/* ------------------------------ Batang kotak ------------------------------ */

export const SEL_B = 18;
/** Satu batang: `n` kotak sebaris, pojok kiri-atas (x, y), id `${id}-c{i}`. */
export const batang = (id: string, x: number, y: number, n: number, warna: string, o: Opsi = {}): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}-c${i}`, x + i * SEL_B, y, SEL_B, SEL_B, warna, W.biru, { rx: 1, tebal: 1.3, ...o }));

/* ------------------------------ Bingkai sepuluh ------------------------------ */

export const SEL = 26;
/** Pusat sel ke-i (0..9) bingkai dengan pojok kiri-atas (x, y): lima sel sebaris, dua baris. */
export const pusatSel = (i: number, x: number, y: number, sel = SEL): Titik => ({ x: x + (i % 5) * sel + sel / 2, y: y + Math.floor(i / 5) * sel + sel / 2 });

/** Satu bingkai sepuluh kosong, id sel `${id}-c{i}`. */
export const bingkai = (id: string, x: number, y: number, sel = SEL, o: Opsi = {}): Obj[] =>
  Array.from({ length: 10 }, (_, i) => kotak(`${id}-c${i}`, x + (i % 5) * sel, y + Math.floor(i / 5) * sel, sel, sel, W.putih, W.biru, { rx: 0, tebal: 1.3, z: -1, ...o }));

export const BINGKAI_A = { x: 14, w: 130 };
export const BINGKAI_B = { x: 156, w: 130 };

/** Dua bingkai sepuluh berdampingan di tinggi `y`: id sel `${id}a-c{i}` dan `${id}b-c{i}`. */
export const duaBingkai = (id: string, y: number, o: Opsi = {}): Obj[] => [...bingkai(`${id}a`, BINGKAI_A.x, y, SEL, o), ...bingkai(`${id}b`, BINGKAI_B.x, y, SEL, o)];

/** Pusat sel ke-i (0..19) pada dua bingkai: 0..9 di bingkai pertama, 10..19 di bingkai kedua. */
export const pusatDua = (i: number, y: number): Titik => (i < 10 ? pusatSel(i, BINGKAI_A.x, y) : pusatSel(i - 10, BINGKAI_B.x, y));

/** Titik pengisi sel ke-i (0..19) pada dua bingkai di tinggi `y`: id `${id}-t{i}`; dari nomor `dari` sampai `sampai` (tidak termasuk). Sepuluh pertama merah, sisanya biru. */
export const titikDua = (id: string, y: number, sampai: number, dari = 0): Obj[] =>
  Array.from({ length: Math.max(0, sampai - dari) }, (_, q) => {
    const i = dari + q;
    const p = pusatDua(i, y);
    return bulat(`${id}-t${i}`, p.x, p.y, 8.4, i < 10 ? W.merah : W.biru, i < 10 ? W.merah : W.biru, { tebal: 1 });
  });

/* ------------------------------ Garis bilangan ------------------------------ */

export const BIL_DARI = 4;
export const BIL_SAMPAI = 15;
/** Garis bilangan 4 sampai 15: bilangan n di x = 20 + (n - 4) * 24. */
export const xBil = (n: number): number => 20 + (n - BIL_DARI) * 24;
export const garisBilangan = (y: number, dari = BIL_DARI, sampai = BIL_SAMPAI): Obj[] => [
  garis("gb", xBil(dari) - 8, y, xBil(sampai) - xBil(dari) + 16, 0, W.biru, 2.4),
  ...Array.from({ length: sampai - dari + 1 }, (_, q) => {
    const n = dari + q;
    return [garis(`gb-t${n}`, xBil(n), y - 5, 0, 10, W.biru, 1.8), teks(`gb-n${n}`, xBil(n), y + 18, String(n), 9.4, W.merah)];
  }).flat(),
];

const f = (n: number): string => n.toFixed(1);
/** Lompatan melengkung dari bilangan a ke b (satu langkah, ke kanan), tergambar bertahap; id `${id}`. */
export const lompat = (id: string, a: number, b: number, y: number, warna: string = W.hijau): Obj => ({
  id,
  t: "jalur",
  x: xBil(a),
  y: y - 6,
  d: `M0 0 Q${f((xBil(b) - xBil(a)) / 2)} -22 ${f(xBil(b) - xBil(a))} 0`,
  garis: warna,
  tebal: 2.2,
  gambar: true,
});

/** Lompatan mundur (ke kiri) dari bilangan a ke b (a lebih besar), melengkung di bawah angka garis bilangan; id `${id}`. */
export const lompatMundur = (id: string, a: number, b: number, y: number, warna: string = W.oranye): Obj => ({
  id,
  t: "jalur",
  x: xBil(a),
  y: y + 26,
  d: `M0 0 Q${f((xBil(b) - xBil(a)) / 2)} 22 ${f(xBil(b) - xBil(a))} 0`,
  garis: warna,
  tebal: 2.2,
  gambar: true,
});
