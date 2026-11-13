import type { AdeganStory } from "./logika-story";
import { W, bagi, emo, idBagi, kartu, kartuMetode, kotak, panah, pecahan, teks } from "./k6b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b1b-bantu";

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
export const ADEGAN_LUAR_B_PEMBUKA: AdeganStory = {
  id: "luarb1-pembuka",
  judul: "Empat metode luar untuk pembagian pecahan",
  sumber: "Metode dari luar buku; contoh pembagian pecahan Sub-Bab B",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk Sub-Bab B. Metode ini membantu kita membagi pecahan dengan cepat dan memeriksa hasilnya.",
      tambah(0, teks("jud", 150, 26, "Sub-Bab B: Pembagian Pecahan", 12, W.ungu)),
      tambah("metode", emo("e1", 70, 100, "🔭", 42), teks("t1", 70, 124, "metode luar", 9, W.merah)),
      tambah("membagi", emo("e2", 150, 100, "🧮", 42), teks("t2", 150, 124, "bagi dengan cepat", 9)),
      tambah("memeriksa", emo("e3", 230, 100, "🎯", 42), teks("t3", 230, 124, "periksa hasil", 9, W.hijau)),
    ),
    k(
      "Ada empat metode luar. Pertama, Partition Division, yaitu memotong setiap bagian pecahan menjadi bagian yang lebih kecil.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah("Partition", kartuMetode("m1", 10, 30, "#FDE68A", ["Partition", "Division"], "potong lebih kecil")),
    ),
    k(
      "Kedua, Reciprocal Flip, yaitu menukar atas dan bawah pecahan pembagi sehingga pembagian menjadi perkalian.",
      tambah("Reciprocal", kartuMetode("m2", 156, 30, "#FBCFE8", ["Reciprocal", "Flip"], "balik pembagi")),
    ),
    k(
      "Ketiga, Cross-Arrow Divide, yaitu menyilangkan panah kali. Keempat, Repeated-Subtraction Measurement, yaitu mengurangkan pembagi berulang kali.",
      tambah("Cross-Arrow", kartuMetode("m3", 10, 112, "#BBF7D0", ["Cross-Arrow", "Divide"], "panah silang")),
      tambah("Repeated-Subtraction", kartuMetode("m4", 156, 112, "#BFDBFE", ["Repeated-Subtraction", "Measurement"], "kurangi berulang")),
    ),
  ],
};

/* ------------------------------ LB1. Partition Division: konsep ------------------------------ */
export const ADEGAN_LUAR_B_PARTISI: AdeganStory = {
  id: "luarb1-partisi",
  judul: "Partition Division: potong tiap bagian",
  sumber: "Metode dari luar buku; contoh dua per lima dibagi 3",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Partition Division dipakai untuk pecahan dibagi bilangan asli. Idenya, potong setiap bagian pecahan menjadi bagian yang lebih kecil.",
      tambah(0, teks("jud", 150, 22, "Partition Division", 12, W.ungu)),
      tambah("pecahan", bagi("p", 30, 70, 240, 28, 5, 2, W.air), teks("pt", 150, 60, "2/5 dibagi 3", 11, W.merah)),
    ),
    k(
      "Ambil dua per lima dibagi 3. Setiap per lima kita potong menjadi 3 bagian sama besar.",
      hapus("Setiap", idBagi("p", 5)),
      tambah("Setiap", bagi("q", 30, 70, 240, 28, 15, 6, W.air)),
      sorotkan("potong", "q0"),
    ),
    k(
      "Sekarang seluruh kotak punya 15 bagian, karena 5 kali 3 sama dengan 15. Penyebut berubah menjadi 15.",
      tambah("15", teks("n15", 150, 122, "15 bagian", 11, W.hijau)),
      tambah("5", teks("kl", 150, 150, "5 × 3 = 15", 15, W.ungu)),
    ),
    k(
      "Bagian berwarna ada 6 petak. Dibagi rata untuk 3 pihak, tiap pihak mendapat 2 petak.",
      tambah("berwarna", teks("n6", 150, 182, "6 petak berwarna", 11, W.merah)),
      sorotkan("Dibagi", "q0", "q1", "q2", "q3", "q4", "q5"),
      ubah("pihak,", { id: "q2", warna: W.hijauMuda }, { id: "q3", warna: W.hijauMuda }, { id: "q4", warna: W.krem }, { id: "q5", warna: W.krem }),
      tambah("pihak,", teks("d2", 150, 206, "tiap pihak: 2 petak", 10, W.hijau)),
    ),
    k(
      "Jadi dua per lima dibagi 3 sama dengan dua per lima belas. Aturan: pembilang tetap, penyebut dikali bilangan pembagi.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Aturan Partition Division", 12, W.ungu)),
      tambah("Jadi", teks("r1", 150, 80, "2/5 ÷ 3 = 2/(5 × 3) = 2/15", 15, W.ungu)),
      tambah("Aturan:", kartu("ar", 30, 112, 240, 44, W.krem, ["pembilang tetap", "penyebut dikali pembagi"], 10)),
    ),
  ],
};

