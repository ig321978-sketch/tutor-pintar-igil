import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 8 Sub-Bab B (diagram gambar): diagram tegak dan mendatar (satu gambar = satu data),
 * tabel menurun dan mendatar, turus (satu goresan = satu data; setiap lima goresan dicoret miring), dan benda yang tersebar di layar.
 * Berkas ini TIDAK dipakai bab lain.
 *
 * Awalan `p` huruf kecil. Id yang dikenali uji (dihitung ulang dari gambar):
 *  diagram: gambar `${p}g{c}_{i}` (kategori c, gambar ke-i), nama `${p}l{c}`, angka banyak `${p}h{c}`, sumbu angka `${p}y{i}`, judul `${p}jd`, keterangan `${p}k`;
 *  turus: goresan `${p}s{c}_{i}`, nama `${p}l{c}`, angka banyak `${p}h{c}`, judul `${p}jd`;
 *  tabel: nama `${p}r{i}`, banyak `${p}c{i}`, jumlah `${p}tot`, sel `${p}x{r}_{c}`, judul `${p}jd`.
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

/* ------------------------------ Data ------------------------------ */

export type Kat = { nama: string; n: number; emo: string };

/** Jumlah semua data. */
export const jumlah = (data: Kat[]): number => data.reduce((t, d) => t + d.n, 0);

export const SAYUR: Kat[] = [
  { nama: "jagung", n: 3, emo: "\u{1F33D}" },
  { nama: "wortel", n: 4, emo: "\u{1F955}" },
  { nama: "brokoli", n: 3, emo: "\u{1F966}" },
  { nama: "kol", n: 2, emo: "\u{1F96C}" },
];
export const MAINAN: Kat[] = [
  { nama: "bola", n: 6, emo: "\u{1F3C0}" },
  { nama: "mobil", n: 4, emo: "\u{1F697}" },
  { nama: "boneka", n: 3, emo: "\u{1F9F8}" },
];
export const BUAH: Kat[] = [
  { nama: "apel", n: 4, emo: "\u{1F34E}" },
  { nama: "jeruk", n: 4, emo: "\u{1F34A}" },
  { nama: "pisang", n: 2, emo: "\u{1F34C}" },
];
export const HEWAN: Kat[] = [
  { nama: "kucing", n: 3, emo: "\u{1F431}" },
  { nama: "kelinci", n: 2, emo: "\u{1F430}" },
  { nama: "ikan", n: 1, emo: "\u{1F41F}" },
];

/* ------------------------------ Diagram gambar ------------------------------ */

export const UG = 15;
export const ST = 17;
export type Arah = "tegak" | "datar";

export type Diagram = {
  p: string;
  arah: Arah;
  data: Kat[];
  /** Judul, sumbu angka, dan keterangan (tanpa nama kategori dan gambar). */
  dasar: Obj[];
  /** Judul diagram, id `${p}jd`. */
  jd: Obj;
  label: (c: number) => Obj;
  gambar: (c: number) => Obj[];
  /** Satu gambar. */
  satu: (c: number, i: number) => Obj;
  /** Angka banyak gambar pada kategori c, id `${p}h{c}`. */
  angka: (c: number) => Obj;
  /** Semua: dasar, nama, dan gambar. */
  semua: Obj[];
  /** Id semua gambar kategori c. */
  idGambar: (c: number) => string[];
  idSumbu: string[];
};

export type OpsiDiagram = { yb?: number; ketY?: number; y0?: number; rowH?: number; ket?: boolean };

/**
 * Diagram gambar. Tegak: kolom bersusun ke atas dari garis dasar `yb`. Mendatar: baris berjajar ke samping.
 * Setiap kategori `n` gambar (n <= 8), satu gambar mewakili satu data.
 */
