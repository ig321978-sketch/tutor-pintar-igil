import type { AdeganStory } from "./logika-story";
import { LATIHAN, W, barisTabel, batang, emo, garis, jembatan, judul, kartu, kisi, pecahan, teks } from "./k4b2c-gambar";
import { bersih, idx, k, tambah, ubah } from "./k4b2c-bantu";

/* ------------------------------ 9. Ayo Berlatih nomor 2 (Buku Siswa hlm. 70; Panduan Guru hlm. 103) ------------------------------ */
const SUARA_N1 = "Soal kedua: gambar kiri terdiri atas enam kotak dengan dua kotak diarsir, gambar kanan tiga kotak dengan satu kotak diarsir. Titik-titik diisi pecahan tiap gambar.";
const SUARA_N2 = "Gambar kiri adalah dua per enam, gambar kanan adalah satu per tiga. Kesimpulannya dua per enam sama dengan satu per tiga.";
const SUARA_N3 = "Lihat bagian berwarnanya. Dua dari enam bagian dan satu dari tiga bagian sama panjang, berhenti di garis putus-putus yang sama. Gambar membuktikan nilainya sama.";
const SUARA_N4 = "Cek dengan hitungan. Faktor persekutuan terbesar dua dan enam adalah dua. Dua dibagi dua jadi satu, enam dibagi dua jadi tiga. Hasilnya cocok dengan gambar tadi.";

