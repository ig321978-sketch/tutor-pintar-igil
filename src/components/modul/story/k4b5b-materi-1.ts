import type { AdeganStory } from "./logika-story";
import { E, G, W, emo, garis, idKartu, idSerpih, judul, kartu, kotak, lantai, meja, papanNama, poli, serpih, teks, tokoh, type Tt } from "./k4b5b-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b5b-bantu";

/*
 * Cerita orisinal IGIL "Mosaik Pak Rudi" (Kelas 4 Bab 5 Sub-Bab B, menyusun dan menguraikan bangun datar), akhir cerita Toko Keramik Bu Dewi.
 * Naskah suara dari naskah/story-naskah-k4b5b.md. Bagian ini: kotak keping Pak Rudi, menyusun dua segitiga menjadi persegi (komposisi), dan membelah persegi panjang (dekomposisi).
 */

/* ------------------------------ 1. Kotak keping ------------------------------ */
const SUARA_K1 = "Pak Rudi datang ke Toko Keramik Bu Dewi sambil membawa kotak berisi keping keramik yang pecah.";
const SUARA_K2 = "Ia ingin membuat mosaik untuk pameran, dari keping-keping yang masih bagus.";
const SUARA_K3 = "Satria, Laras, dan Genta langsung mengumpulkan keping itu di meja kerja.";

export const ADEGAN_KOTAK: AdeganStory = {
  id: "kotak",
  judul: "Pak Rudi dan kotak keping",
  sumber: "Materi: kotak keping di meja kerja",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kotak Keping Pak Rudi"), ...lantai("lt", 150), ...meja("mj", 14, 232)),
      tambah("Rudi", ...tokoh("pr", 262, 184, "Pak Rudi")),
      tambah("Toko", ...papanNama("pp", 100, 28, 100)),
      tambah("kotak", kotak("kp", 58, 92, 56, 20, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("kt", 54, 86, 64, 8, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("pecah", ...serpih("s1", 58, 70, 4, 15)),
    ),
    k(
      SUARA_K2,
      tambah("mosaik", kotak("fr", 180, 50, 72, 44, undefined, W.ungu, { putus: true, tebal: 2, z: 1 })),
      tambah("pameran", teks("pm", 216, 44, "PAMERAN", 8, W.ungu)),
      sorotkan("keping", ...idSerpih("s1", 4)),
      tambah("bagus", emo("ok", 140, 94, E.benar, 20)),
    ),
    k(
      SUARA_K3,
      tambah("Satria", ...tokoh("sa", 36, 184, "Satria")),
      tambah("Laras", ...tokoh("la", 84, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 132, 184, "Genta")),
      tambah("keping", ...serpih("s2", 130, 98, 4, 16)),
    ),
  ],
};

/* ------------------------------ 2. Menyusun (komposisi) ------------------------------ */
const SUARA_M1 = "Laras menyusun dua keping segitiga yang sama besar, dan keduanya membentuk satu persegi.";
const SUARA_M2 = "Menyusun bagian-bagian menjadi satu bangun yang utuh disebut komposisi.";
const SUARA_M3 = "Pak Rudi menempelkan dua keping itu, dan lahirlah sebuah keramik persegi yang baru.";

const S = 36;
const X0 = 130;
const Y0 = 76;
const SEG_A: Tt[] = [[X0, Y0], [X0, Y0 + S], [X0 + S, Y0 + S]];
const SEG_B: Tt[] = [[X0, Y0], [X0 + S, Y0], [X0 + S, Y0 + S]];
const PERSEGI: Tt[] = [[X0, Y0], [X0 + S, Y0], [X0 + S, Y0 + S], [X0, Y0 + S]];

export const ADEGAN_MENYUSUN: AdeganStory = {
  id: "menyusun",
  judul: "Laras menyusun dua keping",
  sumber: "Materi: menyusun menjadi persegi",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Laras Menyusun Keping"), ...lantai("lt", 150), ...meja("mj", 14, 232)),
      tambah("Laras", ...tokoh("la", 36, 184, "Laras")),
      tambah("dua", teks("n2", 175, 62, "2 keping", 11, W.merah)),
      tambah("segitiga", poli("ta", SEG_A, G.biru), poli("tb", SEG_B, G.kuning, W.biru, { x: 54 })),
      ubah("membentuk", { id: "tb", x: 0 }, { id: "n2", x: 148 }),
      ubah("satu", { id: "n2", isi: "1 persegi" }),
      tambah("persegi", poli("so", PERSEGI, undefined, W.ungu, { tebal: 2.4, z: 5 })),
    ),
    k(
      SUARA_M2,
      sorotkan("Menyusun", "ta", "tb"),
      ubah("satu", { id: "n2", isi: "1 bangun utuh" }),
      tambah("komposisi", ...kartu("kp", 196, 56, 90, 24, W.krem, ["komposisi"], 11)),
    ),
    k(
      SUARA_M3,
      tambah("Rudi", ...tokoh("pr", 262, 184, "Pak Rudi")),
      ubah("dua", { id: "n2", isi: "2 keping" }),
      ubah("lahirlah", { id: "ta", warna: G.hijau, sorot: false }, { id: "tb", warna: G.hijau, sorot: false }),
      tambah("lahirlah", emo("ks1", 112, 94, E.kilau, 18), emo("ks2", 184, 94, E.kilau, 18)),
      ubah("persegi", { id: "n2", isi: "1 persegi baru" }),
    ),
  ],
};

