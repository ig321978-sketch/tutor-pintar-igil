import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar" (pecahan yang sama besar), cerita Sanggar Batik Kampung Mekar.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: serambi sanggar berlantai kayu, meja jahit bermesin, gulungan benang, potongan kain berbagi bagian sama besar (bagian berarsir sungguh sebanyak pembilang dari penyebut),
 * pecahan bertingkat (pembilang, garis, penyebut), baju bertumpuk dan kotak kancing, papan tulis hijau tua. Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku),
 * Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, membawa tas kain), Kak Sekar (berpita merah, meteran di leher), Pak Bagas (bertopi, memanggul gulungan kain). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  kain: "#FFF7ED",
  arsir: "#F472B6",
  arsirTua: "#BE185D",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  tawa: "\u{1F604}",
  cemberut: "\u{1F620}",
  meringis: "\u{1F623}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  pensil: "\u{270F}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  tunjuk: "\u{1F446}",
  mata: "\u{1F440}",
  baju: "\u{1F455}",
  benang: "\u{1F9F5}",
  gunting: "\u{2702}",
  meteran: "\u{1F4CF}",
  bintang: "\u{2B50}",
  lampu: "\u{1F4A1}",
  ulang: "\u{1F501}",
  keringat: "\u{1F613}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Bentuk tertutup dari titik-titik absolut. */
