/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna" (membandingkan dan mengurutkan pecahan: pecahan biasa dan campuran,
 * campuran menjadi biasa, garis bilangan, samakan penyebut dengan KPK, bandingkan bilangan bulat dulu, tanda <, >, =), awal cerita Toko Roti Keliling.
 * Misi lanjutan "Misi Timbang" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (kantong tepung tiga, empat, dan delapan): susu, gula, selai, pita kotak roti, krim, cokelat, jarak mobil roti.
 * Seed Cari kesalahan: Fajar menyatakan dua bulat satu per tiga lebih besar dari tiga bulat satu per empat (salah), Citra menyatakan satu bulat satu per dua sama dengan tiga per dua (benar),
 * dan Fajar mengubah penyebut tanpa mengubah pembilang saat menyamakan penyebut (salah).
 * Concrete memakai etalase roti dengan loyang berisi potongan roti beremoji, Pictorial memakai kertas bar pecahan polos (tanpa emoji), Abstract memakai lembar Toko Roti Keliling (kata dan angka).
 * Angka jawaban Tulis di kanvas per tahap (tidak kembar dalam satu tahap): Concrete 4, 6, 8, 9; Pictorial 5, 2, 9, 7; Abstract 7, 8, 6, 4. Jawaban benar dihitung dari bilangan (logika-data.ts).
 * Diuji: scripts/uji-timbang-k5b3a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LCampuran, LGaris, LIgil, LPenyebut, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";
import { pec } from "./logika-data";

export { MISI_TIMBANG_TEKS } from "./data-sim";

const igil = (a: ReturnType<typeof pec>, b: ReturnType<typeof pec>, satuan: string): LIgil => ({ tipe: "igil", a, b, satuan });
const garis = (q: number, maks: number, n: number, m: number, tanya: "kecil" | "besar", satuan: string): LGaris => ({ tipe: "garis", q, maks, n, m, tanya, satuan });
const penyebut = (a: ReturnType<typeof pec>, b: ReturnType<typeof pec>, satuan: string): LPenyebut => ({ tipe: "penyebut", a, b, satuan });
const campuran = (f: ReturnType<typeof pec>, satuan: string): LCampuran => ({ tipe: "campuran", f, satuan });
const salah = (
  dasar: LIgil | LGaris | LPenyebut | LCampuran,
  tokoh: string,
  kataTokoh: string,
  jawabTokoh: string,
  alasan: [string, string, string],
  benar: number,
  keliru: string,
  betul = false,
  posisi?: number,
): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Number Line, Common Denominator, Mixed to Improper. */
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

