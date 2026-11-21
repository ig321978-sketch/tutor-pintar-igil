import type { AdeganStory } from "./logika-story";
import { DERET, E, W, cincin, deret, emo, garis, gerobak, judul, kartu, labelDeret, lantai, papan, teks, tokoh, type OpsiDeret } from "./k5b2b-gambar";
import { hapus, k, sorotkan, tambah } from "./k5b2b-bantu";

/*
 * Cerita orisinal IGIL "Dua Lonceng Pak Tarno" (Kelas 5 Bab 2 Sub-Bab B), Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2b.md. Bagian ini: Pak Tarno dan lonceng bakso, dua daftar kelipatan, dan kelipatan persekutuan.
 */

/** Deret lebih rapat supaya sembilan kotak muat pada lebar kanvas. */
export const DERET_RAPAT: OpsiDeret = { ...DERET, cw: 28, gap: 3 };
export const X_DERET = 14;
export const Y_A = 56;
export const Y_B = 104;
const A_AWAL = [4, 8, 12, 16, 20, 24];
const B_AWAL = [6, 12, 18, 24, 30];

/* ------------------------------ 1. Dua lonceng ------------------------------ */
const SUARA_D1 = "Pak Tarno datang mendorong gerobak bakso, dan lonceng kecilnya berbunyi tiap enam menit.";
const SUARA_D2 = "Kalau lonceng bakso dan lonceng Bu Marni berbunyi bersamaan, pengunjung mendapat es teh gratis.";
const SUARA_D3 = "Pak Tarno meminta bantuan mencari menit pertama saat keduanya berbunyi bersama.";

export const ADEGAN_DUA_LONCENG: AdeganStory = {
  id: "dua-lonceng",
  judul: "Pak Tarno dan lonceng bakso",
  sumber: "Materi: dua lonceng berbunyi bersama",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Dua Lonceng Pak Tarno"), ...lantai("lt", 150)),
      tambah("Tarno", ...tokoh("pt", 262, 184, "Pak Tarno")),
      tambah("gerobak", ...gerobak("gr", 128, 98)),
      tambah("lonceng", emo("lc", 224, 82, E.lonceng, 18)),
      tambah("enam", teks("e6", 66, 74, "tiap 6 menit", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_D2,
      tambah("Marni", emo("lm", 40, 84, E.lonceng, 20), teks("lmn", 40, 100, "Bu Marni", 8.4, W.hijauTua, { z: 3 })),
      tambah("bersamaan", garis("sb", 56, 84, 152, 0, W.merah, 1.5, { putus: true, z: 4 }), teks("bs", 132, 76, "bersama!", 9, W.merah, { z: 3 })),
      tambah("es", emo("et", 118, 52, E.esteh, 26)),
      tambah("gratis", teks("gt", 190, 54, "gratis", 11, W.hijau, { z: 3 })),
    ),
    k(
      SUARA_D3,
      hapus(0, "et", "gt"),
      tambah("bantuan", emo("tn", 262, 134, E.tanya, 22)),
      tambah("menit", teks("mq", 150, 50, "menit ke berapa?", 11, W.merah, { z: 3 })),
      sorotkan("keduanya", "lm", "lc"),
    ),
  ],
};

/* ------------------------------ 2. Dua daftar ------------------------------ */
const SUARA_L1 = "Bima menulis dua daftar: kelipatan empat milik Bu Marni, dan kelipatan enam milik Pak Tarno.";
const SUARA_L2 = "Kelipatan empat: empat, delapan, dua belas, enam belas, dua puluh, dua puluh empat.";
const SUARA_L3 = "Kelipatan enam: enam, dua belas, delapan belas, dua puluh empat, tiga puluh.";

const BARIS_A = deret("da", X_DERET, Y_A, A_AWAL, W.jingga);
const BARIS_B = deret("db", X_DERET, Y_B, B_AWAL, W.tosca);
const potong = (objs: ReturnType<typeof deret>, i: number) => objs.slice(2 * i, 2 * i + 2);

