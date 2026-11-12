/**
 * Definisi Mesin Bertahap Kelas 5 Bab 4 (Keliling Bangun Datar), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan
 * dieja ejaK5B4. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_JALUR (A): Jalur → Arti → Pagar → Beda   (kasus Pagar Ayah, Bingkai Ibu, Benteng Baluwarti)
 *    Jalur: jumlah semua sisi (pengecoh: isi petak, jumlah tiga sisi atau dua sisi saja).
 *    Arti : jalur tepi atau isi petak, menurut keperluan (pengecoh: yang lain, dan banyak sudut).
 *    Pagar: ruas pagar mengelilingi tanah berpetak (pengecoh: isi petak, dan jumlah dua sisi saja).
 *    Beda : jalur tepi dan isi dibedakan (pengecoh: tertukar, dan isi disamakan dengan jalur).
 *  - MESIN_SEGITIGA (B): Jumlah → Sama → Kaki → Ukur   (kasus Segitiga buku, enam, tujuh)
 *    Jumlah/Kaki/Ukur: keliling sebagai jumlah tiga sisi (pengecoh: tiga kali sisi pertama, jumlah dua sisi saja).
 *    Sama : keliling 3 × sisi (pengecoh: dua kali sisi, sisi kali sisi).
 * Data dari Buku Siswa Kelas V Bab 4 Sub-Bab A dan B (pagar, bingkai foto, Benteng Baluwarti, segitiga 5, 4, 7).
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

/* ------------------------------ B: Mesin Segitiga ------------------------------ */

/**
 * jumlah: segitiga sisi sembarang. sama: sisi segitiga sama sisi. kaki: segitiga sama kaki. ukur: sisi yang dibaca pada penggaris.
 * Semua ditulis sebagai daftar tiga sisi berurutan.
 */
export type KasusSegitiga = { id: string; nama: string; jumlah: number[]; sama: number; kaki: number[]; ukur: number[] };
export const KASUS_SEGITIGA: KasusSegitiga[] = [
  { id: "buku", nama: "Segitiga buku", jumlah: [5, 4, 7], sama: 5, kaki: [8, 5, 5], ukur: [3, 4, 5] },
  { id: "enam", nama: "Segitiga enam", jumlah: [6, 8, 10], sama: 6, kaki: [6, 6, 4], ukur: [7, 4, 6] },
  { id: "tujuh", nama: "Segitiga tujuh", jumlah: [4, 6, 9], sama: 7, kaki: [7, 7, 3], ukur: [5, 9, 8] },
];

export const STASIUN_SEGITIGA: StasiunDef[] = [
  { id: "jumlah", nama: "Jumlah", ikon: "➕" },
  { id: "sama", nama: "Sama", ikon: "🔺" },
  { id: "kaki", nama: "Kaki", ikon: "📐" },
  { id: "ukur", nama: "Ukur", ikon: "📏" },
];

/** Keliling segitiga dari tiga sisi: ketiganya dijumlah satu per satu. */
export function kelilingSegitiga(sisi: number[]): number {
  let k = 0;
  for (const s of sisi) k += s;
  return k;
}

export function kasusMesinSegitiga(c: KasusSegitiga, idx: number): KasusMesin {
  const kJumlah = kelilingSegitiga(c.jumlah);
  const kSama = kelilingSegitiga([c.sama, c.sama, c.sama]);
  const kKaki = kelilingSegitiga(c.kaki);
  const kUkur = kelilingSegitiga(c.ukur);
  const daftar = (s: number[]): string => `${s[0]} cm, ${s[1]} cm, dan ${s[2]} cm`;
  const opsi = (benar: number, salah: number[], geser: number): string[] => susunOpsi(`${benar} cm`, pengecoh(benar, salah).map((n) => `${n} cm`), geser);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "jumlah",
      tanya: `Segitiga bersisi ${daftar(c.jumlah)}. Jumlah ketiga sisinya, yaitu keliling, adalah …`,
      opsi: opsi(kJumlah, [3 * c.jumlah[0], c.jumlah[0] + c.jumlah[1]], idx),
      benar: `${kJumlah} cm`,
      petunjuk: `Berjalanlah di tepi segitiga: ${c.jumlah.join(" + ")}. Ketiga sisi dijumlah, jangan hanya dua.`,
    },
    {
      stasiun: "sama",
      tanya: `Segitiga sama sisi, tiap sisinya ${c.sama} cm. Keliling dengan 3 × ${c.sama} adalah …`,
      opsi: opsi(kSama, [2 * c.sama, c.sama * c.sama], idx + 1),
      benar: `${kSama} cm`,
      petunjuk: `Ketiga sisi sama panjang, jadi ${c.sama} + ${c.sama} + ${c.sama} sama dengan 3 × ${c.sama}.`,
    },
    {
      stasiun: "kaki",
      tanya: `Segitiga sama kaki bersisi ${daftar(c.kaki)}. Keliling yang benar adalah …`,
      opsi: opsi(kKaki, [3 * c.kaki[0], c.kaki[0] + c.kaki[1]], idx + 2),
      benar: `${kKaki} cm`,
      petunjuk: `Hanya dua sisi yang sama. Jangan langsung dikali 3, jumlahkan ketiga sisi: ${c.kaki.join(" + ")}.`,
    },
    {
      stasiun: "ukur",
      tanya: `Penggaris menunjukkan ketiga sisi segitiga: ${daftar(c.ukur)}. Setelah diukur, keliling segitiga adalah …`,
      opsi: opsi(kUkur, [3 * c.ukur[0], c.ukur[0] + c.ukur[1]], idx + 3),
      benar: `${kUkur} cm`,
      petunjuk: `Ukur dulu ketiga sisi, baru jumlahkan: ${c.ukur.join(" + ")}.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Keliling segitiga ${c.jumlah.join(" + ")} = ${kJumlah} cm. Sama sisi ${c.sama} cm memberi ${kSama} cm, sama dengan 3 × ${c.sama}. Sama kaki ${c.kaki.join(", ")} tetap dijumlah: ${kKaki} cm. Hasil ukur ${c.ukur.join(" + ")} = ${kUkur} cm.`,
    langkah,
  };
}

export const MESIN_SEGITIGA: DefMesin = {
  id: "mesin-segitiga-k5b4",
  judul: "Mesin Segitiga",
  selesaiId: "mesin-segitiga",
  stasiun: STASIUN_SEGITIGA,
  kasus: KASUS_SEGITIGA.map(kasusMesinSegitiga),
};

export const SEMUA_MESIN_K5B4 = [MESIN_JALUR, MESIN_SEGITIGA];
