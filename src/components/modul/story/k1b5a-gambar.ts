import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 5 Sub-Bab A (menghitung, membaca, dan menulis bilangan sampai dua puluh):
 * kelereng, bola, balon, sedotan, bingkai sepuluh (satu dan dua), garis bilangan, kartu angka, dan angka tulisan tangan yang tergambar bertahap.
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

/** Papan tulis hijau tua. */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, "#166534", W.coklat, { rx: 6, tebal: 4, z: -2 });

/* ------------------------------ Benda berhitung ------------------------------ */

export type Jenis = "kelereng" | "bola" | "balon" | "sedotan";
const WARNA_KELERENG = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8", "#FACC15"];
const WARNA_BALON = ["#F87171", "#60A5FA", "#FACC15", "#4ADE80", "#C084FC"];
const WARNA_SEDOTAN = ["#60A5FA", "#F87171", "#4ADE80", "#FACC15", "#C084FC"];

/** Satu benda berhitung berpusat di (cx, cy). Benda utama berid `id`; balon dan sedotan punya pelengkap `id-x`. */
export function benda(jenis: Jenis, id: string, cx: number, cy: number, r = 7, i = 0, o: Opsi = {}): Obj[] {
  if (jenis === "kelereng") return [bulat(id, cx, cy, r, WARNA_KELERENG[i % 6], W.biru, { tebal: 1.6, ...o })];
  if (jenis === "bola") return [bulat(id, cx, cy, r, W.oranye, W.coklat, { tebal: 1.8, ...o })];
  if (jenis === "balon") return [bulat(id, cx, cy, r * 0.9, WARNA_BALON[i % 5], W.biru, { tebal: 1.1, ...o }), garis(`${id}-x`, cx, cy + r * 0.9, 2, r * 1.0, W.abu, 1.2, o)];
  return [kotak(id, cx - r * 0.45, cy - r * 1.3, r * 0.9, r * 2.6, WARNA_SEDOTAN[i % 5], W.biru, { rx: 2, tebal: 1.1, ...o }), kotak(`${id}-x`, cx - r * 0.45, cy - r * 1.3, r * 0.9, 3, W.putih, W.biru, { rx: 1, tebal: 0.8, ...o })];
}

/** Benda sejenis di titik-titik `pts`, id `${id}${i}`. */
export const deret = (jenis: Jenis, id: string, pts: Titik[], r = 7, o: Opsi = {}): Obj[] => pts.flatMap((p, i) => benda(jenis, `${id}${i}`, p.x, p.y, r, i, o));

/** Id benda utama `${id}0` sampai `${id}${n-1}`. */
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Id semua bagian benda utama dan pelengkapnya (`${id}{i}` dan `${id}{i}-x`) untuk dihapus bersama. */
export const idBenda = (id: string, n: number, jenis: Jenis): string[] => Array.from({ length: n }, (_, i) => (jenis === "balon" || jenis === "sedotan" ? [`${id}${i}`, `${id}${i}-x`] : [`${id}${i}`])).flat();

/** Baris benda di tengah: `n` titik sebaris dengan jarak `jarak`, tinggi `y`. */
export const baris = (n: number, y: number, jarak = 24, x0?: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: (x0 ?? 150 - ((n - 1) * jarak) / 2) + i * jarak, y }));

/** Letak `n` (sampai 20) titik tersebar rapi di wilayah x 24..276, y `y0`..`y1`, dengan sedikit geseran tetap supaya tampak berserakan. */
export function sebar(n: number, y0 = 106, y1 = 186): Titik[] {
  const kol = 7;
  const bar = Math.ceil(n / kol);
  const geser = [[0, 3], [5, -4], [-4, 2], [3, 5], [-5, -3], [4, 0], [-2, 4], [2, -5], [-3, 3], [5, 2], [-5, 4], [0, -4], [3, 3], [-4, -2], [4, 4], [-2, -3], [5, -2], [-3, 5], [2, 0], [-5, -4]];
  return Array.from({ length: n }, (_, i) => {
    const b = Math.floor(i / kol);
    const c = i % kol;
    const [gx, gy] = geser[i % geser.length];
    return { x: 30 + c * 40 + gx, y: bar === 1 ? (y0 + y1) / 2 + gy : y0 + (b * (y1 - y0)) / (bar - 1) + gy };
  });
}

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

/** Titik merah pengisi sel ke-i (0..19) pada dua bingkai di tinggi `y`: id `${id}-t{i}`. Dari nomor `dari` sampai `sampai` (tidak termasuk). */
export const titikDua = (id: string, y: number, sampai: number, dari = 0): Obj[] =>
  Array.from({ length: Math.max(0, sampai - dari) }, (_, q) => {
    const i = dari + q;
    const p = pusatDua(i, y);
    return bulat(`${id}-t${i}`, p.x, p.y, 8.4, i < 10 ? W.merah : W.biru, i < 10 ? W.merah : W.biru, { tebal: 1 });
  });

