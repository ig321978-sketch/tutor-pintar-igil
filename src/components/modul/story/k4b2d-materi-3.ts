import type { AdeganStory } from "./logika-story";
import { E, W, emo, ids, judul, kisi, kotak, panah, pecah, rumput, teks, tokoh } from "./k4b2d-gambar";
import { bersih, k, sorotkan, tambah, ubah, warnai } from "./k4b2d-bantu";

/*
 * Cerita orisinal IGIL "Meteran Kain Pak Bagas" (Kelas 4 Bab 2 Sub-Bab D, pecahan per sepuluh dan per seratus menjadi desimal), Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2d.md. Bagian ini: seratus bagian, jembatan pecahan ke desimal, dan penutup (jembatan ke Sub-Bab E).
 */
const JINGGA = "#FDBA74";
const KS = ids("ks", 0, 99);

/* ------------------------------ 7. Seratus bagian ------------------------------ */
const SUARA_R1 = "Pak Bagas membagi satu meter menjadi seratus bagian dan memotong dua puluh tujuh bagian.";
const SUARA_R2 = "Dua puluh tujuh per seratus ditulis nol koma dua tujuh, dengan dua angka di belakang koma.";
const SUARA_R3 = "Dua angka di belakang koma menunjukkan perseratusan.";

export const ADEGAN_SERATUS: AdeganStory = {
  id: "seratus",
  judul: "Seratus bagian",
  sumber: "Materi: kisi seratus kotak",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Seratus Bagian"), ...tokoh("pb", 262, 184, "Pak Bagas")),
      tambah("membagi", ...kisi("ks", 24, 34, 14, 10)),
      tambah("satu", teks("l1", 224, 56, "1 meter", 11, W.coklat)),
      tambah("seratus", teks("l100", 224, 82, "100 bagian", 11, W.ungu)),
      warnai("dua", JINGGA, ...KS.slice(0, 20)),
      warnai("tujuh", JINGGA, ...KS.slice(20, 27)),
      tambah("tujuh", teks("l27", 224, 108, "27 bagian", 11, W.merah)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Dua Puluh Tujuh Per Seratus")),
      tambah("Dua", ...pecah("pc", 80, 90, "27", "100", 30)),
      tambah("ditulis", teks("sm", 150, 110, "=", 28, W.merah)),
      tambah("nol", teks("dc", 215, 112, "0,27", 30, W.biru)),
      tambah("angka", teks("a2", 215, 146, "2 angka", 12, W.merah)),
    ),
    k(
      SUARA_R3,
      tambah("angka", panah("pa", 215, 152, -40, 16, W.ungu, 1.8)),
      ubah("koma", { id: "dc", warna: W.hijauTua }),
      tambah("menunjukkan", teks("pr", 150, 178, "perseratusan", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 8. Jembatan ------------------------------ */
const SUARA_J1 = "Laras menulis jembatan, pecahan di kiri dan desimal di kanan.";
const SUARA_J2 = "Penyebut sepuluh memberi satu angka di belakang koma, dan penyebut seratus memberi dua angka.";
const SUARA_J3 = "Pak Bagas mengangguk, karena kedua cara menulis itu menunjukkan besar yang sama.";

export const ADEGAN_JEMBATAN: AdeganStory = {
  id: "jembatan",
  judul: "Jembatan pecahan ke desimal",
  sumber: "Materi: jembatan desimal",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jembatan Laras"), ...tokoh("lr", 150, 184, "Laras")),
      tambah("menulis", kotak("jk-k", 30, 60, 80, 70, "#C7D2FE", W.biru), teks("jk-t", 70, 100, "pecahan", 12, W.biru, { z: 2 })),
      tambah("jembatan,", kotak("pl", 108, 84, 84, 8, "#B7814A", W.coklat, { z: 2 }), kotak("pt1", 112, 92, 6, 20, "#B7814A", W.coklat), kotak("pt2", 182, 92, 6, 20, "#B7814A", W.coklat)),
      tambah("desimal", kotak("jn-k", 190, 60, 80, 70, "#FCE7F3", W.biru), teks("jn-t", 230, 100, "desimal", 12, W.biru, { z: 2 })),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Penyebut dan Angka Koma"), ...tokoh("lr", 262, 184, "Laras")),
      tambah("Penyebut", ...pecah("p1", 60, 62, "3", "10", 18), panah("r1", 92, 66, 52, 0, W.ungu, 1.8), teks("d1", 190, 76, "0,3", 24, W.biru)),
      tambah("satu", teks("n1", 248, 76, "1 angka", 11, W.merah)),
      tambah("seratus", ...pecah("p2", 60, 122, "27", "100", 18), panah("r2", 92, 126, 52, 0, W.ungu, 1.8), teks("d2", 190, 136, "0,27", 24, W.biru)),
      tambah("dua", teks("n2", 248, 136, "2 angka", 11, W.merah)),
    ),
    k(
      SUARA_J3,
      tambah("Pak", ...tokoh("pb", 40, 184, "Pak Bagas")),
      tambah("mengangguk,", emo("jp", 72, 160, E.jempol, 20)),
      sorotkan("karena", "p1-a", "p1-b", "d1"),
      tambah("sama.", teks("sm", 150, 104, "=", 22, W.merah), emo("ok", 262, 108, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_T1 = "Bu Tuti, panitia pameran, datang membawa papan besar dan bertanya tentang kain yang terjual.";
const SUARA_T2 = "Ia bilang angkanya akan ditulis dengan tanda persen.";
const SUARA_T3 = "Menurutmu, bagaimana menulis nol koma lima dengan persen? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Pak Bagas!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Bu Tuti dan papan pameran",
  sumber: "Materi: penutup dan jembatan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bu Tuti Datang"), ...rumput("rp", 150)),
      tambah("Tuti,", ...tokoh("bt", 266, 184, "Bu Tuti")),
      tambah("papan", kotak("pb-k", 40, 40, 150, 90, W.putih, W.coklat, { tebal: 3 }), teks("pb-t", 115, 60, "PAMERAN", 12, W.coklat, { z: 2 })),
      tambah("kain", kotak("pg-k", 60, 84, 60, 18, "#C7D2FE", W.biru, { z: 2 }), emo("ky", 170, 66, E.syal, 22, { z: 2 })),
    ),
    k(
      SUARA_T2,
      tambah("angkanya", teks("tp", 160, 108, "%", 34, W.merah, { z: 3 })),
      tambah("persen.", teks("ts", 115, 124, "tanda persen", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_T3,
      tambah("nol", teks("d5", 80, 100, "0,5", 24, W.biru, { z: 3 })),
      tambah("persen?", teks("q5", 130, 100, "?", 26, W.tanya, { z: 3 })),
      tambah("Satria,", ...tokoh("st", 20, 184, "Satria"), emo("w1", 26, 142, E.lambai, 16)),
      tambah("Laras,", ...tokoh("lr", 70, 184, "Laras"), emo("w2", 76, 142, E.lambai, 16)),
      tambah("Genta,", ...tokoh("gn", 120, 184, "Genta"), emo("w3", 126, 142, E.lambai, 16)),
      tambah("Hendro,", ...tokoh("ph", 172, 184, "Pak Hendro"), emo("w4", 178, 142, E.lambai, 16)),
      tambah("Bagas!", ...tokoh("pb", 228, 184, "Pak Bagas"), emo("w5", 234, 142, E.lambai, 16)),
    ),
  ],
};
