import type { AdeganStory } from "./logika-story";
import { W, anak, bagianEq, deretBintang, emo, eq, idDeret, judul, kartu, kotak, teks } from "./k3b2A-gambar";
import { bersih, hapus, idKartu, idx, k, sorotkan, tambah } from "./k3b2A-bantu";

/* ------------------------------ 2. Bintang Halim ------------------------------ */
const SUARA_B1 = "Halim suka bermain di dunia permainan. Ia mengumpulkan bintang di sana.";
const SUARA_B2 = "Sebagian bintang sudah ada di tas permainannya. Banyaknya belum Halim ingat.";
const SUARA_B3 = "Hari ini Halim mendapat lima bintang lagi.";
const SUARA_B4 = "Sekarang semua bintang Halim ada tujuh belas.";

export const ADEGAN_CERITA_BINTANG: AdeganStory = {
  id: "cerita-bintang",
  judul: "Bintang Halim",
  sumber: "Materi: bintang Halim",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bintang Halim")),
      tambah(idx(SUARA_B1, "Halim"), ...anak("halim", 40, 80)),
      tambah(idx(SUARA_B1, "permainan."), emo("gm", 130, 84, "\u{1F3AE}", 40)),
      tambah(idx(SUARA_B1, "bintang"), ...deretBintang("bs", 6, 186, 150, 18, 6, 15)),
    ),
    k(
      SUARA_B2,
      hapus(0, "gm", ...idDeret("bs", 1, 6)),
      tambah(idx(SUARA_B2, "tas"), kotak("tas-k", 90, 56, 120, 56, W.krem, W.biru, { rx: 10 }), teks("tas-t", 150, 130, "tas permainan", 9.4)),
      tambah(idx(SUARA_B2, "sudah"), ...deretBintang("ts", 6, 106, 80, 18, 6, 15)),
      tambah(idx(SUARA_B2, "belum"), emo("tn", 250, 90, "❓", 36)),
    ),
    k(
      SUARA_B3,
      hapus(0, "tn"),
      tambah(idx(SUARA_B3, "lima"), ...deretBintang("bn", 5, 224, 76, 18, 3, 15)),
      tambah(idx(SUARA_B3, "lagi."), ...kartu("dp", 218, 118, 72, 22, W.emas, ["dapat 5 lagi"], 9)),
    ),
    k(SUARA_B4, tambah(idx(SUARA_B4, "semua"), ...kartu("jm", 60, 154, 180, 30, W.hijauMuda, ["jumlah semuanya 17"], 11)), tambah(idx(SUARA_B4, "tujuh"), emo("ra", 262, 176, "\u{1F389}", 24))),
  ],
};

/* ------------------------------ 3. Bilangan belum diketahui ------------------------------ */
const SUARA_T1 = "Banyak bintang di tas belum kita ketahui. Kita menulisnya dengan titik-titik.";
const SUARA_T2 = "Bintang baru ada lima. Jumlah semuanya tujuh belas.";
const SUARA_T3 = "Inilah kalimat Matematikanya. Titik-titik tambah lima sama dengan tujuh belas.";
const SUARA_T4 = "Tugas kita mengisi titik-titik dengan bilangan yang tepat.";

