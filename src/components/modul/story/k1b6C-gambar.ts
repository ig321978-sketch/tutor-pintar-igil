import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 6 Sub-Bab C (pengurangan yang hasilnya kurang dari 20):
 * apel, bolu kukus, stiker, kelereng, balon, kotak sepuluh, garis bilangan (lompatan mundur dan maju), bagan pasangan, dan tabel puluhan dan satuan.
 * Berkas ini TIDAK dipakai bab lain.
 * Benda berhitung: `id{i}` benda ke-i (dihitung uji). Kotak sepuluh: sel `id-c{i}`.
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

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). Id `${id}-k` dan `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Id bagian kartu (kotak dan teks) untuk dihapus bersama. */
export const idKartu = (id: string, baris = 1): string[] => [`${id}-k`, ...Array.from({ length: baris }, (_, i) => `${id}-t${i}`)];

/** Kartu angka besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, angka: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah, o),
];

/* ------------------------------ Benda berhitung ------------------------------ */

export type Jenis = "apel" | "bolu" | "stiker" | "kelereng" | "balon";
const WARNA_KELERENG = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8", "#FACC15"];
const WARNA_BALON = ["#F87171", "#60A5FA", "#FACC15", "#4ADE80", "#C084FC"];
const WARNA_STIKER = ["#60A5FA", "#F472B6", "#4ADE80", "#FACC15", "#C084FC"];

/** Satu benda berhitung berpusat di (cx, cy); satu objek saja supaya mudah diseret. */
export function benda(jenis: Jenis, id: string, cx: number, cy: number, r = 7, i = 0, o: Opsi = {}): Obj[] {
  if (jenis === "apel") return [bulat(id, cx, cy, r, i % 2 === 0 ? "#EF4444" : "#F87171", "#7F1D1D", { tebal: 1.6, ...o })];
  if (jenis === "bolu") return [bulat(id, cx, cy, r, "#FDE68A", "#B45309", { tebal: 1.8, ...o })];
  if (jenis === "kelereng") return [bulat(id, cx, cy, r, WARNA_KELERENG[i % 6], W.biru, { tebal: 1.6, ...o })];
  if (jenis === "balon") return [bulat(id, cx, cy, r, WARNA_BALON[i % 5], W.biru, { tebal: 1.2, ...o })];
  return [kotak(id, cx - r, cy - r, r * 2, r * 2, WARNA_STIKER[i % 5], W.biru, { rx: 3, tebal: 1.2, ...o })];
}

/** Benda sejenis di titik-titik `pts`, id `${id}${i}`. */
export const deret = (jenis: Jenis, id: string, pts: Titik[], r = 7, o: Opsi = {}): Obj[] => pts.flatMap((p, i) => benda(jenis, `${id}${i}`, p.x, p.y, r, i, o));

/** Id benda utama `${id}0` sampai `${id}${n-1}`. */
export const idDeret = (id: string, n: number, dari = 0): string[] => Array.from({ length: n - dari }, (_, i) => `${id}${dari + i}`);

/** Titik tersusun rapi `n` benda, `kol` kolom, mulai (x0, y0), jarak (dx, dy). */
export const petak = (n: number, kol: number, x0: number, y0: number, dx: number, dy: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + (i % kol) * dx, y: y0 + Math.floor(i / kol) * dy }));

/* ------------------------------ Kotak sepuluh ------------------------------ */

export const SEL = 26;
/** Pusat sel ke-i (0..9) kotak dengan pojok kiri-atas (x, y): lima sel sebaris, dua baris. */
export const pusatSel = (i: number, x: number, y: number, sel = SEL): Titik => ({ x: x + (i % 5) * sel + sel / 2, y: y + Math.floor(i / 5) * sel + sel / 2 });

/** Satu kotak sepuluh kosong, id sel `${id}-c{i}`. */
export const bingkai = (id: string, x: number, y: number, sel = SEL, o: Opsi = {}): Obj[] =>
  Array.from({ length: 10 }, (_, i) => kotak(`${id}-c${i}`, x + (i % 5) * sel, y + Math.floor(i / 5) * sel, sel, sel, W.putih, W.biru, { rx: 0, tebal: 1.3, z: -1, ...o }));

export const idBingkai = (id: string): string[] => Array.from({ length: 10 }, (_, i) => `${id}-c${i}`);

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
const f = (n: number): string => n.toFixed(1);
/** Lompatan melengkung dari bilangan a ke b (satu langkah, boleh ke kiri atau ke kanan), tergambar bertahap; id `${id}`. */
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

/** Lompatan melengkung di BAWAH garis (untuk memeriksa dengan maju), dari bilangan a ke b; id `${id}`. */
export const lompatBawah = (id: string, a: number, b: number, y: number, warna: string = W.biru): Obj => ({
  id,
  t: "jalur",
  x: xBil(a),
  y: y + 6,
  d: `M0 0 Q${f((xBil(b) - xBil(a)) / 2)} 22 ${f(xBil(b) - xBil(a))} 0`,
  garis: warna,
  tebal: 2.2,
  gambar: true,
});

/* ------------------------------ Bagan pasangan ------------------------------ */

/** Bagan pasangan: bulatan utuh di atas (id `${id}u`), dua bagian di bawah (`${id}a`, `${id}b`), dan dua garis penghubung. Isi bulatan teks. */
export function bagan(id: string, utuh: string, a: string, b: string, y = 40, o: { warnaUtuh?: string; warnaA?: string; warnaB?: string } = {}): Obj[] {
  const ya = y + 62;
  return [
    garis(`${id}ga`, 150, y + 16, -50, 30, W.biru, 2, { z: -1 }),
    garis(`${id}gb`, 150, y + 16, 50, 30, W.biru, 2, { z: -1 }),
    bulat(`${id}u`, 150, y, 17, o.warnaUtuh ?? W.krem, W.biru, { tebal: 2 }),
    teks(`${id}ut`, 150, y + 6, utuh, 17, W.merah),
    bulat(`${id}a`, 100, ya, 17, o.warnaA ?? W.hijauMuda, W.biru, { tebal: 2 }),
    teks(`${id}at`, 100, ya + 6, a, 17, W.merah),
    bulat(`${id}b`, 200, ya, 17, o.warnaB ?? W.pink, W.biru, { tebal: 2 }),
    teks(`${id}bt`, 200, ya + 6, b, 17, W.merah),
  ];
}
export const idBagan = (id: string): string[] => ["ga", "gb", "u", "ut", "a", "at", "b", "bt"].map((s) => `${id}${s}`);