export const poligon = (id: string, titik: [number, number][], warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => {
  const [x0, y0] = titik[0];
  const d = `M0 0 ${titik
    .slice(1)
    .map(([a, b]) => `L${bulatkan(a - x0)} ${bulatkan(b - y0)}`)
    .join(" ")} Z`;
  return { id, t: "jalur", x: x0, y: y0, d, warna, garis: garisW, tebal: 1.6, ...o };
};
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/* ------------------------------ Pecahan: kain berbagi bagian dan pecahan bertingkat ------------------------------ */
/**
 * Potongan kain `${id}-c{i}` sebanyak `q` bagian sama besar dari lebar `w`; `arsir` bagian pertama dari kiri diwarnai (sungguh sebanyak pembilang).
 * Pojok kiri-atas (x, y), tinggi h. Pembagi lebar memakai selisih posisi bulat supaya bagian tetap sama besar.
 */
export function kainBar(id: string, x: number, y: number, w: number, h: number, q: number, arsir: number, warna: string = W.arsir, o: Opsi = {}): Obj[] {
  return Array.from({ length: q }, (_, i) => {
    const kiri = bulatkan(x + (i * w) / q);
    const lebar = bulatkan(w / q);
    return kotak(`${id}-c${i}`, kiri, y, lebar, h, i < arsir ? warna : W.kain, W.arsirTua, { rx: 0, tebal: 1.1, z: 1, ...o });
  });
}
export const idKain = (id: string, q: number): string[] => Array.from({ length: q }, (_, i) => `${id}-c${i}`);
/** Banyak bagian berarsir pada keadaan gambar (untuk uji). */
export const BANYAK_ARSIR = (objs: Obj[], id: string, q: number): number => idKain(id, q).filter((n) => objs.find((o) => o.id === n)?.warna === W.arsir).length;

/** Pecahan bertingkat: pembilang `${id}-p`, garis `${id}-g`, penyebut `${id}-q`. Titik tengah garis (x, y); u ukuran angka. */
export function pecahan(id: string, x: number, y: number, p: string | number, q: string | number, u = 14, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebar = bulatkan(u * 0.5 * Math.max(String(p).length, String(q).length) + 6);
  return [
    teks(`${id}-p`, x, bulatkan(y - u * 0.28), String(p), u, warna, { z: 3, ...o }),
    garis(`${id}-g`, bulatkan(x - lebar / 2), y, lebar, 0, warna, 1.6, { z: 3, ...o }),
    teks(`${id}-q`, x, bulatkan(y + u * 0.8), String(q), u, warna, { z: 3, ...o }),
  ];
}
export const idPecahan = (id: string): string[] => [`${id}-p`, `${id}-g`, `${id}-q`];

/* ------------------------------ Serambi dan meja jahit ------------------------------ */
/** Lantai kayu serambi `${id}` dari tinggi y sampai bawah kanvas, dengan dua papan `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, "#E7C48F", undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 14, 292, 0, W.kayuTua, 0.8, { z: -2 }),
    garis(`${id}-g2`, 4, y + 32, 292, 0, W.kayuTua, 0.8, { z: -2 }),
  ];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Meja kayu: papan `${id}`, kaki kiri `${id}-k1`, kaki kanan `${id}-k2`. Pojok kiri-atas papan (x, y), lebar w, tinggi kaki h. */
export function meja(id: string, x: number, y: number, w: number, h = 26): Obj[] {
  return [
    kotak(id, x, y, w, 7, W.kayu, W.kayuTua, { rx: 1, tebal: 1.2, z: 2 }),
    kotak(`${id}-k1`, x + 4, y + 7, 4, h, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 1 }),
    kotak(`${id}-k2`, bulatkan(x + w - 8), y + 7, 4, h, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 1 }),
  ];
}
export const idMeja = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`];

/** Mesin jahit: alas `${id}`, tiang `${id}-t`, kepala `${id}-h`, jarum `${id}-j`, roda `${id}-r`. Pojok kiri-atas (x, y); lebar 40, tinggi 24. */
export function mesinJahit(id: string, x: number, y: number): Obj[] {
  return [
    kotak(id, x, y + 18, 40, 6, "#475569", "#1E293B", { rx: 1, tebal: 1.1, z: 3 }),
    kotak(`${id}-t`, x + 30, y, 8, 20, "#64748B", "#1E293B", { rx: 1, tebal: 1.1, z: 3 }),
    kotak(`${id}-h`, x + 8, y, 28, 7, "#94A3B8", "#1E293B", { rx: 2, tebal: 1.1, z: 4 }),
    garis(`${id}-j`, x + 12, y + 7, 0, 11, "#1E293B", 1.4, { z: 4 }),
    bulat(`${id}-r`, x + 6, y + 12, 4, "#E2E8F0", "#1E293B", { tebal: 1, z: 4 }),
  ];
}
export const idMesin = (id: string): string[] => [id, `${id}-t`, `${id}-h`, `${id}-j`, `${id}-r`];

/** Gulungan benang: bulat `${id}` dan lubang `${id}-i`. Titik tengah (x, y). */
export function benang(id: string, x: number, y: number, r: number, warna: string): Obj[] {
  return [bulat(id, x, y, r, warna, W.kayuTua, { tebal: 1.2, z: 3 }), bulat(`${id}-i`, x, y, bulatkan(r * 0.35), "#FFFFFF", W.kayuTua, { tebal: 0.8, z: 4 })];
}
export const idBenang = (id: string): string[] => [id, `${id}-i`];

/** Kotak kancing: badan `${id}` berisi `n` kancing `${id}-b{i}`. Pojok kiri-atas badan (x, y), lebar 44, tinggi 22. */
export function kotakKancing(id: string, x: number, y: number, n = 4): Obj[] {
  return [
    kotak(id, x, y, 44, 22, "#FDE68A", W.coklat, { rx: 3, tebal: 1.3, z: 2 }),
    ...Array.from({ length: n }, (_, i) => bulat(`${id}-b${i}`, x + 8 + (i % 4) * 9, y + 8 + Math.floor(i / 4) * 8, 3, ["#EF4444", "#3B82F6", "#22C55E", "#A855F7"][i % 4], W.biru, { tebal: 0.8, z: 3 })),
  ];
}
export const idKotakKancing = (id: string, n = 4): string[] => [id, ...Array.from({ length: n }, (_, i) => `${id}-b${i}`)];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Kak Sekar" | "Pak Bagas";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, membawa kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro berkaus hijau `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl` dan membawa tas kain `${id}-ts`;
 * Kak Sekar berpita merah `${id}-pt` dan bermeteran di leher `${id}-mt`; Pak Bagas bertopi `${id}-tp` dan membawa gulungan kain `${id}-gl`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Bagas" ? E.pak : E.bu;
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
  if (nama === "Kak Sekar") {
    out.push(kotak(`${id}-pt`, x - 9, bulatkan(y - u * 0.8), 18, 5, "#DC2626", "#7F1D1D", { rx: 2, tebal: 0.9, z: 2 }));
    out.push(kotak(`${id}-mt`, x - 11, bulatkan(y + 2), 22, 4, "#FACC15", "#A16207", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Bagas") {
    out.push(kotak(`${id}-tp`, x - 12, bulatkan(y - u * 0.78), 24, 6, "#7C2D12", "#431407", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-gl`, x - 22, bulatkan(y + 3), 10, 11, "#C084FC", "#6B21A8", { rx: 5, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Bagas" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-k1`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Kak Sekar" ? [`${id}-pt`, `${id}-mt`] : []),
  ...(nama === "Pak Bagas" ? [`${id}-tp`, `${id}-gl`] : []),
];

/* ------------------------------ Papan kapur (video metode global) ------------------------------ */
export const K = { papan: "#14532D", kapur: "#FEF9C3", kapurMerah: "#FCA5A5", kapurBiru: "#BAE6FD" };

/** Papan tulis hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanTulis(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, K.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanTulis = (id: string): string[] => [id, `${id}-p`];
