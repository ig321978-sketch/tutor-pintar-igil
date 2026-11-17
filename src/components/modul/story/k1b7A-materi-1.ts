import type { AdeganStory } from "./logika-story";
import { E, W, WT, Y_TANAH, empatTiang, idBata, judul, kartu, geserTiang, orang, panah, pohon, putus, rangka, tanah, teks, tiang, tumpukBata, emo } from "./k1b7A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b7A-bantu";

/*
 * Cerita orisinal IGIL "Tiang dan Tangga" (Kelas 1 Bab 7 Sub-Bab A, membandingkan dan mengurutkan panjang), awal cerita Rumah Pohon Abang.
 * Naskah suara dari naskah/story-naskah-k1b7a.md. Bagian ini: pagi di halaman, garis awal yang sama, dan kata lebih.
 */

/* ------------------------------ 1. Pagi di halaman ------------------------------ */
const SUARA_P1 = "Pagi di halaman! Abang mulai membangun rumah pohon, dan Kakek Jaya menurunkan beberapa tiang kayu bercat.";
const SUARA_P2 = "Katanya, tiang harus berbaris dari yang pendek, supaya tangga menuju rumah pohon landai.";
const SUARA_P3 = "Mamah menoleh pada Igil. Tolong atur, dan beri alasannya, ya!";

