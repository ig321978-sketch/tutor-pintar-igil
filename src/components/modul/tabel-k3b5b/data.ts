/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 5 Sub-Bab B "Tabel Bu Wulan" (turus berlima, tabel tiga kolom, membaca tabel), akhir cerita Bengkel Sepeda Pak Hasan.
 * Misi lanjutan "Misi Tabel" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (ban bocor 13, rantai lepas 10, rem blong 6, salah 15, selisih 7, lampu mati 9)
 * kecuali ruang jawaban yang sempit. Concrete memakai benda klub sepeda beremoji (helm, pita, bel, pompa) di meja klub bertaplak kotak-kotak, Pictorial memakai turus dan tabel polos di kertas tabel krem,
 * Abstract memakai kartu kata dan angka di lembar klub. Jawaban beragam: memilih bilangan, nama jenis, nama kolom, atau cara menulis turus, menulis satu angka di kanvas, dan mengucapkan satu kata
 * (terbanyak, tersedikit, lebih, kurang) atau bilangan pendek. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 3, 2, 7, 1; Pictorial 4, 1, 9, 2; Abstract 3, 4, 8, 2 (tidak kembar dalam satu tahap; ruang jawaban satu angka sempit, jadi sebagian sama dengan angka Story antartahap).
 * Diuji: scripts/uji-tabel-k3b5b.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LBaca, LBundel, LCacah, LIsi, LSalin, LTanya, Rupa, SoalMisi, Tiga } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_TABEL_TEKS } from "./data-sim";

