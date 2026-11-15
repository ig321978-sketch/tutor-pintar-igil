import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bangun, bulat, capLingkaran, capTelur, emo, garis, hati, judul, kartu, lingkaran, namaBangun, relBeraturan, relRumah, relSegiempat, relSegitiga, teks, telur, warnaSegi } from "./k2b3A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b3A-bantu";

/* ------------------------------ 10. Lingkaran: cetak dan putar ------------------------------ */
const SUARA_C1 = "Sekarang kita kenali lingkaran. Lingkaran berbeda dari bentuk lengkung yang lain.";
const SUARA_C2 = "Titik di tepi lingkaran sama jauh dari titik tengah. Garis ini semuanya sama panjang.";
const SUARA_C3 = "Sekarang kita cetak lingkaran di layar. Tekan lingkaran, lalu muncul cap tepinya.";
const SUARA_C4 = "Sekarang putar lingkaran di atas capnya. Ke mana pun diputar, bentuknya selalu pas.";
const SUARA_C5 = "Sekarang kita coba bentuk telur. Cetak dulu tepinya, lalu siap diputar.";
const SUARA_C6 = "Saat telur diputar, ada bagian yang keluar dari cap. Bentuknya tidak pas.";
const SUARA_C7 = "Jadi hanya lingkaran yang selalu pas ketika diputar. Itulah ciri lingkaran. Telur dan hati tidak punya ciri itu.";
/** Jari-jari lingkaran pada langkah menguji: lingkaran `lg` berpusat (150, 100). */
export const R_UJI = 38;
const jari = (i: number, r: number): Obj => garis(`jr${i}`, 150, 98, Math.round(r * Math.cos((i * Math.PI) / 3) * 10) / 10, Math.round(r * Math.sin((i * Math.PI) / 3) * 10) / 10, W.merah, 2.4);

