/**
 * Lab Jumlah Arsir (Kelas 5 Bab 3, Sub-Bab B: Penjumlahan Pecahan): logika murni. Satu alat, tiga tampilan.
 *  Sama  : dua arsir pada batang dengan bagian sama besar. Pembilang dijumlahkan, penyebut tetap.
 *  Beda  : penyebut berbeda. Anak memilih KPK penyebut, kedua batang dihaluskan menjadi bagian sama besar,
 *          lalu pembilangnya dijumlahkan.
 *  Hasil : hasil penjumlahan disederhanakan (dibagi bilangan yang sama), atau diubah menjadi pecahan campuran
 *          bila lebih dari satu bulat.
 * Data dari Buku Siswa Kelas V Bab 3 Sub-Bab B (martabak Lukas dan Komang, wingko, penghapus Asep dan Yohana).
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b3.mjs.
 */

export type Pec = { p: number; q: number };
export type Pasang = { a: Pec; b: Pec };
export type Hasil = Pasang & { jenis: "sederhana" | "campuran" };

/** Sama: martabak (1/8 dan 2/8), penghapus (2/10 dan 3/10), dan dua pasang lain. */
export const DATA_SAMA: Pasang[] = [
  { a: { p: 1, q: 8 }, b: { p: 2, q: 8 } },
  { a: { p: 2, q: 10 }, b: { p: 3, q: 10 } },
  { a: { p: 1, q: 5 }, b: { p: 2, q: 5 } },
  { a: { p: 3, q: 7 }, b: { p: 2, q: 7 } },
];
/** Beda: wingko (1/2 dan 1/3) dan pasangan lain. */
export const DATA_BEDA: Pasang[] = [
  { a: { p: 1, q: 2 }, b: { p: 1, q: 3 } },
  { a: { p: 1, q: 4 }, b: { p: 1, q: 6 } },
  { a: { p: 2, q: 3 }, b: { p: 1, q: 6 } },
  { a: { p: 1, q: 5 }, b: { p: 1, q: 2 } },
  { a: { p: 3, q: 4 }, b: { p: 1, q: 8 } },
  { a: { p: 2, q: 5 }, b: { p: 1, q: 10 } },
];
/** Hasil: pecahan yang masih bisa disederhanakan, dan pecahan lebih dari satu bulat. */
export const DATA_HASIL: Hasil[] = [
  { a: { p: 4, q: 9 }, b: { p: 2, q: 9 }, jenis: "sederhana" },
  { a: { p: 2, q: 5 }, b: { p: 1, q: 10 }, jenis: "sederhana" },
  { a: { p: 1, q: 12 }, b: { p: 3, q: 12 }, jenis: "sederhana" },
  { a: { p: 3, q: 5 }, b: { p: 4, q: 5 }, jenis: "campuran" },
  { a: { p: 4, q: 7 }, b: { p: 5, q: 7 }, jenis: "campuran" },
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
/** Jumlah dua pecahan dengan penyebut KPK, belum disederhanakan. */
export const jumlahKpk = (a: Pec, b: Pec): Pec => {
  const k = kpk(a.q, b.q);
  return { p: ubahKe(a, k) + ubahKe(b, k), q: k };
};
export const sederhana = (x: Pec): Pec => {
  const g = fpb(x.p, x.q);
  return { p: x.p / g, q: x.q / g };
};
/** Bentuk campuran dari pecahan lebih dari satu bulat. */
export const campuranDari = (x: Pec): { b: number; p: number; q: number } => ({ b: Math.floor(x.p / x.q), p: x.p % x.q, q: x.q });
export const teksCampuran = (x: Pec): string => {
  const c = campuranDari(x);
  return `${c.b} ${c.p}/${c.q}`;
};
/** Hasil penjumlahan pasangan i pada tampilan Hasil (penyebut KPK, belum disederhanakan). */
export const hasilData = (i: number): Pec => jumlahKpk(DATA_HASIL[i].a, DATA_HASIL[i].b);
/** Bentuk jawaban benar tampilan Hasil. */
export const bentukBenar = (i: number): string => (DATA_HASIL[i].jenis === "sederhana" ? teksPec(sederhana(hasilData(i))) : teksCampuran(hasilData(i)));

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Dua pengecoh pertama dari kandidat: unik dan bukan benar. Bila kurang, dilengkapi benar + 1, benar + 2, dan seterusnya. */
function pengecoh(benar: number, kandidat: number[], sah: (n: number) => boolean = () => true): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 1, benar + 2, benar + 3, benar + 4]) {
    if (hasil.length === 2) break;
    if (Number.isInteger(n) && n > 0 && n !== benar && !hasil.includes(n) && sah(n)) hasil.push(n);
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

/** Sama, langkah 1: banyak bagian terarsir seluruhnya. */
export function opsiAtasSama(i: number): number[] {
  const { a, b } = DATA_SAMA[i];
  const benar = a.p + b.p;
  return putar([benar, ...pengecoh(benar, [a.p * b.p, a.p, b.p])], i);
}
/** Sama, langkah 2: penyebut hasil. */
export function opsiBawahSama(i: number): number[] {
  const { a, b } = DATA_SAMA[i];
  const benar = a.q;
  return putar([benar, ...pengecoh(benar, [a.q + b.q, a.q * b.q])], i + 1);
}
/** Beda, langkah 1: KPK dan dua pengecoh (jumlah penyebut, hasil kali bukan yang terkecil). */
export function opsiKpk(i: number): number[] {
  const { a, b } = DATA_BEDA[i];
  const benar = kpk(a.q, b.q);
  return putar([benar, ...pengecoh(benar, [a.q + b.q, a.q * b.q, Math.min(a.q, b.q), Math.max(a.q, b.q)])], i);
}
/** Beda, langkah 2: pembilang hasil di atas KPK. */
export function opsiAtasBeda(i: number): number[] {
  const { a, b } = DATA_BEDA[i];
  const k = kpk(a.q, b.q);
  const benar = ubahKe(a, k) + ubahKe(b, k);
  return putar([benar, ...pengecoh(benar, [a.p + b.p, ubahKe(a, k), ubahKe(b, k)])], i + 1);
}
/** Hasil: bentuk paling sederhana atau bentuk campuran, dan dua pengecoh. */
export function opsiBentuk(i: number): string[] {
  const h = hasilData(i);
  const benar = bentukBenar(i);
  if (DATA_HASIL[i].jenis === "sederhana") {
    const g = fpb(h.p, h.q);
    const s = pembagiSebagian(g);
    const kandidat = [s > 0 ? `${h.p / s}/${h.q / s}` : "", `${h.p / g}/${h.q}`, `${h.p}/${h.q / g}`, teksPec(h)].filter((t) => t !== "");
    return putar([benar, ...pengecohTeks(benar, kandidat)], i);
  }
  const c = campuranDari(h);
  const kandidat = [`${c.p} ${c.b}/${c.q}`, `${c.b} ${c.p}/${h.p}`, `${c.b + 1} ${c.p}/${c.q}`, `${c.b} ${c.p}/${c.q + 1}`];
  return putar([benar, ...pengecohTeks(benar, kandidat)], i);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateJumlahK5B3B = {
  sama: { data: number; atasOk: boolean };
  beda: { data: number; k: number };
  hasil: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiJumlahK5B3B =
  | { t: "S_DATA"; i: number }
  | { t: "S_ATAS"; nilai: number }
  | { t: "S_BAWAH"; nilai: number }
  | { t: "B_DATA"; i: number }
  | { t: "B_KPK"; nilai: number }
  | { t: "B_ATAS"; nilai: number }
  | { t: "H_DATA"; i: number }
  | { t: "H_BENTUK"; teks: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalJumlahK5B3B = (): StateJumlahK5B3B => ({
  sama: { data: 0, atasOk: false },
  beda: { data: 0, k: 0 },
  hasil: { data: 0 },
  pernah: [],
  pesan: "",
});

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const dataSama = (x: StateJumlahK5B3B): Pasang => DATA_SAMA[x.sama.data];
export const dataBeda = (x: StateJumlahK5B3B): Pasang => DATA_BEDA[x.beda.data];
export const dataHasil = (x: StateJumlahK5B3B): Hasil => DATA_HASIL[x.hasil.data];

function pilihAtasSama(x: StateJumlahK5B3B, n: number): StateJumlahK5B3B {
  const { a, b } = dataSama(x);
  if (!opsiAtasSama(x.sama.data).includes(n)) return x;
  if (n === a.p + b.p) {
    return { ...x, sama: { ...x.sama, atasOk: true }, pesan: `✅ Benar, ${a.p} bagian ditambah ${b.p} bagian menjadi ${n} bagian terarsir. Sekarang tentukan penyebutnya.` };
  }
  if (n === a.p * b.p) return { ...x, sama: { ...x.sama, atasOk: false }, pesan: "Pembilang tidak dikalikan. Arsiran digabung pada satu batang, jadi bagian terarsirnya dijumlahkan." };
  return { ...x, sama: { ...x.sama, atasOk: false }, pesan: `Belum. Hitung semua bagian yang terarsir, yaitu ${a.p} bagian dan ${b.p} bagian digabung.` };
}

function pilihBawahSama(x: StateJumlahK5B3B, n: number): StateJumlahK5B3B {
  const { a, b } = dataSama(x);
  if (!x.sama.atasOk) return { ...x, pesan: "Tentukan dulu pembilangnya." };
  if (!opsiBawahSama(x.sama.data).includes(n)) return x;
  if (n === a.q) {
    const hasil = a.p + b.p;
    return {
      ...x,
      pernah: catat(x.pernah, `sama:${x.sama.data}`),
      pesan: `✅ Tepat! ${teksPec(a)} + ${teksPec(b)} = ${hasil}/${a.q}. Penyebut tetap ${a.q}, sebab semua bagian sama besar. Hanya pembilangnya yang dijumlahkan.`,
    };
  }
  if (n === a.q + b.q) return { ...x, pesan: `Penyebut tidak dijumlahkan. Potongan tetap sama besar, jadi tetap per ${a.q}.` };
  return { ...x, pesan: `Belum. Bagian pada kedua batang sama besar, yaitu per ${a.q}. Penyebutnya tidak berubah.` };
}

function pilihKpk(x: StateJumlahK5B3B, n: number): StateJumlahK5B3B {
  const { a, b } = dataBeda(x);
  if (!opsiKpk(x.beda.data).includes(n)) return x;
  const k = kpk(a.q, b.q);
  if (n === k) {
    return {
      ...x,
      beda: { ...x.beda, k },
      pesan: `✅ KPK dari ${a.q} dan ${b.q} adalah ${k}. ${teksPec(a)} menjadi ${ubahKe(a, k)}/${k}, dan ${teksPec(b)} menjadi ${ubahKe(b, k)}/${k}. Penyebut sudah sama, sekarang jumlahkan pembilangnya.`,
    };
  }
  const alasan = !bersama(a.q, b.q, n) ? `${n} bukan kelipatan dari kedua penyebut.` : `${n} memang kelipatan keduanya, tetapi bukan yang terkecil.`;
  return { ...x, beda: { ...x.beda, k: 0 }, pesan: `${alasan} KPK adalah kelipatan persekutuan terkecil dari ${a.q} dan ${b.q}.` };
}

function pilihAtasBeda(x: StateJumlahK5B3B, n: number): StateJumlahK5B3B {
  const { a, b } = dataBeda(x);
  const k = x.beda.k;
  if (k === 0) return { ...x, pesan: "Cari dulu KPK penyebutnya." };
  if (!opsiAtasBeda(x.beda.data).includes(n)) return x;
  const ap = ubahKe(a, k);
  const bp = ubahKe(b, k);
  if (n === ap + bp) {
    const lagi = fpb(n, k) > 1 ? " Hasilnya masih bisa disederhanakan, coba di tampilan Hasil." : "";
    return {
      ...x,
      pernah: catat(x.pernah, `beda:${x.beda.data}`),
      pesan: `✅ Tepat! ${teksPec(a)} + ${teksPec(b)} = ${ap}/${k} + ${bp}/${k} = ${n}/${k}.${lagi}`,
    };
  }
  if (n === a.p + b.p) return { ...x, pesan: `Menjumlahkan pembilang aslinya belum cukup. Pakai pembilang setelah penyebut disamakan: ${ap} dan ${bp}.` };
  return { ...x, pesan: `Belum. Jumlahkan pembilang setelah penyebut sama: ${ap} dan ${bp}.` };
}

function pilihBentuk(x: StateJumlahK5B3B, teks: string): StateJumlahK5B3B {
  const i = x.hasil.data;
  const d = DATA_HASIL[i];
  const h = hasilData(i);
  if (!opsiBentuk(i).includes(teks)) return x;
  if (teks === bentukBenar(i)) {
    if (d.jenis === "sederhana") {
      const g = fpb(h.p, h.q);
      return { ...x, pernah: catat(x.pernah, `hasil:${i}`), pesan: `✅ Tepat! ${teksPec(h)} dibagi ${g} pada pembilang dan penyebut menjadi ${teks}. Bentuk ini tidak bisa disederhanakan lagi.` };
    }
    const c = campuranDari(h);
    return { ...x, pernah: catat(x.pernah, `hasil:${i}`), pesan: `✅ Tepat! ${teksPec(h)} berisi ${c.b} bulat penuh dan ${c.p} bagian lagi, ditulis ${teks}.` };
  }
  if (d.jenis === "sederhana") {
    const g = fpb(h.p, h.q);
    const s = pembagiSebagian(g);
    if (s > 0 && teks === `${h.p / s}/${h.q / s}`) return { ...x, pesan: "Itu masih bisa disederhanakan lagi. Bagi dengan bilangan terbesar yang membagi keduanya." };
    return { ...x, pesan: "Pembilang dan penyebut harus dibagi dengan bilangan yang sama, supaya nilainya tidak berubah." };
  }
  return { ...x, pesan: `Belum. Bulatnya adalah banyak penyebut utuh dalam ${teksPec(h)}, dan sisanya tetap per ${h.q}.` };
}

export function langkahJumlahK5B3B(x: StateJumlahK5B3B, a: AksiJumlahK5B3B): StateJumlahK5B3B {
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
      return sah(a.i, DATA_HASIL.length) ? { ...x, hasil: { data: a.i }, pesan: "" } : x;
    case "H_BENTUK":
      return pilihBentuk(x, a.teks);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalJumlahK5B3B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanJumlahK5B3B = { alat: "jumlah"; pernah: string[] };
export const keadaanJumlahK5B3B = (x: StateJumlahK5B3B): KeadaanJumlahK5B3B => ({ alat: "jumlah", pernah: x.pernah });

export const ucapSamaK5B3B = (x: StateJumlahK5B3B): string => {
  const { a, b } = dataSama(x);
  const sekarang = x.sama.atasOk ? "Pembilangnya sudah benar. Tentukan penyebutnya." : "Tentukan dulu pembilangnya.";
  return `Jumlahkan ${teksPec(a)} dan ${teksPec(b)}. Kedua batang punya bagian sama besar. ${sekarang}`;
};
export const ucapBedaK5B3B = (x: StateJumlahK5B3B): string => {
  const { a, b } = dataBeda(x);
  const sekarang = x.beda.k === 0 ? "Cari dulu KPK penyebutnya." : `KPK dari kedua penyebut adalah ${x.beda.k}. Sekarang jumlahkan pembilangnya.`;
  return `Jumlahkan ${teksPec(a)} dan ${teksPec(b)}. Penyebutnya berbeda. ${sekarang}`;
};
export const ucapHasilK5B3B = (x: StateJumlahK5B3B): string => {
  const h = hasilData(x.hasil.data);
  const tugas = dataHasil(x).jenis === "sederhana" ? "Tulis bentuk paling sederhana." : "Ubah menjadi pecahan campuran.";
  return `Hasil penjumlahan adalah ${teksPec(h)}. ${tugas}`;
};
