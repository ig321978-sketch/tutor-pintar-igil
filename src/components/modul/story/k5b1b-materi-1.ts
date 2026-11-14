import type { AdeganStory } from "./logika-story";
import { DAKON, W, barisDakon, emo, judul, kartu, kotak, tabelTempat, tabelUrut, teks } from "./k5b1b-gambar";
import { bersih, k, tambah } from "./k5b1b-bantu";

/* ------------------------------ 1. Pembuka Subbab B: pengalaman belajar (Panduan Guru hlm. 25; Buku Siswa hlm. 10) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-b",
  judul: "Subbab B: Membandingkan dan Mengurutkan",
  sumber: "Panduan Guru hlm. 25; Buku Siswa hlm. 10",
  latar: "#EFF6FF",
  kutipan: [
    "B. Membandingkan dan Mengurutkan Bilangan Cacah Sampai 100.000",
    "Setelah mempelajari bagian B ini, peserta didik diharapkan dapat",
    "membandingkan bilangan 100.000 dan",
    "mengurutkan bilangan 100.000.",
  ],
  ketukan: [
    k(
      "Subbab B, Membandingkan dan Mengurutkan Bilangan Cacah Sampai seratus ribu. Di subbab A kita sudah belajar membaca, menulis, dan menentukan nilai tempat.",
      tambah(0, judul("B. Membandingkan dan Mengurutkan")),
      tambah("Subbab", ...kartu("hA", 40, 52, 220, 36, W.hijauMuda, ["A: membaca, menulis,", "nilai tempat"], 9.4)),
      tambah("B,", ...kartu("hB", 40, 106, 220, 36, W.langit, ["B: membandingkan, mengurutkan"], 9.4)),
      tambah("seratus", teks("hs", 150, 170, "bilangan cacah sampai 100.000", 10.4, W.coklat)),
    ),
    k(
      "Sekarang bilangan-bilangan itu kita adu: mana yang lebih besar, mana yang lebih kecil.",
      bersih(0),
      tambah(0, judul("Mana yang lebih besar?")),
      tambah("Sekarang", ...kartu("n1", 24, 66, 100, 40, W.langit, ["56.475"], 14), ...kartu("n2", 176, 66, 100, 40, W.krem, ["43.217"], 14)),
      tambah("adu:", teks("q", 150, 94, "?", 26, W.merah)),
    ),
    k(
      "Menurut panduan guru, setelah mempelajari bagian ini peserta didik diharapkan dapat membandingkan bilangan sampai seratus ribu, dan mengurutkan bilangan sampai seratus ribu.",
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("membandingkan", ...kartu("g1", 24, 44, 252, 42, W.hijauMuda, ["membandingkan bilangan", "sampai 100.000"], 9.6)),
      tambah("mengurutkan", ...kartu("g2", 24, 106, 252, 42, W.langit, ["mengurutkan bilangan", "sampai 100.000"], 9.6)),
    ),
    k(
      "Kita mulai dari masalah Lukas di toko Komang. Dari harga papan dakon, kita belajar menentukan mana yang lebih besar, mana yang lebih kecil, dan bagaimana urutannya.",
      bersih(0),
      tambah(0, judul("Dari harga papan dakon")),
      tambah("Lukas", emo("kr", 60, 100, "🛒", 40)),
      tambah("besar,", teks("t1", 205, 70, "lebih besar?", 12, W.hijau)),
      tambah("kecil,", teks("t2", 205, 100, "lebih kecil?", 12, W.merah)),
      tambah("urutannya.", teks("t3", 150, 160, "urutannya?", 13, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Sarana, apersepsi, dan pemanasan (Panduan Guru hlm. 26) ------------------------------ */
