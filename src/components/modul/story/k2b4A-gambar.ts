import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 4 Sub-Bab A "Rak Pameran Pak Hasan" (posisi benda), awal cerita Pameran Kerajinan Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa pameran: lantai aula `${id}`, atap kain stan bergerigi `${id}`, rak kayu `${id}` (papan atas, kaki, papan tengah), kartu denah, karya (guci, kendi,
 * wayang kertas digambar dari bentuk; topeng, lampion, boneka beremoji), kotak peta (sel `${id}c{i}`), sekat, dan papan catatan Dika.
 * Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (selempang hijau PANITIA digambar), Pak Hasan (ikat kepala cokelat dan pensil di telinga digambar). Tanpa ZWJ.
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
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};

/** Warna rupa pameran. */
export const WP = { lantai: "#FDE68A", lantaiGaris: "#D97706", kayu: "#D6A15E", kayuGelap: "#A16207", kain: "#F87171", kainGaris: "#B91C1C", kertas: "#FFFBEB" } as const;

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  pak: "\u{1F468}",
  anak: "\u{1F9D2}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  mata: "\u{1F440}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  jari: "\u{1F446}",
  lambai: "\u{1F44B}",
  bintang: "\u{2B50}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  harta: "\u{1F4B0}",
  bola: "\u{26BD}",
  telinga: "\u{1F442}",
  tidur: "\u{1F4A4}",
  bicara: "\u{1F4AC}",
  peta: "\u{1F5FA}",
  peti: "\u{1F4E6}",
  topeng: "\u{1F3AD}",
  lampion: "\u{1F3EE}",
  boneka: "\u{1F9F8}",
  geleng: "\u{1F625}",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
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

/* ------------------------------ Aula pameran ------------------------------ */

/** Lantai aula `${id}` mulai tinggi y sampai bawah kanvas. */
export const lantai = (id: string, y = 166): Obj => kotak(id, 2, y, 296, 198 - y, WP.lantai, WP.lantaiGaris, { rx: 4, tebal: 1.2, z: -3 });

/** Atap kain stan bergerigi `${id}` di lebar w; pojok kiri-atas (x, y), tinggi 20. */
export const atapKain = (id: string, x: number, y: number, w: number): Obj => ({
  id,
  t: "jalur",
  x,
  y,
  d: `M0 0 L${w} 0 L${w} 12 L${bulatkan(w * 0.875)} 20 L${bulatkan(w * 0.75)} 12 L${bulatkan(w * 0.625)} 20 L${bulatkan(w * 0.5)} 12 L${bulatkan(w * 0.375)} 20 L${bulatkan(w * 0.25)} 12 L${bulatkan(w * 0.125)} 20 L0 12 Z`,
  warna: WP.kain,
  garis: WP.kainGaris,
  tebal: 1.8,
  z: -2,
});

/**
 * Rak kayu bertingkat: papan atas `${id}` setebal 7, dua kaki `${id}-l` dan `${id}-r`, papan tengah `${id}-m`.
 * Pojok kiri-atas (x, y), lebar w, tinggi h (sampai lantai). Permukaan: puncak = y, papan tengah = y + h / 2, lantai = y + h.
 */
export const rak = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(`${id}-l`, x + 4, y + 6, 6, h - 6, WP.kayuGelap, W.coklat, { rx: 1, tebal: 1.2, z: -2 }),
  kotak(`${id}-r`, x + w - 10, y + 6, 6, h - 6, WP.kayuGelap, W.coklat, { rx: 1, tebal: 1.2, z: -2 }),
  kotak(`${id}-m`, x + 3, y + h / 2, w - 6, 5, WP.kayu, W.coklat, { rx: 1, tebal: 1.2, z: -1 }),
  kotak(id, x, y, w, 7, WP.kayu, W.coklat, { rx: 2, tebal: 1.8, z: -1 }),
];
export const idRak = (id: string): string[] => [id, `${id}-l`, `${id}-r`, `${id}-m`];

/* ------------------------------ Karya ------------------------------ */

