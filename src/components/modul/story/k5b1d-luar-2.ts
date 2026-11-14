import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, judul, kartu, panah, teks } from "./k5b1d-gambar";
import { bersih, k, tambah } from "./k5b1d-bantu";

/* ------------------------------ 6. Estimate First: konsep ------------------------------ */
export const ADEGAN_LUAR_EF: AdeganStory = {
  id: "luar-ef",
  judul: "Metode 3: Estimate First (perkiraan dulu)",
  sumber: "Metode luar: Estimate First; angka Buku Siswa hlm. 26",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Estimate First, perkiraan dulu. Sebelum menghitung teliti, bulatkan bilangan menjadi bilangan yang mudah, lalu hitung kasar untuk mendapat gambaran jawabannya.",
      tambah(0, judul("Estimate First")),
      tambah("Estimate", emo("tg", 262, 70, "🎯", 36)),
      tambah("bulatkan", ...kartu("e1", 14, 36, 210, 30, W.hijauMuda, ["1. bulatkan bilangan"], 9.6)),
      tambah("kasar", ...kartu("e2", 14, 78, 210, 30, W.langit, ["2. hitung kasar"], 9.6)),
      tambah("gambaran", ...kartu("e3", 14, 120, 272, 30, W.krem, ["3. hitung teliti, lalu bandingkan"], 9.6)),
    ),
    k(
      "Cara membulatkan: lihat angka di tempat sesudahnya. Lima atau lebih dibulatkan ke atas, kurang dari lima dibulatkan ke bawah. Misalnya tujuh puluh enam ribu lima ratus sembilan puluh delapan menjadi tujuh puluh tujuh ribu.",
      bersih(0),
      tambah(0, judul("Cara membulatkan")),
      tambah("Lima", ...kartu("b1", 14, 34, 130, 34, W.hijauMuda, ["angka 5 atau lebih:", "naik"], 8.8)),
      tambah("kurang", ...kartu("b2", 156, 34, 130, 34, W.merahMuda, ["angka kurang dari 5:", "turun"], 8.8)),
      tambah("Misalnya", teks("b3", 150, 118, "76.598 → 77.000", 17, W.hitam)),
      tambah("tujuh@3", teks("b4", 150, 146, "dibulatkan ke ribuan", 9.6, W.coklat)),
    ),
    k(
      "Hasil kasar berguna sebagai pagar: jawaban teliti harus dekat dengan perkiraan. Kalau jauh, ada yang salah, misalnya angka terselip atau lupa menyimpan.",
      bersih(0),
      tambah(0, judul("Perkiraan sebagai pagar")),
      tambah("dekat", emo("ok", 50, 82, "✅", 30), ...kartu("p1", 80, 56, 200, 40, W.hijauMuda, ["dekat dengan perkiraan:", "jawaban wajar"], 9.2)),
      tambah("jauh,", emo("no", 50, 146, "❌", 30), ...kartu("p2", 80, 120, 200, 40, W.merahMuda, ["jauh dari perkiraan:", "periksa lagi"], 9.2)),
    ),
    k(
      "Metode ini juga cepat untuk soal cerita dan pilihan ganda, karena cukup tahu jawabannya di kisaran berapa. Perkiraan tidak menggantikan hitung teliti, hanya menjaganya.",
      bersih(0),
      tambah(0, judul("Kapan dipakai?")),
      tambah("soal", ...kartu("w1", 20, 34, 260, 32, W.langit, ["soal cerita"], 10)),
      tambah("pilihan", ...kartu("w2", 20, 78, 260, 32, W.krem, ["pilihan ganda"], 10)),
      tambah("Perkiraan", ...kartu("w3", 20, 122, 260, 40, W.hijauMuda, ["perkiraan menjaga", "hitungan teliti"], 9.6)),
    ),
  ],
};

