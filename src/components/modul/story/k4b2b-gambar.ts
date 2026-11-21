import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story K4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo" (membandingkan dan mengurutkan pecahan berpenyebut sama), cerita Sanggar Batik Kampung Mekar.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: halaman belakang sanggar, bak pewarna berpetak (bagian sama besar, banyaknya yang terisi sungguh sebanyak pembilang), pecahan bertingkat (pembilang, garis, penyebut),
 * garis pecahan dari nol sampai satu, tongkat pengaduk, kain jemuran, papan. Tokoh: Satria (berkaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci),
 * Pak Hendro (bertopi pantai, berpeluit), Pak Joyo (tukang pewarna berapron cokelat), Kak Sekar (penjahit berpita merah dan meteran di leher). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  /** Papan pewarna: kayu terang bertulisan tinta tua. */
  papan: "#E7C48F",
  tinta: "#451A03",
  tanya: "#F59E0B",
};

/** Warna pewarna dalam bak. */
export const D = { biru: "#3B82F6", merah: "#EF4444", hijau: "#22C55E", kuning: "#FACC15", ungu: "#A855F7" } as const;

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
  catat: "\u{1F4DD}",
  jempol: "\u{1F44D}",
  gelengan: "\u{1F645}",
  dahi: "\u{1F926}",
  keringat: "\u{1F4A6}",
  mahkota: "\u{1F451}",
  mata: "\u{1F440}",
  palet: "\u{1F3A8}",
  tetes: "\u{1F4A7}",
  benang: "\u{1F9F5}",
  kaus: "\u{1F455}",
  syal: "\u{1F9E3}",
  tawa: "\u{1F604}",
  kaget: "\u{1F631}",
  alis: "\u{1F928}",
  tangan: "\u{1F64B}",
} as const;

type Opsi = Partial<Obj>;
const r2 = (n: number): number => Math.round(n * 100) / 100;
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
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Pecahan bertingkat ------------------------------ */
/**
 * Pecahan bertingkat: pembilang `${id}-p`, garis pecahan `${id}-g`, penyebut `${id}-q`. (x, y) = titik tengah pembilang (garis dasar teks); penyebut satu baris di bawahnya.
 * Tinggi total sekitar 2,1 kali ukuran huruf.
 */
export function pecahan(id: string, x: number, y: number, p: number, q: number, u = 14, warna: string = W.biru, o: Opsi = {}): Obj[] {
  return [
    teks(`${id}-p`, x, y, String(p), u, warna, { z: 3, ...o }),
    garis(`${id}-g`, bulatkan(x - u * 0.45), bulatkan(y + u * 0.25), bulatkan(u * 0.9), 0, warna, 1.6, { z: 3, ...(o.op === undefined ? {} : { op: o.op }) }),
    teks(`${id}-q`, x, bulatkan(y + u * 1.05), String(q), u, warna, { z: 3, ...o }),
  ];
}
export const idPecahan = (id: string): string[] => [`${id}-p`, `${id}-g`, `${id}-q`];

/* ------------------------------ Bak pewarna berpetak ------------------------------ */
/** Petak sama besar: `q` petak berurutan dari x selebar `lebar` (dibulatkan dua desimal). Dipakai bak dan garis. */
export const petakSama = (x: number, lebar: number, q: number): { x: number; w: number }[] => Array.from({ length: q }, (_, i) => ({ x: r2(x + (i * lebar) / q), w: r2(lebar / q) }));
const TEPI = "#6B4423";
const KOSONG = "#FFFFFF";

/** Bak pewarna mendatar: bingkai `${id}`, petak `${id}-c0`..`${id}-c{q-1}`. Petak terisi sebanyak `isi` dari kiri. Pojok kiri-atas isi (x, y). */
export function bak(id: string, x: number, y: number, w: number, h: number, q: number, isi: number, warna: string = D.biru): Obj[] {
  return [
    kotak(id, x - 3, y - 3, w + 6, h + 6, "#B7814A", TEPI, { rx: 4, tebal: 1.6, z: 1 }),
    ...petakSama(x, w, q).map((c, i) => kotak(`${id}-c${i}`, c.x, y, c.w, h, i < isi ? warna : KOSONG, "#475569", { rx: 0, tebal: 1, z: 2 })),
  ];
}
export const idBak = (id: string, q: number): string[] => [id, ...Array.from({ length: q }, (_, i) => `${id}-c${i}`)];
/** Ubah warna petak `dari` sampai `sampai` (indeks mulai 0, termasuk sampai). */
export const isiPetak = (id: string, dari: number, sampai: number, warna: string = D.biru): { id: string; warna: string }[] => Array.from({ length: sampai - dari + 1 }, (_, i) => ({ id: `${id}-c${dari + i}`, warna }));

/** Bak pewarna tegak: petak dari atas ke bawah, terisi `isi` petak dari bawah. */
export function bakTegak(id: string, x: number, y: number, w: number, h: number, q: number, isi: number, warna: string = D.biru): Obj[] {
  const t = r2(h / q);
  return [
    kotak(id, x - 3, y - 3, w + 6, h + 6, "#B7814A", TEPI, { rx: 4, tebal: 1.6, z: 1 }),
    ...Array.from({ length: q }, (_, i) => kotak(`${id}-c${i}`, x, r2(y + (i * h) / q), w, t, i >= q - isi ? warna : KOSONG, "#475569", { rx: 0, tebal: 1, z: 2 })),
  ];
}

