import type { AdeganStory } from "./logika-story";
import { W, batangMini, donat, emo, judul, kartu, panah, tabel, teks } from "./k5b8a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8a-bantu";

/* ------------------------------ 1. Pembuka bab: Anggi dan donat (hlm. 235 sampai 238) ------------------------------ */
const WARNA_DONAT = ["#7C3F1D", "#FDE68A", "#F472B6", "#D6A66B"];

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-donat",
  judul: "Pembuka Bab 8: Anggi menjual donat",
  sumber: "Buku Siswa hlm. 235–238",
  latar: "#FFF7ED",
  kutipan: [
    "Data Membantu Membuat Keputusan",
    "Di SD Pancasila saat jam istirahat",
    "Anggi bercita-cita menjadi pengusaha makanan",
    "Setiap hari, Anggi menjual empat macam rasa donat, yaitu cokelat, keju, stroberi, dan kacang",
    "Tabel 8.1 Hasil Penjualan Donat Anggi",
    "Tabel berikut menunjukkan hasil penjualan donat Anggi selama satu minggu",
    "ia tidak akan menjual donat rasa kacang lagi",
    "ia akan menambah banyaknya donat rasa cokelat",
    "data sangat membantu dalam mengambil keputusan",
  ],
  ketukan: [
    k(
      "Bab 8 membahas data. Di SD Pancasila saat jam istirahat, Yohana melihat Anggi sedang makan donat.",
      tambah(0, judul("Bab 8 Data")),
      tambah("SD", teks("sk", 150, 40, "SD Pancasila, jam istirahat", 9, W.hijau)),
      tambah("Yohana", emo("yh", 56, 118, "👧", 40), teks("yht", 56, 144, "Yohana", 8.6)),
      tambah("Anggi", emo("an", 244, 118, "🧒", 40), teks("ant", 244, 144, "Anggi", 8.6)),
      tambah("donat.", emo("dn", 150, 124, "🍩", 36)),
    ),
    k(
      "Nisa dan Yohana ingin membeli donat juga. Anggi menjual empat rasa donat, yaitu cokelat, keju, stroberi, dan kacang.",
      bersih(0),
      tambah(0, judul("empat rasa donat")),
      tambah("cokelat,", ...donat("d0", 48, 96, 20, WARNA_DONAT[0]), teks("dt0", 48, 130, "cokelat", 8.6)),
      tambah("keju,", ...donat("d1", 116, 96, 20, WARNA_DONAT[1]), teks("dt1", 116, 130, "keju", 8.6)),
      tambah("stroberi,", ...donat("d2", 184, 96, 20, WARNA_DONAT[2]), teks("dt2", 184, 130, "stroberi", 8.6)),
      tambah("kacang.", ...donat("d3", 252, 96, 20, WARNA_DONAT[3]), teks("dt3", 252, 130, "kacang", 8.6)),
    ),
    k(
      "Anggi bercita-cita menjadi pengusaha makanan. Setiap hari ia mencatat hasil penjualan donatnya selama satu minggu, dari Senin sampai Sabtu.",
      bersih(0),
      tambah(0, judul("Catatan Anggi, satu minggu")),
      tambah("pengusaha", emo("pk", 150, 66, "📒", 30)),
      tambah("Senin", ...kartu("h0", 28, 88, 76, 28, W.krem, ["Senin"], 9), ...kartu("h1", 112, 88, 76, 28, W.krem, ["Selasa"], 9), ...kartu("h2", 196, 88, 76, 28, W.krem, ["Rabu"], 9)),
      tambah("Sabtu.", ...kartu("h3", 28, 124, 76, 28, W.krem, ["Kamis"], 9), ...kartu("h4", 112, 124, 76, 28, W.krem, ["Jumat"], 9), ...kartu("h5", 196, 124, 76, 28, W.krem, ["Sabtu"], 9)),
    ),
    k(
      "Hasil catatan itu dimuat dalam Tabel 8.1 pada halaman 237. Mari kita baca tabelnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Tabel 8.1 Hasil Penjualan Donat Anggi", 10.4, W.ungu)),
      tambah("Tabel", ...tabel("t", 26, 30, [48, 50, 50, 50, 50], [["Hari", "Cokelat", "Keju", "Stroberi", "Kacang"], ["Senin", "3", "6", "4", "4"], ["Selasa", "4", "4", "6", "3"], ["Rabu", "5", "3", "4", "2"], ["Kamis", "5", "4", "5", "1"], ["Jumat", "6", "3", "3", "0"], ["Sabtu", "7", "5", "4", "0"]], 17, 8.4)),
      tambah("halaman", teks("hl", 66, 166, "hlm. 237", 8.6, W.ungu)),
    ),
    k(
      "Anggi melihat donat kacang paling sedikit terjual, sedangkan donat cokelat terjual makin banyak dari hari ke hari.",
      sorotkan("kacang", "t-s04", "t-t04"),
      sorotkan("cokelat", "t-s01", "t-t01"),
      tambah("sedikit", teks("n1", 150, 180, "kacang turun, cokelat naik", 10, W.merah)),
    ),
    k(
      "Maka Anggi memutuskan tidak menjual donat kacang lagi dan menambah donat cokelat. Data membantu Anggi mengambil keputusan.",
      bersih(0),
      tambah(0, judul("data membantu keputusan")),
      tambah("tidak", ...kartu("kp1", 20, 44, 120, 56, W.merahMuda, ["tidak jual", "donat kacang"], 9.6)),
      tambah("menambah", ...kartu("kp2", 160, 44, 120, 56, W.hijauMuda, ["tambah donat", "cokelat"], 9.6)),
      tambah("Data", panah("pp", 150, 150, 0, -32, W.ungu, 3, { gambar: true }), teks("pq", 150, 168, "keputusan berdasarkan data", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Membaca Tabel 8.1 (hlm. 237 sampai 238) ------------------------------ */
const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const barisBilangan = (id: string, y: number, nama: string, nilai: number[], warna: string) => [
  teks(`${id}-n`, 30, y + 4, nama, 8.6, W.biru, { anchor: "start" }),
  ...nilai.map((v, i) => teks(`${id}-v${i}`, 104 + i * 36, y + 4, String(v), 12, warna)),
];

export const ADEGAN_TABEL_DONAT: AdeganStory = {
  id: "tabel-donat",
  judul: "Membaca Tabel 8.1 donat Anggi",
  sumber: "Buku Siswa hlm. 237–238",
  latar: "#FEFCE8",
  kutipan: [
    "donat rasa kacang adalah yang paling sedikit terjual setiap harinya",
    "Banyaknya donat rasa kacang yang terjual mengalami",
    "bahkan ada hari ketika donat rasa kacang tidak terjual sama sekali",
    "donat rasa cokelat yang terjual mengalami kenaikan setiap hari",
  ],
  ketukan: [
    k(
      "Perhatikan donat kacang dari Senin sampai Sabtu: empat, tiga, dua, satu, lalu nol dan nol. Banyaknya turun, sampai tidak terjual sama sekali.",
      tambah(0, judul("donat kacang")),
      tambah(0, ...HARI.map((h, i) => teks(`hh${i}`, 104 + i * 36, 44, h.slice(0, 3), 8, W.hijau))),
      tambah("Perhatikan", ...barisBilangan("kc", 80, "kacang", [4, 3, 2, 1, 0, 0], W.merah)),
      tambah("turun,", panah("ptr", 104, 100, 180, 22, W.merah, 2.4, { gambar: true })),
    ),
    k(
      "Donat cokelat naik: tiga, empat, lima, lima, enam, tujuh. Pada Kamis banyaknya sama dengan Rabu, jadi naiknya belum tepat setiap hari.",
      tambah("cokelat", ...barisBilangan("ck", 150, "cokelat", [3, 4, 5, 5, 6, 7], W.hijau)),
      tambah("naik:", panah("pnk", 104, 176, 180, -22, W.hijau, 2.4, { gambar: true })),
    ),
    k(
      "Catatan: pada hari Senin, kacang empat masih lebih banyak daripada cokelat tiga. Jadi kalimat kacang paling sedikit setiap hari belum tepat untuk Senin.",
      sorotkan("Senin,", "kc-v0", "ck-v0"),
      tambah("Catatan:", teks("cat", 150, 198, "Senin: kacang 4, cokelat 3", 8.6, W.merah)),
    ),
    k(
      "Tabel mengubah catatan harian menjadi bukti yang mudah dibaca. Inilah gagasan utama Bab 8: mengumpulkan data, menata data, lalu memakainya.",
      bersih(0),
      tambah(0, judul("gagasan utama Bab 8")),
      tambah("mengumpulkan", ...kartu("g1", 14, 56, 82, 46, W.langit, ["kumpulkan", "data"], 9.2)),
      tambah("menata", panah("ga", 98, 79, 24, 0, W.hijau, 2.5, { gambar: true }), ...kartu("g2", 124, 56, 82, 46, W.krem, ["tata", "data"], 9.2)),
      tambah("memakainya.", panah("gb", 208, 79, 24, 0, W.hijau, 2.5, { gambar: true }), ...kartu("g3", 234, 56, 62, 46, W.hijauMuda, ["pakai", "data"], 9.2)),
      tambah("Bab", teks("gj", 150, 140, "Bab 8", 14, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Tujuan, peta konsep, kata kunci (hlm. 235 sampai 236 dan Buku Panduan Guru) ------------------------------ */
export const ADEGAN_TUJUAN: AdeganStory = {
  id: "tujuan-peta",
  judul: "Tujuan, peta konsep, dan kata kunci Bab 8",
  sumber: "Buku Siswa hlm. 235–236 dan Buku Panduan Guru hlm. 345–348",
  latar: "#F5F3FF",
  kutipan: [
    "Tujuan Pembelajaran",
    "Pada bab ini kalian akan diajak untuk mengumpulkan data",
    "sederhana dari lingkungan sekitar kalian, kemudian menyajikannya",
    "dengan menggunakan tabel frekuensi sederhana",
    "Peta Konsep",
    "Pengumpulan Data",
    "Kata Kunci",
    "Data, frekuensi, turus, tabel frekuensi, piktogram, diagram batang",
  ],
  ketukan: [
    k(
      "Tujuan bab ini: mengumpulkan data sederhana dari lingkungan sekitar, lalu menyajikannya dengan tabel frekuensi sederhana.",
      tambah(0, judul("Tujuan Bab 8")),
      tambah("mengumpulkan", ...kartu("t1", 18, 50, 122, 56, W.langit, ["kumpulkan data", "dari sekitar"], 9.2)),
      tambah("menyajikannya", ...kartu("t2", 160, 50, 122, 56, W.krem, ["sajikan dengan", "tabel frekuensi"], 9.2)),
    ),
    k(
      "Buku juga menyebut piktogram dan diagram batang. Keduanya dipelajari di subbab berikutnya, jadi video ini memakai dua tujuan pertama saja.",
      tambah("piktogram", ...kartu("t3", 18, 124, 122, 40, "#E5E7EB", ["piktogram", "subbab B"], 8.6)),
      tambah("diagram", ...kartu("t4", 160, 124, 122, 40, "#E5E7EB", ["diagram batang", "subbab C"], 8.6)),
      tambah("saja.", teks("t5", 150, 188, "Subbab A: dua tujuan pertama", 9.4, W.hijau)),
    ),
    k(
      "Pada peta konsep, Data bercabang ke Pengumpulan Data dan Penyajian Data. Tabel frekuensi ada di bawah Pengumpulan Data.",
      bersih(0),
      tambah(0, judul("Peta Konsep Bab 8")),
      tambah("Data", ...kartu("pk0", 105, 30, 90, 26, W.emas, ["Data"], 10)),
      tambah("Pengumpulan", panah("pa1", 130, 58, -50, 24, W.biru, 2, { gambar: true }), ...kartu("pk1", 20, 84, 120, 28, W.langit, ["Pengumpulan Data"], 8.6)),
      tambah("Penyajian", panah("pa2", 170, 58, 50, 24, W.biru, 2, { gambar: true }), ...kartu("pk2", 160, 84, 120, 28, W.krem, ["Penyajian Data"], 8.6)),
      tambah("Tabel", panah("pa3", 80, 114, 0, 24, W.biru, 2, { gambar: true }), ...kartu("pk3", 20, 140, 120, 28, W.hijauMuda, ["Tabel Frekuensi"], 8.6)),
    ),
    k(
      "Kata kunci bab ini: data, frekuensi, turus, tabel frekuensi, piktogram, dan diagram batang. Subbab A memakai empat kata pertama.",
      bersih(0),
      tambah(0, judul("Kata Kunci")),
      tambah("data,", ...kartu("kk1", 20, 40, 76, 28, W.langit, ["data"], 9.4)),
      tambah("frekuensi,", ...kartu("kk2", 112, 40, 76, 28, W.langit, ["frekuensi"], 9.4)),
      tambah("turus,", ...kartu("kk3", 204, 40, 76, 28, W.langit, ["turus"], 9.4)),
      tambah("tabel", ...kartu("kk4", 20, 80, 100, 28, W.langit, ["tabel frekuensi"], 8.8)),
      tambah("piktogram,", ...kartu("kk5", 132, 80, 70, 28, "#E5E7EB", ["piktogram"], 8.4)),
      tambah("diagram", ...kartu("kk6", 212, 80, 72, 28, "#E5E7EB", ["diagram batang"], 7.4)),
      tambah("empat", teks("kk7", 150, 140, "empat kata biru dipakai di Subbab A", 9.4, W.hijau)),
    ),
    k(
      "Buku Panduan Guru menyarankan delapan jam pelajaran untuk Subbab A, dengan penemuan terbimbing dan proyek mengumpulkan data.",
      bersih(0),
      tambah(0, judul("Panduan Guru: Subbab A")),
      tambah("delapan", ...kartu("pg1", 90, 44, 120, 50, W.emas, ["8 JP"], 18)),
      tambah("penemuan", ...kartu("pg2", 18, 120, 120, 40, W.langit, ["penemuan", "terbimbing"], 9)),
      tambah("proyek", ...kartu("pg3", 162, 120, 120, 40, W.hijauMuda, ["proyek", "kumpulkan data"], 9)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Mengingat Kembali (hlm. 238 sampai 239) ------------------------------ */
export const ADEGAN_MENGINGAT: AdeganStory = {
  id: "mengingat",
  judul: "Ayo Mengingat Kembali: data dan diagram batang kelas IV",
  sumber: "Buku Siswa hlm. 238–239",
  latar: "#F0FDFA",
  kutipan: [
    "Ayo Mengingat Kembali",
    "Di kelas IV kalian sudah pernah belajar tentang penyajian data",
    "Data adalah sekumpulan informasi atau fakta",
    "menggunakan kata, kalimat, angka, gambar, atau simbol",
    "data tentang tinggi badan, data jarak rumah ke sekolah, data makanan favorit, data cara berangkat ke sekolah",
    "Gambar 8.2 Diagram Batang Cara Berangkat ke Sekolah Siswa Kelas V SD Pancasila",
    "Ada berapa siswa yang berangkat ke sekolah dengan berjalan",
    "Cara apa yang paling banyak digunakan siswa kelas V SD",
  ],
  ketukan: [
    k(
      "Ayo Mengingat Kembali. Di kelas empat kita sudah belajar penyajian data. Data adalah sekumpulan informasi atau fakta.",
      tambah(0, judul("Ayo Mengingat Kembali")),
      tambah("Data", ...kartu("df", 40, 56, 220, 56, W.krem, ["data:", "informasi atau fakta"], 11)),
    ),
    k(
      "Informasi itu bisa ditulis dengan kata, kalimat, angka, gambar, atau simbol lainnya.",
      tambah("kata,", teks("c1", 56, 150, "kata", 9.6, W.hijau)),
      tambah("kalimat,", teks("c2", 106, 150, "kalimat", 9.6, W.hijau)),
      tambah("angka,", teks("c3", 152, 150, "angka", 9.6, W.hijau)),
      tambah("gambar,", teks("c4", 198, 150, "gambar", 9.6, W.hijau)),
      tambah("simbol", teks("c5", 248, 150, "simbol", 9.6, W.hijau)),
    ),
    k(
      "Contoh data di sekitar kita: tinggi badan, jarak rumah ke sekolah, makanan favorit, dan cara berangkat ke sekolah.",
      bersih(0),
      tambah(0, judul("contoh data di sekitar kita")),
      tambah("tinggi", ...kartu("e1", 18, 40, 122, 46, W.langit, ["tinggi badan"], 9.4)),
      tambah("jarak", ...kartu("e2", 160, 40, 122, 46, W.krem, ["jarak rumah", "ke sekolah"], 9)),
      tambah("makanan", ...kartu("e3", 18, 104, 122, 46, W.hijauMuda, ["makanan favorit"], 9.4)),
      tambah("cara", ...kartu("e4", 160, 104, 122, 46, W.pink, ["cara berangkat", "ke sekolah"], 9)),
    ),
    k(
      "Buku menampilkan Gambar 8.2, cara berangkat ke sekolah siswa kelas V SD Pancasila. Jalan kaki enam, naik sepeda delapan, angkutan umum empat, diantar orang tua enam.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Gambar 8.2 Cara Berangkat ke Sekolah", 10.4, W.ungu)),
      tambah("Jalan", ...batangMini("b0", 36, 150, 6, "jalan kaki")),
      tambah("sepeda", ...batangMini("b1", 92, 150, 8, "sepeda")),
      tambah("angkutan", ...batangMini("b2", 148, 150, 4, "angkutan")),
      tambah("diantar", ...batangMini("b3", 204, 150, 6, "diantar")),
    ),
    k(
      "Pertanyaan satu: berapa siswa yang berjalan kaki? Jawabannya 6 siswa. Pertanyaan dua: cara apa yang paling banyak? Naik sepeda, sebanyak 8 siswa.",
      sorotkan("Jawabannya", "b0-k"),
      tambah("Jawabannya", teks("j1", 150, 184, "jalan kaki: 6 siswa", 9.4, W.hijau)),
      sorotkan("sepeda,", "b1-k"),
      hapus("sepeda,", "j1"),
      tambah("sepeda,", teks("j2", 150, 184, "paling banyak: naik sepeda, 8 siswa", 9.4, W.merah)),
    ),
  ],
};
