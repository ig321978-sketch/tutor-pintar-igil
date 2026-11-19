import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 5 Sub-Bab A "Catatan Pak Hasan" (mengurutkan dan membandingkan data), awal cerita Bengkel Sepeda Pak Hasan.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa bengkel: jalan kampung beraspal, bengkel bertuliskan BENGKEL SEPEDA, ban dan pompa di etalase, sepeda bergantung, papan tulis hijau tua berkapur, kartu bilangan, turus.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (kaus biru, topi anyaman, berkumis, berpensil di telinga, membawa tas belanja),
 * Pak Hasan (montir berseragam biru, membawa pompa dan papan tulis kecil), Bu Wulan (berhelm kuning, membawa papan kosong; kecil di kejauhan). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  /** Papan tulis: hijau tua, kapur krem dan merah muda. */
  papan: "#14532D",
  kapur: "#FEF9C3",
  kapurMerah: "#FCA5A5",
  tanya: "#F59E0B",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
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
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  jari: "\u{261D}",
  gelengan: "\u{1F645}",
  sepeda: "\u{1F6B2}",
  perkakas: "\u{1F527}",
  baut: "\u{1F529}",
  lampu: "\u{1F4A1}",
  balon: "\u{1F388}",
  ulang: "\u{1F501}",
  mata: "\u{1F440}",
  kertas: "\u{1F4C4}",
  pita: "\u{1F380}",
  penggaris: "\u{1F4CF}",
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
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Bengkel dan jalan ------------------------------ */
export const WB = {
  aspal: "#CBD5E1",
  aspalGaris: "#94A3B8",
  dinding: "#FDE68A",
  atap: "#B45309",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  ban: "#1F2937",
  banDalam: "#E5E7EB",
  rak: "#C99A63",
} as const;

/** Jalan kampung `${id}` dari tinggi y sampai bawah kanvas, dengan dua garis putus `${id}-g1`, `${id}-g2`. */
export function jalan(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WB.aspal, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 8, y + 12, 284, 0, WB.aspalGaris, 1.4, { z: -2, putus: true }), garis(`${id}-g2`, 8, y + 34, 284, 0, WB.aspalGaris, 1.4, { z: -2, putus: true })];
}
export const idJalan = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Lantai bengkel `${id}` dari tinggi y sampai bawah kanvas (ubin kayu), dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, "#E7C48F", undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WB.kayuTua, 0.8, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WB.kayuTua, 0.8, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Bengkel sepeda: dinding `${id}`, atap `${id}-a`, pintu `${id}-p`, papan nama `${id}-sn` bertulisan `${id}-st`. Pojok kiri-atas dinding (x, y), lebar w, tinggi h. */
export function bengkel(id: string, x: number, y: number, w = 120, h = 60): Obj[] {
  return [
    kotak(id, x, y, w, h, WB.dinding, WB.kayuTua, { rx: 2, z: 0 }),
    poligon(`${id}-a`, [[x - 6, y], [bulatkan(x + w / 2), y - 24], [x + w + 6, y]], WB.atap, "#451A03", { z: 1 }),
    kotak(`${id}-p`, bulatkan(x + w - 26), y + h - 30, 18, 30, WB.kayu, WB.kayuTua, { rx: 1, tebal: 1.2, z: 1 }),
    kotak(`${id}-sn`, bulatkan(x + 6), y + 4, bulatkan(w - 12), 14, "#FFFFFF", W.biru, { rx: 2, tebal: 1.2, z: 2 }),
    teks(`${id}-st`, bulatkan(x + w / 2), y + 14.5, "BENGKEL SEPEDA", 7, W.biru, { z: 3 }),
  ];
}
export const idBengkel = (id: string): string[] => [id, `${id}-a`, `${id}-p`, `${id}-sn`, `${id}-st`];

/** Ban sepeda `${id}` (cincin gelap) dengan pelek `${id}-i` dan pusat `${id}-c`. Pusat (cx, cy), jari-jari r. */
export function ban(id: string, cx: number, cy: number, r = 10, z = 2): Obj[] {
  return [
    bulat(id, cx, cy, r, WB.ban, "#030712", { tebal: 1.4, z }),
    bulat(`${id}-i`, cx, cy, bulatkan(r * 0.62), WB.banDalam, "#6B7280", { tebal: 1, z: z + 1 }),
    bulat(`${id}-c`, cx, cy, bulatkan(r * 0.16), "#6B7280", undefined, { tebal: 0, z: z + 2 }),
  ];
}
export const idBan = (id: string): string[] => [id, `${id}-i`, `${id}-c`];

/** Sepeda kecil `${id}`: dua ban `${id}-b1`, `${id}-b2` dan rangka berwarna `${id}-r1`..`${id}-r3`. Titik tengah bawah (x, y). */
export function sepeda(id: string, x: number, y: number, warna = "#2563EB"): Obj[] {
  const r = 7;
  return [
    ...ban(`${id}-b1`, x - 13, y - r, r),
    ...ban(`${id}-b2`, x + 13, y - r, r),
    garis(`${id}-r1`, x - 13, y - r, 12, -9, warna, 2, { z: 4 }),
    garis(`${id}-r2`, x - 1, y - r - 9, 14, 9, warna, 2, { z: 4 }),
    garis(`${id}-r3`, x - 1, y - r - 9, 0, -3, W.putih, 2, { z: 4 }),
  ];
}
export const idSepeda = (id: string): string[] => [...idBan(`${id}-b1`), ...idBan(`${id}-b2`), `${id}-r1`, `${id}-r2`, `${id}-r3`];

