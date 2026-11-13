/**
 * Lab Kali Pecahan (Kelas 6 Bab 1, Sub-Bab A: Perkalian Pecahan): logika murni. Satu alat, tiga tampilan.
 *  Luas  : ember menyiram sejumlah kotak pada petak berisi n kotak sama besar; ember ditambah satu per satu,
 *          kotak terarsir dihitung, penyebut tetap (Area Model Multiplication).
 *  Panah : bilangan asli ditulis a/1 (kotak merah), panah lurus mengalikan atas dengan atas dan bawah dengan bawah,
 *          hasil disederhanakan bila bisa (Whole-as-Fraction + Straight-Arrow Multiply).
 *  Tukar : pecahan kali bilangan asli, lalu urutan dibalik dan hasilnya dicek sama (Commutative Multiply Check).
 * Tidak membahas pembagian, kebalikan, atau bilangan desimal (itu Sub-Bab B dan C).
 * Semua hitungan memakai bilangan bulat (pecahan sebagai pembilang dan penyebut).
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b1.mjs.
 */

export type SoalLuas = { nama: string; k: number; m: number; n: number };
export type SoalPanah = { nama: string; w: number; m: number; n: number };
export type SoalTukar = { nama: string; a: number; c: number; b: number };

/** k ember, tiap ember menyiram m kotak dari petak berisi n kotak sama besar: k × m/n. */
export const SOAL_LUAS: SoalLuas[] = [
  { nama: "ember kebun Agam", k: 2, m: 3, n: 5 },
  { nama: "ember penuh", k: 5, m: 3, n: 5 },
  { nama: "gelas sirup", k: 4, m: 2, n: 5 },
  { nama: "petak sawah", k: 2, m: 3, n: 4 },
  { nama: "ember sepertiga", k: 3, m: 1, n: 3 },
  { nama: "botol minum", k: 3, m: 2, n: 7 },
];

/** w × m/n dengan panah lurus. */
export const SOAL_PANAH: SoalPanah[] = [
  { nama: "ember kebun", w: 2, m: 3, n: 5 },
  { nama: "gelas liter", w: 4, m: 2, n: 5 },
  { nama: "sepertiga", w: 3, m: 1, n: 3 },
  { nama: "ember penuh", w: 5, m: 3, n: 5 },
  { nama: "petak sawah", w: 2, m: 3, n: 4 },
  { nama: "botol minum", w: 3, m: 2, n: 7 },
];

/** a/c × b, lalu b × a/c. Hasilnya selalu bilangan bulat. */
export const SOAL_TUKAR: SoalTukar[] = [
  { nama: "kebun manalagi", a: 2, c: 3, b: 15 },
  { nama: "kotak kue", a: 1, c: 4, b: 20 },
  { nama: "kain batik", a: 2, c: 5, b: 10 },
  { nama: "pita hadiah", a: 3, c: 4, b: 8 },
  { nama: "tali jemuran", a: 1, c: 3, b: 12 },
  { nama: "kertas lipat", a: 3, c: 5, b: 20 },
];

