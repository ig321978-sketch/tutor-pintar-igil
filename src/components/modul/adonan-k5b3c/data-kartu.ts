/**
 * Data Mind-map dan Infografis Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani" (komponen milik Sub-Bab ini, bukan PetaLabel/InfoKartu).
 * Mind-map = rak oven Bu Nani: enam loyang, tiap loyang punya gambar kecil dan satu label kosong; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis = dua kartu. Kartu 1 = loyang Bu Nani: syarat penyebut sama, model arsir lima per delapan dikurangi dua per delapan, dan campuran berpenyebut sama dengan dua cara
 * (empat bulat empat per lima dikurangi satu bulat dua per lima). Kartu 2 = papan sisa persediaan: tiga per empat dikurangi satu per tiga dengan KPK dua belas, lima bulat satu per dua dikurangi
 * dua bulat satu per tiga (ubah ke biasa, samakan, sederhanakan), dan periksa dengan penjumlahan. Kontrak data bersambung dari Story dan Sub-Bab A dan B (tepung Bu Ratna, adonan Pak Seno).
 * Semua angka SELALU dihitung dari data lewat logika-data.ts. Suara tanpa digit. Diuji: scripts/uji-adonan-k5b3c.mjs.
 */
import { ucapkan } from "./logika-cpa";
import { bil, keBiasa, kpk, sederhana, selisihBiasa, selisihPisah, teksBil, teksPec, type Bil } from "./logika-data";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Enam langkah Mind-map: cek penyebut, samakan, kurangi pembilang, pisah bulat dan pecahan, sederhanakan, periksa. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_ADONAN: LangkahPeta[] = [
  {
    judul: "Cek penyebut",
    arti: "Langkah satu. Cek penyebutnya. Pecahan hanya bisa dikurangkan kalau penyebutnya sama. Kalau berbeda, samakan dulu.",
    ikon: "\u{1F50D}",
  },
  {
    judul: "Samakan penyebut",
    arti: "Langkah dua. Samakan penyebut. Cari kelipatan persekutuan terkecil dari kedua penyebut, lalu ubah tiap pecahan menjadi pecahan yang sama besar dengan penyebut itu.",
    ikon: "\u{1F517}",
  },
  {
    judul: "Kurangi pembilang",
    arti: "Langkah tiga. Kurangi pembilang. Kalau penyebutnya sudah sama, kurangkan angka di atas saja, dan angka di bawah tetap.",
    ikon: "\u{2796}",
  },
  {
    judul: "Pisah bulat dan pecahan",
    arti: "Langkah empat. Pisah bulat dan pecahan. Pada pecahan campuran, kurangkan bilangan bulatnya sendiri dan pecahannya sendiri, lalu gabungkan. Atau ubah dulu ke pecahan biasa.",
    ikon: "\u{2702}\u{FE0F}",
  },
  {
    judul: "Sederhanakan hasil",
    arti: "Langkah lima. Sederhanakan hasil. Bagi pembilang dan penyebut dengan bilangan yang sama, atau ubah pecahan yang pembilangnya lebih besar menjadi pecahan campuran.",
    ikon: "\u{2B50}",
  },
  {
    judul: "Periksa dengan tambah",
    arti: "Langkah enam. Periksa dengan penjumlahan. Hasil ditambah pecahan yang dikurangkan harus kembali ke pecahan semula.",
    ikon: "\u{2705}",
  },
];
export const JUDUL_PETA_ADONAN = "Rak oven Bu Nani";
export const IKON_JUDUL_PETA_ADONAN = "\u{1F370}";
export const PETUNJUK_PETA_ADONAN = "Rak oven Bu Nani. Ketuk tanda tanya di tiap loyang untuk melihat langkahnya.";
export const SELESAI_PETA_ADONAN = "Rak penuh! Enam langkah sudah kamu buka.";

/* ------------------------------ Data kontrak (dari Story) ------------------------------ */
/** Kartu 1: model arsir lima per delapan dikurangi dua per delapan loyang. */
export const ARSIR = { q: 8, a: 5, c: 2 } as const;
/** Kartu 1: tepung empat bulat empat per lima kilogram dikurangi satu bulat dua per lima kilogram (penyebut sama). */
export const TEPUNG_X: Bil = bil(4, 4, 5);
export const TEPUNG_Y: Bil = bil(1, 2, 5);
/** Kartu 2: tiga per empat dikurangi satu per tiga loyang (penyebut beda). */
export const BEDA_X: Bil = bil(0, 3, 4);
export const BEDA_Y: Bil = bil(0, 1, 3);
/** Kartu 2: lima bulat satu per dua dikurangi dua bulat satu per tiga (campuran berpenyebut beda). */
export const CAMPUR_X: Bil = bil(5, 1, 2);
export const CAMPUR_Y: Bil = bil(2, 1, 3);

