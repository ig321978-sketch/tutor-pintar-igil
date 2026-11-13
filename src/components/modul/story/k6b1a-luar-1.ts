import type { AdeganStory } from "./logika-story";
import { W, emo, ember, frac, judul, kartu, kotak, lajur, idLajur, panah, teks } from "./k6b1a-gambar";
import { bersih, hapus, k, sorotkan, tambah, warnai } from "./k6b1a-bantu";

/** Tiga petak 1 meter persegi berisi lima lajur, id lajur `${id}${n}-${i}`. */
const petak = (id: string, x: number, y: number, w: number) => lajur(id, x, y, w, 12, 5);

/* ------------------------------ LA0. Empat metode luar Subbab A ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode luar untuk perkalian pecahan",
  sumber: "Metode luar buku; contoh dari Buku Siswa hlm. 7–16",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk Subbab A, yaitu cara tambahan di luar buku agar perkalian pecahan lebih mudah dipahami dan diperiksa.",
      tambah("metode", emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)),
      tambah("Subbab", emo("buku", 220, 100, "📘", 44), teks("l2", 220, 132, "Subbab A", 9)),
      tambah("diperiksa.", panah("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true })),
    ),
    k(
      "Pertama, Area Model Multiplication, perkalian dengan model luas. Kedua, Whole-as-Fraction, yaitu menulis bilangan asli sebagai pecahan berpenyebut satu.",
      bersih(0),
      tambah(0, judul("Empat metode luar")),
      tambah("Pertama", kartu("m1", 10, 34, 134, 66, "#FDE68A", ["Area Model", "Multiplication", "model luas"], 8.6)),
      tambah("Kedua", kartu("m2", 156, 34, 134, 66, "#FBCFE8", ["Whole-as-Fraction", "bilangan asli", "pecahan berpenyebut 1"], 8.6)),
    ),
    k(
      "Ketiga, Straight-Arrow Multiply, perkalian dengan panah lurus. Keempat, Commutative Multiply Check, pemeriksaan dengan menukar urutan kali.",
      tambah("Ketiga", kartu("m3", 10, 112, 134, 66, "#BBF7D0", ["Straight-Arrow", "Multiply", "panah lurus"], 8.6)),
      tambah("Keempat", kartu("m4", 156, 112, 134, 66, "#BFDBFE", ["Commutative", "Multiply Check", "tukar urutan kali"], 8.6)),
    ),
    k(
      "Setiap metode kita pelajari dalam dua bagian, yaitu konsep lalu penerapan, dengan contoh dari kebun Agam dan soal-soal buku.",
      bersih(0),
      tambah(0, judul("konsep, lalu penerapan")),
      tambah("konsep", ...kartu("c1", 30, 60, 100, 50, "#FEF9C3", ["konsep", "cara kerja"], 10)),
      tambah("penerapan", panah("cp", 134, 85, 32, 0, W.hijau, 3, { gambar: true }), ...kartu("c2", 170, 60, 100, 50, "#DCFCE7", ["penerapan", "soal buku"], 10)),
      tambah("Agam", emo("ag", 150, 168, "👦", 32)),
    ),
  ],
};

/* ------------------------------ LA1. Area Model Multiplication: konsep ------------------------------ */
export const ADEGAN_LUAR_AREA: AdeganStory = {
  id: "luar-area",
  judul: "Area Model Multiplication: konsep",
  sumber: "Metode luar 1: perkalian dengan model luas",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Metode pertama, Area Model Multiplication, atau perkalian dengan model luas. Kita menggambar sebuah petak satu satuan, lalu mengarsir bagian-bagiannya.",
      tambah(0, judul("Area Model Multiplication")),
      tambah("petak", kotak("pt", 110, 38, 80, 80, W.krem, W.hijau, { rx: 3, tebal: 2 }), teks("ptt", 150, 84, "1 petak", 11, W.hijau)),
      tambah("mengarsir", teks("pu", 150, 146, "petak = 1 satuan", 10, W.ungu)),
    ),
    k(
      "Langkah satu, bagi petak menjadi bagian sama sesuai penyebut. Untuk satu per lima, petak dibagi 5 lajur.",
      bersih(0),
      tambah(0, judul("langkah 1: bagi sesuai penyebut")),
      tambah("petak", lajur("ar", 90, 36, 90, 16, 5), teks("pb", 150, 150, "5 lajur sama besar", 10, W.hijau)),
      tambah("satu@2", ...frac("p15", 240, 80, 1, 5, 18, W.merah), teks("p15t", 240, 116, "tiap lajur", 8.6, W.merah)),
    ),
    k(
      "Langkah dua, arsir sesuai pembilang. Untuk tiga per lima, arsir 3 lajur.",
      bersih(0),
      tambah(0, judul("langkah 2: arsir sesuai pembilang")),
      tambah(0, lajur("ar", 90, 36, 90, 16, 5)),
      warnai("arsir", W.daun, ...idLajur("ar", 2, 4)),
      tambah("3", teks("pc", 150, 150, "3 lajur diarsir = 3/5", 11, W.hijau)),
    ),
    k(
      "Langkah tiga, ulangi arsiran sebanyak bilangan asli. Untuk 2 kali tiga per lima, ada 2 petak dengan arsiran yang sama.",
      bersih(0),
      tambah(0, judul("langkah 3: ulangi arsiran")),
      tambah(0, lajur("ar", 30, 36, 90, 16, 5), lajur("as", 180, 36, 90, 16, 5)),
      warnai(0, W.daun, ...idLajur("ar", 2, 4)),
      warnai("2@2", W.daun, ...idLajur("as", 2, 4)),
      tambah("kali", teks("pd", 150, 150, "2 × 3/5 : 2 petak", 12, W.biru)),
    ),
    k(
      "Langkah empat, hitung semua lajur yang diarsir, yaitu 6. Tuliskan sebagai pecahan dengan penyebut yang sama. Hasilnya enam per lima.",
      sorotkan("hitung", ...idLajur("ar", 2, 4), ...idLajur("as", 2, 4)),
      tambah("6", teks("pe", 150, 176, "6 lajur = 6/5", 15, W.merah)),
    ),
  ],
};

