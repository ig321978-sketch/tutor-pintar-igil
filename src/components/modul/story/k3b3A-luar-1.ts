import type { AdeganStory } from "./logika-story";
import { E, W, batang, emo, garis, judul, kartu, kotak, panah, penggaris, poligon, rumput, teks, tokoh } from "./k3b3A-gambar";
import { bersih, hapus, k, tambah } from "./k3b3A-bantu";

/*
 * Cerita orisinal IGIL "Ukuran Kandang Kak Tari" (Kelas 3 Bab 3 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b3a.md. Bagian ini: pembuka (kotak alat ukur tua), Estimate and Check (Perkirakan dan Periksa), dan terapannya.
 */

export const NAMA_METODE = ["Estimate and Check", "Benchmark Measuring", "Strip Ruler"] as const;
export const NAMA_METODE_ID = ["Perkirakan dan Periksa", "Ukuran Acuan", "Pita Penggaris"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di pondok istirahat, Kak Tari membuka kotak alat ukur tua.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk mengukur dengan cermat, supaya papan nama tidak salah ukuran.";
const SUARA_O3 = "Tiga cara itu: Estimate and Check, Benchmark Measuring, dan Strip Ruler.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Perkirakan dan Periksa, Ukuran Acuan, dan Pita Penggaris.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kotak alat ukur tua Kak Tari",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Pondok Istirahat"), ...rumput("rt", 150)),
      tambah("pondok", kotak("pd", 20, 90, 100, 60, "#E7C48F", "#6B4423", { rx: 2, z: 0 }), poligon("at", [[14, 90], [70, 62], [126, 90]], "#B45309", "#451A03", { z: 1 })),
      tambah("Kak", ...tokoh("kt", 176, 184, "Kak Tari")),
      tambah("kotak", kotak("pt", 212, 132, 56, 20, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("tt", 208, 122, 64, 10, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("ukur", emo("pg", 240, 116, E.penggaris, 16)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 236, 96, "3 cara", 10, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 198 + i * 26, 58, 24, 28, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 210 + i * 26, 76, "cara", 6.4, W.biru)])),
      tambah("papan", ...kartu("pn", 20, 28, 100, 24, "#FDE68A", ["papan nama"], 9)),
      tambah("salah", emo("xs", 140, 46, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Mengukur"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Estimate", teks("m0", 120, 70, "1. Estimate and Check", 10, W.biru), emo("i0", 30, 72, "\u{1F50D}", 16)),
      tambah("Benchmark", teks("m1", 120, 120, "2. Benchmark Measuring", 10, W.biru), emo("i1", 30, 122, E.kaki, 16)),
      tambah("Strip", teks("m2", 120, 170, "3. Strip Ruler", 10, W.biru), kotak("i2", 16, 164, 28, 8, "#FBCFE8", W.biru, { rx: 1, tebal: 1 })),
    ),
    k(
      SUARA_O4,
      tambah("Perkirakan", teks("g0", 244, 70, "Perkirakan dan Periksa", 8, W.ungu)),
      tambah("Ukuran", teks("g1", 244, 120, "Ukuran Acuan", 8, W.ungu)),
      tambah("Pita", teks("g2", 244, 170, "Pita Penggaris", 8, W.ungu)),
    ),
  ],
};

