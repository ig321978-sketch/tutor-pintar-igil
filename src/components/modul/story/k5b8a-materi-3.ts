import type { AdeganStory, Aksi } from "./logika-story";
import { W, barisFrek, emo, idBarisFrek, judul, kartu, kepalaFrek, panah, tabel, teks } from "./k5b8a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8a-bantu";

/* ------------------------------ 9. Eksplorasi 8.1B: mengumpulkan data sendiri (hlm. 246) ------------------------------ */
const KOL_SEPATU = [80, 90, 50];
const barisSepatu = (r: number, ukuran: string, n: number | null) => barisFrek("sp", 40, 36, r, ukuran, n, KOL_SEPATU, 16, 8.4);

export const ADEGAN_SEPATU: AdeganStory = {
  id: "ekspl-81b",
  judul: "Eksplorasi 8.1B: mengumpulkan data ukuran sepatu",
  sumber: "Buku Siswa hlm. 246 dan Buku Panduan Guru hlm. 354–356",
  latar: "#ECFEFF",
  kutipan: [
    "Eksplorasi 8.1B",
    "Ayo Bekerja Sama",
    "coba kumpulkan data ukuran sepatu",
    "Tanyailah teman kalian satu per satu",
    "Buatlah tabel frekuensi dari hasil pengukuran yang kalian",
    "saran apa yang akan kalian berikan kepada pedagang sepatu",
    "Ayo presentasikan hasil kerja kalian di depan kelas",
    "Bandingkan",
  ],
  ketukan: [
    k(
      "Eksplorasi 8.1B, Ayo Bekerja Sama. Sekarang kita mengumpulkan data sendiri, yaitu ukuran sepatu teman sekelas, secara berkelompok.",
      tambah(0, judul("Eksplorasi 8.1B")),
      tambah("sepatu", emo("s1", 90, 96, "👟", 36), emo("s2", 150, 96, "👟", 36), emo("s3", 210, 96, "👟", 36)),
      tambah("berkelompok.", teks("st", 150, 150, "kumpulkan data ukuran sepatu", 10.4, W.hijau)),
    ),
    k(
      "Langkah satu: tanyai teman satu per satu dan catat pada tabel dengan kolom nomor, nama, dan ukuran sepatu. Baris boleh ditambah sesuai kebutuhan.",
      bersih(0),
      tambah(0, judul("langkah satu: catat")),
      tambah("tabel", ...tabel("ds", 50, 34, [34, 100, 66], [["No.", "Nama", "Ukuran Sepatu"], ["1", "", ""], ["2", "", ""], ["dst.", "", ""]], 20, 8.4)),
    ),
    k(
      "Langkah dua: buat tabel frekuensi dari hasil itu, dengan kolom ukuran sepatu, turus, dan frekuensi.",
      bersih(0),
      tambah(0, judul("langkah dua: tabel frekuensi")),
      tambah("tabel", ...kepalaFrek("sp", 40, 36, ["Ukuran Sepatu", "Turus", "Frekuensi"], KOL_SEPATU, 16, 8)),
      tambah("ukuran", ...barisSepatu(1, "...", null), ...barisSepatu(2, "...", null), ...barisSepatu(3, "...", null)),
    ),
    k(
      "Langkah tiga: beri saran kepada pedagang sepatu berdasarkan data. Ukuran dengan frekuensi terbesar sebaiknya dibawa paling banyak.",
      bersih(0),
      tambah(0, judul("langkah tiga: beri saran")),
      tambah("pedagang", emo("pd", 70, 96, "🛒", 40), teks("pdt", 70, 124, "pedagang sepatu", 8.6)),
      tambah("Ukuran", panah("ps", 106, 96, 44, 0, W.hijau, 3, { gambar: true }), ...kartu("sr", 156, 64, 128, 62, W.hijauMuda, ["bawa paling banyak", "ukuran dengan", "frekuensi terbesar"], 8.6)),
    ),
    k(
      "Langkah empat: presentasikan hasil kerja di depan kelas dan bandingkan dengan hasil kelompok lain.",
      bersih(0),
      tambah(0, judul("langkah empat: presentasi")),
      tambah("presentasikan", emo("pr", 90, 100, "🗣", 40), teks("prt", 90, 128, "presentasi", 8.6)),
      tambah("kelompok", emo("kl", 210, 100, "👥", 40), teks("klt", 210, 128, "bandingkan kelompok lain", 8.6)),
    ),
    k(
      "Sebagai contoh buatan kita sendiri, bukan data buku: sepuluh anak dengan ukuran 32 satu anak, 33 tiga anak, 34 tiga anak, 35 dua anak, dan 36 satu anak.",
      bersih(0),
      tambah(0, judul("contoh sendiri, bukan data buku")),
      tambah(0, ...kepalaFrek("sp", 40, 36, ["Ukuran Sepatu", "Turus", "Frekuensi"], KOL_SEPATU, 16, 8)),
      tambah("32", ...barisSepatu(1, "32", 1)),
      tambah("33", ...barisSepatu(2, "33", 3)),
      tambah("34", ...barisSepatu(3, "34", 3)),
      tambah("35", ...barisSepatu(4, "35", 2)),
      tambah("36", ...barisSepatu(5, "36", 1)),
    ),
    k(
      "Jumlah frekuensi 1 ditambah 3 ditambah 3 ditambah 2 ditambah 1 adalah 10, sama dengan banyak anak. Ukuran 33 dan 34 paling banyak, jadi pedagang membawa keduanya paling banyak.",
      tambah("Jumlah", teks("jm", 150, 146, "1 + 3 + 3 + 2 + 1 = 10", 10, W.ungu)),
      sorotkan("33", "sp-r2a", "sp-r2b", "sp-r2c"),
      sorotkan("34", "sp-r3a", "sp-r3b", "sp-r3c"),
      tambah("pedagang", teks("pj", 150, 170, "bawa banyak ukuran 33 dan 34", 9.4, W.hijau)),
    ),
    k(
      "Buku Panduan Guru membolehkan guru mengganti jenis data, misalnya acara televisi favorit atau makanan favorit. Bila respondennya banyak, catat dulu, baru buat tabel frekuensi.",
      bersih(0),
      tambah(0, judul("catatan Buku Panduan Guru")),
      tambah("acara", ...kartu("g1", 18, 40, 122, 44, W.langit, ["acara televisi", "favorit"], 9)),
      tambah("makanan", ...kartu("g2", 160, 40, 122, 44, W.krem, ["makanan", "favorit"], 9)),
      tambah("Bila", ...kartu("g3", 40, 110, 220, 44, W.hijauMuda, ["responden banyak:", "catat dulu, lalu buat tabel frekuensi"], 8.8)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih: nilai ulangan SD Mekarsari (hlm. 247) ------------------------------ */
const NILAI = [
  [80, 40, 80, 70, 40, 50, 80, 90, 60, 60],
  [70, 70, 80, 70, 100, 60, 80, 90, 70, 80],
  [60, 70, 60, 90, 80],
];
const FREK_NILAI: [string, number][] = [["40", 2], ["50", 1], ["60", 5], ["70", 6], ["80", 7], ["90", 3], ["100", 1]];
const KOL_NILAI = [60, 100, 60];
const barisNilai = (r: number, nama: string, n: number | null) => barisFrek("tl", 40, 66, r, nama, n, KOL_NILAI, 13, 7.4);
const isiNilai = (at: string | number, r: number): Aksi[] => [hapus(at, ...idBarisFrek("tl", r, null)), tambah(at, ...barisNilai(r, FREK_NILAI[r - 1][0], FREK_NILAI[r - 1][1]))];
const barisData = (i: number) => NILAI[i].map((v, j) => teks(`dn${i}-${j}`, 30 + j * 26, 36 + i * 12, String(v), 8.4, W.biru));

export const ADEGAN_LATIHAN: AdeganStory = {
  id: "latihan",
  judul: "Ayo Berlatih: nilai ulangan Matematika SD Mekarsari",
  sumber: "Buku Siswa hlm. 247 dan Buku Panduan Guru hlm. 356–357",
  latar: "#FDF4FF",
  kutipan: [
    "Ayo Berlatih",
    "Data berikut menunjukkan hasil ulangan Matematika siswa kelas V",
    "SD Mekarsari",
    "Tabel 8.5 Hasil Ulangan Matematika Siswa Kelas V SD Mekarsari",
    "Berapa nilai tertinggi pada hasil ulangan Matematika tersebut",
    "Ada berapa siswa yang mendapat nilai tertinggi",
    "Jika siswa dengan nilai kurang dari 70 harus mengikuti remedi",
    "ada berapa siswa yang mengikuti remedi",
  ],
  ketukan: [
    k(
      "Ayo Berlatih memberi data nilai ulangan Matematika siswa kelas V SD Mekarsari: ada 25 nilai, dari 40 sampai 100.",
      tambah(0, judul("Ayo Berlatih: 25 nilai ulangan")),
      tambah("data", ...barisData(0)),
      tambah("siswa", ...barisData(1)),
      tambah("ada", ...barisData(2)),
    ),
    k(
      "Soal satu: lengkapi Tabel 8.5 dengan kolom nilai, turus, dan frekuensi. Nilai yang muncul adalah 40, 50, 60, 70, 80, 90, dan 100.",
      tambah("lengkapi", ...kepalaFrek("tl", 40, 66, ["Nilai", "Turus", "Frekuensi"], KOL_NILAI, 13, 7.4)),
      tambah("Tabel", teks("t85", 281, 112, "Tabel 8.5", 7.6, W.ungu)),
      ...FREK_NILAI.map(([nama], i): Aksi => tambah(i === 6 ? "100." : `${nama},`, ...barisNilai(i + 1, nama, null))),
    ),
    k(
      "Hitung satu per satu. Nilai 40 muncul 2 kali, nilai 50 muncul 1 kali, dan nilai 60 muncul 5 kali.",
      ...isiNilai("40", 1),
      ...isiNilai("50", 2),
      ...isiNilai("60", 3),
    ),
    k(
      "Nilai 70 muncul 6 kali, nilai 80 muncul 7 kali, nilai 90 muncul 3 kali, dan nilai 100 muncul 1 kali.",
      ...isiNilai("70", 4),
      ...isiNilai("80", 5),
      ...isiNilai("90", 6),
      ...isiNilai("100", 7),
    ),
    k(
      "Periksa jumlahnya: 2 ditambah 1 ditambah 5 ditambah 6 ditambah 7 ditambah 3 ditambah 1 adalah 25, sama dengan banyaknya nilai.",
      tambah("Periksa", teks("eq", 150, 186, "2 + 1 + 5 + 6 + 7 + 3 + 1 = 25", 9.6, W.ungu)),
    ),
    k(
      "Soal dua dan tiga: nilai tertinggi adalah 100, dan hanya 1 siswa yang mendapat nilai 100.",
      hapus(0, "eq"),
      sorotkan("tertinggi", "tl-r7a", "tl-r7b", "tl-r7c"),
      tambah("hanya", teks("tt", 150, 186, "tertinggi 100, ada 1 siswa", 9.6, W.hijau)),
    ),
    k(
      "Soal empat: siswa dengan nilai kurang dari 70 mengikuti remedi, yaitu nilai 40, 50, dan 60. Banyaknya 2 ditambah 1 ditambah 5, yaitu 8 siswa.",
      hapus(0, "tt"),
      sorotkan("40,", "tl-r1a", "tl-r1b", "tl-r1c"),
      sorotkan("50,", "tl-r2a", "tl-r2b", "tl-r2c"),
      sorotkan("60.", "tl-r3a", "tl-r3b", "tl-r3c"),
      tambah("Banyaknya", teks("rm", 150, 186, "2 + 1 + 5 = 8", 9.6, W.merah), teks("rn", 232, 186, "8 siswa remedi", 8, W.merah)),
    ),
  ],
};

/* ------------------------------ 11. Refleksi dan pesan Buku Panduan Guru ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi",
  judul: "Refleksi Subbab A dan pesan Buku Panduan Guru",
  sumber: "Buku Siswa hlm. 268 dan Buku Panduan Guru hlm. 356–357",
  latar: "#F0F9FF",
  kutipan: [
    "Setelah mempelajari materi terkait data, isilah tabel berikut sesuai",
    "Aku dapat mengumpulkan data sederhana dari",
    "lingkungan sekitar",
    "Aku dapat menyajikan hasil pengumpulan data",
  ],
  ketukan: [
    k(
      "Refleksi buku untuk Subbab A: butir satu, aku dapat mengumpulkan data sederhana dari lingkungan sekitar. Butir dua, aku dapat menyajikan hasilnya dengan tabel frekuensi sederhana.",
      tambah(0, judul("Refleksi Subbab A")),
      tambah("butir", ...kartu("r1", 20, 44, 260, 40, W.hijauMuda, ["1. Aku dapat mengumpulkan data", "sederhana dari lingkungan sekitar"], 8.8)),
      tambah("Butir@2", ...kartu("r2", 20, 100, 260, 40, W.hijauMuda, ["2. Aku dapat menyajikan hasil dengan", "tabel frekuensi sederhana"], 8.8)),
    ),
    k(
      "Buku Panduan Guru mengingatkan kesalahan yang sering terjadi: ada hasil pengamatan yang terlewat atau terhitung dua kali. Turus membantu menghindarinya.",
      bersih(0),
      tambah(0, judul("kesalahan yang sering terjadi")),
      tambah("terlewat", ...kartu("w1", 20, 44, 118, 46, W.merahMuda, ["data terlewat"], 9.4)),
      tambah("terhitung", ...kartu("w2", 162, 44, 118, 46, W.merahMuda, ["terhitung", "dua kali"], 9.4)),
      tambah("Turus", panah("wp", 150, 130, 0, -30, W.hijau, 3, { gambar: true }), teks("wt", 150, 148, "turus membantu menghindarinya", 9.6, W.hijau)),
    ),
    k(
      "Cara mengumpulkan data yang efektif: tidak ada data yang terlewat, dan bila respondennya banyak, catat dulu semuanya, lalu buat tabel frekuensi.",
      bersih(0),
      tambah(0, judul("pengumpulan data yang efektif")),
      tambah("tidak", ...kartu("e1", 14, 50, 82, 44, W.langit, ["tidak ada", "data terlewat"], 8.6)),
      tambah("catat", panah("ea", 98, 72, 18, 0, W.hijau, 2.4, { gambar: true }), ...kartu("e2", 118, 50, 70, 44, W.krem, ["catat dulu", "semuanya"], 8.6)),
      tambah("tabel", panah("eb", 190, 72, 18, 0, W.hijau, 2.4, { gambar: true }), ...kartu("e3", 210, 50, 76, 44, W.hijauMuda, ["buat tabel", "frekuensi"], 8.6)),
    ),
    k(
      "Butir tiga sampai sepuluh tentang piktogram dan diagram batang dipelajari di subbab berikutnya. Sampai jumpa di Subbab B.",
      bersih(0),
      tambah(0, judul("subbab berikutnya")),
      tambah("piktogram", ...kartu("n1", 30, 56, 110, 50, "#E5E7EB", ["piktogram", "Subbab B"], 9.6)),
      tambah("diagram", ...kartu("n2", 160, 56, 110, 50, "#E5E7EB", ["diagram batang", "Subbab C"], 9.6)),
    ),
  ],
};
