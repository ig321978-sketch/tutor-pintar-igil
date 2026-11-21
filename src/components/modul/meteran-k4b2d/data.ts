/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas" (pecahan per sepuluh dan per seratus menjadi desimal),
 * awal cerita dari Sub-Bab C ke Sub-Bab E di Sanggar Batik Kampung Mekar. Misi lanjutan "Misi Meteran" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story
 * (tiga per sepuluh, tujuh per sepuluh, dua puluh tujuh per seratus, tiga puluh lima per seratus, empat puluh lima per seratus, sembilan per seratus). Concrete memakai kain, pita, benang, dan wol beremoji
 * di meja ukur Pak Bagas (kisi tetap), Pictorial memakai kisi polos dan jembatan polos di kertas milimeter, Abstract memakai kartu kata dan angka di nota Pak Bagas.
 * Jawaban beragam: memilih desimal berkoma, menulis satu angka di kanvas, dan mengucapkan satu kata (persepuluhan, perseratusan, sama, berbeda).
 * Jawaban benar dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 5, 6, 8, 4; Pictorial 5, 8, 4, 2; Abstract 9, 5, 6, 1 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-meteran-k4b2d.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LJembatan, LSepuluh, LSeratus, Penyebut, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_METERAN_TEKS } from "./data-sim";

const sep = (benda: string, p: number, klaim?: string): LSepuluh => ({ tipe: "sepuluh", benda, p, ...(klaim === undefined ? {} : { klaim }) });
const ser = (benda: string, q: number, klaim?: string): LSeratus => ({ tipe: "seratus", benda, q, ...(klaim === undefined ? {} : { klaim }) });
const jem = (benda: string, m: number, den: Penyebut, klaim?: string): LJembatan => ({ tipe: "jembatan", benda, m, den, ...(klaim === undefined ? {} : { klaim }) });
const salah = (dasar: LSepuluh | LSeratus | LJembatan, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Tenths Grid, Hundredths Grid, Fraction Decimal Bridge. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }) as LangkahSoal[],
  });

