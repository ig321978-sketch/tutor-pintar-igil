import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya" (membaca dan menulis bilangan sampai sepuluh ribu), awal cerita Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa pulau: pantai berpasir, laut, dermaga kayu dengan perahu, penginapan beratap rumbia bertuliskan PENGINAPAN PULAU KARANG INDAH, loket tiket, papan pengumuman,
 * tiket bernomor, papan empat kotak (ribuan, ratusan, puluhan, satuan), sapu. Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci),
 * Pak Hendro (bertopi pantai, berpeluit, membawa tas kain), Bu Maya (berkerudung krem, membawa papan pengumuman), Pak Laode (bertopi caping; kecil di kejauhan). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  tanya: "#F59E0B",
  laut: "#7DD3FC",
  pasir: "#FDE68A",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  rumbia: "#CA8A04",
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
  pensil: "\u{270F}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  jari: "\u{261D}",
  tunjuk: "\u{1F446}",
  mata: "\u{1F440}",
  perahu: "\u{26F5}",
  tiket: "\u{1F3AB}",
  sapu: "\u{1F9F9}",
  megafon: "\u{1F4E2}",
  bintang: "\u{2B50}",
  pohon: "\u{1F334}",
  lampu: "\u{1F4A1}",
  ulang: "\u{1F501}",
  keringat: "\u{1F613}",
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

/* ------------------------------ Pulau dan penginapan ------------------------------ */
/** Laut `${id}-l` (dari tinggi y) dan pasir `${id}-s` (dari tinggi ys sampai bawah kanvas). */
export function pantai(id: string, y = 126, ys = 150): Obj[] {
  return [kotak(`${id}-l`, 2, y, 296, ys - y, W.laut, undefined, { rx: 0, tebal: 0, z: -3 }), kotak(`${id}-s`, 2, ys, 296, 200 - ys, W.pasir, undefined, { rx: 0, tebal: 0, z: -3 })];
}
export const idPantai = (id: string): string[] => [`${id}-l`, `${id}-s`];

/** Teras kayu `${id}` dari tinggi y sampai bawah kanvas, dengan dua papan `${id}-g1`, `${id}-g2`. */
export function teras(id: string, y = 150): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, "#E7C48F", undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 14, 292, 0, W.kayuTua, 0.8, { z: -2 }),
    garis(`${id}-g2`, 4, y + 32, 292, 0, W.kayuTua, 0.8, { z: -2 }),
  ];
}

/** Dermaga kayu `${id}` dengan dua tiang `${id}-p1`, `${id}-p2`. Pojok kiri-atas papan (x, y), lebar w. */
export function dermaga(id: string, x: number, y: number, w = 80): Obj[] {
  return [
    kotak(id, x, y, w, 7, W.kayu, W.kayuTua, { rx: 1, tebal: 1.2, z: 1 }),
    kotak(`${id}-p1`, x + 6, y + 7, 4, 14, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 0 }),
    kotak(`${id}-p2`, bulatkan(x + w - 10), y + 7, 4, 14, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 0 }),
  ];
}

/**
 * Penginapan beratap rumbia: dinding `${id}`, atap `${id}-a`, pintu `${id}-p`, papan nama `${id}-sn` bertulisan `${id}-s1` dan `${id}-s2`
 * (PENGINAPAN PULAU KARANG INDAH). Pojok kiri-atas dinding (x, y).
 */
export function penginapan(id: string, x: number, y: number, w = 120, h = 56): Obj[] {
  return [
    kotak(id, x, y, w, h, "#FEF3C7", W.kayuTua, { rx: 2, z: 0 }),
    poligon(`${id}-a`, [[x - 6, y], [bulatkan(x + w / 2), y - 26], [x + w + 6, y]], W.rumbia, "#713F12", { z: 1 }),
    kotak(`${id}-p`, bulatkan(x + w - 26), y + h - 28, 18, 28, W.kayu, W.kayuTua, { rx: 1, tebal: 1.2, z: 1 }),
    kotak(`${id}-sn`, bulatkan(x + 6), y + 4, bulatkan(w - 12), 17, W.putih, W.biru, { rx: 2, tebal: 1.2, z: 2 }),
    teks(`${id}-s1`, bulatkan(x + w / 2), y + 11, "PENGINAPAN", 5.6, W.biru, { z: 3 }),
    teks(`${id}-s2`, bulatkan(x + w / 2), y + 18, "PULAU KARANG INDAH", 4.6, W.biru, { z: 3 }),
  ];
}
export const idPenginapan = (id: string): string[] => [id, `${id}-a`, `${id}-p`, `${id}-sn`, `${id}-s1`, `${id}-s2`];

