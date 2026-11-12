/**
 * Lab Sisa Arsir (Kelas 5 Bab 3, Sub-Bab C: Pengurangan Pecahan): logika murni. Satu alat, tiga tampilan.
 *  Sama  : dari satu batang berarsir, sebagian bagian diambil. Pembilang dikurangkan, penyebut tetap.
 *  Beda  : penyebut berbeda. Anak memilih KPK penyebut, kedua batang dihaluskan menjadi bagian sama besar,
 *          lalu pembilangnya dikurangkan.
 *  Hasil : hasil pengurangan disederhanakan, lalu diperiksa dengan penjumlahan: sisa ditambah bagian yang
 *          diambil harus kembali menjadi pecahan awal.
 * Data dari Buku Siswa Kelas V Bab 3 Sub-Bab C (kertas lukis Lukas dan Yohana, penghapus, apel).
 * Pecahan awal selalu lebih besar dari yang diambil. Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b3.mjs.
 */

export type Pec = { p: number; q: number };
export type Pasang = { a: Pec; b: Pec };

/** Sama: Lukas (2/3 dan 1/3) dan pasangan lain. Pecahan awal a, bagian yang diambil b. */
export const DATA_SAMA: Pasang[] = [
  { a: { p: 2, q: 3 }, b: { p: 1, q: 3 } },
  { a: { p: 6, q: 8 }, b: { p: 2, q: 8 } },
  { a: { p: 5, q: 7 }, b: { p: 2, q: 7 } },
  { a: { p: 9, q: 10 }, b: { p: 3, q: 10 } },
];
/** Beda: Yohana (2/3 dan 1/2) dan pasangan lain. */
export const DATA_BEDA: Pasang[] = [
  { a: { p: 2, q: 3 }, b: { p: 1, q: 2 } },
  { a: { p: 3, q: 4 }, b: { p: 1, q: 6 } },
  { a: { p: 5, q: 6 }, b: { p: 1, q: 3 } },
  { a: { p: 1, q: 2 }, b: { p: 1, q: 5 } },
  { a: { p: 7, q: 8 }, b: { p: 1, q: 4 } },
  { a: { p: 2, q: 3 }, b: { p: 1, q: 6 } },
];
/** Hasil: selisih yang masih bisa disederhanakan, lalu diperiksa dengan penjumlahan. */
export const DATA_HASIL: Pasang[] = [
  { a: { p: 6, q: 8 }, b: { p: 2, q: 8 } },
  { a: { p: 5, q: 6 }, b: { p: 1, q: 3 } },
  { a: { p: 9, q: 10 }, b: { p: 3, q: 10 } },
  { a: { p: 7, q: 12 }, b: { p: 1, q: 4 } },
];

/* ------------------------------ Hitungan ------------------------------ */

export const teksPec = (x: Pec): string => `${x.p}/${x.q}`;
export function fpb(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}
/** KPK dua penyebut: kelipatan persekutuan terkecil. */
export function kpk(q1: number, q2: number): number {
  const langkah = Math.max(q1, q2);
  let n = langkah;
  while (n % q1 !== 0 || n % q2 !== 0) n += langkah;
  return n;
}
const bersama = (q1: number, q2: number, n: number): boolean => n % q1 === 0 && n % q2 === 0;
/** Pembilang setelah penyebut diganti d (pecahan senilai). */
export const ubahKe = (x: Pec, d: number): number => x.p * (d / x.q);
/** Selisih dua pecahan dengan penyebut KPK, belum disederhanakan. */
export const selisihKpk = (a: Pec, b: Pec): Pec => {
  const k = kpk(a.q, b.q);
  return { p: ubahKe(a, k) - ubahKe(b, k), q: k };
};
export const sederhana = (x: Pec): Pec => {
  const g = fpb(x.p, x.q);
  return { p: x.p / g, q: x.q / g };
};
/** Selisih pasangan i pada tampilan Hasil (penyebut KPK, belum disederhanakan). */
export const hasilData = (i: number): Pec => selisihKpk(DATA_HASIL[i].a, DATA_HASIL[i].b);
/** Bentuk paling sederhana dari selisih pasangan i. */
export const bentukBenar = (i: number): string => teksPec(sederhana(hasilData(i)));

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Dua pengecoh pertama dari kandidat: bulat, unik, tidak negatif, bukan benar. Bila kurang, dilengkapi benar + 1, benar + 2, dan seterusnya. */
function pengecoh(benar: number, kandidat: number[], sah: (n: number) => boolean = () => true): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 1, benar + 2, benar + 3, benar + 4]) {
    if (hasil.length === 2) break;
    if (Number.isInteger(n) && n >= 0 && n !== benar && !hasil.includes(n) && sah(n)) hasil.push(n);
  }
  return hasil;
}
function pengecohTeks(benar: string, kandidat: string[]): string[] {
  const hasil: string[] = [];
  for (const t of kandidat) if (hasil.length < 2 && t !== benar && !hasil.includes(t)) hasil.push(t);
  return hasil;
}
/** Pembagi terkecil lebih dari satu dan lebih kecil dari g (pembagi sebagian), atau 0 bila tidak ada. */
const pembagiSebagian = (g: number): number => {
  for (let d = 2; d < g; d += 1) if (g % d === 0) return d;
  return 0;
};

