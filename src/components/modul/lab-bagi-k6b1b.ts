/**
 * Lab Bagi Pecahan (Kelas 6 Bab 1, Sub-Bab B: Pembagian Pecahan): logika murni. Satu alat, tiga tampilan.
 *  Potong : pecahan : bilangan asli. Tiap potongan dipotong lagi menjadi c bagian sama (Partition Division).
 *  Silang : pecahan : pecahan atau asli : pecahan. Pembagi dibalik, bagi menjadi kali, atas kali atas dan bawah kali bawah
 *           (Reciprocal + Cross-Arrow Divide Protocol).
 *  Muat   : bilangan asli : pecahan sebagai "berapa kali muat", hasil membesar, lalu dicek dengan perkalian (Measurement Division).
 * Memakai perkalian pecahan dari Sub-Bab A. Tidak membahas bilangan desimal (itu Sub-Bab C).
 * Semua hitungan memakai bilangan bulat (pecahan sebagai pembilang dan penyebut).
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b1.mjs.
 */

/** a/b : c */
export type SoalPotong = { nama: string; a: number; b: number; c: number };
/** a/b : p/q (bilangan asli ditulis penyebut 1) */
export type SoalSilang = { nama: string; a: number; b: number; p: number; q: number };
/** w : p/q */
export type SoalMuat = { nama: string; w: number; p: number; q: number };

export const SOAL_POTONG: SoalPotong[] = [
  { nama: "setengah liter", a: 1, b: 2, c: 3 },
  { nama: "sepertiga liter", a: 1, b: 3, c: 3 },
  { nama: "tiga perempat liter", a: 3, b: 4, c: 2 },
  { nama: "dua pertiga kilogram", a: 2, b: 3, c: 4 },
  { nama: "empat pertiga meter", a: 4, b: 3, c: 2 },
  { nama: "tiga perlima kilogram", a: 3, b: 5, c: 3 },
];

export const SOAL_SILANG: SoalSilang[] = [
  { nama: "setengah liter sirup", a: 1, b: 2, p: 3, q: 1 },
  { nama: "tiga liter sirup", a: 3, b: 1, p: 1, q: 4 },
  { nama: "enam loyang bolu", a: 6, b: 1, p: 3, q: 4 },
  { nama: "tiga kilogram gula", a: 3, b: 1, p: 2, q: 5 },
  { nama: "tiga perempat liter jus", a: 3, b: 4, p: 2, q: 1 },
  { nama: "dua pertiga kilogram tepung", a: 2, b: 3, p: 4, q: 1 },
];

export const SOAL_MUAT: SoalMuat[] = [
  { nama: "tiga liter air", w: 3, p: 1, q: 4 },
  { nama: "enam kilogram beras", w: 6, p: 3, q: 4 },
  { nama: "tiga kilogram gula pasir", w: 3, p: 2, q: 5 },
  { nama: "empat meter pita", w: 4, p: 1, q: 2 },
  { nama: "empat meter tali", w: 4, p: 2, q: 3 },
  { nama: "lima liter jus", w: 5, p: 1, q: 3 },
];

