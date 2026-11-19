import type { AdeganStory } from "./logika-story";
import { E, W, dermaga, emo, ember, idSel, isiSel, judul, laut, panah, papanSusun, pasir, teks, tokoh } from "./k4b1f-gambar";
import { bersih, k, sorotkan, tambah } from "./k4b1f-bantu";

/*
 * Cerita orisinal IGIL "Papan Sisa Pak Usman" (Kelas 4 Bab 1 Sub-Bab F, pengurangan bersusun sampai seribu), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1f.md. Bagian ini: dermaga sore, catatan tamu, salah langkah Satria (membalik tiap tempat).
 */

/* ------------------------------ 1. Dermaga sore ------------------------------ */
const SUARA_D1 = "Sore harinya perahu merapat di dermaga, dan sebagian tamu penginapan mulai pulang.";
const SUARA_D2 = "Pak Usman, petugas dermaga, mencatat tamu yang naik perahu.";
const SUARA_D3 = "Ia ingin tahu berapa tamu yang masih menginap, dan meminta bantuan ketiga anak.";

export const ADEGAN_DERMAGA_PULANG: AdeganStory = {
  id: "dermaga-pulang",
  judul: "Dermaga sore hari",
  sumber: "Materi: dermaga sore",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Dermaga Sore"), ...laut("lt", 30, 62), pasir("ps", 100), ...dermaga("dm", 110, 88, 180)),
      tambah("perahu", emo("pr", 60, 80, E.perahu, 34)),
      tambah("tamu", emo("kp1", 140, 86, E.koper, 14), emo("kp2", 165, 86, E.koper, 14), emo("kp3", 190, 86, E.koper, 14)),
      tambah("pulang.", emo("pg", 250, 72, E.lambai, 18)),
    ),
    k(
      SUARA_D2,
      tambah("Pak", ...tokoh("pu", 244, 184, "Pak Usman")),
      tambah("petugas", teks("pt", 244, 126, "petugas dermaga", 8, W.ungu)),
      tambah("mencatat", emo("ct", 270, 160, E.catat, 16)),
      sorotkan("naik", "kp1", "kp2"),
    ),
    k(
      SUARA_D3,
      tambah("berapa", emo("tq", 210, 152, E.tanya, 18)),
      tambah("meminta", ...tokoh("sa", 24, 184, "Satria")),
      tambah("bantuan", ...tokoh("la", 62, 184, "Laras")),
      tambah("ketiga", ...tokoh("ge", 100, 184, "Genta")),
      tambah("anak.", ...tokoh("ph", 148, 184, "Pak Hendro")),
    ),
  ],
};

/* ------------------------------ 2. Catatan tamu ------------------------------ */
const SUARA_C1 = "Tadi pagi ada enam ratus dua belas tamu yang menginap.";
const SUARA_C2 = "Tamu yang pulang sore ini ada dua ratus tujuh puluh lima orang.";
const SUARA_C3 = "Laras menulis kedua bilangan itu bersusun ke bawah dan mengurangkannya.";
const PX = 76;
const PY = 40;

export const ADEGAN_CATATAN: AdeganStory = {
  id: "catatan",
  judul: "Catatan tamu pagi dan sore",
  sumber: "Materi: catatan tamu",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Catatan Tamu"), ...papanSusun("ps", PX, PY, ["", "", ""], ["", "", ""]), ...tokoh("la", 40, 184, "Laras")),
      tambah("enam", isiSel("ps", PX, PY, 0, 0, "6")),
      tambah("dua", isiSel("ps", PX, PY, 0, 1, "1")),
      tambah("belas.", isiSel("ps", PX, PY, 0, 2, "2")),
      tambah("tamu", teks("m1", 254, 60, "menginap", 8, W.ungu), teks("n1", 254, 78, "612", 16, W.biru)),
    ),
    k(
      SUARA_C2,
      tambah("pulang", teks("m2", 254, 98, "pulang", 8, W.ungu)),
      tambah("dua", isiSel("ps", PX, PY, 1, 0, "2")),
      tambah("tujuh", isiSel("ps", PX, PY, 1, 1, "7")),
      tambah("lima", isiSel("ps", PX, PY, 1, 2, "5")),
      tambah("orang.", teks("n2", 254, 116, "275", 16, W.biru)),
    ),
    k(
      SUARA_C3,
      tambah("menulis", emo("ct", 72, 166, E.catat, 16)),
      sorotkan("bersusun", "ps-ka0", "ps-ka1", "ps-ka2", "ps-kb0", "ps-kb1", "ps-kb2"),
      tambah("bawah", panah("pa", 254, 126, 0, 22, W.merah, 2.4)),
      tambah("mengurangkannya.", teks("kk", 254, 166, "kurang", 9, W.merah), emo("tq", 150, 160, E.tanya, 16)),
    ),
  ],
};

/* ------------------------------ 3. Salah langkah: membalik tiap tempat ------------------------------ */
const SUARA_S1 = "Satria mengurangkan tiap tempat dengan menaruh angka besar di atas angka kecil.";
const SUARA_S2 = "Dua dan lima, ia balik menjadi lima kurang dua sama dengan tiga, dan seterusnya sampai hasilnya empat ratus enam puluh tiga.";
const SUARA_S3 = "Kalau aku salah, aku mencuci semua sandal tamu, katanya.";
const SANDAL = Array.from({ length: 10 }, (_, i) => emo(`sd${i}`, 206 + (i % 5) * 13, i < 5 ? 118 : 132, E.sandal, 12));

export const ADEGAN_SALAH_BALIK: AdeganStory = {
  id: "salah-balik",
  judul: "Salah langkah: membalik angka",
  sumber: "Materi: salah langkah membalik",
  latar: "#FEE2E2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara Satria"), ...papanSusun("ps", PX, PY, ["6", "1", "2"], ["2", "7", "5"]), ...tokoh("sa", 40, 184, "Satria")),
      tambah("besar", teks("bs", 254, 66, "besar", 9, W.merah)),
      tambah("atas", panah("pu", 254, 76, 0, 14, W.merah, 2)),
      tambah("kecil.", teks("kc", 254, 100, "kecil", 9, W.hijau)),
    ),
    k(
      SUARA_S2,
      sorotkan("Dua", idSel("ps", "a", 2), idSel("ps", "b", 2)),
      tambah("balik", panah("f1", 180, 64, 0, 22, W.merah, 2.2), panah("f2", 196, 86, 0, -22, W.merah, 2.2)),
      tambah("tiga,", teks("eq", 150, 156, "5 − 2 = 3", 13, W.hijau)),
      tambah("empat", isiSel("ps", PX, PY, 2, 0, "4", 13, W.merah)),
      tambah("enam", isiSel("ps", PX, PY, 2, 1, "6", 13, W.merah)),
      tambah("tiga.", isiSel("ps", PX, PY, 2, 2, "3", 13, W.merah), teks("n463", 254, 126, "463", 16, W.merah)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Taruhan Satria"), ...tokoh("sa", 60, 184, "Satria")),
      tambah("aku@2", emo("cb", 92, 166, E.pikir, 16), teks("tr", 150, 62, "taruhan!", 12, W.merah)),
      tambah("mencuci", ...ember("eb", 220, 150)),
      tambah("sandal", ...SANDAL),
    ),
  ],
};
