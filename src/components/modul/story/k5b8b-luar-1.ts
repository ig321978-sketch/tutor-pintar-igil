import type { AdeganStory } from "./logika-story";
import { W, apem, barisApem, emo, kartu, kartuMetode, kunciApem, teks } from "./k5b8b-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b8b-bantu";

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luarb-pembuka",
  judul: "Empat metode luar untuk membuat dan membaca piktogram",
  sumber: "Metode luar: empat cara untuk piktogram",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk piktogram. Metode ini membantu kita memilih keterangan gambar, menjaga ukuran gambar, menemukan kesalahan, dan mengubah tabel menjadi gambar.",
      tambah(0, teks("jud", 150, 26, "Piktogram: metode luar", 12, W.ungu)),
      tambah("keterangan", emo("e1", 50, 100, "🔑", 36), teks("t1", 50, 124, "arti gambar", 8.6, W.merah)),
      tambah("ukuran", emo("e2", 120, 100, "📏", 36), teks("t2", 120, 124, "ukuran sama", 8.6)),
      tambah("kesalahan,", emo("e3", 190, 100, "🔍", 36), teks("t3", 190, 124, "cari salah", 8.6, W.hijau)),
      tambah("mengubah", emo("e4", 255, 100, "🎨", 36), teks("t4", 255, 124, "tabel jadi gambar", 7.6, W.ungu)),
    ),
    k(
      "Ada empat metode luar. Pertama, Pictograph Scale Legend, yaitu memilih dan menuliskan keterangan gambar, nilai yang diwakili satu gambar.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah("Pictograph", kartuMetode("m1", 10, 30, "#FDE68A", ["Pictograph", "Scale Legend"], "pilih dan tulis arti gambar")),
    ),
    k(
      "Kedua, Unit Symbol Consistency, yaitu menjaga agar satu simbol selalu bernilai sama dan berukuran sama.",
      tambah("Unit", kartuMetode("m2", 156, 30, "#FBCFE8", ["Unit Symbol", "Consistency"], "simbol selalu sama")),
    ),
    k(
      "Ketiga, Pictograph Error Hunt, yaitu berburu kesalahan dengan daftar periksa. Keempat, Frequency-to-Pictograph Conversion, yaitu mengubah tabel frekuensi menjadi piktogram.",
      tambah("Error", kartuMetode("m3", 10, 112, "#BBF7D0", ["Pictograph", "Error Hunt"], "berburu kesalahan")),
      tambah("Frequency", kartuMetode("m4", 156, 112, "#BFDBFE", ["Frequency-to-", "Pictograph Conversion"], "tabel jadi gambar")),
    ),
  ],
};

