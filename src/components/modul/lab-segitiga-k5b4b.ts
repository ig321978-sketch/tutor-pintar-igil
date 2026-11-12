/**
 * Lab Segitiga (Kelas 5 Bab 4, Sub-Bab B: Keliling Segitiga): logika murni. Satu alat, tiga tampilan.
 *  Jumlah : anak mengetuk ketiga sisi segitiga, lalu memilih keliling (Side Sum: sisi satu + sisi dua + sisi tiga).
 *  Sama   : anak memeriksa apakah ketiga sisi sama panjang. Hanya bila ya, keliling boleh dihitung 3 × sisi
 *           (Equilateral Shortcut). Segitiga sama kaki tetap dijumlahkan.
 *  Ukur   : anak membaca panjang tiap sisi pada penggaris dulu, baru menjumlahkan (Measure Then Sum).
 * Data dari Buku Siswa Kelas V Bab 4 Sub-Bab B (5, 4, 7; 3, 4, 5; sama sisi 5 dan 6; sama kaki).
 * Konsep sub-bab berikutnya (segi empat, segi banyak, gabungan) tidak dipakai di sini.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b4.mjs.
 */

/** Jumlah: sisi segitiga. Data 0 adalah contoh buku, data 2 sama kaki. */
export const DATA_JUMLAH: number[][] = [
  [5, 4, 7],
  [3, 4, 5],
  [6, 6, 4],
  [6, 8, 10],
];
/** Sama: tiga segitiga sama sisi dan satu sama kaki. */
export const DATA_SAMA: number[][] = [
  [5, 5, 5],
  [6, 6, 6],
  [7, 7, 7],
  [6, 6, 4],
];
/** Ukur: sisi yang dibaca pada penggaris (paling panjang 12 cm). Data 0 sama kaki. */
export const DATA_UKUR: number[][] = [
  [8, 5, 5],
  [7, 4, 6],
];
export const SKALA_UKUR = 12;

/* ------------------------------ Hitungan ------------------------------ */

export function jumlahSisi(sisi: number[]): number {
  let jumlah = 0;
  for (const s of sisi) jumlah += s;
  return jumlah;
}
export const tulisJumlah = (sisi: number[]): string => sisi.join(" + ");
export const semuaSama = (sisi: number[]): boolean => sisi.every((s) => s === sisi[0]);

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
/** Pilihan keliling: yang benar, ketiga dikali sisi pertama (hanya bila sisi sama), dan jumlah dua sisi saja. */
function opsiSisi(sisi: number[], geser: number): number[] {
  const benar = jumlahSisi(sisi);
  const kandidat = semuaSama(sisi) ? [2 * sisi[0], sisi[0] * sisi[0]] : [3 * sisi[0], sisi[0] + sisi[1]];
  return putar([benar, ...pengecoh(benar, kandidat)], geser);
}
export const opsiJumlah = (i: number): number[] => opsiSisi(DATA_JUMLAH[i], i);
export const opsiSama = (i: number): number[] => opsiSisi(DATA_SAMA[i], i + 1);
export const opsiUkur = (i: number): number[] => opsiSisi(DATA_UKUR[i], i + 2);

/* ------------------------------ Keadaan ------------------------------ */

