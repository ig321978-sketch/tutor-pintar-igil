import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno" (penjumlahan pecahan: penyebut sama, KPK, campuran dengan dua cara, disederhanakan). Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: mobil roti keliling di taman. Bar pecahan DIGAMBAR SUNGGUH dari data: tiap bar punya `d` sel, `n` sel terisi mulai dari sel ke-`mulai`, dan bilangan bulat digambar sebagai bar penuh
 * (id berurut `${id}${i}`). Tokoh: Bima (kaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara),
 * Pak Seno (bertopi koki tinggi, membawa roti isi), Bu Nani (berselendang biru, membawa loyang). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  rumput: "#DCFCE7",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  sorot: "#FDE68A",
  langit: "#DBEAFE",
  roti: "#F5C97A",
  rotiTua: "#B45309",
  amber: "#FCD34D",
  biruMuda: "#93C5FD",
  biruGaris: "#1D4ED8",
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
  pegal: "\u{1F613}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  roti: "\u{1F35E}",
  kue: "\u{1F370}",
  catat: "\u{1F4DD}",
  bintang: "\u{2B50}",
  rantai: "\u{1F517}",
  tambah: "\u{2795}",
  lagu: "\u{1F3B5}",
  megafon: "\u{1F4E2}",
  cari: "\u{1F50D}",
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

/** Rumput taman dari tinggi y sampai bawah kanvas. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.rumput, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/**
 * Bar pecahan: `d` sel selebar `lebar` berpusat di kiri (x, y); `n` sel terisi mulai dari sel ke-`mulai`. Id sel `${id}${i}` (digambar SUNGGUH sebanyak d).
 * Sel terisi berwarna `warna`, sel kosong putih bergaris putus.
 */
export function bar(id: string, x: number, y: number, d: number, n: number, o: { lebar?: number; mulai?: number; h?: number; warna?: string; garis?: string } = {}): Obj[] {
  const lebar = o.lebar ?? 120;
  const mulai = o.mulai ?? 0;
  const h = o.h ?? 14;
  const sw = lebar / d;
  return Array.from({ length: d }, (_, i) => {
    const isi = i >= mulai && i < mulai + n;
    return kotak(`${id}${i}`, bulatkan(x + i * sw), y, bulatkan(sw - 1.4), h, isi ? (o.warna ?? W.amber) : W.putih, isi ? (o.garis ?? W.rotiTua) : "#94A3B8", { rx: 1.5, tebal: 1, z: 2, ...(isi ? {} : { putus: true }) });
  });
}
export const idBar = (id: string, d: number): string[] => Array.from({ length: d }, (_, i) => `${id}${i}`);

/**
 * Pecahan campuran: `w` bar penuh (id `${id}w${r}${i}`) ditumpuk ke bawah, lalu satu bar berisi `n` dari `d` sel (id `${id}p${i}`) bila n > 0.
 * Mengembalikan benda dan tinggi seluruhnya.
 */
export function campur(id: string, x: number, y: number, w: number, n: number, d: number, o: { lebar?: number; h?: number; jarak?: number; warna?: string; garis?: string } = {}): { objs: Obj[]; tinggi: number; banyakBar: number } {
  const h = o.h ?? 12;
  const jarak = o.jarak ?? 3;
  const objs: Obj[] = [];
  let yy = y;
  for (let r = 0; r < w; r += 1) {
    objs.push(...bar(`${id}w${r}-`, x, yy, d, d, { lebar: o.lebar, h, warna: o.warna, garis: o.garis }));
    yy += h + jarak;
  }
  if (n > 0) {
    objs.push(...bar(`${id}p`, x, yy, d, n, { lebar: o.lebar, h, warna: o.warna, garis: o.garis }));
    yy += h + jarak;
  }
  return { objs, tinggi: yy - y, banyakBar: w + (n > 0 ? 1 : 0) };
}
/** Id semua sel dari campur(...). */
export function idCampur(id: string, w: number, n: number, d: number): string[] {
  return [...Array.from({ length: w }, (_, r) => idBar(`${id}w${r}-`, d)).flat(), ...(n > 0 ? idBar(`${id}p`, d) : [])];
}

/** Kartu: kotak `${id}-k` dan teks `${id}-t` di tengahnya. */
export const kartu = (id: string, x: number, y: number, w: number, h: number, warna: string, isi: string, u = 9, warnaTeks: string = W.biru): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.4, z: 1 }),
  teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, warnaTeks, { z: 3 }),
];
export const idKartu = (id: string): string[] => [`${id}-k`, `${id}-t`];

