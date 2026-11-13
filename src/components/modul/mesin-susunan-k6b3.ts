/**
 * Definisi Mesin Bertahap Kelas 6 Bab 3 Sub-Bab A (Mengonstruksi dan Mengurai), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK6B3. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_SUSUNAN (A): Hitung → Lapisan → Penyangga → Urai   (kasus Rumah Dadu, Gudang Kardus, Menara Balok)
 *    Hitung    : kubus satu lantai penuh, ukuran p × l.
 *    Lapisan   : seluruh kubus balok setinggi t lantai.
 *    Penyangga : kubus lantai tambahan yang melayang, tanpa kubus di bawahnya.
 *    Urai      : sisa kubus sesudah satu lantai balok dilepas.
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b3.mjs.
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

export type KasusSusunan = {
  id: string;
  nama: string;
  konteks: string;
  /** Balok penuh p × l × t. */
  p: number;
  l: number;
  t: number;
  /** Lantai tambahan: banyak kubus, dan yang melayang di antaranya. */
  atas: number;
  melayang: number;
};

export const KASUS_SUSUNAN: KasusSusunan[] = [
  { id: "rumah", nama: "Rumah Dadu", konteks: "Tigor menyusun dadu menjadi rumah kecil", p: 3, l: 2, t: 2, atas: 3, melayang: 1 },
  { id: "gudang", nama: "Gudang Kardus", konteks: "Tenri menumpuk kardus mainan menjadi gudang", p: 4, l: 3, t: 2, atas: 5, melayang: 2 },
  { id: "menara", nama: "Menara Balok", konteks: "Tigor dan Tenri membangun menara kubus", p: 2, l: 2, t: 3, atas: 3, melayang: 2 },
];

export const STASIUN_SUSUNAN: StasiunDef[] = [
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "lapisan", nama: "Lapisan", ikon: "📚" },
  { id: "penyangga", nama: "Penyangga", ikon: "⬇️" },
  { id: "urai", nama: "Urai", ikon: "🧩" },
];

export function kasusMesinSusunan(c: KasusSusunan, idx: number): KasusMesin {
  const dasar = c.p * c.l;
  const total = dasar * c.t;
  const sisa = dasar * (c.t - 1);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "hitung",
      tanya: `${c.konteks}. Satu lantai penuh berukuran ${c.p} × ${c.l}. Kubus di satu lantai ada …`,
      opsi: susunOpsi(String(dasar), pengecoh(dasar, [c.p + c.l, c.p * c.t]), idx),
      benar: String(dasar),
      petunjuk: `Satu lantai punya ${c.p} kubus tiap baris dan ${c.l} baris. Kalikan keduanya.`,
    },
    {
      stasiun: "lapisan",
      tanya: `Balok itu setinggi ${c.t} lantai penuh. Seluruh kubusnya, termasuk yang tertutup, ada …`,
      opsi: susunOpsi(String(total), pengecoh(total, [dasar, c.p + c.l + c.t]), idx + 1),
      benar: String(total),
      petunjuk: `Kalikan kubus satu lantai, yaitu ${dasar}, dengan banyak lantai, yaitu ${c.t}. Jangan hanya hitung satu lantai.`,
    },
    {
      stasiun: "penyangga",
      tanya: `Di atas balok ditaruh lantai tambahan berisi ${c.atas} kubus. Dari semuanya, ${c.atas - c.melayang} kubus bertumpu pada kubus lain. Kubus yang melayang ada …`,
      opsi: susunOpsi(String(c.melayang), pengecoh(c.melayang, [c.atas, c.atas - c.melayang]), idx + 2),
      benar: String(c.melayang),
      petunjuk: "Kubus yang tidak punya kubus tepat di bawahnya melayang. Kurangi seluruh kubus tambahan dengan yang bertumpu.",
    },
    {
      stasiun: "urai",
      tanya: `Balok ${c.p} × ${c.l} × ${c.t} diurai: satu lantai dilepas. Kubus yang masih tersusun ada …`,
      opsi: susunOpsi(String(sisa), pengecoh(sisa, [total, dasar]), idx + 3),
      benar: String(sisa),
      petunjuk: `Sesudah satu lantai dilepas, tinggal ${c.t - 1} lantai penuh. Kalikan ${dasar} dengan ${c.t - 1}.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Balok ${c.p} × ${c.l} × ${c.t}: satu lantai ${dasar} kubus, seluruhnya ${total} kubus. Dari ${c.atas} kubus tambahan, ${c.melayang} melayang. Satu lantai dilepas, tersisa ${sisa} kubus.`,
    langkah,
  };
}

export const MESIN_SUSUNAN: DefMesin = {
  id: "mesin-susunan-k6b3",
  judul: "Mesin Susunan",
  selesaiId: "mesin-susunan",
  stasiun: STASIUN_SUSUNAN,
  kasus: KASUS_SUSUNAN.map(kasusMesinSusunan),
};
