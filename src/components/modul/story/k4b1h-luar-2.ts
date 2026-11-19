import type { AdeganStory, Obj } from "./logika-story";
import { E, W, angkaSus, bersusunDasar, emo, garis, garisSus, judul, kartu, panah, papanJatah, teks, tokoh } from "./k4b1h-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b1h-bantu";

/*
 * Cerita orisinal IGIL "Papan Jatah Bu Ratna" (Kelas 4 Bab 1 Sub-Bab H), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1h.md. Bagian ini: Repeated Subtraction (Kurang Berulang), Long Division (Bagi Susun), terapannya, dan ringkasan.
 */

/* ------------------------------ Repeated Subtraction: konsep ------------------------------ */
const SUARA_K1 = "Cara kedua, Repeated Subtraction, atau Kurang Berulang.";
const SUARA_K2 = "Kita mengurangi bilangan awal dengan pembagi berkali-kali sampai habis atau tersisa kurang dari pembagi.";
const SUARA_K3 = "Banyaknya pengurangan adalah hasil bagi.";
const SUARA_K4 = "Sisa yang tidak bisa dikurangi lagi adalah sisa pembagian.";
const BARIS = ["20 − 6 = 14", "14 − 6 = 8", "8 − 6 = 2"];

export const ADEGAN_LUAR_KURANG: AdeganStory = {
  id: "luar-kurang",
  judul: "Repeated Subtraction: Kurang Berulang",
  sumber: "Metode global: Repeated Subtraction (konsep)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Cara 2: Repeated Subtraction"), ...papanJatah("pt", 8, 28, 284, 124)),
      tambah("Repeated", teks("nm", 150, 60, "Repeated Subtraction", 15, W.merah)),
      tambah("Kurang", teks("ni", 150, 84, "Kurang Berulang", 12, W.biru)),
      tambah("Berulang.", emo("ul", 150, 126, E.ulang, 30)),
    ),
    k(
      SUARA_K2,
      hapus("Kita", "nm", "ni", "ul"),
      tambah("bilangan", teks("r0", 100, 62, BARIS[0], 12, W.biru)),
      tambah("pembagi", teks("r1", 100, 86, BARIS[1], 12, W.biru)),
      tambah("tersisa", teks("r2", 100, 110, BARIS[2], 12, W.biru)),
      tambah("dari", teks("kc", 236, 110, "2 < 6", 12, W.hijauTua)),
    ),
    k(
      SUARA_K3,
      sorotkan("pengurangan", "r0", "r1", "r2"),
      tambah("adalah", teks("kl", 236, 62, "3 kali", 14, W.merah)),
      tambah("hasil", teks("hb", 236, 82, "hasil bagi = 3", 9, W.hijauTua)),
    ),
    k(
      SUARA_K4,
      redamkan("Sisa", "r0", "r1"),
      sorotkan("tidak", "r2", "kc"),
      tambah("dikurangi", emo("xs", 160, 108, E.salah, 20)),
      tambah("sisa@2", teks("sr", 236, 134, "sisa = 2", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ Repeated Subtraction: terapan ------------------------------ */
const SUARA_P1 = "Laras mengurangi tiga puluh enam dengan enam, lagi dan lagi, sampai habis.";
const SUARA_P2 = "Ia mengurangi enam kali, jadi hasil baginya enam.";
const SUARA_P3 = "Cocok untuk memahami arti pembagian sebagai pengurangan berulang.";
const SUARA_P4 = "Kurang cocok kalau bilangannya besar, karena pengurangannya terlalu panjang.";
/** Garis bilangan nol sampai tiga puluh enam: letak mendatar bilangan `v`. */
const GX = (v: number): number => 24 + v * 7;
const GY = 104;
const lengkung = (id: string, v: number): Obj => ({ id, t: "jalur", x: GX(v), y: GY, d: "M0 0 Q-21 -22 -42 0", garis: v % 12 === 0 ? W.merah : W.ungu, tebal: 2, z: 3 });
const ARC = [0, 1, 2, 3, 4, 5].map((i) => lengkung(`a${i}`, 36 - i * 6));
const label = (v: number): Obj => teks(`v${v}`, GX(v), 126, String(v), 9, W.biru);
const tanda = (v: number): Obj => garis(`tk${v}`, GX(v), GY - 5, 0, 10, W.biru, 1.4, { z: 2 });

export const ADEGAN_LUAR_KURANG_TERAPAN: AdeganStory = {
  id: "luar-kurang-terapan",
  judul: "Kurang Berulang: kapan cocok",
  sumber: "Metode global: Repeated Subtraction (terapan)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Laras Mengurangi"), ...papanJatah("pt", 8, 28, 284, 124), ...tokoh("lr", 40, 184, "Laras"), garis("gl", 24, GY, 252, 0, W.biru, 2.4, { z: 2 })),
      tambah("tiga", tanda(36), label(36)),
      tambah("enam", teks("mn", 150, 62, "− 6", 14, W.merah)),
      tambah("lagi", ARC[0], ARC[1]),
      tambah("lagi@2", ARC[2], ARC[3]),
      tambah("habis.", ARC[4], ARC[5], ...[30, 24, 18, 12, 6, 0].flatMap((v) => [tanda(v), label(v)])),
    ),
    k(
      SUARA_P2,
      tambah("mengurangi", ...[0, 1].map((i) => teks(`c${i}`, GX(33 - i * 6), 86, String(i + 1), 9, W.coklat))),
      tambah("enam", ...[2, 3].map((i) => teks(`c${i}`, GX(33 - i * 6), 86, String(i + 1), 9, W.coklat))),
      tambah("kali,", ...[4, 5].map((i) => teks(`c${i}`, GX(33 - i * 6), 86, String(i + 1), 9, W.coklat))),
      tambah("baginya", teks("hb", 150, 46, "hasil bagi = 6", 12, W.hijauTua)),
      sorotkan("enam.@2", "a0", "a1", "a2", "a3", "a4", "a5"),
    ),
    k(
      SUARA_P3,
      hapus("Cocok", "mn", "hb"),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 20)),
      tambah("memahami", emo("lp", 60, 56, E.pikir, 20)),
      tambah("pengurangan", teks("ar", 150, 150, "bagi = kurang berulang", 9, W.coklat)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Kalau Bilangannya Besar"), ...papanJatah("pt", 8, 28, 284, 124), ...tokoh("lr", 40, 184, "Laras")),
      tambah("bilangannya", teks("l1", 150, 66, "96 − 6 − 6 − 6 − 6 − 6 − 6 − 6 − 6", 10, W.biru)),
      tambah("besar,", teks("l2", 150, 88, "− 6 − 6 − 6 − 6 − 6 − 6 − 6 − 6 − 6", 10, W.biru), teks("l3", 150, 110, "− 6 − 6 − 6 − 6 ...", 10, W.biru)),
      tambah("terlalu", teks("tp", 150, 138, "terlalu panjang", 12, W.merah), emo("xs", 262, 148, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Long Division: konsep ------------------------------ */
const SUARA_S1 = "Cara ketiga, Long Division, atau Bagi Susun.";
const SUARA_S2 = "Kita membagi dari puluhan ke satuan, bagian demi bagian.";
const SUARA_S3 = "Sisa dari puluhan diturunkan bersama angka satuan, lalu dibagi lagi.";
const SUARA_S4 = "Hasilnya ditulis di atas, dan sisa akhirnya ditulis di bawah.";
const SX = 130;
const SY = 110;

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Long Division: Bagi Susun",
  sumber: "Metode global: Long Division (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 3: Long Division"), ...papanJatah("pt", 8, 28, 284, 124)),
      tambah("Long", teks("nm", 150, 56, "Long Division", 16, W.merah)),
      tambah("Bagi", teks("ni", 150, 76, "Bagi Susun", 12, W.biru)),
      tambah("Susun.", ...bersusunDasar("bs", SX, SY, "??", "?")),
    ),
    k(
      SUARA_S2,
      hapus("Kita", "nm", "ni"),
      tambah("puluhan", teks("hp", 124, 72, "puluhan", 8, W.ungu), teks("hs", 160, 72, "satuan", 8, W.ungu)),
      tambah("satuan,", panah("pa", 136, 78, 20, 0, W.merah, 2)),
      sorotkan("bagian", "bs-d0"),
    ),
    k(
      SUARA_S3,
      redamkan("Sisa", "bs-d0"),
      tambah("Sisa", angkaSus("sr", SX, SY, 0, 2, "?", W.merah)),
      tambah("diturunkan", angkaSus("tn", SX, SY, 1, 2, "?", W.merah), panah("pt2", 166, 117, 0, 18, W.merah, 1.8), teks("tr", 206, 134, "turun", 9, W.merah)),
      sorotkan("dibagi", "bs-d1"),
    ),
    k(
      SUARA_S4,
      tambah("atas,", teks("ha", 232, 99, "hasil di atas", 9, W.hijauTua), garis("ga", 196, 96, -24, 0, W.hijauTua, 1.4)),
      tambah("akhirnya", angkaSus("ak", SX, SY, 1, 4, "?", W.hijauTua), garisSus("gk", SX, SY, 0, 1, 3)),
      tambah("bawah.", teks("sb", 232, 170, "sisa di bawah", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Long Division: terapan ------------------------------ */
const SUARA_T1 = "Satria membagi delapan puluh empat dengan tujuh.";
const SUARA_T2 = "Delapan dibagi tujuh satu sisa satu, turun empat menjadi empat belas, empat belas dibagi tujuh dua, jadi dua belas.";
const SUARA_T3 = "Cocok untuk bilangan dua angka dengan cepat dan rapi.";
const SUARA_T4 = "Kurang cocok kalau lupa menurunkan angka satuan, karena hasilnya keliru.";
const TX = 130;
const TY = 100;

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Bagi Susun: kapan cocok",
  sumber: "Metode global: Long Division (terapan)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Satria Membagi"), ...tokoh("sa", 40, 184, "Satria")),
      tambah("delapan", teks("n84", 120, 56, "84", 20, W.merah)),
      tambah("dengan", teks("kb", 150, 56, ":", 20, W.biru)),
      tambah("tujuh.", teks("n7", 180, 56, "7", 20, W.merah), ...bersusunDasar("bs", TX, TY, "84", "7")),
    ),
    k(
      SUARA_T2,
      tambah("satu", angkaSus("q1", TX, TY, 0, -1, "1", W.merah)),
      tambah("sisa", angkaSus("pr", TX, TY, 0, 1, "7"), garisSus("g1", TX, TY, 0, 0, 1), angkaSus("s1", TX, TY, 0, 2, "1", W.merah)),
      tambah("turun", angkaSus("tn", TX, TY, 1, 2, "4", W.merah)),
      tambah("belas,", teks("n14", 230, 122, "14", 16, W.coklat)),
      tambah("dua,", angkaSus("q2", TX, TY, 1, -1, "2", W.merah)),
      tambah("belas.@3", angkaSus("pa", TX, TY, 0, 3, "1"), angkaSus("pb", TX, TY, 1, 3, "4"), garisSus("g2", TX, TY, 0, 1, 3), angkaSus("s2", TX, TY, 1, 4, "0", W.hijau), teks("h12", 230, 150, "12", 20, W.hijauTua)),
    ),
    k(
      SUARA_T3,
      tambah("dua", teks("d2", 262, 96, "2 angka", 9, W.coklat)),
      sorotkan("cepat", "q1", "q2"),
      tambah("rapi.", emo("ok", 270, 122, E.benar, 24)),
    ),
    k(
      SUARA_T4,
      hapus("lupa", "ok"),
      tambah("lupa", emo("xs", 270, 122, E.salah, 24)),
      ubah("menurunkan", { id: "tn", op: 0.15 }),
      ubah("hasilnya", { id: "h12", isi: "11", warna: W.merah }),
      tambah("keliru.", teks("kl", 230, 174, "hasil keliru", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Tiga cara sudah kita lihat bersama Bu Ratna. Mana yang pas tergantung keadaan.";
const SUARA_G2 = "Ingin melihat bendanya, pakai Bagi Rata. Ingin memahami maknanya, pakai Kurang Berulang.";
const SUARA_G3 = "Ingin cara yang cepat, pakai Bagi Susun. Apa pun caranya, periksa dengan perkalian.";
const SUARA_G4 = "Menurutmu, untuk membagi tiga puluh enam kartu ke empat kotak, cara mana yang paling pas?";
const KARTU_R = ["Bagi Rata", "Kurang Berulang", "Bagi Susun"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tiga Cara, Satu Pilihan"), teks("n3", 150, 42, "3 cara", 11, W.ungu), ...tokoh("br", 40, 184, "Bu Ratna")),
      tambah("Ratna.", ...[0, 1, 2].flatMap((i) => kartu(`r${i}`, 14 + i * 96, 56, 88, 40, i === 0 ? "#FEF3C7" : i === 1 ? "#BFDBFE" : "#FBCFE8", [KARTU_R[i]], 9))),
      tambah("pas", emo("tq", 150, 130, E.tanya, 30)),
    ),
    k(
      SUARA_G2,
      hapus("Ingin", "tq"),
      tambah("melihat", emo("ma", 58, 124, E.mata, 22)),
      sorotkan("Bagi", "r0-k"),
      tambah("memahami", emo("pk", 150, 124, E.pikir, 22)),
      redamkan("memahami", "r0-k"),
      sorotkan("Kurang", "r1-k"),
    ),
    k(
      SUARA_G3,
      redamkan("Ingin", "r1-k"),
      sorotkan("Bagi", "r2-k"),
      tambah("cepat,", emo("kc", 246, 124, E.jempol, 22)),
      tambah("periksa", teks("ck", 190, 160, "periksa dengan perkalian", 9, W.hijauTua), emo("ok", 262, 148, E.benar, 20)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Cara Mana yang Pas?"), ...tokoh("br", 40, 184, "Bu Ratna"), ...[0, 1, 2].flatMap((i) => kartu(`r${i}`, 14 + i * 96, 56, 88, 40, i === 0 ? "#FEF3C7" : i === 1 ? "#BFDBFE" : "#FBCFE8", [KARTU_R[i]], 9))),
      tambah("tiga", teks("q36", 110, 160, "36 kartu", 12, W.merah)),
      tambah("empat", teks("q4", 200, 160, "4 kotak", 12, W.merah)),
      tambah("pas?", teks("tq2", 150, 134, "?", 30, W.ungu)),
    ),
  ],
};
