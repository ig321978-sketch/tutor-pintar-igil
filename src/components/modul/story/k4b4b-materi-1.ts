import type { AdeganStory } from "./logika-story";
import { E, W, WL, airEmber, deretGelas, ember, emo, gelas, gelasUkur, idDeret, judul, kartu, kotak, lantai, panah, garis, pelampung, rak, teks, tokoh } from "./k4b4b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b4b-bantu";

/*
 * Cerita orisinal IGIL "Ember Pak Anto" (Kelas 4 Bab 4 Sub-Bab B, volume), akhir cerita Kolam Renang Tirta Ceria.
 * Naskah suara dari naskah/story-naskah-k4b4b.md. Bagian ini: rak ember Pak Anto, takaran dengan gelas yang berbeda, dan botol takar satu liter (seribu mililiter).
 */

/* ------------------------------ 1. Rak ember ------------------------------ */
const SUARA_E1 = "Pak Anto, petugas kolam berkaus biru muda, mengajak Satria, Laras, dan Genta ke rak ember.";
const SUARA_E2 = "Kolam anak harus diisi air untuk pesta renang akhir pekan.";
const SUARA_E3 = "Ia membawa gelas ukur dan bertanya, berapa banyak air yang muat di ember ini?";

export const ADEGAN_EMBER: AdeganStory = {
  id: "ember",
  judul: "Pak Anto di rak ember",
  sumber: "Materi: rak ember di tepi kolam",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Rak Ember Pak Anto"), ...lantai("lt", 150)),
      tambah("Anto", ...tokoh("pa", 262, 184, "Pak Anto")),
      tambah("mengajak", ...tokoh("sa", 36, 184, "Satria")),
      tambah("Laras", ...tokoh("la", 84, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 132, 184, "Genta")),
      tambah("rak", ...rak("rk", 56, 118, 150)),
      tambah("ember", ...ember("e1", 66, 80, 34, 38, 0.5), ...ember("e2", 112, 80, 34, 38, 0.8), ...ember("e3", 158, 80, 34, 38, 0.2)),
    ),
    k(
      SUARA_E2,
      tambah("Kolam", kotak("ka", 214, 36, 78, 50, W.langit, WL.airGaris, { rx: 4, tebal: 2, z: 1 }), teks("kat", 253, 64, "KOLAM ANAK", 8, W.biru, { z: 5 })),
      tambah("diisi", kotak("kair", 216, 58, 74, 26, WL.air, undefined, { rx: 0, tebal: 0, z: 2 })),
      tambah("air", emo("tt", 236, 104, E.tetes, 20)),
      tambah("pesta", emo("bl", 262, 26, E.balon, 22)),
      tambah("akhir", ...pelampung("pl1", 214, 114, 8)),
    ),
    k(
      SUARA_E3,
      tambah("gelas", ...gelasUkur("gu", 270, 110, 18, 38, 0.5)),
      tambah("bertanya", emo("q", 100, 60, E.tanya, 24)),
      ubah("muat", { id: "e2", sorot: true }),
      tambah("ember", teks("qt", 129, 66, "? ml", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Takaran dengan gelas yang berbeda ------------------------------ */
const SUARA_G1 = "Laras menakar air dengan gelas kecil, dan ember penuh setelah delapan gelas.";
const SUARA_G2 = "Satria memakai gelas besar, dan ember penuh setelah empat gelas.";
const SUARA_G3 = "Gelas berbeda menghasilkan banyak berbeda, jadi kita memakai satuan baku untuk volume.";

export const ADEGAN_GELAS: AdeganStory = {
  id: "gelas",
  judul: "Takaran dengan gelas berbeda",
  sumber: "Materi: gelas kecil dan gelas besar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Takar dengan Gelas"), ...lantai("lt", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("menakar", ...ember("eb", 214, 84, 44, 50, 0)),
      tambah("gelas", ...deretGelas("g", 24, 100, 8, 22, 14)),
      ubah("penuh", { id: "eb-a", ...airEmber(84, 50, 1) }),
      tambah("delapan", teks("t8", 100, 92, "8 gelas", 12, W.biru)),
    ),
    k(
      SUARA_G2,
      tambah("Satria", ...tokoh("sa", 84, 184, "Satria")),
      hapus("gelas", ...idDeret("g", 8), "t8"),
      tambah("gelas", ...[0, 1, 2, 3].map((i) => gelas(`b-${i}`, 24 + i * 40, 96, 22))),
      ubah("ember", { id: "eb", sorot: true }),
      tambah("empat", teks("t4", 100, 84, "4 gelas", 12, W.biru)),
    ),
    k(
      SUARA_G3,
      tambah("menghasilkan", teks("ne", 100, 66, "8 ≠ 4", 16, W.merah)),
      tambah("satuan", ...kartu("sb", 24, 124, 110, 22, W.krem, ["satuan baku"], 10)),
      ubah("untuk", { id: "sb-k", sorot: true }),
      tambah("volume", emo("ok", 180, 136, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 3. Botol takar satu liter ------------------------------ */
const SUARA_L1 = "Pak Anto memperlihatkan botol takar bertanda satu liter.";
const SUARA_L2 = "Isi satu liter dibagi menjadi seribu bagian kecil yang disebut mililiter.";
const SUARA_L3 = "Gelas ukur yang kecil biasanya memakai mililiter, dan ember besar memakai liter.";

export const ADEGAN_LITER: AdeganStory = {
  id: "liter",
  judul: "Botol takar satu liter",
  sumber: "Materi: liter dan mililiter",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Botol Takar"), ...lantai("lt", 150)),
      tambah("Anto", ...tokoh("pa", 262, 184, "Pak Anto")),
      tambah("botol", kotak("bt", 126, 72, 48, 66, W.langit, WL.airGaris, { rx: 8, tebal: 2, z: 1 }), kotak("bl", 138, 58, 24, 16, W.langit, WL.airGaris, { rx: 3, tebal: 2, z: 1 })),
      tambah("bertanda", garis("bg", 126, 96, 14, 0, W.merah, 2, { z: 3 })),
      tambah("satu", teks("bi", 150, 108, "1 l", 16, W.biru, { z: 3 })),
      tambah("liter", kotak("ba", 128, 98, 44, 38, WL.air, undefined, { rx: 0, tebal: 0, z: 2 })),
    ),
    k(
      SUARA_L2,
      tambah("dibagi", panah("ar1", 178, 100, 32, 0, W.ungu, 2.4)),
      tambah("seribu", teks("sr", 240, 86, "1.000 bagian", 11, W.merah)),
      tambah("kecil", emo("tt", 240, 112, E.tetes, 22)),
      tambah("mililiter", teks("ml", 240, 134, "1 ml", 12, W.hijauTua)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Satuan dan Takaran"), ...lantai("lt", 150), ...tokoh("pa", 262, 184, "Pak Anto"), ...gelasUkur("gu", 60, 70, 20, 60, 0.4)),
      tambah("mililiter", teks("ml", 70, 60, "ml", 14, W.hijauTua)),
      tambah("ember", ...ember("eb", 180, 76, 50, 54, 0.9)),
      tambah("liter@2", teks("li", 205, 66, "l", 14, W.ungu)),
    ),
  ],
};
