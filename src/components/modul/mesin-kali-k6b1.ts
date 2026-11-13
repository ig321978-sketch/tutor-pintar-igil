/**
 * Definisi Mesin Bertahap Kelas 6 Bab 1 (Pecahan dan Desimal), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK6B1.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_KALI (A): Tulis → Atas → Bawah → Hasil   (kasus Ember, Gelas, Pohon)
 *    Tulis : bilangan asli ditulis sebagai pecahan berpenyebut 1 (kotak merah).
 *    Atas  : panah lurus, pembilang dikali pembilang.
 *    Bawah : panah lurus, penyebut dikali penyebut.
 *    Hasil : hasil lengkap dalam bentuk paling sederhana.
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas VI Bab 1 Sub-Bab A (ember kebun, gelas sirup, pohon manalagi).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b1.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

const fpb = (a: number, b: number): number => (b === 0 ? a : fpb(b, a % b));
const teksPecah = (p: number, q: number): string => (q === 1 ? String(p) : `${p}/${q}`);
const sederhana = (p: number, q: number): string => teksPecah(p / fpb(p, q), q / fpb(p, q));

export type KasusKali = {
  id: string;
  nama: string;
  konteks: string;
  /** Bilangan asli. */
  w: number;
  /** Pecahan m/n. */
  m: number;
  n: number;
};

export const KASUS_KALI: KasusKali[] = [
  { id: "ember", nama: "Ember Kebun", konteks: "Agam menyiram kebun dengan ember kecil", w: 2, m: 3, n: 5 },
  { id: "gelas", nama: "Gelas Sirup", konteks: "Empat gelas diisi sirup", w: 4, m: 2, n: 5 },
  { id: "pohon", nama: "Pohon Manalagi", konteks: "Ayah menanam pohon di kebun", w: 15, m: 2, n: 3 },
];

export const STASIUN_KALI: StasiunDef[] = [
  { id: "tulis", nama: "Tulis a/1", ikon: "✏️" },
  { id: "atas", nama: "Atas", ikon: "⬆️" },
  { id: "bawah", nama: "Bawah", ikon: "⬇️" },
  { id: "hasil", nama: "Hasil", ikon: "🏁" },
];

export function kasusMesinKali(c: KasusKali, idx: number): KasusMesin {
  const p = c.w * c.m;
  const hasil = sederhana(p, c.n);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "tulis",
      tanya: `${c.konteks}: ${c.w} × ${c.m}/${c.n}. Bilangan asli ${c.w} ditulis sebagai pecahan dengan kotak merah, yaitu …`,
      opsi: susunOpsi(`${c.w}/1`, [`1/${c.w}`, `${c.w}/${c.w}`], idx),
      benar: `${c.w}/1`,
      petunjuk: "Bilangan asli ditulis sebagai pecahan dengan penyebut 1, lalu diberi kotak merah.",
    },
    {
      stasiun: "atas",
      tanya: `Panah lurus pada ${c.w}/1 × ${c.m}/${c.n}: atas dikali atas, yaitu ${c.w} × ${c.m}. Pembilang hasilnya …`,
      opsi: susunOpsi(String(p), [String(c.w + c.m), String(c.m)], idx + 1),
      benar: String(p),
      petunjuk: "Panah lurus mengalikan pembilang dengan pembilang.",
    },
    {
      stasiun: "bawah",
      tanya: `Bawah dikali bawah, yaitu 1 × ${c.n}. Penyebut hasilnya …`,
      opsi: susunOpsi(String(c.n), [String(c.n + 1), String(c.w * c.n)], idx + 2),
      benar: String(c.n),
      petunjuk: "Panah lurus mengalikan penyebut dengan penyebut. Satu dikali sebuah bilangan sama dengan bilangan itu.",
    },
    {
      stasiun: "hasil",
      tanya: `Hasil lengkap ${c.w} × ${c.m}/${c.n} dalam bentuk paling sederhana adalah …`,
      opsi: susunOpsi(hasil, [`${p}/${c.n * c.w}`, String(p)], idx + 3),
      benar: hasil,
      petunjuk: "Pembilang hasil dan penyebut hasil sudah ketemu. Sederhanakan dengan mencoret faktor yang sama bila bisa.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${c.w} ditulis ${c.w}/1. Panah lurus: ${c.w} × ${c.m} = ${p} di atas dan 1 × ${c.n} = ${c.n} di bawah. ${c.w} × ${c.m}/${c.n} = ${p}/${c.n}${hasil === `${p}/${c.n}` ? "" : ` = ${hasil}`}.`,
    langkah,
  };
}

export const MESIN_KALI: DefMesin = {
  id: "mesin-kali-k6b1",
  judul: "Mesin Kali Pecahan",
  selesaiId: "mesin-kali",
  stasiun: STASIUN_KALI,
  kasus: KASUS_KALI.map(kasusMesinKali),
};
