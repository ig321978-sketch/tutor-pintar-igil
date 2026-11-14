import type { AdeganStory } from "./logika-story";
import { W, angkaKarakter, barisTabel, daftar, emo, judul, kartu, panah, tabel, teks } from "./k4b2e-gambar";
import { bersih, k, tambah } from "./k4b2e-bantu";

/* ------------------------------ 5. Ayo Berpikir: cara biasa dan cara langsung (Buku Siswa hlm. 79-81; Panduan Guru hlm. 109) ------------------------------ */
export const ADEGAN_LANGSUNG: AdeganStory = {
  id: "langsung",
  judul: "Ayo Berpikir: cara biasa dan cara langsung",
  sumber: "Buku Siswa hlm. 79–81; Panduan Guru hlm. 109",
  latar: "#EFF6FF",
  kutipan: [
    "Ibu untuk mengubah pecahan desimal perseratusan menjadi bentuk persen bolehkah langsung dikalikan 100%",
    "Ada dua cara merubah pecahan desimal perseratusan menjadi persen",
    "Untuk mengubah pecahan desimal perseratusan menjadi bentuk persen bisa langsung mengalikannya dengan 100%",
    "0,36 × 100% = (0,36 × 100)% = 36%",
    "Cara Langsung : Jika terdapat desimal perseratusan yang akan diubah menjadi bentuk persen maka kita tinggal mengalikan desimal perseratusan tersebut",
    "0,25 x 100% = (0,25 x 100)% = 25%",
    "2,36 x 100% = (2,36 x 100)% = 236%",
    "Guru menjelaskan cara langsung dalam mengubah perseratusan menjadi bentuk persen",
  ],
  ketukan: [
    k(
      "Ayo berpikir. Murid bertanya: bolehkah desimal perseratusan langsung dikalikan dengan seratus persen? Ibu guru menjawab bahwa ada dua cara mengubahnya.",
      bersih(0),
      tambah(0, judul("Ayo Berpikir")),
      tambah(0, emo("l1", 40, 66, "👧", 30)),
      tambah("bolehkah", ...kartu("l2", 70, 38, 220, 36, W.krem, ["boleh langsung dikali 100%?"], 10)),
      tambah("Ibu", emo("l3", 40, 130, "👩", 30)),
      tambah("dua", ...kartu("l4", 70, 106, 220, 36, W.hijauMuda, ["ada dua cara"], 11)),
    ),
    k(
      "Cara satu, cara biasa: ubah desimal perseratusan menjadi pecahan biasa lalu ke persen. Nol koma tujuh lima menjadi tujuh puluh lima per seratus, yaitu tujuh puluh lima persen.",
      bersih(0),
      tambah(0, judul("Cara 1: cara biasa")),
      tambah("Cara", ...kartu("l5", 80, 32, 140, 26, W.krem, ["0,75 = ... %"], 11)),
      tambah("Nol", ...kartu("l6", 12, 76, 276, 34, W.langit, ["0,75 = 75/100"], 12)),
      tambah("yaitu", ...kartu("l7", 12, 122, 276, 34, W.hijauMuda, ["75/100 = 75%"], 12)),
    ),
    k(
      "Cara dua, cara langsung: kalikan desimal perseratusan dengan seratus persen. Nol koma tujuh lima dikali seratus persen sama dengan tujuh puluh lima persen. Hasilnya sama.",
      bersih(0),
      tambah(0, judul("Cara 2: cara langsung")),
      tambah("kalikan", ...kartu("l8", 12, 40, 276, 36, W.hijauMuda, ["0,75 × 100% = 75%"], 13)),
      tambah("Hasilnya", ...kartu("l9", 30, 100, 240, 28, W.pink, ["cara 1 dan cara 2: sama, 75%"], 10.4)),
    ),
    k(
      "Contoh lain, nol koma tiga enam. Cara biasa: tiga puluh enam per seratus, lalu tiga puluh enam persen. Cara langsung: nol koma tiga enam dikali seratus, lalu diberi tanda persen.",
      bersih(0),
      tambah(0, judul("Contoh 0,36")),
      tambah("Contoh", ...kartu("l10", 12, 36, 132, 26, W.langit, ["cara biasa"], 10)),
      tambah("Contoh", ...kartu("l11", 156, 36, 132, 26, W.hijauMuda, ["cara langsung"], 10)),
      tambah("biasa:", ...kartu("l12", 12, 76, 132, 30, W.krem, ["0,36 = 36/100"], 10.4)),
      tambah("seratus,", ...kartu("l13", 12, 116, 132, 30, W.krem, ["36/100 = 36%"], 10.4)),
      tambah("langsung:", ...kartu("l14", 156, 76, 132, 30, W.krem, ["0,36 × 100% ="], 10.4)),
      tambah("tanda", ...kartu("l15", 156, 116, 132, 30, W.krem, ["(0,36 × 100)% = 36%"], 9.4)),
    ),
    k(
      "Ingat! Cara langsung: kalikan desimal perseratusan dengan seratus persen. Nol koma dua lima menjadi dua puluh lima persen. Dua koma tiga enam menjadi dua ratus tiga puluh enam persen.",
      bersih(0),
      tambah(0, judul("Ingat! Cara langsung")),
      tambah("Cara", ...kartu("l16", 12, 34, 276, 30, W.pink, ["kalikan dengan 100%"], 11)),
      tambah("Nol", ...kartu("l17", 12, 80, 276, 32, W.hijauMuda, ["0,25 × 100% = (0,25 × 100)% = 25%"], 9.2)),
      tambah("Dua@3", ...kartu("l18", 12, 124, 276, 32, W.hijauMuda, ["2,36 × 100% = (2,36 × 100)% = 236%"], 9.2)),
      tambah("ratus@3", ...kartu("l19", 30, 168, 240, 26, W.krem, ["Panduan Guru menjelaskan cara langsung"], 8.6)),
    ),
  ],
};

