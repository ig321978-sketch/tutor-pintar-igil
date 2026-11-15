import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, benda, emo, hasil, judul, kartu, meja, tanda } from "./k2b5B-gambar";
import { bersihMeja, duaTempat, hapus, hapusKartu, idx, k, mejaSekaligus, pilihKata, pindah, sorotkan, tambah } from "./k2b5B-bantu";
import { gantian } from "./k2b5B-materi-2";

export const NAMA_METODE_ID = ["Setengah Kumpulan", "Bagi Rata Kumpulan", "Cek Genap"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama kecil di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 20, 288, 14, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.2);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan setengah dari kumpulan benda dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Setengah Kumpulan, Bagi Rata Kumpulan, dan Cek Genap.";
const SUARA_O3 = "Setengah Kumpulan mengambil setengah dari banyak benda. Bagi Rata Kumpulan membagi benda menjadi dua bagian sama banyak. Cek Genap memeriksa dulu apakah bilangannya genap.";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk dan memilih jawaban dengan teliti.";
const SUARA_O5 = "Siap? Ayo kita mulai dengan metode pertama, yaitu Setengah Kumpulan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk setengah kumpulan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      { at: 0, bersih: true },
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Setengah"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Bagi"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Cek"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      { at: 0, bersih: true },
      tambah(0, judul("Tiga cara berpikir")),
      tambah(idx(SUARA_O3, "Setengah"), ...kartu("gc0", 20, 34, 260, 44, WARNA_METODE[0], ["Setengah Kumpulan", "ambil setengah dari banyak benda"], 10)),
      tambah(idx(SUARA_O3, "Bagi"), ...kartu("gc1", 20, 86, 260, 44, WARNA_METODE[1], ["Bagi Rata Kumpulan", "dua bagian sama banyak"], 10)),
      tambah(idx(SUARA_O3, "Cek"), ...kartu("gc2", 20, 138, 260, 44, WARNA_METODE[2], ["Cek Genap", "periksa dulu bilangannya"], 10)),
    ),
    k(
      SUARA_O4,
      { at: 0, bersih: true },
      tambah(0, judul("Alat bantu hari ini")),
      tambah("gambar", meja(), benda("mj", 0, "kelereng", 3), benda("mj", 1, "bintang", 3), benda("mj", 2, "bola", 3)),
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

/* ------------------------------ 2. Setengah Kumpulan: ambil setengah dari banyak benda ------------------------------ */
const SUARA_U1 = "Metode pertama bernama Setengah Kumpulan. Ambil setengah dari banyak benda.";
const SUARA_U2 = "Lihat delapan bola di meja. Kita ingin mengambil setengahnya.";
const SUARA_U3 = "Pindahkan bola bergantian ke dua tempat: kiri, kanan, kiri, kanan, kiri, kanan, kiri, kanan.";
const SUARA_U4 = "Hasilnya empat bola di kiri dan empat bola di kanan. Ambil satu tempat saja, itulah setengahnya.";
const SUARA_U5 = "Jadi setengah dari delapan bola adalah empat bola.";

export const ADEGAN_LUAR_SETENGAH: AdeganStory = {
  id: "luar-setengah",
  judul: "Setengah Kumpulan: ambil setengah dari banyak benda",
  sumber: "Metode luar: Setengah Kumpulan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_U1, tambah(0, ...kepala(0)), tambah(idx(SUARA_U1, "Ambil"), ...kartu("kk", 30, 76, 240, 44, W.hijauMuda, ["ambil setengah", "dari banyak benda"], 11))),
    k(SUARA_U2, hapus(0, "kk-k", "kk-t0", "kk-t1"), tambah(0, meja()), mejaSekaligus(idx(SUARA_U2, "delapan"), 8, "bola")),
    k(SUARA_U3, duaTempat(idx(SUARA_U3, "tempat:"), "Kiri", "Kanan"), ...pindah("bola", 8, gantian(SUARA_U3, 8))),
    k(SUARA_U4, bersihMeja(idx(SUARA_U4, "Hasilnya")), tambah(idx(SUARA_U4, "empat"), tanda(true)), sorotkan(idx(SUARA_U4, "Ambil"), "pa-w")),
    k(SUARA_U5, tambah(idx(SUARA_U5, "setengah"), ...hasil("hs", "setengah dari 8 = 4"))),
  ],
};

/* ------------------------------ 3. Setengah Kumpulan: terapan ------------------------------ */
const SUARA_V1 = "Sekarang giliranmu. Igil punya enam kartu di meja.";
const SUARA_V2 = "Berapa setengah dari enam kartu? Ketuk jawabanmu.";
const SUARA_V3 = "Betul, tiga! Satu bagian berisi tiga kartu, dan bagian yang lain juga tiga kartu.";
const SUARA_V4 = "Setengah dari enam kartu adalah tiga kartu. Itu hasil metode Setengah Kumpulan.";

export const ADEGAN_LUAR_SETENGAH_TERAPAN: AdeganStory = {
  id: "luar-setengah-terapan",
  judul: "Setengah Kumpulan: mencari setengah",
  sumber: "Metode luar: Setengah Kumpulan, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(0), meja()), mejaSekaligus(idx(SUARA_V1, "enam"), 6, "kartu")),
    k(SUARA_V2, tambah(idx(SUARA_V2, "Ketuk"), ...pilihKata(128, ["3", "2", "6"], 16))),
    k(
      SUARA_V3,
      sorotkan(idx(SUARA_V3, "Betul"), "c1-k"),
      hapusKartu(idx(SUARA_V3, "Satu"), 3),
      duaTempat(idx(SUARA_V3, "Satu"), "Kiri", "Kanan"),
      ...pindah("kartu", 6, [
        { at: idx(SUARA_V3, "bagian", 1), n: 0, ke: "pa" },
        { at: idx(SUARA_V3, "bagian", 1), n: 1, ke: "pa" },
        { at: idx(SUARA_V3, "bagian", 1), n: 2, ke: "pa" },
        { at: idx(SUARA_V3, "yang"), n: 3, ke: "pb" },
        { at: idx(SUARA_V3, "yang"), n: 4, ke: "pb" },
        { at: idx(SUARA_V3, "yang"), n: 5, ke: "pb" },
      ]),
    ),
    k(SUARA_V4, bersihMeja(0), tambah(idx(SUARA_V4, "Setengah"), tanda(true)), tambah(idx(SUARA_V4, "adalah"), ...hasil("hs", "setengah dari 6 = 3"))),
  ],
};
