import type { AdeganStory } from "./logika-story";
import { GX, OWL, W, emo, garis, hasil, judul, kartu, pilihan, teks, ukur, ukurSalah } from "./k1b7B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ukurAksi } from "./k1b7B-bantu";

/* ------------------------------ 15. Paling panjang dan paling pendek ------------------------------ */
const PITA_T = ukur("ta", "klip", 9, GX, 28, "pita Malosi", W.merahMuda);
const IKAN_T = ukur("tb", "klip", 7, GX, 74, "ikan Halim", W.pink);
const TALI_T = ukur("tc", "klip", 5, GX, 120, "tali Kira", W.lavender);
const SUARA_G1 = "Sekarang ada tiga benda. Pita Malosi, ikan Halim, dan tali Kira. Semuanya diukur dengan klip.";
const SUARA_G2 = "Pita Malosi sembilan klip. Ikan Halim tujuh klip. Tali Kira lima klip.";
const SUARA_G3 = "Yang paling panjang adalah pita Malosi. Yang paling pendek adalah tali Kira.";
const SUARA_G4 = "Kita bisa mengurutkannya dari yang paling pendek. Tali Kira, lalu ikan Halim, lalu pita Malosi.";

export const ADEGAN_BANDING_TIGA: AdeganStory = {
  id: "banding-tiga",
  judul: "Paling panjang dan paling pendek",
  sumber: "Materi: paling panjang, paling pendek",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tiga benda")),
      tambah("Pita", ...PITA_T.bar, PITA_T.garisAwal, ...PITA_T.units),
      tambah("ikan", ...IKAN_T.bar, IKAN_T.garisAwal, ...IKAN_T.units),
      tambah("tali", ...TALI_T.bar, TALI_T.garisAwal, ...TALI_T.units),
    ),
    k(SUARA_G2, tambah("sembilan", hasil("ta", "klip", 9, 272, 66)), tambah("tujuh", hasil("tb", "klip", 7, 272, 112)), tambah("lima", hasil("tc", "klip", 5, 272, 158))),
    k(SUARA_G3, sorotkan("panjang", "tab"), sorotkan("pendek", "tcb"), tambah("adalah", ...kartu("tk", 40, 174, 220, 22, W.hijauMuda, ["paling panjang: pita Malosi"], 9.4))),
    k(SUARA_G4, sorotkan("mengurutkannya", "tbb"), hapus(0, "tk-k", "tk-t0"), tambah("Kita", ...kartu("tl", 14, 174, 272, 22, W.emas, ["pendek ke panjang: tali, ikan, pita"], 9))),
  ],
};

/* ------------------------------ 16. Menebak sebelum mengukur ------------------------------ */
const TALI_B = ukur("tb", "stik", 5, GX, 40, "tali Kira", W.lavender);
const SUARA_E1 = "Sebelum mengukur, kita menebak dulu. Kira menebak, tali ini panjangnya empat stik.";
const SUARA_E2 = "Sekarang kita ukur, mulai dari garis awal. Satu, dua, tiga, empat, lima.";
const SUARA_E3 = "Hasil ukurnya lima stik. Tebakan Kira empat stik, hasilnya lima stik.";
const SUARA_E4 = "Selisih tebakan dan hasil adalah satu stik. Tebakan Kira sudah dekat.";
const SUARA_E5 = "Menebak membantu kita memeriksa hasil. Kalau hasil jauh dari tebakan, kita ukur lagi dengan teliti.";

export const ADEGAN_TEBAK: AdeganStory = {
  id: "tebak-dulu",
  judul: "Menebak sebelum mengukur",
  sumber: "Materi: menebak sebelum mengukur",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Tebak dulu")),
      tambah("tali", ...TALI_B.bar, TALI_B.garisAwal),
      tambah("empat", garis("tm", GX + 4 * 48, 34, 0, 60, W.hijau, 1.6, { putus: true }), teks("tmt", GX + 4 * 48, 30, "tebakan", 8, W.hijau), teks("tt", 150, 128, "tebakan: 4 stik", 10, W.hijau)),
    ),
    k(SUARA_E2, ...ukurAksi(SUARA_E2, TALI_B, { setelah: "awal." })),
    k(SUARA_E3, hapus(0, "tg"), tambah("lima", hasil("tb", "stik", 5, 150, 108, 12))),
    k(SUARA_E4, sorotkan("Selisih", "tbh", "tt"), tambah("satu", teks("ts", 150, 148, "selisih: 1 stik", 10, W.coklat))),
    k(SUARA_E5, tambah("Menebak", ...kartu("te", 14, 168, 272, 28, W.emas, ["tebak, ukur, bandingkan,", "ukur lagi bila jauh"], 9)), tambah("Kalau", emo("ow", 262, 120, OWL, 22))),
  ],
};

