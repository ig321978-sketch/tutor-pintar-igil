/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati" (faktor: bagi tanpa sisa, pasangan faktor, daftar faktor, cek bagi),
 * lanjutan cerita Pasar Kuliner Malam. Misi lanjutan "Misi Piring" (nomor misi berlanjut dari Simulasi).
 * Data berbeda dari Story dan Infografis (12, 18, 24, 28, 36, 48): bilangan kecil sampai ratusan untuk kue, pita, dan lembar pengelola pasar. Seed Cari kesalahan dari alur:
 * Fajar menyebut faktor sepuluh hanya dua dan lima (keliru, satu dan sepuluh dibuang), Citra menyatakan tujuh bukan faktor dua puluh karena bersisa (benar),
 * dan Fajar mengira empat puluh lima klepon habis dibagi ke piring berisi enam klepon (keliru, tersisa tiga).
 * Concrete memakai baki dan piring klepon beremoji, Pictorial memakai pita petak polos (kotak SVG, tanpa emoji), Abstract memakai kartu tabel dan angka bercap pengelola pasar.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu bilangan. Jawaban benar dihitung dari data (logika-data.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 2, 5, 7, 4; Pictorial 9, 7, 5, 1; Abstract 7, 8, 6, 4 (tidak kembar dalam satu tahap).
 * Angka jawaban Suara per tahap: Concrete 8, 9, 6, 5; Pictorial 6, 4, 8, 5; Abstract 8, 9, 6, 7.
 * Diuji: scripts/uji-piring-k5b2c.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LCek, LIgil, LPasang, LPotong, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_PIRING_TEKS } from "./data-sim";

