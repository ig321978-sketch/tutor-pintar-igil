import type { AdeganStory } from "./logika-story";
import { W, batang, emo, garis, kartu, kotak, panah, tabel, teks } from "./k6b2a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k6b2a-bantu";

/* ------------------------------ 6. Latihan 2.1 nomor 2 dan 3 (hlm. 54 dan 55) ------------------------------ */
export const ADEGAN_LATIHAN21: AdeganStory = {
  id: "latihan21-wahana",
  judul: "Latihan 2.1 antrean wahana dan minuman Banyu",
  sumber: "Buku Siswa hlm. 54–55 dan Buku Panduan Guru",
  latar: "#FEFCE8",
  kutipan: [
    "Berikut daftar banyak pengunjung yang sedang antre di beberapa wahana di taman hiburan",
    "Roller coaster 24",
    "Komidi putar 18",
    "Tuliskan rasio banyak pengunjung yang antre di wahana roller coaster terhadap komidi putar",
    "rasio pengunjung yang antre di wahana bianglala terhadap roller coaster adalah 4 : 3",
    "maka besaran lain juga dikalikan bilangan yang sama",
    "rasio pengunjung yang antre di wahana rumah hantu terhadap komidi putar adalah 2 : 6",
    "Banyu menyiapkan 6 liter minuman untuk 15 orang teman yang datang di pagi hari",
    "Di siang hari, akan datang teman sebanyak 10 orang, berapa liter minuman yang harus disiapkan",
  ],
  ketukan: [
    k(
      "Latihan 2.1 nomor 2 memuat antrean di taman hiburan. Roller coaster 24 pengunjung, dan komidi putar 18 pengunjung.",
      tambah(0, teks("jud", 150, 22, "Latihan 2.1 nomor 2", 12, W.ungu)),
      tambah("taman", emo("e1", 40, 160, "🎡", 30), emo("e2", 150, 160, "🎢", 30), emo("e3", 260, 160, "🎠", 30)),
      tambah("Roller", batang("rc", 100, 44, 24, 6, "#FCA5A5", "roller coaster")),
      tambah("komidi", batang("km", 100, 70, 18, 6, "#93C5FD", "komidi putar")),
    ),
    k(
      "Pertanyaan a: rasio roller coaster terhadap komidi putar adalah 24 banding 18. Bagi keduanya dengan 6, hasilnya 4 banding 3.",
      tambah("Pertanyaan", teks("qa", 150, 100, "a. roller coaster terhadap komidi putar", 8.6, W.ungu)),
      tambah("banding", teks("a1", 85, 126, "24 : 18", 18, W.biru)),
      tambah("Bagi", teks("a2", 150, 146, "dibagi 6", 9, W.merah)),
      tambah("hasilnya", teks("a3", 215, 126, "= 4 : 3", 18, W.hijau)),
    ),
    k(
      "Pertanyaan b: rasio bianglala terhadap roller coaster adalah 4 banding 3. Roller coaster sebenarnya 24 pengunjung, jadi 3 dikali berapa sama dengan 24?",
      bersih(0),
      tambah(0, teks("jb", 150, 24, "b. bianglala terhadap roller coaster", 10, W.ungu)),
      tambah("bianglala", tabel("tk", 70, 44, 80, [["bianglala", "roller coaster"], ["4", "3"], ["?", "24"]], 8.6)),
      tambah("dikali", teks("te", 150, 136, "3 x ? = 24", 16, W.merah)),
    ),
    k(
      "Tiga kali 8 sama dengan 24. Maka 4 juga dikali 8, hasilnya 32. Bianglala ada 32 pengunjung.",
      ubah("Tiga", { id: "te", isi: "3 x 8 = 24" }),
      tambah("juga", teks("tf", 150, 160, "4 x 8 = 32", 16, W.hijau)),
      ubah("hasilnya", { id: "tk-t20", isi: "32", warna: W.hijau }),
      sorotkan("Bianglala", "tk-t20"),
    ),
    k(
      "Apabila satu besaran dikali bilangan tertentu, besaran lainnya dikali bilangan yang sama.",
      bersih(0),
      tambah(0, teks("rj", 150, 30, "aturan yang sama", 12, W.ungu)),
      tambah("satu", kartu("r1", 30, 50, 100, 40, "#FEF9C3", ["bianglala 4", "roller coaster 3"], 8.6)),
      tambah("tertentu,", panah("r2", 134, 70, 32, 0, W.merah, 3, { gambar: true }), teks("r3", 150, 62, "x 8", 12, W.merah)),
      tambah("sama.", kartu("r4", 170, 50, 100, 40, "#DCFCE7", ["bianglala 32", "roller coaster 24"], 8.6), teks("r5", 150, 130, "kedua suku dikali bilangan sama", 10, W.hijau)),
    ),
    k(
      "Pertanyaan c: rumah hantu terhadap komidi putar adalah 2 banding 6. Komidi putar sebenarnya 18, dan 6 dikali 3 sama dengan 18.",
      bersih(0),
      tambah("Pertanyaan", teks("jc", 150, 24, "c. rumah hantu terhadap komidi putar", 10, W.ungu)),
      tambah("rumah", tabel("th", 70, 44, 80, [["rumah hantu", "komidi putar"], ["2", "6"], ["?", "18"]], 8.6)),
      tambah("dikali", teks("tg", 150, 136, "6 x 3 = 18", 16, W.merah)),
    ),
    k(
      "Jadi 2 juga dikali 3 menjadi 6. Rumah hantu ada 6 pengunjung.",
      tambah("juga", teks("th2", 150, 160, "2 x 3 = 6", 16, W.hijau)),
      ubah("menjadi", { id: "th-t20", isi: "6", warna: W.hijau }),
      sorotkan("Rumah", "th-t20"),
    ),
    k(
      "Nomor 3. Banyu menyiapkan 6 liter minuman untuk 15 teman di pagi hari. Siang hari datang 10 teman, berapa liter minuman yang harus disiapkan?",
      bersih(0),
      tambah(0, teks("n3", 150, 22, "Latihan 2.1 nomor 3", 12, W.ungu)),
      tambah("Banyu", emo("by", 40, 90, "🥤", 32), kartu("pg", 70, 40, 210, 40, "#DBEAFE", ["pagi: 6 liter minuman", "untuk 15 teman"], 8.8)),
      tambah("Siang", kartu("sg", 70, 94, 210, 40, "#FED7AA", ["siang: ? liter minuman", "untuk 10 teman"], 8.8)),
      tambah("berapa", teks("bq", 150, 168, "berapa liter?", 14, W.merah)),
    ),
    k(
      "Rasio minuman terhadap tamu adalah 6 banding 15. Keduanya dibagi 3, menjadi 2 banding 5.",
      bersih(0),
      tambah(0, teks("m0", 150, 30, "minuman terhadap tamu", 11, W.ungu)),
      tambah("banding", teks("m1", 90, 80, "6 : 15", 22, W.biru)),
      tambah("dibagi", teks("m2", 150, 112, "dibagi 3", 11, W.merah), garis("m3", 100, 90, 100, 0, W.merah, 2)),
      tambah("menjadi", teks("m4", 215, 80, "= 2 : 5", 22, W.hijau)),
    ),
    k(
      "Karena 5 dikali 2 sama dengan 10, maka 2 juga dikali 2, hasilnya 4. Banyu menyiapkan 4 liter minuman untuk 10 teman.",
      bersih(0),
      tambah(0, tabel("tm", 70, 36, 80, [["minuman (liter)", "tamu"], ["2", "5"], ["?", "10"]], 8.6)),
      tambah("dikali", teks("m5", 150, 124, "5 x 2 = 10", 16, W.merah)),
      tambah("juga", teks("m6", 150, 148, "2 x 2 = 4", 16, W.hijau)),
      ubah("hasilnya", { id: "tm-t20", isi: "4", warna: W.hijau }),
      tambah("Banyu", emo("m7", 150, 186, "🥤", 28), teks("m8", 190, 184, "4 liter", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Ayo berefleksi dan penutup (hlm. 55) ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi-rasio",
  judul: "Ayo berefleksi dan penutup Subbab A",
  sumber: "Buku Siswa hlm. 55 dan Buku Panduan Guru",
  latar: "#F5F3FF",
  kutipan: [
    "Dari aktivitas yang telah kalian lakukan pada subbab ini",
    "Ada berapa cara yang kalian ketahui untuk menyatakan rasio",
    "Tuliskan contoh rasio dari ukuran atau jumlah benda yang ada di sekitar kalian",
  ],
  ketukan: [
    k(
      "Di akhir subbab A ada refleksi. Pertama, ada berapa cara yang kamu ketahui untuk menyatakan rasio? Ada dua cara.",
      tambah(0, teks("jud", 150, 26, "Ayo Berefleksi", 13, W.ungu)),
      tambah("Pertama", kartu("q1", 30, 44, 240, 40, "#FEF9C3", ["ada berapa cara", "menyatakan rasio?"], 9.4)),
      tambah("dua", emo("dc", 150, 140, "✌", 40), teks("dct", 150, 176, "dua cara", 11, W.hijau)),
    ),
    k(
      "Cara pertama ditulis a banding b dengan titik dua. Cara kedua berupa pecahan a per b. Keduanya dibaca rasio a terhadap b.",
      bersih(0),
      tambah("pertama", kotak("c1", 20, 30, 120, 70, W.putih, W.biru, { rx: 8 }), teks("c1t", 80, 70, "a : b", 24, W.biru), teks("c1h", 80, 90, "cara 1", 8.4, W.ungu)),
      tambah("kedua", kotak("c2", 160, 30, 120, 70, W.putih, W.biru, { rx: 8 }), teks("c2a", 220, 56, "a", 20, W.biru), garis("c2g", 205, 62, 30, 0, W.biru, 2), teks("c2b", 220, 84, "b", 20, W.biru), teks("c2h", 220, 96, "cara 2", 8.4, W.ungu)),
      tambah("Keduanya", teks("c3", 150, 140, "dibaca: rasio a terhadap b", 12, W.hijau)),
    ),
    k(
      "Kedua, tuliskan contoh rasio dari benda di sekitar kita. Misalnya pensil terhadap pena di kotak pensil, 3 banding 5.",
      bersih(0),
      tambah(0, teks("e0", 150, 28, "contoh rasio di sekitar kita", 11, W.ungu)),
      tambah("pensil", emo("e1", 80, 90, "✏", 34), emo("e2", 220, 90, "🖊", 34)),
      tambah("pena", teks("e3", 80, 112, "pensil", 9), teks("e4", 220, 112, "pena", 9)),
      tambah("3", teks("e5", 150, 160, "3 : 5", 26, W.hijau)),
    ),
    k(
      "Contoh lain, siswa yang punya hewan peliharaan terhadap yang tidak, 6 banding 16, atau 3 banding 8.",
      bersih(0),
      tambah(0, teks("h0", 150, 28, "siswa dan hewan peliharaan", 11, W.ungu)),
      tambah("siswa", emo("h1", 80, 90, "🐶", 34), emo("h2", 220, 90, "🙅", 34)),
      tambah("6", teks("h3", 110, 150, "6 : 16", 22, W.biru)),
      tambah("3", teks("h4", 210, 150, "= 3 : 8", 22, W.hijau)),
    ),
    k(
      "Kita sudah belajar membandingkan benda, menulis rasio, menyederhanakan, dan menjaga urutan. Berikutnya, subbab B tentang kesamaan rasio.",
      bersih(0),
      tambah(0, teks("z0", 150, 26, "yang sudah kita pelajari", 11, W.ungu)),
      tambah("membandingkan", emo("z1", 36, 56, "✅", 18), teks("z1t", 60, 54, "membandingkan benda", 9.6, W.biru, { anchor: "start" })),
      tambah("menulis", emo("z2", 36, 86, "✅", 18), teks("z2t", 60, 84, "menulis rasio", 9.6, W.biru, { anchor: "start" })),
      tambah("menyederhanakan,", emo("z3", 36, 116, "✅", 18), teks("z3t", 60, 114, "menyederhanakan", 9.6, W.biru, { anchor: "start" })),
      tambah("urutan.", emo("z4", 36, 146, "✅", 18), teks("z4t", 60, 144, "menjaga urutan a dan b", 9.6, W.biru, { anchor: "start" })),
      tambah("Berikutnya,", kotak("z5", 70, 164, 160, 28, "#DBEAFE", W.biru, { rx: 8 }), teks("z5t", 150, 183, "berikutnya: kesamaan rasio", 9.4, W.biru)),
    ),
  ],
};
