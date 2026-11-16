import type { AdeganStory, Aksi } from "./logika-story";
import { W, barisFrek, emo, idBarisFrek, judul, kartu, kepalaFrek, panah, tabel, teks } from "./k5b8a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8a-bantu";

/* ------------------------------ 9. Latihan bersama: mengumpulkan data sendiri ------------------------------ */
const KOL_SEPATU = [80, 90, 50];
const barisSepatu = (r: number, ukuran: string, n: number | null) => barisFrek("sp", 40, 36, r, ukuran, n, KOL_SEPATU, 16, 8.4);

export const ADEGAN_SEPATU: AdeganStory = {
  id: "ekspl-81b",
  judul: "Latihan bersama: data ukuran sepatu",
  sumber: "Materi: data ukuran sepatu",
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
      "Sekarang giliran kalian mengumpulkan data sendiri, yaitu ukuran sepatu teman sekelas, secara berkelompok.",
      tambah(0, judul("Latihan bersama")),
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
      "Sebagai contoh buatan kita sendiri: sepuluh anak dengan ukuran tiga puluh dua satu anak, tiga puluh tiga tiga anak, tiga puluh empat tiga anak, tiga puluh lima dua anak, dan tiga puluh enam satu anak.",
      bersih(0),
      tambah(0, judul("contoh buatan sendiri")),
      tambah(0, ...kepalaFrek("sp", 40, 36, ["Ukuran Sepatu", "Turus", "Frekuensi"], KOL_SEPATU, 16, 8)),
      tambah(11, ...barisSepatu(1, "32", 1)),
      tambah(16, ...barisSepatu(2, "33", 3)),
      tambah(21, ...barisSepatu(3, "34", 3)),
      tambah(26, ...barisSepatu(4, "35", 2)),
      tambah(32, ...barisSepatu(5, "36", 1)),
    ),
    k(
      "Jumlah frekuensinya satu ditambah tiga ditambah tiga ditambah dua ditambah satu, yaitu sepuluh, sama dengan banyak anak. Ukuran tiga puluh tiga dan tiga puluh empat paling banyak, jadi pedagang membawa keduanya paling banyak.",
      tambah("Jumlah", teks("jm", 150, 146, "1 + 3 + 3 + 2 + 1 = 10", 10, W.ungu)),
      sorotkan(20, "sp-r2a", "sp-r2b", "sp-r2c"),
      sorotkan(24, "sp-r3a", "sp-r3b", "sp-r3c"),
      tambah("pedagang", teks("pj", 150, 170, "bawa banyak ukuran 33 dan 34", 9.4, W.hijau)),
    ),
    k(
      "Kalian juga boleh mengganti jenis datanya, misalnya acara televisi favorit atau makanan favorit. Bila yang ditanya banyak orang, catat dulu semuanya, baru buat tabel frekuensi.",
      bersih(0),
      tambah(0, judul("boleh ganti jenis data")),
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
  judul: "Latihan: nilai ulangan Matematika SD Mekarsari",
  sumber: "Materi: tabel frekuensi nilai ulangan",
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
      "Sekarang Latihan satu. Ini data nilai ulangan Matematika siswa kelas lima SD Mekarsari: ada dua puluh lima nilai, dari empat puluh sampai seratus.",
      tambah(0, judul("Latihan: 25 nilai ulangan")),
      tambah("data", ...barisData(0)),
      tambah("siswa", ...barisData(1)),
      tambah("ada", ...barisData(2)),
    ),
    k(
      "Pertanyaan satu: lengkapi tabel frekuensi dengan kolom nilai, turus, dan frekuensi. Nilai yang muncul adalah empat puluh, lima puluh, enam puluh, tujuh puluh, delapan puluh, sembilan puluh, dan seratus.",
      tambah("lengkapi", ...kepalaFrek("tl", 40, 66, ["Nilai", "Turus", "Frekuensi"], KOL_NILAI, 13, 7.4)),
      ...FREK_NILAI.map(([nama], i): Aksi => tambah([15, 17, 19, 21, 23, 25, 28][i], ...barisNilai(i + 1, nama, null))),
    ),
    k(
      "Hitung satu per satu. Nilai empat puluh muncul dua kali, nilai lima puluh muncul satu kali, dan nilai enam puluh muncul lima kali.",
      ...isiNilai(8, 1),
      ...isiNilai(14, 2),
      ...isiNilai(21, 3),
    ),
    k(
      "Nilai tujuh puluh muncul enam kali, nilai delapan puluh muncul tujuh kali, nilai sembilan puluh muncul tiga kali, dan nilai seratus muncul satu kali.",
      ...isiNilai(4, 4),
      ...isiNilai(10, 5),
      ...isiNilai(16, 6),
      ...isiNilai(22, 7),
    ),
    k(
      "Periksa jumlahnya: dua ditambah satu ditambah lima ditambah enam ditambah tujuh ditambah tiga ditambah satu adalah dua puluh lima, sama dengan banyaknya nilai.",
      tambah("Periksa", teks("eq", 150, 186, "2 + 1 + 5 + 6 + 7 + 3 + 1 = 25", 9.6, W.ungu)),
    ),
    k(
      "Latihan dua dan tiga: nilai tertinggi adalah seratus, dan hanya satu siswa yang mendapat nilai seratus.",
      hapus(0, "eq"),
      sorotkan("tertinggi", "tl-r7a", "tl-r7b", "tl-r7c"),
      tambah("hanya", teks("tt", 150, 186, "tertinggi 100, ada 1 siswa", 9.6, W.hijau)),
    ),
    k(
      "Latihan empat: siswa dengan nilai kurang dari tujuh puluh mengikuti remedi, yaitu nilai empat puluh, lima puluh, dan enam puluh. Banyaknya dua ditambah satu ditambah lima, yaitu delapan siswa.",
      hapus(0, "tt"),
      sorotkan(13, "tl-r1a", "tl-r1b", "tl-r1c"),
      sorotkan(15, "tl-r2a", "tl-r2b", "tl-r2c"),
      sorotkan(18, "tl-r3a", "tl-r3b", "tl-r3c"),
      tambah("Banyaknya", teks("rm", 150, 186, "2 + 1 + 5 = 8", 9.6, W.merah), teks("rn", 232, 186, "8 siswa remedi", 8, W.merah)),
    ),
  ],
};

