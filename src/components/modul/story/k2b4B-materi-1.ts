import type { AdeganStory } from "./logika-story";
import { W, item, judul, kartu, kurungSatuan, teks, tata, xPusat } from "./k2b4B-gambar";
import { hapus, idx, k, munculItem, redamkan, sorotkan, tambah, urutKata } from "./k2b4B-bantu";

/* ------------------------------ 1. Enam anak berbaris: warna topi ------------------------------ */
const NAMA = ["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"];
export const TOPI = ["merah", "biru", "merah", "biru", "merah", "biru"];
const T_ARTI = tata(7, 22, 16);
const CY_ARTI = 70;
const SUARA_A1 = "Malosi, Kira, Upe, Wei, Halim, dan Igil berbaris. Mereka semua memakai topi.";
const SUARA_A2 = "Malosi memakai topi merah, Kira topi biru, Upe topi merah, Wei topi biru, Halim topi merah, dan Igil topi biru.";
const SUARA_A3 = "Lihat warna topinya: merah, biru, merah, biru, merah, biru. Warnanya berganti dengan teratur.";
const SUARA_A4 = "Barisan yang berulang dan teratur seperti ini disebut pola.";
const SUARA_A5 = "Setelah topi biru yang terakhir, benda berikutnya pasti merah lagi.";
const POS_A1 = urutKata(SUARA_A1, NAMA);
const POS_A3 = urutKata(SUARA_A3, TOPI, "topinya:");
const namaObj = (i: number) => teks(`nm${i}`, xPusat(T_ARTI, i), CY_ARTI + 28, NAMA[i], 8.4, W.ungu, { z: 3 });

export const ADEGAN_POLA_ARTI: AdeganStory = {
  id: "pola-arti",
  judul: "Enam anak berbaris dengan pola topi",
  sumber: "Materi: pola berulang dan teratur",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Barisan enam anak")), ...NAMA.map((_, i) => tambah(POS_A1[i], namaObj(i)))),
    k(SUARA_A2, ...munculItem(SUARA_A2, "ba", TOPI, T_ARTI, CY_ARTI)),
    k(
      SUARA_A3,
      ...TOPI.map((s, i) => sorotkan(POS_A3[i], `ba_${i}_${s}`)),
      ...TOPI.slice(0, -1).map((s, i) => redamkan(POS_A3[i + 1], `ba_${i}_${s}`)),
    ),
    k(SUARA_A4, redamkan(0, "ba_5_biru"), tambah(idx(SUARA_A4, "pola."), ...kartu("pk", 40, 134, 220, 40, W.emas, ["Pola: berulang dan teratur"], 11))),
    k(SUARA_A5, tambah(idx(SUARA_A5, "merah"), item("ba", 6, "merah", T_ARTI, CY_ARTI, { sorot: true }))),
  ],
};

/* ------------------------------ 2. Satuan pola ------------------------------ */
export const SATUAN_DUA = ["merah", "biru", "merah", "biru", "merah", "biru"];
const T_SAT = tata(7, 22, 10);
const CY_SAT = 84;
const SUARA_S1 = "Setiap pola punya satuan pola. Satuan pola adalah bagian terkecil yang berulang.";
const SUARA_S2 = "Perhatikan barisan ini: merah, biru, merah, biru, merah, biru.";
const SUARA_S3 = "Bagian terkecil yang berulang adalah merah dan biru. Satuannya terdiri dari dua benda.";
const SUARA_S4 = "Satuan yang sama muncul lagi dan lagi. Ada tiga satuan.";
const SUARA_S5 = "Karena satuannya sudah jelas, kita tahu lanjutannya. Setelah biru, benda berikutnya pasti merah.";

export const ADEGAN_POLA_SATUAN: AdeganStory = {
  id: "pola-satuan",
  judul: "Satuan pola: bagian terkecil yang berulang",
  sumber: "Materi: satuan pola",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Satuan pola")), tambah(idx(SUARA_S1, "terkecil"), ...kartu("sk", 40, 100, 220, 44, W.krem, ["bagian terkecil", "yang berulang"], 10.4))),
    k(SUARA_S2, hapus(0, "sk-k", "sk-t0", "sk-t1"), ...munculItem(SUARA_S2, "ba", SATUAN_DUA, T_SAT, CY_SAT)),
    k(SUARA_S3, tambah(idx(SUARA_S3, "merah"), kurungSatuan("ba", 0, 2, T_SAT, CY_SAT))),
    k(SUARA_S4, tambah(idx(SUARA_S4, "lagi", 1), kurungSatuan("ba", 1, 2, T_SAT, CY_SAT)), tambah(idx(SUARA_S4, "lagi", 2), kurungSatuan("ba", 2, 2, T_SAT, CY_SAT))),
    k(SUARA_S5, tambah(idx(SUARA_S5, "merah"), item("ba", 6, "merah", T_SAT, CY_SAT, { sorot: true }))),
  ],
};

/* ------------------------------ 3. Satuan pola tiga benda ------------------------------ */
export const SATUAN_TIGA = ["hati", "hati", "segitiga", "hati", "hati", "segitiga", "hati", "hati", "segitiga"];
const T_TIGA = tata(9, 20, 7);
const CY_TIGA = 84;
const SUARA_T1 = "Sekarang barisan yang lain: hati, hati, segitiga, hati, hati, segitiga, hati, hati, segitiga.";
const SUARA_T2 = "Cari bagian terkecil yang berulang. Satuannya hati, hati, dan segitiga. Satuannya terdiri dari tiga benda.";
const SUARA_T3 = "Satuan yang sama muncul dua lagi. Ada tiga satuan.";
const SUARA_T4 = "Satuan ini lebih panjang daripada satuan merah dan biru tadi.";

export const ADEGAN_SATUAN_TIGA: AdeganStory = {
  id: "satuan-tiga",
  judul: "Satuan pola yang terdiri dari tiga benda",
  sumber: "Materi: satuan pola tiga benda",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Barisan bentuk")), ...munculItem(SUARA_T1, "ba", SATUAN_TIGA, T_TIGA, CY_TIGA)),
    k(SUARA_T2, tambah(idx(SUARA_T2, "Satuannya"), kurungSatuan("ba", 0, 3, T_TIGA, CY_TIGA))),
    k(SUARA_T3, tambah(idx(SUARA_T3, "muncul"), kurungSatuan("ba", 1, 3, T_TIGA, CY_TIGA)), tambah(idx(SUARA_T3, "lagi"), kurungSatuan("ba", 2, 3, T_TIGA, CY_TIGA))),
    k(SUARA_T4, tambah(idx(SUARA_T4, "panjang"), ...kartu("sk", 30, 130, 240, 44, W.krem, ["satuan pola", "hati, hati, segitiga"], 10.4))),
  ],
};
