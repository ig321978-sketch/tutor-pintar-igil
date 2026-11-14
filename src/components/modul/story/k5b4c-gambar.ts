import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 4 Sub-Bab C (keliling segi empat): persegi panjang, jajargenjang, layang-layang, persegi, belah ketupat,
 * trapesium, dan segi empat sembarang beserta label sisinya. Berkas ini TIDAK dipakai bab lain.
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

/* ------------------------------ Segi empat ------------------------------ */

export type Titik = [number, number];

const f1 = (n: number): string => n.toFixed(2);

/** Bangun datar tertutup dari titik-titik relatif terhadap (x, y). */
export const poligon = (id: string, x: number, y: number, p: Titik[], warna: string, tepi: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, x, y, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0])} ${f1(t[1])}`).join(" ")} Z`, warna, tepi, { tebal: 1.8, ...o });

/** Panjang tiap sisi (titik ke titik berikutnya). */
export const panjangSisi = (p: Titik[]): number[] => p.map((a, i) => Math.hypot(p[(i + 1) % p.length][0] - a[0], p[(i + 1) % p.length][1] - a[1]));

/** Jumlah panjang semua sisi: keliling. */
export const kelilingTitik = (p: Titik[]): number => panjangSisi(p).reduce((t, n) => t + n, 0);

/** Layang-layang tegak: sisi pendek 2 di atas, sisi panjang 4 di bawah. Titik B di kanan, D di kiri (sumbu simetri tegak). */
const LL_W = 1.2;
const LL_Y = 1.6; // 1.2 kuadrat + 1.6 kuadrat = 4, jadi sisi pendek tepat 2
const LL_A = LL_Y + Math.sqrt(16 - LL_W * LL_W); // sisi panjang tepat 4

/** Segi empat sembarang: sisi 5, 4, 2, 3 searah jarum jam dari pojok kiri. Diagonal AC = 4,5 dibuat dari hukum cosinus. */
const SS_D = 4.5;
const SS_BX = (25 - 16 + SS_D * SS_D) / (2 * SS_D);
const SS_BY = Math.sqrt(25 - SS_BX * SS_BX);
const SS_DX = (9 - 4 + SS_D * SS_D) / (2 * SS_D);
const SS_DY = Math.sqrt(9 - SS_DX * SS_DX);

/**
 * Tujuh segi empat Sub-Bab C dengan ukuran dari buku (Buku Siswa hlm. 118 sampai 121), titik dalam sentimeter, searah jarum jam.
 * `tepat`: panjang sisi dari titik sama dengan angka buku. Trapesium 2, 3, 4, 5 digambar skematik karena segitiga 1, 4, 5 sudah rata (tidak ada trapesium sungguhan).
 */
export const BANGUN_C: Record<string, { nama: string; p: Titik[]; sisi: number[]; keliling: number; tepat: boolean }> = {
  pp: { nama: "persegi panjang", p: [[0, 0], [5, 0], [5, 3], [0, 3]], sisi: [5, 3, 5, 3], keliling: 16, tepat: true },
  jg: { nama: "jajargenjang", p: [[1.8, 0], [6.8, 0], [5, 2.4], [0, 2.4]], sisi: [5, 3, 5, 3], keliling: 16, tepat: true },
  ll: { nama: "layang-layang", p: [[LL_W, 0], [2 * LL_W, LL_Y], [LL_W, LL_A], [0, LL_Y]], sisi: [2, 4, 4, 2], keliling: 12, tepat: true },
  ps: { nama: "persegi", p: [[0, 0], [3, 0], [3, 3], [0, 3]], sisi: [3, 3, 3, 3], keliling: 12, tepat: true },
  bk: { nama: "belah ketupat", p: [[2.4, 0], [4.8, 1.8], [2.4, 3.6], [0, 1.8]], sisi: [3, 3, 3, 3], keliling: 12, tepat: true },
  tr: { nama: "trapesium", p: [[0, 0], [2, 0], [3, 4], [0, 4]], sisi: [2, 5, 3, 4], keliling: 14, tepat: false },
  ss: { nama: "segi empat sembarang", p: [[0, SS_BY], [SS_BX, 0], [SS_D, SS_BY], [SS_DX, SS_BY + SS_DY]], sisi: [5, 4, 2, 3], keliling: 14, tepat: true },
};

