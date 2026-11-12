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
 *  - MESIN_SEGIEMPAT (C): Persegi panjang → Persegi → Rumus → Beda   (kasus Segi empat buku, Kebun dan papan, Lapangan kecil)
 *    Persegi panjang: 2 × (panjang + lebar) (pengecoh: belum dikali 2, panjang dikali lebar).
 *    Persegi: 4 × sisi (pengecoh: sisi kali sisi, dua kali sisi).
 *    Rumus: ungkapan yang benar (pengecoh: panjang kali lebar, kurung hilang).  Beda: keliling dan luas (pengecoh: tertukar, luas disamakan dengan keliling).
 *  - MESIN_SEGIBANYAK (D): Beraturan → Beda → Tabel → Banyak sisi   (kasus Segi lima, Segi enam, Segi delapan)
 *    Beraturan/Tabel: n × sisi (pengecoh: banyak sisi ditambah sisi, sisi kali sisi atau n kali n).
 *    Beda: jumlah semua sisi (pengecoh: banyak sisi kali sisi pertama, satu sisi terlewat).  Banyak sisi: sesuai nama segi.
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

/* ------------------------------ C: Mesin Segi Empat ------------------------------ */

/** pp: persegi panjang untuk keliling. s: sisi persegi. rumus: persegi panjang untuk memilih ungkapan. beda: persegi panjang untuk keliling dan luas. */
export type KasusSegiEmpat = {
  id: string;
  nama: string;
  pp: { p: number; l: number };
  s: number;
  rumus: { p: number; l: number };
  beda: { p: number; l: number };
};
export const KASUS_SEGIEMPAT: KasusSegiEmpat[] = [
  { id: "buku", nama: "Segi empat buku", pp: { p: 5, l: 3 }, s: 3, rumus: { p: 5, l: 3 }, beda: { p: 8, l: 4 } },
  { id: "kebun", nama: "Kebun dan papan", pp: { p: 4, l: 2 }, s: 5, rumus: { p: 4, l: 2 }, beda: { p: 6, l: 2 } },
  { id: "lapangan", nama: "Lapangan kecil", pp: { p: 7, l: 2 }, s: 6, rumus: { p: 8, l: 4 }, beda: { p: 9, l: 3 } },
];

export const STASIUN_SEGIEMPAT: StasiunDef[] = [
  { id: "pp", nama: "Persegi panjang", ikon: "🔲" },
  { id: "persegi", nama: "Persegi", ikon: "⬛" },
  { id: "rumus", nama: "Rumus", ikon: "🧮" },
  { id: "beda", nama: "Beda", ikon: "⚖️" },
];

/** Keliling persegi panjang dengan berjalan di tepi: panjang, lebar, panjang, lebar. */
export function kelilingSegiEmpat(p: number, l: number): number {
  let k = 0;
  for (const s of [p, l, p, l]) k += s;
  return k;
}

