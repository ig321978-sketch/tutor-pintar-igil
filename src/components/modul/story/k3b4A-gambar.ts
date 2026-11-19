import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 4 Sub-Bab A "Rangka Layang-layang Bu Ratih" (ruas garis dan sisi bangun datar), awal cerita Festival Layang-layang Kampung.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa festival: lapangan rumput di tepi sawah menguning, spanduk FESTIVAL LAYANG-LAYANG, pondok bengkel beratap rumbia, bilah bambu, kertas warna,
 * gulungan benang, paku, penggaris bergaris milimeter. Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau),
 * Pak Joko (kaus biru, topi anyaman, berkumis, berpensil di telinga, membawa termos), Bu Ratih (bercaping, berpita merah di pinggang), Kak Anton (bertopi biru, kecil di kejauhan).
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
  /** Penggaris: tubuh kuning, tanda biru. */
  penggaris: "#FDE68A",
  tanya: "#F59E0B",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  anton: "\u{1F9D1}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  pensil: "\u{270F}",
  sapu: "\u{1F9F9}",
  penggaris: "\u{1F4CF}",
  segitiga: "\u{1F4D0}",
  jari: "\u{261D}",
  senter: "\u{1F526}",
  layang: "\u{1FA81}",
  benang: "\u{1F9F5}",
  padi: "\u{1F33E}",
  bambu: "\u{1F38D}",
  kertas: "\u{1F4C4}",
  gunting: "\u{2702}",
  balon: "\u{1F388}",
  pita: "\u{1F380}",
  kaleng: "\u{1F96B}",
  lupa: "\u{1F50D}",
  gelengan: "\u{1F645}",
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
/** Lengkung dari (x1, y) ke (x2, y) setinggi h (h positif melengkung ke atas, negatif ke bawah). */
export const lengkung = (id: string, x1: number, x2: number, y: number, h: number, warna: string = W.merah, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: x1,
  y,
  d: `M0 0 Q${bulatkan((x2 - x1) / 2)} ${-h} ${bulatkan(x2 - x1)} 0`,
  warna: undefined,
  garis: warna,
  tebal: 2.2,
  z: 1,
  ...o,
});
/** Benang berkelok dari (x1, y) ke (x2, y): dua lengkung bergantian. */
export const berkelok = (id: string, x1: number, x2: number, y: number, h: number, warna: string = W.merah, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: x1,
  y,
  d: `M0 0 Q${bulatkan((x2 - x1) / 4)} ${-h} ${bulatkan((x2 - x1) / 2)} 0 T${bulatkan(x2 - x1)} 0`,
  warna: undefined,
  garis: warna,
  tebal: 2.2,
  z: 1,
  ...o,
});
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

/* ------------------------------ Lapangan festival ------------------------------ */
export const WL = {
  rumput: "#BBF7D0",
  rumputGaris: "#4ADE80",
  padi: "#FDE68A",
  padiGaris: "#CA8A04",
  bambu: "#D9B44A",
  bambuTua: "#7A5C12",
  rumbia: "#A16207",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  meja: "#C99A63",
  paku: "#475569",
} as const;

/** Rumput `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function rumput(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WL.rumput, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WL.rumputGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WL.rumputGaris, 1.4, { z: -2 })];
}
export const idRumput = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Hamparan padi menguning `${id}` dengan dua garis batang `${id}-g1`, `${id}-g2`, tepat di atas rumput (y sampai y + 18). */
export function padi(id: string, y = 126): Obj[] {
  return [kotak(id, 2, y, 296, 18, WL.padi, undefined, { rx: 0, tebal: 0, z: -2 }), garis(`${id}-g1`, 4, y + 6, 292, 0, WL.padiGaris, 1.2, { z: -1 }), garis(`${id}-g2`, 4, y + 12, 292, 0, WL.padiGaris, 1.2, { z: -1 })];
}
export const idPadi = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Meja kayu `${id}` (permukaan) tepat di bawah y: pojok kiri-atas (14, y), lebar 272. */
export function meja(id: string, y = 128): Obj[] {
  return [kotak(id, 14, y, 272, 12, WL.meja, WL.kayuTua, { rx: 2, tebal: 1.4, z: -1 }), garis(`${id}-g`, 20, y + 6, 260, 0, WL.kayuTua, 0.6, { z: -1 })];
}
export const idMeja = (id: string): string[] => [id, `${id}-g`];

