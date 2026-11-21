import type { AdeganStory } from "./logika-story";
import { E, W, bar, emo, gerobak, judul, kotak, lantai, teks, tokoh } from "./k5b3b-gambar";
import { bersih, k, tambah, ubah } from "./k5b3b-bantu";

/*
 * Cerita orisinal IGIL "Roti Isi Pak Seno" (Kelas 5 Bab 3 Sub-Bab B, penjumlahan pecahan), lanjutan cerita Toko Roti Keliling.
 * Naskah suara dari naskah/story-naskah-k5b3b.md. Bagian ini: gerobak dan roti dipotong delapan bagian, menjumlahkan pembilang, dan model arsir.
 */

/* ------------------------------ 1. Gerobak ------------------------------ */
const SUARA_G1 = "Lonceng gerobak Pak Seno berbunyi, dan Pak Arif mengajak Bima, Citra, dan Fajar mendekat.";
const SUARA_G2 = "Pak Seno bertopi koki tinggi dan membawa roti isi yang dipotong delapan bagian sama besar.";
const SUARA_G3 = "Citra memesan satu bagian, Bima memesan dua bagian, dan Pak Seno ingin menggabungkannya.";

export const ADEGAN_GEROBAK: AdeganStory = {
  id: "gerobak",
  judul: "Gerobak Pak Seno",
  sumber: "Materi: gerobak roti isi",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Gerobak Pak Seno"), ...lantai("lt", 150), teks("ting", 62, 70, "ting ting!", 10, W.merah, { z: 3 })),
      tambah("gerobak", ...gerobak("gr", 20, 80)),
      tambah("Arif", ...tokoh("pa", 140, 184, "Pak Arif")),
      tambah("Bima", ...tokoh("bm", 182, 184, "Bima")),
      tambah("Citra", ...tokoh("ct", 222, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 264, 184, "Fajar")),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Roti isi Pak Seno"), ...lantai("lt", 150)),
      tambah("Seno", ...tokoh("ps", 40, 184, "Pak Seno")),
      tambah("roti", teks("ri", 106, 84, "roti isi", 11, W.coklat, { z: 3 })),
      tambah("delapan", ...bar("rt", 100, 96, 8, 8, { lebar: 176, h: 22, warna: W.roti, garis: W.rotiTua })),
      tambah("bagian", teks("d8", 200, 84, "8 bagian sama besar", 10, W.merah, { z: 3 })),
    ),
    k(
      SUARA_G3,
      tambah("Citra", ...tokoh("ct", 100, 184, "Citra")),
      ubah("satu", { id: "rt0", warna: W.amber, garis: W.rotiTua }),
      tambah("satu", teks("c1", 111, 132, "Citra: 1/8", 10, W.rotiTua, { z: 3 })),
      tambah("Bima", ...tokoh("bm", 160, 184, "Bima")),
      ubah("dua", { id: "rt1", warna: W.biruMuda, garis: W.biruGaris }, { id: "rt2", warna: W.biruMuda, garis: W.biruGaris }),
      tambah("dua", teks("b2", 200, 132, "Bima: 2/8", 10, W.biruGaris, { z: 3 })),
      tambah("menggabungkannya", emo("tn", 258, 112, E.tanya, 20, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 2. Gabung pembilang ------------------------------ */
const SUARA_B1 = "Penyebutnya sama, yaitu delapan, jadi kita cukup menjumlahkan pembilangnya.";
const SUARA_B2 = "Satu per delapan ditambah dua per delapan sama dengan tiga per delapan.";
const SUARA_B3 = "Penyebutnya tetap delapan, karena ukuran tiap potongan tidak berubah.";

export const ADEGAN_GABUNG: AdeganStory = {
  id: "gabung",
  judul: "Jumlahkan pembilangnya",
  sumber: "Materi: penyebut sama",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Penyebut sama"), ...bar("g1", 30, 50, 8, 1, { lebar: 128, h: 18 }), teks("l1", 200, 63, "1/8", 14, W.rotiTua, { z: 3 })),
      tambah("sama", ...bar("g2", 30, 82, 8, 2, { lebar: 128, h: 18, warna: W.biruMuda, garis: W.biruGaris }), teks("l2", 200, 95, "2/8", 14, W.biruGaris, { z: 3 })),
      tambah("delapan", teks("sd", 150, 132, "penyebut sama: 8", 12, W.merah, { z: 3 })),
      tambah("pembilangnya", teks("jp", 150, 158, "jumlahkan pembilang", 12, W.biru, { z: 3 })),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Satu bagian ditambah dua bagian"), teks("eq", 150, 58, "1/8 + 2/8 = 3/8", 17, W.biru, { z: 3 })),
      tambah("Satu", ...bar("h1", 10, 96, 8, 1, { lebar: 84, h: 18 })),
      tambah("ditambah", teks("pl", 101, 109, "+", 14, W.merah, { z: 3 })),
      tambah("dua", ...bar("h2", 108, 96, 8, 2, { lebar: 84, h: 18, warna: W.biruMuda, garis: W.biruGaris })),
      tambah("sama", teks("sm", 199, 109, "=", 14, W.merah, { z: 3 })),
      tambah("tiga", ...bar("h3", 206, 96, 8, 3, { lebar: 84, h: 18, warna: W.hijau, garis: W.hijauTua })),
    ),
    k(
      SUARA_B3,
      ubah("tetap", { id: "eq", warna: W.merah }),
      tambah("tetap", teks("tt", 150, 142, "penyebut tetap: 8", 13, W.merah, { z: 3 })),
      tambah("ukuran", teks("uk", 150, 166, "ukuran potongan sama", 11, W.coklat, { z: 3 })),
      ubah("berubah", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ id: `h3${i}`, sorot: true }))),
    ),
  ],
};

