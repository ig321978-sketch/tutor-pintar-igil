import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, emo, kartu, labelSisi, panah, segiBeraturan, tanda, tandaSisi, teks } from "./k5b4d-gambar";
import { bersih, k, tambah, ubah } from "./k5b4d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/* ------------------------------ 4. Eksplorasi 4.4, segi lima: mengamati (BS hlm. 122; Panduan Guru hlm. 156) ------------------------------ */
export const ADEGAN_LIMA_1: AdeganStory = {
  id: "lima-1",
  judul: "Eksplorasi 4.4: mengamati segi lima",
  sumber: "Buku Siswa hlm. 122; Buku Panduan Guru hlm. 156",
  latar: "#FFF4DD",
  kutipan: [
    "Perhatikan bangun-bangun datar berikut",
    "Ada berapa sisi yang dimiliki?",
    "Apakah sisi-sisinya sama panjang?",
    "Bangun apakah itu?",
    "Segi lima beraturan",
  ],
  ketukan: [
    k(
      "Eksplorasi 4.4 dimulai dengan segi lima. Guru menampilkan gambarnya di depan kelas, dan siswa mengamatinya di buku. Setiap sisi gambar itu 3 sentimeter.",
      tambah(0, jud("Eksplorasi 4.4: segi lima", 22)),
      tambah("segi", segiBeraturan("pk", 95, 118, 5, 46)),
      tambah("Guru", emo("gb", 232, 80, "🖼️", 30), teks("gt", 232, 104, "gambar di depan kelas", 8.2)),
      tambah("Setiap", labelSisi("ls", 95, 118, 5, 46, "3 cm", 13, 7.6)),
    ),
    k(
      "Pertanyaan pertama: ada berapa sisi yang dimiliki? Siswa menghitung sisinya satu per satu, dan jawabannya 5.",
      bersih(0),
      tambah(0, jud("Ada berapa sisi?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 5, 46)),
      tambah("satu", labelSisi("ns", 95, 118, 5, 46, ["1", "2", "3", "4", "5"], 12, 9, W.merah)),
      tambah("5", kartu("jw", 196, 80, 88, 56, W.hijauMuda, ["jawaban:", "5 sisi"], 10)),
    ),
    k(
      "Pertanyaan kedua: apakah sisi-sisinya sama panjang? Jawabannya ya. Siswa memastikannya dengan mengukur memakai penggaris, dan semuanya 3 sentimeter.",
      bersih(0),
      tambah(0, jud("Sama panjang?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 5, 46), tandaSisi("tt", 95, 118, 5, 46)),
      tambah("Jawabannya", kartu("jw", 196, 56, 88, 40, W.hijauMuda, ["ya, sama panjang"], 8.8), tanda("jwc", 270, 92, true)),
      tambah("mengukur", emo("rl", 240, 130, "📏", 28)),
      tambah("3", labelSisi("ls", 95, 118, 5, 46, "3 cm", 13, 7.6)),
    ),
    k(
      "Pertanyaan ketiga: bangun apakah itu? Karena memiliki lima sisi yang sama panjang, bangun itu disebut segi lima beraturan.",
      bersih(0),
      tambah(0, jud("Bangun apakah itu?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 5, 46, W.hijauMuda), tandaSisi("tt", 95, 118, 5, 46)),
      tambah("memiliki", teks("n1", 232, 82, "5 sisi", 10, W.biru), teks("n2", 232, 98, "sama panjang", 9, W.biru)),
      tambah("segi", kartu("nm", 180, 114, 108, 50, W.krem, ["segi lima", "beraturan"], 10)),
    ),
    k(
      "Bila ada hasil pengukuran atau hitungan yang keliru, guru memeriksa cara siswa mengukur atau menghitung, lalu mengoreksinya.",
      bersih(0),
      tambah(0, jud("Jika ada yang keliru", 22)),
      tambah("keliru,", kartu("kl", 18, 60, 84, 56, W.merahMuda, ["ukur atau", "hitung keliru"], 8.8), tanda("klx", 92, 74, false)),
      tambah("memeriksa", panah("kp", 106, 88, 34, 0, W.ungu, 2.4), emo("kg", 160, 92, "🔍", 28), teks("kgt", 160, 112, "guru periksa cara", 8)),
      tambah("mengoreksinya", panah("kq", 184, 88, 24, 0, W.ungu, 2.4), kartu("kb", 212, 60, 76, 56, W.hijauMuda, ["dikoreksi"], 9), tanda("kbc", 280, 74, true)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 4.4, segi lima: keliling (BS hlm. 122; Panduan Guru hlm. 156) ------------------------------ */
export const ADEGAN_LIMA_2: AdeganStory = {
  id: "lima-2",
  judul: "Eksplorasi 4.4: keliling segi lima beraturan",
  sumber: "Buku Siswa hlm. 122; Buku Panduan Guru hlm. 156",
  latar: "#FFF4DD",
  kutipan: [
    "Bagaimana cara mencari kelilingnya?",
    "Keliling segi lima beraturan dapat dicari dengan cara",
    "Dengan demikian, diperoleh kelilingnya",
    "sehingga diperoleh kelilingnya 15 cm",
  ],
  ketukan: [
    k(
      "Pertanyaan keempat: bagaimana cara mencari kelilingnya? Keliling berarti jumlah semua sisi, yaitu 3 ditambah 3 ditambah 3 ditambah 3 ditambah 3.",
      tambah(0, jud("Bagaimana mencari keliling?", 22)),
      tambah(0, segiBeraturan("pk", 70, 118, 5, 40), ...labelSisi("ls", 70, 118, 5, 40, "3", 11, 8.6)),
      tambah("Keliling", teks("kk", 220, 80, "Keliling =", 10, W.ungu)),
      tambah("3@2", teks("kj", 220, 106, "3+3+3+3+3", 12, W.biru)),
    ),
    k(
      "Jumlahnya 15. Karena kelima sisinya sama, penjumlahan berulang itu dapat diubah menjadi perkalian, yaitu 5 kali 3 sama dengan 15.",
      bersih(0),
      tambah(0, jud("Jumlah berulang jadi kali", 22)),
      tambah("Jumlahnya", baris("j1", 40, 46, 220, "3+3+3+3+3 = 15", W.krem, 11, 28)),
      tambah("perkalian,", panah("jp", 150, 78, 0, 18, W.ungu, 2.4)),
      tambah("5@2", baris("j2", 40, 102, 220, "5 x 3 = 15", W.hijauMuda, 11, 28)),
    ),
    k(
      "Titik-titik di buku diisi begini. Penjumlahannya 3 sebanyak lima kali, lalu 5 kali 3, dan hasilnya 15. Jadi keliling segi lima ini 15 sentimeter.",
      bersih(0),
      tambah(0, jud("Mengisi titik-titik di buku", 20)),
      tambah("Penjumlahannya", teks("b1", 30, 54, "Keliling = 3+3+3+3+3", 10, W.biru, { anchor: "start" })),
      tambah("kali@2", teks("b2", 82, 78, "= 5 x 3", 10, W.biru, { anchor: "start" })),
      tambah("hasilnya", teks("b3", 82, 102, "= 15", 10, W.merah, { anchor: "start" })),
      tambah("sentimeter.", kartu("b4", 60, 124, 180, 40, W.hijauMuda, ["kelilingnya 15 cm"], 11)),
    ),
    k(
      "Bagian bawah halaman menampilkan segi lima lain. Sisinya diberi tanda garis kecil dan kata sisi, yang menunjukkan semua sisinya sama panjang.",
      bersih(0),
      tambah(0, jud("Tanda sisi sama panjang", 22)),
      tambah("segi", segiBeraturan("pk", 100, 120, 5, 50)),
      tambah("tanda", tandaSisi("tt", 100, 120, 5, 50)),
      tambah("kata", teks("ts", 178, 66, "sisi", 10, W.merah), panah("tp", 172, 70, -22, 14, W.merah, 1.6)),
      tambah("semua", teks("tm", 225, 122, "semua sisi", 9.6, W.biru), teks("tm2", 225, 138, "sama panjang", 9.6, W.biru)),
    ),
    k(
      "Keliling segi lima beraturan dapat dicari dengan cara sisi ditambah sisi ditambah sisi ditambah sisi ditambah sisi, yaitu 5 kali sisi.",
      bersih(0),
      tambah(0, jud("Rumus keliling segi lima", 22)),
      tambah("sisi", teks("r1", 150, 62, "Keliling = sisi+sisi+sisi+sisi+sisi", 9.4, W.biru)),
      tambah("yaitu", teks("r2", 150, 94, "= 5 x sisi", 14, W.merah)),
      tambah("kali", kartu("r3", 70, 114, 160, 44, W.hijauMuda, ["5 sisi sama panjang", "5 kali panjang sisi"], 9)),
    ),
    k(
      "Menurut alur di Panduan Guru, guru meminta siswa menyimpulkan rumus itu sendiri. Respons yang diharapkan: menjumlahkan semua sisinya, lalu mengubahnya menjadi perkalian.",
      bersih(0),
      tambah(0, jud("Siswa menyimpulkan rumus", 22)),
      tambah("guru", emo("sg", 40, 70, "👩", 30), teks("sgt", 40, 94, "guru", 8)),
      tambah("menyimpulkan", kartu("sk", 66, 52, 104, 40, W.krem, ["simpulkan", "rumus sendiri"], 8.6)),
      tambah("menjumlahkan", baris("s1", 30, 112, 240, "1. jumlahkan semua sisi", W.muda, 9, 22)),
      tambah("mengubahnya", baris("s2", 30, 140, 240, "2. ubah jadi perkalian: 5 x sisi", W.hijauMuda, 9, 22)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 4.4, segi enam: mengamati (BS hlm. 123; Panduan Guru hlm. 157) ------------------------------ */
export const ADEGAN_ENAM_1: AdeganStory = {
  id: "enam-1",
  judul: "Eksplorasi 4.4: mengamati segi enam",
  sumber: "Buku Siswa hlm. 123; Buku Panduan Guru hlm. 157",
  latar: "#EFF6FF",
  kutipan: [
    "Perhatikan gambar di atas",
    "Ada berapa banyak sisinya?",
    "Apakah sisi-sisinya sama panjang?",
    "Bangun apakah itu?",
    "Segi enam beraturan",
  ],
  ketukan: [
    k(
      "Halaman berikutnya menampilkan segi enam. Di buku siswa, panjang sisinya masih berupa titik-titik, jadi siswa mengukurnya dengan penggaris. Kunci Panduan Guru menunjukkan 3 sentimeter.",
      tambah(0, jud("Segi enam di halaman berikutnya", 22, 11)),
      tambah("segi", segiBeraturan("pk", 95, 120, 6, 44)),
      tambah("titik-titik,", labelSisi("ls", 95, 120, 6, 44, "... cm", 15, 7.2)),
      tambah("penggaris", emo("rl", 240, 90, "📏", 30), teks("rt", 240, 114, "ukur tiap sisi", 8.4)),
      ubah("3", ...[0, 1, 2, 3, 4, 5].map((i) => ({ id: `ls${i}`, isi: "3 cm", warna: W.merah }))),
    ),
    k(
      "Guru menampilkan gambar segi enam di depan kelas, dan siswa mengamatinya di buku. Lalu guru menanyakan nama bangun itu.",
      bersih(0),
      tambah(0, jud("Mengamati segi enam", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 6, 44, W.muda), emo("pq", 95, 124, "❓", 22)),
      tambah("menanyakan", kartu("pn", 170, 70, 116, 62, W.krem, ["Apa nama", "bangun ini?"], 10.4)),
    ),
    k(
      "Pertanyaan: ada berapa banyak sisinya? Siswa menghitung sisinya satu per satu, dan jawabannya 6.",
      bersih(0),
      tambah(0, jud("Ada berapa banyak sisi?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 6, 44, W.muda)),
      tambah("satu", labelSisi("ns", 95, 118, 6, 44, ["1", "2", "3", "4", "5", "6"], 12, 9, W.merah)),
      tambah("6", kartu("jw", 196, 80, 88, 56, W.hijauMuda, ["jawaban:", "6 sisi"], 10)),
    ),
    k(
      "Pertanyaan: apakah sisi-sisinya sama panjang? Ya. Setelah diukur dengan penggaris, setiap sisinya 3 sentimeter.",
      bersih(0),
      tambah(0, jud("Sama panjang?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 6, 44, W.muda), tandaSisi("tt", 95, 118, 6, 44)),
      tambah("Ya.", kartu("jw", 196, 56, 88, 40, W.hijauMuda, ["ya, sama panjang"], 8.8), tanda("jwc", 270, 92, true)),
      tambah("3", labelSisi("ls", 95, 118, 6, 44, "3 cm", 14, 7.2)),
    ),
    k(
      "Pertanyaan: bangun apakah itu? Segi enam beraturan, karena memiliki enam sisi yang sama panjang.",
      bersih(0),
      tambah(0, jud("Bangun apakah itu?", 22)),
      tambah(0, segiBeraturan("pk", 95, 118, 6, 44, W.hijauMuda), tandaSisi("tt", 95, 118, 6, 44)),
      tambah("Segi", kartu("nm", 178, 66, 110, 50, W.krem, ["segi enam", "beraturan"], 10)),
      tambah("memiliki", teks("n1", 232, 140, "6 sisi sama panjang", 8, W.biru)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 4.4, segi enam: keliling (BS hlm. 123; Panduan Guru hlm. 157 dan 158) ------------------------------ */
export const ADEGAN_ENAM_2: AdeganStory = {
  id: "enam-2",
  judul: "Eksplorasi 4.4: keliling segi enam beraturan",
  sumber: "Buku Siswa hlm. 123; Buku Panduan Guru hlm. 157 dan 158",
  latar: "#EFF6FF",
  kutipan: [
    "Bagaimana cara mencari kelilingnya?",
    "Keliling segi enam beraturan dapat dicari dengan cara",
    "Dengan demikian, diperoleh kelilingnya",
    "sehingga diperoleh kelilingnya 18 cm",
  ],
  ketukan: [
    k(
      "Pertanyaan: bagaimana cara mencari kelilingnya? Jumlahkan semua sisinya, yaitu 3 ditambah 3 ditambah 3 ditambah 3 ditambah 3 ditambah 3.",
      tambah(0, jud("Keliling segi enam", 22)),
      tambah(0, segiBeraturan("pk", 66, 118, 6, 38), ...labelSisi("ls", 66, 118, 6, 38, "3", 11, 8.6)),
      tambah("Jumlahkan", teks("kk", 210, 78, "Keliling =", 10, W.ungu)),
      tambah("3@2", teks("kj", 210, 104, "3+3+3+3+3+3", 11, W.biru)),
    ),
    k(
      "Jumlahnya 18. Karena keenam sisinya sama, penjumlahan ini diubah menjadi 6 kali 3 sama dengan 18. Jadi keliling segi enam beraturan ini 18 sentimeter.",
      bersih(0),
      tambah(0, jud("Jumlah berulang jadi kali", 22)),
      tambah("Jumlahnya", baris("j1", 40, 40, 220, "3+3+3+3+3+3 = 18", W.krem, 11, 28)),
      tambah("diubah", panah("jp", 150, 72, 0, 16, W.ungu, 2.4)),
      tambah("6", baris("j2", 40, 92, 220, "6 x 3 = 18", W.hijauMuda, 11, 28)),
      tambah("sentimeter.", kartu("j3", 70, 132, 160, 36, W.hijauMuda, ["keliling 18 cm"], 11)),
    ),
    k(
      "Rumus di buku: keliling segi enam beraturan sama dengan sisi ditambah sisi sebanyak enam kali, yaitu 6 kali sisi.",
      bersih(0),
      tambah(0, jud("Rumus keliling segi enam", 22)),
      tambah("sisi", teks("r1", 150, 62, "Keliling = sisi+sisi+sisi+sisi+sisi+sisi", 8.6, W.biru)),
      tambah("yaitu", teks("r2", 150, 94, "= 6 x sisi", 14, W.merah)),
      tambah("kali@2", kartu("r3", 70, 114, 160, 44, W.hijauMuda, ["6 sisi sama panjang", "6 kali panjang sisi"], 9)),
    ),
    k(
      "Bandingkan dengan segi lima tadi. 5 kali 3 hasilnya 15, dan 6 kali 3 hasilnya 18. Sisi bertambah satu, keliling bertambah 3.",
      bersih(0),
      tambah(0, jud("Segi lima dan segi enam", 22)),
      tambah("5", baris("c1", 40, 44, 220, "segi lima: 5 x 3 = 15", W.krem, 10, 26)),
      tambah("6", baris("c2", 40, 78, 220, "segi enam: 6 x 3 = 18", W.muda, 10, 26)),
      tambah("bertambah@1", teks("c3", 150, 134, "18 - 15 = 3", 13, W.merah)),
      tambah("keliling", teks("c4", 150, 156, "sisi tambah satu, keliling tambah 3", 8.6, W.ungu)),
    ),
    k(
      "Catatan guru: pada langkah kedelapan, Panduan Guru menulis menyimpulkan rumus keliling segi lima beraturan, padahal bangunnya segi enam. Video ini memakai segi enam.",
      bersih(0),
      tambah(0, jud("Catatan guru: salah tulis", 22)),
      tambah("menulis", kartu("t1", 30, 44, 240, 44, W.merahMuda, ["tertulis: rumus segi lima"], 9.6), tanda("t1x", 264, 70, false)),
      tambah("padahal", kartu("t2", 30, 104, 240, 44, W.hijauMuda, ["bangunnya segi enam"], 9.6), tanda("t2c", 264, 130, true)),
      tambah("memakai", segiBeraturan("t3", 150, 182, 6, 12, W.muda)),
    ),
  ],
};
