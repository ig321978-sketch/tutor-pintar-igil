import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 6 Sub-Bab A (Berat): timbangan jungkat-jungkit, gantungan baju, dan benda di layar.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari koordinat dan daftar berat, bukan dari kata):
 * - BENDA menyimpan berat dan ukuran tiap benda sebagai angka tersendiri (ukuran tidak menentukan berat).
 * - Timbangan atau gantungan ke-n: papan `tm${n}-bl` (garis dari ujung kiri ke ujung kanan), tali `tm${n}-sL` dan `tm${n}-sR`, piringan `tm${n}-pL` dan `tm${n}-pR`,
 *   titik tumpu `tm${n}-pv`, tiang `tm${n}-tg` dan alas `tm${n}-ds` (timbangan) atau kait `tm${n}-kt` dan `tm${n}-kc` (gantungan).
 *   Benda di piringan: `tm${n}-${L|R}-${nama}-${i}`; tulisan di bawah piringan: `tm${n}-lbL` dan `tm${n}-lbR`; panah turun dan naik: `tm${n}-paL` dan `tm${n}-paR`.
 *   Sisi yang lebih berat turun: kemiringan papan dihitung dari jumlah berat benda di tiap piringan.
 * - Benda berjajar di layar: `bd-${i}-${nama}` (tulisan nama `bd-${i}-lb`). Urutan benda: `ur-${i}-${nama}` (i = 1 paling berat). Tanya jawab: `tanya`, kartu `c1..c3`.
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
export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;
export type Titik = [number, number];

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 2.6, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan jawaban: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Anak (tokoh tetap) ------------------------------ */
export const NAMA_ANAK: Record<string, string> = { malosi: "Malosi", kira: "Kira", upe: "Upe", wei: "Wei", halim: "Halim", igil: "Igil" };
export const WARNA_ANAK: Record<string, string> = { malosi: "#FCA5A5", kira: "#FDE68A", upe: "#BBF7D0", wei: "#BFDBFE", halim: "#DDD6FE", igil: "#FBCFE8" };
/** Anak berupa kepala bulat berpusat di (cx, cy), badan, dan nama. Id `an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`. */
export function anak(slug: string, cx: number, cy: number): Obj[] {
  return [
    bulat(`an-${slug}`, cx, cy, 11, WARNA_ANAK[slug], W.biru, { tebal: 1.8 }),
    kotak(`an-${slug}-bd`, cx - 10, cy + 12, 20, 18, WARNA_ANAK[slug], W.biru, { rx: 6, tebal: 1.6 }),
    teks(`an-${slug}-lb`, cx, cy + 43, NAMA_ANAK[slug], 9, W.biru),
  ];
}

/* ------------------------------ Benda dan beratnya ------------------------------ */

export type Benda = {
  /** Berat relatif (angka tersendiri; tidak ditampilkan). Satuan tidak baku: boneka = empat bola tenis = sepuluh kelereng = lima balok mainan. */
  berat: number;
  /** Ukuran (besar kecilnya) benda, terpisah dari berat: balon besar tetapi ringan, batu kecil tetapi berat. */
  ukuran: number;
  bentuk: "emoji" | "bulat" | "kotak";
  emoji?: string;
  /** Ukuran huruf emoji, jari-jari bulat, atau lebar kotak. */
  s: number;
  /** Lebar di piringan. */
  lebar: number;
  warna?: string;
};

