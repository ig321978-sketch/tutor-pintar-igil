import type { AdeganStory } from "./logika-story";
import { W, anak, deret, emo, idPenunjuk, idBenda, isiSisi, judul, kartu, kerangka, labelSisi, panah, penunjuk, spek, teks, ubahTimbang } from "./k2b6A-gambar";
import { bersih, hapus, idKartu, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b6A-bantu";

const KOSONG = (jenis: "timbangan" | "gantung") => spek(1, jenis, [], []);

/* ------------------------------ 2. Buah Kira dan Malosi ------------------------------ */
const BUAH = ["semangka", "apel", "anggur"];
const XS_BUAH = [92, 150, 208];
const SUARA_C1 = "Hari ini Kira dan Malosi bermain dengan buah di layar. Ada semangka, apel, dan anggur.";
const SUARA_C2 = "Kira bertanya, benda mana yang paling berat? Malosi menjawab, kita bisa menimbang supaya tahu.";
const SUARA_C3 = "Menebak saja belum pasti. Karena itu kita memakai alat untuk membandingkan berat.";
const SUARA_C4 = "Berat adalah tarikan benda ke bawah. Semangka tertarik ke bawah lebih kuat daripada anggur.";
const SUARA_C5 = "Supaya yakin, kita buktikan dengan timbangan jungkat-jungkit. Mari kita lihat bersama.";
const buahC = deret(BUAH, 100, 1, XS_BUAH);

export const ADEGAN_CERITA_BUAH: AdeganStory = {
  id: "cerita-buah",
  judul: "Buah Kira dan Malosi",
  sumber: "Materi: buah Kira dan Malosi",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Buah Kira dan Malosi")),
      tambah(idx(SUARA_C1, "Kira"), ...anak("kira", 36, 44)),
      tambah(idx(SUARA_C1, "Malosi"), ...anak("malosi", 264, 44)),
      tambah(idx(SUARA_C1, "semangka,"), buahC[0], buahC[1]),
      tambah(idx(SUARA_C1, "apel,"), buahC[2], buahC[3]),
      tambah(idx(SUARA_C1, "anggur."), buahC[4], buahC[5]),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "bertanya,"), emo("tn", 150, 54, "❓", 30)), tambah(idx(SUARA_C2, "menimbang"), emo("tb", 150, 160, "⚖️", 30))),
    k(SUARA_C3, hapus(idx(SUARA_C3, "Menebak"), "tn", "tb"), tambah(idx(SUARA_C3, "alat"), ...kartu("al", 40, 140, 220, 34, W.emas, ["alat untuk membandingkan berat"], 10))),
    k(
      SUARA_C4,
      hapus(0, ...idKartu("al")),
      tambah(idx(SUARA_C4, "tarikan"), panah("pa2", 150, 124, 0, 14)),
      tambah(idx(SUARA_C4, "Semangka"), panah("pa1", 92, 124, 0, 38)),
      tambah(idx(SUARA_C4, "anggur."), panah("pa3", 208, 124, 0, 9)),
    ),
    k(SUARA_C5, bersih(0), tambah(0, judul("Timbangan jungkat-jungkit")), tambah(idx(SUARA_C5, "timbangan"), emo("tbs", 150, 96, "⚖️", 56)), tambah(idx(SUARA_C5, "lihat"), ...kartu("tk", 40, 120, 220, 34, W.langit, ["timbangan jungkat-jungkit"], 11))),
  ],
};

