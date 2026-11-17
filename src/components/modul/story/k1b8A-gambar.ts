import type { Obj } from "./logika-story";
import { E as E_4, W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 8 Sub-Bab A "Kotak Cerita Berantakan" (memilah benda, turus, dan tabel), awal cerita Perpustakaan Keliling.
 * Halaman rumput, mobil pustaka bak terbuka bercat hijau dengan terpal, kotak cerita bergambar `${id}` dengan emoji `${id}-e`,
 * rak kayu lipat bersekat `${id}-b`, papan data kapur, goresan turus `${id}{i}` (lima dicoret miring), tabel menurun dan mendatar,
 * jam dinding, lingkaran tali, serta panah dan garis putus.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks } from "./k1b4a-gambar";

export const E = {
  ...E_4,
  pakPos: "\u{1F468}",
  topi: "\u{1F9E2}",
  hewan: "\u{1F418}",
  laut: "\u{1F41F}",
  roket: "\u{1F680}",
  bunga: "\u{1F338}",
  bersin: "\u{1F927}",
  tertawa: "\u{1F602}",
  lambai: "\u{1F44B}",
  jari: "\u{1F449}",
  putar: "\u{1F504}",
  anak: "\u{1F9D2}",
  lampu: "\u{1F4A1}",
  kalender: "\u{1F4C5}",
  pohon: "\u{1F333}",
  bulan: "\u{1F319}",
  hati: "\u{2764}\u{FE0F}",
  biru: "\u{1F535}",
  kartu: "\u{1F4C7}",
  kilat: "\u{26A1}",
  jabat: "\u{1F91D}",
} as const;

/** Empat jenis kotak cerita bergambar: emoji dan warna kotaknya. */
export const JENIS = {
  hewan: { e: E.hewan, w: "#FDBA74", nama: "Hewan" },
  laut: { e: E.laut, w: "#7DD3FC", nama: "Laut" },
  roket: { e: E.roket, w: "#FCA5A5", nama: "Roket" },
  bunga: { e: E.bunga, w: "#F9A8D4", nama: "Bunga" },
} as const;
export type JenisKotak = keyof typeof JENIS;
export const URUT_JENIS: JenisKotak[] = ["hewan", "laut", "roket", "bunga"];
/** Banyak kotak tiap jenis pada Story: hewan 6, laut 4, roket 5, bunga 3. */
export const BANYAK: Record<JenisKotak, number> = { hewan: 6, laut: 4, roket: 5, bunga: 3 };

/** Warna kapur, papan, dan kayu. */
export const WK = {
  papan: "#14532D",
  kapur: "#F8FAFC",
  kapurKuning: "#FDE68A",
  bingkai: "#92400E",
  kayu: "#D6A15E",
  rumput: "#BBF7D0",
  hijau: "#16A34A",
  terpal: "#FEF3C7",
  roda: "#475569",
  tali: "#B45309",
  abu: "#94A3B8",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/** Halaman rumput `${id}`: dari tinggi y sampai bawah kanvas. */
export const tanah = (id: string, y = 150): Obj => kotak(id, 2, y, 296, 198 - y, WK.rumput, W.hijau, { rx: 4, tebal: 1.5, z: -3 });

/** Garis dan panah dengan ujung ditulis mutlak (disimpan relatif). */
export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Partial<Obj> = {}): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, o);
export const putus = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 1.6): Obj => gs(id, x, y, x2, y2, warna, tebal, { putus: true });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Partial<Obj> = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });

