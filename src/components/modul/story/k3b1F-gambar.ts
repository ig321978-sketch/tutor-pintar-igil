import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab F (Perkalian sampai 100).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - KELOMPOK SAMA BANYAK `kg`: kotak kelompok ke-g (dari 0) `kg-b${g}`; isinya `it-${g}-${j}` (j dari 0). Kelompok selalu muncul utuh bersama isinya.
 * - KELOMPOK TIDAK SAMA (hanya untuk perbandingan) `tg-b${g}` dan `tg-${g}-${j}`.
 * - SUSUNAN BARIS KOLOM `ar`: latar `ar-bg`, benda baris r kolom c `ar-${r}-${c}` (baris muncul utuh), nama `ar-nb` ("N baris") dan `ar-nk` ("N kolom").
 * - LOMPAT HITUNG `lj`: garis bilangan `lj-g`, tanda `lj-t${v}`, angka `lj-n${v}` (v = hasil lompat ke-k), lompatan ke-k (dari 1) `lj-p${k}` (jalur lengkung), nama `lj-s${k}` ("+n").
 * - RUMUS: `eq` = "a × b = c" yang harus cocok dengan gambar; `ps` = jumlah berulang "n + n + n (= c)"; `tk` = "a × b = c × d" (tukar tempat).
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

/* ------------------------------ Benda bergambar (emoji paling tinggi Emoji 12) ------------------------------ */
export const EMO = {
  kue: "\u{1F36A}",
  bunga: "\u{1F33C}",
  mobil: "\u{1F697}",
  apel: "\u{1F34E}",
  kelereng: "\u{1F535}",
  bintang: "\u{1F31F}",
  ikan: "\u{1F41F}",
  jeruk: "\u{1F34A}",
  balon: "\u{1F388}",
  stroberi: "\u{1F353}",
} as const;
export type Jenis = keyof typeof EMO;

/* ------------------------------ Kelompok sama banyak ------------------------------ */
export type Tata = { x: number; y: number; w: number; h: number };
export type TataKelompok = { sp: number; kol: number; bar: number; w: number; h: number; kotak: Tata[]; bawah: number };

/** Letak semua kotak kelompok: `banyak` kelompok, tiap kelompok berisi `isi` benda; mulai dari tinggi `y0`. */
export function tataKelompok(banyak: number, isi: number, y0 = 44): TataKelompok {
  const sp = isi <= 3 ? 22 : isi <= 5 ? 19 : 16;
  const kol = isi <= 5 ? isi : isi === 6 ? 3 : 4;
  const bar = Math.ceil(isi / kol);
  const w = kol * sp + 10;
  const h = bar * sp + 8;
  const maks = Math.max(1, Math.floor(300 / (w + 8)));
  const baris = Math.ceil(banyak / maks);
  const per = Math.ceil(banyak / baris);
  const kotakKel: Tata[] = [];
  for (let g = 0; g < banyak; g += 1) {
    const br = Math.floor(g / per);
    const q = g % per;
    const n = Math.min(per, banyak - br * per);
    const total = n * w + (n - 1) * 8;
    kotakKel.push({ x: (300 - total) / 2 + q * (w + 8), y: y0 + br * (h + 8), w, h });
  }
  return { sp, kol, bar, w, h, kotak: kotakKel, bawah: y0 + baris * (h + 8) - 8 };
}

/** Satu kelompok ke-g (dari 0) beserta isinya, dari susunan `banyak` kelompok berisi `isi` benda jenis `jenis`. */
export function kelompok(g: number, banyak: number, isi: number, jenis: Jenis, y0 = 44, warna: string = W.krem): Obj[] {
  const t = tataKelompok(banyak, isi, y0);
  const b = t.kotak[g];
  const objs: Obj[] = [kotak(`kg-b${g}`, b.x, b.y, b.w, b.h, warna, W.biru, { rx: 6, tebal: 1.6 })];
  for (let j = 0; j < isi; j += 1) {
    const r = Math.floor(j / t.kol);
    const c = j % t.kol;
    objs.push(emo(`it-${g}-${j}`, b.x + 5 + c * t.sp + t.sp / 2, b.y + 4 + r * t.sp + t.sp * 0.82, EMO[jenis], t.sp * 0.8));
  }
  return objs;
}
/** Semua kelompok dari ke-`dari` sampai sebelum ke-`sampai`. */
export const kelompokSemua = (banyak: number, isi: number, jenis: Jenis, y0 = 44, dari = 0, sampai = banyak): Obj[] =>
  Array.from({ length: Math.max(0, sampai - dari) }, (_, q) => kelompok(dari + q, banyak, isi, jenis, y0)).flat();
