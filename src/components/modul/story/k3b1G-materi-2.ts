import type { AdeganStory } from "./logika-story";
import { W, garisBilangan, hbBawah, judul, loncatGm, ringkasKb, teks, titikGm, tumpukan, xGm } from "./k3b1G-gambar";
import { hapus, idx, k, langkah, tambah, ubah } from "./k3b1G-bantu";

/* ------------------------------ 5. Upe mengurangi apel berulang ------------------------------ */
const SUARA_A1 = "Cara lain untuk membagi adalah mengurangi berulang. Upe punya dua belas apel.";
const SUARA_A2 = "Upe mengurangi dua apel setiap kali, sampai apelnya habis.";
const SUARA_A3 = "Dua belas dikurangi dua sama dengan sepuluh. Sepuluh dikurangi dua sama dengan delapan.";
const SUARA_A4 = "Delapan dikurangi dua sama dengan enam. Enam dikurangi dua sama dengan empat.";
const SUARA_A5 = "Empat dikurangi dua sama dengan dua. Dua dikurangi dua sama dengan nol.";
const SUARA_A6 = "Apel sudah habis. Kita mengurangi dua sebanyak enam kali.";
const SUARA_A7 = "Jadi dua belas dibagi dua sama dengan enam. Pembagian adalah pengurangan berulang sampai habis.";

export const ADEGAN_KURANG_DUA_BELAS: AdeganStory = {
  id: "kurang-dua-belas",
  judul: "Upe mengurangi apel berulang",
  sumber: "Materi: mengurangi berulang",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Mengurangi berulang")), tambah(idx(SUARA_A1, "dua"), ...tumpukan("apel", 12))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "mengurangi"), teks("ket", 150, 94, "dikurangi 2 setiap kali", 10, W.ungu))),
    k(SUARA_A3, hapus(0, "ket"), ...langkah(idx(SUARA_A3, "sepuluh", 1), 1, 12, 2, "apel"), ...langkah(idx(SUARA_A3, "delapan."), 2, 12, 2, "apel")),
    k(SUARA_A4, ...langkah(idx(SUARA_A4, "enam", 1), 3, 12, 2, "apel"), ...langkah(idx(SUARA_A4, "empat."), 4, 12, 2, "apel")),
    k(SUARA_A5, ...langkah(idx(SUARA_A5, "dua", 2), 5, 12, 2, "apel"), ...langkah(idx(SUARA_A5, "nol."), 6, 12, 2, "apel")),
    k(SUARA_A6, tambah(idx(SUARA_A6, "enam"), ringkasKb(2, 6, 184))),
    k(SUARA_A7, tambah(0, hbBawah("12 : 2 = 6"))),
  ],
};

/* ------------------------------ 6. Garis bilangan mundur ------------------------------ */
const SUARA_G1 = "Mengurangi berulang juga bisa dilakukan pada garis bilangan. Kita mulai dari lima belas.";
const SUARA_G2 = "Dari lima belas, loncat mundur tiga langkah. Kita sampai di dua belas.";
const SUARA_G3 = "Dari dua belas, loncat mundur tiga lagi, sampai di sembilan. Lalu mundur tiga lagi sampai di enam.";
const SUARA_G4 = "Dari enam, loncat mundur tiga sampai di tiga. Mundur tiga lagi, dan kita sampai di nol.";
const SUARA_G5 = "Ada lima loncatan, dan kita berhenti di nol. Jadi lima belas dibagi tiga sama dengan lima.";

const pindahTitik = (v: number) => ({ id: "gm-p", x: xGm(v) });

export const ADEGAN_GARIS_MUNDUR: AdeganStory = {
  id: "garis-mundur",
  judul: "Garis bilangan mundur",
  sumber: "Materi: garis bilangan mundur",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Garis bilangan mundur"), ...garisBilangan(15)), tambah(idx(SUARA_G1, "lima"), titikGm(15))),
    k(SUARA_G2, tambah(idx(SUARA_G2, "loncat"), ...loncatGm(1, 15, 3)), ubah(idx(SUARA_G2, "dua"), pindahTitik(12))),
    k(
      SUARA_G3,
      tambah(idx(SUARA_G3, "loncat"), ...loncatGm(2, 12, 3)),
      ubah(idx(SUARA_G3, "sembilan."), pindahTitik(9)),
      tambah(idx(SUARA_G3, "Lalu"), ...loncatGm(3, 9, 3)),
      ubah(idx(SUARA_G3, "enam."), pindahTitik(6)),
    ),
    k(
      SUARA_G4,
      tambah(idx(SUARA_G4, "loncat"), ...loncatGm(4, 6, 3)),
      ubah(idx(SUARA_G4, "tiga", 2), pindahTitik(3)),
      tambah(idx(SUARA_G4, "Mundur"), ...loncatGm(5, 3, 3)),
      ubah(idx(SUARA_G4, "nol."), pindahTitik(0)),
    ),
    k(SUARA_G5, tambah(idx(SUARA_G5, "loncatan,"), teks("gm-n", 150, 178, "5 loncatan", 11, W.ungu)), tambah(idx(SUARA_G5, "Jadi"), hbBawah("15 : 3 = 5"))),
  ],
};

/* ------------------------------ 7. Halim mengurangi bunga berulang ------------------------------ */
const SUARA_B1 = "Sekarang Halim punya lima belas bunga. Ia ingin mengurangi tiga bunga setiap kali.";
const SUARA_B2 = "Lima belas dikurangi tiga sama dengan dua belas. Dua belas dikurangi tiga sama dengan sembilan.";
const SUARA_B3 = "Sembilan dikurangi tiga sama dengan enam. Enam dikurangi tiga sama dengan tiga.";
const SUARA_B4 = "Tiga dikurangi tiga sama dengan nol. Bunganya sudah habis.";
const SUARA_B5 = "Pengurangan tiga dilakukan sebanyak lima kali. Jadi hasil baginya adalah lima.";
const SUARA_B6 = "Lima belas dibagi tiga sama dengan lima. Periksa dengan kali, lima kali tiga sama dengan lima belas.";

export const ADEGAN_KURANG_LIMA_BELAS: AdeganStory = {
  id: "kurang-lima-belas",
  judul: "Halim mengurangi bunga berulang",
  sumber: "Materi: mengurangi berulang",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Bunga Halim")), tambah(idx(SUARA_B1, "lima"), ...tumpukan("bunga", 15))),
    k(SUARA_B2, ...langkah(idx(SUARA_B2, "dua", 1), 1, 15, 3, "bunga"), ...langkah(idx(SUARA_B2, "sembilan."), 2, 15, 3, "bunga")),
    k(SUARA_B3, ...langkah(idx(SUARA_B3, "enam.", 1), 3, 15, 3, "bunga"), ...langkah(idx(SUARA_B3, "tiga.", 3), 4, 15, 3, "bunga")),
    k(SUARA_B4, ...langkah(idx(SUARA_B4, "nol."), 5, 15, 3, "bunga")),
    k(SUARA_B5, tambah(idx(SUARA_B5, "sebanyak"), ringkasKb(3, 5, 171))),
    k(SUARA_B6, tambah(0, hbBawah("15 : 3 = 5")), tambah(idx(SUARA_B6, "Periksa"), teks("pr", 150, 185, "5 × 3 = 15", 11, W.ungu))),
  ],
};