export const ADEGAN_LINGKARAN_PUTAR: AdeganStory = {
  id: "lingkaran-putar",
  judul: "Lingkaran: cetak dan putar",
  sumber: "Materi: lingkaran bisa berputar",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Lingkaran")),
      tambah(idx(SUARA_C1, "lingkaran."), lingkaran("lg", 55, 96, 24), namaBangun("lg", 55, 146, "lingkaran", 10)),
      tambah(idx(SUARA_C1, "lain."), telur("tl", 150, 96, 34, 22), namaBangun("tl", 150, 146, "telur", 10), hati("ht", 245, 98, 24), namaBangun("ht", 245, 146, "hati", 10)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Sama jauh"), lingkaran("lg", 150, 98, 44)),
      tambah(idx(SUARA_C2, "tengah."), bulat("lt", 150, 98, 3.4, W.merah, W.merah)),
      tambah(idx(SUARA_C2, "Garis"), ...[0, 1, 2, 3, 4, 5].map((i) => jari(i, 44))),
      tambah(idx(SUARA_C2, "panjang."), ...kartu("sj", 70, 158, 160, 26, W.krem, ["sama jauh dari tengah"], 10)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Cetak lingkaran"), lingkaran("lg", 150, 100, R_UJI)),
      sorotkan(idx(SUARA_C3, "Tekan"), "lg"),
      tambah(idx(SUARA_C3, "Tekan"), emo("tg", 150, 108, "\u{1F446}", 22)),
      redamkan(idx(SUARA_C3, "muncul"), "lg"),
      hapus(idx(SUARA_C3, "muncul"), "tg"),
      tambah(idx(SUARA_C3, "cap"), capLingkaran("lg", 150, 100, R_UJI)),
      tambah(idx(SUARA_C3, "tepinya."), ...kartu("cp", 80, 152, 140, 24, W.krem, ["cap: tepi lingkaran"], 10)),
    ),
    k(
      SUARA_C4,
      hapus(0, "cp-k", "cp-t0"),
      tambah(idx(SUARA_C4, "putar"), garis("pt", 150, 100, R_UJI, 0, W.merah, 3)),
      ubah(idx(SUARA_C4, "Ke"), { id: "pt", rot: 90 }),
      ubah(idx(SUARA_C4, "diputar,"), { id: "pt", rot: 180 }),
      ubah(idx(SUARA_C4, "selalu"), { id: "pt", rot: 300 }),
      tambah(idx(SUARA_C4, "pas."), ...kartu("sp", 80, 152, 140, 24, W.hijauMuda, ["selalu pas"], 11)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Cetak telur")),
      tambah(idx(SUARA_C5, "telur."), telur("tl", 150, 100, 44, 26)),
      tambah(idx(SUARA_C5, "tepinya,"), capTelur("tl", 150, 100, 44, 26)),
      tambah(idx(SUARA_C5, "siap"), ...kartu("cp", 80, 158, 140, 24, W.krem, ["cap tepi telur"], 10)),
    ),
    k(SUARA_C6, ubah(idx(SUARA_C6, "diputar,"), { id: "tl", rot: 90 }), hapus(idx(SUARA_C6, "keluar"), "cp-k", "cp-t0"), tambah(idx(SUARA_C6, "tidak"), emo("no", 150, 182, "❌", 24))),
    k(
      SUARA_C7,
      bersih(0),
      tambah(0, judul("Hanya lingkaran selalu pas")),
      tambah(idx(SUARA_C7, "lingkaran"), lingkaran("lg", 75, 100, 32), capLingkaran("lg", 75, 100, 32), emo("lg-ok", 75, 166, "✅", 24), namaBangun("lg", 75, 190, "lingkaran", 11)),
      tambah(idx(SUARA_C7, "diputar."), telur("tl", 225, 100, 40, 24, undefined, { rot: 90 }), capTelur("tl", 225, 100, 40, 24), emo("tl-no", 225, 166, "❌", 24), namaBangun("tl", 225, 190, "telur", 11)),
    ),
  ],
};

/* ------------------------------ 11. Temukan bentuk di layar ------------------------------ */
const SUARA_T1 = "Ayo bantu Kira mencari bentuk bangun datar yang tampil di layar. Ketuk benda yang kamu lihat.";
const SUARA_T2 = "Rambu ini berbentuk segitiga. Sisinya tiga.";
const SUARA_T3 = "Bendera berbentuk segi empat. Sisinya empat.";
const SUARA_T4 = "Rumah burung berbentuk segi lima. Sisinya lima.";
const SUARA_T5 = "Sarang lebah berbentuk segi enam. Sisinya enam.";
const SUARA_T6 = "Jam dinding berbentuk lingkaran, dan telur berbentuk lengkung. Keduanya tidak punya sisi lurus.";
const SUARA_T7 = "Kamu hebat! Bentuk bangun datar ada di mana-mana. Sekarang kamu bisa mengenali dan menamainya.";
const XB = [50, 150, 250, 50, 150, 250];
const YB = [58, 58, 58, 134, 134, 134];
const NAMA_BENDA = ["rambu", "bendera", "rumah burung", "sarang lebah", "jam dinding", "telur"];
const bendaKe = (i: number): Obj =>
  [
    bangun("bn0", relSegitiga(40, 36), XB[0], YB[0], warnaSegi(3)),
    bangun("bn1", relSegiempat(46, 30), XB[1], YB[1], warnaSegi(4)),
    bangun("bn2", relRumah(38, 38), XB[2], YB[2], warnaSegi(5)),
    bangun("bn3", relBeraturan(6, 21), XB[3], YB[3], warnaSegi(6)),
    lingkaran("bn4", XB[4], YB[4], 20),
    telur("bn5", XB[5], YB[5], 24, 16),
  ][i];
const bd = (i: number): Obj => teks(`bn${i}-bd`, XB[i], YB[i] + 32, NAMA_BENDA[i], 8.4);
const nmB = (i: number, isi: string): Obj => teks(`bn${i}-nm`, XB[i], YB[i] + 43, isi, 9.5, W.ungu);

export const ADEGAN_TEMUKAN_BENTUK: AdeganStory = {
  id: "temukan-bentuk",
  judul: "Temukan bentuk di layar",
  sumber: "Materi: bangun datar pada benda",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Cari bentuk")), tambah(idx(SUARA_T1, "layar."), ...[0, 1, 2, 3, 4, 5].map(bendaKe)), tambah(idx(SUARA_T1, "benda"), ...[0, 1, 2, 3, 4, 5].map(bd))),
    k(SUARA_T2, sorotkan(idx(SUARA_T2, "Rambu"), "bn0"), tambah(idx(SUARA_T2, "segitiga."), nmB(0, "segitiga")), redamkan(idx(SUARA_T2, "tiga."), "bn0")),
    k(SUARA_T3, sorotkan(idx(SUARA_T3, "Bendera"), "bn1"), tambah(idx(SUARA_T3, "empat.", 1), nmB(1, "segi empat")), redamkan(idx(SUARA_T3, "empat.", 2), "bn1")),
    k(SUARA_T4, sorotkan(idx(SUARA_T4, "Rumah"), "bn2"), tambah(idx(SUARA_T4, "lima.", 1), nmB(2, "segi lima")), redamkan(idx(SUARA_T4, "lima.", 2), "bn2")),
    k(SUARA_T5, sorotkan(idx(SUARA_T5, "Sarang"), "bn3"), tambah(idx(SUARA_T5, "enam.", 1), nmB(3, "segi enam")), redamkan(idx(SUARA_T5, "enam.", 2), "bn3")),
    k(
      SUARA_T6,
      sorotkan(idx(SUARA_T6, "Jam"), "bn4"),
      tambah(idx(SUARA_T6, "lingkaran,"), nmB(4, "lingkaran")),
      sorotkan(idx(SUARA_T6, "telur"), "bn5"),
      tambah(idx(SUARA_T6, "lengkung."), nmB(5, "lengkung")),
      redamkan(idx(SUARA_T6, "lurus."), "bn4", "bn5"),
    ),
    k(SUARA_T7, tambah(idx(SUARA_T7, "hebat!"), emo("ok", 150, 196, "\u{1F31F}", 16))),
  ],
};

