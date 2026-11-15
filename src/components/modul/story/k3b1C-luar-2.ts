import type { AdeganStory } from "./logika-story";
import { OWL, W, arah, emo, gbGaris, gbTanda, gbTitik, judul, kartu, kartuBil, panah, teks } from "./k3b1C-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihBaris, pilihKata, pindah, redamkan, slotX, sorotkan, tambah } from "./k3b1C-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k3b1C-luar-1";

const cap = (id: string, y: number, isi: string) => teks(id, 150, y, isi, 12, W.merah);
const YG = 120;

/* ------------------------------ 4. Garis Bilangan Ratusan: konsep ------------------------------ */
const SUARA_G1 = "Metode kedua bernama Garis Bilangan Ratusan. Bilangan diletakkan pada garis menurut besarnya.";
const SUARA_G2 = "Garis ini dimulai dari enam ratus sampai delapan ratus. Ada tanda di enam ratus, tujuh ratus, dan delapan ratus.";
const SUARA_G3 = "Letakkan enam ratus tiga puluh sembilan. Titiknya dekat enam ratus, di sebelah kiri.";
const SUARA_G4 = "Letakkan tujuh ratus sembilan dan tujuh ratus dua puluh. Titiknya di sebelah kanan tujuh ratus.";
const SUARA_G5 = "Makin ke kanan, bilangan makin besar. Jadi tujuh ratus dua puluh paling besar, dan enam ratus tiga puluh sembilan paling kecil.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Garis Bilangan Ratusan: letak menentukan besar",
  sumber: "Metode luar: Garis Bilangan Ratusan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(1)), tambah(idx(SUARA_G1, "garis", 2), emo("rl", 150, 110, "\u{1F4CF}", 50))),
    k(
      SUARA_G2,
      hapus(0, "rl"),
      tambah(idx(SUARA_G2, "Garis"), gbGaris(YG)),
      tambah(idx(SUARA_G2, "enam", 2), ...gbTanda(600, 600, 800, YG)),
      tambah(idx(SUARA_G2, "tujuh"), ...gbTanda(700, 600, 800, YG)),
      tambah(idx(SUARA_G2, "delapan", 2), ...gbTanda(800, 600, 800, YG)),
    ),
    k(SUARA_G3, tambah(idx(SUARA_G3, "Letakkan"), ...gbTitik(639, 600, 800, YG, 0)), sorotkan(idx(SUARA_G3, "Titiknya"), "gb-m639")),
    k(SUARA_G4, redamkan(0, "gb-m639"), tambah(idx(SUARA_G4, "tujuh"), ...gbTitik(709, 600, 800, YG, 0)), tambah(idx(SUARA_G4, "tujuh", 2), ...gbTitik(720, 600, 800, YG, 1))),
    k(
      SUARA_G5,
      tambah(idx(SUARA_G5, "Makin"), panah("gb-pn", 60, 164, 180, 0, W.hijau), cap("gb-cp", 188, "makin ke kanan makin besar")),
      sorotkan(idx(SUARA_G5, "tujuh"), "gb-m720"),
      redamkan(idx(SUARA_G5, "enam"), "gb-m720"),
      sorotkan(idx(SUARA_G5, "enam"), "gb-m639"),
    ),
  ],
};

/* ------------------------------ 5. Garis Bilangan Ratusan: terapan ------------------------------ */
const SUARA_H1 = "Terapkan pada soal ini. Wei meletakkan tiga bilangan pada garis, yaitu tiga ratus empat puluh, empat ratus lima belas, dan tiga ratus delapan puluh.";
const SUARA_H2 = "Bilangan mana yang paling besar? Ketuk jawaban yang tepat.";
const SUARA_H3 = "Betul! Empat ratus lima belas paling besar, sebab titiknya paling kanan.";
const SUARA_H4 = "Tiga ratus empat puluh paling kecil, sebab titiknya paling kiri. Makin ke kanan makin besar.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis Bilangan Ratusan: garis Wei",
  sumber: "Metode luar: Garis Bilangan Ratusan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, ...kepala(1), gbGaris(YG), ...gbTanda(300, 300, 500, YG), ...gbTanda(400, 300, 500, YG), ...gbTanda(500, 300, 500, YG)),
      tambah(idx(SUARA_H1, "puluh", 1), ...gbTitik(340, 300, 500, YG, 0)),
      tambah(idx(SUARA_H1, "belas"), ...gbTitik(415, 300, 500, YG, 0)),
      tambah(idx(SUARA_H1, "puluh", 2), ...gbTitik(380, 300, 500, YG, 0)),
    ),
    k(SUARA_H2, tambah(idx(SUARA_H2, "Bilangan"), teks("tanya", 150, 158, "paling besar yang mana?", 12, W.ungu)), tambah(idx(SUARA_H2, "jawaban"), ...pilihKata(164, ["340", "380", "415"], 16))),
    k(SUARA_H3, sorotkan(idx(SUARA_H3, "Betul!"), "c3-k"), sorotkan(idx(SUARA_H3, "titiknya"), "gb-m415")),
    k(
      SUARA_H4,
      redamkan(0, "c3-k", "gb-m415"),
      hapus(0, "tanya", ...idPilihan(3)),
      sorotkan(idx(SUARA_H4, "titiknya"), "gb-m340"),
      tambah(idx(SUARA_H4, "Makin"), panah("gb-pn", 60, 168, 180, 0, W.hijau), cap("gb-cp", 190, "makin ke kanan makin besar")),
    ),
  ],
};

