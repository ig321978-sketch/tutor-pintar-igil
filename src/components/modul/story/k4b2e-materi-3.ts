import type { AdeganStory } from "./logika-story";
import { W, barisTabel, daftar, emo, judul, kartu, kisi100, tabel, teks } from "./k4b2e-gambar";
import { bersih, k, tambah } from "./k4b2e-bantu";

/* ------------------------------ 9. Uji Kompetensi 1-4: pecahan (Buku Siswa hlm. 83; Panduan Guru hlm. 111-112) ------------------------------ */
export const ADEGAN_UK_PECAHAN: AdeganStory = {
  id: "uk-pecahan",
  judul: "Latihan: membandingkan pecahan",
  sumber: "Materi: membandingkan pecahan",
  latar: "#FFF7ED",
  kutipan: [
    "Uji Kompetensi",
    "Bandingkan 2 pecahan di bawah ini dengan tanda",
    "Urutkan pecahan berikut dari yang terkecil",
    "Ibu mempunyai satu buah semangka",
    "Siapakah yang menerima bagian semangka paling besar",
    "Siapakah yang menerima bagian roti paling sedikit",
    "Jawab: Putu",
    "Jawab: Wiwin",
  ],
  ketukan: [
    k(
      "Sebagai penutup bab, mari berlatih. Coba bandingkan dua pecahan. Satu per tiga kurang dari satu per satu. Satu per tujuh kurang dari satu per lima. Lima per sembilan lebih dari tiga per sembilan.",
      bersih(0),
      tambah(0, judul("Coba bandingkan")),
      tambah("tiga", ...kartu("u1a", 40, 34, 220, 26, W.krem, ["a. 1/3 < 1/1"], 11)),
      tambah("tujuh", ...kartu("u1b", 40, 68, 220, 26, W.krem, ["b. 1/7 < 1/5"], 11)),
      tambah("sembilan", ...kartu("u1c", 40, 102, 220, 26, W.krem, ["c. 5/9 > 3/9"], 11)),
    ),
    k(
      "Dua per enam kurang dari tiga per enam. Sebelas per tujuh belas lebih dari tiga per tujuh belas.",
      tambah("enam", ...kartu("u1d", 40, 136, 220, 26, W.krem, ["d. 2/6 < 3/6"], 11)),
      tambah("Sebelas", ...kartu("u1e", 40, 170, 220, 26, W.krem, ["e. 11/17 > 3/17"], 11)),
    ),
    k(
      "Aturannya: bila penyebut sama, bandingkan pembilangnya. Bila pembilang sama, penyebut lebih besar berarti nilainya lebih kecil.",
      bersih(0),
      tambah(0, judul("Aturan membandingkan")),
      tambah("penyebut", ...kartu("ua", 12, 40, 276, 44, W.hijauMuda, ["penyebut sama:", "bandingkan pembilang"], 10)),
      tambah("pembilang@2", ...kartu("ub", 12, 100, 276, 44, W.langit, ["pembilang sama:", "penyebut besar = nilai kecil"], 10)),
    ),
    k(
      "Sekarang urutkan dari yang terkecil. Satu per empat, satu per tiga, satu per dua. Lalu satu per dua puluh satu, satu per tujuh belas, satu per tiga belas. Dan dua per delapan, lima per delapan, tujuh per delapan.",
      bersih(0),
      tambah(0, judul("Urutkan dari terkecil")),
      tambah("empat", ...kartu("u2a", 20, 36, 260, 26, W.krem, ["a. 1/4, 1/3, 1/2"], 11)),
      tambah("Lalu", ...kartu("u2b", 20, 72, 260, 26, W.krem, ["b. 1/21, 1/17, 1/13"], 11)),
      tambah("delapan", ...kartu("u2c", 20, 108, 260, 26, W.krem, ["c. 2/8, 5/8, 7/8"], 11)),
    ),
    k(
      "Berikutnya tiga per tujuh, enam per tujuh, tujuh per tujuh, dan dua belas per enam belas, empat belas per enam belas, lima belas per enam belas. Urutkan juga yang terakhir ini dari yang kecil ke yang besar.",
      tambah("Berikutnya", ...kartu("u2d", 20, 144, 260, 26, W.krem, ["d. 3/7, 6/7, 7/7"], 11)),
      tambah("dan", ...kartu("u2e", 20, 176, 260, 22, W.krem, ["e. 12/16, 14/16, 15/16"], 10.4)),
    ),
    k(
      "Sekarang cerita semangka: seperempat untuk Helen, sisanya untuk Putu. Helen mendapat satu per empat, Putu tiga per empat. Bagian terbesar milik Putu.",
      bersih(0),
      tambah(0, judul("Cerita semangka")),
      tambah(0, emo("u3", 150, 82, "🍉", 40)),
      tambah("Helen", ...kartu("u3a", 20, 100, 120, 28, W.pink, ["Helen = 1/4"], 11)),
      tambah("Putu@2", ...kartu("u3b", 160, 100, 120, 28, W.hijauMuda, ["Putu = 3/4"], 11)),
      tambah("Bagian", ...kartu("u3c", 60, 144, 180, 30, W.krem, ["paling besar: Putu"], 11)),
    ),
    k(
      "Sekarang cerita roti: Wiwin mendapat satu per tiga roti, Tomas dua per tiga. Penyebutnya sama dan satu kurang dari dua, jadi paling sedikit Wiwin.",
      bersih(0),
      tambah(0, judul("Cerita roti")),
      tambah(0, emo("u4", 150, 82, "🍞", 40)),
      tambah("Wiwin", ...kartu("u4a", 20, 100, 120, 28, W.hijauMuda, ["Wiwin = 1/3"], 11)),
      tambah("Tomas", ...kartu("u4b", 160, 100, 120, 28, W.langit, ["Tomas = 2/3"], 11)),
      tambah("sedikit", ...kartu("u4c", 60, 144, 180, 30, W.krem, ["paling sedikit: Wiwin"], 11)),
    ),
  ],
};

