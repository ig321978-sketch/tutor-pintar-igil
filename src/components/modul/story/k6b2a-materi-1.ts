import type { AdeganStory } from "./logika-story";
import { W, balon, bibit, bulat, cemara, deret, emo, garis, kartu, kotak, panah, pucukMerah, teks } from "./k6b2a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k6b2a-bantu";

/* ------------------------------ 1. Poster Gerakan Satu Juta Pohon dan Pak Wayan (hlm. 46 dan 47) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-pohon",
  judul: "Poster Gerakan Satu Juta Pohon",
  sumber: "Buku Siswa hlm. 46–47",
  latar: "#F0FDF4",
  kutipan: [
    "Gerakan Satu Juta Pohon",
    "kalau gerakan satu juta pohon diperingati setiap tanggal 10 Januari",
    "Pak Wayan, guru Matematika",
    "memperhatikan jarak antar bibit pohon tersebut",
    "dapat menerapkan konsep rasio",
    "Rasio adalah perbandingan dua besaran yang sama",
  ],
  ketukan: [
    k(
      "Bab 2 Rasio dimulai di sekolah. Beberapa siswa sedang melihat poster Gerakan Satu Juta Pohon yang ditempel di dinding.",
      tambah(0, teks("jud", 150, 24, "Bab 2 Rasio", 13, W.ungu)),
      tambah("siswa", emo("s1", 50, 170, "👦", 30), emo("s2", 250, 170, "👧", 30)),
      tambah("poster", kotak("ps", 85, 40, 130, 92, W.krem, W.coklat, { rx: 4 }), teks("p1", 150, 62, "Gerakan", 11, W.hijau)),
      tambah("Satu", teks("p2", 150, 80, "Satu Juta Pohon", 11, W.hijau)),
      tambah("Pohon", emo("pe", 150, 116, "🌳", 24)),
    ),
    k(
      "Pak Wayan, guru Matematika, mendekati mereka. Gerakan itu diperingati setiap tanggal 10 Januari untuk menyelamatkan hutan dan melestarikan lingkungan.",
      bersih(0),
      tambah("Wayan", emo("wy", 60, 120, "👨", 34), teks("wyt", 60, 142, "Pak Wayan", 8.4)),
      tambah("tanggal", kotak("kal", 150, 40, 90, 74, W.putih, W.merah, { rx: 6 }), kotak("kalh", 150, 40, 90, 20, W.merah, W.merah, { rx: 6 }), teks("kal1", 195, 100, "10", 28, W.merah), teks("kal2", 195, 55, "Januari", 11, W.putih)),
      tambah("hutan", emo("h1", 180, 168, "🌲", 28), emo("h2", 215, 168, "🌳", 28), emo("h3", 250, 168, "🌲", 28)),
      tambah("lingkungan.", teks("lg", 215, 192, "selamatkan hutan", 8.6, W.hijau)),
    ),
    k(
      "Sekolah kita ikut berpartisipasi. Besok semua siswa akan menanam bibit pohon bersama-sama di kebun sekolah.",
      bersih(0),
      tambah("Sekolah", emo("sk", 150, 52, "🏫", 34), teks("skt", 150, 70, "sekolah ikut serta", 9)),
      tambah("Besok", teks("bs", 150, 100, "besok: menanam bibit", 10, W.ungu)),
      tambah("bibit", deret("bb", 70, 150, 5, 40, (id, x, y) => bibit(id, x, y))),
      tambah("kebun", kotak("tnh", 30, 152, 240, 14, "#A16207", "#78350F", { rx: 3 })),
    ),
    k(
      "Dalam menanam bibit, kita harus memperhatikan jarak antar bibit pohon. Jarak memberi ruang agar pohon tumbuh dengan baik.",
      bersih(0),
      tambah(0, teks("jt", 150, 30, "jarak antar bibit", 12, W.ungu)),
      tambah("bibit,", cemara("pa", 70, 140), cemara("pb", 230, 140)),
      tambah("jarak", panah("ja", 76, 150, 148, 0, W.merah, 2.5, { gambar: true }), teks("jat", 150, 172, "jarak", 10, W.merah)),
      tambah("ruang", kotak("ru", 100, 90, 100, 52, "none", W.hijau, { putus: true, rx: 6 }), teks("rut", 150, 118, "ruang", 9, W.hijau)),
    ),
    k(
      "Kita juga dapat mengatur susunan penanaman bibit berdasarkan jenisnya. Pengaturan jumlah bibit dan jarak ini menerapkan konsep rasio.",
      bersih(0),
      tambah("susunan", deret("pm", 60, 110, 2, 28, (id, x, y) => pucukMerah(id, x, y))),
      tambah("berdasarkan", deret("cm", 130, 110, 3, 28, (id, x, y) => cemara(id, x, y))),
      tambah("jumlah", teks("jt1", 74, 140, "jenis A", 9, W.merah), teks("jt2", 158, 140, "jenis B", 9, W.hijau)),
      tambah("rasio.", kotak("rs", 90, 160, 120, 28, W.krem, W.ungu, { rx: 8 }), teks("rst", 150, 179, "konsep rasio", 12, W.ungu)),
    ),
    k(
      "Seorang siswa bertanya, apa yang dimaksud dengan rasio, Pak? Pak Wayan menjawab, rasio adalah perbandingan dua besaran yang sama.",
      bersih(0),
      tambah("siswa", emo("q1", 50, 150, "👧", 32), balon("bq", 100, 40, ["apa itu rasio, Pak?"], 110, W.putih, 8)),
      tambah("Wayan", emo("q2", 250, 150, "👨", 32), balon("bw", 200, 90, ["rasio: perbandingan", "dua besaran yang sama"], 140, "#FEF9C3", 7.4)),
    ),
    k(
      "Mengapa harus memperhatikan jarak, Pak? Mari kita pelajari bab ini untuk memahami kegunaan rasio dalam kehidupan sehari-hari.",
      bersih(0),
      tambah("Mengapa", balon("bm", 100, 28, ["mengapa harus", "memperhatikan jarak?"], 120, W.putih, 8), emo("m1", 50, 120, "🙋", 30)),
      tambah("pelajari", panah("mp", 150, 120, 60, 0, W.hijau, 3, { gambar: true }), emo("mb", 250, 130, "📘", 40)),
      tambah("kegunaan", teks("mk", 150, 184, "kegunaan rasio sehari-hari", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Tujuan, pertanyaan pemantik, kata kunci, peta konsep (hlm. 48 dan 49) ------------------------------ */