/* ------------------------------ 17. Detektif cara mengukur ------------------------------ */
const D_A = ukurSalah("xa", "celah", "klip", 5, 120, GX, 28, "cara A", W.krem);
const D_B = ukurSalah("xb", "tumpuk", "klip", 5, 120, GX, 74, "cara B", W.krem);
const D_C = ukur("rc", "klip", 5, GX, 120, "cara C", W.krem);
const SUARA_T1 = "Igil menjadi detektif. Ada tiga cara mengukur tali. Hanya satu cara yang benar.";
const SUARA_T2 = "Cara A, ada celah di antara klip. Cara B, klipnya bertumpuk.";
const SUARA_T3 = "Cara C, klip rapat, lurus, dan dimulai dari garis awal. Cara C benar!";
const SUARA_T4 = "Hebat! Detektif Igil menemukan cara mengukur yang benar.";

export const ADEGAN_DETEKTIF: AdeganStory = {
  id: "detektif",
  judul: "Detektif cara mengukur",
  sumber: "Materi: detektif cara mengukur",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Detektif Igil")),
      tambah("Igil", emo("ow", 262, 96, OWL, 36)),
      tambah("cara", ...D_A.bar, D_A.garisAwal, ...D_A.units, ...D_B.bar, D_B.garisAwal, ...D_B.units, ...D_C.bar, D_C.garisAwal, ...D_C.units),
    ),
    k(SUARA_T2, tambah("celah", emo("xa-x", 190, 52, "❌", 20)), tambah("bertumpuk.", emo("xb-x", 190, 98, "❌", 20))),
    k(SUARA_T3, sorotkan("rapat,", "rcb"), tambah("benar!", emo("rc-x", 190, 144, "✅", 22))),
    k(SUARA_T4, tambah("Hebat!", ...kartu("dk", 14, 174, 272, 22, W.emas, ["cara C: rapat, lurus, dari garis awal"], 9))),
  ],
};

/* ------------------------------ 18. Latihan 1: berapa klip? ------------------------------ */
const PITA_W = ukur("la", "klip", 9, GX, 40, "pita Wei", W.pink);
const SUARA_A1 = "Latihan satu. Pita Wei diukur dengan klip, mulai dari garis awal. Berapa klip panjang pita itu?";
const SUARA_A2 = "Hitung klipnya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan.";
const SUARA_A3 = "Pilih jawabannya. Ketuk kartu yang menurutmu benar.";
const SUARA_A4 = "Betul! Pita Wei panjangnya sembilan klip. Hebat sekali!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: hitung klip",
  sumber: "Materi: latihan mengukur dengan klip",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah("Wei", ...PITA_W.bar, PITA_W.garisAwal), tambah("klip,", ...PITA_W.units)),
    k(SUARA_A2, ...ukurAksi(SUARA_A2, PITA_W, { setelah: "klipnya.", munculkan: false })),
    k(SUARA_A3, hapus(0, "tg"), tambah("Pilih", ...pilihan(132, ["8", "9", "10"]))),
    k(SUARA_A4, sorotkan("Betul!", "c2-k"), tambah("sembilan", hasil("la", "klip", 9, 150, 112, 14)), tambah("Hebat", emo("ok", 150, 196, "✅", 18))),
  ],
};

