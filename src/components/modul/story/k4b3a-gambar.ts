import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri" (pola gambar: deret membesar dan mengecil, selisih tetap, tabel selisih, susunan per lima), awal cerita Orkestra Angklung Kampung Senandung.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa lapangan: rumput Kampung Senandung dengan papan nama ORKESTRA ANGKLUNG KAMPUNG SENANDUNG, rak angklung bertingkat, panggung kayu, deret angklung (tabung bambu berderet),
 * kertas saku bertabel, papan kapur untuk video metode global. Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci),
 * Pak Hendro (bertopi pantai, berpeluit, membawa tas kain), Bu Ratri (berselendang hijau, memegang tongkat dirigen), Pak Gunawan (berompi oranye, membawa meteran dan palu; kecil di kejauhan).
 * Tanpa ZWJ, emoji paling tinggi U+1FA95.
 * Angklung berderet bernama `id-c{nomor}` supaya uji bisa menghitung ulang banyak dan jarak antarangklung dari gambar.
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
  tanya: "#F59E0B",
  rumput: "#D9F99D",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  bambu: "#FBBF24",
  bambuTua: "#B45309",
  sorot: "#FDE68A",
};

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
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  jari: "\u{261D}",
  mata: "\u{1F440}",
  megafon: "\u{1F4E2}",
  nada: "\u{1F3B5}",
  musik: "\u{1F3B6}",
  lonceng: "\u{1F514}",
  bulan: "\u{1F307}",
  keringat: "\u{1F613}",
  bintang: "\u{2B50}",
  lampu: "\u{1F4A1}",
  tertawa: "\u{1F602}",
  kuat: "\u{1F4AA}",
  bicara: "\u{1F4AC}",
  peti: "\u{1F4E6}",
  roket: "\u{1F680}",
  mik: "\u{1F3A4}",
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

/* ------------------------------ Lapangan ------------------------------ */
/** Rumput lapangan `${id}` dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.rumput, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Papan nama kayu: bingkai `${id}`, tulisan `${id}-s1` (ORKESTRA ANGKLUNG) dan `${id}-s2` (KAMPUNG SENANDUNG). Pojok kiri-atas (x, y), lebar w. */
export function papanNama(id: string, x: number, y: number, w = 120): Obj[] {
  return [
    kotak(id, x, y, w, 34, "#FEF3C7", W.kayuTua, { rx: 4, tebal: 2, z: 1 }),
    teks(`${id}-s1`, bulatkan(x + w / 2), y + 14, "ORKESTRA ANGKLUNG", 7, W.hijauTua, { z: 2 }),
    teks(`${id}-s2`, bulatkan(x + w / 2), y + 26, "KAMPUNG SENANDUNG", 7, W.coklat, { z: 2 }),
  ];
}
export const idPapanNama = (id: string): string[] => [id, `${id}-s1`, `${id}-s2`];

/** Rak angklung bertingkat: rangka `${id}`, papan tingkat `${id}-p1` dan `${id}-p2` (membagi rak menjadi tiga tingkat). Pojok kiri-atas (x, y). */
export function rakAngklung(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [
    kotak(id, x, y, w, h, "#FDF1D6", W.kayuTua, { rx: 3, tebal: 2, z: 0 }),
    garis(`${id}-p1`, x, bulatkan(y + h / 3), w, 0, W.kayuTua, 2.4, { z: 1 }),
    garis(`${id}-p2`, x, bulatkan(y + (2 * h) / 3), w, 0, W.kayuTua, 2.4, { z: 1 }),
  ];
}

/** Panggung kayu: lantai `${id}` dan dua kaki `${id}-k1`, `${id}-k2`. Pojok kiri-atas lantai (x, y), lebar w. */
export function panggung(id: string, x: number, y: number, w: number): Obj[] {
  return [
    kotak(id, x, y, w, 10, W.kayu, W.kayuTua, { rx: 2, tebal: 1.6, z: 1 }),
    kotak(`${id}-k1`, x + 6, y + 10, 6, 18, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 0 }),
    kotak(`${id}-k2`, bulatkan(x + w - 12), y + 10, 6, 18, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 0 }),
  ];
}

