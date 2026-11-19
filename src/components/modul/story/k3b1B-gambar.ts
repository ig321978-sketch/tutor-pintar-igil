import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab B "Kartu Harga Bu Wati" (tempat angka), cerita Toko Kelontong Pak Joko.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa meja depan toko: dinding krem dengan kanopi merah bertulis TOKO PAK JOKO, lantai kayu, etalase kaca, mesin kasir tua, papan harga kapur hijau tua,
 * kotak kartu angka (kartu hijau seratus, biru sepuluh, merah satu), label harga, mesin pencetak label, topi badut, truk kuning kecil.
 * Tokoh: Raka (berkaus merah), Salsa (berkepang, berkertas catatan), Bima (berkaus hijau), Pak Joko (berapron biru, berkumis, berpensil), Bu Wati (berapron ungu). Tanpa ZWJ.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  biruMuda: "#DBEAFE",
  lavender: "#EDE9FE",
  kuning: "#FDE68A",
  tinta: "#0F172A",
  kayu: "#D6B98C",
  kapur: "#14532D",
  /** Warna kartu tempat angka: ratusan hijau, puluhan biru, satuan merah. */
  kr: "#22C55E",
  kp: "#3B82F6",
  ks: "#EF4444",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  pembeli: "\u{1F9D1}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  kaget: "\u{1F632}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  kilau: "\u{2728}",
  lampu: "\u{1F4A1}",
  debu: "\u{1F4A8}",
  karung: "\u{1F6CD}\u{FE0F}",
  menunjuk: "\u{1F446}",
  tersenyum: "\u{1F642}",
} as const;

type Opsi = Partial<Obj>;
const r1 = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas (di bawah kanopi). */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 29, isi, 10.5, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Poligon tertutup dari titik-titik absolut (di kanvas). */
export const poligon = (id: string, pts: [number, number][], warna: string, garisW: string = W.biru, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: pts[0][0],
  y: pts[0][1],
  d: `M0 0 ${pts.slice(1).map(([a, b]) => `L${r1(a - pts[0][0])} ${r1(b - pts[0][1])}`).join(" ")} Z`,
  warna,
  garis: garisW,
  tebal: 1.4,
  ...o,
});

/* ------------------------------ Meja depan toko ------------------------------ */

/** Meja depan toko `${id}`: dinding krem, kanopi merah `${id}-a` bertulis TOKO PAK JOKO `${id}-p`, lantai kayu `${id}-l`. */
export const tokoDepan = (id: string, dinding = "#FFF7ED"): Obj[] => [
  kotak(id, 2, 2, 296, 166, dinding, "#94A3B8", { rx: 4, tebal: 1.2, z: -4 }),
  kotak(`${id}-a`, 2, 2, 296, 14, "#B91C1C", "#7F1D1D", { rx: 2, tebal: 1.2, z: -3 }),
  teks(`${id}-p`, 150, 12.5, "TOKO PAK JOKO", 7.5, W.putih, { z: -2 }),
  kotak(`${id}-l`, 2, 168, 296, 30, W.kayu, W.coklat, { rx: 3, tebal: 1.2, z: -3 }),
];
export const idToko = (id: string): string[] => [id, `${id}-a`, `${id}-p`, `${id}-l`];

/** Meja kayu panjang `${id}` (permukaan) dengan pojok kiri-atas (x, y). */
export const meja = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(id, x, y, w, 7, "#C08A4B", W.coklat, { rx: 2, tebal: 1.4, z: 0 }),
  kotak(`${id}-a`, r1(x + 6), y + 7, 5, 20, "#A16207", W.coklat, { rx: 1, tebal: 0.8, z: -1 }),
  kotak(`${id}-b`, r1(x + w - 11), y + 7, 5, 20, "#A16207", W.coklat, { rx: 1, tebal: 0.8, z: -1 }),
];
export const idMeja = (id: string): string[] => [id, `${id}-a`, `${id}-b`];

/** Etalase kaca `${id}` dengan tiga benda kecil di dalamnya; pojok kiri-atas (x, y). */
export const etalase = (id: string, x: number, y: number, w = 76, h = 52): Obj[] => [
  kotak(id, x, y, w, h, W.biruMuda, "#60A5FA", { rx: 3, tebal: 2, z: 0, op: 0.9 }),
  garis(`${id}-r`, r1(x + 3), r1(y + h * 0.55), w - 6, 0, "#93C5FD", 1.4, { z: 1 }),
  kotak(`${id}-i0`, r1(x + 8), r1(y + h * 0.55 - 12), 12, 12, "#F97316", W.biru, { rx: 2, tebal: 0.9, z: 1 }),
  kotak(`${id}-i1`, r1(x + 26), r1(y + h * 0.55 - 14), 12, 14, "#22C55E", W.biru, { rx: 2, tebal: 0.9, z: 1 }),
  kotak(`${id}-i2`, r1(x + 44), r1(y + h * 0.55 - 11), 14, 11, "#FACC15", W.biru, { rx: 2, tebal: 0.9, z: 1 }),
];
export const idEtalase = (id: string): string[] => [id, `${id}-r`, `${id}-i0`, `${id}-i1`, `${id}-i2`];

