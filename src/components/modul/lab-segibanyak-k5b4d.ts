/**
 * Lab Segi Banyak (Kelas 5 Bab 4, Sub-Bab D: Keliling Segi Banyak): logika murni. Satu alat, tiga tampilan.
 *  Beraturan : segi-n beraturan, semua sisi sama panjang. Anak menentukan banyak sisi, lalu keliling n × sisi
 *              (Regular n-gon). Hasil dicek dengan menjumlah n sisi.
 *  Beda      : sisi tidak sama panjang. Anak menjumlah semua sisi satu per satu; dikali n ditolak
 *              (Irregular Side Sum).
 *  Tabel     : sisi tetap, banyak sisi berubah. Anak mengisi keliling tiap baris dan melihat pola n × sisi
 *              (Table Pattern).
 * Data dari Buku Siswa Kelas V Bab 4 Sub-Bab D (segi lima sisi 3, segi enam sisi 4, segi delapan sisi 2, tabel).
 * Konsep sub-bab berikutnya (bangun gabungan) tidak dipakai di sini.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b4.mjs.
 */

export type Beraturan = { n: number; s: number };
export type TabelPola = { s: number; baris: number[] };

/** Beraturan: banyak sisi dan panjang sisi. Data 0 sampai 2 dari buku. */
export const DATA_BERATURAN: Beraturan[] = [
  { n: 5, s: 3 },
  { n: 6, s: 4 },
  { n: 8, s: 2 },
  { n: 6, s: 3 },
  { n: 7, s: 3 },
];
/** Beda: sisi tidak sama panjang, segi lima. */
export const DATA_BEDA: number[][] = [
  [2, 3, 4, 5, 6],
  [2, 2, 3, 4, 5],
];
/** Tabel: panjang sisi tetap dan baris banyak sisi. */
export const DATA_TABEL: TabelPola[] = [
  { s: 2, baris: [3, 4, 5, 6, 8] },
  { s: 3, baris: [4, 5, 6, 7] },
];
/** Nama bangun menurut banyak sisi. */
export const NAMA_N: Record<number, string> = { 3: "segitiga", 4: "persegi", 5: "segi lima", 6: "segi enam", 7: "segi tujuh", 8: "segi delapan" };
export const namaN = (n: number): string => NAMA_N[n] ?? `segi ${n}`;

/* ------------------------------ Hitungan ------------------------------ */

