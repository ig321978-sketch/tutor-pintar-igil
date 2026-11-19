import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman" (pengurangan bersusun sampai seribu), cerita Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: dermaga kayu di tepi laut, perahu, koper, sandal dalam ember berbusa, papan susun tiga tempat angka (ratusan, puluhan, satuan), garis lompatan, kartu bilangan.
 * Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (topi pantai, berpeluit, bertas kain),
 * Pak Usman (petugas dermaga berseragam putih, berpeluit, berpapan jepit), Bu Marni (bercaping lebar). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  langit: "#DBEAFE",
  hijauMuda: "#DCFCE7",
  merahMuda: "#FECACA",
  laut: "#BAE6FD",
  kayu: "#C99A63",
  kayuTua: "#6B4423",
  /** Papan tulis: hijau tua, kapur krem dan merah muda. */
  papan: "#14532D",
  kapur: "#FEF9C3",
  kapurMerah: "#FCA5A5",
  pasir: "#FDE68A",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  mendesah: "\u{1F625}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  tangan: "\u{270B}",
  gelengan: "\u{1F645}",
  perahu: "\u{26F5}",
  perahuKecil: "\u{1F6F6}",
  sandal: "\u{1F461}",
  koper: "\u{1F9F3}",
  mata: "\u{1F440}",
  ulang: "\u{1F501}",
  lampu: "\u{1F4A1}",
  pohon: "\u{1F334}",
  jempol: "\u{1F44D}",
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
/** Kartu bilangan `${id}-k` bertuliskan `${id}-t0`: kotak putih 46 x 36, angka besar. Pojok kiri-atas (x, y). */
export function kartuBil(id: string, x: number, y: number, n: number | string, warna = "#FFFFFF", w = 46, h = 36, u = 18): Obj[] {
  return kartu(id, x, y, w, h, warna, [String(n)], u, { z: 2 });
}

/* ------------------------------ Dermaga, laut, ember ------------------------------ */
/** Laut `${id}` setinggi `tinggi` mulai y, dua gelombang `${id}-g1`, `${id}-g2`. */
export function laut(id: string, y = 120, tinggi = 196 - y): Obj[] {
  return [kotak(id, 2, y, 296, tinggi, W.laut, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 8, y + 14, 90, 0, "#7DD3FC", 1.6, { z: -2, putus: true }), garis(`${id}-g2`, 150, y + Math.min(30, tinggi - 8), 120, 0, "#7DD3FC", 1.6, { z: -2, putus: true })];
}
/** Pasir `${id}` dari tinggi y sampai bawah kanvas. */
export const pasir = (id: string, y = 104): Obj => kotak(id, 2, y, 296, 196 - y, W.pasir, undefined, { rx: 0, tebal: 0, z: -4 });
/** Papan tulis hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanTulis(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, W.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
/** Dermaga kayu `${id}` (lantai papan) dengan tiang `${id}-t1`, `${id}-t2`. Pojok kiri-atas (x, y), lebar w. */
export function dermaga(id: string, x: number, y: number, w = 150): Obj[] {
  return [kotak(id, x, y, w, 10, W.kayu, W.kayuTua, { rx: 1, tebal: 1.2, z: 0 }), kotak(`${id}-t1`, x + 8, y + 10, 6, 26, W.kayuTua, undefined, { rx: 1, tebal: 0, z: -1 }), kotak(`${id}-t2`, x + w - 14, y + 10, 6, 26, W.kayuTua, undefined, { rx: 1, tebal: 0, z: -1 })];
}
/** Ember `${id}` berisi busa: badan `${id}`, busa `${id}-b1`, `${id}-b2`, `${id}-b3`. Pojok kiri-atas (x, y). */
export function ember(id: string, x: number, y: number): Obj[] {
  return [
    kotak(id, x, y, 34, 24, "#60A5FA", "#1E3A8A", { rx: 4, tebal: 1.4, z: 1 }),
    bulat(`${id}-b1`, x + 8, y - 1, 5, "#FFFFFF", "#93C5FD", { tebal: 1, z: 2 }),
    bulat(`${id}-b2`, x + 18, y - 4, 6, "#FFFFFF", "#93C5FD", { tebal: 1, z: 2 }),
    bulat(`${id}-b3`, x + 27, y - 1, 5, "#FFFFFF", "#93C5FD", { tebal: 1, z: 2 }),
  ];
}
export const idEmber = (id: string): string[] => [id, `${id}-b1`, `${id}-b2`, `${id}-b3`];