export const ADEGAN_PERSIAPAN: AdeganStory = {
  id: "persiapan-b",
  judul: "Sarana, apersepsi, dan pemanasan",
  sumber: "Panduan Guru hlm. 26",
  latar: "#FFFBEB",
  kutipan: [
    "Kertas karton",
    "Penggaris",
    "Spidol",
    "Guru memulai materi ini dengan mengingatkan peserta didik pada materi",
    "sebelumnya, yaitu tentang cara membaca, menuliskan bilangan sampai",
    "100.000 dan nilai tempatnya.",
    "peserta didik diingatkan tentang cara membandingkan dan",
    "mengurutkan bilangan yang sudah mereka pelajari di kelas sebelumnya.",
    "guru dapat menggunakan pertanyaan",
    "Ayo Mengingat Kembali",
    "Guru mengajak peserta didik untuk menuliskan dua buah bilangan yang terdiri",
    "atas lima angka berbeda dengan menuliskannya di papan tulis.",
    "guru meminta peserta didik untuk membaca bilangan tersebut dan memberikan",
    "pertanyaan tentang bilangan yang lebih besar atau lebih kecil.",
    "Guru membagi peserta didik ke dalam beberapa kelompok kecil.",
    "Peserta didik dapat melakukan kegiatan Ayo Bermain di dalam atau di luar",
    "kelas.",
  ],
  ketukan: [
    k(
      "Sarana yang dibutuhkan sederhana: kertas karton, penggaris, dan spidol.",
      tambah(0, judul("Sarana dan media")),
      tambah("kertas", kotak("s1-k", 20, 46, 76, 78, W.langit), emo("s1-e", 58, 86, "📄", 28), teks("s1-t", 58, 112, "kertas karton", 7.6)),
      tambah("penggaris,", kotak("s2-k", 112, 46, 76, 78, W.krem), emo("s2-e", 150, 86, "📏", 28), teks("s2-t", 150, 112, "penggaris", 8.4)),
      tambah("spidol.", kotak("s3-k", 204, 46, 76, 78, W.pink), emo("s3-e", 242, 86, "🖍", 28), teks("s3-t", 242, 112, "spidol", 8.4)),
    ),
    k(
      "Apersepsi. Guru mengingatkan materi sebelumnya, yaitu cara membaca, menuliskan bilangan sampai seratus ribu, dan nilai tempatnya. Lalu guru mengingatkan cara membandingkan dan mengurutkan yang sudah dipelajari di kelas sebelumnya.",
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("materi", ...kartu("ap1", 24, 44, 252, 44, W.langit, ["membaca dan menulis bilangan", "sampai 100.000, nilai tempat"], 9.6)),
      tambah("Lalu", ...kartu("ap2", 24, 108, 252, 44, W.hijauMuda, ["membandingkan dan", "mengurutkan (kelas sebelumnya)"], 9.6)),
    ),
    k(
      "Untuk memancing pengetahuan peserta didik, guru dapat menggunakan pertanyaan pada Ayo Mengingat Kembali atau pada materi sebelumnya.",
      bersih(0),
      tambah(0, judul("Memancing pengetahuan")),
      tambah("memancing", emo("pm", 150, 84, "💭", 40)),
      tambah("Ayo", ...kartu("pn", 50, 108, 200, 40, W.krem, ["Ayo Mengingat Kembali"], 11)),
    ),
    k(
      "Pemanasan. Guru menuliskan dua bilangan lima angka yang berbeda di papan tulis. Contohnya lima puluh enam ribu empat ratus tujuh puluh lima dan empat puluh tiga ribu dua ratus tujuh belas.",
      bersih(0),
      tambah(0, judul("Pemanasan")),
      tambah("papan", kotak("pt", 20, 36, 260, 78, "#14532D", W.coklat, { rx: 6, tebal: 3 })),
      tambah("enam", teks("b1", 85, 84, "56.475", 20, W.putih)),
      tambah("tiga", teks("b2", 215, 84, "43.217", 20, W.putih)),
    ),
    k(
      "Peserta didik membaca kedua bilangan itu, lalu menjawab pertanyaan guru: bilangan mana yang lebih besar, dan bilangan mana yang lebih kecil?",
      tambah("besar,", teks("pb1", 85, 140, "lebih besar?", 12, W.hijau)),
      tambah("kecil?", teks("pb2", 215, 140, "lebih kecil?", 12, W.merah)),
    ),
    k(
      "Persiapan guru. Guru membentuk beberapa kelompok kecil, tiap kelompok menerima alat untuk Ayo Bermain, dan kegiatan boleh dilakukan di dalam atau di luar kelas.",
      bersih(0),
      tambah(0, judul("Persiapan guru")),
      tambah("kelompok", emo("pg", 60, 100, "👥", 40)),
      tambah("alat", ...kartu("pg1", 110, 52, 170, 36, W.langit, ["alat untuk Ayo Bermain"], 9)),
      tambah("boleh", ...kartu("pg2", 110, 108, 170, 36, W.hijauMuda, ["di dalam atau di luar kelas"], 9)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 1.2: Masalah Lukas (Buku Siswa hlm. 10) ------------------------------ */
const WARNA_DAKON = [W.hijauPita, W.merahPita, W.jingga, W.langit];
export const ADEGAN_MASALAH: AdeganStory = {
  id: "masalah-lukas",
  judul: "Eksplorasi 1.2: Masalah Lukas",
  sumber: "Buku Siswa hlm. 10",
  latar: "#F0FDF4",
  kutipan: [
    "Eksplorasi 1.2",
    "Masalah Lukas",
    "Lukas seorang siswa kelas V SD Pancasila.",
    "gurunya untuk membelikan papan mainan dakon di minimarket",
    "milik Komang. Terdapat empat jenis papan dakon dengan harga",
    "sebagai berikut.",
    "Rp56.560,00",
    "Rp65.750,00",
    "Rp57.000,00",
    "Rp75.360,00",
    "Jika kalian menjadi Lukas, bagaimanakah cara memutuskan",
    "membeli papan dakon tersebut? Ayo bantu Lukas menentukan",
    "papan dakon yang akan dibelinya.",
  ],
  ketukan: [
    k(
      "Eksplorasi satu titik dua, Masalah Lukas. Lukas, siswa kelas lima SD Pancasila, diminta gurunya membelikan papan mainan dakon di minimarket milik Komang.",
      tambah(0, judul("Eksplorasi 1.2: Masalah Lukas")),
      tambah("Lukas,", emo("lk", 60, 96, "🧒", 38)),
      tambah("papan", emo("dk", 150, 96, "🎲", 34)),
      tambah("minimarket", emo("mm", 240, 96, "🏪", 38)),
      tambah("Komang.", teks("tk", 150, 150, "papan mainan dakon", 12, W.coklat)),
    ),
    k(
      "Ada empat jenis papan dakon. Papan a harganya lima puluh enam ribu lima ratus enam puluh rupiah. Papan b, enam puluh lima ribu tujuh ratus lima puluh rupiah.",
      bersih(0),
      tambah(0, judul("Empat jenis papan dakon")),
      tambah("a", ...barisDakon("pa", 24, 50, DAKON[0].nama, DAKON[0].harga, WARNA_DAKON[0])),
      tambah("b,", ...barisDakon("pb", 24, 88, DAKON[1].nama, DAKON[1].harga, WARNA_DAKON[1])),
    ),
    k(
      "Papan c harganya lima puluh tujuh ribu rupiah. Papan d, tujuh puluh lima ribu tiga ratus enam puluh rupiah.",
      tambah("c", ...barisDakon("pc", 24, 126, DAKON[2].nama, DAKON[2].harga, WARNA_DAKON[2])),
      tambah("d,", ...barisDakon("pd", 24, 164, DAKON[3].nama, DAKON[3].harga, WARNA_DAKON[3])),
    ),
    k(
      "Jika kamu menjadi Lukas, bagaimana cara memutuskan membeli papan dakon itu? Ayo bantu Lukas menentukan papan dakon yang akan dibelinya.",
      bersih(0),
      tambah(0, judul("Papan mana yang dibeli?")),
      tambah("Jika", emo("pk", 80, 96, "🤔", 44)),
      tambah("memutuskan", ...kartu("pq", 130, 56, 150, 36, W.krem, ["bagaimana cara", "memutuskan?"], 9.6)),
      tambah("menentukan", ...kartu("pq2", 130, 108, 150, 36, W.hijauMuda, ["bantu Lukas", "menentukan"], 9.6)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Bermain: alat, langkah, dan kartu (Buku Siswa hlm. 11) ------------------------------ */
export const ADEGAN_BERMAIN: AdeganStory = {
  id: "ayo-bermain",
  judul: "Ayo Bermain: kartu papan dakon",
  sumber: "Buku Siswa hlm. 11–12",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Bermain",
    "Alat dan Bahan:",
    "Kertas karton",
    "Penggaris",
    "Spidol",
    "Mainkan permainan secara berkelompok dengan setiap",
    "kelompok beranggota 4 anak.",
    "Siapkan kertas karton dan potong-potonglah menyerupai papan",
    "dakon.",
    "Tuliskan angka yang tertera pada harga paket papan dakon",
    "tersebut pada tempat di bawah ini.",
    "No. Nama Harga Dakon yang Didapat",
    "Selanjutnya, mari kita bandingkan.",
    "Nilai Tempat",
  ],
  ketukan: [
    k(
      "Ayo Bermain. Alat dan bahannya ada tiga: kertas karton, penggaris, dan spidol. Mainkan secara berkelompok, tiap kelompok beranggota empat anak.",
      tambah(0, judul("Ayo Bermain")),
      tambah("Alat", ...kartu("a1", 14, 46, 84, 40, W.langit, ["kertas karton"], 8.6)),
      tambah("penggaris,", ...kartu("a2", 108, 46, 84, 40, W.krem, ["penggaris"], 8.6)),
      tambah("spidol.", ...kartu("a3", 202, 46, 84, 40, W.pink, ["spidol"], 8.6)),
      tambah("empat", emo("a4", 150, 150, "👥", 36)),
      tambah("anak.", teks("a5", 150, 186, "1 kelompok = 4 anak", 10, W.coklat)),
    ),
    k(
      "Langkah dua: siapkan kertas karton, lalu potong-potong menyerupai papan dakon. Setiap papan akan menjadi kartu harga.",
      bersih(0),
      tambah(0, judul("Potong karton menjadi papan")),
      tambah("kertas", kotak("pt1", 30, 60, 100, 50, W.krem, W.coklat)),
      tambah("potong-potong", emo("pt2", 150, 92, "✂", 28)),
      tambah("menyerupai", kotak("pt3", 170, 70, 100, 26, W.jingga, W.biru, { rx: 13 })),
      tambah("kartu", teks("pt4", 150, 160, "satu papan = satu kartu harga", 10, W.hijau)),
    ),
    k(
      "Langkah tiga: tuliskan angka pada harga papan dakon di tempat yang disediakan. Tabelnya punya kolom nomor, nama, dan harga dakon yang didapat, dengan empat baris. Kita isi dengan empat harga tadi.",
      bersih(0),
      tambah(0, judul("Tulis harga pada tabel")),
      tambah("Tabelnya", ...tabelUrut("tb", 84, 40, [{ nama: "a", harga: DAKON[0].harga }, { nama: "b", harga: DAKON[1].harga }, { nama: "c", harga: DAKON[2].harga }, { nama: "d", harga: DAKON[3].harga }])),
      tambah("isi", teks("tb-n", 150, 160, "baris 1 sampai 4: papan a, b, c, d", 9.4, W.coklat)),
    ),
    k(
      "Langkah empat: selanjutnya, mari kita bandingkan. Tiap kartu menuliskan harga dan nama papan yang diperoleh, lalu angkanya ditaruh pada tabel nilai tempat.",
      bersih(0),
      tambah(0, judul("Mari kita bandingkan")),
      tambah("Tiap", ...kartu("kt", 30, 44, 240, 36, W.krem, ["Kartu 1: 56.560, papan a"], 9.8)),
      tambah("angkanya", ...tabelTempat("mini", 10, 100, [{ nama: "a", n: DAKON[0].harga }], 50, 30, 20, 11)),
    ),
  ],
};
