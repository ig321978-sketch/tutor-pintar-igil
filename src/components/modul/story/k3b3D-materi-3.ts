import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, judul, kartu, keranjang, lantai, tanah, teks, tokoh } from "./k3b3D-gambar";
import { bersih, k, tambah, ubah } from "./k3b3D-bantu";

/*
 * Cerita orisinal IGIL "Bandul Dokter Hana" (Kelas 3 Bab 3 Sub-Bab D), video materi.
 * Naskah suara dari naskah/story-naskah-k3b3d.md. Bagian ini: menjumlahkan berat, mengurangkan berat, dan penutup akhir cerita bab (semua tamu berkumpul).
 */

/* ------------------------------ 7. Jumlah berat ------------------------------ */
const SUARA_J1 = "Dokter Hana mencampur dua kilogram tiga ratus gram jagung dengan satu kilogram empat ratus gram biji.";
const SUARA_J2 = "Kilogram dijumlah dengan kilogram: dua tambah satu sama dengan tiga. Gram dengan gram: tiga ratus tambah empat ratus sama dengan tujuh ratus.";
const SUARA_J3 = "Campuran itu beratnya tiga kilogram tujuh ratus gram.";

export const ADEGAN_JUMLAH_BERAT: AdeganStory = {
  id: "jumlah-berat",
  judul: "Menjumlahkan berat",
  sumber: "Materi: menjumlahkan berat",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Mencampur Pakan"), ...lantai("tn", 150)),
      tambah("Hana", ...tokoh("dh", 150, 184, "Dokter Hana")),
      tambah("dua", ...kartu("a", 30, 50, 104, 34, W.krem, ["2 kg 300 g"], 12)),
      tambah("jagung", emo("jg", 82, 118, E.jagung, 26)),
      tambah("dengan", teks("pl", 150, 74, "+", 20, W.biru)),
      tambah("satu", ...kartu("b", 166, 50, 104, 34, W.langit, ["1 kg 400 g"], 12)),
      tambah("biji.", emo("bj", 218, 118, E.biji, 26)),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Satuan yang Sama"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("Kilogram", teks("lk", 20, 70, "kilogram", 9, W.kg, { anchor: "start" })),
      tambah("dua", teks("r1", 90, 72, "2", 18, W.kg, { anchor: "start" })),
      ubah("tambah", { id: "r1", isi: "2 +" }),
      ubah("satu", { id: "r1", isi: "2 + 1" }),
      ubah("sama", { id: "r1", isi: "2 + 1 =" }),
      ubah("tiga", { id: "r1", isi: "2 + 1 = 3 kg" }),
      tambah(10, teks("lg", 20, 112, "gram", 9, W.gr, { anchor: "start" })),
      tambah("tiga@2", teks("r2", 90, 114, "300", 18, W.gr, { anchor: "start" })),
      ubah("tambah@2", { id: "r2", isi: "300 +" }),
      ubah("empat", { id: "r2", isi: "300 + 400" }),
      ubah("sama@2", { id: "r2", isi: "300 + 400 =" }),
      ubah("tujuh", { id: "r2", isi: "300 + 400 = 700 g" }),
    ),
    k(
      SUARA_J3,
      tambah("tiga", teks("r3", 150, 160, "3 kg", 22, W.hijauTua)),
      ubah("tujuh", { id: "r3", isi: "3 kg 700 g" }),
      tambah(7, emo("ok", 240, 160, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 8. Kurang berat ------------------------------ */
const SUARA_U1 = "Dari lima kilogram wortel, seekor kambing memakan dua kilogram dua ratus gram.";
const SUARA_U2 = "Ubah dulu ke gram: lima ribu gram dikurangi dua ribu dua ratus gram sama dengan dua ribu delapan ratus gram.";
const SUARA_U3 = "Sisa wortel dua ribu delapan ratus gram, yaitu dua kilogram delapan ratus gram.";

export const ADEGAN_KURANG_BERAT: AdeganStory = {
  id: "kurang-berat",
  judul: "Mengurangkan berat",
  sumber: "Materi: mengurangkan berat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Wortel untuk Kambing"), ...lantai("tn", 150), ...tokoh("dh", 150, 184, "Dokter Hana")),
      tambah("lima", ...keranjang("kj", 24, 96, 70, 36), teks("kl", 59, 72, "5 kg", 14, W.kg)),
      tambah("wortel,", emo("w1", 40, 94, E.wortel, 18), emo("w2", 60, 92, E.wortel, 18), emo("w3", 80, 94, E.wortel, 18)),
      tambah("kambing", emo("gm", 214, 132, E.kambing, 34)),
      tambah("dua", teks("tg", 230, 86, "2 kg 200 g", 12, W.merah)),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Ubah ke Gram Dulu"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("gram:", teks("ur", 150, 44, "1 kg = 1.000 g", 10, W.ungu)),
      tambah("lima", teks("r1", 30, 82, "5.000 g", 18, W.biru, { anchor: "start" })),
      ubah("dikurangi", { id: "r1", isi: "5.000 g −" }),
      ubah("dua", { id: "r1", isi: "5.000 g − 2.200 g" }),
      tambah("sama", teks("r2", 30, 126, "=", 24, W.hijauTua, { anchor: "start" })),
      ubah("delapan", { id: "r2", isi: "= 2.800 g" }),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Sisa Wortel"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("wortel", ...keranjang("kj", 24, 92, 70, 36), emo("w1", 40, 90, E.wortel, 18), emo("w2", 60, 88, E.wortel, 18), emo("w3", 80, 90, E.wortel, 18)),
      tambah("dua", teks("t1", 196, 72, "2.800 g", 20, W.hijauTua)),
      tambah("yaitu", teks("eq", 196, 98, "=", 18, W.biru)),
      tambah("dua@2", teks("t2", 196, 128, "2 kg 800 g", 20, W.biru)),
      tambah(12, emo("ok", 270, 128, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (akhir cerita bab) ------------------------------ */
const SUARA_P1 = "Raka menepati taruhannya dan memandikan semua kambing sampai dirinya basah kuyup.";
const SUARA_P2 = "Sore itu Kak Tari, Pak Wayan, Bu Lastri, dan Dokter Hana berkumpul, karena semua hewan sudah mendapat kandang dan pakan yang pas.";
const SUARA_P3 = "Menurutmu, apa lagi yang bisa kita ukur dan timbang di sekitar kita? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan semua tamu!";

const busa = (id: string, x: number, y: number, r: number) => bulat(id, x, y, r, "#F8FAFC", "#94A3B8", { tebal: 1, z: 3 });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup akhir cerita bab",
  sumber: "Materi: penutup kebun binatang mini",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Taruhan Raka Ditepati"), ...tanah("tn", 150)),
      tambah("Raka", ...tokoh("rk", 120, 184, "Raka")),
      tambah("memandikan", emo("sb", 154, 148, E.sabun, 18)),
      tambah("kambing", emo("g1", 52, 172, E.kambing, 30), emo("g2", 200, 172, E.kambing, 30), emo("g3", 250, 172, E.kambing, 30), busa("bs1", 46, 150, 5), busa("bs2", 58, 146, 4), busa("bs3", 194, 150, 5), busa("bs4", 208, 146, 4), busa("bs5", 244, 150, 5), busa("bs6", 256, 146, 4)),
      tambah("basah", emo("t1", 100, 138, E.tetes, 16), emo("t2", 142, 136, E.tetes, 16)),
      tambah("kuyup.", emo("lg", 120, 130, E.lega, 20)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Semua Hewan Kenyang"), ...tanah("tn", 150), emo("b1", 60, 56, E.balon, 24), emo("b2", 150, 48, E.balon, 24), emo("b3", 240, 56, E.balon, 24)),
      tambah("Tari,", ...tokoh("kt", 42, 184, "Kak Tari")),
      tambah("Wayan,", ...tokoh("pw", 114, 184, "Pak Wayan")),
      tambah("Lastri,", ...tokoh("bl", 186, 184, "Bu Lastri")),
      tambah("Hana", ...tokoh("dh", 258, 184, "Dokter Hana")),
      tambah("hewan", emo("h1", 50, 126, E.kelinci, 24), emo("h2", 100, 126, E.kura, 24), emo("h3", 150, 126, E.kambing, 24), emo("h4", 200, 126, E.beo, 24), emo("h5", 250, 126, E.rusa, 24)),
      tambah("pas.", emo("ok", 150, 96, E.benar, 24)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Terima Kasih!"), ...tanah("tn", 150), emo("b1", 36, 56, E.balon, 22), emo("b2", 264, 56, E.balon, 22)),
      tambah("apa", emo("tq", 150, 86, E.tanya, 30)),
      tambah("ukur", teks("tu", 96, 50, "ukur", 11, W.kg)),
      tambah("timbang", teks("tt", 204, 50, "timbang", 11, W.gr)),
      tambah("Terima", emo("s1", 84, 86, E.sorak, 22), emo("s2", 216, 86, E.sorak, 22)),
      tambah("Raka,", ...tokoh("rk", 42, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 114, 184, "Salsa")),
      tambah("Bima,", ...tokoh("bm", 186, 184, "Bima")),
      tambah("Pak", ...tokoh("pj", 258, 184, "Pak Joko")),
      tambah("semua", ...tokoh("kt", 42, 122, "Kak Tari", 24), ...tokoh("pw", 114, 122, "Pak Wayan", 24)),
      tambah("tamu!", ...tokoh("bl", 186, 122, "Bu Lastri", 24), ...tokoh("dh", 258, 122, "Dokter Hana", 24)),
    ),
  ],
};
