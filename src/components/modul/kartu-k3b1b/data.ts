/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab B "Kartu Harga Bu Wati" (tempat angka), cerita Toko Kelontong Pak Joko.
 * Misi lanjutan "Misi Meja Label" (nomor misi berlanjut dari Simulasi). Jawaban tidak hanya angka: memilih angka, jumlah, bilangan, bentuk uraian, tabel, atau kata,
 * satu angka di kanvas, dan satu kata atau bilangan pendek yang diucapkan.
 * Angka jawaban per tahap (tidak kembar dalam satu tahap): Concrete kanvas 7, 2, 4, 8, suara 9; Pictorial kanvas 6, 3, 1, 2, suara 9, 5; Abstract kanvas 4, 2, 7, 6, suara 1.
 * Ruang jawaban sempit (angka satu sampai sembilan): beberapa angka sama dengan angka pada data Story (dua, lima, enam, tujuh, delapan), tetapi tidak kembar dalam satu tahap.
 * Diuji: scripts/uji-kartu-k3b1b.mjs.
 */
import type { Cara, Klaim, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika-cpa";
import { URUT_METODE, instruksi } from "./logika-cpa";

export { MISI_LABEL_TEKS } from "./data-sim";

const salah = (tokoh: string, klaim: Klaim, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string, ik?: string): LangkahSalah => ({
  tipe: "salah",
  tokoh,
  klaim,
  kataTokoh,
  alasan,
  benar,
  keliru,
  ...(ik ? { ik } : {}),
});

const misi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

const T = (t: 0 | 1 | 2): Tempat => t;

/* ------------------------------ Concrete: meja label dengan benda beremoji dan kartu angka ------------------------------ */
const ROTI = "\u{1F35E}";
const KALENG = "\u{1F96B}";
const APEL = "\u{1F34E}";
const BOTOL = "\u{1F37C}";
const PENSIL = "\u{270F}\u{FE0F}";
const TELUR = "\u{1F95A}";
const PERMEN = "\u{1F36C}";

const C = misi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Label 2: label di meja depan", "Bu Wati menaruh label dan kartu angka di meja depan toko. Bantu memeriksa tiap label.", [
    salah(
      "Raka",
      { jenis: "mewakili", n: 341, t: T(1), katak: 4 },
      "Angka empat di label ini mewakili empat.",
      [
        "Raka benar, angka empat mewakili empat di tempat mana pun.",
        "Angka empat ada di tempat puluhan, jadi mewakili empat puluh, bukan empat.",
        "Angka empat mewakili jumlah paling besar karena ada di tengah.",
      ],
      1,
      "Tempat angka menentukan jumlahnya. Angka empat ada di puluhan, jadi mewakili empat puluh, bukan empat.",
      ROTI,
    ),
    { tipe: "mewakili", n: 526, t: T(1), ik: KALENG },
    { tipe: "susun", h: 3, p: 0, s: 7, ik: APEL },
    { tipe: "uraian", n: 618, ik: BOTOL },
  ]),
  C(3, "kanvas", "Misi Meja Label 3: kertas catatan Salsa", "Salsa mencatat label di kertas catatannya. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "tempat", n: 374, t: T(1), ik: PENSIL },
    { tipe: "dua", n: 282, d: 2, ik: TELUR },
    { tipe: "banyak", n: 146, t: T(1), ik: PERMEN },
    { tipe: "isi", n: 538, t: T(2), ik: ROTI },
  ]),
  C(4, "suara", "Misi Meja Label 4: panggilan Pak Joko", "Pak Joko memanggil dari mesin kasir. Jawab dengan suaramu.", [
    { tipe: "mewakili", n: 237, t: T(1), ik: KALENG },
    { tipe: "di", n: 659, d: 5, ik: APEL },
    { tipe: "nol", n: 706, t: T(1), ik: BOTOL },
    { tipe: "isi", n: 934, t: T(0), ik: PENSIL },
  ]),
];

/* ------------------------------ Pictorial: papan kapur dengan tabel tiga tempat dan balok polos ------------------------------ */
const Pi = misi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meja Label 5: papan kapur", "Bima menggambar tabel dan balok di papan kapur untuk Bu Wati. Periksa gambarnya.", [
    salah(
      "Salsa",
      { jenis: "tabel", n: 638, isi: [600, 30, 8] },
      "Aku mengisi tabelnya dengan jumlah yang diwakili tiap angka.",
      [
        "Salsa benar, tabel boleh diisi dengan jumlah yang diwakili tiap angka.",
        "Tabel hanya diisi angka di tiap tempat. Jumlah yang diwakili dipakai saat menguraikan bilangan.",
        "Tabel diisi dari satuan ke ratusan, jadi urutannya terbalik.",
      ],
      1,
      "Tabel tiga tempat diisi dengan angka, bukan dengan jumlahnya. Untuk bilangan itu angkanya enam, tiga, dan delapan.",
    ),
    { tipe: "tabel", n: 429 },
    { tipe: "susun", h: 5, p: 2, s: 0 },
    { tipe: "uraian", n: 275 },
  ]),
  Pi(6, "kanvas", "Misi Meja Label 6: tabel Dika", "Dika menyusun tabel yang lebih lengkap. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "tempat", n: 916, t: T(2) },
    { tipe: "dua", n: 444, d: 4 },
    { tipe: "banyak", n: 281, t: T(2) },
    { tipe: "isi", n: 729, t: T(1) },
  ]),
  Pi(7, "suara", "Misi Meja Label 7: lapor ke Bu Wati", "Bima melaporkan tabelnya kepada Bu Wati. Sebutkan jawabanmu.", [
    { tipe: "mewakili", n: 482, t: T(0) },
    { tipe: "di", n: 317, d: 1 },
    { tipe: "banyak", n: 953, t: T(0) },
    { tipe: "isi", n: 583, t: T(0) },
  ]),
];

