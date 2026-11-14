import type { AdeganStory } from "./logika-story";
import { W, TEMPAT, emo, judul, kartu, kartuAngka, kotak, panah, papanIsi, papanKepala, papanKolom, teks } from "./k4b1a-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b1a-bantu";

/* ------------------------------ 5. Jarak rumah Helen (Buku Siswa hlm. 5) ------------------------------ */
const SUARA_J1 = "Seorang siswa di gambar bertanya: dapatkah kalian membaca bilangan yang tertulis pada label harga? Label botol minuman itu bertuliskan enam ribu tujuh ratus lima puluh.";
const SUARA_J2 = "Setelah berbelanja, Helen dan Ibu pulang ke rumah. Jarak dari minimarket ke rumah adalah tiga ribu dua ratus delapan puluh enam meter.";
const SUARA_J3 = "Buku bertanya: tahukah kalian cara membaca bilangan di kotak hasil? Untuk mengetahui nama bilangan itu, ayo berkreasi dengan kartu.";
const SUARA_J4 = "Catatan video: di gambar buku, tulisan pada panah jarak tertera tiga ribu dua ratus enam puluh delapan, sedangkan kotak hasil dan kalimat buku tertulis tiga ribu dua ratus delapan puluh enam. Kita memakai bilangan dari kalimat buku.";

export const ADEGAN_JARAK: AdeganStory = {
  id: "jarak-rumah",
  judul: "Label harga dan jarak rumah Helen",
  sumber: "Buku Siswa hlm. 5",
  latar: "#F0F9FF",
  kutipan: [
    "Dapatkah kalian membaca bilangan yang tertulis pada label harga pada gambar?",
    "Setelah Helen dan Ibu berbelanja di minimarket, Mereka pulang ke rumah.",
    "Jarak dari minimarket ke rumah, yaitu 3.286 meter.",
    "Tahukah kalian cara membaca bilangan 3.286?",
    "Perhatikan cara membaca bilangan berikut.",
    "Untuk mengetahui nama bilangan tersebut. Ayo kita berkreasi dengan kartu.",
  ],
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Membaca label harga")),
      tambah("siswa", emo("j1", 245, 120, "👦", 40)),
      tambah("dapatkah", ...kartu("j2", 120, 36, 170, 40, W.langit, ["dapatkah kalian membaca", "bilangan di label harga?"], 8.6)),
      tambah("botol", emo("j3", 60, 112, "🧃", 46)),
      tambah("bertuliskan", ...kartu("j4", 20, 134, 90, 34, W.putih, ["6.750"], 14)),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Jarak minimarket ke rumah")),
      tambah("minimarket", emo("r1", 40, 110, "🏪", 44)),
      tambah("rumah.", emo("r2", 260, 110, "🏠", 44)),
      tambah("Jarak", panah("r3", 72, 100, 156, 0, W.oranye, 4), teks("r4", 150, 88, "jarak", 9, W.coklat)),
      tambah("tiga", ...kartu("r5", 80, 124, 140, 36, W.krem, ["3.286 meter"], 14)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Bagaimana cara membacanya?")),
      tambah("tahukah", ...kartu("b1", 70, 32, 160, 46, W.putih, ["3.286"], 22)),
      tambah("cara", teks("b2", 150, 100, "dibaca ... ?", 13, W.merah)),
      tambah("kartu.", ...[0, 1, 2, 3].map((i) => kartuAngka(`b3${i}`, 78 + i * 36, 130, "3286"[i], W.krem, 30, 36, 18)).flat()),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Catatan video: dua tulisan berbeda", W.merah)),
      tambah("panah", ...kartu("c1", 14, 34, 272, 36, W.merahMuda, ["tulisan pada panah di gambar: 3.268"], 9.4)),
      tambah("sedangkan", ...kartu("c2", 14, 80, 272, 36, W.hijauMuda, ["kotak hasil dan kalimat buku: 3.286"], 9.4)),
      tambah("Kita", ...kartu("c3", 14, 126, 272, 36, W.emas, ["yang dipakai video: 3.286"], 10)),
    ),
  ],
};

