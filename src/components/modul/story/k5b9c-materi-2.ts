import type { AdeganStory } from "./logika-story";
import { W, angka, barisTabel, deretLembar, emo, kartu, keping, tempat, teks } from "./k5b9c-gambar";
import { bersih, hapus, k, tambah } from "./k5b9c-bantu";

/* ------------------------------ 5. Eksplorasi 9.3B: soal jam tangan (hlm. 289) ------------------------------ */
const Y_UANG = [30, 56, 82, 108, 134];
const NILAI_UANG = [100000, 50000, 20000, 10000, 5000];
const LEMBAR_UANG = [2, 3, 4, 2, 2];

export const ADEGAN_JAM_SOAL: AdeganStory = {
  id: "jam-soal",
  judul: "Eksplorasi 9.3B: membayar jam tangan",
  sumber: "Buku Siswa hlm. 289",
  latar: "#FFFBEB",
  kutipan: [
    "Eksplorasi 9.3B",
    "Ibu akan membeli jam tangan seharga Rp345.600,00",
    "Berapakah komposisi uang yang mungkin bisa digunakan Ibu untuk membayar",
    "2 lembar 100 ribuan, 3 lembar 50 ribuan, 4 lembar 20 ribuan, 2 lembar 10 ribuan, 2 lembar 5 ribuan, 3 keping 5 ratusan, dan 3 keping seratusan",
  ],
  ketukan: [
    k(
      "Eksplorasi 9.3B. Ibu ingin membeli jam tangan seharga 345.600 rupiah. Pertanyaannya: komposisi uang apa saja yang bisa dipakai untuk membayar?",
      tambah(0, teks("jud", 150, 22, "Eksplorasi 9.3B", 12, W.ungu)),
      tambah("jam", emo("jm", 90, 100, "⌚", 54)),
      tambah("345.600", ...kartu("hg", 150, 66, 130, 50, W.krem, ["harga jam", "345.600 rupiah"], 11)),
      tambah("Pertanyaannya:", teks("tn", 150, 160, "komposisi uang apa saja?", 11, W.merah)),
    ),
    k(
      "Uang Ibu: dua lembar seratus ribuan, tiga lembar lima puluh ribuan, empat lembar dua puluh ribuan, dua lembar sepuluh ribuan, dan dua lembar lima ribuan.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Uang milik Ibu", 11, W.ungu)),
      tambah(4, ...deretLembar("i0", 56, Y_UANG[0], NILAI_UANG[0], LEMBAR_UANG[0]), teks("n0", 6, Y_UANG[0] + 14, "2 lembar", 7.6, W.merah, { anchor: "start" })),
      tambah(9, ...deretLembar("i1", 56, Y_UANG[1], NILAI_UANG[1], LEMBAR_UANG[1]), teks("n1", 6, Y_UANG[1] + 14, "3 lembar", 7.6, W.merah, { anchor: "start" })),
      tambah(14, ...deretLembar("i2", 56, Y_UANG[2], NILAI_UANG[2], LEMBAR_UANG[2]), teks("n2", 6, Y_UANG[2] + 14, "4 lembar", 7.6, W.merah, { anchor: "start" })),
      tambah(18, ...deretLembar("i3", 56, Y_UANG[3], NILAI_UANG[3], LEMBAR_UANG[3]), teks("n3", 6, Y_UANG[3] + 14, "2 lembar", 7.6, W.merah, { anchor: "start" })),
      tambah(23, ...deretLembar("i4", 56, Y_UANG[4], NILAI_UANG[4], LEMBAR_UANG[4]), teks("n4", 6, Y_UANG[4] + 14, "2 lembar", 7.6, W.merah, { anchor: "start" })),
    ),
    k(
      "Jadi nilainya 200.000, 150.000, 80.000, 20.000, dan 10.000. Ibu juga punya tiga keping lima ratusan dan tiga keping seratusan, jumlahnya 1.800.",
      tambah(2, teks("v0", 232, Y_UANG[0] + 14, "200.000", 8, W.hijau, { anchor: "start" })),
      tambah(3, teks("v1", 232, Y_UANG[1] + 14, "150.000", 8, W.hijau, { anchor: "start" })),
      tambah(4, teks("v2", 232, Y_UANG[2] + 14, "80.000", 8, W.hijau, { anchor: "start" })),
      tambah(5, teks("v3", 232, Y_UANG[3] + 14, "20.000", 8, W.hijau, { anchor: "start" })),
      tambah(7, teks("v4", 232, Y_UANG[4] + 14, "10.000", 8, W.hijau, { anchor: "start" })),
      tambah(14, ...keping("a0", 62, 176, 500), ...keping("a1", 86, 176, 500), ...keping("a2", 110, 176, 500)),
      tambah(18, ...keping("b0", 162, 176, 100), ...keping("b1", 186, 176, 100), ...keping("b2", 210, 176, 100)),
      tambah(20, teks("kp", 150, 200, "1.500 + 300 = 1.800", 8.4, W.hijau)),
    ),
    k(
      "Seluruh uang Ibu 461.800 rupiah, lebih dari harga jam, jadi cukup. Bandingkan dari kiri: 461.800 lebih besar dari 345.600.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Cukupkah uang Ibu?", 12, W.ungu)),
      tambah("Seluruh", teks("jm1", 150, 50, "200.000 + 150.000 + 80.000 + 20.000 + 10.000 + 1.800 = 461.800", 6.8, W.biru), teks("jm2", 150, 86, "461.800", 22, W.hijau)),
      tambah("Bandingkan", teks("bd", 150, 118, "461.800 lebih besar dari 345.600", 10, W.biru)),
      tambah("cukup.", emo("ok", 150, 160, "✅", 34)),
    ),
    k(
      "Harga 345.600 terdiri dari 345.000 dan 600. Bagian 600 hanya bisa dibayar dengan satu keping 500 dan satu keping 100.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Memecah harga jam", 12, W.ungu)),
      tambah("terdiri", teks("p1", 150, 56, "345.600 = 345.000 + 600", 12, W.biru)),
      tambah("Bagian", teks("p2", 150, 90, "600 = 500 + 100", 12, W.merah)),
      tambah("keping", ...keping("c5", 120, 138, 500), ...keping("c1", 180, 138, 100)),
    ),
  ],
};

