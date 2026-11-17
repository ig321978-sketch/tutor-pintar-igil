import type { AdeganStory } from "./logika-story";
import { E, W, deretSatuan, emo, jengkal, judul, kartu, orang, papan, sisi, teks, tongkat } from "./k1b7B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k1b7B-bantu";

/*
 * Cerita orisinal IGIL "Papan Lantai Rumah Pohon" (Kelas 1 Bab 7 Sub-Bab B), akhir cerita Rumah Pohon Abang.
 * Naskah suara dari naskah/story-naskah-k1b7b.md. Bagian ini: alat ukur berbeda (tongkat kayu dan tangan Mamah), dan aturan mengukur.
 */

/* ------------------------------ 5. Alat ukur berbeda ------------------------------ */
const SUARA_A1 = "Abang mengukur sisi yang sama dengan tongkat kayu. Hasilnya tiga tongkat.";
const SUARA_A2 = "Mamah ikut menjengkal dan hasilnya empat. Tangan Mamah lebih besar, dan Igil memelototi tangannya sendiri!";
const SUARA_A3 = "Alat ukur lebih panjang, angkanya lebih sedikit. Karena itu pakai satu jenis alat ukur sampai selesai.";

export const ADEGAN_ALAT_BEDA: AdeganStory = {
  id: "alat-beda",
  judul: "Alat ukur berbeda, hasil berbeda",
  sumber: "Materi: alat ukur berbeda",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Sisi yang sama, alat berbeda")),
      tambah("Abang", ...orang("ab", 262, 40, E.abang, "Abang")),
      tambah("sisi", ...sisi("sd", 30, 60, 240)),
      tambah("tongkat", ...deretSatuan(tongkat, "tk", 3, 30, 60, 80)),
      tambah("tiga", teks("ht", 150, 94, "3 tongkat", 11, W.merah)),
    ),
    k(
      SUARA_A2,
      hapus(0, "ab", "ab-n"),
      tambah("Mamah", ...orang("mm", 262, 40, E.mamah, "Mamah")),
      tambah("menjengkal", ...sisi("sd2", 30, 116, 240)),
      tambah("empat.", ...deretSatuan(jengkal, "mj", 4, 30, 116, 60), teks("hm", 150, 150, "4 jengkal Mamah", 10, W.merah)),
      tambah("besar,", teks("tb", 262, 100, "tangan besar", 8.6, W.ungu)),
      tambah("Igil", ...orang("ig", 262, 174, E.igil, "Igil")),
      tambah("memelototi", emo("mt", 228, 170, E.mata, 18)),
    ),
    k(
      SUARA_A3,
      hapus(0, "hm", "tb", "ig", "ig-n", "mt", "mm", "mm-n"),
      tambah("lebih", ...kartu("ka", 40, 146, 220, 22, W.krem, ["alat lebih panjang, angka lebih sedikit"], 8.6)),
      tambah("satu", ...kartu("kj", 40, 174, 220, 20, W.hijauMuda, ["1 jenis alat ukur sampai selesai"], 8.6)),
    ),
  ],
};

/* ------------------------------ 6. Aturan mengukur ------------------------------ */
const SUARA_R1 = "Kaka merangkum. Mulai dari ujung, rapat, tidak bertumpuk, dan tidak miring.";
const SUARA_R2 = "Pakai satu jenis alat ukur yang sama.";
const SUARA_R3 = "Kakek Jaya menulis pesanan papan: lima jengkal Igil, lengkap dengan nama alatnya.";
const ATURAN = ["mulai dari ujung", "rapat, tanpa celah", "tidak bertumpuk", "tidak miring", "1 jenis alat ukur yang sama"];
const WARNA_ATURAN = [W.krem, W.hijauMuda, W.langit, W.pink, W.krem];
const kartuAturan = (i: number) => [...kartu(`a${i}`, 20, 34 + i * 30, 200, 24, WARNA_ATURAN[i], [ATURAN[i]], 9.4), emo(`o${i}`, 238, 48 + i * 30, E.benar, 16)];

export const ADEGAN_ATURAN: AdeganStory = {
  id: "aturan",
  judul: "Aturan mengukur",
  sumber: "Materi: aturan mengukur",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Aturan mengukur")),
      tambah("Kaka", ...orang("kk", 262, 150, E.kaka, "Kaka")),
      ...["Mulai", "rapat,", "bertumpuk,", "miring."].map((kt, i) => tambah(kt, ...kartuAturan(i))),
    ),
    k(
      SUARA_R2,
      tambah("satu", ...kartuAturan(4)),
      sorotkan("sama.", "a4-k"),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Pesanan papan lantai")),
      tambah("Kakek", ...orang("kj", 262, 100, E.kakek, "Kakek Jaya")),
      tambah("pesanan", ...papan("pl", 30, 56, 200, 16)),
      tambah("lima", ...kartu("ps", 30, 90, 200, 36, W.krem, ["pesanan papan lantai", "5 jengkal Igil"], 10)),
      tambah("nama", emo("cp", 252, 150, E.catat, 20), teks("nm", 130, 160, "angka dan nama alatnya", 9.4, W.merah)),
    ),
  ],
};
