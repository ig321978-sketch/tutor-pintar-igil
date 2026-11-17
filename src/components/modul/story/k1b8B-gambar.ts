import type { Obj } from "./logika-story";
import { E as E_4, W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 8 Sub-Bab B "Cerita Kesukaan Anak Kampung" (diagram gambar), akhir cerita Perpustakaan Keliling.
 * Mobil pustaka bak terbuka (bak `${id}`, kabin `${id}-c`, roda `${id}-w0` dan `${id}-w1`), kotak cerita bergambar (`${id}` dan gambar `${id}-e`),
 * papan kapur, papan jepit berlembar centang, bintang stiker (jalur), diagram gambar tegak dan mendatar (bintang `${id}{kolom}s{n}`),
 * tabel kecil, tumpukan balok, titik, batang, spanduk, umbul-umbul, dan konfeti. Semua digambar dari bentuk dasar; tokoh memakai emoji bersama.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik } from "./k1b4a-gambar";

export const E = {
  ...E_4,
  pria: "\u{1F468}",
  peri: "\u{1F9DA}",
  anak: "\u{1F9D2}",
  tangan: "\u{270B}",
  hore: "\u{1F64C}",
  topi: "\u{1F9E2}",
  pikir: "\u{1F914}",
  kecewa: "\u{1F61E}",
  tepuk: "\u{1F44F}",
  lembar: "\u{1F4CB}",
  sore: "\u{1F307}",
  lampu: "\u{1F4A1}",
} as const;

/** Warna dan gambar sampul tiap jenis kotak cerita. */
export const JENIS = [
  { nama: "dinosaurus", e: "\u{1F996}", warna: "#86EFAC", bintang: "#16A34A" },
  { nama: "robot", e: "\u{1F916}", warna: "#CBD5E1", bintang: "#2563EB" },
  { nama: "peri", e: "\u{1F9DA}", warna: "#F9A8D4", bintang: "#DB2777" },
  { nama: "sirkus", e: "\u{1F3AA}", warna: "#FDE68A", bintang: "#D97706" },
] as const;

export const WB = {
  bak: "#4ADE80",
  bakTua: "#15803D",
  terpal: "#60A5FA",
  kapur: "#14532D",
  bingkai: "#B45309",
  kertas: "#FFFBEB",
  papanJepit: "#C08457",
  bintang: "#FACC15",
  bintangTua: "#CA8A04",
  balok: "#F97316",
  titik: "#7C3AED",
  batang: "#0EA5E9",
  jalan: "#D6D3D1",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/* ------------------------------ Mobil pustaka, kotak cerita, papan kapur ------------------------------ */

/** Mobil pustaka bak terbuka: bak `${id}`, terpal `${id}-t`, kabin `${id}-c`, kaca `${id}-j`, roda `${id}-w0` `${id}-w1`. Pojok kiri-atas (x, y), lebar w (tinggi sekitar 66). */
export const mobil = (id: string, x: number, y: number, w = 150): Obj[] => {
  const bak = f(w * 0.68);
  return [
    kotak(id, x, f(y + 14), bak, 40, WB.bak, WB.bakTua, { rx: 4, tebal: 2, z: -1 }),
    { id: `${id}-t`, t: "jalur", x, y: f(y + 14), d: `M0 0 L6 -12 L${f(bak - 6)} -12 L${bak} 0 Z`, warna: WB.terpal, garis: W.biru, tebal: 1.4, z: -1 },
    kotak(`${id}-c`, f(x + bak + 2), f(y + 24), f(w - bak - 2), 30, "#22C55E", WB.bakTua, { rx: 5, tebal: 2, z: -1 }),
    kotak(`${id}-j`, f(x + bak + 8), f(y + 28), f(w - bak - 16), 11, "#E0F2FE", WB.bakTua, { rx: 2, tebal: 1, z: 0 }),
    bulat(`${id}-w0`, f(x + w * 0.2), f(y + 58), 8, "#334155", W.putih, { tebal: 2, z: 1 }),
    bulat(`${id}-w1`, f(x + w * 0.8), f(y + 58), 8, "#334155", W.putih, { tebal: 2, z: 1 }),
  ];
};

/** Satu kotak cerita bergambar jenis `j` (0 sampai 3): kotak `${id}` dan gambar sampul `${id}-e`. Pojok kiri-atas (x, y), sisi s. */
export const kotakCerita = (id: string, x: number, y: number, s: number, j: number, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, x, y, s, s, JENIS[j].warna, WB.bingkai, { rx: 3, tebal: 1.4, ...o }),
  emo(`${id}-e`, f(x + s / 2), f(y + s * 0.74), JENIS[j].e, f(s * 0.6), o),
];

