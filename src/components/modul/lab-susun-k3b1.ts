/**
 * Lab Susun (Kelas 3 Bab 1, Sub-Bab D dan E): logika murni.
 * Penjumlahan dan pengurangan dua bilangan sampai 100. Satu model (puluhan dan satuan kedua bilangan),
 * banyak perwakilan: blok, susun pendek (dengan simpanan atau ambilan), susun panjang (uraian), dan periksa.
 * Tanpa skor, tanpa waktu. Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k3b1.mjs.
 */

export type ModeSusun = "tambah" | "kurang";
export type BagianSusun = "ap" | "as" | "bp" | "bs";
export type RepSusun = "blok" | "pendek" | "panjang" | "periksa";

export type StateSusun = {
  mode: ModeSusun;
  ap: number;
  as: number;
  bp: number;
  bs: number;
  tampil: Record<RepSusun, boolean>;
  pesan: string;
};

export type AksiSusun = { t: "UBAH"; bagian: BagianSusun; d: 1 | -1 } | { t: "TOGGLE"; rep: RepSusun } | { t: "RESET" };

export type KeadaanSusun = {
  alat: "susun";
  mode: ModeSusun;
  a: number;
  b: number;
  hasil: number;
  /** Kedua bilangan paling sedikit 10 (benar-benar dua angka). */
  duaAngka: boolean;
  simpan: boolean;
  ambil: boolean;
  blok: boolean;
  pendek: boolean;
  panjang: boolean;
  periksa: boolean;
  /** Jumlah satuan tepat 10 (penjumlahan). */
  satuanSepuluh: boolean;
};

export const NAMA_BAGIAN: Record<BagianSusun, string> = { ap: "puluhan bilangan pertama", as: "satuan bilangan pertama", bp: "puluhan bilangan kedua", bs: "satuan bilangan kedua" };

export const awalSusun = (mode: ModeSusun): StateSusun =>
  mode === "tambah"
    ? { mode, ap: 2, as: 3, bp: 1, bs: 6, tampil: { blok: false, pendek: false, panjang: false, periksa: false }, pesan: "" }
    : { mode, ap: 4, as: 5, bp: 1, bs: 9, tampil: { blok: false, pendek: false, panjang: false, periksa: false }, pesan: "" };

export const bilanganA = (x: Pick<StateSusun, "ap" | "as">): number => 10 * x.ap + x.as;
export const bilanganB = (x: Pick<StateSusun, "bp" | "bs">): number => 10 * x.bp + x.bs;

export type Analisis = {
  a: number;
  b: number;
  hasil: number;
  /** Penjumlahan: satuan dijumlahkan dulu. Pengurangan: satuan atas (setelah mengambil) dikurangi satuan bawah. */
  satuanHitung: number;
  simpan: boolean;
  ambil: boolean;
  tulisSatuan: number;
  /** Penjumlahan: puluhan + simpanan. Pengurangan: puluhan atas setelah mengambil dikurangi puluhan bawah. */
  tulisPuluhan: number;
  puluhanAtas: number;
};

export function analisisSusun(x: StateSusun): Analisis {
  const a = bilanganA(x);
  const b = bilanganB(x);
  if (x.mode === "tambah") {
    const ss = x.as + x.bs;
    const simpan = ss >= 10;
    return {
      a,
      b,
      hasil: a + b,
      satuanHitung: ss,
      simpan,
      ambil: false,
      tulisSatuan: simpan ? ss - 10 : ss,
      tulisPuluhan: x.ap + x.bp + (simpan ? 1 : 0),
      puluhanAtas: x.ap,
    };
  }
  const ambil = x.as < x.bs;
  const satuanAtas = x.as + (ambil ? 10 : 0);
  const puluhanAtas = x.ap - (ambil ? 1 : 0);
  return {
    a,
    b,
    hasil: a - b,
    satuanHitung: satuanAtas,
    simpan: false,
    ambil,
    tulisSatuan: satuanAtas - x.bs,
    tulisPuluhan: puluhanAtas - x.bp,
    puluhanAtas,
  };
}

const sah = (x: StateSusun): boolean => {
  const a = bilanganA(x);
  const b = bilanganB(x);
  return x.mode === "tambah" ? a + b <= 100 : a >= b;
};

const tolak = (x: StateSusun, pesan: string): StateSusun => ({ ...x, pesan });