export function diagram(p: string, arah: Arah, data: Kat[], isiJudul: string, satuan: string, o: OpsiDiagram = {}): Diagram {
  const m = data.length;
  const M = Math.max(...data.map((d) => d.n));
  const jd = teks(`${p}jd`, 150, 22, isiJudul, 11, W.ungu);
  const tegak = arah === "tegak";
  const yb = o.yb ?? 148;
  const y0 = o.y0 ?? 50;
  const rowH = o.rowH ?? 27;
  const XS = 86;
  const lebarKol = 232 / m;
  const cx = (c: number): number => 58 + lebarKol * (c + 0.5);
  const barisY = (c: number): number => y0 + c * rowH;
  const pusatI = (i: number): number => yb - 9 - i * ST;
  const yAxis = barisY(m - 1) + rowH * 0.8;
  const ketY = o.ketY ?? (tegak ? 184 : 188);
  const ket = teks(`${p}k`, 150, ketY, `1 gambar = 1 ${satuan}`, 9, W.coklat);

  const label = (c: number): Obj => (tegak ? teks(`${p}l${c}`, cx(c), yb + 13, data[c].nama, 8.6) : teks(`${p}l${c}`, 6, barisY(c) + 4, data[c].nama, 8.6, W.biru, { anchor: "start" }));
  const satu = (c: number, i: number): Obj => (tegak ? teks(`${p}g${c}_${i}`, cx(c), pusatI(i) + 5, data[c].emo, UG) : teks(`${p}g${c}_${i}`, XS + i * ST, barisY(c) + 5, data[c].emo, UG));
  const gambar = (c: number): Obj[] => Array.from({ length: data[c].n }, (_, i) => satu(c, i));
  const angka = (c: number): Obj => (tegak ? teks(`${p}h${c}`, cx(c), yb - data[c].n * ST - 5, String(data[c].n), 9.6, W.merah) : teks(`${p}h${c}`, XS + data[c].n * ST + 4, barisY(c) + 4, String(data[c].n), 9.6, W.merah));
  const sumbu: Obj[] = tegak
    ? [garis(`${p}sb`, 50, yb, 244, 0, W.biru, 1.4), garis(`${p}ss`, 50, yb - M * ST, 0, M * ST, W.biru, 1.4), ...Array.from({ length: M }, (_, i) => teks(`${p}y${i}`, 40, pusatI(i) + 3, String(i + 1), 8.2, W.coklat))]
    : [garis(`${p}sb`, XS - 8, yAxis - 12, M * ST + 10, 0, W.biru, 1.4), garis(`${p}ss`, XS - 8, y0 - 14, 0, yAxis - 12 - (y0 - 14), W.biru, 1.4), ...Array.from({ length: M }, (_, i) => teks(`${p}y${i}`, XS + i * ST, yAxis, String(i + 1), 8.2, W.coklat))];
  const dasar = [jd, ...sumbu, ...(o.ket === false ? [] : [ket])];
  return {
    p,
    arah,
    data,
    dasar,
    jd,
    label,
    gambar,
    satu,
    angka,
    semua: [...dasar, ...data.flatMap((_, c) => [label(c), ...gambar(c)])],
    idGambar: (c) => Array.from({ length: data[c].n }, (_, i) => `${p}g${c}_${i}`),
    idSumbu: Array.from({ length: M }, (_, i) => `${p}y${i}`),
  };
}

/* ------------------------------ Turus ------------------------------ */

export type Turus = {
  p: string;
  data: Kat[];
  jd: Obj;
  label: (c: number) => Obj;
  goresan: (c: number) => Obj[];
  angka: (c: number) => Obj;
  semua: Obj[];
};

/** Goresan ke-i pada baris c: empat tegak, goresan kelima miring (dicoret) menutup empat goresan tadi. */
export function goresanTurus(p: string, c: number, i: number, rowY: number): Obj {
  const g = Math.floor(i / 5);
  const j = i % 5;
  const xg = 86 + g * 32;
  if (j === 4) return garis(`${p}s${c}_${i}`, xg - 3, rowY + 7, 27, -14, W.merah, 2);
  return garis(`${p}s${c}_${i}`, xg + j * 6, rowY - 9, 0, 18, W.biru, 2);
}

export function turus(p: string, data: Kat[], isiJudul: string, o: { y0?: number; gap?: number } = {}): Turus {
  const y0 = o.y0 ?? 52;
  const gap = o.gap ?? 34;
  const rowY = (c: number): number => y0 + c * gap;
  const jd = teks(`${p}jd`, 150, 22, isiJudul, 11, W.ungu);
  const label = (c: number): Obj => teks(`${p}l${c}`, 6, rowY(c) + 4, data[c].nama, 9, W.biru, { anchor: "start" });
  const goresan = (c: number): Obj[] => Array.from({ length: data[c].n }, (_, i) => goresanTurus(p, c, i, rowY(c)));
  const angka = (c: number): Obj => teks(`${p}h${c}`, 86 + Math.ceil(data[c].n / 5) * 32 + 8, rowY(c) + 4, String(data[c].n), 10, W.merah);
  return { p, data, jd, label, goresan, angka, semua: [jd, ...data.flatMap((_, c) => [label(c), ...goresan(c), angka(c)])] };
}

/* ------------------------------ Tabel ------------------------------ */

export type Tabel = {
  p: string;
  arah: "menurun" | "mendatar";
  data: Kat[];
  /** Judul dan baris atau kolom judul tabel (tanpa isi data). */
  kepala: Obj[];
  /** Kotak dan isi satu kategori (nama dan banyak). */
  isi: (c: number) => Obj[];
  /** Kotak dan angka jumlah semua. */
  total: Obj[];
  semua: Obj[];
  /** Id kotak sel pada baris r (mulai 0 = baris judul) atau kolom c. */
  selBaris: (r: number) => string[];
  selKolom: (c: number) => string[];
};

/**
 * Tabel data. Menurun: kategori turun ke bawah (baris judul "nama" dan "banyak"). Mendatar: kategori berderet ke samping.
 * Baris membentang ke samping, kolom turun ke bawah.
 */
