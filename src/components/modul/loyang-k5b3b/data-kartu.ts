/**
 * Data Mind-map dan Infografis Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno" (komponen milik Sub-Bab ini, bukan PetaLabel/InfoKartu).
 * Mind-map = loyang roti Pak Seno berenam sekat: tiap sekat punya gambar kecil dan satu label kosong; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis = dua kartu. Kartu 1 = papan pesanan Pak Seno (penyebut sama): syarat penyebut sama, model arsir satu per delapan + dua per delapan, pembilang dijumlahkan penyebut tetap,
 * dan campuran dua bulat satu per lima + tiga bulat satu per lima dengan dua cara. Kartu 2 = loyang gabungan (penyebut beda): KPK empat dan enam, jumlah lima per dua belas,
 * campuran satu bulat satu per dua + dua bulat satu per empat, dan menyederhanakan hasil. Kontrak data bersambung dari Story B dan Sub-Bab A.
 * Semua angka SELALU dihitung dari data lewat logika-data.ts. Suara tanpa digit. Diuji: scripts/uji-loyang-k5b3b.mjs.
 */
import { kataPec, ucapkan } from "./logika-cpa";
import { bentuk, jumlah, keBiasa, keCampur, kpk, tCamp, tPec, type Camp } from "./logika-data";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Enam langkah Mind-map: cek penyebut, samakan, jumlahkan pembilang, penyebut tetap, campuran, sederhanakan. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_LOYANG: LangkahPeta[] = [
  {
    judul: "Cek penyebutnya",
    arti: "Langkah satu. Cek penyebutnya. Pecahan hanya bisa dijumlahkan kalau penyebutnya sama, karena potongannya harus sama besar.",
    ikon: "\u{1F50D}",
  },
  {
    judul: "Samakan dengan KPK",
    arti: "Langkah dua. Kalau penyebutnya beda, samakan dulu dengan kelipatan persekutuan terkecil, lalu ubah tiap pecahan menjadi pecahan yang sama besar.",
    ikon: "\u{1F517}",
  },
  {
    judul: "Jumlahkan pembilang",
    arti: "Langkah tiga. Jumlahkan pembilangnya saja, yaitu angka di atas garis pecahan.",
    ikon: "\u{2795}",
  },
  {
    judul: "Penyebut tetap",
    arti: "Langkah empat. Penyebut tetap sama, karena ukuran tiap potongan tidak berubah. Jangan ikut menjumlahkan penyebut.",
    ikon: "\u{1F512}",
  },
  {
    judul: "Campuran: dua cara",
    arti: "Langkah lima. Pada pecahan campuran, ubah ke pecahan biasa lebih dulu, atau pisahkan bilangan bulat dan pecahannya, lalu jumlahkan masing-masing.",
    ikon: "\u{1F9C1}",
  },
  {
    judul: "Sederhanakan hasil",
    arti: "Langkah enam. Sederhanakan hasilnya. Kalau pembilang lebih besar daripada penyebut, ubah menjadi pecahan campuran.",
    ikon: "\u{2B50}",
  },
];
export const JUDUL_PETA_LOYANG = "Loyang Roti Pak Seno";
export const IKON_JUDUL_PETA_LOYANG = "\u{1F35E}";
export const PETUNJUK_PETA_LOYANG = "Loyang roti Pak Seno. Ketuk tanda tanya di tiap sekat untuk melihat langkahnya.";
export const SELESAI_PETA_LOYANG = "Loyang penuh! Enam langkah sudah kamu buka.";

/* ------------------------------ Infografis: data bersambung dari Story B ------------------------------ */
/** Kartu 1: satu roti dipotong delapan bagian, pesanan satu bagian dan dua bagian; mentega dua bulat satu per lima dan tiga bulat satu per lima. */
export const ARSIR = { a: 1, b: 2, d: 8 } as const;
export const MENTEGA: { c1: Camp; c2: Camp } = { c1: { w: 2, n: 1, d: 5 }, c2: { w: 3, n: 1, d: 5 } };
/** Kartu 2: gula satu per empat dan satu per enam; adonan satu bulat satu per dua dan dua bulat satu per empat. */
export const BEDA = { a: 1, p: 4, b: 1, q: 6 } as const;
export const ADONAN: { c1: Camp; c2: Camp } = { c1: { w: 1, n: 1, d: 2 }, c2: { w: 2, n: 1, d: 4 } };

