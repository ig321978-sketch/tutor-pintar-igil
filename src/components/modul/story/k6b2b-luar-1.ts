import type { AdeganStory } from "./logika-story";
import { W, emo, kartu, kartuMetode, kepalaTabel, jalur, panah, pecahan, pengali, pengaliKiri, sel, teks } from "./k6b2b-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k6b2b-bantu";

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luarb2-pembuka",
  judul: "Empat metode luar untuk kesamaan rasio",
  sumber: "Metode dari luar buku; contoh dari Buku Siswa hlm. 56–65",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk Sub-Bab B. Metode ini membantu kita menyamakan rasio dan membandingkan harga dengan rapi.",
      tambah(0, teks("jud", 150, 26, "Sub-Bab B: Kesamaan Rasio", 12, W.ungu)),
      tambah("metode", emo("tel", 70, 100, "🔭", 42), teks("t1", 70, 124, "metode luar", 9, W.merah)),
      tambah("rasio", emo("hit", 150, 100, "🧮", 42), teks("t2", 150, 124, "samakan rasio", 9)),
      tambah("harga", emo("uang", 230, 100, "💰", 42), teks("t3", 230, 124, "banding harga", 9, W.hijau)),
    ),
    k(
      "Ada empat metode luar. Pertama, Equivalent Ratio Table, yaitu tabel rasio yang kedua kolomnya dikali atau dibagi bilangan yang sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah("Equivalent", kartuMetode("m1", 10, 30, "#FDE68A", ["Equivalent", "Ratio Table"], "kali atau bagi sama")),
    ),
    k(
      "Kedua, Fraction-Equivalence Bridge, yaitu menjembatani rasio dengan pecahan senilai dan memeriksanya dengan kali silang.",
      tambah("Fraction-Equivalence", kartuMetode("m2", 156, 30, "#FBCFE8", ["Fraction-Equivalence", "Bridge"], "jembatan pecahan")),
    ),
    k(
      "Ketiga, Unit Rate Method, yaitu mencari nilai untuk satu satuan lebih dulu. Keempat, Recipe Scaling Factor, yaitu faktor skala untuk memperbesar atau memperkecil resep.",
      tambah("Unit", kartuMetode("m3", 10, 112, "#BBF7D0", ["Unit Rate", "Method"], "nilai per satu")),
      tambah("Recipe", kartuMetode("m4", 156, 112, "#BFDBFE", ["Recipe Scaling", "Factor"], "faktor skala resep")),
    ),
  ],
};