/** Loket tiket beratap rumbia: badan `${id}`, atap `${id}-a`, jendela `${id}-j`, tulisan `${id}-t`. Pojok kiri-atas badan (x, y). */
export function loket(id: string, x: number, y: number, w = 56, h = 40): Obj[] {
  return [
    kotak(id, x, y, w, h, "#FDE68A", W.kayuTua, { rx: 2, z: 0 }),
    poligon(`${id}-a`, [[x - 4, y], [bulatkan(x + w / 2), y - 16], [x + w + 4, y]], W.rumbia, "#713F12", { z: 1 }),
    kotak(`${id}-j`, bulatkan(x + 8), y + 15, bulatkan(w - 16), 20, "#BAE6FD", W.kayuTua, { rx: 1, tebal: 1.1, z: 1 }),
    teks(`${id}-t`, bulatkan(x + w / 2), y + 11, "LOKET", 6, W.biru, { z: 2 }),
  ];
}

/** Papan pengumuman kayu: bingkai `${id}`, kertas `${id}-p`, judul `${id}-j`. Pojok kiri-atas (x, y). */
export function papanPengumuman(id: string, x: number, y: number, w: number, h: number, isi = "PEMENANG"): Obj[] {
  return [
    kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }),
    kotak(`${id}-p`, x + 4, y + 4, w - 8, h - 8, "#FFFBEB", "#92400E", { rx: 2, tebal: 1, z: 0 }),
    teks(`${id}-j`, bulatkan(x + w / 2), y + 15, isi, 7.4, W.merah, { z: 1 }),
  ];
}
export const idPapanPengumuman = (id: string): string[] => [id, `${id}-p`, `${id}-j`];

/** Tiket bernomor: badan `${id}-k` (dua takik `${id}-c1`, `${id}-c2`), tulisan TIKET `${id}-t` dan nomor `${id}-n`. Pojok kiri-atas (x, y), tinggi 36. */
export function tiket(id: string, x: number, y: number, w: number, nomor: string, warna = "#FDBA74", u = 20): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, 36, warna, "#9A3412", { rx: 5, tebal: 1.5, z: 2 }),
    bulat(`${id}-c1`, x, bulatkan(y + 18), 4, "#FFFFFF", "#9A3412", { tebal: 1, z: 3 }),
    bulat(`${id}-c2`, x + w, bulatkan(y + 18), 4, "#FFFFFF", "#9A3412", { tebal: 1, z: 3 }),
    teks(`${id}-t`, bulatkan(x + w / 2), y + 9, "TIKET", 6.4, W.coklat, { z: 4 }),
    teks(`${id}-n`, bulatkan(x + w / 2), y + 30, nomor, u, W.biru, { z: 4 }),
  ];
}
export const idTiket = (id: string): string[] => [`${id}-k`, `${id}-c1`, `${id}-c2`, `${id}-t`, `${id}-n`];

/** Sapu: gagang `${id}` dan bulu `${id}-b`. Ujung atas (x, y); bulu di bawah. */
export function sapu(id: string, x: number, y: number): Obj[] {
  return [garis(id, x, y, -10, 34, W.kayuTua, 2.4, { z: 3 }), kotak(`${id}-b`, x - 18, y + 32, 16, 8, "#EAB308", W.coklat, { rx: 2, tebal: 1, z: 3 })];
}
export const idSapu = (id: string): string[] => [id, `${id}-b`];

/* ------------------------------ Papan empat kotak ------------------------------ */
export const TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
/** Pojok kiri-atas kotak ke-i pada papan yang dimulai di x0 (lebar kotak w, celah 4). */
export const xKotak = (i: number, x0: number, w = 40): number => x0 + i * (w + 4);

