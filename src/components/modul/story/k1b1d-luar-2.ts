import type { AdeganStory } from "./logika-story";
import { E, W, batang, deret, deretEmo, emo, judul, kartu, rakManik, teks, xManik } from "./k1b1d-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b1d-bantu";
import { WARNA_METODE, kepala } from "./k1b1d-luar-1";

/* Video metode global Sub-Bab D: Bar Model (Model Batang), Rekenrek (Rak Manik), dan ringkasan. */

/* ------------------------------ 4. Bar Model: konsep ------------------------------ */
const SUARA_M1 = "Metode kedua, Bar Model, atau Model Batang. Batang panjang adalah utuh, dibagi menjadi dua bagian.";
const SUARA_M2 = "Bagian biru dan bagian merah muda berjajar menjadi satu batang utuh.";
const SUARA_M3 = "Panjang batang menunjukkan banyaknya. Makin panjang, makin banyak.";
const SUARA_M4 = "Model batang membantu kita melihat bagian dan utuh dengan jelas.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Bar Model: model batang",
  sumber: "Metode global: Bar Model",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_M1, tambah("kedua,", ...kepala(1)), tambah("utuh,", { id: "ut", t: "kotak", x: 40, y: 74, w: 220, h: 26, warna: W.emas, garis: W.biru, rx: 4, tebal: 2 }, teks("utt", 150, 92, "utuh", 11, W.biru))),
    k(SUARA_M2, tambah("biru", { id: "ba", t: "kotak", x: 40, y: 116, w: 120, h: 26, warna: W.langit, garis: W.biru, rx: 4, tebal: 2 }, teks("bat", 100, 134, "bagian", 10, W.biru)), tambah("merah", { id: "bb", t: "kotak", x: 160, y: 116, w: 100, h: 26, warna: W.pink, garis: W.biru, rx: 4, tebal: 2 }, teks("bbt", 210, 134, "bagian", 10, W.biru))),
    k(SUARA_M3, sorotkan("Panjang", "ut"), tambah("Makin", teks("mk", 150, 170, "makin panjang, makin banyak", 9.4, W.ungu))),
    k(SUARA_M4, tambah("jelas.", emo("ok", 150, 196, "\u{2705}", 20))),
  ],
};

/* ------------------------------ 5. Bar Model: terapan ------------------------------ */
const SUARA_B1 = "Ada sembilan gelas sisa pesta. Enam gelas berisi jus jeruk.";
const SUARA_B2 = "Batang utuhnya sembilan kotak. Enam kotak diwarnai biru untuk jus jeruk.";
const SUARA_B3 = "Sisanya tiga kotak merah muda. Jadi tiga gelas berisi air putih.";
const SUARA_B4 = "Sembilan adalah enam dan tiga. Batangnya menunjukkan bagian dan utuh.";
const GELAS = deret(9, 30, 30, 74);

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Bar Model: sembilan gelas",
  sumber: "Metode global: Bar Model, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(1)), tambah("sembilan", ...deretEmo(E.gelas, "gl", GELAS, 22)), sorotkan("Enam", "gl0", "gl1", "gl2", "gl3", "gl4", "gl5")),
    k(SUARA_B2, tambah("Batang", ...batang("bt", 51, 110, 0, 9, 22)), ubah("biru", ...[0, 1, 2, 3, 4, 5].map((i) => ({ id: `bt${i}`, warna: W.langit }))), tambah("Enam", teks("t6", 117, 150, "6", 13, W.biru))),
    k(SUARA_B3, sorotkan("Sisanya", "bt6", "bt7", "bt8"), tambah("tiga", teks("t3", 216, 150, "3", 13, W.merah))),
    k(SUARA_B4, tambah("Sembilan", ...kartu("j9", 90, 166, 120, 24, W.emas, ["9: 6 dan 3"], 10))),
  ],
};

