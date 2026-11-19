import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab D "Pesanan Bu Tuti" (penjumlahan sampai 100), Toko Kelontong Pak Joko.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: meja pesanan di toko (lantai ubin, meja kayu, kotak kue terbuka, papan kapur, loyang, bak cuci), batang puluhan dan butir satuan, kertas catatan Salsa, rak roti, rak mi.
 * Tokoh: Raka (berkaus merah), Salsa (berkepang, kertas catatan), Bima (berkaus hijau), Pak Joko (berapron biru, pensil di telinga), Bu Tuti (berkerudung merah muda, daftar pesanan),
 * Pak Anto (berkemeja kotak-kotak, tas penjual; tampak di akhir). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  kaget: "\u{1F632}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  lambai: "\u{1F44B}",
  bintang: "\u{2B50}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  jempol: "\u{1F44D}",
  keringat: "\u{1F625}",
  seru: "\u{2757}",
  kueLapis: "\u{1F370}",
  nagasari: "\u{1F96E}",
  donat: "\u{1F369}",
  bolu: "\u{1F9C1}",
  roti: "\u{1F35E}",
  sabun: "\u{1F9FC}",
  mi: "\u{1F35C}",
  mata: "\u{1F440}",
  berkilau: "\u{2728}",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Bentuk tertutup dari titik-titik absolut (lintasan `M .. L .. Z` relatif terhadap titik pertama). */
