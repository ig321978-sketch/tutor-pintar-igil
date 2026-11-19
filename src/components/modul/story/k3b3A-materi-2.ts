import type { AdeganStory } from "./logika-story";
import { E, W, batang, emo, garis, judul, kertas, meja, panah, penggaris, teks, tokoh } from "./k3b3A-gambar";
import { k, sorotkan, tambah, ubah } from "./k3b3A-bantu";

/*
 * Cerita orisinal IGIL "Ukuran Kandang Kak Tari" (Kelas 3 Bab 3 Sub-Bab A), awal cerita Kebun Binatang Mini.
 * Naskah suara dari naskah/story-naskah-k3b3a.md. Bagian ini: salah baca (ujung di angka dua), mulai dari nol, dan menulis satuan.
 */
const KAYU = "#FDE68A";

/* ------------------------------ 4. Salah baca ------------------------------ */
const SUARA_B1 = "Raka menaruh papan nama kandang kelinci pada penggaris dengan ujung kiri di angka dua.";
const SUARA_B2 = "Ujung kanan di angka tujuh belas, dan Raka berseru, tujuh belas sentimeter! Kalau salah, aku mengepel kandang kelinci!";
const SUARA_B3 = "Salsa menggeleng. Ujung papan harus tepat di angka nol, bukan di angka dua.";

export const ADEGAN_SALAH_BACA: AdeganStory = {
  id: "salah-baca",
  judul: "Raka salah baca penggaris",
  sumber: "Materi: Raka salah baca penggaris",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Salah Mulai dari Dua"), ...meja("mj", 128)),
      tambah("Raka", ...tokoh("rk", 30, 184, "Raka")),
      tambah("papan", ...batang("pp", 54, 94, 180, 16, KAYU, "KELINCI", 8)),
      tambah("penggaris", ...penggaris("pg", 30, 112, 20, 12)),
      tambah("kiri", teks("m2", 54, 86, "2", 14, W.merah)),
      tambah("dua", panah("pk", 54, 54, 0, 16, W.merah, 2.2)),
    ),
    k(
      SUARA_B2,
      tambah("Ujung", teks("m17", 234, 86, "17", 14, W.merah)),
      tambah("tujuh", panah("pk2", 234, 54, 0, 16, W.merah, 2.2)),
      tambah("berseru,", teks("b17", 150, 62, "17 cm!", 16, W.merah)),
      tambah("mengepel", emo("pl", 58, 170, E.pel, 20)),
      tambah("kelinci!", emo("kc", 262, 166, E.kelinci, 20)),
    ),
    k(
      SUARA_B3,
      tambah("Salsa", ...tokoh("sl", 100, 184, "Salsa")),
      tambah("menggeleng.", emo("gl", 128, 166, "\u{1F645}", 20)),
      tambah("tepat", teks("m0", 30, 86, "0", 14, W.hijau)),
      tambah("nol,", emo("ok0", 30, 66, E.benar, 16)),
      tambah("dua.", emo("x2", 54, 66, E.salah, 16)),
    ),
  ],
};

/* ------------------------------ 5. Mulai dari nol ------------------------------ */
const SUARA_N1 = "Salsa menggeser papan sampai ujung kirinya tepat di angka nol.";
const SUARA_N2 = "Sekarang ujung kanan papan berada di angka lima belas.";
const SUARA_N3 = "Panjang papan adalah lima belas sentimeter, dua lebih pendek daripada bacaan Raka.";

export const ADEGAN_MULAI_NOL: AdeganStory = {
  id: "mulai-nol",
  judul: "Mulai dari angka nol",
  sumber: "Materi: mulai dari angka nol",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Mulai dari Nol"), ...meja("mj", 128), ...penggaris("pg", 30, 112, 20, 12)),
      tambah("Salsa", ...tokoh("sl", 270, 184, "Salsa")),
      tambah("papan", ...batang("pp", 54, 94, 180, 16, KAYU, "KELINCI", 8)),
      tambah("sampai", panah("ps", 130, 78, -70, 0, W.merah, 2.4)),
      ubah("tepat", { id: "pp", x: 30 }, { id: "pp-t", x: 120 }),
      tambah("nol", teks("m0", 30, 86, "0", 14, W.hijau), emo("ok", 30, 64, E.benar, 16)),
    ),
    k(
      SUARA_N2,
      sorotkan("papan", "pp"),
      tambah("kanan", panah("pk", 210, 54, 0, 16, W.merah, 2.4)),
      tambah("lima", teks("m15", 210, 86, "15", 14, W.merah)),
    ),
    k(
      SUARA_N3,
      tambah("lima", teks("p15", 150, 60, "15 cm", 16, W.hijauTua)),
      tambah("dua", teks("sel", 150, 152, "2 lebih pendek", 11, W.merah)),
      tambah("bacaan", teks("b17", 268, 86, "17", 14, W.merah, { op: 0.6 }), garis("cr", 260, 90, 16, -12, W.merah, 2)),
      tambah("Raka.", ...tokoh("rk", 30, 184, "Raka")),
    ),
  ],
};

/* ------------------------------ 6. Menulis satuan ------------------------------ */
const SUARA_T1 = "Hasil ukur harus ditulis dengan satuan baku.";
const SUARA_T2 = "Lima belas sentimeter, ditulis lima belas cm, bukan hanya lima belas.";
const SUARA_T3 = "Raka cemberut dan mengambil pel, karena taruhan tetap taruhan.";

export const ADEGAN_TULIS_SATUAN: AdeganStory = {
  id: "tulis-satuan",
  judul: "Menulis hasil ukur dengan satuan",
  sumber: "Materi: menulis hasil ukur dengan satuan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tulis dengan Satuan"), ...kertas("kc", 70, 44, 160, 84, ["hasil ukur"], 11)),
      tambah("ditulis", ...tokoh("sl", 40, 184, "Salsa"), emo("ps", 94, 170, E.pensil, 18)),
      tambah("satuan", teks("u1", 150, 118, "… cm", 18, W.hijauTua)),
      tambah("baku", emo("ct", 252, 60, E.catat, 22)),
    ),
    k(
      SUARA_T2,
      ubah(0, { id: "u1", isi: "15 cm" }),
      tambah("ditulis", emo("t1", 52, 100, E.benar, 20)),
      tambah("bukan", ...kertas("ke", 236, 72, 52, 36, ["15"], 16)),
      tambah("hanya", emo("x1", 262, 62, E.salah, 18)),
    ),
    k(
      SUARA_T3,
      tambah("Raka", ...tokoh("rk", 250, 184, "Raka")),
      tambah("cemberut", emo("cb", 250, 138, E.cemberut, 20)),
      tambah("mengambil", emo("pl", 222, 170, E.pel, 20)),
      tambah("taruhan", teks("tr", 140, 176, "taruhan", 14, W.merah)),
    ),
  ],
};
