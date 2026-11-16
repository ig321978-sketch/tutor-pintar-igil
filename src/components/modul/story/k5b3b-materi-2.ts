import type { AdeganStory } from "./logika-story";
import { W, batang, emo, judul, kartu, lingkaran, penghapus, teks } from "./k5b3b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b3b-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 4. Eksplorasi 3.2A: martabak delapan rasa (Buku Siswa hlm. 76 sampai 78) ------------------------------ */
// Urutan rasa di buku: cokelat, tiramisu, keju, teh hijau, oreo, karamel, nanas, stroberi. Halim menerima karamel dan stroberi, Kira menerima nanas.
export const ADEGAN_MARTABAK: AdeganStory = {
  id: "eks-a-martabak",
  judul: "Martabak delapan rasa",
  sumber: "Materi: martabak delapan rasa",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k5b3b-materi-2.ts:1"),
  ketukan: [
    k(
      "Kegiatan pertama, martabak. Upe punya martabak delapan rasa yang sama besar: cokelat, tiramisu, keju, teh hijau, oreo, karamel, nanas, dan stroberi.",
      tambah(0, judul("Martabak delapan rasa")),
      tambah("Upe", ...lingkaran("mt", 105, 108, 56, 8, [])),
      tambah("delapan", teks("d8", 215, 90, "8 bagian", 13, W.merah), teks("d9", 215, 110, "sama besar", 10, W.hitam)),
      tambah("cokelat,", emo("mk", 215, 150, "🥞", 26)),
    ),
    k(
      "Upe memberi Halim dua bagian, yaitu rasa karamel dan stroberi. Upe memberi Kira satu bagian, yaitu rasa nanas. Perhatikan warna tiap bagian pada gambar martabak.",
      hapus(0, "d8", "d9", "mk"),
      ubah("Halim", { id: "mt-5", warna: W.merahPita }, { id: "mt-7", warna: W.merahPita }),
      tambah("Halim", teks("kk", 215, 90, "Halim: 2", 11, W.merah), teks("kk2", 215, 104, "karamel, stroberi", 8.6, W.hitam)),
      ubah("Kira", { id: "mt-6", warna: W.jingga }),
      tambah("Kira", teks("ll", 215, 128, "Kira: 1", 11, W.coklat), teks("ll2", 215, 142, "nanas", 8.6, W.hitam)),
      ubah("Perhatikan", { id: "kk", warna: W.merah }),
    ),
    k(
      "Pertanyaannya, berapa jumlah bagian yang Upe berikan kepada teman-temannya? Kira mendapat satu bagian dari delapan bagian martabak, ditulis satu per delapan.",
      bersih(0),
      tambah(0, judul("Bagian Kira")),
      tambah("Pertanyaannya,", ...lingkaran("mt", 105, 108, 56, 8, [[6, 7, W.jingga]])),
      tambah("Kira", teks("l1", 215, 92, "1 dari 8 bagian", 10, W.hitam)),
      tambah("ditulis", teks("l2", 215, 126, "1/8", 26, W.coklat)),
    ),
    k(
      "Halim mendapat dua bagian dari delapan bagian martabak, ditulis dua per delapan. Jumlah yang diberikan Upe: satu bagian dan dua bagian, sehingga ditulis tiga per delapan.",
      bersih(0),
      tambah(0, judul("Bagian Halim dan jumlahnya")),
      tambah("Halim", ...lingkaran("mt", 80, 108, 50, 8, [[5, 6, W.merahPita], [6, 7, W.jingga], [7, 8, W.merahPita]])),
      tambah("dua", teks("k1", 200, 84, "Halim: 2/8", 11, W.merah)),
      tambah("Jumlah", teks("k2", 200, 106, "Kira: 1/8", 11, W.coklat)),
      tambah("sehingga", teks("k3", 200, 140, "1/8 + 2/8 = 3/8", 12, W.hijau)),
    ),
    k(
      "Sekarang kita tunjukkan hal itu dengan arsiran. Martabak Kira terarsir satu irisan, martabak Halim dua irisan, dan martabak keduanya tiga irisan.",
      bersih(0),
      tambah(0, judul("Arsiran: satu tambah dua")),
      tambah("Kira", ...lingkaran("ma", 45, 100, 36, 8, [[0, 1, W.jingga]]), teks("ta", 45, 150, "1/8", 12, W.hitam)),
      tambah("Halim", teks("pa", 96, 104, "+", 16, W.merah), ...lingkaran("mb", 150, 100, 36, 8, [[0, 2, W.merahPita]]), teks("tb", 150, 150, "2/8", 12, W.hitam)),
      tambah("keduanya", teks("sa", 202, 104, "=", 16, W.merah), ...lingkaran("mc", 255, 100, 36, 8, [[0, 1, W.jingga], [1, 3, W.merahPita]]), teks("tc", 255, 150, "3/8", 12, W.hitam)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 3.2B: penghapus dan kesimpulan (Buku Siswa hlm. 78 sampai 80) ------------------------------ */
const ASEP = W.langit;
const YOH = W.pink;

export const ADEGAN_PENGHAPUS: AdeganStory = {
  id: "eks-b-penghapus",
  judul: "Sepuluh penghapus dan kesimpulan",
  sumber: "Materi: sepuluh penghapus",
  latar: "#F5F3FF",
  kutipan: kutipanLokal("k5b3b-materi-2.ts:2"),
  ketukan: [
    k(
      "Kegiatan kedua, penghapus. Kira punya sepuluh penghapus. Karena merasa punya banyak, ia memberikan dua buah kepada Wei dan tiga buah kepada Igil.",
      tambah(0, judul("Sepuluh penghapus")),
      tambah("sepuluh", ...penghapus("ph", 66, 54, [])),
      tambah("sepuluh", teks("t10", 150, 112, "10 penghapus", 11, W.hitam)),
      tambah("Wei", ...penghapus("ph", 66, 54, [[0, 2, ASEP]])),
      tambah("Igil", ...penghapus("ph", 66, 54, [[0, 2, ASEP], [2, 5, YOH]])),
    ),
    k(
      "Berapa pecahan penghapus yang diterima Wei? Dua buah dari sepuluh buah keseluruhan, ditulis dua per sepuluh. Igil mendapat tiga buah dari sepuluh buah, ditulis tiga per sepuluh.",
      bersih(0),
      tambah(0, judul("Pecahan tiap anak")),
      tambah(0, ...penghapus("ph", 66, 40, [[0, 2, ASEP], [2, 5, YOH]])),
      tambah("Wei?", ...kartu("as", 30, 100, 110, 44, ASEP, ["Wei", "2 dari 10"], 9.4)),
      tambah("dua@2", teks("as2", 85, 164, "2/10", 16, W.biru)),
      tambah("Igil", ...kartu("yo", 160, 100, 110, 44, YOH, ["Igil", "3 dari 10"], 9.4)),
      tambah("tiga@2", teks("yo2", 215, 164, "3/10", 16, W.biru)),
    ),
    k(
      "Jumlah penghapus untuk Wei dan Igil adalah dua ditambah tiga, yaitu lima buah dari sepuluh buah keseluruhan, ditulis lima per sepuluh.",
      bersih(0),
      tambah(0, judul("Jumlah untuk keduanya")),
      tambah(0, ...penghapus("ph", 66, 40, [[0, 5, W.hijauPita]])),
      tambah("dua", teks("j1", 150, 108, "2 + 3 = 5 buah dari 10 buah", 11, W.hitam)),
      tambah("ditulis", teks("j2", 150, 142, "2/10 + 3/10 = 5/10", 17, W.hijau)),
    ),
    k(
      "Sekarang kita arsir modelnya: penghapus Wei, penghapus Igil, lalu penghapus Wei dan Igil. Dua terarsir, ditambah tiga terarsir, sama dengan lima terarsir.",
      bersih(0),
      tambah(0, judul("Arsiran model penghapus")),
      tambah("Wei,", ...penghapus("ma", 12, 62, [[0, 2, ASEP]], 9, 7, 12), teks("ma-t", 42, 106, "2/10", 11, W.hitam)),
      tambah("Igil,", teks("mp", 82, 82, "+", 14, W.merah), ...penghapus("mb", 100, 62, [[0, 3, YOH]], 9, 7, 12), teks("mb-t", 130, 106, "3/10", 11, W.hitam)),
      tambah("lima", teks("ms", 178, 82, "=", 14, W.merah), ...penghapus("mc", 196, 62, [[0, 2, ASEP], [2, 5, YOH]], 9, 7, 12), teks("mc-t", 226, 106, "5/10", 11, W.hitam)),
    ),
    k(
      "Mari menyimpulkan. Jika ada dua pecahan berpenyebut sama, maka dapat dijumlahkan dengan cara menjumlahkan pembilangnya, sedangkan penyebutnya tetap. Itulah kesimpulan kita.",
      bersih(0),
      tambah(0, judul("Menyimpulkan")),
      tambah("menjumlahkan", ...kartu("s1", 22, 46, 256, 40, W.hijauMuda, ["jumlahkan pembilangnya"], 10.5)),
      tambah("penyebutnya", ...kartu("s2", 22, 98, 256, 40, W.krem, ["penyebutnya tetap"], 10.5)),
      tambah("Itulah", teks("s3", 150, 168, "2/10 + 3/10 = 5/10", 13, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 3.2C: pita Igil, Cara Kira (Buku Siswa hlm. 80 dan 81) ------------------------------ */
export const ADEGAN_PITA_LUKAS: AdeganStory = {
  id: "eks-c-lukas",
  judul: "Masalah Igil: Cara Kira",
  sumber: "Materi: pita Igil, Cara Kira",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b3b-materi-2.ts:3"),
  ketukan: [
    k(
      "Kegiatan ketiga, Masalah Igil. Igil punya pita merah sepanjang dua satu per lima meter, dan pita hijau sepanjang tiga satu per lima meter. Kalau kedua pita digabungkan, berapa panjangnya?",
      tambah(0, judul("Masalah Igil")),
      tambah("merah", ...kartu("pm", 20, 44, 120, 40, W.merahPita, ["pita merah", "2 1/5 m"], 10)),
      tambah("hijau", ...kartu("ph", 160, 44, 120, 40, W.hijauPita, ["pita hijau", "3 1/5 m"], 10)),
      tambah("digabungkan,", teks("pl", 150, 70, "+", 18, W.biru), teks("pq", 150, 130, "panjang gabungan = ?", 13, W.merah)),
    ),
    k(
      "Soalnya: berapakah dua satu per lima ditambah tiga satu per lima? Keduanya pecahan campuran, yaitu bilangan bulat yang digabung dengan pecahan.",
      bersih(0),
      tambah(0, judul("Pecahan campuran")),
      tambah("berapakah", teks("sq", 150, 70, "2 1/5 + 3 1/5 = ?", 18, W.hitam)),
      tambah("Keduanya", ...kartu("bl", 30, 96, 110, 34, W.krem, ["bilangan bulat", "2 dan 3"], 8.8), ...kartu("pc", 160, 96, 110, 34, W.langit, ["pecahan", "1/5 dan 1/5"], 8.8)),
    ),
    k(
      "Cara Kira. Langkah satu, ubah pecahan campuran menjadi pecahan biasa. Dua satu per lima sama dengan dua kali lima ditambah satu, per lima, yaitu sebelas per lima.",
      bersih(0),
      tambah(0, judul("Cara Kira: langkah 1")),
      tambah("Langkah", ...kartu("l1", 30, 40, 240, 28, W.krem, ["ubah ke pecahan biasa"], 9.4)),
      tambah("Dua", teks("c1", 150, 104, "2 1/5 = (2 × 5 + 1)/5 = 11/5", 14, W.hitam)),
    ),
    k(
      "Tiga satu per lima sama dengan tiga kali lima ditambah satu, per lima, yaitu enam belas per lima.",
      tambah("Tiga", teks("c2", 150, 142, "3 1/5 = (3 × 5 + 1)/5 = 16/5", 14, W.hitam)),
    ),
    k(
      "Langkah dua, jumlahkan pecahan biasa itu. Sebelas per lima ditambah enam belas per lima sama dengan dua puluh tujuh per lima. Penyebutnya sama, jadi hanya pembilangnya yang dijumlahkan.",
      bersih(0),
      tambah(0, judul("Cara Kira: langkah 2")),
      tambah("Langkah", ...kartu("l2", 30, 40, 240, 28, W.krem, ["jumlahkan pecahan biasa"], 9.4)),
      tambah("Sebelas", teks("c3", 150, 112, "11/5 + 16/5 = 27/5", 17, W.hitam)),
      tambah("pembilangnya", teks("c4", 150, 146, "11 + 16 = 27", 11, W.hijau)),
    ),
    k(
      "Langkah tiga, sederhanakan hasilnya. Dua puluh tujuh per lima sama dengan lima dan dua per lima. Jadi panjang seluruh pita Igil adalah lima dua per lima meter.",
      bersih(0),
      tambah(0, judul("Cara Kira: langkah 3")),
      tambah("Langkah", ...kartu("l3", 30, 40, 240, 28, W.krem, ["sederhanakan hasilnya"], 9.4)),
      tambah("Dua@2", teks("c5", 150, 108, "27/5 = 5 2/5", 18, W.hitam)),
      tambah("Jadi", ...kartu("hs", 50, 128, 200, 40, W.hijauMuda, ["pita Igil: 5 2/5 m"], 11)),
    ),
  ],
};

/* ------------------------------ 7. Cara Halim dan Ayo Menyimak (Buku Siswa hlm. 82 sampai 84) ------------------------------ */
const PITA_X = 22;
const PITA_W = 110;

export const ADEGAN_PITA_KOMANG: AdeganStory = {
  id: "eks-c-komang",
  judul: "Cara Halim dan model pita",
  sumber: "Materi: pita Igil, Cara Halim",
  latar: "#ECFDF5",
  kutipan: kutipanLokal("k5b3b-materi-2.ts:4"),
  ketukan: [
    k(
      "Cara Halim. Pisahkan dulu bilangan bulat dan pecahannya. Langkah satu, jumlahkan bilangan bulat dengan bilangan bulat: dua tambah tiga sama dengan lima.",
      tambah(0, judul("Cara Halim: langkah 1")),
      tambah("Pisahkan", teks("p1", 150, 66, "2 1/5 + 3 1/5", 16, W.hitam)),
      tambah("bulat@2", ...kartu("b1", 40, 84, 100, 32, W.krem, ["bilangan bulat"], 9.4)),
      tambah("tambah", teks("b2", 90, 140, "2 + 3 = 5", 15, W.hijau)),
    ),
    k(
      "Langkah dua, jumlahkan pecahan dengan pecahan: satu per lima ditambah satu per lima sama dengan dua per lima.",
      tambah("Langkah", ...kartu("b3", 160, 84, 100, 32, W.langit, ["pecahan"], 9.4)),
      tambah("satu", teks("b4", 210, 140, "1/5 + 1/5 = 2/5", 15, W.hijau)),
    ),
    k(
      "Langkah tiga, gabungkan hasil keduanya: lima dan dua per lima. Jadi panjang pita Igil lima dua per lima meter, sama dengan Cara Kira.",
      bersih(0),
      tambah(0, judul("Cara Halim: langkah 3")),
      tambah("gabungkan", teks("g1", 150, 76, "5 + 2/5 = 5 2/5", 18, W.hitam)),
      tambah("Jadi", ...kartu("g2", 50, 100, 200, 40, W.hijauMuda, ["pita Igil: 5 2/5 m"], 11)),
      tambah("sama", emo("g3", 150, 170, "✅", 24)),
    ),
    k(
      "Sekarang simak model masalah Igil. Pita merah dua satu per lima: dua pita penuh dan satu bagian dari lima. Pita hijau tiga satu per lima: tiga pita penuh dan satu bagian dari lima.",
      bersih(0),
      tambah(0, judul("Menyimak: model pita")),
      tambah("merah", teks("m0", PITA_X + PITA_W / 2, 40, "pita merah 2 1/5", 9.4, W.merah), ...batang("m1", PITA_X, 46, PITA_W, 12, 1, [[0, 1, W.merahPita]]), ...batang("m2", PITA_X, 62, PITA_W, 12, 1, [[0, 1, W.merahPita]]), ...batang("m3", PITA_X, 78, PITA_W, 12, 5, [[0, 1, W.merahPita]])),
      tambah("hijau", teks("h0", 158 + PITA_W / 2, 40, "pita hijau 3 1/5", 9.4, W.hijau), ...batang("h1", 158, 46, PITA_W, 12, 1, [[0, 1, W.hijauPita]]), ...batang("h2", 158, 62, PITA_W, 12, 1, [[0, 1, W.hijauPita]]), ...batang("h3", 158, 78, PITA_W, 12, 1, [[0, 1, W.hijauPita]]), ...batang("h4", 158, 94, PITA_W, 12, 5, [[0, 1, W.hijauPita]])),
      tambah("bagian", teks("m4", PITA_X + PITA_W / 2, 130, "2 penuh + 1/5 pita", 8.8, W.hitam), teks("h5", 158 + PITA_W / 2, 130, "3 penuh + 1/5 pita", 8.8, W.hitam)),
    ),
    k(
      "Ketika digabungkan, arsiran yang penuh ada lima pita. Arsiran yang tidak penuh, satu bagian merah dan satu bagian hijau, jika digabungkan menjadi dua bagian dari lima bagian.",
      bersih(0),
      tambah(0, judul("Digabungkan")),
      tambah("penuh", ...batang("u1", 30, 34, 130, 12, 1, [[0, 1, W.hijauPita]]), ...batang("u2", 30, 50, 130, 12, 1, [[0, 1, W.hijauPita]]), ...batang("u3", 30, 66, 130, 12, 1, [[0, 1, W.hijauPita]]), ...batang("u4", 30, 82, 130, 12, 1, [[0, 1, W.merahPita]]), ...batang("u5", 30, 98, 130, 12, 1, [[0, 1, W.merahPita]]), teks("up", 225, 76, "5 pita penuh", 10.5, W.hitam)),
      tambah("tidak", ...batang("v1", 30, 118, 130, 12, 5, [[0, 1, W.hijauPita]]), ...batang("v2", 30, 134, 130, 12, 5, [[0, 1, W.merahPita]])),
      tambah("digabungkan@2", ...batang("v3", 30, 154, 130, 12, 5, [[0, 1, W.hijauPita], [1, 2, W.merahPita]]), teks("vp", 225, 164, "2/5", 15, W.hitam)),
    ),
    k(
      "Jumlah seluruh arsiran yang tidak penuh adalah dua per lima. Dengan demikian, hasil seluruhnya setelah digabungkan adalah lima dua per lima. Model dan hitungan memberi jawaban yang sama.",
      bersih(0),
      tambah(0, judul("Hasil seluruhnya")),
      tambah("Jumlah", teks("z1", 150, 66, "5 pita penuh + 2/5", 14, W.hitam)),
      tambah("hasil", teks("z2", 150, 104, "= 5 2/5", 24, W.hijau)),
      tambah("sama.", ...kartu("z3", 70, 124, 160, 36, W.hijauMuda, ["model = hitungan"], 10)),
    ),
  ],
};
