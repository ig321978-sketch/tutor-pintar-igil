import type { AdeganStory } from "./logika-story";
import { E, W, batangBagan, deretBotol, emo, judul, kertas, kotak, panah, rak, tanah, teks, tokoh } from "./k3b2B-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/*
 * Cerita orisinal IGIL "Botol Air Pak Darto" (Kelas 3 Bab 2 Sub-Bab B), video materi.
 * Naskah suara dari naskah/story-naskah-k3b2b.md. Bagian ini: bagan bilangan awal dan bagian, periksa dengan mengurangkan lagi, dan bilangan awal yang hilang.
 */

/* ------------------------------ 4. Cari bilangan yang dikurangkan ------------------------------ */
const SUARA_C1 = "Bima menggambar bagan. Batang atas adalah bilangan awal, yaitu sembilan puluh.";
const SUARA_C2 = "Dua batang di bawahnya adalah botol yang dibagikan, yang belum diketahui, dan botol yang tersisa, yaitu tiga puluh lima.";
const SUARA_C3 = "Kurangkan bilangan awal dengan sisanya: sembilan puluh dikurangi tiga puluh lima sama dengan lima puluh lima.";

const [BA_K, BA_T] = batangBagan("ba", 90, 44, 180, 30, W.awal, "90", 16);
const [BD_K, BD_T] = batangBagan("bd", 90, 86, 110, 30, W.bagA, "?", 16);
const [BS_K, BS_T] = batangBagan("bs", 200, 86, 70, 30, W.bagB, "35", 16);

export const ADEGAN_CARI_DIKURANGKAN: AdeganStory = {
  id: "cari-dikurangkan",
  judul: "Cari bilangan yang dikurangkan",
  sumber: "Materi: bilangan yang dikurangkan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Bagan Bima"), ...tokoh("bm", 40, 184, "Bima")),
      tambah("bagan.", kertas("kb", 70, 32, 220, 130, W.putih)),
      tambah("Batang", BA_K),
      tambah("awal,", teks("la", 180, 40, "bilangan awal", 8.4, W.awal)),
      tambah("sembilan", BA_T),
    ),
    k(
      SUARA_C2,
      tambah("Dua", teks("n2", 180, 152, "2 batang", 9, W.ungu)),
      tambah("dibagikan,", BD_K, BD_T, teks("ld", 145, 128, "dibagikan", 8.4, W.bagA)),
      sorotkan("belum", "bd"),
      tambah("tersisa,", BS_K, teks("ls", 235, 128, "sisa", 8.4, W.bagB)),
      tambah("tiga", BS_T),
    ),
    k(
      SUARA_C3,
      tambah("Kurangkan", panah("pa", 80, 60, 0, 46, W.ungu, 2.4)),
      tambah("sembilan", teks("a90", 112, 180, "90", 16, W.awal)),
      tambah("dikurangi", teks("mn", 138, 180, "−", 16, W.biru)),
      tambah("tiga", teks("b35", 164, 180, "35", 16, W.bagB)),
      tambah("sama", teks("sm", 190, 180, "=", 16, W.biru)),
      ubah("lima@3", { id: "bd-t", isi: "55" }, { id: "bd", warna: W.hijauTua }),
      tambah("lima@3", teks("r55", 218, 180, "55", 16, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 5. Periksa dengan mengurangkan lagi ------------------------------ */
const SUARA_R1 = "Jadi, botol yang dibagikan ada lima puluh lima.";
const SUARA_R2 = "Periksa dengan mengurangkan lagi: sembilan puluh dikurangi lima puluh lima sama dengan tiga puluh lima.";
const SUARA_R3 = "Hasilnya cocok dengan sisa botol, jadi jawabannya benar.";

export const ADEGAN_PERIKSA_KURANG: AdeganStory = {
  id: "periksa-kurang",
  judul: "Periksa dengan mengurangkan lagi",
  sumber: "Materi: periksa dengan mengurangkan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Hasil Bagan"), ...tanah("tn", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("botol", teks("lb", 175, 60, "botol dibagikan", 9, W.bagA)),
      tambah("dibagikan", kotak("hs", 100, 46, 150, 66, W.hijauMuda, W.hijauTua, { rx: 10, z: -1 })),
      tambah("lima", teks("n55", 175, 98, "55", 30, W.hijauTua)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Periksa Hasilnya"), ...tanah("tn", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("mengurangkan", teks("pr", 170, 56, "periksa", 10, W.ungu)),
      tambah("sembilan", teks("a90", 100, 104, "90", 24, W.awal)),
      tambah("dikurangi", teks("mn", 134, 104, "−", 24, W.biru)),
      tambah("lima", teks("b55", 168, 104, "55", 24, W.hijauTua)),
      tambah("sama", teks("sm", 202, 104, "=", 24, W.biru)),
      tambah("tiga", teks("c35", 236, 104, "35", 24, W.bagB)),
    ),
    k(
      SUARA_R3,
      sorotkan("cocok", "c35"),
      tambah("sisa", ...rak("rk", 80, 150, 120, 24), ...deretBotol("bt", 90, 138, 9, 12, 12)),
      tambah("benar.", emo("ok", 264, 112, E.benar, 26)),
    ),
  ],
};

/* ------------------------------ 6. Bilangan awal yang hilang ------------------------------ */
const SUARA_H1 = "Di rak kedua, Pak Darto membagikan empat puluh botol, dan tersisa dua puluh delapan botol.";
const SUARA_H2 = "Banyak botol mula-mula belum diketahui. Kalimatnya titik-titik dikurangi empat puluh sama dengan dua puluh delapan.";
const SUARA_H3 = "Kali ini bilangan awal yang belum diketahui, dan titik-titik ada di depan.";

export const ADEGAN_AWAL_HILANG: AdeganStory = {
  id: "awal-hilang",
  judul: "Bilangan awal yang hilang",
  sumber: "Materi: bilangan awal yang hilang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Rak Kedua"), ...tanah("tn", 150)),
      tambah("rak", ...rak("rk", 40, 130, 150, 18), ...deretBotol("bt", 46, 118, 12, 11, 12)),
      tambah("Darto,", ...tokoh("pd", 250, 184, "Pak Darto")),
      tambah("membagikan", teks("ld", 80, 54, "dibagikan", 8.4, W.bagA)),
      tambah("empat", teks("n40", 80, 80, "40", 22, W.bagA)),
      tambah("tersisa", teks("ls", 180, 54, "tersisa", 8.4, W.bagB)),
      tambah("dua", teks("n28", 180, 80, "28", 22, W.bagB)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Kalimat Rak Kedua"), ...tanah("tn", 150), kertas("ks", 60, 40, 200, 84)),
      tambah("belum", teks("dt", 100, 98, "…", 22, W.awal)),
      tambah("diketahui.", teks("la", 100, 74, "awal", 8.4, W.awal)),
      sorotkan("titik-titik", "dt"),
      tambah("dikurangi", teks("mn", 136, 98, "−", 22, W.biru)),
      tambah("empat", teks("a40", 172, 98, "40", 22, W.bagA)),
      tambah("sama", teks("sm", 208, 98, "=", 22, W.biru)),
      tambah("dua", teks("s28", 240, 98, "28", 22, W.bagB)),
    ),
    k(
      SUARA_H3,
      sorotkan("awal", "la"),
      redamkan("belum", "dt"),
      ubah("titik-titik", { id: "dt", warna: W.merah, u: 26 }),
      tambah("depan.", panah("pd", 100, 150, 0, -22, W.ungu, 2.4), teks("lk", 100, 164, "di depan", 9, W.ungu)),
    ),
  ],
};
