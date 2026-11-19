import type { AdeganStory } from "./logika-story";
import { E, W, deretPerahu, dermaga, emo, judul, laut, papanJatah, papanSusun, teks, tokoh } from "./k4b1g-gambar";
import { k, sorotkan, tambah } from "./k4b1g-bantu";

/*
 * Cerita orisinal IGIL "Baris Perahu Bu Marni" (Kelas 4 Bab 1 Sub-Bab G), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1g.md. Bagian ini: perkalian bersusun pendek, sebelas penumpang tiap perahu, dan penutup yang menjembatani ke Sub-Bab H.
 */

/* ------------------------------ 7. Bersusun ------------------------------ */
const SUARA_B1 = "Bu Marni menunjukkan cara bersusun yang lebih pendek.";
const SUARA_B2 = "Dua kali lima sepuluh, ditulis nol dan satu disimpan, lalu satu kali lima ditambah satu simpanan sama dengan enam.";
const SUARA_B3 = "Hasilnya enam nol, yaitu enam puluh.";

export const ADEGAN_BERSUSUN: AdeganStory = {
  id: "bersusun",
  judul: "Kali bersusun pendek",
  sumber: "Materi: perkalian bersusun",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Hitung Bersusun"), ...dermaga("dm", 166), ...tokoh("bm", 30, 184, "Bu Marni")),
      tambah("cara", ...papanSusun("ps", 100, 34, 12, 5)),
      tambah("pendek.", teks("pd", 250, 70, "lebih pendek", 9, W.ungu)),
    ),
    k(
      SUARA_B2,
      tambah(0, teks("m1", 250, 56, "2 × 5 = 10", 10, W.biru)),
      tambah("ditulis", teks("r0", 152, 102, "0", 18, W.merah)),
      tambah("disimpan,", teks("cy", 130, 40, "1", 10, W.ungu)),
      tambah("kali@2", teks("m2", 250, 96, "1 × 5 + 1 = 6", 10, W.biru)),
      tambah("enam.", teks("r1", 130, 102, "6", 18, W.merah)),
    ),
    k(
      SUARA_B3,
      sorotkan(0, "r1", "r0"),
      tambah("yaitu", teks("h60", 250, 140, "60", 26, W.merah)),
      tambah("puluh.", emo("ok", 250, 112, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 8. Perbandingan ------------------------------ */
const SUARA_P1 = "Genta bertanya, bagaimana kalau tiap perahu hanya memuat sebelas penumpang?";
const SUARA_P2 = "Laras menghitung, sebelas kali lima sama dengan lima puluh lima.";
const SUARA_P3 = "Dengan cara urai, sepuluh kali lima ditambah satu kali lima, hasilnya sama.";
const LAB11 = [0, 1, 2, 3, 4].map((i) => teks(`r${i + 1}-l`, 70 + 50 * i, 134, "11", 10, W.biru, { z: 3 }));

export const ADEGAN_PERBANDINGAN: AdeganStory = {
  id: "perbandingan",
  judul: "Sebelas penumpang tiap perahu",
  sumber: "Materi: bilangan lain",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bagaimana Kalau?"), ...laut("lt", 96), ...dermaga("dm", 166), ...tokoh("ge", 30, 184, "Genta")),
      tambah("tiap", ...deretPerahu("r", 5, 70, 50, 112, 0.95), teks("n5", 262, 60, "5 perahu", 9, W.ungu)),
      tambah("sebelas", ...LAB11),
      tambah("penumpang?", emo("qs", 262, 86, E.tanya, 22)),
    ),
    k(
      SUARA_P2,
      tambah("Laras", ...tokoh("la", 262, 184, "Laras")),
      tambah("sebelas", teks("e1", 130, 56, "11 × 5", 20, W.biru)),
      tambah("lima@3", teks("e2", 205, 56, "= 55", 20, W.merah)),
    ),
    k(
      SUARA_P3,
      tambah("urai,", teks("u1", 100, 84, "10 × 5", 13, W.biru)),
      tambah("ditambah", teks("pl", 150, 84, "+", 14, W.ungu)),
      tambah("satu", teks("u2", 200, 84, "1 × 5", 13, W.biru)),
      tambah("sama.", emo("ok", 262, 112, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (jembatan ke Sub-Bab H) ------------------------------ */
const SUARA_T1 = "Semua perahu sudah penuh, dan Bu Marni berterima kasih pada ketiga anak.";
const SUARA_T2 = "Tiba-tiba Bu Ratna, pengatur kamar, datang membawa daftar tamu yang harus dibagi ke kamar.";
const SUARA_T3 = "Menurutmu, bagaimana cara membagi tamu sama banyak ke beberapa kamar? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Marni!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Bu Ratna datang",
  sumber: "Materi: jembatan ke pembagian",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Semua Penuh"), ...laut("lt", 96), ...dermaga("dm", 166), ...deretPerahu("t", 5, 70, 50, 112, 0.95)),
      tambah("penuh,", ...[0, 1, 2, 3, 4].map((i) => emo(`tm${i}`, 70 + 50 * i, 108, "\u{1F9D1}", 14))),
      tambah("Marni", ...tokoh("bm", 30, 184, "Bu Marni")),
      tambah("anak.", ...tokoh("sa", 80, 184, "Satria"), ...tokoh("la", 125, 184, "Laras"), ...tokoh("ge", 170, 184, "Genta")),
    ),
    k(
      SUARA_T2,
      tambah(0, ...tokoh("br", 262, 184, "Bu Ratna")),
      tambah("pengatur", ...papanJatah("pj", 214, 60, "daftar tamu")),
      tambah("daftar", emo("ls", 247, 52, E.catat, 16)),
    ),
    k(
      SUARA_T3,
      tambah(0, teks("bg", 150, 60, "÷", 30, W.ungu)),
      tambah("kamar?", teks("qm", 190, 56, "?", 26, W.tanya)),
      tambah("Pak", ...tokoh("ph", 215, 184, "Pak Hendro")),
      tambah("Marni!", emo("l1", 20, 140, E.lambai, 18), emo("l2", 150, 140, E.lambai, 18)),
    ),
  ],
};