/** Mesin kasir tua `${id}` dengan layar `${id}-l` dan tiga tombol; pojok kiri-atas (x, y). */
export const kasir = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, r1(y + 10), 44, 24, "#94A3B8", W.tinta, { rx: 3, tebal: 1.4, z: 1 }),
  kotak(`${id}-l`, r1(x + 6), y, 32, 12, "#BBF7D0", W.tinta, { rx: 2, tebal: 1.2, z: 1 }),
  bulat(`${id}-b0`, r1(x + 10), r1(y + 22), 2.6, W.putih, W.tinta, { z: 2, tebal: 0.8 }),
  bulat(`${id}-b1`, r1(x + 22), r1(y + 22), 2.6, W.putih, W.tinta, { z: 2, tebal: 0.8 }),
  bulat(`${id}-b2`, r1(x + 34), r1(y + 22), 2.6, W.putih, W.tinta, { z: 2, tebal: 0.8 }),
];

/** Papan kapur hijau tua `${id}`; pojok kiri-atas (x, y). */
export const papanKapur = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, W.kapur, W.coklat, { rx: 4, tebal: 3, z: 0 }),
  kotak(`${id}-g`, r1(x + 6), y + h, w - 12, 3, "#A16207", W.coklat, { rx: 1, tebal: 0.8, z: 0 }),
];
export const idPapanKapur = (id: string): string[] => [id, `${id}-g`];

/* ------------------------------ Kartu angka dan label ------------------------------ */

export type Tempat = "r" | "p" | "s";
export const WARNA_TEMPAT: Record<Tempat, string> = { r: W.kr, p: W.kp, s: W.ks };
export const WARNA_TULIS: Record<Tempat, string> = { r: "#166534", p: "#1D4ED8", s: "#B91C1C" };

/** Kartu angka Montessori `${id}` (kotak berwarna) dan tulisannya `${id}-t`; pojok kiri-atas (x, y). */
export const kartuAngka = (id: string, x: number, y: number, isi: string, tempat: Tempat, w = 26, h = 34, u = 13): Obj[] => [
  kotak(id, x, y, w, h, WARNA_TEMPAT[tempat], W.biru, { rx: 3, tebal: 1.3, z: 2 }),
  teks(`${id}-t`, r1(x + w / 2), r1(y + h / 2 + u * 0.35), isi, u, W.putih, { z: 3 }),
];
export const idKartuAngka = (id: string): string[] => [id, `${id}-t`];

/**
 * Tumpukan `n` kartu `${id}0...` bertingkat ke atas (jarak `naik` antarkartu), kartu paling atas bertulis `isi` (`${id}-t`).
 * Pojok kiri-atas kartu terbawah di (x, y).
 */
export function tumpukKartu(id: string, x: number, y: number, n: number, tempat: Tempat, isi: string, naik = 4, w = 26, h = 30, u = 12): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < n; i += 1) out.push(kotak(`${id}${i}`, r1(x + (i % 2) * 1.2), r1(y - i * naik), w, h, WARNA_TEMPAT[tempat], W.biru, { rx: 3, tebal: 1.2, z: 2 + i * 0.01 }));
  out.push(teks(`${id}-t`, r1(x + w / 2), r1(y - (n - 1) * naik + h / 2 + u * 0.35), isi, u, W.putih, { z: 4 }));
  return out;
}
export const idTumpuk = (id: string, n: number): string[] => [...Array.from({ length: n }, (_, i) => `${id}${i}`), `${id}-t`];

/** Kotak kartu angka terbuka `${id}` dengan tulisan KARTU; pojok kiri-atas (x, y). */
export const kotakKartu = (id: string, x: number, y: number, w = 58, h = 26): Obj[] => [
  kotak(id, x, y, w, h, "#E7C98A", W.coklat, { rx: 4, tebal: 2, z: 1 }),
  teks(`${id}-t`, r1(x + w / 2), r1(y + h / 2 + 3), "KARTU", 8, W.coklat, { z: 2 }),
];

/** Label harga `${id}`: kotak putih dengan tulisan `isi` di tengah (`${id}-t`); pojok kiri-atas (x, y). */
export const labelHarga = (id: string, x: number, y: number, w: number, h: number, isi: string, u = 20, o: Opsi = {}): Obj[] => [
  kotak(id, x, y, w, h, W.putih, W.biru, { rx: 5, tebal: 2.4, z: 1, ...o }),
  teks(`${id}-t`, r1(x + w / 2), r1(y + h / 2 + u * 0.35), isi, u, W.biru, { z: 2, ...o }),
];

