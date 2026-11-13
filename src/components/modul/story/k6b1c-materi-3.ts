import type { AdeganStory } from "./logika-story";
import { W, arsir, arsirPita, barisTabel, emo, garis, kartu, kisi, kotak, pecahan, pita, teks } from "./k6b1c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k6b1c-bantu";

/* ------------------------------ 1. Latihan 1.3 nomor 1 dan 2 (hlm. 40) ------------------------------ */
const LS = [150, 70];
const suhu = [
  ["Sumatra Selatan", "37,2"],
  ["Sumatra Utara", "33,3"],
  ["Nusa Tenggara Timur", "36,6"],
  ["Sulawesi Tengah", "38,5"],
  ["Kalimantan Utara", "36,8"],
];
const suhuUrut = [
  ["Sulawesi Tengah", "38,5"],
  ["Sumatra Selatan", "37,2"],
  ["Kalimantan Utara", "36,8"],
  ["Nusa Tenggara Timur", "36,6"],
  ["Sumatra Utara", "33,3"],
];

export const ADEGAN_LATIHAN13A: AdeganStory = {
  id: "latihan13-kain-suhu",
  judul: "Latihan 1.3 nomor 1 dan 2: kain dan suhu",
  sumber: "Buku Siswa hlm. 40 dan Buku Panduan Guru",
  latar: "#FDF2F8",
  kutipan: [
    "Latihan 1.3",
    "Rina mendapat beberapa pesanan kain dari para pelanggannya",
    "Gambarlah bentuk pecahan",
    "Jika dinyatakan dalam bentuk desimal",
    "Biro Pusat Statistik (BPS) mencatat suhu tertinggi di beberapa provinsi di Indonesia pada tahun 2015",
    "Urutkan kelima provinsi tersebut berdasarkan suhunya dari yang tertinggi",
  ],
  ketukan: [
    k(
      "Latihan 1.3 nomor 1: Rina mendapat pesanan kain sepanjang tiga perempat meter. Gambarlah tiga perempat pada persegi, lalu tulis nilainya dalam desimal.",
      tambah(0, teks("jud", 150, 22, "Latihan 1.3 no. 1: kain 3/4 m", 12, W.ungu), emo("kn", 40, 100, "🧵", 30)),
      tambah("Gambarlah", pita("pt", 80, 60, 190, 60, 4)),
      tambah("persegi", arsirPita("pa", 80, 60, 190, 60, 4, 0, 3)),
      tambah("desimal", teks("qs", 175, 160, "3/4 meter = ... ?", 14, W.merah)),
    ),
    k(
      "Cara pertama dengan gambar. Persegi 100 petak diarsir 75 petak, sehingga tiga perempat sama dengan 0,75.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Cara 1: gambar", 12, W.ungu), kisi("kk", 20, 32, 130, 10, 10)),
      tambah("75", arsir("a1", 20, 32, 130, 10, 10, 0, 0, 7, 10), arsir("a2", 20, 32, 130, 10, 10, 7, 0, 1, 5)),
      tambah("sehingga", pecahan("pq", 214, 76, "75", "100", 20, W.hijau), teks("dq", 214, 130, "= 0,75", 22, W.hijau)),
    ),
    k(
      "Nomor 2: Biro Pusat Statistik mencatat suhu tertinggi lima provinsi: Sumatra Selatan 37,2, Sumatra Utara 33,3, Nusa Tenggara Timur 36,6, Sulawesi Tengah 38,5, dan Kalimantan Utara 36,8.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Suhu tertinggi (derajat C)", 12, W.ungu)),
      tambah("Selatan", ...barisTabel("s1", 40, 40, LS, 24, suhu[0], 8.4)),
      tambah("Utara", ...barisTabel("s2", 40, 64, LS, 24, suhu[1], 8.4)),
      tambah("Timur", ...barisTabel("s3", 40, 88, LS, 24, suhu[2], 8.4)),
      tambah("Tengah", ...barisTabel("s4", 40, 112, LS, 24, suhu[3], 8.4)),
      tambah("Kalimantan", ...barisTabel("s5", 40, 136, LS, 24, suhu[4], 8.4)),
    ),
    k(
      "Urutan dari yang tertinggi: Sulawesi Tengah 38,5, Sumatra Selatan 37,2, Kalimantan Utara 36,8, Nusa Tenggara Timur 36,6, lalu Sumatra Utara 33,3.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Dari yang tertinggi", 12, W.ungu)),
      tambah("Sulawesi", ...barisTabel("u1", 40, 40, LS, 24, suhuUrut[0], 8.4, W.mint)),
      tambah("Sumatra", ...barisTabel("u2", 40, 64, LS, 24, suhuUrut[1], 8.4)),
      tambah("Kalimantan", ...barisTabel("u3", 40, 88, LS, 24, suhuUrut[2], 8.4)),
      tambah("Nusa", ...barisTabel("u4", 40, 112, LS, 24, suhuUrut[3], 8.4)),
      tambah("lalu", ...barisTabel("u5", 40, 136, LS, 24, suhuUrut[4], 8.4)),
    ),
  ],
};

