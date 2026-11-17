import type { AdeganStory } from "./logika-story";
import { E, W, deretSatuan, emo, garis, jengkal, judul, kartu, kotak, orang, panah, papan, pohon, rangka, semak, sisi, teks, xSatuan } from "./k1b7B-gambar";
import { hapus, hitungUnit, k, sorotkan, tambah, ubah } from "./k1b7B-bantu";

/*
 * Cerita orisinal IGIL "Papan Lantai Rumah Pohon" (Kelas 1 Bab 7 Sub-Bab B), akhir cerita Rumah Pohon Abang.
 * Naskah suara dari naskah/story-naskah-k1b7b.md. Bagian ini: lantai kosong, perkiraan, jengkal bercelah, dan mengukur dengan benar.
 */

/* ------------------------------ 1. Lantai kosong ------------------------------ */
const SUARA_L1 = "Tangga sudah kokoh! Kini rumah pohon Abang butuh lantai papan, dan Kakek Jaya bertanya, berapa panjang sisi lantainya?";
const SUARA_L2 = "Papan harus dipesan hari ini juga. Kalau kependekan, lantainya bolong.";
const SUARA_L3 = "Igil membayangkan dirinya jatuh ke semak-semak. Dia bergidik!";

export const ADEGAN_LANTAI_KOSONG: AdeganStory = {
  id: "lantai-kosong",
  judul: "Rangka lantai yang masih kosong",
  sumber: "Materi: rangka lantai dan masalah",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lantai rumah pohon")),
      tambah("Tangga", ...pohon("ph", 270)),
      tambah("lantai", ...rangka("rl", 40, 96, 200, 48), garis("dh", 240, 120, 24, 0, W.coklat, 4, { z: -2 })),
      tambah("Kakek", ...orang("kj", 40, 62, E.kakek, "Kakek Jaya"), ...kartu("ps", 84, 44, 100, 22, W.krem, ["papan pesanan"], 8.6)),
      tambah("sisi", garis("sg", 40, 156, 200, 0, W.merah, 2, { gambar: true })),
      tambah("berapa", emo("tn", 140, 126, E.tanya, 26), teks("sx", 140, 172, "panjang sisi lantai?", 9.4, W.merah)),
    ),
    k(
      SUARA_L2,
      hapus(0, "sg", "sx", "tn"),
      ubah("dipesan", { id: "ps-t0", isi: "dipesan hari ini" }),
      tambah("kependekan,", ...papan("pk", 50, 102, 70, 14)),
      ubah("bolong.", { id: "rl-l", warna: "#FCA5A5" }),
      tambah("bolong.", teks("bl", 190, 128, "bolong!", 11, W.merah)),
    ),
    k(
      SUARA_L3,
      hapus(0, "pk", "pk-s0", "pk-s1", "bl", "ps-k", "ps-t0"),
      tambah("Igil", ...orang("ig", 120, 76, E.igil, "Igil")),
      ubah("jatuh", { id: "ig", y: 156 }, { id: "ig-n", y: 169 }),
      tambah("semak-semak.", ...semak("sm", 96, 184)),
      tambah("bergidik!", emo("bg", 168, 156, E.takut, 22)),
    ),
  ],
};

/* ------------------------------ 2. Perkiraan dulu ------------------------------ */
const SUARA_K1 = "Sebelum mengukur, Kaka mencatat perkiraan dulu.";
const SUARA_K2 = "Igil menjawab dengan yakin, kira-kira tiga jengkal.";
const SUARA_K3 = "Kakek Jaya mengangguk. Nanti kita periksa, ya.";

export const ADEGAN_KIRA_KIRA: AdeganStory = {
  id: "kira-kira",
  judul: "Perkiraan dulu sebelum mengukur",
  sumber: "Materi: perkiraan sebelum mengukur",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Perkiraan dulu")),
      tambah("Sebelum", ...sisi("sd", 40, 120, 220)),
      tambah("Kaka", ...orang("kk", 40, 66, E.kaka, "Kaka")),
      tambah("mencatat", ...kartu("pk", 80, 50, 150, 26, W.krem, ["kira-kira ? jengkal"], 9.4)),
      tambah("perkiraan", emo("cp", 250, 64, E.catat, 22)),
    ),
    k(
      SUARA_K2,
      tambah("Igil", ...orang("ig", 262, 166, E.igil, "Igil")),
      tambah("yakin,", emo("mt", 226, 164, E.mata, 18)),
      ubah("tiga", { id: "pk-t0", isi: "kira-kira 3 jengkal" }),
      tambah("jengkal.", teks("ts", 150, 150, "sisi lantai", 9.4, W.biru)),
    ),
    k(
      SUARA_K3,
      tambah("Kakek", ...orang("kj", 40, 170, E.kakek, "Kakek Jaya")),
      tambah("mengangguk.", emo("ya", 78, 166, E.jempol, 20)),
      tambah("periksa,", emo("kc", 150, 90, E.kaca, 24)),
    ),
  ],
};

