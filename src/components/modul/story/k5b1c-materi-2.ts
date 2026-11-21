import type { AdeganStory } from "./logika-story";
import { E, W, bendera, emo, judul, kotak, lantai, teks, tokoh } from "./k5b1c-gambar";
import { bersih, hapus, k, tambah } from "./k5b1c-bantu";

/*
 * Cerita orisinal IGIL "Bundel Tiket Bu Lestari" (Kelas 5 Bab 1 Sub-Bab C), lanjutan: menjumlahkan uraian, salah langkah Fajar, dan memeriksanya.
 * Naskah suara dari naskah/story-naskah-k5b1c.md.
 */

/* ------------------------------ 3. Uraian ------------------------------ */
const SUARA_U1 = "Citra menjumlahkan semuanya: dua puluh ribu ditambah empat ribu ditambah tiga ratus ditambah lima puluh.";
const SUARA_U2 = "Bentuk panjang itu disebut uraian, karena bilangannya diurai menurut kolomnya.";
const SUARA_U3 = "Uraian dan bilangan semula sama besarnya, hanya ditulis berbeda.";

export const ADEGAN_URAI: AdeganStory = {
  id: "urai",
  judul: "Citra menjumlahkan",
  sumber: "Materi: uraian",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Citra menjumlahkan"), ...lantai("lt", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("dua", teks("u1", 38, 64, "20.000", 12, W.biru, { z: 3 })),
      tambah("empat", teks("p1", 72, 64, "+", 12, W.merah, { z: 3 }), teks("u2", 104, 64, "4.000", 12, W.biru, { z: 3 })),
      tambah("tiga", teks("p2", 137, 64, "+", 12, W.merah, { z: 3 }), teks("u3", 166, 64, "300", 12, W.biru, { z: 3 })),
      tambah("lima", teks("p3", 194, 64, "+", 12, W.merah, { z: 3 }), teks("u4", 222, 64, "50", 12, W.biru, { z: 3 })),
    ),
    k(
      SUARA_U2,
      tambah("panjang", kotak("bk", 10, 46, 240, 26, undefined, W.merah, { rx: 6, tebal: 1.6, putus: true, z: 1 })),
      tambah("uraian", teks("ur", 130, 100, "uraian", 13, W.merah, { z: 3 })),
      tambah("kolomnya", teks("h1", 38, 84, "puluh ribuan", 8, W.coklat, { z: 3 }), teks("h2", 104, 84, "ribuan", 8, W.coklat, { z: 3 }), teks("h3", 166, 84, "ratusan", 8, W.coklat, { z: 3 }), teks("h4", 222, 84, "puluhan", 8, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_U3,
      hapus(0, "ur"),
      tambah(0, teks("sm", 150, 108, "=", 16, W.merah, { z: 3 })),
      tambah("semula", teks("bl", 150, 132, "24.350", 16, W.biru, { z: 3 })),
      tambah("berbeda", teks("tw", 150, 158, "ditulis berbeda, jumlahnya sama", 8, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 4. Salah langkah Fajar ------------------------------ */
const SUARA_S1 = "Fajar menguraikan sendiri delapan belas ribu tujuh ratus lima penonton Tribun Selatan.";
const SUARA_S2 = "Ia menulis sepuluh ribu, delapan ribu, tujuh ratus, dan lima puluh, karena angka lima terdengar seperti puluhan.";
const SUARA_S3 = "Kalau aku salah, aku melipat semua bendera klub di tribun, katanya sambil tersenyum lebar.";

export const ADEGAN_SALAH_URAI: AdeganStory = {
  id: "salah-urai",
  judul: "Fajar menguraikan sendiri",
  sumber: "Materi: uraian Fajar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Fajar menguraikan sendiri"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("delapan", teks("n18", 180, 56, "18.705", 18, W.biru, { z: 3 })),
      tambah("Tribun", teks("tb", 180, 78, "Tribun Selatan", 9.4, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_S2,
      tambah("sepuluh", teks("ur", 172, 112, "10.000 + 8.000 + 700 + 50", 10.5, W.merah, { z: 3 })),
      tambah("karena", teks("no", 172, 136, "angka 5 di puluhan?", 9, W.coklat, { z: 3 })),
      tambah("puluhan", emo("qq", 262, 136, E.tanya, 16, { z: 3 })),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Taruhan Fajar"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar"), teks("tr", 170, 60, "Kalau salah: lipat bendera", 10, W.merah, { z: 3 })),
      tambah("bendera", ...bendera("b1", 110, 150, W.merah), ...bendera("b2", 140, 150, W.biru), ...bendera("b3", 170, 150, W.hijau)),
      tambah("tersenyum", emo("sn", 240, 126, E.senyum, 26, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 5. Citra memeriksa ------------------------------ */
const SUARA_P1 = "Citra menjumlahkan uraian Fajar, dan hasilnya delapan belas ribu tujuh ratus lima puluh.";
const SUARA_P2 = "Hasilnya bukan delapan belas ribu tujuh ratus lima, jadi uraiannya salah; lima seharusnya di satuan.";
const SUARA_P3 = "Fajar melipat bendera satu per satu, dan Pak Arif membantu sambil tertawa.";

export const ADEGAN_PERIKSA_JUMLAH: AdeganStory = {
  id: "periksa-jumlah",
  judul: "Citra memeriksa uraian",
  sumber: "Materi: memeriksa jumlah",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Citra memeriksa uraian"), ...lantai("lt", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("uraian", teks("ur", 172, 52, "10.000 + 8.000 + 700 + 50", 10.5, W.merah, { z: 3 })),
      tambah("delapan", teks("hs", 172, 80, "= 18.750", 16, W.biru, { z: 3 })),
    ),
    k(
      SUARA_P2,
      tambah("bukan", teks("bd", 172, 106, "18.750 ≠ 18.705", 13, W.merah, { z: 3 })),
      tambah("salah", emo("sx", 270, 104, E.salah, 20, { z: 3 })),
      tambah("lima@2", teks("sat", 172, 132, "angka 5 seharusnya di satuan", 9, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Melipat bendera"), ...lantai("lt", 150), ...tokoh("fj", 60, 184, "Fajar")),
      tambah("bendera", ...bendera("b1", 110, 150, W.merah), ...bendera("b2", 140, 150, W.biru), ...bendera("b3", 170, 150, W.hijau)),
      tambah("Arif", ...tokoh("pa", 230, 184, "Pak Arif")),
      tambah("tertawa", emo("tw", 150, 90, E.tertawa, 30, { z: 3 })),
    ),
  ],
};
