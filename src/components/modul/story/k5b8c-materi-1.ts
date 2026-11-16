import type { AdeganStory } from "./logika-story";
import { W, barisTabel, batangV, emo, garis, kartu, kotak, sumbuV, tabel, teks, type GV } from "./k5b8c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b8c-bantu";
import { kutipanLokal } from "./kutipan-lokal";

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
  kutipan: kutipanLokal("k5b8c-materi-1.ts:1"),
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

/* ------------------------------ 2. Skala persegi panjang: menemukan panjang ------------------------------ */
const petak = (id: string, x: number, y: number, jumlah: number, ukuran: number, tinggi: number) => Array.from({ length: jumlah - 1 }, (_, i) => garis(`${id}${i}`, x + (i + 1) * ukuran, y, 0, tinggi, W.putih, 0.9));

export const ADEGAN_SKALA_83A: AdeganStory = {
  id: "skala-83a",
  judul: "Menemukan panjang dan skala",
  sumber: "Materi: menemukan panjang dan skala",
  latar: "#FFFBEB",
  kutipan: kutipanLokal("k5b8c-materi-1.ts:2"),
  ketukan: [
    k(
      "Latihan satu, ayo menemukan panjangnya. Panjang persegi panjang pertama sepuluh satuan, yang kedua harus dicari.",
      tambah(0, teks("jud", 150, 22, "Latihan 1", 12, W.ungu), teks("jud2", 150, 35, "Ayo Menemukan Panjangnya", 8.6, W.biru)),
      tambah("Panjang", teks("sa", 30, 64, "bagian a", 8, W.merah, { anchor: "start" })),
      tambah("pertama", kotak("a1", 40, 74, 50, 20, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("a1t", 65, 106, "10 satuan", 7.6)),
      tambah("kedua", kotak("a2", 110, 74, 90, 20, W.putih, W.merah, { rx: 1, tebal: 1.2, putus: true }), teks("a2t", 155, 106, "? satuan", 7.6, W.merah)),
    ),
    k(
      "Pada bagian a, sepuluh satuan sama dengan lima petak, jadi satu petak dua satuan. Sembilan petak berarti delapan belas satuan.",
      tambah("lima", ...petak("p1", 40, 74, 5, 10, 20)),
      tambah("dua", teks("nilai", 150, 134, "1 petak = 2 satuan", 9.6, W.ungu)),
      tambah("sembilan", ...petak("p2", 110, 74, 9, 10, 20)),
      ubah("sembilan", { id: "a2", warna: W.batang2, garis: W.biru, putus: false }),
      ubah("delapan", { id: "a2t", isi: "18 satuan", warna: W.hijau }),
    ),
    k(
      "Bagian b, sembilan puluh lima satuan sama dengan sembilan setengah petak, jadi satu petak sepuluh satuan. Empat petak berarti empat puluh satuan.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 1", 12, W.ungu), teks("sb", 30, 64, "bagian b", 8, W.merah, { anchor: "start" })),
      tambah("sembilan", kotak("b1", 30, 74, 95, 20, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("b1t", 77, 106, "95 satuan", 7.6)),
      tambah("setengah", ...petak("q1", 30, 74, 10, 10, 20)),
      tambah("sepuluh", teks("nilai", 150, 134, "1 petak = 10 satuan", 9.6, W.ungu)),
      tambah("Empat", kotak("b2", 150, 74, 40, 20, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("b2t", 170, 106, "40 satuan", 7.6, W.hijau)),
    ),
    k(
      "Bagian c, enam puluh empat satuan sama dengan delapan petak, jadi satu petak delapan satuan. Enam petak berarti empat puluh delapan satuan.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Latihan 1", 12, W.ungu), teks("sc", 30, 40, "bagian c", 8, W.merah, { anchor: "start" })),
      tambah("enam", kotak("c1", 80, 76, 34, 64, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("c1t", 97, 154, "64 satuan", 7.6)),
      tambah("delapan", ...Array.from({ length: 7 }, (_, i) => garis(`rh${i}`, 80, 84 + i * 8, 34, 0, W.putih, 0.9))),
      tambah("delapan@2", teks("nilai", 215, 100, "1 petak = 8 satuan", 9.6, W.ungu)),
      tambah("enam@2", kotak("c2", 170, 92, 34, 48, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("c2t", 187, 154, "48 satuan", 7.6, W.hijau)),
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
      "Latihan dua: panjang dua ratus satuan, gambarnya seratus dua puluh. Tinggi seratus empat puluh satuan, gambarnya delapan puluh. Gambarnya harus sebanding.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Menggambar sebanding", 12, W.ungu)),
      tambah("ratus@1", kotak("m1", 20, 50, 100, 18, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("m1t", 70, 82, "200 satuan", 7.6)),
      tambah("ratus@2", kotak("m2", 20, 94, 60, 18, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("m2t", 50, 126, "120 satuan", 7.6, W.hijau)),
      tambah("ratus@3", kotak("n1", 170, 70, 32, 70, W.batang, W.biru, { rx: 1, tebal: 1 }), teks("n1t", 186, 154, "140 satuan", 7.4)),
      tambah("delapan", kotak("n2", 220, 100, 32, 40, W.batang2, W.biru, { rx: 1, tebal: 1 }), teks("n2t", 236, 154, "80 satuan", 7.4, W.hijau)),
    ),
    k(
      "Jadi sebelum membuat diagram batang, tanyakan selalu: satu petak mewakili berapa satuan?",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Satu petak mewakili berapa satuan?", 10.5, W.ungu)),
      tambah("diagram", ...kartu("s1", 18, 50, 80, 50, W.langit, ["bagian a", "2 satuan"], 9)),
      tambah("petak", ...kartu("s2", 110, 50, 80, 50, W.mint, ["bagian b", "10 satuan"], 9)),
      tambah("berapa", ...kartu("s3", 202, 50, 80, 50, W.mawar, ["bagian c", "8 satuan"], 9)),
      tambah("satuan?", emo("tny", 150, 150, "🤔", 30)),
    ),
  ],
};

/* ------------------------------ 3. Diagram batang vertikal: medali emas Sea Games ------------------------------ */
const GS: GV = { x: 52, y: 158, w: 220, h: 104, maks: 80, langkah: 20 };

export const ADEGAN_VERTIKAL_83B: AdeganStory = {
  id: "vertikal-83b",
  judul: "Diagram batang vertikal medali emas",
  sumber: "Materi: diagram batang vertikal",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b8c-materi-1.ts:3"),
  ketukan: [
    k(
      "Sekarang kita belajar diagram batang vertikal. Igil bertanya, bagaimana cara cepat mengetahui data paling banyak dan paling sedikit?",
      tambah(0, teks("jud", 150, 26, "Diagram Batang Vertikal", 12, W.ungu), teks("jud2", 150, 41, "Cara cepat membaca data", 9.4, W.biru)),
      tambah("Igil", emo("tny", 150, 100, "🤔", 38)),
      tambah("cepat", teks("q", 150, 150, "Mana yang paling banyak dan paling sedikit?", 8.6, W.merah)),
    ),
    k(
      "Datanya medali emas Indonesia di Sea Games. Tahun dua ribu tiga belas ada enam puluh lima, dua ribu lima belas ada empat puluh tujuh, dan dua ribu tujuh belas ada tiga puluh delapan.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Medali Emas Indonesia di Sea Games", 9.6, W.ungu)),
      tambah("Datanya", ...tabel("tb", 50, 28, [100, 100], 20, [["Tahun", "Medali emas"]], 8)),
      tambah("ribu@1", ...barisTabel("tb1", 50, 48, [100, 100], 20, ["2013", "65"], 8)),
      tambah("ribu@2", ...barisTabel("tb2", 50, 68, [100, 100], 20, ["2015", "47"], 8)),
      tambah("ribu@3", ...barisTabel("tb3", 50, 88, [100, 100], 20, ["2017", "38"], 8)),
    ),
    k(
      "Lalu dua ribu sembilan belas ada tujuh puluh dua, dan dua ribu dua puluh satu ada enam puluh sembilan.",
      tambah("ribu@1", ...barisTabel("tb4", 50, 108, [100, 100], 20, ["2019", "72"], 8)),
      tambah("ribu@2", ...barisTabel("tb5", 50, 128, [100, 100], 20, ["2021", "69"], 8)),
      tambah("dua@3", teks("lm", 150, 168, "lima data", 9, W.hijau)),
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
      "Batang tahun dua ribu tiga belas setinggi enam puluh lima, sedikit di atas garis enam puluh. Berikutnya dua ribu lima belas setinggi empat puluh tujuh, dan dua ribu tujuh belas setinggi tiga puluh delapan.",
      tambah("ribu@1", ...batangV("sb0", GS, 0, 5, 65, W.batang, "2013")),
      tambah("ribu@2", ...batangV("sb1", GS, 1, 5, 47, W.batang, "2015")),
      tambah("ribu@3", ...batangV("sb2", GS, 2, 5, 38, W.batang, "2017")),
    ),
    k(
      "Lalu dua ribu sembilan belas setinggi tujuh puluh dua, dan dua ribu dua puluh satu setinggi enam puluh sembilan. Batang tertinggi tahun dua ribu sembilan belas, terpendek tahun dua ribu tujuh belas.",
      tambah("ribu@1", ...batangV("sb3", GS, 3, 5, 72, W.batang, "2019")),
      tambah("ribu@2", ...batangV("sb4", GS, 4, 5, 69, W.batang, "2021")),
      sorotkan("tertinggi", "sb3-k"),
      tambah("tertinggi", teks("tt", 150, 30, "tertinggi: 2019", 7.8, W.hijau)),
      sorotkan("terpendek", "sb2-k"),
      tambah("terpendek", teks("tr", 150, 41, "terendah: 2017", 7.8, W.merah)),
    ),
  ],
};
