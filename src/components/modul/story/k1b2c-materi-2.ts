import type { AdeganStory } from "./logika-story";
import { E, W, deret, deretEmo, emo, judul, kalimat, kantong, kartu, kataKe, label, lompat, pagar, pesan, teks, xPagar } from "./k1b2c-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b2c-bantu";

/* Lanjutan "Pesanan Tetangga": menulis kalimat dan menjawab lengkap, memeriksa dengan tukar tempat, dan pesanan sepuluh dari Nenek. */

/* ------------------------------ 3. Tulis dan jawab lengkap ------------------------------ */
const SUARA_T1 = "Abang menulis kalimat penjumlahannya: empat ditambah tiga sama dengan tujuh.";
const SUARA_T2 = "Igil menjawab dengan kalimat lengkap: jadi, tetangga sebelah memesan tujuh tomat.";
const SUARA_T3 = "Mamah memasukkan tujuh tomat ke kantong dan menempel catatan pesanan.";

export const ADEGAN_TULIS: AdeganStory = {
  id: "tulis-jawab",
  judul: "Tulis kalimat dan jawab lengkap",
  sumber: "Materi: menulis dan menjawab lengkap",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Tulis kalimatnya")), tambah("Abang", emo("ab", 40, 76, E.abang, 28)), tambah("kalimat", ...kalimat("kl", 160, 76, ["4", "+", "3", "=", "7"], 22, 30))),
    k(SUARA_T2, tambah("Igil", emo("ig", 40, 130, E.igil, 28)), tambah("lengkap:", ...kartu("jw", 70, 112, 210, 30, W.hijauMuda, ["Jadi, 7 tomat."], 12))),
    k(SUARA_T3, tambah("kantong", ...kantong("kt", 112, 150, 76, 44)), tambah("tomat", ...deretEmo(E.tomat, "tk", deret(4, 126, 16, 176), 14)), tambah("catatan", ...label("lb", 200, 166, 90, "tomat 7", W.emas, 9))),
  ],
};

/* ------------------------------ 4. Bertambah dan periksa dengan tukar tempat ------------------------------ */
const ISI_2 = "Kemarin saya pesan dua timun. Hari ini saya pesan lima timun lagi. Berapa timun semuanya?";
const SUARA_K1 = "Pesan kedua dari tetangga ujung jalan: kemarin saya pesan dua timun, hari ini lima timun lagi.";
const SUARA_K2 = "Bilangannya dua dan lima. Timunnya bertambah, jadi dua ditambah lima sama dengan tujuh.";
const SUARA_K3 = "Kaka memeriksa dengan tukar tempat: lima ditambah dua juga tujuh. Jawabannya benar, tujuh timun.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa-tukar",
  judul: "Periksa dengan tukar tempat",
  sumber: "Materi: memeriksa jawaban",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Pesan kedua")), tambah("Pesan", ...pesan("ps", 20, 34, 260, ISI_2, 10.5)), tambah("dua", ...deretEmo(E.timun, "ta", deret(2, 60, 26, 130), 20)), tambah("lima", ...deretEmo(E.timun, "tb", deret(5, 146, 26, 130), 20))),
    k(SUARA_K2, sorotkan("Bilangannya", `ps-w${kataKe(ISI_2, "dua")}`, `ps-w${kataKe(ISI_2, "lima")}`), tambah("bertambah,", teks("bt", 150, 104, "bertambah", 10, W.hijau)), tambah("dua@2", ...kalimat("ka", 150, 172, ["2", "+", "5", "=", "7"], 18, 26))),
    k(SUARA_K3, hapus(0, "bt"), tambah("tukar", ...kalimat("kb", 150, 196, ["5", "+", "2", "=", "7"], 14, 22)), tambah("benar,", emo("ok", 262, 172, E.benar, 22)), sorotkan("tujuh@2", "ka4", "kb4")),
  ],
};

/* ------------------------------ 5. Pesanan sepuluh dari Nenek ------------------------------ */
const SUARA_S1 = "Pesan terakhir dari Nenek: kirim enam wortel dan empat jagung untuk pesta panen.";
const SUARA_S2 = "Igil mulai dari enam, lalu hitung maju di pagar bernomor: tujuh, delapan, sembilan, sepuluh.";
const SUARA_S3 = "Enam ditambah empat sama dengan sepuluh. Jadi, Nenek mendapat sepuluh sayur. Keranjangnya penuh!";
const PG = { x0: 20, y: 132, s: 26 };
const posS2 = urutKata(SUARA_S2, ["tujuh,", "delapan,", "sembilan,", "sepuluh."], "bernomor:");

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "pesanan-nenek",
  judul: "Pesanan sepuluh dari Nenek",
  sumber: "Materi: soal cerita sampai sepuluh",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Pesan dari Nenek")), tambah("Nenek:", emo("nn", 30, 70, E.nenek, 28)), tambah("enam", ...deretEmo(E.wortel, "wr", deret(6, 70, 22, 70), 18)), tambah("empat", ...deretEmo(E.jagung, "jg", deret(4, 210, 22, 70), 18))),
    k(
      SUARA_S2,
      tambah("pagar", ...pagar("pg", PG.x0, PG.y, PG.s), emo("ig", xPagar(PG.x0, 6, PG.s), PG.y - 30, E.igil, 18)),
      sorotkan("enam,", "pga6"),
      ...posS2.map((p, i) => tambah(p, lompat(`lp${i}`, PG.x0, PG.y, 6 + i, PG.s))),
      ...posS2.map((p, i) => ubah(p, { id: "ig", x: xPagar(PG.x0, 7 + i, PG.s) }, { id: `pga${7 + i}`, sorot: true })),
    ),
    k(SUARA_S3, tambah("Enam", ...kalimat("kl", 150, 192, ["6", "+", "4", "=", "10"], 16, 26)), tambah("Jadi,", ...kartu("jw", 14, 86, 110, 22, W.hijauMuda, ["Jadi, 10 sayur."], 9.4)), sorotkan("penuh!", "jw-k")),
  ],
};
