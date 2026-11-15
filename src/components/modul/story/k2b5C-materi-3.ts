import type { AdeganStory } from "./logika-story";
import { OWL, W, WARNA_BAGIAN, bagian, bagianKotak, bagianLingkaran, bulat, emo, idBagian, judul, kartu, labelBagian, teks, titikJuring } from "./k2b5C-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah } from "./k2b5C-bantu";

/* ------------------------------ 10. Empat seperempat jadi utuh ------------------------------ */
const GESER_PIZZA: [number, number][] = [[14, -14], [14, 14], [-14, 14], [-14, -14]];
const WARNA_PIZZA = ["#FDBA74", "#FCA5A5", "#FDE68A", "#FDBA74"];
const Z_TERPISAH = bagianLingkaran("z", 150, 98, 44, [90, 90, 90, 90], -90, WARNA_PIZZA, GESER_PIZZA);
const Z_UTUH = bagianLingkaran("z", 150, 98, 44, [90, 90, 90, 90], -90, WARNA_PIZZA);

const SUARA_Z1 = "Ini pizza yang sudah dipotong menjadi empat bagian yang sama besar.";
const SUARA_Z2 = "Satu bagian adalah seperempat. Ada empat seperempat di atas piring.";
const SUARA_Z3 = "Sekarang kita satukan semua bagiannya di piring.";
const SUARA_Z4 = "Empat seperempat disatukan menjadi satu pizza utuh.";
const SUARA_Z5 = "Jadi satu pizza utuh sama besar dengan empat seperempat. Kita bisa menyatukannya kembali.";

export const ADEGAN_EMPAT_SEPEREMPAT: AdeganStory = {
  id: "empat-seperempat",
  judul: "Empat seperempat jadi utuh",
  sumber: "Materi: empat seperempat jadi utuh",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Pizza di atas piring")),
      tambah(idx(SUARA_Z1, "Ini"), bulat("pir", 150, 98, 68, W.putih, W.abu, { z: -2 })),
      tambah(idx(SUARA_Z1, "pizza"), ...Z_TERPISAH),
    ),
    k(
      SUARA_Z2,
      sorotkan(idx(SUARA_Z2, "Satu"), "pc-z-1"),
      tambah(idx(SUARA_Z2, "Ada"), ...labelBagian(Z_TERPISAH, "1/4", 11)),
    ),
    k(
      SUARA_Z3,
      redamkan(0, "pc-z-1"),
      hapus(idx(SUARA_Z3, "satukan"), ...idBagian("z", 4, true)),
      tambah(idx(SUARA_Z3, "satukan"), ...Z_UTUH),
    ),
    k(SUARA_Z4, sorotkan(idx(SUARA_Z4, "Empat"), ...idBagian("z", 4))),
    k(SUARA_Z5, tambah(idx(SUARA_Z5, "Jadi"), ...kartu("eq", 30, 172, 240, 22, W.krem, ["utuh sama dengan empat seperempat"], 9))),
  ],
};

/* ------------------------------ 11. Utuh, setengah, seperempat ------------------------------ */
const T_X = 70;
const T_W = 190;
const T_H = 30;
const TG_U = bagianKotak("u", T_X, 34, T_W, T_H, "utuh");
const TG_S = bagianKotak("s", T_X, 78, T_W, T_H, "tegak2");
const TG_P = bagianKotak("p", T_X, 122, T_W, T_H, "jalur4");
const namaBaris = (id: string, y: number, isi: string) => teks(id, 36, y + T_H / 2 + 3, isi, 8.4, W.biru);

const SUARA_G1 = "Ini satu roti panjang yang utuh. Kita akan memotongnya dengan dua cara.";
const SUARA_G2 = "Roti panjang yang sama dipotong menjadi dua bagian yang sama besar. Tiap bagian adalah setengah.";
const SUARA_G3 = "Roti panjang yang sama dipotong menjadi empat bagian yang sama besar. Tiap bagian adalah seperempat.";
const SUARA_G4 = "Lihat, satu bagian seperempat lebih kecil daripada satu bagian setengah.";
const SUARA_G5 = "Dua seperempat sama besar dengan setengah roti.";

