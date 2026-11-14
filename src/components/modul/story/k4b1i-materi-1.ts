import type { AdeganStory, Obj } from "./logika-story";
import { W, bagiBenda, barisTabel, daftar, deret, emo, idDari, judul, kartu, suku, tabel, teks } from "./k4b1i-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b1i-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab I (Buku Siswa hlm. 48; Panduan Guru hlm. 70-71) ------------------------------ */
export const ADEGAN_PEMBUKA_I: AdeganStory = {
  id: "pembuka-i",
  judul: "Sub-Bab I: Faktor dan Kelipatan",
  sumber: "Materi: faktor dan kelipatan",
  latar: "#FDF2F8",
  kutipan: [
    "I. Faktor dan Kelipatan",
    "Memahami konsep faktor dari bilangan cacah",
    "Memahami konsep kelipatan dari bilangan cacah",
    "pensil, buku tulis, kelereng",
    "pengembangan dari konsep pembagian dan perkalian",
    "Faktor dari bilangan adalah bilangan yang habis membagi bilangan tersebut",
    "Kelipatan dari bilangan cacah adalah bilangan-bilangan yang merupakan hasil kali bilangan tersebut dengan bilangan asli",
    "Bagaimana menentukan faktor suatu bilangan?",
    "Bagaimana menentukan kelipatan suatu bilangan?",
    "Terdapat beberapa permen yang akan dibagi",
    "Guru tidak perlu memberikan jawaban yang benar",
  ],
  ketukan: [
    k(
      "Sekarang kita belajar faktor dan kelipatan. Ada dua hal yang akan kamu pahami: faktor dari bilangan cacah, dan kelipatan dari bilangan cacah.",
      bersih(0),
      tambah(0, judul("Faktor dan Kelipatan")),
      tambah("faktor@2", ...kartu("pe1", 30, 56, 240, 34, W.hijauMuda, ["1. konsep faktor bilangan cacah"], 9.6)),
      tambah("kelipatan@2", ...kartu("pe2", 30, 108, 240, 34, W.pink, ["2. konsep kelipatan bilangan cacah"], 9.6)),
    ),
    k(
      "Siapkan pensil, kertas, dan kelereng. Ingat dulu: faktor dan kelipatan berkembang dari pembagian dan perkalian.",
      bersih(0),
      tambah(0, judul("Sarana dan apersepsi")),
      tambah("pensil,", emo("sr1", 70, 74, "✏", 34)),
      tambah("kertas", emo("sr2", 150, 74, "📄", 34)),
      tambah("kelereng.", emo("sr3", 230, 74, "🔵", 34)),
      tambah("ingat", ...kartu("ap", 20, 108, 260, 26, W.krem, ["berkembang dari konsep:"], 9.6)),
      tambah("pembagian", ...kartu("ap1", 30, 146, 110, 28, W.langit, ["pembagian"], 10)),
      tambah("perkalian.", ...kartu("ap2", 160, 146, 110, 28, W.hijauMuda, ["perkalian"], 10)),
    ),
    k(
      "Faktor dari suatu bilangan adalah bilangan yang habis membagi bilangan itu. Kelipatan adalah hasil kali bilangan itu dengan bilangan asli.",
      bersih(0),
      tambah(0, judul("Dua istilah")),
      tambah("Faktor", ...kartu("de1", 12, 34, 276, 30, W.hijauMuda, ["faktor: habis membagi bilangan itu"], 9.4)),
      tambah("habis", ...kartu("de2", 12, 70, 276, 28, W.krem, ["contoh: 12 : 3 = 4, tanpa sisa"], 9.4)),
      tambah("Kelipatan", ...kartu("de3", 12, 112, 276, 30, W.pink, ["kelipatan: hasil kali dengan bilangan asli"], 9)),
      tambah("hasil", ...kartu("de4", 12, 148, 276, 28, W.krem, ["contoh: 2 × 4 = 8"], 9.4)),
    ),
    k(
      "Coba pikirkan: bagaimana menentukan faktor, dan bagaimana menentukan kelipatan? Sebagai pemanasan, bayangkan permen dibagi rata kepada dua, tiga, atau empat orang.",
      bersih(0),
      tambah(0, judul("Pertanyaan pemantik")),
      tambah("faktor", ...kartu("pm1", 12, 34, 276, 28, W.hijauMuda, ["bagaimana menentukan faktor?"], 9.6)),
      tambah("kelipatan", ...kartu("pm2", 12, 68, 276, 28, W.pink, ["bagaimana menentukan kelipatan?"], 9.6)),
      tambah("permen", emo("pmp", 150, 126, "🍬", 28)),
      tambah("dua,", ...kartu("pm3", 12, 140, 84, 28, W.krem, ["2 orang"], 9.6)),
      tambah("tiga,", ...kartu("pm4", 108, 140, 84, 28, W.krem, ["3 orang"], 9.6)),
      tambah("empat", ...kartu("pm5", 204, 140, 84, 28, W.krem, ["4 orang"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Mengamati: faktor dari 12 (Buku Siswa hlm. 48; Panduan Guru hlm. 71) ------------------------------ */
const PEN = (id: string, orang: number): Obj[] => bagiBenda(id, 30, 40, 12, orang, 240);
const TAB_F12 = tabel(
  "t12",
  47,
  34,
  [100, 106],
  [
    ["Pembagian", "Perkalian"],
    ["12 : 1 = 12", "1 × 12 = 12"],
    ["12 : 2 = 6", "2 × 6 = 12"],
    ["12 : 3 = 4", "3 × 4 = 12"],
    ["12 : 4 = 3", "4 × 3 = 12"],
    ["12 : 6 = 2", "6 × 2 = 12"],
  ],
  17,
  8.8,
);
const D_F12 = deret("f12", 17, 78, ["1", "2", "3", "4", "6", "12"], { bw: 36, gap: 10 });
export const ADEGAN_FAKTOR_12: AdeganStory = {
  id: "faktor-12",
  judul: "Mengamati: faktor dari 12",
  sumber: "Materi: faktor dari 12",
  latar: "#FFFBEB",
  kutipan: [
    "Pak Guru mempunyai 12 buah pensil tulis",
    "Pensil dibagikan hanya kepada Azizah",
    "Pensil dibagikan kepada Azizah dan Putu.",
    "Dari kelima kejadian di atas, dapat dituliskan.",
    "Faktor atau pembagi dari 12 adalah 1, 2, 3, 4, 6 dan 12",
    "Guru meminta peserta didik untuk mengamati ilustrasi.",
    "menyiapkan benda selain pensil",
    "Guru dapat menarik karakteristik bilangan prima",
  ],
  ketukan: [
    k(
      "Perhatikan. Ada dua belas pensil yang akan dibagikan. Jika hanya untuk Azizah, dua belas bagi satu sama dengan dua belas.",
      bersih(0),
      tambah(0, judul("Mengamati")),
      tambah("pensil", ...PEN("p1", 1)),
      tambah("Azizah,", ...kartu("e1", 60, 84, 180, 28, W.krem, ["untuk Azizah saja"], 9.6)),
      tambah("sama", ...kartu("q1", 60, 124, 180, 30, W.hijauMuda, ["12 : 1 = 12"], 11)),
    ),
    k(
      "Dibagikan kepada Azizah dan Putu: dua belas bagi dua sama dengan enam. Lalu kepada Azizah, Putu, dan Helen: dua belas bagi tiga sama dengan empat.",
      bersih(0),
      tambah(0, judul("Mengamati")),
      tambah("Putu:", ...PEN("p2", 2)),
      tambah("enam.", ...kartu("q2", 60, 84, 180, 30, W.hijauMuda, ["12 : 2 = 6"], 11)),
      tambah("enam.", ...kartu("r2", 60, 124, 180, 28, W.krem, ["tiap anak 6 pensil"], 9.6)),
      hapus("Helen:", ...idDari(PEN("p2", 2)), "q2-k", "q2-t0", "r2-k", "r2-t0"),
      tambah("Helen:", ...PEN("p3", 3)),
      tambah("empat.", ...kartu("q3", 60, 84, 180, 30, W.hijauMuda, ["12 : 3 = 4"], 11)),
      tambah("empat.", ...kartu("r3", 60, 124, 180, 28, W.krem, ["tiap anak 4 pensil"], 9.6)),
    ),
    k(
      "Kepada empat siswa, dua belas bagi empat sama dengan tiga. Kepada enam siswa, dua belas bagi enam sama dengan dua. Semuanya habis tanpa sisa.",
      bersih(0),
      tambah(0, judul("Mengamati")),
      tambah("empat", ...PEN("p4", 4)),
      tambah("tiga.", ...kartu("q4", 60, 84, 180, 30, W.hijauMuda, ["12 : 4 = 3"], 11)),
      tambah("tiga.", ...kartu("r4", 60, 124, 180, 28, W.krem, ["tiap anak 3 pensil"], 9.6)),
      hapus("enam", ...idDari(PEN("p4", 4)), "q4-k", "q4-t0", "r4-k", "r4-t0"),
      tambah("enam", ...PEN("p6", 6)),
      tambah("dua@3", ...kartu("q6", 60, 84, 180, 30, W.hijauMuda, ["12 : 6 = 2"], 11)),
      tambah("dua@3", ...kartu("r6", 60, 124, 180, 28, W.krem, ["tiap anak 2 pensil"], 9.6)),
      tambah("tanpa", ...kartu("s6", 60, 164, 180, 26, W.langit, ["sisa 0"], 9.6)),
    ),
    k(
      "Dari lima kejadian itu dibuat tabel pembagi, pembagi, dan hasil kali. Satu kali dua belas, dua kali enam, tiga kali empat, empat kali tiga, enam kali dua, semuanya dua belas.",
      bersih(0),
      tambah(0, judul("Tabel pembagian dan perkalian")),
      tambah("tabel", ...barisTabel(TAB_F12, "t12", 0)),
      tambah("Satu", ...barisTabel(TAB_F12, "t12", 1)),
      tambah("enam", ...barisTabel(TAB_F12, "t12", 2)),
      tambah("tiga", ...barisTabel(TAB_F12, "t12", 3)),
      tambah("tiga@2", ...barisTabel(TAB_F12, "t12", 4)),
      tambah("enam@2", ...barisTabel(TAB_F12, "t12", 5)),
    ),
    k(
      "Faktor atau pembagi dari dua belas adalah satu, dua, tiga, empat, enam, dan dua belas.",
      bersih(0),
      tambah(0, judul("Faktor dari 12")),
      tambah("satu,", ...suku(D_F12, 0)),
      tambah("dua@2", ...suku(D_F12, 1)),
      tambah("tiga,", ...suku(D_F12, 2)),
      tambah("empat,", ...suku(D_F12, 3)),
      tambah("enam,", ...suku(D_F12, 4)),
      tambah("belas.", ...suku(D_F12, 5)),
      tambah("belas.", ...kartu("fk", 40, 132, 220, 28, W.hijauMuda, ["faktor 12: 1, 2, 3, 4, 6, 12"], 10)),
    ),
    k(
      "Boleh menyiapkan benda nyata, seperti permen atau kerikil. Setelah faktor dipahami, kita kenali bilangan prima.",
      ...daftar("pg", "Tips belajar", [
        { at: "menyiapkan", t: "siapkan benda nyata: permen, kerikil", w: W.krem, u: 9 },
        { at: "prima.", t: "lalu kenali bilangan prima", w: W.pink, u: 9 },
      ]),
    ),
  ],
};

/* ------------------------------ 3. Mengapa 5 bukan faktor 12, dan faktor 20 (Buku Siswa hlm. 49) ------------------------------ */
const TAB_F20 = tabel(
  "t20",
  47,
  34,
  [100, 106],
  [
    ["Pembagian", "Perkalian"],
    ["20 : 1 = 20", "1 × 20 = 20"],
    ["20 : 2 = 10", "2 × 10 = 20"],
    ["20 : 4 = 5", "4 × 5 = 20"],
    ["20 : 5 = 4", "5 × 4 = 20"],
    ["20 : 10 = 2", "10 × 2 = 20"],
  ],
  17,
  8.8,
);
const D_F20 = deret("f20", 17, 60, ["1", "2", "4", "5", "10", "20"], { bw: 36, gap: 10 });
export const ADEGAN_BUKAN_FAKTOR: AdeganStory = {
  id: "bukan-faktor",
  judul: "Mengapa 5 bukan faktor dari 12?",
  sumber: "Materi: bukan faktor dan faktor 20",
  latar: "#F0F9FF",
  kutipan: [
    "Mengapa 5 bukan merupakan faktor atau pembagi dari 12?",
    "Karena sisa bagi 12 dengan 5 tidak sama dengan 0",
    "Faktor atau pembagi dari 20 adalah 1, 2, 4, 5, 10, dan 20",
  ],
  ketukan: [
    k(
      "Coba jawab: mengapa lima bukan faktor atau pembagi dari dua belas? Karena sisa bagi dua belas dengan lima tidak sama dengan nol.",
      bersih(0),
      tambah(0, judul("Mengapa 5 bukan faktor 12?")),
      tambah("jawab:", ...kartu("bf1", 20, 40, 260, 30, W.langit, ["pertanyaan: mengapa 5 bukan faktor 12?"], 9.2)),
      tambah("Karena", ...kartu("bf2", 20, 84, 260, 30, W.krem, ["12 : 5 = 2 sisa 2"], 11)),
      tambah("nol.", ...kartu("bf3", 20, 130, 260, 36, W.merahMuda, ["sisa bukan 0, maka 5 bukan faktor"], 9.6)),
    ),
    k(
      "Sekarang tabel faktor dua puluh. Dua puluh bagi satu hasilnya dua puluh. Bagi dua hasilnya sepuluh, bagi empat hasilnya lima, bagi lima hasilnya empat, bagi sepuluh hasilnya dua.",
      bersih(0),
      tambah(0, judul("Tabel faktor 20")),
      tambah("tabel", ...barisTabel(TAB_F20, "t20", 0)),
      tambah("satu", ...barisTabel(TAB_F20, "t20", 1)),
      tambah("sepuluh", ...barisTabel(TAB_F20, "t20", 2)),
      tambah("lima,", ...barisTabel(TAB_F20, "t20", 3)),
      tambah("empat@2", ...barisTabel(TAB_F20, "t20", 4)),
      tambah("sepuluh@2", ...barisTabel(TAB_F20, "t20", 5)),
    ),
    k(
      "Faktor atau pembagi dari dua puluh adalah satu, dua, empat, lima, sepuluh, dan dua puluh.",
      bersih(0),
      tambah(0, judul("Faktor dari 20")),
      tambah("satu,", ...suku(D_F20, 0)),
      tambah("dua@2", ...suku(D_F20, 1)),
      tambah("empat,", ...suku(D_F20, 2)),
      tambah("lima,", ...suku(D_F20, 3)),
      tambah("sepuluh,", ...suku(D_F20, 4)),
      tambah("dan", ...suku(D_F20, 5)),
      tambah("dan", ...kartu("bf4", 40, 128, 220, 30, W.hijauMuda, ["faktor 20: 1, 2, 4, 5, 10, 20"], 10)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 1: tabel faktor 20 dan 48 (Buku Siswa hlm. 49; Panduan Guru hlm. 71-72) ------------------------------ */
const TA = tabel("ta", 30, 40, [50, 50], [["a. 20", "pasangan"], ["1", "20"], ["2", "...."], ["4", "...."], ["5", "...."], ["....", "2"]], 17, 8.6);
const TB = tabel("tb", 170, 40, [50, 50], [["b. 48", "pasangan"], ["1", "48"], ["2", "...."], ["3", "...."], ["4", "...."], ["....", "8"], ["....", "6"]], 17, 8.6);
const D_F48 = deret("f48", 16.5, 70, ["1", "2", "3", "4", "6", "8", "12", "16", "24", "48"], { bw: 24, gap: 3, u: 9.6 });
const isiSel = (at: string | number, id: string, r: number, c: number, nilai: string) => ubah(at, { id: `${id}-t${r}${c}`, isi: nilai, warna: W.hijau });
export const ADEGAN_BERLATIH_FAKTOR_1: AdeganStory = {
  id: "berlatih-faktor-1",
  judul: "Latihan 1: tabel faktor 20 dan 48",
  sumber: "Materi: tabel faktor 20 dan 48",
  latar: "#F0FDF4",
  kutipan: [
    "Isilah titik-titik pada tabel berikut dengan pembagi atau faktor dari bilangan 20 dan 48",
    "Jawaban a = 10, b = 5, c = 4, dan d = 10",
    "Jawaban b = 24, b = 16, c = 12, d = 6, dan e = 8",
  ],
  ketukan: [
    k(
      "Latihan satu: isilah titik-titik pada tabel dengan faktor dari dua puluh dan empat puluh delapan.",
      bersih(0),
      tambah(0, judul("Latihan 1")),
      tambah("dua", ...TA),
      tambah("empat", ...TB),
    ),
    k(
      "Dua puluh bagi dua sepuluh, bagi empat lima, bagi lima empat, dan baris terakhir sepuluh. Semuanya benar.",
      isiSel("sepuluh,", "ta", 2, 1, "10"),
      isiSel("lima,", "ta", 3, 1, "5"),
      isiSel("empat@2", "ta", 4, 1, "4"),
      isiSel("sepuluh@2", "ta", 5, 0, "10"),
    ),
    k(
      "Tabel empat puluh delapan: dua pasangannya dua puluh empat, tiga enam belas, empat dua belas. Baris kelima enam, baris keenam delapan.",
      isiSel(8, "tb", 2, 1, "24"),
      isiSel(11, "tb", 3, 1, "16"),
      isiSel(14, "tb", 4, 1, "12"),
      isiSel(17, "tb", 5, 0, "6"),
      isiSel(20, "tb", 6, 0, "8"),
    ),
    k(
      "Faktor empat puluh delapan ada sepuluh: satu, dua, tiga, empat, enam, delapan, dua belas, enam belas, dua puluh empat, empat puluh delapan. Perhatikan, semuanya habis membagi empat puluh delapan.",
      bersih(0),
      tambah(0, judul("Faktor dari 48")),
      ...[6, 7, 8, 9, 10, 11, 13, 15, 18, 21].map((p, i) => tambah(p, ...suku(D_F48, i))),
      tambah("Perhatikan", ...kartu("fk8", 20, 124, 260, 34, W.krem, ["10 faktor, semuanya habis membagi 48"], 9.2)),
    ),
  ],
};

/* ------------------------------ 5. Latihan 2: faktor 24, 25, 52 (Buku Siswa hlm. 50; Panduan Guru hlm. 72) ------------------------------ */
const D_24 = deret("fa", 17, 44, ["1", "2", "3", "4", "6", "8", "12", "24"], { bw: 28, gap: 6 });
const D_25 = deret("fb", 55, 98, ["1", "5", "25"], { bw: 50, gap: 20 });
const D_52 = deret("fc", 17, 152, ["1", "2", "4", "13", "26", "52"], { bw: 36, gap: 10 });
export const ADEGAN_BERLATIH_FAKTOR_2: AdeganStory = {
  id: "berlatih-faktor-2",
  judul: "Latihan 2: faktor 24, 25, dan 52",
  sumber: "Materi: faktor 24, 25, dan 52",
  latar: "#FEFCE8",
  kutipan: ["Tuliskan semua faktor dari", "Faktor dari 24 adalah 1,2,3,4,6,8,12,24", "Faktor dari 25 adalah 1,5,25", "Faktor dari 52 adalah 1,2,4,13,26,52"],
  ketukan: [
    k(
      "Latihan dua: tuliskan semua faktor dari dua puluh empat, dua puluh lima, dan lima puluh dua.",
      bersih(0),
      tambah(0, judul("Latihan 2")),
      tambah("empat,", ...kartu("l1", 20, 44, 260, 30, W.krem, ["a. 24"], 11)),
      tambah("lima,", ...kartu("l2", 20, 90, 260, 30, W.krem, ["b. 25"], 11)),
      tambah("dua@4", ...kartu("l3", 20, 136, 260, 30, W.krem, ["c. 52"], 11)),
    ),
    k(
      "Faktor dua puluh empat: satu, dua, tiga, empat, enam, delapan, dua belas, dua puluh empat. Faktor dua puluh lima: satu, lima, dua puluh lima. Faktor lima puluh dua: satu, dua, empat, tiga belas, dua puluh enam, lima puluh dua.",
      bersih(0),
      tambah(0, judul("Semua faktornya")),
      tambah("Faktor", teks("fa-c", 150, 38, "faktor 24", 8.6, W.coklat), ...D_24),
      tambah("Faktor@2", teks("fb-c", 150, 92, "faktor 25", 8.6, W.coklat), ...D_25),
      tambah("Faktor@3", teks("fc-c", 150, 146, "faktor 52", 8.6, W.coklat), ...D_52),
    ),
    k(
      "Dua puluh lima hanya tiga faktor, sebab lima kali lima sama saja. Lima puluh dua memuat tiga belas, yang hanya punya dua faktor.",
      bersih(0),
      tambah(0, judul("Faktor kembar dan faktor 13")),
      tambah(7, ...kartu("kk1", 20, 44, 260, 30, W.hijauMuda, ["5 × 5 = 25: satu faktor kembar"], 9.6)),
      tambah(12, ...kartu("kk2", 20, 92, 260, 30, W.krem, ["4 × 13 = 52"], 11)),
      tambah(16, ...kartu("kk3", 20, 138, 260, 36, W.langit, ["13: hanya faktor 1 dan 13"], 9.6)),
    ),
  ],
};

/* ------------------------------ 6. Latihan 3: beras 10 kg (Buku Siswa hlm. 50; Panduan Guru hlm. 72) ------------------------------ */
const BERAS: [string, string, string][] = [
  ["1 kg", "10 orang", "0"],
  ["2 kg", "5 orang", "0"],
  ["3 kg", "3 orang", "1"],
  ["4 kg", "2 orang", "2"],
  ["5 kg", "2 orang", "0"],
  ["6 kg", "1 orang", "4"],
  ["7 kg", "1 orang", "3"],
  ["8 kg", "1 orang", "2"],
  ["9 kg", "1 orang", "1"],
  ["10 kg", "1 orang", "0"],
];
const TAB_BERAS = tabel("br", 10, 30, [70, 66, 48], [["Berat/orang", "Orang", "Sisa"], ...BERAS], 14.4, 8);
export const ADEGAN_BERAS: AdeganStory = {
  id: "beras",
  judul: "Latihan 3: membagi beras sepuluh kilogram",
  sumber: "Materi: membagi 10 kg beras",
  latar: "#FFF7ED",
  kutipan: [
    "Slamet membantu ibu membagikan beras kepada masyarakat kurang mampu",
    "Total beras yang dibagikan oleh Ibu Slamet 10 kg",
    "Guru harus mengingatkan konsep faktor",
    "kemungkinan banyaknya orang yang mendapatakan beras adalah 10 orang, 5 orang, 2 orang, 1 orang karena memiliki sisa",
  ],
  ketukan: [
    k(
      "Latihan tiga. Slamet membagikan sepuluh kilogram beras kepada beberapa orang dengan berat sama. Berapa kemungkinan banyaknya orang?",
      bersih(0),
      tambah(0, judul("Latihan 3")),
      tambah("beras", emo("bs0", 150, 78, "🌾", 40)),
      tambah("sepuluh", ...kartu("bs1", 40, 96, 220, 30, W.krem, ["10 kg beras"], 11)),
      tambah("berat", ...kartu("bs2", 40, 138, 220, 30, W.hijauMuda, ["dibagi rata, berat sama"], 9.6)),
    ),
    k(
      "Mari kita coba tiap berat. Satu kilogram: sepuluh orang, sisa nol. Dua kilogram: lima orang, sisa nol. Tiga kilogram: tiga orang, sisa satu. Empat kilogram: dua orang, sisa dua.",
      bersih(0),
      tambah(0, judul("Mencoba tiap berat")),
      tambah("Mari", ...barisTabel(TAB_BERAS, "br", 0)),
      tambah("Satu", ...barisTabel(TAB_BERAS, "br", 1)),
      tambah("Dua", ...barisTabel(TAB_BERAS, "br", 2)),
      tambah("Tiga", ...barisTabel(TAB_BERAS, "br", 3)),
      tambah("Empat", ...barisTabel(TAB_BERAS, "br", 4)),
    ),
    k(
      "Lima kilogram: dua orang, sisa nol. Enam sampai sembilan kilogram: satu orang, dan masih ada sisa. Sepuluh kilogram: satu orang, sisa nol.",
      tambah("Lima", ...barisTabel(TAB_BERAS, "br", 5)),
      tambah("Enam", ...barisTabel(TAB_BERAS, "br", 6), ...barisTabel(TAB_BERAS, "br", 7)),
      tambah("sembilan", ...barisTabel(TAB_BERAS, "br", 8), ...barisTabel(TAB_BERAS, "br", 9)),
      tambah("Sepuluh", ...barisTabel(TAB_BERAS, "br", 10)),
    ),
    k(
      "Hanya baris bersisa nol yang bisa dipakai: sepuluh, lima, dua, atau satu orang. Itu tepat faktor sepuluh.",
      ...[1, 2, 5, 10].flatMap((r) => [0, 1, 2].map((c) => ubah("baris", { id: `br-s${r}${c}`, warna: W.hijauMuda }))),
      tambah("orang.", ...kartu("bs3", 200, 70, 90, 30, W.hijauMuda, ["orang:", "10, 5, 2, 1"], 8.6)),
      tambah("faktor", ...kartu("bs4", 200, 112, 90, 30, W.krem, ["faktor 10"], 9.6)),
    ),
  ],
};
