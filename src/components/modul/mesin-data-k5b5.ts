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
 *  - MESIN_RUMUS (B): Dasar → Setengah → Trapesium → Tinggi   (kasus Petak Kebun, Papan Bendera, Kolam Hias)
 *    Dasar    : alas dikali tinggi (pengecoh: jumlah ukuran dan dua kali jumlah ukuran).
 *    Setengah : setengah persegi panjang (pengecoh: persegi panjang utuh, dan jumlah dua ukuran).
 *    Trapesium: setengah jumlah sisi sejajar kali tinggi (pengecoh: tanpa setengah, dan jumlah semua ukuran).
 *    Tinggi   : jajargenjang dengan tinggi tegak lurus (pengecoh: sisi miring dikali alas, dan alas ditambah tinggi).
 *  - MESIN_GABUNGAN (C): Bagian → Rumus → Jumlah → Silang   (kasus Denah Rumah, Papan Nama, Taman Tiga Bagian)
 *    Bagian dan Rumus: luas satu bagian menurut rumusnya (pengecoh sesuai jenis bangun).
 *    Jumlah : luas seluruh bangun (pengecoh: satu bagian terlewat, dan satu bagian dihitung dua kali).
 *    Silang : luas denah L (pengecoh: persegi panjang besar tanpa takik, dan satu bagian saja).
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

/* ------------------------------ B: Mesin Rumus ------------------------------ */

/**
 * dasar: persegi panjang atau persegi. setengah: segitiga (alas dan tinggi) atau belah ketupat dan layang-layang (dua
 * diagonal). trap: dua sisi sejajar dan tinggi. tinggi: jajargenjang beralas alas, tegak lurus setinggi t, sisi miring m.
 */
export type KasusRumus = {
  id: string;
  nama: string;
  konteks: string;
  dasar: { bentuk: "persegi panjang" | "persegi"; p: number; l: number };
  setengah: { bangun: "segitiga" | "belah ketupat" | "layang-layang"; a: number; t: number };
  trap: { a: number; b: number; t: number };
  tinggi: { alas: number; t: number; m: number };
};
export const KASUS_RUMUS: KasusRumus[] = [
  { id: "kebun", nama: "Petak Kebun", konteks: "Pak Tani membagi kebunnya menjadi beberapa petak", dasar: { bentuk: "persegi panjang", p: 5, l: 2 }, setengah: { bangun: "segitiga", a: 6, t: 4 }, trap: { a: 5, b: 3, t: 4 }, tinggi: { alas: 6, t: 4, m: 5 } },
  { id: "bendera", nama: "Papan Bendera", konteks: "Komang membuat papan bendera dari beberapa bentuk", dasar: { bentuk: "persegi panjang", p: 8, l: 3 }, setengah: { bangun: "belah ketupat", a: 10, t: 4 }, trap: { a: 6, b: 4, t: 3 }, tinggi: { alas: 8, t: 3, m: 5 } },
  { id: "kolam", nama: "Kolam Hias", konteks: "Yohana menggambar denah kolam hias di taman", dasar: { bentuk: "persegi", p: 6, l: 6 }, setengah: { bangun: "layang-layang", a: 8, t: 6 }, trap: { a: 7, b: 5, t: 2 }, tinggi: { alas: 9, t: 2, m: 4 } },
];

export const STASIUN_RUMUS: StasiunDef[] = [
  { id: "dasar", nama: "Dasar", ikon: "✖️" },
  { id: "setengah", nama: "Setengah", ikon: "➗" },
  { id: "trapesium", nama: "Trapesium", ikon: "📐" },
  { id: "tinggi", nama: "Tinggi", ikon: "📏" },
];

/** Luas persegi panjang dan jajargenjang: alas dikali tinggi, dihitung dengan penjumlahan berulang. */
export function luasAlasTinggi(alas: number, t: number): number {
  let n = 0;
  for (let i = 0; i < t; i += 1) n += alas;
  return n;
}
/** Luas bangun yang setengah dari persegi panjang. Hanya dipakai bila hasil kalinya genap. */
export function luasSetengahMesin(a: number, t: number): number {
  const penuh = luasAlasTinggi(a, t);
  return penuh % 2 === 0 ? penuh / 2 : NaN;
}

