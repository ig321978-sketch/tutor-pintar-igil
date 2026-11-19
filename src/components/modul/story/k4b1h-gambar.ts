import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab H "Papan Jatah Bu Ratna" (pembagian sampai seratus), cerita Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: lorong penginapan berlantai ubin, empat pintu kamar bernomor, papan jatah berklip, tamu kecil berkoper, pembagian bersusun berkolom, lemari kayu perlengkapan.
 * Tokoh: Satria (kaus biru), Laras (berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, bertas kain),
 * Bu Ratna (berkerudung ungu, membawa papan jatah), Kak Yoga (berpayung, membawa gulungan jadwal; kecil di kejauhan). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  oranye: "#F97316",
  tanya: "#F59E0B",
  /** Papan jatah: kayu muda dan kertas krem. */
  kayu: "#C99A63",
  kayuTua: "#6B4423",
  kertas: "#FFFBEB",
  tinta: "#1E3A8A",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  kak: "\u{1F9D1}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  lelah: "\u{1F625}",
  tawa: "\u{1F604}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  ulang: "\u{1F501}",
  koper: "\u{1F9F3}",
  kamar: "\u{1F6CF}",
  sikat: "\u{1F9F9}",
  balon: "\u{1F388}",
  lentera: "\u{1F3EE}",
  tiket: "\u{1F3AB}",
  gulung: "\u{1F4DC}",
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
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Lorong, pintu, tamu ------------------------------ */
/** Lantai lorong `${id}` dari tinggi y sampai bawah kanvas (ubin krem), dua garis `${id}-g1`, `${id}-g2`. */
export function lorong(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, "#EADBB8", undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, "#B59A66", 0.8, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, "#B59A66", 0.8, { z: -2 })];
}
export const idLorong = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Pintu kamar `${id}` bernomor `no`: pelat `${id}-p`, nomor `${id}-t`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function pintu(id: string, x: number, y: number, no: number | string, w = 30, h = 50, warna = "#B7814A"): Obj[] {
  return [
    kotak(id, x, y, w, h, warna, W.kayuTua, { rx: 3, z: 1 }),
    kotak(`${id}-p`, bulatkan(x + w / 2 - 7), y + 5, 14, 12, W.putih, W.kayuTua, { rx: 2, tebal: 1, z: 2 }),
    teks(`${id}-t`, bulatkan(x + w / 2), y + 14.5, String(no), 9, W.biru, { z: 3 }),
  ];
}
export const idPintu = (id: string): string[] => [id, `${id}-p`, `${id}-t`];

/** Tamu kecil `${id}` (lingkaran berwarna) berpusat (x, y). */
export const tamu = (id: string, x: number, y: number, warna = "#FDBA74", r = 2.8, o: Opsi = {}): Obj => bulat(id, x, y, r, warna, "#7C2D12", { tebal: 0.7, z: 4, ...o });
/** Kerumunan `banyak` tamu kecil berpola kisi `kolom` kolom dari pojok kiri-atas (x, y): id `${id}0`... */
export function kerumunan(id: string, x: number, y: number, banyak: number, kolom: number, langkah = 8.5, warna = "#FDBA74"): Obj[] {
  return Array.from({ length: banyak }, (_, i) => tamu(`${id}${i}`, bulatkan(x + (i % kolom) * langkah), bulatkan(y + Math.floor(i / kolom) * langkah), i % 7 === 3 ? "#93C5FD" : warna));
}
export const idKerumunan = (id: string, banyak: number): string[] => Array.from({ length: banyak }, (_, i) => `${id}${i}`);

/** Papan jatah `${id}`: bingkai kayu, kertas `${id}-p`, jepitan `${id}-j`. Pojok kiri-atas (x, y). */
export function papanJatah(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [
    kotak(id, x, y, w, h, W.kayu, W.kayuTua, { rx: 4, tebal: 1.6, z: -1 }),
    kotak(`${id}-p`, x + 5, y + 8, w - 10, h - 13, W.kertas, W.kayuTua, { rx: 2, tebal: 0.9, z: 0 }),
    kotak(`${id}-j`, bulatkan(x + w / 2 - 12), y - 1, 24, 8, "#94A3B8", "#475569", { rx: 2, tebal: 1, z: 1 }),
  ];
}
export const idPapanJatah = (id: string): string[] => [id, `${id}-p`, `${id}-j`];

/** Sikat lantai `${id}`: gagang `${id}-g` dan kepala `${id}-k`. Ujung bawah gagang di (x, y). */
export function sikat(id: string, x: number, y: number, tinggi = 30): Obj[] {
  return [garis(`${id}-g`, x, bulatkan(y - tinggi), 0, tinggi, "#92400E", 2.4, { z: 5 }), kotak(`${id}-k`, bulatkan(x - 9), y, 18, 5, "#FACC15", "#A16207", { rx: 1, tebal: 1, z: 5 })];
}
/** Gelembung busa `${id}0`.. berderet pada lantai dari (x, y). */
export const busa = (id: string, x: number, y: number, banyak = 5): Obj[] => Array.from({ length: banyak }, (_, i) => bulat(`${id}${i}`, bulatkan(x + i * 7), bulatkan(y + (i % 2) * 3), 3, "#E0F2FE", "#7DD3FC", { tebal: 0.8, z: 1 }));
/** Ember sederhana `${id}` berpusat (x, y). */
export const ember = (id: string, x: number, y: number): Obj[] => [kotak(id, x - 8, y, 16, 14, "#38BDF8", "#0369A1", { rx: 2, tebal: 1.2, z: 3 }), garis(`${id}-g`, x - 8, y, 16, 0, "#0369A1", 1.4, { z: 4 })];

