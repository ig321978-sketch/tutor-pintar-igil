/**
 * Lab Rasio (Kelas 6 Bab 2, Sub-Bab A: Konsep Rasio): logika murni. Satu alat, tiga tampilan.
 *  Tulis     : hitung dua kelompok benda sejenis, tulis rasionya a : b, lalu baca "setiap a ada b" (Part-to-Part Ratio Language).
 *  Sederhana : cari pembagi yang membagi habis kedua suku, lalu bagi kiri dan kanan (GCF Simplify Ratio).
 *  Arah      : a : b dan b : a berbeda makna, urutan mengikuti kata "terhadap" (Ordered-Ratio Protocol).
 * Tidak membahas tabel rasio, rasio senilai, harga atau waktu per satuan, dan bagian terhadap keseluruhan (itu Sub-Bab B dan C).
 * Semua hitungan memakai bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b2.mjs.
 */

export type SoalTulis = { nama: string; a: number; b: number; ka: string; kb: string };
export type SoalSederhana = { nama: string; a: number; b: number };
export type SoalArah = { nama: string; a: number; b: number; ka: string; kb: string };

/** a benda jenis ka dan b benda jenis kb. Rasio ka terhadap kb ditulis a : b. */
export const SOAL_TULIS: SoalTulis[] = [
  { nama: "lahan bibit", a: 4, b: 6, ka: "pucuk merah", kb: "cemara" },
  { nama: "kebun kecil", a: 2, b: 3, ka: "pucuk merah", kb: "cemara" },
  { nama: "rak buah", a: 3, b: 5, ka: "mangga", kb: "jambu" },
  { nama: "pot bunga", a: 5, b: 2, ka: "mawar", kb: "melati" },
  { nama: "kolam ikan", a: 7, b: 4, ka: "ikan mas", kb: "ikan nila" },
  { nama: "meja makan", a: 3, b: 6, ka: "sendok", kb: "garpu" },
];

/** a : b disederhanakan dengan pembagi terbesar kedua suku. */
export const SOAL_SEDERHANA: SoalSederhana[] = [
  { nama: "bibit pohon", a: 4, b: 6 },
  { nama: "buah segar", a: 6, b: 9 },
  { nama: "tali rafia", a: 10, b: 15 },
  { nama: "kelereng", a: 12, b: 8 },
  { nama: "buku cerita", a: 9, b: 12 },
  { nama: "kertas warna", a: 8, b: 20 },
];

/** ka terhadap kb ditulis a : b, kb terhadap ka ditulis b : a. */
export const SOAL_ARAH: SoalArah[] = [
  { nama: "pucuk dan cemara", a: 2, b: 3, ka: "pucuk merah", kb: "cemara" },
  { nama: "mangga dan jambu", a: 3, b: 5, ka: "mangga", kb: "jambu" },
  { nama: "mawar dan melati", a: 5, b: 2, ka: "mawar", kb: "melati" },
  { nama: "ikan mas dan nila", a: 7, b: 4, ka: "ikan mas", kb: "ikan nila" },
  { nama: "sendok dan garpu", a: 3, b: 6, ka: "sendok", kb: "garpu" },
  { nama: "kucing dan kelinci", a: 1, b: 4, ka: "kucing", kb: "kelinci" },
];