/* ------------------------------ 7. Estimate First: penerapan ------------------------------ */
export const ADEGAN_LUAR_EF_TERAPAN: AdeganStory = {
  id: "luar-ef-terapan",
  judul: "Estimate First pada Uji Kompetensi 4a dan 4d",
  sumber: "Metode luar: Estimate First; angka Buku Siswa hlm. 26–27",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Perkiraan untuk tujuh puluh enam ribu lima ratus sembilan puluh delapan ditambah dua belas ribu empat ratus lima puluh enam: tujuh puluh tujuh ribu ditambah dua belas ribu, kira-kira delapan puluh sembilan ribu.",
      tambah(0, judul("Perkiraan: 76.598 + 12.456")),
      tambah("Perkiraan", teks("f1", 150, 56, "76.598 → 77.000", 14, W.biru)),
      tambah("ditambah@1", teks("f2", 150, 86, "12.456 → 12.000", 14, W.biru)),
      tambah("kira-kira", teks("f3", 150, 126, "77.000 + 12.000 = 89.000", 15, W.merah)),
    ),
    k(
      "Hitungan teliti memberi delapan puluh sembilan ribu lima puluh empat, hanya beda lima puluh empat dari perkiraan. Jawabannya wajar.",
      tambah("teliti", teks("f4", 150, 158, "teliti: 89.054", 13, W.hijau)),
      tambah("hanya", teks("f5", 150, 178, "89.054 − 89.000 = 54", 11, W.coklat)),
      tambah("wajar.", emo("f6", 262, 174, "✅", 24)),
    ),
    k(
      "Perkiraan untuk lima ratus enam puluh tujuh dikali sembilan puluh delapan: sembilan puluh delapan hampir seratus, jadi kira-kira lima ratus enam puluh tujuh kali seratus, lima puluh enam ribu tujuh ratus.",
      bersih(0),
      tambah(0, judul("Perkiraan: 567 × 98")),
      tambah("Perkiraan", teks("g1", 150, 56, "567 × 98", 17, W.biru)),
      tambah("hampir", teks("g2", 150, 92, "98 → 100", 15, W.biru)),
      tambah("jadi", teks("g3", 150, 132, "567 × 100 = 56.700", 16, W.merah)),
    ),
    k(
      "Hitungan teliti lima puluh lima ribu lima ratus enam puluh enam sedikit di bawah perkiraan, karena sembilan puluh delapan lebih kecil daripada seratus. Selisihnya seribu seratus tiga puluh empat.",
      tambah("Hitungan", teks("g4", 150, 162, "teliti: 55.566", 13, W.hijau)),
      tambah("Selisihnya", teks("g5", 150, 184, "56.700 − 55.566 = 1.134", 11, W.coklat)),
    ),
  ],
};

