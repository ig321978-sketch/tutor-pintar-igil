import type { AdeganStory } from "./logika-story";
import { W, apem, barisApem, barisTomat, emo, kartu, kartuMetode, panah, teks } from "./k5b8b-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b8b-bantu";

/* ------------------------------ LB5. Pictograph Error Hunt: konsep ------------------------------ */
export const ADEGAN_LUAR_CARI: AdeganStory = {
  id: "luarb-cari",
  judul: "Pictograph Error Hunt: berburu kesalahan dengan daftar periksa",
  sumber: "Metode luar; daftar periksa piktogram",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Pictograph Error Hunt artinya berburu kesalahan. Sebelum percaya pada sebuah piktogram, kita memeriksanya dengan daftar periksa.",
      tambah(0, teks("jud", 150, 24, "Pictograph Error Hunt", 12, W.ungu)),
      tambah("kesalahan.", emo("lp", 150, 96, "🔍", 44)),
      tambah("daftar", teks("dp", 150, 140, "periksa dulu, baru percaya", 11, W.hijau)),
    ),
    k(
      "Periksa empat hal: ada judul, ada kunci, ukuran gambar sama, dan setiap baris cocok dengan data.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Daftar periksa piktogram", 12, W.ungu)),
      tambah("judul,", kartu("d1", 40, 38, 220, 28, W.hijauMuda, ["ada judul"], 9.6)),
      tambah("kunci,", kartu("d2", 40, 72, 220, 28, W.muda, ["ada kunci"], 9.6)),
      tambah("ukuran", kartu("d3", 40, 106, 220, 28, W.krem, ["ukuran gambar sama"], 9.6)),
      tambah("baris", kartu("d4", 40, 140, 220, 28, W.merahMuda, ["setiap baris cocok dengan data"], 9.2)),
    ),
    k(
      "Cara memeriksa baris: kalikan banyak gambar utuh dengan kunci, tambahkan nilai potongan, lalu bandingkan dengan data tabel.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Memeriksa satu baris", 12, W.ungu)),
      tambah("kalikan", kartu("f1", 40, 44, 220, 30, W.hijauMuda, ["gambar utuh x kunci"], 10)),
      tambah("tambahkan", kartu("f2", 40, 84, 220, 30, W.muda, ["+ nilai potongan"], 10)),
      tambah("bandingkan", kartu("f3", 40, 124, 220, 30, W.krem, ["harus sama dengan data tabel"], 9.4)),
    ),
    k(
      "Kalau hasilnya tidak sama, selisihnya menunjukkan gambar yang kurang atau berlebih. Jangan menebak dari bentuk gambar, hitung saja.",
      tambah("tidak", teks("g1", 150, 176, "tidak sama: ada gambar yang salah", 10, W.merah)),
      tambah("hitung", teks("g2", 150, 194, "hitung, jangan menebak", 10.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB6. Pictograph Error Hunt: penerapan pada hari Senin dan Kamis ------------------------------ */
export const ADEGAN_LUAR_CARI_TERAPAN: AdeganStory = {
  id: "luarb-cari-terapan",
  judul: "Memeriksa piktogram apem: Senin cocok, Kamis kurang",
  sumber: "Metode luar; piktogram apem Buku Siswa hlm. 250 dan Buku Panduan Guru hlm. 360",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Kita periksa piktogram apem. Senin: 10 gambar utuh dikali 4 sama dengan 40, sama dengan tabel, jadi cocok.",
      tambah(0, teks("jud", 150, 20, "Periksa piktogram apem", 12, W.ungu)),
      tambah("Senin:", barisApem("sn", 46, "Senin", 40)),
      tambah("dikali", teks("sc", 150, 68, "10 x 4 = 40: cocok", 10.4, W.hijau)),
    ),
    k(
      "Kamis: 9 gambar utuh dikali 4 sama dengan 36, padahal tabel mencatat 37. Hasilnya tidak sama.",
      tambah("Kamis:", barisApem("km", 96, "Kamis", 36)),
      tambah("dikali", teks("kc", 150, 118, "9 x 4 = 36, tabel 37: tidak sama", 10, W.merah)),
    ),
    k(
      "Selisihnya 37 dikurangi 36 sama dengan 1, berarti kurang seperempat gambar. Setelah ditambah, baris Kamis cocok.",
      tambah("Selisihnya", teks("ks", 150, 146, "37 - 36 = 1", 12, W.biru)),
      tambah("seperempat", teks("kt", 150, 164, "kurang seperempat gambar", 10, W.merah)),
      tambah("ditambah,", apem("kmq1", 66 + 9 * 16, 96, 1)),
      sorotkan("ditambah,", "kmq1"),
    ),
    k(
      "Pelajarannya, jangan menebak dari bentuk gambar. Selalu hitung banyak gambar dikali kunci, lalu cocokkan dengan data.",
      tambah("hitung", teks("kp", 150, 188, "hitung, lalu cocokkan dengan data", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB7. Frequency-to-Pictograph Conversion: konsep ------------------------------ */
const langkah = (id: string, y: number, warna: string, isi: string) => kartu(id, 25, y, 250, 30, warna, [isi], 9.2);

export const ADEGAN_LUAR_UBAH: AdeganStory = {
  id: "luarb-ubah",
  judul: "Frequency-to-Pictograph Conversion: dari tabel ke gambar",
  sumber: "Metode luar; mengubah tabel frekuensi menjadi piktogram dengan contoh hari Jumat",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Frequency-to-Pictograph Conversion adalah cara mengubah tabel frekuensi menjadi piktogram dengan empat langkah.",
      tambah(0, teks("jud", 150, 24, "Frequency-to-Pictograph Conversion", 10.4, W.ungu)),
      tambah("tabel", kartu("a1", 16, 70, 110, 44, W.krem, ["tabel", "frekuensi"], 10)),
      tambah("piktogram", kartu("a2", 174, 70, 110, 44, W.hijauMuda, ["piktogram", "gambar"], 10)),
      tambah("empat", panah("ap", 130, 92, 40, 0, W.merah, 2.4, { gambar: true })),
    ),
    k(
      "Langkah satu, pilih kunci. Langkah dua, bagi frekuensi dengan kunci. Langkah tiga, hasil bagi menjadi gambar utuh dan sisanya menjadi potongan. Langkah empat, gambar dan periksa.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Empat langkah", 13, W.ungu)),
      tambah("satu,", langkah("s1", 36, W.hijauMuda, "1. pilih kunci")),
      tambah("dua,", langkah("s2", 74, W.muda, "2. bagi frekuensi dengan kunci")),
      tambah("tiga,", langkah("s3", 112, W.krem, "3. hasil bagi: gambar utuh, sisa: potongan")),
      tambah("empat,", langkah("s4", 150, W.merahMuda, "4. gambar, lalu periksa")),
    ),
    k(
      "Contoh hari Jumat: frekuensinya 27 dan kuncinya 4. Tulis 27 dibagi 4 sama dengan 6 sisa 3.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Contoh hari Jumat", 13, W.ungu)),
      tambah("frekuensinya", teks("j1", 150, 60, "frekuensi 27, kunci 4", 12, W.biru)),
      tambah("Tulis", teks("j2", 150, 100, "27 : 4 = 6 sisa 3", 15, W.merah)),
    ),
    k(
      "Hasil bagi 6 berarti 6 gambar utuh. Sisa 3 berarti tiga perempat gambar, karena satu gambar bernilai 4.",
      tambah("Hasil", barisApem("jm", 140, "Jumat", 27)),
      tambah("Sisa", teks("j3", 150, 172, "6 utuh dan 3 perempat", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB8. Frequency-to-Pictograph Conversion: penerapan ------------------------------ */
export const ADEGAN_LUAR_UBAH_TERAPAN: AdeganStory = {
  id: "luarb-ubah-terapan",
  judul: "Mengubah data Sabtu dan panen tomat menjadi gambar",
  sumber: "Metode luar; hari Sabtu Buku Siswa hlm. 250 dan panen tomat minggu ke-2 hlm. 252",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Contoh hari Sabtu: frekuensinya 29 dan kuncinya 4. Hasil bagi 29 dibagi 4 adalah 7 sisa 1.",
      tambah(0, teks("jud", 150, 24, "Contoh hari Sabtu", 13, W.ungu)),
      tambah("frekuensinya", teks("s1", 150, 60, "frekuensi 29, kunci 4", 12, W.biru)),
      tambah("Hasil", teks("s2", 150, 96, "29 : 4 = 7 sisa 1", 15, W.merah)),
    ),
    k(
      "Jadi gambarnya 7 apem utuh dan satu potongan seperempat. Periksa: 7 dikali 4 sama dengan 28, lalu 28 ditambah 1 sama dengan 29.",
      tambah("gambarnya", barisApem("sb", 130, "Sabtu", 29)),
      tambah("dikali", teks("s3", 150, 156, "7 x 4 = 28", 11, W.biru)),
      tambah("ditambah", teks("s4", 150, 176, "28 + 1 = 29", 12, W.hijau)),
    ),
    k(
      "Cara ini berlaku juga untuk tomat. Dengan kunci 2 kilogram, panen minggu ke-2 sebesar 14 kilogram, jadi 14 dibagi 2 sama dengan 7 gambar tanpa sisa.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Panen tomat dengan kunci 2 kg", 12, W.ungu)),
      tambah("minggu", barisTomat("tm", 70, "Minggu 2", 14, 2)),
      tambah("jadi", teks("t1", 150, 116, "14 : 2 = 7 sisa 0", 14, W.merah)),
    ),
    k(
      "Jadi tabel dan piktogram bisa saling diubah: dari tabel ke gambar dengan membagi, dan dari gambar ke tabel dengan mengalikan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tabel dan gambar saling diubah", 12, W.ungu)),
      tambah("tabel", kartu("z1", 20, 60, 100, 44, W.krem, ["tabel"], 11), kartu("z2", 180, 60, 100, 44, W.hijauMuda, ["gambar"], 11)),
      tambah("membagi,", panah("zp", 124, 72, 52, 0, W.merah, 2.4, { gambar: true }), teks("zt", 150, 64, "bagi", 9.4, W.merah)),
      tambah("mengalikan.", panah("zq", 176, 94, -52, 0, W.hijau, 2.4, { gambar: true }), teks("zu", 150, 116, "kali", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB9. Ringkasan metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luarb-ringkas",
  judul: "Ringkasan empat metode luar piktogram",
  sumber: "Ringkasan metode luar Sub-Bab B",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan. Pictograph Scale Legend: pilih dan tulis kunci supaya gambar tidak terlalu banyak dan sebaiknya membagi habis semua data.",
      tambah(0, teks("jud", 150, 20, "Ringkasan metode luar", 12, W.ungu)),
      tambah("Legend:", kartuMetode("m1", 10, 34, "#FDE68A", ["Pictograph", "Scale Legend"], "pilih dan tulis kunci")),
    ),
    k(
      "Unit Symbol Consistency: satu simbol selalu bernilai sama dan berukuran sama di seluruh piktogram, dan potongan harus sebanding.",
      tambah("Consistency:", kartuMetode("m2", 156, 34, "#FBCFE8", ["Unit Symbol", "Consistency"], "simbol selalu sama")),
    ),
    k(
      "Pictograph Error Hunt: periksa judul, kunci, ukuran, dan hitung tiap baris. Frequency-to-Pictograph Conversion: bagi frekuensi dengan kunci, lalu gambar utuh dan potongannya.",
      tambah("Hunt:", kartuMetode("m3", 10, 112, "#BBF7D0", ["Pictograph", "Error Hunt"], "periksa dan hitung")),
      tambah("Conversion:", kartuMetode("m4", 156, 112, "#BFDBFE", ["Frequency-to-", "Pictograph Conversion"], "bagi, gambar, potong")),
    ),
    k(
      "Ingat selalu baca kunci lebih dulu. Dengan empat metode ini, kamu dapat membuat, membaca, dan menganalisis piktogram dengan teliti.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Ingat: baca kunci dulu", 13, W.ungu)),
      tambah("kunci", emo("tr", 150, 98, "🏆", 46)),
      tambah("membuat,", teks("rg", 150, 146, "membuat, membaca, menganalisis", 11, W.hijau)),
    ),
  ],
};
