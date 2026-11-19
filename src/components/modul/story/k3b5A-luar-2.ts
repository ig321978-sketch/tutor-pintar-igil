import type { AdeganStory } from "./logika-story";
import { E, W, emo, idTurusMiring, idTurusTegak, judul, kartu, kartuBil, papanTulis, teks, tokoh, turus } from "./k3b5A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k3b5A-bantu";

/*
 * Cerita orisinal IGIL "Catatan Pak Hasan" (Kelas 3 Bab 5 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b5a.md. Bagian ini: Range Check (Cek Jangkauan), Tally Count (Hitung Turus), terapannya, dan ringkasan.
 */

/* ------------------------------ Range Check: konsep ------------------------------ */
const SUARA_R1 = "Cara kedua, Range Check, atau Cek Jangkauan.";
const SUARA_R2 = "Setelah menghitung jangkauan, kita periksa dengan menambahkannya kembali.";
const SUARA_R3 = "Data terkecil ditambah jangkauan harus sama dengan data terbesar.";
const SUARA_R4 = "Kalau tidak sama, ada yang salah, dan kita hitung ulang.";

export const ADEGAN_LUAR_CEK: AdeganStory = {
  id: "luar-cek",
  judul: "Range Check: Cek Jangkauan",
  sumber: "Metode global: Range Check (konsep)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Cara 2: Range Check"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("Range", teks("nm", 150, 56, "Range Check", 16, W.kapurMerah)),
      tambah("Cek", teks("ni", 150, 76, "Cek Jangkauan", 12, W.kapur), emo("ul", 150, 118, E.ulang, 30)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Cek Jangkauan"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("menghitung", ...kartu("kt", 18, 62, 76, 36, "#BFDBFE", ["terkecil"], 10)),
      tambah("jangkauan,", ...kartu("jg", 114, 62, 76, 36, "#FDE68A", ["jangkauan"], 10), teks("pl", 104, 86, "+", 20, W.kapur)),
      tambah("periksa", teks("eq", 200, 86, "=", 20, W.kapur)),
      tambah("kembali.", ...kartu("qq", 210, 62, 72, 36, "#FFFFFF", ["?"], 16)),
    ),
    k(
      SUARA_R3,
      sorotkan("terkecil", "kt-k"),
      sorotkan("jangkauan", "jg-k"),
      ubah("sama", { id: "qq-t0", isi: "terbesar", u: 10 }),
      tambah("harus", emo("ok", 150, 126, E.benar, 22)),
    ),
    k(
      SUARA_R4,
      hapus("Kalau", "ok"),
      tambah("tidak", emo("xs", 150, 126, E.salah, 22)),
      ubah("salah,", { id: "qq-k", warna: "#FECACA" }),
      tambah("hitung", emo("ul", 240, 122, E.ulang, 22), teks("hu", 240, 142, "hitung ulang", 8, W.kapur)),
    ),
  ],
};

/* ------------------------------ Range Check: terapan ------------------------------ */
const SUARA_U1 = "Bima memeriksa jangkauan enam dengan menambah tiga dan enam.";
const SUARA_U2 = "Hasilnya sembilan, sama dengan data terbesar, jadi hitungannya benar.";
const SUARA_U3 = "Cocok untuk menangkap kesalahan, misalnya menambah padahal harus mengurangi.";
const SUARA_U4 = "Kurang cocok kalau data terkecil atau terbesarnya salah baca sejak awal.";

export const ADEGAN_LUAR_CEK_TERAPAN: AdeganStory = {
  id: "luar-cek-terapan",
  judul: "Cek Jangkauan: kapan cocok",
  sumber: "Metode global: Range Check (terapan)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Bima Memeriksa Jangkauan"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("bm", 40, 184, "Bima")),
      tambah("jangkauan", teks("jg", 150, 50, "jangkauan 6", 11, W.kapurMerah)),
      tambah("menambah", teks("pl", 117, 92, "+", 22, W.kapur)),
      tambah("tiga", ...kartuBil("v3", 60, 66, 3)),
      tambah("enam@2", ...kartuBil("v6", 136, 66, 6)),
    ),
    k(
      SUARA_U2,
      tambah("Hasilnya", teks("eq", 193, 92, "=", 22, W.kapur)),
      tambah("sembilan,", ...kartuBil("v9", 208, 66, 9, "#BBF7D0")),
      tambah("terbesar,", teks("tb", 227, 120, "terbesar", 9, W.kapur)),
      sorotkan("terbesar,", "v9-k"),
      tambah("benar.", emo("ok", 262, 52, E.benar, 20)),
    ),
    k(
      SUARA_U3,
      tambah("kesalahan,", emo("lp", 24, 56, E.mata, 18)),
      tambah("menambah", teks("sl", 90, 138, "salah: ditambah", 10, W.kapurMerah), emo("x1", 150, 138, E.salah, 14)),
      tambah("mengurangi.", teks("bn", 214, 138, "benar: dikurangi", 10, W.kapur)),
    ),
    k(
      SUARA_U4,
      hapus("Kurang", "sl", "bn", "x1"),
      ubah("terkecil", { id: "v3-k", warna: "#FECACA" }),
      tambah("salah", teks("sb", 96, 138, "data salah baca", 10, W.kapurMerah)),
      tambah("awal.", teks("hk", 216, 138, "hasil ikut salah", 10, W.kapurMerah)),
    ),
  ],
};

