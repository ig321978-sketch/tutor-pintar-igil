import type { AdeganStory } from "./logika-story";
import { W, emo, garis, judul, kartu, labelSisi, penggaris, pitaBenang, poligon, tabel, tandaSama, teks, titikSegitiga } from "./k5b4b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b4b-bantu";

const T5 = titikSegitiga(5, 5, 5, 14);
const T6 = titikSegitiga(6, 6, 6, 11);
const T7 = titikSegitiga(4, 6, 6, 12);

/* ------------------------------ 5. Equilateral Shortcut: penerapan ------------------------------ */
export const ADEGAN_LUAR_PINTAS_TERAPAN: AdeganStory = {
  id: "luar-pintas-terapan",
  judul: "Equilateral Shortcut pada contoh buku",
  sumber: "Metode luar: Equilateral Shortcut; Buku Siswa hlm. 116–117",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Terapkan pada segitiga sama sisi di buku dengan sisi lima sentimeter. Tiga kali lima sama dengan lima belas. Cocok dengan Cara Asep dan Cara Nisa.",
      tambah(0, judul("Pintasan: sisi 5 cm")),
      tambah("Terapkan", poligon("tg", 24, 50, T5, W.hijauMuda, W.biru, { tebal: 2.2 }), ...tandaSama("tg", 24, 50, T5, [0, 1, 2])),
      tambah(9, ...labelSisi("tg", 24, 50, T5, ["5 cm", "5 cm", "5 cm"], 8.6, W.merah, 15)),
      tambah(11, teks("eq", 225, 80, "3 × 5 = 15", 13, W.merah)),
      tambah(17, teks("kl", 225, 104, "keliling = 15 cm", 9.4, W.hijau)),
      tambah("Cocok", emo("ok", 225, 150, "✅", 26)),
    ),
    k(
      "Segitiga kedua bersisi enam sentimeter. Tiga kali enam sama dengan delapan belas. Hanya satu langkah, bukan tiga.",
      bersih(0),
      tambah(0, judul("Pintasan: sisi 6 cm")),
      tambah("Segitiga", poligon("th", 24, 50, T6, W.krem, W.biru, { tebal: 2.2 }), ...tandaSama("th", 24, 50, T6, [0, 1, 2])),
      tambah("enam", ...labelSisi("th", 24, 50, T6, ["6 cm", "6 cm", "6 cm"], 8.6, W.merah, 15)),
      tambah(5, teks("eq", 225, 80, "3 × 6 = 18", 13, W.merah)),
      tambah("delapan", teks("kl", 225, 104, "keliling = 18 cm", 9.4, W.hijau)),
      tambah("langkah,", teks("lk", 225, 150, "1 langkah", 10, W.biru)),
    ),
    k(
      "Pintasan serupa berlaku pada segitiga sama kaki. Dua sisi sama panjang, jadi kalikan dua, lalu tambahkan sisi ketiga. Segitiga enam, enam, empat: dua kali enam ditambah empat sama dengan enam belas.",
      bersih(0),
      tambah(0, judul("Pintasan serupa: sama kaki")),
      tambah(0, poligon("tk", 24, 44, T7, W.pink, W.biru, { tebal: 2.2 })),
      tambah(7, ...tandaSama("tk", 24, 44, T7, [1, 2])),
      tambah(19, ...labelSisi("tk", 24, 44, T7, ["", "", "6 cm"], 8.6, W.merah, 15)),
      tambah(20, ...labelSisi("tk", 24, 44, T7, ["", "6 cm", ""], 8.6, W.merah, 15)),
      tambah(21, ...labelSisi("tk", 24, 44, T7, ["4 cm", "", ""], 8.6, W.merah, 15)),
      tambah(22, teks("eq", 225, 90, "2 × 6 + 4 = 16", 11, W.merah)),
      tambah(30, teks("kl", 225, 112, "keliling = 16 cm", 9.4, W.hijau)),
    ),
    k(
      "Bandingkan dengan menjumlahkan sisi demi sisi: enam tambah enam tambah empat juga enam belas. Pintasan mempercepat, tetapi tidak mengubah hasilnya.",
      tambah("menjumlahkan", teks("bd", 225, 140, "6 + 6 + 4 = 16", 11, W.biru)),
      tambah("mengubah", teks("hs", 225, 164, "hasil sama", 9.4, W.hijau), emo("ok", 225, 190, "✅", 18)),
    ),
  ],
};

