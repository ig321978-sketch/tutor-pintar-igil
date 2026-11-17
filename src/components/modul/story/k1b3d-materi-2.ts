import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, judul, kalimatC, kartu, orang, teks } from "./k1b3d-gambar";
import { k, sorotkan, tambah, ubah } from "./k1b3d-bantu";

/* Lanjutan "Tiba di Rumah Nenek": berkurang dua kali, lalu Igil membuat cerita hitungan sendiri dan menjawab dengan kalimat lengkap. */

/* ------------------------------ 4. Berkurang dua kali ------------------------------ */
const SUARA_D1 = "Kaka membawa sembilan permen. Dua permen dimakan Igil, lalu empat diberikan kepada anak tetangga.";
const SUARA_D2 = "Kaka mengurangi dua kali. Sembilan dikurangi dua sama dengan tujuh. Tujuh dikurangi empat sama dengan tiga.";
const SUARA_D3 = "Cara lain, gabungkan dulu yang pergi. Dua dan empat menjadi enam. Sembilan dikurangi enam sama dengan tiga.";
const SUARA_D4 = "Dua cara, hasilnya sama. Permen Kaka tinggal tiga.";
const PERMEN = deret(9, 30, 30, 66);

export const ADEGAN_DUA_KALI: AdeganStory = {
  id: "dua-kali",
  judul: "Berkurang dua kali",
  sumber: "Materi: pengurangan dua kali",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Permen Kaka")),
      tambah("sembilan", ...deretEmo(E.permen, "pm", PERMEN, 20)),
      ubah("dimakan", { id: "pm7", op: 0.3 }, { id: "pm8", op: 0.3 }),
      tambah("Igil,", teks("t2", 255, 92, "dimakan 2", 9, W.merah)),
      ubah("empat", ...[3, 4, 5, 6].map((i) => ({ id: `pm${i}`, op: 0.3 }))),
      tambah("tetangga.", teks("t4", 150, 92, "diberikan 4", 9, W.merah)),
    ),
    k(SUARA_D2, tambah("Sembilan", ...kalimatC("k1", 150, 120, ["9", KURANG, "2", "=", "7"], 16, 24)), tambah("Tujuh@2", ...kalimatC("k2", 150, 146, ["7", KURANG, "4", "=", "3"], 16, 24))),
    k(SUARA_D3, tambah("gabungkan", teks("gb", 150, 168, "2 dan 4 jadi 6", 10, W.ungu)), tambah("Sembilan", ...kalimatC("k3", 150, 192, ["9", KURANG, "6", "=", "3"], 16, 24))),
    k(SUARA_D4, sorotkan("sama.", "k24", "k34"), sorotkan("tiga.", "pm0", "pm1", "pm2"), tambah("tiga.", emo("ok", 270, 40, E.benar, 20))),
  ],
};

/* ------------------------------ 5. Igil membuat cerita sendiri ------------------------------ */
const SUARA_B1 = "Lalu Igil membuat cerita sendiri untuk Nenek. Ada delapan gelas teh, lima gelas diminum. Berapa yang tersisa?";
const SUARA_B2 = "Nenek menulis delapan dikurangi lima sama dengan tiga.";
const SUARA_B3 = "Lalu Nenek menjawab dengan kalimat lengkap: jadi, tersisa tiga gelas teh. Igil tersenyum, jawabannya benar.";
const TEH = deret(8, 45, 30, 70);

export const ADEGAN_BUAT: AdeganStory = {
  id: "buat-cerita",
  judul: "Igil membuat cerita sendiri",
  sumber: "Materi: membuat cerita hitungan",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cerita buatan Igil"), ...orang("ig", 36, 156, E.igil, "Igil")),
      tambah("delapan", ...deretEmo(E.teh, "th", TEH, 20)),
      ubah("diminum.", ...[3, 4, 5, 6, 7].map((i) => ({ id: `th${i}`, op: 0.3 }))),
      tambah("tersisa?", teks("tq", 150, 98, "berapa yang tersisa?", 10, W.merah)),
    ),
    k(SUARA_B2, tambah("Nenek", ...orang("nn", 264, 156, E.nenek, "Nenek")), tambah("delapan", ...kalimatC("kl", 150, 128, ["8", KURANG, "5", "=", "3"], 18, 26))),
    k(SUARA_B3, tambah("lengkap:", ...kartu("jw", 70, 168, 160, 26, W.emas, ["Jadi, tersisa 3 gelas teh."], 10)), sorotkan("benar.", "ig")),
  ],
};
