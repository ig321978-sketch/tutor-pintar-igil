import type { AdeganStory } from "./logika-story";
import { OWL, W, bangun, bulat, emo, garis, jam, jendela, kartu, keranjang, kotak, kueLapis, lonjong, nama, piring, pintu, tangan, teks } from "./k1b4a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b4a-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b4a-luar-1";

/* ------------------------------ 1. Pilah Ciri: terapan (enam benda, dua keranjang) ------------------------------ */
const SUARA_A1 = "Terapkan pada enam benda. Ada kelereng, jendela, tenda, telur, pintu, dan irisan semangka.";
const SUARA_A2 = "Kelereng dan telur tepinya lengkung. Seret keduanya ke keranjang lengkung.";
const SUARA_A3 = "Jendela, tenda, pintu, dan irisan semangka punya sisi lurus. Seret keempatnya ke keranjang sisi lurus.";
const SUARA_A4 = "Sekarang hitung. Dua benda lengkung dan empat benda bersisi lurus. Semuanya sudah terpilah.";
const XA = [30, 75, 120, 165, 210, 255];
const NAMA_A = ["kelereng", "jendela", "tenda", "telur", "pintu", "semangka"];
const benda = (i: number) =>
  [
    bulat("p0", XA[0], 70, 11, "#F472B6", W.biru, { tebal: 2 }),
    kotak("p1", XA[1] - 13, 59, 26, 22, "#BAE6FD", W.coklat, { rx: 1, tebal: 2.4 }),
    bangun("p2", "segitiga", XA[2], 70, 28, 24, "#60A5FA"),
    lonjong("p3", XA[3], 70, 8, 11, "#FEF3C7", { garis: W.coklat }),
    kotak("p4", XA[4] - 9, 56, 18, 28, "#D97706", W.coklat, { rx: 2, tebal: 2 }),
    bangun("p5", "segitiga", XA[5], 70, 28, 24, "#F87171"),
  ][i];
const TUJUAN: { x: number; y: number }[] = [
  { x: 44, y: 128 },
  { x: 133, y: 118 },
  { x: 184, y: 128 },
  { x: 84, y: 128 },
  { x: 213, y: 114 },
  { x: 260, y: 128 },
];
const nm = (i: number) => ({ id: `pn${i}`, x: TUJUAN[i].x + (i === 1 ? 13 : i === 4 ? 9 : 0), y: 146 });

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Pilah Ciri: enam benda ke dua keranjang",
  sumber: "Metode luar: Pilah Ciri, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah("Terapkan", ...kepala(1)),
      tambah("enam", ...XA.flatMap((x, i) => [benda(i), nama(`pn${i}`, x, 94, NAMA_A[i], 7.2)])),
      tambah("benda.", ...keranjang("pk1", 14, 108, 100, 44, { z: -1 }), ...keranjang("pk2", 130, 108, 156, 44, { z: -1 })),
      tambah("kelereng,", teks("pl1", 64, 168, "Lengkung", 9.4, W.merah)),
      tambah("irisan", teks("pl2", 208, 168, "Sisi lurus", 9.4, W.merah)),
    ),
    k(
      SUARA_A2,
      tambah("Seret", tangan(XA[0], 112, "tg")),
      ubah("keranjang", { id: "p0", ...TUJUAN[0] }, nm(0), { id: "p3", ...TUJUAN[3] }, nm(3), { id: "tg", x: 64, y: 190 }),
    ),
    k(
      SUARA_A3,
      hapus(0, "tg"),
      tambah("Seret", tangan(XA[1], 112, "tg")),
      ubah("keranjang", { id: "p1", ...TUJUAN[1] }, nm(1), { id: "p2", ...TUJUAN[2] }, nm(2), { id: "p4", ...TUJUAN[4] }, nm(4), { id: "p5", ...TUJUAN[5] }, nm(5), { id: "tg", x: 208, y: 190 }),
    ),
    k(
      SUARA_A4,
      hapus(0, "tg"),
      tambah("Dua", ...kartu("sa", 14, 176, 100, 22, W.krem, ["2 benda lengkung"], 8.8)),
      tambah("empat", ...kartu("sb", 130, 176, 156, 22, W.krem, ["4 benda bersisi lurus"], 8.8)),
      sorotkan("terpilah.", "pk1", "pk2"),
    ),
  ],
};

/* ------------------------------ 2. Bentuk di Sekitar: konsep (kamar) ------------------------------ */
const SUARA_B1 = "Metode ketiga bernama Bentuk di Sekitar. Kita cari bentuk pada benda sehari-hari.";
const SUARA_B2 = "Lihat jam di dinding. Tepinya melengkung. Itu bentuk lengkung.";
const SUARA_B3 = "Lihat jendela. Empat sisi lurus dan empat sudut. Itu segi empat.";
const SUARA_B4 = "Lihat tenda mainan di lantai. Tiga sisi dan tiga sudut. Itu segitiga.";
const SUARA_B5 = "Dengan cara ini, bentuk bisa kita temukan pada benda mana saja di sekitar kita.";

