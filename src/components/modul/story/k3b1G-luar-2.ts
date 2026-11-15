import type { AdeganStory } from "./logika-story";
import { W, emo, hbBawah, idPilihan, kartu, pilihKata, ringkasKb, teks, tumpukan } from "./k3b1G-gambar";
import { hapus, idx, k, langkah, redamkan, sorotkan, tambah } from "./k3b1G-bantu";
import { kepala } from "./k3b1G-luar-1";

/* ------------------------------ 4. Kurang Berulang: konsep ------------------------------ */
const KB21 = { y0: 100, dy: 11.5, u: 9 };
const SUARA_K1 = "Metode kedua bernama Kurang Berulang. Kita punya dua puluh satu jeruk, dan mengurangi tiga setiap kali.";
const SUARA_K2 = "Dua puluh satu dikurangi tiga sama dengan delapan belas. Delapan belas dikurangi tiga sama dengan lima belas.";
const SUARA_K3 = "Lima belas dikurangi tiga sama dengan dua belas. Dua belas dikurangi tiga sama dengan sembilan.";
const SUARA_K4 = "Sembilan dikurangi tiga sama dengan enam. Enam dikurangi tiga sama dengan tiga. Tiga dikurangi tiga sama dengan nol.";
const SUARA_K5 = "Tiga dikurangkan sebanyak tujuh kali sampai habis. Jadi dua puluh satu dibagi tiga sama dengan tujuh.";
const TRAY21 = { y0: 60, dy: 20, perBaris: 11, dx: 26 };

export const ADEGAN_LUAR_KURANG: AdeganStory = {
  id: "luar-kurang",
  judul: "Kurang Berulang: kurangi sampai nol",
  sumber: "Metode luar: Kurang Berulang",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_K1, tambah(0, ...kepala(1)), tambah(idx(SUARA_K1, "dua"), ...tumpukan("jeruk", 21, 1, 21, TRAY21))),
    k(SUARA_K2, ...langkah(idx(SUARA_K2, "delapan", 1), 1, 21, 3, "jeruk", KB21), ...langkah(idx(SUARA_K2, "lima", 1), 2, 21, 3, "jeruk", KB21)),
    k(SUARA_K3, ...langkah(idx(SUARA_K3, "dua", 1), 3, 21, 3, "jeruk", KB21), ...langkah(idx(SUARA_K3, "sembilan."), 4, 21, 3, "jeruk", KB21)),
    k(
      SUARA_K4,
      ...langkah(idx(SUARA_K4, "enam.", 1), 5, 21, 3, "jeruk", KB21),
      ...langkah(idx(SUARA_K4, "tiga.", 3), 6, 21, 3, "jeruk", KB21),
      ...langkah(idx(SUARA_K4, "nol."), 7, 21, 3, "jeruk", KB21),
    ),
    k(SUARA_K5, tambah(idx(SUARA_K5, "sebanyak"), ringkasKb(3, 7, 182)), tambah(idx(SUARA_K5, "Jadi"), hbBawah("21 : 3 = 7"))),
  ],
};

/* ------------------------------ 5. Kurang Berulang: terapan ------------------------------ */
const KB16 = { y0: 100, dy: 13 };
const SUARA_L1 = "Terapkan pada soal ini. Wei punya enam belas kelereng, dan mengurangi empat setiap kali.";
const SUARA_L2 = "Enam belas dibagi empat sama dengan berapa? Ketuk jawaban yang tepat.";
const SUARA_L3 = "Betul! Enam belas dibagi empat sama dengan empat.";
const SUARA_L4 = "Kita periksa dengan mengurangi. Enam belas dikurangi empat sama dengan dua belas, lalu delapan, empat, dan nol.";
const SUARA_L5 = "Empat kali pengurangan sampai nol, jadi hasil baginya empat. Itulah metode Kurang Berulang.";