/** Id kotak kelompok dari ke-`dari` sampai sebelum `sampai`. */
export const idKotakKel = (dari: number, sampai: number): string[] => Array.from({ length: Math.max(0, sampai - dari) }, (_, q) => `kg-b${dari + q}`);
/** Id semua benda kelompok `banyak` x `isi` (kotak dan isi), mulai dari kelompok `dari`. */
export const idKelompok = (banyak: number, isi: number, dari = 0): string[] =>
  Array.from({ length: Math.max(0, banyak - dari) }, (_, q) => [`kg-b${dari + q}`, ...Array.from({ length: isi }, (_, j) => `it-${dari + q}-${j}`)]).flat();

/** Kelompok TIDAK sama banyak (perbandingan): `isiTiap` memuat isi tiap kelompok. Id `tg-b${g}` dan `tg-${g}-${j}`. */
export function kelompokTakSama(isiTiap: number[], jenis: Jenis, y0 = 52): Obj[] {
  const sp = 22;
  const w = 3 * sp + 10;
  const h = sp + 8;
  const total = isiTiap.length * w + (isiTiap.length - 1) * 10;
  const objs: Obj[] = [];
  isiTiap.forEach((n, g) => {
    const x = (300 - total) / 2 + g * (w + 10);
    objs.push(kotak(`tg-b${g}`, x, y0, w, h, W.merahMuda, W.biru, { rx: 6, tebal: 1.6 }));
    for (let j = 0; j < n; j += 1) objs.push(emo(`tg-${g}-${j}`, x + 5 + j * sp + sp / 2, y0 + 4 + sp * 0.82, EMO[jenis], sp * 0.8));
  });
  return objs;
}
export const idTakSama = (isiTiap: number[]): string[] => isiTiap.flatMap((n, g) => [`tg-b${g}`, ...Array.from({ length: n }, (_, j) => `tg-${g}-${j}`)]);

/* ------------------------------ Susunan baris kolom ------------------------------ */
export type TataSusunan = { sp: number; x0: number; y0: number };
export function tataSusunan(baris: number, kolom: number): TataSusunan {
  const sp = Math.min(24, Math.floor(100 / baris), Math.floor(190 / kolom));
  return { sp, x0: (300 - kolom * sp) / 2 + sp / 2, y0: 58 + sp * 0.82 };
}
/** Latar susunan (id `ar-bg`). */
export function latarSusunan(baris: number, kolom: number): Obj {
  const t = tataSusunan(baris, kolom);
  return kotak("ar-bg", t.x0 - t.sp / 2 - 5, 58 - 5, kolom * t.sp + 10, baris * t.sp + 10, W.krem, W.biru, { rx: 6, tebal: 1.6 });
}
/** Baris ke-r (dari 0) susunan `baris` x `kolom`, utuh sebanyak `kolom` benda. */
export function barisSusunan(r: number, baris: number, kolom: number, jenis: Jenis): Obj[] {
  const t = tataSusunan(baris, kolom);
  return Array.from({ length: kolom }, (_, c) => emo(`ar-${r}-${c}`, t.x0 + c * t.sp, t.y0 + r * t.sp, EMO[jenis], t.sp * 0.8));
}
export const susunanSemua = (baris: number, kolom: number, jenis: Jenis, dari = 0, sampai = baris): Obj[] =>
  Array.from({ length: Math.max(0, sampai - dari) }, (_, q) => barisSusunan(dari + q, baris, kolom, jenis)).flat();