const kartuTujuan = (id: string, y: number, nomor: string, baris: string[]) => [
  kotak(`${id}-k`, 14, y, 272, 40, W.krem, W.biru, { rx: 10 }),
  bulat(`${id}-n`, 34, y + 20, 11, W.biru, W.biru),
  teks(`${id}-nt`, 34, y + 24, nomor, 11, W.putih),
  ...baris.map((b, i) => teks(`${id}-b${i}`, 164, y + (baris.length === 1 ? 24 : 17 + i * 12), b, 8.4)),
];

export const ADEGAN_TUJUAN: AdeganStory = {
  id: "tujuan-peta",
  judul: "Tujuan, pertanyaan pemantik, kata kunci, dan peta konsep",
  sumber: "Buku Siswa hlm. 48–49",
  latar: "#FFF7ED",
  kutipan: [
    "memahami konsep rasio dan menggunakan bahasa rasio untuk menjelaskan hubungan perbandingan antara dua besaran",
    "menentukan kesamaan rasio dengan menggunakan tabel rasio",
    "menentukan rasio satuan",
    "menentukan rasio bagian terhadap bagian dan rasio bagian terhadap keseluruhan",
    "Bagaimana memodelkan permasalahan ke dalam tabel rasio",
    "Rasio, kesamaan rasio, rasio pada durasi waktu, rasio satuan, kotak rasio, tabel rasio",
    "Peta Konsep",
  ],
  ketukan: [
    k(
      "Bab ini punya empat tujuan. Pertama, memahami konsep rasio dan memakai bahasa rasio untuk menjelaskan perbandingan antara dua besaran.",
      tambah(0, teks("tj", 150, 22, "Tujuan Pembelajaran", 12, W.ungu)),
      tambah("Pertama", kartuTujuan("t1", 34, "1", ["konsep rasio dan", "bahasa rasio"])),
    ),
    k(
      "Kedua, menentukan kesamaan rasio dengan tabel rasio. Ketiga, menentukan rasio satuan. Keempat, menentukan rasio bagian terhadap bagian dan bagian terhadap keseluruhan.",
      tambah("Kedua", kartuTujuan("t2", 77, "2", ["kesamaan rasio", "dengan tabel rasio"])),
      tambah("Ketiga", kartuTujuan("t3", 120, "3", ["rasio satuan"])),
      tambah("Keempat", kartuTujuan("t4", 163, "4", ["bagian terhadap bagian,", "bagian terhadap keseluruhan"])),
    ),
    k(
      "Ada pula pertanyaan pemantik. Bagaimana menyatakan rasio dari dua besaran yang berbeda? Bagaimana memodelkan permasalahan ke dalam tabel rasio?",
      bersih(0),
      tambah(0, teks("pj", 150, 26, "Pertanyaan Pemantik", 12, W.ungu)),
      tambah("menyatakan", kartu("pm1", 20, 44, 260, 44, "#DBEAFE", ["Bagaimana menyatakan rasio", "dari dua besaran berbeda?"], 8.8)),
      tambah("memodelkan", kartu("pm2", 20, 100, 260, 44, "#DCFCE7", ["Bagaimana memodelkan masalah", "ke dalam tabel rasio?"], 8.8)),
      tambah("tabel", emo("pmt", 150, 180, "❓", 24)),
    ),
    k(
      "Kata kuncinya adalah rasio, kesamaan rasio, rasio pada durasi waktu, rasio satuan, kotak rasio, dan tabel rasio.",
      bersih(0),
      tambah(0, teks("kj", 150, 26, "Kata Kunci", 12, W.ungu)),
      tambah("rasio,", kartu("kk1", 30, 44, 110, 26, "#FED7AA", ["rasio"], 9)),
      tambah("kesamaan", kartu("kk2", 160, 44, 110, 26, "#FED7AA", ["kesamaan rasio"], 9)),
      tambah("durasi", kartu("kk3", 30, 84, 110, 26, "#FED7AA", ["rasio durasi waktu"], 8)),
      tambah("satuan,", kartu("kk4", 160, 84, 110, 26, "#FED7AA", ["rasio satuan"], 9)),
      tambah("kotak", kartu("kk5", 30, 124, 110, 26, "#FED7AA", ["kotak rasio"], 9)),
      tambah("tabel", kartu("kk6", 160, 124, 110, 26, "#FED7AA", ["tabel rasio"], 9)),
    ),
    k(
      "Peta konsep bab ini bercabang tiga. Subbab A tentang konsep rasio, subbab B tentang kesamaan rasio, dan subbab C tentang penerapan rasio.",
      bersih(0),
      tambah("Peta", kartu("pk0", 105, 20, 90, 30, "#FDE68A", ["Rasio"], 12)),
      tambah("Subbab", garis("pg1", 130, 50, -60, 40, W.biru, 1.8, { gambar: true }), kartu("pkA", 10, 92, 86, 44, "#BBF7D0", ["A", "Konsep Rasio"], 8.6)),
      tambah("subbab@2", garis("pg2", 150, 50, 0, 42, W.biru, 1.8, { gambar: true }), kartu("pkB", 107, 92, 86, 44, "#BFDBFE", ["B", "Kesamaan Rasio"], 8.6)),
      tambah("subbab@3", garis("pg3", 170, 50, 60, 40, W.biru, 1.8, { gambar: true }), kartu("pkC", 204, 92, 86, 44, "#FBCFE8", ["C", "Penerapan Rasio"], 8.6)),
    ),
    k(
      "Subbab A, yang kita pelajari sekarang, memuat dua hal, yaitu membandingkan benda dan pengertian rasio.",
      sorotkan("Subbab", "pkA-k"),
      tambah("membandingkan", kartu("pkA1", 8, 150, 100, 26, W.putih, ["membandingkan benda"], 7.4)),
      tambah("pengertian", kartu("pkA2", 8, 180, 100, 24, W.putih, ["pengertian rasio"], 7.4)),
    ),
  ],
};