/* ------------------------------ Deret angklung ------------------------------ */
/**
 * Deret n angklung (tabung bambu berdiri) berjarak sama: `${id}-c{i}` (mulai nol), tinggi h, lebar 8. Angklung pertama berpusat di x0, tiap angklung berikutnya dx ke kanan.
 * Dasar tabung (ujung bawah) di tinggi y.
 */
export function deret(id: string, x0: number, y: number, n: number, dx = 14, h = 16, warna: string = W.bambu): Obj[] {
  return Array.from({ length: n }, (_, i) => kotak(`${id}-c${i}`, bulatkan(x0 + i * dx - 4), y - h, 8, h, warna, W.bambuTua, { rx: 2, tebal: 1.2, z: 2 }));
}
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-c${i}`);

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Ratri" | "Pak Gunawan";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka`, berkepang satu `${id}-k1`, membawa kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro berkaus hijau `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl` dan membawa tas kain `${id}-ts`;
 * Bu Ratri berselendang hijau `${id}-sl` dan memegang tongkat dirigen `${id}-tg`; Pak Gunawan berompi oranye `${id}-bj` dan bertopi proyek `${id}-tp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Pak Hendro" || nama === "Pak Gunawan" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Laras") {
    out.push(garis(`${id}-ka`, x - 8, bulatkan(y - u * 0.28), 16, 0, "#1F2937", 1.6, { z: 2 }));
    out.push(bulat(`${id}-k1`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Genta") out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.78), 16, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Hendro") {
    out.push(baju("#15803D", "#14532D", 12));
    out.push(kotak(`${id}-tp`, x - 14, bulatkan(y - u * 0.78), 28, 6, "#FDE68A", "#92400E", { rx: 3, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 4, bulatkan(y + 4), 2.2, "#F59E0B", "#92400E", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-ts`, x - 19, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Ratri") {
    out.push(kotak(`${id}-sl`, x - 11, bulatkan(y + 2), 22, 9, "#16A34A", "#14532D", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(garis(`${id}-tg`, x + 12, bulatkan(y + 8), 9, -12, W.putih, 1.6, { z: 2 }));
  }
  if (nama === "Pak Gunawan") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-tp`, x - 12, bulatkan(y - u * 0.78), 24, 6, "#FACC15", "#92400E", { rx: 3, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Gunawan" ? 18 : 15)), nama, nama === "Pak Gunawan" ? 6.4 : 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-k1`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Ratri" ? [`${id}-sl`, `${id}-tg`] : []),
  ...(nama === "Pak Gunawan" ? [`${id}-bj`, `${id}-tp`] : []),
];

/* ------------------------------ Papan kapur (video metode global) ------------------------------ */
export const K = { papan: "#14532D", kapur: "#FEF9C3", kapurMerah: "#FCA5A5", kapurBiru: "#BAE6FD" };

/** Papan tulis hijau tua berbingkai kayu: bingkai `${id}`, papan `${id}-p`. Pojok kiri-atas (x, y). */
export function papanTulis(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#8B5A2B", "#451A03", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 5, y + 5, w - 10, h - 10, K.papan, "#052E16", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanTulis = (id: string): string[] => [id, `${id}-p`];

/** Serambi panggung kayu untuk adegan sore: lantai `${id}` dari tinggi y sampai bawah, dengan dua papan `${id}-g1`, `${id}-g2`. */
export function lantaiPanggung(id: string, y = 150): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, "#C99A63", undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 14, 292, 0, W.kayuTua, 0.8, { z: -2 }),
    garis(`${id}-g2`, 4, y + 32, 292, 0, W.kayuTua, 0.8, { z: -2 }),
  ];
}
