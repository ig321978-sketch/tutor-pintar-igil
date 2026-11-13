import type { AdeganStory } from "./logika-story";
import { W, angka, deretLembar, emo, kartu, keping, lembar, panah, tempat, teks } from "./k5b9c-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b9c-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab C (hlm. 273 sampai 275 dan 288) ------------------------------ */
export const ADEGAN_PEMBUKA_C: AdeganStory = {
  id: "pembuka-c",
  judul: "Pembuka Sub-Bab C: komposisi dan dekomposisi",
  sumber: "Buku Siswa hlm. 273–275 dan 288; Buku Panduan Guru hlm. 407–408",
  latar: "#F0F9FF",
  kutipan: [
    "menentukan komposisi dan dekomposisinya",
    "Bagaimana menentukan komposisi bilangan 599.198",
    "C. Komposisi dan Dekomposisi Bilangan Sampai 1.000.000",
    "Bilangan bulat, bilangan cacah, nilai tempat, komposisi, dekomposisi",
  ],
  ketukan: [
    k(
      "Sub-Bab C membahas komposisi dan dekomposisi bilangan sampai 1.000.000. Komposisi berarti menyusun, dekomposisi berarti menguraikan.",
      tambah(0, teks("jud", 150, 26, "C. Komposisi dan Dekomposisi", 13, W.ungu), teks("jud2", 150, 44, "bilangan sampai 1.000.000", 9.4, W.biru)),
      tambah("menyusun,", ...kartu("ks", 20, 70, 124, 62, W.mint, ["Komposisi", "menyusun"], 11)),
      tambah("menguraikan.", ...kartu("dk", 156, 70, 124, 62, W.mawar, ["Dekomposisi", "menguraikan"], 11)),
    ),
    k(
      "Di pembuka bab ada pertanyaan: bagaimana menentukan komposisi bilangan 599.198? Jawabannya kita cari di sub-bab ini.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pertanyaan pembuka bab", 12, W.ungu)),
      tambah("komposisi", teks("kmp", 150, 56, "Komposisi bilangan", 11, W.biru)),
      tambah("599.198?", teks("bil", 150, 106, "599.198", 30, W.ungu)),
      tambah("Jawabannya", emo("tny", 150, 160, "🤔", 32)),
    ),
    k(
      "Alat bantunya uang rupiah. Ada lembaran seratus ribu, lima puluh ribu, dua puluh ribu, sepuluh ribu, lima ribu, dan dua ribu, serta keping lima ratus dan seratus.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Pecahan uang rupiah", 12, W.ungu)),
      tambah(6, ...lembar("u1", 30, 34, 100000, 62, 28)),
      tambah(8, ...lembar("u2", 119, 34, 50000, 62, 28)),
      tambah(11, ...lembar("u3", 208, 34, 20000, 62, 28)),
      tambah(14, ...lembar("u4", 30, 72, 10000, 62, 28)),
      tambah(16, ...lembar("u5", 119, 72, 5000, 62, 28)),
      tambah(19, ...lembar("u6", 208, 72, 2000, 62, 28)),
      tambah(22, ...keping("c5", 120, 142, 500)),
      tambah(26, ...keping("c1", 180, 142, 100)),
    ),
    k(
      "Buku Panduan Guru menyarankan guru membawa uang mainan, supaya anak mengenal tiap pecahan uang sebelum belajar.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Saran Buku Panduan Guru", 12, W.ungu)),
      tambah("uang", emo("um", 90, 100, "💵", 44)),
      tambah("mainan,", ...kartu("mn", 140, 66, 140, 44, W.krem, ["uang mainan"], 11)),
      tambah("mengenal", ...kartu("kn", 140, 122, 140, 44, W.langit, ["kenali tiap pecahan"], 10)),
    ),
    k(
      "Pada sub-bab ini kita memakai nilai tempat dari Sub-Bab A dan membandingkan bilangan dari Sub-Bab B untuk memeriksa hasil.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tiga sub-bab saling memakai", 12, W.ungu)),
      tambah("nilai", ...kartu("sa", 16, 60, 76, 60, W.mint, ["Sub-Bab A", "nilai tempat"], 8.6)),
      tambah("membandingkan", ...kartu("sb", 112, 60, 76, 60, W.langit, ["Sub-Bab B", "banding"], 8.6)),
      tambah("hasil.", ...kartu("sc", 208, 60, 76, 60, W.krem, ["Sub-Bab C", "susun, uraikan"], 8.6), panah("p1", 92, 90, 20, 0, W.merah, 2), panah("p2", 188, 90, 20, 0, W.merah, 2)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 9.3A: uang Yosep (hlm. 288) ------------------------------ */
const BARIS_Y = [32, 62, 92, 122, 152];
const NILAI_Y = [100000, 20000, 10000, 5000, 2000];
const JUMLAH_Y = [5, 4, 3, 1, 4];

export const ADEGAN_YOSEP_UANG: AdeganStory = {
  id: "yosep-uang",
  judul: "Eksplorasi 9.3A: uang Yosep",
  sumber: "Buku Siswa hlm. 288",
  latar: "#FFFBEB",
  kutipan: [
    "Eksplorasi 9.3A",
    "Uang Yosep",
    "Yosep mempunyai 5 lembar seratus ribuan, 4 lembar dua puluh ribuan, 3 lembar sepuluh ribuan, 1 lembar lima ribuan, dan 4 lembar dua ribuan",
    "Tuliskan uang Yosep pada tabel berikut",
  ],
  ketukan: [
    k(
      "Eksplorasi 9.3A. Yosep mempunyai lima lembar seratus ribuan, empat lembar dua puluh ribuan, tiga lembar sepuluh ribuan, satu lembar lima ribuan, dan empat lembar dua ribuan.",
      tambah(0, teks("jud", 150, 16, "Eksplorasi 9.3A: uang Yosep", 10, W.ungu)),
      tambah(6, ...deretLembar("y0", 56, BARIS_Y[0], NILAI_Y[0], JUMLAH_Y[0])),
      tambah(11, ...deretLembar("y1", 56, BARIS_Y[1], NILAI_Y[1], JUMLAH_Y[1])),
      tambah(15, ...deretLembar("y2", 56, BARIS_Y[2], NILAI_Y[2], JUMLAH_Y[2])),
      tambah(19, ...deretLembar("y3", 56, BARIS_Y[3], NILAI_Y[3], JUMLAH_Y[3])),
      tambah(24, ...deretLembar("y4", 56, BARIS_Y[4], NILAI_Y[4], JUMLAH_Y[4])),
    ),
    k(
      "Banyaknya lembar tiap pecahan kita catat: lima, empat, tiga, satu, dan empat lembar.",
      tambah(6, teks("n0", 6, BARIS_Y[0] + 14, "5 lembar", 7.6, W.merah, { anchor: "start" })),
      tambah(7, teks("n1", 6, BARIS_Y[1] + 14, "4 lembar", 7.6, W.merah, { anchor: "start" })),
      tambah(8, teks("n2", 6, BARIS_Y[2] + 14, "3 lembar", 7.6, W.merah, { anchor: "start" })),
      tambah(9, teks("n3", 6, BARIS_Y[3] + 14, "1 lembar", 7.6, W.merah, { anchor: "start" })),
      tambah(11, teks("n4", 6, BARIS_Y[4] + 14, "4 lembar", 7.6, W.merah, { anchor: "start" })),
    ),
    k(
      "Nilai tiap kelompok: lima kali seratus ribu adalah 500.000, empat kali dua puluh ribu adalah 80.000, tiga kali sepuluh ribu adalah 30.000, satu lima ribuan adalah 5.000, dan empat dua ribuan adalah 8.000.",
      tambah(8, teks("v0", 232, BARIS_Y[0] + 14, "500.000", 8, W.hijau, { anchor: "start" })),
      tambah(15, teks("v1", 232, BARIS_Y[1] + 14, "80.000", 8, W.hijau, { anchor: "start" })),
      tambah(21, teks("v2", 232, BARIS_Y[2] + 14, "30.000", 8, W.hijau, { anchor: "start" })),
      tambah(26, teks("v3", 232, BARIS_Y[3] + 14, "5.000", 8, W.hijau, { anchor: "start" })),
      tambah(32, teks("v4", 232, BARIS_Y[4] + 14, "8.000", 8, W.hijau, { anchor: "start" })),
    ),
    k(
      "Sekarang nilai-nilai ini kita gabungkan dengan bantuan tabel nilai tempat pada adegan berikutnya.",
      tambah("gabungkan", panah("pg", 150, 184, 0, 14, W.merah, 2.5, { gambar: true }), teks("pgt", 150, 204, "tabel nilai tempat", 8.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Tabel nilai tempat uang Yosep (hlm. 288 dan 289) ------------------------------ */
export const ADEGAN_YOSEP_TABEL: AdeganStory = {
  id: "yosep-tabel",
  judul: "Tabel nilai tempat uang Yosep",
  sumber: "Buku Siswa hlm. 288–289",
  latar: "#F0FDF4",
  kutipan: [
    "Tuliskan uang Yosep pada tabel berikut",
    "Berapakah jumlah uang Yosep",
    "Uang Yosep",
    "Eksplorasi 9.3A",
  ],
  ketukan: [
    k(
      "Isi tabel nilai tempat uang Yosep. Lima lembar seratus ribuan mengisi kolom ratus ribuan dengan angka 5, nilainya 500.000.",
      tambah(0, teks("jud", 150, 16, "Tabel nilai tempat uang Yosep", 10, W.ungu), tempat("tb", 18, 24)),
      tambah("angka", angka("dg", 18, 24, 0, "5", W.merah)),
      tambah("nilainya", teks("nl", 40, 88, "500.000", 8.4, W.hijau)),
    ),
    k(
      "Empat lembar dua puluh ribuan bernilai 80.000 dan tiga lembar sepuluh ribuan bernilai 30.000. Keduanya mengisi kolom puluh ribuan.",
      tambah("80.000", teks("e1", 150, 108, "4 x 20.000 = 80.000", 8.4)),
      tambah("30.000", teks("e2", 150, 122, "3 x 10.000 = 30.000", 8.4)),
    ),
    k(
      "Delapan puluh ribu ditambah tiga puluh ribu sama dengan 110.000. Jumlah ini lebih dari satu kolom, sehingga satu ratus ribuan pindah ke kolom ratus ribuan.",
      tambah("Delapan", teks("e3", 150, 138, "80.000 + 30.000 = 110.000", 8.4, W.merah)),
      tambah("pindah", teks("e4", 150, 152, "110.000 = 100.000 + 10.000", 8.4, W.merah)),
    ),
    k(
      "Lima ribu ditambah 8.000 sama dengan 13.000. Jadi ada satu puluh ribuan lagi dan tiga ribuan.",
      tambah("13.000.", teks("e5", 150, 168, "5.000 + 8.000 = 13.000", 8.4, W.merah)),
    ),
    k(
      "Sekarang semua kolom terisi. Ratus ribuan 6, puluh ribuan 2, ribuan 3, dan sisanya nol. Uang Yosep 623.000, dibaca enam ratus dua puluh tiga ribu rupiah.",
      hapus("Sekarang", "e1", "e2", "e3", "e4", "e5", "nl"),
      ubah(4, { id: "dg0", isi: "6", warna: W.biru }),
      tambah(7, angka("dg", 18, 24, 1, "2")),
      tambah(10, angka("dg", 18, 24, 2, "3")),
      tambah(13, angka("dg", 18, 24, 3, "0"), angka("dg", 18, 24, 4, "0"), angka("dg", 18, 24, 5, "0")),
      tambah(16, teks("jm", 150, 100, "500.000 + 80.000 + 30.000 + 5.000 + 8.000 = 623.000", 7.4, W.hijau), teks("hs", 150, 160, "623.000", 26, W.ungu)),
    ),
  ],
};

/* ------------------------------ 4. Uang Komang dan perbandingan (hlm. 289) ------------------------------ */
const KOMANG = [
  ["4 x 100.000", "400.000"],
  ["3 x 20.000", "60.000"],
  ["2 x 10.000", "20.000"],
  ["1 x 5.000", "5.000"],
  ["4 x 2.000", "8.000"],
];

export const ADEGAN_KOMANG: AdeganStory = {
  id: "komang-uang",
  judul: "Eksplorasi 9.3A: uang Komang dan perbandingan",
  sumber: "Buku Siswa hlm. 289",
  latar: "#FDF2F8",
  kutipan: [
    "Komang mempunyai 4 lembar seratus ribuan, 3 lembar dua puluh ribuan, 2 lembar sepuluh ribuan, 1 lembar lima ribuan, dan 4 lembar dua ribuan",
    "Uang Komang",
    "Berapakah jumlah Uang Komang",
    "Berapakah jumlah uang Yosep",
  ],
  ketukan: [
    k(
      "Komang mempunyai empat lembar seratus ribuan, tiga lembar dua puluh ribuan, dua lembar sepuluh ribuan, satu lembar lima ribuan, dan empat lembar dua ribuan.",
      tambah(0, teks("jud", 150, 18, "Uang Komang", 12, W.ungu)),
      tambah(4, teks("l0", 40, 44, KOMANG[0][0], 10, W.biru, { anchor: "start" })),
      tambah(9, teks("l1", 40, 62, KOMANG[1][0], 10, W.biru, { anchor: "start" })),
      tambah(13, teks("l2", 40, 80, KOMANG[2][0], 10, W.biru, { anchor: "start" })),
      tambah(17, teks("l3", 40, 98, KOMANG[3][0], 10, W.biru, { anchor: "start" })),
      tambah(22, teks("l4", 40, 116, KOMANG[4][0], 10, W.biru, { anchor: "start" })),
    ),
    k(
      "Nilai tiap kelompok berturut-turut 400.000, 60.000, 20.000, 5.000, dan 8.000.",
      tambah(4, teks("w0", 150, 44, `= ${KOMANG[0][1]}`, 10, W.hijau, { anchor: "start" })),
      tambah(5, teks("w1", 150, 62, `= ${KOMANG[1][1]}`, 10, W.hijau, { anchor: "start" })),
      tambah(6, teks("w2", 150, 80, `= ${KOMANG[2][1]}`, 10, W.hijau, { anchor: "start" })),
      tambah(7, teks("w3", 150, 98, `= ${KOMANG[3][1]}`, 10, W.hijau, { anchor: "start" })),
      tambah(9, teks("w4", 150, 116, `= ${KOMANG[4][1]}`, 10, W.hijau, { anchor: "start" })),
    ),
    k(
      "Enam puluh ribu ditambah 20.000 sama dengan 80.000, dan 5.000 ditambah 8.000 sama dengan 13.000.",
      tambah("Enam", teks("e1", 150, 142, "60.000 + 20.000 = 80.000", 9, W.merah)),
      tambah("dan", teks("e2", 150, 158, "5.000 + 8.000 = 13.000", 9, W.merah)),
    ),
    k(
      "Jumlahnya 400.000 ditambah 80.000 ditambah 13.000, yaitu 493.000. Dibaca empat ratus sembilan puluh tiga ribu rupiah.",
      tambah("Jumlahnya", teks("e3", 150, 182, "400.000 + 80.000 + 13.000 = 493.000", 9, W.ungu)),
    ),
    k(
      "Siapa yang uangnya lebih banyak? Bandingkan dari kiri: ratus ribuan 6 lawan 4. Uang Yosep lebih banyak, selisihnya 130.000.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Siapa lebih banyak?", 12, W.ungu)),
      tambah("Siapa", ...kartu("yo", 20, 40, 120, 44, W.mint, ["Yosep", "623.000"], 11), ...kartu("ko", 160, 40, 120, 44, W.mawar, ["Komang", "493.000"], 11)),
      tambah("Bandingkan", teks("bd", 150, 112, "ratus ribuan: 6 lawan 4", 11, W.biru)),
      tambah("Yosep", emo("pl", 80, 150, "👑", 26)),
      tambah("selisihnya", teks("sl", 150, 186, "623.000 - 493.000 = 130.000", 10, W.hijau)),
    ),
  ],
};