const igil = (n: number, b: number, satuan: string): LIgil => ({ tipe: "igil", n, b, satuan });
const potong = (n: number, p: number, satuan: string): LPotong => ({ tipe: "potong", n, p, satuan });
const pasang = (n: number, a: number, satuan: string): LPasang => ({ tipe: "pasang", n, a, satuan });
const cek = (n: number, x: number, satuan: string): LCek => ({ tipe: "cek", n, x, satuan });
const salah = (dasar: LPotong | LPasang | LCek, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false, posisi?: number): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul } : {}),
  ...(posisi !== undefined ? { posisi } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Cut and Count, Pair Up, Divide Check. */
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

/* ------------------------------ Concrete: baki dan piring klepon beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Piring 2: pesanan meja", "Bu Wati menerima pesanan di meja pasar. Periksa bakinya.", [
    igil(15, 3, "klepon"),
    potong(21, 7, "pastel"),
    salah(
      pasang(10, 2, "klepon"),
      "Fajar",
      "Faktor sepuluh hanya dua dan lima, karena satu dan sepuluh terlalu mudah.",
      "2, 5",
      [
        "Fajar keliru, karena satu dan bilangan itu sendiri selalu menjadi faktor.",
        "Fajar keliru, karena faktor sebuah bilangan harus berupa bilangan ganjil semuanya.",
        "Fajar keliru, karena faktor tidak boleh lebih kecil daripada separuh bilangannya.",
      ],
      0,
      "Satu dan bilangan itu sendiri selalu faktor, jadi periksa lagi langkah Fajar.",
      false,
      1,
    ),
    cek(26, 4, "sate"),
  ]),
  C(3, "kanvas", "Misi Piring 3: catatan Bu Wati", "Bu Wati mencatat pesanan berikutnya. Periksa bakinya, lalu tulis jawabanmu di kanvas.", [
    igil(22, 2, "kue"),
    potong(30, 6, "klepon"),
    pasang(14, 2, "pastel"),
    cek(25, 7, "sate"),
  ]),
  C(4, "suara", "Misi Piring 4: panggilan Bu Wati", "Bu Wati memanggil dari balik meja. Jawab dengan suaramu.", [
    igil(16, 2, "klepon"),
    potong(27, 9, "kue"),
    pasang(20, 2, "sate"),
    cek(29, 5, "pastel"),
  ]),
];

/* ------------------------------ Pictorial: pita petak polos tanpa emoji ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Piring 5: pita Bima", "Bima menggambar pita petak di kertas. Periksa pitanya.", [
    igil(40, 5, "petak"),
    potong(35, 5, "petak"),
    pasang(32, 2, "petak"),
    salah(
      cek(20, 7, "petak"),
      "Citra",
      "Dua puluh dibagi tujuh menghasilkan dua bagian dan bersisa enam, jadi tujuh bukan faktor dua puluh.",
      "2 bagian, sisa 6 petak",
      [
        "Citra benar, karena bilangan yang bersisa saat dibagi pasti bukan faktor.",
        "Citra benar, karena faktor harus selalu lebih kecil daripada separuh bilangan itu.",
        "Citra benar, karena bilangan sebesar tujuh tidak mungkin menjadi faktor.",
      ],
      0,
      "Jawaban Citra benar karena hasil bagi masih bersisa, jadi bilangan pembaginya bukan faktor.",
      true,
      0,
    ),
  ]),
  Pi(6, "kanvas", "Misi Piring 6: pita Citra", "Citra memotong pita petak lain. Periksa pitanya, lalu tulis jawabanmu di kanvas.", [
    igil(45, 9, "petak"),
    potong(42, 6, "petak"),
    pasang(40, 8, "petak"),
    cek(46, 9, "petak"),
  ]),
  Pi(7, "suara", "Misi Piring 7: lapor ke Bu Wati", "Bima melaporkan pitanya kepada Bu Wati. Sebutkan jawabanmu.", [
    igil(30, 5, "petak"),
    potong(44, 4, "petak"),
    pasang(42, 2, "petak"),
    cek(47, 9, "petak"),
  ]),
];

/* ------------------------------ Abstract: kartu data bercap pengelola pasar ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Piring 8: lembar pengelola", "Lembar pengelola pasar hanya berisi kata dan angka.", [
    igil(60, 5, "klepon"),
    salah(
      potong(45, 5, "klepon"),
      "Fajar",
      "Empat puluh lima klepon bisa dibagi ke piring berisi enam klepon tanpa sisa.",
      "6 klepon",
      [
        "Fajar keliru, karena isi piring harus selalu berupa bilangan genap saja.",
        "Fajar keliru, karena empat puluh lima dibagi enam masih menyisakan klepon.",
        "Fajar keliru, karena isi piring tidak boleh lebih besar daripada separuh banyak klepon.",
      ],
      1,
      "Isi piring harus membagi semua klepon tanpa sisa, jadi periksa lagi langkah Fajar.",
      false,
      2,
    ),
    pasang(54, 6, "pastel"),
    cek(75, 9, "sate"),
  ]),
  A(9, "kanvas", "Misi Piring 9: tulis di lembar", "Pengelola pasar meminta kamu menulis jawaban di kanvas.", [
    igil(63, 7, "kue"),
    potong(72, 9, "pastel"),
    pasang(96, 16, "klepon"),
    cek(58, 9, "sate"),
  ]),
  A(10, "suara", "Misi Piring 10: lembar akhir", "Lembar akhir untuk pengelola pasar. Ucapkan jawabannya.", [
    igil(56, 7, "klepon"),
    potong(63, 9, "pastel"),
    pasang(50, 5, "kue"),
    cek(85, 12, "sate"),
  ]),
];

export const POIN_PENTING = [
  "Faktor adalah bilangan cacah yang membagi bilangan lain tanpa sisa, misalnya faktor 12 adalah 1, 2, 3, 4, 6, dan 12.",
  "Potong dan hitung: bagi sama banyak tanpa sisa, lalu isi tiap piring dan banyak piringnya sama-sama menjadi faktor.",
  "Faktor selalu berpasangan, dan hasil kali tiap pasangan sama dengan bilangan itu, misalnya 3 x 6 = 18.",
  "Satu dan bilangan itu sendiri selalu menjadi faktor, jadi tidak boleh dibuang dari daftar.",
  "Cek bagi: kalau sisanya nol, bilangan itu faktor; kalau bersisa, bukan faktor, misalnya 18 dibagi 5 bersisa 3.",
  "Berhenti mencari ketika pasangan faktor sudah bertemu di tengah, supaya tidak ada faktor yang terlewat.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab D. */
export const PENUTUP_C =
  "Pak Joko, pengemas bingkisan, datang membawa dua puluh empat klepon dan delapan belas onde-onde. Ia ingin mengisi kotak-kotak bingkisan dengan klepon dan onde-onde yang sama banyaknya. Menurutmu, berapa kotak yang bisa dibuat?";

export const TEMA_PIRING = {
  concrete: { ikon: "\u{1F361}", nama: "Concrete", cara: "Meja Bu Wati: baki dan piring dengan klepon beremoji" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas pita: pita petak polos yang dipotong sama panjang" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar pengelola pasar: kartu tabel dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PIRING, PICTORIAL as PICTORIAL_PIRING, ABSTRACT as ABSTRACT_PIRING };
