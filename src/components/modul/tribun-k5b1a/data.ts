/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih" (membaca dan menulis bilangan sampai seratus ribu: tabel tempat lima kolom,
 * nol penjaga, titik pemisah dan baca per periode), awal cerita Hari Pertandingan di Stadion Kota. Misi lanjutan "Misi Tribun" (nomor misi berlanjut dari Simulasi).
 * Data berbeda dari Story (24.350, 18.705, 9.060, 30.402): bilangan lain untuk tiket, parkir, kursi, lampu, bendera, dan kios. Seed Cari kesalahan dari alur:
 * Fajar menulis empat puluh ribu tujuh sebagai 4.700 (nol penjaga hilang; salah), Citra menaruh titik pemisah tiga angka dari kanan (benar),
 * dan Fajar menulis dua puluh ribu seratus lima sebagai 20.150 (salah).
 * Concrete memakai papan angka stadion dengan kartu tiket beremoji, Pictorial memakai tabel tempat polos (garis dan angka, tanpa emoji), Abstract memakai kartu kata dan angka bercap panitia.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 7, 3, 2; Pictorial 6, 9, 2, 1; Abstract 5, 4, 2, 1 (tidak kembar dalam satu tahap). Jawaban benar dihitung dari bilangan (logika-data.ts).
 * Diuji: scripts/uji-tribun-k5b1a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LIgil, LIsi, LNol, LPeriode, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_TRIBUN_TEKS } from "./data-sim";

const igil = (n: number, d: number, satuan: string): LIgil => ({ tipe: "igil", n, d, satuan });
const isi = (n: number, k: number, satuan: string): LIsi => ({ tipe: "isi", n, k, satuan });
const nol = (n: number, satuan: string): LNol => ({ tipe: "nol", n, satuan });
const periode = (n: number, satuan: string, mode: "titik" | "baca" = "baca"): LPeriode => ({ tipe: "periode", n, satuan, mode });
const salah = (dasar: LIsi | LNol | LPeriode, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false, posisi?: number): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Fill the Slots, Guard the Zero, Read by Period. */
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