const cacah = (benda: string, n: number): LCacah => ({ tipe: "cacah", benda, n });
const salin = (benda: string, n: number): LSalin => ({ tipe: "salin", benda, n });
const baca = (benda: string, baris: Tiga, sorot: number): LBaca => ({ tipe: "baca", benda, baris, sorot });
const bundel = (benda: string, n: number): LBundel => ({ tipe: "bundel", benda, n });
const isi = (benda: string, baris: Tiga): LIsi => ({ tipe: "isi", benda, baris });
const tanya = (benda: string, baris: Tiga, acuan: number, sorot = 0): LTanya => ({ tipe: "tanya", benda, baris, acuan, sorot });
const b = (nama: string, n: number) => ({ nama, n });
const salah = (dasar: LCacah | LIsi | LTanya | LBaca, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Tally Groups, Table Fill, Read and Ask. */
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

/* ------------------------------ Concrete: meja klub bertaplak kotak-kotak dengan benda klub sepeda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Tabel 2: meja klub bertaplak", "Bu Wulan menaruh perlengkapan klub di meja bertaplak kotak-kotak. Periksa papan klubnya.", [
    salah(
      cacah("pita", 8),
      "Raka",
      "Satu bundel punya enam garis, jadi enam ditambah tiga garis sisa, sembilan pita.",
      "9",
      [
        "Raka benar, coretan miring dihitung sebagai garis tambahan sehingga satu bundel berisi enam.",
        "Raka keliru: satu bundel hanya lima garis, karena coretan miring sudah termasuk. Satu bundel dan tiga garis sama dengan delapan.",
        "Raka keliru, garis sisa tidak perlu ditambahkan sehingga hasilnya enam.",
      ],
      1,
      "Satu bundel hanya lima garis, karena coretan miring sudah termasuk. Satu bundel ditambah tiga garis sisa sama dengan delapan, bukan sembilan.",
    ),
    bundel("helm", 17),
    isi("papan klub", [b("pita", 3), b("helm", 11), b("bel", 8)]),
    tanya("papan klub", [b("helm", 12), b("pita", 8), b("bel", 5)], 8),
  ]),
  C(3, "kanvas", "Misi Tabel 3: catatan Salsa", "Salsa mencatat perlengkapan klub di meja bertaplak. Periksa papan klubnya, lalu tulis jawabanmu di kanvas.", [
    salin("bel", 3),
    bundel("pita", 12),
    isi("papan klub", [b("bel", 1), b("pita", 2), b("helm", 4)]),
    tanya("papan klub", [b("helm", 12), b("pita", 4), b("bel", 18)], 10),
  ]),
  C(4, "suara", "Misi Tabel 4: panggilan Pak Joko", "Pak Joko memanggil dari pinggir halaman bengkel. Jawab dengan suaramu.", [
    baca("papan klub", [b("bel", 4), b("helm", 14), b("pita", 9)], 1),
    bundel("bel", 18),
    isi("papan klub", [b("helm", 7), b("pita", 5), b("bel", 8)]),
    tanya("papan klub", [b("pita", 11), b("bel", 6), b("helm", 13)], 8, 1),
  ]),
];

/* ------------------------------ Pictorial: kertas tabel krem dengan turus dan tabel polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Tabel 5: kertas tabel krem", "Bima menggambar turus dan tabel di kertas tabel krem. Periksa gambarnya.", [
    cacah("baris A", 14),
    bundel("baris B", 11),
    salah(
      isi("tabel Bima", [b("pompa", 5), b("helm", 12), b("pita", 8)]),
      "Raka",
      "Kolom ketiga itu kolom turus juga, jadi namanya turus.",
      "turus",
      [
        "Raka benar, turus boleh ditulis di dua kolom sekaligus.",
        "Raka keliru, kolom ketiga namanya jenis.",
        "Raka keliru: kolom turus sudah menjadi kolom kedua. Kolom ketiga berisi angka banyaknya, jadi namanya banyak.",
      ],
      2,
      "Kolom turus sudah menjadi kolom kedua. Kolom ketiga berisi angka banyaknya tiap jenis, jadi namanya banyak.",
    ),
    tanya("tabel Bima", [b("pompa", 5), b("helm", 9), b("pita", 12)], 9),
  ]),
  Pi(6, "kanvas", "Misi Tabel 6: tabel Salsa", "Salsa membuat tabel yang lebih lengkap. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    salin("baris C", 4),
    bundel("baris D", 16),
    isi("tabel Salsa", [b("pita", 4), b("bel", 3), b("helm", 2)]),
    tanya("tabel Salsa", [b("pita", 6), b("helm", 13), b("bel", 3)], 8),
  ]),
  Pi(7, "suara", "Misi Tabel 7: lapor ke Pak Joko", "Bima melaporkan tabelnya kepada Pak Joko. Sebutkan jawabanmu.", [
    baca("tabel Bima", [b("helm", 12), b("pita", 5), b("bel", 8)], 1),
    bundel("baris E", 19),
    isi("tabel Bima", [b("pita", 6), b("bel", 9), b("helm", 4)]),
    tanya("tabel Bima", [b("bel", 9), b("pita", 14), b("helm", 5)], 10, 1),
  ]),
];

/* ------------------------------ Abstract: lembar klub dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Tabel 8: lembar klub", "Lembar klub hanya berisi kata dan angka.", [
    cacah("kartu satu", 18),
    bundel("kartu dua", 7),
    isi("kartu tiga", [b("bel", 6), b("pita", 14), b("helm", 3)]),
    salah(
      tanya("kartu empat", [b("helm", 7), b("pita", 12), b("bel", 4)], 7, 1),
      "Salsa",
      "Yang lebih dari tujuh adalah helm, karena helm banyaknya tujuh.",
      "helm",
      [
        "Salsa benar, tujuh juga termasuk lebih dari tujuh.",
        "Salsa keliru: helm tepat sama dengan tujuh, jadi bukan lebih dari tujuh. Yang lebih dari tujuh hanya pita.",
        "Salsa keliru, yang lebih dari tujuh adalah bel.",
      ],
      1,
      "Helm tepat sama dengan tujuh, bukan lebih dari tujuh. Angka yang tepat sama dengan acuan tidak ikut dihitung, jadi hanya pita yang lebih dari tujuh.",
    ),
  ]),
  A(9, "kanvas", "Misi Tabel 9: tulis di lembar", "Raka meminta kamu menulis jawaban di kanvas.", [
    salin("kartu lima", 3),
    bundel("kartu enam", 14),
    isi("kartu tujuh", [b("pita", 1), b("bel", 3), b("helm", 4)]),
    tanya("kartu delapan", [b("helm", 11), b("pita", 4), b("bel", 7)], 9),
  ]),
  A(10, "suara", "Misi Tabel 10: laporan akhir", "Laporan akhir klub untuk Bu Wulan. Ucapkan jawabannya.", [
    baca("kartu sembilan", [b("bel", 16), b("pita", 8), b("helm", 11)], 0),
    bundel("kartu sepuluh", 12),
    isi("kartu sebelas", [b("bel", 12), b("pita", 4), b("helm", 9)]),
    tanya("kartu dua belas", [b("pita", 13), b("helm", 6), b("bel", 9)], 9, 1),
  ]),
];

export const POIN_PENTING = [
  "Turus berlima: empat garis tegak dicoret satu garis miring, jadi satu bundel berisi lima.",
  "Banyak seluruhnya adalah bundel dikali lima ditambah garis sisa, misalnya 2 bundel dan 3 garis sama dengan 13.",
  "Tabel tiga kolom memuat jenis, turus, dan banyak.",
  "Cacah dulu, tulis turus, lalu salin banyaknya sebagai angka pada kolom banyak.",
  "Baca kolom banyak untuk mencari yang terbanyak, yang tersedikit, lebih dari, kurang dari, dan selisihnya.",
  "Urutkan dulu supaya yang paling sedikit dan paling banyak mudah terlihat.",
  "Turus Berlima, Isi Tabel, dan Baca dan Tanya membantu menyajikan dan membaca data dengan teliti.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): kedua tamu dan semua tokoh hadir. */
export const PENUTUP_B =
  "Raka, Salsa, Bima, Pak Joko, Pak Hasan, dan Bu Wulan merayakan akhir bab di halaman bengkel. Spanduk Klub Sepeda Kampung Meriah terpasang, balon naik, dan konfeti beterbangan. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_TABEL = {
  concrete: { ikon: "\u{26D1}", nama: "Concrete", cara: "Meja klub bertaplak kotak-kotak: benda klub sepeda beremoji, sepeda mini, dan papan klub berturus" },
  pictorial: { ikon: "\u{1F4CB}", nama: "Pictorial", cara: "Kertas tabel krem bergaris biru: turus berlima, tabel polos, dan kartu bilangan" },
  abstract: { ikon: "\u{1F380}", nama: "Abstract", cara: "Lembar klub: kartu kata dan angka di kertas putih, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TABEL, PICTORIAL as PICTORIAL_TABEL, ABSTRACT as ABSTRACT_TABEL };
