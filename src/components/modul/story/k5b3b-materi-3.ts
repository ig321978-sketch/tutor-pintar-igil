import type { AdeganStory } from "./logika-story";
import { E, W, bar, campur, emo, judul, kartu, lantai, panah, sapu, teks, tokoh } from "./k5b3b-gambar";
import { bersih, hapus, k, tambah } from "./k5b3b-bantu";

/*
 * Cerita orisinal IGIL "Roti Isi Pak Seno" (Kelas 5 Bab 3 Sub-Bab B, penjumlahan pecahan), lanjutan cerita Toko Roti Keliling.
 * Naskah suara dari naskah/story-naskah-k5b3b.md. Bagian ini: penyebut beda disamakan dengan KPK, campuran dengan penyebut beda, dan jembatan ke Sub-Bab C (Bu Nani).
 */

/* ------------------------------ 7. KPK ------------------------------ */
const SUARA_K1 = "Bima menjelaskan bahwa penyebut yang berbeda harus disamakan lebih dulu.";
const SUARA_K2 = "KPK dari empat dan enam adalah dua belas, sehingga tiga per dua belas ditambah dua per dua belas.";
const SUARA_K3 = "Jumlahnya lima per dua belas, dan Fajar menyapu taman sambil bersenandung.";

export const ADEGAN_KPK: AdeganStory = {
  id: "kpk",
  judul: "Samakan dengan KPK",
  sumber: "Materi: penyebut berbeda",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Penyebut berbeda"), ...lantai("lt", 150), ...bar("k1", 30, 46, 4, 1, { lebar: 120, h: 18 }), teks("k1t", 200, 59, "1/4", 14, W.rotiTua, { z: 3 })),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("penyebut", ...bar("k2", 30, 78, 6, 1, { lebar: 120, h: 18, warna: W.biruMuda, garis: W.biruGaris }), teks("k2t", 200, 91, "1/6", 14, W.biruGaris, { z: 3 })),
      tambah("berbeda", teks("kb", 150, 122, "penyebut beda: 4 dan 6", 12, W.merah, { z: 3 })),
      tambah("disamakan", teks("ks", 150, 144, "samakan dulu", 12, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("KPK dari 4 dan 6")),
      tambah("KPK", teks("kt", 150, 128, "KPK 4 dan 6 = 12", 13, W.merah, { z: 3 })),
      tambah("tiga", ...bar("c1", 30, 50, 12, 3, { lebar: 144, h: 18 }), teks("c1t", 220, 63, "3/12", 14, W.rotiTua, { z: 3 })),
      tambah("dua@3", ...bar("c2", 30, 82, 12, 2, { lebar: 144, h: 18, warna: W.biruMuda, garis: W.biruGaris }), teks("c2t", 220, 95, "2/12", 14, W.biruGaris, { z: 3 })),
    ),
    k(
      SUARA_K3,
      hapus("Jumlahnya", "kt"),
      tambah("lima", ...bar("c3", 30, 114, 12, 5, { lebar: 144, h: 18, warna: W.hijau, garis: W.hijauTua }), teks("c3t", 220, 127, "5/12", 14, W.hijauTua, { z: 3 })),
      tambah("Fajar", ...tokoh("fj", 264, 184, "Fajar")),
      tambah("menyapu", ...sapu("sp", 236, 120)),
      tambah("bersenandung", emo("lg", 196, 160, E.lagu, 18, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 8. Campuran dengan penyebut beda ------------------------------ */
const SUARA_C1 = "Pak Seno menantang: satu bulat satu per dua ditambah dua bulat satu per empat.";
const SUARA_C2 = "Citra mengubahnya menjadi enam per empat ditambah sembilan per empat, yaitu lima belas per empat.";
const SUARA_C3 = "Disederhanakan, hasilnya tiga bulat tiga per empat.";

const P1 = campur("p1", 24, 44, 1, 1, 2, { lebar: 60, h: 14 });
const P2 = campur("p2", 176, 44, 2, 1, 4, { lebar: 80, h: 14 });
const Z = campur("zz", 30, 44, 3, 3, 4, { lebar: 80, h: 12 });

export const ADEGAN_CAMPURAN: AdeganStory = {
  id: "campuran",
  judul: "Campuran beda penyebut",
  sumber: "Materi: campuran",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Campuran beda penyebut"), ...lantai("lt", 150)),
      tambah("Seno", ...tokoh("ps", 40, 184, "Pak Seno")),
      tambah("satu", ...P1.objs, teks("p1t", 54, 92, "1 1/2", 14, W.rotiTua, { z: 3 })),
      tambah("ditambah", teks("pl", 140, 70, "+", 18, W.merah, { z: 3 })),
      tambah("dua", ...P2.objs, teks("p2t", 216, 108, "2 1/4", 14, W.biruGaris, { z: 3 })),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Ubah ke pecahan biasa"), ...lantai("lt", 150)),
      tambah("Citra", ...tokoh("ct", 40, 184, "Citra")),
      tambah("enam", teks("e1", 150, 50, "1 1/2 = 3/2 = 6/4", 14, W.rotiTua, { z: 3 }), ...bar("v1", 20, 124, 6, 6, { lebar: 120, h: 14 })),
      tambah("sembilan", teks("e2", 150, 76, "2 1/4 = 9/4", 14, W.biruGaris, { z: 3 }), ...bar("v2", 150, 124, 9, 9, { lebar: 135, h: 14, warna: W.biruMuda, garis: W.biruGaris })),
      tambah("lima", teks("e3", 150, 106, "6/4 + 9/4 = 15/4", 17, W.merah, { z: 3 })),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Disederhanakan"), ...lantai("lt", 150), ...Z.objs),
      tambah("hasilnya", teks("f1", 200, 64, "15/4", 18, W.merah, { z: 3 })),
      tambah("tiga", teks("f2", 200, 92, "= 3 3/4", 18, W.hijauTua, { z: 3 })),
      tambah("empat", emo("ok", 250, 120, E.benar, 20, { z: 3 })),
      tambah("Disederhanakan", ...tokoh("ps", 40, 184, "Pak Seno")),
    ),
  ],
};

/* ------------------------------ 9. Penutup: jembatan ke Sub-Bab C ------------------------------ */
const SUARA_T1 = "Dari kejauhan, Bu Nani datang membawa loyang kue yang tinggal sebagian.";
const SUARA_T2 = "Pesanan pelanggan harus diambil dari sisa adonan itu.";
const SUARA_T3 = "Menurutmu, berapa bagian adonan yang tersisa sesudah pesanan diambil? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Pak Seno!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Bu Nani datang",
  sumber: "Materi: jembatan ke Sub-Bab C",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bu Nani datang"), ...lantai("lt", 150), teks("ly", 150, 82, "loyang kue", 11, W.coklat, { z: 3 })),
      tambah("Nani", ...tokoh("bn", 256, 184, "Bu Nani")),
      tambah("loyang", ...bar("ln", 100, 92, 8, 5, { lebar: 100, h: 26, warna: W.roti, garis: W.rotiTua })),
      tambah("tinggal", teks("ts", 150, 148, "tinggal sebagian", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_T2,
      tambah("Pesanan", ...kartu("pn", 20, 48, 62, 28, W.kapur, "pesanan", 11)),
      tambah("diambil", panah("pk", 84, 62, 36, 28, W.merah, 2, { z: 3 })),
      tambah("sisa", teks("sa", 150, 168, "sisa adonan", 11, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_T3,
      hapus("Menurutmu", "ts", "sa"),
      tambah("berapa", teks("br", 150, 140, "berapa bagian tersisa?", 13, W.merah, { z: 3 })),
      tambah("tersisa", emo("tn", 256, 70, E.tanya, 22, { z: 3 })),
      tambah("Bima", ...tokoh("bm", 30, 184, "Bima")),
      tambah("Citra", ...tokoh("ct", 74, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 118, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 162, 184, "Pak Arif")),
      tambah("Seno", ...tokoh("ps", 206, 184, "Pak Seno")),
    ),
  ],
};
