import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kotak, pecah, rumput, sanggar, strip, teks, tokoh, ids } from "./k4b2d-gambar";
import { bersih, hapus, k, tambah, warnai } from "./k4b2d-bantu";

/*
 * Cerita orisinal IGIL "Meteran Kain Pak Bagas" (Kelas 4 Bab 2 Sub-Bab D), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2d.md. Bagian ini: pembuka (peti Pak Bagas), Tenths Grid (Kisi Persepuluhan), dan terapannya.
 */

export const NAMA_METODE = ["Tenths Grid", "Hundredths Grid", "Fraction Decimal Bridge"] as const;
export const NAMA_METODE_ID = ["Kisi Persepuluhan", "Kisi Perseratusan", "Jembatan Desimal"] as const;
const JINGGA = "#FDBA74";
/** Papan besar krem untuk adegan metode global: bingkai `pt-k`, tinggi h. */
const papan = (h = 124) => kotak("pt-k", 8, 28, 284, h, "#FFFBEB", W.coklat, { tebal: 2.4, z: 0 });

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di halaman sanggar, Pak Bagas membuka peti kecil yang berisi cara-cara menulis pecahan dengan koma.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya pecahan per sepuluh dan per seratus mudah ditulis sebagai desimal.";
const SUARA_O3 = "Tiga cara itu: Tenths Grid, Hundredths Grid, dan Fraction Decimal Bridge.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Kisi Persepuluhan, Kisi Perseratusan, dan Jembatan Desimal.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Peti Pak Bagas",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Peti Pak Bagas"), ...rumput("rp", 150)),
      tambah("sanggar,", ...sanggar("sg", 196, 84, 90, 52)),
      tambah("Pak", ...tokoh("pb", 62, 184, "Pak Bagas")),
      tambah("peti", kotak("pt-k2", 100, 128, 70, 30, "#C99A63", W.coklat, { z: 1 }), kotak("pt-t", 96, 118, 78, 12, "#A16207", W.coklat, { z: 2 })),
      tambah("cara-cara", emo("e1", 120, 112, E.benang, 18), emo("e2", 138, 112, E.wol, 18), emo("e3", 156, 112, E.pita, 18)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 150, 46, "3 cara", 11, W.ungu)),
      tambah("per", teks("n10", 110, 70, "per 10", 11, W.biru)),
      tambah("seratus", teks("n100", 190, 70, "per 100", 11, W.biru)),
      tambah("desimal.", emo("ok", 100, 98, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Tenths", teks("m0", 112, 76, "1. Tenths Grid", 12, W.biru), emo("i0", 34, 78, E.benang, 18)),
      tambah("Hundredths", teks("m1", 112, 124, "2. Hundredths Grid", 12, W.biru), emo("i1", 34, 126, E.wol, 18)),
      tambah("Bridge.", teks("m2", 112, 172, "3. Fraction Decimal Bridge", 12, W.biru), emo("i2", 34, 174, E.pita, 18)),
    ),
    k(
      SUARA_O4,
      tambah("Kisi", teks("g0", 248, 76, "Kisi Persepuluhan", 9, W.ungu), garis("l0", 188, 80, -18, 0, W.ungu, 1)),
      tambah("Perseratusan,", teks("g1", 248, 124, "Kisi Perseratusan", 9, W.ungu), garis("l1", 188, 128, -18, 0, W.ungu, 1)),
      tambah("Desimal.", teks("g2", 248, 172, "Jembatan Desimal", 9, W.ungu), garis("l2", 188, 176, -18, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Tenths Grid: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Tenths Grid, atau Kisi Persepuluhan.";
const SUARA_C2 = "Kita menggambar satu kisi yang dibagi menjadi sepuluh kolom sama besar.";
const SUARA_C3 = "Kolom yang diwarnai dihitung, dan banyaknya menjadi satu angka di belakang koma.";
const SUARA_C4 = "Sepuluh kolom penuh berarti satu utuh.";
const KS = ids("ks", 0, 9);

export const ADEGAN_LUAR_PERSEPULUH: AdeganStory = {
  id: "luar-persepuluh",
  judul: "Tenths Grid: Kisi Persepuluhan",
  sumber: "Metode global: Tenths Grid (konsep)",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Tenths Grid"), papan()),
      tambah("Tenths", teks("nm", 150, 66, "Tenths Grid", 16, W.merah, { z: 2 })),
      tambah("Kisi", teks("ni", 150, 92, "Kisi Persepuluhan", 12, W.biru, { z: 2 })),
      tambah("Persepuluhan.", emo("kk", 150, 136, E.benang, 32, { z: 2 })),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Satu Kisi"), papan()),
      tambah("menggambar", ...strip("ks", 24, 50, 252, 40)),
      tambah("satu", teks("o1", 60, 118, "1 kisi", 11, W.coklat, { z: 2 })),
      tambah("sepuluh", teks("o10", 240, 118, "10 kolom", 11, W.ungu, { z: 2 })),
    ),
    k(
      SUARA_C3,
      warnai("diwarnai", JINGGA, ...KS.slice(0, 4)),
      tambah("dihitung,", teks("c4", 150, 140, "4 kolom berwarna", 10, W.merah, { z: 2 })),
      tambah("satu", teks("a1", 150, 118, "1 angka koma", 11, W.biru, { z: 2 })),
    ),
    k(
      SUARA_C4,
      warnai("Sepuluh", JINGGA, ...KS.slice(4)),
      hapus("kolom", "c4"),
      tambah("satu", teks("ut", 150, 142, "= 1 utuh", 12, W.hijauTua, { z: 2 })),
    ),
  ],
};

/* ------------------------------ Tenths Grid: terapan ------------------------------ */
const SUARA_T1 = "Laras mewarnai tujuh kolom pada kisi sepuluh kolom.";
const SUARA_T2 = "Banyak kolom tujuh berarti tujuh per sepuluh, yang ditulis nol koma tujuh.";
const SUARA_T3 = "Cocok untuk pecahan dengan penyebut sepuluh, karena angkanya hanya satu di belakang koma.";
const SUARA_T4 = "Kurang cocok untuk pecahan per seratus, karena kolom sepuluh terlalu kasar untuk dua angka.";
const KT = ids("kt", 0, 9);

export const ADEGAN_LUAR_PERSEPULUH_TERAPAN: AdeganStory = {
  id: "luar-persepuluh-terapan",
  judul: "Kisi Persepuluhan: kapan cocok",
  sumber: "Metode global: Tenths Grid (terapan)",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Laras Mewarnai"), papan(112), ...tokoh("lr", 40, 184, "Laras")),
      tambah("mewarnai", ...strip("kt", 24, 44, 252, 40)),
      warnai("tujuh", JINGGA, ...KT.slice(0, 7)),
      tambah("tujuh", teks("l7", 80, 106, "7 kolom", 11, W.merah, { z: 2 })),
      tambah("sepuluh", teks("l10", 230, 106, "10 kolom", 11, W.ungu, { z: 2 })),
    ),
    k(
      SUARA_T2,
      tambah("tujuh", ...pecah("pc", 150, 114, "7", "10", 16)),
      tambah("ditulis", teks("sm", 180, 128, "=", 20, W.merah)),
      tambah("nol", teks("dc", 215, 132, "0,7", 24, W.biru)),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 40, 128, E.benar, 22)),
      tambah("satu", teks("s1", 80, 134, "1 angka", 11, W.hijauTua)),
    ),
    k(
      SUARA_T4,
      hapus("Kurang", "ok", "s1", "pc-a", "pc-g", "pc-b", "sm", "dc"),
      tambah("Kurang", emo("xs", 40, 128, E.salah, 22)),
      tambah("seratus", teks("s100", 220, 122, "per 100", 11, W.ungu)),
      tambah("dua", teks("s2", 220, 136, "2 angka", 11, W.merah)),
    ),
  ],
};
