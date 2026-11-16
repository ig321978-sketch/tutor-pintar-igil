import type { AdeganStory } from "./logika-story";
import { W, daftar, emo, judul, kartu, kisi100, panah, teks } from "./k4b2e-gambar";
import { bersih, k, tambah } from "./k4b2e-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab E (Buku Siswa hlm. 75; Panduan Guru hlm. 107) ------------------------------ */
export const ADEGAN_PEMBUKA_E: AdeganStory = {
  id: "pembuka-e",
  judul: "Sub-Bab E: Desimal dan Persen",
  sumber: "Buku Siswa hlm. 75; Panduan Guru hlm. 107",
  latar: "#F0F9FF",
  kutipan: [
    "E. Menghubungkan Pecahan Desimal Perseratusan",
    "banyak kalian temukan saat berbelanja disebuah swalayan",
    "Dapatkah kalian mengubah pecahan desimal perseratusan menjadi bentuk persen",
    "Dapatkah kalian menentukan hubungan antara pecahan desimal dengan konsep persen",
    "ayo ingat kembali konsep pecahan yang sudah kalian pelajari",
    "menghubungkan pecahan desimal perseratusan dengan konsep persen",
    "Alat Tulis",
    "Persen adalah bentuk pecahan biasa yang nilai penyebutnya 100 dan dinyatakan dengan lambang",
    "pembilang dan penyebut sama-sama dikalikan dengan bilangan bulat positif supaya bernilai 100",
    "Apakah persen itu?",
  ],
  ketukan: [
    k(
      "Sub-Bab E, menghubungkan pecahan desimal perseratusan dengan konsep persen. Di swalayan kita sering menemukan potongan harga atau diskon dalam bentuk persen. Dapatkah kalian mengubah desimal perseratusan menjadi persen?",
      bersih(0),
      tambah(0, judul("Desimal dan persen")),
      tambah("swalayan", emo("s1", 90, 86, "🛒", 40)),
      tambah("diskon", emo("s2", 210, 86, "🏷", 40)),
      tambah("persen@2", ...kartu("s3", 40, 102, 220, 28, W.krem, ["potongan harga: bentuk persen (%)"], 9.2)),
      tambah("Dapatkah", ...kartu("s4", 12, 142, 276, 30, W.hijauMuda, ["desimal perseratusan menjadi persen?"], 9.2)),
    ),
    k(
      "Panduan Guru: setelah belajar, murid diharapkan mampu menyatakan pecahan desimal persepuluhan dan perseratusan, serta menghubungkan desimal perseratusan dengan persen. Sarana yang dibutuhkan hanya alat tulis.",
      ...daftar("tj", "Tujuan dan sarana", [
        { at: "menyatakan", t: "menyatakan desimal persepuluhan dan perseratusan", w: W.langit, u: 8.6 },
        { at: "menghubungkan", t: "menghubungkan desimal perseratusan dengan persen", w: W.hijauMuda, u: 8.6 },
        { at: "Sarana", t: "sarana: alat tulis", w: W.krem, u: 9.6 },
      ]),
    ),
    k(
      "Apersepsi: persen adalah bentuk pecahan biasa berpenyebut seratus, dengan lambang persen. Mengubah pecahan biasa ke persen berarti mengalikan pembilang dan penyebut dengan bilangan yang sama sampai penyebutnya seratus. Pertanyaan pemantik: apakah persen itu?",
      ...daftar("ap", "Apersepsi", [
        { at: "berpenyebut", t: "persen = pecahan berpenyebut 100", w: W.hijauMuda, u: 9.6 },
        { at: "mengalikan", t: "kali bilangan sama sampai penyebut 100", w: W.krem, u: 9.2 },
        { at: "Pertanyaan", t: "pemantik: apakah persen itu?", w: W.pink, u: 9.6 },
      ]),
    ),
  ],
};

