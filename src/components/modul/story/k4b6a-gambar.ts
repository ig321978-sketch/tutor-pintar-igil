import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini" (piktogram skala satu dan lebih dari satu), awal cerita Bazar Kuliner Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: halaman sekolah yang ramai bazar: tenda jajanan berawning merah-putih dengan untaian lampu, papan data hijau tua berbingkai kayu dengan deret ikon jajanan (emoji lama),
 * keterangan di pojok papan, tumpukan piring bersabun, kertas berpetak, dan penggaris panjang. Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku),
 * Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, membawa tas kain), Bu Rini (berapron merah, membawa nampan), Pak Dodi (berkalung tanda pengenal, membawa penggaris panjang).
 * Tanpa ZWJ, emoji paling tinggi U+1FA95. Deret ikon digambar SUNGGUH sebanyak data (banyak data dibagi keterangan), jadi uji bisa menghitung ulang.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  hijauTua: "#166534",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF3C7",
  oranye: "#EA580C",
  halaman: "#FEF9C3",
  halamanTua: "#FDE68A",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  sorot: "#FDE68A",
  papan: "#14532D",
  kapur: "#FEF9C3",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  megafon: "\u{1F4E2}",
  tertawa: "\u{1F602}",
  kuat: "\u{1F4AA}",
  bicara: "\u{1F4AC}",
  matahari: "\u{1F305}",
  lampu: "\u{1F4A1}",
  risoles: "\u{1F950}",
  pisang: "\u{1F34C}",
  lemper: "\u{1F359}",
  cincau: "\u{1F964}",
  bakso: "\u{1F362}",
  soto: "\u{1F35C}",
  mie: "\u{1F35D}",
  sabun: "\u{1F9FC}",
  penggaris: "\u{1F4CF}",
  bintang: "\u{2B50}",
} as const;

type Opsi = Partial<Obj>;
export const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.hijauTua): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Halaman sekolah dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.halaman, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Deret ikon: `n` emoji berjajar mulai dari tengah (x, y) dengan jarak `gap`. Id `${id}${i}`. Digambar sungguh sebanyak n. */
export const deret = (id: string, x: number, y: number, e: string, n: number, gap = 17, u = 15, o: Opsi = {}): Obj[] => Array.from({ length: n }, (_, i) => emo(`${id}${i}`, bulatkan(x + i * gap), y, e, u, { z: 3, ...o }));
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Tenda jajanan: awning enam lajur merah-putih `${id}-a0..a5`, atap `${id}-at`, dua tiang `${id}-tl` dan `${id}-tr`, dan meja `${id}-mj`. Pojok kiri-atas (x, y), lebar w. */
export function tenda(id: string, x: number, y: number, w: number, tinggi = 70): Obj[] {
  const lajur = w / 6;
  return [
    ...Array.from({ length: 6 }, (_, i) => kotak(`${id}-a${i}`, bulatkan(x + i * lajur), y, bulatkan(lajur), 14, i % 2 === 0 ? W.merah : W.putih, "#991B1B", { rx: 0, tebal: 1, z: 1 })),
    garis(`${id}-tl`, x + 3, y + 14, 0, tinggi - 14, W.kayuTua, 3, { z: 0 }),
    garis(`${id}-tr`, x + w - 3, y + 14, 0, tinggi - 14, W.kayuTua, 3, { z: 0 }),
    kotak(`${id}-mj`, x - 2, y + tinggi - 12, w + 4, 12, W.kayu, W.kayuTua, { rx: 2, tebal: 1.4, z: 1 }),
  ];
}
export const idTenda = (id: string): string[] => [...Array.from({ length: 6 }, (_, i) => `${id}-a${i}`), `${id}-tl`, `${id}-tr`, `${id}-mj`];

/** Untaian lampu bohlam kuning: `n` bulat kecil di antara x1 dan x2 pada tinggi y. Id `${id}${i}`. */
export const lampuBohlam = (id: string, x1: number, x2: number, y: number, n: number): Obj[] =>
  Array.from({ length: n }, (_, i) => bulat(`${id}${i}`, bulatkan(x1 + (n === 1 ? 0 : (i * (x2 - x1)) / (n - 1))), y, 2.8, "#FDE047", "#CA8A04", { tebal: 0.9, z: 4 }));
