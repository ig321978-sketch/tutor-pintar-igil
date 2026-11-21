import type { AdeganStory } from "./logika-story";
import { E, W, bar, emo, isikan, judul, kotak, lantai, pec, silang, tanda, teks, tokoh } from "./k5b3c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b3c-bantu";

/*
 * Cerita orisinal IGIL "Sisa Adonan Bu Nani" (Kelas 5 Bab 3 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b3c.md. Bagian ini: pembuka (sisa adonan dan tiga cara), Take Away the Tops (Kurangi Pembilang), dan terapannya.
 */

export const NAMA_METODE = ["Take Away the Tops", "Match and Take Away", "Split Whole and Part"] as const;
export const NAMA_METODE_ID = ["Kurangi Pembilang", "Samakan Lalu Kurangi", "Pisah Bulat dan Pecahan"] as const;

const WARNA_CARA = [W.daun, W.langit, W.pink];
/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Bu Nani punya banyak sisa adonan, dan tiap pesanan harus dikurangkan dengan teliti.";
const SUARA_O2 = "Ada tiga cara mengurangkan pecahan, dan masing-masing cocok untuk keadaan yang berbeda.";
const SUARA_O3 = "Tiga cara itu: Take Away the Tops, Match and Take Away, dan Split Whole and Part.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Kurangi Pembilang, Samakan Lalu Kurangi, dan Pisah Bulat dan Pecahan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Sisa adonan menunggu",
  sumber: "Metode global: pembuka",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Sisa adonan menunggu"), ...lantai("lt", 150)),
      tambah("Nani", ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("sisa", ...bar("lo", 96, 76, 6, 30, 22, 4)),
      tambah("pesanan", teks("ps", 186, 60, "pesanan", 11, W.merah, { z: 3 })),
      tambah("teliti", emo("cr", 258, 132, E.cari, 26, { z: 3 })),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga cara"), ...lantai("lt", 150)),
      tambah("tiga", teks("n3", 150, 42, "3 cara", 13, W.merah, { z: 3 })),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`q${i}-k`, 6 + i * 98, 56, 92, 50, WARNA_CARA[i], W.biru, { rx: 6, tebal: 1.4, z: 1 }), teks(`q${i}a`, 52 + i * 98, 88, "?", 22, W.biru, { z: 3 })])),
      tambah("keadaan", teks("kd", 150, 168, "cocok untuk keadaan berbeda", 10.6, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_O3,
      ubah("Take", { id: "q0a", isi: "Take Away", u: 10.4, y: 78 }),
      ubah("Match", { id: "q1a", isi: "Match and", u: 10.4, y: 78 }),
      ubah("Split", { id: "q2a", isi: "Split Whole", u: 10.4, y: 78 }),
      tambah("Tops", teks("q0b", 52, 94, "the Tops", 10.4, W.biru, { z: 3 })),
      tambah("Away@2", teks("q1b", 150, 94, "Take Away", 10.4, W.biru, { z: 3 })),
      tambah("Part", teks("q2b", 248, 94, "and Part", 10.4, W.biru, { z: 3 })),
    ),
    k(
      SUARA_O4,
      tambah("Kurangi", teks("i0a", 52, 128, "Kurangi", 10, W.coklat, { z: 3 }), teks("i0b", 52, 142, "Pembilang", 10, W.coklat, { z: 3 })),
      tambah("Samakan", teks("i1a", 150, 128, "Samakan Lalu", 10, W.coklat, { z: 3 }), teks("i1b", 150, 142, "Kurangi", 10, W.coklat, { z: 3 })),
      tambah("Pisah", teks("i2a", 248, 128, "Pisah Bulat", 10, W.coklat, { z: 3 }), teks("i2b", 248, 142, "dan Pecahan", 10, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Take Away the Tops: konsep ------------------------------ */
const SUARA_P1 = "Cara pertama, Take Away the Tops, atau Kurangi Pembilang.";
const SUARA_P2 = "Kalau penyebutnya sudah sama, kita hanya mengurangkan angka di atas.";
const SUARA_P3 = "Angka di bawah tidak berubah, karena ukuran potongannya tetap sama.";
const SUARA_P4 = "Hasilnya bisa disederhanakan bila pembilang dan penyebutnya punya faktor yang sama.";

export const ADEGAN_LUAR_ATAS: AdeganStory = {
  id: "luar-atas",
  judul: "Take Away the Tops",
  sumber: "Metode global: Take Away the Tops (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 1"), ...lantai("lt", 150), emo("mn", 150, 138, "\u{2796}", 34, { z: 3 })),
      tambah("Take", teks("m1", 150, 62, "Take Away the Tops", 14, W.merah, { z: 3 })),
      tambah("Kurangi", teks("m2", 150, 88, "Kurangi Pembilang", 11.5, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Angka di atas"), ...lantai("lt", 150), ...pec("a", 84, 84, 5, 9, 22), tanda("m1", 124, 86, "−", 24), ...pec("b", 164, 84, 2, 9, 22), tanda("m2", 204, 86, "=", 24), teks("qq", 244, 90, "?", 22, W.merah, { z: 3 })),
      tambah("sama", teks("sm", 124, 128, "penyebut sama", 11, W.coklat, { z: 3 })),
      sorotkan("mengurangkan", "ap", "bp"),
      tambah("atas", teks("at", 150, 50, "kurangi yang di atas", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Angka di bawah tetap"), ...lantai("lt", 150), ...bar("p", 30, 56, 9, 27, 22, 5), ...bar("q", 30, 96, 9, 27, 22, 3)),
      tambah("bawah", teks("b9", 276, 72, "9", 14, W.merah, { z: 3 }), teks("b9b", 276, 112, "9", 14, W.merah, { z: 3 })),
      tambah("berubah", teks("tt", 150, 140, "tidak berubah", 11, W.hijauTua, { z: 3 })),
      tambah("ukuran", emo("ok", 150, 172, E.benar, 22, { z: 3 })),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Sederhanakan hasil"), ...lantai("lt", 150), ...pec("a", 90, 92, 4, 10, 24)),
      tambah("disederhanakan", tanda("m1", 134, 94, "=", 24)),
      tambah("pembilang", ...pec("b", 178, 92, 2, 5, 24, W.hijauTua)),
      tambah("faktor", teks("fk", 150, 140, "bagi dengan faktor sama", 11, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Take Away the Tops: terapan ------------------------------ */
const SUARA_T1 = "Citra mengurangkan tiga per sepuluh dari tujuh per sepuluh, hasilnya empat per sepuluh.";
const SUARA_T2 = "Ia menggambar sepuluh kotak, mengarsir tujuh, lalu mencoret tiga kotak.";
const SUARA_T3 = "Cocok untuk pecahan berpenyebut sama, karena langkahnya sangat singkat.";
const SUARA_T4 = "Kurang cocok kalau penyebutnya berbeda, karena potongannya tidak sama besar.";

export const ADEGAN_LUAR_ATAS_TERAPAN: AdeganStory = {
  id: "luar-atas-terapan",
  judul: "Kurangi: kapan cocok",
  sumber: "Metode global: Take Away the Tops (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Kurangi: kapan cocok"), ...lantai("lt", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("tiga", ...pec("b", 138, 84, 3, 10, 20, W.merah)),
      tambah("dari", tanda("m0", 118, 86, "−", 22)),
      tambah("tujuh", ...pec("a", 96, 84, 7, 10, 20)),
      tambah("hasilnya", tanda("m1", 168, 86, "=", 22)),
      tambah("empat", ...pec("c", 208, 84, 4, 10, 20, W.hijauTua)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Sepuluh kotak"), ...lantai("lt", 150)),
      tambah("sepuluh", ...bar("kt", 20, 66, 10, 26, 24, 0), teks("n10", 150, 52, "10 kotak", 11, W.biru, { z: 3 })),
      ubah("mengarsir", ...isikan("kt", 0, 7)),
      tambah("tujuh", teks("n7", 90, 118, "7 diarsir", 11, W.biru, { z: 3 })),
      tambah("mencoret", ...[4, 5, 6].flatMap((i) => silang("kt", i, 20, 66, 26, 24))),
      tambah("tiga", teks("n3", 220, 118, "3 dicoret", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Cocok: penyebut sama"), ...lantai("lt", 150), emo("ok", 150, 140, E.benar, 30, { z: 3 })),
      tambah("pecahan", ...bar("ra", 30, 56, 8, 30, 22, 5), ...bar("rb", 30, 90, 8, 30, 22, 2)),
      tambah("langkahnya", teks("sg", 150, 124, "langkahnya singkat", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kurang cocok: penyebut beda"), ...lantai("lt", 150), emo("xx", 266, 90, E.salah, 30, { z: 3 })),
      tambah("berbeda", ...bar("ra", 30, 56, 4, 52, 22, 3), ...bar("rb", 30, 90, 6, 34.7, 22, 1)),
      tambah("potongannya", teks("pb", 150, 134, "potongan tidak sama besar", 11, W.merah, { z: 3 })),
    ),
  ],
};
