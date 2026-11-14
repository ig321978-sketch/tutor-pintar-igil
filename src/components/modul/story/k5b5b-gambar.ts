import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 5 Sub-Bab B (luas daerah bangun datar): kertas berpetak, tujuh bangun datar Eksplorasi 5.2A sampai 5.2G,
 * potongan yang dipindahkan menjadi persegi panjang atau jajargenjang, dan model bantu metode luar. Berkas ini TIDAK dipakai bab lain.
 * Semua bangun digambar dalam satuan petak (S = 20 piksel per satuan), titik awal kiri-atas, sumbu y ke bawah.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  jeruk: "#FB923C",
  krem: "#FEF9C3",
  muda: "#DBEAFE",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  ungMuda: "#EDE9FE",
  langitMuda: "#E0F2FE",
};

type Opsi = Partial<Obj>;
export type Pt = [number, number];

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Id semua benda dalam daftar (untuk dihapus). */
export const idDari = (...daftar: Array<Obj | Obj[]>): string[] => daftar.flat().map((o) => o.id);

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Kartu satu metode luar: nama (satu sampai dua baris) dan arti singkat. Lebar 134, tinggi 70. */
export const kartuMetode = (id: string, x: number, y: number, warna: string, baris: string[], arti: string): Obj[] => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 24 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 28 + baris.length * 12, arti, 7, W.ungu),
];

/** Tanda centang atau silang di (x, y) (garis dasar teks). */
export const tanda = (id: string, x: number, y: number, ya: boolean, u = 12): Obj => teks(id, x, y, ya ? "✓" : "✗", u, ya ? W.hijau : W.merah);

/** Gelembung ide siswa: kotak dengan nama di kiri-atas dan satu sampai tiga baris isi rata kiri. */
export function ide(id: string, x: number, y: number, w: number, h: number, nama: string, baris: string[], warna: string = W.krem, u = 8): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }),
    teks(`${id}-n`, x + 8, y + 12, nama, 8.6, W.ungu, { anchor: "start" }),
    ...baris.map((b, i) => teks(`${id}-t${i}`, x + 8, y + 25 + i * (u + 3.5), b, u, W.biru, { anchor: "start" })),
  ];
}

/* ------------------------------ Kertas berpetak dan bangun dalam satuan petak ------------------------------ */

/** Panjang satu satuan petak pada gambar, dalam piksel. */
export const S = 20;

const f1 = (n: number): string => (Math.round(n * 10) / 10).toString();

/** Kertas berpetak kol x bar petak, pojok kiri-atas (x, y). Garis kisi saja, tanpa isi. */
export function kisi(id: string, x: number, y: number, kol: number, bar: number, warna: string = W.abu, o: Opsi = {}): Obj {
  let d = "";
  for (let i = 0; i <= kol; i += 1) d += `M${f1(i * S)} 0 L${f1(i * S)} ${f1(bar * S)} `;
  for (let j = 0; j <= bar; j += 1) d += `M0 ${f1(j * S)} L${f1(kol * S)} ${f1(j * S)} `;
  return jalur(id, x, y, d.trim(), "none", warna, { tebal: 0.8, ...o });
}

/** Garis lintasan poligon dari titik-titik dalam satuan petak (y ke bawah). */
export const lintasan = (pts: Pt[]): string => `${pts.map((p, i) => `${i === 0 ? "M" : "L"}${f1(p[0] * S)} ${f1(p[1] * S)}`).join(" ")} Z`;

/** Bangun (poligon) dengan titik dalam satuan petak, titik asal gambar di (x, y). */
export const poli = (id: string, x: number, y: number, pts: Pt[], warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => jalur(id, x, y, lintasan(pts), warna, garisW, { tebal: 1.8, ...o });

/** Luas poligon (rumus tali sepatu) dalam satuan luas. */
export function luasPoli(pts: Pt[]): number {
  let s = 0;
  for (let i = 0; i < pts.length; i += 1) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s) / 2;
}

export const geser = (pts: Pt[], dx: number, dy: number): Pt[] => pts.map((p) => [p[0] + dx, p[1] + dy]);
/** Putar setengah putaran (180 derajat) terhadap titik (cx, cy). */
export const putar180 = (pts: Pt[], cx: number, cy: number): Pt[] => pts.map((p) => [2 * cx - p[0], 2 * cy - p[1]]);
/** Cerminkan terhadap garis tegak x = c. */
export const cerminX = (pts: Pt[], c: number): Pt[] => pts.map((p) => [2 * c - p[0], p[1]]);
/** Putar seperempat putaran lalu geser: (x, y) menjadi (tx - y, ty + x). */
export const putar90 = (pts: Pt[], tx: number, ty: number): Pt[] => pts.map((p) => [tx - p[1], ty + p[0]]);

/** Persegi panjang p x l satuan dengan pojok kiri-atas di (0, 0). */
export const persegiPanjang = (p: number, l: number): Pt[] => [[0, 0], [p, 0], [p, l], [0, l]];

