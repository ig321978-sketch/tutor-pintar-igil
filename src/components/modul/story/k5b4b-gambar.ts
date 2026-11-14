import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 4 Sub-Bab B (keliling segitiga): segitiga dengan sisi berukuran sebenarnya, label sisi, tanda sisi sama panjang,
 * penggaris, dan pita benang. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
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

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((isi, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (isi) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, isi, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Segitiga ------------------------------ */

export type Titik = [number, number];

const f1 = (n: number): string => n.toFixed(1);
const b1 = (n: number): number => Math.round(n * 10) / 10;

/** Bangun datar tertutup dari titik-titik relatif terhadap (x, y). */
export const poligon = (id: string, x: number, y: number, p: Titik[], warna: string, tepi: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, x, y, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0])} ${f1(t[1])}`).join(" ")} Z`, warna, tepi, { tebal: 1.8, ...o });

/**
 * Titik segitiga dari tiga panjang sisi (cm), skala s piksel per cm. Urutan titik: kiri-bawah, kanan-bawah, puncak.
 * Sisi alas = a (titik 0 ke 1), sisi kanan = b (titik 1 ke 2), sisi kiri = c (titik 2 ke 0).
 */
export function titikSegitiga(a: number, b: number, c: number, s: number): Titik[] {
  const x2 = (a * a + c * c - b * b) / (2 * a);
  const y2 = Math.sqrt(c * c - x2 * x2);
  return [[0, b1(y2 * s)], [b1(a * s), b1(y2 * s)], [b1(x2 * s), 0]];
}

/** Panjang tiga sisi dari titik: alas, kanan, kiri. */
export const sisiDariTitik = (p: Titik[]): number[] => [0, 1, 2].map((i) => Math.hypot(p[(i + 1) % 3][0] - p[i][0], p[(i + 1) % 3][1] - p[i][1]));

/** Putar titik sebesar derajat (searah jarum jam di layar), lalu geser agar pojok kiri-atas kotak pembatasnya di (0, 0). */
export function putarTitik(p: Titik[], derajat: number): Titik[] {
  const r = (derajat * Math.PI) / 180;
  const q = p.map(([x, y]): Titik => [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]);
  const mx = Math.min(...q.map((t) => t[0]));
  const my = Math.min(...q.map((t) => t[1]));
  return q.map(([x, y]): Titik => [b1(x - mx), b1(y - my)]);
}

/** Label di luar tiap sisi (alas, kanan, kiri); teks kosong dilewati. Id `${id}-l0` sampai `-l2`. */
export function labelSisi(id: string, x: number, y: number, p: Titik[], isi: [string, string, string], u = 8.6, warna: string = W.hitam, jarak = 13): Obj[] {
  const gx = (p[0][0] + p[1][0] + p[2][0]) / 3;
  const gy = (p[0][1] + p[1][1] + p[2][1]) / 3;
  const out: Obj[] = [];
  for (let i = 0; i < 3; i += 1) {
    if (!isi[i]) continue;
    const a = p[i];
    const b = p[(i + 1) % 3];
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    const n = Math.hypot(mx - gx, my - gy) || 1;
    out.push(teks(`${id}-l${i}`, b1(x + mx + ((mx - gx) / n) * jarak), b1(y + my + ((my - gy) / n) * jarak + u * 0.35), isi[i], u, warna));
  }
  return out;
}

/** Tanda kecil pada sisi-sisi yang sama panjang (indeks 0 alas, 1 kanan, 2 kiri). Id `${id}-m{indeks}`. */
export function tandaSama(id: string, x: number, y: number, p: Titik[], indeks: number[], warna: string = W.merah): Obj[] {
  return indeks.map((i) => {
    const a = p[i];
    const b = p[(i + 1) % 3];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const nx = -(b[1] - a[1]) / len;
    const ny = (b[0] - a[0]) / len;
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    return garis(`${id}-m${i}`, b1(x + mx - nx * 4), b1(y + my - ny * 4), b1(nx * 8), b1(ny * 8), warna, 2);
  });
}

/** Penggaris mendatar sepanjang cm sentimeter (skala s piksel per cm), angka nol di x + 5. Id `${id}-b` dan `${id}-t`. */
export function penggaris(id: string, x: number, y: number, cm: number, s: number): Obj[] {
  const d: string[] = [];
  for (let i = 0; i <= cm; i += 1) d.push(`M${5 + i * s} 0 L${5 + i * s} ${i % 5 === 0 ? 8 : 5}`);
  return [kotak(`${id}-b`, x, y, cm * s + 10, 12, W.krem, W.coklat, { rx: 2, tebal: 1.2 }), jalur(`${id}-t`, x, y, d.join(" "), "none", W.coklat, { tebal: 0.8 })];
}

/** Pita benang yang dibagi segmen (panjang cm dan warna), skala s piksel per cm. Id `${id}-0`, `-1`, dan seterusnya. */
export function pitaBenang(id: string, x: number, y: number, segmen: [number, string][], s: number): Obj[] {
  let cum = 0;
  return segmen.map(([len, warna], i) => {
    const o = kotak(`${id}-${i}`, x + cum * s, y, len * s, 14, warna, W.biru, { rx: 0, tebal: 1.2 });
    cum += len;
    return o;
  });
}
