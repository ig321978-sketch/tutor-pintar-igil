import type { AdeganStory } from "./logika-story";
import { W, WARNA_SELAI, batang, emo, judul, kartu, kisi, pecahan, roti, teks } from "./k4b2d-gambar";
import { bersih, k, sorotkan, tambah, ubah, warnai } from "./k4b2d-bantu";

/* ------------------------------ 1. Pembuka subbab, apersepsi, pemantik (Panduan Guru hlm. 104; Buku Siswa hlm. 71) ------------------------------ */
const SUARA_P1 = "Selamat datang di subbab D bab dua, Pecahan Desimal Persepuluhan dan Perseratusan. Panduan guru meminta guru menjelaskan lebih dulu pengalaman belajar yang akan didapat murid.";
const SUARA_P2 = "Pengalaman belajarnya: murid mampu menyatakan pecahan desimal persepuluhan dan perseratusan. Sarana yang dibutuhkan hanya satu, yaitu alat tulis.";
const SUARA_P3 = "Apersepsi di panduan guru: pecahan desimal adalah pecahan yang penyebutnya sepuluh, seratus, seribu, dan seterusnya, yang ditulis memakai tanda koma. Subbab ini memakai sepuluh dan seratus.";
const SUARA_P4 = "Dua pertanyaan pemantik dari panduan guru: apakah pecahan desimal itu, dan bagaimana mengubah pecahan biasa menjadi desimal? Jawabannya kita cari lewat roti dan biskuit.";

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-subbab",
  judul: "Pembuka Subbab D: pengalaman belajar, apersepsi, pertanyaan pemantik",
  sumber: "Panduan Guru hlm. 104; Buku Siswa hlm. 71",
  latar: "#FFF7ED",
  kutipan: [
    "D. Pecahan desimal persepuluhan dan perseratusan",
    "Pengalaman Belajar",
    "Setelah mempelajari sub bab ini, Peserta didik diharapkan mampu",
    "menyatakan pecahan desimal persepuluhan dan perseratusan",
    "Kebutuhan Sarana Prasarana dan Media",
    "Alat Tulis",
    "Apersepsi",
    "Pecahan desimal adalah pecahan yang nilai penyebutnya adalah 10, 100,",
    "1000, dan seterusnya yang ditulis dengan menggunakan tanda koma.",
    "Pertanyaan Esensi/Pemantik:",
    "1. apakah pecahan desimal?",
    "2. bagaimana mengubah pecahan biasa menjadi desimal?",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Subbab D: pecahan desimal")),
      tambah("subbab", ...kartu("pd", 14, 34, 272, 40, W.emas, ["D. Pecahan Desimal", "Persepuluhan dan Perseratusan"], 9.4)),
      tambah("Panduan", emo("pe", 150, 112, "📘", 34)),
      tambah("pengalaman", ...kartu("pf", 40, 130, 220, 30, W.hijauMuda, ["pengalaman belajar murid"], 9.6)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("menyatakan", ...kartu("pg", 14, 34, 272, 54, W.langit, ["murid mampu menyatakan", "pecahan desimal persepuluhan", "dan perseratusan"], 9.4)),
      tambah("Sarana", ...kartu("ph", 40, 108, 220, 30, W.krem, ["sarana: alat tulis"], 9.6)),
      tambah("tulis.", emo("pi", 150, 172, "✏", 28)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Apersepsi: pecahan desimal")),
      tambah("penyebutnya", ...kartu("pj", 20, 34, 76, 38, W.hijauMuda, ["10"], 13), ...kartu("pk", 112, 34, 76, 38, W.langit, ["100"], 13)),
      tambah("seribu,", ...kartu("pl", 204, 34, 76, 38, W.krem, ["1000"], 13)),
      tambah("seterusnya,", teks("pm", 150, 92, "dan seterusnya", 9.4, W.coklat)),
      tambah("koma.", ...kartu("pn", 40, 108, 220, 34, W.emas, ["ditulis dengan tanda koma"], 9.6)),
      sorotkan("Subbab", "pj-k", "pk-k"),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Dua pertanyaan pemantik")),
      tambah("apakah", emo("po", 28, 66, "❓", 24), ...kartu("pp", 48, 46, 238, 40, W.hijauMuda, ["1. apakah pecahan", "desimal itu?"], 9.2)),
      tambah("bagaimana", emo("pq", 28, 130, "❓", 24), ...kartu("pr", 48, 108, 238, 44, W.langit, ["2. bagaimana mengubah pecahan", "biasa menjadi desimal?"], 9.2)),
      tambah("roti", emo("ps", 150, 184, "🍞", 24)),
    ),
  ],
};