/** Papan tulis hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanTulis(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, W.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanTulis = (id: string): string[] => [id, `${id}-p`];

/** Kartu bilangan `${id}-k` bertuliskan `${id}-t0`: kotak putih 38 x 40, angka besar. Pojok kiri-atas (x, y). */
export function kartuBil(id: string, x: number, y: number, n: number | string, warna = "#FFFFFF", w = 38, h = 40): Obj[] {
  return kartu(id, x, y, w, h, warna, [String(n)], 20, { z: 2 });
}

/** Kartu hari `${id}-k`: nama hari `${id}-h` (kecil) dan bilangan `${id}-n` (besar). Pojok kiri-atas (x, y), lebar 64, tinggi 28. */
export function kartuHari(id: string, x: number, y: number, hari: string, n: number, warna: string): Obj[] {
  return [kotak(`${id}-k`, x, y, 64, 28, warna, W.biru, { rx: 6, z: 2 }), teks(`${id}-h`, x + 20, y + 18, hari, 8.4, W.biru, { z: 3 }), teks(`${id}-n`, x + 50, y + 21, String(n), 15, W.merah, { z: 3 })];
}
export const idKartuHari = (id: string): string[] => [`${id}-k`, `${id}-h`, `${id}-n`];

/** Pompa kecil `${id}`: badan `${id}` dan pegangan `${id}-h`. Pojok kiri-atas badan (x, y), tinggi 18. */
export function pompa(id: string, x: number, y: number): Obj[] {
  return [kotak(id, x, y, 4, 18, "#94A3B8", "#475569", { rx: 1, tebal: 0.9, z: 3 }), kotak(`${id}-h`, x - 3, y - 3, 10, 3, "#DC2626", "#7F1D1D", { rx: 1, tebal: 0.8, z: 3 })];
}
export const idPompa = (id: string): string[] => [id, `${id}-h`];

/**
 * Turus `${id}` untuk `banyak` data (dari kiri mulai (x, y)): garis tegak `${id}-t0`.. dan coretan miring `${id}-m0`.. tiap bundel.
 * Tiap bundel: empat garis tegak dan satu coretan miring melintang (lima data). Sisanya garis tegak. `jarak` antargaris, `tinggi` tiap garis.
 */
export function turus(id: string, x: number, y: number, banyak: number, o: { jarak?: number; tinggi?: number; celah?: number; warna?: string; miring?: string; tebal?: number } = {}): Obj[] {
  const j = o.jarak ?? 10;
  const t = o.tinggi ?? 44;
  const celah = o.celah ?? 12;
  const warna = o.warna ?? W.kapur;
  const merah = o.miring ?? W.kapurMerah;
  const tebal = o.tebal ?? 2.6;
  const out: Obj[] = [];
  let cx = x;
  let ti = 0;
  for (let b = 0; b < Math.floor(banyak / 5); b += 1) {
    for (let i = 0; i < 4; i += 1) {
      out.push(garis(`${id}-t${ti}`, bulatkan(cx + i * j), y, 0, t, warna, tebal, { z: 3 }));
      ti += 1;
    }
    out.push(garis(`${id}-m${b}`, bulatkan(cx - 4), bulatkan(y + t * 0.8), bulatkan(3 * j + 8), bulatkan(-t * 0.6), merah, tebal, { z: 4 }));
    cx += 3 * j + celah + j;
  }
  for (let i = 0; i < banyak % 5; i += 1) {
    out.push(garis(`${id}-t${ti}`, bulatkan(cx), y, 0, t, warna, tebal, { z: 3 }));
    ti += 1;
    cx += j;
  }
  return out;
}
/** Id garis tegak ke-`dari` sampai ke-`sampai` (mulai nol) dan coretan miring ke-`m` milik turus `id`. */
export const idTurusTegak = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}-t${dari + i}`);
export const idTurusMiring = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}-m${dari + i}`);

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Pak Hasan" | "Bu Wulan";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`, membawa tas belanja `${id}-ts`;
 * Pak Hasan berseragam biru tua `${id}-bj` dengan papan tulis kecil `${id}-pk` dan pompa `${id}-pp`; Bu Wulan (kecil) berhelm kuning `${id}-hl` dan membawa papan kosong `${id}-pb`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" || nama === "Pak Hasan" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const topi = (kode: string, warna: string, garisW: string, lebar = 20): Obj => kotak(`${id}-${kode}`, bulatkan(x - lebar / 2), bulatkan(y - u * 0.78), lebar, 6, warna, garisW, { rx: 2, tebal: 1, z: 2 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(topi("tp", "#D4A55A", "#92400E", 24));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.5), 0, 8, "#F59E0B", 2, { z: 2 }));
    out.push(kotak(`${id}-ts`, x - 19, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hasan") {
    out.push(baju("#1D4ED8", "#1E3A8A", 12));
    out.push(kotak(`${id}-pk`, x + 11, bulatkan(y + 1), 10, 8, "#14532D", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
    out.push(kotak(`${id}-pp`, x - 17, bulatkan(y + 2), 3, 12, "#94A3B8", "#475569", { rx: 1, tebal: 0.8, z: 2 }));
  }
  if (nama === "Bu Wulan") {
    out.push(topi("hl", "#FACC15", "#A16207", Math.round(u * 0.9)));
    out.push(kotak(`${id}-pb`, x + 9, bulatkan(y - 2), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.8, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Pak Hasan" ? 18 : nama === "Bu Wulan" ? 9 : 15)), nama, nama === "Bu Wulan" ? 6.4 : 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`, `${id}-ts`] : []),
  ...(nama === "Pak Hasan" ? [`${id}-bj`, `${id}-pk`, `${id}-pp`] : []),
  ...(nama === "Bu Wulan" ? [`${id}-hl`, `${id}-pb`] : []),
];
