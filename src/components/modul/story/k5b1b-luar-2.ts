import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, garisBilangan, judul, kartu, panah, posisiBil, teks } from "./k5b1b-gambar";
import { bersih, k, tambah, warnai } from "./k5b1b-bantu";

const X0 = 20;
const PJ = 260;

/* ------------------------------ 6. Benchmark Numbers: konsep ------------------------------ */
const GA = garisBilangan("ga", X0, 118, PJ, 40000, 80000, 10000);
const xa = (n: number) => posisiBil(X0, PJ, 40000, 80000, n);

export const ADEGAN_LUAR_ACUAN: AdeganStory = {
  id: "luar-acuan",
  judul: "Benchmark Numbers: bilangan acuan",
  sumber: "Metode luar: Benchmark Numbers",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Benchmark Numbers, artinya bilangan acuan. Pilih bilangan bulat yang dekat, misalnya enam puluh ribu, lalu lihat apakah bilangan kita ada di bawah atau di atasnya.",
      tambah(0, judul("Benchmark Numbers")),
      tambah(0, ...GA),
      tambah("Pilih", garis("ac", xa(60000), 86, 0, 38, W.merah, 2.6), teks("act", xa(60000), 78, "acuan 60.000", 10, W.merah)),
    ),
    k(
      "Papan a, lima puluh enam ribu lima ratus enam puluh, ada di bawah acuan. Papan b, enam puluh lima ribu tujuh ratus lima puluh, ada di atas acuan. Yang di atas acuan pasti lebih besar.",
      tambah("Papan", bulat("pa", xa(56560), 118, 4.6, W.hijauPita, W.biru), teks("pat", xa(56560), 104, "a", 11, W.hijau), teks("pad", 84, 160, "a di bawah acuan", 9.4, W.hijau)),
      tambah("Papan@2", bulat("pb", xa(65750), 118, 4.6, W.merahPita, W.biru), teks("pbt", xa(65750), 104, "b", 11, W.merah), teks("pbd", 216, 160, "b di atas acuan", 9.4, W.merah)),
      tambah("lebih", teks("pk", 150, 188, "56.560 < 60.000 < 65.750", 12, W.biru)),
    ),
    k(
      "Kelebihannya, cepat sekali untuk dua bilangan yang terpisah jauh, apalagi kalau acuan bulat terletak di antara keduanya.",
      bersih(0),
      tambah(0, judul("Kelebihan")),
      tambah("cepat", ...kartu("p1", 30, 44, 240, 40, W.hijauMuda, ["cepat untuk bilangan berjauhan"], 10)),
      tambah("acuan", ...kartu("p2", 30, 98, 240, 40, W.krem, ["acuan di antara kedua bilangan"], 10)),
      tambah("keduanya.", emo("p3", 150, 172, "✅", 28)),
    ),
    k(
      "Kekurangannya, kalau kedua bilangan ada di sisi yang sama dari acuan, atau sangat dekat, acuan tidak membantu. Kita perlu metode lain.",
      bersih(0),
      tambah(0, judul("Kekurangan")),
      tambah("sisi", ...kartu("w1", 30, 44, 240, 40, W.pink, ["sisi yang sama dari acuan"], 10)),
      tambah("dekat,", ...kartu("w2", 30, 98, 240, 40, W.krem, ["atau sangat berdekatan"], 10)),
      tambah("metode", emo("w3", 150, 172, "🔄", 28)),
    ),
  ],
};

/* ------------------------------ 7. Benchmark Numbers: penerapan (Ayo Berlatih nomor 2) ------------------------------ */
const GC = garisBilangan("gc", X0, 126, PJ, 60000, 80000, 10000);
const xc = (n: number) => posisiBil(X0, PJ, 60000, 80000, n);
const GD = garisBilangan("gd", X0, 126, PJ, 40000, 60000, 10000);
const xd = (n: number) => posisiBil(X0, PJ, 40000, 60000, n);
const GE = garisBilangan("ge", X0, 126, PJ, 80000, 90000, 5000);
const xe = (n: number) => posisiBil(X0, PJ, 80000, 90000, n);

