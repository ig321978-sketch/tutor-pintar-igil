import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab C "Karung Pak Dodi" (membandingkan dan mengurutkan bilangan sampai seribu).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: halaman depan Toko Pak Joko dengan truk bak terbuka kuning bertumpuk karung beras, papan kapur hijau tua, papan tiga tempat (ratusan, puluhan, satuan),
 * kartu gudang, garis bilangan ratusan, tanda lebih besar berupa mulut, papan urut berslot, kotak kue.
 * Tokoh: Raka (berkaus merah), Salsa (berkepang dua, kertas catatan), Bima (berkaus hijau), Pak Joko (berapron biru, pensil di telinga), Pak Dodi (bertopi kuning),
 * Bu Tuti (berkerudung merah muda, membawa daftar pesanan). Emoji paling tinggi U+1FA95, tanpa ZWJ.
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
  langit: "#E0F2FE",
  aspal: "#CBD5E1",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#F9A8D4",
  lavender: "#EDE9FE",
  kuning: "#FDE68A",
  tinta: "#0F172A",
  papan: "#14532D",
  papanTepi: "#92400E",
  kapur: "#FEF9C3",
  truk: "#FACC15",
  trukTua: "#F59E0B",
  karung: "#FDE9B8",
  oranye: "#FB923C",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pria: "\u{1F468}",
  ibu: "\u{1F469}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  kaget: "\u{1F632}",
  pikir: "\u{1F914}",
  letih: "\u{1F613}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tunjuk: "\u{1F446}",
  kilau: "\u{2728}",
  lampu: "\u{1F4A1}",
  kue: "\u{1F370}",
  piala: "\u{1F3C6}",
  catat: "\u{1F4DD}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
} as const;

type Opsi = Partial<Obj>;
const r1 = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
/** Garis dari (x, y) ke (x + x2, y + y2): ujungnya relatif. */
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu, id = "jud"): Obj => teks(id, 150, 24, isi, 11, warna, { z: 3 });

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, r1(mulai + i * (u + 3)), b, u, W.biru, o))];
}
export const idKartu = (id: string, baris = 1): string[] => [`${id}-k`, ...Array.from({ length: baris }, (_, i) => `${id}-t${i}`)];

/** Poligon tertutup dari titik-titik absolut. */
export const poligon = (id: string, pts: [number, number][], warna: string, garisW: string = W.biru, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: pts[0][0],
  y: pts[0][1],
  d: `M0 0 ${pts.slice(1).map(([a, b]) => `L${r1(a - pts[0][0])} ${r1(b - pts[0][1])}`).join(" ")} Z`,
  warna,
  garis: garisW,
  tebal: 1.6,
  ...o,
});

/* ------------------------------ Latar ------------------------------ */

/** Halaman depan toko `${id}`: langit terang `${id}`, tanah beraspal `${id}-t`, garis putus jalan `${id}-j`. */
export const halaman = (id: string, tanah = 136): Obj[] => [
  kotak(id, 2, 2, 296, tanah - 2, W.langit, "#94A3B8", { rx: 4, tebal: 1.2, z: -4 }),
  kotak(`${id}-t`, 2, tanah, 296, 198 - tanah, W.aspal, "#94A3B8", { rx: 3, tebal: 1.2, z: -4 }),
  garis(`${id}-j`, 12, tanah + 14, 276, 0, W.putih, 2, { putus: true, z: -3 }),
];
export const idHalaman = (id: string): string[] => [id, `${id}-t`, `${id}-j`];

/** Papan kapur hijau tua `${id}` (bingkai cokelat): latar penuh. */
export const papanKapur = (id: string): Obj[] => [
  kotak(id, 2, 2, 296, 196, W.papan, W.papanTepi, { rx: 6, tebal: 5, z: -4 }),
  garis(`${id}-g`, 14, 190, 272, 0, "#166534", 2, { z: -3 }),
];
export const idPapanKapur = (id: string): string[] => [id, `${id}-g`];

