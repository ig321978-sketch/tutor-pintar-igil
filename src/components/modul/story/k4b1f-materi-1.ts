import type { AdeganStory } from "./logika-story";
import { W, barisNT, blok, bulat, emo, garis, judul, kartu, kepalaNT, panah, teks } from "./k4b1f-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b1f-bantu";

/* ------------------------------ 1. Pengalaman belajar, sarana, apersepsi, pemantik, stimulus (Panduan Guru hlm. 54-55) ------------------------------ */
const SUARA_P1 = "Subbab F: Pengurangan Bilangan Cacah sampai seribu. Pengalaman belajarnya, peserta didik mampu memahami konsep pengurangan bilangan cacah sampai seribu.";
const SUARA_P2 = "Sarana: permen, kerikil, kelereng, atau manik-manik. Apersepsinya, pengurangan paling mudah diajarkan dengan benda konkret, dan masalahnya sering kita jumpai sehari-hari.";
const SUARA_P3 = "Dua pertanyaan pemantik. Pertama, bagaimana pengurangan tanpa mengambil? Kedua, bagaimana pengurangan dengan mengambil? Jawabannya kita temukan lewat contoh di buku.";
const SUARA_P4 = "Stimulus Panduan Guru: bagaimana kalian mengurangi dua puluh tujuh dikurangi sembilan belas? Siswa mungkin menjawab: tujuh kurang sembilan dua, dua kurang satu satu, jadi hasilnya dua belas.";
const SUARA_P5 = "Guru tidak langsung memberi jawaban benar; siswa menemukannya lewat aktivitas. Hitungan mandiri video: dua puluh tujuh dikurangi sembilan belas sama dengan delapan, bukan dua belas.";

