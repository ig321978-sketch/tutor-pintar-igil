import type { AdeganStory } from "./logika-story";
import { W, bagi, emo, kartu, kotak, teks } from "./k6b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b1b-bantu";

/* ------------------------------ 9. Latihan 1.2 nomor 1 dan 2 (hlm. 28) ------------------------------ */
export const ADEGAN_LATIHAN12A: AdeganStory = {
  id: "latihan12a",
  judul: "Latihan 1.2 nomor 1 dan 2: tanah Pak Rudi dan gula Rina",
  sumber: "Buku Siswa hlm. 28; kunci Buku Panduan Guru hlm. 41–42",
  latar: "#FEFCE8",
  kutipan: [
    "Latihan 1.2",
    "Pak Rudi membagi",
    "bagian tanah miliknya kepada 3 orang anaknya secara adil",
    "Gambarkan bagian lahan yang diperoleh setiap anak Pak Rudi",
    "Rina memiliki 6 kg gula pasir",
    "Setiap adonan kue bolu membutuhkan",
    "Berapa banyak kue bolu yang dibuat oleh Rina",
  ],
  ketukan: [
    k(
      "Latihan 1.2 nomor 1. Pak Rudi membagi dua per empat bagian tanahnya kepada 3 orang anak secara adil.",
      tambah(0, teks("jud", 150, 24, "Latihan 1.2 nomor 1", 12, W.ungu)),
      tambah("Rudi", emo("pr", 40, 120, "👨", 32), teks("prt", 40, 140, "Pak Rudi", 8.4)),
      tambah("tanahnya", bagi("tn", 80, 70, 200, 30, 4, 2, W.hijauMuda)),
      tambah("empat", teks("tt", 180, 62, "tanah: 2/4 bagian", 10, W.hijau)),
      tambah("3", teks("t3", 180, 126, "dibagi adil ke 3 anak", 10, W.merah)),
    ),
    k(
      "Dua per empat sama dengan setengah. Setengah itu dibagi 3, sehingga tiap anak mendapat satu bagian dari tiga bagian yang sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "2/4 sama dengan 1/2", 12, W.ungu), bagi("dj", 30, 70, 240, 30, 12, 6, W.hijauMuda)),
      ubah("dibagi", { id: "dj2", warna: W.air }, { id: "dj3", warna: W.air }, { id: "dj4", warna: W.krem }, { id: "dj5", warna: W.krem }),
      tambah("anak", teks("a1", 70, 118, "Anak 1", 9), teks("a2", 110, 118, "Anak 2", 9), teks("a3", 150, 118, "Anak 3", 9)),
    ),
    k(
      "Hitungannya setengah dibagi 3 sama dengan setengah dikali satu per tiga, yaitu satu per enam bagian tanah untuk tiap anak.",
      tambah("Hitungannya", teks("hp", 150, 160, "1/2 ÷ 3 = 1/2 × 1/3 = 1/6", 14, W.ungu)),
      tambah("untuk", teks("hq", 150, 192, "tiap anak: 1/6 bagian tanah", 11, W.hijau)),
    ),
    k(
      "Nomor 2. Rina punya 6 kg gula pasir. Setiap adonan kue bolu butuh tiga per empat kg gula. Berapa kue bolu yang dibuat Rina?",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Latihan 1.2 nomor 2", 12, W.ungu)),
      tambah("Rina", kotak("gk", 30, 56, 110, 70, W.krem, W.coklat), teks("g1", 85, 98, "6 kg gula", 12)),
      tambah("adonan", emo("kb", 215, 90, "🧁", 34), teks("kt", 215, 118, "1 adonan: 3/4 kg", 9)),
      tambah("Berapa", teks("kq", 150, 170, "berapa kue bolu?", 12, W.merah)),
    ),
    k(
      "Cari berapa kali tiga per empat ada di dalam 6: 6 dibagi tiga per empat sama dengan 6 kali empat per tiga, yaitu 24 per 3, yaitu 8.",
      hapus("Cari", "kq"),
      tambah("Cari", teks("h1", 150, 154, "6 ÷ 3/4 = 6 × 4/3 = 24/3 = 8", 14, W.ungu)),
    ),
    k(
      "Rina dapat membuat 8 kue bolu. Periksa: 8 kali tiga per empat sama dengan 24 per 4, yaitu 6 kg. Cocok.",
      tambah("Rina", teks("h2", 150, 174, "8 kue bolu", 12, W.hijau)),
      tambah("Periksa:", teks("h3", 150, 194, "cek: 8 × 3/4 = 24/4 = 6 kg", 11, W.merah)),
      sorotkan("Cocok.", "h3"),
    ),
  ],
};

/* ------------------------------ 10. Latihan 1.2 nomor 3 dan 4 (hlm. 28) ------------------------------ */
const batangX = [20, 62, 104, 146, 188];

