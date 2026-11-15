import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab A (Bilangan dan Lambang Bilangan).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - BALOK `bk-s-${i}` (kotak kecil, satu satuan), `bk-p-${i}` (batang, satu puluhan), `bk-r-${i}` (lempeng, satu ratusan); i dari 1.
 *   Banyak balok jenis itu boleh ditulis di `bk-n-s`, `bk-n-p`, `bk-n-r` (harus sama dengan banyak balok).
 * - PAPAN TIGA TEMPAT: judul tempat `pv-h0..2` (ratusan, puluhan, satuan) dan kotaknya `pv-hk0..2`, badan `pv-c0..2`,
 *   kotak angka `pv-dk0..2`, angka `pv-d0..2` (satu angka, 0 sampai 9), nilai tempat `pv-w0..2` (angka x 100, 10, 1),
 *   bilangan utuh `pv-n`, kata bilangan `pv-k` (kartu; teks di `pv-k-t0`), penjumlahan nilai tempat `pv-u` (kartu; teks di `pv-u-t0`).
 * - BARIS KATA `kr-l${i}` (label "N ratusan" atau "N puluhan", boleh kosong), `kr-a${i}` (bilangan), `kr-w${i}` (kata bilangan).
 * - Kartu pilihan `c1..c3` (`c${i}-k`, `c${i}-t`), pertanyaan `tanya`, kata soal `kt` (kartu; teks di `kt-t0`), bilangan besar `bn`.
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
  nila: "#2563EB",
};
export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
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
export const idAnak = (slug: string): string[] => [`an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`];

/* ------------------------------ Balok ------------------------------ */
export type JenisBlok = "s" | "p" | "r";
export const NILAI_BLOK: Record<JenisBlok, number> = { s: 1, p: 10, r: 100 };
export const WARNA_BLOK: Record<JenisBlok, string> = { s: "#DC2626", p: "#2563EB", r: "#16A34A" };
export const NAMA_BLOK: Record<JenisBlok, string> = { s: "satuan", p: "puluhan", r: "ratusan" };

/** Satu balok bebas: ukuran dan posisi bebas (pojok kiri-atas). */
export const blok = (jenis: JenisBlok, i: number, x: number, y: number, w: number, h: number): Obj => kotak(`bk-${jenis}-${i}`, x, y, w, h, WARNA_BLOK[jenis], W.biru, { rx: 1.5, tebal: 1 });
export const idBlok = (jenis: JenisBlok, dari: number, sampai: number): string[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, q) => `bk-${jenis}-${dari + q}`);
export const banyakBlok = (jenis: JenisBlok, n: number, x: number, y: number): Obj => teks(`bk-n-${jenis}`, x, y, String(n), 12, W.merah);

/* ------------------------------ Papan tiga tempat ------------------------------ */
export const KOLOM_X = [10, 106, 202];
export const KOLOM_W = 88;
const WARNA_TEMPAT = [W.hijauMuda, W.langit, W.merahMuda];
const NAMA_TEMPAT = ["ratusan", "puluhan", "satuan"];
const JENIS_TEMPAT: JenisBlok[] = ["r", "p", "s"];
const Y_BADAN = 42;
const H_BADAN = 90;
const Y_ANGKA = 136;
const H_ANGKA = 30;

export const kotakAngkaPv = (): Obj[] => [0, 1, 2].map((c) => kotak(`pv-dk${c}`, KOLOM_X[c] + 24, Y_ANGKA, 40, H_ANGKA, W.krem, W.biru, { rx: 6, tebal: 1.5 }));
/** Judul tempat dan badan papan tiga tempat; `denganAngka` menambah kotak angka kosong di bawahnya. */
export function kerangkaPv(denganAngka = true): Obj[] {
  const out: Obj[] = [];
  for (let c = 0; c < 3; c += 1) {
    out.push(kotak(`pv-hk${c}`, KOLOM_X[c], 24, KOLOM_W, 16, WARNA_TEMPAT[c], W.biru, { rx: 4, tebal: 1.3 }));
    out.push(teks(`pv-h${c}`, KOLOM_X[c] + KOLOM_W / 2, 36, NAMA_TEMPAT[c], 9.4, W.biru));
    out.push(kotak(`pv-c${c}`, KOLOM_X[c], Y_BADAN, KOLOM_W, H_BADAN, W.putih, W.abu, { rx: 4, tebal: 1.2 }));
  }
  return denganAngka ? [...out, ...kotakAngkaPv()] : out;
}
export const idKerangkaPv = (denganAngka = true): string[] => [0, 1, 2].flatMap((c) => [`pv-hk${c}`, `pv-h${c}`, `pv-c${c}`, ...(denganAngka ? [`pv-dk${c}`] : [])]);
/** Angka (satu digit) pada tempat c (0 ratusan, 1 puluhan, 2 satuan). */
export const angkaPv = (c: number, d: number): Obj => teks(`pv-d${c}`, KOLOM_X[c] + 44, Y_ANGKA + 22, String(d), 20, W.merah);
/** Nilai tempat (angka dikali nilai tempatnya) di dasar badan papan. */
export const nilaiPv = (c: number, isi: number): Obj => teks(`pv-w${c}`, KOLOM_X[c] + 44, Y_BADAN + H_BADAN - 5, String(isi), 10, W.ungu);
/** Bilangan utuh di tengah atas. */
export const bilPv = (n: number): Obj => teks("pv-n", 150, 17, String(n), 14, W.merah);
/** Kata bilangan di dasar papan. */
export const kataPv = (isi: string, warna: string = W.emas): Obj[] => kartu("pv-k", 20, 172, 260, 24, warna, [isi], 10);
export const idKataPv = ["pv-k-k", "pv-k-t0"];
/** Penjumlahan nilai tempat di dasar papan. */
export const jumlahPv = (isi: string): Obj[] => kartu("pv-u", 20, 172, 260, 24, W.emas, [isi], 10);
export const idJumlahPv = ["pv-u-k", "pv-u-t0"];

