import type { AdeganStory } from "./logika-story";
import {
  UJI1, UJI2, UJI2_JAJAR, UJI2_SEGITIGA, UJI3, UJI3_LAYANG, UJI3_SEGITIGA, UJI3_TRAP_1, UJI3_TRAP_2, UJI4, UJI4_PP1, UJI4_PP2, UJI4_TRAP,
  W, bulat, deret, idDeret, idKartu, judul, kartu, lukis, petak, potong, tabel, teks,
} from "./k5b5c-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k5b5c-bantu";

/** Letak bangun Uji Kompetensi pada gambar (pojok kiri-atas dan piksel per satuan). */
export const LETAK_UJI = {
  u1: { ox: 30, oy: 38, s: 6 },
  u2: { ox: 30, oy: 40, s: 5 },
  u3: { ox: 20, oy: 44, s: 16 },
  u4: { ox: 16, oy: 48, s: 14 },
};

/* ------------------------------ 8. Uji Kompetensi: empat soal dan soal 1 (Buku Siswa hlm. 162; Panduan Guru hlm. 236) ------------------------------ */
const L1 = LETAK_UJI.u1;

export const ADEGAN_UJI_1: AdeganStory = {
  id: "uji-1",
  judul: "Uji Kompetensi: empat soal dan soal nomor 1",
  sumber: "Buku Siswa hlm. 162; Panduan Guru hlm. 236",
  latar: "#FFF1F2",
  kutipan: [
    "Uji Kompetensi",
    "Cobalah menghitung luas daerah bangun gabungan berikut",
    "18 cm",
    "24 cm",
    "= 216",
    "Jadi, luas daerah layang-layang 216 cm2",
  ],
  ketukan: [
    k(
      "Sekarang kita masuk ke Uji Kompetensi. Perintahnya, cobalah menghitung luas daerah bangun gabungan berikut. Ada empat soal.",
      tambah(0, judul("Uji Kompetensi", W.merah)),
      tambah("menghitung", lukis("m1", 18, 76, 2.4, UJI1, W.langit, W.oranye), lukis("m2", 90, 76, 2.2, UJI2, W.krem, W.oranye)),
      tambah("empat", lukis("m3", 148, 76, 6, UJI3, W.hijauMuda, W.oranye), lukis("m4", 208, 76, 5, UJI4, W.pink, W.oranye)),
      tambah("soal.", bulat("c1", 47, 54, 9, W.pink), teks("c1-t", 47, 57.5, "1", 10), bulat("c2", 113, 54, 9, W.pink), teks("c2-t", 113, 57.5, "2", 10), bulat("c3", 172, 54, 9, W.pink), teks("c3-t", 172, 57.5, "3", 10), bulat("c4", 230, 54, 9, W.pink), teks("c4-t", 230, 57.5, "4", 10)),
    ),
    k(
      "Soal nomor 1 berupa layang-layang. Diagonalnya 24 sentimeter mendatar dan 18 sentimeter tegak.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi nomor 1")),
      tambah("layang-layang.", lukis("u1-b", L1.ox, L1.oy, L1.s, UJI1, W.langit, W.oranye)),
      tambah("24", potong("u1-d1", L1.ox, L1.oy, L1.s, [0, 9], [24, 9], W.merah), teks("u1-n1", 124, 88, "24 cm", 8.8, W.merah)),
      tambah("18", potong("u1-d2", L1.ox, L1.oy, L1.s, [5, 0], [5, 18], W.hijau), teks("u1-n2", 84, 64, "18 cm", 8.8, W.hijau)),
    ),
    k(
      "Luas layang-layang adalah setengah kali diagonal 1 kali diagonal 2, yaitu setengah kali 24 kali 18, sama dengan 12 kali 18.",
      tambah("Luas", teks("u1-f1", 150, 164, "Luas = ½ × diagonal 1 × diagonal 2", 9, W.biru)),
      tambah("yaitu", teks("u1-f2", 150, 180, "= ½ × 24 × 18 = 12 × 18", 9.6, W.biru)),
    ),
    k(
      "Hasilnya 216. Jadi, luas layang-layang itu 216 sentimeter persegi.",
      tambah("Hasilnya", teks("u1-f3", 150, 196, "= 216", 9.6, W.hijau)),
      tambah("Jadi,", ...kartu("u1-h", 196, 60, 94, 36, W.emas, ["216 cm²"], 12)),
    ),
  ],
};

