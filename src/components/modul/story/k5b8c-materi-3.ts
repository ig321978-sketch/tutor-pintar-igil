import type { AdeganStory } from "./logika-story";
import { W, barisTabel, batangGandaH, batangGandaV, batangH, batangV, emo, kartu, kotak, lambangBulat, legenda, panah, sumbuH, sumbuV, tabel, teks, type GH, type GV } from "./k5b8c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b8c-bantu";

/* ------------------------------ 8. Eksplorasi 8.3E: diagram batang ganda (hlm. 263 sampai 265; Buku Panduan Guru hlm. 375 sampai 378) ------------------------------ */
const SISWA: [string, number, number][] = [
  ["2017", 14, 10],
  ["2018", 11, 13],
  ["2019", 16, 12],
  ["2020", 12, 16],
  ["2021", 15, 14],
];
const GG: GV = { x: 36, y: 158, w: 240, h: 104, maks: 20, langkah: 5 };

export const ADEGAN_GABUNG_83E: AdeganStory = {
  id: "gabung-83e",
  judul: "Eksplorasi 8.3E: menggabung dua diagram menjadi diagram batang ganda",
  sumber: "Buku Siswa hlm. 263–265; Buku Panduan Guru hlm. 375–378",
  latar: "#FFF7ED",
  kutipan: [
    "Eksplorasi 8.3E",
    "Berapa selisih banyaknya siswa laki-laki dan perempuan pada tahun 2019",
    "Berapa banyaknya semua siswa kelas V SD Pancasila pada tahun 2021",
    "disebut sebagai diagram batang ganda",
    "Apakah sembarang dua data dapat dibuat diagram batang ganda",
  ],
  ketukan: [
    k(
      "Eksplorasi 8.3E. Yohana punya ide, gabungkan diagram siswa laki-laki dan perempuan. Tahunnya sama, jadi bisa digabung dan lebih mudah dibandingkan.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 8.3E", 13, W.ungu)),
      tambah("laki-laki", ...kartu("c1", 20, 46, 110, 44, W.langit, ["Diagram siswa", "laki-laki"], 8.6)),
      tambah("perempuan", ...kartu("c2", 170, 46, 110, 44, W.mawar, ["Diagram siswa", "perempuan"], 8.6)),
      tambah("digabung", panah("a1", 75, 94, 55, 36, W.merah, 2, { gambar: true }), panah("a2", 225, 94, -55, 36, W.merah, 2, { gambar: true }), ...kartu("c3", 90, 136, 120, 44, W.mint, ["Diagram batang", "ganda"], 8.6)),
    ),
    k(
      "Pertama, tabel gabungan. Tahun 2017 laki-laki 14 dan perempuan 10. Tahun 2018, 11 dan 13. Tahun 2019, 16 dan 12. Tahun 2020, 12 dan 16. Tahun 2021, 15 dan 14.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Sebaran Siswa Kelas V SD Pancasila", 9, W.ungu)),
      tambah("Pertama,", ...tabel("tb", 30, 28, [70, 90, 90], 20, [["Tahun", "Laki-laki", "Perempuan"]], 8)),
      ...SISWA.map(([th, a, b], i) => tambah(th, ...barisTabel(`tb${i}`, 30, 48 + i * 20, [70, 90, 90], 20, [th, String(a), String(b)], 8))),
    ),
    k(
      "Lalu diagram batang ganda. Tiap tahun punya sepasang batang, biru untuk laki-laki dan merah muda untuk perempuan, dengan skala nol sampai 20.",
      bersih(0),
      tambah(0, teks("jud", 150, 14, "Sebaran Siswa Kelas V SD Pancasila", 8.6, W.ungu)),
      tambah("diagram", ...sumbuV("gg", GG)),
      tambah("sepasang", ...SISWA.flatMap(([th, a, b], i) => batangGandaV(`g${i}`, GG, i, 5, a, b, th))),
      tambah("biru", ...legenda("lg", 84, 20, "Laki-laki", "Perempuan", 66)),
    ),
    k(
      "Dari diagram ganda, selisih tahun 2019 adalah 16 dikurangi 12, yaitu 4. Tidak ada tahun yang sama banyak. Jumlah siswa tahun 2021 adalah 15 tambah 14, yaitu 29.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Membaca diagram ganda", 11, W.ungu)),
      tambah("selisih", ...kartu("d1", 20, 32, 260, 42, W.krem, ["selisih 2019", "16 - 12 = 4"], 9.4)),
      tambah("Tidak", ...kartu("d2", 20, 84, 260, 34, W.mawar, ["tidak ada tahun yang sama banyak"], 9.4)),
      tambah("Jumlah", ...kartu("d3", 20, 128, 260, 42, W.mint, ["jumlah siswa 2021", "15 + 14 = 29"], 9.4)),
    ),
    k(
      "Diagram batang ganda menggabungkan dua hal dalam satu diagram. Tetapi tidak semua data cocok digabung. Jika satu data ribuan dan yang lain belasan, batang kecilnya terlalu pendek.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tidak semua data cocok digabung", 10.5, W.ungu)),
      tambah("ribuan", kotak("r1", 84, 54, 36, 100, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("r1t", 102, 168, "ribuan", 8)),
      tambah("belasan,", kotak("r2", 176, 150, 36, 4, W.batang2, W.biru, { rx: 0, tebal: 1 }), teks("r2t", 194, 168, "belasan", 8)),
      tambah("pendek.", teks("sk", 194, 138, "sulit dibaca", 8.4, W.merah), emo("x", 194, 124, "❌", 14)),
    ),
  ],
};

