import type { AdeganStory } from "./logika-story";
import { W, angkaPv, barisKata, bilPv, blokPv, judul, kartu, kataPv, kerangkaPv } from "./k3b1A-gambar";
import { bersih, idx, k, redamkan, sorotkan, tambah } from "./k3b1A-bantu";

/* ------------------------------ 5. Papan tiga tempat ------------------------------ */
const SUARA_A1 = "Bilangan tiga angka punya tiga tempat. Kita sediakan papan dengan tiga tempat.";
const SUARA_A2 = "Dari kiri ke kanan, tempat pertama untuk ratusan. Warnanya hijau.";
const SUARA_A3 = "Tempat kedua untuk puluhan, warnanya biru. Tempat ketiga untuk satuan, warnanya merah.";
const SUARA_A4 = "Angka di tiap tempat menunjukkan banyak balok. Ratusan untuk lempeng, puluhan untuk batang, satuan untuk kotak kecil.";
const SUARA_A5 = "Satu lempeng, satu batang, dan satu kotak kecil membentuk bilangan seratus sebelas.";

export const ADEGAN_PAPAN_TIGA: AdeganStory = {
  id: "papan-tiga",
  judul: "Papan tiga tempat",
  sumber: "Materi: papan tiga tempat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(idx(SUARA_A1, "papan"), ...kerangkaPv())),
    k(SUARA_A2, sorotkan(idx(SUARA_A2, "ratusan."), "pv-hk0")),
    k(SUARA_A3, redamkan(0, "pv-hk0"), sorotkan(idx(SUARA_A3, "puluhan,"), "pv-hk1"), redamkan(idx(SUARA_A3, "Tempat", 2), "pv-hk1"), sorotkan(idx(SUARA_A3, "satuan,"), "pv-hk2")),
    k(
      SUARA_A4,
      redamkan(0, "pv-hk2"),
      tambah(idx(SUARA_A4, "lempeng,"), ...blokPv(0, 1)),
      tambah(idx(SUARA_A4, "batang,"), ...blokPv(1, 1)),
      tambah(idx(SUARA_A4, "kotak"), ...blokPv(2, 1)),
    ),
    k(
      SUARA_A5,
      tambah(idx(SUARA_A5, "lempeng,"), angkaPv(0, 1)),
      tambah(idx(SUARA_A5, "batang,"), angkaPv(1, 1)),
      tambah(idx(SUARA_A5, "kotak"), angkaPv(2, 1)),
      tambah(idx(SUARA_A5, "bilangan"), bilPv(111)),
      tambah(idx(SUARA_A5, "seratus"), ...kataPv("seratus sebelas")),
    ),
  ],
};

/* ------------------------------ 6. Kata untuk ratusan ------------------------------ */
const SUARA_R1 = "Satu ratusan dibaca seratus. Jadi seratus ditulis angka satu dengan dua nol di belakangnya.";
const SUARA_R2 = "Dua ratusan dibaca dua ratus. Lambangnya angka dua dengan dua nol di belakangnya.";
const SUARA_R3 = "Lima ratusan dibaca lima ratus. Sembilan ratusan dibaca sembilan ratus.";
const SUARA_R4 = "Hanya satu ratusan yang punya nama istimewa, yaitu seratus. Yang lain, sebut angkanya lalu kata ratus.";

export const ADEGAN_KATA_RATUSAN: AdeganStory = {
  id: "kata-ratusan",
  judul: "Kata untuk ratusan",
  sumber: "Materi: kata bilangan ratusan",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Kata untuk ratusan")), tambah(idx(SUARA_R1, "Satu"), ...barisKata(0, "1 ratusan", 100, "seratus"))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Dua"), ...barisKata(1, "2 ratusan", 200, "dua ratus"))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Lima"), ...barisKata(2, "5 ratusan", 500, "lima ratus")), tambah(idx(SUARA_R3, "Sembilan"), ...barisKata(3, "9 ratusan", 900, "sembilan ratus"))),
    k(SUARA_R4, sorotkan(idx(SUARA_R4, "seratus."), "kr-b0"), tambah(idx(SUARA_R4, "Yang"), ...kartu("kz", 30, 156, 240, 28, W.emas, ["sebut angkanya, lalu kata ratus"], 10))),
  ],
};

/* ------------------------------ 7. Kata untuk puluhan ------------------------------ */
const SUARA_U1 = "Puluhan dibaca dengan kata puluh. Dua puluhan dibaca dua puluh, tiga puluhan dibaca tiga puluh.";
const SUARA_U2 = "Sembilan puluhan dibaca sembilan puluh. Mudah, bukan?";
const SUARA_U3 = "Sekarang bilangan istimewa. Sepuluh, sebelas, dan dua belas punya nama sendiri.";
const SUARA_U4 = "Tiga belas sampai sembilan belas memakai kata belas. Contohnya, sembilan belas.";

export const ADEGAN_KATA_PULUHAN: AdeganStory = {
  id: "kata-puluhan",
  judul: "Kata untuk puluhan",
  sumber: "Materi: kata bilangan puluhan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Kata untuk puluhan")),
      tambah(idx(SUARA_U1, "Dua"), ...barisKata(0, "2 puluhan", 20, "dua puluh")),
      tambah(idx(SUARA_U1, "tiga"), ...barisKata(1, "3 puluhan", 30, "tiga puluh")),
    ),
    k(SUARA_U2, tambah(idx(SUARA_U2, "Sembilan"), ...barisKata(2, "9 puluhan", 90, "sembilan puluh"))),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Bilangan istimewa")),
      tambah(idx(SUARA_U3, "Sepuluh,"), ...barisKata(0, "", 10, "sepuluh")),
      tambah(idx(SUARA_U3, "sebelas,"), ...barisKata(1, "", 11, "sebelas")),
      tambah(idx(SUARA_U3, "belas", 1), ...barisKata(2, "", 12, "dua belas")),
    ),
    k(SUARA_U4, tambah(idx(SUARA_U4, "Tiga"), ...barisKata(3, "", 13, "tiga belas")), tambah(idx(SUARA_U4, "Contohnya,"), ...barisKata(4, "", 19, "sembilan belas"))),
  ],
};