/** Kotak cerita bergambar berpusat (cx, cy) bersisi s: kotak `${id}` dan emoji `${id}-e`. */
export const kotakCerita = (id: string, cx: number, cy: number, jenis: JenisKotak, s = 16, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, f(cx - s / 2), f(cy - s / 2), s, s, JENIS[jenis].w, W.biru, { rx: 2, tebal: 1.2, ...o }),
  emo(`${id}-e`, cx, f(cy + s * 0.3), JENIS[jenis].e, f(s * 0.72), o),
];
export const idKotak = (id: string): string[] => [id, `${id}-e`];
export const geserKotak = (id: string, cx: number, cy: number, s = 16): Ubah[] => [
  { id, x: f(cx - s / 2), y: f(cy - s / 2) },
  { id: `${id}-e`, x: cx, y: f(cy + s * 0.3) },
];

/** Kotak kosong bertepi putus-putus tipis (bayangan) berpusat (cx, cy). */
export const bayangan = (id: string, cx: number, cy: number, s = 14): Obj => kotak(id, f(cx - s / 2), f(cy - s / 2), s, s, W.putih, WK.abu, { rx: 2, tebal: 1.2, op: 0.45 });

/** Jam dinding: muka `${id}`, jarum menit `${id}-m` menunjuk hampir pukul empat, jarum jam `${id}-j`, titik tengah `${id}-c`. */
export const jam = (id: string, x: number, y: number, r = 16): Obj[] => [
  bulat(id, x, y, r, W.putih, W.biru, { tebal: 2.4 }),
  gs(`${id}-m`, x, y, f(x - r * 0.16), f(y - r * 0.72), W.biru, 1.8, { z: 2 }),
  gs(`${id}-j`, x, y, f(x + r * 0.45), f(y + r * 0.26), W.merah, 2.4, { z: 2 }),
  bulat(`${id}-c`, x, y, 1.8, W.biru, W.biru, { z: 3 }),
];

/** Mobil pustaka bak terbuka: pojok kiri-atas terpal (x, y), lebar 108, tinggi 54. Bak `${id}-b`, terpal `${id}-t`, kabin `${id}-k`, kaca `${id}-g`, roda `${id}-r0`, `${id}-r1`, tulisan `${id}-s`. */
export const mobil = (id: string, x: number, y: number): Obj[] => [
  kotak(`${id}-b`, x, f(y + 14), 74, 28, WK.hijau, W.biru, { rx: 3, tebal: 1.8 }),
  kotak(`${id}-t`, f(x - 2), y, 78, 10, WK.terpal, W.biru, { rx: 4, tebal: 1.6, z: 1 }),
  gs(`${id}-p0`, f(x + 2), f(y + 10), f(x + 2), f(y + 15), W.biru, 1.6),
  gs(`${id}-p1`, f(x + 70), f(y + 10), f(x + 70), f(y + 15), W.biru, 1.6),
  kotak(`${id}-k`, f(x + 74), f(y + 14), 34, 28, WK.hijau, W.biru, { rx: 5, tebal: 1.8 }),
  kotak(`${id}-g`, f(x + 82), f(y + 18), 20, 11, W.langit, W.biru, { rx: 2, tebal: 1.2, z: 1 }),
  bulat(`${id}-r0`, f(x + 16), f(y + 44), 8, WK.roda, W.biru, { tebal: 1.8, z: 2 }),
  bulat(`${id}-r1`, f(x + 88), f(y + 44), 8, WK.roda, W.biru, { tebal: 1.8, z: 2 }),
  teks(`${id}-s`, f(x + 37), f(y + 36), "PUSTAKA", 7, W.putih, { z: 2 }),
];
export const idMobil = (id: string): string[] => ["b", "t", "p0", "p1", "k", "g", "r0", "r1", "s"].map((s) => `${id}-${s}`);

/** Rak kayu lipat dengan `n` petak: badan `${id}-b`, sekat `${id}-s{i}`. Pojok kiri-atas (x, y). */
export const rak = (id: string, x: number, y: number, w: number, h: number, n = 4): Obj[] => [
  kotak(`${id}-b`, x, y, w, h, WK.kayu, WK.bingkai, { rx: 4, tebal: 2.2, z: -1 }),
  ...Array.from({ length: n - 1 }, (_, i) => gs(`${id}-s${i + 1}`, f(x + (w * (i + 1)) / n), f(y + 3), f(x + (w * (i + 1)) / n), f(y + h - 3), WK.bingkai, 2, { z: -1 })),
];
/** Tengah petak ke-i rak. */
export const tengahPetak = (x: number, w: number, n: number, i: number): number => f(x + (w * (i + 0.5)) / n);

