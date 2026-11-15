import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, digital, emo, jam, judul, kartu, pilihKata, pita } from "./k2b6B-gambar";
import { hapus, hapusKartu, idx, k, putarJam, sorotkan, tambah, ubah } from "./k2b6B-bantu";
import { JAM_LATIHAN } from "./k2b6B-materi-5";

export const NAMA_METODE_ID = ["Membaca Jam", "Lama Kegiatan", "Urutan Waktu Sehari"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama kecil di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 20, 288, 14, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.2);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan waktu dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Membaca Jam, Lama Kegiatan, dan Urutan Waktu Sehari.";
const SUARA_O3 = "Membaca Jam melihat jarum pendek untuk jam dan jarum panjang untuk menit. Lama Kegiatan memperkirakan lamanya suatu kegiatan. Urutan Waktu Sehari mengurutkan pagi, siang, sore, dan malam.";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk dan memilih jawaban dengan teliti.";
const SUARA_O5 = "Siap? Ayo kita mulai dengan metode pertama, yaitu Membaca Jam.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk belajar waktu",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      { at: 0, bersih: true },
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Membaca"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Lama"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Urutan"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      { at: 0, bersih: true },
      tambah(0, judul("Tiga cara berpikir")),
      tambah(idx(SUARA_O3, "Membaca"), ...kartu("gc0", 20, 34, 260, 44, WARNA_METODE[0], ["Membaca Jam", "jarum pendek: jam, jarum panjang: menit"], 9.6)),
      tambah(idx(SUARA_O3, "Lama"), ...kartu("gc1", 20, 86, 260, 44, WARNA_METODE[1], ["Lama Kegiatan", "perkirakan lama suatu kegiatan"], 10)),
      tambah(idx(SUARA_O3, "Urutan"), ...kartu("gc2", 20, 138, 260, 44, WARNA_METODE[2], ["Urutan Waktu Sehari", "pagi, siang, sore, malam"], 10)),
    ),
    k(
      SUARA_O4,
      { at: 0, bersih: true },
      tambah(0, judul("Alat bantu hari ini")),
      tambah("gambar", jam("j1", JAM_LATIHAN, 3, 0, false)),
      tambah("mengetuk", emo("tg", 150, 176, "\u{1F446}", 26)),
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

/* ------------------------------ 2. Membaca Jam: jarum pendek jam, jarum panjang menit ------------------------------ */
const SUARA_W1 = "Metode pertama bernama Membaca Jam. Jarum pendek untuk jam, jarum panjang untuk menit.";
const SUARA_W2 = "Lihat jam ini. Jarum panjang di angka dua belas, jadi menitnya nol.";
const SUARA_W3 = "Jarum pendek di angka tiga, jadi jamnya tiga.";
const SUARA_W4 = "Gabungkan keduanya. Jam ini menunjukkan pukul tiga tepat.";
const SUARA_W5 = "Pada jam digital, pukul tiga tepat ditulis nol tiga titik nol nol.";

export const ADEGAN_LUAR_JAM: AdeganStory = {
  id: "luar-jam",
  judul: "Membaca Jam: jarum pendek jam, jarum panjang menit",
  sumber: "Metode luar: Membaca Jam",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_W1, tambah(0, ...kepala(0)), tambah(idx(SUARA_W1, "Jarum"), ...kartu("kk", 30, 76, 240, 44, W.hijauMuda, ["pendek untuk jam", "panjang untuk menit"], 11))),
    k(SUARA_W2, hapus(0, "kk-k", "kk-t0", "kk-t1"), tambah(idx(SUARA_W2, "jam"), jam("j1", JAM_LATIHAN, 3, 0)), sorotkan(idx(SUARA_W2, "panjang"), "j1-m")),
    k(SUARA_W3, ubah(0, { id: "j1-m", sorot: false }), sorotkan(idx(SUARA_W3, "pendek"), "j1-p")),
    k(SUARA_W4, ubah(0, { id: "j1-p", sorot: false }), tambah(idx(SUARA_W4, "pukul"), ...pita("zz", "pukul 3 tepat", W.emas, 156))),
    k(SUARA_W5, hapus(idx(SUARA_W5, "digital,"), "zz-k", "zz-t0"), tambah(idx(SUARA_W5, "ditulis"), digital(94, 156, 3, 0, 112))),
  ],
};

/* ------------------------------ 3. Membaca Jam: terapan ------------------------------ */
const SUARA_X1 = "Sekarang giliranmu. Perhatikan jarum pendek dan jarum panjang pada jam ini.";
const SUARA_X2 = "Pukul berapa jam ini? Ketuk jawabanmu.";
const SUARA_X3 = "Betul, pukul sepuluh tepat! Jarum pendek di angka sepuluh dan jarum panjang di angka dua belas.";
const SUARA_X4 = "Kalau jarum pendek di angka sebelas, jam itu menunjukkan pukul sebelas tepat.";

export const ADEGAN_LUAR_JAM_TERAPAN: AdeganStory = {
  id: "luar-jam-terapan",
  judul: "Membaca Jam: pukul berapa",
  sumber: "Metode luar: Membaca Jam, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_X1, tambah(0, ...kepala(0)), tambah(idx(SUARA_X1, "jarum"), jam("j1", JAM_LATIHAN, 10, 0))),
    k(SUARA_X2, tambah(idx(SUARA_X2, "Ketuk"), ...pilihKata(158, ["9", "10", "11"], 16))),
    k(SUARA_X3, sorotkan(idx(SUARA_X3, "Betul"), "c2-k"), sorotkan(idx(SUARA_X3, "pendek"), "j1-p")),
    k(SUARA_X4, hapusKartu(0, 3), ubah(0, { id: "j1-p", sorot: false }), putarJam(idx(SUARA_X4, "Kalau"), "j1", { h: 10, m: 0 }, { h: 11, m: 0 })),
  ],
};
