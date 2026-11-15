import type { AdeganStory } from "./logika-story";
import { W, anak, bagianKotak, bagianLingkaran, emo, garisPotong, idBagian, judul, kartu, labelBagian } from "./k2b5C-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah } from "./k2b5C-bantu";

/* ------------------------------ 2. Kira punya satu martabak ------------------------------ */
const KIRA_URUT = ["kira", "malosi", "upe", "wei"];
const KIRA_X = [50, 117, 184, 251];
const KIRA_Y = 138;
const MARTABAK_KECIL = bagianLingkaran("m", 150, 62, 32, [360]);

const SUARA_C1 = "Kira punya satu martabak manis yang harum. Martabak itu masih utuh dan belum dipotong.";
const SUARA_C2 = "Kira ingin makan bersama Malosi, Upe, dan Wei.";
const SUARA_C3 = "Jadi, ada empat anak yang akan makan martabak.";
const SUARA_C4 = "Martabak harus dibagi dengan adil. Tiap anak mendapat bagian yang sama besar.";
const SUARA_C5 = "Ayo kita bantu Kira. Kita buat dua garis potong di layar.";

export const ADEGAN_CERITA_MARTABAK: AdeganStory = {
  id: "cerita-martabak",
  judul: "Kira punya satu martabak",
  sumber: "Materi: martabak untuk empat anak",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Satu martabak")),
      tambah(idx(SUARA_C1, "martabak"), ...MARTABAK_KECIL),
      tambah(idx(SUARA_C1, "utuh."), ...labelBagian(MARTABAK_KECIL, "utuh", 9)),
    ),
    k(
      SUARA_C2,
      tambah(idx(SUARA_C2, "Kira"), ...anak("kira", KIRA_X[0], KIRA_Y)),
      tambah(idx(SUARA_C2, "Malosi,"), ...anak("malosi", KIRA_X[1], KIRA_Y)),
      tambah(idx(SUARA_C2, "Upe,"), ...anak("upe", KIRA_X[2], KIRA_Y)),
      tambah(idx(SUARA_C2, "Wei."), ...anak("wei", KIRA_X[3], KIRA_Y)),
    ),
    k(SUARA_C3, sorotkan(idx(SUARA_C3, "empat"), ...KIRA_URUT.map((s) => `ob-${s}`)), tambah(idx(SUARA_C3, "anak"), emo("ok4", 150, 126, "\u{1F60B}", 18))),
    k(
      SUARA_C4,
      redamkan(0, ...KIRA_URUT.map((s) => `ob-${s}`)),
      hapus(0, "ok4"),
      tambah(idx(SUARA_C4, "adil."), ...kartu("ad", 70, 98, 160, 22, W.krem, ["adil berarti sama besar"], 9)),
    ),
    k(
      SUARA_C5,
      tambah(idx(SUARA_C5, "garis"), garisPotong("gp1", 150, 28, 0, 68), garisPotong("gp2", 116, 62, 68, 0)),
    ),
  ],
};

/* ------------------------------ 3. Empat bagian sama besar ------------------------------ */
const M_UTUH = bagianLingkaran("m", 150, 100, 62, [360]);
const M_DUA = bagianLingkaran("m", 150, 100, 62, [180, 180]);
const M_EMPAT = bagianLingkaran("m", 150, 100, 62, [90, 90, 90, 90]);

const SUARA_E1 = "Perhatikan martabak ini. Kita akan memotongnya dengan dua garis lewat tengah.";
const SUARA_E2 = "Potong pertama memakai garis tegak. Sekarang ada dua bagian yang sama besar.";
const SUARA_E3 = "Potong kedua memakai garis mendatar. Sekarang ada empat bagian yang sama besar.";
const SUARA_E4 = "Setiap bagian dari martabak itu disebut seperempat, atau satu dari empat bagian yang sama besar.";
const SUARA_E5 = "Satu martabak utuh menjadi empat seperempat. Tiap anak mendapat satu seperempat.";