/* ------------------------------ Papan susun tiga tempat angka ------------------------------ */
const WARNA_KOLOM = [W.langit, W.hijauMuda, W.merahMuda] as const;
const NAMA_KOLOM = ["Ratusan", "Puluhan", "Satuan"] as const;
/** Digit [ratusan, puluhan, satuan] bilangan sampai 999. */
export const digit3 = (n: number): [number, number, number] => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];

/**
 * Papan susun: kepala tiga tempat angka (kotak `${id}-hk{c}`, teks `${id}-ht{c}`), baris atas (kotak `${id}-ka{c}`, teks `${id}-ta{c}`),
 * baris bawah (kotak `${id}-kb{c}`, teks `${id}-tb{c}`), tanda kurang `${id}-mn`, garis `${id}-gs`, baris hasil (kotak `${id}-kh{c}`, teks `${id}-th{c}`).
 * Isi kosong tetap menggambar kotaknya tanpa teks. Pojok kiri-atas (x, y); lebar tiap tempat `cw`, tinggi tiap baris `rh`.
 */
export function papanSusun(id: string, x: number, y: number, atas: readonly string[], bawah: readonly string[], hasil: readonly string[] = ["", "", ""], cw = 44, rh = 22, u = 13, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  const baris = (kode: string, isi: readonly string[], yy: number, warnaTeks: string) =>
    isi.forEach((s, c) => {
      out.push(kotak(`${id}-k${kode}${c}`, x + c * cw, yy, cw, rh, WARNA_KOLOM[c], W.biru, { rx: 0, tebal: 1, ...o }));
      if (s) out.push(teks(`${id}-t${kode}${c}`, x + c * cw + cw / 2, yy + rh / 2 + u * 0.35, s, u, warnaTeks, o));
    });
  NAMA_KOLOM.forEach((n, c) => {
    out.push(kotak(`${id}-hk${c}`, x + c * cw, y, cw, 15, W.abu, W.biru, { rx: 0, tebal: 1, ...o }));
    out.push(teks(`${id}-ht${c}`, x + c * cw + cw / 2, y + 10.5, n, 7.4, W.biru, o));
  });
  baris("a", atas, y + 15, W.biru);
  baris("b", bawah, y + 15 + rh, W.biru);
  out.push(teks(`${id}-mn`, x - 10, y + 15 + 2 * rh - 4, "−", 16, W.biru, o));
  out.push(garis(`${id}-gs`, x - 2, y + 15 + 2 * rh + 1, 3 * cw + 4, 0, W.biru, 2.2, o));
  baris("h", hasil, y + 15 + 2 * rh + 2, W.hijau);
  return out;
}
/** Teks isi sel baris 0 (atas), 1 (bawah), atau 2 (hasil) tempat ke-`c` pada papan `id` yang pojok kiri-atasnya (x, y), dengan id `idSel`. */
export const isiSel = (id: string, x: number, y: number, baris: 0 | 1 | 2, c: number, isi: string, u = 13, warna: string = W.biru, cw = 44, rh = 22): Obj => {
  const [cx, cy] = tengahSel(x, y, baris, c, cw, rh);
  return teks(idSel(id, (["a", "b", "h"] as const)[baris], c), cx, Math.round((cy + u * 0.35) * 10) / 10, isi, u, warna, { z: 1 });
};
/** Teks angka sel baris atas (a), bawah (b), atau hasil (h) tempat ke-`c` (0 ratusan, 1 puluhan, 2 satuan) pada papan `id`. */
export const idSel = (id: string, baris: "a" | "b" | "h", c: number): string => `${id}-t${baris}${c}`;
/** Titik tengah sel (x, y) untuk menaruh teks tambahan: baris 0 atas, 1 bawah, 2 hasil. */
export const tengahSel = (x: number, y: number, baris: number, c: number, cw = 44, rh = 22): [number, number] => [x + c * cw + cw / 2, y + 15 + baris * rh + (baris === 2 ? 2 : 0) + rh / 2];

