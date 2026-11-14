import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab F (Pengurangan Bilangan Cacah sampai 1.000): tabel nilai tempat, balok ratusan-puluhan-satuan,
 * garis lompatan (hitung naik), batang sisa untuk soal cerita, dan kartu. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj).
 * Balok bernama `id-r{n}` (ratusan), `id-p{n}` (puluhan), `id-s{n}` (satuan) supaya uji bisa menghitung ulang banyak benda dari gambar.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  biruMuda: "#2B8FD0",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Satu baris tabel umum: id sel `${id}-s{kolom}` (kotak) dan `${id}-t{kolom}` (teks). */
export function barisTabel(id: string, x: number, y: number, kolW: number[], isi: string[], tinggi = 16, u = 8, kepala = false, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  let px = x;
  isi.forEach((sel, c) => {
    out.push(kotak(`${id}-s${c}`, px, y, kolW[c], tinggi, kepala ? W.krem : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
    if (sel) out.push(teks(`${id}-t${c}`, px + kolW[c] / 2, y + tinggi / 2 + u * 0.35, sel, u, kepala || c === 0 ? W.biru : W.hijau, o));
    px += kolW[c];
  });
  return out;
}

/* ------------------------------ Data dari Buku Siswa dan Panduan Guru ------------------------------ */

/** Ayo Mengamati hlm. 34: 265 buku dikurangi 132 buku yang dipinjam, sisa 133 (tanpa mengambil). */
export const AMATI = { buku: 265, pinjam: 132, sisa: 133 } as const;
/** hlm. 35: satu kali mengambil. */
export const SATU_KALI = { a: 241, b: 129, hasil: 112 } as const;
/** hlm. 36: dua kali mengambil (susun panjang). */
export const DUA_KALI = { a: 253, b: 176, hasil: 77 } as const;
/** hlm. 36: susun pendek dengan mengambil. */
export const PENDEK = { a: 241, b: 175, hasil: 66 } as const;
/** Stimulus Panduan Guru hlm. 55: 27 dikurangi 19. Hasil 8 adalah hitungan mandiri video (guru tidak menjawabnya di buku). */
export const STIMULUS = { a: 27, b: 19, hasil: 8, jawabanSiswa: 12 } as const;
/** Ayo Berlatih 1 a sampai d (hlm. 37; kunci Panduan Guru hlm. 56): [bilangan pertama, pengurang, hasil kunci]. */
export const LATIHAN_1: readonly (readonly [number, number, number])[] = [
  [633, 211, 422],
  [879, 436, 443],
  [522, 148, 374],
  [367, 289, 78],
];
/** Ayo Berlatih 2 a sampai d (hlm. 37-38; kunci Panduan Guru hlm. 57). */
export const LATIHAN_2: readonly (readonly [number, number, number])[] = [
  [573, 268, 305],
  [422, 146, 276],
  [623, 292, 331],
  [344, 279, 65],
];
/** Ayo Berlatih 3 a sampai e (hlm. 38; kunci Panduan Guru hlm. 57). */
export const LATIHAN_3: readonly (readonly [number, number, number])[] = [
  [455, 328, 127],
  [832, 622, 210],
  [712, 89, 623],
  [600, 235, 365],
  [505, 77, 428],
];
/** Ayo Berlatih 4 (hlm. 38; kunci Panduan Guru hlm. 58): soal a sampai e dan jawaban yang ditarik. Soal c: 398 dikurangi 291 dikurangi 66. */
export const LATIHAN_4 = {
  soal: ["689 − 233", "912 − 67", "398 − 291 − 66", "720 − 89", "300 − 34"],
  jawabanKolom: [845, 266, 456, 41, 631],
  garis: [456, 845, 41, 631, 266],
} as const;
/** Ayo Berlatih 5 a sampai d (hlm. 39; kunci Panduan Guru hlm. 58-59): [total, bagian diambil, sisa kunci]. */
export const CERITA: readonly (readonly [number, number, number])[] = [
  [333, 129, 204],
  [765, 179, 586],
  [427, 218, 209],
  [128, 79, 49],
];

/* ------------------------------ Tabel nilai tempat ------------------------------ */

export const WARNA_KOLOM = [W.langit, W.hijauMuda, W.merahMuda] as const;
const NAMA_KOLOM = ["Ratusan", "Puluhan", "Satuan"] as const;

/** Baris kepala tabel nilai tempat: sel `${id}-s{kolom}`, teks `${id}-t{kolom}`. Pojok kiri-atas (x, y). */
export function kepalaNT(id: string, x: number, y: number, cw = 44, rh = 15, u = 7.4, o: Opsi = {}): Obj[] {
  return NAMA_KOLOM.flatMap((n, c) => [kotak(`${id}-s${c}`, x + c * cw, y, cw, rh, W.abu, W.biru, { rx: 0, tebal: 1, ...o }), teks(`${id}-t${c}`, x + c * cw + cw / 2, y + rh / 2 + u * 0.35, n, u, W.biru, o)]);
}

/** Satu baris angka tabel nilai tempat (tiga sel berwarna per kolom). Isi kosong tetap menggambar selnya. */
export function barisNT(id: string, x: number, y: number, isi: readonly string[], cw = 44, rh = 18, u = 10, warnaTeks: string = W.biru, o: Opsi = {}): Obj[] {
  return isi.flatMap((s, c) => [kotak(`${id}-s${c}`, x + c * cw, y, cw, rh, WARNA_KOLOM[c], W.biru, { rx: 0, tebal: 1, ...o }), ...(s ? [teks(`${id}-t${c}`, x + c * cw + cw / 2, y + rh / 2 + u * 0.35, s, u, warnaTeks, o)] : [])]);
}

/** Angka kecil penanda mengambil di atas kolom (merah). Teks `${id}-m{kolom}`; kolom kosong dilewati. */
export function tandaAmbil(id: string, x: number, y: number, isi: readonly string[], cw = 44, u = 9, o: Opsi = {}): Obj[] {
  return isi.flatMap((s, c) => (s ? [teks(`${id}-m${c}`, x + c * cw + cw / 2, y, s, u, W.merah, o)] : []));
}

/** Tabel nilai tempat utuh: kepala `${id}h`, baris `${id}r{i}`. Garis pengurangan dengan tanda minus di kanan baris kedua. Pojok kiri-atas (x, y). */
export function tabelNT(id: string, x: number, y: number, baris: readonly (readonly string[])[], cw = 44, rh = 18, u = 10, o: Opsi = {}): Obj[] {
  const out = kepalaNT(`${id}h`, x, y, cw, 15, 7.4, o);
  baris.forEach((b, i) => out.push(...barisNT(`${id}r${i}`, x, y + 15 + i * rh, b, cw, rh, u, i === baris.length - 1 && baris.length >= 3 ? W.hijau : W.biru, o)));
  if (baris.length >= 3) out.push(teks(`${id}-min`, x + 3 * cw + 7, y + 15 + 2 * rh - 2, "−", 12, W.biru, o));
  return out;
}

/** Digit [ratusan, puluhan, satuan] bilangan sampai 999. */
export const digit3 = (n: number): [number, number, number] => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];

/**
 * Angka penanda mengambil gaya kunci Panduan Guru hlm. 57: nilai efektif tiap kolom setelah mengambil (sisa setelah dipinjam, atau tambah sepuluh), kosong bila kolom tidak berubah.
 * Contoh 573 − 268: ["", "6", "13"]; 422 − 146: ["3", "11", "12"].
 */
export function tandaPendek(a: number, b: number): string[] {
  const asal = digit3(a);
  const bd = digit3(b);
  const e = [...asal];
  for (let i = 2; i >= 1; i -= 1) {
    if (e[i] < bd[i]) {
      e[i] += 10;
      e[i - 1] -= 1;
    }
  }
  return e.map((v, i) => (v !== asal[i] ? String(v) : ""));
}

/** Satu sel hasil yang diisi kemudian: teks `${id}-t${kolom}` pada baris `barisNT(id, x, y, ..., cw, rh, u)`. */
export const isiSel = (id: string, x: number, y: number, kolom: number, isi: string, cw = 44, rh = 18, u = 10, warna: string = W.hijau, o: Opsi = {}): Obj => teks(`${id}-t${kolom}`, x + kolom * cw + cw / 2, y + rh / 2 + u * 0.35, isi, u, warna, o);

/**
 * Tabel susun pendek satu soal pengurangan: kepala `${id}h`, baris `${id}r0` (bilangan pertama), `${id}r1` (pengurang), `${id}r2` (hasil, kosong dulu), tanda minus `${id}-min`.
 * `tanda(kolom)` penanda mengambil (teks `${id}m-m{kolom}`), `hasil(kolom)` isi sel hasil, `persamaan(y)` kalimat penuh. Pojok kiri-atas tabel (x, y); penanda di atasnya.
 */
export function soalNT(id: string, a: number, b: number, x = 84, y = 50) {
  const da = digit3(a).map(String);
  const db = digit3(b).map(String);
  const dh = digit3(a - b).map(String);
  const dasar = [...kepalaNT(`${id}h`, x, y, 44, 15, 7.4), ...barisNT(`${id}r0`, x, y + 15, da, 44, 22, 12), ...barisNT(`${id}r1`, x, y + 37, db, 44, 22, 12), ...barisNT(`${id}r2`, x, y + 59, ["", "", ""], 44, 22, 12), teks(`${id}-min`, x + 3 * 44 + 9, y + 55, "−", 16, W.biru)];
  const tanda = tandaAmbil(`${id}m`, x, y - 5, tandaPendek(a, b), 44, 11);
  return {
    dasar,
    tanda: (c: number) => tanda.filter((o) => o.id === `${id}m-m${c}`),
    hasil: (c: number) => isiSel(`${id}r2`, x, y + 59, c, dh[c], 44, 22, 12),
    persamaan: (yy = 160) => teks(`${id}-eq`, 150, yy, `${a} − ${b} = ${a - b}`, 13, W.hijau),
  };
}

/* ------------------------------ Balok nilai tempat ------------------------------ */

/**
 * Balok: `rat` ratusan (kotak 20), `pul` puluhan (batang 5 kali 20), `sat` satuan (kotak 5), diskalakan `s`. Pojok kiri-atas (x, y).
 * Ratusan di x, puluhan di x + 56 s, satuan di x + 124 s (lima per baris). Id `${id}-r{i}`, `${id}-p{i}`, `${id}-s{i}`.
 */
export function blok(id: string, x: number, y: number, rat: number, pul: number, sat: number, s = 1, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < rat; i += 1) out.push(kotak(`${id}-r${i}`, x + i * 24 * s, y, 20 * s, 20 * s, W.langit, W.biru, { rx: 1, tebal: 1.2, ...o }));
  for (let i = 0; i < pul; i += 1) out.push(kotak(`${id}-p${i}`, x + 56 * s + i * 7 * s, y, 5 * s, 20 * s, W.hijauMuda, W.hijau, { rx: 1, tebal: 1, ...o }));
  for (let i = 0; i < sat; i += 1) out.push(kotak(`${id}-s${i}`, x + 124 * s + (i % 5) * 7 * s, y + Math.floor(i / 5) * 7 * s, 5 * s, 5 * s, W.merahMuda, W.merah, { rx: 1, tebal: 1, ...o }));
  return out;
}