/* ------------------------------ 9. Ayo Berlatih: kalori makanan dan nilai ulangan (hlm. 266 sampai 268; Buku Panduan Guru hlm. 380 sampai 382) ------------------------------ */
const GK: GH = { x: 84, y: 26, w: 190, h: 112, maks: 300, langkah: 100 };
// Nilai batang yang tertulis di kunci Buku Panduan Guru diberi angka; sisanya dibaca dari gambar buku dan tidak diberi angka.
const KALORI: [string, number, boolean][] = [
  ["Nasi putih", 130, true],
  ["Nasi jagung", 150, false],
  ["Daging sapi", 290, false],
  ["Daging ayam", 260, true],
  ["Tahu goreng", 270, false],
  ["Tempe goreng", 240, true],
  ["Sayuran hijau", 60, true],
];
const NILAI: [string, number, number][] = [
  ["Lukas", 65, 80],
  ["Nisa", 70, 85],
  ["Komang", 50, 90],
  ["Asep", 90, 75],
  ["Yohana", 85, 80],
  ["Robert", 90, 65],
];
const GD: GV = { x: 40, y: 146, w: 232, h: 96, maks: 100, langkah: 25 };

export const ADEGAN_LATIHAN_DATA: AdeganStory = {
  id: "latihan-data",
  judul: "Ayo Berlatih: kalori makanan dan nilai ulangan",
  sumber: "Buku Siswa hlm. 266–268; Buku Panduan Guru hlm. 380–382",
  latar: "#F0F9FF",
  kutipan: [
    "Kandungan Kalori Per 100 Gram Makanan",
    "Kalori adalah satuan energi",
    "Berapa kandungan kalori yang terdapat pada 100 gram tempe goreng",
    "Daftar Nilai Ulangan Matematika",
    "nilai siapakah yang mengalami kenaikan paling tinggi",
  ],
  ketukan: [
    k(
      "Ayo Berlatih nomor 1, diagram kalori setiap 100 gram makanan. Kalori adalah satuan energi. Kalori tertinggi pada daging sapi, terendah pada sayuran hijau.",
      tambah(0, teks("jud", 150, 14, "Ayo Berlatih 1: kalori per 100 gram", 8.8, W.ungu)),
      tambah("diagram", ...sumbuH("sk", GK)),
      tambah("makanan.", ...KALORI.flatMap(([nama, n, angka], i) => batangH(`kk${i}`, GK, i, 7, n, W.batang, nama, { angka }))),
      tambah("energi.", teks("xk", 180, 164, "Kalori (kkal)", 7.2)),
      sorotkan("tertinggi", "kk2-k"),
      sorotkan("terendah", "kk6-k"),
    ),
    k(
      "Soal c, 100 gram tempe goreng mengandung 240 kilokalori. Soal d, Asep makan 50 gram nasi putih, 50 gram daging ayam, dan 100 gram sayuran. Totalnya 65 tambah 130 tambah 60, yaitu 255.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Soal c dan d", 11, W.ungu)),
      tambah("tempe", ...kartu("t0", 30, 28, 240, 30, W.krem, ["tempe goreng 100 g: 240 kkal"], 9)),
      tambah("nasi", ...kartu("t1", 10, 68, 88, 46, W.mint, ["50 g nasi putih", "65"], 8.4)),
      tambah("ayam,", ...kartu("t2", 106, 68, 88, 46, W.mawar, ["50 g daging ayam", "130"], 8.4)),
      tambah("sayuran.", ...kartu("t3", 202, 68, 88, 46, W.langit, ["100 g sayuran", "60"], 8.4)),
      tambah("Totalnya", teks("tt", 150, 146, "65 + 130 + 60 = 255", 13, W.ungu)),
    ),
    k(
      "Soal e, Lukas makan nasi 300 gram, ayam 200 gram, sayuran 100 gram, camilan 300, dan mi instan 350. Totalnya 1.620 kilokalori, di bawah kebutuhan 2.100. Jadi tidak berlebihan.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Soal e: makan Lukas dalam sehari", 10, W.ungu)),
      tambah("nasi", ...kartu("e1", 10, 28, 88, 40, W.mint, ["nasi 300 g", "390"], 8.4)),
      tambah("ayam", ...kartu("e2", 106, 28, 88, 40, W.mawar, ["ayam 200 g", "520"], 8.4)),
      tambah("sayuran", ...kartu("e3", 202, 28, 88, 40, W.langit, ["sayuran 100 g", "60"], 8.4)),
      tambah("camilan", ...kartu("e4", 10, 76, 88, 40, W.krem, ["camilan", "300"], 8.4)),
      tambah("instan", ...kartu("e5", 106, 76, 88, 40, W.jeruk, ["mi instan", "350"], 8.4)),
      tambah("Totalnya", teks("et", 150, 142, "390 + 520 + 60 + 300 + 350 = 1.620", 10.4, W.ungu)),
      tambah("kebutuhan", teks("ek", 150, 164, "kebutuhan anak laki-laki 2.100", 8.8, W.hijau), emo("ok", 150, 190, "✅", 16)),
    ),
    k(
      "Nomor 2, nilai ulangan ke-1 dan ke-2. Lukas 65 dan 80, Nisa 70 dan 85, Komang 50 dan 90, Asep 90 dan 75, Yohana 85 dan 80, Robert 90 dan 65.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Nomor 2: nilai ulangan Matematika", 9.4, W.ungu)),
      tambah("Nomor", ...tabel("nl", 40, 24, [76, 72, 72], 19, [["Nama", "Ulangan ke-1", "Ulangan ke-2"]], 7.4)),
      ...NILAI.map(([nama, a, b], i) => tambah(nama, ...barisTabel(`nl${i}`, 40, 43 + i * 19, [76, 72, 72], 19, [nama, String(a), String(b)], 8))),
    ),
    k(
      "Dalam diagram batang ganda, kenaikan tertinggi dialami Komang, naik 40. Penurunan terbanyak dialami Robert, turun 25.",
      bersih(0),
      tambah(0, teks("jud", 150, 12, "Nilai ulangan ke-1 dan ke-2", 8.6, W.ungu)),
      tambah("diagram", ...sumbuV("gd", GD), ...legenda("lg", 70, 17, "Ulangan ke-1", "Ulangan ke-2", 74)),
      tambah("ganda,", ...NILAI.flatMap(([nama, a, b], i) => batangGandaV(`n${i}`, GD, i, 6, a, b, nama))),
      tambah("Komang,", ...kartu("kn", 40, 164, 100, 34, W.mint, ["Komang naik", "90 - 50 = 40"], 8.2)),
      sorotkan("Komang,", "n2a-k", "n2b-k"),
      tambah("Robert,", ...kartu("rb", 160, 164, 100, 34, W.mawar, ["Robert turun", "90 - 65 = 25"], 8.2)),
      sorotkan("Robert,", "n5a-k", "n5b-k"),
    ),
  ],
};

