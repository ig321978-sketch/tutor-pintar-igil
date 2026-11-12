/**
 * Definisi Mesin Bertahap Kelas 5 Bab 7 (Membandingkan Ciri-Ciri Bangun Datar), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK5B7. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_SEGITIGA (A): Syarat → Sudut → Sisi → Hierarki   (kasus Atap, Gapura, Pagar Candi Sewu)
 *    Syarat   : banyak pasangan sisi yang lolos uji jumlah dua sisi lebih dari sisi ketiga.
 *    Sudut    : sudut ketiga dari jumlah 180 derajat dan jenis segitiga menurut sudut.
 *    Sisi     : jenis menurut sisi (sama kaki, sama sisi, sembarang).
 *    Hierarki : golongan segitiga menurut hierarki inklusif (sama sisi juga sama kaki).
 * Data dari Buku Siswa Kelas V Bab 7 Sub-Bab A (sedotan 5, 6, 7 dan 5, 4, 12; jumlah sudut 180; hierarki segitiga).
 *  - MESIN_SEGIEMPAT (B): Sejajar → Sisi → Sudut → Hierarki   (kasus Denah, Jendela, Gapura Candi Sewu)
 *    Sejajar: pasang sisi sejajar; Sisi: ciri sisi; Sudut: banyak sudut siku-siku; Hierarki: golongan lain yang memuat bangun.
 * Data dari Buku Siswa Kelas V Bab 7 Sub-Bab B (trapesium inklusif, jajargenjang, persegi panjang, belah ketupat, layang-layang).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b7.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
/** Dua pengecoh pertama dari kandidat: bulat tak negatif, unik, bukan benar. Bila kurang, dilengkapi benar + 1, benar + 2. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 1, benar + 2]) {
    if (hasil.length < 2 && n >= 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

type Tiga = [number, number, number];
const SIKU = 90;
const JUMLAH = 180;

/* ------------------------------ A: Mesin Segitiga ------------------------------ */

/** syarat: tiga sedotan yang diuji. sudut: dua sudut segitiga lain. sisi: sisi sebuah hiasan. hier: sisi hiasan untuk golongan inklusif. */
export type KasusSegitiga = { id: string; nama: string; konteks: string; syarat: Tiga; sudut: [number, number]; sisi: Tiga; hier: Tiga };
export const KASUS_SEGITIGA: KasusSegitiga[] = [
  { id: "atap", nama: "Atap Candi", konteks: "Yohana membuat model hiasan atap Candi Sewu", syarat: [5, 6, 7], sudut: [50, 60], sisi: [6, 6, 9], hier: [8, 8, 8] },
  { id: "gapura", nama: "Gapura Candi", konteks: "Komang membuat model hiasan gapura Candi Sewu", syarat: [5, 4, 12], sudut: [90, 35], sisi: [4, 5, 7], hier: [7, 7, 4] },
  { id: "pagar", nama: "Pagar Candi", konteks: "Nisa membuat model hiasan pagar Candi Sewu", syarat: [3, 4, 7], sudut: [30, 40], sisi: [9, 9, 9], hier: [4, 5, 7] },
];

export const STASIUN_SEGITIGA: StasiunDef[] = [
  { id: "syarat", nama: "Syarat", ikon: "📏" },
  { id: "sudut", nama: "Sudut", ikon: "∠" },
  { id: "sisi", nama: "Sisi", ikon: "△" },
  { id: "hierarki", nama: "Hierarki", ikon: "⬆️" },
];

