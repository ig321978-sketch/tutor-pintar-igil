import type { AdeganStory } from "./logika-story";
import { E, W, deret, deretEmo, emo, judul, kartu, kataKe, label, orang, pesan, teks } from "./k1b2c-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b2c-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Tetangga" (Kelas 1 Bab 2 Sub-Bab C, soal cerita penjumlahan), akhir cerita Kebun Sayur Mamah
 * sesudah "Panen Pertama dan Keranjang Sepuluh". Masalah: pesanan tetangga datang sebagai cerita lewat pesan suara; kiriman harus tepat.
 * Penyelesaian: baca cerita, cari dua bilangan, pilih tanda tambah, tulis kalimat, jawab dengan kalimat lengkap, periksa.
 */

/* ------------------------------ 1. Pesan suara dari tetangga ------------------------------ */
const SUARA_P1 = "Pagi ini ponsel Mamah berbunyi. Ada pesan suara dari tetangga yang ingin memesan sayur.";
const SUARA_P2 = "Pesanannya berbentuk cerita. Mamah harus menghitung dengan teliti supaya kirimannya tepat.";
const SUARA_P3 = "Igil, Kaka, dan Abang membantu. Mereka memakai langkah: baca, cari bilangan, tulis, jawab, lalu periksa.";
const LANGKAH = ["baca", "cari bilangan", "tulis", "jawab", "periksa"];

export const ADEGAN_PESAN: AdeganStory = {
  id: "pesan-suara",
  judul: "Pesan suara dari tetangga",
  sumber: "Materi: masalah pesanan berbentuk cerita",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Pesan dari tetangga")), tambah("ponsel", emo("hp", 150, 96, E.ponsel, 40)), tambah("Mamah", ...orang("mm", 60, 110, E.mamah, "Mamah")), tambah("tetangga", emo("rm", 240, 110, E.rumah, 34))),
    k(SUARA_P2, tambah("cerita.", ...kartu("ct", 70, 140, 160, 26, W.emas, ["pesanan = cerita"], 10)), tambah("teliti", emo("kc", 150, 52, E.kaca, 26))),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Langkah soal cerita")),
      tambah("Igil,", ...orang("ig", 40, 186, E.igil, "Igil", 24)),
      tambah("Kaka,", ...orang("kk", 150, 186, E.kaka, "Kaka", 24)),
      tambah("Abang", ...orang("ab", 260, 186, E.abang, "Abang", 24)),
      ...LANGKAH.map((l, i) => tambah(["baca,", "cari", "tulis,", "jawab,", "periksa."][i], ...label(`lk${i}`, 20 + i * 18, 34 + i * 26, 150, `${i + 1}. ${l}`, [W.hijauMuda, W.langit, W.emas, W.pink, W.lavender][i], 10))),
    ),
  ],
};

/* ------------------------------ 2. Baca dan cari dua bilangan ------------------------------ */
const ISI_1 = "Saya mau empat tomat untuk sup dan tiga tomat untuk sambal. Berapa tomat semuanya?";
const SUARA_B1 = "Pesan pertama dari tetangga sebelah: saya mau empat tomat untuk sup dan tiga tomat untuk sambal.";
const SUARA_B2 = "Kaka membaca pelan-pelan dan mencari bilangan. Bilangan pertama empat, bilangan kedua tiga.";
const SUARA_B3 = "Yang ditanya, berapa tomat semuanya. Kata semuanya berarti menggabungkan, jadi kita memakai tanda tambah.";

export const ADEGAN_BACA: AdeganStory = {
  id: "baca-cari",
  judul: "Baca dan cari dua bilangan",
  sumber: "Materi: membaca dan mencari bilangan",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Pesan pertama")), tambah("Pesan", ...pesan("ps", 20, 34, 260, ISI_1, 10.5)), tambah("sup", ...deretEmo(E.tomat, "ta", deret(4, 50, 26, 150), 20)), tambah("sambal.", ...deretEmo(E.tomat, "tb", deret(3, 186, 26, 150), 20))),
    k(SUARA_B2, tambah("Kaka", emo("kc", 262, 128, E.kaca, 22)), sorotkan("pertama", `ps-w${kataKe(ISI_1, "empat")}`), sorotkan("kedua", `ps-w${kataKe(ISI_1, "tiga")}`), tambah("tiga.", teks("b1", 88, 182, "4", 14, W.merah), teks("b2", 212, 182, "3", 14, W.merah))),
    k(SUARA_B3, sorotkan("ditanya,", `ps-w${kataKe(ISI_1, "berapa")}`, `ps-w${kataKe(ISI_1, "semuanya")}`), tambah("tambah.", teks("tt", 150, 182, "+", 20, W.merah))),
  ],
};
