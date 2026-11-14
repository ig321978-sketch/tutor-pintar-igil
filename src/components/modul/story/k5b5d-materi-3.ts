import type { AdeganStory, Obj } from "./logika-story";
import { KOLAM, W, baris, bulat, emo, garis, kartu, kotak, panah, teks } from "./k5b5d-gambar";
import { bersih, k, tambah, ubah } from "./k5b5d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/* ------------------------------ 8. Miskonsepsi dan diferensiasi (Panduan Guru hlm. 235) ------------------------------ */
export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi-d",
  judul: "Miskonsepsi dan diferensiasi pada Sub-Bab D",
  sumber: "Buku Panduan Guru hlm. 235",
  latar: "#FFF1F2",
  kutipan: [
    "Guru perlu mengantisipasi jawaban nomor 5 dan 6",
    "Jawaban nomor 5 berarti peserta didik mengusulkan bentuk persegi",
    "persegi juga merupakan persegi panjang",
    "Adapun perinciannya akan dipelajari pada Bab 7 buku ini",
    "tidak menggunakan kertas berpetak sebagai satuan",
    "Kertas berpetak yang tersedia hanya mengakomodasi kelipatan 5",
    "jawaban ini perlu diapresiasi dan dilanjutkan dengan eksplorasi tanpa kertas berpetak",
    "Kegiatan pembelajaran pada Subbab D dirancang untuk mengembangkan pola berpikir kreatif peserta didik",
    "guru perlu memberikan bimbingan secara proporsional",
  ],
  ketukan: [
    k(
      "Panduan guru meminta guru mengantisipasi dua jawaban pada tabel, yaitu nomor 5 dan nomor 6. Keduanya bisa memancing pertanyaan atau salah paham.",
      tambah(0, jud("Dua jawaban perlu diantisipasi", 22, 11)),
      tambah("nomor", kartu("mk1", 25, 50, 110, 64, W.hijauMuda, ["Nomor 5", "15 x 15"], 10)),
      tambah("nomor@2", kartu("mk2", 165, 50, 110, 64, W.krem, ["Nomor 6", "18 x 12"], 10)),
      tambah("salah", teks("mk3", 150, 160, "bisa memancing pertanyaan", 9.4, W.merah)),
    ),
    k(
      "Jawaban nomor 5 berarti siswa mengusulkan persegi. Siswa lain mungkin bertanya, bukankah soal meminta persegi panjang, bukan persegi?",
      bersih(0),
      tambah(0, jud("Nomor 5: bentuk persegi", 22, 11)),
      tambah("persegi.", kotak("ms", 60, 70, 56, 56, W.hijauMuda, W.hijau, { tebal: 2.4 }), teks("mst", 88, 102, "persegi", 9.4, W.hijau)),
      tambah("bertanya,", kartu("mq", 140, 60, 140, 70, W.krem, ["bukan persegi panjang?", "soal minta persegi", "panjang"], 8.4)),
    ),
    k(
      "Guru mengingatkan materi kelas empat: persegi juga merupakan persegi panjang. Perinciannya akan dipelajari pada Bab 7.",
      bersih(0),
      tambah(0, jud("Persegi juga persegi panjang", 22, 11)),
      tambah("persegi", kotak("mo", 50, 50, 200, 100, W.muda, W.biru, { tebal: 2 }), teks("mot", 150, 66, "persegi panjang", 9.4)),
      tambah("juga", kotak("mi", 125, 84, 50, 50, W.hijauMuda, W.hijau, { tebal: 2 }), teks("mit", 150, 113, "persegi", 9, W.hijau)),
      tambah("Bab", teks("mb", 150, 178, "rincian ciri: Bab 7", 9.4, W.ungu)),
    ),
    k(
      "Jawaban nomor 6, yaitu 18 dan 12, berarti siswa tidak memakai petak sebagai satuan, sebab kertas berpetak hanya menampung kelipatan 5. Jawaban ini perlu diapresiasi, lalu dilanjutkan dengan eksplorasi tanpa kertas berpetak.",
      bersih(0),
      tambah(0, jud("Nomor 6: 18 dan 12", 22, 11)),
      tambah("petak", garis("gl", 30, 100, 240, 0, W.biru, 2.4)),
      tambah("kelipatan", ...[10, 15, 20].map((v, i) => [garis(`gt${i}`, 40 + i * 80, 94, 0, 12, W.biru, 2), teks(`gv${i}`, 40 + i * 80, 122, `${v}`, 9.4)]).flat(), teks("gk", 150, 150, "kelipatan 5", 9, W.ungu)),
      tambah("18@1", bulat("g12", 72, 100, 4.6, W.merah, undefined), teks("g12t", 72, 86, "12", 9, W.merah), bulat("g18", 168, 100, 4.6, W.merah, undefined), teks("g18t", 168, 86, "18", 9, W.merah)),
      tambah("diapresiasi,", teks("ga", 150, 182, "dihargai, lalu lanjut tanpa petak", 8.8, W.hijau)),
    ),
    k(
      "Untuk diferensiasi, kegiatan ini dirancang mengembangkan pola berpikir kreatif. Siswa menentukan ukuran persegi panjang dari kawat 60 sentimeter, dan guru membimbing siswa yang kesulitan secara proporsional.",
      bersih(0),
      tambah(0, jud("Diferensiasi", 22)),
      tambah("kreatif.", emo("df1", 70, 100, "💡", 40), teks("df1t", 70, 126, "berpikir kreatif", 8.8)),
      tambah("kawat", emo("df2", 150, 100, "📏", 36), teks("df2t", 150, 126, "kawat 60 cm", 8.8, W.merah)),
      tambah("membimbing", emo("df3", 230, 100, "🤝", 36), teks("df3t", 230, 126, "bimbingan pas", 8.8, W.hijau)),
    ),
  ],
};

