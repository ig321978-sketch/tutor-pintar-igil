import type { AdeganStory } from "./logika-story";
import { item, judul, kodeDari, kodeTeks, kurungSatuan, tanda, tata } from "./k2b4B-gambar";
import { hapus, idx, isiKosong, k, munculHuruf, munculItem, pilihKata, redamkan, sorotkan, tambah, urutKata } from "./k2b4B-bantu";

const akhir = (suara: string): number => suara.split(/\s+/).filter(Boolean).length - 1;

/* ------------------------------ 12. Melanjutkan pola ------------------------------ */
export const LANJUT_ISI = ["bintang", "bintang", "bunga", "bintang", "bintang", "bunga", "bintang", "bintang", "bunga"];
const T9 = tata(9, 20, 7);
const CY_L = 70;
const SUARA_J1 = "Sekarang kita belajar melanjutkan pola. Perhatikan: bintang, bintang, bunga, bintang, bintang, bunga, bintang, bintang.";
const SUARA_J2 = "Langkah pertama, cari satuan pola. Satuannya bintang, bintang, dan bunga.";
const SUARA_J3 = "Langkah kedua, lanjutkan dengan urutan yang sama. Setelah dua bintang, benda berikutnya bunga.";
const SUARA_J4 = "Langkah ketiga, periksa dari awal. Satuan kedua dan satuan ketiga sama dengan satuan pertama. Ada tiga satuan.";
const SUARA_J5 = "Dengan huruf, polanya A, A, B, A, A, B, A, A, B. Setelah A, A, B, A, A, B, A, A, yang berikutnya B.";

export const ADEGAN_LANJUT_CONTOH: AdeganStory = {
  id: "lanjut-contoh",
  judul: "Melanjutkan pola: tiga langkah",
  sumber: "Materi: melanjutkan pola",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Melanjutkan pola")), ...munculItem(SUARA_J1, "ba", LANJUT_ISI.slice(0, 8), T9, CY_L, { setelah: "Perhatikan:" })),
    k(SUARA_J2, tambah(idx(SUARA_J2, "Satuannya"), kurungSatuan("ba", 0, 3, T9, CY_L))),
    k(SUARA_J3, tambah(idx(SUARA_J3, "lanjutkan"), item("ba", 8, "kosong", T9, CY_L)), isiKosong(idx(SUARA_J3, "bunga"), "ba", 8, "bunga", T9, CY_L)),
    k(SUARA_J4, redamkan(0, "ba_8_bunga"), tambah(idx(SUARA_J4, "kedua"), kurungSatuan("ba", 1, 3, T9, CY_L)), tambah(idx(SUARA_J4, "ketiga"), kurungSatuan("ba", 2, 3, T9, CY_L))),
    k(SUARA_J5, ...munculHuruf(SUARA_J5, "ba", LANJUT_ISI, T9, CY_L, { setelah: "polanya" }), tambah(urutKata(SUARA_J5, ["B"], "yang")[0], kodeTeks("ba", kodeDari(LANJUT_ISI), 112))),
  ],
};

/* ------------------------------ 13. Melanjutkan pola warna dengan pilihan ------------------------------ */
export const LANJUT_WARNA = ["merah", "biru", "kuning", "merah", "biru", "kuning"];
const T6L = tata(6, 24, 10);
const CY_W = 66;
const SUARA_M1 = "Sekarang barisan berwarna: merah, biru, kuning, merah, biru, lalu ada kotak kosong.";
const SUARA_M2 = "Satuan polanya merah, biru, dan kuning. Satuannya terdiri dari tiga benda.";
const SUARA_M3 = "Warna apa yang cocok untuk kotak kosong? Ketuk jawabanmu.";
const SUARA_M4 = "Betul, kuning! Setelah merah dan biru, yang datang berikutnya kuning.";

export const ADEGAN_LANJUT_WARNA: AdeganStory = {
  id: "lanjut-warna",
  judul: "Melanjutkan pola warna",
  sumber: "Materi: melanjutkan pola warna",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Warna berikutnya")), ...munculItem(SUARA_M1, "ba", LANJUT_WARNA.slice(0, 5), T6L, CY_W, { setelah: "berwarna:" }), tambah(idx(SUARA_M1, "kotak"), item("ba", 5, "kosong", T6L, CY_W))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "Satuan"), kurungSatuan("ba", 0, 3, T6L, CY_W))),
    k(SUARA_M3, tambah(idx(SUARA_M3, "Ketuk"), ...pilihKata(126, ["merah", "kuning", "biru"], 11))),
    k(SUARA_M4, sorotkan(idx(SUARA_M4, "Betul"), "c2-k"), isiKosong(idx(SUARA_M4, "kuning", 2), "ba", 5, "kuning", T6L, CY_W)),
  ],
};

