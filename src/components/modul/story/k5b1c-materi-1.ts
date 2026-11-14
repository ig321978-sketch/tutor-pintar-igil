import type { AdeganStory } from "./logika-story";
import { W, barisUang, emo, judul, kartu, panah, satuUang, teks } from "./k5b1c-gambar";
import { bersih, hapus, k, tambah } from "./k5b1c-bantu";

/* ------------------------------ 1. Pembuka Subbab C (Panduan Guru hlm. 29; Buku Siswa hlm. 15) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-c",
  judul: "Subbab C: Komposisi dan Dekomposisi",
  sumber: "Panduan Guru hlm. 29; Buku Siswa hlm. 15",
  latar: "#EFF6FF",
  kutipan: [
    "C. Komposisi dan Dekomposisi Bilangan Sampai 100.000",
    "Pengalaman Belajar",
    "Setelah mempelajari bagian C ini, peserta didik diharapkan dapat",
    "menentukan komposisi bilangan dan",
    "menentukan dekomposisi bilangan",
    "Eksplorasi 1.3",
    "Ayo Berdiskusi",
  ],
  ketukan: [
    k(
      "Subbab C, Komposisi dan Dekomposisi Bilangan Sampai seratus ribu. Di subbab sebelumnya kita membandingkan dan mengurutkan bilangan. Sekarang kita belajar menyusun dan menguraikan bilangan.",
      tambah(0, judul("C. Komposisi dan Dekomposisi"), teks("sb", 150, 36, "bilangan sampai 100.000", 9, W.hitam)),
      tambah("membandingkan", ...kartu("a1", 16, 62, 116, 50, W.langit, ["subbab B", "banding dan urut"], 8.8)),
      tambah("Sekarang", panah("ar", 136, 87, 26, 0, W.merah, 2.4), ...kartu("a2", 168, 62, 116, 50, W.hijauMuda, ["subbab C", "susun dan uraikan"], 9)),
      tambah("menguraikan", emo("a3", 150, 160, "💰", 28)),
    ),
    k(
      "Sebelum mulai, guru menjelaskan pengalaman belajar. Setelah mempelajari bagian C, peserta didik diharapkan dapat menentukan komposisi bilangan dan menentukan dekomposisi bilangan.",
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("pengalaman", emo("b1", 150, 66, "🎯", 28)),
      tambah("komposisi", ...kartu("b2", 24, 84, 252, 38, W.hijauMuda, ["menentukan komposisi bilangan"], 10)),
      tambah("dekomposisi", ...kartu("b3", 24, 132, 252, 38, W.krem, ["menentukan dekomposisi bilangan"], 10)),
    ),
    k(
      "Kata barunya ada dua. Di Refleksi buku, komposisi ditulis menyusun bilangan, dan dekomposisi ditulis menguraikan bilangan. Keduanya kita latih memakai pecahan uang.",
      bersih(0),
      tambah(0, judul("2 kata baru")),
      tambah("komposisi", ...kartu("c1", 20, 44, 260, 44, W.hijauMuda, ["komposisi", "menyusun bilangan"], 10)),
      tambah("dekomposisi", ...kartu("c2", 20, 100, 260, 44, W.pink, ["dekomposisi", "menguraikan bilangan"], 10)),
      tambah("pecahan", emo("c3", 150, 176, "💵", 24)),
    ),
    k(
      "Subbab ini memuat Eksplorasi satu titik tiga tentang uang Asep dan uang Lukas, lalu Ayo Berdiskusi tentang uang Komang, dan ditutup dengan Refleksi nomor enam dan tujuh.",
      bersih(0),
      tambah(0, judul("Isi subbab C")),
      tambah("Eksplorasi", ...kartu("d1", 24, 36, 252, 36, W.hijauMuda, ["Eksplorasi 1.3: uang Asep dan Lukas"], 9)),
      tambah("Ayo", ...kartu("d2", 24, 82, 252, 36, W.langit, ["Ayo Berdiskusi: uang Komang"], 9)),
      tambah("Refleksi", ...kartu("d3", 24, 128, 252, 36, W.pink, ["Refleksi nomor 6 dan 7"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Sarana dan apersepsi (Panduan Guru hlm. 29) ------------------------------ */