/* ------------------------------ 6. Aktivitas 1: kartu bilangan (Buku Siswa hlm. 5–6; Panduan Guru hlm. 32–33) ------------------------------ */
const SUARA_A1 = "Ayo Beraktivitas: Aktivitas satu, Membaca Bilangan. Alat dan bahannya adalah kertas karton, gunting, dan spidol warna.";
const SUARA_A2 = "Langkah satu: buat kelompok kerja tiga sampai lima orang. Langkah dua: siapkan kertas karton, lalu buat sepuluh kotak berukuran sepuluh sentimeter kali sepuluh sentimeter.";
const SUARA_A3 = "Langkah tiga: tulis angka nol, satu, sampai sembilan pada setiap kotak dengan spidol warna berbeda. Langkah empat: gunting kotak itu menjadi kartu bilangan.";
const SUARA_A4 = "Langkah lima: kalian punya satu paket kartu bilangan. Ambil kartu sesuai angka pada jarak rumah Helen dan minimarket, yaitu tiga, dua, delapan, dan enam. Langkah enam: nyatakan nama bilangan itu.";
const SUARA_A5 = "Panduan guru menambahkan: guru membentuk kelompok heterogen, memberi contoh kotak, dan memandu percobaan jarak rumah Helen. Lalu guru menyebut bilangan empat angka, dan kelompok menunjukkannya dengan kartu bilangan.";

const WARNA_KARTU = [W.merahMuda, W.langit, W.hijauMuda, W.krem, W.pink, W.lavender, W.jingga, W.hijauMuda, W.langit, W.krem];

