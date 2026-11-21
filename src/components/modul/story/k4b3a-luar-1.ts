import type { AdeganStory } from "./logika-story";
import { E, K, W, deret, emo, judul, kotak, lantaiPanggung, papanTulis, teks, tokoh } from "./k4b3a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b3a-bantu";

/*
 * Cerita orisinal IGIL "Deret Angklung Bu Ratri" (Kelas 4 Bab 3 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b3a.md. Bagian ini: pembuka (peti angklung), Draw the Next (Gambar Berikutnya), dan terapannya.
 */

export const NAMA_METODE = ["Draw the Next", "Difference Table", "Group by Five"] as const;
export const NAMA_METODE_ID = ["Gambar Berikutnya", "Tabel Selisih", "Susun Per Lima"] as const;

const SORE = "#7C2D12";
/** Judul adegan sore berwarna krem supaya terbaca di latar gelap. */
const judulSore = (isi: string) => judul(isi, W.krem);
/** Deret angklung berwarna kapur (papan tulis): `${id}-c{i}`. */
const deretKapur = (id: string, x0: number, y: number, n: number, dx = 22, h = 20, warna: string = K.kapur) => deret(id, x0, y, n, dx, h, warna);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di tepi panggung, Bu Ratri membuka peti angklung yang berisi susunan bernada beraturan.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya pola gambar mudah dilanjutkan, tanpa salah hitung.";
const SUARA_O3 = "Tiga cara itu: Draw the Next, Difference Table, dan Group by Five.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Gambar Berikutnya, Tabel Selisih, dan Susun Per Lima.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Peti angklung Bu Ratri",
  sumber: "Metode global: pembuka",
  latar: SORE,
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judulSore("Sore di Tepi Panggung"), ...lantaiPanggung("tr", 150), emo("bl", 262, 44, E.bulan, 26)),
      tambah("Bu", ...tokoh("br", 60, 184, "Bu Ratri", 30, W.krem)),
      tambah("peti", kotak("pt", 170, 124, 84, 26, "#C99A63", W.kayuTua, { rx: 3, z: 1 }), kotak("tt", 166, 114, 92, 10, "#A16207", W.kayuTua, { rx: 3, z: 2 })),
      tambah("susunan", ...deret("pe", 186, 114, 4, 20, 16)),
      tambah("beraturan.", teks("tr2", 212, 84, "teratur", 8, W.krem)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 110, 66, "3 cara", 12, W.krem)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 90 + i * 34, 74, 28, 24, "#FDE68A", W.bambuTua, { rx: 4 }), teks(`c${i}-t`, 104 + i * 34, 90, "cara", 6.4, W.coklat)])),
      tambah("mudah", emo("ok", 262, 100, E.benar, 20)),
      tambah("salah", emo("xs", 236, 100, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judulSore("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.krem)),
      tambah("Draw", teks("m0", 112, 70, "1. Draw the Next", 10, W.krem), emo("i0", 30, 72, "\u{1F3A8}", 16)),
      tambah("Difference", teks("m1", 112, 120, "2. Difference Table", 10, W.krem), emo("i1", 30, 122, "\u{1F4CB}", 16)),
      tambah("Group", teks("m2", 112, 170, "3. Group by Five", 10, W.krem), emo("i2", 30, 172, "\u{270B}", 16)),
    ),
    k(
      SUARA_O4,
      tambah("Nama", kotak("bk", 196, 52, 100, 130, "#9A3412", W.krem, { rx: 6, tebal: 1, z: -1 })),
      tambah("Gambar", teks("g0", 246, 70, "Gambar Berikutnya", 8.6, K.kapurMerah)),
      tambah("Tabel", teks("g1", 246, 120, "Tabel Selisih", 9, K.kapurMerah)),
      tambah("Susun", teks("g2", 250, 170, "Susun Per Lima", 9, K.kapurMerah), teks("g5", 210, 170, "5", 9, K.kapurMerah)),
    ),
  ],
};

