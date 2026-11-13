/**
 * Definisi Mesin Bertahap Kelas 6 Bab 1, Sub-Bab B (Pembagian Pecahan), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK6B1.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_BAGI (B): Kebalikan → Silang → Hasil → Cek   (kasus Gelas, Muat, Bolu)
 *    Kebalikan : kebalikan pembagi (tukar pembilang dan penyebut).
 *    Silang    : panah silang, pembilang hasil (atas dikali atas setelah pembagi dibalik).
 *    Hasil     : hasil lengkap dalam bentuk paling sederhana.
 *    Cek       : hasil dikali pembagi kembali ke bilangan awal.
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas VI Bab 1 Sub-Bab B (sirup di gelas, gelas dari liter, bolu).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b1.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

const fpb = (a: number, b: number): number => (b === 0 ? a : fpb(b, a % b));
const teksPecah = (p: number, q: number): string => (q === 1 ? String(p) : `${p}/${q}`);
const sederhana = (p: number, q: number): string => teksPecah(p / fpb(p, q), q / fpb(p, q));

export type KasusBagi = {
  id: string;
  nama: string;
  konteks: string;
  /** Yang dibagi: a/b (bilangan asli bila b = 1). */
  a: number;
  b: number;
  /** Pembagi: p/q (bilangan asli bila q = 1). */
  p: number;
  q: number;
};

export const KASUS_BAGI: KasusBagi[] = [
  { id: "gelas", nama: "Gelas Sirup", konteks: "Agam membagi sirup ke gelas", a: 1, b: 2, p: 3, q: 1 },
  { id: "muat", nama: "Muat Gelas Kecil", konteks: "Agam menuang air ke gelas kecil", a: 3, b: 1, p: 1, q: 4 },
  { id: "bolu", nama: "Bolu Pasar", konteks: "Ibu memotong bolu untuk pembeli", a: 6, b: 1, p: 3, q: 4 },
];

export const STASIUN_BAGI: StasiunDef[] = [
  { id: "balik", nama: "Kebalikan", ikon: "🔁" },
  { id: "silang", nama: "Silang", ikon: "✖️" },
  { id: "hasil", nama: "Hasil", ikon: "🏁" },
  { id: "cek", nama: "Cek", ikon: "🔎" },
];

export function kasusMesinBagi(c: KasusBagi, idx: number): KasusMesin {
  const dibagi = teksPecah(c.a, c.b);
  const pembagi = teksPecah(c.p, c.q);
  const soal = `${dibagi} : ${pembagi}`;
  const atas = c.a * c.q;
  const bawah = c.b * c.p;
  const hasil = sederhana(atas, bawah);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "balik",
      tanya: `${c.konteks}: ${soal}. Kebalikan pembagi ${pembagi} adalah …`,
      opsi: susunOpsi(`${c.q}/${c.p}`, [`${c.p}/${c.q}`, `${c.p}/${c.p}`], idx),
      benar: `${c.q}/${c.p}`,
      petunjuk: "Kebalikan ditulis dengan menukar pembilang dan penyebut pembagi.",
    },
    {
      stasiun: "silang",
      tanya: `Panah silang pada ${soal}: pembagian diganti perkalian dengan kebalikan, yaitu ${dibagi} × ${c.q}/${c.p}. Pembilang hasilnya …`,
      opsi: susunOpsi(String(atas), [String(c.a * c.p), String(c.a + c.q)], idx + 1),
      benar: String(atas),
      petunjuk: "Setelah pembagi dibalik, kalikan pembilang dengan pembilang.",
    },
    {
      stasiun: "hasil",
      tanya: `Hasil lengkap ${soal} dalam bentuk paling sederhana adalah …`,
      opsi: susunOpsi(hasil, [sederhana(c.a * c.p, c.b * c.q), sederhana(bawah, atas)], idx + 2),
      benar: hasil,
      petunjuk: "Kalikan atas dengan atas dan bawah dengan bawah setelah pembagi dibalik, lalu sederhanakan bila bisa.",
    },
    {
      stasiun: "cek",
      tanya: `Cek ${soal}: hasil dikali ${pembagi} harus kembali ke bilangan awal. Hasil kali itu adalah …`,
      opsi: susunOpsi(dibagi, [hasil, pembagi], idx + 3),
      benar: dibagi,
      petunjuk: "Kalikan hasil dengan pembagi. Pembagian dan perkalian saling membatalkan, jadi hasilnya kembali ke bilangan awal.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${soal}: kebalikan ${pembagi} adalah ${c.q}/${c.p}. ${dibagi} × ${c.q}/${c.p} = ${atas}/${bawah}${hasil === `${atas}/${bawah}` ? "" : ` = ${hasil}`}. Cek: ${hasil} × ${pembagi} = ${dibagi}.`,
    langkah,
  };
}

export const MESIN_BAGI: DefMesin = {
  id: "mesin-bagi-k6b1",
  judul: "Mesin Bagi Pecahan",
  selesaiId: "mesin-bagi",
  stasiun: STASIUN_BAGI,
  kasus: KASUS_BAGI.map(kasusMesinBagi),
};