/* ------------------------------ 2. Ayo Mengamati: sepuluh roti (Buku Siswa hlm. 71; Panduan Guru hlm. 105) ------------------------------ */
const SUARA_R1 = "Ayo Mengamati. Ibu guru membuka pelajaran: hari ini kita akan belajar pecahan desimal. Seorang murid bertanya, pecahan desimal itu apa?";
const SUARA_R2 = "Untuk menjawabnya, Ibu sudah menyiapkan roti yang jumlahnya sepuluh. Satu roti dilapisi selai coklat.";
const SUARA_R3 = "Bagaimana bentuk pecahannya? Murid menjawab satu per sepuluh, karena satu dari sepuluh roti dilapisi selai.";
const SUARA_R4 = "Jadi satu roti berselai dari sepuluh roti menandakan persepuluhan, atau satu per sepuluh, atau nol koma satu dalam pecahan desimal. Kegiatan ini boleh diganti dengan benda di sekitar kita.";

export const ADEGAN_AMATI_ROTI: AdeganStory = {
  id: "amati-roti",
  judul: "Ayo Mengamati: sepuluh roti, satu berselai",
  sumber: "Materi: sepuluh roti, satu berselai",
  latar: "#FEF3C7",
  kutipan: [
    "Ayo Mengamati",
    "Hari ini kita akan belajar pecahan desimal",
    "Baik Ibu, pecahan desimal itu apa?",
    "ibu sudah siapkan roti yang jumlahnya ada 10.",
    "1 roti dilapisi selai coklat. Bagaimana bentuk pecahannya?",
    "mengamati gambar 10 buah roti yang salah satu roti tersebut diberi selai coklat.",
    "Kegiatan ini dapat diganti disesuaikan",
    "menandakan persepuluhan atau",
    "atau 0,1 dalam bentuk pecahan desimal.",
  ],
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ayo Mengamati")),
      tambah("Ibu", emo("ra", 26, 58, "👩", 26), ...kartu("rb", 48, 38, 238, 38, W.langit, ["Ibu: hari ini kita belajar", "pecahan desimal"], 9)),
      tambah("Seorang", emo("rc", 26, 128, "🧒", 26), ...kartu("rd", 48, 98, 238, 44, W.krem, ["Murid: pecahan desimal itu apa?"], 9.2)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Sepuluh roti")),
      tambah("roti", ...roti("rt", 62, 66)),
      tambah("sepuluh.", teks("ru", 114, 132, "10 roti", 11, W.coklat)),
      warnai("Satu", WARNA_SELAI, "rt-o0"),
      tambah("selai", teks("rv", 114, 152, "1 roti berselai coklat", 9.4, W.coklat)),
      sorotkan("Satu", "rt-o0"),
    ),
    k(
      SUARA_R3,
      ubah(0, { id: "rt-o0", sorot: false }),
      tambah("Bagaimana", teks("rw", 240, 40, "bentuk pecahan?", 9, W.merah)),
      tambah("satu", ...pecahan("rx", 240, 78, "1", "10", 22, W.biru)),
      tambah("karena", teks("ry", 114, 172, "1 dari 10 roti", 9.4, W.hijau)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Satu dari sepuluh roti")),
      tambah("persepuluhan,", ...kartu("rz1", 12, 36, 84, 40, W.hijauMuda, ["persepuluhan"], 8.4)),
      tambah("satu@2", ...kartu("rz2", 108, 36, 78, 40, W.langit, ["1/10"], 13)),
      tambah("nol", ...kartu("rz3", 198, 36, 90, 40, W.emas, ["0,1"], 13)),
      tambah("diganti", ...kartu("rz4", 14, 100, 272, 34, W.krem, ["boleh diganti benda di sekitar kita"], 9)),
      tambah("benda", emo("rz5", 150, 170, "🍎", 26)),
    ),
  ],
};

