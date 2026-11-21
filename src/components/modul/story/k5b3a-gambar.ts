import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna" (membandingkan dan mengurutkan pecahan: pecahan biasa dan campuran, campuran menjadi biasa,
 * KPK dan pembilang, bilangan bulat dulu, garis bilangan), awal cerita Toko Roti Keliling. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: Toko Roti Keliling di pojok taman: mobil roti merah muda, meja timbangan, kantong tepung (tali merah), pecahan bertumpuk (pembilang di atas garis, penyebut di bawah),
 * bar pecahan (sel digambar sungguh sebanyak pembilang dari penyebut), garis bilangan dan papan tulis kecil. Tokoh: Bima (berkaus hijau, berpapan jepit), Citra (berkucir dua),
 * Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara kecil), Bu Ratna (bercelemek merah muda), Pak Seno (bertopi koki tinggi). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  lantai: "#FDE68A",
  taman: "#FFF1F2",
  papan: "#14532D",
  kapur: "#FEF9C3",
  sorot: "#FDE68A",
  jingga: "#FDBA74",
  langit: "#BAE6FD",
  biruMuda: "#DBEAFE",
  hijauMuda: "#DCFCE7",
  merahMuda: "#FECACA",
  pink: "#FBCFE8",
  pinkTua: "#BE185D",
};

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
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
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  megafon: "\u{1F4E2}",
  tertawa: "\u{1F602}",
  kuat: "\u{1F4AA}",
  bicara: "\u{1F4AC}",
  lampu: "\u{1F4A1}",
  lonceng: "\u{1F514}",
  roti: "\u{1F35E}",
  bagel: "\u{1F950}",
  kue: "\u{1F370}",
  pohon: "\u{1F333}",
  tunjuk: "\u{1F449}",
  keringat: "\u{1F4A6}",
  henti: "\u{1F6D1}",
  ulang: "\u{1F501}",
  bintang: "\u{2B50}",
  daftar: "\u{1F4CB}",
  penggaris: "\u{1F4CF}",
  ubah: "\u{1F504}",
  nada: "\u{1F3B5}",
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

/** Lantai taman dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/* ------------------------------ Pecahan bertumpuk ------------------------------ */
/** Pecahan biasa bertumpuk berpusat di (x, y) pada garis pecahan: pembilang `${id}-a`, garis `${id}-l`, penyebut `${id}-b`. */
export function pecahan(id: string, x: number, y: number, p: number, q: number, u = 11, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebar = bulatkan(Math.max(String(p).length, String(q).length) * u * 0.62 + 4);
  return [
    teks(`${id}-a`, x, bulatkan(y - 2.5), String(p), u, warna, { z: 3, ...o }),
    garis(`${id}-l`, bulatkan(x - lebar / 2), y, lebar, 0, warna, 1.4, { z: 3, ...o }),
    teks(`${id}-b`, x, bulatkan(y + u - 0.5), String(q), u, warna, { z: 3, ...o }),
  ];
}
export const idPecahan = (id: string): string[] => [`${id}-a`, `${id}-l`, `${id}-b`];
/** Pecahan campuran berpusat di (x, y): bilangan bulat `${id}-w` di kiri dan pecahan `${id}f`. */
export function campur(id: string, x: number, y: number, w: number, p: number, q: number, u = 11, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebarPec = Math.max(String(p).length, String(q).length) * u * 0.62 + 4;
  const lebarW = String(w).length * (u + 3) * 0.62 + 3;
  const kiri = x - (lebarPec + lebarW) / 2;
  return [teks(`${id}-w`, bulatkan(kiri + lebarW / 2), bulatkan(y + 5), String(w), u + 3, warna, { z: 3, ...o }), ...pecahan(`${id}f`, bulatkan(kiri + lebarW + lebarPec / 2), y, p, q, u, warna, o)];
}
export const idCampur = (id: string): string[] => [`${id}-w`, ...idPecahan(`${id}f`)];

