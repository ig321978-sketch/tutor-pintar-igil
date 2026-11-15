import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu } from "./k2b6A-gambar";
import { bersih, idx, k, tambah } from "./k2b6A-bantu";

/* ------------------------------ 16. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Ada tiga hal yang kita pelajari tentang berat.";
const SUARA_Z2 = "Pertama, timbangan jungkat-jungkit dan gantungan baju membandingkan berat. Benda yang lebih berat turun.";
const SUARA_Z3 = "Kedua, ada kata lebih berat, lebih ringan, dan sama berat. Untuk tiga benda ada paling berat dan paling ringan.";
const SUARA_Z4 = "Ketiga, berat bisa diukur dengan satuan tidak baku. Satuan yang berbeda memberi hasil yang berbeda.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Z1, "Ada"), ...kartu("p0", 14, 30, 272, 36, W.emas, ["tiga hal tentang", "berat benda"], 9.2))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Pertama,"), ...kartu("p1", 14, 72, 272, 36, W.hijauMuda, ["timbangan membandingkan berat", "yang lebih berat turun"], 9.2))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "Kedua,"), ...kartu("p2", 14, 114, 272, 36, W.pink, ["lebih berat, lebih ringan, sama berat", "paling berat dan paling ringan"], 9.2))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "Ketiga,"), ...kartu("p3", 14, 156, 272, 36, W.langit, ["mengukur dengan satuan tidak baku", "satuan beda, hasil beda"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah(idx(SUARA_Z5, "anak-anak!"), emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
