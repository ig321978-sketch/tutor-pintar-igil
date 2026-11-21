import type { AdeganStory } from "./logika-story";
import { E, W, deret, emo, idDeret, judul, kotak, panah, rakAngklung, tanah, teks, tokoh } from "./k4b3a-gambar";
import { bersih, k, sorotkan, tambah } from "./k4b3a-bantu";

/*
 * Cerita orisinal IGIL "Deret Angklung Bu Ratri" (Kelas 4 Bab 3 Sub-Bab A, pola gambar), awal cerita Orkestra Angklung Kampung Senandung.
 * Naskah suara dari naskah/story-naskah-k4b3a.md. Bagian ini: salah mengira pola mengecil, selisih kurang, dan taruhan mengangkat angklung.
 */

/** Tiga deret penabuh (7, 5, 3 angklung): dasar tabung di y 62, 92, 122, angklung pertama berpusat di x 110, jarak 18. */
const DP = { x0: 110, dx: 18 };

/* ------------------------------ 4. Salah: dikira membesar ------------------------------ */
const SUARA_S1 = "Genta membawa deret penabuh yang pulang, tujuh, lima, lalu tiga angklung.";
const SUARA_S2 = "Satria berseru, angka tujuh besar sekali, jadi polanya pasti membesar!";
const SUARA_S3 = "Kalau aku salah, aku mengangkat semua angklung sendirian, katanya sambil memamerkan otot lengan.";

