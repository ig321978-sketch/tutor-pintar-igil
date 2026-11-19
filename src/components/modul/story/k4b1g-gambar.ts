import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni" (perkalian sampai seratus), cerita Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: dermaga kayu berpapan di tepi laut dengan perahu wisata berderet (lambung berwarna, atap kecil), dayung, papan jatah, dan tanda perkalian.
 * Tokoh: Satria (anak laki-laki berkaus biru), Laras (anak perempuan berkepang satu dan berkacamata, membawa kertas saku), Genta (anak laki-laki berpeci),
 * Pak Hendro (ayah Satria, bertopi pantai dan berpeluit), Bu Marni (pemilik perahu, bercaping lebar), Bu Ratna (pengatur kamar, membawa papan jatah).
 * Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  kuning: "#FACC15",
  tanya: "#F59E0B",
  laut: "#BAE6FD",
  lautTua: "#0369A1",
  kayu: "#B45309",
  kayuMuda: "#D6A867",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  tawa: "\u{1F602}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  bintang: "\u{2B50}",
  kesal: "\u{1F4A2}",
  perahu: "\u{1F6F6}",
  layar: "\u{26F5}",
  kerang: "\u{1F41A}",
  palma: "\u{1F334}",
  lampu: "\u{1F4A1}",
  papan: "\u{1F4CB}",
  lupa: "\u{1F50D}",
  suara: "\u{1F4AC}",
  kilat: "\u{26A1}",
  kotak: "\u{1F4E6}",
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
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Laut dan dermaga ------------------------------ */
/** Laut `${id}` dari tinggi y ke bawah, dua garis ombak `${id}-g1`, `${id}-g2`. */
export function laut(id: string, y = 100): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.laut, undefined, { rx: 0, tebal: 0, z: -4 }), garis(`${id}-g1`, 8, y + 12, 284, 0, W.lautTua, 1, { putus: true, z: -3, op: 0.5 }), garis(`${id}-g2`, 8, y + 26, 284, 0, W.lautTua, 1, { putus: true, z: -3, op: 0.5 })];
}
export const idLaut = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Dermaga kayu `${id}` (papan lantai di bawah kanvas dari tinggi y), garis papan `${id}-g1`, `${id}-g2`, dan dua tiang `${id}-p1`, `${id}-p2`. */
export function dermaga(id: string, y = 166): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, W.kayuMuda, W.kayu, { rx: 0, tebal: 1.4, z: -2 }),
    garis(`${id}-g1`, 4, y + 12, 292, 0, W.kayu, 1, { z: -1 }),
    garis(`${id}-g2`, 4, y + 24, 292, 0, W.kayu, 1, { z: -1 }),
    kotak(`${id}-p1`, 6, y - 8, 6, 10, W.kayu, "#451A03", { rx: 1, tebal: 1, z: -1 }),
    kotak(`${id}-p2`, 288, y - 8, 6, 10, W.kayu, "#451A03", { rx: 1, tebal: 1, z: -1 }),
  ];
}
export const idDermaga = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`, `${id}-p1`, `${id}-p2`];

/** Papan nama `${id}` bertulisan `${id}-t`, pusat (cx), pojok atas y. */
export function papanNama(id: string, cx: number, y: number, isi = "DERMAGA WISATA", w = 100): Obj[] {
  return [kotak(id, bulatkan(cx - w / 2), y, w, 18, W.krem, W.coklat, { rx: 3, tebal: 1.6, z: 1 }), teks(`${id}-t`, cx, y + 13, isi, 7.4, W.coklat, { z: 2 })];
}
export const idPapanNama = (id: string): string[] => [id, `${id}-t`];

/** Perahu wisata: lambung `${id}`, atap kecil `${id}-a`. Pusat tengah garis air (cx, cy), skala s. */
export function perahu(id: string, cx: number, cy: number, s = 1, warna: string = "#EA580C"): Obj[] {
  return [
    poligon(id, [[cx - 15 * s, cy], [cx + 15 * s, cy], [cx + 10 * s, cy + 9 * s], [cx - 10 * s, cy + 9 * s]], warna, "#7C2D12", { tebal: 1.4, z: 1 }),
    poligon(`${id}-a`, [[cx - 10 * s, cy - 1 * s], [cx, cy - 11 * s], [cx + 10 * s, cy - 1 * s]], "#FDE68A", "#92400E", { tebal: 1.2, z: 2 }),
  ];
}
export const idPerahu = (id: string): string[] => [id, `${id}-a`];

/** Dayung `${id}`: batang miring dengan bilah `${id}-b`, pangkal (x, y). */
export function dayung(id: string, x: number, y: number, tinggi = 30): Obj[] {
  return [garis(id, x, y, 8, bulatkan(-tinggi), W.kayu, 2.4, { z: 2 }), kotak(`${id}-b`, bulatkan(x - 3), bulatkan(y - 4), 9, 5, W.kayuMuda, W.kayu, { rx: 1, tebal: 1, z: 3 })];
}
export const idDayung = (id: string): string[] => [id, `${id}-b`];

/** Papan jatah `${id}` (papan jepit dengan kertas) bertulisan `${id}-t`, pojok kiri-atas (x, y). */
export function papanJatah(id: string, x: number, y: number, isi = "daftar tamu", w = 66, h = 34): Obj[] {
  return [kotak(id, x, y, w, h, W.putih, W.coklat, { rx: 4, tebal: 1.8, z: 2 }), kotak(`${id}-j`, bulatkan(x + w / 2 - 8), y - 3, 16, 6, W.kayu, "#451A03", { rx: 2, tebal: 1, z: 3 }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + 3), isi, 8, W.coklat, { z: 3 })];
}
export const idPapanJatah = (id: string): string[] => [id, `${id}-j`, `${id}-t`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Marni" | "Bu Ratna";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkepang satu `${id}-k1`, berkacamata `${id}-kc`, membawa kertas saku `${id}-ks`;
 * Genta berpeci hitam `${id}-pc` dan berkemeja hijau `${id}-bj`; Pak Hendro berkaus merah `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl`;
 * Bu Marni berbaju kuning `${id}-bj` dan bercaping lebar `${id}-cp`; Bu Ratna berbaju ungu `${id}-bj` dan membawa papan jatah kecil `${id}-pj`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Genta") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pc`, bulatkan(x - 8), bulatkan(y - u * 0.8), 16, 6, "#1F2937", "#030712", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Laras") {
    out.push(bulat(`${id}-k1`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, bulatkan(x - 8), bulatkan(y - u * 0.42), 16, 5, undefined, "#111827", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-ks`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hendro") {
    out.push(baju("#DC2626", "#7F1D1D", 12));
    out.push(kotak(`${id}-tp`, bulatkan(x - 12), bulatkan(y - u * 0.78), 24, 6, "#FDE68A", "#92400E", { rx: 2, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 6, bulatkan(y + 8), 2.4, W.kuning, "#A16207", { tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Marni") {
    out.push(baju("#EAB308", "#854D0E", 12));
    out.push(poligon(`${id}-cp`, [[x - 17, bulatkan(y - u * 0.62)], [x, bulatkan(y - u * 0.98)], [x + 17, bulatkan(y - u * 0.62)]], "#D4A55A", "#92400E", { tebal: 1, z: 2 }));
  }
  if (nama === "Bu Ratna") {
    out.push(baju("#7C3AED", "#4C1D95", 12));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 1), 10, 12, "#FEF3C7", "#92400E", { rx: 1, tebal: 0.9, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Satria" || nama === "Laras" || nama === "Genta" ? 15 : 18)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Genta" ? [`${id}-bj`, `${id}-pc`] : []),
  ...(nama === "Laras" ? [`${id}-k1`, `${id}-kc`, `${id}-ks`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`] : []),
  ...(nama === "Bu Marni" ? [`${id}-bj`, `${id}-cp`] : []),
  ...(nama === "Bu Ratna" ? [`${id}-bj`, `${id}-pj`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));

