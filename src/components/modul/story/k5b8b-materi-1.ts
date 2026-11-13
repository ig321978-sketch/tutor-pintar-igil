import type { AdeganStory } from "./logika-story";
import { W, apem, emo, kartu, kotak, panah, tabelData, teks } from "./k5b8b-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b8b-bantu";

/** Mini piktogram dua baris (Senin 40 dan Selasa 35) untuk perbandingan dengan tabel. */
function miniPiktogram() {
  const out = [teks("mpa", 172, 66, "Senin", 7.4, W.biru, { anchor: "end" }), teks("mpb", 172, 86, "Selasa", 7.4, W.biru, { anchor: "end" })];
  for (let i = 0; i < 10; i += 1) out.push(...apem(`mpa${i}`, 180 + i * 10, 63, 4, 3.8));
  for (let i = 0; i < 8; i += 1) out.push(...apem(`mpb${i}`, 180 + i * 10, 83, 4, 3.8));
  out.push(...apem("mpbq", 180 + 8 * 10, 83, 3, 3.8));
  return out;
}

/* ------------------------------ 1. Pembuka Sub-Bab B (hlm. 248) ------------------------------ */
export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Pembuka Sub-Bab B: piktogram",
  sumber: "Buku Siswa hlm. 248; Buku Panduan Guru hlm. 357–358",
  latar: "#EEF2FF",
  kutipan: ["B. Piktogram"],
  ketukan: [
    k(
      "Selamat datang di Sub-Bab B tentang piktogram. Setelah belajar ini, kamu dapat membuat piktogram, membaca data dari piktogram, dan menganalisis data dari piktogram.",
      tambah(0, teks("jud", 150, 26, "Sub-Bab B: Piktogram", 13, W.ungu)),
      tambah("membuat", kartu("c1", 14, 56, 84, 56, W.hijauMuda, ["membuat", "piktogram"], 8.6)),
      tambah("membaca", kartu("c2", 108, 56, 84, 56, W.muda, ["membaca data", "dari piktogram"], 8.6)),
      tambah("menganalisis", kartu("c3", 202, 56, 84, 56, W.krem, ["menganalisis", "data piktogram"], 8.6)),
    ),
    k(
      "Pada materi sebelumnya kita membuat tabel frekuensi. Tabel itu hanya berisi nama dan angka, sehingga kurang menarik untuk dilihat.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tabel frekuensi", 13, W.ungu)),
      tambah("tabel", tabelData("tf", 20, 44, ["Hari", "Terjual"], [["Senin", "40"], ["Selasa", "35"]])),
      tambah("angka,", teks("kt", 82, 120, "hanya tulisan dan angka", 9, W.merah)),
    ),
    k(
      "Sekarang bandingkan dengan gambar. Dari data yang sama, piktogram memakai gambar sehingga lebih menarik dan mudah dibaca sekilas.",
      tambah("gambar.", panah("pp", 150, 72, 18, 0, W.hijau, 2.4, { gambar: true })),
      tambah("piktogram", miniPiktogram()),
      tambah("menarik", teks("kp", 224, 120, "lebih menarik", 9, W.hijau)),
    ),
    k(
      "Ayo bermain teka-teki dulu, supaya kita paham bahwa satu gambar bisa mewakili suatu nilai tertentu.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Ayo Bermain Teka-Teki", 13, W.ungu)),
      tambah("teka-teki", emo("pz", 150, 100, "🧩", 44)),
      tambah("satu", kartu("ks", 40, 130, 220, 40, W.krem, ["satu gambar mewakili", "satu nilai tertentu"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 8.2A teka-teki jeruk (hlm. 248) ------------------------------ */
export const ADEGAN_TEKA_SATU: AdeganStory = {
  id: "teka-satu",
  judul: "Eksplorasi 8.2A: menebak bilangan tersembunyi (jeruk)",
  sumber: "Buku Siswa hlm. 248; Buku Panduan Guru hlm. 358",
  latar: "#FFF7ED",
  kutipan: ["Eksplorasi 8.2A", "Menebak bilangan tersembunyi", "mewakili 100"],
  ketukan: [
    k(
      "Eksplorasi 8.2A, bermain teka-teki. Teka-teki pertama menebak bilangan tersembunyi. Petunjuknya, dua jeruk mewakili 100.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 8.2A", 13, W.ungu)),
      tambah("Petunjuknya,", teks("pj", 150, 52, "Petunjuk", 9, W.merah)),
      tambah("dua", emo("j1", 94, 90, "🍊", 30), emo("j2", 136, 90, "🍊", 30)),
      tambah("100.", teks("n100", 210, 88, "mewakili 100", 11, W.biru)),
    ),
    k(
      "Berarti satu jeruk mewakili 50, sebab 100 dibagi 2 sama dengan 50.",
      tambah("satu", teks("p50", 150, 130, "1 jeruk mewakili 50", 11, W.hijau)),
      tambah("sebab", teks("bg", 150, 152, "100 : 2 = 50", 11, W.biru)),
    ),
    k(
      "Pertanyaannya, tiga jeruk mewakili bilangan berapa? Tiga kali 50 sama dengan 150.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Eksplorasi 8.2A", 13, W.ungu)),
      tambah("tiga", emo("t1", 70, 80, "🍊", 30), emo("t2", 112, 80, "🍊", 30), emo("t3", 154, 80, "🍊", 30), teks("tq", 220, 78, "mewakili ?", 11, W.merah)),
      tambah("Tiga", teks("hit", 150, 128, "3 x 50 = 150", 14, W.hijau)),
    ),
    k(
      "Buku Panduan Guru menegaskan jawabannya 150. Kegiatan ini melatih number sense, yaitu kemampuan merasakan nilai suatu gambar.",
      sorotkan("150.", "hit"),
      tambah("number", kartu("ns", 40, 150, 220, 36, W.krem, ["number sense:", "merasakan nilai suatu gambar"], 8.8)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 8.2A teka-teki tomat dan wortel (hlm. 248) ------------------------------ */
export const ADEGAN_TEKA_DUA: AdeganStory = {
  id: "teka-dua",
  judul: "Eksplorasi 8.2A: mewakili bilangan apakah aku (tomat dan wortel)",
  sumber: "Buku Siswa hlm. 248; Buku Panduan Guru hlm. 358",
  latar: "#FEF2F2",
  kutipan: ["Mewakili bilangan apakah aku?", "mewakili bilangan 60", "mewakili bilangan 40", "Coba kalian gambarkan simbol yang mewakili bilangan 28", "Bagaimana jika bilangan 100 dinyatakan dengan simbol di"],
  ketukan: [
    k(
      "Teka-teki kedua. Tiga tomat mewakili bilangan 60, dan lima wortel mewakili bilangan 40.",
      tambah(0, teks("jud", 150, 22, "Teka-teki kedua", 13, W.ungu)),
      tambah("tomat", emo("a1", 34, 62, "🍅", 22), emo("a2", 62, 62, "🍅", 22), emo("a3", 90, 62, "🍅", 22), teks("ta", 66, 88, "3 tomat = 60", 9.4, W.merah)),
      tambah("wortel", emo("b1", 156, 62, "🥕", 22), emo("b2", 182, 62, "🥕", 22), emo("b3", 208, 62, "🥕", 22), emo("b4", 234, 62, "🥕", 22), emo("b5", 260, 62, "🥕", 22), teks("tb", 208, 88, "5 wortel = 40", 9.4, W.hijau)),
    ),
    k(
      "Satu tomat mewakili 20, karena 60 dibagi 3. Satu wortel mewakili 8, karena 40 dibagi 5.",
      tambah("tomat", teks("c1", 66, 114, "60 : 3 = 20", 9.4, W.biru), teks("c2", 66, 134, "1 tomat = 20", 10, W.merah)),
      tambah("wortel", teks("d1", 208, 114, "40 : 5 = 8", 9.4, W.biru), teks("d2", 208, 134, "1 wortel = 8", 10, W.hijau)),
    ),
    k(
      "Pertanyaan a: satu tomat dan dua wortel mewakili bilangan berapa? Dua puluh ditambah enam belas sama dengan 36.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pertanyaan a", 13, W.ungu)),
      tambah("tomat", emo("e1", 70, 70, "🍅", 28), emo("e2", 108, 70, "🥕", 28), emo("e3", 146, 70, "🥕", 28), teks("eq", 220, 68, "mewakili ?", 10, W.merah)),
      tambah("puluh", teks("f1", 150, 110, "1 tomat = 20", 9.4, W.merah), teks("f2", 150, 128, "2 wortel = 16", 9.4, W.hijau)),
      tambah("sama", teks("f3", 150, 156, "20 + 16 = 36", 14, W.biru)),
    ),
    k(
      "Pertanyaan b: gambarkan simbol untuk bilangan 28. Karena 20 ditambah 8 sama dengan 28, kita gambar satu tomat dan satu wortel.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pertanyaan b", 13, W.ungu)),
      tambah("28.", teks("g0", 150, 54, "bilangan 28", 12, W.merah)),
      tambah("tomat", emo("h1", 124, 100, "🍅", 28)),
      tambah("wortel.", emo("h2", 176, 100, "🥕", 28)),
      tambah("Karena", teks("g1", 150, 136, "20 + 8 = 28", 14, W.biru)),
    ),
    k(
      "Pertanyaan c: bagaimana jika bilangan 100 dinyatakan dengan simbol tadi? Jawabannya ada beberapa, dan Buku Panduan Guru meminta kita menggali semua kemungkinan.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pertanyaan c", 13, W.ungu)),
      tambah("100", teks("i0", 150, 60, "bilangan 100 = ?", 13, W.merah)),
      tambah("kemungkinan.", kartu("i1", 40, 90, 220, 40, W.krem, ["ada beberapa jawaban", "gali semua kemungkinan"], 9.4)),
    ),
    k(
      "Kemungkinan pertama, lima tomat. Kemungkinan kedua, tiga tomat dan lima wortel. Kemungkinan ketiga, satu tomat dan sepuluh wortel.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tiga kemungkinan untuk 100", 12, W.ungu)),
      tambah("pertama,", teks("m1", 150, 62, "5 tomat: 5 x 20 = 100", 10.4, W.merah)),
      tambah("kedua,", teks("m2", 150, 100, "3 tomat + 5 wortel: 60 + 40 = 100", 9.6, W.biru)),
      tambah("ketiga,", teks("m3", 150, 138, "1 tomat + 10 wortel: 20 + 80 = 100", 9.6, W.hijau)),
    ),
    k(
      "Kita periksa sendiri dengan mencoba semua kemungkinan, dan memang hanya ada tiga kemungkinan tomat dan wortel utuh yang pas 100.",
      tambah("hanya", kotak("rm", 28, 160, 244, 28, W.krem, W.biru, { rx: 8 }), teks("rt", 150, 178, "hanya tiga kemungkinan yang pas", 10.4, W.biru)),
      sorotkan("pas", "m1", "m2", "m3"),
    ),
  ],
};

