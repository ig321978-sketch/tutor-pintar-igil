import type { AdeganStory } from "./logika-story";
import { E, W, bilah, bulat, emo, garis, judul, kartu, layang, meja, padi, paku, panah, penggaris, pondok, rumput, spanduk, teks, tokoh, gulunganBenang } from "./k3b4A-gambar";
import { hapus, k, sorotkan, tambah } from "./k3b4A-bantu";

/*
 * Cerita orisinal IGIL "Rangka Layang-layang Bu Ratih" (Kelas 3 Bab 4 Sub-Bab A, ruas garis dan sisi bangun datar), awal cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4a.md. Bagian ini: lapangan festival, titik dan ruas garis, sinar garis dan garis.
 */

/* ------------------------------ 1. Lapangan ------------------------------ */
const SUARA_L1 = "Minggu pagi Pak Joko mengajak Raka, Salsa, dan Bima ke lapangan di tepi sawah, tempat festival layang-layang kampung.";
const SUARA_L2 = "Bu Ratih, pembuat layang-layang berpita merah, menyambut mereka sambil membawa gulungan benang.";
const SUARA_L3 = "Hari ini ia menyiapkan rangka layang-layang dan perlu bantuan mereka.";

export const ADEGAN_LAPANGAN: AdeganStory = {
  id: "lapangan",
  judul: "Lapangan festival layang-layang",
  sumber: "Materi: lapangan festival",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lapangan di Tepi Sawah"), ...rumput("rt", 150)),
      tambah("tepi", ...padi("pd", 124)),
      tambah("tempat", ...spanduk("sp", 100, 30)),
      tambah("Pak", ...tokoh("pj", 138, 184, "Pak Joko")),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 66, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 102, 184, "Bima")),
      tambah("layang-layang", ...layang("ly1", 28, 84, 11), ...layang("ly2", 178, 78, 11, "#60A5FA")),
      tambah("kampung", ...pondok("pn", 196, 96, 90, 50)),
    ),
    k(
      SUARA_L2,
      tambah("Ratih,", ...tokoh("br", 262, 184, "Bu Ratih")),
      sorotkan("pembuat", "ly1", "ly2"),
      tambah("menyambut", emo("lb", 228, 166, E.lambai, 16)),
      tambah("gulungan", ...gulunganBenang("gb", 238, 148)),
    ),
    k(
      SUARA_L3,
      tambah("rangka", ...kartu("rg", 48, 58, 100, 24, "#FDE68A", ["rangka layang-layang"], 8)),
      tambah("perlu", teks("tq", 98, 100, "perlu bantuan", 9, W.merah)),
      tambah("bantuan", emo("tg", 150, 112, E.tangan, 16)),
      sorotkan("mereka", "rk", "sl", "bm"),
    ),
  ],
};

/* ------------------------------ 2. Titik dan ruas garis ------------------------------ */
const SUARA_T1 = "Bu Ratih menancapkan paku kecil di rangka, dan paku itu menandai sebuah titik.";
const SUARA_T2 = "Bilah bambu yang menghubungkan dua paku adalah ruas garis, karena punya dua ujung.";
const SUARA_T3 = "Panjang ruas garis dapat diukur dengan penggaris.";

export const ADEGAN_TITIK_RUAS: AdeganStory = {
  id: "titik-ruas",
  judul: "Titik dan ruas garis",
  sumber: "Materi: titik dan ruas garis",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Titik dan Ruas Garis"), ...meja("mj", 128), ...tokoh("br", 40, 184, "Bu Ratih")),
      tambah("paku", paku("pA", 90, 100, 4)),
      tambah("titik", teks("lA", 90, 88, "A", 13, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("Bilah", ...bilah("bl", 90, 97, 120, 6)),
      tambah("dua", paku("pB", 210, 100, 4), teks("lB", 210, 88, "B", 13, W.merah), teks("np", 150, 76, "2 paku", 11, W.ungu)),
      sorotkan("ruas", "bl"),
      tambah("ujung", teks("uj", 150, 120, "2 ujung", 11, W.hijauTua), bulat("u1", 90, 100, 7, undefined, W.merah, { tebal: 2, z: 5 }), bulat("u2", 210, 100, 7, undefined, W.merah, { tebal: 2, z: 5 })),
    ),
    k(
      SUARA_T3,
      hapus(0, "np", "uj", "u1", "u2"),
      tambah("Panjang", teks("tl", 150, 76, "panjang = ?", 11, W.merah)),
      tambah("diukur", ...penggaris("pg", 90, 108, 10, 12)),
    ),
  ],
};

/* ------------------------------ 3. Sinar garis dan garis ------------------------------ */
const SUARA_S1 = "Bima menyalakan senter, dan sinar yang keluar berpangkal di satu titik lalu menuju satu arah.";
const SUARA_S2 = "Itulah sinar garis, yang hanya dapat diperpanjang ke satu sisi.";
const SUARA_S3 = "Benang jemuran yang direntang terus ke kedua arah, tanpa ujung, adalah garis.";

export const ADEGAN_SINAR_GARIS: AdeganStory = {
  id: "sinar-garis",
  judul: "Sinar garis dan garis",
  sumber: "Materi: sinar garis dan garis",
  latar: "#E0E7FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Sinar Garis")),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("senter,", emo("sr", 80, 160, E.senter, 18)),
      tambah("berpangkal", bulat("pk", 90, 150, 3.5, W.merah, W.merah, { z: 3 })),
      tambah("satu", teks("s1", 86, 132, "1 titik", 9, W.merah)),
      tambah("menuju", panah("sn", 90, 150, 130, -60, W.oranye, 3)),
      tambah("satu@2", teks("s2", 210, 70, "1 arah", 9, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("sinar", teks("sg", 150, 44, "sinar garis", 12, W.ungu)),
      tambah("diperpanjang", panah("sn2", 220, 90, 64, -29, W.oranye, 2.4, { putus: true })),
      tambah("satu", teks("s3", 232, 134, "1 sisi", 10, W.merah)),
      tambah(9, emo("xs", 66, 140, E.salah, 16)),
    ),
    k(
      SUARA_S3,
      hapus(0, "sn", "sn2", "pk", "s1", "s2", "s3", "xs", "sr", "sg"),
      tambah("direntang", garis("bj", 20, 100, 260, 0, "#92400E", 2.4)),
      tambah("kedua", panah("pj1", 150, 100, -130, 0, "#92400E", 2.4), panah("pj2", 150, 100, 130, 0, "#92400E", 2.4)),
      tambah("tanpa", teks("tu", 150, 76, "tanpa ujung", 11, W.hijauTua)),
      tambah("garis", teks("gr", 150, 128, "garis", 14, W.ungu)),
    ),
  ],
};
