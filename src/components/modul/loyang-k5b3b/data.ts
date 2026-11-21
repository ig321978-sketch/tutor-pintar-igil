/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno" (penjumlahan pecahan: penyebut sama, KPK, campuran dengan dua cara, disederhanakan),
 * lanjutan cerita Toko Roti Keliling. Misi lanjutan "Misi Loyang" (nomor misi berlanjut dari Simulasi).
 * Data berbeda dari Story dan Infografis (satu per delapan + dua per delapan, dua bulat satu per lima + tiga bulat satu per lima, satu per empat + satu per enam, satu bulat satu per dua + dua bulat satu per empat):
 * bahan lain di toko roti (gula, susu, selai, krim, cokelat, telur, kue, kue kering). Seed Cari kesalahan dari alur:
 * Fajar menjumlahkan penyebut juga (dua per lima + satu per lima = tiga per sepuluh, keliru), Citra menjumlahkan dua per tiga dan satu per enam lewat KPK enam (benar),
 * dan Fajar menjumlahkan penyebut pada pecahan campuran (keliru).
 * Concrete memakai loyang berpotongan beremoji, Pictorial memakai bar pecahan polos (kotak SVG, tanpa emoji), Abstract memakai kartu angka bercap Toko Roti Keliling.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu bilangan. Jawaban benar dihitung dari data (logika-data.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 5, 7, 6, 4; Pictorial 8, 7, 9, 5; Abstract 5, 8, 4, 6 (tidak kembar dalam satu tahap).
 * Angka jawaban Suara per tahap: Concrete 3, 8, 7, 2; Pictorial 7, 9, 2, 5; Abstract 5, 7, 3, 1.
 * Diuji: scripts/uji-loyang-k5b3b.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LAtas, LBawah, LBulat, LIgil, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_LOYANG_TEKS } from "./data-sim";

const igil = (a: number, b: number, d: number, bahan: string): LIgil => ({ tipe: "igil", a, b, d, bahan });
const atas = (a: number, b: number, d: number, bahan: string): LAtas => ({ tipe: "atas", a, b, d, bahan });
const bawah = (a: number, p: number, b: number, q: number, bahan: string): LBawah => ({ tipe: "bawah", a, p, b, q, bahan });
const bulat = (w1: number, n1: number, d1: number, w2: number, n2: number, d2: number, bahan: string): LBulat => ({ tipe: "bulat", w1, n1, d1, w2, n2, d2, bahan });
const salah = (dasar: LAtas | LBawah | LBulat, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false, posisi?: number): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Add the Tops, Match the Bottoms, Whole Then Part. */
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

