import type { AdeganStory } from "./logika-story";
import { W, barisTabel, batangV, emo, garis, kartu, kotak, sumbuV, tabel, teks, type GV } from "./k5b8c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b8c-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab C dan pemanasan (hlm. 252; Buku Panduan Guru hlm. 364 sampai 365) ------------------------------ */
const GC: GV = { x: 40, y: 150, w: 230, h: 99, maks: 9, langkah: 1 };
const CARA: [string, number][] = [
  ["Jalan kaki", 6],
  ["Naik sepeda", 8],
  ["Angkutan umum", 4],
  ["Diantar orang tua", 6],
];

export const ADEGAN_PEMBUKA_C: AdeganStory = {
  id: "pembuka-c",
  judul: "Pembuka Sub-Bab C: diagram batang",
  sumber: "Buku Siswa hlm. 235, 252; Buku Panduan Guru hlm. 364–365",
  latar: "#F0F9FF",
  kutipan: [
    "C. Diagram Batang",
    "Eksplorasi 8.3A",
    "Ayo Menemukan Panjangnya",
    "menganalisis data dari piktogram dan diagram batang",
  ],
  ketukan: [
    k(
      "Sub-Bab C membahas diagram batang. Tinggi atau panjang batangnya menunjukkan banyaknya data.",
      tambah(0, teks("jud", 150, 26, "C. Diagram Batang", 14, W.ungu)),
      tambah("batang", ...[3, 5, 4].flatMap((n, i) => batangV(`mini${i}`, { x: 90, y: 150, w: 120, h: 90, maks: 6, langkah: 2 }, i, 3, n, [W.batang, W.batang2, W.emas][i], ["A", "B", "C"][i], { angka: false }))),
      tambah("tinggi", garis("mini-d", 90, 150, 120, 0, W.biru, 1.6)),
    ),
    k(
      "Pemanasan dari Buku Panduan Guru: delapan siswa naik sepeda, enam jalan kaki, enam diantar orang tua, dan empat naik angkutan umum.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Cara Berangkat ke Sekolah", 10.5, W.ungu), teks("jud2", 150, 33, "siswa kelas V SD Pancasila", 7.6, W.biru)),
      tambah("Delapan", ...tabel("tb", 45, 42, [130, 80], 20, [["Cara berangkat", "Siswa"]], 8)),
      tambah("sepeda,", ...barisTabel("tb1", 45, 62, [130, 80], 20, ["Naik sepeda", "8"], 8)),
      tambah("jalan", ...barisTabel("tb2", 45, 82, [130, 80], 20, ["Jalan kaki", "6"], 8)),
      tambah("diantar", ...barisTabel("tb3", 45, 102, [130, 80], 20, ["Diantar orang tua", "6"], 8)),
      tambah("angkutan", ...barisTabel("tb4", 45, 122, [130, 80], 20, ["Angkutan umum", "4"], 8)),
    ),
    k(
      "Mencari cara berangkat terbanyak lebih cepat lewat tabel atau diagram batang? Diagram batang, sebab cukup mencari batang yang paling tinggi.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Cara Berangkat ke Sekolah", 10.5, W.ungu)),
      tambah("tabel", ...sumbuV("cs", GC)),
      tambah("diagram", ...CARA.flatMap(([nama, n], i) => batangV(`cb${i}`, GC, i, 4, n, W.batang, nama))),
      sorotkan("tinggi.", "cb1-k"),
      tambah("tinggi.", teks("tg", 150, 36, "paling tinggi: naik sepeda", 8, W.merah)),
    ),
    k(
      "Tujuan Sub-Bab C ada lima: membuat diagram batang tegak, mendatar, dan ganda, lalu membaca dan menganalisis data dari diagram batang.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Tujuan Sub-Bab C", 12, W.ungu)),
      tambah("tegak,", ...kartu("t1", 24, 30, 252, 26, W.langit, ["membuat diagram batang tegak"], 8.6)),
      tambah("mendatar,", ...kartu("t2", 24, 60, 252, 26, W.mint, ["membuat diagram batang mendatar"], 8.6)),
      tambah("ganda,", ...kartu("t3", 24, 90, 252, 26, W.mawar, ["membuat diagram batang ganda"], 8.6)),
      tambah("membaca", ...kartu("t4", 24, 120, 252, 26, W.krem, ["membaca data dari diagram batang"], 8.6)),
      tambah("menganalisis", ...kartu("t5", 24, 150, 252, 26, W.jeruk, ["menganalisis data dari diagram batang"], 8.6)),
    ),
    k(
      "Alat yang disiapkan adalah alat tulis, penggaris, dan kertas berpetak. Kertas berpetak membantu kita menentukan skala dengan tepat.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Alat yang disiapkan", 12, W.ungu)),
      tambah("tulis,", ...kartu("a1", 18, 44, 80, 50, W.krem, ["Alat tulis"], 8.6), emo("e1", 58, 118, "✏️", 22)),
      tambah("penggaris,", ...kartu("a2", 110, 44, 80, 50, W.mint, ["Penggaris"], 8.6), emo("e2", 150, 118, "📏", 22)),
      tambah("berpetak.", ...kartu("a3", 202, 44, 80, 50, W.langit, ["Kertas", "berpetak"], 8.6), kotak("kp", 214, 106, 56, 40, W.putih, W.biru, { rx: 0, tebal: 1 })),
      tambah("tepat.", ...[1, 2, 3, 4, 5, 6].map((i) => garis(`kv${i}`, 214 + i * 8, 106, 0, 40, W.abu, 0.8)), ...[1, 2, 3, 4].map((i) => garis(`kh${i}`, 214, 106 + i * 8, 56, 0, W.abu, 0.8))),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 8.3A: skala persegi panjang (hlm. 252 sampai 253; Buku Panduan Guru hlm. 365 sampai 367) ------------------------------ */
