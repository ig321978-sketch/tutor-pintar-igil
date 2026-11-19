import type { AdeganStory, Obj } from "./logika-story";
import { E, W, angkaTempat, bulat, bungkus, butir, emo, garis, judul, labelTempat, lantai, panah, papanTempat, teks, toples, tokoh } from "./k3b1A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1A-bantu";

/*
 * Cerita orisinal IGIL "Toples Permen Pak Joko" (Kelas 3 Bab 1 Sub-Bab A, bilangan tiga angka), awal cerita Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1a.md. Bagian ini: papan stok tiga tempat, salah baca tujuh ratus tiga, dan cara membaca dari kiri.
 */

/** Isi papan stok: toples, bungkus, dan butir dalam kolom papan; id `${id}{i}` berurut. */
const toplesDi = (id: string, n: number, x0: number, y0: number): Obj[] => Array.from({ length: n }, (_, i) => toples(`${id}${i}`, x0 + (i % 4) * 14, y0 + Math.floor(i / 4) * 26, 13, 17)).flat();
const bungkusDi = (id: string, n: number, x0: number, y0: number): Obj[] => Array.from({ length: n }, (_, i) => bungkus(`${id}${i}`, x0 + (i % 3) * 20, y0 + Math.floor(i / 3) * 18, 16, 12)).flat();
const butirDi = (id: string, n: number, x0: number, y0: number): Obj[] => Array.from({ length: n }, (_, i) => butir(`${id}${i}`, x0 + (i % 3) * 12, y0 + Math.floor(i / 3) * 12, 4));

/* ------------------------------ 4. Papan tempat ------------------------------ */
const SUARA_P1 = "Pak Joko memasang papan stok dengan tiga tempat: ratusan hijau, puluhan biru, satuan merah.";
const SUARA_P2 = "Rak permen jeruk berisi enam toples, tiga bungkus, dan empat butir lepas.";
const SUARA_P3 = "Di papan, enam di ratusan, tiga di puluhan, empat di satuan. Bilangannya enam ratus tiga puluh empat.";

const PX = 80;
const PW = 200;
const PY = 34;
const PH = 120;

export const ADEGAN_PAPAN_TEMPAT: AdeganStory = {
  id: "papan-tempat",
  judul: "Papan stok tiga tempat",
  sumber: "Materi: papan tiga tempat",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Papan Stok"), ...lantai("lt", 160)),
      tambah("Pak", ...tokoh("pj", 36, 184, "Pak Joko")),
      tambah("papan", ...papanTempat("pp", PX, PY, PW, PH, false)),
      tambah("tiga", teks("n3", 36, 120, "3 tempat", 9, W.ungu)),
      tambah("ratusan", labelTempat("pp", PX, PW, PY, 0)),
      tambah("puluhan", labelTempat("pp", PX, PW, PY, 1)),
      tambah("satuan", labelTempat("pp", PX, PW, PY, 2)),
    ),
    k(
      SUARA_P2,
      tambah("enam", ...toplesDi("ts", 6, 88, 58), teks("c6", 113, 134, "6 toples", 8, W.hijauTua)),
      tambah("tiga", ...bungkusDi("bs", 3, 154, 62), teks("c3", 180, 134, "3 bungkus", 8, W.pls)),
      tambah("empat", ...butirDi("bu", 4, 226, 64), teks("c4", 246, 134, "4 butir", 8, W.sat)),
    ),
    k(
      SUARA_P3,
      hapus(0, "c6", "c3", "c4"),
      tambah("enam", angkaTempat("pp", PX, PW, 148, 0, "6", 20)),
      tambah("tiga", angkaTempat("pp", PX, PW, 148, 1, "3", 20)),
      tambah("empat", angkaTempat("pp", PX, PW, 148, 2, "4", 20)),
      tambah("Bilangannya", teks("n634", 190, 188, "634", 16, W.merah)),
      sorotkan("empat@2", "pp-b0", "pp-b1", "pp-b2"),
    ),
  ],
};

/* ------------------------------ 5. Salah baca ------------------------------ */
const SUARA_S1 = "Raka melihat tujuh toples, nol bungkus, dan tiga butir. Ia berseru, itu tujuh puluh tiga! Kalau salah, aku menyapu gudang sendirian!";
const SUARA_S2 = "Salsa menggeleng. Tujuh toples itu tujuh ratus, bukan tujuh puluh.";
const SUARA_S3 = "Bungkusnya nol, tetapi tempat puluhan tetap dijaga dengan angka nol. Jadi bilangannya tujuh ratus tiga.";

const SX = 96;
const SW = 192;
const SY = 28;
const SH = 108;

