import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (pengukuran luas: satuan tidak baku, sentimeter persegi, baris kali kolom, meter persegi), awal cerita Kolam Renang Tirta Ceria.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: lantai tepi kolam berubin pucat dengan papan nama KOLAM RENANG TIRTA CERIA, petak satuan berderet dalam kisi, air kolam, papan kapur untuk video metode global.
 * Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, membawa tas kain),
 * Bu Sinta (bertopi putih, memegang papan jalan), Pak Anto (berkaus biru muda, membawa gelas ukur; kecil di kejauhan). Tanpa ZWJ, emoji paling tinggi U+1FA95.
 * Petak kisi bernama `id-c{i}` (i dari nol, urut baris demi baris) supaya uji bisa menghitung ulang banyak baris, banyak kolom, dan ukuran petak dari gambar.
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
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  oranye: "#F97316",
  tanya: "#F59E0B",
  lantai: "#E0F2FE",
  ubin: "#BAE6FD",
  ubinTua: "#0369A1",
  air: "#67E8F9",
  airTua: "#0E7490",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  sorot: "#FDE68A",
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
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  megafon: "\u{1F4E2}",
  renang: "\u{1F3CA}",
  tetes: "\u{1F4A7}",
  sikat: "\u{1F9F9}",
  keringat: "\u{1F613}",
  lampu: "\u{1F4A1}",
  tertawa: "\u{1F602}",
  kuat: "\u{1F4AA}",
  bicara: "\u{1F4AC}",
  roket: "\u{1F680}",
  penggaris: "\u{1F4CF}",
  kisi: "\u{1F533}",
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

/* ------------------------------ Lantai dan kolam ------------------------------ */
/** Lantai tepi kolam `${id}` dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Papan nama kayu: bingkai `${id}`, tulisan `${id}-s1` (KOLAM RENANG) dan `${id}-s2` (TIRTA CERIA). Pojok kiri-atas (x, y), lebar w. */
export function papanNama(id: string, x: number, y: number, w = 120): Obj[] {
  return [
    kotak(id, x, y, w, 34, "#FEF3C7", W.kayuTua, { rx: 4, tebal: 2, z: 1 }),
    teks(`${id}-s1`, bulatkan(x + w / 2), y + 14, "KOLAM RENANG", 8, W.ubinTua, { z: 2 }),
    teks(`${id}-s2`, bulatkan(x + w / 2), y + 27, "TIRTA CERIA", 8, W.coklat, { z: 2 }),
  ];
}
export const idPapanNama = (id: string): string[] => [id, `${id}-s1`, `${id}-s2`];

/** Air kolam: bidang `${id}` dan dua riak `${id}-r1`, `${id}-r2`. Pojok kiri-atas (x, y). */
export function air(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [
    kotak(id, x, y, w, h, W.air, W.airTua, { rx: 4, tebal: 1.6, z: 0 }),
    garis(`${id}-r1`, x + 8, bulatkan(y + h / 3), bulatkan(w * 0.3), 0, W.putih, 1.6, { z: 1 }),
    garis(`${id}-r2`, bulatkan(x + w * 0.45), bulatkan(y + (2 * h) / 3), bulatkan(w * 0.3), 0, W.putih, 1.6, { z: 1 }),
  ];
}

/* ------------------------------ Petak dalam kisi ------------------------------ */
/**
 * Kisi `b` baris dan `k` kolom petak bersisi s, pojok kiri-atas (x0, y0): `${id}-c{i}` (i dari nol, baris demi baris, kolom dari kiri).
 * Sungguh sebanyak b kali k petak, sama besar, rapat tanpa celah dan tanpa tumpang tindih.
 */
export function petak(id: string, x0: number, y0: number, b: number, k: number, s: number, warna: string = W.ubin, garisW: string = W.ubinTua, o: Opsi = {}): Obj[] {
  return Array.from({ length: b * k }, (_, i) => kotak(`${id}-c${i}`, bulatkan(x0 + (i % k) * s), bulatkan(y0 + Math.floor(i / k) * s), s, s, warna, garisW, { rx: 0, tebal: 1, z: 2, ...o }));
}
export const idPetak = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-c${i}`);
/** Nomor 1 sampai b kali k di tengah tiap petak: `${id}-m{i}`. Pusat petak ke-i dihitung dari pojok kisi. */
export function nomori(id: string, x0: number, y0: number, b: number, k: number, s: number, warna: string = W.biru): Obj[] {
  return Array.from({ length: b * k }, (_, i) => teks(`${id}-m${i}`, bulatkan(x0 + (i % k) * s + s / 2), bulatkan(y0 + Math.floor(i / k) * s + s / 2 + 3), String(i + 1), 8, warna, { z: 4 }));
}
export const idNomori = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-m${i}`);

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Sinta" | "Pak Anto";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, membawa kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro berkaus hijau `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl` dan membawa tas kain `${id}-ts`;
 * Bu Sinta bertopi putih `${id}-tp` dan memegang papan jalan `${id}-pj`; Pak Anto berkaus biru muda `${id}-bj` dan membawa gelas ukur `${id}-gu`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Anto" ? E.pak : E.bu;
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
  if (nama === "Bu Sinta") {
    out.push(kotak(`${id}-tp`, x - 13, bulatkan(y - u * 0.78), 26, 6, W.putih, "#64748B", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pj`, x + 11, bulatkan(y + 1), 10, 13, "#F8FAFC", "#475569", { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Anto") {
    out.push(baju("#38BDF8", "#0369A1", 12));
    out.push(kotak(`${id}-gu`, x + 11, bulatkan(y + 1), 7, 14, "#E0F2FE", "#0369A1", { rx: 1, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Anto" ? 18 : 15)), nama, nama === "Pak Anto" ? 7 : 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-k1`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Sinta" ? [`${id}-tp`, `${id}-pj`] : []),
  ...(nama === "Pak Anto" ? [`${id}-bj`, `${id}-gu`] : []),
];

/* ------------------------------ Papan kapur (video metode global) ------------------------------ */
export const K = { papan: "#14532D", kapur: "#FEF9C3", kapurMerah: "#FCA5A5", kapurBiru: "#BAE6FD" };

/** Papan tulis hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanTulis(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, K.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanTulis = (id: string): string[] => [id, `${id}-p`];