/** Sama, langkah 1: bagian yang tersisa. */
export function opsiAtasSama(i: number): number[] {
  const { a, b } = DATA_SAMA[i];
  const benar = a.p - b.p;
  return putar([benar, ...pengecoh(benar, [a.p + b.p, b.p, a.p])], i);
}
/** Sama, langkah 2: penyebut sisa. Pengecoh: penyebut ikut dikurangi (nol), dijumlahkan, atau dikalikan. */
export function opsiBawahSama(i: number): number[] {
  const { a, b } = DATA_SAMA[i];
  const benar = a.q;
  return putar([benar, ...pengecoh(benar, [a.q - b.q, a.q + b.q, a.q * b.q])], i + 1);
}
/** Beda, langkah 1: KPK dan dua pengecoh (jumlah penyebut, hasil kali bukan yang terkecil). */
export function opsiKpk(i: number): number[] {
  const { a, b } = DATA_BEDA[i];
  const benar = kpk(a.q, b.q);
  return putar([benar, ...pengecoh(benar, [a.q + b.q, a.q * b.q, Math.min(a.q, b.q), Math.max(a.q, b.q)], (n) => n > 0)], i);
}
/** Beda, langkah 2: pembilang selisih di atas KPK. */
export function opsiAtasBeda(i: number): number[] {
  const { a, b } = DATA_BEDA[i];
  const k = kpk(a.q, b.q);
  const benar = ubahKe(a, k) - ubahKe(b, k);
  return putar([benar, ...pengecoh(benar, [a.p - b.p, ubahKe(a, k) + ubahKe(b, k), ubahKe(b, k)], (n) => n > 0)], i + 1);
}
/** Hasil, langkah 1: bentuk paling sederhana dan dua pengecoh. */
export function opsiBentuk(i: number): string[] {
  const h = hasilData(i);
  const benar = bentukBenar(i);
  const g = fpb(h.p, h.q);
  const s = pembagiSebagian(g);
  const kandidat = [s > 0 ? `${h.p / s}/${h.q / s}` : "", `${h.p / g}/${h.q}`, `${h.p}/${h.q / g}`, teksPec(h)].filter((t) => t !== "");
  return putar([benar, ...pengecohTeks(benar, kandidat)], i);
}
/** Hasil, langkah 2: sisa ditambah bagian yang diambil. Pengecoh: pembilang dan penyebut dijumlahkan langsung, dan hanya sisa. */
export function opsiCek(i: number): string[] {
  const { a, b } = DATA_HASIL[i];
  const s = sederhana(hasilData(i));
  const benar = teksPec(a);
  return putar([benar, ...pengecohTeks(benar, [`${s.p + b.p}/${s.q + b.q}`, teksPec(s), teksPec(b)])], i + 1);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateSisaK5B3C = {
  sama: { data: number; atasOk: boolean };
  beda: { data: number; k: number };
  hasil: { data: number; bentukOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiSisaK5B3C =
  | { t: "S_DATA"; i: number }
  | { t: "S_ATAS"; nilai: number }
  | { t: "S_BAWAH"; nilai: number }
  | { t: "B_DATA"; i: number }
  | { t: "B_KPK"; nilai: number }
  | { t: "B_ATAS"; nilai: number }
  | { t: "H_DATA"; i: number }
  | { t: "H_BENTUK"; teks: string }
  | { t: "H_CEK"; teks: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSisaK5B3C = (): StateSisaK5B3C => ({
  sama: { data: 0, atasOk: false },
  beda: { data: 0, k: 0 },
  hasil: { data: 0, bentukOk: false },
  pernah: [],
  pesan: "",
});

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const dataSama = (x: StateSisaK5B3C): Pasang => DATA_SAMA[x.sama.data];
export const dataBeda = (x: StateSisaK5B3C): Pasang => DATA_BEDA[x.beda.data];
export const dataHasil = (x: StateSisaK5B3C): Pasang => DATA_HASIL[x.hasil.data];

function pilihAtasSama(x: StateSisaK5B3C, n: number): StateSisaK5B3C {
  const { a, b } = dataSama(x);
  if (!opsiAtasSama(x.sama.data).includes(n)) return x;
  if (n === a.p - b.p) {
    return { ...x, sama: { ...x.sama, atasOk: true }, pesan: `✅ Benar, ${a.p} bagian diambil ${b.p} bagian menyisakan ${n} bagian. Sekarang tentukan penyebutnya.` };
  }
  const kata = n === a.p + b.p ? "Bagian yang diambil dikurangkan dari bagian semula, bukan digabung." : n === b.p ? "Itu bagian yang diambil. Hitung bagian yang masih tersisa." : `Belum. Dari ${a.p} bagian, ambil ${b.p} bagian, lalu hitung bagian yang tersisa.`;
  return { ...x, sama: { ...x.sama, atasOk: false }, pesan: kata };
}

function pilihBawahSama(x: StateSisaK5B3C, n: number): StateSisaK5B3C {
  const { a, b } = dataSama(x);
  if (!x.sama.atasOk) return { ...x, pesan: "Tentukan dulu pembilangnya." };
  if (!opsiBawahSama(x.sama.data).includes(n)) return x;
  if (n === a.q) {
    return {
      ...x,
      pernah: catat(x.pernah, `sama:${x.sama.data}`),
      pesan: `✅ Tepat! ${teksPec(a)} − ${teksPec(b)} = ${a.p - b.p}/${a.q}. Penyebut tetap ${a.q}, sebab semua bagian sama besar. Hanya pembilangnya yang dikurangkan.`,
    };
  }
  if (n === a.q - b.q) return { ...x, pesan: `Penyebut tidak dikurangi. Potongan tetap sama besar, jadi tetap per ${a.q}.` };
  return { ...x, pesan: `Belum. Bagian pada kedua batang sama besar, yaitu per ${a.q}. Penyebutnya tidak berubah.` };
}

function pilihKpk(x: StateSisaK5B3C, n: number): StateSisaK5B3C {
  const { a, b } = dataBeda(x);
  if (!opsiKpk(x.beda.data).includes(n)) return x;
  const k = kpk(a.q, b.q);
  if (n === k) {
    return {
      ...x,
      beda: { ...x.beda, k },
      pesan: `✅ KPK dari ${a.q} dan ${b.q} adalah ${k}. ${teksPec(a)} menjadi ${ubahKe(a, k)}/${k}, dan ${teksPec(b)} menjadi ${ubahKe(b, k)}/${k}. Penyebut sudah sama, sekarang kurangkan pembilangnya.`,
    };
  }
  const alasan = !bersama(a.q, b.q, n) ? `${n} bukan kelipatan dari kedua penyebut.` : `${n} memang kelipatan keduanya, tetapi bukan yang terkecil.`;
  return { ...x, beda: { ...x.beda, k: 0 }, pesan: `${alasan} KPK adalah kelipatan persekutuan terkecil dari ${a.q} dan ${b.q}.` };
}

function pilihAtasBeda(x: StateSisaK5B3C, n: number): StateSisaK5B3C {
  const { a, b } = dataBeda(x);
  const k = x.beda.k;
  if (k === 0) return { ...x, pesan: "Cari dulu KPK penyebutnya." };
  if (!opsiAtasBeda(x.beda.data).includes(n)) return x;
  const ap = ubahKe(a, k);
  const bp = ubahKe(b, k);
  if (n === ap - bp) {
    const lagi = fpb(n, k) > 1 ? " Hasilnya masih bisa disederhanakan, coba di tampilan Hasil." : "";
    return {
      ...x,
      pernah: catat(x.pernah, `beda:${x.beda.data}`),
      pesan: `✅ Tepat! ${teksPec(a)} − ${teksPec(b)} = ${ap}/${k} − ${bp}/${k} = ${n}/${k}.${lagi}`,
    };
  }
  if (n === a.p - b.p) return { ...x, pesan: `Mengurangkan pembilang aslinya belum cukup. Pakai pembilang setelah penyebut disamakan: ${ap} dan ${bp}.` };
  return { ...x, pesan: `Belum. Kurangkan pembilang setelah penyebut sama: ${ap} dan ${bp}.` };
}

function pilihBentuk(x: StateSisaK5B3C, teks: string): StateSisaK5B3C {
  const i = x.hasil.data;
  const h = hasilData(i);
  if (!opsiBentuk(i).includes(teks)) return x;
  if (teks === bentukBenar(i)) {
    return { ...x, hasil: { ...x.hasil, bentukOk: true }, pesan: `✅ Tepat! ${teksPec(h)} dibagi ${fpb(h.p, h.q)} pada pembilang dan penyebut menjadi ${teks}. Sekarang periksa dengan penjumlahan.` };
  }
  const g = fpb(h.p, h.q);
  const s = pembagiSebagian(g);
  const pesan = s > 0 && teks === `${h.p / s}/${h.q / s}` ? "Itu masih bisa disederhanakan lagi. Bagi dengan bilangan terbesar yang membagi keduanya." : "Pembilang dan penyebut harus dibagi dengan bilangan yang sama, supaya nilainya tidak berubah.";
  return { ...x, hasil: { ...x.hasil, bentukOk: false }, pesan };
}

function pilihCek(x: StateSisaK5B3C, teks: string): StateSisaK5B3C {
  const i = x.hasil.data;
  const { a, b } = DATA_HASIL[i];
  const s = sederhana(hasilData(i));
  if (!x.hasil.bentukOk) return { ...x, pesan: "Sederhanakan dulu hasilnya." };
  if (!opsiCek(i).includes(teks)) return x;
  if (teks === teksPec(a)) {
    return {
      ...x,
      pernah: catat(x.pernah, `hasil:${i}`),
      pesan: `✅ Tepat! ${teksPec(s)} + ${teksPec(b)} = ${teksPec(a)}. Sisa ditambah bagian yang diambil kembali ke pecahan awal, jadi pengurangannya benar.`,
    };
  }
  if (teks === teksPec(s) || teks === teksPec(b)) return { ...x, pesan: "Itu baru satu bagian. Tambahkan sisa dengan bagian yang diambil." };
  return { ...x, pesan: "Pembilang dan penyebut tidak dijumlahkan langsung. Samakan penyebut dahulu, lalu jumlahkan pembilangnya." };
}

export function langkahSisaK5B3C(x: StateSisaK5B3C, a: AksiSisaK5B3C): StateSisaK5B3C {
  switch (a.t) {
    case "S_DATA":
      return sah(a.i, DATA_SAMA.length) ? { ...x, sama: { data: a.i, atasOk: false }, pesan: "" } : x;
    case "S_ATAS":
      return pilihAtasSama(x, a.nilai);
    case "S_BAWAH":
      return pilihBawahSama(x, a.nilai);
    case "B_DATA":
      return sah(a.i, DATA_BEDA.length) ? { ...x, beda: { data: a.i, k: 0 }, pesan: "" } : x;
    case "B_KPK":
      return pilihKpk(x, a.nilai);
    case "B_ATAS":
      return pilihAtasBeda(x, a.nilai);
    case "H_DATA":
      return sah(a.i, DATA_HASIL.length) ? { ...x, hasil: { data: a.i, bentukOk: false }, pesan: "" } : x;
    case "H_BENTUK":
      return pilihBentuk(x, a.teks);
    case "H_CEK":
      return pilihCek(x, a.teks);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSisaK5B3C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSisaK5B3C = { alat: "sisa"; pernah: string[] };
export const keadaanSisaK5B3C = (x: StateSisaK5B3C): KeadaanSisaK5B3C => ({ alat: "sisa", pernah: x.pernah });

export const ucapSamaK5B3C = (x: StateSisaK5B3C): string => {
  const { a, b } = dataSama(x);
  const sekarang = x.sama.atasOk ? "Pembilangnya sudah benar. Tentukan penyebutnya." : "Tentukan dulu pembilangnya.";
  return `Dari ${teksPec(a)} diambil ${teksPec(b)}. Kedua batang punya bagian sama besar. ${sekarang}`;
};
export const ucapBedaK5B3C = (x: StateSisaK5B3C): string => {
  const { a, b } = dataBeda(x);
  const sekarang = x.beda.k === 0 ? "Cari dulu KPK penyebutnya." : `KPK dari kedua penyebut adalah ${x.beda.k}. Sekarang kurangkan pembilangnya.`;
  return `Dari ${teksPec(a)} diambil ${teksPec(b)}. Penyebutnya berbeda. ${sekarang}`;
};
export const ucapHasilK5B3C = (x: StateSisaK5B3C): string => {
  const { a, b } = dataHasil(x);
  const tugas = x.hasil.bentukOk ? "Sekarang periksa dengan penjumlahan." : "Tulis bentuk paling sederhana.";
  return `Hasil dari ${teksPec(a)} dikurangi ${teksPec(b)} adalah ${teksPec(hasilData(x.hasil.data))}. ${tugas}`;
};
