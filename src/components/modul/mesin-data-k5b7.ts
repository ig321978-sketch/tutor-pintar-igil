/**
 * Definisi Mesin Bertahap Kelas 5 Bab 7 (Membandingkan Ciri-Ciri Bangun Datar), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK5B7. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_SEGITIGA (A): Syarat → Sudut → Sisi → Hierarki   (kasus Atap, Gapura, Pagar Candi Sewu)
 *    Syarat   : banyak pasangan sisi yang lolos uji jumlah dua sisi lebih dari sisi ketiga.
 *    Sudut    : sudut ketiga dari jumlah 180 derajat dan jenis segitiga menurut sudut.
 *    Sisi     : jenis menurut sisi (sama kaki, sama sisi, sembarang).
 *    Hierarki : golongan segitiga menurut hierarki inklusif (sama sisi juga sama kaki).
 * Data dari Buku Siswa Kelas V Bab 7 Sub-Bab A (sedotan 5, 6, 7 dan 5, 4, 12; jumlah sudut 180; hierarki segitiga).
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
  { id: "hierarki", nama: "Hierarki", ikon: "🪜" },
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

export const SEMUA_MESIN_K5B7: DefMesin[] = [MESIN_SEGITIGA];
