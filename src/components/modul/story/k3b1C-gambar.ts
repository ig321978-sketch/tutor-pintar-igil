import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab C (Membandingkan dan Mengurutkan Bilangan Cacah sampai 1.000).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - PAPAN NILAI TEMPAT `s` ("a" kiri, "b" kanan): label bilangan `pv-${s}-n`, judul tempat `pv-${s}-h${i}`, kotak tempat `pv-${s}-c${i}`,
 *   angka tempat `pv-${s}-d${i}` (i = 0 ratusan, 1 puluhan, 2 satuan). Tanda perbandingan `tanda` ("<", ">", atau "=", dibaca dari papan kiri ke papan kanan).
 * - KARTU BILANGAN `bk${i}-k` (kotak, posisi x menentukan urutan dari kiri) dan `bk${i}-t` (isi bilangan); `or-arah` ("urutan naik" atau "urutan turun").
 * - Keterangan bilangan anak: `nb-${slug}` (isi memuat bilangannya), puluhan anak `pd-${slug}`.
 * - GARIS BILANGAN: garis `gb-g`, tanda `gb-t${v}` dan angkanya `gb-l${v}`, titik `gb-m${v}` dan angkanya `gb-n${v}`; posisi x sebanding dengan nilainya.
 * - Contoh perbandingan tertulis: teks berbentuk "339 < 421" (diperiksa benar dan cocok dengan papan bila papan ada).
 * - Kartu pilihan `c1..c3` (`c${i}-k`, `c${i}-t`), pertanyaan `tanya`.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};
export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.hijau, tebal = 3, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan jawaban: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Anak (tokoh tetap) ------------------------------ */
export const NAMA_ANAK: Record<string, string> = { malosi: "Malosi", kira: "Kira", upe: "Upe", wei: "Wei", halim: "Halim", igil: "Igil" };
export const WARNA_ANAK: Record<string, string> = { malosi: "#FCA5A5", kira: "#FDE68A", upe: "#BBF7D0", wei: "#BFDBFE", halim: "#DDD6FE", igil: "#FBCFE8" };
/** Anak berupa kepala bulat berpusat di (cx, cy), badan, dan nama. Id `an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`. */
export function anak(slug: string, cx: number, cy: number): Obj[] {
  return [
    bulat(`an-${slug}`, cx, cy, 11, WARNA_ANAK[slug], W.biru, { tebal: 1.8 }),
    kotak(`an-${slug}-bd`, cx - 10, cy + 12, 20, 18, WARNA_ANAK[slug], W.biru, { rx: 6, tebal: 1.6 }),
    teks(`an-${slug}-lb`, cx, cy + 43, NAMA_ANAK[slug], 9, W.biru),
  ];
}
export const idAnak = (slug: string): string[] => [`an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`];
/** Keterangan bilangan milik anak `slug` (isi memuat bilangannya). */
export const nb = (slug: string, x: number, y: number, isi: string, u = 17): Obj => teks(`nb-${slug}`, x, y, isi, u, W.merah);
/** Keterangan banyak puluhan milik anak `slug`. */
export const pd = (slug: string, x: number, y: number, isi: string): Obj => teks(`pd-${slug}`, x, y, isi, 10, W.ungu);

/* ------------------------------ Papan nilai tempat ------------------------------ */
export type SlotPapan = "a" | "b";
export const TEMPAT = ["ratusan", "puluhan", "satuan"] as const;
export const WARNA_TEMPAT = [W.hijauMuda, W.langit, W.merahMuda];
export const angkaTempat = (n: number): number[] => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
/** Pojok kiri-atas papan: kiri `a`, kanan `b`. Tinggi tetap 70 dari `y`. */
export const PAPAN_X: Record<SlotPapan, number> = { a: 6, b: 168 };
export const PAPAN_Y = 44;
const kolomX = (s: SlotPapan, i: number): number => PAPAN_X[s] + 3 + i * 41;

/** Judul tiga tempat dan tiga kotak tempat (tanpa angka). */
export const papanKerangka = (s: SlotPapan, y = PAPAN_Y): Obj[] =>
  [0, 1, 2].flatMap((i) => [teks(`pv-${s}-h${i}`, kolomX(s, i) + 19, y + 30, TEMPAT[i], 8, W.biru), kotak(`pv-${s}-c${i}`, kolomX(s, i), y + 34, 38, 34, WARNA_TEMPAT[i], W.biru, { rx: 5, tebal: 1.4 })]);
