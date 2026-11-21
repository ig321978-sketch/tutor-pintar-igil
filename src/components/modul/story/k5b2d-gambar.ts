import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (faktor persekutuan dan FPB), Pasar Kuliner Malam.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: meja kemas Pak Joko (meja kayu, kardus berpita, klepon hijau dan onde-onde cokelat yang digambar SUNGGUH sebanyak angkanya),
 * papan congklak (dua baris lubang bernomor satu sampai dua puluh empat, biji merah untuk faktor dua puluh empat dan biji putih untuk faktor delapan belas),
 * daftar faktor berupa kartu angka, dan diagram dua lingkaran faktor. Data Story: dua puluh empat klepon dan delapan belas onde-onde,
 * faktor persekutuan 1, 2, 3, 6, FPB 6 (enam kotak berisi empat klepon dan tiga onde-onde), serta delapan dan dua puluh (FPB 4).
 * Tokoh: Bima (kaus hijau, papan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (rompi oranye, pengeras suara),
 * Pak Joko (jaket biru), Kak Lintang (kemeja kuning, spidol besar). Tanpa ZWJ, emoji paling tinggi U+1FA95.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  merahTua: "#7F1D1D",
  hijau: "#16A34A",
  hijauTua: "#166534",
  papan: "#14532D",
  kapur: "#FEF9C3",
  oranye: "#EA580C",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF3C7",
  lantai: "#E7E5E4",
  lantaiTua: "#A8A29E",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  kardus: "#D6A86B",
  kardusTua: "#8A5A24",
  klepon: "#4ADE80",
  onde: "#B45309",
  jaket: "#2563EB",
};

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jempol: "\u{1F44D}",
  konfeti: "\u{1F389}",
  kilau: "\u{2728}",
  hadiah: "\u{1F381}",
  balon: "\u{1F388}",
  lampion: "\u{1F3EE}",
  lonceng: "\u{1F514}",
  kamera: "\u{1F4F7}",
  tertawa: "\u{1F604}",
  tangan: "\u{270B}",
  tanya: "\u{2753}",
  corong: "\u{1F4E3}",
  bintang: "\u{2B50}",
  pikir: "\u{1F914}",
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

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Latar ------------------------------ */
/** Lantai paving `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, W.lantaiTua, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, W.lantaiTua, 1.2, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Meja kemas kayu: papan atas `${id}` (x, y, lebar w) dan dua kaki `${id}-a`, `${id}-b` sampai tinggi 150. */
export function meja(id: string, x: number, y: number, w: number): Obj[] {
  return [
    kotak(id, x, y, w, 7, W.kayu, W.kayuTua, { rx: 2, tebal: 1.6, z: 1 }),
    kotak(`${id}-a`, x + 5, y + 7, 4, 150 - y - 7, W.kayuTua, W.kayuTua, { rx: 0, tebal: 1, z: 0 }),
    kotak(`${id}-b`, x + w - 9, y + 7, 4, 150 - y - 7, W.kayuTua, W.kayuTua, { rx: 0, tebal: 1, z: 0 }),
  ];
}
export const idMeja = (id: string): string[] => [id, `${id}-a`, `${id}-b`];

/** Kotak kardus berpita: badan `${id}` dan pita `${id}-p` (garis tegak di tengah). */
export function kardus(id: string, x: number, y: number, w: number, h: number, o: Opsi = {}): Obj[] {
  return [kotak(id, x, y, w, h, W.kardus, W.kardusTua, { rx: 2, tebal: 1.4, z: 1, ...o }), garis(`${id}-p`, bulatkan(x + w / 2), y, 0, h, W.merah, 1.6, { z: 2, ...(o.op !== undefined ? { op: o.op } : {}) })];
}
export const idKardus = (id: string): string[] => [id, `${id}-p`];

/** Satu kue bulat: klepon hijau atau onde-onde cokelat `${id}`. */
export const kue = (id: string, x: number, y: number, jenis: "klepon" | "onde", r = 3.4, o: Opsi = {}): Obj => bulat(id, x, y, r, jenis === "klepon" ? W.klepon : W.onde, jenis === "klepon" ? "#166534" : "#78350F", { tebal: 1, z: 3, ...o });
/** Deret kue sebanyak n (tepat n bulat) dalam kisi, `perBaris` kue sebaris, mulai dari (x, y): `${id}0` sampai `${id}{n-1}`. */
export function deretKue(id: string, x: number, y: number, n: number, jenis: "klepon" | "onde", perBaris = 12, jarak = 8, r = 3.4): Obj[] {
  return Array.from({ length: n }, (_, i) => kue(`${id}${i}`, x + (i % perBaris) * jarak, y + Math.floor(i / perBaris) * jarak, jenis, r));
}
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Kartu faktor (angka dalam kotak kecil) `${id}-k` dan `${id}-t`. Pojok kiri-atas (x, y), lebar w, tinggi 16. */
export function kartuFaktor(id: string, x: number, y: number, isi: number | string, warna: string = W.krem, w = 22, u = 9.5): Obj[] {
  return [kotak(`${id}-k`, x, y, w, 16, warna, W.biru, { rx: 3, tebal: 1.3, z: 1 }), teks(`${id}-t`, x + w / 2, y + 11.8, String(isi), u, W.biru, { z: 2 })];
}
export const idKartuFaktor = (id: string): string[] => [`${id}-k`, `${id}-t`];

