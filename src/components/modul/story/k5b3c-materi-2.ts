import type { AdeganStory } from "./logika-story";
import { E, W, campur, emo, garis, idPec, judul, karung, kartu, kotak, lantai, pec, tanda, teks, tokoh } from "./k5b3c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b3c-bantu";

/*
 * Cerita orisinal IGIL "Sisa Adonan Bu Nani" (Kelas 5 Bab 3 Sub-Bab C), lanjutan: tepung campuran dengan dua cara (ubah ke biasa, pisah bulat dan pecahan)
 * dan salah langkah Fajar (mengurangkan penyebut juga, taruhan mencuci semua loyang). Naskah suara dari naskah/story-naskah-k5b3c.md.
 */

/* ------------------------------ 4. Campuran: ubah ke biasa ------------------------------ */
const SUARA_C1 = "Bu Nani punya tepung empat bulat empat per lima kilogram, dan terpakai satu bulat dua per lima kilogram.";
const SUARA_C2 = "Cara pertama, ubah ke pecahan biasa: dua puluh empat per lima dikurangi tujuh per lima sama dengan tujuh belas per lima.";
const SUARA_C3 = "Disederhanakan, tujuh belas per lima menjadi tiga bulat dua per lima kilogram.";

export const ADEGAN_CAMPURAN: AdeganStory = {
  id: "campuran",
  judul: "Tepung campuran",
  sumber: "Materi: campuran, ubah ke biasa",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Tepung Bu Nani"), ...lantai("lt", 150)),
      tambah("Nani", ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("tepung", ...karung("kr", 14, 62, 40, 34)),
      tambah("empat", teks("lp", 120, 52, "persediaan", 9.6, W.biru, { z: 3 }), ...campur("x", 92, 114, 82, 4, 4, 5, 17)),
      tambah("kilogram", teks("kx", 150, 90, "kg", 11, W.coklat, { z: 3 })),
      tambah("terpakai", tanda("m0", 176, 84, "−", 22), teks("lq", 230, 52, "terpakai", 9.6, W.merah, { z: 3 }), ...campur("y", 206, 228, 82, 1, 2, 5, 17, W.merah)),
      tambah("kilogram@2", teks("ky", 262, 90, "kg", 11, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Cara 1: ubah ke biasa"), ...lantai("lt", 150)),
      tambah("ubah", teks("ub", 150, 40, "campuran menjadi pecahan biasa", 10.5, W.pinkTua, { z: 3 })),
      tambah("dua", ...pec("a", 52, 92, 24, 5, 20)),
      tambah("dikurangi", tanda("m1", 92, 94, "−", 24)),
      tambah("tujuh", ...pec("b", 132, 92, 7, 5, 20)),
      tambah("sama", tanda("m2", 172, 94, "=", 24)),
      tambah("belas", ...pec("c", 214, 92, 17, 5, 20, W.hijauTua)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Disederhanakan"), ...lantai("lt", 150), ...pec("a", 64, 88, 17, 5, 22)),
      tambah("menjadi", tanda("m1", 104, 90, "=", 24)),
      tambah("tiga", ...campur("m", 150, 180, 88, 3, 2, 5, 22, W.hijauTua)),
      tambah("kilogram", teks("kg", 244, 92, "kilogram", 11, W.coklat, { z: 3 }), emo("ok", 150, 148, E.benar, 24, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 5. Campuran: pisah bulat dan pecahan ------------------------------ */
const SUARA_P1 = "Bima mencoba cara kedua: pisahkan bilangan bulat dan pecahannya.";
const SUARA_P2 = "Empat dikurangi satu sama dengan tiga, dan empat per lima dikurangi dua per lima sama dengan dua per lima.";
const SUARA_P3 = "Gabungannya tiga bulat dua per lima, sama dengan cara pertama.";

export const ADEGAN_PISAH: AdeganStory = {
  id: "pisah",
  judul: "Pisah bulat dan pecahan",
  sumber: "Materi: campuran, pisah bulat",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 2: pisah"), ...lantai("lt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("mencoba", ...campur("x", 100, 124, 80, 4, 4, 5, 18), tanda("m0", 170, 84, "−", 22), ...campur("y", 204, 228, 80, 1, 2, 5, 18, W.merah)),
      tambah("pisahkan", garis("d1", 112, 52, 0, 56, W.pinkTua, 1.6, { putus: true, z: 4 }), garis("d2", 216, 52, 0, 56, W.pinkTua, 1.6, { putus: true, z: 4 }), emo("gt", 164, 140, E.gunting, 24, { z: 3 })),
      sorotkan("bilangan", "xb", "yb"),
      sorotkan("pecahannya", ...idPec("x"), ...idPec("y")),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pisah bulat dan pecahan"), ...lantai("lt", 150)),
      tambah("Empat", teks("a1", 40, 70, "4", 22, W.biru, { z: 3 })),
      tambah("dikurangi", tanda("a2", 72, 66, "−", 22)),
      tambah("satu", teks("a3", 104, 70, "1", 22, W.merah, { z: 3 })),
      tambah("sama", tanda("a4", 136, 66, "=", 22)),
      tambah("tiga", teks("a5", 168, 70, "3", 22, W.hijauTua, { z: 3 })),
      tambah("empat@2", ...pec("b", 52, 128, 4, 5, 18)),
      tambah("dikurangi@2", tanda("b2", 88, 130, "−", 22)),
      tambah("dua", ...pec("c", 124, 128, 2, 5, 18, W.merah)),
      tambah("sama@2", tanda("b4", 160, 130, "=", 22)),
      tambah("dua@2", ...pec("d", 196, 128, 2, 5, 18, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Digabung"), ...lantai("lt", 150), ...campur("g", 62, 86, 92, 3, 2, 5, 24, W.hijauTua)),
      tambah("sama", tanda("m1", 132, 96, "=", 24)),
      tambah("cara", ...kartu("c1", 154, 66, 120, 56, W.kapur, "cara 1: 3 2/5", 11)),
      tambah("pertama", emo("ok", 214, 146, E.benar, 24, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 6. Salah langkah Fajar ------------------------------ */
const SUARA_S1 = "Bu Nani meminta tiga per empat loyang dikurangi satu per tiga loyang.";
const SUARA_S2 = "Fajar menjawab cepat: tiga kurang satu dua, empat kurang tiga satu, jadi dua per satu!";
const SUARA_S3 = "Kalau aku salah, aku mencuci semua loyang, katanya, sambil menggulung lengan baju.";

export const ADEGAN_SALAH: AdeganStory = {
  id: "salah",
  judul: "Fajar mengurangkan penyebut",
  sumber: "Materi: salah langkah Fajar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Pesanan Bu Nani"), ...lantai("lt", 150)),
      tambah("Nani", ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("tiga", ...pec("a", 108, 84, 3, 4, 22), emo("la", 138, 90, E.kue, 18, { z: 3 })),
      tambah("dikurangi", tanda("m1", 168, 86, "−", 24)),
      tambah("satu", ...pec("b", 208, 84, 1, 3, 22, W.merah), emo("lb", 238, 90, E.kue, 18, { z: 3 })),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Jawaban Fajar"), ...lantai("lt", 150)),
      tambah("Fajar", ...tokoh("fj", 40, 184, "Fajar")),
      tambah("tiga", teks("f1", 170, 62, "3 − 1 = 2", 14, W.biru, { z: 3 })),
      tambah("empat", teks("f2", 170, 92, "4 − 3 = 1", 14, W.biru, { z: 3 })),
      tambah("jadi", ...pec("fj", 170, 122, 2, 1, 22, W.merah)),
      tambah("satu@3", emo("sl", 230, 112, E.salah, 24, { z: 4 })),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Taruhan Fajar"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("salah", teks("tr", 170, 44, "Kalau salah: cuci semua loyang", 9.6, W.merah, { z: 3 })),
      tambah("loyang", ...[0, 1, 2].map((i) => kotak(`ly${i}`, 100 + i * 46, 80, 40, 24, W.putih, W.pinkTua, { rx: 4, tebal: 1.6, z: 2 }))),
      tambah("mencuci", emo("a1", 120, 74, E.air, 16, { z: 3 }), emo("a2", 166, 74, E.air, 16, { z: 3 }), emo("a3", 212, 74, E.air, 16, { z: 3 })),
      tambah("menggulung", ...tokoh("bn", 260, 184, "Bu Nani"), emo("sn", 260, 130, E.senyum, 22, { z: 3 })),
    ),
  ],
};
