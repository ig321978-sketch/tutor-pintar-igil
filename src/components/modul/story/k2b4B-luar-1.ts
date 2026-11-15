import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, item, judul, kartu, kurungSatuan, tata } from "./k2b4B-gambar";
import { hapus, idx, isiKosong, k, munculItem, pilihKata, redamkan, sorotkan, tambah } from "./k2b4B-bantu";

export const NAMA_METODE_ID = ["Pola Berulang", "Pola AB dan ABC", "Buat Pola"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama kecil di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 20, 288, 14, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.2);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan pola dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Pola Berulang, Pola AB dan ABC, dan Buat Pola.";
const SUARA_O3 = "Pola Berulang memakai satuan pola untuk melanjutkan barisan. Pola AB dan ABC mengenali jenis satuan pola. Buat Pola mengajak kita merancang pola sendiri.";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk dan memilih jawaban dengan teliti.";
const SUARA_O5 = "Siap? Ayo kita mulai dengan metode pertama, yaitu Pola Berulang.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk pola",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      { at: 0, bersih: true },
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Berulang"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "AB"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Buat"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      { at: 0, bersih: true },
      tambah(0, judul("Tiga cara berpikir")),
      tambah(idx(SUARA_O3, "Berulang"), ...kartu("g0", 20, 34, 260, 44, WARNA_METODE[0], ["Pola Berulang", "satuan pola melanjutkan barisan"], 10)),
      tambah(idx(SUARA_O3, "mengenali"), ...kartu("g1", 20, 86, 260, 44, WARNA_METODE[1], ["Pola AB dan ABC", "kenali jenis satuan pola"], 10)),
      tambah(idx(SUARA_O3, "merancang"), ...kartu("g2", 20, 138, 260, 44, WARNA_METODE[2], ["Buat Pola", "rancang pola sendiri"], 10)),
    ),
    k(
      SUARA_O4,
      { at: 0, bersih: true },
      tambah(0, judul("Alat bantu hari ini")),
      tambah("gambar", item("ba", 0, "lingkaran", tata(3, 28, 30), 90), item("ba", 1, "persegi", tata(3, 28, 30), 90), item("ba", 2, "segitiga", tata(3, 28, 30), 90)),
      tambah("mengetuk", emo("tg", 150, 150, "\u{1F446}", 26)),
    ),
    k(
      SUARA_O5,
      { at: 0, bersih: true },
      tambah(0, judul("Metode pertama")),
      tambah("Siap?", ...kartu("pm", 30, 60, 240, 44, WARNA_METODE[0], [NAMA_METODE_ID[0]], 14)),
      tambah("yaitu", emo("ow", 150, 150, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Pola Berulang: satuan menentukan lanjutan ------------------------------ */
export const BERULANG_ISI = ["biru", "kuning", "kuning", "biru", "kuning", "kuning", "biru", "kuning", "kuning"];
export const BERULANG_GANTI = ["biru", "kuning", "biru", "kuning", "biru", "kuning"];
const T9 = tata(9, 20, 7);
const T6B = tata(6, 20, 12);
const SUARA_U1 = "Metode pertama bernama Pola Berulang. Satuan pola menentukan lanjutannya.";
const SUARA_U2 = "Lihat barisan ini: biru, kuning, kuning, biru, kuning, kuning, biru, kuning. Ada satu kotak kosong di ujung.";
const SUARA_U3 = "Cari satuan polanya: biru, kuning, dan kuning. Satuannya terdiri dari tiga benda.";
const SUARA_U4 = "Lanjutkan dengan satuan yang sama. Setelah biru dan kuning, yang datang berikutnya kuning.";
const SUARA_U5 = "Kalau satuannya diganti menjadi biru dan kuning, lanjutannya ikut berubah: biru, kuning, biru, kuning, biru, kuning.";

export const ADEGAN_LUAR_BERULANG: AdeganStory = {
  id: "luar-berulang",
  judul: "Pola Berulang: satuan menentukan lanjutan",
  sumber: "Metode luar: Pola Berulang",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_U1, tambah(0, ...kepala(0)), tambah(idx(SUARA_U1, "menentukan"), ...kartu("kk", 30, 76, 240, 44, W.hijauMuda, ["satuan pola", "menentukan lanjutannya"], 11))),
    k(SUARA_U2, hapus(0, "kk-k", "kk-t0", "kk-t1"), ...munculItem(SUARA_U2, "ba", BERULANG_ISI.slice(0, 8), T9, 84, { setelah: "ini:" }), tambah(idx(SUARA_U2, "kotak"), item("ba", 8, "kosong", T9, 84))),
    k(SUARA_U3, tambah(idx(SUARA_U3, "Satuannya"), kurungSatuan("ba", 0, 3, T9, 84))),
    k(SUARA_U4, isiKosong(idx(SUARA_U4, "kuning", 2), "ba", 8, "kuning", T9, 84)),
    k(SUARA_U5, redamkan(0, "ba_8_kuning"), ...munculItem(SUARA_U5, "bb", BERULANG_GANTI, T6B, 150, { setelah: "berubah:" })),
  ],
};

/* ------------------------------ 3. Pola Berulang: terapan ------------------------------ */
export const BERULANG_TERAPAN = ["merah", "merah", "hijau", "merah", "merah", "hijau", "merah", "merah", "hijau"];
const SUARA_V1 = "Sekarang giliranmu. Perhatikan: merah, merah, hijau, merah, merah, hijau, merah, merah, lalu ada kotak kosong.";
const SUARA_V2 = "Cari satuan polanya: merah, merah, dan hijau. Satuannya terdiri dari tiga benda.";
const SUARA_V3 = "Warna apa untuk kotak kosong? Ketuk jawabanmu.";
const SUARA_V4 = "Betul, hijau! Satuan pola menentukan lanjutannya.";

export const ADEGAN_LUAR_BERULANG_TERAPAN: AdeganStory = {
  id: "luar-berulang-terapan",
  judul: "Pola Berulang: melanjutkan barisan",
  sumber: "Metode luar: Pola Berulang, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(0)), ...munculItem(SUARA_V1, "ba", BERULANG_TERAPAN.slice(0, 8), T9, 70, { setelah: "Perhatikan:" }), tambah(idx(SUARA_V1, "kotak"), item("ba", 8, "kosong", T9, 70))),
    k(SUARA_V2, tambah(idx(SUARA_V2, "Satuannya"), kurungSatuan("ba", 0, 3, T9, 70))),
    k(SUARA_V3, tambah(idx(SUARA_V3, "Ketuk"), ...pilihKata(128, ["hijau", "merah", "kuning"], 11))),
    k(SUARA_V4, sorotkan(idx(SUARA_V4, "Betul"), "c1-k"), isiKosong(idx(SUARA_V4, "hijau"), "ba", 8, "hijau", T9, 70)),
  ],
};
