import type { AdeganStory } from "./logika-story";
import { E, W, bulat, campur, emo, judul, kantong, kotak, panah, pecahan, tanah, teks, tokoh } from "./k5b3a-gambar";
import { bersih, idx, k, tambah, ubah, warnai } from "./k5b3a-bantu";

/*
 * Cerita orisinal IGIL "Tiga Kantong Tepung Bu Ratna" (Kelas 5 Bab 3 Sub-Bab A), awal cerita Toko Roti Keliling.
 * Naskah suara dari naskah/story-naskah-k5b3a.md. Bagian ini: membandingkan bilangan bulat dulu, mengubah campuran menjadi biasa (bulat kali penyebut ditambah pembilang),
 * dan menyamakan penyebut dengan KPK (empat, dua, delapan menjadi delapan).
 */

/* ------------------------------ 4. Bilangan bulat dulu ------------------------------ */
const SUARA_B1 = "Bima membandingkan bilangan bulatnya: dua, tiga, dan satu.";
const SUARA_B2 = "Karena satu lebih kecil dari dua, dan dua lebih kecil dari tiga, urutannya sudah terlihat.";
const SUARA_B3 = "Kantong ketiga ternyata paling ringan, dan Fajar menepuk dahinya keras-keras.";

export const ADEGAN_BULAT: AdeganStory = {
  id: "bulat",
  judul: "Lihat Bilangan Bulat",
  sumber: "Materi: bilangan bulat dulu",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_B1,
      tambah(
        0,
        judul("Lihat Bilangan Bulat"),
        ...tanah("tn", 150),
        ...kantong("ka", 54, 128),
        ...kantong("kb", 150, 128),
        ...kantong("kc", 246, 128),
        ...campur("ca", 54, 152, 2, 3, 4, 13, W.biru, { op: 0.5 }),
        ...campur("cb", 150, 152, 3, 1, 2, 13, W.biru, { op: 0.5 }),
        ...campur("cc", 246, 152, 1, 7, 8, 13, W.biru, { op: 0.5 }),
      ),
      tambah("Bima", ...tokoh("bm", 22, 184, "Bima")),
      tambah("dua,", bulat("w1", 54, 64, 15, W.krem, W.merah, { tebal: 2, z: 1 }), teks("o1", 54, 71, "2", 20, W.merah, { z: 3 })),
      tambah("tiga,", bulat("w2", 150, 64, 15, W.krem, W.merah, { tebal: 2, z: 1 }), teks("o2", 150, 71, "3", 20, W.merah, { z: 3 })),
      tambah("satu.", bulat("w3", 246, 64, 15, W.krem, W.merah, { tebal: 2, z: 1 }), teks("o3", 246, 71, "1", 20, W.merah, { z: 3 })),
    ),
    k(
      SUARA_B2,
      tambah("dua,", teks("r1", 100, 36, "1 < 2", 16, W.hijauTua)),
      tambah("tiga,", teks("r2", 200, 36, "2 < 3", 16, W.hijauTua)),
      tambah("terlihat.", emo("ok", 280, 36, E.benar, 20)),
    ),
    k(
      SUARA_B3,
      tambah("ketiga", kotak("hl", 224, 78, 44, 94, undefined, W.hijauTua, { rx: 6, tebal: 2.2, putus: true, z: 3 })),
      tambah("paling", teks("rg", 246, 190, "paling ringan", 10, W.hijauTua)),
      warnai("ringan,", W.hijauMuda, "kc-bd"),
      tambah("Fajar", ...tokoh("fj", 100, 184, "Fajar")),
      tambah("menepuk", emo("aj", 126, 150, E.keringat, 18), teks("ad", 100, 146, "aduh!", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Campuran menjadi biasa ------------------------------ */
const SUARA_I1 = "Citra memeriksa dengan mengubah pecahan campuran menjadi pecahan biasa.";
const SUARA_I2 = "Dua bulat tiga per empat menjadi dua kali empat ditambah tiga, yaitu sebelas per empat.";
const SUARA_I3 = "Tiga bulat satu per dua menjadi tujuh per dua, dan satu bulat tujuh per delapan menjadi lima belas per delapan.";

export const ADEGAN_BIASA: AdeganStory = {
  id: "biasa",
  judul: "Ubah ke Pecahan Biasa",
  sumber: "Materi: campuran menjadi biasa",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Ubah ke Pecahan Biasa"), ...tanah("tn", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("campuran", ...campur("x", 100, 80, 2, 3, 4, 22), teks("xl", 100, 122, "campuran", 10, W.coklat)),
      tambah("menjadi", panah("ar", 140, 84, 40, 0, W.merah, 3)),
      tambah("biasa.", teks("q", 215, 94, "?", 30, W.merah), teks("ql", 215, 122, "biasa", 10, W.coklat)),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Ubah ke Pecahan Biasa"), ...tanah("tn", 150), ...tokoh("ct", 40, 184, "Citra"), ...campur("x", 70, 76, 2, 3, 4, 20)),
      tambah("kali", teks("e1", 196, 50, "2 × 4 + 3", 16, W.biru)),
      tambah("ditambah", teks("ru", 196, 80, "bulat × penyebut + pembilang", 8.4, W.coklat)),
      ubah(idx(SUARA_I2, "sebelas"), { id: "e1", isi: "2 × 4 + 3 = 11", warna: W.merah }),
      tambah(idx(SUARA_I2, "per", 2), ...pecahan("r", 196, 114, 11, 4, 20, W.merah)),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Ubah ke Pecahan Biasa"), ...campur("m1", 76, 50, 3, 1, 2, 16), teks("n1", 76, 92, "3 × 2 + 1 = 7", 11, W.biru), panah("v1", 76, 100, 0, 12, W.merah, 2)),
      tambah("tujuh", ...pecahan("h1", 76, 134, 7, 2, 16, W.merah)),
      tambah(idx(SUARA_I3, "satu", 2), ...campur("m2", 222, 50, 1, 7, 8, 16)),
      tambah(idx(SUARA_I3, "tujuh", 2), teks("n2", 222, 92, "1 × 8 + 7 = 15", 11, W.biru), panah("v2", 222, 100, 0, 12, W.merah, 2)),
      tambah("lima", ...pecahan("h2", 222, 134, 15, 8, 16, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Samakan penyebut dengan KPK ------------------------------ */
const SUARA_K1 = "Penyebut ketiganya empat, dua, dan delapan, jadi perlu disamakan dengan KPK.";
const SUARA_K2 = "KPK dari empat, dua, dan delapan adalah delapan.";
const SUARA_K3 = "Hasilnya dua puluh dua per delapan, dua puluh delapan per delapan, dan lima belas per delapan.";

export const ADEGAN_SAMAKAN: AdeganStory = {
  id: "samakan",
  judul: "Samakan Penyebut",
  sumber: "Materi: samakan penyebut dengan KPK",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Samakan Penyebut"), ...tanah("tn", 150)),
      tambah("Penyebut", ...pecahan("pa", 60, 80, 11, 4, 20), ...pecahan("pb", 150, 80, 7, 2, 20), ...pecahan("pc", 240, 80, 15, 8, 20)),
      warnai("empat,", W.merah, "pa-b"),
      warnai("dua,", W.merah, "pb-b"),
      warnai("delapan,", W.merah, "pc-b"),
      tambah("KPK.", teks("kk", 150, 144, "samakan dengan KPK", 14, W.merah)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("KPK Penyebut"), ...tanah("tn", 150)),
      tambah("empat,", teks("l1", 150, 52, "kelipatan 4: 4, 8, 12", 11, W.biru)),
      tambah("dua,", teks("l2", 150, 80, "kelipatan 2: 2, 4, 6, 8, 10", 11, W.biru)),
      tambah("delapan", teks("l3", 150, 108, "kelipatan 8: 8, 16", 11, W.biru)),
      tambah("adalah", teks("kp", 150, 142, "KPK = 8", 22, W.merah)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Penyebut Jadi Delapan")),
      tambah("dua", ...pecahan("a1", 60, 52, 11, 4, 16), teks("e1", 92, 57, "=", 16, W.biru), ...pecahan("b1", 126, 52, 22, 8, 16, W.merah), teks("m1", 196, 57, "× 2", 12, W.coklat)),
      tambah(idx(SUARA_K3, "dua", 2), ...pecahan("a2", 60, 94, 7, 2, 16), teks("e2", 92, 99, "=", 16, W.biru), ...pecahan("b2", 126, 94, 28, 8, 16, W.merah), teks("m2", 196, 99, "× 4", 12, W.coklat)),
      tambah("lima", ...pecahan("a3", 60, 136, 15, 8, 16), teks("e3", 92, 141, "=", 16, W.biru), ...pecahan("b3", 126, 136, 15, 8, 16, W.merah), teks("m3", 196, 141, "× 1", 12, W.coklat)),
    ),
  ],
};