/* ------------------------------ 12. Tiga pertanyaan detektif bentuk ------------------------------ */
const SUARA_Q1 = "Sekarang kita jadi detektif bentuk. Ada tiga pertanyaan untuk mengenali bangun datar.";
const SUARA_Q2 = "Pertanyaan pertama, tepinya garis lurus atau garis lengkung?";
const SUARA_Q3 = "Pertanyaan kedua, kalau lurus, berapa sisinya? Hitung, lalu sebut namanya.";
const SUARA_Q4 = "Pertanyaan ketiga, kalau lengkung, apakah pas saat diputar? Kalau selalu pas, itu lingkaran.";
const SUARA_Q5 = "Dengan tiga pertanyaan ini, kamu bisa mengenali bangun datar apa pun. Ayo kita berlatih!";
const kartuQ = (i: number): Obj[] =>
  kartu(`q${i}`, 14, 34 + i * 50, 272, 44, [W.langit, W.hijauMuda, W.pink][i], [["1. Tepinya lurus atau lengkung?"], ["2. Kalau lurus, berapa sisinya?"], ["3. Kalau lengkung, pas saat diputar?"]][i], 10);

export const ADEGAN_TIGA_PERTANYAAN: AdeganStory = {
  id: "tiga-pertanyaan",
  judul: "Tiga pertanyaan detektif bentuk",
  sumber: "Materi: tiga pertanyaan detektif bentuk",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Detektif bentuk")), tambah(idx(SUARA_Q1, "detektif"), emo("dt", 150, 112, "\u{1F575}", 56))),
    k(SUARA_Q2, bersih(0), tambah(0, judul("Detektif bentuk")), tambah(idx(SUARA_Q2, "tepinya"), ...kartuQ(0))),
    k(SUARA_Q3, tambah(idx(SUARA_Q3, "kalau"), ...kartuQ(1)), sorotkan(idx(SUARA_Q3, "Hitung,"), "q1-k")),
    k(SUARA_Q4, redamkan(0, "q1-k"), tambah(idx(SUARA_Q4, "lengkung,"), ...kartuQ(2)), sorotkan(idx(SUARA_Q4, "lingkaran."), "q2-k")),
    k(SUARA_Q5, redamkan(0, "q2-k"), sorotkan(idx(SUARA_Q5, "mengenali"), "q0-k", "q1-k", "q2-k"), tambah(idx(SUARA_Q5, "apa"), emo("ow", 150, 196, OWL, 16))),
  ],
};
