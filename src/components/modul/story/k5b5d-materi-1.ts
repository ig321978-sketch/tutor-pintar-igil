import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, emo, garis, gulungKawat, kartu, kerangka, kotak, panah, petak, teks } from "./k5b5d-gambar";
import { bersih, hapus, k, tambah } from "./k5b5d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/* ------------------------------ 1. Pembuka Sub-Bab D (BS hlm. 131 dan 159; Panduan Guru hlm. 232) ------------------------------ */
export const ADEGAN_PEMBUKA_D: AdeganStory = {
  id: "pembuka-d",
  judul: "Pembuka Sub-Bab D: hubungan keliling dan luas",
  sumber: "Buku Siswa hlm. 131 dan 159; Buku Panduan Guru hlm. 232",
  latar: "#EEF2FF",
  kutipan: [
    "D. Hubungan Keliling dan Luas Daerah Bangun Datar",
    "menemukan cara menghitung luas berbagai daerah bangun datar",
    "mengetahui kapan harus menggunakannya",
    "eksplorasi bentuk dan ukuran bangun datar jika diketahui kelilingnya",
    "mencari ukuran bangun datar yang menghasilkan luas daerah paling besar",
    "Alat tulis: pulpen, pensil, penggaris, spidol",
    "Kertas berpetak",
    "LCD Projector",
    "gambar-gambar cetak yang ditempel di papan tulis",
  ],
  ketukan: [
    k(
      "Selamat datang di Sub-Bab D, hubungan keliling dan luas daerah bangun datar. Ini bagian terakhir dari Bab 5, Luas Daerah Bangun Datar.",
      tambah(0, jud("Sub-Bab D", 28, 13)),
      tambah("hubungan", teks("sd", 150, 50, "keliling dan luas daerah", 10, W.biru)),
      tambah("bagian", teks("bab", 150, 190, "Bab 5: Luas Daerah Bangun Datar", 9, W.ungu)),
      tambah("Luas@2", kotak("rk", 95, 80, 110, 60, W.muda, W.jeruk, { tebal: 2.6 }), emo("re", 150, 118, "📏", 28)),
    ),
    k(
      "Pada sub-bab ini siswa bereksplorasi dengan bentuk dan ukuran bangun datar jika kelilingnya diketahui. Tugasnya mencari ukuran yang menghasilkan luas daerah paling besar.",
      bersih(0),
      tambah(0, jud("Pengalaman belajar", 20)),
      tambah("kelilingnya", kartu("pa", 20, 40, 260, 40, W.krem, ["keliling sudah diketahui"], 9.4), emo("pe", 38, 66, "📏", 18)),
      tambah("Tugasnya", panah("pp", 150, 84, 0, 20, W.ungu, 2.2)),
      tambah("paling", kartu("pb", 20, 108, 260, 40, W.hijauMuda, ["cari luas daerah paling besar"], 9.4), emo("pf", 38, 134, "🏆", 18)),
    ),
    k(
      "Alat yang disiapkan: alat tulis seperti pulpen, pensil, penggaris, dan spidol, serta kertas berpetak dan gambar yang diperbesar dari bangun datar di buku siswa.",
      bersih(0),
      tambah(0, jud("Alat yang disiapkan", 20)),
      tambah("pulpen,", emo("a1", 55, 90, "✏️", 32), teks("a1t", 55, 112, "alat tulis", 8.4)),
      tambah("penggaris,", emo("a2", 125, 90, "📏", 32), teks("a2t", 125, 112, "penggaris", 8.4)),
      tambah("kertas", petak("a3p", 175, 62, 5, 4, 8), teks("a3t", 195, 112, "kertas berpetak", 8.4)),
      tambah("diperbesar", emo("a4", 260, 90, "🖼️", 28), teks("a4t", 260, 112, "gambar besar", 8.4)),
    ),
    k(
      "Guru juga bisa memakai proyektor dan slide presentasi. Jika sekolah tidak punya, gambar cetak yang ditempel di papan tulis sudah cukup.",
      bersih(0),
      tambah(0, jud("Media pembelajaran", 20)),
      tambah("proyektor", emo("m1", 70, 90, "📽️", 38), teks("m1t", 70, 114, "proyektor dan slide", 8.4)),
      tambah("Jika", teks("m2", 150, 94, "atau", 9, W.merah)),
      tambah("cetak", kotak("m3", 185, 62, 90, 56, W.putih, W.hijau, { tebal: 2.4 }), teks("m3t", 230, 94, "gambar cetak", 8.2), teks("m3u", 230, 106, "di papan tulis", 8.2)),
    ),
    k(
      "Tujuan bab ini: menemukan cara menghitung luas berbagai daerah bangun datar dan mengetahui kapan harus menggunakannya. Sub-bab D membandingkan keliling dengan luas.",
      bersih(0),
      tambah(0, jud("Tujuan bab", 20)),
      tambah("menemukan", kartu("tj1", 20, 40, 260, 40, W.hijauMuda, ["cara menghitung luas daerah"], 9.4)),
      tambah("mengetahui", kartu("tj2", 20, 90, 260, 40, W.krem, ["kapan menggunakannya"], 9.4)),
      tambah("membandingkan", kartu("tj3", 20, 140, 260, 40, W.ungMuda, ["keliling dan luas dibandingkan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Apersepsi: keliling dan luas persegi panjang (Panduan Guru hlm. 232) ------------------------------ */
export const ADEGAN_APERSEPSI_D: AdeganStory = {
  id: "apersepsi-d",
  judul: "Apersepsi: tanya jawab keliling dan luas",
  sumber: "Buku Panduan Guru hlm. 232; angka dari Buku Siswa hlm. 160",
  latar: "#FFF7ED",
  kutipan: [
    "menentukan keliling dan luas daerah berbagai macam bangun datar",
    "tanya jawab tentang cara menghitung keliling dan luas daerah",
  ],
  ketukan: [
    k(
      "Guru mengawali dengan tanya jawab tentang cara menghitung keliling dan luas daerah berbagai bangun datar. Siswa sudah harus mampu menentukan keduanya.",
      tambah(0, jud("Tanya jawab dulu", 22)),
      tambah("keliling", kartu("q1", 25, 50, 110, 60, W.krem, ["Keliling?", "ukuran sekeliling"], 9.6)),
      tambah("luas", kartu("q2", 165, 50, 110, 60, W.muda, ["Luas daerah?", "ukuran isi"], 9.6)),
      tambah("keduanya.", teks("qt", 150, 150, "dua-duanya dipakai di eksplorasi", 9, W.ungu)),
    ),
    k(
      "Ambil persegi panjang dengan panjang 20 sentimeter dan lebar 10 sentimeter. Keliling berarti jumlah panjang semua sisinya, yaitu 20, 10, 20, dan 10.",
      bersih(0),
      tambah(0, jud("Persegi panjang 20 kali 10", 22)),
      tambah("panjang", kerangka("r", 40, 70, 20, 10, 5, W.krem, W.jeruk, { w: 100, h: 50 }), teks("rp", 90, 64, "20 cm", 9), teks("rl", 28, 100, "10 cm", 8.6, W.biru, { anchor: "end" })),
      tambah("Keliling", garis("rg", 40, 70, 100, 0, W.merah, 3), garis("rg2", 140, 70, 0, 50, W.merah, 3), garis("rg3", 140, 120, -100, 0, W.merah, 3), garis("rg4", 40, 120, 0, -50, W.merah, 3)),
      tambah("jumlah", teks("rh", 215, 100, "sisi + sisi", 9, W.merah), teks("rh2", 215, 114, "+ sisi + sisi", 9, W.merah)),
    ),
    k(
      "Cara ringkasnya: panjang ditambah lebar, lalu dikali 2. Sepuluh ditambah dua puluh hasilnya 30, dan 2 kali 30 hasilnya 60 sentimeter.",
      hapus(0, "rh", "rh2"),
      tambah("ditambah", teks("h1", 215, 90, "20 + 10 = 30", 10, W.biru)),
      tambah("dikali", teks("h2", 215, 112, "2 x 30 = 60", 10, W.merah)),
      tambah("sentimeter.", teks("h3", 215, 134, "keliling 60 cm", 9.4, W.hijau)),
    ),
    k(
      "Luas daerah mengukur isi di dalam bangun. Untuk persegi panjang, luas sama dengan panjang kali lebar, yaitu 20 kali 10 hasilnya 200 sentimeter persegi.",
      bersih(0),
      tambah(0, jud("Luas daerah", 22)),
      tambah("Luas@1", kerangka("r2", 40, 60, 20, 10, 5, W.hijauMuda, W.hijau, { w: 100, h: 50 }), teks("r2t", 90, 90, "isi", 10, W.hijau)),
      tambah("panjang@2", teks("l1", 215, 84, "panjang x lebar", 9, W.biru)),
      tambah("20", teks("l2", 215, 108, "20 x 10 = 200", 10.4, W.merah)),
      tambah("sentimeter", teks("l3", 215, 130, "200 cm²", 10, W.hijau)),
    ),
    k(
      "Perhatikan satuannya. Keliling memakai sentimeter, sedangkan luas memakai sentimeter persegi. Keduanya mengukur hal yang berbeda.",
      bersih(0),
      tambah(0, jud("Beda satuan", 22)),
      tambah("Keliling", kartu("s1", 25, 50, 110, 70, W.krem, ["Keliling", "60 cm", "panjang garis"], 9.6)),
      tambah("luas", kartu("s2", 165, 50, 110, 70, W.muda, ["Luas daerah", "200 cm²", "besar isi"], 9.6)),
      tambah("berbeda.", teks("s3", 150, 160, "ukuran yang berbeda", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Soal cerita kawat 60 sentimeter (BS hlm. 159; Panduan Guru hlm. 233) ------------------------------ */
export const ADEGAN_SOAL_KAWAT: AdeganStory = {
  id: "soal-kawat",
  judul: "Eksplorasi 5.4: kawat sepanjang 60 sentimeter",
  sumber: "Buku Siswa hlm. 159; Buku Panduan Guru hlm. 233",
  latar: "#F0FDF4",
  kutipan: [
    "Bapak memiliki kawat sepanjang 60 cm",
    "Bapak ingin membuat kerangka berbentuk persegi panjang",
    "Bantulah beliau membuat gambar kerangka tersebut",
    "Ada berapa cara yang bisa dilakukan untuk membuatnya",
    "Manakah yang menghasilkan kerangka yang terluas",
    "Gambarkan pada petak-petak berikut",
    "Guru menyiapkan kertas berpetak",
    "Peserta didik bereksplorasi dengan menggambarkan pada kertas berpetak",
    "Guru memeriksa jawaban peserta didik dan mengoreksinya jika keliru",
  ],
  ketukan: [
    k(
      "Inilah soal Eksplorasi 5.4. Bapak memiliki kawat sepanjang 60 sentimeter. Dengan kawat itu, Bapak ingin membuat kerangka berbentuk persegi panjang.",
      tambah(0, jud("Eksplorasi 5.4", 22, 12)),
      tambah("Bapak", emo("b1", 55, 100, "👨", 36), teks("b1t", 55, 126, "Bapak", 8.6)),
      tambah("kawat", gulungKawat("kw", 150, 98), teks("kwt", 150, 134, "kawat 60 cm", 9.6, W.merah)),
      tambah("kerangka", panah("ka", 185, 98, 36, 0, W.ungu, 2.4), kerangka("kr", 228, 78, 15, 10, 5, W.krem, W.jeruk, { w: 54, h: 36 })),
    ),
    k(
      "Bantulah beliau menggambar kerangka itu. Ada berapa cara yang bisa dilakukan, dan manakah yang menghasilkan kerangka terluas? Gambarlah pada petak-petak.",
      bersih(0),
      tambah(0, jud("Tiga pertanyaan", 22)),
      tambah("menggambar", kartu("pq1", 25, 40, 250, 36, W.krem, ["1. gambar kerangkanya"], 9.4)),
      tambah("berapa", kartu("pq2", 25, 86, 250, 36, W.muda, ["2. ada berapa cara?"], 9.4)),
      tambah("terluas?", kartu("pq3", 25, 132, 250, 36, W.hijauMuda, ["3. mana yang terluas?"], 9.4)),
    ),
    k(
      "Untuk persiapan, guru menyiapkan gambar yang diperbesar dari buku siswa pada kertas berpetak, bisa berupa slide atau gambar yang ditempel di papan tulis. Siswa juga menerima kertas berpetak.",
      bersih(0),
      tambah(0, jud("Persiapan guru", 22)),
      tambah("kertas", petak("gp", 70, 44, 12, 8, 13), teks("gpt", 148, 170, "kertas berpetak", 9.4, W.ungu)),
      tambah("slide", teks("gs", 148, 190, "slide atau papan tulis", 8.4, W.hijau)),
    ),
    k(
      "Saat pelaksanaan, guru mengajak siswa menyimak soal cerita. Siswa bereksplorasi dengan menggambar ukuran yang mungkin, lalu guru memeriksa dan mengoreksi bila ada yang keliru.",
      bersih(0),
      tambah(0, jud("Pelaksanaan", 22)),
      tambah("menyimak", baris("pl1", 25, 40, 250, "1. simak soal cerita", W.krem, 9, 26)),
      tambah("menggambar", baris("pl2", 25, 76, 250, "2. gambar ukuran yang mungkin", W.muda, 9, 26)),
      tambah("memeriksa", baris("pl3", 25, 112, 250, "3. guru periksa dan koreksi", W.hijauMuda, 9, 26)),
    ),
    k(
      "Pada gambar buku, satu petak tampak mewakili 5 sentimeter. Jadi sisi 20 sentimeter membentang 4 petak, dan sisi 10 sentimeter membentang 2 petak.",
      bersih(0),
      tambah(0, jud("Satu petak 5 cm", 18, 11)),
      tambah("petak", petak("pg", 15, 40, 15, 10, 10, W.petak)),
      tambah("20", kerangka("pk", 25, 50, 20, 10, 10), teks("p20", 45, 46, "20 cm", 8)),
      tambah("10", teks("p10", 21, 72, "10 cm", 7, W.biru, { anchor: "end" })),
      tambah("4", teks("p4", 215, 70, "4 petak", 9.4, W.merah)),
      tambah("petak@3", teks("p2", 215, 90, "2 petak", 9.4, W.hijau)),
    ),
  ],
};