export function kasusMesinRumus(c: KasusRumus, idx: number): KasusMesin {
  const dasar = luasAlasTinggi(c.dasar.p, c.dasar.l);
  const sSet = luasSetengahMesin(c.setengah.a, c.setengah.t);
  const sPenuh = luasAlasTinggi(c.setengah.a, c.setengah.t);
  const trapPenuh = luasAlasTinggi(c.trap.a + c.trap.b, c.trap.t);
  const trapLuas = trapPenuh / 2;
  const jajar = luasAlasTinggi(c.tinggi.alas, c.tinggi.t);
  const ukuranSetengah = c.setengah.bangun === "segitiga" ? `alas ${c.setengah.a} cm dan tinggi ${c.setengah.t} cm` : `diagonal ${c.setengah.a} cm dan ${c.setengah.t} cm`;
  const bentukDasar = c.dasar.bentuk === "persegi" ? `persegi dengan sisi ${c.dasar.p} cm` : `persegi panjang dengan alas ${c.dasar.p} cm dan tinggi ${c.dasar.l} cm`;
  const cm2 = (n: number) => `${n} cm²`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "dasar",
      tanya: `${c.konteks}. Satu petak berbentuk ${bentukDasar}. Luasnya adalah …`,
      opsi: susunOpsi(cm2(dasar), pengecoh(dasar, [c.dasar.p + c.dasar.l, 2 * (c.dasar.p + c.dasar.l)]).map(cm2), idx),
      benar: cm2(dasar),
      petunjuk: `Luas persegi panjang dan persegi sama dengan alas dikali tinggi, yaitu ${c.dasar.p} × ${c.dasar.l}. Menjumlahkan ukuran tidak memberi luas.`,
    },
    {
      stasiun: "setengah",
      tanya: `Sebuah ${c.setengah.bangun} berukuran ${ukuranSetengah}. Dua bangun yang sama menyusun persegi panjang ${c.setengah.a} cm kali ${c.setengah.t} cm. Luas satu ${c.setengah.bangun} adalah …`,
      opsi: susunOpsi(cm2(sSet), pengecoh(sSet, [sPenuh, c.setengah.a + c.setengah.t]).map(cm2), idx + 1),
      benar: cm2(sSet),
      petunjuk: `Persegi panjangnya ${sPenuh} cm². Satu bangun hanya setengahnya, yaitu ½ × ${c.setengah.a} × ${c.setengah.t}. Jangan lupa setengah.`,
    },
    {
      stasiun: "trapesium",
      tanya: `Sebuah trapesium punya sisi sejajar ${c.trap.a} cm dan ${c.trap.b} cm, tingginya ${c.trap.t} cm. Luasnya adalah …`,
      opsi: susunOpsi(cm2(trapLuas), pengecoh(trapLuas, [trapPenuh, c.trap.a + c.trap.b + c.trap.t]).map(cm2), idx + 2),
      benar: cm2(trapLuas),
      petunjuk: `Jumlahkan dua sisi sejajar dulu: ${c.trap.a} + ${c.trap.b}. Lalu kalikan tinggi dan ambil setengahnya, ½ × (${c.trap.a} + ${c.trap.b}) × ${c.trap.t}.`,
    },
    {
      stasiun: "tinggi",
      tanya: `Sebuah jajargenjang beralas ${c.tinggi.alas} cm. Tingginya, garis yang tegak lurus alas, ${c.tinggi.t} cm, dan sisi miringnya ${c.tinggi.m} cm. Luasnya adalah …`,
      opsi: susunOpsi(cm2(jajar), pengecoh(jajar, [c.tinggi.alas * c.tinggi.m, c.tinggi.alas + c.tinggi.t]).map(cm2), idx + 3),
      benar: cm2(jajar),
      petunjuk: `Yang dikalikan dengan alas adalah tinggi yang tegak lurus, yaitu ${c.tinggi.t}, bukan sisi miring ${c.tinggi.m}.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Luas ${c.dasar.bentuk} ${c.dasar.p} dan ${c.dasar.l} adalah ${dasar} cm². Satu ${c.setengah.bangun} ${c.setengah.a} dan ${c.setengah.t} luasnya ${sSet} cm². Trapesium ${c.trap.a} dan ${c.trap.b} tinggi ${c.trap.t} luasnya ${trapLuas} cm². Jajargenjang alas ${c.tinggi.alas} tinggi ${c.tinggi.t} luasnya ${jajar} cm², bukan memakai sisi miring.`,
    langkah,
  };
}

