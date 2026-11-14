import type { AdeganStory } from "./logika-story";
import { W, angkaTabel, emo, judul, kartu, panah, tabelTempat, teks } from "./k5b1a-gambar";
import { bersih, hapus, idx, k, tambah, ubah } from "./k5b1a-bantu";

/* ------------------------------ 5. Harga tiga jus Nisa (Buku Siswa hlm. 4; Panduan Guru hlm. 20 sampai 21) ------------------------------ */
/** Tabel nilai tempat harga jus: tiga baris, empat kolom (ribuan sampai satuan). */
export const TB_JUS = { x: 14, y: 40, cw: 56, o: { labels: ["Mangga", "Jeruk", "Alpukat"], labelW: 48, ch: 26 } };
export const HARGA_JUS = [6375, 5950, 9050];
const KOSONG4 = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
];
const angkaJus = (i: number, j: number, d: string) => angkaTabel("jus", TB_JUS.x, TB_JUS.y, TB_JUS.cw, i, j, d, TB_JUS.o);
const hargaJus = (i: number, isi: string) => kartu(`hj${i}`, 14 + i * 92, 158, 88, 28, [W.hijauMuda, W.langit, W.krem][i], [isi], 10);

export const ADEGAN_JUS: AdeganStory = {
  id: "jus-nisa",
  judul: "Harga tiga jus Nisa dan nilai tempatnya",
  sumber: "Buku Siswa hlm. 4; Panduan Guru hlm. 20–21",
  latar: "#F0FDF4",
  kutipan: [
    "Nisa ingin membeli jus rasa mangga, jeruk, dan alpukat dari",
    "sebuah toko online.",
    "Harga sebotol jus mangga enam ribu tiga ratus tujuh puluh",
    "lima rupiah.",
    "Harga sebotol jus jeruk lima ribu sembilan ratus lima puluh rupiah.",
    "Harga sebotol jus alpukat sembilan ribu lima puluh rupiah.",
    "tersebut sesuai nilai tempatnya, ya?",
    "Jus Ribuan Ratusan Puluhan Satuan",
    "Bagaimana cara menuliskan angka harga-harga jus",
    "Ribuan Ratusan Puluhan Satuan",
    "Jus Mangga 6 3 7 5",
    "Jus Jeruk 5 9 5 0",
    "Jus Alpukat 9 0 5 0",
  ],
  ketukan: [
    k(
      "Nisa ingin membeli jus mangga, jeruk, dan alpukat dari sebuah toko online. Buku bertanya, bagaimana menuliskan angka harga tiga jus itu sesuai nilai tempatnya?",
      tambah(0, judul("Tiga jus dari toko online")),
      tambah("mangga,", emo("j1", 60, 90, "🥭", 40), teks("j1t", 60, 110, "mangga", 9, W.biru)),
      tambah("jeruk,", emo("j2", 150, 90, "🍊", 40), teks("j2t", 150, 110, "jeruk", 9, W.biru)),
      tambah("alpukat", emo("j3", 240, 90, "🥑", 40), teks("j3t", 240, 110, "alpukat", 9, W.biru)),
      tambah("bagaimana", ...kartu("jq", 30, 138, 240, 34, W.krem, ["tulis harga sesuai nilai tempat"], 9.6)),
    ),
    k(
      "Jus mangga harganya enam ribu tiga ratus tujuh puluh lima rupiah. Pada tabel nilai tempat, enam di ribuan, tiga di ratusan, tujuh di puluhan, dan lima di satuan.",
      bersih(0),
      tambah(0, judul("Harga jus mangga")),
      tambah("Jus", ...tabelTempat("jus", TB_JUS.x, TB_JUS.y, TB_JUS.cw, KOSONG4, TB_JUS.o)),
      tambah("enam@2", angkaJus(0, 0, "6")),
      tambah("tiga@2", angkaJus(0, 1, "3")),
      tambah("tujuh@2", angkaJus(0, 2, "7")),
      tambah("lima@2", angkaJus(0, 3, "5")),
      tambah("satuan.", ...hargaJus(0, "Rp6.375")),
    ),
    k(
      "Jus jeruk lima ribu sembilan ratus lima puluh rupiah, angkanya lima, sembilan, lima, nol. Jus alpukat sembilan ribu lima puluh rupiah, angkanya sembilan, nol, lima, nol.",
      tambah(8, ...hargaJus(1, "Rp5.950")),
      tambah(10, angkaJus(1, 0, "5")),
      tambah(11, angkaJus(1, 1, "9")),
      tambah(12, angkaJus(1, 2, "5")),
      tambah(13, angkaJus(1, 3, "0")),
      tambah(20, ...hargaJus(2, "Rp9.050")),
      tambah(22, angkaJus(2, 0, "9")),
      tambah(23, angkaJus(2, 1, "0")),
      tambah(24, angkaJus(2, 2, "5")),
      tambah(25, angkaJus(2, 3, "0")),
    ),
    k(
      "Perhatikan jus alpukat: ada nol di ratusan. Nol itu penjaga tempat, supaya sembilan tetap di ribuan. Tanpa nol, angkanya bergeser dan terbaca sembilan ratus lima puluh.",
      hapus(0, "hj0-k", "hj0-t0", "hj1-k", "hj1-t0", "hj2-k", "hj2-t0"),
      ubah("nol", { id: "jus-c2-1", warna: W.merahMuda }),
      tambah("Nol@2", ...kartu("pj", 30, 148, 240, 24, W.emas, ["nol menjaga tempat ratusan"], 9.6)),
      tambah("Tanpa", ...kartu("pk", 30, 176, 240, 22, W.pink, ["tanpa nol terbaca 950"], 9.6)),
    ),
  ],
};