export const ADEGAN_LUAR_ACUAN_TERAPAN: AdeganStory = {
  id: "luar-acuan-terapan",
  judul: "Bilangan acuan: pasangan di Ayo Berlatih nomor 2",
  sumber: "Metode luar: Benchmark Numbers; Buku Siswa hlm. 15",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Pasangan pertama nomor dua: tujuh puluh enam ribu enam ratus tujuh puluh lima dan enam puluh tujuh ribu tujuh ratus enam puluh lima. Pilih acuan tujuh puluh ribu.",
      tambah(0, judul("Pasangan pertama, acuan 70.000")),
      tambah(0, ...kartu("t1", 18, 38, 100, 28, W.langit, ["76.675"], 12), ...kartu("t2", 182, 38, 100, 28, W.krem, ["67.765"], 12)),
      tambah("Pilih", ...GC, garis("ac", xc(70000), 96, 0, 30, W.merah, 2.6), teks("act", xc(70000), 90, "acuan 70.000", 9.4, W.merah)),
    ),
    k(
      "Tujuh puluh enam ribu enam ratus tujuh puluh lima lebih dari tujuh puluh ribu. Enam puluh tujuh ribu tujuh ratus enam puluh lima kurang dari tujuh puluh ribu. Jadi bilangan pertama lebih besar, tandanya lebih dari.",
      tambah("Tujuh", bulat("p1", xc(76675), 126, 4.6, W.hijauPita, W.biru), teks("p1t", xc(76675), 112, "76.675", 8.4, W.hijau)),
      tambah("Enam@3", bulat("p2", xc(67765), 126, 4.6, W.merahPita, W.biru), teks("p2t", xc(67765), 112, "67.765", 8.4, W.merah)),
      tambah("Jadi", teks("pj", 150, 178, "76.675 > 70.000 > 67.765", 12, W.biru)),
    ),
    k(
      "Pasangan ketiga, empat puluh lima ribu delapan ratus enam puluh tujuh dan lima puluh lima ribu delapan ratus tujuh puluh enam, dipisahkan acuan lima puluh ribu. Yang pertama di bawah, yang kedua di atas, jadi yang pertama lebih kecil.",
      bersih(0),
      tambah(0, judul("Pasangan ketiga, acuan 50.000")),
      tambah(0, ...kartu("u1", 18, 38, 100, 28, W.langit, ["45.867"], 12), ...kartu("u2", 182, 38, 100, 28, W.krem, ["55.876"], 12)),
      tambah("Pasangan", ...GD, garis("ad", xd(50000), 96, 0, 30, W.merah, 2.6), teks("adt", xd(50000), 90, "acuan 50.000", 9.4, W.merah)),
      tambah("pertama", bulat("q1", xd(45867), 126, 4.6, W.hijauPita, W.biru), teks("q1t", xd(45867), 112, "45.867", 8.4, W.hijau)),
      tambah("kedua", bulat("q2", xd(55876), 126, 4.6, W.merahPita, W.biru), teks("q2t", xd(55876), 112, "55.876", 8.4, W.merah)),
      tambah("kecil.", teks("qj", 150, 178, "45.867 < 50.000 < 55.876", 12, W.biru)),
    ),
    k(
      "Pasangan kedua beda tipis: dua bilangan itu sama-sama di atas acuan delapan puluh ribu dan berdekatan sekali. Acuan tidak membantu, jadi kita kembali membandingkan angka dari kiri.",
      bersih(0),
      tambah(0, judul("Pasangan kedua: acuan tidak cukup")),
      tambah(0, ...GE),
      tambah("sama-sama", bulat("r1", xe(86567), 126, 4.6, W.hijauPita, W.biru), teks("r1t", xe(86567) - 6, 100, "86.567 dan 86.576", 9.4, W.merah), teks("r1q", xe(86567) + 6, 84, "hampir sama!", 9, W.coklat)),
      tambah("Acuan@2", teks("rj", 150, 176, "acuan tidak membantu", 11, W.merah)),
      tambah("kiri.", teks("rk", 150, 196, "kembali banding dari kiri", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Rounding Estimate Compare: konsep ------------------------------ */
/** Satu baris bilangan asal, panah, dan hasil bulat; mulai (14, y). Id `${id}-a`, `${id}-r`, `${id}-b`. */
const barisBulat = (id: string, y: number, asal: string, hasil: string, catatan: string): Obj[] => [
  ...kartu(`${id}a`, 14, y, 84, 28, W.langit, [asal], 12),
  teks(`${id}r`, 128, y + 12, "→", 16, W.merah),
  teks(`${id}c`, 128, y + 26, catatan, 6.8, W.coklat),
  ...kartu(`${id}b`, 160, y, 84, 28, W.hijauMuda, [hasil], 12),
];

export const ADEGAN_LUAR_BULAT: AdeganStory = {
  id: "luar-bulat",
  judul: "Rounding Estimate Compare: banding lewat pembulatan",
  sumber: "Metode luar: Rounding Estimate Compare",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Metode keempat, Rounding Estimate Compare, artinya banding lewat pembulatan. Bulatkan kedua bilangan ke ribuan terdekat, lalu bandingkan hasil bulatnya sebagai perkiraan cepat.",
      tambah(0, judul("Rounding Estimate Compare")),
      tambah("Bulatkan", ...kartu("o1", 14, 50, 100, 36, W.langit, ["56.475"], 13), ...kartu("o2", 14, 104, 100, 36, W.krem, ["43.217"], 13)),
      tambah("ribuan", teks("o3", 150, 80, "→  ?", 18, W.merah), teks("o4", 150, 134, "→  ?", 18, W.merah)),
      tambah("perkiraan", emo("o5", 150, 186, "🎯", 26)),
    ),
    k(
      "Aturannya: lihat angka ratusan. Kalau lima atau lebih, ribuannya naik satu. Kalau kurang dari lima, ribuannya tetap, dan ratusan, puluhan, serta satuannya menjadi nol.",
      bersih(0),
      tambah(0, judul("Aturan pembulatan ke ribuan")),
      tambah("lima", ...kartu("g1", 24, 44, 252, 44, W.hijauMuda, ["ratusan 5 atau lebih:", "ribuan naik satu"], 9.6)),
      tambah("kurang", ...kartu("g2", 24, 108, 252, 44, W.krem, ["ratusan kurang dari 5:", "ribuan tetap"], 9.6)),
    ),
    k(
      "Pada lima puluh enam ribu empat ratus tujuh puluh lima, ratusannya empat, jadi hasilnya lima puluh enam ribu. Pada empat puluh tiga ribu dua ratus tujuh belas, ratusannya dua, jadi empat puluh tiga ribu.",
      bersih(0),
      tambah(0, judul("Contoh pembulatan")),
      tambah("Pada", ...barisBulat("e1", 48, "56.475", "56.000", "ratusan 4")),
      tambah("Pada@2", ...barisBulat("e2", 104, "43.217", "43.000", "ratusan 2")),
    ),
    k(
      "Kalau hasil bulatnya berbeda, perkiraan itu langsung menjawab: lima puluh enam ribu lebih besar dari empat puluh tiga ribu. Kalau hasil bulatnya sama, kita harus memeriksa lebih teliti dengan metode lain.",
      tambah("berbeda,", teks("em", 150, 166, "56.000 > 43.000", 14, W.hijau)),
      tambah("sama,", teks("en", 150, 190, "hasil bulat sama? periksa lagi", 10, W.merah)),
    ),
    k(
      "Kelebihannya cepat dan mudah dibayangkan. Kekurangannya hanya perkiraan, jadi bilangan yang berdekatan bisa terlihat sama.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya", ...kartu("h1", 30, 44, 240, 40, W.hijauMuda, ["cepat dan mudah dibayangkan"], 10)),
      tambah("Kekurangannya", ...kartu("h2", 30, 98, 240, 40, W.pink, ["hanya perkiraan: berdekatan", "bisa terlihat sama"], 9.6)),
    ),
  ],
};