/* ------------------------------ Concrete: papan angka stadion dengan kartu tiket ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Tribun 2: papan angka", "Bu Ningsih menempelkan catatan tiket di papan angka stadion. Periksa papannya.", [
    igil(34512, 5, "tiket"),
    isi(63428, 0, "kursi"),
    salah(
      nol(40007, "orang"),
      "Fajar",
      "Empat puluh ribu tujuh itu empat dan tujuh saja, jadi tulisannya empat ribu tujuh ratus.",
      "4.700 orang",
      [
        "Fajar keliru, karena tempat yang tidak disebut harus diisi nol penjaga, sehingga angka tujuh tetap berada di satuan.",
        "Fajar keliru, karena bilangan empat puluh ribu tujuh hanya boleh ditulis dengan dua angka.",
        "Fajar keliru, karena angka tujuh selalu ditulis paling kiri pada bilangan besar.",
      ],
      0,
      "Nol penjaga tidak boleh hilang, jadi periksa lagi langkah Fajar.",
      false,
      1,
    ),
    periode(56019, "tiket"),
  ]),
  C(3, "kanvas", "Misi Tribun 3: catatan loket", "Bu Ningsih menulis catatan di loket. Periksa papannya, lalu tulis jawabanmu di kanvas.", [
    igil(8450, 8, "orang"),
    isi(73581, 4, "tiket"),
    nol(60050, "kursi"),
    periode(45320, "lampu"),
  ]),
  C(4, "suara", "Misi Tribun 4: panggilan loket", "Bu Ningsih memanggil dari balik loket. Jawab dengan suaramu.", [
    igil(48296, 9, "bendera"),
    isi(15703, 2, "kursi"),
    nol(72640, "porsi"),
    periode(86150, "tiket"),
  ]),
];

/* ------------------------------ Pictorial: tabel tempat polos tanpa emoji ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Tribun 5: tabel Bima", "Bima menyalin catatan ke tabel tempat. Periksa tabelnya.", [
    igil(71935, 1, "tiket"),
    isi(21386, 0, "orang"),
    nol(90305, "motor"),
    salah(
      periode(58213, "kursi", "titik"),
      "Citra",
      "Titik pemisah kutaruh setelah tiga angka dari kanan, jadi tulisannya lima puluh delapan ribu dua ratus tiga belas.",
      "58.213 kursi",
      [
        "Citra benar, karena titik pemisah selalu dipasang setelah angka pertama dari kiri.",
        "Citra benar, karena titik pemisah boleh dipasang di tempat mana saja.",
        "Citra benar, karena titik pemisah dipasang tiga angka dari kanan, sehingga bilangan terbagi menjadi periode.",
      ],
      2,
      "Jawaban Citra benar karena titik pemisah dipasang tiga angka dari kanan.",
      true,
      0,
    ),
  ]),
  Pi(6, "kanvas", "Misi Tribun 6: bagan Citra", "Citra menggambar tabel tempat di kertas. Periksa tabelnya, lalu tulis jawabanmu di kanvas.", [
    igil(100000, 1, "tiket"),
    isi(29504, 3, "orang"),
    nol(30820, "lampu"),
    periode(7306, "mobil"),
  ]),
  Pi(7, "suara", "Misi Tribun 7: lapor ke Bu Ningsih", "Bima melaporkan tabelnya kepada Bu Ningsih. Sebutkan jawabanmu.", [
    igil(39764, 3, "tiket"),
    isi(84152, 3, "kursi"),
    nol(67058, "orang"),
    periode(91270, "bendera"),
  ]),
];

/* ------------------------------ Abstract: kartu kata dan angka bercap panitia stadion ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Tribun 8: lembar panitia", "Lembar panitia stadion hanya berisi kata dan angka.", [
    igil(96037, 6, "orang"),
    salah(
      isi(20105, 0, "kursi"),
      "Fajar",
      "Pada dua puluh ribu seratus lima, lima kutaruh di kolom puluhan, jadi tulisannya dua puluh ribu seratus lima puluh.",
      "20.150 kursi",
      [
        "Fajar keliru, karena nol selalu harus ditaruh di kolom paling kiri.",
        "Fajar keliru, karena seratus lima berarti lima satuan, sedangkan kolom puluhan berisi nol penjaga.",
        "Fajar keliru, karena bilangan dua puluh ribu harus ditulis dengan empat angka.",
      ],
      1,
      "Angka lima harus tetap berada di satuan, jadi periksa lagi langkah Fajar.",
      false,
      2,
    ),
    nol(50030, "porsi"),
    periode(62408, "tiket"),
  ]),
  A(9, "kanvas", "Misi Tribun 9: tulis di lembar", "Panitia meminta kamu menulis jawaban di kanvas.", [
    igil(65832, 6, "tiket"),
    isi(18946, 1, "orang"),
    nol(30850, "lampu"),
    periode(9215, "bendera"),
  ]),
  A(10, "suara", "Misi Tribun 10: lembar akhir", "Lembar akhir untuk panitia. Ucapkan jawabannya.", [
    igil(57248, 2, "kursi"),
    isi(61529, 0, "tiket"),
    nol(45103, "motor"),
    periode(73850, "orang"),
  ]),
];

export const POIN_PENTING = [
  "Bilangan sampai seratus ribu ditulis di tabel tempat: satuan, puluhan, ratusan, ribuan, dan puluh ribuan.",
  "Satu kolom diisi satu angka, dan kolom itu menentukan berapa banyak yang diwakili angkanya.",
  "Nol penjaga mengisi kolom yang tidak disebut, supaya angka lain tetap berada di kolom yang benar.",
  "Titik pemisah dipasang setiap tiga angka dari kanan, sehingga bilangan terbagi menjadi periode.",
  "Baca per periode: periode kiri disambung kata ribu, lalu periode kanan dibaca seperti biasa.",
  "Uraian menjumlahkan banyak yang diwakili tiap angka menurut kolomnya. Bilangan terbesar di sini seratus ribu, yang memakai kolom ratusan ribu.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Pak Hasto, penyiar stadion, datang membawa pengeras suara dan daftar penonton keempat tribun. Ia ingin tahu tribun mana yang paling ramai dan mana yang paling sepi. Menurutmu, bagaimana cara membandingkan bilangan sebesar itu?";

export const TEMA_TRIBUN = {
  concrete: { ikon: "\u{1F3AB}", nama: "Concrete", cara: "Loket tiket: papan angka stadion dengan kartu tiket beremoji" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas tribun: tabel tempat polos dengan garis dan angka" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar panitia stadion: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TRIBUN, PICTORIAL as PICTORIAL_TRIBUN, ABSTRACT as ABSTRACT_TRIBUN };
