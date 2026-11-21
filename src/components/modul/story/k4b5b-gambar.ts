import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi" (menyusun dan menguraikan bangun datar), akhir cerita Toko Keramik Bu Dewi.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: meja kerja Pak Rudi di Toko Keramik Bu Dewi (papan nama TOKO KERAMIK BU DEWI), kotak keping keramik pecah, keping segitiga, persegi, jajargenjang,
 * segienam dan segilima beraturan yang dibelah dari titik tengah (jalur poligon dari koordinat titik sudut, sungguh sebanyak segitiganya), dan tangram tujuh keping
 * yang membentuk persegi, perahu, dan rumah (koordinat tiap keping sungguh sebanyak tujuh, tanpa tumpang tindih).
 * Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, bertas kain),
 * Bu Dewi (berkerudung krem, membawa katalog), Pak Rudi (berhelm kuning, membawa palu karet). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  lantai: "#FFEDD5",
  lantaiTua: "#FDBA74",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
};
/** Glasir keramik berwarna muda untuk keping. */
export const G = { biru: "#93C5FD", hijau: "#86EFAC", kuning: "#FDE047", pink: "#F9A8D4", ungu: "#C4B5FD", oranye: "#FDBA74", merah: "#FCA5A5", tosca: "#99F6E4" };
/** Warna enam irisan segienam. */
export const WARNA_IRIS = [G.biru, G.hijau, G.kuning, G.pink, G.ungu, G.oranye] as const;

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  konfeti: "\u{1F389}",
  kilau: "\u{2728}",
  catat: "\u{1F4DD}",
  sapu: "\u{1F9F9}",
  tabrak: "\u{1F4A5}",
  musik: "\u{1F3B5}",
  puzzle: "\u{1F9E9}",
  gunting: "\u{2702}",
  palet: "\u{1F3A8}",
  hati: "\u{1F496}",
  jam: "\u{231B}",
  tertawa: "\u{1F602}",
} as const;

export type Tt = [number, number];
type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;
const b2 = (n: number): number => Math.round(n * 100) / 100;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
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
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Bangun dari koordinat ------------------------------ */
/** Poligon tertutup `${id}` dari titik sudut mutlak (jalur `M x y L ... Z`); uji menghitung ulang bangun dari jalur ini. */
export function poli(id: string, pts: readonly Tt[], warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj {
  const d = `M${pts.map((p) => `${b2(p[0])} ${b2(p[1])}`).join(" L")} Z`;
  return { id, t: "jalur", x: 0, y: 0, d, warna, garis: garisW, tebal: 1.4, rx: 0, z: 2, ...o };
}
/** Titik sudut bangun beraturan `n` sisi berpusat (cx, cy), jari-jari r, sudut pertama `mulai` derajat (0 = ke kanan, -90 = ke atas). */
export function titikBeraturan(cx: number, cy: number, r: number, n: number, mulai = 0): Tt[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((mulai + (360 / n) * i) * Math.PI) / 180;
    return [b2(cx + r * Math.cos(a)), b2(cy + r * Math.sin(a))] as Tt;
  });
}
/** Irisan dari titik `pusat` ke tiap sisi bangun `titik`: `n` segitiga `${id}-0` sampai `${id}-{n-1}` (sungguh sebanyak sisinya). */
export function irisan(id: string, pusat: Tt, titik: readonly Tt[], warna: readonly string[] = WARNA_IRIS, o: Opsi = {}): Obj[] {
  return titik.map((t, i) => poli(`${id}-${i}`, [pusat, t, titik[(i + 1) % titik.length]], warna[i % warna.length], W.biru, o));
}
export const idIrisan = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-${i}`);
/** Garis dari `pusat` ke tiap titik sudut: `${id}-0` sampai `${id}-{n-1}`. */
export function garisKeSudut(id: string, pusat: Tt, titik: readonly Tt[], warna: string = W.merah, tebal = 1.6): Obj[] {
  return titik.map((t, i) => garis(`${id}-${i}`, pusat[0], pusat[1], b2(t[0] - pusat[0]), b2(t[1] - pusat[1]), warna, tebal, { z: 4 }));
}
/** Titik di dalam bangun: bulatan kecil merah. */
export const titikPusat = (id: string, p: Tt, r = 2.6): Obj => bulat(id, p[0], p[1], r, W.merah, W.merah, { tebal: 1, z: 5 });
/** Tanda sisi sama panjang: garis kecil tegak lurus di tengah ruas a-b. */
export function tanda(id: string, a: Tt, b: Tt, warna: string = W.merah): Obj {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const p = Math.hypot(dx, dy) || 1;
  const nx = -dy / p;
  const ny = dx / p;
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  return garis(id, b2(mx - nx * 3.2), b2(my - ny * 3.2), b2(nx * 6.4), b2(ny * 6.4), warna, 1.8, { z: 6 });
}
/** Segitiga siku-siku sama kaki berkaki `s` dengan sudut siku di (x, y); `mx` dan `my` (+1 atau -1) menentukan arah kaki. */
export const segitigaSiku = (x: number, y: number, s: number, mx: 1 | -1, my: 1 | -1): Tt[] => [
  [x, y],
  [x + mx * s, y],
  [x, y + my * s],
];

/* ------------------------------ Serpih keramik ------------------------------ */
const SERPIH: Tt[][] = [
  [[0, 10], [8, 0], [12, 10]],
  [[0, 8], [10, 8], [5, 0]],
  [[0, 6], [9, 2], [11, 10]],
  [[0, 0], [11, 4], [3, 10]],
  [[0, 9], [6, 0], [12, 7]],
];
const WARNA_SERPIH = [G.biru, G.pink, G.kuning, G.hijau, G.oranye, G.ungu];
/** Deret `n` serpih (keping pecah) `${id}-0` dst, satu serpih satu benda; pojok kiri-atas deret (x, y), jarak `jarak`. */
export function serpih(id: string, x: number, y: number, n: number, jarak = 15, o: Opsi = {}, skala = 1): Obj[] {
  return Array.from({ length: n }, (_, i) => poli(`${id}-${i}`, SERPIH[i % SERPIH.length].map((p) => [x + i * jarak + p[0] * skala, y + p[1] * skala] as Tt), WARNA_SERPIH[i % WARNA_SERPIH.length], W.biru, { tebal: 1.1, ...o }));
}
export const idSerpih = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-${i}`);

