import type { AdeganStory } from "./logika-story";
import { W, bangunC, emo, garis, judul, kartu, labelSisi, panah, sisiGaris, tabel, teks } from "./k5b4c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b4c-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const ANGKA_BUKU: [string, string][] = [
  ["persegi panjang", "5 dan 3"],
  ["jajargenjang", "5 dan 3"],
  ["layang-layang", "2 dan 4"],
  ["persegi", "sisi 3"],
  ["belah ketupat", "sisi 3"],
  ["trapesium", "2, 5, 3, 4"],
  ["segi empat sembarang", "5, 4, 2, 3"],
];
const chipAngka = (i: number) => kartu(`ag${i}`, 12 + (i % 2) * 142, 34 + Math.floor(i / 2) * 40, 134, 34, [W.langit, W.krem, W.pink, W.hijauMuda, W.jingga, W.langit, W.krem][i], [ANGKA_BUKU[i][0], ANGKA_BUKU[i][1]], 8.2);

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk keliling segi empat",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 118–121",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Berapa panjang pagar untuk mengelilingi sebuah kebun segi empat? Guru di berbagai negara punya cara berbeda untuk mengajarkannya. Video ini memperkenalkan empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("pagar", bangunC("kb", 96, 52, "pp", 20, W.hijauMuda, W.coklat, { putus: true, tebal: 3 }), emo("pk", 146, 96, "🌳", 28)),
      tambah("kebun", teks("kt", 150, 140, "pagar sepanjang berapa?", 11, W.merah)),
      tambah("empat", emo("gl", 150, 178, "🌍", 28)),
    ),
    k(
      "Empat metode itu adalah Rectangle Formula, Square Shortcut, Not Area Product, dan Straight Line Unrolling.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Rectangle", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Rectangle Formula"], 9.4)),
      tambah("Square", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Square Shortcut"], 9.4)),
      tambah("Not", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Not Area Product"], 9.4)),
      tambah("Straight", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Straight Line Unrolling"], 9.4)),
    ),
    k(
      "Satu gagasan menyatukan semuanya: keliling adalah panjang jalur yang mengelilingi tepi bangun. Keempat metode hanyalah cara berbeda untuk menghitung jalur itu.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("keliling", bangunC("jl", 100, 52, "pp", 20, W.langit)),
      tambah("jalur", panah("a1", 100, 52, 100, 0, W.merah, 2.6, { gambar: true }), panah("a2", 200, 52, 0, 60, W.merah, 2.6, { gambar: true }), panah("a3", 200, 112, -100, 0, W.merah, 2.6, { gambar: true }), panah("a4", 100, 112, 0, -60, W.merah, 2.6, { gambar: true })),
      tambah("Keempat", teks("jt", 150, 150, "keliling = panjang jalur di tepi", 10.4, W.hijau)),
    ),
    k(
      "Kita memakai angka dari buku: persegi panjang, jajargenjang, layang-layang, persegi, belah ketupat, trapesium, dan segi empat sembarang.",
      bersih(0),
      tambah(0, judul("Angka dari buku (cm)")),
      ...[0, 1, 2, 3, 4, 5, 6].map((i) => tambah(["persegi", "jajargenjang,", "layang-layang,", "persegi@2", "belah", "trapesium,", "sembarang."][i], chipAngka(i))),
    ),
  ],
};

/* ------------------------------ 2. Rectangle Formula: konsep ------------------------------ */
export const ADEGAN_LUAR_RF: AdeganStory = {
  id: "luar-rf",
  judul: "Rectangle Formula: dua kali jumlah panjang dan lebar",
  sumber: "Metode luar: Rectangle Formula",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Rectangle Formula, berasal dari pembelajaran rumus ala Singapura. Idenya: keliling persegi panjang adalah dua kali jumlah panjang dan lebar.",
      tambah(0, judul("Rectangle Formula")),
      tambah("persegi", bangunC("rf", 24, 62, "pp", 14, W.langit), ...labelSisi("rf", 24, 62, "pp", 14, ["p", "l", null, null], 10)),
      tambah("Idenya:", ...kartu("rk", 124, 56, 166, 50, W.hijauMuda, ["K = 2 × (p + l)"], 13)),
    ),
    k(
      "Mengapa begitu? Berjalan mengelilingi bangun, kita melewati dua panjang dan dua lebar. Satu panjang bersama satu lebar adalah setengah perjalanan, dan setengahnya lagi sama.",
      bersih(0),
      tambah(0, judul("Setengah jalan, dua kali")),
      tambah("Mengapa", bangunC("rf", 90, 52, "pp", 22, W.langit)),
      tambah("panjang", sisiGaris("h1", 90, 52, "pp", 22, 0, W.merah), sisiGaris("h2", 90, 52, "pp", 22, 1, W.merah), teks("t1", 232, 60, "p + l", 12, W.merah, { anchor: "start" })),
      tambah("setengahnya", sisiGaris("h3", 90, 52, "pp", 22, 2, W.biru), sisiGaris("h4", 90, 52, "pp", 22, 3, W.biru), teks("t2", 28, 150, "p + l", 12, W.biru, { anchor: "start" })),
      tambah("lagi", teks("t3", 150, 172, "dua setengah jalan: 2 × (p + l)", 10.4, W.ungu)),
    ),
    k(
      "Dua cara menulis itu sama saja: dua kali panjang ditambah dua kali lebar, atau dua kali jumlah panjang dan lebar. Pilih yang paling cepat bagimu.",
      bersih(0),
      tambah(0, judul("Dua cara tulis, hasil sama")),
      tambah("panjang", ...kartu("w1", 30, 40, 240, 34, W.hijauMuda, ["(2 × p) + (2 × l)"], 12.4)),
      tambah("sama", teks("w2", 150, 100, "=", 18, W.ungu)),
      tambah("jumlah", ...kartu("w3", 30, 112, 240, 34, W.langit, ["2 × (p + l)"], 12.4)),
      tambah("Pilih", emo("w4", 150, 178, "⚡", 26)),
    ),
    k(
      "Kelebihannya, hanya satu penjumlahan lalu satu perkalian. Kekurangannya, hanya cocok kalau bangunnya punya dua pasang sisi yang sama panjang.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 36, 130, 56, W.hijauMuda, ["satu jumlah,", "satu kali"], 9.6), emo("kle", 79, 118, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 36, 130, 56, W.merahMuda, ["perlu dua pasang", "sisi sama"], 9.6)),
      tambah("pasang", bangunC("kp1", 168, 112, "pp", 7, W.langit), bangunC("kp2", 222, 108, "jg", 6, W.krem)),
    ),
  ],
};

