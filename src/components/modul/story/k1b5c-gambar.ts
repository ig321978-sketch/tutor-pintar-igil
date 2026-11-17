import type { Obj } from "./logika-story";
import { E as E_5A, ikan } from "./k1b5a-gambar";
import { W, bulat, garis, kotak, teks, type Titik } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 5 Sub-Bab C "Kemas Pakan dan Kantong" (puluhan dan satuan), lanjutan cerita Akuarium Ikan Hias Abang.
 * Bungkus pakan `${id}` (miring bila `rot`), karet pengikat `${id}`, keranjang bersekat sepuluh (sekat `${id}c{i}`), kantong ikan `${id}` berisi ikan `${id}-f`,
 * kerikil bulat, papan persediaan bertabel dua kolom (kolom kiri puluhan, kolom kanan satuan), batang puluhan bergaris sepuluh, kubus satuan,
 * dan sedotan (satu per satu atau seikat sepuluh). Bentuk dasar ikan memakai ulang `ikan` dari Sub-Bab A.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik } from "./k1b4a-gambar";
export { ikan } from "./k1b5a-gambar";

export const E = {
  ...E_5A,
  kerang: "\u{1F41A}",
  pembeli: "\u{1F9D1}",
  tunjuk: "\u{1F446}",
} as const;

export const WARNA = {
  bungkus: "#FDBA74",
  meja: "#F5D0A9",
  karet: "#DC2626",
  kantong: "#E0F2FE",
  kantongGaris: "#0EA5E9",
  sekat: "#FEF3C7",
  batang: "#FDE68A",
  kubus: "#93C5FD",
  kiri: "#DBEAFE",
  kanan: "#FCE7F3",
  badanKiri: "#EFF6FF",
  badanKanan: "#FDF2F8",
} as const;
const WARNA_KERIKIL = ["#F87171", "#60A5FA", "#FACC15", "#4ADE80", "#C084FC"];
const WARNA_SEDOTAN = ["#F87171", "#60A5FA", "#FACC15", "#4ADE80", "#C084FC"];
const WARNA_IKAN_KANTONG = ["#FB923C", "#F59E0B", "#22D3EE", "#F472B6"];

const f = (n: number): number => Number(n.toFixed(1));

/** Nomor dari `dari` sampai `sampai` (naik atau turun). */
export const rentang = (dari: number, sampai: number): number[] =>
  dari <= sampai ? Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i) : Array.from({ length: dari - sampai + 1 }, (_, i) => dari - i);

/* ------------------------------ Bungkus pakan dan karet ------------------------------ */

/** Bungkus pakan 14 x 18 dengan pojok kiri-atas (x, y). */
export const bungkus = (id: string, x: number, y: number, rot = 0): Obj => kotak(id, x, y, 14, 18, WARNA.bungkus, W.coklat, { rx: 2, tebal: 1.2, rot });
/** Bungkus pakan kecil 9 x 12 untuk ikatan mini. */
export const bungkusKecil = (id: string, x: number, y: number): Obj => kotak(id, x, y, 9, 12, WARNA.bungkus, W.coklat, { rx: 1.5, tebal: 1 });
/** Karet pengikat: bingkai merah tanpa isi mengelilingi sekelompok benda. */
export const karet = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, "none", WARNA.karet, { rx: 7, tebal: 2.4, z: 2 });
/** Ikatan mini: sepuluh bungkus kecil 5 x 2 dengan karet. Bungkus `${id}b{i}`, karet `${id}`. Lebar 54, tinggi 34. */
export const ikatanMini = (id: string, x: number, y: number): Obj[] => [
  ...rentang(0, 9).map((i) => bungkusKecil(`${id}b${i}`, x + 2 + (i % 5) * 10, y + 3 + Math.floor(i / 5) * 14)),
  karet(id, x, y, 54, 34),
];
/** Meja lapak: papan meja `${id}`. */
export const meja = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, WARNA.meja, W.coklat, { rx: 8, tebal: 2.2, z: -4 });

/* ------------------------------ Keranjang dan kantong ikan ------------------------------ */

/** Pojok kiri-atas sekat ke-i (0 sampai 9) keranjang di (x, y) dengan sekat sisi s. */
export const sekatKe = (x: number, y: number, i: number, s = 22): Titik => ({ x: x + (i % 5) * s, y: y + Math.floor(i / 5) * s });
/** Keranjang isi sepuluh: lima sekat tiap baris, dua baris. Sekat `${id}c{i}`. */
export const keranjang = (id: string, x: number, y: number, s = 22): Obj[] =>
  rentang(0, 9).map((i) => {
    const p = sekatKe(x, y, i, s);
    return kotak(`${id}c${i}`, p.x, p.y, s, s, WARNA.sekat, W.coklat, { rx: 0, tebal: 1.5, z: -1 });
  });
/** Kantong ikan 20 x 20 berisi ikan `${id}-f` (jenis warna ikut nomor). */
export const kantongIkan = (id: string, x: number, y: number, n: number): Obj[] => [
  kotak(id, x, y, 20, 20, WARNA.kantong, WARNA.kantongGaris, { rx: 8, tebal: 1.4 }),
  ...ikan(`${id}-f`, x + 10, y + 11, WARNA_IKAN_KANTONG[n % WARNA_IKAN_KANTONG.length], 0.36),
];