export const ADEGAN_TANGGA: AdeganStory = {
  id: "tangga",
  judul: "Utuh, setengah, seperempat",
  sumber: "Materi: utuh, setengah, seperempat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Roti panjang")), tambah(idx(SUARA_G1, "roti"), ...TG_U, namaBaris("nm0", 34, "utuh")), tambah(idx(SUARA_G1, "utuh."), ...labelBagian(TG_U, "utuh", 9))),
    k(
      SUARA_G2,
      tambah(idx(SUARA_G2, "dua"), ...TG_S, namaBaris("nm1", 78, "setengah")),
      tambah(idx(SUARA_G2, "Tiap"), ...labelBagian(TG_S, "1/2", 10)),
    ),
    k(
      SUARA_G3,
      tambah(idx(SUARA_G3, "empat"), ...TG_P, namaBaris("nm2", 122, "seperempat")),
      tambah(idx(SUARA_G3, "Tiap"), ...labelBagian(TG_P, "1/4", 10)),
    ),
    k(
      SUARA_G4,
      sorotkan(idx(SUARA_G4, "seperempat"), "pc-p-1"),
      sorotkan(idx(SUARA_G4, "setengah."), "pc-s-1"),
      tambah(idx(SUARA_G4, "lebih"), emo("kc", 150, 190, "\u{1F50E}", 18)),
    ),
    k(
      SUARA_G5,
      hapus(0, "kc"),
      redamkan(0, "pc-s-1"),
      sorotkan(idx(SUARA_G5, "Dua"), "pc-p-1", "pc-p-2"),
      sorotkan(idx(SUARA_G5, "setengah"), "pc-s-1"),
    ),
  ],
};

/* ------------------------------ 12. Seperempat pada banyak benda ------------------------------ */
const BN_AP = bagianLingkaran("ap", 54, 84, 40, [90, 90, 90, 90], -90, ["#FCA5A5", "#FECACA", "#FCA5A5", "#FECACA"]);
const BN_PU = bagianKotak("pu", 108, 48, 84, 72, "empat", ["#FDE68A", "#FEF9C3", "#FDE68A", "#FEF9C3"]);
const BN_BO = bagianKotak("bo", 206, 44, 80, 80, "empat", ["#FED7AA", "#FFEDD5", "#FED7AA", "#FFEDD5"]);

const SUARA_N1 = "Seperempat ada pada banyak benda. Ini apel yang dibagi empat bagian sama besar.";
const SUARA_N2 = "Ini puding. Puding juga dibagi menjadi empat bagian yang sama besar.";
const SUARA_N3 = "Ini kue bolu. Satu bagian kue bolu juga seperempat.";
const SUARA_N4 = "Bentuk bendanya berbeda, tetapi seperempat selalu satu dari empat bagian sama besar.";
const SUARA_N5 = "Sekarang kamu bisa menemukan seperempat pada benda lain.";

export const ADEGAN_SEPEREMPAT_BENDA: AdeganStory = {
  id: "seperempat-benda",
  judul: "Seperempat pada banyak benda",
  sumber: "Materi: seperempat pada banyak benda",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Seperempat di mana-mana")), tambah(idx(SUARA_N1, "apel"), ...BN_AP, teks("nm0", 54, 140, "apel", 9)), tambah(idx(SUARA_N1, "empat"), ...labelBagian(BN_AP, "1/4", 9))),
    k(SUARA_N2, tambah(idx(SUARA_N2, "puding."), ...BN_PU, teks("nm1", 150, 140, "puding", 9)), tambah(idx(SUARA_N2, "empat"), ...labelBagian(BN_PU, "1/4", 9))),
    k(
      SUARA_N3,
      tambah(idx(SUARA_N3, "bolu."), ...BN_BO, teks("nm2", 246, 140, "kue bolu", 9)),
      tambah(idx(SUARA_N3, "Satu"), ...labelBagian(BN_BO, "1/4", 9)),
      sorotkan(idx(SUARA_N3, "seperempat."), "pc-bo-1"),
    ),
    k(SUARA_N4, sorotkan(idx(SUARA_N4, "seperempat"), "pc-ap-1", "pc-pu-1")),
    k(SUARA_N5, tambah(idx(SUARA_N5, "menemukan"), emo("ok", 150, 182, "✅", 24))),
  ],
};

/* ------------------------------ 13. Menyusun ikan dari potongan ------------------------------ */
const R = 44;
const SEPARUH_TRAY = bagian("ik", 1, 50, 150, titikJuring(R, 0, 180), "#BFDBFE");
const SEPEREMPAT_TRAY = [110, 166, 222].map((cx, i) => bagian("ik", i + 2, cx, 150, titikJuring(R, 0, 90), WARNA_BAGIAN[(i + 1) % 4]));
const BADAN = bagian("ik", 1, 160, 100, titikJuring(R, 90, 270), "#BFDBFE");
const EKOR = bagian("ik", 2, 160, 100, titikJuring(R, -45, 45), "#FBCFE8");
const SIRIP_ATAS = bagian("ik", 3, 136, 70, titikJuring(R, -135, -45), "#BBF7D0");
const SIRIP_BAWAH = bagian("ik", 4, 136, 130, titikJuring(R, 45, 135), "#FDE68A");

