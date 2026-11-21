import type { AdeganStory } from "./logika-story";
import { E, W, air, bulat, emo, idNomori, judul, kotak, nomori, petak, tanah, teks, tokoh } from "./k4b4a-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b4a-bantu";

/*
 * Cerita orisinal IGIL "Lantai Ubin Bu Sinta" (Kelas 4 Bab 4 Sub-Bab A, pengukuran luas), awal cerita Kolam Renang Tirta Ceria.
 * Naskah suara dari naskah/story-naskah-k4b4a.md. Bagian ini: salah langkah menjumlah, menghitung dengan baris kali kolom, dan taruhan menyikat lantai.
 */

/** Kisi tiga baris empat kolom: pojok kiri-atas (150, 44), petak bersisi 22. */
const KS = { x: 150, y: 44, b: 3, kol: 4, s: 22 };

/* ------------------------------ 4. Salah: menjumlah ------------------------------ */
const SUARA_S1 = "Genta menyusun petak menjadi tiga baris, dan tiap baris berisi empat petak.";
const SUARA_S2 = "Satria berseru, luasnya tujuh, karena tiga ditambah empat!";
const SUARA_S3 = "Kalau aku salah, aku menyikat seluruh lantai kolam, katanya sambil menggulung lengan baju.";

export const ADEGAN_SALAH_TAMBAH: AdeganStory = {
  id: "salah-tambah",
  judul: "Satria menjumlah baris dan kolom",
  sumber: "Materi: salah langkah menjumlah",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Tiga Baris, Empat Petak"), ...tanah("tn", 150)),
      tambah("Genta", ...tokoh("ge", 40, 184, "Genta")),
      tambah("menyusun", ...petak("g", KS.x, KS.y, KS.b, KS.kol, KS.s)),
      tambah("tiga", teks("r3", 264, 78, "3 baris", 9, W.coklat)),
      tambah("empat", teks("c4", 194, 38, "4 petak", 9, W.coklat)),
    ),
    k(
      SUARA_S2,
      tambah("Satria", ...tokoh("sa", 100, 184, "Satria")),
      tambah("berseru,", emo("cm", 134, 168, E.cemberut, 18)),
      tambah("tujuh,", teks("tj", 194, 128, "luas 7?", 11, W.merah)),
      tambah("ditambah", teks("ft", 194, 142, "3 + 4 = 7", 9, W.merah)),
    ),
    k(
      SUARA_S3,
      tambah("salah,", teks("ks", 262, 128, "kalau salah:", 9, W.merah)),
      tambah("menyikat", teks("sj", 262, 142, "menyikat", 9, W.coklat), emo("sk", 262, 164, E.sikat, 20)),
      tambah("menggulung", emo("ku", 140, 166, E.kuat, 20)),
    ),
  ],
};

/* ------------------------------ 5. Baris kali kolom ------------------------------ */
const SUARA_M1 = "Laras menghitung petak satu per satu, dan hasilnya dua belas petak.";
const SUARA_M2 = "Setiap baris berisi empat petak, dan ada tiga baris, jadi tiga kali empat sama dengan dua belas.";
const SUARA_M3 = "Luasnya dua belas sentimeter persegi, bukan tujuh, karena banyak petak dihitung dengan perkalian.";

export const ADEGAN_BARIS_KOLOM: AdeganStory = {
  id: "baris-kolom",
  judul: "Tiga kali empat sama dengan dua belas",
  sumber: "Materi: baris kali kolom",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Menghitung Petak"), ...tanah("tn", 150)),
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("petak", ...petak("g", KS.x, KS.y, KS.b, KS.kol, KS.s)),
      tambah("satu", ...nomori("g", KS.x, KS.y, KS.b, KS.kol, KS.s)),
      tambah("hasilnya", teks("hs", 194, 128, "12 petak", 11, W.hijauTua)),
    ),
    k(
      SUARA_M2,
      hapus(0, "hs"),
      tambah("empat", teks("c4", 194, 38, "4 petak", 9, W.coklat)),
      tambah("tiga", teks("r3", 264, 78, "3 baris", 9, W.coklat)),
      tambah("kali", teks("ft", 194, 128, "3 × 4 = 12", 11, W.biru)),
    ),
    k(
      SUARA_M3,
      tambah("dua", teks("ls", 262, 128, "12 cm²", 13, W.hijauTua), emo("ok", 264, 102, E.benar, 18)),
      tambah("bukan", teks("bt", 262, 142, "bukan 7", 9, W.merah)),
      sorotkan("perkalian.", "ft"),
    ),
  ],
};

export const ID_NOMOR_BARIS_KOLOM = idNomori("g", 12);

/* ------------------------------ 6. Menyikat lantai ------------------------------ */
const SUARA_N1 = "Satria menepati taruhannya dan mulai menyikat lantai kolam yang licin.";
const SUARA_N2 = "Busa sabun menutupi sepatunya, dan ia terpeleset sambil tertawa.";
const SUARA_N3 = "Laras mencatat, luas persegi panjang dihitung dari baris kali kolom, bukan dijumlah.";
const BUSA = [
  { x: 40, y: 160, r: 5 },
  { x: 52, y: 154, r: 4 },
  { x: 66, y: 162, r: 5 },
  { x: 80, y: 156, r: 4 },
  { x: 92, y: 164, r: 5 },
  { x: 74, y: 148, r: 3.5 },
];

export const ADEGAN_MENYIKAT: AdeganStory = {
  id: "menyikat",
  judul: "Satria menyikat lantai kolam",
  sumber: "Materi: menepati taruhan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Satria Menyikat Lantai"), ...tanah("tn", 150)),
      tambah("Satria", ...tokoh("sa", 60, 184, "Satria")),
      tambah("menepati", emo("ku", 104, 128, E.kuat, 22)),
      tambah("menyikat", emo("sk", 100, 160, E.sikat, 24)),
      tambah("kolam", ...air("aw", 176, 88, 112, 50)),
      tambah("licin.", teks("lc", 84, 100, "licin", 10, W.ubinTua)),
    ),
    k(
      SUARA_N2,
      hapus(0, "lc"),
      tambah("Busa", ...BUSA.map((b, i) => bulat(`bs${i}`, b.x, b.y, b.r, W.putih, W.abu, { tebal: 1, z: 3 }))),
      tambah("terpeleset", teks("ps", 232, 114, "wuss!", 11, W.merah)),
      tambah("tertawa.", emo("tw", 140, 168, E.tertawa, 22)),
    ),
    k(
      SUARA_N3,
      tambah("Laras", ...tokoh("lr", 240, 184, "Laras")),
      tambah("mencatat,", kotak("ct", 14, 36, 130, 72, W.putih, W.coklat, { rx: 4, tebal: 1.8, z: 4 })),
      tambah("luas", teks("c0", 79, 58, "luas persegi panjang", 8, W.hijauTua, { z: 5 })),
      tambah("baris", teks("c1", 79, 80, "baris × kolom", 11, W.biru, { z: 5 })),
      tambah("bukan", teks("c2", 79, 100, "bukan dijumlah", 9, W.merah, { z: 5 })),
    ),
  ],
};
