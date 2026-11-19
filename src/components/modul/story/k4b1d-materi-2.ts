import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kotakTempat, panah, pasir, pohon, teks, tokoh, wadah } from "./k4b1d-gambar";
import { k, sorotkan, tambah, ubah } from "./k4b1d-bantu";

/*
 * Cerita orisinal IGIL "Kios Kelapa Pak Darwis" (Kelas 4 Bab 1 Sub-Bab D), Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1d.md. Bagian ini: papan tempat angka, uraian yang benar, dan Satria memanjat pohon kelapa.
 */

/* ------------------------------ 4. Papan empat kotak ------------------------------ */
const SUARA_B1 = "Genta menunjuk papan empat kotak, ribuan, ratusan, puluhan, dan satuan.";
const SUARA_B2 = "Angka tujuh ada di puluhan, jadi artinya tujuh puluh, bukan tujuh.";
const SUARA_B3 = "Satuannya nol, jadi tidak ada butir yang berdiri sendiri.";
const T1 = kotakTempat("t1", 16, 64, 60, 70, "ribuan");
const T2 = kotakTempat("t2", 88, 64, 60, 70, "ratusan");
const T3 = kotakTempat("t3", 160, 64, 60, 70, "puluhan");
const T4 = kotakTempat("t4", 232, 64, 60, 70, "satuan");

export const ADEGAN_BAGAN: AdeganStory = {
  id: "bagan",
  judul: "Papan empat kotak tempat angka",
  sumber: "Materi: papan tempat angka",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Papan Tempat Angka"), ...tokoh("gn", 40, 184, "Genta")),
      tambah("menunjuk", panah("pa", 62, 156, 50, -20, W.merah, 2)),
      tambah("papan", T1[0], T2[0], T3[0], T4[0]),
      tambah("empat", teks("k4", 262, 44, "4 kotak", 10, W.merah)),
      tambah("ribuan,", T1[1]),
      tambah("ratusan,", T2[1]),
      tambah("puluhan,", T3[1]),
      tambah("satuan.", T4[1]),
    ),
    k(
      SUARA_B2,
      tambah("tujuh", teks("d1", 46, 108, "5", 30, W.biru), teks("d2", 118, 108, "2", 30, W.biru), teks("d3", 190, 108, "7", 30, W.biru), teks("d4", 262, 108, "0", 30, W.biru)),
      sorotkan("puluhan,", "t3-k"),
      tambah("jadi", teks("h1", 46, 126, "5.000", 9, W.coklat), teks("h2", 118, 126, "200", 9, W.coklat), teks("h4", 262, 126, "0", 9, W.coklat)),
      tambah("puluh,", teks("h3", 190, 126, "70", 9, W.merah)),
      tambah("bukan", emo("xs", 212, 84, E.salah, 14)),
    ),
    k(
      SUARA_B3,
      sorotkan("Satuannya", "t4-k"),
      tambah("tidak", emo("xk", 276, 160, E.salah, 16)),
      tambah("butir", emo("kb", 250, 162, E.kelapa, 22)),
    ),
  ],
};

/* ------------------------------ 5. Uraian yang benar ------------------------------ */
const SUARA_N1 = "Penguraian yang benar adalah lima ribu ditambah dua ratus ditambah tujuh puluh.";
const SUARA_N2 = "Kalau ketiganya digabung, hasilnya lima ribu dua ratus tujuh puluh.";
const SUARA_N3 = "Nol di satuan tidak perlu ditulis dalam penjumlahan.";

export const ADEGAN_BENAR: AdeganStory = {
  id: "benar",
  judul: "Uraian yang benar",
  sumber: "Materi: uraian yang benar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Uraian yang Benar")),
      tambah("benar", emo("ok", 36, 76, E.benar, 22)),
      tambah("lima", teks("ur", 160, 76, "5.000", 20, W.hijauTua), ...wadah("b1", 34, 96, 70, 52), teks("l1", 69, 126, "5.000", 15, W.biru, { z: 4 })),
      ubah("dua", { id: "ur", isi: "5.000 + 200" }),
      tambah("dua", ...wadah("b2", 120, 104, 58, 44), teks("l2", 149, 131, "200", 15, W.biru, { z: 4 })),
      ubah("tujuh", { id: "ur", isi: "5.000 + 200 + 70" }),
      tambah("tujuh", ...wadah("b3", 194, 112, 44, 36), teks("l3", 216, 134, "70", 14, W.biru, { z: 4 })),
    ),
    k(
      SUARA_N2,
      sorotkan("digabung,", "b1-k", "b2-k", "b3-k"),
      ubah("hasilnya", { id: "ur", isi: "5.000 + 200 + 70 = 5.270", u: 16 }),
      tambah("lima", teks("hs", 150, 176, "5.270", 26, W.merah)),
    ),
    k(
      SUARA_N3,
      tambah("Nol", ...wadah("b4", 250, 112, 34, 36), teks("z0", 267, 134, "0", 14, W.biru, { z: 4 }), teks("n4", 267, 162, "satuan", 8.4, W.ungu)),
      ubah("tidak", { id: "b4-k", op: 0.3 }, { id: "b4-h", op: 0.3 }, { id: "z0", op: 0.5 }),
      tambah("ditulis", emo("xz", 292, 118, E.salah, 14)),
    ),
  ],
};

/* ------------------------------ 6. Satria memanjat ------------------------------ */
const SUARA_M1 = "Satria menghela napas dan mulai memanjat pohon kelapa itu.";
const SUARA_M2 = "Pak Hendro berseru dari bawah, hati-hati, jangan terlalu tinggi!";
const SUARA_M3 = "Satria turun lagi dengan wajah merah, membawa satu kelapa sebagai tanda bukti.";

export const ADEGAN_PANJAT: AdeganStory = {
  id: "panjat",
  judul: "Satria memanjat pohon kelapa",
  sumber: "Materi: memanjat pohon",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Satria Memanjat"), ...pasir("ps", 150)),
      tambah("Satria", emo("sat", 150, 168, E.satria, 26), teks("sn", 150, 186, "Satria", 8.4, W.ungu)),
      tambah("napas", teks("hh", 118, 140, "huh...", 9, W.coklat)),
      tambah("pohon", pohon("pk", 200, 150, 90)),
      ubah("memanjat", { id: "sat", x: 200, y: 120 }, { id: "sn", x: 200, y: 136 }),
    ),
    k(
      SUARA_M2,
      tambah("Pak", ...tokoh("ph", 60, 184, "Pak Hendro")),
      tambah("berseru", emo("tg", 92, 150, E.tangan, 20)),
      tambah("hati-hati,", teks("ht", 90, 112, "hati-hati!", 11, W.merah)),
    ),
    k(
      SUARA_M3,
      ubah("turun", { id: "sat", x: 150, y: 170 }, { id: "sn", x: 150, y: 186 }),
      ubah("wajah", { id: "sat", isi: E.malu }),
      tambah("membawa", emo("kl2", 168, 166, E.kelapa, 16)),
      tambah("satu", teks("s1", 236, 138, "1 kelapa", 11, W.merah)),
      tambah("bukti.", ...wadah("kc", 226, 148, 34, 24), emo("kj", 243, 162, E.kelapa, 14, { z: 4 })),
    ),
  ],
};
