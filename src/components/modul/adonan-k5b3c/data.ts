/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani" (pengurangan bilangan pecahan: model arsir, penyebut sama,
 * penyebut beda dengan KPK, pisah bulat dan pecahan, hasil disederhanakan, periksa dengan penjumlahan), akhir cerita Toko Roti Keliling.
 * Misi lanjutan "Misi Adonan" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story dan Infografis (lima per delapan dikurangi dua per delapan, empat bulat empat per lima dikurangi
 * satu bulat dua per lima, tiga per empat dikurangi satu per tiga, lima bulat satu per dua dikurangi dua bulat satu per tiga): bahan toko roti (loyang, gula, susu, krim, cokelat, pita kotak roti).
 * Seed Cari kesalahan dari alur: Fajar mengurangkan empat per lima dikurangi satu per lima menjadi tiga per sepuluh (penyebut ikut dijumlahkan, keliru),
 * Citra menyatakan tiga per empat dikurangi satu per enam sama dengan tujuh per dua belas (benar, penyebut disamakan dulu), dan Fajar lupa menyamakan penyebut
 * pada lima bulat dua per tiga dikurangi satu bulat satu per dua (keliru).
 * Concrete memakai loyang dan roti beremoji, Pictorial memakai bar pecahan polos (kotak SVG, tanpa emoji), Abstract memakai kartu tabel dan angka bercap Toko Roti Keliling.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu bilangan. Jawaban benar dihitung dari data (logika-data.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 5, 4, 8, 2; Pictorial 3, 4, 9, 2; Abstract 3, 9, 6, 4 (tidak kembar dalam satu tahap).
 * Angka jawaban Suara per tahap: Concrete 3, 6, 5, 7; Pictorial 5, 7, 3, 2; Abstract 6, 5, 7, 2.
 * Diuji: scripts/uji-adonan-k5b3c.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LIgil, LPisah, LSama, LSamakan, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";
import { bil, type Bil } from "./logika-data";

export { MISI_ADONAN_TEKS } from "./data-sim";

const igil = (q: number, a: number, c: number, item: string): LIgil => ({ tipe: "igil", q, a, c, item });
const sama = (q: number, a: number, c: number, satuan: string): LSama => ({ tipe: "sama", q, a, c, satuan });
const samakan = (x: Bil, y: Bil, satuan: string): LSamakan => ({ tipe: "samakan", x, y, satuan });
const pisah = (x: Bil, y: Bil, satuan: string): LPisah => ({ tipe: "pisah", x, y, satuan });
const salah = (dasar: LSama | LSamakan | LPisah, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false, posisi?: number): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Take Away the Tops, Match and Take Away, Split Whole and Part. */
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

/* ------------------------------ Concrete: loyang dan roti beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Adonan 2: pesanan pelanggan", "Bu Nani menerima pesanan pelanggan. Periksa loyangnya.", [
    igil(7, 6, 2, "kue"),
    salah(
      sama(5, 4, 1, "loyang"),
      "Fajar",
      "Empat per lima loyang dikurangi satu per lima loyang sama dengan tiga per sepuluh loyang.",
      "3/10",
      [
        "Fajar keliru, karena penyebut tidak berubah saat dikurangkan.",
        "Fajar keliru, karena pecahan harus diubah menjadi pecahan campuran dulu.",
        "Fajar keliru, karena hasil pengurangan harus lebih besar daripada kedua pecahan itu.",
      ],
      0,
      "Periksa lagi langkah Fajar pada pecahannya.",
      false,
      1,
    ),
    samakan(bil(0, 3, 4), bil(0, 1, 2), "loyang"),
    pisah(bil(3, 2, 3), bil(1, 1, 3), "loyang"),
  ]),
  C(3, "kanvas", "Misi Adonan 3: catatan Bu Nani", "Bu Nani mencatat sisa persediaan. Periksa loyangnya, lalu tulis jawabanmu di kanvas.", [
    igil(9, 8, 3, "roti"),
    sama(6, 5, 1, "loyang"),
    samakan(bil(0, 3, 4), bil(0, 3, 8), "loyang"),
    pisah(bil(4, 1, 2), bil(2, 1, 4), "loyang"),
  ]),
  C(4, "suara", "Misi Adonan 4: panggilan Bu Nani", "Bu Nani memanggil dari dapur roti. Jawab dengan suaramu.", [
    igil(8, 7, 3, "panjang"),
    sama(9, 8, 6, "loyang"),
    samakan(bil(0, 2, 3), bil(0, 1, 4), "loyang"),
    pisah(bil(4, 3, 4), bil(2, 1, 6), "loyang"),
  ]),
];

/* ------------------------------ Pictorial: bar pecahan polos tanpa emoji ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Adonan 5: bar Bima", "Bima menggambar bar pecahan di papan jepitnya. Periksa bar-bar itu.", [
    igil(8, 6, 1, "kue"),
    sama(12, 11, 5, "kilogram"),
    salah(
      samakan(bil(0, 3, 4), bil(0, 1, 6), "kilogram"),
      "Citra",
      "Tiga per empat kilogram dikurangi satu per enam kilogram sama dengan tujuh per dua belas kilogram.",
      "7/12",
      [
        "Citra benar, karena penyebut yang berbeda cukup dikurangkan satu sama lain.",
        "Citra benar, karena penyebutnya disamakan dulu sebelum dikurangkan.",
        "Citra benar, karena hasil pengurangan boleh memakai penyebut mana saja.",
      ],
      1,
      "Jawaban Citra benar karena penyebutnya sudah disamakan lebih dulu.",
      true,
      2,
    ),
    pisah(bil(4, 3, 5), bil(2, 1, 5), "kilogram"),
  ]),
  Pi(6, "kanvas", "Misi Adonan 6: bar Citra", "Citra menggambar bar pecahan yang lain. Periksa bar-barnya, lalu tulis jawabanmu di kanvas.", [
    igil(9, 7, 4, "kue"),
    sama(7, 6, 2, "liter"),
    samakan(bil(0, 2, 3), bil(0, 4, 9), "liter"),
    pisah(bil(3, 2, 3), bil(1, 1, 6), "meter"),
  ]),
  Pi(7, "suara", "Misi Adonan 7: lapor ke Bu Nani", "Bima melaporkan hitungannya kepada Bu Nani. Sebutkan jawabanmu.", [
    igil(9, 9, 5, "kue"),
    sama(10, 9, 7, "liter"),
    samakan(bil(0, 1, 2), bil(0, 1, 5), "kilogram"),
    pisah(bil(4, 1, 2), bil(2, 1, 6), "meter"),
  ]),
];

/* ------------------------------ Abstract: kartu data bercap Toko Roti Keliling ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Adonan 8: lembar toko roti", "Lembar Toko Roti Keliling hanya berisi kata dan angka.", [
    igil(9, 7, 2, "kue"),
    sama(11, 10, 4, "liter"),
    samakan(bil(3, 1, 2), bil(1, 1, 4), "kilogram"),
    salah(
      pisah(bil(5, 2, 3), bil(1, 1, 2), "kilogram"),
      "Fajar",
      "Empat bulat satu per tiga kilogram.",
      "4 1/3",
      [
        "Fajar keliru, karena bilangan bulat harus dikurangkan setelah pecahannya.",
        "Fajar keliru, karena penyebut yang berbeda harus disamakan dulu.",
        "Fajar keliru, karena pecahan campuran tidak boleh dikurangkan sama sekali.",
      ],
      1,
      "Periksa lagi langkah Fajar pada pecahannya.",
      false,
      0,
    ),
  ]),
  A(9, "kanvas", "Misi Adonan 9: tulis di lembar", "Toko Roti Keliling meminta kamu menulis jawaban di kanvas.", [
    igil(7, 7, 4, "kue"),
    sama(12, 11, 2, "liter"),
    samakan(bil(0, 2, 3), bil(0, 1, 6), "kilogram"),
    pisah(bil(6, 3, 4), bil(2, 1, 4), "meter"),
  ]),
  A(10, "suara", "Misi Adonan 10: lembar akhir", "Lembar akhir untuk Toko Roti Keliling. Ucapkan jawabannya.", [
    igil(10, 9, 6, "kue"),
    sama(9, 8, 5, "kilogram"),
    samakan(bil(0, 5, 6), bil(0, 1, 4), "liter"),
    pisah(bil(7, 1, 2), bil(3, 1, 6), "meter"),
  ]),
];

export const POIN_PENTING = [
  "Pecahan hanya bisa dikurangkan kalau penyebutnya sama; kalau berbeda, samakan dulu dengan KPK.",
  "Kalau penyebutnya sama, kurangkan pembilangnya dan penyebut tetap, misalnya 5/8 - 2/8 = 3/8.",
  "Model arsir: bagian yang diambil dicoret, dan bagian yang tidak tercoret adalah sisanya.",
  "Pecahan campuran dikurangkan dengan dua cara: ubah ke pecahan biasa, atau pisahkan bilangan bulat dan pecahannya.",
  "Penyebut yang berbeda disamakan dengan KPK, misalnya 3/4 - 1/3 = 9/12 - 4/12 = 5/12.",
  "Sederhanakan hasilnya, lalu periksa dengan penjumlahan: hasil ditambah yang dikurangkan kembali ke pecahan semula.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Penutup bab: perayaan Toko Roti Keliling. */
export const PENUTUP_C =
  "Semua loyang bersih dan semua pesanan terkurangi dengan benar. Bu Ratna, Pak Seno, Bu Nani, Bima, Citra, Fajar, dan Pak Arif merayakan Toko Roti Keliling di taman, dengan mobil roti, spanduk, balon, dan kotak roti berderet. Menurutmu, roti apa yang paling cepat habis?";

export const TEMA_ADONAN = {
  concrete: { ikon: "\u{1F370}", nama: "Concrete", cara: "Dapur Bu Nani: loyang dan roti beremoji yang dibagi sama besar" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Papan jepit Bima: bar pecahan polos yang diarsir dan dicoret" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar Toko Roti Keliling: kartu tabel dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_ADONAN, PICTORIAL as PICTORIAL_ADONAN, ABSTRACT as ABSTRACT_ADONAN };
