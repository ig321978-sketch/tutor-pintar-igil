import type { AdeganStory } from "./logika-story";
import { E, W, bagianKain, bulat, emo, garis, judul, kartu, pecahan, panciMalam, tanah, teks, tokoh } from "./k4b2a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b2a-bantu";

/*
 * Cerita orisinal IGIL "Kain Lipat Bu Wulan" (Kelas 4 Bab 2 Sub-Bab A), awal cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2a.md. Bagian ini: salah langkah dan taruhan (satu per delapan), membandingkan dua potongan, Satria mengaduk malam.
 */

/* ------------------------------ 4. Salah delapan ------------------------------ */
const SUARA_L1 = "Genta melipat kain menjadi delapan bagian dan menulis satu per delapan.";
const SUARA_L2 = "Satria berseru, delapan lebih besar dari empat, jadi satu per delapan pasti lebih besar!";
const SUARA_L3 = "Kalau aku salah, aku mengaduk malam sendirian sampai sore, katanya sambil bertolak pinggang.";

export const ADEGAN_SALAH_DELAPAN: AdeganStory = {
  id: "salah-delapan",
  judul: "Satria yakin delapan lebih besar",
  sumber: "Materi: salah langkah dan taruhan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lipat Delapan"), ...tanah("tn", 150), ...tokoh("ge", 40, 184, "Genta")),
      tambah("kain", ...bagianKain("kn", 30, 56, 240, 60, 1, [])),
      tambah("delapan", ...bagianKain("kn", 30, 56, 240, 60, 8, [0]), teks("n8", 150, 42, "8 bagian", 11, W.merah)),
      tambah("menulis", ...pecahan("pc", 150, 152, 8, 18)),
    ),
    k(
      SUARA_L2,
      tambah(0, ...tokoh("sa", 240, 184, "Satria")),
      tambah("delapan", teks("bn", 232, 136, "8 > 4!", 14, W.merah)),
      tambah("jadi", emo("pk", 266, 134, E.kuat, 18)),
      sorotkan("pasti", "pc-b"),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Taruhan Satria"), ...tanah("tn", 150), ...tokoh("sa", 236, 184, "Satria")),
      tambah("mengaduk", ...panciMalam("pm", 130, 114)),
      tambah("malam", teks("tm", 147, 104, "malam", 9, W.coklat), emo("ap", 147, 156, E.api, 14)),
      tambah("sore,", emo("sr", 60, 62, E.senja, 24), teks("ss", 60, 86, "sampai sore", 9, W.oranye)),
      tambah("pinggang.", emo("tp", 262, 134, E.kuat, 18)),
    ),
  ],
};

/* ------------------------------ 5. Membandingkan ------------------------------ */
const SUARA_B1 = "Genta menaruh dua potongan kain berdampingan, satu per empat dan satu per delapan.";
const SUARA_B2 = "Potongan satu per delapan ternyata lebih pendek, karena kain dibagi menjadi bagian yang lebih banyak.";
const SUARA_B3 = "Makin banyak bagian, makin kecil setiap bagiannya, jadi satu per empat lebih besar.";

export const ADEGAN_BANDINGKAN: AdeganStory = {
  id: "bandingkan",
  judul: "Dua potongan berdampingan",
  sumber: "Materi: membandingkan potongan",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Dua Potongan Kain"), ...tanah("tn", 150), ...tokoh("ge", 100, 184, "Genta")),
      tambah("dua", teks("n2", 150, 40, "2 potongan", 10, W.merah)),
      tambah("satu", ...bagianKain("k4", 40, 50, 240, 30, 4, [0]), ...pecahan("pa", 20, 66, 4, 12)),
      tambah("satu@2", ...bagianKain("k8", 40, 104, 240, 30, 8, [0]), ...pecahan("pb", 20, 120, 8, 12)),
    ),
    k(
      SUARA_B2,
      tambah("delapan", garis("g4", 100, 44, 0, 96, W.merah, 1.5, { putus: true }), garis("g8", 70, 44, 0, 96, "#2563EB", 1.5, { putus: true })),
      tambah("pendek,", teks("lp", 190, 94, "lebih pendek", 9, W.biru)),
      sorotkan("banyak.", "k8-c1", "k8-c2", "k8-c3", "k8-c4", "k8-c5", "k8-c6", "k8-c7"),
    ),
    k(
      SUARA_B3,
      hapus(0, "lp", "n2"),
      tambah("Makin", teks("tk", 190, 94, "makin banyak, makin kecil", 8, W.biru)),
      tambah("setiap", ...tokoh("sa", 200, 184, "Satria"), emo("pk", 226, 150, E.pikir, 18)),
      tambah("besar.", teks("bs", 150, 40, "1/4 > 1/8", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Mengaduk ------------------------------ */
const SUARA_M1 = "Satria menepati taruhannya dan mengaduk malam di dekat tungku.";
const SUARA_M2 = "Uap panas membuat wajah Satria memerah, dan semua orang tertawa.";
const SUARA_M3 = "Laras mencatat di kertas sakunya, pembilang satu, penyebut makin besar, bagian makin kecil.";

export const ADEGAN_MENGADUK: AdeganStory = {
  id: "mengaduk",
  judul: "Satria mengaduk malam",
  sumber: "Materi: taruhan ditepati",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Satria Mengaduk"), ...tanah("tn", 150), ...tokoh("sa", 100, 184, "Satria")),
      tambah("mengaduk", ...panciMalam("pm", 150, 114), bulat("ad", 130, 130, 3, W.emas, W.coklat)),
      tambah("malam", teks("tm", 167, 104, "malam", 9, W.coklat)),
      tambah("tungku.", emo("ap", 167, 156, E.api, 14)),
    ),
    k(
      SUARA_M2,
      tambah("Uap", emo("up", 167, 88, E.uap, 22)),
      tambah("memerah", emo("ke", 128, 140, E.keringat, 18)),
      tambah("semua", ...tokoh("lr", 210, 184, "Laras"), ...tokoh("bw", 256, 184, "Bu Wulan")),
      tambah("tertawa.", emo("t1", 210, 142, E.tertawa, 16), emo("t2", 256, 142, E.tertawa, 16)),
    ),
    k(
      SUARA_M3,
      tambah("Laras", emo("cc", 232, 142, E.catat, 16)),
      tambah("kertas", ...kartu("cat", 160, 34, 130, 66, "#FFFBEB", [], 8)),
      tambah("pembilang", teks("c0", 225, 54, "pembilang: 1", 8, W.biru)),
      tambah("penyebut", teks("c1", 225, 68, "penyebut makin besar", 8, W.biru)),
      tambah("bagian", teks("c2", 225, 82, "bagian makin kecil", 8, W.biru)),
    ),
  ],
};
