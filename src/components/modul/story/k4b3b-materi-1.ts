import type { AdeganStory } from "./logika-story";
import { W, barisTabel, busurSemua, daftar, deret, emo, judul, kartu, kotak, muncul, panah, suku, tabel, teks } from "./k4b3b-gambar";
import { bersih, k, tambah } from "./k4b3b-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab B (Buku Siswa hlm. 95; Panduan Guru hlm. 129-130) ------------------------------ */
export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Sub-Bab B: Pola Bilangan",
  sumber: "Buku Siswa hlm. 95; Panduan Guru hlm. 129–130",
  latar: "#F0F9FF",
  kutipan: [
    "B. Pola Bilangan",
    "Setelah mempelajari materi",
    "Pola bilangan membesar (melibatkan operasi penjumlahan bilangan cacah)",
    "pola bilangan mengecil (melibatkan operasi pengurangan bilangan cacah)",
    "mengidentifikasi pola bilangan membesar dan mengecil yang melibatkan penjumlahan dan pengurangan pada bilangan cacah sampai 100",
    "Alat tulis",
    "Kertas HVS",
    "Banyak ilmuwan yang memanfaatkan pola bilangan untuk memprediksi fenomena alam",
    "Apakah kalian dapat menemukan pola dari deret bilangan tersebut?",
    "Sebelum memasuki pembelajaran guru dapat mengingatkan kembali",
  ],
  ketukan: [
    k(
      "Sub-Bab B, Pola Bilangan. Guru menulis di papan: satu, tiga, lima, tujuh. Lalu dua, empat, enam, delapan. Lalu sepuluh, tujuh, empat, satu. Dapatkah murid menentukan pola bilangannya?",
      bersih(0),
      tambah(0, judul("Pola Bilangan")),
      tambah("papan:", kotak("pb", 20, 34, 260, 118, "#1F4D3A", W.coklat, { rx: 6, tebal: 3 })),
      tambah("satu,", teks("pb1", 150, 66, "1, 3, 5, 7, …", 15, W.putih)),
      tambah("dua,", teks("pb2", 150, 100, "2, 4, 6, 8, …", 15, W.putih)),
      tambah("sepuluh,", teks("pb3", 150, 134, "10, 7, 4, 1, …", 15, W.putih)),
      tambah("Dapatkah", ...kartu("pbq", 50, 160, 200, 28, W.krem, ["apa pola bilangannya?"], 9.6)),
    ),
    k(
      "Panduan Guru menyebut dua jenis pola bilangan. Pola membesar melibatkan penjumlahan bilangan cacah. Pola mengecil melibatkan pengurangan bilangan cacah.",
      ...daftar("pj", "Dua jenis pola bilangan", [
        { at: "membesar", t: "membesar: penjumlahan bilangan cacah", w: W.hijauMuda, u: 9 },
        { at: "mengecil", t: "mengecil: pengurangan bilangan cacah", w: W.merahMuda, u: 9 },
      ]),
    ),
    k(
      "Tujuan belajarnya: murid mampu mengidentifikasi pola membesar dan mengecil dengan penjumlahan dan pengurangan pada bilangan cacah sampai seratus. Sarananya cukup alat tulis dan kertas HVS.",
      ...daftar("tj", "Tujuan dan sarana", [
        { at: "mengidentifikasi", t: "mengidentifikasi pola membesar dan mengecil", w: W.langit, u: 8.8 },
        { at: "penjumlahan", t: "tambah dan kurang, bilangan cacah sampai 100", w: W.krem, u: 8.8 },
        { at: "Sarananya", t: "sarana: alat tulis dan kertas HVS", w: W.hijauMuda, u: 9 },
      ]),
    ),
    k(
      "Manfaatnya luas. Ilmuwan memakai pola bilangan untuk memprediksi gempa bumi dan angin topan. Untuk apersepsi, guru mengingatkan penjumlahan dan pengurangan, lalu bertanya: bagaimana menentukan bilangan selanjutnya?",
      bersih(0),
      tambah(0, judul("Manfaat pola bilangan")),
      tambah("gempa", emo("mf1", 90, 84, "🌍", 40)),
      tambah("angin", emo("mf2", 210, 84, "🌪", 40)),
      tambah("memprediksi", ...kartu("mf3", 30, 104, 240, 28, W.krem, ["memprediksi fenomena alam"], 9.6)),
      tambah("apersepsi,", ...kartu("mf4", 12, 136, 276, 28, W.hijauMuda, ["ingat lagi: tambah dan kurang"], 9.6)),
      tambah("bertanya:", ...kartu("mf5", 12, 168, 276, 26, W.pink, ["bilangan selanjutnya?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Ayo Mengamati dan Ayo Berpikir (Buku Siswa hlm. 95-97; Panduan Guru hlm. 131) ------------------------------ */
const D_AMATI = deret("am", 17, 84, ["3", "5", "7", "9", "11", "?"], { bw: 36, gap: 10 });
const TAB_AMATI = tabel(
  "ta",
  33,
  34,
  [64, 72, 98],
  [
    ["Urutan", "Bilangan", "Uraian"],
    ["1", "3", "3"],
    ["2", "5", "3 + 2"],
    ["3", "7", "5 + 2"],
    ["4", "9", "7 + 2"],
    ["5", "11", "9 + 2"],
    ["6", "13", "11 + 2"],
  ],
  17,
  8.6,
);
export const ADEGAN_MENGAMATI: AdeganStory = {
  id: "mengamati",
  judul: "Ayo Mengamati dan Ayo Berpikir",
  sumber: "Materi: mengamati dan berpikir",
  latar: "#FFFBEB",
  kutipan: [
    "Dapatkah kalian mengisi angka berikutnya?",
    "Ada berapa bilangan yang terdapat di sana?",
    "Apakah kalian dapat menentukan bilangan ke-6",
    "12 ibu",
    "Jawaban kamu kurang tepat",
    "Untuk mengetahui pola penyusunannya adalah dengan cara mengamati hubungan bilangan yang satu dengan yang lainnya",
    "Betul sekali, dengan memperhatikan tabel",
    "adalah 13 (11 + 2)",
    "ajak peserta didik untuk menuliskannya dalam tabel analisis",
    "Guru dapat memberikan contoh lain dari pola bilangan yang mengecil.",
    "Guru juga memberikan contoh soal pola bilangan dalam kehidupan sehari-hari",
  ],
  ketukan: [
    k(
      "Ayo mengamati. Di papan tertulis tiga, lima, tujuh, sembilan, sebelas, dan seterusnya. Dapatkah kalian mengisi angka berikutnya?",
      bersih(0),
      tambah(0, judul("Ayo Mengamati")),
      ...muncul(D_AMATI, [], ["tiga,", "lima,", "tujuh,", "sembilan,", "sebelas,", "seterusnya."]),
      tambah("Dapatkah", ...kartu("amq", 40, 136, 220, 30, W.krem, ["angka berikutnya?"], 10)),
    ),
    k(
      "Ayo berpikir. Ada berapa bilangan di sana, dan berapa bilangan ke-enam? Seorang murid menjawab dua belas. Ternyata jawaban itu kurang tepat.",
      bersih(0),
      tambah(0, judul("Ayo Berpikir")),
      tambah(0, teks("bk", 150, 66, "ada berapa bilangan? bilangan ke-6?", 9.6, W.coklat)),
      ...muncul(D_AMATI, [], [0, 1, 2, 3, 4, 5]),
      tambah("murid", ...kartu("amj", 20, 136, 110, 28, W.merahMuda, ["jawab: 12 ✖"], 9.6)),
      tambah("Ternyata", ...kartu("amg", 150, 136, 130, 28, W.krem, ["kurang tepat"], 9.6)),
    ),
    k(
      "Untuk tahu pola penyusunannya, amati hubungan antarbilangan lewat tabel urutan, bilangan, dan uraian. Mulai dari tiga, lalu tiga tambah dua, lima tambah dua, tujuh tambah dua, sembilan tambah dua.",
      bersih(0),
      tambah(0, judul("Tabel analisis")),
      tambah("tabel", ...barisTabel(TAB_AMATI, "ta", 0)),
      tambah("Mulai", ...barisTabel(TAB_AMATI, "ta", 1)),
      tambah("tiga@2", ...barisTabel(TAB_AMATI, "ta", 2)),
      tambah("lima", ...barisTabel(TAB_AMATI, "ta", 3)),
      tambah("tujuh", ...barisTabel(TAB_AMATI, "ta", 4)),
      tambah("sembilan", ...barisTabel(TAB_AMATI, "ta", 5)),
    ),
    k(
      "Setiap suku bertambah dua dari suku sebelumnya. Jadi bilangan ke-enam adalah sebelas tambah dua, yaitu tiga belas, bukan dua belas.",
      tambah("Jadi", ...barisTabel(TAB_AMATI, "ta", 6)),
      tambah("bukan", ...kartu("amk", 40, 160, 220, 26, W.hijauMuda, ["ke-6 adalah 13, bukan 12"], 9.6)),
    ),
    k(
      "Langkah belajarnya: menuliskan pola dalam tabel analisis, mencari contoh pola yang mengecil, mengenali dua tipe pola, lalu menemukan soal dari kehidupan sehari-hari.",
      ...daftar("pg", "Langkah belajar: Ayo Berpikir", [
        { at: "menuliskan", t: "menulis pola dalam tabel analisis", w: W.krem, u: 8.8 },
        { at: "mengecil,", t: "cari contoh pola mengecil", w: W.merahMuda, u: 9 },
        { at: "mengenali", t: "kenali dua tipe: membesar, mengecil", w: W.langit, u: 9 },
        { at: "soal", t: "temukan soal sehari-hari", w: W.hijauMuda, u: 9 },
      ]),
    ),
  ],
};

/* ------------------------------ 3. Kasus 1: pola membesar (Buku Siswa hlm. 97) ------------------------------ */
const D_K1 = deret("c1", 24, 84, ["1", "4", "7", "10", "13"], { bw: 36, gap: 18 });
const B_K1 = busurSemua("c1", 24, 84, ["+3", "+3", "+3", "+3"], { bw: 36, gap: 18 });
export const ADEGAN_KASUS_1: AdeganStory = {
  id: "kasus-1",
  judul: "Kasus 1: pola membesar",
  sumber: "Materi: pola membesar",
  latar: "#F0FDF4",
  kutipan: [
    "Perhatikan berbagai macam kasus pola bilangan berikut.",
    "Kasus 1 :",
    "1, 4, 7, 10, …",
    "selisih antarbilangan selalu sama yaitu +3",
    "adalah 10 + 3 = 13",
    "bilangan yang muncul setelahnya selalu lebih besar daripada bilangan yang ada sebelumnya",
    "pada pola tersebut bilangan semakin membesar",
  ],
  ketukan: [
    k(
      "Kasus satu: satu, empat, tujuh, sepuluh, dan seterusnya. Selisih antarbilangan selalu sama, yaitu tambah tiga.",
      bersih(0),
      tambah(0, judul("Kasus 1")),
      tambah("satu@2", ...suku(D_K1, 0)),
      tambah("empat", ...suku(D_K1, 1)),
      tambah("tujuh", ...suku(D_K1, 2)),
      tambah("sepuluh", ...suku(D_K1, 3)),
      tambah("Selisih", ...B_K1[0]),
      tambah("sama,", ...B_K1[1]),
      tambah("tambah", ...B_K1[2]),
    ),
    k(
      "Bilangan selanjutnya adalah sepuluh tambah tiga, yaitu tiga belas.",
      tambah("selanjutnya", ...B_K1[3]),
      tambah("tiga@2", ...suku(D_K1, 4)),
      tambah("tiga@2", ...kartu("c1k", 60, 140, 180, 30, W.krem, ["10 + 3 = 13"], 11)),
    ),
    k(
      "Bilangan yang muncul setelahnya selalu lebih besar dari sebelumnya. Jadi pola ini semakin membesar.",
      bersih(0),
      tambah(0, judul("Semakin membesar")),
      tambah("lebih", panah("c1a", 40, 150, 220, -76, W.hijau, 3, { gambar: true })),
      tambah("lebih", teks("c1t", 150, 176, "1, 4, 7, 10, 13, …", 11, W.biru)),
      tambah("membesar.", ...kartu("c1m", 40, 36, 150, 28, W.hijauMuda, ["pola membesar"], 10)),
    ),
  ],
};

/* ------------------------------ 4. Kasus 2: pola mengecil, Ingat! (Buku Siswa hlm. 98) ------------------------------ */
const D_K2 = deret("c2", 24, 84, ["23", "18", "13", "8", "3"], { bw: 36, gap: 18 });
const B_K2 = busurSemua("c2", 24, 84, ["−5", "−5", "−5", "−5"], { bw: 36, gap: 18 });
const D_BESAR = deret("ib", 41, 56, ["3", "5", "7", "9", "11"], { bw: 34, gap: 12 });
const D_KECIL = deret("ik", 41, 126, ["32", "28", "24", "20", "16"], { bw: 34, gap: 12 });
export const ADEGAN_KASUS_2: AdeganStory = {
  id: "kasus-2",
  judul: "Kasus 2 dan Ingat!",
  sumber: "Materi: pola mengecil dan ciri pola",
  latar: "#FEF2F2",
  kutipan: [
    "Kasus 2 :",
    "23, 18, 13, 8, ...",
    "selisih antar bilangan selalu sama yaitu -5",
    "adalah 8 - 5 = 3",
    "bilangan yang muncul setelahnya selalu lebih kecil daripada bilangan yang ada sebelumnya",
    "pada pola tersebut bilangan semakin mengecil",
    "Pola bilangan adalah suatu susunan bilangan yang mempunyai aturan dalam proses penyusunannya",
    "Pola bilangan ini dapat membesar maupun mengecil menyesuaikan aturan",
    "3, 5, 7, 9, 11, ... disebut pola bilangan membesar",
    "32, 28, 24, 20, 16, ... disebut pola bilangan mengecil",
  ],
  ketukan: [
    k(
      "Kasus dua: dua puluh tiga, delapan belas, tiga belas, delapan. Selisih antarbilangan selalu sama, yaitu kurang lima.",
      bersih(0),
      tambah(0, judul("Kasus 2", W.merah)),
      tambah("dua@2", ...suku(D_K2, 0)),
      tambah("delapan", ...suku(D_K2, 1)),
      tambah("tiga@2", ...suku(D_K2, 2)),
      tambah("delapan@2", ...suku(D_K2, 3)),
      tambah("Selisih", ...B_K2[0]),
      tambah("sama,", ...B_K2[1]),
      tambah("kurang", ...B_K2[2]),
    ),
    k(
      "Bilangan selanjutnya adalah delapan kurang lima, yaitu tiga. Bilangan yang muncul selalu lebih kecil, jadi pola semakin mengecil.",
      tambah("selanjutnya", ...B_K2[3]),
      tambah("tiga.", ...suku(D_K2, 4)),
      tambah("tiga.", ...kartu("c2k", 60, 132, 180, 28, W.krem, ["8 − 5 = 3"], 11)),
      tambah("mengecil.", ...kartu("c2m", 60, 168, 180, 28, W.merahMuda, ["semakin mengecil"], 10)),
    ),
    k(
      "Ingat! Pola bilangan adalah susunan bilangan yang punya aturan penyusunan, sehingga bisa membesar atau mengecil mengikuti aturan itu.",
      ...daftar("ig", "Ingat!", [
        { at: "susunan", t: "pola bilangan: susunan bilangan beraturan", w: W.krem, u: 8.8 },
        { at: "membesar", t: "bisa membesar", w: W.hijauMuda, u: 10 },
        { at: "mengecil", t: "bisa mengecil", w: W.merahMuda, u: 10 },
      ]),
    ),
    k(
      "Tiga, lima, tujuh, sembilan, sebelas adalah pola membesar. Tiga puluh dua, dua puluh delapan, dua puluh empat, dua puluh, enam belas adalah pola mengecil, turun empat setiap langkah.",
      bersih(0),
      tambah(0, judul("Dua contoh dari Ingat!")),
      tambah(0, ...D_BESAR),
      tambah("membesar.", teks("ibt", 150, 46, "membesar: tambah 2 tiap langkah", 9.4, W.hijau)),
      tambah("Tiga@2", ...D_KECIL),
      tambah("mengecil,", teks("ikt", 150, 116, "mengecil: kurang 4 tiap langkah", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Contoh: hasil panen telur (Buku Siswa hlm. 98-99) ------------------------------ */
const D_TELUR = deret("te", 26, 84, ["20", "28", "36", "?", "?"], { bw: 40, gap: 12 });
const TAB_TELUR = tabel(
  "tt",
  12,
  34,
  [44, 56, 92, 84],
  [
    ["Hari", "Panen", "Uraian", "Beda"],
    ["Hari 1", "20", "20", "20"],
    ["Hari 2", "28", "20 + 8", "28 − 20 = 8"],
    ["Hari 3", "36", "20 + 8 + 8", "36 − 28 = 8"],
    ["Hari 4", "44", "20 + 8 + 8 + 8", "44 − 36 = 8"],
    ["Hari 5", "52", "20 + 8 + 8 + 8 + 8", "52 − 44 = 8"],
  ],
  17,
  8,
);
const D_TELUR2 = deret("tf", 26, 84, ["20", "28", "36", "44", "52"], { bw: 40, gap: 12 });
const B_TELUR2 = busurSemua("tf", 26, 84, ["+8", "+8", "+8", "+8"], { bw: 40, gap: 12 });
export const ADEGAN_TELUR: AdeganStory = {
  id: "telur",
  judul: "Contoh: hasil panen telur",
  sumber: "Materi: pola dengan tabel, hasil panen telur",
  latar: "#FFF7ED",
  kutipan: [
    "Seorang peternak telur ayam mencatat hasil panen selama 5 hari berturut-",
    "Pada hari pertama tercatat 20 buah telur, pada hari kedua 28 buah telur",
    "Banyak telur yang dipanen pada",
    "hari kelima adalah ...",
    "Hasil Panen",
    "Beda dengan",
    "20 +8 +8 +8 +8",
    "lebih banyak 8 butir dari hari",
    "sebelumnya, sehingga untuk hari selanjutnya didapatkan",
    "Jadi banyak telur yang dipanen pada hari kelima adalah 52 butir.",
  ],
  ketukan: [
    k(
      "Contoh: seorang peternak mencatat telur lima hari berturut-turut. Hari pertama dua puluh butir, hari kedua dua puluh delapan, hari ketiga tiga puluh enam, dan seterusnya. Berapa telur pada hari kelima?",
      bersih(0),
      tambah(0, judul("Hasil panen telur")),
      tambah("peternak", emo("tem", 150, 62, "🥚", 24)),
      tambah("pertama", ...suku(D_TELUR, 0), teks("tel0", 46, 128, "hari 1", 8, W.coklat)),
      tambah("kedua", ...suku(D_TELUR, 1), teks("tel1", 98, 128, "hari 2", 8, W.coklat)),
      tambah("ketiga", ...suku(D_TELUR, 2), teks("tel2", 150, 128, "hari 3", 8, W.coklat)),
      tambah("kelima?", ...suku(D_TELUR, 3), ...suku(D_TELUR, 4), teks("tel3", 202, 128, "hari 4", 8, W.coklat), teks("tel4", 254, 128, "hari 5", 8, W.coklat)),
    ),
    k(
      "Penyelesaiannya memakai tabel. Pada hari kedua, dua puluh tambah delapan, bedanya dua puluh delapan kurang dua puluh sama dengan delapan. Hari ketiga dan keempat sama, selalu tambah delapan. Hari kelima: dua puluh tambah empat kali delapan.",
      bersih(0),
      tambah(0, judul("Penyelesaian: tabel")),
      tambah("tabel.", ...barisTabel(TAB_TELUR, "tt", 0)),
      tambah("kedua,", ...barisTabel(TAB_TELUR, "tt", 1), ...barisTabel(TAB_TELUR, "tt", 2)),
      tambah("ketiga", ...barisTabel(TAB_TELUR, "tt", 3)),
      tambah("keempat", ...barisTabel(TAB_TELUR, "tt", 4)),
      tambah("kelima:", ...barisTabel(TAB_TELUR, "tt", 5)),
    ),
    k(
      "Telur setiap hari lebih banyak delapan butir dari hari sebelumnya. Jadi dua puluh, dua puluh delapan, tiga puluh enam, empat puluh empat, lima puluh dua. Telur hari kelima adalah lima puluh dua butir.",
      bersih(0),
      tambah(0, judul("Beda tetap: tambah 8")),
      tambah("Jadi", ...suku(D_TELUR2, 0)),
      tambah("dua@2", ...suku(D_TELUR2, 1), ...B_TELUR2[0]),
      tambah("tiga", ...suku(D_TELUR2, 2), ...B_TELUR2[1]),
      tambah("empat", ...suku(D_TELUR2, 3), ...B_TELUR2[2]),
      tambah("lima", ...suku(D_TELUR2, 4), ...B_TELUR2[3]),
      tambah("kelima", ...kartu("tfk", 40, 140, 220, 30, W.hijauMuda, ["hari ke-5: 52 butir"], 10.4)),
    ),
  ],
};