/* ------------------------------ 14. Mengisi bagian yang hilang ------------------------------ */
export const ISI_HILANG = ["lingkaran", "persegi", "lingkaran", "persegi", "lingkaran", "persegi"];
const T6H = tata(6, 24, 10);
const CY_H = 80;
const SUARA_I1 = "Kadang ada bagian yang hilang di tengah barisan: lingkaran, persegi, lingkaran, lalu kotak kosong, lalu lingkaran, persegi.";
const SUARA_I2 = "Cari satuan polanya dari bagian yang ada. Satuannya lingkaran dan persegi.";
const SUARA_I3 = "Setelah lingkaran, benda berikutnya persegi. Jadi kotak kosong itu persegi.";
const SUARA_I4 = "Periksa lagi: lingkaran, persegi, lingkaran, persegi, lingkaran, persegi. Barisannya sudah lengkap.";
const POS_I1 = urutKata(SUARA_I1, ["lingkaran", "persegi", "lingkaran"], "tengah");
const POS_I1B = urutKata(SUARA_I1, ["lingkaran", "persegi"], "kosong,");
const POS_I4 = urutKata(SUARA_I4, ISI_HILANG, "lagi:");

export const ADEGAN_ISI_HILANG: AdeganStory = {
  id: "isi-hilang",
  judul: "Mengisi bagian yang hilang",
  sumber: "Materi: mengisi bagian yang hilang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Bagian yang hilang")),
      ...[0, 1, 2].map((i) => tambah(POS_I1[i], item("ba", i, ISI_HILANG[i], T6H, CY_H))),
      tambah(idx(SUARA_I1, "kotak"), item("ba", 3, "kosong", T6H, CY_H)),
      ...[4, 5].map((i, q) => tambah(POS_I1B[q], item("ba", i, ISI_HILANG[i], T6H, CY_H))),
    ),
    k(SUARA_I2, tambah(idx(SUARA_I2, "Satuannya"), kurungSatuan("ba", 0, 2, T6H, CY_H))),
    k(SUARA_I3, isiKosong(idx(SUARA_I3, "persegi", 2), "ba", 3, "persegi", T6H, CY_H)),
    k(SUARA_I4, redamkan(0, "ba_3_persegi"), tambah(POS_I4[2], kurungSatuan("ba", 1, 2, T6H, CY_H)), tambah(POS_I4[4], kurungSatuan("ba", 2, 2, T6H, CY_H)), tambah(idx(SUARA_I4, "lengkap"), tanda("ba", true, CY_H))),
  ],
};

/* ------------------------------ 15. Merancang pola sendiri ------------------------------ */
export const RANCANG = ["bintang", "bunga", "bunga", "bintang", "bunga", "bunga", "bintang", "bunga", "bunga"];
const T2 = tata(2, 26, 30);
const CY_B = 70;
const SUARA_B1 = "Sekarang kamu bisa merancang pola sendiri. Wei memilih dua benda: bintang dan bunga.";
const SUARA_B2 = "Langkah pertama, pilih satuan pola yang pendek. Wei memilih bintang, bunga, dan bunga.";
const SUARA_B3 = "Langkah kedua, ulangi satuan itu sampai barisan penuh: bintang, bunga, bunga, bintang, bunga, bunga, bintang, bunga, bunga.";
const SUARA_B4 = "Langkah ketiga, periksa. Satuannya berulang dan teratur, jadi ini pola rancangan Wei.";
const SUARA_B5 = "Kode pola Wei adalah A, B, B, A, B, B, A, B, B.";

export const ADEGAN_RANCANG_POLA: AdeganStory = {
  id: "rancang-pola",
  judul: "Merancang pola sendiri",
  sumber: "Materi: merancang pola sendiri",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Pola buatan sendiri")), ...munculItem(SUARA_B1, "lg", ["bintang", "bunga"], T2, 96, { setelah: "benda:" })),
    k(SUARA_B2, hapus(0, "lg_0_bintang", "lg_1_bunga"), ...munculItem(SUARA_B2, "ba", RANCANG.slice(0, 3), tata(9, 20, 7), CY_B, { setelah: "memilih" }), tambah(idx(SUARA_B2, "bunga", 2), kurungSatuan("ba", 0, 3, tata(9, 20, 7), CY_B))),
    k(SUARA_B3, ...munculItem(SUARA_B3, "ba", RANCANG, tata(9, 20, 7), CY_B, { dari: 3, setelah: "penuh:" })),
    k(SUARA_B4, tambah(idx(SUARA_B4, "periksa"), kurungSatuan("ba", 1, 3, tata(9, 20, 7), CY_B), kurungSatuan("ba", 2, 3, tata(9, 20, 7), CY_B)), tambah(idx(SUARA_B4, "pola"), tanda("ba", true, CY_B, 284))),
    k(SUARA_B5, ...munculHuruf(SUARA_B5, "ba", RANCANG, tata(9, 20, 7), CY_B, { setelah: "adalah" }), tambah(akhir(SUARA_B5), kodeTeks("ba", kodeDari(RANCANG), 112))),
  ],
};
