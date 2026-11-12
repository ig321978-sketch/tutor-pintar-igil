/**
 * Lab Denah (Kelas 5 Bab 4, Sub-Bab E: Keliling Bangun Gabungan): logika murni. Satu alat, tiga tampilan.
 * Pencapaian bab: denah gabungan memakai keliling dari Sub-Bab A (jalur di tepi), B sampai D (menjumlah sisi).
 *  Luar   : denah dengan sekat dalam (garis putus). Anak menjumlah hanya sisi luar; sekat ditolak (Outer Path Only).
 *  Bungkus: denah dibungkus persegi panjang. Anak menentukan apakah pembungkus cocok (denah tanpa lekukan ke dalam),
 *           lalu memilih keliling (Bounding Rectangle).
 *  Hilang : dua sisi tidak diketahui. Anak mengisinya dari selisih sisi besar dan sisi kecil, lalu menjumlah semua sisi
 *           (Missing Length).
 * Denah berupa poligon bersudut siku pada kisi bulat (titik sudut searah jarum jam). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b4.mjs.
 */

export type Titik = [number, number];
/** Sekat dalam: ruas lurus x1, y1, x2, y2 di dalam denah. */
export type Sekat = [number, number, number, number];
export type Denah = { nama: string; v: Titik[]; sekat: Sekat[] };
export type SisiHilang = { sisi: number; besar: number; kecil: number };
export type DenahHilang = { nama: string; v: Titik[]; hilang: SisiHilang[] };

const L: Titik[] = [[0, 0], [12, 0], [12, 4], [6, 4], [6, 6], [0, 6]];
const T: Titik[] = [[0, 0], [9, 0], [9, 3], [6, 3], [6, 6], [3, 6], [3, 3], [0, 3]];
const U: Titik[] = [[0, 0], [9, 0], [9, 6], [6, 6], [6, 3], [3, 3], [3, 6], [0, 6]];

/** Luar: denah dengan sekat dalam. Data 0 dan 1 wajib, data 2 persegi panjang 8 dan 4 dari buku. */
export const DATA_LUAR: Denah[] = [
  { nama: "L", v: L, sekat: [[6, 0, 6, 4], [0, 4, 6, 4]] },
  { nama: "T", v: T, sekat: [[3, 0, 3, 3], [3, 3, 6, 3]] },
  { nama: "persegi panjang", v: [[0, 0], [8, 0], [8, 4], [0, 4]], sekat: [[4, 0, 4, 4]] },
];
/** Bungkus: denah L cocok dibungkus, denah U tidak cocok, denah T cocok. */
export const DATA_BUNGKUS: { nama: string; v: Titik[] }[] = [
  { nama: "L", v: L },
  { nama: "U", v: U },
  { nama: "T", v: T },
];
/** Hilang: dua sisi tidak diketahui. sisi = indeks sisi yang hilang, besar dan kecil = indeks sisi sejajar untuk selisih. */
export const DATA_HILANG: DenahHilang[] = [
  { nama: "L", v: L, hilang: [{ sisi: 2, besar: 0, kecil: 4 }, { sisi: 3, besar: 5, kecil: 1 }] },
  { nama: "dua", v: [[0, 0], [10, 0], [10, 3], [7, 3], [7, 5], [0, 5]], hilang: [{ sisi: 2, besar: 0, kecil: 4 }, { sisi: 3, besar: 5, kecil: 1 }] },
];

/* ------------------------------ Hitungan ------------------------------ */