export const idLuas = (i: number): string => `luas:${i}`;
export const idPanah = (i: number): string => `panah:${i}`;
export const idTukar = (i: number): string => `tukar:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
/** Pecahan sebagai teks; penyebut 1 ditulis sebagai bilangan utuh. */
export const teksPecahan = (p: number, q: number): string => (q === 1 ? String(p) : `${p}/${q}`);
/** Bentuk sederhana pecahan p/q sebagai teks. */
export const sederhanaTeks = (p: number, q: number): string => {
  const g = gcd(p, q);
  return teksPecahan(p / g, q / g);
};
/** p/q sampai bentuk sederhana, misalnya "15/5 = 3" atau "6/4 = 3/2" atau "6/5". */
export const bentukHasil = (p: number, q: number): string => {
  const s = sederhanaTeks(p, q);
  return s === `${p}/${q}` ? s : `${p}/${q} = ${s}`;
};
export const bisaSederhana = (p: number, q: number): boolean => gcd(p, q) > 1;

const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];
export type Pilih3<T> = { opsi: [T, T, T]; benar: number };
function susun3<T>(dasar: [T, T, T], r: number): Pilih3<T> {
  const opsi = putar3(dasar, r);
  return { opsi, benar: opsi.indexOf(dasar[0]) };
}

/** Pembilang hasil pada Luas: semua kotak terarsir. Pengecoh: ember dijumlah dengan kotak, dan kotak satu ember saja. */
export const opsiPembLuas = (i: number): Pilih3<number> => {
  const s = SOAL_LUAS[i];
  return susun3([s.k * s.m, s.k + s.m, s.m], i);
};
/** Penyebut hasil pada Luas: ukuran kotak tidak berubah. Pengecoh: penyebut ikut dikali, dan dijumlah. */
export const opsiPenyLuas = (i: number): Pilih3<number> => {
  const s = SOAL_LUAS[i];
  return susun3([s.n, s.k * s.n, s.n + s.k], i + 1);
};

/** Bilangan asli sebagai pecahan. Pengecoh: pembilang dan penyebut tertukar, dan penyebut sama dengan pembilang. */
export const opsiAsli = (i: number): Pilih3<string> => {
  const w = SOAL_PANAH[i].w;
  return susun3([`${w}/1`, `1/${w}`, `${w}/${w}`], i);
};
export const opsiAtas = (i: number): Pilih3<number> => {
  const s = SOAL_PANAH[i];
  return susun3([s.w * s.m, s.w + s.m, s.m], i + 1);
};
export const opsiBawah = (i: number): Pilih3<number> => {
  const s = SOAL_PANAH[i];
  return susun3([1 * s.n, s.n + 1, s.w * s.n], i + 2);
};
/** Bentuk paling sederhana. Bulat: pengecoh pembilang saja, dan penyebut saja (atau satu lebihnya bila sama). */
export function opsiRapi(p: number, q: number, r: number): Pilih3<string> {
  const g = gcd(p, q);
  const a = p / g;
  const b = q / g;
  if (b === 1) {
    const lain = q !== p ? String(q) : String(a + 1);
    return susun3([String(a), String(p), lain], r);
  }
  return susun3([`${a}/${b}`, `${a}/${q}`, `${p}/${b}`], r);
}
export const opsiRapiPanah = (i: number): Pilih3<string> => {
  const s = SOAL_PANAH[i];
  return opsiRapi(s.w * s.m, s.n, i);
};

export const hasilTukar = (i: number): number => (SOAL_TUKAR[i].a * SOAL_TUKAR[i].b) / SOAL_TUKAR[i].c;
/** Hasil kali atas pada Tukar. Pengecoh: pembilang dijumlah, dan penyebut ikut dikali. */
export const opsiKaliTukar = (i: number): Pilih3<number> => {
  const s = SOAL_TUKAR[i];
  return susun3([s.a * s.b, s.a + s.b, s.c * s.b], i);
};
/** Pecahan p/c sama dengan berapa utuh. Pengecoh: pembilang saja, penyebut saja. */
export const opsiRapiTukar = (i: number): Pilih3<string> => {
  const s = SOAL_TUKAR[i];
  return opsiRapi(s.a * s.b, s.c, i + 1);
};
/** Urutan dibalik: sama atau beda. Pengecoh: pembilang saja, penyebut saja. */
export const opsiCekTukar = (i: number): Pilih3<string> => {
  const s = SOAL_TUKAR[i];
  const r = hasilTukar(i);
  return susun3([`Sama, yaitu ${r}`, `Beda, yaitu ${s.a * s.b}`, `Beda, yaitu ${s.c}`], i + 2);
};

/** Keterangan hasil Luas: lebih dari, tepat, atau kurang dari satu petak. */
export function keteranganLuas(p: number, q: number): string {
  if (p % q === 0) return `yaitu ${p / q} petak penuh`;
  return p > q ? "yaitu lebih dari satu petak" : "yaitu kurang dari satu petak";
}

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Panah: 0 asli, 1 atas, 2 bawah, 3 sederhana, 4 selesai. Tahap Tukar: 0 kali, 1 sederhana, 2 cek, 3 selesai. */
export type StateKaliK6B1A = {
  luas: { data: number; ember: number; pemb: boolean; selesai: boolean };
  panah: { data: number; tahap: number };
  tukar: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiKaliK6B1A =
  | { t: "L_DATA"; i: number }
  | { t: "L_TAMBAH" }
  | { t: "L_PEMB"; o: number }
  | { t: "L_PENY"; o: number }
  | { t: "P_DATA"; i: number }
  | { t: "P_ASLI"; o: number }
  | { t: "P_ATAS"; o: number }
  | { t: "P_BAWAH"; o: number }
  | { t: "P_RAPI"; o: number }
  | { t: "T_DATA"; i: number }
  | { t: "T_KALI"; o: number }
  | { t: "T_RAPI"; o: number }
  | { t: "T_CEK"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalKaliK6B1A = (): StateKaliK6B1A => ({
  luas: { data: 0, ember: 0, pemb: false, selesai: false },
  panah: { data: 0, tahap: 0 },
  tukar: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalLuas = (x: StateKaliK6B1A): SoalLuas => SOAL_LUAS[x.luas.data];
export const soalPanah = (x: StateKaliK6B1A): SoalPanah => SOAL_PANAH[x.panah.data];
export const soalTukar = (x: StateKaliK6B1A): SoalTukar => SOAL_TUKAR[x.tukar.data];

/* ------------------------------ Luas ------------------------------ */

function tambahEmber(x: StateKaliK6B1A): StateKaliK6B1A {
  const s = soalLuas(x);
  const e = x.luas.ember;
  if (x.luas.selesai) return x;
  if (e >= s.k) return { ...x, pesan: `✅ Soal ini memakai ${s.k} ember. Sekarang tentukan pembilang dan penyebut hasilnya.` };
  const e2 = e + 1;
  const pesan =
    e2 === s.k
      ? `✅ Semua ${s.k} ember sudah dipakai: ${s.k} × ${s.m} = ${s.k * s.m} kotak terarsir pada petak berisi ${s.n} kotak. Sekarang tentukan pembilangnya.`
      : `✅ Ember ke-${e2} menyiram ${s.m} kotak lagi, sehingga terarsir ${e2 * s.m} kotak.`;
  return { ...x, luas: { ...x.luas, ember: e2 }, pesan };
}

function pilihPembLuas(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.luas.selesai || x.luas.pemb) return x;
  const i = x.luas.data;
  const s = SOAL_LUAS[i];
  if (x.luas.ember < s.k) return { ...x, pesan: `Tambahkan dulu ember sampai ada ${s.k} ember, baru hitung semua kotak terarsir.` };
  const p = opsiPembLuas(i);
  if (o === p.benar) return { ...x, luas: { ...x.luas, pemb: true }, pesan: `✅ Ada ${p.opsi[o]} kotak terarsir. Sekarang tentukan penyebutnya: satu petak berisi berapa kotak sama besar?` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Tiap ember mengisi ${s.m} kotak dan ada ${s.k} ember, jadi hitung seluruh kotak yang terarsir.` };
}