export type SelInfo = { kunci: string; teks: string[]; suara: string };

const biasa = (c: Camp) => keBiasa(c);
const sumBiasa = (c1: Camp, c2: Camp) => ({ n: biasa(c1).n + biasa(c2).n, d: biasa(c1).d });

/** Sel kartu 1. */
export function selKartu1(): { syarat: SelInfo; arsir: SelInfo; tetap: SelInfo; cara1: SelInfo; cara2: SelInfo } {
  const jm = jumlah({ n: ARSIR.a, d: ARSIR.d }, { n: ARSIR.b, d: ARSIR.d });
  const { c1, c2 } = MENTEGA;
  const s = sumBiasa(c1, c2);
  const hasil = tCamp(keCampur(s));
  const w = c1.w + c2.w;
  const p = c1.n + c2.n;
  return {
    syarat: { kunci: "a-syarat", teks: ["Penyebut harus sama", "potongan sama besar"], suara: "Pecahan hanya bisa dijumlahkan kalau penyebutnya sama, karena potongannya harus sama besar." },
    arsir: {
      kunci: "a-arsir",
      teks: [`${tPec(ARSIR.a, ARSIR.d)} + ${tPec(ARSIR.b, ARSIR.d)} = ${tPec(jm.n, jm.d)}`],
      suara: ucapkan(`Satu roti dipotong delapan bagian sama besar. Satu bagian ditambah dua bagian, jadi ${tPec(ARSIR.a, ARSIR.d)} + ${tPec(ARSIR.b, ARSIR.d)} = ${tPec(jm.n, jm.d)}. Tiga dari delapan bagian terarsir.`),
    },
    tetap: {
      kunci: "a-tetap",
      teks: [`${ARSIR.a} + ${ARSIR.b} = ${ARSIR.a + ARSIR.b}`, `penyebut tetap ${ARSIR.d}`],
      suara: ucapkan(`Jumlahkan pembilangnya, ${ARSIR.a} + ${ARSIR.b} = ${ARSIR.a + ARSIR.b}. Penyebutnya tetap ${ARSIR.d}, karena ukuran potongan tidak berubah.`),
    },
    cara1: {
      kunci: "a-cara1",
      teks: [`${tCamp(c1)} + ${tCamp(c2)}`, `${tPec(biasa(c1).n, biasa(c1).d)} + ${tPec(biasa(c2).n, biasa(c2).d)} = ${tPec(s.n, s.d)}`, `= ${hasil}`],
      suara: ucapkan(`Cara pertama. Ubah ke pecahan biasa: ${tCamp(c1)} menjadi ${tPec(biasa(c1).n, biasa(c1).d)}, dan ${tCamp(c2)} menjadi ${tPec(biasa(c2).n, biasa(c2).d)}. Jumlahnya ${tPec(s.n, s.d)}. Disederhanakan menjadi ${hasil}.`),
    },
    cara2: {
      kunci: "a-cara2",
      teks: [`${c1.w} + ${c2.w} = ${w}`, `${tPec(c1.n, c1.d)} + ${tPec(c2.n, c2.d)} = ${tPec(p, c1.d)}`, `= ${w} ${tPec(p, c1.d)}`],
      suara: ucapkan(`Cara kedua. Pisahkan bilangan bulat dan pecahan. ${c1.w} + ${c2.w} = ${w}, dan ${tPec(c1.n, c1.d)} + ${tPec(c2.n, c2.d)} = ${tPec(p, c1.d)}. Gabungkan, hasilnya ${w} ${tPec(p, c1.d)}.`),
    },
  };
}

