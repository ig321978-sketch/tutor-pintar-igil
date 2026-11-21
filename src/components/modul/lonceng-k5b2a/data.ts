/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni" (kelipatan: hasil kali bilangan bulat, nol bukan kelipatan, daftar kelipatan,
 * tabel bilangan berwarna, cek dengan pembagian), awal cerita Pasar Kuliner Malam. Misi lanjutan "Misi Lonceng" (nomor misi berlanjut dari Simulasi).
 * Data berbeda dari Story (kelipatan 4 dan 6, empat belas, tiga puluh enam): jadwal ronda, kembang api, lampu gantung, kios es, parkir, tiket, kalender pasaran, lampu lalu lintas.
 * Seed Cari kesalahan: Fajar menulis kelipatan enam 6, 12, 18, 21 (salah), Citra menyatakan nol bukan kelipatan lima (benar), dan Fajar mewarnai 28 sebagai kelipatan delapan karena ada angka delapan (salah).
 * Concrete memakai stan lonceng pasar dengan lonceng dan kartu bilangan beremoji, Pictorial memakai kertas jadwal polos (garis lompat dan tabel bilangan tanpa emoji), Abstract memakai lembar pengelola pasar (kata dan angka).
 * Angka jawaban Tulis di kanvas per tahap (tidak kembar dalam satu tahap): Concrete 8, 7, 6, 5; Pictorial 5, 8, 7, 3; Abstract 9, 3, 5, 2. Jawaban benar dihitung dari bilangan (logika-data.ts).
 * Diuji: scripts/uji-lonceng-k5b2a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LCek, LIgil, LLompat, LTabel, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_LONCENG_TEKS } from "./data-sim";

const igil = (b: number, p: number, satuan: string): LIgil => ({ tipe: "igil", b, p, satuan });
const lompat = (b: number, p: number, satuan: string): LLompat => ({ tipe: "lompat", b, p, satuan });
const tabel = (b: number, sampai: number, n: number, satuan: string): LTabel => ({ tipe: "tabel", b, sampai, n, satuan });
const cek = (b: number, n: number, satuan: string): LCek => ({ tipe: "cek", b, n, satuan });
const salah = (dasar: LLompat | LTabel | LCek, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false, posisi?: number): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Skip Counting, Grid Marking, Times Check. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isiMisi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isiMisi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: stan lonceng pasar dengan lonceng dan kartu beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Lonceng 2: ronda malam", "Petugas ronda memukul kentongan di sepanjang pasar. Periksa stan dan talinya.", [
    igil(5, 7, "menit"),
    salah(
      lompat(6, 4, "detik"),
      "Fajar",
      "Kelipatan enam itu 6, 12, 18, lalu 21.",
      "21 detik",
      [
        "Fajar keliru, karena kelipatan enam menambah enam tiap kali, jadi setelah 18 datang 24.",
        "Fajar keliru, karena kelipatan enam hanya boleh memakai bilangan yang berakhir dengan angka enam, dan daftarnya berhenti di 18.",
        "Fajar keliru, karena daftar kelipatan enam harus dimulai dari nol.",
      ],
      0,
      "Tiap lompatan harus menambah bilangan yang sama, jadi periksa lagi langkah Fajar.",
      false,
      1,
    ),
    tabel(3, 30, 21, "nomor"),
    cek(8, 52, "tiket"),
  ]),
  C(3, "kanvas", "Misi Lonceng 3: kios es", "Kios es mencatat jadwalnya. Periksa papannya, lalu tulis jawabanmu di kanvas.", [igil(9, 8, "menit"), lompat(7, 6, "detik"), tabel(8, 50, 40, "nomor"), cek(6, 47, "gelas")]),
  C(4, "suara", "Misi Lonceng 4: panggilan kembang api", "Panitia kembang api memanggil lewat pengeras suara. Jawab dengan suaramu.", [igil(3, 9, "detik"), lompat(9, 3, "menit"), tabel(5, 40, 35, "nomor"), cek(7, 58, "gelas")]),
];

