import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, kartu, kotak, panah, teks } from "./k6b2a-gambar";
import { bersih, k, redamkan, sorotkan, tambah } from "./k6b2a-bantu";

/** Satu deret kotak kecil berisi bilangan, mulai di (x, y). Id kotak: `${id}${i}`. */
const chips = (id: string, x: number, y: number, nilai: string[], warna: string = W.krem): Obj[] =>
  nilai.flatMap((v, i) => [kotak(`${id}${i}`, x + i * 44, y, 38, 26, warna, W.biru, { rx: 6 }), teks(`${id}t${i}`, x + i * 44 + 19, y + 18, v, 11)]);

/** Tiga baris "kiri : kanan" untuk menunjukkan langkah mengubah rasio. */
const rasioBesar = (id: string, x: number, y: number, isi: string, warna: string = W.biru, u = 24): Obj => teks(id, x, y, isi, u, warna);

/* ------------------------------ LA5. GCF Simplify Ratio: konsep ------------------------------ */
export const ADEGAN_LUAR_A_FPB: AdeganStory = {
  id: "luara-fpb",
  judul: "GCF Simplify Ratio: konsep",
  sumber: "Metode luar 3: menyederhanakan rasio dengan FPB",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode ketiga, GCF Simplify Ratio. GCF adalah faktor persekutuan terbesar, dalam buku disebut FPB.",
      tambah(0, teks("jud", 150, 24, "GCF Simplify Ratio", 13, W.ungu)),
      tambah("GCF", kartu("g1", 30, 56, 100, 50, "#FEF9C3", ["GCF"], 16)),
      tambah("terbesar,", kartu("g2", 170, 56, 100, 50, "#DCFCE7", ["FPB"], 16), panah("g3", 134, 80, 32, 0, W.hijau, 3, { gambar: true })),
      tambah("FPB.", teks("g4", 150, 150, "faktor persekutuan terbesar", 11, W.hijau)),
    ),
    k(
      "Rasio paling sederhana diperoleh dengan membagi kedua suku dengan FPB. Contohnya 10 banding 15.",
      bersih(0),
      tambah(0, teks("c0", 150, 28, "bagi kedua suku dengan FPB", 11, W.ungu)),
      tambah("Contohnya", rasioBesar("c1", 150, 100, "10 : 15", W.biru, 40)),
    ),
    k(
      "Faktor dari 10 adalah 1, 2, 5, dan 10. Faktor dari 15 adalah 1, 3, 5, dan 15.",
      bersih(0),
      tambah(0, teks("f0", 150, 26, "faktor dari tiap suku", 12, W.ungu)),
      tambah("Faktor", teks("fa", 40, 78, "10", 14, W.biru), chips("a", 66, 56, ["1", "2", "5", "10"])),
      tambah("Faktor@2", teks("fb", 40, 128, "15", 14, W.biru), chips("b", 66, 106, ["1", "3", "5", "15"])),
    ),
    k(
      "Faktor yang sama adalah 1 dan 5. Yang terbesar adalah 5, jadi FPB dari 10 dan 15 adalah 5.",
      sorotkan("sama", "a0", "a2", "b0", "b2"),
      redamkan("terbesar", "a0", "b0"),
      tambah("FPB", teks("fc", 150, 176, "FPB dari 10 dan 15 adalah 5", 12, W.hijau)),
    ),
    k(
      "Bagi kedua suku dengan 5. Sepuluh menjadi 2, dan lima belas menjadi 3, sehingga rasionya 2 banding 3.",
      bersih(0),
      tambah(0, teks("h0", 150, 28, "bagi dengan 5", 12, W.ungu)),
      tambah("Sepuluh", rasioBesar("h1", 90, 100, "10 : 15", W.biru, 26)),
      tambah("2,", teks("h2", 150, 70, "dibagi 5", 10, W.merah), panah("h3", 135, 108, 30, 0, W.merah, 2.5, { gambar: true })),
      tambah("3,", rasioBesar("h4", 215, 100, "2 : 3", W.hijau, 26)),
    ),
    k(
      "Pemeriksaan: FPB dari 2 dan 3 adalah 1. Jika FPB hasilnya sudah 1, rasio tidak bisa disederhanakan lagi.",
      bersih(0),
      tambah(0, teks("p0", 150, 28, "periksa hasilnya", 12, W.ungu)),
      tambah("Pemeriksaan:", rasioBesar("p1", 150, 84, "2 : 3", W.hijau, 34)),
      tambah("FPB", teks("p2", 150, 120, "FPB dari 2 dan 3 adalah 1", 11, W.biru)),
      tambah("lagi.", emo("p3", 150, 170, "✅", 32)),
    ),
  ],
};

