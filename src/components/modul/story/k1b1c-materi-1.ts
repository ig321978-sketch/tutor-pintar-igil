import type { AdeganStory } from "./logika-story";
import { E, W, atasTangga, emo, judul, kardus, kartu, kotak, orang, panahObj, tangga, teks } from "./k1b1c-materi-gambar";
import { hapus, k, langkahTangga, sorotkan, tambah } from "./k1b1c-bantu";

/*
 * Cerita orisinal IGIL "Tangga Gudang Loteng" (Kelas 1 Bab 1 Sub-Bab C, menghitung maju dan mundur), lanjutan
 * "Hadiah Nenek untuk Rak yang Lebih Sedikit". Masalah: sepuluh kardus bernomor harus dibawa naik tangga sepuluh anak tangga,
 * nomornya tercampur dan ada yang terlepas. Penyelesaian: hitung maju saat naik, mundur saat turun, mulai dari angka mana saja,
 * sebelum dan sesudah, melengkapi urutan. Hasil: kardus berurutan, dan Mamah menemukan perlengkapan pesta (jembatan ke Sub-Bab D).
 */

/** Tumpukan kardus tercampur: nomor acak dan dua yang terlepas. */
const CAMPUR = ["7", "2", "?", "5", "10", "1", "?", "9", "4", "3"];
const posCampur = (i: number) => ({ x: 26 + (i % 5) * 26, y: 52 + Math.floor(i / 5) * 28 });

/* ------------------------------ 1. Gudang di loteng ------------------------------ */
const SUARA_L1 = "Hari ini Mamah mengajak Igil, Kaka, dan Abang merapikan gudang di loteng.";
const SUARA_L2 = "Tangga ke loteng punya sepuluh anak tangga. Sepuluh kardus harus dibawa naik ke sana.";
const SUARA_L3 = "Masalahnya, kardus bernomor satu sampai sepuluh tercampur. Beberapa nomornya bahkan terlepas!";

export const ADEGAN_LOTENG: AdeganStory = {
  id: "gudang-loteng",
  judul: "Gudang di loteng",
  sumber: "Materi: masalah kardus di loteng",
  latar: "#FEF3C7",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Gudang di loteng"), ...orang("mm", 278, 168, E.mamah, "Mamah")), tambah("loteng.", kotak("lt", 252, 42, 46, 10, "#B45309", W.coklat, { rx: 2 }), emo("ru", 275, 36, E.rumah, 20))),
    k(SUARA_L2, tambah("Tangga", ...tangga("tg")), tambah("sepuluh", ...kartu("k10", 150, 150, 92, 22, W.emas, ["10 anak tangga"], 9)), tambah("kardus", emo("kd", 160, 110, E.kardus, 26))),
    k(
      SUARA_L3,
      hapus(0, "kd", "k10-k", "k10-t0"),
      tambah("kardus", ...CAMPUR.flatMap((n, i) => kardus(`kc${i}`, posCampur(i).x, posCampur(i).y, n))),
      sorotkan("terlepas!", "kc2", "kc6"),
    ),
  ],
};

/* ------------------------------ 2. Naik: menghitung maju ------------------------------ */
const SUARA_N1 = "Igil membawa kardus pertama naik tangga. Setiap anak tangga, Igil menghitung maju.";
const SUARA_N2 = "Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Sampai di loteng!";
const SUARA_N3 = "Menghitung maju artinya angkanya makin besar. Setiap langkah, satu lebih banyak.";
const MAJU = ["Satu,", "dua,", "tiga,", "empat,", "lima,", "enam,", "tujuh,", "delapan,", "sembilan,", "sepuluh."];

export const ADEGAN_NAIK: AdeganStory = {
  id: "naik-maju",
  judul: "Naik tangga: menghitung maju",
  sumber: "Materi: menghitung maju",
  latar: "#ECFDF5",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Naik sambil menghitung maju"), ...tangga("tg"), kotak("lt", 252, 42, 46, 10, "#B45309", W.coklat, { rx: 2 })), tambah("Igil", emo("ig", 20, 182, E.igil, 20)), tambah("kardus", emo("kb", 20, 158, E.kardus, 16))),
    k(SUARA_N2, hapus(0, "kb"), ...langkahTangga(SUARA_N2, "tg", "ig", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], MAJU, undefined, W.hijau), tambah("loteng!", emo("kb2", 275, 34, E.kardus, 16))),
    k(SUARA_N3, tambah("maju", panahObj("pm", 40, 120, 150, -70, W.hijau)), tambah("besar.", ...kartu("km", 14, 30, 140, 24, W.hijauMuda, ["maju: makin besar"], 9.4)), sorotkan("banyak.", "tga9")),
  ],
};

/* ------------------------------ 3. Turun: menghitung mundur ------------------------------ */
const SUARA_T1 = "Untuk kardus kedua, Igil turun lagi sambil menghitung mundur.";
const SUARA_T2 = "Sepuluh, sembilan, delapan, tujuh, enam, lima, empat, tiga, dua, satu. Sampai di lantai, nol.";
const SUARA_T3 = "Menghitung mundur artinya angkanya makin kecil. Setiap langkah, satu lebih sedikit.";
const MUNDUR = ["Sepuluh,", "sembilan,", "delapan,", "tujuh,", "enam,", "lima,", "empat,", "tiga,", "dua,", "satu.", "nol."];
const pucuk = atasTangga(9);

export const ADEGAN_TURUN: AdeganStory = {
  id: "turun-mundur",
  judul: "Turun tangga: menghitung mundur",
  sumber: "Materi: menghitung mundur",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Turun sambil menghitung mundur"), ...tangga("tg"), kotak("lt", 252, 42, 46, 10, "#B45309", W.coklat, { rx: 2 })), tambah("Igil", emo("ig", pucuk.x, pucuk.y - 2, E.igil, 20)), tambah("mundur.", ...kartu("kt", 14, 30, 140, 24, W.merahMuda, ["mundur dari 10"], 9.4))),
    k(SUARA_T2, hapus(0, "kt-k", "kt-t0"), ...langkahTangga(SUARA_T2, "tg", "ig", [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], MUNDUR, undefined, W.merah), tambah("nol.", teks("n0", 20, 160, "0", 12, W.merah))),
    k(SUARA_T3, tambah("mundur", panahObj("pd", 190, 50, -150, 70, W.merah)), tambah("kecil.", ...kartu("kk", 14, 30, 140, 24, W.merahMuda, ["mundur: makin kecil"], 9.4))),
  ],
};
