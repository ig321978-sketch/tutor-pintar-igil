import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, bentukBebas, emo, kartu, kotak, panah, segiBeraturan, tanda, tandaSisi, teks } from "./k5b4d-gambar";
import { bersih, k, tambah } from "./k5b4d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/* ------------------------------ 1. Pembuka Sub-Bab D (BS hlm. 122; Panduan Guru hlm. 154 dan 116) ------------------------------ */
export const ADEGAN_PEMBUKA_D: AdeganStory = {
  id: "pembuka-d",
  judul: "Pembuka Sub-Bab D: keliling segi banyak",
  sumber: "Buku Siswa hlm. 122; Buku Panduan Guru hlm. 154",
  latar: "#EEF2FF",
  kutipan: [
    "D. Keliling Segi Banyak",
    "penemuan terbimbing terhadap cara-cara menemukan keliling segi banyak",
    "mengingat kembali cara menghitung keliling segi empat beraturan",
    "persegi dan belah ketupat",
    "Eksplorasi 4.4",
    "Ayo Menemukan",
    "Ayo Merangkum",
  ],
  ketukan: [
    k(
      "Selamat datang di Sub-Bab D, Keliling Segi Banyak. Sub-bab ini melanjutkan Bab 4 setelah segitiga dan segi empat. Sumbernya buku siswa halaman 122 sampai 124.",
      tambah(0, jud("Sub-Bab D", 24, 13)),
      tambah("Keliling", teks("sd", 150, 46, "Keliling Segi Banyak", 10.4, W.biru), segiBeraturan("p5", 60, 98, 5, 28), segiBeraturan("p6", 150, 98, 6, 28), segiBeraturan("p8", 240, 98, 8, 28, W.krem)),
      tambah("Keliling", teks("l5", 60, 144, "segi lima", 8.4), teks("l6", 150, 144, "segi enam", 8.4), teks("l8", 240, 144, "segi delapan", 8.4)),
      tambah("melanjutkan", teks("bab", 150, 168, "Bab 4: Keliling Bangun Datar", 9, W.ungu)),
      tambah("halaman", teks("hal", 150, 190, "Buku Siswa hlm. 122 sampai 124", 8.6, W.merah)),
    ),
    k(
      "Pengalaman belajarnya berupa penemuan terbimbing. Siswa menemukan sendiri cara menghitung keliling segi lima beraturan, segi enam beraturan, dan segi delapan beraturan.",
      bersih(0),
      tambah(0, jud("Pengalaman belajar", 20)),
      tambah("penemuan", teks("pt", 150, 192, "penemuan terbimbing", 9.6, W.ungu)),
      tambah("lima", kotak("c5", 10, 34, 88, 140, W.krem, W.biru, { rx: 8 }), segiBeraturan("q5", 54, 86, 5, 26), teks("c5a", 54, 138, "segi lima", 8.6), teks("c5b", 54, 152, "beraturan", 8.6)),
      tambah("enam", kotak("c6", 106, 34, 88, 140, W.muda, W.biru, { rx: 8 }), segiBeraturan("q6", 150, 86, 6, 26), teks("c6a", 150, 138, "segi enam", 8.6), teks("c6b", 150, 152, "beraturan", 8.6)),
      tambah("delapan", kotak("c8", 202, 34, 88, 140, W.hijauMuda, W.biru, { rx: 8 }), segiBeraturan("q8", 246, 86, 8, 26, W.putih), teks("c8a", 246, 138, "segi delapan", 8.6), teks("c8b", 246, 152, "beraturan", 8.6)),
    ),
    k(
      "Siswa diminta mengingat kembali cara menghitung keliling segi empat beraturan, yaitu persegi dan belah ketupat. Pola itu dipakai untuk menemukan keliling segi banyak.",
      bersih(0),
      tambah(0, jud("Ingat dulu: segi empat beraturan", 20, 11)),
      tambah("persegi", kotak("sq", 36, 44, 56, 56, W.hijauMuda, W.biru, { rx: 1, tebal: 2.2 }), teks("sqt", 64, 116, "persegi", 9)),
      tambah("belah", bentukBebas("bk", 190, 72, [[0, -32], [22, 0], [0, 32], [-22, 0]], W.krem), teks("bkt", 190, 116, "belah ketupat", 9)),
      tambah("Pola", teks("rum", 150, 148, "keliling = 4 x sisi", 11, W.merah), panah("pan", 150, 154, 0, 14, W.ungu, 2)),
      tambah("banyak", teks("sb", 150, 188, "dipakai untuk segi banyak", 9.6, W.ungu)),
    ),
    k(
      "Segi banyak yang dipelajari di sini semuanya beraturan, artinya semua sisinya sama panjang. Pada gambar di buku, sisi yang sama panjang diberi tanda garis kecil.",
      bersih(0),
      tambah(0, jud("Segi banyak beraturan", 20)),
      tambah("beraturan", segiBeraturan("g5", 90, 112, 5, 54)),
      tambah("sama", teks("g1", 220, 90, "semua sisi", 10, W.biru), teks("g2", 220, 106, "sama panjang", 10, W.biru)),
      tambah("tanda", tandaSisi("gt", 90, 112, 5, 54), teks("g3", 220, 140, "tanda garis kecil", 9, W.merah), panah("g4", 190, 136, -50, -10, W.merah, 1.6)),
    ),
    k(
      "Kegiatan utamanya Eksplorasi 4.4, Ayo Menemukan, dengan alokasi 2 jam pelajaran. Setelahnya ada Ayo Merangkum dan Refleksi nomor 13, 14, dan 15.",
      bersih(0),
      tambah(0, jud("Rencana Sub-Bab D", 20)),
      tambah("Eksplorasi", baris("r1", 20, 40, 260, "Eksplorasi 4.4: Ayo Menemukan", W.krem, 9.4, 28)),
      tambah("alokasi", kartu("jp", 210, 144, 70, 30, W.hijauMuda, ["2 JP"], 10)),
      tambah("Merangkum", baris("r2", 20, 76, 260, "Ayo Merangkum", W.muda, 9.4, 28)),
      tambah("Refleksi", baris("r3", 20, 112, 260, "Refleksi nomor 13, 14, 15", W.ungMuda, 9.4, 28)),
    ),
  ],
};

