import type { AdeganStory } from "./logika-story";
import { W, batang, emo, judul, kartu, lingkaran, pecahan, teks, panah } from "./k4b2b-gambar";
import { bersih, idx, k, sorotkan, tambah, warnai } from "./k4b2b-bantu";

/* ------------------------------ 1. Pembuka subbab, pengalaman belajar, apersepsi (Buku Siswa hlm. 63; Panduan Guru hlm. 97) ------------------------------ */
const SUARA_P1 = "Kita masuk ke subbab B, Pecahan dengan Penyebut Sama. Buku membuka dengan judul kecil: membandingkan pecahan dengan penyebut yang sama.";
const SUARA_P2 = "Pengalaman belajar menurut panduan guru: setelah subbab ini murid mampu membandingkan dan mengurutkan antar pecahan dengan penyebut yang sama. Sarana yang dibutuhkan hanya alat tulis.";
const SUARA_P3 = "Apersepsi: penyebut adalah bilangan pembagi. Bilangan di atas garis pemisah disebut pembilang, sedangkan bilangan di bawah garis pemisah disebut penyebut.";
const SUARA_P4 = "Lalu guru mengajak murid membandingkan dua pecahan: lebih kecil, lebih besar, atau sama besar, dengan gambar, ilustrasi, atau benda konkret.";
const SUARA_P5 = "Tiga pertanyaan pemantik: apakah penyebut itu, bagaimana ilustrasi pecahan dengan penyebut sama, dan bagaimana membandingkan serta mengurutkan pecahan dengan penyebut yang sama?";