/* ------------------------------ 3. Timbangan jungkat-jungkit ------------------------------ */
const J0 = KOSONG("timbangan");
const J1 = spek(1, "timbangan", ["apel"], []);
const J2 = spek(1, "timbangan", ["apel"], ["anggur"]);
const J3a = spek(1, "timbangan", ["anggur"], []);
const J3 = spek(1, "timbangan", ["anggur"], ["apel"]);
const SUARA_J1 = "Cara pertama memakai timbangan jungkat-jungkit. Ini papan panjang yang bagian tengahnya diam, dan kedua ujungnya bisa naik turun.";
const SUARA_J2 = "Di tiap ujung ada satu piringan. Benda ditaruh di piringan itu. Sekarang piringan kiri dan piringan kanan masih kosong.";
const SUARA_J3 = "Kita taruh apel di piringan kiri. Piringan kiri terasa berat, jadi ujung kiri turun.";
const SUARA_J4 = "Sekarang kita taruh anggur di piringan kanan. Anggur sangat ringan.";
const SUARA_J5 = "Lihat, ujung kiri tetap turun dan ujung kanan tetap naik. Apel lebih berat dari anggur.";
const SUARA_J6 = "Sekarang kita tukar tempatnya. Anggur kita pindah ke kiri dan apel kita pindah ke kanan.";
const SUARA_J7 = "Sekarang ujung kanan turun. Apel di kanan lebih berat dari anggur. Benda yang lebih berat selalu membuat ujungnya turun.";

export const ADEGAN_JUNGKAT: AdeganStory = {
  id: "jungkat-jungkit",
  judul: "Timbangan jungkat-jungkit",
  sumber: "Materi: timbangan jungkat-jungkit",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Timbangan jungkat-jungkit")), tambah(idx(SUARA_J1, "papan"), kerangka(J0)), sorotkan(idx(SUARA_J1, "ujungnya"), "tm1-bl")),
    k(
      SUARA_J2,
      redamkan(0, "tm1-bl"),
      tambah(idx(SUARA_J2, "kiri"), teks("hk", 54, 44, "kiri", 11, W.ungu)),
      tambah(idx(SUARA_J2, "kanan"), teks("hn", 246, 44, "kanan", 11, W.ungu)),
      sorotkan(idx(SUARA_J2, "piringan"), "tm1-pL", "tm1-pR"),
      redamkan(idx(SUARA_J2, "kosong."), "tm1-pL", "tm1-pR"),
    ),
    k(
      SUARA_J3,
      hapus(0, "hk", "hn"),
      tambah(idx(SUARA_J3, "apel"), ...isiSisi(J1, "L"), labelSisi(J1, "L")),
      ubah(idx(SUARA_J3, "apel"), ...ubahTimbang(J1, { L: true })),
      tambah(idx(SUARA_J3, "turun."), ...penunjuk(J1)),
    ),
    k(SUARA_J4, tambah(idx(SUARA_J4, "anggur"), ...isiSisi(J2, "R"), labelSisi(J2, "R")), ubah(idx(SUARA_J4, "anggur"), ...ubahTimbang(J2, { L: true, R: true }))),
    k(SUARA_J5, sorotkan(idx(SUARA_J5, "kiri"), "tm1-pL"), tambah(idx(SUARA_J5, "Apel"), ...kartu("hs", 40, 164, 220, 26, W.emas, ["turun berarti lebih berat"], 10))),
    k(
      SUARA_J6,
      redamkan(0, "tm1-pL"),
      hapus(idx(SUARA_J6, "tukar"), idBenda(1, "L", "apel", 1), idBenda(1, "R", "anggur", 1), "tm1-lbL", "tm1-lbR", ...idPenunjuk(J2)),
      ubah(idx(SUARA_J6, "tukar"), ...ubahTimbang(J0)),
      tambah(idx(SUARA_J6, "Anggur"), ...isiSisi(J3a, "L"), labelSisi(J3a, "L")),
      ubah(idx(SUARA_J6, "Anggur"), ...ubahTimbang(J3a, { L: true })),
      tambah(idx(SUARA_J6, "apel"), ...isiSisi(J3, "R"), labelSisi(J3, "R")),
      ubah(idx(SUARA_J6, "apel"), ...ubahTimbang(J3, { L: true, R: true })),
      tambah(idx(SUARA_J6, "kanan."), ...penunjuk(J3)),
    ),
    k(SUARA_J7, sorotkan(idx(SUARA_J7, "kanan"), "tm1-pR"), ubah(idx(SUARA_J7, "Benda"), { id: "hs-t0", isi: "yang berat selalu turun" })),
  ],
};

