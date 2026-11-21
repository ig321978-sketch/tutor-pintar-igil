import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis" (menyusun dan menguraikan bilangan), Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa kios: pasir pantai, kios beratap rumbia dengan papan nama KIOS KELAPA, tumpukan kelapa, pohon kelapa, keranjang bergradasi, papan empat kotak tempat angka, bagan bagian utuh.
 * Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku), Genta (berpeci), Pak Hendro (topi pantai, peluit, tas kain),
 * Pak Darwis (kaus oranye), Bu Rina (seragam hijau, papan daftar). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  jari: "\u{261D}",
  terima: "\u{1F64F}",
  kelapa: "\u{1F965}",
  pohon: "\u{1F334}",
  keranjang: "\u{1F9FA}",
  mata: "\u{1F440}",
  ulang: "\u{1F501}",
  catat: "\u{1F4DD}",
  pecah: "\u{1F528}",
  susun: "\u{1F9F1}",
  bagan: "\u{1F4CA}",
  tambah: "\u{2795}",
  kurang: "\u{2796}",
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

/* ------------------------------ Pantai dan kios ------------------------------ */
export const WK = {
  pasir: "#FDE68A",
  pasirGaris: "#E7C48F",
  dinding: "#D6A25A",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  rumbia: "#C99A3A",
  rumbiaTua: "#92400E",
  keranjang: "#E7C48F",
} as const;

/** Pasir pantai `${id}` dari tinggi y sampai bawah kanvas, dengan dua garis putus `${id}-g1`, `${id}-g2`. */
export function pasir(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WK.pasir, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 8, y + 12, 284, 0, WK.pasirGaris, 1.4, { z: -2, putus: true }), garis(`${id}-g2`, 8, y + 34, 284, 0, WK.pasirGaris, 1.4, { z: -2, putus: true })];
}
export const idPasir = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Kios kelapa: dinding `${id}`, atap rumbia `${id}-a`, papan nama `${id}-sn` bertulisan `${id}-st`, meja `${id}-m`. Pojok kiri-atas dinding (x, y), lebar w, tinggi h. */
export function kios(id: string, x: number, y: number, w = 150, h = 70): Obj[] {
  return [
    kotak(id, x, y, w, h, WK.dinding, WK.kayuTua, { rx: 2, z: 0 }),
    poligon(`${id}-a`, [[x - 6, y], [bulatkan(x + w / 2), y - 26], [x + w + 6, y]], WK.rumbia, WK.rumbiaTua, { z: 1 }),
    kotak(`${id}-sn`, bulatkan(x + 14), y + 4, bulatkan(w - 28), 14, W.putih, W.biru, { rx: 2, tebal: 1.2, z: 2 }),
    teks(`${id}-st`, bulatkan(x + w / 2), y + 14.5, "KIOS KELAPA", 8, W.biru, { z: 3 }),
    kotak(`${id}-m`, bulatkan(x + 4), y + h - 18, bulatkan(w - 8), 10, WK.kayu, WK.kayuTua, { rx: 1, tebal: 1.2, z: 2 }),
  ];
}
export const idKios = (id: string): string[] => [id, `${id}-a`, `${id}-sn`, `${id}-st`, `${id}-m`];

/** Satu kelapa kecil `${id}` (emoji) di (x, y). */
export const kelapa = (id: string, x: number, y: number, u = 14, o: Opsi = {}): Obj => emo(id, x, y, E.kelapa, u, { z: 4, ...o });
/** Tumpukan kelapa dalam `baris` baris menyempit ke atas, mulai dari tengah x dan dasar y: `${id}0`, `${id}1`, ... Jumlah dasar `dasar`. */
export function tumpuk(id: string, cx: number, y: number, dasar: number, baris: number, u = 13): Obj[] {
  const out: Obj[] = [];
  let ke = 0;
  for (let b = 0; b < baris; b += 1) {
    const n = dasar - b;
    const lebar = n * (u * 1.05);
    for (let i = 0; i < n; i += 1) {
      out.push(kelapa(`${id}${ke}`, bulatkan(cx - lebar / 2 + i * u * 1.05 + (u * 1.05) / 2 - u * 0.5), bulatkan(y - b * (u * 0.85)), u));
      ke += 1;
    }
  }
  return out;
}
/** Id tumpukan kelapa `id` dengan `dasar` dasar dan `baris` baris. */
export const idTumpuk = (id: string, dasar: number, baris: number): string[] => {
  let n = 0;
  for (let b = 0; b < baris; b += 1) n += dasar - b;
  return Array.from({ length: n }, (_, i) => `${id}${i}`);
};

