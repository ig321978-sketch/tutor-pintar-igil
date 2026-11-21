/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari" (uraian, tukar sepuluh antar kolom, banyak cara menyusun, kembali ke bentuk biasa
 * dengan nol penjaga), lanjutan cerita Hari Pertandingan di Stadion Kota. Misi lanjutan "Misi Bundel" (nomor misi berlanjut dari Simulasi).
 * Data berbeda dari Story (24.350, 18.705, 30.402, 43.206, 70.580) dan Infografis: kupon parkir, stiker klub, bendera, dan tiket lain. Seed Cari kesalahan dari alur:
 * Fajar menguraikan 40.205 menjadi 40.000 + 200 + 50 (keliru, lima di satuan), Bima menyatakan sepuluh pak boleh ditukar satu dus tanpa mengubah jumlah (benar),
 * dan Fajar menulis uraian 80.000 + 300 + 5 sebagai 8.305 (keliru, nol penjaga hilang).
 * Concrete memakai rak gudang tiket dengan bundel berwarna dan ikon beremoji, Pictorial memakai bagan bundel polos (kotak SVG, tanpa emoji), Abstract memakai kartu tabel dan angka bercap panitia.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu kata. Jawaban benar dihitung dari data (logika-data.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 3, 9, 4, 2; Pictorial 4, 5, 7, 2; Abstract 4, 8, 6, 2 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-bundel-k5b1c.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LIgil, LSusun, LTukar, LUrai, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";
import type { Susunan } from "./logika-data";

export { MISI_BUNDEL_TEKS } from "./data-sim";

const igil = (n: number, j: number, satuan: string): LIgil => ({ tipe: "igil", n, j, satuan });
const urai = (n: number, j: number, satuan: string): LUrai => ({ tipe: "urai", n, j, satuan });
const tukar = (s: Susunan, i: number, arah: "turun" | "naik", satuan: string): LTukar => ({ tipe: "tukar", s, i, arah, satuan });
const susun = (n: number, satuan: string): LSusun => ({ tipe: "susun", n, satuan });
const salah = (dasar: LUrai | LTukar | LSusun, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false, posisi?: number): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Break It Apart, Swap Bundles, Build It Back. */
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

/* ------------------------------ Concrete: rak gudang tiket dengan bundel berwarna dan ikon beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Bundel 2: kupon parkir", "Bu Lestari menata kupon parkir di rak gudang. Periksa raknya.", [
    igil(52640, 2, "kupon"),
    salah(
      urai(40205, 4, "tiket"),
      "Fajar",
      "Empat puluh ribu dua ratus lima diuraikan menjadi empat puluh ribu, dua ratus, dan lima puluh.",
      "40.000 + 200 + 50",
      [
        "Fajar keliru, karena angka terakhir berada di kolom satuan, bukan di kolom puluhan.",
        "Fajar keliru, karena kolom yang berisi nol harus ditulis juga di dalam uraian itu.",
        "Fajar keliru, karena uraian harus selalu dimulai dari kolom yang paling kanan.",
      ],
      0,
      "Angka terakhir harus ditulis menurut kolom satuan, jadi periksa lagi langkah Fajar.",
      false,
      1,
    ),
    tukar([3, 6, 4, 7, 0], 1, "turun", "tiket"),
    susun(60904, "tiket"),
  ]),
  C(3, "kanvas", "Misi Bundel 3: catatan Bu Lestari", "Bu Lestari mencatat stiker klub di rak gudang. Periksa raknya, lalu tulis jawabanmu di kanvas.", [
    igil(73285, 1, "stiker"),
    urai(84916, 2, "stiker"),
    tukar([2, 5, 6, 0, 3], 1, "turun", "stiker"),
    susun(20703, "stiker"),
  ]),
  C(4, "suara", "Misi Bundel 4: panggilan Bu Lestari", "Bu Lestari memanggil dari balik rak. Jawab dengan suaramu.", [
    igil(15830, 1, "bendera"),
    urai(36708, 0, "bendera"),
    tukar([1, 2, 3, 14, 0], 2, "naik", "bendera"),
    susun(71095, "bendera"),
  ]),
];

/* ------------------------------ Pictorial: bagan bundel polos tanpa emoji ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Bundel 5: bagan Bima", "Bima menyalin rak ke bagan polos. Periksa bagannya.", [
    igil(61930, 3, "tiket"),
    urai(57106, 3, "tiket"),
    salah(
      tukar([2, 4, 12, 3, 5], 1, "naik", "tiket"),
      "Bima",
      "Sepuluh pak ditukar satu dus, jadi susunannya menjadi dua kardus, lima dus, dua pak, tiga ikat, dan lima lembar.",
      "2 kardus, 5 dus, 2 pak, 3 ikat, 5 lembar",
      [
        "Bima benar, karena kolom yang ditukar selalu menjadi kosong sesudah penukaran selesai.",
        "Bima benar, karena setelah ditukar jumlah tiketnya bertambah sedikit di kolom sebelah kanan.",
        "Bima benar, karena sepuluh bundel kecil sama banyak dengan satu bundel besar di kolom kirinya.",
      ],
      2,
      "Jawaban Bima benar karena sepuluh bundel kecil sama banyak dengan satu bundel besar, jadi jumlahnya tetap.",
      true,
      0,
    ),
    susun(30508, "tiket"),
  ]),
  Pi(6, "kanvas", "Misi Bundel 6: bagan Citra", "Citra menggambar bagan hitungan tiket. Periksa bagannya, lalu tulis jawabanmu di kanvas.", [
    igil(46127, 0, "tiket"),
    urai(29358, 3, "tiket"),
    tukar([3, 2, 17, 1, 6], 1, "naik", "tiket"),
    susun(50206, "tiket"),
  ]),
  Pi(7, "suara", "Misi Bundel 7: lapor ke Bu Lestari", "Bima melaporkan baganya kepada Bu Lestari. Sebutkan jawabanmu.", [
    igil(28604, 2, "tiket"),
    urai(41520, 0, "tiket"),
    tukar([2, 6, 1, 5, 0], 0, "turun", "tiket"),
    susun(93048, "tiket"),
  ]),
];

/* ------------------------------ Abstract: kartu data bercap panitia stadion ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Bundel 8: lembar panitia", "Lembar panitia stadion hanya berisi kata dan angka.", [
    igil(38250, 0, "tiket"),
    urai(67420, 2, "tiket"),
    tukar([4, 3, 7, 2, 6], 2, "turun", "tiket"),
    salah(
      susun(80305, "tiket"),
      "Fajar",
      "Uraian delapan puluh ribu, tiga ratus, dan lima cukup ditulis delapan ribu tiga ratus lima.",
      "8.305",
      [
        "Fajar keliru, karena uraian harus ditulis mulai dari kolom paling kanan lebih dulu, baru ke kiri.",
        "Fajar keliru, karena kolom yang kosong harus diisi nol supaya angka lain tetap di kolomnya.",
        "Fajar keliru, karena angka nol harus selalu ditaruh di kolom paling kiri pada bilangan itu.",
      ],
      1,
      "Kolom yang kosong harus diisi nol, jadi periksa lagi langkah Fajar.",
      false,
      2,
    ),
  ]),
  A(9, "kanvas", "Misi Bundel 9: tulis di lembar", "Panitia meminta kamu menulis jawaban di kanvas.", [
    igil(75314, 4, "tiket"),
    urai(18462, 1, "tiket"),
    tukar([6, 1, 0, 4, 16], 3, "naik", "tiket"),
    susun(60407, "tiket"),
  ]),
  A(10, "suara", "Misi Bundel 10: lembar akhir", "Lembar akhir untuk panitia. Ucapkan jawabannya.", [
    igil(35960, 3, "tiket"),
    urai(90412, 0, "tiket"),
    tukar([2, 3, 4, 1, 0], 1, "turun", "tiket"),
    susun(48730, "tiket"),
  ]),
];

export const POIN_PENTING = [
  "Uraian menulis bilangan menurut kolomnya, misalnya 24.350 = 20.000 + 4.000 + 300 + 50.",
  "Kolom yang berisi nol boleh dilewati pada uraian, tetapi angka nol tidak boleh hilang saat menulis bilangan.",
  "Sepuluh bundel di satu kolom ditukar satu bundel di kolom sebelah kirinya, dan sebaliknya.",
  "Menukar bundel mengubah banyak bundel, tetapi tidak mengubah jumlah tiket.",
  "Satu bilangan dapat disusun dengan banyak cara, dan jumlahnya selalu sama.",
  "Menyusun kembali: taruh tiap bagian ke kolomnya, isi nol di kolom yang kosong, lalu tulis angkanya berurutan.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab D. */
export const PENUTUP_C =
  "Pak Darmo, ketua panitia, datang membawa papan jepit dan pulpen. Ia ingin tahu jumlah semua penonton keempat tribun, dan berapa kursi yang masih kosong. Menurutmu, bagaimana menjumlahkan empat bilangan sebesar itu?";

export const TEMA_BUNDEL = {
  concrete: { ikon: "\u{1F4E6}", nama: "Concrete", cara: "Gudang tiket: rak dengan bundel berwarna dan ikon beremoji" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas bagan: bundel polos berupa kotak berwarna" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar panitia stadion: kartu tabel dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_BUNDEL, PICTORIAL as PICTORIAL_BUNDEL, ABSTRACT as ABSTRACT_BUNDEL };