export type Karya = "guci" | "kendi" | "topeng" | "lampion" | "wayang" | "boneka";
const EMO_KARYA: Partial<Record<Karya, string>> = { topeng: E.topeng, lampion: E.lampion, boneka: E.boneka };
const BENTUK_KARYA: Partial<Record<Karya, { d: string; warna: string; garis: string }>> = {
  guci: { d: "M-5 -11 L5 -11 L4 -7 C12 -4 12 7 6 11 L-6 11 C-12 7 -12 -4 -4 -7 Z", warna: "#FB923C", garis: "#9A3412" },
  kendi: { d: "M-3 -11 L3 -11 L3 -6 C10 -4 11 6 6 11 L-6 11 C-11 6 -10 -4 -3 -6 Z M8 -2 L15 -6 L13 1 Z", warna: "#2DD4BF", garis: "#0F766E" },
  wayang: { d: "M0 -12 L3 -7 L2 -3 L9 3 L3 3 L3 12 L-3 12 L-3 3 L-9 3 L-2 -3 L-3 -7 Z", warna: "#FCD34D", garis: "#92400E" },
};
/** Satu karya berpusat di (cx, cy): guci, kendi, dan wayang kertas digambar dari bentuk; topeng, lampion, boneka beremoji. */
export function karya(id: string, jenis: Karya, cx: number, cy: number, o: Opsi = {}): Obj {
  const b = BENTUK_KARYA[jenis];
  if (b) return { id, t: "jalur", x: cx, y: cy, d: b.d, warna: b.warna, garis: b.garis, tebal: 1.6, ...o };
  return emo(id, cx, cy + 7, EMO_KARYA[jenis] ?? E.peti, 20, o);
}
/** Letak (x, y) sebuah karya berpusat di (cx, cy), untuk ubah. */
export const letakKarya = (jenis: Karya, cx: number, cy: number): { x: number; y: number } => ({ x: cx, y: BENTUK_KARYA[jenis] ? cy : cy + 7 });

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Pak Hasan";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari berselempang hijau `${id}-sl` bertulisan PANITIA `${id}-st`;
 * Pak Hasan berikat kepala cokelat `${id}-ik` dan pensil di telinga `${id}-pn`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Bu Sari" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, bulatkan(y - u * 0.5), E.topi, bulatkan(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") out.push(kotak(`${id}-sl`, x - 15, y + 4, 30, 9, "#16A34A", "#14532D", { rx: 3, tebal: 1.2, z: 2 }), teks(`${id}-st`, x, y + 10.4, "PANITIA", 5.2, W.putih, { z: 3 }));
  if (nama === "Pak Hasan") {
    out.push(kotak(`${id}-ik`, x - 11, bulatkan(y - u * 0.66), 22, 4, "#92400E", "#451A03", { rx: 1.5, tebal: 1, z: 2 }));
    out.push(garis(`${id}-pn`, x + 12, bulatkan(y - u * 0.4), 3, -9, "#FACC15", 2.4, { z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Bu Sari" ? 19 : 13)), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-sl`, `${id}-st`] : []),
  ...(nama === "Pak Hasan" ? [`${id}-ik`, `${id}-pn`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => tokoh(id, x, y, nama, u).map((o) => ({ id: o.id, x: o.x, y: o.y }));

/* ------------------------------ Papan catatan dan kotak peta ------------------------------ */

/** Papan catatan Dika: kertas krem berpenjepit di atas papan kayu `${id}`; jepit `${id}-j`. */
export const papanCatat = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FEF3C7", W.coklat, { rx: 5, tebal: 3.4, z: -1 }),
  kotak(`${id}-j`, x + w / 2 - 12, y - 4, 24, 8, "#9CA3AF", "#4B5563", { rx: 2, tebal: 1.2, z: 0 }),
];
export const idPapan = (id: string): string[] => [id, `${id}-j`];

/** Kotak peta di kertas: dasar `${id}` dan sel `${id}c{i}` (k kolom, b baris, sisi s). Pojok kiri-atas (x, y). */
export const peta = (id: string, x: number, y: number, k: number, b: number, s = 30): Obj[] => [
  kotak(id, x - 3, y - 3, k * s + 6, b * s + 6, W.putih, W.coklat, { rx: 4, tebal: 2, z: -2 }),
  ...Array.from({ length: k * b }, (_, i) => kotak(`${id}c${i}`, x + (i % k) * s + 1, y + Math.floor(i / k) * s + 1, s - 2, s - 2, "#E0F2FE", "#7DD3FC", { rx: 2, tebal: 1.1, z: -1 })),
];
export const idPeta = (id: string, k: number, b: number): string[] => [id, ...Array.from({ length: k * b }, (_, i) => `${id}c${i}`)];
/** Tengah sel ke-i pada peta. */
export const tengahSel = (x: number, y: number, k: number, i: number, s = 30): Titik => ({ x: x + (i % k) * s + s / 2, y: y + Math.floor(i / k) * s + s / 2 });

/** Sekat tegak di tengah meja: papan `${id}` dan kaki `${id}-k`. Pojok kiri-atas (x, y), tinggi h. */
export const sekat = (id: string, x: number, y: number, h: number): Obj[] => [
  kotak(id, x, y, 8, h, "#60A5FA", "#1D4ED8", { rx: 2, tebal: 1.8, z: 1 }),
  kotak(`${id}-k`, x - 6, y + h - 4, 20, 4, "#1D4ED8", "#1E3A8A", { rx: 1, tebal: 1, z: 1 }),
];
export const idSekat = (id: string): string[] => [id, `${id}-k`];

/** Meja pendek `${id}` untuk menata benda. Pojok kiri-atas (x, y). */
export const meja = (id: string, x: number, y: number, w: number): Obj => kotak(id, x, y, w, 6, WP.kayu, W.coklat, { rx: 1.5, tebal: 1.6, z: -1 });

/**
 * Anak terlihat dari belakang (membelakangi kita): rambut `${id}`, topi `${id}-tp`, badan `${id}-bd`, nama `${id}-n`.
 * Pusat kepala (x, y); badan ke bawah. Tanpa wajah, karena anak menghadap arah yang sama dengan kita.
 */
export const anakBelakang = (id: string, x: number, y: number, nama = "Nia"): Obj[] => [
  bulat(id, x, y, 10, "#7C2D12", "#431407", { tebal: 1.4, z: 1 }),
  emo(`${id}-tp`, x, bulatkan(y - 3), E.topi, 17, { z: 2 }),
  kotak(`${id}-bd`, x - 11, y + 10, 22, 22, W.ungu, "#4C1D95", { rx: 5, tebal: 1.4, z: 1 }),
  teks(`${id}-n`, x, bulatkan(y + 45), nama, 8.4, W.ungu, { z: 2 }),
];
export const idAnakBelakang = (id: string): string[] => [id, `${id}-tp`, `${id}-bd`, `${id}-n`];
