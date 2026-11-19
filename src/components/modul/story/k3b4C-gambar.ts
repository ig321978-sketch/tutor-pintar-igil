import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 4 Sub-Bab C "Lintasan Pak Samsul" (garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa lintasan lomba: lapangan rumput di tepi sawah, tenda panitia, tiang bendera, tali lintasan dengan patok oranye, kertas petak, pojok kertas lipat kuning,
 * panji segitiga, papan nama persegi panjang, spanduk bundar, layang-layang di langit, balon, dan konfeti.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (kaus biru, topi anyaman, berkumis, berpensil di telinga, bertermos),
 * Bu Ratih (bercaping, berpita merah di pinggang), Kak Anton (bertopi biru), Pak Samsul (berompi oranye dan berpeluit). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  oranye: "#EA580C",
  /** Warna tali lintasan: tali pertama oranye, tali kedua ungu (tidak berdekatan). */
  tali1: "#EA580C",
  tali2: "#7C3AED",
  kertas: "#FEF08A",
  kertasGaris: "#A16207",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  kak: "\u{1F9D1}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F604}",
  pikir: "\u{1F914}",
  kaget: "\u{1F632}",
  gerutu: "\u{1F624}",
  lega: "\u{1F605}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  bintang: "\u{2B50}",
  sorak: "\u{1F389}",
  balon: "\u{1F388}",
  jempol: "\u{1F44D}",
  layang: "\u{1FA81}",
  bendera: "\u{1F6A9}",
  padi: "\u{1F33E}",
  benang: "\u{1F9F5}",
  sikat: "\u{1F9F9}",
  kertas: "\u{1F4C4}",
  konfeti: "\u{1F38A}",
  peluit: "\u{1F4E3}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
/** Garis dari (x, y) dengan ujung relatif (x2, y2). */
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
/** Garis dari titik mutlak (x1, y1) ke (x2, y2). */
export const garisAbs = (id: string, x1: number, y1: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => garis(id, x1, y1, bulatkan(x2 - x1), bulatkan(y2 - y1), warna, tebal, o);
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

/* ------------------------------ Lapangan lomba ------------------------------ */
export const WL = {
  rumput: "#BBF7D0",
  rumputGaris: "#4ADE80",
  tanah: "#C08A4D",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  patok: "#F97316",
  patokTua: "#7C2D12",
  tenda: "#DC2626",
  tendaPutih: "#FFFFFF",
  petak: "#ECFDF5",
  petakGaris: "#86EFAC",
} as const;

/** Rumput lapangan `${id}` dari tinggi y sampai bawah kanvas, dua garis rumput `${id}-g1`, `${id}-g2`. */
export function rumput(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WL.rumput, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WL.rumputGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WL.rumputGaris, 1.4, { z: -2 })];
}
export const idRumput = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Barisan padi menguning di tepi lapangan: `${id}0`..`${id}{n-1}`. */
export function padi(id: string, y: number, dari = 20, jarak = 34, n = 8): Obj[] {
  return Array.from({ length: n }, (_, i) => emo(`${id}${i}`, dari + i * jarak, y, E.padi, 15, { z: -1 }));
}

/** Tenda panitia: atap segitiga `${id}-a`, badan `${id}-b`, tiang `${id}-t`. Pojok kiri-atas badan (x, y), lebar w. */
export function tenda(id: string, x: number, y: number, w = 70): Obj[] {
  return [
    poligon(`${id}-a`, [[x - 4, y], [bulatkan(x + w / 2), y - 22], [x + w + 4, y]], WL.tenda, "#7F1D1D", { tebal: 1.4, z: 1 }),
    kotak(`${id}-b`, x, y, w, 30, W.putih, "#7F1D1D", { rx: 1, tebal: 1.3, z: 0 }),
    kotak(`${id}-t`, bulatkan(x + w / 2 - 6), y + 10, 12, 20, "#FEE2E2", "#7F1D1D", { rx: 1, tebal: 1, z: 1 }),
  ];
}
export const idTenda = (id: string): string[] => [`${id}-a`, `${id}-b`, `${id}-t`];

/** Tiang bendera di atas tanah: tiang `${id}` dari (x, yTanah) setinggi h, bendera `${id}-b`. */
export function tiang(id: string, x: number, yTanah: number, h = 80): Obj[] {
  return [kotak(id, x - 2, yTanah - h, 4, h, WL.kayu, WL.kayuTua, { rx: 1, tebal: 1.2, z: 1 }), poligon(`${id}-b`, [[x + 2, yTanah - h], [x + 34, yTanah - h + 9], [x + 2, yTanah - h + 18]], W.merah, "#7F1D1D", { tebal: 1.2, z: 2 })];
}
export const idTiang = (id: string): string[] => [id, `${id}-b`];

/** Tali lintasan dari (x1, y1) ke (x2, y2): tali `${id}`, patok `${id}-p1` dan `${id}-p2`. */
export function tali(id: string, x1: number, y1: number, x2: number, y2: number, warna: string = W.tali1): Obj[] {
  return [garisAbs(id, x1, y1, x2, y2, warna, 3.2, { z: 1 }), bulat(`${id}-p1`, x1, y1, 4.4, WL.patok, WL.patokTua, { tebal: 1.2, z: 2 }), bulat(`${id}-p2`, x2, y2, 4.4, WL.patok, WL.patokTua, { tebal: 1.2, z: 2 })];
}
export const idTali = (id: string): string[] => [id, `${id}-p1`, `${id}-p2`];

