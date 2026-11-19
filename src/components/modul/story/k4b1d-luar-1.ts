import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kartu, kotak, kotakTempat, pasir, papanBesar, pohon, teks, tokoh, wadah } from "./k4b1d-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b1d-bantu";

/*
 * Cerita orisinal IGIL "Kios Kelapa Pak Darwis" (Kelas 4 Bab 1 Sub-Bab D), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1d.md. Bagian ini: pembuka (peti perkakas), Break Apart (Pecah Bilangan), dan terapannya.
 */

export const NAMA_METODE = ["Break Apart", "Build Up", "Part-Part-Whole"] as const;
export const NAMA_METODE_ID = ["Pecah Bilangan", "Susun Bilangan", "Bagan Bagian Utuh"] as const;

/** Empat kotak tempat angka pada papan besar, dari ribuan sampai satuan: [kotak, nama] untuk tiap tempat. */
const TEMPAT = [16, 88, 160, 232].map((x, i) => kotakTempat(`t${i + 1}`, x, 84, 60, 44, ["ribuan", "ratusan", "puluhan", "satuan"][i]));

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Siang itu, di belakang kios, Pak Darwis membuka peti perkakasnya yang penuh keranjang bersusun.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk memecah dan menyusun bilangan, supaya tidak ada bagian yang tertinggal.";
const SUARA_O3 = "Tiga cara itu: Break Apart, Build Up, dan Part-Part-Whole.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Pecah Bilangan, Susun Bilangan, dan Bagan Bagian Utuh.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Peti perkakas Pak Darwis",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Di Belakang Kios"), ...pasir("ps", 150)),
      tambah("belakang", pohon("p1", 34, 140, 40)),
      tambah("Pak", ...tokoh("pd", 62, 184, "Pak Darwis")),
      tambah("peti", kotak("pt", 188, 112, 90, 38, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("tt", 182, 100, 102, 12, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("keranjang", ...wadah("s1", 196, 82, 26, 18), ...wadah("s2", 224, 82, 26, 18), ...wadah("s3", 210, 66, 26, 16)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 236, 46, "3 cara", 10, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 90 + i * 34, 40, 30, 30, W.krem, W.biru, { rx: 5 }), emo(`c${i}-e`, 105 + i * 34, 64, [E.pecah, E.susun, E.bagan][i], 18, { z: 3 })])),
      sorotkan("memecah", "c0-k"),
      sorotkan("menyusun", "c1-k"),
      tambah("tertinggal.", emo("ok", 22, 80, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Break", teks("m0", 112, 76, "1. Break Apart", 12, W.biru), emo("i0", 34, 78, E.pecah, 18)),
      tambah("Build", teks("m1", 112, 124, "2. Build Up", 12, W.biru), emo("i1", 34, 126, E.susun, 18)),
      tambah("Part-Part-Whole.", teks("m2", 112, 172, "3. Part-Part-Whole", 12, W.biru), emo("i2", 34, 174, E.bagan, 18)),
    ),
    k(
      SUARA_O4,
      tambah("Pecah", teks("g0", 240, 76, "Pecah Bilangan", 9, W.ungu), garis("l0", 178, 80, 22, 0, W.ungu, 1)),
      tambah("Susun", teks("g1", 240, 124, "Susun Bilangan", 9, W.ungu), garis("l1", 178, 128, 22, 0, W.ungu, 1)),
      tambah("Bagan", teks("g2", 240, 172, "Bagan Bagian Utuh", 9, W.ungu), garis("l2", 178, 176, 22, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Break Apart: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Break Apart, atau Pecah Bilangan.";
const SUARA_C2 = "Sebuah bilangan dipecah menjadi ribuan, ratusan, puluhan, dan satuan.";
const SUARA_C3 = "Setiap bagian ditulis lengkap dengan harga tempatnya, lalu ditambahkan.";
const SUARA_C4 = "Bagian yang berisi nol tidak perlu ditulis.";
const DIGIT = ["4", "8", "0", "6"];

export const ADEGAN_LUAR_PECAH: AdeganStory = {
  id: "luar-pecah",
  judul: "Break Apart: Pecah Bilangan",
  sumber: "Metode global: Break Apart (konsep)",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Break Apart"), papanBesar()),
      tambah("Break", teks("nm", 150, 66, "Break Apart", 16, W.merah, { z: 2 })),
      tambah("Pecah", teks("ni", 150, 90, "Pecah Bilangan", 12, W.biru, { z: 2 })),
      tambah("Bilangan.", emo("pc", 150, 136, E.pecah, 32, { z: 2 })),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Bilangan Dipecah"), papanBesar()),
      tambah("bilangan", teks("bk", 150, 62, "4.806", 24, W.biru, { z: 2 })),
      tambah("ribuan,", TEMPAT[0][0], TEMPAT[0][1], teks("dg1", 46, 116, DIGIT[0], 24, W.biru, { z: 3 })),
      tambah("ratusan,", TEMPAT[1][0], TEMPAT[1][1], teks("dg2", 118, 116, DIGIT[1], 24, W.biru, { z: 3 })),
      tambah("puluhan,", TEMPAT[2][0], TEMPAT[2][1], teks("dg3", 190, 116, DIGIT[2], 24, W.biru, { z: 3 })),
      tambah("satuan.", TEMPAT[3][0], TEMPAT[3][1], teks("dg4", 262, 116, DIGIT[3], 24, W.biru, { z: 3 })),
    ),
    k(
      SUARA_C3,
      tambah("harga", teks("h1", 46, 142, "4.000", 10, W.merah), teks("h2", 118, 142, "800", 10, W.merah), teks("h3", 190, 142, "0", 10, W.merah), teks("h4", 262, 142, "6", 10, W.merah)),
      tambah("ditambahkan.", teks("p1", 82, 144, "+", 14, W.ungu), teks("p2", 154, 144, "+", 14, W.ungu), teks("p3", 226, 144, "+", 14, W.ungu)),
    ),
    k(
      SUARA_C4,
      sorotkan("nol", "t3-k"),
      ubah("tidak", { id: "h3", op: 0.3 }, { id: "p2", op: 0.3 }),
      tambah("tidak", emo("xs", 206, 100, E.salah, 14)),
      tambah("ditulis.", teks("nt", 190, 168, "nol tidak ditulis", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Break Apart: terapan ------------------------------ */
const SUARA_T1 = "Laras memecah enam ribu empat ratus tiga menjadi tiga bagian.";
const SUARA_T2 = "Hasilnya enam ribu, empat ratus, dan tiga, tanpa bagian puluhan.";
const SUARA_T3 = "Cocok untuk melihat isi sebuah bilangan dengan jelas.";
const SUARA_T4 = "Kurang cocok kalau kita hanya perlu satu pemecahan cepat, karena menulis semua bagian lebih lama.";

export const ADEGAN_LUAR_PECAH_TERAPAN: AdeganStory = {
  id: "luar-pecah-terapan",
  judul: "Pecah Bilangan: kapan cocok",
  sumber: "Metode global: Break Apart (terapan)",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Laras Memecah"), papanBesar(), ...tokoh("lr", 40, 184, "Laras")),
      tambah("enam", teks("bk", 150, 62, "6.403", 26, W.biru, { z: 2 })),
      tambah("menjadi", teks("t3", 150, 106, "3 bagian", 14, W.merah, { z: 2 })),
    ),
    k(
      SUARA_T2,
      hapus("Hasilnya", "t3"),
      tambah("enam", ...kartu("a1", 20, 84, 56, 34, W.hijauMuda, ["6.000"], 12, { z: 2 })),
      tambah("empat", ...kartu("a2", 88, 84, 56, 34, W.langit, ["400"], 12, { z: 2 })),
      tambah("tiga,", ...kartu("a3", 156, 84, 56, 34, W.pink, ["3"], 14, { z: 2 })),
      tambah("puluhan.", kotak("a4-k", 224, 84, 56, 34, undefined, W.biru, { rx: 8, putus: true, op: 0.45, z: 2 }), teks("a4-t0", 252, 104, "puluhan", 9, W.biru, { op: 0.6, z: 3 })),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 28, 50, E.benar, 22)),
      tambah("melihat", emo("mt", 62, 144, E.mata, 22)),
      tambah("jelas.", teks("ij", 176, 144, "isi bilangan tampak jelas", 10, W.hijauTua)),
    ),
    k(
      SUARA_T4,
      hapus("Kurang", "ok", "mt", "ij"),
      tambah("Kurang", emo("xs", 28, 50, E.salah, 22)),
      tambah("satu", teks("sp", 150, 144, "1 pemecahan cepat", 11, W.merah)),
      tambah("menulis", teks("sl", 150, 166, "tulis semua bagian: lama", 9, W.coklat)),
    ),
  ],
};