/* ------------------------------ 10. Uji Kompetensi 5-6: desimal (Buku Siswa hlm. 83-84; Panduan Guru hlm. 112; rubrik hlm. 115) ------------------------------ */
export const ADEGAN_UK_DESIMAL: AdeganStory = {
  id: "uk-desimal",
  judul: "Latihan: pecahan ke desimal",
  sumber: "Materi: pecahan ke desimal",
  latar: "#F0FDF4",
  kutipan: [
    "Ubahkan pecahan biasa berikut menjadi pecahan desimal persepuluhan",
    "Ubahkan pecahan biasa berikut menjadi pecahan desimal perseratusan",
    "= 0,3",
    "= 2,5",
    "= 0,81",
    "= 0,99",
  ],
  ketukan: [
    k(
      "Sekarang ubah ke desimal persepuluhan. Tiga per sepuluh jadi nol koma tiga, empat per sepuluh nol koma empat, dua per sepuluh nol koma dua, enam per sepuluh nol koma enam, dua puluh lima per sepuluh dua koma lima.",
      bersih(0),
      tambah(0, judul("Desimal persepuluhan")),
      tambah("Tiga", ...kartu("d5a", 40, 34, 220, 26, W.krem, ["a. 3/10 = 0,3"], 11)),
      tambah("empat", ...kartu("d5b", 40, 68, 220, 26, W.krem, ["b. 4/10 = 0,4"], 11)),
      tambah("dua", ...kartu("d5c", 40, 102, 220, 26, W.krem, ["c. 2/10 = 0,2"], 11)),
      tambah("enam", ...kartu("d5d", 40, 136, 220, 26, W.krem, ["d. 6/10 = 0,6"], 11)),
      tambah("lima", ...kartu("d5e", 40, 170, 220, 26, W.krem, ["e. 25/10 = 2,5"], 11)),
    ),
    k(
      "Lanjut, ubah ke desimal perseratusan. Delapan puluh satu per seratus jadi nol koma delapan satu, tujuh puluh sembilan per seratus nol koma tujuh sembilan, empat puluh lima per seratus nol koma empat lima.",
      bersih(0),
      tambah(0, judul("Desimal perseratusan")),
      tambah("Delapan", ...kartu("d6a", 40, 34, 220, 26, W.krem, ["a. 81/100 = 0,81"], 11)),
      tambah("tujuh", ...kartu("d6b", 40, 68, 220, 26, W.krem, ["b. 79/100 = 0,79"], 11)),
      tambah("empat@2", ...kartu("d6c", 40, 102, 220, 26, W.krem, ["c. 45/100 = 0,45"], 11)),
    ),
    k(
      "Bagian d: enam puluh enam per seratus menjadi nol koma enam enam. Bagian e: sembilan puluh sembilan per seratus, nol koma sembilan sembilan.",
      tambah("Bagian", ...kartu("d6d", 40, 136, 220, 26, W.krem, ["d. 66/100 = 0,66"], 11)),
      tambah("Bagian@2", ...kartu("d6e", 40, 170, 220, 26, W.krem, ["e. 99/100 = 0,99"], 11)),
    ),
    k(
      "Hati-hati, kesalahan yang sering terjadi: menulis sembilan puluh sembilan per seratus menjadi nol koma sembilan. Ingat, perseratusan punya dua angka di belakang koma, jadi nol koma sembilan sembilan.",
      bersih(0),
      tambah(0, judul("Hati-hati", W.merah)),
      tambah("kesalahan", ...kartu("d7a", 12, 44, 276, 30, W.merahMuda, ["sering keliru: hanya satu angka"], 10)),
      tambah("Ingat", ...kartu("d7b", 12, 90, 276, 30, W.krem, ["perseratusan: dua angka setelah koma"], 10)),
      tambah("jadi", ...kartu("d7c", 12, 136, 276, 30, W.hijauMuda, ["99/100 = 0,99 (bukan 0,9)"], 10)),
    ),
  ],
};

