import type { AdeganStory } from "./logika-story";
import { OWL, W, anak, emo, judul, kartu, papanKepala, papanKolom, teks } from "./k4b1ka-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihBaris, pilihKata, sorotkan, tambah, ubah } from "./k4b1ka-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k4b1ka-luar-1";

/* Rujukan topik: Matematika untuk SD/MI Kelas IV, Bab 1 Sub-Bab A (membaca dan menulis bilangan cacah sampai 10.000). Metode luar; gambar, cerita, dan angka orisinal IGIL. */

/* ------------------------------ 4. Papan Empat Tempat: konsep ------------------------------ */
const SUARA_P1 = "Metode kedua bernama Papan Empat Tempat. Papan ini punya empat kolom untuk empat angka.";
const SUARA_P2 = "Dengarkan nama bilangannya, enam ribu tiga ratus empat puluh. Lalu isi kolom dari kiri.";
const SUARA_P3 = "Enam di ribuan, tiga di ratusan, empat di puluhan. Satuan tidak disebut, jadi nol.";
const SUARA_P4 = "Papan terisi penuh. Bilangannya ditulis dengan titik setelah ribuan.";

export const ADEGAN_LUAR_PAPAN: AdeganStory = {
  id: "luar-papan",
  judul: "Papan Empat Tempat: satu kolom satu angka",
  sumber: "Metode luar: Papan Empat Tempat",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(1)), tambah(idx(SUARA_P1, "papan", 1), ...papanKepala("pp", 10, 58, 280))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "enam"), ...kartu("nm", 20, 114, 260, 40, W.krem, ["enam ribu", "tiga ratus empat puluh"], 11))),
    k(
      SUARA_P3,
      tambah(idx(SUARA_P3, "Enam"), ...papanKolom("pp", 10, 73, 280, 0, "6")),
      tambah(idx(SUARA_P3, "tiga"), ...papanKolom("pp", 10, 73, 280, 1, "3")),
      tambah(idx(SUARA_P3, "empat"), ...papanKolom("pp", 10, 73, 280, 2, "4")),
      tambah(idx(SUARA_P3, "nol."), ...papanKolom("pp", 10, 73, 280, 3, "0")),
    ),
    k(SUARA_P4, tambah(idx(SUARA_P4, "Bilangannya"), ...kartu("bl", 80, 160, 140, 34, W.emas, ["6.340"], 22))),
  ],
};

/* ------------------------------ 5. Papan Empat Tempat: terapan ------------------------------ */
const SUARA_Q1 = "Terapkan pada papan Kira. Papan berisi dua, nol, sembilan, dan satu.";
const SUARA_Q2 = "Bagaimana membaca bilangan ini? Ketuk jawaban yang tepat.";
const SUARA_Q3 = "Betul! Ratusan nol tidak dibaca, jadi dua ribu sembilan puluh satu.";
const SUARA_Q4 = "Kolom ratusan yang kosong tetap harus ada. Ia menjaga angka lain pada tempatnya.";

export const ADEGAN_LUAR_PAPAN_TERAPAN: AdeganStory = {
  id: "luar-papan-terapan",
  judul: "Papan Empat Tempat: papan Kira",
  sumber: "Metode luar: Papan Empat Tempat",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(1), ...papanKepala("pp", 10, 52, 280)),
      tambah(idx(SUARA_Q1, "dua,"), ...papanKolom("pp", 10, 67, 280, 0, "2")),
      tambah(idx(SUARA_Q1, "nol,"), ...papanKolom("pp", 10, 67, 280, 1, "0")),
      tambah(idx(SUARA_Q1, "sembilan,"), ...papanKolom("pp", 10, 67, 280, 2, "9")),
      tambah(idx(SUARA_Q1, "satu."), ...papanKolom("pp", 10, 67, 280, 3, "1")),
    ),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Ketuk"), ...pilihBaris(110, ["dua ribu sembilan ratus satu", "dua ribu sembilan puluh satu", "dua ribu sembilan belas"], 10))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul!"), "c2-k")),
    k(SUARA_Q4, hapus(0, ...idPilihan(3)), sorotkan(idx(SUARA_Q4, "kosong"), "pp-d1"), tambah(idx(SUARA_Q4, "Ia"), ...kartu("bl", 80, 116, 140, 36, W.emas, ["2.091"], 22))),
  ],
};

/* ------------------------------ 6. Nol Penjaga Tempat: konsep ------------------------------ */
const SUARA_Z1 = "Metode ketiga bernama Nol Penjaga Tempat. Angka nol bertugas menjaga tempat yang kosong.";
const SUARA_Z2 = "Perhatikan bilangan tiga ribu enam. Tiga di ribuan, enam di satuan, ratusan dan puluhan kosong.";
const SUARA_Z3 = "Kalau nol tidak ditulis, tiga dan enam berdempetan. Bilangannya menjadi tiga puluh enam.";
const SUARA_Z4 = "Nol menjaga tempat ratusan dan puluhan. Jadi tiga tetap di ribuan, dan enam tetap di satuan.";

