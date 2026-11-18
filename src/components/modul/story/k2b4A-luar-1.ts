import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, karya, kotak, lantai, meja, panah, pindahTokoh, rak, teks, tokoh } from "./k2b4A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b4A-bantu";

/*
 * Cerita orisinal IGIL "Rak Pameran Pak Hasan" (Kelas 2 Bab 4 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b4a.md. Bagian ini: pembuka (tiga kartu tua tukang kayu), Simon Says (Simon Berkata), dan terapannya.
 */

export const NAMA_METODE = ["Simon Says", "Treasure Map", "Barrier Game"] as const;
export const NAMA_METODE_ID = ["Simon Berkata", "Peta Harta Karun", "Permainan Sekat"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di laci tua rak buatan Pak Hasan, Nia menemukan tiga kartu bergambar milik tukang kayu zaman dulu.";
const SUARA_O2 = "Pak Hasan tersenyum. Itu kartu cara tukang menata barang supaya tidak salah letak!";
const SUARA_O3 = "Tiga cara itu: Simon Says, Treasure Map, dan Barrier Game.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Simon Berkata, Peta Harta Karun, dan Permainan Sekat.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu tua tukang kayu",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kartu Tua Tukang Kayu"), lantai("lt"), ...rak("rk", 24, 70, 104, 96)),
      tambah("laci", kotak("lc", 40, 126, 72, 18, "#FDE68A", W.coklat, { rx: 3, tebal: 1.8, z: 1 })),
      tambah("Hasan,", ...tokoh("ph", 272, 178, "Pak Hasan")),
      tambah("Nia", ...tokoh("ni", 150, 178, "Nia")),
      tambah("bergambar", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 146 + i * 46, 86, 40, 34, W.krem, ["kartu"], 8))),
      tambah("tiga", teks("n3", 188, 70, "3 kartu", 10, W.ungu)),
      ubah("dulu.", ...[0, 1, 2].map((i) => ({ id: `c${i}-k`, warna: "#FDE68A" }))),
    ),
    k(
      SUARA_O2,
      ubah("tersenyum.", { id: "ph", isi: E.senyum }),
      sorotkan("kartu", "c0-k", "c1-k", "c2-k"),
      tambah("menata", karya("m1", "guci", 190, 152), karya("m2", "kendi", 222, 152)),
      tambah("salah", emo("x2", 206, 128, E.salah, 16)),
      tambah("letak!", emo("y2", 150, 120, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Tukang Kayu")),
      tambah("Tiga", teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Simon", teks("m0", 100, 66, "1. Simon Says", 13, W.biru), emo("i0", 246, 68, E.bicara, 22)),
      tambah("Treasure", teks("m1", 100, 112, "2. Treasure Map", 13, W.biru), emo("i1", 246, 114, E.peta, 22)),
      tambah("Barrier", teks("m2", 100, 158, "3. Barrier Game", 13, W.biru), kotak("i2", 238, 142, 8, 26, "#60A5FA", "#1D4ED8", { rx: 2, tebal: 1.6 })),
    ),
    k(
      SUARA_O4,
      tambah("Simon", teks("n0", 222, 82, "Simon Berkata", 10, W.ungu)),
      tambah("Peta", teks("n1", 222, 128, "Peta Harta Karun", 10, W.ungu)),
      tambah("Permainan", teks("n2", 222, 174, "Permainan Sekat", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Simon Says: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Simon Says, atau Simon Berkata.";
const SUARA_C2 = "Satu orang menjadi Simon dan memberi perintah posisi, misalnya, Simon berkata, taruh bola di atas meja.";
const SUARA_C3 = "Yang lain hanya boleh bergerak bila perintah diawali kata Simon berkata.";
const SUARA_C4 = "Perintah tanpa kata itu harus diabaikan, jadi kita harus mendengar dengan teliti.";

export const ADEGAN_LUAR_SIMON: AdeganStory = {
  id: "luar-simon",
  judul: "Simon Says: Simon Berkata",
  sumber: "Metode global: Simon Says (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Simon Says"), lantai("lt")),
      tambah("Simon", emo("si", 150, 150, E.anak, 34)),
      tambah("Says,", ...kartu("gb", 96, 56, 108, 30, W.putih, ["Simon berkata..."], 9)),
      tambah("Berkata.", teks("sn", 150, 174, "Simon Berkata", 10, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "gb-k", "gb-t0", "sn"),
      tambah("Satu", teks("n1", 56, 50, "1 orang", 10, W.merah)),
      ubah("Simon", { id: "si", x: 56, y: 166 }),
      tambah("Simon@2", ...kartu("gb2", 84, 62, 130, 38, W.putih, ["Simon berkata:", "taruh bola di atas meja"], 8.4)),
      tambah("taruh", meja("mj", 170, 134, 80)),
      tambah("bola", emo("bl", 120, 150, E.bola, 18)),
      ubah("atas", { id: "bl", x: 210, y: 131 }),
    ),
    k(
      SUARA_C3,
      tambah("lain", ...tokoh("dk", 250, 178, "Dika")),
      ubah("bergerak", ...pindahTokoh("dk", 214, 178, "Dika")),
      sorotkan("Simon", "gb2-t0"),
      tambah("berkata.", emo("ok", 226, 112, E.benar, 22)),
    ),
    k(
      SUARA_C4,
      hapus(0, "gb2-k", "gb2-t0", "gb2-t1", "ok", "bl"),
      tambah(0, ...kartu("gb3", 84, 62, 130, 30, W.merahMuda, ["taruh bola di bawah meja"], 8.4)),
      tambah("tanpa", emo("xk", 234, 76, E.salah, 22)),
      tambah("mendengar", emo("td", 150, 128, E.telinga, 24)),
      ubah("diabaikan,", { id: "dk", isi: E.pikir }),
    ),
  ],
};

/* ------------------------------ Simon Says: terapan ------------------------------ */
const SUARA_T1 = "Chacha menjadi Simon. Simon berkata, taruh guci di bawah rak, dan Dika mengerjakannya.";
const SUARA_T2 = "Lalu Chacha berkata, pindahkan guci ke atas rak, tanpa kata Simon, dan Dika diam saja.";
const SUARA_T3 = "Cocok kalau kita ingin melatih telinga pada kata posisi.";
const SUARA_T4 = "Kurang cocok kalau tidak ada yang bisa menjadi Simon, karena perintahnya harus diucapkan orang lain.";

export const ADEGAN_LUAR_SIMON_TERAPAN: AdeganStory = {
  id: "luar-simon-terapan",
  judul: "Simon Says: Chacha jadi Simon",
  sumber: "Metode global: Simon Says (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Chacha Jadi Simon"), lantai("lt"), ...rak("rk", 110, 90, 100, 76)),
      tambah("Chacha", ...tokoh("ch", 36, 178, "Chacha"), ...tokoh("dk", 270, 178, "Dika")),
      tambah("berkata,", ...kartu("gb", 20, 52, 130, 30, W.putih, ["Simon berkata: taruh", "guci di bawah rak"], 7.6)),
      tambah("guci", karya("gc", "guci", 246, 150)),
      tambah("bawah", panah("pb", 162, 124, 0, 24, W.merah, 2.6)),
      ubah("mengerjakannya.", { id: "gc", ...{ x: 160, y: 155 } }),
    ),
    k(
      SUARA_T2,
      hapus(0, "gb-k", "gb-t0", "gb-t1", "pb"),
      tambah(0, ...kartu("gb2", 20, 52, 130, 30, W.merahMuda, ["pindahkan guci", "ke atas rak"], 7.6)),
      tambah("tanpa", emo("xk", 168, 66, E.salah, 22)),
      tambah("Dika", emo("zz", 262, 138, E.tidur, 22)),
      ubah("diam", { id: "dk", isi: E.pikir }),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), lantai("lt")),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("telinga", emo("td", 70, 100, E.telinga, 34)),
      tambah("kata", ...kartu("cc", 70, 120, 160, 26, W.hijauMuda, ["kata posisi"], 10)),
      sorotkan("posisi.", "cc-k"),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), lantai("lt")),
      tambah("Kurang", emo("xs", 236, 84, E.salah, 28)),
      tambah("tidak", emo("tq", 90, 120, E.tanya, 30), emo("an", 50, 150, E.anak, 30)),
      tambah("Simon,", ...kartu("kc", 50, 140, 200, 26, W.merahMuda, ["tidak ada yang jadi Simon"], 9.4)),
      tambah("diucapkan", emo("lm", 232, 128, E.bicara, 22)),
    ),
  ],
};
