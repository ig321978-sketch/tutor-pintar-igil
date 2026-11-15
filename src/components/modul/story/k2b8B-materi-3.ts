import type { AdeganStory } from "./logika-story";
import { BUAH, BUNGA, KUE, W, diagram, judul, kartu, teks, turus } from "./k2b8B-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah } from "./k2b8B-bantu";

/* ------------------------------ 11. Diagram gambar bunga ------------------------------ */
export const DG = diagram("bg", BUNGA, "Rangkaian Bunga Wei", "bunga");
const SUARA_B1 = "Wei sedang merangkai bunga. Ada mawar, lili, tulip, dan aster di dalam rangkaian.";
const SUARA_B2 = "Kita hitung banyak tiap jenis bunga dengan teliti. Satu hati mewakili satu bunga.";
const SUARA_B3 = "Mawar ada tujuh, jadi tujuh hati merah. Lili ada empat, jadi empat hati ungu.";
const SUARA_B4 = "Tulip ada lima, jadi lima hati jingga. Aster ada empat, jadi empat hati biru.";
const SUARA_B5 = "Mudah melihat yang paling banyak. Mawar paling banyak, karena barisnya paling panjang.";
const NAMA_AT = ["mawar,", "lili,", "tulip,", "aster"];

export const ADEGAN_DIAGRAM_BUNGA: AdeganStory = {
  id: "diagram-bunga",
  judul: "Diagram gambar bunga",
  sumber: "Materi: membuat diagram gambar",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Rangkaian bunga")),
      ...BUNGA.flatMap((d, c) => [tambah(NAMA_AT[c], teks(`bh${c}`, 40 + c * 73, 100, d.g, 34, d.warna), teks(`bm${c}`, 40 + c * 73, 126, d.nama, 10))]),
    ),
    k(SUARA_B2, bersih(0), tambah(0, ...DG.dasar), tambah("jenis", ...DG.idLabel.map((_, c) => DG.label(c)))),
    k(SUARA_B3, tambah(idx(SUARA_B3, "tujuh", 2), ...DG.gambar(0), DG.angka(0)), tambah(idx(SUARA_B3, "empat", 2), ...DG.gambar(1), DG.angka(1))),
    k(SUARA_B4, tambah(idx(SUARA_B4, "lima", 2), ...DG.gambar(2), DG.angka(2)), tambah(idx(SUARA_B4, "empat", 2), ...DG.gambar(3), DG.angka(3))),
    k(SUARA_B5, sorotkan("Mawar", ...DG.idGambar(0))),
  ],
};

/* ------------------------------ 12. Sama banyak, lebihnya, kurangnya ------------------------------ */
const SUARA_S1 = "Lihat baris lili dan baris aster.";
const SUARA_S2 = "Lili ada empat hati. Aster ada empat hati. Lili dan aster sama banyak.";
const SUARA_S3 = "Kalau dua baris sama panjang, berarti jumlahnya sama banyak.";
const SUARA_S4 = "Sekarang tulip dan lili. Tulip lebih banyak satu dari lili. Lili lebih sedikit satu dari tulip.";
const SUARA_S5 = "Sekarang mawar dan aster. Mawar lebih banyak tiga dari aster. Aster kurang tiga dari mawar.";

export const ADEGAN_SAMA_BANYAK: AdeganStory = {
  id: "sama-banyak",
  judul: "Sama banyak, lebihnya, kurangnya",
  sumber: "Materi: sama banyak dan selisih",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, ...DG.semua, ...BUNGA.map((_, c) => DG.angka(c)))),
    k(SUARA_S2, sorotkan("Lili", ...DG.idGambar(1)), redamkan("Aster", ...DG.idGambar(1)), sorotkan("Aster", ...DG.idGambar(3)), sorotkan("sama", ...DG.idGambar(1))),
    k(SUARA_S3, redamkan(0, ...DG.idGambar(1), ...DG.idGambar(3)), tambah("Kalau", ...kartu("sb", 30, 156, 240, 22, W.emas, ["sama panjang = sama banyak"], 10))),
    k(SUARA_S4, hapus(0, "sb-k", "sb-t0"), sorotkan("tulip", "bgg2_4"), tambah("lebih", ...kartu("sl", 200, 30, 96, 22, W.emas, ["selisih: 1"], 10))),
    k(SUARA_S5, redamkan(0, "bgg2_4"), hapus(0, "sl-k", "sl-t0"), sorotkan("mawar", "bgg0_4", "bgg0_5", "bgg0_6"), tambah("lebih", ...kartu("sm", 200, 30, 96, 22, W.emas, ["selisih: 3"], 10))),
  ],
};

