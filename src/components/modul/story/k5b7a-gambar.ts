import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 7 Sub-Bab A (membandingkan ciri-ciri segitiga): sedotan, segitiga dari panjang sisi,
 * busur sudut, tanda siku-siku, candi, tabel, dan daftar ciri. Berkas ini TIDAK dipakai bab lain.
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
  batu: "#D6C7A1",
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

/* ------------------------------ Segitiga, sudut, dan sedotan ------------------------------ */

export type Titik = [number, number];

/** Segitiga tertutup dari tiga titik relatif terhadap (x, y). */
export const segitiga = (id: string, x: number, y: number, p: Titik[], warna: string, tepi: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, x, y, `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)} L${p[1][0].toFixed(1)} ${p[1][1].toFixed(1)} L${p[2][0].toFixed(1)} ${p[2][1].toFixed(1)} Z`, warna, tepi, { tebal: 1.8, ...o });

/**
 * Titik segitiga dari panjang tiga sisi (cm) berskala s piksel per cm.
 * Alas AB = c dari kiri-bawah ke kanan-bawah, BC = a, AC = b, puncak C di atas alas (y negatif). Sisi harus memenuhi syarat segitiga.
 */
export function titikSisi(a: number, b: number, c: number, s: number): Titik[] {
  const x = (b * b - a * a + c * c) / (2 * c);
  const h = Math.sqrt(Math.max(0, b * b - x * x));
  return [
    [0, 0],
    [c * s, 0],
    [x * s, -h * s],
  ];
}

/** Jarak dua titik. */
export const jarak = (p: Titik, q: Titik): number => Math.hypot(p[0] - q[0], p[1] - q[1]);

/** Busur penanda sudut di titik sudut (x, y) dari arah `dari` ke `sampai` (derajat layar, 0 ke kanan, positif searah jarum jam). */
export function busur(id: string, x: number, y: number, r: number, dari: number, sampai: number, warna: string, o: Opsi = {}): Obj {
  const rad = (d: number) => (d * Math.PI) / 180;
  const px = (d: number) => (r * Math.cos(rad(d))).toFixed(1);
  const py = (d: number) => (r * Math.sin(rad(d))).toFixed(1);
  const besar = Math.abs(sampai - dari) > 180 ? 1 : 0;
  const sapu = sampai > dari ? 1 : 0;
  return jalur(id, x, y, `M${px(dari)} ${py(dari)} A${r} ${r} 0 ${besar} ${sapu} ${px(sampai)} ${py(sampai)}`, "none", warna, { tebal: 1.8, ...o });
}

/** Tanda siku-siku (garis siku kecil) di titik sudut (x, y); sx dan sy (1 atau -1) menunjuk arah ke dalam sudut. */
export const tandaSiku = (id: string, x: number, y: number, s: number, sx: number, sy: number, warna: string = W.merah, o: Opsi = {}): Obj =>
  jalur(id, x, y, `M${sx * s} 0 L${sx * s} ${sy * s} L0 ${sy * s}`, "none", warna, { tebal: 1.8, ...o });

/** Satu sedotan mendatar: kotak panjang (cm) berskala s dengan angka panjang di tengah. Id `${id}-k` dan `${id}-t`. */
export function sedotan(id: string, x: number, y: number, cm: number, warna: string, s = 8, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, cm * s, 10, warna, W.biru, { rx: 2, tebal: 1.2, ...o }), teks(`${id}-t`, x + (cm * s) / 2, y + 7.6, String(cm), 7.4, W.biru, o)];
}

const rad = (d: number) => (d * Math.PI) / 180;

/** Tiga baji sudut berimpit pada sebuah garis lurus di titik (x, y): besar sudut berurutan dari kiri, warna, dan huruf nama. */
export function bajiLurus(id: string, x: number, y: number, besar: number[], huruf: string[], warna: string[], r = 34, rLabel = 22): Obj[] {
  const out: Obj[] = [garis(`${id}-bl`, x - 50, y, 100, 0, W.biru, 2.2)];
  let sudut = -180;
  besar.forEach((b, i) => {
    const akhir = sudut + b;
    out.push(busur(`${id}-w${i}`, x, y, r, sudut, akhir, warna[i]));
    const tengah = rad((sudut + akhir) / 2);
    out.push(teks(`${id}-h${i}`, x + rLabel * Math.cos(tengah), y + rLabel * Math.sin(tengah) + 3, huruf[i], 8, warna[i]));
    if (i < besar.length - 1) out.push(garis(`${id}-s${i}`, x, y, 50 * Math.cos(rad(akhir)), 50 * Math.sin(rad(akhir)), W.biru, 2.2));
    sudut = akhir;
  });
  return out;
}

/** Tanda sama panjang pada sebuah sisi: satu garis kecil tegak lurus di titik tengah sisi dari (x1, y1) ke (x2, y2). */
export function tandaSisi(id: string, x1: number, y1: number, x2: number, y2: number, warna: string = W.merah, o: Opsi = {}): Obj {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const panjang = Math.hypot(x2 - x1, y2 - y1) || 1;
  const nx = (-(y2 - y1) / panjang) * 3.6;
  const ny = ((x2 - x1) / panjang) * 3.6;
  return garis(id, mx - nx, my - ny, 2 * nx, 2 * ny, warna, 2, o);
}

/** Candi bertingkat berbentuk segitiga, alas tengah (x, y), tinggi 46 dikali s. */
export function candi(id: string, x: number, y: number, s = 1, o: Opsi = {}): Obj[] {
  return [
    jalur(`${id}-a`, x, y, `M${-34 * s} 0 L${34 * s} 0 L0 ${-46 * s} Z`, W.batu, W.coklat, { tebal: 1.8, ...o }),
    garis(`${id}-b`, x - 24 * s, y - 14 * s, 48 * s, 0, W.coklat, 1.2, o),
    garis(`${id}-c`, x - 14 * s, y - 28 * s, 28 * s, 0, W.coklat, 1.2, o),
  ];
}

/** Tanda benar dan salah dalam teks. */
export const BENAR = "✓";
export const SALAH = "✗";