export const idTulis = (i: number): string => `tulis:${i}`;
export const idSederhana = (i: number): string => `sederhana:${i}`;
export const idArah = (i: number): string => `arah:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export const teksRasio = (a: number, b: number): string => `${a} : ${b}`;
/** Rasio paling sederhana sebagai teks, misalnya 4 : 6 menjadi "2 : 3". */
export const rasioSederhana = (a: number, b: number): string => {
  const g = gcd(a, b);
  return teksRasio(a / g, b / g);
};
/** a : b sudah paling sederhana bila pembagi terbesarnya 1. */
export const sudahSederhana = (a: number, b: number): boolean => gcd(a, b) === 1;

const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];
export type Pilih3<T> = { opsi: [T, T, T]; benar: number };
function susun3<T>(dasar: [T, T, T], r: number): Pilih3<T> {
  const opsi = putar3(dasar, r);
  return { opsi, benar: opsi.indexOf(dasar[0]) };
}

/** Rasio yang ditulis. Pengecoh: urutan terbalik, dan jumlah kedua benda (bukan perbandingan). */
export const opsiRasioTulis = (i: number): Pilih3<string> => {
  const s = SOAL_TULIS[i];
  return susun3([teksRasio(s.a, s.b), teksRasio(s.b, s.a), String(s.a + s.b)], i);
};
/** Kalimat bacaan. Pengecoh: angka tertukar, dan jenis benda tertukar. */
export const opsiKalimatTulis = (i: number): Pilih3<string> => {
  const s = SOAL_TULIS[i];
  return susun3(
    [`Setiap ${s.a} ${s.ka} ada ${s.b} ${s.kb}`, `Setiap ${s.b} ${s.ka} ada ${s.a} ${s.kb}`, `Setiap ${s.a} ${s.kb} ada ${s.b} ${s.ka}`],
    i + 1,
  );
};

/** Pembagi. Pengecoh: dua kali pembagi terbesar, dan satu lebihnya (keduanya tidak membagi habis kedua suku). */
export const opsiPembagi = (i: number): Pilih3<number> => {
  const s = SOAL_SEDERHANA[i];
  const g = gcd(s.a, s.b);
  return susun3([g, g * 2, g + 1], i);
};
/** Suku kiri hasil. Pengecoh: suku kiri tidak dibagi, dan suku kanan hasil. */
export const opsiKiri = (i: number): Pilih3<number> => {
  const s = SOAL_SEDERHANA[i];
  const g = gcd(s.a, s.b);
  return susun3([s.a / g, s.a, s.b / g], i + 1);
};
/** Suku kanan hasil. Pengecoh: suku kanan tidak dibagi, dan suku kiri hasil. */
export const opsiKanan = (i: number): Pilih3<number> => {
  const s = SOAL_SEDERHANA[i];
  const g = gcd(s.a, s.b);
  return susun3([s.b / g, s.b, s.a / g], i + 2);
};

/** Rasio pertama pada Arah: ka terhadap kb. Pengecoh: urutan terbalik, dan jumlah. */
export const opsiPertama = (i: number): Pilih3<string> => {
  const s = SOAL_ARAH[i];
  return susun3([teksRasio(s.a, s.b), teksRasio(s.b, s.a), String(s.a + s.b)], i);
};
/** Rasio kedua pada Arah: kb terhadap ka. Pengecoh: urutan yang sama dengan pertama, dan jumlah. */
export const opsiBalik = (i: number): Pilih3<string> => {
  const s = SOAL_ARAH[i];
  return susun3([teksRasio(s.b, s.a), teksRasio(s.a, s.b), String(s.a + s.b)], i + 1);
};
export const JAWAB_BEDA = "Tidak sama, urutan menentukan makna";
export const opsiBeda = (i: number): Pilih3<string> => susun3([JAWAB_BEDA, "Sama saja, hanya ditulis terbalik", "Sama, karena angkanya itu-itu juga"], i + 2);

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Sederhana: 0 pembagi, 1 suku kiri, 2 suku kanan, 3 selesai. Tahap Arah: 0 pertama, 1 balik, 2 beda, 3 selesai. */
export type StateRasioK6B2A = {
  tulis: { data: number; na: number; nb: number; rasio: boolean; selesai: boolean };
  sederhana: { data: number; tahap: number };
  arah: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiRasioK6B2A =
  | { t: "T_DATA"; i: number }
  | { t: "T_TAMBAH_A" }
  | { t: "T_TAMBAH_B" }
  | { t: "T_RASIO"; o: number }
  | { t: "T_KALIMAT"; o: number }
  | { t: "S_DATA"; i: number }
  | { t: "S_PEMBAGI"; o: number }
  | { t: "S_KIRI"; o: number }
  | { t: "S_KANAN"; o: number }
  | { t: "R_DATA"; i: number }
  | { t: "R_PERTAMA"; o: number }
  | { t: "R_BALIK"; o: number }
  | { t: "R_BEDA"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalRasioK6B2A = (): StateRasioK6B2A => ({
  tulis: { data: 0, na: 0, nb: 0, rasio: false, selesai: false },
  sederhana: { data: 0, tahap: 0 },
  arah: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalTulis = (x: StateRasioK6B2A): SoalTulis => SOAL_TULIS[x.tulis.data];
export const soalSederhana = (x: StateRasioK6B2A): SoalSederhana => SOAL_SEDERHANA[x.sederhana.data];
export const soalArah = (x: StateRasioK6B2A): SoalArah => SOAL_ARAH[x.arah.data];

/* ------------------------------ Tulis ------------------------------ */

function tambahBenda(x: StateRasioK6B2A, sisi: "a" | "b"): StateRasioK6B2A {
  const s = soalTulis(x);
  if (x.tulis.selesai || x.tulis.rasio) return x;
  const n = sisi === "a" ? x.tulis.na : x.tulis.nb;
  const target = sisi === "a" ? s.a : s.b;
  const nama = sisi === "a" ? s.ka : s.kb;
  if (n >= target) return { ...x, pesan: `✅ ${nama} sudah lengkap, yaitu ${target}.${x.tulis.na === s.a && x.tulis.nb === s.b ? " Sekarang tulis rasionya." : " Lengkapi jenis yang satunya."}` };
  const n2 = n + 1;
  const tulis = sisi === "a" ? { ...x.tulis, na: n2 } : { ...x.tulis, nb: n2 };
  const lengkap = tulis.na === s.a && tulis.nb === s.b;
  const pesan = lengkap
    ? `✅ Ada ${s.a} ${s.ka} dan ${s.b} ${s.kb}. Sekarang tulis rasio ${s.ka} terhadap ${s.kb}.`
    : n2 === target
      ? `✅ ${nama} sudah lengkap, yaitu ${target}. Lengkapi jenis yang satunya.`
      : `✅ ${nama} sekarang ${n2}.`;
  return { ...x, tulis, pesan };
}

function pilihRasioTulis(x: StateRasioK6B2A, o: number): StateRasioK6B2A {
  if (!sah(o, 3) || x.tulis.selesai || x.tulis.rasio) return x;
  const i = x.tulis.data;
  const s = SOAL_TULIS[i];
  if (x.tulis.na < s.a || x.tulis.nb < s.b) return { ...x, pesan: `Hitung dulu semua bendanya: ${s.a} ${s.ka} dan ${s.b} ${s.kb}. Ketuk tombol tambah.` };
  const p = opsiRasioTulis(i);
  if (o === p.benar) return { ...x, tulis: { ...x.tulis, rasio: true }, pesan: `✅ Rasio ${s.ka} terhadap ${s.kb} ditulis ${teksRasio(s.a, s.b)}. Sekarang pilih kalimat bacaannya.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Rasio membandingkan dua jenis benda yang sama jenisnya, dan ${s.ka} disebut lebih dulu, jadi ditulis di kiri.` };
}

function pilihKalimatTulis(x: StateRasioK6B2A, o: number): StateRasioK6B2A {
  if (!sah(o, 3) || x.tulis.selesai) return x;
  const i = x.tulis.data;
  const s = SOAL_TULIS[i];
  if (!x.tulis.rasio) return { ...x, pesan: "Tulis dulu rasionya, yaitu angka pertama dan kedua dipisah titik dua." };
  const p = opsiKalimatTulis(i);
  if (o === p.benar) {
    return {
      ...x,
      tulis: { ...x.tulis, selesai: true },
      pernah: catat(x.pernah, idTulis(i)),
      pesan: `✅ ${teksRasio(s.a, s.b)} dibaca ${s.a} banding ${s.b}: setiap ${s.a} ${s.ka} ada ${s.b} ${s.kb}.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Angka kiri untuk ${s.ka} dan angka kanan untuk ${s.kb}, sesuai urutan penulisannya.` };
}

/* ------------------------------ Sederhana ------------------------------ */

function pilihPembagi(x: StateRasioK6B2A, o: number): StateRasioK6B2A {
  if (!sah(o, 3) || x.sederhana.tahap !== 0) return x;
  const i = x.sederhana.data;
  const s = SOAL_SEDERHANA[i];
  const p = opsiPembagi(i);
  if (o === p.benar) return { ...x, sederhana: { ...x.sederhana, tahap: 1 }, pesan: `✅ ${p.opsi[o]} membagi habis ${s.a} dan ${s.b}, dan tidak ada pembagi bersama yang lebih besar. Sekarang bagi suku kiri.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Pembagi harus membagi habis ${s.a} dan juga ${s.b}, dan dipilih yang terbesar.` };
}

function pilihKiri(x: StateRasioK6B2A, o: number): StateRasioK6B2A {
  if (!sah(o, 3) || x.sederhana.tahap > 1) return x;
  const i = x.sederhana.data;
  const s = SOAL_SEDERHANA[i];
  if (x.sederhana.tahap < 1) return { ...x, pesan: "Tentukan dulu pembagi yang membagi habis kedua suku." };
  const g = gcd(s.a, s.b);
  const p = opsiKiri(i);
  if (o === p.benar) return { ...x, sederhana: { ...x.sederhana, tahap: 2 }, pesan: `✅ ${s.a} dibagi ${g} sama dengan ${s.a / g}. Sekarang bagi suku kanan dengan pembagi yang sama.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Bagi suku kiri, yaitu ${s.a}, dengan ${g}.` };
}

function pilihKanan(x: StateRasioK6B2A, o: number): StateRasioK6B2A {
  if (!sah(o, 3) || x.sederhana.tahap > 2) return x;
  const i = x.sederhana.data;
  const s = SOAL_SEDERHANA[i];
  if (x.sederhana.tahap < 2) return { ...x, pesan: "Selesaikan dulu pembagian suku kiri." };
  const g = gcd(s.a, s.b);
  const p = opsiKanan(i);
  if (o === p.benar) {
    return {
      ...x,
      sederhana: { ...x.sederhana, tahap: 3 },
      pernah: catat(x.pernah, idSederhana(i)),
      pesan: `✅ ${teksRasio(s.a, s.b)} = ${teksRasio(s.a / g, s.b / g)}, setelah kedua suku dibagi ${g}. Bagi kedua suku, jangan hanya satu.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Suku kanan, yaitu ${s.b}, juga dibagi ${g}.` };
}

/* ------------------------------ Arah ------------------------------ */

function pilihPertama(x: StateRasioK6B2A, o: number): StateRasioK6B2A {
  if (!sah(o, 3) || x.arah.tahap !== 0) return x;
  const i = x.arah.data;
  const s = SOAL_ARAH[i];
  const p = opsiPertama(i);
  if (o === p.benar) return { ...x, arah: { ...x.arah, tahap: 1 }, pesan: `✅ ${s.ka} terhadap ${s.kb} ditulis ${teksRasio(s.a, s.b)}: kiri untuk ${s.ka}, kanan untuk ${s.kb}. Sekarang balik urutannya.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Benda yang disebut lebih dulu setelah kata banding ditulis di kiri.` };
}

function pilihBalik(x: StateRasioK6B2A, o: number): StateRasioK6B2A {
  if (!sah(o, 3) || x.arah.tahap > 1) return x;
  const i = x.arah.data;
  const s = SOAL_ARAH[i];
  if (x.arah.tahap < 1) return { ...x, pesan: "Tulis dulu rasio yang pertama." };
  const p = opsiBalik(i);
  if (o === p.benar) return { ...x, arah: { ...x.arah, tahap: 2 }, pesan: `✅ ${s.kb} terhadap ${s.ka} ditulis ${teksRasio(s.b, s.a)}. Angkanya sama, urutannya terbalik. Apakah maknanya sama?` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Sekarang ${s.kb} disebut lebih dulu, jadi angka ${s.kb} ada di kiri.` };
}