/* ------------------------------ 3. Rectangle Formula: penerapan ------------------------------ */
export const ADEGAN_LUAR_RF_TERAPAN: AdeganStory = {
  id: "luar-rf-terapan",
  judul: "Rectangle Formula pada persegi panjang, jajargenjang, dan layang-layang",
  sumber: "Metode luar: Rectangle Formula; angka Buku Siswa hlm. 118–119",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Persegi panjang: panjang lima, lebar tiga. Jumlahkan dulu: lima ditambah tiga sama dengan delapan. Lalu kalikan dua.",
      tambah(0, judul("Persegi panjang")),
      tambah("Persegi", bangunC("a", 20, 54, "pp", 14, W.langit), ...labelSisi("a", 20, 54, "pp", 14, ["5 cm", "3 cm", null, null], 9)),
      tambah("Jumlahkan", teks("e1", 214, 82, "5 + 3 = 8", 15, W.biru)),
      tambah("kalikan", teks("e2", 214, 116, "2 × 8 = 16", 15, W.hijau)),
    ),
    k(
      "Jajargenjang: sisi alas lima dan sisi samping tiga. Rumusnya sama persis: dua kali delapan sama dengan enam belas sentimeter. Tinggi tidak dipakai di sini.",
      bersih(0),
      tambah(0, judul("Jajargenjang")),
      tambah("Jajargenjang:", bangunC("b", 14, 54, "jg", 12, W.krem), ...labelSisi("b", 14, 54, "jg", 12, ["5 cm", "3 cm", null, null], 9)),
      tambah("Rumusnya", teks("f1", 214, 82, "5 + 3 = 8", 15, W.biru)),
      tambah("dua", teks("f2", 214, 116, "2 × 8 = 16", 15, W.hijau)),
      tambah("Tinggi", teks("f3", 214, 150, "tinggi: tak dipakai", 8.4, W.merah)),
    ),
    k(
      "Layang-layang: sisi pendek dua dan sisi panjang empat. Dua ditambah empat sama dengan enam, dikali dua sama dengan dua belas sentimeter.",
      bersih(0),
      tambah(0, judul("Layang-layang")),
      tambah("Layang-layang:", bangunC("c", 30, 36, "ll", 17, W.pink), ...labelSisi("c", 30, 36, "ll", 17, ["2 cm", "4 cm", null, null], 9)),
      tambah("Dua", teks("g1", 214, 82, "2 + 4 = 6", 15, W.biru)),
      tambah("dikali", teks("g2", 214, 116, "2 × 6 = 12", 15, W.hijau)),
    ),
    k(
      "Periksa dengan jalan lain: dua kali dua ditambah dua kali empat sama dengan empat ditambah delapan, yaitu dua belas. Cocok. Jadi angka enam belas di panduan guru untuk layang-layang memang tidak sesuai.",
      sorotkan("Periksa", "g2"),
      tambah("kali", teks("g3", 214, 150, "(2 × 2) + (2 × 4) = 4 + 8 = 12", 8.2, W.ungu)),
      tambah("Cocok.", emo("g4", 214, 180, "✅", 22)),
    ),
    k(
      "Kesimpulan: Rectangle Formula bekerja untuk persegi panjang, jajargenjang, dan layang-layang, dengan hasil enam belas, enam belas, dan dua belas sentimeter.",
      bersih(0),
      tambah(0, judul("Hasil Rectangle Formula")),
      tambah("persegi", ...tabel("hs", 40, 44, [140, 80], [["Bangun", "Keliling"], ["persegi panjang", "16 cm"], ["jajargenjang", "16 cm"], ["layang-layang", "12 cm"]], 22, 9.4)),
      tambah("Kesimpulan:", emo("hk", 150, 168, "🎯", 24)),
    ),
  ],
};

