import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story K4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara" (membandingkan dan mengurutkan bilangan sampai sepuluh ribu), cerita Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa dermaga: laut, dermaga kayu bertiang, perahu kecil, dayung, papan dermaga berkaki, kartu bilangan, kotak tempat angka (ribuan, ratusan, puluhan, satuan), garis bilangan.
 * Tokoh: Satria (anak laki-laki berkaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit),
 * Kak Tiara (pemandu wisata bertopi pandan, membawa papan dermaga), Pak Darwis (penjual kelapa berkaus oranye, bergerobak kelapa). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  /** Papan dermaga: kayu terang bertulisan tinta tua. */
  papan: "#E7C48F",
  tinta: "#451A03",
  tanya: "#F59E0B",
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
  catat: "\u{1F4DD}",
  tangan: "\u{1F64B}",
  jempol: "\u{1F44D}",
  jari: "\u{1F446}",
  gelengan: "\u{1F645}",
  dahi: "\u{1F926}",
  keringat: "\u{1F4A6}",
  mahkota: "\u{1F451}",
  mata: "\u{1F440}",
  kelapa: "\u{1F965}",
  pulau: "\u{1F3DD}",
  perahu: "\u{1F6A4}",
  sampan: "\u{1F6F6}",
  kerang: "\u{1F41A}",
  payung: "\u{1F3D6}",
  tiket: "\u{1F3AB}",
  ulang: "\u{1F501}",
  penggaris: "\u{1F4CF}",
  kartu: "\u{1F0CF}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

/** Bilangan dengan titik ribuan: 4358 menjadi "4.358". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Laut, dermaga, perahu ------------------------------ */
export const WD = {
  laut: "#BAE6FD",
  ombak: "#38BDF8",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  kayuMuda: "#D9A566",
  perahu: "#DC2626",
  perahu2: "#2563EB",
} as const;

/** Laut `${id}` dari tinggi y sampai bawah kanvas, dengan dua garis ombak `${id}-g1`, `${id}-g2`. */
export function laut(id: string, y = 96): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WD.laut, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 10, y + 14, 280, 0, WD.ombak, 1.4, { z: -2, putus: true }), garis(`${id}-g2`, 10, y + 38, 280, 0, WD.ombak, 1.4, { z: -2, putus: true })];
}
export const idLaut = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Dermaga kayu `${id}`: lantai papan `${id}` (pojok kiri-atas x, y; lebar w), garis sambungan `${id}-g1`, dua tiang `${id}-t1`, `${id}-t2`. Tinggi lantai 10, tiang turun 14. */
export function dermaga(id: string, x: number, y: number, w: number): Obj[] {
  return [
    kotak(id, x, y, w, 10, WD.kayuMuda, WD.kayuTua, { rx: 1, tebal: 1.4, z: 0 }),
    garis(`${id}-g1`, bulatkan(x + w / 3), y, 0, 10, WD.kayuTua, 1, { z: 1 }),
    kotak(`${id}-t1`, bulatkan(x + 6), y + 10, 6, 14, WD.kayu, WD.kayuTua, { rx: 1, tebal: 1, z: -1 }),
    kotak(`${id}-t2`, bulatkan(x + w - 12), y + 10, 6, 14, WD.kayu, WD.kayuTua, { rx: 1, tebal: 1, z: -1 }),
  ];
}
export const idDermaga = (id: string): string[] => [id, `${id}-g1`, `${id}-t1`, `${id}-t2`];

/** Perahu kecil `${id}`: badan `${id}` berbentuk mangkuk dan tiang kecil `${id}-m`. Titik tengah garis air (x, y). */
export function perahu(id: string, x: number, y: number, warna: string = WD.perahu): Obj[] {
  return [
    poligon(id, [[x - 17, y - 9], [x + 17, y - 9], [x + 11, y + 1], [x - 11, y + 1]], warna, "#450A0A", { z: 3 }),
    garis(`${id}-m`, x, y - 9, 0, -12, W.coklat, 2, { z: 2 }),
  ];
}
export const idPerahu = (id: string): string[] => [id, `${id}-m`];
/** Dayung `${id}` bersandar: garis miring dari (x, y) ke atas kanan. */
export const dayung = (id: string, x: number, y: number): Obj => garis(id, x, y, 14, -34, W.coklat, 3, { z: 4 });

/** Papan dermaga berkaki: papan `${id}` (pojok kiri-atas x, y), tepi dalam `${id}-p`, dua kaki `${id}-f1`, `${id}-f2`. */
export function papanDermaga(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [
    kotak(`${id}-f1`, bulatkan(x + 10), y + h, 6, 22, WD.kayu, WD.kayuTua, { rx: 1, tebal: 1, z: -1 }),
    kotak(`${id}-f2`, bulatkan(x + w - 16), y + h, 6, 22, WD.kayu, WD.kayuTua, { rx: 1, tebal: 1, z: -1 }),
    kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }),
    kotak(`${id}-p`, x + 4, y + 4, w - 8, h - 8, W.papan, "#6B4423", { rx: 2, tebal: 1, z: 0 }),
  ];
}
export const idPapanDermaga = (id: string): string[] => [id, `${id}-p`, `${id}-f1`, `${id}-f2`];

