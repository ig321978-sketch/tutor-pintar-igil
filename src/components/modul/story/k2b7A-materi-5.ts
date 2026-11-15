import type { AdeganStory } from "./logika-story";
import { W, judul, kartu, kartuNyata, kartuTebak, lepasKe, selisihTebak, tandaDekat, teks, kotak, wadahKe, type Kel } from "./k2b7A-gambar";
import { hapus, idPilihan, idx, k, pilihBaris, pilihKata, redamkan, sorotkan, tambah } from "./k2b7A-bantu";

/* ------------------------------ 13. Latihan 1: berapa banyak? ------------------------------ */
const LA: Kel = { id: "la", w: 3, s: 4, x: 105, y: 40, warna: "#FECACA", warnaS: "#EF4444" };
const SUARA_A1 = "Latihan satu. Lihat bola di layar. Ada tiga bungkus dan empat bola lepas.";
const SUARA_A2 = "Berapa banyak bola semuanya? Ketuk jawaban yang tepat.";
const SUARA_A3 = "Betul! Tiga puluhan dan empat satuan, yaitu tiga puluh empat.";
const SUARA_A4 = "Perhatikan cara membacanya. Kita baca tiga puluh dulu, lalu disambung dengan empat, jadi tiga puluh empat.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: berapa banyak bola?",
  sumber: "Materi: Latihan 1",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_A1, "tiga"), ...wadahKe(LA, 1), ...wadahKe(LA, 2), ...wadahKe(LA, 3)), tambah(idx(SUARA_A1, "empat"), ...[1, 2, 3, 4].flatMap((j) => lepasKe(LA, j)))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Berapa"), teks("tanya", 150, 114, "berapa banyak bola?", 12, W.ungu)), tambah(idx(SUARA_A2, "jawaban"), ...pilihKata(126, ["43", "34", "7"], 16))),
    k(SUARA_A3, sorotkan(idx(SUARA_A3, "Betul!"), "c2-k")),
    k(
      SUARA_A4,
      redamkan(0, "c2-k"),
      hapus(idx(SUARA_A4, "Perhatikan"), "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_A4, "tiga"), ...kartu("lm", 40, 120, 220, 30, W.emas, ["34 = 3 puluhan 4 satuan"], 12)),
    ),
  ],
};

/* ------------------------------ 14. Latihan 2: membaca lambang ------------------------------ */
const LB: Kel = { id: "lb", w: 5, s: 8, x: 68, y: 112, warna: W.krem, warnaS: W.emas, emoji: "⭐" };
const SUARA_B1 = "Latihan dua. Igil menunjukkan lambang bilangan di layar.";
const SUARA_B2 = "Bilangan ini dibaca apa? Ketuk jawaban yang tepat.";
const SUARA_B3 = "Betul! Lima puluh delapan. Angka lima ada di tempat puluhan, dan angka delapan ada di tempat satuan.";
const SUARA_B4 = "Kita periksa dengan gambar. Ada lima bungkus dan delapan bintang lepas, yaitu lima puluh delapan.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: membaca lambang bilangan",
  sumber: "Materi: Latihan 2",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_B1, "lambang"), kotak("lm-k", 100, 36, 100, 60, W.krem, W.biru, { rx: 10 }), teks("lm", 150, 82, "58", 38, W.merah))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "dibaca"), teks("tanya", 150, 108, "dibaca apa?", 12, W.ungu)), tambah(idx(SUARA_B2, "jawaban"), ...pilihBaris(116, ["delapan puluh lima", "lima puluh delapan", "lima puluh lima"], 12))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Betul!"), "c2-k")),
    k(
      SUARA_B4,
      redamkan(0, "c2-k"),
      hapus(idx(SUARA_B4, "Kita"), "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_B4, "lima"), ...[1, 2, 3, 4, 5].flatMap((q) => wadahKe(LB, q))),
      tambah(idx(SUARA_B4, "delapan"), ...[1, 2, 3, 4, 5, 6, 7, 8].flatMap((j) => lepasKe(LB, j))),
    ),
  ],
};

/* ------------------------------ 15. Latihan 3: tebakan yang lebih dekat ------------------------------ */
const SUARA_C1 = "Latihan tiga. Banyak kelereng sebenarnya empat puluh tujuh. Wei menebak empat puluh, dan Upe menebak lima puluh.";
const SUARA_C2 = "Tebakan siapa yang lebih dekat? Ketuk jawaban yang tepat.";
const SUARA_C3 = "Betul! Tebakan Upe lebih dekat dengan banyak kelereng.";
const SUARA_C4 = "Selisih Wei tujuh, dan selisih Upe tiga. Selisih yang lebih kecil berarti lebih dekat.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: tebakan yang lebih dekat",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Latihan 3")),
      tambah(idx(SUARA_C1, "sebenarnya"), ...kartuNyata(47, 40)),
      tambah(idx(SUARA_C1, "Wei"), ...kartuTebak(1, 10, "Wei", 40, 40)),
      tambah(idx(SUARA_C1, "Upe"), ...kartuTebak(2, 210, "Upe", 50, 40)),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Tebakan"), teks("tanya", 150, 114, "tebakan siapa yang lebih dekat?", 11, W.ungu)), tambah(idx(SUARA_C2, "jawaban"), ...pilihKata(126, ["Wei", "Upe", "sama dekat"], 12))),
    k(SUARA_C3, sorotkan(idx(SUARA_C3, "Betul!"), "c2-k")),
    k(
      SUARA_C4,
      redamkan(0, "c2-k"),
      hapus(idx(SUARA_C4, "Selisih"), "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_C4, "tujuh,"), selisihTebak(1, 10, 7, 100)),
      tambah(idx(SUARA_C4, "tiga."), selisihTebak(2, 210, 3, 100)),
      tambah(idx(SUARA_C4, "dekat."), tandaDekat(2, 210, 120)),
    ),
  ],
};
