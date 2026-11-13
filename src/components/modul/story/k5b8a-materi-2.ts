import type { AdeganStory, Aksi } from "./logika-story";
import { KOL_FREK, W, barisFrek, emo, garis, idBarisFrek, judul, kartu, kartuSiswa, kepalaFrek, panah, tabel, teks, turus } from "./k5b8a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8a-bantu";

/* ------------------------------ 5. Eksplorasi 8.1A: data sayuran favorit (hlm. 240 sampai 242) ------------------------------ */
const SISWA: [string, string[]][] = [
  ["Asep", ["Kangkung", "wortel", "bayam"]],
  ["Nisa", ["Bayam", "sawi"]],
  ["Yohana", ["Wortel", "kol", "sawi"]],
  ["Lukas", ["Buncis", "wortel", "tomat"]],
  ["Komang", ["Kangkung", "tomat"]],
  ["Ahmad", ["Kol", "wortel"]],
  ["Meli", ["Kangkung", "buncis"]],
  ["Tiara", ["Bayam"]],
];
const kartuNo = (i: number) => kartuSiswa(`sw${i}`, 12 + (i % 4) * 72, i < 4 ? 32 : 82, 68, SISWA[i][0], SISWA[i][1]);

export const ADEGAN_SAYURAN: AdeganStory = {
  id: "sayuran-data",
  judul: "Eksplorasi 8.1A: data sayuran favorit",
  sumber: "Buku Siswa hlm. 240–242",
  latar: "#F0FDF4",
  kutipan: [
    "Eksplorasi 8.1A",
    "Apakah teman-teman suka makan sayur",
    "sayuran bermanfaat untuk memperlancar pencernaan",
    "Setiap anak menuliskan maksimal tiga jenis sayuran favorit",
    "dapatkah kalian mengetahui jenis sayuran apa yang paling banyak disukai",
    "Datanya masih tersebar",
    "mungkin saja ada data yang terlewat atau terhitung dua kali",
    "Bagaimana jika kita tulis dahulu semua nama sayurannya",
    "bisa kan kita memakai tabel seperti yang sudah pelajari di kelas IV",
  ],
  ketukan: [
    k(
      "Eksplorasi 8.1A dimulai dengan Yohana dan teman-temannya yang membahas sayur. Sayuran baik untuk kesehatan dan memperlancar pencernaan.",
      tambah(0, judul("Eksplorasi 8.1A")),
      tambah("Yohana", emo("v1", 80, 92, "🥦", 36), emo("v2", 150, 92, "🥕", 36), emo("v3", 220, 92, "🍅", 36)),
      tambah("kesehatan", teks("vt", 150, 150, "sayur baik untuk kesehatan", 10.4, W.hijau)),
    ),
    k(
      "Setiap anak menuliskan paling banyak tiga jenis sayuran favorit. Ada enam belas anak di kelas V SD Pancasila, dan catatannya tersebar.",
      bersih(0),
      tambah(0, judul("sayuran favorit kelas V")),
      tambah("Setiap", ...[0, 1, 2, 3].flatMap(kartuNo)),
      tambah("Ada", ...[4, 5, 6, 7].flatMap(kartuNo)),
      tambah("tersebar.", teks("n1", 150, 150, "16 anak, tiap anak paling banyak 3 sayur", 9.4, W.hijau)),
    ),
    k(
      "Buku bertanya, sayuran apa yang paling banyak disukai? Datanya masih tersebar, jadi sulit menghitung dan bisa ada yang terlewat atau terhitung dua kali.",
      hapus(0, "n1"),
      tambah("Buku", teks("q1", 150, 150, "sayuran apa yang paling banyak disukai?", 10, W.ungu)),
      tambah("terlewat", teks("q2", 150, 170, "mudah terlewat atau terhitung dua kali", 9.4, W.merah)),
    ),
    k(
      "Yohana mengusulkan menulis dulu semua nama sayuran, lalu menghitung banyaknya siswa yang menyukai tiap jenis. Asep mengusulkan memakai tabel seperti di kelas empat.",
      bersih(0),
      tambah(0, judul("tulis nama sayuran dulu")),
      tambah("Yohana", ...["Bayam", "Kangkung", "Wortel", "Tomat"].flatMap((n, i) => kartu(`ch${i}`, 12 + i * 72, 36, 66, 24, W.hijauMuda, [n], 8.6))),
      tambah("menulis", ...["Buncis", "Sawi", "Kol"].flatMap((n, i) => kartu(`ci${i}`, 12 + i * 72, 70, 66, 24, W.hijauMuda, [n], 8.6))),
      tambah("Asep", panah("pt", 150, 104, 0, 22, W.ungu, 3, { gambar: true })),
      tambah("tabel", ...kartu("tb", 70, 130, 160, 34, W.krem, ["tabel hitungan", "tujuh jenis sayuran"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Tabel 8.2 (centang) dan Tabel 8.3 (garis) (hlm. 243) ------------------------------ */
const CENTANG = (n: number) => Array.from({ length: n }, () => "✓").join(" ");

export const ADEGAN_CENTANG_GARIS: AdeganStory = {
  id: "centang-garis",
  judul: "Tabel 8.2 dengan centang dan Tabel 8.3 dengan garis",
  sumber: "Buku Siswa hlm. 243",
  latar: "#FFFBEB",
  kutipan: [
    "Tabel 8.2 Tabel Sayuran Favorit Siswa Kelas V SD",
    "Kami membuat satu",
    "centang",
    "Tabel 8.3 Tabel Sayuran Favorit Siswa Kelas V SD",
    "Kalau kami memakai",
    "Satu garis untuk",
    "tidak ada data yang",
    "terlewat atau terhitung",
  ],
  ketukan: [
    k(
      "Ada dua tabel contoh. Tabel 8.2 dibuat Lukas dan Nisa dengan satu centang untuk setiap siswa yang menyukai satu jenis sayur.",
      tambah(0, judul("Tabel 8.2: tanda centang")),
      tambah("Tabel", ...tabel("c", 40, 34, KOL_FREK, [["Sayuran", "Centang", "Jumlah"]], 18, 8.6)),
      tambah("centang", ...tabel("c", 40, 34, KOL_FREK, [["Sayuran", "Centang", "Jumlah"], ["Bayam", CENTANG(7), "7"], ["Kangkung", CENTANG(6), "6"], ["Wortel", CENTANG(8), "8"]], 18, 8.2).slice(6)),
    ),
    k(
      "Pada Tabel 8.2, bayam punya tujuh centang, kangkung enam, dan wortel delapan.",
      sorotkan("bayam", "c-s10", "c-s11", "c-s12"),
      sorotkan("kangkung", "c-s20", "c-s21", "c-s22"),
      sorotkan("wortel", "c-s30", "c-s31", "c-s32"),
    ),
    k(
      "Tabel 8.3 dibuat Asep, Yohana, dan Komang dengan garis. Satu garis untuk satu siswa, sehingga tidak ada data yang terlewat atau terhitung dua kali.",
      bersih(0),
      tambah(0, judul("Tabel 8.3: garis")),
      tambah("Tabel", ...kepalaFrek("g", 40, 34, ["Sayuran", "Garis", "Jumlah"], KOL_FREK, 18, 8.6)),
      tambah("garis.", ...barisFrek("g", 40, 34, 1, "Bayam", 7, KOL_FREK, 18, 8.6)),
      tambah("Satu", ...barisFrek("g", 40, 34, 2, "Kangkung", 6, KOL_FREK, 18, 8.6)),
      tambah("sehingga", ...barisFrek("g", 40, 34, 3, "Wortel", 8, KOL_FREK, 18, 8.6)),
    ),
    k(
      "Hasilnya sama: bayam tujuh, kangkung enam, wortel delapan. Hanya cara mencatatnya yang berbeda, centang atau garis.",
      tambah("sama:", teks("hs", 150, 128, "hasil sama, cara mencatat berbeda", 10, W.hijau)),
      sorotkan("bayam", "g-r1b", "g-r1c"),
      sorotkan("kangkung", "g-r2b", "g-r2c"),
      sorotkan("wortel", "g-r3b", "g-r3c"),
    ),
    k(
      "Garis-garis seperti buatan kelompok Asep itu disebut turus. Kita pelajari lebih dekat pada adegan berikutnya.",
      tambah("Garis-garis", panah("pg", 150, 168, 0, -22, W.ungu, 3, { gambar: true })),
      tambah("turus.", teks("tu", 150, 184, "garis seperti ini disebut turus", 10.4, W.ungu)),
    ),
  ],
};

/* ------------------------------ 7. Turus dan frekuensi (hlm. 244) ------------------------------ */
export const ADEGAN_TURUS: AdeganStory = {
  id: "turus-frekuensi",
  judul: "Turus dan frekuensi",
  sumber: "Buku Siswa hlm. 244",
  latar: "#EEF2FF",
  kutipan: [
    "Tahukah kalian",
    "Garis-garis seperti yang dibuat kelompok Asep disebut turus",
    "Turus adalah salah satu cara mencatat hasil pengamatan dengan simbol",
    "Setiap 1 hasil",
    "Agar lebih mudah dibaca, turus dibuat dalam kelompok",
    "Setiap kelompok berisi 5 garis: 4 garis tegak dan 1",
    "garis miring",
    "mengapa 5 garis tersebut tidak dibuat tegak",
    "Frekuensi adalah suatu bilangan yang",
    "jumlah atau banyaknya suatu peristiwa",
    "ada 8 anak yang menyukai sayuran bayam",
    "frekuensi siswa yang menyukai bayam adalah 8 orang",
  ],
  ketukan: [
    k(
      "Tahukah kalian? Garis-garis buatan kelompok Asep disebut turus. Turus adalah cara mencatat hasil pengamatan dengan simbol.",
      tambah(0, judul("Tahukah kalian? Turus")),
      tambah("Garis-garis", ...turus("tr", 118, 52, 3, 34, W.hitam)),
      tambah("simbol.", teks("tl", 150, 130, "satu pengamatan, satu garis", 10.4, W.hijau)),
    ),
    k(
      "Satu hasil pengamatan diwakili satu simbol, yaitu garis tegak, garis miring ke kanan, atau garis miring ke kiri. Dengan turus, tidak ada hasil yang terlewat.",
      tambah("tegak,", ...kartu("sa", 30, 138, 60, 40, W.putih, ["|"], 22), teks("sat", 60, 192, "tegak", 8, W.biru)),
      tambah("kanan,", ...kartu("sb", 120, 138, 60, 40, W.putih, ["/"], 22), teks("sbt", 150, 192, "miring kanan", 8, W.biru)),
      tambah("kiri.", ...kartu("sc", 210, 138, 60, 40, W.putih, ["\\"], 22), teks("sct", 240, 192, "miring kiri", 8, W.biru)),
    ),
    k(
      "Agar mudah dibaca, turus dibuat dalam kelompok. Setiap kelompok berisi 5 garis: 4 garis tegak dan 1 garis miring.",
      bersih(0),
      tambah(0, judul("kelompok lima")),
      tambah("kelompok.", ...turus("k5", 120, 44, 5, 44, W.hitam)),
      tambah("5", teks("m5", 150, 120, "5 garis", 12, W.ungu)),
      tambah("4", teks("m4", 82, 150, "4 garis tegak", 9.6, W.hijau)),
      tambah("1", teks("m1", 218, 150, "1 garis miring", 9.6, W.merah)),
    ),
    k(
      "Mengapa lima garis tidak dibuat tegak semua? Garis miring mengikat empat garis sebelumnya, sehingga kelompok lima terlihat jelas dan mudah dihitung.",
      bersih(0),
      tambah(0, judul("mengapa tidak tegak semua?")),
      tambah("tegak", ...[0, 1, 2, 3, 4].map((i) => garis(`tg${i}`, 56 + i * 5.4, 48, 0, 40, W.hitam, 1.6)), teks("tgt", 70, 116, "tegak semua:", 8.6, W.merah), teks("tgu", 70, 128, "sulit dihitung", 8.6, W.merah)),
      tambah("miring", ...turus("tm", 196, 48, 5, 40, W.hitam), teks("tmt", 214, 116, "ada garis miring:", 8.6, W.hijau), teks("tmu", 214, 128, "langsung terlihat lima", 8.6, W.hijau)),
    ),
    k(
      "Dalam pengumpulan data dikenal juga istilah frekuensi. Frekuensi adalah bilangan yang menyatakan seberapa sering atau seberapa banyak suatu peristiwa terjadi.",
      bersih(0),
      tambah(0, judul("frekuensi")),
      tambah("frekuensi.", ...kartu("fr", 30, 50, 240, 62, W.krem, ["frekuensi:", "seberapa sering atau", "seberapa banyak terjadi"], 10.4)),
    ),
    k(
      "Pada data sayuran favorit, tujuh anak menyukai bayam, jadi frekuensi bayam adalah 7 orang. Buku menulis delapan anak, tetapi tabel buku dan hitungan kita menunjukkan 7.",
      bersih(0),
      tambah(0, judul("frekuensi bayam")),
      tambah("tujuh", ...turus("by", 100, 44, 7, 30, W.hitam)),
      tambah("adalah", teks("by7", 150, 100, "frekuensi bayam: 7 orang", 11, W.ungu)),
      tambah("jadi", teks("by1", 150, 124, "Asep, Nisa, Tiara, Kinanti,", 8.6, W.hijau), teks("by2", 150, 136, "Anggi, Robert, Farah", 8.6, W.hijau)),
      tambah("Buku", teks("by3", 150, 166, "hlm. 244 menulis 8 anak: keliru", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berdiskusi (hlm. 245) ------------------------------ */
const T = { x: 40, y: 26, h: 16, u: 7.8 };
const baris = (r: number, nama: string, n: number | null) => barisFrek("tf", T.x, T.y, r, nama, n, KOL_FREK, T.h, T.u);
const isi = (at: string | number, r: number, nama: string, n: number): Aksi[] => [hapus(at, ...idBarisFrek("tf", r, null)), tambah(at, ...baris(r, nama, n))];

export const ADEGAN_DISKUSI: AdeganStory = {
  id: "ayo-berdiskusi",
  judul: "Ayo Berdiskusi: Tabel 8.4 tabel frekuensi sayuran",
  sumber: "Buku Siswa hlm. 245 dan Buku Panduan Guru hlm. 352–353",
  latar: "#FFF1F2",
  kutipan: [
    "Ayo Berdiskusi",
    "Lengkapi tabel berikut berdasarkan data sayuran favorit siswa",
    "Tabel 8.4 Sayuran Favorit Siswa Kelas V SD Pancasila",
    "Tabel di samping",
    "ini disebut tabel",
    "Dengan menggunakan bahasa kalian sendiri",
    "tuliskan apa yang kalian ketahui tentang tabel frekuensi",
    "Sayuran yang paling",
    "adalah wortel",
    "menyukai tomat lebih",
    "yang menyukai bayam",
    "adalah buncis",
    "Menurut kalian, pernyataan siapa yang tepat? Mengapa demikian",
  ],
  ketukan: [
    k(
      "Ayo Berdiskusi nomor satu meminta kita melengkapi Tabel 8.4, tabel frekuensi sayuran favorit. Bayam tujuh, kangkung enam, dan wortel delapan sudah terisi.",
      tambah(0, ...kepalaFrek("tf", T.x, T.y, ["Sayuran", "Turus", "Frekuensi"], KOL_FREK, T.h, T.u)),
      tambah("Tabel", teks("jud", 150, 18, "Tabel 8.4 Sayuran Favorit", 9.6, W.ungu)),
      tambah("Bayam", ...baris(1, "Bayam", 7)),
      tambah("kangkung", ...baris(2, "Kangkung", 6)),
      tambah("wortel", ...baris(3, "Wortel", 8)),
      tambah("terisi.", ...baris(4, "Tomat", null), ...baris(5, "Buncis", null), ...baris(6, "Sawi", null), ...baris(7, "Kol", null)),
    ),
    k(
      "Kita hitung dari data enam belas anak. Tomat dipilih Lukas, Komang, Randi, Tomi, Ucok, dan Farah, jadi frekuensi tomat adalah 6.",
      tambah("Tomat", teks("nm", 150, 160, "Lukas, Komang, Randi, Tomi, Ucok, Farah", 7.8, W.hijau)),
      ...isi("jadi", 4, "Tomat", 6),
    ),
    k(
      "Buncis dipilih Lukas, Meli, Anggi, dan Ucok, jadi 4. Sawi dipilih Nisa, Yohana, Randi, Robert, dan Ucok, jadi 5. Kol dipilih Yohana, Ahmad, dan Kinanti, jadi 3.",
      hapus(0, "nm"),
      tambah("Buncis", teks("nb", 150, 160, "Lukas, Meli, Anggi, Ucok", 7.8, W.hijau)),
      ...isi("jadi", 5, "Buncis", 4),
      tambah("Sawi", teks("ns", 150, 172, "Nisa, Yohana, Randi, Robert, Ucok", 7.8, W.hijau)),
      ...isi("jadi@2", 6, "Sawi", 5),
      tambah("Kol", teks("nk", 150, 184, "Yohana, Ahmad, Kinanti", 7.8, W.hijau)),
      ...isi("jadi@3", 7, "Kol", 3),
    ),
    k(
      "Jumlah semua frekuensi adalah 7 ditambah 6 ditambah 8 ditambah 6 ditambah 4 ditambah 5 ditambah 3, yaitu 39. Angka ini lebih banyak dari jumlah anak, karena tiap anak boleh memilih sampai tiga sayuran.",
      hapus(0, "nb", "ns", "nk"),
      tambah("Jumlah", teks("jm", 150, 162, "7 + 6 + 8 + 6 + 4 + 5 + 3 = 39", 10, W.ungu)),
      tambah("Angka", teks("jn", 150, 180, "39 pilihan dari 16 anak, tiap anak sampai 3", 8.6, W.merah)),
    ),
    k(
      "Nomor dua meminta kita menulis tabel frekuensi dengan bahasa sendiri. Jawaban yang diharapkan: tabel yang menunjukkan daftar objek yang diamati dan frekuensi tiap objek.",
      bersih(0),
      tambah(0, judul("apa itu tabel frekuensi?")),
      tambah("tabel", ...kartu("df", 20, 50, 260, 70, W.krem, ["tabel frekuensi:", "daftar objek yang diamati", "dan frekuensi tiap objek"], 10.4)),
    ),
    k(
      "Nomor tiga memuat tiga pernyataan. Pernyataan pertama, wortel paling banyak disukai, tepat, sebab wortel punya frekuensi terbesar, yaitu 8.",
      bersih(0),
      tambah(0, judul("tiga pernyataan")),
      tambah("pertama,", ...kartu("p1", 8, 36, 92, 60, W.langit, ["paling banyak", "disukai:", "wortel"], 8.6)),
      tambah("tepat,", teks("v1", 54, 116, "tepat: wortel 8", 8.6, W.hijau)),
    ),
    k(
      "Pernyataan kedua, tomat lebih banyak daripada bayam, salah, sebab tomat hanya 6 sedangkan bayam 7.",
      tambah("kedua,", ...kartu("p2", 104, 36, 92, 60, W.langit, ["tomat lebih", "banyak dari", "bayam"], 8.6)),
      tambah("salah,", teks("v2", 150, 116, "salah: tomat 6, bayam 7", 8.2, W.merah)),
    ),
    k(
      "Pernyataan ketiga, buncis paling sedikit disukai, juga salah, sebab kol hanya 3 sedangkan buncis 4.",
      tambah("ketiga,", ...kartu("p3", 200, 36, 92, 60, W.langit, ["paling sedikit", "disukai:", "buncis"], 8.6)),
      tambah("salah,", teks("v3", 246, 116, "salah: kol 3, buncis 4", 8.2, W.merah)),
    ),
  ],
};