export const ADEGAN_SALAH_BACA: AdeganStory = {
  id: "salah-baca",
  judul: "Salah baca tujuh ratus tiga",
  sumber: "Materi: salah langkah, nol di puluhan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Raka Membaca Papan"), ...lantai("lt", 150), ...tokoh("rk", 36, 184, "Raka")),
      tambah("melihat", ...papanTempat("sp", SX, SY, SW, SH)),
      tambah("tujuh", ...toplesDi("st", 7, SX + 8, SY + 24), angkaTempat("sp", SX, SW, SY + SH - 6, 0, "7", 18)),
      tambah("nol", angkaTempat("sp", SX, SW, SY + SH - 6, 1, "0", 18)),
      tambah("tiga", ...butirDi("sb", 3, SX + SW - 50, SY + 40), angkaTempat("sp", SX, SW, SY + SH - 6, 2, "3", 18)),
      tambah("seru", emo("ru", 38, 124, E.seru, 18)),
      tambah("puluh", teks("r73", 56, 112, "73", 20, W.merah)),
      tambah("menyapu", emo("sp0", 70, 176, E.sapu, 20)),
    ),
    k(
      SUARA_S2,
      tambah("Salsa", ...tokoh("sl", 128, 184, "Salsa")),
      ubah("menggeleng.", { id: "sl", isi: E.pikir }),
      tambah("Tujuh@2", teks("a700", 216, 160, "7 toples = 700", 9, W.hijauTua)),
      tambah("ratus,", teks("b700", 216, 174, "tujuh ratus", 9, W.hijauTua)),
      tambah("puluh.", teks("x70", 216, 188, "bukan 70", 9, W.merah), emo("xs", 270, 188, E.salah, 12)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Nol Penjaga Tempat"), ...lantai("lt", 150), ...papanTempat("sp", 70, 34, 160, 96)),
      tambah("Bungkusnya", angkaTempat("sp", 70, 160, 112, 0, "7", 30), angkaTempat("sp", 70, 160, 112, 1, "0", 30), angkaTempat("sp", 70, 160, 112, 2, "3", 30)),
      tambah("nol,", bulat("rg", 150, 100, 16, undefined, W.merah, { tebal: 2.6, z: 6 })),
      tambah("dijaga", teks("jg", 150, 148, "dijaga nol", 9, W.merah)),
      tambah("Jadi", teks("r73", 262, 74, "73", 14, W.merah), garis("cr", 250, 82, 24, -16, W.merah, 2.6, { z: 5 })),
      tambah("tiga.", teks("r703", 262, 110, "703", 18, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 6. Cara baca ------------------------------ */
const SUARA_B1 = "Membaca bilangan dimulai dari kiri: ratusan dulu, lalu puluhan, lalu satuan.";
const SUARA_B2 = "Bilangan itu dibaca enam ratus tiga puluh empat.";
const SUARA_B3 = "Angka nol tidak diucapkan, jadi cukup dibaca tujuh ratus tiga.";

const BX = 40;
const BW = 220;
const BY = 56;

export const ADEGAN_CARA_BACA: AdeganStory = {
  id: "cara-baca",
  judul: "Cara membaca dari kiri",
  sumber: "Materi: membaca dari kiri",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Baca dari Kiri"), ...papanTempat("bc", BX, BY, BW, 80)),
      tambah("dimulai", angkaTempat("bc", BX, BW, BY + 66, 0, "6", 30), angkaTempat("bc", BX, BW, BY + 66, 1, "3", 30), angkaTempat("bc", BX, BW, BY + 66, 2, "4", 30)),
      tambah("kiri:", panah("pn", 50, 46, 200, 0, W.merah, 3)),
      sorotkan("ratusan", "bc-b0"),
      sorotkan("puluhan,", "bc-b1"),
      sorotkan("satuan.", "bc-b2"),
    ),
    k(
      SUARA_B2,
      tambah("Bilangan", teks("n634", 150, 160, "634", 20, W.merah)),
      tambah("enam", teks("w0", 77, 176, "enam ratus", 8.4, W.hijauTua)),
      tambah("tiga", teks("w1", 150, 176, "tiga puluh", 8.4, W.pls)),
      tambah("empat.", teks("w2", 223, 176, "empat", 8.4, W.sat)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Nol Tidak Diucapkan"), ...papanTempat("bc", BX, BY, BW, 80), angkaTempat("bc", BX, BW, BY + 66, 0, "7", 30), angkaTempat("bc", BX, BW, BY + 66, 1, "0", 30), angkaTempat("bc", BX, BW, BY + 66, 2, "3", 30)),
      ubah("nol", { id: "bc-d1", sorot: true }),
      tambah("tidak", teks("kt", 150, 158, "tanpa kata", 9, W.merah), emo("xs", 150, 178, E.salah, 14)),
      tambah("tujuh", teks("w0", 77, 158, "tujuh ratus", 8.4, W.hijauTua)),
      tambah("tiga.", teks("w2", 223, 158, "tiga", 8.4, W.sat), teks("n703", 150, 38, "703", 16, W.merah)),
    ),
  ],
};
