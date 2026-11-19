/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (tempat angka dan banyaknya tiap angka, bilangan sampai 10.000), cerita Penginapan Pulau Karang Indah.
 * Misi lanjutan "Misi Handuk" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (2.304, 3.204, 3.124, 4.162, 4.612, 5.072, 4.035) kecuali ruang jawaban yang sempit.
 * Concrete memakai benda pulau wisata beremoji (kelapa, kerang, tiket, payung, nanas, semangka, lentera, sandal) di rak gudang bertingkat, Pictorial memakai balok cacah polos dan bagan tempat polos di kertas denah biru,
 * Abstract memakai kartu kata dan angka di catatan stok. Jawaban beragam: memilih bilangan, menulis satu angka di kanvas, dan mengucapkan nama tempat angka, kata (lebih, kurang), atau bilangan pendek.
 * Jawaban benar dihitung dari data. Bilangan selalu dengan titik ribuan.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 6, 2, 3; Pictorial 5, 3, 2, 8; Abstract 5, 8, 3, 1 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-handuk-k4b1b.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LBagan, LBalok, LTempat, LTukar, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_HANDUK_TEKS } from "./data-sim";

const tempat = (benda: string, n: number, tanda: number): LTempat => ({ tipe: "tempat", benda, n, tanda });
const balok = (benda: string, n: number, tanda: number): LBalok => ({ tipe: "balok", benda, n, tanda });
const bagan = (benda: string, n: number): LBagan => ({ tipe: "bagan", benda, n });
const tukar = (benda: string, n: number, a: number, b: number): LTukar => ({ tipe: "tukar", benda, n, a, b });
const salah = (dasar: LTempat | LBalok | LBagan | LTukar, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Base-Ten Blocks, Place Chart, Digit Swap. */
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

/* ------------------------------ Concrete: rak gudang kayu dengan benda pulau wisata beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Handuk 2: rak gudang", "Pak Laode menata benda pulau di rak gudang bertingkat. Periksa rak-raknya.", [
    salah(
      tempat("kelapa", 7052, 2),
      "Satria",
      "Angka lima pada bilangan itu artinya lima saja.",
      "5",
      [
        "Satria benar, sebuah angka selalu berarti dirinya sendiri.",
        "Satria keliru: angka lima ada di tempat puluhan, jadi artinya lima dikali sepuluh, bukan lima saja.",
        "Satria keliru, angka lima ada di tempat ratusan.",
      ],
      1,
      "Angka lima ada di tempat puluhan, jadi artinya lima dikali sepuluh. Banyaknya sebuah angka tergantung tempatnya.",
    ),
    balok("kerang", 5140, 1),
    bagan("tiket", 2906),
    tukar("payung", 6147, 1, 3),
  ]),
  C(3, "kanvas", "Misi Handuk 3: catatan Laras", "Laras mencatat isi rak gudang di kertas saku. Periksa raknya, lalu tulis jawabanmu di kanvas.", [
    tempat("nanas", 8472, 1),
    balok("semangka", 1264, 2),
    bagan("lentera", 7003),
    tukar("sandal", 9350, 0, 1),
  ]),
  C(4, "suara", "Misi Handuk 4: panggilan Pak Laode", "Pak Laode memanggil dari pintu gudang. Jawab dengan suaramu.", [
    tempat("kelapa", 5791, 0),
    balok("tiket", 2408, 1),
    bagan("kerang", 6305),
    tukar("payung", 8516, 0, 1),
  ]),
];

/* ------------------------------ Pictorial: kertas denah biru dengan balok cacah polos dan bagan tempat polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Handuk 5: kertas denah biru", "Genta menggambar balok dan bagan di kertas denah biru. Periksa gambarnya.", [
    tempat("denah", 4935, 1),
    balok("denah", 6083, 0),
    salah(
      bagan("denah", 3045),
      "Satria",
      "Kolom ratusan kosong, jadi tidak perlu ditulis. Bilangannya tiga ratus empat puluh lima.",
      "345",
      [
        "Satria benar, kolom yang kosong boleh dilewati.",
        "Satria keliru: kolom ratusan yang kosong harus diisi nol supaya angka lain tetap di tempatnya, jadi bilangannya tiga ribu empat puluh lima.",
        "Satria keliru, nol harus ditulis di tempat satuan.",
      ],
      1,
      "Kolom ratusan yang kosong tetap ditulis nol. Tanpa nol, angka lain bergeser ke tempat yang salah dan bilangannya jauh lebih kecil.",
    ),
    tukar("denah", 5206, 0, 3),
  ]),
  Pi(6, "kanvas", "Misi Handuk 6: gambar Genta", "Genta menggambar lagi dengan data baru. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    tempat("denah", 6851, 2),
    balok("denah", 7318, 1),
    bagan("denah", 5100),
    tukar("denah", 4680, 0, 2),
  ]),
  Pi(7, "suara", "Misi Handuk 7: lapor ke Pak Laode", "Genta melaporkan gambarnya kepada Pak Laode. Sebutkan jawabanmu.", [
    tempat("denah", 3264, 2),
    balok("denah", 4150, 0),
    bagan("denah", 3680),
    tukar("denah", 1427, 0, 3),
  ]),
];

/* ------------------------------ Abstract: catatan stok dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Handuk 8: catatan stok", "Catatan stok gudang hanya berisi kata dan angka.", [
    tempat("kartu", 9806, 1),
    balok("kartu", 8230, 2),
    bagan("kartu", 4710),
    salah(
      tukar("kartu", 3186, 1, 3),
      "Laras",
      "Angka satu dan angka enam bertukar tempat, jadi bilangan barunya tiga ribu enam ratus delapan puluh satu.",
      "3.681",
      [
        "Laras keliru, hanya angka satu yang berpindah.",
        "Laras keliru, angka lain ikut berubah.",
        "Laras benar: angka satu dan angka enam saling bertukar tempat, sedangkan angka tiga dan angka delapan tetap di tempatnya.",
      ],
      2,
      "Angka satu dan angka enam bertukar tempat, sedangkan angka lainnya tetap. Bilangan barunya tiga ribu enam ratus delapan puluh satu.",
      true,
    ),
  ]),
  A(9, "kanvas", "Misi Handuk 9: tulis di catatan", "Pak Hendro meminta kamu menulis jawaban di kanvas.", [
    tempat("kartu", 2958, 2),
    balok("kartu", 1894, 1),
    bagan("kartu", 9000),
    tukar("kartu", 7215, 1, 2),
  ]),
  A(10, "suara", "Misi Handuk 10: laporan akhir", "Laporan akhir gudang untuk Pak Laode. Ucapkan jawabannya.", [
    tempat("kartu", 8073, 2),
    balok("kartu", 3602, 1),
    bagan("kartu", 9540),
    tukar("kartu", 5380, 2, 3),
  ]),
];

export const POIN_PENTING = [
  "Bilangan empat angka punya empat tempat: satuan, puluhan, ratusan, dan ribuan, dihitung dari kanan ke kiri.",
  "Setiap tempat berarti sepuluh kali tempat di kanannya: 1 satuan, 10 puluhan, 100 ratusan, dan 1.000 ribuan.",
  "Banyaknya sebuah angka adalah angka dikali tempatnya, misalnya angka 3 di tempat ratusan berarti 300.",
  "Angka yang sama berarti lain bila tempatnya berbeda, misalnya 3 di ribuan berarti 3.000 dan di satuan hanya 3.",
  "Angka nol menjaga tempat yang kosong supaya angka lain tetap di tempatnya, misalnya 2.304 bukan 234.",
  "Tabel tempat angka menulis satu angka pada tiap kolom: ribuan, ratusan, puluhan, dan satuan.",
  "Balok Cacah, Bagan Tempat, dan Tukar Tempat membantu kita memahami tempat angka dan banyaknya tiap angka.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab C (diucapkan setelah Poin Penting): Kak Tiara membawa papan dermaga. */
export const JEMBATAN_C =
  "Gudang handuk sudah rapi. Kak Tiara datang membawa papan dermaga dan bertanya, pantai mana yang paling banyak dikunjungi? Di Sub-Bab berikutnya kita akan membandingkan dan mengurutkan bilangan.";

export const TEMA_HANDUK = {
  concrete: { ikon: "\u{1F9FA}", nama: "Concrete", cara: "Rak gudang kayu bertingkat: benda pulau wisata beremoji, peti, kotak, ikat, dan papan angka" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas denah biru berkisi: balok cacah polos, bagan tempat polos, dan kartu bilangan" },
  abstract: { ikon: "\u{1F3F7}", nama: "Abstract", cara: "Catatan stok gudang: kartu kata dan angka di kertas bergaris, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_HANDUK, PICTORIAL as PICTORIAL_HANDUK, ABSTRACT as ABSTRACT_HANDUK };
