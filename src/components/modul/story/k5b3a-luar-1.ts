import type { AdeganStory } from "./logika-story";
import { E, W, barPec, bulat, campur, emo, garis, garisBil, judul, kantong, kotak, panah, pecahan, tanah, teks, tokoh, xBil } from "./k5b3a-gambar";
import { bersih, hapus, idx, k, tambah, ubah } from "./k5b3a-bantu";

/*
 * Cerita orisinal IGIL "Tiga Kantong Tepung Bu Ratna" (Kelas 5 Bab 3 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b3a.md. Bagian ini: pembuka (tiga kantong yang harus diurutkan tanpa keliru), Number Line (Garis Bilangan) dan terapannya,
 * Common Denominator (Penyebut Sama) dan terapannya.
 */

export const NAMA_METODE = ["Number Line", "Common Denominator", "Mixed to Improper"] as const;
export const NAMA_METODE_ID = ["Garis Bilangan", "Penyebut Sama", "Campuran ke Biasa"] as const;

export const KP = { merah: "#FCA5A5", biru: "#BAE6FD", kapur: "#FEF9C3", hijau: "#86EFAC" };

/** Kartu judul cara: papan gelap `pt`, nama Inggris `nm`, nama Indonesia `ni`, ikon `ik`. */
export const kartuCara = (suara: string, nomor: string, inggris: string, indonesia: string, ikon: string) => [
  tambah(0, judul(`Cara ${nomor}: ${inggris}`), kotak("pt", 8, 32, 284, 120, "#1E293B", "#0F172A", { rx: 6, tebal: 1.4, z: -1 })),
  tambah(idx(suara, inggris.split(" ")[0]), teks("nm", 150, 74, inggris, 14, KP.merah, { z: 3 })),
  tambah(idx(suara, indonesia.split(" ")[0]), teks("ni", 150, 96, indonesia, 10, KP.kapur, { z: 3 })),
  tambah(idx(suara, indonesia.split(" ")[1]), emo("ik", 150, 134, ikon, 24, { z: 3 })),
];

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, Bu Ratna masih menata tepung, dan tiga kantongnya harus diurutkan tanpa keliru.";
const SUARA_O2 = "Ada tiga cara supaya pecahan bisa dibandingkan dengan tepat, bahkan ketika bentuknya berbeda-beda.";
const SUARA_O3 = "Tiga cara itu: Number Line, Common Denominator, dan Mixed to Improper.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Garis Bilangan, Penyebut Sama, dan Campuran ke Biasa.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kantong Bu Ratna",
  sumber: "Metode global: pembuka",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kantong Bu Ratna"), ...tanah("tn", 150)),
      tambah("Bu", ...tokoh("bu", 52, 184, "Bu Ratna")),
      tambah("tepung,", ...kantong("ka", 150, 128), ...kantong("kb", 196, 128), ...kantong("kc", 242, 128)),
      tambah("tiga", teks("t3", 196, 50, "3 kantong", 11, W.pinkTua)),
      tambah("keliru.", teks("kl", 196, 148, "urutan tanpa keliru", 9.5, W.merah)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150)),
      tambah("tiga", teks("n3", 262, 44, "3 cara", 10, W.merah)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 20 + i * 92, 56, 80, 36, W.jingga, W.coklat, { rx: 4 }), teks(`c${i}-t`, 60 + i * 92, 79, "cara", 9, W.coklat)])),
      tambah("tepat,", emo("ok", 150, 112, E.benar, 22)),
      tambah("berbeda-beda.", ...pecahan("s1", 60, 132, 3, 4, 12), ...campur("s2", 150, 132, 1, 1, 2, 12), ...pecahan("s3", 240, 132, 7, 8, 12)),
    ),
    k(
      SUARA_O3,
      hapus(0, "s1-a", "s1-l", "s1-b", "s2-w", "s2f-a", "s2f-l", "s2f-b", "s3-a", "s3-l", "s3-b"),
      tambah("Number", teks("m0", 120, 118, "1. Number Line", 10, W.hijauTua), emo("i0", 40, 118, E.penggaris, 16)),
      tambah("Common", teks("m1", 120, 138, "2. Common Denominator", 10, W.hijauTua), emo("i1", 40, 138, "\u{1F522}", 16)),
      tambah("Mixed", teks("m2", 120, 158, "3. Mixed to Improper", 10, W.hijauTua), emo("i2", 40, 158, E.ubah, 16)),
    ),
    k(
      SUARA_O4,
      hapus(0, "ok"),
      tambah("Nama", kotak("bk", 190, 104, 104, 70, "#14532D", W.putih, { rx: 6, tebal: 1, z: -1 })),
      tambah("Garis", teks("g0", 242, 122, "Garis Bilangan", 8.4, W.sorot)),
      tambah("Penyebut", teks("g1", 242, 142, "Penyebut Sama", 8.4, W.sorot)),
      tambah("Campuran", teks("g2", 242, 162, "Campuran ke Biasa", 8.4, W.sorot)),
    ),
  ],
};

