import type { AdeganStory } from "./logika-story";
import { E, W, WL, emo, idKain, idKartu, idTiang, judul, kain, kartu, kotak, kubus, lapisanKubus, idLapisan, lantai, teks, tiang, tokoh } from "./k4b4b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b4b-bantu";

/*
 * Cerita orisinal IGIL "Ember Pak Anto" (Kelas 4 Bab 4 Sub-Bab B, volume), akhir cerita Kolam Renang Tirta Ceria.
 * Naskah suara dari naskah/story-naskah-k4b4b.md. Bagian ini: kubus air (tiga kali dua kali dua), satu sentimeter kubik sama dengan satu mililiter, dan perayaan Pesta Renang Tirta Ceria.
 */

/* ------------------------------ 7. Kubus air ------------------------------ */
const SUARA_K1 = "Benda padat diukur dengan kubus satuan, jadi Genta menyusun kubus yang sisinya satu sentimeter menjadi sebuah balok.";
const SUARA_K2 = "Cara cepat menghitung kubus satuan: tiap lapisan berisi tiga kali dua kubus, dan ada dua lapisan.";
const SUARA_K3 = "Jadi balok itu berisi dua belas kubus, dan volumenya dua belas sentimeter kubik.";

export const ADEGAN_KUBUS: AdeganStory = {
  id: "kubus",
  judul: "Genta menyusun kubus air",
  sumber: "Materi: kubus satuan dan lapisan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kubus Satuan"), ...lantai("lt", 150), ...tokoh("ge", 36, 184, "Genta")),
      tambah("kubus", kubus("ku", 70, 100, 22)),
      tambah("satu@2", teks("s1", 81, 92, "1 cm", 11, W.merah)),
      tambah("balok", ...lapisanKubus("L", 120, 90, 3, 2, 16)),
    ),
    k(
      SUARA_K2,
      tambah("tiga", teks("ft", 144, 62, "3 × 2", 14, W.biru)),
      sorotkan("kubus@2", ...idLapisan("L", 3, 2)),
      tambah("lapisan@2", ...lapisanKubus("M", 128, 81, 3, 2, 16), teks("dl", 230, 100, "2 lapisan", 12, W.coklat)),
    ),
    k(
      SUARA_K3,
      ubah("dua", { id: "ft", isi: "3 × 2 × 2 = 12", warna: W.merah }),
      tambah("volumenya", teks("vl", 150, 142, "volume : 12 cm³", 12, W.hijauTua)),
      tambah("kubik", emo("ok", 250, 130, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 8. Satu sentimeter kubik sama dengan satu mililiter ------------------------------ */
const SUARA_C1 = "Pak Anto menuang air ke wadah sebesar satu sentimeter kubik, dan isinya satu mililiter.";
const SUARA_C2 = "Satu sentimeter kubik sama dengan satu mililiter, sehingga dua belas sentimeter kubik sama dengan dua belas mililiter.";
const SUARA_C3 = "Bak mandi besar memakai meter kubik, yaitu kubus berusuk satu meter, dan satu meter kubik sama dengan seribu liter.";

export const ADEGAN_SAMA: AdeganStory = {
  id: "sama",
  judul: "Satu kubik sama dengan satu mililiter",
  sumber: "Materi: sentimeter kubik dan mililiter",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Satu Kubik, Satu Mililiter"), ...lantai("lt", 150), ...tokoh("pa", 262, 184, "Pak Anto")),
      tambah("menuang", emo("tt", 230, 100, E.tetes, 22)),
      tambah("wadah", kotak("wd", 110, 80, 40, 40, W.langit, WL.airGaris, { rx: 2, tebal: 2, z: 1 })),
      tambah("satu", teks("s1", 130, 70, "1 cm³", 12, W.merah)),
      tambah("isinya", kotak("wa", 112, 84, 36, 34, WL.air, undefined, { rx: 0, tebal: 0, z: 0 })),
      tambah("mililiter", teks("s2", 130, 134, "1 ml", 12, W.hijauTua)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Sama Besar"), ...lantai("lt", 150), ...tokoh("pa", 262, 184, "Pak Anto")),
      tambah("sama", ...kartu("c1", 40, 44, 220, 32, W.krem, ["1 cm³ = 1 ml"], 14)),
      tambah("sehingga", emo("ar", 150, 96, "\u{1F53D}", 20)),
      tambah("dua", ...kartu("c2", 40, 108, 220, 32, W.hijauMuda, ["12 cm³ = 12 ml"], 14)),
      tambah("mililiter@2", emo("ok", 270, 124, E.benar, 22)),
    ),
    k(
      SUARA_C3,
      hapus(0, ...idKartu("c1", 1), ...idKartu("c2", 1), "ar", "ok"),
      tambah("bak", kotak("bk", 24, 70, 130, 70, WL.air, WL.airGaris, { rx: 6, tebal: 2, z: 0 })),
      tambah("kubik", kotak("m3", 176, 84, 56, 56, WL.kubus, W.biru, { rx: 2, tebal: 2, z: 1 })),
      tambah("berusuk", { id: "rs", t: "garis", x: 176, y: 76, x2: 56, y2: 0, warna: W.merah, tebal: 2.4 }, teks("rm", 204, 66, "1 m", 12, W.merah)),
      tambah("sama", teks("sk", 150, 44, "1 m³ = 1.000 l", 14, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Pesta Renang Tirta Ceria ------------------------------ */
const SUARA_T1 = "Sore itu, kolam penuh balon, spanduk, dan konfeti untuk Pesta Renang Tirta Ceria.";
const SUARA_T2 = "Bu Sinta, Pak Anto, Pak Hendro, Satria, Laras, dan Genta berdiri di tepi kolam yang berkilau.";
const SUARA_T3 = "Apa lagi yang bisa kita ukur luas dan volumenya di sekitar rumah? Terima kasih, Satria, Laras, Genta, Pak Hendro, Bu Sinta, dan Pak Anto!";
const X_TOKOH = [28, 78, 128, 178, 228, 278] as const;

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pesta Renang Tirta Ceria",
  sumber: "Materi: perayaan akhir bab",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Pesta Renang"), ...lantai("lt", 150)),
      tambah("kolam", kotak("kl", 20, 92, 260, 50, WL.air, WL.airGaris, { rx: 6, tebal: 2, z: -1 })),
      tambah("balon", emo("b1", 50, 78, E.balon, 24), emo("b2", 150, 78, E.balon, 24), emo("b3", 250, 78, E.balon, 24)),
      tambah("konfeti", emo("kf1", 100, 112, E.konfeti, 22), emo("kf2", 200, 112, E.konfeti, 22)),
      tambah("Pesta", ...tiang("sp", 70, 40, 160, 92), ...kain("sk", 70, 36, 160, 22, "PESTA RENANG TIRTA CERIA", 9)),
    ),
    k(
      SUARA_T2,
      tambah("Sinta", ...tokoh("o1", X_TOKOH[0], 184, "Bu Sinta")),
      tambah("Anto", ...tokoh("o2", X_TOKOH[1], 184, "Pak Anto")),
      tambah("Hendro", ...tokoh("o3", X_TOKOH[2], 184, "Pak Hendro")),
      tambah("Satria", ...tokoh("o4", X_TOKOH[3], 184, "Satria")),
      tambah("Laras", ...tokoh("o5", X_TOKOH[4], 184, "Laras")),
      tambah("Genta", ...tokoh("o6", X_TOKOH[5], 184, "Genta")),
      tambah("berkilau", emo("kl1", 90, 124, E.kilau, 22), emo("kl2", 210, 124, E.kilau, 22)),
    ),
    k(
      SUARA_T3,
      hapus(0, ...idKain("sk"), ...idTiang("sp")),
      tambah("ukur", teks("ul", 150, 50, "ukur luas dan volume?", 11, W.merah)),
      tambah("rumah", emo("hm", 262, 56, "\u{1F3E0}", 24)),
      tambah("kasih", teks("tk", 150, 76, "Terima kasih!", 13, W.hijauTua)),
      tambah("Genta", emo("w1", 28, 146, E.lambai, 22), emo("w2", 78, 146, E.lambai, 22), emo("w3", 128, 146, E.lambai, 22)),
      tambah("Anto", emo("w4", 178, 146, E.lambai, 22), emo("w5", 228, 146, E.lambai, 22), emo("w6", 278, 146, E.lambai, 22)),
    ),
  ],
};