/* ------------------------------ 3. Mengingat kembali: faktor, kelipatan, dan pecahan (hlm. 49) ------------------------------ */
export const ADEGAN_MENGINGAT: AdeganStory = {
  id: "mengingat-faktor",
  judul: "Ayo mengingat kembali faktor, kelipatan, dan pecahan",
  sumber: "Buku Siswa hlm. 49",
  latar: "#F5F3FF",
  kutipan: [
    "operasi hitung perkalian dan pembagian bilangan bulat, serta faktor dan kelipatan dari suatu bilangan",
    "Apakah perbedaan dari faktor dan kelipatan suatu bilangan",
    "Apakah 2 merupakan faktor atau kelipatan dari 10",
    "Sebutkan tiga bilangan yang merupakan kelipatan dari bilangan 6",
    "Tuliskan bentuk pecahan yang mewakili bagian yang hilang pada Gambar 2.2",
  ],
  ketukan: [
    k(
      "Sebelum mulai, kita ingat dulu perkalian dan pembagian bilangan bulat, serta faktor dan kelipatan. Semuanya akan dipakai dalam rasio.",
      tambah(0, teks("mj", 150, 24, "Ayo Mengingat Kembali", 12, W.ungu)),
      tambah("perkalian", kartu("ma", 20, 50, 125, 40, "#FDE68A", ["perkalian dan", "pembagian"], 9)),
      tambah("faktor", kartu("mb", 155, 50, 125, 40, "#BBF7D0", ["faktor dan", "kelipatan"], 9)),
      tambah("rasio.", panah("mp", 150, 100, 0, 30, W.hijau, 3, { gambar: true }), teks("mr", 150, 152, "dipakai dalam rasio", 10, W.hijau)),
    ),
    k(
      "Apakah 2 merupakan faktor atau kelipatan dari 10? Karena 10 dapat dibagi habis oleh 2, maka 2 adalah faktor dari 10.",
      bersih(0),
      tambah(0, teks("fq", 150, 30, "faktor atau kelipatan?", 11, W.ungu)),
      tambah("2", teks("f2", 70, 80, "2", 30, W.merah), teks("f10", 230, 80, "10", 30, W.biru)),
      tambah("dibagi", teks("fb", 150, 120, "10 dibagi 2 habis", 11, W.hijau)),
      tambah("faktor@2", kotak("ff", 80, 140, 140, 30, W.krem, W.hijau, { rx: 8 }), teks("fft", 150, 160, "2 adalah faktor 10", 10, W.hijau)),
    ),
    k(
      "Kelipatan adalah hasil kali berurutan suatu bilangan. Tiga bilangan yang merupakan kelipatan dari 6 adalah 6, 12, dan 18.",
      bersih(0),
      tambah(0, teks("kj", 150, 30, "kelipatan dari 6", 12, W.ungu)),
      tambah("6,", kartu("k1", 30, 70, 60, 50, "#BFDBFE", ["6"], 18)),
      tambah("12,", kartu("k2", 120, 70, 60, 50, "#BFDBFE", ["12"], 18)),
      tambah("18.", kartu("k3", 210, 70, 60, 50, "#BFDBFE", ["18"], 18), panah("ka", 92, 95, 26, 0, W.merah, 2.5, { gambar: true }), panah("kb", 182, 95, 26, 0, W.merah, 2.5, { gambar: true }), teks("kc", 150, 160, "6 kali 1, 6 kali 2, 6 kali 3", 9.5, W.hijau)),
    ),
    k(
      "Kita juga sudah belajar pecahan. Pecahan menunjukkan bagian dari seluruh gambar. Contohnya 1 per 3 sama nilainya dengan 2 per 6.",
      bersih(0),
      tambah(0, teks("pj", 150, 26, "pecahan: bagian dari seluruh", 11, W.ungu)),
      tambah("Contohnya", ...[0, 1, 2].map((i) => kotak(`b3${i}`, 50 + i * 40, 46, 40, 30, i === 0 ? "#FCA5A5" : W.putih, W.biru, { rx: 0 })), teks("p3", 110, 96, "1 per 3", 11)),
      tambah("2", ...[0, 1, 2, 3, 4, 5].map((i) => kotak(`b6${i}`, 50 + i * 20, 116, 20, 30, i < 2 ? "#FCA5A5" : W.putih, W.biru, { rx: 0 })), teks("p6", 110, 168, "2 per 6", 11)),
    ),
    k(
      "Pecahan senilai seperti ini nanti berguna untuk rasio. Sekarang kita mulai dari belanja bibit pohon.",
      hapus(0, "pj"),
      tambah("senilai", teks("sn", 240, 100, "senilai", 11, W.hijau), teks("sn2", 240, 118, "sama besar", 9, W.hijau)),
      tambah("belanja", emo("bj", 240, 164, "🛒", 28)),
    ),
  ],
};