/* ------------------------------ 6. Menulis bilangan: empat buku tulis Yohana (Buku Siswa hlm. 5 sampai 6) ------------------------------ */
/** Tabel nilai tempat satu baris, lima kolom (puluh ribuan sampai satuan). */
export const TB_KOMANG = { x: 20, y: 40, cw: 52, o: { ch: 30, u: 16 } };
const KOSONG5 = [["", "", "", "", ""]];
const angkaKomang = (j: number, d: string) => angkaTabel("km", TB_KOMANG.x, TB_KOMANG.y, TB_KOMANG.cw, 0, j, d, TB_KOMANG.o);
const SUARA_Y2 = "Cara menulisnya: empat belas ribu lima ratus ditulis dengan angka, seperti tampak di layar, dengan titik setelah angka empat.";
const SUARA_Y3 = "Eksplorasi satu titik satu. Cara Komang memakai tabel nilai tempat: puluh ribuan, ribuan, ratusan, puluhan, dan satuan. Dari kiri, angkanya satu, empat, lima, nol, nol.";
const SUARA_Y4 = "Cara Yohana: pada kalimat empat belas ribu lima ratus, kata empat belas menjadi angka empat belas, dan kata lima menjadi angka lima.";
const SUARA_Y5 = "Langkahnya: tentukan angka puluh ribuan, yaitu satu. Ribuan, yaitu empat. Ratusan, yaitu lima. Puluhan, yaitu nol. Satuan, yaitu nol. Jadi bilangannya empat belas ribu lima ratus.";