/* ------------------------------ 6. Measure Then Sum: konsep ------------------------------ */
const T1 = titikSegitiga(6, 3, 5, 16);

export const ADEGAN_LUAR_UKUR: AdeganStory = {
  id: "luar-ukur",
  judul: "Measure Then Sum: ukur dulu, baru jumlahkan",
  sumber: "Metode luar: Measure Then Sum",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Measure Then Sum, artinya ukur dulu baru jumlahkan. Di buku, sisi segitiga pertama belum diberi angka, jadi kita harus mengukurnya sendiri.",
      tambah(0, judul("Measure Then Sum")),
      tambah("Metode", poligon("tm", 20, 70, T1, W.langit, W.biru, { tebal: 2.2 })),
      tambah("buku,", ...labelSisi("tm", 20, 70, T1, ["... cm", "... cm", "... cm"], 8.6, W.hitam, 15)),
      tambah("mengukurnya", emo("rg", 230, 100, "📏", 34)),
    ),
    k(
      "Langkah pertama: letakkan penggaris sejajar sisi, dengan angka nol tepat di ujung sisi. Jangan mulai dari tepi penggaris, tetapi dari angka nol.",
      bersih(0),
      tambah(0, judul("Langkah 1: angka nol di ujung")),
      tambah(2, garis("sg", 29, 84, 80, 0, W.merah, 3.4)),
      tambah(3, ...penggaris("pg", 24, 96, 7, 16)),
      tambah(8, teks("n0", 29, 126, "0", 9.4, W.merah)),
      tambah(13, ...kartu("jg", 170, 60, 118, 44, W.merahMuda, ["mulai dari", "angka nol, bukan tepi"], 8.4)),
    ),
    k(
      "Langkah kedua: baca angka di ujung sisi satunya, lalu catat. Langkah ketiga: ulangi untuk dua sisi lainnya. Langkah keempat: jumlahkan, dengan satuan sentimeter yang sama.",
      bersih(0),
      tambah(0, judul("Empat langkah mengukur")),
      tambah(0, ...kartu("l1", 30, 30, 240, 34, W.langit, ["1. nol tepat di ujung sisi"], 9)),
      tambah("baca", ...kartu("l2", 30, 72, 240, 34, W.hijauMuda, ["2. baca ujung satunya, catat"], 9)),
      tambah("ketiga:", ...kartu("l3", 30, 114, 240, 34, W.krem, ["3. ulangi untuk dua sisi lain"], 9)),
      tambah("keempat:", ...kartu("l4", 30, 156, 240, 34, W.pink, ["4. jumlahkan, satuan sama"], 9)),
    ),
    k(
      "Kelebihannya, metode ini bekerja walau angka sisi tidak tertulis. Kekurangannya, hasil ukur bisa berbeda tipis antaranak, jadi sepakati hasil yang paling banyak diperoleh, seperti saran Panduan Guru.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 20, 34, 260, 44, W.hijauMuda, ["kelebihan:", "angka tak tertulis pun bisa"], 9)),
      tambah("Kekurangannya,", ...kartu("kk", 20, 88, 260, 44, W.merahMuda, ["kekurangan:", "hasil ukur bisa beda tipis"], 9)),
      tambah("sepakati", ...kartu("sp", 20, 142, 260, 44, W.krem, ["jalan keluar:", "sepakati hasil yang paling banyak"], 9)),
    ),
  ],
};

/* ------------------------------ 7. Measure Then Sum: penerapan ------------------------------ */
const TAB_UKUR = tabel("tb", 186, 40, [50, 50], [["sisi", "cm"], ["1", "6"], ["2", "5"], ["3", "3"]], 16, 8.8);
const barisUkur = (r: number) => TAB_UKUR.filter((o) => new RegExp(`^tb-[st]${r}\\d$`).test(o.id));

