/**
 * Lab Segi Empat (Kelas 5 Bab 4, Sub-Bab C: Keliling Segi Empat): logika murni. Satu alat, tiga tampilan.
 *  Persegi Panjang : anak menjumlahkan panjang dan lebar dulu, lalu mengalikan 2, sebab ada dua panjang dan dua lebar
 *                    (Rectangle Formula). Hasil dicek dengan menjumlah keempat sisi.
 *  Persegi         : keempat sisi sama panjang, keliling 4 × sisi (Square Shortcut).
 *  Beda            : panjang dikali lebar adalah luas, bukan keliling (Not Area Product). Anak menghitung keliling dan luas
 *                    bangun yang sama.
 * Data dari Buku Siswa Kelas V Bab 4 Sub-Bab C (5 dan 3, 4 dan 2, 8 dan 4, persegi sisi 3 dan 5).
 * Konsep sub-bab berikutnya (segi banyak, gabungan) tidak dipakai di sini.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b4.mjs.
 */

export type PersegiPanjang = { p: number; l: number };

/** Persegi Panjang: panjang dan lebar. Data 0 dan 1 dari buku. */
export const DATA_PP: PersegiPanjang[] = [
  { p: 5, l: 3 },
  { p: 4, l: 2 },
  { p: 7, l: 2 },
];
/** Persegi: panjang sisi. */
export const DATA_PERSEGI: number[] = [3, 5, 6];
/** Beda: persegi panjang 8 dan 4 dari buku, dan persegi sisi 2 (panjang dan lebar sama). */
export const DATA_BEDA: PersegiPanjang[] = [
  { p: 8, l: 4 },
  { p: 2, l: 2 },
];

/* ------------------------------ Hitungan ------------------------------ */

