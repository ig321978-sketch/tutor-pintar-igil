import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, judul, kalimatC, kartu, kotak, orang } from "./k1b3c-gambar";
import { k, sorotkan, tambah, ubah } from "./k1b3c-bantu";

/* Lanjutan "Kondektur dan Penumpang": memeriksa pengurangan dengan penjumlahan, lalu mencari bilangan yang hilang. */

/* ------------------------------ 4. Memeriksa dengan penjumlahan ------------------------------ */
const SUARA_P1 = "Kondektur menulis sembilan dikurangi lima sama dengan empat. Sembilan penumpang, lima turun.";
const SUARA_P2 = "Abang memeriksa dengan kebalikannya. Empat yang tinggal ditambah lima yang turun sama dengan sembilan.";
const SUARA_P3 = "Kembali ke sembilan, jadi catatannya benar. Penjumlahan membatalkan pengurangan, seperti penumpang yang turun lalu naik lagi.";
const PN = deret(9, 30, 30, 110);
const TURUN = [4, 5, 6, 7, 8];

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa-tambah",
  judul: "Memeriksa dengan penjumlahan",
  sumber: "Materi: memeriksa dengan kebalikan",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Memeriksa catatan")),
      tambah("menulis", ...kalimatC("k1", 150, 52, ["9", KURANG, "5", "=", "4"], 18, 26)),
      tambah("penumpang,", ...deretEmo(E.penumpang, "pn", PN, 20)),
      ubah("turun.", ...TURUN.map((i) => ({ id: `pn${i}`, op: 0.3 }))),
    ),
    k(
      SUARA_P2,
      tambah("Abang", ...orang("ab", 40, 170, E.abang, "Abang")),
      sorotkan("Empat", "pn0", "pn1", "pn2", "pn3"),
      ubah("turun", ...TURUN.map((i) => ({ id: `pn${i}`, op: 1, sorot: true }))),
      tambah("sembilan.", ...kalimatC("k2", 170, 160, ["4", "+", "5", "=", "9"], 18, 26)),
    ),
    k(SUARA_P3, tambah("benar.", emo("ok", 270, 52, E.benar, 22)), tambah("membatalkan", ...kartu("kb", 80, 76, 140, 22, W.hijauMuda, [`${KURANG} dan + berkebalikan`], 9.5))),
  ],
};

/* ------------------------------ 5. Mencari bilangan yang hilang ------------------------------ */
const SUARA_H1 = "Satu catatan kena noda, jadi satu bilangan tidak terbaca: enam ditambah berapa sama dengan sembilan?";
const SUARA_H2 = "Abang memakai pengurangan. Sembilan dikurangi enam sama dengan tiga.";
const SUARA_H3 = "Jadi tiga penumpang naik. Abang memeriksa lagi: enam ditambah tiga sama dengan sembilan. Cocok!";

export const ADEGAN_HILANG: AdeganStory = {
  id: "bilangan-hilang",
  judul: "Mencari bilangan yang hilang",
  sumber: "Materi: mencari bilangan yang hilang",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Catatan kena noda"), kotak("pp", 60, 40, 180, 50, "#FFFFFF", W.biru, { rx: 8, tebal: 2, z: -1 })),
      tambah("noda,", emo("nd", 150, 58, E.noda, 26)),
      tambah("berapa", ...kalimatC("k1", 150, 74, ["6", "+", "?", "=", "9"], 20, 28)),
    ),
    k(SUARA_H2, tambah("Abang", ...orang("ab", 40, 150, E.abang, "Abang")), tambah("dikurangi", ...kalimatC("k2", 170, 130, ["9", KURANG, "6", "=", "3"], 18, 26))),
    k(
      SUARA_H3,
      ubah("tiga", { id: "k12", isi: "3", warna: W.hijau }),
      tambah("naik.", ...deretEmo(E.penumpang, "nk", deret(3, 258, 0, 62), 16).map((o, i) => ({ ...o, y: 52 + i * 18 }))),
      tambah("memeriksa", ...kalimatC("k3", 170, 172, ["6", "+", "3", "=", "9"], 18, 26)),
      tambah("Cocok!", emo("ok", 270, 172, E.benar, 20)),
    ),
  ],
};
