import type { AdeganStory, Obj } from "./logika-story";
import { KOLAM, W, baris, bulat, emo, garis, kartu, kotak, panah, teks } from "./k5b5d-gambar";
import { bersih, k, tambah, ubah } from "./k5b5d-bantu";
import { kutipanLokal } from "./kutipan-lokal";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/* ------------------------------ 8. Pesan guru: hati-hati dan tantangan ------------------------------ */
export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi-d",
  judul: "Hati-hati, tantangan, dan renungan",
  sumber: "Materi: pesan guru tentang bentuk kerangka",
  latar: "#FFF1F2",
  kutipan: kutipanLokal("k5b5d-materi-3.ts:1"),
  ketukan: [
    k(
      "Hati-hati, ada dua jawaban yang perlu kamu pahami baik-baik, yaitu bentuk kelima dan bentuk keenam. Keduanya sering memancing salah paham.",
      tambah(0, jud("Hati-hati: dua jawaban", 22, 11)),
      tambah("kelima", kartu("mk1", 25, 50, 110, 64, W.hijauMuda, ["Bentuk 5", "15 x 15"], 10)),
      tambah("keenam", kartu("mk2", 165, 50, 110, 64, W.krem, ["Bentuk 6", "18 x 12"], 10)),
      tambah("salah", teks("mk3", 150, 160, "sering memancing salah paham", 9.4, W.merah)),
    ),
    k(
      "Bentuk kelima berarti persegi. Mungkin ada yang bertanya, bukankah soalnya meminta persegi panjang, bukan persegi?",
      bersih(0),
      tambah(0, jud("Bentuk 5: persegi", 22, 11)),
      tambah("persegi.", kotak("ms", 60, 70, 56, 56, W.hijauMuda, W.hijau, { tebal: 2.4 }), teks("mst", 88, 102, "persegi", 9.4, W.hijau)),
      tambah("bertanya,", kartu("mq", 140, 60, 140, 70, W.krem, ["bukan persegi panjang?", "soal minta persegi", "panjang"], 8.4)),
    ),
    k(
      "Ingat pelajaran kelas empat: persegi juga merupakan persegi panjang. Ciri-cirinya akan kita pelajari lebih rinci nanti.",
      bersih(0),
      tambah(0, jud("Persegi juga persegi panjang", 22, 11)),
      tambah("persegi", kotak("mo", 50, 50, 200, 100, W.muda, W.biru, { tebal: 2 }), teks("mot", 150, 66, "persegi panjang", 9.4)),
      tambah("juga", kotak("mi", 125, 84, 50, 50, W.hijauMuda, W.hijau, { tebal: 2 }), teks("mit", 150, 113, "persegi", 9, W.hijau)),
      tambah("rinci", teks("mb", 150, 178, "rinciannya dipelajari nanti", 9.4, W.ungu)),
    ),
    k(
      "Jawaban bentuk keenam, yaitu delapan belas dan dua belas, berarti kamu tidak memakai petak sebagai satuan, sebab kertas berpetak hanya menampung kelipatan lima. Jawaban itu patut dihargai, lalu lanjutkan dengan mencoba tanpa kertas berpetak.",
      bersih(0),
      tambah(0, jud("Bentuk 6: 18 dan 12", 22, 11)),
      tambah("petak", garis("gl", 30, 100, 240, 0, W.biru, 2.4)),
      tambah("kelipatan", ...[10, 15, 20].map((v, i) => [garis(`gt${i}`, 40 + i * 80, 94, 0, 12, W.biru, 2), teks(`gv${i}`, 40 + i * 80, 122, `${v}`, 9.4)]).flat(), teks("gk", 150, 150, "kelipatan 5", 9, W.ungu)),
      tambah("delapan", bulat("g12", 72, 100, 4.6, W.merah, undefined), teks("g12t", 72, 86, "12", 9, W.merah), bulat("g18", 168, 100, 4.6, W.merah, undefined), teks("g18t", 168, 86, "18", 9, W.merah)),
      tambah("dihargai,", teks("ga", 150, 182, "dihargai, lalu lanjut tanpa petak", 8.8, W.hijau)),
    ),
    k(
      "Tantangan untukmu: dengan kawat enam puluh sentimeter, carilah ukuran persegi panjang lain yang kamu suka. Berpikirlah kreatif, dan mintalah bimbingan guru bila kesulitan.",
      bersih(0),
      tambah(0, jud("Tantangan", 22)),
      tambah("kawat", emo("df2", 150, 100, "📏", 36), teks("df2t", 150, 126, "kawat 60 cm", 8.8, W.merah)),
      tambah("kreatif,", emo("df1", 70, 100, "💡", 40), teks("df1t", 70, 126, "berpikir kreatif", 8.8)),
      tambah("bimbingan", emo("df3", 230, 100, "🤝", 36), teks("df3t", 230, 126, "bimbingan pas", 8.8, W.hijau)),
    ),
  ],
};