/* ------------------------------ 2. Apersepsi (Panduan Guru hlm. 154) ------------------------------ */
export const ADEGAN_APERSEPSI_D: AdeganStory = {
  id: "apersepsi-d",
  judul: "Apersepsi: mengenal segi banyak beraturan",
  sumber: "Buku Panduan Guru hlm. 154",
  latar: "#FFF7ED",
  kutipan: [
    "harus sudah mampu membedakan jenis-jenis segi banyak beraturan",
    "Apa nama segi banyak yang tersaji di buku siswa?",
    "Adakah sisi-sisi yang sama panjang?",
    "Mana saja sisi-sisi yang sama panjang?",
    "langsung mengukur panjang sisi-sisinya dengan menggunakan penggaris",
  ],
  ketukan: [
    k(
      "Sebelum mulai, siswa harus sudah mampu membedakan jenis-jenis segi banyak beraturan. Mereka juga harus sudah bisa menghitung keliling persegi dan belah ketupat.",
      tambah(0, jud("Syarat sebelum belajar", 22)),
      tambah("membedakan", kartu("sy1", 25, 44, 250, 50, W.krem, ["membedakan jenis segi banyak", "beraturan"], 9.2), tanda("sy1c", 262, 72, true)),
      tambah("menghitung", kartu("sy2", 25, 110, 250, 50, W.muda, ["menghitung keliling persegi", "dan belah ketupat"], 9.2), tanda("sy2c", 262, 138, true)),
    ),
    k(
      "Guru membuka dengan tanya jawab. Pertanyaan pertama: apa nama segi banyak yang tersaji di buku siswa?",
      bersih(0),
      tambah(0, jud("Tanya jawab 1", 22)),
      tambah("pertama", segiBeraturan("t5", 90, 108, 5, 48), emo("tq", 90, 112, "❓", 20)),
      tambah("nama", kartu("tb", 160, 70, 124, 70, W.krem, ["Apa nama", "segi banyak ini?"], 10)),
    ),
    k(
      "Pertanyaan kedua: adakah sisi-sisi yang sama panjang? Pertanyaan ketiga: mana saja sisi-sisi yang sama panjang?",
      bersih(0),
      tambah(0, jud("Tanya jawab 2 dan 3", 22)),
      tambah("kedua", segiBeraturan("t6", 90, 108, 6, 48, W.muda)),
      tambah("adakah", kartu("tc", 160, 44, 124, 44, W.krem, ["Adakah sisi yang", "sama panjang?"], 9.2)),
      tambah("ketiga", kartu("td", 160, 106, 124, 44, W.hijauMuda, ["Mana saja sisi yang", "sama panjang?"], 9.2)),
      tambah("mana", tandaSisi("tt", 90, 108, 6, 48)),
    ),
    k(
      "Untuk menjawabnya, siswa langsung mengukur panjang sisi-sisinya memakai penggaris. Kegiatan mengukur ini juga bisa menjadi pemanasan sebelum eksplorasi.",
      bersih(0),
      tambah(0, jud("Pemanasan: mengukur", 22)),
      tambah("mengukur", segiBeraturan("t7", 100, 112, 5, 46), emo("tr", 100, 74, "📏", 26)),
      tambah("penggaris", teks("ts", 218, 94, "ukur tiap sisi", 9.6, W.biru), teks("ts2", 218, 110, "dengan penggaris", 9.6, W.biru)),
      tambah("pemanasan", teks("ts3", 218, 140, "pemanasan", 11, W.ungu)),
    ),
    k(
      "Jadi urutan berpikirnya: kenali nama bangun, periksa sisi yang sama, ukur dengan penggaris, lalu baru hitung keliling.",
      bersih(0),
      tambah(0, jud("Urutan berpikir", 22)),
      tambah("kenali", baris("u1", 30, 38, 240, "1. kenali nama bangun", W.krem, 9.2, 26)),
      tambah("periksa", baris("u2", 30, 70, 240, "2. periksa sisi yang sama", W.muda, 9.2, 26)),
      tambah("ukur", baris("u3", 30, 102, 240, "3. ukur dengan penggaris", W.hijauMuda, 9.2, 26)),
      tambah("hitung", baris("u4", 30, 134, 240, "4. hitung keliling", W.ungMuda, 9.2, 26)),
    ),
  ],
};