/* ------------------------------ 6. Mengurutkan: konsep ------------------------------ */
const SUARA_U1 = "Metode ketiga bernama Mengurutkan. Kita membandingkan bilangan berulang kali sampai semuanya berurutan.";
const SUARA_U2 = "Ada tiga kartu bilangan, yaitu lima ratus tujuh, lima ratus tujuh puluh, dan empat ratus tujuh puluh lima.";
const SUARA_U3 = "Pertama, cari yang paling kecil. Empat ratus tujuh puluh lima paling kecil karena ratusannya empat.";
const SUARA_U4 = "Kedua, bandingkan dua kartu yang tersisa. Lima ratus tujuh kurang dari lima ratus tujuh puluh, jadi lima ratus tujuh di tengah.";
const SUARA_U5 = "Urutan naiknya empat ratus tujuh puluh lima, lima ratus tujuh, lalu lima ratus tujuh puluh.";

export const ADEGAN_LUAR_URUT: AdeganStory = {
  id: "luar-urut",
  judul: "Mengurutkan: cari yang terkecil dulu",
  sumber: "Metode luar: Mengurutkan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_U1, tambah(0, ...kepala(2)), tambah(idx(SUARA_U1, "berulang"), emo("br", 150, 120, "\u{1F501}", 50))),
    k(
      SUARA_U2,
      hapus(0, "br"),
      tambah(idx(SUARA_U2, "lima"), ...kartuBil(0, slotX(0), 70, 507)),
      tambah(idx(SUARA_U2, "lima", 2), ...kartuBil(1, slotX(1), 70, 570)),
      tambah(idx(SUARA_U2, "empat"), ...kartuBil(2, slotX(2), 70, 475)),
    ),
    k(
      SUARA_U3,
      sorotkan(idx(SUARA_U3, "Empat"), "bk2-k"),
      pindah(idx(SUARA_U3, "karena"), 2, slotX(0)),
      pindah(idx(SUARA_U3, "karena"), 0, slotX(1)),
      pindah(idx(SUARA_U3, "karena"), 1, slotX(2)),
    ),
    k(SUARA_U4, redamkan(0, "bk2-k"), sorotkan(idx(SUARA_U4, "Lima"), "bk0-k", "bk1-k"), tambah(idx(SUARA_U4, "jadi"), cap("cp", 134, "507 < 570"))),
    k(SUARA_U5, redamkan(0, "bk0-k", "bk1-k"), hapus(0, "cp"), tambah(idx(SUARA_U5, "naiknya"), arah("urutan naik", 134), panah("or-pn", 50, 118, 200, 0, W.hijau))),
  ],
};

/* ------------------------------ 7. Mengurutkan: terapan ------------------------------ */
const SUARA_V1 = "Terapkan pada soal ini. Upe punya tiga kartu bilangan, yaitu sembilan ratus dua belas, sembilan ratus dua puluh satu, dan dua ratus sembilan puluh satu.";
const SUARA_V2 = "Urutan turun yang mana? Ketuk jawaban yang tepat.";
const SUARA_V3 = "Betul! Sembilan ratus dua puluh satu paling besar, lalu sembilan ratus dua belas, lalu dua ratus sembilan puluh satu.";
const SUARA_V4 = "Jadi urutan turunnya sembilan ratus dua puluh satu, sembilan ratus dua belas, lalu dua ratus sembilan puluh satu.";

export const ADEGAN_LUAR_URUT_TERAPAN: AdeganStory = {
  id: "luar-urut-terapan",
  judul: "Mengurutkan: kartu Upe",
  sumber: "Metode luar: Mengurutkan",
  latar: "#FAE8FF",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_V1, "sembilan"), ...kartuBil(0, slotX(0), 60, 912)),
      tambah(idx(SUARA_V1, "sembilan", 2), ...kartuBil(1, slotX(1), 60, 921)),
      tambah(idx(SUARA_V1, "dan"), ...kartuBil(2, slotX(2), 60, 291)),
    ),
    k(SUARA_V2, tambah(idx(SUARA_V2, "Urutan"), teks("tanya", 150, 112, "urutan turun yang mana?", 12, W.ungu)), tambah(idx(SUARA_V2, "jawaban"), ...pilihBaris(120, ["921, 912, 291", "291, 912, 921", "912, 921, 291"], 13))),
    k(SUARA_V3, sorotkan(idx(SUARA_V3, "Betul!"), "c1-k"), sorotkan(idx(SUARA_V3, "Sembilan"), "bk1-k")),
    k(
      SUARA_V4,
      redamkan(0, "c1-k", "bk1-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      pindah(idx(SUARA_V4, "sembilan"), 1, slotX(0)),
      pindah(idx(SUARA_V4, "sembilan", 2), 0, slotX(1)),
      tambah(idx(SUARA_V4, "lalu"), arah("urutan turun", 130), panah("or-pn", 250, 114, -200, 0, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan metode luar ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita membandingkan dan mengurutkan bilangan.";
const SUARA_Y2 = "Metode Banding per Tempat, bandingkan ratusan, lalu puluhan, lalu satuan.";
const SUARA_Y3 = "Metode Garis Bilangan Ratusan, letakkan bilangan pada garis, makin ke kanan makin besar.";
const SUARA_Y4 = "Metode Mengurutkan, cari yang terkecil dulu, lalu bandingkan sisanya.";
const SUARA_Y5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_Y1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Banding"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "tempat demi tempat"], 9.2))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Garis"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "letak pada garis"], 9.2))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Mengurutkan,"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "terkecil dulu, lalu sisanya"], 9.2))),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_Y5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