export function kasusMesinSegiEmpat(c: KasusSegiEmpat, idx: number): KasusMesin {
  const kPP = kelilingSegiEmpat(c.pp.p, c.pp.l);
  const kS = kelilingSegiEmpat(c.s, c.s);
  const benarRumus = `2 × (${c.rumus.p} + ${c.rumus.l})`;
  const kB = kelilingSegiEmpat(c.beda.p, c.beda.l);
  const lB = c.beda.p * c.beda.l;
  const benarBeda = `keliling ${kB} cm, luas ${lB} petak`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "pp",
      tanya: `Persegi panjang berukuran ${c.pp.p} cm dan ${c.pp.l} cm. Jumlahkan panjang dan lebar, lalu kalikan 2. Kelilingnya …`,
      opsi: susunOpsi(`${kPP} cm`, pengecoh(kPP, [c.pp.p + c.pp.l, c.pp.p * c.pp.l]).map((n) => `${n} cm`), idx),
      benar: `${kPP} cm`,
      petunjuk: `Ada dua panjang dan dua lebar: 2 × (${c.pp.p} + ${c.pp.l}). Jangan lupa dikali 2, dan panjang dikali lebar adalah luas.`,
    },
    {
      stasiun: "persegi",
      tanya: `Persegi bersisi ${c.s} cm. Keliling dengan 4 × ${c.s} adalah …`,
      opsi: susunOpsi(`${kS} cm`, pengecoh(kS, [c.s * c.s, 2 * c.s]).map((n) => `${n} cm`), idx + 1),
      benar: `${kS} cm`,
      petunjuk: `Keempat sisi persegi sama panjang: ${c.s} + ${c.s} + ${c.s} + ${c.s} sama dengan 4 × ${c.s}. Sisi dikali sisi adalah luas.`,
    },
    {
      stasiun: "rumus",
      tanya: `Persegi panjang ${c.rumus.p} cm dan ${c.rumus.l} cm. Ungkapan yang menghitung kelilingnya adalah …`,
      opsi: susunOpsi(benarRumus, [`${c.rumus.p} × ${c.rumus.l}`, `2 × ${c.rumus.p} + ${c.rumus.l}`], idx + 2),
      benar: benarRumus,
      petunjuk: "Keliling memakai dua panjang dan dua lebar: jumlahkan panjang dan lebar dulu di dalam kurung, lalu kalikan 2.",
    },
    {
      stasiun: "beda",
      tanya: `Persegi panjang ${c.beda.p} cm dan ${c.beda.l} cm. Pernyataan yang benar adalah …`,
      opsi: susunOpsi(benarBeda, [`keliling ${lB} cm, luas ${kB} petak`, `keliling ${kB} cm, luas ${kB} petak`], idx + 3),
      benar: benarBeda,
      petunjuk: "Keliling adalah jalur di tepi: 2 kali jumlah panjang dan lebar. Luas adalah panjang dikali lebar, banyak petak di dalam.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Persegi panjang ${c.pp.p} dan ${c.pp.l} berkeliling ${kPP} cm. Persegi sisi ${c.s} berkeliling ${kS} cm. Ungkapan ${benarRumus} menghitung keliling. Persegi panjang ${c.beda.p} dan ${c.beda.l}: keliling ${kB} cm, luas ${lB} petak.`,
    langkah,
  };
}

export const MESIN_SEGIEMPAT: DefMesin = {
  id: "mesin-segiempat-k5b4",
  judul: "Mesin Segi Empat",
  selesaiId: "mesin-segiempat",
  stasiun: STASIUN_SEGIEMPAT,
  kasus: KASUS_SEGIEMPAT.map(kasusMesinSegiEmpat),
};

/* ------------------------------ D: Mesin Segi Banyak ------------------------------ */

/** ber: segi-n beraturan. beda: sisi tidak sama. tabel: baris tabel sisi tetap. banyak: segi yang ditanyakan banyak sisinya. */
export type KasusSegiBanyak = {
  id: string;
  nama: string;
  ber: { n: number; s: number };
  beda: number[];
  tabel: { n: number; s: number };
  banyak: number;
};
export const KASUS_SEGIBANYAK: KasusSegiBanyak[] = [
  { id: "lima", nama: "Segi lima", ber: { n: 5, s: 3 }, beda: [2, 3, 4, 5, 6], tabel: { n: 5, s: 2 }, banyak: 5 },
  { id: "enam", nama: "Segi enam", ber: { n: 6, s: 4 }, beda: [2, 3, 4, 3, 5, 6], tabel: { n: 6, s: 3 }, banyak: 6 },
  { id: "delapan", nama: "Segi delapan", ber: { n: 8, s: 2 }, beda: [3, 4, 2, 5, 5], tabel: { n: 8, s: 2 }, banyak: 8 },
];

export const STASIUN_SEGIBANYAK: StasiunDef[] = [
  { id: "ber", nama: "Beraturan", ikon: "🔷" },
  { id: "beda", nama: "Beda", ikon: "🔶" },
  { id: "tabel", nama: "Tabel", ikon: "📋" },
  { id: "banyak", nama: "Banyak sisi", ikon: "🔢" },
];

/** Nama bangun menurut banyak sisi. */
export const namaSegi = (n: number): string => ({ 3: "segitiga", 4: "persegi", 5: "segi lima", 6: "segi enam", 7: "segi tujuh", 8: "segi delapan" } as Record<number, string>)[n] ?? `segi ${n}`;

