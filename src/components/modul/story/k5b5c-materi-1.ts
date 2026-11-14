import type { AdeganStory } from "./logika-story";
import { EKS, EKS_LAYANG, EKS_SEGITIGA_ATAS, W, dasarEks, emo, hurufEks, judul, kartu, lukis, potong, tabel, teks } from "./k5b5c-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k5b5c-bantu";

/** Letak bangun ABCDE (Eksplorasi 5.3) pada gambar: pojok kiri-atas petak (14, 34), 20 piksel per petak. */
export const OX = 14;
export const OY = 34;
export const S = 20;

/* ------------------------------ 1. Pembuka Subbab C (Panduan Guru hlm. 228) ------------------------------ */
export const ADEGAN_PEMBUKA_C: AdeganStory = {
  id: "pembuka-c",
  judul: "Pembuka Subbab C: pengalaman belajar dan sarana",
  sumber: "Buku Siswa hlm. 158; Panduan Guru hlm. 228",
  latar: "#FFF7ED",
  kutipan: [
    "C. Luas Daerah Bangun Gabungan",
    "peserta didik diberi pengalaman belajar berupa eksplorasi",
    "cara menghitung luas daerah bangun gabungan",
    "melakukan dekomposisi daerah bangun gabungan melalui berbagai",
    "menemukan",
    "ukuran-ukuran yang mungkin tidak langsung diketahui",
    "menentukan",
    "luas daerah seluruhnya",
    "Alat tulis: pulpen, pensil, penggaris, spidol",
    "Kertas berpetak",
    "LCD Projector dan Power Point Presentation Slide",
    "ditempel",
    "di papan tulis",
  ],
  ketukan: [
    k(
      "Selamat datang di Subbab C, Luas Daerah Bangun Gabungan. Di sini kita menghitung luas bangun yang tersusun dari beberapa bangun datar.",
      tambah(0, judul("Subbab C: bangun gabungan")),
      tambah("Gabungan.", lukis("at", 30, 84, 1, [[0, 0], [30, -28], [60, 0]], W.krem, W.oranye), lukis("pp", 30, 84, 1, [[0, 0], [60, 0], [60, 44], [0, 44]], W.langit, W.oranye)),
      tambah("tersusun", teks("pt1", 60, 80, "segitiga", 8, W.biru), teks("pt2", 60, 110, "persegi panjang", 8, W.biru)),
      tambah("beberapa", ...kartu("kg", 120, 70, 160, 44, W.hijauMuda, ["bangun gabungan", "tersusun dari beberapa bangun"], 8.6)),
    ),
    k(
      "Pengalaman belajarnya begini. Kita mendekomposisi bangun gabungan, yaitu memecahnya menjadi bangun-bangun penyusunnya, lewat berbagai cara.",
      bersih(0),
      tambah(0, judul("dekomposisi: memecah bangun")),
      tambah("mendekomposisi", lukis("db", 40, 100, 1, [[0, 0], [90, 0], [90, 50], [0, 50]], W.langit, W.oranye)),
      tambah("memecahnya", lukis("dc", 40, 100, 1, [[0, 0], [90, 0], [90, 50], [0, 50]], "none", W.merah, { putus: true })),
      tambah("berbagai", ...kartu("cr", 160, 80, 120, 62, W.krem, ["bisa dipecah", "dengan berbagai", "cara"], 9)),
    ),
    k(
      "Setelah itu kita mengingat cara menghitung luas tiap bangun penyusun, mencari ukuran yang belum diketahui, lalu menjumlahkan luas seluruhnya.",
      bersih(0),
      tambah(0, judul("tiga langkah besar")),
      tambah("mengingat", ...kartu("l1", 30, 36, 240, 36, W.hijauMuda, ["ingat rumus luas tiap bangun penyusun"], 8.6)),
      tambah("mencari", ...kartu("l2", 30, 84, 240, 36, W.langit, ["cari ukuran yang belum diketahui"], 8.6)),
      tambah("menjumlahkan", ...kartu("l3", 30, 132, 240, 36, W.pink, ["jumlahkan luas seluruhnya"], 8.6)),
    ),
    k(
      "Guru menyiapkan alat tulis, penggaris, kertas berpetak, dan gambar bangun gabungan yang diperbesar. Boleh lewat proyektor, boleh ditempel di papan tulis.",
      bersih(0),
      tambah(0, judul("sarana pembelajaran")),
      tambah("alat", emo("e1", 50, 80, "📝", 30), teks("e1-t", 50, 102, "alat tulis", 8.6)),
      tambah("kertas", emo("e2", 120, 80, "📏", 30), teks("e2-t", 120, 102, "kertas berpetak", 8.6)),
      tambah("diperbesar.", emo("e3", 205, 80, "🖼", 30), teks("e3-t", 205, 102, "gambar diperbesar", 8.6)),
      tambah("proyektor,", emo("e4", 90, 150, "🖥", 28), teks("e4-t", 90, 172, "proyektor", 8.6)),
      tambah("ditempel", emo("e5", 195, 150, "📌", 28), teks("e5-t", 195, 172, "papan tulis", 8.6)),
    ),
  ],
};

