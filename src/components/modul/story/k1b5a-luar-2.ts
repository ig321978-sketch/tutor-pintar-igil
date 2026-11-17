import type { AdeganStory, Obj } from "./logika-story";
import { E, MANIK, W, WARNA_IKAN, bingkai, butir, emo, geserManik, isiBingkai, judul, kartu, kawanan, orang, rekenrek, teks, toples } from "./k1b5a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b5a-bantu";
import { NAMA_METODE, WARNA_METODE, duaBingkai, isi1, isi2, kepala } from "./k1b5a-luar-1";

/* Video metode global Sub-Bab A: Rekenrek (Manik Hitung), Estimation Jar (Toples Tebakan), dan ringkasan. */

const idManik = (b: "a" | "b", dari: number, sampai: number): string[] => Array.from({ length: sampai - dari }, (_, i) => `rk${b}${dari + i}`);
const Y_ATAS = MANIK.ya + 20;
const Y_BAWAH = MANIK.yb + 18;
const ikanDi = (warna: string): Obj[] => kawanan("ik", [{ x: 268, y: 186 }], warna, 1.2);
const KERIKIL = "#A8A29E";

/* ------------------------------ 4. Rekenrek: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Rekenrek, atau Manik Hitung. Ada dua kawat, tiap kawat punya sepuluh manik.";
const SUARA_C2 = "Tiap kawat punya lima manik merah dan lima manik putih, jadi mudah dilihat.";
const SUARA_C3 = "Manik digeser ke kiri dengan sekali dorong. Kawat atas penuh berarti sepuluh.";
const SUARA_C4 = "Geser manik di kawat bawah untuk sisanya, lalu baca sepuluh dan sisanya.";

export const ADEGAN_LUAR_MANIK: AdeganStory = {
  id: "luar-manik",
  judul: "Rekenrek: manik hitung",
  sumber: "Metode global: Rekenrek",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah("Ada", ...rekenrek("rk")),
      tambah(idx(SUARA_C1, "dua"), teks("n2", 150, 178, "2 kawat", 9, W.ungu)),
      tambah("sepuluh", teks("m10", 150, 62, "10 manik tiap kawat", 9, W.biru)),
    ),
    k(
      SUARA_C2,
      sorotkan("merah", ...idManik("a", 0, 5), ...idManik("b", 0, 5)),
      tambah("merah", teks("l5a", 100, 160, "5 merah", 9, W.merah)),
      sorotkan("putih,", ...idManik("a", 5, 10), ...idManik("b", 5, 10)),
      tambah("putih,", teks("l5b", 200, 160, "5 putih", 9, W.biru)),
      tambah("dilihat.", emo("mt", 150, 160, E.mata, 14)),
    ),
    k(
      SUARA_C3,
      ubah("digeser", ...geserManik("rk", "a", 0, 10)),
      sorotkan("atas", "rk-w0"),
      tambah("sepuluh.", teks("na", 225, Y_ATAS, "10", 12, W.merah)),
    ),
    k(
      SUARA_C4,
      ubah("bawah", ...geserManik("rk", "b", 0, 4)),
      tambah("sisanya,", teks("nb", 225, Y_BAWAH, "4", 12, W.merah)),
      sorotkan("sepuluh", "na"),
      sorotkan("sisanya@2", "nb"),
    ),
  ],
};

/* ------------------------------ 5. Rekenrek: terapan pada ikan ------------------------------ */
const SUARA_D1 = "Igil membuat banyak ikan koki dengan manik. Kawat atas digeser semua, sepuluh.";
const SUARA_D2 = "Di kawat bawah, Igil menggeser satu manik. Sepuluh dan satu, sebelas.";
const SUARA_D3 = "Untuk ikan neon tujuh belas, kawat bawah digeser lima merah dan dua putih.";
const SUARA_D4 = "Tiga manik putih lagi digeser untuk tiga ikan neon baru. Dua kawat penuh, dua puluh.";

