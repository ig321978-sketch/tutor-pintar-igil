import type { AdeganStory } from "./logika-story";
import { E, W, bulat, deretPerahu, dermaga, emo, garis, judul, kartu, laut, papanNama, perahu, teks, tokoh } from "./k4b1g-gambar";
import { bersih, hapus, k, tambah } from "./k4b1g-bantu";

/*
 * Cerita orisinal IGIL "Baris Perahu Bu Marni" (Kelas 4 Bab 1 Sub-Bab G), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1g.md. Bagian ini: pembuka (kotak perahu kecil di dermaga), Repeated Addition (Tambah Berulang), dan terapannya.
 */

export const NAMA_METODE = ["Repeated Addition", "Split and Multiply", "Column Multiply"] as const;
export const NAMA_METODE_ID = ["Tambah Berulang", "Urai Lalu Kali", "Kali Susun"] as const;

const KARTU_WARNA = ["#FEF3C7", "#DCFCE7", "#DBEAFE"];

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, di dermaga, Bu Marni membuka kotak perahu kecilnya yang penuh keping hitungan.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk mengalikan, supaya jumlah penumpang selalu tepat.";
const SUARA_O3 = "Tiga cara itu: Repeated Addition, Split and Multiply, dan Column Multiply.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Tambah Berulang, Urai Lalu Kali, dan Kali Susun.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kotak perahu kecil Bu Marni",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Malam Itu"), ...laut("lt", 120), ...dermaga("dm", 166), emo("bn", 252, 44, "\u{1F319}", 22)),
      tambah("dermaga,", ...papanNama("pn", 140, 34, "DERMAGA WISATA", 100)),
      tambah("Marni", ...tokoh("bm", 30, 184, "Bu Marni")),
      tambah("kotak", ...perahu("kp", 150, 104, 1.8)),
      tambah("keping", ...[0, 1, 2, 3, 4, 5].map((i) => bulat(`kg${i}`, 122 + i * 11, 136, 4.5, W.kuning, "#A16207", { z: 3 }))),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga Cara")),
      tambah("tiga", teks("n3", 150, 44, "3 cara", 14, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 18 + i * 94, 62, 88, 40, KARTU_WARNA[i], [`cara ${i + 1}`], 9))),
      tambah("mengalikan,", teks("kx", 150, 134, "×", 30, W.merah)),
      tambah("tepat.", emo("ok", 150, 172, E.benar, 24)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Repeated", teks("m0", 120, 70, "1. Repeated Addition", 10, W.biru), emo("i0", 30, 72, "\u{2795}", 16)),
      tambah("Split", teks("m1", 120, 120, "2. Split and Multiply", 10, W.biru), emo("i1", 30, 122, "\u{2702}", 16)),
      tambah("Column", teks("m2", 120, 170, "3. Column Multiply", 10, W.biru), emo("i2", 30, 172, "\u{2716}", 16)),
    ),
    k(
      SUARA_O4,
      tambah("Tambah", teks("g0", 244, 70, "Tambah Berulang", 8, W.ungu), garis("l0", 208, 75, 72, 0, W.ungu, 1)),
      tambah("Urai", teks("g1", 244, 120, "Urai Lalu Kali", 8, W.ungu), garis("l1", 208, 125, 72, 0, W.ungu, 1)),
      tambah("Kali@2", teks("g2", 244, 170, "Kali Susun", 8, W.ungu), garis("l2", 208, 175, 72, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Repeated Addition: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Repeated Addition, atau Tambah Berulang.";
const SUARA_C2 = "Perkalian berarti menambahkan bilangan yang sama berkali-kali.";
const SUARA_C3 = "Dua puluh empat kali dua artinya dua puluh empat ditambah dua puluh empat.";
const SUARA_C4 = "Kita menjumlahkan satu per satu sampai semuanya terhitung.";

export const ADEGAN_LUAR_ULANG: AdeganStory = {
  id: "luar-ulang",
  judul: "Repeated Addition: Tambah Berulang",
  sumber: "Metode global: Repeated Addition (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Repeated Addition"), ...laut("lt", 150)),
      tambah("Repeated", emo("jr", 150, 104, "\u{2795}", 36)),
      tambah("Tambah", teks("nm", 150, 140, "Tambah Berulang", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "jr", "nm"),
      tambah(0, teks("e1", 150, 56, "3 × 4", 22, W.biru)),
      tambah("menambahkan", teks("e2", 150, 96, "4 + 4 + 4", 18, W.biru)),
      tambah("berkali-kali.", teks("e3", 150, 130, "= 12", 18, W.merah)),
    ),
    k(
      SUARA_C3,
      hapus(0, "e1", "e2", "e3"),
      tambah(0, teks("f1", 150, 56, "24 × 2", 22, W.biru)),
      tambah("dua@3", teks("f2", 110, 100, "24", 20, W.biru)),
      tambah("ditambah", teks("f3", 150, 100, "+", 20, W.ungu)),
      tambah("dua@4", teks("f4", 190, 100, "24", 20, W.biru)),
      tambah("empat@3", teks("f5", 150, 134, "= 48", 18, W.merah)),
    ),
    k(
      SUARA_C4,
      hapus(0, "f1", "f2", "f3", "f4", "f5"),
      tambah(0, ...[0, 1, 2, 3, 4, 5].map((i) => bulat(`dt${i}`, 90 + i * 24, 90, 8, W.kuning, "#A16207", { z: 2 }))),
      tambah("satu", teks("sp", 150, 130, "1 per 1", 14, W.merah)),
      tambah("terhitung.", teks("sd", 150, 60, "semua terhitung", 11, W.hijauTua), emo("ok", 150, 118, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Repeated Addition: terapan ------------------------------ */
const SUARA_P1 = "Genta menghitung tiga perahu yang masing-masing memuat sepuluh penumpang.";
const SUARA_P2 = "Sepuluh, dua puluh, tiga puluh, jadi tiga puluh penumpang.";
const SUARA_P3 = "Cocok untuk faktor kecil, karena penjumlahan berulangnya pendek.";
const SUARA_P4 = "Kurang cocok kalau faktornya besar, karena penjumlahannya jadi sangat panjang.";
const LAB10 = [0, 1, 2].map((i) => teks(`g${i + 1}-l`, 110 + 60 * i, 142, "10", 10, W.biru, { z: 3 }));

export const ADEGAN_LUAR_ULANG_TERAPAN: AdeganStory = {
  id: "luar-ulang-terapan",
  judul: "Repeated Addition: terapan",
  sumber: "Metode global: Repeated Addition (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tiga Perahu"), ...laut("lt", 96), ...dermaga("dm", 166), ...tokoh("ge", 30, 184, "Genta")),
      tambah("tiga", ...deretPerahu("g", 3, 110, 60, 120, 1.1), teks("n3", 150, 70, "3 perahu", 11, W.ungu)),
      tambah("sepuluh", ...LAB10),
    ),
    k(
      SUARA_P2,
      tambah(0, teks("s1", 110, 96, "10", 12, W.hijauTua)),
      tambah("dua", teks("s2", 170, 96, "20", 12, W.hijauTua)),
      tambah("tiga", teks("s3", 230, 96, "30", 12, W.hijauTua)),
      tambah("penumpang.", teks("t30", 150, 54, "30 penumpang", 11, W.merah)),
    ),
    k(
      SUARA_P3,
      tambah("Cocok", emo("ok", 262, 126, E.benar, 20)),
      tambah("kecil,", teks("fk", 262, 106, "faktor kecil", 9, W.hijauTua)),
      tambah("pendek.", teks("pd", 150, 36, "pendek", 11, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Faktor Besar"), ...laut("lt", 150)),
      tambah("besar,", teks("fb", 150, 54, "9 × 8", 16, W.biru)),
      tambah("penjumlahannya", teks("pj", 150, 92, "9 + 9 + 9 + 9 + 9 + 9 + 9 + 9", 11, W.biru)),
      tambah("panjang.", teks("pg", 150, 128, "sangat panjang", 12, W.merah), emo("xs", 262, 126, E.salah, 22)),
    ),
  ],
};
