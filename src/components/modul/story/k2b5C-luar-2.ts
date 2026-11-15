import type { AdeganStory } from "./logika-story";
import { W, WARNA_APEL, bagianKotak, bagianLingkaran, emo, garisPotong, idBagian, kartu, labelBagian, panah, teks } from "./k2b5C-gambar";
import { hapus, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b5C-bantu";
import { kepala } from "./k2b5C-luar-1";

/* ------------------------------ 4. Setengah dari Setengah: konsep ------------------------------ */
const AP_UTUH = bagianLingkaran("ap", 150, 104, 46, [360], -90, WARNA_APEL);
const AP_DUA = bagianLingkaran("ap", 150, 104, 46, [180, 180], -90, WARNA_APEL);
/** Setengah kiri tetap utuh, setengah kanan dibagi dua: dua seperempat di kanan (nomor 1 dan 2), setengah di kiri (nomor 3). */
const AP_TIGA = bagianLingkaran("ap", 150, 104, 46, [90, 90, 180], -90, WARNA_APEL);

const SUARA_H1 = "Metode kedua bernama Setengah dari Setengah. Kita mulai dari satu apel utuh.";
const SUARA_H2 = "Bagi apel menjadi dua bagian yang sama besar. Tiap bagian adalah setengah.";
const SUARA_H3 = "Ambil setengah bagian kanan, lalu bagi dua sama besar.";
const SUARA_H4 = "Jadi setengah dari setengah apel adalah seperempat.";
const SUARA_H5 = "Jadi seperempat apel adalah setengah dari setengah apel.";

export const ADEGAN_LUAR_SETENGAH: AdeganStory = {
  id: "luar-setengah",
  judul: "Setengah dari Setengah: dua langkah",
  sumber: "Metode luar: Setengah dari Setengah",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_H1, tambah(0, ...kepala(1)), tambah(idx(SUARA_H1, "apel"), ...AP_UTUH), tambah(idx(SUARA_H1, "utuh."), ...labelBagian(AP_UTUH, "utuh", 10))),
    k(
      SUARA_H2,
      hapus(idx(SUARA_H2, "dua"), ...idBagian("ap", 1, true)),
      tambah(idx(SUARA_H2, "dua"), ...AP_DUA),
      tambah(idx(SUARA_H2, "Tiap"), ...labelBagian(AP_DUA, "1/2", 11)),
    ),
    k(
      SUARA_H3,
      hapus(idx(SUARA_H3, "bagi"), ...idBagian("ap", 2, true)),
      tambah(idx(SUARA_H3, "bagi"), ...AP_TIGA),
      sorotkan(idx(SUARA_H3, "kanan,"), "pc-ap-1", "pc-ap-2"),
    ),
    k(
      SUARA_H4,
      redamkan(0, "pc-ap-2"),
      tambah(idx(SUARA_H4, "seperempat."), ...labelBagian(AP_TIGA, ["1/4", "1/4", "1/2"], 10)),
    ),
    k(SUARA_H5, tambah(idx(SUARA_H5, "Jadi"), ...kartu("sm", 30, 164, 240, 24, W.krem, ["setengah dari setengah sama dengan seperempat"], 8.4))),
  ],
};

/* ------------------------------ 5. Setengah dari Setengah: terapan ------------------------------ */
const RT = bagianLingkaran("rt", 150, 96, 40, [90, 90, 180], -90, ["#FED7AA", "#FDE68A", "#FED7AA", "#FDE68A"]);

const SUARA_X1 = "Terapkan pada soal ini. Upe punya satu roti bulat. Roti dibagi dua, lalu setengah kanan dibagi dua lagi.";
const SUARA_X2 = "Satu bagian kanan ini disebut apa? Ketuk jawaban yang tepat.";
const SUARA_X3 = "Lihat dengan teliti. Bagian ini setengah dari setengah roti.";
const SUARA_X4 = "Betul! Setengah dari setengah adalah seperempat. Hebat!";

export const ADEGAN_LUAR_SETENGAH_TERAPAN: AdeganStory = {
  id: "luar-setengah-terapan",
  judul: "Setengah dari Setengah: roti bulat",
  sumber: "Metode luar: Setengah dari Setengah",
  latar: "#DBEAFE",
  ketukan: [
    k(SUARA_X1, tambah(0, ...kepala(1)), tambah(idx(SUARA_X1, "roti"), ...RT)),
    k(SUARA_X2, sorotkan(idx(SUARA_X2, "Satu"), "pc-rt-1"), tambah(idx(SUARA_X2, "tepat."), ...pilihKata(150, ["utuh", "seperempat", "setengah"], 11))),
    k(SUARA_X3, tambah(idx(SUARA_X3, "Bagian"), panah("pw", 214, 70, -26, 6))),
    k(SUARA_X4, hapus(0, "pw"), sorotkan(idx(SUARA_X4, "Betul!"), "c2-k"), tambah(idx(SUARA_X4, "Hebat!"), emo("ok", 262, 100, "✅", 22))),
  ],
};

/* ------------------------------ 6. Lipat Dua Kali: konsep ------------------------------ */
const LP_X = 108;
const LP_Y = 54;
const LP_S = 84;
const LP_UTUH = bagianKotak("lp", LP_X, LP_Y, LP_S, LP_S, "utuh");
const LP_DUA = bagianKotak("lp", LP_X, LP_Y, LP_S, LP_S, "tegak2");
const LP_EMPAT = bagianKotak("lp", LP_X, LP_Y, LP_S, LP_S, "empat");

