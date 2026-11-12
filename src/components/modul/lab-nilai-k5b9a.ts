/**
 * Lab Nilai Tempat (Kelas 5 Bab 9, Sub-Bab A: Membaca, Menulis, dan Nilai Tempat sampai 1.000.000): logika murni.
 * Satu alat, tiga tampilan.
 *  Baca  : bilangan dibaca dari kiri, kelompok ribuan dulu lalu kelompok satuan (Indonesian Number-Name Mapping).
 *  Tabel : bilangan dalam kata ditulis ke enam kolom tempat, nol tetap ditulis (Place Value Chart Protocol);
 *          tabel teman yang salah isi kolomnya ditunjuk.
 *  Nilai : nilai sebuah angka = angka dikali nilai tempatnya (Digit-Place Value Link); 999.999 + 1 = satu juta.
 * Tidak membahas membandingkan, mengurutkan, menyusun, atau menguraikan bilangan (itu Sub-Bab B dan C).
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b9.mjs.
 */

export const BANYAK_KOLOM = 6;
export const NAMA_TEMPAT = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"] as const;
export const NILAI_TEMPAT = [100000, 10000, 1000, 100, 10, 1] as const;

export type BilanganA = {
  nama: string;
  n: number;
  /** Kolom yang ditanyakan nilainya (angka tidak nol dan tidak satu). */
  kolomNilai: number;
  /** Tabel teman yang salah: dua kolom bertetangga tertukar, atau satu kolom berganti angka. */
  salah: { jenis: "tukar"; k: number } | { jenis: "ganti"; k: number; angka: number };
};

export const BILANGAN_A: BilanganA[] = [
  { nama: "harga lemari", n: 979875, kolomNilai: 0, salah: { jenis: "tukar", k: 0 } },
  { nama: "penduduk kecamatan", n: 720736, kolomNilai: 1, salah: { jenis: "ganti", k: 4, angka: 8 } },
  { nama: "harga sepeda motor", n: 500040, kolomNilai: 4, salah: { jenis: "tukar", k: 3 } },
  { nama: "harga televisi", n: 408906, kolomNilai: 2, salah: { jenis: "tukar", k: 1 } },
  { nama: "jumlah penonton", n: 250015, kolomNilai: 1, salah: { jenis: "ganti", k: 0, angka: 5 } },
  { nama: "harga laptop", n: 860209, kolomNilai: 3, salah: { jenis: "tukar", k: 3 } },
];

export const idBaca = (i: number): string => `baca:${i}`;
export const idTabel = (i: number): string => `tabel:${i}`;
export const idSalah = (i: number): string => `salah:${i}`;
export const idNilai = (i: number): string => `nilai:${i}`;
export const ID_JUTA = "juta";

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

