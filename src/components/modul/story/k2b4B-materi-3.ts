import type { AdeganStory } from "./logika-story";
import { W, hurufItem, item, judul, kartu, kodeDari, kodeTeks, kurungSatuan, tanda, tata } from "./k2b4B-gambar";
import { hapus, idx, k, munculHuruf, munculItem, tambah, urutKata } from "./k2b4B-bantu";

const T6 = tata(6, 20, 12);
const CY1 = 56;
const CY2 = 134;

/* ------------------------------ 8. Kode huruf ------------------------------ */
export const KODE_AB = ["merah", "biru", "merah", "biru"];
export const KODE_AAB = ["hati", "hati", "segitiga", "hati", "hati", "segitiga"];
const SUARA_H1 = "Pola dapat ditulis dengan huruf. Benda yang sama diberi huruf yang sama.";
const SUARA_H2 = "Merah kita beri huruf A. Biru kita beri huruf B.";
const SUARA_H3 = "Merah, biru, merah, biru ditulis A, B, A, B.";
const SUARA_H4 = "Sekarang barisan hati, hati, segitiga, hati, hati, segitiga.";
const SUARA_H5 = "Hati kita beri huruf A. Segitiga kita beri huruf B. Jadi kodenya A, A, B, A, A, B.";
const POS_H2 = urutKata(SUARA_H2, ["A", "B"]);
const POS_H3 = urutKata(SUARA_H3, KODE_AB, undefined);
const POS_H3H = urutKata(SUARA_H3, ["A", "B", "A", "B"], "ditulis");

export const ADEGAN_KODE_HURUF: AdeganStory = {
  id: "kode-huruf",
  judul: "Menulis pola dengan huruf",
  sumber: "Materi: kode huruf pola",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Kode huruf")), tambah(idx(SUARA_H1, "Benda"), ...kartu("hk", 40, 80, 220, 44, W.krem, ["benda sama", "huruf sama"], 11))),
    k(
      SUARA_H2,
      hapus(0, "hk-k", "hk-t0", "hk-t1"),
      tambah(idx(SUARA_H2, "Merah"), item("ba", 0, "merah", T6, CY1)),
      tambah(idx(SUARA_H2, "Biru"), item("ba", 1, "biru", T6, CY1)),
      tambah(POS_H2[0], hurufItem("ba", 0, "A", T6, CY1)),
      tambah(POS_H2[1], hurufItem("ba", 1, "B", T6, CY1)),
    ),
    k(
      SUARA_H3,
      tambah(POS_H3[2], item("ba", 2, "merah", T6, CY1)),
      tambah(POS_H3[3], item("ba", 3, "biru", T6, CY1)),
      tambah(POS_H3H[2], hurufItem("ba", 2, "A", T6, CY1)),
      tambah(POS_H3H[3], hurufItem("ba", 3, "B", T6, CY1), kodeTeks("ba", kodeDari(KODE_AB), 98)),
    ),
    k(SUARA_H4, ...munculItem(SUARA_H4, "bb", KODE_AAB, T6, CY2)),
    k(SUARA_H5, ...munculHuruf(SUARA_H5, "bb", KODE_AAB, T6, CY2, { setelah: "kodenya" }), tambah(SUARA_H5.split(/\s+/).length - 1, kodeTeks("bb", kodeDari(KODE_AAB), 176))),
  ],
};

/* ------------------------------ 9. Kode tiga jenis benda ------------------------------ */
export const KODE_ABC = ["lingkaran", "persegi", "segitiga", "lingkaran", "persegi", "segitiga"];
const CY_ABC = 70;
const SUARA_C1 = "Ada pola yang punya tiga jenis benda: lingkaran, persegi, segitiga, lingkaran, persegi, segitiga.";
const SUARA_C2 = "Lingkaran diberi huruf A, persegi huruf B, dan segitiga huruf C. Kodenya A, B, C, A, B, C.";
const SUARA_C3 = "Satuan polanya terdiri dari tiga benda. Ada dua satuan.";
const SUARA_C4 = "Jadi pola berkode A, B memakai dua benda yang berbeda. Pola berkode A, B, C memakai tiga benda yang berbeda.";