/* ------------------------------ 9. Soal nomor 2: jajargenjang dan segitiga (hlm. 162; Panduan Guru hlm. 236) ------------------------------ */
const L2 = LETAK_UJI.u2;
const PANEL_X = 222;

export const ADEGAN_UJI_2: AdeganStory = {
  id: "uji-2",
  judul: "Uji Kompetensi nomor 2: jajargenjang dan segitiga",
  sumber: "Buku Siswa hlm. 162; Panduan Guru hlm. 236",
  latar: "#FFF7ED",
  kutipan: [
    "8 cm",
    "16 cm",
    "12 cm",
    "Luas = Luas daerah jajargenjang + Luas",
    "daerah segitiga",
    "= 224",
    "Jadi, luas daerah bangun gabungan",
    "tersebut 224 cm2",
  ],
  ketukan: [
    k(
      "Soal nomor 2 adalah bangun gabungan: jajargenjang di atas dan segitiga di bawahnya. Ukurannya 16, 8, dan 12 sentimeter.",
      tambah(0, judul("Uji Kompetensi nomor 2")),
      tambah("gabungan:", lukis("u2-b", L2.ox, L2.oy, L2.s, UJI2, W.putih, W.oranye)),
      tambah("16,", potong("u2-d1", L2.ox, L2.oy, L2.s, [0, 8], [16, 8], W.merah, { z: 5 }), teks("u2-n1", 70, 74, "16 cm", 8.6, W.merah, { z: 5 })),
      tambah("8,", potong("u2-d2", L2.ox, L2.oy, L2.s, [16, 0], [16, 8], W.hijau, { z: 5 }), teks("u2-n2", 96, 62, "8 cm", 8.6, W.hijau, { z: 5 })),
      tambah("12", teks("u2-n3", 132, 112, "12 cm", 8.6, W.hijau, { z: 5 })),
    ),
    k(
      "Pecah menjadi jajargenjang dengan alas 16 dan tinggi 8, ditambah segitiga dengan alas 16 dan tinggi 12.",
      tambah("jajargenjang", lukis("u2-p1", L2.ox, L2.oy, L2.s, UJI2_JAJAR, W.langit, W.oranye)),
      tambah("segitiga", lukis("u2-p2", L2.ox, L2.oy, L2.s, UJI2_SEGITIGA, W.krem, W.oranye)),
      tambah("ditambah", ...kartu("u2-k", 150, 44, 140, 34, W.hijauMuda, ["jajargenjang + segitiga"], 8.8)),
    ),
    k(
      "Luas jajargenjang adalah alas kali tinggi, yaitu 16 kali 8, sama dengan 128.",
      sorotkan(0, "u2-p1"),
      tambah("Luas", ...deret("u2-a", PANEL_X, 100, ["jajargenjang:", "alas × tinggi"], 8.8, W.biru, 14)),
      tambah("yaitu", ...deret("u2-b", PANEL_X, 128, ["= 16 × 8 = 128"], 9.6, W.hijau, 14)),
    ),
    k(
      "Luas segitiga adalah setengah kali alas kali tinggi, yaitu setengah kali 16 kali 12, sama dengan 8 kali 12, yaitu 96.",
      redamkan(0, "u2-p1"),
      sorotkan(0, "u2-p2"),
      hapus(0, ...idDeret("u2-a", 2), ...idDeret("u2-b", 1)),
      tambah("Luas", ...deret("u2-c", PANEL_X, 100, ["segitiga:", "½ × alas × tinggi"], 8.8, W.biru, 14)),
      tambah("yaitu", ...deret("u2-d", PANEL_X, 128, ["= ½ × 16 × 12", "= 8 × 12 = 96"], 9.6, W.hijau, 14)),
    ),
    k(
      "Jumlahnya 128 ditambah 96, sama dengan 224. Jadi, luas bangun gabungan itu 224 sentimeter persegi.",
      redamkan(0, "u2-p2"),
      hapus(0, ...idDeret("u2-c", 2), ...idDeret("u2-d", 2), ...idKartu("u2-k", 1)),
      tambah("Jumlahnya", ...kartu("u2-h", 156, 90, 130, 36, W.emas, ["128 + 96 = 224"], 11)),
      tambah("Jadi,", teks("u2-s", PANEL_X, 150, "224 cm²", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Soal nomor 3: bangun A pada petak, dua cara (hlm. 162; Panduan Guru hlm. 236-237) ------------------------------ */
const L3 = LETAK_UJI.u3;

export const ADEGAN_UJI_3: AdeganStory = {
  id: "uji-3",
  judul: "Uji Kompetensi nomor 3: bangun A pada petak, dua cara",
  sumber: "Buku Siswa hlm. 162; Panduan Guru hlm. 236–237",
  latar: "#F0FDFA",
  kutipan: [
    "Cara 1",
    "Cara 2",
    "luas daerah layang-layang +",
    "luas daerah trapesium",
    "= 10 + 12",
    "= 22",
    "= 2 + 20",
    "luas daerah segitiga + luas",
    "Jadi, luas daerah bangun gabungan",
    "adalah 22 satuan luas",
  ],
  ketukan: [
    k(
      "Soal nomor 3 digambar di atas petak. Bangun A boleh dipecah dengan dua cara. Kita lihat cara pertama dulu.",
      tambah(0, judul("Uji Kompetensi nomor 3")),
      tambah("digambar", petak("u3-g", L3.ox, L3.oy, 7, 6, L3.s), lukis("u3-b", L3.ox, L3.oy, L3.s, UJI3, W.putih, W.oranye, { tebal: 2.2 })),
      tambah("Bangun", teks("u3-A", L3.ox + 4 * L3.s, L3.oy + 3.6 * L3.s, "A", 11, W.biru)),
      tambah("cara", ...kartu("u3-c1", 150, 44, 140, 28, W.krem, ["bisa dipecah 2 cara"], 8.8)),
    ),
    k(
      "Cara 1: pecah menjadi layang-layang dan trapesium. Diagonal layang-layang itu 5 mendatar dan 4 tegak.",
      hapus(0, "u3-c1-k", "u3-c1-t0"),
      tambah("layang-layang.", lukis("u3-p1", L3.ox, L3.oy, L3.s, UJI3_LAYANG, W.langit, W.oranye)),
      tambah("trapesium.", lukis("u3-p2", L3.ox, L3.oy, L3.s, UJI3_TRAP_1, W.krem, W.oranye)),
      tambah("Cara", ...kartu("u3-t1", 150, 44, 140, 28, W.hijauMuda, ["Cara 1"], 10)),
      tambah("5", potong("u3-d1", L3.ox, L3.oy, L3.s, [1, 2], [6, 2], W.merah)),
      tambah("4.", potong("u3-d2", L3.ox, L3.oy, L3.s, [2, 0], [2, 4], W.hijau), ...deret("u3-n", PANEL_X, 92, ["diagonal 1 = 5", "diagonal 2 = 4"], 8.8, W.biru, 14)),
    ),
    k(
      "Luas layang-layang adalah setengah kali 5 kali 4, sama dengan 10.",
      sorotkan(0, "u3-p1"),
      tambah("Luas", ...deret("u3-f", PANEL_X, 132, ["layang-layang:", "½ × 5 × 4 = 10"], 9, W.hijau, 14)),
    ),
    k(
      "Trapesiumnya punya sisi sejajar 2 dan 4, dengan tinggi 4. Luasnya setengah kali 6 kali 4, sama dengan 12.",
      redamkan(0, "u3-p1"),
      sorotkan(0, "u3-p2"),
      hapus(0, ...idDeret("u3-n", 2), ...idDeret("u3-f", 2)),
      tambah("sejajar", teks("u3-s1", L3.ox + 1.2 * L3.s, L3.oy + 5.2 * L3.s, "2", 9, W.merah), teks("u3-s2", L3.ox + 6.6 * L3.s, L3.oy + 4.2 * L3.s, "4", 9, W.merah)),
      tambah("tinggi", teks("u3-t", L3.ox + 4 * L3.s, L3.oy + 6.9 * L3.s, "tinggi 4", 8.4, W.hijau)),
      tambah("Luasnya", ...deret("u3-g", PANEL_X, 100, ["trapesium:", "½ × (2 + 4) × 4", "= ½ × 6 × 4 = 12"], 9, W.hijau, 14)),
    ),
    k(
      "Jumlahnya 10 ditambah 12, sama dengan 22. Jadi, luas bangun A adalah 22 satuan luas.",
      redamkan(0, "u3-p2"),
      hapus(0, "u3-s1", "u3-s2", "u3-t", ...idDeret("u3-g", 3), "u3-d1", "u3-d2"),
      tambah("Jumlahnya", ...kartu("u3-h", 150, 90, 140, 36, W.emas, ["10 + 12 = 22"], 11)),
      tambah("Jadi,", teks("u3-r", PANEL_X, 150, "22 satuan luas", 10, W.hijau)),
    ),
    k(
      "Cara 2: pecah menjadi segitiga di kiri dan trapesium besar. Segitiganya beralas 4 dan tinggi 1, luasnya 2.",
      bersih(0),
      tambah(0, judul("nomor 3, cara 2")),
      tambah(0, petak("u3-g", L3.ox, L3.oy, 7, 6, L3.s), lukis("u3-b", L3.ox, L3.oy, L3.s, UJI3, W.putih, W.oranye, { tebal: 2.2 })),
      tambah("segitiga", lukis("u3-q1", L3.ox, L3.oy, L3.s, UJI3_SEGITIGA, W.langit, W.oranye)),
      tambah("trapesium", lukis("u3-q2", L3.ox, L3.oy, L3.s, UJI3_TRAP_2, W.krem, W.oranye)),
      tambah("Cara", ...kartu("u3-t2", 150, 44, 140, 28, W.hijauMuda, ["Cara 2"], 10)),
      tambah("beralas", ...deret("u3-m", PANEL_X, 100, ["segitiga:", "alas 4, tinggi 1", "½ × 4 × 1 = 2"], 9, W.hijau, 14)),
    ),
    k(
      "Trapesium besarnya punya sisi sejajar 4 dan 6 dengan tinggi 4, luasnya 20. Jumlahnya 2 ditambah 20, tetap 22.",
      sorotkan(0, "u3-q2"),
      hapus(0, ...idDeret("u3-m", 3)),
      tambah("Trapesium", ...deret("u3-n", PANEL_X, 100, ["trapesium besar:", "½ × (4 + 6) × 4", "= 20"], 9, W.hijau, 14)),
      tambah("tetap", ...kartu("u3-z", 150, 150, 140, 30, W.emas, ["2 + 20 = 22"], 11)),
    ),
  ],
};

/* ------------------------------ 11. Soal nomor 4: bangun B pada petak (hlm. 162; Panduan Guru hlm. 236-237, 241) ------------------------------ */
const L4 = LETAK_UJI.u4;

export const ADEGAN_UJI_4: AdeganStory = {
  id: "uji-4",
  judul: "Uji Kompetensi nomor 4: bangun B dan selisih angka di Panduan Guru",
  sumber: "Buku Siswa hlm. 162; Panduan Guru hlm. 236–237, 241",
  latar: "#FEFCE8",
  kutipan: [
    "luas daerah persegi panjang 1 +",
    "luas daerah persegi panjang 2 + luas daerah trapesium",
    "= 8 + 6",
    "(sisi atas + sisi bawah)",
    "(2 + 1)",
    "= 20",
    "(3 + 1)",
    "= 22",
  ],
  ketukan: [
    k(
      "Soal nomor 4 juga di atas petak. Bangun B terdiri atas dua persegi panjang dan satu trapesium di sisi kanan.",
      tambah(0, judul("Uji Kompetensi nomor 4")),
      tambah("juga", petak("u4-g", L4.ox, L4.oy, 9, 6, L4.s), lukis("u4-b", L4.ox, L4.oy, L4.s, UJI4, W.putih, W.oranye, { tebal: 2.2 })),
      tambah("Bangun", teks("u4-B", L4.ox + 4.5 * L4.s, L4.oy + 2.2 * L4.s + 3, "B", 11, W.biru)),
      tambah("trapesium", lukis("u4-p3", L4.ox, L4.oy, L4.s, UJI4_TRAP, W.krem, W.oranye)),
    ),
    k(
      "Persegi panjang pertama berukuran 2 kali 4, luasnya 8. Persegi panjang kedua berukuran 3 kali 2, luasnya 6.",
      tambah("pertama", lukis("u4-p1", L4.ox, L4.oy, L4.s, UJI4_PP1, W.langit, W.oranye)),
      tambah("kedua", lukis("u4-p2", L4.ox, L4.oy, L4.s, UJI4_PP2, W.hijauMuda, W.oranye)),
      tambah("pertama", ...deret("u4-a", PANEL_X, 70, ["persegi panjang 1:", "2 × 4 = 8"], 9, W.biru, 14)),
      tambah("kedua", ...deret("u4-c", PANEL_X, 108, ["persegi panjang 2:", "3 × 2 = 6"], 9, W.hijau, 14)),
    ),
    k(
      "Trapesium di kanan punya sisi sejajar 1 dan 2, dengan tinggi 4. Luasnya setengah kali 3 kali 4, sama dengan 6.",
      sorotkan(0, "u4-p3"),
      tambah("Trapesium", ...deret("u4-d", PANEL_X, 146, ["trapesium:", "½ × (1 + 2) × 4 = 6"], 9, W.hijau, 14)),
    ),
    k(
      "Jumlahnya 8 ditambah 6 ditambah 6, sama dengan 20. Jadi, luas bangun B sesuai Cara 1 di Panduan Guru adalah 20 satuan luas.",
      redamkan(0, "u4-p3"),
      hapus(0, ...idDeret("u4-a", 2), ...idDeret("u4-c", 2), ...idDeret("u4-d", 2)),
      tambah("Jumlahnya", ...kartu("u4-h", 150, 60, 140, 36, W.emas, ["8 + 6 + 6 = 20"], 11)),
      tambah("Jadi,", teks("u4-r", PANEL_X, 120, "20 satuan luas", 10, W.hijau)),
    ),
    k(
      "Catatan: rubrik Panduan Guru menulis jumlah sisi sejajar trapesium 3 ditambah 1, hasilnya 22. Petak menunjukkan 2 ditambah 1, jadi yang cocok 20.",
      hapus(0, "u4-r"),
      tambah("rubrik", ...kartu("u4-w1", 150, 104, 140, 30, W.merahMuda, ["rubrik: (3 + 1) → 22"], 8.8)),
      tambah("Petak", ...kartu("u4-w2", 150, 142, 140, 30, W.hijauMuda, ["petak: (2 + 1) → 20"], 8.8)),
    ),
  ],
};

/* ------------------------------ 12. Rubrik penilaian Uji Kompetensi (Panduan Guru hlm. 238-241) ------------------------------ */
export const ADEGAN_RUBRIK: AdeganStory = {
  id: "rubrik",
  judul: "Rubrik penilaian Uji Kompetensi",
  sumber: "Panduan Guru hlm. 238–241",
  latar: "#F5F3FF",
  kutipan: [
    "Rubrik Penilaian",
    "Tabel 5.15 Rubrik Penilaian Uji Kompetensi",
    "TOTAL SKOR",
    "Peserta didik tidak",
    "menjawab sama sekali",
    "Peserta didik hanya",
    "memberikan hasil akhir",
    "dan masih kurang tepat",
    "dilengkapi satuan",
    "cara mengerjakan yang runtut",
  ],
  ketukan: [
    k(
      "Panduan Guru memberi rubrik penilaian Uji Kompetensi. Skor maksimum nomor 1 adalah 4, nomor 2 adalah 6, nomor 3 dan nomor 4 masing-masing 10.",
      tambah(0, judul("rubrik Uji Kompetensi", W.ungu)),
      tambah("Skor", ...tabel("rb", 60, 36, [60, 120], [["Nomor", "Skor maksimum"], ["1", "4"]], 16, 9)),
      tambah("nomor@2", ...tabel("rb2", 60, 68, [60, 120], [["2", "6"]], 16, 9)),
      tambah("nomor@3", ...tabel("rb3", 60, 84, [60, 120], [["3", "10"]], 16, 9)),
      tambah("masing-masing", ...tabel("rb4", 60, 100, [60, 120], [["4", "10"]], 16, 9)),
    ),
    k(
      "Totalnya 4 ditambah 6 ditambah 10 ditambah 10, yaitu 30. Peserta didik yang tidak menjawab sama sekali mendapat 0.",
      tambah("Totalnya", ...kartu("tt", 60, 124, 180, 28, W.emas, ["total skor: 30"], 10)),
      tambah("0.", ...kartu("n0", 60, 160, 180, 28, W.merahMuda, ["tidak menjawab: 0"], 9)),
    ),
    k(
      "Jawaban yang hasil akhirnya benar, dilengkapi satuan dan cara mengerjakan yang runtut, mendapat skor penuh. Hasil benar tanpa cara, atau cara yang kurang tepat, mendapat skor di bawahnya.",
      bersih(0),
      tambah(0, judul("tingkat jawaban nomor 1")),
      tambah("Jawaban", ...kartu("lv4", 20, 40, 260, 28, W.hijauMuda, ["4: benar, ada satuan, cara runtut"], 8.8)),
      tambah("tanpa", ...kartu("lv2", 20, 76, 260, 28, W.krem, ["2: benar dan ada satuan, tanpa cara"], 8.8)),
      tambah("kurang", ...kartu("lv3", 20, 112, 260, 28, W.langit, ["3: ada cara, tetapi hitungan kurang tepat"], 8.8)),
      tambah("bawahnya.", ...kartu("lv1", 20, 148, 260, 28, W.pink, ["1: hanya hasil akhir, masih kurang tepat"], 8.8)),
    ),
    k(
      "Skalanya berbeda tiap nomor, tetapi pola penilaiannya sama. Jadi tulislah rumusnya, hitungannya, hasilnya, dan satuannya dengan runtut.",
      ubah(0, { id: "jud", isi: "pola penilaian semua nomor" }),
      hapus(0, ...idKartu("lv4", 1), ...idKartu("lv2", 1), ...idKartu("lv3", 1), ...idKartu("lv1", 1)),
      tambah("tulislah", ...kartu("w1", 40, 40, 220, 30, W.hijauMuda, ["tulis rumusnya"], 9.6)),
      tambah("hitungannya,", ...kartu("w2", 40, 80, 220, 30, W.langit, ["tulis hitungannya"], 9.6)),
      tambah("hasilnya,", ...kartu("w3", 40, 120, 220, 30, W.krem, ["tulis hasilnya"], 9.6)),
      tambah("satuannya", ...kartu("w4", 40, 160, 220, 30, W.pink, ["tulis satuannya"], 9.6)),
    ),
  ],
};