/* ------------------------------ Draw the Next: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Draw the Next, atau Gambar Berikutnya.";
const SUARA_C2 = "Kita memandang gambar yang ada, mencari apa yang berubah dari satu deret ke deret berikutnya.";
const SUARA_C3 = "Lalu kita menggambar deret selanjutnya dengan perubahan yang sama persis.";
const SUARA_C4 = "Dengan cara ini, kita langsung melihat polanya bertambah atau berkurang.";

export const ADEGAN_LUAR_GAMBAR: AdeganStory = {
  id: "luar-gambar",
  judul: "Draw the Next: Gambar Berikutnya",
  sumber: "Metode global: Draw the Next (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Draw the Next"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Draw", teks("nm", 150, 50, "Draw the Next", 13, K.kapurMerah)),
      tambah("Gambar", teks("ni", 150, 66, "Gambar Berikutnya", 10, K.kapur), ...deretKapur("g1", 90, 100, 3)),
    ),
    k(
      SUARA_C2,
      tambah("memandang", emo("ey", 272, 46, E.mata, 18)),
      tambah("berubah", ...deretKapur("g2", 90, 126, 5)),
      tambah("satu", teks("l1", 50, 94, "deret 1", 8, K.kapur)),
      tambah("deret@2", teks("l2", 50, 120, "deret 2", 8, K.kapur)),
      sorotkan("berikutnya.", "g2-c3", "g2-c4"),
    ),
    k(
      SUARA_C3,
      tambah("menggambar", ...deretKapur("g3", 90, 152, 7, 22, 20, K.kapurBiru), teks("l3", 50, 146, "deret 3", 8, K.kapur)),
      tambah("perubahan", teks("pb", 245, 90, "perubahan sama", 8, K.kapurMerah)),
      sorotkan("persis.", "g3-c5", "g3-c6"),
    ),
    k(
      SUARA_C4,
      tambah("langsung", emo("ek", 270, 120, E.lampu, 18)),
      tambah("bertambah", teks("bt", 258, 134, "bertambah", 8, K.kapurBiru)),
      tambah("berkurang.", teks("bg", 258, 152, "atau berkurang", 7.4, K.kapurMerah)),
    ),
  ],
};

/* ------------------------------ Draw the Next: terapan ------------------------------ */
const SUARA_D1 = "Laras menggambar deret keempat setelah deret dua, empat, dan enam angklung.";
const SUARA_D2 = "Ia menambahkan dua angklung baru dan hasilnya delapan angklung.";
const SUARA_D3 = "Cocok untuk pola yang masih pendek, karena gambarnya mudah diperiksa mata.";
const SUARA_D4 = "Kurang cocok untuk deret yang sangat jauh, karena menggambar banyak benda memakan waktu.";

export const ADEGAN_LUAR_GAMBAR_TERAPAN: AdeganStory = {
  id: "luar-gambar-terapan",
  judul: "Gambar Berikutnya: kapan cocok",
  sumber: "Metode global: Draw the Next (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Deret Keempat Laras"), ...papanTulis("pt", 8, 28, 284, 132), ...tokoh("lr", 40, 184, "Laras")),
      tambah("keempat", kotak("gk", 86, 122, 164, 22, undefined, K.kapurMerah, { rx: 4, tebal: 1.4, putus: true, z: 2 }), teks("gq", 168, 140, "?", 16, K.kapurMerah)),
      tambah("dua,", ...deretKapur("g1", 90, 62, 2), teks("t1", 250, 58, "2", 12, K.kapur)),
      tambah("empat,", ...deretKapur("g2", 90, 88, 4), teks("t2", 250, 84, "4", 12, K.kapur)),
      tambah("enam", ...deretKapur("g3", 90, 114, 6), teks("t3", 250, 110, "6", 12, K.kapur)),
    ),
    k(
      SUARA_D2,
      hapus(0, "gk", "gq"),
      tambah("menambahkan", teks("pd", 272, 122, "+2", 12, K.kapurMerah)),
      tambah("angklung", ...deretKapur("g4", 90, 140, 8, 22, 20, K.kapurBiru)),
      sorotkan("baru", "g4-c6", "g4-c7"),
      tambah("delapan", teks("n8", 270, 138, "8", 12, K.kapurMerah)),
    ),
    k(
      SUARA_D3,
      tambah("Cocok", emo("ok", 100, 172, E.benar, 20)),
      tambah("pendek,", teks("pp", 170, 170, "pola pendek", 10, W.hijauTua)),
      tambah("mata.", emo("my", 232, 172, E.mata, 20)),
    ),
    k(
      SUARA_D4,
      hapus(0, "ok", "pp", "my"),
      tambah(0, emo("xs", 100, 172, E.salah, 20)),
      tambah("sangat", teks("dj", 170, 170, "deret 50", 10, W.merah)),
      tambah("waktu.", emo("kr", 232, 172, E.keringat, 20)),
    ),
  ],
};