/** Angka tempat ke-`dari` sampai ke-`sampai` dari bilangan `n`. */
export const papanAngka = (s: SlotPapan, n: number, y = PAPAN_Y, dari = 0, sampai = 2): Obj[] =>
  Array.from({ length: sampai - dari + 1 }, (_, q) => dari + q).map((i) => teks(`pv-${s}-d${i}`, kolomX(s, i) + 19, y + 59, String(angkaTempat(n)[i]), 22, W.biru));
/** Label bilangan di atas papan. */
export const papanLabel = (s: SlotPapan, n: number, y = PAPAN_Y): Obj => teks(`pv-${s}-n`, PAPAN_X[s] + 63, y + 16, String(n), 20, W.ungu);
/** Papan lengkap: label, kerangka, dan tiga angka. */
export const papan = (s: SlotPapan, n: number, y = PAPAN_Y): Obj[] => [papanLabel(s, n, y), ...papanKerangka(s, y), ...papanAngka(s, n, y)];
export const idPapan = (s: SlotPapan): string[] => [`pv-${s}-n`, ...[0, 1, 2].flatMap((i) => [`pv-${s}-h${i}`, `pv-${s}-c${i}`, `pv-${s}-d${i}`])];
/** Id kotak tempat ke-`i` di kedua papan. */
export const tempatDua = (i: number): string[] => [`pv-a-c${i}`, `pv-b-c${i}`];
/** Tanda perbandingan di antara dua papan. */
export const tanda = (isi: string, y = PAPAN_Y): Obj => teks("tanda", 150, y + 62, isi, 30, W.merah);

/* ------------------------------ Kartu bilangan dan urutan ------------------------------ */
export const SLOT = [20, 120, 220];
export const LEBAR_BIL = 60;
/** Kartu bilangan ke-`i` (id `bk${i}-k`, `bk${i}-t`) dengan pojok kiri-atas (x, y). */
export const kartuBil = (i: number, x: number, y: number, n: number, warna: string = W.krem): Obj[] => [
  kotak(`bk${i}-k`, x, y, LEBAR_BIL, 34, warna, W.biru, { rx: 6, tebal: 1.6 }),
  teks(`bk${i}-t`, x + LEBAR_BIL / 2, y + 17 + 7, String(n), 20, W.merah),
];
export const idBil = (i: number): string[] => [`bk${i}-k`, `bk${i}-t`];
export const arah = (isi: string, y = 198): Obj => teks("or-arah", 150, y, isi, 11, W.ungu);

/* ------------------------------ Garis bilangan ------------------------------ */
const GX0 = 22;
const GX1 = 278;
export const gbX = (v: number, min: number, max: number): number => GX0 + ((v - min) / (max - min)) * (GX1 - GX0);
export const gbGaris = (y: number): Obj => garis("gb-g", GX0 - 8, y, GX1 - GX0 + 16, 0, W.biru, 2.5);
/** Tanda dan angka di garis untuk nilai `v` (kelipatan seratus). */
export const gbTanda = (v: number, min: number, max: number, y: number): Obj[] => [garis(`gb-t${v}`, gbX(v, min, max), y - 5, 0, 10, W.biru, 2), teks(`gb-l${v}`, gbX(v, min, max), y + 19, String(v), 9.5, W.biru)];
/** Titik bilangan `v` dengan angkanya di atas garis; `tinggi` 0 atau 1 supaya angka berdekatan tidak bertumpuk. */
export const gbTitik = (v: number, min: number, max: number, y: number, tinggi = 0): Obj[] => [
  bulat(`gb-m${v}`, gbX(v, min, max), y, 4.5, W.merah, W.biru, { tebal: 1.4 }),
  teks(`gb-n${v}`, gbX(v, min, max), y - 10 - 14 * tinggi, String(v), 10, W.merah),
];
export const idGb = (...v: number[]): string[] => v.flatMap((q) => [`gb-t${q}`, `gb-l${q}`, `gb-m${q}`, `gb-n${q}`]);