/* ------------------------------ Bar pecahan ------------------------------ */
/** Bar satu baris dengan q sel sama lebar mulai (x, y) selebar w: sel `${id}-c{k}`, k < isi berwarna `warnaIsi`. */
export function barPec(id: string, x: number, y: number, w: number, h: number, q: number, isi: number, warnaIsi: string = W.jingga): Obj[] {
  const sel = w / q;
  return Array.from({ length: q }, (_, k) => kotak(`${id}-c${k}`, bulatkan(x + k * sel), y, bulatkan(sel), h, k < isi ? warnaIsi : W.putih, W.coklat, { rx: 2, tebal: 1.2, z: 1 }));
}
export const idBar = (id: string, q: number): string[] => Array.from({ length: q }, (_, k) => `${id}-c${k}`);
/** Warna sel bar ke-k sampai ke-l (tertutup). */
export const idSelBar = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}-c${dari + i}`);

/* ------------------------------ Kantong tepung dan timbangan ------------------------------ */
/** Kantong tepung dengan pusat bawah (x, yBawah): badan `${id}-bd`, leher `${id}-lh`, tali merah `${id}-tl`. Lebar 34, tinggi badan 36. */
export function kantong(id: string, x: number, yBawah: number, warna: string = W.krem, o: Opsi = {}): Obj[] {
  return [
    kotak(`${id}-bd`, x - 17, yBawah - 36, 34, 36, warna, W.coklat, { rx: 8, tebal: 1.6, z: 1, ...o }),
    kotak(`${id}-lh`, x - 10, yBawah - 44, 20, 9, W.sorot, W.coklat, { rx: 3, tebal: 1.2, z: 1, ...o }),
    garis(`${id}-tl`, x - 11, yBawah - 36, 22, 0, W.merah, 2.4, { z: 2, ...o }),
  ];
}
export const idKantong = (id: string): string[] => [`${id}-bd`, `${id}-lh`, `${id}-tl`];

/** Timbangan dua piring di meja: tiang `${id}-tg`, lengan `${id}-ln`, piring `${id}-pa` dan `${id}-pb`, tali piring `${id}-sa` dan `${id}-sb`, alas `${id}-al`. Pusat (x, y) di poros. */
export function timbangan(id: string, x: number, y: number): Obj[] {
  return [
    kotak(`${id}-tg`, x - 3, y, 6, 34, W.coklat, W.papan, { rx: 1, tebal: 1, z: 0 }),
    kotak(`${id}-al`, x - 20, y + 32, 40, 6, W.coklat, W.papan, { rx: 2, tebal: 1, z: 0 }),
    garis(`${id}-ln`, x - 44, y + 2, 88, -4, W.coklat, 3.4, { z: 1 }),
    garis(`${id}-sa`, x - 44, y + 2, 0, 14, W.coklat, 1.2, { z: 1 }),
    garis(`${id}-sb`, x + 44, y - 2, 0, 14, W.coklat, 1.2, { z: 1 }),
    kotak(`${id}-pa`, x - 62, y + 16, 36, 5, W.jingga, W.coklat, { rx: 2, tebal: 1.2, z: 1 }),
    kotak(`${id}-pb`, x + 26, y + 12, 36, 5, W.jingga, W.coklat, { rx: 2, tebal: 1.2, z: 1 }),
  ];
}
export const idTimbangan = (id: string): string[] => ["tg", "al", "ln", "sa", "sb", "pa", "pb"].map((s) => `${id}-${s}`);

/* ------------------------------ Garis bilangan ------------------------------ */
/** Garis bilangan dari x0 ke x1 pada tinggi y: garis `${id}-g`, tanda bilangan bulat `${id}-t{i}` dan angkanya `${id}-n{i}` untuk i = 0 sampai maks. */
export function garisBil(id: string, x0: number, x1: number, y: number, maks: number, u = 10): Obj[] {
  const satu = (x1 - x0) / maks;
  return [
    garis(`${id}-g`, x0 - 6, y, x1 - x0 + 12, 0, W.coklat, 2.4, { z: 1 }),
    ...Array.from({ length: maks + 1 }, (_, i) => [garis(`${id}-t${i}`, bulatkan(x0 + i * satu), y - 5, 0, 10, W.coklat, 1.8, { z: 1 }), teks(`${id}-n${i}`, bulatkan(x0 + i * satu), y + 17, String(i), u, W.biru, { z: 3 })]).flat(),
  ];
}
export const xBil = (x0: number, x1: number, maks: number, v: number): number => bulatkan(x0 + ((x1 - x0) * v) / maks);

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Bu Ratna" | "Pak Seno";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Bima berkaus hijau `${id}-bj` dan membawa papan jepit `${id}-pj`;
 * Citra berkucir dua `${id}-k1` `${id}-k2`; Fajar bertopi suporter `${id}-tp`; Pak Arif berompi oranye `${id}-bj` dan membawa pengeras suara kecil `${id}-pn`;
 * Bu Ratna bercelemek merah muda `${id}-bj` (dengan saku `${id}-sk`); Pak Seno berbaju putih `${id}-bj` dan bertopi koki tinggi `${id}-tk`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa tepi bawah kanvas. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Bu Ratna" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Bima") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 1), 9, 12, "#B7814A", "#6B4423", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Citra") {
    out.push(bulat(`${id}-k1`, x - 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Fajar") out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.78), 18, 6, "#DC2626", "#7F1D1D", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Arif") {
    out.push(baju("#EA580C", "#7C2D12", 12));
    out.push(kotak(`${id}-pn`, x + 12, bulatkan(y + 3), 9, 6, "#CBD5E1", "#475569", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Ratna") {
    out.push(baju("#F472B6", "#9D174D", 12));
    out.push(kotak(`${id}-sk`, x - 5, bulatkan(y + 8), 10, 5, "#FFFFFF", "#9D174D", { rx: 1, tebal: 0.8, z: 2 }));
  }
  if (nama === "Pak Seno") {
    out.push(baju("#FFFFFF", "#475569", 12));
    out.push(kotak(`${id}-tk`, x - 8, bulatkan(y - u * 1.05), 16, 11, "#FFFFFF", "#475569", { rx: 3, tebal: 1, z: 2 }));
  }
  const dewasa = nama === "Pak Arif" || nama === "Bu Ratna" || nama === "Pak Seno";
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (dewasa ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-pn`] : []),
  ...(nama === "Bu Ratna" ? [`${id}-bj`, `${id}-sk`] : []),
  ...(nama === "Pak Seno" ? [`${id}-bj`, `${id}-tk`] : []),
];
