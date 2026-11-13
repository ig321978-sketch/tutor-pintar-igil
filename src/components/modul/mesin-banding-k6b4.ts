/**
 * Definisi Mesin Bertahap Kelas 6 Bab 4 Sub-Bab B (Membandingkan Peluang Kejadian), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK6B4. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_BANDING (B): Rasio → Samakan → Banding → Adil   (kasus Kotak Hadiah, Koin dan Dadu, Lomba Dhien)
 *    Rasio    : hasil yang tidak menguntungkan, peluang besar belum pasti (Favorable-to-Total Ratio).
 *    Samakan  : total bersama paling kecil dari dua total (Comparative Probability Ratio).
 *    Banding  : yang lebih mungkin sesudah total disamakan (Relative Likelihood Decision).
 *    Adil     : adil atau kurang adil dari hasil menang dua pemain (Fair Game Equal Chance Principle).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b4.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

/** Dua pengecoh bilangan yang berbeda dari jawaban dan satu sama lain, tidak negatif. */
const pengecoh = (benar: number, calon: number[]): string[] => {
  const hasil: number[] = [];
  for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2]) {
    if (Number.isInteger(c) && c >= 0 && c !== benar && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return hasil.map(String);
};

export type PeluangMesin = { sebut: string; k: number; n: number };
export type KasusBanding = {
  id: string;
  nama: string;
  konteks: string;
  a: PeluangMesin;
  b: PeluangMesin;
  /** Permainan dua pemain: konteks, hasil menang pemain A dan B, dan semua hasil. */
  adil: { konteks: string; ka: number; kb: number; n: number };
};

export const KASUS_BANDING: KasusBanding[] = [
  {
    id: "hadiah",
    nama: "Kotak Hadiah",
    konteks: "Dhien memilih kotak hadiah untuk mendapat piring biru",
    a: { sebut: "kotak Mantap", k: 4, n: 7 },
    b: { sebut: "kotak Spektakuler", k: 3, n: 7 },
    adil: { konteks: "Dhien dan Ibu memilih warna piring dari kotak Mantap", ka: 4, kb: 3, n: 7 },
  },
  {
    id: "koin",
    nama: "Koin dan Dadu",
    konteks: "Dhien memilih antara dadu angka enam dan koin gambar",
    a: { sebut: "dadu angka 6", k: 1, n: 6 },
    b: { sebut: "koin gambar", k: 1, n: 2 },
    adil: { konteks: "Tenri memilih gambar dan Dhien memilih angka pada koin", ka: 1, kb: 1, n: 2 },
  },
  {
    id: "lomba",
    nama: "Lomba Dhien",
    konteks: "Dhien menimbang peluang menang di dua kategori lomba",
    a: { sebut: "kategori SMP", k: 1, n: 35 },
    b: { sebut: "kategori SD", k: 1, n: 12 },
    adil: { konteks: "Dhien memegang satu nomor undian dan Tigor memegang tiga nomor", ka: 1, kb: 3, n: 12 },
  },
];

export const STASIUN_BANDING: StasiunDef[] = [
  { id: "rasio", nama: "Rasio", ikon: "➗" },
  { id: "samakan", nama: "Samakan", ikon: "🎯" },
  { id: "banding", nama: "Banding", ikon: "🔎" },
  { id: "adil", nama: "Adil", ikon: "⚖️" },
];

/** Total bersama paling kecil: kelipatan terkecil dari dua total. */
const kelipatan = (x: number, y: number): number => {
  let m = Math.max(x, y);
  while (m % x !== 0 || m % y !== 0) m += 1;
  return m;
};

const JAWAB_SAMA = "Sama mungkin";
const JAWAB_ADIL = "Adil, peluang kedua pemain sama";
const JAWAB_UNTUNG_A = "Kurang adil, pemain A lebih diuntungkan";
const JAWAB_UNTUNG_B = "Kurang adil, pemain B lebih diuntungkan";

export function kasusMesinBanding(c: KasusBanding, idx: number): KasusMesin {
  const T = kelipatan(c.a.n, c.b.n);
  const ua = c.a.k * (T / c.a.n);
  const ub = c.b.k * (T / c.b.n);
  const jawabA = `${c.a.sebut} lebih mungkin`;
  const jawabB = `${c.b.sebut} lebih mungkin`;
  const unggul = ua > ub ? jawabA : ua < ub ? jawabB : JAWAB_SAMA;
  const lainnya = [jawabA, jawabB, JAWAB_SAMA].filter((v) => v !== unggul);
  const adil = c.adil.ka === c.adil.kb ? JAWAB_ADIL : c.adil.ka > c.adil.kb ? JAWAB_UNTUNG_A : JAWAB_UNTUNG_B;
  const lainAdil = [JAWAB_ADIL, JAWAB_UNTUNG_A, JAWAB_UNTUNG_B].filter((v) => v !== adil);
  const sisa = c.a.n - c.a.k;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "rasio",
      tanya: `${c.konteks}. ${c.a.sebut}: ${c.a.k} dari ${c.a.n} hasil menguntungkan. Hasil yang tidak menguntungkan ada …`,
      opsi: susunOpsi(String(sisa), pengecoh(sisa, [c.a.k, c.a.n, sisa + 1]), idx),
      benar: String(sisa),
      petunjuk: `Kurangi semua hasil, yaitu ${c.a.n}, dengan hasil yang menguntungkan, yaitu ${c.a.k}. Peluang besar belum pasti.`,
    },
    {
      stasiun: "samakan",
      tanya: `${c.a.sebut} ${c.a.k} dari ${c.a.n}, dan ${c.b.sebut} ${c.b.k} dari ${c.b.n}. Total bersama paling kecil dari ${c.a.n} dan ${c.b.n} adalah …`,
      opsi: susunOpsi(String(T), pengecoh(T, [c.a.n + c.b.n, c.a.n * c.b.n, Math.max(c.a.n, c.b.n)]), idx + 1),
      benar: String(T),
      petunjuk: `Cari bilangan terkecil yang habis dibagi ${c.a.n} dan ${c.b.n}. Jumlah atau hasil kali belum tentu yang terkecil.`,
    },
    {
      stasiun: "banding",
      tanya: `Pada total bersama ${T}, ${c.a.sebut} mendapat ${ua} dan ${c.b.sebut} mendapat ${ub}. Yang lebih mungkin …`,
      opsi: susunOpsi(unggul, lainnya, idx + 2),
      benar: unggul,
      petunjuk: `Total sudah sama, jadi lihat hasil menguntungkannya: ${ua} dan ${ub}. Yang lebih banyak lebih mungkin, tetapi belum pasti.`,
    },
    {
      stasiun: "adil",
      tanya: `${c.adil.konteks}. Pemain A menang pada ${c.adil.ka} dari ${c.adil.n} hasil dan pemain B pada ${c.adil.kb} dari ${c.adil.n}. Permainan itu …`,
      opsi: susunOpsi(adil, lainAdil, idx + 3),
      benar: adil,
      petunjuk: `Permainan adil bila hasil menang kedua pemain sama banyak dari total yang sama. Bandingkan ${c.adil.ka} dan ${c.adil.kb}.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${c.a.sebut} ${c.a.k} dari ${c.a.n}, ${c.b.sebut} ${c.b.k} dari ${c.b.n}: pada total ${T} hasilnya ${ua} dan ${ub}. Hasil tidak menguntungkan ${sisa}. Permainan dua pemain: ${adil.toLowerCase()}.`,
    langkah,
  };
}

export const MESIN_BANDING: DefMesin = {
  id: "mesin-banding-k6b4",
  judul: "Mesin Banding",
  selesaiId: "mesin-banding",
  stasiun: STASIUN_BANDING,
  kasus: KASUS_BANDING.map(kasusMesinBanding),
};
