import type { AdeganStory } from "./logika-story";
import { W, batang, emo, garis, kartu, kotak, teks } from "./k6b2a-gambar";
import { bersih, k, tambah } from "./k6b2a-bantu";

/* ------------------------------ 6. Latihan 1 dan Latihan 2: antrean wahana dan minuman Banyu ------------------------------ */
export const ADEGAN_LATIHAN21: AdeganStory = {
  id: "latihan21-wahana",
  judul: "Latihan 1 dan 2: antrean wahana dan minuman Banyu",
  sumber: "Materi: antrean wahana dan minuman",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Kita berlatih. Di taman hiburan ada antrean di empat wahana. Roller coaster dua puluh empat pengunjung, komidi putar delapan belas, bianglala tiga puluh dua, dan rumah hantu enam.",
      tambah(0, teks("jud", 150, 22, "Latihan 1: antrean wahana", 12, W.ungu)),
      tambah("Roller", batang("rc", 100, 40, 24, 5, "#FCA5A5", "roller coaster"), emo("e1", 40, 186, "🎢", 28)),
      tambah("komidi", batang("km", 100, 62, 18, 5, "#93C5FD", "komidi putar"), emo("e2", 110, 186, "🎠", 28)),
      tambah("bianglala", batang("bi", 100, 84, 32, 5, "#86EFAC", "bianglala"), emo("e3", 190, 186, "🎡", 28)),
      tambah("rumah", batang("rh", 100, 106, 6, 5, "#FDE68A", "rumah hantu"), emo("e4", 260, 186, "👻", 28)),
    ),
    k(
      "Pertanyaan a. Rasio roller coaster terhadap komidi putar adalah dua puluh empat banding delapan belas. FPB-nya enam, jadi hasilnya empat banding tiga.",
      bersih(0),
      tambah(0, teks("qa", 150, 26, "a. roller coaster terhadap komidi putar", 9.4, W.ungu)),
      tambah("banding", teks("a1", 80, 90, "24 : 18", 24, W.biru)),
      tambah("FPB", teks("a2", 150, 140, "FPB dari 24 dan 18 adalah 6", 10, W.merah)),
      tambah("hasilnya", teks("a3", 220, 90, "= 4 : 3", 24, W.hijau)),
    ),
    k(
      "Baca hasilnya dengan kalimat sehari-hari. Setiap empat pengunjung roller coaster ada tiga pengunjung komidi putar.",
      tambah("Setiap", ...balonLatihan("ba", 150, 156)),
      tambah("roller", emo("ea", 40, 202, "🎢", 20)),
      tambah("komidi", emo("eb", 260, 202, "🎠", 20)),
    ),
    k(
      "Pertanyaan b. Rasio bianglala terhadap roller coaster adalah tiga puluh dua banding dua puluh empat. FPB-nya delapan, jadi hasilnya empat banding tiga juga.",
      bersih(0),
      tambah(0, teks("qb", 150, 26, "b. bianglala terhadap roller coaster", 9.4, W.ungu)),
      tambah("banding", teks("b1", 80, 90, "32 : 24", 24, W.biru)),
      tambah("FPB", teks("b2", 150, 140, "FPB dari 32 dan 24 adalah 8", 10, W.merah)),
      tambah("hasilnya", teks("b3", 220, 90, "= 4 : 3", 24, W.hijau)),
    ),
    k(
      "Pertanyaan c. Rasio rumah hantu terhadap komidi putar adalah enam banding delapan belas. FPB-nya enam, jadi hasilnya satu banding tiga.",
      bersih(0),
      tambah(0, teks("qc", 150, 26, "c. rumah hantu terhadap komidi putar", 9.4, W.ungu)),
      tambah("banding", teks("c1", 80, 90, "6 : 18", 24, W.biru)),
      tambah("FPB", teks("c2", 150, 140, "FPB dari 6 dan 18 adalah 6", 10, W.merah)),
      tambah("hasilnya", teks("c3", 220, 90, "= 1 : 3", 24, W.hijau)),
    ),
    k(
      "Pada tiap rasio itu, kita cari FPB lebih dulu, lalu bagi kedua angkanya, dan hasilnya menjadi lebih sederhana. Cara yang sama kita pakai berulang-ulang.",
      bersih(0),
      tambah(0, teks("g0", 150, 26, "cara yang sama untuk tiap rasio", 11, W.ungu)),
      tambah("FPB", ...kartu("g1", 30, 46, 240, 32, "#FEF9C3", ["1. cari FPB kedua angka"], 10)),
      tambah("bagi", ...kartu("g2", 30, 90, 240, 32, "#DBEAFE", ["2. bagi kedua angka dengan FPB"], 10)),
      tambah("hasilnya", ...kartu("g3", 30, 134, 240, 32, "#DCFCE7", ["3. tulis hasilnya"], 10)),
    ),
    k(
      "Pertanyaan d. Sekarang arahnya dibalik, komidi putar terhadap roller coaster. Rasionya delapan belas banding dua puluh empat, atau tiga banding empat.",
      bersih(0),
      tambah(0, teks("qd", 150, 26, "d. komidi putar terhadap roller coaster", 9, W.ungu)),
      tambah("dibalik", emo("d0", 150, 150, "🔄", 30)),
      tambah("banding", teks("d1", 80, 90, "18 : 24", 24, W.biru)),
      tambah("atau", teks("d2", 220, 90, "= 3 : 4", 24, W.hijau)),
      tambah("banding@2", teks("d3", 150, 190, "4 : 3 dan 3 : 4 berbeda arti", 11, W.merah)),
    ),
    k(
      "Hati-hati. Jangan menukar urutan angka. Yang disebut lebih dulu di dalam soal, angkanya ditulis lebih dulu.",
      bersih(0),
      tambah(0, teks("h0", 150, 26, "Hati-hati", 14, W.merah)),
      tambah("Jangan", emo("h1", 150, 86, "⚠", 44)),
      tambah("disebut", teks("h2", 150, 132, "yang disebut dulu", 12, W.biru)),
      tambah("ditulis", teks("h3", 150, 160, "ditulis dulu di kiri", 12, W.hijau)),
    ),
    k(
      "Latihan dua. Banyu menyiapkan enam gelas teh dan lima belas gelas jeruk untuk pesta. Tuliskan rasio gelas teh terhadap gelas jeruk.",
      bersih(0),
      tambah(0, teks("n0", 150, 22, "Latihan 2: minuman Banyu", 12, W.ungu)),
      tambah("Banyu", emo("n1", 40, 150, "🥤", 32)),
      tambah("enam", ...kartu("n2", 76, 40, 200, 40, "#FEF3C7", ["6 gelas teh"], 12), emo("n2e", 262, 64, "🍵", 18)),
      tambah("lima", ...kartu("n3", 76, 92, 200, 40, "#FED7AA", ["15 gelas jeruk"], 12), emo("n3e", 262, 116, "🍊", 18)),
    ),
    k(
      "Rasionya enam banding lima belas. FPB dari enam dan lima belas adalah tiga, jadi hasilnya dua banding lima.",
      bersih(0),
      tambah(0, teks("m0", 150, 26, "teh terhadap jeruk", 11, W.ungu)),
      tambah("banding", teks("m1", 80, 90, "6 : 15", 24, W.biru)),
      tambah("FPB", teks("m2", 150, 140, "FPB dari 6 dan 15 adalah 3", 10, W.merah)),
      tambah("hasilnya", teks("m3", 220, 90, "= 2 : 5", 24, W.hijau)),
    ),
    k(
      "Baca dengan kalimat: setiap dua gelas teh ada lima gelas jeruk. Kalau urutannya dibalik, jeruk terhadap teh, rasionya lima banding dua.",
      bersih(0),
      tambah("setiap", ...balonLatihan2("q", 150, 30)),
      tambah("dibalik,", emo("q9", 150, 110, "🔄", 30)),
      tambah("lima@2", teks("q8", 150, 170, "5 : 2", 30, W.biru)),
    ),
    k(
      "Tantangan. Tulislah rasio dua benda di mejamu, lalu sederhanakan dengan FPB. Jangan lupa menjaga urutan, sebut benda pertama lebih dulu.",
      bersih(0),
      tambah(0, teks("t0", 150, 26, "Tantangan", 14, W.ungu), emo("t0e", 150, 66, "🏆", 34)),
      tambah("Tulislah", ...kartu("t1", 30, 90, 240, 28, "#FEF9C3", ["1. tulis rasio dua benda"], 9.4)),
      tambah("sederhanakan", ...kartu("t2", 30, 124, 240, 28, "#DBEAFE", ["2. sederhanakan dengan FPB"], 9.4)),
      tambah("urutan", ...kartu("t3", 30, 158, 240, 28, "#DCFCE7", ["3. jaga urutan, sebut pertama dulu"], 9.4)),
    ),
    k(
      "Renungan. Mengapa urutan angka dalam rasio itu penting? Coba pikirkan, apa artinya kalau antrean roller coaster dan komidi putar kita tukar.",
      bersih(0),
      tambah(0, teks("r0", 150, 26, "Renungan", 14, W.ungu)),
      tambah("Mengapa", emo("r1", 150, 90, "❓", 44)),
      tambah("roller", teks("r2", 80, 150, "24 : 18", 20, W.biru)),
      tambah("tukar", teks("r3", 220, 150, "18 : 24", 20, W.merah), emo("r4", 150, 188, "🔄", 22)),
    ),
  ],
};

/** Balon kalimat untuk Latihan 1. */
function balonLatihan(id: string, cx: number, y: number) {
  return [kotak(`${id}-k`, cx - 130, y, 260, 40, W.krem, W.biru, { rx: 8 }), teks(`${id}-t0`, cx, y + 16, "setiap 4 pengunjung roller coaster", 9.4), teks(`${id}-t1`, cx, y + 30, "ada 3 pengunjung komidi putar", 9.4)];
}

/** Balon kalimat untuk Latihan 2. */
function balonLatihan2(id: string, cx: number, y: number) {
  return [kotak(`${id}-k`, cx - 110, y, 220, 40, W.krem, W.biru, { rx: 8 }), teks(`${id}-t0`, cx, y + 16, "setiap 2 gelas teh", 10.5), teks(`${id}-t1`, cx, y + 31, "ada 5 gelas jeruk", 10.5)];
}

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
