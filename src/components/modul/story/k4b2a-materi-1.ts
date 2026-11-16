import type { AdeganStory } from "./logika-story";
import { W, barisTabel, bulat, emo, garis, judul, kartu, lingkaranBagi, panah, pecahan, teks } from "./k4b2a-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b2a-bantu";

/* ------------------------------ 1. Pembuka bab dan tujuan (Buku Siswa hlm. 55–56; Panduan Guru hlm. 89) ------------------------------ */
const SUARA_P1 = "Selamat datang di bab dua, Pecahan. Sampul bab menampilkan seorang ibu memotong pizza. Satu pizza dipotong menjadi beberapa bagian yang sama, dan potongan itu bagian dari keseluruhan. Berapa bagian yang kalian dapatkan?";
const SUARA_P2 = "Tujuan pembelajaran di Buku Siswa ada sepuluh butir. Lima butir pertama membahas pembilang satu, penyebut sama, dan pecahan senilai. Lima butir berikutnya membahas pecahan desimal dan persen. Subbab A memakai dua butir pertama.";
const SUARA_P3 = "Dua butir yang dikerjakan subbab A: pertama, membandingkan dua pecahan dengan pembilang satu. Kedua, mengurutkan beberapa pecahan dengan pembilang satu.";
const SUARA_P4 = "Panduan guru merumuskan tujuh tujuan. Bagian subbab A adalah tujuan satu titik satu, membandingkan dua pecahan dengan pembilang satu, dan satu titik dua, mengurutkan antarpecahan dengan pembilang satu.";
const SUARA_P5 = "Kata kunci bab ini ada tiga: pecahan, pecahan desimal, dan persen. Subbab A berfokus pada kata pertama, yaitu pecahan.";

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 2: pizza dan tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 55–56; Panduan Guru hlm. 89",
  latar: "#FFF7ED",
  kutipan: [
    "Pernahkah kalian melihat Ibu memotong pizza?",
    "Jika satu pizza dipotong menjadi beberapa bagian yang sama, maka akan diperoleh potongan-potongan.",
    "Potongan itu merupakan bagian dari keseluruhan pizza.",
    "Berapa bagian yang kalian dapatkan?",
    "Tujuan Pembelajaran",
    "Setelah mempelajari bab ini kalian mampu:",
    "membandingkan dua pecahan dengan pembilang satu",
    "mengurutkan beberapa pecahan dengan pembilang satu",
    "mengenali pecahan senilai setelah mengamati gambar dan simbol matematika",
    "Kata Kunci",
    "Pecahan, pecahan desimal, persen",
    "1. Tujuan Pembelajaran",
    "Setelah mempelajari bab ini, peserta didik diharapkan dapat:",
    "1.1 membandingkan dua pecahan dengan pembilang satu",
    "1.2 mengurutkan antar pecahan dengan pembilang satu",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bab 2: Pecahan")),
      tambah("memotong", ...lingkaranBagi("pz", 92, 100, 52, 8, 0, W.jingga)),
      tambah("potongan", { id: "pzb", t: "teks", x: 92, y: 168, isi: "satu potongan", u: 8.6, warna: W.coklat }),
      ubah("potongan", { id: "pz-j0", warna: W.emas }),
      tambah("Berapa", teks("pq", 222, 112, "?", 52, W.merah), ...kartu("pr", 168, 140, 120, 46, W.langit, ["berapa bagian", "yang kalian dapatkan?"], 8.8)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tujuan pembelajaran (Buku Siswa)")),
      tambah("Lima", ...kartu("t1", 14, 32, 272, 44, W.hijauMuda, ["5 butir pertama:", "pembilang satu, penyebut sama, senilai"], 8.8)),
      tambah("berikutnya", ...kartu("t2", 14, 84, 272, 44, W.krem, ["5 butir berikutnya:", "pecahan desimal dan persen"], 8.8, { op: 0.55 })),
      tambah("Subbab", ...kartu("t3", 14, 138, 272, 34, W.emas, ["total 10 butir; subbab A: 2 butir pertama"], 8.8)),
      sorotkan("memakai", "t1-k"),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Tujuan yang dikerjakan subbab A")),
      tambah("pertama,", ...kartu("u1", 14, 40, 272, 50, W.hijauMuda, ["1. membandingkan dua pecahan", "dengan pembilang satu"], 9.2)),
      tambah("Kedua,", ...kartu("u2", 14, 104, 272, 50, W.langit, ["2. mengurutkan beberapa pecahan", "dengan pembilang satu"], 9.2)),
      tambah("mengurutkan", emo("u3", 150, 184, "📚", 22)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Tujuan menurut Panduan Guru")),
      tambah("tujuh", ...kartu("g3", 14, 150, 272, 32, W.krem, ["7 tujuan; 1.3 sampai 1.7 untuk subbab lain"], 8.6, { op: 0.55 })),
      tambah("satu", ...kartu("g1", 14, 32, 272, 50, W.hijauMuda, ["1.1 membandingkan dua pecahan", "dengan pembilang satu"], 9)),
      tambah("mengurutkan", ...kartu("g2", 14, 90, 272, 50, W.langit, ["1.2 mengurutkan antar pecahan", "dengan pembilang satu"], 9)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Kata kunci")),
      tambah("tiga:", ...kartu("kk1", 10, 44, 86, 44, W.hijauMuda, ["Pecahan"], 10)),
      tambah(idx(SUARA_P5, "pecahan", 2), ...kartu("kk2", 107, 44, 86, 44, W.krem, ["pecahan", "desimal"], 9.4, { op: 0.55 })),
      tambah("persen.", ...kartu("kk3", 204, 44, 86, 44, W.pink, ["persen"], 10, { op: 0.55 })),
      tambah("Subbab", ...kartu("kk4", 40, 112, 220, 40, W.emas, ["subbab A: pecahan"], 10)),
      sorotkan("pertama,", "kk1-k"),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, gambaran umum, keterampilan, skema (Buku Siswa hlm. 57; Panduan Guru hlm. 90–92) ------------------------------ */
const SUARA_K1 = "Peta konsep dimulai dari Pecahan. Dari sana ada beberapa cabang, dan cabang Pembilang Satu menuju kotak Mengurutkan dan Membandingkan. Cabang lainnya dipelajari di subbab berikutnya.";
const SUARA_K2 = "Gambaran umum di panduan guru: bilangan pecahan adalah bagian dari satu keseluruhan dari suatu kuantitas tertentu. Pembelajaran dimulai dari masalah kontekstual yang dilengkapi gambar.";
const SUARA_K3 = "Murid mengamati gambar dan membaca wacana yang berisi contoh kasus sehari-hari. Keterampilan yang dilatih ada dua: menghitung dan berkomunikasi.";
const SUARA_K4 = "Skema pembelajaran: topik A, pecahan dengan pembilang satu, diberi sepuluh jam pelajaran. Pokok materinya membandingkan dan mengurutkan pecahan pembilang satu, dengan metode diskusi dan Aktivitas satu: pecahan.";

const CABANG: [string, string, string][] = [
  ["Pembilang", "Satu", "cb1"],
  ["Penyebut", "yang sama", "cb2"],
  ["Pecahan", "Senilai", "cb3"],
  ["Pecahan", "Desimal", "cb4"],
];

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, gambaran umum, dan skema pembelajaran",
  sumber: "Buku Siswa hlm. 57; Panduan Guru hlm. 90–92",
  latar: "#F0FDF4",
  kutipan: [
    "Peta Konsep",
    "Pembilang Satu",
    "Mengurutkan dan Membandingkan",
    "A. Pecahan dengan Pembilang Satu",
    "2. Peta Konsep",
    "3. Gambaran Umum Bab",
    "bilangan pecahan adalah bagian dari satu keseluruhan dari suatu kuantitas tertentu.",
    "menyajikan masalah kontekstual",
    "peserta didik diarahkan untuk memperhatikan gambar dan membaca wacana yang disajikan.",
    "4. Keterampilan yang Dilatih",
    "1. Menghitung",
    "2. Berkomunikasi",
    "5. Skema Pembelajaran",
    "Tabel 2.1 Skema Pembelajaran",
    "Topik A: Pecahan dengan pembilang satu",
    "10 JP",
    "Membandingkan pecahan pembilang satu",
    "Mengurutkan pecahan pembilang satu",
    "Metode: Diskusi",
    "Aktivitas 1: pecahan",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Peta konsep")),
      tambah("Pecahan.", ...kartu("pg", 100, 26, 100, 24, W.emas, ["Pecahan"], 9.6)),
      ...CABANG.map(([a, b, id], i) => tambah("cabang", ...kartu(id, 6 + i * 73, 74, 70, 30, W.hijauMuda, [a, b], 7.6, i === 0 ? {} : { op: 0.45 }), panah(`${id}-p`, 150, 50, 41 + i * 73 - 150, 24, W.biru, 1.4, i === 0 ? {} : { op: 0.45 }))),
      tambah("Mengurutkan", ...kartu("kb", 6, 130, 140, 36, W.langit, ["Mengurutkan dan", "Membandingkan"], 8.4), panah("kbp", 41, 104, 0, 26, W.biru, 1.6)),
      sorotkan("Pembilang", "cb1-k"),
      tambah("lainnya", teks("kc", 224, 140, "subbab berikutnya", 8, W.coklat), teks("kd", 224, 152, "(abu-abu)", 8, W.coklat)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Gambaran umum bab")),
      tambah("bilangan", ...kartu("gu1", 14, 32, 272, 50, W.hijauMuda, ["bilangan pecahan: bagian dari satu", "keseluruhan suatu kuantitas"], 9)),
      tambah("Pembelajaran", ...kartu("gu2", 14, 92, 272, 38, W.langit, ["mulai dari masalah kontekstual"], 9.2)),
      tambah("gambar.", ...lingkaranBagi("gu3", 150, 160, 24, 4, 1, W.jingga)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Wacana dan keterampilan")),
      tambah("mengamati", emo("kt1", 60, 70, "👀", 30), teks("kt1t", 60, 92, "amati gambar", 8.6, W.biru)),
      tambah("membaca", emo("kt2", 150, 70, "📖", 30), teks("kt2t", 150, 92, "baca wacana", 8.6, W.biru)),
      tambah("sehari-hari.", emo("kt3", 240, 70, "🏠", 30), teks("kt3t", 240, 92, "kasus sehari-hari", 8.2, W.biru)),
      tambah("menghitung", ...kartu("kt4", 24, 120, 120, 40, W.hijauMuda, ["1. Menghitung"], 9.6)),
      tambah("berkomunikasi.", ...kartu("kt5", 156, 120, 120, 40, W.pink, ["2. Berkomunikasi"], 9.6)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Skema pembelajaran, topik A")),
      tambah("topik", ...barisTabel("sk0", 14, 32, [96, 176], ["Topik A", "Pecahan dengan pembilang satu"], 24, 8.2, true)),
      tambah("sepuluh", ...barisTabel("sk1", 14, 56, [96, 176], ["Waktu", "10 JP"], 24, 8.6)),
      tambah("Pokok", ...barisTabel("sk2", 14, 80, [96, 176], ["Pokok materi", "membandingkan, mengurutkan"], 24, 8.2)),
      tambah("diskusi", ...barisTabel("sk3", 14, 104, [96, 176], ["Metode", "Diskusi"], 24, 8.6)),
      tambah("Aktivitas", ...barisTabel("sk4", 14, 128, [96, 176], ["Aktivitas", "Aktivitas 1: pecahan"], 24, 8.4)),
    ),
  ],
};

/* ------------------------------ 3. Panduan Guru: pengalaman belajar, apersepsi, pemanasan (Panduan Guru hlm. 92–93) ------------------------------ */
const SUARA_G1 = "Panduan guru membuka subbab A dengan pengalaman belajar: murid mampu membandingkan dan mengurutkan antarpecahan dengan pembilang satu. Perlengkapannya kertas origami, pensil warna, gunting, lem, penggaris, dan buku tulis.";
const SUARA_G2 = "Apersepsi: pecahan dapat diartikan sebagai satu bagian dari beberapa bagian yang sama, atau satu bagian dari satu unit tertentu. Macamnya pecahan biasa, pecahan campuran, desimal, dan persen.";
const SUARA_G3 = "Pecahan ditulis dengan dua bilangan, a di atas dan b di bawah, dengan b tidak sama dengan nol. Bilangan di atas garis disebut pembilang, sedangkan bilangan di bagian bawah disebut penyebut.";
const SUARA_G4 = "Pemanasan: guru mengajukan empat pertanyaan pemantik. Apakah pecahan? Apakah pembilang? Bagaimana ilustrasi pecahan dengan pembilang satu? Dan bagaimana membandingkan serta mengurutkan pecahan dengan pembilang satu?";

const ALAT: [string, number, number][] = [
  ["kertas origami", 10, 84],
  ["pensil warna", 106, 84],
  ["gunting", 202, 84],
  ["lem", 10, 116],
  ["penggaris", 106, 116],
  ["buku tulis", 202, 116],
];

export const ADEGAN_PANDUAN_AWAL: AdeganStory = {
  id: "panduan-awal",
  judul: "Panduan Guru: pengalaman belajar, apersepsi, pemanasan",
  sumber: "Panduan Guru hlm. 92–93",
  latar: "#FFFBEB",
  kutipan: [
    "6. Panduan Pembelajaran",
    "A. Pecahan dengan pembilang satu",
    "Pengalaman Belajar",
    "Peserta didik diharapkan mampu membandingkan dan mengurutkan antarpecahan dengan pembilang satu.",
    "Kebutuhan Sarana Prasarana dan Media",
    "Alat tulis peserta didik (kertas origami, pensil warna, gunting, lem, penggaris, dan buku tulis)",
    "Apersepsi",
    "Pecahan dapat diartikan sebagai satu bagian dari beberapa bagian yang sama, atau satu bagian dari satu unit tertentu.",
    "Macam-macam pecahan diantaranya pecahan biasa, pecahan campuran, desimal, dan persen.",
    "dengan a dan b adalah bilangan bulat, dan b ≠ 0",
    "Bilangan yang berada",
    "di atas garis pemisah disebut dengan pembilang, sedangkan bilangan di bagian bawah disebut penyebut.",
    "Stimulus (Pemanasan)",
    "Pertanyaan Esensi/Pemantik:",
    "1. apakah pecahan?",
    "bagaimana ilustrasi pecahan dengan pembilang satu?",
    "bagaimana membandingkan dan mengurutkan antarpecahan dengan pembilang satu?",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Pengalaman belajar dan perlengkapan")),
      tambah("murid", ...kartu("pe1", 14, 28, 272, 44, W.hijauMuda, ["murid mampu membandingkan dan", "mengurutkan antarpecahan pembilang satu"], 8.4)),
      ...ALAT.map(([nama, x, y], i) => tambah(["kertas", "pensil", "gunting,", "lem,", "penggaris,", "buku"][i], ...kartu(`al${i}`, x, y, 88, 26, [W.langit, W.krem, W.pink, W.hijauMuda, W.lavender, W.jingga][i], [nama], 8))),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Apersepsi: apa itu pecahan?")),
      tambah("satu", ...kartu("ap1", 14, 30, 272, 44, W.hijauMuda, ["satu bagian dari beberapa bagian sama,", "atau satu bagian dari satu unit"], 8.6)),
      tambah("Macamnya", teks("ap2", 150, 100, "macam pecahan:", 9.2, W.coklat)),
      tambah("biasa,", ...kartu("ap3", 10, 110, 64, 36, W.langit, ["biasa"], 8.6)),
      tambah("campuran,", ...kartu("ap4", 84, 110, 64, 36, W.krem, ["campuran"], 8.6)),
      tambah("desimal,", ...kartu("ap5", 158, 110, 64, 36, W.pink, ["desimal"], 8.6)),
      tambah("persen.", ...kartu("ap6", 232, 110, 58, 36, W.lavender, ["persen"], 8.6)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Menulis pecahan")),
      tambah("ditulis", ...pecahan("gx", 90, 100, "a", "b", 30)),
      tambah("tidak", teks("gy", 90, 170, "b ≠ 0", 12, W.merah)),
      tambah("pembilang,", teks("gp", 218, 96, "pembilang", 9.6, W.hijau), panah("gpp", 174, 92, -52, 0, W.hijau, 1.8)),
      tambah("penyebut.", teks("gq", 218, 140, "penyebut", 9.6, W.merah), panah("gqq", 174, 136, -52, 0, W.merah, 1.8)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Pemanasan: empat pertanyaan")),
      tambah("empat", emo("pw0", 150, 52, "❓", 22)),
      tambah(idx(SUARA_G4, "Apakah", 1), ...kartu("pw1", 14, 66, 272, 26, W.hijauMuda, ["1. apakah pecahan?"], 8.8)),
      tambah(idx(SUARA_G4, "Apakah", 2), ...kartu("pw2", 14, 96, 272, 26, W.langit, ["2. apakah pembilang?"], 8.8)),
      tambah(idx(SUARA_G4, "Bagaimana", 1), ...kartu("pw3", 14, 126, 272, 26, W.krem, ["3. ilustrasi pecahan pembilang satu?"], 8.8)),
      tambah(idx(SUARA_G4, "bagaimana", 2), ...kartu("pw4", 14, 156, 272, 34, W.pink, ["4. cara membandingkan dan", "mengurutkan pembilang satu?"], 8.6)),
    ),
  ],
};

/* ------------------------------ 4. Aktivitas 1: konsep pecahan dengan lingkaran origami (Buku Siswa hlm. 57–58; Panduan Guru hlm. 93–94) ------------------------------ */
const SUARA_AK1 = "Kita mulai dengan percobaan lingkaran kertas. Siapkan kertas origami, pensil warna, gunting, lem, penggaris, dan selembar karton. Buatlah kelompok beranggotakan tiga sampai empat orang.";
const SUARA_AK2 = "Potong kertas origami menjadi lingkaran sebanyak anggota kelompok. Ambil satu lingkaran, lalu bagi menjadi beberapa bagian yang sama dengan garis yang melalui titik pusat lingkaran.";
const SUARA_AK3 = "Warnai satu bagian lingkaran dengan pensil warna. Ulangi untuk anggota lain pada potongan lingkaran yang lain, lalu tempel di karton. Gambar di sini hanya contoh.";
const SUARA_AK4 = "Presentasikan hasil di depan kelas, lalu tulis kesimpulan dari percobaan. Tabel Hasil Aktivitas diisi satu pecahan untuk tiap anggota, dari anggota satu sampai anggota empat.";
const SUARA_AK5 = "Guru membentuk kelompok yang beragam, lalu menjelaskan cara mengisi tabel. Hasilnya bergantung pada lingkaran tiap murid. Memakai contoh tadi, hasilnya satu per dua, satu per tiga, satu per empat, dan satu per enam.";

/** Contoh lingkaran empat anggota pada gambar: banyak bagian sama tiap lingkaran (contoh, bukan data buku). */
export const CONTOH_ANGGOTA = [2, 3, 4, 6] as const;

export const ADEGAN_AKTIVITAS_SATU: AdeganStory = {
  id: "aktivitas-satu",
  judul: "Aktivitas 1: Konsep Pecahan",
  sumber: "Materi: percobaan lingkaran kertas",
  latar: "#F0F9FF",
  kutipan: [
    "A. Pecahan dengan Pembilang Satu",
    "Aktivitas 1: Konsep Pecahan",
    "Alat dan Bahan: kertas origami, pensil warna, gunting, lem, penggaris, dan buku tulis",
    "Buatlah kelompok beranggotakan 3-4 orang.",
    "Potonglah kertas origami menggunakan gunting menjadi bentuk lingkaran sejumlah banyaknya anggota kelompok.",
    "Ambil salah satu lingkaran kemudian dibagi menjadi beberapa bagian yang sama dengan cara memberi garis melalui titik pusat pada lingkaran tersebut.",
    "Warnailah salah satu bagian lingkaran menggunakan pensil warna",
    "Selanjutnya, ulangi Langkah ke-3 dan Langkah ke-4 untuk anggota yang lain pada bagian potongan lingkaran yang lain kemudian tempel dengan lem pada buku tulis.",
    "Presentasikan hasil diskusi kelompok di depan kelas",
    "Tulislah kesimpulan yang diperoleh dari hasil percobaan tersebut",
    "Hasil Aktivitas",
    "Guru membentuk kelompok heterogen",
    "Guru menjelaskan cara mengisi tabel yang ada pada Buku Siswa.",
  ],
  ketukan: [
    k(
      SUARA_AK1,
      tambah(0, judul("Aktivitas 1: Konsep Pecahan")),
      tambah("Siapkan", ...kartu("al1", 14, 30, 272, 40, W.krem, ["kertas origami, pensil warna, gunting,", "lem, penggaris, dan selembar karton"], 8.4)),
      tambah("kelompok", emo("kl1", 80, 112, "🧒", 28), emo("kl2", 120, 112, "🧒", 28), emo("kl3", 160, 112, "🧒", 28), emo("kl4", 200, 112, "🧒", 28)),
      tambah("tiga", ...kartu("kl5", 60, 130, 180, 30, W.emas, ["kelompok 3-4 orang"], 9.6)),
    ),
    k(
      SUARA_AK2,
      bersih(0),
      tambah(0, judul("Lingkaran origami dibagi sama")),
      tambah("lingkaran", bulat("lg0", 84, 108, 46, W.oranye, W.biru, { tebal: 2 })),
      tambah("bagi", garis("lg1", 38, 108, 92, 0, W.putih, 2, { putus: true }), garis("lg2", 84, 62, 0, 92, W.putih, 2, { putus: true })),
      tambah("pusat", bulat("lg3", 84, 108, 3.4, W.merah, W.merah), teks("lg4", 218, 100, "titik pusat", 9.2, W.merah), panah("lg5", 186, 96, -96, 8, W.merah, 1.4)),
      tambah("sama", ...kartu("lg6", 150, 128, 140, 44, W.hijauMuda, ["bagian sama besar", "lewat titik pusat"], 8.6)),
    ),
    k(
      SUARA_AK3,
      bersih(0),
      tambah(0, judul("Contoh lingkaran tiap anggota")),
      ...CONTOH_ANGGOTA.map((n, i) => tambah(["Warnai", "Ulangi", "anggota", "potongan"][i], ...lingkaranBagi(`co${i + 1}`, 40 + i * 73.3, 80, 28, n, 1, W.oranye), teks(`co${i + 1}t`, 40 + i * 73.3, 128, `Anggota ${i + 1}`, 8, W.biru))),
      tambah("tempel", ...kartu("co5", 30, 148, 240, 34, W.krem, ["ditempel di karton"], 9.2)),
      tambah("contoh.", teks("co6", 150, 196, "gambar ini contoh", 8, W.coklat)),
    ),
    k(
      SUARA_AK4,
      bersih(0),
      tambah(0, judul("Tabel hasil aktivitas")),
      tambah("Presentasikan", ...barisTabel("tr0", 40, 30, [100, 120], ["Anggota", "Hasil Aktivitas"], 24, 8.4, true)),
      ...[1, 2, 3, 4].map((n) => tambah(["anggota", "kesimpulan", "pecahan", "empat."][n - 1], ...barisTabel(`tr${n}`, 40, 30 + n * 24, [100, 120], [`Anggota ${n}`, "…/…"], 24, 8.6))),
    ),
    k(
      SUARA_AK5,
      tambah("beragam,", ...kartu("hg", 20, 166, 260, 28, W.hijauMuda, ["kelompok beragam; guru jelaskan cara isi"], 8.6)),
      tambah("bergantung", teks("kn", 150, 160, "hasil bergantung lingkaran tiap murid", 8.2, W.merah)),
      ...[1, 2, 3, 4].map((n) => ubah(["dua,", "tiga,", "empat,", "enam."][n - 1], { id: `tr${n}-t1`, isi: `1/${CONTOH_ANGGOTA[n - 1]}` })),
    ),
  ],
};
