import type { AdeganStory } from "./logika-story";
import { D, E, W, bak, bakTegak, bulat, emo, garisPec, judul, kain, panah, pecahan, tanah, teks, tokoh } from "./k4b2b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b2b-bantu";

/*
 * Cerita orisinal IGIL "Bak Warna Pak Joyo" (K4 Bab 2 Sub-Bab B, membandingkan dan mengurutkan pecahan berpenyebut sama), cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2b.md. Bagian ini: mengurutkan tiga bak, garis pecahan, penutup (jembatan ke Sub-Bab C).
 */

/* ------------------------------ 7. Mengurutkan tiga bak ------------------------------ */
const SUARA_U1 = "Pak Joyo membawa tiga bak lagi, berisi dua per delapan, lima per delapan, dan tujuh per delapan.";
const SUARA_U2 = "Genta berkata, penyebutnya sama, jadi kita lihat pembilangnya saja: dua, lima, tujuh.";
const SUARA_U3 = "Urutan dari yang paling sedikit adalah dua per delapan, lima per delapan, lalu tujuh per delapan.";

export const ADEGAN_URUT: AdeganStory = {
  id: "urut",
  judul: "Mengurutkan tiga bak",
  sumber: "Materi: mengurutkan tiga bak",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Tiga Bak Lagi"), ...tokoh("pj", 270, 184, "Pak Joyo")),
      tambah("tiga", teks("n3", 262, 70, "3 bak", 11, W.ungu)),
      tambah("dua", ...bakTegak("u2", 40, 34, 44, 84, 8, 2, D.biru), ...pecahan("f2", 62, 140, 2, 8, 16, W.biru)),
      tambah("lima", ...bakTegak("u5", 110, 34, 44, 84, 8, 5, D.merah), ...pecahan("f5", 132, 140, 5, 8, 16, W.merah)),
      tambah("tujuh", ...bakTegak("u7", 180, 34, 44, 84, 8, 7, D.hijau), ...pecahan("f7", 202, 140, 7, 8, 16, W.hijauTua)),
    ),
    k(
      SUARA_U2,
      hapus(0, "n3"),
      tambah("Genta", ...tokoh("gt", 30, 184, "Genta")),
      tambah("penyebutnya", teks("ps", 170, 176, "penyebut sama", 9, W.hijau)),
      tambah("dua,", bulat("o2", 62, 135, 9, undefined, W.merah, { tebal: 2.4, z: 5 })),
      tambah("lima,", bulat("o5", 132, 135, 9, undefined, W.merah, { tebal: 2.4, z: 5 })),
      tambah("tujuh.", bulat("o7", 202, 135, 9, undefined, W.merah, { tebal: 2.4, z: 5 })),
    ),
    k(
      SUARA_U3,
      hapus(0, "ps"),
      tambah("sedikit", teks("sd", 62, 28, "paling sedikit", 8, W.tinta)),
      tambah("dua", panah("a1", 90, 76, 14, 0, W.merah, 2.4)),
      tambah("lima", panah("a2", 160, 76, 14, 0, W.merah, 2.4)),
      tambah("tujuh", teks("bn", 202, 28, "paling banyak", 8, W.tinta)),
    ),
  ],
};