/* ------------------------------ 2. Ayo Mengamati (Buku Siswa hlm. 76-77; Panduan Guru hlm. 108) ------------------------------ */
export const ADEGAN_MENGAMATI_E: AdeganStory = {
  id: "mengamati-e",
  judul: "Ayo Mengamati: arti persen",
  sumber: "Materi: arti persen",
  latar: "#FFFBEB",
  kutipan: [
    "bisakah kamu memberikan contoh pecahan desimal perseratusan",
    "Baik ibu, misalnya 0,75",
    "Betul sekali, sekarang bagaimana mengubah desimal perseratusan tersebut menjadi pecahan biasa",
    "Maaf ibu saya masih bingung bentuk persen itu bagaimana",
    "bentuk persen adalah bentuk lain dari pecahan berpenyebut seratus",
    "Contoh 5% artinya",
    "Pertama kita ubah desimal perseratusan menjadi bentuk pecahan biasa",
    "Kedua jika sudah berbentuk perseratusan maka kita ubah menjadi bentuk",
    "Guru meminta peserta didik untuk mengamati gambar persen dan diskon di suatu swalayan",
  ],
  ketukan: [
    k(
      "Ayo kita amati. Coba sebutkan contoh pecahan desimal perseratusan. Misalnya nol koma tujuh lima. Betul sekali, itu contoh yang tepat.",
      bersih(0),
      tambah(0, judul("Ayo Mengamati")),
      tambah(0, emo("m1", 40, 64, "👩", 30)),
      tambah("contoh", ...kartu("m2", 70, 36, 220, 30, W.krem, ["contoh desimal perseratusan?"], 9.2)),
      tambah("Misalnya", emo("m3", 40, 124, "👧", 30)),
      tambah("nol", ...kartu("m4", 70, 98, 130, 30, W.hijauMuda, ["murid: 0,75"], 10.4)),
      tambah("Betul", ...kartu("m5", 70, 144, 220, 30, W.langit, ["betul sekali"], 10)),
    ),
    k(
      "Bagaimana mengubahnya menjadi pecahan biasa? Karena berbentuk desimal perseratusan, tinggal ditulis tujuh puluh lima per seratus.",
      bersih(0),
      tambah(0, judul("Menjadi pecahan biasa")),
      tambah("mengubahnya", teks("p1", 78, 100, "0,75", 22, W.biru)),
      tambah("tinggal", teks("p2", 150, 100, "=", 22, W.hitam)),
      tambah("tujuh", teks("p3", 224, 100, "75/100", 22, W.hijau)),
    ),
    k(
      "Mungkin kamu masih bingung, persen itu apa? Persen adalah bentuk lain dari pecahan berpenyebut seratus. Contohnya lima persen artinya lima per seratus.",
      bersih(0),
      tambah(0, judul("Arti persen")),
      tambah("bingung", ...kartu("a1", 12, 34, 276, 30, W.merahMuda, ["bingung: bentuk persen itu apa?"], 9.2)),
      tambah("adalah", ...kartu("a2", 12, 74, 276, 32, W.krem, ["persen: bentuk lain pecahan berpenyebut 100"], 9)),
      tambah("Contohnya", teks("a3", 150, 150, "5% = 5/100", 24, W.hijau)),
    ),
    k(
      "Jadi untuk mengubah desimal perseratusan menjadi persen ada dua langkah. Pertama, ubah menjadi pecahan biasa. Kedua, bila sudah berpenyebut seratus, ubah menjadi bentuk persen.",
      ...daftar("l", "Dua langkah", [
        { at: "Pertama,", t: "1. desimal perseratusan jadi pecahan biasa", w: W.langit, u: 9 },
        { at: "Kedua,", t: "2. berpenyebut 100: ubah jadi persen", w: W.hijauMuda, u: 9.2 },
      ]),
    ),
    k(
      "Jadi nol koma tujuh lima sama dengan tujuh puluh lima per seratus, ditulis tujuh puluh lima persen. Betul sekali.",
      bersih(0),
      tambah(0, judul("Satu contoh lengkap")),
      tambah("nol", ...kartu("c1", 30, 40, 240, 40, W.krem, ["0,75 = 75/100 = 75%"], 15)),
      tambah("sama", ...kartu("c2", 30, 94, 110, 28, W.langit, ["langkah 1: pecahan"], 8.6)),
      tambah("ditulis", ...kartu("c3", 160, 94, 110, 28, W.hijauMuda, ["langkah 2: persen"], 8.6)),
      tambah("betul", ...kartu("c4", 60, 140, 180, 30, W.pink, ["betul sekali, 75%"], 10.4)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Berlatih 1 (Buku Siswa hlm. 78-79; Panduan Guru hlm. 108-109) ------------------------------ */
export const ADEGAN_CONTOH_1E: AdeganStory = {
  id: "contoh-1e",
  judul: "Ayo Berlatih: 0,35 dan 2,46",
  sumber: "Materi: desimal ke persen",
  latar: "#F0FDF4",
  kutipan: [
    "Ubahlah pecahan desimal perseratusan berikut menjadi bentuk persen",
    "Langkah pertama : merubah bentuk desimal perseratusan menjadi",
    "Langkah kedua : mengubah ke bentuk persen",
    "Jadi bentuk persen dari 0,35 adalah 35%",
    "Jadi bentuk persen dari 2,46 adalah 246%",
    "Guru menjelaskan langkah-langkah pengerjaan dan menanyakan kepada peserta didik apa yang belum dipahami",
  ],
  ketukan: [
    k(
      "Ayo berlatih satu. Ubah nol koma tiga lima menjadi persen. Langkah pertama: ubah ke pecahan biasa, yaitu tiga puluh lima per seratus.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 1a")),
      tambah("Ubah", ...kartu("b1", 80, 32, 140, 28, W.krem, ["0,35 = ... %"], 12)),
      tambah("Langkah", ...kartu("b2", 12, 76, 276, 34, W.langit, ["langkah 1: 0,35 = 35/100"], 11)),
    ),
    k(
      "Langkah kedua: ubah ke persen. Tiga puluh lima per seratus sama dengan tiga puluh lima persen. Jadi nol koma tiga lima sama dengan tiga puluh lima persen.",
      tambah("kedua:", ...kartu("b3", 12, 120, 276, 34, W.hijauMuda, ["langkah 2: 35/100 = 35%"], 11)),
      tambah("Jadi", ...kartu("b4", 40, 164, 220, 28, W.pink, ["jadi 0,35 = 35%"], 11)),
    ),
    k(
      "Bagian b: dua koma empat enam. Pecahannya dua ratus empat puluh enam per seratus, jadi dua ratus empat puluh enam persen. Lebih dari seratus persen karena lebih dari satu utuh.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 1b")),
      tambah("Bagian", ...kartu("b5", 80, 32, 140, 26, W.krem, ["2,46 = ... %"], 12)),
      tambah("pecahannya", ...kartu("b6", 12, 66, 276, 28, W.langit, ["langkah 1: 2,46 = 246/100"], 10.4)),
      tambah("jadi", ...kartu("b7", 12, 102, 276, 28, W.hijauMuda, ["langkah 2: 246/100 = 246%"], 10.4)),
      tambah("Lebih", ...kartu("b8", 12, 138, 276, 26, W.merahMuda, ["lebih dari 100%: lebih dari 1 utuh"], 9.2)),
      tambah("utuh.", ...kartu("b9", 60, 170, 180, 24, W.pink, ["jadi 2,46 = 246%"], 10.4)),
    ),
    k(
      "Sekarang periksa jawabanmu. Pecahan desimal perseratusan selalu berpenyebut seratus. Jadi nol koma tiga lima sama dengan tiga puluh lima persen, dan dua koma empat enam sama dengan dua ratus empat puluh enam persen.",
      ...daftar("g", "Periksa jawabanmu", [
        { at: "Sekarang", t: "periksa dulu jawabanmu", w: W.langit, u: 9.2 },
        { at: "berpenyebut", t: "desimal perseratusan: penyebut 100", w: W.krem, u: 9.2 },
        { at: "Jadi", t: "0,35 = 35% dan 2,46 = 246%", w: W.hijauMuda, u: 9.6 },
      ]),
    ),
  ],
};

