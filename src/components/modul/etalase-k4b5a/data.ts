/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi" (ciri-ciri bangun datar: segi banyak, segitiga, dan enam segiempat),
 * awal cerita Toko Keramik Bu Dewi. Misi lanjutan "Misi Etalase" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (jajargenjang dan persegi panjang berdampingan, segienam beraturan, tiga jenis segitiga),
 * kecuali seed Cari kesalahan dari alur (layang-layang yang dikira belah ketupat, trapesium yang punya sepasang sisi sejajar).
 * Concrete memakai keramik berwarna di rak etalase, Pictorial memakai diagram polos di kertas denah (tanda sudut siku-siku, panah sejajar, garis sisi sama panjang),
 * Abstract memakai kartu kata dan angka di lembar katalog Bu Dewi.
 * Jawaban beragam: memilih nama bangun (klik), menulis satu angka di kanvas, dan mengucapkan satu kata. Jawaban benar dihitung dari koordinat bangun.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 2, 3, 4, 1; Pictorial 6, 4, 3, 2; Abstract 5, 4, 1, 2 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-etalase-k4b5a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LJenis, LKenali, LPilah, LPohon, LSisi, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_ETALASE_TEKS } from "./data-sim";

const kenali = (b: string, tanya?: "nama"): LKenali => ({ tipe: "kenali", b, ...(tanya ? { tanya } : {}) });
const pilah = (daftar: string[], n: number): LPilah => ({ tipe: "pilah", daftar, n });
const sisi = (b: string, tanya: "siku" | "sejajar" = "siku"): LSisi => ({ tipe: "sisi", b, tanya });
const pohon = (i: number): LPohon => ({ tipe: "pohon", i });
const jenis = (b: string, menurut: "sisi" | "sudut"): LJenis => ({ tipe: "jenis", b, menurut });
const salah = (dasar: LSisi | LPohon, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Sort the Tiles, Sides and Corners, Shape Family Tree. */
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
    }),
  });