export function langkahSusun(x: StateSusun, a: AksiSusun): StateSusun {
  switch (a.t) {
    case "UBAH": {
      const baru = x[a.bagian] + a.d;
      if (baru < 0 || baru > 9) return tolak(x, "Angka tiap tempat 0 sampai 9.");
      const y = { ...x, [a.bagian]: baru, pesan: "" } as StateSusun;
      if (!sah(y)) {
        return tolak(x, x.mode === "tambah" ? "Jumlahnya paling besar 100 di bab ini." : "Bilangan pertama harus lebih besar atau sama dengan bilangan kedua, supaya hasilnya tidak di bawah nol.");
      }
      return y;
    }
    case "TOGGLE": {
      if (a.rep === "periksa" && x.mode === "tambah") return x;
      return { ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" };
    }
    case "RESET":
      return awalSusun(x.mode);
  }
}

export function keadaanSusun(x: StateSusun): KeadaanSusun {
  const an = analisisSusun(x);
  return {
    alat: "susun",
    mode: x.mode,
    a: an.a,
    b: an.b,
    hasil: an.hasil,
    duaAngka: an.a >= 10 && an.b >= 10,
    simpan: an.simpan,
    ambil: an.ambil,
    blok: x.tampil.blok,
    pendek: x.tampil.pendek,
    panjang: x.tampil.panjang,
    periksa: x.mode === "kurang" && x.tampil.periksa,
    satuanSepuluh: x.mode === "tambah" && x.as + x.bs === 10,
  };
}

/** Baris susun panjang (uraian). */
export function barisPanjang(x: StateSusun): string[] {
  const an = analisisSusun(x);
  const ap10 = 10 * x.ap;
  const bp10 = 10 * x.bp;
  if (x.mode === "tambah") {
    return [
      `${an.a} = ${ap10} + ${x.as}`,
      `${an.b} = ${bp10} + ${x.bs}`,
      `(${ap10} + ${bp10}) + (${x.as} + ${x.bs}) = ${ap10 + bp10} + ${an.satuanHitung}`,
      `${ap10 + bp10} + ${an.satuanHitung} = ${an.hasil}`,
    ];
  }
  if (!an.ambil) {
    return [
      `${an.a} = ${ap10} + ${x.as}`,
      `${an.b} = ${bp10} + ${x.bs}`,
      `(${ap10} − ${bp10}) + (${x.as} − ${x.bs}) = ${ap10 - bp10} + ${x.as - x.bs}`,
      `${ap10 - bp10} + ${x.as - x.bs} = ${an.hasil}`,
    ];
  }
  return [
    `${an.a} = ${ap10 - 10} + ${x.as + 10}`,
    `${an.b} = ${bp10} + ${x.bs}`,
    `(${ap10 - 10} − ${bp10}) + (${x.as + 10} − ${x.bs}) = ${ap10 - 10 - bp10} + ${an.tulisSatuan}`,
    `${ap10 - 10 - bp10} + ${an.tulisSatuan} = ${an.hasil}`,
  ];
}

/** Kalimat soal dan hasil, memakai tanda minus yang benar (U+2212). */
export const kalimatSusun = (x: StateSusun): string => {
  const an = analisisSusun(x);
  return `${an.a} ${x.mode === "tambah" ? "+" : "−"} ${an.b} = ${an.hasil}`;
};

export const kalimatPeriksa = (x: StateSusun): string => {
  const an = analisisSusun(x);
  return `${an.hasil} + ${an.b} = ${an.a}`;
};

/** Penjelasan pendek langkah susun pendek untuk dibaca guru. */
export function ucapSusun(x: StateSusun): string {
  const an = analisisSusun(x);
  if (x.mode === "tambah") {
    const langkah = an.simpan
      ? `Satuan ${x.as} tambah ${x.bs} sama dengan ${an.satuanHitung}. Sepuluh satuan ditukar satu puluhan: tulis ${an.tulisSatuan}, simpan satu puluhan. Puluhan menjadi ${an.tulisPuluhan}.`
      : `Satuan ${x.as} tambah ${x.bs} sama dengan ${an.satuanHitung}. Tidak perlu menyimpan. Puluhan ${x.ap} tambah ${x.bp} sama dengan ${an.tulisPuluhan}.`;
    return `${langkah} Hasilnya ${an.hasil}.`;
  }
  const langkah = an.ambil
    ? `Satuan ${x.as} kurang dari ${x.bs}. Ambil satu puluhan, satuan menjadi ${an.satuanHitung}. ${an.satuanHitung} kurang ${x.bs} sama dengan ${an.tulisSatuan}. Puluhan ${an.puluhanAtas} kurang ${x.bp} sama dengan ${an.tulisPuluhan}.`
    : `Satuan ${x.as} kurang ${x.bs} sama dengan ${an.tulisSatuan}. Tidak perlu mengambil. Puluhan ${x.ap} kurang ${x.bp} sama dengan ${an.tulisPuluhan}.`;
  return `${langkah} Hasilnya ${an.hasil}.`;
}