export const idPotong = (i: number): string => `potong:${i}`;
export const idSilang = (i: number): string => `silang:${i}`;
export const idMuat = (i: number): string => `muat:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export const teksPecahan = (p: number, q: number): string => (q === 1 ? String(p) : `${p}/${q}`);
export const sederhanaTeks = (p: number, q: number): string => {
  const g = gcd(p, q);
  return teksPecahan(p / g, q / g);
};
/** p/q sampai bentuk sederhana, misalnya "24/3 = 8" atau "2/12 = 1/6" atau "12/1 = 12" atau "15/2". */
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

/** Bentuk paling sederhana. Bulat: pengecoh pembilang saja dan penyebut saja (atau satu lebihnya bila sama). */
export function opsiRapi(p: number, q: number, r: number): Pilih3<string> {
  const g = gcd(p, q);
  const a = p / g;
  const b = q / g;
  if (b === 1) return susun3([String(a), String(p), String(q !== p ? q : a + 1)], r);
  return susun3([`${a}/${b}`, `${a}/${q}`, `${p}/${b}`], r);
}

/** Pembagi sebagai teks: bilangan asli bila penyebut 1. Pembagian ditulis dengan titik dua. */
export const teksBagi = (s: SoalSilang): string => `${teksPecahan(s.a, s.b)} : ${teksPecahan(s.p, s.q)}`;
export const teksMuat = (s: SoalMuat): string => `${s.w} : ${s.p}/${s.q}`;
export const teksPotong = (s: SoalPotong): string => `${s.a}/${s.b} : ${s.c}`;

/** Pembilang dan penyebut hasil. */
export const hasilPotong = (s: SoalPotong): [number, number] => [s.a, s.b * s.c];
export const hasilSilang = (s: SoalSilang): [number, number] => [s.a * s.q, s.b * s.p];
export const hasilMuat = (s: SoalMuat): [number, number] => [s.w * s.q, s.p];

/* ------------------------------ Definisi langkah ------------------------------ */

export type AlatBagi = "potong" | "silang" | "muat";
export type NamaLangkah = "peny" | "pemb" | "rapi" | "balik" | "atas" | "bawah" | "arti" | "hasil" | "cek";
export type LangkahBagi = {
  nama: NamaLangkah;
  judul: string;
  awalan: string;
  opsi: [string, string, string];
  benar: number;
  ok: string;
  salah: (o: number) => string;
};

const teks3 = (p: Pilih3<number | string>): [string, string, string] => p.opsi.map(String) as [string, string, string];
const bagiLangkah = (
  nama: NamaLangkah,
  judul: string,
  awalan: string,
  p: Pilih3<number | string>,
  ok: string,
  salah: (teks: string) => string,
): LangkahBagi => {
  const opsi = teks3(p);
  return { nama, judul, awalan, opsi, benar: p.benar, ok, salah: (o) => salah(opsi[o]) };
};

export function langkahPotong(i: number): LangkahBagi[] {
  const s = SOAL_POTONG[i];
  const [pemb, peny] = hasilPotong(s);
  const daftar = [
    bagiLangkah(
      "peny",
      `Tiap potongan dipotong lagi menjadi ${s.c} bagian sama. Berapa penyebut hasilnya?`,
      "Penyebut",
      susun3([s.b * s.c, s.b + s.c, s.b], i),
      `✅ Tiap potongan 1/${s.b} dipotong menjadi ${s.c} bagian sama, jadi potongan baru berukuran 1/${peny}. Sekarang tentukan pembilangnya.`,
      (t) => `${t} belum tepat. Potongan dipotong menjadi ${s.c} bagian sama, jadi banyak potongan dalam satu utuh dikali ${s.c}.`,
    ),
    bagiLangkah(
      "pemb",
      `Satu dari ${s.c} bagian sama berisi berapa potongan kecil? Itu pembilangnya.`,
      "Pembilang",
      susun3([s.a, s.a * s.c, s.a + s.c], i + 1),
      `✅ Satu dari ${s.c} bagian sama berisi ${pemb} potongan kecil, jadi ${teksPotong(s)} = ${pemb}/${peny}.`,
      (t) => `${t} belum tepat. Satu bagian dari ${s.c} bagian sama berisi sebanyak pembilang semula.`,
    ),
  ];
  if (bisaSederhana(pemb, peny)) {
    daftar.push(
      bagiLangkah(
        "rapi",
        "Sederhanakan pecahan hasilnya.",
        "Bentuk sederhana",
        opsiRapi(pemb, peny, i),
        `✅ ${teksPotong(s)} = ${bentukHasil(pemb, peny)}. Pembilang dan penyebut dicoret dengan faktor yang sama.`,
        (t) => `${t} belum tepat. Coret faktor yang sama pada pembilang dan penyebut, dan ubah keduanya.`,
      ),
    );
  } else {
    daftar[1] = { ...daftar[1], ok: `${daftar[1].ok} Sudah paling sederhana.` };
  }
  return daftar;
}

export function langkahSilang(i: number): LangkahBagi[] {
  const s = SOAL_SILANG[i];
  const [atas, bawah] = hasilSilang(s);
  const p = teksPecahan(s.p, s.q);
  const daftar = [
    bagiLangkah(
      "balik",
      `Pembagi ${p} dibalik. Apa kebalikannya?`,
      "Kebalikan",
      susun3([`${s.q}/${s.p}`, `${s.p}/${s.q}`, `${s.p}/${s.p}`], i),
      `✅ Kebalikan ${p} adalah ${s.q}/${s.p}. Pembagian diganti perkalian dengan kebalikan.`,
      (t) => `${t} belum tepat. Kebalikan ditulis dengan menukar pembilang dan penyebut pembagi.`,
    ),
    bagiLangkah(
      "atas",
      "Panah silang: atas dikali atas. Berapa pembilang hasilnya?",
      "Atas",
      susun3([s.a * s.q, s.a * s.p, s.a + s.q], i + 1),
      `✅ Atas dikali atas: ${s.a} × ${s.q} = ${atas}. Sekarang bawah dikali bawah.`,
      (t) => `${t} belum tepat. Setelah dibalik, kalikan pembilang dengan pembilang: ${s.a} dikali ${s.q}.`,
    ),
    bagiLangkah(
      "bawah",
      "Bawah dikali bawah. Berapa penyebut hasilnya?",
      "Bawah",
      susun3([s.b * s.p, s.b * s.q, s.b + s.q], i + 2),
      `✅ ${teksPecahan(s.a, s.b)} × ${s.q}/${s.p} = (${s.a}×${s.q})/(${s.b}×${s.p}) = ${atas}/${bawah}.`,
      (t) => `${t} belum tepat. Kalikan penyebut dengan penyebut: ${s.b} dikali ${s.p}.`,
    ),
  ];
  if (bisaSederhana(atas, bawah)) {
    daftar.push(
      bagiLangkah(
        "rapi",
        "Sederhanakan pecahan hasilnya.",
        "Bentuk sederhana",
        opsiRapi(atas, bawah, i),
        `✅ ${teksBagi(s)} = ${bentukHasil(atas, bawah)}. Pembilang dan penyebut dicoret dengan faktor yang sama.`,
        (t) => `${t} belum tepat. Coret faktor yang sama pada pembilang dan penyebut, dan ubah keduanya.`,
      ),
    );
  } else {
    daftar[2] = { ...daftar[2], ok: `${daftar[2].ok} Hasil akhir: ${teksBagi(s)} = ${bentukHasil(atas, bawah)}.` };
  }
  return daftar;
}

export function langkahMuat(i: number): LangkahBagi[] {
  const s = SOAL_MUAT[i];
  const [atas, bawah] = hasilMuat(s);
  const hasil = sederhanaTeks(atas, bawah);
  const pembagi = `${s.p}/${s.q}`;
  return [
    bagiLangkah(
      "arti",
      `Pembagi ${pembagi} lebih kecil dari satu. Hasil ${s.w} : ${pembagi} akan …`,
      "Hasil",
      susun3([`lebih besar dari ${s.w}`, `lebih kecil dari ${s.w}`, `sama dengan ${s.w}`], i),
      `✅ Hasilnya lebih besar dari ${s.w}, karena ${pembagi} lebih kecil dari satu sehingga muat lebih dari sekali pada ${s.w}.`,
      (t) => `${t} belum tepat. Pembagi ${pembagi} lebih kecil dari satu, jadi ia muat lebih dari sekali pada ${s.w}.`,
    ),
    bagiLangkah(
      "hasil",
      `Ubah menjadi ${s.w} × ${s.q}/${s.p}. Berapa hasil ${s.w} : ${pembagi}?`,
      "Hasil bagi",
      susun3([hasil, sederhanaTeks(s.w * s.p, s.q), String(s.w + s.q)], i + 1),
      `✅ ${teksMuat(s)} = ${s.w} × ${s.q}/${s.p} = ${bentukHasil(atas, bawah)}.`,
      (t) => `${t} belum tepat. Balik pembagi menjadi ${s.q}/${s.p}, lalu kalikan dengan ${s.w}.`,
    ),
    bagiLangkah(
      "cek",
      `Cek: hasil dikali ${pembagi} harus kembali ke bilangan awal. Berapa hasil kali itu?`,
      "Hasil kali",
      susun3([String(s.w), hasil, pembagi], i + 2),
      `✅ ${hasil} × ${pembagi} = ${s.w}. Hasil kali kembali ke bilangan awal, jadi hitungannya cocok.`,
      (t) => `${t} belum tepat. Kalikan hasil dengan pembagi. Hasilnya harus kembali ke bilangan awal ${s.w}.`,
    ),
  ];
}

export const daftarLangkahBagi = (alat: AlatBagi, i: number): LangkahBagi[] => (alat === "potong" ? langkahPotong(i) : alat === "silang" ? langkahSilang(i) : langkahMuat(i));
const JUMLAH_SOAL: Record<AlatBagi, number> = { potong: SOAL_POTONG.length, silang: SOAL_SILANG.length, muat: SOAL_MUAT.length };
const ID_ALAT: Record<AlatBagi, (i: number) => string> = { potong: idPotong, silang: idSilang, muat: idMuat };

/* ------------------------------ Keadaan ------------------------------ */

/** tahap = banyak langkah yang sudah benar pada soal terpilih; selesai bila sama dengan banyak langkah soal itu. */
export type StateBagiK6B1B = {
  potong: { data: number; tahap: number };
  silang: { data: number; tahap: number };
  muat: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiBagiK6B1B =
  | { t: "DATA"; alat: AlatBagi; i: number }
  | { t: "JAWAB"; alat: AlatBagi; langkah: NamaLangkah; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalBagiK6B1B = (): StateBagiK6B1B => ({
  potong: { data: 0, tahap: 0 },
  silang: { data: 0, tahap: 0 },
  muat: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const tahapSelesai = (x: StateBagiK6B1B, alat: AlatBagi): boolean => x[alat].tahap >= daftarLangkahBagi(alat, x[alat].data).length;
/** Langkah yang sedang ditanyakan, atau null bila soal sudah selesai. */
export const langkahAktifBagi = (x: StateBagiK6B1B, alat: AlatBagi): LangkahBagi | null => daftarLangkahBagi(alat, x[alat].data)[x[alat].tahap] ?? null;
/** Sudah ditempuhkah langkah bernama ini pada soal terpilih? */
export const sudahLangkah = (x: StateBagiK6B1B, alat: AlatBagi, nama: NamaLangkah): boolean => {
  const k = daftarLangkahBagi(alat, x[alat].data).findIndex((l) => l.nama === nama);
  return k >= 0 && k < x[alat].tahap;
};

function jawab(x: StateBagiK6B1B, alat: AlatBagi, nama: NamaLangkah, o: number): StateBagiK6B1B {
  if (!sah(o, 3)) return x;
  const st = x[alat];
  const daftar = daftarLangkahBagi(alat, st.data);
  const k = daftar.findIndex((l) => l.nama === nama);
  if (k < 0 || st.tahap > k) return x;
  if (st.tahap < k) return { ...x, pesan: "Selesaikan langkah sebelumnya dulu." };
  const l = daftar[k];
  if (o !== l.benar) return { ...x, pesan: l.salah(o) };
  const tahap = st.tahap + 1;
  const selesai = tahap >= daftar.length;
  return {
    ...x,
    [alat]: { ...st, tahap },
    pernah: selesai ? catat(x.pernah, ID_ALAT[alat](st.data)) : x.pernah,
    pesan: l.ok,
  };
}

export function langkahBagiK6B1B(x: StateBagiK6B1B, a: AksiBagiK6B1B): StateBagiK6B1B {
  switch (a.t) {
    case "DATA":
      if (!(a.alat in JUMLAH_SOAL) || !sah(a.i, JUMLAH_SOAL[a.alat])) return x;
      return { ...x, [a.alat]: { data: a.i, tahap: 0 }, pesan: "" };
    case "JAWAB":
      if (!(a.alat in JUMLAH_SOAL)) return x;
      return jawab(x, a.alat, a.langkah, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBagiK6B1B();
    default:
      return x;
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBagiK6B1B = { alat: "bagi"; pernah: string[] };
export const keadaanBagiK6B1B = (x: StateBagiK6B1B): KeadaanBagiK6B1B => ({ alat: "bagi", pernah: x.pernah });

export const ucapPotongK6B1B = (x: StateBagiK6B1B): string => {
  const s = SOAL_POTONG[x.potong.data];
  return `Soal ${s.nama}: ${teksPotong(s)}. Tiap potongan dipotong lagi menjadi ${s.c} bagian sama. Tentukan penyebut hasil, lalu pembilangnya, dan sederhanakan bila bisa.`;
};
export const ucapSilangK6B1B = (x: StateBagiK6B1B): string => {
  const s = SOAL_SILANG[x.silang.data];
  return `Soal ${s.nama}: ${teksBagi(s)}. Balik pembagi menjadi kebalikannya, lalu panah silang: atas dikali atas dan bawah dikali bawah. Sederhanakan bila bisa.`;
};
export const ucapMuatK6B1B = (x: StateBagiK6B1B): string => {
  const s = SOAL_MUAT[x.muat.data];
  return `Soal ${s.nama}: ${teksMuat(s)}. Berapa kali pembagi muat pada bilangan itu? Ubah menjadi perkalian dengan kebalikan, lalu cek dengan perkalian.`;
};