export type StateSegitigaK5B4B = {
  jumlah: { data: number; lewat: boolean[]; hasilOk: boolean };
  sama: { data: number; tandaOk: boolean; hasilOk: boolean };
  ukur: { data: number; ok: boolean[]; hasilOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiSegitigaK5B4B =
  | { t: "JM_DATA"; i: number }
  | { t: "JM_SISI"; k: number }
  | { t: "JM_HASIL"; nilai: number }
  | { t: "SM_DATA"; i: number }
  | { t: "SM_JAWAB"; ya: boolean }
  | { t: "SM_HASIL"; nilai: number }
  | { t: "UK_DATA"; i: number }
  | { t: "UK_UKUR"; k: number; nilai: number }
  | { t: "UK_HASIL"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSegitigaK5B4B = (): StateSegitigaK5B4B => ({
  jumlah: { data: 0, lewat: [false, false, false], hasilOk: false },
  sama: { data: 0, tandaOk: false, hasilOk: false },
  ukur: { data: 0, ok: [false, false, false], hasilOk: false },
  pernah: [],
  pesan: "",
});

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;
const semua = (a: boolean[]): boolean => a.every(Boolean);

export const dataJumlah = (x: StateSegitigaK5B4B): number[] => DATA_JUMLAH[x.jumlah.data];
export const dataSama = (x: StateSegitigaK5B4B): number[] => DATA_SAMA[x.sama.data];
export const dataUkur = (x: StateSegitigaK5B4B): number[] => DATA_UKUR[x.ukur.data];

/** Penjelasan jawaban keliling yang salah, sama untuk ketiga tampilan. */
function salahKeliling(sisi: number[], n: number): string {
  const sama3 = semuaSama(sisi);
  if (!sama3 && n === 3 * sisi[0]) return "Dikali 3 hanya bila ketiga sisi sama panjang. Sisi segitiga ini tidak semuanya sama, jumlahkan satu per satu.";
  if (sama3 && n === 2 * sisi[0]) return "Itu baru dua sisi. Segitiga punya tiga sisi, jalurnya melewati ketiganya.";
  if (sama3 && n === sisi[0] * sisi[0]) return "Sisi dikali sisi bukan keliling. Keliling menjumlah tiga sisi, atau 3 × sisi bila ketiganya sama.";
  if (n === sisi[0] + sisi[1]) return "Itu baru dua sisi. Segitiga punya tiga sisi, jalurnya melewati ketiganya.";
  return "Belum. Jumlahkan panjang ketiga sisi segitiga.";
}

function sisiJumlah(x: StateSegitigaK5B4B, k: number): StateSegitigaK5B4B {
  const sisi = dataJumlah(x);
  if (!sah(k, 3)) return x;
  if (x.jumlah.lewat[k]) return { ...x, pesan: `Sisi ke-${k + 1} sudah dijumlah. Ketuk sisi yang lain.` };
  const lewat = x.jumlah.lewat.map((v, j) => (j === k ? true : v));
  const dipakai = sisi.filter((_, j) => lewat[j]);
  const jalur = dipakai.length === 1 ? `${dipakai[0]}` : `${dipakai.join(" + ")} = ${jumlahSisi(dipakai)}`;
  const akhir = semua(lewat) ? " Ketiga sisi sudah dijumlah. Sekarang pilih keliling segitiga." : "";
  return { ...x, jumlah: { ...x.jumlah, lewat }, pesan: `✅ Sisi ke-${k + 1} sepanjang ${sisi[k]} cm. Jumlah sekarang ${jalur} cm.${akhir}` };
}

function hasilJumlah(x: StateSegitigaK5B4B, n: number): StateSegitigaK5B4B {
  const i = x.jumlah.data;
  const sisi = DATA_JUMLAH[i];
  if (!opsiJumlah(i).includes(n)) return x;
  if (!semua(x.jumlah.lewat)) return { ...x, pesan: "Ketuk dulu ketiga sisi, baru pilih keliling." };
  if (n === jumlahSisi(sisi)) {
    return {
      ...x,
      jumlah: { ...x.jumlah, hasilOk: true },
      pernah: catat(x.pernah, `jumlah:${i}`),
      pesan: `✅ ${tulisJumlah(sisi)} = ${n} cm. Keliling segitiga adalah jumlah ketiga sisinya.`,
    };
  }
  return { ...x, pesan: salahKeliling(sisi, n) };
}

function jawabSama(x: StateSegitigaK5B4B, ya: boolean): StateSegitigaK5B4B {
  const sisi = dataSama(x);
  const benar = semuaSama(sisi);
  if (ya !== benar) {
    return {
      ...x,
      sama: { ...x.sama, tandaOk: false, hasilOk: false },
      pesan: ya ? `Sisinya ${sisi.join(", ")}: hanya dua yang sama, bukan ketiganya. Periksa tiap sisi.` : `Sisinya ${sisi.join(", ")}: ketiganya sama panjang, jadi ini segitiga sama sisi.`,
    };
  }
  return {
    ...x,
    sama: { ...x.sama, tandaOk: true },
    pesan: benar
      ? `✅ Ketiga sisi ${sisi.join(", ")} sama panjang. Keliling boleh dihitung 3 × ${sisi[0]}.`
      : `✅ Sisi ${sisi.join(", ")} tidak semuanya sama. Jumlahkan ketiga sisinya satu per satu.`,
  };
}

function hasilSama(x: StateSegitigaK5B4B, n: number): StateSegitigaK5B4B {
  const i = x.sama.data;
  const sisi = DATA_SAMA[i];
  if (!opsiSama(i).includes(n)) return x;
  if (!x.sama.tandaOk) return { ...x, pesan: "Periksa dulu apakah ketiga sisinya sama panjang." };
  if (n === jumlahSisi(sisi)) {
    const pesan = semuaSama(sisi)
      ? `✅ ${tulisJumlah(sisi)} = ${n} cm, sama dengan 3 × ${sisi[0]} = ${n} cm. Ketiga sisi sama panjang, jadi boleh dikali 3.`
      : `✅ ${tulisJumlah(sisi)} = ${n} cm. Hanya dua sisi yang sama, jadi tetap dijumlahkan satu per satu dan tidak dikali 3.`;
    return { ...x, sama: { ...x.sama, hasilOk: true }, pernah: catat(x.pernah, `sama:${i}`), pesan };
  }
  return { ...x, pesan: salahKeliling(sisi, n) };
}

function ukurSisi(x: StateSegitigaK5B4B, k: number, n: number): StateSegitigaK5B4B {
  const sisi = dataUkur(x);
  if (!sah(k, 3) || !Number.isInteger(n) || n < 1 || n > SKALA_UKUR) return x;
  if (x.ukur.ok[k]) return { ...x, pesan: `Sisi ke-${k + 1} sudah diukur ${sisi[k]} cm.` };
  if (n !== sisi[k]) return { ...x, pesan: n < sisi[k] ? `Angka ${n} terlalu kecil. Ujung sisi ke-${k + 1} ada di angka yang lebih besar.` : `Angka ${n} terlalu besar. Ujung sisi ke-${k + 1} ada di angka yang lebih kecil.` };
  const ok = x.ukur.ok.map((v, j) => (j === k ? true : v));
  const akhir = semua(ok) ? " Ketiga sisi sudah diukur. Sekarang jumlahkan." : "";
  return { ...x, ukur: { ...x.ukur, ok }, pesan: `✅ Sisi ke-${k + 1} diukur ${n} cm.${akhir}` };
}

function hasilUkur(x: StateSegitigaK5B4B, n: number): StateSegitigaK5B4B {
  const i = x.ukur.data;
  const sisi = DATA_UKUR[i];
  if (!opsiUkur(i).includes(n)) return x;
  if (!semua(x.ukur.ok)) return { ...x, pesan: "Ukur dulu ketiga sisinya, baru dijumlahkan." };
  if (n === jumlahSisi(sisi)) {
    const kaki = !semuaSama(sisi) && sisi.some((s, a) => sisi.some((t, b) => a !== b && s === t)) ? " Dua sisi yang sama tidak berarti boleh dikali 3." : "";
    return { ...x, ukur: { ...x.ukur, hasilOk: true }, pernah: catat(x.pernah, `ukur:${i}`), pesan: `✅ ${tulisJumlah(sisi)} = ${n} cm. Ukur dulu, baru jumlahkan.${kaki}` };
  }
  return { ...x, pesan: salahKeliling(sisi, n) };
}

export function langkahSegitigaK5B4B(x: StateSegitigaK5B4B, a: AksiSegitigaK5B4B): StateSegitigaK5B4B {
  switch (a.t) {
    case "JM_DATA":
      return sah(a.i, DATA_JUMLAH.length) ? { ...x, jumlah: { data: a.i, lewat: [false, false, false], hasilOk: false }, pesan: "" } : x;
    case "JM_SISI":
      return sisiJumlah(x, a.k);
    case "JM_HASIL":
      return hasilJumlah(x, a.nilai);
    case "SM_DATA":
      return sah(a.i, DATA_SAMA.length) ? { ...x, sama: { data: a.i, tandaOk: false, hasilOk: false }, pesan: "" } : x;
    case "SM_JAWAB":
      return typeof a.ya === "boolean" ? jawabSama(x, a.ya) : x;
    case "SM_HASIL":
      return hasilSama(x, a.nilai);
    case "UK_DATA":
      return sah(a.i, DATA_UKUR.length) ? { ...x, ukur: { data: a.i, ok: [false, false, false], hasilOk: false }, pesan: "" } : x;
    case "UK_UKUR":
      return ukurSisi(x, a.k, a.nilai);
    case "UK_HASIL":
      return hasilUkur(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSegitigaK5B4B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSegitigaK5B4B = { alat: "segitiga"; pernah: string[] };
export const keadaanSegitigaK5B4B = (x: StateSegitigaK5B4B): KeadaanSegitigaK5B4B => ({ alat: "segitiga", pernah: x.pernah });

export const ucapJumlahK5B4B = (x: StateSegitigaK5B4B): string => {
  const sisi = dataJumlah(x);
  const n = x.jumlah.lewat.filter(Boolean).length;
  return `Segitiga ini bersisi ${sisi.join(", ")} sentimeter. Ketuk ketiga sisinya, lalu pilih keliling. Sudah ${n} sisi dijumlah.`;
};
export const ucapSamaK5B4B = (x: StateSegitigaK5B4B): string => {
  const sisi = dataSama(x);
  const sekarang = x.sama.tandaOk ? "Sekarang pilih kelilingnya." : "Periksa dulu, apakah ketiga sisinya sama panjang?";
  return `Segitiga ini bersisi ${sisi.join(", ")} sentimeter. ${sekarang}`;
};
export const ucapUkurK5B4B = (x: StateSegitigaK5B4B): string => {
  const n = x.ukur.ok.filter(Boolean).length;
  return `Baca panjang tiap sisi pada penggaris dulu, baru jumlahkan. Sudah ${n} sisi diukur.`;
};
