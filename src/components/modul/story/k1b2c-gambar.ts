import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 2 Sub-Bab C (soal cerita penjumlahan sampai sepuluh): benda berhitung, kartu angka, bingkai sepuluh, deretan bilangan, dan diagram bagian-utuh.
 * Berkas ini TIDAK dipakai bab lain.
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

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/* ------------------------------ Benda berhitung ------------------------------ */

export type Jenis = "bola" | "balon" | "pensil" | "kelereng" | "layang";
const WARNA_BALON = ["#F87171", "#60A5FA", "#FACC15", "#4ADE80", "#C084FC"];
const WARNA_PENSIL = ["#60A5FA", "#F87171", "#4ADE80", "#FACC15", "#C084FC"];
const WARNA_KELERENG = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8"];
const WARNA_LAYANG = ["#F472B6", "#FACC15", "#38BDF8", "#4ADE80", "#FB923C"];
const f = (n: number): string => n.toFixed(1);

/** Satu benda berhitung berpusat di (cx, cy). Benda utama berid `id`; balon, pensil, dan layang-layang punya pelengkap `id-x` (tali, penghapus, ekor); bola dan kelereng tunggal. */
export function benda(jenis: Jenis, id: string, cx: number, cy: number, r = 9, i = 0, o: Opsi = {}): Obj[] {
  if (jenis === "bola") return [bulat(id, cx, cy, r, W.oranye, W.coklat, { tebal: 2.2, ...o })];
  if (jenis === "balon") return [bulat(id, cx, cy, r * 0.85, WARNA_BALON[i % 5], W.biru, { tebal: 1.2, ...o }), garis(`${id}-x`, cx, cy + r * 0.85, 2, r * 1.1, W.abu, 1.3, o)];
  if (jenis === "pensil") return [kotak(id, cx - r * 0.4, cy - r * 0.8, r * 0.8, r * 1.8, WARNA_PENSIL[i % 5], W.biru, { rx: 2, tebal: 1.3, ...o }), kotak(`${id}-x`, cx - r * 0.4, cy - r * 1.1, r * 0.8, 4, W.pink, W.biru, { rx: 1, tebal: 1, ...o })];
  if (jenis === "kelereng") return [bulat(id, cx, cy, r * 0.62, WARNA_KELERENG[i % 5], W.biru, { tebal: 2, ...o })];
  const d = `M0 ${f(-r * 1.1)} L${f(r * 0.8)} 0 L0 ${f(r * 1.1)} L${f(-r * 0.8)} 0 Z`;
  return [{ id, t: "jalur", x: cx, y: cy, d, warna: WARNA_LAYANG[i % 5], garis: W.biru, tebal: 1.2, ...o }, garis(`${id}-x`, cx, cy + r * 1.1, 4, r * 0.9, W.coklat, 1.3, o)];
}

export type Titik = { x: number; y: number };

/** Letak `n` benda: sampai lima sebaris (di tengah, tinggi `y`), enam sampai sepuluh dua baris (lima di atas, sisanya di bawah). */
export function tata(n: number, y = 92): Titik[] {
  if (n <= 5) return Array.from({ length: n }, (_, i) => ({ x: 150 - ((n - 1) * 50) / 2 + i * 50, y }));
  return Array.from({ length: n }, (_, i) => ({ x: 50 + (i % 5) * 50, y: i < 5 ? 64 : 126 }));
}

/** Benda sejenis di titik-titik `pts`, id `${id}${i}`. */
export const deret = (jenis: Jenis, id: string, pts: Titik[], r = 9, o: Opsi = {}): Obj[] => pts.flatMap((p, i) => benda(jenis, `${id}${i}`, p.x, p.y, r, i, o));

/** Id benda utama `${id}0` sampai `${id}${n-1}`. */
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Tangan penunjuk (ujung jari ke atas) di bawah benda. */
export const tangan = (x: number, y: number, id = "tg"): Obj => emo(id, x, y, "\u{1F446}", 22);

/* ------------------------------ Kartu angka, titik, bingkai, keranjang ------------------------------ */

