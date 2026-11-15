import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu } from "./k2b5A-gambar";
import { bersih, idx, k, tambah } from "./k2b5A-bantu";

/* ------------------------------ 15. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Ada tiga hal yang kita pelajari tentang setengah dari benda utuh.";
const SUARA_Z2 = "Pertama, benda utuh dibagi menjadi dua bagian sama besar, dan tiap bagian disebut setengah.";
const SUARA_Z3 = "Kedua, setengah ada pada banyak benda, seperti semangka, kue bolu, lingkaran, persegi, dan gelas air.";
const SUARA_Z4 = "Ketiga, melipat gambar memeriksa bagian sama besar. Bila pas menumpuk, bagian itu sama besar.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Z1, "Ada"), ...kartu("p0", 14, 30, 272, 36, W.emas, ["tiga hal tentang", "setengah dari benda utuh"], 9.2))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Pertama,"), ...kartu("p1", 14, 72, 272, 36, W.hijauMuda, ["dua bagian sama besar", "tiap bagian adalah setengah"], 9.2))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "Kedua,"), ...kartu("p2", 14, 114, 272, 36, W.pink, ["setengah ada pada banyak benda", "semangka, kue bolu, gelas air"], 9.2))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "Ketiga,"), ...kartu("p3", 14, 156, 272, 36, W.langit, ["melipat gambar memeriksa", "bagian yang sama besar"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah(idx(SUARA_Z5, "anak-anak!"), emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