export const MESIN_RUMUS: DefMesin = {
  id: "mesin-rumus-k5b5",
  judul: "Mesin Rumus",
  selesaiId: "mesin-rumus",
  stasiun: STASIUN_RUMUS,
  kasus: KASUS_RUMUS.map(kasusMesinRumus),
};

/* ------------------------------ C: Mesin Gabungan ------------------------------ */

type BagianMesin = { jenis: "pp" | "segitiga" | "jajar"; a: number; t: number };
/** uraian: bagian bangun gabungan. silang: denah L (persegi panjang W kali H, takik w kali h di sudut kanan atas). */
export type KasusGabungan = {
  id: string;
  nama: string;
  konteks: string;
  uraian: BagianMesin[];
  silang: { W: number; H: number; w: number; h: number };
};
export const KASUS_GABUNGAN: KasusGabungan[] = [
  { id: "rumah", nama: "Denah Rumah", konteks: "Asep membagi denah rumahnya menjadi beberapa bagian", uraian: [{ jenis: "pp", a: 4, t: 3 }, { jenis: "pp", a: 4, t: 2 }], silang: { W: 5, H: 4, w: 2, h: 2 } },
  { id: "papan", nama: "Papan Nama", konteks: "Komang membagi papan nama sekolah menjadi beberapa bagian", uraian: [{ jenis: "jajar", a: 6, t: 4 }, { jenis: "segitiga", a: 6, t: 4 }], silang: { W: 6, H: 4, w: 2, h: 2 } },
  { id: "taman", nama: "Taman Tiga Bagian", konteks: "Yohana membagi taman menjadi tiga bagian", uraian: [{ jenis: "pp", a: 5, t: 3 }, { jenis: "pp", a: 5, t: 2 }, { jenis: "segitiga", a: 5, t: 2 }], silang: { W: 7, H: 4, w: 3, h: 2 } },
];

export const STASIUN_GABUNGAN: StasiunDef[] = [
  { id: "bagian", nama: "Bagian", ikon: "✂️" },
  { id: "rumus", nama: "Rumus", ikon: "📐" },
  { id: "jumlah", nama: "Jumlah", ikon: "➕" },
  { id: "silang", nama: "Silang", ikon: "🔀" },
];

const NAMA_JENIS = { pp: "persegi panjang", segitiga: "segitiga", jajar: "jajargenjang" } as const;
/** Luas satu bagian: persegi panjang dan jajargenjang alas kali tinggi (penjumlahan berulang), segitiga setengahnya. */
export function luasBagianMesin(b: BagianMesin): number {
  let n = 0;
  for (let i = 0; i < b.t; i += 1) n += b.a;
  return b.jenis === "segitiga" ? n / 2 : n;
}
/** Luas denah L: dihitung dengan cara 1, dipotong mendatar menjadi dua persegi panjang. */
export function luasDenahMesin(d: { W: number; H: number; w: number; h: number }): number {
  let bawah = 0;
  for (let i = 0; i < d.H - d.h; i += 1) bawah += d.W;
  let atas = 0;
  for (let i = 0; i < d.h; i += 1) atas += d.W - d.w;
  return bawah + atas;
}
function pengecohBagian(b: BagianMesin): number[] {
  const benar = luasBagianMesin(b);
  return pengecoh(benar, b.jenis === "segitiga" ? [b.a * b.t, b.a + b.t] : b.jenis === "jajar" ? [b.a + b.t, (b.a * b.t) / 2] : [b.a + b.t, 2 * (b.a + b.t)]);
}
const ukuranBagian = (b: BagianMesin): string => (b.jenis === "pp" ? `panjang ${b.a} cm dan lebar ${b.t} cm` : `alas ${b.a} cm dan tinggi ${b.t} cm`);

