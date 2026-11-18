import type { AdeganStory } from "./logika-story";
import { E, W, WR, emo, garis, irisan, judul, kartu, kertas, kotak, labu, label, panah, petak, regu, rumput, tali, teks, tokoh } from "./k2b5C-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b5C-bantu";

/*
 * Cerita orisinal IGIL "Panen Raya Pak Joko" (Kelas 2 Bab 5 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b5c.md. Bagian ini: pembuka (tiga kartu tua pemilik kebun), Halving Twice (Belah Dua Kali), dan terapannya.
 */

export const NAMA_METODE = ["Halving Twice", "Fraction Wall", "Fold and Shade"] as const;
export const NAMA_METODE_ID = ["Belah Dua Kali", "Dinding Pecahan", "Lipat dan Warnai"] as const;

const MELON = "#BEF264";
const MELON_G = "#4D7C0F";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di balik labu besar, Dika menemukan tiga kartu tua milik pemilik kebun dahulu.";
const SUARA_O2 = "Pak Joko berkata, itu cara pemilik kebun membagi tanah supaya adil dan tidak ada yang iri!";
const SUARA_O3 = "Tiga cara itu: Halving Twice, Fraction Wall, dan Fold and Shade.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Belah Dua Kali, Dinding Pecahan, dan Lipat dan Warnai.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu tua pemilik kebun",
  sumber: "Metode global: pembuka",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kartu Tua Pemilik Kebun"), rumput("rm")),
      tambah("labu", ...labu("lb", 62, 148, 26)),
      tambah("Dika", ...tokoh("dk", 120, 178, "Dika")),
      tambah("tiga", teks("n3", 200, 64, "3 kartu", 10, W.ungu)),
      tambah("kartu", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 150 + i * 46, 78, 40, 34, W.krem, ["kartu"], 8))),
      ubah("dahulu.", ...[0, 1, 2].map((i) => ({ id: `c${i}-k`, warna: "#FDE68A" }))),
    ),
    k(
      SUARA_O2,
      tambah("Pak", ...tokoh("pj", 262, 178, "Pak Joko")),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("membagi", ...petak("pt", 30, 40, 36), tali("t1", 48, 40, 0, 36)),
      tambah("adil", emo("ok", 230, 150, E.benar, 22)),
      tambah("iri!", emo("sn", 268, 150, E.senyum, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Pemilik Kebun")),
      tambah("Tiga", teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Halving", teks("m0", 100, 66, "1. Halving Twice", 13, W.biru), emo("i0", 246, 68, E.gunting, 22)),
      tambah("Fraction", teks("m1", 100, 112, "2. Fraction Wall", 13, W.biru), kotak("i1", 226, 98, 40, 7, WR[0], W.biru, { rx: 1, tebal: 1.2 }), kotak("i1b", 226, 105, 20, 7, WR[1], W.biru, { rx: 1, tebal: 1.2 }), kotak("i1c", 246, 105, 20, 7, WR[1], W.biru, { rx: 1, tebal: 1.2 })),
      tambah("Fold", teks("m2", 100, 158, "3. Fold and Shade", 13, W.biru), kertas("i2", 234, 144, 24, "#FEF08A"), garis("i2g", 246, 144, 0, 24, W.biru, 1.2, { putus: true })),
    ),
    k(
      SUARA_O4,
      tambah("Belah", teks("q0", 222, 82, "Belah Dua Kali", 10, W.ungu)),
      tambah("Dua", teks("q0b", 222, 94, "2 kali", 8, W.merah)),
      tambah("Dinding", teks("q1", 222, 128, "Dinding Pecahan", 10, W.ungu)),
      tambah("Lipat", teks("q2", 222, 174, "Lipat dan Warnai", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Halving Twice: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Halving Twice, atau Belah Dua Kali. Namanya berarti membelah dua kali.";
const SUARA_C2 = "Belah benda menjadi dua bagian sama besar, lalu belah lagi setiap bagiannya menjadi dua.";
const SUARA_C3 = "Hasilnya empat bagian sama besar, dan setiap bagian seperempat.";
const SUARA_C4 = "Periksa setiap langkah, apakah dua bagian itu sama besar, sebelum membelah lagi?";

export const ADEGAN_LUAR_BELAH: AdeganStory = {
  id: "luar-belah",
  judul: "Halving Twice: Belah Dua Kali",
  sumber: "Metode global: Halving Twice (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Cara Pertama")),
      tambah("Halving", ...kartu("nm", 50, 34, 200, 26, W.krem, ["Halving Twice"], 13)),
      tambah("Belah", teks("nid", 150, 88, "Belah Dua Kali", 12, W.ungu)),
      tambah("Dua", teks("d2", 150, 114, "2 kali", 12, W.merah)),
      tambah("membelah", emo("gt", 150, 160, E.gunting, 28)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Belah, Lalu Belah Lagi")),
      tambah("benda", kotak("b1", 30, 40, 80, 80, MELON, MELON_G, { rx: 2, tebal: 2 })),
      tambah("dua", tali("a1", 70, 40, 0, 80), teks("n2", 70, 138, "2 bagian", 10, W.merah)),
      tambah("lalu", panah("pn", 118, 80, 44, 0, W.ungu, 2.4)),
      tambah("belah@2", kotak("b2", 170, 40, 80, 80, MELON, MELON_G, { rx: 2, tebal: 2 }), tali("a2", 210, 40, 0, 80)),
      tambah("setiap", tali("a3", 170, 80, 80, 0)),
      tambah("dua@2", teks("n3", 210, 138, "2 lagi", 10, W.merah)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Empat Bagian Sama Besar"), kotak("b3", 100, 40, 100, 100, MELON, MELON_G, { rx: 2, tebal: 2 })),
      tambah("empat", teks("n4", 250, 80, "4 bagian", 10, W.merah)),
      tambah("sama", tali("v1", 150, 40, 0, 100), tali("v2", 100, 90, 100, 0)),
      tambah("seperempat.", ...label("q1", 125, 65, "seperempat", 7), ...label("q2", 175, 65, "seperempat", 7), ...label("q3", 125, 115, "seperempat", 7), ...label("q4", 175, 115, "seperempat", 7)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Periksa Setiap Langkah")),
      tambah("Periksa", emo("kc", 60, 80, E.kaca, 26)),
      tambah("langkah,", kotak("b4", 100, 50, 100, 70, MELON, MELON_G, { rx: 2, tebal: 2 }), tali("c1", 150, 50, 0, 70)),
      tambah("dua", teks("n2", 150, 140, "2 bagian", 10, W.merah)),
      tambah("sama", emo("ok", 230, 90, E.benar, 26)),
      tambah("membelah", panah("pb", 250, 60, 0, 40, W.ungu, 2.4)),
      tambah("lagi?", emo("tq", 270, 110, E.tanya, 24)),
    ),
  ],
};

/* ------------------------------ Halving Twice: terapan ------------------------------ */
const SUARA_T1 = "Chacha membelah melon menjadi dua, lalu membelah setiap belahan menjadi dua lagi.";
const SUARA_T2 = "Empat potong melon sama besar, dan setiap regu mendapat satu potong untuk dimakan.";
const SUARA_T3 = "Cocok kalau bendanya bisa dipotong dan kita ingin memeriksa tiap langkah dengan teliti.";
const SUARA_T4 = "Kurang cocok kalau belahan pertama sudah tidak sama besar, karena kesalahannya terbawa ke belahan kedua.";

export const ADEGAN_LUAR_BELAH_TERAPAN: AdeganStory = {
  id: "luar-belah-terapan",
  judul: "Chacha membelah melon",
  sumber: "Metode global: Halving Twice (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Membelah Melon"), rumput("rm")),
      tambah("Chacha", ...tokoh("ch", 40, 178, "Chacha")),
      tambah("melon", irisan("ml", 150, 100, 40, 0, 360, MELON, MELON_G)),
      hapus("dua,", "ml"),
      tambah("dua,", irisan("m1", 144, 100, 40, 90, 270, MELON, MELON_G), irisan("m2", 156, 100, 40, -90, 90, MELON, MELON_G), teks("n2", 250, 60, "2 bagian", 10, W.merah)),
      tambah("setiap", garis("ct", 104, 100, 92, 0, W.biru, 2.2, { putus: true, z: 3 })),
      tambah("dua@2", teks("n3", 250, 80, "2 lagi", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      hapus(0, "m1", "m2", "ct", "n2", "n3"),
      tambah("Empat", teks("n4", 150, 52, "4 potong", 10, W.merah)),
      tambah("potong", irisan("p1", 100, 125, 30, 270, 360, MELON, MELON_G), irisan("p2", 152, 125, 30, 270, 360, MELON, MELON_G), irisan("p3", 204, 125, 30, 270, 360, MELON, MELON_G), irisan("p4", 256, 125, 30, 270, 360, MELON, MELON_G)),
      tambah("regu", ...regu("r1", 115, 176, WR[0]), ...regu("r2", 167, 176, WR[1]), ...regu("r3", 219, 176, WR[2]), ...regu("r4", 271, 176, WR[3])),
      tambah("satu", teks("n1", 150, 70, "1 potong", 10, W.merah)),
      ubah("dimakan.", { id: "ch", isi: E.senyum }),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 34, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("dipotong", emo("gt", 80, 110, E.gunting, 28)),
      tambah("memeriksa", emo("kc", 150, 110, E.kaca, 28)),
      tambah("langkah", ...[0, 1].map((i) => kotak(`s${i}`, 190 + i * 40, 80, 30, 30, MELON, MELON_G, { rx: 2, tebal: 1.8 }))),
      tambah("teliti.", emo("ok", 150, 160, E.benar, 28)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 34, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("belahan", kotak("b1", 90, 76, 120, 70, MELON, MELON_G, { rx: 2, tebal: 2 }), tali("u1", 120, 76, 0, 70)),
      tambah("tidak", emo("x1", 105, 168, E.salah, 20)),
      tambah("kesalahannya", tali("u2", 90, 110, 120, 0), emo("x2", 165, 168, E.salah, 20)),
      tambah("kedua.", emo("x3", 225, 168, E.salah, 20)),
    ),
  ],
};
