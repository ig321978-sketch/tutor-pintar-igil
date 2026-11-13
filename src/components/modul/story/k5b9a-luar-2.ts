import type { AdeganStory } from "./logika-story";
import { W, bacaanDua, digit, judul, kartu, kotak, panah, tabelNilai, teks } from "./k5b9a-gambar";
import { bersih, k, tambah, ubah, warnai } from "./k5b9a-bantu";

/* ------------------------------ LA3. Digit-Place Value Link: konsep ------------------------------ */
const NILAI_TEMPAT = ["100.000", "10.000", "1.000", "100", "10", "1"];

export const ADEGAN_LUAR_NILAI: AdeganStory = {
  id: "luar-nilai",
  judul: "Digit-Place Value Link: konsep",
  sumber: "Metode luar 3: mengaitkan angka dengan nilai tempatnya",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Metode ketiga, Digit-Place Value Link. Nilai sebuah angka bergantung pada angkanya dan juga kolom tempatnya.",
      tambah(0, judul("Digit-Place Value Link")),
      tambah("angka", ...kartu("d1", 16, 50, 76, 56, W.krem, ["angka", "9"], 12)),
      tambah("kolom", ...kartu("d2", 108, 50, 76, 56, W.langit, ["kolom", "ribuan"], 12)),
      tambah("tempatnya.", panah("d3", 188, 78, 14, 0, W.hijau, 3, { gambar: true }), ...kartu("d4", 206, 50, 80, 56, "#DCFCE7", ["nilai", "9.000"], 12)),
    ),
    k(
      "Setiap kolom punya nilai tempat: satuan satu, puluhan sepuluh, ratusan seratus, ribuan seribu, puluh ribuan sepuluh ribu, ratus ribuan seratus ribu.",
      bersih(0),
      tambah(0, judul("nilai tempat tiap kolom")),
      tambah(0, ...tabelNilai("v", 12, 50, 46)),
      ...NILAI_TEMPAT.map((n, i) => tambah([20, 16, 12, 10, 8, 6][i], teks(`nt${i}`, 35 + i * 46, 128, n, 8.4, W.merah))),
    ),
    k(
      "Rumusnya: nilai angka sama dengan angka itu dikali nilai tempat kolomnya. Contohnya angka sembilan di kolom ribuan bernilai sembilan kali seribu.",
      bersih(0),
      tambah(0, judul("rumus nilai angka")),
      tambah("Rumusnya:", ...kartu("rm", 20, 40, 260, 36, W.krem, ["nilai angka = angka × nilai tempat"], 10.4)),
      tambah("Contohnya", teks("cn", 150, 126, "9 × 1.000 = 9.000", 22, W.merah)),
      tambah("seribu.", teks("cm", 150, 158, "sembilan di ribuan bernilai 9.000", 9.6, W.hijau)),
    ),
    k(
      "Jadi angka yang sama bisa bernilai berbeda. Sembilan di ratus ribuan bernilai sembilan ratus ribu, sedangkan sembilan di satuan hanya bernilai sembilan.",
      bersih(0),
      tambah(0, judul("angka sama, nilai beda")),
      tambah("ratus", teks("e1", 150, 76, "9 × 100.000 = 900.000", 18, W.merah)),
      tambah("sedangkan", teks("e2", 150, 124, "9 × 1 = 9", 18, W.hijau)),
      tambah("sembilan@4", teks("e3", 150, 170, "angka sama, tempat beda", 10.4, W.ungu)),
    ),
  ],
};

