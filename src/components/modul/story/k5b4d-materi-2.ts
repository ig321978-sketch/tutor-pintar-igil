import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, emo, kartu, labelSisi, panah, segiBeraturan, tanda, tandaSisi, teks } from "./k5b4d-gambar";
import { bersih, k, tambah, ubah } from "./k5b4d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/* ------------------------------ 4. Eksplorasi 4.4, segi lima: mengamati (BS hlm. 122; Panduan Guru hlm. 156) ------------------------------ */
export const ADEGAN_LIMA_1: AdeganStory = {
  id: "lima-1",
  judul: "Mengamati segi lima",
  sumber: "Materi: segi lima beraturan",
  latar: "#FFF4DD",
  kutipan: [
    "Perhatikan bangun-bangun datar berikut",
    "Ada berapa sisi yang dimiliki?",
    "Apakah sisi-sisinya sama panjang?",
    "Bangun apakah itu?",
    "Segi lima beraturan",
  ],
  ketukan: [
    k(
      "Sekarang kita mulai dengan segi lima. Perhatikan gambarnya baik-baik. Setiap sisi gambar itu panjangnya tiga sentimeter.",
      tambah(0, jud("Segi lima", 22)),
      tambah("segi", segiBeraturan("pk", 95, 118, 5, 46)),
      tambah("gambarnya", emo("gb", 232, 80, "🖼️", 30), teks("gt", 232, 104, "perhatikan gambarnya", 8.2)),
      tambah("Setiap", labelSisi("ls", 95, 118, 5, 46, "3 cm", 13, 7.6)),
    ),
    k(
      "Pertanyaan pertama: ada berapa sisi yang dimiliki? Hitung sisinya satu per satu, dan jawabannya lima.",
      bersih(0),
      tambah(0, jud("Ada berapa sisi?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 5, 46)),
      tambah("satu", labelSisi("ns", 95, 118, 5, 46, ["1", "2", "3", "4", "5"], 12, 9, W.merah)),
      tambah("lima.", kartu("jw", 196, 80, 88, 56, W.hijauMuda, ["jawaban:", "5 sisi"], 10)),
    ),
    k(
      "Pertanyaan kedua: apakah sisi-sisinya sama panjang? Jawabannya ya. Pastikan dengan mengukur memakai penggaris, dan semuanya tiga sentimeter.",
      bersih(0),
      tambah(0, jud("Sama panjang?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 5, 46), tandaSisi("tt", 95, 118, 5, 46)),
      tambah("Jawabannya", kartu("jw", 196, 56, 88, 40, W.hijauMuda, ["ya, sama panjang"], 8.8), tanda("jwc", 270, 92, true)),
      tambah("penggaris,", emo("rl", 240, 130, "📏", 28)),
      tambah("tiga", labelSisi("ls", 95, 118, 5, 46, "3 cm", 13, 7.6)),
    ),
    k(
      "Pertanyaan ketiga: bangun apakah itu? Karena memiliki lima sisi yang sama panjang, bangun itu disebut segi lima beraturan.",
      bersih(0),
      tambah(0, jud("Bangun apakah itu?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 5, 46, W.hijauMuda), tandaSisi("tt", 95, 118, 5, 46)),
      tambah("memiliki", teks("n1", 232, 82, "5 sisi", 10, W.biru), teks("n2", 232, 98, "sama panjang", 9, W.biru)),
      tambah("segi", kartu("nm", 180, 114, 108, 50, W.krem, ["segi lima", "beraturan"], 10)),
    ),
    k(
      "Kalau hasil ukur atau hitunganmu berbeda dari temanmu, jangan panik. Periksa lagi cara mengukur dan cara menghitungnya, lalu perbaiki.",
      bersih(0),
      tambah(0, jud("Jika hasilnya berbeda", 22)),
      tambah("berbeda", kartu("kl", 18, 60, 84, 56, W.merahMuda, ["ukur atau", "hitung keliru"], 8.8), tanda("klx", 92, 74, false)),
      tambah("Periksa", panah("kp", 106, 88, 34, 0, W.ungu, 2.4), emo("kg", 160, 92, "🔍", 28), teks("kgt", 160, 112, "periksa lagi caramu", 8)),
      tambah("perbaiki.", panah("kq", 184, 88, 24, 0, W.ungu, 2.4), kartu("kb", 212, 60, 76, 56, W.hijauMuda, ["diperbaiki"], 9), tanda("kbc", 280, 74, true)),
    ),
    k(
      "Jadi ciri segi lima beraturan ada dua: lima sisi, dan semua sisinya sama panjang. Ciri inilah yang membolehkan kita memakai perkalian.",
      bersih(0),
      tambah(0, jud("Ciri segi lima beraturan", 22)),
      tambah("segi", segiBeraturan("pk", 80, 112, 5, 44, W.hijauMuda), tandaSisi("tt", 80, 112, 5, 44)),
      tambah("lima@2", kartu("c1", 170, 56, 116, 40, W.krem, ["ciri 1: lima sisi"], 9.4)),
      tambah("sama", kartu("c2", 170, 106, 116, 40, W.muda, ["ciri 2: semua sisi", "sama panjang"], 9)),
      tambah("perkalian.", teks("c3", 228, 170, "boleh dikalikan", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 4.4, segi lima: keliling (BS hlm. 122; Panduan Guru hlm. 156) ------------------------------ */
export const ADEGAN_LIMA_2: AdeganStory = {
  id: "lima-2",
  judul: "Keliling segi lima beraturan",
  sumber: "Materi: keliling segi lima beraturan",
  latar: "#FFF4DD",
  kutipan: [
    "Bagaimana cara mencari kelilingnya?",
    "Keliling segi lima beraturan dapat dicari dengan cara",
    "Dengan demikian, diperoleh kelilingnya",
    "sehingga diperoleh kelilingnya 15 cm",
  ],
  ketukan: [
    k(
      "Pertanyaan keempat: bagaimana cara mencari kelilingnya? Keliling berarti jumlah semua sisi, yaitu tiga ditambah tiga ditambah tiga ditambah tiga ditambah tiga.",
      tambah(0, jud("Bagaimana mencari keliling?", 22)),
      tambah(0, segiBeraturan("pk", 70, 118, 5, 40), ...labelSisi("ls", 70, 118, 5, 40, "3", 11, 8.6)),
      tambah("Keliling", teks("kk", 220, 80, "Keliling =", 10, W.ungu)),
      tambah("tiga@2", teks("kj", 220, 106, "3+3+3+3+3", 12, W.biru)),
    ),
    k(
      "Jumlahnya lima belas. Karena kelima sisinya sama, penjumlahan berulang itu dapat diubah menjadi perkalian, yaitu lima kali tiga sama dengan lima belas.",
      bersih(0),
      tambah(0, jud("Jumlah berulang jadi kali", 22)),
      tambah("Jumlahnya", baris("j1", 40, 46, 220, "3+3+3+3+3 = 15", W.krem, 11, 28)),
      tambah("perkalian,", panah("jp", 150, 78, 0, 18, W.ungu, 2.4)),
      tambah("yaitu", baris("j2", 40, 102, 220, "5 x 3 = 15", W.hijauMuda, 11, 28)),
    ),
    k(
      "Sekarang isi titik-titik. Jumlahnya tiga sebanyak lima kali, lalu lima kali tiga, dan hasilnya lima belas. Jadi keliling segi lima ini lima belas sentimeter.",
      bersih(0),
      tambah(0, jud("Mengisi titik-titik", 20)),
      tambah("Jumlahnya", teks("b1", 30, 54, "Keliling = 3+3+3+3+3", 10, W.biru, { anchor: "start" })),
      tambah("kali@2", teks("b2", 82, 78, "= 5 x 3", 10, W.biru, { anchor: "start" })),
      tambah("hasilnya", teks("b3", 82, 102, "= 15", 10, W.merah, { anchor: "start" })),
      tambah("sentimeter.", kartu("b4", 60, 124, 180, 40, W.hijauMuda, ["kelilingnya 15 cm"], 11)),
    ),
    k(
      "Di bawahnya ada segi lima lain. Sisinya diberi tanda garis kecil dan kata sisi, yang menunjukkan semua sisinya sama panjang.",
      bersih(0),
      tambah(0, jud("Tanda sisi sama panjang", 22)),
      tambah("segi", segiBeraturan("pk", 100, 120, 5, 50)),
      tambah("tanda", tandaSisi("tt", 100, 120, 5, 50)),
      tambah("kata", teks("ts", 178, 66, "sisi", 10, W.merah), panah("tp", 172, 70, -22, 14, W.merah, 1.6)),
      tambah("semua", teks("tm", 225, 122, "semua sisi", 9.6, W.biru), teks("tm2", 225, 138, "sama panjang", 9.6, W.biru)),
    ),
    k(
      "Jadi keliling segi lima beraturan dapat dicari dengan cara sisi ditambah sisi ditambah sisi ditambah sisi ditambah sisi, yaitu lima kali sisi.",
      bersih(0),
      tambah(0, jud("Rumus keliling segi lima", 22)),
      tambah("sisi", teks("r1", 150, 62, "Keliling = sisi+sisi+sisi+sisi+sisi", 9.4, W.biru)),
      tambah("yaitu", teks("r2", 150, 94, "= 5 x sisi", 14, W.merah)),
      tambah("kali", kartu("r3", 70, 114, 160, 44, W.hijauMuda, ["5 sisi sama panjang", "5 kali panjang sisi"], 9)),
    ),
    k(
      "Sekarang giliranmu menyimpulkan rumusnya sendiri. Coba kamu katakan: jumlahkan semua sisinya, lalu ubah menjadi perkalian.",
      bersih(0),
      tambah(0, jud("Simpulkan rumusnya", 22)),
      tambah("Sekarang", emo("sg", 40, 70, "👩", 30), teks("sgt", 40, 94, "guru", 8)),
      tambah("menyimpulkan", kartu("sk", 66, 52, 104, 40, W.krem, ["simpulkan", "rumus sendiri"], 8.6)),
      tambah("jumlahkan", baris("s1", 30, 112, 240, "1. jumlahkan semua sisi", W.muda, 9, 22)),
      tambah("ubah", baris("s2", 30, 140, 240, "2. ubah jadi perkalian: 5 x sisi", W.hijauMuda, 9, 22)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 4.4, segi enam: mengamati (BS hlm. 123; Panduan Guru hlm. 157) ------------------------------ */
export const ADEGAN_ENAM_1: AdeganStory = {
  id: "enam-1",
  judul: "Mengamati segi enam",
  sumber: "Materi: segi enam beraturan",
  latar: "#EFF6FF",
  kutipan: [
    "Perhatikan gambar di atas",
    "Ada berapa banyak sisinya?",
    "Apakah sisi-sisinya sama panjang?",
    "Bangun apakah itu?",
    "Segi enam beraturan",
  ],
  ketukan: [
    k(
      "Sekarang segi enam. Panjang sisinya belum diberi tahu, jadi kita ukur dengan penggaris. Hasilnya tiga sentimeter.",
      tambah(0, jud("Segi enam", 22, 11)),
      tambah("segi", segiBeraturan("pk", 95, 120, 6, 44)),
      tambah("belum", labelSisi("ls", 95, 120, 6, 44, "... cm", 15, 7.2)),
      tambah("penggaris", emo("rl", 240, 90, "📏", 30), teks("rt", 240, 114, "ukur tiap sisi", 8.4)),
      ubah("tiga", ...[0, 1, 2, 3, 4, 5].map((i) => ({ id: `ls${i}`, isi: "3 cm", warna: W.merah }))),
    ),
    k(
      "Perhatikan segi enam ini baik-baik. Apa nama bangun ini? Coba kamu tebak dulu sebelum kita lanjutkan.",
      bersih(0),
      tambah(0, jud("Mengamati segi enam", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 6, 44, W.muda), emo("pq", 95, 124, "❓", 22)),
      tambah("nama", kartu("pn", 170, 70, 116, 62, W.krem, ["Apa nama", "bangun ini?"], 10.4)),
    ),
    k(
      "Pertanyaan: ada berapa banyak sisinya? Hitung sisinya satu per satu, dan jawabannya enam.",
      bersih(0),
      tambah(0, jud("Ada berapa banyak sisi?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 6, 44, W.muda)),
      tambah("satu", labelSisi("ns", 95, 118, 6, 44, ["1", "2", "3", "4", "5", "6"], 12, 9, W.merah)),
      tambah("enam.", kartu("jw", 196, 80, 88, 56, W.hijauMuda, ["jawaban:", "6 sisi"], 10)),
    ),
    k(
      "Pertanyaan: apakah sisi-sisinya sama panjang? Ya. Setelah diukur dengan penggaris, setiap sisinya tiga sentimeter.",
      bersih(0),
      tambah(0, jud("Sama panjang?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 6, 44, W.muda), tandaSisi("tt", 95, 118, 6, 44)),
      tambah("Ya.", kartu("jw", 196, 56, 88, 40, W.hijauMuda, ["ya, sama panjang"], 8.8), tanda("jwc", 270, 92, true)),
      tambah("tiga", labelSisi("ls", 95, 118, 6, 44, "3 cm", 14, 7.2)),
    ),
    k(
      "Pertanyaan: bangun apakah itu? Segi enam beraturan, karena memiliki enam sisi yang sama panjang.",
      bersih(0),
      tambah(0, jud("Bangun apakah itu?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 6, 44, W.hijauMuda), tandaSisi("tt", 95, 118, 6, 44)),
      tambah("Segi", kartu("nm", 178, 66, 110, 50, W.krem, ["segi enam", "beraturan"], 10)),
      tambah("memiliki", teks("n1", 232, 140, "6 sisi sama panjang", 8, W.biru)),
    ),
    k(
      "Jadi ciri segi enam beraturan: enam sisi yang semuanya sama panjang. Karena itu, nanti kelilingnya juga bisa dicari dengan perkalian.",
      bersih(0),
      tambah(0, jud("Ciri segi enam beraturan", 22)),
      tambah("segi", segiBeraturan("pk", 80, 112, 6, 44, W.hijauMuda), tandaSisi("tt", 80, 112, 6, 44)),
      tambah("enam@2", kartu("c1", 170, 56, 116, 40, W.krem, ["ciri 1: enam sisi"], 9.4)),
      tambah("semuanya", kartu("c2", 170, 106, 116, 40, W.muda, ["ciri 2: semua sisi", "sama panjang"], 9)),
      tambah("perkalian.", teks("c3", 228, 170, "boleh dikalikan", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 4.4, segi enam: keliling (BS hlm. 123; Panduan Guru hlm. 157 dan 158) ------------------------------ */
export const ADEGAN_ENAM_2: AdeganStory = {
  id: "enam-2",
  judul: "Keliling segi enam beraturan",
  sumber: "Materi: keliling segi enam beraturan",
  latar: "#EFF6FF",
  kutipan: [
    "Bagaimana cara mencari kelilingnya?",
    "Keliling segi enam beraturan dapat dicari dengan cara",
    "Dengan demikian, diperoleh kelilingnya",
    "sehingga diperoleh kelilingnya 18 cm",
  ],
  ketukan: [
    k(
      "Pertanyaan: bagaimana cara mencari kelilingnya? Jumlahkan semua sisinya, yaitu tiga ditambah tiga ditambah tiga ditambah tiga ditambah tiga ditambah tiga.",
      tambah(0, jud("Keliling segi enam", 22)),
      tambah(0, segiBeraturan("pk", 66, 118, 6, 38), ...labelSisi("ls", 66, 118, 6, 38, "3", 11, 8.6)),
      tambah("Jumlahkan", teks("kk", 210, 78, "Keliling =", 10, W.ungu)),
      tambah("tiga@2", teks("kj", 210, 104, "3+3+3+3+3+3", 11, W.biru)),
    ),
    k(
      "Jumlahnya delapan belas. Karena keenam sisinya sama, penjumlahan ini diubah menjadi enam kali tiga sama dengan delapan belas. Jadi keliling segi enam beraturan ini delapan belas sentimeter.",
      bersih(0),
      tambah(0, jud("Jumlah berulang jadi kali", 22)),
      tambah("Jumlahnya", baris("j1", 40, 40, 220, "3+3+3+3+3+3 = 18", W.krem, 11, 28)),
      tambah("diubah", panah("jp", 150, 72, 0, 16, W.ungu, 2.4)),
      tambah("enam@2", baris("j2", 40, 92, 220, "6 x 3 = 18", W.hijauMuda, 11, 28)),
      tambah("sentimeter.", kartu("j3", 70, 132, 160, 36, W.hijauMuda, ["keliling 18 cm"], 11)),
    ),
    k(
      "Rumusnya begini: keliling segi enam beraturan sama dengan sisi ditambah sisi sebanyak enam kali, yaitu enam kali sisi.",
      bersih(0),
      tambah(0, jud("Rumus keliling segi enam", 22)),
      tambah("sisi", teks("r1", 150, 62, "Keliling = sisi+sisi+sisi+sisi+sisi+sisi", 8.6, W.biru)),
      tambah("yaitu", teks("r2", 150, 94, "= 6 x sisi", 14, W.merah)),
      tambah("kali@2", kartu("r3", 70, 114, 160, 44, W.hijauMuda, ["6 sisi sama panjang", "6 kali panjang sisi"], 9)),
    ),
    k(
      "Bandingkan dengan segi lima tadi. Lima kali tiga hasilnya lima belas, dan enam kali tiga hasilnya delapan belas. Sisi bertambah satu, keliling bertambah tiga.",
      bersih(0),
      tambah(0, jud("Segi lima dan segi enam", 22)),
      tambah("lima@2", baris("c1", 40, 44, 220, "segi lima: 5 x 3 = 15", W.krem, 10, 26)),
      tambah("enam", baris("c2", 40, 78, 220, "segi enam: 6 x 3 = 18", W.muda, 10, 26)),
      tambah("bertambah@1", teks("c3", 150, 134, "18 - 15 = 3", 13, W.merah)),
      tambah("keliling", teks("c4", 150, 156, "sisi tambah satu, keliling tambah 3", 8.6, W.ungu)),
    ),
    k(
      "Hati-hati, jangan sampai tertukar. Rumus lima kali sisi hanya untuk segi lima. Untuk segi enam, kita pakai enam kali sisi.",
      bersih(0),
      tambah(0, jud("Hati-hati: jangan tertukar", 22)),
      tambah("tertukar.", kartu("t1", 30, 44, 240, 44, W.merahMuda, ["segi enam jangan pakai 5 x sisi"], 9.6), tanda("t1x", 264, 70, false)),
      tambah("pakai", kartu("t2", 30, 104, 240, 44, W.hijauMuda, ["segi enam pakai 6 x sisi"], 9.6), tanda("t2c", 264, 130, true)),
      tambah("Untuk", segiBeraturan("t3", 150, 182, 6, 12, W.muda)),
    ),
    k(
      "Kebiasaan baik: setelah menghitung, periksa lagi. Segi enam punya satu sisi lebih banyak daripada segi lima, jadi kelilingnya harus lebih besar. Delapan belas memang lebih besar daripada lima belas.",
      bersih(0),
      tambah(0, jud("Periksa masuk akal atau tidak", 22, 11)),
      tambah("Segi", segiBeraturan("pc", 80, 112, 6, 42, W.muda), tandaSisi("pt", 80, 112, 6, 42)),
      tambah("lebih", teks("pa", 220, 92, "18 > 15", 14, W.merah)),
      tambah("Delapan", teks("pb", 220, 116, "enam sisi > lima sisi", 8.6, W.biru), tanda("pd", 270, 140, true, 16)),
    ),
  ],
};