/* ------------------------------ 13. Dari turus ke gambar ------------------------------ */
const JERUK = [BUAH[1]];
const TJ = turus("tj", JERUK, "Dari turus ke gambar", { y0: 62 });
const TD = diagram("tg", JERUK, "", "buah", { y0: 128, ketY: 184 });
const SUARA_G1 = "Data yang sama bisa disajikan dengan turus, dan dengan gambar. Kita lihat jeruk.";
const SUARA_G2 = "Jeruk ada enam. Pada turus, setiap jeruk diberi goresan. Satu, dua, tiga, empat, lima, enam.";
const SUARA_G3 = "Empat garis tegak dan satu garis miring jadi satu ikat lima. Garis keenam berdiri sendiri.";
const SUARA_G4 = "Sekarang kita buat dengan bintang. Satu bintang untuk satu jeruk. Satu, dua, tiga, empat, lima, enam bintang jingga.";
const SUARA_G5 = "Satu ikat lima dan satu garis sama dengan enam bintang. Banyaknya sama.";
const SUARA_G6 = "Turus dan diagram gambar memuat data yang sama. Hanya bentuk penyajiannya yang berbeda.";

export const ADEGAN_TURUS_KE_GAMBAR: AdeganStory = {
  id: "turus-ke-gambar",
  judul: "Dari turus ke diagram gambar",
  sumber: "Materi: turus dan diagram gambar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, TJ.jd), tambah("jeruk.", TJ.label(0))),
    k(SUARA_G2, ...hitungAksi(SUARA_G2, TJ.goresan(0), { setelah: "Jeruk" }), tambah(idx(SUARA_G2, "enam", 2), TJ.angka(0))),
    k(SUARA_G3, sorotkan("Empat", "tjs0_0", "tjs0_1", "tjs0_2", "tjs0_3"), sorotkan("miring", "tjs0_4"), redamkan("ikat", "tjs0_0", "tjs0_1", "tjs0_2", "tjs0_3", "tjs0_4"), sorotkan("keenam", "tjs0_5")),
    k(SUARA_G4, redamkan(0, "tjs0_5"), tambah(idx(SUARA_G4, "jeruk"), TD.label(0)), ...hitungAksi(SUARA_G4, TD.gambar(0), { setelah: "jeruk." }), tambah(idx(SUARA_G4, "enam"), TD.angka(0), TD.ket)),
    k(
      SUARA_G5,
      sorotkan("Satu", "tjs0_0", "tjs0_1", "tjs0_2", "tjs0_3", "tjs0_4", "tjs0_5"),
      tambah("sama", teks("ik", 262, 100, "5 + 1 = 6", 12, W.coklat)),
      sorotkan("enam", ...TD.idGambar(0)),
    ),
    k(SUARA_G6, redamkan(0, "tjs0_0", "tjs0_1", "tjs0_2", "tjs0_3", "tjs0_4", "tjs0_5", ...TD.idGambar(0)), tambah("Turus", ...kartu("tk", 100, 154, 190, 20, W.hijauMuda, ["data sama, bentuk berbeda"], 9))),
  ],
};

