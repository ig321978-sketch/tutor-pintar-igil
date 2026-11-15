import type { AdeganStory } from "./logika-story";
import { W, balon, emo, kartu, panah, teks } from "./k6b2a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k6b2a-bantu";

/** Deret emoji kecil berjarak sama, mulai di (x, y). */
const baris = (id: string, x: number, y: number, n: number, e: string, jarak = 22, u = 18) => Array.from({ length: n }, (_, i) => emo(`${id}${i}`, x + i * jarak, y, e, u));

/* ------------------------------ LA0. Empat metode luar untuk konsep rasio ------------------------------ */
export const ADEGAN_LUAR_A_PEMBUKA: AdeganStory = {
  id: "luara-pembuka",
  judul: "Empat metode luar untuk konsep rasio",
  sumber: "Metode luar: empat cara tambahan",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk konsep rasio, yaitu cara tambahan agar rasio lebih mudah dipahami dan diperiksa.",
      tambah("metode", emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)),
      tambah("konsep", emo("buku", 220, 100, "📏", 44), teks("l2", 220, 132, "konsep rasio", 9)),
      tambah("diperiksa.", panah("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true })),
    ),
    k(
      "Ada empat metode. Pertama, Part-to-Part Ratio Language, yaitu bahasa rasio antara dua kelompok sejenis, dengan kalimat setiap a ada b.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah("Pertama", kartu("m1", 10, 30, 134, 70, "#FDE68A", ["Part-to-Part", "Ratio Language", "setiap a ada b"], 8.6)),
    ),
    k(
      "Kedua, Ordered-Ratio Protocol, aturan urutan yang menjaga a banding b tidak tertukar dengan b banding a.",
      tambah("Kedua", kartu("m2", 156, 30, 134, 70, "#FBCFE8", ["Ordered-Ratio", "Protocol", "urutan menentukan"], 8.6)),
    ),
    k(
      "Ketiga, GCF Simplify Ratio, menyederhanakan rasio dengan membagi kedua suku dengan faktor persekutuan terbesar.",
      tambah("Ketiga", kartu("m3", 10, 112, 134, 70, "#BBF7D0", ["GCF Simplify", "Ratio", "bagi dengan FPB"], 8.6)),
    ),
    k(
      "Keempat, Equal-Group Picture, menggambar kelompok yang sama besar agar terlihat mengapa FPB dapat menyederhanakan rasio.",
      tambah("Keempat", kartu("m4", 156, 112, 134, 70, "#BFDBFE", ["Equal-Group", "Picture", "gambar kelompok sama"], 8.6)),
    ),
  ],
};

