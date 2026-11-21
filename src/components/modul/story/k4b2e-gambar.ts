import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti" (desimal perseratusan dan persen), akhir cerita Sanggar Batik Kampung Mekar.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: halaman sanggar berumput dengan tali lampion, papan pameran besar, kisi seratus kotak (digambar sebanyak datanya: seratus kotak, p berwarna), kartu bilangan,
 * dan tangga lipat. Tokoh: Satria (kaus biru), Laras (berkepang satu, berkacamata, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, bertas kain),
 * Bu Tuti (panitia pameran berselendang, memegang spidol). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  pink: "#FCE7F3",
  hijauMuda: "#DCFCE7",
  kuning: "#FACC15",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  yakin: "\u{1F60E}",
  pikir: "\u{1F914}",
  capek: "\u{1F613}",
  lelah: "\u{1F62B}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  jempol: "\u{1F44D}",
  tepuk: "\u{1F44F}",
  tawa: "\u{1F602}",
  lupa: "\u{1F50D}",
  periksa: "\u{1F50E}",
  lampion: "\u{1F3EE}",
  balon: "\u{1F388}",
  konfeti: "\u{1F389}",
  bintang: "\u{2B50}",
  catat: "\u{1F4DD}",
  daftar: "\u{1F4CB}",
  palet: "\u{1F3A8}",
  seratus: "\u{1F4AF}",
  petir: "\u{26A1}",
  orang: "\u{1F465}",
  kaus: "\u{1F455}",
  pita: "\u{1F380}",
  tas: "\u{1F45C}",
  jembatan: "\u{1F309}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Halaman sanggar ------------------------------ */
export const WH = {
  rumput: "#D9F99D",
  rumputGaris: "#A3E635",
  papan: "#FEF3C7",
  tali: "#92400E",
} as const;

/** Rumput `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function halaman(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WH.rumput, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WH.rumputGaris, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WH.rumputGaris, 1.2, { z: -2 })];
}
export const idHalaman = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Lampion: badan `${id}` (bulat), tali pendek `${id}-t`. Menyala (kuning) atau padam (abu). Pusat badan (x, y). */
export function lampion(id: string, x: number, y: number, nyala = true, s = 1): Obj[] {
  return [
    bulat(id, x, y, bulatkan(4.6 * s), nyala ? "#FDE047" : "#CBD5E1", nyala ? "#B45309" : "#64748B", { tebal: 1.2, z: 3 }),
    garis(`${id}-t`, x, bulatkan(y - 4.6 * s), 0, bulatkan(-5 * s), "#78350F", 1, { z: 2 }),
  ];
}
export const idLampion = (id: string): string[] => [id, `${id}-t`];

/** Papan pameran `${id}` (kotak krem berbingkai cokelat), dua kaki `${id}-k1` `${id}-k2` sampai tanah, dan judul `${id}-t` di bagian atas. */
export function papanPameran(id: string, x: number, y: number, w: number, h: number, isi: string, tanah = 150, u = 9): Obj[] {
  return [
    garis(`${id}-k1`, bulatkan(x + w * 0.2), y + h, 0, tanah - y - h, WH.tali, 3, { z: 0 }),
    garis(`${id}-k2`, bulatkan(x + w * 0.8), y + h, 0, tanah - y - h, WH.tali, 3, { z: 0 }),
    kotak(id, x, y, w, h, WH.papan, W.coklat, { rx: 4, tebal: 2, z: 1 }),
    teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + 14), isi, u, W.coklat, { z: 2 }),
  ];
}
export const idPapan = (id: string): string[] => [id, `${id}-t`, `${id}-k1`, `${id}-k2`];

/* ------------------------------ Kisi seratus ------------------------------ */
export const WARNA_KISI = "#F97316";
const GARIS_KISI = "#9A3412";
const KOSONG_KISI = "#FFFFFF";
const GARIS_KOSONG = "#FDBA74";