export const ADEGAN_LUAR_KURANG_TERAPAN: AdeganStory = {
  id: "luar-kurang-terapan",
  judul: "Kurang Berulang: kelereng Wei",
  sumber: "Metode luar: Kurang Berulang",
  latar: "#E0F2FE",
  ketukan: [
    k(SUARA_L1, tambah(0, ...kepala(1)), tambah(idx(SUARA_L1, "enam"), ...tumpukan("kelereng", 16, 1, 16, { y0: 62, dy: 20, perBaris: 8, dx: 30 }))),
    k(SUARA_L2, tambah(idx(SUARA_L2, "Enam"), teks("tanya", 150, 112, "16 : 4 = ?", 12, W.ungu)), tambah(idx(SUARA_L2, "jawaban"), ...pilihKata(120, ["3", "4", "5"], 16))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Betul!"), "c2-k"), tambah(idx(SUARA_L3, "Enam"), hbBawah("16 : 4 = 4"))),
    k(
      SUARA_L4,
      redamkan(0, "c2-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      ...langkah(idx(SUARA_L4, "dua"), 1, 16, 4, "kelereng", KB16),
      ...langkah(idx(SUARA_L4, "delapan,"), 2, 16, 4, "kelereng", KB16),
      ...langkah(idx(SUARA_L4, "empat,", 2), 3, 16, 4, "kelereng", KB16),
      ...langkah(idx(SUARA_L4, "nol."), 4, 16, 4, "kelereng", KB16),
    ),
    k(SUARA_L5, tambah(idx(SUARA_L5, "Empat"), ringkasKb(4, 4, 160))),
  ],
};

/* ------------------------------ 6. Keluarga Fakta: konsep ------------------------------ */
const kalimat = (i: number, isi: string, warna: string, y0 = 84) => kartu(`kf${i}`, 40, y0 + (i - 1) * 28, 220, 24, warna, [isi], 13);
const SUARA_F1 = "Metode ketiga bernama Keluarga Fakta. Kali dan bagi saling berkaitan, seperti satu keluarga.";
const SUARA_F2 = "Mari kita lihat tiga bilangan, yaitu enam, delapan, dan empat puluh delapan.";
const SUARA_F3 = "Dua kalimat kali: enam kali delapan sama dengan empat puluh delapan, dan delapan kali enam sama dengan empat puluh delapan.";
const SUARA_F4 = "Dua kalimat bagi: empat puluh delapan dibagi enam sama dengan delapan, dan empat puluh delapan dibagi delapan sama dengan enam.";
const SUARA_F5 = "Satu keluarga, empat kalimat. Kalau tahu satu, kita bisa tahu semuanya.";

export const ADEGAN_LUAR_FAKTA: AdeganStory = {
  id: "luar-fakta",
  judul: "Keluarga Fakta: kali dan bagi",
  sumber: "Metode luar: Keluarga Fakta",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_F1, tambah(0, ...kepala(2)), tambah(idx(SUARA_F1, "keluarga.", 2), emo("kl", 150, 112, "\u{1F46A}", 44))),
    k(
      SUARA_F2,
      hapus(0, "kl"),
      tambah(idx(SUARA_F2, "enam,"), teks("kfn-1", 80, 70, "6", 18, W.biru)),
      tambah(idx(SUARA_F2, "delapan,"), teks("kfn-2", 150, 70, "8", 18, W.biru)),
      tambah(idx(SUARA_F2, "empat"), teks("kfn-3", 220, 70, "48", 18, W.biru)),
    ),
    k(SUARA_F3, tambah(idx(SUARA_F3, "enam"), ...kalimat(1, "6 × 8 = 48", W.hijauMuda)), tambah(idx(SUARA_F3, "delapan", 3), ...kalimat(2, "8 × 6 = 48", W.hijauMuda))),
    k(SUARA_F4, tambah(idx(SUARA_F4, "empat"), ...kalimat(3, "48 : 6 = 8", W.pink)), tambah(idx(SUARA_F4, "dan"), ...kalimat(4, "48 : 8 = 6", W.pink))),
    k(SUARA_F5, sorotkan(idx(SUARA_F5, "Satu"), "kf1-k", "kf2-k", "kf3-k", "kf4-k")),
  ],
};

/* ------------------------------ 7. Keluarga Fakta: terapan ------------------------------ */
const SUARA_G1 = "Terapkan pada soal ini. Kita tahu enam kali tujuh sama dengan empat puluh dua.";
const SUARA_G2 = "Berapa empat puluh dua dibagi enam? Ketuk jawaban yang tepat.";
const SUARA_G3 = "Betul! Empat puluh dua dibagi enam sama dengan tujuh, sebab tujuh kali enam sama dengan empat puluh dua.";
const SUARA_G4 = "Dengan keluarga fakta, kita bisa memeriksa pembagian memakai perkalian.";

export const ADEGAN_LUAR_FAKTA_TERAPAN: AdeganStory = {
  id: "luar-fakta-terapan",
  judul: "Keluarga Fakta: periksa pembagian",
  sumber: "Metode luar: Keluarga Fakta",
  latar: "#FAE8FF",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(2)), tambah(idx(SUARA_G1, "enam"), ...kartu("kf1", 40, 58, 220, 28, W.hijauMuda, ["6 × 7 = 42"], 14))),
    k(SUARA_G2, tambah(idx(SUARA_G2, "Berapa"), teks("tanya", 150, 112, "42 : 6 = ?", 12, W.ungu)), tambah(idx(SUARA_G2, "jawaban"), ...pilihKata(120, ["6", "7", "8"], 16))),
    k(SUARA_G3, sorotkan(idx(SUARA_G3, "Betul!"), "c2-k"), tambah(idx(SUARA_G3, "Empat"), teks("hb", 150, 190, "42 : 6 = 7", 12, W.merah)), tambah(idx(SUARA_G3, "sebab"), teks("pr", 150, 170, "7 × 6 = 42", 12, W.ungu))),
    k(SUARA_G4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_G4, "keluarga"), ...kartu("kk", 30, 100, 240, 30, W.emas, ["kali dan bagi saling berkaitan"], 11))),
  ],
};