/** Satu angka besar `${id}` berwarna menurut tempatnya, titik tengah-bawah di (x, y). */
export const angka = (id: string, x: number, y: number, d: string, tempat: Tempat, u = 38, o: Opsi = {}): Obj => teks(id, x, y, d, u, WARNA_TULIS[tempat], { z: 3, ...o });

/** Tabel tiga tempat `${id}` dengan judul kolom Ratusan, Puluhan, Satuan (`${id}-h0..2`); pojok kiri-atas (x, y), lebar w, tinggi total h. */
export function tabelTempat(id: string, x: number, y: number, w: number, h: number, u = 7.4): Obj[] {
  const lebar = w / 3;
  const tinggiHead = 16;
  const nama = ["Ratusan", "Puluhan", "Satuan"];
  const tmp: Tempat[] = ["r", "p", "s"];
  const out: Obj[] = [kotak(`${id}-k`, x, y, w, h, W.putih, W.biru, { rx: 4, tebal: 2, z: 1 })];
  tmp.forEach((t, i) => {
    out.push(kotak(`${id}-c${i}`, r1(x + i * lebar), y, r1(lebar), tinggiHead, WARNA_TEMPAT[t], W.biru, { rx: 3, tebal: 1.2, z: 2 }));
    out.push(teks(`${id}-h${i}`, r1(x + i * lebar + lebar / 2), r1(y + tinggiHead / 2 + u * 0.35), nama[i], u, W.putih, { z: 3 }));
  });
  out.push(garis(`${id}-v1`, r1(x + lebar), r1(y + tinggiHead), 0, h - tinggiHead, W.abu, 1.2, { z: 1 }));
  out.push(garis(`${id}-v2`, r1(x + 2 * lebar), r1(y + tinggiHead), 0, h - tinggiHead, W.abu, 1.2, { z: 1 }));
  return out;
}
export const idTabelTempat = (id: string): string[] => [`${id}-k`, `${id}-c0`, `${id}-c1`, `${id}-c2`, `${id}-h0`, `${id}-h1`, `${id}-h2`, `${id}-v1`, `${id}-v2`];

/** Mesin pencetak label kecil `${id}`; pojok kiri-atas (x, y). */
export const mesinCetak = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 52, 24, "#94A3B8", W.tinta, { rx: 3, tebal: 1.6, z: 1 }),
  kotak(`${id}-c`, r1(x + 8), r1(y + 18), 36, 4, W.tinta, undefined, { rx: 1, z: 2 }),
  bulat(`${id}-b`, r1(x + 44), r1(y + 7), 3, "#F87171", W.tinta, { z: 2, tebal: 1 }),
];

/** Topi badut `${id}` berwarna-warni dengan pompom `${id}-p`; titik dasar tengah di (x, y). */
export const topiBadut = (id: string, x: number, y: number, s = 1): Obj[] => [
  poligon(id, [[r1(x - 12 * s), y], [r1(x + 12 * s), y], [x, r1(y - 26 * s)]], "#F472B6", W.biru, { z: 6, tebal: 1.2 }),
  poligon(`${id}-s`, [[r1(x - 7 * s), r1(y - 9 * s)], [r1(x + 7 * s), r1(y - 9 * s)], [r1(x + 4 * s), r1(y - 17 * s)], [r1(x - 4 * s), r1(y - 17 * s)]], "#FACC15", undefined, { z: 7, tebal: 0 }),
  bulat(`${id}-p`, x, r1(y - 27 * s), r1(3.4 * s), "#60A5FA", W.biru, { z: 8, tebal: 1 }),
];