export const ADEGAN_LUAR_UKUR_TERAPAN: AdeganStory = {
  id: "luar-ukur-terapan",
  judul: "Measure Then Sum pada segitiga pertama",
  sumber: "Metode luar: Measure Then Sum; contoh Buku Siswa hlm. 115 dan Panduan Guru hlm. 130–131",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Ukur sisi pertama segitiga di buku. Ujung kiri tepat di angka nol, ujung kanan di angka enam. Sisi ini enam sentimeter.",
      tambah(0, judul("Mengukur segitiga pertama")),
      tambah("Ukur", poligon("tm", 24, 48, titikSegitiga(6, 3, 5, 12), W.langit, W.biru, { tebal: 2 }), ...penggaris("pg", 20, 126, 7, 18)),
      tambah(6, garis("sg", 25, 112, 108, 0, W.merah, 3.4), teks("n0", 25, 152, "0", 9.4, W.merah)),
      tambah(11, teks("nu", 133, 152, "6", 9.4, W.merah)),
      tambah(19, ...barisUkur(0), ...barisUkur(1), teks("ss", 236, 176, "sisi 1 = 6 cm", 9, W.biru)),
    ),
    k(
      "Sisi kedua tercatat lima sentimeter, dan sisi ketiga tiga sentimeter. Semua hasil dicatat satu per satu di tabel.",
      ubah(3, { id: "sg", x2: 90 }, { id: "nu", x: 115, isi: "5" }, { id: "ss", isi: "sisi 2 = 5 cm" }),
      tambah(3, ...barisUkur(2)),
      ubah(8, { id: "sg", x2: 54 }, { id: "nu", x: 79, isi: "3" }, { id: "ss", isi: "sisi 3 = 3 cm" }),
      tambah(8, ...barisUkur(3)),
    ),
    k(
      "Jumlahkan hasil ukur: enam tambah lima tambah tiga sama dengan empat belas. Keliling segitiga itu empat belas sentimeter.",
      tambah("enam", teks("sm", 236, 128, "6 + 5 + 3 = 14", 10.5, W.merah)),
      tambah("Keliling", teks("kl", 236, 146, "keliling = 14 cm", 9.4, W.hijau)),
      ubah("sentimeter.", { id: "tm", warna: W.hijauMuda }),
    ),
    k(
      "Hasilnya sama dengan di buku. Kalau hasil ukurmu sedikit berbeda dari teman, periksa dulu cara mengukurnya, lalu sepakati hasil yang paling banyak diperoleh.",
      tambah("Hasilnya", emo("ok", 190, 188, "✅", 18)),
      tambah("periksa", ...kartu("pr", 20, 164, 150, 34, W.krem, ["sedikit beda? periksa cara ukur"], 7.8)),
    ),
  ],
};

/* ------------------------------ 8. String Unrolling: konsep ------------------------------ */
const TB = titikSegitiga(6, 3, 5, 18);
const benangTepi = (id: string, x: number, y: number) => poligon(id, x, y, TB, "none", W.emas, { tebal: 4.4 });

export const ADEGAN_LUAR_BENANG: AdeganStory = {
  id: "luar-benang",
  judul: "String Unrolling: meluruskan benang",
  sumber: "Metode luar: String Unrolling",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Metode keempat, String Unrolling, artinya meluruskan benang. Lilitkan benang tepat di sepanjang tepi segitiga satu putaran penuh.",
      tambah(0, judul("String Unrolling")),
      tambah("Metode", poligon("tb", 30, 70, TB, W.langit, W.biru, { tebal: 1.2 })),
      tambah("Lilitkan", benangTepi("bn", 30, 70)),
      tambah("putaran", emo("bt", 230, 100, "🧵", 34)),
    ),
    k(
      "Lalu lepaskan benang itu dan luruskan di samping penggaris. Panjang benang yang lurus itulah keliling segitiga.",
      hapus("lepaskan", "bn"),
      tambah("luruskan", garis("bl", 25, 152, 168, 0, W.emas, 4.4)),
      tambah("penggaris.", ...penggaris("pg", 20, 162, 15, 12)),
      tambah("keliling", teks("kt", 150, 136, "panjang benang = keliling", 9.4, W.merah)),
    ),
    k(
      "Alasannya langsung dari buku: keliling adalah jumlah panjang sisi-sisinya, yaitu panjang seluruh tepi bangun. Benang yang melilit tepi sudah menjadi jalur itu, jadi panjang benang sama dengan keliling.",
      bersih(0),
      tambah(0, judul("Mengapa benar")),
      tambah(0, poligon("tb", 24, 70, TB, W.langit, W.biru, { tebal: 1.2 }), benangTepi("bn", 24, 70)),
      tambah("Benang", ...kartu("c1", 150, 50, 138, 40, W.krem, ["benang = jalur tepi"], 9)),
      tambah("jadi", ...kartu("c2", 150, 100, 138, 44, W.hijauMuda, ["panjang benang", "= keliling"], 9)),
    ),
    k(
      "Kekurangannya, benang harus disiapkan dan lilitannya harus pas di tepi. Karena itu metode ini cocok untuk membuktikan, lalu hasilnya diperiksa dengan menjumlahkan sisi.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kekurangannya,", ...kartu("d1", 20, 36, 260, 50, W.merahMuda, ["kekurangan:", "benang harus disiapkan, lilitan harus pas"], 8.8)),
      tambah("cocok", ...kartu("d2", 20, 100, 260, 50, W.hijauMuda, ["cocok untuk membuktikan,", "lalu periksa dengan menjumlahkan sisi"], 8.8)),
    ),
  ],
};