/* ------------------------------ 3. Model arsir ------------------------------ */
const SUARA_A1 = "Pak Seno menggambar roti di papan kecil dan mengarsir satu bagian untuk Citra.";
const SUARA_A2 = "Ia mengarsir dua bagian lagi untuk Bima, sehingga tiga dari delapan bagian terarsir.";
const SUARA_A3 = "Gambar arsir itu cocok dengan hasil hitungan tadi.";

export const ADEGAN_ARSIR: AdeganStory = {
  id: "arsir",
  judul: "Model arsir",
  sumber: "Materi: model arsir",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Model arsir"), ...lantai("lt", 150), kotak("pp", 36, 44, 228, 70, W.kapur, W.kayuTua, { rx: 5, tebal: 3, z: 0 })),
      tambah("Seno", ...tokoh("ps", 40, 184, "Pak Seno")),
      tambah("roti", ...bar("a", 50, 60, 8, 0, { lebar: 200, h: 36 })),
      ubah("mengarsir", { id: "a0", warna: W.amber, garis: W.rotiTua }),
      tambah("Citra", teks("c1", 90, 134, "Citra: 1/8", 11, W.rotiTua, { z: 3 })),
    ),
    k(
      SUARA_A2,
      ubah("dua", { id: "a1", warna: W.biruMuda, garis: W.biruGaris }, { id: "a2", warna: W.biruMuda, garis: W.biruGaris }),
      tambah("Bima", teks("b2", 210, 134, "Bima: 2/8", 11, W.biruGaris, { z: 3 })),
      tambah("tiga", teks("tg", 150, 107, "3 dari 8 bagian terarsir", 10.5, W.merah, { z: 3 })),
    ),
    k(
      SUARA_A3,
      tambah("hasil", teks("eq", 150, 164, "1/8 + 2/8 = 3/8", 15, W.biru, { z: 3 })),
      tambah("cocok", emo("ok", 262, 108, E.benar, 18, { z: 3 })),
      ubah("hitungan", { id: "a0", sorot: true }, { id: "a1", sorot: true }, { id: "a2", sorot: true }),
    ),
  ],
};
