/**
 * Definisi Mesin Bertahap Kelas 5 Bab 5 (Luas Daerah Bangun Datar), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts
 * dan dieja ejaK5B5. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_PETAK (A): Tutup → Baris → Satuan → Potong   (kasus Alun-Alun, Ubin Lukas, Cara Yohana)
 *    Tutup : banyak petak satuan yang menutup daerah baris demi baris (pengecoh: petak satu baris ditambah satu kolom,
 *            dan jumlah panjang tepi).
 *    Baris : banyak petak pada susunan baris dan kolom (pengecoh: baris ditambah kolom, baris dikali baris).
 *    Satuan: luas ditulis dengan satuan persegi (pengecoh: satuan panjang, dan jumlah panjang dengan satuan persegi).
 *    Potong: luas setelah petak dipindah tetap sama (pengecoh: berkurang atau bertambah sebanyak petak yang dipindah).
 * Data dari Buku Siswa Kelas V Bab 5 Sub-Bab A (ubin lantai, Alun-Alun, cara Yohana).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b5.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
/** Dua pengecoh pertama dari kandidat: bulat positif, unik, bukan benar. Bila kurang, dilengkapi benar + 2, benar + 3. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 2, benar + 3]) {
    if (hasil.length < 2 && n > 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
const jumlah = (a: number[]): number => a.reduce((s, v) => s + v, 0);

/* ------------------------------ A: Mesin Petak ------------------------------ */

/**
 * tutup: p petak tiap baris dan l baris. baris: r baris dan k kolom. satuan: p ubin ke samping dan l ubin ke bawah,
 * dengan satuan luas sat. potong: banyak petak tiap kolom bangun (dari bawah), dipindah menjadi persegi panjang r baris dan c kolom.
 */
export type KasusPetak = {
  id: string;
  nama: string;
  konteks: string;
  tutup: { p: number; l: number };
  baris: { r: number; k: number };
  satuan: { p: number; l: number; sat: "cm²" | "m²" };
  potong: { tumpuk: number[]; r: number; c: number };
};
export const KASUS_PETAK: KasusPetak[] = [
  { id: "alun", nama: "Alun-Alun", konteks: "Petugas menutup lantai pendapa Alun-Alun dengan ubin", tutup: { p: 5, l: 2 }, baris: { r: 3, k: 4 }, satuan: { p: 6, l: 2, sat: "m²" }, potong: { tumpuk: [2, 3, 1], r: 2, c: 3 } },
  { id: "lukas", nama: "Ubin Lukas", konteks: "Lukas menutup lantai kamarnya dengan ubin satu meter kali satu meter", tutup: { p: 3, l: 3 }, baris: { r: 2, k: 5 }, satuan: { p: 4, l: 3, sat: "m²" }, potong: { tumpuk: [4, 2, 3], r: 3, c: 3 } },
  { id: "yohana", nama: "Cara Yohana", konteks: "Yohana menyusun petak kertas di meja", tutup: { p: 4, l: 2 }, baris: { r: 5, k: 3 }, satuan: { p: 3, l: 2, sat: "cm²" }, potong: { tumpuk: [1, 2, 3, 4], r: 2, c: 5 } },
];

export const STASIUN_PETAK: StasiunDef[] = [
  { id: "tutup", nama: "Tutup", ikon: "🟨" },
  { id: "baris", nama: "Baris", ikon: "🔢" },
  { id: "satuan", nama: "Satuan", ikon: "📏" },
  { id: "potong", nama: "Potong", ikon: "✂️" },
];

/** Banyak petak satuan yang menutup daerah: dihitung baris demi baris dengan penjumlahan berulang. */
export function luasDaerah(p: number, l: number): number {
  let n = 0;
  for (let j = 0; j < l; j += 1) n += p;
  return n;
}
/** Banyak petak yang menonjol di atas r baris persegi panjang tujuan. */
export function petakDipindah(tumpuk: number[], r: number): number {
  let n = 0;
  for (const t of tumpuk) if (t > r) n += t - r;
  return n;
}