export const ADEGAN_LATIHAN12B: AdeganStory = {
  id: "latihan12b",
  judul: "Latihan 1.2 nomor 3 dan 4: cokelat Astri dan soal cerita",
  sumber: "Buku Siswa hlm. 28; kunci Buku Panduan Guru hlm. 42–43",
  latar: "#FFF1F2",
  kutipan: [
    "Astri memiliki 5 batang cokelat",
    "Berapa orang teman Astri yang mendapatkan cokelat tersebut",
    "Apakah Astri masih memiliki sisa cokelat",
    "Buatlah sebuah soal cerita yang menyatakan bentuk pembagian pecahan",
  ],
  ketukan: [
    k(
      "Nomor 3. Astri punya 5 batang cokelat. Tiap teman diberi dua per tiga bagian cokelat. Berapa teman yang mendapat cokelat?",
      tambah(0, teks("jud", 150, 24, "Latihan 1.2 nomor 3", 12, W.ungu)),
      tambah("batang", ...batangX.map((x, i) => kotak(`cb${i}`, x, 56, 36, 22, "#92400E", W.hitam, { rx: 4 }))),
      tambah("cokelat.", teks("c5", 150, 100, "5 batang cokelat", 11)),
      tambah("Tiap", teks("c6", 150, 130, "tiap teman: 2/3 batang", 11, W.merah)),
      tambah("Berapa", teks("c7", 150, 166, "berapa teman?", 12, W.merah)),
    ),
    k(
      "Hitung: 5 dibagi dua per tiga sama dengan 5 kali tiga per dua, yaitu lima belas per dua, atau 7 setengah.",
      hapus("Hitung:", "c7"),
      tambah("Hitung:", teks("c8", 150, 170, "5 ÷ 2/3 = 5 × 3/2 = 15/2 = 7½", 13, W.ungu)),
    ),
    k(
      "Jawaban a: teman tidak boleh dipotong, jadi 7 teman mendapat bagian penuh.",
      tambah("Jawaban", teks("c9", 150, 196, "a. 7 teman", 13, W.hijau)),
      sorotkan("Jawaban", "c9"),
    ),
    k(
      "Jawaban b: 7 teman menghabiskan 7 kali dua per tiga, yaitu empat belas per tiga batang. Sisanya 5 dikurang empat belas per tiga.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Sisa cokelat Astri", 12, W.ungu)),
      tambah("Jawaban", teks("d1", 150, 70, "7 × 2/3 = 14/3 batang", 14)),
      tambah("Sisanya", teks("d2", 150, 112, "5 − 14/3 = 15/3 − 14/3 = 1/3", 14, W.merah)),
    ),
    k(
      "Sisanya satu per tiga batang cokelat. Kunci menulis setengah bagian; itu setengah porsi dua per tiga, jadi sama dengan satu per tiga batang.",
      tambah("Sisanya", teks("d3", 150, 150, "sisa: 1/3 batang", 14, W.hijau)),
      tambah("setengah", teks("d4", 150, 186, "kunci: 1/2 porsi = 1/2 × 2/3 = 1/3", 11, W.ungu)),
    ),
    k(
      "Nomor 4. Buat soal cerita. Pita satu per lima meter dipotong menjadi 4 bagian sama panjang, tiap potong satu per dua puluh meter.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Latihan 1.2 nomor 4", 12, W.ungu)),
      tambah("Pita", bagi("pt", 30, 60, 240, 24, 4, 4, W.merahMuda), teks("p1", 150, 52, "pita 1/5 meter", 10, W.merah)),
      tambah("tiap", teks("p2", 150, 130, "1/5 ÷ 4 = 1/5 × 1/4 = 1/20", 14, W.ungu)),
    ),
    k(
      "Soal kedua: pita 4 meter dipotong tiap satu per lima meter, menghasilkan 20 potong.",
      tambah("Soal", teks("p3", 150, 170, "4 ÷ 1/5 = 4 × 5 = 20 potong", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berefleksi (hlm. 29) ------------------------------ */
export const ADEGAN_REFLEKSI12: AdeganStory = {
  id: "refleksi12",
  judul: "Ayo Berefleksi: dua cara membagi pecahan",
  sumber: "Buku Siswa hlm. 29; Buku Panduan Guru hlm. 43",
  latar: "#F5F3FF",
  kutipan: [
    "Dari aktivitas yang telah kalian lakukan pada subbab ini",
    "Bagaimana cara kalian membagi pecahan dengan bilangan asli",
    "Bagaimana cara kalian membagi bilangan asli dengan pecahan",
    "Ayo Berefleksi",
  ],
  ketukan: [
    k(
      "Ayo berefleksi. Pertanyaan a: bagaimana membagi pecahan dengan bilangan asli? Tentukan bagian pecahannya, lalu bagi sebanyak bilangan aslinya.",
      tambah(0, teks("jud", 150, 24, "Ayo Berefleksi", 12, W.ungu)),
      tambah("Pertanyaan", kartu("qa", 16, 40, 268, 36, W.muda, ["a. pecahan dibagi bilangan asli?"], 9.6)),
      tambah("lalu", teks("ra", 150, 112, "a/b ÷ c = a/b × 1/c", 16, W.ungu)),
    ),
    k(
      "Contohnya dua per tiga dibagi 4 sama dengan dua per tiga dikali satu per 4, yaitu dua per dua belas, atau satu per enam.",
      tambah("Contohnya", teks("rb", 150, 160, "2/3 ÷ 4 = 2/3 × 1/4 = 2/12 = 1/6", 13, W.hijau)),
    ),
    k(
      "Pertanyaan b: bagaimana membagi bilangan asli dengan pecahan? Cari ada berapa bagian pecahan itu di dalam bilangan asli, yaitu kalikan dengan kebalikannya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Ayo Berefleksi", 12, W.ungu)),
      tambah("Pertanyaan", kartu("qb", 16, 40, 268, 36, W.hijauMuda, ["b. bilangan asli dibagi pecahan?"], 9.6)),
      tambah("kalikan", teks("rc", 150, 112, "a ÷ b/c = a/1 × c/b = ac/b", 15, W.ungu)),
    ),
    k(
      "Contohnya 2 dibagi satu per tiga sama dengan 2 kali 3, yaitu 6.",
      tambah("Contohnya", teks("rd", 150, 160, "2 ÷ 1/3 = 2 × 3 = 6", 15, W.hijau)),
    ),
  ],
};