/** Papan data kapur: kotak `${id}` bertepi kayu tebal. */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, WK.papan, WK.bingkai, { rx: 5, tebal: 4, z: -1 });
/** Tulisan kapur. */
export const kapur = (id: string, x: number, y: number, isi: string, u = 10, o: Partial<Obj> = {}): Obj => teks(id, x, y, isi, u, WK.kapur, { z: 3, ...o });

/** Goresan turus `${id}{i}`: tiap lima goresan, yang kelima dicoret miring. Pojok kiri-atas kelompok pertama (x, y), tinggi 14. */
export function turus(id: string, x: number, y: number, n: number, warna: string = WK.kapur): Obj[] {
  return Array.from({ length: n }, (_, i) => {
    const g = Math.floor(i / 5);
    const j = i % 5;
    const gx = x + g * 28;
    if (j < 4) return gs(`${id}${i}`, f(gx + j * 5), y, f(gx + j * 5), f(y + 14), warna, 2, { z: 3 });
    return gs(`${id}${i}`, f(gx - 3), f(y + 12), f(gx + 19), f(y + 2), warna, 2, { z: 3 });
  });
}
export const idTurus = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Sel tabel: kotak `${id}` dan teks `${id}t`. */
const sel = (id: string, x: number, y: number, w: number, h: number, isi: string, warna: string, u: number, tebal = 1.2): Obj[] => [
  kotak(id, x, y, w, h, warna, W.biru, { rx: 1, tebal }),
  ...(isi === "" ? [] : [teks(`${id}t`, f(x + w / 2), f(y + h / 2 + u * 0.35), isi, u, W.biru)]),
];

export type BarisTabel = { nama: string; n: number | string };
export const LEBAR_NAMA = 70;
export const LEBAR_ANGKA = 46;
export const TINGGI_BARIS = 15;

/**
 * Tabel menurun: judul `${id}-jd` (kotak `${id}-jd-k`), kepala `${id}-h0` dan `${id}-h1`, baris i: nama `${id}-r{i}a` dan angka `${id}-r{i}b`
 * (tiap sel kotak dengan teks `...t`). Pojok kiri-atas (x, y); judul, kepala, lalu baris.
 */
export function tabelMenurun(id: string, x: number, y: number, judulTabel: string, baris: BarisTabel[], kepala: [string, string] = ["Jenis", "Banyak"]): Obj[] {
  const w = LEBAR_NAMA + LEBAR_ANGKA;
  const h = TINGGI_BARIS;
  return [
    kotak(`${id}-jd-k`, x, y, w, h, W.emas, W.biru, { rx: 1, tebal: 1.6 }),
    teks(`${id}-jd`, f(x + w / 2), f(y + h / 2 + 3), judulTabel, 8, W.biru),
    ...sel(`${id}-h0`, x, y + h, LEBAR_NAMA, h, kepala[0], W.lavender, 8, 1.4),
    ...sel(`${id}-h1`, x + LEBAR_NAMA, y + h, LEBAR_ANGKA, h, kepala[1], W.lavender, 8, 1.4),
    ...baris.flatMap((b, i) => [...sel(`${id}-r${i}a`, x, y + h * (i + 2), LEBAR_NAMA, h, b.nama, W.putih, 8.4), ...sel(`${id}-r${i}b`, x + LEBAR_NAMA, y + h * (i + 2), LEBAR_ANGKA, h, String(b.n), W.putih, 9.4)]),
  ];
}
/** Semua id benda dalam tabel menurun. */
export const idTabelMenurun = (id: string, n: number): string[] => [
  `${id}-jd-k`, `${id}-jd`, `${id}-h0`, `${id}-h0t`, `${id}-h1`, `${id}-h1t`,
  ...Array.from({ length: n }, (_, i) => ["a", "at", "b", "bt"].map((s) => `${id}-r${i}${s}`)).flat(),
];
/** Sel baris i (kotak nama dan kotak angka) untuk disorot. */
export const selBaris = (id: string, i: number): string[] => [`${id}-r${i}a`, `${id}-r${i}b`];
/** Sel kolom angka (kepala dan semua baris). */
export const selKolom = (id: string, n: number): string[] => [`${id}-h1`, ...Array.from({ length: n }, (_, i) => `${id}-r${i}b`)];