/* ------------------------------ Kerikil ------------------------------ */

/** Kerikil bulat ke-n dengan pusat (x, y). */
export const kerikil = (id: string, x: number, y: number, n: number): Obj => bulat(id, x, y, 5, WARNA_KERIKIL[n % WARNA_KERIKIL.length], W.biru, { tebal: 1.1 });

/* ------------------------------ Tabel puluhan dan satuan ------------------------------ */

/** Ukuran tabel: pojok kiri-atas (x, y), lebar w, tinggi kepala hk, tinggi badan hb. */
export type UkuranTabel = { x: number; y: number; w: number; hk: number; hb: number };
/** Tabel dua kolom: kepala `${id}-hl` dan `${id}-hr`, badan `${id}-bl` dan `${id}-br`, judul kolom `${id}-tl` (puluhan) dan `${id}-tr` (satuan). */
export const tabel = (id: string, t: UkuranTabel): Obj[] => {
  const h = t.w / 2;
  return [
    kotak(`${id}-hl`, t.x, t.y, h, t.hk, WARNA.kiri, W.biru, { rx: 0, tebal: 1.8, z: -1 }),
    kotak(`${id}-hr`, t.x + h, t.y, h, t.hk, WARNA.kanan, W.biru, { rx: 0, tebal: 1.8, z: -1 }),
    kotak(`${id}-bl`, t.x, t.y + t.hk, h, t.hb, WARNA.badanKiri, W.biru, { rx: 0, tebal: 1.8, z: -1 }),
    kotak(`${id}-br`, t.x + h, t.y + t.hk, h, t.hb, WARNA.badanKanan, W.biru, { rx: 0, tebal: 1.8, z: -1 }),
    teks(`${id}-tl`, f(t.x + h / 2), f(t.y + t.hk / 2 + 3.4), "puluhan", 9.4, W.biru),
    teks(`${id}-tr`, f(t.x + h * 1.5), f(t.y + t.hk / 2 + 3.4), "satuan", 9.4, W.biru),
  ];
};
/** Pusat kolom kiri (0) atau kanan (1) tabel. */
export const xKolom = (t: UkuranTabel, kolom: 0 | 1): number => f(t.x + (t.w / 2) * (kolom + 0.5));
/** Angka besar di badan tabel: `${id}-al` (puluhan) dan `${id}-ar` (satuan), pada tinggi `y` bila diberikan. */
export const angkaTabel = (id: string, t: UkuranTabel, kolom: 0 | 1, isi: string, u = 26, y?: number, warna: string = W.merah): Obj =>
  teks(`${id}-a${kolom === 0 ? "l" : "r"}`, xKolom(t, kolom), f(y ?? t.y + t.hk + t.hb / 2 + u * 0.36), isi, u, warna);

/* ------------------------------ Batang puluhan dan kubus satuan ------------------------------ */

/** Batang puluhan 12 x 50 dengan sembilan garis pembagi `${id}-g{j}`; pojok kiri-atas (x, y). */
export const batang = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 12, 50, WARNA.batang, W.coklat, { rx: 1, tebal: 1.4 }),
  ...rentang(1, 9).map((j) => garis(`${id}-g${j}`, x, y + 5 * j, 12, 0, W.coklat, 0.8)),
];
/** Kubus satuan 10 x 10. */
export const kubus = (id: string, x: number, y: number): Obj => kotak(id, x, y, 10, 10, WARNA.kubus, W.biru, { rx: 1, tebal: 1.2 });
/** Sepuluh kubus lima kolom dua baris mulai (x, y), jarak 14: `${id}{i}` (0 sampai 9). */
export const sepuluhKubus = (id: string, x: number, y: number): Obj[] => rentang(0, 9).map((i) => kubus(`${id}${i}`, x + (i % 5) * 14, y + Math.floor(i / 5) * 14));
/** `n` kubus berderet mulai (x, y), jarak 14, empat kubus tiap baris: `${id}{i}`. */
export const kubusBanyak = (id: string, x: number, y: number, n: number): Obj[] =>
  Array.from({ length: n }, (_, i) => kubus(`${id}${i}`, x + (i % 3) * 14, y + Math.floor(i / 3) * 14));

/* ------------------------------ Sedotan ------------------------------ */

/** Sedotan tegak setinggi 34 dengan ujung atas di (x, y). */
export const sedotan = (id: string, x: number, y: number, n: number): Obj => garis(id, x, y, 0, 34, WARNA_SEDOTAN[n % WARNA_SEDOTAN.length], 3.2);
/** Seikat sepuluh sedotan: `${id}s{i}` dan karet `${id}`. Lebar 44, mulai (x, y). */
export const ikatSedotan = (id: string, x: number, y: number): Obj[] => [
  ...rentang(0, 9).map((i) => sedotan(`${id}s${i}`, x + 3 + i * 4.2, y, i)),
  karet(id, x - 2, y + 11, 49, 12),
];