function pilihBeda(x: StateRasioK6B2A, o: number): StateRasioK6B2A {
  if (!sah(o, 3) || x.arah.tahap > 2) return x;
  const i = x.arah.data;
  const s = SOAL_ARAH[i];
  if (x.arah.tahap < 2) return { ...x, pesan: "Selesaikan dulu kedua penulisan rasionya." };
  const p = opsiBeda(i);
  if (o === p.benar) {
    return {
      ...x,
      arah: { ...x.arah, tahap: 3 },
      pernah: catat(x.pernah, idArah(i)),
      pesan: `✅ ${teksRasio(s.a, s.b)} berarti setiap ${s.a} ${s.ka} ada ${s.b} ${s.kb}, sedangkan ${teksRasio(s.b, s.a)} berarti setiap ${s.b} ${s.kb} ada ${s.a} ${s.ka}. Maknanya berbeda.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Bacalah kedua rasio dengan kalimat setiap … ada …, lalu bandingkan maknanya.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahRasioK6B2A(x: StateRasioK6B2A, a: AksiRasioK6B2A): StateRasioK6B2A {
  switch (a.t) {
    case "T_DATA":
      return sah(a.i, SOAL_TULIS.length) ? { ...x, tulis: { data: a.i, na: 0, nb: 0, rasio: false, selesai: false }, pesan: "" } : x;
    case "T_TAMBAH_A":
      return tambahBenda(x, "a");
    case "T_TAMBAH_B":
      return tambahBenda(x, "b");
    case "T_RASIO":
      return pilihRasioTulis(x, a.o);
    case "T_KALIMAT":
      return pilihKalimatTulis(x, a.o);
    case "S_DATA":
      return sah(a.i, SOAL_SEDERHANA.length) ? { ...x, sederhana: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "S_PEMBAGI":
      return pilihPembagi(x, a.o);
    case "S_KIRI":
      return pilihKiri(x, a.o);
    case "S_KANAN":
      return pilihKanan(x, a.o);
    case "R_DATA":
      return sah(a.i, SOAL_ARAH.length) ? { ...x, arah: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "R_PERTAMA":
      return pilihPertama(x, a.o);
    case "R_BALIK":
      return pilihBalik(x, a.o);
    case "R_BEDA":
      return pilihBeda(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalRasioK6B2A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanRasioK6B2A = { alat: "rasio"; pernah: string[] };
export const keadaanRasioK6B2A = (x: StateRasioK6B2A): KeadaanRasioK6B2A => ({ alat: "rasio", pernah: x.pernah });

export const ucapTulisK6B2A = (x: StateRasioK6B2A): string => {
  const s = soalTulis(x);
  return `Soal ${s.nama}: ada ${s.a} ${s.ka} dan ${s.b} ${s.kb}. Ketuk tombol tambah sampai jumlah tiap jenis cocok, tulis rasio ${s.ka} terhadap ${s.kb}, lalu pilih kalimat bacaannya.`;
};
export const ucapSederhanaK6B2A = (x: StateRasioK6B2A): string => {
  const s = soalSederhana(x);
  return `Soal ${s.nama}: rasio ${s.a} : ${s.b}. Cari pembagi yang membagi habis kedua suku, lalu bagi suku kiri dan suku kanan.`;
};
export const ucapArahK6B2A = (x: StateRasioK6B2A): string => {
  const s = soalArah(x);
  return `Soal ${s.nama}: ada ${s.a} ${s.ka} dan ${s.b} ${s.kb}. Tulis rasio ${s.ka} terhadap ${s.kb}, lalu balik urutannya dan periksa apakah maknanya sama.`;
};
