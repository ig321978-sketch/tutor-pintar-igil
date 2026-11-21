import type { AdeganStory } from "./logika-story";
import { E, G, W, emo, garis, garisKeSudut, idSerpih, judul, kotak, lantai, meja, panah, poli, serpih, teks, titikBeraturan, tokoh } from "./k4b5b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b5b-bantu";

/*
 * Cerita orisinal IGIL "Mosaik Pak Rudi" (Kelas 4 Bab 5 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b5b.md. Bagian ini: pembuka (meja kerja Pak Rudi), Fit the Pieces (Pasang Keping), dan terapannya.
 */

export const NAMA_METODE = ["Fit the Pieces", "Cut Into Triangles", "Many Ways Mosaic"] as const;
export const NAMA_METODE_ID = ["Pasang Keping", "Bagi Jadi Segitiga", "Mosaik Banyak Cara"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di meja kerjanya, Pak Rudi menebarkan keping-keping keramik dan siap membuat mosaik.";
const SUARA_O2 = "Ada tiga cara supaya keping mudah disusun, dan bangun mudah dibelah, tanpa celah atau tumpukan.";
const SUARA_O3 = "Tiga cara itu: Fit the Pieces, Cut Into Triangles, dan Many Ways Mosaic.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Pasang Keping, Bagi Jadi Segitiga, dan Mosaik Banyak Cara.";
const HEX_KECIL = titikBeraturan(140, 92, 20, 6, 0);

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Meja kerja Pak Rudi",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Sore di Meja Kerja"), ...lantai("lt", 150), ...meja("mj", 14, 232)),
      tambah("Rudi", ...tokoh("pr", 262, 184, "Pak Rudi")),
      tambah("menebarkan", ...serpih("s1", 36, 98, 8, 22)),
      tambah("mosaik", kotak("fr", 172, 40, 80, 40, undefined, W.ungu, { putus: true, tebal: 2, z: 1 }), teks("pm", 212, 34, "MOSAIK", 8, W.ungu)),
    ),
    k(
      SUARA_O2,
      hapus(0, ...idSerpih("s1", 8), "fr", "pm"),
      tambah("tiga", teks("n3", 258, 40, "3 cara", 10, W.ungu)),
      tambah("disusun", poli("sa", [[40, 112], [70, 112], [40, 82]], G.biru), poli("sb", [[70, 82], [70, 112], [40, 82]], G.kuning)),
      tambah("dibelah", poli("hx", HEX_KECIL, G.hijau), ...garisKeSudut("g", [140, 92], HEX_KECIL, W.merah, 1.4)),
      tambah("tanpa", emo("ok", 228, 98, E.benar, 22), teks("tc", 228, 72, "tanpa celah", 9, W.hijauTua)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Fit", teks("m0", 118, 70, "1. Fit the Pieces", 10, W.biru), emo("i0", 28, 72, E.puzzle, 16)),
      tambah("Cut", teks("m1", 118, 120, "2. Cut Into Triangles", 10, W.biru), emo("i1", 28, 122, E.gunting, 16)),
      tambah("Many", teks("m2", 118, 170, "3. Many Ways Mosaic", 10, W.biru), emo("i2", 28, 172, E.palet, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Pasang", teks("g0", 244, 70, "Pasang Keping", 8, W.ungu), garis("l0", 184, 74, 22, 0, W.ungu, 1)),
      tambah("Bagi", teks("g1", 244, 120, "Bagi Jadi Segitiga", 8, W.ungu), garis("l1", 184, 124, 22, 0, W.ungu, 1)),
      tambah("Mosaik", teks("g2", 244, 170, "Mosaik Banyak Cara", 8, W.ungu), garis("l2", 184, 174, 22, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Fit the Pieces: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Fit the Pieces, atau Pasang Keping.";
const SUARA_C2 = "Kita mempertemukan sisi yang sama panjang dari dua keping, lalu melihat bangun apa yang terbentuk.";
const SUARA_C3 = "Keping tidak boleh bertumpuk, dan di antara keping tidak boleh ada celah.";
const SUARA_C4 = "Sisi yang dipertemukan menentukan bangun baru yang lahir.";

export const ADEGAN_LUAR_PASANG: AdeganStory = {
  id: "luar-pasang",
  judul: "Fit the Pieces: Pasang Keping",
  sumber: "Metode global: Fit the Pieces (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Fit the Pieces"), ...lantai("lt", 150)),
      tambah("Fit", emo("pz", 110, 112, E.puzzle, 40)),
      tambah("Pasang", teks("nm", 150, 140, "Pasang Keping", 13, W.ungu)),
      tambah("Keping", emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_C2,
      hapus(0, "pz", "nm", "kl"),
      tambah(0, ...meja("mj", 14, 260)),
      tambah("mempertemukan", poli("ta", [[130, 78], [130, 112], [164, 112]], G.biru), poli("tb", [[130, 78], [164, 78], [164, 112]], G.kuning, W.biru, { x: 70 }), panah("ar", 196, 95, -26, 0, W.ungu, 2.4, { z: 6 })),
      tambah("sisi", garis("sa", 130, 78, 34, 34, W.merah, 3, { z: 6 }), garis("sb", 200, 78, 34, 34, W.merah, 3, { z: 6 })),
      tambah("dua", teks("n2", 150, 56, "2 keping", 11, W.merah)),
      hapus("terbentuk", "ar"),
      ubah("terbentuk", { id: "tb", x: 0 }, { id: "sb", x: 130 }, { id: "n2", isi: "bangun apa?" }),
    ),
    k(
      SUARA_C3,
      hapus(0, "ta", "tb", "sa", "sb", "n2"),
      tambah("bertumpuk", kotak("o1", 50, 84, 34, 28, G.biru, W.biru, { rx: 0, z: 2 }), kotak("o2", 68, 90, 34, 22, G.kuning, W.biru, { rx: 0, z: 3 }), emo("x1", 84, 70, E.salah, 20), teks("l1", 76, 134, "tumpuk", 9, W.merah)),
      tambah("celah", kotak("c1", 170, 84, 30, 28, G.biru, W.biru, { rx: 0 }), kotak("c2", 216, 84, 30, 28, G.kuning, W.biru, { rx: 0 }), garis("cg", 208, 84, 0, 28, W.merah, 2, { putus: true, z: 5 }), emo("x2", 208, 70, E.salah, 20), teks("l2", 208, 134, "celah", 9, W.merah)),
    ),
    k(
      SUARA_C4,
      hapus(0, "o1", "o2", "x1", "l1", "c1", "c2", "cg", "x2", "l2"),
      tambah(
        "dipertemukan",
        poli("u0", [[44, 112], [78, 112], [44, 78]], G.biru),
        poli("u1", [[78, 78], [78, 112], [44, 78]], G.kuning),
        garis("ue", 78, 112, -34, -34, W.merah, 3, { z: 6 }),
        teks("a0", 61, 64, "sisi miring", 9, W.merah),
        poli("v0", [[176, 112], [210, 112], [210, 78]], G.biru),
        poli("v1", [[210, 112], [244, 112], [210, 78]], G.kuning),
        garis("ve", 210, 112, 0, -34, W.merah, 3, { z: 6 }),
        teks("a1", 210, 64, "sisi tegak", 9, W.merah),
      ),
      tambah("bangun", teks("r0", 61, 130, "persegi", 9, W.hijauTua), teks("r1", 210, 130, "segitiga", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Fit the Pieces: terapan ------------------------------ */
const SUARA_P1 = "Laras memasang dua keping segitiga siku-siku yang sama besar pada sisi miringnya.";
const SUARA_P2 = "Hasilnya sebuah persegi, dan kalau dipasang pada sisi yang lain, hasilnya jajargenjang.";
const SUARA_P3 = "Cocok untuk membuat bangun baru dari keping yang sudah ada, karena kita bisa mencoba satu per satu.";
const SUARA_P4 = "Kurang cocok kalau kepingnya terlalu banyak, karena mencoba semuanya memakan waktu.";

export const ADEGAN_LUAR_PASANG_TERAPAN: AdeganStory = {
  id: "luar-pasang-terapan",
  judul: "Fit the Pieces: terapan",
  sumber: "Metode global: Fit the Pieces (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Laras Memasang Keping"), ...lantai("lt", 150), ...meja("mj", 14, 260)),
      tambah("Laras", ...tokoh("la", 36, 184, "Laras")),
      tambah("dua", teks("n2", 113, 56, "2 keping", 11, W.merah)),
      tambah("segitiga", poli("ta", [[96, 78], [96, 112], [130, 112]], G.biru), poli("tb", [[96, 78], [130, 78], [130, 112]], G.kuning, W.biru, { x: 60 })),
      tambah("siku-siku", kotak("ra", 96, 107, 5, 5, undefined, W.merah, { rx: 0, tebal: 1.4, z: 6 }), kotak("rb", 185, 78, 5, 5, undefined, W.merah, { rx: 0, tebal: 1.4, z: 6 })),
      tambah("miringnya", garis("sa", 96, 78, 34, 34, W.merah, 3, { z: 6 }), garis("sb", 156, 78, 34, 34, W.merah, 3, { z: 6 })),
    ),
    k(
      SUARA_P2,
      ubah(0, { id: "tb", x: 0 }, { id: "rb", x: 125 }, { id: "sb", x: 96 }),
      ubah("persegi", { id: "n2", isi: "persegi" }),
      tambah("lain", poli("j0", [[170, 112], [204, 112], [204, 78]], G.biru), poli("j1", [[204, 112], [238, 78], [204, 78]], G.kuning), garis("je", 204, 112, 0, -34, W.merah, 3, { z: 6 })),
      tambah("jajargenjang", teks("lj", 204, 66, "jajargenjang", 9, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      tambah("Cocok", emo("jp", 262, 140, E.jempol, 22)),
      tambah("satu", teks("n1", 150, 134, "coba 1 per 1", 10, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      hapus(0, "jp", "ta", "tb", "ra", "rb", "sa", "sb", "j0", "j1", "je", "n2", "lj", "n1"),
      tambah("Kurang", emo("xs", 262, 140, E.salah, 22)),
      tambah("kepingnya", ...serpih("b2", 30, 98, 12, 18)),
      tambah("waktu", emo("jm", 150, 64, E.jam, 30)),
    ),
  ],
};