const ucap = (t: string): string => ucapkan(t);

export type SelInfo = { kunci: string; baris: string[]; suara: string; aria: string };

/* ------------------------------ Kartu 1 ------------------------------ */
export const SEL_SYARAT: SelInfo = {
  kunci: "syarat",
  baris: ["penyebut harus sama"],
  suara: "Syarat pengurangan pecahan: penyebut kedua pecahan harus sama. Kalau berbeda, samakan dulu.",
  aria: "Syarat penyebut harus sama",
};
const ARSIR_SISA = ARSIR.a - ARSIR.c;
export const SEL_ARSIR: SelInfo = {
  kunci: "arsir",
  baris: [`${teksPec(ARSIR.a, ARSIR.q)} - ${teksPec(ARSIR.c, ARSIR.q)}`, `= ${teksPec(ARSIR_SISA, ARSIR.q)}`],
  suara: ucap(`Model arsir: ${ARSIR.a}/${ARSIR.q} dikurangi ${ARSIR.c}/${ARSIR.q}. ${ARSIR.c} bagian dicoret, tersisa ${ARSIR_SISA} bagian. Hasilnya ${ARSIR_SISA}/${ARSIR.q}, dan penyebut tetap ${ARSIR.q}.`),
  aria: `${ARSIR.a}/${ARSIR.q} dikurangi ${ARSIR.c}/${ARSIR.q} sama dengan ${ARSIR_SISA}/${ARSIR.q}`,
};
const T = selisihBiasa(TEPUNG_X, TEPUNG_Y);
const TP = selisihPisah(TEPUNG_X, TEPUNG_Y);
export const SEL_CARA1: SelInfo = {
  kunci: "cara1",
  baris: [`${teksPec(T.Px, T.m)} - ${teksPec(T.Py, T.m)}`, `= ${teksPec(T.Pn, T.m)}`, `= ${teksBil(T.hasil)}`],
  suara: ucap(
    `Cara pertama, ubah ke pecahan biasa: ${TEPUNG_X.b} dikali ${TEPUNG_X.q} ditambah ${TEPUNG_X.p} sama dengan ${T.Px}, jadi ${T.Px}/${T.m} dikurangi ${T.Py}/${T.m} sama dengan ${T.Pn}/${T.m}. Disederhanakan, hasilnya ${teksBil(T.hasil)} kilogram.`,
  ),
  aria: `Cara satu: ${T.Px}/${T.m} dikurangi ${T.Py}/${T.m} sama dengan ${T.Pn}/${T.m}, yaitu ${teksBil(T.hasil)}`,
};
export const SEL_CARA2: SelInfo = {
  kunci: "cara2",
  baris: [`${TEPUNG_X.b} - ${TEPUNG_Y.b} = ${TP.B}`, `${teksPec(TEPUNG_X.p, TEPUNG_X.q)} - ${teksPec(TEPUNG_Y.p, TEPUNG_Y.q)} = ${teksPec(TP.n, TP.m)}`, `= ${teksBil(TP.hasil)}`],
  suara: ucap(
    `Cara kedua, pisahkan bilangan bulat dan pecahan: ${TEPUNG_X.b} dikurangi ${TEPUNG_Y.b} sama dengan ${TP.B}, dan ${TEPUNG_X.p}/${TEPUNG_X.q} dikurangi ${TEPUNG_Y.p}/${TEPUNG_Y.q} sama dengan ${TP.n}/${TP.m}. Gabungannya ${teksBil(TP.hasil)} kilogram, sama dengan cara pertama.`,
  ),
  aria: `Cara dua: bulat ${TP.B}, pecahan ${TP.n}/${TP.m}, hasil ${teksBil(TP.hasil)}`,
};
export const SEL_KARTU1: SelInfo[] = [SEL_SYARAT, SEL_ARSIR, SEL_CARA1, SEL_CARA2];