export function kasusMesinPetak(c: KasusPetak, idx: number): KasusMesin {
  const { p, l } = c.tutup;
  const luasT = luasDaerah(p, l);
  const luasB = luasDaerah(c.baris.k, c.baris.r);
  const sat = c.satuan;
  const luasS = luasDaerah(sat.p, sat.l);
  const panjang = sat.sat === "cm²" ? "cm" : "m";
  const total = jumlah(c.potong.tumpuk);
  const pindah = petakDipindah(c.potong.tumpuk, c.potong.r);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "tutup",
      tanya: `${c.konteks}. Daerah persegi panjang ditutup rapat tanpa celah dengan petak satuan, ${p} petak tiap baris dan ada ${l} baris. Banyak petak seluruhnya adalah …`,
      opsi: susunOpsi(`${luasT} petak`, pengecoh(luasT, [p + l, 2 * (p + l)]).map((n) => `${n} petak`), idx),
      benar: `${luasT} petak`,
      petunjuk: `Hitung baris demi baris: ${Array.from({ length: l }, () => p).join(" + ")} petak. Semua baris dihitung, jangan hanya satu baris.`,
    },
    {
      stasiun: "baris",
      tanya: `Petak disusun ${c.baris.r} baris dan ${c.baris.k} kolom. Banyak petak seluruhnya adalah …`,
      opsi: susunOpsi(`${luasB} petak`, pengecoh(luasB, [c.baris.r + c.baris.k, c.baris.r * c.baris.r]).map((n) => `${n} petak`), idx + 1),
      benar: `${luasB} petak`,
      petunjuk: `Tiap baris ada ${c.baris.k} petak, dan ada ${c.baris.r} baris. Jumlahnya ${Array.from({ length: c.baris.r }, () => c.baris.k).join(" + ")}, bukan baris ditambah kolom.`,
    },
    {
      stasiun: "satuan",
      tanya: `Ubin berukuran satu satuan panjang kali satu satuan panjang menutup lantai, ${sat.p} ubin ke samping dan ${sat.l} ubin ke bawah. Luas lantai ditulis …`,
      opsi: susunOpsi(`${luasS} ${sat.sat}`, [`${luasS} ${panjang}`, `${sat.p + sat.l} ${sat.sat}`], idx + 2),
      benar: `${luasS} ${sat.sat}`,
      petunjuk: `Luas diukur dengan petak persegi, jadi satuannya persegi, yaitu ${sat.sat}. Satuan ${panjang} hanya untuk panjang.`,
    },
    {
      stasiun: "potong",
      tanya: `Bangun dari petak punya kolom berisi ${c.potong.tumpuk.join(", ")} petak. Petak yang menonjol dipindah ke lubang sampai menjadi persegi panjang ${c.potong.r} baris dan ${c.potong.c} kolom. Luas setelah dipindah adalah …`,
      opsi: susunOpsi(`${total} petak`, [`${total - pindah} petak`, `${total + pindah} petak`], idx + 3),
      benar: `${total} petak`,
      petunjuk: `Petak hanya berpindah tempat. Tidak ada yang hilang dan tidak ada yang bertambah, jadi luasnya tetap ${total} petak.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Daerah ${p} petak tiap baris dan ${l} baris luasnya ${luasT} petak. Susunan ${c.baris.r} baris dan ${c.baris.k} kolom luasnya ${luasB} petak. Luas lantai ${sat.p} ubin dan ${sat.l} ubin ditulis ${luasS} ${sat.sat}. Memindahkan ${pindah} petak tidak mengubah luas ${total} petak.`,
    langkah,
  };
}

export const MESIN_PETAK: DefMesin = {
  id: "mesin-petak-k5b5",
  judul: "Mesin Petak",
  selesaiId: "mesin-petak",
  stasiun: STASIUN_PETAK,
  kasus: KASUS_PETAK.map(kasusMesinPetak),
};

export const SEMUA_MESIN_K5B5 = [MESIN_PETAK];