/* ------------------------------ LA6. GCF Simplify Ratio: penerapan ------------------------------ */
export const ADEGAN_LUAR_A_FPB_TERAPAN: AdeganStory = {
  id: "luara-fpb-terapan",
  judul: "GCF Simplify Ratio: penerapan pada kebun dan wahana",
  sumber: "Metode luar 3 diterapkan pada Buku Siswa hlm. 53–55",
  latar: "#ECFCCB",
  ketukan: [
    k(
      "Terapkan pada 4 banding 6 dari kebun sekolah. FPB dari 4 dan 6 adalah 2, sehingga hasilnya 2 banding 3.",
      tambah(0, teks("jud", 150, 24, "kebun sekolah", 12, W.ungu)),
      tambah("banding", rasioBesar("a1", 90, 90, "4 : 6", W.biru, 28)),
      tambah("FPB", teks("a2", 150, 130, "FPB dari 4 dan 6 adalah 2", 11, W.merah)),
      tambah("hasilnya", rasioBesar("a3", 215, 90, "= 2 : 3", W.hijau, 28)),
    ),
    k(
      "Rasio 6 banding 9 juga bisa disederhanakan. FPB dari 6 dan 9 adalah 3, jadi hasilnya 2 banding 3.",
      bersih(0),
      tambah(0, teks("jud2", 150, 24, "contoh lain", 12, W.ungu)),
      tambah("banding", rasioBesar("b1", 90, 90, "6 : 9", W.biru, 28)),
      tambah("FPB", teks("b2", 150, 130, "FPB dari 6 dan 9 adalah 3", 11, W.merah)),
      tambah("hasilnya", rasioBesar("b3", 215, 90, "= 2 : 3", W.hijau, 28)),
    ),
    k(
      "Dari Latihan 2.1, rasio 24 banding 18. FPB dari 24 dan 18 adalah 6, jadi hasilnya 4 banding 3.",
      bersih(0),
      tambah(0, teks("jud3", 150, 24, "Latihan 2.1", 12, W.ungu)),
      tambah("rasio", rasioBesar("c1", 80, 90, "24 : 18", W.biru, 26)),
      tambah("FPB", teks("c2", 150, 130, "FPB dari 24 dan 18 adalah 6", 11, W.merah)),
      tambah("hasilnya", rasioBesar("c3", 220, 90, "= 4 : 3", W.hijau, 26)),
    ),
    k(
      "Rasio 12 banding 8 memakai FPB 4, hasilnya 3 banding 2.",
      bersih(0),
      tambah(0, teks("jud4", 150, 24, "12 banding 8", 12, W.ungu)),
      tambah("Rasio", rasioBesar("d1", 90, 90, "12 : 8", W.biru, 28)),
      tambah("FPB", teks("d2", 150, 130, "FPB dari 12 dan 8 adalah 4", 11, W.merah)),
      tambah("hasilnya", rasioBesar("d3", 215, 90, "= 3 : 2", W.hijau, 28)),
    ),
    k(
      "Hati hati: jika 12 banding 8 hanya dibagi 2, hasilnya 6 banding 4. Ini belum paling sederhana karena FPB dari 6 dan 4 masih 2.",
      bersih(0),
      tambah(0, teks("jud5", 150, 24, "jebakan: pembagi terlalu kecil", 11, W.merah)),
      tambah("jika", rasioBesar("e1", 80, 80, "12 : 8", W.biru, 24)),
      tambah("dibagi", teks("e2", 150, 70, "dibagi 2", 10, W.merah), panah("e3", 125, 84, 50, 0, W.merah, 2.5, { gambar: true })),
      tambah("hasilnya", rasioBesar("e4", 220, 80, "6 : 4", W.merah, 24)),
      tambah("FPB", teks("e5", 150, 130, "FPB dari 6 dan 4 masih 2", 11, W.merah), emo("e6", 150, 170, "⚠", 30)),
    ),
    k(
      "Maka dibagi lagi dengan 2, dan kita sampai pada 3 banding 2 juga. Memakai FPB sekali jalan lebih cepat.",
      bersih(0),
      tambah(0, teks("jud6", 150, 24, "dua kali bagi atau sekali", 11, W.ungu)),
      tambah("dibagi", rasioBesar("f1", 80, 80, "6 : 4", W.biru, 24), teks("f2", 150, 70, "dibagi 2", 10, W.merah), panah("f3", 125, 84, 50, 0, W.merah, 2.5, { gambar: true })),
      tambah("3", rasioBesar("f4", 220, 80, "3 : 2", W.hijau, 24)),
      tambah("Memakai", teks("f5", 150, 140, "sekali jalan: 12 : 8 dibagi 4", 11, W.hijau), emo("f6", 150, 176, "⚡", 30)),
    ),
  ],
};