/* ------------------------------ Number Line: konsep ------------------------------ */
const SUARA_L1 = "Cara pertama, Number Line, atau Garis Bilangan.";
const SUARA_L2 = "Kita menaruh setiap pecahan pada satu garis lurus yang diberi tanda bilangan bulat.";
const SUARA_L3 = "Pecahan yang letaknya lebih ke kanan lebih besar, dan yang lebih ke kiri lebih kecil.";
const SUARA_L4 = "Dengan begitu kita tinggal membaca urutannya dari kiri ke kanan.";
const GL = garisBil("gl", 30, 270, 104, 4);

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line: Garis",
  sumber: "Metode global: Number Line (konsep)",
  latar: W.taman,
  ketukan: [
    k(SUARA_L1, ...kartuCara(SUARA_L1, "1", "Number Line", "Garis Bilangan", E.penggaris)),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Satu Garis Lurus"), ...tanah("tn", 150)),
      tambah("garis", GL[0]),
      tambah("tanda", ...GL.slice(1)),
      tambah("pecahan", bulat("mk", xBil(30, 270, 4, 1.5), 104, 4.5, W.merah, W.putih, { z: 3 }), ...campur("mc", xBil(30, 270, 4, 1.5), 66, 1, 1, 2, 14, W.merah)),
    ),
    k(
      SUARA_L3,
      tambah("kanan", panah("pr", 150, 150, 100, 0, W.hijauTua, 3), emo("hk", 262, 150, E.tunjuk, 18)),
      tambah("besar,", teks("tr", 200, 136, "makin besar", 10, W.hijauTua)),
      tambah("kecil.", panah("pl", 130, 150, -100, 0, W.merah, 3), teks("tl", 80, 136, "makin kecil", 10, W.merah)),
    ),
    k(
      SUARA_L4,
      hapus(0, "tr", "tl", "hk"),
      tambah("membaca", emo("mt", 150, 70, E.mata, 22), teks("bc", 150, 176, "baca dari kiri ke kanan", 10, W.coklat)),
      ubah("kanan.", { id: "pr", warna: W.biru, tebal: 4 }),
    ),
  ],
};

/* ------------------------------ Number Line: terapan ------------------------------ */
const SUARA_M1 = "Bima menaruh satu bulat tujuh per delapan antara satu dan dua pada garis.";
const SUARA_M2 = "Ia menaruh dua bulat tiga per empat antara dua dan tiga, dan tiga bulat satu per dua di dekat empat.";
const SUARA_M3 = "Cocok untuk pecahan yang jaraknya jauh, karena letaknya langsung terlihat.";
const SUARA_M4 = "Kurang cocok untuk pecahan yang sangat berdekatan, karena garisnya harus digambar sangat teliti.";
const GM = garisBil("gm", 40, 280, 112, 4);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis: kapan cocok",
  sumber: "Metode global: Number Line (terapan)",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Letak di Garis"), ...tanah("tn", 150), ...GM, ...tokoh("bm", 26, 184, "Bima")),
      tambah("menaruh", bulat("p1", xBil(40, 280, 4, 1.875), 112, 4.5, W.biru, W.putih, { z: 3 }), garis("l1", xBil(40, 280, 4, 1.875), 96, 0, 12, W.biru, 1.2, { putus: true })),
      tambah("tujuh", ...campur("c1", xBil(40, 280, 4, 1.875), 78, 1, 7, 8, 13, W.biru)),
    ),
    k(
      SUARA_M2,
      tambah("menaruh", bulat("p2", xBil(40, 280, 4, 2.75), 112, 4.5, W.hijauTua, W.putih, { z: 3 }), garis("l2", xBil(40, 280, 4, 2.75), 70, 0, 38, W.hijauTua, 1.2, { putus: true })),
      tambah("empat", ...campur("c2", xBil(40, 280, 4, 2.75), 52, 2, 3, 4, 13, W.hijauTua)),
      tambah(idx(SUARA_M2, "tiga", 2), bulat("p3", xBil(40, 280, 4, 3.5), 112, 4.5, W.merah, W.putih, { z: 3 }), garis("l3", xBil(40, 280, 4, 3.5), 96, 0, 12, W.merah, 1.2, { putus: true }), ...campur("c3", xBil(40, 280, 4, 3.5), 78, 3, 1, 2, 13, W.merah)),
    ),
    k(
      SUARA_M3,
      tambah("Cocok", emo("ok", 262, 150, E.benar, 22)),
      tambah("jauh,", teks("jh", 140, 150, "jaraknya jauh: mudah dilihat", 10, W.hijauTua)),
    ),
    k(
      SUARA_M4,
      hapus(0, "ok", "jh"),
      tambah("Kurang", emo("xs", 262, 150, E.salah, 22)),
      tambah("berdekatan,", teks("dk", 140, 150, "sangat dekat: perlu teliti", 10, W.merah)),
      tambah("teliti.", emo("kc", 262, 60, "\u{1F50D}", 22)),
    ),
  ],
};