function pilihPenyLuas(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.luas.selesai) return x;
  const i = x.luas.data;
  const s = SOAL_LUAS[i];
  if (!x.luas.pemb) return { ...x, pesan: "Tentukan dulu pembilangnya, yaitu banyak kotak terarsir." };
  const p = opsiPenyLuas(i);
  if (o === p.benar) {
    const hasil = s.k * s.m;
    return {
      ...x,
      luas: { ...x.luas, selesai: true },
      pernah: catat(x.pernah, idLuas(i)),
      pesan: `✅ ${s.k} × ${s.m}/${s.n} = ${bentukHasil(hasil, s.n)}, ${keteranganLuas(hasil, s.n)}. Ukuran satu kotak tidak berubah, jadi penyebutnya tetap ${s.n}.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Kotak yang diarsir tetap sama besar dengan kotak semula, jadi penyebut tidak berubah ukurannya.` };
}

/* ------------------------------ Panah ------------------------------ */

function pilihAsli(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.panah.tahap !== 0) return x;
  const i = x.panah.data;
  const p = opsiAsli(i);
  if (o === p.benar) return { ...x, panah: { ...x.panah, tahap: 1 }, pesan: `✅ ${SOAL_PANAH[i].w} ditulis ${p.opsi[o]}, kotak merah pada bilangan asli. Sekarang panah lurus: atas dikali atas.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Bilangan asli ditulis sebagai pecahan dengan penyebut 1.` };
}