const SUARA_K1 = "Sekarang kita menyusun ikan dari potongan lingkaran di layar.";
const SUARA_K2 = "Kita punya satu potongan setengah dan tiga potongan seperempat.";
const SUARA_K3 = "Potongan setengah, yang paling besar, dipakai untuk badan ikan.";
const SUARA_K4 = "Tiga potongan seperempat menjadi ekor dan dua sirip.";
const SUARA_K5 = "Ikan kita sudah jadi. Ikan ini dibuat dari satu potongan setengah dan tiga potongan seperempat.";

export const ADEGAN_KARYA: AdeganStory = {
  id: "karya",
  judul: "Menyusun ikan dari potongan",
  sumber: "Materi: menyusun karya dari potongan",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Menyusun ikan")), tambah(idx(SUARA_K1, "ikan"), emo("fs", 150, 100, "\u{1F420}", 50))),
    k(
      SUARA_K2,
      hapus(0, "fs"),
      tambah(idx(SUARA_K2, "setengah"), SEPARUH_TRAY, ...labelBagian([SEPARUH_TRAY], "1/2", 10)),
      tambah(idx(SUARA_K2, "tiga"), ...SEPEREMPAT_TRAY, ...labelBagian(SEPEREMPAT_TRAY, "1/4", 10)),
    ),
    k(
      SUARA_K3,
      hapus(idx(SUARA_K3, "Potongan"), ...idBagian("ik", 1, true)),
      tambah(idx(SUARA_K3, "badan"), BADAN, bulat("ey", 138, 94, 3.5, W.biru, W.biru)),
    ),
    k(
      SUARA_K4,
      hapus(0, "pc-ik-2", "lb-ik-2", "pc-ik-3", "lb-ik-3", "pc-ik-4", "lb-ik-4"),
      tambah(idx(SUARA_K4, "ekor"), EKOR),
      tambah(idx(SUARA_K4, "sirip."), SIRIP_ATAS, SIRIP_BAWAH),
    ),
    k(SUARA_K5, tambah(idx(SUARA_K5, "jadi."), emo("ok", 252, 40, "✅", 26), emo("gl", 36, 40, "\u{1F31F}", 24))),
  ],
};

/* ------------------------------ 10b. Sisa martabak: satu seperempat dan tiga seperempat ------------------------------ */
const SM = bagianLingkaran("sm", 150, 92, 48, [90, 90, 90, 90]);

const SUARA_X1 = "Kira makan martabak yang sudah dipotong menjadi empat bagian yang sama besar.";
const SUARA_X2 = "Kira makan satu bagian. Itu satu seperempat martabak.";
const SUARA_X3 = "Sisanya ada tiga seperempat martabak. Tiga bagian itu masih ada di piring.";
const SUARA_X4 = "Satu seperempat dan tiga seperempat jika digabung menjadi empat seperempat.";
const SUARA_X5 = "Empat seperempat sama dengan satu martabak utuh. Tidak ada yang tersisa.";
const SUARA_X6 = "Makin banyak seperempat yang kita ambil, makin besar bagian yang kita punya.";

export const ADEGAN_SISA_MARTABAK: AdeganStory = {
  id: "sisa-martabak",
  judul: "Sisa martabak",
  sumber: "Materi: satu, tiga, dan empat seperempat",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_X1, tambah(0, judul("Sisa martabak")), tambah(idx(SUARA_X1, "martabak"), ...SM)),
    k(SUARA_X2, sorotkan(idx(SUARA_X2, "satu"), "pc-sm-1"), tambah(idx(SUARA_X2, "Itu"), emo("kr", 236, 56, "\u{1F60B}", 22), teks("kn", 236, 76, "Kira", 9))),
    k(SUARA_X3, redamkan(0, "pc-sm-1"), sorotkan(idx(SUARA_X3, "tiga"), "pc-sm-2", "pc-sm-3", "pc-sm-4")),
    k(SUARA_X4, sorotkan(idx(SUARA_X4, "Satu"), "pc-sm-1")),
    k(SUARA_X5, tambah(idx(SUARA_X5, "utuh."), ...kartu("sx", 50, 154, 200, 22, W.krem, ["empat seperempat jadi utuh"], 9.6))),
    k(SUARA_X6, redamkan(0, ...idBagian("sm", 4)), tambah(idx(SUARA_X6, "kita"), emo("ow", 150, 190, OWL, 20))),
  ],
};