/** Panjang tiap sisi dari titik sudut berurutan (sisi mendatar atau tegak). */
export function sisiDenah(v: Titik[]): number[] {
  return v.map((p, k) => {
    const q = v[(k + 1) % v.length];
    return Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]);
  });
}
export function jumlahSisi(sisi: number[]): number {
  let jumlah = 0;
  for (const s of sisi) jumlah += s;
  return jumlah;
}
export const tulisJumlah = (sisi: number[]): string => sisi.join(" + ");
/** Keliling luar: jumlah semua sisi luar. */
export const kelilingLuar = (v: Titik[]): number => jumlahSisi(sisiDenah(v));
/** Ukuran persegi panjang pembungkus dari titik sudut terkecil dan terbesar. */
export function ukuranBungkus(v: Titik[]): { w: number; h: number } {
  const xs = v.map((p) => p[0]);
  const ys = v.map((p) => p[1]);
  return { w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
}
export const kelilingBungkus = (v: Titik[]): number => {
  const { w, h } = ukuranBungkus(v);
  return 2 * (w + h);
};
/** Pembungkus cocok bila keliling luar sama dengan keliling pembungkus (tidak ada lekukan ke dalam). */
export const cocokBungkus = (v: Titik[]): boolean => kelilingLuar(v) === kelilingBungkus(v);
export const panjangSekat = (s: Sekat): number => Math.abs(s[2] - s[0]) + Math.abs(s[3] - s[1]);
export const jumlahSekat = (d: Denah): number => jumlahSisi(d.sekat.map(panjangSekat));
/** Jumlah panjang sisi yang hilang pada denah. */
export const jumlahHilang = (d: DenahHilang): number => {
  const sisi = sisiDenah(d.v);
  return jumlahSisi(d.hilang.map((h) => sisi[h.sisi]));
};

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
/** Keliling luar: pengecoh semua sekat ikut dijumlah, dan satu sisi luar terlewat. */
export function opsiLuar(i: number): number[] {
  const d = DATA_LUAR[i];
  const sisi = sisiDenah(d.v);
  const benar = jumlahSisi(sisi);
  return putar([benar, ...pengecoh(benar, [benar + jumlahSekat(d), benar - sisi[sisi.length - 1]])], i);
}
/** Keliling pada tampilan Bungkus: pengecoh luas pembungkus dan jumlah dua sisi pembungkus (cocok), atau pembungkus yang dipaksakan (tidak cocok). */
export function opsiBungkus(i: number): number[] {
  const v = DATA_BUNGKUS[i].v;
  const { w, h } = ukuranBungkus(v);
  const benar = kelilingLuar(v);
  const kandidat = cocokBungkus(v) ? [w * h, w + h] : [kelilingBungkus(v), w * h];
  return putar([benar, ...pengecoh(benar, kandidat)], i + 1);
}
/** Panjang sisi hilang ke-h: pengecoh sisi besar ditambah sisi kecil, dan sisi besar saja. */
export function opsiHilang(i: number, h: number): number[] {
  const d = DATA_HILANG[i];
  const sisi = sisiDenah(d.v);
  const g = d.hilang[h];
  const benar = sisi[g.sisi];
  return putar([benar, ...pengecoh(benar, [sisi[g.besar] + sisi[g.kecil], sisi[g.besar]])], i + h);
}
/** Keliling setelah sisi hilang dilengkapi: pengecoh sisi hilang belum dijumlah, dan sisi hilang dijumlah dua kali. */
export function opsiHasilHilang(i: number): number[] {
  const d = DATA_HILANG[i];
  const benar = kelilingLuar(d.v);
  return putar([benar, ...pengecoh(benar, [benar - jumlahHilang(d), benar + jumlahHilang(d)])], i + 2);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateDenahK5B4E = {
  luar: { data: number; lewat: boolean[]; hasilOk: boolean };
  bungkus: { data: number; tahuOk: boolean; hasilOk: boolean };
  hilang: { data: number; ok: boolean[]; hasilOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiDenahK5B4E =
  | { t: "LR_DATA"; i: number }
  | { t: "LR_SISI"; k: number }
  | { t: "LR_SEKAT"; j: number }
  | { t: "LR_HASIL"; nilai: number }
  | { t: "BG_DATA"; i: number }
  | { t: "BG_COCOK"; ya: boolean }
  | { t: "BG_HASIL"; nilai: number }
  | { t: "HL_DATA"; i: number }
  | { t: "HL_ISI"; h: number; nilai: number }
  | { t: "HL_HASIL"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const kosong = (n: number): boolean[] => Array.from({ length: n }, () => false);

export const awalDenahK5B4E = (): StateDenahK5B4E => ({
  luar: { data: 0, lewat: kosong(DATA_LUAR[0].v.length), hasilOk: false },
  bungkus: { data: 0, tahuOk: false, hasilOk: false },
  hilang: { data: 0, ok: kosong(DATA_HILANG[0].hilang.length), hasilOk: false },
  pernah: [],
  pesan: "",
});

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;
const semua = (a: boolean[]): boolean => a.every(Boolean);

export const dataLuar = (x: StateDenahK5B4E): Denah => DATA_LUAR[x.luar.data];
export const dataBungkus = (x: StateDenahK5B4E): { nama: string; v: Titik[] } => DATA_BUNGKUS[x.bungkus.data];
export const dataHilang = (x: StateDenahK5B4E): DenahHilang => DATA_HILANG[x.hilang.data];

function sisiLuar(x: StateDenahK5B4E, k: number): StateDenahK5B4E {
  const sisi = sisiDenah(dataLuar(x).v);
  if (!sah(k, sisi.length)) return x;
  if (x.luar.lewat[k]) return { ...x, pesan: `Sisi luar ke-${k + 1} sudah dijumlah. Ketuk sisi luar yang lain.` };
  const lewat = x.luar.lewat.map((v, j) => (j === k ? true : v));
  const dipakai = sisi.filter((_, j) => lewat[j]);
  const jalur = dipakai.length === 1 ? `${dipakai[0]}` : `${dipakai.join(" + ")} = ${jumlahSisi(dipakai)}`;
  const akhir = semua(lewat) ? " Semua sisi luar sudah dijumlah. Sekat dalam tidak ikut. Sekarang pilih keliling." : "";
  return { ...x, luar: { ...x.luar, lewat }, pesan: `✅ Sisi luar ke-${k + 1} sepanjang ${sisi[k]} m. Jumlah sekarang ${jalur} m.${akhir}` };
}

function sekatLuar(x: StateDenahK5B4E, j: number): StateDenahK5B4E {
  const d = dataLuar(x);
  if (!sah(j, d.sekat.length)) return x;
  return { ...x, pesan: `Garis putus itu sekat dalam sepanjang ${panjangSekat(d.sekat[j])} m. Sekat bukan batas luar, jadi tidak dijumlah.` };
}

function hasilLuar(x: StateDenahK5B4E, n: number): StateDenahK5B4E {
  const i = x.luar.data;
  const d = DATA_LUAR[i];
  const sisi = sisiDenah(d.v);
  if (!opsiLuar(i).includes(n)) return x;
  if (!semua(x.luar.lewat)) return { ...x, pesan: "Ketuk dulu semua sisi luar, baru pilih keliling." };
  const K = jumlahSisi(sisi);
  if (n === K) {
    return {
      ...x,
      luar: { ...x.luar, hasilOk: true },
      pernah: catat(x.pernah, `luar:${i}`),
      pesan: `✅ ${tulisJumlah(sisi)} = ${K} m. Hanya sisi luar yang dijumlah, sekat dalam diabaikan.`,
    };
  }
  if (n === K + jumlahSekat(d)) return { ...x, pesan: `Itu ikut menjumlah sekat dalam ${jumlahSekat(d)} m. Sekat bukan batas luar, jangan dijumlah.` };
  if (n === K - sisi[sisi.length - 1]) return { ...x, pesan: "Ada sisi luar yang terlewat. Semua sisi luar sampai kembali ke awal dijumlah." };
  return { ...x, pesan: "Belum. Jumlahkan semua sisi luar, tanpa sekat dalam." };
}

function cocokan(x: StateDenahK5B4E, ya: boolean): StateDenahK5B4E {
  const v = dataBungkus(x).v;
  const cocok = cocokBungkus(v);
  const { w, h } = ukuranBungkus(v);
  const K = kelilingLuar(v);
  const B = kelilingBungkus(v);
  if (ya !== cocok) {
    return {
      ...x,
      bungkus: { ...x.bungkus, tahuOk: false, hasilOk: false },
      pesan: ya ? `Denah ini punya lekukan ke dalam, jadi keliling luarnya ${K} m, lebih panjang dari pembungkus ${B} m.` : `Denah ini tidak punya lekukan ke dalam, jadi keliling luarnya ${K} m, sama dengan pembungkus ${w} dan ${h}.`,
    };
  }
  return {
    ...x,
    bungkus: { ...x.bungkus, tahuOk: true },
    pesan: cocok
      ? `✅ Tidak ada lekukan ke dalam: keliling luar sama dengan keliling pembungkus ${w} dan ${h}. Keliling = 2 × (${w} + ${h}).`
      : `✅ Ada lekukan ke dalam: keliling luar ${K} m lebih panjang dari keliling pembungkus ${B} m. Pembungkus tidak cocok, jumlahkan sisi luar satu per satu.`,
  };
}

function hasilBungkus(x: StateDenahK5B4E, n: number): StateDenahK5B4E {
  const i = x.bungkus.data;
  const v = DATA_BUNGKUS[i].v;
  if (!opsiBungkus(i).includes(n)) return x;
  if (!x.bungkus.tahuOk) return { ...x, pesan: "Periksa dulu, apakah pembungkus cocok untuk denah ini?" };
  const { w, h } = ukuranBungkus(v);
  const K = kelilingLuar(v);
  if (n === K) {
    const pesan = cocokBungkus(v)
      ? `✅ 2 × (${w} + ${h}) = ${K} m, sama dengan jumlah sisi luar ${tulisJumlah(sisiDenah(v))}.`
      : `✅ ${tulisJumlah(sisiDenah(v))} = ${K} m. Pembungkus tidak dipakai karena ada lekukan ke dalam.`;
    return { ...x, bungkus: { ...x.bungkus, hasilOk: true }, pernah: catat(x.pernah, `bungkus:${i}`), pesan };
  }
  if (n === kelilingBungkus(v)) return { ...x, pesan: "Pembungkus hanya cocok bila denah tidak punya lekukan ke dalam. Keliling denah ini lebih panjang." };
  if (n === w * h) return { ...x, pesan: `${n} adalah luas pembungkus, bukan keliling.` };
  if (n === w + h) return { ...x, pesan: `${n} baru panjang ditambah lebar pembungkus. Kalikan 2.` };
  return { ...x, pesan: "Belum. Hitung keliling luar denah." };
}

function isiHilang(x: StateDenahK5B4E, h: number, n: number): StateDenahK5B4E {
  const i = x.hilang.data;
  const d = DATA_HILANG[i];
  if (!sah(h, d.hilang.length) || !opsiHilang(i, h).includes(n)) return x;
  const sisi = sisiDenah(d.v);
  const g = d.hilang[h];
  if (x.hilang.ok[h]) return { ...x, pesan: `Sisi ke-${g.sisi + 1} sudah dilengkapi.` };
  if (n === sisi[g.sisi]) {
    const ok = x.hilang.ok.map((o, j) => (j === h ? true : o));
    return { ...x, hilang: { ...x.hilang, ok, hasilOk: false }, pesan: `✅ Sisi hilang: ${sisi[g.besar]} − ${sisi[g.kecil]} = ${n} m, sebab sisi besar ${sisi[g.besar]} sama dengan sisi kecil ${sisi[g.kecil]} ditambah sisi hilang.` };
  }
  if (n === sisi[g.besar] + sisi[g.kecil]) return { ...x, pesan: "Itu menjumlah, padahal sisi hilang adalah selisih: sisi besar dikurangi sisi kecil." };
  if (n === sisi[g.besar]) return { ...x, pesan: "Itu panjang sisi besar. Sisi hilang adalah selisihnya dengan sisi kecil." };
  return { ...x, pesan: "Belum. Sisi hilang adalah sisi besar dikurangi sisi kecil yang sejajar." };
}

function hasilHilang(x: StateDenahK5B4E, n: number): StateDenahK5B4E {
  const i = x.hilang.data;
  const d = DATA_HILANG[i];
  if (!opsiHasilHilang(i).includes(n)) return x;
  if (!semua(x.hilang.ok)) return { ...x, pesan: "Lengkapi dulu semua sisi yang hilang, baru dijumlah." };
  const sisi = sisiDenah(d.v);
  const K = jumlahSisi(sisi);
  if (n === K) {
    return {
      ...x,
      hilang: { ...x.hilang, hasilOk: true },
      pernah: catat(x.pernah, `hilang:${i}`),
      pesan: `✅ ${tulisJumlah(sisi)} = ${K} m. Sisi yang hilang dilengkapi dulu, baru dijumlah.`,
    };
  }
  if (n === K - jumlahHilang(d)) return { ...x, pesan: "Itu belum menjumlah sisi yang hilang. Semua sisi luar ikut dijumlah." };
  if (n === K + jumlahHilang(d)) return { ...x, pesan: "Itu menjumlah sisi yang hilang dua kali. Tiap sisi dijumlah sekali saja." };
  return { ...x, pesan: "Belum. Jumlahkan semua sisi luar setelah sisi hilang dilengkapi." };
}

export function langkahDenahK5B4E(x: StateDenahK5B4E, a: AksiDenahK5B4E): StateDenahK5B4E {
  switch (a.t) {
    case "LR_DATA":
      return sah(a.i, DATA_LUAR.length) ? { ...x, luar: { data: a.i, lewat: kosong(DATA_LUAR[a.i].v.length), hasilOk: false }, pesan: "" } : x;
    case "LR_SISI":
      return sisiLuar(x, a.k);
    case "LR_SEKAT":
      return sekatLuar(x, a.j);
    case "LR_HASIL":
      return hasilLuar(x, a.nilai);
    case "BG_DATA":
      return sah(a.i, DATA_BUNGKUS.length) ? { ...x, bungkus: { data: a.i, tahuOk: false, hasilOk: false }, pesan: "" } : x;
    case "BG_COCOK":
      return typeof a.ya === "boolean" ? cocokan(x, a.ya) : x;
    case "BG_HASIL":
      return hasilBungkus(x, a.nilai);
    case "HL_DATA":
      return sah(a.i, DATA_HILANG.length) ? { ...x, hilang: { data: a.i, ok: kosong(DATA_HILANG[a.i].hilang.length), hasilOk: false }, pesan: "" } : x;
    case "HL_ISI":
      return isiHilang(x, a.h, a.nilai);
    case "HL_HASIL":
      return hasilHilang(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalDenahK5B4E();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanDenahK5B4E = { alat: "denah"; pernah: string[] };
export const keadaanDenahK5B4E = (x: StateDenahK5B4E): KeadaanDenahK5B4E => ({ alat: "denah", pernah: x.pernah });

export const ucapLuarK5B4E = (x: StateDenahK5B4E): string => {
  const n = x.luar.lewat.filter(Boolean).length;
  return `Denah ini punya garis putus, yaitu sekat dalam. Jumlahkan hanya sisi luarnya, lalu pilih keliling. Sudah ${n} sisi luar dijumlah.`;
};
export const ucapBungkusK5B4E = (x: StateDenahK5B4E): string => {
  const { w, h } = ukuranBungkus(dataBungkus(x).v);
  const sekarang = x.bungkus.tahuOk ? "Sekarang pilih kelilingnya." : "Periksa dulu, apakah pembungkus cocok?";
  return `Denah ini dibungkus persegi panjang ${w} meter dan ${h} meter. ${sekarang}`;
};
export const ucapHilangK5B4E = (x: StateDenahK5B4E): string => {
  const n = x.hilang.ok.filter(Boolean).length;
  return `Dua sisi denah ini belum diketahui. Cari dari selisih sisi besar dan sisi kecil, lalu jumlahkan semua sisi. Sudah ${n} sisi dilengkapi.`;
};