/* ------------------------------ 11. Uji Kompetensi 7-10: persen (Buku Siswa hlm. 84; Panduan Guru hlm. 113-114) ------------------------------ */
const TAB_UK7 = tabel(
  "t7",
  35,
  40,
  [30, 100, 100],
  [
    ["", "desimal", "persen"],
    ["a", "0,05", "5%"],
    ["b", "0,25", "25%"],
    ["c", "1,38", "138%"],
    ["d", "20,05", "2005%"],
  ],
  22,
  10,
);
const TAB_UK8 = tabel(
  "t8",
  35,
  40,
  [30, 100, 100],
  [
    ["", "persen", "desimal"],
    ["a", "35%", "0,35"],
    ["b", "56%", "0,56"],
    ["c", "125%", "1,25"],
    ["d", "455%", "4,55"],
  ],
  22,
  10,
);
export const ADEGAN_UK_PERSEN: AdeganStory = {
  id: "uk-persen",
  judul: "Latihan: desimal dan persen",
  sumber: "Materi: desimal dan persen",
  latar: "#FDF4FF",
  kutipan: [
    "Ubahlah pecahan desimal perseratusan berikut menjadi bentuk persen",
    "Ubahlah bentuk persen berikut menjadi bentuk pecahan desimal",
    "d. 20,05 = 2005 %",
    "d. 455% = 4,55",
    "Suatu sekolah memilih 30 siswa dari 100 orang siswa yang akan diikutkan lomba berlari",
    "= 0,30 = 30%",
    "Nazilla bisa menjawab dengan benar 6 pertanyaan dari 10 soal yang diberikan",
    "x 100% = 60%",
  ],
  ketukan: [
    k(
      "Sekarang desimal perseratusan menjadi persen. Nol koma nol lima menjadi lima persen. Nol koma dua lima menjadi dua puluh lima persen. Satu koma tiga delapan menjadi seratus tiga puluh delapan persen. Dua puluh koma nol lima menjadi dua ribu lima persen.",
      bersih(0),
      tambah(0, judul("Ke persen")),
      tambah("Sekarang", ...barisTabel(TAB_UK7, "t7", 0)),
      tambah("Nol", ...barisTabel(TAB_UK7, "t7", 1)),
      tambah("Nol@3", ...barisTabel(TAB_UK7, "t7", 2)),
      tambah("Satu", ...barisTabel(TAB_UK7, "t7", 3)),
      tambah("Dua@3", ...barisTabel(TAB_UK7, "t7", 4)),
    ),
    k(
      "Sekarang kebalikannya: persen menjadi desimal perseratusan. Tiga puluh lima persen, nol koma tiga lima. Lima puluh enam persen, nol koma lima enam. Seratus dua puluh lima persen, satu koma dua lima. Empat ratus lima puluh lima persen, empat koma lima lima.",
      bersih(0),
      tambah(0, judul("Ke desimal")),
      tambah("Sekarang", ...barisTabel(TAB_UK8, "t8", 0)),
      tambah("Tiga", ...barisTabel(TAB_UK8, "t8", 1)),
      tambah("Lima@3", ...barisTabel(TAB_UK8, "t8", 2)),
      tambah("Seratus@2", ...barisTabel(TAB_UK8, "t8", 3)),
      tambah("Empat", ...barisTabel(TAB_UK8, "t8", 4)),
    ),
    k(
      "Sekarang cerita lomba: sekolah memilih tiga puluh dari seratus siswa untuk lomba lari. Tiga puluh per seratus sama dengan nol koma tiga nol, yaitu tiga puluh persen.",
      bersih(0),
      tambah(0, judul("Lomba lari")),
      tambah("sekolah", ...kartu("w1", 12, 40, 150, 28, W.krem, ["30 dari 100 siswa"], 10)),
      tambah("Tiga", ...kartu("w2", 12, 84, 150, 28, W.langit, ["30/100 = 0,30"], 10.4)),
      tambah("yaitu", ...kartu("w3", 12, 128, 150, 30, W.pink, ["0,30 = 30%"], 11)),
      tambah("persen.", ...kisi100("kg", 180, 50, 10, 30)),
    ),
    k(
      "Cerita berikutnya: Nazilla menjawab benar enam dari sepuluh pertanyaan. Enam per sepuluh dikali seratus persen sama dengan enam puluh persen. Jadi nilainya enam puluh persen.",
      bersih(0),
      tambah(0, judul("Pertanyaan benar")),
      tambah("Nazilla", ...kartu("w4", 12, 40, 150, 28, W.krem, ["6 dari 10 benar"], 9.4)),
      tambah("Enam@2", ...kartu("w5", 12, 84, 150, 30, W.langit, ["6/10 × 100% = 60%"], 9.4)),
      tambah("Jadi", ...kartu("w6", 12, 128, 150, 30, W.pink, ["jawab: 60%"], 11)),
      tambah("sepuluh", ...kisi100("kg", 180, 50, 10, 60)),
    ),
  ],
};

