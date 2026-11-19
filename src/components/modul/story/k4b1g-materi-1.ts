import type { AdeganStory } from "./logika-story";
import { E, W, dayung, deretPerahu, dermaga, emo, kotak, laut, papanNama, perahu, teks, tokoh, judul } from "./k4b1g-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b1g-bantu";

/*
 * Cerita orisinal IGIL "Baris Perahu Bu Marni" (Kelas 4 Bab 1 Sub-Bab G, perkalian sampai seratus), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1g.md. Bagian ini: perahu berderet, perkalian sebagai penjumlahan berulang, dan salah langkah Satria.
 */
const IDP = [1, 2, 3, 4, 5].map((i) => `p${i}`);

/* ------------------------------ 1. Perahu ------------------------------ */
const SUARA_P1 = "Pagi itu lima perahu wisata berderet di dermaga milik Bu Marni.";
const SUARA_P2 = "Tiap perahu membawa tamu berkeliling pulau, dan tiap perahu penuh.";
const SUARA_P3 = "Bu Marni ingin tahu jumlah penumpang seluruh perahu, lalu meminta bantuan ketiga anak.";

export const ADEGAN_PERAHU: AdeganStory = {
  id: "perahu",
  judul: "Lima perahu di dermaga",
  sumber: "Materi: lima perahu wisata",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Dermaga Bu Marni"), ...laut("lt", 96), ...dermaga("dm", 166), ...papanNama("pn", 150, 34, "DERMAGA WISATA", 100)),
      tambah("lima", ...deretPerahu("p", 5, 70, 50, 126, 0.95), teks("n5", 150, 76, "5 perahu", 11, W.ungu)),
      tambah("Marni.", ...tokoh("bm", 30, 184, "Bu Marni")),
    ),
    k(
      SUARA_P2,
      tambah("tamu", ...[0, 1, 2, 3, 4].map((i) => emo(`tm${i}`, 70 + 50 * i, 110, "\u{1F9D1}", 14))),
      tambah("pulau,", emo("pl", 262, 52, E.palma, 24)),
      sorotkan("penuh.", ...IDP),
      tambah("penuh.", teks("pn2", 150, 98, "penuh", 10, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      hapus(0, "n5"),
      tambah(0, teks("jm", 150, 76, "jumlah = ?", 11, W.merah)),
      tambah("anak.", ...tokoh("sa", 80, 184, "Satria"), ...tokoh("la", 125, 184, "Laras"), ...tokoh("ge", 170, 184, "Genta"), ...tokoh("ph", 215, 184, "Pak Hendro")),
    ),
  ],
};

/* ------------------------------ 2. Susun (penjumlahan berulang) ------------------------------ */
const SUARA_S1 = "Setiap perahu memuat dua belas penumpang.";
const SUARA_S2 = "Dua belas penumpang pada lima perahu, ditulis dua belas kali lima.";
const SUARA_S3 = "Perkalian adalah penjumlahan berulang, yaitu dua belas dijumlahkan lima kali.";
const LAB12 = [0, 1, 2, 3, 4].map((i) => teks(`q${i + 1}-l`, 70 + 50 * i, 134, "12", 10, W.biru, { z: 3 }));

export const ADEGAN_SUSUN: AdeganStory = {
  id: "susun",
  judul: "Dua belas kali lima",
  sumber: "Materi: penjumlahan berulang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Isi Tiap Perahu"), ...laut("lt", 96), ...dermaga("dm", 166), ...deretPerahu("q", 5, 70, 50, 112, 0.95)),
      tambah("dua", ...LAB12),
      tambah("penumpang.", ...tokoh("bm", 30, 184, "Bu Marni")),
    ),
    k(
      SUARA_S2,
      sorotkan("Dua", ...LAB12.map((o) => o.id)),
      tambah("perahu,", teks("n5", 262, 60, "5 perahu", 9, W.ungu)),
      tambah("ditulis", teks("e1", 130, 56, "12 × 5", 22, W.merah)),
    ),
    k(
      SUARA_S3,
      sorotkan("berulang,", "e1"),
      tambah("dua", teks("e2", 150, 84, "12 + 12 + 12 + 12 + 12", 11, W.biru)),
      tambah("kali@2", teks("kl", 262, 84, "5 kali", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Salah puluh ------------------------------ */
const SUARA_H1 = "Satria berseru, sepuluh kali lima lima puluh, ditambah dua, jadi lima puluh dua!";
const SUARA_H2 = "Ia menulis lima puluh dua dengan bangga.";
const SUARA_H3 = "Kalau aku salah, aku mendayung semua perahu sendirian, katanya.";
const DY = [0, 1, 2, 3].map((i) => dayung(`dy${i}`, 120 + 30 * i, 176, 26)).flat();

export const ADEGAN_SALAH_PULUH: AdeganStory = {
  id: "salah-puluh",
  judul: "Satria salah menguraikan",
  sumber: "Materi: salah langkah Satria",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Satria Salah"), ...laut("lt", 120), ...dermaga("dm", 166), ...tokoh("sa", 30, 184, "Satria")),
      tambah("sepuluh", teks("u1", 150, 56, "10 × 5 = 50", 14, W.biru)),
      tambah("ditambah", teks("u2", 150, 80, "+ 2", 14, W.biru)),
      tambah("jadi", teks("u3", 150, 108, "= 52", 18, W.merah)),
      tambah("dua@2", emo("qs", 214, 106, E.tanya, 20)),
    ),
    k(
      SUARA_H2,
      tambah(0, kotak("kt", 198, 44, 68, 44, W.putih, W.coklat, { rx: 4, tebal: 1.8, z: 1 })),
      tambah("menulis", teks("w52", 232, 76, "52", 26, W.merah, { z: 3 })),
      tambah("bangga.", emo("bg", 30, 146, E.senyum, 18)),
    ),
    k(
      SUARA_H3,
      hapus(0, "u1", "u2", "u3", "qs", "bg"),
      tambah("salah,", teks("tr", 240, 34, "taruhan!", 12, W.merah), emo("sr", 58, 150, E.suara, 16)),
      tambah("mendayung", ...DY),
      tambah("perahu", ...perahu("ps", 220, 138, 1.1)),
    ),
  ],
};
