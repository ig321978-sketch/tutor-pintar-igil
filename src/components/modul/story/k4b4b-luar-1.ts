import type { AdeganStory } from "./logika-story";
import { E, W, WL, airEmber, ember, emo, garis, gelas, gelasUkur, idEmber, idKartu, judul, kartu, kotak, lantai, panah, rak, teks, tokoh } from "./k4b4b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b4b-bantu";

/*
 * Cerita orisinal IGIL "Ember Pak Anto" (Kelas 4 Bab 4 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b4b.md. Bagian ini: pembuka (kotak gelas takar Pak Anto), Fill and Pour (Isi dan Tuang), dan terapannya.
 */

export const NAMA_METODE = ["Fill and Pour", "Layer Cubes", "Liter Ladder"] as const;
export const NAMA_METODE_ID = ["Isi dan Tuang", "Susun Lapisan", "Tangga Liter"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di dekat rak ember, Pak Anto membuka kotak yang berisi gelas takar bertanda.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya volume mudah diukur, tanpa salah takar, baik untuk air maupun untuk kubus kecil.";
const SUARA_O3 = "Tiga cara itu: Fill and Pour, Layer Cubes, dan Liter Ladder.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Isi dan Tuang, Susun Lapisan, dan Tangga Liter.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kotak gelas takar Pak Anto",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Sore di Dekat Rak Ember"), ...lantai("lt", 150)),
      tambah("rak", ...rak("rk", 20, 112, 120), ...ember("e1", 30, 74, 34, 38, 0.6), ...ember("e2", 76, 74, 34, 38, 0.3)),
      tambah("Anto", ...tokoh("pa", 262, 184, "Pak Anto")),
      tambah("kotak", kotak("kp", 170, 112, 56, 26, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("kt", 166, 104, 64, 10, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("gelas", ...[0, 1, 2].map((i) => gelas(`gk${i}`, 176 + i * 16, 90, 12))),
    ),
    k(
      SUARA_O2,
      hapus(0, "kp", "kt", "gk0", "gk1", "gk2"),
      tambah("tiga", teks("n3", 236, 138, "3 cara", 11, W.ungu)),
      tambah("volume", ...kartu("cp", 170, 84, 100, 30, W.krem, ["volume"], 10)),
      tambah("salah", emo("ok", 150, 80, E.benar, 20)),
      tambah("air", emo("tt", 190, 126, E.tetes, 20)),
      tambah("kubus", { id: "ku", t: "kotak", x: 230, y: 120, w: 14, h: 14, warna: WL.kubus, garis: W.biru, rx: 1, tebal: 1, z: 2 }),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Fill", teks("m0", 118, 70, "1. Fill and Pour", 10, W.biru), emo("i0", 28, 72, E.gelas, 16)),
      tambah("Layer", teks("m1", 118, 120, "2. Layer Cubes", 10, W.biru), emo("i1", 28, 122, E.dadu, 16)),
      tambah("Liter", teks("m2", 118, 170, "3. Liter Ladder", 10, W.biru), emo("i2", 28, 172, E.tangga, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Isi", teks("g0", 244, 70, "Isi dan Tuang", 8, W.ungu), garis("l0", 178, 74, 30, 0, W.ungu, 1)),
      tambah("Susun", teks("g1", 244, 120, "Susun Lapisan", 8, W.ungu), garis("l1", 178, 124, 30, 0, W.ungu, 1)),
      tambah("Tangga", teks("g2", 244, 170, "Tangga Liter", 8, W.ungu), garis("l2", 178, 174, 30, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Fill and Pour: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Fill and Pour, atau Isi dan Tuang.";
const SUARA_C2 = "Kita mengisi satu wadah dengan air, lalu menuangnya ke gelas ukur bertanda.";
const SUARA_C3 = "Garis tanda pada gelas ukur menunjukkan volume air dalam mililiter.";
const SUARA_C4 = "Pastikan mata sejajar dengan permukaan air supaya pembacaan tidak meleset, dan letakkan gelas ukur di tempat yang datar.";

export const ADEGAN_LUAR_ISI: AdeganStory = {
  id: "luar-isi",
  judul: "Fill and Pour: Isi dan Tuang",
  sumber: "Metode global: Fill and Pour (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Fill and Pour"), ...lantai("lt", 150)),
      tambah("Fill", emo("gl", 110, 112, E.gelas, 40)),
      tambah("atau", teks("nm", 150, 140, "Isi dan Tuang", 13, W.ungu)),
      tambah("Tuang", emo("tt", 190, 104, E.tetes, 28)),
    ),
    k(
      SUARA_C2,
      hapus(0, "gl", "tt", "nm"),
      tambah("satu", teks("w1", 85, 52, "1 wadah", 11, W.coklat)),
      tambah("wadah", ...ember("e", 60, 64, 50, 54, 0.9)),
      tambah("menuangnya", panah("ap", 114, 92, 44, 0, W.ungu, 2.4)),
      tambah("gelas", ...gelasUkur("gu", 170, 60, 26, 70, 0)),
      ubah("bertanda", { id: "gu-a", ...airEmber(60, 70, 0.5) }),
    ),
    k(
      SUARA_C3,
      sorotkan("tanda", "gu-s0", "gu-s1", "gu-s2"),
      tambah("volume", teks("va", 240, 70, "volume air", 11, W.hijauTua)),
      ubah("air", { id: "gu-a", ...airEmber(60, 70, 0.75) }),
      tambah("mililiter", teks("ml", 240, 110, "mililiter", 11, W.biru)),
    ),
    k(
      SUARA_C4,
      tambah("mata", emo("ey", 146, 104, E.mata, 24)),
      tambah("sejajar", garis("sj", 130, 79, 62, 0, W.merah, 1.6, { putus: true, z: 5 })),
      sorotkan("permukaan", "gu-a"),
      tambah("datar", garis("dt", 160, 134, 60, 0, W.coklat, 3)),
    ),
  ],
};

/* ------------------------------ Fill and Pour: terapan ------------------------------ */
const SUARA_P1 = "Laras menuang air dari ember kecil ke gelas ukur sampai garis tiga ratus mililiter. Lalu ia menuang seratus mililiter lagi, jadi isinya empat ratus mililiter.";
const SUARA_P2 = "Ia mencatat volumenya beserta satuannya, yaitu mililiter, dan hasilnya sama untuk semua orang yang membaca.";
const SUARA_P3 = "Cocok untuk wadah yang tidak berbentuk kotak, karena kita hanya perlu menuang. Isi beberapa wadah juga mudah dibandingkan dan diurutkan dari yang paling sedikit.";
const SUARA_P4 = "Kurang cocok untuk wadah sangat besar, karena gelas ukurnya terlalu kecil.";

export const ADEGAN_LUAR_ISI_TERAPAN: AdeganStory = {
  id: "luar-isi-terapan",
  judul: "Fill and Pour: terapan",
  sumber: "Metode global: Fill and Pour (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Laras Menuang Air"), ...lantai("lt", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("ember", ...ember("e", 80, 76, 40, 44, 0.7)),
      tambah("gelas", ...gelasUkur("gu", 190, 70, 24, 58, 0.2)),
      tambah("garis", teks("t3", 232, 60, "300 ml", 13, W.merah)),
      sorotkan("tiga", "gu-s1"),
      ubah("tiga", { id: "gu-a", ...airEmber(70, 58, 0.55) }),
      tambah("seratus", teks("jm", 150, 38, "300 ml + 100 ml = 400 ml", 11, W.hijauTua)),
      ubah("empat", { id: "gu-a", ...airEmber(70, 58, 0.75) }),
    ),
    k(
      SUARA_P2,
      tambah("mencatat", ...kartu("ct", 14, 36, 110, 30, W.krem, ["300 ml"], 14)),
      tambah("satuannya", teks("st", 60, 134, "satuan: ml", 9, W.hijauTua)),
      tambah("hasilnya", emo("ok", 150, 70, E.benar, 22)),
      tambah("semua", emo("ey", 250, 110, E.mata, 24)),
    ),
    k(
      SUARA_P3,
      hapus(0, ...idKartu("ct", 1), "st", "ok", "ey"),
      tambah("Cocok", emo("jp", 262, 140, E.jempol, 22)),
      tambah("wadah", teks("wb", 100, 50, "wadah bulat", 11, W.coklat)),
      tambah("kotak", emo("bk", 150, 56, "\u{1F4E6}", 22)),
      tambah("menuang", panah("pp", 124, 100, 50, 0, W.ungu, 2.4)),
      tambah("diurutkan", kotak("b1", 196, 124, 14, 14, WL.air, W.biru, { rx: 1, z: 2 }), kotak("b2", 216, 114, 14, 24, WL.air, W.biru, { rx: 1, z: 2 }), kotak("b3", 236, 104, 14, 34, WL.air, W.biru, { rx: 1, z: 2 })),
      ubah("sedikit", { id: "b1", sorot: true }),
    ),
    k(
      SUARA_P4,
      hapus(0, "jp", "wb", "bk", "pp", "b1", "b2", "b3", "jm"),
      tambah("Kurang", emo("xs", 262, 140, E.salah, 22)),
      hapus("wadah", ...idEmber("e")),
      tambah("wadah", ...ember("eg", 50, 50, 90, 90, 0.8)),
      tambah("besar", teks("wg", 95, 44, "wadah besar", 11, W.merah)),
      tambah("kecil", teks("gk", 202, 142, "kecil", 11, W.merah)),
    ),
  ],
};