export const ADEGAN_EMPAT_SAMA: AdeganStory = {
  id: "empat-sama",
  judul: "Empat bagian sama besar",
  sumber: "Materi: empat bagian sama besar",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Potong dua kali")), tambah(idx(SUARA_E1, "martabak"), ...M_UTUH)),
    k(
      SUARA_E2,
      tambah(idx(SUARA_E2, "garis"), garisPotong("gp1", 150, 34, 0, 132)),
      hapus(idx(SUARA_E2, "dua"), ...idBagian("m", 1)),
      tambah(idx(SUARA_E2, "dua"), ...M_DUA),
      tambah(idx(SUARA_E2, "besar."), ...labelBagian(M_DUA, "1/2", 11)),
    ),
    k(
      SUARA_E3,
      tambah(idx(SUARA_E3, "garis"), garisPotong("gp2", 84, 100, 132, 0)),
      hapus(idx(SUARA_E3, "empat"), ...idBagian("m", 2, true)),
      tambah(idx(SUARA_E3, "empat"), ...M_EMPAT),
    ),
    k(
      SUARA_E4,
      tambah(idx(SUARA_E4, "Setiap"), ...labelBagian(M_EMPAT, "1/4", 11)),
      sorotkan(idx(SUARA_E4, "seperempat."), "pc-m-1"),
    ),
    k(
      SUARA_E5,
      redamkan(0, "pc-m-1"),
      sorotkan(idx(SUARA_E5, "empat", 1), ...idBagian("m", 4)),
      tambah(idx(SUARA_E5, "Tiap"), emo("ok", 150, 192, "\u{1F60B}", 20)),
    ),
  ],
};

/* ------------------------------ 4. Bagian yang tidak sama besar ------------------------------ */
const A_TAK = bagianLingkaran("a", 78, 92, 52, [60, 120, 60, 120]);
const B_TAK = bagianKotak("b", 168, 42, 100, 100, "tak4");

const SUARA_T1 = "Kira memotong martabak menjadi empat bagian. Tetapi bagiannya tidak sama besar.";
const SUARA_T2 = "Ada bagian yang besar dan ada bagian yang kecil. Ini bukan seperempat.";
const SUARA_T3 = "Kue bolu juga bisa dipotong menjadi empat bagian yang tidak sama besar.";
const SUARA_T4 = "Bagian yang tidak sama besar bukan seperempat, walau jumlahnya empat.";
const SUARA_T5 = "Seperempat harus empat bagian dan harus sama besar.";

export const ADEGAN_TIDAK_SAMA: AdeganStory = {
  id: "tidak-sama",
  judul: "Bagian yang tidak sama besar",
  sumber: "Materi: bagian tidak sama besar",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Harus sama besar")), tambah(idx(SUARA_T1, "martabak"), ...A_TAK)),
    k(
      SUARA_T2,
      sorotkan(idx(SUARA_T2, "besar"), "pc-a-2"),
      redamkan(idx(SUARA_T2, "kecil"), "pc-a-2"),
      sorotkan(idx(SUARA_T2, "kecil"), "pc-a-1"),
      tambah(idx(SUARA_T2, "bukan"), emo("x1", 78, 164, "❌", 20)),
    ),
    k(SUARA_T3, redamkan(0, "pc-a-1"), tambah(idx(SUARA_T3, "bolu"), ...B_TAK)),
    k(
      SUARA_T4,
      sorotkan(idx(SUARA_T4, "bukan"), "pc-b-1"),
      tambah(idx(SUARA_T4, "walau"), emo("x2", 218, 164, "❌", 20)),
    ),
    k(
      SUARA_T5,
      { at: 0, bersih: true },
      tambah(0, judul("Dua syarat seperempat")),
      tambah(idx(SUARA_T5, "empat"), ...kartu("sy0", 14, 64, 130, 44, W.hijauMuda, ["empat bagian"], 11)),
      tambah(idx(SUARA_T5, "sama"), ...kartu("sy1", 156, 64, 130, 44, W.pink, ["sama besar"], 11)),
      tambah(idx(SUARA_T5, "besar."), emo("ok", 150, 150, "✅", 32)),
    ),
  ],
};

/* ------------------------------ 5. Tiga pertanyaan pemeriksa ------------------------------ */
const P_EMPAT = bagianKotak("b", 24, 44, 100, 100, "empat");