export const ADEGAN_APERSEPSI: AdeganStory = {
  id: "apersepsi-stimulus",
  judul: "Pengalaman belajar, apersepsi, dan stimulus",
  sumber: "Panduan Guru hlm. 54–55",
  latar: "#FFF7ED",
  kutipan: [
    "F. Pengurangan Bilangan Cacah sampai 1.000",
    "Setelah mempelajari sub bab ini, peserta didik diharapkan peserta didik mampu memahami konsep operasi pengurangan bilangan cacah sampai 1.000.",
    "Permen/kerikil/kelereng/manik-manik",
    "Secara umum konsep operasi pengurangan dapat diajarkan menggunakan benda konkret.",
    "Masalah konstekstual yang berkaitan dengan operasi pengurangan sering dijumpai di kehidupan sehari-hari.",
    "Bagaimana operasi pengurangan dengan tanpa mengambil?",
    "Bagaimana operasi pengurangan dengan mengambil?",
    "bagaimana kalian mengurangi 27 dikurangi 19.",
    "Kemungkinan siswa mengurangi bilangan di tempat satuan 7 dikurangi 9 adalah 2?",
    "Guru tidak perlu memberikan jawaban yang benar",
    "karena peserta didik akan menemukan jawabannya setelah mereka melakukan aktivitas pembelajaran.",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Subbab F: Pengurangan")),
      tambah("Pengalaman", ...kartu("pa", 20, 40, 260, 40, W.emas, ["Pengurangan Bilangan Cacah", "sampai 1.000"], 10.4)),
      tambah("mampu", ...kartu("pb", 20, 96, 260, 44, W.hijauMuda, ["peserta didik mampu memahami", "konsep operasi pengurangan"], 9.2)),
      tambah("seribu@2", emo("pc", 150, 176, "🎯", 26)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Sarana: benda konkret")),
      tambah("permen,", emo("sa1", 45, 70, "🍬", 28), teks("sa1t", 45, 96, "permen", 8.4, W.biru)),
      tambah("kerikil,", bulat("sa2a", 112, 62, 7, W.abu, W.hitam), bulat("sa2b", 124, 70, 6, W.abu, W.hitam), bulat("sa2c", 106, 74, 5, W.abu, W.hitam), teks("sa2t", 112, 96, "kerikil", 8.4, W.biru)),
      tambah("kelereng,", bulat("sa3", 185, 70, 10, W.biruMuda, W.biru), bulat("sa3b", 181, 66, 3, W.putih, undefined, { op: 0.8 }), teks("sa3t", 185, 96, "kelereng", 8.4, W.biru)),
      tambah("manik-manik.", ...[0, 1, 2, 3].map((i) => bulat(`sa4-${i}`, 247 + (i % 2) * 9, 63 + Math.floor(i / 2) * 9, 3.6, [W.merah, W.emas, W.hijau, W.ungu][i], W.hitam, { tebal: 0.8 })), teks("sa4t", 255, 96, "manik-manik", 8.4, W.biru)),
      tambah("Apersepsinya,", ...kartu("sak", 20, 122, 260, 56, W.langit, ["pengurangan paling mudah", "diajarkan dengan benda konkret"], 9.2)),
      tambah("sehari-hari.", emo("sae", 150, 196, "🏠", 18)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Dua pertanyaan pemantik")),
      tambah("Pertama,", ...kartu("pm1", 14, 38, 272, 46, W.hijauMuda, ["1. pengurangan", "tanpa mengambil?"], 9.6)),
      tambah("Kedua,", ...kartu("pm2", 14, 98, 272, 46, W.krem, ["2. pengurangan", "dengan mengambil?"], 9.6)),
      tambah("Jawabannya", emo("pm3", 150, 180, "🔍", 24)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Stimulus pemanasan")),
      tambah("Stimulus", ...kartu("st0", 70, 30, 160, 28, W.emas, ["27 − 19 = ?"], 12)),
      tambah("tujuh", ...kepalaNT("stn", 78, 70, 48, 15, 7.4), ...barisNT("str0", 78, 85, ["", "2", "7"], 48, 20, 11), ...barisNT("str1", 78, 105, ["", "1", "9"], 48, 20, 11)),
      tambah("jadi", ...barisNT("str2", 78, 125, ["", "1", "2"], 48, 20, 11, W.merah)),
      tambah("hasilnya", ...kartu("st1", 40, 156, 220, 30, W.merahMuda, ["hasil siswa: 12?"], 10.4)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Guru tidak langsung menjawab")),
      tambah("Guru", ...kartu("g1", 14, 32, 272, 38, W.langit, ["jawaban benar ditemukan siswa", "lewat aktivitas"], 9.4)),
      tambah("Hitungan", ...kartu("g2", 14, 82, 272, 26, W.krem, ["tambahan video: hitungan mandiri"], 8.8)),
      tambah("delapan,", ...kartu("g3", 60, 122, 180, 34, W.hijauMuda, ["27 − 19 = 8"], 13)),
      tambah("bukan", teks("g4", 150, 178, "bukan 12", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Ayo Mengamati: 265 dikurangi 132 (Buku Siswa hlm. 34-35; Panduan Guru hlm. 55-56) ------------------------------ */
const SUARA_A1 = "Ayo Mengamati. Buku pelajaran di perpustakaan dua ratus enam puluh lima buku. Siswa meminjam seratus tiga puluh dua buku. Berapa buku yang masih ada?";
const SUARA_A2 = "Panduan Guru mengingatkan nilai tempat: ratusan dengan ratusan, puluhan dengan puluhan, satuan dengan satuan.";
const SUARA_A3 = "Langkah satu: uraikan masing-masing bilangan. Dua ratus enam puluh lima sama dengan dua ratus ditambah enam puluh ditambah lima. Seratus tiga puluh dua sama dengan seratus ditambah tiga puluh ditambah dua.";
const SUARA_A4 = "Langkah dua dan tiga: kurangkan mulai dari kanan ke kiri. Lima dikurangi dua sama dengan tiga. Enam puluh dikurangi tiga puluh sama dengan tiga puluh. Dua ratus dikurangi seratus sama dengan seratus.";
const SUARA_A5 = "Hasilnya seratus ditambah tiga puluh ditambah tiga, yaitu seratus tiga puluh tiga. Jadi sisa buku seratus tiga puluh tiga, tanpa mengambil.";
const SUARA_A6 = "Cara susun pendek: tulis angkanya pada tabel ratusan, puluhan, satuan, lalu kurangkan tiap kolom. Hasilnya sama, seratus tiga puluh tiga.";

export const ADEGAN_AMATI_BUKU: AdeganStory = {
  id: "amati-buku",
  judul: "Ayo Mengamati: buku di perpustakaan",
  sumber: "Buku Siswa hlm. 34–35; Panduan Guru hlm. 55–56",
  latar: "#F0FDF4",
  kutipan: [
    "Banyaknya buku pelajaran di perpustakaan adalah 265 buku.",
    "Pada tahun ajaran baru, buku pelajaran yang dipinjam siswa adalah 132 buku.",
    "Berapakah banyak buku pelajaran yang masih ada di perpustakaan?",
    "Cara Susun Panjang",
    "Menguraikan masing-masing bilangan yang akan dikurangkan",
    "Kurangkan bilangan sesuai dengan nilai tempatnya",
    "Lakukan operasi pengurangan dari nilai tempat yang terkecil ke nilai tempat yang terbesar (dari kanan ke kiri)",
    "Anak hebat, Cara diatas adalah pengurangan cara susun panjang. Sekarang kita lakukan pengurangan cara susun pendek",
    "Guru harus mengingatkan nilai tempat kepada peserta didik.",
    "Mengurangi dua bilangan, langkah-langkahnya dengan menyesuaikan posisi nilai tempat.",
    "Ajak peserta didik mengamati percakapan guru yang diberikan di ilustrasi.",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Ayo Mengamati")),
      tambah("perpustakaan", emo("am1", 60, 80, "📚", 38), ...kartu("am2", 108, 52, 176, 34, W.langit, ["265 buku di perpustakaan"], 9.6)),
      tambah("meminjam", emo("am3", 60, 136, "🧒", 32), ...kartu("am4", 108, 112, 176, 34, W.merahMuda, ["132 buku dipinjam siswa"], 9.6)),
      tambah("Berapa", ...kartu("am5", 60, 160, 180, 30, W.emas, ["sisa buku: ?"], 10.8)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Nilai tempat dulu")),
      tambah("nilai", ...kepalaNT("nt", 84, 38, 44, 15, 7.4)),
      tambah("ratusan", ...barisNT("ntr0", 84, 53, ["2", "6", "5"], 44, 22, 12), ...barisNT("ntr1", 84, 75, ["1", "3", "2"], 44, 22, 12)),
      sorotkan("ratusan", "ntr0-s0", "ntr1-s0"),
      sorotkan("puluhan,", "ntr0-s1", "ntr1-s1"),
      sorotkan(idx(SUARA_A2, "satuan", 1), "ntr0-s2", "ntr1-s2"),
      tambah("mengingatkan", ...kartu("nk", 30, 124, 240, 34, W.emas, ["ratusan, puluhan, satuan", "sejajar sesuai nilai tempat"], 9)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Langkah 1: uraikan")),
      tambah("uraikan", ...kartu("s1", 20, 34, 260, 26, W.krem, ["menguraikan tiap bilangan"], 9.2)),
      tambah("sama@1", teks("u1", 30, 90, "265 = 200 + 60 + 5", 12, W.biru, { anchor: "start" })),
      tambah("sama@2", teks("u2", 30, 124, "132 = 100 + 30 + 2", 12, W.biru, { anchor: "start" }), teks("u2m", 262, 124, "−", 16, W.biru)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Langkah 2 dan 3: kurangkan")),
      tambah("kanan", ...kartu("w1", 14, 32, 272, 24, W.krem, ["dari kanan ke kiri"], 9.2), panah("w2", 262, 66, -222, 0, W.merah, 2)),
      tambah("Lima", teks("v1", 150, 90, "5 − 2 = 3", 12, W.hijau)),
      tambah("Enam", teks("v2", 150, 120, "60 − 30 = 30", 12, W.hijau)),
      tambah(idx(SUARA_A4, "dua", 3), teks("v3", 150, 150, "200 − 100 = 100", 12, W.hijau)),
    ),
    k(
      SUARA_A5,
      bersih(0),
      tambah(0, judul("Hasil: tanpa mengambil")),
      tambah("Hasilnya", teks("h1", 150, 52, "100 + 30 + 3 = 133", 13, W.hijau)),
      tambah("Jadi", ...blok("hb", 78, 82, 1, 3, 3, 1.0), teks("h2", 150, 134, "133 buku masih ada", 10.4, W.biru)),
      tambah("tanpa", ...kartu("h3", 50, 150, 200, 32, W.hijauMuda, ["tanpa mengambil"], 11)),
    ),
    k(
      SUARA_A6,
      bersih(0),
      tambah(0, judul("Cara susun pendek")),
      tambah("tulis", ...kepalaNT("tp", 84, 34, 44, 15, 7.4)),
      tambah("angkanya", ...barisNT("tpr0", 84, 49, ["2", "6", "5"], 44, 22, 12), ...barisNT("tpr1", 84, 71, ["1", "3", "2"], 44, 22, 12), garis("tpg", 80, 96, 140, 0, W.hitam, 2), teks("tpm", 232, 93, "−", 16, W.biru)),
      tambah("Hasilnya", ...barisNT("tpr2", 84, 97, ["1", "3", "3"], 44, 22, 12, W.hijau)),
      tambah("seratus", teks("tpe", 150, 144, "265 − 132 = 133", 13, W.hijau), emo("tpf", 150, 184, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 3. Satu kali mengambil: 241 dikurangi 129 (Buku Siswa hlm. 35; Panduan Guru hlm. 56) ------------------------------ */
const SUARA_B1 = "Contoh kedua: dua ratus empat puluh satu dikurangi seratus dua puluh sembilan. Uraikan: dua ratus ditambah empat puluh ditambah satu, dikurangi seratus ditambah dua puluh ditambah sembilan.";
const SUARA_B2 = "Satuan: satu lebih kecil dari sembilan, jadi tidak bisa dikurangi. Satu harus mengambil satu puluhan dari nilai tempat puluhan.";
const SUARA_B3 = "Uraikan empat puluh menjadi tiga puluh ditambah sepuluh. Sekarang satuannya sepuluh ditambah satu, puluhannya tinggal tiga puluh.";
const SUARA_B4 = "Sepuluh ditambah satu sama dengan sebelas, dikurangi sembilan sama dengan dua. Tulis dua pada nilai tempat satuan.";
const SUARA_B5 = "Selanjutnya puluhan: tiga puluh dikurangi dua puluh sama dengan sepuluh. Ratusan: dua ratus dikurangi seratus sama dengan seratus. Hasilnya seratus ditambah sepuluh ditambah dua, yaitu seratus dua belas.";

export const ADEGAN_SEKALI: AdeganStory = {
  id: "sekali-mengambil",
  judul: "Susun panjang dengan satu kali mengambil",
  sumber: "Buku Siswa hlm. 35; Panduan Guru hlm. 56",
  latar: "#EFF6FF",
  kutipan: [
    "Pengurangan cara susun panjang dengan satu kali mengambil",
    "Karena 1 < 9 maka 1 harus mengambil 1 puluhan pada nilai tempat bilangan puluhan",
    "Uraikan 40 menjadi 30 + 10",
    "(10 + 1) – 9 = 2, letakkan 2 pada nilai tempat satuan.",
    "Selanjutnya lakukan pengurangan nilai tempat puluhan dan nilai tempat ratusan",
    "Jadi 241 – 129 = 100 + 10 + 2 = 112",
    "Pengurangan cara susun pendek dan panjang, guru perlu menyampaikan istilah",
    "ketika bilangan di nilai tempat satuan/puluhan pada bilangan pertama kurang dari bilangan kedua.",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Satu kali mengambil")),
      tambah("Contoh", ...kartu("b0", 70, 28, 160, 26, W.emas, ["241 − 129 = ?"], 11.4)),
      tambah("Uraikan:", teks("b1", 30, 90, "241 = 200 + 40 + 1", 12, W.biru, { anchor: "start" })),
      tambah("dikurangi@2", teks("b2", 30, 124, "129 = 100 + 20 + 9", 12, W.biru, { anchor: "start" }), teks("b2m", 262, 124, "−", 16, W.biru)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Satuan: satu kurang dari sembilan")),
      tambah(0, teks("b1", 30, 70, "241 = 200 + 40 + 1", 12, W.biru, { anchor: "start" }), teks("b2", 30, 100, "129 = 100 + 20 + 9", 12, W.biru, { anchor: "start" }), teks("b2m", 262, 100, "−", 16, W.biru)),
      tambah("satuan:", ...kartu("b3", 20, 120, 260, 30, W.merahMuda, ["1 < 9: tidak bisa dikurangi"], 10)),
      tambah("mengambil", ...kartu("b4", 20, 158, 260, 30, W.emas, ["1 mengambil 1 puluhan"], 10.4)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Uraikan empat puluh")),
      tambah(0, teks("b5", 30, 44, "241 = 200 + (30 + 10) + 1", 11.4, W.biru, { anchor: "start" })),
      tambah("Uraikan", ...blok("bk", 78, 64, 2, 4, 1, 0.9)),
      tambah("menjadi", ...kartu("b6", 30, 106, 240, 20, W.krem, ["40 menjadi 30 + 10"], 9)),
      ubah("sepuluh.", { id: "bk-p3", warna: W.emas }),
      tambah("Sekarang", ...blok("bl", 78, 134, 2, 3, 11, 0.9)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Satuan: sebelas kurang sembilan")),
      tambah(0, teks("b7", 150, 56, "(10 + 1) − 9 = 2", 13, W.biru)),
      tambah("sama", teks("b8", 150, 90, "11 − 9 = 2", 13, W.hijau)),
      tambah("Tulis", ...kartu("b9", 50, 112, 200, 34, W.hijauMuda, ["2 pada nilai tempat satuan"], 10)),
    ),
    k(
      SUARA_B5,
      bersih(0),
      tambah(0, judul("Puluhan dan ratusan")),
      tambah("puluhan:", teks("b10", 150, 56, "30 − 20 = 10", 13, W.hijau)),
      tambah("Ratusan:", teks("b11", 150, 86, "200 − 100 = 100", 13, W.hijau)),
      tambah("Hasilnya", teks("b12", 150, 124, "100 + 10 + 2 = 112", 13, W.hijau)),
      tambah("yaitu", ...kartu("b13", 40, 144, 220, 36, W.emas, ["241 − 129 = 112"], 13)),
    ),
  ],
};
