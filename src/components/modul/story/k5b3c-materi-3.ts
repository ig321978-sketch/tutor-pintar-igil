import type { AdeganStory } from "./logika-story";
import { E, W, campur, emo, judul, kotak, lantai, pec, tanda, teks, tokoh } from "./k5b3c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b3c-bantu";

/*
 * Cerita orisinal IGIL "Sisa Adonan Bu Nani" (Kelas 5 Bab 3 Sub-Bab C), akhir: penyebut berbeda disamakan dengan KPK (Fajar mencuci loyang),
 * dua pecahan campuran berpenyebut beda, dan perayaan Toko Roti Keliling. Naskah suara dari naskah/story-naskah-k5b3c.md.
 */

/* ------------------------------ 7. KPK ------------------------------ */
const SUARA_K1 = "Bima menjelaskan bahwa penyebut yang berbeda harus disamakan lebih dulu.";
const SUARA_K2 = "KPK dari empat dan tiga adalah dua belas, sehingga sembilan per dua belas dikurangi empat per dua belas.";
const SUARA_K3 = "Hasilnya lima per dua belas, dan hasil itu jauh lebih kecil dari dua per satu, jadi Fajar mulai mencuci loyang.";

export const ADEGAN_KPK: AdeganStory = {
  id: "kpk",
  judul: "Samakan dengan KPK",
  sumber: "Materi: penyebut beda dengan KPK",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Penyebut berbeda"), ...lantai("lt", 150)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("penyebut", ...pec("a", 120, 84, 3, 4, 22), tanda("m1", 156, 86, "−", 24), ...pec("b", 192, 84, 1, 3, 22, W.merah)),
      sorotkan("berbeda", "aq", "bq"),
      tambah("disamakan", teks("sd", 156, 132, "samakan dulu", 12, W.pinkTua, { z: 3 })),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("KPK dua penyebut"), ...lantai("lt", 150)),
      tambah("KPK", teks("kp", 150, 48, "KPK 4 dan 3 = 12", 13, W.merah, { z: 3 })),
      tambah("sembilan", ...pec("a", 70, 100, 9, 12, 20)),
      tambah("dikurangi", tanda("m1", 130, 102, "−", 24)),
      tambah("empat@2", ...pec("b", 190, 100, 4, 12, 20, W.merah)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Hasil benar"), ...lantai("lt", 150)),
      tambah("lima", ...pec("c", 62, 88, 5, 12, 22, W.hijauTua)),
      tambah("kecil", teks("kc", 128, 92, "lebih kecil", 11, W.biru, { z: 3 })),
      tambah("dua@2", ...pec("d", 206, 88, 2, 1, 22, W.merah), emo("x1", 244, 88, E.salah, 22, { z: 4 })),
      tambah("Fajar", ...tokoh("fj", 40, 184, "Fajar")),
      tambah("mencuci", ...[0, 1].map((i) => kotak(`ly${i}`, 110 + i * 46, 124, 40, 22, W.putih, W.pinkTua, { rx: 4, tebal: 1.6, z: 2 })), emo("a1", 130, 120, E.air, 16, { z: 3 }), emo("a2", 176, 120, E.air, 16, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 8. Campuran berpenyebut beda ------------------------------ */
const SUARA_B1 = "Bu Nani menantang: lima bulat satu per dua dikurangi dua bulat satu per tiga.";
const SUARA_B2 = "Citra mengubahnya menjadi tiga puluh tiga per enam dikurangi empat belas per enam, yaitu sembilan belas per enam.";
const SUARA_B3 = "Disederhanakan, hasilnya tiga bulat satu per enam.";

export const ADEGAN_CAMPURAN_BEDA: AdeganStory = {
  id: "campuran-beda",
  judul: "Campuran penyebut beda",
  sumber: "Materi: dua campuran penyebut beda",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tantangan Bu Nani"), ...lantai("lt", 150)),
      tambah("Nani", ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("lima", ...campur("x", 104, 128, 88, 5, 1, 2, 20)),
      tambah("dikurangi", tanda("m1", 166, 90, "−", 24)),
      tambah("dua@2", ...campur("y", 200, 224, 88, 2, 1, 3, 20, W.merah)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Citra mengubah"), ...lantai("lt", 150)),
      tambah("Citra", ...tokoh("ct", 40, 184, "Citra")),
      tambah("tiga", ...pec("a", 86, 92, 33, 6, 18)),
      tambah("dikurangi", tanda("m1", 130, 94, "−", 22)),
      tambah("empat", ...pec("b", 172, 92, 14, 6, 18, W.merah)),
      tambah("yaitu", tanda("m2", 212, 94, "=", 22)),
      tambah("sembilan", ...pec("c", 252, 92, 19, 6, 18, W.hijauTua)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Disederhanakan"), ...lantai("lt", 150), ...pec("a", 66, 90, 19, 6, 22)),
      tambah("hasilnya", tanda("m1", 108, 92, "=", 24)),
      tambah("tiga", ...campur("m", 150, 176, 90, 3, 1, 6, 22, W.hijauTua)),
      tambah("enam", emo("ok", 230, 96, E.benar, 26, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup: perayaan Toko Roti Keliling ------------------------------ */
const SUARA_N1 = "Semua loyang sudah bersih, dan Bu Nani membagikan roti hangat untuk semua orang.";
const SUARA_N2 = "Pak Seno, Bu Ratna, Bima, Citra, Fajar, dan Pak Arif merayakan Toko Roti Keliling di taman.";
const SUARA_N3 = "Menurutmu, bagian roti mana yang paling cepat habis? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Bu Nani!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Toko Roti Keliling",
  sumber: "Materi: penutup bab",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Loyang bersih"), ...lantai("lt", 150), ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("loyang", ...[0, 1, 2].map((i) => kotak(`ly${i}`, 100 + i * 50, 100, 44, 24, W.putih, W.pinkTua, { rx: 4, tebal: 1.8, z: 2 }))),
      tambah("membagikan", emo("r0", 112, 76, E.roti, 22, { z: 3 }), emo("r1", 162, 76, E.panjang, 22, { z: 3 }), emo("r2", 212, 76, E.roti, 22, { z: 3 })),
      tambah("hangat", emo("up", 162, 52, "\u{1F4A8}", 18, { z: 3 })),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, ...lantai("lt", 150)),
      tambah("Toko", ...[0, 1, 2, 3, 4, 5].map((i) => kotak(`bd${i}`, 22 + i * 46, 34, 40, 18, ["#F472B6", "#60A5FA", "#FDE047"][i % 3], W.pinkTua, { rx: 3, tebal: 1.2, z: 1 })), teks("sp", 150, 74, "TOKO ROTI KELILING", 12, W.pinkTua, { z: 3 })),
      tambah("Seno", ...tokoh("ps", 26, 184, "Pak Seno")),
      tambah("Ratna", ...tokoh("br", 75, 184, "Bu Ratna")),
      tambah("Bima", ...tokoh("bm", 124, 184, "Bima")),
      tambah("Citra", ...tokoh("ct", 172, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 221, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 270, 184, "Pak Arif")),
      tambah("taman", emo("mb", 150, 128, E.mobil, 28, { z: 3 }), emo("bl1", 40, 76, E.balon, 22, { z: 3 }), emo("bl2", 262, 76, E.balon, 22, { z: 3 })),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Roti mana yang cepat habis?"), ...lantai("lt", 150)),
      tambah("roti", emo("r0", 90, 80, E.roti, 26, { z: 3 }), emo("r1", 150, 80, E.panjang, 26, { z: 3 }), emo("r2", 210, 80, E.kue, 26, { z: 3 })),
      tambah("habis", emo("tq", 150, 118, E.tanya, 24, { z: 3 })),
      tambah("Terima", teks("tk", 150, 48, "Terima kasih!", 13, W.merah, { z: 3 }), emo("pt", 40, 100, E.pesta, 24, { z: 3 }), emo("tm", 262, 100, E.terima, 24, { z: 3 })),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("Citra", ...tokoh("ct", 95, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 150, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 205, 184, "Pak Arif")),
      tambah("Nani", ...tokoh("bn", 260, 184, "Bu Nani")),
    ),
  ],
};