const SUARA_F1 = "Metode ketiga bernama Lipat Dua Kali. Kita lipat gambar persegi di layar.";
const SUARA_F2 = "Lipat pertama, ketuk lipat. Sisi kiri menutupi sisi kanan dengan pas.";
const SUARA_F3 = "Dibuka, ada dua bagian yang sama besar. Tiap bagian adalah setengah.";
const SUARA_F4 = "Lipat kedua, ketuk lipat lagi. Sisi atas menutupi sisi bawah dengan pas.";
const SUARA_F5 = "Dibuka, ada empat bagian yang sama besar. Tiap bagian adalah seperempat.";

export const ADEGAN_LUAR_LIPAT: AdeganStory = {
  id: "luar-lipat",
  judul: "Lipat Dua Kali: lipat di layar",
  sumber: "Metode luar: Lipat Dua Kali",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_F1, tambah(0, ...kepala(2)), tambah(idx(SUARA_F1, "persegi"), ...LP_UTUH), tambah(idx(SUARA_F1, "layar."), ...labelBagian(LP_UTUH, "utuh", 10))),
    k(
      SUARA_F2,
      tambah(idx(SUARA_F2, "ketuk"), garisPotong("gp1", LP_X + LP_S / 2, LP_Y, 0, LP_S)),
      tambah(idx(SUARA_F2, "menutupi"), panah("fl1", LP_X + 18, LP_Y + 42, 48, 0)),
    ),
    k(
      SUARA_F3,
      hapus(idx(SUARA_F3, "dua"), "fl1", ...idBagian("lp", 1, true)),
      tambah(idx(SUARA_F3, "dua"), ...LP_DUA),
      tambah(idx(SUARA_F3, "Tiap"), ...labelBagian(LP_DUA, "1/2", 11)),
    ),
    k(
      SUARA_F4,
      tambah(idx(SUARA_F4, "ketuk"), garisPotong("gp2", LP_X, LP_Y + LP_S / 2, LP_S, 0)),
      tambah(idx(SUARA_F4, "menutupi"), panah("fl2", LP_X + 22, LP_Y + 18, 0, 48)),
    ),
    k(
      SUARA_F5,
      hapus(idx(SUARA_F5, "empat"), "fl2", ...idBagian("lp", 2, true)),
      tambah(idx(SUARA_F5, "empat"), ...LP_EMPAT),
      tambah(idx(SUARA_F5, "Tiap"), ...labelBagian(LP_EMPAT, "1/4", 11)),
    ),
  ],
};

/* ------------------------------ 7. Lipat Dua Kali: terapan ------------------------------ */
const LT_UTUH = bagianKotak("lt", LP_X, LP_Y, LP_S, LP_S, "utuh");
const LT_EMPAT = bagianKotak("lt", LP_X, LP_Y, LP_S, LP_S, "empat");
const NOMOR = LT_EMPAT.map((b, i) => {
  const t = labelBagian([b], String(i + 1), 12);
  return { ...t[0], id: `nm-lt-${i + 1}` };
});

const SUARA_Y1 = "Terapkan pada soal ini. Wei melipat persegi dua kali di layar.";
const SUARA_Y2 = "Berapa bagian sama besar yang terbentuk? Ketuk jawaban yang tepat.";
const SUARA_Y3 = "Hitung bersama, satu, dua, tiga, empat.";
const SUARA_Y4 = "Betul! Dua kali lipat menghasilkan empat bagian sama besar. Hebat!";

export const ADEGAN_LUAR_LIPAT_TERAPAN: AdeganStory = {
  id: "luar-lipat-terapan",
  judul: "Lipat Dua Kali: hitung bagian",
  sumber: "Metode luar: Lipat Dua Kali",
  latar: "#FCE7F3",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_Y1, "persegi"), ...LT_UTUH),
      tambah(idx(SUARA_Y1, "dua"), garisPotong("gp1", LP_X + LP_S / 2, LP_Y, 0, LP_S), garisPotong("gp2", LP_X, LP_Y + LP_S / 2, LP_S, 0)),
    ),
    k(
      SUARA_Y2,
      hapus(idx(SUARA_Y2, "bagian"), ...idBagian("lt", 1)),
      tambah(idx(SUARA_Y2, "bagian"), ...LT_EMPAT),
      tambah(idx(SUARA_Y2, "tepat."), ...pilihKata(152, ["dua", "empat", "enam"], 13)),
    ),
    k(
      SUARA_Y3,
      tambah(idx(SUARA_Y3, "satu,"), NOMOR[0]),
      tambah(idx(SUARA_Y3, "dua,"), NOMOR[1]),
      tambah(idx(SUARA_Y3, "tiga,"), NOMOR[2]),
      tambah(idx(SUARA_Y3, "empat."), NOMOR[3]),
    ),
    k(SUARA_Y4, sorotkan(idx(SUARA_Y4, "Betul!"), "c2-k"), tambah(idx(SUARA_Y4, "Hebat!"), emo("ok", 262, 96, "✅", 22), teks("tk", 150, 146, "empat bagian sama besar", 9, W.ungu))),
  ],
};