/** Gerobak roti: badan kayu, atap berumbai, dua roda, dan roti di etalase. Id `${id}-b`, `${id}-a`, `${id}-r1`, `${id}-r2`, `${id}-e`. */
export const gerobak = (id: string, x: number, y: number): Obj[] => [
  kotak(`${id}-a`, x, y, 84, 12, "#F87171", "#7F1D1D", { rx: 3, tebal: 1.4, z: 2 }),
  kotak(`${id}-b`, x + 4, y + 12, 76, 40, W.kayu, W.kayuTua, { rx: 4, tebal: 1.6, z: 1 }),
  kotak(`${id}-e`, x + 10, y + 18, 64, 18, W.kapur, W.coklat, { rx: 3, tebal: 1.2, z: 2 }),
  bulat(`${id}-r1`, x + 18, y + 54, 7, W.abu, W.kayuTua, { tebal: 2, z: 2 }),
  bulat(`${id}-r2`, x + 66, y + 54, 7, W.abu, W.kayuTua, { tebal: 2, z: 2 }),
];
export const idGerobak = (id: string): string[] => [`${id}-a`, `${id}-b`, `${id}-e`, `${id}-r1`, `${id}-r2`];

/** Sapu: gagang dan bulu, di sisi (x, y). Id `${id}-g`, `${id}-s`. */
export const sapu = (id: string, x: number, y: number): Obj[] => [garis(`${id}-g`, x, y, 10, 34, W.kayuTua, 2.4, { z: 3 }), kotak(`${id}-s`, x + 4, y + 32, 14, 8, W.sorot, W.coklat, { rx: 2, tebal: 1.2, z: 3 })];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Pak Seno" | "Bu Nani";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`;
 * Citra berkucir dua `${id}-k1`, `${id}-k2`; Fajar bertopi suporter `${id}-tp`; Pak Arif berompi oranye `${id}-bj` dan berpengeras suara `${id}-mg`;
 * Pak Seno bertopi koki tinggi `${id}-tk` dan `${id}-tb`; Bu Nani berselendang biru `${id}-sl` dan membawa loyang `${id}-ly`.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tidak menimpa tepi bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Pak Arif" || nama === "Pak Seno" ? E.pak : E.bu;
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
  if (nama === "Pak Seno") {
    out.push(baju("#FFFFFF", "#94A3B8", 12));
    out.push(kotak(`${id}-tk`, x - 9, bulatkan(y - u * 1.05), 18, 12, "#FFFFFF", "#94A3B8", { rx: 4, tebal: 1.2, z: 2 }));
    out.push(kotak(`${id}-tb`, x - 11, bulatkan(y - u * 0.5), 22, 3, "#FFFFFF", "#94A3B8", { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Bu Nani") {
    out.push(baju("#F9A8D4", "#9D174D", 12));
    out.push(kotak(`${id}-sl`, x - 12, bulatkan(y + 1), 24, 5, "#2563EB", "#1E3A8A", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-ly`, x + 12, bulatkan(y + 6), 14, 8, "#CBD5E1", "#475569", { rx: 2, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Arif" || nama === "Pak Seno" || nama === "Bu Nani" ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-mg`] : []),
  ...(nama === "Pak Seno" ? [`${id}-bj`, `${id}-tk`, `${id}-tb`] : []),
  ...(nama === "Bu Nani" ? [`${id}-bj`, `${id}-sl`, `${id}-ly`] : []),
];

/**
 * Pecahan bertingkat: pembilang `${id}-a` di atas, garis `${id}-g`, penyebut `${id}-b` di bawah, berpusat di (x, y) pada garis.
 * Tingginya sekitar 2,1 kali `u`.
 */
export function pec(id: string, x: number, y: number, atas: string, bawah: string, u = 16, wa: string = W.biru, wb: string = W.biru): Obj[] {
  const lebar = Math.max(atas.length, bawah.length) * u * 0.62 + 6;
  return [
    teks(`${id}-a`, x, bulatkan(y - 4), atas, u, wa, { z: 3 }),
    garis(`${id}-g`, bulatkan(x - lebar / 2), y, bulatkan(lebar), 0, W.biru, 1.6, { z: 3 }),
    teks(`${id}-b`, x, bulatkan(y + u * 0.95), bawah, u, wb, { z: 3 }),
  ];
}
export const idPec = (id: string): string[] => [`${id}-a`, `${id}-g`, `${id}-b`];