/* ------------------------------ 14. Kira mencatat kue dengan turus ------------------------------ */
const KT = turus("kt", KUE, "Kue Kesukaan");
const SUARA_K1 = "Kira mencatat kue kesukaan. Jawaban yang muncul di layar dicatat dengan turus.";
const SUARA_K2 = "Cucur ada enam. Satu, dua, tiga, empat, lima, enam. Goresan kelima miring.";
const SUARA_K3 = "Onde-onde ada lima. Satu, dua, tiga, empat, lima.";
const SUARA_K4 = "Lemper ada tiga. Satu, dua, tiga.";
const SUARA_K5 = "Kue talam ada tujuh. Satu, dua, tiga, empat, lima, enam, tujuh. Satu ikat lima, dan dua garis lagi.";

export const ADEGAN_DATA_KUE: AdeganStory = {
  id: "data-kue",
  judul: "Kira mencatat kue kesukaan",
  sumber: "Materi: mencatat data dengan turus",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_K1, tambah(0, KT.jd), tambah("turus.", KT.label(0), KT.label(1), KT.label(2), KT.label(3))),
    k(SUARA_K2, ...hitungAksi(SUARA_K2, KT.goresan(0), { setelah: "Cucur" }), tambah(idx(SUARA_K2, "enam", 2), KT.angka(0)), sorotkan("miring.", "kts0_4")),
    k(SUARA_K3, redamkan(0, "kts0_4"), ...hitungAksi(SUARA_K3, KT.goresan(1), { setelah: "Onde-onde" }), tambah(idx(SUARA_K3, "lima", 2), KT.angka(1))),
    k(SUARA_K4, ...hitungAksi(SUARA_K4, KT.goresan(2), { setelah: "Lemper" }), tambah(idx(SUARA_K4, "tiga", 2), KT.angka(2))),
    k(SUARA_K5, ...hitungAksi(SUARA_K5, KT.goresan(3), { setelah: "talam" }), tambah(idx(SUARA_K5, "tujuh", 2), KT.angka(3)), sorotkan("ikat", "kts3_4")),
  ],
};

/* ------------------------------ 15. Diagram gambar kue ------------------------------ */
const DK = diagram("dk", KUE, "Kue Kesukaan", "anak");
const SUARA_C1 = "Sekarang turus kue kita ubah menjadi diagram gambar. Satu lingkaran untuk satu anak.";
const SUARA_C2 = "Cucur ada enam, jadi enam lingkaran. Onde-onde ada lima, jadi lima lingkaran.";
const SUARA_C3 = "Lemper ada tiga, jadi tiga lingkaran. Kue talam ada tujuh, jadi tujuh lingkaran.";
const SUARA_C4 = "Sekarang kita baca diagramnya. Talam paling banyak, tujuh anak. Lemper paling sedikit, tiga anak.";
const SUARA_C5 = "Cucur lebih banyak satu dari onde-onde. Talam lebih banyak empat dari lemper.";

export const ADEGAN_DIAGRAM_KUE: AdeganStory = {
  id: "diagram-kue",
  judul: "Diagram gambar kue kesukaan",
  sumber: "Materi: diagram gambar dari turus",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_C1, tambah(0, ...DK.dasar)),
    k(
      SUARA_C2,
      tambah("Cucur", DK.label(0)),
      tambah(idx(SUARA_C2, "enam", 2), ...DK.gambar(0), DK.angka(0)),
      tambah(idx(SUARA_C2, "Onde-onde"), DK.label(1)),
      tambah(idx(SUARA_C2, "lima", 2), ...DK.gambar(1), DK.angka(1)),
    ),
    k(SUARA_C3, tambah("Lemper", DK.label(2)), tambah(idx(SUARA_C3, "tiga", 2), ...DK.gambar(2), DK.angka(2)), tambah("talam", DK.label(3)), tambah(idx(SUARA_C3, "tujuh", 2), ...DK.gambar(3), DK.angka(3))),
    k(SUARA_C4, sorotkan("Talam", ...DK.idGambar(3)), redamkan("Lemper", ...DK.idGambar(3)), sorotkan("Lemper", ...DK.idGambar(2))),
    k(SUARA_C5, redamkan(0, ...DK.idGambar(2)), sorotkan("Cucur", "dkg0_5"), sorotkan("Talam", "dkg3_3", "dkg3_4", "dkg3_5", "dkg3_6")),
  ],
};