/* ------------------------------ Tally Count: konsep ------------------------------ */
const SUARA_H1 = "Cara ketiga, Tally Count, atau Hitung Turus.";
const SUARA_H2 = "Setiap data kita catat dengan satu garis tegak.";
const SUARA_H3 = "Garis kelima mencoret miring supaya lima garis jadi satu bundel.";
const SUARA_H4 = "Lalu kita hitung bundelnya, kemudian garis sisanya, dan jumlahkan semuanya.";
/** Turus berbanyak delapan: satu bundel (empat tegak dan satu miring) dan tiga garis tegak. */
const HB = turus("hb", 110, 60, 8, { jarak: 10, tinggi: 44 });
const dariHB = (ids: string[]) => HB.filter((o) => ids.includes(o.id));

export const ADEGAN_LUAR_HITUNG: AdeganStory = {
  id: "luar-hitung",
  judul: "Tally Count: Hitung Turus",
  sumber: "Metode global: Tally Count (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Cara 3: Tally Count"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("Tally", teks("nm", 150, 54, "Tally Count", 16, W.kapurMerah)),
      tambah("Hitung", teks("ni", 150, 74, "Hitung Turus", 12, W.kapur), emo("ct", 150, 112, E.catat, 30)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Hitung Turus"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("catat", emo("ct", 60, 70, E.catat, 22)),
      tambah("satu", ...dariHB(idTurusTegak("hb", 0, 0)), teks("s1", 150, 140, "1 garis = 1 data", 10, W.kapur)),
      sorotkan("tegak.", "hb-t0"),
    ),
    k(
      SUARA_H3,
      tambah("Garis", ...dariHB(idTurusTegak("hb", 1, 2))),
      tambah("kelima", ...dariHB(idTurusTegak("hb", 3, 3))),
      tambah("mencoret", ...dariHB(idTurusMiring("hb", 0, 0))),
      tambah("lima@2", teks("l5", 150, 124, "5 garis = 1 bundel", 11, W.kapur)),
      sorotkan("bundel.", ...idTurusMiring("hb", 0, 0)),
    ),
    k(
      SUARA_H4,
      hapus("Lalu", "l5", "s1"),
      tambah("hitung", teks("lbd", 120, 126, "bundel", 9, W.kapur)),
      tambah("kemudian", ...dariHB(idTurusTegak("hb", 4, 6)), teks("lsi", 172, 126, "sisa", 9, W.kapur)),
      tambah("jumlahkan", teks("jm", 150, 142, "5 + 3 = 8", 11, W.kapurMerah)),
    ),
  ],
};

/* ------------------------------ Tally Count: terapan ------------------------------ */
const SUARA_V1 = "Raka mencatat sepeda yang rantainya lepas dengan turus.";
const SUARA_V2 = "Ia mendapat satu bundel dan dua garis, jadi tujuh.";
const SUARA_V3 = "Cocok untuk menghitung banyak data yang datang satu per satu.";
const SUARA_V4 = "Kurang cocok kalau bilangannya sangat besar, karena turusnya terlalu panjang.";
/** Turus rantai lepas berbanyak tujuh, dan turus yang sangat panjang (lima puluh lima garis) berukuran kecil. */
const RL = turus("rl", 100, 60, 7, { jarak: 10, tinggi: 44 });
const dariRL = (ids: string[]) => RL.filter((o) => ids.includes(o.id));
const PJ = turus("pj", 24, 72, 55, { jarak: 4, tinggi: 20, celah: 4, tebal: 1.6 });

