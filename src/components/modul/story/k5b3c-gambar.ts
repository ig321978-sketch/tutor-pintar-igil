import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani" (pengurangan pecahan: penyebut sama, model arsir, campuran dua cara, penyebut beda dengan KPK).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: dapur roti keliling: bar loyang yang digambar SUNGGUH sebanyak bagian yang diucapkan (id berurut `${awalan}${i}`), pecahan bertumpuk (pembilang di atas garis, penyebut di bawah),
 * kartu cara, dan karung tepung. Tokoh: Bima (kaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara),
 * Bu Nani (berselendang biru, membawa loyang), Bu Ratna (bercelemek merah muda), Pak Seno (bertopi koki tinggi). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  lantai: "#E7E5E4",
  kayu: "#B7814A",
  sorot: "#FDE68A",
  langit: "#DBEAFE",
  daun: "#DCFCE7",
  pink: "#FCE7F3",
  pinkTua: "#BE185D",
  kapur: "#FEF9C3",
  isi: "#93C5FD",
  isiGaris: "#1E40AF",
  ambil: "#FDBA74",
  ambilGaris: "#C2410C",
  silang: "#FEE2E2",
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
  kue: "\u{1F370}",
  roti: "\u{1F35E}",
  panjang: "\u{1F956}",
  kering: "\u{1F36A}",
  mobil: "\u{1F69A}",
  balon: "\u{1F388}",
  pesta: "\u{1F389}",
  air: "\u{1F4A7}",
  gunting: "\u{2702}\u{FE0F}",
  cari: "\u{1F50D}",
  catat: "\u{1F4DD}",
  bintang: "\u{2B50}",
  rantai: "\u{1F517}",
  terima: "\u{1F64F}",
  megafon: "\u{1F4E2}",
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
export const judul = (isi: string, warna: string = W.pinkTua): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Lantai dapur dari tinggi y sampai bawah kanvas. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/* ------------------------------ Pecahan bertumpuk ------------------------------ */
/**
 * Pecahan bertumpuk berpusat di (x, y): pembilang `${id}p` di atas, garis `${id}g`, penyebut `${id}q` di bawah.
 * Pembilang dan penyebut masing-masing satu benda teks (angka tampak di gambar sesuai yang diucapkan).
 */
export function pec(id: string, x: number, y: number, p: number | string, q: number | string, u = 12, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebar = Math.max(String(p).length, String(q).length) * u * 0.34 + 4;
  return [
    teks(`${id}p`, x, bulatkan(y - 2), String(p), u, warna, { z: 3, ...o }),
    garis(`${id}g`, bulatkan(x - lebar), y, bulatkan(2 * lebar), 0, warna, 1.5, { z: 3, ...o }),
    teks(`${id}q`, x, bulatkan(y + u * 0.95), String(q), u, warna, { z: 3, ...o }),
  ];
}
export const idPec = (id: string): string[] => [`${id}p`, `${id}g`, `${id}q`];
/** Pecahan campuran: bilangan bulat `${id}b` di kiri, pecahan bertumpuk di kanan. Pusat bulat di (xb, y); pecahan di (xf, y). */
export function campur(id: string, xb: number, xf: number, y: number, b: number, p: number, q: number, u = 12, warna: string = W.biru, o: Opsi = {}): Obj[] {
  return [teks(`${id}b`, xb, bulatkan(y + u * 0.35), String(b), u * 1.5, warna, { z: 3, ...o }), ...pec(id, xf, y, p, q, u, warna, o)];
}
export const idCampur = (id: string): string[] => [`${id}b`, ...idPec(id)];
/** Tanda hitung (minus, sama dengan, tambah) berpusat di (x, y). */
export const tanda = (id: string, x: number, y: number, isi: string, u = 16, warna: string = W.merah, o: Opsi = {}): Obj => teks(id, x, bulatkan(y + u * 0.35), isi, u, warna, { z: 3, ...o });

/* ------------------------------ Bar loyang ------------------------------ */
/**
 * Bar loyang: `q` bagian sama lebar `cw`, bagian pertama di (x, y) setinggi `h`, id `${id}${i}`. Bagian ke-0 sampai `isi - 1` berwarna `warnaIsi`;
 * bagian sesudahnya putih bergaris putus. Digambar SUNGGUH sebanyak q.
 */