const SUARA_P1 = "Ada tiga pertanyaan untuk memeriksa seperempat. Kita coba pada kue bolu ini.";
const SUARA_P2 = "Pertama, apakah bolu dibagi menjadi empat bagian? Ya, ada empat bagian.";
const SUARA_P3 = "Kedua, apakah keempat bagian sama besar? Ya, semuanya sama besar.";
const SUARA_P4 = "Ketiga, apa nama satu bagian ini? Satu bagian ini adalah seperempat.";
const SUARA_P5 = "Kalau ketiganya dijawab ya, bagian itu pasti seperempat.";

export const ADEGAN_TIGA_PERIKSA: AdeganStory = {
  id: "tiga-periksa",
  judul: "Tiga pertanyaan pemeriksa",
  sumber: "Materi: tiga pertanyaan pemeriksa",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Tiga pertanyaan")), tambah(idx(SUARA_P1, "bolu"), ...P_EMPAT)),
    k(
      SUARA_P2,
      tambah(idx(SUARA_P2, "Pertama,"), ...kartu("q1", 140, 40, 152, 36, W.hijauMuda, ["dibagi empat bagian?"], 9.2)),
      tambah(idx(SUARA_P2, "Ya,"), emo("v1", 278, 63, "✅", 16)),
    ),
    k(
      SUARA_P3,
      tambah(idx(SUARA_P3, "Kedua,"), ...kartu("q2", 140, 84, 152, 36, W.pink, ["keempat sama besar?"], 9.2)),
      tambah(idx(SUARA_P3, "Ya,"), emo("v2", 278, 107, "✅", 16)),
    ),
    k(
      SUARA_P4,
      tambah(idx(SUARA_P4, "Ketiga,"), ...kartu("q3", 140, 128, 152, 36, W.langit, ["satu bagian: seperempat"], 9.2)),
      sorotkan(idx(SUARA_P4, "Satu"), "pc-b-1"),
      tambah(idx(SUARA_P4, "adalah"), emo("v3", 278, 151, "✅", 16)),
    ),
    k(SUARA_P5, tambah(idx(SUARA_P5, "pasti"), emo("bn", 74, 176, "\u{1F389}", 24))),
  ],
};

/* ------------------------------ 4b. Tiga bagian sama besar bukan seperempat ------------------------------ */
const TG_TIGA = bagianLingkaran("tg", 150, 92, 50, [120, 120, 120]);
const TG_EMPAT = bagianLingkaran("tg", 150, 92, 50, [90, 90, 90, 90]);

const SUARA_G1 = "Sekarang Upe membagi sebuah kue bolu bulat menjadi tiga bagian yang sama besar.";
const SUARA_G2 = "Ketiga bagiannya sama besar. Tetapi, apakah satu bagian ini sudah seperempat?";
const SUARA_G3 = "Satu bagian ini bukan seperempat, sebab kue bolu hanya dibagi menjadi tiga bagian.";
const SUARA_G4 = "Kalau mau seperempat, bagi kue bolu menjadi empat bagian yang sama besar.";
const SUARA_G5 = "Sekarang satu bagian ini seperempat, sebab ada empat bagian yang sama besar.";

export const ADEGAN_TIGA_BAGIAN: AdeganStory = {
  id: "tiga-bagian",
  judul: "Tiga bagian bukan seperempat",
  sumber: "Materi: tiga bagian bukan seperempat",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Jumlah bagiannya")), tambah(idx(SUARA_G1, "bolu"), ...TG_TIGA)),
    k(SUARA_G2, sorotkan(idx(SUARA_G2, "satu"), "pc-tg-1")),
    k(SUARA_G3, tambah(idx(SUARA_G3, "bukan"), emo("x", 150, 162, "❌", 22))),
    k(
      SUARA_G4,
      hapus(0, "x", ...idBagian("tg", 3)),
      tambah(idx(SUARA_G4, "empat"), ...TG_EMPAT),
    ),
    k(SUARA_G5, sorotkan(idx(SUARA_G5, "satu"), "pc-tg-1"), tambah(idx(SUARA_G5, "seperempat,"), ...labelBagian([TG_EMPAT[0]], "1/4", 11), emo("ok", 150, 162, "✅", 22))),
  ],
};