/* ------------------------------ LB2. Partition Division: penerapan ------------------------------ */
export const ADEGAN_LUAR_B_PARTISI_TERAPAN: AdeganStory = {
  id: "luarb1-partisi-terapan",
  judul: "Partition Division: pita tiga per empat meter",
  sumber: "Metode dari luar buku; contoh pita dibagi untuk 2 adik",
  latar: "#FEF2F2",
  ketukan: [
    k(
      "Terapan: pita sepanjang tiga per empat meter dibagi sama panjang untuk 2 adik. Berapa meter tiap adik?",
      tambah(0, teks("jud", 150, 22, "Terapan: pita untuk 2 adik", 12, W.ungu)),
      tambah("pita", bagi("p", 30, 70, 240, 28, 4, 3, W.merahMuda), emo("pe", 150, 140, "🎀", 28)),
      tambah("meter", teks("pt", 150, 60, "pita 3/4 meter", 11, W.merah)),
      tambah("Berapa", teks("pq", 150, 182, "berapa meter tiap adik?", 11, W.merah)),
    ),
    k(
      "Potong tiap per empat menjadi 2 bagian. Kotak seluruhnya menjadi 8 bagian, dan pita berwarna ada 6 bagian.",
      hapus("Potong", idBagi("p", 4)),
      hapus("Potong", "pe"),
      tambah("Potong", bagi("q", 30, 70, 240, 28, 8, 6, W.merahMuda)),
      tambah("Kotak", teks("n8", 150, 122, "8 bagian sama besar", 10, W.hijau)),
      tambah("berwarna", teks("n6", 150, 108, "6 bagian berwarna", 9, W.merah)),
    ),
    k(
      "Bagi 6 bagian itu untuk 2 adik: tiap adik mendapat 3 bagian dari 8.",
      ubah("Bagi", { id: "q3", warna: W.air }, { id: "q4", warna: W.air }, { id: "q5", warna: W.air }),
      tambah("adik:", teks("a1", 80, 150, "adik 1: 3/8", 10, W.merah), teks("a2", 220, 150, "adik 2: 3/8", 10, W.biru)),
    ),
    k(
      "Hitung dengan aturan: pembilang 3 tetap, penyebut 4 kali 2 sama dengan 8. Hasilnya tiga per delapan meter.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Aturan Partition Division", 12, W.ungu)),
      tambah("pembilang", teks("h1", 150, 80, "3/4 ÷ 2 = 3/(4 × 2)", 15, W.ungu)),
      tambah("Hasilnya", teks("h2", 150, 124, "= 3/8 meter", 17, W.hijau)),
    ),
    k(
      "Periksa dengan perkalian: tiga per delapan kali 2 sama dengan enam per delapan, sama dengan tiga per empat. Cocok.",
      tambah("Periksa", teks("h3", 150, 170, "3/8 × 2 = 6/8 = 3/4", 15, W.merah)),
      sorotkan("Cocok.", "h3"),
    ),
  ],
};