export const ADEGAN_LUAR_MANIK_TERAPAN: AdeganStory = {
  id: "luar-manik-terapan",
  judul: "Rekenrek: ikan koki dan neon",
  sumber: "Metode global: Rekenrek, terapan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1), ...rekenrek("rk")),
      tambah("Igil", ...orang("ig", 30, 172, E.igil, "Igil")),
      tambah("koki", ...ikanDi(WARNA_IKAN.koki)),
      ubah("semua,", ...geserManik("rk", "a", 0, 10)),
      tambah("sepuluh.", teks("na", 225, Y_ATAS, "10", 12, W.merah)),
    ),
    k(
      SUARA_D2,
      ubah("satu", ...geserManik("rk", "b", 0, 1)),
      tambah("satu", teks("nb", 225, Y_BAWAH, "1", 10, W.merah)),
      tambah("sebelas.", ...kartu("h", 90, 156, 120, 24, W.emas, ["koki: 11"], 11)),
    ),
    k(
      SUARA_D3,
      hapus(0, "ik0", "ik0-m"),
      tambah("neon", ...ikanDi(WARNA_IKAN.neon)),
      ubah("belas,", { id: "h-t0", isi: "neon: 17" }),
      ubah("merah", ...geserManik("rk", "b", 1, 5), { id: "nb", isi: "5 merah" }),
      ubah("putih.", ...geserManik("rk", "b", 5, 7), { id: "nb", isi: "5 merah, 2 putih" }),
    ),
    k(
      SUARA_D4,
      ubah("Tiga", { id: "nb", isi: "3 lagi" }),
      ubah("digeser", ...geserManik("rk", "b", 7, 10)),
      tambah("Dua", teks("n2", 250, 162, "2 kawat", 9, W.ungu)),
      ubah("penuh,", { id: "nb", isi: "10" }),
      ubah("puluh.", { id: "h-t0", isi: "neon: 20" }),
    ),
  ],
};

/* ------------------------------ 6. Estimation Jar: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Estimation Jar, atau Toples Tebakan. Sebuah toples berisi benda yang belum dihitung.";
const SUARA_E2 = "Lihat toples sebentar, lalu buat perkiraan. Perkiraan boleh tidak tepat.";
const SUARA_E3 = "Setelah itu, keluarkan benda dan hitung dengan sepuluh dulu, lalu sisanya.";
const SUARA_E4 = "Bandingkan perkiraan dengan hasil hitungan. Lama-lama perkiraan kita makin dekat.";
const T = { x1: 100, x2: 196, y: 70, s: 18 };

export const ADEGAN_LUAR_TOPLES: AdeganStory = {
  id: "luar-toples",
  judul: "Estimation Jar: toples tebakan",
  sumber: "Metode global: Estimation Jar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga,", ...kepala(2)),
      tambah("toples@2", ...toples("tp", 105, 66, 90, 86)),
      tambah("benda", ...butir("kr", 13, 117, 100, 5, 14, KERIKIL)),
      tambah("dihitung.", teks("q", 150, 172, "berapa isinya?", 10, W.merah)),
    ),
    k(
      SUARA_E2,
      tambah("Lihat", emo("mt", 60, 104, E.mata, 30)),
      tambah("perkiraan.", ...kartu("pk", 210, 84, 80, 22, W.putih, ["kira-kira?"], 9)),
      tambah("tepat.", teks("bt", 250, 124, "boleh tidak tepat", 8, W.ungu)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, ...kepala(2), ...toples("tp", 16, 70, 70, 70), ...butir("kr", 13, 26, 92, 5, 11, KERIKIL, 4)),
      hapus("keluarkan", ...Array.from({ length: 13 }, (_, i) => `kr${i}`)),
      tambah("keluarkan", ...bingkai("t1", T.x1, T.y, T.s), ...bingkai("t2", T.x2, T.y, T.s)),
      tambah("sepuluh", ...isiBingkai("t1", T.x1, T.y, 0, 10, KERIKIL, T.s), teks("p10", 145, 124, "10", 12, W.merah)),
      tambah("sisanya.", ...isiBingkai("t2", T.x2, T.y, 0, 3, KERIKIL, T.s), teks("p3", 241, 124, "3", 12, W.merah)),
    ),
    k(
      SUARA_E4,
      tambah("perkiraan", ...kartu("pk", 40, 150, 100, 22, W.putih, ["perkiraan"], 9.4)),
      tambah("hitungan.", ...kartu("hh", 160, 150, 100, 22, W.emas, ["hitungan"], 9.4)),
      tambah("dekat.", emo("sr", 150, 192, E.sasaran, 16)),
    ),
  ],
};

/* ------------------------------ 7. Estimation Jar: terapan pada kerikil dan kerang ------------------------------ */
const SUARA_F1 = "Abang menaruh kerikil hias di toples kecil. Kaka memperkirakan, kira-kira lima belas.";
const SUARA_F2 = "Kerikil dikeluarkan dan diisi ke dua bingkai. Bingkai pertama penuh sepuluh, sisanya enam.";
const SUARA_F3 = "Sepuluh dan enam, enam belas. Perkiraan Kaka lima belas, hanya kurang satu dari hitungan.";
const SUARA_F4 = "Toples kedua berisi kerang kecil. Igil memperkirakan dua puluh, ternyata hitungannya delapan belas. Cukup dekat!";