export const ADEGAN_KODE_ABC: AdeganStory = {
  id: "kode-abc",
  judul: "Pola dengan tiga jenis benda",
  sumber: "Materi: kode huruf tiga jenis",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Tiga jenis benda")), ...munculItem(SUARA_C1, "ba", KODE_ABC, T6, CY_ABC, { setelah: "benda:" })),
    k(SUARA_C2, ...munculHuruf(SUARA_C2, "ba", KODE_ABC, T6, CY_ABC, { setelah: "Kodenya" }), tambah(SUARA_C2.split(/\s+/).length - 1, kodeTeks("ba", kodeDari(KODE_ABC), 112))),
    k(SUARA_C3, tambah(idx(SUARA_C3, "Satuan"), kurungSatuan("ba", 0, 3, T6, CY_ABC)), tambah(idx(SUARA_C3, "dua"), kurungSatuan("ba", 1, 3, T6, CY_ABC))),
    k(SUARA_C4, tambah(idx(SUARA_C4, "Jadi"), ...kartu("k1", 20, 132, 124, 40, W.hijauMuda, ["dua benda", "A B"], 10.4), ...kartu("k2", 156, 132, 124, 40, W.pink, ["tiga benda", "A B C"], 10.4))),
  ],
};

/* ------------------------------ 10. Semua sama bukan pola ------------------------------ */
export const SAMA_ENAM = ["merah", "merah", "merah", "merah", "merah", "merah"];
export const BANDING = ["merah", "biru", "merah", "biru"];
const SUARA_N1 = "Tidak semua barisan adalah pola. Pola harus berulang dan teratur.";
const SUARA_N2 = "Lihat barisan ini: merah, merah, merah, merah, merah, merah.";
const SUARA_N3 = "Semuanya sama. Tidak ada yang berganti, jadi barisan ini bukan pola.";
const SUARA_N4 = "Bandingkan dengan merah, biru, merah, biru. Warnanya berganti dengan teratur, jadi itu pola.";

export const ADEGAN_BUKAN_SAMA: AdeganStory = {
  id: "bukan-sama",
  judul: "Semuanya sama: bukan pola",
  sumber: "Materi: barisan yang bukan pola",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Pola atau bukan?")), tambah(idx(SUARA_N1, "berulang"), ...kartu("pk", 40, 80, 220, 44, W.krem, ["berulang dan teratur"], 11))),
    k(SUARA_N2, hapus(0, "pk-k", "pk-t0"), ...munculItem(SUARA_N2, "ba", SAMA_ENAM, T6, CY1)),
    k(SUARA_N3, tambah(idx(SUARA_N3, "bukan"), tanda("ba", false, CY1))),
    k(SUARA_N4, ...munculItem(SUARA_N4, "bb", BANDING, T6, CY2, { setelah: "Bandingkan" }), tambah(idx(SUARA_N4, "itu"), tanda("bb", true, CY2))),
  ],
};

/* ------------------------------ 11. Urutan acak bukan pola ------------------------------ */
export const ACAK_ENAM = ["lingkaran", "segitiga", "segitiga", "lingkaran", "segitiga", "lingkaran"];
export const TERATUR_ENAM = ["lingkaran", "segitiga", "lingkaran", "segitiga", "lingkaran", "segitiga"];
const SUARA_R1 = "Barisan ini berganti-ganti, tetapi apakah teratur? Lihat: lingkaran, segitiga, segitiga, lingkaran, segitiga, lingkaran.";
const SUARA_R2 = "Kita cari bagian terkecil yang berulang. Ternyata tidak ada, karena urutannya acak.";
const SUARA_R3 = "Karena tidak teratur, barisan ini bukan pola.";
const SUARA_R4 = "Sekarang bandingkan: lingkaran, segitiga, lingkaran, segitiga, lingkaran, segitiga. Satuannya lingkaran dan segitiga, jadi ini pola.";

export const ADEGAN_BUKAN_ACAK: AdeganStory = {
  id: "bukan-acak",
  judul: "Urutan acak: bukan pola",
  sumber: "Materi: urutan acak bukan pola",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Teratur atau acak?")), ...munculItem(SUARA_R1, "ba", ACAK_ENAM, T6, CY1, { setelah: "Lihat:" })),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Ternyata"), ...kartu("sk", 60, 92, 180, 34, W.merahMuda, ["tidak ada satuan"], 11))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "bukan"), tanda("ba", false, CY1))),
    k(SUARA_R4, hapus(0, "sk-k", "sk-t0"), ...munculItem(SUARA_R4, "bb", TERATUR_ENAM, T6, CY2, { setelah: "bandingkan:" }), tambah(idx(SUARA_R4, "Satuannya"), kurungSatuan("bb", 0, 2, T6, CY2)), tambah(idx(SUARA_R4, "pola."), tanda("bb", true, CY2))),
  ],
};
