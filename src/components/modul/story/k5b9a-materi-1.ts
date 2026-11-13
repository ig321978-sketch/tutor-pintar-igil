import type { AdeganStory } from "./logika-story";
import { W, bacaanDua, emo, judul, kartu, panah, tabelNilai, digit, teks } from "./k5b9a-gambar";
import { bersih, k, tambah, warnai } from "./k5b9a-bantu";

/* ------------------------------ 1. Pembuka bab: sensus penduduk (hlm. 273 sampai 275) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-sensus",
  judul: "Pembuka Bab 9: data sensus penduduk",
  sumber: "Buku Siswa hlm. 273–275",
  latar: "#ECFEFF",
  kutipan: [
    "Bilangan Cacah",
    "Sampai 1.000.000",
    "Ayo Menyimak",
    "Gambar 9.1 Jumlah Penduduk Laki-Laki di Beberapa Wilayah di Indonesia",
    "Data pada gambar merupakan data sensus penduduk",
    "Bangka Belitung, Gorontalo, dan Papua Barat",
    "Bagaimana cara membaca dan menuliskan bilangan yang terdiri",
    "Bagaimana menentukan nilai tempat 6 pada angka",
    "Kalian akan dapat menjawab pertanyaan tersebut setelah",
  ],
  ketukan: [
    k(
      "Bab 9 Bilangan Cacah Sampai satu juta dimulai dari data sensus penduduk tahun 2020 di beberapa wilayah Indonesia.",
      tambah(0, judul("Bab 9 Bilangan Cacah")),
      tambah("juta", ...kartu("jt", 70, 36, 160, 40, W.krem, ["sampai 1.000.000"], 13)),
      tambah("sensus", emo("gr", 92, 140, "📊", 38), teks("sn", 92, 166, "Sensus 2020", 9.4, W.hijau)),
      tambah("Indonesia.", emo("ds", 208, 140, "🌏", 38), teks("dst", 208, 166, "Indonesia", 9.4, W.hijau)),
    ),
    k(
      "Pada Gambar 9.1 tersedia jumlah penduduk laki-laki di Bangka Belitung, Gorontalo, dan Papua Barat. Angkanya besar dan terdiri dari banyak angka.",
      bersih(0),
      tambah(0, judul("Gambar 9.1: penduduk laki-laki")),
      tambah("Bangka", ...kartu("w1", 8, 40, 86, 56, W.langit, ["Bangka", "Belitung"], 9.4)),
      tambah("Gorontalo,", ...kartu("w2", 107, 40, 86, 56, W.krem, ["Gorontalo"], 9.4)),
      tambah("Papua", ...kartu("w3", 206, 40, 86, 56, "#DCFCE7", ["Papua", "Barat"], 9.4)),
      tambah("Angkanya", teks("an", 150, 150, "angkanya besar, banyak angka", 11, W.merah)),
    ),
    k(
      "Buku bertanya, bagaimana membaca bilangan 720.736? Lalu bagaimana menentukan nilai tempat angka 6 pada bilangan itu?",
      bersih(0),
      tambah(0, judul("dua pertanyaan buku")),
      tambah("membaca", teks("b", 150, 96, "720.736", 32), teks("q1", 150, 56, "bagaimana membacanya?", 10.4, W.hijau)),
      tambah("angka", panah("pb", 206, 136, 0, -26, W.merah, 2, { gambar: true }), teks("q2", 206, 152, "nilai tempat angka 6?", 10.4, W.merah)),
    ),
    k(
      "Dua pertanyaan lain di halaman itu, tentang bilangan yang lebih besar dan tentang komposisi, dijawab di subbab berikutnya.",
      bersih(0),
      tambah(0, judul("pertanyaan untuk nanti")),
      tambah("lebih", ...kartu("p1", 14, 40, 128, 62, W.langit, ["599.198 dan 599.047", "mana yang lebih besar?"], 8.6)),
      tambah("komposisi,", ...kartu("p2", 158, 40, 128, 62, W.krem, ["komposisi bilangan", "599.198"], 8.6)),
      tambah("subbab", teks("sa", 78, 126, "dijawab di Subbab B", 9, W.ungu), teks("sc", 222, 126, "dijawab di Subbab C", 9, W.ungu)),
    ),
    k(
      "Subbab A hanya menjawab dua hal: cara membaca dan menulis bilangan sampai satu juta, serta nilai tempat tiap angka.",
      bersih(0),
      tambah(0, judul("Subbab A: dua hal")),
      tambah("membaca", emo("e1", 80, 96, "📖", 38), ...kartu("m1", 14, 118, 132, 40, W.langit, ["membaca dan", "menulis bilangan"], 8.8)),
      tambah("nilai", emo("e2", 220, 96, "🔢", 38), ...kartu("m2", 154, 118, 132, 40, W.krem, ["nilai tempat", "tiap angka"], 8.8)),
    ),
  ],
};

/* ------------------------------ 2. Tujuan, peta konsep, kata kunci (hlm. 273 sampai 274 dan Buku Panduan Guru) ------------------------------ */
const chip = (id: string, x: number, y: number, isi: string, warna: string) => kartu(id, x, y, 134, 30, warna, [isi], 9, { rx: 10 });

