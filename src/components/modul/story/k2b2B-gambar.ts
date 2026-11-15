import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 2 Sub-Bab B (berbagai cara mengurangi sampai dua puluh):
 * jambu, jalur bilangan, kubus satuan dan batang puluhan (papan dan kotak penerima), tabel nilai tempat tiga baris, dan bagan pasangan bilangan.
 * Berkas ini TIDAK dipakai bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Jambu kelompok `{huruf}` nomor i: `j{huruf}{i}` (bulat). Garis pasangan `ps{i}` menghubungkan jambu ke-i baris atas dan bawah. Angka hitungan `jn{i}`.
 * - Jalur bilangan 0 sampai 20: garis `gb-g`, titik `gb-q{n}`, angka `gb-l{n}`. Lompatan `gb-h{i}` (panah), banyak langkah `gb-s{i}`, penanda awal `gb-awal` dan akhir `gb-akhir`. Rumus `rm`.
 * - Kubus satuan `bs{huruf}{j}` (10 x 10), batang puluhan `bp{huruf}{i}` (100 x 10) dan sekatnya `bq{huruf}{i}`. Papan milik tokoh di atas (y < 100), kotak penerima `pu-k` di bawah (y >= 106).
 * - Tabel tiga baris: sel `tk-r{r}c{c}` (c = 0 label, 1 puluhan, 2 satuan).
 * - Bagan pasangan `{h}u` (utuh), `{h}a` dan `{h}b` (bagian): kartu `{h}u-k` dan `{h}u-t`.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  biruKubus: "#93C5FD",
  jambuM: "#FDA4AF",
  jambuK: "#86EFAC",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai empat baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka atau kata besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/** Rumus besar di bawah (id `rm`). */
export const rumus = (isi: string, y = 192, u = 16): Obj => teks("rm", 150, y, isi, u, W.merah);

/* ------------------------------ Jambu ------------------------------ */

/** Satu jambu air (bulat), pusat (x, y). */
export const jambu = (k: string, i: number, x: number, y: number, warna: string = W.jambuM): Obj => ({ id: `j${k}${i}`, t: "bulat", x, y, r: 5, warna, garis: W.merah, tebal: 1 });
/** Letak jambu ke-i pada baris panjang (sampai delapan belas). */
export const xJ = (i: number): number => 22 + 14 * i;
export const jambuBaris = (k: string, dari: number, sampai: number, y: number, warna: string = W.jambuM): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => jambu(k, dari + q, xJ(dari + q), y, warna));
/** Letak jambu ke-i pada kisi sepuluh per baris (dua baris). */
export const titikG = (i: number): Titik => ({ x: 24 + 16 * (i % 10), y: 54 + 16 * Math.floor(i / 10) });
export const jambuKisi = (k: string, dari: number, sampai: number, warna: string = W.jambuM): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => jambu(k, dari + q, titikG(dari + q).x, titikG(dari + q).y, warna));
/** Letak jambu ke-j di kotak penerima. */
export const slotJambu = (j: number): Titik => ({ x: 24 + 16 * j, y: 128 });

/* ------------------------------ Kubus satuan dan batang puluhan ------------------------------ */

export const KUBUS = 10;
export const BATANG_P = 100;
export const BATANG_T = 10;
const SEKAT = Array.from({ length: 9 }, (_, i) => `M${(i + 1) * 10} 0 L${(i + 1) * 10} ${BATANG_T}`).join(" ");

export const kubus = (k: string, i: number, x: number, y: number, o: Opsi = {}): Obj => kotak(`bs${k}${i}`, x, y, KUBUS, KUBUS, W.biruKubus, W.biru, { rx: 1.5, tebal: 1.2, ...o });
export const batang = (k: string, i: number, x: number, y: number): Obj[] => [
  kotak(`bp${k}${i}`, x, y, BATANG_P, BATANG_T, W.oranye, W.biru, { rx: 1.5, tebal: 1.2 }),
  { id: `bq${k}${i}`, t: "jalur", x, y, d: SEKAT, garis: W.biru, tebal: 0.8 },
];
export const idBatang = (k: string, i: number): string[] => [`bp${k}${i}`, `bq${k}${i}`];

/** Papan milik tokoh: batang ke-i di atas, kubus ke-j di bawahnya (sepuluh per baris). */
export const posBatang = (i: number): Titik => ({ x: 14, y: 36 + 14 * i });
export const posKubus = (j: number): Titik => ({ x: 14 + 12 * (j % 10), y: 62 + 12 * Math.floor(j / 10) });
export const kubusP = (k: string, dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => kubus(k, dari + q, posKubus(dari + q).x, posKubus(dari + q).y));
export const batangP = (k: string, i: number): Obj[] => batang(k, i, posBatang(i).x, posBatang(i).y);

/** Kotak penerima di bawah papan: nama di pojok, benda di baris y = 126. */
export const kotakPenerima = (nama: string): Obj[] => [kotak("pu-k", 10, 106, 280, 40, W.lavender, W.biru, { rx: 6, tebal: 1.3 }), teks("pu-n", 16, 116, nama, 8.4, W.ungu, { anchor: "start" })];
export const slotBatang: Titik = { x: 24, y: 126 };
/** Letak kubus ke-j di kotak penerima; kubus bergeser ke kanan bila batang ikut ada di sana. */
export const slotKubus = (j: number, adaBatang: boolean): Titik => ({ x: (adaBatang ? 140 : 24) + 12 * j, y: 126 });