/* ------------------------------ 9. Rounding Estimate Compare: penerapan (harga papan dakon dan Ayo Berlatih nomor 1) ------------------------------ */
export const ADEGAN_LUAR_BULAT_TERAPAN: AdeganStory = {
  id: "luar-bulat-terapan",
  judul: "Pembulatan: harga papan dakon dan Ayo Berlatih nomor 1",
  sumber: "Metode luar: Rounding Estimate Compare; Buku Siswa hlm. 10 dan 14",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Terapkan pada harga papan dakon. Lima puluh enam ribu lima ratus enam puluh: ratusannya lima, jadi dibulatkan ke lima puluh tujuh ribu. Papan c, lima puluh tujuh ribu, tetap lima puluh tujuh ribu.",
      tambah(0, judul("Bulatkan ke ribuan terdekat")),
      tambah("Lima", ...barisBulat("a", 44, "56.560", "57.000", "ratusan 5")),
      tambah("Papan@2", ...barisBulat("c", 92, "57.000", "57.000", "ratusan 0")),
    ),
    k(
      "Hasil bulat papan a dan papan c sama, jadi perkiraan belum cukup. Kita periksa lebih teliti dengan banding dari kiri: ribuan enam lebih kecil dari tujuh, jadi papan a lebih murah.",
      warnai("sama,", W.emas, "ab-k", "cb-k"),
      tambah("periksa", teks("tj", 150, 156, "6 < 7, jadi 56.560 < 57.000", 11, W.hijau)),
      tambah("murah.", teks("tm", 150, 180, "papan a lebih murah", 10.4, W.coklat)),
    ),
    k(
      "Papan b, enam puluh lima ribu tujuh ratus lima puluh, menjadi enam puluh enam ribu. Papan d, tujuh puluh lima ribu tiga ratus enam puluh, menjadi tujuh puluh lima ribu. Keduanya terpisah jelas dari a dan c.",
      bersih(0),
      tambah(0, judul("Papan b dan papan d")),
      tambah("Papan", ...barisBulat("b", 44, "65.750", "66.000", "ratusan 7")),
      tambah("Papan@2", ...barisBulat("d", 100, "75.360", "75.000", "ratusan 3")),
      tambah("terpisah", teks("tz", 150, 168, "57.000 < 66.000 < 75.000", 12, W.biru)),
    ),
    k(
      "Nomor satu bagian c juga bisa: sembilan puluh tujuh ribu tujuh ratus enam puluh delapan menjadi sembilan puluh delapan ribu, dan delapan puluh sembilan ribu delapan ratus tujuh puluh enam menjadi sembilan puluh ribu. Jadi yang pertama lebih besar.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih nomor 1 bagian c")),
      tambah("Nomor", ...barisBulat("n", 44, "97.768", "98.000", "ratusan 7")),
      tambah("delapan@3", ...barisBulat("m", 100, "89.876", "90.000", "ratusan 8")),
      tambah("Jadi", teks("nj", 150, 168, "98.000 > 90.000, jadi 97.768 > 89.876", 10.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan empat metode ------------------------------ */
const URUT = [
  { nama: "a", harga: "56.560" },
  { nama: "c", harga: "57.000" },
  { nama: "b", harga: "65.750" },
  { nama: "d", harga: "75.360" },
];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dan urutan papan dakon",
  sumber: "Ringkasan metode luar; Buku Siswa hlm. 13",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasannya. Leftmost Compare: banding angka dari kiri sampai ketemu beda pertama. Number Line Order: letakkan bilangan di garis, makin ke kanan makin besar.",
      tambah(0, judul("Ringkasan")),
      tambah("Leftmost", ...kartu("s1", 14, 36, 272, 50, W.hijauMuda, ["Leftmost Compare", "banding dari kiri, beda pertama"], 9.4)),
      tambah("Number", ...kartu("s2", 14, 100, 272, 50, W.langit, ["Number Line Order", "di garis, kanan lebih besar"], 9.4)),
    ),
    k(
      "Benchmark Numbers: bandingkan dengan bilangan acuan bulat. Rounding Estimate Compare: bulatkan ke ribuan untuk perkiraan, lalu periksa bila hasil bulatnya sama.",
      bersih(0),
      tambah(0, judul("Ringkasan")),
      tambah("Benchmark", ...kartu("s3", 14, 36, 272, 50, W.krem, ["Benchmark Numbers", "bandingkan dengan acuan bulat"], 9.4)),
      tambah("Rounding", ...kartu("s4", 14, 100, 272, 50, W.pink, ["Rounding Estimate Compare", "bulatkan, lalu periksa bila sama"], 9.4)),
    ),
    k(
      "Hasil untuk papan dakon: papan a, lima puluh enam ribu lima ratus enam puluh, paling murah, dan papan d, tujuh puluh lima ribu tiga ratus enam puluh, paling mahal. Urutannya a, c, b, d.",
      bersih(0),
      tambah(0, judul("Urutan papan dakon")),
      tambah("papan", ...URUT.flatMap((u, i) => [...kartu(`z${i}`, 8 + i * 74, 70, 56, 40, [W.hijauPita, W.jingga, W.merahPita, W.langit][i], [u.nama, u.harga], 9.6)])),
      tambah("Urutannya", teks("zs0", 73, 94, "<", 16, W.merah), teks("zs1", 147, 94, "<", 16, W.merah), teks("zs2", 221, 94, "<", 16, W.merah)),
      tambah("mahal,", teks("zt1", 36, 140, "termurah", 9.4, W.hijau), teks("zt2", 264, 140, "termahal", 9.4, W.merah)),
    ),
    k(
      "Semua metode memberi urutan yang sama, dan cocok dengan kunci buku. Pilih cara yang paling nyaman, tetapi kita selalu bisa kembali ke nilai tempat.",
      bersih(0),
      tambah(0, judul("Cara apa pun, hasilnya sama")),
      tambah("Semua", emo("zf", 150, 90, "✅", 44)),
      tambah("nyaman,", panah("zp", 70, 140, 160, 0, W.hijau, 2.4)),
      tambah("nilai", teks("zn", 150, 170, "selalu bisa kembali ke nilai tempat", 10.4, W.ungu)),
    ),
  ],
};