/** Kartu bilangan `${id}-k` bertuliskan `${id}-t0`: kotak 64 x 38, bilangan berpemisah titik ribuan. Pojok kiri-atas (x, y). */
export function kartuBil(id: string, x: number, y: number, n: number | string, warna = "#FFFFFF", w = 64, h = 38, u = 15): Obj[] {
  return kartu(id, x, y, w, h, warna, [typeof n === "number" ? rb(n) : n], u, { z: 2 });
}

/** Warna kotak tempat angka: ribuan, ratusan, puluhan, satuan. */
export const WARNA_TEMPAT = ["#FECACA", "#FDE68A", "#BBF7D0", "#BFDBFE"] as const;
export const NAMA_TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"] as const;

/**
 * Empat kotak tempat angka untuk bilangan `n` (empat angka): kotak `${id}-k0`..`${id}-k3` dan angka `${id}-d0`..`${id}-d3`.
 * Pojok kiri-atas (x, y); tiap kotak 30 lebar dan 34 tinggi, jarak 4. Angka besar di tengah kotak.
 */
export function tempatAngka(id: string, x: number, y: number, n: number): Obj[] {
  const s = String(n).padStart(4, "0");
  return Array.from({ length: 4 }, (_, i) => [
    kotak(`${id}-k${i}`, x + i * 34, y, 30, 34, WARNA_TEMPAT[i], W.biru, { rx: 5, z: 2 }),
    teks(`${id}-d${i}`, x + i * 34 + 15, y + 25, s[i], 20, W.biru, { z: 3 }),
  ]).flat();
}
export const idTempat = (id: string, dari = 0, sampai = 3): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => [`${id}-k${dari + i}`, `${id}-d${dari + i}`]).flat();

/** Nama tempat angka sebagai judul kolom di atas kotak: `${id}-h0`..`${id}-h3`. Pojok kiri-atas kotak pertama (x, y) dan jarak tiap kolom sama dengan tempatAngka. */
export function judulTempat(id: string, x: number, y: number): Obj[] {
  return NAMA_TEMPAT.map((nama, i) => teks(`${id}-h${i}`, x + i * 34 + 15, y, nama, 6.4, W.ungu, { z: 3 }));
}
export const idJudulTempat = (id: string): string[] => [0, 1, 2, 3].map((i) => `${id}-h${i}`);

/** Garis bilangan sebelas tanda dari `x0` selebar `lebar` pada tinggi y: garis `${id}`, tanda `${id}-tk0`..`${id}-tk10`. */
export function garisBil(id: string, x0: number, y: number, lebar: number): Obj[] {
  return [garis(id, x0, y, lebar, 0, W.biru, 2.4, { z: 2 }), ...Array.from({ length: 11 }, (_, i) => garis(`${id}-tk${i}`, bulatkan(x0 + (i * lebar) / 10), y - 5, 0, 10, W.biru, 1.4, { z: 2 }))];
}
export const xTanda = (x0: number, lebar: number, i: number): number => bulatkan(x0 + (i * lebar) / 10);

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Kak Tiara" | "Pak Darwis";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-kc`, berkepang satu `${id}-kp` dan memegang kertas saku `${id}-ks`;
 * Genta berpeci hitam `${id}-pc`; Pak Hendro bertopi pantai `${id}-tp` dan berpeluit `${id}-pl`; Kak Tiara bertopi pandan `${id}-tp` dan membawa papan kecil `${id}-pk`;
 * Pak Darwis berkaus oranye `${id}-bj` dan bertopi `${id}-tp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Darwis" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const topi = (kode: string, warna: string, garisW: string, lebar = 20): Obj => kotak(`${id}-${kode}`, bulatkan(x - lebar / 2), bulatkan(y - u * 0.78), lebar, 6, warna, garisW, { rx: 2, tebal: 1, z: 2 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Laras") {
    out.push(bulat(`${id}-kp`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x - 9, bulatkan(y - u * 0.42), 18, 5, undefined, "#1F2937", { rx: 2, tebal: 1.1, z: 2 }));
    out.push(kotak(`${id}-ks`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Genta") out.push(kotak(`${id}-pc`, bulatkan(x - 8), bulatkan(y - u * 0.8), 16, 6, "#1F2937", "#030712", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Hendro") {
    out.push(baju("#0EA5E9", "#075985", 12));
    out.push(topi("tp", "#FDE68A", "#B45309", 26));
    out.push(bulat(`${id}-pl`, x + 11, bulatkan(y + 6), 2.6, "#FACC15", "#A16207", { tebal: 0.9, z: 3 }));
  }
  if (nama === "Kak Tiara") {
    out.push(topi("tp", "#D4A55A", "#92400E", 28));
    out.push(kotak(`${id}-pk`, x + 11, bulatkan(y + 1), 10, 8, W.papan, "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Darwis") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(topi("tp", "#FDE68A", "#B45309", 22));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Hendro" || nama === "Pak Darwis" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-kp`, `${id}-kc`, `${id}-ks`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`] : []),
  ...(nama === "Kak Tiara" ? [`${id}-tp`, `${id}-pk`] : []),
  ...(nama === "Pak Darwis" ? [`${id}-bj`, `${id}-tp`] : []),
];