/**
 * Pembagian bersusun `${id}` dengan angka yang dibagi (1 atau 2 angka) dan pembagi: pembagi `${id}-pb`, kurung `${id}-kv`, `${id}-kh`, angka `${id}-d0`, `${id}-d1`.
 * Pojok kiri-atas angka pertama di (x, y); lebar kolom `cw`. Hasil tulis di atas garis (`sus.q`), hasil kali dan sisa di bawah (`sus.b`).
 */
export const CW = 15;
export function bersusunDasar(id: string, x: number, y: number, dibagi: string, pembagi: string, u = 14): Obj[] {
  const lebar = dibagi.length * CW + 6;
  return [
    teks(`${id}-pb`, bulatkan(x - 12), y, pembagi, u, W.biru, { z: 3 }),
    garis(`${id}-kv`, bulatkan(x - 4), bulatkan(y - 13), 0, 18, W.biru, 1.6, { z: 3 }),
    garis(`${id}-kh`, bulatkan(x - 4), bulatkan(y - 13), lebar, 0, W.biru, 1.6, { z: 3 }),
    ...Array.from(dibagi).map((d, i) => teks(`${id}-d${i}`, bulatkan(x + i * CW + CW / 2 - 2), y, d, u, W.biru, { z: 3 })),
  ];
}
/** Satu angka di kolom `kol`, baris `baris` (0 = baris angka yang dibagi, -1 = baris hasil di atas garis). Tiap baris 15 piksel. */
export const angkaSus = (id: string, x: number, y: number, kol: number, baris: number, isi: string, warna: string = W.biru, u = 14): Obj =>
  teks(id, bulatkan(x + kol * CW + CW / 2 - 2), bulatkan(y + baris * 15 - (baris === -1 ? 4 : 0)), isi, u, warna, { z: 4 });
/** Garis pengurang di bawah baris `baris` dari kolom `dari` sampai `sampai`. */
export const garisSus = (id: string, x: number, y: number, dari: number, sampai: number, baris: number, warna: string = W.biru): Obj =>
  garis(id, bulatkan(x + dari * CW - 3), bulatkan(y + baris * 15 + 3), (sampai - dari + 1) * CW, 0, warna, 1.4, { z: 4 });

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Ratna" | "Kak Yoga";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkepang satu `${id}-kp` dan memegang kertas saku `${id}-kc`;
 * Genta berpeci hitam `${id}-pc`; Pak Hendro berkaus oranye `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`;
 * Bu Ratna berkerudung ungu `${id}-kr` dan membawa papan jatah `${id}-pj`; Kak Yoga (kecil) berpayung `${id}-py`, `${id}-pg` dan membawa gulungan jadwal `${id}-gl`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" || nama === "Genta" ? (nama === "Satria" ? E.satria : E.genta) : nama === "Laras" ? E.laras : nama === "Pak Hendro" ? E.pak : nama === "Bu Ratna" ? E.bu : E.kak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Genta") out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.8), 16, 5, "#1F2937", "#030712", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Laras") {
    out.push(bulat(`${id}-kp`, x + 13, bulatkan(y - u * 0.15), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x - 21, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hendro") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-tp`, x - 13, bulatkan(y - u * 0.78), 26, 5, "#FDE68A", "#A16207", { rx: 2, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 4, bulatkan(y + 4), 2.2, "#E5E7EB", "#475569", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-ts`, x + 14, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Ratna") {
    out.push(kotak(`${id}-kr`, x - 12, bulatkan(y - u * 0.82), 24, 6, "#7C3AED", "#4C1D95", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y - 2), 9, 13, "#C99A63", "#6B4423", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Kak Yoga") {
    out.push(poligon(`${id}-py`, [[x - 12, bulatkan(y - u * 0.9)], [x, bulatkan(y - u * 1.4)], [x + 12, bulatkan(y - u * 0.9)]], "#F43F5E", "#9F1239", { z: 2 }));
    out.push(garis(`${id}-pg`, x, bulatkan(y - u * 0.9), 0, bulatkan(u * 0.4), "#7C2D12", 1.2, { z: 2 }));
    out.push(kotak(`${id}-gl`, x + 12, bulatkan(y + 1), 4, 11, "#FEF3C7", "#92400E", { rx: 1, tebal: 0.8, z: 2 }));
  }
  const geser = nama === "Pak Hendro" || nama === "Bu Ratna" ? 18 : nama === "Kak Yoga" ? 9 : 15;
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + geser), nama, nama === "Kak Yoga" ? 6.4 : 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Laras" ? [`${id}-kp`, `${id}-kc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Ratna" ? [`${id}-kr`, `${id}-pj`] : []),
  ...(nama === "Kak Yoga" ? [`${id}-py`, `${id}-pg`, `${id}-gl`] : []),
];
