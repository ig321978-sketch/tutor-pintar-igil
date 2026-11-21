import type { AdeganStory } from "./logika-story";
import { E, W, busur, deret, emo, garis, judul, kotak, lampion, stan, tanah, teks, tokoh } from "./k5b2a-gambar";
import { bersih, hapus, idx, k, tambah } from "./k5b2a-bantu";

/*
 * Cerita orisinal IGIL "Lonceng Bu Marni" (Kelas 5 Bab 2 Sub-Bab A, kelipatan), awal cerita Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2a.md. Bagian ini: tiba di pasar, lonceng Bu Marni berbunyi teratur (kelipatan empat), dan asal kelipatan (bilangan bulat dikali empat, nol bukan kelipatan).
 */

/* ------------------------------ 1. Pasar ------------------------------ */
const SUARA_S1 = "Pak Arif mengajak Bima, Citra, dan Fajar ke Pasar Kuliner Malam ketika lampu mulai menyala.";
const SUARA_S2 = "Di dekat stan wedang jahe, Bu Marni berdiri di samping lonceng besar.";
const SUARA_S3 = "Lonceng itu berbunyi teratur, dan Bu Marni meminta bantuan menuliskan jadwalnya.";

export const ADEGAN_PASAR: AdeganStory = {
  id: "pasar",
  judul: "Pasar Kuliner Malam",
  sumber: "Materi: tiba di pasar malam",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Pasar Kuliner Malam"), ...tanah("tn", 150)),
      tambah("Arif", ...tokoh("pa", 34, 184, "Pak Arif")),
      tambah("Bima,", ...tokoh("bm", 90, 184, "Bima")),
      tambah("Citra,", ...tokoh("ct", 146, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 202, 184, "Fajar")),
      tambah("lampu", ...lampion("lp", [40, 110, 180, 250], 52, 22)),
      tambah("menyala.", teks("mn", 150, 96, "lampu menyala", 9, W.coklat)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Stan Wedang Jahe"), ...tanah("tn", 150)),
      tambah("stan", ...stan("sw", 24, 66, 120, 76), teks("swt", 84, 112, "WEDANG JAHE", 10, W.coklat, { z: 3 }), emo("wd", 84, 136, E.wedang, 18, { z: 3 })),
      tambah("Bu", ...tokoh("bu", 190, 184, "Bu Marni")),
      tambah("lonceng", kotak("lt", 252, 76, 5, 70, W.coklat, W.papan, { rx: 1, z: 0 }), emo("lc", 254, 78, E.lonceng, 30, { z: 2 })),
      tambah("besar.", teks("lb", 250, 162, "lonceng besar", 8.4, W.coklat)),
    ),
    k(
      SUARA_S3,
      tambah("berbunyi", teks("d1", 222, 60, "ding", 11, W.merah), emo("nd", 282, 56, E.nada, 20)),
      tambah("teratur,", teks("d2", 282, 36, "ding", 9, W.merah)),
      tambah("meminta", emo("mt", 160, 150, E.bicara, 18)),
      tambah("jadwalnya.", kotak("pj", 22, 30, 108, 26, W.kapur, W.coklat, { rx: 3, tebal: 1.6, z: 1 }), teks("pjt", 76, 48, "JADWAL: ?", 11, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 2. Kelipatan empat ------------------------------ */
const SUARA_K1 = "Lonceng pertama berbunyi pada menit keempat, lalu terus berbunyi dengan jarak yang sama.";
const SUARA_K2 = "Bima menulis: empat, delapan, dua belas, enam belas, dan seterusnya.";
const SUARA_K3 = "Bilangan-bilangan itu disebut kelipatan empat.";
const XS_GARIS = [40, 100, 160, 220, 280];
const MENIT = [0, 4, 8, 12, 16];

export const ADEGAN_KELIPATAN: AdeganStory = {
  id: "kelipatan",
  judul: "Kelipatan Empat",
  sumber: "Materi: kelipatan empat",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kelipatan Empat"), ...tanah("tn", 150), garis("gl", 24, 112, 262, 0, W.coklat, 2.4), teks("m0", XS_GARIS[0], 132, "0", 11, W.coklat), teks("mn", 150, 148, "menit", 9, W.coklat)),
      tambah("pertama", emo("b1", XS_GARIS[1], 106, E.lonceng, 20), teks("m1", XS_GARIS[1], 132, "4", 11, W.merah)),
      tambah("terus", ...[2, 3, 4].flatMap((i) => [emo(`b${i}`, XS_GARIS[i], 106, E.lonceng, 20), teks(`m${i}`, XS_GARIS[i], 132, String(MENIT[i]), 11, W.merah)])),
      tambah("jarak", ...[0, 1, 2, 3].map((i) => busur(`bs${i}`, XS_GARIS[i], XS_GARIS[i + 1], 98, W.hijauTua, 22))),
      tambah("sama.", teks("sm", 150, 56, "jarak yang sama", 11, W.hijauTua)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Daftar Kelipatan"), ...tanah("tn", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah(idx(SUARA_K2, "empat"), ...deret("kp", [4], 80, 70, 44, 34, 24, W.putih, 13)),
      tambah(idx(SUARA_K2, "delapan"), ...deret("kq", [8], 124, 70, 44, 34, 24, W.putih, 13)),
      tambah(idx(SUARA_K2, "dua"), ...deret("kr", [12], 168, 70, 44, 34, 24, W.putih, 13)),
      tambah(idx(SUARA_K2, "enam"), ...deret("ks", [16], 212, 70, 44, 34, 24, W.putih, 13)),
      tambah("seterusnya.", teks("dt", 262, 88, "…", 16, W.coklat)),
    ),
    k(
      SUARA_K3,
      tambah("disebut", kotak("br", 80, 102, 166, 5, W.merah, undefined, { rx: 2, z: 1 }), teks("kl", 163, 128, "kelipatan 4", 13, W.merah)),
      tambah("empat.", emo("bt", 254, 124, E.lampu, 20)),
    ),
  ],
};

/* ------------------------------ 3. Asal kelipatan (bilangan bulat kali empat) ------------------------------ */
const SUARA_L1 = "Citra menunjukkan asalnya: satu kali empat, dua kali empat, tiga kali empat, empat kali empat.";
const SUARA_L2 = "Nol kali empat memang nol, tetapi nol bukan kelipatan empat.";
const SUARA_L3 = "Jadi daftar kelipatan mulai dari empat, lalu bertambah empat terus-menerus.";
const BARIS_KALI = ["1 × 4 = 4", "2 × 4 = 8", "3 × 4 = 12", "4 × 4 = 16"];

export const ADEGAN_KALI: AdeganStory = {
  id: "kali",
  judul: "Asal Kelipatan",
  sumber: "Materi: bilangan bulat kali empat",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Asal Kelipatan"), ...tanah("tn", 150), ...tokoh("ct", 60, 184, "Citra")),
      tambah(idx(SUARA_L1, "satu"), teks("r1", 190, 52, BARIS_KALI[0], 13, W.biru)),
      tambah(idx(SUARA_L1, "dua"), teks("r2", 190, 74, BARIS_KALI[1], 13, W.biru)),
      tambah(idx(SUARA_L1, "tiga"), teks("r3", 190, 96, BARIS_KALI[2], 13, W.biru)),
      tambah(idx(SUARA_L1, "kali", 4), teks("r4", 190, 118, BARIS_KALI[3], 13, W.biru)),
    ),
    k(
      SUARA_L2,
      tambah("Nol", teks("r0", 190, 32, "0 × 4 = 0", 13, W.merah)),
      tambah("bukan", emo("x0", 252, 32, E.salah, 18), teks("bk", 80, 78, "bukan kelipatan", 9.5, W.merah)),
    ),
    k(
      SUARA_L3,
      hapus(0, "r0", "x0", "bk"),
      tambah("mulai", teks("md", 76, 100, "mulai dari 4", 9.5, W.hijauTua)),
      tambah("bertambah", ...[63, 85, 107].map((y, i) => teks(`ta${i}`, 258, y, "+4", 11, W.hijauTua))),
      tambah("terus", emo("ul", 270, 134, E.ulang, 18)),
    ),
  ],
};