/* ------------------------------ Pictorial: kertas jadwal polos tanpa emoji ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Lonceng 5: papan Bima", "Bima menyalin jadwal pasar ke kertasnya. Periksa garis dan tabelnya.", [
    igil(7, 6, "hari"),
    lompat(8, 5, "detik"),
    tabel(9, 50, 45, "nomor"),
    salah(
      cek(5, 0, "tiket"),
      "Citra",
      "Nol dibagi lima habis, tetapi nol bukan kelipatan lima.",
      "habis, bukan kelipatan",
      [
        "Citra benar, karena nol dibagi lima menghasilkan sisa lima, sehingga nol tidak habis dibagi dan tidak pernah menjadi kelipatan.",
        "Citra benar, karena nol adalah bilangan ganjil.",
        "Citra benar, karena kelipatan lima berawal dari satu kali lima, sedangkan nol bukan hasil kali bilangan bulat dengan lima.",
      ],
      2,
      "Ingat dari mana kelipatan lima mulai dihitung, jadi periksa lagi langkah Citra.",
      true,
      2,
    ),
  ]),
  Pi(6, "kanvas", "Misi Lonceng 6: bagan Citra", "Citra menggambar bagan jadwal di kertas. Periksa bagannya, lalu tulis jawabanmu di kanvas.", [igil(6, 5, "menit"), lompat(8, 4, "detik"), tabel(7, 50, 49, "nomor"), cek(5, 38, "gelas")]),
  Pi(7, "suara", "Misi Lonceng 7: lapor ke Bu Marni", "Bima melaporkan kertasnya kepada Bu Marni. Sebutkan jawabanmu.", [igil(8, 7, "menit"), lompat(7, 3, "hari"), tabel(6, 30, 19, "nomor"), cek(9, 81, "mobil")]),
];

/* ------------------------------ Abstract: lembar pengelola pasar (kata dan angka) ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Lonceng 8: lembar pengelola", "Lembar pengelola pasar hanya berisi kata dan angka.", [
    igil(9, 6, "menit"),
    lompat(5, 6, "detik"),
    salah(
      tabel(8, 50, 32, "nomor"),
      "Fajar",
      "Bilangan 28 ikut diwarnai, karena ada angka delapan di dalamnya.",
      "28",
      [
        "Fajar keliru, karena bilangan berwarna harus selalu ganjil dan lebih kecil dari 20.",
        "Fajar keliru, karena angka di dalam bilangan tidak menentukan apa pun; 28 dibagi 8 bersisa 4.",
        "Fajar keliru, karena kelipatan delapan hanya boleh bilangan yang berakhir dengan angka nol atau angka lima.",
      ],
      1,
      "Angka di dalam bilangan tidak menentukan kelipatan, jadi periksa lagi langkah Fajar.",
      false,
      0,
    ),
    cek(7, 59, "tiket"),
  ]),
  A(9, "kanvas", "Misi Lonceng 9: tulis di lembar", "Pengelola pasar meminta kamu menulis jawaban di kanvas.", [igil(7, 9, "hari"), lompat(3, 7, "menit"), tabel(9, 50, 45, "nomor"), cek(8, 74, "kursi")]),
  A(10, "suara", "Misi Lonceng 10: lembar akhir", "Lembar akhir untuk pengelola pasar. Ucapkan jawabannya.", [igil(5, 8, "hari"), lompat(6, 3, "menit"), tabel(7, 50, 40, "nomor"), cek(6, 100, "tiket")]),
];

export const POIN_PENTING = [
  "Kelipatan suatu bilangan adalah hasil kali bilangan bulat dengan bilangan itu: satu kali, dua kali, tiga kali, dan seterusnya.",
  "Daftar kelipatan dimulai dari bilangan itu sendiri, lalu bertambah dengan bilangan yang sama terus-menerus.",
  "Nol bukan kelipatan, walaupun nol kali berapa pun hasilnya nol.",
  "Tabel bilangan berwarna menunjukkan semua kelipatan sekaligus, misalnya kelipatan empat dan kelipatan enam sampai tiga puluh enam.",
  "Memeriksa kelipatan: bagi bilangan itu, dan bilangan itu kelipatan hanya bila habis dibagi tanpa sisa.",
  "Kelipatan tujuh dan sembilan memakai cara yang sama, dan angka di dalam bilangan tidak menentukan kelipatan.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Pak Tarno, penjual bakso, datang membawa gerobak berlonceng yang berbunyi tiap enam menit. Ia ingin tahu kapan loncengnya berbunyi bersamaan dengan lonceng Bu Marni. Menurutmu, bagaimana cara menemukan menit yang sama?";

export const TEMA_LONCENG = {
  concrete: { ikon: "\u{1F514}", nama: "Concrete", cara: "Stan lonceng pasar: lonceng, tali lompat, dan papan bilangan beremoji" },
  pictorial: { ikon: "\u{1F4CF}", nama: "Pictorial", cara: "Kertas jadwal: garis lompat dan tabel bilangan polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar pengelola pasar: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_LONCENG, PICTORIAL as PICTORIAL_LONCENG, ABSTRACT as ABSTRACT_LONCENG };