/* ------------------------------ 3. Tiga per sepuluh dan seratus biskuit (Buku Siswa hlm. 72) ------------------------------ */
const SUARA_B1 = "Ibu melanjutkan: bentuk satu per sepuluh bisa dituliskan dalam bentuk desimal menjadi nol koma satu. Perhatikan tanda koma di tengahnya.";
const SUARA_B2 = "Seorang murid bertanya, berarti tiga per sepuluh dapat dituliskan menjadi nol koma tiga, Ibu? Ibu menjawab, benar sekali.";
const SUARA_B3 = "Selanjutnya Ibu punya seratus biskuit, dan satu biskuit dilapisi selai coklat. Bagaimana bentuk pecahannya? Murid menjawab satu per seratus.";
const SUARA_B4 = "Ibu membenarkan: satu per seratus dituliskan dalam bentuk desimal nol koma nol satu. Perhatikan, ada dua angka di belakang koma. Apakah kalian sudah paham?";

export const ADEGAN_TIGA_BISKUIT: AdeganStory = {
  id: "tiga-persepuluh-biskuit",
  judul: "Dari satu per sepuluh ke satu per seratus",
  sumber: "Materi: dari persepuluhan ke perseratusan",
  latar: "#F0FDF4",
  kutipan: [
    "bisa dituliskan",
    "dalam bentuk desimal menjadi 0,1.",
    "Berarti jika ada pecahan",
    "dapat kita tuliskan",
    "menjadi 0,3 Ibu?",
    "Benar sekali. Selanjutnya jika kita memiliki 100 biskuit,",
    "lalu 1 biskuit dilapisi selai coklat. Bagaimana bentuk",
    "pecahannya?",
    "Ya benar,",
    "itu bisa dituliskan dalam bentuk desimal 0,01. Apakah",
    "kalian sudah paham?",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Pecahan menjadi desimal")),
      tambah("satu", ...pecahan("ba", 80, 76, "1", "10", 22)),
      tambah("desimal", teks("bb", 134, 86, "=", 22, W.biru)),
      tambah("nol", teks("bc", 196, 88, "0,1", 28, W.hijau)),
      tambah("satu@2", ...batang("bd", 40, 124, 22, 1)),
      tambah("Perhatikan", teks("be", 150, 164, "1 dari 10 bagian sama", 9.4, W.coklat)),
      sorotkan("tengahnya", "bc"),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Tiga per sepuluh")),
      tambah("tiga", ...pecahan("bf", 80, 70, "3", "10", 22)),
      tambah("menjadi", teks("bg", 134, 80, "=", 22, W.biru)),
      tambah("nol", teks("bh", 196, 82, "0,3", 28, W.hijau)),
      tambah("tiga@2", ...batang("bi", 40, 118, 22, 3)),
      tambah("Ibu?", teks("bj", 150, 160, "3 dari 10 bagian sama", 9.4, W.coklat)),
      tambah("benar", emo("bk", 150, 190, "✅", 20)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Seratus biskuit")),
      tambah("seratus", ...kisi("bl", 20, 34, 12, 1)),
      tambah("biskuit,", teks("bm", 80, 172, "100 biskuit, 1 berselai", 9.4, W.coklat)),
      tambah("satu@2", ...pecahan("bn", 228, 80, "1", "100", 22)),
    ),
    k(
      SUARA_B4,
      tambah("membenarkan:", teks("bo", 228, 124, "=", 18, W.biru)),
      tambah("nol", teks("bp", 228, 156, "0,01", 26, W.hijau)),
      tambah("dua", teks("bq", 228, 174, "2 angka di belakang koma", 8, W.merah)),
      sorotkan("dua", "bp"),
    ),
  ],
};