/* ------------------------------ 4. Lebih berat dan lebih ringan ------------------------------ */
const K0 = KOSONG("timbangan");
const KA = spek(1, "timbangan", ["semangka"], []);
const KB = spek(1, "timbangan", ["semangka"], ["apel"]);
const KCa = spek(1, "timbangan", ["apel"], []);
const KC = spek(1, "timbangan", ["apel"], ["semangka"]);
const SUARA_L1 = "Sekarang kita belajar kata untuk membandingkan. Di piringan kiri ada semangka, dan di piringan kanan ada apel.";
const SUARA_L2 = "Semangka lebih berat dari apel. Karena itu ujung semangka turun.";
const SUARA_L3 = "Sebaliknya, apel lebih ringan dari semangka. Karena itu ujung apel naik.";
const SUARA_L4 = "Kita ingat dua kata. Lebih berat untuk benda yang turun, dan lebih ringan untuk benda yang naik.";
const SUARA_L5 = "Sekarang kita tukar tempatnya. Apel di kiri dan semangka di kanan.";
const SUARA_L6 = "Ujung semangka tetap turun, walaupun sekarang di sebelah kanan. Jadi semangka tetap lebih berat dari apel, di mana pun tempatnya.";

export const ADEGAN_LEBIH_BERAT: AdeganStory = {
  id: "lebih-berat",
  judul: "Lebih berat dan lebih ringan",
  sumber: "Materi: lebih berat dan lebih ringan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kata untuk berat")),
      tambah(idx(SUARA_L1, "piringan"), kerangka(K0)),
      tambah(idx(SUARA_L1, "semangka,"), ...isiSisi(KA, "L"), labelSisi(KA, "L")),
      ubah(idx(SUARA_L1, "semangka,"), ...ubahTimbang(KA, { L: true })),
      tambah(idx(SUARA_L1, "apel"), ...isiSisi(KB, "R"), labelSisi(KB, "R")),
      ubah(idx(SUARA_L1, "apel"), ...ubahTimbang(KB, { L: true, R: true })),
    ),
    k(SUARA_L2, tambah(idx(SUARA_L2, "Semangka"), ...penunjuk(KB)), tambah(idx(SUARA_L2, "turun."), ...kartu("k1", 14, 164, 136, 26, W.hijauMuda, ["semangka lebih berat"], 9))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "apel"), idBenda(1, "R", "apel", 1)), tambah(idx(SUARA_L3, "naik."), ...kartu("k2", 154, 164, 132, 26, W.pink, ["apel lebih ringan"], 9))),
    k(SUARA_L4, redamkan(0, idBenda(1, "R", "apel", 1)), sorotkan(idx(SUARA_L4, "turun,"), idBenda(1, "L", "semangka", 1)), sorotkan(idx(SUARA_L4, "naik."), idBenda(1, "R", "apel", 1))),
    k(
      SUARA_L5,
      redamkan(0, idBenda(1, "L", "semangka", 1), idBenda(1, "R", "apel", 1)),
      hapus(idx(SUARA_L5, "tukar"), idBenda(1, "L", "semangka", 1), idBenda(1, "R", "apel", 1), "tm1-lbL", "tm1-lbR", ...idPenunjuk(KB)),
      ubah(idx(SUARA_L5, "tukar"), ...ubahTimbang(K0)),
      tambah(idx(SUARA_L5, "Apel"), ...isiSisi(KCa, "L"), labelSisi(KCa, "L")),
      ubah(idx(SUARA_L5, "Apel"), ...ubahTimbang(KCa, { L: true })),
      tambah(idx(SUARA_L5, "semangka"), ...isiSisi(KC, "R"), labelSisi(KC, "R")),
      ubah(idx(SUARA_L5, "semangka"), ...ubahTimbang(KC, { L: true, R: true })),
      tambah(idx(SUARA_L5, "kanan."), ...penunjuk(KC)),
    ),
    k(SUARA_L6, sorotkan(idx(SUARA_L6, "semangka"), idBenda(1, "R", "semangka", 1)), tambah(idx(SUARA_L6, "tempatnya."), emo("ok", 150, 54, "✅", 24))),
  ],
};