/* ------------------------------ Estimate and Check: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Estimate and Check, atau Perkirakan dan Periksa.";
const SUARA_C2 = "Sebelum mengukur, kita memperkirakan dulu panjangnya.";
const SUARA_C3 = "Lalu kita mengukur dengan penggaris dan membandingkannya dengan perkiraan.";
const SUARA_C4 = "Kalau jauh berbeda, kita periksa lagi apakah ujungnya sudah di angka nol.";

export const ADEGAN_LUAR_PERKIRAAN: AdeganStory = {
  id: "luar-perkiraan",
  judul: "Estimate and Check: Perkirakan dan Periksa",
  sumber: "Metode global: Estimate and Check (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Estimate and Check"), ...penggaris("pr", 30, 128, 24, 10, 2)),
      tambah("Estimate", emo("mg", 150, 94, "\u{1F50D}", 36)),
      tambah("Perkirakan", teks("nm", 150, 172, "Perkirakan dan Periksa", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "mg"),
      tambah("Sebelum", teks("tl", 150, 52, "perkiraan dulu", 11, W.merah)),
      tambah("memperkirakan", kotak("pk", 30, 70, 180, 20, undefined, W.merah, { rx: 2, putus: true, z: 1 })),
      tambah("dulu", teks("pq", 120, 85, "?", 14, W.merah)),
    ),
    k(
      SUARA_C3,
      tambah("mengukur", ...batang("uk", 30, 100, 168, 20, "#FDE68A")),
      tambah("penggaris", teks("hk", 246, 114, "hasil ukur", 9, W.hijauTua)),
      tambah("membandingkannya", teks("bd", 246, 82, "perkiraan", 9, W.merah)),
      tambah("perkiraan", teks("ap", 120, 97, "≈", 10, W.biru)),
    ),
    k(
      SUARA_C4,
      tambah("jauh", teks("jb", 150, 40, "jauh berbeda?", 11, W.merah)),
      tambah("periksa", emo("mg", 262, 100, "\u{1F50D}", 24)),
      tambah("ujungnya", garis("pz", 30, 122, 0, 6, W.hijau, 2.4)),
      tambah("nol", teks("z0", 30, 160, "0", 18, W.hijau), emo("ok", 58, 158, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ Estimate and Check: terapan ------------------------------ */
const SUARA_T1 = "Salsa memperkirakan panjang sikat kandang sekitar dua puluh sentimeter.";
const SUARA_T2 = "Ia mengukurnya dan mendapat dua puluh dua sentimeter, jadi perkiraannya dekat.";
const SUARA_T3 = "Cocok untuk menangkap kesalahan baca yang besar, misalnya salah mulai dari angka dua.";
const SUARA_T4 = "Kurang cocok kalau butuh ukuran yang pas, karena perkiraan hanya dugaan.";

export const ADEGAN_LUAR_PERKIRAAN_TERAPAN: AdeganStory = {
  id: "luar-perkiraan-terapan",
  judul: "Estimate and Check: sikat kandang",
  sumber: "Metode global: Estimate and Check (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Sikat Kandang Salsa"), ...rumput("rt", 150)),
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("sikat", kotak("sk", 30, 96, 170, 12, "#B7814A", W.coklat, { rx: 2, z: 1 }), kotak("sh", 200, 92, 50, 20, "#FDE68A", W.coklat, { rx: 2, z: 1 })),
      tambah("sekitar", teks("n20", 160, 70, "≈ 20 cm", 16, W.merah)),
      tambah("dua", panah("pa", 250, 82, 0, 8, W.merah, 2.2)),
    ),
    k(
      SUARA_T2,
      tambah("mendapat", ...penggaris("pr", 30, 112, 24, 10, 2)),
      tambah("dua", teks("n22", 150, 150, "22 cm", 16, W.hijauTua)),
      tambah("jadi", emo("ok", 270, 150, E.benar, 18)),
      tambah("dekat.", teks("dk", 232, 150, "dekat", 11, W.hijauTua)),
    ),
    k(
      SUARA_T3,
      hapus(0, "n20", "pa"),
      tambah("Cocok", emo("ok2", 262, 50, E.benar, 24)),
      tambah("kesalahan", kotak("sm", 50, 68, 220, 12, undefined, W.merah, { rx: 2, putus: true, z: 2 })),
      tambah("mulai", teks("m2", 50, 62, "mulai di 2", 9, W.merah)),
      tambah(12, panah("pb", 50, 82, 0, 10, W.merah, 2)),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok2", "sm", "m2", "pb"),
      tambah("Kurang", emo("xs", 262, 50, E.salah, 24)),
      tambah("ukuran", teks("hp", 110, 56, "harus pas", 12, W.merah)),
      tambah("perkiraan", teks("ap", 110, 76, "perkiraan ≈", 11, W.biru)),
      tambah("dugaan", emo("pk", 212, 70, E.pikir, 20)),
    ),
  ],
};