/* ------------------------------ 4. Square Shortcut: konsep ------------------------------ */
export const ADEGAN_LUAR_SS: AdeganStory = {
  id: "luar-ss",
  judul: "Square Shortcut: empat kali sisi",
  sumber: "Metode luar: Square Shortcut",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Square Shortcut. Kalau keempat sisi sama panjang, empat penjumlahan yang sama bisa diganti satu perkalian: empat kali sisi.",
      tambah(0, judul("Square Shortcut")),
      tambah("keempat", bangunC("sq", 40, 56, "ps", 22, W.hijauMuda), ...labelSisi("sq", 40, 56, "ps", 22, ["s", "s", "s", "s"], 10)),
      tambah("penjumlahan", teks("s1", 218, 76, "s + s + s + s", 13, W.biru)),
      tambah("perkalian:", teks("s2", 218, 110, "= 4 × s", 15, W.hijau)),
    ),
    k(
      "Cara memakainya: pertama periksa, apakah keempat sisinya sama panjang? Kalau ya, ukur satu sisi saja lalu kalikan empat. Kalau tidak, jangan pakai pintasan ini.",
      bersih(0),
      tambah(0, judul("Periksa dulu")),
      tambah("periksa,", ...kartu("q", 80, 36, 140, 36, W.krem, ["empat sisi", "sama panjang?"], 9.4)),
      tambah("ya,", garis("ya", 110, 72, -50, 36, W.hijau, 2.4, { gambar: true }), ...kartu("py", 12, 112, 130, 50, W.hijauMuda, ["ya: ukur satu sisi,", "kalikan 4"], 9)),
      tambah("tidak,", garis("tdk", 190, 72, 50, 36, W.merah, 2.4, { gambar: true }), ...kartu("pt", 158, 112, 130, 50, W.merahMuda, ["tidak: jumlahkan", "satu per satu"], 9)),
    ),
    k(
      "Pintasan ini berlaku untuk bangun yang keempat sisinya sama, yaitu persegi dan belah ketupat. Persegi panjang tidak, sebab panjang dan lebarnya berbeda.",
      bersih(0),
      tambah(0, judul("Siapa yang boleh?")),
      tambah("persegi", bangunC("o1", 28, 50, "ps", 16, W.hijauMuda), teks("o1t", 52, 118, "persegi", 9), emo("o1e", 52, 146, "✅", 22)),
      tambah("belah", bangunC("o2", 108, 54, "bk", 12, W.jingga), teks("o2t", 136, 118, "belah ketupat", 9), emo("o2e", 136, 146, "✅", 22)),
      tambah("Persegi@2", bangunC("o3", 206, 58, "pp", 10, W.langit), teks("o3t", 232, 118, "persegi panjang", 9), emo("o3e", 232, 146, "❌", 22)),
    ),
    k(
      "Kelebihannya sangat cepat dan hanya perlu mengukur satu sisi. Kekurangannya, mudah salah dipakai pada bangun yang sisinya tidak sama.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya", ...kartu("kl", 14, 36, 130, 56, W.hijauMuda, ["cepat,", "ukur satu sisi"], 9.6), emo("kle", 79, 118, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 36, 130, 56, W.merahMuda, ["mudah salah pakai", "bila sisi beda"], 9.6), emo("kke", 221, 118, "⚠", 24)),
    ),
  ],
};