const petak = (id: string, x: number, y: number, jumlah: number, ukuran: number, tinggi: number) => Array.from({ length: jumlah - 1 }, (_, i) => garis(`${id}${i}`, x + (i + 1) * ukuran, y, 0, tinggi, W.putih, 0.9));

export const ADEGAN_SKALA_83A: AdeganStory = {
  id: "skala-83a",
  judul: "Eksplorasi 8.3A: menemukan panjang dan skala",
  sumber: "Buku Siswa hlm. 252–253; Buku Panduan Guru hlm. 365–367",
  latar: "#FFFBEB",
  kutipan: [
    "Eksplorasi 8.3A",
    "Ayo Menemukan Panjangnya",
    "tentukan panjang persegi panjang yang diminta",
    "ketinggian persegi panjang pada diagram batang harus dibuat dengan tepat",
    "gambarlah persegi panjang dengan panjang 120 satuan",
  ],
  ketukan: [
    k(
      "Eksplorasi 8.3A, Ayo Menemukan Panjangnya. Panjang persegi panjang pertama diketahui, yang kedua harus dicari.",
      tambah(0, teks("jud", 150, 22, "Eksplorasi 8.3A", 12, W.ungu), teks("jud2", 150, 35, "Ayo Menemukan Panjangnya", 8.6, W.biru)),
      tambah("Panjang", teks("sa", 30, 64, "soal a", 8, W.merah, { anchor: "start" })),
      tambah("pertama", kotak("a1", 40, 74, 50, 20, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("a1t", 65, 106, "10 satuan", 7.6)),
      tambah("kedua", kotak("a2", 110, 74, 90, 20, W.putih, W.merah, { rx: 1, tebal: 1.2, putus: true }), teks("a2t", 155, 106, "? satuan", 7.6, W.merah)),
    ),
    k(
      "Pada soal a, sepuluh satuan sama dengan lima petak, jadi satu petak dua satuan. Sembilan petak berarti delapan belas satuan.",
      tambah("lima", ...petak("p1", 40, 74, 5, 10, 20)),
      tambah("dua", teks("nilai", 150, 134, "1 petak = 2 satuan", 9.6, W.ungu)),
      tambah("sembilan", ...petak("p2", 110, 74, 9, 10, 20)),
      ubah("sembilan", { id: "a2", warna: W.batang2, garis: W.biru, putus: false }),
      ubah("delapan", { id: "a2t", isi: "18 satuan", warna: W.hijau }),
    ),
    k(
      "Soal b, 95 satuan sama dengan sembilan setengah petak, jadi satu petak sepuluh satuan. Empat petak berarti 40 satuan.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Eksplorasi 8.3A", 12, W.ungu), teks("sb", 30, 64, "soal b", 8, W.merah, { anchor: "start" })),
      tambah("95", kotak("b1", 30, 74, 95, 20, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("b1t", 77, 106, "95 satuan", 7.6)),
      tambah("setengah", ...petak("q1", 30, 74, 10, 10, 20)),
      tambah("sepuluh", teks("nilai", 150, 134, "1 petak = 10 satuan", 9.6, W.ungu)),
      tambah("empat", kotak("b2", 150, 74, 40, 20, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("b2t", 170, 106, "40 satuan", 7.6, W.hijau)),
    ),
    k(
      "Soal c, 64 satuan sama dengan delapan petak, jadi satu petak delapan satuan. Enam petak berarti 48 satuan.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Eksplorasi 8.3A", 12, W.ungu), teks("sc", 30, 40, "soal c", 8, W.merah, { anchor: "start" })),
      tambah("64", kotak("c1", 80, 76, 34, 64, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("c1t", 97, 154, "64 satuan", 7.6)),
      tambah("delapan", ...Array.from({ length: 7 }, (_, i) => garis(`rh${i}`, 80, 84 + i * 8, 34, 0, W.putih, 0.9))),
      tambah("delapan@2", teks("nilai", 215, 100, "1 petak = 8 satuan", 9.6, W.ungu)),
      tambah("enam", kotak("c2", 170, 92, 34, 48, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("c2t", 187, 154, "48 satuan", 7.6, W.hijau)),
    ),
    k(
      "Tinggi batang harus tepat. Kalau sembarang, diagram menunjukkan nilai yang salah, sebab skala yang salah membuat diagram bermakna lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tinggi batang harus tepat", 11, W.ungu)),
      tambah("tepat?", kotak("w1", 60, 70, 40, 64, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("w1t", 80, 148, "64 satuan", 7.6), emo("w1e", 80, 62, "✅", 14)),
      tambah("sembarang,", kotak("w2", 180, 94, 40, 40, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("w2t", 200, 148, "ditulis 64?", 7.6, W.merah), emo("w2e", 200, 86, "❌", 14)),
      tambah("skala", teks("sk", 150, 176, "skala salah, arti diagram berubah", 8.4, W.merah)),
    ),
    k(
      "Soal kedua: panjang 200 satuan, gambar panjang 120 satuan. Tinggi 140 satuan, gambar tinggi 80 satuan. Gambarnya harus sebanding.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Menggambar sebanding", 12, W.ungu)),
      tambah("200", kotak("m1", 20, 50, 100, 18, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("m1t", 70, 82, "200 satuan", 7.6)),
      tambah("120", kotak("m2", 20, 94, 60, 18, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("m2t", 50, 126, "120 satuan", 7.6, W.hijau)),
      tambah("140", kotak("n1", 170, 70, 32, 70, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("n1t", 186, 154, "140 satuan", 7.4)),
      tambah("80", kotak("n2", 220, 100, 32, 40, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("n2t", 236, 154, "80 satuan", 7.4, W.hijau)),
    ),
    k(
      "Jadi sebelum membuat diagram batang, tanyakan selalu: satu petak mewakili berapa satuan?",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Satu petak mewakili berapa satuan?", 10.5, W.ungu)),
      tambah("diagram", ...kartu("s1", 18, 50, 80, 50, W.langit, ["soal a", "2 satuan"], 9)),
      tambah("petak", ...kartu("s2", 110, 50, 80, 50, W.mint, ["soal b", "10 satuan"], 9)),
      tambah("berapa", ...kartu("s3", 202, 50, 80, 50, W.mawar, ["soal c", "8 satuan"], 9)),
      tambah("satuan?", emo("tny", 150, 150, "🤔", 30)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 8.3B: diagram batang vertikal Sea Games (hlm. 254 sampai 255; Buku Panduan Guru hlm. 367 sampai 369) ------------------------------ */
const GS: GV = { x: 52, y: 158, w: 220, h: 104, maks: 80, langkah: 20 };

export const ADEGAN_VERTIKAL_83B: AdeganStory = {
  id: "vertikal-83b",
  judul: "Eksplorasi 8.3B: diagram batang vertikal medali emas",
  sumber: "Buku Siswa hlm. 254–255; Buku Panduan Guru hlm. 367–369",
  latar: "#F0FDF4",
  kutipan: [
    "Eksplorasi 8.3B",
    "Bagaimana cara mengetahui dengan cepat data yang paling banyak dan paling sedikit",
    "Perolehan Medali Emas Indonesia di Ajang Sea Games",
    "dilaksanakan setiap 2 tahun sekali",
  ],
  ketukan: [
    k(
      "Eksplorasi 8.3B, diagram batang vertikal. Komang bertanya, bagaimana cepat mengetahui data paling banyak dan paling sedikit?",
      tambah(0, teks("jud", 150, 26, "Eksplorasi 8.3B", 13, W.ungu), teks("jud2", 150, 41, "Diagram Batang Vertikal", 9.4, W.biru)),
      tambah("Komang", emo("tny", 150, 100, "🤔", 38)),
      tambah("cepat", teks("q", 150, 150, "Mana yang paling banyak dan paling sedikit?", 8.6, W.merah)),
    ),
    k(
      "Datanya medali emas Indonesia di Sea Games: 2013 ada 65, 2015 ada 47, 2017 ada 38, 2019 ada 72, dan 2021 ada 69.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Medali Emas Indonesia di Sea Games", 9.6, W.ungu)),
      tambah("Datanya", ...tabel("tb", 50, 28, [100, 100], 20, [["Tahun", "Medali emas"]], 8)),
      tambah("2013", ...barisTabel("tb1", 50, 48, [100, 100], 20, ["2013", "65"], 8)),
      tambah("2015", ...barisTabel("tb2", 50, 68, [100, 100], 20, ["2015", "47"], 8)),
      tambah("2017", ...barisTabel("tb3", 50, 88, [100, 100], 20, ["2017", "38"], 8)),
      tambah("2019", ...barisTabel("tb4", 50, 108, [100, 100], 20, ["2019", "72"], 8)),
      tambah("2021", ...barisTabel("tb5", 50, 128, [100, 100], 20, ["2021", "69"], 8)),
    ),
    k(
      "Sea Games diadakan setiap 2 tahun. Edisi 2021 baru terlaksana tahun 2022 karena pandemi.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tentang Sea Games", 12, W.ungu)),
      tambah("setiap", ...kartu("s1", 40, 44, 220, 36, W.langit, ["Diadakan setiap 2 tahun"], 9.4)),
      tambah("2021", ...kartu("s2", 40, 90, 220, 36, W.mint, ["Edisi 2021 di Hanoi, Vietnam"], 9.4)),
      tambah("2022", ...kartu("s3", 40, 136, 220, 36, W.krem, ["Terlaksana pada tahun 2022"], 9.4)),
    ),
    k(
      "Sumbu mendatar berisi tahun, sumbu tegak berisi medali emas dengan skala nol sampai delapan puluh, tiap langkah dua puluh.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Perolehan Medali Emas Indonesia", 9.6, W.ungu)),
      tambah("mendatar", ...sumbuV("sg", GS)),
      tambah("tahun,", teks("xt", 162, 182, "Tahun pelaksanaan", 7.4, W.biru)),
      tambah("tegak", teks("yt", 20, 80, "Medali", 6.6, W.biru), teks("yt2", 20, 89, "emas", 6.6, W.biru)),
    ),
    k(
      "Batang tahun 2013 setinggi 65, sedikit di atas garis enam puluh. Berikutnya 2015 setinggi 47, dan 2017 setinggi 38.",
      tambah("2013", ...batangV("sb0", GS, 0, 5, 65, W.batang, "2013")),
      tambah("2015", ...batangV("sb1", GS, 1, 5, 47, W.batang, "2015")),
      tambah("2017", ...batangV("sb2", GS, 2, 5, 38, W.batang, "2017")),
    ),
    k(
      "Lalu 2019 setinggi 72 dan 2021 setinggi 69. Batang paling tinggi tahun 2019, paling pendek tahun 2017. Tanpa membaca angka, kita langsung tahu.",
      tambah("2019", ...batangV("sb3", GS, 3, 5, 72, W.batang, "2019")),
      tambah("2021", ...batangV("sb4", GS, 4, 5, 69, W.batang, "2021")),
      sorotkan("tinggi@3", "sb3-k"),
      tambah("tinggi@3", teks("tt", 150, 30, "tertinggi: 2019", 7.8, W.hijau)),
      sorotkan("pendek", "sb2-k"),
      tambah("pendek", teks("tr", 150, 41, "terendah: 2017", 7.8, W.merah)),
    ),
  ],
};