/* ------------------------------ 12. Rubrik penilaian (Panduan Guru hlm. 113-116) ------------------------------ */
const TAB_BOBOT = tabel(
  "rb",
  18,
  36,
  [74, 80, 110],
  [
    ["butir", "isi", "bobot"],
    ["1 sampai 4", "pecahan", "4 × 10 = 40"],
    ["5 dan 6", "desimal", "2 × 10 = 20"],
    ["7 sampai 10", "persen", "4 × 10 = 40"],
    ["jumlah", "", "40 + 20 + 40 = 100"],
  ],
  22,
  9,
);
const TAB_KUNCI = tabel(
  "rk",
  12,
  30,
  [36, 240],
  [
    ["soal", "kunci Uji Kompetensi"],
    ["3", "Helen 1/4, Putu 3/4; terbesar Putu"],
    ["4", "paling sedikit: Wiwin"],
    ["5", "0,3  0,4  0,2  0,6  2,5"],
    ["6", "0,81  0,79  0,45  0,66  0,99"],
    ["7", "5%  25%  138%  2005%"],
    ["8", "0,35  0,56  1,25  4,55"],
    ["9", "30%"],
    ["10", "60%"],
  ],
  17,
  8.6,
);
export const ADEGAN_RUBRIK_E: AdeganStory = {
  id: "rubrik-e",
  judul: "Rubrik Penilaian dan kunci",
  sumber: "Panduan Guru hlm. 111–116",
  latar: "#F8FAFC",
  kutipan: [
    "B. Rubrik Penilaian Pengetahuan",
    "Tabel 2.2 Pedoman Penilaian Hasil Belajar",
    "Peserta didik tidak menjawab sama sekali",
    "Peserta didik bisa menjawab tetapi kurang lengkap",
    "Peserta didik bisa menjawab dengan benar",
    "x 100% = 60%",
  ],
  ketukan: [
    k(
      "Rubrik penilaian pengetahuan di Panduan Guru memuat sepuluh butir. Skor nol bila murid tidak menjawab sama sekali, lima bila menjawab tetapi kurang lengkap, dan sepuluh bila menjawab dengan benar.",
      bersih(0),
      tambah(0, judul("Rubrik penilaian")),
      tambah("Skor", ...kartu("r1", 12, 36, 276, 30, W.merahMuda, ["skor 0: tidak menjawab sama sekali"], 9.6)),
      tambah("lima", ...kartu("r2", 12, 76, 276, 30, W.krem, ["skor 5: menjawab, kurang lengkap"], 9.6)),
      tambah("sepuluh@2", ...kartu("r3", 12, 116, 276, 30, W.hijauMuda, ["skor 10: menjawab dengan benar"], 9.6)),
    ),
    k(
      "Bobot maksimum tiap butir sepuluh. Butir satu sampai empat membahas pecahan, lima dan enam desimal, tujuh sampai sepuluh persen. Jadi empat kali sepuluh empat puluh, dua kali sepuluh dua puluh, seluruhnya seratus.",
      bersih(0),
      tambah(0, judul("Bobot butir")),
      tambah("Bobot", ...barisTabel(TAB_BOBOT, "rb", 0)),
      tambah("satu", ...barisTabel(TAB_BOBOT, "rb", 1)),
      tambah("lima", ...barisTabel(TAB_BOBOT, "rb", 2)),
      tambah("tujuh", ...barisTabel(TAB_BOBOT, "rb", 3)),
      tambah("seluruhnya", ...barisTabel(TAB_BOBOT, "rb", 4)),
    ),
    k(
      "Contoh nilai akhir di rubrik: enam per sepuluh dikali seratus persen sama dengan enam puluh persen. Nilai akhir dihitung dari skor yang diperoleh murid dibagi skor maksimum.",
      bersih(0),
      tambah(0, judul("Nilai akhir")),
      tambah("Contoh", ...kartu("r4", 30, 40, 240, 34, W.krem, ["6/10 × 100% = 60%"], 13)),
      tambah("Nilai@2", ...kartu("r5", 30, 90, 240, 30, W.langit, ["skor murid ÷ skor maksimum"], 10.4)),
    ),
    k(
      "Rekap kunci soal tiga sampai sepuluh: Putu terbesar, Wiwin paling sedikit, lalu desimal persepuluhan, desimal perseratusan, persen, kembali ke desimal, tiga puluh persen, dan enam puluh persen.",
      bersih(0),
      tambah(0, judul("Rekap kunci")),
      tambah("Rekap", ...barisTabel(TAB_KUNCI, "rk", 0)),
      tambah("Putu", ...barisTabel(TAB_KUNCI, "rk", 1)),
      tambah("Wiwin", ...barisTabel(TAB_KUNCI, "rk", 2)),
      tambah("persepuluhan,", ...barisTabel(TAB_KUNCI, "rk", 3)),
      tambah("perseratusan,", ...barisTabel(TAB_KUNCI, "rk", 4)),
      tambah("persen,", ...barisTabel(TAB_KUNCI, "rk", 5)),
      tambah("kembali", ...barisTabel(TAB_KUNCI, "rk", 6)),
      tambah("tiga@2", ...barisTabel(TAB_KUNCI, "rk", 7)),
      tambah("enam", ...barisTabel(TAB_KUNCI, "rk", 8)),
    ),
  ],
};

