import type { AdeganStory } from "./logika-story";
import { W, emo, kartu, kepalaTabel, pengali, sel, teks } from "./k6b2b-gambar";
import { bersih, k, sorotkan, tambah } from "./k6b2b-bantu";

/* ------------------------------ 6. Latihan 2.2 nomor 1 sampai 4 (hlm. 64 dan 65) ------------------------------ */
const X = 50;
const Y = 34;
const BW = 70;
const BH = 24;
const JUDUL = (nomor: string) => teks("jud", 150, 22, `Latihan 2.2 nomor ${nomor}`, 11, W.ungu);
/** Tabel tiga kolom resep kopi: kolom air, kopi, gula. */
const resep = (id: string, r: number, [a, b, c]: [string, string, string], warna: string = W.putih) => [
  ...sel(`${id}a`, 50, 40 + r * 24, 70, 24, a, warna),
  ...sel(`${id}b`, 120, 40 + r * 24, 70, 24, b, warna),
  ...sel(`${id}c`, 190, 40 + r * 24, 70, 24, c, warna),
];

export const ADEGAN_LATIHAN22: AdeganStory = {
  id: "b2-latihan22",
  judul: "Latihan 2.2: wedang jahe, kopi, dan pena",
  sumber: "Buku Siswa hlm. 64–65",
  latar: "#FFFBEB",
  kutipan: [
    "Berapa buah jahe merah yang diperlukan jika kalian akan membuat wedang jahe sebanyak 8 liter air",
    "Berapa buah lemon yang dibutuhkan untuk membuat wedang jahe, jika hanya memiliki 6 batang serai",
    "Dona ingin membuat kopi di teko yang memuat 1 liter air dengan menggunakan 4 sdt kopi dan 10 sdt gula",
    "Mutia membeli 1 kotak pena seharga Rp36.000,00 yang berisi 15 pena",
  ],
  ketukan: [
    k(
      "Latihan 2.2 nomor 1. Resep wedang jahe untuk 4 liter air memakai 12 jahe merah. Untuk 8 liter air, kita perlu berapa jahe?",
      tambah(0, JUDUL("1")),
      tambah("wedang", emo("wj", 150, 80, "🍵", 36)),
      tambah(8, teks("w4", 70, 130, "4 liter air", 11)),
      tambah(12, teks("w12", 70, 148, "12 jahe merah", 11, W.hijau)),
      tambah(16, teks("w8", 230, 130, "8 liter air", 11), teks("wq", 230, 148, "jahe merah = ?", 11, W.merah)),
    ),
    k(
      "Dari 4 liter menjadi 8 liter dikali 2, maka jahe merah juga dikali 2. Jadi 12 kali 2 sama dengan 24 buah.",
      bersih(0),
      tambah(0, kepalaTabel("t", X, Y, BW, BH, ["Air (liter)", "Jahe merah"])),
      tambah(1, sel("t-r0a", X, Y + BH, BW, BH, "4")),
      tambah(4, sel("t-r1a", X, Y + 2 * BH, BW, BH, "8")),
      tambah(6, pengali("m", 0, 1, X, Y, BW, BH, "× 2")),
      tambah(15, sel("t-r0b", X + BW, Y + BH, BW, BH, "12")),
      tambah(20, sel("t-r1b", X + BW, Y + 2 * BH, BW, BH, "24", "#FEF9C3")),
    ),
    k(
      "Nomor 2. Serai 8 batang dan lemon 4 buah. Rasio paling sederhana dibagi 4, yaitu 2 banding 1.",
      bersih(0),
      tambah(0, JUDUL("2"), kepalaTabel("s", X, Y + 10, BW, BH, ["Serai", "Lemon"])),
      tambah(3, sel("s-r0a", X, Y + 10 + BH, BW, BH, "8")),
      tambah(7, sel("s-r0b", X + BW, Y + 10 + BH, BW, BH, "4")),
      tambah("dibagi", pengali("n", 0, 1, X, Y + 10, BW, BH, "÷ 4")),
      tambah(15, sel("s-r1a", X, Y + 10 + 2 * BH, BW, BH, "2", "#FEF9C3")),
      tambah(17, sel("s-r1b", X + BW, Y + 10 + 2 * BH, BW, BH, "1", "#FEF9C3")),
    ),
    k(
      "Jika hanya ada 6 batang serai, dari 2 ke 6 dikali 3. Lemon 1 dikali 3 sama dengan 3 buah.",
      tambah(3, sel("s-r2a", X, Y + 10 + 3 * BH, BW, BH, "6")),
      tambah(10, pengali("o", 1, 2, X, Y + 10, BW, BH, "× 3")),
      tambah(18, sel("s-r2b", X + BW, Y + 10 + 3 * BH, BW, BH, "3", "#BBF7D0")),
    ),
    k(
      "Nomor 3. Ibu membuat kopi 250 mililiter dengan 1 sendok teh kopi dan 2 sendok teh gula. Dona memakai teko 1 liter, dengan 4 sendok teh kopi dan 10 sendok teh gula.",
      bersih(0),
      tambah(0, JUDUL("3"), resep("h", 0, ["Air", "Kopi", "Gula"], "#DBEAFE")),
      tambah("Ibu", teks("lib", 44, 80, "Ibu", 9, W.biru, { anchor: "end" })),
      tambah(5, ...sel("ia", 50, 64, 70, 24, "250 ml")),
      tambah(8, ...sel("ib", 120, 64, 70, 24, "1 sdt")),
      tambah(13, ...sel("ic", 190, 64, 70, 24, "2 sdt")),
      tambah("Dona", teks("ldn", 44, 104, "Dona", 9, W.merah, { anchor: "end" })),
      tambah(20, ...sel("da", 50, 88, 70, 24, "1 liter")),
      tambah(23, ...sel("db", 120, 88, 70, 24, "4 sdt")),
      tambah(28, ...sel("dc", 190, 88, 70, 24, "10 sdt")),
    ),
    k(
      "Satu liter adalah 4 kali 250 mililiter, jadi resepnya dikali 4: kopi 4 sendok, gula seharusnya 8 sendok. Dona memakai gula 10 sendok, sehingga kopinya terlalu manis.",
      tambah("dikali", teks("x4", 150, 158, "resep × 4", 11, W.merah)),
      tambah("seharusnya", teks("lsh", 44, 128, "Seharusnya", 7, W.hijau, { anchor: "end" }), ...resep("s", 3, ["1 liter", "4 sdt", "8 sdt"], "#BBF7D0").slice(0)),
      sorotkan("terlalu", "dc-k"),
      tambah("manis.", emo("mn", 150, 184, "🍬", 24), teks("mnt", 150, 202, "terlalu manis", 9.5, W.merah)),
    ),
    k(
      "Nomor 4. Mutia membeli 1 kotak pena seharga Rp36.000 berisi 15 pena. Harga 1 pena adalah 36.000 dibagi 15 sama dengan Rp2.400.",
      bersih(0),
      tambah(0, JUDUL("4"), kepalaTabel("p", X, Y + 10, BW, BH, ["Pena", "Harga (Rp)"])),
      tambah(8, sel("p-r0b", X + BW, Y + 10 + BH, BW, BH, "36.000")),
      tambah(10, sel("p-r0a", X, Y + 10 + BH, BW, BH, "15")),
      tambah(13, sel("p-r1a", X, Y + 10 + 2 * BH, BW, BH, "1", "#FEF9C3")),
      tambah("dibagi", pengali("q", 0, 1, X, Y + 10, BW, BH, "÷ 15")),
      tambah(21, sel("p-r1b", X + BW, Y + 10 + 2 * BH, BW, BH, "2.400", "#FEF9C3")),
    ),
    k(
      "Untuk 5 pena, harganya 5 kali Rp2.400, yaitu Rp12.000.",
      tambah(1, sel("p-r2a", X, Y + 10 + 3 * BH, BW, BH, "5")),
      tambah("kali", pengali("r", 1, 2, X + 0, Y + 10, BW, BH, "× 5", W.hijau)),
      tambah("Rp12.000.", sel("p-r2b", X + BW, Y + 10 + 3 * BH, BW, BH, "12.000", "#BBF7D0")),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berefleksi dan penutup (hlm. 65) ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "b2-refleksi",
  judul: "Ayo Berefleksi: senilai dan rasio satuan",
  sumber: "Buku Siswa hlm. 65",
  latar: "#F5F3FF",
  kutipan: ["Tuliskan rasio yang memiliki kesamaan dengan 12 : 28", "Jelaskan pengertian dari rasio satuan dengan bahasa kalian sendiri"],
  ketukan: [
    k(
      "Saatnya berefleksi. Pertama, tuliskan rasio yang senilai dengan 12 banding 28, minimal 4.",
      tambah(0, teks("jud", 150, 28, "Ayo Berefleksi", 13, W.ungu)),
      tambah(8, ...kartu("r0", 80, 70, 140, 40, "#FEF9C3", ["12 : 28"], 16)),
      tambah("minimal", teks("mn", 150, 136, "tulis minimal 4 rasio senilai", 10, W.merah)),
    ),
    k(
      "Bagi kedua dengan 2 menjadi 6 banding 14. Bagi dengan 4 menjadi 3 banding 7.",
      bersih(0),
      tambah(0, kartu("r0", 80, 20, 140, 32, "#FEF9C3", ["12 : 28"], 14)),
      tambah(3, kartu("a", 20, 80, 120, 44, "#DBEAFE", ["÷ 2", "6 : 14"], 11)),
      tambah(10, kartu("b", 160, 80, 120, 44, "#DBEAFE", ["÷ 4", "3 : 7"], 11)),
    ),
    k(
      "Kali dengan 2 menjadi 24 banding 56. Kali dengan 3 menjadi 36 banding 84.",
      tambah(2, kartu("c", 20, 138, 120, 44, "#DCFCE7", ["× 2", "24 : 56"], 11)),
      tambah(8, kartu("d", 160, 138, 120, 44, "#DCFCE7", ["× 3", "36 : 84"], 11)),
    ),
    k(
      "Kedua, jelaskan rasio satuan dengan bahasa sendiri. Rasio satuan adalah rasio paling sederhana yang salah satu besarannya bernilai 1.",
      bersih(0),
      tambah(0, teks("jud2", 150, 28, "Rasio satuan", 13, W.ungu)),
      tambah("paling", ...kartu("rs", 40, 50, 220, 38, "#FEF9C3", ["bentuk paling sederhana", "salah satu besaran = 1"], 10)),
      tambah("bernilai", teks("ct", 150, 130, "contoh: 4 bibit : 1 jam", 12, W.hijau)),
    ),
    k(
      "Itulah kesamaan rasio dan rasio satuan. Kalikan atau bagi kedua besaran dengan bilangan yang sama, dan cari nilai untuk 1 satuan untuk membandingkan.",
      bersih(0),
      tambah("kesamaan", ...kartu("p1", 30, 40, 240, 44, "#DBEAFE", ["kesamaan rasio", "kali atau bagi kedua besaran sama"], 10)),
      tambah("nilai", ...kartu("p2", 30, 110, 240, 44, "#DCFCE7", ["rasio satuan", "cari nilai per 1 untuk membandingkan"], 10)),
      tambah("membandingkan.", teks("pt", 150, 186, "kedua alat ini saling melengkapi", 10, W.ungu)),
    ),
  ],
};