export const ADEGAN_LUAR_NOL: AdeganStory = {
  id: "luar-nol",
  judul: "Nol Penjaga Tempat: nol menjaga kolom kosong",
  sumber: "Metode luar: Nol Penjaga Tempat",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Z1, tambah(0, ...kepala(2)), tambah(idx(SUARA_Z1, "nol"), emo("nl", 150, 118, "0", 80, { warna: W.merah }))),
    k(
      SUARA_Z2,
      hapus(0, "nl"),
      tambah(0, ...papanKepala("pp", 10, 58, 280)),
      tambah(idx(SUARA_Z2, "tiga", 2), ...papanKolom("pp", 10, 73, 280, 0, "3")),
      tambah(idx(SUARA_Z2, "enam", 2), ...papanKolom("pp", 10, 73, 280, 3, "6")),
      tambah(idx(SUARA_Z2, "kosong."), ...papanKolom("pp", 10, 73, 280, 1, "?"), ...papanKolom("pp", 10, 73, 280, 2, "?")),
    ),
    k(
      SUARA_Z3,
      tambah(idx(SUARA_Z3, "Bilangannya"), ...kartu("sl", 170, 122, 120, 34, W.merahMuda, ["36"], 22), teks("sl-n", 230, 170, "tanpa nol", 9, W.merah)),
    ),
    k(
      SUARA_Z4,
      ubah(idx(SUARA_Z4, "ratusan"), { id: "pp-dt1", isi: "0" }),
      ubah(idx(SUARA_Z4, "puluhan."), { id: "pp-dt2", isi: "0" }),
      tambah(idx(SUARA_Z4, "tiga"), ...kartu("bl", 10, 122, 120, 34, W.emas, ["3.006"], 22)),
    ),
  ],
};

/* ------------------------------ 7. Nol Penjaga Tempat: terapan ------------------------------ */
const SUARA_Y1 = "Terapkan pada bilangan ini. Halim mendengar lima ribu tiga. Bagaimana menuliskannya?";
const SUARA_Y2 = "Ketuk tulisan yang tepat untuk nama itu.";
const SUARA_Y3 = "Betul! Tiga ada di satuan. Ratusan dan puluhan dijaga oleh nol.";
const SUARA_Y4 = "Lima di ribuan, nol di ratusan, nol di puluhan, dan tiga di satuan.";

export const ADEGAN_LUAR_NOL_TERAPAN: AdeganStory = {
  id: "luar-nol-terapan",
  judul: "Nol Penjaga Tempat: bilangan Halim",
  sumber: "Metode luar: Nol Penjaga Tempat",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_Y1, tambah(0, ...kepala(2)), tambah(idx(SUARA_Y1, "Halim"), ...anak("halim", 40, 80)), tambah(idx(SUARA_Y1, "lima"), ...kartu("nm", 90, 62, 190, 40, W.krem, ["lima ribu tiga"], 14))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Ketuk"), ...pilihKata(130, ["5.300", "5.030", "5.003"], 16))),
    k(SUARA_Y3, sorotkan(idx(SUARA_Y3, "Betul!"), "c3-k"), tambah(idx(SUARA_Y3, "oleh"), emo("ok", 150, 182, "✅", 24))),
    k(
      SUARA_Y4,
      hapus(0, "ok", ...idPilihan(3), "an-halim", "an-halim-bd", "an-halim-lb"),
      tambah(0, ...papanKepala("pp", 10, 104, 280)),
      tambah(idx(SUARA_Y4, "Lima"), ...papanKolom("pp", 10, 119, 280, 0, "5")),
      tambah(idx(SUARA_Y4, "nol", 1), ...papanKolom("pp", 10, 119, 280, 1, "0")),
      tambah(idx(SUARA_Y4, "nol", 2), ...papanKolom("pp", 10, 119, 280, 2, "0")),
      tambah(idx(SUARA_Y4, "tiga"), ...papanKolom("pp", 10, 119, 280, 3, "3")),
    ),
  ],
};

/* ------------------------------ 9. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita membaca dan menulis bilangan.";
const SUARA_R2 = "Metode Balok Empat Tingkat, bilangan disusun dari peti, dus, bungkus, dan benda.";
const SUARA_R3 = "Metode Papan Empat Tempat, tiap angka menempati satu kolom.";
const SUARA_R4 = "Metode Nol Penjaga Tempat, angka nol menjaga tempat yang kosong.";
const SUARA_R5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Balok"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "disusun dari peti sampai benda"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Papan"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "satu kolom untuk satu angka"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Nol"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "nol menjaga tempat kosong"], 9.2))),
    k(SUARA_R5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_R5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};