/** Toko Pak Joko `${id}`: atap merah dengan papan TOKO PAK JOKO, dinding, etalase, pintu; pojok kiri-atas (x, y). */
export const toko = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y + 14, 86, 50, W.kuning, W.coklat, { rx: 2, tebal: 1.8, z: 0 }),
  kotak(`${id}-a`, x - 4, y, 94, 16, W.merah, "#7F1D1D", { rx: 3, tebal: 1.6, z: 1 }),
  teks(`${id}-p`, x + 43, y + 11, "TOKO PAK JOKO", 6, W.putih, { z: 2 }),
  kotak(`${id}-e`, x + 6, y + 26, 34, 26, "#BAE6FD", W.coklat, { rx: 2, tebal: 1.4, z: 1 }),
  kotak(`${id}-d`, x + 52, y + 26, 22, 38, "#B45309", W.coklat, { rx: 2, tebal: 1.4, z: 1 }),
];
export const idToko = (id: string): string[] => [id, `${id}-a`, `${id}-p`, `${id}-e`, `${id}-d`];

/** Karung beras kecil `${id}` dengan tali `${id}-t`; pojok kiri-atas (x, y). */
export const karung = (id: string, x: number, y: number, w = 16, h = 13): Obj[] => [
  kotak(id, x, y, w, h, W.karung, W.coklat, { rx: 3, tebal: 1.2, z: 2 }),
  garis(`${id}-t`, r1(x + 3), r1(y + 3.5), w - 6, 0, W.coklat, 1, { z: 3 }),
];
export const idKarung = (id: string): string[] => [id, `${id}-t`];
/** Barisan `n` karung `${id}0...` dari kiri x0 pada tinggi y. */
export const barisKarung = (id: string, x0: number, y: number, n: number, jarak = 18): Obj[] => Array.from({ length: n }, (_, i) => karung(`${id}${i}`, r1(x0 + i * jarak), y)).flat();
export const idBarisKarung = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => idKarung(`${id}${i}`)).flat();

/** Truk bak terbuka kuning `${id}`: bak, kabin `${id}-k`, kaca `${id}-c`, dua roda `${id}-r1`, `${id}-r2`; pojok kiri-atas bak (x, y). */
export const truk = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 72, 28, W.truk, W.coklat, { rx: 3, tebal: 2, z: 1 }),
  kotak(`${id}-k`, x + 72, y + 8, 28, 20, W.trukTua, W.coklat, { rx: 3, tebal: 2, z: 1 }),
  kotak(`${id}-c`, x + 78, y + 11, 15, 8, "#BFDBFE", W.coklat, { rx: 1.5, tebal: 1.2, z: 2 }),
  bulat(`${id}-r1`, x + 16, y + 30, 7, "#475569", W.tinta, { tebal: 1.6, z: 2 }),
  bulat(`${id}-r2`, x + 84, y + 30, 7, "#475569", W.tinta, { tebal: 1.6, z: 2 }),
];
export const idTruk = (id: string): string[] => [id, `${id}-k`, `${id}-c`, `${id}-r1`, `${id}-r2`];

/* ------------------------------ Papan tiga tempat ------------------------------ */

/**
 * Papan tiga tempat `${id}`: bingkai `${id}-k`, nama `${id}-n`, judul tempat `${id}-h0..2`, angka `${id}-d0..2`, sekat `${id}-v1`, `${id}-v2`.
 * Pojok kiri-atas (x, y), lebar w, tinggi 62. Angka ratusan, puluhan, satuan diberikan sebagai teks.
 */
export function papanTempat(id: string, x: number, y: number, w: number, nama: string, angka: [string, string, string], warna = W.putih): Obj[] {
  const cw = w / 3;
  const judulTempat = ["ratusan", "puluhan", "satuan"];
  return [
    kotak(`${id}-k`, x, y, w, 62, warna, W.biru, { rx: 5, tebal: 2.4, z: 0 }),
    teks(`${id}-n`, r1(x + w / 2), y + 11, nama, 8.5, W.ungu, { z: 2 }),
    garis(`${id}-v1`, r1(x + cw), y + 16, 0, 44, W.abu, 1.2, { z: 1 }),
    garis(`${id}-v2`, r1(x + 2 * cw), y + 16, 0, 44, W.abu, 1.2, { z: 1 }),
    ...judulTempat.map((j, i) => teks(`${id}-h${i}`, r1(x + cw * (i + 0.5)), y + 24, j, 5.4, W.coklat, { z: 2 })),
    ...angka.map((a, i) => teks(`${id}-d${i}`, r1(x + cw * (i + 0.5)), y + 52, a, 20, W.biru, { z: 2 })),
  ];
}
export const idPapanTempat = (id: string): string[] => [`${id}-k`, `${id}-n`, `${id}-v1`, `${id}-v2`, ...[0, 1, 2].flatMap((i) => [`${id}-h${i}`, `${id}-d${i}`])];
/** Sorotan satu kolom tempat (0 ratusan, 1 puluhan, 2 satuan) pada papan tiga tempat di (x, y) lebar w: `${id}-s${kolom}`. */
export const sorotKolom = (id: string, x: number, y: number, w: number, kolom: number, warna = "#FDE047"): Obj =>
  kotak(`${id}-s${kolom}`, r1(x + (w / 3) * kolom + 1), y + 15, r1(w / 3 - 2), 46, warna, W.merah, { rx: 3, tebal: 1.6, op: 0.75, z: 0 });