function pilihAtas(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.panah.tahap > 1) return x;
  const i = x.panah.data;
  const s = SOAL_PANAH[i];
  if (x.panah.tahap < 1) return { ...x, pesan: "Tulis dulu bilangan asli sebagai pecahan berpenyebut 1." };
  const p = opsiAtas(i);
  if (o === p.benar) return { ...x, panah: { ...x.panah, tahap: 2 }, pesan: `✅ Atas dikali atas: ${s.w} × ${s.m} = ${s.w * s.m}. Sekarang bawah dikali bawah.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Panah lurus mengalikan pembilang dengan pembilang: ${s.w} dikali ${s.m}.` };
}

function selesaiPanah(x: StateKaliK6B1A, i: number, pesan: string): StateKaliK6B1A {
  return { ...x, panah: { ...x.panah, tahap: 4 }, pernah: catat(x.pernah, idPanah(i)), pesan };
}

function pilihBawah(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.panah.tahap > 2) return x;
  const i = x.panah.data;
  const s = SOAL_PANAH[i];
  if (x.panah.tahap < 2) return { ...x, pesan: "Selesaikan langkah sebelumnya dulu: tulis a/1, lalu atas dikali atas." };
  const p = opsiBawah(i);
  if (o !== p.benar) return { ...x, pesan: `${p.opsi[o]} belum tepat. Panah lurus mengalikan penyebut dengan penyebut: 1 dikali ${s.n}.` };
  const atas = s.w * s.m;
  const kalimat = `${s.w}/1 × ${s.m}/${s.n} = (${s.w}×${s.m})/(1×${s.n}) = ${atas}/${s.n}`;
  if (bisaSederhana(atas, s.n)) return { ...x, panah: { ...x.panah, tahap: 3 }, pesan: `✅ ${kalimat}. Pecahan ini masih bisa disederhanakan.` };
  return selesaiPanah(x, i, `✅ ${kalimat}. Sudah paling sederhana.`);
}