export function kasusMesinGabungan(c: KasusGabungan, idx: number): KasusMesin {
  const luas = c.uraian.map(luasBagianMesin);
  const total = jumlah(luas);
  const terkecil = Math.min(...luas);
  const pertama = c.uraian[0];
  const terakhir = c.uraian[c.uraian.length - 1];
  const dL = luasDenahMesin(c.silang);
  const cm2 = (n: number) => `${n} cm²`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "bagian",
      tanya: `${c.konteks}. Bangun gabungan itu diurai menjadi ${c.uraian.length} bagian. Bagian pertama berbentuk ${NAMA_JENIS[pertama.jenis]} dengan ${ukuranBagian(pertama)}. Luas bagian pertama adalah …`,
      opsi: susunOpsi(cm2(luas[0]), pengecohBagian(pertama).map(cm2), idx),
      benar: cm2(luas[0]),
      petunjuk: `Uraikan dulu menjadi bagian yang punya rumus. Bagian pertama ${NAMA_JENIS[pertama.jenis]}, jadi pakai rumus luas ${NAMA_JENIS[pertama.jenis]}.`,
    },
    {
      stasiun: "rumus",
      tanya: `Bagian terakhir berbentuk ${NAMA_JENIS[terakhir.jenis]} dengan ${ukuranBagian(terakhir)}. Luas bagian terakhir adalah …`,
      opsi: susunOpsi(cm2(luas[luas.length - 1]), pengecohBagian(terakhir).map(cm2), idx + 1),
      benar: cm2(luas[luas.length - 1]),
      petunjuk: terakhir.jenis === "segitiga" ? `Luas segitiga setengah dari alas kali tinggi, yaitu ½ × ${terakhir.a} × ${terakhir.t}. Jangan lupa setengah.` : `Luas ${NAMA_JENIS[terakhir.jenis]} adalah ${terakhir.a} × ${terakhir.t}.`,
    },
    {
      stasiun: "jumlah",
      tanya: `Luas semua bagian berturut-turut ${luas.map(cm2).join(", ")}. Luas seluruh bangun gabungan adalah …`,
      opsi: susunOpsi(cm2(total), pengecoh(total, [total - terkecil, total + terkecil]).map(cm2), idx + 2),
      benar: cm2(total),
      petunjuk: `Jumlahkan luas semua bagian: ${luas.join(" + ")}. Jangan ada bagian yang terlewat atau dihitung dua kali.`,
    },
    {
      stasiun: "silang",
      tanya: `Denah L berasal dari persegi panjang ${c.silang.W} cm kali ${c.silang.H} cm dengan takik ${c.silang.w} cm kali ${c.silang.h} cm. Yohana memotongnya mendatar, Komang memotongnya tegak. Luas denah adalah …`,
      opsi: susunOpsi(cm2(dL), pengecoh(dL, [c.silang.W * c.silang.H, c.silang.W * (c.silang.H - c.silang.h)]).map(cm2), idx + 3),
      benar: cm2(dL),
      petunjuk: "Uraikan denah menjadi dua persegi panjang, lalu jumlahkan. Cara Yohana dan cara Komang memberi luas yang sama.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Bagian pertama luasnya ${luas[0]} cm². Bagian terakhir luasnya ${luas[luas.length - 1]} cm². Seluruh bangun ${luas.join(" + ")} = ${total} cm². Denah L luasnya ${dL} cm², dengan cara apa pun dipotong.`,
    langkah,
  };
}

export const MESIN_GABUNGAN: DefMesin = {
  id: "mesin-gabungan-k5b5",
  judul: "Mesin Gabungan",
  selesaiId: "mesin-gabungan",
  stasiun: STASIUN_GABUNGAN,
  kasus: KASUS_GABUNGAN.map(kasusMesinGabungan),
};

export const SEMUA_MESIN_K5B5 = [MESIN_PETAK, MESIN_RUMUS, MESIN_GABUNGAN];
