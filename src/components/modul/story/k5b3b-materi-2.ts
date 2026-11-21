import type { AdeganStory } from "./logika-story";
import { E, W, bar, campur, emo, judul, lantai, sapu, teks, tokoh } from "./k5b3b-gambar";
import { bersih, k, tambah, ubah } from "./k5b3b-bantu";

/*
 * Cerita orisinal IGIL "Roti Isi Pak Seno" (Kelas 5 Bab 3 Sub-Bab B, penjumlahan pecahan), lanjutan cerita Toko Roti Keliling.
 * Naskah suara dari naskah/story-naskah-k5b3b.md. Bagian ini: mentega dengan cara pertama (ubah ke pecahan biasa), cara kedua (pisahkan bulat dan pecahan),
 * dan salah langkah Fajar yang menjumlahkan penyebut juga.
 */

/* ------------------------------ 4. Mentega, cara pertama ------------------------------ */
const SUARA_M1 = "Pak Seno juga memakai mentega: dua bulat satu per lima kilogram dan tiga bulat satu per lima kilogram.";
const SUARA_M2 = "Cara pertama, ubah ke pecahan biasa: sebelas per lima ditambah enam belas per lima sama dengan dua puluh tujuh per lima.";
const SUARA_M3 = "Disederhanakan, dua puluh tujuh per lima menjadi lima bulat dua per lima kilogram.";

const M1 = campur("m1", 20, 40, 2, 1, 5, { lebar: 80, h: 12, jarak: 3 });
const M2 = campur("m2", 170, 40, 3, 1, 5, { lebar: 80, h: 12, jarak: 3 });
const R = campur("rr", 20, 46, 5, 2, 5, { lebar: 90, h: 10, jarak: 2 });