/** Empat kotak `${id}-b{i}` dengan latar `${id}-bg`; label tempat `${id}-l{i}` (bila `label`). Pojok kiri-atas papan (x0, y), kotak berlebar w dan bertinggi h. */
export function papanKotak(id: string, x0: number, y: number, o: { w?: number; h?: number; label?: boolean; warna?: string } = {}): Obj[] {
  const w = o.w ?? 40;
  const h = o.h ?? 44;
  return [
    kotak(`${id}-bg`, x0 - 4, y - 4, 4 * (w + 4) + 4, h + 8, "#FDE68A", W.coklat, { rx: 6, tebal: 1.6, z: -1 }),
    ...[0, 1, 2, 3].map((i) => kotak(`${id}-b${i}`, xKotak(i, x0, w), y, w, h, o.warna ?? "#FFFFFF", W.coklat, { rx: 4, tebal: 1.4, z: 0 })),
    ...(o.label === false ? [] : [0, 1, 2, 3].map((i) => labelTempat(id, i, x0, y, w))),
  ];
}
/** Label tempat ke-i di atas kotak ke-i. */
export const labelTempat = (id: string, i: number, x0: number, y: number, w = 40): Obj => teks(`${id}-l${i}`, bulatkan(xKotak(i, x0, w) + w / 2), y - 6, TEMPAT[i], 6.4, W.coklat, { z: 2 });
/** Angka `n` di kotak ke-i. */
export const angkaKotak = (id: string, i: number, n: number | string, x0: number, y: number, o: { w?: number; h?: number; u?: number; warna?: string } = {}): Obj =>
  teks(`${id}-d${i}`, bulatkan(xKotak(i, x0, o.w ?? 40) + (o.w ?? 40) / 2), bulatkan(y + (o.h ?? 44) / 2 + (o.u ?? 22) * 0.35), String(n), o.u ?? 22, o.warna ?? W.biru, { z: 2 });
export const idPapanKotak = (id: string): string[] => [`${id}-bg`, ...[0, 1, 2, 3].flatMap((i) => [`${id}-b${i}`, `${id}-l${i}`])];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Maya" | "Pak Laode";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, membawa kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro berkaus hijau `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl` dan membawa tas kain `${id}-ts`;
 * Bu Maya berkerudung krem `${id}-kr` dan membawa papan pengumuman `${id}-pp`; Pak Laode (kecil) bertopi caping `${id}-cp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Laode" ? E.pak : E.bu;
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
  if (nama === "Bu Maya") {
    out.push(kotak(`${id}-kr`, x - 10, bulatkan(y - u * 0.8), 20, 7, "#E7D3A8", "#92400E", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pp`, x + 11, bulatkan(y + 1), 10, 8, "#8B5A2B", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Laode") out.push(poligon(`${id}-cp`, [[bulatkan(x - 11), bulatkan(y - u * 0.62)], [x, bulatkan(y - u * 0.98)], [bulatkan(x + 11), bulatkan(y - u * 0.62)]], "#D4A55A", "#92400E", { z: 2 }));
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Laode" ? 18 : 15)), nama, nama === "Pak Laode" ? 6.4 : 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-k1`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Maya" ? [`${id}-kr`, `${id}-pp`] : []),
  ...(nama === "Pak Laode" ? [`${id}-cp`] : []),
];

/* ------------------------------ Papan kapur dan deret kartu angka (video metode global) ------------------------------ */
export const K = { papan: "#14532D", kapur: "#FEF9C3", kapurMerah: "#FCA5A5", kapurBiru: "#BAE6FD" };

/** Papan tulis hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanTulis(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, K.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanTulis = (id: string): string[] => [id, `${id}-p`];

/** Pojok kiri kartu ke-i pada deret empat kartu (lebar 44, jarak 52). */
export const xKartu = (i: number): number => 55 + i * 52;
/** Kartu angka kosong ke-i `${id}k{i}` pada tinggi y (tinggi 40). */
export const kartuKosong = (id: string, i: number, y = 100, warna = "#FFFFFF"): Obj => kotak(`${id}k${i}`, xKartu(i), y, 44, 40, warna, W.biru, { rx: 6, z: 2 });
/** Angka `n` pada kartu ke-i `${id}a{i}`. */
export const angkaKartu = (id: string, i: number, n: string | number, y = 100, u = 22, warna: string = W.biru): Obj => teks(`${id}a${i}`, xKartu(i) + 22, y + 28, String(n), u, warna, { z: 3 });
/** Nama tempat di bawah kartu ke-i `${id}l{i}`. */
export const namaKartu = (id: string, i: number, y = 152, warna: string = K.kapur): Obj => teks(`${id}l${i}`, xKartu(i) + 22, y, TEMPAT[i], 7, warna, { z: 3 });
