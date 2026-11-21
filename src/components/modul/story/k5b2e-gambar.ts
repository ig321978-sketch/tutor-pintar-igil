import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang" (bilangan prima, saringan Eratosthenes, faktorisasi prima dan pohon faktor, KPK dan FPB dari faktorisasi,
 * pembagian berulang), akhir cerita Pasar Kuliner Malam. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: tenda dan lantai pasar malam dengan tali lampu gantung, papan bilangan satu sampai seratus (sepuluh kolom, sepuluh baris, tiap bilangan satu benda tepat pada petaknya),
 * pohon faktor (simpul bulat bertali, daun prima berwarna hijau), baris chip faktorisasi, dan tabel pembagian berulang (kolom pembagi, kolom bilangan).
 * Data Story: 12 = 2 x 2 x 3, 18 = 2 x 3 x 3, KPK 36, FPB 6, pembagi 2, 2, 3, 3; metode global memakai 24, 30 dan 45 (KPK 90), 72, dan contoh kecil.
 * Tokoh: Bima (kaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara), Kak Lintang (berkemeja kuning, berspidol),
 * dan tamu di perayaan: Bu Marni (berselendang ungu), Pak Tarno (berikat kepala merah), Bu Wati (bercaping), Pak Joko (berjaket biru). Tanpa ZWJ, emoji paling tinggi U+1FA95.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  merahTua: "#7F1D1D",
  hijau: "#16A34A",
  hijauMuda: "#BBF7D0",
  hijauTua: "#166534",
  oranye: "#EA580C",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  unguTua: "#4C1D95",
  coklat: "#92400E",
  krem: "#FEF3C7",
  lantai: "#F5E6CF",
  lantaiTua: "#C9A66B",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  papan: "#FFF7ED",
};

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  kak: "\u{1F9D1}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jempol: "\u{1F44D}",
  mata: "\u{1F50D}",
  konfeti: "\u{1F389}",
  kilau: "\u{2728}",
  lampion: "\u{1F3EE}",
  lonceng: "\u{1F514}",
  klepon: "\u{1F361}",
  kotak: "\u{1F381}",
  balon: "\u{1F388}",
  corong: "\u{1F4E3}",
  pohon: "\u{1F333}",
  jam: "\u{231B}",
  tertawa: "\u{1F602}",
  senyum: "\u{1F604}",
  pikir: "\u{1F914}",
  tangan: "\u{1F64C}",
  papanJepit: "\u{1F4CB}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis: garisW, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas (paling banyak sekitar 27 huruf supaya tidak tertutup lencana n/10). */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Latar pasar malam ------------------------------ */
/** Lantai pasar `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 156): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, W.lantaiTua, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 30, 292, 0, W.lantaiTua, 1.2, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];
const WARNA_LAMPU = ["#DC2626", "#FACC15", "#16A34A", "#2563EB", "#7C3AED", "#F97316", "#DB2777", "#0EA5E9"];
/** Tali lampu gantung `${id}-t` dengan banyak bulatan `${id}-b{i}` berwarna di tinggi y. */
export function lampuGantung(id: string, y = 30, banyak = 8): Obj[] {
  return [garis(`${id}-t`, 6, y, 288, 0, W.merahTua, 1.4, { z: -1 }), ...Array.from({ length: banyak }, (_, i) => bulat(`${id}-b${i}`, 22 + i * ((296 - 44) / (banyak - 1)), y + 6, 4.5, WARNA_LAMPU[i % WARNA_LAMPU.length], W.merahTua, { tebal: 1, z: -1 }))];
}
export const idLampu = (id: string, banyak = 8): string[] => [`${id}-t`, ...Array.from({ length: banyak }, (_, i) => `${id}-b${i}`)];

