import type { AdeganStory } from "./logika-story";
import { W, emo, garis, judul, kartu, kartuAngka, panah, teks } from "./k4b1a-gambar";
import { bersih, k, sorotkan, tambah } from "./k4b1a-bantu";

/* ------------------------------ 1. Pembuka bab dan tujuan (Buku Siswa hlm. 1–2; Panduan Guru hlm. 27–28) ------------------------------ */
const SUARA_P1 = "Selamat datang di bab satu, Bilangan Cacah sampai sepuluh ribu. Sampul bab menampilkan minimarket yang menjual makanan ringan, minuman, dan buah-buahan dengan harga bervariasi.";
const SUARA_P2 = "Buku mengajukan tiga pertanyaan. Dapatkah kalian menyebutkan harga berbagai barang di minimarket? Dapatkah kalian membedakan barang yang lebih murah atau lebih mahal? Dan jika berbelanja beberapa barang, dapatkah kalian menentukan berapa rupiah yang harus dibayarkan?";
const SUARA_P3 = "Tujuan pembelajaran di Buku Siswa ada dua belas butir. Tujuh butir pertama membahas bilangan cacah sampai sepuluh ribu, dari membaca sampai menguraikan. Lima butir sisanya membahas operasi hitung, faktor, dan kelipatan.";
const SUARA_P4 = "Subbab A mengerjakan dua butir pertama: membaca bilangan cacah sampai sepuluh ribu, dan menuliskan bilangan cacah sampai sepuluh ribu.";
const SUARA_P5 = "Panduan guru juga memuat dua belas tujuan, bernomor satu titik satu sampai satu titik dua belas. Subbab A memakai tujuan satu titik satu, membaca, dan satu titik dua, menulis bilangan cacah sampai sepuluh ribu.";

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 1: minimarket dan tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 1–2; Panduan Guru hlm. 27–28",
  latar: "#FFF7ED",
  kutipan: [
    "Minimarket menjual berbagai makanan ringan, minuman, buah-buahan dengan harga yang bervariasi.",
    "Dapatkah kalian menyebutkan harga berbagai barang yang dijual di minimarket tersebut?",
    "Dapatkah kalian membedakan mana barang yang harganya lebih murah atau lebih mahal?",
    "dapatkah kalian menentukan berapa rupiah yang harus dibayarkan?",
    "Tujuan Pembelajaran",
    "Setelah mempelajari bab ini kalian mampu:",
    "membaca bilangan cacah sampai 10.000",
    "menuliskan bilangan cacah sampai 10.000",
    "menentukan nilai tempat bilangan cacah sampai 10.000",
    "menentukan penyelesaian masalah berkaitan dengan kelipatan dan faktor",
    "1. Tujuan Pembelajaran",
    "Setelah mempelajari bab ini, Peserta didik dapat:",
    "1.1 membaca bilangan cacah sampai 10.000",
    "1.2 menulis bilangan cacah sampai 10.000",
    "1.12 menyelesaikan masalah berkaitan dengan kelipatan dan faktor",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bab 1: Bilangan Cacah sampai 10.000")),
      tambah("Sampul", emo("e1", 150, 96, "🏪", 40)),
      tambah("makanan", emo("e2", 70, 100, "🍪", 28)),
      tambah("minuman,", emo("e3", 230, 100, "🥤", 28)),
      tambah("buah-buahan", emo("e4", 150, 148, "🍎", 26)),
      tambah("harga", ...kartu("pk", 60, 160, 180, 30, W.emas, ["harga yang bervariasi"], 9.4)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tiga pertanyaan pembuka")),
      tambah("menyebutkan", ...kartu("q1", 14, 32, 272, 38, W.hijauMuda, ["1. sebutkan harga barang di minimarket"], 9)),
      tambah("membedakan", ...kartu("q2", 14, 80, 272, 38, W.langit, ["2. mana lebih murah, mana lebih mahal"], 9)),
      tambah("menentukan", ...kartu("q3", 14, 128, 272, 38, W.krem, ["3. berapa rupiah yang harus dibayar"], 9)),
      tambah("rupiah", emo("q4", 150, 190, "🧾", 18)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Tujuan pembelajaran (Buku Siswa)")),
      tambah("dua", ...kartu("t1", 14, 32, 272, 32, W.emas, ["12 butir tujuan"], 10)),
      tambah("Tujuh", ...kartu("t2", 14, 74, 272, 40, W.hijauMuda, ["7 butir: bilangan sampai 10.000", "baca, tulis, nilai tempat, banding, urut"], 8.4)),
      tambah("Lima", ...kartu("t3", 14, 124, 272, 40, W.krem, ["5 butir sisanya:", "operasi hitung, faktor, kelipatan"], 8.6)),
      sorotkan("membaca,", "t2-k"),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Tujuan yang dikerjakan subbab A")),
      tambah("membaca", ...kartu("u1", 14, 40, 272, 44, W.hijauMuda, ["1. membaca bilangan cacah", "sampai 10.000"], 9.2)),
      tambah("menuliskan", ...kartu("u2", 14, 100, 272, 44, W.langit, ["2. menuliskan bilangan cacah", "sampai 10.000"], 9.2)),
      tambah("dua", emo("u3", 150, 186, "🎯", 20)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Tujuan menurut Panduan Guru")),
      tambah("dua", ...kartu("g0", 14, 30, 272, 28, W.krem, ["12 tujuan: 1.1 sampai 1.12"], 9)),
      tambah("memakai", ...kartu("g1", 14, 70, 272, 40, W.hijauMuda, ["1.1 membaca bilangan cacah", "sampai 10.000"], 9)),
      tambah("menulis", ...kartu("g2", 14, 120, 272, 40, W.langit, ["1.2 menulis bilangan cacah", "sampai 10.000"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, gambaran umum, keterampilan, skema (Buku Siswa hlm. 3; Panduan Guru hlm. 28–29) ------------------------------ */
const SUARA_K1 = "Peta konsep di Buku Siswa dimulai dari Bilangan, lalu Nilai Tempat. Dari Nilai Tempat bercabang Komposisi dan Dekomposisi, dan semuanya bermuara ke Operasi.";
const SUARA_K2 = "Operasi bercabang menjadi penjumlahan, pengurangan, perkalian, dan pembagian. Dari perkalian dan pembagian, peta menuju faktor dan kelipatan.";
const SUARA_K3 = "Subbab A, membaca dan menulis bilangan, adalah langkah awal sebelum kotak-kotak berikutnya. Kata kunci bab ini: nilai tempat, operasi bilangan, faktor, dan kelipatan.";
const SUARA_K4 = "Gambaran umum di panduan guru: peserta didik belajar pemahaman dan intuisi bilangan, atau number sense, pada bilangan cacah sampai sepuluh ribu, serta penjumlahan dan pengurangan sampai seribu.";
const SUARA_K5 = "Empat keterampilan yang dilatih: membaca, menulis, menghitung, dan berkomunikasi. Skema pembelajaran memberi topik A lima jam pelajaran, dengan metode diskusi dan Aktivitas satu, membaca bilangan.";

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, gambaran umum, dan skema pembelajaran",
  sumber: "Buku Siswa hlm. 3; Panduan Guru hlm. 28–29",
  latar: "#F0FDF4",
  kutipan: [
    "Peta Konsep",
    "Nilai Tempat",
    "Komposisi",
    "Dekomposisi",
    "Faktor dan Kelipatan",
    "Kata Kunci",
    "Nilai tempat, operasi bilangan, faktor, kelipatan",
    "2. Peta Konsep",
    "3. Gambaran Umum Bab",
    "pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 10.000.",
    "melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai 1.000",
    "4. Keterampilan yang dilatih",
    "1. Membaca",
    "2. Menulis",
    "3. Menghitung",
    "4. Berkomunikasi",
    "5. Skema Pembelajaran",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Peta konsep")),
      tambah("Bilangan,", ...kartu("pb", 105, 24, 90, 20, W.emas, ["Bilangan"], 8.6)),
      tambah("Nilai", ...kartu("pn", 105, 52, 90, 20, W.hijauMuda, ["Nilai Tempat"], 8.4), panah("pn-p", 150, 44, 0, 8, W.biru, 1.4)),
      tambah("Komposisi", ...kartu("pk", 30, 84, 90, 20, W.langit, ["Komposisi"], 8.4), panah("pk-p", 150, 72, -75, 12, W.biru, 1.4)),
      tambah("Dekomposisi", ...kartu("pd", 180, 84, 90, 20, W.langit, ["Dekomposisi"], 8.4), panah("pd-p", 150, 72, 75, 12, W.biru, 1.4)),
      tambah("Operasi.", ...kartu("po", 105, 116, 90, 20, W.krem, ["Operasi"], 8.4), panah("po-a", 75, 104, 75, 12, W.biru, 1.4), panah("po-b", 225, 104, -75, 12, W.biru, 1.4), garis("po-c", 105, 62, -91, 0, W.biru, 1.4), garis("po-d", 14, 62, 0, 64, W.biru, 1.4), panah("po-e", 14, 126, 91, 0, W.biru, 1.4)),
    ),
    k(
      SUARA_K2,
      tambah("penjumlahan,", ...kartu("o1", 6, 150, 68, 20, W.pink, ["Penjumlahan"], 7.2), panah("o1-p", 150, 136, -110, 14, W.biru, 1.4)),
      tambah("pengurangan,", ...kartu("o2", 78, 150, 68, 20, W.pink, ["Pengurangan"], 7.2), panah("o2-p", 150, 136, -38, 14, W.biru, 1.4)),
      tambah("perkalian,", ...kartu("o3", 150, 150, 68, 20, W.pink, ["Perkalian"], 7.2), panah("o3-p", 150, 136, 34, 14, W.biru, 1.4)),
      tambah("pembagian.", ...kartu("o4", 222, 150, 68, 20, W.pink, ["Pembagian"], 7.2), panah("o4-p", 150, 136, 106, 14, W.biru, 1.4)),
      tambah("faktor", ...kartu("of", 95, 178, 110, 20, W.lavender, ["Faktor dan Kelipatan"], 7.6), panah("of-a", 184, 170, -14, 8, W.biru, 1.4), panah("of-b", 256, 170, -60, 8, W.biru, 1.4)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Kata kunci bab")),
      tambah("langkah", ...kartu("ka", 20, 36, 260, 30, W.emas, ["subbab A: membaca dan menulis bilangan"], 8.8)),
      tambah("nilai", ...kartu("k1", 20, 82, 126, 28, W.hijauMuda, ["nilai tempat"], 9.4)),
      tambah("operasi", ...kartu("k2", 154, 82, 126, 28, W.langit, ["operasi bilangan"], 9.4)),
      tambah("faktor,", ...kartu("k3", 20, 120, 126, 28, W.krem, ["faktor"], 9.4)),
      tambah("kelipatan.", ...kartu("k4", 154, 120, 126, 28, W.pink, ["kelipatan"], 9.4)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Gambaran umum bab")),
      tambah("pemahaman", ...kartu("gu1", 14, 32, 272, 38, W.hijauMuda, ["pemahaman dan intuisi bilangan", "(number sense)"], 9)),
      tambah("bilangan@2", ...kartu("gu2", 14, 80, 272, 34, W.langit, ["bilangan cacah sampai 10.000"], 9.4)),
      tambah("penjumlahan", ...kartu("gu3", 14, 124, 272, 34, W.krem, ["tambah dan kurang sampai 1.000"], 9.4)),
    ),
    k(
      SUARA_K5,
      bersih(0),
      tambah(0, judul("Keterampilan dan skema")),
      tambah("membaca,", ...kartu("s1", 14, 32, 64, 28, W.hijauMuda, ["membaca"], 8.4)),
      tambah("menulis,", ...kartu("s2", 82, 32, 64, 28, W.langit, ["menulis"], 8.4)),
      tambah("menghitung,", ...kartu("s3", 150, 32, 64, 28, W.krem, ["menghitung"], 8)),
      tambah("berkomunikasi.", ...kartu("s4", 218, 32, 72, 28, W.pink, ["komunikasi"], 8)),
      tambah("Skema", ...kartu("sk", 14, 80, 272, 66, W.emas, ["Topik A: membaca dan menulis", "bilangan cacah sampai 10.000", "5 JP · diskusi · Aktivitas 1"], 8.8)),
    ),
  ],
};

/* ------------------------------ 3. Panduan pembelajaran awal (Panduan Guru hlm. 31–32) ------------------------------ */
const SUARA_G1 = "Panduan pembelajaran subbab A: peserta didik mampu membaca dan menulis bilangan cacah sampai sepuluh ribu dengan baik dan benar.";
const SUARA_G2 = "Sarana dan media yang dibutuhkan sederhana: kertas karton, gunting, dan spidol warna.";
const SUARA_G3 = "Apersepsi: guru merancang cerita kontekstual tentang kejadian sederhana, lengkap dengan barang-barang yang berhubungan dengan cerita itu.";
const SUARA_G4 = "Ada dua pertanyaan pemantik. Pertama, bisakah kalian menyebutkan harga barang yang dibeli dua anak dalam cerita? Kedua, jika berbelanja beberapa barang, dapatkah kalian menentukan berapa rupiah yang harus dibayarkan?";
const SUARA_G5 = "Guru lalu menerangkan bahwa label harga adalah susunan angka-angka yang membentuk bilangan cacah empat angka.";

export const ADEGAN_PANDUAN_AWAL: AdeganStory = {
  id: "panduan-awal",
  judul: "Panduan guru: pengalaman belajar, apersepsi, pemantik",
  sumber: "Panduan Guru hlm. 31–32",
  latar: "#EFF6FF",
  kutipan: [
    "6. Panduan Pembelajaran",
    "A. Membaca dan Menulis Bilangan Cacah sampai 10.000",
    "Pengalaman Belajar",
    "diharapkan peserta didik mampu membaca dan menulis bilangan cacah sampai 10.000 dengan baik dan benar.",
    "Kebutuhan Sarana Prasarana dan Media",
    "Kertas karton, Gunting, Spidol Warna",
    "Apersepsi",
    "guru diharapkan merancang sebuah cerita kontekstual yang menceritakan suatu keadaan dalam sebuah kejadian sederhana.",
    "Pertanyaan Esensi/Pemantik",
    "Bisakah kalian menyebutkan harga barang yang dibeli oleh 2 orang anak dalam cerita?",
    "dapatkah kalian menentukan berapa rupiah yang harus dibayarkan?",
    "Guru menerangkan sebuah label harga merupakan susunan angka-angka yang membentuk sebuah bilangan cacah 4 angka.",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Pengalaman belajar")),
      tambah("peserta", ...kartu("pg1", 14, 34, 272, 50, W.hijauMuda, ["peserta didik mampu membaca", "dan menulis bilangan cacah"], 9.2)),
      tambah("sepuluh", ...kartu("pg2", 14, 96, 272, 34, W.emas, ["sampai 10.000, dengan baik dan benar"], 9.2)),
      tambah("baik", emo("pg3", 150, 168, "👍", 24)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Sarana dan media")),
      tambah("kertas", ...kartu("sm1", 14, 50, 86, 44, W.krem, ["kertas", "karton"], 9.4)),
      tambah("gunting,", ...kartu("sm2", 107, 50, 86, 44, W.langit, ["gunting"], 9.4)),
      tambah("spidol", ...kartu("sm3", 200, 50, 86, 44, W.pink, ["spidol", "warna"], 9.4)),
      tambah("sederhana:", emo("sm4", 150, 136, "✂", 28)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("guru", ...kartu("ap1", 14, 36, 272, 40, W.hijauMuda, ["guru merancang cerita kontekstual", "tentang kejadian sederhana"], 8.8)),
      tambah("barang-barang", ...kartu("ap2", 14, 90, 272, 40, W.krem, ["membawa barang yang", "berhubungan dengan cerita"], 8.8)),
      tambah("barang-barang", emo("ap3", 150, 168, "🛒", 26)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Dua pertanyaan pemantik")),
      tambah("Pertama,", ...kartu("pm1", 14, 34, 272, 48, W.langit, ["1. sebutkan harga barang yang", "dibeli dua anak dalam cerita"], 9)),
      tambah("Kedua,", ...kartu("pm2", 14, 94, 272, 48, W.pink, ["2. berapa rupiah yang harus", "dibayar untuk beberapa barang"], 9)),
      tambah("rupiah", emo("pm3", 150, 180, "💰", 20)),
    ),
    k(
      SUARA_G5,
      bersih(0),
      tambah(0, judul("Label harga adalah bilangan")),
      tambah("label", ...kartu("lh", 90, 34, 120, 34, W.putih, ["Rp6.750,00"], 12)),
      tambah("susunan", ...[0, 1, 2, 3].map((i) => kartuAngka(`la${i}`, 54 + i * 52, 90, "6750"[i], W.krem, 40, 46, 24)).flat()),
      tambah("empat", ...kartu("lb", 60, 150, 180, 30, W.emas, ["bilangan cacah empat angka"], 9.2)),
    ),
  ],
};

/* ------------------------------ 4. Cerita Helen di minimarket (Buku Siswa hlm. 4) ------------------------------ */
const SUARA_C1 = "Selamat belajar, anak-anak. Perhatikan cerita ini: Helen dan Ibu pergi ke minimarket. Helen mengantar Ibu untuk membeli bahan baku pembuatan kue.";
const SUARA_C2 = "Saat berbelanja, Helen meminta dibelikan minuman oleh Ibu seharga enam ribu tujuh ratus lima puluh rupiah.";
const SUARA_C3 = "Di gambar tampak deretan label harga di rak: sembilan belas ribu rupiah, lima ribu rupiah, dan enam ribu tujuh ratus lima puluh rupiah.";
const SUARA_C4 = "Sekarang coba jawab: pernahkah kalian mengamati harga di label rak makanan? Ayo, kita cari tahu tentang bilangan empat angka. Mudahkah kalian menemukannya?";

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-minimarket",
  judul: "Helen dan Ibu di minimarket",
  sumber: "Materi: cerita di minimarket",
  latar: "#FEF3C7",
  kutipan: [
    "A. Membaca dan Menulis Bilangan Cacah sampai",
    "Helen dan Ibu pergi ke minimarket.",
    "Helen mengantar Ibu untuk membeli bahan baku pembuatan kue.",
    "Saat berbelanja, Helen meminta dibelikan minuman oleh Ibu seharga Rp6.750,00",
    "Selain melihat harga minuman, Helen juga melihat sekeliling minimarket.",
    "Ada banyak deretan harga makanan yang tertera di sana.",
    "Pernahkan kalian pergi ke minimarket?",
    "Ayo, kita cari tahu tentang bilangan empat angka.",
    "Mudahkah kalian menemukannya?",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Helen dan Ibu di minimarket")),
      tambah("Helen", emo("h1", 60, 110, "👧", 34)),
      tambah("Ibu", emo("h2", 110, 110, "👩", 34)),
      tambah("minimarket.", emo("h3", 215, 110, "🏪", 44)),
      tambah("membeli", ...kartu("h4", 50, 150, 200, 30, W.emas, ["membeli bahan pembuat kue"], 9.4)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Minuman pilihan Helen")),
      tambah("minuman", emo("m1", 70, 110, "🧃", 44)),
      tambah("seharga", ...kartu("m2", 120, 70, 150, 44, W.putih, ["Rp6.750,00"], 15)),
      tambah("enam", teks("m3", 195, 140, "enam ribu tujuh ratus lima puluh rupiah", 8, W.coklat)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Label harga di rak")),
      tambah("tampak", garis("rk", 14, 72, 272, 0, W.coklat, 3), garis("rk2", 14, 120, 272, 0, W.coklat, 3)),
      tambah("sembilan", ...kartu("lb1", 14, 76, 84, 40, W.putih, ["Rp19.000"], 10.5)),
      tambah("lima", ...kartu("lb2", 108, 76, 84, 40, W.putih, ["Rp5.000"], 10.5)),
      tambah("enam", ...kartu("lb3", 202, 76, 84, 40, W.emas, ["Rp6.750"], 10.5)),
      tambah("rak:", teks("lbc", 150, 150, "tiga label harga di rak", 8, W.coklat)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Ayo cari tahu bilangan empat angka")),
      tambah("jawab:", emo("t1", 60, 100, "🤔", 38)),
      tambah("harga", ...kartu("t2", 110, 56, 176, 30, W.langit, ["harga di label rak makanan?"], 9)),
      tambah("Ayo,", ...kartu("t3", 110, 96, 176, 30, W.hijauMuda, ["banyak bilangan di label"], 9)),
      tambah("Mudahkah", ...kartu("t4", 40, 146, 220, 34, W.emas, ["bilangan empat angka"], 10.4)),
    ),
  ],
};
