import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, judul, kainBar, kotak, lantai, panah, pecahan, idKain, teks, tokoh } from "./k4b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b2c-bantu";

/*
 * Cerita orisinal IGIL "Meja Jahit Kak Sekar" (Kelas 4 Bab 2 Sub-Bab C), cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2c.md. Bagian ini: mengalikan pembilang dan penyebut, menyederhanakan, penutup dan jembatan ke Sub-Bab D.
 */

/* ------------------------------ 7. Mengalikan pembilang dan penyebut ------------------------------ */
const SUARA_L1 = "Genta mengalikan pembilang dan penyebut satu per dua dengan dua.";
const SUARA_L2 = "Hasilnya dua per empat, dan kalau dikali empat, hasilnya empat per delapan.";
const SUARA_L3 = "Bagiannya jadi lebih banyak dan lebih kecil, tetapi besar seluruhnya tetap sama.";
const PC_L1 = pecahan("pa", 110, 90, 1, 2, 28);
const R1 = pecahan("p1", 50, 100, 1, 2, 24);
const R2 = pecahan("p2", 150, 100, 2, 4, 24);
const R3 = pecahan("p3", 250, 100, 4, 8, 24);

export const ADEGAN_KALI: AdeganStory = {
  id: "kali",
  judul: "Kali dengan bilangan sama",
  sumber: "Materi: mengalikan pembilang dan penyebut",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kali Dua"), ...tokoh("ge", 40, 184, "Genta")),
      tambah("satu", PC_L1[0]),
      tambah("per", PC_L1[1]),
      tambah("dua", PC_L1[2]),
      tambah("dengan", teks("x1", 160, 82, "×2", 14, W.merah)),
      tambah("dua.", teks("x2", 160, 106, "×2", 14, W.merah)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Kali Dua"), ...tokoh("ge", 40, 184, "Genta"), ...R1),
      tambah("empat,", ...R2, teks("e1", 100, 106, "=", 20, W.ungu), panah("a1", 58, 66, 84, 0, W.merah, 2), teks("l1", 100, 60, "×2", 12, W.merah)),
      tambah("dikali", panah("a2", 58, 40, 184, 0, W.merah, 2), teks("l2", 150, 34, "×4", 12, W.merah)),
      tambah("delapan.", ...R3, teks("e2", 200, 106, "=", 20, W.ungu)),
    ),
    k(
      SUARA_L3,
      tambah(0, ...kainBar("b1", 12, 124, 76, 14, 2, 1)),
      tambah("banyak", ...kainBar("b2", 112, 124, 76, 14, 4, 2), ...kainBar("b3", 212, 124, 76, 14, 8, 4)),
      sorotkan("kecil,", ...idKain("b3", 8)),
      tambah("sama.", teks("sm", 210, 160, "sama besar", 11, W.hijauTua), emo("ok", 262, 156, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 8. Menyederhanakan ------------------------------ */
const SUARA_D1 = "Kak Sekar menunjukkan potongan enam per delapan.";
const SUARA_D2 = "Laras membagi pembilang dan penyebut dengan dua, dan hasilnya tiga per empat.";
const SUARA_D3 = "Pecahan seperti itu disebut lebih sederhana, karena angkanya lebih kecil tetapi besarnya sama.";
const PC_D1 = pecahan("pc", 120, 150, 6, 8, 22);
const PC_D2 = pecahan("pd", 230, 150, 3, 4, 22);

export const ADEGAN_SEDERHANA: AdeganStory = {
  id: "sederhana",
  judul: "Pecahan yang lebih sederhana",
  sumber: "Materi: menyederhanakan pecahan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Enam Per Delapan"), ...tokoh("ks", 40, 184, "Kak Sekar")),
      tambah("potongan", ...kainBar("kb", 80, 56, 160, 28, 8, 6)),
      tambah("enam", PC_D1[0]),
      tambah("per", PC_D1[1]),
      tambah("delapan.", PC_D1[2]),
    ),
    k(
      SUARA_D2,
      tambah("Laras", ...tokoh("lr", 84, 184, "Laras")),
      tambah("pembilang", panah("ar", 144, 150, 56, 0, W.merah, 2)),
      tambah("dengan", teks("dv", 172, 140, "÷2", 14, W.merah)),
      tambah("tiga", PC_D2[0]),
      tambah("empat.", PC_D2[1], PC_D2[2]),
    ),
    k(
      SUARA_D3,
      hapus(0, ...PC_D1.map((o) => o.id), ...PC_D2.map((o) => o.id), "ar", "dv"),
      tambah("disebut", ...kainBar("sb", 80, 92, 160, 28, 4, 3)),
      tambah("sederhana,", teks("ls", 150, 142, "lebih sederhana", 11, W.merah)),
      sorotkan("kecil", ...idKain("sb", 4)),
      tambah("sama.", teks("sm", 262, 90, "=", 20, W.ungu), garis("gv", 200, 50, 0, 72, W.merah, 1.6, { putus: true, z: 5 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Pak Bagas, penjual kain meteran, datang sambil memanggul gulungan kain panjang.";
const SUARA_P2 = "Ia bilang kainnya dibagi sepuluh dan seratus bagian, dan harus ditulis dengan koma.";
const SUARA_P3 = "Menurutmu, bagaimana menulis tiga per sepuluh dengan koma? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Kak Sekar!";
const PC_TUTUP = pecahan("pq", 150, 70, 3, 10, 26);
const kisi100 = (): ReturnType<typeof kotak>[] =>
  Array.from({ length: 100 }, (_, i) => kotak(`kd${i}`, 190 + (i % 10) * 7, 62 + Math.floor(i / 10) * 7, 7, 7, i < 30 ? W.arsir : W.kain, W.arsirTua, { rx: 0, tebal: 0.5, z: 1 }));

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pak Bagas datang",
  sumber: "Materi: penutup dan jembatan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pak Bagas Datang"), ...lantai("lt", 150)),
      tambah("Bagas,", ...tokoh("pb", 70, 184, "Pak Bagas")),
      tambah("meteran,", emo("mt", 150, 96, E.meteran, 26)),
      tambah("gulungan", bulat("gk", 236, 128, 15, "#C084FC", "#6B21A8", { z: 2 }), bulat("gk-i", 236, 128, 5, "#FFFFFF", "#6B21A8", { tebal: 1, z: 3 })),
      tambah("panjang.", kotak("gp", 140, 120, 80, 16, "#DDD6FE", "#6B21A8", { rx: 2, tebal: 1.2, z: 1 }), teks("pj", 180, 148, "kain panjang", 8, W.ungu)),
    ),
    k(
      SUARA_P2,
      hapus(0, "mt", "gk", "gk-i", "gp", "pj"),
      tambah("sepuluh", ...kainBar("kb", 30, 70, 120, 16, 10, 3), teks("n10", 90, 60, "10 bagian", 10, W.ungu)),
      tambah("seratus", ...kisi100(), teks("n100", 225, 146, "100 bagian", 10, W.ungu)),
      tambah("koma.", teks("km", 90, 112, "tulis dengan koma", 9, W.merah)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah("tiga", PC_TUTUP[0]),
      tambah("per", PC_TUTUP[1]),
      tambah("sepuluh", PC_TUTUP[2]),
      tambah("koma?", teks("tq", 210, 78, "= ?", 24, W.merah)),
      tambah("Satria,", ...tokoh("sa", 30, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 72, 184, "Laras")),
      tambah("Genta,", ...tokoh("ge", 114, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 160, 184, "Pak Hendro")),
      tambah("Sekar!", ...tokoh("ks", 214, 184, "Kak Sekar"), emo("lb", 252, 160, E.lambai, 22)),
    ),
  ],
};