export const ADEGAN_TITIK: AdeganStory = {
  id: "titik-titik",
  judul: "Bilangan yang belum diketahui",
  sumber: "Materi: bilangan belum diketahui",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Belum diketahui")),
      tambah(idx(SUARA_T1, "tas"), emo("tsk", 60, 96, "\u{1F392}", 42)),
      tambah(idx(SUARA_T1, "belum"), ...kartu("bd", 110, 60, 170, 30, W.merahMuda, ["belum diketahui"], 11)),
      tambah(idx(SUARA_T1, "titik-titik."), teks("tt", 150, 160, "…", 60, W.merah)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Kita tulis kalimatnya")),
      tambah(0, bagianEq("eq", 0, "…", 70, 24, W.merahMuda)),
      tambah(idx(SUARA_T2, "baru"), bagianEq("eq", 1, "+", 70, 24, W.emas)),
      tambah(idx(SUARA_T2, "lima."), bagianEq("eq", 2, "5")),
      tambah(idx(SUARA_T2, "Jumlah"), bagianEq("eq", 3, "=", 70, 24, W.emas)),
      tambah(idx(SUARA_T2, "belas."), bagianEq("eq", 4, "17")),
    ),
    k(
      SUARA_T3,
      tambah(idx(SUARA_T3, "kalimat"), ...kartu("kl", 40, 112, 220, 30, W.emas, ["kalimat Matematika"], 12)),
      sorotkan(idx(SUARA_T3, "Titik-titik"), "eq0-k"),
      sorotkan(idx(SUARA_T3, "tambah"), "eq1-k"),
      sorotkan(idx(SUARA_T3, "lima"), "eq2-k"),
      sorotkan(idx(SUARA_T3, "sama"), "eq3-k"),
      sorotkan(idx(SUARA_T3, "belas."), "eq4-k"),
    ),
    k(
      SUARA_T4,
      hapus(0, ...idKartu("kl")),
      tambah(idx(SUARA_T4, "mengisi"), emo("pn", 70, 166, "✏️", 34)),
      tambah(idx(SUARA_T4, "tepat."), ...kartu("tg", 110, 148, 160, 32, W.hijauMuda, ["isi titik-titik"], 12)),
    ),
  ],
};

/* ------------------------------ 4. Nama kalimat Matematika ------------------------------ */
const SUARA_N1 = "Bentuk seperti ini disebut kalimat Matematika.";
const SUARA_N2 = "Ada bilangan yang belum diketahui. Ada juga bilangan yang sudah diketahui.";
const SUARA_N3 = "Ada tanda tambah dan tanda sama dengan.";
const SUARA_N4 = "Tugas kita mengisi titik-titik supaya kalimatnya benar.";

export const ADEGAN_NAMA_KALIMAT: AdeganStory = {
  id: "nama-kalimat",
  judul: "Kalimat Matematika dan bagiannya",
  sumber: "Materi: kalimat Matematika",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_N1,
      bersih(0),
      tambah(0, judul("Kalimat Matematika")),
      tambah(idx(SUARA_N1, "Bentuk"), eq("eq", ["…", "+", "5", "=", "17"], 64)),
      tambah(idx(SUARA_N1, "kalimat"), ...kartu("kn", 30, 154, 240, 30, W.emas, ["kalimat Matematika"], 12)),
    ),
    k(
      SUARA_N2,
      tambah(idx(SUARA_N2, "belum"), ...kartu("l0", 4, 96, 94, 22, W.merahMuda, ["belum diketahui"], 8.6)),
      tambah(idx(SUARA_N2, "sudah"), ...kartu("l2", 105, 96, 90, 22, W.hijauMuda, ["diketahui"], 8.6), ...kartu("l4", 206, 96, 88, 22, W.hijauMuda, ["diketahui"], 8.6)),
    ),
    k(
      SUARA_N3,
      tambah(idx(SUARA_N3, "tambah"), ...kartu("l1", 58, 124, 80, 22, W.krem, ["tanda tambah"], 8.6)),
      tambah(idx(SUARA_N3, "sama"), ...kartu("l3", 150, 124, 104, 22, W.krem, ["tanda sama dengan"], 8.6)),
    ),
    k(
      SUARA_N4,
      hapus(0, ...idKartu("l0"), ...idKartu("l1"), ...idKartu("l2"), ...idKartu("l3"), ...idKartu("l4"), ...idKartu("kn")),
      sorotkan(idx(SUARA_N4, "titik-titik"), "eq0-k"),
      tambah(idx(SUARA_N4, "mengisi"), emo("bk", 150, 128, "\u{1F914}", 40)),
      tambah(idx(SUARA_N4, "benar."), ...kartu("kb", 60, 156, 180, 28, W.hijauMuda, ["kalimatnya benar"], 11)),
    ),
  ],
};