/* ------------------------------ 5. Square Shortcut: penerapan ------------------------------ */
export const ADEGAN_LUAR_SS_TERAPAN: AdeganStory = {
  id: "luar-ss-terapan",
  judul: "Square Shortcut pada persegi dan belah ketupat",
  sumber: "Metode luar: Square Shortcut; angka Buku Siswa hlm. 119–120",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Persegi dengan sisi tiga sentimeter. Periksa dulu: keempat sisinya sama, jadi boleh. Empat kali tiga sama dengan dua belas sentimeter.",
      tambah(0, judul("Persegi sisi 3 cm")),
      tambah("Persegi", bangunC("a", 36, 54, "ps", 24, W.hijauMuda), ...labelSisi("a", 36, 54, "ps", 24, ["3 cm", null, null, null], 9)),
      tambah("Periksa", emo("a1", 150, 96, "🔍", 22)),
      tambah("Empat", teks("a2", 226, 90, "4 × 3 = 12", 15, W.hijau)),
      tambah("sentimeter.", teks("a3", 226, 116, "12 cm", 14, W.merah)),
    ),
    k(
      "Belah ketupat dengan sisi tiga sentimeter. Keempat sisinya sama, jadi hasilnya sama: empat kali tiga, dua belas sentimeter. Walau miring, kelilingnya sama dengan persegi tadi.",
      bersih(0),
      tambah(0, judul("Belah ketupat sisi 3 cm")),
      tambah("Belah", bangunC("b", 24, 54, "bk", 18, W.jingga), ...labelSisi("b", 24, 54, "bk", 18, ["3 cm", null, null, null], 9)),
      tambah("sama:", teks("b2", 218, 90, "4 × 3 = 12", 15, W.hijau)),
      tambah("sentimeter.", teks("b3", 218, 116, "12 cm", 14, W.merah)),
      tambah("Walau", teks("b4", 218, 144, "sama dengan persegi", 8.6, W.ungu)),
    ),
    k(
      "Sekarang uji pintasan ini pada persegi panjang lima kali tiga. Kalau dipaksa empat kali lima, hasilnya dua puluh. Padahal kelilingnya enam belas. Jadi pintasan tidak boleh dipakai di sini.",
      bersih(0),
      tambah(0, judul("Uji pada persegi panjang")),
      tambah("persegi", bangunC("c", 20, 54, "pp", 14, W.langit), ...labelSisi("c", 20, 54, "pp", 14, ["5 cm", "3 cm", null, null], 9)),
      tambah("dipaksa", teks("c2", 214, 80, "4 × 5 = 20", 15, W.merah), emo("c3", 276, 76, "❌", 18)),
      tambah("kelilingnya", teks("c4", 214, 112, "keliling: 16 cm", 12, W.hijau)),
      tambah("Jadi", teks("c5", 150, 170, "pintasan hanya untuk empat sisi sama", 9.6, W.ungu)),
    ),
    k(
      "Pada trapesium dan segi empat sembarang juga tidak ada pintasan, sebab sisinya berbeda. Jumlahkan satu per satu: empat belas sentimeter untuk keduanya.",
      bersih(0),
      tambah(0, judul("Tidak ada pintasan")),
      tambah("trapesium", bangunC("d1", 40, 46, "tr", 14, W.langit), ...labelSisi("d1", 40, 46, "tr", 14, ["2", "5", "3", "4"], 8.6), teks("d1t", 62, 130, "2 + 5 + 3 + 4 = 14", 8.8, W.biru)),
      tambah("sembarang", bangunC("d2", 168, 46, "ss", 14, W.pink), ...labelSisi("d2", 168, 46, "ss", 14, ["5", "4", "2", "3"], 8.6), teks("d2t", 198, 130, "5 + 4 + 2 + 3 = 14", 8.8, W.biru)),
      tambah("keduanya.", teks("d3", 150, 168, "keliling 14 cm untuk keduanya", 10.4, W.hijau)),
    ),
  ],
};