export const ADEGAN_SARANA: AdeganStory = {
  id: "sarana-apersepsi",
  judul: "Sarana, media, dan apersepsi",
  sumber: "Panduan Guru hlm. 29",
  latar: "#FFFBEB",
  kutipan: [
    "Kebutuhan Sarana Prasarana dan Media Pembelajaran",
    "Alat tulis",
    "Berbagai pecahan uang mainan",
    "Apersepsi",
    "Guru dapat memulai kegiatan dengan mengajak peserta didik mengulang materi sebelumnya",
    "Guru dapat menunjukkan berbagai pecahan uang yang dapat disusun dari berbagai macam uang yang dibawa.",
  ],
  ketukan: [
    k(
      "Kebutuhan sarana dan media pembelajaran subbab ini ada dua: alat tulis dan berbagai pecahan uang mainan.",
      tambah(0, judul("2 sarana dan media")),
      tambah("alat", emo("sa", 80, 78, "📝", 30), ...kartu("sa2", 20, 92, 120, 34, W.langit, ["alat tulis"], 10)),
      tambah("berbagai", emo("sb", 220, 78, "💵", 30), ...kartu("sb2", 160, 92, 120, 34, W.krem, ["pecahan uang", "mainan"], 9)),
    ),
    k(
      "Apersepsi: guru mengajak peserta didik mengulang materi sebelumnya, yaitu tentang bilangan sampai seratus ribu.",
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("Apersepsi", emo("ap", 150, 70, "💭", 32)),
      tambah("mengulang", ...kartu("ap2", 40, 92, 220, 38, W.langit, ["ulang materi sebelumnya"], 10)),
      tambah("seratus", ...kartu("ap3", 70, 142, 160, 34, W.hijauMuda, ["bilangan sampai 100.000"], 9.4)),
    ),
    k(
      "Guru juga menunjukkan berbagai pecahan uang yang dapat disusun dari berbagai macam uang yang dibawa.",
      bersih(0),
      tambah(0, judul("Menunjukkan pecahan uang")),
      tambah("menunjukkan", ...barisUang("ua", 30, 66, 3, "p", 22)),
      tambah("berbagai@2", ...barisUang("ub", 120, 66, 3, "r", 22)),
      tambah("macam", ...barisUang("uc", 210, 66, 3, "s", 22)),
      tambah("macam", teks("ta", 52, 98, "10.000", 9.4, W.biru), teks("tb", 142, 98, "1.000", 9.4, W.biru), teks("tc", 232, 98, "100", 9.4, W.biru)),
      tambah("dibawa", ...kartu("ud", 40, 126, 220, 38, W.pink, ["uang yang dibawa", "disusun jadi bilangan"], 9)),
    ),
    k(
      "Dengan begitu peserta didik mengenal uang yang akan dipakai, dan siap masuk ke pemanasan.",
      hapus(0, "ud-k", "ud-t0", "ud-t1"),
      tambah("mengenal", emo("ue", 150, 140, "🙂", 34)),
      tambah("pemanasan", ...kartu("uf", 70, 160, 160, 28, W.hijauMuda, ["siap pemanasan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Pemanasan: pecahan uang dan harga (Panduan Guru hlm. 29) ------------------------------ */
export const ADEGAN_PEMANASAN: AdeganStory = {
  id: "pemanasan-uang",
  judul: "Pemanasan: ragam pecahan uang",
  sumber: "Panduan Guru hlm. 29; Buku Siswa hlm. 16",
  latar: "#F0FDF4",
  kutipan: [
    "Pemanasan",
    "Untuk kegiatan pemanasan, guru dapat memulai dengan mengenalkan ragam pecahan uang",
    "mulailah untuk menyebutkan harga sabun, harga mainan, atau harga baju.",
    "berikan pertanyaan tentang kemungkinan komposisi uang yang tersusun.",
    "Gambar 1.6 Uang Komang",
  ],
  ketukan: [
    k(
      "Pemanasan dimulai dengan mengenalkan ragam pecahan uang. Di buku ada tiga jenis: sepuluh ribuan, seribuan, dan seratusan.",
      tambah(0, judul("Ragam pecahan uang")),
      tambah("tiga", teks("n3", 150, 40, "3 jenis uang", 9.4, W.hitam)),
      tambah("sepuluh", satuUang("m1", 38, 56, "p"), ...kartu("m1k", 14, 70, 84, 40, W.krem, ["10.000", "lembar"], 8.6)),
      tambah("seribuan", satuUang("m2", 142, 56, "r"), ...kartu("m2k", 108, 70, 84, 40, W.krem, ["1.000", "lembar"], 8.6)),
      tambah("seratusan", satuUang("m3", 246, 56, "s"), ...kartu("m3k", 202, 70, 84, 40, W.krem, ["100", "keping"], 8.6)),
    ),
    k(
      "Lalu guru menyebutkan harga sabun, harga mainan, atau harga baju.",
      bersih(0),
      tambah(0, judul("Menyebut harga")),
      tambah("sabun", emo("h1", 50, 76, "🧼", 32), ...kartu("h1k", 14, 90, 72, 28, W.langit, ["sabun"], 9)),
      tambah("mainan", emo("h2", 150, 76, "🧸", 32), ...kartu("h2k", 114, 90, 72, 28, W.pink, ["mainan"], 9)),
      tambah("baju", emo("h3", 250, 76, "👕", 32), ...kartu("h3k", 214, 90, 72, 28, W.hijauMuda, ["baju"], 9)),
    ),
    k(
      "Setelah itu guru bertanya: uang apa saja yang bisa dipakai untuk membayarnya? Itulah kemungkinan komposisi uang yang tersusun.",
      bersih(0),
      tambah(0, judul("Komposisi uang yang tersusun")),
      tambah("uang", emo("q", 150, 78, "❓", 30)),
      tambah("membayarnya", ...barisUang("ma", 30, 104, 3, "p", 20), ...barisUang("mb", 120, 104, 3, "r", 20), ...barisUang("mc", 210, 104, 3, "s", 20)),
      tambah("komposisi", ...kartu("md", 40, 140, 220, 38, W.krem, ["uang apa saja untuk", "membayar harga ini?"], 9)),
    ),
    k(
      "Jawaban boleh berbeda. Satu harga bisa dibayar dengan beberapa komposisi uang. Ingat ini, karena sebentar lagi kita menemukannya sendiri.",
      bersih(0),
      tambah(0, judul("Satu harga, banyak komposisi")),
      tambah("Jawaban", ...kartu("p1", 20, 44, 120, 40, W.langit, ["komposisi A"], 9.4)),
      tambah("Satu", ...kartu("p2", 160, 44, 120, 40, W.pink, ["komposisi B"], 9.4)),
      tambah("beberapa", ...kartu("p3", 20, 98, 120, 40, W.hijauMuda, ["komposisi C"], 9.4)),
      tambah("menemukannya", emo("p4", 220, 128, "🔎", 34)),
    ),
  ],
};

/* ------------------------------ 4. Persiapan guru Eksplorasi 1.3 (Panduan Guru hlm. 30) ------------------------------ */
export const ADEGAN_PERSIAPAN: AdeganStory = {
  id: "persiapan-guru",
  judul: "Persiapan guru untuk Eksplorasi 1.3",
  sumber: "Panduan Guru hlm. 30",
  latar: "#FFF7ED",
  kutipan: [
    "Eksplorasi 1.3",
    "Persiapan Guru",
    "Sebelum memulai pembelajaran, mulailah membagikan pecahan mainan uang sesuai kegiatan Eksplorasi.",
    "pastikan peserta didik mengenal berbagai jenis mata uang yang sering digunakan untuk transaksi setiap hari.",
    "Jika peserta didik belum mengenal pecahan uang, kenalkan terlebih dahulu berbagai pecahan uang.",
  ],
  ketukan: [
    k(
      "Persiapan guru untuk Eksplorasi satu titik tiga. Pertama, sebelum pembelajaran, bagikan pecahan mainan uang sesuai kegiatan.",
      tambah(0, judul("Eksplorasi 1.3: persiapan guru")),
      tambah("Pertama", ...kartu("g1", 16, 44, 268, 36, W.hijauMuda, ["a. bagikan pecahan mainan uang"], 9.4)),
      tambah("bagikan", emo("g1e", 150, 112, "💵", 30)),
    ),
    k(
      "Kedua, pastikan peserta didik mengenal berbagai jenis mata uang yang sering digunakan untuk transaksi setiap hari.",
      tambah("Kedua", ...kartu("g2", 16, 92, 268, 36, W.langit, ["b. kenali jenis mata uang sehari-hari"], 9.4)),
      hapus("pastikan", "g1e"),
      tambah("transaksi", emo("g2e", 150, 160, "🛒", 28)),
    ),
    k(
      "Ketiga, jika peserta didik belum mengenal pecahan uang, kenalkan terlebih dahulu berbagai pecahan uang itu.",
      hapus(0, "g2e"),
      tambah("Ketiga", ...kartu("g3", 16, 140, 268, 36, W.pink, ["c. belum kenal? kenalkan dulu"], 9.4)),
    ),
    k(
      "Dengan tiga langkah persiapan ini, kegiatan eksplorasi bisa berjalan lancar.",
      bersih(0),
      tambah(0, judul("Tiga langkah siap")),
      tambah("tiga", teks("g4", 150, 90, "3 langkah", 22, W.ungu)),
      tambah("lancar", emo("g5", 150, 140, "✅", 30)),
    ),
  ],
};
