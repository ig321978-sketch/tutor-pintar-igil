import type { Obj } from "./logika-story";
import { E as E_4, W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 7 Sub-Bab A "Tiang dan Tangga" (membandingkan dan mengurutkan panjang), awal cerita Rumah Pohon Abang.
 * Halaman rumput (garis atasnya adalah garis awal), pohon jambu dan rangka rumah pohon, tiang kayu bercat `${id}` dengan tutup `${id}-c`,
 * tumpukan bata `${id}{i}`, tali dan balok mendatar, tali tegak, burung di dahan (badan berwarna `${id}` dan emoji `${id}-e`), serta panah dan garis putus.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik } from "./k1b4a-gambar";

export const E = {
  ...E_4,
  tupai: "\u{1F43F}\u{FE0F}",
  burung: "\u{1F426}",
  bata: "\u{1F9F1}",
  jambu: "\u{1F350}",
  kakek: "\u{1F474}",
  palu: "\u{1F528}",
  tertawa: "\u{1F602}",
  awan: "\u{2601}\u{FE0F}",
  mahkota: "\u{1F451}",
  kilat: "\u{26A1}",
  lambai: "\u{1F44B}",
  kertas: "\u{1F4C4}",
  lampu: "\u{1F4A1}",
} as const;

/** Warna tiang, kayu, dan halaman. */
export const WT = {
  merah: "#EF4444",
  kuning: "#FACC15",
  hijau: "#22C55E",
  biru: "#3B82F6",
  kayu: "#B45309",
  bata: "#C2410C",
  rumput: "#BBF7D0",
  batang: "#92400E",
  daun: "#4ADE80",
  abu: "#9CA3AF",
  putih: "#F8FAFC",
  coklat: "#A16207",
  tali: "#D97706",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/** Tinggi garis tanah (garis awal) tempat tiang berdiri. */
export const Y_TANAH = 150;

/** Halaman rumput `${id}`: dari garis tanah sampai bawah kanvas. */
export const tanah = (id: string, y: number = Y_TANAH): Obj => kotak(id, 2, y, 296, 198 - y, WT.rumput, W.hijau, { rx: 4, tebal: 1.5, z: -3 });

/** Tiang kayu bercat: badan `${id}` dan tutup putih `${id}-c`. Pusat x, alas yDasar, tinggi h. */
export const tiang = (id: string, x: number, yDasar: number, h: number, warna: string, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, f(x - 7), f(yDasar - h), 14, h, warna, W.biru, { rx: 2, tebal: 1.6, ...o }),
  kotak(`${id}-c`, f(x - 7), f(yDasar - h), 14, 5, WT.putih, W.biru, { rx: 2, tebal: 1.2, ...o }),
];
/** Pindahkan tiang (badan dan tutup) ke pusat x, alas yDasar, tinggi h. */
export const geserTiang = (id: string, x: number, yDasar: number, h: number): Ubah[] => [
  { id, x: f(x - 7), y: f(yDasar - h) },
  { id: `${id}-c`, x: f(x - 7), y: f(yDasar - h) },
];
/** Id badan dan tutup tiang. */
export const idTiang = (id: string): string[] => [id, `${id}-c`];

/** Empat tiang Story: merah dan hijau sama tinggi, kuning paling tinggi, biru paling pendek. Id tm, tk, th, tb. */
export const TIANG = {
  tm: { x: 96, h: 56, w: WT.merah },
  tk: { x: 124, h: 72, w: WT.kuning },
  th: { x: 152, h: 56, w: WT.hijau },
  tb: { x: 180, h: 36, w: WT.biru },
} as const;
export const empatTiang = (yDasar: number = Y_TANAH): Obj[] => (Object.entries(TIANG) as [string, { x: number; h: number; w: string }][]).flatMap(([id, t]) => tiang(id, t.x, yDasar, t.h, t.w));

/** Tumpukan `n` bata `${id}{i}` berdiri di tengah x, alas yDasar. Tiap bata 22 x 6. */
export const tumpukBata = (id: string, x: number, yDasar: number, n: number): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, f(x - 11), f(yDasar - (i + 1) * 6), 22, 6, WT.bata, W.biru, { rx: 1, tebal: 1, z: 1 }));
export const idBata = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Pohon jambu: batang `${id}-b` dan tajuk `${id}-d`. Pusat x, alas yDasar. */
export const pohon = (id: string, x: number, yDasar: number = Y_TANAH): Obj[] => [
  kotak(`${id}-b`, f(x - 6), f(yDasar - 62), 12, 62, WT.batang, W.biru, { rx: 3, tebal: 1.4, z: -2 }),
  bulat(`${id}-d`, x, f(yDasar - 78), 30, WT.daun, W.hijau, { tebal: 2, z: -2 }),
];
/** Rangka rumah pohon: lantai `${id}-l` dan dua tiang kecil `${id}-p0`, `${id}-p1`. Pusat x, tinggi lantai y. */
export const rangka = (id: string, x: number, y: number): Obj[] => [
  kotak(`${id}-l`, f(x - 26), y, 52, 6, WT.kayu, W.biru, { rx: 1, tebal: 1.3, z: -1 }),
  kotak(`${id}-p0`, f(x - 26), f(y - 26), 4, 26, WT.kayu, W.biru, { rx: 1, tebal: 1, z: -1 }),
  kotak(`${id}-p1`, f(x + 22), f(y - 26), 4, 26, WT.kayu, W.biru, { rx: 1, tebal: 1, z: -1 }),
];

/** Dahan mendatar `${id}`: pojok kiri-atas (x, y), panjang w. */
export const dahan = (id: string, x: number, y: number, w: number): Obj => kotak(id, x, y, w, 6, WT.batang, W.biru, { rx: 3, tebal: 1.2, z: -1 });
/** Burung: badan berwarna `${id}` dan emoji burung `${id}-e`. */
export const burung = (id: string, x: number, y: number, warna: string): Obj[] => [bulat(id, x, y, 10, warna, W.biru, { tebal: 1.2 }), emo(`${id}-e`, x, f(y + 5), E.burung, 14)];

/** Tali atau balok mendatar `${id}`: pojok kiri-atas (x, y), panjang w, tebal h. */
export const balok = (id: string, x: number, y: number, w: number, warna: string, h = 12): Obj => kotak(id, x, y, w, h, warna, W.biru, { rx: 2, tebal: 1.6 });
export const tali = (id: string, x: number, y: number, w: number, warna: string): Obj => kotak(id, x, y, w, 7, warna, W.biru, { rx: 3, tebal: 1.2 });
/** Tali tegak `${id}`: tengah x, ujung atas yAtas, tinggi h. */
export const taliTegak = (id: string, x: number, yAtas: number, h: number, warna: string = WT.tali): Obj => kotak(id, f(x - 3), yAtas, 6, h, warna, W.biru, { rx: 3, tebal: 1.1 });

/** Panah dan garis putus: ujung (x2, y2) ditulis mutlak, disimpan relatif terhadap (x, y). */
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Partial<Obj> = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });
export const putus = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 1.6): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, { putus: true });

export { teks as label };
