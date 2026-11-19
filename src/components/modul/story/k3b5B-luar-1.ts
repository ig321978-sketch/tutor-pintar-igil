import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, halaman, idSepeda, judul, kartu, kotak, papanNama, sepeda, teks, tokoh, turus } from "./k3b5B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b5B-bantu";

/*
 * Cerita orisinal IGIL "Tabel Bu Wulan" (Kelas 3 Bab 5 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b5b.md. Bagian ini: pembuka (map catatan di ruang klub), Tally Groups (Turus Berlima), dan terapannya.
 */

export const NAMA_METODE = ["Tally Groups", "Table Fill", "Read and Ask"] as const;
export const NAMA_METODE_ID = ["Turus Berlima", "Isi Tabel", "Baca dan Tanya"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di ruang klub, Bu Wulan membuka map berisi tiga lembar catatan.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk menyajikan data tanpa keliru dan tanpa ragu.";
const SUARA_O3 = "Tiga cara itu: Tally Groups, Table Fill, dan Read and Ask.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Turus Berlima, Isi Tabel, dan Baca dan Tanya.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Map catatan Bu Wulan",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Sore Itu"), ...halaman("hl", 150)),
      tambah("ruang", ...papanNama("rk", 100, 30, "RUANG KLUB", 100)),
      tambah("Wulan,", ...tokoh("bw", 60, 184, "Bu Wulan")),
      tambah("map", kotak("mj", 124, 112, 150, 8, "#C99A63", W.coklat, { rx: 2, z: 1 }), kotak("mp", 150, 98, 50, 14, "#FDE047", "#A16207", { rx: 2, z: 2 })),
      tambah("tiga", ...[0, 1, 2].map((i) => kotak(`ls${i}`, 190 + i * 26, 66, 22, 30, W.putih, W.biru, { rx: 2, z: 2 })), teks("lb", 214, 58, "3 lembar", 8, W.ungu)),
      tambah("catatan.", emo("ct", 150, 90, E.catat, 16)),
    ),
    k(
      SUARA_O2,
      hapus(0, "lb", "ct", "mp", "ls0", "ls1", "ls2"),
      tambah("tiga", teks("n3", 236, 40, "3 cara", 10, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 100 + i * 62, 66, 54, 36, KUNING_KARTU, ["cara"], 9))),
      tambah("menyajikan", ...kartu("dt", 130, 112, 70, 22, "#BFDBFE", ["data"], 9)),
      tambah("keliru", emo("xs", 230, 126, E.salah, 18)),
      tambah("ragu.", emo("pk", 90, 130, E.pikir, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Tally", teks("m0", 120, 70, "1. Tally Groups", 10, W.biru), emo("i0", 30, 72, E.catat, 16)),
      tambah("Table", teks("m1", 120, 120, "2. Table Fill", 10, W.biru), emo("i1", 30, 122, "\u{1F4CB}", 16)),
      tambah("Read", teks("m2", 120, 170, "3. Read and Ask", 10, W.biru), emo("i2", 30, 172, E.mata, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Turus", teks("g0", 244, 70, "Turus Berlima", 8, W.ungu), garis("l0", 208, 75, 72, 0, W.ungu, 1)),
      tambah("Isi", teks("g1", 244, 120, "Isi Tabel", 8, W.ungu), garis("l1", 208, 125, 72, 0, W.ungu, 1)),
      tambah("Baca", teks("g2", 244, 170, "Baca dan Tanya", 8, W.ungu), garis("l2", 208, 175, 72, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Tally Groups: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Tally Groups, atau Turus Berlima.";
const SUARA_C2 = "Setiap lima turus kita gabung menjadi satu bundel dengan coretan miring yang melintang.";
const SUARA_C3 = "Lalu kita hitung bundelnya, bukan garisnya satu per satu.";
const SUARA_C4 = "Bundel lima ditambah garis sisa memberi banyak seluruhnya.";
const Q = [0, 1, 2, 3].map((i) => garis(`q${i}`, 60 + i * 8, 64, 0, 36, W.biru, 2, { z: 2 }));
const Q4 = garis("q4", 92, 64, 0, 36, W.biru, 2, { z: 3 });
const GT = turus("gt", 60, 60, 10, 34, 7);
const GS = turus("gs", 60, 60, 7, 34, 7);
const ID_GT = GT.map((o) => o.id);

export const ADEGAN_LUAR_TURUS: AdeganStory = {
  id: "luar-turus",
  judul: "Tally Groups: Turus Berlima",
  sumber: "Metode global: Tally Groups (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Tally Groups"), ...halaman("hl", 150)),
      tambah("Tally", emo("jr", 150, 104, E.catat, 36)),
      tambah("Turus", teks("nm", 150, 140, "Turus Berlima", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "jr", "nm"),
      tambah("turus", ...Q, Q4, teks("n5", 160, 70, "5 turus", 10, W.merah)),
      tambah("gabung", kotak("bd", 52, 56, 50, 52, undefined, W.hijau, { tebal: 2.4, rx: 6, z: 4 })),
      tambah("satu", teks("n1", 77, 122, "1 bundel", 9, W.ungu)),
      ubah("coretan", { id: "q4", x: 56, y: 96, x2: 36, y2: -32, warna: W.merah }),
      sorotkan("melintang.", "q4"),
    ),
    k(
      SUARA_C3,
      hapus(0, ...Q.map((o) => o.id), "q4", "bd", "n5", "n1"),
      tambah("hitung", ...GT),
      tambah("bundelnya,", teks("u1", 72, 110, "1", 11, W.hijauTua), teks("u2", 108, 110, "2", 11, W.hijauTua)),
      tambah("bukan", emo("xs", 214, 78, E.salah, 20)),
      tambah("satu", teks("sp", 170, 84, "1 per 1", 11, W.merah)),
    ),
    k(
      SUARA_C4,
      hapus(0, ...ID_GT, "u1", "u2", "xs", "sp"),
      tambah("lima", ...GS.filter((o) => o.id.includes("-b")), teks("l5", 72, 110, "5", 12, W.hijauTua)),
      tambah("ditambah", teks("pl", 90, 84, "+", 14, W.ungu)),
      tambah("garis", ...GS.filter((o) => o.id.includes("-s"))),
      tambah("sisa", teks("l2", 100, 110, "2", 12, W.hijauTua)),
      tambah("seluruhnya.", teks("l7", 190, 84, "= 7", 16, W.merah)),
    ),
  ],
};
/* ------------------------------ Tally Groups: terapan ------------------------------ */
const SUARA_P1 = "Salsa mencatat lampu sepeda yang mati dengan turus berlima.";
const SUARA_P2 = "Ia mendapat satu bundel dan empat garis, jadi sembilan.";
const SUARA_P3 = "Cocok untuk menghitung data yang banyak, supaya tidak salah hitung dan tidak perlu mengulang.";
const SUARA_P4 = "Kurang cocok kalau coretan miringnya tidak melintang pada empat garis tegak.";
const PS = turus("ps", 130, 52, 9, 36, 8);
const PB = turus("pb", 40, 60, 20, 34, 6);

export const ADEGAN_LUAR_TURUS_TERAPAN: AdeganStory = {
  id: "luar-turus-terapan",
  judul: "Tally Groups: terapan",
  sumber: "Metode global: Tally Groups (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Lampu Sepeda"), ...halaman("hl", 150), ...tokoh("sl", 36, 184, "Salsa")),
      tambah("lampu", emo("lp", 90, 110, "\u{1F4A1}", 22)),
      tambah("sepeda", ...sepeda("sp", 90, 140, 1)),
      tambah("mati", emo("xs", 120, 100, E.salah, 16)),
      tambah("turus", kotak("kc", 126, 40, 150, 84, W.putih, W.coklat, { rx: 4, z: 1 })),
    ),
    k(
      SUARA_P2,
      tambah("satu", ...PS.filter((o) => o.id.includes("-b")), teks("n1", 143, 112, "1 bundel", 9, W.ungu)),
      tambah("empat", ...PS.filter((o) => o.id.includes("-s")), teks("n4", 190, 112, "4 garis", 9, W.ungu)),
      tambah("sembilan.", teks("n9", 210, 74, "= 9", 16, W.merah)),
    ),
    k(
      SUARA_P3,
      hapus(0, ...PS.map((o) => o.id), "n1", "n4", "n9", "kc", "lp", "xs", ...idSepeda("sp")),
      tambah("Cocok", emo("ok", 262, 150, E.benar, 20)),
      tambah("banyak,", ...PB),
      tambah("salah", emo("sl2", 150, 130, E.senyum, 20)),
      tambah("mengulang.", teks("mg", 150, 160, "tanpa ulang", 10, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      hapus(0, ...PB.map((o) => o.id), "ok", "sl2", "mg"),
      tambah("Kurang", emo("xs2", 262, 150, E.salah, 20)),
      tambah("coretan", ...[0, 1, 2, 3].map((i) => garis(`z${i}`, 80 + i * 10, 60, 0, 40, W.biru, 2, { z: 2 })), garis("zm", 140, 96, 30, -34, W.merah, 2, { z: 3 })),
      tambah("tidak", teks("tm", 170, 128, "tidak melintang", 9, W.merah)),
      tambah("empat", teks("t4", 95, 124, "4 garis tegak", 9, W.ungu)),
    ),
  ],
};