export const BENDA: Record<string, Benda> = {
  semangka: { berat: 30, ukuran: 8, bentuk: "emoji", emoji: "\u{1F349}", s: 24, lebar: 26 },
  boneka: { berat: 20, ukuran: 6, bentuk: "emoji", emoji: "\u{1F9F8}", s: 24, lebar: 26 },
  batu: { berat: 14, ukuran: 2, bentuk: "bulat", s: 8, lebar: 17, warna: "#9CA3AF" },
  kotak: { berat: 12, ukuran: 5, bentuk: "emoji", emoji: "\u{1F4E6}", s: 22, lebar: 24 },
  mangga: { berat: 9, ukuran: 4, bentuk: "emoji", emoji: "\u{1F96D}", s: 19, lebar: 21 },
  apel: { berat: 6, ukuran: 3, bentuk: "emoji", emoji: "\u{1F34E}", s: 18, lebar: 20 },
  jeruk: { berat: 6, ukuran: 3, bentuk: "emoji", emoji: "\u{1F34A}", s: 18, lebar: 20 },
  bola_tenis: { berat: 5, ukuran: 3, bentuk: "emoji", emoji: "\u{1F3BE}", s: 16, lebar: 18 },
  pisang: { berat: 4, ukuran: 3, bentuk: "emoji", emoji: "\u{1F34C}", s: 18, lebar: 20 },
  balok_mainan: { berat: 4, ukuran: 2, bentuk: "kotak", s: 11, lebar: 12, warna: "#F87171" },
  anggur: { berat: 2, ukuran: 2, bentuk: "emoji", emoji: "\u{1F347}", s: 16, lebar: 18 },
  kelereng: { berat: 2, ukuran: 1, bentuk: "bulat", s: 3.5, lebar: 8, warna: "#60A5FA" },
  balon: { berat: 1, ukuran: 9, bentuk: "emoji", emoji: "\u{1F388}", s: 34, lebar: 30 },
};
export const tampilNama = (nama: string): string => nama.replace(/_/g, " ");

const bulatkan = (n: number): number => Math.round(n * 10) / 10;

/** Benda berdiri di atas alas `yAlas`, pusat mendatar di `xc`. `k` memperbesar gambar (untuk benda berjajar di layar). */
export function bentukBenda(id: string, nama: string, xc: number, yAlas: number, k = 1): Obj {
  const b = BENDA[nama];
  if (b.bentuk === "emoji") return teks(id, bulatkan(xc), bulatkan(yAlas - 2), b.emoji ?? "", b.s * k, W.biru, { z: 3 });
  if (b.bentuk === "bulat") {
    const r = b.s * k;
    return bulat(id, bulatkan(xc), bulatkan(yAlas - r - 0.5), r, b.warna ?? W.abu, W.biru, { z: 3, tebal: 1.2 });
  }
  const s = b.s * k;
  return kotak(id, bulatkan(xc - s / 2), bulatkan(yAlas - s - 0.5), s, s, b.warna ?? W.abu, W.biru, { z: 3, rx: 2, tebal: 1.2 });
}

/* ------------------------------ Timbangan jungkat-jungkit dan gantungan baju ------------------------------ */

export type Sisi = { nama: string; jumlah: number }[];
export type Spek = { n: number; jenis: "timbangan" | "gantung"; kiri: Sisi; kanan: Sisi };
type Ubah = Partial<Obj> & { id: string };

export const beratSisi = (s: Sisi): number => s.reduce((t, g) => t + BENDA[g.nama].berat * g.jumlah, 0);
export const D = 14;
export const TALI = 26;
export const PAN_W = 100;
export const PAN_H = 6;
export const BX_KIRI = 54;
export const BX_KANAN = 246;
export const PUSAT_Y = { timbangan: 92, gantung: 66 };

/** Kemiringan papan: positif bila sisi kiri lebih berat (kiri turun), negatif bila kanan lebih berat, nol bila sama berat. */
export const miring = (sp: Spek): number => Math.sign(beratSisi(sp.kiri) - beratSisi(sp.kanan)) * D;
const ujungY = (sp: Spek): { kiri: number; kanan: number } => ({ kiri: PUSAT_Y[sp.jenis] + miring(sp), kanan: PUSAT_Y[sp.jenis] - miring(sp) });

export const idBenda = (n: number, sisi: "L" | "R", nama: string, i: number): string => `tm${n}-${sisi}-${nama}-${i}`;
const sisiDari = (sp: Spek, sisi: "L" | "R"): Sisi => (sisi === "L" ? sp.kiri : sp.kanan);
const daftarBenda = (sp: Spek, sisi: "L" | "R") => sisiDari(sp, sisi).flatMap((g) => Array.from({ length: g.jumlah }, (_, i) => ({ id: idBenda(sp.n, sisi, g.nama, i + 1), nama: g.nama })));