export function bar(id: string, x: number, y: number, q: number, cw: number, h = 20, isi = 0, warnaIsi: string = W.isi, garisIsi: string = W.isiGaris): Obj[] {
  return Array.from({ length: q }, (_, i) =>
    kotak(`${id}${i}`, bulatkan(x + i * cw), y, bulatkan(cw - 1.5), h, i < isi ? warnaIsi : W.putih, i < isi ? garisIsi : "#94A3B8", { rx: 2, tebal: 1.2, z: 2, ...(i < isi ? {} : { putus: true }) }),
  );
}
export const idBar = (id: string, q: number): string[] => Array.from({ length: q }, (_, i) => `${id}${i}`);
/** Ubah warna bagian `dari` sampai `sampai` (batas atas tidak termasuk) menjadi berisi. */
export const isikan = (id: string, dari: number, sampai: number, warna: string = W.isi, garisW: string = W.isiGaris): Obj[] =>
  Array.from({ length: Math.max(0, sampai - dari) }, (_, j) => ({ id: `${id}${dari + j}`, t: "kotak" as const, warna, garis: garisW, putus: false }));
/** Silang pada bagian `i` bar `id` (kotak di (x, y) lebar cw, tinggi h): dua garis merah id `${id}x${i}` dan `${id}y${i}`. */
export function silang(id: string, i: number, x: number, y: number, cw: number, h = 20): Obj[] {
  const kiri = bulatkan(x + i * cw + 3);
  const kanan = bulatkan(x + (i + 1) * cw - 4.5);
  return [garis(`${id}x${i}`, kiri, y + 3, kanan - kiri, h - 6, W.merah, 2, { z: 4 }), garis(`${id}y${i}`, kanan, y + 3, kiri - kanan, h - 6, W.merah, 2, { z: 4 })];
}
export const idSilang = (id: string, i: number): string[] => [`${id}x${i}`, `${id}y${i}`];

/** Karung tepung: kotak `${id}-k` bertulis "tepung" `${id}-t`. */
export const karung = (id: string, x: number, y: number, w = 40, h = 34): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, "#FEF3C7", W.coklat, { rx: 6, tebal: 1.8, z: 1 }),
  teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + 3), "tepung", 8.6, W.coklat, { z: 3 }),
];

/** Kartu: kotak `${id}-k` dan teks `${id}-t` di tengahnya. */
export const kartu = (id: string, x: number, y: number, w: number, h: number, warna: string, isi: string, u = 9, warnaTeks: string = W.biru): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.4, z: 1 }),
  teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, warnaTeks, { z: 3 }),
];
export const idKartu = (id: string): string[] => [`${id}-k`, `${id}-t`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Bu Nani" | "Bu Ratna" | "Pak Seno";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`;
 * Citra berkucir dua `${id}-k1`, `${id}-k2`; Fajar bertopi suporter `${id}-tp`; Pak Arif berompi oranye `${id}-bj` dan berpengeras suara `${id}-mg`;
 * Bu Nani berselendang biru `${id}-sl` dan membawa loyang `${id}-lo`; Bu Ratna bercelemek merah muda `${id}-cl`; Pak Seno bertopi koki tinggi `${id}-tk`.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.pinkTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tidak menimpa tepi bawah. */
  const y = y0 === 184 ? 174 : y0;
  const dewasa = nama === "Pak Arif" || nama === "Bu Nani" || nama === "Bu Ratna" || nama === "Pak Seno";
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
  if (nama === "Bu Nani") {
    out.push(kotak(`${id}-sl`, x - 11, bulatkan(y + 2), 22, 6, "#2563EB", "#1E3A8A", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(kotak(`${id}-lo`, x + 12, bulatkan(y + 5), 13, 7, "#F1F5F9", "#475569", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Ratna") out.push(kotak(`${id}-cl`, x - 9, bulatkan(y + 3), 18, 11, "#F9A8D4", "#BE185D", { rx: 3, tebal: 1.1, z: 0 }));
  if (nama === "Pak Seno") out.push(kotak(`${id}-tk`, x - 7, bulatkan(y - u * 0.98), 14, 10, "#FFFFFF", "#94A3B8", { rx: 3, tebal: 1, z: 2 }));
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (dewasa ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-mg`] : []),
  ...(nama === "Bu Nani" ? [`${id}-sl`, `${id}-lo`] : []),
  ...(nama === "Bu Ratna" ? [`${id}-cl`] : []),
  ...(nama === "Pak Seno" ? [`${id}-tk`] : []),
];