/* ------------------------------ Concrete: meja ukur Pak Bagas dengan kain, pita, benang, dan wol beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meteran 2: gulungan kain", "Pak Bagas memotong kain dari gulungan di meja ukurnya. Periksa gambarnya.", [
    salah(
      sep("kain", 7),
      "Satria",
      "Tujuh per sepuluh ditulis nol koma nol tujuh, karena ada angka tujuh dan angka nol dari sepuluh.",
      "0,07",
      [
        "Satria benar, penyebut sepuluh memberi dua angka di belakang koma.",
        "Satria keliru: penyebut sepuluh hanya memberi satu angka di belakang koma, jadi tidak ada nol tambahan.",
        "Satria keliru, angka tujuh harus ditulis di depan koma.",
      ],
      1,
      "Penyebut sepuluh hanya memberi satu angka di belakang koma, jadi tidak ada nol tambahan.",
    ),
    sep("benang", 4),
    ser("pita", 64),
    jem("kain", 8, 100),
  ]),
  C(3, "kanvas", "Misi Meteran 3: papan harga", "Pak Bagas menulis panjang kain di papan harga. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [ser("kain", 53), sep("wol", 6), ser("pita", 81), jem("benang", 24, 100)]),
  C(4, "suara", "Misi Meteran 4: panggilan Pak Hendro", "Pak Hendro memanggil dari depan sanggar. Jawab dengan suaramu.", [sep("pita", 2, "0,2"), sep("wol", 5), ser("kain", 18, "0,18"), jem("benang", 4, 10, "0,04")]),
];

/* ------------------------------ Pictorial: kertas milimeter dengan kisi polos dan jembatan polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meteran 5: kertas ukur", "Genta menggambar kain di kertas milimeter. Periksa gambarnya.", [
    salah(
      ser("kain", 16),
      "Laras",
      "Menurutku, enam belas per seratus ditulis nol koma satu enam, karena penyebut seratus memberi dua angka di belakang koma.",
      "0,16",
      [
        "Laras keliru, penyebut seratus hanya memberi satu angka di belakang koma.",
        "Laras keliru, desimalnya harus nol koma nol satu enam.",
        "Laras benar: penyebut seratus memberi dua angka di belakang koma, jadi enam belas ditulis nol koma satu enam.",
      ],
      2,
      "Jawaban Laras benar. Penyebut seratus memberi dua angka di belakang koma, jadi enam belas ditulis nol koma satu enam.",
      true,
    ),
    sep("kain", 1),
    ser("kain", 72),
    jem("kain", 12, 100),
  ]),
  Pi(6, "kanvas", "Misi Meteran 6: kapur Laras", "Laras menghitung bagian pada kisi yang lain. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [jem("kain", 5, 10), sep("kain", 8), ser("kain", 42), jem("kain", 2, 100)]),
  Pi(7, "suara", "Misi Meteran 7: lapor ke Pak Bagas", "Genta melaporkan hasil hitungannya kepada Pak Bagas. Sebutkan jawabanmu.", [ser("kain", 64), sep("kain", 9, "0,09"), ser("kain", 86, "0,86"), jem("kain", 2, 10)]),
];

/* ------------------------------ Abstract: nota Pak Bagas dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meteran 8: nota kain", "Nota Pak Bagas hanya berisi kata dan angka.", [
    ser("kain", 94),
    sep("kain", 2),
    ser("kain", 58),
    salah(
      jem("kain", 6, 100),
      "Satria",
      "Enam per seratus ditulis nol koma enam, karena angka enam diletakkan tepat di belakang koma.",
      "0,6",
      [
        "Satria benar, angka enam selalu ditulis tepat di belakang koma.",
        "Satria keliru, penyebut seratus tidak memberi angka di belakang koma.",
        "Satria keliru: penyebut seratus memberi dua angka di belakang koma, jadi tempat persepuluhan diisi nol.",
      ],
      2,
      "Penyebut seratus memberi dua angka di belakang koma, jadi tempat persepuluhan diisi nol.",
    ),
  ]),
  A(9, "kanvas", "Misi Meteran 9: tulis di nota", "Satria meminta kamu menulis jawaban di kanvas.", [jem("kain", 9, 10), sep("kain", 5), ser("kain", 63), jem("kain", 21, 100)]),
  A(10, "suara", "Misi Meteran 10: nota akhir", "Nota akhir untuk Pak Bagas. Ucapkan jawabannya.", [sep("kain", 8, "0,08"), sep("kain", 4), ser("kain", 96, "0,96"), jem("kain", 34, 100)]),
];

export const POIN_PENTING = [
  "Pecahan per sepuluh ditulis dengan satu angka di belakang koma, misalnya 3/10 = 0,3.",
  "Pecahan per seratus ditulis dengan dua angka di belakang koma, misalnya 27/100 = 0,27.",
  "Angka pertama di belakang koma menunjukkan persepuluhan, angka kedua menunjukkan perseratusan.",
  "Bila pembilangnya satu angka dan penyebutnya seratus, tempat persepuluhan diisi nol, misalnya 3/100 = 0,03.",
  "Penyebut 10 memberi satu angka di belakang koma, penyebut 100 memberi dua angka.",
  "Pecahan dan desimal yang sama menunjukkan besar yang sama, jadi keduanya dapat dihubungkan seperti jembatan.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab E. */
export const PENUTUP_D =
  "Pak Bagas menutup meterannya dengan senang. Besok Bu Tuti, panitia pameran, datang membawa papan pameran untuk mencatat kain yang terjual. Angkanya akan ditulis dengan tanda persen. Menurutmu, bagaimana menulis nol koma lima dengan persen?";

export const TEMA_METERAN = {
  concrete: { ikon: "\u{1F9F5}", nama: "Concrete", cara: "Meja ukur Pak Bagas: kain, pita, benang, dan wol beremoji pada kisi tetap berukuran meteran" },
  pictorial: { ikon: "\u{1F4CF}", nama: "Pictorial", cara: "Kertas milimeter polos: kisi sepuluh kolom, kisi seratus kotak, dan jembatan pecahan ke desimal tanpa gambar benda" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Nota Pak Bagas: kartu kata dan angka di kertas nota bergaris, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_METERAN, PICTORIAL as PICTORIAL_METERAN, ABSTRACT as ABSTRACT_METERAN };
