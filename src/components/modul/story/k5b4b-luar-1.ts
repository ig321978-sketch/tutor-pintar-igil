import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, labelSisi, panah, poligon, tabel, tandaSama, teks, titikSegitiga } from "./k5b4b-gambar";
import { bersih, k, tambah, ubah } from "./k5b4b-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk keliling segitiga",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 115–117",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana cara menemukan keliling sebuah segitiga? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("Bagaimana", poligon("pt", 24, 80, titikSegitiga(6, 3, 5, 18), W.langit, W.biru, { tebal: 2.2 }), teks("pq", 215, 100, "keliling = ?", 13, W.merah)),
      tambah("berbeda.", emo("gl", 215, 150, "🌍", 34)),
    ),
    k(
      "Empat metode itu: Side Sum, Equilateral Shortcut, Measure Then Sum, dan String Unrolling.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Side", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Side Sum"], 9.4)),
      tambah("Equilateral", ...kartu("m2", 20, 70, 260, 30, W.langit, ["2. Equilateral Shortcut"], 9.4)),
      tambah("Measure", ...kartu("m3", 20, 108, 260, 30, W.krem, ["3. Measure Then Sum"], 9.4)),
      tambah("String", ...kartu("m4", 20, 146, 260, 30, W.pink, ["4. String Unrolling"], 9.4)),
    ),
    k(
      "Semua metode berangkat dari gagasan yang sama di buku: keliling adalah jumlah panjang sisi-sisinya, jadi tidak ada sisi yang boleh terlewat dan tidak ada yang dihitung dua kali.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("keliling", poligon("sg", 90, 50, titikSegitiga(6, 3, 5, 20), W.langit, W.biru, { tebal: 2.6 })),
      tambah("terlewat", teks("g1", 150, 140, "tidak ada sisi terlewat", 9.8, W.hijau)),
      tambah("dua", teks("g2", 150, 160, "tidak ada yang dihitung dua kali", 9.8, W.hijau)),
    ),
    k(
      "Angka yang kita pakai semuanya dari buku: segitiga dengan sisi tiga, lima, enam dan tujuh, empat, lima, segitiga sama sisi lima dan enam, serta segitiga sama kaki enam, enam, empat.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah(7, ...kartu("a1", 20, 34, 260, 40, W.langit, ["sembarang: 3, 5, 6 dan 7, 4, 5"], 9.4)),
      tambah(17, ...kartu("a2", 20, 84, 260, 40, W.hijauMuda, ["sama sisi: 5 dan 6"], 9.4)),
      tambah(24, ...kartu("a3", 20, 134, 260, 40, W.pink, ["sama kaki: 6, 6, 4"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Side Sum: konsep ------------------------------ */
export const ADEGAN_LUAR_SISI: AdeganStory = {
  id: "luar-sisi",
  judul: "Side Sum: jumlah sisi",
  sumber: "Metode luar: Side Sum",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Side Sum, artinya jumlah sisi. Daftar semua sisi segitiga, lalu jumlahkan seluruhnya. Tidak ada rumus khusus yang perlu dihafal.",
      tambah(0, judul("Side Sum")),
      tambah("Daftar", ...kartu("c1", 14, 56, 74, 34, W.langit, ["sisi 1"], 9.4), ...kartu("c2", 113, 56, 74, 34, W.hijauMuda, ["sisi 2"], 9.4), ...kartu("c3", 212, 56, 74, 34, W.krem, ["sisi 3"], 9.4)),
      tambah("jumlahkan", teks("p1", 100, 78, "+", 16, W.merah), teks("p2", 200, 78, "+", 16, W.merah), teks("kk", 150, 126, "= keliling", 13, W.merah)),
    ),
    k(
      "Langkahnya tiga. Pertama, sebut sisi satu, sisi dua, dan sisi tiga. Kedua, tulis ukurannya. Ketiga, jumlahkan semuanya.",
      bersih(0),
      tambah(0, judul("Tiga langkah Side Sum")),
      tambah("Pertama,", ...kartu("l1", 30, 32, 240, 36, W.langit, ["1. sebut ketiga sisinya"], 9)),
      tambah("Kedua,", ...kartu("l2", 30, 80, 240, 36, W.hijauMuda, ["2. tulis ukuran tiap sisi"], 9)),
      tambah("Ketiga,", ...kartu("l3", 30, 128, 240, 36, W.krem, ["3. jumlahkan semuanya"], 9)),
    ),
    k(
      "Kelebihannya, selalu aman. Segitiga sembarang, sama sisi, maupun sama kaki, semuanya bisa dijumlahkan sisi demi sisi tanpa syarat apa pun.",
      bersih(0),
      tambah(0, judul("Selalu aman")),
      tambah("sembarang,", poligon("s1", 20, 64, titikSegitiga(6, 3, 5, 12), W.langit), emo("o1", 56, 126, "✅", 20)),
      tambah("sama@1", poligon("s2", 112, 56, titikSegitiga(5, 5, 5, 12), W.hijauMuda), emo("o2", 142, 126, "✅", 20)),
      tambah("kaki,", poligon("s3", 214, 50, titikSegitiga(4, 6, 6, 12), W.pink), emo("o3", 238, 126, "✅", 20)),
      tambah("syarat", teks("sy", 150, 168, "tanpa syarat", 10.5, W.hijau)),
    ),
    k(
      "Kekurangannya, kalau tiga sisinya sama, kita menulis angka yang sama tiga kali. Untuk itu ada pintasan, yaitu metode kedua.",
      bersih(0),
      tambah(0, judul("Angka sama ditulis berulang")),
      tambah("tiga", teks("ul", 150, 80, "6 + 6 + 6", 20, W.merah)),
      tambah("Untuk", panah("pk", 150, 100, 0, 30, W.biru, 2.6, { gambar: true })),
      tambah("pintasan,", ...kartu("pn", 70, 140, 160, 34, W.hijauMuda, ["ada pintasan?"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Side Sum: penerapan ------------------------------ */
const T1 = titikSegitiga(6, 3, 5, 18);
const T2 = titikSegitiga(7, 4, 5, 16);

export const ADEGAN_LUAR_SISI_TERAPAN: AdeganStory = {
  id: "luar-sisi-terapan",
  judul: "Side Sum pada dua segitiga sembarang",
  sumber: "Metode luar: Side Sum; contoh Buku Siswa hlm. 115 dan Panduan Guru hlm. 130–131",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada segitiga pertama di buku, dengan sisi tiga, lima, dan enam sentimeter. Mulai dengan menyebut sisinya satu per satu.",
      tambah(0, judul("Side Sum: segitiga pertama")),
      tambah("Terapkan", poligon("ta", 20, 78, T1, W.langit, W.biru, { tebal: 2.2 })),
      tambah(8, ...labelSisi("ta", 20, 78, T1, ["", "3 cm", ""], 8.6, W.merah, 15)),
      tambah(9, ...labelSisi("ta", 20, 78, T1, ["", "", "5 cm"], 8.6, W.merah, 15)),
      tambah(11, ...labelSisi("ta", 20, 78, T1, ["6 cm", "", ""], 8.6, W.merah, 15)),
      tambah("Mulai", teks("rt", 232, 64, "total:", 9.4, W.biru), teks("rs", 232, 100, "0", 22, W.merah)),
    ),
    k(
      "Sisi satu: tiga. Total sekarang tiga. Tambahkan sisi dua: lima. Tiga tambah lima sama dengan delapan.",
      ubah("Total", { id: "rs", isi: "3" }),
      tambah("Tambahkan", teks("t2", 232, 130, "3 + 5 = 8", 10.5, W.biru)),
      ubah("delapan.", { id: "rs", isi: "8" }),
    ),
    k(
      "Tambahkan sisi tiga: enam. Delapan tambah enam sama dengan empat belas. Total akhir empat belas.",
      tambah("Delapan", teks("t3", 232, 150, "8 + 6 = 14", 10.5, W.biru)),
      ubah("Total", { id: "rs", isi: "14" }),
      ubah("akhir", { id: "ta", warna: W.hijauMuda }),
    ),
    k(
      "Sekarang segitiga kedua, dengan sisi tujuh, empat, dan lima sentimeter. Tujuh tambah empat sama dengan sebelas, sebelas tambah lima sama dengan enam belas.",
      bersih(0),
      tambah(0, judul("Side Sum: segitiga kedua")),
      tambah("Sekarang", poligon("tb", 20, 76, T2, W.krem, W.biru, { tebal: 2.2 }), ...labelSisi("tb", 20, 76, T2, ["7 cm", "4 cm", "5 cm"], 8.6, W.merah, 15)),
      tambah(10, teks("u1", 232, 84, "7 + 4 = 11", 10.5, W.biru)),
      tambah("sebelas@2", teks("u2", 232, 106, "11 + 5 = 16", 10.5, W.biru)),
      tambah("enam", teks("u3", 232, 134, "keliling = 16 cm", 9.4, W.hijau)),
    ),
    k(
      "Hasilnya sama persis dengan buku: empat belas sentimeter dan enam belas sentimeter. Side Sum selalu sampai pada jawaban yang benar.",
      bersih(0),
      tambah(0, judul("Cocok dengan buku")),
      tambah("Hasilnya", ...tabel("hb", 60, 44, [90, 90], [["sisi (cm)", "keliling"], ["3, 5, 6", "14 cm"], ["7, 4, 5", "16 cm"]], 24, 9.4)),
      tambah("selalu", emo("ok", 150, 150, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 4. Equilateral Shortcut: konsep ------------------------------ */
const T5 = titikSegitiga(5, 5, 5, 14);
const T1K = titikSegitiga(6, 3, 5, 14);

export const ADEGAN_LUAR_PINTAS: AdeganStory = {
  id: "luar-pintas",
  judul: "Equilateral Shortcut: pintasan segitiga sama sisi",
  sumber: "Metode luar: Equilateral Shortcut",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Equilateral Shortcut, pintasan untuk segitiga sama sisi. Karena ketiga sisinya sama, penjumlahan berulang cukup diganti dengan perkalian tiga kali panjang sisi.",
      tambah(0, judul("Equilateral Shortcut")),
      tambah("Metode", poligon("tg", 28, 56, T5, W.hijauMuda, W.biru, { tebal: 2.2 }), ...tandaSama("tg", 28, 56, T5, [0, 1, 2])),
      tambah("perkalian", ...kartu("rm", 150, 62, 138, 54, W.krem, ["Keliling =", "3 × panjang sisi"], 10)),
    ),
    k(
      "Alasannya sederhana. Lima tambah lima tambah lima adalah tiga kelompok yang sama besar, dan tiga kelompok lima ditulis tiga kali lima.",
      bersih(0),
      tambah(0, judul("Mengapa boleh dikali")),
      tambah("Lima", ...kartu("b1", 20, 40, 60, 36, W.hijauMuda, ["5"], 14), ...kartu("b2", 120, 40, 60, 36, W.hijauMuda, ["5"], 14), ...kartu("b3", 220, 40, 60, 36, W.hijauMuda, ["5"], 14)),
      tambah("kelompok", teks("q1", 100, 66, "+", 18, W.merah), teks("q2", 200, 66, "+", 18, W.merah)),
      tambah("ditulis", teks("q3", 150, 126, "5 + 5 + 5 = 3 × 5", 14, W.merah)),
    ),
    k(
      "Syaratnya ketat: hanya untuk segitiga sama sisi. Tanda kecil pada sisi menunjukkan sisi yang sama panjang. Tanpa tanda itu, jangan memakai pintasan.",
      bersih(0),
      tambah(0, judul("Syarat pintasan")),
      tambah("Syaratnya", poligon("y1", 30, 50, T5, W.hijauMuda, W.biru, { tebal: 2 }), ...tandaSama("y1", 30, 50, T5, [0, 1, 2]), emo("y1e", 66, 150, "✅", 22), teks("y1t", 66, 172, "boleh", 9.4, W.hijau)),
      tambah("Tanpa", poligon("y2", 180, 62, T1K, W.langit, W.biru, { tebal: 2 }), emo("y2e", 222, 150, "❌", 22), teks("y2t", 222, 172, "jangan", 9.4, W.merah)),
    ),
    k(
      "Kalau salah dipakai, hasilnya keliru. Pada segitiga sisi tiga, lima, enam, tiga kali tiga hanya sembilan, padahal keliling sebenarnya empat belas.",
      bersih(0),
      tambah(0, judul("Jangan salah pakai", W.merah)),
      tambah("Kalau", poligon("z", 20, 56, T1K, W.langit, W.biru, { tebal: 2 })),
      tambah("tiga@4", teks("z1", 220, 76, "3 × 3 = 9", 14, W.merah), emo("z1e", 270, 70, "❌", 16)),
      tambah("sebenarnya", teks("z2", 220, 120, "yang benar:", 9.4, W.biru), teks("z3", 220, 140, "3 + 5 + 6 = 14", 11, W.hijau)),
    ),
  ],
};