export const ADEGAN_AKTIVITAS: AdeganStory = {
  id: "aktivitas-satu",
  judul: "Aktivitas 1: membuat dan memakai kartu bilangan",
  sumber: "Buku Siswa hlm. 5–6; Panduan Guru hlm. 32–33",
  latar: "#FFFBEB",
  kutipan: [
    "Ayo Beraktivitas",
    "Aktivitas 1. Membaca Bilangan",
    "Alat dan Bahan:",
    "- Kertas karton",
    "- Gunting",
    "- Spidol Warna",
    "Buatlah kelompok kerja yang terdiri dari 3-5 orang.",
    "Siapkan kertas karton dan buatlah beberapa kotak berukuran 10 cm x 10 cm sebanyak 10 kotak.",
    "Tuliskan angka 0, 1, … sampai 9 pada setiap kotak karton tersebut dengan spidol warna yang berbeda.",
    "Guntinglah kotak tersebut menjadi kartu bilangan.",
    "Sekarang kalian telah mempunyai 1 paket kartu bilangan.",
    "Ambil kartu bilangan sesuai dengan angka pada jarak rumah Helen dan minimarket.",
    "Nyatakan nama bilangan tersebut.",
    "Guru membentuk kelompok heterogen",
    "Guru memandu percobaan pertama tentang jarak rumah Helen dengan minimarket sesuai pada Buku Siswa.",
    "Guru dapat menyebutkan beberapa bilangan cacah dengan 4 angka, kemudian meminta kelompok menunjukkannya dengan kartu bilangan.",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Aktivitas 1: Membaca Bilangan")),
      tambah("Alat", teks("al", 150, 44, "Alat dan bahan", 10, W.coklat)),
      tambah("kertas", ...kartu("a1", 14, 60, 86, 44, W.krem, ["kertas", "karton"], 9.4)),
      tambah("gunting,", ...kartu("a2", 107, 60, 86, 44, W.langit, ["gunting"], 9.4)),
      tambah("spidol", ...kartu("a3", 200, 60, 86, 44, W.pink, ["spidol", "warna"], 9.4)),
      tambah("Alat", emo("a4", 150, 150, "🎨", 30)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Langkah 1 dan 2")),
      tambah("satu:", ...kartu("l1", 14, 30, 272, 28, W.hijauMuda, ["1. kelompok kerja 3 sampai 5 orang"], 8.8)),
      tambah("dua:", ...kartu("l2", 14, 66, 272, 28, W.langit, ["2. siapkan karton, buat 10 kotak"], 8.8)),
      tambah("sepuluh", ...Array.from({ length: 10 }, (_, i) => kotak(`kt${i}`, 30 + i * 24, 108, 20, 20, W.krem, W.coklat, { rx: 2 }))),
      tambah("sentimeter", teks("kt-u", 150, 148, "tiap kotak 10 cm x 10 cm", 9.4, W.coklat)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Langkah 3 dan 4")),
      tambah("tulis", ...Array.from({ length: 10 }, (_, i) => kartuAngka(`ka${i}`, 22 + (i % 5) * 52, 36 + Math.floor(i / 5) * 54, String(i), WARNA_KARTU[i], 34, 42, 20)).flat()),
      tambah("gunting", emo("gt", 150, 176, "✂", 22)),
      tambah("kartu", teks("kb", 150, 196, "satu paket kartu bilangan", 8.6, W.coklat)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Langkah 5 dan 6")),
      tambah("lima:", teks("la", 150, 40, "satu paket kartu bilangan", 9.4, W.coklat)),
      tambah("tiga,", ...kartuAngka("m0", 44, 60, "3", WARNA_KARTU[3], 40, 50, 26)),
      tambah("dua,", ...kartuAngka("m1", 100, 60, "2", WARNA_KARTU[2], 40, 50, 26)),
      tambah("delapan,", ...kartuAngka("m2", 156, 60, "8", WARNA_KARTU[8], 40, 50, 26)),
      tambah("enam.", ...kartuAngka("m3", 212, 60, "6", WARNA_KARTU[6], 40, 50, 26)),
      tambah("nyatakan", ...kartu("mn", 40, 132, 220, 34, W.emas, ["nyatakan nama bilangan itu"], 10)),
    ),
    k(
      SUARA_A5,
      bersih(0),
      tambah(0, judul("Tambahan dari Panduan Guru")),
      tambah("kelompok", ...kartu("gk", 14, 30, 272, 28, W.hijauMuda, ["guru: kelompok heterogen, beri contoh kotak"], 8.4)),
      tambah("memandu", ...kartu("gm", 14, 66, 272, 28, W.langit, ["guru memandu percobaan jarak rumah Helen"], 8.4)),
      tambah("menyebut", emo("gg", 50, 136, "👩", 34), ...kartu("gs", 78, 112, 100, 30, W.krem, ["menyebut bilangan"], 8.6)),
      tambah("kelompok@2", emo("gh", 205, 136, "🧒", 30), ...kartu("gt2", 186, 150, 100, 30, W.pink, ["tunjuk kartu"], 8.6)),
    ),
  ],
};

/* ------------------------------ 7. Cara membaca bilangan (Buku Siswa hlm. 6) ------------------------------ */
const SUARA_B1 = "Buku mengajarkan cara menyatakan nama bilangan. Tabelnya punya empat kolom: ribuan, ratusan, puluhan, dan satuan, ditandai huruf A, B, C, dan D dari kiri.";
const SUARA_B2 = "Aturannya: huruf A, satuan cukup ditulis angkanya saja. Huruf B, puluhan ditulis angka ditambah kata puluh. Huruf C, ratusan angka ditambah ratus. Huruf D, ribuan angka ditambah ribu.";
const SUARA_B3 = "Catatan video: di tabel buku, huruf A sampai D berurutan dari ribuan, tetapi aturan memakai A untuk satuan dan D untuk ribuan. Jadi pakailah nama tempatnya, bukan hurufnya.";
const SUARA_B4 = "Baca nama bilangan dari kiri ke kanan. Jika menemukan angka nol, nol itu tidak perlu dibaca.";
const SUARA_B5 = "Untuk jarak rumah Helen: ribuan tiga, ratusan dua, puluhan delapan, satuan enam. Dibaca: tiga ribu dua ratus delapan puluh enam.";
const SUARA_B6 = "Contoh pertama: bilangan pada papan pertama dibaca dua ribu enam ratus tiga puluh empat. Contoh kedua dibaca tujuh ribu tiga, karena ratusan dan puluhan bernilai nol dan tidak dibaca.";
const SUARA_B7 = "Contoh ketiga dibaca enam ribu lima ratus tujuh puluh. Satuannya nol, jadi tidak dibaca.";

export const ADEGAN_CARA_BACA: AdeganStory = {
  id: "cara-membaca",
  judul: "Cara membaca nama bilangan",
  sumber: "Buku Siswa hlm. 6",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo pelajari cara menyatakan nama bilangan 3.286 sebagai berikut.",
    "Cara menyatakan:",
    "Untuk satuan cukup dituliskan angkanya saja.",
    "Untuk puluhan, dituliskan angka ditambah",
    "Untuk ratusan, dituliskan angka ditambah",
    "Untuk ribuan, dituliskan angka ditambah",
    "Baca nama bilangan dari kiri ke kanan.",
    "Jika menemukan angka nol, maka tidak perlu dibaca.",
    "Untuk jarak rumah Helen dengan minimarket, dapat kita nyatakan:",
    "Dibaca: Tiga Ribu Dua Ratus Delapan Puluh Enam.",
    "2.634 dibaca dua ribu enam ratus tiga puluh empat",
    "7.003 dibaca tujuh ribu tiga (ratusan dan puluhan tidak dibaca karena nol)",
    "6.570 dibaca enam ribu lima ratus tujuh puluh (satuan tidak dibaca karena",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tabel nama bilangan")),
      tambah("empat", ...papanKepala("pp", 30, 50, 240, TEMPAT, 8.4, 18)),
      ...["A", "B", "C", "D"].map((h, i) => tambah(idx(SUARA_B1, h), teks(`pl${i}`, 60 + i * 60, 90, h, 14, W.merah))),
      tambah("ditandai", teks("pm", 150, 130, "huruf A, B, C, D dari kiri", 9.4, W.coklat)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Aturan dari buku")),
      tambah(idx(SUARA_B2, "a"), ...kartu("ra", 14, 30, 272, 28, W.krem, ["A  satuan: cukup angkanya saja"], 9)),
      tambah(idx(SUARA_B2, "b"), ...kartu("rb", 14, 64, 272, 28, W.hijauMuda, ["B  puluhan: angka + kata puluh"], 9)),
      tambah(idx(SUARA_B2, "c"), ...kartu("rc", 14, 98, 272, 28, W.langit, ["C  ratusan: angka + kata ratus"], 9)),
      tambah(idx(SUARA_B2, "d"), ...kartu("rd", 14, 132, 272, 28, W.merahMuda, ["D  ribuan: angka + kata ribu (1.000)"], 9)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Catatan video: urutan huruf", W.merah)),
      tambah(0, ...papanKepala("pc", 30, 30, 240, TEMPAT, 8.4, 18)),
      ...["A", "B", "C", "D"].map((h, i) => tambah("tabel", teks(`pcl${i}`, 60 + i * 60, 66, h, 14, W.merah))),
      tambah("tabel", teks("pcm", 150, 84, "huruf pada tabel buku", 8.4, W.coklat)),
      ...["D", "C", "B", "A"].map((h, i) => tambah("aturan", teks(`pcr${i}`, 60 + i * 60, 118, h, 14, W.hijau))),
      tambah("aturan", teks("pcs", 150, 136, "huruf menurut aturan", 8.4, W.coklat)),
      tambah("Jadi", ...kartu("pcn", 40, 152, 220, 30, W.emas, ["pakai nama tempat, bukan huruf"], 9.4)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Arah membaca")),
      tambah("kiri", panah("ar", 40, 60, 220, 0, W.biru, 3), teks("ar1", 40, 46, "kiri", 9.4, W.coklat), teks("ar2", 260, 46, "kanan", 9.4, W.coklat)),
      tambah("nol", ...kartuAngka("nl", 130, 84, "0", W.krem, 40, 46, 26)),
      tambah("tidak", ...kartu("nt", 40, 146, 220, 34, W.emas, ["angka nol tidak dibaca"], 10)),
    ),
    k(
      SUARA_B5,
      bersih(0),
      tambah(0, judul("Jarak rumah Helen")),
      tambah("Untuk", ...papanKepala("pj", 30, 30, 240, TEMPAT, 8.4, 18)),
      tambah("ribuan", ...papanKolom("pj", 30, 48, 240, 0, "3", 30, 20)),
      tambah("ratusan,", ...papanKolom("pj", 30, 48, 240, 1, "2", 30, 20)),
      tambah("puluhan", ...papanKolom("pj", 30, 48, 240, 2, "8", 30, 20)),
      tambah("satuan", ...papanKolom("pj", 30, 48, 240, 3, "6", 30, 20)),
      tambah("Dibaca:", ...kartu("pjb", 14, 100, 272, 40, W.emas, ["Tiga Ribu Dua Ratus", "Delapan Puluh Enam"], 10)),
      tambah("tiga@2", teks("pjn", 150, 170, "3.286", 20, W.merah)),
    ),
    k(
      SUARA_B6,
      bersih(0),
      tambah(0, judul("Contoh dari buku")),
      tambah("pertama:", ...papanKepala("e1", 50, 30, 200, TEMPAT, 7.6, 14), ...papanIsi("e1", 50, 44, 200, "2634", 22, 15), teks("e1n", 276, 60, "2.634", 9, W.merah)),
      tambah("dibaca", teks("e1b", 150, 84, "dua ribu enam ratus tiga puluh empat", 8.8, W.hijau)),
      tambah("kedua", ...papanKepala("e2", 50, 100, 200, TEMPAT, 7.6, 14), ...papanIsi("e2", 50, 114, 200, "7003", 22, 15), teks("e2n", 276, 130, "7.003", 9, W.merah)),
      tambah("tujuh", teks("e2b", 150, 154, "tujuh ribu tiga", 8.8, W.hijau)),
      tambah("nol", teks("e2c", 150, 172, "nol di ratusan dan puluhan tidak dibaca", 8.4, W.merah)),
    ),
    k(
      SUARA_B7,
      bersih(0),
      tambah(0, judul("Contoh ketiga")),
      tambah(0, ...papanKepala("e3", 50, 50, 200, TEMPAT, 7.6, 14), ...papanIsi("e3", 50, 64, 200, "6570", 22, 15), teks("e3n", 276, 80, "6.570", 9, W.merah)),
      tambah("dibaca", teks("e3b", 150, 114, "enam ribu lima ratus tujuh puluh", 9.4, W.hijau)),
      tambah("Satuannya", teks("e3c", 150, 140, "nol di satuan tidak dibaca", 9.4, W.merah)),
      sorotkan("Satuannya", "e3-d3"),
    ),
  ],
};

/* ------------------------------ 8. Menulis bilangan (Buku Siswa hlm. 7–8) ------------------------------ */
const SUARA_M1 = "Menulis bilangan cacah sampai sepuluh ribu. Indonesia punya gunung berapi terbanyak di dunia, sekitar lima ratus gunung berapi tersebar di seluruh negeri.";
const SUARA_M2 = "Salah satunya Gunung Semeru di Jawa Timur, gunung tertinggi di Pulau Jawa. Puncaknya, Mahameru, setinggi tiga ribu enam ratus tujuh puluh enam meter di atas permukaan laut.";
const SUARA_M3 = "Cara menulisnya: tiga ribu enam ratus tujuh puluh enam. Tiga ribu menjadi angka ribuan, enam ratus menjadi angka ratusan, tujuh puluh menjadi puluhan, dan enam menjadi satuan.";
const SUARA_M4 = "Catatan video: di buku, kalimat contoh itu berakhir dengan kata rupiah, padahal tinggi gunung diukur dalam meter. Satuan yang benar adalah meter.";
const SUARA_M5 = "Di halaman delapan, seorang siswa bertanya cara menulis bilangan tiga ribu dua ratus lima puluh empat. Pak guru menuntun: ribuan tiga, ratusan dua, puluhan lima, satuan empat.";
const SUARA_M6 = "Sehingga bilangan tersebut adalah tiga ribu dua ratus lima puluh empat, ditulis dengan angka tiga, dua, lima, empat berurutan.";

export const ADEGAN_MENULIS: AdeganStory = {
  id: "menulis-bilangan",
  judul: "Menulis bilangan: Gunung Semeru dan percakapan Pak guru",
  sumber: "Buku Siswa hlm. 7–8",
  latar: "#FFF1F2",
  kutipan: [
    "Menulis bilangan cacah sampai 10.000",
    "Indonesia merupakan negara yang memiliki gunung berapi terbanyak di dunia.",
    "Terdapat sekitar 500 gunung berapi yang tersebar di Indonesia.",
    "Gunung Semeru terletak di antara Kabupaten Lumajang, Provinsi Jawa Timur.",
    "Gunung Semeru merupakan gunung tertinggi di Pulau Jawa.",
    "tiga ribu enam ratus tujuh puluh enam rupiah",
    "Perhatikan percakapan berikut dengan cermat.",
    "Bagaimana cara menulis bilangan tiga ribu dua ratus lima puluh empat, Pak?",
    "tentukan angka yang menunjukkan ribuan, yaitu tiga, ditulis 3",
    "tentukan angka yang menunjukkan satuan, yaitu empat, ditulis 4",
    "sehingga bilangan tersebut adalah 3.254",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Menulis bilangan cacah")),
      tambah("sepuluh", ...kartu("g0", 40, 28, 220, 24, W.emas, ["bilangan cacah sampai 10.000"], 9.4)),
      tambah("gunung", emo("g1", 150, 122, "🌋", 50)),
      tambah("sekitar", ...kartu("g2", 50, 144, 200, 30, W.krem, ["sekitar 500 gunung berapi"], 10)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Gunung Semeru, puncak Mahameru")),
      tambah("Semeru", emo("s1", 70, 110, "🌋", 46)),
      tambah("tertinggi", ...kartu("s2", 120, 44, 166, 30, W.hijauMuda, ["tertinggi di Pulau Jawa"], 8.8)),
      tambah("setinggi", ...kartu("s3", 120, 88, 166, 36, W.putih, ["3.676 meter"], 14)),
      tambah("permukaan", teks("s4", 203, 140, "di atas permukaan laut", 8.4, W.coklat)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Dari nama ke angka")),
      tambah(0, ...papanKepala("ms", 30, 30, 240, TEMPAT, 8.4, 18)),
      tambah("Tiga@2", ...papanKolom("ms", 30, 48, 240, 0, "3", 30, 20), teks("ms0", 60, 96, "3.000", 9, W.coklat)),
      tambah("enam@3", ...papanKolom("ms", 30, 48, 240, 1, "6", 30, 20), teks("ms1", 120, 96, "600", 9, W.coklat)),
      tambah("tujuh@2", ...papanKolom("ms", 30, 48, 240, 2, "7", 30, 20), teks("ms2", 180, 96, "70", 9, W.coklat)),
      tambah("enam@4", ...papanKolom("ms", 30, 48, 240, 3, "6", 30, 20), teks("ms3", 240, 96, "6", 9, W.coklat)),
      tambah("satuan", ...kartu("ms4", 80, 120, 140, 34, W.emas, ["ditulis 3.676"], 12)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Catatan video: satuan", W.merah)),
      tambah("kalimat", ...kartu("sa", 14, 36, 272, 40, W.merahMuda, ["kalimat buku: ... tujuh puluh enam rupiah"], 9)),
      tambah("padahal", emo("sb", 150, 112, "🌋", 30)),
      tambah("Satuan", ...kartu("sc", 14, 130, 272, 40, W.hijauMuda, ["tinggi gunung: 3.676 meter (mdpl)"], 9.4)),
    ),
    k(
      SUARA_M5,
      bersih(0),
      tambah(0, judul("Percakapan dengan Pak guru")),
      tambah("siswa", emo("pa", 40, 66, "🧒", 34), ...kartu("pb", 66, 34, 220, 40, W.krem, ["bagaimana cara menulis bilangan", "tiga ribu dua ratus lima puluh empat?"], 8.4)),
      tambah("Pak", ...papanKepala("pq", 30, 90, 240, TEMPAT, 8.4, 18)),
      tambah("ribuan", ...papanKolom("pq", 30, 108, 240, 0, "3", 30, 20)),
      tambah("ratusan", ...papanKolom("pq", 30, 108, 240, 1, "2", 30, 20)),
      tambah("puluhan", ...papanKolom("pq", 30, 108, 240, 2, "5", 30, 20)),
      tambah("satuan", ...papanKolom("pq", 30, 108, 240, 3, "4", 30, 20)),
      tambah("empat@2", teks("pr", 150, 170, "3.254", 20, W.merah)),
    ),
    k(
      SUARA_M6,
      bersih(0),
      tambah(0, judul("Hasil percakapan")),
      tambah("Sehingga", ...kartu("hs", 40, 40, 220, 34, W.hijauMuda, ["tiga ribu dua ratus lima puluh empat"], 9.4)),
      tambah("ditulis", ...[0, 1, 2, 3].map((i) => kartuAngka(`hk${i}`, 66 + i * 46, 92, "3254"[i], W.krem, 38, 46, 24)).flat()),
      tambah("berurutan", ...kartu("hb", 80, 156, 140, 30, W.emas, ["3.254"], 14)),
    ),
  ],
};