/** Papan kapur berbingkai kayu: bingkai `${id}` dan papan `${id}-p`. Pojok kiri-atas (x, y). */
export const papanKapur = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WB.bingkai, W.coklat, { rx: 5, tebal: 2, z: -3 }),
  kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, WB.kapur, undefined, { rx: 3, z: -2 }),
];

/* ------------------------------ Lembar centang di papan jepit ------------------------------ */

/** Papan jepit: papan `${id}`, kertas `${id}-k`, jepit `${id}-j`, empat kepala jenis `${id}-h{i}`, garis kolom `${id}-g{i}`. Pojok kiri-atas (x, y). Kolom ke-i berpusat di `xLembar`. */
export const LEMBAR = { x: 30, y: 34, w: 240, h: 150 } as const;
export const xLembar = (i: number): number => LEMBAR.x + 30 + i * 60;
export const lembar = (id: string): Obj[] => [
  kotak(id, LEMBAR.x, LEMBAR.y, LEMBAR.w, LEMBAR.h, WB.papanJepit, W.coklat, { rx: 6, tebal: 2, z: -3 }),
  kotak(`${id}-k`, LEMBAR.x + 8, LEMBAR.y + 14, LEMBAR.w - 16, LEMBAR.h - 22, WB.kertas, undefined, { rx: 2, z: -2 }),
  kotak(`${id}-j`, f(LEMBAR.x + LEMBAR.w / 2 - 20), LEMBAR.y + 4, 40, 12, "#94A3B8", W.biru, { rx: 3, tebal: 1.2, z: -1 }),
  ...JENIS.map((j, i) => emo(`${id}-h${i}`, xLembar(i), LEMBAR.y + 38, j.e, 18)),
  ...[1, 2, 3].map((i) => garis(`${id}-g${i}`, xLembar(i) - 30, LEMBAR.y + 20, 0, LEMBAR.h - 32, "#CBD5E1", 1, { z: -1 })),
];
/** Centang ke-n (0 sampai 4) pada kolom jenis i: `${id}`. */
export const centang = (id: string, i: number, n: number): Obj => emo(id, xLembar(i), LEMBAR.y + 66 + n * 20, "\u{2705}", 14);

/* ------------------------------ Bintang stiker ------------------------------ */

/** Bintang stiker (jalur lima sudut) berpusat di (cx, cy), jari-jari luar r. */
export const bintang = (id: string, cx: number, cy: number, r = 5.2, warna: string = WB.bintang, o: Partial<Obj> = {}): Obj => {
  const p: string[] = [];
  for (let k = 0; k < 10; k += 1) {
    const rr = k % 2 === 0 ? r : r * 0.45;
    const a = (-90 + k * 36) * (Math.PI / 180);
    p.push(`${f(rr * Math.cos(a))} ${f(rr * Math.sin(a))}`);
  }
  return { id, t: "jalur", x: cx, y: cy, d: `M${p.join(" L")} Z`, warna, garis: WB.bintangTua, tebal: 0.9, ...o };
};

/* ------------------------------ Diagram gambar tegak ------------------------------ */

/** Letak diagram tegak: kolom ke-i berpusat di x = x0 + i * dx; baris ke-j (0 = paling bawah) berpusat di dasar - (j + 0.5) * dy. */
export const DG = { x0: 96, dx: 44, dasar: 152, dy: 12.5, r: 5.2, sumbuX: 68 } as const;
export const xKol = (i: number): number => f(DG.x0 + i * DG.dx);
export const yBar = (j: number, dy: number = DG.dy): number => f(DG.dasar - (j + 0.5) * dy);