/* ------------------------------ Common Denominator: konsep ------------------------------ */
const SUARA_T1 = "Cara kedua, Common Denominator, atau Penyebut Sama.";
const SUARA_T2 = "Kita mencari KPK dari semua penyebut, lalu mengubah setiap pecahan ke penyebut itu.";
const SUARA_T3 = "Kalau penyebutnya sudah sama, pecahan dengan pembilang terbesar adalah yang terbesar.";
const SUARA_T4 = "Pecahan yang sama besar tetap menunjuk bagian yang sama, hanya tulisannya yang berganti.";

export const ADEGAN_LUAR_PENYEBUT: AdeganStory = {
  id: "luar-penyebut",
  judul: "Common Denominator",
  sumber: "Metode global: Common Denominator (konsep)",
  latar: W.taman,
  ketukan: [
    k(SUARA_T1, ...kartuCara(SUARA_T1, "2", "Common Denominator", "Penyebut Sama", "\u{1F522}")),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Cari KPK Penyebut"), ...tanah("tn", 150)),
      tambah("KPK", teks("kp", 150, 48, "KPK = 12", 16, W.merah), ...pecahan("o1", 60, 100, 1, 3, 20), ...pecahan("o2", 116, 100, 1, 4, 20)),
      tambah("mengubah", panah("ar", 146, 100, 34, 0, W.merah, 3)),
      tambah("penyebut", ...pecahan("n1", 214, 100, 4, 12, 20, W.hijauTua), ...pecahan("n2", 268, 100, 3, 12, 20, W.hijauTua)),
      tambah("itu.", teks("sm", 150, 156, "penyebut jadi sama", 10, W.coklat)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Pembilang Terbesar"), ...tanah("tn", 150), ...pecahan("p1", 24, 70, 4, 12, 11), ...pecahan("p2", 24, 110, 3, 12, 11)),
      tambah("penyebutnya", ...barPec("b1", 44, 56, 220, 22, 12, 4), ...barPec("b2", 44, 96, 220, 22, 12, 3)),
      tambah("pembilang", teks("pb", 150, 140, "pembilang terbesar menang", 10, W.merah)),
      tambah("terbesar.", emo("bt", 150, 40, E.bintang, 18)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Sama Besar"), ...tanah("tn", 150), ...pecahan("e1", 24, 70, 1, 3, 11), ...pecahan("e2", 24, 110, 4, 12, 11)),
      tambah("sama", ...barPec("c1", 44, 56, 220, 22, 3, 1), ...barPec("c2", 44, 96, 220, 22, 12, 4)),
      tambah("bagian", teks("sb", 150, 140, "bagian yang sama, tulisan berbeda", 9.5, W.hijauTua)),
      tambah("berganti.", emo("ub", 150, 40, E.ubah, 20)),
    ),
  ],
};

/* ------------------------------ Common Denominator: terapan ------------------------------ */
const SUARA_U1 = "Citra mengubah tiga per empat dan lima per delapan menjadi pecahan berpenyebut delapan.";
const SUARA_U2 = "Tiga per empat menjadi enam per delapan, dan enam lebih besar daripada lima.";
const SUARA_U3 = "Cocok untuk membandingkan dua atau tiga pecahan yang penyebutnya berbeda.";
const SUARA_U4 = "Kurang cocok untuk penyebut yang sangat besar, karena KPK-nya jadi sulit dicari.";

export const ADEGAN_LUAR_PENYEBUT_TERAPAN: AdeganStory = {
  id: "luar-penyebut-terapan",
  judul: "Penyebut: kapan cocok",
  sumber: "Metode global: Common Denominator (terapan)",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Citra Menyamakan"), ...tanah("tn", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("tiga", ...pecahan("u1", 110, 70, 3, 4, 20)),
      tambah("lima", ...pecahan("u2", 200, 70, 5, 8, 20)),
      tambah("menjadi", panah("ua", 110, 100, 0, 16, W.merah, 2.4), panah("ub", 200, 100, 0, 16, W.merah, 2.4)),
      tambah("delapan.", teks("pd", 255, 70, "penyebut 8", 10, W.merah)),
    ),
    k(
      SUARA_U2,
      tambah("enam", ...pecahan("w1", 110, 144, 6, 8, 20, W.hijauTua)),
      tambah("besar", teks("bd", 155, 148, "6 > 5", 14, W.merah)),
      tambah("lima.", ...pecahan("w2", 200, 144, 5, 8, 20, W.hijauTua)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Kapan Cocok"), ...tanah("tn", 150)),
      tambah("Cocok", emo("ok", 262, 80, E.benar, 24)),
      tambah("dua", teks("d2", 140, 70, "2 atau 3 pecahan", 12, W.hijauTua)),
      tambah("berbeda.", teks("pb", 140, 110, "penyebut berbeda", 12, W.coklat)),
    ),
    k(
      SUARA_U4,
      hapus(0, "ok"),
      tambah("Kurang", emo("xs", 262, 80, E.salah, 24)),
      tambah("besar,", teks("pk", 140, 150, "penyebut sangat besar", 11, W.merah)),
      tambah("sulit", teks("ks", 140, 130, "KPK sulit dicari", 11, W.merah)),
    ),
  ],
};