/* ------------------------------ LB1. Equivalent Ratio Table: konsep ------------------------------ */
const X = 50;
const Y = 34;
const TW = 70;
const TH = 24;

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luarb2-tabel",
  judul: "Equivalent Ratio Table: kali atau bagi sama",
  sumber: "Metode dari luar buku; contoh lahan dan bibit, Buku Siswa hlm. 58–59",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Equivalent Ratio Table adalah tabel dua kolom, misalnya lahan dan bibit, dengan baris awal 10 dan 12.",
      tambah(0, teks("jud", 150, 22, "Equivalent Ratio Table", 11, W.ungu)),
      tambah("lahan", kepalaTabel("t", X, Y, TW, TH, ["Lahan (m²)", "Bibit"])),
      tambah(14, sel("t-r0a", X, Y + TH, TW, TH, "10")),
      tambah(16, sel("t-r0b", X + TW, Y + TH, TW, TH, "12")),
    ),
    k(
      "Aturan emasnya: kedua kolom dikali atau dibagi dengan bilangan yang sama. Bagi 2 menghasilkan baris 5 dan 6.",
      tambah("kedua", ...kartu("at", 40, 164, 220, 30, "#FEF9C3", ["kedua kolom: operasi yang sama"], 9.5)),
      tambah(12, pengali("m", 0, 1, X, Y, TW, TH, "÷ 2")),
      tambah(15, sel("t-r1a", X, Y + 2 * TH, TW, TH, "5", "#BBF7D0")),
      tambah(17, sel("t-r1b", X + TW, Y + 2 * TH, TW, TH, "6", "#BBF7D0")),
    ),
    k(
      "Dari 5 dan 6, kali 5 menghasilkan 25 dan 30. Dari baris awal, kali 5 langsung menghasilkan 50 dan 60.",
      tambah(4, pengali("n", 1, 2, X, Y, TW, TH, "× 5", W.hijau)),
      tambah(7, sel("t-r2a", X, Y + 3 * TH, TW, TH, "25", "#BBF7D0")),
      tambah(9, sel("t-r2b", X + TW, Y + 3 * TH, TW, TH, "30", "#BBF7D0")),
      tambah(13, pengaliKiri("o", 0, 3, X, Y, TH, "× 5", W.merah)),
      tambah(17, sel("t-r3a", X, Y + 4 * TH, TW, TH, "50", "#BFDBFE")),
      tambah(19, sel("t-r3b", X + TW, Y + 4 * TH, TW, TH, "60", "#BFDBFE")),
    ),
    k(
      "Menambah bilangan yang sama itu keliru. Jika 10 dan 12 sama-sama ditambah 3, hasilnya 13 dan 15, padahal 13 banding 15 bukan 5 banding 6.",
      bersih(0),
      tambah("keliru.", teks("jud2", 150, 26, "Menambah bilangan sama: keliru", 11, W.merah)),
      tambah(7, ...kartu("l", 20, 60, 100, 40, "#FEF9C3", ["10 : 12"], 14)),
      tambah("ditambah", panah("ap", 124, 80, 52, 0, W.merah, 3, { gambar: true }), teks("apt", 150, 70, "+ 3", 11, W.merah)),
      tambah(14, ...kartu("r", 180, 60, 100, 40, "#FEE2E2", ["13 : 15"], 14, W.merah)),
      tambah(22, teks("bk", 150, 150, "13 : 15 bukan 5 : 6", 13, W.merah)),
    ),
    k(
      "Selama kedua kolom diperlakukan sama, setiap baris pada tabel adalah rasio yang senilai.",
      bersih(0),
      tambah("Selama", ...kartu("a", 30, 24, 240, 36, "#DCFCE7", ["kali atau bagi kedua kolom sama"], 10)),
      tambah("baris", teks("r1", 150, 92, "10 : 12", 13), teks("r2", 150, 114, "5 : 6", 13), teks("r3", 150, 136, "25 : 30", 13), teks("r4", 150, 158, "50 : 60", 13)),
      tambah("senilai.", teks("eq", 150, 192, "semuanya rasio yang senilai", 10, W.hijau)),
      sorotkan("senilai.", "eq"),
    ),
  ],
};

/* ------------------------------ LB2. Equivalent Ratio Table: penerapan ------------------------------ */
export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luarb2-tabel-terapan",
  judul: "Equivalent Ratio Table: lahan 25 dan bibit 24",
  sumber: "Metode dari luar buku; penerapan Eksplorasi 2.3, Buku Siswa hlm. 57–59",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Terapan: luas lahan 25 meter persegi, berapa bibit? Mulai dari baris paling sederhana, yaitu 5 dan 6.",
      tambah(0, teks("jud", 150, 22, "Terapan: lahan 25 m²", 11, W.ungu)),
      tambah(0, kepalaTabel("t", X, Y, TW, TH, ["Lahan (m²)", "Bibit"])),
      tambah(3, sel("t-r1a", X, Y + 2 * TH, TW, TH, "25", "#FEF9C3")),
      tambah(7, sel("t-r1b", X + TW, Y + 2 * TH, TW, TH, "?", "#FEF9C3")),
      tambah(14, sel("t-r0a", X, Y + TH, TW, TH, "5")),
      tambah(16, sel("t-r0b", X + TW, Y + TH, TW, TH, "6")),
    ),
    k(
      "Cari pengali: dari 5 ke 25 adalah kali 5. Pengali yang sama dipakai untuk bibit: 6 kali 5 sama dengan 30.",
      tambah(7, pengali("m", 0, 1, X, Y, TW, TH, "× 5")),
      ubah(20, { id: "t-r1b-t", isi: "30" }),
      sorotkan("30.", "t-r1b-k"),
    ),
    k(
      "Arah sebaliknya: bibit 24, berapa lahan? Dari 6 ke 24 adalah kali 4, sehingga lahan 5 kali 4 sama dengan 20 meter persegi.",
      tambah(3, sel("t-r2b", X + TW, Y + 3 * TH, TW, TH, "24", "#BFDBFE")),
      tambah(5, sel("t-r2a", X, Y + 3 * TH, TW, TH, "?", "#BFDBFE")),
      tambah("kali", pengaliKiri("n", 0, 2, X, Y, TH, "× 4", W.merah)),
      ubah(20, { id: "t-r2a-t", isi: "20" }),
    ),
    k(
      "Periksa: 20 banding 24 dibagi 4 kembali menjadi 5 banding 6. Cocok.",
      tambah(1, teks("pk", 150, 176, "20 : 24", 13)),
      ubah(5, { id: "pk", isi: "20 : 24 ÷ 4" }),
      ubah(8, { id: "pk", isi: "20 : 24 ÷ 4 = 5 : 6" }),
      ubah("Cocok.", { id: "pk", isi: "20 : 24 ÷ 4 = 5 : 6  ✓", warna: W.hijau }),
    ),
  ],
};

