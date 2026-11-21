import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi" (membaca sumbu, membandingkan, selisih, jumlah, memutar diagram), akhir cerita Bazar Kuliner Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: halaman bazar (papan nama, papan data krem, lantai paving), diagram batang tegak dan mendatar yang digambar SUNGGUH dari data (tinggi atau panjang batang dihitung dari banyak data
 * dan tingkatan sumbu, ujung batang tepat pada garis skala), dan tenda jajanan. Data Story: jajanan Bu Rini (risoles 30, pisang goreng 20, lemper 15, es cincau 25 porsi, tingkat lima)
 * dan minuman (es teh 40, jus 25 gelas). Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, bertas kain),
 * Bu Rini (berapron merah, membawa nampan), Pak Dodi (berkalung tanda pengenal, membawa penggaris panjang). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  lantai: "#E7E5E4",
  lantaiTua: "#A8A29E",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  papan: "#FFF7E6",
};
/** Warna batang: risoles, pisang goreng, lemper, es cincau, dan satu lagi. */
export const WB = ["#F97316", "#FACC15", "#22C55E", "#38BDF8", "#A78BFA"] as const;

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  konfeti: "\u{1F389}",
  kilau: "\u{2728}",
  penggaris: "\u{1F4CF}",
  putar: "\u{1F504}",
  tertawa: "\u{1F602}",
  jam: "\u{231B}",
  balon: "\u{1F388}",
  lampu: "\u{1F4A1}",
  gelas: "\u{1F964}",
  kain: "\u{1F9F5}",
  hitung: "\u{1F9EE}",
  bendera: "\u{1F6A9}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;
const b2 = (n: number): number => Math.round(n * 100) / 100;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis: garisW, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas (paling banyak sekitar 27 huruf supaya tidak tertutup lencana n/10). */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Latar bazar ------------------------------ */
/** Lantai paving `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, W.lantaiTua, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, W.lantaiTua, 1.2, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];
/** Papan data krem `${id}` (pojok kiri-atas x, y). */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, W.papan, W.coklat, { rx: 4, tebal: 1.8, z: -1 });
/** Meja: papan `${id}` (permukaan di y) dan dua kaki `${id}-k1` `${id}-k2` sampai lantai. */
export function meja(id: string, x: number, w: number, y = 112, tanah = 150): Obj[] {
  return [
    kotak(id, x, y, w, 6, W.kayu, W.kayuTua, { rx: 2, tebal: 1.6, z: 1 }),
    garis(`${id}-k1`, bulatkan(x + 6), y + 6, 0, tanah - y - 6, W.kayuTua, 3, { z: 0 }),
    garis(`${id}-k2`, bulatkan(x + w - 6), y + 6, 0, tanah - y - 6, W.kayuTua, 3, { z: 0 }),
  ];
}
export const idMeja = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`];
/** Tenda jajanan: atap merah `${id}` (segitiga rendah), tiang `${id}-k1` dan `${id}-k2`. Pojok kiri-atas (x, y), lebar w. */
export function tenda(id: string, x: number, y: number, w = 56): Obj[] {
  const d = `M0 14 L${b2(w / 2)} 0 L${w} 14 Z`;
  return [
    { id, t: "jalur", x, y, d, warna: W.merah, garis: "#7F1D1D", tebal: 1.4, rx: 0, z: 2 },
    garis(`${id}-k1`, x + 4, y + 14, 0, 28, W.kayuTua, 2.4, { z: 0 }),
    garis(`${id}-k2`, x + w - 4, y + 14, 0, 28, W.kayuTua, 2.4, { z: 0 }),
  ];
}
export const idTenda = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`];

