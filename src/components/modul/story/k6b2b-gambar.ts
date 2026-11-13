import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 2 Sub-Bab B (Konsep Kesamaan Rasio): rak polybag, lahan, tabel rasio,
 * kartu paket bibit, pecahan senilai, dan timbangan resep. Berkas ini TIDAK dipakai bab lain.
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
  tanah: "#D6B98C",
  daun: "#DCFCE7",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berisi satu sampai tiga baris teks, titik kiri atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, tulis: string = W.biru, o: Opsi = {}): Obj[] {
  const jarak = u + 3;
  const mulai = y + (h - baris.length * jarak) / 2 + u;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * jarak - 1, b, u, tulis))];
}

/** Satu sel tabel: kotak dengan teks di tengah. */
export const sel = (id: string, x: number, y: number, w: number, h: number, isi: string, warna: string = W.putih, tulis: string = W.biru): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 2, tebal: 1.2 }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + 3.4, isi, 9.5, tulis),
];

/** Kepala tabel rasio dua kolom. */
export const kepalaTabel = (id: string, x: number, y: number, w: number, h: number, [a, b]: [string, string]): Obj[] => [...sel(`${id}-ha`, x, y, w, h, a, "#DBEAFE"), ...sel(`${id}-hb`, x + w, y, w, h, b, "#DBEAFE")];

/** Baris ke-r tabel rasio (r mulai 0 di bawah kepala). */
export const barisTabel = (id: string, r: number, x: number, y: number, w: number, h: number, [a, b]: [string, string], warna: string = W.putih): Obj[] => [
  ...sel(`${id}-r${r}a`, x, y + (r + 1) * h, w, h, a, warna),
  ...sel(`${id}-r${r}b`, x + w, y + (r + 1) * h, w, h, b, warna),
];

/** Panah pengali di sisi kanan tabel, dari baris dari ke baris ke (kepala dihitung baris -1). */
export function pengali(id: string, dari: number, ke: number, x: number, y: number, w: number, h: number, label: string, warna: string = W.merah): Obj[] {
  const ax = x + 2 * w + 8;
  const y0 = y + (dari + 1) * h + h / 2;
  const y1 = y + (ke + 1) * h + h / 2;
  return [panah(`${id}-p`, ax, y0, 0, y1 - y0, warna, 2, { gambar: true }), teks(`${id}-pt`, ax + 7, (y0 + y1) / 2 + 3, label, 9.5, warna, { anchor: "start" })];
}

/** Satu polybag dengan tunas di atasnya, titik kiri atas kantong (bx, by). */
export const polybag = (id: string, bx: number, by: number, tunas = true): Obj[] => [
  kotak(`${id}-b`, bx, by, 12, 13, W.hitam, "#111827", { rx: 3, tebal: 1 }),
  ...(tunas ? [emo(`${id}-e`, bx + 6, by + 1, "🌱", 10)] : []),
];

/** Rak dua tingkat berisi 6 polybag. Lebar 60, tinggi 52. */
export function rak(id: string, x: number, y: number, warna: string = "#FDE68A"): Obj[] {
  const objs: Obj[] = [kotak(`${id}-f`, x, y, 60, 52, warna, W.coklat, { rx: 3 }), garis(`${id}-p`, x + 2, y + 26, 56, 0, W.coklat, 2)];
  for (let r = 0; r < 2; r += 1) for (let c = 0; c < 3; c += 1) objs.push(...polybag(`${id}-${r}${c}`, x + 7 + c * 18, y + 11 + r * 26));
  return objs;
}

/** Lahan berpetak: kolom x baris polybag. */
export function lahan(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(`${id}-f`, x, y, w, h, W.tanah, W.coklat, { rx: 4, tebal: 2 })];
}
export function kebun(id: string, x: number, y: number, kol: number, baris: number, dx: number, dy: number): Obj[] {
  const objs: Obj[] = [];
  for (let r = 0; r < baris; r += 1) for (let c = 0; c < kol; c += 1) objs.push(...polybag(`${id}-${r}${c}`, x + c * dx, y + r * dy));
  return objs;
}

/** Pecahan bertingkat: pembilang di atas garis, penyebut di bawah, titik tengah (cx, y garis). */
export function pecahan(id: string, cx: number, yg: number, atas: string, bawah: string, u = 11, warna: string = W.biru): Obj[] {
  const lebar = Math.max(atas.length, bawah.length) * u * 0.62 + 6;
  return [teks(`${id}-a`, cx, yg - 3, atas, u, warna), garis(`${id}-g`, cx - lebar / 2, yg, lebar, 0, warna, 1.6), teks(`${id}-b`, cx, yg + u + 2, bawah, u, warna)];
}

/** Kartu paket bibit: deretan tunas dan label harga. Titik kiri atas (x, y), lebar 100. */
export function paketBibit(id: string, x: number, y: number, n: number, nama: string, harga: string, warna: string): Obj[] {
  const objs: Obj[] = [kotak(`${id}-k`, x, y, 100, 74, warna, W.biru, { rx: 8 }), teks(`${id}-n`, x + 50, y + 14, nama, 9.5), teks(`${id}-h`, x + 50, y + 66, harga, 10, W.merah)];
  for (let i = 0; i < n; i += 1) objs.push(emo(`${id}-e${i}`, x + 50 + (i - (n - 1) / 2) * 17, y + 42, "🌱", 15));
  return objs;
}

export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 3, ...o });

/** Kartu satu metode luar: nama (satu sampai dua baris) dan arti singkat. Lebar 134, tinggi 70. */
export const kartuMetode = (id: string, x: number, y: number, warna: string, baris: string[], arti: string): Obj[] => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 22 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 26 + baris.length * 12, arti, 7, W.ungu),
];

/** Panah pengali di sisi kiri tabel (kepala = baris -1), tabel di (x, y) dengan tinggi sel h. */
export function pengaliKiri(id: string, dari: number, ke: number, x: number, y: number, h: number, label: string, warna: string = W.merah): Obj[] {
  const y0 = y + (dari + 1) * h + h / 2;
  const y1 = y + (ke + 1) * h + h / 2;
  return [panah(`${id}-p`, x - 8, y0, 0, y1 - y0, warna, 2, { gambar: true }), teks(`${id}-t`, x - 14, (y0 + y1) / 2 + 3, label, 9.5, warna, { anchor: "end" })];
}
