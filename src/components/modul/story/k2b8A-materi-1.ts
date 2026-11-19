import type { AdeganStory, Obj } from "./logika-story";
import {
  ALAT_JENIS,
  E,
  LETAK_CAMPUR,
  W,
  WP,
  alat,
  alasPilah,
  emo,
  garis,
  idSemuaAlat,
  jepit,
  judul,
  kotak,
  lampu,
  lantai,
  letakBaris,
  peti,
  pindah,
  poster,
  rangka,
  semuaAlat,
  teks,
  tirai,
  tokoh,
  turus,
  type JenisAlat,
} from "./k2b8A-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k2b8A-bantu";

/*
 * Cerita orisinal IGIL "Alat Musik Pak Hendra" (Kelas 2 Bab 8 Sub-Bab A, diagram turus), awal cerita Pentas Seni Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b8a.md. Bagian ini: balik tirai panggung, memilah dan menghitung, dan satu garis satu benda.
 */

/* ------------------------------ 1. Balik tirai panggung ------------------------------ */
const SUARA_B1 = "Besok Pentas Seni Sekolah! Pak Hendra, penata panggung, membuka peti alat musik.";
const SUARA_B2 = "Bu Sari berkata, kita harus tahu banyak setiap alat musik supaya penampil tidak kekurangan.";
const SUARA_B3 = "Ada angklung, seruling, gendang, dan rebana, semuanya bercampur dalam satu tumpukan.";

/** Sebelas alat musik bercampur di depan peti: empat angklung, tiga seruling, dua gendang, dua rebana. */
const TUMPUK: [JenisAlat, number, number][] = [
  ["angklung", 172, 130],
  ["angklung", 196, 126],
  ["angklung", 218, 134],
  ["angklung", 184, 144],
  ["seruling", 208, 148],
  ["seruling", 230, 142],
  ["seruling", 196, 138],
  ["gendang", 234, 128],
  ["gendang", 170, 150],
  ["rebana", 214, 120],
  ["rebana", 188, 152],
];
const tumpuk = (jenis: JenisAlat): Obj[] => TUMPUK.flatMap(([j, x, y], i) => (j === jenis ? alat(`tp${i}`, x, y, j) : []));