/* ------------------------------ 8. Inverse Check: konsep ------------------------------ */
export const ADEGAN_LUAR_IC: AdeganStory = {
  id: "luar-ic",
  judul: "Metode 4: Inverse Check (periksa dengan kebalikan)",
  sumber: "Metode luar: Inverse Check; angka Buku Siswa hlm. 26–28",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Inverse Check, periksa dengan operasi kebalikan. Setiap operasi punya kebalikan: penjumlahan dengan pengurangan, perkalian dengan pembagian.",
      tambah(0, judul("Inverse Check")),
      tambah("penjumlahan", bulat("q1", 60, 80, 20, W.hijauMuda), teks("q1s", 60, 87.5, "+", 22, W.biru), panah("q1a", 84, 74, 32, 0, W.merah, 2), panah("q1b", 116, 86, -32, 0, W.merah, 2), bulat("q2", 140, 80, 20, W.merahMuda), teks("q2s", 140, 87.5, "−", 22, W.biru)),
      tambah("perkalian", bulat("q3", 60, 140, 20, W.krem), teks("q3s", 60, 147.5, "×", 22, W.biru), panah("q3a", 84, 134, 32, 0, W.merah, 2), panah("q3b", 116, 146, -32, 0, W.merah, 2), bulat("q4", 140, 140, 20, W.pink), teks("q4s", 140, 147.5, "÷", 22, W.biru)),
      tambah("kebalikan@2", teks("q5", 236, 84, "saling", 9.6, W.coklat), teks("q6", 236, 98, "berkebalikan", 9.6, W.coklat)),
    ),
    k(
      "Cara memeriksa penjumlahan: hasilnya dikurangi salah satu bilangan, harus kembali ke bilangan yang lain. Cara memeriksa pengurangan: hasilnya ditambah pengurang, harus kembali ke bilangan semula.",
      bersih(0),
      tambah(0, judul("Periksa + dan −")),
      tambah("penjumlahan:", ...kartu("r1", 14, 36, 272, 44, W.hijauMuda, ["a + b = c", "periksa: c − b = a"], 10.4)),
      tambah("pengurangan:", ...kartu("r2", 14, 100, 272, 44, W.merahMuda, ["a − b = c", "periksa: c + b = a"], 10.4)),
    ),
    k(
      "Cara memeriksa perkalian: hasilnya dibagi salah satu faktor, harus menghasilkan faktor yang lain. Cara memeriksa pembagian: hasilnya dikali pembagi, harus kembali ke bilangan yang dibagi.",
      bersih(0),
      tambah(0, judul("Periksa × dan ÷")),
      tambah("perkalian:", ...kartu("r3", 14, 36, 272, 44, W.krem, ["a × b = c", "periksa: c ÷ b = a"], 10.4)),
      tambah("pembagian:", ...kartu("r4", 14, 100, 272, 44, W.pink, ["a ÷ b = c", "periksa: c × b = a"], 10.4)),
    ),
    k(
      "Jika hasil periksa kembali sama, hitungan benar. Jika tidak kembali, ada kesalahan di langkah awal atau di langkah periksa. Metode ini murah karena memakai operasi yang sudah kita kuasai.",
      bersih(0),
      tambah(0, judul("Membaca hasil periksa")),
      tambah("sama,", emo("y1", 46, 80, "✅", 30), ...kartu("y2", 76, 56, 208, 40, W.hijauMuda, ["kembali sama:", "hitungan benar"], 9.4)),
      tambah("tidak", emo("n1", 46, 144, "❌", 30), ...kartu("n2", 76, 120, 208, 40, W.merahMuda, ["tidak sama:", "cari kesalahan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 9. Inverse Check: penerapan ------------------------------ */
export const ADEGAN_LUAR_IC_TERAPAN: AdeganStory = {
  id: "luar-ic-terapan",
  judul: "Inverse Check pada empat hitungan buku",
  sumber: "Metode luar: Inverse Check; angka Buku Siswa hlm. 19–20 dan hlm. 26",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Periksa penjumlahan Uji Kompetensi empat a. Hasilnya delapan puluh sembilan ribu lima puluh empat, dikurangi dua belas ribu empat ratus lima puluh enam, kembali ke tujuh puluh enam ribu lima ratus sembilan puluh delapan.",
      tambah(0, judul("Periksa penjumlahan 4a")),
      tambah("Periksa", teks("h1", 150, 58, "76.598 + 12.456 = 89.054", 14, W.biru)),
      tambah("dikurangi", teks("h2", 150, 100, "89.054 − 12.456 = 76.598", 14, W.merah)),
      tambah("kembali", emo("h3", 150, 150, "✅", 30)),
    ),
    k(
      "Periksa pengurangan sisa uang Lukas: dua ribu seratus lima puluh ditambah empat puluh lima ribu tujuh ratus lima puluh kembali ke empat puluh tujuh ribu sembilan ratus.",
      bersih(0),
      tambah(0, judul("Periksa sisa uang Lukas")),
      tambah("Periksa", teks("i1", 150, 58, "47.900 − 45.750 = 2.150", 14, W.biru)),
      tambah("ditambah", teks("i2", 150, 100, "2.150 + 45.750 = 47.900", 14, W.merah)),
      tambah("kembali", emo("i3", 150, 150, "✅", 30)),
    ),
    k(
      "Periksa perkalian dan pembagian. Empat ratus lima puluh enam kali seratus empat puluh tujuh sama dengan enam puluh tujuh ribu tiga puluh dua, jadi pembagian benar. Enam belas ribu kali empat sama dengan enam puluh empat ribu.",
      bersih(0),
      tambah(0, judul("Periksa kali dan bagi")),
      tambah("Periksa", teks("j1", 150, 50, "67.032 ÷ 147 = 456", 13, W.biru)),
      tambah("Empat", teks("j2", 150, 76, "456 × 147 = 67.032", 13, W.hijau)),
      tambah("belas", teks("j3", 150, 120, "64.000 ÷ 4 = 16.000", 13, W.biru)),
      tambah("kali@2", teks("j4", 150, 146, "16.000 × 4 = 64.000", 13, W.hijau)),
    ),
    k(
      "Sekarang periksa kunci Panduan Guru. Lima ratus enam puluh tujuh dikali sembilan puluh delapan sama dengan lima puluh lima ribu lima ratus enam puluh enam. Dibagi sembilan puluh delapan, kembali ke lima ratus enam puluh tujuh.",
      bersih(0),
      tambah(0, judul("Periksa kunci 4d")),
      tambah("Lima", teks("m1", 150, 58, "567 × 98 = 55.566", 15, W.biru)),
      tambah("Dibagi", teks("m2", 150, 100, "55.566 ÷ 98 = 567", 15, W.hijau)),
      tambah("kembali", ...kartu("m3", 60, 130, 180, 34, W.krem, ["kunci Panduan Guru benar"], 10)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan: empat metode untuk operasi hitung bilangan besar",
  sumber: "Ringkasan metode luar; angka Buku Siswa hlm. 17–28",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Ringkasan empat metode. Standard Algorithm menata kolom, Regrouping menukar nilai tempat, Estimate First menjaga hasil wajar, dan Inverse Check membuktikan hasil.",
      tambah(0, judul("Empat metode")),
      tambah("Standard", ...kartu("s1", 12, 32, 276, 30, W.hijauMuda, ["Standard Algorithm: menata kolom"], 9.4)),
      tambah("Regrouping", ...kartu("s2", 12, 70, 276, 30, W.langit, ["Regrouping: menukar nilai tempat"], 9.4)),
      tambah("Estimate", ...kartu("s3", 12, 108, 276, 30, W.krem, ["Estimate First: menjaga hasil wajar"], 9.4)),
      tambah("Inverse", ...kartu("s4", 12, 146, 276, 30, W.pink, ["Inverse Check: membuktikan hasil"], 9.4)),
    ),
    k(
      "Urutan kerja yang disarankan: perkirakan dulu, hitung bersusun dengan menyimpan dan meminjam, lalu periksa dengan operasi kebalikan.",
      bersih(0),
      tambah(0, judul("Urutan kerja")),
      tambah("perkirakan", ...kartu("u1", 8, 70, 82, 50, W.krem, ["1.", "perkirakan"], 8.6)),
      tambah("hitung", panah("u1a", 92, 95, 12, 0, W.merah, 2), ...kartu("u2", 106, 70, 88, 50, W.hijauMuda, ["2. hitung", "bersusun"], 8.6)),
      tambah("periksa", panah("u2a", 196, 95, 12, 0, W.merah, 2), ...kartu("u3", 210, 70, 82, 50, W.pink, ["3.", "periksa"], 8.6)),
    ),
    k(
      "Angka buku: lima puluh tujuh ribu lima ratus ditambah dua puluh dua ribu, empat puluh tujuh ribu sembilan ratus dikurangi empat puluh lima ribu tujuh ratus lima puluh, dua belas kali lima ribu, dan enam puluh empat ribu dibagi empat.",
      bersih(0),
      tambah(0, judul("Hasil dari buku")),
      tambah("ditambah", teks("z1", 150, 52, "57.500 + 22.000 = 79.500", 13, W.biru)),
      tambah("dikurangi", teks("z2", 150, 88, "47.900 − 45.750 = 2.150", 13, W.biru)),
      tambah("kali", teks("z3", 150, 124, "12 × 5.000 = 60.000", 13, W.biru)),
      tambah("dibagi", teks("z4", 150, 160, "64.000 ÷ 4 = 16.000", 13, W.biru)),
    ),
    k(
      "Semua hasil itu cocok dengan buku. Karena bilangannya sampai seratus ribu, ketelitian tiap kolom dan pemeriksaan kecil sangat menolong.",
      bersih(0),
      tambah(0, judul("Penutup metode luar")),
      tambah("Semua", emo("zz", 150, 84, "✅", 44)),
      tambah("seratus", ...kartu("zk", 40, 108, 220, 40, W.hijauMuda, ["bilangan sampai 100.000", "teliti tiap kolom"], 10)),
    ),
  ],
};
