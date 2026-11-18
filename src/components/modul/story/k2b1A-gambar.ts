import type { Obj } from "./logika-story";
import { W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 2 Bab 1 Sub-Bab A "Kue Kiriman dari Dapur" (menghitung, membaca, dan menulis bilangan sampai lima puluh), awal cerita Kue di Kantin Sekolah.
 * Rupa kantin: etalase kaca `${id}` (rak `${id}-r{i}`), nampan `${id}`, kue lapis (kotak merah muda), kotak kue isi sepuluh `${id}` (sepuluh lubang `${id}-c{i}`),
 * karcis nomor antrean `${id}` dan teks `${id}t`, jam dinding, serta tokoh Chacha, Dika, Nia, dan Bu Sari (celemek digambar).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, teks } from "./k1b4a-gambar";

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  kue: "\u{1F370}",
  donat: "\u{1F369}",
  bel: "\u{1F514}",
  truk: "\u{1F69A}",
  dapur: "\u{1F3EB}",
  anak: "\u{1F9D2}",
  sedih: "\u{1F622}",
  jari: "\u{1F446}",
  mata: "\u{1F440}",
  pikir: "\u{1F914}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F604}",
  lezat: "\u{1F60B}",
  capek: "\u{1F629}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  kalender: "\u{1F4C5}",
  lambai: "\u{1F44B}",
  kuat: "\u{1F4AA}",
  kartuResep: "\u{1F4DC}",
  pesanan: "\u{1F4DD}",
} as const;

/** Warna rupa kantin. */
export const WK = {
  kaca: "#E0F2FE",
  kacaGaris: "#38BDF8",
  nampan: "#CBD5E1",
  kayu: "#D6A15E",
  lapis: "#FBCFE8",
  lapisGaris: "#BE185D",
  krim: "#DC2626",
  kotakKue: "#FDE68A",
  karcis: "#FEF3C7",
  papan: "#166534",
  apron: "#FBCFE8",
  lantai: "#FDE68A",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/** Lantai kantin `${id}`. */
export const lantai = (id: string, y = 168): Obj => kotak(id, 2, y, 296, 198 - y, WK.lantai, "#CA8A04", { rx: 4, tebal: 1.2, z: -3 });

/** Etalase kaca: badan `${id}` dan `n - 1` rak `${id}-r{i}`. Pojok kiri-atas (x, y). */
export const etalase = (id: string, x: number, y: number, w: number, h: number, n = 2): Obj[] => [
  kotak(id, x, y, w, h, WK.kaca, WK.kacaGaris, { rx: 6, tebal: 2.4, z: -1 }),
  ...Array.from({ length: n - 1 }, (_, i) => garis(`${id}-r${i + 1}`, f(x + 4), f(y + (h * (i + 1)) / n), f(w - 8), 0, WK.kacaGaris, 2, { z: -1 })),
];

/** Nampan kue: kotak abu-abu `${id}` pojok kiri-atas (x, y). */
export const nampan = (id: string, x: number, y: number, w: number, h = 8, o: Partial<Obj> = {}): Obj => kotak(id, x, y, w, h, WK.nampan, "#64748B", { rx: 3, tebal: 1.4, ...o });

/** Satu kue lapis (kotak merah muda) berpusat di (cx, cy): `${id}`. */
export const kue = (id: string, cx: number, cy: number, o: Partial<Obj> = {}): Obj => kotak(id, f(cx - 6), f(cy - 4.5), 12, 9, WK.lapis, WK.lapisGaris, { rx: 2, tebal: 1, ...o });

/** Kue emoji `${id}` berukuran u, berpusat (cx, cy). */
export const kueEmo = (id: string, cx: number, cy: number, u = 16, o: Partial<Obj> = {}): Obj => emo(id, cx, f(cy + u * 0.3), E.kue, u, o);

/** Deret n kue emoji sejajar mulai x0 dengan jarak j: `${id}{i}`. */
export const deretKue = (id: string, n: number, x0: number, j: number, y: number, u = 16, o: Partial<Obj> = {}): Obj[] => Array.from({ length: n }, (_, i) => kueEmo(`${id}${i}`, x0 + i * j, y, u, o));
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/**
 * Kotak kue isi sepuluh berpusat (cx, cy): badan `${id}` (lebar 70, tinggi 30) dan sepuluh lubang kue `${id}-c{i}` (dua baris lima).
 * `penuh`: lubang berisi kue merah muda; bila tidak, lubang kosong.
 */
export const kotakKue = (id: string, cx: number, cy: number, penuh = true, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, f(cx - 35), f(cy - 15), 70, 30, WK.kotakKue, W.coklat, { rx: 4, tebal: 1.8, ...o }),
  ...Array.from({ length: 10 }, (_, i) => bulat(`${id}-c${i}`, f(cx - 24 + (i % 5) * 12), f(cy - 6 + Math.floor(i / 5) * 12), 4.6, penuh ? WK.lapis : "#FFFFFF", penuh ? WK.lapisGaris : "#CA8A04", { tebal: 1, z: 1, ...o })),
];
export const idKotakKue = (id: string): string[] => [id, ...Array.from({ length: 10 }, (_, i) => `${id}-c${i}`)];