/* ------------------------------ 3. Sarana dan persiapan guru (Panduan Guru hlm. 154 dan 155) ------------------------------ */
export const ADEGAN_SARANA_D: AdeganStory = {
  id: "sarana-d",
  judul: "Sarana, media, dan persiapan guru",
  sumber: "Buku Panduan Guru hlm. 154 dan 155",
  latar: "#F0FDF4",
  kutipan: [
    "Alat tulis: pulpen, pensil, penggaris, spidol",
    "LCD Projector dan Power Point Presentation slide (PPT)",
    "dapat menggunakan gambar-gambar cetak yang ditempel di papan tulis",
    "Guru menyiapkan gambar yang diperbesar dari gambar segi lima beraturan",
    "Guru menyiapkan penggaris cadangan",
  ],
  ketukan: [
    k(
      "Alat yang dibutuhkan sederhana: alat tulis berupa pulpen, pensil, penggaris, dan spidol.",
      tambah(0, jud("Alat yang dibutuhkan", 22)),
      tambah("pulpen,", emo("a1", 56, 88, "🖊️", 30), teks("a1t", 56, 112, "pulpen", 8.4)),
      tambah("pensil,", emo("a2", 124, 88, "✏️", 30), teks("a2t", 124, 112, "pensil", 8.4)),
      tambah("penggaris,", emo("a3", 190, 88, "📏", 30), teks("a3t", 190, 112, "penggaris", 8.4)),
      tambah("spidol.", emo("a4", 250, 88, "🖍️", 30), teks("a4t", 250, 112, "spidol", 8.4)),
    ),
    k(
      "Guru memakai proyektor dan slide presentasi yang menampilkan gambar segi banyak beraturan seperti di buku siswa. Guru dapat membuat slide itu sendiri.",
      bersih(0),
      tambah(0, jud("Media: proyektor dan slide", 22)),
      tambah("proyektor", emo("m1", 70, 90, "📽️", 38), teks("m1t", 70, 116, "proyektor", 8.6)),
      tambah("gambar", segiBeraturan("m2", 170, 90, 5, 28), segiBeraturan("m3", 240, 90, 6, 28, W.krem)),
      tambah("sendiri.", teks("m4", 150, 160, "slide dibuat guru sendiri", 9.6, W.ungu)),
    ),
    k(
      "Jika sekolah tidak memiliki sarana tersebut, guru dapat memakai gambar cetak yang ditempel di papan tulis.",
      bersih(0),
      tambah(0, jud("Tanpa proyektor", 22)),
      tambah("Jika", kartu("n1", 20, 60, 100, 70, W.merahMuda, ["tidak ada", "proyektor"], 9.4), tanda("n1x", 108, 74, false)),
      tambah("gambar", panah("n2", 124, 95, 36, 0, W.ungu, 2.4)),
      tambah("papan", kotak("n3", 168, 56, 112, 80, W.putih, W.hijau, { tebal: 2.4 }), teks("n3a", 224, 90, "gambar cetak", 9), teks("n3b", 224, 106, "di papan tulis", 9)),
    ),
    k(
      "Persiapan guru untuk Eksplorasi 4.4: menyiapkan gambar yang diperbesar dari segi lima beraturan, segi enam beraturan, dan segi delapan beraturan yang ada di buku siswa.",
      bersih(0),
      tambah(0, jud("Persiapan Eksplorasi 4.4", 20)),
      tambah("segi", segiBeraturan("v5", 56, 96, 5, 36), teks("v5t", 56, 148, "segi lima", 8.6)),
      tambah("enam", segiBeraturan("v6", 150, 96, 6, 36, W.krem), teks("v6t", 150, 148, "segi enam", 8.6)),
      tambah("delapan", segiBeraturan("v8", 244, 96, 8, 36, W.hijauMuda), teks("v8t", 244, 148, "segi delapan", 8.6)),
    ),
    k(
      "Guru juga menyiapkan penggaris cadangan untuk berjaga-jaga jika ada siswa yang lupa membawa penggaris.",
      bersih(0),
      tambah(0, jud("Penggaris cadangan", 22)),
      tambah("penggaris", emo("pc1", 90, 100, "📏", 44)),
      tambah("lupa", emo("pc2", 210, 98, "🙋", 40), teks("pc3", 210, 128, "lupa membawa", 9, W.merah)),
      tambah("berjaga-jaga", panah("pc4", 120, 100, 54, 0, W.ungu, 2.4)),
    ),
  ],
};
