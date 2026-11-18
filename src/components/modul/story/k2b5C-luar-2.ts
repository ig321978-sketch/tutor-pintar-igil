import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, garis, judul, kartu, kertas, kotak, label, panah, petak, poligon, tali, teks, tokoh } from "./k2b5C-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b5C-bantu";
import { NAMA_METODE_ID } from "./k2b5C-luar-1";

/*
 * Cerita orisinal IGIL "Panen Raya Pak Joko" (Kelas 2 Bab 5 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b5c.md. Bagian ini: Fraction Wall (Dinding Pecahan), Fold and Shade (Lipat dan Warnai), terapannya, dan ringkasan.
 */

const WARNA_BARIS = ["#BFDBFE", "#BBF7D0", "#FDE68A"] as const;
const X0 = 60;
const LEBAR = 210;

/** Satu baris dinding pita: n pita sama panjang pada tinggi y; `${id}{i}` dan teks `${id}t{i}` bila ada isi. */
const baris = (id: string, y: number, n: number, warna: string, isi = "", u = 8.6, tinggi = 24): Obj[] =>
  Array.from({ length: n }, (_, i) => [kotak(`${id}${i}`, X0 + (i * LEBAR) / n, y, LEBAR / n, tinggi, warna, W.biru, { rx: 1, tebal: 1.4 }), ...(isi ? [teks(`${id}t${i}`, X0 + ((i + 0.5) * LEBAR) / n, y + tinggi / 2 + u * 0.35, isi, u)] : [])]).flat();
/** Satu pita: kotak `${id}` dan teks `${id}t`. */
const pita = (id: string, x: number, y: number, w: number, warna: string, isi: string, u = 8.6, tinggi = 24): Obj[] => [kotak(id, x, y, w, tinggi, warna, W.biru, { rx: 1, tebal: 1.4 }), teks(`${id}t`, x + w / 2, y + tinggi / 2 + u * 0.35, isi, u)];

/* ------------------------------ Fraction Wall: konsep ------------------------------ */
const SUARA_D1 = "Cara kedua, Fraction Wall, atau Dinding Pecahan. Dinding ini terbuat dari pita.";
const SUARA_D2 = "Susun pita seperti dinding bata. Baris pertama satu pita utuh, baris kedua dua pita setengah.";
const SUARA_D3 = "Baris ketiga berisi empat pita seperempat.";
const SUARA_D4 = "Semua baris sama panjang, jadi kita bisa membandingkan bagian-bagiannya dari atas ke bawah.";