export const ADEGAN_PAGI: AdeganStory = {
  id: "pagi-halaman",
  judul: "Pagi di halaman rumah pohon",
  sumber: "Materi: pagi di halaman dan masalah",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Rumah Pohon Abang"), tanah("tn")),
      tambah("halaman!", ...pohon("pj", 262, Y_TANAH)),
      tambah("rumah", ...rangka("rp", 262, 96)),
      tambah("Abang", ...orang("ab", 262, 176, E.abang, "Abang")),
      tambah("Kakek", ...orang("kj", 44, 176, E.kakek, "Kakek Jaya")),
      tambah("tiang", ...empatTiang()),
    ),
    k(
      SUARA_P2,
      tambah("berbaris", panah("pb", 96, 176, 186, 176, W.merah)),
      tambah("pendek,", teks("tp", 140, 166, "dari pendek ke tinggi", 9, W.merah)),
      tambah("tangga", putus("tg", 70, 150, 236, 102, W.merah, 2)),
      tambah("landai", teks("ld", 130, 70, "tangga landai", 9.4, W.biru)),
    ),
    k(
      SUARA_P3,
      tambah("Mamah", ...orang("mm", 212, 176, E.mamah, "Mamah")),
      tambah("Igil.", ...orang("ig", 150, 176, E.igil, "Igil")),
      tambah("atur,", ...kartu("at", 56, 30, 92, 20, W.krem, ["Tolong atur!"], 9)),
      tambah("alasannya,", ...kartu("al", 156, 30, 92, 20, W.pink, ["beri alasan"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Garis awal yang sama (salah langkah) ------------------------------ */
const SUARA_G1 = "Igil menunjuk tiang merah. Dia paling tinggi, ujungnya paling atas!";
const SUARA_G2 = "Kaka menggeleng. Tiang merah berdiri di atas tumpukan bata, yang lain di tanah.";
const SUARA_G3 = "Bandingkan dari garis awal yang sama, yaitu tanah. Setelah bata disingkirkan, tiang merah ternyata lebih pendek dari tiang kuning.";
const BATA = 3;
const Y_MERAH = Y_TANAH - BATA * 6;

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis-awal",
  judul: "Garis awal yang sama",
  sumber: "Materi: garis awal sama, salah langkah",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Siapa paling tinggi?"), tanah("tn"), ...tumpukBata("bt", 96, Y_TANAH, BATA)),
      tambah("Igil", ...orang("ig", 44, 176, E.igil, "Igil"), emo("tn2", 70, 150, "\u{1F449}", 20)),
      tambah("tiang", ...tiang("tm", 96, Y_MERAH, 56, WT.merah), ...tiang("tk", 124, Y_TANAH, 72, WT.kuning), ...tiang("th", 152, Y_TANAH, 56, WT.hijau), ...tiang("tb", 180, Y_TANAH, 36, WT.biru)),
      sorotkan("merah.", "tm"),
      tambah("paling", teks("pt", 232, 66, "paling tinggi?", 9, W.merah)),
      tambah("atas!", putus("gu", 80, Y_MERAH - 56, 200, Y_MERAH - 56, W.merah, 1.6), teks("gl", 232, 90, "ujung paling atas", 8.4, W.merah)),
    ),
    k(
      SUARA_G2,
      hapus(0, "tn2"),
      ubah(0, { id: "tm", sorot: false }),
      tambah("Kaka", ...orang("kk", 262, 176, E.kaka, "Kaka")),
      tambah("menggeleng.", emo("sl", 232, 118, E.salah, 22)),
      sorotkan("bata,", ...idBata("bt", BATA)),
      tambah("bata,", teks("lb", 66, 138, "bata", 9, WT.bata)),
      tambah("tanah.", teks("lt", 214, 164, "tanah", 9, W.hijau)),
    ),
    k(
      SUARA_G3,
      hapus(0, "sl", "pt", "gl", "gu", "kk", "kk-pita", "kk-n"),
      tambah("garis", putus("ga", 76, Y_TANAH, 204, Y_TANAH, W.merah, 2.4), teks("gt", 150, 166, "garis awal sama", 9, W.merah)),
      hapus("bata", ...idBata("bt", BATA), "lb"),
      ubah("bata", ...geserTiang("tm", 96, Y_TANAH, 56), { id: "tm", sorot: false }),
      tambah("pendek", putus("gk", 76, Y_TANAH - 72, 200, Y_TANAH - 72, W.biru, 1.4), teks("hs", 150, 40, "merah lebih pendek dari kuning", 9, W.biru)),
      sorotkan("pendek", "tk"),
    ),
  ],
};

/* ------------------------------ 3. Dua benda: kata lebih ------------------------------ */
const SUARA_L1 = "Tiang kuning dan tiang merah, kita bandingkan berdua saja.";
const SUARA_L2 = "Ujung kuning lebih atas, jadi kuning lebih tinggi. Merah lebih pendek dari kuning.";
const SUARA_L3 = "Untuk dua benda, kita memakai kata lebih.";

export const ADEGAN_LEBIH: AdeganStory = {
  id: "lebih",
  judul: "Dua benda memakai kata lebih",
  sumber: "Materi: lebih tinggi dan lebih pendek",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_L1,
      bersih(0),
      tambah(0, judul("Banding dua tiang"), tanah("tn")),
      tambah("kuning", ...tiang("tk", 110, Y_TANAH, 72, WT.kuning)),
      tambah("merah,", ...tiang("tm", 190, Y_TANAH, 56, WT.merah)),
      tambah("bandingkan", putus("ga", 70, Y_TANAH, 230, Y_TANAH, W.hijau, 2), teks("gt", 150, 166, "garis awal sama", 9, W.hijau)),
    ),
    k(
      SUARA_L2,
      tambah("Ujung", putus("gu", 110, Y_TANAH - 72, 200, Y_TANAH - 72, W.biru, 1.6), putus("gm", 190, Y_TANAH - 56, 190, Y_TANAH - 72, W.biru, 1.6)),
      tambah("tinggi.", ...kartu("kt", 20, 34, 116, 22, WT.kuning, ["kuning lebih tinggi"], 9.4)),
      sorotkan("tinggi.", "tk"),
      tambah("pendek", ...kartu("mp", 164, 34, 116, 22, "#FECACA", ["merah lebih pendek"], 9.4)),
      sorotkan("pendek", "tm"),
    ),
    k(
      SUARA_L3,
      hapus(0, "gu", "gm", "gt"),
      ubah(0, { id: "tk", sorot: false }, { id: "tm", sorot: false }),
      tambah("dua", teks("dn", 150, 118, "2 benda", 12, W.biru)),
      tambah("lebih.", ...kartu("kl", 118, 126, 64, 22, W.krem, ["kata: lebih"], 9)),
    ),
  ],
};