/* ------------------------------ Toko ------------------------------ */
/** Lantai toko keramik `${id}` dari tinggi y sampai bawah kanvas, dua garis ubin `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, W.lantaiTua, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, W.lantaiTua, 1.2, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];
/** Meja kerja Pak Rudi: papan `${id}` (permukaan di y) dan dua kaki `${id}-k1` `${id}-k2` sampai lantai. */
export function meja(id: string, x: number, w: number, y = 112, tanah = 150): Obj[] {
  return [
    kotak(id, x, y, w, 6, W.kayu, W.kayuTua, { rx: 2, tebal: 1.6, z: 1 }),
    garis(`${id}-k1`, bulatkan(x + 6), y + 6, 0, tanah - y - 6, W.kayuTua, 3, { z: 0 }),
    garis(`${id}-k2`, bulatkan(x + w - 6), y + 6, 0, tanah - y - 6, W.kayuTua, 3, { z: 0 }),
  ];
}
export const idMeja = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`];
/** Papan nama toko: kotak `${id}` dan tulisan `${id}-t` (TOKO KERAMIK BU DEWI). Pojok kiri-atas (x, y). */
export function papanNama(id: string, x: number, y: number, w = 100): Obj[] {
  return [kotak(id, x, y, w, 14, "#FEE2E2", W.merah, { rx: 3, tebal: 1.6, z: 1 }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + 10.2), "TOKO KERAMIK BU DEWI", 7, W.merah, { z: 2 })];
}
export const idPapanNama = (id: string): string[] => [id, `${id}-t`];

/* ------------------------------ Tangram ------------------------------ */
export type JenisKeping = "LT" | "MT" | "ST" | "SQ" | "PG";
export type Keping = { j: JenisKeping; p: Tt[] };
/** Warna tiap jenis keping; dua segitiga besar berbeda warna. */
const WARNA_KEPING: Record<JenisKeping, string[]> = { LT: [G.biru, G.ungu], MT: [G.hijau], ST: [G.kuning, G.oranye], SQ: [G.pink], PG: [G.tosca] };
/** Tangram disusun menjadi persegi besar (satuan 4 x 4). Tujuh keping: dua segitiga besar, satu sedang, dua kecil, satu persegi, satu jajargenjang. */
export const TANGRAM_KOTAK: Keping[] = [
  { j: "LT", p: [[0, 0], [4, 0], [2, 2]] },
  { j: "LT", p: [[0, 4], [0, 0], [2, 2]] },
  { j: "ST", p: [[4, 0], [4, 2], [3, 1]] },
  { j: "SQ", p: [[3, 1], [4, 2], [3, 3], [2, 2]] },
  { j: "ST", p: [[3, 3], [1, 3], [2, 2]] },
  { j: "MT", p: [[4, 4], [2, 4], [4, 2]] },
  { j: "PG", p: [[3, 3], [1, 3], [0, 4], [2, 4]] },
];
/** Perahu layar dari tujuh keping (lambung di bawah y = 0, layar di atasnya; y ke bawah). */
export const TANGRAM_PERAHU: Keping[] = [
  { j: "LT", p: [[2, 0], [2, -4], [4, -2]] },
  { j: "MT", p: [[4, 0], [2, 0], [4, -2]] },
  { j: "ST", p: [[4, 0], [4, -2], [5, -1]] },
  { j: "SQ", p: [[5, -1], [6, 0], [5, 1], [4, 0]] },
  { j: "LT", p: [[0, 0], [4, 0], [2, 2]] },
  { j: "ST", p: [[5, 1], [3, 1], [4, 0]] },
  { j: "PG", p: [[5, 1], [3, 1], [2, 2], [4, 2]] },
];
/** Rumah beratap dari tujuh keping (dasar di y = 0, atap di atasnya memakai y negatif). */
export const TANGRAM_RUMAH: Keping[] = [
  { j: "LT", p: [[2.828, 0], [2.828, -2.828], [0, 0]] },
  { j: "LT", p: [[0, -2.828], [0, 0], [2.828, -2.828]] },
  { j: "PG", p: [[1.414, -4.243], [0, -2.828], [-1.414, -2.828], [0, -4.243]] },
  { j: "ST", p: [[1.414, -2.828], [1.414, -4.243], [0, -2.828]] },
  { j: "SQ", p: [[1.414, -2.828], [2.828, -2.828], [2.828, -4.243], [1.414, -4.243]] },
  { j: "ST", p: [[2.828, -2.828], [4.243, -2.828], [2.828, -4.243]] },
  { j: "MT", p: [[1.414, -5.657], [0, -4.243], [2.828, -4.243]] },
];
/** Keping tangram `${id}-0` sampai `${id}-6` digambar dengan titik (0, 0) susunan di (x0, y0) dan skala `s` piksel per satuan. */
export function pasangTangram(id: string, susunan: readonly Keping[], x0: number, y0: number, s: number, o: Opsi = {}): Obj[] {
  const pakai: Record<string, number> = {};
  return susunan.map((kp, i) => {
    const n = (pakai[kp.j] = (pakai[kp.j] ?? -1) + 1);
    const warna = WARNA_KEPING[kp.j][n % WARNA_KEPING[kp.j].length];
    return poli(`${id}-${i}`, kp.p.map((q) => [x0 + q[0] * s, y0 + q[1] * s] as Tt), warna, W.biru, o);
  });
}
export const idTangram = (id: string): string[] => Array.from({ length: 7 }, (_, i) => `${id}-${i}`);

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Dewi" | "Pak Rudi";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, berkertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`, berkaus hijau `${id}-bj`;
 * Bu Dewi berkerudung krem `${id}-kr` dan membawa katalog `${id}-kt`; Pak Rudi berkaus oranye `${id}-bj`, berhelm kuning `${id}-hl`, dan membawa palu karet `${id}-pm`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Rudi" ? E.pak : E.bu;
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
  if (nama === "Bu Dewi") {
    out.push(kotak(`${id}-kr`, x - 13, bulatkan(y - u * 0.78), 26, 7, "#FDE68A", "#B45309", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-kt`, x + 11, bulatkan(y + 1), 10, 13, "#FFF7ED", "#9A3412", { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Rudi") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-hl`, x - 10, bulatkan(y - u * 0.8), 20, 7, "#FACC15", "#A16207", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pm`, x + 11, bulatkan(y + 3), 9, 6, "#1F2937", "#111827", { rx: 1, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Rudi" ? 18 : 15)), nama, 8.4, W.hijauTua, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-k1`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Dewi" ? [`${id}-kr`, `${id}-kt`] : []),
  ...(nama === "Pak Rudi" ? [`${id}-bj`, `${id}-hl`, `${id}-pm`] : []),
];