/* ------------------------------ Papan bilangan satu sampai batas ------------------------------ */
export type TataPapan = { x0: number; y0: number; w: number; h: number; kolom: number };
/** Tata papan seratus: sepuluh kolom selebar 19, sepuluh baris setinggi 12, pojok kiri-atas (8, 26). */
export const PAPAN_100: TataPapan = { x0: 8, y0: 26, w: 19, h: 12, kolom: 10 };
/** Tata papan lima puluh: sepuluh kolom selebar 22, lima baris setinggi 20, pojok kiri-atas (10, 30). */
export const PAPAN_50: TataPapan = { x0: 10, y0: 30, w: 22, h: 20, kolom: 10 };
/** Pusat petak bilangan n (mulai 1) pada tata papan. */
export const pusatPetak = (n: number, t: TataPapan): { x: number; y: number } => ({ x: t.x0 + t.w / 2 + ((n - 1) % t.kolom) * t.w, y: t.y0 + t.h / 2 + Math.floor((n - 1) / t.kolom) * t.h });
/** Bingkai papan `${id}-f` mengelilingi petak satu sampai batas. */
export function bingkaiPapan(id: string, batas: number, t: TataPapan): Obj {
  const baris = Math.ceil(batas / t.kolom);
  return kotak(`${id}-f`, t.x0 - 2, t.y0 - 2, t.w * t.kolom + 4, t.h * baris + 4, W.papan, W.kayuTua, { rx: 3, tebal: 2.4, z: -1 });
}
/** Semua bilangan satu sampai batas `${id}-n{n}`, tepat pada petaknya (teks sedikit diturunkan supaya berada di tengah petak). */
export function bilanganPapan(id: string, batas: number, t: TataPapan, u = 7): Obj[] {
  return Array.from({ length: batas }, (_, i) => {
    const p = pusatPetak(i + 1, t);
    return teks(`${id}-n${i + 1}`, p.x, bulatkan(p.y + u * 0.36), String(i + 1), u, W.biru, { z: 2 });
  });
}
export const idBilanganPapan = (id: string, daftar: number[]): string[] => daftar.map((n) => `${id}-n${n}`);
/** Lingkaran penanda `${id}-r{n}` di belakang bilangan n (untuk prima yang diambil). */
export const cincinPapan = (id: string, n: number, t: TataPapan, warna: string = W.hijauMuda, r = 6.2): Obj => {
  const p = pusatPetak(n, t);
  return bulat(`${id}-r${n}`, p.x, p.y, r, warna, W.hijauTua, { tebal: 1.2, z: 0 });
};
export const idCincin = (id: string, daftar: number[]): string[] => daftar.map((n) => `${id}-r${n}`);
export const kelipatanDari = (p: number, batas: number): number[] => Array.from({ length: Math.floor(batas / p) - 1 }, (_, i) => p * (i + 2));
export const PRIMA_100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
export const PRIMA_50 = PRIMA_100.filter((n) => n <= 50);

/* ------------------------------ Pohon faktor ------------------------------ */
/** Satu simpul pohon: bulatan `${id}` dan angka `${id}-t`. Daun prima berwarna hijau muda. */
export function simpul(id: string, x: number, y: number, bil: number, prima: boolean, r = 11, u = 11): Obj[] {
  return [bulat(id, x, y, r, prima ? W.hijauMuda : W.putih, prima ? W.hijauTua : W.biru, { tebal: 1.6, z: 1 }), teks(`${id}-t`, x, bulatkan(y + u * 0.36), String(bil), u, W.biru, { z: 2 })];
}
export const idSimpul = (id: string): string[] => [id, `${id}-t`];
/** Tali dari (x1, y1) ke (x2, y2) `${id}`: berhenti di tepi bulatan (jarak r dari tiap pusat). */
export function tali(id: string, x1: number, y1: number, x2: number, y2: number, r = 11, warna: string = W.coklat): Obj {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.hypot(dx, dy);
  const ux = dx / d;
  const uy = dy / d;
  return garis(id, bulatkan(x1 + ux * r), bulatkan(y1 + uy * r), bulatkan(dx - ux * 2 * r), bulatkan(dy - uy * 2 * r), warna, 1.8, { z: 0 });
}

/* ------------------------------ Chip faktorisasi dan tabel pembagian ------------------------------ */
/** Satu chip bulat `${id}` dengan angka `${id}-t`, radius r. */
export const chip = (id: string, x: number, y: number, bil: number | string, warna: string = W.putih, r = 11, u = 11): Obj[] => [
  bulat(id, x, y, r, warna, W.biru, { tebal: 1.6, z: 1 }),
  teks(`${id}-t`, x, bulatkan(y + u * 0.36), String(bil), u, W.biru, { z: 2 }),
];
export const idChip = (id: string): string[] => [id, `${id}-t`];