export const ADEGAN_MENTEGA: AdeganStory = {
  id: "mentega",
  judul: "Mentega Pak Seno",
  sumber: "Materi: cara pertama",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Mentega Pak Seno"), ...lantai("lt", 150)),
      tambah("Seno", ...tokoh("ps", 40, 184, "Pak Seno")),
      tambah("dua", ...M1.objs),
      tambah("kilogram", teks("m1t", 60, 104, "2 1/5 kg", 12, W.rotiTua, { z: 3 })),
      tambah("tiga", ...M2.objs, teks("pls", 134, 72, "+", 16, W.merah, { z: 3 })),
      tambah("kilogram@2", teks("m2t", 210, 124, "3 1/5 kg", 12, W.rotiTua, { z: 3 })),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Cara pertama: ubah ke biasa")),
      tambah("sebelas", teks("a1", 75, 52, "2 1/5 = 11/5", 12, W.rotiTua, { z: 3 }), ...bar("q1", 20, 60, 11, 11, { lebar: 110, h: 14 })),
      tambah("enam", teks("a2", 215, 52, "3 1/5 = 16/5", 12, W.biruGaris, { z: 3 }), ...bar("q2", 150, 60, 16, 16, { lebar: 128, h: 14, warna: W.biruMuda, garis: W.biruGaris })),
      tambah("tujuh", teks("a3", 150, 120, "11/5 + 16/5 = 27/5", 17, W.merah, { z: 3 })),
      tambah("tujuh", teks("a4", 150, 150, "pembilang dijumlahkan, penyebut tetap 5", 10, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Disederhanakan"), ...R.objs),
      tambah("tujuh", teks("b1", 200, 66, "27/5", 18, W.merah, { z: 3 })),
      tambah("menjadi", teks("b2", 200, 94, "= 5 2/5", 18, W.hijauTua, { z: 3 })),
      tambah("kilogram", teks("b3", 200, 118, "kilogram mentega", 10, W.coklat, { z: 3 })),
      tambah("kilogram", emo("ok", 250, 140, E.benar, 18, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 5. Cara kedua: pisahkan bulat dan pecahan ------------------------------ */
const SUARA_P1 = "Bima mencoba cara kedua: pisahkan bilangan bulat dan pecahannya.";
const SUARA_P2 = "Dua ditambah tiga sama dengan lima, dan satu per lima ditambah satu per lima sama dengan dua per lima.";
const SUARA_P3 = "Gabungkan keduanya, hasilnya lima bulat dua per lima, sama persis dengan cara pertama.";

export const ADEGAN_PISAH: AdeganStory = {
  id: "pisah",
  judul: "Cara kedua",
  sumber: "Materi: cara kedua",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara kedua"), ...lantai("lt", 150), teks("s1", 90, 56, "2 1/5", 20, W.rotiTua, { z: 3 })),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("cara", teks("s2", 210, 56, "3 1/5", 20, W.biruGaris, { z: 3 })),
      tambah("bilangan", teks("s3", 150, 100, "bulat: 2 dan 3", 14, W.merah, { z: 3 })),
      tambah("pecahannya", teks("s4", 150, 128, "pecahan: 1/5 dan 1/5", 14, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Dua bagian dijumlahkan sendiri")),
      tambah("tiga", teks("ua", 150, 52, "2 + 3 = 5", 20, W.merah, { z: 3 })),
      tambah("dan", teks("ub", 150, 96, "1/5 + 1/5 = 2/5", 20, W.hijauTua, { z: 3 })),
      tambah("satu@2", ...bar("u", 100, 118, 5, 0, { lebar: 100, h: 20 })),
      ubah("sama@2", { id: "u0", warna: W.amber, garis: W.rotiTua }),
      ubah("dua@2", { id: "u1", warna: W.biruMuda, garis: W.biruGaris }),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Gabungkan keduanya"), ...lantai("lt", 150)),
      tambah("hasilnya", teks("h1", 150, 76, "5 2/5", 30, W.merah, { z: 3 })),
      tambah("sama", teks("h2", 150, 110, "= hasil cara pertama", 13, W.hijauTua, { z: 3 })),
      tambah("persis", emo("ok", 150, 140, E.benar, 22, { z: 3 })),
      tambah("Gabungkan", ...tokoh("bm", 40, 184, "Bima")),
    ),
  ],
};

/* ------------------------------ 6. Salah langkah Fajar ------------------------------ */
const SUARA_S1 = "Pak Seno meminta adonan: satu per empat kilogram gula ditambah satu per enam kilogram.";
const SUARA_S2 = "Fajar menjawab cepat: satu tambah satu dua, empat tambah enam sepuluh, jadi dua per sepuluh!";
const SUARA_S3 = "Kalau aku salah, aku menyapu seluruh taman, katanya, sambil mengangkat sapu.";

export const ADEGAN_SALAH: AdeganStory = {
  id: "salah",
  judul: "Jawaban cepat Fajar",
  sumber: "Materi: salah langkah",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Adonan roti isi"), ...lantai("lt", 150)),
      tambah("Seno", ...tokoh("ps", 40, 184, "Pak Seno")),
      tambah("empat", ...bar("s1", 100, 50, 4, 1, { lebar: 96, h: 18 }), teks("s1t", 248, 63, "1/4 kg gula", 10, W.rotiTua, { z: 3 })),
      tambah("enam", ...bar("s2", 100, 82, 6, 1, { lebar: 96, h: 18, warna: W.biruMuda, garis: W.biruGaris }), teks("s2t", 248, 95, "1/6 kg gula", 10, W.biruGaris, { z: 3 })),
    ),
    k(
      SUARA_S2,
      tambah("Fajar", ...tokoh("fj", 264, 184, "Fajar")),
      tambah("satu", teks("t1", 80, 126, "1 + 1 = 2", 11, W.merah, { z: 3 })),
      tambah("empat", teks("t2", 80, 146, "4 + 6 = 10", 11, W.merah, { z: 3 })),
      tambah("jadi", teks("t3", 200, 138, "= 2/10", 18, W.merah, { z: 3 })),
      tambah("sepuluh@2", emo("xx", 262, 112, E.salah, 20, { z: 3 })),
    ),
    k(
      SUARA_S3,
      ubah("salah", { id: "t3", sorot: true }),
      tambah("menyapu", ...sapu("sp", 250, 112)),
      tambah("taman", teks("tr", 110, 112, "taruhan: menyapu taman", 10.5, W.merah, { z: 3 })),
    ),
  ],
};