/** Benda-benda di satu piringan, berjajar rata tengah di atas piringan. */
export function isiSisi(sp: Spek, sisi: "L" | "R"): Obj[] {
  const daftar = daftarBenda(sp, sisi);
  const ujung = ujungY(sp)[sisi === "L" ? "kiri" : "kanan"];
  const alas = ujung + TALI;
  const xc = sisi === "L" ? BX_KIRI : BX_KANAN;
  const jarak = 2;
  const total = daftar.reduce((t, d) => t + BENDA[d.nama].lebar, 0) + jarak * Math.max(0, daftar.length - 1);
  let x = xc - total / 2;
  return daftar.map((d) => {
    const l = BENDA[d.nama].lebar;
    const o = bentukBenda(d.id, d.nama, x + l / 2, alas);
    x += l + jarak;
    return o;
  });
}

/** Isi tulisan di bawah piringan: "apel", "4 bola tenis", atau "jeruk dan anggur". */
export const teksSisi = (s: Sisi): string => s.map((g) => `${g.jumlah > 1 ? `${g.jumlah} ` : ""}${tampilNama(g.nama)}`).join(" dan ");

/** Tulisan nama benda di bawah piringan. */
export function labelSisi(sp: Spek, sisi: "L" | "R"): Obj {
  const ujung = ujungY(sp)[sisi === "L" ? "kiri" : "kanan"];
  return teks(`tm${sp.n}-lb${sisi}`, sisi === "L" ? BX_KIRI : BX_KANAN, ujung + TALI + PAN_H + 10, teksSisi(sisiDari(sp, sisi)), 8.6, W.ungu);
}

/** Kerangka: tiang atau kait, titik tumpu, papan, tali, dan dua piringan, sesuai kemiringan `sp`. */
export function kerangka(sp: Spek): Obj[] {
  const n = sp.n;
  const u = ujungY(sp);
  const py = PUSAT_Y[sp.jenis];
  const penopang: Obj[] =
    sp.jenis === "timbangan"
      ? [
          { id: `tm${n}-tg`, t: "jalur", x: 0, y: 0, d: `M150 ${py} L130 150 L170 150 Z`, warna: "#FDE68A", garis: W.biru, tebal: 1.8 },
          kotak(`tm${n}-ds`, 105, 150, 90, 6, W.coklat, W.biru, { rx: 2, tebal: 1.2 }),
        ]
      : [garis(`tm${n}-kt`, 150, 36, 0, py - 36, W.biru, 2), bulat(`tm${n}-kc`, 150, 32, 4, W.emas, W.biru, { tebal: 1.4 })];
  return [
    ...penopang,
    garis(`tm${n}-bl`, BX_KIRI, u.kiri, BX_KANAN - BX_KIRI, u.kanan - u.kiri, W.coklat, 5, { z: 2 }),
    bulat(`tm${n}-pv`, 150, py, 4.5, W.merah, W.biru, { z: 3, tebal: 1.2 }),
    garis(`tm${n}-sL`, BX_KIRI, u.kiri, 0, TALI, W.biru, 1.4),
    garis(`tm${n}-sR`, BX_KANAN, u.kanan, 0, TALI, W.biru, 1.4),
    kotak(`tm${n}-pL`, BX_KIRI - PAN_W / 2, u.kiri + TALI, PAN_W, PAN_H, W.langit, W.biru, { rx: 2, tebal: 1.3 }),
    kotak(`tm${n}-pR`, BX_KANAN - PAN_W / 2, u.kanan + TALI, PAN_W, PAN_H, W.langit, W.biru, { rx: 2, tebal: 1.3 }),
  ];
}

/** Semua perubahan posisi (papan, tali, piringan, benda, dan tulisan bila `label`) untuk keadaan `sp`. Benda yang tidak ada pada `sp` tidak disentuh. */
export function ubahTimbang(sp: Spek, label: { L?: boolean; R?: boolean } = {}): Ubah[] {
  const n = sp.n;
  const u = ujungY(sp);
  const hasil: Ubah[] = [
    { id: `tm${n}-bl`, y: u.kiri, y2: u.kanan - u.kiri },
    { id: `tm${n}-sL`, y: u.kiri },
    { id: `tm${n}-sR`, y: u.kanan },
    { id: `tm${n}-pL`, y: u.kiri + TALI },
    { id: `tm${n}-pR`, y: u.kanan + TALI },
  ];
  for (const sisi of ["L", "R"] as const) for (const o of isiSisi(sp, sisi)) hasil.push({ id: o.id, x: o.x, y: o.y });
  for (const sisi of ["L", "R"] as const) {
    if (!label[sisi]) continue;
    const lb = labelSisi(sp, sisi);
    hasil.push({ id: lb.id, y: lb.y, isi: lb.isi });
  }
  return hasil;
}