const daftar = (t: Tiga): string => `${t[0]}, ${t[1]}, dan ${t[2]}`;
/** Tiga uji: a+b lawan c, a+c lawan b, b+c lawan a. Banyak yang lolos. */
export const lolosSyarat = (t: Tiga): number => [t[0] + t[1] > t[2], t[0] + t[2] > t[1], t[1] + t[2] > t[0]].filter(Boolean).length;
/** Jenis segitiga menurut tiga sudutnya: dari sudut terbesar. */
export const jenisDariTiga = (p: number, q: number, r: number): "lancip" | "siku-siku" | "tumpul" => {
  const m = Math.max(p, q, r);
  return m > SIKU ? "tumpul" : m === SIKU ? "siku-siku" : "lancip";
};
export const jenisMenurutSudut = (p: number, q: number): "lancip" | "siku-siku" | "tumpul" => jenisDariTiga(p, q, JUMLAH - p - q);
export const kelasSisi = (t: Tiga): "sama sisi" | "sama kaki" | "sembarang" => {
  const n = (t[0] === t[1] ? 1 : 0) + (t[0] === t[2] ? 1 : 0) + (t[1] === t[2] ? 1 : 0);
  return n === 3 ? "sama sisi" : n === 1 ? "sama kaki" : "sembarang";
};
export const golongan = (t: Tiga): { benar: string; salah: string[] } => {
  const k = kelasSisi(t);
  if (k === "sama sisi") return { benar: "sama sisi, dan juga sama kaki", salah: ["sama sisi saja, bukan sama kaki", "sembarang"] };
  if (k === "sama kaki") return { benar: "sama kaki, belum tentu sama sisi", salah: ["pasti sama sisi", "sembarang"] };
  return { benar: "sembarang, bukan sama kaki", salah: ["sama kaki", "sama sisi"] };
};