/* ------------------------------ Concrete: loyang berpotongan beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Loyang 2: pesanan pagi", "Pak Seno menerima pesanan pagi di mobil roti. Periksa loyangnya.", [
    igil(2, 3, 7, "roti"),
    salah(
      atas(2, 1, 5, "gula"),
      "Fajar",
      "Dua per lima ditambah satu per lima sama dengan tiga per sepuluh, karena penyebutnya juga dijumlahkan.",
      "3/10",
      [
        "Fajar keliru, karena penyebut yang sama tidak ikut dijumlahkan, hanya pembilangnya.",
        "Fajar keliru, karena pembilang harus dikali penyebutnya lebih dulu sebelum dijumlahkan.",
        "Fajar keliru, karena pecahan berpenyebut sama harus diubah menjadi pecahan campuran dahulu.",
      ],
      0,
      "Ukuran potongan tidak berubah, jadi periksa lagi langkah Fajar.",
      false,
      1,
    ),
    bawah(1, 2, 2, 5, "susu"),
    bulat(1, 2, 9, 2, 5, 9, "selai"),
  ]),
  C(3, "kanvas", "Misi Loyang 3: catatan Pak Seno", "Pak Seno mencatat pesanan berikutnya. Periksa loyangnya, lalu tulis jawabanmu di kanvas.", [
    igil(3, 2, 8, "kue"),
    atas(4, 3, 6, "cokelat"),
    bawah(1, 2, 1, 3, "krim"),
    bulat(1, 3, 5, 2, 4, 5, "telur"),
  ]),
  C(4, "suara", "Misi Loyang 4: panggilan Pak Seno", "Pak Seno memanggil dari balik gerobak. Jawab dengan suaramu.", [
    igil(3, 4, 10, "kue kering"),
    atas(5, 2, 8, "susu"),
    bawah(1, 3, 1, 4, "selai"),
    bulat(2, 1, 6, 1, 3, 6, "gula"),
  ]),
];

/* ------------------------------ Pictorial: bar pecahan polos tanpa emoji ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Loyang 5: bar Bima", "Bima menggambar bar pecahan di papan resep. Periksa barnya.", [
    igil(3, 4, 8, "roti"),
    atas(5, 4, 6, "susu"),
    salah(
      bawah(2, 3, 1, 6, "gula"),
      "Citra",
      "Dua per tiga ditambah satu per enam sama dengan lima per enam, karena penyebutnya disamakan lewat KPK enam.",
      "5/6",
      [
        "Citra benar, karena penyebut disamakan lebih dulu, baru pembilangnya dijumlahkan.",
        "Citra benar, karena penyebut yang berbeda boleh langsung dijumlahkan bersama pembilangnya.",
        "Citra benar, karena hasil penjumlahan pecahan selalu memakai penyebut yang paling kecil.",
      ],
      0,
      "Jawaban Citra benar karena penyebutnya sudah disamakan sebelum pembilangnya dijumlahkan.",
      true,
      0,
    ),
    bulat(1, 1, 3, 2, 1, 2, "cokelat"),
  ]),
  Pi(6, "kanvas", "Misi Loyang 6: bar Citra", "Citra menggambar bar pecahan lain. Periksa barnya, lalu tulis jawabanmu di kanvas.", [
    igil(3, 5, 11, "kue"),
    atas(3, 4, 5, "gula"),
    bawah(1, 3, 4, 9, "krim"),
    bulat(2, 5, 6, 2, 4, 6, "selai"),
  ]),
  Pi(7, "suara", "Misi Loyang 7: lapor ke Pak Seno", "Bima melaporkan barnya kepada Pak Seno. Sebutkan jawabanmu.", [
    igil(2, 3, 12, "roti"),
    atas(2, 5, 9, "susu"),
    bawah(1, 2, 1, 6, "cokelat"),
    bulat(3, 2, 7, 1, 3, 7, "gula"),
  ]),
];

/* ------------------------------ Abstract: kartu angka bercap Toko Roti Keliling ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Loyang 8: nota pesanan", "Nota pesanan Toko Roti Keliling hanya berisi kata dan angka.", [
    igil(4, 5, 10, "kue"),
    atas(6, 5, 7, "susu"),
    bawah(3, 4, 3, 8, "krim"),
    salah(
      bulat(1, 2, 5, 2, 1, 5, "gula"),
      "Fajar",
      "Satu bulat dua per lima ditambah dua bulat satu per lima sama dengan tiga bulat tiga per sepuluh.",
      "3 3/10",
      [
        "Fajar keliru, karena penyebut yang sama tidak boleh ikut dijumlahkan, hanya bilangan bulat dan pembilang.",
        "Fajar keliru, karena bilangan bulat dan pecahan tidak boleh dijumlahkan sendiri-sendiri.",
        "Fajar keliru, karena hasil penjumlahan campuran harus selalu pecahan biasa yang kurang dari seluruhnya.",
      ],
      0,
      "Penyebut yang sama tidak berubah, jadi periksa lagi langkah Fajar.",
      false,
      2,
    ),
  ]),
  A(9, "kanvas", "Misi Loyang 9: tulis di nota", "Toko Roti Keliling meminta kamu menulis jawaban di kanvas.", [
    igil(1, 4, 9, "roti"),
    atas(5, 3, 6, "cokelat"),
    bawah(1, 2, 3, 4, "selai"),
    bulat(3, 3, 5, 2, 4, 5, "susu"),
  ]),
  A(10, "suara", "Misi Loyang 10: nota akhir", "Nota akhir untuk Pak Seno. Ucapkan jawabannya.", [
    igil(4, 3, 12, "kue kering"),
    atas(3, 2, 7, "gula"),
    bawah(1, 4, 1, 8, "susu"),
    bulat(1, 1, 6, 2, 1, 6, "selai"),
  ]),
];

export const POIN_PENTING = [
  "Pecahan hanya bisa dijumlahkan bila penyebutnya sama; bila beda, samakan dulu dengan KPK.",
  "Penyebut sama: jumlahkan pembilangnya dan penyebut tetap, misalnya 1/8 + 2/8 = 3/8.",
  "Model arsir menunjukkan bagian yang digabung, dan hasilnya cocok dengan hitungan.",
  "Pecahan campuran bisa dijumlahkan dengan dua cara: ubah ke pecahan biasa, atau pisahkan bilangan bulat dan pecahannya.",
  "Penyebut beda: KPK 4 dan 6 adalah 12, jadi 1/4 + 1/6 = 3/12 + 2/12 = 5/12.",
  "Sederhanakan hasilnya: 27/5 menjadi 5 2/5, dan 15/4 menjadi 3 3/4.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab C. */
export const PENUTUP_B =
  "Bu Nani, pembuat kue, datang membawa loyang kue yang tinggal sebagian. Pesanan pelanggan harus diambil dari sisa adonan itu. Menurutmu, berapa bagian adonan yang tersisa sesudah pesanan diambil?";

export const TEMA_LOYANG = {
  concrete: { ikon: "\u{1F35E}", nama: "Concrete", cara: "Mobil roti Pak Seno: loyang berpotongan roti beremoji" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Papan resep: bar pecahan polos yang diarsir dan digabung" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Nota Toko Roti Keliling: kartu angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_LOYANG, PICTORIAL as PICTORIAL_LOYANG, ABSTRACT as ABSTRACT_LOYANG };
