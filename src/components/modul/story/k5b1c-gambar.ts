import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari" (menguraikan bilangan, tukar bundel, susun kembali). Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: gudang tiket di bawah tribun Stadion Kota: rak kayu, bundel tiket (kardus, dus, pak, ikat, lembar) yang digambar SUNGGUH sebanyak yang diucapkan (id berurut `${awalan}${i}`),
 * kotak slot kolom, bendera klub. Tokoh: Bima (kaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara),
 * Bu Lestari (berkacamata, membawa kotak kas), Pak Darmo (berjaket merah, berpapan jepit). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  oranye: "#EA580C",
  lantai: "#E2E8F0",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  sorot: "#FDE68A",
  langit: "#DBEAFE",
  rumput: "#DCFCE7",
  pink: "#FCE7F3",
  kapur: "#FEF9C3",
};

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F602}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  tepuk: "\u{1F44F}",
  jempol: "\u{1F44D}",
  bendera: "\u{1F6A9}",
  catat: "\u{1F4DD}",
  papan: "\u{1F4CB}",
  kotak: "\u{1F4E6}",
  megafon: "\u{1F4E2}",
  tiket: "\u{1F3AB}",
  pikir: "\u{1F914}",
  bintang: "\u{2B50}",
  lampu: "\u{1F4A1}",
} as const;

type Opsi = Partial<Obj>;
export const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.hijauTua): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Lantai gudang dari tinggi y sampai bawah kanvas. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 })];
}
/** Rumput lapangan dari tinggi y sampai bawah kanvas. */
export function rumput(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, "#BBF7D0", undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Rak gudang kayu: rangka `${id}` dan dua papan `${id}-p1`, `${id}-p2`. Pojok kiri-atas (x, y). */
export function rak(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [
    kotak(id, x, y, w, h, "#FDF2D8", W.kayuTua, { rx: 4, tebal: 2, z: -1 }),
    garis(`${id}-p1`, x, bulatkan(y + h / 3), w, 0, W.kayu, 3, { z: 0 }),
    garis(`${id}-p2`, x, bulatkan(y + (2 * h) / 3), w, 0, W.kayu, 3, { z: 0 }),
  ];
}
export const idRak = (id: string): string[] => [id, `${id}-p1`, `${id}-p2`];

/* ------------------------------ Bundel tiket ------------------------------ */
export type Jenis = "kardus" | "dus" | "pak" | "ikat" | "lembar";
export const UKURAN: Record<Jenis, { w: number; h: number; warna: string; garis: string }> = {
  kardus: { w: 22, h: 16, warna: "#D6A25E", garis: "#7C4A12" },
  dus: { w: 17, h: 12, warna: "#FDE68A", garis: "#B45309" },
  pak: { w: 12, h: 9, warna: "#BFDBFE", garis: "#1D4ED8" },
  ikat: { w: 9, h: 7, warna: "#BBF7D0", garis: "#15803D" },
  lembar: { w: 6, h: 8, warna: "#FFFFFF", garis: "#64748B" },
};

/** `n` bundel sejenis berjajar, benda pertama berpusat di (x, y). Digambar SUNGGUH sebanyak n; id `${id}${i}`. */
export function bundel(id: string, x: number, y: number, jenis: Jenis, n: number, gap?: number): Obj[] {
  const u = UKURAN[jenis];
  const g = gap ?? u.w + 3;
  return Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, bulatkan(x - u.w / 2 + i * g), bulatkan(y - u.h / 2), u.w, u.h, u.warna, u.garis, { rx: 2, tebal: 1.1, z: 3 }));
}
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Kartu: kotak `${id}-k` dan teks `${id}-t` di tengahnya. */
export const kartu = (id: string, x: number, y: number, w: number, h: number, warna: string, isi: string, u = 9, warnaTeks: string = W.biru): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.4, z: 1 }),
  teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, warnaTeks, { z: 3 }),
];
export const idKartu = (id: string): string[] => [`${id}-k`, `${id}-t`];

/* ------------------------------ Kotak slot kolom ------------------------------ */
export const NAMA_KOLOM = ["puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const xSlot = (i: number): number => 33 + i * 58;
/** Lima kotak slot kolom dengan nama kolom: kotak `${id}${i}-k` dan nama `${id}${i}-h`. Tinggi kotak 46 dari y. */
export function slotKolom(id: string, y: number): Obj[] {
  return NAMA_KOLOM.flatMap((n, i) => [
    kotak(`${id}${i}-k`, xSlot(i) - 27, y, 54, 46, W.putih, W.biru, { rx: 5, tebal: 1.4, z: 1 }),
    teks(`${id}${i}-h`, xSlot(i), y + 11, n, 7.2, W.coklat, { z: 3 }),
  ]);
}
export const idSlot = (id: string): string[] => NAMA_KOLOM.flatMap((_, i) => [`${id}${i}-k`, `${id}${i}-h`]);
/** Angka di slot ke-i: teks `${id}${i}-d`. */
export const angkaSlot = (id: string, i: number, y: number, isi: string, warna: string = W.merah): Obj => teks(`${id}${i}-d`, xSlot(i), y + 38, isi, 22, warna, { z: 4 });

/** Bendera klub: tiang `${id}-t` dan kain `${id}-b`. Pangkal tiang di (x, y), tinggi 24. */
export const bendera = (id: string, x: number, y: number, warna: string = W.merah): Obj[] => [garis(`${id}-t`, x, y - 24, 0, 24, W.kayuTua, 2, { z: 1 }), kotak(`${id}-b`, x, y - 24, 16, 10, warna, W.kayuTua, { rx: 1, tebal: 1, z: 2 })];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Bu Lestari" | "Pak Darmo";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`;
 * Citra berkucir dua `${id}-k1`, `${id}-k2`; Fajar bertopi suporter `${id}-tp`; Pak Arif berompi oranye `${id}-bj` dan berpengeras suara `${id}-mg`;
 * Bu Lestari berkacamata `${id}-ka`, berbaju biru `${id}-bj`, membawa kotak kas `${id}-ks`; Pak Darmo berjaket merah `${id}-bj` dan berpapan jepit `${id}-pj`.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tidak menimpa tepi bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Pak Arif" || nama === "Pak Darmo" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 10): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Bima") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 1), 9, 12, "#FDE68A", "#92400E", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Citra") {
    out.push(bulat(`${id}-k1`, x - 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Fajar") out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.78), 18, 6, "#DC2626", "#7F1D1D", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Arif") {
    out.push(baju("#EA580C", "#7C2D12", 12));
    out.push(kotak(`${id}-mg`, x + 12, bulatkan(y + 2), 8, 7, "#94A3B8", "#475569", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Lestari") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(garis(`${id}-ka`, x - 8, bulatkan(y - u * 0.28), 16, 0, "#1F2937", 1.6, { z: 2 }));
    out.push(kotak(`${id}-ks`, x + 12, bulatkan(y + 4), 10, 8, "#FACC15", "#854D0E", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Darmo") {
    out.push(baju("#DC2626", "#7F1D1D", 12));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 1), 9, 12, "#FDE68A", "#92400E", { rx: 1, tebal: 0.9, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Arif" || nama === "Bu Lestari" || nama === "Pak Darmo" ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-mg`] : []),
  ...(nama === "Bu Lestari" ? [`${id}-bj`, `${id}-ka`, `${id}-ks`] : []),
  ...(nama === "Pak Darmo" ? [`${id}-bj`, `${id}-pj`] : []),
];