/** Titik pengisi bingkai tunggal (pojok kiri-atas (x, y), sel `sel`), `n` titik, id `${id}-t{i}`. */
export const titikBingkai = (id: string, x: number, y: number, n: number, warna: string = W.merah, sel = SEL): Obj[] =>
  Array.from({ length: n }, (_, i) => {
    const p = pusatSel(i, x, y, sel);
    return bulat(`${id}-t${i}`, p.x, p.y, sel * 0.32, warna, warna, { tebal: 1 });
  });

/* ------------------------------ Stoples dan ikat ------------------------------ */

/** Stoples kaca: kotak bening bertutup (satu benda), tutup `${id}-x`. */
export const stoples = (id: string, x: number, y: number, w: number, h: number, o: Opsi = {}): Obj[] => [
  kotak(id, x, y, w, h, "#E0F2FE", W.coklat, { rx: 8, tebal: 2.2, ...o }),
  kotak(`${id}-x`, x + w * 0.2, y - 7, w * 0.6, 8, W.emas, W.coklat, { rx: 2, tebal: 1.6, ...o }),
];

/** Lingkaran pita merah muda yang mengikat sepuluh benda: kotak bundar bening di belakang benda, id `${id}`. */
export const ikat = (id: string, x: number, y: number, w: number, h: number, o: Opsi = {}): Obj => kotak(id, x, y, w, h, W.merahMuda, W.merah, { rx: 10, tebal: 2, op: 0.6, z: -1, ...o });

/* ------------------------------ Garis bilangan ------------------------------ */

/** Garis bilangan 10 sampai 20: bilangan n di x = 25 + (n - 10) * 25. */
export const xBil = (n: number): number => 25 + (n - 10) * 25;
export const garisBilangan = (y: number, dari = 10, sampai = 20): Obj[] => [
  garis("gb", xBil(dari) - 8, y, xBil(sampai) - xBil(dari) + 16, 0, W.biru, 2.4),
  ...Array.from({ length: sampai - dari + 1 }, (_, q) => {
    const n = dari + q;
    return [garis(`gb-t${n}`, xBil(n), y - 5, 0, 10, W.biru, 1.8), teks(`gb-n${n}`, xBil(n), y + 18, String(n), 9.4, W.merah)];
  }).flat(),
];
/** Lompatan melengkung dari bilangan a ke b (satu langkah), tergambar bertahap; id `${id}`. */
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

/* ------------------------------ Angka tulisan tangan ------------------------------ */

const f = (n: number): string => n.toFixed(1);
const GARIS_ANGKA: Record<string, string> = {
  "0": "M12 0 Q-2 0 0 20 Q-2 42 12 42 Q26 42 24 20 Q26 0 12 0",
  "1": "M2 8 L12 0 L12 42",
  "2": "M0 10 Q0 0 11 0 Q23 0 23 12 Q23 20 0 40 L25 40",
  "3": "M0 5 Q10 -2 19 4 Q25 14 10 19 Q26 22 22 34 Q12 44 0 36",
  "4": "M17 42 L17 0 L0 28 L27 28",
  "5": "M23 0 L3 0 L1 19 Q9 13 17 17 Q27 25 21 37 Q11 45 0 37",
  "6": "M21 2 Q5 6 3 24 Q1 42 14 42 Q26 40 25 28 Q21 18 5 26",
  "7": "M0 0 L25 0 L9 42",
  "8": "M12 20 Q0 14 4 6 Q12 -2 20 6 Q24 14 12 20 Q0 28 2 36 Q10 46 22 36 Q26 28 12 20",
  "9": "M5 40 Q21 36 23 18 Q25 0 11 0 Q-1 2 1 14 Q5 24 21 16",
};

/** Angka tulisan tangan (jalur yang tergambar bertahap), pojok kiri-atas (x, y), ukuran `s` (1 = 42 tinggi). Id `${id}${i}` per angka. */
export function tulisAngka(id: string, x: number, y: number, angka: string, s = 1, warna: string = W.merah): Obj[] {
  return [...angka].map((c, i) => ({
    id: `${id}${i}`,
    t: "jalur" as const,
    x: x + i * 32 * s,
    y,
    d: GARIS_ANGKA[c].replace(/-?\d+(\.\d+)?/g, (n) => f(Number(n) * s)),
    garis: warna,
    tebal: 3.2,
    gambar: true,
  }));
}
