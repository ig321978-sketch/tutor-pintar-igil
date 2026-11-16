import type { AdeganStory } from "./logika-story";
import { W, bagi, botol, emo, gelas, kartu, pecahan, teks } from "./k6b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b1b-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 1. Malosi, botol, dan gelas (cerita pembuka) ------------------------------ */
export const ADEGAN_BOTOL: AdeganStory = {
  id: "botol-agam",
  judul: "Malosi, botol, dan gelas",
  sumber: "Materi: cerita Malosi dan botol",
  latar: "#ECFEFF",
  kutipan: kutipanLokal("k6b1b-materi-1.ts:1"),
  ketukan: [
    k(
      "Perhatikan cerita Malosi. Malosi memiliki sebuah botol air minum. Botol itu berisi air sebanyak 1 liter.",
      bersih(0),
      tambah("Malosi", emo("ag", 70, 120, "👦", 36), teks("agt", 70, 142, "Malosi", 9)),
      tambah("botol", botol("bt", 140, 60, W.air)),
      tambah("liter.", teks("bl", 147, 112, "1 liter", 11, W.biru)),
    ),
    k(
      "Malosi akan membagi air itu rata ke beberapa gelas. Berapa air di setiap gelas?",
      tambah("gelas", gelas("g0", 215, 110), gelas("g1", 238, 110), gelas("g2", 261, 110)),
      tambah("rata", teks("sm", 238, 142, "dibagi sama rata", 8.4, W.hijau)),
      tambah("Berapa", teks("tn", 150, 190, "berapa air di tiap gelas?", 10, W.merah)),
    ),
    k(
      "Ada tiga pertanyaan. Bagian a: 1 liter dibagi rata ke 3 gelas. Bagian b: setengah liter. Bagian c: sepertiga liter.",
      bersih(0),
      tambah("pertanyaan.", teks("jud", 150, 22, "Tiga pertanyaan Malosi", 12, W.ungu)),
      tambah("dibagi", kartu("qa", 14, 36, 272, 40, W.muda, ["a. 1 liter dibagi rata ke 3 gelas"], 9.2)),
      tambah("setengah", kartu("qb", 14, 86, 272, 40, W.hijauMuda, ["b. 1/2 liter dibagi rata ke 3 gelas"], 9.2)),
      tambah("sepertiga", kartu("qc", 14, 136, 272, 40, W.krem, ["c. 1/3 liter dibagi rata ke 3 gelas"], 9.2)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 1.3 bagian a (satu liter ke tiga gelas) ------------------------------ */
const PX = 30;
const PW = 240;
const pusat3 = [70, 150, 230];

export const ADEGAN_EKSPLOR13A: AdeganStory = {
  id: "eks13a",
  judul: "Bagian a: 1 liter ke 3 gelas",
  sumber: "Materi: satu liter ke tiga gelas",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k6b1b-materi-1.ts:2"),
  ketukan: [
    k(
      "Mari kita kerjakan bagian a. Botol Malosi berisi 1 liter air, digambarkan sebagai satu kotak penuh.",
      tambah(0, teks("jud", 150, 24, "Bagian a: 1 liter ke 3 gelas", 12, W.ungu)),
      tambah("Botol", bagi("b", PX, 90, PW, 28, 1, 1)),
      tambah("liter", teks("tl", 150, 78, "1 liter = 1 kotak penuh", 10)),
    ),
    k(
      "Air akan dituangkan ke dalam 3 gelas. Kotak satu liter itu kita bagi menjadi tiga bagian sama besar.",
      tambah("gelas.", teks("tg", 150, 48, "3 gelas", 10, W.hijau)),
      hapus("gelas.", "tl"),
      hapus("bagi", "b0"),
      tambah("bagi", bagi("c", PX, 90, PW, 28, 3, 3)),
    ),
    k(
      "Gelas 1, gelas 2, dan gelas 3 masing-masing mendapat satu bagian.",
      tambah("1", gelas("gl0", pusat3[0] - 8, 140), teks("gt0", pusat3[0], 170, "Gelas 1", 9)),
      sorotkan("1", "c0"),
      tambah("2", gelas("gl1", pusat3[1] - 8, 140), teks("gt1", pusat3[1], 170, "Gelas 2", 9)),
      sorotkan("2", "c1"),
      tambah("3", gelas("gl2", pusat3[2] - 8, 140), teks("gt2", pusat3[2], 170, "Gelas 3", 9)),
      sorotkan("3", "c2"),
    ),
    k(
      "Satu bagian dari tiga bagian itu bernilai satu per tiga. Jadi setiap gelas terisi satu per tiga liter.",
      tambah("bernilai", pecahan("f0", pusat3[0], 66, "1", "3", 11, W.merah)),
      tambah("Jadi", pecahan("f1", pusat3[1], 66, "1", "3", 11, W.merah), pecahan("f2", pusat3[2], 66, "1", "3", 11, W.merah)),
      tambah("liter.", teks("tsi", 150, 196, "tiap gelas: 1/3 liter", 10, W.hijau)),
    ),
    k(
      "Jadi 1 liter dibagi 3 gelas menghasilkan satu per tiga liter. Pembagian berarti mencari nilai satu bagian.",
      ubah("menghasilkan", { id: "tsi", isi: "1 ÷ 3 = 1/3", u: 14, warna: W.ungu }),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 1.3 bagian b dan c (setengah dan sepertiga liter) ------------------------------ */
const pusat6 = [50, 90, 130, 170, 210, 250];
const pusat9 = Array.from({ length: 9 }, (_, i) => PX + (i + 0.5) * (PW / 9));

export const ADEGAN_EKSPLOR13BC: AdeganStory = {
  id: "eks13bc",
  judul: "Bagian b dan c: setengah dan sepertiga liter",
  sumber: "Materi: setengah dan sepertiga liter",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k6b1b-materi-1.ts:3"),
  ketukan: [
    k(
      "Bagian b. Sekarang botol Malosi hanya berisi setengah liter air, lalu dituang rata ke 3 gelas.",
      tambah(0, teks("jud", 150, 24, "Bagian b: setengah liter", 12, W.ungu)),
      tambah("botol", bagi("b", PX, 80, PW, 28, 2, 0)),
      ubah("setengah", { id: "b0", warna: W.air }),
      tambah("setengah", pecahan("fh", 90, 66, "1", "2", 11, W.merah)),
      tambah("gelas.", teks("tg", 150, 150, "dituang ke 3 gelas", 10, W.hijau)),
    ),
    k(
      "Bagi setengah itu menjadi tiga bagian sama besar. Setiap bagian digambar pada kotak satu liter yang sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Bagian b: setengah liter", 12, W.ungu), bagi("d", PX, 80, PW, 28, 6, 3, W.air)),
      ubah("kotak", { id: "d1", warna: W.hijauMuda }, { id: "d2", warna: W.krem }),
      tambah("tiga", pecahan("fh", 90, 66, "1", "2", 11, W.merah)),
    ),
    k(
      "Seluruh kotak kini terbagi menjadi 6 bagian sama besar. Karena itu satu bagian bernilai satu per enam.",
      tambah("terbagi", teks("n6", 150, 140, "6 bagian sama besar", 10, W.hijau)),
      tambah("bernilai", pecahan("s0", pusat6[0], 166, "1", "6", 10, W.merah)),
      sorotkan("bernilai", "d0"),
    ),
    k(
      "Jadi setiap gelas terisi satu per enam liter. Penyebutnya menjadi 6, yaitu 2 kali 3.",
      tambah("gelas", pecahan("s1", pusat6[1], 166, "1", "6", 10, W.merah), pecahan("s2", pusat6[2], 166, "1", "6", 10, W.merah)),
      tambah("Penyebutnya", teks("kl", 150, 200, "2 × 3 = 6", 13, W.ungu)),
    ),
    k(
      "Bagian c. Sekarang botol berisi sepertiga liter, dan dituang rata ke 3 gelas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Bagian c: sepertiga liter", 12, W.ungu), bagi("e", PX, 80, PW, 28, 3, 1, W.air)),
      tambah("sepertiga", pecahan("ft", 70, 66, "1", "3", 11, W.merah)),
      tambah("gelas.", teks("tg", 150, 150, "dituang ke 3 gelas", 10, W.hijau)),
    ),
    k(
      "Sepertiga itu dibagi 3 lagi. Seluruh kotak menjadi 9 bagian sama besar, sehingga satu bagian bernilai satu per sembilan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Bagian c: sepertiga liter", 12, W.ungu), bagi("f", PX, 80, PW, 28, 9, 3, W.air)),
      ubah("lagi", { id: "f1", warna: W.hijauMuda }, { id: "f2", warna: W.krem }),
      tambah("menjadi", teks("n9", 150, 140, "9 bagian sama besar", 10, W.hijau)),
      tambah("bernilai", pecahan("u0", pusat9[0], 166, "1", "9", 9, W.merah)),
      sorotkan("bernilai", "f0"),
    ),
    k(
      "Setiap gelas terisi satu per sembilan liter. Penyebut barunya 3 kali 3, yaitu 9.",
      tambah("gelas", pecahan("u1", pusat9[1], 166, "1", "9", 9, W.merah), pecahan("u2", pusat9[2], 166, "1", "9", 9, W.merah)),
      tambah("kali", teks("kl", 150, 200, "3 × 3 = 9", 13, W.ungu)),
    ),
  ],
};

/* ------------------------------ 4. Kesimpulan pecahan dibagi bilangan asli ------------------------------ */
export const ADEGAN_KESIMPULAN13: AdeganStory = {
  id: "kesimpulan13",
  judul: "Kesimpulan: pecahan dibagi bilangan asli",
  sumber: "Materi: kesimpulan pecahan dibagi asli",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k6b1b-materi-1.ts:4"),
  ketukan: [
    k(
      "Dari bagian a, b, dan c, bagian pecahan bertambah banyak tetapi nilainya makin kecil, tergantung faktor pembaginya.",
      tambah(0, teks("jud", 150, 24, "Hasil bagian a, b, dan c", 12, W.ungu)),
      tambah(2, teks("ra", 150, 70, "a. 1 ÷ 3 = 1/3", 13)),
      tambah(3, teks("rb", 150, 110, "b. 1/2 ÷ 3 = 1/6", 13)),
      tambah(5, teks("rc", 150, 150, "c. 1/3 ÷ 3 = 1/9", 13)),
    ),
    k(
      "Ingat pelajaran sebelumnya: satu dibagi b sama dengan satu per b.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Ingat pelajaran sebelumnya", 12, W.ungu)),
      tambah("satu", teks("r1", 150, 100, "1 ÷ b = 1/b", 20, W.merah)),
      tambah("sama", teks("r2", 150, 150, "1 dibagi b sama rata", 9, W.hijau)),
    ),
    k(
      "Maka setengah dibagi 3 berarti membagi setengah menjadi 3 bagian, sehingga tiap bagian bernilai satu per enam. Ditulis setengah dikali satu per tiga.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Setengah dibagi 3", 12, W.ungu), teks("ek", 150, 100, "1/2 ÷ 3", 16)),
      ubah("bernilai", { id: "ek", isi: "1/2 ÷ 3 = 1/6" }),
      ubah("dikali", { id: "ek", isi: "1/2 ÷ 3 = 1/2 × 1/3 = 1/6", u: 13 }),
    ),
    k(
      "Begitu pula sepertiga dibagi 3. Sepertiga dikali satu per tiga hasilnya satu per sembilan.",
      tambah(0, teks("e2", 150, 150, "1/3 ÷ 3", 16)),
      ubah("dikali", { id: "e2", isi: "1/3 ÷ 3 = 1/3 × 1/3 = 1/9", u: 13 }),
    ),
    k(
      "Rumus umumnya, satu per a dibagi b sama dengan satu per a dikali satu per b.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Rumus umum", 12, W.ungu)),
      tambah("Rumus", kartu("rm", 20, 56, 260, 60, W.krem, ["1/a ÷ b = 1/a × 1/b"], 15)),
      tambah("dikali", teks("rn", 150, 156, "penyebut dikali b", 10, W.merah)),
    ),
    k(
      "Membagi pecahan dengan bilangan asli berarti membagi pecahan itu menjadi beberapa bagian sebanyak bilangan aslinya. Hasilnya menunjukkan nilai setiap bagian.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Kesimpulan", 12, W.ungu)),
      tambah("Membagi", kartu("ks", 16, 40, 268, 60, W.muda, ["pecahan dibagi bilangan asli:", "bagi pecahan itu menjadi", "beberapa bagian sebanyak bilangannya"], 8.8)),
      tambah("Hasilnya", kartu("ks2", 16, 112, 268, 36, W.hijauMuda, ["hasil = nilai setiap bagian"], 9.6)),
      tambah("setiap", emo("ksm", 150, 184, "🥛", 26)),
    ),
  ],
};
