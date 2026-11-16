import type { AdeganStory } from "./logika-story";
import { W, bungkus, emo, garisBil, idBungkus, kartu, loncat } from "./k3b2A-gambar";
import { hapus, idKartu, idx, k, sorotkan, tambah, ubah } from "./k3b2A-bantu";
import { kepala } from "./k3b2A-luar-1";

/* ------------------------------ 4. Loncat Garis Bilangan: konsep ------------------------------ */
const SUARA_L1 = "Metode kedua bernama Loncat Garis Bilangan. Kita meloncat dari bilangan kecil ke bilangan besar.";
const SUARA_L2 = "Garis bilangan ini menunjukkan tiga puluh sampai lima puluh.";
const SUARA_L3 = "Kita mulai di tiga puluh. Dua loncatan sepuluh membawa kita sampai lima puluh.";
const SUARA_L4 = "Dua loncatan sepuluh sama dengan dua puluh. Jadi titik-titik diisi dua puluh.";

export const ADEGAN_LUAR_LONCAT: AdeganStory = {
  id: "luar-loncat",
  judul: "Loncat Garis Bilangan: dari tiga puluh ke lima puluh",
  sumber: "Metode luar: Loncat Garis Bilangan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_L1, tambah(0, ...kepala(1)), tambah(idx(SUARA_L1, "meloncat"), emo("fg", 150, 112, "\u{1F438}", 52))),
    k(SUARA_L2, hapus(0, "fg"), tambah(idx(SUARA_L2, "Garis"), ...garisBil(112, 30, 50, 5)), tambah(idx(SUARA_L2, "tiga"), ...kartu("kl", 80, 150, 140, 26, W.emas, ["30 + … = 50"], 12))),
    k(SUARA_L3, tambah(idx(SUARA_L3, "mulai"), emo("mk", 28, 86, "\u{1F4CD}", 20)), tambah(idx(SUARA_L3, "Dua"), ...loncat(1, 112, 30, 40, 30, 50, "+10")), tambah(idx(SUARA_L3, "membawa"), ...loncat(2, 112, 40, 50, 30, 50, "+10"))),
    k(SUARA_L4, hapus(0, ...idKartu("kl")), tambah(idx(SUARA_L4, "sama"), ...kartu("kj", 80, 150, 140, 26, W.hijauMuda, ["10 + 10 = 20"], 12)), ubah(idx(SUARA_L4, "diisi"), { id: "kj-t0", isi: "30 + 20 = 50" })),
  ],
};

/* ------------------------------ 5. Loncat Garis Bilangan: terapan ------------------------------ */
const SUARA_M1 = "Terapkan pada soal ini. Kira punya tiga puluh delapan bintang dan ingin mencapai lima puluh.";
const SUARA_M2 = "Pertama, kita meloncat ke puluhan terdekat, yaitu empat puluh.";
const SUARA_M3 = "Lalu kita meloncat sampai lima puluh. Jumlah loncatannya dua tambah sepuluh.";
const SUARA_M4 = "Dua tambah sepuluh sama dengan dua belas. Jadi Kira perlu dua belas bintang lagi.";

export const ADEGAN_LUAR_LONCAT_TERAPAN: AdeganStory = {
  id: "luar-loncat-terapan",
  judul: "Loncat Garis Bilangan: soal Kira",
  sumber: "Metode luar: Loncat Garis Bilangan",
  latar: "#DBEAFE",
  ketukan: [
    k(SUARA_M1, tambah(0, ...kepala(1)), tambah(idx(SUARA_M1, "Kira"), ...kartu("ks", 70, 56, 160, 26, W.emas, ["38 + … = 50"], 12)), tambah(idx(SUARA_M1, "delapan"), ...garisBil(130, 38, 50, 2))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "meloncat"), ...loncat(1, 130, 38, 40, 38, 50, "+2"))),
    k(SUARA_M3, tambah(idx(SUARA_M3, "meloncat"), ...loncat(2, 130, 40, 50, 38, 50, "+10")), sorotkan(idx(SUARA_M3, "dua"), "lc1-t")),
    k(SUARA_M4, hapus(0, ...idKartu("ks")), tambah(idx(SUARA_M4, "sama"), ...kartu("kt", 40, 164, 100, 26, W.hijauMuda, ["2 + 10 = 12"], 11)), tambah(idx(SUARA_M4, "perlu"), ...kartu("kp", 156, 164, 110, 26, W.emas, ["38 + 12 = 50"], 11))),
  ],
};