/* ------------------------------ LA7. Additive vs Multiplicative Comparison: konsep ------------------------------ */
export const ADEGAN_LUAR_A_BANDING: AdeganStory = {
  id: "luara-banding",
  judul: "Additive vs Multiplicative Comparison: konsep",
  sumber: "Metode luar 4: membandingkan dengan selisih atau perkalian",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode keempat, Additive versus Multiplicative Comparison. Ada dua cara membandingkan, dengan selisih atau dengan perkalian.",
      tambah(0, teks("jud", 150, 24, "Additive vs Multiplicative", 12, W.ungu)),
      tambah("selisih", kartu("m1", 20, 50, 120, 70, "#FED7AA", ["selisih", "(tambah, kurang)"], 10)),
      tambah("perkalian.", kartu("m2", 160, 50, 120, 70, "#BBF7D0", ["perkalian", "(kali, bagi)"], 10)),
    ),
    k(
      "Cara selisih bertanya, berapa lebih banyak? Misalnya 5 pena dan 3 pensil, selisihnya 2.",
      bersih(0),
      tambah(0, teks("s0", 150, 26, "cara selisih", 12, W.ungu)),
      tambah("5", teks("s1", 90, 70, "5 pena", 12), teks("s2", 210, 70, "3 pensil", 12)),
      tambah("selisihnya", teks("s3", 150, 130, "5 - 3 = 2", 28, W.merah)),
    ),
    k(
      "Cara perkalian bertanya, berapa kali lipat, atau berapa untuk setiap satu. Cara inilah yang dipakai rasio.",
      bersih(0),
      tambah(0, teks("p0", 150, 26, "cara perkalian", 12, W.ungu)),
      tambah("lipat", teks("p1", 150, 80, "berapa kali lipat?", 16, W.hijau)),
      tambah("setiap", teks("p2", 150, 116, "berapa untuk setiap 1?", 16, W.hijau)),
      tambah("rasio.", emo("p3", 150, 170, "✖", 30)),
    ),
    k(
      "Perhatikan perbedaannya. Rasio 2 banding 3, jika ditambah 2 pada kedua suku, menjadi 4 banding 5, dan rasionya berubah.",
      bersih(0),
      tambah(0, teks("t0", 150, 26, "tambah suku sama", 12, W.ungu)),
      tambah("Rasio", rasioBesar("t1", 75, 90, "2 : 3", W.biru, 26)),
      tambah("ditambah", teks("t2", 150, 72, "+ 2 dan + 2", 10, W.merah), panah("t3", 120, 86, 56, 0, W.merah, 2.5, { gambar: true })),
      tambah("menjadi", rasioBesar("t4", 225, 90, "4 : 5", W.merah, 26)),
      tambah("berubah.", teks("t5", 150, 140, "2 : 3 tidak sama dengan 4 : 5", 11, W.merah)),
    ),
    k(
      "Tetapi jika kedua suku dikali 2, hasilnya 4 banding 6, dan rasionya tetap sama.",
      bersih(0),
      tambah(0, teks("u0", 150, 26, "kali bilangan sama", 12, W.ungu)),
      tambah("Tetapi", rasioBesar("u1", 75, 90, "2 : 3", W.biru, 26)),
      tambah("dikali", teks("u2", 150, 72, "x 2 dan x 2", 10, W.hijau), panah("u3", 120, 86, 56, 0, W.hijau, 2.5, { gambar: true })),
      tambah("hasilnya", rasioBesar("u4", 225, 90, "4 : 6", W.hijau, 26)),
      tambah("sama.", emo("u5", 150, 150, "✅", 30)),
    ),
    k(
      "Periksa dengan silang kali. Untuk 4 banding 5 dan 2 banding 3, empat kali tiga adalah 12, tetapi lima kali dua hanya 10, jadi tidak sama.",
      bersih(0),
      tambah(0, teks("v0", 150, 26, "silang kali", 12, W.ungu)),
      tambah("Untuk", rasioBesar("v1", 80, 76, "4 : 5", W.biru, 22), teks("v2", 150, 76, "dan", 10), rasioBesar("v3", 220, 76, "2 : 3", W.biru, 22)),
      tambah("empat", garis("v4", 66, 86, 140, 22, W.merah, 2, { gambar: true }), teks("v5", 100, 124, "4 x 3 = 12", 11, W.merah)),
      tambah("lima", garis("v6", 232, 86, -140, 22, W.hijau, 2, { gambar: true }), teks("v7", 200, 124, "5 x 2 = 10", 11, W.hijau)),
      tambah("tidak", teks("v8", 150, 160, "12 tidak sama dengan 10", 12, W.merah)),
    ),
    k(
      "Untuk 4 banding 6 dan 2 banding 3, empat kali tiga sama dengan 12, dan enam kali dua juga 12, jadi sama.",
      bersih(0),
      tambah(0, teks("w0", 150, 26, "silang kali", 12, W.ungu)),
      tambah("Untuk", rasioBesar("w1", 80, 76, "4 : 6", W.biru, 22), teks("w2", 150, 76, "dan", 10), rasioBesar("w3", 220, 76, "2 : 3", W.biru, 22)),
      tambah("empat", garis("w4", 66, 86, 140, 22, W.hijau, 2, { gambar: true }), teks("w5", 100, 124, "4 x 3 = 12", 11, W.hijau)),
      tambah("enam", garis("w6", 232, 86, -140, 22, W.hijau, 2, { gambar: true }), teks("w7", 200, 124, "6 x 2 = 12", 11, W.hijau)),
      tambah("jadi", teks("w8", 150, 160, "12 sama dengan 12", 12, W.hijau), emo("w9", 150, 190, "✅", 24)),
    ),
  ],
};