export const ADEGAN_DUA_DAFTAR: AdeganStory = {
  id: "dua-daftar",
  judul: "Bima menulis dua daftar",
  sumber: "Materi: daftar kelipatan empat dan enam",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Bima Menulis Dua Daftar"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), ...tokoh("bi", 36, 184, "Bima")),
      tambah("dua", teks("n2", 262, 44, "2 daftar", 9, W.ungu, { z: 3 })),
      tambah("empat", labelDeret("la", X_DERET, Y_A, "Kelipatan 4 (Bu Marni)")),
      tambah("enam", labelDeret("lb", X_DERET, Y_B, "Kelipatan 6 (Pak Tarno)")),
    ),
    k(
      SUARA_L2,
      tambah("empat@2", ...potong(BARIS_A, 0)),
      tambah("delapan", ...potong(BARIS_A, 1)),
      tambah("belas", ...potong(BARIS_A, 2)),
      tambah("belas@2", ...potong(BARIS_A, 3)),
      tambah("puluh", ...potong(BARIS_A, 4)),
      tambah("puluh@2", ...potong(BARIS_A, 5)),
    ),
    k(
      SUARA_L3,
      tambah("enam@2", ...potong(BARIS_B, 0)),
      tambah("belas", ...potong(BARIS_B, 1)),
      tambah("belas@2", ...potong(BARIS_B, 2)),
      tambah("empat", ...potong(BARIS_B, 3)),
      tambah("puluh@2", ...potong(BARIS_B, 4)),
    ),
  ],
};

/* ------------------------------ 3. Kelipatan persekutuan ------------------------------ */
const SUARA_P1 = "Citra melingkari bilangan yang muncul di kedua daftar: dua belas dan dua puluh empat.";
const SUARA_P2 = "Bilangan kelipatan yang sama itu disebut kelipatan persekutuan.";
const SUARA_P3 = "Kalau daftarnya diteruskan, tiga puluh enam juga ikut terlingkari.";

const PA = deret("pa", X_DERET, Y_A, [4, 8, 12, 16, 20, 24, 28, 32, 36], W.jingga, DERET_RAPAT);
const PB = deret("pb", X_DERET, Y_B, [6, 12, 18, 24, 30, 36], W.tosca, DERET_RAPAT);
const lingkar = (id: string, y: number, i: number) => cincin(id, X_DERET, y, i, DERET_RAPAT);

export const ADEGAN_PERSEKUTUAN: AdeganStory = {
  id: "persekutuan",
  judul: "Citra melingkari yang sama",
  sumber: "Materi: kelipatan persekutuan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Citra Melingkari yang Sama"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), ...tokoh("ci", 36, 184, "Citra")),
      tambah(0, labelDeret("la", X_DERET, Y_A, "Kelipatan 4"), labelDeret("lb", X_DERET, Y_B, "Kelipatan 6"), ...PA.slice(0, 12), ...PB.slice(0, 10)),
      tambah("belas", lingkar("r12a", Y_A, 2), lingkar("r12b", Y_B, 1)),
      tambah("puluh", lingkar("r24a", Y_A, 5), lingkar("r24b", Y_B, 3)),
    ),
    k(
      SUARA_P2,
      sorotkan("sama", "r12a", "r12b", "r24a", "r24b"),
      tambah("persekutuan", ...kartu("kp", 60, 123, 180, 17, W.hijauMuda, ["kelipatan persekutuan"], 9, { z: 2 })),
    ),
    k(
      SUARA_P3,
      tambah("diteruskan", ...PA.slice(12, 18)),
      tambah("puluh", ...PB.slice(10, 12)),
      tambah("enam", lingkar("r36a", Y_A, 8), lingkar("r36b", Y_B, 5)),
    ),
  ],
};
