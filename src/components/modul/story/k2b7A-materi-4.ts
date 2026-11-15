import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, hitungKe, idKel, judul, kartu, kartuNyata, kartuTebak, kotak, lepasKe, selisihTebak, tandaDekat, teks, wadahKe, type Kel } from "./k2b7A-gambar";
import { bersih, hapus, idKartu, idx, k, sorotkan, tambah } from "./k2b7A-bantu";

/* ------------------------------ 12. Membuktikan dengan mengelompokkan ------------------------------ */
const IK: Kel = { id: "ik", w: 6, s: 2, x: 57, y: 70, kol: 6, warna: "#BAE6FD", warnaS: "#0EA5E9", emoji: "\u{1F420}" };
const IKAN = [
  [112, 64, "\u{1F420}"],
  [150, 52, "\u{1F41F}"],
  [188, 70, "\u{1F420}"],
  [124, 96, "\u{1F41F}"],
  [168, 100, "\u{1F420}"],
  [138, 124, "\u{1F420}"],
  [186, 128, "\u{1F41F}"],
] as const;
const SUARA_B1 = "Ayo kita buktikan dengan menghitung. Kita mengelompokkan ikan, sepuluh demi sepuluh.";
const SUARA_B2 = "Satu bungkus berisi sepuluh ikan. Itu satu puluhan.";
const SUARA_B3 = "Sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh, enam puluh. Ada enam bungkus.";
const SUARA_B4 = "Ikan yang sisa belum cukup untuk satu bungkus. Ada dua ikan lepas.";
const SUARA_B5 = "Jadi ada enam puluhan dan dua satuan. Banyak ikan seluruhnya enam puluh dua.";
const SUARA_B6 = "Cara ini lebih cepat daripada menghitung satu per satu. Hasilnya juga lebih mudah diperiksa.";

export const ADEGAN_BUKTIKAN: AdeganStory = {
  id: "buktikan",
  judul: "Membuktikan dengan mengelompokkan",
  sumber: "Materi: mengelompokkan sepuluh demi sepuluh",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Buktikan dengan menghitung")),
      tambah(idx(SUARA_B1, "ikan,"), kotak("kolam", 90, 36, 120, 108, "#BAE6FD", W.biru, { rx: 14 }), ...IKAN.map(([x, y, e], q) => emo(`if${q + 1}`, x, y, e, 18))),
      tambah(idx(SUARA_B1, "sepuluh"), ...kartu("bk0", 50, 160, 200, 30, W.emas, ["sepuluh demi sepuluh"], 12)),
    ),
    k(
      SUARA_B2,
      hapus(0, "kolam", ...IKAN.map((_, q) => `if${q + 1}`), ...idKartu("bk0")),
      tambah(idx(SUARA_B2, "bungkus"), ...wadahKe(IK, 1)),
      sorotkan(idx(SUARA_B2, "puluhan."), "ik-w1"),
    ),
    k(
      SUARA_B3,
      tambah(idx(SUARA_B3, "Sepuluh,"), hitungKe(IK, 1, "10", true)),
      tambah(idx(SUARA_B3, "dua"), ...wadahKe(IK, 2), hitungKe(IK, 2, "20", true)),
      tambah(idx(SUARA_B3, "tiga"), ...wadahKe(IK, 3), hitungKe(IK, 3, "30", true)),
      tambah(idx(SUARA_B3, "empat"), ...wadahKe(IK, 4), hitungKe(IK, 4, "40", true)),
      tambah(idx(SUARA_B3, "lima"), ...wadahKe(IK, 5), hitungKe(IK, 5, "50", true)),
      tambah(idx(SUARA_B3, "enam"), ...wadahKe(IK, 6), hitungKe(IK, 6, "60", true)),
    ),
    k(SUARA_B4, tambah(idx(SUARA_B4, "dua"), ...lepasKe(IK, 1)), tambah(idx(SUARA_B4, "lepas."), ...lepasKe(IK, 2))),
    k(
      SUARA_B5,
      tambah(idx(SUARA_B5, "enam"), ...kartu("bk1", 20, 140, 170, 30, W.emas, ["6 puluhan 2 satuan"], 11)),
      tambah(idx(SUARA_B5, "dua", 2), teks("bk2", 240, 166, "62", 30, W.merah)),
      sorotkan(idx(SUARA_B5, "seluruhnya"), ...idKel(IK)),
    ),
    k(SUARA_B6, tambah(idx(SUARA_B6, "cepat"), emo("bz", 150, 196, "⚡", 18)), tambah(idx(SUARA_B6, "diperiksa."), emo("by", 262, 116, "✅", 24))),
  ],
};

