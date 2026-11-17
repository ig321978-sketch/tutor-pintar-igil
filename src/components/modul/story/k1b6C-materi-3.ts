import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, orang, teks } from "./k1b6C-gambar";
import { bersih, idx, k, tambah } from "./k1b6C-bantu";

/*
 * Cerita orisinal IGIL "Tutup Pasar Malam" (Kelas 1 Bab 6 Sub-Bab C). Bagian ini: perayaan penutup pasar malam (akhir cerita bab) dan ringkasan.
 */

/* ------------------------------ 7. Perayaan (akhir cerita bab) ------------------------------ */
const SUARA_R1 = "Laporan lengkap diserahkan. Pak RT mengumumkan lapak keluarga Igil rapi dan paling teliti menghitung.";
const SUARA_R2 = "Lampion dilepas ke langit satu per satu. Igil, Kaka, Abang, dan Mamah bertepuk tangan.";
const SUARA_R3 = "Dari dua nampan kue, loket karcis, sampai sisa dagangan, semua terhitung. Pasar malam malam ini ditutup dengan senyum.";

export const ADEGAN_PERAYAAN: AdeganStory = {
  id: "perayaan",
  judul: "Pasar malam ditutup dengan senyum",
  sumber: "Materi: perayaan, akhir cerita",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Laporan diterima Pak RT")),
      tambah(idx(SUARA_R1, "Laporan"), emo("pp", 60, 90, E.papan, 34)),
      tambah(idx(SUARA_R1, "Pak"), ...orang("pr", 150, 100, E.pakRT, "Pak RT")),
      tambah(idx(SUARA_R1, "lapak"), emo("lp", 240, 90, E.tenda, 34)),
      tambah(idx(SUARA_R1, "rapi"), emo("pl", 150, 56, E.piala, 30), ...kartu("rp", 70, 140, 160, 22, W.emas, ["Lapak paling rapi dan teliti"], 9)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Lampion dilepas")),
      tambah(idx(SUARA_R2, "Lampion"), ...[50, 110, 170, 240].map((x, i) => emo(`lm${i}`, x, [60, 44, 64, 48][i], E.lampion, 24))),
      tambah(idx(SUARA_R2, "langit"), emo("s0", 80, 34, E.bintang, 14), emo("s1", 205, 36, E.bintang, 14), emo("s2", 276, 80, E.bintang, 14)),
      tambah(idx(SUARA_R2, "satu", 1), teks("s1n", 110, 78, "1", 11, W.merah)),
      tambah(idx(SUARA_R2, "satu", 2), teks("s2n", 170, 94, "1", 11, W.merah)),
      tambah(idx(SUARA_R2, "Igil"), ...orang("ig", 45, 150, E.igil, "Igil")),
      tambah(idx(SUARA_R2, "Kaka"), ...orang("kk", 115, 150, E.kaka, "Kaka")),
      tambah(idx(SUARA_R2, "Abang"), ...orang("ab", 185, 150, E.abang, "Abang")),
      tambah(idx(SUARA_R2, "Mamah"), ...orang("mm", 255, 150, E.mamah, "Mamah")),
      tambah(idx(SUARA_R2, "tangan"), emo("tp", 150, 118, E.tepuk, 26)),
    ),
    k(
      SUARA_R3,
      tambah(idx(SUARA_R3, "dua"), ...kartu("dn", 14, 36, 84, 20, W.krem, ["2 nampan kue"], 9)),
      tambah(idx(SUARA_R3, "loket"), ...kartu("lk", 108, 36, 84, 20, W.langit, ["loket karcis"], 9)),
      tambah(idx(SUARA_R3, "sisa"), ...kartu("sd", 202, 36, 84, 20, W.pink, ["sisa dagangan"], 9)),
      tambah(idx(SUARA_R3, "ditutup"), emo("a0", 60, 86, E.api, 24), emo("a1", 240, 90, E.api2, 24), ...kartu("tt", 50, 98, 200, 26, W.emas, ["TUTUP, TERIMA KASIH"], 11)),
      tambah(idx(SUARA_R3, "senyum"), emo("hh", 150, 138, E.hati, 24)),
    ),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Q1 = "Ingat, ya. Kurangi satuannya dulu, puluhannya tetap. Atau mundur sebanyak yang diambil.";
const SUARA_Q2 = "Periksa hasil pengurangan dengan menambah kembali.";
const SUARA_Q3 = "Menurutmu, di rumah, hal apa yang bisa kamu hitung dengan menjumlah dan mengurang? Terima kasih, Igil, Kaka, Abang, dan Mamah!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat cara mengurang",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Ingat, ya!")),
      tambah(idx(SUARA_Q1, "Kurangi"), ...kartu("r0", 20, 34, 260, 30, W.hijauMuda, ["kurangi satuan dulu, puluhan tetap"], 10)),
      tambah(idx(SUARA_Q1, "Atau"), ...kartu("r1", 20, 72, 260, 30, W.krem, ["atau mundur sebanyak yang diambil"], 10)),
    ),
    k(
      SUARA_Q2,
      tambah(idx(SUARA_Q2, "Periksa"), ...kartu("r2", 20, 110, 260, 30, W.pink, ["periksa: tambah kembali hasilnya"], 10)),
      tambah(idx(SUARA_Q2, "menambah"), emo("ul", 150, 164, E.ulang, 26)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Terima kasih!")),
      tambah(idx(SUARA_Q3, "rumah"), emo("rm", 150, 64, E.rumah, 34)),
      tambah(idx(SUARA_Q3, "hitung"), emo("tn", 200, 70, E.tanya, 22)),
      tambah(idx(SUARA_Q3, "Igil"), ...orang("ig", 45, 140, E.igil, "Igil")),
      tambah(idx(SUARA_Q3, "Kaka"), ...orang("kk", 115, 140, E.kaka, "Kaka")),
      tambah(idx(SUARA_Q3, "Abang"), ...orang("ab", 185, 140, E.abang, "Abang")),
      tambah(idx(SUARA_Q3, "Mamah"), ...orang("mm", 255, 140, E.mamah, "Mamah"), ...[45, 115, 185, 255].map((x, i) => emo(`w${i}`, x, 108, E.melambai, 20))),
    ),
  ],
};