/** Keliling persegi panjang: dua kali jumlah panjang dan lebar. */
export const kelilingPP = (b: PersegiPanjang): number => 2 * (b.p + b.l);
/** Keliling persegi: empat kali sisi. */
export const kelilingPersegi = (s: number): number => 4 * s;
/** Luas: panjang dikali lebar. */
export const luasPP = (b: PersegiPanjang): number => b.p * b.l;
/** Menjumlah keempat sisi satu per satu: panjang, lebar, panjang, lebar. */
export function jumlahEmpatSisi(b: PersegiPanjang): number {
  let jumlah = 0;
  for (const s of [b.p, b.l, b.p, b.l]) jumlah += s;
  return jumlah;
}

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Dua pengecoh pertama dari kandidat: bulat positif, unik, bukan benar. Bila kurang, dilengkapi dari benar + 2, benar + 3. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 2, benar + 3]) {
    if (hasil.length === 2) break;
    if (Number.isInteger(n) && n > 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
/** Jumlah panjang dan lebar: pengecoh panjang dikali lebar (luas) dan dua kali panjang. */
export function opsiJumlahPP(i: number): number[] {
  const b = DATA_PP[i];
  const benar = b.p + b.l;
  return putar([benar, ...pengecoh(benar, [luasPP(b), 2 * b.p])], i);
}
/** Keliling persegi panjang: pengecoh belum dikali 2, kurung hilang (2 × panjang + lebar), dan luas. */
export function opsiKaliPP(i: number): number[] {
  const b = DATA_PP[i];
  const benar = kelilingPP(b);
  return putar([benar, ...pengecoh(benar, [b.p + b.l, 2 * b.p + b.l, luasPP(b)])], i + 1);
}
/** Keliling persegi: pengecoh sisi dikali sisi (luas) dan dua kali sisi. */
export function opsiPersegi(i: number): number[] {
  const s = DATA_PERSEGI[i];
  const benar = kelilingPersegi(s);
  return putar([benar, ...pengecoh(benar, [s * s, 2 * s])], i + 2);
}
/** Keliling pada tampilan Beda: pengecoh panjang dikali lebar (luas) dan jumlah panjang dan lebar. */
export function opsiBedaKeliling(i: number): number[] {
  const b = DATA_BEDA[i];
  const benar = kelilingPP(b);
  return putar([benar, ...pengecoh(benar, [luasPP(b), b.p + b.l])], i + 1);
}
/** Luas pada tampilan Beda: pengecoh keliling dan jumlah panjang dan lebar. */
export function opsiBedaLuas(i: number): number[] {
  const b = DATA_BEDA[i];
  const benar = luasPP(b);
  return putar([benar, ...pengecoh(benar, [kelilingPP(b), b.p + b.l])], i + 2);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateSegiEmpatK5B4C = {
  pp: { data: number; jumlahOk: boolean; hasilOk: boolean };
  persegi: { data: number; hasilOk: boolean };
  beda: { data: number; kelOk: boolean; luasOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiSegiEmpatK5B4C =
  | { t: "PP_DATA"; i: number }
  | { t: "PP_JUMLAH"; nilai: number }
  | { t: "PP_KALI"; nilai: number }
  | { t: "PS_DATA"; i: number }
  | { t: "PS_HASIL"; nilai: number }
  | { t: "BD_DATA"; i: number }
  | { t: "BD_KELILING"; nilai: number }
  | { t: "BD_LUAS"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSegiEmpatK5B4C = (): StateSegiEmpatK5B4C => ({
  pp: { data: 0, jumlahOk: false, hasilOk: false },
  persegi: { data: 0, hasilOk: false },
  beda: { data: 0, kelOk: false, luasOk: false },
  pernah: [],
  pesan: "",
});

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const dataPP = (x: StateSegiEmpatK5B4C): PersegiPanjang => DATA_PP[x.pp.data];
export const dataPersegi = (x: StateSegiEmpatK5B4C): number => DATA_PERSEGI[x.persegi.data];
export const dataBeda = (x: StateSegiEmpatK5B4C): PersegiPanjang => DATA_BEDA[x.beda.data];

function jumlahPP(x: StateSegiEmpatK5B4C, n: number): StateSegiEmpatK5B4C {
  const b = dataPP(x);
  if (!opsiJumlahPP(x.pp.data).includes(n)) return x;
  if (n === b.p + b.l) {
    return { ...x, pp: { ...x.pp, jumlahOk: true, hasilOk: false }, pesan: `✅ Panjang ditambah lebar: ${b.p} + ${b.l} = ${n}. Sekarang kalikan 2, sebab ada dua panjang dan dua lebar.` };
  }
  if (n === luasPP(b)) return { ...x, pp: { ...x.pp, jumlahOk: false, hasilOk: false }, pesan: `${n} adalah panjang dikali lebar, yaitu luas. Untuk keliling, jumlahkan panjang dan lebar.` };
  if (n === 2 * b.p) return { ...x, pp: { ...x.pp, jumlahOk: false, hasilOk: false }, pesan: "Itu baru dua panjang. Jumlahkan satu panjang dan satu lebar." };
  return { ...x, pp: { ...x.pp, jumlahOk: false, hasilOk: false }, pesan: "Belum. Jumlahkan satu panjang dan satu lebar." };
}

function kaliPP(x: StateSegiEmpatK5B4C, n: number): StateSegiEmpatK5B4C {
  const i = x.pp.data;
  const b = DATA_PP[i];
  if (!opsiKaliPP(i).includes(n)) return x;
  if (!x.pp.jumlahOk) return { ...x, pesan: "Jumlahkan dulu panjang dan lebar, baru dikali 2." };
  const K = kelilingPP(b);
  if (n === K) {
    return {
      ...x,
      pp: { ...x.pp, hasilOk: true },
      pernah: catat(x.pernah, `pp:${i}`),
      pesan: `✅ 2 × (${b.p} + ${b.l}) = 2 × ${b.p + b.l} = ${K} cm. Dicek dengan menjumlah keempat sisi: ${b.p} + ${b.l} + ${b.p} + ${b.l} = ${jumlahEmpatSisi(b)} cm.`,
    };
  }
  if (n === b.p + b.l) return { ...x, pesan: `${n} baru panjang ditambah lebar. Kalikan 2, sebab keliling melewati dua panjang dan dua lebar.` };
  if (n === 2 * b.p + b.l) return { ...x, pesan: "Kurungnya hilang: hanya panjang yang dikali 2. Kalikan 2 dengan jumlah panjang dan lebar." };
  if (n === luasPP(b)) return { ...x, pesan: `${n} adalah panjang dikali lebar, yaitu luas, bukan keliling.` };
  return { ...x, pesan: `Belum. Kalikan 2 dengan ${b.p + b.l}.` };
}

function hasilPersegi(x: StateSegiEmpatK5B4C, n: number): StateSegiEmpatK5B4C {
  const i = x.persegi.data;
  const s = DATA_PERSEGI[i];
  if (!opsiPersegi(i).includes(n)) return x;
  const K = kelilingPersegi(s);
  if (n === K) {
    return {
      ...x,
      persegi: { ...x.persegi, hasilOk: true },
      pernah: catat(x.pernah, `persegi:${i}`),
      pesan: `✅ ${s} + ${s} + ${s} + ${s} = ${K} cm, sama dengan 4 × ${s} = ${K} cm. Keempat sisi persegi sama panjang.`,
    };
  }
  if (n === s * s) return { ...x, pesan: `${n} adalah sisi dikali sisi, yaitu luas. Keliling menjumlah empat sisi.` };
  if (n === 2 * s) return { ...x, pesan: "Itu baru dua sisi. Persegi punya empat sisi yang sama panjang." };
  return { ...x, pesan: "Belum. Jumlahkan keempat sisi persegi." };
}

function kelilingBeda(x: StateSegiEmpatK5B4C, n: number): StateSegiEmpatK5B4C {
  const i = x.beda.data;
  const b = DATA_BEDA[i];
  if (!opsiBedaKeliling(i).includes(n)) return x;
  const K = kelilingPP(b);
  if (n === K) {
    const baru = { ...x, beda: { ...x.beda, kelOk: true }, pernah: x.beda.luasOk ? catat(x.pernah, `beda:${i}`) : x.pernah };
    return { ...baru, pesan: `✅ Keliling = 2 × (${b.p} + ${b.l}) = ${K} cm, panjang jalur di tepi.${selesaiBeda(baru)}` };
  }
  if (n === luasPP(b)) return { ...x, pesan: `${n} adalah panjang dikali lebar, yaitu luas. Keliling menghitung jalur di tepi, bukan petak di dalam.` };
  if (n === b.p + b.l) return { ...x, pesan: `${n} baru panjang ditambah lebar. Kalikan 2 untuk dua panjang dan dua lebar.` };
  return { ...x, pesan: "Belum. Keliling adalah 2 kali jumlah panjang dan lebar." };
}

function luasBeda(x: StateSegiEmpatK5B4C, n: number): StateSegiEmpatK5B4C {
  const i = x.beda.data;
  const b = DATA_BEDA[i];
  if (!opsiBedaLuas(i).includes(n)) return x;
  if (n === luasPP(b)) {
    const baru = { ...x, beda: { ...x.beda, luasOk: true }, pernah: x.beda.kelOk ? catat(x.pernah, `beda:${i}`) : x.pernah };
    return { ...baru, pesan: `✅ Luas = ${b.p} × ${b.l} = ${n} petak, banyak petak di dalam.${selesaiBeda(baru)}` };
  }
  if (n === kelilingPP(b)) return { ...x, pesan: `${n} adalah keliling, panjang jalur di tepi. Luas adalah banyak petak di dalam.` };
  return { ...x, pesan: "Belum. Luas adalah panjang dikali lebar." };
}

function selesaiBeda(x: StateSegiEmpatK5B4C): string {
  if (!(x.beda.kelOk && x.beda.luasOk)) return "";
  const b = dataBeda(x);
  return ` Keliling ${kelilingPP(b)} cm dan luas ${luasPP(b)} petak adalah dua hal berbeda. Panjang dikali lebar adalah luas, bukan keliling.`;
}

export function langkahSegiEmpatK5B4C(x: StateSegiEmpatK5B4C, a: AksiSegiEmpatK5B4C): StateSegiEmpatK5B4C {
  switch (a.t) {
    case "PP_DATA":
      return sah(a.i, DATA_PP.length) ? { ...x, pp: { data: a.i, jumlahOk: false, hasilOk: false }, pesan: "" } : x;
    case "PP_JUMLAH":
      return jumlahPP(x, a.nilai);
    case "PP_KALI":
      return kaliPP(x, a.nilai);
    case "PS_DATA":
      return sah(a.i, DATA_PERSEGI.length) ? { ...x, persegi: { data: a.i, hasilOk: false }, pesan: "" } : x;
    case "PS_HASIL":
      return hasilPersegi(x, a.nilai);
    case "BD_DATA":
      return sah(a.i, DATA_BEDA.length) ? { ...x, beda: { data: a.i, kelOk: false, luasOk: false }, pesan: "" } : x;
    case "BD_KELILING":
      return kelilingBeda(x, a.nilai);
    case "BD_LUAS":
      return luasBeda(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSegiEmpatK5B4C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSegiEmpatK5B4C = { alat: "segiempat"; pernah: string[] };
export const keadaanSegiEmpatK5B4C = (x: StateSegiEmpatK5B4C): KeadaanSegiEmpatK5B4C => ({ alat: "segiempat", pernah: x.pernah });

export const ucapPPK5B4C = (x: StateSegiEmpatK5B4C): string => {
  const b = dataPP(x);
  const sekarang = x.pp.jumlahOk ? "Sekarang kalikan dua." : "Jumlahkan dulu panjang dan lebar.";
  return `Persegi panjang ini panjangnya ${b.p} sentimeter dan lebarnya ${b.l} sentimeter. ${sekarang}`;
};
export const ucapPersegiK5B4C = (x: StateSegiEmpatK5B4C): string => {
  const s = dataPersegi(x);
  return `Persegi ini sisinya ${s} sentimeter. Keempat sisinya sama panjang. Pilih kelilingnya.`;
};
export const ucapBedaK5B4C = (x: StateSegiEmpatK5B4C): string => {
  const b = dataBeda(x);
  const sekarang = x.beda.kelOk && x.beda.luasOk ? "Keliling dan luas sudah dihitung." : "Hitung keliling dan luasnya.";
  return `Bangun ini panjangnya ${b.p} sentimeter dan lebarnya ${b.l} sentimeter. ${sekarang}`;
};