/* ------------------------------ 6. Empat cara membayar (hlm. 289 dan 290) ------------------------------ */
const LB = [34, 36, 36, 36, 36, 36, 36, 36];
const KEPALA = ["", "100rb", "50rb", "20rb", "10rb", "5rb", "500", "100"];
const CARA = [
  ["Cara 1", "1", "3", "4", "1", "1", "1", "1"],
  ["Cara 2", "2", "1", "4", "1", "1", "1", "1"],
  ["Cara 3", "2", "2", "1", "2", "1", "1", "1"],
  ["Cara 4", "2", "2", "2", "0", "1", "1", "1"],
];
const JUMLAH_CARA = [
  "100.000 + 150.000 + 80.000 + 10.000 + 5.000 + 600 = 345.600",
  "200.000 + 50.000 + 80.000 + 10.000 + 5.000 + 600 = 345.600",
  "200.000 + 100.000 + 20.000 + 20.000 + 5.000 + 600 = 345.600",
  "200.000 + 100.000 + 40.000 + 0 + 5.000 + 600 = 345.600",
];
const baris = (r: number) => barisTabel(`cr${r}`, 7, 36 + (r + 1) * 18, LB, 18, CARA[r], 8);

export const ADEGAN_JAM_CARA: AdeganStory = {
  id: "jam-cara",
  judul: "Eksplorasi 9.3B: empat cara membayar",
  sumber: "Buku Siswa hlm. 289–290",
  latar: "#F0FDF4",
  kutipan: [
    "Cara 1 Cara 2 Cara 3 Cara 4",
    "Eksplorasi 9.3B",
    "Berapakah komposisi uang yang mungkin bisa digunakan Ibu untuk membayar",
  ],
  ketukan: [
    k(
      "Kita cari semua cara membayar 345.600. Bagian 600 selalu satu keping 500 dan satu keping 100. Sisanya, 345.000, disusun dari lembaran.",
      tambah(0, teks("jud", 150, 18, "Cara membayar 345.600", 12, W.ungu), ...barisTabel("hd", 7, 36, LB, 18, KEPALA, 8, W.krem)),
      tambah("Bagian", teks("r1", 150, 150, "600 = 500 + 100", 10, W.merah)),
      tambah("Sisanya,", teks("r2", 150, 170, "345.000 dari lembaran", 10, W.hijau)),
    ),
    k(
      "Cara satu: satu lembar seratus ribuan, tiga lembar lima puluh ribuan, empat lembar dua puluh ribuan, satu lembar sepuluh ribuan, dan satu lembar lima ribuan. Jumlahnya 345.600.",
      hapus(0, "r1", "r2"),
      tambah(0, ...baris(0)),
      tambah("Jumlahnya", teks("sm", 150, 150, JUMLAH_CARA[0], 6.4, W.hijau)),
    ),
    k(
      "Cara dua: dua lembar seratus ribuan, satu lembar lima puluh ribuan, empat lembar dua puluh ribuan, satu lembar sepuluh ribuan, dan satu lembar lima ribuan. Jumlahnya tetap 345.600.",
      tambah(0, ...baris(1)),
      hapus("Jumlahnya", "sm"),
      tambah("Jumlahnya", teks("sm2", 150, 150, JUMLAH_CARA[1], 6.4, W.hijau)),
    ),
    k(
      "Cara tiga: dua lembar seratus ribuan, dua lembar lima puluh ribuan, satu lembar dua puluh ribuan, dua lembar sepuluh ribuan, dan satu lembar lima ribuan. Jumlahnya tetap 345.600.",
      tambah(0, ...baris(2)),
      hapus("Jumlahnya", "sm2"),
      tambah("Jumlahnya", teks("sm3", 150, 150, JUMLAH_CARA[2], 6.4, W.hijau)),
    ),
    k(
      "Cara empat: dua lembar seratus ribuan, dua lembar lima puluh ribuan, dua lembar dua puluh ribuan, tanpa sepuluh ribuan, dan satu lembar lima ribuan. Jumlahnya tetap 345.600.",
      tambah(0, ...baris(3)),
      hapus("Jumlahnya", "sm3"),
      tambah("Jumlahnya", teks("sm4", 150, 150, JUMLAH_CARA[3], 6.4, W.hijau)),
    ),
    k(
      "Hanya ada empat cara. Apa pun caranya, jumlahnya tetap 345.600 dan tabel nilai tempatnya sama: 3, 4, 5, 6, 0, dan 0.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Empat cara, satu bilangan: 345.600", 11, W.ungu), ...tempat("tb", 18, 40)),
      tambah(15, angka("dg", 18, 40, 0, "3")),
      tambah(16, angka("dg", 18, 40, 1, "4")),
      tambah(17, angka("dg", 18, 40, 2, "5")),
      tambah(18, angka("dg", 18, 40, 3, "6")),
      tambah(19, angka("dg", 18, 40, 4, "0")),
      tambah(21, angka("dg", 18, 40, 5, "0")),
      tambah("caranya,", teks("kb", 150, 120, "Komposisi boleh beda,", 11, W.merah), teks("kb2", 150, 138, "bilangannya tetap.", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Refleksi (hlm. 290) dan saran Buku Panduan Guru (hlm. 408 dan 409) ------------------------------ */
const LR = [20, 200, 30, 30];
const PERNYATAAN = [
  ["1", "Aku dapat membaca bilangan cacah", "Ya", ""],
  ["2", "Aku dapat menuliskan bilangan cacah", "Ya", ""],
  ["3", "Aku dapat menentukan nilai tempat", "Ya", ""],
  ["4", "Aku dapat membandingkan dua bilangan", "Ya", ""],
  ["5", "Aku dapat mengurutkan bilangan", "Ya", ""],
  ["6", "Aku dapat menyusun (komposisi)", "Ya", ""],
  ["7", "Aku dapat menguraikan (dekomposisi)", "Ya", ""],
];
const barisR = (i: number, warna: string) => barisTabel(`rf${i}`, 10, 48 + i * 17, LR, 17, PERNYATAAN[i], 7.2, warna);

export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi-c",
  judul: "Refleksi dan saran Buku Panduan Guru",
  sumber: "Buku Siswa hlm. 290; Buku Panduan Guru hlm. 408–409",
  latar: "#F5F3FF",
  kutipan: [
    "Setelah mempelajari materi terkait bilangan sampai 1.000.000",
    "Aku dapat membaca bilangan cacah sampai",
    "Aku dapat membandingkan dua bilangan",
    "Aku dapat mengurutkan beberapa bilangan",
    "Aku dapat menyusun atau komposisi bilangan",
    "Aku dapat menguraikan atau dekomposisi",
  ],
  ketukan: [
    k(
      "Setelah belajar bilangan sampai 1.000.000, buku mengajak kita merefleksi dengan tujuh pernyataan, centang Ya atau Tidak.",
      tambah(0, teks("jud", 150, 20, "Refleksi bilangan sampai 1.000.000", 11, W.ungu), ...barisTabel("rfh", 10, 31, LR, 17, ["No", "Pernyataan", "Ya", "Tidak"], 7.2, W.krem)),
    ),
    k(
      "Tiga pernyataan pertama: membaca, menulis, dan menentukan nilai tempat. Itu isi Sub-Bab A.",
      tambah("membaca,", ...barisR(0, W.mint)),
      tambah("menulis,", ...barisR(1, W.mint)),
      tambah("nilai", ...barisR(2, W.mint)),
    ),
    k(
      "Pernyataan empat dan lima: membandingkan dan mengurutkan bilangan. Itu isi Sub-Bab B.",
      tambah("membandingkan", ...barisR(3, W.langit)),
      tambah("mengurutkan", ...barisR(4, W.langit)),
    ),
    k(
      "Pernyataan enam dan tujuh: menyusun atau komposisi, dan menguraikan atau dekomposisi. Itu isi Sub-Bab C.",
      tambah("menyusun", ...barisR(5, W.krem)),
      tambah("menguraikan", ...barisR(6, W.krem)),
    ),
    k(
      "Buku Panduan Guru: guru menutup pelajaran dengan refleksi, lalu mengajak anak menyimpulkan cara komposisi dan dekomposisi, boleh dengan pecahan uang atau cara lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Saran Buku Panduan Guru", 12, W.ungu)),
      tambah("menutup", ...kartu("g1", 20, 40, 260, 34, W.mint, ["tutup dengan refleksi"], 10)),
      tambah("menyimpulkan", ...kartu("g2", 20, 84, 260, 34, W.langit, ["simpulkan cara komposisi dan dekomposisi"], 9)),
      tambah("pecahan", ...kartu("g3", 20, 128, 260, 34, W.krem, ["pakai pecahan uang atau cara lain"], 10)),
    ),
    k(
      "Panduan guru juga mengingatkan: ada anak yang hanya menemukan satu cara, dan ada yang sulit memahami soal cerita. Guru berkeliling dan membimbing.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Yang perlu diperhatikan guru", 12, W.ungu)),
      tambah("satu", ...kartu("m1", 20, 44, 124, 70, W.mawar, ["hanya satu", "cara"], 10)),
      tambah("soal", ...kartu("m2", 156, 44, 124, 70, W.mawar, ["sulit memahami", "soal cerita"], 10)),
      tambah("berkeliling", emo("gr", 150, 160, "🙋", 36), teks("grt", 150, 192, "guru berkeliling dan membimbing", 9, W.biru)),
    ),
  ],
};