/* ------------------------------ Perkalian: lompatan dan papan susun ------------------------------ */
/**
 * Perahu berderet `n` buah (n paling banyak lima) mulai tengah pertama cx0, jarak `jarak`, tinggi garis air cy: `${id}1`..`${id}n` dan atapnya `${id}1-a`.. Tiap perahu bernomor label `${id}{i}-l` bila `isi` diberikan.
 */
export function deretPerahu(id: string, n: number, cx0: number, jarak: number, cy: number, s = 0.95, isi?: string): Obj[] {
  const out: Obj[] = [];
  for (let i = 1; i <= n; i += 1) {
    const cx = bulatkan(cx0 + (i - 1) * jarak);
    out.push(...perahu(`${id}${i}`, cx, cy, s, i % 2 === 1 ? "#EA580C" : "#0EA5E9"));
    if (isi !== undefined) out.push(teks(`${id}${i}-l`, cx, bulatkan(cy + 22), isi, 9, W.biru, { z: 3 }));
  }
  return out;
}
export const idDeret = (id: string, n: number, label = false): string[] => Array.from({ length: n }, (_, i) => [`${id}${i + 1}`, `${id}${i + 1}-a`, ...(label ? [`${id}${i + 1}-l`] : [])]).flat();

/**
 * Hitung susun pendek `a` x `b` pada papan kertas pojok kiri-atas (x, y): angka puluhan dan satuan `a` dalam dua kolom (`${id}-a1`, `${id}-a0`), pengali `${id}-b`,
 * tanda kali `${id}-x`, garis `${id}-g`. Kolom satuan di kanan (xs), kolom puluhan di kiri (xp), jarak kolom 22.
 */
export function papanSusun(id: string, x: number, y: number, a: number, b: number, u = 18): Obj[] {
  const xp = x + 30;
  const xs = x + 52;
  return [
    kotak(`${id}-p`, x, y, 100, 78, W.krem, W.coklat, { rx: 6, tebal: 1.6, z: 1 }),
    teks(`${id}-a1`, xp, y + 24, String(Math.floor(a / 10)), u, W.biru, { z: 2 }),
    teks(`${id}-a0`, xs, y + 24, String(a % 10), u, W.biru, { z: 2 }),
    teks(`${id}-x`, x + 12, y + 46, "×", u, W.merah, { z: 2 }),
    teks(`${id}-b`, xs, y + 46, String(b), u, W.biru, { z: 2 }),
    garis(`${id}-g`, x + 8, y + 52, 84, 0, W.biru, 2, { z: 2 }),
  ];
}
export const idSusun = (id: string): string[] => [`${id}-p`, `${id}-a1`, `${id}-a0`, `${id}-x`, `${id}-b`, `${id}-g`];