/* ------------------------------ 10. Refleksi dan Uji Kompetensi nomor 1 dan 2 (hlm. 268 sampai 271; Buku Panduan Guru hlm. 380, 383 sampai 385) ------------------------------ */
const HARI: [string, number][] = [
  ["Senin", 42],
  ["Selasa", 60],
  ["Rabu", 50],
  ["Kamis", 36],
  ["Jumat", 24],
  ["Sabtu", 48],
];
const GU: GV = { x: 44, y: 150, w: 226, h: 100, maks: 60, langkah: 10 };
const TABUNG: [number, number, number][] = [
  [1, 4.25, 17000],
  [2, 6, 24000],
  [3, 5.25, 21000],
  [4, 4.5, 18000],
  [5, 5.75, 23000],
];
const GTA: GV = { x: 38, y: 138, w: 106, h: 86, maks: 25000, langkah: 5000 };
const GTB: GV = { x: 176, y: 138, w: 106, h: 86, maks: 25000, langkah: 5000 };
const TAB_A = [17000, 24000, 21000, 18000, 23000];
const TAB_B = [17000, 21000, 20000, 18000, 23000];

export const ADEGAN_UJI_12: AdeganStory = {
  id: "uji-12",
  judul: "Refleksi dan Uji Kompetensi nomor 1 dan 2",
  sumber: "Buku Siswa hlm. 268–271; Buku Panduan Guru hlm. 380, 383–385",
  latar: "#FEFCE8",
  kutipan: [
    "Setelah mempelajari materi terkait data, isilah tabel berikut sesuai dengan pemahaman kalian",
    "Aku dapat membuat diagram batang ganda",
    "Buatlah diagram batang berdasarkan data pada Tabel 8.13 tersebut",
    "Ayo Menabung",
    "Satu set peralatan gambar dengan kualitas yang baik harganya Rp150.000,00",
    "manakah dari dua diagram batang berikut yang benar",
  ],
  ketukan: [
    k(
      "Refleksi. Untuk diagram batang, centang pernyataan nomor 6 sampai 10: membuat tiga jenis diagram, membaca data, dan menganalisis data.",
      tambah(0, teks("jud", 150, 22, "Refleksi: diagram batang", 12, W.ungu)),
      tambah("membuat", ...kartu("f6", 24, 36, 252, 22, W.langit, ["6. membuat diagram batang vertikal"], 8.4), ...kartu("f7", 24, 62, 252, 22, W.mint, ["7. membuat diagram batang horizontal"], 8.4), ...kartu("f8", 24, 88, 252, 22, W.mawar, ["8. membuat diagram batang ganda"], 8.4)),
      tambah("membaca", ...kartu("f9", 24, 114, 252, 22, W.krem, ["9. membaca data dari diagram batang"], 8.4)),
      tambah("menganalisis", ...kartu("f10", 24, 140, 252, 22, W.jeruk, ["10. menganalisis data dari diagram batang"], 8.4)),
    ),
    k(
      "Uji Kompetensi nomor 1, pengunjung perpustakaan. Senin 42, Selasa 60, Rabu 50, Kamis 36, Jumat 24, Sabtu 48. Buatlah diagram batangnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Uji Kompetensi 1: pengunjung perpustakaan", 8.8, W.ungu)),
      tambah("pengunjung", ...sumbuV("gu", GU)),
      ...HARI.map(([hari, n], i) => tambah(hari, ...batangV(`u${i}`, GU, i, 6, n, W.batang, hari))),
    ),
    k(
      "Kunci piktogram: satu kartu mewakili 4 pengunjung, jadi Selasa 15 kartu dan Jumat 6 kartu. Paling banyak Selasa, paling sedikit Jumat. Jumat turun dari Kamis 36 dikurangi 24, yaitu 12.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Piktogram: 1 kartu = 4 pengunjung", 9.6, W.ungu)),
      tambah("Selasa", teks("sn", 60, 52, "Selasa", 8, W.biru, { anchor: "end" }), ...Array.from({ length: 15 }, (_, i) => kotak(`ks${i}`, 66 + i * 10, 44, 8, 10, W.batang2, W.biru, { rx: 1, tebal: 0.8 })), teks("sc", 220, 52, "15 kartu", 8, W.biru, { anchor: "start" })),
      tambah("Jumat", teks("jn", 60, 76, "Jumat", 8, W.biru, { anchor: "end" }), ...Array.from({ length: 6 }, (_, i) => kotak(`kj${i}`, 66 + i * 10, 68, 8, 10, W.batang, W.biru, { rx: 1, tebal: 0.8 })), teks("jc", 130, 76, "6 kartu", 8, W.biru, { anchor: "start" })),
      tambah("banyak", teks("mx", 150, 112, "paling banyak: Selasa 60", 9.2, W.hijau)),
      tambah("sedikit", teks("mn", 150, 130, "paling sedikit: Jumat 24", 9.2, W.merah)),
      tambah("turun", teks("tr", 150, 158, "36 - 24 = 12", 13, W.ungu)),
    ),
    k(
      "Nomor 2, tabungan Nisa, satu lingkaran mewakili Rp4.000. Minggu 1, 17.000. Minggu 2, 24.000. Minggu 3, 21.000. Minggu 4, 18.000. Minggu 5, 23.000.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Ayo Menabung 2: 1 lingkaran = Rp4.000", 8.8, W.ungu)),
      ...TABUNG.map(([minggu, lingkaran, nilai], i) =>
        tambah(String(nilai).replace(/\B(?=(\d{3})+(?!\d))/g, "."), teks(`tm${i}`, 58, 38 + i * 28 + 3, `Minggu ${minggu}`, 7.6, W.biru, { anchor: "end" }), ...Array.from({ length: Math.ceil(lingkaran) }, (_, j) => lambangBulat(`tl${i}-${j}`, 72 + j * 15, 38 + i * 28, 6, Math.min(1, lingkaran - j))), teks(`tn${i}`, 168, 38 + i * 28 + 3, String(nilai).replace(/\B(?=(\d{3})+(?!\d))/g, "."), 8.6, W.hijau, { anchor: "start" })),
      ),
    ),
    k(
      "Paling banyak minggu 2. Selisih minggu 2 dan 5 hanya 1.000. Total 103.000, kurang dari 150.000, jadi Nisa masih perlu menabung 47.000.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Jawaban Ayo Menabung", 11, W.ungu)),
      tambah("banyak", ...kartu("j1", 16, 30, 268, 30, W.krem, ["paling banyak: minggu 2"], 9)),
      tambah("Selisih", ...kartu("j2", 16, 68, 268, 40, W.mint, ["selisih minggu 2 dan 5", "24.000 - 23.000 = 1.000"], 9)),
      tambah("Total", teks("j3", 150, 128, "17.000 + 24.000 + 21.000 + 18.000 + 23.000 = 103.000", 7.2, W.ungu)),
      tambah("menabung", teks("j4", 150, 150, "150.000 - 103.000 = 47.000", 11, W.merah)),
    ),
    k(
      "Soal f, diagram A cocok, minggu 2 setinggi 24.000. Diagram B menunjukkan 21.000 untuk minggu 2, jadi salah.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Soal f: diagram mana yang benar?", 9.4, W.ungu)),
      tambah("diagram", teks("ta", 91, 28, "Diagram A", 8.4, W.biru), ...sumbuV("ga", GTA), ...TAB_A.flatMap((n, i) => batangV(`ba${i}`, GTA, i, 5, n, W.batang, String(i + 1), { angka: i === 1, u: 7 }))),
      tambah("Diagram@2", teks("tb", 229, 28, "Diagram B", 8.4, W.biru), ...sumbuV("gb", GTB), ...TAB_B.flatMap((n, i) => batangV(`bb${i}`, GTB, i, 5, n, W.batang2, String(i + 1), { angka: i === 1, u: 7 }))),
      tambah("cocok,", emo("oka", 91, 188, "✅", 16)),
      tambah("salah.", emo("okb", 229, 188, "❌", 16)),
    ),
  ],
};

