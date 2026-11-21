import type { AdeganStory } from "./logika-story";
import { E, W, baki, bulat, deretKlepon, deretOnde, emo, garis, judul, kartu, lantai, parutan, piring, teks, tokoh } from "./k5b2c-gambar";
import { bersih, k, tambah, ubah } from "./k5b2c-bantu";

/*
 * Cerita orisinal IGIL "Klepon Bu Wati" (Kelas 5 Bab 2 Sub-Bab C), lanjutan: salah langkah Fajar (membuang satu dan dua belas dari faktor), Citra memeriksanya,
 * dan onde-onde delapan belas butir dengan pasangan faktornya. Naskah suara dari naskah/story-naskah-k5b2c.md.
 */

/* ------------------------------ 4. Salah langkah Fajar ------------------------------ */
const SUARA_S1 = "Fajar menyebut faktor dua belas hanya dua, tiga, empat, dan enam.";
const SUARA_S2 = "Satu dan dua belas tidak dihitung, katanya, karena itu terlalu mudah.";
const SUARA_S3 = "Kalau aku salah, aku memarut semua kelapa untuk klepon Bu Wati, katanya sambil mengangkat parutan.";

export const ADEGAN_SALAH_BUANG: AdeganStory = {
  id: "salah-buang",
  judul: "Fajar membuang faktor",
  sumber: "Materi: salah langkah Fajar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Fajar membuang faktor"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("belas", teks("fz", 170, 44, "faktor 12", 13, W.merah, { z: 3 })),
      tambah("dua@2", ...kartu("g0", 75, 66, 38, 34, W.daun, "2", 14)),
      tambah("tiga", ...kartu("g1", 119, 66, 38, 34, W.kapur, "3", 14)),
      tambah("empat", ...kartu("g2", 163, 66, 38, 34, W.daun, "4", 14)),
      tambah("enam", ...kartu("g3", 207, 66, 38, 34, W.kapur, "6", 14)),
    ),
    k(
      SUARA_S2,
      tambah(0, ...kartu("g4", 119, 112, 38, 34, W.pink, "1", 14)),
      tambah("belas", ...kartu("g5", 163, 112, 46, 34, W.pink, "12", 14)),
      tambah("tidak", emo("x1", 138, 136, E.salah, 20, { z: 4 }), emo("x2", 186, 136, E.salah, 20, { z: 4 })),
      tambah("mudah", teks("tm", 244, 136, "terlalu mudah", 9, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Taruhan Fajar"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar"), teks("tr", 170, 44, "Kalau salah: parut semua kelapa", 9, W.merah, { z: 3 })),
      tambah("memarut", ...parutan("pt", 130, 118)),
      tambah("kelapa", emo("kp1", 100, 96, E.kelapa, 20, { z: 3 }), emo("kp2", 140, 96, E.kelapa, 20, { z: 3 }), emo("kp3", 180, 96, E.kelapa, 20, { z: 3 })),
      tambah("Wati", ...tokoh("bw", 260, 184, "Bu Wati")),
      tambah("parutan", emo("sn", 84, 150, E.senyum, 20, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 5. Citra memeriksa ------------------------------ */
const SUARA_C1 = "Citra menunjukkan satu piring berisi dua belas klepon: tidak ada sisa, jadi dua belas dan satu faktor juga.";
const SUARA_C2 = "Dua belas piring masing-masing berisi satu klepon juga tidak bersisa.";
const SUARA_C3 = "Fajar memarut kelapa sampai lengannya pegal, dan Bu Wati tertawa sambil memijat bahunya.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Citra memeriksa",
  sumber: "Materi: memeriksa faktor",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Citra memeriksa"), ...lantai("lt", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("satu", teks("lb", 150, 44, "1 piring: 12", 11, W.coklat, { z: 3 })),
      tambah("piring", piring("pp", 150, 96, 36)),
      tambah("klepon", ...deretKlepon("kk", 124, 80, 12, 4, 17, 16)),
      tambah("sisa", teks("ts", 150, 147, "tanpa sisa", 11, W.merah, { z: 3 })),
      tambah("faktor", teks("fk", 240, 96, "1 dan 12 faktor", 10, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Citra memeriksa"), ...lantai("lt", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("belas", teks("lb2", 175, 44, "12 piring, isi 1", 11, W.coklat, { z: 3 })),
      tambah(
        "piring",
        ...Array.from({ length: 12 }, (_, i) => bulat(`q${i}`, 100 + (i % 6) * 34, 72 + Math.floor(i / 6) * 36, 12, W.putih, W.hijauTua, { tebal: 1.6, z: 1 })),
      ),
      tambah("klepon", ...Array.from({ length: 12 }, (_, i) => emo(`ql${i}`, 100 + (i % 6) * 34, 77 + Math.floor(i / 6) * 36, E.klepon, 12, { z: 3 }))),
      tambah("bersisa", teks("bs", 175, 142, "tidak bersisa", 11, W.merah, { z: 3 }), emo("ok", 262, 142, E.benar, 16, { z: 3 })),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Kelapa untuk Bu Wati"), ...lantai("lt", 150), ...tokoh("fj", 60, 184, "Fajar")),
      tambah("memarut", ...parutan("pt", 90, 118)),
      tambah("kelapa", emo("kp1", 100, 96, E.kelapa, 20, { z: 3 }), emo("kp2", 130, 96, E.kelapa, 20, { z: 3 })),
      tambah("pegal", emo("pg", 68, 126, E.pegal, 18, { z: 3 })),
      tambah("Wati", ...tokoh("bw", 240, 184, "Bu Wati")),
      tambah("memijat", emo("tw", 240, 126, E.tertawa, 22, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 6. Onde-onde ------------------------------ */
const SUARA_O1 = "Bu Wati membawa onde-onde: delapan belas butir, dan Bima mencari semua faktornya.";
const SUARA_O2 = "Satu berpasangan dengan delapan belas, karena satu kali delapan belas sama dengan delapan belas.";
const SUARA_O3 = "Dua berpasangan dengan sembilan, dan tiga berpasangan dengan enam.";

export const ADEGAN_ONDE: AdeganStory = {
  id: "onde",
  judul: "Onde-onde Bu Wati",
  sumber: "Materi: faktor delapan belas",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Onde-onde Bu Wati"), ...lantai("lt", 150), ...tokoh("bw", 40, 184, "Bu Wati")),
      tambah("onde-onde", baki("bk", 96, 72, 128, 62)),
      tambah("delapan", teks("n18", 160, 60, "18 butir", 11, W.merah, { z: 3 })),
      tambah("butir", ...deretOnde("od", 112, 88, 18, 6, 18, 18, 6)),
      tambah("Bima", ...tokoh("bm", 260, 184, "Bima")),
      tambah("faktornya", teks("fq", 160, 148, "faktor 18 = ?", 10, W.biru, { z: 3 })),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Pasangan satu"), ...kartu("p0a", 40, 34, 44, 30, W.daun, "1", 14)),
      tambah("delapan", ...kartu("p0b", 100, 34, 44, 30, W.kapur, "18", 14), garis("l0", 84, 49, 16, 0, W.merah, 2, { z: 2 })),
      tambah("kali", teks("e0", 210, 54, "1 x 18", 11, W.biru, { z: 3 })),
      ubah("sama", { id: "e0", isi: "1 x 18 = 18" }),
    ),
    k(
      SUARA_O3,
      tambah(0, ...kartu("p1a", 40, 74, 44, 30, W.daun, "2", 14)),
      tambah("sembilan", ...kartu("p1b", 100, 74, 44, 30, W.kapur, "9", 14), garis("l1", 84, 89, 16, 0, W.merah, 2, { z: 2 }), teks("e1", 210, 94, "2 x 9 = 18", 11, W.biru, { z: 3 })),
      tambah("tiga", ...kartu("p2a", 40, 114, 44, 30, W.daun, "3", 14)),
      tambah("enam", ...kartu("p2b", 100, 114, 44, 30, W.kapur, "6", 14), garis("l2", 84, 129, 16, 0, W.merah, 2, { z: 2 }), teks("e2", 210, 134, "3 x 6 = 18", 11, W.biru, { z: 3 })),
    ),
  ],
};
