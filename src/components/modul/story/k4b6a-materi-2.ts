import type { AdeganStory } from "./logika-story";
import { E, W, barisPapan, emo, idBarisPapan, judul, kotak, panah, papanData, piring, busa, tanah, teks, tokoh } from "./k4b6a-gambar";
import { bersih, hapus, k, tambah } from "./k4b6a-bantu";

/*
 * Cerita orisinal IGIL "Piktogram Jajanan Bu Rini" (Kelas 4 Bab 6 Sub-Bab A, piktogram skala satu dan lebih dari satu), awal cerita Bazar Kuliner Sekolah.
 * Naskah suara dari naskah/story-naskah-k4b6a.md. Bagian ini: membaca ikon (ikon dikali keterangan), salah langkah Satria (menjumlah ikon saja, taruhan mencuci piring), dan memeriksa jumlah.
 */

/** Empat baris piktogram jajanan pagi ini (keterangan: satu ikon sama dengan lima porsi): risoles 6, pisang 4, lemper 3, es cincau 5 ikon. */
const BARIS: [string, string, number][] = [
  ["risoles", E.risoles, 6],
  ["pisang", E.pisang, 4],
  ["lemper", E.lemper, 3],
  ["cincau", E.cincau, 5],
];

/* ------------------------------ 4. Membaca ikon ------------------------------ */
const SUARA_I1 = "Lemper punya tiga ikon, dan Laras menghitungnya: tiga kali lima sama dengan lima belas porsi.";
const SUARA_I2 = "Es cincau punya lima ikon, jadi lima kali lima sama dengan dua puluh lima porsi.";
const SUARA_I3 = "Membaca piktogram berarti menghitung ikon, lalu mengalikannya dengan banyak yang diwakili satu ikon.";

