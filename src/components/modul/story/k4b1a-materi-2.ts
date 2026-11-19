import type { AdeganStory } from "./logika-story";
import { E, W, angkaKotak, emo, garis, judul, kotak, panah, papanKotak, papanPengumuman, sapu, teras, teks, tokoh, xKotak } from "./k4b1a-gambar";
import { hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b1a-bantu";

/*
 * Cerita orisinal IGIL "Loket Tiket Bu Maya" (Kelas 4 Bab 1 Sub-Bab A), awal cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1a.md. Bagian ini: salah langkah (nol hilang), memperbaiki dengan kotak puluhan, membaca dari kiri.
 */

/* ------------------------------ 4. Salah langkah: nol hilang ------------------------------ */
const SUARA_S1 = "Satria menulis cepat dan berseru, tiga ribu empat ratus enam, jadi tiga, empat, enam!";
const SUARA_S2 = "Ia menuliskan tiga empat enam dengan titik di tengah, dan tersenyum bangga.";
const SUARA_S3 = "Kalau aku salah, aku menyapu seluruh teras penginapan, katanya.";

export const ADEGAN_SALAH_NOL: AdeganStory = {
  id: "salah-nol",
  judul: "Satria menulis tanpa nol",
  sumber: "Materi: salah langkah, nol hilang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satria Menulis Cepat"), ...papanPengumuman("pn", 70, 28, 160, 76, "PEMENANG"), ...tokoh("st", 40, 184, "Satria")),
      tambah("cepat", emo("cp", 80, 160, E.pensil, 16)),
      tambah("berseru,", kotak("sb", 100, 112, 100, 24, W.putih, W.biru, { rx: 8, z: 2 }), teks("sbn", 150, 129, "3.406", 13, W.biru, { z: 3 })),
      tambah("jadi", teks("tg", 150, 150, "3, 4, 6", 12, W.ungu)),
    ),
    k(
      SUARA_S2,
      hapus("Ia", "cp"),
      tambah("menuliskan", emo("ct", 80, 160, E.catat, 16)),
      tambah("titik", teks("tl", 150, 84, "3.46", 26, W.merah, { z: 2 })),
      tambah("tersenyum", emo("sn", 210, 160, E.senyum, 18)),
      tambah("bangga", emo("bt", 236, 160, E.bintang, 16)),
    ),
    k(
      SUARA_S3,
      tambah(0, ...teras("tr", 150)),
      tambah("salah,", emo("xs", 206, 86, E.salah, 18)),
      tambah("menyapu", ...sapu("sp", 262, 112)),
      tambah("penginapan,", emo("tn", 236, 126, E.tanya, 16)),
    ),
  ],
};

/* ------------------------------ 5. Memperbaiki: nol menjaga tempat ------------------------------ */
const SUARA_B1 = "Genta menunjuk papan empat kotak dan bertanya, di mana angka puluhannya?";
const SUARA_B2 = "Enam itu satuan, dan puluhannya kosong, jadi kotak puluhan diisi nol.";
const SUARA_B3 = "Nol menjaga tempat, sehingga angka tiga tetap di ribuan dan empat tetap di ratusan.";
const BOX = { x0: 40, y: 80 };

export const ADEGAN_PERBAIKI: AdeganStory = {
  id: "perbaiki",
  judul: "Kotak puluhan diisi nol",
  sumber: "Materi: nol menjaga tempat",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Nol Menjaga Tempat"), ...tokoh("ge", 40, 184, "Genta"), teks("sl", 258, 108, "3.46", 16, W.abu, { z: 2 })),
      tambah("papan", ...papanKotak("pk", BOX.x0, BOX.y, { label: true })),
      tambah("empat", teks("n4", 150, 150, "4 kotak", 11, W.ungu)),
      tambah("kotak", angkaKotak("pk", 0, "3", BOX.x0, BOX.y), angkaKotak("pk", 1, "4", BOX.x0, BOX.y), angkaKotak("pk", 3, "6", BOX.x0, BOX.y)),
      tambah("bertanya,", emo("tq", 258, 136, E.tanya, 18)),
      tambah("puluhannya?", teks("qq", xKotak(2, BOX.x0) + 20, BOX.y + 30, "?", 22, W.merah, { z: 2 })),
      sorotkan("puluhannya?", "pk-b2"),
    ),
    k(
      SUARA_B2,
      sorotkan("satuan,", "pk-b3"),
      redamkan("puluhannya", "pk-b3"),
      sorotkan("puluhannya", "pk-b2"),
      tambah("diisi", emo("ps", 110, 160, E.pensil, 16)),
      hapus("nol", "qq"),
      tambah("nol", angkaKotak("pk", 2, "0", BOX.x0, BOX.y, { warna: W.merah })),
    ),
    k(
      SUARA_B3,
      redamkan(0, "pk-b2"),
      sorotkan("tiga", "pk-b0"),
      sorotkan("empat", "pk-b1"),
      ubah("ratusan.", { id: "sl", warna: W.merah }),
      tambah("ratusan.", garis("cr", 238, 104, 44, 0, W.merah, 2, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 6. Membaca dari kiri ------------------------------ */
const SUARA_M1 = "Sekarang mereka membaca dari kiri, dimulai dari ribuan.";
const SUARA_M2 = "Tiga ribu, empat ratus, nol tidak dibaca, lalu enam, jadi tiga ribu empat ratus enam.";
const SUARA_M3 = "Satria cemberut, mengambil sapu, dan menyapu teras sampai bersih.";

export const ADEGAN_BACA: AdeganStory = {
  id: "baca",
  judul: "Membaca dari ribuan",
  sumber: "Materi: membaca bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Membaca dari Kiri"), ...tokoh("sa", 40, 184, "Satria"), ...tokoh("lr", 76, 184, "Laras"), ...tokoh("ge", 112, 184, "Genta"), teks("bn", 150, 72, "3.406", 34, W.biru)),
      tambah("kiri,", panah("ar", 100, 92, 100, 0, W.merah, 3)),
      tambah("ribuan", teks("rb", 110, 106, "ribuan", 8, W.merah)),
    ),
    k(
      SUARA_M2,
      hapus("Tiga", "ar", "rb"),
      tambah("Tiga", teks("b3", 70, 120, "3.000", 14, W.hijauTua)),
      tambah("empat", teks("b4", 135, 120, "400", 14, W.hijauTua)),
      tambah("nol", teks("b0", 185, 120, "0", 14, W.merah)),
      ubah("dibaca,", { id: "b0", op: 0.3 }),
      tambah("enam,", teks("b6", 235, 120, "6", 14, W.hijauTua)),
      sorotkan("jadi", "bn"),
    ),
    k(
      SUARA_M3,
      tambah(0, ...teras("tr", 150)),
      tambah("mengambil", ...sapu("sp", 246, 112)),
      tambah("cemberut,", emo("cm", 70, 160, E.cemberut, 16)),
      tambah("menyapu", emo("sq", 214, 176, E.sapu, 18)),
      tambah("bersih.", emo("bs", 270, 170, E.bintang, 18)),
    ),
  ],
};