/* ------------------------------ 5. Sama berat ------------------------------ */
const M0 = KOSONG("timbangan");
const MA = spek(1, "timbangan", ["apel"], []);
const MB = spek(1, "timbangan", ["apel"], ["jeruk"]);
const MC = spek(1, "timbangan", ["apel"], ["jeruk", "anggur"]);
const SUARA_M1 = "Sekarang ada apel di piringan kiri dan jeruk di piringan kanan. Kita lihat apa yang terjadi.";
const SUARA_M2 = "Kedua ujung sejajar. Tidak ada yang turun dan tidak ada yang naik.";
const SUARA_M3 = "Apel sama berat dengan jeruk. Kita sebut sama berat.";
const SUARA_M4 = "Apel dan jeruk berbeda rasa dan warna. Tetapi beratnya sama, jadi timbangan jungkat-jungkit tetap sejajar.";
const SUARA_M5 = "Sekarang kita tambah satu anggur di piringan kanan. Piringan kanan menjadi lebih berat, jadi ujung kanan turun.";

export const ADEGAN_SAMA_BERAT: AdeganStory = {
  id: "sama-berat",
  judul: "Sama berat",
  sumber: "Materi: sama berat",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Sama berat"), kerangka(M0)),
      tambah(idx(SUARA_M1, "apel"), ...isiSisi(MA, "L"), labelSisi(MA, "L")),
      ubah(idx(SUARA_M1, "apel"), ...ubahTimbang(MA, { L: true })),
      tambah(idx(SUARA_M1, "jeruk"), ...isiSisi(MB, "R"), labelSisi(MB, "R")),
      ubah(idx(SUARA_M1, "jeruk"), ...ubahTimbang(MB, { L: true, R: true })),
    ),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "Kedua"), "tm1-bl"), tambah(idx(SUARA_M2, "sejajar."), teks("sj", 150, 52, "sejajar", 12, W.merah))),
    k(
      SUARA_M3,
      hapus(0, "sj"),
      redamkan(0, "tm1-bl"),
      sorotkan(idx(SUARA_M3, "Apel"), idBenda(1, "L", "apel", 1)),
      sorotkan(idx(SUARA_M3, "jeruk."), idBenda(1, "R", "jeruk", 1)),
      tambah(idx(SUARA_M3, "sebut"), ...kartu("sb", 90, 164, 120, 26, W.emas, ["sama berat"], 12)),
    ),
    k(
      SUARA_M4,
      redamkan(0, idBenda(1, "L", "apel", 1), idBenda(1, "R", "jeruk", 1)),
      hapus(idx(SUARA_M4, "Tetapi"), ...idKartu("sb")),
      tambah(idx(SUARA_M4, "Tetapi"), ...kartu("sc", 30, 164, 240, 26, W.emas, ["apel dan jeruk: sama berat"], 11)),
      tambah(idx(SUARA_M4, "tetap"), emo("ok", 150, 54, "✅", 24)),
    ),
    k(
      SUARA_M5,
      hapus(0, "ok", ...idKartu("sc")),
      tambah(idx(SUARA_M5, "anggur"), ...isiSisi(MC, "R").filter((o) => o.id.includes("anggur"))),
      ubah(idx(SUARA_M5, "anggur"), ...ubahTimbang(MC, { L: true, R: true })),
      tambah(idx(SUARA_M5, "turun."), ...penunjuk(MC)),
    ),
  ],
};

