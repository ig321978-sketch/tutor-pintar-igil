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

/* ------------------------------ 6. Mengaduk dan menimbang ------------------------------ */
const SUARA_M1 = "Satria menepati taruhannya dan mengaduk malam di dekat tungku sampai wajahnya memerah.";
const SUARA_M2 = "Bu Wulan menimbang malam satu per dua kilogram dan pewarna satu per empat kilogram, dan malam lebih berat.";
const SUARA_M3 = "Laras mencatat di kertas sakunya, pembilang satu, penyebut makin besar, bagian makin kecil, berat makin ringan.";
/** Satu bahan ditimbang: batang satu kilogram dibagi n bagian sama besar, satu bagian berarsir; pecahan dan "kg" di kanan. Pojok kiri-atas batang (34, y). */
const bahan = (id: string, y: number, n: number, nama: string, emoji: string) => [
  ...bagianKain(id, 34, y, 200, 26, n, [0]),
  emo(`${id}-e`, 18, y + 20, emoji, 16),
  teks(`${id}-nm`, 34, y - 4, nama, 12, W.coklat, { anchor: "start" }),
  ...pecahan(`${id}-f`, 256, y + 12, n, 12),
  teks(`${id}-kg`, 282, y + 22, "kg", 12, W.coklat),
];

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
      tambah("malam", teks("tm", 167, 104, "malam", 11, W.coklat), emo("up", 167, 88, E.uap, 22)),
      tambah("tungku", emo("ap", 167, 156, E.api, 14)),
      tambah("memerah.", emo("ke", 128, 140, E.keringat, 18)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Malam dan Pewarna"), ...tanah("tn", 150), ...tokoh("bw", 40, 184, "Bu Wulan")),
      tambah("malam", ...bahan("bm", 52, 2, "malam", E.lilin)),
      tambah("pewarna", ...bahan("bp", 100, 4, "pewarna", E.cat)),
      tambah("berat.", teks("bt", 190, 146, "malam lebih berat", 12, W.merah)),
      sorotkan("berat.", "bm-c0"),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Catatan Laras"), ...tanah("tn", 150), ...tokoh("lr", 60, 184, "Laras")),
      tambah("Laras", emo("cc", 100, 156, E.catat, 16)),
      tambah("kertas", ...kartu("cat", 140, 36, 150, 80, "#FFFBEB", [], 8)),
      tambah("pembilang", teks("c0", 215, 56, "pembilang: 1", 11, W.biru)),
      tambah("penyebut", teks("c1", 215, 72, "penyebut makin besar", 11, W.biru)),
      tambah("bagian", teks("c2", 215, 88, "bagian makin kecil", 11, W.biru)),
      tambah("berat", teks("c3", 215, 104, "berat makin ringan", 11, W.biru)),
    ),
  ],
};