/* ------------------------------ Diagram batang dari data ------------------------------ */
export type DataBatang = { nama: string; banyak: number };
export type OpsiTegak = { x0: number; yb: number; tinggi: number; n: number; tingkat: number; data: DataBatang[]; lebar?: number; jarak?: number; namaU?: number; warna?: readonly string[] };
/** Tinggi satu tingkat (piksel). */
export const langkahTegak = (o: OpsiTegak): number => b2(o.tinggi / o.n);
/** Sumbu tegak: garis sumbu `${id}-sy` dan dasar `${id}-sd`. */
export function sumbuTegak(id: string, o: OpsiTegak): Obj[] {
  const lebarAxis = (o.jarak ?? 50) * o.data.length - 4;
  return [garis(`${id}-sy`, o.x0, o.yb - o.tinggi - 4, 0, o.tinggi + 4, W.biru, 1.8, { z: 3 }), garis(`${id}-sd`, o.x0, o.yb, lebarAxis, 0, W.biru, 1.8, { z: 3 })];
}
/** Garis skala `${id}-g1..n` dan angka sumbu `${id}-a0..n` (angka di kiri sumbu). */
export function skalaTegak(id: string, o: OpsiTegak): Obj[] {
  const s = langkahTegak(o);
  const lebarAxis = (o.jarak ?? 50) * o.data.length - 4;
  const hasil: Obj[] = [];
  for (let k = 0; k <= o.n; k += 1) {
    if (k > 0) hasil.push(garis(`${id}-g${k}`, o.x0, b2(o.yb - k * s), lebarAxis, 0, W.abu, 0.7, { z: -1 }));
    hasil.push(teks(`${id}-a${k}`, o.x0 - 4, b2(o.yb - k * s + 2.8), String(k * o.tingkat), 8, W.biru, { anchor: "end", z: 3 }));
  }
  return hasil;
}
export const idSkalaTegak = (id: string, n: number): string[] => [...Array.from({ length: n }, (_, k) => `${id}-g${k + 1}`), ...Array.from({ length: n + 1 }, (_, k) => `${id}-a${k}`)];
/** Batang tegak ke-i `${id}-b{i}` (ujung tepat pada garis skala) dan namanya `${id}-n{i}`. Hanya indeks yang diminta. */
export function batangTegak(id: string, o: OpsiTegak, idx?: number[]): Obj[] {
  const s = langkahTegak(o);
  const lebar = o.lebar ?? 36;
  const jarak = o.jarak ?? 50;
  const warna = o.warna ?? WB;
  const hasil: Obj[] = [];
  o.data.forEach((d, i) => {
    if (idx && !idx.includes(i)) return;
    const h = b2((d.banyak / o.tingkat) * s);
    const x = b2(o.x0 + 8 + i * jarak);
    hasil.push(kotak(`${id}-b${i}`, x, b2(o.yb - h), lebar, h, warna[i % warna.length], W.biru, { rx: 2, tebal: 1.4, z: 2 }));
    hasil.push(teks(`${id}-n${i}`, b2(x + lebar / 2), o.yb + 11, d.nama, o.namaU ?? 8, W.biru, { z: 3 }));
  });
  return hasil;
}
export const idBatangTegak = (id: string, idx: number[]): string[] => idx.flatMap((i) => [`${id}-b${i}`, `${id}-n${i}`]);
export const idSumbuTegak = (id: string): string[] => [`${id}-sy`, `${id}-sd`];
/** Seluruh benda diagram tegak (sumbu, skala, batang, nama). */
export function diagramTegak(id: string, o: OpsiTegak): Obj[] {
  return [...sumbuTegak(id, o), ...skalaTegak(id, o), ...batangTegak(id, o)];
}
export const idDiagramTegak = (id: string, n: number, m: number): string[] => [...idSumbuTegak(id), ...idSkalaTegak(id, n), ...idBatangTegak(id, Array.from({ length: m }, (_, i) => i))];
/** Pusat atas batang ke-i pada diagram tegak: [x tengah, y ujung]. */
export const ujungTegak = (o: OpsiTegak, i: number): [number, number] => [b2(o.x0 + 8 + i * (o.jarak ?? 50) + (o.lebar ?? 36) / 2), b2(o.yb - (o.data[i].banyak / o.tingkat) * langkahTegak(o))];

