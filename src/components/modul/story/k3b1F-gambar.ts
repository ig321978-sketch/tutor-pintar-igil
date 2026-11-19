import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab F "Telur Bu Mirna" (perkalian sampai seratus), cerita Toko Kelontong Pak Joko.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa toko: dinding krem dan lantai ubin, meja depan berkaki, rak kayu bertingkat, papan nama TOKO PAK JOKO, kotak telur karton, telur cokelat, botol kecap,
 * kaleng, pensil, garis bilangan berbusur, tanda hari jadi. Tokoh: Raka (👦 berkaus merah), Salsa (👧 berkepang dua), Bima (🧒 berkaus hijau),
 * Pak Joko (👨 berapron biru, berkumis, pensil di telinga; digambar), Bu Mirna (👩 bercaping, keranjang telur; digambar). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  bu: "\u{1F469}",
  pak: "\u{1F468}",
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
  tepuk: "\u{1F44F}",
  sorak: "\u{1F389}",
  debu: "\u{1F4A8}",
  kilau: "\u{2728}",
  lap: "\u{1F9FD}",
  putar: "\u{1F504}",
  seru: "\u{2757}",
  jempol: "\u{1F44D}",
  kilat: "\u{26A1}",
  tukar: "\u{21C4}",
  telur: "\u{1F95A}",
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
/** Busur lompatan dari x1 ke x2 pada tinggi y, setinggi h. */
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
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Warna toko ------------------------------ */
export const WP = {
  lantai: "#E8D5B0",
  ubin: "#D2BC8F",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  meja: "#C98B52",
  karton: "#E9C98E",
  kartonTua: "#A97B3F",
  telur: "#D9A066",
  telurTua: "#8A4B1F",
  botol: "#7C2D12",
  kaleng: "#B91C1C",
  caping: "#EAB308",
  capingTua: "#854D0E",
  apron: "#2563EB",
  apronTua: "#1E3A8A",
  papan: "#FEF3C7",
  kertas: "#FFFFFF",
} as const;

/** Lantai ubin `${id}` dari tinggi y sampai bawah kanvas, dua garis ubin `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, WP.lantai, undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 14, 292, 0, WP.ubin, 2, { z: -2 }),
    garis(`${id}-g2`, 4, y + 32, 292, 0, WP.ubin, 2, { z: -2 }),
  ];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Meja depan toko: papan atas `${id}` dan dua kaki `${id}-a`, `${id}-b`. Pojok kiri-atas (x, y), lebar w. */
export const meja = (id: string, x: number, y: number, w: number, tinggi = 46): Obj[] => [
  kotak(id, x, y, w, 7, WP.meja, WP.kayuTua, { rx: 2, tebal: 1.6, z: 1 }),
  kotak(`${id}-a`, x + 5, y + 7, 5, tinggi - 7, WP.kayu, WP.kayuTua, { rx: 1, tebal: 1.2, z: 0 }),
  kotak(`${id}-b`, x + w - 10, y + 7, 5, tinggi - 7, WP.kayu, WP.kayuTua, { rx: 1, tebal: 1.2, z: 0 }),
];
export const idMeja = (id: string): string[] => [id, `${id}-a`, `${id}-b`];

/** Rak kayu bertingkat `tingkat`: kerangka `${id}` dan papan tingkat `${id}-t{i}`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function rakKayu(id: string, x: number, y: number, w: number, h: number, tingkat: number): Obj[] {
  const out: Obj[] = [kotak(id, x, y, w, h, "#F5E6CF", WP.kayuTua, { rx: 2, tebal: 2, z: -1 })];
  for (let i = 1; i <= tingkat; i += 1) out.push(kotak(`${id}-t${i}`, x, bulatkan(y + (h * i) / tingkat - 2), w, 3.4, WP.kayu, WP.kayuTua, { rx: 1, tebal: 1, z: 1 }));
  return out;
}
export const idRak = (id: string, tingkat: number): string[] => [id, ...Array.from({ length: tingkat }, (_, i) => `${id}-t${i + 1}`)];

/** Papan nama: papan `${id}` dan tulisan `${id}-t`. Pojok kiri-atas (x, y). */
export const papan = (id: string, x: number, y: number, w: number, h: number, isi: string, warna: string = WP.papan, huruf = 8): Obj[] => [
  kotak(id, x, y, w, h, warna, W.coklat, { rx: 3, tebal: 1.6, z: 0 }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + huruf * 0.36, isi, huruf, W.merah, { z: 1 }),
];
export const idPapan = (id: string): string[] => [id, `${id}-t`];

/* ------------------------------ Benda isi ------------------------------ */
/** Satu telur cokelat berpusat di (cx, cy): `${id}`. */
export const telur = (id: string, cx: number, cy: number, r = 4.4): Obj => bulat(id, cx, cy, r, WP.telur, WP.telurTua, { tebal: 1, z: 3 });
export type Jenis = "telur" | "botol" | "kaleng" | "pensil";
const WARNA_PENSIL = ["#DC2626", "#2563EB", "#16A34A", "#F59E0B", "#7C3AED"];
/** Satu benda jenis tertentu berpusat di (cx, cy). Bagian: `${id}` dan (botol) `${id}-n`. Lebar sekitar 2 r. */
export function benda(id: string, cx: number, cy: number, jenis: Jenis, r = 4.4, i = 0): Obj[] {
  if (jenis === "telur") return [telur(id, cx, cy, r)];
  if (jenis === "botol")
    return [
      kotak(id, bulatkan(cx - r * 0.8), bulatkan(cy - r * 0.9), r * 1.6, r * 2.1, WP.botol, "#431407", { rx: 1.2, tebal: 0.9, z: 3 }),
      kotak(`${id}-n`, bulatkan(cx - r * 0.35), bulatkan(cy - r * 1.7), r * 0.7, r * 0.9, "#451A03", "#431407", { rx: 0.6, tebal: 0.8, z: 3 }),
    ];
  if (jenis === "kaleng") return [kotak(id, bulatkan(cx - r), bulatkan(cy - r), r * 2, r * 2, WP.kaleng, "#7F1D1D", { rx: 1.6, tebal: 1, z: 3 })];
  return [garis(id, cx, bulatkan(cy - r * 1.5), 0, r * 3, WARNA_PENSIL[i % WARNA_PENSIL.length], 2.2, { z: 3 })];
}
export const idBenda = (id: string, jenis: Jenis): string[] => (jenis === "botol" ? [id, `${id}-n`] : [id]);