/** Kertas petak: alas `${id}`, garis tegak `${id}-v1`.., garis datar `${id}-h1`... Pojok kiri-atas (x0, y0), `kol` x `bar` petak berukuran u. */
export function petakGrid(id: string, x0: number, y0: number, kol: number, bar: number, u: number): Obj[] {
  const out: Obj[] = [kotak(id, x0, y0, kol * u, bar * u, WL.petak, WL.petakGaris, { rx: 0, tebal: 1.2, z: -2 })];
  for (let i = 1; i < kol; i += 1) out.push(garis(`${id}-v${i}`, x0 + i * u, y0, 0, bar * u, WL.petakGaris, 0.8, { z: -1 }));
  for (let i = 1; i < bar; i += 1) out.push(garis(`${id}-h${i}`, x0, y0 + i * u, kol * u, 0, WL.petakGaris, 0.8, { z: -1 }));
  return out;
}
export function idPetak(id: string, kol: number, bar: number): string[] {
  return [id, ...Array.from({ length: kol - 1 }, (_, i) => `${id}-v${i + 1}`), ...Array.from({ length: bar - 1 }, (_, i) => `${id}-h${i + 1}`)];
}

/** Panah ukur tegak dua arah dari y1 ke y2 di x: `${id}-a` (ke atas) dan `${id}-b` (ke bawah). */
export function ukurTegak(id: string, x: number, y1: number, y2: number, warna: string = W.biru): Obj[] {
  const m = bulatkan((y1 + y2) / 2);
  return [panah(`${id}-a`, x, m, 0, bulatkan(y1 - m), warna, 1.8, { z: 3 }), panah(`${id}-b`, x, m, 0, bulatkan(y2 - m), warna, 1.8, { z: 3 })];
}
export const idUkur = (id: string): string[] => [`${id}-a`, `${id}-b`];

/** Pojok kertas lipat berbentuk persegi `s` dengan sudut kiri-bawah di (x, y): `${id}`. */
export const pojok = (id: string, x: number, y: number, s = 30, o: Opsi = {}): Obj =>
  poligon(id, [[x, y], [x + s, y], [x + s, y - s], [x, y - s]], W.kertas, W.kertasGaris, { tebal: 1.4, op: 0.85, z: 4, ...o });
/** Tanda siku-siku kecil (kotak tanpa isi) dengan sudut kiri-bawah di (x, y). */
export const tandaSiku = (id: string, x: number, y: number, s = 9): Obj => kotak(id, x, y - s, s, s, undefined, W.merah, { rx: 0, tebal: 1.6, z: 5 });

/** Panji segitiga: `${id}`. Titik atas-kiri (x, y), lebar w, tinggi h (menggantung ke bawah). */
export const panji = (id: string, x: number, y: number, w = 40, h = 44, warna: string = W.emas): Obj => poligon(id, [[x, y], [x + w, y], [bulatkan(x + w / 2), y + h]], warna, "#92400E", { tebal: 1.6, z: 2 });

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Bu Ratih" | "Kak Anton" | "Pak Samsul";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`, bertermos `${id}-th`;
 * Bu Ratih berbaju hijau `${id}-bj`, bercaping `${id}-tp`, berpita merah di pinggang `${id}-pt`; Kak Anton berkaus biru langit `${id}-bj` dan bertopi biru `${id}-tp`;
 * Pak Samsul berompi oranye `${id}-bj` dan berpeluit `${id}-pl`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.ungu): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" || nama === "Pak Samsul" ? E.pak : nama === "Kak Anton" ? E.kak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const topi = (warna: string, garisW: string, lebar = 20): Obj => kotak(`${id}-tp`, bulatkan(x - lebar / 2), bulatkan(y - u * 0.78), lebar, 6, warna, garisW, { rx: 2, tebal: 1, z: 2 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(topi("#D4A55A", "#92400E", 24));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.5), 0, 8, "#F59E0B", 2, { z: 2 }));
    out.push(kotak(`${id}-th`, x - 17, bulatkan(y + 4), 4, 9, "#94A3B8", "#475569", { rx: 1, tebal: 0.8, z: 2 }));
  }
  if (nama === "Bu Ratih") {
    out.push(baju("#16A34A", "#14532D", 12));
    out.push(topi("#E7C48F", "#92400E", 30));
    out.push(kotak(`${id}-pt`, x - 11, bulatkan(y + 11), 22, 3, "#DC2626", "#7F1D1D", { rx: 1, tebal: 0.8, z: 2 }));
  }
  if (nama === "Kak Anton") {
    out.push(baju("#0EA5E9", "#075985", 11));
    out.push(topi("#1D4ED8", "#1E3A8A", 22));
  }
  if (nama === "Pak Samsul") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(bulat(`${id}-pl`, x + 9, bulatkan(y + 4), 2.8, "#FBBF24", "#92400E", { tebal: 0.8, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Pak Samsul" ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" || nama === "Kak Anton" ? [`${id}-bj`] : []),
  ...(nama === "Kak Anton" ? [`${id}-tp`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`, `${id}-th`] : []),
  ...(nama === "Bu Ratih" ? [`${id}-bj`, `${id}-tp`, `${id}-pt`] : []),
  ...(nama === "Pak Samsul" ? [`${id}-bj`, `${id}-pl`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