/**
 * Tujuh bangun Eksplorasi 5.2A sampai 5.2G beserta potongannya. Ukuran sama dengan kunci Buku Panduan Guru hlm. 203-226:
 * persegi panjang A-D (2x1, 5x2, 4x3, 2x3), persegi A-D (1 sampai 4), segitiga alas 4 tinggi 4 dan alas 5 tinggi 4, jajargenjang alas 4 tinggi 2,
 * trapesium alas 5 atas 2 tinggi 2, belah ketupat diagonal 2 dan 4, layang-layang diagonal 5 dan 4.
 */
export const PERSEGI_PANJANG_ABCD: Array<[number, number]> = [[2, 1], [5, 2], [4, 3], [2, 3]];
export const PERSEGI_ABCD: number[] = [1, 2, 3, 4];

export const SEG1 = {
  asal: [[0, 4], [4, 4], [0, 0]] as Pt[],
  atas: [[0, 0], [0, 2], [2, 2]] as Pt[],
  bawah: [[0, 2], [2, 2], [4, 4], [0, 4]] as Pt[],
  baru: putar180([[0, 0], [0, 2], [2, 2]], 2, 2),
  hasil: [[0, 2], [4, 2], [4, 4], [0, 4]] as Pt[],
  alas: 4,
  tinggi: 4,
  luas: 8,
};

export const SEG2 = {
  asal: [[0, 4], [5, 4], [2, 0]] as Pt[],
  kiri: [[2, 0], [1, 2], [2, 2]] as Pt[],
  kanan: [[2, 0], [2, 2], [3.5, 2]] as Pt[],
  bawah: [[1, 2], [3.5, 2], [5, 4], [0, 4]] as Pt[],
  kiriBaru: putar180([[2, 0], [1, 2], [2, 2]], 1, 2),
  kananBaru: putar180([[2, 0], [2, 2], [3.5, 2]], 3.5, 2),
  hasil: [[0, 2], [5, 2], [5, 4], [0, 4]] as Pt[],
  alas: 5,
  tinggi: 4,
  luas: 10,
};

export const JJG = {
  asal: [[1, 0], [5, 0], [4, 2], [0, 2]] as Pt[],
  sisa: [[1, 0], [1, 2], [4, 2], [5, 0]] as Pt[],
  potong: [[0, 2], [1, 2], [1, 0]] as Pt[],
  baru: geser([[0, 2], [1, 2], [1, 0]], 4, 0),
  hasil: [[1, 0], [5, 0], [5, 2], [1, 2]] as Pt[],
  alas: 4,
  tinggi: 2,
  luas: 8,
};

export const TRAP = {
  asal: [[1, 0], [3, 0], [5, 2], [0, 2]] as Pt[],
  atas: [[1, 0], [3, 0], [4, 1], [0.5, 1]] as Pt[],
  bawah: [[0.5, 1], [4, 1], [5, 2], [0, 2]] as Pt[],
  baru: putar180([[1, 0], [3, 0], [4, 1], [0.5, 1]], 4, 1),
  hasil: [[0.5, 1], [7.5, 1], [7, 2], [0, 2]] as Pt[],
  alas: 5,
  atasSisi: 2,
  tinggi: 2,
  alasBaru: 7,
  luas: 7,
};

export const BK = {
  asal: [[1, 0], [2, 2], [1, 4], [0, 2]] as Pt[],
  kiriAtas: [[1, 0], [0, 2], [1, 2]] as Pt[],
  kananAtas: [[1, 0], [1, 2], [2, 2]] as Pt[],
  bawah: [[0, 2], [2, 2], [1, 4]] as Pt[],
  kiriBaru: geser([[1, 0], [0, 2], [1, 2]], 1, 2),
  kananBaru: geser([[1, 0], [1, 2], [2, 2]], -1, 2),
  hasil: [[0, 2], [2, 2], [2, 4], [0, 4]] as Pt[],
  diagonal1: 2,
  diagonal2: 4,
  luas: 4,
};

export const KITE = {
  asal: [[2, 0], [5, 2], [2, 4], [0, 2]] as Pt[],
  kiriAtas: [[2, 0], [0, 2], [2, 2]] as Pt[],
  kananAtas: [[2, 0], [2, 2], [5, 2]] as Pt[],
  bawah: [[0, 2], [2, 4], [5, 2]] as Pt[],
  kiriBaru: putar90([[2, 0], [0, 2], [2, 2]], 2, 2),
  kananBaru: cerminX(geser([[2, 0], [2, 2], [5, 2]], 0, 2), 3.5),
  hasil: [[0, 2], [5, 2], [5, 4], [0, 4]] as Pt[],
  diagonal1: 5,
  diagonal2: 4,
  luas: 10,
};

/** Bangun di atas kertas berpetak: bangunnya (-bg) lalu kisi di atasnya (-g). Ukuran kertas kol x bar petak. */
export function bangunBerpetak(id: string, x: number, y: number, kol: number, bar: number, pts: Pt[], warna: string, garisW: string = W.biru, o: Opsi = {}): Obj[] {
  return [poli(`${id}-bg`, x, y, pts, warna, garisW, o), kisi(`${id}-g`, x, y, kol, bar, W.abu, o)];
}