export type OpsiDatar = { x0: number; y0: number; panjang: number; n: number; tingkat: number; data: DataBatang[]; tebal?: number; jarak?: number; namaU?: number; warna?: readonly string[] };
export const langkahDatar = (o: OpsiDatar): number => b2(o.panjang / o.n);
/** Dasar bawah diagram mendatar (y). */
export const dasarDatar = (o: OpsiDatar): number => o.y0 + (o.jarak ?? 20) * o.data.length;
/** Sumbu mendatar: garis sumbu samping `${id}-sy` dan sumbu bawah `${id}-sd`. */
export function sumbuDatar(id: string, o: OpsiDatar): Obj[] {
  const tinggiAxis = (o.jarak ?? 20) * o.data.length;
  return [garis(`${id}-sy`, o.x0, o.y0 - 2, 0, tinggiAxis + 2, W.biru, 1.8, { z: 3 }), garis(`${id}-sd`, o.x0, dasarDatar(o), o.panjang + 6, 0, W.biru, 1.8, { z: 3 })];
}
/** Garis skala `${id}-g1..n` (tegak lurus) dan angka sumbu bawah `${id}-a0..n`. */
export function skalaDatar(id: string, o: OpsiDatar): Obj[] {
  const s = langkahDatar(o);
  const tinggiAxis = (o.jarak ?? 20) * o.data.length;
  const hasil: Obj[] = [];
  for (let k = 0; k <= o.n; k += 1) {
    if (k > 0) hasil.push(garis(`${id}-g${k}`, b2(o.x0 + k * s), o.y0 - 2, 0, tinggiAxis + 2, W.abu, 0.7, { z: -1 }));
    hasil.push(teks(`${id}-a${k}`, b2(o.x0 + k * s), dasarDatar(o) + 10, String(k * o.tingkat), 8, W.biru, { z: 3 }));
  }
  return hasil;
}
export const idSkalaDatar = idSkalaTegak;
/** Batang mendatar ke-i `${id}-b{i}` (ujung tepat pada garis skala) dan namanya `${id}-n{i}` di sisi kiri. */
export function batangDatar(id: string, o: OpsiDatar, idx?: number[]): Obj[] {
  const s = langkahDatar(o);
  const tebal = o.tebal ?? 14;
  const jarak = o.jarak ?? 20;
  const warna = o.warna ?? WB;
  const hasil: Obj[] = [];
  o.data.forEach((d, i) => {
    if (idx && !idx.includes(i)) return;
    const p = b2((d.banyak / o.tingkat) * s);
    const y = b2(o.y0 + i * jarak + (jarak - tebal) / 2);
    hasil.push(kotak(`${id}-b${i}`, o.x0, y, p, tebal, warna[i % warna.length], W.biru, { rx: 2, tebal: 1.4, z: 2 }));
    hasil.push(teks(`${id}-n${i}`, o.x0 - 4, b2(y + tebal / 2 + 2.8), d.nama, o.namaU ?? 8, W.biru, { anchor: "end", z: 3 }));
  });
  return hasil;
}
export function diagramDatar(id: string, o: OpsiDatar): Obj[] {
  return [...sumbuDatar(id, o), ...skalaDatar(id, o), ...batangDatar(id, o)];
}
export const idDiagramDatar = idDiagramTegak;
/** Ujung batang ke-i pada diagram mendatar: [x ujung, y tengah]. */
export const ujungDatar = (o: OpsiDatar, i: number): [number, number] => [b2(o.x0 + (o.data[i].banyak / o.tingkat) * langkahDatar(o)), b2(o.y0 + i * (o.jarak ?? 20) + (o.jarak ?? 20) / 2)];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Rini" | "Pak Dodi";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, berkertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`, berkaus hijau `${id}-bj`;
 * Bu Rini berapron merah `${id}-ap` dan membawa nampan `${id}-np`; Pak Dodi berkalung tanda pengenal `${id}-tn` dan membawa penggaris panjang `${id}-pg`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
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
    out.push({ ...baju("#DC2626", "#7F1D1D", 12), id: `${id}-ap` });
    out.push(kotak(`${id}-np`, x + 11, bulatkan(y + 5), 12, 5, "#D1D5DB", "#4B5563", { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Dodi") {
    out.push(baju("#0EA5E9", "#075985", 12));
    out.push(kotak(`${id}-tn`, x - 4, bulatkan(y + 4), 8, 6, W.putih, "#075985", { rx: 1, tebal: 0.9, z: 2 }));
    out.push(kotak(`${id}-pg`, x + 12, bulatkan(y - 14), 3, 28, "#FDE047", "#A16207", { rx: 0, tebal: 0.9, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Dodi" ? 18 : 15)), nama, 8.4, W.hijauTua, { z: 3 }));
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
  ...(nama === "Pak Dodi" ? [`${id}-bj`, `${id}-tn`, `${id}-pg`] : []),
];

/* ------------------------------ Data dan tata letak bersama ------------------------------ */
/** Data Story (bersambung dari Sub-Bab A): jajanan Bu Rini pagi ini, satuan porsi, tingkat sumbu lima. */
export const RINI: DataBatang[] = [
  { nama: "Risoles", banyak: 30 },
  { nama: "Pisang goreng", banyak: 20 },
  { nama: "Lemper", banyak: 15 },
  { nama: "Es cincau", banyak: 25 },
];
/** Diagram tegak standar: enam garis skala, satu tingkat 12 piksel, dasar di y = 128. */
export const TEGAK_RINI: OpsiTegak = { x0: 44, yb: 128, tinggi: 72, n: 6, tingkat: 5, data: RINI };
/** Diagram mendatar standar: enam garis skala, satu tingkat 25 piksel. */
export const DATAR_RINI: OpsiDatar = { x0: 84, y0: 48, panjang: 150, n: 6, tingkat: 5, data: RINI, tebal: 14, jarak: 20 };
/** Papan data krem di belakang diagram. */
export const papanData = (id = "pn"): Obj => papan(id, 22, 34, 224, 114);
/** Judul sumbu (satuan) di pojok kiri-atas papan. */
export const satuanSumbu = (isi = "porsi"): Obj => teks("su", 46, 43, isi, 8, W.merah, { anchor: "start" });