/* ------------------------------ 4. Eksplorasi 8.2B kue tradisional (hlm. 249) ------------------------------ */
const kartuKue = (id: string, x: number, y: number, warna: string, nama: string, daerah: string, bahan: string) => [
  kotak(`${id}-k`, x, y, 134, 62, warna, W.biru, { rx: 8 }),
  teks(`${id}-n`, x + 67, y + 20, nama, 9.6),
  teks(`${id}-d`, x + 67, y + 36, daerah, 7.6, W.merah),
  teks(`${id}-b`, x + 67, y + 52, bahan, 7, W.ungu),
];

export const ADEGAN_KUE: AdeganStory = {
  id: "kue-tradisional",
  judul: "Eksplorasi 8.2B: Ayo Menyimak kue tradisional Indonesia",
  sumber: "Buku Siswa hlm. 249; Buku Panduan Guru hlm. 359",
  latar: "#FFFBEB",
  kutipan: ["Eksplorasi 8.2B", "Ayo Menyimak", "Kue Tradisional Indonesia", "Meskipun memakai nama Ambon", "Kue Jawada", "Kue Barongko", "Indonesia kaya akan keragaman budaya"],
  ketukan: [
    k(
      "Eksplorasi 8.2B, Ayo Menyimak. Buku mengenalkan empat kue tradisional Indonesia, supaya kita mencintai budaya daerah.",
      tambah(0, teks("jud", 150, 22, "Eksplorasi 8.2B", 13, W.ungu), teks("sub", 150, 40, "Kue Tradisional Indonesia", 10.4, W.merah)),
      tambah("empat", emo("ik", 150, 100, "🍰", 40)),
      tambah("budaya", teks("bd", 150, 140, "cinta budaya daerah", 11, W.hijau)),
    ),
    k(
      "Bika ambon berasal dari Medan, Sumatra Utara, dengan tekstur seperti sarang semut. Kue apem terbuat dari tepung beras, santan, dan gula, banyak dijumpai di Solo dan Yogyakarta.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Kue Tradisional Indonesia", 12, W.ungu)),
      tambah("Bika", kartuKue("q1", 10, 36, W.krem, "Bika Ambon", "Medan, Sumatra Utara", "tepung tapioka, santan")),
      tambah("apem", kartuKue("q2", 156, 36, W.hijauMuda, "Kue Apem", "Solo dan Yogyakarta", "tepung beras, santan, gula")),
    ),
    k(
      "Kue jawada dari Nusa Tenggara Timur memakai tepung beras dan gula merah, dan disebut juga kue rambut. Kue barongko dari Sulawesi Selatan memakai pisang, santan, gula, dan telur, lalu dikukus.",
      tambah("jawada", kartuKue("q3", 10, 106, W.muda, "Kue Jawada", "Nusa Tenggara Timur", "tepung beras, gula merah")),
      tambah("barongko", kartuKue("q4", 156, 106, W.merahMuda, "Kue Barongko", "Sulawesi Selatan", "pisang, santan, gula, telur")),
    ),
    k(
      "Buku bertanya, apa saja kue tradisional yang terkenal di daerah teman-temanmu, dan terbuat dari bahan apa saja kue itu?",
      tambah("bertanya,", teks("qs", 150, 188, "kue khas daerahmu apa?", 11, W.merah)),
      sorotkan("daerah", "q1-k", "q2-k", "q3-k", "q4-k"),
    ),
  ],
};
