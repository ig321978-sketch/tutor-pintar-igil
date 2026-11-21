import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas" (pecahan per sepuluh dan per seratus menjadi desimal), Sanggar Batik Kampung Mekar.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa sanggar: halaman berumput, bangunan sanggar dengan papan nama SANGGAR BATIK, tali jemuran dengan kain batik, gulungan kain bermeteran, kisi sepuluh kolom dan seratus kotak, pecahan bertingkat.
 * Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (topi pantai, peluit, tas kain),
 * Pak Bagas (bertopi, bermeteran di bahu), Bu Tuti (berselendang). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  pasir: "#FDE68A",
  hijauMuda: "#DCFCE7",
  pink: "#FCE7F3",
  tanya: "#F59E0B",
  indigo: "#6366F1",
  indigoMuda: "#C7D2FE",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  malu: "\u{1F633}",
  alis: "\u{1F928}",
  pikir: "\u{1F914}",
  tawa: "\u{1F602}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  jari: "\u{261D}",
  terima: "\u{1F64F}",
  gunting: "\u{2702}",
  benang: "\u{1F9F5}",
  wol: "\u{1F9F6}",
  pita: "\u{1F380}",
  penggaris: "\u{1F4CF}",
  syal: "\u{1F9E3}",
  catat: "\u{1F4DD}",
  mata: "\u{1F440}",
  bintang: "\u{2B50}",
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
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Halaman sanggar ------------------------------ */
export const WS = {
  rumput: "#BBF7D0",
  rumputGaris: "#86EFAC",
  dinding: "#FDE7C8",
  atap: "#9A3412",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  kain: "#E0E7FF",
} as const;

/** Rumput halaman `${id}` dari tinggi y sampai bawah kanvas, dengan dua garis putus `${id}-g1`, `${id}-g2`. */
export function rumput(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WS.rumput, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 8, y + 12, 284, 0, WS.rumputGaris, 1.4, { z: -2, putus: true }), garis(`${id}-g2`, 8, y + 34, 284, 0, WS.rumputGaris, 1.4, { z: -2, putus: true })];
}
export const idRumput = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Bangunan sanggar: dinding `${id}`, atap `${id}-a`, papan nama `${id}-sn` bertulisan `${id}-st`, pintu `${id}-p`. Pojok kiri-atas dinding (x, y), lebar w, tinggi h. */
export function sanggar(id: string, x: number, y: number, w = 96, h = 56): Obj[] {
  return [
    kotak(id, x, y, w, h, WS.dinding, WS.kayuTua, { rx: 2, z: 0 }),
    poligon(`${id}-a`, [[x - 6, y], [bulatkan(x + w / 2), y - 22], [x + w + 6, y]], WS.atap, W.coklat, { z: 1 }),
    kotak(`${id}-sn`, bulatkan(x + 8), y + 6, bulatkan(w - 16), 14, W.putih, W.biru, { rx: 2, tebal: 1.2, z: 2 }),
    teks(`${id}-st`, bulatkan(x + w / 2), y + 16, "SANGGAR BATIK", 7, W.biru, { z: 3 }),
    kotak(`${id}-p`, bulatkan(x + w / 2 - 9), y + h - 24, 18, 24, WS.kayu, WS.kayuTua, { rx: 2, tebal: 1.2, z: 2 }),
  ];
}
export const idSanggar = (id: string): string[] => [id, `${id}-a`, `${id}-sn`, `${id}-st`, `${id}-p`];

/** Gulungan kain bermeteran `${id}-k` dengan ujung `${id}-u` dan garis meteran `${id}-m`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function gulungan(id: string, x: number, y: number, w: number, h: number, warna: string = W.indigoMuda): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 5, tebal: 1.6, z: 2 }),
    bulat(`${id}-u`, bulatkan(x + w), bulatkan(y + h / 2), bulatkan(h / 2), W.putih, W.biru, { tebal: 1.6, z: 3 }),
    garis(`${id}-m`, bulatkan(x + 4), bulatkan(y + h - 4), bulatkan(w - 8), 0, W.merah, 1.4, { z: 3, putus: true }),
  ];
}
export const idGulungan = (id: string): string[] => [`${id}-k`, `${id}-u`, `${id}-m`];

/** Tali jemuran `${id}` dengan kain batik kecil `${id}-k0`, `${id}-k1`, `${id}-k2`. Tali dari x ke x + w pada tinggi y. */
export function tali(id: string, x: number, y: number, w: number): Obj[] {
  const warna = [W.indigoMuda, W.pink, W.pasir];
  const lebar = bulatkan((w - 20) / 3);
  return [
    garis(id, x, y, w, 0, W.coklat, 1.6, { z: 0 }),
    ...[0, 1, 2].map((i) => kotak(`${id}-k${i}`, bulatkan(x + 6 + i * (lebar + 4)), y, bulatkan(lebar - 2), 22, warna[i], W.coklat, { rx: 1, tebal: 1, z: 1 })),
  ];
}
export const idTali = (id: string): string[] => [id, `${id}-k0`, `${id}-k1`, `${id}-k2`];