export const ADEGAN_LUAR_TOPLES_TERAPAN: AdeganStory = {
  id: "luar-toples-terapan",
  judul: "Estimation Jar: kerikil hias",
  sumber: "Metode global: Estimation Jar, terapan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2)),
      tambah("Abang", ...orang("ab", 36, 120, E.abang, "Abang")),
      tambah("kerikil", ...toples("tp", 105, 66, 90, 86), ...butir("kr", 16, 117, 84, 5, 14, KERIKIL)),
      tambah("Kaka", ...orang("kk", 264, 120, E.kaka, "Kaka")),
      tambah("belas.", ...kartu("pk", 200, 150, 94, 22, W.putih, ["kira-kira 15"], 9)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, ...kepala(2), ...duaBingkai()),
      tambah("dua", teks("n2", 150, 59, "2 bingkai", 9, W.ungu)),
      tambah("sepuluh,", ...isi1(0, 10, KERIKIL), teks("p10", 85, 128, "10", 14, W.merah)),
      tambah("enam.", ...isi2(0, 6, KERIKIL), teks("p6", 215, 128, "6", 14, W.merah)),
    ),
    k(
      SUARA_F3,
      tambah("belas.", ...kartu("hh", 30, 150, 110, 22, W.emas, ["hitungan 16"], 9.4)),
      tambah("Kaka", ...kartu("pk", 160, 150, 110, 22, W.putih, ["kira-kira 15"], 9.4)),
      tambah("satu", teks("k1", 150, 190, "kurang 1", 9.4, W.ungu)),
    ),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("Toples", ...toples("tp", 30, 66, 100, 100)),
      tambah("kerang", ...butir("ks", 18, 44, 84, 6, 14, W.pink)),
      tambah("Igil", ...orang("ig", 230, 76, E.igil, "Igil")),
      tambah(idx(SUARA_F4, "puluh,"), ...kartu("pk", 160, 110, 120, 22, W.putih, ["kira-kira 20"], 9.4)),
      tambah("belas.", ...kartu("hh", 160, 140, 120, 22, W.emas, ["hitungan 18"], 9.4)),
      tambah("dekat!", emo("sr", 220, 184, E.sasaran, 18)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk menghitung sampai dua puluh. Semuanya membantu Abang menyiapkan ikan.";
const SUARA_Z2 = "Double Ten Frame: isi bingkai pertama sampai penuh, lalu sisanya di bingkai kedua.";
const SUARA_Z3 = "Rekenrek: geser manik kawat atas sepuluh, lalu kawat bawah untuk sisanya.";
const SUARA_Z4 = "Estimation Jar: perkirakan isi toples dulu, lalu buktikan dengan menghitung.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan")),
      tambah("tiga", emo("rk", 150, 76, E.bintang, 40), ...kartu("rt", 60, 98, 180, 26, W.emas, ["3 metode global"], 10)),
      tambah("puluh.", teks("sd", 150, 144, "sampai 20", 10, W.ungu)),
      tambah("ikan.", ...kawanan("ik", [{ x: 110, y: 174 }, { x: 150, y: 174 }, { x: 190, y: 174 }], [WARNA_IKAN.guppy[0], WARNA_IKAN.koki, WARNA_IKAN.neon], 1.1)),
    ),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Double", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], [NAMA_METODE[0], "bingkai pertama penuh, sisanya di bingkai kedua"], 9))),
    k(SUARA_Z3, tambah("Rekenrek:", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], [NAMA_METODE[1], "kawat atas 10, kawat bawah sisanya"], 9.4))),
    k(SUARA_Z4, tambah("Estimation", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], [NAMA_METODE[2], "perkirakan dulu, lalu hitung"], 9.4))),
  ],
};