export const ADEGAN_LUAR_SEKITAR: AdeganStory = {
  id: "luar-sekitar",
  judul: "Bentuk di Sekitar: cari bentuk di kamar",
  sumber: "Metode luar: Bentuk di Sekitar",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah("ketiga", ...kepala(2)),
      tambah("benda", kotak("dn", 14, 54, 272, 108, "#FEF9C3", W.coklat, { rx: 4, tebal: 2, z: -1 }), garis("lt", 14, 162, 272, 0, W.coklat, 3)),
      tambah("sehari-hari.", jam("rj", 150, 84, 16), ...jendela("rw", 66, 104, 50, 44), ...pintu("rp", 242, 112, 36, 64), bangun("rt", "segitiga", 150, 140, 46, 40, "#60A5FA")),
    ),
    k(SUARA_B2, sorotkan("Lihat", "rj"), tambah("Itu", teks("rl", 150, 184, "lengkung", 12, W.merah))),
    k(SUARA_B3, redamkan(0, "rj"), sorotkan("Lihat", "rw", "rw-x", "rw-y"), ubah("Itu", { id: "rl", isi: "segi empat" })),
    k(SUARA_B4, redamkan(0, "rw", "rw-x", "rw-y"), sorotkan("Lihat", "rt"), ubah("Itu", { id: "rl", isi: "segitiga" })),
    k(SUARA_B5, redamkan(0, "rt"), hapus(0, "rl"), sorotkan("temukan", "rj", "rw", "rw-x", "rw-y", "rt", "rp"), tambah("benda", emo("ow", 262, 184, OWL, 26))),
  ],
};

/* ------------------------------ 3. Bentuk di Sekitar: terapan (kue tradisional) ------------------------------ */
const SUARA_C1 = "Terapkan pada meja kue tradisional. Ada kue lupis, kue lapis, dan kue cucur.";
const SUARA_C2 = "Kue lupis punya tiga sisi dan tiga sudut. Ketuk kue lupis, lalu tandai segitiga.";
const SUARA_C3 = "Kue lapis punya empat sisi dan empat sudut. Ketuk kue lapis, lalu tandai segi empat.";
const SUARA_C4 = "Kue cucur tepinya bulat. Ketuk kue cucur, lalu tandai lengkung.";
const XC = [60, 150, 240];

export const ADEGAN_LUAR_SEKITAR_TERAPAN: AdeganStory = {
  id: "luar-sekitar-terapan",
  judul: "Bentuk di Sekitar: kue tradisional",
  sumber: "Metode luar: Bentuk di Sekitar, terapan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah("Terapkan", ...kepala(2)),
      tambah("lupis,", piring("pa", XC[0], 88, 27), bangun("kl", "segitiga", XC[0], 88, 38, 34, "#BBF7D0"), nama("kln", XC[0], 128, "lupis", 9)),
      tambah("lapis,", piring("pb", XC[1], 88, 27), ...kueLapis("kp", XC[1], 88, 40, 28), nama("kpn", XC[1], 128, "lapis", 9)),
      tambah("cucur.", piring("pc", XC[2], 88, 27), bulat("kc", XC[2], 88, 15, "#D97706", W.coklat, { tebal: 2 }), nama("kcn", XC[2], 128, "cucur", 9)),
    ),
    k(SUARA_C2, sorotkan("Kue", "kl"), tambah("Ketuk", tangan(XC[0], 150)), tambah("tandai", ...kartu("t1", 14, 168, 92, 24, W.pink, ["segitiga"], 9.6))),
    k(SUARA_C3, redamkan(0, "kl"), sorotkan("Kue", "kp", "kp-x"), ubah("Ketuk", { id: "tg", x: XC[1] }), tambah("tandai", ...kartu("t2", 104, 168, 92, 24, W.langit, ["segi empat"], 9.6))),
    k(SUARA_C4, redamkan(0, "kp", "kp-x"), sorotkan("Kue", "kc"), ubah("Ketuk", { id: "tg", x: XC[2] }), tambah("tandai", ...kartu("t3", 194, 168, 92, 24, W.hijauMuda, ["lengkung"], 9.6))),
  ],
};

/* ------------------------------ 4. Ringkasan tiga metode ------------------------------ */
const SUARA_Z1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_Z2 = "Kenali Bentuk: kenali bentuk dari wujudnya. Pilah Ciri: pilah benda menurut tepi lengkung atau sisi lurus.";
const SUARA_Z3 = "Bentuk di Sekitar: cari bentuk pada benda sehari-hari, seperti jam, jendela, dan tenda.";
const SUARA_Z4 = "Tiga cara ini membantu kita mengenali bentuk benda dengan cepat dan benar. Terima kasih sudah belajar.";
const DESKRIPSI = ["kenali bentuk dari wujudnya", "pilah: tepi lengkung atau sisi lurus", "cari bentuk di benda sehari-hari"];
const kartuMetode = (i: number) => [
  kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }),
  teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${i + 1}. ${NAMA_METODE_ID[i]}`, 9.6, W.biru),
];
const deskripsi = (i: number) => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, teks("rj", 150, 20, "Tiga metode dari luar", 11, W.ungu)), tambah("ringkas", ...[0, 1, 2].flatMap(kartuMetode))),
    k(SUARA_Z2, tambah(0, deskripsi(0)), tambah("Pilah", deskripsi(1))),
    k(SUARA_Z3, tambah(0, deskripsi(2)), sorotkan("Sekitar:", "rm2-k")),
    k(SUARA_Z4, bersih(0), tambah(0, teks("rj", 150, 20, "Terima kasih!", 12, W.ungu), emo("rs", 150, 110, OWL, 56)), tambah("benar.", teks("rb", 150, 170, "bentuk benda dikenali", 12, W.merah))),
  ],
};
