import type { AdeganStory } from "./logika-story";
import { E, W, dayung, dermaga, emo, garis, judul, kotak, laut, panah, perahu, pindah, teks, tokoh } from "./k4b1g-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b1g-bantu";

/*
 * Cerita orisinal IGIL "Baris Perahu Bu Marni" (Kelas 4 Bab 1 Sub-Bab G), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1g.md. Bagian ini: mengurai dua belas, penjumlahan berulang pada garis, dan Satria mendayung sendirian.
 */

/* ------------------------------ 4. Urai ------------------------------ */
const SUARA_U1 = "Laras menguraikan dua belas menjadi sepuluh dan dua.";
const SUARA_U2 = "Sepuluh kali lima sama dengan lima puluh, dan dua kali lima sama dengan sepuluh.";
const SUARA_U3 = "Kedua hasil itu dijumlahkan, lima puluh ditambah sepuluh sama dengan enam puluh.";

export const ADEGAN_URAI: AdeganStory = {
  id: "urai",
  judul: "Mengurai dua belas",
  sumber: "Materi: mengurai puluhan dan satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Mengurai Dua Belas"), ...laut("lt", 120), ...dermaga("dm", 166), ...tokoh("la", 30, 184, "Laras")),
      tambah("dua", teks("a12", 150, 44, "12", 24, W.biru)),
      tambah("sepuluh", panah("ar1", 140, 54, -28, 22, W.ungu, 2), teks("a10", 110, 90, "10", 18, W.biru)),
      tambah("dua.@2", panah("ar2", 160, 54, 28, 22, W.ungu, 2), teks("a2", 190, 90, "2", 18, W.biru)),
    ),
    k(
      SUARA_U2,
      tambah("Sepuluh", teks("b1", 110, 118, "10 × 5", 13, W.biru)),
      tambah("puluh@2", teks("c1", 110, 138, "= 50", 13, W.merah)),
      tambah("dua", teks("b2", 190, 118, "2 × 5", 13, W.biru)),
      tambah("sepuluh@2", teks("c2", 190, 138, "= 10", 13, W.merah)),
    ),
    k(
      SUARA_U3,
      tambah("Kedua", kotak("g1", 86, 106, 48, 38, undefined, W.hijau, { tebal: 2.4, rx: 4, z: 4 }), kotak("g2", 166, 106, 48, 38, undefined, W.hijau, { tebal: 2.4, rx: 4, z: 4 })),
      tambah("lima", teks("k5", 262, 60, "5 kali", 10, W.ungu)),
      tambah("ditambah", teks("sm", 150, 164, "50 + 10", 14, W.biru)),
      tambah("enam", teks("sm2", 150, 186, "= 60", 20, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Ulang (penjumlahan berulang pada garis) ------------------------------ */
const SUARA_G1 = "Genta menjumlahkan berulang untuk memastikan, dua belas, dua puluh empat, tiga puluh enam, empat puluh delapan, enam puluh.";
const SUARA_G2 = "Hasilnya sama, yaitu enam puluh penumpang.";
const SUARA_G3 = "Satria menepuk dahi, karena dua dalam dua belas ikut dikalikan lima.";
const XG = [30, 74, 118, 162, 206, 250];
const NOL = [garis("gl", 24, 100, 232, 0, W.biru, 2, { z: 1 }), teks("l0", XG[0], 124, "0", 10, W.biru, { z: 2 })];
const LONCAT = (i: number) => [panah(`j${i}`, XG[i - 1], 94, 44, 0, W.ungu, 2, { z: 2 }), emo(`jp${i}`, XG[i - 1] + 22, 80, E.layar, 14), teks(`l${i}`, XG[i], 124, String(12 * i), 10, i === 5 ? W.merah : W.biru, { z: 2 })];

export const ADEGAN_ULANG: AdeganStory = {
  id: "ulang",
  judul: "Loncat dua belas-dua belas",
  sumber: "Materi: penjumlahan berulang",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Loncat Dua Belas"), ...NOL, ...tokoh("ge", 30, 184, "Genta")),
      tambah("dua", ...LONCAT(1)),
      tambah("dua@2", ...LONCAT(2)),
      tambah("tiga", ...LONCAT(3)),
      tambah("empat@2", ...LONCAT(4)),
      tambah("enam@2", ...LONCAT(5)),
    ),
    k(
      SUARA_G2,
      tambah(0, emo("bt", 250, 150, E.bintang, 22)),
      sorotkan("enam", "l5"),
      tambah("enam", teks("h60", 150, 56, "60", 26, W.merah)),
      tambah("penumpang.", teks("pn", 150, 150, "60 penumpang", 11, W.hijauTua)),
    ),
    k(
      SUARA_G3,
      hapus(0, "pn", "bt", "h60"),
      tambah(0, ...tokoh("sa", 262, 184, "Satria"), emo("ks", 262, 142, E.kesal, 18)),
      tambah("dua", teks("d2", 100, 150, "2", 18, W.merah)),
      tambah("dua@2", teks("d12", 150, 150, "12", 18, W.biru)),
      tambah("dikalikan", panah("dk", 108, 156, 30, 0, W.merah, 2), teks("d5", 192, 150, "× 5", 18, W.biru)),
    ),
  ],
};

/* ------------------------------ 6. Dayung ------------------------------ */
const SUARA_D1 = "Satria menarik napas dan mulai mendayung perahu pertama sendirian.";
const SUARA_D2 = "Perahunya berputar-putar di tempat dan semua orang tertawa.";
const SUARA_D3 = "Pak Hendro meniup peluit dan menolong menarik perahu kembali ke dermaga.";
const DYA = dayung("dyA", 112, 134, 34);
const DYB = dayung("dyB", 178, 134, 34);

export const ADEGAN_DAYUNG: AdeganStory = {
  id: "dayung",
  judul: "Satria mendayung sendirian",
  sumber: "Materi: taruhan Satria",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Mendayung Sendiri"), ...laut("lt", 100), ...dermaga("dm", 166), ...perahu("pr", 150, 138, 1.5)),
      tambah("Satria", emo("sa", 150, 116, E.satria, 24)),
      tambah("napas", emo("np", 96, 84, "\u{1F4A8}", 20)),
      tambah("mendayung", ...DYA, ...DYB),
      tambah("sendirian.", teks("sd", 150, 64, "sendirian", 11, W.merah)),
    ),
    k(
      SUARA_D2,
      tambah("berputar-putar", emo("rt", 214, 92, "\u{1F504}", 26)),
      tambah("tempat", teks("tp", 60, 110, "di tempat", 10, W.ungu)),
      tambah("tertawa.", emo("t1", 70, 186, E.tawa, 22), emo("t2", 232, 186, E.tawa, 22)),
    ),
    k(
      SUARA_D3,
      hapus(0, "rt", "tp", "np", "sd", "t1", "t2", "dyA", "dyA-b", "dyB", "dyB-b"),
      tambah("Pak", ...tokoh("ph", 262, 184, "Pak Hendro")),
      tambah("peluit", emo("pl", 232, 150, "\u{1F3B5}", 18)),
      tambah("menarik", garis("tl", 248, 150, -62, -10, W.coklat, 2, { z: 4 })),
      ubah("dermaga.", ...pindah(perahu("pr", 196, 138, 1.5))),
    ),
  ],
};