/* ------------------------------ LA8. Additive vs Multiplicative Comparison: penerapan ------------------------------ */
export const ADEGAN_LUAR_A_BANDING_TERAPAN: AdeganStory = {
  id: "luara-banding-terapan",
  judul: "Additive vs Multiplicative Comparison: penerapan pada paket bibit",
  sumber: "Metode luar 4 diterapkan pada Buku Siswa hlm. 50–53",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Terapkan pada Eksplorasi 2.1. Paket A berisi 4 bibit seharga lima puluh ribu rupiah, dan paket B berisi 3 bibit seharga empat puluh ribu rupiah.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 2.1", 12, W.ungu)),
      tambah("Paket", kartu("pa", 20, 50, 120, 70, "#FED7AA", ["Paket A", "4 bibit", "Rp50.000"], 10)),
      tambah("paket@2", kartu("pb", 160, 50, 120, 70, "#BFDBFE", ["Paket B", "3 bibit", "Rp40.000"], 10)),
    ),
    k(
      "Cara selisih memberi dua kabar: paket A lebih banyak 1 bibit, dan lebih mahal sepuluh ribu rupiah. Itu belum menjawab mana yang hemat.",
      tambah("banyak", teks("s1", 80, 150, "+1 bibit", 13, W.hijau)),
      tambah("mahal", teks("s2", 220, 150, "+Rp10.000", 13, W.merah)),
      tambah("hemat.", emo("s3", 150, 186, "❓", 28)),
    ),
    k(
      "Cara perkalian mencari harga untuk setiap satu bibit. Paket A, lima puluh ribu dibagi 4, adalah dua belas ribu lima ratus rupiah.",
      bersih(0),
      tambah(0, teks("a0", 150, 28, "harga untuk setiap 1 bibit", 12, W.ungu)),
      tambah("Paket", teks("a1", 150, 80, "Paket A", 13, W.coklat)),
      tambah("dibagi", teks("a2", 150, 112, "50.000 : 4", 24, W.biru)),
      tambah("adalah", teks("a3", 150, 150, "= Rp12.500 per bibit", 14, W.hijau)),
    ),
    k(
      "Paket B, empat puluh ribu dibagi 3, adalah sekitar tiga belas ribu tiga ratus tiga puluh tiga rupiah.",
      tambah("Paket", teks("b1", 150, 176, "Paket B", 11, W.coklat)),
      tambah("dibagi", teks("b2", 80, 196, "40.000 : 3", 14, W.biru)),
      tambah("sekitar", teks("b3", 220, 196, "= Rp13.333", 14, W.merah)),
    ),
    k(
      "Karena dua belas ribu lima ratus lebih kecil daripada tiga belas ribu tiga ratus tiga puluh tiga, paket A lebih hemat per bibit.",
      bersih(0),
      tambah(0, teks("c0", 150, 28, "bandingkan harga per bibit", 12, W.ungu)),
      tambah("Karena", teks("c1", 80, 90, "12.500", 22, W.hijau), teks("c2", 220, 90, "13.333", 22, W.merah)),
      tambah("kecil", teks("c3", 150, 90, "lebih kecil", 9, W.biru)),
      tambah("hemat", emo("c4", 80, 150, "✅", 30), teks("c5", 80, 176, "paket A hemat", 10, W.hijau)),
    ),
    k(
      "Periksa dengan silang kali tanpa pembagian. Lima puluh ribu kali 3 adalah seratus lima puluh ribu, sedangkan empat puluh ribu kali 4 adalah seratus enam puluh ribu.",
      bersih(0),
      tambah(0, teks("d0", 150, 28, "silang kali", 12, W.ungu)),
      tambah("Lima", teks("d1", 150, 80, "50.000 x 3 = 150.000", 15, W.biru)),
      tambah("sedangkan", teks("d2", 150, 120, "40.000 x 4 = 160.000", 15, W.biru)),
    ),
    k(
      "Karena seratus lima puluh ribu lebih kecil dari seratus enam puluh ribu, paket A memang lebih hemat, sesuai kunci Buku Panduan Guru.",
      sorotkan("seratus", "d1"),
      tambah("kecil", teks("e1", 150, 160, "150.000 lebih kecil dari 160.000", 11, W.hijau)),
      tambah("sesuai", emo("e2", 150, 192, "✅", 24), teks("e3", 200, 190, "cocok dengan kunci", 9, W.hijau, { anchor: "start" })),
    ),
    k(
      "Perkalian juga menjawab perluasan kebun. Dua pucuk merah bersama 3 cemara, maka 14 pucuk adalah 7 kali lipat, jadi 7 kali 3 sama dengan 21 cemara.",
      bersih(0),
      tambah(0, teks("f0", 150, 28, "perluasan kebun", 12, W.ungu)),
      tambah("Dua", teks("f1", 150, 66, "2 pucuk merah : 3 cemara", 12, W.biru)),
      tambah("14", teks("f2", 150, 100, "14 pucuk = 7 x 2", 13, W.merah)),
      tambah("kali@3", teks("f3", 150, 134, "cemara = 7 x 3 = 21", 13, W.hijau)),
      tambah("21", bulat("f4", 150, 176, 14, "#BBF7D0", W.hijau), teks("f5", 150, 181, "21", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ LA9. Ringkasan empat metode ------------------------------ */
export const ADEGAN_LUAR_A_RINGKAS: AdeganStory = {
  id: "luara-ringkas",
  judul: "Ringkasan empat metode luar Subbab A",
  sumber: "Ringkasan metode luar Subbab A",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan empat metode untuk subbab A. Part-to-Part Ratio Language: ucapkan kalimat setiap a ada b.",
      tambah(0, teks("jud", 150, 22, "Ringkasan", 13, W.ungu)),
      tambah("Part-to-Part", kartu("r1", 14, 36, 272, 32, "#FDE68A", ["Part-to-Part: setiap a ada b"], 9.6)),
    ),
    k(
      "Ordered-Ratio Protocol: yang disebut lebih dulu ada di kiri, dan urutan tidak boleh tertukar.",
      tambah("Ordered-Ratio", kartu("r2", 14, 74, 272, 32, "#FBCFE8", ["Ordered-Ratio: a : b bukan b : a"], 9.6)),
    ),
    k(
      "GCF Simplify Ratio: bagi kedua suku dengan FPB sampai FPB hasilnya 1.",
      tambah("GCF", kartu("r3", 14, 112, 272, 32, "#BBF7D0", ["GCF Simplify: bagi dengan FPB, sampai 1"], 9.6)),
    ),
    k(
      "Additive versus Multiplicative Comparison: selisih bisa menyesatkan, rasio dijaga dengan perkalian, dan diperiksa dengan silang kali.",
      tambah("Additive", kartu("r4", 14, 150, 272, 32, "#BFDBFE", ["Additive vs Multiplicative: kali, periksa silang"], 9.6)),
    ),
    k(
      "Metode luar ini melengkapi buku, tidak menggantikannya. Sekarang kita siap menuju subbab B tentang kesamaan rasio.",
      bersih(0),
      tambah(0, teks("z0", 150, 40, "siap ke subbab B", 15, W.ungu)),
      tambah("melengkapi", emo("z1", 90, 110, "📘", 40), teks("z1t", 90, 134, "buku", 10)),
      tambah("menggantikannya.", emo("z2", 210, 110, "🧩", 40), teks("z2t", 210, 134, "metode luar", 10)),
      tambah("kesamaan", teks("z3", 150, 180, "kesamaan rasio", 13, W.hijau)),
    ),
  ],
};