export const poligon = (id: string, titik: [number, number][], warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => {
  const [x0, y0] = titik[0];
  const d = `M0 0 ${titik
    .slice(1)
    .map(([a, b]) => `L${bulatkan(a - x0)} ${bulatkan(b - y0)}`)
    .join(" ")} Z`;
  return { id, t: "jalur", x: x0, y: y0, d, warna, garis: garisW, tebal: 1.6, ...o };
};
/** Busur lompatan dari (x1, y) ke (x2, y) setinggi h. */
export const busur = (id: string, x1: number, x2: number, y: number, h: number, warna: string = W.merah): Obj => ({
  id,
  t: "jalur",
  x: x1,
  y,
  d: `M0 0 Q${bulatkan((x2 - x1) / 2)} ${-h} ${bulatkan(x2 - x1)} 0`,
  warna: undefined,
  garis: warna,
  tebal: 2,
  z: 1,
});
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
/** Patch menggeser semua benda sebesar (dx, dy). */
export const geser = (objs: Obj[], dx: number, dy = 0): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: bulatkan((o.x ?? 0) + dx), y: bulatkan((o.y ?? 0) + dy) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Warna toko ------------------------------ */
export const WT = {
  lantai: "#EAD7B7",
  ubin: "#C8A97A",
  meja: "#C99A63",
  mejaTua: "#7C4A1E",
  rak: "#B7814A",
  rakTua: "#6B4423",
  kapur: "#1E5B43",
  kapurTua: "#8B5A2B",
  kardus: "#D6A66A",
  kardusTua: "#7C4A1E",
  loyang: "#9CA3AF",
  loyangTua: "#4B5563",
  batang: "#2563EB",
  batangTua: "#1E3A8A",
  butir: "#F59E0B",
  butirTua: "#B45309",
  kertas: "#FFFFFF",
  bak: "#BAE6FD",
  bakTua: "#0369A1",
  kapurTeks: "#FFFFFF",
} as const;

/** Lantai ubin toko `${id}` dari tinggi y sampai bawah kanvas, dua garis ubin `${id}-g1`, `${id}-g2`. */
export function lantaiToko(id: string, y = 150): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, WT.lantai, undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 16, 292, 0, WT.ubin, 2, { z: -2 }),
    garis(`${id}-g2`, 4, y + 34, 292, 0, WT.ubin, 2, { z: -2 }),
  ];
}
export const idLantaiToko = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Meja kayu: papan atas `${id}`, kaki `${id}-k1` dan `${id}-k2`. Pojok kiri-atas (x, y), lebar w, tinggi kaki `t`. */
export const meja = (id: string, x: number, y: number, w: number, t = 30): Obj[] => [
  kotak(id, x, y, w, 8, WT.meja, WT.mejaTua, { rx: 2, tebal: 1.6, z: 1 }),
  kotak(`${id}-k1`, x + 5, y + 8, 6, t, WT.mejaTua, WT.mejaTua, { rx: 1, tebal: 1, z: 0 }),
  kotak(`${id}-k2`, x + w - 11, y + 8, 6, t, WT.mejaTua, WT.mejaTua, { rx: 1, tebal: 1, z: 0 }),
];
export const idMeja = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`];

/** Papan kapur hijau tua berbingkai cokelat `${id}`. Pojok kiri-atas (x, y). */
export const papanKapur = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, WT.kapur, WT.kapurTua, { rx: 4, tebal: 3, z: 0 });

/** Teks kapur (putih) di papan kapur. */
export const kapur = (id: string, x: number, y: number, isi: string, u = 12, o: Opsi = {}): Obj => teks(id, x, y, isi, u, WT.kapurTeks, { z: 3, ...o });

/**
 * Kotak kue terbuka: badan `${id}`, tutup miring `${id}-t`, dan `n` kue beremoji `${id}-i{j}` dalam `kolom` kolom. Pojok kiri-atas badan (x, y), lebar w, tinggi h.
 */
export function kotakKue(id: string, x: number, y: number, w: number, h: number, emoji: string, n: number, kolom = 3): Obj[] {
  const baris = Math.max(1, Math.ceil(n / kolom));
  const u = Math.min(11, (w - 6) / kolom, (h - 4) / baris);
  const out: Obj[] = [kotak(id, x, y, w, h, WT.kardus, WT.kardusTua, { rx: 2, tebal: 1.6, z: 1 }), poligon(`${id}-t`, [[x, y], [x + 5, y - 7], [x + w - 5, y - 7], [x + w, y]], "#B98650", WT.kardusTua, { z: 0, tebal: 1.4 })];
  for (let j = 0; j < n; j += 1) {
    const c = j % kolom;
    const r = Math.floor(j / kolom);
    out.push(emo(`${id}-i${j}`, bulatkan(x + 3 + (c + 0.5) * ((w - 6) / kolom)), bulatkan(y + 2 + (r + 1) * ((h - 4) / baris) - 1), emoji, bulatkan(u), { z: 2 }));
  }
  return out;
}
export const idKotakKue = (id: string, n: number): string[] => [id, `${id}-t`, ...Array.from({ length: n }, (_, j) => `${id}-i${j}`)];

/** Loyang: badan `${id}`, bibir `${id}-r`. Pojok kiri-atas (x, y). `bersih`: berkilau (biru muda), kalau tidak kusam. */
export const loyang = (id: string, x: number, y: number, bersih = false): Obj[] => [
  kotak(id, x, y, 24, 7, bersih ? "#E0F2FE" : WT.loyang, bersih ? "#0369A1" : WT.loyangTua, { rx: 2, tebal: 1.3, z: 2 }),
  garis(`${id}-r`, x + 2, y + 1.5, 20, 0, bersih ? "#FFFFFF" : "#D1D5DB", 1, { z: 3 }),
];
export const idLoyang = (id: string): string[] => [id, `${id}-r`];

/** Bak cuci: badan `${id}`, air `${id}-a`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export const bak = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WT.bak, WT.bakTua, { rx: 4, tebal: 2, z: 0 }),
  garis(`${id}-a`, x + 4, y + 8, w - 8, 0, "#7DD3FC", 1.6, { z: 1 }),
];
export const idBak = (id: string): string[] => [id, `${id}-a`];

/** Rak kayu berloteng: bingkai `${id}` dan `tingkat - 1` papan `${id}-s{i}`. Pojok kiri-atas (x, y). */
export function rakKayu(id: string, x: number, y: number, w: number, h: number, tingkat = 2): Obj[] {
  return [kotak(id, x, y, w, h, "#FDE9C8", WT.rakTua, { rx: 3, tebal: 2.4, z: 0 }), ...Array.from({ length: tingkat - 1 }, (_, i) => garis(`${id}-s${i + 1}`, x, y + ((i + 1) * h) / tingkat, w, 0, WT.rakTua, 2.4, { z: 1 }))];
}
export const idRak = (id: string, tingkat = 2): string[] => [id, ...Array.from({ length: tingkat - 1 }, (_, i) => `${id}-s${i + 1}`)];

/* ------------------------------ Batang puluhan dan butir satuan ------------------------------ */
/** Satu batang puluhan: badan `${id}` dan satu garis tengah `${id}-g`. Pojok kiri-atas (x, y). */
export const batang = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 7, 28, WT.batang, WT.batangTua, { rx: 1.5, tebal: 1.2, z: 2 }),
  garis(`${id}-g`, x + 1, y + 14, 5, 0, "#BFDBFE", 1, { z: 3 }),
];
export const idBatang = (id: string): string[] => [id, `${id}-g`];
/** Satu butir satuan `${id}`. Pojok kiri-atas (x, y). */
export const butir = (id: string, x: number, y: number): Obj => kotak(id, x, y, 6, 6, WT.butir, WT.butirTua, { rx: 1, tebal: 1, z: 2 });

/**
 * Blok bilangan `g`: `p` batang puluhan `bk-${g}-p{i}` (i dari 1, berjajar 9 satuan ke kanan) lalu `s` butir `bk-${g}-s{i}` (dua baris, mulai setelah batang).
 * Pojok kiri-atas (x, y).
 */
export function blok(g: string, x: number, y: number, p: number, s: number): Obj[] {
  const out: Obj[] = [];
  for (let i = 1; i <= p; i += 1) out.push(...batang(`bk-${g}-p${i}`, x + (i - 1) * 9, y));
  const xs = x + p * 9 + 3;
  for (let i = 1; i <= s; i += 1) out.push(butir(`bk-${g}-s${i}`, bulatkan(xs + Math.floor((i - 1) / 2) * 8), y + 14 + ((i - 1) % 2) * 8));
  return out;
}
export const idBlok = (g: string, p: number, s: number): string[] => [
  ...Array.from({ length: p }, (_, i) => idBatang(`bk-${g}-p${i + 1}`)).flat(),
  ...Array.from({ length: s }, (_, i) => `bk-${g}-s${i + 1}`),
];

/** Penjumlahan bersusun di papan: angka atas `${id}-a`, tanda `${id}-p`, angka bawah `${id}-b` (rata kanan di x), garis `${id}-g`. Baris atas di y. */
export function susunTeks(id: string, a: number, b: number, x: number, y: number, u = 18): Obj[] {
  return [
    kapur(`${id}-a`, x, y, String(a), u, { anchor: "end" }),
    teks(`${id}-p`, x - 46, y + u + 4, "+", u, W.emas, { z: 3 }),
    kapur(`${id}-b`, x, y + u + 4, String(b), u, { anchor: "end" }),
    garis(`${id}-g`, x - 62, y + u + 10, 68, 0, WT.kapurTeks, 1.6, { z: 3 }),
  ];
}
export const idSusun = (id: string): string[] => [`${id}-a`, `${id}-p`, `${id}-b`, `${id}-g`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Bu Tuti" | "Pak Anto";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-ks`; Salsa berkaus merah muda `${id}-ks`, berkepang `${id}-kp1` `${id}-kp2`, membawa kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-ks`; Pak Joko berapron biru `${id}-ap` dan berpensil di telinga `${id}-ps`; Bu Tuti berkerudung merah muda `${id}-kr` dan membawa daftar pesanan `${id}-dp`;
 * Pak Anto berkemeja kotak-kotak `${id}-km` dengan tas penjual `${id}-ts`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" || nama === "Pak Anto" ? E.pak : E.bu;
  const out: Obj[] = [];
  if (nama === "Bu Tuti") out.push(bulat(`${id}-kr`, x, bulatkan(y - u * 0.28), bulatkan(u * 0.58), "#F9A8D4", "#BE185D", { tebal: 1.2, z: 0 }));
  out.push(emo(id, x, y, wajah, u, { z: 1 }));
  if (nama === "Raka") out.push(kotak(`${id}-ks`, x - 11, bulatkan(y + 2), 22, 8, "#DC2626", "#7F1D1D", { rx: 3, tebal: 1.2, z: 0 }));
  if (nama === "Bima") out.push(kotak(`${id}-ks`, x - 11, bulatkan(y + 2), 22, 8, "#16A34A", "#14532D", { rx: 3, tebal: 1.2, z: 0 }));
  if (nama === "Salsa") {
    out.push(kotak(`${id}-ks`, x - 11, bulatkan(y + 2), 22, 8, "#EC4899", "#9D174D", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(bulat(`${id}-kp1`, x - 14, bulatkan(y - 3), 3, "#7C2D12", "#431407", { tebal: 0.8, z: 0 }));
    out.push(bulat(`${id}-kp2`, x + 14, bulatkan(y - 3), 3, "#7C2D12", "#431407", { tebal: 0.8, z: 0 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y - 1), 10, 12, "#FFFFFF", "#475569", { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(kotak(`${id}-ap`, x - 9, bulatkan(y + 2), 18, 9, "#2563EB", "#1E3A8A", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(garis(`${id}-ps`, x + 11, bulatkan(y - u * 0.55), 4, -5, "#FACC15", 2, { z: 2 }));
  }
  if (nama === "Bu Tuti") out.push(kotak(`${id}-dp`, x + 12, bulatkan(y - 1), 11, 14, "#FFFFFF", "#475569", { rx: 1, tebal: 1, z: 2 }));
  if (nama === "Pak Anto") {
    out.push(kotak(`${id}-km`, x - 11, bulatkan(y + 2), 22, 9, "#FCA5A5", "#991B1B", { rx: 2, tebal: 1.2, z: 0 }));
    out.push(garis(`${id}-ka`, x - 4, bulatkan(y + 2), 0, 9, "#991B1B", 0.9, { z: 0.5 }));
    out.push(garis(`${id}-kb`, x + 4, bulatkan(y + 2), 0, 9, "#991B1B", 0.9, { z: 0.5 }));
    out.push(kotak(`${id}-ts`, x + 12, bulatkan(y + 3), 10, 10, "#78350F", "#451A03", { rx: 2, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 15), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-ks`] : []),
  ...(nama === "Salsa" ? [`${id}-ks`, `${id}-kp1`, `${id}-kp2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-ap`, `${id}-ps`] : []),
  ...(nama === "Bu Tuti" ? [`${id}-kr`, `${id}-dp`] : []),
  ...(nama === "Pak Anto" ? [`${id}-km`, `${id}-ka`, `${id}-kb`, `${id}-ts`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
