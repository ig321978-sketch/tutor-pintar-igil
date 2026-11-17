import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, garis, judul, kardus, karton, kartu, label, orang, poligon, segiEmpatRel, segitigaRel, semuaSisi, semuaSudut, sudutMutlak, teks, tutupKaleng } from "./k1b4a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k1b4a-bantu";

/* Video metode global Sub-Bab A "Bahan dari Gudang": pembuka dan Shape Hunt (Berburu Bentuk). */

export const NAMA_METODE = ["Shape Hunt", "Geoboard", "Mystery Shape"];
export const NAMA_METODE_ID = ["Berburu Bentuk", "Papan Paku", "Bentuk Misterius"];
export const WARNA_METODE = [W.merahMuda, W.langit, W.lavender];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Pak RT membawa poster dari festival kota lain. Di sana, anak-anak mengenal bentuk dengan tiga cara. Kaka ingin mencobanya.";
const SUARA_O2 = "Tiga metode itu: Shape Hunt, Geoboard, dan Mystery Shape.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Berburu Bentuk, Papan Paku, dan Bentuk Misterius.";
const SUARA_O4 = "Semua metode membantu kita mengenali bentuk dari sisi lurus dan sudutnya.";
const SG_O = sudutMutlak(160, 104, segitigaRel(44));

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk mengenal bentuk",
  sumber: "Metode global: pembuka",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global"), ...tutupKaleng("i0", 112, 90, 16), karton("i1", 152, 94, 18), ...kardus("i2", 196, 92, 30, 24)),
      tambah("Kaka", ...orang("kk", 40, 120, E.kaka, "Kaka")),
      tambah("kota", emo("gl", 262, 110, "\u{1F30D}", 40)),
      tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(["Shape", "Geoboard,", "Mystery"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Berburu", "Papan", "Misterius."][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Kenali sisi lurus dan sudut"), karton("sg", 160, 104, 44)),
      tambah("mengenali", emo("kc", 60, 110, E.kaca, 34)),
      tambah("sisi", ...semuaSisi("sg", SG_O), teks("ts", 250, 170, "sisi lurus", 9, W.merah)),
      tambah("sudutnya.", ...semuaSudut("sg", SG_O), teks("tu", 250, 188, "sudut", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 2. Shape Hunt: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Shape Hunt, atau Berburu Bentuk. Kita mencari bentuk pada benda di sekitar kita.";
const SUARA_A2 = "Lihat tepi benda itu. Apakah tepinya lengkung, atau punya sisi lurus dan sudut?";
const SUARA_A3 = "Lalu sebutkan nama bentuknya: lengkung, segitiga, atau segi empat.";
const SUARA_A4 = "Terakhir, hitung berapa benda yang ditemukan untuk tiap bentuk.";
const SUARA_A5 = "Berburu bentuk cocok bila bendanya terlihat jelas, tetapi lambat bila benda bertumpuk di teras.";
const B1 = sudutMutlak(182, 106, segitigaRel(22));
const B2 = sudutMutlak(248, 102, segiEmpatRel(44, 32));

export const ADEGAN_LUAR_BERBURU: AdeganStory = {
  id: "luar-berburu",
  judul: "Shape Hunt: berburu bentuk",
  sumber: "Metode global: Shape Hunt",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah("mencari", emo("kc", 50, 112, E.kaca, 34)),
      tambah("sekitar", ...tutupKaleng("b0", 120, 102, 20), karton("b1", 182, 106, 22), ...kardus("b2", 248, 102, 44, 32)),
    ),
    k(
      SUARA_A2,
      sorotkan("tepi", "b0", "b1", "b2"),
      tambah("lengkung,", bulat("b0-o", 120, 102, 25, "none", W.merah, { tebal: 2, putus: true })),
      tambah("sisi", ...semuaSisi("b1", B1), ...semuaSisi("b2", B2)),
      tambah("sudut?", ...semuaSudut("b1", B1), ...semuaSudut("b2", B2)),
    ),
    k(
      SUARA_A3,
      tambah("lengkung,", teks("n0", 120, 146, "lengkung", 9, W.biru)),
      tambah("segitiga,", teks("n1", 182, 146, "segitiga", 9, W.biru)),
      tambah("segi@2", teks("n2", 248, 146, "segi empat", 9, W.biru)),
    ),
    k(
      SUARA_A4,
      tambah("hitung", ...kartu("hc", 50, 162, 200, 26, W.emas, ["hitung tiap bentuk"], 10)),
      tambah("ditemukan", emo("c0", 120, 74, E.benar, 12), emo("c1", 182, 74, E.benar, 12), emo("c2", 248, 74, E.benar, 12)),
    ),
    k(
      SUARA_A5,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("cocok", emo("bc", 40, 84, "👍", 26), ...kartu("bk", 64, 66, 222, 38, W.hijauMuda, ["cocok: benda terlihat jelas"], 9.4)),
      tambah("tetapi", emo("bt", 40, 142, "🐢", 26), ...kartu("bl", 64, 124, 222, 38, W.merahMuda, ["lambat: benda bertumpuk"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Shape Hunt: terapan di dapur ------------------------------ */
const SUARA_B1 = "Igil berburu bentuk di dapur. Jam dinding dan piring tepinya lengkung. Ada dua benda lengkung.";
const SUARA_B2 = "Jendela dapur punya empat sisi lurus dan empat sudut. Pintu lemari juga. Ada dua benda segi empat.";
const SUARA_B3 = "Mamah memotong roti isi menjadi potongan segitiga. Tiap potongan punya tiga sisi lurus dan tiga sudut. Ada tiga potongan.";
const SUARA_B4 = "Igil mencatat hasilnya. Dua lengkung, dua segi empat, dan tiga segitiga.";
const JD = sudutMutlak(136, 92, segiEmpatRel(30, 30));
const LM = sudutMutlak(178, 92, segiEmpatRel(22, 34));
const ROTI = [222, 250, 278].map((x) => ({ x, y: 96 }));
const ROTI0 = sudutMutlak(222, 96, segitigaRel(11));

export const ADEGAN_LUAR_BERBURU_TERAPAN: AdeganStory = {
  id: "luar-berburu-terapan",
  judul: "Shape Hunt: bentuk di dapur",
  sumber: "Metode global: Shape Hunt, terapan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("Igil", ...orang("ig", 30, 178, E.igil, "Igil")),
      tambah("Jam", bulat("jm", 44, 92, 17, W.putih, W.biru, { tebal: 3 }), emo("jme", 44, 99, E.jam, 16)),
      tambah("piring", bulat("pr", 86, 92, 17, "#F1F5F9", W.biru, { tebal: 3 }), emo("pre", 86, 99, E.piring, 16)),
      sorotkan("lengkung.", "jm", "pr"),
      tambah("dua", ...label("l0", 16, 122, 98, "2 lengkung", W.langit)),
    ),
    k(
      SUARA_B2,
      tambah("Jendela", poligon("jd", 136, 92, segiEmpatRel(30, 30), "#BAE6FD"), garis("jd-x", 136, 78, 0, 28, W.biru, 1.5), garis("jd-y", 122, 92, 28, 0, W.biru, 1.5)),
      tambah("empat", ...semuaSisi("jd", JD), teks("j4", 150, 62, "4 sisi lurus, 4 sudut", 8.4, W.merah)),
      tambah("sudut.", ...semuaSudut("jd", JD)),
      tambah("Pintu", poligon("lm", 178, 92, segiEmpatRel(22, 34), "#FCD34D"), bulat("lm-o", 184, 94, 2, W.coklat, W.coklat)),
      tambah("juga.", ...semuaSudut("lm", LM)),
      tambah("dua", ...label("l1", 112, 122, 92, "2 segi empat", W.lavender, 9.4)),
    ),
    k(
      SUARA_B3,
      tambah("Mamah", emo("mm", 250, 186, E.mamah, 18)),
      tambah("segitiga.", ...ROTI.map((p, i) => poligon(`rt${i}`, p.x, p.y, segitigaRel(11), "#FDE68A"))),
      tambah("punya", ...semuaSisi("rt0", ROTI0), teks("t3", 252, 62, "3 sisi lurus, 3 sudut", 7.6, W.merah)),
      tambah("sudut.", ...semuaSudut("rt0", ROTI0)),
      tambah("Ada", ...label("l2", 208, 122, 86, "3 segitiga", W.pink, 9.4)),
    ),
    k(
      SUARA_B4,
      hapus(0, "mm"),
      tambah("mencatat", ...kartu("ct", 64, 150, 226, 32, W.emas, ["2 lengkung, 2 segi empat, 3 segitiga"], 9)),
      sorotkan("Dua", "l0-k"),
      sorotkan("dua@2", "l1-k"),
      sorotkan("tiga", "l2-k"),
    ),
  ],
};
