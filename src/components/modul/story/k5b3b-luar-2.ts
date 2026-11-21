import type { AdeganStory } from "./logika-story";
import { E, W, bar, campur, emo, judul, kartu, lantai, panah, pec, teks, tokoh } from "./k5b3b-gambar";
import { bersih, hapus, k, tambah } from "./k5b3b-bantu";

/*
 * Video metode global Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno" (penjumlahan pecahan). Naskah suara dari naskah/story-naskah-k5b3b.md.
 * Bagian ini: Match the Bottoms (Samakan Penyebut), Whole Then Part (Bulat Lalu Pecahan), dan ringkasan.
 */

/* ------------------------------ Match the Bottoms: konsep ------------------------------ */
const SUARA_B1 = "Cara kedua, Match the Bottoms, atau Samakan Penyebut.";
const SUARA_B2 = "Cari KPK dari kedua penyebut, lalu ubah tiap pecahan menjadi pecahan yang sama besar dengan penyebut itu.";
const SUARA_B3 = "Sesudah penyebutnya sama, jumlahkan pembilangnya seperti cara pertama.";
const SUARA_B4 = "Hasilnya disederhanakan bila masih bisa.";

export const ADEGAN_LUAR_BAWAH: AdeganStory = {
  id: "luar-bawah",
  judul: "Match the Bottoms",
  sumber: "Metode global: Match the Bottoms",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Match the Bottoms"), emo("rt", 150, 150, E.rantai, 30, { z: 3 })),
      tambah("Match", ...kartu("m1", 20, 40, 260, 34, W.langit, "Match the Bottoms", 14)),
      tambah("Samakan", ...kartu("m2", 20, 84, 260, 34, W.pink, "Samakan Penyebut", 14)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Samakan penyebut")),
      tambah("KPK", ...bar("a1", 20, 44, 3, 1, { lebar: 108, h: 16 }), teks("a1t", 150, 56, "1/3", 12, W.rotiTua, { z: 3 })),
      tambah("kedua", ...bar("a2", 20, 76, 5, 1, { lebar: 110, h: 16, warna: W.biruMuda, garis: W.biruGaris }), teks("a2t", 150, 88, "1/5", 12, W.biruGaris, { z: 3 })),
      tambah("ubah", panah("pa", 170, 66, 24, 0, W.merah, 2, { z: 3 })),
      tambah("sama", ...bar("a3", 202, 44, 15, 5, { lebar: 90, h: 16 }), ...bar("a4", 202, 76, 15, 3, { lebar: 90, h: 16, warna: W.biruMuda, garis: W.biruGaris })),
      tambah("penyebut@2", teks("a5", 150, 126, "KPK 3 dan 5 = 15", 13, W.merah, { z: 3 })),
    ),
    k(
      SUARA_B3,
      tambah("penyebutnya", teks("b1", 80, 150, "5/15", 14, W.rotiTua, { z: 3 })),
      tambah("jumlahkan", teks("b2", 118, 150, "+", 14, W.merah, { z: 3 }), teks("b3", 156, 150, "3/15", 14, W.biruGaris, { z: 3 })),
      tambah("pembilangnya", teks("b4", 194, 150, "=", 14, W.merah, { z: 3 }), teks("b5", 236, 150, "8/15", 14, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Disederhanakan")),
      tambah("Hasilnya", ...bar("s1", 30, 56, 12, 4, { lebar: 120, h: 22 }), teks("s1t", 90, 100, "4/12", 14, W.rotiTua, { z: 3 })),
      tambah("disederhanakan", teks("se", 165, 72, "=", 18, W.merah, { z: 3 }), ...bar("s2", 186, 56, 3, 1, { lebar: 90, h: 22, warna: W.hijau, garis: W.hijauTua }), teks("s2t", 231, 100, "1/3", 14, W.hijauTua, { z: 3 })),
      tambah("bisa", teks("sb", 150, 142, "bagi pembilang dan penyebut", 11, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Match the Bottoms: terapan ------------------------------ */
const SUARA_BT1 = "Bima menjumlahkan satu per tiga dan satu per enam, dengan KPK enam.";
const SUARA_BT2 = "Satu per tiga menjadi dua per enam, lalu ditambah satu per enam, jadi tiga per enam.";
const SUARA_BT3 = "Tiga per enam disederhanakan menjadi satu per dua.";
const SUARA_BT4 = "Cocok untuk pecahan biasa berpenyebut berbeda, tetapi repot kalau penyebutnya besar.";

export const ADEGAN_LUAR_BAWAH_TERAPAN: AdeganStory = {
  id: "luar-bawah-terapan",
  judul: "Match the Bottoms: terapan",
  sumber: "Metode global: Match the Bottoms",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_BT1,
      tambah(0, judul("Bima menjumlahkan"), ...lantai("lt", 150)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("tiga", ...bar("t1", 100, 46, 3, 1, { lebar: 96, h: 18 }), teks("t1t", 240, 59, "1/3", 13, W.rotiTua, { z: 3 })),
      tambah("enam", ...bar("t2", 100, 76, 6, 1, { lebar: 96, h: 18, warna: W.biruMuda, garis: W.biruGaris }), teks("t2t", 240, 89, "1/6", 13, W.biruGaris, { z: 3 })),
      tambah("KPK", teks("kp", 150, 128, "KPK 3 dan 6 = 6", 13, W.merah, { z: 3 })),
    ),
    k(
      SUARA_BT2,
      bersih(0),
      tambah(0, judul("Jumlahkan lewat KPK")),
      tambah("tiga", ...bar("u1", 12, 60, 6, 2, { lebar: 84, h: 18 }), teks("u1t", 54, 98, "2/6", 13, W.rotiTua, { z: 3 })),
      tambah("ditambah", teks("pl", 102, 74, "+", 18, W.merah, { z: 3 }), ...bar("u2", 110, 60, 6, 1, { lebar: 84, h: 18, warna: W.biruMuda, garis: W.biruGaris }), teks("u2t", 152, 98, "1/6", 13, W.biruGaris, { z: 3 })),
      tambah("menjadi", teks("kv", 150, 128, "1/3 = 2/6", 12, W.coklat, { z: 3 })),
      tambah("jadi", teks("sm", 200, 74, "=", 18, W.merah, { z: 3 }), ...bar("u3", 208, 60, 6, 3, { lebar: 84, h: 18, warna: W.hijau, garis: W.hijauTua }), teks("u3t", 250, 98, "3/6", 13, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_BT3,
      hapus("Tiga", "u10", "u11", "u12", "u13", "u14", "u15", "u1t", "kv", "u20", "u21", "u22", "u23", "u24", "u25", "u2t", "pl"),
      tambah("disederhanakan", teks("ss", 150, 126, "3/6 = 1/2", 18, W.merah, { z: 3 })),
      tambah("satu", ...bar("v", 100, 150, 2, 1, { lebar: 100, h: 20, warna: W.hijau, garis: W.hijauTua })),
    ),
    k(
      SUARA_BT4,
      bersih(0),
      tambah(0, judul("Kapan cocok?")),
      tambah("Cocok", emo("ok", 60, 60, E.benar, 24, { z: 3 }), teks("c1", 190, 64, "penyebut berbeda: cocok", 11, W.hijauTua, { z: 3 })),
      tambah("repot", ...bar("rp", 30, 100, 24, 0, { lebar: 240, h: 22 })),
      tambah("besar", teks("c2", 150, 150, "penyebut besar: repot", 12, W.merah, { z: 3 }), emo("xx", 150, 176, E.salah, 20, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Whole Then Part: konsep ------------------------------ */
const SUARA_C1 = "Cara ketiga, Whole Then Part, atau Bulat Lalu Pecahan.";
const SUARA_C2 = "Pada pecahan campuran, jumlahkan bilangan bulatnya sendiri dan pecahannya sendiri.";
const SUARA_C3 = "Kalau penyebut pecahannya berbeda, samakan dulu pecahan itu.";
const SUARA_C4 = "Setelah itu gabungkan hasil bilangan bulat dan hasil pecahan.";

const W3 = campur("wt", 24, 46, 3, 2, 3, { lebar: 84, h: 14 });

export const ADEGAN_LUAR_BULAT: AdeganStory = {
  id: "luar-bulat",
  judul: "Whole Then Part",
  sumber: "Metode global: Whole Then Part",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Whole Then Part"), emo("rt", 150, 150, E.kue, 30, { z: 3 })),
      tambah("Whole", ...kartu("m1", 20, 40, 260, 34, W.pink, "Whole Then Part", 14)),
      tambah("Bulat", ...kartu("m2", 20, 84, 260, 34, W.kapur, "Bulat Lalu Pecahan", 14)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Bulat sendiri, pecahan sendiri"), teks("o1", 80, 50, "2 1/3", 20, W.rotiTua, { z: 3 })),
      tambah("campuran", teks("pl", 150, 50, "+", 20, W.merah, { z: 3 }), teks("o2", 220, 50, "1 1/3", 20, W.biruGaris, { z: 3 })),
      tambah("bulatnya", teks("w1", 150, 100, "bulat: 2 + 1 = 3", 15, W.merah, { z: 3 })),
      tambah("pecahannya", teks("w2", 150, 132, "pecahan: 1/3 + 1/3 = 2/3", 15, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Penyebut berbeda")),
      tambah("penyebut", ...bar("x1", 24, 56, 2, 1, { lebar: 100, h: 22 }), teks("x1t", 74, 100, "1/2", 14, W.rotiTua, { z: 3 })),
      tambah("berbeda", ...bar("x2", 24, 108, 4, 1, { lebar: 100, h: 22, warna: W.biruMuda, garis: W.biruGaris }), teks("x2t", 74, 152, "1/4", 14, W.biruGaris, { z: 3 })),
      tambah("samakan", panah("pa", 140, 80, 30, 0, W.merah, 2, { z: 3 })),
      tambah("itu", ...bar("x3", 186, 56, 4, 2, { lebar: 100, h: 22 }), teks("x3t", 236, 100, "2/4", 14, W.rotiTua, { z: 3 })),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Gabungkan"), ...W3.objs),
      tambah("bilangan", teks("g1", 190, 60, "3", 22, W.merah, { z: 3 })),
      tambah("hasil@2", teks("g2", 190, 96, "+ 2/3", 20, W.hijauTua, { z: 3 })),
      tambah("pecahan", teks("g3", 190, 132, "= 3 2/3", 20, W.hijauTua, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Whole Then Part: terapan ------------------------------ */
const SUARA_CT1 = "Fajar menjumlahkan satu bulat satu per dua dan satu bulat satu per empat.";
const SUARA_CT2 = "Bilangan bulatnya satu ditambah satu sama dengan dua, pecahannya dua per empat ditambah satu per empat sama dengan tiga per empat.";
const SUARA_CT3 = "Gabungannya dua bulat tiga per empat, dan caranya cepat untuk bilangan bulat yang besar.";
const SUARA_CT4 = "Kurang cocok kalau pecahannya sudah lebih dari satu, karena hasilnya harus dirapikan lagi.";

const Q1 = campur("q1", 24, 44, 1, 1, 2, { lebar: 60, h: 14 });
const Q2 = campur("q2", 176, 44, 1, 1, 4, { lebar: 80, h: 14 });

export const ADEGAN_LUAR_BULAT_TERAPAN: AdeganStory = {
  id: "luar-bulat-terapan",
  judul: "Whole Then Part: terapan",
  sumber: "Metode global: Whole Then Part",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_CT1,
      tambah(0, judul("Fajar menjumlahkan"), ...lantai("lt", 150)),
      tambah("Fajar", ...tokoh("fj", 264, 184, "Fajar")),
      tambah("satu", ...Q1.objs, teks("q1t", 54, 92, "1 1/2", 14, W.rotiTua, { z: 3 })),
      tambah("dan", teks("pl", 140, 66, "+", 18, W.merah, { z: 3 })),
      tambah("satu@3", ...Q2.objs, teks("q2t", 216, 92, "1 1/4", 14, W.biruGaris, { z: 3 })),
    ),
    k(
      SUARA_CT2,
      bersih(0),
      tambah(0, judul("Bulat dan pecahan")),
      tambah("Bilangan", teks("r1", 150, 56, "1 + 1 = 2", 20, W.merah, { z: 3 })),
      tambah("pecahannya", teks("r2", 150, 100, "2/4 + 1/4 = 3/4", 20, W.hijauTua, { z: 3 })),
      tambah("tiga", teks("r3", 150, 142, "1/2 sama dengan 2/4", 12, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_CT3,
      bersih(0),
      tambah(0, judul("Gabungannya"), ...lantai("lt", 150)),
      tambah("Gabungannya", teks("z1", 190, 66, "2 3/4", 26, W.merah, { z: 3 }), ...campur("z", 30, 44, 2, 3, 4, { lebar: 80, h: 14 }).objs),
      tambah("cepat", emo("ok", 190, 110, E.benar, 24, { z: 3 })),
      tambah("besar", teks("z2", 150, 150, "cepat untuk bulat yang besar", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_CT4,
      bersih(0),
      tambah(0, judul("Pecahan lebih dari satu")),
      tambah("Kurang", teks("y1", 150, 56, "2/3 + 2/3 = 4/3", 20, W.merah, { z: 3 })),
      tambah("pecahannya", emo("xx", 262, 112, E.salah, 22, { z: 3 })),
      tambah("dirapikan", teks("y2", 150, 100, "4/3 = 1 1/3", 20, W.hijauTua, { z: 3 })),
      tambah("lagi", teks("y3", 150, 140, "harus dirapikan lagi", 12, W.coklat, { z: 3 }), ...campur("yc", 100, 152, 1, 1, 3, { lebar: 90, h: 12 }).objs),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Pak Seno, dan masing-masing punya saat yang tepat.";
const SUARA_R2 = "Penyebut sama, pakai Jumlahkan Pembilang. Penyebut berbeda, pakai Samakan Penyebut. Campuran, pakai Bulat Lalu Pecahan.";
const SUARA_R3 = "Apa pun caranya, ingat bahwa penyebut yang berbeda harus disamakan sebelum dijumlahkan.";
const SUARA_R4 = "Menurutmu, untuk menjumlahkan tiga bulat dua per lima dan dua bulat dua per lima, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga cara"), ...lantai("lt", 150)),
      tambah("Seno", ...tokoh("ps", 40, 184, "Pak Seno")),
      tambah("Tiga", ...kartu("c0", 90, 40, 190, 30, W.kapur, "Jumlahkan Pembilang", 11)),
      tambah("masing-masing", ...kartu("c1", 90, 76, 190, 30, W.langit, "Samakan Penyebut", 11), ...kartu("c2", 90, 112, 190, 30, W.pink, "Bulat Lalu Pecahan", 11)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Kapan memakai tiap cara")),
      tambah("sama", teks("v1", 150, 56, "penyebut sama: Jumlahkan Pembilang", 11, W.rotiTua, { z: 3 })),
      tambah("berbeda", teks("v2", 150, 96, "penyebut beda: Samakan Penyebut", 11, W.biruGaris, { z: 3 })),
      tambah("Campuran", teks("v3", 150, 136, "campuran: Bulat Lalu Pecahan", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Ingat selalu")),
      tambah("penyebut", ...bar("i1", 40, 56, 3, 1, { lebar: 90, h: 20 }), ...bar("i2", 170, 56, 4, 1, { lebar: 90, h: 20, warna: W.biruMuda, garis: W.biruGaris })),
      tambah("disamakan", teks("i3", 150, 108, "penyebut beda: samakan dulu", 13, W.merah, { z: 3 })),
      tambah("dijumlahkan", teks("i4", 150, 140, "baru dijumlahkan", 13, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Cara mana paling cepat?")),
      tambah("tiga", teks("j1", 80, 60, "3 2/5", 22, W.rotiTua, { z: 3 })),
      tambah("dua", teks("pl", 150, 60, "+", 22, W.merah, { z: 3 }), teks("j2", 220, 60, "2 2/5", 22, W.biruGaris, { z: 3 })),
      tambah("cara", ...pec("jq", 150, 110, "?", "?", 16, W.merah, W.merah)),
      tambah("cepat", emo("tn", 150, 160, E.tanya, 30, { z: 3 })),
    ),
  ],
};
