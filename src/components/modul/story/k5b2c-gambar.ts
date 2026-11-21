import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati" (faktor: bagi tanpa sisa, pasangan faktor, cek bagi). Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: meja klepon di pasar malam: baki berisi klepon yang digambar SUNGGUH sebanyak yang diucapkan (id berurut `${awalan}${i}`), piring bulat, pita petak yang dipotong sama panjang,
 * kartu faktor, parutan kelapa. Tokoh: Bima (kaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara),
 * Bu Wati (bercaping, berbaju hijau, membawa baki), Pak Joko (berjaket biru, memeluk kotak kardus). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  lantai: "#E7E5E4",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  sorot: "#FDE68A",
  langit: "#DBEAFE",
  daun: "#DCFCE7",
  pink: "#FCE7F3",
  kapur: "#FEF9C3",
  klepon: "#86EFAC",
  teal: "#99F6E4",
  hijauMuda: "#BBF7D0",
};

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F602}",
  pegal: "\u{1F613}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  klepon: "\u{1F361}",
  kelapa: "\u{1F334}",
  lampion: "\u{1F3EE}",
  hadiah: "\u{1F381}",
  uap: "\u{1F4A8}",
  gunting: "\u{2702}\u{FE0F}",
  cari: "\u{1F50D}",
  rantai: "\u{1F517}",
  catat: "\u{1F4DD}",
  bintang: "\u{2B50}",
  pasir: "\u{23F3}",
  jam: "\u{1F552}",
  megafon: "\u{1F4E2}",
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

/** Lantai pasar dari tinggi y sampai bawah kanvas. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Klepon beremoji: `n` klepon berbaris `per` tiap baris, klepon pertama berpusat di (x, y). Id `${id}${i}` (digambar SUNGGUH sebanyak n). */
export function deretKlepon(id: string, x: number, y: number, n: number, per: number, gx = 15, gy = 15, u = 13): Obj[] {
  return Array.from({ length: n }, (_, i) => emo(`${id}${i}`, bulatkan(x + (i % per) * gx), bulatkan(y + Math.floor(i / per) * gy), E.klepon, u, { z: 3 }));
}
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Onde-onde bulat hijau: `n` butir berbaris `per` tiap baris. Id `${id}${i}`. */
export function deretOnde(id: string, x: number, y: number, n: number, per: number, gx = 12, gy = 12, r = 5): Obj[] {
  return Array.from({ length: n }, (_, i) => bulat(`${id}${i}`, bulatkan(x + (i % per) * gx), bulatkan(y + Math.floor(i / per) * gy), r, W.klepon, W.hijauTua, { tebal: 1, z: 3 }));
}

/** Piring bulat kosong berpusat di (x, y) berjari-jari r. */
export const piring = (id: string, x: number, y: number, r = 15): Obj => bulat(id, x, y, r, W.putih, W.hijauTua, { tebal: 1.8, z: 1 });
/** Baki: kotak krem berpinggir coklat. */
export const baki = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, W.krem, W.coklat, { rx: 6, tebal: 2, z: 1 });

/** Pita petak: `n` petak, tiap petak `cw` lebar dan 14 tinggi, petak pertama di (x, y). Bila `g` > 0 bagian sepanjang g berwarna bergantian dan sisa berwarna abu. Id `${id}${i}`. */
export function pita(id: string, x: number, y: number, n: number, cw: number, g = 0): Obj[] {
  const penuh = g > 0 ? Math.floor(n / g) * g : n;
  const warna = [W.teal, W.sorot, W.langit, W.pink];
  return Array.from({ length: n }, (_, i) => {
    const grup = g > 0 ? Math.floor(i / g) : 0;
    const sisa = i >= penuh;
    return kotak(`${id}${i}`, bulatkan(x + i * cw), y, bulatkan(cw - 1.5), 14, sisa ? "#E5E7EB" : g > 0 ? warna[grup % warna.length] : W.teal, sisa ? "#6B7280" : W.hijauTua, { rx: 1.5, tebal: 1, z: 2, ...(sisa ? { putus: true } : {}) });
  });
}
export const idPita = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Kartu: kotak `${id}-k` dan teks `${id}-t` di tengahnya. */
export const kartu = (id: string, x: number, y: number, w: number, h: number, warna: string, isi: string, u = 9, warnaTeks: string = W.biru): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.4, z: 1 }),
  teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, warnaTeks, { z: 3 }),
];
export const idKartu = (id: string): string[] => [`${id}-k`, `${id}-t`];

/** Parutan kelapa: papan abu bergaris miring `${id}-k` dan tiga garis. */
export const parutan = (id: string, x: number, y: number): Obj[] => [
  kotak(`${id}-k`, x, y, 36, 22, "#CBD5E1", "#475569", { rx: 2, tebal: 1.4, z: 2 }),
  garis(`${id}-a`, x + 8, y + 3, 4, 16, "#475569", 1.2, { z: 3 }),
  garis(`${id}-b`, x + 18, y + 3, 4, 16, "#475569", 1.2, { z: 3 }),
  garis(`${id}-c`, x + 28, y + 3, 4, 16, "#475569", 1.2, { z: 3 }),
];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Bu Wati" | "Pak Joko";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`;
 * Citra berkucir dua `${id}-k1`, `${id}-k2`; Fajar bertopi suporter `${id}-tp`; Pak Arif berompi oranye `${id}-bj` dan berpengeras suara `${id}-mg`;
 * Bu Wati bercaping `${id}-cp`, berbaju hijau `${id}-bj`, membawa baki `${id}-bk`; Pak Joko berjaket biru `${id}-bj` dan memeluk kardus `${id}-kd`.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tidak menimpa tepi bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Pak Arif" || nama === "Pak Joko" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 10): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Bima") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 1), 9, 12, "#FDE68A", "#92400E", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Citra") {
    out.push(bulat(`${id}-k1`, x - 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Fajar") out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.78), 18, 6, "#DC2626", "#7F1D1D", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Arif") {
    out.push(baju("#EA580C", "#7C2D12", 12));
    out.push(kotak(`${id}-mg`, x + 12, bulatkan(y + 2), 8, 7, "#94A3B8", "#475569", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Wati") {
    out.push(baju("#16A34A", "#14532D", 12));
    out.push(kotak(`${id}-cp`, x - 14, bulatkan(y - u * 0.82), 28, 5, "#FDE68A", "#B45309", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-bk`, x + 12, bulatkan(y + 5), 12, 7, "#FEF3C7", "#92400E", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(kotak(`${id}-kd`, x + 11, bulatkan(y + 3), 12, 10, "#D6A25E", "#7C4A12", { rx: 1, tebal: 0.9, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Arif" || nama === "Bu Wati" || nama === "Pak Joko" ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-mg`] : []),
  ...(nama === "Bu Wati" ? [`${id}-bj`, `${id}-cp`, `${id}-bk`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-kd`] : []),
];