/* ------------------------------ LA3T. Digit-Place Value Link: penerapan ------------------------------ */
export const ADEGAN_LUAR_NILAI_TERAPAN: AdeganStory = {
  id: "luar-nilai-terapan",
  judul: "Digit-Place Value Link: penerapan pada angka sembilan",
  sumber: "Metode luar 3: penerapan pada Ayo Berlatih nomor 3 dan batas satu juta",
  latar: "#FAF5FF",
  ketukan: [
    k(
      "Terapkan pada harga headset, 159.899. Angka sembilan muncul tiga kali, tetapi di kolom yang berbeda.",
      tambah(0, judul("harga headset")),
      tambah(0, teks("no", 150, 48, "159.899", 22), ...tabelNilai("w", 12, 56, 46)),
      tambah(0, ...["1", "5", "9", "8", "9", "9"].map((ch, c) => digit("w", 12, 56, 46, 0, c, ch, 17))),
      warnai("tiga", W.merah, "w-d2", "w-d4", "w-d5"),
    ),
    k(
      "Sembilan di kolom ribuan bernilai sembilan kali seribu, yaitu sembilan ribu.",
      tambah("Sembilan", panah("p2", 127, 112, 0, 12, W.merah, 2, { gambar: true })),
      tambah("seribu,", teks("n2", 127, 140, "9 × 1.000 = 9.000", 10, W.merah)),
    ),
    k(
      "Sembilan di kolom puluhan bernilai sembilan puluh, dan sembilan di satuan hanya bernilai sembilan.",
      tambah("puluhan", teks("n4", 150, 164, "9 × 10 = 90", 10, W.merah)),
      tambah("satuan", teks("n5", 150, 184, "9 × 1 = 9", 10, W.merah)),
    ),
    k(
      "Sekarang batas bab. Semua kolom berisi sembilan, yaitu 999.999. Kalau ditambah satu, semua kolom menjadi nol dan muncul angka satu di kolom jutaan.",
      bersih(0),
      tambah(0, judul("batas satu juta")),
      tambah(0, ...tabelNilai("j", 52, 74, 40, 0, 5, 30)),
      tambah(0, kotak("jh", 12, 74, 40, 24, W.merahMuda, W.biru, { rx: 0, tebal: 1 }), teks("jht", 32, 89, "Jutaan", 6.4), kotak("jc", 12, 98, 40, 30, W.putih, W.biru, { rx: 0, tebal: 1 })),
      tambah(0, ...["9", "9", "9", "9", "9", "9"].map((ch, c) => digit("j", 52, 74, 40, 0, c, ch, 15))),
      tambah("ditambah", teks("pl", 150, 50, "999.999 + 1", 16, W.merah)),
      ...[0, 1, 2, 3, 4, 5].map((c) => ubah("menjadi", { id: `j-d${c}`, isi: "0", warna: W.merah })),
      tambah("jutaan.", teks("ju", 32, 118, "1", 15, W.merah), teks("jb", 150, 164, "1.000.000", 20, W.ungu)),
    ),
  ],
};