/** Pohon kelapa `${id}` (emoji). */
export const pohon = (id: string, x: number, y: number, u = 40, o: Opsi = {}): Obj => emo(id, x, y, E.pohon, u, { z: 1, ...o });

/** Keranjang `${id}-k` dengan pegangan `${id}-h` dan label di dalamnya `${id}-t0`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function keranjang(id: string, x: number, y: number, w: number, h: number, label: string, u = 12, warna: string = WK.keranjang): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, h, warna, WK.kayuTua, { rx: 7, tebal: 1.6, z: 2 }),
    garis(`${id}-h`, bulatkan(x + w * 0.2), y, bulatkan(w * 0.6), 0, WK.kayuTua, 2.4, { z: 3 }),
    teks(`${id}-t0`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), label, u, W.biru, { z: 3 }),
  ];
}
export const idKeranjang = (id: string): string[] => [`${id}-k`, `${id}-h`, `${id}-t0`];

/** Wadah keranjang kosong: badan `${id}-k` dan pegangan `${id}-h`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function wadah(id: string, x: number, y: number, w: number, h: number, warna: string = WK.keranjang): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, WK.kayuTua, { rx: 4, tebal: 1.4, z: 2 }), garis(`${id}-h`, bulatkan(x + w * 0.2), y, bulatkan(w * 0.6), 0, WK.kayuTua, 2, { z: 3 })];
}
export const idWadah = (id: string): string[] => [`${id}-k`, `${id}-h`];

/** Papan kecil putih berbingkai cokelat `${id}-k`; teks di dalamnya ditambahkan terpisah. Pojok kiri-atas (x, y). */
export const papanKecil = (id: string, x: number, y: number, w: number, h: number, warna: string = W.putih): Obj => kotak(`${id}-k`, x, y, w, h, warna, WK.kayuTua, { rx: 5, tebal: 2, z: 1 });

/** Papan besar krem untuk adegan metode global: bingkai `${id}-k`. */
export const papanBesar = (id = "pt"): Obj => papanKecil(id, 8, 28, 284, 124, "#FFFBEB");

/** Kotak tempat angka `${id}-k` dan nama tempat `${id}-n` di atasnya (nama kecil). Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function kotakTempat(id: string, x: number, y: number, w: number, h: number, nama: string, warna: string = W.putih): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 5, tebal: 1.8, z: 1 }), teks(`${id}-n`, bulatkan(x + w / 2), y - 5, nama, 8.4, W.ungu, { z: 2 })];
}

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Pak Darwis" | "Bu Rina";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka` `${id}-kb`, berkepang satu `${id}-kp`, memegang kertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, membawa tas kain `${id}-ts`; Pak Darwis berkaus oranye `${id}-bj`;
 * Bu Rina berseragam hijau `${id}-bj` dan membawa papan daftar `${id}-pd`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Bu Rina" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Pak Darwis") out.push(baju("#F97316", "#9A3412", 12));
  if (nama === "Bu Rina") {
    out.push(baju("#16A34A", "#14532D", 12));
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
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Hendro" || nama === "Pak Darwis" || nama === "Bu Rina" ? 15 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" || nama === "Pak Darwis" ? [`${id}-bj`] : []),
  ...(nama === "Bu Rina" ? [`${id}-bj`, `${id}-pd`] : []),
  ...(nama === "Laras" ? [`${id}-ka`, `${id}-kb`, `${id}-kp`, `${id}-kc`] : []),
  ...(nama === "Genta" ? [`${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
];

/* ------------------------------ Uang (adegan uang pembayaran) ------------------------------ */
/** Warna uang: lembar Rp 2.000 abu-abu biru, keping Rp 1.000 emas, Rp 500 perak, Rp 100 perunggu. Satu bentuk untuk satu lembar atau keping. */
const WARNA_UANG = {
  lembar: ["#93A8C4", "#334155"],
  seribu: ["#FACC15", "#A16207"],
  limaratus: ["#E5E7EB", "#6B7280"],
  seratus: ["#D97706", "#78350F"],
} as const;
export type JenisKeping = "seribu" | "limaratus" | "seratus";
/** Selembar uang Rp 2.000 (persegi panjang 30 x 15), pojok kiri-atas (x, y). */
export const lembarUang = (id: string, x: number, y: number): Obj => kotak(id, x, y, 30, 15, WARNA_UANG.lembar[0], WARNA_UANG.lembar[1], { rx: 2, tebal: 1.4, z: 3 });
/** Sekeping uang (lingkaran), pusat (x, y). */
export const kepingUang = (id: string, x: number, y: number, jenis: JenisKeping, r = 9): Obj => bulat(id, x, y, r, WARNA_UANG[jenis][0], WARNA_UANG[jenis][1], { tebal: 1.4, z: 3 });