/* ------------------------------ LA2. Area Model Multiplication: penerapan ------------------------------ */
export const ADEGAN_LUAR_AREA_TERAPAN: AdeganStory = {
  id: "luar-area-terapan",
  judul: "Area Model Multiplication: penerapan pada ember kecil",
  sumber: "Metode luar 1: penerapan pada soal ember kecil",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapan. Tiap ember kecil menyiram dua per lima meter persegi. Berapa luas kebun yang disiram dengan 3 ember?",
      tambah(0, judul("penerapan: 3 ember kecil")),
      tambah("ember", ember("e0", 60, 66, "#EA580C", 1.8), ember("e1", 150, 66, "#EA580C", 1.8), ember("e2", 240, 66, "#EA580C", 1.8)),
      tambah("dua", ...frac("fe", 150, 128, 2, 5, 18, W.merah), teks("fet", 150, 160, "m² tiap ember", 9, W.merah)),
      tambah("3", teks("e3", 150, 190, "3 ember", 12, W.ungu)),
    ),
    k(
      "Gambar 3 petak. Setiap petak dibagi 5 lajur, dan di tiap petak diarsir 2 lajur.",
      bersih(0),
      tambah(0, judul("gambar 3 petak")),
      tambah("petak", petak("a", 20, 40, 70), petak("b", 115, 40, 70), petak("c", 210, 40, 70)),
      warnai("diarsir", W.daun, ...idLajur("a", 3, 4), ...idLajur("b", 3, 4), ...idLajur("c", 3, 4)),
      tambah("lajur", teks("l5", 150, 130, "tiap petak: 5 lajur, 2 diarsir", 10, W.hijau)),
    ),
    k(
      "Hitung semua lajur arsiran: 2 tambah 2 tambah 2 menjadi 6 lajur.",
      sorotkan("Hitung", ...idLajur("a", 3, 4), ...idLajur("b", 3, 4), ...idLajur("c", 3, 4)),
      tambah("menjadi", teks("sj", 150, 172, "2 + 2 + 2 = 6 lajur", 15, W.merah)),
    ),
    k(
      "Tiap lajur adalah satu per lima meter persegi, jadi hasilnya enam per lima meter persegi.",
      hapus("Tiap", "l5"),
      tambah("hasilnya", teks("sk", 150, 196, "6 × 1/5 = 6/5 m²", 14, W.biru)),
    ),
    k(
      "Karena 6 lebih dari 5, hasilnya lebih dari satu petak penuh. Cocok dengan aturan buku: 3 kali 2 menjadi 6, penyebut tetap 5.",
      bersih(0),
      tambah(0, judul("periksa dengan aturan buku")),
      tambah("Cocok", teks("pr", 150, 80, "3 × 2/5 = 6/5", 22, W.merah)),
      tambah("lebih", teks("pn", 150, 128, "6 lajur > 5 lajur: lebih dari 1 petak", 10, W.hijau)),
      tambah("tetap", emo("ok", 150, 176, "✅", 34)),
    ),
  ],
};