export const ADEGAN_LUAR_DINDING: AdeganStory = {
  id: "luar-dinding",
  judul: "Fraction Wall: Dinding Pecahan",
  sumber: "Metode global: Fraction Wall (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Cara Kedua")),
      tambah("Fraction", ...kartu("nm", 50, 34, 200, 26, W.krem, ["Fraction Wall"], 13)),
      tambah("Dinding", teks("nid", 150, 92, "Dinding Pecahan", 12, W.ungu)),
      tambah("pita.", kotak("pt", 30, 120, 240, 18, "#BFDBFE", W.biru, { rx: 2, tebal: 1.8 })),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Dinding Pita")),
      tambah("satu", teks("c1", 36, 57, "1", 12, W.merah), ...baris("b1", 40, 1, WARNA_BARIS[0])),
      tambah("utuh,", teks("b1t0", 165, 57, "utuh", 9)),
      tambah("dua", teks("c2", 36, 87, "2", 12, W.merah), ...baris("b2", 70, 2, WARNA_BARIS[1])),
      tambah("setengah.", teks("b2t0", 112.5, 87, "setengah", 9), teks("b2t1", 217.5, 87, "setengah", 9)),
    ),
    k(
      SUARA_D3,
      tambah("empat", teks("c3", 36, 117, "4", 12, W.merah), ...baris("b3", 100, 4, WARNA_BARIS[2])),
      tambah("seperempat.", ...[0, 1, 2, 3].map((i) => teks(`b3t${i}`, X0 + (i + 0.5) * 52.5, 117, "seperempat", 7))),
    ),
    k(
      SUARA_D4,
      tambah("sama", garis("el", X0, 34, 0, 98, W.merah, 1.6, { putus: true, z: 3 }), garis("er", X0 + LEBAR, 34, 0, 98, W.merah, 1.6, { putus: true, z: 3 })),
      tambah("membandingkan", emo("kc", 150, 158, E.kaca, 24)),
      tambah("atas", panah("pa", 286, 38, 0, 92, W.ungu, 2.4)),
      tambah("bawah.", emo("ok", 150, 190, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Fraction Wall: terapan ------------------------------ */
const SUARA_E1 = "Nia menaruh dua pita seperempat di bawah satu pita setengah, dan panjangnya sama.";
const SUARA_E2 = "Jadi dua seperempat sama dengan satu setengah, dan dindingnya menunjukkan itu dengan jelas.";
const SUARA_E3 = "Cocok kalau kita ingin membandingkan utuh, setengah, dan seperempat.";
const SUARA_E4 = "Kurang cocok kalau bendanya lingkaran, karena dinding pita berbentuk lurus.";

export const ADEGAN_LUAR_DINDING_TERAPAN: AdeganStory = {
  id: "luar-dinding-terapan",
  judul: "Nia membandingkan pita",
  sumber: "Metode global: Fraction Wall (terapan)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Membandingkan Pita")),
      tambah("Nia", ...tokoh("ni", 40, 178, "Nia")),
      tambah("dua", teks("n2", 242, 98, "2 pita", 10, W.merah)),
      tambah("seperempat", ...pita("e0", X0, 84, LEBAR / 4, WARNA_BARIS[2], "seperempat", 7), ...pita("e1", X0 + LEBAR / 4, 84, LEBAR / 4, WARNA_BARIS[2], "seperempat", 7)),
      tambah("satu", teks("n1", 242, 54, "1 pita", 10, W.merah)),
      tambah("setengah,", ...pita("h0", X0, 40, LEBAR / 2, WARNA_BARIS[1], "setengah", 9)),
      tambah("sama.", garis("sm", X0 + LEBAR / 2, 34, 0, 80, W.merah, 1.8, { putus: true, z: 3 })),
    ),
    k(
      SUARA_E2,
      tambah("dua", teks("f2", 80, 148, "2 seperempat", 10, W.merah)),
      tambah("sama", teks("fs", 150, 148, "=", 14, W.ungu)),
      tambah("satu", teks("f1", 222, 148, "1 setengah", 10, W.hijau)),
      tambah("jelas.", emo("ok", 262, 176, E.benar, 22)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 34, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("utuh,", ...baris("u", 72, 1, WARNA_BARIS[0], "utuh", 8)),
      tambah("setengah,", ...baris("v", 98, 2, WARNA_BARIS[1], "setengah", 8)),
      tambah("seperempat.", ...baris("w", 124, 4, WARNA_BARIS[2], "seperempat", 6.4)),
      tambah("membandingkan", emo("ok", 150, 176, E.benar, 24)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 34, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("lingkaran,", bulat("lk", 70, 112, 30, "#BFDBFE", W.biru, { tebal: 2 }), emo("x1", 70, 168, E.salah, 22)),
      tambah("dinding", kotak("pl", 130, 104, 150, 16, "#BFDBFE", W.biru, { rx: 2, tebal: 1.8 })),
      tambah("lurus.", emo("x2", 205, 150, E.geleng, 22)),
    ),
  ],
};

/* ------------------------------ Fold and Shade: konsep ------------------------------ */
const SUARA_F1 = "Cara ketiga, Fold and Shade, atau Lipat dan Warnai. Cara ini memakai selembar kertas.";
const SUARA_F2 = "Lipat kertas dua kali supaya terbentuk empat bagian, lalu buka.";
const SUARA_F3 = "Warnai satu bagian, dan itulah seperempat.";
const SUARA_F4 = "Lipatan yang rapi membuat keempat bagian sama besar, dan warnanya mudah dilihat.";

export const ADEGAN_LUAR_LIPAT: AdeganStory = {
  id: "luar-lipat",
  judul: "Fold and Shade: Lipat dan Warnai",
  sumber: "Metode global: Fold and Shade (konsep)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_F1,
      bersih(0),
      tambah(0, judul("Cara Ketiga")),
      tambah("Fold", ...kartu("nm", 50, 34, 200, 26, W.krem, ["Fold and Shade"], 13)),
      tambah("Lipat", teks("nid", 150, 88, "Lipat dan Warnai", 12, W.ungu)),
      tambah("selembar", kertas("kr", 125, 106, 50)),
      tambah("kertas.", emo("ks", 200, 150, E.kuas, 26)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Lipat Dua Kali")),
      tambah("kertas", kertas("kr", 100, 40, 100)),
      tambah("dua", teks("n2", 250, 60, "2 kali", 10, W.merah)),
      tambah("terbentuk", garis("g1", 150, 40, 0, 100, W.biru, 2, { putus: true, z: 2 }), garis("g2", 100, 90, 100, 0, W.biru, 2, { putus: true, z: 2 })),
      tambah("empat", teks("n4", 250, 90, "4 bagian", 10, W.merah)),
      ubah("buka.", { id: "g1", putus: false }, { id: "g2", putus: false }),
    ),
    k(
      SUARA_F3,
      hapus(0, "n2", "n4"),
      tambah("satu", kotak("wn", 101, 41, 49, 49, W.emas, W.biru, { rx: 0, tebal: 1.2, z: 1 }), teks("n1", 250, 70, "1 bagian", 10, W.merah)),
      tambah("seperempat.", ...label("lb", 150, 160, "seperempat", 8)),
    ),
    k(
      SUARA_F4,
      tambah("rapi", emo("b1", 70, 70, E.bintang, 22)),
      sorotkan("sama", "g1", "g2"),
      tambah("warnanya", emo("b2", 235, 130, E.bintang, 20)),
      tambah("dilihat.", emo("kc", 250, 170, E.kaca, 24)),
    ),
  ],
};