/** Letak pusat `n` benda dalam kotak berkolom `kol` yang pojok kiri-atasnya (x, y), jarak antar benda `s`. */
export const letakIsi = (x: number, y: number, n: number, kol: number, s: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => [bulatkan(x + 3 + (i % kol) * s + s / 2), bulatkan(y + 3 + Math.floor(i / kol) * s + s / 2)] as [number, number]);

/**
 * Satu kotak karton `${id}` berisi `n` benda `${id}-e{i}` (jenis `jenis`), pojok kiri-atas (x, y), `kol` kolom, jarak s.
 * Lebar kotak = kol * s + 6, tinggi = baris * s + 6.
 */
export function kotakIsi(id: string, x: number, y: number, n: number, kol: number, s: number, jenis: Jenis = "telur", warna: string = WP.karton): Obj[] {
  const baris = Math.ceil(n / kol);
  const out: Obj[] = [kotak(id, x, y, kol * s + 6, baris * s + 6, warna, WP.kartonTua, { rx: 3, tebal: 1.4, z: 1 })];
  letakIsi(x, y, n, kol, s).forEach(([cx, cy], i) => out.push(...benda(`${id}-e${i}`, cx, cy, jenis, s * 0.4, i)));
  return out;
}
export const idKotakIsi = (id: string, n: number, jenis: Jenis = "telur"): string[] => [id, ...Array.from({ length: n }, (_, i) => idBenda(`${id}-e${i}`, jenis)).flat()];

/** Garis bilangan `${id}` dari x0 sampai x1 pada tinggi y. */
export const garisBilangan = (id: string, x0: number, x1: number, y: number): Obj => garis(id, x0, y, x1 - x0, 0, W.biru, 2.4, { z: 1 });
/** Tanda angka pada garis bilangan: garis kecil `${id}` dan angka `${id}-n` di bawahnya. */
export const tanda = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.merah): Obj[] => [garis(id, x, y - 4, 0, 8, W.biru, 1.8), teks(`${id}-n`, x, y + 17, isi, u, warna)];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Bu Mirna";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-kl` `${id}-kr`; Bima berkaus hijau `${id}-bj`;
 * Pak Joko berapron biru `${id}-ap`, berkumis `${id}-km`, pensil di telinga `${id}-ps`; Bu Mirna bercaping `${id}-cp` dan membawa keranjang telur `${id}-kj` `${id}-tl`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Raka") out.push(kotak(`${id}-bj`, x - 10, bulatkan(y + 2), 20, 9, "#DC2626", "#7F1D1D", { rx: 3, tebal: 1.2, z: 0 }));
  if (nama === "Bima") out.push(kotak(`${id}-bj`, x - 10, bulatkan(y + 2), 20, 9, "#16A34A", "#14532D", { rx: 3, tebal: 1.2, z: 0 }));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-kl`, x - 13, bulatkan(y + 1), 3.2, "#78350F", "#451A03", { tebal: 0.8, z: 0 }));
    out.push(bulat(`${id}-kr`, x + 13, bulatkan(y + 1), 3.2, "#78350F", "#451A03", { tebal: 0.8, z: 0 }));
  }
  if (nama === "Pak Joko") {
    out.push(kotak(`${id}-ap`, x - 9, bulatkan(y + 2), 18, 11, WP.apron, WP.apronTua, { rx: 3, tebal: 1.2, z: 0 }));
    out.push(kotak(`${id}-km`, x - 5, bulatkan(y - 3), 10, 2.4, "#1F2937", "#0F172A", { rx: 1, tebal: 0.6, z: 2 }));
    out.push(garis(`${id}-ps`, x + 11, bulatkan(y - 8), 0, 9, "#F59E0B", 2, { z: 2 }));
  }
  if (nama === "Bu Mirna") {
    out.push(poligon(`${id}-cp`, [[x - 14, bulatkan(y - u * 0.5)], [x, bulatkan(y - u * 0.95)], [x + 14, bulatkan(y - u * 0.5)]], WP.caping, WP.capingTua, { z: 2, tebal: 1.2 }));
    out.push(kotak(`${id}-kj`, x + 12, bulatkan(y + 3), 14, 9, "#B45309", "#78350F", { rx: 2, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-tl`, x + 17, bulatkan(y + 2), 2.6, WP.telur, WP.telurTua, { tebal: 0.7, z: 3 }));
    out.push(bulat(`${id}-tm`, x + 22, bulatkan(y + 2), 2.6, WP.telur, WP.telurTua, { tebal: 0.7, z: 3 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 15), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-kl`, `${id}-kr`] : []),
  ...(nama === "Pak Joko" ? [`${id}-ap`, `${id}-km`, `${id}-ps`] : []),
  ...(nama === "Bu Mirna" ? [`${id}-cp`, `${id}-kj`, `${id}-tl`, `${id}-tm`] : []),
];