/* ------------------------------ 11. Uji Kompetensi nomor 3 dan pengayaan (hlm. 271 sampai 272; Buku Panduan Guru hlm. 385 sampai 386 dan 390 sampai 393) ------------------------------ */
const USIA: [string, number, number, string, string][] = [
  ["13-17", 5.7, 6.8, "5,70", "6,80"],
  ["18-24", 15.9, 14.8, "15,90", "14,80"],
  ["25-34", 19.3, 14.8, "19,30", "14,80"],
  ["35-44", 7.4, 5.7, "7,40", "5,70"],
  ["45-54", 3.2, 2.4, "3,20", "2,40"],
  ["55-64", 1.0, 0.7, "1,00", "0,70"],
  ["65+", 1.5, 0.9, "1,50", "0,90"],
];
const GI: GH = { x: 56, y: 32, w: 200, h: 133, maks: 20, langkah: 5 };

export const ADEGAN_UJI_3: AdeganStory = {
  id: "uji-3",
  judul: "Uji Kompetensi nomor 3 dan pengayaan",
  sumber: "Buku Siswa hlm. 271–272; Buku Panduan Guru hlm. 385–386, 390–393",
  latar: "#F0FDF4",
  kutipan: [
    "Pengguna Internet di Indonesia",
    "Data Pengguna Internet di Indonesia Per Januari 2021",
    "Tentukan total persentase pengguna internet dari kelompok umur 35 sampai 44 tahun",
    "Urutkan banyaknya pengguna internet dari yang paling rendah ke yang paling tinggi",
  ],
  ketukan: [
    k(
      "Nomor 3, pengguna internet menurut kelompok umur, dalam diagram batang laki-laki dan perempuan. Kelompok 25 sampai 34 tahun: laki-laki 19,30 persen, perempuan 14,80 persen.",
      tambah(0, teks("jud", 150, 11, "Uji Kompetensi 3: pengguna internet, Januari 2021", 7.6, W.ungu)),
      tambah("internet", ...sumbuH("gi", GI), ...legenda("lg", 90, 16, "Laki-laki", "Perempuan", 62), teks("xp", 156, 188, "Persentase pengguna internet", 7.2)),
      tambah("diagram", ...USIA.flatMap(([u, a, b, ta, tb], i) => batangGandaH(`i${i}`, GI, i, 7, a, b, u, { teksA: ta, teksB: tb }))),
      sorotkan("Kelompok@2", "i2a-k", "i2b-k"),
    ),
    k(
      "Pernyataan pertama salah, sebab tertinggi adalah laki-laki 25 sampai 34 tahun. Kedua benar. Ketiga salah, sebab 19,30 hanya laki-laki, total tertinggi 34,10. Keempat benar, 15,90 tambah 14,80 yaitu 30,70.",
      bersih(0),
      tambah(0, teks("jud", 150, 14, "Benar atau salah?", 10, W.ungu)),
      tambah("pertama", ...kartu("p1", 10, 24, 250, 34, W.mawar, ["tertinggi: laki-laki 25-34, bukan perempuan"], 8)),
      tambah("pertama", emo("m1", 278, 46, "❌", 15)),
      tambah("Kedua", ...kartu("p2", 10, 64, 250, 34, W.mint, ["terendah: perempuan 55-64"], 8)),
      tambah("Kedua", emo("m2", 278, 86, "✅", 15)),
      tambah("Ketiga", ...kartu("p3", 10, 104, 250, 34, W.mawar, ["tertinggi total 34,10, bukan 19,30"], 8)),
      tambah("Ketiga", emo("m3", 278, 126, "❌", 15)),
      tambah("Keempat", ...kartu("p4", 10, 144, 250, 34, W.mint, ["18-24: 15,90 + 14,80 = 30,70"], 8)),
      tambah("Keempat", emo("m4", 278, 166, "✅", 15)),
    ),
    k(
      "Soal b, kelompok 35 sampai 44 tahun: 7,40 tambah 5,70, yaitu 13,10 persen. Soal d, selisih kelompok 18 sampai 24 dan 25 sampai 34 adalah 34,10 kurang 30,70, yaitu 3,40 persen.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Soal b dan d", 11, W.ungu)),
      tambah("Soal", ...kartu("b1", 16, 32, 268, 46, W.krem, ["kelompok 35-44", "7,40 + 5,70 = 13,10 persen"], 9.4)),
      tambah("selisih", ...kartu("b2", 16, 90, 268, 50, W.mint, ["selisih 18-24 dan 25-34", "34,10 - 30,70 = 3,40 persen"], 9.4)),
    ),
    k(
      "Urutan dari yang paling rendah: 55 sampai 64 tahun, 65 tahun ke atas, 45 sampai 54, 13 sampai 17, 35 sampai 44, 18 sampai 24, dan terakhir 25 sampai 34 tahun.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Urutan total, rendah ke tinggi", 10, W.ungu)),
      ...[
        ["55-64", "1,70", "55"],
        ["65 ke atas", "2,40", "65"],
        ["45-54", "5,60", "45"],
        ["13-17", "12,50", "13"],
        ["35-44", "13,10", "35"],
        ["18-24", "30,70", "18"],
        ["25-34", "34,10", "terakhir"],
      ].map(([u, tot, kunci], i) => tambah(kunci, ...kartu(`o${i}`, 60, 24 + i * 24, 180, 20, i === 6 ? W.mint : W.langit, [`${i + 1}. ${u}: ${tot}`], 8.4))),
    ),
    k(
      "Pengayaan Buku Panduan Guru: menu sehari untuk anak 10 sampai 12 tahun. Contoh menunya 1.493 kilokalori, di bawah batas 2.050, jadi camilan masih boleh sampai 557.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Pengayaan: menu anak 10-12 tahun", 9.6, W.ungu)),
      tambah("menu", ...kartu("m1", 10, 30, 88, 40, W.krem, ["sarapan", "580"], 8.6), ...kartu("m2", 106, 30, 88, 40, W.mint, ["makan siang", "434"], 8.6), ...kartu("m3", 202, 30, 88, 40, W.mawar, ["makan malam", "479"], 8.6)),
      tambah("1.493", teks("mj", 150, 98, "580 + 434 + 479 = 1.493", 11, W.ungu)),
      tambah("2.050,", teks("mb", 150, 124, "batas: 2.050", 9, W.biru)),
      tambah("557.", teks("ms", 150, 150, "2.050 - 1.493 = 557", 12, W.hijau), emo("ok", 150, 184, "🍽️", 18)),
    ),
  ],
};