export const ADEGAN_YOHANA: AdeganStory = {
  id: "menulis-yohana",
  judul: "Menulis bilangan: buku tulis Yohana, Cara Komang dan Cara Yohana",
  sumber: "Buku Siswa hlm. 5–6",
  latar: "#FFFBEB",
  kutipan: [
    "1. Menulis Bilangan Cacah Sampai 100.000",
    "Yohana merupakan siswa",
    "baru di kelas V SD Pancasila.",
    "buku dan alat tulis. Ibu",
    "buku tulis dengan harga",
    "empat belas ribu lima",
    "belas ribu lima ratus” adalah",
    "empat belas ribu lima ratus ditulis 14.500",
    "Perhatikan cara Komang dan Yohana menuliskan bilangan berikut ini.",
    "Komang menuliskan harga buku tulis pada tabel berikut.",
    "Yohana menuliskan harga buku tulis sebagai",
    "Tentukan angka yang menunjukkan nilai tempat puluh ribuan,",
    "yaitu satu, ditulis 1.",
    "yaitu empat, ditulis 4.",
    "yaitu lima, ditulis 5.",
    "yaitu nol, ditulis 0.",
    "Jadi, bilangan tersebut adalah 14.500.",
  ],
  ketukan: [
    k(
      "Bagian pertama: menulis bilangan cacah sampai seratus ribu. Yohana siswa baru di kelas lima SD Pancasila. Ibu membelikan empat buku tulis dengan harga empat belas ribu lima ratus rupiah.",
      tambah(0, judul("1. Menulis bilangan")),
      tambah("seratus", teks("ms", 150, 40, "sampai 100.000", 10, W.biru)),
      tambah("buku", emo("bk", 150, 90, "📚", 44)),
      tambah("harga", ...kartu("hb", 40, 112, 220, 34, W.krem, ["empat belas ribu lima ratus"], 11)),
      tambah("rupiah.", teks("hr", 150, 172, "Rp14.500", 22, W.merah)),
    ),
    k(
      SUARA_Y2,
      bersih(0),
      tambah(0, judul("Cara menulis bilangan")),
      tambah("Cara", teks("c1", 150, 60, "empat belas ribu lima ratus", 12, W.biru)),
      tambah("ditulis", panah("c2", 150, 72, 0, 26, W.merah, 2)),
      tambah("tampak", teks("c3", 150, 132, "14.500", 34, W.merah)),
      tambah("titik", ...kartu("c4", 60, 148, 180, 28, W.emas, ["titik setelah angka 4"], 9.6)),
    ),
    k(
      SUARA_Y3,
      bersih(0),
      tambah(0, judul("Eksplorasi 1.1: Cara Komang")),
      tambah("tabel", ...tabelTempat("km", TB_KOMANG.x, TB_KOMANG.y, TB_KOMANG.cw, KOSONG5, TB_KOMANG.o)),
      tambah(20, angkaKomang(0, "1")),
      tambah(21, angkaKomang(1, "4")),
      tambah(22, angkaKomang(2, "5")),
      tambah(23, angkaKomang(3, "0")),
      tambah(24, angkaKomang(4, "0")),
      tambah("Dari", ...kartu("kh", 40, 108, 220, 28, W.krem, ["harga buku tulis"], 9.6)),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Cara Yohana")),
      tambah("pada", teks("y1", 70, 60, "empat belas", 10, W.biru)),
      tambah("ribu", teks("y2", 135, 60, "ribu", 10, W.biru)),
      tambah("lima", teks("y3", 175, 60, "lima", 10, W.biru)),
      tambah("ratus,", teks("y4", 212, 60, "ratus", 10, W.biru)),
      tambah("kata@1", panah("y5", 70, 68, 0, 26, W.merah, 2)),
      tambah("menjadi@1", teks("y6", 70, 116, "14", 22, W.merah)),
      tambah("lima@2", panah("y7", 175, 68, 0, 26, W.merah, 2)),
      tambah("menjadi@2", teks("y8", 175, 116, "5", 22, W.merah)),
      tambah(idx(SUARA_Y4, "lima", 3), teks("y9", 150, 170, "14.500", 24, W.merah)),
    ),
    k(
      SUARA_Y5,
      bersih(0),
      tambah(0, judul("Lima langkah menulis")),
      tambah("tentukan", ...tabelTempat("km", TB_KOMANG.x, TB_KOMANG.y, TB_KOMANG.cw, KOSONG5, TB_KOMANG.o)),
      tambah("yaitu@1", angkaKomang(0, "1")),
      tambah("yaitu@2", angkaKomang(1, "4")),
      tambah("yaitu@3", angkaKomang(2, "5")),
      tambah("yaitu@4", angkaKomang(3, "0")),
      tambah("yaitu@5", angkaKomang(4, "0")),
      tambah("Jadi", teks("jb", 150, 150, "14.500", 34, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Membaca bilangan: harga obat batuk (Buku Siswa hlm. 7) ------------------------------ */
const angkaObat = (j: number, d: string) => angkaTabel("ob", TB_KOMANG.x, TB_KOMANG.y, TB_KOMANG.cw, 0, j, d, TB_KOMANG.o);

export const ADEGAN_OBAT: AdeganStory = {
  id: "membaca-obat",
  judul: "Membaca bilangan: harga obat batuk",
  sumber: "Buku Siswa hlm. 7",
  latar: "#F0F9FF",
  kutipan: [
    "2. Membaca Bilangan Cacah Sampai 100.000",
    "Ayo Berpikir Kreatif",
    "Adiknya Asep sedang mengalami gejala",
    "Covid-19, yaitu batuk, pilek, dan demam.",
    "Apotek. Dapatkah kalian membantu Asep",
    "membaca harga obat yang dibelinya?",
    "Gambar 1.4 Harga Obat Batuk",
    "Rp66.500,00/botol",
    "Cara membaca bilangan",
    "66.500 adalah enam puluh enam ribu lima ratus.",
  ],
  ketukan: [
    k(
      "Bagian kedua: membaca bilangan cacah sampai seratus ribu. Adik Asep mengalami batuk, pilek, dan demam, jadi Ibu meminta Asep membeli obat di apotek.",
      tambah(0, judul("2. Membaca bilangan")),
      tambah("seratus", teks("rs", 150, 40, "sampai 100.000", 10, W.biru)),
      tambah("batuk,", emo("ob1", 70, 100, "🤧", 40), teks("ob1t", 70, 120, "batuk, pilek", 9, W.biru)),
      tambah("demam,", emo("ob2", 150, 100, "🌡", 40), teks("ob2t", 150, 120, "demam", 9, W.biru)),
      tambah("obat", emo("ob3", 230, 100, "💊", 40), teks("ob3t", 230, 120, "obat", 9, W.biru)),
    ),
    k(
      "Di apotek, harga obat batuk tertulis pada label dengan angka seperti tampak di layar. Dapatkah kalian membantu Asep membaca harga obatnya?",
      bersih(0),
      tambah(0, judul("Gambar 1.4: harga obat batuk")),
      tambah("Di", teks("hs", 150, 56, "HARGA SPESIAL", 10, W.merah)),
      tambah("label", ...kartu("hl", 50, 66, 200, 44, W.emas, ["Rp66.500,00/botol"], 14)),
      tambah("Dapatkah", ...kartu("hq", 30, 130, 240, 36, W.krem, ["bagaimana membaca harganya?"], 9.6)),
    ),
    k(
      "Buku menjawab: cara membaca bilangan itu adalah enam puluh enam ribu lima ratus.",
      bersih(0),
      tambah(0, judul("Cara membaca 66.500")),
      tambah("Buku", teks("rb", 150, 74, "66.500", 34, W.merah)),
      tambah("enam@1", teks("rb1", 150, 112, "enam puluh enam ribu", 12, W.biru)),
      tambah("lima", teks("rb2", 150, 132, "lima ratus", 12, W.biru)),
    ),
    k(
      "Kita ingat nilai tempatnya. Angka enam pertama ada di puluh ribuan, angka enam kedua di ribuan, angka lima di ratusan, dan dua angka nol di puluhan dan satuan.",
      bersih(0),
      tambah(0, judul("Nilai tempat 66.500")),
      tambah("nilai", ...tabelTempat("ob", TB_KOMANG.x, TB_KOMANG.y, TB_KOMANG.cw, KOSONG5, TB_KOMANG.o)),
      tambah("enam@1", angkaObat(0, "6")),
      tambah("enam@2", angkaObat(1, "6")),
      tambah("lima@1", angkaObat(2, "5")),
      tambah("nol@1", angkaObat(3, "0")),
      tambah("satuan.", angkaObat(4, "0")),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berpikir Kritis: Kecamatan Kayu Tanam (Buku Siswa hlm. 7; Panduan Guru hlm. 23 sampai 24) ------------------------------ */
export const TB_KAYU = { x: 11, y: 36, cw: 46, o: { labels: ["Seluruh", "Perempuan", "Laki-laki"], labelW: 48, ch: 28 } };
const KOSONG5_3 = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
const angkaKayu = (i: number, j: number, d: string) => angkaTabel("ky", TB_KAYU.x, TB_KAYU.y, TB_KAYU.cw, i, j, d, TB_KAYU.o);
const chipKayu = (id: string, isi: string, warna: string) => kartu(id, 14, 150, 272, 28, warna, [isi], 10);
const kartuBaca = (id: string, y: number, angka: string, kata: string, warna: string) => kartu(id, 14, y, 272, 36, warna, [angka, kata], 8.4);

export const ADEGAN_KAYU: AdeganStory = {
  id: "kayu-tanam",
  judul: "Ayo Berpikir Kritis: penduduk Kecamatan Kayu Tanam",
  sumber: "Buku Siswa hlm. 7; Panduan Guru hlm. 23–24",
  latar: "#F5F3FF",
  kutipan: [
    "Ayo Berpikir Kritis",
    "Kecamatan Kayu Tanam terletak di Kabupaten Padang Pariaman,",
    "Provinsi Sumatra Barat. Pada tahun 2018, penduduk kecamatan ini",
    "berjumlah 26.932 jiwa yang terdiri atas 13.354 jiwa laki-laki dan tiga",
    "belas ribu lima ratus tujuh puluh delapan jiwa perempuan.",
    "Tuliskan jumlah seluruh penduduk Kecamatan Kayu Tanam dan",
    "Tuliskan cara membaca bilangan yang kalian peroleh dari nomor",
    "Jumlah seluruh penduduk Kecamatan Kayu Tanam adalah 26.932 Jiwa.",
    "Jumlah penduduk perempuan Kecamatan Kayu Tanam adalah 13.578.",
    "Jumlah penduduk laki-laki Kecamatan Kayu Tanam adalah 13.354.",
    "Puluh Ribuan Ribuan Ratusan Puluhan Satuan",
    "Dua puluh enam ribu sembilan ratus tiga puluh dua",
    "Tiga belas ribu lima ratus tujuh puluh delapan",
    "Tiga belas ribu tiga ratus lima puluh empat",
  ],
  ketukan: [
    k(
      "Ayo berpikir kritis. Kecamatan Kayu Tanam ada di Sumatra Barat. Pada tahun dua ribu delapan belas penduduknya berjumlah seperti tampak di layar, terdiri atas laki-laki dan perempuan.",
      tambah(0, judul("Kecamatan Kayu Tanam")),
      tambah("Sumatra", ...kartu("kt", 14, 28, 272, 26, W.krem, ["Sumatra Barat, tahun 2018"], 9.6)),
      tambah("berjumlah", ...kartu("ks", 14, 62, 272, 28, W.hijauMuda, ["seluruhnya: 26.932 jiwa"], 10)),
      tambah("laki-laki", ...kartu("kl", 14, 98, 272, 28, W.langit, ["laki-laki: 13.354 jiwa"], 10)),
      tambah("perempuan.", ...kartu("kp", 14, 134, 272, 40, W.pink, ["perempuan: tiga belas ribu lima ratus", "tujuh puluh delapan jiwa"], 9)),
    ),
    k(
      "Soal satu: jumlah seluruh penduduk adalah dua puluh enam ribu sembilan ratus tiga puluh dua jiwa. Nilai tempatnya: dua, enam, sembilan, tiga, dan dua.",
      bersih(0),
      tambah(0, judul("Soal 1: jumlah seluruh")),
      tambah("Soal", ...tabelTempat("ky", TB_KAYU.x, TB_KAYU.y, TB_KAYU.cw, KOSONG5_3, TB_KAYU.o)),
      tambah(18, angkaKayu(0, 0, "2")),
      tambah(19, angkaKayu(0, 1, "6")),
      tambah(20, angkaKayu(0, 2, "9")),
      tambah(21, angkaKayu(0, 3, "3")),
      tambah(23, angkaKayu(0, 4, "2")),
      tambah(15, ...chipKayu("r0", "seluruh penduduk: 26.932 jiwa", W.hijauMuda)),
    ),
    k(
      "Soal dua: penduduk perempuan tiga belas ribu lima ratus tujuh puluh delapan jiwa. Angkanya satu, tiga, lima, tujuh, dan delapan.",
      hapus(0, "r0-k", "r0-t0"),
      tambah("perempuan", ...chipKayu("r1", "perempuan: 13.578 jiwa", W.pink)),
      tambah(14, angkaKayu(1, 0, "1")),
      tambah(15, angkaKayu(1, 1, "3")),
      tambah(16, angkaKayu(1, 2, "5")),
      tambah(17, angkaKayu(1, 3, "7")),
      tambah(19, angkaKayu(1, 4, "8")),
    ),
    k(
      "Soal tiga: penduduk laki-laki tiga belas ribu tiga ratus lima puluh empat jiwa. Angkanya satu, tiga, tiga, lima, dan empat.",
      hapus(0, "r1-k", "r1-t0"),
      tambah("laki-laki", ...chipKayu("r2", "laki-laki: 13.354 jiwa", W.langit)),
      tambah(14, angkaKayu(2, 0, "1")),
      tambah(15, angkaKayu(2, 1, "3")),
      tambah(16, angkaKayu(2, 2, "3")),
      tambah(17, angkaKayu(2, 3, "5")),
      tambah(19, angkaKayu(2, 4, "4")),
    ),
    k(
      "Soal empat meminta cara membaca ketiganya, seperti tampak di layar. Catatan guru: jika laki-laki dan perempuan dijumlahkan, hasilnya dua puluh enam ribu sembilan ratus tiga puluh dua, cocok dengan jumlah seluruh penduduk.",
      bersih(0),
      tambah(0, judul("Soal 4: cara membaca")),
      tambah("Soal", ...kartuBaca("b0", 30, "26.932", "dua puluh enam ribu sembilan ratus tiga puluh dua", W.hijauMuda)),
      tambah("ketiganya,", ...kartuBaca("b1", 72, "13.578", "tiga belas ribu lima ratus tujuh puluh delapan", W.pink)),
      tambah("tampak", ...kartuBaca("b2", 114, "13.354", "tiga belas ribu tiga ratus lima puluh empat", W.langit)),
      tambah("Catatan", teks("bq", 150, 172, "13.354 + 13.578 = 26.932", 12, W.merah)),
    ),
  ],
};