/* ------------------------------ Fold and Shade: terapan ------------------------------ */
const SUARA_G1 = "Dika melipat kertas persegi tegak lalu mendatar, lalu mewarnai satu persegi kecil.";
const SUARA_G2 = "Satu dari empat bagian sama besar tertutup warna, jadi bagian berwarna itu seperempat dari seluruh kertas.";
const SUARA_G3 = "Cocok kalau kita ingin menunjukkan seperempat dari seluruh gambar dengan jelas.";
const SUARA_G4 = "Kurang cocok kalau kertasnya basah atau sobek, karena lipatannya tidak rapi.";

export const ADEGAN_LUAR_LIPAT_TERAPAN: AdeganStory = {
  id: "luar-lipat-terapan",
  judul: "Dika melipat dan mewarnai",
  sumber: "Metode global: Fold and Shade (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Melipat dan Mewarnai")),
      tambah("Dika", ...tokoh("dk", 40, 178, "Dika")),
      tambah("kertas", kertas("kr", 110, 40, 90)),
      tambah("tegak", garis("g1", 155, 40, 0, 90, W.biru, 2, { putus: true, z: 2 })),
      tambah("mendatar,", garis("g2", 110, 85, 90, 0, W.biru, 2, { putus: true, z: 2 })),
      tambah("satu", kotak("wn", 111, 41, 43, 43, W.emas, W.biru, { rx: 0, tebal: 1.2, z: 1 }), teks("n1", 250, 70, "1 persegi", 10, W.merah)),
    ),
    k(
      SUARA_G2,
      tambah("Satu", teks("m1", 250, 94, "1 dari", 10, W.merah)),
      tambah("empat", teks("m4", 250, 112, "4 bagian", 10, W.merah)),
      sorotkan("warna,", "wn"),
      tambah("seperempat", ...label("lb", 55, 62, "seperempat", 8), panah("pl", 84, 62, 24, 0, W.ungu, 2.2)),
      tambah("kertas.", kotak("bk", 106, 36, 98, 98, "none", W.merah, { rx: 2, tebal: 2, z: 3, op: 0.7 })),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 34, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("menunjukkan", kertas("kr", 110, 70, 80), garis("g1", 150, 70, 0, 80, W.biru, 1.6, { putus: true, z: 2 }), garis("g2", 110, 110, 80, 0, W.biru, 1.6, { putus: true, z: 2 })),
      tambah("seperempat", kotak("wn", 111, 71, 39, 39, W.emas, W.biru, { rx: 0, tebal: 1.2, z: 1 }), panah("pl", 70, 90, 38, 0, W.ungu, 2.4)),
      tambah("jelas.", emo("ok", 150, 170, E.benar, 26)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 34, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("kertasnya", poligon("sb", [[100, 76], [150, 70], [160, 86], [200, 78], [202, 140], [100, 142]], W.putih, W.biru, { tebal: 1.8 })),
      tambah("basah", emo("tt1", 120, 118, "\u{1F4A7}", 20), emo("tt2", 170, 126, "\u{1F4A7}", 20)),
      tambah("sobek,", garis("sk", 146, 74, 10, 24, W.merah, 2.2, { putus: true, z: 3 })),
      tambah("tidak", emo("x1", 245, 110, E.salah, 26)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung tugasnya dan bendanya.";
const SUARA_R2 = "Ingin membagi benda yang bisa dipotong, pakai Belah Dua Kali. Ingin membandingkan utuh, setengah, dan seperempat, pakai Dinding Pecahan.";
const SUARA_R3 = "Ingin menunjukkan seperempat pada gambar, pakai Lipat dan Warnai. Apa pun caranya, keempat bagian harus sama besar.";
const SUARA_R4 = "Menurutmu, untuk membagi petak tanah menjadi empat bagian sama besar, kamu pilih cara yang mana, dan mengapa?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Memilih cara yang pas",
  sumber: "Metode global: ringkasan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Tiga Cara")),
      tambah("tiga", teks("t3", 262, 40, "3 cara", 10, W.ungu)),
      tambah("cara.", ...[0, 1, 2].flatMap((i) => kartu(`r${i}`, 30, 38 + i * 44, 200, 32, [W.krem, W.langit, W.pink][i], [`${i + 1}. ${NAMA_METODE_ID[i]}`], 10.4))),
      tambah("Mana", emo("tq", 262, 110, E.tanya, 28)),
      tambah("tergantung", teks("tg", 150, 190, "tugas dan benda", 10, W.merah)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq", "tg"),
      tambah("dipotong,", emo("gt", 262, 62, E.gunting, 24)),
      sorotkan("Belah", "r0-k"),
      tambah("Dua", teks("d2", 262, 84, "2 kali", 9, W.merah)),
      redamkan("utuh,", "r0-k"),
      sorotkan("utuh,", "r1-k"),
      tambah("Dinding", kotak("dk1", 242, 108, 40, 7, "#BFDBFE", W.biru, { rx: 1, tebal: 1.2 }), kotak("dk2", 242, 115, 20, 7, "#BBF7D0", W.biru, { rx: 1, tebal: 1.2 }), kotak("dk3", 262, 115, 20, 7, "#BBF7D0", W.biru, { rx: 1, tebal: 1.2 })),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r1-k"),
      tambah("gambar,", kertas("kr", 250, 140, 28, "#FEF08A"), garis("kg", 264, 140, 0, 28, W.biru, 1.2, { putus: true })),
      sorotkan("Lipat", "r2-k"),
      tambah("keempat", emo("ks", 262, 190, E.kuas, 20)),
      tambah("besar.", emo("ok", 150, 190, E.benar, 22)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih Cara yang Pas")),
      tambah("petak", ...petak("pt", 105, 40, 90)),
      tambah("empat", teks("n4", 250, 80, "4 bagian", 10, W.merah)),
      tambah("sama", tali("v1", 150, 40, 0, 90), tali("v2", 105, 85, 90, 0)),
      tambah("mengapa?", emo("tq", 150, 170, E.tanya, 30)),
    ),
  ],
};