/** Kartu angka besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, angka: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah, o),
];

const POLA_DADU: Record<number, number[][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [2, 0], [0, 2], [2, 2]],
  5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
  6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
};

/** Kartu titik berukuran `w` (persegi) dengan `n` titik; pojok kiri-atas (x, y); id kartu `${id}-k`, titik `${id}-t{i}`. */
export function kartuTitik(id: string, x: number, y: number, n: number, w = 44, o: Opsi = {}): Obj[] {
  const r = w * 0.085;
  const out: Obj[] = [kotak(`${id}-k`, x, y, w, w, W.putih, W.biru, { rx: 6, tebal: 1.6, ...o })];
  let pos: number[][];
  if (POLA_DADU[n]) pos = POLA_DADU[n].map(([c, b]) => [x + w * 0.22 + (c * w * 0.56) / 2, y + w * 0.22 + (b * w * 0.56) / 2]);
  else {
    const kol = Math.ceil(n / 2);
    pos = Array.from({ length: n }, (_, i) => [x + w * 0.16 + ((i % kol) * w * 0.68) / (kol - 1 || 1), y + w * 0.3 + (i < kol ? 0 : w * 0.4)]);
  }
  pos.forEach((p, i) => out.push(bulat(`${id}-t${i}`, p[0], p[1], r, W.biru, undefined, o)));
  return out;
}

/** Bingkai sepuluh: dua baris lima sel (pojok kiri-atas (x, y)), `n` titik merah mengisi baris atas lebih dulu. */
export function bingkai(id: string, x: number, y: number, n: number, sel = 26, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < 10; i += 1) out.push(kotak(`${id}-c${i}`, x + (i % 5) * sel, y + Math.floor(i / 5) * sel, sel, sel, W.putih, W.biru, { rx: 0, tebal: 1.3, ...o }));
  for (let i = 0; i < n; i += 1) out.push(bulat(`${id}-t${i}`, x + (i % 5) * sel + sel / 2, y + Math.floor(i / 5) * sel + sel / 2, sel * 0.32, W.merah, W.merah, { tebal: 1, ...o }));
  return out;
}

/** Keranjang kosong dengan pojok kiri-atas (x, y); id `${id}` dan bibir `${id}-r`. */
export const keranjang = (id: string, x: number, y: number, w = 100, h = 44, o: Opsi = {}): Obj[] => [
  kotak(id, x, y, w, h, "#FDE68A", W.coklat, { rx: 6, tebal: 1.8, ...o }),
  kotak(`${id}-r`, x - 3, y - 4, w + 6, 7, "#FCD34D", W.coklat, { rx: 3, tebal: 1.4, ...o }),
];

/* ------------------------------ Angka tulisan tangan ------------------------------ */

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

/* ------------------------------ Deretan bilangan, diagram bagian-utuh ------------------------------ */

/** Deretan sel bilangan dari `dari` sampai `sampai`: sel `${id}k{v}` dan angka `${id}t{v}`; sel bernilai v berpusat di x = 33 + 26 * (v - 1). */
export function deretBilangan(id: string, y: number, dari = 1, sampai = 10, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let v = dari; v <= sampai; v += 1) out.push(kotak(`${id}k${v}`, 20 + 26 * (v - 1), y, 26, 26, v % 2 ? W.krem : W.langit, W.biru, { rx: 0, tebal: 1.3, ...o }), teks(`${id}t${v}`, 33 + 26 * (v - 1), y + 18, String(v), 13, W.biru, o));
  return out;
}

/** Pensil berpusat di (cx, cy) dengan badan berwarna `warna`; id `${id}` dan penghapus `${id}-x`. */
export const pensilW = (id: string, cx: number, cy: number, warna: string, o: Opsi = {}): Obj[] => [
  kotak(id, cx - 4, cy - 9, 8, 20, warna, W.biru, { rx: 2, tebal: 1.2, ...o }),
  kotak(`${id}-x`, cx - 4, cy - 13, 8, 4, W.pink, W.biru, { rx: 1, tebal: 1, ...o }),
];

/** Letak titik di bingkai sepuluh (pojok kiri-atas (x, y), sel 26): titik ke-i. */
export const titikBingkai = (x: number, y: number, i: number): Titik => ({ x: x + (i % 5) * 26 + 13, y: y + Math.floor(i / 5) * 26 + 13 });