/* ------------------------------ 9. Renungan untuk siswa ------------------------------ */
export const ADEGAN_REFLEKSI_D: AdeganStory = {
  id: "refleksi-d",
  judul: "Renungan tentang kerangka dan luas",
  sumber: "Materi: renungan dan pertanyaan terbuka",
  latar: "#F5F3FF",
  kutipan: kutipanLokal("k5b5d-materi-3.ts:2"),
  ketukan: [
    k(
      "Renungan untukmu. Apakah kamu bisa menemukan berbagai ukuran persegi panjang jika kelilingnya sudah diketahui? Coba jawab dalam hati.",
      tambah(0, jud("Renungan", 22)),
      tambah("Apakah", kotak("rf", 15, 42, 270, 60, W.putih, W.biru, { rx: 6 }), teks("rf1", 24, 62, "Aku bisa menemukan berbagai ukuran", 8.4, W.biru, { anchor: "start" }), teks("rf2", 24, 76, "persegi panjang jika kelilingnya diketahui.", 8.4, W.biru, { anchor: "start" })),
      tambah("jawab", emo("rfe", 150, 140, "🤔", 34)),
    ),
    k(
      "Pertanyaan pertama: menurutmu, bangun datar apakah yang paling mudah dihitung luas daerahnya, dan mengapa?",
      bersih(0),
      tambah(0, jud("Pertanyaan pertama", 22)),
      tambah("menurutmu", kartu("q16", 25, 50, 250, 54, W.hijauMuda, ["bangun datar apa yang", "paling mudah dihitung luasnya?"], 9)),
      tambah("mengapa?", teks("q16m", 150, 134, "Mengapa?", 12, W.ungu)),
    ),
    k(
      "Pertanyaan kedua: sebaliknya, bangun datar apakah yang paling sulit dihitung luas daerahnya? Pertanyaan ketiga: apa usahamu agar mampu menghitung luas bangun yang sulit itu dengan lebih baik?",
      bersih(0),
      tambah(0, jud("Dua pertanyaan lagi", 22)),
      tambah("sebaliknya,", kartu("q17", 25, 42, 250, 54, W.merahMuda, ["bangun datar apa yang", "paling sulit dihitung luasnya?"], 9)),
      tambah("usahamu", kartu("q18", 25, 108, 250, 54, W.krem, ["apa usahamu agar mampu", "menghitungnya lebih baik?"], 9)),
    ),
    k(
      "Bicarakan jawabanmu bersama teman. Ceritakan alasanmu, dengarkan pendapat temanmu, dan teruslah berlatih supaya makin mahir.",
      bersih(0),
      tambah(0, jud("Bicarakan bersama", 22)),
      tambah("Ceritakan", baris("rk1", 40, 44, 220, "ceritakan alasanmu", W.putih, 9.2, 26)),
      tambah("dengarkan", baris("rk2", 40, 84, 220, "dengarkan pendapat temanmu", W.hijauMuda, 9.2, 26)),
      tambah("teruslah", teks("rk3", 150, 150, "teruslah berlatih ✓", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Tantangan: keramik tepi kolam renang ------------------------------ */
/** Skala gambar kolam: piksel per meter. */
const SK = 9;
const KX = 78;
const KY = 62;
const luarP = KOLAM.p + 2 * KOLAM.tepi; // tepian di semua sisi: 17
const luarL = KOLAM.l + 2 * KOLAM.tepi; // 8
const gambarKolam = (): Obj[] => [
  kotak("kl", KX, KY, luarP * SK, luarL * SK, W.merahMuda, W.merah, { rx: 2, tebal: 1.8 }),
  kotak("kd", KX + KOLAM.tepi * SK, KY + KOLAM.tepi * SK, KOLAM.p * SK, KOLAM.l * SK, W.langitMuda, W.biru, { rx: 2, tebal: 1.8 }),
  teks("kdt", KX + KOLAM.tepi * SK + (KOLAM.p * SK) / 2, KY + KOLAM.tepi * SK + (KOLAM.l * SK) / 2 + 3, "kolam 15 x 6", 9.4),
];

export const ADEGAN_PENGAYAAN: AdeganStory = {
  id: "pengayaan-kolam",
  judul: "Tantangan: keramik tepi kolam renang",
  sumber: "Materi: tantangan keramik tepi kolam",
  latar: "#ECFEFF",
  kutipan: kutipanLokal("k5b5d-materi-3.ts:3"),
  ketukan: [
    k(
      "Sekarang Tantangan untukmu, soal bergaya asesmen kompetensi minimum. Judulnya: memasang keramik tepi kolam renang.",
      tambah(0, jud("Tantangan", 24)),
      tambah("Tantangan", emo("pg1", 150, 100, "🏊", 44)),
      tambah("Judulnya:", teks("pg2", 150, 140, "Keramik Tepi Kolam Renang", 10.4, W.merah)),
    ),
    k(
      "Kolam berukuran panjang lima belas meter dan lebar enam meter. Di sekelilingnya ada tepian selebar satu meter. Keramiknya empat puluh sentimeter kali empat puluh sentimeter, dan satu dus berisi lima keramik.",
      bersih(0),
      tambah(0, jud("Kolam dan tepiannya", 24)),
      tambah("Kolam", gambarKolam()),
      tambah("tepian", teks("kt", 150, 150, "tepian 1 m", 8.6, W.merah), panah("kta", 150, 143, 0, -15, W.merah, 1.6)),
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
      "Perhatikan, tepiannya ada di semua sisi, jadi kiri dan kanan menambah dua meter. Panjang luar lima belas ditambah dua sama dengan tujuh belas, dan lebar luar enam ditambah dua sama dengan delapan.",
      bersih(0),
      tambah(0, jud("Tepian di semua sisi", 22, 11)),
      tambah("semua", teks("ct1", 150, 54, "tepian 1 m di semua sisi", 9, W.ungu)),
      tambah("lima", teks("ct2", 150, 82, "15 + 2 = 17", 11, W.merah)),
      tambah("enam", teks("ct3", 150, 108, "6 + 2 = 8", 11, W.merah)),
    ),
    k(
      "Jadi persegi panjang luar berukuran tujuh belas kali delapan, luasnya seratus tiga puluh enam. Kolam lima belas kali enam luasnya sembilan puluh. Selisihnya empat puluh enam meter persegi.",
      bersih(0),
      tambah(0, jud("Luas jalan", 22)),
      tambah("tujuh", teks("kb1", 150, 56, "17 x 8 = 136", 11, W.merah)),
      tambah("Kolam", teks("kb2", 150, 80, "15 x 6 = 90", 11, W.biru)),
      tambah("Selisihnya", teks("kb3", 150, 106, "136 - 90 = 46", 11, W.hijau), teks("kb4", 150, 126, "luas jalan 46 m²", 10, W.hijau)),
    ),
    k(
      "Langkah kedua: luas satu keramik empat puluh kali empat puluh hasilnya seribu enam ratus sentimeter persegi, yaitu nol koma enam belas meter persegi.",
      bersih(0),
      tambah(0, jud("Langkah 2: luas keramik", 22)),
      tambah("empat", teks("kr1", 150, 62, "40 x 40 = 1600", 11, W.biru)),
      tambah("yaitu", teks("kr2", 150, 90, "1600 cm² jadi 0,16 m²", 10, W.ungu)),
    ),
    k(
      "Banyak keramik sama dengan luas jalan dibagi luas satu keramik, yaitu empat puluh enam dibagi nol koma enam belas, hasilnya dua ratus delapan puluh tujuh koma lima buah.",
      bersih(0),
      tambah(0, jud("Langkah 3: banyak keramik", 22)),
      tambah("dibagi", teks("kr0", 150, 60, "luas jalan : luas keramik", 10, W.ungu)),
      tambah("hasilnya", teks("kr3", 150, 94, "46 : 0,16 → 287,5 keramik", 10, W.merah)),
    ),
    k(
      "Satu dus berisi lima keramik, jadi dua ratus delapan puluh tujuh koma lima dibagi lima hasilnya lima puluh tujuh koma lima. Agar cukup, dibulatkan ke atas menjadi lima puluh delapan dus keramik yang harus dibeli.",
      bersih(0),
      tambah(0, jud("Langkah 4: jumlah dus", 22)),
      tambah("hasilnya", teks("du1", 150, 60, "287,5 : 5 → 57,5 dus", 11, W.biru)),
      tambah("dibulatkan", teks("du2", 150, 96, "dibulatkan ke atas", 9.4, W.ungu), kartu("du3", 90, 112, 120, 44, W.hijauMuda, ["58 dus"], 14)),
    ),
  ],
};

/* ------------------------------ 11. Remedial, orang tua, dan penutup (Panduan Guru hlm. 242 dan 245) ------------------------------ */
export const ADEGAN_PENUTUP_D: AdeganStory = {
  id: "penutup-d",
  judul: "Remedial, peran orang tua, dan penutup bab",
  sumber: "Buku Panduan Guru hlm. 242 dan 245",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k5b5d-materi-3.ts:4"),
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
