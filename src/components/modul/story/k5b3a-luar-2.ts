import type { AdeganStory } from "./logika-story";
import { E, W, campur, emo, judul, kotak, panah, pecahan, tanah, teks, tokoh } from "./k5b3a-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b3a-bantu";
import { kartuCara } from "./k5b3a-luar-1";

/*
 * Cerita orisinal IGIL "Tiga Kantong Tepung Bu Ratna" (Kelas 5 Bab 3 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b3a.md. Bagian ini: Mixed to Improper (Campuran ke Biasa), terapannya, dan ringkasan memilih cara yang pas.
 */

/* ------------------------------ Mixed to Improper: konsep ------------------------------ */
const SUARA_V1 = "Cara ketiga, Mixed to Improper, atau Campuran ke Biasa.";
const SUARA_V2 = "Kita mengubah pecahan campuran menjadi pecahan biasa dengan satu langkah.";
const SUARA_V3 = "Kalikan bilangan bulat dengan penyebut, tambahkan pembilang, dan penyebutnya tetap.";
const SUARA_V4 = "Setelah itu, pecahan campuran bisa dibandingkan seperti pecahan biasa.";

export const ADEGAN_LUAR_BIASA: AdeganStory = {
  id: "luar-biasa",
  judul: "Mixed to Improper",
  sumber: "Metode global: Mixed to Improper (konsep)",
  latar: W.taman,
  ketukan: [
    k(SUARA_V1, ...kartuCara(SUARA_V1, "3", "Mixed to Improper", "Campuran ke Biasa", E.ubah)),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Satu Langkah"), ...tanah("tn", 150)),
      tambah("campuran", ...campur("a", 90, 80, 2, 1, 3, 24), teks("al", 90, 124, "campuran", 10, W.coklat)),
      tambah("menjadi", panah("ar", 130, 84, 46, 0, W.merah, 3)),
      tambah("biasa", ...pecahan("b", 218, 80, 7, 3, 24, W.merah), teks("bl", 218, 124, "biasa", 10, W.coklat)),
      tambah("langkah.", teks("sl", 150, 158, "satu langkah", 12, W.hijauTua)),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Tiga Pekerjaan"), ...tanah("tn", 150)),
      tambah("Kalikan", teks("f1", 150, 72, "2 × 3", 22, W.biru)),
      ubah("tambahkan", { id: "f1", isi: "2 × 3 + 1" }),
      ubah("tetap.", { id: "f1", isi: "2 × 3 + 1 = 7", warna: W.merah }),
      tambah("penyebutnya", teks("ft", 150, 112, "penyebut tetap: 3", 12, W.hijauTua)),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Dibandingkan")),
      tambah("campuran", ...pecahan("g1", 100, 90, 7, 3, 24, W.merah)),
      tambah("dibandingkan", teks("gt", 150, 94, ">", 28, W.biru)),
      tambah("biasa.", ...pecahan("g2", 200, 90, 5, 3, 24, W.hijauTua), teks("gb", 150, 146, "bandingkan pembilangnya", 11, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Mixed to Improper: terapan ------------------------------ */
const SUARA_W1 = "Fajar bertanya, mana yang lebih besar, tujuh per empat atau satu bulat satu per empat?";
const SUARA_W2 = "Bima mengubah yang campuran menjadi lima per empat, lalu membandingkan pembilangnya: tujuh lebih besar dari lima.";
const SUARA_W3 = "Cocok untuk membandingkan pecahan campuran dengan pecahan biasa, karena bentuknya jadi sama.";
const SUARA_W4 = "Kurang cocok bila bilangan bulatnya sudah berbeda, karena membandingkan bilangan bulat jauh lebih cepat.";

export const ADEGAN_LUAR_BIASA_TERAPAN: AdeganStory = {
  id: "luar-biasa-terapan",
  judul: "Biasa: kapan cocok",
  sumber: "Metode global: Mixed to Improper (terapan)",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Fajar Bertanya"), ...tanah("tn", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("besar,", emo("tq", 40, 128, E.tanya, 24)),
      tambah("tujuh", ...pecahan("h1", 120, 80, 7, 4, 22)),
      tambah("atau", teks("at", 168, 85, "atau", 11, W.coklat)),
      tambah("satu", ...campur("h2", 228, 80, 1, 1, 4, 22)),
    ),
    k(
      SUARA_W2,
      tambah("Bima", ...tokoh("bm", 262, 184, "Bima")),
      tambah("lima", ...pecahan("h3", 228, 128, 5, 4, 22, W.merah)),
      tambah("tujuh", teks("bd", 120, 132, "7 > 5", 18, W.hijauTua)),
    ),
    k(
      SUARA_W3,
      bersih(0),
      tambah(0, judul("Kapan Cocok"), ...tanah("tn", 150)),
      tambah("Cocok", emo("ok", 262, 80, E.benar, 24)),
      tambah("campuran", teks("cl", 140, 70, "campuran lawan biasa", 12, W.hijauTua)),
      tambah("sama.", teks("bs", 140, 110, "bentuk jadi sama", 12, W.coklat)),
    ),
    k(
      SUARA_W4,
      hapus(0, "ok", "cl", "bs"),
      tambah("Kurang", emo("xs", 262, 80, E.salah, 24)),
      tambah("berbeda,", ...campur("k1", 100, 82, 2, 1, 4, 18), ...campur("k2", 200, 82, 3, 1, 2, 18), teks("dn", 150, 88, "dan", 10, W.coklat)),
      tambah("jauh", teks("bu", 150, 140, "bulat 2 dan 3: langsung terlihat", 10, W.hijauTua)),
      tambah("cepat.", emo("kt", 150, 118, E.kuat, 20)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Ratna, dan masing-masing punya saat yang tepat.";
const SUARA_R2 = "Pecahan berjauhan, pakai Garis Bilangan. Penyebut berbeda, pakai Penyebut Sama. Campuran lawan biasa, pakai Campuran ke Biasa.";
const SUARA_R3 = "Apa pun caranya, ingat bahwa bilangan bulat yang lebih besar sudah menentukan pecahan campuran yang lebih besar.";
const SUARA_R4 = "Menurutmu, untuk membandingkan lima per tiga dan satu bulat dua per tiga, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Tiga Cara, Satu Hasil",
  sumber: "Ringkasan: tiga cara",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara, Satu Hasil"), ...tanah("tn", 150)),
      tambah("Tiga", teks("n3", 80, 44, "3 cara", 14, W.merah)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 14 + i * 88, 60, 80, 36, W.jingga, W.coklat, { rx: 4 }), teks(`c${i}-t`, 54 + i * 88, 83, "cara", 9, W.coklat)])),
      tambah("Bu", ...tokoh("bu", 150, 184, "Bu Ratna")),
      tambah("tepat.", emo("ok", 262, 130, E.benar, 24)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pilih Cara yang Pas"), ...tanah("tn", 150)),
      tambah("berjauhan,", teks("a1", 80, 70, "pecahan berjauhan", 9.5, W.coklat), emo("i1", 150, 66, E.penggaris, 18)),
      tambah("Garis", teks("b1", 220, 70, "Garis Bilangan", 10, W.hijauTua)),
      tambah("berbeda,", teks("a2", 80, 108, "penyebut berbeda", 9.5, W.coklat), emo("i2", 150, 104, "\u{1F522}", 18)),
      tambah("Sama.", teks("b2", 220, 108, "Penyebut Sama", 10, W.hijauTua)),
      tambah("lawan", teks("a3", 80, 146, "campuran lawan biasa", 9.5, W.coklat), emo("i3", 150, 142, E.ubah, 18)),
      tambah("Biasa.", teks("b3", 220, 146, "Campuran ke Biasa", 10, W.hijauTua)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Ingat Bulatnya"), ...tanah("tn", 150)),
      tambah("bulat", ...campur("r1", 100, 80, 3, 1, 4, 22)),
      tambah("lebih", teks("gt", 150, 86, "lebih", 11, W.coklat)),
      tambah("campuran", ...campur("r2", 200, 80, 2, 3, 4, 22)),
      tambah("besar.", emo("bt", 150, 140, E.bintang, 24), teks("bb", 150, 164, "bulat 3 lebih besar dari 2", 10, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Mana Paling Cepat?"), ...tanah("tn", 150)),
      tambah("lima", ...pecahan("q1", 90, 80, 5, 3, 24)),
      tambah("satu", ...campur("q2", 200, 80, 1, 2, 3, 24)),
      tambah("cepat?", teks("qq", 150, 144, "?", 34, W.merah), emo("tq", 262, 130, E.pikir, 24)),
    ),
  ],
};