/* ------------------------------ 19. Latihan 2: bandingkan ------------------------------ */
const TONGKAT_U = ukur("lb", "klip", 6, GX, 30, "tongkat Upe", W.hijauMuda);
const TALI_H = ukur("lc", "klip", 9, GX, 86, "tali Halim", W.lavender);
const SUARA_B1 = "Latihan dua. Tongkat Upe enam klip. Tali Halim sembilan klip. Garis awalnya sama.";
const SUARA_B2 = "Mana yang lebih panjang? Ketuk tongkat Upe atau tali Halim.";
const SUARA_B3 = "Betul! Tali Halim lebih panjang dari tongkat Upe.";
const SUARA_B4 = "Hitung klip yang lebihnya. Satu, dua, tiga. Lebihnya tiga klip.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: mana yang lebih panjang",
  sumber: "Materi: latihan membandingkan panjang",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Latihan 2")),
      tambah("Tongkat", ...TONGKAT_U.bar, TONGKAT_U.garisAwal, ...TONGKAT_U.units, hasil("lb", "klip", 6, 276, 70)),
      tambah("Tali", ...TALI_H.bar, TALI_H.garisAwal, ...TALI_H.units, hasil("lc", "klip", 9, 276, 126)),
    ),
    k(SUARA_B2, tambah("Mana", ...pilihan(152, ["tongkat Upe", "tali Halim"], 10))),
    k(SUARA_B3, sorotkan("Betul!", "c2-k", "lcb"), tambah("Betul!", emo("ok", 150, 144, "✅", 18))),
    k(
      SUARA_B4,
      hapus(0, "c1-k", "c1-t", "c2-k", "c2-t", "ok"),
      ...ukurAksi(SUARA_B4, TALI_H, { awal: 6, sampai: 9, munculkan: false, setelah: "lebihnya." }),
      tambah(idx(SUARA_B4, "klip", 2), teks("sd", 150, 176, "selisih: 3 klip", 11, W.coklat)),
    ),
  ],
};

/* ------------------------------ 20. Latihan 3: satuan berbeda ------------------------------ */
const MEJA_K = ukur("ma", "kotak", 12, GX, 26, "meja Kira", W.krem);
const MEJA_S = ukur("mb", "sedotan", 6, GX, 104, "meja Kira", W.krem);
const SUARA_C1 = "Latihan tiga. Meja Kira diukur dengan kotak. Hasilnya dua belas kotak.";
const SUARA_C2 = "Sekarang meja itu diukur dengan sedotan. Satu sedotan lebih panjang dari satu kotak. Hasilnya lebih banyak atau lebih sedikit?";
const SUARA_C3 = "Betul, lebih sedikit. Satuan yang lebih panjang membuat hasil ukur lebih sedikit.";
const SUARA_C4 = "Mari kita periksa. Satu, dua, tiga, empat, lima, enam. Meja Kira enam sedotan.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: satuan berbeda",
  sumber: "Materi: latihan satuan berbeda",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3")), tambah("Meja", ...MEJA_K.bar, MEJA_K.garisAwal, ...MEJA_K.units), tambah(idx(SUARA_C1, "dua"), hasil("ma", "kotak", 12, 150, 92, 12))),
    k(SUARA_C2, tambah("Sekarang", ...pilihan(122, ["lebih banyak", "lebih sedikit", "sama banyak"], 8.6))),
    k(SUARA_C3, sorotkan("Betul,", "c2-k"), tambah("Satuan", emo("ok", 150, 172, "✅", 22))),
    k(
      SUARA_C4,
      hapus(0, "c1-k", "c1-t", "c2-k", "c2-t", "c3-k", "c3-t", "ok"),
      tambah(0, ...MEJA_S.bar, MEJA_S.garisAwal),
      ...ukurAksi(SUARA_C4, MEJA_S, { setelah: "periksa." }),
      tambah(idx(SUARA_C4, "sedotan."), hasil("mb", "sedotan", 6, 150, 172, 14)),
    ),
  ],
};

/* ------------------------------ 21. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Kita mengukur panjang dengan satuan, seperti klip, stik, kotak, sedotan, dan jepit.";
const SUARA_Z2 = "Mulai dari garis awal, satuan rapat, tidak bertumpuk, tidak miring, dan satu jenis satuan.";
const SUARA_Z3 = "Hasil ditulis dengan angka dan nama satuan. Satuan berbeda, hasilnya berbeda. Untuk membandingkan, pakai satuan yang sama.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("mengukur", ...kartu("p1", 14, 36, 272, 40, W.hijauMuda, ["ukur dengan satuan:", "klip, stik, kotak, sedotan, jepit"], 9.4))),
    k(SUARA_Z2, tambah("Mulai", ...kartu("p2", 14, 86, 272, 36, W.langit, ["garis awal, rapat, tidak bertumpuk,", "tidak miring, satu jenis"], 9))),
    k(SUARA_Z3, tambah("Hasil", ...kartu("p3", 14, 132, 272, 36, W.krem, ["tulis angka + nama satuan;", "bandingkan dengan satuan sama"], 9))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