/* ------------------------------ 8. Garis pecahan ------------------------------ */
const SUARA_GA1 = "Laras menaruh ketiga pecahan itu pada garis dari nol sampai satu yang dibagi delapan.";
const SUARA_GA2 = "Dua per delapan berada paling kiri, lalu lima per delapan, dan tujuh per delapan paling dekat dengan satu.";
const SUARA_GA3 = "Pak Joyo mengangguk, karena urutan di garis sama dengan urutan pembilang.";
const TITIK = (id: string, x: number): ReturnType<typeof bulat> => bulat(id, x, 120, 6, "#FACC15", W.tinta, { tebal: 1.4, z: 4 });

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis",
  judul: "Garis pecahan",
  sumber: "Materi: garis pecahan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_GA1,
      tambah(0, judul("Garis Pecahan"), ...tokoh("lr", 40, 184, "Laras")),
      tambah("garis", ...garisPec("gl", 24, 120, 240, 8)),
      tambah("nol", teks("z0", 24, 140, "0", 11, W.tinta)),
      tambah("satu", teks("z1", 264, 140, "1", 11, W.tinta)),
      tambah("dibagi", teks("z8", 144, 152, "8 bagian sama besar", 9, W.tinta)),
    ),
    k(
      SUARA_GA2,
      tambah("Dua", ...pecahan("p2", 84, 84, 2, 8, 16, W.biru), TITIK("t2", 84)),
      tambah("lima", ...pecahan("p5", 174, 84, 5, 8, 16, W.merah), TITIK("t5", 174)),
      tambah("tujuh", ...pecahan("p7", 234, 84, 7, 8, 16, W.hijauTua), TITIK("t7", 234)),
      sorotkan("satu.", "t7"),
    ),
    k(
      SUARA_GA3,
      tambah("Pak", ...tokoh("pj", 270, 184, "Pak Joyo")),
      tambah("mengangguk,", emo("jm", 240, 164, E.jempol, 22)),
      tambah("urutan", panah("ar", 40, 68, 200, 0, W.merah, 2.4)),
      tambah("pembilang.", teks("pm", 150, 60, "urutan sama dengan pembilang", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Kak Sekar datang ------------------------------ */
const SUARA_P1 = "Kak Sekar, penjahit sanggar, datang membawa meteran dan setumpuk kain potongan.";
const SUARA_P2 = "Ia bilang ada potongan yang bagiannya berbeda, tetapi sama besar.";
const SUARA_P3 = "Menurutmu, mungkinkah satu per dua sama besar dengan dua per empat? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Pak Joyo!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Kak Sekar datang",
  sumber: "Materi: Kak Sekar dan jembatan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Kak Sekar Datang"), ...tanah("tn", 120)),
      tambah("Kak", ...tokoh("ks", 150, 184, "Kak Sekar")),
      tambah("penjahit", emo("jr", 96, 164, E.benang, 22)),
      tambah("meteran", teks("tm", 98, 140, "meteran", 8, W.coklat), panah("pm", 114, 144, 20, 18, W.coklat, 1.6)),
      tambah("setumpuk", ...kain("tk1", 200, 150, 44, 12, D.biru), ...kain("tk2", 204, 138, 44, 12, D.merah), ...kain("tk3", 208, 126, 44, 12, D.kuning)),
    ),
    k(
      SUARA_P2,
      hapus(0, "tm", "pm"),
      tambah("potongan", ...bak("pa", 40, 56, 80, 22, 2, 1, D.biru), ...bak("pb", 170, 56, 80, 22, 4, 2, D.merah)),
      tambah("berbeda,", teks("bg", 150, 104, "bagian berbeda", 10, W.tinta)),
      tambah("sama", teks("sb", 150, 118, "sama besar", 11, W.hijau)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Sama Besar?"), ...bak("qa", 40, 46, 80, 22, 2, 1, D.biru), ...bak("qb", 180, 46, 80, 22, 4, 2, D.merah), teks("tq", 150, 66, "?", 28, W.merah)),
      tambah("satu", ...pecahan("g1", 80, 94, 1, 2, 16, W.biru).slice(0, 2)),
      tambah("dua", ...pecahan("g1", 80, 94, 1, 2, 16, W.biru).slice(2)),
      tambah("dua@2", ...pecahan("g2", 220, 94, 2, 4, 16, W.merah).slice(0, 2)),
      tambah("empat?", ...pecahan("g2", 220, 94, 2, 4, 16, W.merah).slice(2)),
      tambah("kasih,", ...tokoh("ks", 184, 184, "Kak Sekar")),
      tambah("Satria,", ...tokoh("st", 68, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 102, 184, "Laras")),
      tambah("Genta,", ...tokoh("gt", 136, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 24, 184, "Pak Hendro")),
      tambah("Pak@2", ...tokoh("pj", 262, 184, "Pak Joyo")),
      tambah("Joyo!", emo("w1", 24, 148, E.lambai, 18), emo("w2", 68, 148, E.lambai, 18), emo("w3", 102, 148, E.lambai, 18), emo("w4", 136, 148, E.lambai, 18), emo("w5", 184, 148, E.lambai, 18), emo("w6", 262, 148, E.lambai, 18)),
    ),
  ],
};
