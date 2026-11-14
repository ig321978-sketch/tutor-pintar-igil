import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 6 Sub-Bab A (sudut siku-siku): bangun datar dari titik sudut, penanda siku-siku di titik sudut,
 * penggaris siku-siku, kertas lipat, bingkai, dan tabel. Berkas ini TIDAK dipakai bab lain.
 * Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  kayu: "#D6A15B",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/* ------------------------------ Tabel ------------------------------ */

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, sel, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Bangun datar dan sudut siku-siku ------------------------------ */

export type Titik = [number, number];

const f1 = (n: number): string => n.toFixed(1);

/** Bangun datar tertutup dari titik-titik relatif terhadap (x, y). */
export const poligon = (id: string, x: number, y: number, p: Titik[], warna: string, tepi: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, x, y, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0])} ${f1(t[1])}`).join(" ")} Z`, warna, tepi, { tebal: 1.8, ...o });

/** Memutar titik-titik searah jarum jam (derajat layar) mengelilingi (cx, cy). */
export function putar(p: Titik[], derajat: number, cx: number, cy: number): Titik[] {
  const r = (derajat * Math.PI) / 180;
  return p.map(([x, y]) => [cx + (x - cx) * Math.cos(r) - (y - cy) * Math.sin(r), cy + (x - cx) * Math.sin(r) + (y - cy) * Math.cos(r)]);
}

/** Geser titik-titik. */
export const geser = (p: Titik[], dx: number, dy: number): Titik[] => p.map(([x, y]) => [x + dx, y + dy]);

/**
 * Penanda siku-siku di titik sudut ke-`i` sebuah bangun yang titik-titiknya (mutlak) `p`: dua garis pendek tegak lurus sepanjang `s`
 * di dalam sudut. Dipasang di titik sudut itu sendiri (x, y = titik sudut), jadi uji dapat mencocokkannya dengan bangun.
 */
export function penandaSiku(id: string, p: Titik[], i: number, s = 6, warna: string = W.merah, o: Opsi = {}): Obj {
  const v = p[i];
  const a = p[(i + p.length - 1) % p.length];
  const b = p[(i + 1) % p.length];
  const ua: Titik = [(a[0] - v[0]) / Math.hypot(a[0] - v[0], a[1] - v[1]), (a[1] - v[1]) / Math.hypot(a[0] - v[0], a[1] - v[1])];
  const ub: Titik = [(b[0] - v[0]) / Math.hypot(b[0] - v[0], b[1] - v[1]), (b[1] - v[1]) / Math.hypot(b[0] - v[0], b[1] - v[1])];
  return jalur(id, v[0], v[1], `M${f1(ua[0] * s)} ${f1(ua[1] * s)} L${f1((ua[0] + ub[0]) * s)} ${f1((ua[1] + ub[1]) * s)} L${f1(ub[0] * s)} ${f1(ub[1] * s)}`, "none", warna, { tebal: 1.8, ...o });
}

/** Besar sudut dalam (derajat) di titik sudut ke-`i`. */
export function sudutDalam(p: Titik[], i: number): number {
  const v = p[i];
  const a = p[(i + p.length - 1) % p.length];
  const b = p[(i + 1) % p.length];
  const m = [a[0] - v[0], a[1] - v[1]];
  const n = [b[0] - v[0], b[1] - v[1]];
  return (Math.acos((m[0] * n[0] + m[1] * n[1]) / (Math.hypot(m[0], m[1]) * Math.hypot(n[0], n[1]))) * 180) / Math.PI;
}

/** Banyak titik sudut yang siku-siku (toleransi setengah derajat) pada sebuah bangun. */
export const hitungSiku = (p: Titik[]): number => p.reduce((t, _, i) => t + (Math.abs(sudutDalam(p, i) - 90) < 0.5 ? 1 : 0), 0);

/** Enam bangun Ayo Berlatih (Buku Siswa hlm. 169), titik relatif; urutan nomor 1 sampai 6. Kunci Panduan Guru: 4, 2, 0, 0, 4, 2 sudut siku-siku. */
export const BANGUN_LATIHAN: Titik[][] = [
  [[0, 0], [60, 0], [60, 38], [0, 38]],
  [[0, 12], [11, 0], [49, 0], [60, 12], [60, 38], [0, 38]],
  [[0, 20], [34, 0], [68, 20], [34, 40]],
  [[0, 12], [56, 0], [48, 42]],
  putar([[0, 0], [40, 0], [40, 40], [0, 40]], 30, 20, 20),
  [[0, 8], [48, 0], [48, 40], [0, 40]],
];

/** Penggaris siku-siku (segitiga siku-siku) dengan sudut siku-siku di (0, 0): titik relatif. */
export const titikPenggaris = (a: number, b: number): Titik[] => [[0, 0], [a, 0], [0, -b]];

/** Bingkai foto: bingkai kayu di (x, y) berukuran w kali h, dengan isi bergambar. Id `${id}-l` luar dan `${id}-d` dalam. */
export function bingkai(id: string, x: number, y: number, w: number, h: number, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-l`, x, y, w, h, W.kayu, W.coklat, { rx: 0, tebal: 2, ...o }), kotak(`${id}-d`, x + 7, y + 7, w - 14, h - 14, W.langit, W.coklat, { rx: 0, tebal: 1.2, ...o })];
}

/** Memperbesar titik-titik dengan faktor s dari titik asal. */
export const skala = (p: Titik[], s: number): Titik[] => p.map(([x, y]) => [x * s, y * s]);

/**
 * Patokan siku-siku (segitiga siku-siku yang kaku) diletakkan di titik sudut ke-`i` sebuah bangun: kaki `a` menyusuri sisi menuju titik berikutnya,
 * kaki `b` tegak lurus dari kaki pertama, ke arah sisi yang menuju titik sebelumnya. Sudutnya di titik pertama selalu 90 derajat.
 */
export function patokanDi(p: Titik[], i: number, a: number, b: number): Titik[] {
  const v = p[i];
  const n = p[(i + 1) % p.length];
  const r = p[(i + p.length - 1) % p.length];
  const jn = Math.hypot(n[0] - v[0], n[1] - v[1]);
  const u: Titik = [(n[0] - v[0]) / jn, (n[1] - v[1]) / jn];
  let t: Titik = [-u[1], u[0]];
  if (t[0] * (r[0] - v[0]) + t[1] * (r[1] - v[1]) < 0) t = [-t[0], -t[1]];
  return [v, [v[0] + u[0] * a, v[1] + u[1] * a], [v[0] + t[0] * b, v[1] + t[1] * b]];
}

/** Juring lingkaran berpusat di (x, y), jari-jari r, dari sudut layar `dari` ke `sampai` (derajat, searah jarum jam). */
export function baji(id: string, x: number, y: number, r: number, dari: number, sampai: number, warna: string, tepi: string = W.biru, o: Opsi = {}): Obj {
  const rad = (d: number) => (d * Math.PI) / 180;
  const c = (d: number) => `${f1(r * Math.cos(rad(d)))} ${f1(r * Math.sin(rad(d)))}`;
  return jalur(id, x, y, `M0 0 L${c(dari)} A${r} ${r} 0 ${sampai - dari > 180 ? 1 : 0} 1 ${c(sampai)} Z`, warna, tepi, { tebal: 1.4, ...o });
}