/* ------------------------------ 6. Tahukah Kalian: menggeser koma (Buku Siswa hlm. 82) ------------------------------ */
export const ADEGAN_GESER: AdeganStory = {
  id: "geser",
  judul: "Tahukah Kalian: geser koma",
  sumber: "Buku Siswa hlm. 82",
  latar: "#FEFCE8",
  kutipan: [
    "Tahukah Kalian",
    "menggeser tanda koma pada bilangan desimal dua kali kekanan",
    "Tanda koma kita geser ke kanan dua kali",
    "0,25 x 100% = 25%",
    "2,36 x 100% = 236%",
  ],
  ketukan: [
    k(
      "Tahukah kalian? Supaya mengalikan desimal perseratusan dengan seratus persen lebih mudah, geser tanda koma dua kali ke kanan.",
      bersih(0),
      tambah(0, judul("Tahukah Kalian?")),
      tambah(0, emo("g1", 150, 80, "💡", 40)),
      tambah("geser", ...kartu("g2", 30, 104, 240, 34, W.krem, ["tanda koma: geser 2 kali ke kanan"], 10)),
      tambah("seratus@2", ...kartu("g3", 60, 150, 180, 28, W.hijauMuda, ["× 100%"], 12)),
    ),
    k(
      "Nol koma dua lima: geser tanda koma dua kali ke kanan, jadi dua puluh lima persen. Dua koma tiga enam, geser dua kali, jadi dua ratus tiga puluh enam persen.",
      bersih(0),
      tambah(0, judul("Koma bergeser dua kali")),
      ...angkaKarakter("ga", 40, 70, "0,25", 16, 20).map((o) => tambah("Nol", o)),
      tambah("geser", panah("g4", 112, 62, 50, 0, W.merah, 2)),
      tambah("puluh", teks("g5", 200, 70, "25%", 22, W.hijau)),
      ...angkaKarakter("gb", 40, 140, "2,36", 16, 20).map((o) => tambah("Dua@4", o)),
      tambah("geser@2", panah("g6", 112, 132, 50, 0, W.merah, 2)),
      tambah("tiga@2", teks("g7", 205, 140, "236%", 22, W.hijau)),
    ),
    k(
      "Perhatikan: angkanya tetap, hanya letak tanda koma yang berpindah dua tempat ke kanan.",
      bersih(0),
      tambah(0, judul("Angka tetap, koma pindah")),
      tambah("angkanya", ...kartu("g8", 30, 40, 240, 40, W.krem, ["0,25 → 25%"], 15)),
      tambah("koma", ...kartu("g9", 30, 96, 240, 40, W.krem, ["2,36 → 236%"], 15)),
      tambah("berpindah", ...kartu("g10", 30, 152, 240, 30, W.hijauMuda, ["angka sama, koma pindah 2 tempat"], 9.6)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih: desimal ke persen (Buku Siswa hlm. 82; Panduan Guru hlm. 110) ------------------------------ */
const TAB_LATIHAN_1 = tabel(
  "lt",
  35,
  40,
  [30, 100, 100],
  [
    ["", "desimal", "persen"],
    ["a", "0,12", "12%"],
    ["b", "1,15", "115%"],
    ["c", "5,62", "562%"],
    ["d", "10,55", "1055%"],
  ],
  22,
  10,
);
export const ADEGAN_BERLATIH_1E: AdeganStory = {
  id: "berlatih-1e",
  judul: "Latihan 1: desimal ke persen",
  sumber: "Buku Siswa hlm. 82; Panduan Guru hlm. 110",
  latar: "#F0FDF4",
  kutipan: [
    "Kerjakan soal berikut pada buku tulis kalian",
    "Ubahlah bilangan desimal perseratusan berikut menjadi bentuk persen",
    "a. 0,12 = ... %",
    "d. 10,55 = ... %",
    "a. 0,12 = 12 %",
    "b. 1,15 = 115 %",
    "c. 5,62 = 562 %",
    "d. 10,55 = 1055 %",
  ],
  ketukan: [
    k(
      "Sekarang latihan mandiri, soal satu: ubah desimal perseratusan menjadi persen. Bagian a: nol koma satu dua, jadi dua belas persen. Bagian b: satu koma satu lima, jadi seratus lima belas persen.",
      bersih(0),
      tambah(0, judul("Latihan 1: ke persen")),
      tambah("Soal", ...barisTabel(TAB_LATIHAN_1, "lt", 0)),
      tambah("Bagian", ...barisTabel(TAB_LATIHAN_1, "lt", 1)),
      tambah("Bagian@2", ...barisTabel(TAB_LATIHAN_1, "lt", 2)),
    ),
    k(
      "Bagian c: lima koma enam dua, jadi lima ratus enam puluh dua persen. Bagian d: sepuluh koma lima lima, jadi seribu lima puluh lima persen.",
      tambah("Bagian", ...barisTabel(TAB_LATIHAN_1, "lt", 3)),
      tambah("sepuluh", ...barisTabel(TAB_LATIHAN_1, "lt", 4)),
    ),
    k(
      "Kunci Panduan Guru sama: dua belas, seratus lima belas, lima ratus enam puluh dua, dan seribu lima puluh lima persen. Periksa: sepuluh koma lima lima dikali seratus memang seribu lima puluh lima.",
      bersih(0),
      tambah(0, judul("Memeriksa kunci")),
      tambah("Kunci", ...kartu("bt", 12, 40, 276, 32, W.hijauMuda, ["kunci: 12%, 115%, 562%, 1055%"], 10.4)),
      tambah("Periksa", ...kartu("bu", 12, 90, 276, 32, W.krem, ["periksa: 10,55 × 100 = 1055"], 10.4)),
      tambah("memang", ...kartu("bx", 60, 140, 180, 30, W.pink, ["kunci buku benar"], 10.4)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih: persen ke desimal dan Diferensiasi (Buku Siswa hlm. 82; Panduan Guru hlm. 110) ------------------------------ */
const TAB_LATIHAN_2 = tabel(
  "lp",
  35,
  40,
  [30, 100, 100],
  [
    ["", "persen", "desimal"],
    ["a", "18%", "0,18"],
    ["b", "65%", "0,65"],
    ["c", "123%", "1,23"],
    ["d", "675%", "6,75"],
  ],
  22,
  10,
);
export const ADEGAN_BERLATIH_2E: AdeganStory = {
  id: "berlatih-2e",
  judul: "Latihan 2: persen ke desimal",
  sumber: "Buku Siswa hlm. 82; Panduan Guru hlm. 110",
  latar: "#FFF7ED",
  kutipan: [
    "Ubahlah bentuk persen berikut menjadi bentuk pecahan desimal",
    "a. 18% = 0,18",
    "d. 675% = 6,75",
    "Model pembelajaran yang disarankan untuk bab ini adalah Problem Based Learning",
    "minta mereka mengerjakan Latihan tanpa bantuan",
    "guru dapat mendampingi peserta didik yang mengalami kesulitan",
  ],
  ketukan: [
    k(
      "Soal dua kebalikannya: ubah persen menjadi desimal perseratusan. Caranya persen dibagi seratus, atau koma digeser dua kali ke kiri. Delapan belas persen menjadi nol koma satu delapan, enam puluh lima persen menjadi nol koma enam lima.",
      bersih(0),
      tambah(0, judul("Latihan 2: ke desimal")),
      tambah("Soal", ...barisTabel(TAB_LATIHAN_2, "lp", 0)),
      tambah("Delapan", ...barisTabel(TAB_LATIHAN_2, "lp", 1)),
      tambah("enam@2", ...barisTabel(TAB_LATIHAN_2, "lp", 2)),
      tambah("Caranya", ...kartu("bv", 40, 140, 220, 30, W.krem, ["bagi 100: koma ke kiri 2 kali"], 9.6)),
    ),
    k(
      "Seratus dua puluh tiga persen menjadi satu koma dua tiga. Enam ratus tujuh puluh lima persen menjadi enam koma tujuh lima. Semuanya cocok dengan kunci Panduan Guru.",
      tambah("Seratus", ...barisTabel(TAB_LATIHAN_2, "lp", 3)),
      tambah("Enam", ...barisTabel(TAB_LATIHAN_2, "lp", 4)),
      tambah("cocok", ...kartu("bw", 40, 178, 220, 22, W.hijauMuda, ["cocok dengan kunci buku"], 9)),
    ),
    k(
      "Diferensiasi dari Panduan Guru: model Problem Based Learning dengan kelompok campuran, ketuanya murid berkemampuan tinggi. Murid yang cepat mengerjakan latihan tanpa bantuan atau soal tambahan. Guru mendampingi murid yang kesulitan.",
      ...daftar("df", "Diferensiasi", [
        { at: "Problem", t: "Problem Based Learning, kelompok campuran", w: W.langit, u: 9.2 },
        { at: "cepat", t: "murid cepat: tanpa bantuan, soal tambahan", w: W.hijauMuda, u: 9 },
        { at: "mendampingi", t: "guru mendampingi yang kesulitan", w: W.krem, u: 9.6 },
      ]),
    ),
  ],
};
