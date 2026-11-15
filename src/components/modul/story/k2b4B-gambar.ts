import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 4 Sub-Bab B (Pola): barisan benda berpola, huruf kode, kurung satuan pola, dan tanda pola atau bukan.
 * Berkas ini TIDAK dipakai bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Benda ke-n pada barisan `b`: `${b}_${n}_${simbol}` (n mulai 0 dari kiri). Simbol: bentuk (lingkaran, persegi, segitiga, hati, bintang, bunga),
 *   warna (merah, biru, kuning, hijau), gerakan (berdiri, membungkuk, naik), suara (keras, pelan, diam), atau `kosong` (kotak putus-putus).
 * - Huruf kode benda ke-n: `${b}-L${n}`. Tulisan kode seluruh barisan: `${b}-kode`.
 * - Kurung satuan pola ke-j: `${b}-sat${j}` (kotak putus-putus yang memeluk satu satuan). Tanda: `${b}-tanda` (✅ pola, ❌ bukan pola).
 * - Tabel: baris `t1..t4`, label `${b}-lb`, satuan `${b}-sat`, kode `${b}-kd`, banyak satuan `${b}-ul`.
 * - Kartu pilihan `c1..cn` (`c1-k`, `c1-t`).
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  kuning: "#FDE68A",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai empat baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan atau kata: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Benda pola ------------------------------ */

export const WARNA_ISI: Record<string, string> = { merah: "#EF4444", biru: "#3B82F6", kuning: "#FACC15", hijau: "#22C55E" };
export const GERAK_EMOJI: Record<string, string> = { berdiri: "\u{1F9CD}", membungkuk: "\u{1F647}", naik: "\u{1F64B}" };
export const GLIF: Record<string, string> = { hati: "♥", bintang: "★", bunga: "✿" };
export const KOSONG = "kosong";

export type Tata = { N: number; u: number; gap: number; ox: number };
/** Tata barisan: `N` tempat sejajar di tengah kanvas, tiap benda selebar `u`, jarak `gap`. */
export const tata = (N: number, u = 22, gap = 10, ox = 0): Tata => ({ N, u, gap, ox });
const r1 = (n: number): number => Math.round(n * 10) / 10;
/** Titik tengah (x) tempat ke-i. */
export const xPusat = (t: Tata, i: number): number => r1(150 + t.ox - (t.N * (t.u + t.gap) - t.gap) / 2 + i * (t.u + t.gap) + t.u / 2);

/** Satu benda pola ke-n dengan simbol `s` pada barisan `b`, tengah (xPusat, cy). */
export function item(b: string, n: number, s: string, t: Tata, cy: number, o: Opsi = {}): Obj {
  const id = `${b}_${n}_${s}`;
  const cx = xPusat(t, n);
  const u = t.u;
  const z = { z: 2, ...o };
  if (s === "lingkaran") return bulat(id, cx, cy, u / 2, "#BFDBFE", W.biru, z);
  if (s === "persegi") return kotak(id, r1(cx - u / 2), r1(cy - u / 2), u, u, "#FDE68A", W.biru, { rx: 2, ...z });
  if (s === "segitiga") {
    const d = `M${cx} ${r1(cy - u * 0.58)} L${r1(cx + u * 0.6)} ${r1(cy + u * 0.46)} L${r1(cx - u * 0.6)} ${r1(cy + u * 0.46)} Z`;
    return { id, t: "jalur", x: 0, y: 0, d, warna: "#FBCFE8", garis: W.biru, tebal: 1.6, ...z };
  }
  if (GLIF[s]) return teks(id, cx, r1(cy + u * 0.42), GLIF[s], r1(u * 1.3), s === "hati" ? W.merah : s === "bintang" ? "#F59E0B" : "#DB2777", z);
  if (WARNA_ISI[s]) return bulat(id, cx, cy, u / 2, WARNA_ISI[s], W.biru, z);
  if (GERAK_EMOJI[s]) return teks(id, cx, r1(cy + u * 0.4), GERAK_EMOJI[s], r1(u * 1.15), W.biru, z);
  if (s === "keras") return bulat(id, cx, cy, r1(u * 0.56), "#F59E0B", W.biru, z);
  if (s === "pelan") return bulat(id, cx, cy, r1(u * 0.28), "#FDE68A", W.biru, z);
  if (s === "diam") return bulat(id, cx, cy, r1(u * 0.4), "none", W.biru, { putus: true, ...z });
  if (s === KOSONG) return kotak(id, r1(cx - u / 2), r1(cy - u / 2), u, u, "none", W.biru, { rx: 3, putus: true, ...z });
  throw new Error(`simbol tidak dikenal: ${s}`);
}

/** Semua benda barisan `b` (urutan `seq`), mulai benda ke-`dari`. */
export const semuaItem = (b: string, seq: string[], t: Tata, cy: number, dari = 0, o: Opsi = {}): Obj[] => seq.map((s, i) => item(b, i, s, t, cy, o)).slice(dari);

export const idItem = (b: string, n: number, s: string): string => `${b}_${n}_${s}`;

/** Huruf kode: A untuk simbol pertama yang muncul, B untuk simbol kedua, dan seterusnya. */
export const kodeDari = (seq: string[]): string[] => {
  const lihat: string[] = [];
  return seq.map((s) => {
    if (!lihat.includes(s)) lihat.push(s);
    return String.fromCharCode(65 + lihat.indexOf(s));
  });
};

/** Huruf kode benda ke-n pada barisan `b`, di bawah benda. */
export const hurufItem = (b: string, n: number, h: string, t: Tata, cy: number): Obj => teks(`${b}-L${n}`, xPusat(t, n), r1(cy + t.u * 0.5 + 15), h, 11, W.ungu, { z: 3 });

/** Tulisan kode seluruh barisan. */
export const kodeTeks = (b: string, kode: string[], y: number, x = 150): Obj => teks(`${b}-kode`, x, y, kode.join(" "), 11, W.merah, { z: 3 });

/** Kurung putus-putus yang memeluk satuan ke-j (tiap satuan `banyak` benda). */
export const kurungSatuan = (b: string, j: number, banyak: number, t: Tata, cy: number): Obj => {
  const kiri = xPusat(t, j * banyak) - t.u / 2 - 5;
  const kanan = xPusat(t, j * banyak + banyak - 1) + t.u / 2 + 5;
  return kotak(`${b}-sat${j}`, r1(kiri), r1(cy - t.u * 0.75 - 4), r1(kanan - kiri), r1(t.u * 1.5 + 8), "none", W.ungu, { rx: 7, putus: true, tebal: 2.2, z: 1 });
};

/** Tanda pola atau bukan pola di sisi kanan barisan. */
export const tanda = (b: string, ok: boolean, cy: number, x = 280): Obj => teks(`${b}-tanda`, x, r1(cy + 7), ok ? "✅" : "❌", 22, W.biru, { z: 4 });