export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Pembuka subbab B: pengalaman belajar dan apersepsi",
  sumber: "Buku Siswa hlm. 63; Panduan Guru hlm. 97",
  latar: "#FFF7ED",
  kutipan: [
    "B. Pecahan dengan Penyebut Sama",
    "Membandingkan pecahan dengan penyebut yang sama",
    "B. Pecahan dengan penyebut sama",
    "Pengalaman Belajar",
    "Setelah mempelajari sub bab ini, Peserta didik diharapkan mampu",
    "membandingkan dan mengurutkan antar-pecahan dengan penyebut yang",
    "Kebutuhan Sarana Prasarana dan Media",
    "Alat Tulis",
    "Apersepsi",
    "Penyebut adalah bilangan pembagi.",
    "Bilangan yang berada di atas garis pemisah disebut dengan pembilang",
    "disebut penyebut.",
    "Membandingkan dua pecahan yang lebih kecil, lebih besar, atau sama besar dengan gambar, ilustrasi atau benda konkret.",
    "Stimulus (Pemanasan)",
    "Pertanyaan Esensi/Pemantik:",
    "1. apakah penyebut?",
    "2. bagaimana ilustrasi pecahan dengan penyebut sama?",
    "3. bagaimana membandingkan dan mengurutkan antar-pecahan dengan",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Subbab B: Penyebut Sama")),
      tambah("Pecahan", ...kartu("pb", 30, 38, 240, 34, W.emas, ["Pecahan dengan Penyebut Sama"], 9.6)),
      tambah("membandingkan", ...kartu("pc", 30, 88, 240, 34, W.langit, ["membandingkan pecahan, penyebut sama"], 8.8)),
      tambah(idx(SUARA_P1, "sama", 2), emo("pd", 150, 160, "⚖", 32)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("membandingkan", ...kartu("g1", 14, 34, 272, 30, W.hijauMuda, ["1. membandingkan pecahan"], 9)),
      tambah("mengurutkan", ...kartu("g2", 14, 72, 272, 30, W.langit, ["2. mengurutkan pecahan"], 9)),
      tambah("Sarana", ...kartu("g3", 14, 112, 272, 30, W.krem, ["sarana: alat tulis"], 9)),
      tambah("tulis.", emo("g4", 150, 176, "✏", 28)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Apersepsi: pembilang dan penyebut")),
      tambah("penyebut", ...pecahan("ap", 100, 88, 3, 4, 26)),
      tambah("pembilang,", teks("ap1", 225, 76, "pembilang", 9, W.hijau), panah("ap2", 190, 74, -42, 0, W.hijau, 1.6)),
      tambah("garis", teks("ap3", 225, 94, "garis pemisah", 9, W.coklat)),
      tambah("sedangkan", teks("ap4", 225, 122, "penyebut", 9, W.merah), panah("ap5", 190, 120, -42, 0, W.merah, 1.6)),
      tambah("pembagi.", ...kartu("ap6", 30, 150, 240, 30, W.emas, ["penyebut = bilangan pembagi"], 9)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Membandingkan dua pecahan")),
      tambah("kecil,", ...kartu("pp1", 10, 38, 88, 44, W.hijauMuda, ["lebih", "kecil"], 9)),
      tambah("besar,", ...kartu("pp2", 106, 38, 88, 44, W.merahMuda, ["lebih", "besar"], 9)),
      tambah("sama", ...kartu("pp3", 202, 38, 88, 44, W.krem, ["sama", "besar"], 9)),
      tambah("gambar,", ...kartu("pp4", 20, 108, 260, 34, W.emas, ["gambar · ilustrasi · benda konkret"], 9)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Tiga pertanyaan pemantik")),
      tambah("apakah", ...kartu("q1", 14, 34, 272, 34, W.hijauMuda, ["1. apakah penyebut itu?"], 9)),
      tambah("bagaimana", ...kartu("q2", 14, 76, 272, 34, W.langit, ["2. ilustrasi pecahan, penyebut sama"], 8.6)),
      tambah(idx(SUARA_P5, "bagaimana", 2), ...kartu("q3", 14, 118, 272, 44, W.krem, ["3. membandingkan dan", "mengurutkan pecahan"], 8.8)),
      sorotkan("serta", "q3-k"),
    ),
  ],
};

/* ------------------------------ 2. Ayo Mengamati 1: satu per tiga dan dua per tiga (Buku Siswa hlm. 63; Panduan Guru hlm. 98) ------------------------------ */
const SUARA_A1 = "Ayo Mengamati. Ada dua gambar. Gambar pertama dibagi tiga bagian sama besar dan satu bagian diarsir, yaitu satu per tiga.";
const SUARA_A2 = "Gambar kedua juga dibagi tiga, tetapi dua bagian diarsir, yaitu dua per tiga.";
const SUARA_A3 = "Buku bertanya: daerah arsir mana yang lebih kecil? Daerah arsir satu per tiga lebih kecil dari daerah arsir dua per tiga.";
const SUARA_A4 = "Maka satu per tiga kurang dari dua per tiga. Atau dapat ditulis dengan lambang kurang dari, yang mulutnya terbuka ke pecahan yang lebih besar.";
const SUARA_A5 = "Panduan guru: guru meminta murid mengamati dua gambar itu. Kegiatan boleh diganti sesuai kondisi kelas, asal yang disajikan ada di sekitar murid.";

export const ADEGAN_AMATI_SATU: AdeganStory = {
  id: "amati-satu",
  judul: "Ayo Mengamati: satu per tiga dan dua per tiga",
  sumber: "Buku Siswa hlm. 63; Panduan Guru hlm. 98",
  latar: "#F0F9FF",
  kutipan: [
    "Membandingkan pecahan dengan penyebut yang sama",
    "Ayo Mengamati",
    "Amati gambar di atas. Bandingkan daerah arsir antara kedua pecahan tersebut.",
    "Daerah arsir mana yang lebih kecil?",
    "lebih kecil dari daerah arsir",
    "kurang dari",
    "Atau dapat ditulis sebagai berikut:",
    "Aktivitas Pembelajaran",
    "Guru meminta peserta didik untuk mengamati 2 gambar yang ada di buku",
    "siswa tentang pecahan berpenyebut sama.",
    "Kegiatan ini dapat diganti",
    "disesuaikan kondisi di dalam kelas masing-masing guru sehingga apa yang",
    "disajikan adalah sesuatu yang ada di sekitar peserta didik.",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Ayo Mengamati: gambar pertama")),
      tambah("pertama", ...batang("a1", 40, 70, 150, 36, 3, 0)),
      warnai("diarsir,", W.emas, "a1-b0"),
      tambah(idx(SUARA_A1, "tiga", 2), ...pecahan("a1f", 240, 86, 1, 3, 18)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Ayo Mengamati: gambar kedua")),
      tambah("kedua", ...batang("a2", 40, 70, 150, 36, 3, 0)),
      warnai("diarsir,", W.emas, "a2-b0", "a2-b1"),
      tambah(idx(SUARA_A2, "tiga", 2), ...pecahan("a2f", 240, 86, 2, 3, 18)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Mana yang lebih kecil?")),
      tambah(0, ...batang("a1", 40, 44, 150, 30, 3, 1), ...pecahan("a1f", 240, 60, 1, 3, 16)),
      tambah(0, ...batang("a2", 40, 110, 150, 30, 3, 2), ...pecahan("a2f", 240, 126, 2, 3, 16)),
      tambah("kecil?", teks("a3", 150, 168, "yang lebih kecil: satu per tiga", 9.4, W.merah)),
      sorotkan("kecil@2", "a1-b0"),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Ditulis dengan lambang")),
      tambah("Maka", ...pecahan("l1", 90, 90, 1, 3, 24), teks("l2", 150, 100, "<", 28, W.merah), ...pecahan("l3", 210, 90, 2, 3, 24)),
      tambah("kurang", teks("l4", 150, 150, "satu per tiga kurang dari dua per tiga", 8.8, W.coklat)),
      tambah("mulutnya", ...kartu("l5", 40, 162, 220, 28, W.emas, ["mulut < terbuka ke yang besar"], 8.8)),
    ),
    k(
      SUARA_A5,
      bersih(0),
      tambah(0, judul("Panduan guru: Ayo Mengamati")),
      tambah("meminta", ...kartu("pg1", 14, 34, 272, 34, W.hijauMuda, ["guru meminta murid mengamati 2 gambar"], 8.6)),
      tambah("diganti", ...kartu("pg2", 14, 76, 272, 34, W.langit, ["kegiatan boleh diganti sesuai kelas"], 8.8)),
      tambah("sekitar", ...kartu("pg3", 14, 118, 272, 34, W.emas, ["sajikan sesuatu di sekitar murid"], 8.8)),
      tambah("murid.", emo("pg4", 150, 180, "🏫", 24)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Mengamati 2: dua per sepuluh dan satu per sepuluh (Buku Siswa hlm. 64) ------------------------------ */
const SUARA_B1 = "Sekarang dua gambar dibagi sepuluh bagian sama besar. Yang atas diarsir dua bagian, yaitu dua per sepuluh. Yang bawah diarsir satu bagian, yaitu satu per sepuluh.";
const SUARA_B2 = "Pertanyaannya kini terbalik: daerah arsir mana yang lebih besar? Daerah arsir dua per sepuluh lebih besar dari daerah arsir satu per sepuluh.";
const SUARA_B3 = "Maka dua per sepuluh lebih dari satu per sepuluh. Atau ditulis dengan lambang lebih dari, yang mulutnya terbuka ke pecahan dua per sepuluh.";
const SUARA_B4 = "Perhatikan: kedua gambar memakai potongan sama besar, jadi cukup menghitung potongan yang diarsir. Dua potongan lebih banyak dari satu potongan, sehingga pecahan itu lebih besar.";

export const ADEGAN_AMATI_DUA: AdeganStory = {
  id: "amati-dua",
  judul: "Ayo Mengamati: dua per sepuluh dan satu per sepuluh",
  sumber: "Buku Siswa hlm. 64",
  latar: "#F0FDF4",
  kutipan: [
    "Amati gambar di atas. Bandingkan daerah arsir antara kedua pecahan tersebut.",
    "Daerah arsir mana yang lebih besar?",
    "lebih besar dari daerah arsir",
    "lebih dari",
    "Atau dapat ditulis sebagai berikut:",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Dibagi sepuluh bagian sama besar")),
      tambah("dibagi", ...batang("b1", 20, 48, 200, 28, 10, 0), ...batang("b2", 20, 104, 200, 28, 10, 0)),
      warnai("atas", W.emas, "b1-b0", "b1-b1"),
      tambah(idx(SUARA_B1, "sepuluh", 2), ...pecahan("b1f", 258, 60, 2, 10, 16)),
      warnai("bawah", W.emas, "b2-b0"),
      tambah(idx(SUARA_B1, "sepuluh", 3), ...pecahan("b2f", 258, 116, 1, 10, 16)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Mana yang lebih besar?")),
      tambah(0, ...batang("b1", 20, 44, 200, 28, 10, 2), ...pecahan("b1f", 258, 56, 2, 10, 16)),
      tambah(0, ...batang("b2", 20, 100, 200, 28, 10, 1), ...pecahan("b2f", 258, 112, 1, 10, 16)),
      tambah("besar?", teks("b3", 150, 168, "yang lebih besar: dua per sepuluh", 9.4, W.merah)),
      sorotkan("besar@2", "b1-b0", "b1-b1"),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Ditulis dengan lambang")),
      tambah("Maka", ...pecahan("m1", 90, 90, 2, 10, 24), teks("m2", 150, 100, ">", 28, W.merah), ...pecahan("m3", 210, 90, 1, 10, 24)),
      tambah("lebih@2", teks("m4", 150, 150, "dua per sepuluh lebih dari satu per sepuluh", 8.4, W.coklat)),
      tambah("mulutnya", ...kartu("m5", 40, 162, 220, 28, W.emas, ["mulut > terbuka ke yang besar"], 8.8)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Potongan sama besar")),
      tambah("kedua", ...batang("p1", 40, 40, 160, 24, 10, 2), ...batang("p2", 40, 74, 160, 24, 10, 1)),
      tambah("menghitung", ...kartu("p3", 14, 112, 272, 30, W.hijauMuda, ["potongan sama besar: hitung yang diarsir"], 8.6)),
      tambah("Dua", teks("p4", 226, 56, "2 potongan", 8.4, W.biru), teks("p5", 226, 90, "1 potongan", 8.4, W.biru)),
      tambah("sehingga", ...kartu("p6", 14, 150, 272, 34, W.emas, ["lebih banyak potongan = pecahan lebih besar"], 8.4)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Berlatih 1 dan 2: lingkaran dan batang (Buku Siswa hlm. 64–65; Panduan Guru hlm. 98) ------------------------------ */
const SUARA_C1 = "Ayo Berlatih. Isilah titik-titik dengan pecahan yang sesuai gambar serta tanda lebih dari atau kurang dari. Nomor satu memakai dua lingkaran yang dibagi empat sama besar.";
const SUARA_C2 = "Lingkaran kiri diarsir dua bagian, lingkaran kanan satu bagian. Jadi dua per empat lebih dari satu per empat.";
const SUARA_C3 = "Kunci panduan guru menulis dua per empat lebih dari satu per tiga. Tanda lebih dari memang benar, tetapi gambar dibagi empat, jadi pecahan kedua seharusnya satu per empat. Itu salah ketik.";
const SUARA_C4 = "Nomor dua: dua batang sama panjang dibagi enam. Batang atas diarsir dua bagian dan batang bawah empat bagian. Dua per enam kurang dari empat per enam, sesuai kunci.";

export const ADEGAN_BERLATIH_SATU_DUA: AdeganStory = {
  id: "berlatih-satu-dua",
  judul: "Ayo Berlatih nomor 1 dan 2: lingkaran dan batang",
  sumber: "Buku Siswa hlm. 64–65; Panduan Guru hlm. 98",
  latar: "#FFFBEB",
  kutipan: [
    "Ayo Berlatih",
    "Isilah titik-titik di bawah ini dengan bilangan pecahan yang sesuai dengan",
    "gambar serta notasi lebih dari ( > ) atau kurang dari ( < ).",
    "Lengkapi titik-titik dibawah ini!",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Ayo Berlatih nomor 1")),
      tambah("lingkaran", ...lingkaran("lk1", 75, 76, 36, 4, []), ...lingkaran("lk2", 225, 76, 36, 4, [])),
      tambah("tanda", teks("lq", 150, 84, "?", 26, W.merah)),
      tambah("titik-titik", teks("lt1", 75, 146, "… / …", 12, W.biru), teks("lt2", 225, 146, "… / …", 12, W.biru)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Nomor 1: dua per empat dan satu per empat")),
      tambah(0, ...lingkaran("lk1", 75, 70, 34, 4, []), ...lingkaran("lk2", 225, 70, 34, 4, [])),
      warnai("kiri", W.emas, "lk1-q2", "lk1-q3"),
      warnai("kanan", W.emas, "lk2-q2"),
      tambah("Jadi", ...pecahan("lf1", 75, 140, 2, 4, 14), ...pecahan("lf2", 225, 140, 1, 4, 14)),
      tambah("lebih", teks("lft", 150, 150, ">", 24, W.merah)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Catatan kunci nomor 1")),
      tambah("Kunci", ...kartu("kc1", 14, 32, 272, 30, W.merahMuda, ["kunci Panduan Guru hlm. 98"], 8.8)),
      tambah("empat", ...pecahan("kc2", 90, 100, 2, 4, 18)),
      tambah("lebih", teks("kc3", 150, 110, ">", 24, W.merah)),
      tambah(idx(SUARA_C3, "tiga"), ...pecahan("kc4", 210, 100, 1, 3, 18, W.merah), emo("kc5", 252, 112, "❌", 18)),
      tambah("seharusnya", ...kartu("kc6", 40, 144, 220, 34, W.hijauMuda, ["seharusnya 1/4, sesuai gambar"], 9)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Nomor 2: dua batang")),
      tambah("batang", ...batang("bt1", 55, 36, 190, 26, 6, 0), ...batang("bt2", 55, 82, 190, 26, 6, 0)),
      warnai("atas", W.emas, "bt1-b0", "bt1-b1"),
      warnai("bawah", W.emas, "bt2-b0", "bt2-b1", "bt2-b2", "bt2-b3"),
      tambah(idx(SUARA_C4, "dua", 4), ...pecahan("bf1", 100, 148, 2, 6, 14)),
      tambah("kurang", teks("bft", 150, 156, "<", 24, W.merah)),
      tambah(idx(SUARA_C4, "empat", 2), ...pecahan("bf2", 200, 148, 4, 6, 14)),
    ),
  ],
};