/* ------------------------------ LB3. Reciprocal Flip: konsep ------------------------------ */
export const ADEGAN_LUAR_B_BALIK: AdeganStory = {
  id: "luarb1-balik",
  judul: "Reciprocal Flip: balik pembagi",
  sumber: "Metode dari luar buku; kebalikan dan kali kebalikan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Reciprocal Flip: kebalikan adalah pecahan yang atas dan bawahnya ditukar. Pembagian dengan pecahan menjadi perkalian dengan kebalikannya.",
      tambah(0, teks("jud", 150, 22, "Reciprocal Flip", 12, W.ungu)),
      tambah("atas", pecahan("f", 100, 90, "a", "b", 18, W.biru), panah("pf", 130, 94, 40, 0, W.merah, 2, { gambar: true })),
      tambah("ditukar.", pecahan("g", 200, 90, "b", "a", 18, W.merah)),
      tambah("perkalian", teks("pk", 150, 160, "÷ pecahan = × kebalikan", 12, W.hijau)),
    ),
    k(
      "Kebalikan dua per tiga adalah tiga per dua. Kebalikan satu per tujuh adalah 7.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Contoh kebalikan", 12, W.ungu)),
      tambah("dua", pecahan("a1", 60, 70, "2", "3", 16, W.biru), panah("a2", 90, 74, 40, 0, W.merah, 2, { gambar: true })),
      tambah("tiga", pecahan("a3", 160, 70, "3", "2", 16, W.merah)),
      tambah("satu", pecahan("b1", 60, 140, "1", "7", 16, W.biru), panah("b2", 90, 144, 40, 0, W.merah, 2, { gambar: true })),
      tambah("7.", teks("b3", 160, 152, "7", 20, W.merah)),
    ),
    k(
      "Bilangan asli ditulis sebagai pecahan berpenyebut 1. Jadi 5 sama dengan lima per satu, dan kebalikannya satu per lima.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Bilangan asli", 12, W.ungu)),
      tambah("asli", teks("c1", 150, 70, "5 = 5/1", 22, W.biru)),
      tambah("kebalikannya", teks("c2", 150, 120, "kebalikan 5/1 adalah 1/5", 14, W.merah)),
      tambah("lima.", teks("c3", 150, 160, "ada angka 1 di bawah", 10, W.hijau)),
    ),
    k(
      "Langkahnya tiga. Satu, tulis soal. Dua, balik pembagi saja. Tiga, ubah bagi menjadi kali.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tiga langkah", 12, W.ungu)),
      tambah("Satu,", kartu("l1", 16, 40, 268, 36, W.muda, ["1. tulis soal"], 10)),
      tambah("Dua,", kartu("l2", 16, 84, 268, 36, W.hijauMuda, ["2. balik pembagi saja"], 10)),
      tambah("tiga@2", kartu("l3", 16, 128, 268, 36, W.krem, ["3. ubah bagi menjadi kali"], 10)),
    ),
    k(
      "Ingat, hanya pembagi yang dibalik. Bilangan yang dibagi tetap seperti semula.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Awas, jangan keliru", 12, W.ungu)),
      tambah("pembagi", teks("w1", 150, 80, "a ÷ b/c", 20, W.biru), kotak("w2", 168, 56, 52, 34, "none", W.merah, { putus: true, rx: 6 })),
      tambah("tetap", teks("w3", 150, 130, "a tetap, b/c dibalik", 12, W.merah), teks("w4", 150, 166, "a × c/b", 20, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB4. Reciprocal Flip: penerapan ------------------------------ */
export const ADEGAN_LUAR_B_BALIK_TERAPAN: AdeganStory = {
  id: "luarb1-balik-terapan",
  judul: "Reciprocal Flip: tali 9 meter",
  sumber: "Metode dari luar buku; contoh tali dipotong tiap tiga per empat meter",
  latar: "#F0FDFA",
  ketukan: [
    k(
      "Terapan: tali 9 meter dipotong tiap tiga per empat meter. Ada berapa potong?",
      tambah(0, teks("jud", 150, 22, "Terapan: tali 9 meter", 12, W.ungu)),
      tambah("tali", kotak("tl", 30, 70, 240, 14, W.emas, W.coklat, { rx: 4 }), teks("t9", 150, 62, "tali 9 meter", 11)),
      tambah("tiap", emo("gt", 150, 124, "✂", 30), teks("t34", 150, 150, "tiap potong 3/4 meter", 11, W.merah)),
      tambah("Ada", teks("tq", 150, 188, "berapa potong?", 12, W.merah)),
    ),
    k(
      "Tulis soalnya: 9 dibagi tiga per empat. Pembagi tiga per empat dibalik menjadi empat per tiga.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Balik pembagi", 12, W.ungu)),
      tambah("Tulis", teks("s1", 150, 80, "9 ÷ 3/4", 22)),
      tambah("dibalik", teks("s2", 150, 130, "3/4 menjadi 4/3", 15, W.merah)),
    ),
    k(
      "Ubah menjadi kali: 9 kali empat per tiga sama dengan 36 per 3.",
      tambah("Ubah", teks("s3", 150, 176, "9 × 4/3 = 36/3", 18, W.hijau)),
    ),
    k(
      "Tiga puluh enam dibagi 3 sama dengan 12. Jadi ada 12 potong tali.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hasil", 12, W.ungu)),
      tambah("Tiga", teks("u1", 150, 80, "9 ÷ 3/4 = 9 × 4/3 = 36/3 = 12", 15, W.ungu)),
      tambah("ada", teks("u2", 150, 130, "12 potong tali", 18, W.hijau)),
    ),
    k(
      "Periksa: 12 potong kali tiga per empat meter sama dengan 36 per 4, yaitu 9 meter. Cocok.",
      tambah("Periksa:", teks("u3", 150, 176, "12 × 3/4 = 36/4 = 9 meter", 14, W.merah)),
      sorotkan("Cocok.", "u3"),
    ),
  ],
};
