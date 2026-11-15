import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab E (Pengurangan sampai 100).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - SUSUN `sg` (satu per adegan): judul kolom `sg-h1` (puluhan) dan `sg-h0` (satuan); bilangan atas `sg-a1`, `sg-a0`; bilangan bawah `sg-b1`, `sg-b0`;
 *   tanda `sg-op` (minus atau plus) dan garis `sg-ln`; hasil `sg-r1`, `sg-r0`.
 *   Pengurangan yang mengambil satu puluhan: coretan `sg-x1`, `sg-x0`; puluhan baru `sg-p1` (puluhan atas dikurangi satu); satuan baru `sg-p0` (sepuluh ditambah satuan atas).
 *   Penjumlahan: simpanan puluhan `sg-p1` (satu, hanya bila satuan berjumlah sepuluh atau lebih).
 * - BLOK `pb-${g}` (g = a, b, c): batang puluhan `pb-${g}-p-${i}`, kotak satuan `pb-${g}-s-${j}` (i, j dari 1); label `pb-${g}-n` = nilai blok yang terang
 *   (sepuluh kali batang terang ditambah kotak terang; blok yang diambil diredupkan dengan op 0.2).
 * - GARIS BILANGAN `nl`: titik ke-i `nl-p${i}` (bilangan), lompatan ke-i `nl-h${i}` (plus selisih) dari titik i ke titik i + 1, panah `nl-a${i}`.
 * - Kartu pilihan `c1..c3` (`c${i}-k`, `c${i}-t`), pertanyaan `tanya` (bentuk "berapa A - B?").
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
export const MIN = "−";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.5, ...o });
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

/** Gambar benda cerita (emoji paling tinggi Emoji 12). */
export const EMO: Record<string, string> = {
  jeruk: "\u{1F34A}",
  apel: "\u{1F34E}",
  kelereng: "\u{1F535}",
  mawar: "\u{1F339}",
  balon: "\u{1F388}",
  ikan: "\u{1F41F}",
};

/* ------------------------------ Susun ------------------------------ */

export type OpsiSusun = { op?: "-" | "+"; tx?: number; ox?: number };

/** Pembuat susun dua bilangan dua angka: semua posisi dan angka dihitung dari A dan B. */
export function buatSusun(A: number, B: number, o: OpsiSusun = {}) {
  const op = o.op ?? "-";
  const tx = o.tx ?? 40;
  const ox = o.ox ?? 80;
  const a1 = Math.floor(A / 10);
  const a0 = A % 10;
  const b1 = Math.floor(B / 10);
  const b0 = B % 10;
  const R = op === "-" ? A - B : A + B;
  const ambil = op === "-" && a0 < b0;
  const simpan = op === "+" && a0 + b0 >= 10;
  const r0 = ambil ? 10 + a0 - b0 : op === "-" ? a0 - b0 : (a0 + b0) % 10;
  const r1 = Math.floor(R / 10);
  const angka = (id: string, x: number, y: number, n: number, warna: string): Obj => teks(id, x, y, String(n), 26, warna);
  const kerangka = (): Obj[] => [
    teks("sg-h1", tx, 30, "puluhan", 9, W.ungu),
    teks("sg-h0", ox, 30, "satuan", 9, W.ungu),
    teks("sg-op", 14, 102, op === "-" ? MIN : "+", 22, W.merah),
    garis("sg-ln", 22, 108, ox + 16 - 22, 0, W.biru, 2),
  ];
  const atas = (): Obj[] => [angka("sg-a1", tx, 74, a1, W.biru), angka("sg-a0", ox, 74, a0, W.biru)];
  const bawah = (): Obj[] => [angka("sg-b1", tx, 102, b1, W.biru), angka("sg-b0", ox, 102, b0, W.biru)];
  const coret = (): Obj[] => [garis("sg-x1", tx - 9, 78, 18, -16, W.merah, 2.2), garis("sg-x0", ox - 9, 78, 18, -16, W.merah, 2.2)];
  const puluhBaru = (): Obj => teks("sg-p1", tx, 48, String(op === "-" ? a1 - 1 : 1), 12, W.merah);
  const satuBaru = (): Obj => teks("sg-p0", ox, 48, String(10 + a0), 12, W.merah);
  const hasil0 = (): Obj => angka("sg-r0", ox, 136, r0, W.merah);
  const hasil1 = (): Obj => angka("sg-r1", tx, 136, r1, W.merah);
  const idAtas = ["sg-a1", "sg-a0"];
  const idBawah = ["sg-b1", "sg-b0"];
  const idSemua = ["sg-h1", "sg-h0", "sg-op", "sg-ln", "sg-a1", "sg-a0", "sg-b1", "sg-b0", "sg-x1", "sg-x0", "sg-p1", "sg-p0", "sg-r1", "sg-r0"];
  return { A, B, R, ambil, simpan, r0, r1, kerangka, atas, bawah, coret, puluhBaru, satuBaru, hasil0, hasil1, idAtas, idBawah, idSemua };
}
export type Susun = ReturnType<typeof buatSusun>;

