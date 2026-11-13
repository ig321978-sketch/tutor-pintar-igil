import type { Obj } from "./logika-story";
import { W, bulat, garis, jalur, kotak, teks } from "./k6b4a-gambar";

/**
 * Gambar khusus Story Kelas 6 Bab 4 Sub-Bab B (Membandingkan Peluang Kejadian).
 * Memakai primitif dasar bab yang sama (k6b4a-gambar); bentuk di sini baru untuk Sub-Bab B.
 */

/** Kerumunan: n kepala kecil dalam `kolom` kolom, mulai (x, y), jarak `j`. Mengembalikan benda dan id tiap kepala. */
export function kerumunan(p: string, x: number, y: number, n: number, kolom: number, j: number, warna: string, r = 4): { objs: Obj[]; ids: string[] } {
  const objs = Array.from({ length: n }, (_, i) => bulat(`${p}-${i}`, x + (i % kolom) * j, y + Math.floor(i / kolom) * j, r, warna));
  return { objs, ids: objs.map((o) => o.id) };
}

export const WARNA_PERMEN = { merah: "#EF4444", kuning: "#FACC15", oranye: "#F97316", muda: "#F472B6" };

/** Permen bungkus: badan dan dua ujung berpita. */
export function permen(id: string, x: number, y: number, warna: string, o: Partial<Obj> = {}): Obj[] {
  return [jalur(`${id}-b`, x, y, "M-9 -5 L9 -5 L9 5 L-9 5 Z M-9 0 L-15 -5 L-15 5 Z M9 0 L15 -5 L15 5 Z", warna, W.biru, { tebal: 1.4, ...o })];
}

/** Koin: lingkaran dengan huruf sisi (G untuk gambar atau garuda, A untuk angka). */
export function koin(id: string, x: number, y: number, huruf: string, r = 16, o: Partial<Obj> = {}): Obj[] {
  return [bulat(`${id}-k`, x, y, r, huruf === "G" ? "#FDE68A" : "#E5E7EB", W.biru, { tebal: 2, ...o }), teks(`${id}-t`, x, y + r * 0.35, huruf, r * 1.0, W.biru, o)];
}

/** Barang bingkisan: set pensil (biru), pensil dengan penghapus (hijau), atau buku bacaan (merah). Titik tengah (x, y). */
export function barang(id: string, x: number, y: number, jenis: "set" | "pensil" | "buku", o: Partial<Obj> = {}): Obj[] {
  if (jenis === "set") return [kotak(`${id}-b`, x - 6, y - 10, 12, 20, "#3B82F6", W.biru, { rx: 2, tebal: 1.2, ...o }), garis(`${id}-g`, x - 2, y - 6, 0, 12, W.putih, 1, o), garis(`${id}-h`, x + 2, y - 6, 0, 12, W.putih, 1, o)];
  if (jenis === "pensil") return [garis(`${id}-b`, x, y - 9, 0, 18, "#1D4ED8", 3, o), kotak(`${id}-p`, x - 3, y - 12, 6, 5, "#84CC16", W.biru, { rx: 1, tebal: 0.8, ...o })];
  return [kotak(`${id}-b`, x - 8, y - 6, 16, 12, "#EF4444", W.biru, { rx: 1.5, tebal: 1.2, ...o }), garis(`${id}-g`, x - 5, y, 10, 0, W.putih, 1.2, o)];
}

/** Dadu dengan titik mata (1 sampai 6) sebagai gambar bulat kecil; titik tengah (x, y), sisi s. */
export function daduTitik(id: string, x: number, y: number, angka: number, s = 24, warna: string = W.putih, o: Partial<Obj> = {}): Obj[] {
  const a = s * 0.25;
  const POLA: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  };
  return [kotak(`${id}-k`, x - s / 2, y - s / 2, s, s, warna, W.biru, { rx: s * 0.18, tebal: 1.6, ...o }), ...POLA[angka].map(([dx, dy], i) => bulat(`${id}-m${i}`, x + dx * a, y + dy * a, s * 0.075, W.biru, "none", o))];
}
