import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 2 Sub-Bab A (Konsep Rasio): pohon, bibit, batang banding, kartu, dan tabel.
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
  daun: "#4ADE80",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const idDari = (a: Obj[]): string[] => a.map((o) => o.id);

/** Balon kata satu atau dua baris, titik tengah (cx, y). */
export function balon(id: string, cx: number, y: number, baris: string[], lebar: number, warna: string = W.putih, u = 6.6, o: Opsi = {}): Obj[] {
  const tinggi = baris.length * (u + 2.2) + 5;
  return [kotak(`${id}-k`, cx - lebar / 2, y, lebar, tinggi, warna, W.biru, { rx: 5, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 3 + (i + 1) * (u + 1.6), b, u, W.biru, o))];
}

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/* ------------------------------ Pohon dan bibit ------------------------------ */

/** Pohon pucuk merah: batang pendek dan tajuk bulat merah. Alas di (x, y). */
export function pucukMerah(id: string, x: number, y: number, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-b`, x - 1.5, y - 6, 3, 7, W.coklat, W.coklat, { rx: 0, tebal: 0.5, ...o }), bulat(`${id}-m`, x, y - 12, 6.5, "#EF4444", "#991B1B", { tebal: 1, ...o })];
}

/** Pohon cemara: segitiga hijau bersusun dua. Alas di (x, y). */
export function cemara(id: string, x: number, y: number, o: Opsi = {}): Obj[] {
  return [
    kotak(`${id}-b`, x - 1.5, y - 4, 3, 5, W.coklat, W.coklat, { rx: 0, tebal: 0.5, ...o }),
    jalur(`${id}-c`, x, y - 20, "M0 0 L-7 10 L-3 10 L-8 17 L8 17 L3 10 L7 10 Z", "#15803D", "#14532D", { tebal: 1, ...o }),
  ];
}

/** Bibit dalam kantong hitam. Alas di (x, y). */
export function bibit(id: string, x: number, y: number, o: Opsi = {}): Obj[] {
  return [
    kotak(`${id}-k`, x - 5.5, y - 8, 11, 9, W.hitam, W.hitam, { rx: 2, tebal: 0.5, ...o }),
    bulat(`${id}-d1`, x - 3, y - 12, 3.4, W.daun, W.hijau, { tebal: 0.8, ...o }),
    bulat(`${id}-d2`, x + 3, y - 14, 3.6, "#86EFAC", W.hijau, { tebal: 0.8, ...o }),
  ];
}

/** Deret benda berjarak sama. `buat` menerima (id, x, y). */
export function deret(id: string, x0: number, y: number, n: number, jarak: number, buat: (id: string, x: number, y: number) => Obj[]): Obj[] {
  return Array.from({ length: n }, (_, i) => buat(`${id}${i}`, x0 + i * jarak, y)).flat();
}

/** Batang banding: panjang sebanding dengan nilai, dengan nama dan angka. */
export function batang(id: string, x: number, y: number, nilai: number, satu: number, warna: string, nama: string, o: Opsi = {}): Obj[] {
  const w = nilai * satu;
  return [
    teks(`${id}-n`, x - 4, y + 8, nama, 7.4, W.biru, { anchor: "end", ...o }),
    kotak(`${id}-k`, x, y, w, 12, warna, W.biru, { rx: 3, tebal: 1.2, ...o }),
    teks(`${id}-v`, x + w + 4, y + 9, String(nilai), 9, W.biru, { anchor: "start", ...o }),
  ];
}

/** Dua kolom tabel rasio sederhana: baris judul dan baris-baris angka. */
export function tabel(id: string, x: number, y: number, kolW: number, baris: string[][], u = 9, warnaJudul: string = W.krem): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, x + c * kolW, y + r * 20, kolW, 20, r === 0 ? warnaJudul : W.putih, W.biru, { rx: 0, tebal: 1 }));
      out.push(teks(`${id}-t${r}${c}`, x + c * kolW + kolW / 2, y + r * 20 + 14, sel, u));
    });
  });
  return out;
}