export const ADEGAN_SALAH_MENGECIL: AdeganStory = {
  id: "salah-mengecil",
  judul: "Satria mengira polanya membesar",
  sumber: "Materi: salah mengira pola",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Deret Penabuh Pulang"), ...tanah("tn", 150), ...tokoh("ge", 40, 184, "Genta")),
      tambah("tujuh,", ...deret("e1", DP.x0, 62, 7, DP.dx), teks("l1", 70, 58, "deret 1", 9, W.coklat), teks("n1", 262, 58, "7", 12, W.merah)),
      tambah("lima,", ...deret("e2", DP.x0, 92, 5, DP.dx), teks("l2", 70, 88, "deret 2", 9, W.coklat), teks("n2", 262, 88, "5", 12, W.merah)),
      tambah("tiga", ...deret("e3", DP.x0, 122, 3, DP.dx), teks("l3", 70, 118, "deret 3", 9, W.coklat), teks("n3", 262, 118, "3", 12, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah(0, ...tokoh("sa", 100, 184, "Satria")),
      sorotkan("tujuh", ...idDeret("e1", 7)),
      tambah("sekali,", teks("sb", 232, 150, "7 besar!", 11, W.merah)),
      tambah("membesar!", teks("mq", 232, 168, "membesar?", 10, W.merah), emo("cm", 130, 150, E.cemberut, 18)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Taruhan Satria"), ...tanah("tn", 150), ...tokoh("ge", 40, 184, "Genta"), ...tokoh("sa", 100, 184, "Satria")),
      tambah("salah,", teks("ks", 236, 92, "kalau salah:", 10, W.merah)),
      tambah("mengangkat", kotak("tm", 196, 104, 80, 42, "#FDE68A", W.bambuTua, { rx: 4, tebal: 1.6, z: 1 }), ...deret("tb", 210, 146, 5, 14, 22)),
      tambah("sendirian,", emo("kr", 140, 150, E.keringat, 18), teks("tg", 236, 160, "semua angklung", 8.4, W.coklat)),
      tambah("otot", emo("ot", 170, 150, E.kuat, 22)),
    ),
  ],
};

/* ------------------------------ 5. Selisih kurang ------------------------------ */
const SUARA_K1 = "Genta menaruh deret itu berdampingan dan menghitung selisihnya.";
const SUARA_K2 = "Dari tujuh ke lima berkurang dua, dari lima ke tiga juga berkurang dua.";
const SUARA_K3 = "Jadi tiap deret makin sedikit, dan pola seperti ini kita sebut pola mengecil, bukan karena angkanya kecil.";

export const ADEGAN_KURANG: AdeganStory = {
  id: "kurang",
  judul: "Selisih kurang dua",
  sumber: "Materi: pola mengecil",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Deret Berdampingan"), ...tanah("tn", 150), ...tokoh("ge", 40, 184, "Genta")),
      tambah("deret", ...deret("e1", DP.x0, 62, 7, DP.dx), teks("n1", 262, 58, "7", 12, W.merah)),
      tambah("berdampingan", ...deret("e2", DP.x0, 92, 5, DP.dx), teks("n2", 262, 88, "5", 12, W.merah), ...deret("e3", DP.x0, 122, 3, DP.dx), teks("n3", 262, 118, "3", 12, W.merah)),
      tambah("menghitung", teks("hs", 180, 144, "hitung selisihnya", 10, W.hijauTua)),
    ),
    k(
      SUARA_K2,
      sorotkan("tujuh", ...idDeret("e1", 7)),
      tambah("berkurang", panah("a1", 288, 66, 0, 18, W.merah, 2), teks("s1", 288, 100, "−2", 10, W.merah)),
      sorotkan("lima@2", ...idDeret("e2", 5)),
      tambah("juga", panah("a2", 288, 96, 0, 18, W.merah, 2), teks("s2", 288, 130, "−2", 10, W.merah)),
    ),
    k(
      SUARA_K3,
      tambah(0, teks("ms", 80, 144, "makin sedikit", 10, W.merah)),
      tambah("pola@2", kotak("bg", 100, 40, 190, 94, undefined, W.merah, { rx: 6, tebal: 1.6, z: 3 })),
      tambah("mengecil,", teks("mc", 232, 172, "mengecil", 13, W.merah)),
      tambah("bukan", emo("xs", 262, 148, E.salah, 20), teks("bk", 150, 172, "bukan angka kecil", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ 6. Taruhan: mengangkat angklung ------------------------------ */
const SUARA_M1 = "Satria menepati taruhannya dan mengangkat tumpukan angklung ke rak.";
const SUARA_M2 = "Satu angklung jatuh berdenting, dan semua orang tertawa.";
const SUARA_M3 = "Laras mencatat, lihat selisihnya dulu, bukan besar angkanya.";

export const ADEGAN_MENGANGKAT: AdeganStory = {
  id: "mengangkat",
  judul: "Satria mengangkat angklung",
  sumber: "Materi: menepati taruhan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Satria Menepati Taruhan"), ...tanah("tn", 150), ...tokoh("sa", 50, 184, "Satria")),
      tambah("taruhannya", emo("ku", 84, 150, E.kuat, 22)),
      tambah("tumpukan", kotak("tm", 100, 124, 46, 24, "#FDE68A", W.bambuTua, { rx: 4, tebal: 1.6, z: 1 }), ...deret("tb", 112, 148, 3, 14, 18)),
      tambah("ke", panah("pk", 150, 134, 24, -12, W.hijau, 2.4)),
      tambah("rak.", ...rakAngklung("rk", 180, 70, 108, 62), ...deret("ra", 194, 111, 4, 18), ...deret("rb", 194, 132, 5, 16)),
    ),
    k(
      SUARA_M2,
      tambah(0, kotak("jt", 196, 140, 18, 7, W.bambu, W.bambuTua, { rx: 2, tebal: 1.2, z: 3 }), teks("sj", 242, 146, "1 jatuh", 9, W.merah)),
      tambah("berdenting,", emo("dn", 228, 124, E.lonceng, 16)),
      tambah("semua", emo("tw1", 120, 150, E.tertawa, 22)),
      tambah("tertawa.", emo("tw2", 160, 150, E.tertawa, 22)),
    ),
    k(
      SUARA_M3,
      tambah(0, ...tokoh("lr", 232, 184, "Laras")),
      tambah("mencatat,", kotak("ct", 14, 40, 130, 72, W.putih, W.coklat, { rx: 4, tebal: 1.8, z: 4 })),
      tambah("lihat", teks("c0", 79, 66, "lihat selisih", 11, W.hijauTua, { z: 5 })),
      tambah("bukan", teks("c1", 79, 94, "bukan besar angka", 9, W.merah, { z: 5 })),
    ),
  ],
};
