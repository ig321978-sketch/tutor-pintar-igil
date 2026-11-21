import type { AdeganStory } from "./logika-story";
import { E, W, bar, campur, emo, idPec, judul, kartu, lantai, panah, pec, tanda, teks, tokoh } from "./k5b3c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b3c-bantu";

/*
 * Cerita orisinal IGIL "Sisa Adonan Bu Nani" (Kelas 5 Bab 3 Sub-Bab C), video metode global, lanjutan.
 * Naskah suara dari naskah/story-naskah-k5b3c.md. Bagian ini: Match and Take Away (Samakan Lalu Kurangi), Split Whole and Part (Pisah Bulat dan Pecahan), terapannya, dan ringkasan.
 */

/* ------------------------------ Match and Take Away: konsep ------------------------------ */
const SUARA_M1 = "Cara kedua, Match and Take Away, atau Samakan Lalu Kurangi.";
const SUARA_M2 = "Cari KPK dari kedua penyebut, lalu ubah tiap pecahan menjadi pecahan yang sama besar dengan penyebut itu.";
const SUARA_M3 = "Sesudah penyebutnya sama, kurangkan pembilangnya seperti cara pertama.";
const SUARA_M4 = "Hasilnya disederhanakan bila masih bisa.";

export const ADEGAN_LUAR_SAMAKAN: AdeganStory = {
  id: "luar-samakan",
  judul: "Match and Take Away",
  sumber: "Metode global: Match and Take Away (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Cara 2"), ...lantai("lt", 150), emo("rt", 150, 138, E.rantai, 34, { z: 3 })),
      tambah("Match", teks("m1", 150, 62, "Match and Take Away", 14, W.merah, { z: 3 })),
      tambah("Samakan", teks("m2", 150, 88, "Samakan Lalu Kurangi", 11.5, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Cari KPK"), ...lantai("lt", 150), ...pec("a", 50, 80, 1, 2, 20), ...pec("b", 50, 124, 1, 3, 20, W.merah)),
      tambah("KPK", teks("kp", 150, 46, "KPK kedua penyebut", 11, W.pinkTua, { z: 3 })),
      tambah("ubah", panah("r1", 76, 80, 40, 0, W.biru, 2, { z: 2 }), panah("r2", 76, 124, 40, 0, W.biru, 2, { z: 2 })),
      tambah("menjadi", ...pec("c", 160, 80, 3, 6, 20), ...pec("d", 160, 124, 2, 6, 20, W.merah)),
      tambah("sama", teks("sb", 240, 104, "sama besar", 10.6, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Kurangi pembilang"), ...lantai("lt", 150), ...pec("a", 70, 88, 3, 6, 22), tanda("m1", 110, 90, "−", 24), ...pec("b", 150, 88, 2, 6, 22, W.merah), tanda("m2", 190, 90, "=", 24), teks("qq", 226, 94, "?", 22, W.merah, { z: 3 })),
      tambah("sama", teks("sm", 110, 134, "penyebut sama: 6", 11, W.coklat, { z: 3 })),
      sorotkan("pembilangnya", "ap", "bp"),
      tambah("pertama", emo("rt", 260, 142, E.bintang, 22, { z: 3 })),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Sederhanakan hasil"), ...lantai("lt", 150), ...pec("a", 86, 92, 2, 6, 24)),
      tambah("bila", tanda("m1", 128, 94, "=", 24), ...pec("b", 170, 92, 1, 3, 24, W.hijauTua)),
      tambah("bisa", emo("ok", 232, 96, E.benar, 28, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Match and Take Away: terapan ------------------------------ */
const SUARA_N1 = "Bima mengurangkan satu per tiga dari satu per dua, dengan KPK enam.";
const SUARA_N2 = "Satu per dua menjadi tiga per enam, satu per tiga menjadi dua per enam, selisihnya satu per enam.";
const SUARA_N3 = "Cocok untuk pecahan biasa berpenyebut berbeda.";
const SUARA_N4 = "Kurang cocok untuk pecahan campuran yang besar, karena angkanya jadi panjang.";

export const ADEGAN_LUAR_SAMAKAN_TERAPAN: AdeganStory = {
  id: "luar-samakan-terapan",
  judul: "Samakan: kapan cocok",
  sumber: "Metode global: Match and Take Away (terapan)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Samakan: kapan cocok"), ...lantai("lt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("tiga", ...pec("b", 190, 84, 1, 3, 20, W.merah)),
      tambah("dari", tanda("m1", 150, 86, "−", 22), ...pec("a", 110, 84, 1, 2, 20)),
      tambah("KPK", teks("kp", 150, 128, "KPK 6", 13, W.pinkTua, { z: 3 })),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, ...pec("a", 56, 50, 1, 2, 16)),
      tambah("menjadi", tanda("e1", 96, 52, "=", 18)),
      tambah("tiga", ...pec("b", 136, 50, 3, 6, 16, W.hijauTua)),
      tambah("satu@2", ...pec("c", 56, 98, 1, 3, 16)),
      tambah("menjadi@2", tanda("e2", 96, 100, "=", 18)),
      tambah("dua@2", ...pec("d", 136, 98, 2, 6, 16, W.hijauTua)),
      tambah("selisihnya", teks("sl", 56, 152, "selisih", 12, W.merah, { z: 3 })),
      tambah("satu@3", ...pec("g", 136, 148, 1, 6, 16, W.pinkTua)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Cocok: pecahan biasa"), ...lantai("lt", 150), emo("ok", 150, 140, E.benar, 30, { z: 3 })),
      tambah("pecahan", ...bar("ra", 40, 56, 2, 110, 22, 1), ...bar("rb", 40, 90, 3, 73.3, 22, 1)),
      tambah("biasa", teks("bs", 150, 124, "penyebut beda", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Kurang cocok: angka panjang"), ...lantai("lt", 150), emo("xx", 266, 160, E.salah, 28, { z: 3 })),
      tambah("campuran", ...campur("x", 70, 94, 62, 5, 1, 2, 16), tanda("m1", 124, 64, "−", 20), ...campur("y", 156, 180, 62, 2, 1, 3, 16, W.merah)),
      tambah("angkanya", ...pec("a", 62, 124, 33, 6, 16), tanda("m2", 104, 126, "−", 20), ...pec("b", 146, 124, 14, 6, 16, W.merah), tanda("m3", 186, 126, "=", 20), ...pec("c", 226, 124, 19, 6, 16, W.hijauTua)),
      tambah("panjang", teks("pj", 150, 168, "angka jadi panjang", 11, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Split Whole and Part: konsep ------------------------------ */
const SUARA_S1 = "Cara ketiga, Split Whole and Part, atau Pisah Bulat dan Pecahan.";
const SUARA_S2 = "Pada pecahan campuran, kurangkan bilangan bulatnya sendiri dan pecahannya sendiri.";
const SUARA_S3 = "Kalau penyebut pecahannya berbeda, samakan dulu pecahan itu.";
const SUARA_S4 = "Setelah itu gabungkan hasil bilangan bulat dan hasil pecahan.";

export const ADEGAN_LUAR_PISAH: AdeganStory = {
  id: "luar-pisah",
  judul: "Split Whole and Part",
  sumber: "Metode global: Split Whole and Part (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 3"), ...lantai("lt", 150), emo("gt", 150, 138, E.gunting, 34, { z: 3 })),
      tambah("Split", teks("m1", 150, 62, "Split Whole and Part", 14, W.merah, { z: 3 })),
      tambah("Pisah", teks("m2", 150, 88, "Pisah Bulat dan Pecahan", 11.5, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Campuran dipisah"), ...lantai("lt", 150), ...campur("x", 84, 108, 90, 6, 3, 5, 20), tanda("m1", 150, 92, "−", 24), ...campur("y", 192, 216, 90, 2, 1, 5, 20, W.merah)),
      sorotkan("bulatnya", "xb", "yb"),
      sorotkan("pecahannya", ...idPec("x"), ...idPec("y")),
      tambah("sendiri", teks("sd", 150, 140, "bulat sendiri, pecahan sendiri", 11, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Samakan pecahannya"), ...lantai("lt", 150), ...pec("a", 56, 80, 1, 2, 20), ...pec("b", 56, 124, 1, 3, 20, W.merah)),
      tambah("samakan", panah("r1", 82, 80, 40, 0, W.biru, 2, { z: 2 }), panah("r2", 82, 124, 40, 0, W.biru, 2, { z: 2 })),
      tambah("dulu", ...pec("c", 166, 80, 3, 6, 20), ...pec("d", 166, 124, 2, 6, 20, W.merah)),
      tambah("itu", emo("ok", 244, 104, E.benar, 26, { z: 3 })),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Digabung lagi"), ...lantai("lt", 150), teks("bl", 56, 96, "3", 28, W.hijauTua, { z: 3 })),
      tambah("gabungkan", tanda("m1", 90, 92, "+", 22), ...pec("b", 124, 90, 1, 6, 22, W.hijauTua)),
      tambah("bilangan", tanda("m2", 160, 92, "=", 22)),
      tambah("pecahan", ...campur("g", 200, 224, 90, 3, 1, 6, 22, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Split Whole and Part: terapan ------------------------------ */
const SUARA_P1 = "Fajar mengurangkan satu bulat satu per empat dari tiga bulat tiga per empat.";
const SUARA_P2 = "Bilangan bulatnya tiga dikurangi satu sama dengan dua, pecahannya tiga per empat dikurangi satu per empat sama dengan dua per empat.";
const SUARA_P3 = "Gabungannya dua bulat dua per empat, atau dua bulat satu per dua.";
const SUARA_P4 = "Kurang cocok untuk dua pecahan biasa tanpa bilangan bulat, karena tidak ada yang dipisahkan.";

export const ADEGAN_LUAR_PISAH_TERAPAN: AdeganStory = {
  id: "luar-pisah-terapan",
  judul: "Pisah: kapan cocok",
  sumber: "Metode global: Split Whole and Part (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pisah: kapan cocok"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("satu", ...campur("y", 204, 228, 88, 1, 1, 4, 20, W.merah)),
      tambah("dari", tanda("m1", 168, 90, "−", 22)),
      tambah("tiga", ...campur("x", 104, 128, 88, 3, 3, 4, 20)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Bulat dan pecahan"), teks("a1", 40, 70, "3", 22, W.biru, { z: 3 })),
      tambah("dikurangi", tanda("a2", 72, 66, "−", 22)),
      tambah("satu", teks("a3", 104, 70, "1", 22, W.merah, { z: 3 })),
      tambah("sama", tanda("a4", 136, 66, "=", 22)),
      tambah("dua", teks("a5", 168, 70, "2", 22, W.hijauTua, { z: 3 })),
      tambah("pecahannya", ...pec("b", 44, 130, 3, 4, 18)),
      tambah("dikurangi@2", tanda("b2", 80, 132, "−", 22)),
      tambah("satu@2", ...pec("c", 116, 130, 1, 4, 18, W.merah)),
      tambah("sama@2", tanda("b4", 152, 132, "=", 22)),
      tambah("dua@2", ...pec("d", 188, 130, 2, 4, 18, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Gabungannya"), ...lantai("lt", 150)),
      tambah("empat", ...campur("g1", 70, 96, 90, 2, 2, 4, 22, W.hijauTua)),
      tambah("atau", teks("at", 150, 96, "atau", 12, W.coklat, { z: 3 })),
      tambah("satu", ...campur("g2", 200, 226, 90, 2, 1, 2, 22, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Tidak ada yang dipisah"), ...lantai("lt", 150), teks("dw", 150, 48, "2 pecahan biasa", 12, W.biru, { z: 3 })),
      tambah("pecahan", ...pec("a", 104, 96, 3, 5, 22), tanda("m1", 140, 98, "−", 24), ...pec("b", 176, 96, 1, 5, 22, W.merah)),
      tambah("tanpa", teks("tb", 150, 140, "tanpa bilangan bulat", 11, W.coklat, { z: 3 })),
      tambah("dipisahkan", emo("xx", 250, 96, E.salah, 28, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Nani, dan masing-masing punya saat yang tepat.";
const SUARA_R2 = "Penyebut sama, pakai Kurangi Pembilang. Penyebut berbeda, pakai Samakan Lalu Kurangi. Campuran, pakai Pisah Bulat dan Pecahan.";
const SUARA_R3 = "Apa pun caranya, ingat bahwa penyebut yang berbeda harus disamakan sebelum dikurangkan.";
const SUARA_R4 = "Menurutmu, untuk mengurangkan dua bulat satu per tiga dari lima bulat satu per tiga, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Tiga cara bersama Bu Nani",
  sumber: "Ringkasan: tiga cara",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga cara bersama Bu Nani"), ...lantai("lt", 150), ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("Tiga", teks("n3", 170, 50, "3 cara", 13, W.merah, { z: 3 })),
      tambah("pelajari", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 100 + i * 64, 70, 58, 44, [W.daun, W.langit, W.pink][i], String(i + 1), 18))),
      tambah("tepat", emo("ok", 170, 140, E.benar, 24, { z: 3 })),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Kapan memakai tiap cara"), ...lantai("lt", 150)),
      tambah("Kurangi", teks("v1", 150, 58, "penyebut sama: Kurangi Pembilang", 10.5, W.biru, { z: 3 })),
      tambah("Samakan", teks("v2", 150, 98, "penyebut berbeda: Samakan Lalu Kurangi", 10.5, W.biru, { z: 3 })),
      tambah("Pisah", teks("v3", 150, 138, "campuran: Pisah Bulat dan Pecahan", 10.5, W.biru, { z: 3 })),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Ingat!"), ...lantai("lt", 150), ...pec("a", 90, 84, 1, 2, 22), tanda("m1", 128, 86, "−", 24), ...pec("b", 166, 84, 1, 3, 22, W.merah)),
      sorotkan("berbeda", "aq", "bq"),
      tambah("disamakan", teks("sd", 128, 132, "samakan dulu", 12, W.pinkTua, { z: 3 })),
      tambah("dikurangkan", emo("rt", 240, 90, E.rantai, 28, { z: 3 })),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Cara mana paling cepat?"), ...lantai("lt", 150), ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("dua", ...campur("y", 200, 224, 88, 2, 1, 3, 22, W.merah)),
      tambah("lima", ...campur("x", 100, 124, 88, 5, 1, 3, 22), tanda("m1", 164, 90, "−", 24)),
      tambah("cepat", emo("tq", 262, 90, E.tanya, 28, { z: 3 })),
    ),
  ],
};
