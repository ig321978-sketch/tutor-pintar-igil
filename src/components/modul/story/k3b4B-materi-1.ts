import type { AdeganStory } from "./logika-story";
import { E, W, WL, bulat, emo, garis, judul, juring, kaki, kotak, panah, pojokKertas, rumput, spanduk, teks, tiang, tokoh } from "./k3b4B-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k3b4B-bantu";

/*
 * Cerita orisinal IGIL "Sudut Kak Anton" (Kelas 3 Bab 4 Sub-Bab B, sudut pada bidang datar), tengah cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4b.md. Bagian ini: Kak Anton mengatur tali, sudut dari dua bilah bambu, dan pojok kertas lipat.
 */

/* ------------------------------ 1. Tali layang-layang ------------------------------ */
const SUARA_T1 = "Keesokan harinya Raka, Salsa, dan Bima datang lagi ke lapangan bersama Pak Joko.";
const SUARA_T2 = "Kak Anton, pelatih lomba bertopi biru, sedang mengatur tali layang-layang.";
const SUARA_T3 = "Ia ingin sudut tali tepat supaya layang-layang naik dengan mantap.";

export const ADEGAN_TALI: AdeganStory = {
  id: "tali",
  judul: "Kak Anton mengatur tali",
  sumber: "Materi: Kak Anton mengatur tali",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Lapangan Layang-layang"), ...rumput("rt", 150), ...spanduk("sp", 50, 26, 200)),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 66, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 102, 184, "Bima")),
      tambah("lapangan", ...tiang("tg", 214, 150, 70)),
      tambah("Pak", ...tokoh("pj", 138, 184, "Pak Joko")),
    ),
    k(
      SUARA_T2,
      tambah("Kak", ...tokoh("ka", 262, 184, "Kak Anton")),
      sorotkan("bertopi", "ka-tp"),
      tambah("mengatur", emo("ly", 190, 66, E.layang, 28)),
      tambah("tali", garis("tl", 188, 72, 62, 90, WL.tali, 1.4)),
    ),
    k(
      SUARA_T3,
      tambah("sudut", juring("jr", 250, 162, 26, 125, 180), garis("tn", 250, 162, -62, 0, W.coklat, 1.6, { putus: true })),
      tambah("tepat", teks("st", 212, 150, "sudut tepat", 9, W.merah)),
      tambah("naik", panah("nk", 150, 110, 0, -26, W.hijau, 2.4)),
      tambah("mantap.", emo("ok", 30, 110, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 2. Sudut dari dua bilah ------------------------------ */
const SUARA_S1 = "Kak Anton menunjuk dua bilah bambu yang bertemu di satu ujung.";
const SUARA_S2 = "Titik pertemuan itu disebut titik sudut, dan kedua bilah disebut kaki sudut.";
const SUARA_S3 = "Dua kaki yang bertemu di titik sudut membentuk sebuah sudut.";

export const ADEGAN_SUDUT: AdeganStory = {
  id: "sudut",
  judul: "Sudut, titik sudut, dan kaki sudut",
  sumber: "Materi: sudut dari dua bilah bambu",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Dua Bilah Bambu"), ...rumput("rt", 150)),
      tambah("Kak", ...tokoh("ka", 262, 184, "Kak Anton")),
      tambah("menunjuk", emo("tg", 238, 150, E.tangan, 16)),
      tambah("dua", kaki("b1", 80, 140, 120, 0), kaki("b2", 80, 140, 110, 50), teks("n2", 230, 100, "2 bilah", 9, W.merah)),
      tambah("bertemu", bulat("o", 80, 140, 4, W.merah, W.biru, { z: 4 }), teks("oh", 68, 153, "O", 12, W.biru)),
      tambah("satu", teks("n1", 42, 120, "1 ujung", 9, W.hijauTua)),
    ),
    k(
      SUARA_S2,
      sorotkan("Titik", "o"),
      tambah("sudut,", teks("ts", 56, 170, "titik sudut", 9, W.merah), panah("pt", 62, 162, 12, -16, W.merah, 1.6)),
      sorotkan("bilah", "b1", "b2"),
      tambah("kaki", teks("k1", 150, 132, "kaki OA", 9, W.hijauTua), teks("k2", 190, 92, "kaki OB", 9, W.hijauTua)),
    ),
    k(
      SUARA_S3,
      tambah("Dua", teks("n3", 230, 120, "2 kaki", 9, W.merah)),
      tambah("membentuk", juring("jr", 80, 140, 30, 0, 50)),
      tambah("sebuah", teks("ha", 208, 146, "A", 11, W.biru), teks("hb", 160, 50, "B", 11, W.biru)),
      tambah("sudut@2", teks("sa", 190, 58, "sudut AOB", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Pojok kertas lipat ------------------------------ */
const SUARA_L1 = "Kak Anton melipat selembar kertas dua kali, lalu menunjukkan pojoknya.";
const SUARA_L2 = "Pojok itu sudut siku-siku, besarnya sembilan puluh derajat.";
const SUARA_L3 = "Salsa menempelkan pojok kertas pada tiang bendera dan tanah, dan keduanya pas.";

export const ADEGAN_LIPAT: AdeganStory = {
  id: "lipat",
  judul: "Pojok kertas lipat",
  sumber: "Materi: pojok kertas lipat siku-siku",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Melipat Kertas"), ...rumput("rt", 150)),
      tambah("Kak", ...tokoh("ka", 262, 184, "Kak Anton")),
      tambah("selembar", kotak("kr", 50, 50, 110, 90, W.putih, W.biru, { rx: 0, z: 1 })),
      tambah("dua", garis("f1", 50, 95, 110, 0, W.merah, 1.6, { putus: true, z: 2 }), garis("f2", 105, 50, 0, 90, W.merah, 1.6, { putus: true, z: 2 }), teks("n2", 205, 80, "2 kali", 11, W.merah)),
      tambah("pojoknya", bulat("pj", 50, 140, 4, W.merah, W.biru, { z: 4 })),
    ),
    k(
      SUARA_L2,
      hapus("Pojok", "f1", "f2", "n2"),
      tambah("sudut", kotak("sk", 50, 132, 8, 8, undefined, W.merah, { rx: 0, tebal: 1.4, z: 4 })),
      tambah("siku-siku,", teks("ss", 210, 70, "siku-siku", 10, W.hijauTua)),
      tambah("sembilan", teks("d90", 210, 100, "90°", 20, W.merah)),
      ubah("derajat", { id: "kr", sorot: true }),
    ),
    k(
      SUARA_L3,
      hapus("Salsa", "kr", "pj", "sk", "ss", "d90"),
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("pojok", ...pojokKertas("pk", 140, 124, 26)),
      tambah("tiang", ...tiang("tg", 140, 150, 90)),
      tambah("tanah,", garis("tn", 140, 150, 110, 0, W.coklat, 2.4, { z: 1 })),
      tambah("pas.", emo("ok", 216, 118, E.benar, 22)),
    ),
  ],
};
