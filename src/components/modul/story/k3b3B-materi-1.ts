import type { AdeganStory } from "./logika-story";
import { E, W, emo, gergaji, gulungan, judul, kandangBeo, kotak, meteran, papan, tandaMeteran, tanah, teks, tokoh } from "./k3b3B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b3B-bantu";

/*
 * Cerita orisinal IGIL "Pita Pak Wayan" (Kelas 3 Bab 3 Sub-Bab B, hubungan sentimeter dan meter), Kebun Binatang Mini.
 * Naskah suara dari naskah/story-naskah-k3b3b.md. Bagian ini: bengkel kandang Pak Wayan, seratus sentimeter sama dengan satu meter, dan meter ke sentimeter.
 */

/* ------------------------------ 1. Bengkel kandang ------------------------------ */
const SUARA_B1 = "Pagi berikutnya Raka, Salsa, dan Bima menemui Pak Wayan, tukang kandang, di bengkelnya di belakang kebun binatang.";
const SUARA_B2 = "Pak Wayan sedang membuat kandang baru untuk burung beo.";
const SUARA_B3 = "Di pinggangnya tergantung meteran gulung dan pita kuning yang panjang.";

export const ADEGAN_BENGKEL: AdeganStory = {
  id: "bengkel-kandang",
  judul: "Bengkel kandang Pak Wayan",
  sumber: "Materi: bengkel kandang Pak Wayan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bengkel Pak Wayan"), ...tanah("tn", 150)),
      tambah("Raka,", ...tokoh("rk", 34, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 74, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 114, 184, "Bima")),
      tambah("Wayan,", ...tokoh("pw", 252, 184, "Pak Wayan")),
      tambah("bengkelnya", ...papan("mj", 166, 148, 70), ...gergaji("gg", 172, 138)),
    ),
    k(
      SUARA_B2,
      tambah("membuat", emo("pl", 146, 144, E.palu, 16)),
      tambah("kandang", ...kandangBeo("kb", 170, 96, 56, 44)),
      tambah("burung", emo("bo", 198, 124, E.beo, 18)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Meteran dan Pita"), ...tanah("tn", 150), ...tokoh("pw", 100, 184, "Pak Wayan")),
      sorotkan("pinggangnya", "pw-mt", "pw-pk"),
      tambah("meteran", ...gulungan("gl", 190, 124, 12), teks("lm", 190, 98, "meteran gulung", 8, W.coklat)),
      tambah("pita", kotak("pt", 203, 120, 90, 9, W.kuning, W.kuningTua, { rx: 1, tebal: 1.2 }), teks("lp", 248, 112, "pita kuning", 8, W.coklat)),
      tambah("panjang.", emo("uk", 258, 150, E.ukur, 16)),
    ),
  ],
};

/* ------------------------------ 2. Seratus sentimeter ------------------------------ */
const SUARA_S1 = "Pak Wayan menarik meteran dari angka nol sampai angka seratus.";
const SUARA_S2 = "Seratus sentimeter sama dengan satu meter.";
const SUARA_S3 = "Dua meter berarti dua ratus sentimeter.";

/** Meteran terbentang: x(n) = 50 + n * 1.1. */
const X0 = 50;
const SK = 1.1;
const YM = 96;

export const ADEGAN_SERATUS: AdeganStory = {
  id: "seratus",
  judul: "Seratus sentimeter sama dengan satu meter",
  sumber: "Materi: seratus sentimeter satu meter",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Meteran Pak Wayan"), ...tanah("tn", 150), ...tokoh("pw", 24, 184, "Pak Wayan")),
      tambah("meteran", meteran("mt", X0, YM, 110), ...tandaMeteran("mt", X0, YM, SK, 0, false)),
      tambah("nol", ...tandaMeteran("mt", X0, YM, SK, 0, true)),
      tambah("seratus", ...tandaMeteran("mt", X0, YM, SK, 100, true)),
    ),
    k(
      SUARA_S2,
      tambah("sentimeter", teks("c100", 105, 134, "100 cm", 10, W.senti)),
      tambah("satu", kotak("br", X0, 90, 110, 24, undefined, W.merah, { putus: true, z: 3 }), teks("m1", 105, 76, "1 m", 12, W.meter)),
      tambah("sama", teks("eq", 150, 160, "100 cm = 1 m", 14, W.biru)),
    ),
    k(
      SUARA_S3,
      tambah(0, teks("m2", 215, 76, "2 m", 12, W.meter), kotak("br2", X0, 90, 220, 24, undefined, W.merah, { putus: true, z: 2 })),
      hapus(0, "br"),
      ubah("meter", { id: "mt-b", w: 220 }),
      tambah("berarti", ...tandaMeteran("mt", X0, YM, SK, 200, false)),
      tambah("ratus", teks("mt-l200", 270, 118, "200", 8, W.biru)),
      tambah("sentimeter", teks("c200", 215, 134, "200 cm", 10, W.senti)),
      ubah("sentimeter", { id: "eq", isi: "200 cm = 2 m" }),
    ),
  ],
};

/* ------------------------------ 3. Meter ke sentimeter ------------------------------ */
const SUARA_M1 = "Tiang kandang itu panjangnya tiga meter. Berapa sentimeter?";
const SUARA_M2 = "Meter ke sentimeter, kalikan dengan seratus: tiga kali seratus sama dengan tiga ratus.";
const SUARA_M3 = "Jadi tiga meter sama dengan tiga ratus sentimeter.";

export const ADEGAN_METER_KE_CM: AdeganStory = {
  id: "meter-ke-cm",
  judul: "Meter ke sentimeter, kali seratus",
  sumber: "Materi: meter ke sentimeter",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Tiang Kandang"), ...tanah("tn", 150), ...tokoh("pw", 36, 184, "Pak Wayan")),
      tambah("Tiang", ...papan("ti", 80, 100, 180, 14)),
      tambah("tiga", teks("l3", 170, 88, "3 m", 14, W.meter)),
      tambah("Berapa", teks("tq", 170, 136, "? cm", 14, W.merah)),
    ),
    k(
      SUARA_M2,
      hapus(0, "tq"),
      tambah(0, teks("op", 170, 126, "meter ke sentimeter: kali 100", 9.6, W.ungu)),
      tambah("tiga", teks("e1", 150, 152, "3 × 100", 14, W.biru)),
      ubah("sama", { id: "e1", isi: "3 × 100 = 300" }),
    ),
    k(
      SUARA_M3,
      hapus(0, "op", "e1"),
      tambah("tiga", teks("h3", 120, 134, "3 m", 16, W.meter)),
      tambah("sama", teks("h4", 168, 134, "=", 16, W.biru)),
      tambah("ratus", teks("h5", 224, 134, "300 cm", 16, W.senti)),
      sorotkan("sentimeter.", "h5"),
    ),
  ],
};

