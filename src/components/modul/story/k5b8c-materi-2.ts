import type { AdeganStory } from "./logika-story";
import { W, barisTabel, batangH, batangV, emo, garis, kartu, kotak, sumbuH, sumbuV, tabel, teks, type GH, type GV } from "./k5b8c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b8c-bantu";

/* ------------------------------ 4. Eksplorasi 8.3B bagian a sampai e: membaca skala dan menilai pernyataan (hlm. 256 sampai 257; Buku Panduan Guru hlm. 368 sampai 369) ------------------------------ */
const GA: GV = { x: 30, y: 140, w: 100, h: 80, maks: 80, langkah: 20 };
const GB: GV = { x: 170, y: 140, w: 100, h: 80, maks: 80, langkah: 20 };

export const ADEGAN_SEAGAMES_TANYA: AdeganStory = {
  id: "seagames-tanya",
  judul: "Eksplorasi 8.3B: membaca skala dan menilai pernyataan",
  sumber: "Buku Siswa hlm. 256–257; Buku Panduan Guru hlm. 368–369",
  latar: "#F0FDF4",
  kutipan: [
    "Gambar mana yang tepat untuk mewakili banyaknya medali emas pada tahun 2017",
    "selalu menurun",
    "penurunan perolehan medali pada tahun 2015 lebih banyak jika dibandingkan penurunan perolehan medali pada tahun 2021",
    "Menurut kalian, pernyataan siapa yang dapat diterima",
    "Tentukan pecahan yang mewakili banyaknya medali emas dibandingkan dengan keseluruhan medali yang diperoleh di tahun tersebut",
  ],
  ketukan: [
    k(
      "Bagian a, manakah dari dua gambar yang tepat mewakili medali emas 2017? Garis kecilnya bernilai empat.",
      tambah(0, teks("jud", 150, 18, "Manakah yang tepat untuk 2017?", 9.6, W.ungu)),
      tambah("dua", ...sumbuV("ga", GA), ...sumbuV("gb", GB)),
      tambah("gambar", ...batangV("a", GA, 2, 3, 38, W.batang, "2017", { angka: false }), teks("ha", 80, 166, "a", 11, W.merah)),
      tambah("tepat", ...batangV("b", GB, 2, 3, 36, W.batang, "2017", { angka: false }), teks("hb", 220, 166, "b", 11, W.merah)),
    ),
    k(
      "Garis kecil dihitung empat demi empat: 36, lalu 40. Medali 38 ada di antara keduanya, jadi gambar a yang tepat.",
      tambah("empat@2", ...[36, 40].map((n) => garis(`pa${n}`, 30, 140 - (n / 80) * 80, 100, 0, W.merah, 0.8, { putus: true })), teks("p36", 134, 112, "36", 6.8, W.merah, { anchor: "start" }), teks("p40", 134, 98, "40", 6.8, W.merah, { anchor: "start" })),
      tambah("38", teks("v38", 112, 98, "38", 8, W.hijau)),
      tambah("tepat.", emo("ok", 80, 192, "✅", 14), emo("no", 220, 192, "❌", 14)),
    ),
    k(
      "Bagian c: Nisa berkata medali emas selalu menurun sejak 2013 sampai 2021. Asep berkata, penurunan 2015 lebih banyak daripada penurunan 2021.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pernyataan siapa yang dapat diterima?", 9.6, W.ungu)),
      tambah("Nisa", ...kartu("n", 16, 40, 268, 50, W.mawar, ["Nisa: dari 2013 sampai 2021", "medali emas selalu menurun"], 8.8)),
      tambah("Asep", ...kartu("s", 16, 100, 268, 50, W.langit, ["Asep: penurunan 2015", "lebih banyak daripada 2021"], 8.8)),
    ),
    k(
      "Periksa Nisa. Dari 2015 ke 2017 turun, tetapi dari 2017 ke 2019 naik, dari 38 menjadi 72. Jadi Nisa tidak tepat.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Periksa pernyataan Nisa", 10.5, W.ungu)),
      tambah("2015", ...[["2013", "65"], ["2015", "47"], ["2017", "38"], ["2019", "72"], ["2021", "69"]].flatMap(([th, n], i) => kartu(`r${i}`, 10 + i * 58, 50, 50, 40, i === 3 ? W.mint : W.krem, [th, n], 8.4))),
      tambah("turun,", teks("t1", 63, 108, "turun", 7, W.merah), teks("t2", 121, 108, "turun", 7, W.merah)),
      tambah("naik,", teks("t3", 179, 108, "naik", 7, W.hijau)),
      sorotkan("naik,", "r3-k"),
      tambah("tidak", teks("tdk", 150, 150, "Nisa: tidak dapat diterima", 9.4, W.merah), emo("x", 150, 178, "❌", 16)),
    ),
    k(
      "Periksa Asep. Tahun 2015 turun 18, dari 65 ke 47. Tahun 2021 turun hanya 3, dari 72 ke 69. Jadi Asep benar.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Periksa pernyataan Asep", 10.5, W.ungu)),
      tambah("2015", ...kartu("p1", 20, 40, 260, 40, W.krem, ["2015: 65 - 47 = 18"], 10)),
      tambah("2021", ...kartu("p2", 20, 92, 260, 40, W.mint, ["2021: 72 - 69 = 3"], 10)),
      tambah("benar.", teks("by", 150, 160, "18 lebih banyak daripada 3", 9.6, W.hijau), emo("ok", 150, 186, "✅", 16)),
    ),
    k(
      "Bagian d dan e. Tahun 2019: 72 emas, 84 perak, 111 perunggu, jumlahnya 267. Pecahan emas 72 per 267. Emas terbanyak 2019, tersedikit 2017.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Medali tahun 2019", 11, W.ungu)),
      tambah("72", ...kartu("e1", 16, 36, 82, 40, W.jeruk, ["72 emas"], 9), ...kartu("e2", 109, 36, 82, 40, W.abu, ["84 perak"], 9), ...kartu("e3", 202, 36, 82, 40, W.krem, ["111 perunggu"], 9)),
      tambah("jumlahnya", teks("jm", 150, 100, "72 + 84 + 111 = 267", 12, W.ungu)),
      tambah("Pecahan", teks("pc", 150, 128, "pecahan emas: 72/267", 10, W.hijau)),
      tambah("terbanyak", teks("mx", 150, 156, "terbanyak: 2019", 9, W.hijau), teks("mn", 150, 172, "tersedikit: 2017", 9, W.merah)),
    ),
    k(
      "Ayo berdiskusi. Mencari data tertinggi dan terendah lebih mudah lewat tabel atau diagram batang? Menurut Buku Panduan Guru, diagram batang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tabel atau diagram batang?", 11, W.ungu)),
      tambah("tabel", ...kartu("d1", 16, 40, 124, 70, W.krem, ["Tabel", "baca angka satu per satu"], 8.6)),
      tambah("diagram", ...kartu("d2", 160, 40, 124, 70, W.mint, ["Diagram batang", "lihat tinggi batang"], 8.6)),
      tambah("Panduan", emo("ok", 222, 140, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 8.3C aktivitas 1: diagram batang horizontal (hlm. 257 sampai 259; Buku Panduan Guru hlm. 370 sampai 371) ------------------------------ */
const GM: GH = { x: 62, y: 38, w: 200, h: 100, maks: 80, langkah: 20 };

export const ADEGAN_HORIZONTAL_83C: AdeganStory = {
  id: "horizontal-83c",
  judul: "Eksplorasi 8.3C: diagram batang horizontal",
  sumber: "Buku Siswa hlm. 257–259; Buku Panduan Guru hlm. 370–371",
  latar: "#FFFBEB",
  kutipan: [
    "Eksplorasi 8.3C",
    "Diagram yang dibicarakan Nisa dan Lukas tersebut adalah diagram batang horizontal",
    "Salin dan lengkapi diagram batang horizontal berikut di buku catatanmu",
    "Perolehan Medali Emas Indonesia di Ajang Sea Games",
  ],
  ketukan: [
    k(
      "Eksplorasi 8.3C, diagram batang horizontal. Nisa dan Lukas melihat diagram yang batangnya mendatar, bukan tegak. Itulah diagram batang horizontal.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 8.3C", 13, W.ungu), teks("jud2", 150, 38, "Diagram Batang Horizontal", 9.4, W.biru)),
      tambah("tegak.", ...[30, 50, 40].map((h, i) => kotak(`v${i}`, 44 + i * 22, 140 - h, 14, h, W.batang, W.biru, { rx: 1, tebal: 1 })), teks("vt", 77, 160, "tegak", 8, W.merah)),
      tambah("mendatar,", ...[50, 30, 40].map((w, i) => kotak(`h${i}`, 180, 94 + i * 16, w, 11, W.batang2, W.biru, { rx: 1, tebal: 1 })), teks("ht", 205, 160, "mendatar", 8, W.hijau)),
    ),
    k(
      "Data medali emas yang sama kita gambar mendatar. Tahun ditaruh di sumbu tegak, medali emas di sumbu mendatar, dengan skala nol sampai delapan puluh.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Perolehan Medali Emas Indonesia", 9.6, W.ungu)),
      tambah("Tahun", ...sumbuH("sh", GM)),
      tambah("tegak,", teks("yt", 22, 82, "Tahun", 7, W.biru)),
      tambah("mendatar@2", teks("xt", 162, 168, "Perolehan medali emas", 7.4, W.biru)),
    ),
    k(
      "Batang tahun 2013 panjangnya enam puluh lima, tahun 2015 empat puluh tujuh, dan tahun 2017 tiga puluh delapan.",
      tambah("2013", ...batangH("h0", GM, 0, 5, 65, W.batang, "2013")),
      tambah("2015", ...batangH("h1", GM, 1, 5, 47, W.batang, "2015")),
      tambah("2017", ...batangH("h2", GM, 2, 5, 38, W.batang, "2017")),
    ),
    k(
      "Batang 2019 panjangnya tujuh puluh dua dan 2021 enam puluh sembilan. Datanya sama dengan diagram tegak, hanya arah batangnya yang berbeda.",
      tambah("2019", ...batangH("h3", GM, 3, 5, 72, W.batang, "2019")),
      tambah("2021", ...batangH("h4", GM, 4, 5, 69, W.batang, "2021")),
      sorotkan("sama", "h3-k"),
      tambah("sama", teks("sm", 150, 190, "data sama, arah batang berbeda", 8.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 8.3C aktivitas 2: panen lele Pak Bajuri (hlm. 259 sampai 261; Buku Panduan Guru hlm. 371 sampai 373) ------------------------------ */
const GL: GH = { x: 62, y: 36, w: 200, h: 100, maks: 40, langkah: 10 };
const LELE: [string, number][] = [
  ["Kolam 1", 32],
  ["Kolam 2", 28],
  ["Kolam 3", 21],
  ["Kolam 4", 16],
  ["Kolam 5", 25],
];

export const ADEGAN_LELE: AdeganStory = {
  id: "lele",
  judul: "Eksplorasi 8.3C aktivitas 2: hasil panen lele",
  sumber: "Buku Siswa hlm. 259–261; Buku Panduan Guru hlm. 371–373",
  latar: "#ECFEFF",
  kutipan: [
    "Pak Bajuri mempunyai beberapa kolam lele",
    "Tabel 8.10 Hasil Panen Lele Pak Bajuri",
    "Pernyataan siapakah yang benar",
    "Harga jual per kg adalah",
    "Tentukan pendapatan Pak Bajuri dari hasil panen lele tersebut",
  ],
  ketukan: [
    k(
      "Aktivitas 2. Pak Bajuri punya lima kolam lele. Hasil panen tiap kolam ada di tabel, tetapi kolam 2 dan kolam 4 belum lengkap.",
      tambah(0, teks("jud", 150, 18, "Aktivitas 2: Panen Lele Pak Bajuri", 9.6, W.ungu)),
      tambah("tabel,", ...tabel("tb", 62, 28, [90, 86], 20, [["Kolam", "Hasil panen (kg)"]], 7.6)),
      tambah("kolam@3", ...LELE.flatMap(([nama, n], i) => barisTabel(`tb${i}`, 62, 48 + i * 20, [90, 86], 20, [nama, i === 1 || i === 3 ? "..." : String(n)], 8))),
    ),
    k(
      "Dari diagram batang kita lengkapi: kolam 2 sampai 28 kilogram, kolam 4 sampai 16. Kolam 1, 3, dan 5 sudah terbaca.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Hasil Panen Lele Pak Bajuri", 9.6, W.ungu)),
      tambah("Dari", ...sumbuH("sl", GL)),
      tambah("kolam", ...batangH("l1", GL, 1, 5, 28, W.batang2, "Kolam 2")),
      tambah("kolam@2", ...batangH("l3", GL, 3, 5, 16, W.batang2, "Kolam 4")),
      tambah("sudah", ...batangH("l0", GL, 0, 5, 32, W.batang, "Kolam 1"), ...batangH("l2", GL, 2, 5, 21, W.batang, "Kolam 3"), ...batangH("l4", GL, 4, 5, 25, W.batang, "Kolam 5")),
    ),
    k(
      "Jumlah seluruh panen: 32 tambah 28 tambah 21 tambah 16 tambah 25, yaitu 122 kilogram.",
      tambah("Jumlah", teks("jm", 150, 170, "32 + 28 + 21 + 16 + 25 = 122", 10, W.ungu)),
    ),
    k(
      "Pernyataan pertama, hasil panen tertinggi dari kolam 2, itu keliru. Batang terpanjang milik kolam 1, yaitu 32.",
      sorotkan("keliru.", "l0-k"),
      tambah("keliru.", emo("x", 70, 188, "❌", 14), teks("kt", 150, 180, "tertinggi: Kolam 1", 8, W.merah)),
    ),
    k(
      "Pernyataan kedua: selisih kolam 1 dan 4 melebihi seperempat total. Selisihnya 32 dikurangi 16, yaitu 16. Seperempat dari 122 adalah 30,5.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pernyataan kedua", 11, W.ungu)),
      tambah("Selisihnya", ...kartu("q1", 20, 40, 260, 34, W.krem, ["selisih: 32 - 16 = 16"], 10)),
      tambah("Seperempat@2", ...kartu("q2", 20, 84, 260, 34, W.mint, ["seperempat total: 122 : 4 = 30,5"], 10)),
      tambah("30,5.", teks("q3", 150, 148, "16 kurang dari 30,5, jadi salah", 9.6, W.merah)),
    ),
    k(
      "Kunci Buku Panduan Guru menjumlahkan 32 dan 16 menjadi 48, lalu menyebut pernyataan itu benar. Padahal selisih adalah pengurangan, jadi tetap 16.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Catatan atas kunci", 11, W.ungu)),
      tambah("menjumlahkan", ...kartu("c1", 20, 40, 260, 34, W.mawar, ["kunci buku: 32 + 16 = 48"], 10)),
      tambah("pengurangan,", ...kartu("c2", 20, 88, 260, 34, W.mint, ["selisih: 32 - 16 = 16"], 10)),
      tambah("tetap", teks("c3", 150, 150, "selisih adalah pengurangan", 9.6, W.ungu)),
    ),
    k(
      "Terakhir, panen dijual 22.000 rupiah per kilogram. Pendapatan Pak Bajuri adalah 122 kali 22.000, yaitu 2.684.000 rupiah.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pendapatan Pak Bajuri", 12, W.ungu)),
      tambah("22.000", ...kartu("g1", 20, 40, 260, 34, W.krem, ["harga: Rp22.000 per kg"], 10)),
      tambah("122", ...kartu("g2", 20, 86, 260, 34, W.langit, ["122 x 22.000 = 2.684.000"], 10)),
      tambah("2.684.000", emo("uang", 150, 156, "💰", 28), teks("g3", 150, 182, "Rp2.684.000", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 8.3D: membandingkan dua diagram (hlm. 261 sampai 263; Buku Panduan Guru hlm. 373 sampai 375) ------------------------------ */
const LAKI = [14, 11, 16, 12, 15];
const PEREMPUAN = [10, 13, 12, 16, 14];
const TAHUN = ["2017", "2018", "2019", "2020", "2021"];
const GLK: GV = { x: 30, y: 130, w: 108, h: 80, maks: 30, langkah: 10 };
const GPR: GV = { x: 170, y: 130, w: 108, h: 80, maks: 18, langkah: 6 };
const GLK2: GV = { ...GLK, maks: 18, langkah: 6 };

export const ADEGAN_GANDA_83D: AdeganStory = {
  id: "ganda-83d",
  judul: "Eksplorasi 8.3D: membandingkan dua diagram batang",
  sumber: "Buku Siswa hlm. 261–263; Buku Panduan Guru hlm. 373–375",
  latar: "#FDF4FF",
  kutipan: [
    "Eksplorasi 8.3D",
    "Pak Guru menampilkan dua diagram batang yang menunjukkan banyaknya siswa laki-laki dan perempuan di SD Pancasila",
    "Setiap tahun, siswa perempuan selalu lebih banyak daripada siswa laki-laki",
    "Ketika akan membandingkan dua diagram batang, apa yang harus kita perhatikan",
    "Apakah ada saat siswa laki-laki lebih banyak daripada siswa perempuan",
  ],
  ketukan: [
    k(
      "Eksplorasi 8.3D. Pak Guru menampilkan dua diagram batang, siswa laki-laki dan siswa perempuan di SD Pancasila. Asep berkata, setiap tahun siswa perempuan selalu lebih banyak.",
      tambah(0, teks("jud", 150, 16, "Eksplorasi 8.3D", 11, W.ungu)),
      tambah("laki-laki", teks("tl", 84, 30, "Siswa laki-laki", 8, W.batang), ...sumbuV("gl", GLK), ...LAKI.flatMap((n, i) => batangV(`l${i}`, GLK, i, 5, n, W.batang, TAHUN[i], { angka: false }))),
      tambah("perempuan", teks("tp", 224, 30, "Siswa perempuan", 8, W.batang2), ...sumbuV("gp", GPR), ...PEREMPUAN.flatMap((n, i) => batangV(`p${i}`, GPR, i, 5, n, W.batang2, TAHUN[i], { angka: false }))),
    ),
    k(
      "Sekilas batang perempuan tampak lebih tinggi. Tetapi lihat skalanya. Diagram laki-laki berskala sampai 30, diagram perempuan hanya sampai 18, jadi tinggi batang tidak bisa dibandingkan langsung.",
      sorotkan("skalanya.", "gl-a30", "gp-a18"),
      tambah("hanya", teks("pt", 150, 168, "skala berbeda: 30 dan 18", 9.4, W.merah)),
    ),
    k(
      "Kita buat ulang dengan skala yang sama, nol sampai 18, pada kedua diagram.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Skala sama: nol sampai 18", 11, W.ungu)),
      tambah("ulang", teks("tl", 84, 30, "Siswa laki-laki", 8, W.batang), ...sumbuV("gl", GLK2), ...LAKI.flatMap((n, i) => batangV(`l${i}`, GLK2, i, 5, n, W.batang, TAHUN[i], { angka: false }))),
      tambah("sama,", teks("tp", 224, 30, "Siswa perempuan", 8, W.batang2), ...sumbuV("gp", GPR), ...PEREMPUAN.flatMap((n, i) => batangV(`p${i}`, GPR, i, 5, n, W.batang2, TAHUN[i], { angka: false }))),
    ),
    k(
      "Hasilnya, tahun 2017, 2019, dan 2021 siswa laki-laki lebih banyak. Tahun 2018 dan 2020 siswa perempuan lebih banyak. Jadi pendapat Asep tidak tepat.",
      tambah("2017,", ...TAHUN.map((t, i) => teks(`an${i}`, 30 + i * 60, 160, t, 7.4, W.biru)), ...TAHUN.map((_, i) => teks(`ak${i}`, 30 + i * 60, 172, i % 2 === 0 ? "laki-laki" : "perempuan", 6.6, i % 2 === 0 ? W.batang : W.batang2))),
      tambah("tidak", teks("as", 150, 192, "pendapat Asep tidak tepat", 8.6, W.merah)),
    ),
    k(
      "Pelajaran penting, saat membandingkan dua diagram batang, perhatikan skalanya, bukan hanya tinggi batang. Skala kedua diagram harus sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Membandingkan dua diagram", 12, W.ungu)),
      tambah("perhatikan", ...kartu("w1", 24, 42, 252, 34, W.krem, ["lihat skala dulu"], 10)),
      tambah("bukan", ...kartu("w2", 24, 84, 252, 34, W.mawar, ["bukan hanya tinggi batang"], 10)),
      tambah("harus", ...kartu("w3", 24, 126, 252, 34, W.mint, ["skala kedua diagram harus sama"], 10)),
    ),
  ],
};
