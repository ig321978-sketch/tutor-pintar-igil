import type { AdeganStory } from "./logika-story";
import { E, W, balok, deretBalok, emo, garis, ikat, judul, kartu, kotak, kotakKarton, lantai, lembar, papanNama, peti, selKosong, teks, tokoh } from "./k4b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b1b-bantu";

/*
 * Cerita orisinal IGIL "Gudang Handuk Pak Laode" (Kelas 4 Bab 1 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1b.md. Bagian ini: pembuka (lemari alat hitung di gudang), Base-Ten Blocks (Balok Cacah), dan terapannya.
 */

export const NAMA_METODE = ["Base-Ten Blocks", "Place Chart", "Digit Swap"] as const;
export const NAMA_METODE_ID = ["Balok Cacah", "Bagan Tempat", "Tukar Tempat"] as const;

const KUNING_KARTU = "#FEF3C7";
const CX = [45, 115, 185, 255];

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Siang itu, di gudang handuk, Pak Laode membuka lemari alat hitungnya yang penuh balok dan bagan.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk memahami tempat angka, supaya banyaknya tiap angka tidak keliru.";
const SUARA_O3 = "Tiga cara itu: Base-Ten Blocks, Place Chart, dan Digit Swap.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Balok Cacah, Bagan Tempat, dan Tukar Tempat.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Lemari alat hitung Pak Laode",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Siang Itu"), ...lantai("hl", 150)),
      tambah("gudang", ...papanNama("gn", 70, 40, "GUDANG HANDUK", 100)),
      tambah("Laode", ...tokoh("pl", 50, 184, "Pak Laode")),
      tambah("lemari", kotak("lm", 130, 50, 110, 92, "#D6A56B", W.coklat, { rx: 3, tebal: 2, z: 0 }), kotak("rk", 136, 98, 98, 4, W.coklat, undefined, { rx: 0, tebal: 0, z: 1 })),
      tambah("balok", ...peti("lp", 140, 60, 24), ...kotakKarton("lk", 170, 64, 20), ...ikat("li", 196, 68, 16)),
      tambah("bagan", ...[0, 1, 2, 3].map((c) => selKosong("lb", 138, 106, 24, c, 22))),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga Cara")),
      tambah("tiga", teks("n3", 236, 40, "3 cara", 10, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 40 + i * 70, 62, 62, 36, KUNING_KARTU, ["cara"], 9))),
      tambah("tempat", ...kartu("dt", 76, 112, 140, 24, "#BFDBFE", ["tempat angka"], 9)),
      tambah("keliru", emo("xs", 250, 126, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Base-Ten", teks("m0", 140, 70, "1. Base-Ten Blocks", 10, W.biru), emo("i0", 30, 72, E.pensil, 16)),
      tambah("Place", teks("m1", 140, 120, "2. Place Chart", 10, W.biru), emo("i1", 30, 122, E.kertas, 16)),
      tambah("Digit", teks("m2", 140, 170, "3. Digit Swap", 10, W.biru), emo("i2", 30, 172, E.lupa, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Balok", teks("g0", 252, 70, "Balok Cacah", 8, W.ungu), garis("l0", 208, 75, 88, 0, W.ungu, 1)),
      tambah("Bagan", teks("g1", 252, 120, "Bagan Tempat", 8, W.ungu), garis("l1", 208, 125, 88, 0, W.ungu, 1)),
      tambah("Tukar", teks("g2", 252, 170, "Tukar Tempat", 8, W.ungu), garis("l2", 208, 175, 88, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Base-Ten Blocks: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Base-Ten Blocks, atau Balok Cacah.";
const SUARA_C2 = "Ada balok untuk satuan, puluhan, ratusan, dan ribuan, tiap balok sepuluh kali balok sebelumnya.";
const SUARA_C3 = "Kita menyusun balok sebanyak angka pada tiap tempat, lalu menghitung seluruhnya.";
const SUARA_C4 = "Dengan balok, banyaknya sebuah angka dapat dilihat dan dipegang.";
const NM = ["satuan", "puluhan", "ratusan", "ribuan"];

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Base-Ten Blocks: Balok Cacah",
  sumber: "Metode global: Base-Ten Blocks (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Base-Ten Blocks"), ...lantai("hl", 150)),
      tambah("Base-Ten", ...peti("pb", 124, 56, 52)),
      tambah("Balok", teks("nm", 150, 140, "Balok Cacah", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, ...peti("pb", 0, 0).map((o) => o.id), "nm"),
      tambah("satuan", ...balok("lembar", "bl", CX[0] - 13, 60), teks("la", CX[0], 118, NM[0], 8.4, W.coklat)),
      tambah("puluhan", ...balok("ikat", "bi", CX[1] - 13, 60), teks("lb", CX[1], 118, NM[1], 8.4, W.coklat)),
      tambah("ratusan", ...balok("kotak", "bk", CX[2] - 13, 60), teks("lc", CX[2], 118, NM[2], 8.4, W.coklat)),
      tambah("ribuan", ...balok("peti", "bp", CX[3] - 13, 60), teks("ld", CX[3], 118, NM[3], 8.4, W.coklat)),
      tambah("sepuluh", teks("x1", 80, 92, "× 10", 10, W.merah), teks("x2", 150, 92, "× 10", 10, W.merah), teks("x3", 220, 92, "× 10", 10, W.merah)),
    ),
    k(
      SUARA_C3,
      tambah("menyusun", teks("c0", CX[0], 136, "× 4", 11, W.ungu), teks("c1", CX[1], 136, "× 2", 11, W.ungu)),
      tambah("sebanyak", teks("c2", CX[2], 136, "× 1", 11, W.ungu), teks("c3", CX[3], 136, "× 3", 11, W.ungu)),
      tambah("menghitung", teks("tt", 150, 168, "seluruhnya = 3.124", 12, W.hijauTua)),
    ),
    k(
      SUARA_C4,
      sorotkan("balok,", "bl", "bi", "bk", "bp"),
      tambah("dilihat", emo("ey", 60, 186, E.mata, 18)),
      tambah("dipegang", emo("hd", 240, 186, E.tangan, 18)),
    ),
  ],
};

/* ------------------------------ Base-Ten Blocks: terapan ------------------------------ */
const SUARA_P1 = "Genta mengambil dua peti, tiga kotak, dan empat lembar handuk dari gudang.";
const SUARA_P2 = "Balok itu menunjukkan dua ribu tiga ratus empat dengan jelas.";
const SUARA_P3 = "Cocok untuk memahami bahwa satu tempat berharga sepuluh kali tempat di kanannya.";
const SUARA_P4 = "Kurang cocok kalau bilangannya sangat besar, karena baloknya terlalu banyak untuk disusun.";
const SEMUA = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Base-Ten Blocks: terapan",
  sumber: "Metode global: Base-Ten Blocks (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Isi Gudang"), ...lantai("hl", 150), ...tokoh("ge", 40, 184, "Genta")),
      tambah("peti,", ...deretBalok("peti", "q", 110, 52, 2, 22), teks("n0", 110, 96, "2 peti", 9, W.coklat)),
      tambah("kotak,", ...deretBalok("kotak", "w", 180, 56, 3, 16), teks("n1", 180, 96, "3 kotak", 9, W.coklat)),
      tambah("lembar", ...deretBalok("lembar", "e", 250, 62, 4, 11, 2), teks("n2", 250, 96, "4 lembar", 9, W.coklat)),
    ),
    k(
      SUARA_P2,
      sorotkan("Balok", "q0", "q1", "w0", "w1", "w2"),
      tambah("dua", teks("bil", 170, 138, "2.304", 22, W.merah)),
      tambah("jelas", emo("ok", 250, 136, E.benar, 20)),
    ),
    k(
      SUARA_P3,
      hapus(0, "bil", "ok"),
      tambah("Cocok", emo("ok2", 250, 136, E.benar, 20)),
      tambah("satu", teks("t1", 170, 126, "1 tempat", 11, W.ungu)),
      tambah("sepuluh", teks("t2", 170, 144, "= 10 × tempat kanannya", 9, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Terlalu Banyak")),
      tambah("sangat", teks("bs", 150, 50, "9.999", 22, W.merah)),
      tambah("baloknya", ...SEMUA.flatMap((i) => lembar(`z${i}`, 24 + (i % 12) * 22, 76 + Math.floor((i - 20) / 12) * 0, 14))),
      tambah("terlalu", ...SEMUA.flatMap((i) => lembar(`y${i}`, 24 + (i % 12) * 22, 100, 14)), ...SEMUA.flatMap((i) => lembar(`u${i}`, 24 + (i % 12) * 22, 124, 14))),
      tambah("disusun", emo("ps", 150, 168, E.pusing, 24), emo("xs", 214, 168, E.salah, 20)),
    ),
  ],
};