/* ------------------------------ 9. Refleksi nomor 15 sampai 18 (BS hlm. 161; Panduan Guru hlm. 235, 244, 245) ------------------------------ */
export const ADEGAN_REFLEKSI_D: AdeganStory = {
  id: "refleksi-d",
  judul: "Refleksi nomor 15 sampai 18",
  sumber: "Buku Siswa hlm. 161; Buku Panduan Guru hlm. 235 dan 245",
  latar: "#F5F3FF",
  kutipan: [
    "Aku bisa menemukan berbagai ukuran persegi panjang jika kelilingnya diketahui",
    "Berilah tanda centang",
    "Menurutmu, bangun datar apakah yang paling mudah dihitung luas daerahnya? Mengapa?",
    "Sebaliknya, bangun datar apakah yang menurut kalian paling sulit dihitung luas daerahnya?",
    "Apa usahamu agar mampu menghitung luas daerah bangun datar yang sulit tersebut dengan lebih baik?",
  ],
  ketukan: [
    k(
      "Pada tabel refleksi di buku siswa, nomor 15 untuk sub-bab D: aku bisa menemukan berbagai ukuran persegi panjang jika kelilingnya diketahui. Siswa memberi tanda centang pada kolom ya atau tidak.",
      tambah(0, jud("Refleksi nomor 15", 22)),
      tambah("nomor", kotak("rf", 15, 42, 270, 60, W.putih, W.biru, { rx: 6 }), teks("rf1", 24, 62, "15. Aku bisa menemukan berbagai ukuran", 8.2, W.biru, { anchor: "start" }), teks("rf2", 24, 76, "persegi panjang jika kelilingnya diketahui.", 8.2, W.biru, { anchor: "start" })),
      tambah("centang", kotak("rya", 60, 120, 70, 28, W.hijauMuda, W.hijau, { rx: 6 }), teks("ryt", 95, 138, "✓ Ya", 11, W.hijau), kotak("rtd", 170, 120, 70, 28, W.merahMuda, W.merah, { rx: 6 }), teks("rtt", 205, 138, "Tidak", 11, W.merah)),
    ),
    k(
      "Setelah tabel, ada tiga pertanyaan terbuka. Nomor 16: menurutmu, bangun datar apakah yang paling mudah dihitung luas daerahnya, dan mengapa?",
      bersih(0),
      tambah(0, jud("Tiga pertanyaan terbuka", 22)),
      tambah("Nomor", kartu("q16", 25, 50, 250, 54, W.hijauMuda, ["16. bangun datar apa yang", "paling mudah dihitung luasnya?"], 9)),
      tambah("mengapa?", teks("q16m", 150, 134, "Mengapa?", 12, W.ungu)),
    ),
    k(
      "Nomor 17: sebaliknya, bangun datar apakah yang paling sulit dihitung luas daerahnya? Nomor 18: apa usahamu agar mampu menghitung luas bangun yang sulit itu dengan lebih baik?",
      bersih(0),
      tambah(0, jud("Pertanyaan 17 dan 18", 22)),
      tambah("Nomor", kartu("q17", 25, 42, 250, 54, W.merahMuda, ["17. bangun datar apa yang", "paling sulit dihitung luasnya?"], 9)),
      tambah("Nomor@2", kartu("q18", 25, 108, 250, 54, W.krem, ["18. apa usahamu agar mampu", "menghitungnya lebih baik?"], 9)),
    ),
    k(
      "Nomor 1 sampai 14 sudah dipakai pada sub-bab A, B, dan C. Dengan nomor 15 sampai 18, refleksi seluruh bab selesai.",
      bersih(0),
      tambah(0, jud("Refleksi satu bab", 22)),
      tambah("Nomor", baris("rk1", 40, 50, 220, "1 sampai 14: sub-bab A, B, C", W.putih, 9.2, 26)),
      tambah("nomor@2", baris("rk2", 40, 90, 220, "15 sampai 18: sub-bab D", W.hijauMuda, 9.2, 26)),
      tambah("selesai.", teks("rk3", 150, 150, "refleksi bab 5 selesai ✓", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Soal pengayaan kolam renang (Panduan Guru hlm. 242–243) ------------------------------ */
/** Skala gambar kolam: piksel per meter. */
const SK = 9;
const KX = 78;
const KY = 62;
const luarP = KOLAM.p + KOLAM.tepi; // menurut kunci buku (16)
const luarL = KOLAM.l + KOLAM.tepi; // menurut kunci buku (7)
const gambarKolam = (): Obj[] => [
  kotak("kl", KX, KY, luarP * SK, luarL * SK, W.merahMuda, W.merah, { rx: 2, tebal: 1.8 }),
  kotak("kd", KX + 4, KY + 3, KOLAM.p * SK, KOLAM.l * SK, W.langitMuda, W.biru, { rx: 2, tebal: 1.8 }),
  teks("kdt", KX + 4 + (KOLAM.p * SK) / 2, KY + 3 + (KOLAM.l * SK) / 2 + 3, "kolam 15 x 6", 9.4),
];

export const ADEGAN_PENGAYAAN: AdeganStory = {
  id: "pengayaan-kolam",
  judul: "Soal pengayaan: keramik tepi kolam renang",
  sumber: "Buku Panduan Guru hlm. 242–243",
  latar: "#ECFEFF",
  kutipan: [
    "Pengayaan dapat diberikan kepada peserta didik yang sudah mendapatkan nilai",
    "soal-soal AKM",
    "Memasang Keramik Tepi Kolam Renang",
    "Di sekeliling kolam terdapat tepian atau jalan selebar 1 m",
    "40 cm × 40 cm",
    "Jika 1 dus berisi 5 keramik, berapa dus keramik yang dibutuhkan",
    "luas jalan = luas daerah persegi luar – luas daerah persegi dalam",
    "= (16 × 7) – (15 × 6)",
    "= 112 – 90 = 22",
    "Luas daerah 1 keramik = sisi × sisi",
    "= 40 × 40 = 1600",
    "Agar cukup, perlu dibulatkan ke atas menjadi 28 dus keramik yang harus dibeli",
  ],
  ketukan: [
    k(
      "Bagi siswa yang sudah mencapai kriteria ketuntasan, panduan guru menyediakan pengayaan berupa soal gaya asesmen kompetensi minimum. Judulnya: memasang keramik tepi kolam renang.",
      tambah(0, jud("Soal pengayaan", 24)),
      tambah("pengayaan", emo("pg1", 150, 100, "🏊", 44)),
      tambah("Judulnya:", teks("pg2", 150, 140, "Keramik Tepi Kolam Renang", 10.4, W.merah)),
    ),
    k(
      "Kolam berukuran panjang 15 meter dan lebar 6 meter. Di sekelilingnya ada tepian selebar 1 meter. Keramiknya 40 sentimeter kali 40 sentimeter, dan satu dus berisi 5 keramik.",
      bersih(0),
      tambah(0, jud("Kolam dan tepiannya", 24)),
      tambah("Kolam", gambarKolam()),
      tambah("tepian", teks("kt", 150, 140, "tepian 1 m", 8.6, W.merah), panah("kta", 150, 132, 0, -14, W.merah, 1.6)),
      tambah("Keramiknya", teks("ks1", 150, 168, "keramik 40 x 40 cm", 9.4, W.ungu)),
      tambah("dus", teks("ks2", 150, 184, "1 dus = 5 keramik", 9.4, W.ungu)),
    ),
    k(
      "Berapa dus keramik yang dibutuhkan? Langkah pertama: luas jalan sama dengan luas persegi panjang luar dikurangi luas persegi panjang dalam, yaitu kolam.",
      bersih(0),
      tambah(0, jud("Langkah 1: luas jalan", 24)),
      tambah(0, gambarKolam()),
      tambah("luas", teks("lj", 150, 150, "luas jalan = luar - dalam", 10, W.hijau)),
      ubah("dalam,", { id: "kd", warna: W.putih }),
    ),
    k(
      "Menurut kunci buku, persegi panjang luar berukuran 16 kali 7, jadi luasnya 112. Kolam 15 kali 6 luasnya 90. Selisihnya 22 meter persegi.",
      bersih(0),
      tambah(0, jud("Kunci buku: luas jalan", 22, 11)),
      tambah("luar", teks("kb1", 150, 56, "16 x 7 = 112", 11, W.merah)),
      tambah("Kolam", teks("kb2", 150, 80, "15 x 6 = 90", 11, W.biru)),
      tambah("Selisihnya", teks("kb3", 150, 106, "112 - 90 = 22", 11, W.hijau), teks("kb4", 150, 126, "luas jalan 22 m²", 10, W.hijau)),
    ),
    k(
      "Langkah kedua: luas satu keramik 40 kali 40 hasilnya 1600 sentimeter persegi, yaitu 0,16 meter persegi. Banyak keramik dari kunci buku: 22 dibagi 0,16 sama dengan 137,5 buah.",
      bersih(0),
      tambah(0, jud("Langkah 2: keramik", 22)),
      tambah("40", teks("kr1", 150, 56, "40 x 40 = 1600", 11, W.biru)),
      tambah("yaitu", teks("kr2", 150, 78, "1600 cm² jadi 0,16 m²", 10, W.ungu)),
      tambah("dibagi", teks("kr3", 150, 106, "22 : 0,16 → 137,5 keramik", 10, W.merah)),
    ),
    k(
      "Satu dus berisi 5 keramik, jadi 137,5 dibagi 5 hasilnya 27,5. Agar cukup, dibulatkan ke atas menjadi 28 dus keramik yang harus dibeli.",
      bersih(0),
      tambah(0, jud("Langkah 3: jumlah dus", 22)),
      tambah("Satu", teks("du1", 150, 60, "137,5 : 5 → 27,5 dus", 11, W.biru)),
      tambah("dibulatkan", teks("du2", 150, 96, "dibulatkan ke atas", 9.4, W.ungu), kartu("du3", 90, 112, 120, 44, W.hijauMuda, ["28 dus"], 14)),
    ),
    k(
      "Catatan untuk guru: tepian 1 meter ada di semua sisi, sehingga kiri dan kanan menambah 2 meter. Persegi panjang luar seharusnya 17 kali 8, luasnya 136, dan luas jalan 136 dikurangi 90 sama dengan 46 meter persegi.",
      bersih(0),
      tambah(0, jud("Catatan guru: periksa ukuran luar", 22, 10.4)),
      tambah("tepian", teks("ct1", 150, 54, "tepian 1 m di semua sisi", 9, W.ungu)),
      tambah("kiri", teks("ct2", 150, 76, "15 + 2 = 17", 10.4, W.merah), teks("ct3", 150, 96, "6 + 2 = 8", 10.4, W.merah)),
      tambah("17", teks("ct4", 150, 122, "17 x 8 = 136", 10.4, W.biru)),
      tambah("136@2", teks("ct5", 150, 146, "136 - 90 = 46", 10.4, W.hijau), teks("ct6", 150, 166, "luas jalan 46 m²", 10, W.hijau)),
    ),
    k(
      "Dengan luas jalan 46, keramik yang dibutuhkan 287,5 buah, dibagi 5 menjadi 57,5, dibulatkan ke atas 58 dus. Buku mencetak 28 dus; hitungan mandiri ini memberi 58.",
      bersih(0),
      tambah(0, jud("Hitungan mandiri", 22)),
      tambah("keramik", teks("hm1", 150, 56, "46 : 0,16 → 287,5 keramik", 10, W.biru)),
      tambah("dibagi", teks("hm2", 150, 80, "287,5 : 5 → 57,5 dus", 10, W.biru)),
      tambah("dibulatkan", kartu("hm3", 40, 100, 100, 44, W.hijauMuda, ["58 dus", "hitungan mandiri"], 10)),
      tambah("Buku", kartu("hm4", 160, 100, 100, 44, W.krem, ["28 dus", "kunci buku"], 10)),
    ),
  ],
};

/* ------------------------------ 11. Remedial, orang tua, dan penutup (Panduan Guru hlm. 242 dan 245) ------------------------------ */
export const ADEGAN_PENUTUP_D: AdeganStory = {
  id: "penutup-d",
  judul: "Remedial, peran orang tua, dan penutup bab",
  sumber: "Buku Panduan Guru hlm. 242 dan 245",
  latar: "#F0F9FF",
  kutipan: [
    "Remedial diberikan jika peserta didik belum mencapai kriteria minimum",
    "Bimbingan individu",
    "Bimbingan kelompok",
    "Pembelajaran ulang dengan menggunakan metode dan media yang berbeda",
    "tingkat kesulitan soal dapat diturunkan",
    "orang tua dapat dilibatkan untuk memantau peserta didik mempelajari kembali materi",
    "alat tulis, kertas berpetak, dan kertas origami",
  ],
  ketukan: [
    k(
      "Remedial diberikan jika siswa belum mencapai kriteria minimum. Bentuknya tiga: bimbingan individu, bimbingan kelompok, dan pembelajaran ulang dengan metode dan media yang berbeda.",
      tambah(0, jud("Panduan remedial", 22)),
      tambah("individu,", baris("rm1", 30, 42, 240, "1. bimbingan individu", W.krem, 9.2, 26)),
      tambah("kelompok,", baris("rm2", 30, 78, 240, "2. bimbingan kelompok", W.muda, 9.2, 26)),
      tambah("pembelajaran", baris("rm3", 30, 114, 240, "3. belajar ulang, metode dan media lain", W.hijauMuda, 9.2, 26)),
    ),
    k(
      "Bimbingan individu untuk kesulitan yang berbeda-beda, bimbingan kelompok untuk kesulitan yang sama. Jika semua kesulitan, ajarkan ulang dan tes ulang dengan soal yang tingkat kesulitannya diturunkan.",
      ubah("individu", { id: "rm1-k", warna: W.merahMuda }),
      ubah("kelompok", { id: "rm2-k", warna: W.merahMuda }),
      ubah("tes", { id: "rm3-k", warna: W.merahMuda }),
      tambah("diturunkan.", teks("rm4", 150, 168, "soal tes ulang: lebih mudah", 9.2, W.merah)),
    ),
    k(
      "Orang tua juga berperan. Mereka bisa memantau anak mempelajari kembali luas daerah bangun datar di rumah, dan menyiapkan alat tulis, kertas berpetak, serta kertas origami.",
      bersih(0),
      tambah(0, jud("Peran orang tua", 22)),
      tambah("Orang", emo("ot1", 55, 90, "👪", 36), teks("ot1t", 55, 116, "pantau di rumah", 8.4)),
      tambah("alat", emo("ot2", 150, 90, "✏️", 32), teks("ot2t", 150, 116, "alat tulis", 8.4)),
      tambah("kertas", emo("ot3", 245, 90, "📄", 32), teks("ot3t", 245, 116, "kertas berpetak", 8.4)),
      tambah("origami.", teks("ot4", 150, 150, "dan kertas origami", 9.4, W.ungu)),
    ),
    k(
      "Dengan ini Bab 5 hampir selesai. Soal Uji Kompetensi tentang bangun gabungan dan rubriknya dibahas pada video Sub-Bab C.",
      bersih(0),
      tambah(0, jud("Penutup Bab 5", 22)),
      tambah("Bab", kartu("pt1", 30, 46, 240, 44, W.hijauMuda, ["Bab 5 hampir selesai"], 10.4)),
      tambah("Soal", kartu("pt2", 30, 104, 240, 44, W.krem, ["Uji Kompetensi: lihat video Sub-Bab C"], 9)),
    ),
    k(
      "Ingat pelajaran utama sub-bab ini: keliling yang sama bisa menghasilkan luas yang berbeda, dan bentuk yang paling mendekati persegi memberi luas terbesar. Selamat belajar!",
      bersih(0),
      tambah(0, jud("Pelajaran utama", 22)),
      tambah("keliling", baris("pu1", 25, 44, 250, "keliling sama, luas bisa berbeda", W.putih, 9.2, 28)),
      tambah("bentuk", baris("pu2", 25, 88, 250, "paling mendekati persegi, luas terbesar", W.hijauMuda, 9.2, 28)),
      tambah("Selamat", emo("pu3", 150, 160, "🎉", 34)),
    ),
  ],
};