/* ------------------------------ 13. Refleksi, remedial (Buku Siswa hlm. 84; Panduan Guru hlm. 116-118) ------------------------------ */
export const ADEGAN_REFLEKSI_E: AdeganStory = {
  id: "refleksi-e",
  judul: "Refleksi dan Remedial",
  sumber: "Buku Siswa hlm. 84; Panduan Guru hlm. 116–118",
  latar: "#F0F9FF",
  kutipan: [
    "Refleksi",
    "Dalam bab ini, kalian sudah mempelajari pecahan dan juga lambangnya",
    "Adakah bagian yang masih dirasa sulit",
    "Perbanyaklah mengerjakan latihan soal",
    "Manfaat apa yang kalian dapatkan setelah mempelajari bab ini",
    "membagi kue atau coklat menjadi beberapa bagian yang sama",
    "dapat menghitung diskon menggunakan persen",
    "Apa yang sudah berjalan baik di dalam kelas",
    "Panduan Remedial",
    "Pemberian bimbingan secara individu",
    "Pemberian bimbingan secara berkelompok",
    "Pemberian pembelajaran berulang dengan metode dan media yang berbeda",
    "Tutor sebaya",
  ],
  ketukan: [
    k(
      "Refleksi untuk seluruh bab: kalian sudah mempelajari pecahan dan lambangnya, juga cara membandingkan dua pecahan. Adakah bagian yang sulit? Diskusikan dengan teman, minta bantuan guru, dan perbanyak latihan soal.",
      ...daftar("rf", "Refleksi siswa", [
        { at: "pecahan", t: "sudah belajar pecahan dan lambangnya", w: W.langit, u: 9.2 },
        { at: "Adakah", t: "ada bagian yang sulit?", w: W.krem, u: 9.6 },
        { at: "Diskusikan", t: "diskusi dengan teman atau minta guru", w: W.hijauMuda, u: 9.2 },
        { at: "perbanyak", t: "perbanyak latihan soal", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Tulis di buku: manfaat apa yang kalian dapat dari bab ini? Guru mengarahkan, antara lain membagi kue atau cokelat menjadi bagian sama besar, dan menghitung diskon memakai persen.",
      bersih(0),
      tambah(0, judul("Manfaat bab ini")),
      tambah("Tulis", ...kartu("rm1", 12, 34, 276, 30, W.krem, ["tulis di buku: apa manfaatnya?"], 9.6)),
      tambah("kue", emo("rm2", 90, 110, "🍰", 36)),
      tambah("diskon", emo("rm3", 210, 110, "🏷", 36)),
      tambah("kue", ...kartu("rm4", 20, 130, 120, 28, W.hijauMuda, ["bagi kue sama besar"], 8.6)),
      tambah("menghitung", ...kartu("rm5", 160, 130, 120, 28, W.langit, ["hitung diskon persen"], 8.6)),
    ),
    k(
      "Guru juga merefleksi diri lewat sembilan pertanyaan: apa yang berjalan baik, pelajaran apa yang didapat, apa yang ingin diubah, serta kapan murid antusias atau kesulitan.",
      ...daftar("rg", "Refleksi guru: 9 butir", [
        { at: "berjalan", t: "apa yang berjalan baik, apa yang tidak?", w: W.krem, u: 9 },
        { at: "pelajaran", t: "pelajaran apa yang saya dapat?", w: W.langit, u: 9.2 },
        { at: "diubah,", t: "apa yang ingin saya ubah?", w: W.hijauMuda, u: 9.6 },
        { at: "antusias,", t: "kapan murid antusias atau kesulitan?", w: W.pink, u: 9 },
      ]),
    ),
    k(
      "Remedial bagi murid yang belum mencapai kompetensi minimum: bimbingan individu, bimbingan kelompok, pembelajaran berulang dengan metode dan media berbeda, dan tutor sebaya.",
      ...daftar("rr", "Panduan remedial", [
        { at: "individu,", t: "1. bimbingan individu", w: W.krem, u: 9.6 },
        { at: "kelompok,", t: "2. bimbingan kelompok", w: W.langit, u: 9.6 },
        { at: "berulang", t: "3. ulang dengan metode dan media berbeda", w: W.hijauMuda, u: 9 },
        { at: "sebaya.", t: "4. tutor sebaya", w: W.pink, u: 9.6 },
      ]),
    ),
  ],
};

/* ------------------------------ 14. Pengayaan 1-3 (Panduan Guru hlm. 118-119) ------------------------------ */
export const ADEGAN_PENGAYAAN_1E: AdeganStory = {
  id: "pengayaan-1e",
  judul: "Pengayaan: tantangan 1 sampai 3",
  sumber: "Materi: pengayaan",
  latar: "#FFFBEB",
  kutipan: [
    "Pedoman untuk Pengayaan",
    "diberikan pecahan, pecahan desimal atau persen dengan angka yang berbeda",
    "Belajar kelompok",
    "Belajar mandiri",
    "Soal-soal Pengayaan",
    "Putu memiliki sebuah kue brownies",
    "memotong kue brownies tersebut menjadi 10 bagian",
    "Jumlah tepung dan gula untuk membuat Prol Tape",
    "Maka helen harus membayar seharga Rp25.000,00",
  ],
  ketukan: [
    k(
      "Kamu yang sudah lancar boleh mencoba tantangan dengan angka yang berbeda untuk pecahan, desimal, atau persen. Belajar kelompok: memecahkan masalah dunia nyata. Belajar mandiri: membuat proyek, lalu menjadi tutor bagi teman.",
      ...daftar("pe", "Tantangan pengayaan", [
        { at: "angka", t: "angka berbeda: pecahan, desimal, persen", w: W.krem, u: 9 },
        { at: "kelompok:", t: "belajar kelompok: masalah dunia nyata", w: W.langit, u: 9 },
        { at: "mandiri:", t: "belajar mandiri: proyek, jadi tutor teman", w: W.hijauMuda, u: 8.8 },
      ]),
    ),
    k(
      "Tantangan pertama, jajanan khas Jember. Prol Tape: tepung tiga kilo dan gula dua setengah kilo, jumlahnya lima setengah kilo. Suwar Suwir: tepung dua setengah kilo dan gula satu kilo, jumlahnya tiga setengah kilo.",
      bersih(0),
      tambah(0, judul("Pengayaan 1: Jember")),
      tambah("Prol", ...kartu("p1a", 12, 40, 276, 34, W.krem, ["Prol Tape: 3 + 2½ = 5½ kilo"], 11)),
      tambah("Suwar", ...kartu("p1b", 12, 90, 276, 34, W.hijauMuda, ["Suwar Suwir: 2½ + 1 = 3½ kilo"], 11)),
    ),
    k(
      "Tantangan kedua: Putu memotong brownies menjadi sepuluh bagian dan memberi empat bagian kepada Karel. Karel menerima empat per sepuluh bagian, yaitu nol koma empat, atau empat puluh persen.",
      bersih(0),
      tambah(0, judul("Pengayaan 2: brownies")),
      tambah("Putu", ...kartu("p2a", 12, 40, 150, 28, W.krem, ["4 dari 10 bagian"], 10)),
      tambah("Karel", ...kartu("p2b", 12, 84, 150, 28, W.langit, ["4/10 = 0,4"], 11)),
      tambah("persen.", ...kartu("p2c", 12, 128, 150, 30, W.pink, ["0,4 = 40%"], 11)),
      tambah("sepuluh", ...kisi100("kg", 180, 50, 10, 40)),
    ),
    k(
      "Tantangan ketiga: Edamame lima puluh ribu rupiah per kilogram. Helen membeli setengah kilogram, jadi membayar dua puluh lima ribu rupiah.",
      bersih(0),
      tambah(0, judul("Pengayaan 3: Edamame")),
      tambah("Edamame", ...kartu("p3a", 12, 40, 276, 30, W.krem, ["1 kilogram: Rp50.000"], 10.4)),
      tambah("setengah", ...kartu("p3b", 12, 84, 276, 30, W.langit, ["Helen beli 1/2 kilogram"], 10.4)),
      tambah("jadi", ...kartu("p3c", 12, 128, 276, 30, W.hijauMuda, ["1/2 × 50.000 = 25.000"], 10.4)),
      tambah("membayar", ...kartu("p3d", 12, 168, 276, 26, W.pink, ["Helen membayar Rp25.000"], 10.4)),
    ),
  ],
};

/* ------------------------------ 15. Pengayaan 4-5 dan catatan kunci (Panduan Guru hlm. 119) ------------------------------ */
export const ADEGAN_PENGAYAAN_2E: AdeganStory = {
  id: "pengayaan-2e",
  judul: "Pengayaan: tantangan 4 dan 5",
  sumber: "Materi: pengayaan dan diskon",
  latar: "#FEF2F2",
  kutipan: [
    "Edamame dan Suwar Suwir adalah salah satu jajanan khas Kota Jember",
    "manakah yang paling berat dari kedua",
    "Slamet melihat satu bungkus Edamame yang diskon 5%",
    "Kasir seharusnya menjawab....dari harga Edamame",
    "Jadi, Edamame adalah oleh-oleh yang paling berat dibawa oleh Slamet",
    "Diskon 5 % =",
    "Maka helen harus membayar seharga Rp25.000,00",
    "Maka kue brownies yang diterima stanley sebanyak",
  ],
  ketukan: [
    k(
      "Tantangan keempat: Slamet membeli satu bungkus Edamame setengah kilogram dan satu bungkus Suwar Suwir seperempat kilogram. Setengah lebih besar daripada seperempat, jadi Edamame lebih berat.",
      bersih(0),
      tambah(0, judul("Pengayaan 4: oleh-oleh")),
      tambah("Edamame", ...kartu("p4a", 20, 40, 120, 28, W.hijauMuda, ["Edamame 1/2 kg"], 10)),
      tambah("Suwar", ...kartu("p4b", 160, 40, 120, 28, W.krem, ["Suwar Suwir 1/4 kg"], 9.4)),
      tambah("Setengah@2", ...kartu("p4c", 60, 90, 180, 30, W.langit, ["1/2 > 1/4"], 12)),
      tambah("berat.", ...kartu("p4d", 60, 136, 180, 30, W.pink, ["paling berat: Edamame"], 10.4)),
    ),
    k(
      "Tantangan kelima: diskon Edamame lima persen. Lima persen sama dengan lima per seratus, atau nol koma nol lima. Jadi kasir seharusnya menjawab lima per seratus dari harga Edamame.",
      bersih(0),
      tambah(0, judul("Pengayaan 5: diskon")),
      tambah("diskon", ...kartu("p5a", 12, 40, 150, 28, W.krem, ["diskon 5%"], 11)),
      tambah("Lima@3", ...kartu("p5b", 12, 84, 150, 30, W.langit, ["5% = 5/100"], 11)),
      tambah("nol", ...kartu("p5c", 12, 128, 150, 30, W.hijauMuda, ["5/100 = 0,05"], 11)),
      tambah("seharusnya", ...kisi100("kg", 180, 50, 10, 5)),
      tambah("seharusnya", teks("p5d", 230, 170, "5 dari 100 kotak", 8.6, W.biru)),
    ),
    k(
      "Hati-hati, kesalahan yang sering terjadi. Setengah sama dengan lima per sepuluh, jadi setengah lebih besar dari empat per sepuluh. Lima persen sama dengan lima per seratus, bukan lima per sepuluh.",
      bersih(0),
      tambah(0, judul("Hati-hati", W.merah)),
      tambah("kesalahan", ...kartu("p6a", 12, 36, 276, 26, W.merahMuda, ["sering keliru: 1/2 dianggap kecil dari 4/10"], 9.2)),
      tambah("Setengah", ...kartu("p6b", 12, 68, 276, 26, W.hijauMuda, ["benar: 1/2 = 5/10 > 4/10"], 9.6)),
      tambah("Lima@2", ...kartu("p6c", 12, 110, 276, 26, W.merahMuda, ["sering keliru: 5% ditulis 5/10"], 9.6)),
      tambah("bukan", ...kartu("p6d", 12, 142, 276, 26, W.hijauMuda, ["benar: 5% = 5/100"], 9.6)),
    ),
  ],
};

/* ------------------------------ 16. Interaksi orang tua, sumber bacaan, penutup bab (Panduan Guru hlm. 120) ------------------------------ */
export const ADEGAN_PENUTUP_E: AdeganStory = {
  id: "penutup-e",
  judul: "Orang tua, sumber bacaan, penutup bab",
  sumber: "Panduan Guru hlm. 120; Buku Siswa hlm. 75–84",
  latar: "#F0FDF4",
  kutipan: [
    "Interaksi dengan Orang Tua",
    "Guru setiap semester mengadakan rapat dengan orang tua peserta didik",
    "Guru dapat membuat grup komunitas untuk setiap kelas dengan para orang tua peserta didik",
    "Setiap diakhir bab terdapat pengayaan dengan memanfaatkan teknologi yaitu barcode",
    "Guru menyediakan setiap minggu untuk konseling orang tua peserta didik",
    "Guru dapat juga mengunjungi orang tua khusus untuk peserta didik yang mengalami kesulitan",
    "Guru mengadakan seminar atau layanan konsultasi tiap bulan",
    "Sumber Bacaan",
    "https://buku.kemdikbud.go.id/",
  ],
  ketukan: [
    k(
      "Interaksi dengan orang tua, enam hal: rapat tiap semester, grup komunitas kelas, barcode pengayaan di akhir bab, konseling tiap minggu, kunjungan bagi murid yang kesulitan, dan seminar atau konsultasi tiap bulan.",
      ...daftar(
        "ot",
        "Interaksi dengan orang tua",
        [
          { at: "rapat", t: "1. rapat tiap semester", w: W.krem, u: 9 },
          { at: "grup", t: "2. grup komunitas kelas", w: W.langit, u: 9 },
          { at: "barcode", t: "3. barcode pengayaan di akhir bab", w: W.hijauMuda, u: 9 },
          { at: "konseling", t: "4. konseling tiap minggu", w: W.pink, u: 9 },
          { at: "kunjungan", t: "5. kunjungan bagi murid yang kesulitan", w: W.krem, u: 9 },
          { at: "seminar", t: "6. seminar atau konsultasi tiap bulan", w: W.langit, u: 9 },
        ],
        { tinggi: 22, jarak: 5 },
      ),
    ),
    k(
      "Sumber bacaan murid: Buku Siswa Matematika kelas empat, situs sumber belajar Kemdikbud, dan buku Kemdikbud. Guru juga memakai Buku Panduan Guru.",
      ...daftar("sb", "Sumber bacaan", [
        { at: "murid:", t: "murid: Buku Siswa, situs sumber belajar", w: W.krem, u: 9.2 },
        { at: "Kemdikbud,", t: "buku.kemdikbud.go.id", w: W.langit, u: 9.6 },
        { at: "Guru", t: "guru: juga Buku Panduan Guru", w: W.hijauMuda, u: 9.6 },
      ]),
    ),
    k(
      "Penutup Bab Dua, Pecahan. Kita belajar pecahan berpembilang satu, penyebut sama, pecahan senilai, desimal persepuluhan dan perseratusan, lalu persen.",
      ...daftar(
        "pn",
        "Penutup Bab 2",
        [
          { at: "berpembilang", t: "A. pecahan dengan pembilang satu", w: W.krem, u: 9 },
          { at: "penyebut", t: "B. pecahan dengan penyebut sama", w: W.langit, u: 9 },
          { at: "senilai,", t: "C. pecahan senilai", w: W.hijauMuda, u: 9 },
          { at: "desimal", t: "D. desimal persepuluhan dan perseratusan", w: W.pink, u: 9 },
          { at: "persen.", t: "E. menghubungkan dengan persen", w: W.krem, u: 9 },
        ],
        { tinggi: 24, jarak: 6 },
      ),
    ),
    k(
      "Ingat selalu: persen artinya per seratus. Desimal perseratusan dikali seratus persen menjadi persen. Sampai jumpa di bab berikutnya.",
      bersih(0),
      tambah(0, judul("Ingat selalu")),
      tambah("persen", ...kartu("iq1", 30, 44, 240, 40, W.hijauMuda, ["n% = n/100"], 16)),
      tambah("Desimal", ...kartu("iq2", 30, 100, 240, 40, W.krem, ["0,25 × 100% = 25%"], 15)),
      tambah("Sampai", emo("iq3", 150, 188, "👋", 28)),
    ),
  ],
};
