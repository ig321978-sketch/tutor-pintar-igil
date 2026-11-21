import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab A "Kain Lipat Bu Wulan" (pecahan berpembilang satu, membandingkan, garis pecahan), awal cerita Sanggar Batik Kampung Mekar.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa sanggar: halaman dengan tali jemuran dan kain putih, papan nama SANGGAR BATIK KAMPUNG MEKAR, meja malam dengan canting, panci malam di atas tungku,
 * kain terlipat bagian sama besar (bagian berarsir ungu), pecahan bersusun, garis pecahan dari nol sampai satu dengan jepitan kain. Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku),
 * Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, membawa tas kain), Bu Wulan (berkerudung ungu, memegang canting), Pak Joyo (berapron cokelat; kecil di kejauhan). Tanpa ZWJ, emoji paling tinggi U+1FA95.
 * Bagian kain bernama `id-c{nomor}` supaya uji bisa menghitung ulang banyak bagian, lebar, dan arsirannya dari gambar.
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
  unguTua: "#5B21B6",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  oranye: "#F97316",
  tanya: "#F59E0B",
  tanah: "#E7D9B6",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  kain: "#FFFFFF",
  arsir: "#C4B5FD",
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
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  jari: "\u{261D}",
  mata: "\u{1F440}",
  megafon: "\u{1F4E2}",
  bunga: "\u{1F338}",
  api: "\u{1F525}",
  benang: "\u{1F9F5}",
  gunting: "\u{2702}",
  keringat: "\u{1F613}",
  bintang: "\u{2B50}",
  lampu: "\u{1F4A1}",
  tertawa: "\u{1F602}",
  ulang: "\u{1F501}",
  kuat: "\u{1F4AA}",
  uap: "\u{1F4A8}",
  senja: "\u{1F307}",
  bicara: "\u{1F4AC}",
} as const;

type Opsi = Partial<Obj>;
export const bulatkan = (n: number): number => Math.round(n * 10) / 10;

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

/* ------------------------------ Sanggar ------------------------------ */
/** Tanah halaman `${id}` dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.tanah, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Serambi kayu `${id}` dari tinggi y sampai bawah kanvas, dengan dua papan `${id}-g1`, `${id}-g2`. */
export function serambi(id: string, y = 150): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, "#E7C48F", undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 14, 292, 0, W.kayuTua, 0.8, { z: -2 }),
    garis(`${id}-g2`, 4, y + 32, 292, 0, W.kayuTua, 0.8, { z: -2 }),
  ];
}

/** Papan nama kayu: bingkai `${id}`, tulisan `${id}-s1` (SANGGAR BATIK) dan `${id}-s2` (KAMPUNG MEKAR). Pojok kiri-atas (x, y), lebar w. */
export function papanNama(id: string, x: number, y: number, w = 120): Obj[] {
  return [
    kotak(id, x, y, w, 34, "#FEF3C7", W.kayuTua, { rx: 4, tebal: 2, z: 1 }),
    teks(`${id}-s1`, bulatkan(x + w / 2), y + 14, "SANGGAR BATIK", 8, W.ungu, { z: 2 }),
    teks(`${id}-s2`, bulatkan(x + w / 2), y + 26, "KAMPUNG MEKAR", 8, W.coklat, { z: 2 }),
  ];
}
export const idPapanNama = (id: string): string[] => [id, `${id}-s1`, `${id}-s2`];

/** Tali jemuran: tiang `${id}-p1`, `${id}-p2` dan tali `${id}-tl` pada tinggi y dari x1 sampai x2. */
export function taliJemuran(id: string, x1: number, x2: number, y: number): Obj[] {
  return [
    kotak(`${id}-p1`, x1 - 2, y - 2, 4, 52, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 0 }),
    kotak(`${id}-p2`, x2 - 2, y - 2, 4, 52, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 0 }),
    garis(`${id}-tl`, x1, y, x2 - x1, 0, W.kayuTua, 1.6, { z: 1 }),
  ];
}
/** Kain tergantung `${id}` di bawah tali: pojok kiri-atas (x, y), lebar w, tinggi h. */
export const kainGantung = (id: string, x: number, y: number, w: number, h: number, warna: string = W.kain): Obj => kotak(id, x, y, w, h, warna, W.ungu, { rx: 1, tebal: 1.2, z: 2 });

/** Canting: gagang `${id}` dan ujung malam `${id}-m`. Ujung bawah gagang (x, y). */
export function canting(id: string, x: number, y: number): Obj[] {
  return [garis(id, x, y, 14, -14, W.kayuTua, 2.4, { z: 3 }), bulat(`${id}-m`, x, y, 2.6, W.emas, W.coklat, { tebal: 0.8, z: 4 })];
}

/** Panci malam di atas tungku: panci `${id}`, malam `${id}-m`, tungku `${id}-t`. Pojok kiri-atas panci (x, y), lebar 34. */
export function panciMalam(id: string, x: number, y: number): Obj[] {
  return [
    kotak(id, x, y, 34, 20, "#78350F", "#451A03", { rx: 3, z: 2 }),
    kotak(`${id}-m`, x + 4, y + 3, 26, 6, W.emas, W.coklat, { rx: 2, tebal: 0.8, z: 3 }),
    kotak(`${id}-t`, x - 4, y + 20, 42, 12, "#9CA3AF", "#374151", { rx: 2, z: 1 }),
  ];
}
export const idPanciMalam = (id: string): string[] => [id, `${id}-m`, `${id}-t`];