/* ------------------------------ 9. String Unrolling: penerapan ------------------------------ */
const warnaSeg = [W.langit, W.hijauMuda, W.krem];

export const ADEGAN_LUAR_BENANG_TERAPAN: AdeganStory = {
  id: "luar-benang-terapan",
  judul: "String Unrolling pada tiga segitiga buku",
  sumber: "Metode luar: String Unrolling; contoh Buku Siswa hlm. 115–117",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Segitiga pertama: benang dipotong menurut sisinya, tiga, lima, dan enam sentimeter, lalu dirangkai lurus. Totalnya empat belas sentimeter.",
      tambah(0, judul("Benang segitiga pertama")),
      tambah("Segitiga", poligon("sg", 24, 44, titikSegitiga(6, 3, 5, 12), W.langit, W.biru)),
      tambah(6, ...pitaBenang("pb", 36, 110, [[3, W.langit]], 12), teks("pl0", 54, 104, "3", 9.4, W.merah)),
      tambah(7, ...pitaBenang("pc", 72, 110, [[5, W.hijauMuda]], 12), teks("pl1", 102, 104, "5", 9.4, W.merah)),
      tambah(9, ...pitaBenang("pd", 132, 110, [[6, W.krem]], 12), teks("pl2", 168, 104, "6", 9.4, W.merah)),
      tambah("Totalnya", garis("br", 36, 134, 168, 0, W.biru, 2), teks("pt", 120, 154, "panjang lurus = 14 cm", 9.8, W.hijau)),
    ),
    k(
      "Segitiga sama sisi lima sentimeter: tiga potong benang yang sama, lima, lima, dan lima. Rangkaian lurusnya lima belas sentimeter.",
      bersih(0),
      tambah(0, judul("Benang segitiga sama sisi")),
      tambah(0, poligon("sg", 24, 40, titikSegitiga(5, 5, 5, 9), W.hijauMuda, W.biru), ...tandaSama("sg", 24, 40, titikSegitiga(5, 5, 5, 9), [0, 1, 2])),
      tambah(10, ...pitaBenang("pb", 36, 110, [[5, W.langit]], 12), teks("pl0", 66, 104, "5", 9.4, W.merah)),
      tambah(11, ...pitaBenang("pc", 96, 110, [[5, W.hijauMuda]], 12), teks("pl1", 126, 104, "5", 9.4, W.merah)),
      tambah(13, ...pitaBenang("pd", 156, 110, [[5, W.krem]], 12), teks("pl2", 186, 104, "5", 9.4, W.merah)),
      tambah("Rangkaian", garis("br", 36, 134, 180, 0, W.biru, 2), teks("pt", 126, 154, "panjang lurus = 15 cm", 9.8, W.hijau)),
    ),
    k(
      "Segitiga sama kaki enam, enam, empat: dua potong benang sama panjang dan satu potong lebih pendek. Rangkaian lurusnya enam belas sentimeter.",
      bersih(0),
      tambah(0, judul("Benang segitiga sama kaki")),
      tambah(0, poligon("sg", 24, 38, titikSegitiga(4, 6, 6, 9), W.pink, W.biru), ...tandaSama("sg", 24, 38, titikSegitiga(4, 6, 6, 9), [1, 2])),
      tambah(3, ...pitaBenang("pb", 36, 110, [[6, W.langit]], 12), teks("pl0", 72, 104, "6", 9.4, W.merah)),
      tambah(4, ...pitaBenang("pc", 108, 110, [[6, W.hijauMuda]], 12), teks("pl1", 144, 104, "6", 9.4, W.merah)),
      tambah(5, ...pitaBenang("pd", 180, 110, [[4, W.krem]], 12), teks("pl2", 204, 104, "4", 9.4, W.merah)),
      tambah("Rangkaian", garis("br", 36, 134, 192, 0, W.biru, 2), teks("pt", 132, 154, "panjang lurus = 16 cm", 9.8, W.hijau)),
    ),
    k(
      "Ketiga benang lurus dibandingkan: empat belas, lima belas, dan enam belas sentimeter. Hasilnya sama dengan jumlah sisi di metode pertama.",
      bersih(0),
      tambah(0, judul("Tiga benang lurus")),
      tambah(0, ...pitaBenang("x", 20, 50, [[3, warnaSeg[0]], [5, warnaSeg[1]], [6, warnaSeg[2]]], 10), ...pitaBenang("y", 20, 90, [[5, warnaSeg[0]], [5, warnaSeg[1]], [5, warnaSeg[2]]], 10), ...pitaBenang("z", 20, 130, [[6, warnaSeg[0]], [6, warnaSeg[1]], [4, warnaSeg[2]]], 10)),
      tambah("empat", teks("tx", 240, 61, "14 cm", 10, W.merah)),
      tambah("lima", teks("ty", 240, 101, "15 cm", 10, W.merah)),
      tambah("enam", teks("tz", 240, 141, "16 cm", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
const CONTOH = tabel("ct", 20, 30, [80, 100, 80], [["jenis", "sisi (cm)", "keliling"], ["sembarang", "3, 5, 6", "14 cm"], ["sembarang", "7, 4, 5", "16 cm"], ["sama sisi", "5", "15 cm"], ["sama sisi", "6", "18 cm"], ["sama kaki", "6, 6, 4", "16 cm"]], 22, 8.8);
const barisTabel = (r: number) => CONTOH.filter((o) => new RegExp(`^ct-[st]${r}\\d$`).test(o.id));

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Mari ringkas empat metode. Side Sum menjumlahkan semua sisi. Equilateral Shortcut mengalikan tiga untuk segitiga sama sisi. Measure Then Sum mengukur dulu, lalu menjumlahkan. String Unrolling meluruskan benang tepi.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Side", ...kartu("r1", 12, 32, 276, 32, W.hijauMuda, ["Side Sum: jumlahkan semua sisi"], 8.8)),
      tambah("Equilateral", ...kartu("r2", 12, 72, 276, 32, W.langit, ["Equilateral Shortcut: 3 × panjang sisi"], 8.8)),
      tambah("Measure", ...kartu("r3", 12, 112, 276, 32, W.krem, ["Measure Then Sum: ukur, lalu jumlahkan"], 8.8)),
      tambah("String", ...kartu("r4", 12, 152, 276, 32, W.pink, ["String Unrolling: luruskan benang tepi"], 8.8)),
    ),
    k(
      "Memilih metode: sisi sudah diketahui, pakai Side Sum. Tiga sisi sama, pakai pintasan. Angka belum ada, ukur dulu. Ingin membuktikan, luruskan benang.",
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah(2, ...kartu("p1", 12, 32, 276, 32, W.hijauMuda, ["sisi sudah diketahui → Side Sum"], 8.8)),
      tambah(8, ...kartu("p2", 12, 72, 276, 32, W.langit, ["tiga sisi sama → pintasan"], 8.8)),
      tambah(13, ...kartu("p3", 12, 112, 276, 32, W.krem, ["angka belum ada → ukur dulu"], 8.8)),
      tambah(18, ...kartu("p4", 12, 152, 276, 32, W.pink, ["ingin bukti → luruskan benang"], 8.8)),
    ),
    k(
      "Hasil keempat metode cocok dengan buku. Sembarang tiga, lima, enam empat belas, dan tujuh, empat, lima enam belas. Sama sisi lima lima belas, enam delapan belas. Sama kaki enam, enam, empat enam belas.",
      bersih(0),
      tambah(0, judul("Cocok dengan buku")),
      tambah(0, ...barisTabel(0)),
      tambah(6, ...barisTabel(1)),
      tambah(13, ...barisTabel(2)),
      tambah(18, ...barisTabel(3)),
      tambah(23, ...barisTabel(4)),
      tambah(26, ...barisTabel(5)),
    ),
    k(
      "Apa pun metodenya, keliling segitiga adalah jumlah panjang ketiga sisinya. Pilih cara yang paling cocok, lalu periksa dengan cara lain. Selamat berlatih.",
      bersih(0),
      tambah(0, judul("Satu gagasan, banyak cara")),
      tambah("keliling", poligon("fz", 90, 42, titikSegitiga(6, 3, 5, 20), W.langit, W.biru, { tebal: 2.4 })),
      tambah("Pilih", ...kartu("fa", 30, 118, 240, 34, W.krem, ["pilih cara, lalu periksa dengan cara lain"], 9)),
      tambah("berlatih.", emo("fy", 150, 184, "🎉", 26)),
    ),
  ],
};