/* ------------------------------ Blok puluhan dan satuan ------------------------------ */

/** Kelompok blok `g`: batang puluhan berisi sepuluh satuan dan kotak kecil satuan. Pojok kiri-atas (x0, y0); `maxR` = jatah lebar untuk batang. */
export function buatBlok(g: string, x0: number, y0: number, maxR = 5) {
  const xs = x0 + maxR * 9 + 6;
  const batang = (i: number): Obj => kotak(`pb-${g}-p-${i}`, x0 + (i - 1) * 9, y0, 7, 30, W.langit, W.biru, { rx: 1.5, tebal: 1.2 });
  const kecil = (j: number): Obj => kotak(`pb-${g}-s-${j}`, xs + ((j - 1) % 5) * 10, y0 + Math.floor((j - 1) / 5) * 10, 8, 8, W.merahMuda, W.merah, { rx: 1.5, tebal: 1.1 });
  const rentang = (dari: number, sampai: number): number[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, q) => dari + q);
  const batangObj = (dari: number, sampai: number): Obj[] => rentang(dari, sampai).map(batang);
  const kecilObj = (dari: number, sampai: number): Obj[] => rentang(dari, sampai).map(kecil);
  const idBatang = (dari: number, sampai: number): string[] => rentang(dari, sampai).map((i) => `pb-${g}-p-${i}`);
  const idKecil = (dari: number, sampai: number): string[] => rentang(dari, sampai).map((j) => `pb-${g}-s-${j}`);
  const label = (isi: number | string): Obj => teks(`pb-${g}-n`, x0 + (maxR * 9 + 6 + 50) / 2, y0 + 46, String(isi), 12, W.merah);
  const idLabel = `pb-${g}-n`;
  return { batangObj, kecilObj, idBatang, idKecil, label, idLabel };
}
export type Blok = ReturnType<typeof buatBlok>;

/* ------------------------------ Garis bilangan ------------------------------ */

/** Garis bilangan bertitik-titik `stops` (bilangan) berjarak sama; lompatan dari titik ke-i ke titik ke-(i + 1). */
export function buatGaris(stops: number[]) {
  const n = stops.length;
  const gap = 228 / (n - 1);
  const px = (i: number) => 36 + i * gap;
  const dasar = (): Obj[] => [garis("nl-ln", 18, 112, 264, 0, W.biru, 2)];
  const titik = (i: number): Obj[] => [garis(`nl-t${i}`, px(i), 106, 0, 12, W.biru, 2), teks(`nl-p${i}`, px(i), 134, String(stops[i]), 12, W.merah)];
  const lompat = (i: number): Obj[] => [panah(`nl-a${i}`, px(i) + 4, 98, gap - 8, 0, W.ungu, 2), teks(`nl-h${i}`, (px(i) + px(i + 1)) / 2, 88, `+${stops[i + 1] - stops[i]}`, 11, W.ungu)];
  const idTitik = (i: number): string[] => [`nl-t${i}`, `nl-p${i}`];
  const idLompat = (i: number): string[] => [`nl-a${i}`, `nl-h${i}`];
  return { stops, dasar, titik, lompat, idTitik, idLompat };
}
export type GarisBil = ReturnType<typeof buatGaris>;