export const ADEGAN_BACA_IKON: AdeganStory = {
  id: "baca-ikon",
  judul: "Membaca ikon",
  sumber: "Materi: membaca ikon",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Membaca Lemper"), ...tanah("tn", 150), ...papanData("pp", 86, 28, 204, 104)),
      tambah("Lemper", ...barisPapan("lm", 62, "lemper", E.lemper, 3, 150, 22, 16)),
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("kali", teks("h1", 188, 96, "3 × 5", 11, W.sorot, { z: 3 })),
      tambah("belas", teks("h2", 188, 118, "= 15 porsi", 11, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_I2,
      hapus(0, ...idBarisPapan("lm", 3), "h1", "h2"),
      tambah("Es", ...barisPapan("cn", 62, "cincau", E.cincau, 5, 150, 22, 16)),
      tambah("kali", teks("h1", 188, 96, "5 × 5", 11, W.sorot, { z: 3 })),
      tambah("puluh", teks("h2", 188, 118, "= 25 porsi", 11, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Cara Membaca"), ...tanah("tn", 150), ...tokoh("lr", 40, 184, "Laras"), ...papanData("pp", 86, 28, 204, 104)),
      tambah("menghitung", teks("c1", 188, 62, "1. hitung ikon", 10, W.kapur, { z: 3 }), emo("mt", 262, 62, E.mata, 16, { z: 3 })),
      tambah("mengalikannya", teks("c2", 188, 86, "2. kalikan", 10, W.kapur, { z: 3 })),
      tambah("diwakili", teks("c3", 188, 110, "dengan 1 ikon = ?", 9, W.sorot, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 5. Salah: menjumlah ikon saja ------------------------------ */
const SUARA_S1 = "Satria menghitung semua ikon di papan: enam, empat, tiga, dan lima.";
const SUARA_S2 = "Ia berseru, jumlah semuanya delapan belas porsi, tidak mungkin salah!";
const SUARA_S3 = "Kalau aku salah, aku mencuci semua piring bazar, katanya sambil menggulung lengan baju.";

export const ADEGAN_SALAH_JUMLAH: AdeganStory = {
  id: "salah-jumlah",
  judul: "Satria menjumlah ikon saja",
  sumber: "Materi: salah langkah jumlah",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satria Menghitung Ikon"), ...tanah("tn", 150), ...papanData("pp", 90, 28, 200, 112)),
      tambah("Satria", ...tokoh("sa", 40, 184, "Satria")),
      tambah("enam,", ...barisPapan("r1", 52, "risoles", E.risoles, 6, 150, 16, 13), teks("a1", 262, 52, "6", 10, W.sorot, { z: 3 })),
      tambah("empat,", ...barisPapan("r2", 72, "pisang", E.pisang, 4, 150, 16, 13), teks("a2", 262, 72, "4", 10, W.sorot, { z: 3 })),
      tambah("tiga,", ...barisPapan("r3", 92, "lemper", E.lemper, 3, 150, 16, 13), teks("a3", 262, 92, "3", 10, W.sorot, { z: 3 })),
      tambah("lima.", ...barisPapan("r4", 112, "cincau", E.cincau, 5, 150, 16, 13), teks("a4", 262, 112, "5", 10, W.sorot, { z: 3 })),
    ),
    k(
      SUARA_S2,
      tambah("berseru,", emo("cm", 76, 160, E.cemberut, 18)),
      tambah("delapan", teks("js", 190, 154, "6 + 4 + 3 + 5", 9, W.merah)),
      tambah("belas", teks("j18", 190, 168, "= 18 porsi", 10, W.merah)),
      tambah("salah!", emo("bt", 262, 160, E.bintang, 18)),
    ),
    k(
      SUARA_S3,
      hapus(0, "cm", "js", "j18", "bt"),
      tambah("salah,", teks("ks", 190, 154, "kalau salah:", 8.4, W.merah)),
      tambah("mencuci", teks("mc", 190, 168, "mencuci piring", 9, W.coklat), emo("sb", 262, 162, E.sabun, 18)),
      tambah("piring", piring("pr1", 120, 168, 9), piring("pr2", 120, 162, 9), piring("pr3", 120, 156, 9)),
      tambah("menggulung", emo("ku", 76, 160, E.kuat, 20)),
    ),
  ],
};

/* ------------------------------ 6. Memeriksa jumlah ------------------------------ */
const SUARA_M1 = "Laras menunjuk keterangan di pojok papan dan bertanya, satu ikon mewakili berapa porsi?";
const SUARA_M2 = "Ikon seluruhnya delapan belas, dan tiap ikon lima porsi, jadi jumlahnya sembilan puluh porsi.";
const SUARA_M3 = "Satria mencuci piring sampai busa sabun menempel di hidungnya, dan semua orang tertawa.";

export const ADEGAN_PERIKSA_JUMLAH: AdeganStory = {
  id: "periksa-jumlah",
  judul: "Memeriksa jumlah dengan keterangan",
  sumber: "Materi: memeriksa jumlah",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Laras Menunjuk Keterangan"), ...tanah("tn", 150), ...papanData("pp", 90, 28, 200, 112)),
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("keterangan", ...BARIS.flatMap(([n, e, j], i) => barisPapan(`r${i + 1}`, 52 + i * 17, n, e, j, 150, 16, 12)), kotak("kt", 146, 118, 134, 18, W.krem, W.coklat, { rx: 3, tebal: 1.4, z: 4 })),
      tambah("pojok", panah("pa", 70, 130, 70, 0, W.merah, 1.8, { z: 5 })),
      tambah("berapa", teks("kt1", 213, 130, "1 ikon = ? porsi", 9, W.merah, { z: 5 })),
    ),
    k(
      SUARA_M2,
      tambah("seluruhnya", teks("t1", 190, 154, "18 ikon", 10, W.coklat)),
      tambah("tiap", teks("t2", 262, 154, "1 ikon = 5", 8, W.merah)),
      tambah("sembilan", teks("t3", 190, 170, "18 × 5 = 90 porsi", 10, W.merah)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Satria Mencuci Piring"), ...tanah("tn", 150)),
      tambah("Satria", ...tokoh("sa", 120, 174, "Satria")),
      tambah("piring", piring("pr1", 210, 156, 11), piring("pr2", 210, 148, 11), piring("pr3", 210, 140, 11)),
      tambah("busa", ...busa("bs", 128, 168, 4)),
      tambah("tertawa.", emo("t1", 40, 150, E.tertawa, 18), emo("t2", 70, 150, E.tertawa, 18), emo("t3", 260, 150, E.tertawa, 18)),
    ),
  ],
};
