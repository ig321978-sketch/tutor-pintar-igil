/**
 * Lab Nilai Tempat (Kelas 5 Bab 1, Sub-Bab A): logika murni. Satu alat, tiga tampilan.
 *  Tulis : tabel enam tempat (ratus ribuan sampai satuan). Anak menaikkan atau menurunkan digit tiap kolom untuk
 *          menulis bilangan yang disebut dengan kata. Lab membaca bilangan anak (dihitung dari digit kolom) dan
 *          menolak bilangan di atas 100.000.
 *  Baca  : bilangan bertitik ribuan. Anak memilih bacaannya. Pengecoh dihitung: digit dibaca satu per satu, dan
 *          bacaan bilangan yang dua digitnya bertukar tempat.
 *  Nilai : anak mengetuk satu digit, memilih tempatnya, lalu memilih nilainya. Kunci dan pengecoh (digit saja,
 *          nilai di tempat tetangga) dihitung dari bilangan.
 * Data dari Buku Siswa Kelas V Bab 1 (sama dengan data-k5b1.ts, dicocokkan di uji). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b1.mjs.
 */

export const TEMPAT = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"] as const;
export type NamaTempat = (typeof TEMPAT)[number];
export const BOBOT = [100000, 10000, 1000, 100, 10, 1];
export const MAKS = 100000;

/* ------------------------------ Kata dan lambang ------------------------------ */

const ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
function sebutDua(n: number): string {
  if (n < 10) return ANGKA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${ANGKA[n - 10]} belas`;
  return n % 10 === 0 ? `${ANGKA[Math.floor(n / 10)]} puluh` : `${ANGKA[Math.floor(n / 10)]} puluh ${ANGKA[n % 10]}`;
}
function sebutTiga(n: number): string {
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 0 ? "" : r === 1 ? "seratus" : `${ANGKA[r]} ratus`;
  if (sisa === 0) return depan;
  return depan ? `${depan} ${sebutDua(sisa)}` : sebutDua(sisa);
}
/** Bacaan bilangan 0 sampai 100.000 per periode (tiga digit dari kanan). */
export function bacaBil(n: number): string {
  if (n === 0) return "nol";
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = ribu === 0 ? "" : ribu === 1 ? "seribu" : `${sebutTiga(ribu)} ribu`;
  if (sisa === 0) return depan;
  return depan ? `${depan} ${sebutTiga(sisa)}` : sebutTiga(sisa);
}
export const titik = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));

/** Digit enam tempat dari kiri (ratus ribuan sampai satuan). */
export const digitEnam = (n: number): number[] => BOBOT.map((b) => Math.floor(n / b) % 10);
export const dariDigit = (d: number[]): number => d.reduce((a, v, i) => a + v * BOBOT[i], 0);
/** Digit yang ditulis (tanpa nol di depan) dan tempatnya. */
export const digitTulis = (n: number): { d: number; tempat: NamaTempat; bobot: number }[] => {
  const semua = digitEnam(n).map((d, i) => ({ d, tempat: TEMPAT[i], bobot: BOBOT[i] }));
  const awal = semua.findIndex((v) => v.d !== 0);
  return awal < 0 ? semua.slice(-1) : semua.slice(awal);
};

/* ------------------------------ Data buku ------------------------------ */

export type DataBil = { n: number; ket: string };
/** Tulis: bilangan yang disebut dengan kata. */
export const DATA_TULIS: DataBil[] = [
  { n: 14500, ket: "Tulisan Yohana" },
  { n: 40350, ket: "Nol penjaga" },
  { n: 88976, ket: "Kartu angka" },
  { n: 100000, ket: "Enam tempat" },
];
/** Baca: bilangan bertitik. */
export const DATA_BACA: DataBil[] = [
  { n: 26932, ket: "Penduduk desa" },
  { n: 20040, ket: "Nol di tengah" },
  { n: 66500, ket: "Obat" },
];
/** Nilai: bilangan yang digitnya diperiksa. */
export const DATA_NILAI: DataBil[] = [
  { n: 87986, ket: "Bilangan pertama" },
  { n: 40350, ket: "Bilangan kedua" },
  { n: 14500, ket: "Bilangan ketiga" },
];

/* ------------------------------ Baca: pilihan ------------------------------ */

/** Digit dibaca satu per satu (kesalahan umum). */
export const bacaDigit = (n: number): string => String(n).split("").map((c) => ANGKA[Number(c)]).join(" ");
/** Bilangan dengan dua digit bertukar tempat: ribuan dengan ratusan, bila sama maka ratusan dengan puluhan. */
export function tukarDigit(n: number): number {
  const d = digitEnam(n);
  const pasang: [number, number][] = [[2, 3], [3, 4], [1, 2], [4, 5]];
  for (const [i, j] of pasang) {
    if (d[i] !== d[j]) {
      const e = [...d];
      [e[i], e[j]] = [e[j], e[i]];
      return dariDigit(e);
    }
  }
  return n;
}
const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
export const opsiBaca = (i: number): string[] => {
  const n = DATA_BACA[i].n;
  return putar([bacaBil(n), bacaDigit(n), bacaBil(tukarDigit(n))], i);
};

/* ------------------------------ Nilai: pilihan ------------------------------ */

/** Pilihan nilai untuk digit ke-j (dari kiri, di antara digit yang ditulis). Kunci pertama sebelum diputar. */
export function opsiNilai(n: number, j: number): number[] {
  const v = digitTulis(n)[j];
  const benar = v.d * v.bobot;
  const calon = [v.d, v.d * v.bobot * 10, v.d * v.bobot / 10, v.bobot, v.bobot * 10].filter((c) => Number.isInteger(c) && c <= MAKS && c !== benar);
  const dua = [...new Set(calon)].slice(0, 2);
  return putar([benar, ...dua], j);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateTempatK5B1A = {
  tulis: { data: number; digit: number[] };
  baca: { data: number };
  nilai: { data: number; pilih: number | null; tempatOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiTempatK5B1A =
  | { t: "T_DATA"; i: number }
  | { t: "T_NAIK"; k: number }
  | { t: "T_TURUN"; k: number }
  | { t: "T_ULANG" }
  | { t: "T_CEK" }
  | { t: "B_DATA"; i: number }
  | { t: "B_JAWAB"; nilai: string }
  | { t: "N_DATA"; i: number }
  | { t: "N_DIGIT"; j: number }
  | { t: "N_TEMPAT"; tempat: string }
  | { t: "N_NILAI"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const nol = (): number[] => TEMPAT.map(() => 0);

export const awalTempatK5B1A = (): StateTempatK5B1A => ({
  tulis: { data: 0, digit: nol() },
  baca: { data: 0 },
  nilai: { data: 0, pilih: null, tempatOk: false },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const nilaiTulis = (x: StateTempatK5B1A): number => dariDigit(x.tulis.digit);
export const targetTulis = (x: StateTempatK5B1A): number => DATA_TULIS[x.tulis.data].n;
export const bilBaca = (x: StateTempatK5B1A): number => DATA_BACA[x.baca.data].n;
export const bilNilai = (x: StateTempatK5B1A): number => DATA_NILAI[x.nilai.data].n;

/** v sama dengan t yang satu atau lebih nolnya dibuang (digit lain tetap berurutan). */
export function nolHilang(v: number, t: number): boolean {
  const a = String(v);
  const b = String(t);
  if (a.length >= b.length) return false;
  let i = 0;
  for (const c of b) {
    if (i < a.length && a[i] === c) i += 1;
    else if (c !== "0") return false;
  }
  return i === a.length;
}

function cekTulis(x: StateTempatK5B1A): StateTempatK5B1A {
  const v = nilaiTulis(x);
  const t = targetTulis(x);
  if (v === t) return { ...x, pernah: tambah(x.pernah, `tulis:${t}`), pesan: `✅ Tepat! ${titik(t)} dibaca ${bacaBil(t)}.` };
  if (v === 0) return { ...x, pesan: "Tabel masih kosong. Naikkan digit di kolom yang sesuai, lalu periksa." };
  if (nolHilang(v, t)) return { ...x, pesan: `Bilanganmu ${titik(v)}. Ada nol yang hilang. Nol menjaga tempat agar digit tidak bergeser.` };
  const dv = digitEnam(v);
  const dt = digitEnam(t);
  const beda = TEMPAT.find((_, i) => dv[i] !== dt[i]) as NamaTempat;
  return { ...x, pesan: `Bilanganmu ${titik(v)}, dibaca ${bacaBil(v)}. Itu belum sama. Periksa lagi kolom ${beda}.` };
}

function jawabBaca(x: StateTempatK5B1A, nilai: string): StateTempatK5B1A {
  const i = x.baca.data;
  const n = DATA_BACA[i].n;
  if (!opsiBaca(i).includes(nilai)) return x;
  if (nilai === bacaBil(n)) return { ...x, pernah: tambah(x.pernah, `baca:${n}`), pesan: `✅ Tepat! ${titik(n)} dibaca ${bacaBil(n)}.` };
  if (nilai === bacaDigit(n))
    return {
      ...x,
      pernah: tambah(x.pernah, "baca-digit"),
      pesan: `Itu membaca digit satu per satu. Kelompokkan tiga digit dari kanan: ${Math.floor(n / 1000)} ribu, lalu ${n % 1000}.`,
    };
  return { ...x, pesan: `Itu bacaan untuk ${titik(tukarDigit(n))}. Ada dua digit yang bertukar tempat. Baca lagi kolom demi kolom.` };
}

function pilihTempat(x: StateTempatK5B1A, tempat: string): StateTempatK5B1A {
  if (!(TEMPAT as readonly string[]).includes(tempat)) return x;
  if (x.nilai.pilih === null) return { ...x, pesan: "Ketuk dulu satu digit bilangannya." };
  const v = digitTulis(bilNilai(x))[x.nilai.pilih];
  if (tempat !== v.tempat) return { ...x, nilai: { ...x.nilai, tempatOk: false }, pesan: "Belum. Hitung tempat dari kanan: satuan, puluhan, ratusan, ribuan, puluh ribuan." };
  return { ...x, nilai: { ...x.nilai, tempatOk: true }, pesan: `✅ Benar, digit ${v.d} ada di tempat ${v.tempat}. Sekarang pilih nilainya.` };
}

function pilihNilai(x: StateTempatK5B1A, nilai: number): StateTempatK5B1A {
  const n = bilNilai(x);
  const j = x.nilai.pilih;
  if (j === null) return { ...x, pesan: "Ketuk dulu satu digit bilangannya." };
  if (!opsiNilai(n, j).includes(nilai)) return x;
  if (!x.nilai.tempatOk) return { ...x, pesan: "Tentukan dulu tempat digit itu." };
  const v = digitTulis(n)[j];
  if (nilai === v.d * v.bobot) return { ...x, pernah: tambah(x.pernah, `nilai:${n}:${j}`), pesan: `✅ Tepat! Digit ${v.d} di tempat ${v.tempat} bernilai ${titik(nilai)}.` };
  if (nilai === v.d) return { ...x, pernah: tambah(x.pernah, "lupa-tempat"), pesan: `Itu digitnya saja. Ingat tempatnya: satu di ${v.tempat} bernilai ${titik(v.bobot)}.` };
  return { ...x, pesan: `${titik(nilai)} bukan nilai digit itu di tempat ${v.tempat}. Ingat: satu di ${v.tempat} bernilai ${titik(v.bobot)}.` };
}

export function langkahTempatK5B1A(x: StateTempatK5B1A, a: AksiTempatK5B1A): StateTempatK5B1A {
  switch (a.t) {
    case "T_DATA":
      return sah(a.i, DATA_TULIS.length) ? { ...x, tulis: { data: a.i, digit: nol() }, pesan: "" } : x;
    case "T_NAIK": {
      if (!sah(a.k, TEMPAT.length)) return x;
      if (x.tulis.digit[a.k] >= 9) return { ...x, pesan: `Satu kolom paling banyak sembilan. Sepuluh di kolom ${TEMPAT[a.k]} sama dengan satu di kolom kirinya.` };
      if (nilaiTulis(x) + BOBOT[a.k] > MAKS) return { ...x, pesan: "Bilangan di bab ini paling besar 100.000." };
      return { ...x, tulis: { ...x.tulis, digit: x.tulis.digit.map((v, i) => (i === a.k ? v + 1 : v)) }, pesan: "" };
    }
    case "T_TURUN":
      if (!sah(a.k, TEMPAT.length) || x.tulis.digit[a.k] === 0) return x;
      return { ...x, tulis: { ...x.tulis, digit: x.tulis.digit.map((v, i) => (i === a.k ? v - 1 : v)) }, pesan: "" };
    case "T_ULANG":
      return { ...x, tulis: { ...x.tulis, digit: nol() }, pesan: "" };
    case "T_CEK":
      return cekTulis(x);
    case "B_DATA":
      return sah(a.i, DATA_BACA.length) ? { ...x, baca: { data: a.i }, pesan: "" } : x;
    case "B_JAWAB":
      return jawabBaca(x, a.nilai);
    case "N_DATA":
      return sah(a.i, DATA_NILAI.length) ? { ...x, nilai: { data: a.i, pilih: null, tempatOk: false }, pesan: "" } : x;
    case "N_DIGIT":
      return sah(a.j, digitTulis(bilNilai(x)).length) ? { ...x, nilai: { ...x.nilai, pilih: a.j, tempatOk: false }, pesan: "" } : x;
    case "N_TEMPAT":
      return pilihTempat(x, a.tempat);
    case "N_NILAI":
      return pilihNilai(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalTempatK5B1A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanTempatK5B1A = { alat: "nilai-tempat"; pernah: string[] };
export const keadaanTempatK5B1A = (x: StateTempatK5B1A): KeadaanTempatK5B1A => ({ alat: "nilai-tempat", pernah: x.pernah });

export const ucapTulisK5B1A = (x: StateTempatK5B1A): string =>
  `Tulis bilangan ${bacaBil(targetTulis(x))} di tabel. Naikkan atau turunkan digit tiap kolom, lalu periksa. Tabel sekarang menunjukkan ${titik(nilaiTulis(x))}.`;
export const ucapBacaK5B1A = (x: StateTempatK5B1A): string =>
  `Bagaimana membaca ${titik(bilBaca(x))}? Kelompokkan tiga digit dari kanan, lalu pilih bacaannya.`;
export const ucapNilaiK5B1A = (x: StateTempatK5B1A): string => {
  const n = bilNilai(x);
  const awal = `Bilangan ${titik(n)}. Ketuk satu digit, pilih tempatnya, lalu pilih nilainya.`;
  if (x.nilai.pilih === null) return awal;
  return `${awal} Digit terpilih ${digitTulis(n)[x.nilai.pilih].d}.`;
};