/** Papan tulis hijau `${id}` dengan bingkai kayu. */
export const papanTulis = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, W.papan, W.kayuTua, { rx: 5, tebal: 3, z: -1 });

/* ------------------------------ Data Story (dihitung dari definisi faktor) ------------------------------ */
export const faktorDari = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((f) => n % f === 0);
export const F24 = faktorDari(24);
export const F18 = faktorDari(18);
export const F8 = faktorDari(8);
export const F20 = faktorDari(20);
export const PERSEKUTUAN = F24.filter((f) => F18.includes(f));
export const FPB = Math.max(...PERSEKUTUAN);

/* ------------------------------ Papan congklak ------------------------------ */
/** Pusat lubang bernomor 1 sampai 24: dua baris (1-12 di atas, 13-24 di bawah). */
export const lubangXY = (no: number): { x: number; y: number } => ({ x: 18 + ((no - 1) % 12) * 24, y: no <= 12 ? 72 : 116 });
/** Papan kayu `${id}` dan dua puluh empat lubang `${id}-h{no}` dengan nomor `${id}-n{no}` di atasnya. */
export function papanCongklak(id: string): Obj[] {
  const out: Obj[] = [kotak(id, 4, 42, 292, 100, W.kayu, W.kayuTua, { rx: 8, tebal: 2.4, z: 0 })];
  for (let no = 1; no <= 24; no += 1) {
    const { x, y } = lubangXY(no);
    out.push(bulat(`${id}-h${no}`, x, y, 9.5, "#5B3A1A", "#3B2410", { tebal: 1, z: 1 }));
    out.push(teks(`${id}-n${no}`, x, y - 12, String(no), 7.4, W.krem, { z: 3 }));
  }
  return out;
}
export const idCongklak = (id: string): string[] => ["", ...Array.from({ length: 24 }, (_, i) => [`-h${i + 1}`, `-n${i + 1}`]).flat()].map((s) => `${id}${s}`);
/** Biji pada lubang no: merah `${id}m${no}` (faktor 24) di kiri, putih `${id}p${no}` (faktor 18) di kanan. */
export const bijiMerah = (id: string, no: number): Obj => bulat(`${id}m${no}`, lubangXY(no).x - 3.4, lubangXY(no).y + 1, 2.9, "#DC2626", "#7F1D1D", { tebal: 0.8, z: 4 });
export const bijiPutih = (id: string, no: number): Obj => bulat(`${id}p${no}`, lubangXY(no).x + 3.4, lubangXY(no).y + 1, 2.9, "#F8FAFC", "#475569", { tebal: 0.8, z: 4 });
/** Cincin emas di sekitar lubang no: `${id}${no}`. */
export const cincin = (id: string, no: number): Obj => bulat(`${id}${no}`, lubangXY(no).x, lubangXY(no).y, 12.5, undefined, "#FFC800", { tebal: 2.4, z: 5 });

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Pak Joko" | "Kak Lintang";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`; Citra berkucir dua `${id}-k1` dan `${id}-k2`; Fajar bertopi suporter `${id}-tp`;
 * Pak Arif berompi oranye `${id}-bj` dan berpengeras suara `${id}-pg`; Pak Joko berjaket biru `${id}-bj` dan berpeci hitam kecil `${id}-pc`; Kak Lintang berkemeja kuning `${id}-bj` dan berspidol besar `${id}-sp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Kak Lintang" ? E.bu : E.pak;
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
  if (nama === "Pak Joko") {
    out.push(baju(W.jaket, "#1E3A8A", 12));
    out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.78), 16, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Kak Lintang") {
    out.push(baju("#FACC15", "#A16207", 12));
    out.push(garis(`${id}-sp`, x + 12, bulatkan(y + 3), 0, 10, "#DC2626", 2.6, { z: 3 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Arif" || nama === "Pak Joko" ? 18 : 15)), nama, 8.4, W.hijauTua, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-pg`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-pc`] : []),
  ...(nama === "Kak Lintang" ? [`${id}-bj`, `${id}-sp`] : []),
];

/* ------------------------------ Bentuk bersama untuk adegan metode ------------------------------ */
/** Kartu metode: judul Inggris (baris pertama) dan nama Indonesia (baris kedua, opsional) di dalam satu kartu `${id}-k`, `${id}-t0`, `${id}-t1`. */
export const kartuMetode = (id: string, x: number, y: number, w: number, h: number, warna: string, ing: string, ind?: string, u = 8.4): Obj[] => kartu(id, x, y, w, h, warna, ind ? [ing, ind] : [ing], u);
export const WARNA_METODE = ["#DBEAFE", "#DCFCE7", "#FEF9C3"] as const;
export const NAMA_METODE = ["Two Lists", "Share Equally", "Biggest Match"];
export const NAMA_METODE_ID = ["Dua Daftar", "Bagi Sama Rata", "Terbesar yang Sama"];