/** Sumbu diagram tegak: garis dasar `${id}`, garis kiri `${id}-y`, angka `${id}a{n}` (1 sampai tinggi). */
export const sumbuTegak = (id: string, tinggi = 5, angka = true): Obj[] => [
  garis(id, DG.sumbuX, DG.dasar, 4 * DG.dx + 4, 0, W.biru, 2, { z: -1 }),
  garis(`${id}-y`, DG.sumbuX, DG.dasar - tinggi * DG.dy - 4, 0, tinggi * DG.dy + 4, W.biru, 2, { z: -1 }),
  ...(angka ? Array.from({ length: tinggi }, (_, n) => teks(`${id}a${n + 1}`, DG.sumbuX - 7, f(yBar(n) + 2.6), String(n + 1), 7, W.biru)) : []),
];
/** Kolom ke-i berisi n bintang `${id}${i}s{j}` berwarna jenis i; `dy` lebih besar dari bawaan = renggang. */
export const kolomBintang = (id: string, i: number, n: number, dy: number = DG.dy): Obj[] =>
  Array.from({ length: n }, (_, j) => bintang(`${id}${i}s${j}`, xKol(i), yBar(j, dy), DG.r, JENIS[i].bintang));
/** Id bintang kolom i, nomor dari sampai sampai. */
export const idKolom = (id: string, i: number, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${id}${i}s${dari + q}`);
/** Letak ulang bintang kolom i sebanyak n ke jarak `dy` (untuk merapatkan). */
export const rapatkan = (id: string, i: number, n: number, dy: number = DG.dy): Ubah[] => Array.from({ length: n }, (_, j) => ({ id: `${id}${i}s${j}`, y: yBar(j, dy) }));
/** Nama kolom jenis i di bawah dasar: `${id}`. */
export const namaKol = (id: string, i: number): Obj => teks(id, xKol(i), DG.dasar + 14, JENIS[i].nama, 7.6, W.biru);

/* ------------------------------ Diagram gambar mendatar ------------------------------ */

export const MD = { x0: 98, dx: 12.5, y0: 62, dy: 30, sumbuX: 92 } as const;
export const yBaris = (i: number): number => f(MD.y0 + i * MD.dy);
export const xBar = (j: number): number => f(MD.x0 + j * MD.dx);
/** Sumbu mendatar: garis kiri `${id}`, garis dasar `${id}-x`, angka `${id}a{n}` di bawah. */
export const sumbuMendatar = (id: string, panjang = 5): Obj[] => [
  garis(id, MD.sumbuX, yBaris(0) - 18, 0, 3 * MD.dy + 36, W.biru, 2, { z: -1 }),
  garis(`${id}-x`, MD.sumbuX, yBaris(3) + 18, panjang * MD.dx + 10, 0, W.biru, 2, { z: -1 }),
  ...Array.from({ length: panjang }, (_, n) => teks(`${id}a${n + 1}`, xBar(n), f(yBaris(3) + 30), String(n + 1), 7, W.biru)),
];
/** Baris ke-i berisi n bintang `${id}${i}s{j}`. */
export const barisBintang = (id: string, i: number, n: number): Obj[] => Array.from({ length: n }, (_, j) => bintang(`${id}${i}s${j}`, xBar(j), yBaris(i), DG.r, JENIS[i].bintang));
/** Nama baris jenis i di kiri sumbu: `${id}`. */
export const namaBaris = (id: string, i: number): Obj => teks(id, MD.sumbuX - 4, f(yBaris(i) + 2.6), JENIS[i].nama, 7.6, W.biru, { anchor: "end" });

/* ------------------------------ Tabel kecil ------------------------------ */

/** Tabel dua baris empat kolom: sel `${id}k{r}{c}`; nama kolom `${id}n{c}` tertulis; angka `${id}v{c}` dibuat terpisah (`selAngka`). */
export const TB = { x: 20, y: 66, w: 65, h: 32 } as const;
export const tabel = (id: string): Obj[] => [
  ...JENIS.flatMap((j, c) => [
    kotak(`${id}k0${c}`, TB.x + c * TB.w, TB.y, TB.w, TB.h, W.langit, W.biru, { rx: 0, tebal: 1.4 }),
    kotak(`${id}k1${c}`, TB.x + c * TB.w, TB.y + TB.h, TB.w, TB.h, W.putih, W.biru, { rx: 0, tebal: 1.4 }),
    teks(`${id}n${c}`, f(TB.x + c * TB.w + TB.w / 2), f(TB.y + TB.h / 2 + 3), j.nama, 8, W.biru),
  ]),
];
export const selAngka = (id: string, c: number, isi: string, warna: string = W.merah): Obj => teks(`${id}v${c}`, f(TB.x + c * TB.w + TB.w / 2), f(TB.y + TB.h * 1.5 + 7), isi, 16, warna);

/* ------------------------------ Balok, titik, batang ------------------------------ */

export const BALOK = { w: 16, h: 11 } as const;
/** Kolom balok `${id}{i}`: n balok bertumpuk rapat berdiri di x (tengah), dasar `yDasar`. */
export const kolomBalok = (id: string, n: number, x: number, yDasar: number, warna: string = WB.balok, renggang = 0): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, f(x - BALOK.w / 2), f(yDasar - (i + 1) * BALOK.h - i * renggang), BALOK.w, BALOK.h, warna, W.coklat, { rx: 1, tebal: 1.1 }));
/** Id balok `${id}{dari}` sampai `${id}{sampai}`. */
export const idBalok = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}${dari + i}`);
/** Kolom titik `${id}{i}`: n titik bertumpuk berjarak 11 berdiri di x, dasar `yDasar`. */
export const kolomTitik = (id: string, n: number, x: number, yDasar: number, warna: string = WB.titik): Obj[] =>
  Array.from({ length: n }, (_, i) => bulat(`${id}${i}`, x, f(yDasar - 7 - i * 11), 4.2, warna, W.biru, { tebal: 1 }));