export const ADEGAN_LUAR_HITUNG_TERAPAN: AdeganStory = {
  id: "luar-hitung-terapan",
  judul: "Hitung Turus: kapan cocok",
  sumber: "Metode global: Tally Count (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Rantai Lepas"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("rk", 40, 184, "Raka")),
      tambah("mencatat", emo("ct", 72, 166, E.catat, 16)),
      tambah("rantainya", teks("rb", 82, 48, "rantai lepas", 10, W.kapur)),
      tambah("lepas", ...dariRL([...idTurusTegak("rl", 0, 3), ...idTurusMiring("rl", 0, 0)])),
      tambah("turus.", ...dariRL(idTurusTegak("rl", 4, 5))),
    ),
    k(
      SUARA_V2,
      tambah("satu", teks("ub", 118, 122, "1 bundel", 10, W.kapur)),
      tambah("dua", teks("ug", 176, 122, "2 garis", 10, W.kapur)),
      tambah("tujuh.", teks("n7", 240, 84, "7", 36, W.kapurMerah)),
    ),
    k(
      SUARA_V3,
      tambah("Cocok", emo("ok", 262, 52, E.benar, 20)),
      tambah("datang", emo("b1", 80, 142, E.sepeda, 18), emo("b2", 120, 142, E.sepeda, 18), emo("b3", 160, 142, E.sepeda, 18)),
      tambah("satu", teks("ps", 215, 144, "1 per 1", 10, W.kapur)),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Bilangan Besar"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("rk", 40, 184, "Raka")),
      tambah("besar,", teks("nb", 150, 48, "bilangan besar", 11, W.kapur)),
      tambah("karena", ...PJ),
      tambah("panjang.", teks("tp", 150, 118, "terlalu panjang", 11, W.kapurMerah), emo("xs", 262, 52, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Tiga cara sudah kita lihat bersama Pak Hasan. Mana yang pas tergantung keadaan.";
const SUARA_G2 = "Ingin mencari ujung data, pakai Garis Urutan. Ingin memeriksa jangkauan, pakai Cek Jangkauan.";
const SUARA_G3 = "Ingin menghitung data yang datang satu per satu, pakai Hitung Turus. Apa pun caranya, periksa hasilnya.";
const SUARA_G4 = "Menurutmu, untuk mencari hari paling ramai di bengkel, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tiga Cara, Pilih yang Pas"), ...kartu("r0", 20, 38, 156, 30, "#BFDBFE", ["Garis Urutan"], 11), ...kartu("r1", 20, 78, 156, 30, "#FDE68A", ["Cek Jangkauan"], 11), ...kartu("r2", 20, 118, 156, 30, "#BBF7D0", ["Hitung Turus"], 11)),
      tambah(0, emo("e0", 196, 60, E.penggaris, 20), emo("e1", 196, 100, E.ulang, 20), emo("e2", 196, 140, E.catat, 20), teks("n3", 250, 90, "3 cara", 11, W.ungu)),
      tambah("Hasan.", ...tokoh("ph", 250, 184, "Pak Hasan")),
      tambah("pas", emo("tq", 250, 128, E.tanya, 20)),
    ),
    k(
      SUARA_G2,
      sorotkan("ujung", "r0-k"),
      tambah("Urutan.", emo("ok", 226, 58, E.benar, 20)),
      redamkan("memeriksa", "r0-k"),
      sorotkan("jangkauan,", "r1-k"),
      hapus("Jangkauan.", "ok"),
      tambah("Jangkauan.", emo("ok2", 226, 98, E.benar, 20)),
    ),
    k(
      SUARA_G3,
      redamkan("menghitung", "r1-k"),
      tambah("satu", teks("ps", 250, 110, "1 per 1", 10, W.kapurMerah)),
      sorotkan("satu", "r2-k"),
      tambah("Turus.", emo("ok3", 226, 138, E.benar, 20)),
      tambah("periksa", emo("mt", 262, 58, E.mata, 20)),
    ),
    k(
      SUARA_G4,
      hapus("Menurutmu,", "n3", "ps", "tq", "ok2", "ok3", "mt"),
      redamkan("Menurutmu,", "r2-k"),
      tambah("Menurutmu,", teks("tq2", 250, 96, "?", 36, W.merah)),
      tambah("bengkel,", emo("sp", 250, 136, E.sepeda, 26)),
    ),
  ],
};