/** Panah turun di sisi yang lebih berat dan panah naik di sisi yang lebih ringan. Kosong bila sejajar. */
export function penunjuk(sp: Spek): Obj[] {
  const m = miring(sp);
  if (m === 0) return [];
  const u = ujungY(sp);
  const turun = m > 0 ? "L" : "R";
  const naik = m > 0 ? "R" : "L";
  const yT = turun === "L" ? u.kiri : u.kanan;
  const yN = naik === "L" ? u.kiri : u.kanan;
  return [
    panah(`tm${sp.n}-pa${turun}`, turun === "L" ? 16 : 284, yT - 6, 0, 22, W.merah, 2.6),
    panah(`tm${sp.n}-pa${naik}`, naik === "L" ? 16 : 284, yN + 8, 0, -22, W.hijau, 2.6),
  ];
}
export const idPenunjuk = (sp: Spek): string[] => (miring(sp) === 0 ? [] : [`tm${sp.n}-paL`, `tm${sp.n}-paR`]);

/** Keadaan timbangan dari daftar nama: `s(1, "timbangan", ["apel"], ["anggur"])`; jumlah lebih dari satu ditulis `["bola_tenis", 4]`. */
type Isi = string | [string, number];
const ke = (isi: Isi[]): Sisi => isi.map((i) => (typeof i === "string" ? { nama: i, jumlah: 1 } : { nama: i[0], jumlah: i[1] }));
export const spek = (n: number, jenis: "timbangan" | "gantung", kiri: Isi[], kanan: Isi[]): Spek => ({ n, jenis, kiri: ke(kiri), kanan: ke(kanan) });

/* ------------------------------ Benda berjajar dan urutan ------------------------------ */

const XS: Record<number, number[]> = { 1: [150], 2: [100, 200], 3: [60, 150, 240] };

/** Benda berjajar di layar dengan nama di bawahnya. Id `bd-${i}-${nama}` dan `bd-${i}-lb`. `k` memperbesar gambar. */
export function deret(nama: string[], yAlas: number, k = 1, xs: number[] = XS[nama.length]): Obj[] {
  return nama.flatMap((m, i) => [bentukBenda(`bd-${i + 1}-${m}`, m, xs[i], yAlas, k), teks(`bd-${i + 1}-lb`, xs[i], yAlas + 14, tampilNama(m), 9, W.ungu)]);
}
export const idDeret = (nama: string[]): string[] => nama.flatMap((m, i) => [`bd-${i + 1}-${m}`, `bd-${i + 1}-lb`]);

/** Satu baris urutan: kartu, gambar kecil, dan nama. Baris 1 paling berat. Id `ur-${i}-${nama}` (tulisan), `ur-${i}-${nama}-k` (kartu), `ur-${i}-em`. */
export function barisUrutan(i: number, nama: string, warna: string): Obj[] {
  const y = 34 + (i - 1) * 46;
  const b = BENDA[nama];
  return [
    kotak(`ur-${i}-${nama}-k`, 70, y, 200, 34, warna, W.biru, { rx: 8 }),
    teks(`ur-${i}-${nama}`, 175, y + 22, tampilNama(nama), 13, W.biru),
    ...(b.bentuk === "emoji" ? [emo(`ur-${i}-em`, 94, y + 26, b.emoji ?? "", 20)] : [bulat(`ur-${i}-em`, 94, y + 17, 8, b.warna ?? W.abu, W.biru, { tebal: 1.2 })]),
  ];
}
export const tandaUrutan = (jenis: "berat" | "ringan", baris: number): Obj => teks(jenis === "berat" ? "ur-pb" : "ur-pr", 38, 34 + (baris - 1) * 46 + 22, jenis === "berat" ? "paling berat" : "paling ringan", 8, W.merah);