/* ------------------------------ Kain dan kisi ------------------------------ */
/** Meteran kain: `n` sel sama besar dalam satu baris, `${id}0` sampai `${id}${n - 1}`, lalu garis tepi `${id}-t`. Pojok kiri-atas (x, y), lebar total w, tinggi h. */
export function strip(id: string, x: number, y: number, w: number, h: number, n = 10, warna: string = W.putih): Obj[] {
  const lebar = w / n;
  return [
    ...Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, bulatkan(x + i * lebar), y, bulatkan(lebar), h, warna, W.biru, { rx: 0, tebal: 1.2, z: 2 })),
    kotak(`${id}-t`, x, y, w, h, undefined, W.biru, { rx: 0, tebal: 2.4, z: 3 }),
  ];
}
export const idStrip = (id: string, n = 10): string[] => [...ids(id, 0, n - 1), `${id}-t`];
/** Kisi seratus kotak: sepuluh baris kali sepuluh kolom, `${id}0` sampai `${id}99` (baris atas lebih dulu), lalu bingkai `${id}-t`. Pojok kiri-atas (x, y), ukuran sel cw kali ch. */
export function kisi(id: string, x: number, y: number, cw: number, ch: number): Obj[] {
  return [
    ...Array.from({ length: 100 }, (_, i) => kotak(`${id}${i}`, bulatkan(x + (i % 10) * cw), bulatkan(y + Math.floor(i / 10) * ch), cw, ch, W.putih, W.biru, { rx: 0, tebal: 0.8, z: 2 })),
    kotak(`${id}-t`, x, y, bulatkan(10 * cw), bulatkan(10 * ch), undefined, W.biru, { rx: 0, tebal: 2, z: 3 }),
  ];
}
export const idKisi = (id: string): string[] => [...ids(id, 0, 99), `${id}-t`];
/** Id berurutan `${s}${dari}` sampai `${s}${sampai}`. */
export const ids = (s: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${s}${dari + q}`);

/** Pecahan bertingkat: pembilang `${id}-a`, garis `${id}-g`, penyebut `${id}-b`; pembilang di tinggi dasar y, berpusat di cx. */
export function pecah(id: string, cx: number, y: number, a: string, b: string, u = 20, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebar = bulatkan(Math.max(a.length, b.length) * u * 0.56 + 8);
  return [
    teks(`${id}-a`, cx, y, a, u, warna, { z: 3, ...o }),
    garis(`${id}-g`, bulatkan(cx - lebar / 2), bulatkan(y + 4), lebar, 0, warna, 2.2, { z: 3, ...o }),
    teks(`${id}-b`, cx, bulatkan(y + 4 + u), b, u, warna, { z: 3, ...o }),
  ];
}
export const idPecah = (id: string): string[] => [`${id}-a`, `${id}-g`, `${id}-b`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Pak Bagas" | "Bu Tuti";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka` `${id}-kb`, berkepang satu `${id}-kp`, memegang kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, membawa tas kain `${id}-ts`; Pak Bagas bertopi `${id}-tp` dan bermeteran kuning di bahu `${id}-mt`;
 * Bu Tuti berselendang `${id}-sl` dan membawa papan `${id}-pd`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Bu Tuti" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Bu Tuti") {
    out.push(baju("#DB2777", "#831843", 12));
    out.push(kotak(`${id}-sl`, x - 12, bulatkan(y + 2), 7, 14, "#F9A8D4", "#831843", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pd`, x + 12, bulatkan(y + 1), 10, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Laras") {
    out.push(bulat(`${id}-ka`, x - 5, bulatkan(y - u * 0.18), 3.2, undefined, "#1F2937", { tebal: 1, z: 2 }));
    out.push(bulat(`${id}-kb`, x + 5, bulatkan(y - u * 0.18), 3.2, undefined, "#1F2937", { tebal: 1, z: 2 }));
    out.push(bulat(`${id}-kp`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Genta") out.push(kotak(`${id}-pc`, bulatkan(x - 8), bulatkan(y - u * 0.8), 16, 6, "#111827", "#000000", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Hendro") {
    out.push(kotak(`${id}-tp`, bulatkan(x - 14), bulatkan(y - u * 0.78), 28, 6, "#FDE68A", "#B45309", { rx: 3, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x - 8, bulatkan(y + 8), 2.2, "#F59E0B", "#92400E", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-ts`, x - 19, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Bagas") {
    out.push(kotak(`${id}-tp`, bulatkan(x - 11), bulatkan(y - u * 0.8), 22, 7, "#92400E", "#451A03", { rx: 3, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-mt`, x - 12, bulatkan(y + 2), 24, 4, "#FDE047", "#A16207", { rx: 1, tebal: 0.9, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + 15), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Bu Tuti" ? [`${id}-bj`, `${id}-sl`, `${id}-pd`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-kb`, `${id}-kp`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Pak Bagas" ? [`${id}-tp`, `${id}-mt`] : []),
];