/** Balok pada tempat c dengan n balok (ratusan: lempeng 3 x 3, puluhan: batang berjajar, satuan: kotak 3 x 3). */
export function blokPv(c: number, n: number): Obj[] {
  const x0 = KOLOM_X[c];
  const jenis = JENIS_TEMPAT[c];
  return Array.from({ length: n }, (_, q) => {
    const i = q + 1;
    if (jenis === "r") return blok("r", i, x0 + 8 + (q % 3) * 27, Y_BADAN + 4 + Math.floor(q / 3) * 26, 24, 22);
    if (jenis === "p") return blok("p", i, x0 + 4 + q * 9, Y_BADAN + 6, 6, 56);
    return blok("s", i, x0 + 12 + (q % 3) * 24, Y_BADAN + 8 + Math.floor(q / 3) * 16, 9, 9);
  });
}
export const idBlokPv = (c: number, n: number): string[] => idBlok(JENIS_TEMPAT[c], 1, n);

/* ------------------------------ Baris kata bilangan ------------------------------ */
/** Satu baris: label ("2 puluhan", boleh kosong), bilangan, dan kata bilangannya; baris ke-`r` dari 0. */
export function barisKata(r: number, label: string, angka: number, kata: string, y0 = 36, rh = 28): Obj[] {
  const y = y0 + r * rh;
  return [
    kotak(`kr-b${r}`, 12, y - 2, 276, rh - 6, r % 2 ? W.krem : W.langit, W.abu, { rx: 5, tebal: 1 }),
    ...(label ? [teks(`kr-l${r}`, 22, y + 14, label, 9.6, W.biru, { anchor: "start" as const })] : []),
    teks(`kr-a${r}`, label ? 128 : 60, y + 15, String(angka), 13, W.merah),
    teks(`kr-w${r}`, label ? 214 : 190, y + 14, kata, 10.4, W.biru),
  ];
}
export const idBarisKata = (r: number, label = true): string[] => [`kr-b${r}`, ...(label ? [`kr-l${r}`] : []), `kr-a${r}`, `kr-w${r}`];

/* ------------------------------ Tabel tempat (metode luar) ------------------------------ */
/** Tabel tiga tempat tanpa balok. Id: `tb-hk${c}`, `tb-h${c}`, `tb-dk${c}`, `tb-d${c}`, `tb-w${c}`, `tb-n`, kartu kata `tb-k`. */
export function buatTb(y0 = 56, hh = 16, hb = 32, u = 20) {
  const yBox = y0 + hh + 2;
  const kerangka = (): Obj[] =>
    [0, 1, 2].flatMap((c) => [
      kotak(`tb-hk${c}`, KOLOM_X[c], y0, KOLOM_W, hh, WARNA_TEMPAT[c], W.biru, { rx: 4, tebal: 1.3 }),
      teks(`tb-h${c}`, KOLOM_X[c] + KOLOM_W / 2, y0 + hh - 4, NAMA_TEMPAT[c], 9, W.biru),
      kotak(`tb-dk${c}`, KOLOM_X[c], yBox, KOLOM_W, hb, W.krem, W.biru, { rx: 6, tebal: 1.5 }),
    ]);
  const angka = (c: number, d: number): Obj => teks(`tb-d${c}`, KOLOM_X[c] + KOLOM_W / 2, yBox + hb / 2 + u * 0.35, String(d), u, W.merah);
  const nilai = (c: number, isi: number): Obj => teks(`tb-w${c}`, KOLOM_X[c] + KOLOM_W / 2, yBox + hb + 14, String(isi), 10, W.ungu);
  const bil = (n: number, y = 172): Obj => teks("tb-n", 150, y, String(n), 16, W.merah);
  const kata = (isi: string, y = yBox + hb + 22): Obj[] => kartu("tb-k", 20, y, 260, 24, W.emas, [isi], 10);
  const idKerangka = [0, 1, 2].flatMap((c) => [`tb-hk${c}`, `tb-h${c}`, `tb-dk${c}`]);
  return { kerangka, angka, nilai, bil, kata, idKerangka };
}
export const idKataTb = ["tb-k-k", "tb-k-t0"];