/* ------------------------------ 6. Bungkus Sepuluh: konsep ------------------------------ */
const SUARA_U1 = "Metode ketiga bernama Bungkus Sepuluh. Sepuluh bintang lepas dibungkus menjadi satu bungkus.";
const SUARA_U2 = "Bilangan tiga puluh satu terdiri dari tiga bungkus dan satu bintang lepas.";
const SUARA_U3 = "Kalau perlu mengurangi, satu bungkus boleh dibuka menjadi sepuluh bintang lepas.";
const SUARA_U4 = "Dengan membuka bungkus, pengurangan jadi mudah dilihat.";

export const ADEGAN_LUAR_BUNGKUS: AdeganStory = {
  id: "luar-bungkus",
  judul: "Bungkus Sepuluh: bungkus dan bintang lepas",
  sumber: "Metode luar: Bungkus Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_U1, tambah(0, ...kepala(2)), tambah(idx(SUARA_U1, "Sepuluh", 2), ...bungkus("ua", 0, 10, 60, 66)), tambah(idx(SUARA_U1, "bungkus.", 2), ...kartu("kb", 150, 80, 130, 26, W.emas, ["10 lepas = 1 bungkus"], 10))),
    k(SUARA_U2, hapus(0, ...idBungkus("ua", 0, 10)), tambah(idx(SUARA_U2, "tiga", 2), ...bungkus("ub", 3, 1, 60, 66)), tambah(idx(SUARA_U2, "satu"), ...kartu("kc", 150, 110, 100, 26, W.hijauMuda, ["31"], 14))),
    k(SUARA_U3, hapus(0, ...idBungkus("ub", 3, 1), ...idKartu("kc")), tambah(idx(SUARA_U3, "dibuka"), ...bungkus("uc", 2, 11, 60, 66)), tambah(idx(SUARA_U3, "sepuluh"), ...kartu("kd", 150, 110, 130, 26, W.merahMuda, ["buka 1 bungkus"], 10))),
    k(SUARA_U4, tambah(idx(SUARA_U4, "mudah"), emo("ok", 150, 176, "✅", 30))),
  ],
};

/* ------------------------------ 7. Bungkus Sepuluh: terapan ------------------------------ */
const SUARA_V1 = "Terapkan pada soal ini. Delapan belas tambah titik-titik sama dengan tiga puluh satu.";
const SUARA_V2 = "Tiga puluh satu adalah tiga bungkus dan satu bintang lepas. Kita buka satu bungkus.";
const SUARA_V3 = "Kita keluarkan delapan belas, yaitu satu bungkus dan delapan bintang lepas.";
const SUARA_V4 = "Sisanya satu bungkus dan tiga bintang lepas, jadi tiga belas. Titik-titik diisi tiga belas.";

export const ADEGAN_LUAR_BUNGKUS_TERAPAN: AdeganStory = {
  id: "luar-bungkus-terapan",
  judul: "Bungkus Sepuluh: soal tiga puluh satu",
  sumber: "Metode luar: Bungkus Sepuluh",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(2)), tambah(idx(SUARA_V1, "Delapan"), ...kartu("ks", 70, 56, 160, 26, W.emas, ["18 + … = 31"], 12)), tambah(idx(SUARA_V1, "tiga"), ...bungkus("vt", 3, 1, 60, 100))),
    k(SUARA_V2, hapus(idx(SUARA_V2, "buka"), ...idBungkus("vt", 3, 1)), tambah(idx(SUARA_V2, "buka"), ...bungkus("vt2", 2, 11, 60, 100))),
    k(SUARA_V3, ubah(idx(SUARA_V3, "delapan"), { id: "vt2-p1", op: 0.15 }, ...Array.from({ length: 8 }, (_, j) => ({ id: `vt2-s${j + 1}`, op: 0.15 })))),
    k(SUARA_V4, hapus(0, ...idKartu("ks")), tambah(idx(SUARA_V4, "tiga", 2), ...kartu("kn", 150, 100, 70, 26, W.hijauMuda, ["13"], 14)), tambah(idx(SUARA_V4, "diisi"), ...kartu("kz", 150, 140, 130, 26, W.emas, ["18 + 13 = 31"], 11))),
  ],
};