/* ------------------------------ Concrete: etalase roti dengan loyang dan potongan roti beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Timbang 2: etalase roti", "Bu Ratna menata roti di etalase. Periksa loyang dan talinya.", [
    salah(
      igil(pec(2, 1, 3), pec(3, 1, 4), "liter"),
      "Fajar",
      "2 1/3 lebih besar dari 3 1/4, karena 1/3 lebih besar dari 1/4.",
      "2 1/3 > 3 1/4",
      [
        "Fajar keliru, karena pecahan yang penyebutnya lebih kecil selalu lebih kecil, sehingga satu per tiga tidak mungkin lebih besar.",
        "Fajar keliru, karena bilangan bulat tiga lebih besar dari dua, jadi pecahan campuran pertama pasti lebih kecil.",
        "Fajar keliru, karena pecahan campuran tidak bisa dibandingkan sebelum dijumlahkan dengan pecahan lain.",
      ],
      1,
      "Perhatikan semua bagian pecahan campuran itu, jadi periksa lagi langkah Fajar.",
      false,
      1,
    ),
    garis(5, 3, 8, 13, "besar", "kilogram"),
    penyebut(pec(0, 2, 3), pec(0, 1, 4), "kilogram"),
    campuran(pec(3, 2, 5), "liter"),
  ]),
  C(3, "kanvas", "Misi Timbang 3: rak adonan", "Rak adonan memuat banyak loyang. Periksa loyangnya, lalu tulis jawabanmu di kanvas.", [
    igil(pec(3, 5, 6), pec(4, 1, 8), "kilogram"),
    garis(6, 2, 7, 11, "kecil", "meter"),
    penyebut(pec(0, 1, 4), pec(0, 3, 8), "kilogram"),
    campuran(pec(3, 2, 3), "liter"),
  ]),
  C(4, "suara", "Misi Timbang 4: panggilan Pak Arif", "Pak Arif memanggil lewat pengeras suara. Jawab dengan suaramu.", [
    igil(pec(0, 2, 3), pec(0, 4, 6), "liter"),
    garis(4, 2, 5, 7, "kecil", "kilometer"),
    penyebut(pec(0, 1, 3), pec(0, 1, 6), "kilogram"),
    campuran(pec(2, 3, 8), "meter"),
  ]),
];

/* ------------------------------ Pictorial: kertas bar pecahan polos tanpa emoji ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Timbang 5: papan Bima", "Bima menyalin catatan toko ke kertasnya. Periksa garis dan batangnya.", [
    igil(pec(0, 7, 4), pec(1, 1, 2), "kilometer"),
    garis(3, 4, 10, 11, "kecil", "liter"),
    penyebut(pec(0, 3, 5), pec(0, 1, 2), "kilogram"),
    salah(
      campuran(pec(1, 1, 2), "liter"),
      "Citra",
      "1 1/2 sama dengan 3/2.",
      "3/2",
      [
        "Citra benar, karena bilangan bulat tinggal dibuang dan hanya pecahannya yang ditulis ulang dengan penyebut yang baru.",
        "Citra benar, karena penyebut ikut dikali dengan bilangan bulat, sehingga penyebutnya menjadi dua kali lebih besar.",
        "Citra benar, karena satu kali dua ditambah satu sama dengan tiga, dan penyebutnya tetap.",
      ],
      2,
      "Ingat cara mengubah pecahan campuran, jadi periksa lagi langkah Citra.",
      true,
      2,
    ),
  ]),
  Pi(6, "kanvas", "Misi Timbang 6: bagan Citra", "Citra menggambar bagan pecahan di kertas. Periksa bagannya, lalu tulis jawabanmu di kanvas.", [
    igil(pec(5, 1, 3), pec(3, 5, 6), "kilogram"),
    garis(2, 4, 5, 7, "kecil", "liter"),
    penyebut(pec(0, 2, 3), pec(0, 4, 9), "kilogram"),
    campuran(pec(1, 3, 7), "meter"),
  ]),
  Pi(7, "suara", "Misi Timbang 7: lapor ke Bu Ratna", "Bima melaporkan kertasnya kepada Bu Ratna. Sebutkan jawabanmu.", [
    igil(pec(3, 1, 4), pec(2, 7, 8), "kilogram"),
    garis(5, 3, 6, 9, "besar", "meter"),
    penyebut(pec(0, 1, 2), pec(0, 1, 3), "liter"),
    campuran(pec(4, 1, 2), "liter"),
  ]),
];

/* ------------------------------ Abstract: lembar Toko Roti Keliling (kata dan angka) ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Timbang 8: lembar toko", "Lembar Toko Roti Keliling hanya berisi kata dan angka.", [
    igil(pec(2, 1, 5), pec(0, 11, 5), "kilogram"),
    garis(4, 3, 9, 11, "besar", "liter"),
    salah(
      penyebut(pec(0, 1, 2), pec(0, 2, 3), "kilogram"),
      "Fajar",
      "1/2 menjadi 1/6, karena penyebutnya diganti menjadi 6.",
      "1/6",
      [
        "Fajar keliru, karena penyebut baru harus lebih kecil dari penyebut lama supaya pecahannya makin besar.",
        "Fajar keliru, karena pembilang tidak boleh berubah selama penyebutnya diganti dengan KPK.",
        "Fajar keliru, karena pembilang juga dikali dengan bilangan yang sama.",
      ],
      2,
      "Besar pecahan harus tetap sama setelah penyebutnya diganti, jadi periksa lagi langkah Fajar.",
      false,
      0,
    ),
    campuran(pec(5, 3, 4), "kilogram"),
  ]),
  A(9, "kanvas", "Misi Timbang 9: tulis di lembar", "Petugas toko meminta kamu menulis jawaban di kanvas.", [
    igil(pec(7, 1, 4), pec(3, 5, 6), "kilogram"),
    garis(8, 2, 11, 15, "kecil", "meter"),
    penyebut(pec(0, 5, 6), pec(0, 1, 2), "liter"),
    campuran(pec(2, 1, 2), "liter"),
  ]),
  A(10, "suara", "Misi Timbang 10: lembar akhir", "Lembar akhir untuk petugas toko. Ucapkan jawabannya.", [
    igil(pec(2, 2, 5), pec(2, 1, 2), "kilogram"),
    garis(7, 2, 9, 12, "kecil", "liter"),
    penyebut(pec(0, 5, 6), pec(0, 3, 4), "kilogram"),
    campuran(pec(1, 5, 6), "kilogram"),
  ]),
];

export const POIN_PENTING = [
  "Pecahan biasa punya pembilang dan penyebut, sedangkan pecahan campuran terdiri atas bilangan bulat dan pecahan biasa.",
  "Pecahan campuran diubah menjadi pecahan biasa dengan mengalikan bilangan bulat dengan penyebut, lalu menambahkan pembilang. Penyebutnya tetap.",
  "Pada garis bilangan, makin ke kanan makin besar, dan makin ke kiri makin kecil.",
  "Untuk membandingkan pecahan yang penyebutnya berbeda, samakan penyebutnya dengan KPK, lalu bandingkan pembilangnya.",
  "Pada pecahan campuran, bandingkan bilangan bulatnya lebih dulu. Bilangan bulat yang lebih besar menunjukkan pecahan yang lebih besar.",
  "Hasil perbandingan ditulis dengan tanda lebih besar, lebih kecil, atau sama dengan, dan tiga pecahan bisa diurutkan dari yang terkecil atau terbesar.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Pak Seno, penjual roti isi, datang membawa gerobak berlonceng. Rotinya dipotong delapan bagian sama besar, dan dua pesanan ingin digabung. Menurutmu, bagaimana cara menggabungkan dua potongan roti?";

export const TEMA_TIMBANG = {
  concrete: { ikon: "\u{1F35E}", nama: "Concrete", cara: "Etalase roti: loyang, tali bilangan, dan potongan roti beremoji" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas bar pecahan: garis bilangan dan bar polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar Toko Roti Keliling: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TIMBANG, PICTORIAL as PICTORIAL_TIMBANG, ABSTRACT as ABSTRACT_TIMBANG };