/* ------------------------------ 6. Gantungan baju ------------------------------ */
const G0 = KOSONG("gantung");
const GSa = spek(1, "gantung", ["semangka"], []);
const GA = spek(1, "gantung", ["semangka"], ["apel"]);
const GBa = spek(1, "gantung", ["anggur"], []);
const GB = spek(1, "gantung", ["anggur"], ["jeruk"]);
const SUARA_G1 = "Cara kedua memakai gantungan baju. Gantungan baju punya satu kait di tengah, dan benda digantung di kedua ujungnya.";
const SUARA_G2 = "Kita gantung semangka di ujung kiri dan apel di ujung kanan.";
const SUARA_G3 = "Ujung semangka turun, karena semangka lebih berat dari apel.";
const SUARA_G4 = "Gantungan baju bekerja seperti timbangan jungkat-jungkit. Benda yang lebih berat selalu turun.";
const SUARA_G5 = "Sekarang kita ganti isinya. Di kiri ada anggur dan di kanan ada jeruk.";
const SUARA_G6 = "Ujung jeruk turun, jadi jeruk lebih berat dari anggur. Anggur lebih ringan dari jeruk.";

export const ADEGAN_GANTUNGAN: AdeganStory = {
  id: "gantungan",
  judul: "Gantungan baju",
  sumber: "Materi: gantungan baju",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Gantungan baju")), tambah(idx(SUARA_G1, "gantungan"), kerangka(G0)), sorotkan(idx(SUARA_G1, "kait"), "tm1-kc")),
    k(
      SUARA_G2,
      redamkan(0, "tm1-kc"),
      tambah(idx(SUARA_G2, "semangka"), ...isiSisi(GSa, "L"), labelSisi(GSa, "L")),
      ubah(idx(SUARA_G2, "semangka"), ...ubahTimbang(GSa, { L: true })),
      tambah(idx(SUARA_G2, "apel"), ...isiSisi(GA, "R"), labelSisi(GA, "R")),
      ubah(idx(SUARA_G2, "apel"), ...ubahTimbang(GA, { L: true, R: true })),
    ),
    k(SUARA_G3, sorotkan(idx(SUARA_G3, "Ujung"), idBenda(1, "L", "semangka", 1)), tambah(idx(SUARA_G3, "turun,"), ...penunjuk(GA))),
    k(SUARA_G4, redamkan(0, idBenda(1, "L", "semangka", 1)), sorotkan(idx(SUARA_G4, "timbangan"), "tm1-bl"), tambah(idx(SUARA_G4, "selalu"), ...kartu("kb", 40, 150, 220, 30, W.emas, ["berat di bawah, ringan di atas"], 10))),
    k(
      SUARA_G5,
      redamkan(0, "tm1-bl"),
      hapus(idx(SUARA_G5, "ganti"), idBenda(1, "L", "semangka", 1), idBenda(1, "R", "apel", 1), "tm1-lbL", "tm1-lbR", ...idKartu("kb"), ...idPenunjuk(GA)),
      ubah(idx(SUARA_G5, "ganti"), ...ubahTimbang(G0)),
      tambah(idx(SUARA_G5, "anggur"), ...isiSisi(GBa, "L"), labelSisi(GBa, "L")),
      ubah(idx(SUARA_G5, "anggur"), ...ubahTimbang(GBa, { L: true })),
      tambah(idx(SUARA_G5, "jeruk."), ...isiSisi(GB, "R"), labelSisi(GB, "R")),
      ubah(idx(SUARA_G5, "jeruk."), ...ubahTimbang(GB, { L: true, R: true })),
      tambah(idx(SUARA_G5, "jeruk."), ...penunjuk(GB)),
    ),
    k(SUARA_G6, sorotkan(idx(SUARA_G6, "jeruk"), idBenda(1, "R", "jeruk", 1)), tambah(idx(SUARA_G6, "anggur", 2), ...kartu("kc", 40, 150, 220, 30, W.emas, ["jeruk berat, anggur ringan"], 10))),
  ],
};