/* ------------------------------ 13. Selisih tebakan ------------------------------ */
const SUARA_S1 = "Banyak ikan sebenarnya enam puluh dua. Tebakan Kira lima puluh, dan tebakan Malosi enam puluh.";
const SUARA_S2 = "Dari lima puluh sampai enam puluh dua, selisihnya dua belas.";
const SUARA_S3 = "Dari enam puluh sampai enam puluh dua, selisihnya hanya dua.";
const SUARA_S4 = "Selisih Malosi lebih kecil, jadi tebakan Malosi lebih dekat dengan banyak ikan yang sebenarnya.";
const SUARA_S5 = "Jadi tebakan yang selisihnya lebih kecil adalah tebakan yang lebih dekat.";

export const ADEGAN_SELISIH: AdeganStory = {
  id: "selisih",
  judul: "Tebakan siapa yang lebih dekat?",
  sumber: "Materi: selisih tebakan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Tebakan dan banyak sebenarnya")),
      tambah(idx(SUARA_S1, "sebenarnya"), ...kartuNyata(62)),
      tambah(idx(SUARA_S1, "Kira"), ...kartuTebak(1, 10, "Kira", 50)),
      tambah(idx(SUARA_S1, "Malosi"), ...kartuTebak(2, 210, "Malosi", 60)),
    ),
    k(SUARA_S2, tambah(idx(SUARA_S2, "selisihnya"), selisihTebak(1, 10, 12))),
    k(SUARA_S3, tambah(idx(SUARA_S3, "selisihnya"), selisihTebak(2, 210, 2))),
    k(SUARA_S4, tambah(idx(SUARA_S4, "dekat"), tandaDekat(2, 210)), sorotkan(idx(SUARA_S4, "dekat"), "tb2-k")),
    k(SUARA_S5, tambah(idx(SUARA_S5, "kecil"), ...kartu("sk", 30, 160, 240, 30, W.emas, ["selisih kecil, lebih dekat"], 12))),
  ],
};

/* ------------------------------ 16. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Ada tiga hal yang kita pelajari tentang bilangan sampai seratus.";
const SUARA_Z2 = "Pertama, kita menghitung puluhan. Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan seratus.";
const SUARA_Z3 = "Kedua, kita membaca dan menulis bilangan. Puluhan ada di kiri dan satuan di kanan, misalnya lima puluh tiga.";
const SUARA_Z4 = "Ketiga, kita memperkirakan banyak benda. Kita menebak dulu, lalu membuktikan dengan mengelompokkan sepuluh demi sepuluh.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Z1, "Ada"), ...kartu("p0", 14, 30, 272, 36, W.emas, ["tiga hal tentang", "bilangan sampai seratus"], 9.2))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Pertama,"), ...kartu("p1", 14, 72, 272, 36, W.hijauMuda, ["menghitung puluhan", "10 satuan = 1 puluhan, 10 puluhan = 100"], 9.2))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "Kedua,"), ...kartu("p2", 14, 114, 272, 36, W.pink, ["puluhan di kiri, satuan di kanan", "contoh: 53"], 9.2))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "Ketiga,"), ...kartu("p3", 14, 156, 272, 36, W.langit, ["menebak, lalu membuktikan", "sepuluh demi sepuluh"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah(idx(SUARA_Z5, "anak-anak!"), emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