/* ------------------------------ 2. Latihan 1.3 nomor 3 dan 4 (hlm. 41) ------------------------------ */
/** Batang banding mendatar: panjang sebanding dengan nilai (px per satuan `s`). */
const batang = (id: string, x: number, y: number, nilai: number, s: number, label: string, warna: string) => [teks(`${id}-n`, x - 4, y + 9, label, 8, W.biru, { anchor: "end" }), kotak(`${id}-b`, x, y, Math.max(2, nilai * s), 13, warna, W.biru, { rx: 2 })];
const gizi = [
  ["Protein", "1,3 g"],
  ["Lemak total", "5,4 g"],
  ["Karbohidrat", "28,6 g"],
  ["Serat pangan", "2,7 g"],
  ["Natrium", "88,6 mg"],
];

export const ADEGAN_LATIHAN13B: AdeganStory = {
  id: "latihan13-lompat-gizi",
  judul: "Latihan 1.3 nomor 3 dan 4: lompat jauh dan nilai gizi",
  sumber: "Buku Siswa hlm. 41 dan Buku Panduan Guru",
  latar: "#F0FDF4",
  kutipan: [
    "Arman, Bayu, dan Didi mengikuti lomba lompat jauh",
    "Siapakah yang melompat paling jauh dan paling dekat",
    "Perhatikan gambar Informasi Nilai Gizi di salah satu kemasan makanan berikut",
    "Kandungan zat apakah yang paling besar komposisinya dan berapakah komposisinya",
    "Urutkan kandungan zat berdasarkan komposisinya dari yang terkecil hingga terbesar",
  ],
  ketukan: [
    k(
      "Nomor 3: lomba lompat jauh. Arman melompat 3,7 meter, Didi 2,9 meter, dan Bayu 3,6 meter. Siapa yang melompat paling jauh dan paling dekat?",
      tambah(0, teks("jud", 150, 22, "Lompat jauh (meter)", 12, W.ungu)),
      tambah("Arman", ...batang("j1", 70, 44, 3.7, 52, "Arman 3,7", W.arsir)),
      tambah("Didi", ...batang("j2", 70, 74, 2.9, 52, "Didi 2,9", W.arsir2)),
      tambah("Bayu", ...batang("j3", 70, 104, 3.6, 52, "Bayu 3,6", W.mint)),
    ),
    k(
      "Satuannya 3, 2, dan 3. Didi paling pendek. Arman dan Bayu sama-sama 3, tetapi persepuluhan 7 lebih besar dari 6. Jadi paling jauh Arman, paling dekat Didi.",
      sorotkan("Arman", "j1-b"),
      sorotkan("Didi", "j2-b"),
      tambah("Jadi", teks("hs", 150, 160, "terjauh: Arman, terdekat: Didi", 12, W.hijau)),
    ),
    k(
      "Nomor 4: label gizi memuat protein 1,3 gram, lemak total 5,4, karbohidrat 28,6, serat pangan 2,7, dan natrium 88,6 miligram.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Informasi Nilai Gizi", 12, W.ungu)),
      tambah("protein", ...barisTabel("z1", 60, 36, [110, 80], 22, gizi[0], 8.6)),
      tambah("lemak", ...barisTabel("z2", 60, 58, [110, 80], 22, gizi[1], 8.6)),
      tambah("karbohidrat", ...barisTabel("z3", 60, 80, [110, 80], 22, gizi[2], 8.6)),
      tambah("serat", ...barisTabel("z4", 60, 102, [110, 80], 22, gizi[3], 8.6)),
      tambah("natrium", ...barisTabel("z5", 60, 124, [110, 80], 22, gizi[4], 8.6)),
    ),
    k(
      "Angka natrium 88,6 tampak paling besar, tetapi satuannya miligram. Satu gram sama dengan seribu miligram, jadi 88,6 miligram adalah 0,0886 gram.",
      sorotkan("natrium", "z5-s0", "z5-s1"),
      tambah("seribu", teks("kv", 150, 176, "1 g = 1000 mg", 11, W.merah)),
      tambah("0,0886", teks("kv2", 150, 194, "88,6 mg = 0,0886 g", 12, W.hijau)),
    ),
    k(
      "Setelah satuannya sama, zat terbesar adalah karbohidrat, 28,6 gram, dan zat terkecil adalah natrium. Kunci Panduan Guru menjawab demikian.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Semua dalam gram", 12, W.ungu)),
      tambah("karbohidrat", ...batang("g1", 90, 38, 28.6, 6, "karbohidrat 28,6", W.arsir)),
      tambah("Setelah", ...batang("g2", 90, 62, 5.4, 6, "lemak 5,4", W.arsir2)),
      tambah("terkecil", ...batang("g3", 90, 86, 0.0886, 6, "natrium 0,0886", W.merah)),
      tambah("Kunci", teks("gk", 150, 130, "terbesar: karbohidrat", 11, W.hijau), teks("gk2", 150, 150, "terkecil: natrium", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Refleksi dan Uji Kompetensi nomor 1 sampai 5 (hlm. 42 dan 43) ------------------------------ */
export const ADEGAN_UJI: AdeganStory = {
  id: "refleksi-uji",
  judul: "Refleksi dan Uji Kompetensi nomor 1 sampai 5",
  sumber: "Buku Siswa hlm. 42–43 dan Buku Panduan Guru",
  latar: "#FFF7ED",
  kutipan: [
    "Bagaimana cara kalian membandingkan dua bilangan desimal",
    "Bagaimana cara kalian mengurutkan bilangan desimal",
    "Setelah mempelajari keseluruhan materi pada Pecahan dan Desimal, ayo berefleksi",
    "Apakah kalian telah mengetahui cara perkalian pecahan",
    "Apakah kalian dapat mengurutkan bilangan desimal",
    "Uji Kompetensi",
    "Pak Arman dan keluarganya berangkat dari Jakarta menuju Surabaya dan menempuh jarak 630 km",
    "Dini mendapat pesanan 100 porsi nasi kotak",
    "Dalam sehari keluarga Dias mengonsumsi",
    "Rania memiliki",
    "Pak Made mengecat dinding kelasnya untuk memperingati Hari Kemerdekaan Republik Indonesia",
  ],
  ketukan: [
    k(
      "Ayo berefleksi. Membandingkan dua desimal: lihat nilai tempat dari kiri. Mengurutkan: bandingkan semuanya, lalu susun dari terkecil. Refleksi bab menanyakan lima hal, dari perkalian pecahan sampai mengurutkan desimal.",
      tambah(0, teks("jud", 150, 24, "Ayo Berefleksi", 13, W.ungu)),
      tambah("Membandingkan", kartu("r1", 24, 40, 252, 44, W.krem, ["membandingkan: nilai tempat", "dari kiri ke kanan"], 9)),
      tambah("Mengurutkan", kartu("r2", 24, 92, 252, 44, W.mint, ["mengurutkan: bandingkan semua,", "lalu susun"], 9)),
      tambah("Refleksi@2", kartu("r3", 24, 144, 252, 44, W.langit, ["refleksi bab: 5 pertanyaan", "perkalian sampai mengurutkan desimal"], 9)),
    ),
    k(
      "Uji Kompetensi nomor 1: Pak Arman menempuh 630 kilometer dan istirahat setelah dua per lima perjalanan. 630 dibagi 5 hasilnya 126, lalu dikali 2 hasilnya 252 kilometer.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "UK 1: 2/5 dari 630 km", 12, W.ungu)),
      tambah("menempuh", pita("jb", 30, 44, 240, 40, 5), teks("jt", 150, 100, "630 km", 11)),
      tambah("dua", arsirPita("ja", 30, 44, 240, 40, 5, 0, 2)),
      tambah("dibagi", teks("j1", 150, 130, "630 : 5 = 126", 13)),
      tambah("dikali", teks("j2", 150, 152, "126 x 2 = 252 km", 14, W.hijau)),
    ),
    k(
      "Nomor 2: Dini menyelesaikan tiga perempat dari 100 porsi. Satu per empat dari 100 adalah 25, jadi tiga perempat adalah 75 porsi.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "UK 2: 3/4 dari 100 porsi", 12, W.ungu)),
      tambah("Dini", emo("nk", 40, 74, "🍱", 28), pita("nb", 70, 50, 200, 36, 4)),
      tambah("tiga", arsirPita("na", 70, 50, 200, 36, 4, 0, 3)),
      tambah("25,", teks("n1", 150, 120, "100 : 4 = 25", 13)),
      tambah("75", teks("n2", 150, 144, "25 x 3 = 75 porsi", 14, W.hijau)),
    ),
    k(
      "Nomor 3: keluarga Dias makan dua per tiga kilogram beras sehari. Dari 50 kilogram, lama habisnya 50 kali tiga per dua, yaitu 75 hari.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "UK 3: 50 kg dibagi 2/3 kg", 12, W.ungu)),
      tambah("beras", emo("bs", 150, 66, "🍚", 30)),
      tambah("Dari", teks("m1", 150, 104, "50 : 2/3", 14)),
      tambah("kali", teks("m2", 150, 128, "= 50 x 3/2", 14)),
      tambah("75", teks("m3", 150, 154, "= 75 hari", 16, W.hijau)),
    ),
    k(
      "Nomor 4: Rania membagi lima per delapan potong kue ke 4 kotak. Tiap kotak mendapat lima per delapan dibagi 4, yaitu lima per tiga puluh dua.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "UK 4: 5/8 dibagi 4 kotak", 12, W.ungu)),
      tambah("Rania", emo("kk", 150, 62, "🍰", 28)),
      tambah("kotak", teks("q1", 150, 100, "5/8 : 4 = 5/8 x 1/4", 13)),
      tambah("tiga", teks("q2", 150, 130, "= 5/32 potong", 16, W.hijau)),
    ),
    k(
      "Nomor 5: Pak Made mengecat dinding seluas lima dan empat per lima meter persegi. Empat per lima sama dengan 8 per 10, yaitu 0,8, jadi luasnya 5,8.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "UK 5: ubah ke desimal", 12, W.ungu)),
      tambah("Made", teks("w1", 150, 62, "5 4/5 m2", 18)),
      tambah("Empat", teks("w2", 150, 92, "4/5 = 8/10 = 0,8", 14)),
      tambah("Jadi", teks("w3", 150, 126, "5 + 0,8 = 5,8 m2", 18, W.hijau)),
      ubah("Jadi", { id: "w1", warna: W.merah }),
    ),
  ],
};

/* ------------------------------ 4. Pengayaan (hlm. 43 dan 44) ------------------------------ */
export const ADEGAN_PENGAYAAN: AdeganStory = {
  id: "pengayaan-akhir",
  judul: "Pengayaan: pecahan kali pecahan, pecahan bagi pecahan, desimal tak berhenti",
  sumber: "Buku Siswa hlm. 43–44 dan Buku Panduan Guru",
  latar: "#F5F3FF",
  kutipan: [
    "Pengayaan",
    "Tangki penyimpanan air di rumah Agam hanya terisi",
    "Agam memiliki 3 gelas air",
    "Agam memiliki",
    "gelas air. Agam memindahkan air tersebut ke dalam botol yang lain",
    "Rani memiliki",
    "Kalian boleh menggunakan kalkulator untuk menemukan jawabannya",
  ],
  ketukan: [
    k(
      "Pengayaan perkalian pecahan: tangki Agam terisi setengah, lalu sepertiga dari isi itu dipakai. Bagi setengah menjadi tiga bagian, ambil satu, yaitu seperenam.",
      tambah(0, teks("jud", 150, 22, "Pengayaan: 1/3 dari 1/2", 12, W.ungu)),
      tambah("tangki", pita("tk", 40, 44, 220, 56, 2)),
      tambah("setengah,", arsirPita("tk1", 40, 44, 220, 56, 2, 0, 1, W.arsir2)),
      tambah("tiga", garis("g3a", 40 + 110 / 3, 44, 0, 56, W.biru, 1.4), garis("g3b", 40 + 220 / 3, 44, 0, 56, W.biru, 1.4)),
      tambah("satu", arsirPita("tk2", 40, 44, 220, 56, 6, 0, 1, W.arsir)),
      tambah("seperenam.", teks("tk3", 150, 130, "1/3 dari 1/2 = 1/6", 16, W.hijau)),
    ),
    k(
      "Pembagian pecahan: tiga gelas air memenuhi dua per tiga botol. Satu per tiga botol butuh tiga per dua gelas, sehingga satu botol butuh sembilan per dua gelas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "3 gelas = 2/3 botol", 12, W.ungu)),
      tambah("gelas", emo("gl", 50, 80, "🥛", 30), teks("glt", 50, 100, "3 gelas", 8.4)),
      tambah("botol", pita("bt", 110, 50, 150, 40, 3), arsirPita("bta", 110, 50, 150, 40, 3, 0, 2, W.arsir2)),
      tambah("Satu", teks("bg1", 185, 120, "1/3 botol = 3/2 gelas", 10.4)),
      tambah("sembilan", teks("bg2", 185, 144, "1 botol = 3 x 3/2 = 9/2 gelas", 10.4, W.hijau)),
    ),
    k(
      "Soal kedua: setengah gelas memenuhi tiga per empat botol. Seperempat botol butuh seperenam gelas, jadi satu botol butuh empat per enam, yaitu dua per tiga gelas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "1/2 gelas = 3/4 botol", 12, W.ungu)),
      tambah("setengah", pita("bq", 40, 44, 220, 40, 4), arsirPita("bqa", 40, 44, 220, 40, 4, 0, 3, W.arsir2)),
      tambah("Seperempat", teks("bk1", 150, 110, "1/4 botol = 1/6 gelas", 12)),
      tambah("empat", teks("bk2", 150, 136, "1 botol = 4 x 1/6 = 4/6 = 2/3 gelas", 11, W.hijau)),
    ),
    k(
      "Kesimpulannya, membagi pecahan dengan pecahan sama dengan mengalikan kebalikan pembagi. Panduan Guru menulis a per b dibagi c per d sama dengan a per b kali d per c.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kesimpulan", 13, W.ungu)),
      tambah("Kesimpulannya", kartu("ks", 20, 44, 260, 44, W.krem, ["bagi pecahan = kali kebalikan", "pembagi"], 9.4)),
      tambah("Panduan", teks("kf", 150, 130, "a/b : c/d = a/b x d/c", 15, W.hijau)),
    ),
    k(
      "Pengayaan desimal: Rani punya satu per tiga liter jus jeruk dan satu per enam liter jus jambu. Hasilnya 0,3333 dan seterusnya, serta 0,1666 dan seterusnya. Angkanya tidak pernah berhenti.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Desimal yang tidak berhenti", 12, W.ungu)),
      tambah("jus", emo("j1", 70, 70, "🧃", 28), teks("j1t", 70, 88, "1/3 liter jeruk", 8.4), emo("j2", 230, 70, "🧃", 28), teks("j2t", 230, 88, "1/6 liter jambu", 8.4)),
      tambah("0,333", teks("d1", 70, 130, "0,3333...", 16, W.hijau), teks("d2", 230, 130, "0,1666...", 16, W.hijau)),
      tambah("berhenti.", teks("d3", 150, 176, "angkanya terus berulang", 11, W.merah)),
    ),
  ],
};
