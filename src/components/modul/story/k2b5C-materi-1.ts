import type { AdeganStory } from "./logika-story";
import { E, W, WR, emo, jerami, judul, kartu, labu, label, pagar, petak, pindahTokoh, regu, rumput, tali, teks, tokoh } from "./k2b5C-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b5C-bantu";

/*
 * Cerita orisinal IGIL "Panen Raya Pak Joko" (Kelas 2 Bab 5 Sub-Bab C, seperempat dari benda utuh), akhir cerita Kebun Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b5c.md. Bagian ini: labu datang, salah garis, empat seperempat.
 */

/* ------------------------------ 1. Labu datang ------------------------------ */
const SUARA_L1 = "Hari Sabtu kebun sekolah merayakan panen raya, dan Pak Joko membawa satu labu besar.";
const SUARA_L2 = "Labu itu dibagi untuk empat regu, dan petak tanah kosong juga harus dibagi empat petak sama besar.";
const SUARA_L3 = "Kalau tidak adil, regu-regu bertengkar dan panen raya bisa batal!";

export const ADEGAN_LABU_DATANG: AdeganStory = {
  id: "labu-datang",
  judul: "Labu besar datang ke kebun",
  sumber: "Materi: labu datang ke kebun",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kebun Sekolah"), rumput("rm"), ...pagar("pg", 10, 136, 280, 26)),
      tambah("Sabtu", ...kartu("sb", 106, 30, 88, 18, W.krem, ["Hari Sabtu"], 9)),
      tambah("Joko", ...tokoh("pj", 50, 178, "Pak Joko")),
      tambah("satu", teks("n1", 92, 118, "1 labu", 10, W.merah)),
      tambah("labu", ...labu("lb", 92, 154, 18)),
      sorotkan("besar.", "lb"),
    ),
    k(
      SUARA_L2,
      hapus(0, "sb-k", "sb-t0"),
      redamkan(0, "lb"),
      tambah("empat", teks("n4", 150, 126, "4 regu", 10, W.merah)),
      tambah("regu,", ...regu("r1", 138, 176, WR[0]), ...regu("r2", 172, 176, WR[1]), ...regu("r3", 206, 176, WR[2]), ...regu("r4", 240, 176, WR[3])),
      tambah("petak", ...petak("pt", 196, 34, 70)),
      tambah("empat@2", teks("n5", 231, 124, "4 petak", 10, W.merah)),
      sorotkan("besar.", "pt"),
    ),
    k(
      SUARA_L3,
      redamkan(0, "pt"),
      tambah("adil,", emo("x1", 231, 78, E.salah, 22)),
      tambah("bertengkar", emo("m1", 138, 148, E.marah, 20), emo("m2", 240, 148, E.marah, 20)),
      tambah("batal!", ...kartu("bt", 80, 48, 100, 20, W.merahMuda, ["Panen batal!"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Salah garis ------------------------------ */
const SUARA_S1 = "Chacha membentangkan dua tali di petak tanah untuk membaginya menjadi empat. Tali pertama pas di tengah, tetapi tali kedua miring.";
const SUARA_S2 = "Dika menunjuk. Chacha, empat petak ini tidak sama besar!";
const SUARA_S3 = "Chacha melompati tali itu, tersangkut, dan jatuh ke tumpukan jerami sambil tertawa.";

export const ADEGAN_SALAH_GARIS: AdeganStory = {
  id: "salah-garis",
  judul: "Tali kedua miring",
  sumber: "Materi: salah garis",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      bersih(0),
      tambah(0, judul("Membagi Petak Tanah"), rumput("rm")),
      tambah("Chacha", ...tokoh("ch", 50, 178, "Chacha")),
      tambah("dua", teks("n2", 250, 60, "2 tali", 10, W.merah)),
      tambah("petak", ...petak("pt", 100, 36, 100)),
      tambah("empat.", teks("n4", 250, 80, "4 petak", 10, W.merah)),
      tambah("pertama", tali("t1", 150, 36, 0, 100)),
      sorotkan("tengah,", "t1"),
      tambah("kedua", tali("t2", 100, 56, 100, 60)),
      sorotkan("miring.", "t2"),
    ),
    k(
      SUARA_S2,
      tambah("Dika", ...tokoh("dk", 250, 176, "Dika")),
      tambah("menunjuk.", emo("jr", 224, 150, E.jari, 20)),
      tambah("tidak", emo("x1", 125, 60, E.salah, 14), emo("x2", 125, 112, E.salah, 14), emo("x3", 178, 76, E.salah, 14), emo("x4", 178, 130, E.salah, 14)),
      sorotkan("sama", "pt"),
    ),
    k(
      SUARA_S3,
      hapus(0, "x1", "x2", "x3", "x4", "jr"),
      ubah("melompati", ...pindahTokoh("ch", 130, 28, "Chacha")),
      ubah("tersangkut,", ...pindahTokoh("ch", 190, 104, "Chacha")),
      tambah("tumpukan", ...jerami("jm", 60, 186, 56)),
      ubah("jatuh", ...pindahTokoh("ch", 60, 168, "Chacha")),
      ubah("tertawa.", { id: "ch", isi: E.tertawa }),
    ),
  ],
};

/* ------------------------------ 3. Empat seperempat ------------------------------ */
const SUARA_E1 = "Nia punya cara. Bagi dulu menjadi dua bagian sama besar. Itu setengah.";
const SUARA_E2 = "Lalu bagi setiap setengah menjadi dua bagian sama besar lagi.";
const SUARA_E3 = "Sekarang ada empat bagian sama besar, dan setiap bagian disebut seperempat.";

export const ADEGAN_EMPAT_SEPEREMPAT: AdeganStory = {
  id: "empat-seperempat",
  judul: "Empat bagian sama besar",
  sumber: "Materi: empat bagian, seperempat",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Dua Bagian Sama Besar"), rumput("rm"), ...petak("pt", 100, 36, 100)),
      tambah("Nia", ...tokoh("ni", 40, 176, "Nia")),
      tambah("Bagi", tali("t1", 150, 36, 0, 100)),
      tambah("dua", teks("n2", 250, 60, "2 bagian", 10, W.merah)),
      tambah("setengah.", ...label("h1", 125, 90, "setengah"), ...label("h2", 175, 90, "setengah")),
    ),
    k(
      SUARA_E2,
      hapus(0, ...["h1-k", "h1-t", "h2-k", "h2-t"]),
      tambah("bagi", tali("t2", 100, 86, 100, 0)),
      tambah("dua", teks("n22", 250, 100, "2 + 2", 10, W.merah)),
      sorotkan("lagi.", "t1", "t2"),
    ),
    k(
      SUARA_E3,
      redamkan(0, "t1", "t2"),
      tambah("empat", teks("n4", 250, 140, "4 bagian", 10, W.merah)),
      tambah("setiap", ...label("q1", 125, 61, "seperempat", 7), ...label("q2", 175, 61, "seperempat", 7)),
      tambah("disebut", ...label("q3", 125, 111, "seperempat", 7), ...label("q4", 175, 111, "seperempat", 7)),
      tambah("seperempat.", emo("ok", 250, 176, E.benar, 22)),
    ),
  ],
};