/* ------------------------------ LB3. Fraction-Equivalence Bridge ------------------------------ */
export const ADEGAN_LUAR_JEMBATAN: AdeganStory = {
  id: "luarb2-jembatan",
  judul: "Fraction-Equivalence Bridge: kali silang",
  sumber: "Metode dari luar buku; contoh 10 per 12 dan 5 per 6, Buku Siswa hlm. 59–60",
  latar: "#F0FDFA",
  ketukan: [
    k(
      "Fraction-Equivalence Bridge menulis rasio sebagai pecahan. Rasio 10 banding 12 ditulis pecahan 10 per 12, dan 5 banding 6 ditulis 5 per 6.",
      tambah(0, teks("jud", 150, 22, "Fraction-Equivalence Bridge", 11, W.ungu)),
      tambah(12, pecahan("f1", 60, 96, "10", "12", 15)),
      tambah(20, pecahan("f2", 240, 96, "5", "6", 15)),
      tambah(21, jalur("br", 90, 84, "M0 0 Q60 -40 120 0", "none", W.biru, { gambar: true }), teks("q", 150, 66, "?", 14, W.merah)),
    ),
    k(
      "Apakah keduanya senilai? Periksa dengan kali silang: 10 kali 6 sama dengan 60, dan 12 kali 5 juga sama dengan 60.",
      tambah(6, panah("x1", 82, 88, 136, 24, W.merah, 2, { gambar: true }), panah("x2", 82, 112, 136, -24, W.hijau, 2, { gambar: true })),
      tambah(12, teks("c1", 90, 160, "10 × 6 = 60", 12, W.merah)),
      tambah(20, teks("c2", 210, 160, "12 × 5 = 60", 12, W.hijau)),
    ),
    k(
      "Hasil kali silang sama, jadi jembatannya kokoh: 10 per 12 senilai dengan 5 per 6.",
      ubah("kokoh:", { id: "q", isi: "=", warna: W.hijau }),
      sorotkan("kokoh:", "br"),
      tambah(14, teks("ok", 150, 192, "10 per 12 senilai dengan 5 per 6  ✓", 10, W.hijau)),
    ),
    k(
      "Sekarang periksa yang keliru: 13 per 15 dan 5 per 6. Kali silang 13 kali 6 sama dengan 78, tetapi 15 kali 5 sama dengan 75. Tidak sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Periksa yang keliru", 11, W.merah)),
      tambah(4, pecahan("g1", 60, 96, "13", "15", 15)),
      tambah(8, pecahan("g2", 240, 96, "5", "6", 15)),
      tambah(11, teks("ne", 150, 100, "≠", 22, W.merah)),
      tambah(18, teks("d1", 90, 150, "13 × 6 = 78", 12, W.merah)),
      tambah(25, teks("d2", 210, 150, "15 × 5 = 75", 12, W.merah)),
      tambah(26, teks("tk", 150, 188, "tidak senilai", 12, W.merah)),
    ),
    k(
      "Dengan jembatan ini, 30 per 36 juga senilai dengan 5 per 6, karena 30 kali 6 sama dengan 180, dan 36 kali 5 juga sama dengan 180.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Contoh lain dari buku", 11, W.ungu)),
      tambah(3, pecahan("h1", 60, 96, "30", "36", 15)),
      tambah(9, pecahan("h2", 240, 96, "5", "6", 15), teks("eq", 150, 100, "=", 22, W.hijau)),
      tambah(13, teks("e1", 90, 156, "30 × 6 = 180", 12, W.hijau)),
      tambah(20, teks("e2", 210, 156, "36 × 5 = 180", 12, W.hijau)),
    ),
  ],
};