/** Spanduk `${id}` bertulisan `${id}-t`, pusat (cx), tinggi 20, pojok atas y. */
export function spanduk(id: string, cx: number, y: number, isi = "FESTIVAL LAYANG-LAYANG", w = 120): Obj[] {
  return [kotak(id, bulatkan(cx - w / 2), y, w, 20, "#FEF3C7", W.merah, { rx: 3, tebal: 1.6, z: 1 }), teks(`${id}-t`, cx, y + 14, isi, 7, W.merah, { z: 2 })];
}
export const idSpanduk = (id: string): string[] => [id, `${id}-t`];

/** Pondok bengkel beratap rumbia: dinding `${id}`, atap `${id}-a`, pintu `${id}-p`. Pojok kiri-atas dinding (x, y), lebar w, tinggi h. */
export function pondok(id: string, x: number, y: number, w = 100, h = 56): Obj[] {
  return [
    kotak(id, x, y, w, h, "#E7C48F", WL.kayuTua, { rx: 2, z: 0 }),
    poligon(`${id}-a`, [[x - 8, y], [bulatkan(x + w / 2), y - 30], [x + w + 8, y]], WL.rumbia, "#451A03", { z: 1 }),
    kotak(`${id}-p`, bulatkan(x + w / 2 - 8), y + h - 28, 16, 28, WL.kayu, WL.kayuTua, { rx: 1, tebal: 1.2, z: 1 }),
  ];
}
export const idPondok = (id: string): string[] => [id, `${id}-a`, `${id}-p`];

/** Satu bilah bambu `${id}` (kotak) dengan tulisan `${id}-t` di tengah (boleh kosong), pojok kiri-atas (x, y). */
export function bilah(id: string, x: number, y: number, w: number, h = 8, isi?: string, u = 7): Obj[] {
  return [kotak(id, x, y, w, h, WL.bambu, WL.bambuTua, { rx: 2, tebal: 1.3, z: 2 }), ...(isi ? [teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, W.biru, { z: 3 })] : [])];
}
export const idBilah = (id: string, ada = true): string[] => [id, ...(ada ? [`${id}-t`] : [])];

/** Paku kecil `${id}` di pusat (x, y). */
export const paku = (id: string, x: number, y: number, r = 3): Obj => bulat(id, x, y, r, WL.paku, "#0F172A", { tebal: 1, z: 4 });

/** Layang-layang belah ketupat `${id}` (kertas) dengan tali `${id}-b`. Pusat (cx, cy), setengah lebar s. */
export function layang(id: string, cx: number, cy: number, s = 14, warna = "#F472B6"): Obj[] {
  return [
    poligon(id, [[cx, cy - s * 1.2], [cx + s, cy], [cx, cy + s * 1.2], [cx - s, cy]], warna, W.biru, { z: 1 }),
    garis(`${id}-b`, cx, cy + s * 1.2, 0, 18, "#92400E", 1, { z: 0 }),
  ];
}
export const idLayang = (id: string): string[] => [id, `${id}-b`];

/** Gulungan benang kecil `${id}` (lingkaran merah dengan pusat putih `${id}-i`) di pusat (x, y). */
export function gulunganBenang(id: string, x: number, y: number, r = 7): Obj[] {
  return [bulat(id, x, y, r, "#FCA5A5", W.merah, { tebal: 1.4, z: 2 }), bulat(`${id}-i`, x, y, bulatkan(r * 0.4), W.putih, W.merah, { tebal: 1, z: 3 })];
}
export const idGulunganBenang = (id: string): string[] => [id, `${id}-i`];

/** Kertas catatan putih `${id}-k` dengan baris tulisan `${id}-t0`.. Pojok kiri-atas (x, y). */
export function kertas(id: string, x: number, y: number, w: number, h: number, baris: string[], u = 10): Obj[] {
  return kartu(id, x, y, w, h, W.putih, baris, u, { rx: 3, z: 1 });
}

/* ------------------------------ Penggaris ------------------------------ */
/**
 * Penggaris `${id}` sepanjang `cm` sentimeter (lebar `px` tiap sentimeter), pojok kiri-atas (x, y), tinggi 16.
 * Tanda `${id}-m0`.. tiap sentimeter, angka `${id}-a0`.. tiap `tiap` sentimeter.
 */
