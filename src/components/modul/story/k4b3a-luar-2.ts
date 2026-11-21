import type { AdeganStory, Obj } from "./logika-story";
import { E, K, W, bulat, bulatkan, deret, emo, garis, judul, kotak, papanTulis, tanah, teks, tokoh } from "./k4b3a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k4b3a-bantu";

/*
 * Cerita orisinal IGIL "Deret Angklung Bu Ratri" (Kelas 4 Bab 3 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b3a.md. Bagian ini: Difference Table (Tabel Selisih) dan terapannya, Group by Five (Susun Per Lima) dan terapannya, ringkasan.
 */

/** Tabel kapur: bingkai `${id}`, garis baris `${id}-h` pada tinggi `bY`, garis kolom `${id}-v{i}` (kolom - 1 garis sama jarak). Pojok kiri-atas (x, y). */
const tabel = (id: string, x: number, y: number, w: number, h: number, kolom: number, bY: number): Obj[] => [
  kotak(id, x, y, w, h, undefined, K.kapur, { rx: 3, tebal: 1.4, z: 1 }),
  garis(`${id}-h`, x, bY, w, 0, K.kapur, 1.2, { z: 1 }),
  ...Array.from({ length: kolom - 1 }, (_, i) => garis(`${id}-v${i + 1}`, bulatkan(x + (w / kolom) * (i + 1)), y, 0, h, K.kapur, 1.2, { z: 1 })),
];
/** Titik kapur berderet: `${id}-c{i}` (mulai nol), jarak dx. */
const titikKapur = (id: string, x0: number, y: number, n: number, dx = 16, warna: string = K.kapur): Obj[] => Array.from({ length: n }, (_, i) => bulat(`${id}-c${i}`, bulatkan(x0 + i * dx), y, 6, warna, K.kapur, { tebal: 1, z: 2 }));
const idTitik = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-c${i}`);

/* ------------------------------ Difference Table: konsep ------------------------------ */
const SUARA_T1 = "Cara kedua, Difference Table, atau Tabel Selisih.";
const SUARA_T2 = "Kita menulis banyak benda tiap deret di satu baris, lalu selisihnya di baris bawah.";
const SUARA_T3 = "Kalau selisihnya selalu sama, polanya benar, dan kita tahu apakah polanya membesar atau mengecil.";
const SUARA_T4 = "Tanda tambah berarti membesar, tanda kurang berarti mengecil.";

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Difference Table: Tabel Selisih",
  sumber: "Metode global: Difference Table (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Cara 2: Difference Table"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Difference", teks("nm", 150, 50, "Difference Table", 13, K.kapurMerah)),
      tambah("Tabel", teks("ni", 150, 66, "Tabel Selisih", 10, K.kapur)),
      tambah("Selisih", ...tabel("tb", 58, 76, 224, 66, 4, 109)),
    ),
    k(
      SUARA_T2,
      tambah("banyak", teks("c0", 86, 98, "4", 14, K.kapur), teks("c1", 142, 98, "7", 14, K.kapur), teks("c2", 198, 98, "10", 14, K.kapur), teks("c3", 254, 98, "13", 14, K.kapur)),
      tambah("satu", teks("r1", 34, 98, "baris 1", 8, K.kapurBiru)),
      tambah("selisihnya", teks("e1", 114, 131, "+3", 12, K.kapurMerah), teks("e2", 170, 131, "+3", 12, K.kapurMerah), teks("e3", 226, 131, "+3", 12, K.kapurMerah)),
      tambah("baris@2", teks("r2", 34, 131, "baris 2", 8, K.kapurBiru)),
    ),
    k(
      SUARA_T3,
      sorotkan("selisihnya", "e1", "e2", "e3"),
      tambah("sama,", teks("ss", 80, 176, "selisih sama", 10, W.hijauTua)),
      tambah("benar,", emo("ok", 150, 174, E.benar, 20)),
      tambah("membesar", teks("mb", 230, 168, "membesar?", 10, W.hijauTua)),
      tambah("mengecil.", teks("mc", 230, 186, "mengecil?", 10, W.merah)),
    ),
    k(
      SUARA_T4,
      hapus(0, "ss", "ok", "mb", "mc"),
      tambah("tambah", teks("pt1", 100, 172, "+3 membesar", 11, W.hijauTua)),
      tambah("membesar,", emo("up", 52, 172, E.tepuk, 18)),
      tambah("kurang", teks("km", 220, 172, "−3 mengecil", 11, W.merah)),
      tambah("mengecil.", emo("dn", 272, 172, E.tangan, 18)),
    ),
  ],
};

/* ------------------------------ Difference Table: terapan ------------------------------ */
const SUARA_U1 = "Genta menulis tujuh, lima, tiga, lalu menuliskan kurang dua di antara tiap pasangan.";
const SUARA_U2 = "Selisihnya sama, jadi ia melanjutkan tabel ke deret berikutnya, yaitu satu.";
const SUARA_U3 = "Cocok untuk memeriksa selisih dan menentukan deret yang lebih jauh dengan rapi.";
const SUARA_U4 = "Kurang cocok kalau selisihnya berubah-ubah, karena tabel hanya untuk selisih yang tetap.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Tabel Selisih: kapan cocok",
  sumber: "Metode global: Difference Table (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Tabel Genta"), ...papanTulis("pt", 8, 28, 284, 124), ...tabel("tb", 40, 46, 240, 84, 4, 88), ...tokoh("ge", 40, 184, "Genta")),
      tambah("tujuh,", teks("c0", 70, 74, "7", 16, K.kapur)),
      tambah("lima,", teks("c1", 130, 74, "5", 16, K.kapur)),
      tambah("tiga,", teks("c2", 190, 74, "3", 16, K.kapur)),
      tambah("kurang", teks("e1", 100, 112, "−2", 12, K.kapurMerah), teks("e2", 160, 112, "−2", 12, K.kapurMerah)),
    ),
    k(
      SUARA_U2,
      sorotkan("sama,", "e1", "e2"),
      tambah("melanjutkan", teks("e3", 220, 112, "−2", 12, K.kapurMerah)),
      tambah("yaitu", kotak("sk", 224, 52, 52, 30, undefined, K.kapurBiru, { rx: 3, tebal: 1.6, z: 3 })),
      tambah("satu.", teks("c3", 250, 74, "1", 16, K.kapurBiru)),
    ),
    k(
      SUARA_U3,
      tambah("Cocok", emo("ok", 112, 172, E.benar, 20)),
      tambah("memeriksa", teks("pk", 170, 170, "periksa selisih", 9, W.hijauTua)),
      tambah("jauh", teks("dj", 250, 170, "deret jauh", 9, W.hijauTua)),
    ),
    k(
      SUARA_U4,
      hapus(0, "ok", "pk", "dj"),
      tambah(0, emo("xs", 112, 172, E.salah, 20)),
      tambah("berubah-ubah,", teks("bu", 190, 168, "−2, −1, −3", 10, W.merah)),
      tambah("hanya", teks("hy", 190, 186, "hanya selisih tetap", 8, W.coklat)),
    ),
  ],
};

/* ------------------------------ Group by Five: konsep ------------------------------ */
const SUARA_L1 = "Cara ketiga, Group by Five, atau Susun Per Lima.";
const SUARA_L2 = "Kita menyusun benda dalam baris berisi lima, lalu sisanya di baris berikutnya.";
const SUARA_L3 = "Dengan susunan rapi, banyak benda terlihat sekilas tanpa menghitung satu per satu.";
const SUARA_L4 = "Angklung kita pun mudah dibandingkan dari satu deret ke deret lainnya.";

export const ADEGAN_LUAR_LIMA: AdeganStory = {
  id: "luar-lima",
  judul: "Group by Five: Susun Per Lima",
  sumber: "Metode global: Group by Five (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cara 3: Group by Five"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Group", teks("nm", 150, 50, "Group by Five", 13, K.kapurMerah)),
      tambah("Susun", teks("ni", 150, 66, "Susun Per Lima", 10, K.kapur)),
      tambah("Lima.", ...titikKapur("t0", 118, 100, 5, 16), teks("g5", 150, 128, "5 per baris", 11, K.kapurBiru)),
    ),
    k(
      SUARA_L2,
      hapus(0, ...idTitik("t0", 5), "g5"),
      tambah("baris", ...titikKapur("t1", 44, 100, 5, 16)),
      tambah("lima,", teks("l5", 150, 104, "5 benda", 10, K.kapurBiru)),
      tambah("sisanya", ...titikKapur("t2", 44, 124, 3, 16), teks("s3", 150, 128, "sisa 3", 9, K.kapurMerah)),
    ),
    k(
      SUARA_L3,
      tambah("rapi,", emo("ok", 60, 172, E.benar, 20)),
      tambah("sekilas", teks("sk", 140, 172, "5 + 3 = 8", 12, W.hijauTua)),
      tambah("satu", teks("sx", 240, 172, "bukan 1 per 1", 9, W.merah)),
    ),
    k(
      SUARA_L4,
      hapus(0, "sk", "sx", "ok"),
      tambah("mudah", ...titikKapur("t3", 204, 100, 5, 16), ...titikKapur("t4", 204, 124, 5, 16)),
      tambah("satu", teks("d1", 76, 146, "deret 1", 8, K.kapur)),
      tambah("deret@2", teks("d2", 236, 146, "deret 2", 8, K.kapur)),
    ),
  ],
};

/* ------------------------------ Group by Five: terapan ------------------------------ */
const SUARA_M1 = "Satria menyusun sepuluh angklung menjadi dua baris berisi lima.";
const SUARA_M2 = "Dari susunan itu ia langsung yakin bahwa deret kelima berisi sepuluh angklung.";
const SUARA_M3 = "Cocok untuk benda yang banyak, karena jumlahnya cepat terbaca.";
const SUARA_M4 = "Kurang cocok kalau bendanya hanya dua atau tiga, karena baris lima malah membuang tempat.";
const idH = (...a: [string, number][]): string[] => a.flatMap(([id, n]) => Array.from({ length: n }, (_, i) => `${id}-c${i}`));

export const ADEGAN_LUAR_LIMA_TERAPAN: AdeganStory = {
  id: "luar-lima-terapan",
  judul: "Susun Per Lima: kapan cocok",
  sumber: "Metode global: Group by Five (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Sepuluh Angklung Satria"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("sa", 40, 184, "Satria")),
      tambah("sepuluh", teks("n10", 150, 52, "10", 14, K.kapurMerah)),
      tambah("angklung", ...deret("h1", 100, 92, 5, 24, 20, K.kapur)),
      tambah("dua", teks("b2", 258, 134, "2 baris", 9, K.kapurBiru)),
      tambah("baris", ...deret("h2", 100, 124, 5, 24, 20, K.kapur)),
      tambah("lima.", teks("f1", 236, 88, "5", 12, K.kapurBiru), teks("f2", 236, 120, "5", 12, K.kapurBiru)),
    ),
    k(
      SUARA_M2,
      tambah("langsung", emo("el", 262, 52, E.lampu, 18)),
      tambah("kelima", teks("k5", 170, 170, "deret 5 = 10", 10, W.hijauTua)),
      sorotkan("sepuluh", ...idH(["h1", 5], ["h2", 5])),
      tambah("angklung.", emo("ok", 232, 172, E.benar, 20)),
    ),
    k(
      SUARA_M3,
      hapus(0, "k5", "ok"),
      tambah("Cocok", emo("ok2", 112, 172, E.benar, 20)),
      tambah("banyak,", teks("bb", 170, 170, "benda banyak", 10, W.hijauTua)),
      tambah("cepat", emo("rk", 232, 172, E.roket, 20)),
    ),
    k(
      SUARA_M4,
      hapus(0, "ok2", "bb", "rk"),
      tambah(0, emo("xs", 112, 172, E.salah, 20)),
      tambah("dua", teks("dt", 170, 168, "hanya 2 atau 3", 10, W.merah)),
      tambah("lima", teks("bs", 170, 186, "baris 5 boros", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Ratri. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin membayangkan pola, pakai Gambar Berikutnya. Ingin memastikan selisih sama, pakai Tabel Selisih.";
const SUARA_R3 = "Ingin menghitung benda yang banyak dengan cepat, pakai Susun Per Lima. Apa pun caranya, selalu periksa selisihnya dulu.";
const SUARA_R4 = "Menurutmu, untuk deret angklung yang sangat panjang, cara mana yang paling pas?";
const kartuCara = (id: string, y: number, isi: string): Obj[] => [kotak(`${id}-k`, 96, y, 190, 28, "#FDE68A", W.bambuTua, { rx: 6, tebal: 1.6, z: 1 }), teks(`${id}-t`, 191, y + 19, isi, 11, W.biru, { z: 2 })];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150), teks("n3", 48, 78, "3 cara", 14, W.merah)),
      tambah("sudah", ...kartuCara("r0", 40, "Gambar Berikutnya")),
      tambah("pelajari", ...kartuCara("r1", 76, "Tabel Selisih")),
      tambah("Ratri.", ...kartuCara("r2", 112, "Susun Per Lima"), ...tokoh("br", 40, 184, "Bu Ratri")),
      tambah("Mana", emo("pk", 258, 160, E.pikir, 20)),
    ),
    k(
      SUARA_R2,
      hapus(0, "pk"),
      sorotkan("Gambar", "r0-k"),
      tambah("Berikutnya.", emo("ok1", 270, 54, E.benar, 18)),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("Tabel", "r1-k"),
      tambah("Selisih@2", emo("ok2", 270, 90, E.benar, 18)),
    ),
    k(
      SUARA_R3,
      redamkan("Ingin", "r1-k"),
      sorotkan("Susun", "r2-k"),
      tambah("Lima.", teks("s5", 191, 150, "5 per baris", 8, W.hijauTua), emo("ok3", 270, 126, E.benar, 18)),
      tambah("selalu", teks("ps", 250, 164, "periksa selisih", 8, W.merah)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Cara Mana?"), ...tanah("tn", 150), ...tokoh("br", 40, 184, "Bu Ratri")),
      tambah("deret", ...deret("pj", 80, 104, 10, 17, 22)),
      tambah("sangat", teks("sp", 160, 126, "sangat panjang", 9, W.coklat)),
      tambah("cara", teks("tq", 160, 66, "?", 30, W.merah)),
      tambah("pas?", emo("i0", 214, 170, "\u{1F3A8}", 18), emo("i1", 240, 170, "\u{1F4CB}", 18), emo("i2", 266, 170, "\u{270B}", 18)),
    ),
  ],
};
