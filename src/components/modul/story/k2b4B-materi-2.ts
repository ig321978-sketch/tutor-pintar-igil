import type { AdeganStory } from "./logika-story";
import { W, judul, kartu, kurungSatuan, tanda, tata } from "./k2b4B-gambar";
import { hapus, idx, k, munculItem, tambah } from "./k2b4B-bantu";

const T6 = tata(6, 20, 12);
const CY1 = 56;
const CY2 = 134;

/* ------------------------------ 4. Pola bentuk ------------------------------ */
export const BENTUK_SATU = ["bunga", "persegi", "bunga", "persegi", "bunga", "persegi"];
export const BENTUK_DUA = ["hati", "hati", "segitiga", "segitiga", "hati", "hati", "segitiga", "segitiga"];
const T8 = tata(8, 20, 6);
const SUARA_B1 = "Pola bisa dibuat dari bentuk. Kita menyebutnya pola bentuk.";
const SUARA_B2 = "Baris pertama: bunga, persegi, bunga, persegi, bunga, persegi.";
const SUARA_B3 = "Satuannya bunga dan persegi. Satuannya terdiri dari dua benda.";
const SUARA_B4 = "Baris kedua: hati, hati, segitiga, segitiga, hati, hati, segitiga, segitiga.";
const SUARA_B5 = "Satuannya hati, hati, segitiga, dan segitiga. Satuannya terdiri dari empat benda.";

export const ADEGAN_POLA_BENTUK: AdeganStory = {
  id: "pola-bentuk",
  judul: "Pola bentuk",
  sumber: "Materi: pola bentuk",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Pola bentuk")), tambah(idx(SUARA_B1, "menyebutnya"), ...kartu("pk", 50, 80, 200, 44, W.pink, ["bentuk yang", "berulang teratur"], 10.4))),
    k(SUARA_B2, hapus(0, "pk-k", "pk-t0", "pk-t1"), ...munculItem(SUARA_B2, "ba", BENTUK_SATU, T6, CY1)),
    k(SUARA_B3, tambah(idx(SUARA_B3, "Satuannya"), kurungSatuan("ba", 0, 2, T6, CY1))),
    k(SUARA_B4, ...munculItem(SUARA_B4, "bb", BENTUK_DUA, T8, CY2)),
    k(SUARA_B5, tambah(idx(SUARA_B5, "Satuannya"), kurungSatuan("bb", 0, 4, T8, CY2))),
  ],
};

/* ------------------------------ 5. Pola warna ------------------------------ */
export const WARNA_SATU = ["kuning", "hijau", "kuning", "hijau", "kuning", "hijau"];
export const WARNA_DUA = ["merah", "kuning", "biru", "merah", "kuning", "biru"];
const SUARA_W1 = "Pola juga bisa dibuat dari warna. Kita menyebutnya pola warna.";
const SUARA_W2 = "Baris pertama: kuning, hijau, kuning, hijau, kuning, hijau.";
const SUARA_W3 = "Baris kedua: merah, kuning, biru, merah, kuning, biru.";
const SUARA_W4 = "Satuan baris pertama terdiri dari dua benda. Satuan baris kedua terdiri dari tiga benda.";
const SUARA_W5 = "Warnanya berganti dengan teratur, jadi kedua baris ini adalah pola.";

export const ADEGAN_POLA_WARNA: AdeganStory = {
  id: "pola-warna",
  judul: "Pola warna",
  sumber: "Materi: pola warna",
  latar: "#ECFDF5",
  ketukan: [
    k(SUARA_W1, tambah(0, judul("Pola warna")), tambah(idx(SUARA_W1, "menyebutnya"), ...kartu("pk", 50, 80, 200, 44, W.hijauMuda, ["warna yang", "berulang teratur"], 10.4))),
    k(SUARA_W2, hapus(0, "pk-k", "pk-t0", "pk-t1"), ...munculItem(SUARA_W2, "ba", WARNA_SATU, T6, CY1)),
    k(SUARA_W3, ...munculItem(SUARA_W3, "bb", WARNA_DUA, T6, CY2)),
    k(SUARA_W4, tambah(idx(SUARA_W4, "pertama"), kurungSatuan("ba", 0, 2, T6, CY1)), tambah(idx(SUARA_W4, "kedua"), kurungSatuan("bb", 0, 3, T6, CY2))),
    k(SUARA_W5, tambah(idx(SUARA_W5, "kedua"), tanda("ba", true, CY1), tanda("bb", true, CY2))),
  ],
};

