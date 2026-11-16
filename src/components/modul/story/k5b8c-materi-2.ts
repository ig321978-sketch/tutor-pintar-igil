import type { AdeganStory } from "./logika-story";
import { W, barisTabel, batangH, batangV, emo, garis, kartu, kotak, sumbuH, sumbuV, tabel, teks, type GH, type GV } from "./k5b8c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b8c-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 4. Membaca skala dan menilai pernyataan tentang medali emas ------------------------------ */
const GA: GV = { x: 30, y: 140, w: 100, h: 80, maks: 80, langkah: 20 };
const GB: GV = { x: 170, y: 140, w: 100, h: 80, maks: 80, langkah: 20 };

export const ADEGAN_SEAGAMES_TANYA: AdeganStory = {
  id: "seagames-tanya",
  judul: "Membaca skala dan menilai pernyataan",
  sumber: "Materi: membaca skala dan menilai",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b8c-materi-2.ts:1"),
  ketukan: [
    k(
      "Sekarang kita berlatih membaca skala. Manakah dari dua gambar yang tepat mewakili medali emas tahun dua ribu tujuh belas? Garis kecilnya bernilai empat.",
      tambah(0, teks("jud", 150, 18, "Manakah yang tepat untuk 2017?", 9.6, W.ungu)),
      tambah("dua", ...sumbuV("ga", GA), ...sumbuV("gb", GB)),
      tambah("gambar", ...batangV("a", GA, 2, 3, 38, W.batang, "2017", { angka: false }), teks("ha", 80, 166, "a", 11, W.merah)),
      tambah("tepat", ...batangV("b", GB, 2, 3, 36, W.batang, "2017", { angka: false }), teks("hb", 220, 166, "b", 11, W.merah)),
    ),
    k(
      "Garis kecil dihitung empat demi empat: tiga puluh enam, lalu empat puluh. Medali tiga puluh delapan ada di antara keduanya, jadi gambar a yang tepat.",
      tambah("empat@2", ...[36, 40].map((n) => garis(`pa${n}`, 30, 140 - (n / 80) * 80, 100, 0, W.merah, 0.8, { putus: true })), teks("p36", 134, 112, "36", 6.8, W.merah, { anchor: "start" }), teks("p40", 134, 98, "40", 6.8, W.merah, { anchor: "start" })),
      tambah("delapan", teks("v38", 112, 98, "38", 8, W.hijau)),
      tambah("tepat.", emo("ok", 80, 192, "✅", 14), emo("no", 220, 192, "❌", 14)),
    ),
    k(
      "Berikutnya, Halim berkata medali emas selalu menurun sejak dua ribu tiga belas. Upe berkata, penurunan dua ribu lima belas lebih banyak daripada dua ribu dua puluh satu.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pernyataan siapa yang dapat diterima?", 9.6, W.ungu)),
      tambah("Halim", ...kartu("n", 16, 40, 268, 50, W.mawar, ["Halim: dari 2013 sampai 2021", "medali emas selalu menurun"], 8.8)),
      tambah("Upe", ...kartu("s", 16, 100, 268, 50, W.langit, ["Upe: penurunan 2015", "lebih banyak daripada 2021"], 8.8)),
    ),
    k(
      "Periksa Halim. Dari dua ribu lima belas ke dua ribu tujuh belas turun, tetapi dari dua ribu tujuh belas ke dua ribu sembilan belas naik. Jadi Halim tidak tepat.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Periksa pernyataan Halim", 10.5, W.ungu)),
      tambah("ribu@1", ...[["2013", "65"], ["2015", "47"], ["2017", "38"], ["2019", "72"], ["2021", "69"]].flatMap(([th, n], i) => kartu(`r${i}`, 10 + i * 58, 50, 50, 40, i === 3 ? W.mint : W.krem, [th, n], 8.4))),
      tambah("turun,", teks("t1", 63, 108, "turun", 7, W.merah), teks("t2", 121, 108, "turun", 7, W.merah)),
      tambah("naik,", teks("t3", 179, 108, "naik", 7, W.hijau)),
      sorotkan("naik,", "r3-k"),
      tambah("tidak", teks("tdk", 150, 150, "Halim: tidak dapat diterima", 9.4, W.merah), emo("x", 150, 178, "❌", 16)),
    ),
    k(
      "Periksa Upe. Tahun dua ribu lima belas turun delapan belas. Tahun dua ribu dua puluh satu turun hanya tiga. Jadi Upe benar.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Periksa pernyataan Upe", 10.5, W.ungu)),
      tambah("ribu@1", ...kartu("p1", 20, 40, 260, 40, W.krem, ["2015: 65 - 47 = 18"], 10)),
      tambah("ribu@2", ...kartu("p2", 20, 92, 260, 40, W.mint, ["2021: 72 - 69 = 3"], 10)),
      tambah("benar.", teks("by", 150, 160, "18 lebih banyak daripada 3", 9.6, W.hijau), emo("ok", 150, 186, "✅", 16)),
    ),
    k(
      "Selanjutnya tahun dua ribu sembilan belas: tujuh puluh dua emas, delapan puluh empat perak, seratus sebelas perunggu. Jumlahnya dua ratus enam puluh tujuh.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Medali tahun 2019", 11, W.ungu)),
      tambah("emas,", ...kartu("e1", 16, 36, 82, 40, W.jeruk, ["72 emas"], 9)),
      tambah("perak,", ...kartu("e2", 109, 36, 82, 40, W.abu, ["84 perak"], 9)),
      tambah("perunggu.", ...kartu("e3", 202, 36, 82, 40, W.krem, ["111 perunggu"], 9)),
      tambah("Jumlahnya", teks("jm", 150, 100, "72 + 84 + 111 = 267", 12, W.ungu)),
    ),
    k(
      "Ayo berdiskusi. Mencari data tertinggi dan terendah lebih mudah lewat tabel atau diagram batang? Jawabannya diagram batang, sebab kita cukup melihat tinggi batangnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tabel atau diagram batang?", 11, W.ungu)),
      tambah("tabel", ...kartu("d1", 16, 40, 124, 70, W.krem, ["Tabel", "baca angka satu per satu"], 8.6)),
      tambah("diagram", ...kartu("d2", 160, 40, 124, 70, W.mint, ["Diagram batang", "lihat tinggi batang"], 8.6)),
      tambah("Jawabannya", emo("ok", 222, 140, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 5. Diagram batang horizontal ------------------------------ */
const GM: GH = { x: 62, y: 38, w: 200, h: 100, maks: 80, langkah: 20 };

export const ADEGAN_HORIZONTAL_83C: AdeganStory = {
  id: "horizontal-83c",
  judul: "Diagram batang horizontal",
  sumber: "Materi: diagram batang horizontal",
  latar: "#FFFBEB",
  kutipan: kutipanLokal("k5b8c-materi-2.ts:2"),
  ketukan: [
    k(
      "Sekarang diagram batang horizontal. Halim dan Kira melihat diagram yang batangnya mendatar, bukan tegak. Itulah diagram batang horizontal.",
      tambah(0, teks("jud", 150, 24, "Diagram Batang Horizontal", 12, W.ungu), teks("jud2", 150, 38, "batangnya mendatar", 9.4, W.biru)),
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
      "Batang dua ribu tiga belas panjangnya enam puluh lima, dua ribu lima belas empat puluh tujuh, dan dua ribu tujuh belas tiga puluh delapan.",
      tambah("ribu@1", ...batangH("h0", GM, 0, 5, 65, W.batang, "2013")),
      tambah("ribu@2", ...batangH("h1", GM, 1, 5, 47, W.batang, "2015")),
      tambah("ribu@3", ...batangH("h2", GM, 2, 5, 38, W.batang, "2017")),
    ),
    k(
      "Batang dua ribu sembilan belas panjangnya tujuh puluh dua, dan dua ribu dua puluh satu enam puluh sembilan. Datanya sama dengan diagram tegak, hanya arah batangnya yang berbeda.",
      tambah("ribu@1", ...batangH("h3", GM, 3, 5, 72, W.batang, "2019")),
      tambah("ribu@2", ...batangH("h4", GM, 4, 5, 69, W.batang, "2021")),
      sorotkan("sama", "h3-k"),
      tambah("sama", teks("sm", 150, 190, "data sama, arah batang berbeda", 8.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. Panen lele Pak Malosi ------------------------------ */
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
  judul: "Hasil panen lele Pak Malosi",
  sumber: "Materi: hasil panen lele Pak Malosi",
  latar: "#ECFEFF",
  kutipan: kutipanLokal("k5b8c-materi-2.ts:3"),
  ketukan: [
    k(
      "Sekarang latihan memakai data panen lele. Pak Malosi punya lima kolam lele. Hasil panen tiap kolam ada di tabel, tetapi kolam dua dan kolam empat belum lengkap.",
      tambah(0, teks("jud", 150, 18, "Panen Lele Pak Malosi", 9.6, W.ungu)),
      tambah("tabel,", ...tabel("tb", 62, 28, [90, 86], 20, [["Kolam", "Hasil panen (kg)"]], 7.6)),
      tambah("kolam@3", ...LELE.flatMap(([nama, n], i) => barisTabel(`tb${i}`, 62, 48 + i * 20, [90, 86], 20, [nama, i === 1 || i === 3 ? "..." : String(n)], 8))),
    ),
    k(
      "Dari diagram batang kita lengkapi: kolam dua dua puluh delapan kilogram, kolam empat enam belas. Kolam lain sudah terbaca.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Hasil Panen Lele Pak Malosi", 9.6, W.ungu)),
      tambah("Dari", ...sumbuH("sl", GL)),
      tambah("kolam", ...batangH("l1", GL, 1, 5, 28, W.batang2, "Kolam 2")),
      tambah("kolam@2", ...batangH("l3", GL, 3, 5, 16, W.batang2, "Kolam 4")),
      tambah("sudah", ...batangH("l0", GL, 0, 5, 32, W.batang, "Kolam 1"), ...batangH("l2", GL, 2, 5, 21, W.batang, "Kolam 3"), ...batangH("l4", GL, 4, 5, 25, W.batang, "Kolam 5")),
    ),
    k(
      "Jumlah seluruh panen adalah hasil menambah kelima kolam, yaitu seratus dua puluh dua kilogram.",
      tambah("Jumlah", teks("jm", 150, 170, "32 + 28 + 21 + 16 + 25 = 122", 10, W.ungu)),
    ),
    k(
      "Pernyataan pertama, kolam dua tertinggi, itu keliru. Batang terpanjang milik kolam satu, yaitu tiga puluh dua.",
      sorotkan("keliru.", "l0-k"),
      tambah("keliru.", emo("x", 70, 188, "❌", 14), teks("kt", 150, 180, "tertinggi: Kolam 1", 8, W.merah)),
    ),
    k(
      "Pernyataan kedua: selisih kolam satu dan empat melebihi seperempat total. Selisihnya tiga puluh dua dikurangi enam belas, yaitu enam belas. Seperempat dari seratus dua puluh dua adalah tiga puluh koma lima.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pernyataan kedua", 11, W.ungu)),
      tambah("Selisihnya", ...kartu("q1", 20, 40, 260, 34, W.krem, ["selisih: 32 - 16 = 16"], 10)),
      tambah("Seperempat@2", ...kartu("q2", 20, 84, 260, 34, W.mint, ["seperempat total: 122 : 4 = 30,5"], 10)),
      tambah("lima.", teks("q3", 150, 148, "16 kurang dari 30,5, jadi salah", 9.6, W.merah)),
    ),
    k(
      "Hati-hati, jangan mencari selisih dengan penjumlahan. Tiga puluh dua tambah enam belas menjadi empat puluh delapan, lalu pernyataan dikira benar. Padahal selisih adalah pengurangan, jadi tetap enam belas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hati-hati: selisih", 11, W.ungu)),
      tambah("penjumlahan,", ...kartu("c1", 20, 40, 260, 34, W.mawar, ["keliru: 32 + 16 = 48"], 10)),
      tambah("pengurangan,", ...kartu("c2", 20, 88, 260, 34, W.mint, ["selisih: 32 - 16 = 16"], 10)),
      tambah("tetap", teks("c3", 150, 150, "selisih adalah pengurangan", 9.6, W.ungu)),
    ),
    k(
      "Panen dijual dua puluh dua ribu rupiah per kilogram, jadi pendapatannya seratus dua puluh dua kali dua puluh dua ribu, yaitu dua juta enam ratus delapan puluh empat ribu rupiah.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pendapatan Pak Malosi", 12, W.ungu)),
      tambah("dua", ...kartu("g1", 20, 40, 260, 34, W.krem, ["harga: Rp22.000 per kg"], 10)),
      tambah("seratus", ...kartu("g2", 20, 86, 260, 34, W.langit, ["122 x 22.000 = 2.684.000"], 10)),
      tambah("juta", emo("uang", 150, 156, "💰", 28), teks("g3", 150, 182, "Rp2.684.000", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Membandingkan dua diagram batang ------------------------------ */
const LAKI = [14, 11, 16, 12, 15];
const PEREMPUAN = [10, 13, 12, 16, 14];
const TAHUN = ["2017", "2018", "2019", "2020", "2021"];
const GLK: GV = { x: 30, y: 130, w: 108, h: 80, maks: 30, langkah: 10 };
const GPR: GV = { x: 170, y: 130, w: 108, h: 80, maks: 18, langkah: 6 };
const GLK2: GV = { ...GLK, maks: 18, langkah: 6 };

export const ADEGAN_GANDA_83D: AdeganStory = {
  id: "ganda-83d",
  judul: "Membandingkan dua diagram batang",
  sumber: "Materi: membandingkan dua diagram",
  latar: "#FDF4FF",
  kutipan: kutipanLokal("k5b8c-materi-2.ts:4"),
  ketukan: [
    k(
      "Sekarang kita bandingkan dua diagram batang. Pak Guru menampilkan banyaknya siswa laki-laki dan siswa perempuan di SD Pancasila. Upe berkata, setiap tahun siswa perempuan selalu lebih banyak.",
      tambah(0, teks("jud", 150, 16, "Dua Diagram Batang", 11, W.ungu)),
      tambah("laki-laki", teks("tl", 84, 30, "Siswa laki-laki", 8, W.batang), ...sumbuV("gl", GLK), ...LAKI.flatMap((n, i) => batangV(`l${i}`, GLK, i, 5, n, W.batang, TAHUN[i], { angka: false }))),
      tambah("perempuan", teks("tp", 224, 30, "Siswa perempuan", 8, W.batang2), ...sumbuV("gp", GPR), ...PEREMPUAN.flatMap((n, i) => batangV(`p${i}`, GPR, i, 5, n, W.batang2, TAHUN[i], { angka: false }))),
    ),
    k(
      "Sekilas batang perempuan tampak lebih tinggi. Tetapi lihat skalanya. Diagram laki-laki berskala sampai tiga puluh, diagram perempuan hanya sampai delapan belas, jadi tinggi batang tidak bisa dibandingkan langsung.",
      sorotkan("skalanya.", "gl-a30", "gp-a18"),
      tambah("hanya", teks("pt", 150, 168, "skala berbeda: 30 dan 18", 9.4, W.merah)),
    ),
    k(
      "Kita buat ulang dengan skala yang sama, nol sampai delapan belas, pada kedua diagram.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Skala sama: nol sampai 18", 11, W.ungu)),
      tambah("ulang", teks("tl", 84, 30, "Siswa laki-laki", 8, W.batang), ...sumbuV("gl", GLK2), ...LAKI.flatMap((n, i) => batangV(`l${i}`, GLK2, i, 5, n, W.batang, TAHUN[i], { angka: false }))),
      tambah("sama,", teks("tp", 224, 30, "Siswa perempuan", 8, W.batang2), ...sumbuV("gp", GPR), ...PEREMPUAN.flatMap((n, i) => batangV(`p${i}`, GPR, i, 5, n, W.batang2, TAHUN[i], { angka: false }))),
    ),
    k(
      "Hasilnya, tahun dua ribu tujuh belas, sembilan belas, dan dua puluh satu laki-laki lebih banyak. Tahun dua ribu delapan belas dan dua puluh perempuan lebih banyak. Jadi pendapat Upe tidak tepat.",
      tambah("ribu@1", ...TAHUN.map((t, i) => teks(`an${i}`, 30 + i * 60, 160, t, 7.4, W.biru)), ...TAHUN.map((_, i) => teks(`ak${i}`, 30 + i * 60, 172, i % 2 === 0 ? "laki-laki" : "perempuan", 6.6, i % 2 === 0 ? W.batang : W.batang2))),
      tambah("tidak", teks("as", 150, 192, "pendapat Upe tidak tepat", 8.6, W.merah)),
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