/* ------------------------------ LB1. Pictograph Scale Legend: konsep ------------------------------ */
export const ADEGAN_LUAR_LEGENDA: AdeganStory = {
  id: "luarb-legenda",
  judul: "Pictograph Scale Legend: memilih dan menulis keterangan gambar",
  sumber: "Metode luar: keterangan gambar dan data 12",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Pictograph Scale Legend artinya memilih dan menuliskan keterangan gambar, yaitu nilai yang diwakili oleh satu gambar. Tanpa keterangan, gambar tidak bisa dibaca.",
      tambah(0, teks("jud", 150, 24, "Pictograph Scale Legend", 12, W.ungu)),
      tambah("keterangan", kunciApem("kn", 86, 52, "mewakili 4 kue apem")),
      tambah("Tanpa", teks("tt", 150, 110, "tanpa keterangan: gambar hanya tebakan", 10, W.merah)),
    ),
    k(
      "Keterangan yang baik membuat gambar tidak terlalu banyak, dan sebaiknya membagi habis semua data. Kalau tidak habis, sisanya digambar dengan potongan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Keterangan yang baik", 13, W.ungu)),
      tambah("banyak,", kartu("g1", 40, 44, 220, 32, W.hijauMuda, ["gambar tidak terlalu banyak"], 9.4)),
      tambah("membagi", kartu("g2", 40, 86, 220, 32, W.muda, ["membagi habis semua data"], 9.4)),
      tambah("potongan.", kartu("g3", 40, 128, 220, 32, W.krem, ["sisa digambar dengan potongan"], 9.4)),
    ),
    k(
      "Contoh sebuah data bernilai 12. Jika satu gambar mewakili 1, butuh 12 gambar. Jika mewakili 2, butuh 6 gambar. Jika mewakili 3, butuh 4 gambar. Jika mewakili 4, butuh 3 gambar.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Contoh data bernilai 12", 13, W.ungu)),
      tambah("12.", teks("l0", 150, 54, "data: 12", 11, W.merah)),
      tambah("mewakili@1", teks("l1", 150, 80, "mewakili 1: 12 gambar", 11, W.biru)),
      tambah("mewakili@2", teks("l2", 150, 104, "mewakili 2: 6 gambar", 11, W.biru)),
      tambah("mewakili@3", teks("l3", 150, 128, "mewakili 3: 4 gambar", 11, W.biru)),
      tambah("mewakili@4", teks("l4", 150, 152, "mewakili 4: 3 gambar", 11, W.biru)),
    ),
    k(
      "Makin besar nilai satu gambar, makin sedikit gambar. Tetapi nilai yang terlalu besar membuat sisa dan potongan makin banyak.",
      tambah("sedikit", teks("m1", 150, 180, "nilai gambar makin besar, gambar makin sedikit", 9.6, W.hijau)),
      tambah("potongan", teks("m2", 150, 196, "tetapi sisa makin banyak", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ LB2. Pictograph Scale Legend: penerapan pada panen tomat ------------------------------ */
export const ADEGAN_LUAR_LEGENDA_TERAPAN: AdeganStory = {
  id: "luarb-legenda-terapan",
  judul: "Memilih arti gambar untuk panen tomat Pak Chandra",
  sumber: "Metode luar: panen tomat Pak Chandra",
  latar: "#FEF2F2",
  ketukan: [
    k(
      "Kita uji pada hasil panen tomat Pak Chandra: 10, 14, 20, 12, dan 4 kilogram, jumlahnya 60 kilogram.",
      tambah(0, teks("jud", 150, 22, "Pilih arti gambar: panen tomat", 12, W.ungu)),
      tambah("10,", teks("d1", 150, 50, "data: 10, 14, 20, 12, 4 kg", 11, W.biru)),
      tambah("jumlahnya", teks("d2", 150, 72, "jumlah 60 kg", 11, W.merah)),
    ),
    k(
      "Kalau satu gambar mewakili 1 kilogram, butuh 60 gambar, terlalu banyak untuk digambar.",
      tambah("mewakili", teks("c1", 150, 100, "mewakili 1 kg: 60 gambar, terlalu banyak", 9.6, W.merah)),
    ),
    k(
      "Kalau mewakili 2 kilogram, hasilnya 5, 7, 10, 6, dan 2 gambar, semuanya habis, dengan jumlah 30 gambar.",
      tambah("mewakili", teks("c2", 150, 124, "mewakili 2 kg: 5, 7, 10, 6, 2 gambar, habis", 9.6, W.hijau)),
      tambah("jumlah", teks("c2b", 150, 138, "jumlah 30 gambar", 9, W.hijau)),
    ),
    k(
      "Kalau mewakili 4 kilogram, butuh 15 gambar, tetapi 10 dan 14 tidak habis dibagi 4, sehingga perlu dua potongan setengah.",
      tambah("mewakili", teks("c3", 150, 162, "mewakili 4 kg: 15 gambar, perlu 2 setengah", 9.6, W.ungu)),
    ),
    k(
      "Kalau mewakili 5 kilogram, butuh 12 gambar, tetapi 14 dibagi 5 bersisa 4 yang sulit digambar. Jadi pilih nilai terbesar yang pas untuk semua data, yaitu 2 kilogram.",
      tambah("mewakili", teks("c4", 150, 182, "mewakili 5 kg: 12 gambar, 14 : 5 sisa 4", 9.6, W.merah)),
      tambah("yaitu", teks("c5", 150, 194, "pilih nilai 2 kg", 10.4, W.hijau)),
      sorotkan("yaitu", "c2"),
    ),
  ],
};

/* ------------------------------ LB3. Unit Symbol Consistency: konsep ------------------------------ */
const potongan = (id: string, x: number, y: number, q: number, nilai: string) => [...apem(id, x, y, q, 13), teks(`${id}v`, x, y + 28, nilai, 10, W.merah)];

export const ADEGAN_LUAR_SIMBOL: AdeganStory = {
  id: "luarb-simbol",
  judul: "Unit Symbol Consistency: simbol sama bernilai sama",
  sumber: "Metode luar: ukuran dan potongan simbol",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Unit Symbol Consistency artinya satu simbol selalu bernilai sama dan berukuran sama di seluruh piktogram.",
      tambah(0, teks("jud", 150, 24, "Unit Symbol Consistency", 12, W.ungu)),
      tambah("simbol", apem("a1", 90, 76, 4, 14), apem("a2", 150, 76, 4, 14), apem("a3", 210, 76, 4, 14)),
      tambah("sama", teks("at", 150, 120, "satu simbol, satu nilai", 11, W.hijau)),
    ),
    k(
      "Kalau ukuran gambar berbeda, pembaca mengira nilainya berbeda, padahal nilai tiap gambar sama. Karena itu ukuran harus sama.",
      tambah("berbeda,", apem("b1", 90, 164, 4, 5), apem("b2", 150, 164, 4, 12), apem("b3", 210, 164, 4, 8)),
      tambah("mengira", teks("bt", 150, 196, "salah: ukuran berbeda", 10, W.merah)),
    ),
    k(
      "Potongan gambar boleh dipakai untuk sisa, asal sebanding. Setengah gambar bernilai setengah gambar utuh, dan seperempat gambar bernilai seperempat gambar utuh.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Potongan harus sebanding", 12, W.ungu)),
      tambah("Setengah", ...apem("q2", 110, 80, 2, 16), teks("q2t", 110, 116, "setengah", 9.4, W.biru)),
      tambah("seperempat", ...apem("q1", 190, 80, 1, 16), teks("q1t", 190, 116, "seperempat", 9.4, W.biru)),
    ),
    k(
      "Jika satu gambar mewakili 4, gambar utuh bernilai 4, tiga perempat bernilai 3, setengah bernilai 2, dan seperempat bernilai 1.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Nilai potongan, satu gambar = 4", 12, W.ungu)),
      tambah("utuh", potongan("u4", 46, 70, 4, "4")),
      tambah("tiga", potongan("u3", 114, 70, 3, "3")),
      tambah("setengah", potongan("u2", 182, 70, 2, "2")),
      tambah("seperempat", potongan("u1", 250, 70, 1, "1")),
    ),
  ],
};

