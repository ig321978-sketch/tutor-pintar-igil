/**
 * Definisi Mesin Bertahap Kelas 5 Bab 4 (Keliling Bangun Datar), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan
 * dieja ejaK5B4. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_JALUR (A): Jalur → Arti → Pagar → Beda   (kasus Pagar Ayah, Bingkai Ibu, Benteng Baluwarti)
 *    Jalur: jumlah semua sisi (pengecoh: isi petak, jumlah tiga sisi atau dua sisi saja).
 *    Arti : jalur tepi atau isi petak, menurut keperluan (pengecoh: yang lain, dan banyak sudut).
 *    Pagar: ruas pagar mengelilingi tanah berpetak (pengecoh: isi petak, dan jumlah dua sisi saja).
 *    Beda : jalur tepi dan isi dibedakan (pengecoh: tertukar, dan isi disamakan dengan jalur).
 * Data dari Buku Siswa Kelas V Bab 4 Sub-Bab A (pagar, bingkai foto, Benteng Baluwarti).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b4.mjs.
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

/* ------------------------------ A: Mesin Jalur ------------------------------ */

/**
 * sisi: sisi persegi atau persegi panjang berurutan (p, l, p, l). t: tanah berpetak. d: bangun di kisi petak.
 * perlu: keperluan yang dihitung (jalur tepi atau isi).
 */
export type KasusJalur = {
  id: string;
  nama: string;
  konteks: string;
  perlu: "jalur" | "isi";
  keperluan: string;
  sisi: number[];
  t: { w: number; h: number };
  d: { w: number; h: number };
};
export const KASUS_JALUR: KasusJalur[] = [
  { id: "ayah", nama: "Pagar Ayah", konteks: "Ayah memasang pagar di tepi kebun berbentuk persegi panjang", perlu: "jalur", keperluan: "membuat pagar kebun", sisi: [6, 4, 6, 4], t: { w: 5, h: 3 }, d: { w: 4, h: 3 } },
  { id: "ibu", nama: "Bingkai Ibu", konteks: "Ibu membuat bingkai kayu untuk foto berbentuk persegi", perlu: "jalur", keperluan: "membuat bingkai foto", sisi: [3, 3, 3, 3], t: { w: 4, h: 2 }, d: { w: 6, h: 2 } },
  { id: "baluwarti", nama: "Benteng Baluwarti", konteks: "Dinding Benteng Baluwarti mengelilingi sebuah halaman berbentuk persegi panjang", perlu: "isi", keperluan: "menanam rumput di halaman dalam benteng", sisi: [9, 5, 9, 5], t: { w: 6, h: 4 }, d: { w: 4, h: 2 } },
];

export const STASIUN_JALUR: StasiunDef[] = [
  { id: "jalur", nama: "Jalur", ikon: "🚶" },
  { id: "arti", nama: "Arti", ikon: "💡" },
  { id: "pagar", nama: "Pagar", ikon: "🧱" },
  { id: "beda", nama: "Beda", ikon: "⚖️" },
];

/** Keliling tanah berpetak: dua tepi mendatar dan dua tepi tegak, satu ruas tiap sisi petak di tepi. */
export function ruasPagar(t: { w: number; h: number }): number {
  let ruas = 0;
  for (let i = 0; i < t.w; i += 1) ruas += 2;
  for (let j = 0; j < t.h; j += 1) ruas += 2;
  return ruas;
}

export function kasusMesinJalur(c: KasusJalur, idx: number): KasusMesin {
  const keliling = jumlah(c.sisi);
  const isiSisi = c.sisi[0] * c.sisi[1];
  const tigaSisi = keliling - c.sisi[3];
  const duaSisi = c.sisi[0] + c.sisi[1];
  const ruas = ruasPagar(c.t);
  const isiTanah = c.t.w * c.t.h;
  const kelBeda = 2 * (c.d.w + c.d.h);
  const isiBeda = c.d.w * c.d.h;
  const benarArti = c.perlu === "jalur" ? "panjang jalur di tepi, yaitu keliling" : "banyak petak di dalam, yaitu isi";
  const lainArti = c.perlu === "jalur" ? "banyak petak di dalam, yaitu isi" : "panjang jalur di tepi, yaitu keliling";
  const benarBeda = `jalur tepi ${kelBeda} cm, isi ${isiBeda} petak`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "jalur",
      tanya: `${c.konteks}. Panjang sisinya berurutan ${c.sisi.join(", ")} m. Jumlah panjang semua sisinya, yaitu keliling, adalah …`,
      opsi: susunOpsi(`${keliling} m`, pengecoh(keliling, [isiSisi, tigaSisi, duaSisi]).map((n) => `${n} m`), idx),
      benar: `${keliling} m`,
      petunjuk: `Berjalanlah di tepi: ${c.sisi.join(" + ")}, semua sisi sampai kembali ke awal. Jangan berhenti sebelum kembali.`,
    },
    {
      stasiun: "arti",
      tanya: `Untuk ${c.keperluan}, yang perlu dihitung adalah …`,
      opsi: susunOpsi(benarArti, [lainArti, "banyak sudut bangun"], idx + 1),
      benar: benarArti,
      petunjuk: c.perlu === "jalur" ? "Pagar dan bingkai dipasang di tepi, jadi yang dihitung panjang jalur di tepi." : "Rumput menutupi daerah di dalam, jadi yang dihitung isinya, bukan jalur tepi.",
    },
    {
      stasiun: "pagar",
      tanya: `Tanah berpetak ${c.t.w} petak panjang dan ${c.t.h} petak lebar. Pagar dipasang satu ruas di tiap sisi petak di tepi. Banyak ruas pagar seluruhnya …`,
      opsi: susunOpsi(`${ruas} ruas`, pengecoh(ruas, [isiTanah, c.t.w + c.t.h]).map((n) => `${n} ruas`), idx + 2),
      benar: `${ruas} ruas`,
      petunjuk: `Hitung ruas di tepi atas ${c.t.w}, kanan ${c.t.h}, bawah ${c.t.w}, dan kiri ${c.t.h}. Petak di dalam tidak dipagari.`,
    },
    {
      stasiun: "beda",
      tanya: `Sebuah bangun digambar di kisi petak, ${c.d.w} petak panjang dan ${c.d.h} petak lebar. Pernyataan yang benar adalah …`,
      opsi: susunOpsi(benarBeda, [`jalur tepi ${isiBeda} cm, isi ${kelBeda} petak`, `jalur tepi ${kelBeda} cm, isi ${kelBeda} petak`], idx + 3),
      benar: benarBeda,
      petunjuk: "Jalur tepi dihitung dari panjang semua sisi di tepi. Isi dihitung dari petak di dalam, baris demi baris. Keduanya berbeda.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Jalur tepi ${c.sisi.join(" + ")} = ${keliling} m. Pagar tanah berpetak memakai ${ruas} ruas, sedangkan isinya ${isiTanah} petak. Bangun ${c.d.w} petak panjang dan ${c.d.h} petak lebar punya jalur tepi ${kelBeda} cm dan isi ${isiBeda} petak.`,
    langkah,
  };
}

export const MESIN_JALUR: DefMesin = {
  id: "mesin-jalur-k5b4",
  judul: "Mesin Jalur",
  selesaiId: "mesin-jalur",
  stasiun: STASIUN_JALUR,
  kasus: KASUS_JALUR.map(kasusMesinJalur),
};

export const SEMUA_MESIN_K5B4 = [MESIN_JALUR];