/** Karcis nomor antrean: kotak `${id}` dan angka `${id}t`. Pojok kiri-atas (x, y). */
export const karcis = (id: string, x: number, y: number, nomor: string, w = 46, h = 24, warna: string = WK.karcis, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, x, y, w, h, warna, "#CA8A04", { rx: 3, tebal: 1.6, ...o }),
  teks(`${id}t`, f(x + w / 2), f(y + h / 2 + 4.6), nomor, 13, W.biru, o),
];
export const idKarcis = (id: string): string[] => [id, `${id}t`];
export const geserKarcis = (id: string, x: number, y: number, w = 46, h = 24): Ubah[] => [
  { id, x, y },
  { id: `${id}t`, x: f(x + w / 2), y: f(y + h / 2 + 4.6) },
];

/** Jam dinding: muka `${id}`, jarum menit `${id}-m`, jarum jam `${id}-j`, titik tengah `${id}-c`. */
export const jam = (id: string, x: number, y: number, r = 16): Obj[] => [
  bulat(id, x, y, r, W.putih, W.biru, { tebal: 2.4 }),
  garis(`${id}-m`, x, y, f(-r * 0.16), f(-r * 0.72), W.biru, 1.8, { z: 2 }),
  garis(`${id}-j`, x, y, f(r * 0.45), f(r * 0.26), W.merah, 2.4, { z: 2 }),
  bulat(`${id}-c`, x, y, 1.8, W.biru, W.biru, { z: 3 }),
];

/** Panah mutlak dari (x, y) ke (x2, y2). */
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Partial<Obj> = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });

/** Garis mutlak dari (x, y) ke (x2, y2). */
export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Partial<Obj> = {}): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, o);

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari";

/** Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari berapron `${id}-ap` (kotak merah muda di bawah wajah). */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : E.bu;
  const out: Obj[] = [];
  if (nama === "Bu Sari") out.push(kotak(`${id}-ap`, f(x - 17), f(y + 5), 34, 12, WK.apron, WK.lapisGaris, { rx: 3, tebal: 1.2, z: 0 }));
  out.push(emo(id, x, y, wajah, u, { z: 1 }));
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, f(y - u * 0.5), E.topi, f(u * 0.55), { z: 2 }));
  out.push(teks(`${id}-n`, x, f(y + 13), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [id, `${id}-n`, ...(nama === "Nia" ? [`${id}-tp`] : []), ...(nama === "Bu Sari" ? [`${id}-ap`] : [])];

/** Papan tulis hijau (papan catatan atau papan harga): kotak `${id}` bertepi kayu. */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, WK.papan, W.coklat, { rx: 5, tebal: 4, z: -1 });
/** Tulisan kapur putih. */
export const kapur = (id: string, x: number, y: number, isi: string, u = 10, o: Partial<Obj> = {}): Obj => teks(id, x, y, isi, u, "#F8FAFC", { z: 3, ...o });

/** Bingkai sepuluh: sel `${id}-s{i}` (dua baris lima), ukuran sel `s`; pojok kiri-atas (x, y). */
export const bingkaiSepuluh = (id: string, x: number, y: number, s = 20, o: Partial<Obj> = {}): Obj[] =>
  Array.from({ length: 10 }, (_, i) => kotak(`${id}-s${i}`, f(x + (i % 5) * s), f(y + Math.floor(i / 5) * s), s, s, W.putih, W.biru, { rx: 1, tebal: 1.6, ...o }));
/** Pusat sel ke-i bingkai sepuluh. */
export const pusatSel = (x: number, y: number, s: number, i: number): [number, number] => [f(x + (i % 5) * s + s / 2), f(y + Math.floor(i / 5) * s + s / 2)];