/* ------------------------------ Garis pecahan ------------------------------ */
/** Garis dari x0 selebar `lebar` pada tinggi y, dibagi `q` bagian sama besar: garis `${id}`, tanda `${id}-tk0`..`${id}-tk{q}`. */
export function garisPec(id: string, x0: number, y: number, lebar: number, q: number): Obj[] {
  return [garis(id, x0, y, lebar, 0, W.biru, 2.4, { z: 2 }), ...Array.from({ length: q + 1 }, (_, i) => garis(`${id}-tk${i}`, r2(x0 + (i * lebar) / q), y - 5, 0, 10, W.biru, 1.4, { z: 2 }))];
}
export const xTandaPec = (x0: number, lebar: number, q: number, i: number): number => r2(x0 + (i * lebar) / q);

/* ------------------------------ Benda sanggar ------------------------------ */
/** Tanah halaman: hamparan krem `${id}` dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 120): Obj[] {
  return [kotak(id, 2, y, 296, 198 - y, "#E8D5B0", undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g`, 10, y + 6, 280, 0, "#D4B98A", 1.2, { z: -2, putus: true })];
}
/** Kain batik tergantung: kain `${id}` dan motif `${id}-m`. Pojok kiri-atas (x, y). */
export function kain(id: string, x: number, y: number, w: number, h: number, warna: string): Obj[] {
  return [kotak(id, x, y, w, h, warna, W.tinta, { rx: 2, tebal: 1.2, z: 1 }), bulat(`${id}-m`, bulatkan(x + w / 2), bulatkan(y + h / 2), bulatkan(Math.min(w, h) * 0.18), "#FEF3C7", W.tinta, { tebal: 0.8, z: 2 })];
}
/** Tali jemuran `${id}` pada tinggi y dari x sampai x + lebar. */
export const jemuran = (id: string, x: number, y: number, lebar: number): Obj => garis(id, x, y, lebar, 0, W.tinta, 1.6, { z: 0 });
/** Tongkat pengaduk `${id}` dari (x, y) miring ke atas kanan. */
export const tongkat = (id: string, x: number, y: number, dx = 16, dy = -40): Obj => garis(id, x, y, dx, dy, W.coklat, 3, { z: 4 });
/** Papan pewarna `${id}` (pojok kiri-atas x, y) dengan tepi dalam `${id}-p`. */
export function papan(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 4, y + 4, w - 8, h - 8, W.papan, "#6B4423", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapan = (id: string): string[] => [id, `${id}-p`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Pak Joyo" | "Kak Sekar";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-kc`, berkepang satu `${id}-kp` dan memegang kertas saku `${id}-ks`;
 * Genta berpeci hitam `${id}-pc`; Pak Hendro bertopi pantai `${id}-tp` dan berpeluit `${id}-pl`; Pak Joyo berapron cokelat `${id}-ap`;
 * Kak Sekar berpita merah `${id}-pt` dan bermeteran di leher `${id}-mt`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Joyo" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (kode: string, warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-${kode}`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const topi = (kode: string, warna: string, garisW: string, lebar = 20): Obj => kotak(`${id}-${kode}`, bulatkan(x - lebar / 2), bulatkan(y - u * 0.78), lebar, 6, warna, garisW, { rx: 2, tebal: 1, z: 2 });
  if (nama === "Satria") out.push(baju("bj", "#2563EB", "#1E3A8A"));
  if (nama === "Laras") {
    out.push(bulat(`${id}-kp`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x - 9, bulatkan(y - u * 0.42), 18, 5, undefined, "#1F2937", { rx: 2, tebal: 1.1, z: 2 }));
    out.push(kotak(`${id}-ks`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Genta") out.push(kotak(`${id}-pc`, bulatkan(x - 8), bulatkan(y - u * 0.8), 16, 6, "#1F2937", "#030712", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Hendro") {
    out.push(baju("bj", "#0EA5E9", "#075985", 12));
    out.push(topi("tp", "#FDE68A", "#B45309", 26));
    out.push(bulat(`${id}-pl`, x + 11, bulatkan(y + 6), 2.6, "#FACC15", "#A16207", { tebal: 0.9, z: 3 }));
  }
  if (nama === "Pak Joyo") out.push(baju("ap", "#92400E", "#451A03", 12));
  if (nama === "Kak Sekar") {
    out.push(bulat(`${id}-pt`, x + 9, bulatkan(y - u * 0.72), 3, "#DC2626", "#7F1D1D", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-mt`, x - 11, bulatkan(y + 3), 22, 4, "#FACC15", "#A16207", { rx: 1, tebal: 0.8, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Joyo" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-kp`, `${id}-kc`, `${id}-ks`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`] : []),
  ...(nama === "Pak Joyo" ? [`${id}-ap`] : []),
  ...(nama === "Kak Sekar" ? [`${id}-pt`, `${id}-mt`] : []),
];