/* ------------------------------ LA3. Whole-as-Fraction: konsep ------------------------------ */
export const ADEGAN_LUAR_BULAT: AdeganStory = {
  id: "luar-bulat",
  judul: "Whole-as-Fraction: konsep",
  sumber: "Metode luar 2: bilangan asli sebagai pecahan berpenyebut satu",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Metode kedua, Whole-as-Fraction, yaitu menulis bilangan asli sebagai pecahan berpenyebut satu, supaya dua bilangan sama-sama berbentuk pecahan.",
      tambah(0, judul("Whole-as-Fraction")),
      tambah("menulis", teks("w1", 80, 90, "bilangan asli", 11, W.biru), panah("wp", 120, 86, 56, 0, W.hijau, 3, { gambar: true })),
      tambah("pecahan", ...frac("w2", 230, 90, "a", 1, 22, W.merah)),
    ),
    k(
      "Contohnya, 4 sama dengan empat per satu, sebab 4 petak utuh tidak perlu dibagi lagi.",
      bersih(0),
      tambah(0, judul("4 sama dengan 4 per 1")),
      tambah("petak", ...[0, 1, 2, 3].map((i) => kotak(`w${i}`, 40 + i * 54, 40, 48, 48, W.krem, W.hijau, { rx: 3, tebal: 1.8 }))),
      tambah("empat", teks("wq", 150, 128, "4 = 4/1", 20, W.merah)),
    ),
    k(
      "Langkah satu, tulis bilangan asli sebagai pecahan berpenyebut satu, lalu beri kotak merah agar tidak lupa.",
      bersih(0),
      tambah(0, judul("langkah 1: tulis dan beri kotak")),
      tambah("tulis", kotak("kb", 56, 60, 60, 60, W.putih, W.merah, { rx: 6, tebal: 2.4 }), ...frac("a1", 86, 92, "a", 1, 22, W.merah)),
      tambah("kotak", teks("kx", 140, 96, "×", 22, W.biru), ...frac("a2", 190, 92, "b", "c", 22, W.biru)),
    ),
    k(
      "Langkah dua, kalikan pembilang dengan pembilang, dan penyebut dengan penyebut.",
      bersih(0),
      tambah(0, judul("langkah 2: lurus atas dan bawah")),
      tambah("pembilang", ...frac("c1", 60, 80, "a", 1, 20, W.merah), teks("c2", 100, 86, "×", 20, W.biru), ...frac("c3", 140, 80, "b", "c", 20, W.biru), teks("c4", 180, 86, "=", 20, W.biru)),
      tambah("penyebut", ...frac("c5", 230, 80, "a × b", "1 × c", 17, W.merah)),
      tambah("dengan@2", teks("c6", 150, 160, "atas × atas, bawah × bawah", 11, W.hijau)),
    ),
    k(
      "Alasannya, bilangan dibagi satu nilainya tetap. Jadi menambahkan penyebut satu tidak mengubah nilai bilangan itu.",
      bersih(0),
      tambah(0, judul("nilai tidak berubah")),
      tambah("dibagi", teks("n1", 150, 80, "4 ÷ 1 = 4", 24, W.merah)),
      tambah("menambahkan", teks("n3", 150, 140, "penyebut 1 tidak mengubah nilai", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ LA4. Whole-as-Fraction: penerapan ------------------------------ */
export const ADEGAN_LUAR_BULAT_TERAPAN: AdeganStory = {
  id: "luar-bulat-terapan",
  judul: "Whole-as-Fraction: penerapan pada pohon mangga",
  sumber: "Metode luar 2: penerapan pada soal pohon mangga",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapan. Dua per tiga dari 15 pohon mangga adalah mangga manalagi. Dituliskan dua per tiga kali 15.",
      tambah(0, judul("penerapan: pohon mangga")),
      tambah("15", emo("mg", 150, 76, "🌳", 36), teks("mgt", 150, 96, "15 pohon", 10, W.coklat)),
      tambah("Dituliskan", teks("mq", 150, 150, "2/3 × 15", 24, W.biru)),
    ),
    k(
      "Tulis 15 sebagai lima belas per satu, lalu beri kotak merah agar tidak lupa.",
      bersih(0),
      tambah(0, judul("langkah 1: 15 menjadi 15 per 1")),
      tambah("Tulis", ...frac("p1", 70, 100, 2, 3, 24, W.biru), teks("p2", 118, 106, "×", 24, W.biru)),
      tambah("kotak", kotak("pk", 150, 62, 64, 76, W.putih, W.merah, { rx: 6, tebal: 2.4 }), ...frac("p3", 182, 100, 15, 1, 24, W.merah)),
    ),
    k(
      "Kalikan atas dengan atas: 2 kali 15 menjadi 30. Kalikan bawah dengan bawah: 3 kali 1 menjadi 3.",
      bersih(0),
      tambah(0, judul("langkah 2: lurus atas dan bawah")),
      tambah("atas", teks("q1", 150, 68, "2 × 15 = 30", 18, W.merah)),
      tambah("bawah", teks("q2", 150, 120, "3 × 1 = 3", 18, W.biru)),
      tambah("3@3", ...frac("q3", 150, 176, 30, 3, 18, W.hijau)),
    ),
    k(
      "Hasilnya tiga puluh per tiga, yaitu 10 pohon mangga manalagi.",
      bersih(0),
      tambah(0, judul("hasil akhir")),
      tambah("Hasilnya", teks("h1", 150, 80, "30/3 = 10", 26, W.merah)),
      tambah("pohon", emo("h2", 150, 140, "🌳", 36), teks("h3", 150, 160, "10 pohon manalagi", 11, W.coklat)),
    ),
    k(
      "Hasil ini sama dengan jawaban buku pada Eksplorasi 1.2, yaitu 10 pohon, sehingga cara tadi benar.",
      bersih(0),
      tambah(0, judul("cocok dengan buku")),
      tambah("Eksplorasi", ...kartu("bk", 50, 40, 200, 40, "#DBEAFE", ["Eksplorasi 1.2: 10 pohon"], 11)),
      tambah("benar", emo("ok", 150, 132, "✅", 44)),
    ),
  ],
};