/* ------------------------------ Garis lompatan ------------------------------ */
/**
 * Garis lompatan tidak berskala: titik `stops` berjarak sama pada garis dari (x, y) sepanjang `panjang`; panah lompat di atas garis dengan label selisih.
 * Id: `${id}-g` (garis), `${id}-k{i}` (tanda), `${id}-n{i}` (angka titik di bawah), `${id}-a{i}` (panah), `${id}-j{i}` (label lompat).
 */
export function garisLompat(id: string, x: number, y: number, panjang: number, stops: readonly number[], warna: string = W.merah, o: Opsi = {}): Obj[] {
  const langkah = panjang / (stops.length - 1);
  const out: Obj[] = [garis(`${id}-g`, x, y, panjang, 0, W.biru, 2, o)];
  stops.forEach((v, i) => {
    out.push(garis(`${id}-k${i}`, bulatkan(x + i * langkah), y - 4, 0, 8, W.biru, 2, o), teks(`${id}-n${i}`, bulatkan(x + i * langkah), y + 17, String(v), 9.4, W.biru, o));
    if (i > 0) {
      out.push(panah(`${id}-a${i - 1}`, bulatkan(x + (i - 1) * langkah + 2), y - 6, bulatkan(langkah - 4), 0, warna, 2, o));
      out.push(teks(`${id}-j${i - 1}`, bulatkan(x + (i - 0.5) * langkah), y - 12, `+${v - stops[i - 1]}`, 9.4, warna, o));
    }
  });
  return out;
}

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Pak Usman" | "Bu Marni";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-k1` `${id}-k2`, berkepang satu `${id}-kp`, memegang kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc` dan berkaus hijau `${id}-bj`; Pak Hendro berkaus jingga `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`;
 * Pak Usman berseragam putih `${id}-bj`, berpeluit `${id}-pl`, berpapan jepit `${id}-pk`; Bu Marni bercaping lebar `${id}-cp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Bu Marni" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Genta") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.8), 16, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Laras") {
    out.push(bulat(`${id}-k1`, x - 5, bulatkan(y - u * 0.28), 3.4, undefined, "#1F2937", { tebal: 1, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 5, bulatkan(y - u * 0.28), 3.4, undefined, "#1F2937", { tebal: 1, z: 2 }));
    out.push(bulat(`${id}-kp`, x + 13, bulatkan(y - u * 0.15), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hendro") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-tp`, x - 13, bulatkan(y - u * 0.78), 26, 5, "#FDE68A", "#B45309", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pl`, x - 3, bulatkan(y + 3), 6, 4, "#E5E7EB", "#6B7280", { rx: 1, tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-ts`, x - 19, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Usman") {
    out.push(baju("#F8FAFC", "#64748B", 12));
    out.push(kotak(`${id}-pl`, x - 3, bulatkan(y + 3), 6, 4, "#FACC15", "#A16207", { rx: 1, tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-pk`, x + 11, bulatkan(y + 1), 10, 8, "#FEF3C7", "#92400E", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Marni") out.push(poligon(`${id}-cp`, [[x - 17, bulatkan(y - u * 0.62)], [x, bulatkan(y - u * 1.0)], [x + 17, bulatkan(y - u * 0.62)]], "#F5D68A", "#92400E", { tebal: 1.1, z: 2 }));
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Hendro" || nama === "Pak Usman" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Genta" ? [`${id}-bj`, `${id}-pc`] : []),
  ...(nama === "Laras" ? [`${id}-k1`, `${id}-k2`, `${id}-kp`, `${id}-kc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Pak Usman" ? [`${id}-bj`, `${id}-pl`, `${id}-pk`] : []),
  ...(nama === "Bu Marni" ? [`${id}-cp`] : []),
];