/**
 * Kisi seratus kotak (10 baris x 10 kolom, dari kiri-atas baris demi baris): kotak ke-i berid `${id}-${i}`, pojok kiri-atas kisi (x, y), jarak antarkotak `jarak`, sisi kotak `sisi`.
 * Pertama semuanya kosong bila `berwarna` 0; `berwarna` kotak pertama berwarna. Banyak kotak yang tergambar selalu seratus.
 */
export function kisi(id: string, x: number, y: number, berwarna: number, sisi = 9, jarak = 10, o: Opsi = {}): Obj[] {
  return Array.from({ length: 100 }, (_, i) =>
    kotak(`${id}-${i}`, bulatkan(x + (i % 10) * jarak), bulatkan(y + Math.floor(i / 10) * jarak), sisi, sisi, i < berwarna ? WARNA_KISI : KOSONG_KISI, i < berwarna ? GARIS_KISI : GARIS_KOSONG, { rx: 1, tebal: 0.8, z: 1, ...o }),
  );
}
/** Id kotak ke-`dari` sampai ke-`sampai` (tidak termasuk `sampai`) pada kisi `id`. */
export const idKisi = (id: string, dari = 0, sampai = 100): string[] => Array.from({ length: sampai - dari }, (_, i) => `${id}-${dari + i}`);
/** Ubah kotak ke-`dari` sampai ke-`sampai` (tidak termasuk) menjadi berwarna atau kosong. */
export const warnai = (id: string, dari: number, sampai: number, berwarna = true): { id: string; warna: string; garis: string }[] =>
  idKisi(id, dari, sampai).map((k) => ({ id: k, warna: berwarna ? WARNA_KISI : KOSONG_KISI, garis: berwarna ? GARIS_KISI : GARIS_KOSONG }));

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Tuti";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka1` `${id}-ka2`, berkepang satu `${id}-kp`, berkertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc` dan berkaus hijau `${id}-bj`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`, berkaus oranye `${id}-bj`;
 * Bu Tuti berselendang pink `${id}-sl`, berbaju ungu `${id}-bj`, memegang spidol `${id}-sp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Bu Tuti" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Genta") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pc`, bulatkan(x - 8), bulatkan(y - u * 0.8), 16, 6, "#1F2937", "#0F172A", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Laras") {
    out.push(baju("#EC4899", "#831843"));
    out.push(bulat(`${id}-ka1`, x - 5, bulatkan(y - u * 0.3), 3, undefined, "#1F2937", { tebal: 1, z: 2 }));
    out.push(bulat(`${id}-ka2`, x + 5, bulatkan(y - u * 0.3), 3, undefined, "#1F2937", { tebal: 1, z: 2 }));
    out.push(bulat(`${id}-kp`, x + 13, bulatkan(y - u * 0.05), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x - 20, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hendro") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-tp`, bulatkan(x - 14), bulatkan(y - u * 0.78), 28, 5, "#FDE68A", "#B45309", { rx: 2, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 2, bulatkan(y + 7), 2.2, "#FACC15", "#92400E", { tebal: 0.9, z: 2 }));
    out.push(kotak(`${id}-ts`, x - 20, bulatkan(y + 3), 7, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Tuti") {
    out.push(baju("#7C3AED", "#4C1D95", 12));
    out.push(kotak(`${id}-sl`, x - 12, bulatkan(y + 3), 24, 4, "#F9A8D4", "#9D174D", { rx: 2, tebal: 1, z: 2 }));
    out.push(garis(`${id}-sp`, x + 14, bulatkan(y + 2), 3, bulatkan(-12), "#DC2626", 2.4, { z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Satria" || nama === "Genta" || nama === "Laras" ? 15 : 18)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Genta" ? [`${id}-bj`, `${id}-pc`] : []),
  ...(nama === "Laras" ? [`${id}-bj`, `${id}-ka1`, `${id}-ka2`, `${id}-kp`, `${id}-kc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Tuti" ? [`${id}-bj`, `${id}-sl`, `${id}-sp`] : []),
];