/* ------------------------------ LA1. Part-to-Part Ratio Language: konsep ------------------------------ */
export const ADEGAN_LUAR_A_BAHASA: AdeganStory = {
  id: "luara-bahasa",
  judul: "Part-to-Part Ratio Language: konsep",
  sumber: "Metode luar 1: bahasa setiap a ada b",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode pertama, Part-to-Part Ratio Language, yaitu bahasa rasio untuk dua kelompok yang sejenis. Setiap kelompok kita hitung lebih dulu.",
      tambah(0, teks("jud", 150, 24, "Part-to-Part Ratio Language", 12, W.ungu)),
      tambah("dua", kartu("g1", 24, 50, 110, 80, "#FEF9C3", ["kelompok 1"], 10), kartu("g2", 166, 50, 110, 80, "#DCFCE7", ["kelompok 2"], 10)),
      tambah("sejenis.", teks("sj", 150, 160, "dua kelompok sejenis", 11, W.hijau)),
    ),
    k(
      "Contohnya, di kotak pensil ada tiga pensil dan lima pena. Kedua kelompok itu kita hitung lebih dulu.",
      bersih(0),
      tambah(0, teks("c0", 150, 26, "kotak pensil", 11, W.ungu)),
      tambah("tiga", ...baris("pn", 34, 80, 3, "✏", 34, 26), teks("pnt", 68, 104, "3 pensil", 10)),
      tambah("lima", ...baris("pe", 150, 80, 5, "🖊", 26, 26), teks("pet", 210, 104, "5 pena", 10)),
    ),
    k(
      "Langkah satu, sebutkan kelompok pertama, lalu kelompok kedua. Langkah dua, tulis banyaknya, yaitu tiga banding lima.",
      bersih(0),
      tambah(0, teks("s0", 150, 26, "tiga langkah", 12, W.ungu)),
      tambah("Langkah", kartu("l1", 20, 40, 260, 34, "#FEF9C3", ["1. sebut kelompok 1 lalu 2"], 9.4)),
      tambah("dua@2", kartu("l2", 20, 84, 260, 34, "#DBEAFE", ["2. tulis banyaknya"], 9.4)),
      tambah("tiga", teks("l2n", 150, 150, "3 : 5", 30, W.biru)),
    ),
    k(
      "Langkah tiga, ucapkan kalimatnya: setiap tiga pensil ada lima pena. Kalimat ini menjelaskan arti rasio dengan bahasa sehari-hari.",
      hapus("tiga,", "l2n"),
      tambah("tiga,", kartu("l3", 20, 128, 260, 34, "#DCFCE7", ["3. ucapkan kalimat"], 9.4)),
      tambah("setiap", balon("ba", 150, 166, ["setiap 3 pensil ada 5 pena"], 220, "#FEF9C3", 9)),
    ),
    k(
      "Periksa kalimatmu. Kalau kelompok disebut dengan benar, pembaca bisa menggambar ulang tiga pensil dan lima pena tanpa melihat soalnya.",
      bersih(0),
      tambah("Periksa", teks("p0", 150, 26, "periksa kalimat", 12, W.ungu), emo("pc", 150, 70, "🔍", 36)),
      tambah("menggambar", ...baris("q1", 50, 130, 3, "✏", 26, 22), ...baris("q2", 150, 130, 5, "🖊", 22, 22)),
      tambah("soalnya", teks("p1", 150, 176, "gambar 3 dan 5 cocok dengan kalimat", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ LA2. Part-to-Part Ratio Language: penerapan ------------------------------ */
export const ADEGAN_LUAR_A_BAHASA_TERAPAN: AdeganStory = {
  id: "luara-bahasa-terapan",
  judul: "Part-to-Part Ratio Language: penerapan pada kebun dan wahana",
  sumber: "Metode luar 1 pada kebun dan wahana",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada kebun sekolah. Di kebun ada empat pohon pucuk merah dan enam pohon cemara.",
      tambah(0, teks("jud", 150, 24, "kebun sekolah", 12, W.ungu)),
      tambah("pucuk", ...baris("pm", 30, 90, 4, "🌺", 28, 24), teks("pmt", 74, 112, "4 pucuk merah", 9, W.merah)),
      tambah("cemara.", ...baris("cm", 160, 90, 6, "🌲", 22, 22), teks("cmt", 215, 112, "6 cemara", 9, W.hijau)),
    ),
    k(
      "Langkah satu dan dua: kelompok pertama pucuk merah, kelompok kedua cemara, ditulis empat banding enam.",
      sorotkan("pertama", "pmt"),
      tambah("ditulis", teks("rs", 150, 160, "4 : 6", 30, W.biru)),
    ),
    k(
      "Langkah tiga: setiap empat pucuk merah ada enam cemara. Begitulah cara kita menjelaskan rasio dengan kalimat.",
      tambah("setiap", balon("kl", 150, 168, ["setiap 4 pucuk merah ada 6 cemara"], 250, "#FEF9C3", 9)),
    ),
    k(
      "Kalimat ini bisa disederhanakan. Setiap dua pucuk merah ada tiga cemara, itulah prinsip penanaman di kebun kita.",
      bersih(0),
      tambah(0, teks("sd", 150, 28, "disederhanakan", 12, W.ungu)),
      tambah("Setiap", ...baris("sp", 70, 90, 2, "🌺", 28, 30), teks("spt", 85, 112, "2 pucuk merah", 9, W.merah)),
      tambah("tiga", ...baris("sc", 170, 90, 3, "🌲", 26, 28), teks("sct", 197, 112, "3 cemara", 9, W.hijau)),
      tambah("prinsip", teks("sk", 150, 162, "setiap 2 pucuk merah, 3 cemara", 10, W.biru)),
    ),
    k(
      "Gunakan juga pada antrean wahana. Roller coaster dua puluh empat pengunjung dan komidi putar delapan belas, jadi setiap empat pengunjung roller coaster ada tiga pengunjung komidi putar.",
      bersih(0),
      tambah(0, teks("lj", 150, 26, "antrean wahana", 12, W.ungu)),
      tambah("Roller", kartu("w1", 20, 44, 120, 44, "#FCA5A5", ["roller coaster", "24"], 10), kartu("w2", 160, 44, 120, 44, "#93C5FD", ["komidi putar", "18"], 10)),
      tambah("setiap", teks("w3", 150, 120, "24 : 18  =  4 : 3", 18, W.biru)),
      tambah("komidi@2", balon("w4", 150, 140, ["setiap 4 pengunjung roller coaster", "ada 3 pengunjung komidi putar"], 250, "#FEF9C3", 8.4)),
    ),
    k(
      "Jadi, bahasa antar-kelompok membuat rasio tidak hanya berupa angka, tetapi cerita yang bisa dibayangkan.",
      bersih(0),
      tambah(0, teks("e0", 150, 40, "rasio = cerita", 16, W.ungu)),
      tambah("angka,", teks("e1", 80, 110, "4 : 6", 24, W.biru)),
      tambah("cerita", emo("e2", 150, 110, "➡", 26), teks("e3", 225, 100, "setiap 4 ada 6", 11, W.hijau), emo("e4", 225, 140, "📖", 26)),
    ),
  ],
};

/* ------------------------------ LA3. Ordered-Ratio Protocol: konsep ------------------------------ */
export const ADEGAN_LUAR_A_URUTAN: AdeganStory = {
  id: "luara-urutan",
  judul: "Ordered-Ratio Protocol: konsep",
  sumber: "Metode luar 2: protokol urutan rasio",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode kedua, Ordered-Ratio Protocol. Urutan menentukan makna: yang disebut lebih dulu menjadi angka di sebelah kiri.",
      tambah(0, teks("jud", 150, 24, "Ordered-Ratio Protocol", 12, W.ungu)),
      tambah("Urutan", kartu("u1", 30, 50, 110, 60, "#FEF9C3", ["disebut", "pertama"], 10), kartu("u2", 160, 50, 110, 60, "#DBEAFE", ["disebut", "kedua"], 10)),
      tambah("kiri.", panah("ua", 70, 140, 0, -24, W.merah, 3, { gambar: true }), teks("ut", 70, 162, "angka kiri", 9, W.merah)),
    ),
    k(
      "Kata terhadap adalah tanda. Pensil terhadap pena ditulis tiga banding lima, dengan pensil di kiri dan pena di kanan.",
      bersih(0),
      tambah("terhadap", teks("k0", 150, 30, "pensil terhadap pena", 13, W.ungu)),
      tambah("tiga", teks("k1", 100, 90, "3", 40, W.biru), teks("k1t", 100, 112, "pensil", 10)),
      tambah("banding", teks("k2", 150, 88, ":", 40, W.biru)),
      tambah("lima", teks("k3", 200, 90, "5", 40, W.biru), teks("k3t", 200, 112, "pena", 10)),
    ),
    k(
      "Jika dibalik, pena terhadap pensil ditulis lima banding tiga. Angkanya sama, tetapi maknanya berbeda.",
      bersih(0),
      tambah("dibalik,", teks("t0", 150, 30, "pena terhadap pensil", 13, W.merah)),
      tambah("lima", teks("t1", 100, 90, "5", 40, W.biru), teks("t1t", 100, 112, "pena", 10)),
      tambah("banding", teks("t2", 150, 88, ":", 40, W.biru)),
      tambah("tiga", teks("t3", 200, 90, "3", 40, W.biru), teks("t3t", 200, 112, "pensil", 10)),
      tambah("berbeda.", teks("t4", 150, 160, "3 : 5 tidak sama dengan 5 : 3", 11, W.merah)),
    ),
    k(
      "Protokolnya ada tiga langkah. Tandai kelompok yang disebut pertama, tulis angkanya di kiri, lalu baca ulang dengan kata terhadap untuk memeriksa.",
      bersih(0),
      tambah(0, teks("p0", 150, 26, "protokol tiga langkah", 12, W.ungu)),
      tambah("Tandai", kartu("p1", 20, 40, 260, 34, "#FEF9C3", ["1. tandai kelompok pertama"], 9.4)),
      tambah("tulis", kartu("p2", 20, 84, 260, 34, "#DBEAFE", ["2. tulis angkanya di kiri"], 9.4)),
      tambah("baca", kartu("p3", 20, 128, 260, 34, "#DCFCE7", ["3. baca ulang dengan terhadap"], 9.4)),
    ),
    k(
      "Cek terakhir: tukar kiri dan kanan, lalu tanyakan, apakah kalimatnya masih benar? Kalau maknanya berubah, berarti urutan memang penting.",
      bersih(0),
      tambah(0, teks("c0", 150, 30, "cek akhir", 13, W.ungu)),
      tambah("tukar", emo("c1", 150, 96, "🔄", 40)),
      tambah("benar?", emo("c2", 150, 150, "❓", 30)),
      tambah("penting.", teks("c3", 150, 190, "urutan penting", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ LA4. Ordered-Ratio Protocol: penerapan ------------------------------ */
export const ADEGAN_LUAR_A_URUTAN_TERAPAN: AdeganStory = {
  id: "luara-urutan-terapan",
  judul: "Ordered-Ratio Protocol: penerapan pada kebun dan wahana",
  sumber: "Metode luar 2 pada kebun dan wahana",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Terapkan pada kebun sekolah. Pucuk merah terhadap cemara ditulis empat banding enam, atau dua banding tiga.",
      tambah(0, teks("jud", 150, 24, "kebun sekolah", 12, W.ungu)),
      tambah("Pucuk", teks("a0", 150, 56, "pucuk merah terhadap cemara", 11, W.merah)),
      tambah("empat", teks("a1", 90, 110, "4 : 6", 26, W.biru)),
      tambah("dua", teks("a2", 210, 110, "= 2 : 3", 26, W.hijau)),
    ),
    k(
      "Cemara terhadap pucuk merah ditulis enam banding empat, atau tiga banding dua. Urutannya terbalik, maka angkanya ikut terbalik.",
      bersih(0),
      tambah(0, teks("jud2", 150, 24, "kebun sekolah", 12, W.ungu)),
      tambah("Cemara", teks("b0", 150, 56, "cemara terhadap pucuk merah", 11, W.hijau)),
      tambah("enam", teks("b1", 90, 110, "6 : 4", 26, W.biru)),
      tambah("tiga", teks("b2", 210, 110, "= 3 : 2", 26, W.hijau)),
      tambah("terbalik,", emo("b3", 150, 160, "🔄", 30)),
    ),
    k(
      "Pada antrean wahana, roller coaster terhadap komidi putar adalah dua puluh empat banding delapan belas, atau empat banding tiga.",
      bersih(0),
      tambah(0, teks("jud3", 150, 24, "antrean wahana", 12, W.ungu)),
      tambah("roller", teks("c0", 150, 56, "roller coaster terhadap komidi putar", 10, W.merah)),
      tambah("dua", teks("c1", 90, 110, "24 : 18", 22, W.biru)),
      tambah("empat@2", teks("c2", 210, 110, "= 4 : 3", 22, W.hijau)),
    ),
    k(
      "Komidi putar terhadap roller coaster adalah delapan belas banding dua puluh empat, atau tiga banding empat. Jawabannya berbeda dari yang tadi.",
      bersih(0),
      tambah(0, teks("jud4", 150, 24, "antrean wahana", 12, W.ungu)),
      tambah("Komidi", teks("d0", 150, 56, "komidi putar terhadap roller coaster", 10, W.hijau)),
      tambah("delapan", teks("d1", 90, 110, "18 : 24", 22, W.biru)),
      tambah("tiga", teks("d2", 210, 110, "= 3 : 4", 22, W.hijau)),
      tambah("berbeda", teks("d3", 150, 160, "4 : 3 dan 3 : 4 berbeda", 11, W.merah)),
    ),
    k(
      "Sekarang bianglala terhadap roller coaster, tiga puluh dua banding dua puluh empat. Dengan FPB delapan, hasilnya empat banding tiga.",
      bersih(0),
      tambah(0, teks("e0", 150, 26, "bianglala terhadap roller coaster", 10, W.ungu)),
      tambah("bianglala", kartu("e1", 30, 44, 100, 54, "#FEF9C3", ["bianglala", "32"], 12)),
      tambah("roller", kartu("e2", 170, 44, 100, 54, "#FCA5A5", ["roller coaster", "24"], 12)),
      tambah("FPB", teks("e3", 150, 132, "FPB dari 32 dan 24 adalah 8", 10, W.merah)),
      tambah("hasilnya", teks("e4", 150, 170, "= 4 : 3", 22, W.hijau)),
    ),
    k(
      "Dengan protokol ini angka tidak tertukar. Bianglala di kiri karena disebut pertama, roller coaster di kanan, jadi hasilnya tetap empat banding tiga, bukan tiga banding empat.",
      bersih(0),
      tambah(0, teks("f0", 150, 28, "angka tidak tertukar", 12, W.ungu)),
      tambah("Bianglala", teks("f1", 150, 76, "bianglala : roller coaster", 12, W.biru)),
      tambah("roller", teks("f2", 150, 116, "4 : 3", 26, W.hijau)),
      tambah("bukan", teks("f3", 150, 150, "bukan 3 : 4", 12, W.merah), emo("f4", 150, 184, "✅", 26)),
    ),
  ],
};