/* ------------------------------ LA4. Three-Digit Group Chunking: konsep ------------------------------ */
export const ADEGAN_LUAR_KELOMPOK: AdeganStory = {
  id: "luar-kelompok",
  judul: "Three-Digit Group Chunking: konsep",
  sumber: "Metode luar 4: memotong bilangan menjadi kelompok tiga angka",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Metode keempat, Three-Digit Group Chunking: memotong bilangan menjadi kelompok yang masing-masing terdiri dari tiga angka.",
      tambah(0, judul("Three-Digit Group Chunking")),
      tambah("bilangan", teks("no", 150, 100, "875428", 34)),
      ubah("kelompok", { id: "no", isi: "875  428" }),
      tambah("kelompok", teks("t1", 102, 130, "tiga angka", 9.4, W.biru), teks("t2", 198, 130, "tiga angka", 9.4, W.hijau)),
    ),
    k(
      "Langkah satu, mulai memotong dari kanan, bukan dari kiri. Hitung tiga angka dari kanan, lalu beri titik.",
      bersih(0),
      tambah(0, judul("langkah 1: potong dari kanan")),
      tambah(0, teks("no", 150, 84, "875428", 34)),
      tambah("kanan,", panah("pk", 214, 110, -110, 0, W.hijau, 3, { gambar: true })),
      tambah("Hitung", teks("ht", 150, 140, "hitung tiga angka dari kanan", 10.4, W.hijau)),
      ubah("titik.", { id: "no", isi: "875.428" }),
      tambah("titik.", teks("tt", 150, 168, "lalu beri titik", 10.4, W.merah)),
    ),
    k(
      "Langkah dua, kalau masih ada angka di kiri, potong lagi tiga angka berikutnya. Contohnya satu juta, 1000000, menjadi 1.000.000.",
      bersih(0),
      tambah(0, judul("langkah 2: potong lagi")),
      tambah(0, teks("no", 150, 92, "1000000", 30)),
      tambah("kiri,", teks("lk", 150, 168, "masih ada angka di kiri", 10.4, W.merah)),
      ubah("menjadi", { id: "no", isi: "1.000.000" }),
      tambah("menjadi", teks("lj", 100, 122, "jutaan", 9.4, W.merah), teks("lr", 150, 122, "ribuan", 9.4, W.biru), teks("ls", 200, 122, "satuan", 9.4, W.hijau)),
    ),
    k(
      "Langkah tiga, kelompok paling kiri boleh hanya satu atau dua angka, tetapi kelompok lainnya selalu tepat tiga angka.",
      bersih(0),
      tambah(0, judul("kelompok kiri boleh pendek")),
      tambah("dua", teks("a1", 150, 76, "98.765", 28), teks("a1t", 150, 98, "kiri hanya dua angka", 10, W.merah)),
      tambah("satu", teks("a2", 150, 142, "1.000.000", 28), teks("a2t", 150, 164, "kiri hanya satu angka", 10, W.merah)),
      tambah("tepat", teks("a3", 150, 192, "kelompok lain selalu tiga angka", 9.6, W.hijau)),
    ),
    k(
      "Langkah empat, baca tiap kelompok seperti bilangan tiga angka, lalu ucapkan nama kelompoknya: ribu atau juta.",
      bersih(0),
      tambah(0, judul("langkah 4: baca tiap kelompok")),
      tambah("baca", ...kartu("b1", 14, 48, 272, 44, W.langit, ["baca seperti bilangan tiga angka"], 10.4)),
      tambah("ucapkan", panah("ba", 150, 94, 0, 16, W.hijau, 2.4, { gambar: true }), ...kartu("b2", 14, 114, 272, 44, W.krem, ["lalu ucapkan nama kelompok"], 10.4)),
      tambah("ribu", teks("b3", 100, 184, "ribu", 14, W.merah), teks("b4", 200, 184, "juta", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ LA4T. Three-Digit Group Chunking: penerapan ------------------------------ */
export const ADEGAN_LUAR_KELOMPOK_TERAPAN: AdeganStory = {
  id: "luar-kelompok-terapan",
  judul: "Three-Digit Group Chunking: penerapan pada Gianyar dan pembuka bab",
  sumber: "Metode luar 4: penerapan pada Eksplorasi 9.1B dan pembuka bab",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada Gianyar, 963000 tanpa titik. Dari kanan potong tiga angka, yaitu 000, lalu sisanya 963. Hasilnya 963.000.",
      tambah(0, judul("penduduk Gianyar")),
      tambah(2, teks("no", 150, 70, "963000", 34)),
      tambah(12, ...kartu("gr", 144, 92, 70, 28, W.krem, ["000"], 13)),
      tambah(15, ...kartu("gl", 86, 92, 56, 28, W.langit, ["963"], 13)),
      ubah(17, { id: "no", isi: "963.000" }),
    ),
    k(
      "Kelompok kanan 000 semuanya nol, jadi tidak dibaca. Kelompok kiri 963 dibaca sembilan ratus enam puluh tiga, lalu ribu.",
      tambah("dibaca@2", teks("rk", 150, 140, "kiri 963: sembilan ratus enam puluh tiga ribu", 9, W.biru)),
      tambah("tidak", teks("rn", 150, 160, "kanan 000: tidak dibaca", 9.6, W.merah)),
    ),
    k(
      "Sekarang 720736 dari pembuka bab. Dipotong dari kanan menjadi 720 dan 736, ditulis 720.736.",
      bersih(0),
      tambah(0, judul("bilangan pembuka bab")),
      tambah(0, teks("no", 150, 72, "720736", 34)),
      tambah(9, ...kartu("pl", 86, 94, 56, 28, W.langit, ["720"], 13)),
      tambah(11, ...kartu("pr", 144, 94, 70, 28, W.krem, ["736"], 13)),
      ubah(13, { id: "no", isi: "720.736" }),
    ),
    k(
      "Bacaannya tujuh ratus dua puluh ribu tujuh ratus tiga puluh enam. Nol di ujung kelompok 720 tidak disebut.",
      tambah("tujuh", ...bacaanDua("bq", 150, 132, "tujuh ratus dua puluh ribu", "tujuh ratus tiga puluh enam").slice(0, 2)),
      tambah("tujuh@2", ...bacaanDua("bq", 150, 132, "tujuh ratus dua puluh ribu", "tujuh ratus tiga puluh enam").slice(2)),
      tambah("Nol", teks("nn", 150, 184, "nol di ujung 720 tidak disebut", 9.6, W.merah)),
    ),
    k(
      "Awas kesalahan titik: 96.3000 salah, sebab kelompok kanan harus tepat tiga angka. Potong dari kanan, bukan dari kiri.",
      bersih(0),
      tambah(0, judul("awas salah titik")),
      tambah("96.3000", ...kartu("sl", 14, 50, 128, 50, W.merahMuda, ["96.3000  ✗"], 14)),
      tambah("sebab", ...kartu("bn", 158, 50, 128, 50, "#DCFCE7", ["963.000  ✓"], 14)),
      tambah("Potong", teks("sp", 150, 140, "potong dari kanan, bukan dari kiri", 10.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ LA5. Ringkasan metode luar Subbab A ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar Subbab A",
  sumber: "Ringkasan metode luar Subbab A",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Ringkasan. Place Value Chart Protocol: isi tabel dari kanan ke kiri, nol wajib ditulis, lalu cek dengan membaca ulang.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Place", ...kartu("s1", 8, 34, 138, 62, "#FDE68A", ["Place Value", "Chart Protocol", "isi dari kanan"], 8.6)),
    ),
    k(
      "Indonesian Number-Name Mapping: petakan tiap kelompok tiga angka ke nama, seratus bukan satu ratus, dan kolom nol dilewati.",
      tambah("Indonesian", ...kartu("s2", 154, 34, 138, 62, "#FBCFE8", ["Indonesian", "Number-Name Mapping", "angka ke nama"], 8.2)),
    ),
    k(
      "Digit-Place Value Link: nilai angka adalah angka dikali nilai tempat kolomnya. Three-Digit Group Chunking: potong dari kanan tiga angka, lalu beri titik.",
      tambah("Digit-Place", ...kartu("s3", 8, 104, 138, 62, "#BBF7D0", ["Digit-Place", "Value Link", "angka kali tempat"], 8.6)),
      tambah("Three-Digit", ...kartu("s4", 154, 104, 138, 62, "#BFDBFE", ["Three-Digit", "Group Chunking", "potong tiga angka"], 8.6)),
    ),
    k(
      "Keempat metode itu saling menguatkan dan semuanya menuju satu juta. Sampai jumpa di Subbab B tentang harga tiga pasang sepatu.",
      tambah("satu", ...kartu("sj", 60, 162, 180, 28, W.krem, ["sampai 1.000.000"], 11)),
      tambah("Subbab", teks("sbb", 150, 204, "berikutnya: Subbab B", 8.6, W.ungu)),
    ),
  ],
};