/* ------------------------------ Kartu 2 ------------------------------ */
const B = selisihBiasa(BEDA_X, BEDA_Y);
export const KPK_BEDA = kpk(keBiasa(BEDA_X).q, keBiasa(BEDA_Y).q);
export const SEL_KPK: SelInfo = {
  kunci: "kpk",
  baris: [`KPK ${BEDA_X.q} dan ${BEDA_Y.q} = ${KPK_BEDA}`, `${teksPec(BEDA_X.p, BEDA_X.q)} = ${teksPec(B.Px, B.m)}; ${teksPec(BEDA_Y.p, BEDA_Y.q)} = ${teksPec(B.Py, B.m)}`],
  suara: ucap(
    `Penyebut berbeda, jadi disamakan dengan KPK. KPK dari ${BEDA_X.q} dan ${BEDA_Y.q} adalah ${KPK_BEDA}. Maka ${BEDA_X.p}/${BEDA_X.q} sama besar dengan ${B.Px}/${B.m}, dan ${BEDA_Y.p}/${BEDA_Y.q} sama besar dengan ${B.Py}/${B.m}.`,
  ),
  aria: `KPK ${BEDA_X.q} dan ${BEDA_Y.q} adalah ${KPK_BEDA}`,
};
export const SEL_BEDA: SelInfo = {
  kunci: "beda",
  baris: [`${teksPec(B.Px, B.m)} - ${teksPec(B.Py, B.m)}`, `= ${teksPec(B.Pn, B.m)}`],
  suara: ucap(`Setelah penyebutnya sama, kurangkan pembilangnya: ${B.Px}/${B.m} dikurangi ${B.Py}/${B.m} sama dengan ${B.Pn}/${B.m}. Hasilnya sudah paling sederhana.`),
  aria: `${B.Px}/${B.m} dikurangi ${B.Py}/${B.m} sama dengan ${B.Pn}/${B.m}`,
};
const K = selisihBiasa(CAMPUR_X, CAMPUR_Y);
const KB = keBiasa(CAMPUR_X);
const KC = keBiasa(CAMPUR_Y);
export const SEL_UBAH: SelInfo = {
  kunci: "ubah",
  baris: [`${teksBil(CAMPUR_X)} = ${teksPec(KB.P, KB.q)}`, `${teksBil(CAMPUR_Y)} = ${teksPec(KC.P, KC.q)}`],
  suara: ucap(
    `Pecahan campuran diubah ke pecahan biasa. ${CAMPUR_X.b} dikali ${CAMPUR_X.q} ditambah ${CAMPUR_X.p} sama dengan ${KB.P}, jadi ${teksBil(CAMPUR_X)} menjadi ${KB.P}/${KB.q}. ${teksBil(CAMPUR_Y)} menjadi ${KC.P}/${KC.q}.`,
  ),
  aria: `${teksBil(CAMPUR_X)} menjadi ${KB.P}/${KB.q}, ${teksBil(CAMPUR_Y)} menjadi ${KC.P}/${KC.q}`,
};
export const SEL_SAMAKAN: SelInfo = {
  kunci: "samakan",
  baris: [`${teksPec(K.Px, K.m)} - ${teksPec(K.Py, K.m)}`, `= ${teksPec(K.Pn, K.m)}`],
  suara: ucap(`Penyebutnya disamakan dengan KPK ${K.m}: ${K.Px}/${K.m} dikurangi ${K.Py}/${K.m} sama dengan ${K.Pn}/${K.m}.`),
  aria: `${K.Px}/${K.m} dikurangi ${K.Py}/${K.m} sama dengan ${K.Pn}/${K.m}`,
};
export const SEL_SEDERHANA: SelInfo = {
  kunci: "sederhana",
  baris: [`${teksPec(K.Pn, K.m)}`, `= ${teksBil(K.hasil)}`],
  suara: ucap(`Disederhanakan, pecahan tak murni ${K.Pn}/${K.m} menjadi pecahan campuran ${teksBil(K.hasil)}.`),
  aria: `${K.Pn}/${K.m} sama dengan ${teksBil(K.hasil)}`,
};
const BS = sederhana(B.Px, B.m);
export const SEL_PERIKSA: SelInfo = {
  kunci: "periksa",
  baris: [`${teksPec(B.Pn, B.m)} + ${teksPec(B.Py, B.m)}`, `= ${teksPec(B.Px, B.m)} = ${teksPec(BS.P, BS.q)}`],
  suara: ucap(`Periksa dengan penjumlahan: ${B.Pn}/${B.m} ditambah ${B.Py}/${B.m} sama dengan ${B.Px}/${B.m}, yaitu ${BS.P}/${BS.q}. Cocok dengan pecahan semula, jadi hasilnya benar.`),
  aria: `${B.Pn}/${B.m} ditambah ${B.Py}/${B.m} sama dengan ${BS.P}/${BS.q}`,
};
export const SEL_KARTU2: SelInfo[] = [SEL_KPK, SEL_BEDA, SEL_UBAH, SEL_SAMAKAN, SEL_SEDERHANA, SEL_PERIKSA];

export const PETUNJUK1_INFO_ADONAN = "Loyang Bu Nani. Ketuk tanda tanya untuk melihat syarat, model arsir, dan dua cara mengurangkan pecahan campuran.";
export const SELESAI1_INFO_ADONAN = "Loyang lengkap! Penyebut sama berarti kurangkan pembilangnya saja.";
export const PETUNJUK2_INFO_ADONAN = "Papan sisa persediaan. Ketuk tanda tanya untuk melihat KPK, hasil, dan pemeriksaan.";
export const SELESAI2_INFO_ADONAN = "Papan lengkap! Penyebut beda disamakan dulu dengan KPK, lalu hasilnya disederhanakan dan diperiksa.";