/** Batang tegak `${id}`: tinggi n * unit dari dasar `yDasar`, lebar w, tengah x. */
export const batang = (id: string, x: number, yDasar: number, n: number, unit: number, w = 34, warna: string = WB.batang): Obj =>
  kotak(id, f(x - w / 2), f(yDasar - n * unit), w, f(n * unit), warna, W.biru, { rx: 2, tebal: 1.4 });
/** Garis dasar mendatar `${id}` dari x1 ke x2 di tinggi y. */
export const dasar = (id: string, x1: number, x2: number, y: number): Obj => garis(id, x1, y, x2 - x1, 0, W.biru, 2, { z: -1 });

/* ------------------------------ Spanduk, umbul-umbul, konfeti ------------------------------ */

/** Spanduk: kain `${id}-k`, tulisan `${id}-t0`, dua tali. Pojok kiri-atas (x, y). */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string, u = 9): Obj[] => [
  garis(`${id}-a`, x + 8, y - 8, 0, 8, W.coklat, 2),
  garis(`${id}-b`, x + w - 8, y - 8, 0, 8, W.coklat, 2),
  kotak(`${id}-k`, x, y, w, 22, W.emas, W.biru, { rx: 5, tebal: 2 }),
  teks(`${id}-t0`, f(x + w / 2), f(y + 15), isi, u, W.biru),
];
const WARNA_UMBUL = ["#F472B6", "#FACC15", "#22D3EE", "#A78BFA", "#34D399", "#FB923C"];
/** Tali umbul-umbul `${id}` dan `n` bendera segitiga `${id}-b{i}` dari x ke x + lebar di tinggi y. */
export const umbul = (id: string, x: number, y: number, lebar: number, n: number): Obj[] => [
  garis(id, x, y, lebar, 0, W.coklat, 1.4, { z: 2 }),
  ...Array.from({ length: n }, (_, i): Obj => {
    const cx = f(x + ((i + 0.5) * lebar) / n);
    return { id: `${id}-b${i}`, t: "jalur", x: cx, y, d: "M-7 0 L7 0 L0 13 Z", warna: WARNA_UMBUL[i % WARNA_UMBUL.length], garis: W.biru, tebal: 1, z: 2 };
  }),
];
const TITIK_KONFETI: [number, number, number][] = [[24, 40, 8], [64, 56, -14], [108, 34, 20], [150, 52, -6], [196, 36, 14], [236, 58, -18], [272, 42, 10], [286, 74, -10]];
/** Delapan keping konfeti `${id}{i}` berhamburan di bagian atas. */
export const konfeti = (id: string): Obj[] =>
  TITIK_KONFETI.map(([x, y, r], i) => kotak(`${id}${i}`, x, y, 7, 4, WARNA_UMBUL[i % WARNA_UMBUL.length], undefined, { rx: 1, rot: r, z: 3 }));

/** Panah kecil `${id}` dari (x, y) sejauh (dx, dy). */
export const panah = (id: string, x: number, y: number, dx: number, dy: number, warna: string = W.merah): Obj => ({ id, t: "panah", x, y, x2: dx, y2: dy, warna, tebal: 2 });
/** Jalan kampung: pita abu `${id}` di tinggi y. */
export const jalan = (id: string, y: number): Obj => kotak(id, 2, y, 296, 12, WB.jalan, undefined, { rx: 0, z: -3 });