export const LEBAR_SEL_DATAR = 44;
export const LEBAR_LABEL_DATAR = 40;
/** Tabel mendatar: judul `${id}-jd`, label `${id}-h0` (Jenis) dan `${id}-h1` (Banyak), kolom c: nama `${id}-c{c}a` dan angka `${id}-c{c}b`. */
export function tabelMendatar(id: string, x: number, y: number, judulTabel: string, kolom: BarisTabel[]): Obj[] {
  const w = LEBAR_LABEL_DATAR + LEBAR_SEL_DATAR * kolom.length;
  const h = TINGGI_BARIS;
  return [
    kotak(`${id}-jd-k`, x, y, w, h, W.emas, W.biru, { rx: 1, tebal: 1.6 }),
    teks(`${id}-jd`, f(x + w / 2), f(y + h / 2 + 3), judulTabel, 8, W.biru),
    ...sel(`${id}-h0`, x, y + h, LEBAR_LABEL_DATAR, h, "Jenis", W.lavender, 8, 1.4),
    ...sel(`${id}-h1`, x, y + h * 2, LEBAR_LABEL_DATAR, h, "Banyak", W.lavender, 7.6, 1.4),
    ...kolom.flatMap((b, c) => [...sel(`${id}-c${c}a`, x + LEBAR_LABEL_DATAR + LEBAR_SEL_DATAR * c, y + h, LEBAR_SEL_DATAR, h, b.nama, W.putih, 8.4), ...sel(`${id}-c${c}b`, x + LEBAR_LABEL_DATAR + LEBAR_SEL_DATAR * c, y + h * 2, LEBAR_SEL_DATAR, h, String(b.n), W.putih, 9.4)]),
  ];
}
export const idTabelMendatar = (id: string, n: number): string[] => [
  `${id}-jd-k`, `${id}-jd`, `${id}-h0`, `${id}-h0t`, `${id}-h1`, `${id}-h1t`,
  ...Array.from({ length: n }, (_, c) => ["a", "at", "b", "bt"].map((s) => `${id}-c${c}${s}`)).flat(),
];

/** Pak Pos Pustaka: wajah `${id}`, topi `${id}-tp`, nama `${id}-n`. */
export const pakPos = (id: string, x: number, y: number): Obj[] => [
  emo(id, x, y, E.pakPos, 30),
  emo(`${id}-tp`, x, f(y - 13), E.topi, 15),
  teks(`${id}-n`, x, y + 13, "Pak Pos", 8.4, W.ungu),
];
export const idPakPos = (id: string): string[] => [id, `${id}-tp`, `${id}-n`];

/** Lingkaran tali: bulatan berisi warna muda `${id}` bertepi tali tebal. */
export const lingkaran = (id: string, x: number, y: number, r: number, warna: string, o: Partial<Obj> = {}): Obj => bulat(id, x, y, r, warna, WK.tali, { tebal: 3.2, z: -1, ...o });

/** Empat jenis dalam urutan: indeks 0 sampai 3. */
export const jenisKe = (i: number): JenisKotak => URUT_JENIS[i];