/** Id balok ratusan, puluhan, atau satuan nomor `dari` sampai `sampai` (tidak termasuk). */
export const idBlok = (id: string, jenis: "r" | "p" | "s", dari: number, sampai: number): string[] => Array.from({ length: Math.max(0, sampai - dari) }, (_, i) => `${id}-${jenis}${dari + i}`);

/* ------------------------------ Garis lompatan (hitung naik) ------------------------------ */

/**
 * Garis lompatan tidak berskala: titik `stops` berjarak sama pada garis dari (x, y) sepanjang `panjang`; panah lompat di atas garis dengan label selisih.
 * Id: `${id}-g` (garis), `${id}-k{i}` (tanda), `${id}-n{i}` (angka titik di bawah), `${id}-a{i}` (panah), `${id}-j{i}` (label lompat "+selisih").
 */
export function garisLompat(id: string, x: number, y: number, panjang: number, stops: readonly number[], warna: string = W.merah, o: Opsi = {}): Obj[] {
  const langkah = panjang / (stops.length - 1);
  const out: Obj[] = [garis(`${id}-g`, x, y, panjang, 0, W.biru, 2, o)];
  stops.forEach((v, i) => {
    out.push(garis(`${id}-k${i}`, x + i * langkah, y - 4, 0, 8, W.biru, 2, o), teks(`${id}-n${i}`, x + i * langkah, y + 17, String(v), 9.4, W.biru, o));
    if (i > 0) {
      out.push(panah(`${id}-a${i - 1}`, x + (i - 1) * langkah + 2, y - 6, langkah - 4, 0, warna, 2, o));
      out.push(teks(`${id}-j${i - 1}`, x + (i - 0.5) * langkah, y - 12, `+${v - stops[i - 1]}`, 9.4, warna, o));
    }
  });
  return out;
}

/* ------------------------------ Batang sisa (soal cerita) ------------------------------ */

/** Batang sepanjang `w` mewakili `total`; bagian kiri `bagian` (diambil) berwarna merah muda, sisanya hijau muda. Id `${id}-p` (bagian), `${id}-s` (sisa), `${id}-t` (rangka). */
export function batangSisa(id: string, x: number, y: number, w: number, h: number, total: number, bagian: number, o: Opsi = {}): Obj[] {
  const lb = (w * bagian) / total;
  return [kotak(`${id}-p`, x, y, lb, h, W.merahMuda, W.biru, { rx: 0, tebal: 1.4, ...o }), kotak(`${id}-s`, x + lb, y, w - lb, h, W.hijauMuda, W.biru, { rx: 0, tebal: 1.4, ...o }), kotak(`${id}-t`, x, y, w, h, "none", W.biru, { rx: 0, tebal: 2, ...o })];
}
