/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga" (faktor, pasangan faktor, kelipatan), akhir cerita Penginapan Pulau Karang Indah.
 * Misi lanjutan "Misi Jadwal" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (24 payung, faktor 24, kelipatan 4, 12, 36, 42, kelipatan 5 sampai 40)
 * kecuali ruang jawaban yang sempit. Concrete memakai benda pantai beremoji di hamparan pasir, Pictorial memakai diagram polos di kertas jadwal berkisi,
 * Abstract memakai kartu kata dan angka di lembar jadwal. Jawaban beragam: memilih bilangan atau pasangan faktor, menulis satu angka di kanvas, dan mengucapkan satu kata
 * (faktor, kelipatan, habis, sisa) atau bilangan pendek. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 6, 3, 4, 5; Pictorial 4, 5, 7, 8; Abstract 8, 6, 9, 1 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-jadwal-k4b1i.mjs.
 */
import type { Cara, LBanyak, LCek, LDaftar, LFaktor, LPasang, LSebut, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_JADWAL_TEKS } from "./data-sim";

type T3 = [number, number, number];
type S3 = [string, string, string];
const faktor = (benda: string, n: number, pil: T3): LFaktor => ({ tipe: "faktor", benda, n, pil });
const banyak = (benda: string, n: number): LBanyak => ({ tipe: "banyak", benda, n });
const sebut = (a: number, b: number, arah: "faktor" | "kelipatan"): LSebut => ({ tipe: "sebut", a, b, arah });
const pasang = (benda: string, n: number, a: number, pil: S3): LPasang => ({ tipe: "pasang", benda, n, a, pil });
const daftar = (benda: string, b: number, batas: number, k: number, pil: T3): LDaftar => ({ tipe: "daftar", benda, b, batas, k, pil });
const cek = (benda: string, n: number, d: number, pil: T3): LCek => ({ tipe: "cek", benda, n, d, pil });
const salah = (dasar: LangkahSalah["dasar"], tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Factor Pairs, Multiples List, Divisibility Check. */
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

/* ------------------------------ Concrete: hamparan pasir pantai dengan benda pulau beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Jadwal 2: pasir pantai", "Kak Yoga menaruh benda pulau di atas pasir. Periksa papan pantainya.", [
    salah(
      banyak("kelapa", 15),
      "Satria",
      "Faktor lima belas hanya tiga dan lima, karena satu bukan faktor, jadi faktornya ada dua.",
      "2",
      [
        "Satria benar, satu terlalu kecil sehingga tidak dihitung sebagai faktor.",
        "Satria keliru: satu membagi habis semua bilangan, jadi satu selalu faktor, dan bilangan itu sendiri juga faktor.",
        "Satria keliru, lima belas hanya punya satu faktor.",
      ],
      1,
      "Satu membagi habis semua bilangan, jadi satu selalu faktor, dan bilangan itu sendiri juga faktor. Tulis semua faktornya dari satu, lalu hitung lagi.",
    ),
    pasang("keranjang", 28, 4, ["3 dan 25", "4 dan 7", "5 dan 6"]),
    daftar("tiket", 6, 40, 5, [26, 42, 50]),
    cek("koper", 30, 4, [5, 7, 10]),
  ]),
  C(3, "kanvas", "Misi Jadwal 3: catatan Laras", "Laras mencatat benda pulau di pasir. Periksa papan pantainya, lalu tulis jawabanmu di kanvas.", [
    banyak("payung", 20),
    pasang("kerang", 18, 2, ["2 dan 16", "3 dan 6", "4 dan 5"]),
    daftar("nanas", 9, 40, 3, [27, 28, 37]),
    cek("sandal", 47, 6, [4, 7, 9]),
  ]),
  C(4, "suara", "Misi Jadwal 4: panggilan Pak Hendro", "Pak Hendro memanggil dari pinggir pantai. Jawab dengan suaramu.", [
    sebut(7, 63, "faktor"),
    pasang("keranjang", 45, 5, ["9 dan 36", "5 dan 9", "3 dan 12"]),
    daftar("lentera", 8, 50, 5, [45, 48, 42]),
    cek("tiket", 39, 6, [3, 6, 13]),
  ]),
];

/* ------------------------------ Pictorial: kertas jadwal berkisi dengan diagram polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Jadwal 5: kertas jadwal berkisi", "Genta menggambar diagram di kertas jadwal berkisi. Periksa gambarnya.", [
    faktor("diagram A", 21, [4, 7, 10]),
    pasang("diagram B", 32, 4, ["5 dan 27", "4 dan 8", "3 dan 10"]),
    salah(
      daftar("diagram C", 5, 80, 3, [58, 52, 65]),
      "Laras",
      "Kelipatan lima selalu berakhir nol atau lima, jadi enam puluh lima adalah kelipatan lima.",
      "65",
      [
        "Laras keliru, kelipatan lima boleh berakhir dengan angka apa saja.",
        "Laras keliru, angka akhir tidak ada hubungannya dengan kelipatan.",
        "Laras benar: kelipatan lima berakhir nol atau lima, dan dibagi lima habis tanpa sisa.",
      ],
      2,
      "Kelipatan lima selalu berakhir nol atau lima, dan dibagi lima habis tanpa sisa, jadi cara Laras sudah benar. Periksa lagi sebelum memutuskan salah.",
      true,
    ),
    cek("diagram D", 44, 8, [4, 6, 11]),
  ]),
  Pi(6, "kanvas", "Misi Jadwal 6: diagram Genta", "Genta membuat diagram yang lebih lengkap. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    banyak("diagram E", 14),
    pasang("diagram F", 48, 3, ["3 dan 45", "6 dan 8", "5 dan 10"]),
    daftar("diagram G", 6, 45, 2, [28, 40, 54]),
    cek("diagram H", 53, 9, [5, 6, 8]),
  ]),
  Pi(7, "suara", "Misi Jadwal 7: lapor ke Kak Yoga", "Genta melaporkan diagramnya kepada Kak Yoga. Sebutkan jawabanmu.", [
    sebut(6, 54, "kelipatan"),
    pasang("diagram I", 56, 8, ["7 dan 49", "7 dan 8", "4 dan 12"]),
    daftar("diagram J", 12, 60, 4, [25, 36, 40]),
    cek("diagram K", 72, 8, [9, 12, 18]),
  ]),
];

/* ------------------------------ Abstract: lembar jadwal dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Jadwal 8: lembar jadwal", "Lembar jadwal hanya berisi kata dan angka.", [
    faktor("kartu satu", 35, [6, 7, 9]),
    pasang("kartu dua", 50, 2, ["10 dan 40", "6 dan 9", "2 dan 25"]),
    daftar("kartu tiga", 11, 99, 3, [78, 77, 87]),
    salah(
      cek("kartu empat", 27, 6, [9, 6, 3]),
      "Satria",
      "Dua puluh tujuh dibagi enam sama dengan empat, jadi enam faktor dari dua puluh tujuh, dan yang bukan faktor adalah sembilan.",
      "9",
      [
        "Satria keliru: sembilan membagi habis dua puluh tujuh tanpa sisa, jadi sembilan adalah faktor, bukan yang dicari.",
        "Satria benar, hasil bagi empat sudah cukup untuk menjadi faktor.",
        "Satria keliru, tiga bukan faktor karena lebih kecil dari enam.",
      ],
      0,
      "Sembilan membagi habis dua puluh tujuh tanpa sisa, jadi sembilan adalah faktor. Bagi dua puluh tujuh dengan pilihan yang lain dan lihat sisanya.",
    ),
  ]),
  A(9, "kanvas", "Misi Jadwal 9: tulis di lembar", "Laras meminta kamu menulis jawaban di kanvas.", [
    banyak("kartu lima", 30),
    pasang("kartu enam", 60, 5, ["4 dan 56", "6 dan 10", "7 dan 9"]),
    daftar("kartu tujuh", 3, 27, 4, [20, 24, 25]),
    cek("kartu delapan", 31, 5, [6, 8, 9]),
  ]),
  A(10, "suara", "Misi Jadwal 10: laporan akhir", "Laporan akhir jadwal untuk Bu Maya. Ucapkan jawabannya.", [
    sebut(8, 72, "faktor"),
    pasang("kartu sembilan", 60, 4, ["4 dan 56", "6 dan 10", "7 dan 9"]),
    daftar("kartu sepuluh", 15, 90, 5, [70, 75, 80]),
    cek("kartu sebelas", 84, 7, [8, 12, 14]),
  ]),
];

export const POIN_PENTING = [
  "Faktor suatu bilangan adalah bilangan yang membagi habis bilangan itu, tanpa sisa.",
  "Satu dan bilangan itu sendiri selalu menjadi faktornya.",
  "Pasangan faktor dikalikan menjadi bilangan itu, misalnya 2 x 12 = 24, dan tiap pasangan menghasilkan dua faktor.",
  "Kelipatan suatu bilangan adalah hasil kali bilangan itu dengan 1, 2, 3, dan seterusnya, atau tambah berulang.",
  "Cek bagi habis: bagi dan lihat sisanya. Sisa 0 berarti faktor, ada sisa berarti bukan faktor.",
  "Faktor membagi habis, kelipatan adalah hasil kali: 4 adalah faktor 24, dan 24 adalah kelipatan 4.",
  "Pasangan Faktor, Daftar Kelipatan, dan Cek Bagi Habis membantu menemukan faktor dan kelipatan dengan teliti.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p.replace(/ x /g, " kali ").replace(/ = /g, " sama dengan ")));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): semua tamu dan semua tokoh hadir. */
export const PENUTUP_I =
  "Satria, Laras, Genta, Pak Hendro, Bu Maya, Pak Laode, Kak Tiara, Pak Darwis, Bu Rina, Pak Usman, Bu Marni, Bu Ratna, dan Kak Yoga merayakan akhir bab di pantai pada malam hari. Spanduk Festival Lentera Pantai terpasang, lentera menyala, balon naik, dan konfeti beterbangan. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_JADWAL = {
  concrete: { ikon: "\u{1F302}", nama: "Concrete", cara: "Hamparan pasir pantai: benda pulau beremoji, payung, dan papan pantai yang dihitung" },
  pictorial: { ikon: "\u{1F4CB}", nama: "Pictorial", cara: "Kertas jadwal berkisi lavender: diagram polos, baris dan kolom titik, garis loncat, dan kartu bilangan" },
  abstract: { ikon: "\u{1F3EE}", nama: "Abstract", cara: "Lembar jadwal Kak Yoga: kartu kata dan angka di kertas putih, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_JADWAL, PICTORIAL as PICTORIAL_JADWAL, ABSTRACT as ABSTRACT_JADWAL };
