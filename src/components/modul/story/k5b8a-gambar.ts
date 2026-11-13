import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 8 Sub-Bab A (mengumpulkan data): tabel, turus, kartu siswa, donat, dan bagan alur.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Donat: lingkaran berwarna dengan lubang putih, titik tengah (x, y). */
export function donat(id: string, x: number, y: number, r: number, warna: string, o: Opsi = {}): Obj[] {
  return [bulat(`${id}-a`, x, y, r, warna, W.coklat, { tebal: 1.2, ...o }), bulat(`${id}-b`, x, y, r * 0.34, W.putih, W.coklat, { tebal: 1, ...o })];
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

/** Id semua benda sebuah baris tabel (kotak dan teks) bila ada. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Turus ------------------------------ */

const JARAK = 3.6;
/** Lebar gambar turus untuk n goresan. */
export const lebarTurus = (n: number): number => {
  const g = Math.ceil(n / 5);
  return g === 0 ? 0 : (g - 1) * (3 * JARAK + 7) + (Math.min(5, n - (g - 1) * 5) >= 4 ? 3 * JARAK : (Math.min(5, n - (g - 1) * 5) - 1) * JARAK);
};

/** Turus n goresan, tiap kelompok lima: empat tegak dan satu miring. Pojok kiri-atas (x, y), tinggi t. Id `${id}-g{i}`. */
export function turus(id: string, x: number, y: number, n: number, t = 12, warna: string = W.hitam, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  let kiri = x;
  for (let g = 0; g * 5 < n; g += 1) {
    const sisa = Math.min(5, n - g * 5);
    for (let j = 0; j < Math.min(4, sisa); j += 1) out.push(garis(`${id}-g${g * 5 + j}`, kiri + j * JARAK, y, 0, t, warna, 1.6, o));
    if (sisa === 5) out.push(garis(`${id}-g${g * 5 + 4}`, kiri - 2, y + t * 0.82, 3 * JARAK + 4, -t * 0.64, warna, 1.6, o));
    kiri += 3 * JARAK + 7;
  }
  return out;
}

/** Id semua goresan turus n goresan. */
export const idTurus = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-g${i}`);

/* ------------------------------ Kartu siswa dan bagan ------------------------------ */

/** Kartu catatan satu siswa: nama dan sayuran (satu sampai tiga baris), pojok kiri-atas (x, y). */
export function kartuSiswa(id: string, x: number, y: number, w: number, nama: string, sayur: string[], o: Opsi = {}): Obj[] {
  const h = 14 + sayur.length * 9;
  return [
    kotak(`${id}-k`, x, y, w, h, "#FDE2D3", W.biru, { rx: 4, tebal: 1.2, ...o }),
    teks(`${id}-n`, x + w / 2, y + 9, nama, 7, W.biru, o),
    ...sayur.map((s, i) => teks(`${id}-s${i}`, x + w / 2, y + 19 + i * 8.6, s, 6.4, W.hitam, o)),
  ];
}

/** Satu batang ringkas (hanya untuk membaca diagram buku): kotak biru dari alas y0 setinggi n satuan 8, nama di bawah. */
export function batangMini(id: string, x: number, y0: number, n: number, nama: string, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y0 - n * 8, 34, n * 8, "#3B82F6", W.biru, { rx: 2, tebal: 1.2, ...o }), teks(`${id}-v`, x + 17, y0 - n * 8 - 4, String(n), 9, W.biru, o), teks(`${id}-n`, x + 17, y0 + 10, nama, 6.4, W.biru, o)];
}

/* ------------------------------ Tabel frekuensi (nama, turus, frekuensi) ------------------------------ */

/** Lebar tiga kolom tabel frekuensi: nama, turus, frekuensi. */
export const KOL_FREK = [70, 100, 50];

/** Baris kepala tabel frekuensi. Id sel `${id}-r0a`, `${id}-r0b`, `${id}-r0c` dan teks `${id}-r0n`, `${id}-r0t`, `${id}-r0f`. */
export function kepalaFrek(id: string, x: number, y: number, kepala: string[], kolW: number[] = KOL_FREK, tinggi = 16, u = 8): Obj[] {
  const kunci = ["a", "b", "c"];
  const huruf = ["n", "t", "f"];
  let px = x;
  const out: Obj[] = [];
  kepala.forEach((isi, c) => {
    out.push(kotak(`${id}-r0${kunci[c]}`, px, y, kolW[c], tinggi, W.krem, W.biru, { rx: 0, tebal: 1 }), teks(`${id}-r0${huruf[c]}`, px + kolW[c] / 2, y + tinggi / 2 + u * 0.35, isi, u));
    px += kolW[c];
  });
  return out;
}

/** Baris isi tabel frekuensi ke-r (mulai 1): nama, turus n goresan, dan frekuensi. n bernilai null untuk baris belum terisi. */
export function barisFrek(id: string, x: number, y: number, r: number, nama: string, n: number | null, kolW: number[] = KOL_FREK, tinggi = 16, u = 8, warnaTurus: string = W.hitam): Obj[] {
  const py = y + r * tinggi;
  const out: Obj[] = [
    kotak(`${id}-r${r}a`, x, py, kolW[0], tinggi, W.putih, W.biru, { rx: 0, tebal: 1 }),
    kotak(`${id}-r${r}b`, x + kolW[0], py, kolW[1], tinggi, W.putih, W.biru, { rx: 0, tebal: 1 }),
    kotak(`${id}-r${r}c`, x + kolW[0] + kolW[1], py, kolW[2], tinggi, W.putih, W.biru, { rx: 0, tebal: 1 }),
    teks(`${id}-r${r}n`, x + kolW[0] / 2, py + tinggi / 2 + u * 0.35, nama, u),
  ];
  if (n === null) out.push(teks(`${id}-r${r}t`, x + kolW[0] + kolW[1] / 2, py + tinggi / 2 + u * 0.35, "...", u, W.abu), teks(`${id}-r${r}f`, x + kolW[0] + kolW[1] + kolW[2] / 2, py + tinggi / 2 + u * 0.35, "...", u, W.abu));
  else out.push(...turus(`${id}-r${r}t`, x + kolW[0] + 9, py + 3, n, tinggi - 6, warnaTurus), teks(`${id}-r${r}f`, x + kolW[0] + kolW[1] + kolW[2] / 2, py + tinggi / 2 + u * 0.35, String(n), u + 1, W.merah));
  return out;
}

/** Id semua benda sebuah baris tabel frekuensi (n = banyak goresan, null bila belum terisi). */
export const idBarisFrek = (id: string, r: number, n: number | null): string[] => [`${id}-r${r}a`, `${id}-r${r}b`, `${id}-r${r}c`, `${id}-r${r}n`, `${id}-r${r}f`, ...(n === null ? [`${id}-r${r}t`] : idTurus(`${id}-r${r}t`, n))];