/* ------------------------------ 3. Menguraikan (dekomposisi) ------------------------------ */
const SUARA_U1 = "Genta mengambil keramik persegi panjang dan membelahnya menjadi dua persegi yang sama besar.";
const SUARA_U2 = "Menguraikan satu bangun menjadi bagian-bagiannya disebut dekomposisi.";
const SUARA_U3 = "Bangun yang sama bisa juga dibelah dari sudut ke sudut menjadi dua segitiga.";

const RX = 110;
const RY = 76;
const RW = 72;
const RH = 36;
const PANJANG: Tt[] = [[RX, RY], [RX + RW, RY], [RX + RW, RY + RH], [RX, RY + RH]];

export const ADEGAN_MENGURAIKAN: AdeganStory = {
  id: "menguraikan",
  judul: "Genta membelah keramik",
  sumber: "Materi: menguraikan menjadi bagian",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Genta Membelah Keramik"), ...lantai("lt", 150), ...meja("mj", 14, 232)),
      tambah("Genta", ...tokoh("ge", 36, 184, "Genta")),
      tambah("persegi", poli("rc", PANJANG, G.biru)),
      tambah("membelahnya", garis("bl", RX + RW / 2, RY, 0, RH, W.merah, 2, { putus: true, z: 5 })),
      tambah("dua", teks("n2", 146, 62, "2 persegi", 11, W.merah)),
      hapus("persegi@2", "rc", "bl"),
      tambah("persegi@2", poli("q0", [[RX, RY], [RX + RH, RY], [RX + RH, RY + RH], [RX, RY + RH]], G.biru), poli("q1", [[RX + RH, RY], [RX + RW, RY], [RX + RW, RY + RH], [RX + RH, RY + RH]], G.kuning)),
      ubah("besar", { id: "q1", x: 8 }, { id: "n2", x: 150 }),
    ),
    k(
      SUARA_U2,
      ubah("satu", { id: "q1", x: 0 }, { id: "n2", isi: "1 bangun", x: 146 }),
      ubah("bagian", { id: "q1", x: 8 }, { id: "n2", isi: "2 bagian", x: 150 }),
      sorotkan("bagian-bagiannya", "q0", "q1"),
      tambah("dekomposisi", ...kartu("dk", 196, 56, 90, 24, W.krem, ["dekomposisi"], 10)),
    ),
    k(
      SUARA_U3,
      hapus("Bangun", "q0", "q1", ...idKartu("dk", 1)),
      tambah("Bangun", poli("rc2", PANJANG, G.biru)),
      ubah("sama", { id: "n2", isi: "1 bangun", x: 146 }),
      tambah("sudut", garis("dg", RX, RY, RW, RH, W.merah, 2, { putus: true, z: 5 })),
      hapus("menjadi", "rc2", "dg"),
      tambah("menjadi", poli("t0", [[RX, RY], [RX + RW, RY], [RX + RW, RY + RH]], G.kuning), poli("t1", [[RX, RY], [RX + RW, RY + RH], [RX, RY + RH]], G.hijau)),
      ubah("dua", { id: "n2", isi: "2 segitiga" }),
      ubah("segitiga", { id: "t1", x: -8 }),
    ),
  ],
};