export const idBarisSusunan = (r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => `ar-${r}-${c}`);
export const idSusunan = (baris: number, kolom: number): string[] => ["ar-bg", "ar-nb", "ar-nk", ...Array.from({ length: baris }, (_, r) => idBarisSusunan(r, kolom)).flat()];
/** Nama jumlah baris (di kiri susunan) dan jumlah kolom (di bawah susunan). */
export function namaBaris(baris: number, kolom: number): Obj {
  const t = tataSusunan(baris, kolom);
  return teks("ar-nb", t.x0 - t.sp / 2 - 9, 58 + (baris * t.sp) / 2 + 3, `${baris} baris`, 9, W.ungu, { anchor: "end" });
}
export function namaKolom(baris: number, kolom: number): Obj {
  const t = tataSusunan(baris, kolom);
  return teks("ar-nk", 150, 58 + baris * t.sp + 18, `${kolom} kolom`, 9, W.ungu);
}

/* ------------------------------ Lompat hitung ------------------------------ */
export type GarisLompat = {
  maks: number;
  x: (v: number) => number;
  y: number;
  kerangka: () => Obj[];
  tanda: (k: number) => Obj[];
  lompat: (k: number) => Obj[];
  idLompat: (k: number) => string[];
  idTanda: (k: number) => string[];
  idSemua: () => string[];
};
/** Garis bilangan untuk `banyak` lompatan sebesar `langkah`, dari nol; tanda hanya di titik mendarat. */
export function garisLompat(langkah: number, banyak: number, y = 130): GarisLompat {
  const maks = langkah * banyak;
  const x = (v: number): number => 22 + (v * 256) / maks;
  const tanda = (k: number): Obj[] => [garis(`lj-t${k * langkah}`, x(k * langkah), y - 5, 0, 10, W.biru, 2), teks(`lj-n${k * langkah}`, x(k * langkah), y + 20, String(k * langkah), 11, W.merah)];
  const kerangka = (): Obj[] => [garis("lj-g", 14, y, 272, 0, W.biru, 2.4), ...tanda(0)];
  const lompat = (k: number): Obj[] => {
    const a = x((k - 1) * langkah);
    const b = x(k * langkah);
    const lebar = b - a;
    const tinggi = Math.min(34, lebar * 0.55);
    return [
      { id: `lj-p${k}`, t: "jalur", x: a, y: y - 2, d: `M0 0 Q ${(lebar / 2).toFixed(1)} ${(-tinggi).toFixed(1)} ${lebar.toFixed(1)} 0`, garis: W.ungu, tebal: 2.4, gambar: true },
      teks(`lj-s${k}`, (a + b) / 2, y - 2 - tinggi * 0.5 - 4, `+${langkah}`, 9.5, W.ungu),
    ];
  };
  const idLompat = (k: number): string[] => [`lj-p${k}`, `lj-s${k}`];
  const idTanda = (k: number): string[] => [`lj-t${k * langkah}`, `lj-n${k * langkah}`];
  const idSemua = (): string[] => ["lj-g", ...Array.from({ length: banyak + 1 }, (_, k) => idTanda(k)).flat(), ...Array.from({ length: banyak }, (_, k) => idLompat(k + 1)).flat()];
  return { maks, x, y, kerangka, tanda, lompat, idLompat, idTanda, idSemua };
}

/* ------------------------------ Rumus ------------------------------ */
/** Rumus di tengah (id bebas): "a × b = c", jumlah berulang, atau tukar tempat. */
export const rumus = (id: string, y: number, isi: string, u = 14, warna: string = W.merah): Obj => teks(id, 150, y, isi, u, warna);
/** Jumlah berulang "n + n + ..." sebanyak `kali` suku; `hasil` bila ingin "= hasil". */
export const jumlahUlang = (n: number, kali: number, hasil = false): string => `${Array.from({ length: kali }, () => String(n)).join(" + ")}${hasil ? ` = ${n * kali}` : ""}`;
