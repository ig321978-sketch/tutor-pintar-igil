import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, idDari, judul, kartu, kotak, laut, pasir, payung, teks, tokoh } from "./k4b1i-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b1i-bantu";

/*
 * Cerita orisinal IGIL "Papan Jadwal Kak Yoga" (Kelas 4 Bab 1 Sub-Bab I), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1i.md. Bagian ini: pembuka (kotak payung Kak Yoga), Factor Pairs (Pasangan Faktor), dan terapannya.
 */

export const NAMA_METODE = ["Factor Pairs", "Multiples List", "Divisibility Check"] as const;
export const NAMA_METODE_ID = ["Pasangan Faktor", "Daftar Kelipatan", "Cek Bagi Habis"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Pagi itu, di pantai, Kak Yoga membuka kotak payungnya yang penuh papan jadwal.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk mengenal faktor dan kelipatan, supaya tidak ada yang terlewat.";
const SUARA_O3 = "Tiga cara itu: Factor Pairs, Multiples List, dan Divisibility Check.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Pasangan Faktor, Daftar Kelipatan, dan Cek Bagi Habis.";
const PETI = [kotak("pt", 130, 110, 90, 34, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("pu", 126, 100, 98, 10, "#A16207", W.coklat, { rx: 3, z: 2 }), ...payung("py", 176, 102, 1.1, "#EF4444")];
const LEMBAR = [0, 1, 2].map((i) => kotak(`pa${i}`, 138 + i * 28, 56, 22, 30, W.putih, W.biru, { rx: 2, z: 2 }));

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kotak payung Kak Yoga",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Pagi di Pantai"), ...pasir("hl", 150)),
      tambah("pantai", ...laut("lt", 30, 100)),
      tambah("Yoga", ...tokoh("ky", 52, 184, "Kak Yoga")),
      tambah("kotak", ...PETI),
      tambah("papan", ...LEMBAR),
      tambah("jadwal", teks("pj", 175, 48, "jadwal", 9, W.coklat)),
    ),
    k(
      SUARA_O2,
      hapus(0, ...idDari(PETI), ...idDari(LEMBAR), "pj"),
      tambah("tiga", teks("n3", 236, 40, "3 cara", 11, W.ungu)),
      tambah("faktor", ...kartu("cf", 120, 60, 70, 36, KUNING_KARTU, ["faktor"], 10)),
      tambah("kelipatan", ...kartu("ck", 200, 60, 80, 36, KUNING_KARTU, ["kelipatan"], 10)),
      tambah("terlewat", emo("ok", 235, 118, E.benar, 20), teks("tl", 150, 128, "tidak ada terlewat", 9, W.hijauTua)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Factor", teks("m0", 120, 70, "1. Factor Pairs", 10, W.biru), emo("i0", 30, 72, E.teka, 16)),
      tambah("Multiples", teks("m1", 120, 120, "2. Multiples List", 10, W.biru), emo("i1", 30, 122, E.daftar, 16)),
      tambah("Divisibility", teks("m2", 120, 170, "3. Divisibility Check", 10, W.biru), emo("i2", 30, 172, E.periksa, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Pasangan", teks("g0", 244, 70, "Pasangan Faktor", 8, W.ungu), garis("l0", 208, 75, 72, 0, W.ungu, 1)),
      tambah("Daftar", teks("g1", 244, 120, "Daftar Kelipatan", 8, W.ungu), garis("l1", 208, 125, 72, 0, W.ungu, 1)),
      tambah("Cek", teks("g2", 244, 170, "Cek Bagi Habis", 8, W.ungu), garis("l2", 208, 175, 72, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Factor Pairs: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Factor Pairs, atau Pasangan Faktor.";
const SUARA_C2 = "Kita mencari dua bilangan yang dikalikan menjadi bilangan itu, mulai dari satu.";
const SUARA_C3 = "Tiap pasangan menghasilkan dua faktor sekaligus.";
const SUARA_C4 = "Kita berhenti kalau pasangannya sudah berulang atau saling bertukar.";

export const ADEGAN_LUAR_PASANGAN: AdeganStory = {
  id: "luar-pasangan",
  judul: "Factor Pairs: Pasangan Faktor",
  sumber: "Metode global: Factor Pairs (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Factor Pairs"), ...pasir("hl", 150)),
      tambah("Factor", emo("jr", 150, 104, E.teka, 36)),
      tambah("Pasangan", teks("nm", 150, 140, "Pasangan Faktor", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "jr", "nm"),
      tambah("dua", teks("n2", 240, 40, "2 bilangan", 10, W.merah)),
      tambah("dikalikan", ...kartu("qa", 56, 66, 50, 40, W.pink, ["?"], 14), teks("tx", 124, 92, "x", 16, W.biru), ...kartu("qb", 142, 66, 50, 40, W.pink, ["?"], 14), teks("sm", 224, 92, "= n", 14, W.biru)),
      ubah("satu", { id: "qa-t0", isi: "1" }),
    ),
    k(
      SUARA_C3,
      hapus(0, "n2", "tx", "sm", "qa-k", "qa-t0", "qb-k", "qb-t0"),
      tambah(0, teks("pr", 150, 60, "3 x 4 = 12", 16, W.biru)),
      tambah("dua", ...kartu("fa", 90, 86, 50, 30, W.hijauMuda, ["3"], 13), ...kartu("fb", 160, 86, 50, 30, W.hijauMuda, ["4"], 13)),
      tambah("faktor", teks("nf", 150, 138, "2 faktor", 12, W.merah)),
      sorotkan("sekaligus", "fa-k", "fb-k"),
    ),
    k(
      SUARA_C4,
      hapus(0, "pr", "fa-k", "fa-t0", "fb-k", "fb-t0", "nf"),
      tambah("berulang", teks("r1", 100, 80, "3 x 4", 14, W.biru)),
      tambah("saling", teks("r2", 200, 80, "4 x 3", 14, W.biru), emo("ar", 150, 80, "\u{2194}", 18)),
      tambah("bertukar", emo("sp", 150, 128, "\u{1F6D1}", 22), teks("st", 150, 160, "berhenti", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ Factor Pairs: terapan ------------------------------ */
const SUARA_P1 = "Laras mencari faktor dua belas, dan mendapat satu dengan dua belas, dua dengan enam, tiga dengan empat.";
const SUARA_P2 = "Jadi faktor dua belas ada enam, yaitu satu, dua, tiga, empat, enam, dan dua belas.";
const SUARA_P3 = "Cocok untuk memastikan tidak ada faktor yang terlewat.";
const SUARA_P4 = "Kurang cocok kalau bilangannya sangat besar, karena pasangannya terlalu banyak.";

export const ADEGAN_LUAR_PASANGAN_TERAPAN: AdeganStory = {
  id: "luar-pasangan-terapan",
  judul: "Factor Pairs: terapan",
  sumber: "Metode global: Factor Pairs (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Faktor Dua Belas"), ...pasir("hl", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("belas", teks("n12", 150, 44, "faktor 12", 12, W.ungu)),
      tambah("satu", ...kartu("p1", 70, 60, 160, 22, W.krem, ["1 x 12"], 10)),
      tambah("dua@3", ...kartu("p2", 70, 86, 160, 22, W.krem, ["2 x 6"], 10)),
      tambah("tiga", ...kartu("p3", 70, 112, 160, 22, W.krem, ["3 x 4"], 10)),
    ),
    k(
      SUARA_P2,
      hapus(0, "n12", "p1-k", "p1-t0", "p2-k", "p2-t0", "p3-k", "p3-t0"),
      tambah("ada", teks("n6", 150, 44, "6 faktor", 12, W.merah)),
      tambah("satu", ...kartu("fk0", 30, 60, 30, 28, W.hijauMuda, ["1"], 12)),
      tambah("dua@2", ...kartu("fk1", 68, 60, 30, 28, W.hijauMuda, ["2"], 12)),
      tambah("tiga", ...kartu("fk2", 106, 60, 30, 28, W.hijauMuda, ["3"], 12)),
      tambah("empat", ...kartu("fk3", 144, 60, 30, 28, W.hijauMuda, ["4"], 12)),
      tambah("enam@2", ...kartu("fk4", 182, 60, 30, 28, W.hijauMuda, ["6"], 12)),
      tambah("belas@2", ...kartu("fk5", 220, 60, 36, 28, W.hijauMuda, ["12"], 12)),
    ),
    k(
      SUARA_P3,
      tambah(0, emo("ok", 262, 120, E.benar, 22)),
      tambah("memastikan", emo("lp", 100, 120, E.lupa, 22)),
      tambah("terlewat", teks("lk", 180, 124, "tidak ada terlewat", 9, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      hapus(0, "ok", "lp", "lk"),
      tambah(0, emo("xs", 262, 120, E.salah, 22)),
      tambah("besar", teks("bs", 150, 100, "bilangan sangat besar", 11, W.merah)),
      tambah("pasangannya", teks("q1", 110, 124, "1 x 360", 9, W.biru), teks("q2", 190, 124, "2 x 180", 9, W.biru)),
      tambah("banyak", teks("q3", 110, 142, "3 x 120", 9, W.biru), teks("q4", 190, 142, "4 x 90", 9, W.biru), teks("q5", 150, 158, "...", 12, W.merah)),
    ),
  ],
};