/** Sel kartu 2. */
export function selKartu2(): { kpk: SelInfo; samakan: SelInfo; jumlah: SelInfo; campur: SelInfo; sed1: SelInfo; sed2: SelInfo } {
  const m = kpk(BEDA.p, BEDA.q);
  const n1 = (BEDA.a * m) / BEDA.p;
  const n2 = (BEDA.b * m) / BEDA.q;
  const jm = jumlah({ n: BEDA.a, d: BEDA.p }, { n: BEDA.b, d: BEDA.q });
  const { c1, c2 } = ADONAN;
  const m2 = kpk(biasa(c1).d, biasa(c2).d);
  const u1 = (biasa(c1).n * m2) / biasa(c1).d;
  const u2 = (biasa(c2).n * m2) / biasa(c2).d;
  const s = { n: u1 + u2, d: m2 };
  const mf = MENTEGA;
  const sm = sumBiasa(mf.c1, mf.c2);
  return {
    kpk: { kunci: "b-kpk", teks: [`KPK ${BEDA.p} dan ${BEDA.q} = ${m}`], suara: ucapkan(`Penyebutnya beda, jadi cari KPK. KPK ${BEDA.p} dan ${BEDA.q} adalah ${m}.`) },
    samakan: {
      kunci: "b-samakan",
      teks: [`${tPec(BEDA.a, BEDA.p)} = ${tPec(n1, m)}`, `${tPec(BEDA.b, BEDA.q)} = ${tPec(n2, m)}`],
      suara: ucapkan(`Ubah tiap pecahan menjadi pecahan yang sama besar. ${tPec(BEDA.a, BEDA.p)} menjadi ${tPec(n1, m)}, dan ${tPec(BEDA.b, BEDA.q)} menjadi ${tPec(n2, m)}.`),
    },
    jumlah: {
      kunci: "b-jumlah",
      teks: [`${tPec(n1, m)} + ${tPec(n2, m)} = ${tPec(jm.n, jm.d)}`],
      suara: ucapkan(`Jumlahkan pembilangnya, penyebut tetap ${m}. ${tPec(n1, m)} + ${tPec(n2, m)} = ${tPec(jm.n, jm.d)}.`),
    },
    campur: {
      kunci: "b-campur",
      teks: [`${tCamp(c1)} + ${tCamp(c2)}`, `${tPec(u1, m2)} + ${tPec(u2, m2)}`, `= ${tPec(s.n, s.d)}`],
      suara: ucapkan(`Campuran dengan penyebut beda: ${tCamp(c1)} + ${tCamp(c2)}. Ubah ke pecahan biasa lalu samakan penyebutnya, ${tPec(u1, m2)} + ${tPec(u2, m2)}. Jumlahnya ${tPec(s.n, s.d)}.`),
    },
    sed1: {
      kunci: "b-sed1",
      teks: [`${tPec(s.n, s.d)} = ${bentuk(s)}`],
      suara: ucapkan(`Sederhanakan hasilnya. ${tPec(s.n, s.d)} menjadi ${bentuk(s)}.`),
    },
    sed2: {
      kunci: "b-sed2",
      teks: [`${tPec(sm.n, sm.d)} = ${bentuk(sm)}`],
      suara: ucapkan(`Hasil mentega juga disederhanakan. ${tPec(sm.n, sm.d)} menjadi ${bentuk(sm)}.`),
    },
  };
}
export const SEL_KARTU1 = selKartu1();
export const SEL_KARTU2 = selKartu2();
export const ID_KARTU1: readonly string[] = Object.values(SEL_KARTU1).map((s) => s.kunci);
export const ID_KARTU2: readonly string[] = Object.values(SEL_KARTU2).map((s) => s.kunci);

export const PETUNJUK1_INFO_LOYANG = "Papan pesanan Pak Seno. Ketuk tanda tanya untuk melihat penjumlahan berpenyebut sama.";
export const SELESAI1_INFO_LOYANG = "Papan lengkap! Penyebut sama, jumlahkan pembilang, penyebut tetap.";
export const PETUNJUK2_INFO_LOYANG = "Loyang gabungan. Ketuk tanda tanya untuk melihat penyebut beda, campuran, dan hasil yang disederhanakan.";
export const SELESAI2_INFO_LOYANG = "Kartu lengkap! Samakan penyebut lebih dulu, lalu sederhanakan hasilnya.";
export { kataPec };