export const ADEGAN_BERLATIH_DUA: AdeganStory = {
  id: "berlatih-dua",
  judul: "Latihan kedua: dua per enam dan satu per tiga",
  sumber: "Materi: Latihan pecahan senilai (2)",
  latar: "#FFF1F2",
  kutipan: [
    "Ayo Berlatih",
    "Isilah titik-titik dibawah ini dengan bilangan pecahan sesuai daerah yang",
    "Isilah titik-titik dibawah ini sesuai daerah yang diarsir!",
    "Dikatakan pecahan senilai, karena pecahan",
    "apabila disederhanakan",
    "memperoleh hasil yang sama yaitu",
  ],
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan kedua")),
      tambah("kiri", ...batang("l2", 20, 44, 110, 26, 6, [0, 1])),
      tambah("kanan", ...batang("r2", 170, 44, 110, 26, 3, [0])),
      tambah("Titik-titik", ...pecahan("hl", 75, 112, "...", "...", 14), teks("he", 150, 116, "=", 20, W.merah), ...pecahan("hr", 225, 112, "...", "...", 14)),
    ),
    k(
      SUARA_N2,
      ubah("enam", { id: "hl-p", isi: "2", warna: W.hijau }, { id: "hl-q", isi: "6", warna: W.hijau }),
      ubah("tiga", { id: "hr-p", isi: "1", warna: W.hijau }, { id: "hr-q", isi: "3", warna: W.hijau }),
      tambah("Kesimpulannya", ...kartu("hk", 50, 150, 200, 32, W.emas, ["jadi 2/6 = 1/3"], 10)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Sama panjang")),
      tambah("Lihat", ...batang("m1", 95, 36, 110, 26, 6, [0, 1]), ...batang("m2", 95, 74, 110, 26, 3, [0])),
      tambah("berhenti", garis("m3", 131.7, 30, 0, 76, W.merah, 1.6, { putus: true })),
      tambah("membuktikan", teks("m4", 150, 128, "2 dari 6 = 1 dari 3", 10, W.hijau), ...kartu("m5", 60, 144, 180, 30, W.emas, ["sama panjang, nilainya sama"], 9.4)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Cek: bagi dengan FPB")),
      tambah("Faktor", ...kartu("nf", 40, 30, 220, 28, W.langit, ["FPB dari 2 dan 6 adalah 2"], 10)),
      tambah(idx(SUARA_N4, "enam", 1), ...pecahan("n1", 50, 108, 2, 6, 20)),
      tambah(idx(SUARA_N4, "dibagi", 1), ...jembatan("nj", 50, 250, 108, "÷2")),
      tambah(idx(SUARA_N4, "satu", 1), teks("na", 150, 166, "2 ÷ 2 = 1", 10, W.hijau)),
      tambah(idx(SUARA_N4, "tiga", 1), teks("nb", 150, 184, "6 ÷ 2 = 3", 10, W.hijau), ...pecahan("n2", 250, 108, 1, 3, 20)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 3 dan kunci (Buku Siswa hlm. 70; Panduan Guru hlm. 103) ------------------------------ */
const SUARA_Q1 = "Soal ketiga: gambar kiri berbentuk kisi tiga kali tiga, jadi sembilan kotak, dengan satu kolom berarsir, yaitu tiga kotak. Gambar kanan tiga kolom tegak dengan satu kolom berarsir.";
const SUARA_Q2 = "Gambar kiri berarsir tiga dari sembilan kotak, jadi tiga per sembilan. Gambar kanan satu dari tiga kolom, jadi satu per tiga. Kesimpulannya tiga per sembilan sama dengan satu per tiga.";
const SUARA_Q3 = "Hitungan kita: faktor persekutuan terbesar tiga dan sembilan adalah tiga, bukan dua. Tiga dibagi tiga jadi satu, sembilan dibagi tiga jadi tiga. Hasilnya satu per tiga, sama dengan gambar tadi.";
const SUARA_Q4 = "Jadi tiga pasangan senilainya adalah dua per empat sama dengan satu per dua, dua per enam sama dengan satu per tiga, dan tiga per sembilan sama dengan satu per tiga. Pembaginya dua, dua, dan tiga.";

export const ADEGAN_BERLATIH_TIGA: AdeganStory = {
  id: "berlatih-tiga",
  judul: "Latihan ketiga dan tiga pasangan senilai",
  sumber: "Materi: Latihan pecahan senilai (3)",
  latar: "#FDF2F8",
  kutipan: [
    "Ayo Berlatih",
    "Isilah titik-titik dibawah ini dengan bilangan pecahan sesuai daerah yang",
    "Dikatakan pecahan senilai, karena pecahan",
    "apabila disederhanakan",
    "memperoleh hasil yang sama yaitu",
  ],
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Latihan ketiga")),
      tambah("kisi", ...kisi("l3", 30, 34, 24, 24, 3, 3, [0, 3, 6])),
      tambah("kanan", ...batang("r3", 190, 34, 72, 72, 3, [0])),
      tambah("sembilan", teks("q9", 66, 124, "9 kotak", 8.6, W.hijau)),
      tambah("tegak", teks("q3", 226, 124, "3 kolom", 8.6, W.hijau)),
    ),
    k(
      SUARA_Q2,
      tambah("kiri", ...pecahan("ql", 66, 148, "...", "...", 13), teks("qe", 146, 152, "=", 18, W.merah), ...pecahan("qr", 226, 148, "...", "...", 13)),
      ubah("sembilan@2", { id: "ql-p", isi: "3", warna: W.hijau }, { id: "ql-q", isi: "9", warna: W.hijau }),
      ubah("Gambar@2", { id: "qr-p", isi: "1", warna: W.hijau }, { id: "qr-q", isi: "3", warna: W.hijau }),
      tambah("Kesimpulannya", ...kartu("qk", 50, 168, 200, 28, W.emas, ["jadi 3/9 = 1/3"], 10)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Cek: bagi dengan FPB")),
      tambah("Hitungan", ...kartu("rf", 20, 30, 260, 28, W.langit, ["FPB dari 3 dan 9 adalah 3"], 10)),
      tambah("bukan", teks("rb", 150, 76, "bukan 2: 3 tidak habis dibagi 2", 8.6, W.merah)),
      tambah(idx(SUARA_Q3, "sembilan", 1), ...pecahan("r1", 50, 118, 3, 9, 20)),
      tambah(idx(SUARA_Q3, "dibagi", 1), ...jembatan("rj", 50, 250, 118, "÷3")),
      tambah(idx(SUARA_Q3, "satu", 1), teks("ra", 150, 172, "3 ÷ 3 = 1", 10, W.hijau)),
      tambah(idx(SUARA_Q3, "tiga", 6), teks("rc", 150, 190, "9 ÷ 3 = 3", 10, W.hijau)),
      tambah("Hasilnya", ...pecahan("r2", 250, 118, 1, 3, 20)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Tiga pasangan senilai")),
      tambah("Jadi", ...barisTabel("kt0", 10, 34, [34, 80, 80, 80], ["Soal", "Kiri", "Kanan", "Bagi"], 24, 9, true)),
      ...LATIHAN.map((l, i) => tambah(idx(SUARA_Q4, ["empat", "enam", "sembilan"][i], 1), ...barisTabel(`kt${i + 1}`, 10, 58 + i * 24, [34, 80, 80, 80], [String(i + 1), `${l.kiri[0]}/${l.kiri[1]}`, `${l.kanan[0]}/${l.kanan[1]}`, `÷${l.kiri[0] / l.kanan[0]}`], 24, 9))),
      tambah("Pembaginya", teks("kq", 150, 164, "pembagi: 2, 2, 3", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 11. Pesan guru: cek silang dan kesalahan yang sering terjadi ------------------------------ */
const SUARA_G1 = "Pesan pertama: pakai cek silang. Hasil kali silangnya harus sama, yaitu dua per empat dengan satu per dua, dua per enam dengan satu per tiga, dan tiga per sembilan dengan satu per tiga.";
const SUARA_G2 = "Pesan kedua: mengalikan membuat pecahan lebih rinci. Membagi membuat pecahan lebih sederhana, tetapi hanya bila pembilang dan penyebut sama-sama habis dibagi.";
const SUARA_G3 = "Pesan ketiga: hati-hati, kesalahan yang sering terjadi adalah menambah bilangan yang sama pada pembilang dan penyebut, misalnya satu per tiga menjadi dua per empat.";
const SUARA_G4 = "Cek silang membuktikannya. Satu kali empat jadi empat, sedangkan dua kali tiga jadi enam. Empat tidak sama dengan enam, jadi satu per tiga tidak senilai dengan dua per empat.";
const SUARA_G5 = "Pesan keempat: ingat kegiatan kertas lipat tadi. Kesimpulannya satu per empat sama dengan empat per enam belas. Hitungan: empat dan enam belas dibagi empat, hasilnya satu dan empat.";

export const ADEGAN_CATATAN: AdeganStory = {
  id: "catatan",
  judul: "Pesan guru: cek silang dan kesalahan umum",
  sumber: "Materi: Cek silang dan kesalahan umum",
  latar: "#F8FAFC",
  kutipan: [
    "Pecahan dapat dikatakan senilai apabila pecahan tersebut mempunyai nilai atau bentuk paling sederhana yang sama dengan cara menyamakan penyebutnya.",
    "Dikatakan pecahan senilai, karena pecahan",
    "Tahukah Kalian",
    "Cara mencari pecahan yang senilai:",
    "Buatlah tiga buah gambar yang menunjukkan pecahan senilai!",
    "Guru menyampaikan kesimpulan dari aktivitas yang dilakukan dengan menyatakan bahwa:",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Pesan 1: cek silang")),
      tambah("cek", ...barisTabel("gt0", 15, 32, [90, 90, 90], ["soal", "atas × bawah", "bawah × atas"], 22, 8.6, true)),
      tambah(idx(SUARA_G1, "empat", 1), ...barisTabel("gt1", 15, 54, [90, 90, 90], ["2/4 = 1/2", "2 × 2 = 4", "4 × 1 = 4"], 22, 9)),
      tambah(idx(SUARA_G1, "enam", 1), ...barisTabel("gt2", 15, 76, [90, 90, 90], ["2/6 = 1/3", "2 × 3 = 6", "6 × 1 = 6"], 22, 9)),
      tambah(idx(SUARA_G1, "sembilan", 1), ...barisTabel("gt3", 15, 98, [90, 90, 90], ["3/9 = 1/3", "3 × 3 = 9", "9 × 1 = 9"], 22, 9)),
      tambah("sama,", ...kartu("gk", 40, 134, 220, 30, W.hijauMuda, ["hasil kali silang sama: senilai"], 9.4)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Pesan 2: kali dan bagi")),
      tambah("mengalikan", ...kartu("g1", 14, 32, 272, 40, W.hijauMuda, ["kali (×): pecahan lebih rinci"], 9.4)),
      tambah("Membagi", ...kartu("g2", 14, 82, 272, 40, W.langit, ["bagi (÷): pecahan lebih sederhana"], 9.4)),
      tambah("habis", ...kartu("g4", 14, 132, 272, 40, W.krem, ["bagi hanya bila keduanya habis dibagi"], 9)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Pesan 3: hati-hati")),
      tambah("hati-hati,", ...kartu("g4", 40, 30, 220, 30, W.krem, ["kesalahan yang sering terjadi"], 9.4)),
      tambah("satu", ...pecahan("g5", 50, 112, 1, 3, 20)),
      tambah("menjadi", ...jembatan("g6", 50, 250, 112, "+1", 20, W.merah)),
      tambah("empat.", ...pecahan("g7", 250, 112, 2, 4, 20), emo("g8", 150, 186, "❌", 22)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Cek silang: tidak senilai")),
      tambah("Satu", teks("h1", 150, 52, "1 × 4 = 4", 11, W.hijau)),
      tambah("dua", teks("h2", 150, 74, "2 × 3 = 6", 11, W.hijau)),
      tambah(idx(SUARA_G4, "Empat", 3), teks("h3", 150, 98, "4 ≠ 6", 14, W.merah)),
      tambah("senilai", ...batang("h4", 30, 120, 120, 24, 3, [0]), ...batang("h5", 156, 120, 120, 24, 4, [0, 1]), teks("h6", 90, 160, "1/3", 10), teks("h7", 216, 160, "2/4", 10)),
    ),
    k(
      SUARA_G5,
      bersih(0),
      tambah(0, judul("Pesan 4: kegiatan kertas lipat")),
      tambah("kegiatan", ...kartu("i1", 14, 30, 272, 36, W.krem, ["Ingat kegiatan kertas lipat tadi"], 9.4)),
      tambah("Kesimpulannya", ...pecahan("i2", 100, 112, 1, 4, 18), teks("i3", 150, 116, "=", 22, W.merah)),
      tambah("belas.", ...pecahan("i4", 200, 112, 4, 16, 18)),
      tambah("hasilnya", teks("i5", 150, 160, "4 ÷ 4 = 1 dan 16 ÷ 4 = 4", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 12. Cara belajar dan ringkasan ------------------------------ */
const SUARA_D1 = "Sekarang pesan tentang cara belajar kita. Setiap murid berbeda, dan guru yang paling tahu kebutuhan kelasnya. Kita belajar lewat pemecahan masalah, atau Problem Based Learning.";
const SUARA_D2 = "Kita belajar berkelompok. Ketua kelompok adalah teman yang cepat belajar, dengan anggota yang kemampuannya sedang atau masih perlu dibantu. Kelompok dibentuk menurut keberagaman kita.";
const SUARA_D3 = "Bagi yang cepat belajar, atau advanced, coba kerjakan latihan tanpa bantuan. Guru bisa memberi soal tambahan, sambil mendampingi teman yang masih kesulitan.";
const SUARA_D4 = "Bila di kelas tidak ada yang berkemampuan tinggi, semua anggota kelompok bekerja sama menyelesaikan soal lewat Problem Based Learning. Bila cara itu tidak memungkinkan, guru memakai diskusi tentang pecahan senilai.";
const SUARA_D5 = "Ringkasnya, pecahan senilai bernilai sama walau tulisannya berbeda. Cara mencarinya: kali atau bagi pembilang dan penyebut dengan bilangan yang sama. Pasangan senilai dari latihan: dua per empat, dua per enam, dan tiga per sembilan.";

export const ADEGAN_DIFERENSIASI: AdeganStory = {
  id: "diferensiasi",
  judul: "Cara belajar dan ringkasan pecahan senilai",
  sumber: "Materi: Cara belajar dan ringkasan",
  latar: "#F5F3FF",
  kutipan: [
    "Diferensiasi",
    "Karakteristik peserta didik di masing-masing sekolah akan berbeda-beda,",
    "kondisi seperti ini hanya guru yang memahami.",
    "Model pembelajaran yang disarankan untuk bab ini adalah Problem Based Learning.",
    "Pembentukan kelompok dapat berdasarkan pada karakteristik atau keberagaman peserta didik",
    "tingkat kemampuan tinggi dengan anggota kelompok tingkat kemampuan sedang atau kurang.",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced), minta mereka mengerjakan Latihan tanpa bantuan.",
    "Guru juga dapat memberikan soal-soal tambahan.",
    "guru dapat mendampingi peserta didik yang mengalami kesulitan.",
    "Apabila karakteristik peserta didik di sekolah/kelas tidak terdapat",
    "semua anggota kelompok dapat bekerja sama untuk menyelesaikan masalah/soal yang diberikan oleh guru.",
    "guru dapat menerapkan metode diskusi dengan melibatkan peserta didik dalam Pecahan senilai.",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Cara kita belajar")),
      tambah("berbeda,", emo("d1", 150, 66, "🧑", 30)),
      tambah("paling", ...kartu("d2", 14, 82, 272, 30, W.langit, ["guru menyesuaikan dengan kelas"], 9.4)),
      tambah("Problem", ...kartu("d3", 30, 126, 240, 44, W.emas, ["Problem Based Learning", "belajar lewat pemecahan masalah"], 10)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Pembentukan kelompok")),
      tambah("Ketua", emo("e1", 60, 70, "🧑", 30), teks("e2", 60, 98, "ketua: cepat belajar", 8.6)),
      tambah("sedang", emo("e3", 150, 70, "🙂", 30), teks("e4", 150, 98, "anggota: sedang", 8.6)),
      tambah("dibantu.", emo("e5", 240, 70, "😊", 30), teks("e6", 240, 98, "perlu dibantu", 8.6)),
      tambah("keberagaman", ...kartu("e7", 30, 126, 240, 34, W.hijauMuda, ["kelompok menurut keberagaman kita"], 9)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Teman cepat dan teman yang kesulitan")),
      tambah("advanced,", ...kartu("f1", 14, 34, 272, 40, W.hijauMuda, ["cepat belajar (advanced):", "mengerjakan latihan tanpa bantuan"], 9)),
      tambah("tambahan,", ...kartu("f2", 14, 84, 272, 32, W.krem, ["guru memberi soal tambahan"], 9.4)),
      tambah("mendampingi", ...kartu("f3", 14, 126, 272, 32, W.pink, ["guru mendampingi yang kesulitan"], 9.4)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Bila tidak ada yang berkemampuan tinggi")),
      tambah("semua", ...kartu("p1", 14, 34, 272, 44, W.hijauMuda, ["semua anggota bekerja sama", "lewat Problem Based Learning"], 9)),
      tambah("memungkinkan,", ...kartu("p2", 14, 90, 272, 32, W.merahMuda, ["bila cara itu tidak memungkinkan"], 9.4)),
      tambah("diskusi", ...kartu("p3", 14, 132, 272, 32, W.langit, ["guru memakai diskusi"], 9.4)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Ringkasan pecahan senilai")),
      tambah("senilai", ...kartu("z1", 14, 30, 272, 28, W.emas, ["senilai: nilai sama, tulisan berbeda"], 9.4)),
      tambah("kali", ...kartu("z2", 14, 64, 272, 28, W.hijauMuda, ["kali atau bagi atas dan bawah sama"], 9.4)),
      tambah("Pasangan", ...barisTabel("zt0", 10, 100, [34, 80, 80, 80], ["Soal", "Kiri", "Kanan", "Bagi"], 20, 9, true)),
      ...LATIHAN.map((l, i) => tambah(idx(SUARA_D5, ["empat", "enam", "sembilan"][i], 1), ...barisTabel(`zt${i + 1}`, 10, 120 + i * 20, [34, 80, 80, 80], [String(i + 1), `${l.kiri[0]}/${l.kiri[1]}`, `${l.kanan[0]}/${l.kanan[1]}`, `÷${l.kiri[0] / l.kanan[0]}`], 20, 9))),
    ),
  ],
};