/* ------------------------------ 6. Pola gerakan ------------------------------ */
export const GERAK_SATU = ["membungkuk", "berdiri", "membungkuk", "berdiri", "membungkuk", "berdiri"];
export const GERAK_DUA = ["berdiri", "berdiri", "naik", "berdiri", "berdiri", "naik"];
const T6G = tata(6, 22, 12);
const SUARA_G1 = "Gerakan juga bisa berpola. Perhatikan anak-anak yang bergerak.";
const SUARA_G2 = "Anak-anak membungkuk, berdiri, membungkuk, berdiri, membungkuk, berdiri.";
const SUARA_G3 = "Satuannya membungkuk dan berdiri. Itu pola gerakan.";
const SUARA_G4 = "Gerakan yang lain: berdiri, berdiri, tangan naik, berdiri, berdiri, tangan naik.";
const SUARA_G5 = "Satuannya berdiri, berdiri, dan tangan naik. Satuannya terdiri dari tiga gerakan.";

export const ADEGAN_POLA_GERAKAN: AdeganStory = {
  id: "pola-gerakan",
  judul: "Pola gerakan",
  sumber: "Materi: pola gerakan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Pola gerakan")), tambah(idx(SUARA_G1, "Perhatikan"), ...kartu("pk", 50, 80, 200, 44, W.langit, ["gerakan yang", "berulang teratur"], 10.4))),
    k(SUARA_G2, hapus(0, "pk-k", "pk-t0", "pk-t1"), ...munculItem(SUARA_G2, "ba", GERAK_SATU, T6G, CY1)),
    k(SUARA_G3, tambah(idx(SUARA_G3, "Satuannya"), kurungSatuan("ba", 0, 2, T6G, CY1))),
    k(SUARA_G4, ...munculItem(SUARA_G4, "bb", GERAK_DUA, T6G, CY2)),
    k(SUARA_G5, tambah(idx(SUARA_G5, "Satuannya"), kurungSatuan("bb", 0, 3, T6G, CY2))),
  ],
};

/* ------------------------------ 7. Pola suara ------------------------------ */
export const SUARA_SATU = ["keras", "pelan", "keras", "pelan", "keras", "pelan"];
export const SUARA_DUA = ["keras", "pelan", "diam", "keras", "pelan", "diam"];
const T3 = tata(3, 24, 34);
const SUARA_U1 = "Suara juga bisa berpola. Ada tepukan keras, pelan, dan diam.";
const SUARA_U2 = "Perhatikan bunyinya: keras, pelan, keras, pelan, keras, pelan.";
const SUARA_U3 = "Satuannya keras dan pelan. Itu pola suara.";
const SUARA_U4 = "Ada pola suara yang lain: keras, pelan, diam, keras, pelan, diam.";
const SUARA_U5 = "Satuannya keras, pelan, dan diam. Satuannya terdiri dari tiga bunyi.";

export const ADEGAN_POLA_SUARA: AdeganStory = {
  id: "pola-suara",
  judul: "Pola suara",
  sumber: "Materi: pola suara",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Pola suara")), ...munculItem(SUARA_U1, "lg", ["keras", "pelan", "diam"], T3, 90)),
    k(SUARA_U2, hapus(0, "lg_0_keras", "lg_1_pelan", "lg_2_diam"), ...munculItem(SUARA_U2, "ba", SUARA_SATU, T6, CY1)),
    k(SUARA_U3, tambah(idx(SUARA_U3, "Satuannya"), kurungSatuan("ba", 0, 2, T6, CY1))),
    k(SUARA_U4, ...munculItem(SUARA_U4, "bb", SUARA_DUA, T6, CY2)),
    k(SUARA_U5, tambah(idx(SUARA_U5, "Satuannya"), kurungSatuan("bb", 0, 3, T6, CY2))),
  ],
};