/** Keliling n sisi sama panjang: dijumlah satu per satu. */
export function kelilingSamaSisi(n: number, s: number): number {
  let k = 0;
  for (let i = 0; i < n; i += 1) k += s;
  return k;
}

export function kasusMesinSegiBanyak(c: KasusSegiBanyak, idx: number): KasusMesin {
  const kBer = kelilingSamaSisi(c.ber.n, c.ber.s);
  const kBeda = jumlah(c.beda);
  const nBeda = c.beda.length;
  const kTabel = kelilingSamaSisi(c.tabel.n, c.tabel.s);
  const cm = (n: number): string => `${n} cm`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "ber",
      tanya: `${namaSegi(c.ber.n)} beraturan, tiap sisinya ${c.ber.s} cm. Keliling dengan ${c.ber.n} × ${c.ber.s} adalah …`,
      opsi: susunOpsi(cm(kBer), pengecoh(kBer, [c.ber.n + c.ber.s, c.ber.s * c.ber.s]).map(cm), idx),
      benar: cm(kBer),
      petunjuk: `Semua sisi sama panjang, jadi ${c.ber.s} dijumlah ${c.ber.n} kali sama dengan ${c.ber.n} × ${c.ber.s}. Sisi dikali sisi bukan keliling.`,
    },
    {
      stasiun: "beda",
      tanya: `${namaSegi(nBeda)} dengan sisi ${c.beda.join(" cm, ")} cm. Sisinya tidak sama panjang. Kelilingnya adalah …`,
      opsi: susunOpsi(cm(kBeda), pengecoh(kBeda, [nBeda * c.beda[0], kBeda - c.beda[nBeda - 1]]).map(cm), idx + 1),
      benar: cm(kBeda),
      petunjuk: `Sisinya berbeda, jangan dikali ${nBeda}. Jumlahkan semua sisi satu per satu: ${c.beda.join(" + ")}.`,
    },
    {
      stasiun: "tabel",
      tanya: `Tabel keliling segi beraturan bersisi ${c.tabel.s} cm. Pada baris ${namaSegi(c.tabel.n)}, kelilingnya …`,
      opsi: susunOpsi(cm(kTabel), pengecoh(kTabel, [c.tabel.n + c.tabel.s, c.tabel.n * c.tabel.n]).map(cm), idx + 2),
      benar: cm(kTabel),
      petunjuk: `Pola tabel: keliling = banyak sisi × ${c.tabel.s}. ${namaSegi(c.tabel.n)} punya ${c.tabel.n} sisi.`,
    },
    {
      stasiun: "banyak",
      tanya: `${namaSegi(c.banyak)} punya … sisi.`,
      opsi: susunOpsi(`${c.banyak} sisi`, [`${c.banyak - 1} sisi`, `${c.banyak + 1} sisi`], idx + 3),
      benar: `${c.banyak} sisi`,
      petunjuk: `Nama segi menunjukkan banyak sisinya: ${namaSegi(c.banyak)} punya ${c.banyak} sisi.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${namaSegi(c.ber.n)} beraturan bersisi ${c.ber.s} cm berkeliling ${kBer} cm. Sisi tidak sama dijumlah semua: ${c.beda.join(" + ")} = ${kBeda} cm. Pada tabel sisi ${c.tabel.s} cm, ${namaSegi(c.tabel.n)} berkeliling ${kTabel} cm. ${namaSegi(c.banyak)} punya ${c.banyak} sisi.`,
    langkah,
  };
}

export const MESIN_SEGIBANYAK: DefMesin = {
  id: "mesin-segibanyak-k5b4",
  judul: "Mesin Segi Banyak",
  selesaiId: "mesin-segibanyak",
  stasiun: STASIUN_SEGIBANYAK,
  kasus: KASUS_SEGIBANYAK.map(kasusMesinSegiBanyak),
};

export const SEMUA_MESIN_K5B4 = [MESIN_JALUR, MESIN_SEGITIGA, MESIN_SEGIEMPAT, MESIN_SEGIBANYAK];
