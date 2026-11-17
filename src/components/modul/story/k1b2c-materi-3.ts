import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, label, orang, teks } from "./k1b2c-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b2c-bantu";

/* Akhir "Pesanan Tetangga" dan akhir cerita Kebun Sayur Mamah Bab 2: semua pesanan terkirim, pesta panen, lalu penutup. Tanpa latihan. */

/* ------------------------------ 6. Pesta panen ------------------------------ */
const SUARA_H1 = "Semua pesanan terkirim tepat: tujuh tomat, tujuh timun, dan sepuluh sayur untuk Nenek. Tidak ada yang salah hitung.";
const SUARA_H2 = "Sore harinya ada pesta panen kecil di kebun. Tetangga dan Nenek datang membawa senyum.";
const SUARA_H3 = "Mamah berkata, kebun kita berhasil karena kita menjumlah dengan teliti, dari bibit sampai panen.";

export const ADEGAN_PESTA: AdeganStory = {
  id: "pesta-panen",
  judul: "Pesta panen",
  sumber: "Materi: hasil, semua pesanan terkirim",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Semua terkirim")),
      tambah("tomat,", ...label("p1", 20, 50, 120, "7 tomat", W.pink, 10), emo("e1", 170, 66, E.tomat, 22)),
      tambah("timun,", ...label("p2", 20, 84, 120, "7 timun", W.hijauMuda, 10), emo("e2", 170, 100, E.timun, 22)),
      tambah("Nenek.", ...label("p3", 20, 118, 120, "10 sayur", W.emas, 10), emo("e3", 170, 134, E.keranjang, 22)),
      tambah("hitung.", emo("ok", 240, 100, E.benar, 34)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Pesta panen")),
      tambah("pesta", emo("b1", 40, 60, E.balon, 28), emo("b2", 260, 60, E.balon, 28), emo("kf", 150, 64, E.konfeti, 30)),
      tambah("Tetangga", emo("rm", 60, 140, E.rumah, 30)),
      tambah("Nenek", ...orang("nn", 150, 140, E.nenek, "Nenek")),
      tambah("senyum.", emo("sm", 240, 140, E.senyum, 30)),
    ),
    k(SUARA_H3, tambah("Mamah", ...orang("mm", 150, 110, E.mamah, "Mamah")), sorotkan("teliti,", "mm"), tambah("bibit", emo("bb", 60, 176, E.bibit, 24)), tambah("panen.", emo("kj", 240, 176, E.keranjang, 24), teks("pa", 150, 180, "dari bibit sampai panen", 9.6, W.hijau))),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Ingat langkah soal cerita: baca, cari dua bilangan, pilih tanda tambah, tulis kalimat, lalu jawab lengkap.";
const SUARA_Z2 = "Jangan lupa memeriksa jawaban, misalnya dengan tukar tempat atau hitung maju.";
const SUARA_Z3 = "Terima kasih, Igil, Kaka, Abang, dan Mamah. Cerita Kebun Sayur Mamah selesai. Sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: Kebun Sayur Mamah selesai",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ingat, ya!")),
      tambah("baca,", ...kartu("p1", 14, 32, 272, 26, W.hijauMuda, ["1. baca ceritanya"], 9.6)),
      tambah("cari", ...kartu("p2", 14, 62, 272, 26, W.langit, ["2. cari dua bilangan"], 9.6)),
      tambah("pilih", ...kartu("p3", 14, 92, 272, 26, W.emas, ["3. pilih tanda +"], 9.6)),
      tambah("tulis", ...kartu("p4", 14, 122, 272, 26, W.pink, ["4. tulis kalimat penjumlahan"], 9.6)),
      tambah("jawab", ...kartu("p5", 14, 152, 272, 26, W.lavender, ["5. jawab dengan kalimat lengkap"], 9.6)),
    ),
    k(SUARA_Z2, bersih(0), tambah(0, judul("6. Periksa")), tambah("tukar", ...kartu("q1", 14, 50, 272, 34, W.hijauMuda, ["tukar tempat: 2 + 5 = 5 + 2"], 10)), tambah("maju.", ...kartu("q2", 14, 96, 272, 34, W.langit, ["hitung maju: 6, lalu 7, 8, 9, 10"], 10)), tambah("jawaban,", emo("kc", 150, 168, E.kaca, 30))),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Terima kasih!"), emo("ht", 150, 66, E.hati, 30)),
      tambah("Igil,", ...orang("ig", 45, 130, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 130, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 130, E.abang, "Abang")),
      tambah("Mamah.", ...orang("mm", 255, 130, E.mamah, "Mamah")),
      tambah("selesai.", emo("s1", 90, 186, E.bibit, 24), emo("s2", 150, 186, E.keranjang, 24), emo("s3", 210, 186, E.konfeti, 24)),
    ),
  ],
};