/* ------------------------------ LB4. Unit Symbol Consistency: penerapan pada penjualan apem ------------------------------ */
export const ADEGAN_LUAR_SIMBOL_TERAPAN: AdeganStory = {
  id: "luarb-simbol-terapan",
  judul: "Menghitung nilai potongan pada hari Rabu dan Selasa",
  sumber: "Metode luar: potongan pada Rabu dan Selasa",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada hari Rabu yang terjual 30 kue. Jika satu gambar mewakili 4, gambarnya 7 apem utuh dan satu potongan setengah.",
      tambah(0, teks("jud", 150, 22, "Rabu terjual 30 kue, 1 gambar = 4", 12, W.ungu)),
      tambah("Rabu", barisApem("rb", 56, "Rabu", 30)),
      tambah("setengah.", teks("rbt", 150, 86, "7 utuh dan 1 setengah", 10, W.merah)),
    ),
    k(
      "Periksa: 7 dikali 4 sama dengan 28, lalu setengah gambar bernilai 2, dan 28 ditambah 2 sama dengan 30.",
      tambah("dikali", teks("p1", 150, 116, "7 x 4 = 28", 12, W.biru)),
      tambah("setengah", teks("p2", 150, 138, "setengah gambar = 2", 10.4, W.merah)),
      tambah("ditambah", teks("p3", 150, 164, "28 + 2 = 30", 13, W.hijau)),
    ),
    k(
      "Sekarang hari Selasa yang terjual 35 kue. Jika satu gambar mewakili 4, gambarnya 8 apem utuh dan satu potongan tiga perempat.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Selasa terjual 35 kue, 1 gambar = 4", 12, W.ungu)),
      tambah("Selasa", barisApem("sl", 56, "Selasa", 35)),
      tambah("tiga", teks("slt", 150, 86, "8 utuh dan 3 perempat", 10, W.merah)),
    ),
    k(
      "Periksa: 8 dikali 4 sama dengan 32, lalu tiga perempat gambar bernilai 3, dan 32 ditambah 3 sama dengan 35.",
      tambah("dikali", teks("p4", 150, 116, "8 x 4 = 32", 12, W.biru)),
      tambah("tiga", teks("p5", 150, 138, "tiga perempat gambar = 3", 10.4, W.merah)),
      tambah("ditambah", teks("p6", 150, 164, "32 + 3 = 35", 13, W.hijau)),
    ),
  ],
};