/* ------------------------------ 2. Apersepsi: rumus luas bekal (Panduan Guru hlm. 228) ------------------------------ */
const BARIS_RUMUS = [
  ["Bangun", "Rumus luas daerah"],
  ["Persegi panjang", "panjang × lebar"],
  ["Persegi", "sisi × sisi"],
  ["Segitiga", "½ × alas × tinggi"],
  ["Jajargenjang", "alas × tinggi"],
  ["Trapesium", "½ × (atas + bawah) × tinggi"],
  ["Belah ketupat", "½ × diagonal 1 × diagonal 2"],
  ["Layang-layang", "½ × diagonal 1 × diagonal 2"],
];
const TABEL_RUMUS = tabel("rm", 15, 34, [100, 170], BARIS_RUMUS, 15, 8.4);
/** Sel tabel rumus baris a sampai sebelum b. */
const barisRumus = (a: number, b: number) =>
  TABEL_RUMUS.filter((o) => {
    const r = Number(/^rm-[st](\d)/.exec(o.id)?.[1]);
    return r >= a && r < b;
  });

export const ADEGAN_INGAT_RUMUS: AdeganStory = {
  id: "ingat-rumus",
  judul: "Apersepsi: rumus luas bangun datar sebagai bekal",
  sumber: "Panduan Guru hlm. 228; rumus dari Subbab A dan B",
  latar: "#F0F9FF",
  kutipan: [
    "Untuk dapat mempelajari materi pada subbab ini dengan optimal",
    "hendaknya sudah mampu menentukan luas berbagai daerah bangun datar",
    "tanya jawab berkaitan dengan cara menghitung luas berbagai daerah bangun datar",
  ],
  ketukan: [
    k(
      "Supaya belajar subbab ini optimal, kalian hendaknya sudah mampu menghitung luas berbagai bangun datar. Guru mengawali dengan tanya jawab tentang rumus-rumusnya.",
      tambah(0, judul("bekal: rumus luas bangun datar")),
      tambah("menghitung", ...barisRumus(0, 1)),
      tambah("tanya", emo("tj", 150, 120, "💬", 34)),
    ),
    k(
      "Persegi panjang luasnya panjang kali lebar. Persegi luasnya sisi kali sisi. Segitiga luasnya setengah kali alas kali tinggi.",
      hapus(0, "tj"),
      tambah("Persegi", ...barisRumus(1, 2)),
      tambah("Persegi@2", ...barisRumus(2, 3)),
      tambah("Segitiga", ...barisRumus(3, 4)),
    ),
    k(
      "Jajargenjang luasnya alas kali tinggi. Trapesium luasnya setengah kali jumlah sisi sejajar kali tinggi.",
      tambah(0, ...barisRumus(4, 5)),
      tambah("Trapesium", ...barisRumus(5, 6)),
    ),
    k(
      "Belah ketupat dan layang-layang sama, luasnya setengah kali diagonal 1 kali diagonal 2.",
      tambah("Belah", ...barisRumus(6, 7)),
      tambah("layang-layang", ...barisRumus(7, 8)),
    ),
    k(
      "Itulah bekal kita. Sekarang kita lihat bangun yang tidak punya rumus sendiri, karena tersusun dari beberapa bangun.",
      tambah("bekal.", ...kartu("bk", 30, 164, 240, 28, W.hijauMuda, ["bangun gabungan: tidak punya rumus sendiri"], 8.6)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 5.3: bangun gabungan ABCDE (hlm. 158; Panduan Guru hlm. 229-230) ------------------------------ */
const HURUF = hurufEks("h", OX, OY, S);

export const ADEGAN_EKSPLORASI: AdeganStory = {
  id: "eksplorasi-bangun",
  judul: "Eksplorasi 5.3: bangun gabungan dan cara memecahnya",
  sumber: "Buku Siswa hlm. 158; Panduan Guru hlm. 229–230",
  latar: "#F0FDF4",
  kutipan: [
    "Eksplorasi 5.3",
    "Ayo Menemukan Luas Daerah Bangun Gabungan",
    "Kalian sudah belajar menemukan luas daerah berbagai macam",
    "Bagaimana dengan bangun berikut? Bagaimanakah cara mencari",
    "luasnya?",
    "Guru mengajak peserta",
    "mengamati",
    "bangun gabungan",
    "secara berpasangan",
    "mendekomposisi bangun",
    "gabungan ke dalam bangun-bangun penyusunnya",
    "guru memeriksa",
    "peserta didik mencermati dua cara dekomposisi di",
    "buku siswa",
  ],
  ketukan: [
    k(
      "Pemanasan: guru mengajak kalian mengamati bangun gabungan dan memecahnya menjadi bangun penyusun. Inilah Eksplorasi 5.3, Ayo Menemukan Luas Daerah Bangun Gabungan.",
      tambah("mengamati", ...dasarEks("e", OX, OY, S)),
      tambah("Inilah", judul("Eksplorasi 5.3", W.hijau)),
      tambah("Menemukan", ...kartu("kj", 166, 40, 126, 56, W.krem, ["Ayo Menemukan", "Luas Daerah", "Bangun Gabungan"], 8.8)),
    ),
    k(
      "Kalian sudah belajar menemukan luas berbagai bangun datar. Bagaimana dengan bangun berikut? Bagaimanakah cara mencari luasnya?",
      hapus(0, "kj-k", "kj-t0", "kj-t1", "kj-t2"),
      sorotkan("berikut?", "e-b"),
      tambah("mencari", ...kartu("qq", 40, 142, 220, 34, W.merahMuda, ["luas bangun ini = ... ?"], 10)),
    ),
    k(
      "Bangun ini punya lima titik sudut. Kita namai A, B, C, D, dan E.",
      redamkan(0, "e-b"),
      hapus(0, "qq-k", "qq-t0"),
      tambah(8, HURUF[0]),
      tambah(9, HURUF[1]),
      tambah(10, HURUF[2]),
      tambah(11, HURUF[3]),
      tambah(12, HURUF[4]),
    ),
    k(
      "Guru meminta pasangan mencoba memecah bangun ini. Jawaban boleh berbeda, dan guru memeriksa serta meluruskan bila ada yang keliru.",
      tambah("pasangan", emo("ps", 230, 78, "👫", 34), teks("ps-t", 230, 100, "berpasangan", 8.6)),
      tambah("Jawaban", ...kartu("jb", 166, 112, 126, 26, W.krem, ["jawaban boleh berbeda"], 8.2)),
    ),
    k(
      "Bila ada yang bingung, guru mengajak mereka mencermati dua cara di buku, yaitu cara Yohana dan cara Komang.",
      hapus(0, "ps", "ps-t", "jb-k", "jb-t0"),
      tambah("Yohana", ...kartu("cy", 14, 140, 134, 30, W.hijauMuda, ["Cara Yohana"], 9.6)),
      tambah("Komang.", ...kartu("ck", 152, 140, 134, 30, W.langit, ["Cara Komang"], 9.6)),
    ),
  ],
};

/* ------------------------------ 4. Cara Yohana: layang-layang dan segitiga (hlm. 158-159; Panduan Guru hlm. 230-231) ------------------------------ */
export const ADEGAN_CARA_YOHANA: AdeganStory = {
  id: "cara-yohana",
  judul: "Cara Yohana: layang-layang dan segitiga",
  sumber: "Buku Siswa hlm. 158–159; Panduan Guru hlm. 230–231",
  latar: "#EFF6FF",
  kutipan: [
    "Cara Yohana",
    "Aku membagi",
    "bangun tersebut",
    "menjadi 2, yaitu",
    "layang-layang dan",
    "segitiga",
    "Luas daerah layang-layang",
    "Luas daerah segitiga",
    "Luas daerah bangun gabungan",
    "luas daerah layang-layang +",
    "luas daerah segitiga",
    "satuan luas",
    "Dengan memperhatikan",
    "cara Yohana dan cara",
    "Komang, peserta didik",
    "diminta menghitung luas",
  ],
  ketukan: [
    k(
      "Cara Yohana: bangun dibagi menjadi 2, yaitu layang-layang dan segitiga.",
      tambah(0, judul("Cara Yohana", W.hijau)),
      tambah(0, ...dasarEks("e", OX, OY, S)),
      tambah("layang-layang", lukis("yl", OX, OY, S, EKS_LAYANG, W.langit, W.oranye)),
      tambah("segitiga.", lukis("ys", OX, OY, S, EKS_SEGITIGA_ATAS, W.krem, W.oranye)),
      tambah(0, ...HURUF),
      tambah("menjadi", ...kartu("y2", 166, 40, 126, 30, W.hijauMuda, ["dibagi 2 bangun"], 9)),
    ),
    k(
      "Layang-layang punya dua diagonal. Diagonal 1 mendatar dari A ke C panjangnya 5, dan diagonal 2 tegak dari E ke B panjangnya 4.",
      sorotkan(0, "yl"),
      tambah("mendatar", potong("d1", OX, OY, S, EKS.A, EKS.C, W.merah)),
      tambah("5,", ...kartu("kd1", 166, 76, 126, 26, W.pink, ["diagonal 1 = AC = 5"], 8.8)),
      tambah("tegak", potong("d2", OX, OY, S, EKS.E, EKS.B, W.hijau)),
      tambah("4.", ...kartu("kd2", 166, 108, 126, 26, W.pink, ["diagonal 2 = EB = 4"], 8.8)),
    ),
    k(
      "Luas layang-layang adalah setengah kali diagonal 1 kali diagonal 2, yaitu setengah kali 5 kali 4, sama dengan 10 satuan luas.",
      tambah("setengah", teks("fl1", 150, 150, "Luas layang-layang = ½ × diagonal 1 × diagonal 2", 8.8, W.biru)),
      tambah("yaitu", teks("fl2", 150, 168, "= ½ × 5 × 4 = 10 satuan luas", 9.6, W.hijau)),
      tambah("10", teks("n1", 54, 80, "10", 11, W.merah)),
    ),
    k(
      "Segitiga EDC alasnya ED panjangnya 5, dan tingginya 2. Alasnya ada di atas, karena segitiganya terbalik.",
      redamkan(0, "yl"),
      hapus(0, "d1", "d2", "kd1-k", "kd1-t0", "kd2-k", "kd2-t0", "fl1", "fl2"),
      sorotkan(0, "ys"),
      tambah("alasnya", ...kartu("sa", 166, 76, 126, 26, W.krem, ["alas ED = 5"], 8.8)),
      tambah("tingginya", potong("th", OX, OY, S, [5, 0], [5, 2], W.merah), ...kartu("st", 166, 108, 126, 26, W.krem, ["tinggi = 2"], 8.8)),
      tambah("terbalik.", teks("tb", 150, 160, "alasnya di atas karena segitiga terbalik", 8.8, W.merah)),
    ),
    k(
      "Luas segitiga adalah setengah kali alas kali tinggi, yaitu setengah kali 5 kali 2, sama dengan 5 satuan luas.",
      hapus(0, "tb", "sa-k", "sa-t0", "st-k", "st-t0", "th"),
      tambah("setengah", teks("gs1", 150, 150, "Luas segitiga = ½ × alas × tinggi", 8.8, W.biru)),
      tambah("yaitu", teks("gs2", 150, 168, "= ½ × 5 × 2 = 5 satuan luas", 9.6, W.hijau)),
      tambah("5", teks("n2", 96, 48, "5", 11, W.merah)),
    ),
    k(
      "Jadi luas bangun gabungan adalah luas layang-layang ditambah luas segitiga, yaitu 10 ditambah 5, sama dengan 15 satuan luas.",
      redamkan(0, "ys"),
      hapus(0, "gs1", "gs2"),
      tambah("ditambah", ...kartu("hs", 40, 140, 220, 38, W.emas, ["10 + 5 = 15 satuan luas"], 12)),
    ),
  ],
};