/* ------------------------------ 4. Contoh olahraga (Buku Siswa hlm. 79; Panduan Guru hlm. 109) ------------------------------ */
export const ADEGAN_CONTOH_2E: AdeganStory = {
  id: "contoh-2e",
  judul: "Contoh: persen siswa berolahraga",
  sumber: "Materi: persen dari pecahan",
  latar: "#FFF7ED",
  kutipan: [
    "Diketahui jumlah siswa kelas 4 SD di suatu sekolah adalah 50 siswa",
    "berapa persen siswa yang mengikuti olahraga tersebut",
    "Diubah ke dalam bentuk pecahan senilai yang berpenyebut 100",
    "banyak siswa yang sedang berolahraga di lapangan adalah sebesar",
  ],
  ketukan: [
    k(
      "Contoh dua. Di suatu sekolah ada lima puluh siswa kelas empat. Dua puluh siswa sedang mengikuti pelajaran olahraga. Berapa persen siswa yang berolahraga?",
      bersih(0),
      tambah(0, judul("Siswa berolahraga")),
      tambah(0, emo("o1", 46, 92, "🏃", 36)),
      tambah("lima", ...kartu("o2", 96, 34, 190, 28, W.krem, ["50 siswa kelas 4"], 10.4)),
      tambah("Dua@2", ...kartu("o3", 96, 70, 190, 28, W.langit, ["20 siswa olahraga"], 10.4)),
      tambah("Berapa", ...kartu("o4", 96, 106, 190, 28, W.pink, ["berapa persen?"], 10.4)),
    ),
    k(
      "Ubah ke pecahan senilai yang berpenyebut seratus. Lima puluh dikali dua menjadi seratus, maka dua puluh juga dikali dua, menjadi empat puluh.",
      bersih(0),
      tambah(0, judul("Pecahan senilai")),
      tambah("Ubah", teks("o5", 62, 108, "20/50", 22, W.biru)),
      tambah("senilai", teks("o6", 150, 108, "=", 22, W.hitam)),
      tambah("seratus.", teks("o7", 236, 108, "40/100", 22, W.hijau)),
      tambah("dikali", panah("o8", 90, 84, 120, 0, W.merah, 2)),
      tambah("dikali", teks("o9", 150, 76, "× 2", 11, W.merah)),
      tambah("juga", panah("o10", 90, 132, 120, 0, W.merah, 2)),
      tambah("juga", teks("o11", 150, 152, "× 2", 11, W.merah)),
    ),
    k(
      "Empat puluh per seratus sama dengan empat puluh persen. Jadi siswa yang sedang berolahraga di lapangan sebesar empat puluh persen.",
      bersih(0),
      tambah(0, judul("Jawabannya")),
      tambah("Empat", ...kartu("o12", 12, 50, 150, 28, W.krem, ["20/50 = 40/100"], 11)),
      tambah("sama", ...kartu("o13", 12, 90, 150, 28, W.hijauMuda, ["40/100 = 40%"], 11)),
      tambah("Jadi", ...kartu("o14", 12, 130, 150, 30, W.pink, ["jawab: 40%"], 12)),
      tambah("sebesar", ...kisi100("kg", 180, 40, 10, 40)),
      tambah("persen@2", teks("o15", 230, 160, "40 dari 100 kotak", 8.6, W.biru)),
    ),
  ],
};