/* ------------------------------ 11. Pesan guru: hati-hati, tantangan, dan renungan ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi",
  judul: "Hati-hati, tantangan, dan renungan",
  sumber: "Materi: pesan guru dan renungan",
  latar: "#F0F9FF",
  kutipan: [
    "Setelah mempelajari materi terkait data, isilah tabel berikut sesuai",
    "Aku dapat mengumpulkan data sederhana dari",
    "lingkungan sekitar",
    "Aku dapat menyajikan hasil pengumpulan data",
  ],
  ketukan: [
    k(
      "Hati-hati, ada kesalahan yang sering terjadi: hasil pengamatan terlewat atau terhitung dua kali. Turus membantu kita menghindarinya.",
      tambah(0, judul("hati-hati: kesalahan umum")),
      tambah("terlewat", ...kartu("w1", 20, 44, 118, 46, W.merahMuda, ["data terlewat"], 9.4)),
      tambah("terhitung", ...kartu("w2", 162, 44, 118, 46, W.merahMuda, ["terhitung", "dua kali"], 9.4)),
      tambah("Turus", panah("wp", 150, 130, 0, -30, W.hijau, 3, { gambar: true }), teks("wt", 150, 148, "turus membantu menghindarinya", 9.6, W.hijau)),
    ),
    k(
      "Cara mengumpulkan data yang efektif: tidak ada data yang terlewat, dan bila yang ditanya banyak orang, catat dulu semuanya, lalu buat tabel frekuensi.",
      bersih(0),
      tambah(0, judul("pengumpulan data yang efektif")),
      tambah("tidak", ...kartu("e1", 14, 50, 82, 44, W.langit, ["tidak ada", "data terlewat"], 8.6)),
      tambah("catat", panah("ea", 98, 72, 18, 0, W.hijau, 2.4, { gambar: true }), ...kartu("e2", 118, 50, 70, 44, W.krem, ["catat dulu", "semuanya"], 8.6)),
      tambah("tabel", panah("eb", 190, 72, 18, 0, W.hijau, 2.4, { gambar: true }), ...kartu("e3", 210, 50, 76, 44, W.hijauMuda, ["buat tabel", "frekuensi"], 8.6)),
    ),
    k(
      "Tantangan untuk kalian: tanyai teman-temanmu tentang makanan favorit, catat jawabannya dengan turus, lalu buat tabel frekuensi. Makanan apa yang paling banyak dipilih?",
      bersih(0),
      tambah(0, judul("Tantangan")),
      tambah("makanan", emo("tc1", 90, 80, "🍜", 34), emo("tc2", 150, 80, "🍗", 34), emo("tc3", 210, 80, "🍌", 34)),
      tambah("turus,", ...kartu("tc4", 40, 122, 220, 28, W.krem, ["catat dengan turus"], 9.4)),
      tambah("tabel", ...kartu("tc5", 40, 158, 220, 28, W.hijauMuda, ["buat tabel frekuensi"], 9.4)),
    ),
    k(
      "Renungan untuk dirimu sendiri. Aku dapat mengumpulkan data sederhana dari lingkungan sekitar. Aku juga dapat menyajikan hasilnya dengan tabel frekuensi sederhana. Teruslah semangat belajar!",
      bersih(0),
      tambah(0, judul("Renungan")),
      tambah("mengumpulkan", ...kartu("r1", 20, 44, 260, 40, W.hijauMuda, ["Aku dapat mengumpulkan data", "sederhana dari lingkungan sekitar"], 8.8)),
      tambah("menyajikan", ...kartu("r2", 20, 100, 260, 40, W.hijauMuda, ["Aku dapat menyajikan hasil dengan", "tabel frekuensi sederhana"], 8.8)),
      tambah("semangat", teks("rs", 150, 170, "Hebat! Teruslah belajar", 10.4, W.ungu)),
    ),
  ],
};