/** Kolom tabel pembagian: pembagi di x0, bilangan pertama di x0 + 46, kedua di x0 + 92, dan seterusnya. */
export const kolomTabel = (x0: number, j: number): number => x0 + 46 + j * 44;
/** Satu baris tabel pembagian pada tinggi y: pembagi `${id}-p`, bilangan `${id}-c{j}`. */
export function barisTabel(id: string, x0: number, y: number, p: number | string, angka: number[], u = 11, warna: string = W.biru): Obj[] {
  return [teks(`${id}-p`, x0, y, String(p), u, W.oranye, { z: 2 }), ...angka.map((v, j) => teks(`${id}-c${j}`, kolomTabel(x0, j), y, String(v), u, warna, { z: 2 }))];
}
export const idBarisTabel = (id: string, banyak: number): string[] => [`${id}-p`, ...Array.from({ length: banyak }, (_, j) => `${id}-c${j}`)];
/** Garis tegak pemisah kolom pembagi `${id}-v` dan garis mendatar di bawah judul `${id}-h`. */
export function kerangkaTabel(id: string, x0: number, yAtas: number, yBawah: number, lebar: number): Obj[] {
  return [garis(`${id}-v`, x0 + 22, yAtas, 0, yBawah - yAtas, W.coklat, 1.6, { z: 1 }), garis(`${id}-h`, x0 - 18, yAtas + 10, lebar, 0, W.coklat, 1.6, { z: 1 })];
}

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Kak Lintang" | "Bu Marni" | "Pak Tarno" | "Bu Wati" | "Pak Joko";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`; Citra berkucir dua `${id}-k1` dan `${id}-k2`; Fajar bertopi suporter `${id}-tp`;
 * Pak Arif berompi oranye `${id}-bj` dan berpengeras suara `${id}-pg`; Kak Lintang berkemeja kuning `${id}-bj` dan berspidol `${id}-sp`; Bu Marni berselendang ungu `${id}-sl`;
 * Pak Tarno berikat kepala merah `${id}-ik`; Bu Wati bercaping `${id}-cp`; Pak Joko berjaket biru `${id}-bj`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Kak Lintang" ? E.kak : nama === "Bu Marni" || nama === "Bu Wati" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Bima") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pj`, x + 10, bulatkan(y + 1), 10, 13, "#FDE68A", "#92400E", { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Citra") {
    out.push(bulat(`${id}-k1`, x - 14, bulatkan(y - u * 0.3), 3.2, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 14, bulatkan(y - u * 0.3), 3.2, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Fajar") out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.8), 18, 6, "#DC2626", "#7F1D1D", { rx: 3, tebal: 1, z: 2 }));
  if (nama === "Pak Arif") {
    out.push(baju("#EA580C", "#7C2D12", 12));
    out.push(kotak(`${id}-pg`, x + 10, bulatkan(y + 3), 9, 7, "#9CA3AF", "#374151", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Kak Lintang") {
    out.push(baju("#FACC15", "#A16207", 12));
    out.push(kotak(`${id}-sp`, x + 11, bulatkan(y - 2), 4, 15, "#111827", "#030712", { rx: 1, tebal: 0.8, z: 2 }));
  }
  if (nama === "Bu Marni") out.push(baju("#7C3AED", "#4C1D95", 12));
  if (nama === "Pak Tarno") out.push(kotak(`${id}-ik`, x - 9, bulatkan(y - u * 0.78), 18, 4, "#DC2626", "#7F1D1D", { rx: 2, tebal: 0.8, z: 2 }));
  if (nama === "Bu Wati") out.push(kotak(`${id}-cp`, x - 12, bulatkan(y - u * 0.86), 24, 5, "#FDE68A", "#B45309", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Joko") out.push(baju("#2563EB", "#1E3A8A", 12));
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Arif" || nama === "Pak Tarno" || nama === "Pak Joko" ? 18 : 15)), nama, 8.4, W.hijauTua, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-pg`] : []),
  ...(nama === "Kak Lintang" ? [`${id}-bj`, `${id}-sp`] : []),
  ...(nama === "Bu Marni" ? [`${id}-bj`] : []),
  ...(nama === "Pak Tarno" ? [`${id}-ik`] : []),
  ...(nama === "Bu Wati" ? [`${id}-cp`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`] : []),
];

/* ------------------------------ Bentuk bersama untuk adegan metode ------------------------------ */
/** Kartu metode: judul Inggris (baris pertama) dan nama Indonesia (baris kedua, opsional) di dalam satu kartu `${id}-k`, `${id}-t0`, `${id}-t1`. */
export const kartuMetode = (id: string, x: number, y: number, w: number, h: number, warna: string, ing: string, ind?: string, u = 8.4): Obj[] => kartu(id, x, y, w, h, warna, ind ? [ing, ind] : [ing], u);
export const WARNA_METODE = ["#DBEAFE", "#DCFCE7", "#FEF9C3"] as const;
