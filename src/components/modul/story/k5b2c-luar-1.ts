import type { AdeganStory } from "./logika-story";
import { E, W, baki, deretKlepon, emo, garis, judul, kartu, lantai, pita, teks, tokoh } from "./k5b2c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b2c-bantu";

/*
 * Cerita orisinal IGIL "Klepon Bu Wati" (Kelas 5 Bab 2 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b2c.md. Bagian ini: pembuka (baki menunggu ditata), Cut and Count (Potong dan Hitung), dan terapannya.
 */

export const NAMA_METODE = ["Cut and Count", "Pair Up", "Divide Check"] as const;
export const NAMA_METODE_ID = ["Potong dan Hitung", "Pasangkan", "Cek Bagi"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di baki Bu Wati, klepon menunggu ditata, dan semua faktornya harus ditemukan.";
const SUARA_O2 = "Ada tiga cara supaya daftar faktor tidak ada yang tertinggal.";
const SUARA_O3 = "Tiga cara itu: Cut and Count, Pair Up, dan Divide Check.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Potong dan Hitung, Pasangkan, dan Cek Bagi.";

const WARNA_CARA = [W.daun, W.langit, W.pink];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Baki menunggu ditata",
  sumber: "Metode global: pembuka",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Baki menunggu ditata"), ...lantai("lt", 150), baki("bk", 84, 70, 124, 52)),
      tambah("Wati", ...tokoh("bw", 40, 184, "Bu Wati")),
      tambah("klepon", ...deretKlepon("kl", 101, 88, 12, 6, 17, 18)),
      tambah("faktornya", teks("fq", 146, 58, "faktor = ?", 12, W.merah, { z: 3 })),
      tambah("ditemukan", emo("cr", 250, 110, E.cari, 26, { z: 3 })),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga cara"), ...lantai("lt", 150)),
      tambah("tiga", teks("n3", 150, 38, "3 cara", 13, W.merah, { z: 3 })),
      tambah("cara", ...[0, 1, 2].flatMap((i) => kartu(`q${i}`, 10 + i * 96, 56, 88, 50, WARNA_CARA[i], "?", 22))),
      tambah("daftar", teks("dl", 150, 126, "daftar faktor", 11, W.coklat, { z: 3 })),
      tambah("tertinggal", emo("ok", 150, 152, E.benar, 26, { z: 3 })),
    ),
    k(
      SUARA_O3,
      ubah("Cut", { id: "q0-t", isi: "Cut and Count", u: 9, y: 84 }),
      ubah("Pair", { id: "q1-t", isi: "Pair Up", u: 9, y: 84 }),
      ubah("Divide", { id: "q2-t", isi: "Divide Check", u: 9, y: 84 }),
    ),
    k(
      SUARA_O4,
      tambah("Potong", teks("i0", 54, 98, "Potong dan Hitung", 8.4, W.coklat, { z: 3 })),
      tambah("Pasangkan", teks("i1", 150, 98, "Pasangkan", 8.4, W.coklat, { z: 3 })),
      tambah("Cek", teks("i2", 246, 98, "Cek Bagi", 8.4, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Cut and Count: konsep ------------------------------ */
const SUARA_P1 = "Cara pertama, Cut and Count, atau Potong dan Hitung.";
const SUARA_P2 = "Kita memotong sebuah pita petak menjadi bagian yang sama panjang, tanpa sisa.";
const SUARA_P3 = "Panjang tiap bagian adalah satu faktor, dan banyak potongan adalah pasangannya, jadi keduanya harus dicatat.";
const SUARA_P4 = "Kita mencoba panjang satu, dua, tiga, dan seterusnya, sampai semua potongan dicoba.";

export const ADEGAN_LUAR_POTONG: AdeganStory = {
  id: "luar-potong",
  judul: "Cut and Count: Potong",
  sumber: "Metode global: Cut and Count (konsep)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 1"), ...lantai("lt", 150), emo("gt", 150, 138, E.gunting, 36, { z: 3 })),
      tambah("Cut", teks("m1", 150, 60, "Cut and Count", 14, W.merah, { z: 3 })),
      tambah("Potong", teks("m2", 150, 84, "Potong dan Hitung", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pita petak"), ...lantai("lt", 150)),
      tambah("pita", ...pita("pt", 30, 70, 12, 20, 0)),
      tambah("bagian", garis("c0", 110, 62, 0, 30, W.merah, 2, { putus: true, z: 4 }), garis("c1", 190, 62, 0, 30, W.merah, 2, { putus: true, z: 4 })),
      tambah("tanpa", teks("ts", 150, 126, "tanpa sisa", 12, W.merah, { z: 3 }), emo("ok", 232, 124, E.benar, 20, { z: 3 })),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Faktor dan pasangannya"), ...lantai("lt", 150), ...pita("pt", 30, 60, 12, 20, 4)),
      tambah("faktor", teks("l1", 150, 100, "1 faktor: panjang 4 petak", 11, W.biru, { z: 3 })),
      tambah("pasangannya", teks("l2", 150, 122, "pasangan: 3 potong", 11, W.hijauTua, { z: 3 })),
      tambah("dicatat", emo("cc", 150, 150, E.catat, 24, { z: 3 })),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Coba panjang berurutan"), ...lantai("lt", 150)),
      tambah("satu", teks("la", 22, 55, "1", 11, W.merah, { z: 3 }), ...pita("ra", 44, 44, 12, 18, 1)),
      tambah("dua", teks("lb", 22, 95, "2", 11, W.merah, { z: 3 }), ...pita("rb", 44, 84, 12, 18, 2)),
      tambah("tiga", teks("lc", 22, 135, "3", 11, W.merah, { z: 3 }), ...pita("rc", 44, 124, 12, 18, 3)),
      tambah("dicoba", emo("ok", 272, 90, E.benar, 24, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Cut and Count: terapan ------------------------------ */
const SUARA_T1 = "Bima memotong pita dua belas petak menjadi bagian dua petak, dan hasilnya enam potong.";
const SUARA_T2 = "Bagian tiga petak menghasilkan empat potong, dan bagian lima petak menyisakan dua petak.";
const SUARA_T3 = "Cocok untuk melihat faktor lewat gambar, karena sisanya langsung kelihatan.";
const SUARA_T4 = "Kurang cocok untuk bilangan besar, karena pitanya terlalu panjang.";

export const ADEGAN_LUAR_POTONG_TERAPAN: AdeganStory = {
  id: "luar-potong-terapan",
  judul: "Potong: kapan cocok",
  sumber: "Metode global: Cut and Count (terapan)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Potong: kapan cocok"), ...lantai("lt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("pita", ...pita("pt", 60, 64, 12, 18, 0)),
      tambah("belas", teks("n12", 168, 52, "12 petak", 11, W.merah, { z: 3 })),
      tambah("bagian", ...[0, 1, 2, 3, 4].map((i) => garis(`ct${i}`, 60 + (i + 1) * 36, 60, 0, 22, W.merah, 1.6, { putus: true, z: 4 }))),
      tambah("dua@2", teks("g2", 168, 100, "2 petak", 11, W.biru, { z: 3 })),
      tambah("enam", teks("p6", 168, 122, "6 potong", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Potong: kapan cocok"), ...lantai("lt", 150)),
      tambah("tiga", ...pita("ra", 44, 44, 12, 18, 3)),
      tambah("empat", teks("t3", 150, 36, "3 petak: 4 potong", 10, W.biru, { z: 3 })),
      tambah("lima", ...pita("rb", 44, 104, 12, 18, 5)),
      tambah("dua", teks("t5", 150, 96, "5 petak: sisa 2", 10, W.merah, { z: 3 })),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Cocok: sisa terlihat"), ...lantai("lt", 150), emo("ok", 266, 100, E.benar, 28, { z: 3 })),
      tambah("gambar", ...pita("rc", 44, 80, 12, 18, 5)),
      sorotkan("sisanya", "rc10", "rc11"),
      tambah("kelihatan", teks("ls", 150, 126, "sisa langsung terlihat", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Pita terlalu panjang"), ...lantai("lt", 150), emo("xx", 266, 40, E.salah, 28, { z: 3 })),
      tambah("besar", teks("bb", 150, 44, "bilangan besar", 12, W.merah, { z: 3 })),
      tambah("pitanya", ...pita("rd", 20, 68, 24, 11.5, 0), ...pita("re", 20, 88, 24, 11.5, 0)),
      tambah("panjang", teks("pj", 150, 126, "pita sangat panjang", 11, W.coklat, { z: 3 })),
    ),
  ],
};