export const ADEGAN_TUJUAN: AdeganStory = {
  id: "tujuan-peta",
  judul: "Tujuan, peta konsep, dan kata kunci Bab 9",
  sumber: "Buku Siswa hlm. 273–274 dan Buku Panduan Guru hlm. 395–396",
  latar: "#FFF7ED",
  kutipan: [
    "Tujuan Pembelajaran",
    "membaca dan menulis bilangan sampai 1.000.000 serta menentukan",
    "nilai tempatnya",
    "Peta Konsep",
    "Nilai Tempat",
    "Kata Kunci",
    "Bilangan bulat, bilangan cacah, nilai tempat, komposisi, dekomposisi,",
    "bilangan cacah sampai 1.000.000",
  ],
  ketukan: [
    k(
      "Tujuan Pembelajaran bab ini, antara lain, membaca dan menulis bilangan sampai satu juta, serta menentukan nilai tempatnya.",
      tambah(0, judul("Tujuan Pembelajaran")),
      tambah("membaca", ...kartu("t1", 20, 40, 260, 44, W.langit, ["membaca dan menulis bilangan", "sampai 1.000.000"], 10)),
      tambah("nilai", ...kartu("t2", 20, 100, 260, 44, W.krem, ["menentukan nilai tempatnya"], 10.4)),
    ),
    k(
      "Buku Panduan Guru memerinci tiga tujuan untuk Subbab A: membaca, menuliskan, dan menentukan nilai tempat bilangan cacah sampai satu juta.",
      bersih(0),
      tambah(0, judul("tiga tujuan Subbab A")),
      tambah("membaca,", ...kartu("g1", 8, 44, 88, 76, W.langit, ["1.1", "membaca"], 10)),
      tambah("menuliskan,", ...kartu("g2", 106, 44, 88, 76, W.krem, ["1.2", "menuliskan"], 10)),
      tambah("menentukan", ...kartu("g3", 204, 44, 88, 76, "#DCFCE7", ["1.3", "nilai tempat"], 10)),
      tambah("juta.", teks("gb", 150, 160, "bilangan cacah sampai 1.000.000", 10, W.ungu)),
    ),
    k(
      "Peta konsep bab ini memuat bilangan, nilai tempat, komposisi, dan dekomposisi. Subbab A mengerjakan bagian nilai tempat.",
      bersih(0),
      tambah(0, judul("Peta Konsep")),
      tambah("bilangan", ...kartu("pk1", 100, 30, 100, 28, W.langit, ["Bilangan"], 10)),
      tambah("nilai", panah("pa1", 150, 60, 0, 16, W.biru, 2, { gambar: true }), ...kartu("pk2", 90, 80, 120, 28, W.krem, ["Nilai Tempat"], 10)),
      tambah("komposisi,", panah("pa2", 130, 110, -48, 18, W.biru, 2, { gambar: true }), ...kartu("pk3", 18, 130, 110, 28, W.putih, ["Komposisi"], 10)),
      tambah("dekomposisi.", panah("pa3", 170, 110, 48, 18, W.biru, 2, { gambar: true }), ...kartu("pk4", 172, 130, 110, 28, W.putih, ["Dekomposisi"], 10)),
      tambah("Subbab", teks("pk5", 150, 184, "Subbab A: bagian nilai tempat", 10, W.merah)),
    ),
    k(
      "Kata kunci bab ini: bilangan bulat, bilangan cacah, nilai tempat, komposisi, dekomposisi, dan bilangan cacah sampai satu juta.",
      bersih(0),
      tambah(0, judul("Kata Kunci")),
      tambah("bulat,", ...chip("c1", 10, 38, "bilangan bulat", W.langit)),
      tambah("cacah,", ...chip("c2", 156, 38, "bilangan cacah", W.krem)),
      tambah("nilai", ...chip("c3", 10, 84, "nilai tempat", "#DCFCE7")),
      tambah("komposisi,", ...chip("c4", 156, 84, "komposisi", W.langit)),
      tambah("dekomposisi,", ...chip("c5", 10, 130, "dekomposisi", W.krem)),
      tambah("juta.", ...chip("c6", 156, 130, "sampai 1.000.000", "#DCFCE7")),
    ),
    k(
      "Menurut glosarium buku, bilangan cacah adalah bilangan yang dimulai dari angka nol dan bernilai positif.",
      bersih(0),
      tambah(0, judul("bilangan cacah")),
      tambah("dimulai", ...["0", "1", "2", "3", "4", "5"].map((n, i) => kartu(`n${i}`, 14 + i * 46, 60, 40, 44, i === 0 ? W.merahMuda : W.krem, [n], 16))),
      tambah("nol", panah("na", 34, 124, 0, -14, W.merah, 2, { gambar: true }), teks("nt", 34, 140, "mulai dari nol", 8.6, W.merah)),
      tambah("positif.", teks("np", 150, 176, "dan terus bertambah", 10.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Mengingat Kembali: 98.765 (hlm. 275) ------------------------------ */
export const ADEGAN_MENGINGAT: AdeganStory = {
  id: "mengingat",
  judul: "Ayo Mengingat Kembali: bilangan 98.765",
  sumber: "Buku Siswa hlm. 275",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Mengingat Kembali",
    "Pada Bab 1, kalian telah mempelajari cara membaca dan menulis",
    "bilangan cacah sampai 100.000 serta menentukan nilai tempatnya",
    "Bagaimana membaca bilangan 98.765?",
    "Bagaimana menulis",
    "enam puluh lima",
    "Tentukan nilai tempat 98.765 pada tabel berikut",
    "Sepuluh Ribuan Ribuan Ratusan Puluhan Satuan",
  ],
  ketukan: [
    k(
      "Ayo mengingat kembali. Di Bab 1 kita sudah membaca, menulis, dan menentukan nilai tempat bilangan sampai seratus ribu.",
      tambah(0, judul("Ayo Mengingat Kembali")),
      tambah("Bab", ...kartu("b1", 30, 44, 240, 40, W.krem, ["Bab 1: bilangan sampai 100.000"], 11)),
      tambah("menentukan", emo("ing", 150, 138, "💭", 40), teks("ingt", 150, 164, "membaca, menulis, nilai tempat", 9.6, W.hijau)),
    ),
    k(
      "Nomor satu: bagaimana membaca bilangan 98.765? Dibaca sembilan puluh delapan ribu tujuh ratus enam puluh lima.",
      bersih(0),
      tambah(0, judul("nomor 1: membaca")),
      tambah(0, teks("n98", 150, 84, "98.765", 30)),
      tambah("sembilan", ...bacaanDua("rd", 150, 112, "sembilan puluh delapan ribu", "tujuh ratus enam puluh lima").slice(0, 2)),
      tambah("tujuh", ...bacaanDua("rd", 150, 112, "sembilan puluh delapan ribu", "tujuh ratus enam puluh lima").slice(2)),
    ),
    k(
      "Nomor dua: menulis sembilan puluh delapan ribu tujuh ratus enam puluh lima. Hasilnya 98.765, sama seperti tadi.",
      bersih(0),
      tambah(0, judul("nomor 2: menulis")),
      tambah("sembilan", ...kartu("wd", 12, 60, 130, 70, W.langit, ["sembilan puluh", "delapan ribu", "tujuh ratus", "enam puluh lima"], 9)),
      tambah("Hasilnya", panah("wp", 148, 95, 36, 0, W.hijau, 3, { gambar: true }), ...kartu("wn", 192, 70, 96, 50, W.krem, ["98.765"], 17)),
    ),
    k(
      "Nomor tiga: tabel nilai tempat lima kolom. Sembilan di puluh ribuan, delapan di ribuan, tujuh di ratusan, enam di puluhan, lima di satuan.",
      bersih(0),
      tambah(0, judul("nomor 3: tabel nilai tempat")),
      tambah(0, tabelNilai("t", 20, 56, 52, 1, 5, 34)),
      tambah("Sembilan", digit("t", 20, 56, 52, 1, 1, "9", 17, W.merah, 34)),
      tambah("delapan", digit("t", 20, 56, 52, 1, 2, "8", 17, W.biru, 34)),
      tambah("tujuh", digit("t", 20, 56, 52, 1, 3, "7", 17, W.biru, 34)),
      tambah("enam", digit("t", 20, 56, 52, 1, 4, "6", 17, W.biru, 34)),
      tambah("lima@2", digit("t", 20, 56, 52, 1, 5, "5", 17, W.biru, 34)),
    ),
    k(
      "Di buku, kolom pertama tertulis sepuluh ribuan. Maksudnya puluh ribuan, sesuai nama kolom di halaman berikutnya.",
      warnai("pertama", W.merahMuda, "t-h1"),
      tambah("tertulis", teks("sp", 150, 158, "buku menulis: Sepuluh Ribuan", 9.6, W.merah)),
      tambah("Maksudnya", teks("sq", 150, 176, "maksudnya: Puluh Ribuan", 9.6, W.hijau)),
    ),
  ],
};
