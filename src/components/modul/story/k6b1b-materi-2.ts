import type { AdeganStory } from "./logika-story";
import { W, bagi, botol, emo, gelas, kartu, panah, pecahan, teks } from "./k6b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b1b-bantu";

/* ------------------------------ 5. Berpikir kritis dan kreatif: cara Rini (hlm. 21 dan 22) ------------------------------ */
export const ADEGAN_RINI: AdeganStory = {
  id: "rini-kreatif",
  judul: "Ayo Berpikir Kritis dan Berpikir Kreatif",
  sumber: "Buku Siswa hlm. 21–22; Buku Panduan Guru hlm. 36–37",
  latar: "#FDF2F8",
  kutipan: [
    "Rini menyelesaikan pembagian pecahan dengan cara berikut",
    "Apakah cara yang dilakukan Rini tepat? Diskusikan dengan teman kalian",
    "Ayo Berpikir Kritis",
    "Ayo Berpikir Kreatif",
    "Buatlah sebuah cerita atau masalah lain yang menyatakan",
  ],
  ketukan: [
    k(
      "Ayo Berpikir Kritis. Rini menghitung empat per tiga dibagi 2 dengan cara ini: 4 dibagi 2 sama dengan 2, penyebut 3 tetap.",
      tambah(0, teks("jud", 150, 24, "Cara Rini", 12, W.ungu), emo("ri", 40, 100, "👧", 34)),
      tambah("Rini", teks("e1", 170, 100, "4/3 ÷ 2", 18)),
      tambah("tetap", teks("e2", 170, 140, "= (4 ÷ 2)/3 = 2/3", 15, W.merah)),
    ),
    k(
      "Apakah cara Rini tepat? Hasilnya benar. Empat per tiga berarti 4 potongan satu per tiga. Dibagi dua rata, tiap bagian mendapat 2 potongan, yaitu dua per tiga.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "4/3 berarti 4 potongan 1/3", 11, W.ungu), bagi("q", 30, 60, 240, 28, 4, 4, W.air)),
      tambah("potongan", teks("q0", 60, 78, "1/3", 10), teks("q1", 120, 78, "1/3", 10), teks("q2", 180, 78, "1/3", 10), teks("q3", 240, 78, "1/3", 10)),
      ubah("Dibagi", { id: "q2", warna: W.hijau }),
      tambah("tiap", teks("g1", 90, 118, "bagian 1: 2 potongan", 9.4, W.biru), teks("g2", 210, 118, "bagian 2: 2 potongan", 9.4, W.hijau)),
      tambah("yaitu", teks("gh", 150, 160, "2 potongan 1/3 = 2/3", 12, W.merah)),
    ),
    k(
      "Buku Panduan Guru menyatakan hasilnya benar. Cara membagi pembilang hanya mudah bila pembilang habis dibagi. Cara umum: kalikan dengan satu per 2.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Cara umum", 12, W.ungu)),
      tambah("Guru", kartu("pg", 16, 40, 268, 40, W.krem, ["pembilang dibagi langsung:", "mudah bila habis dibagi"], 9)),
      tambah("umum:", teks("cu", 150, 130, "4/3 × 1/2 = 4/6 = 2/3", 14, W.merah)),
    ),
    k(
      "Cara umum selalu berhasil. Misalnya tiga per empat dibagi 2. Pembilang 3 tidak habis dibagi 2, tetapi tiga per empat dikali satu per 2 menjadi tiga per delapan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pembilang tidak habis dibagi", 12, W.ungu)),
      tambah("Misalnya", teks("t1", 150, 80, "3/4 ÷ 2", 18)),
      tambah("tetapi", teks("t2", 150, 130, "= 3/4 × 1/2 = 3/8", 16, W.merah)),
    ),
    k(
      "Ayo Berpikir Kreatif. Buat cerita untuk satu per tiga dibagi 2. Misalnya, pita merah sepertiga meter dipotong menjadi 2 bagian sama panjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Cerita pita merah", 12, W.ungu)),
      tambah("pita", bagi("pt", 30, 80, 240, 26, 1, 1, W.merahMuda), emo("pe", 150, 150, "🎀", 30)),
      tambah("sepertiga", teks("pl", 150, 70, "pita 1/3 meter", 10, W.merah)),
      tambah("menjadi", teks("pb", 150, 190, "dipotong menjadi 2 bagian", 10, W.hijau)),
    ),
    k(
      "Setiap potongan pita panjangnya satu per enam meter, sebab satu per tiga dikali satu per 2 sama dengan satu per enam.",
      hapus("Setiap", "pt0"),
      hapus("Setiap", "pe"),
      tambah("Setiap", bagi("pu", 30, 80, 240, 26, 2, 2, W.merahMuda)),
      tambah("sebab", teks("hs", 150, 132, "1/3 ÷ 2 = 1/3 × 1/2 = 1/6", 13, W.ungu)),
      ubah("meter,", { id: "pb", isi: "tiap potong 1/6 meter" }),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 1.4 bagian a sampai c (hlm. 22 sampai 25) ------------------------------ */
const kolX = [14, 108, 202];

export const ADEGAN_EKSPLOR14A: AdeganStory = {
  id: "eks14a",
  judul: "Eksplorasi 1.4: 3 liter dibagi gelas kecil",
  sumber: "Buku Siswa hlm. 22–25",
  latar: "#FFF7ED",
  kutipan: [
    "2. Pembagian Bilangan Asli dengan Pecahan",
    "Agam menyiapkan 3 liter jus jeruk untuk acara keluarga di rumahnya",
    "gelas yang berkapasitas",
    "Berapa gelas jus jeruk yang disiapkan Agam",
    "Eksplorasi 1.4",
    "Banyak gelas",
    "Agam juga menyiapkan 3 liter jus jambu untuk acara tersebut",
    "Agam juga menyiapkan 3 liter air mineral untuk acara tersebut",
  ],
  ketukan: [
    k(
      "Bagian dua membagi bilangan asli dengan pecahan. Agam menyiapkan 3 liter jus jeruk untuk acara keluarga di rumahnya.",
      tambah(0, teks("jud", 150, 24, "2. Bilangan asli dibagi pecahan", 11, W.ungu)),
      tambah("Agam", botol("bj0", 100, 56, W.jeruk), botol("bj1", 143, 56, W.jeruk), botol("bj2", 186, 56, W.jeruk)),
      tambah("3", teks("l0", 107, 108, "1 L", 9), teks("l1", 150, 108, "1 L", 9), teks("l2", 193, 108, "1 L", 9)),
      tambah("jus", teks("lj", 150, 134, "3 liter jus jeruk", 11, W.jeruk)),
    ),
    k(
      "Jus itu dituang ke gelas berkapasitas satu per empat liter. Berapa gelas yang disiapkan Agam?",
      tambah("gelas", gelas("gk", 112, 150, W.jeruk)),
      tambah("satu", pecahan("pk", 160, 164, "1", "4", 10, W.merah), teks("pkl", 182, 168, "liter", 9)),
      tambah("Berapa", teks("br", 150, 202, "berapa gelas?", 10, W.merah)),
    ),
    k(
      "Tiap 1 liter dibagi menjadi 4 bagian satu per empat. Ada 3 liter, jadi ada tiga kali empat bagian.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tiap liter dibagi 4", 12, W.ungu)),
      tambah("liter", bagi("ba", kolX[0], 70, 84, 26, 4, 4, W.jeruk), teks("na", 56, 62, "1 liter", 9)),
      tambah("Ada", bagi("bb", kolX[1], 70, 84, 26, 4, 4, W.jeruk), teks("nb", 150, 62, "1 liter", 9)),
      tambah("jadi", bagi("bc", kolX[2], 70, 84, 26, 4, 4, W.jeruk), teks("nc", 244, 62, "1 liter", 9)),
      tambah("kali", teks("n4", 150, 130, "3 × 4 bagian", 12, W.merah)),
    ),
    k(
      "Seluruhnya ada 12 gelas satu per empat liter. Dalam bentuk matematika, 3 dibagi satu per empat sama dengan 12.",
      tambah("Seluruhnya", teks("s12", 150, 150, "12 gelas 1/4 liter", 12, W.hijau)),
      tambah("matematika", teks("m12", 150, 186, "3 ÷ 1/4 = 12", 17, W.ungu)),
    ),
    k(
      "Bagian b: jus jambu 3 liter dituang ke gelas setengah liter. Tiap liter berisi 2 gelas, jadi 3 kali 2 sama dengan 6 gelas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Bagian b: jus jambu", 12, W.ungu)),
      tambah("jambu", bagi("ba", kolX[0], 70, 84, 26, 2, 2, "#86EFAC"), bagi("bb", kolX[1], 70, 84, 26, 2, 2, "#86EFAC"), bagi("bc", kolX[2], 70, 84, 26, 2, 2, "#86EFAC")),
      tambah("setengah", teks("sg", 150, 118, "gelas 1/2 liter", 10, W.hijau)),
      tambah("kali", teks("n2", 150, 146, "3 × 2 = 6 gelas", 12, W.merah)),
      tambah("sama", teks("m6", 150, 184, "3 ÷ 1/2 = 6", 17, W.ungu)),
    ),
    k(
      "Bagian c: air mineral 3 liter dituang ke gelas satu per lima liter. Tiap liter berisi 5 gelas, jadi 3 kali 5 sama dengan 15 gelas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Bagian c: air mineral", 12, W.ungu)),
      tambah("mineral", bagi("ba", kolX[0], 70, 84, 26, 5, 5, W.air), bagi("bb", kolX[1], 70, 84, 26, 5, 5, W.air), bagi("bc", kolX[2], 70, 84, 26, 5, 5, W.air)),
      tambah("lima", teks("sg", 150, 118, "gelas 1/5 liter", 10, W.biru)),
      tambah("kali", teks("n5", 150, 146, "3 × 5 = 15 gelas", 12, W.merah)),
      tambah("sama", teks("m15", 150, 184, "3 ÷ 1/5 = 15", 17, W.ungu)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 1.4 bagian d dan e, pembahasan (hlm. 24 sampai 27) ------------------------------ */
export const ADEGAN_EKSPLOR14B: AdeganStory = {
  id: "eks14b",
  judul: "Eksplorasi 1.4 bagian d dan e, lalu aturan kebalikan",
  sumber: "Buku Siswa hlm. 24–28",
  latar: "#F5F3FF",
  kutipan: [
    "Yang dapat saya simpulkan adalah",
    "Agam memiliki 3 liter air mineral",
    "botol yang berkapasitas",
    "Mengapa ketika membagi bilangan asli dengan pecahan menghasilkan bilangan",
    "Dalam 1 liter air terdapat 4 bagian dari",
    "Dalam 3 liter air terdapat 12 bagian dari",
    "Ingat kembali pembelajaran perkalian pecahan sebelumnya",
    "Membagi bilangan asli dengan pecahan berarti menentukan banyaknya",
    "Untuk membagi bilangan dengan pecahan, kalian dapat mengalikan",
    "bilangan asli dengan kebalikan dari pecahan",
  ],
  ketukan: [
    k(
      "Bagian d. Dari tiga kegiatan tadi, hasilnya selalu lebih besar daripada 3, sebab kita menghitung bagian pecahan di dalam 3 liter.",
      tambah(0, teks("jud", 150, 24, "Bagian d: apa kesimpulannya?", 12, W.ungu)),
      tambah("kegiatan", teks("r1", 150, 66, "3 ÷ 1/4 = 12", 15)),
      tambah("hasil", teks("r2", 150, 100, "3 ÷ 1/2 = 6", 15)),
      tambah("selalu", teks("r3", 150, 134, "3 ÷ 1/5 = 15", 15)),
      tambah("menghitung", teks("r4", 150, 176, "hasil lebih besar dari 3", 11, W.merah)),
    ),
    k(
      "Bagian e. Agam punya 3 liter air mineral dan botol berkapasitas dua per lima liter. Berapa botol yang diperoleh Agam?",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Bagian e: 3 ÷ 2/5", 12, W.ungu)),
      tambah("liter", bagi("ba", kolX[0], 70, 84, 26, 5, 2, W.air), bagi("bb", kolX[1], 70, 84, 26, 5, 2, W.air), bagi("bc", kolX[2], 70, 84, 26, 5, 2, W.air)),
      tambah("botol", teks("bt", 150, 118, "1 botol = 2/5 liter", 10, W.biru)),
      tambah("Berapa", teks("br", 150, 190, "berapa botol?", 11, W.merah)),
    ),
    k(
      "Dalam 1 liter ada lima per dua bagian dari dua per lima liter, yaitu 2 dan setengah.",
      hapus("Dalam", "br"),
      tambah("lima", teks("h1", 150, 150, "1 ÷ 2/5 = 5/2 = 2½", 15, W.ungu)),
      tambah("setengah", teks("h2", 150, 182, "2 botol dan setengah botol", 10, W.hijau)),
    ),
    k(
      "Untuk 3 liter ada 3 kali lima per dua, yaitu lima belas per dua, atau tujuh setengah.",
      tambah("Untuk", teks("h3", 150, 206, "3 × 5/2 = 15/2 = 7½", 13, W.merah)),
      ubah("Untuk", { id: "h2", op: 0 }, { id: "h3", y: 182 }),
    ),
    k(
      "Jadi 3 dibagi dua per lima sama dengan 7 setengah. Ada 7 botol penuh, dan satu botol lagi hanya terisi setengahnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Jadi, hasilnya", 12, W.ungu)),
      tambah("dibagi", teks("j1", 150, 76, "3 ÷ 2/5 = 15/2 = 7½", 18, W.ungu)),
      tambah("Ada", teks("j2", 150, 118, "7 botol penuh", 13, W.hijau)),
      tambah("setengahnya", teks("j3", 150, 154, "+ 1/2 botol", 13, W.merah)),
    ),
    k(
      "Mengapa hasilnya lebih besar? Karena yang dihitung adalah banyak bagian pecahan, dan bagian pecahan itu kecil.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Mengapa hasilnya lebih besar?", 12, W.ungu)),
      tambah("Mengapa", kartu("ib", 20, 44, 100, 70, W.krem, ["bilangan asli", "(besar)"], 10)),
      tambah("dihitung", ...bagi("kc", 140, 60, 140, 16, 7, 7, W.hijauMuda)),
      tambah("kecil.", teks("ks", 210, 100, "bagian pecahan kecil,", 9, W.hijau), teks("ks2", 210, 114, "jadi banyak bagiannya", 9, W.hijau)),
    ),
    k(
      "Ingat perkalian pecahan: 12 bagian satu per empat liter dapat menghasilkan 3 liter, yaitu 12 kali satu per empat sama dengan 3.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Ingat kembali perkalian pecahan", 12, W.ungu)),
      tambah("Ingat", teks("p1", 150, 84, "12 × 1/4 = 3", 20, W.hijau)),
      tambah("sama", teks("p2", 150, 134, "3 ÷ 1/4 = 12", 20, W.ungu)),
    ),
    k(
      "Pecahan yang atas dan bawahnya ditukar disebut kebalikan. Kebalikan satu per empat adalah 4, dan kebalikan dua per lima adalah lima per dua.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Kebalikan pecahan", 12, W.ungu)),
      tambah("ditukar", pecahan("k1", 60, 80, "1", "4", 14, W.biru), panah("pk", 90, 84, 40, 0, W.merah, 2, { gambar: true }), teks("k1h", 150, 92, "4", 18, W.merah)),
      tambah("dua", pecahan("k2", 60, 150, "2", "5", 14, W.biru), panah("pl", 90, 154, 40, 0, W.merah, 2, { gambar: true })),
      tambah("lima", pecahan("k2h", 150, 150, "5", "2", 14, W.merah)),
    ),
    k(
      "Aturannya: membagi bilangan asli dengan pecahan sama dengan mengalikan bilangan asli itu dengan kebalikan pecahannya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Aturan buku", 12, W.ungu)),
      tambah("Aturannya", kartu("ar", 16, 52, 268, 56, W.krem, ["a ÷ b/c = a × c/b"], 17)),
      tambah("kebalikan", teks("ar2", 150, 146, "pembagi dibalik, ÷ menjadi ×", 11, W.merah)),
      sorotkan("kebalikan", "ar-k"),
    ),
  ],
};