/* ------------------------------ Abstract: kasir Pak Joko dengan tabel kata, angka, dan lambang ------------------------------ */
const A = misi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Label 8: kartu di mesin kasir", "Kartu-kartu di mesin kasir hanya berisi kata dan lambang.", [
    salah(
      "Bima",
      { jenis: "uraian", n: 507, bagian: [500, 0, 7] },
      "Bentuk uraiannya lima ratus ditambah nol ditambah tujuh.",
      [
        "Salah, nol tidak perlu ditulis dalam bentuk uraian.",
        "Benar, tiap bagian memakai angka pada tempatnya, dan nol menjaga tempat puluhan.",
        "Salah, bagian pertama seharusnya lima, bukan lima ratus.",
      ],
      1,
      "Bentuk uraian itu sebenarnya benar. Lima ratus ditambah nol ditambah tujuh sama dengan bilangannya, dan nol tetap ditulis supaya tempat puluhan terjaga.",
    ),
    { tipe: "mewakili", n: 913, t: T(0) },
    { tipe: "susun", h: 6, p: 4, s: 0 },
    { tipe: "uraian", n: 830 },
  ]),
  A(9, "kanvas", "Misi Meja Label 9: catatan Raka", "Raka menulis catatannya di mesin kasir. Tulis jawabanmu di kanvas.", [
    { tipe: "tempat", n: 458, t: T(0) },
    { tipe: "dua", n: 565, d: 5 },
    { tipe: "tempat", n: 871, t: T(1) },
    { tipe: "isi", n: 396, t: T(2) },
  ]),
  A(10, "suara", "Misi Meja Label 10: pengumuman penutup", "Pak Joko membacakan pengumuman terakhir di mesin kasir. Jawab dengan suaramu.", [
    { tipe: "mewakili", n: 375, t: T(1) },
    { tipe: "dua", n: 636, d: 6 },
    { tipe: "beda", a: 571, b: 715 },
    { tipe: "isi", n: 183, t: T(0) },
  ]),
];

/** Poin penting (tampilan boleh memakai angka). */
export const POIN_PENTING = [
  "Bilangan tiga angka punya tiga tempat: ratusan, puluhan, dan satuan.",
  "Tempat sebuah angka menentukan jumlah yang diwakilinya. Pada 251, angka 2 mewakili 200, angka 5 mewakili 50, dan angka 1 mewakili 1.",
  "Angka yang sama di tempat berbeda mewakili jumlah berbeda. Angka 6 mewakili 600, 60, atau 6.",
  "Bilangan disusun dari kartu seratus, kartu sepuluh, dan kartu satu.",
  "Bentuk uraian menjumlahkan bagian tiap tempat: 345 = 300 + 40 + 5.",
  "Angka nol menjaga tempat yang kosong. 602 berbeda dari 62.",
  "Tabel tiga tempat diisi dengan angka di tiap tempat, bukan dengan jumlahnya.",
  "Angkanya sama tetapi tempatnya berbeda berarti bilangannya berbeda, misalnya 408 dan 804.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = [
  "Bilangan tiga angka punya tiga tempat: ratusan, puluhan, dan satuan.",
  "Tempat sebuah angka menentukan jumlah yang diwakilinya. Pada dua ratus lima puluh satu, angka dua mewakili dua ratus, angka lima mewakili lima puluh, dan angka satu mewakili satu.",
  "Angka yang sama di tempat berbeda mewakili jumlah berbeda. Angka enam mewakili enam ratus, enam puluh, atau enam.",
  "Bilangan disusun dari kartu seratus, kartu sepuluh, dan kartu satu.",
  "Bentuk uraian menjumlahkan bagian tiap tempat: tiga ratus empat puluh lima sama dengan tiga ratus ditambah empat puluh ditambah lima.",
  "Angka nol menjaga tempat yang kosong. Enam ratus dua berbeda dari enam puluh dua.",
  "Tabel tiga tempat diisi dengan angka di tiap tempat, bukan dengan jumlahnya.",
  "Angkanya sama tetapi tempatnya berbeda berarti bilangannya berbeda, misalnya empat ratus delapan dan delapan ratus empat.",
];

/** Penutup Sub-Bab B dan jembatan ke Sub-Bab C. */
export const PENUTUP_B = "Label harga Bu Wati sudah rapi. Besok Pak Dodi mengantar karung beras, dan Pak Joko ingin tahu bilangan mana yang lebih besar. Menurutmu, bagaimana cara membandingkannya?";

export const TEMA_KARTU = {
  concrete: { ikon: "\u{1F3F7}\u{FE0F}", nama: "Concrete", cara: "Meja label Bu Wati: label harga dan kartu angka seratus, sepuluh, dan satu dari benda beremoji untuk dibaca, disusun, dan diperiksa" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Papan kapur: tabel tiga tempat dan balok polos (lempeng, batang, kotak kecil), tanpa gambar benda" },
  abstract: { ikon: "\u{1F9EE}", nama: "Abstract", cara: "Mesin kasir Pak Joko: tabel kata, angka, dan lambang saja, untuk dipilih, ditulis, dan diucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KARTU, PICTORIAL as PICTORIAL_KARTU, ABSTRACT as ABSTRACT_KARTU };