function pilihRapiPanah(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.panah.tahap > 3) return x;
  const i = x.panah.data;
  const s = SOAL_PANAH[i];
  if (x.panah.tahap < 3) return { ...x, pesan: "Selesaikan dulu panah lurusnya sampai pembilang dan penyebut hasil ketemu." };
  const atas = s.w * s.m;
  const p = opsiRapiPanah(i);
  if (o === p.benar) return selesaiPanah(x, i, `✅ ${s.w} × ${s.m}/${s.n} = ${bentukHasil(atas, s.n)}. Pembilang dan penyebut dicoret dengan faktor yang sama.`);
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Coret faktor yang sama pada pembilang dan penyebut, dan ubah keduanya.` };
}

/* ------------------------------ Tukar ------------------------------ */

function pilihKaliTukar(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.tukar.tahap !== 0) return x;
  const i = x.tukar.data;
  const s = SOAL_TUKAR[i];
  const p = opsiKaliTukar(i);
  if (o === p.benar) return { ...x, tukar: { ...x.tukar, tahap: 1 }, pesan: `✅ ${s.a}/${s.c} × ${s.b}/1 = ${s.a * s.b}/${s.c}. Sekarang sederhanakan pecahan itu.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Tulis ${s.b} sebagai ${s.b}/1, lalu atas dikali atas: ${s.a} dikali ${s.b}.` };
}

function pilihRapiTukar(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.tukar.tahap > 1) return x;
  const i = x.tukar.data;
  const s = SOAL_TUKAR[i];
  if (x.tukar.tahap < 1) return { ...x, pesan: "Hitung dulu hasil kali pembilangnya." };
  const atas = s.a * s.b;
  const p = opsiRapiTukar(i);
  if (o === p.benar) return { ...x, tukar: { ...x.tukar, tahap: 2 }, pesan: `✅ ${bentukHasil(atas, s.c)}. Sekarang balik urutannya: ${s.b} × ${s.a}/${s.c}.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Cari bilangan yang jika dikali ${s.c} hasilnya ${atas}.` };
}

function pilihCekTukar(x: StateKaliK6B1A, o: number): StateKaliK6B1A {
  if (!sah(o, 3) || x.tukar.tahap > 2) return x;
  const i = x.tukar.data;
  const s = SOAL_TUKAR[i];
  if (x.tukar.tahap < 2) return { ...x, pesan: "Selesaikan dulu hitungan urutan pertama sampai hasil utuhnya ketemu." };
  const p = opsiCekTukar(i);
  if (o === p.benar) {
    return {
      ...x,
      tukar: { ...x.tukar, tahap: 3 },
      pernah: catat(x.pernah, idTukar(i)),
      pesan: `✅ ${s.a}/${s.c} × ${s.b} = ${s.b} × ${s.a}/${s.c} = ${hasilTukar(i)}. Urutan tidak mengubah hasil kali.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Tulis ${s.b} sebagai ${s.b}/1 lalu kalikan atas dengan atas dan bawah dengan bawah.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahKaliK6B1A(x: StateKaliK6B1A, a: AksiKaliK6B1A): StateKaliK6B1A {
  switch (a.t) {
    case "L_DATA":
      return sah(a.i, SOAL_LUAS.length) ? { ...x, luas: { data: a.i, ember: 0, pemb: false, selesai: false }, pesan: "" } : x;
    case "L_TAMBAH":
      return tambahEmber(x);
    case "L_PEMB":
      return pilihPembLuas(x, a.o);
    case "L_PENY":
      return pilihPenyLuas(x, a.o);
    case "P_DATA":
      return sah(a.i, SOAL_PANAH.length) ? { ...x, panah: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "P_ASLI":
      return pilihAsli(x, a.o);
    case "P_ATAS":
      return pilihAtas(x, a.o);
    case "P_BAWAH":
      return pilihBawah(x, a.o);
    case "P_RAPI":
      return pilihRapiPanah(x, a.o);
    case "T_DATA":
      return sah(a.i, SOAL_TUKAR.length) ? { ...x, tukar: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "T_KALI":
      return pilihKaliTukar(x, a.o);
    case "T_RAPI":
      return pilihRapiTukar(x, a.o);
    case "T_CEK":
      return pilihCekTukar(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalKaliK6B1A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanKaliK6B1A = { alat: "kali"; pernah: string[] };
export const keadaanKaliK6B1A = (x: StateKaliK6B1A): KeadaanKaliK6B1A => ({ alat: "kali", pernah: x.pernah });

export const ucapLuasK6B1A = (x: StateKaliK6B1A): string => {
  const s = soalLuas(x);
  return `Soal ${s.nama}: ${s.k} × ${s.m}/${s.n}. Satu petak berisi ${s.n} kotak sama besar, tiap ember mengisi ${s.m} kotak. Tambah ember satu per satu, hitung semua kotak terarsir, lalu tentukan pembilang dan penyebut hasilnya.`;
};
export const ucapPanahK6B1A = (x: StateKaliK6B1A): string => {
  const s = soalPanah(x);
  return `Soal ${s.nama}: ${s.w} × ${s.m}/${s.n}. Tulis ${s.w} sebagai pecahan berpenyebut satu, lalu panah lurus: atas dikali atas dan bawah dikali bawah. Sederhanakan bila bisa.`;
};
export const ucapTukarK6B1A = (x: StateKaliK6B1A): string => {
  const s = soalTukar(x);
  return `Soal ${s.nama}: ${s.a}/${s.c} × ${s.b}. Hitung dengan panah lurus, sederhanakan, lalu balik urutannya dan cek apakah hasilnya sama.`;
};
