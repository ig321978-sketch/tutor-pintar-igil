import type { AdeganStory } from "./logika-story";
import { E, W, deret, emo, garis, judul, kotak, papanData, tanah, teks, tokoh } from "./k4b6a-gambar";
import { KP } from "./k4b6a-luar-1";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k4b6a-bantu";

/*
 * Cerita orisinal IGIL "Piktogram Jajanan Bu Rini" (Kelas 4 Bab 6 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b6a.md. Bagian ini: Table to Picture (Tabel ke Gambar), Rank and Compare (Urutkan dan Banding), terapannya, dan ringkasan.
 */

const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ Table to Picture: konsep ------------------------------ */
const SUARA_B1 = "Cara kedua, Table to Picture, atau Tabel ke Gambar.";
const SUARA_B2 = "Kita mulai dari tabel data, lalu memilih keterangan yang membuat ikon tidak terlalu banyak.";
const SUARA_B3 = "Banyak data dibagi dengan keterangan, dan hasilnya adalah banyak ikon yang digambar.";
const SUARA_B4 = "Setiap jenis data mendapat satu baris, dan ikonnya digambar berderet dengan jarak sama.";

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Table to Picture: Tabel ke Gambar",
  sumber: "Metode global: Table to Picture (konsep)",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 2: Table to Picture"), ...papanData("pt", 8, 28, 284, 132)),
      tambah("Table", teks("nm", 150, 62, "Table to Picture", 13, KP.merah, { z: 3 })),
      tambah("Tabel", teks("ni", 150, 82, "Tabel ke Gambar", 10, KP.kapur, { z: 3 })),
      tambah("Gambar.", emo("ik", 150, 128, E.catat, 24, { z: 3 })),
    ),
    k(
      SUARA_B2,
      hapus(0, "nm", "ni", "ik"),
      tambah("tabel", kotak("tb", 30, 44, 110, 70, undefined, KP.kapur, { rx: 2, tebal: 1.4, z: 3 }), teks("tb1", 85, 62, "tabel data", 9, KP.kapur, { z: 3 })),
      tambah("keterangan", teks("kt", 220, 62, "1 ikon = ?", 10, KP.merah, { z: 3 })),
      tambah("terlalu", teks("tl", 220, 90, "ikon jangan terlalu banyak", 7.4, KP.biru, { z: 3 })),
    ),
    k(
      SUARA_B3,
      hapus(0, "tb", "tb1", "kt", "tl"),
      tambah("Banyak", teks("e1", 150, 60, "banyak data", 10, KP.biru, { z: 3 })),
      tambah("dibagi", teks("e2", 150, 78, "÷ keterangan", 11, KP.merah, { z: 3 })),
      tambah("hasilnya", teks("e3", 150, 100, "= banyak ikon", 10, KP.kapur, { z: 3 })),
      tambah("digambar.", ...deret("d", 90, 138, E.pisang, 4, 24, 16)),
    ),
    k(
      SUARA_B4,
      hapus(0, "e1", "e2", "e3", ...idDeret("d", 4)),
      tambah("jenis", teks("jb", 225, 42, "1 jenis = 1 baris", 8, KP.merah, { z: 3 }), teks("j1", 40, 62, "risoles", 8, KP.kapur, { z: 3 }), teks("j2", 40, 92, "lemper", 8, KP.kapur, { z: 3 }), teks("j3", 40, 122, "pisang", 8, KP.kapur, { z: 3 })),
      tambah("baris,", ...deret("a", 90, 62, E.risoles, 4, 24, 16), ...deret("b", 90, 92, E.lemper, 2, 24, 16), ...deret("c", 90, 122, E.pisang, 3, 24, 16)),
      tambah("jarak", garis("jr", 90, 140, 24, 0, KP.merah, 2, { z: 3 }), teks("js", 102, 152, "jarak sama", 8, KP.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Table to Picture: terapan ------------------------------ */
const SUARA_X1 = "Genta mendapat tabel: bakso empat puluh porsi, soto tiga puluh, dan mie dua puluh, dengan satu ikon sama dengan sepuluh porsi.";
const SUARA_X2 = "Empat puluh dibagi sepuluh sama dengan empat, jadi bakso digambar dengan empat ikon.";
const SUARA_X3 = "Cocok untuk menyajikan tabel menjadi gambar, karena data besar menjadi deretan ikon yang ringkas.";
const SUARA_X4 = "Kurang cocok kalau keterangannya terlalu kecil, karena ikonnya jadi terlalu banyak.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Tabel ke Gambar: kapan cocok",
  sumber: "Metode global: Table to Picture (terapan)",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Tabel Genta"), ...papanData("pt", 8, 28, 284, 124), ...tokoh("ge", 40, 184, "Genta")),
      tambah("bakso", teks("t1", 80, 62, "bakso: 40 porsi", 9, KP.kapur, { z: 3 })),
      tambah("soto", teks("t2", 80, 82, "soto: 30 porsi", 9, KP.kapur, { z: 3 })),
      tambah("mie", teks("t3", 80, 102, "mie: 20 porsi", 9, KP.kapur, { z: 3 })),
      tambah("ikon", kotak("kt", 160, 54, 120, 22, W.krem, W.coklat, { rx: 3, tebal: 1.4, z: 3 }), teks("kt1", 220, 69, "1 ikon = 10 porsi", 8.4, W.merah, { z: 4 })),
    ),
    k(
      SUARA_X2,
      hapus(0, "t2", "t3"),
      tambah("Empat", teks("dv", 220, 100, "40 : 10 = 4", 11, KP.biru, { z: 3 })),
      tambah("bakso", ...deret("bk", 40, 128, E.bakso, 4, 26, 18)),
      tambah("ikon.", teks("i4", 190, 128, "4 ikon", 10, KP.kapur, { z: 3 })),
    ),
    k(
      SUARA_X3,
      hapus(0, "dv", "i4", "kt", "kt1", "t1", ...idDeret("bk", 4)),
      tambah("Cocok", emo("ok", 270, 56, E.benar, 22, { z: 3 })),
      tambah("besar", teks("bs", 150, 60, "data besar", 10, KP.biru, { z: 3 })),
      tambah("ringkas.", ...deret("rg", 80, 110, E.bakso, 4, 26, 18), teks("rk", 150, 140, "ringkas", 9, KP.kapur, { z: 3 })),
    ),
    k(
      SUARA_X4,
      hapus(0, "ok", "bs", "rk", ...idDeret("rg", 4)),
      tambah("Kurang", emo("xs", 270, 56, E.salah, 22, { z: 3 })),
      tambah("kecil,", teks("kc", 150, 62, "1 ikon = 1 porsi", 10, KP.merah, { z: 3 })),
      tambah("banyak.", ...Array.from({ length: 24 }, (_, i) => kotak(`ky${i}`, 30 + (i % 12) * 21, 84 + Math.floor(i / 12) * 22, 14, 14, "#FCD34D", W.coklat, { rx: 7, tebal: 0.8, z: 3 })), teks("kb", 150, 144, "ikonnya terlalu banyak", 8.4, KP.kapur, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Rank and Compare: konsep ------------------------------ */
const SUARA_U1 = "Cara ketiga, Rank and Compare, atau Urutkan dan Banding.";
const SUARA_U2 = "Kita menyusun jenis data dari ikon yang paling banyak sampai yang paling sedikit.";
const SUARA_U3 = "Dengan urutan itu, yang paling banyak dan yang paling sedikit langsung tampak.";
const SUARA_U4 = "Selisih dua jenis dicari dengan mengurangkan ikonnya, lalu mengalikannya dengan keterangan.";

export const ADEGAN_LUAR_URUT: AdeganStory = {
  id: "luar-urut",
  judul: "Rank and Compare: Banding",
  sumber: "Metode global: Rank and Compare (konsep)",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Cara 3: Rank and Compare"), ...papanData("pt", 8, 28, 284, 132)),
      tambah("Rank", teks("nm", 150, 62, "Rank and Compare", 13, KP.merah, { z: 3 })),
      tambah("Urutkan", teks("ni", 150, 82, "Urutkan dan Banding", 10, KP.kapur, { z: 3 })),
      tambah("Banding.", emo("ik", 150, 128, E.bintang, 24, { z: 3 })),
    ),
    k(
      SUARA_U2,
      hapus(0, "nm", "ni", "ik"),
      tambah("menyusun", teks("a1", 50, 62, "A", 10, KP.kapur, { z: 3 }), ...deret("u1", 80, 62, E.risoles, 5, 22, 15)),
      tambah("banyak", teks("a2", 50, 90, "B", 10, KP.kapur, { z: 3 }), ...deret("u2", 80, 90, E.pisang, 3, 22, 15)),
      tambah("sedikit.", teks("a3", 50, 118, "C", 10, KP.kapur, { z: 3 }), ...deret("u3", 80, 118, E.lemper, 1, 22, 15)),
    ),
    k(
      SUARA_U3,
      tambah("urutan", teks("ur", 230, 62, "urut", 9, KP.biru, { z: 3 })),
      sorotkan("banyak", "u10", "u11", "u12", "u13", "u14"),
      sorotkan("sedikit", "u30"),
      tambah("tampak.", emo("ok", 262, 118, E.benar, 20, { z: 3 })),
    ),
    k(
      SUARA_U4,
      hapus(0, "ur", "ok", "a1", "a2", "a3", ...idDeret("u1", 5), ...idDeret("u2", 3), ...idDeret("u3", 1)),
      tambah("Selisih", teks("s1", 150, 62, "selisih 2 jenis: ikon banyak − ikon sedikit", 8, KP.biru, { z: 3 })),
      tambah("mengurangkan", teks("s2", 150, 90, "= selisih ikon", 10, KP.kapur, { z: 3 })),
      tambah("mengalikannya", teks("s3", 150, 118, "× keterangan", 10, KP.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Rank and Compare: terapan ------------------------------ */
const SUARA_Y1 = "Satria mengurutkan bakso, soto, dan mie dari ikon yang paling banyak.";
const SUARA_Y2 = "Bakso empat ikon dan mie dua ikon, selisihnya dua ikon, yaitu dua puluh porsi.";
const SUARA_Y3 = "Cocok untuk mencari yang paling laris dan selisihnya, karena urutannya sudah jelas.";
const SUARA_Y4 = "Kurang cocok kalau dua piktogram memakai keterangan berbeda, karena ikonnya tidak bisa dibandingkan langsung.";

export const ADEGAN_LUAR_URUT_TERAPAN: AdeganStory = {
  id: "luar-urut-terapan",
  judul: "Urutkan dan Banding: kapan cocok",
  sumber: "Metode global: Rank and Compare (terapan)",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Satria Mengurutkan"), ...papanData("pt", 8, 28, 284, 124), ...tokoh("sa", 40, 184, "Satria")),
      tambah("bakso,", teks("n1", 70, 62, "bakso", 8, KP.kapur, { z: 3 })),
      tambah("soto,", teks("n2", 70, 86, "soto", 8, KP.kapur, { z: 3 })),
      tambah("mie", teks("n3", 70, 110, "mie", 8, KP.kapur, { z: 3 })),
      tambah("ikon", ...deret("y1", 110, 62, E.bakso, 4, 22, 15), ...deret("y2", 110, 86, E.soto, 3, 22, 15), ...deret("y3", 110, 110, E.mie, 2, 22, 15)),
    ),
    k(
      SUARA_Y2,
      sorotkan("Bakso", "y10", "y11", "y12", "y13"),
      sorotkan("mie", "y30", "y31"),
      tambah("selisihnya", teks("d1", 150, 134, "4 − 2 = 2 ikon", 10, KP.biru, { z: 3 })),
      tambah("yaitu", teks("d2", 240, 134, "2 × 10 = 20", 10, KP.kapur, { z: 3 })),
    ),
    k(
      SUARA_Y3,
      hapus(0, "d1", "d2"),
      redamkan(0, "y10", "y11", "y12", "y13", "y30", "y31"),
      tambah("Cocok", emo("ok", 270, 56, E.benar, 22, { z: 3 })),
      tambah("laris", teks("lr", 230, 86, "paling laris", 8.4, KP.merah, { z: 3 })),
      tambah("jelas.", teks("jl", 150, 144, "urutan jelas", 9, KP.kapur, { z: 3 })),
    ),
    k(
      SUARA_Y4,
      hapus(0, "ok", "lr", "jl", "y10", "y11", "y12", "y13", "y20", "y21", "y22", "y30", "y31", "n1", "n2", "n3"),
      tambah("Kurang", emo("xs", 270, 56, E.salah, 22, { z: 3 })),
      tambah("keterangan", teks("k1", 100, 62, "1 ikon = 10", 9, KP.biru, { z: 3 }), teks("k2", 100, 98, "1 ikon = 5", 9, KP.merah, { z: 3 }), teks("k3", 150, 144, "2 piktogram", 9, KP.kapur, { z: 3 })),
      tambah("langsung.", ...deret("z1", 160, 62, E.bakso, 3, 22, 15), ...deret("z2", 160, 98, E.soto, 3, 22, 15)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Rini. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin membaca piktogram yang sudah jadi, pakai Hitung Ikon. Ingin menggambar dari tabel, pakai Tabel ke Gambar.";
const SUARA_R3 = "Ingin mencari yang paling laris dan selisihnya, pakai Urutkan dan Banding. Apa pun caranya, baca keterangan lebih dulu.";
const SUARA_R4 = "Menurutmu, untuk membandingkan dua papan dengan keterangan berbeda, cara mana yang paling pas?";
const KARTU = ["Hitung Ikon", "Tabel ke Gambar", "Urutkan dan Banding"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Memilih cara yang pas",
  sumber: "Metode global: ringkasan",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150), teks("n3", 262, 44, "3 cara", 10, W.merah)),
      tambah("Tiga", ...KARTU.flatMap((n, i) => [kotak(`r${i}-k`, 8 + i * 98, 60, 88, 40, "#14532D", W.putih, { rx: 6, tebal: 1.4 }), teks(`r${i}-t`, 52 + i * 98, 84, n, i === 2 ? 7 : 8.4, W.sorot, { z: 2 })])),
      tambah("Bu", ...tokoh("br", 150, 184, "Bu Rini")),
    ),
    k(
      SUARA_R2,
      sorotkan("Hitung", "r0-k"),
      tambah("Hitung", emo("ok1", 52, 118, E.benar, 20)),
      redamkan("Tabel", "r0-k"),
      sorotkan("Tabel", "r1-k"),
      tambah("Tabel", emo("ok2", 150, 118, E.benar, 20)),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r1-k"),
      hapus(0, "ok1", "ok2"),
      sorotkan("Urutkan", "r2-k"),
      tambah("Urutkan", emo("ok3", 248, 118, E.benar, 20)),
      tambah("baca", teks("ps", 150, 138, "baca keterangan lebih dulu", 8.4, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih Cara yang Pas"), ...tanah("tn", 150), ...tokoh("br", 150, 184, "Bu Rini")),
      tambah("dua", ...deret("p1", 60, 80, E.bakso, 3, 20, 16), teks("t1", 80, 100, "1 ikon = 10", 8.4, W.coklat)),
      tambah("keterangan", ...deret("p2", 190, 80, E.soto, 3, 20, 16), teks("t2", 210, 100, "1 ikon = 5", 8.4, W.coklat), teks("t3", 150, 128, "2 papan", 9, W.coklat)),
      tambah("pas?", teks("tq", 150, 60, "?", 26, W.merah), emo("i1", 252, 150, E.catat, 16), emo("i2", 272, 150, E.bintang, 16)),
    ),
  ],
};
