import type { AdeganStory } from "./logika-story";
import { E, F18, F24, W, bijiMerah, bijiPutih, cincin, deretKue, emo, idDeret, judul, kardus, kartuFaktor, lantai, meja, papanCongklak, papanTulis, teks, tokoh } from "./k5b2d-gambar";
import { hapus, k, sorotkan, tambah } from "./k5b2d-bantu";

/*
 * Cerita orisinal IGIL "Kotak Bingkisan Pak Joko" (Kelas 5 Bab 2 Sub-Bab D), Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2d.md. Bagian ini: Pak Joko datang membawa kotak dan kue, Bima menulis dua daftar faktor, dan papan congklak faktor.
 */

/* ------------------------------ 1. Kotak dan kue ------------------------------ */
const SUARA_KOTAK1 = "Pak Joko datang membawa tumpukan kotak kosong, dua puluh empat klepon, dan delapan belas onde-onde.";
const SUARA_KOTAK2 = "Tiap kotak harus berisi klepon yang sama banyak dan onde-onde yang sama banyak.";
const SUARA_KOTAK3 = "Semua kue harus terpakai, dan kotaknya harus sebanyak-banyaknya.";

export const ADEGAN_KOTAK: AdeganStory = {
  id: "kotak",
  judul: "Pak Joko membawa kotak dan kue",
  sumber: "Materi: kotak kosong, klepon, onde-onde",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_KOTAK1,
      tambah(0, judul("Pak Joko Datang"), ...lantai("lt", 150)),
      tambah("Joko", ...tokoh("pj", 36, 184, "Pak Joko")),
      tambah("tumpukan", ...meja("mj", 70, 128, 226), ...kardus("kd1", 78, 100, 30, 28), ...kardus("kd2", 82, 86, 22, 14)),
      tambah("klepon", ...deretKue("kl", 120, 108, 24, "klepon", 12, 8), teks("tk", 164, 98, "24 klepon", 8.5, W.hijauTua)),
      tambah("onde-onde", ...deretKue("od", 222, 108, 18, "onde", 9, 8), teks("to", 254, 98, "18 onde-onde", 8.5, W.onde)),
    ),
    k(
      SUARA_KOTAK2,
      tambah("Tiap", ...kardus("b1", 90, 156, 34, 22), ...kardus("b2", 134, 156, 34, 22), ...kardus("b3", 178, 156, 34, 22)),
      tambah("klepon", teks("s1", 250, 166, "klepon sama", 9, W.hijauTua)),
      tambah("onde-onde", teks("s2", 250, 180, "onde-onde sama", 9, W.onde)),
    ),
    k(
      SUARA_KOTAK3,
      tambah("Semua", emo("ok", 250, 80, E.benar, 18)),
      sorotkan("terpakai", ...idDeret("kl", 24), ...idDeret("od", 18)),
      hapus("kotaknya", "s1", "s2"),
      tambah("kotaknya", ...kardus("b4", 222, 156, 34, 22), ...kardus("b5", 262, 156, 34, 22)),
      tambah("sebanyak-banyaknya", teks("sb", 150, 196, "kotak sebanyak-banyaknya", 8.5, W.coklat)),
    ),
  ],
};

/* ------------------------------ 2. Dua daftar faktor ------------------------------ */
const SUARA_DAFTAR1 = "Bima menulis faktor dua puluh empat: satu, dua, tiga, empat, enam, delapan, dua belas, dan dua puluh empat.";
const SUARA_DAFTAR2 = "Lalu faktor delapan belas: satu, dua, tiga, enam, sembilan, dan delapan belas.";
const SUARA_DAFTAR3 = "Banyak kotak harus menjadi faktor kedua bilangan itu sekaligus.";

const chipBaris = (awal: string, y: number, daftar: number[], warna: string) => daftar.map((f, i) => kartuFaktor(`${awal}${f}`, 14 + i * 25, y, f, warna));

export const ADEGAN_DAFTAR: AdeganStory = {
  id: "daftar",
  judul: "Bima menulis dua daftar faktor",
  sumber: "Materi: faktor 24 dan faktor 18",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_DAFTAR1,
      tambah(0, judul("Bima Menulis Faktor"), ...lantai("lt", 150), papanTulis("pn", 6, 28, 288, 114)),
      tambah("Bima", ...tokoh("bi", 266, 184, "Bima")),
      tambah("faktor", teks("l24", 14, 50, "Faktor 24", 9, W.kapur, { anchor: "start", z: 2 })),
      ...chipBaris("a", 56, F24, W.krem).map((c, i) => tambah([6, 7, 8, 9, 10, 11, 12, 15][i], ...c)),
    ),
    k(
      SUARA_DAFTAR2,
      tambah("faktor", teks("l18", 14, 92, "Faktor 18", 9, W.kapur, { anchor: "start", z: 2 })),
      ...chipBaris("b", 98, F18, "#DBEAFE").map((c, i) => tambah([4, 5, 6, 7, 8, 10][i], ...c)),
    ),
    k(
      SUARA_DAFTAR3,
      tambah("Banyak", emo("hd", 250, 72, E.hadiah, 20)),
      tambah("faktor", teks("bk", 150, 136, "kotak = faktor keduanya", 9, W.kapur, { z: 2 })),
      sorotkan("sekaligus", ...[1, 2, 3, 6].flatMap((f) => [`a${f}-k`, `b${f}-k`])),
    ),
  ],
};

/* ------------------------------ 3. Congklak faktor ------------------------------ */
const SUARA_CONGKLAK1 = "Pak Joko meminjamkan papan congklak, supaya faktor bisa dimainkan.";
const SUARA_CONGKLAK2 = "Biji merah diletakkan di lubang bernomor faktor dua puluh empat, biji putih di lubang faktor delapan belas.";
const SUARA_CONGKLAK3 = "Lubang yang berisi dua biji adalah satu, dua, tiga, dan enam.";

export const ADEGAN_CONGKLAK: AdeganStory = {
  id: "congklak",
  judul: "Papan congklak faktor",
  sumber: "Materi: congklak faktor 24 dan 18",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_CONGKLAK1,
      tambah(0, judul("Papan Congklak"), ...lantai("lt", 150)),
      tambah("Joko", ...tokoh("pj", 40, 184, "Pak Joko")),
      tambah("papan", ...papanCongklak("pc")),
      tambah("dimainkan", teks("mf", 190, 166, "bermain dengan faktor", 9.5, W.coklat)),
    ),
    k(
      SUARA_CONGKLAK2,
      tambah("merah", ...F24.map((no) => bijiMerah("bj", no)), teks("lm", 150, 160, "merah: faktor 24", 8.5, W.merah)),
      tambah("putih", ...F18.map((no) => bijiPutih("bj", no)), teks("lp", 150, 174, "putih: faktor 18", 8.5, W.biru)),
      hapus("putih", "mf"),
    ),
    k(
      SUARA_CONGKLAK3,
      tambah("satu", cincin("rg", 1), teks("db", 250, 166, "2 biji", 9.5, W.coklat)),
      tambah("dua@2", cincin("rg", 2)),
      tambah("tiga", cincin("rg", 3)),
      tambah("enam", cincin("rg", 6)),
    ),
  ],
};