/* ------------------------------ Concrete: keramik berwarna di rak etalase ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Etalase 2: rak keramik", "Bu Dewi mengisi katalog dari keramik di rak. Periksa gambarnya.", [
    kenali("segienam-sembarang"),
    pilah(["persegi", "trapesium", "segitiga-sama-kaki", "belah-ketupat"], 4),
    salah(
      sisi("layang-layang"),
      "Satria",
      "Keramik ini belah ketupat, karena sama-sama punya sisi yang sama panjang.",
      "belah ketupat",
      [
        "Satria keliru, karena bangun ini hanya punya dua pasang sisi bersebelahan yang sama panjang, bukan semua sisinya.",
        "Satria keliru, karena semua bangun yang punya sisi sama panjang pasti belah ketupat.",
        "Satria keliru, karena bangun ini tidak punya sisi yang sama panjang sama sekali.",
      ],
      0,
      "Sisi sama panjang saja belum cukup untuk menamai bangun, jadi periksa lagi langkah Satria.",
    ),
    pohon(7),
  ]),
  C(3, "kanvas", "Misi Etalase 3: papan Bu Dewi", "Bu Dewi mencatat bentuk keramik di papan jalannya. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    jenis("segitiga-siku", "sudut"),
    pilah(["segitiga-sama-sisi", "persegi", "segitiga-siku", "trapesium", "segitiga-tumpul", "segilima-sembarang"], 3),
    sisi("persegi", "siku"),
    pohon(4),
  ]),
  C(4, "suara", "Misi Etalase 4: panggilan Bu Dewi", "Bu Dewi memanggil dari balik etalase. Jawab dengan suaramu.", [
    kenali("segienam-beraturan"),
    pilah(["persegi", "trapesium", "layang-layang", "segitiga-siku", "jajargenjang"], 4),
    sisi("belah-ketupat", "sejajar"),
    pohon(5),
  ]),
];

/* ------------------------------ Pictorial: kertas denah dengan diagram polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Etalase 5: denah Genta", "Genta menyalin keramik ke kertas denah. Periksa gambarnya.", [
    jenis("segitiga-sama-kaki", "sisi"),
    pilah(["belah-ketupat", "layang-layang", "segilima-beraturan", "persegi-panjang"], 4),
    salah(
      sisi("trapesium", "sejajar"),
      "Genta",
      "Keramik ini trapesium, karena punya sepasang sisi yang sejajar.",
      "trapesium",
      [
        "Genta benar, karena bangun seperti itu harus punya dua pasang sisi sejajar.",
        "Genta benar, karena bangun dengan sepasang sisi sejajar pasti punya empat sudut siku-siku.",
        "Genta benar, karena sepasang sisi sejajar adalah ciri yang cocok dengan nama yang ia sebut.",
      ],
      2,
      "Jawaban Genta benar karena sepasang sisi sejajar adalah ciri khas bangun yang ia sebut.",
      true,
    ),
    pohon(2),
  ]),
  Pi(6, "kanvas", "Misi Etalase 6: bagan Laras", "Laras menggambar bagan keramik. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    kenali("segienam-sembarang"),
    pilah(["persegi", "belah-ketupat", "trapesium", "jajargenjang", "segitiga-siku"], 4),
    sisi("segienam-beraturan", "sejajar"),
    pohon(0),
  ]),
  Pi(7, "suara", "Misi Etalase 7: lapor ke Bu Dewi", "Genta melaporkan bagannya kepada Bu Dewi. Sebutkan jawabanmu.", [
    jenis("segitiga-sembarang", "sisi"),
    pilah(["segilima-sembarang", "persegi", "segitiga-siku", "segilima-beraturan", "trapesium"], 5),
    sisi("jajargenjang", "sejajar"),
    pohon(6),
  ]),
];

/* ------------------------------ Abstract: lembar katalog Bu Dewi dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Etalase 8: katalog Bu Dewi", "Katalog Bu Dewi hanya berisi kata dan angka.", [
    jenis("segitiga-tumpul", "sudut"),
    pilah(["persegi", "jajargenjang", "trapesium", "segienam-beraturan"], 4),
    sisi("segiempat-sembarang", "siku"),
    salah(
      pohon(1),
      "Satria",
      "Jajargenjang yang diberi tambahan empat sisi sama panjang menjadi persegi panjang.",
      "persegi panjang",
      [
        "Satria keliru, karena persegi panjang juga punya sisi yang sama panjang.",
        "Satria keliru, karena persegi panjang punya tambahan empat sudut siku-siku, bukan empat sisi sama panjang.",
        "Satria keliru, karena jajargenjang tidak bisa diberi tambahan ciri apa pun.",
      ],
      1,
      "Periksa lagi tambahan ciri yang diberikan, lalu cocokkan dengan nama bangunnya.",
    ),
  ]),
  A(9, "kanvas", "Misi Etalase 9: tulis di katalog", "Bu Dewi meminta kamu menulis jawaban di kanvas.", [
    kenali("segilima-sembarang"),
    pilah(["persegi", "segitiga-siku", "jajargenjang", "trapesium", "segilima-sembarang", "belah-ketupat"], 4),
    sisi("trapesium", "sejajar"),
    pohon(2),
  ]),
  A(10, "suara", "Misi Etalase 10: katalog akhir", "Katalog akhir untuk Bu Dewi. Ucapkan jawabannya.", [
    kenali("segiempat-sembarang", "nama"),
    pilah(["segienam-beraturan", "segilima-beraturan", "segilima-sembarang", "segienam-sembarang"], 6),
    sisi("layang-layang", "siku"),
    pohon(3),
  ]),
];

export const POIN_PENTING = [
  "Segi banyak adalah bangun tertutup yang dibatasi paling sedikit 3 ruas garis lurus.",
  "Segi banyak beraturan: semua sisinya sama panjang dan semua sudutnya sama besar.",
  "Menurut sisinya, segitiga ada yang sama sisi, sama kaki, dan sembarang. Menurut sudutnya: siku-siku, lancip, dan tumpul.",
  "Persegi: 4 sisi sama panjang dan 4 sudut siku-siku. Persegi panjang: 2 pasang sisi sama panjang dan 4 sudut siku-siku.",
  "Jajargenjang dan belah ketupat punya 2 pasang sisi sejajar. Belah ketupat punya 4 sisi sama panjang.",
  "Layang-layang: 2 pasang sisi bersebelahan sama panjang. Trapesium: tepat sepasang sisi sejajar. Segiempat sembarang: tidak ada sisi yang sama panjang.",
  "Persegi juga persegi panjang, persegi panjang juga jajargenjang, dan belah ketupat juga layang-layang. Trapesium bukan jajargenjang.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Pak Rudi, tukang pasang keramik, datang membawa kotak berisi keping keramik yang pecah. Ia ingin keping-keping itu dirangkai menjadi mosaik untuk pameran. Menurutmu, bagaimana keping kecil bisa dirangkai menjadi bentuk yang besar?";

export const TEMA_ETALASE = {
  concrete: { ikon: "\u{1F3FA}", nama: "Concrete", cara: "Etalase toko: keramik berwarna di rak kayu" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas denah: garis tepi, tanda sudut siku-siku, dan panah sejajar" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar katalog Bu Dewi: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_ETALASE, PICTORIAL as PICTORIAL_ETALASE, ABSTRACT as ABSTRACT_ETALASE };
