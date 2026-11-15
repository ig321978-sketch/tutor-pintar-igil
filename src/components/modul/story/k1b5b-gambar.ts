import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 5 Sub-Bab B (menghitung maju dan mundur sampai dua puluh): tangga bilangan, garis bilangan,
 * kisi bilangan, ulat bilangan, bingkai sepuluh, dan kartu angka. Berkas ini TIDAK dipakai sub-bab atau bab lain.
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

/** Warna benda (isi bulatan dan bentuk). */
export const WB = { merah: "#F87171", kuning: "#FACC15", biru: "#60A5FA", hijau: "#4ADE80", ungu: "#A78BFA", pink: "#F9A8D4" };

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). Kotak `${id}-k`, teks `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka: satu bilangan di tengah kotak (`${id}-k`, `${id}-t0`). */
export const angka = (id: string, x: number, y: number, n: number | string, w = 26, h = 28, warna: string = W.langit, u = 13, o: Opsi = {}): Obj[] => kartu(id, x, y, w, h, warna, [String(n)], u, o);

export const cocok = (id: string, x: number, y: number, u = 16): Obj => emo(id, x, y, "\u{2705}", u);
export const tidakCocok = (id: string, x: number, y: number, u = 16): Obj => emo(id, x, y, "\u{274C}", u);

/** Panel berjudul: kotak `${id}-k` dan judul di bagian atas `${id}-t`; pojok kiri-atas (x, y). */
export const panel = (id: string, x: number, y: number, w: number, h: number, warna: string, label: string, u = 11): Obj[] => [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }), teks(`${id}-t`, x + w / 2, y + 16, label, u)];

/** Nampan dengan label di bagian atas: kotak `${id}`, label `${id}-t`. */
export const nampan = (id: string, x: number, y: number, w: number, h: number, label: string, warna: string = W.krem, u = 8.6): Obj[] => [
  kotak(id, x, y, w, h, warna, W.coklat, { rx: 6, tebal: 1.8 }),
  teks(`${id}-t`, x + w / 2, y + 12, label, u, W.coklat),
];

/* ------------------------------ Tangga bilangan ------------------------------ */

/** Enam anak tangga naik ke kanan: pusat anak tangga ke-i dan permukaannya. */
export const TG_N = 6;
export const tgX = (i: number): number => 15 + i * 45 + 22.5;
export const tgTop = (i: number): number => 150 - i * 20;
/** Anak tangga `${id}${i}` (kotak) dan angkanya `${id}t${i}`, bilangan awal `awal`; indeks `dari` sampai `sampai`. */
export function tangga(id: string, awal: number, dari = 0, sampai = TG_N - 1): Obj[] {
  const out: Obj[] = [];
  for (let i = dari; i <= sampai; i += 1) {
    out.push(kotak(`${id}${i}`, 15 + i * 45, tgTop(i), 45, 190 - tgTop(i), i % 2 === 0 ? W.hijauMuda : W.krem, W.coklat, { rx: 2, tebal: 1.6 }));
    out.push(teks(`${id}t${i}`, tgX(i), tgTop(i) + 17, String(awal + i), 13, W.biru));
  }
  return out;
}
/** Letak tokoh (emoji u = 24) di atas anak tangga ke-i. */
export const tokohDi = (i: number): { x: number; y: number } => ({ x: tgX(i), y: tgTop(i) - 3 });

/* ------------------------------ Garis bilangan ------------------------------ */

/** Letak bilangan `n` pada garis bilangan `dari` sampai `sampai`. */
export const glX = (n: number, dari = 10, sampai = 20): number => 24 + ((n - dari) * 252) / (sampai - dari);
/** Garis bilangan: garis `${id}-g`, tanda `${id}m{n}`, angka `${id}t{n}` (hanya bilangan yang lolos `tampil`). */
export function garisBilangan(id: string, dari: number, sampai: number, y: number, tampil: (n: number) => boolean = () => true): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, 14, y, 272, 0, W.biru, 2.4)];
  for (let n = dari; n <= sampai; n += 1) {
    out.push(garis(`${id}m${n}`, glX(n, dari, sampai), y - 5, 0, 10, W.biru, 1.6));
    if (tampil(n)) out.push(teks(`${id}t${n}`, glX(n, dari, sampai), y + 21, String(n), 9.6, W.biru));
  }
  return out;
}

/* ------------------------------ Kisi bilangan ------------------------------ */

/** Letak sel ke-n (1 sampai 20) pada kisi lima kolom empat baris. */
export const ksX = (n: number): number => 50 + ((n - 1) % 5) * 40;
export const ksY = (n: number): number => 36 + Math.floor((n - 1) / 5) * 38;
/** Sel kisi n: kotak `${id}k{n}` dan angka `${id}t{n}`; `isi` null berarti sel kosong (tanda tanya). */
export const selKisi = (id: string, n: number, isi: number | null = n, warna: string = W.langit): Obj[] => [
  kotak(`${id}k${n}`, ksX(n), ksY(n), 38, 32, isi === null ? W.krem : warna, W.biru, { rx: 5 }),
  teks(`${id}t${n}`, ksX(n) + 19, ksY(n) + 21, isi === null ? "?" : String(isi), 13, isi === null ? W.merah : W.biru),
];
export const kisiPenuh = (id: string, dari = 1, sampai = 20): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, i) => selKisi(id, dari + i)).flat();

/* ------------------------------ Bingkai sepuluh ------------------------------ */

/** Pusat sel ke-i (0 sampai 9) bingkai yang pojok kiri-atasnya (x, y): dua baris, lima kolom. */
export const sbX = (x: number, i: number): number => x + 8 + (i % 5) * 16;
export const sbY = (y: number, i: number): number => y + 8 + Math.floor(i / 5) * 16;
/** Bingkai kosong (kotak sel `${id}c{i}`). */
export const bingkai = (id: string, x: number, y: number): Obj[] => Array.from({ length: 10 }, (_, i) => kotak(`${id}c${i}`, x + (i % 5) * 16, y + Math.floor(i / 5) * 16, 16, 16, W.putih, W.biru, { rx: 1, tebal: 1.2 }));
/** Keping `${id}b{i}` untuk sel i dari `dari` sampai `sampai`. */
export const keping = (id: string, x: number, y: number, dari: number, sampai: number, warna: string): Obj[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, j) => bulat(`${id}b${dari + j}`, sbX(x, dari + j), sbY(y, dari + j), 5.4, warna, W.biru, { tebal: 1 }));

export type Titik = { x: number; y: number };
