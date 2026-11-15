import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 7 Sub-Bab B (mengukur panjang dengan satuan tidak baku):
 * benda yang diukur (batang), satuan di layar (klip, stik, kotak, sedotan, jepit), garis awal, dan contoh cara salah.
 * Berkas ini TIDAK dipakai bab lain.
 * Satu pengukuran yang benar: benda `${p}b` (nama `${p}t`), garis awal `${p}g`, satuan `${p}u{i}` berjajar rapat dari garis awal, hasil `${p}h`.
 * Contoh salah: benda `${p}y`, garis awal `${p}gx`, satuan `${p}w{i}`.
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
export const ANAK_EMO = "\u{1F9D2}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/** Tiga kartu pilihan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. Dua kartu bila hanya dua isi. */
export const pilihan = (y: number, isi: string[], u = 18): Obj[] => {
  const dua = isi.length === 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, dua ? [20, 160][i] : [14, 107, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], dua ? 120 : 86, 34, u));
};

/* ------------------------------ Satuan di layar ------------------------------ */

export type Jenis = "klip" | "stik" | "kotak" | "sedotan" | "jepit";
/** Ukuran satuan (lebar x tinggi) dan warnanya; tiap jenis berukuran beda, jadi hasil ukur dengan satuan beda ikut beda. */
export const SATUAN: Record<Jenis, { w: number; h: number; warna: string }> = {
  klip: { w: 24, h: 12, warna: "#93C5FD" },
  stik: { w: 48, h: 10, warna: "#FCD34D" },
  kotak: { w: 20, h: 20, warna: "#FDBA74" },
  sedotan: { w: 40, h: 8, warna: "#86EFAC" },
  jepit: { w: 16, h: 14, warna: "#F9A8D4" },
};

/** Garis awal pengukuran (x), tinggi benda, dan jarak dari atas benda ke atas satuan. */
export const GX = 30;
export const TB = 14;
export const OFF = 28;

export type Ukur = {
  p: string;
  jenis: Jenis;
  n: number;
  x0: number;
  y: number;
  lebar: number;
  /** Benda dan namanya. */
  bar: Obj[];
  garisAwal: Obj;
  unit: (i: number) => Obj;
  units: Obj[];
  pusat: Titik[];
};

/** Pengukuran yang benar: `n` satuan sejenis, berjajar rapat dari garis awal x0; ujung benda sejajar ujung satuan terakhir. */
export function ukur(p: string, jenis: Jenis, n: number, x0: number, y: number, nama: string, warnaBenda: string = W.merahMuda): Ukur {
  const s = SATUAN[jenis];
  const lebar = n * s.w;
  const yU = y + OFF;
  const unit = (i: number): Obj => kotak(`${p}u${i}`, x0 + i * s.w, yU, s.w, s.h, s.warna, W.biru, { rx: 2, tebal: 1.2 });
  return {
    p,
    jenis,
    n,
    x0,
    y,
    lebar,
    bar: [kotak(`${p}b`, x0, y, lebar, TB, warnaBenda, W.biru, { rx: 3, tebal: 1.5 }), teks(`${p}t`, x0 + lebar / 2, y + 10, nama, 8.4, W.biru)],
    garisAwal: garis(`${p}g`, x0, y - 6, 0, OFF + s.h + 12, W.merah, 1.8),
    unit,
    units: Array.from({ length: n }, (_, i) => unit(i)),
    pusat: Array.from({ length: n }, (_, i) => ({ x: x0 + i * s.w + s.w / 2, y: yU + s.h / 2 })),
  };
}

/** Tulisan hasil ukur: angka dan nama satuan, id `${p}h`. */
export const hasil = (p: string, jenis: Jenis, n: number, x: number, y: number, u = 10.6): Obj => teks(`${p}h`, x, y, `${n} ${jenis}`, u, W.merah);

export type Cacat = "celah" | "tumpuk" | "miring" | "ujung" | "campur";
export type UkurSalah = { p: string; cacat: Cacat; bar: Obj[]; garisAwal: Obj; units: Obj[] };

/** Contoh cara mengukur yang salah (celah, bertumpuk, miring, bukan dari ujung, atau satuan campur). Benda lebarnya `lebar`. */
export function ukurSalah(p: string, cacat: Cacat, jenis: Jenis, n: number, lebar: number, x0: number, y: number, nama: string, warnaBenda: string = W.merahMuda): UkurSalah {
  const s = SATUAN[jenis];
  const yU = y + OFF;
  const campur: Jenis[] = ["klip", "stik", "klip", "stik", "klip"];
  let kursor = x0;
  const units = Array.from({ length: n }, (_, i) => {
    const j = cacat === "campur" ? campur[i % campur.length] : jenis;
    const t = SATUAN[j];
    let x = x0 + i * t.w;
    if (cacat === "celah") x = x0 + i * (s.w + 8);
    if (cacat === "tumpuk") x = x0 + i * (s.w - 10);
    if (cacat === "ujung") x = x0 + 12 + i * s.w;
    if (cacat === "campur") {
      x = kursor;
      kursor += t.w;
    }
    return kotak(`${p}w${i}`, x, yU, t.w, t.h, t.warna, W.biru, { rx: 2, tebal: 1.2, ...(cacat === "miring" ? { rot: 18 } : {}), ...(cacat === "tumpuk" ? { z: i } : {}) });
  });
  return {
    p,
    cacat,
    bar: [kotak(`${p}y`, x0, y, lebar, TB, warnaBenda, W.biru, { rx: 3, tebal: 1.5 }), teks(`${p}yt`, x0 + lebar / 2, y + 10, nama, 8.4, W.biru)],
    garisAwal: garis(`${p}gx`, x0, y - 6, 0, OFF + s.h + 12, W.merah, 1.8),
    units,
  };
}

/** Kertas petak di layar: garis tipis `kol` kolom dan `bar` baris berukuran 20, pojok kiri-atas (x, y); id `gr-v{j}` dan `gr-h{j}`. */
export const petak = (x: number, y: number, kol: number, bar: number): Obj[] => [
  ...Array.from({ length: kol + 1 }, (_, j) => garis(`gr-v${j}`, x + j * 20, y, 0, bar * 20, W.abu, 0.9, { z: -1 })),
  ...Array.from({ length: bar + 1 }, (_, j) => garis(`gr-h${j}`, x, y + j * 20, kol * 20, 0, W.abu, 0.9, { z: -1 })),
];
