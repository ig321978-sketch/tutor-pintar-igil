import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina" (penjumlahan bilangan sampai seribu), lanjutan cerita Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa ruang depan penginapan: lantai ubin krem, meja resepsi kayu bertulisan RESEPSI dengan lonceng, papan daftar tamu, koper bertumpuk, dermaga kecil di kejauhan, kolom bersusun.
 * Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (topi pantai, berpeluit, bertas kain),
 * Bu Rina (berseragam hijau), Pak Usman (berseragam putih, berpeluit), Bu Maya (berkerudung krem). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  langit: "#DBEAFE",
  oranye: "#F97316",
  tanya: "#F59E0B",
  /** Kertas bergaris dan kolom bersusun. */
  kertas: "#FFFBEB",
  satuan: "#FDE68A",
  puluhan: "#BFDBFE",
  ratusan: "#FBCFE8",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  lega: "\u{1F60C}",
  cemberut: "\u{1F620}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  gelengan: "\u{1F645}",
  koper: "\u{1F9F3}",
  lonceng: "\u{1F6CE}",
  perahu: "\u{26F5}",
  kerang: "\u{1F41A}",
  pensil: "\u{270F}",
  kertas: "\u{1F4C4}",
  napas: "\u{1F62E}",
  tawa: "\u{1F604}",
  mata: "\u{1F440}",
  ulang: "\u{1F501}",
  kunci: "\u{1F511}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/* ------------------------------ Ruang depan penginapan ------------------------------ */
/** Lantai ubin krem `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, "#F5E6C8", undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, "#C9A66B", 0.9, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, "#C9A66B", 0.9, { z: -2 })];
}

/** Meja resepsi kayu: papan atas `${id}`, badan `${id}-b`, tulisan `${id}-t`. Pojok kiri-atas papan (x, y), lebar w. */
export function meja(id: string, x: number, y: number, w = 130): Obj[] {
  return [
    kotak(id, x, y, w, 8, "#B7814A", W.coklat, { rx: 2, z: 1 }),
    kotak(`${id}-b`, bulatkan(x + 4), y + 8, w - 8, 30, "#C99A63", W.coklat, { rx: 2, z: 0 }),
    teks(`${id}-t`, bulatkan(x + w / 2), y + 28, "RESEPSI", 8, W.coklat, { z: 2 }),
  ];
}
export const lonceng = (id: string, x: number, y: number, u = 16): Obj => emo(id, x, y, E.lonceng, u, { z: 3 });
export const koper = (id: string, x: number, y: number, u = 16, o: Opsi = {}): Obj => emo(id, x, y, E.koper, u, { z: 3, ...o });

/** Papan daftar tamu `${id}` berbaris `${id}-l0`..: pojok kiri-atas (x, y). */
export function papanDaftar(id: string, x: number, y: number, w = 56, h = 40): Obj[] {
  return [
    kotak(id, x, y, w, h, W.putih, W.coklat, { rx: 3, tebal: 1.4, z: 2 }),
    ...[0, 1, 2, 3].map((i) => garis(`${id}-l${i}`, x + 6, y + 9 + i * 8, w - 12, 0, "#94A3B8", 1, { z: 3 })),
  ];
}

/** Dermaga kecil di kejauhan: papan `${id}`, dua tiang `${id}-p1`, `${id}-p2`, perahu `${id}-pr`. Pojok kiri-atas papan (x, y). */
export function dermaga(id: string, x: number, y: number): Obj[] {
  return [
    kotak(id, x, y, 70, 5, "#B7814A", W.coklat, { rx: 1, z: 1 }),
    kotak(`${id}-p1`, x + 8, y + 5, 4, 16, "#6B4423", W.coklat, { rx: 1, z: 0 }),
    kotak(`${id}-p2`, x + 56, y + 5, 4, 16, "#6B4423", W.coklat, { rx: 1, z: 0 }),
    emo(`${id}-pr`, x + 34, y + 2, E.perahu, 14, { z: 2 }),
  ];
}

/** Tumpukan koper `${id}-0`..: `banyak` koper bertingkat dari (x, y) alas; tiap lapis tiga koper. */
export function tumpukKoper(id: string, x: number, y: number, banyak: number, u = 16): Obj[] {
  return Array.from({ length: banyak }, (_, i) => koper(`${id}-${i}`, x + (i % 3) * (u - 2), y - Math.floor(i / 3) * (u - 2), u));
}
export const idTumpuk = (id: string, banyak: number): string[] => Array.from({ length: banyak }, (_, i) => `${id}-${i}`);

/* ------------------------------ Hitung susun ------------------------------ */
/**
 * Angka besar yang rata kanan pada `xk` (satu teks utuh agar bilangan terbaca): `${id}`. Lebar tiga angka pada u = 22 sekitar 38,
 * pusat kolom satuan, puluhan, ratusan kira-kira xk - 6, xk - 19, xk - 32.
 */