/* ------------------------------ Jalur bilangan 0 sampai 20 ------------------------------ */

export const GB = { x0: 14, dx: 13.5, y: 88 };
export const xG = (n: number): number => GB.x0 + GB.dx * n;

/** Garis, titik, dan angka jalur bilangan 0 sampai 20. */
export function jalurBilangan(): Obj[] {
  const out: Obj[] = [garis("gb-g", xG(0) - 5, GB.y, xG(20) - xG(0) + 10, 0, W.biru, 2)];
  for (let n = 0; n <= 20; n += 1) out.push(garis(`gb-q${n}`, xG(n), GB.y - 4, 0, 8, W.biru, 1.2), teks(`gb-l${n}`, xG(n), GB.y + 15, String(n), 7.8, W.biru));
  return out;
}
/** Lompatan nomor i dari bilangan `dari` ke bilangan `ke` (panah di atas garis). */
export const lompat = (i: number, dari: number, ke: number, warna: string = W.ungu): Obj => panah(`gb-h${i}`, xG(dari), GB.y - 10, xG(ke) - xG(dari), 0, warna, 1.8);
/** Banyak langkah lompatan nomor i, di atas panahnya. */
export const langkah = (i: number, dari: number, ke: number, isi: string): Obj => teks(`gb-s${i}`, (xG(dari) + xG(ke)) / 2, GB.y - 17, isi, 7.6, W.merah);
export const tandaAwal = (n: number): Obj => ({ id: "gb-awal", t: "bulat", x: xG(n), y: GB.y, r: 3.8, warna: W.merah, garis: W.biru, tebal: 1 });
export const tandaAkhir = (n: number): Obj => ({ id: "gb-akhir", t: "bulat", x: xG(n), y: GB.y, r: 3.8, warna: W.hijau, garis: W.biru, tebal: 1 });

/* ------------------------------ Tabel nilai tempat tiga baris ------------------------------ */

export const TK = { x: 30, y: 28, w0: 70, w1: 85, w2: 85, hh: 20, rh: 30 };
const kolX = (c: number): number => TK.x + (c === 0 ? 0 : c === 1 ? TK.w0 : TK.w0 + TK.w1);
const kolW = (c: number): number => (c === 0 ? TK.w0 : c === 1 ? TK.w1 : TK.w2);
const tengahX = (c: number): number => kolX(c) + kolW(c) / 2;
const tengahY = (r: number): number => TK.y + TK.hh + TK.rh * r + TK.rh / 2;

/** Kerangka tabel: kepala (Puluhan, Satuan) dan tiga baris kosong. */
export function tabelKurang(): Obj[] {
  const out: Obj[] = [];
  for (let c = 0; c < 3; c += 1) out.push(kotak(`tk-h${c}`, kolX(c), TK.y, kolW(c), TK.hh, W.lavender, W.biru, { rx: 2, tebal: 1.3 }));
  out.push(teks("tk-ht1", tengahX(1), TK.y + TK.hh / 2 + 3.4, "Puluhan", 9.6), teks("tk-ht2", tengahX(2), TK.y + TK.hh / 2 + 3.4, "Satuan", 9.6));
  for (let r = 0; r < 3; r += 1) for (let c = 0; c < 3; c += 1) out.push(kotak(`tk-r${r}c${c}-k`, kolX(c), TK.y + TK.hh + TK.rh * r, kolW(c), TK.rh, r === 2 ? W.hijauMuda : W.krem, W.biru, { rx: 2, tebal: 1.3 }));
  return out;
}
/** Isi sel tabel: c = 0 label baris, 1 puluhan, 2 satuan. */
export const sel = (r: number, c: number, isi: string, warna: string = W.merah): Obj => {
  const u = c === 0 ? 11 : 16;
  return teks(`tk-r${r}c${c}`, tengahX(c), tengahY(r) + u * 0.35, isi, u, c === 0 ? W.biru : warna);
};
export const idSel = (r: number, c: number): string => `tk-r${r}c${c}`;
export const idKotakSel = (r: number, c: number): string => `tk-r${r}c${c}-k`;

/* ------------------------------ Bagan pasangan bilangan ------------------------------ */

/** Bagan: bilangan utuh di atas (pusat cx, tinggi y), dua bagian di bawahnya. Id kartu `${h}u`, `${h}a`, `${h}b`; garis `${h}-ga` dan `${h}-gb`. */
export const bagan = (h: string, cx: number, y: number, utuh: string, a: string, b: string): Obj[] => [
  garis(`${h}-ga`, cx, y + 30, -35, 22, W.biru, 1.6),
  garis(`${h}-gb`, cx, y + 30, 35, 22, W.biru, 1.6),
  ...kartuAngka(`${h}u`, cx - 20, y, utuh, W.krem, 40, 30, 18),
  ...kartuAngka(`${h}a`, cx - 55, y + 52, a, W.langit, 40, 30, 18),
  ...kartuAngka(`${h}b`, cx + 15, y + 52, b, W.pink, 40, 30, 18),
];

/** Label bilangan di samping papan: id `n-{huruf}`. */
export const labelN = (k: string, x: number, y: number, isi: string, u = 16): Obj => teks(`n-${k}`, x, y, isi, u, W.merah);