export function penggaris(id: string, x: number, y: number, cm: number, px: number, tiap = 1, warna: string = W.penggaris): Obj[] {
  const out: Obj[] = [kotak(id, x, y, cm * px, 16, warna, W.biru, { rx: 2, tebal: 1.2, z: 1 })];
  for (let i = 0; i <= cm; i += 1) {
    out.push(garis(`${id}-m${i}`, bulatkan(x + i * px), y, 0, i % 5 === 0 ? 8 : 5, W.biru, i % 5 === 0 ? 1.2 : 0.8, { z: 2 }));
    if (i % tiap === 0) out.push(teks(`${id}-a${i}`, bulatkan(x + i * px), y + 14, String(i), 5.8, W.biru, { z: 2 }));
  }
  return out;
}
export const idPenggaris = (id: string, cm: number, tiap = 1): string[] => [id, ...Array.from({ length: cm + 1 }, (_, i) => [`${id}-m${i}`, ...(i % tiap === 0 ? [`${id}-a${i}`] : [])]).flat()];

/**
 * Penggaris bergaris milimeter `${id}` sepanjang `cm` sentimeter (lebar `px` tiap sentimeter), pojok kiri-atas (x, y), tinggi 18.
 * Garis tiap milimeter `${id}-g0`.. (panjang 4, tiap lima milimeter 6, tiap sentimeter 9), angka `${id}-a0`.. tiap sentimeter.
 */
export function penggarisMm(id: string, x: number, y: number, cm: number, px: number, warna: string = W.penggaris): Obj[] {
  const out: Obj[] = [kotak(id, x, y, cm * px, 18, warna, W.biru, { rx: 2, tebal: 1.2, z: 1 })];
  for (let i = 0; i <= cm * 10; i += 1) out.push(garis(`${id}-g${i}`, bulatkan(x + (i * px) / 10), y, 0, i % 10 === 0 ? 9 : i % 5 === 0 ? 6 : 4, W.biru, i % 10 === 0 ? 1.3 : 0.7, { z: 2 }));
  for (let i = 0; i <= cm; i += 1) out.push(teks(`${id}-a${i}`, bulatkan(x + i * px), y + 16.5, String(i), 5.6, W.biru, { z: 2 }));
  return out;
}
export const idPenggarisMm = (id: string, cm: number): string[] => [id, ...Array.from({ length: cm * 10 + 1 }, (_, i) => `${id}-g${i}`), ...Array.from({ length: cm + 1 }, (_, i) => `${id}-a${i}`)];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Bu Ratih" | "Kak Anton";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`, membawa termos `${id}-ts`;
 * Bu Ratih berbaju kuning `${id}-bj`, bercaping `${id}-tp`, berpita merah di pinggang `${id}-pt`; Kak Anton (kecil) bertopi biru `${id}-tp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" ? E.pak : nama === "Bu Ratih" ? E.bu : E.anton;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const topi = (warna: string, garisW: string, lebar = 20): Obj => kotak(`${id}-tp`, bulatkan(x - lebar / 2), bulatkan(y - u * 0.78), lebar, 6, warna, garisW, { rx: 2, tebal: 1, z: 2 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(topi("#D4A55A", "#92400E", 24));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.5), 0, 8, "#F59E0B", 2, { z: 2 }));
    out.push(kotak(`${id}-ts`, x - 17, bulatkan(y + 3), 5, 11, "#94A3B8", "#475569", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Ratih") {
    out.push(baju("#FACC15", "#A16207", 12));
    out.push(topi("#E7C48F", "#92400E", 30));
    out.push(kotak(`${id}-pt`, x - 11, bulatkan(y + 11), 22, 3, "#DC2626", "#7F1D1D", { rx: 1, tebal: 0.8, z: 2 }));
  }
  if (nama === "Kak Anton") out.push(topi("#2563EB", "#1E3A8A", Math.round(u * 0.8)));
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Bu Ratih" ? 18 : nama === "Kak Anton" ? 9 : 15)), nama, nama === "Kak Anton" ? 6.4 : 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`, `${id}-ts`] : []),
  ...(nama === "Bu Ratih" ? [`${id}-bj`, `${id}-tp`, `${id}-pt`] : []),
  ...(nama === "Kak Anton" ? [`${id}-tp`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