export const angka = (id: string, xk: number, y: number, n: number | string, u = 22, warna: string = W.biru, o: Opsi = {}): Obj => teks(id, xk, y, String(n), u, warna, { anchor: "end", z: 4, ...o });
/** Pusat kolom: 0 satuan, 1 puluhan, 2 ratusan, untuk angka u = 22 yang rata kanan di xk. */
export const pusatKolom = (xk: number, kolom: 0 | 1 | 2): number => bulatkan(xk - 6.5 - kolom * 13);
/** Sorot kolom: kotak berwarna di belakang kolom `kolom` setinggi h dari y. `${id}`. */
export const sorotKolom = (id: string, xk: number, kolom: 0 | 1 | 2, y: number, h: number, warna: string): Obj => kotak(id, bulatkan(pusatKolom(xk, kolom) - 7), y, 14, h, warna, undefined, { rx: 3, tebal: 0, z: 1 });

/** Garis tambah di bawah dua bilangan: `${id}` dari xa sampai xb pada tinggi y. */
export const garisTambah = (id: string, xa: number, xb: number, y: number): Obj => garis(id, xa, y, xb - xa, 0, W.biru, 2, { z: 4 });

/** Tinggi baris kolom bersusun: simpanan kecil di atas, bilangan pertama dan kedua, garis tambah, hasil. */
export const Y = { sim: 66, a: 90, b: 118, garis: 126, h: 152 } as const;
export const XK = 170;
/** Kertas hitungan krem berbingkai kayu di belakang kolom bersusun. */
export const kertas = (h = 128): Obj => kotak("ks", 12, 30, 276, h, W.kertas, W.coklat, { rx: 6, tebal: 1.6, z: -1 });
/** Dua bilangan tersusun ke bawah dengan tanda tambah dan garis: `a1`, `a2`, `pl`, `gt`. */
export const dua = (a: number | string, b: number | string, kiri = XK): Obj[] => [
  angka("a1", kiri, Y.a, a),
  angka("a2", kiri, Y.b, b),
  teks("pl", kiri - 66, Y.b, "+", 16, W.biru, { z: 4 }),
  garisTambah("gt", kiri - 64, kiri + 4, Y.garis),
];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Rina" | "Pak Usman" | "Bu Maya";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkepang satu `${id}-kp`, berkacamata `${id}-ka1` `${id}-ka2`, berkertas saku `${id}-kc`;
 * Genta berpeci hitam `${id}-pc`, berbaju hijau `${id}-bj`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`;
 * Bu Rina berseragam hijau `${id}-bj` dengan papan daftar `${id}-pd`; Pak Usman berseragam putih `${id}-bj` dengan peluit `${id}-pl`; Bu Maya berkerudung krem `${id}-kr` (kecil). Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Usman" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Genta") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pc`, bulatkan(x - 8), bulatkan(y - u * 0.78), 16, 6, "#1F2937", "#030712", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Laras") {
    out.push(bulat(`${id}-kp`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-ka1`, x - 5, bulatkan(y - u * 0.3), 3, undefined, "#1F2937", { tebal: 0.9, z: 2 }));
    out.push(bulat(`${id}-ka2`, x + 5, bulatkan(y - u * 0.3), 3, undefined, "#1F2937", { tebal: 0.9, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hendro") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-tp`, bulatkan(x - 13), bulatkan(y - u * 0.78), 26, 6, "#FDE68A", "#B45309", { rx: 3, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 5, bulatkan(y + 4), 2.4, "#DC2626", "#7F1D1D", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-ts`, x - 19, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Rina") {
    out.push(baju("#16A34A", "#14532D", 12));
    out.push(kotak(`${id}-pd`, x + 11, bulatkan(y + 1), 10, 8, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Usman") {
    out.push(baju("#F8FAFC", "#64748B", 12));
    out.push(bulat(`${id}-pl`, x + 5, bulatkan(y + 4), 2.4, "#DC2626", "#7F1D1D", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Bu Maya") out.push(kotak(`${id}-kr`, bulatkan(x - u * 0.45), bulatkan(y - u * 0.8), bulatkan(u * 0.9), 6, "#E7D3A8", "#92400E", { rx: 3, tebal: 1, z: 2 }));
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Bu Rina" || nama === "Pak Usman" ? 18 : nama === "Bu Maya" ? 9 : 15)), nama, nama === "Bu Maya" ? 6.4 : 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-kp`, `${id}-ka1`, `${id}-ka2`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-bj`, `${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Rina" ? [`${id}-bj`, `${id}-pd`] : []),
  ...(nama === "Pak Usman" ? [`${id}-bj`, `${id}-pl`] : []),
  ...(nama === "Bu Maya" ? [`${id}-kr`] : []),
];