/** Centang kecil `${id}` di kolom (tempat) papan di (x, y) lebar w. */
export const centangKolom = (id: string, x: number, y: number, w: number, kolom: number): Obj => emo(id, r1(x + (w / 3) * (kolom + 0.5)), y + 36, E.benar, 12, { z: 3 });

/** Kartu bilangan `${id}` (kotak berisi angka besar), pojok kiri-atas (x, y). Isi `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, w: number, h: number, isi: string, warna: string = W.krem, u = 16): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 2, z: 1 }),
  teks(`${id}-t`, r1(x + w / 2), r1(y + h / 2 + u * 0.35), isi, u, W.biru, { z: 2 }),
];
export const idKartuAngka = (id: string): string[] => [`${id}-k`, `${id}-t`];

/* ------------------------------ Tanda dan garis bilangan ------------------------------ */

/** Tanda perbandingan `${id}` berupa mulut: ">" atau "<" (dua garis tebal, ujung runcing ke satu sisi), atau "=" (dua garis datar). Pusat (x, y). */
export function tanda(id: string, x: number, y: number, jenis: "<" | ">" | "=", warna: string = W.merah, ukuran = 9): Obj[] {
  const s = ukuran;
  if (jenis === "=") return [garis(id, x - s, y - 4, 2 * s, 0, warna, 3.4, { z: 3 }), garis(`${id}-b`, x - s, y + 4, 2 * s, 0, warna, 3.4, { z: 3 })];
  const ujung = jenis === ">" ? s : -s;
  return [garis(id, x - ujung, y - s, 2 * ujung, s, warna, 3.4, { z: 3 }), garis(`${id}-b`, x + ujung, y, -2 * ujung, s, warna, 3.4, { z: 3 })];
}
export const idTanda = (id: string): string[] => [id, `${id}-b`];

/**
 * Garis bilangan ratusan `${id}`: garis `${id}`, kepala panah `${id}-p`, tanda `${id}-t{i}` dan angka `${id}-l{i}` untuk tiap nilai ratusan.
 * Dari x0 sampai x0 + lebar, tinggi y; nilai pertama di x0 dan nilai terakhir di ujung kanan.
 */
export function garisBilangan(id: string, x0: number, y: number, lebar: number, nilai: number[]): Obj[] {
  const n = nilai.length;
  return [
    garis(id, x0 - 8, y, lebar + 16, 0, W.biru, 2.6, { z: 1 }),
    panah(`${id}-p`, x0 + lebar, y, 12, 0, W.biru, 2.6, { z: 1 }),
    ...nilai.flatMap((v, i) => {
      const px = r1(x0 + (lebar * i) / (n - 1));
      return [garis(`${id}-t${i}`, px, y - 6, 0, 12, W.biru, 2.2, { z: 1 }), teks(`${id}-l${i}`, px, y + 20, String(v), 9, W.biru, { z: 2 })];
    }),
  ];
}
export const idGarisBilangan = (id: string, n: number): string[] => [id, `${id}-p`, ...Array.from({ length: n }, (_, i) => [`${id}-t${i}`, `${id}-l${i}`]).flat()];
/** Posisi x suatu bilangan pada garis yang nilai pertamanya `awal` dan nilai terakhirnya `akhir`. */
export const posGaris = (x0: number, lebar: number, awal: number, akhir: number, v: number): number => r1(x0 + (lebar * (v - awal)) / (akhir - awal));
/** Penanda titik `${id}` (bulat) pada garis di (x, y) dengan angka `${id}-n` di atasnya pada tinggi yAngka. */
export const titik = (id: string, x: number, y: number, isi: string, yAngka: number, warna: string = W.merah): Obj[] => [
  bulat(id, x, y, 4.2, warna, W.biru, { tebal: 1.2, z: 3 }),
  garis(`${id}-s`, x, y - 4, 0, r1(yAngka + 3 - y + 4), warna, 1.1, { putus: true, z: 2 }),
  teks(`${id}-n`, x, yAngka, isi, 9, warna, { z: 3 }),
];
export const idTitik = (id: string): string[] => [id, `${id}-s`, `${id}-n`];