const SATU = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
function duaDigit(n: number): string {
  if (n < 10) return SATU[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATU[n - 10]} belas`;
  return n % 10 === 0 ? `${SATU[n / 10]} puluh` : `${SATU[Math.floor(n / 10)]} puluh ${SATU[n % 10]}`;
}
/** Kata untuk satu kelompok tiga digit (1 sampai 999). */
export function kataKelompok(n: number): string {
  if (n < 100) return duaDigit(n);
  const r = Math.floor(n / 100);
  const depan = r === 1 ? "seratus" : `${SATU[r]} ratus`;
  return n % 100 === 0 ? depan : `${depan} ${duaDigit(n % 100)}`;
}
/** Bilangan dengan titik pemisah ribuan, misalnya 979.875. */
export const titikRibuan = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Enam digit dari bilangan sampai 999.999, kiri ke kanan. */
export const digitEnam = (n: number): number[] => String(n).padStart(BANYAK_KOLOM, "0").split("").map(Number);
export const dariDigit = (d: readonly number[]): number => Number(d.join(""));
export const kelompokKiri = (n: number): number => Math.floor(n / 1000);
export const kelompokKanan = (n: number): number => n % 1000;
/** Bacaan lengkap sampai 999.999. */
export const bacaLengkap = (n: number): string => {
  const a = kelompokKiri(n);
  const b = kelompokKanan(n);
  const kiri = a === 0 ? "" : a === 1 ? "seribu" : `${kataKelompok(a)} ribu`;
  const kanan = b === 0 ? "" : kataKelompok(b);
  return [kiri, kanan].filter(Boolean).join(" ");
};

/** Pengecoh satu kelompok: tukar dua digit, hasil berbeda dari asli dan satu sama lain. */
export function pengecohKelompok(v: number): number[] {
  const s = String(v).padStart(3, "0").split("");
  const hasil: number[] = [];
  for (const [p, q] of [[0, 1], [1, 2], [0, 2]]) {
    const t = [...s];
    [t[p], t[q]] = [t[q], t[p]];
    const w = Number(t.join(""));
    if (w !== v && w !== 0 && !hasil.includes(w)) hasil.push(w);
  }
  return hasil.slice(0, 2);
}

const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];

export type PilihBaca = { opsi: [string, string, string]; benar: number };
/** Tiga pilihan bacaan kelompok kiri (dengan kata "ribu"). */
export function opsiKiri(i: number): PilihBaca {
  const v = kelompokKiri(BILANGAN_A[i].n);
  const dasar = [v, ...pengecohKelompok(v)].map((w) => `${kataKelompok(w)} ribu`) as [string, string, string];
  const hasil = putar3(dasar, i);
  return { opsi: hasil, benar: hasil.indexOf(dasar[0]) };
}
/** Tiga pilihan bacaan kelompok kanan. */
export function opsiKanan(i: number): PilihBaca {
  const v = kelompokKanan(BILANGAN_A[i].n);
  const dasar = [v, ...pengecohKelompok(v)].map((w) => kataKelompok(w)) as [string, string, string];
  const hasil = putar3(dasar, i + 1);
  return { opsi: hasil, benar: hasil.indexOf(dasar[0]) };
}

/** Tabel teman: digit salah. */
export function digitSalah(i: number): number[] {
  const b = BILANGAN_A[i];
  const d = digitEnam(b.n);
  if (b.salah.jenis === "tukar") {
    const k = b.salah.k;
    [d[k], d[k + 1]] = [d[k + 1], d[k]];
  } else {
    d[b.salah.k] = b.salah.angka;
  }
  return d;
}
/** Kolom yang isinya berbeda dari yang benar. */
export const kolomBeda = (a: readonly number[], b: readonly number[]): number[] => a.flatMap((v, k) => (v !== b[k] ? [k] : []));

export type PilihNilai = { opsi: [number, number, number]; benar: number };
/** Tiga pilihan nilai angka pada kolom yang ditanyakan. */
export function opsiNilai(i: number): PilihNilai {
  const b = BILANGAN_A[i];
  const k = b.kolomNilai;
  const d = digitEnam(b.n)[k];
  const p = NILAI_TEMPAT[k];
  const benar = d * p;
  const lain: number[] = [];
  for (const c of [d, p, d * (p / 10 >= 1 ? p / 10 : p * 10), d * p * 10]) if (c !== benar && !lain.includes(c) && lain.length < 2) lain.push(c);
  const dasar: [number, number, number] = [benar, lain[0], lain[1]];
  const hasil = putar3(dasar, i);
  return { opsi: hasil, benar: hasil.indexOf(benar) };
}
/** Pilihan nama tempat untuk kolom yang ditanyakan. */
export function opsiTempat(i: number): { opsi: [string, string, string]; benar: number } {
  const k = BILANGAN_A[i].kolomNilai;
  const lain = [k - 1, k + 1, k - 2, k + 2].filter((v) => v >= 0 && v < BANYAK_KOLOM).slice(0, 2);
  const dasar: [string, string, string] = [NAMA_TEMPAT[k], NAMA_TEMPAT[lain[0]], NAMA_TEMPAT[lain[1]]];
  const hasil = putar3(dasar, i);
  return { opsi: hasil, benar: hasil.indexOf(NAMA_TEMPAT[k]) };
}
/** Tiga pilihan bacaan untuk 999.999 + 1. */
export const OPSI_JUTA: [string, string, string] = ["seratus ribu", "satu juta", "sepuluh juta"];
export const BENAR_JUTA = 1;

/* ------------------------------ Keadaan ------------------------------ */

export type StateNilaiK5B9A = {
  baca: { data: number; kiri: boolean };
  tabel: { data: number; d: number[]; tunjuk: number[] };
  nilai: { data: number; tempat: boolean; tambah: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiNilaiK5B9A =
  | { t: "B_DATA"; i: number }
  | { t: "B_KIRI"; o: number }
  | { t: "B_KANAN"; o: number }
  | { t: "T_DATA"; i: number }
  | { t: "T_UBAH"; k: number; delta: number }
  | { t: "T_PERIKSA" }
  | { t: "T_TUNJUK"; k: number }
  | { t: "N_DATA"; i: number }
  | { t: "N_TEMPAT"; o: number }
  | { t: "N_NILAI"; o: number }
  | { t: "N_TAMBAH" }
  | { t: "N_JUTA"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const kosong = (): number[] => [-1, -1, -1, -1, -1, -1];

export const awalNilaiK5B9A = (): StateNilaiK5B9A => ({
  baca: { data: 0, kiri: false },
  tabel: { data: 0, d: kosong(), tunjuk: [] },
  nilai: { data: 0, tempat: false, tambah: false },
  pernah: [],
  pesan: "",
});

export const bilBaca = (x: StateNilaiK5B9A): BilanganA => BILANGAN_A[x.baca.data];
export const bilTabel = (x: StateNilaiK5B9A): BilanganA => BILANGAN_A[x.tabel.data];
export const bilNilai = (x: StateNilaiK5B9A): BilanganA => BILANGAN_A[x.nilai.data];

function pilihKiri(x: StateNilaiK5B9A, o: number): StateNilaiK5B9A {
  if (!sah(o, 3)) return x;
  const i = x.baca.data;
  const p = opsiKiri(i);
  if (o === p.benar) return { ...x, baca: { ...x.baca, kiri: true }, pesan: `✅ Kelompok kiri dibaca ${p.opsi[o]}. Sekarang baca kelompok di kanan titik.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Baca tiga angka di kiri titik dari kiri ke kanan: ratusan, puluhan, lalu satuannya, kemudian ucapkan "ribu".` };
}

function pilihKanan(x: StateNilaiK5B9A, o: number): StateNilaiK5B9A {
  if (!sah(o, 3)) return x;
  const i = x.baca.data;
  if (!x.baca.kiri) return { ...x, pesan: "Baca dari kiri dulu: kelompok sebelum titik, lalu kelompok sesudah titik." };
  const p = opsiKanan(i);
  const b = BILANGAN_A[i];
  if (o === p.benar) return { ...x, pernah: catat(x.pernah, idBaca(i)), pesan: `✅ ${titikRibuan(b.n)} dibaca ${bacaLengkap(b.n)}.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Nol tidak diucapkan, dan tiap angka dibaca menurut tempatnya.` };
}

function ubahDigit(x: StateNilaiK5B9A, k: number, delta: number): StateNilaiK5B9A {
  if (!sah(k, BANYAK_KOLOM) || (delta !== 1 && delta !== -1)) return x;
  const d = x.tabel.d.map((v, j) => (j !== k ? v : v === -1 ? (delta > 0 ? 0 : 9) : (v + delta + 10) % 10));
  return { ...x, tabel: { ...x.tabel, d }, pesan: "" };
}

function periksaTabel(x: StateNilaiK5B9A): StateNilaiK5B9A {
  const i = x.tabel.data;
  const b = BILANGAN_A[i];
  const benar = digitEnam(b.n);
  if (x.tabel.d.some((v) => v < 0)) return { ...x, pesan: "Masih ada kolom kosong. Kolom yang tidak bernilai diisi 0, jangan dibiarkan kosong." };
  const beda = kolomBeda(x.tabel.d, benar);
  if (beda.length === 0) {
    return { ...x, pernah: catat(x.pernah, idTabel(i)), pesan: `✅ Tabel benar. Dibaca ulang: ${bacaLengkap(b.n)}, ditulis ${titikRibuan(b.n)}. Nol tetap ditulis supaya angka lain tidak bergeser.` };
  }
  const d = x.tabel.d;
  if (beda.length === 2 && beda[1] === beda[0] + 1 && d[beda[0]] === benar[beda[1]] && d[beda[1]] === benar[beda[0]]) {
    return { ...x, pesan: `Kolom ${NAMA_TEMPAT[beda[0]]} dan ${NAMA_TEMPAT[beda[1]]} tertukar. Baca lagi kata bilangannya dari kiri.` };
  }
  return { ...x, pesan: `Kolom ${NAMA_TEMPAT[beda[0]]} belum tepat. Baca lagi kata bilangannya dari kiri, lalu isi tiap kolom.` };
}

function tunjukSalah(x: StateNilaiK5B9A, k: number): StateNilaiK5B9A {
  if (!sah(k, BANYAK_KOLOM)) return x;
  const i = x.tabel.data;
  if (!x.pernah.includes(idTabel(i))) return { ...x, pesan: "Isi dan periksa tabelmu dulu, baru cari kesalahan tabel temanmu." };
  const b = BILANGAN_A[i];
  const beda = kolomBeda(digitSalah(i), digitEnam(b.n));
  if (!beda.includes(k)) return { ...x, pesan: `Kolom ${NAMA_TEMPAT[k]} milik temanmu sudah benar. Cocokkan tiap kolom dengan kata bilangannya.` };
  const tunjuk = x.tabel.tunjuk.includes(k) ? x.tabel.tunjuk : [...x.tabel.tunjuk, k];
  if (beda.every((v) => tunjuk.includes(v))) {
    return { ...x, tabel: { ...x.tabel, tunjuk }, pernah: catat(x.pernah, idSalah(i)), pesan: `✅ Semua kolom yang salah sudah ketemu: ${beda.map((v) => NAMA_TEMPAT[v]).join(" dan ")}. Yang benar adalah ${titikRibuan(b.n)}.` };
  }
  return { ...x, tabel: { ...x.tabel, tunjuk }, pesan: `Kolom ${NAMA_TEMPAT[k]} memang salah, tetapi masih ada satu kolom lain yang salah. Cari lagi.` };
}

function pilihTempat(x: StateNilaiK5B9A, o: number): StateNilaiK5B9A {
  if (!sah(o, 3)) return x;
  const i = x.nilai.data;
  const p = opsiTempat(i);
  if (o === p.benar) return { ...x, nilai: { ...x.nilai, tempat: true }, pesan: `✅ Angka itu ada di tempat ${p.opsi[o]}. Sekarang tentukan nilainya.` };
  return { ...x, pesan: `Bukan ${p.opsi[o]}. Hitung kolom dari kanan: satuan, puluhan, ratusan, ribuan, puluh ribuan, ratus ribuan.` };
}

function pilihNilai(x: StateNilaiK5B9A, o: number): StateNilaiK5B9A {
  if (!sah(o, 3)) return x;
  const i = x.nilai.data;
  if (!x.nilai.tempat) return { ...x, pesan: "Tentukan dulu tempat angka itu, baru nilainya." };
  const p = opsiNilai(i);
  const b = BILANGAN_A[i];
  const k = b.kolomNilai;
  const d = digitEnam(b.n)[k];
  if (o === p.benar) {
    return { ...x, pernah: catat(x.pernah, idNilai(i)), pesan: `✅ Nilai angka ${d} di tempat ${NAMA_TEMPAT[k]} adalah ${d} × ${titikRibuan(NILAI_TEMPAT[k])} = ${titikRibuan(d * NILAI_TEMPAT[k])}.` };
  }
  return { ...x, pesan: `${titikRibuan(p.opsi[o])} belum tepat. Nilai angka adalah angkanya dikali nilai tempatnya.` };
}

function tambahSatu(x: StateNilaiK5B9A): StateNilaiK5B9A {
  return { ...x, nilai: { ...x.nilai, tambah: true }, pesan: "✅ 999.999 + 1 = 1.000.000. Semua kolom jadi nol dan muncul 1 di kolom jutaan." };
}

function pilihJuta(x: StateNilaiK5B9A, o: number): StateNilaiK5B9A {
  if (!sah(o, 3)) return x;
  if (!x.nilai.tambah) return { ...x, pesan: "Tekan dulu tombol tambah satu pada 999.999." };
  if (o === BENAR_JUTA) return { ...x, pernah: catat(x.pernah, ID_JUTA), pesan: "✅ 1.000.000 dibaca satu juta, yaitu angka 1 di kolom jutaan diikuti enam nol. Itu batas bilangan bab ini." };
  return { ...x, pesan: `${OPSI_JUTA[o]} belum tepat. Hitung jumlah nolnya: ada enam nol di belakang angka 1.` };
}

export function langkahNilaiK5B9A(x: StateNilaiK5B9A, a: AksiNilaiK5B9A): StateNilaiK5B9A {
  switch (a.t) {
    case "B_DATA":
      return sah(a.i, BILANGAN_A.length) ? { ...x, baca: { data: a.i, kiri: false }, pesan: "" } : x;
    case "B_KIRI":
      return pilihKiri(x, a.o);
    case "B_KANAN":
      return pilihKanan(x, a.o);
    case "T_DATA":
      return sah(a.i, BILANGAN_A.length) ? { ...x, tabel: { data: a.i, d: kosong(), tunjuk: [] }, pesan: "" } : x;
    case "T_UBAH":
      return ubahDigit(x, a.k, a.delta);
    case "T_PERIKSA":
      return periksaTabel(x);
    case "T_TUNJUK":
      return tunjukSalah(x, a.k);
    case "N_DATA":
      return sah(a.i, BILANGAN_A.length) ? { ...x, nilai: { ...x.nilai, data: a.i, tempat: false }, pesan: "" } : x;
    case "N_TEMPAT":
      return pilihTempat(x, a.o);
    case "N_NILAI":
      return pilihNilai(x, a.o);
    case "N_TAMBAH":
      return tambahSatu(x);
    case "N_JUTA":
      return pilihJuta(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalNilaiK5B9A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanNilaiK5B9A = { alat: "nilai"; pernah: string[] };
export const keadaanNilaiK5B9A = (x: StateNilaiK5B9A): KeadaanNilaiK5B9A => ({ alat: "nilai", pernah: x.pernah });

export const ucapBacaK5B9A = (x: StateNilaiK5B9A): string => {
  const b = bilBaca(x);
  return `Bilangan ${b.nama}: ${titikRibuan(b.n)}. Baca dari kiri. Pilih bacaan kelompok sebelum titik, lalu kelompok sesudah titik. Nol tidak diucapkan.`;
};
export const ucapTabelK5B9A = (x: StateNilaiK5B9A): string => {
  const b = bilTabel(x);
  return `Tulis bilangan ${bacaLengkap(b.n)} ke tabel tempat. Ada enam kolom: ratus ribuan, puluh ribuan, ribuan, ratusan, puluhan, dan satuan. Tiap angka mengisi satu kolom, dan nol tetap ditulis.`;
};
export const ucapNilaiK5B9A = (x: StateNilaiK5B9A): string => {
  const b = bilNilai(x);
  return `Bilangan ${b.nama}: ${titikRibuan(b.n)}. Tentukan tempat angka yang ditandai, lalu nilainya. Nilai angka adalah angka dikali nilai tempatnya.`;
};
