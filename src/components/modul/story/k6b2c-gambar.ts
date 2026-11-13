import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 2 Sub-Bab C (Penerapan Rasio): deret kotak bagian, tabel rasio, batang waktu,
 * anak tangga satuan, dan kartu hitungan. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  salem: "#F97316",
  coklat: "#92400E",
  krem: "#FEF3C7",
  hiasMuda: "#FBCFE8",
  obatMuda: "#BBF7D0",
  langit: "#DBEAFE",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Sel berisi teks di tengah: kotak dan tulisan. */
export function sel(id: string, x: number, y: number, w: number, h: number, isi: string, warna: string = W.putih, u = 8, tw: string = W.biru, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 2, tebal: 1, ...o }), teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, tw, o)];
}

/** Balon kata satu atau dua baris, titik tengah (cx, y). */
export function balon(id: string, cx: number, y: number, baris: string[], lebar: number, warna: string = W.putih, u = 6.8, o: Opsi = {}): Obj[] {
  const tinggi = baris.length * (u + 2.4) + 5;
  return [kotak(`${id}-k`, cx - lebar / 2, y, lebar, tinggi, warna, W.biru, { rx: 5, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 3 + (i + 1) * (u + 1.8), b, u, W.biru, o))];
}

/** Deret n kotak kecil sama besar (satu kotak = satu bagian rasio). */
export function deret(id: string, x: number, y: number, n: number, s: number, warna: string, jarak = 2, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, x + i * (s + jarak), y, s, s, warna, W.biru, { rx: 2, tebal: 1.2, ...o }));
}

/** Tabel: tiap sel (kotak dan tulisan) dikembalikan per baris supaya baris dapat muncul satu per satu. */
export function tabel(id: string, x: number, y: number, lebar: number[], tinggi: number, isi: string[][], warnaKepala: string = W.krem, u = 8): Obj[][] {
  return isi.map((baris, r) => {
    let kiri = x;
    return baris.flatMap((c, j) => {
      const sl = sel(`${id}-${r}-${j}`, kiri, y + r * tinggi, lebar[j], tinggi, c, r === 0 ? warnaKepala : W.putih, u);
      kiri += lebar[j];
      return sl;
    });
  });
}

/** Batang waktu atau jumlah: kotak berwarna dengan panjang sebanding. */
export const batang = (id: string, x: number, y: number, panjang: number, tinggi: number, warna: string, o: Opsi = {}): Obj => kotak(id, x, y, panjang, tinggi, warna, W.biru, { rx: 2, tebal: 1.2, ...o });

/** Kartu hitungan satu baris dengan latar warna. */
export const kartu = (id: string, x: number, y: number, w: number, isi: string, warna: string = W.krem, u = 9, tw: string = W.biru): Obj[] => sel(id, x, y, w, u + 11, isi, warna, u, tw, { rx: 5 });