/** Slot papan urut `${id}` (kotak putus-putus) dengan nomor di bawahnya `${id}-t`; pojok kiri-atas (x, y). */
export const slot = (id: string, x: number, y: number, w: number, h: number, nomor: string): Obj[] => [
  kotak(id, x, y, w, h, "#F8FAFC", W.abu, { rx: 6, tebal: 1.8, putus: true, z: 0 }),
  teks(`${id}-t`, r1(x + w / 2), r1(y + h + 11), nomor, 8, W.kapur, { z: 2 }),
];
export const idSlot = (id: string): string[] => [id, `${id}-t`];

/** Kotak kue kecil `${id}` (kotak krem berpita merah) dengan emoji kue di atasnya; pojok kiri-atas (x, y). */
export const kotakKue = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 24, 16, "#FCE7F3", W.merah, { rx: 3, tebal: 1.4, z: 1 }),
  garis(`${id}-p`, x + 12, y, 0, 16, W.merah, 1.6, { z: 2 }),
  emo(`${id}-e`, x + 12, y - 1, E.kue, 15, { z: 3 }),
];
export const idKotakKue = (id: string): string[] => [id, `${id}-p`, `${id}-e`];

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Pak Dodi" | "Bu Tuti";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1`, `${id}-k2` dan berkertas catatan `${id}-ct`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berapron biru `${id}-bj` dan berpensil `${id}-pn`; Pak Dodi bertopi kuning `${id}-tp` dan `${id}-tb`;
 * Bu Tuti berkerudung merah muda `${id}-kr` dan membawa daftar pesanan `${id}-ds`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Bu Tuti" ? E.ibu : E.pria;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string) => kotak(`${id}-bj`, x - 11, y + 3, 22, 9, warna, W.biru, { rx: 2, tebal: 1, z: 1 });
  if (nama === "Raka") out.push(baju("#EF4444"));
  if (nama === "Bima") out.push(baju("#22C55E"));
  if (nama === "Pak Joko") {
    out.push(baju("#3B82F6"));
    out.push(garis(`${id}-pn`, x + 12, y - 20, 0, 9, "#F59E0B", 2, { z: 3 }));
  }
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 14, y - 5, 3.4, "#78350F", W.biru, { tebal: 0.8, z: 0 }));
    out.push(bulat(`${id}-k2`, x + 14, y - 5, 3.4, "#78350F", W.biru, { tebal: 0.8, z: 0 }));
    out.push(kotak(`${id}-ct`, x + 13, y + 1, 10, 13, W.krem, W.coklat, { rx: 1.5, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Dodi") {
    out.push(kotak(`${id}-tp`, x - 11, y - 28, 22, 6, W.truk, W.coklat, { rx: 3, tebal: 1.2, z: 2 }));
    out.push(kotak(`${id}-tb`, x - 4, y - 22, 17, 3, W.trukTua, W.coklat, { rx: 1, tebal: 1, z: 2 }));
    out.push(baju("#64748B"));
  }
  if (nama === "Bu Tuti") {
    out.push(bulat(`${id}-kr`, x, y - 12, 14, W.pink, "#BE185D", { tebal: 1.2, z: 0 }));
    out.push(baju("#EC4899"));
    out.push(kotak(`${id}-ds`, x + 13, y + 1, 11, 14, W.krem, W.coklat, { rx: 1.5, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, r1(y + 14), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-pn`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-ct`] : []),
  ...(nama === "Pak Dodi" ? [`${id}-tp`, `${id}-tb`, `${id}-bj`] : []),
  ...(nama === "Bu Tuti" ? [`${id}-kr`, `${id}-bj`, `${id}-ds`] : []),
];
