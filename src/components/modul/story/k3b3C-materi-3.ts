import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, karung, kodok, lantai, panah, teks, timbBadan, timbDigital, timbDuduk, tokoh } from "./k3b3C-gambar";
import { hapus, k, sorotkan, tambah } from "./k3b3C-bantu";

/*
 * Cerita orisinal IGIL "Pakan Bu Lastri" (Kelas 3 Bab 3 Sub-Bab C), cerita Kebun Binatang Mini.
 * Naskah suara dari naskah/story-naskah-k3b3c.md. Bagian ini: memilih timbangan dan penutup (jembatan ke Sub-Bab D).
 */

/* ------------------------------ 8. Memilih timbangan ------------------------------ */
const SUARA_P1 = "Bu Lastri memilih alat: biji dan wortel ditimbang di timbangan digital.";
const SUARA_P2 = "Karung pakan ditimbang di timbangan duduk, dan anak kambing di timbangan badan.";
const SUARA_P3 = "Timbangan dipilih sesuai bendanya, dan satuannya mengikuti beratnya.";

export const ADEGAN_PILIH_TIMBANGAN: AdeganStory = {
  id: "pilih-timbangan",
  judul: "Memilih timbangan",
  sumber: "Materi: memilih timbangan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Memilih Timbangan"), ...lantai("lt", 150), ...tokoh("bl", 130, 184, "Bu Lastri")),
      tambah("biji", emo("bj", 28, 54, E.biji, 24)),
      tambah("wortel", emo("wt", 28, 84, E.wortel, 24)),
      tambah("ditimbang", panah("a1", 46, 50, 164, 2, W.merah, 2), panah("a2", 46, 78, 164, -20, W.merah, 2)),
      tambah("timbangan", ...timbDigital("dg", 214, 40, "0", 56)),
    ),
    k(
      SUARA_P2,
      tambah("Karung", ...karung("kr", 12, 100, 26, 30)),
      tambah("duduk", panah("a3", 42, 112, 150, -8, W.merah, 2), ...timbDuduk("td", 240, 106, 18, 0)),
      tambah("kambing", emo("kb", 28, 152, E.kambing, 24)),
      tambah("badan.", panah("a4", 46, 146, 156, -8, W.merah, 2), ...timbBadan("bd", 204, 136, 62)),
    ),
    k(
      SUARA_P3,
      tambah("sesuai", emo("ok", 130, 100, E.benar, 22)),
      tambah("satuannya", teks("sg", 285, 58, "g", 14, W.hijauTua)),
      tambah("beratnya.", teks("s1", 285, 112, "kg", 14, W.biru), teks("s2", 285, 144, "kg", 14, W.biru)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Z1 = "Raka menepati taruhannya dan menyuapi semua burung beo, sampai beo itu menirukan suaranya.";
const SUARA_Z2 = "Besok Dokter Hana, dokter hewan, akan datang membawa timbangan kodok dan bandul.";
const SUARA_Z3 = "Menurutmu, kalau satu kilogram diisi gram, kira-kira berapa gram? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Bu Lastri!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Beo menirukan suara Raka",
  sumber: "Materi: penutup dan jembatan",
  latar: "#FFEDD5",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Taruhan Dipenuhi"), ...lantai("lt", 150), ...tokoh("rk", 30, 184, "Raka")),
      tambah("menyuapi", emo("sd", 62, 152, E.sendok, 18)),
      tambah("burung", emo("b1", 92, 152, E.beo, 24), emo("b2", 118, 152, E.beo, 24)),
      tambah("menirukan", teks("bb", 104, 124, "Raka!", 11, W.merah)),
      sorotkan("suaranya.", "bb"),
    ),
    k(
      SUARA_Z2,
      tambah("Besok", teks("bs", 210, 60, "besok", 10, W.ungu)),
      tambah("Hana,", ...tokoh("dh", 268, 150, "Dokter Hana", 22)),
      tambah("kodok", ...kodok("kd", 232, 118)),
    ),
    k(
      SUARA_Z3,
      hapus(0, "sd", "b1", "b2", "bb", "bs"),
      tambah("satu", teks("q", 150, 70, "1 kg = ? g", 16, W.merah)),
      tambah("berapa", emo("tq", 150, 100, E.tanya, 22)),
      tambah("Salsa,", ...tokoh("sl", 72, 184, "Salsa")),
      tambah("Bima,", ...tokoh("bm", 114, 184, "Bima")),
      tambah("Pak", ...tokoh("pj", 160, 184, "Pak Joko")),
      tambah("Lastri!", ...tokoh("bl", 214, 184, "Bu Lastri")),
      sorotkan("Terima", "rk"),
    ),
  ],
};