export const ADEGAN_BALIK_TIRAI: AdeganStory = {
  id: "balik-tirai",
  judul: "Balik tirai panggung",
  sumber: "Materi: balik tirai dan peti alat musik",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Balik Tirai Panggung"), ...lantai("lt", 150), ...tirai("tr", 150), rangka("rg"), ...lampu("l1", 70), ...lampu("l2", 230)),
      tambah("Sekolah!", ...poster("ps", 105, 28, 90, 22, "PENTAS SENI")),
      tambah("Pak", ...tokoh("ph", 252, 184, "Pak Hendra")),
      tambah("peti", ...peti("pt", 96, 126, 60, 22)),
      tambah("musik.", ...alat("pa", 110, 122, "angklung", 1.1), ...alat("pb", 130, 118, "seruling"), ...alat("pc", 146, 121, "rebana", 0.9)),
    ),
    k(
      SUARA_B2,
      tambah("Sari", ...tokoh("bs", 44, 184, "Bu Sari")),
      tambah("banyak", emo("tq", 44, 128, E.tanya, 22)),
      tambah("penampil", emo("tp", 130, 92, E.topeng, 22)),
      tambah("kekurangan.", emo("ok", 190, 92, E.benar, 22)),
    ),
    k(
      SUARA_B3,
      tambah("angklung,", ...tumpuk("angklung")),
      tambah("seruling,", ...tumpuk("seruling")),
      tambah("gendang,", ...tumpuk("gendang")),
      tambah("rebana,", ...tumpuk("rebana")),
      tambah("bercampur", emo("cp", 150, 92, E.campur, 22)),
      tambah("satu", teks("n1", 218, 98, "1 tumpukan", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Pilah, lalu hitung satu per satu ------------------------------ */
const SUARA_P1 = "Pertama, alat musik dipilah menurut jenisnya, jadi semua angklung berkumpul dengan angklung.";
const SUARA_P2 = "Kedua, hitung setiap jenis satu per satu supaya tidak ada yang terlewat.";
const SUARA_P3 = "Data seperti ini kita catat dengan turus, yaitu garis tegak seperti lidi.";

const BARIS_Y = [62, 88, 114, 140] as const;
const CAMPUR = semuaAlat("pl", (_r, _i, n) => LETAK_CAMPUR[n]);
const RAPI = semuaAlat("pl", (r, i) => letakBaris(r, i, BARIS_Y, 74, 15));

export const ADEGAN_PILAH_HITUNG: AdeganStory = {
  id: "pilah-hitung",
  judul: "Pilah lalu hitung",
  sumber: "Materi: pilah menurut jenis, hitung, turus",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pilah Menurut Jenis"), ...alasPilah("al", 8, 49, 284, 26, 4), ...CAMPUR),
      ubah("dipilah", ...pindah(RAPI)),
      tambah("jenisnya,", ...ALAT_JENIS.map((a, r) => teks(`lb${r}`, 40, BARIS_Y[r] + 3, a.nama, 8.4, W.ungu))),
      sorotkan("angklung", ...idSemuaAlat("pl", 0, 8)),
      tambah("angklung@2", emo("c0", 214, 62, E.benar, 14)),
    ),
    k(
      SUARA_P2,
      sorotkan("hitung", ...idSemuaAlat("pl", 9, 14)),
      tambah("satu", teks("t1", 74, 46, "1", 9, W.merah)),
      tambah("satu@2", teks("t2", 89, 46, "2", 9, W.merah), teks("t3", 104, 46, "3", 9, W.merah)),
      tambah("terlewat.", emo("c1", 214, 88, E.benar, 14), emo("c2", 214, 114, E.benar, 14), emo("c3", 214, 140, E.benar, 14)),
    ),
    k(
      SUARA_P3,
      tambah("catat", ...jepit("pj", 232, 52, 60, 80)),
      tambah("turus,", teks("jt", 262, 70, "turus", 9, W.merah, { z: 4 })),
      tambah("garis", ...turus("td", 246, 82, 3, W.biru, 18, 6, 2)),
      tambah("lidi.", teks("ld", 262, 116, "lidi", 9, W.coklat, { z: 4 })),
    ),
  ],
};

/* ------------------------------ 3. Satu garis satu benda ------------------------------ */
const SUARA_G1 = "Satu garis tegak menunjukkan satu benda. Satu rebana ditulis satu garis.";
const SUARA_G2 = "Empat gendang ditulis empat garis tegak, satu garis untuk satu gendang.";
const SUARA_G3 = "Garis yang ditulis harus sama banyak dengan bendanya, tidak lebih dan tidak kurang.";

export const ADEGAN_SATU_GARIS: AdeganStory = {
  id: "satu-garis",
  judul: "Satu garis satu benda",
  sumber: "Materi: satu garis untuk satu benda",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Satu Garis, Satu Benda"), ...lantai("lt", 150), garis("g1", 48, 62, 0, 62, W.biru, 4, { z: 2 }), teks("n1", 48, 142, "1 garis", 9, W.ungu)),
      tambah("benda.", teks("sm", 88, 100, "=", 18, W.merah), ...alat("rb", 132, 94, "rebana", 2.2), teks("n2", 132, 142, "1 benda", 9, W.ungu)),
      tambah("ditulis", ...jepit("pj", 196, 60, 70, 78)),
      tambah("garis@2", ...turus("tj", 231, 80, 1, W.merah, 32, 4, 3)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Empat Gendang, Empat Garis"), ...lantai("lt", 150), teks("n4", 150, 40, "4 gendang", 10, W.ungu), ...[0, 1, 2, 3].flatMap((i) => alat(`gd${i}`, 84 + i * 44, 92, "gendang", 1.6))),
      tambah("garis", ...[0, 1, 2, 3].map((i) => garis(`gl${i}`, 84 + i * 44, 112, 0, 30, W.biru, 3.5, { z: 2 }))),
      tambah("untuk", kotak("n1-bg", 74, 155, 152, 22, W.krem, W.coklat, { rx: 6, tebal: 1, z: 4 }), teks("n1", 150, 166, "1 garis = 1 gendang", 10, W.merah, { z: 5 })),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Sama Banyak"), ...lantai("lt", 150), kotak("tg", 146, 66, 8, 84, WP.petiTua, W.coklat, { rx: 2, z: 1 }), garis("bt", 70, 70, 160, 0, W.biru, 3, { z: 2 })),
      tambah(
        "ditulis",
        garis("tl1", 80, 70, -26, 30, W.biru, 1.2),
        garis("tl2", 80, 70, 26, 30, W.biru, 1.2),
        kotak("pk", 50, 100, 60, 5, WP.kulit, W.coklat, { rx: 2, z: 2 }),
        ...[0, 1, 2, 3].flatMap((i) => alat(`gk${i}`, 59 + i * 14, 93, "gendang", 0.8)),
      ),
      tambah(
        "sama",
        garis("tr1", 220, 70, -26, 30, W.biru, 1.2),
        garis("tr2", 220, 70, 26, 30, W.biru, 1.2),
        kotak("pr", 190, 100, 60, 5, WP.kulit, W.coklat, { rx: 2, z: 2 }),
        ...[0, 1, 2, 3].map((i) => garis(`gr${i}`, 202 + i * 11, 78, 0, 20, W.biru, 3, { z: 3 })),
      ),
      tambah("bendanya,", teks("sm", 150, 56, "=", 22, W.merah)),
      tambah("lebih", teks("tl", 80, 168, "tidak lebih", 9, W.ungu)),
      tambah("kurang.", teks("tk", 220, 168, "tidak kurang", 9, W.ungu)),
    ),
  ],
};