export function tabel(p: string, arah: "menurun" | "mendatar", data: Kat[], isiJudul: string, namaKat: string, o: { jumlah?: boolean; y0?: number } = {}): Tabel {
  const m = data.length;
  const adaJumlah = o.jumlah ?? true;
  const jd = teks(`${p}jd`, 150, 22, isiJudul, 11, W.ungu);
  const sel = (r: number, c: number, x: number, y: number, w: number, h: number, warna: string): Obj => kotak(`${p}x${r}_${c}`, x, y, w, h, warna, W.biru, { rx: 2, tebal: 1.3 });
  if (arah === "menurun") {
    const x0 = 64;
    const w1 = 100;
    const w2 = 72;
    const y0 = o.y0 ?? 36;
    const h = 22;
    const kepala = [jd, sel(0, 0, x0, y0, w1, h, W.langit), sel(0, 1, x0 + w1, y0, w2, h, W.langit), teks(`${p}q0`, x0 + w1 / 2, y0 + 15, namaKat, 9.4), teks(`${p}q1`, x0 + w1 + w2 / 2, y0 + 15, "banyak", 9.4)];
    const isi = (c: number): Obj[] => {
      const y = y0 + (c + 1) * h;
      return [sel(c + 1, 0, x0, y, w1, h, W.putih), sel(c + 1, 1, x0 + w1, y, w2, h, W.krem), teks(`${p}r${c}`, x0 + w1 / 2, y + 15, data[c].nama, 9.4), teks(`${p}c${c}`, x0 + w1 + w2 / 2, y + 15.5, String(data[c].n), 11, W.merah)];
    };
    const yt = y0 + (m + 1) * h;
    const total = adaJumlah ? [sel(m + 1, 0, x0, yt, w1, h, W.hijauMuda), sel(m + 1, 1, x0 + w1, yt, w2, h, W.hijauMuda), teks(`${p}tn`, x0 + w1 / 2, yt + 15, "jumlah", 9.4), teks(`${p}tot`, x0 + w1 + w2 / 2, yt + 15.5, String(jumlah(data)), 11, W.merah)] : [];
    const baris = m + 1 + (adaJumlah ? 1 : 0);
    return {
      p,
      arah,
      data,
      kepala,
      isi,
      total,
      semua: [...kepala, ...data.flatMap((_, c) => isi(c)), ...total],
      selBaris: (r) => [`${p}x${r}_0`, `${p}x${r}_1`],
      selKolom: (c) => Array.from({ length: baris }, (_, r) => `${p}x${r}_${c}`),
    };
  }
  const x0 = 20;
  const w0 = 56;
  const kolom = m + (adaJumlah ? 1 : 0);
  const wk = Math.min(52, (300 - 2 * x0 - w0) / kolom);
  const y0 = o.y0 ?? 62;
  const h = 30;
  const kepala = [jd, sel(0, 0, x0, y0, w0, h, W.langit), sel(1, 0, x0, y0 + h, w0, h, W.langit), teks(`${p}q0`, x0 + w0 / 2, y0 + 19, namaKat, 9.4), teks(`${p}q1`, x0 + w0 / 2, y0 + h + 19, "banyak", 9.4)];
  const isi = (c: number): Obj[] => {
    const x = x0 + w0 + c * wk;
    return [sel(0, c + 1, x, y0, wk, h, W.putih), sel(1, c + 1, x, y0 + h, wk, h, W.krem), teks(`${p}r${c}`, x + wk / 2, y0 + 19, data[c].nama, 9, W.biru), teks(`${p}c${c}`, x + wk / 2, y0 + h + 20, String(data[c].n), 11, W.merah)];
  };
  const xt = x0 + w0 + m * wk;
  const total = adaJumlah ? [sel(0, m + 1, xt, y0, wk, h, W.hijauMuda), sel(1, m + 1, xt, y0 + h, wk, h, W.hijauMuda), teks(`${p}tn`, xt + wk / 2, y0 + 19, "jumlah", 9), teks(`${p}tot`, xt + wk / 2, y0 + h + 20, String(jumlah(data)), 11, W.merah)] : [];
  return {
    p,
    arah,
    data,
    kepala,
    isi,
    total,
    semua: [...kepala, ...data.flatMap((_, c) => isi(c)), ...total],
    selBaris: (r) => Array.from({ length: kolom + 1 }, (_, c) => `${p}x${r}_${c}`),
    selKolom: (c) => [`${p}x0_${c}`, `${p}x1_${c}`],
  };
}

/* ------------------------------ Benda tersebar di layar ------------------------------ */

/** Benda tersebar: id `${p}z{i}`; `data` diurutkan menurut kategori, posisi diberikan per benda. */
export function sebar(p: string, data: Kat[], posisi: [number, number][], u = 22): Obj[] {
  const daftar = data.flatMap((d) => Array.from({ length: d.n }, () => d.emo));
  return daftar.map((e, i) => emo(`${p}z${i}`, posisi[i % posisi.length][0], posisi[i % posisi.length][1], e, u));
}
