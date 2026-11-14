import type { AdeganStory } from "./logika-story";
import { W, batang, emo, judul, kartu, lingkaran, penghapus, teks } from "./k5b3b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b3b-bantu";

/* ------------------------------ 4. Eksplorasi 3.2A: martabak delapan rasa (Buku Siswa hlm. 76 sampai 78) ------------------------------ */
// Urutan rasa di buku: cokelat, tiramisu, keju, teh hijau, oreo, karamel, nanas, stroberi. Komang menerima karamel dan stroberi, Lukas menerima nanas.
export const ADEGAN_MARTABAK: AdeganStory = {
  id: "eks-a-martabak",
  judul: "Eksplorasi 3.2A: martabak delapan rasa",
  sumber: "Buku Siswa hlm. 76–78",
  latar: "#FFF7ED",
  kutipan: [
    "Eksplorasi 3.2A",
    "Nisa mempunyai martabak delapan",
    "rasa sama besar, yaitu rasa cokelat,",
    "tiramisu, keju, teh hijau, oreo,",
    "karamel, nanas, dan stroberi.",
    "memberikan Komang dua bagian",
    "maka Nia memberinya dua bagian rasa",
    "Berapa jumlah bagian yang Nisa berikan kepada teman-temannya?",
    "Lukas mendapatkan martabak rasa nanas.",
    "Komang mendapatkan martabak rasa karamel dan stroberi.",
    "Eksplorasi di atas dapat ditunjukkan dengan menggunakan arsiran.",
  ],
  ketukan: [
    k(
      "Eksplorasi tiga titik dua A. Nisa punya martabak delapan rasa yang sama besar: cokelat, tiramisu, keju, teh hijau, oreo, karamel, nanas, dan stroberi.",
      tambah(0, judul("Eksplorasi 3.2A")),
      tambah("Nisa", ...lingkaran("mt", 105, 108, 56, 8, [])),
      tambah("delapan", teks("d8", 215, 90, "8 bagian", 13, W.merah), teks("d9", 215, 110, "sama besar", 10, W.hitam)),
      tambah("cokelat,", emo("mk", 215, 150, "🥞", 26)),
    ),
    k(
      "Nisa memberi Komang dua bagian, yaitu rasa karamel dan stroberi. Nisa memberi Lukas satu bagian, yaitu rasa nanas. Kalimat terakhir di buku menulis Nia, padahal maksudnya Nisa.",
      hapus(0, "d8", "d9", "mk"),
      ubah("Komang", { id: "mt-5", warna: W.merahPita }, { id: "mt-7", warna: W.merahPita }),
      tambah("Komang", teks("kk", 215, 90, "Komang: 2", 11, W.merah), teks("kk2", 215, 104, "karamel, stroberi", 8.6, W.hitam)),
      ubah("Lukas", { id: "mt-6", warna: W.jingga }),
      tambah("Lukas", teks("ll", 215, 128, "Lukas: 1", 11, W.coklat), teks("ll2", 215, 142, "nanas", 8.6, W.hitam)),
      ubah("Nia,", { id: "kk", warna: W.merah }),
    ),
    k(
      "Pertanyaannya, berapa jumlah bagian yang Nisa berikan kepada teman-temannya? Lukas mendapat satu bagian dari delapan bagian martabak, ditulis satu per delapan.",
      bersih(0),
      tambah(0, judul("Bagian Lukas")),
      tambah("Pertanyaannya,", ...lingkaran("mt", 105, 108, 56, 8, [[6, 7, W.jingga]])),
      tambah("Lukas", teks("l1", 215, 92, "1 dari 8 bagian", 10, W.hitam)),
      tambah("ditulis", teks("l2", 215, 126, "1/8", 26, W.coklat)),
    ),
    k(
      "Komang mendapat dua bagian dari delapan bagian martabak, ditulis dua per delapan. Jumlah yang diberikan Nisa: satu bagian dan dua bagian, sehingga ditulis tiga per delapan.",
      bersih(0),
      tambah(0, judul("Bagian Komang dan jumlahnya")),
      tambah("Komang", ...lingkaran("mt", 80, 108, 50, 8, [[5, 6, W.merahPita], [6, 7, W.jingga], [7, 8, W.merahPita]])),
      tambah("dua", teks("k1", 200, 84, "Komang: 2/8", 11, W.merah)),
      tambah("Jumlah", teks("k2", 200, 106, "Lukas: 1/8", 11, W.coklat)),
      tambah("sehingga", teks("k3", 200, 140, "1/8 + 2/8 = 3/8", 12, W.hijau)),
    ),
    k(
      "Buku mengajak kita menunjukkan hal itu dengan arsiran. Martabak Lukas terarsir satu irisan, martabak Komang dua irisan, dan martabak keduanya tiga irisan.",
      bersih(0),
      tambah(0, judul("Arsiran: satu tambah dua")),
      tambah("Lukas", ...lingkaran("ma", 45, 100, 36, 8, [[0, 1, W.jingga]]), teks("ta", 45, 150, "1/8", 12, W.hitam)),
      tambah("Komang", teks("pa", 96, 104, "+", 16, W.merah), ...lingkaran("mb", 150, 100, 36, 8, [[0, 2, W.merahPita]]), teks("tb", 150, 150, "2/8", 12, W.hitam)),
      tambah("keduanya", teks("sa", 202, 104, "=", 16, W.merah), ...lingkaran("mc", 255, 100, 36, 8, [[0, 1, W.jingga], [1, 3, W.merahPita]]), teks("tc", 255, 150, "3/8", 12, W.hitam)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 3.2B: penghapus dan kesimpulan (Buku Siswa hlm. 78 sampai 80) ------------------------------ */
const ASEP = W.langit;
const YOH = W.pink;

export const ADEGAN_PENGHAPUS: AdeganStory = {
  id: "eks-b-penghapus",
  judul: "Eksplorasi 3.2B: sepuluh penghapus dan kesimpulan",
  sumber: "Buku Siswa hlm. 78–80",
  latar: "#F5F3FF",
  kutipan: [
    "Eksplorasi 3.2B",
    "Lukas memiliki 10 penghapus.",
    "banyak penghapus, ia memberikan penghapusnya kepada Asep",
    "sebanyak dua buah dan Yohana sebanyak tiga buah.",
    "Bagaimana bentuk pecahan dari banyaknya penghapus yang",
    "diberikan kepada Asep dan kepada Yohana?",
    "Coba arsirlah model dari kegiatan,",
    "Ayo Menyimpulkan",
    "Hasil penjumlahan berpenyebut sama",
    "Jika ada dua pecahan berpenyebut sama, maka dapat",
    "dijumlahkan dengan cara menjumlahkan",
  ],
  ketukan: [
    k(
      "Eksplorasi tiga titik dua B. Lukas punya sepuluh penghapus. Karena merasa punya banyak, ia memberikan dua buah kepada Asep dan tiga buah kepada Yohana.",
      tambah(0, judul("Eksplorasi 3.2B")),
      tambah("sepuluh", ...penghapus("ph", 66, 54, [])),
      tambah("sepuluh", teks("t10", 150, 112, "10 penghapus", 11, W.hitam)),
      tambah("Asep", ...penghapus("ph", 66, 54, [[0, 2, ASEP]])),
      tambah("Yohana", ...penghapus("ph", 66, 54, [[0, 2, ASEP], [2, 5, YOH]])),
    ),
    k(
      "Berapa pecahan penghapus yang diterima Asep? Dua buah dari sepuluh buah keseluruhan, ditulis dua per sepuluh. Yohana mendapat tiga buah dari sepuluh buah, ditulis tiga per sepuluh.",
      bersih(0),
      tambah(0, judul("Pecahan tiap anak")),
      tambah(0, ...penghapus("ph", 66, 40, [[0, 2, ASEP], [2, 5, YOH]])),
      tambah("Asep?", ...kartu("as", 30, 100, 110, 44, ASEP, ["Asep", "2 dari 10"], 9.4)),
      tambah("dua@2", teks("as2", 85, 164, "2/10", 16, W.biru)),
      tambah("Yohana", ...kartu("yo", 160, 100, 110, 44, YOH, ["Yohana", "3 dari 10"], 9.4)),
      tambah("tiga@2", teks("yo2", 215, 164, "3/10", 16, W.biru)),
    ),
    k(
      "Jumlah penghapus untuk Asep dan Yohana adalah dua ditambah tiga, yaitu lima buah dari sepuluh buah keseluruhan, ditulis lima per sepuluh.",
      bersih(0),
      tambah(0, judul("Jumlah untuk keduanya")),
      tambah(0, ...penghapus("ph", 66, 40, [[0, 5, W.hijauPita]])),
      tambah("dua", teks("j1", 150, 108, "2 + 3 = 5 buah dari 10 buah", 11, W.hitam)),
      tambah("ditulis", teks("j2", 150, 142, "2/10 + 3/10 = 5/10", 17, W.hijau)),
    ),
    k(
      "Buku meminta kita mengarsir model: penghapus Asep, penghapus Yohana, lalu penghapus Asep dan Yohana. Dua terarsir, ditambah tiga terarsir, sama dengan lima terarsir.",
      bersih(0),
      tambah(0, judul("Arsiran model penghapus")),
      tambah("Asep,", ...penghapus("ma", 12, 62, [[0, 2, ASEP]], 9, 7, 12), teks("ma-t", 42, 106, "2/10", 11, W.hitam)),
      tambah("Yohana,", teks("mp", 82, 82, "+", 14, W.merah), ...penghapus("mb", 100, 62, [[0, 3, YOH]], 9, 7, 12), teks("mb-t", 130, 106, "3/10", 11, W.hitam)),
      tambah("lima", teks("ms", 178, 82, "=", 14, W.merah), ...penghapus("mc", 196, 62, [[0, 2, ASEP], [2, 5, YOH]], 9, 7, 12), teks("mc-t", 226, 106, "5/10", 11, W.hitam)),
    ),
    k(
      "Ayo Menyimpulkan. Jika ada dua pecahan berpenyebut sama, maka dapat dijumlahkan dengan cara menjumlahkan pembilangnya, sedangkan penyebutnya tetap. Itulah isian titik-titik di buku.",
      bersih(0),
      tambah(0, judul("Ayo Menyimpulkan")),
      tambah("menjumlahkan", ...kartu("s1", 22, 46, 256, 40, W.hijauMuda, ["jumlahkan pembilangnya"], 10.5)),
      tambah("penyebutnya", ...kartu("s2", 22, 98, 256, 40, W.krem, ["penyebutnya tetap"], 10.5)),
      tambah("Itulah", teks("s3", 150, 168, "2/10 + 3/10 = 5/10", 13, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 3.2C: pita Yohana, Cara Lukas (Buku Siswa hlm. 80 dan 81) ------------------------------ */
export const ADEGAN_PITA_LUKAS: AdeganStory = {
  id: "eks-c-lukas",
  judul: "Eksplorasi 3.2C: Cara Lukas",
  sumber: "Buku Siswa hlm. 80–81",
  latar: "#F0FDF4",
  kutipan: [
    "Eksplorasi 3.2C",
    "Masalah Yohana",
    "pita warna hijau sepanjang",
    "digabungkan, berapa panjangnya?",
    "Dapatkah kalian membantuku?",
    "Cara Lukas",
    "Ubahlah pecahan campuran menjadi pecahan biasa.",
    "Lakukan operasi penjumlahan pecahan biasa.",
    "Sederhanakanlah hasil penjumlahan",
    "Jadi, panjang seluruh pita Yohana adalah",
  ],
  ketukan: [
    k(
      "Eksplorasi tiga titik dua C, Masalah Yohana. Yohana punya pita merah sepanjang dua satu per lima meter, dan pita hijau sepanjang tiga satu per lima meter. Kalau kedua pita digabungkan, berapa panjangnya?",
      tambah(0, judul("Masalah Yohana")),
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
      "Cara Lukas. Langkah satu, ubah pecahan campuran menjadi pecahan biasa. Dua satu per lima sama dengan dua kali lima ditambah satu, per lima, yaitu sebelas per lima.",
      bersih(0),
      tambah(0, judul("Cara Lukas: langkah 1")),
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
      tambah(0, judul("Cara Lukas: langkah 2")),
      tambah("Langkah", ...kartu("l2", 30, 40, 240, 28, W.krem, ["jumlahkan pecahan biasa"], 9.4)),
      tambah("Sebelas", teks("c3", 150, 112, "11/5 + 16/5 = 27/5", 17, W.hitam)),
      tambah("pembilangnya", teks("c4", 150, 146, "11 + 16 = 27", 11, W.hijau)),
    ),
    k(
      "Langkah tiga, sederhanakan hasilnya. Dua puluh tujuh per lima sama dengan lima dan dua per lima. Jadi panjang seluruh pita Yohana adalah lima dua per lima meter.",
      bersih(0),
      tambah(0, judul("Cara Lukas: langkah 3")),
      tambah("Langkah", ...kartu("l3", 30, 40, 240, 28, W.krem, ["sederhanakan hasilnya"], 9.4)),
      tambah("Dua@2", teks("c5", 150, 108, "27/5 = 5 2/5", 18, W.hitam)),
      tambah("Jadi", ...kartu("hs", 50, 128, 200, 40, W.hijauMuda, ["pita Yohana: 5 2/5 m"], 11)),
    ),
  ],
};

/* ------------------------------ 7. Cara Komang dan Ayo Menyimak (Buku Siswa hlm. 82 sampai 84) ------------------------------ */
const PITA_X = 22;
const PITA_W = 110;

export const ADEGAN_PITA_KOMANG: AdeganStory = {
  id: "eks-c-komang",
  judul: "Cara Komang dan model pita",
  sumber: "Buku Siswa hlm. 82–84",
  latar: "#ECFDF5",
  kutipan: [
    "Cara Komang",
    "Jumlahkan bilangan bulat dengan bilangan bulat",
    "Jumlahkan bilangan pecahan dengan bilangan pecahan",
    "Gabungkan hasil penjumlahan bilangan bulat",
    "Ayo Menyimak",
    "Model dari masalah Yohana adalah sebagai berikut.",
    "Pita warna merah",
    "Pita warna hijau",
    "sehingga ketika digabungkan",
    "arsiran yang penuh",
    "arsiran yang tidak penuh",
    "ketika arsiran tidak penuh digabungkan menjadi",
    "Jumlah seluruh arsiran yang tidak penuh adalah",
    "Dengan demikian, keseluruhan bagian setelah digabungkan adalah",
    "Hasil seluruhnya adalah",
  ],
  ketukan: [
    k(
      "Cara Komang. Pisahkan dulu bilangan bulat dan pecahannya. Langkah satu, jumlahkan bilangan bulat dengan bilangan bulat: dua tambah tiga sama dengan lima.",
      tambah(0, judul("Cara Komang: langkah 1")),
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
      "Langkah tiga, gabungkan hasil keduanya: lima dan dua per lima. Jadi panjang pita Yohana lima dua per lima meter, sama dengan Cara Lukas.",
      bersih(0),
      tambah(0, judul("Cara Komang: langkah 3")),
      tambah("gabungkan", teks("g1", 150, 76, "5 + 2/5 = 5 2/5", 18, W.hitam)),
      tambah("Jadi", ...kartu("g2", 50, 100, 200, 40, W.hijauMuda, ["pita Yohana: 5 2/5 m"], 11)),
      tambah("sama", emo("g3", 150, 170, "✅", 24)),
    ),
    k(
      "Ayo Menyimak, model masalah Yohana. Pita merah dua satu per lima: dua pita penuh dan satu bagian dari lima. Pita hijau tiga satu per lima: tiga pita penuh dan satu bagian dari lima.",
      bersih(0),
      tambah(0, judul("Ayo Menyimak: model pita")),
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