const skalaTitik = (p: Titik[], s: number): Titik[] => p.map(([a, b]) => [a * s, b * s]);

/** Segi empat berwarna dari BANGUN_C, pojok kiri-atas kotak pembatas di (x, y), skala s piksel per sentimeter. */
export const bangunC = (id: string, x: number, y: number, kode: string, s: number, warna: string, tepi: string = W.biru, o: Opsi = {}): Obj => poligon(id, x, y, skalaTitik(BANGUN_C[kode].p, s), warna, tepi, o);

/** Lebar dan tinggi kotak pembatas dalam piksel. */
export function ukuran(kode: string, s: number): { w: number; h: number } {
  const p = BANGUN_C[kode].p;
  return { w: Math.max(...p.map((t) => t[0])) * s, h: Math.max(...p.map((t) => t[1])) * s };
}

/** Satu sisi bangun sebagai garis tebal berwarna (sisi ke-i: titik i ke titik berikutnya). */
export function sisiGaris(id: string, x: number, y: number, kode: string, s: number, i: number, warna: string, tebal = 3.4, o: Opsi = {}): Obj {
  const p = BANGUN_C[kode].p;
  const a = p[i];
  const b = p[(i + 1) % p.length];
  return garis(id, x + a[0] * s, y + a[1] * s, (b[0] - a[0]) * s, (b[1] - a[1]) * s, warna, tebal, o);
}

/** Label sisi di luar bangun: isi[i] untuk sisi ke-i (null dilewati). Id `${id}-l${i}`. */
export function labelSisi(id: string, x: number, y: number, kode: string, s: number, isi: (string | null)[], u = 8, warna: string = W.biru, jarak = 7, o: Opsi = {}): Obj[] {
  const p = BANGUN_C[kode].p;
  const cx = p.reduce((t, a) => t + a[0], 0) / p.length;
  const cy = p.reduce((t, a) => t + a[1], 0) / p.length;
  const out: Obj[] = [];
  p.forEach((a, i) => {
    const teksIsi = isi[i];
    if (teksIsi === null || teksIsi === undefined) return;
    const b = p[(i + 1) % p.length];
    const ex = b[0] - a[0];
    const ey = b[1] - a[1];
    const pj = Math.hypot(ex, ey);
    let nx = ey / pj;
    let ny = -ex / pj;
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    if ((mx - cx) * nx + (my - cy) * ny < 0) {
      nx = -nx;
      ny = -ny;
    }
    const setengah = teksIsi.length * u * 0.29;
    const tx = x + mx * s + nx * (jarak + Math.abs(nx) * setengah);
    const ty = y + my * s + ny * jarak + (ny > 0.35 ? u * 0.8 : ny < -0.35 ? -1 : u * 0.35);
    out.push(teks(`${id}-l${i}`, tx, ty, teksIsi, u, warna, o));
  });
  return out;
}

/** Bangun lengkap: bentuk dan label sisi. */
export const bangunLabel = (id: string, x: number, y: number, kode: string, s: number, warna: string, isi: (string | null)[], u = 8, o: Opsi = {}): Obj[] => [bangunC(id, x, y, kode, s, warna, W.biru, o), ...labelSisi(id, x, y, kode, s, isi, u)];

/** Penggaris horizontal pada (x, y) dengan panjang cm sentimeter berskala s, tanda tiap sentimeter. */
export function penggaris(id: string, x: number, y: number, cm: number, s: number): Obj[] {
  const d: string[] = [];
  for (let i = 0; i <= cm; i += 1) d.push(`M${f1(i * s)} 0 L${f1(i * s)} ${i % 5 === 0 ? 7 : 4}`);
  return [kotak(`${id}-b`, x, y, cm * s, 9, W.krem, W.coklat, { rx: 1, tebal: 1 }), jalur(`${id}-t`, x, y, d.join(" "), "none", W.coklat, { tebal: 0.8 })];
}