/* ------------------------------ Kain terlipat dan pecahan ------------------------------ */
/**
 * Kain terbagi n bagian sama besar: bingkai `${id}`, bagian `${id}-c{i}` (mulai nol; berarsir ungu muda bila nomornya ada di `arsir`).
 * Pojok kiri-atas (x, y), lebar total w, tinggi h. Lebar tiap bagian persis w / n.
 */
export function bagianKain(id: string, x: number, y: number, w: number, h: number, n: number, arsir: number[] = [0]): Obj[] {
  const lebar = bulatkan(w / n);
  return [
    kotak(id, x, y, w, h, W.kain, W.ungu, { rx: 2, tebal: 2, z: 1 }),
    ...Array.from({ length: n }, (_, i) => kotak(`${id}-c${i}`, bulatkan(x + i * lebar), y, lebar, h, arsir.includes(i) ? W.arsir : W.kain, W.ungu, { rx: 0, tebal: 1.2, z: 2 })),
  ];
}
export const idBagianKain = (id: string, n: number): string[] => [id, ...Array.from({ length: n }, (_, i) => `${id}-c${i}`)];

/** Pecahan bersusun: pembilang `${id}-a`, garis `${id}-g`, penyebut `${id}-b`; pusat (x, cy). */
export function pecahan(id: string, x: number, cy: number, bawah: string | number, u = 14, warna: string = W.biru, atas: string | number = 1): Obj[] {
  return [
    teks(`${id}-a`, x, cy - 3, String(atas), u, warna, { z: 5 }),
    garis(`${id}-g`, bulatkan(x - u * 0.6), cy, bulatkan(u * 1.2), 0, warna, 1.8, { z: 5 }),
    teks(`${id}-b`, x, cy + u, String(bawah), u, warna, { z: 5 }),
  ];
}
export const idPecahan = (id: string): string[] => [`${id}-a`, `${id}-g`, `${id}-b`];

/** Garis dari nol sampai satu: tali `${id}-l`, tanda `${id}-t{i}` (n + 1 tanda; n = 0 berarti hanya nol dan satu), angka `${id}-n0` dan `${id}-n1`. */
export function garisBil(id: string, x0: number, y: number, lebar: number, n = 0, warna: string = W.kayuTua): Obj[] {
  const bagian = n === 0 ? 1 : n;
  return [
    garis(`${id}-l`, x0 - 6, y, lebar + 12, 0, warna, 2.6, { z: 1 }),
    ...Array.from({ length: bagian + 1 }, (_, i) => garis(`${id}-t${i}`, bulatkan(x0 + (i * lebar) / bagian), y - 5, 0, 10, W.ungu, 1.6, { z: 2 })),
    teks(`${id}-n0`, x0, y + 18, "0", 10, W.biru, { z: 2 }),
    teks(`${id}-n1`, x0 + lebar, y + 18, "1", 10, W.biru, { z: 2 }),
  ];
}
/** Jepitan kain `${id}` yang menggantung pada garis di x (puncaknya y). */
export const jepitan = (id: string, x: number, y: number): Obj => kotak(id, bulatkan(x - 3), y - 9, 6, 14, "#FACC15", W.coklat, { rx: 1.5, tebal: 1, z: 4 });

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Wulan" | "Pak Joyo";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, membawa kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro berkaus hijau `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl` dan membawa tas kain `${id}-ts`;
 * Bu Wulan berkerudung ungu `${id}-kr` dan memegang canting `${id}-ct`; Pak Joyo berapron cokelat `${id}-ap` dan berkopiah `${id}-pc`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Joyo" ? E.pak : E.bu;
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
  if (nama === "Bu Wulan") {
    out.push(kotak(`${id}-kr`, x - 10, bulatkan(y - u * 0.8), 20, 7, "#7C3AED", "#4C1D95", { rx: 3, tebal: 1, z: 2 }));
    out.push(garis(`${id}-ct`, x + 12, bulatkan(y + 8), 9, -9, W.kayuTua, 2, { z: 2 }));
  }
  if (nama === "Pak Joyo") {
    out.push(baju("#92400E", "#451A03", 12));
    out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.78), 16, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Joyo" ? 18 : 15)), nama, nama === "Pak Joyo" ? 6.4 : 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-k1`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Wulan" ? [`${id}-kr`, `${id}-ct`] : []),
  ...(nama === "Pak Joyo" ? [`${id}-bj`, `${id}-pc`] : []),
];

/* ------------------------------ Papan kapur (video metode global) ------------------------------ */
export const K = { papan: "#14532D", kapur: "#FEF9C3", kapurMerah: "#FCA5A5", kapurBiru: "#BAE6FD" };

/** Papan tulis hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanTulis(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, K.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanTulis = (id: string): string[] => [id, `${id}-p`];