export function kasusMesinSegitiga(c: KasusSegitiga, idx: number): KasusMesin {
  const lolos = lolosSyarat(c.syarat);
  const [p, q] = c.sudut;
  const r = JUMLAH - p - q;
  const jenis = jenisMenurutSudut(p, q);
  const bentukSudut = (n: number) => `${n}°, segitiga ${jenisDariTiga(p, q, n)}`;
  const benarSudut = bentukSudut(r);
  const salahSudut = [bentukSudut(p + q), bentukSudut(JUMLAH - p)].filter((o) => o !== benarSudut);
  const sisiBenar = kelasSisi(c.sisi);
  const sisiSemua = ["sama kaki", "sama sisi", "sembarang"];
  const g = golongan(c.hier);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "syarat",
      tanya: `${c.konteks}. Tiga sedotan panjangnya ${daftar(c.syarat)}. Banyak pasangan sisi yang jumlahnya lebih dari sisi ketiga adalah …`,
      opsi: susunOpsi(`${lolos} pasangan`, pengecoh(lolos, [3, 2, 1, 0]).map((v) => `${v} pasangan`), idx),
      benar: `${lolos} pasangan`,
      petunjuk: "Ada tiga uji: dua sisi pertama lawan sisi ketiga, lalu dua pasangan lainnya. Hitung hanya uji yang jumlahnya lebih dari sisi lawan, bukan yang sama atau kurang.",
    },
    {
      stasiun: "sudut",
      tanya: `Sebuah hiasan segitiga punya dua sudut, ${p}° dan ${q}°. Jumlah tiga sudut selalu ${JUMLAH}°. Sudut ketiga dan jenis segitiganya adalah …`,
      opsi: susunOpsi(benarSudut, salahSudut, idx + 1),
      benar: benarSudut,
      petunjuk: `Kurangi ${JUMLAH}° dengan kedua sudut yang diketahui, jangan dijumlahkan. Lalu lihat sudut yang paling besar: lebih dari ${SIKU}° tumpul, tepat ${SIKU}° siku-siku, kurang dari ${SIKU}° lancip.`,
    },
    {
      stasiun: "sisi",
      tanya: `Hiasan lain punya sisi ${daftar(c.sisi)}. Menurut sisinya, hiasan itu segitiga …`,
      opsi: susunOpsi(sisiBenar, sisiSemua.filter((o) => o !== sisiBenar), idx + 2),
      benar: sisiBenar,
      petunjuk: "Impitkan sisinya. Tepat dua sisi sama berarti sama kaki, tiga sisi sama berarti sama sisi, semua berbeda berarti sembarang.",
    },
    {
      stasiun: "hierarki",
      tanya: `Segitiga dengan sisi ${daftar(c.hier)} digolongkan sebagai segitiga …`,
      opsi: susunOpsi(g.benar, g.salah, idx + 3),
      benar: g.benar,
      petunjuk: "Segitiga sama sisi punya semua ciri sama kaki, jadi juga sama kaki. Tetapi segitiga sama kaki belum tentu sama sisi.",
    },
  ];
  const ringkasSyarat = lolos === 3 ? "ketiga uji lolos, jadi bisa menjadi segitiga" : `hanya ${lolos} uji yang lolos, jadi tidak bisa menjadi segitiga`;
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Sedotan ${daftar(c.syarat)}: ${ringkasSyarat}. Sudut ketiga ${r}°, segitiga ${jenis}. Sisi ${daftar(c.sisi)}: segitiga ${sisiBenar}. Sisi ${daftar(c.hier)}: ${g.benar}.`,
    langkah,
  };
}

export const MESIN_SEGITIGA: DefMesin = {
  id: "mesin-segitiga-k5b7",
  judul: "Mesin Segitiga",
  selesaiId: "mesin-segitiga",
  stasiun: STASIUN_SEGITIGA,
  kasus: KASUS_SEGITIGA.map(kasusMesinSegitiga),
};

/* ------------------------------ B: Mesin Segi Empat ------------------------------ */

type Titik = [number, number];
type Empat = [Titik, Titik, Titik, Titik];
const sisiVek = (q: Empat, i: number): Titik => [q[(i + 1) % 4][0] - q[i][0], q[(i + 1) % 4][1] - q[i][1]];
const panjang2 = (v: Titik): number => v[0] * v[0] + v[1] * v[1];
const silang = (u: Titik, v: Titik): number => u[0] * v[1] - u[1] * v[0];
const titikKali = (u: Titik, v: Titik): number => u[0] * v[0] + u[1] * v[1];

/** Banyak pasang sisi berhadapan yang sejajar. */
export const pasangSejajar = (q: Empat): number => (silang(sisiVek(q, 0), sisiVek(q, 2)) === 0 ? 1 : 0) + (silang(sisiVek(q, 1), sisiVek(q, 3)) === 0 ? 1 : 0);
/** Banyak sudut siku-siku di empat titik sudut. */
export const banyakSikuEmpat = (q: Empat): number => [0, 1, 2, 3].filter((i) => titikKali(sisiVek(q, (i + 3) % 4), sisiVek(q, i)) === 0).length;
export type CiriSisi = "dua pasang sisi berhadapan sama panjang" | "dua pasang sisi berurutan sama panjang" | "hanya sepasang sisi sama panjang";
export const ciriSisi = (q: Empat): CiriSisi | null => {
  const [a, b, c, d] = [0, 1, 2, 3].map((i) => panjang2(sisiVek(q, i)));
  const hadap = a === c && b === d;
  const urut = (a === b && c === d) || (b === c && d === a);
  if (hadap && !urut) return "dua pasang sisi berhadapan sama panjang";
  if (urut && !hadap) return "dua pasang sisi berurutan sama panjang";
  const sama = (a === c ? 1 : 0) + (b === d ? 1 : 0) + (a === b ? 1 : 0) + (b === c ? 1 : 0) + (c === d ? 1 : 0) + (d === a ? 1 : 0);
  return sama === 1 ? "hanya sepasang sisi sama panjang" : null;
};

type Rep = "trapesium" | "jajargenjang" | "persegi panjang" | "belah ketupat" | "persegi" | "layang-layang";
const REP: Record<Rep, Empat> = {
  trapesium: [[0, 0], [8, 0], [6, 3], [1, 3]],
  jajargenjang: [[0, 0], [6, 0], [8, 3], [2, 3]],
  "persegi panjang": [[0, 0], [6, 0], [6, 3], [0, 3]],
  "belah ketupat": [[3, 0], [6, 2], [3, 4], [0, 2]],
  persegi: [[0, 0], [4, 0], [4, 4], [0, 4]],
  "layang-layang": [[0, 6], [3, 2], [0, 0], [-3, 2]],
};
const SIKU_SIKU: Empat = [[0, 0], [7, 0], [4, 3], [0, 3]];
const SAMA_KAKI: Empat = [[0, 0], [8, 0], [6, 3], [2, 3]];
/** Ciri tiap bangun dihitung dari koordinatnya: [sejajar 1 atau lebih, dua pasang sejajar, empat siku-siku, empat sisi sama, dua pasang berurutan sama, diagonal tegak lurus]. */
export const ciriRep = (r: Rep): boolean[] => {
  const q = REP[r];
  const [a, b, c, d] = [0, 1, 2, 3].map((i) => panjang2(sisiVek(q, i)));
  const dg1: Titik = [q[2][0] - q[0][0], q[2][1] - q[0][1]];
  const dg2: Titik = [q[3][0] - q[1][0], q[3][1] - q[1][1]];
  return [pasangSejajar(q) >= 1, pasangSejajar(q) === 2, banyakSikuEmpat(q) === 4, a === b && b === c && c === d, (a === b && c === d) || (b === c && d === a), titikKali(dg1, dg2) === 0];
};
/** Ciri penentu tiap golongan (indeks ciri di ciriRep). */
const PENENTU: Record<Rep, number[]> = { trapesium: [0], jajargenjang: [1], "persegi panjang": [1, 2], "belah ketupat": [1, 3], persegi: [1, 2, 3], "layang-layang": [4] };
export const golonganLain = (a: Rep, b: Rep): boolean => PENENTU[b].every((k) => ciriRep(a)[k]);
export const BANGUN_REP: Rep[] = Object.keys(REP) as Rep[];

export type KasusSegiempat = {
  id: string;
  nama: string;
  konteks: string;
  sejajar: { sebut: string; titik: Empat };
  sisi: { sebut: string; titik: Empat };
  sudut: { sebut: string; titik: Empat };
  hier: { dari: Rep; pilihan: [Rep, Rep, Rep] };
};
export const KASUS_SEGIEMPAT: KasusSegiempat[] = [
  {
    id: "denah",
    nama: "Denah Candi",
    konteks: "Asep dan Lukas mengamati denah Candi Sewu",
    sejajar: { sebut: "trapesium biasa (bukan jajargenjang)", titik: REP.trapesium },
    sisi: { sebut: "persegi panjang", titik: REP["persegi panjang"] },
    sudut: { sebut: "trapesium siku-siku", titik: SIKU_SIKU },
    hier: { dari: "persegi panjang", pilihan: ["jajargenjang", "layang-layang", "belah ketupat"] },
  },
  {
    id: "jendela",
    nama: "Hiasan Jendela",
    konteks: "Komang mengamati hiasan jendela Candi Sewu",
    sejajar: { sebut: "jajargenjang", titik: REP.jajargenjang },
    sisi: { sebut: "layang-layang", titik: REP["layang-layang"] },
    sudut: { sebut: "persegi panjang", titik: REP["persegi panjang"] },
    hier: { dari: "belah ketupat", pilihan: ["layang-layang", "persegi panjang", "persegi"] },
  },
  {
    id: "gapura",
    nama: "Hiasan Gapura",
    konteks: "Nisa mengamati hiasan gapura Candi Sewu",
    sejajar: { sebut: "layang-layang", titik: REP["layang-layang"] },
    sisi: { sebut: "trapesium sama kaki", titik: SAMA_KAKI },
    sudut: { sebut: "jajargenjang", titik: REP.jajargenjang },
    hier: { dari: "jajargenjang", pilihan: ["trapesium", "persegi panjang", "belah ketupat"] },
  },
];

export const STASIUN_SEGIEMPAT: StasiunDef[] = [
  { id: "sejajar", nama: "Sejajar", ikon: "∥" },
  { id: "sisi", nama: "Sisi", ikon: "📏" },
  { id: "sudut", nama: "Sudut", ikon: "∟" },
  { id: "hierarki", nama: "Hierarki", ikon: "⬆️" },
];

const hurufDepan = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;
const CIRI_SISI: CiriSisi[] = ["dua pasang sisi berhadapan sama panjang", "dua pasang sisi berurutan sama panjang", "hanya sepasang sisi sama panjang"];

export function kasusMesinSegiempat(c: KasusSegiempat, idx: number): KasusMesin {
  const pasang = pasangSejajar(c.sejajar.titik);
  const cs = ciriSisi(c.sisi.titik) as CiriSisi;
  const siku = banyakSikuEmpat(c.sudut.titik);
  const benarH = c.hier.pilihan.find((p) => golonganLain(c.hier.dari, p)) as Rep;
  const salahH = c.hier.pilihan.filter((p) => p !== benarH);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "sejajar",
      tanya: `${c.konteks}. Hiasan pertama berbentuk ${c.sejajar.sebut}. Banyak pasang sisi berhadapan yang sejajar adalah …`,
      opsi: susunOpsi(`${pasang} pasang`, pengecoh(pasang, [0, 1, 2]).map((v) => `${v} pasang`), idx),
      benar: `${pasang} pasang`,
      petunjuk: "Ada dua pasang sisi berhadapan. Uji tiap pasang: bila sejajar, arahnya sama dan jaraknya tetap. Trapesium biasa hanya punya sepasang.",
    },
    {
      stasiun: "sisi",
      tanya: `Hiasan kedua berbentuk ${c.sisi.sebut}. Ciri sisinya adalah …`,
      opsi: susunOpsi(cs, CIRI_SISI.filter((o) => o !== cs), idx + 1),
      benar: cs,
      petunjuk: "Impitkan sisinya. Sisi berhadapan itu yang di seberang, sisi berurutan itu yang bersebelahan. Layang-layang punya dua pasang sisi berurutan sama, trapesium sama kaki hanya kakinya yang sama.",
    },
    {
      stasiun: "sudut",
      tanya: `Hiasan ketiga berbentuk ${c.sudut.sebut}. Banyak sudutnya yang siku-siku adalah …`,
      opsi: susunOpsi(`${siku} sudut`, pengecoh(siku, [0, 2, 4, 1]).map((v) => `${v} sudut`), idx + 2),
      benar: `${siku} sudut`,
      petunjuk: "Periksa keempat sudut dengan patokan siku-siku. Persegi panjang punya empat, trapesium siku-siku punya dua, dan jajargenjang biasa tidak punya.",
    },
    {
      stasiun: "hierarki",
      tanya: `${hurufDepan(c.hier.dari)} digolongkan juga sebagai …`,
      opsi: susunOpsi(benarH, salahH, idx + 3),
      benar: benarH,
      petunjuk: "Bangun masuk golongan lain bila memiliki semua ciri golongan itu. Jangan dibalik: golongan yang lebih luas belum tentu masuk golongan yang lebih khusus.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${hurufDepan(c.sejajar.sebut)}: ${pasang} pasang sisi sejajar. ${hurufDepan(c.sisi.sebut)}: ${cs}. ${hurufDepan(c.sudut.sebut)}: ${siku} sudut siku-siku. ${hurufDepan(c.hier.dari)} juga ${benarH}.`,
    langkah,
  };
}

export const MESIN_SEGIEMPAT: DefMesin = {
  id: "mesin-segiempat-k5b7",
  judul: "Mesin Segi Empat",
  selesaiId: "mesin-segiempat",
  stasiun: STASIUN_SEGIEMPAT,
  kasus: KASUS_SEGIEMPAT.map(kasusMesinSegiempat),
};

export const SEMUA_MESIN_K5B7: DefMesin[] = [MESIN_SEGITIGA, MESIN_SEGIEMPAT];