/* ------------------------------ 6. Rekenrek: konsep ------------------------------ */
const SUARA_R1 = "Metode ketiga, Rekenrek, atau Rak Manik. Ada sepuluh manik pada satu kawat, lima merah dan lima putih.";
const SUARA_R2 = "Manik digeser ke kiri sebagai satu bagian. Manik yang tinggal di kanan adalah bagian lainnya.";
const SUARA_R3 = "Lima manik merah membantu kita melihat lima tanpa menghitung satu per satu.";
const SUARA_R4 = "Rak manik cocok untuk mencari pasangan sepuluh.";

export const ADEGAN_LUAR_MANIK: AdeganStory = {
  id: "luar-manik",
  judul: "Rekenrek: rak manik",
  sumber: "Metode global: Rekenrek",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_R1, tambah("ketiga,", ...kepala(2)), tambah("sepuluh", ...rakManik("mk", 0), ...kartu("m10", 110, 140, 80, 22, W.emas, ["10 manik"], 10))),
    k(SUARA_R2, ubah("kiri", ...[0, 1].map((i) => ({ id: `mk${i}`, x: xManik(i, 2) }))), tambah("kiri", teks("kr", 48, 88, "bagian", 9, W.merah)), tambah("kanan", teks("kn", 220, 88, "bagian lain", 9, W.biru))),
    k(SUARA_R3, hapus(0, "m10-k", "m10-t0"), sorotkan("merah", "mk0", "mk1", "mk2", "mk3", "mk4")),
    k(SUARA_R4, tambah("pasangan", teks("pp", 150, 172, "pasangan 10", 11, W.ungu))),
  ],
};

/* ------------------------------ 7. Rekenrek: terapan ------------------------------ */
const SUARA_Q1 = "Igil menggeser empat manik ke kiri.";
const SUARA_Q2 = "Di kanan tinggal enam manik. Empat dan enam adalah pasangan sepuluh.";
const SUARA_Q3 = "Geser satu lagi. Sekarang lima di kiri dan lima di kanan.";
const SUARA_Q4 = "Setiap geseran memberi pasangan sepuluh yang baru.";
const geser = (kiri: number) => Array.from({ length: 10 }, (_, i) => ({ id: `mk${i}`, x: xManik(i, kiri) }));

export const ADEGAN_LUAR_MANIK_TERAPAN: AdeganStory = {
  id: "luar-manik-terapan",
  judul: "Rekenrek: pasangan sepuluh",
  sumber: "Metode global: Rekenrek, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(2), ...rakManik("mk", 0)), ubah("menggeser", ...geser(4)), tambah("empat", teks("tk", 57, 88, "4", 14, W.merah))),
    k(SUARA_Q2, tambah("enam", teks("tn", 232, 88, "6", 14, W.biru)), tambah("pasangan", ...kartu("j1", 90, 140, 120, 24, W.hijauMuda, ["4 dan 6"], 10))),
    k(SUARA_Q3, ubah("Geser", ...geser(5), { id: "tk", isi: "5", x: 66 }, { id: "tn", isi: "5", x: 241 }), ubah("lima", { id: "j1-t0", isi: "5 dan 5" })),
    k(SUARA_Q4, tambah("baru.", emo("ok", 150, 190, "\u{2728}", 22))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk pasangan bilangan.";
const SUARA_Z2 = "Number Bond: lingkaran utuh terikat dengan dua bagian.";
const SUARA_Z3 = "Bar Model: batang utuh dibagi menjadi dua bagian.";
const SUARA_Z4 = "Rekenrek: geser manik, lalu baca pasangan di kiri dan kanan.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("pasangan", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Number", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Number Bond", "utuh terikat dua bagian"], 9.4))),
    k(SUARA_Z3, tambah("Bar", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Bar Model", "batang utuh, dua bagian"], 9.4))),
    k(SUARA_Z4, tambah("Rekenrek:", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Rekenrek", "geser manik, baca pasangan"], 9.4))),
  ],
};