/* ------------------------------ 3. Jengkal bercelah (salah langkah) ------------------------------ */
const SUARA_C1 = "Igil terburu-buru menjengkal, tetapi jengkalnya melompat dan meninggalkan celah. Dia menghitung empat.";
const SUARA_C2 = "Kaka menggeleng. Mulai dari ujung rangka. Jengkal harus rapat, tanpa celah dan tanpa tumpukan.";
const SUARA_C3 = "Mamah bertanya, mengapa tidak boleh ada celah? Karena panjang yang terlewat tidak ikut terhitung.";
const CELAH = [2];

export const ADEGAN_CELAH: AdeganStory = {
  id: "celah",
  judul: "Jengkal yang meninggalkan celah",
  sumber: "Materi: celah saat menjengkal",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Jengkal Igil")),
      tambah("terburu-buru", ...sisi("sd", 30, 100, 240), ...orang("ig", 262, 54, E.igil, "Igil")),
      tambah("menjengkal,", ...deretSatuan(jengkal, "jg", 4, 30, 100, 48, 16, CELAH)),
      tambah("celah.", kotak("cl", xSatuan(30, 48, 2, CELAH) - 48, 98, 48, 20, "#FECACA", W.merah, { rx: 2, tebal: 1.6, z: 1, op: 0.7 })),
      tambah("empat.", teks("hb", 150, 150, "4 jengkal?", 14, W.merah), emo("sl", 214, 146, E.salah, 18)),
    ),
    k(
      SUARA_C2,
      hapus(0, "hb", "sl"),
      tambah("Kaka", ...orang("kk", 262, 150, E.kaka, "Kaka")),
      tambah("ujung", panah("pu", 30, 90, 0, 8), ...kartu("au", 20, 140, 120, 22, W.krem, ["mulai dari ujung"], 8.6)),
      tambah("rapat,", ...kartu("ar", 148, 140, 104, 22, W.hijauMuda, ["rapat, tanpa celah"], 8.6)),
      tambah("tumpukan.", ...kartu("at", 20, 170, 120, 22, W.langit, ["tanpa tumpukan"], 8.6)),
    ),
    k(
      SUARA_C3,
      hapus(0, "au-k", "au-t0", "ar-k", "ar-t0", "at-k", "at-t0", "pu", "kk", "kk-n", "kk-pita"),
      tambah("Mamah", ...orang("mm", 262, 150, E.mamah, "Mamah")),
      tambah("celah?", emo("tn", 150, 70, E.tanya, 24)),
      sorotkan("terlewat", "cl"),
      tambah("terhitung.", ...kartu("tl", 50, 150, 190, 24, W.merahMuda, ["yang terlewat tidak terhitung"], 8.6)),
    ),
  ],
};

/* ------------------------------ 4. Mengukur dengan benar ------------------------------ */
const SUARA_U1 = "Igil mengulang. Jengkal pertama tepat di ujung, yang berikutnya rapat.";
const SUARA_U2 = "Satu, dua, tiga, empat, lima. Sisi lantai panjangnya lima jengkal.";
const SUARA_U3 = "Kaka menulis lima jengkal Igil, bukan hanya lima.";

export const ADEGAN_UKUR_BENAR: AdeganStory = {
  id: "ukur-benar",
  judul: "Mengukur dari ujung dengan rapat",
  sumber: "Materi: mengukur dengan benar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Mengukur dengan benar")),
      tambah("Igil", ...sisi("sd", 30, 100, 240), ...orang("ig", 262, 54, E.igil, "Igil")),
      tambah("pertama", ...jengkal("jg0", 30, 100, 48)),
      tambah("berikutnya", ...jengkal("jg1", 78, 100, 48)),
      tambah("rapat.", teks("rp", 150, 150, "mulai dari ujung, rapat", 10, W.hijau)),
    ),
    k(
      SUARA_U2,
      ...hitungUnit(SUARA_U2, jengkal, "jg", 5, 30, 100, 48),
      ubah("jengkal.", { id: "rp", isi: "5 jengkal", u: 15, warna: W.merah }),
    ),
    k(
      SUARA_U3,
      hapus(0, "rp"),
      tambah("Kaka", ...orang("kk", 262, 150, E.kaka, "Kaka")),
      tambah("menulis", ...kartu("cc", 40, 132, 150, 24, W.krem, ["5 jengkal Igil"], 9.4)),
      tambah("bukan", teks("ts", 150, 184, "5 saja", 10, W.merah), emo("x", 186, 180, E.salah, 14)),
    ),
  ],
};