/** Menjumlah n sisi yang sama panjang, satu per satu. */
export function jumlahSama(n: number, s: number): number {
  let jumlah = 0;
  for (let i = 0; i < n; i += 1) jumlah += s;
  return jumlah;
}
/** Tulisan penjumlahan: "3 + 3 + 3". */
export const tulisSama = (n: number, s: number): string => Array.from({ length: n }, () => String(s)).join(" + ");
export function jumlahSisi(sisi: number[]): number {
  let jumlah = 0;
  for (const v of sisi) jumlah += v;
  return jumlah;
}
/** Keliling segi-n beraturan: banyak sisi dikali panjang sisi. */
export const kelilingBeraturan = (n: number, s: number): number => n * s;

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Dua pengecoh pertama dari kandidat: bulat positif, unik, bukan benar. Bila kurang, dilengkapi dari benar + 2, benar + 3. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const v of [...kandidat, benar + 2, benar + 3]) {
    if (hasil.length === 2) break;
    if (Number.isInteger(v) && v > 0 && v !== benar && !hasil.includes(v)) hasil.push(v);
  }
  return hasil;
}
/** Pilihan banyak sisi: yang benar, satu lebih sedikit, dan satu lebih banyak. */
export function opsiBanyakSisi(i: number): number[] {
  const { n } = DATA_BERATURAN[i];
  return putar([n, n - 1, n + 1], i);
}
/** Pilihan keliling beraturan: pengecoh banyak sisi ditambah sisi, dan sisi dikali sisi. */
export function opsiBeraturan(i: number): number[] {
  const { n, s } = DATA_BERATURAN[i];
  const benar = kelilingBeraturan(n, s);
  return putar([benar, ...pengecoh(benar, [n + s, s * s])], i + 1);
}
/** Pilihan keliling sisi berbeda: pengecoh banyak sisi dikali sisi pertama, dan satu sisi terlewat. */
export function opsiBeda(i: number): number[] {
  const sisi = DATA_BEDA[i];
  const benar = jumlahSisi(sisi);
  return putar([benar, ...pengecoh(benar, [sisi.length * sisi[0], benar - sisi[sisi.length - 1]])], i);
}
/** Pilihan keliling baris k pada tabel i: pengecoh banyak sisi ditambah sisi, dan banyak sisi dikali banyak sisi. */
export function opsiTabel(i: number, k: number): number[] {
  const { s, baris } = DATA_TABEL[i];
  const n = baris[k];
  const benar = kelilingBeraturan(n, s);
  return putar([benar, ...pengecoh(benar, [n + s, n * n])], i + k);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateSegiBanyakK5B4D = {
  ber: { data: number; sisiOk: boolean; hasilOk: boolean };
  beda: { data: number; lewat: boolean[]; hasilOk: boolean };
  tabel: { data: number; ok: boolean[] };
  pernah: string[];
  pesan: string;
};

export type AksiSegiBanyakK5B4D =
  | { t: "BR_DATA"; i: number }
  | { t: "BR_SISI"; nilai: number }
  | { t: "BR_HASIL"; nilai: number }
  | { t: "BD_DATA"; i: number }
  | { t: "BD_SISI"; k: number }
  | { t: "BD_HASIL"; nilai: number }
  | { t: "TB_DATA"; i: number }
  | { t: "TB_ISI"; k: number; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const kosong = (n: number): boolean[] => Array.from({ length: n }, () => false);

export const awalSegiBanyakK5B4D = (): StateSegiBanyakK5B4D => ({
  ber: { data: 0, sisiOk: false, hasilOk: false },
  beda: { data: 0, lewat: kosong(DATA_BEDA[0].length), hasilOk: false },
  tabel: { data: 0, ok: kosong(DATA_TABEL[0].baris.length) },
  pernah: [],
  pesan: "",
});

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;
const semua = (a: boolean[]): boolean => a.every(Boolean);

export const dataBeraturan = (x: StateSegiBanyakK5B4D): Beraturan => DATA_BERATURAN[x.ber.data];
export const dataBeda = (x: StateSegiBanyakK5B4D): number[] => DATA_BEDA[x.beda.data];
export const dataTabel = (x: StateSegiBanyakK5B4D): TabelPola => DATA_TABEL[x.tabel.data];

function sisiBeraturan(x: StateSegiBanyakK5B4D, v: number): StateSegiBanyakK5B4D {
  const { n } = dataBeraturan(x);
  if (!opsiBanyakSisi(x.ber.data).includes(v)) return x;
  if (v === n) {
    return { ...x, ber: { ...x.ber, sisiOk: true, hasilOk: false }, pesan: `✅ ${namaN(n)} punya ${n} sisi, sesuai namanya. Semua sisinya sama panjang, jadi keliling boleh dihitung ${n} × panjang sisi.` };
  }
  return { ...x, ber: { ...x.ber, sisiOk: false, hasilOk: false }, pesan: `Belum. ${namaN(n)} punya ${n} sisi, sesuai namanya. Hitung sisi pada gambarnya.` };
}

function hasilBeraturan(x: StateSegiBanyakK5B4D, v: number): StateSegiBanyakK5B4D {
  const i = x.ber.data;
  const { n, s } = DATA_BERATURAN[i];
  if (!opsiBeraturan(i).includes(v)) return x;
  if (!x.ber.sisiOk) return { ...x, pesan: "Tentukan dulu banyak sisinya, baru hitung kelilingnya." };
  const K = jumlahSama(n, s);
  if (v === K) {
    return {
      ...x,
      ber: { ...x.ber, hasilOk: true },
      pernah: catat(x.pernah, `ber:${i}`),
      pesan: `✅ ${tulisSama(n, s)} = ${K} cm, sama dengan ${n} × ${s} = ${K} cm. Semua sisi sama panjang, jadi boleh dikali ${n}.`,
    };
  }
  if (v === n + s) return { ...x, pesan: `Itu menjumlah banyak sisi dan panjang sisi. Kalikan banyak sisi dengan panjang satu sisi.` };
  if (v === s * s) return { ...x, pesan: "Sisi dikali sisi bukan keliling. Kalikan banyak sisi dengan panjang satu sisi." };
  return { ...x, pesan: `Belum. Kalikan banyak sisi, yaitu ${n}, dengan panjang sisi ${s}.` };
}

function sisiBeda(x: StateSegiBanyakK5B4D, k: number): StateSegiBanyakK5B4D {
  const sisi = dataBeda(x);
  if (!sah(k, sisi.length)) return x;
  if (x.beda.lewat[k]) return { ...x, pesan: `Sisi ke-${k + 1} sudah dijumlah. Ketuk sisi yang lain.` };
  const lewat = x.beda.lewat.map((v, j) => (j === k ? true : v));
  const dipakai = sisi.filter((_, j) => lewat[j]);
  const jalur = dipakai.length === 1 ? `${dipakai[0]}` : `${dipakai.join(" + ")} = ${jumlahSisi(dipakai)}`;
  const akhir = semua(lewat) ? ` Semua sisi sudah dijumlah. Sekarang pilih keliling ${namaN(sisi.length)}.` : "";
  return { ...x, beda: { ...x.beda, lewat }, pesan: `✅ Sisi ke-${k + 1} sepanjang ${sisi[k]} cm. Jumlah sekarang ${jalur} cm.${akhir}` };
}

function hasilBeda(x: StateSegiBanyakK5B4D, v: number): StateSegiBanyakK5B4D {
  const i = x.beda.data;
  const sisi = DATA_BEDA[i];
  if (!opsiBeda(i).includes(v)) return x;
  if (!semua(x.beda.lewat)) return { ...x, pesan: "Ketuk dulu semua sisi, baru pilih keliling." };
  const K = jumlahSisi(sisi);
  if (v === K) {
    return {
      ...x,
      beda: { ...x.beda, hasilOk: true },
      pernah: catat(x.pernah, `beda:${i}`),
      pesan: `✅ ${sisi.join(" + ")} = ${K} cm. Sisinya tidak sama panjang, jadi semua sisi dijumlah satu per satu.`,
    };
  }
  if (v === sisi.length * sisi[0]) return { ...x, pesan: `Dikali ${sisi.length} hanya bila semua sisi sama panjang. Sisinya berbeda, jadi jumlahkan satu per satu.` };
  return { ...x, pesan: `Itu baru ${sisi.length - 1} sisi. ${namaN(sisi.length)} punya ${sisi.length} sisi, semuanya dijumlah.` };
}

function isiTabel(x: StateSegiBanyakK5B4D, k: number, v: number): StateSegiBanyakK5B4D {
  const i = x.tabel.data;
  const { s, baris } = DATA_TABEL[i];
  if (!sah(k, baris.length) || !opsiTabel(i, k).includes(v)) return x;
  const n = baris[k];
  if (x.tabel.ok[k]) return { ...x, pesan: `Baris ${namaN(n)} sudah terisi.` };
  const K = jumlahSama(n, s);
  if (v !== K) {
    if (v === n + s) return { ...x, pesan: `Itu menjumlah banyak sisi dan panjang sisi. Kalikan ${n} dengan ${s}.` };
    if (v === n * n) return { ...x, pesan: `Itu banyak sisi dikali banyak sisi. Kalikan ${n} dengan panjang sisi ${s}.` };
    return { ...x, pesan: `Belum. ${namaN(n)} beraturan bersisi ${s} cm punya ${n} sisi, kalikan ${n} dengan ${s}.` };
  }
  const ok = x.tabel.ok.map((o, j) => (j === k ? true : o));
  const dasar = `✅ ${namaN(n)} beraturan bersisi ${s} cm: ${n} × ${s} = ${K} cm.`;
  if (!semua(ok)) return { ...x, tabel: { ...x.tabel, ok }, pesan: dasar };
  return {
    ...x,
    tabel: { ...x.tabel, ok },
    pernah: catat(x.pernah, `tabel:${i}`),
    pesan: `${dasar} Semua baris terisi. Polanya: keliling = banyak sisi × ${s}. Tiap bertambah satu sisi, keliling bertambah ${s}.`,
  };
}

export function langkahSegiBanyakK5B4D(x: StateSegiBanyakK5B4D, a: AksiSegiBanyakK5B4D): StateSegiBanyakK5B4D {
  switch (a.t) {
    case "BR_DATA":
      return sah(a.i, DATA_BERATURAN.length) ? { ...x, ber: { data: a.i, sisiOk: false, hasilOk: false }, pesan: "" } : x;
    case "BR_SISI":
      return sisiBeraturan(x, a.nilai);
    case "BR_HASIL":
      return hasilBeraturan(x, a.nilai);
    case "BD_DATA":
      return sah(a.i, DATA_BEDA.length) ? { ...x, beda: { data: a.i, lewat: kosong(DATA_BEDA[a.i].length), hasilOk: false }, pesan: "" } : x;
    case "BD_SISI":
      return sisiBeda(x, a.k);
    case "BD_HASIL":
      return hasilBeda(x, a.nilai);
    case "TB_DATA":
      return sah(a.i, DATA_TABEL.length) ? { ...x, tabel: { data: a.i, ok: kosong(DATA_TABEL[a.i].baris.length) }, pesan: "" } : x;
    case "TB_ISI":
      return isiTabel(x, a.k, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSegiBanyakK5B4D();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSegiBanyakK5B4D = { alat: "segibanyak"; pernah: string[] };
export const keadaanSegiBanyakK5B4D = (x: StateSegiBanyakK5B4D): KeadaanSegiBanyakK5B4D => ({ alat: "segibanyak", pernah: x.pernah });

export const ucapBeraturanK5B4D = (x: StateSegiBanyakK5B4D): string => {
  const { n, s } = dataBeraturan(x);
  const sekarang = x.ber.sisiOk ? "Sekarang pilih kelilingnya." : "Tentukan dulu banyak sisinya.";
  return `${namaN(n)} beraturan ini bersisi ${s} sentimeter. ${sekarang}`;
};
export const ucapBedaK5B4D = (x: StateSegiBanyakK5B4D): string => {
  const sisi = dataBeda(x);
  const n = x.beda.lewat.filter(Boolean).length;
  return `${namaN(sisi.length)} ini sisinya tidak sama panjang. Ketuk semua sisinya, lalu pilih keliling. Sudah ${n} sisi dijumlah.`;
};
export const ucapTabelK5B4D = (x: StateSegiBanyakK5B4D): string => {
  const { s } = dataTabel(x);
  const n = x.tabel.ok.filter(Boolean).length;
  return `Isi tabel keliling segi beraturan bersisi ${s} sentimeter. Sudah ${n} baris terisi.`;
};
