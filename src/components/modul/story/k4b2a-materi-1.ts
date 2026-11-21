import type { AdeganStory } from "./logika-story";
import { E, W, bagianKain, canting, emo, judul, kainGantung, kotak, pecahan, panah, papanNama, tanah, taliJemuran, teks, tokoh } from "./k4b2a-gambar";
import { k, redamkan, sorotkan, tambah, ubah } from "./k4b2a-bantu";

/*
 * Cerita orisinal IGIL "Kain Lipat Bu Wulan" (Kelas 4 Bab 2 Sub-Bab A, pecahan berpembilang satu), awal cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2a.md. Bagian ini: sanggar, lipat dua, lipat empat.
 */

/* ------------------------------ 1. Sanggar ------------------------------ */
const SUARA_S1 = "Pak Hendro mengajak Satria, Laras, dan Genta ke Sanggar Batik Kampung Mekar untuk membantu Bu Wulan.";
const SUARA_S2 = "Di halaman sanggar, kain putih tergantung pada tali jemuran, siap dibatik.";
const SUARA_S3 = "Bu Wulan memegang canting dan berkata, kain ini harus dilipat dulu menjadi bagian sama besar.";

export const ADEGAN_SANGGAR: AdeganStory = {
  id: "sanggar",
  judul: "Tiba di Sanggar Batik",
  sumber: "Materi: sanggar batik",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Sanggar Batik Kampung Mekar"), ...tanah("tn", 150)),
      tambah("Hendro", ...tokoh("ph", 28, 184, "Pak Hendro")),
      tambah("Satria,", ...tokoh("sa", 72, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 108, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 144, 184, "Genta")),
      tambah("Sanggar", ...papanNama("pn", 170, 40, 120)),
    ),
    k(
      SUARA_S2,
      tambah("halaman", ...taliJemuran("tj", 20, 160, 84)),
      tambah("kain", kainGantung("kg1", 38, 86, 26, 36), kainGantung("kg2", 78, 86, 26, 36), kainGantung("kg3", 118, 86, 26, 36)),
      tambah("tali", teks("sb", 232, 96, "siap dibatik", 8, W.unguTua)),
      tambah("dibatik.", emo("bg", 262, 110, E.bunga, 18)),
    ),
    k(
      SUARA_S3,
      tambah(0, ...tokoh("bw", 214, 184, "Bu Wulan")),
      tambah("canting", ...canting("ct", 240, 152)),
      tambah("berkata,", emo("bc", 262, 138, E.bicara, 18)),
      tambah("dilipat", kainGantung("kn", 176, 112, 70, 24), teks("dl", 232, 108, "dilipat dulu", 8, W.merah)),
      tambah("besar.", teks("sm", 211, 146, "sama besar", 8, W.unguTua)),
    ),
  ],
};

/* ------------------------------ 2. Lipat dua ------------------------------ */
const SUARA_D1 = "Bu Wulan melipat kain menjadi dua bagian yang sama besar.";
const SUARA_D2 = "Satu bagian dari dua bagian sama besar kita tulis satu per dua.";
const SUARA_D3 = "Angka satu di atas disebut pembilang, dan angka dua di bawah disebut penyebut.";

export const ADEGAN_LIPAT_DUA: AdeganStory = {
  id: "lipat-dua",
  judul: "Lipat dua: satu per dua",
  sumber: "Materi: lipat dua",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Lipat Dua"), ...tanah("tn", 150), ...tokoh("bw", 40, 184, "Bu Wulan")),
      tambah("kain", ...bagianKain("kn", 30, 56, 240, 60, 1, [])),
      tambah("dua", ...bagianKain("kn", 30, 56, 240, 60, 2, []), teks("n2", 150, 42, "2 bagian", 11, W.merah)),
      tambah("besar.", teks("sb", 150, 136, "sama besar", 10, W.unguTua)),
    ),
    k(
      SUARA_D2,
      { at: 0, hapus: ["sb", "n2"] },
      ubah("Satu", { id: "kn-c0", warna: W.arsir }),
      tambah("tulis", ...pecahan("pc", 150, 152, 2, 18)),
    ),
    k(
      SUARA_D3,
      sorotkan("atas", "pc-a"),
      tambah("pembilang,", teks("lb1", 222, 146, "pembilang", 10, W.merah), panah("p1", 190, 144, -22, 0, W.merah, 2)),
      redamkan("dan", "pc-a"),
      sorotkan("bawah", "pc-b"),
      tambah("penyebut.", teks("lb2", 222, 172, "penyebut", 10, W.hijauTua), panah("p2", 190, 170, -22, 0, W.hijauTua, 2)),
    ),
  ],
};

/* ------------------------------ 3. Lipat empat ------------------------------ */
const SUARA_E1 = "Laras melipat kain itu sekali lagi sehingga menjadi empat bagian sama besar.";
const SUARA_E2 = "Satu bagian saja kita arsir, jadi pecahannya satu per empat.";
const SUARA_E3 = "Penyebutnya empat, karena seluruh kain terbagi menjadi empat bagian.";

export const ADEGAN_LIPAT_EMPAT: AdeganStory = {
  id: "lipat-empat",
  judul: "Lipat empat: satu per empat",
  sumber: "Materi: lipat empat",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Lipat Empat"), ...tanah("tn", 150), ...tokoh("lr", 40, 184, "Laras")),
      tambah("kain", ...bagianKain("kn", 30, 56, 240, 60, 2, [])),
      tambah("sekali", emo("ul", 250, 140, E.ulang, 18)),
      tambah("empat", ...bagianKain("kn", 30, 56, 240, 60, 4, []), teks("n4", 150, 42, "4 bagian", 11, W.merah)),
    ),
    k(
      SUARA_E2,
      ubah("arsir,", { id: "kn-c0", warna: W.arsir }),
      tambah("satu@2", ...pecahan("pc", 150, 152, 4, 18)),
    ),
    k(
      SUARA_E3,
      sorotkan("Penyebutnya", "pc-b"),
      tambah("seluruh", teks("sl", 150, 51, "seluruh kain", 9, W.coklat)),
      sorotkan("terbagi", "kn-c0", "kn-c1", "kn-c2", "kn-c3"),
      tambah("empat@2", kotak("br", 30, 122, 240, 5, W.emas, W.coklat, { rx: 2, tebal: 1, z: 3 })),
    ),
  ],
};