/* ------------------------------ 4. Contoh pecahan desimal dan aturan angka di belakang koma (Buku Siswa hlm. 73) ------------------------------ */
const SUARA_C1 = "Murid lain bertanya: jika saya punya tujuh per seratus, bisa dituliskan nol koma nol tujuh, apakah benar, Ibu? Ibu menjawab, betul sekali.";
const SUARA_C2 = "Sekarang perhatikan contoh pecahan desimal. Contoh pertama: satu angka di belakang koma. Karena ada satu angka di belakang koma, nilai penyebutnya sepuluh. Jadi nol koma satu sama dengan satu per sepuluh.";
const SUARA_C3 = "Contoh kedua: dua angka di belakang koma. Karena ada dua angka di belakang koma, nilai penyebutnya seratus. Jadi nol koma dua lima sama dengan dua puluh lima per seratus.";
const SUARA_C4 = "Aturannya mudah diingat: banyak angka di belakang koma menentukan penyebutnya. Satu angka berarti sepuluh, dua angka berarti seratus.";
const SUARA_C5 = "Coba pada contoh tadi: nol koma tiga punya satu angka, jadi tiga per sepuluh. Nol koma nol tujuh punya dua angka, jadi tujuh per seratus.";

export const ADEGAN_CONTOH_KOMA: AdeganStory = {
  id: "contoh-angka-koma",
  judul: "Contoh pecahan desimal: banyak angka di belakang koma",
  sumber: "Materi: angka di belakang koma",
  latar: "#F5F3FF",
  kutipan: [
    "Berarti jika saya punya bentuk pecahan",
    "bisa dituliskan dalam bentuk desimal menjadi 0,07.",
    "Apakah benar Ibu?",
    "Betul sekali",
    "Contoh pecahan desimal",
    "1 angka di belakang koma",
    "Karena terdapat 1 angka di belakang koma, maka nilai penyebut 10",
    "2 angka di belakang koma",
    "Karena terdapat 2 angka di belakang koma, maka nilai penyebut 100",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Tujuh per seratus")),
      tambah("tujuh", ...pecahan("ca", 62, 66, "7", "100", 22)),
      tambah("nol", teks("cb", 112, 76, "=", 22, W.biru), teks("cc", 190, 78, "0,07", 28, W.hijau)),
      tambah("Ibu?", ...kisi("cd", 40, 112, 7, 7)),
      tambah("betul", teks("ce", 200, 140, "7 dari 100 kotak", 9, W.coklat), emo("cf", 200, 170, "✅", 22)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Contoh pecahan desimal")),
      tambah("satu", ...kartu("cg", 14, 30, 272, 28, W.krem, ["1 angka di belakang koma"], 9.4)),
      tambah("sepuluh.", teks("ch", 150, 82, "penyebut 10", 11, W.merah)),
      tambah("nol", teks("ci", 66, 130, "0,1", 28, W.hijau), teks("cj", 116, 130, "=", 22, W.biru)),
      tambah("satu@4", ...pecahan("ck", 176, 124, "1", "10", 22)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Contoh pecahan desimal")),
      tambah("dua", ...kartu("cl", 14, 30, 272, 28, W.langit, ["2 angka di belakang koma"], 9.4)),
      tambah("seratus.", teks("cm", 150, 82, "penyebut 100", 11, W.merah)),
      tambah("nol", teks("cn", 62, 130, "0,25", 28, W.hijau), teks("co", 118, 130, "=", 22, W.biru)),
      tambah("dua@4", ...pecahan("cp", 184, 124, "25", "100", 22)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Aturan angka di belakang koma")),
      tambah("Satu", ...kartu("cq", 14, 40, 272, 40, W.hijauMuda, ["1 angka  →  penyebut 10"], 11)),
      tambah("dua", ...kartu("cr", 14, 94, 272, 40, W.langit, ["2 angka  →  penyebut 100"], 11)),
      tambah("menentukan", emo("cs", 150, 176, "🔑", 26)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Menerapkan aturan")),
      tambah("tiga", ...kartu("ct", 14, 34, 272, 40, W.hijauMuda, ["0,3  →  1 angka  →  3/10"], 11)),
      tambah("tujuh", ...kartu("cu", 14, 88, 272, 40, W.langit, ["0,07  →  2 angka  →  7/100"], 11)),
      tambah("dua", emo("cv", 150, 170, "✅", 24)),
    ),
  ],
};