/** Truk kuning kecil `${id}` menghadap kanan; pojok kiri-atas bak di (x, y). */
export const truk = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 40, 22, "#FDE047", W.biru, { rx: 3, tebal: 1.6, z: 1 }),
  kotak(`${id}-k`, r1(x + 40), r1(y + 7), 18, 15, "#FACC15", W.biru, { rx: 3, tebal: 1.6, z: 1 }),
  kotak(`${id}-j`, r1(x + 44), r1(y + 10), 10, 6, W.biruMuda, W.biru, { rx: 1, tebal: 0.9, z: 2 }),
  bulat(`${id}-r0`, r1(x + 10), r1(y + 24), 5, W.tinta, W.putih, { z: 3, tebal: 1 }),
  bulat(`${id}-r1`, r1(x + 46), r1(y + 24), 5, W.tinta, W.putih, { z: 3, tebal: 1 }),
];
export const idTruk = (id: string): string[] => [id, `${id}-k`, `${id}-j`, `${id}-r0`, `${id}-r1`];

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Bu Wati";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-kz`; Salsa berkepang `${id}-kp0`, `${id}-kp1` dan berkertas catatan `${id}-ct`;
 * Bima berkaus hijau `${id}-kz`; Pak Joko berapron biru `${id}-ap`, berkumis `${id}-km` dan berpensil `${id}-pn`; Bu Wati berapron ungu `${id}-ap` dan berkalung kartu `${id}-kl`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Raka") out.push(kotak(`${id}-kz`, x - 11, y + 4, 22, 10, W.ks, W.biru, { rx: 2, tebal: 1, z: 1 }));
  if (nama === "Bima") out.push(kotak(`${id}-kz`, x - 11, y + 4, 22, 10, W.kr, W.biru, { rx: 2, tebal: 1, z: 1 }));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-kp0`, x - 15, y + 3, 3.4, "#92400E", W.biru, { z: 0, tebal: 0.8 }));
    out.push(bulat(`${id}-kp1`, x + 15, y + 3, 3.4, "#92400E", W.biru, { z: 0, tebal: 0.8 }));
    out.push(kotak(`${id}-ct`, x + 13, y + 5, 10, 13, W.krem, W.coklat, { rx: 1.5, tebal: 1.1, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(kotak(`${id}-ap`, x - 12, y + 4, 24, 13, W.kp, W.biru, { rx: 2, tebal: 1, z: 1 }));
    out.push(garis(`${id}-km`, x - 7, y - 2, 14, 0, W.tinta, 2.2, { z: 2 }));
    out.push(garis(`${id}-pn`, x + 11, y - 12, 0, 8, "#FACC15", 2.2, { z: 2 }));
  }
  if (nama === "Bu Wati") {
    out.push(kotak(`${id}-ap`, x - 12, y + 4, 24, 13, "#A855F7", W.biru, { rx: 2, tebal: 1, z: 1 }));
    out.push(kotak(`${id}-kl`, x - 5, y + 7, 10, 7, W.putih, W.biru, { rx: 1, tebal: 0.8, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, r1(y + (nama === "Pak Joko" || nama === "Bu Wati" ? 25 : 13)), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-kz`] : []),
  ...(nama === "Salsa" ? [`${id}-kp0`, `${id}-kp1`, `${id}-ct`] : []),
  ...(nama === "Pak Joko" ? [`${id}-ap`, `${id}-km`, `${id}-pn`] : []),
  ...(nama === "Bu Wati" ? [`${id}-ap`, `${id}-kl`] : []),
];

/* ------------------------------ Pembantu tempat angka ------------------------------ */

/** Titik tengah tiga kolom pada tabelTempat(id, 40, y, 220, h). */
export const KOL = [76.7, 150, 223.3] as const;
/** Kotak tempat berwarna `${id}` dengan tulisan putih `${id}-t`; pojok kiri-atas (x, y). */
export const kotakTempat = (id: string, x: number, y: number, w: number, h: number, nama: string, tempat: Tempat, u = 8.5): Obj[] => [
  kotak(id, x, y, w, h, WARNA_TEMPAT[tempat], W.biru, { rx: 4, tebal: 1.3, z: 2 }),
  teks(`${id}-t`, r1(x + w / 2), r1(y + h / 2 + u * 0.35), nama, u, W.putih, { z: 3 }),
];
export const idKotakTempat = (id: string): string[] => [id, `${id}-t`];
/** Kartu angka lepas `${id}` (krem) dengan satu angka `${id}-t`; pojok kiri-atas (x, y). */
export const kartuLepas = (id: string, x: number, y: number, d: string, w = 40, h = 54, u = 34): Obj[] => [
  kotak(id, x, y, w, h, W.krem, W.biru, { rx: 5, tebal: 2, z: 2 }),
  teks(`${id}-t`, r1(x + w / 2), r1(y + h / 2 + u * 0.35), d, u, W.biru, { z: 3 }),
];

/** Kartu "cocok" hijau muda `${id}-k`, `${id}-t{i}` (dan tanda `${id}-ok`) di pojok kiri-atas (24, y), lebar 252. */
export const kartuCocok = (id: string, y: number, baris: string[], u = 10): Obj[] => [...kartu(id, 24, y, 252, 36, W.hijauMuda, baris, u, { z: 1 }), emo(`${id}-ok`, 262, y + 28, E.benar, 16, { z: 3 })];
/** Kartu "kurang cocok" merah muda `${id}-k`, `${id}-t{i}` (dan tanda `${id}-no`) di pojok kiri-atas (24, y), lebar 252. */
export const kartuKurang = (id: string, y: number, baris: string[], u = 10): Obj[] => [...kartu(id, 24, y, 252, 36, W.merahMuda, baris, u, { z: 1 }), emo(`${id}-no`, 262, y + 28, E.salah, 16, { z: 3 })];