export const idLampu = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Papan data hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanData(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 4, y + 4, w - 8, h - 8, W.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanData = (id: string): string[] => [id, `${id}-p`];

/** Piring putih bersabun: piring `${id}`. */
export const piring = (id: string, x: number, y: number, r = 8): Obj => bulat(id, x, y, r, W.putih, "#94A3B8", { tebal: 1.2, z: 2 });
/** Gelembung sabun: `n` bulat putih kecil. Id `${id}${i}`. */
export const busa = (id: string, x: number, y: number, n: number): Obj[] => Array.from({ length: n }, (_, i) => bulat(`${id}${i}`, bulatkan(x + (i % 3) * 5), bulatkan(y - Math.floor(i / 3) * 5), 2.6, "#E0F2FE", "#38BDF8", { tebal: 0.8, z: 6 }));
export const idBusa = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Kertas berpetak: kertas `${id}`, tiga garis tegak `${id}-v0..2` dan tiga garis datar `${id}-h0..2`. Pojok kiri-atas (x, y). */
export function kertasPetak(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [
    kotak(id, x, y, w, h, W.putih, "#16A34A", { rx: 2, tebal: 1.6, z: 1 }),
    ...[1, 2, 3].map((i) => garis(`${id}-v${i - 1}`, bulatkan(x + (w * i) / 4), y, 0, h, "#BBF7D0", 1, { z: 2 })),
    ...[1, 2, 3].map((i) => garis(`${id}-h${i - 1}`, x, bulatkan(y + (h * i) / 4), w, 0, "#BBF7D0", 1, { z: 2 })),
  ];
}
export const idKertasPetak = (id: string): string[] => [id, ...[0, 1, 2].map((i) => `${id}-v${i}`), ...[0, 1, 2].map((i) => `${id}-h${i}`)];

/** Penggaris panjang kuning bergaris skala: badan `${id}` dan tujuh garis kecil `${id}-t0..6`. Pojok kiri-atas (x, y), lebar w. */
export function penggaris(id: string, x: number, y: number, w: number): Obj[] {
  return [kotak(id, x, y, w, 9, "#FDE68A", W.kayuTua, { rx: 1, tebal: 1, z: 6 }), ...Array.from({ length: 7 }, (_, i) => garis(`${id}-t${i}`, bulatkan(x + 6 + (i * (w - 12)) / 6), y, 0, 4, W.kayuTua, 1, { z: 7 }))];
}
export const idPenggaris = (id: string): string[] => [id, ...Array.from({ length: 7 }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Rini" | "Pak Dodi";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, membawa kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro berkaus hijau `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl` dan membawa tas kain `${id}-ts`;
 * Bu Rini berapron merah `${id}-ap` dan membawa nampan `${id}-np`; Pak Dodi berkaus abu `${id}-bj`, berkalung tanda pengenal `${id}-tg`, dan membawa penggaris panjang `${id}-pg`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Dodi" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Laras") {
    out.push(garis(`${id}-ka`, x - 8, bulatkan(y - u * 0.28), 16, 0, "#1F2937", 1.6, { z: 2 }));
    out.push(bulat(`${id}-k1`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Genta") out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.78), 16, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Hendro") {
    out.push(baju("#15803D", "#14532D", 12));
    out.push(kotak(`${id}-tp`, x - 14, bulatkan(y - u * 0.78), 28, 6, "#FDE68A", "#92400E", { rx: 3, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 4, bulatkan(y + 4), 2.2, "#F59E0B", "#92400E", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-ts`, x - 19, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Rini") {
    out.push(kotak(`${id}-ap`, x - 11, bulatkan(y + 2), 22, 12, "#DC2626", "#7F1D1D", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(kotak(`${id}-np`, x + 11, bulatkan(y + 4), 14, 4, "#CBD5E1", "#475569", { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Dodi") {
    out.push(baju("#94A3B8", "#475569", 12));
    out.push(kotak(`${id}-tg`, x - 4, bulatkan(y + 4), 8, 6, "#FFFFFF", "#1C01A5", { rx: 1, tebal: 0.9, z: 2 }));
    out.push(kotak(`${id}-pg`, x + 12, bulatkan(y - 2), 3, 16, "#FDE68A", W.kayuTua, { rx: 0.5, tebal: 0.9, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Bu Rini" || nama === "Pak Dodi" ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-k1`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Rini" ? [`${id}-ap`, `${id}-np`] : []),
  ...(nama === "Pak Dodi" ? [`${id}-bj`, `${id}-tg`, `${id}-pg`] : []),
];

/** Satu baris piktogram di papan data: nama `${id}-n` (kapur) dan deret ikon `${id}0..` sungguh sebanyak n. y = garis dasar baris. */
export const barisPapan = (id: string, y: number, nama: string, e: string, n: number, xIkon = 150, gap = 17, u = 14, xNama = 118): Obj[] => [
  teks(`${id}-n`, xNama, y, nama, 8, W.kapur, { z: 3 }),
  ...deret(id, xIkon, y, e, n, gap, u),
];
export const idBarisPapan = (id: string, n: number): string[] => [`${id}-n`, ...idDeret(id, n)];
