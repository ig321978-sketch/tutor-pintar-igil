import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kartu, kotak, lantai, teks, tokoh } from "./k5b2c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b2c-bantu";

/*
 * Cerita orisinal IGIL "Klepon Bu Wati" (Kelas 5 Bab 2 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b2c.md. Bagian ini: Pair Up (Pasangkan), Divide Check (Cek Bagi), terapannya, dan ringkasan.
 */

/** Kartu bilangan 1, 2, 3, 4, 6, 12 berderet (id `${id}0` sampai `${id}5`) dan kurung pasangannya (garis `${id}b0` sampai `${id}b2`, `${id}s...`). */
const BARIS12 = [1, 2, 3, 4, 6, 12];
const xK = (i: number): number => 12 + i * 46;
const kartuBaris = (id: string, y: number) => BARIS12.flatMap((f, i) => kartu(`${id}${i}`, xK(i), y, i === 5 ? 44 : 40, 36, i % 2 === 0 ? W.daun : W.kapur, String(f), 14));
const kurung = (id: string, yKartu: number) =>
  [0, 1, 2].flatMap((i) => {
    const yLine = yKartu + 46 + i * 9;
    const x1 = xK(i) + 20;
    const x2 = xK(5 - i) + 20;
    return [garis(`${id}b${i}`, x1, yLine, x2 - x1, 0, W.merah, 1.6, { z: 2 }), garis(`${id}s${i}a`, x1, yKartu + 36, 0, yLine - yKartu - 36, W.merah, 1.6, { z: 2 }), garis(`${id}s${i}b`, x2, yKartu + 36, 0, yLine - yKartu - 36, W.merah, 1.6, { z: 2 })];
  });

/* ------------------------------ Pair Up: konsep ------------------------------ */
const SUARA_Q1 = "Cara kedua, Pair Up, atau Pasangkan.";
const SUARA_Q2 = "Kita menulis satu dan bilangan itu sebagai pasangan pertama, lalu mencari pasangan berikutnya.";
const SUARA_Q3 = "Dua bilangan yang dikali menghasilkan bilangan itu adalah satu pasangan faktor.";
const SUARA_Q4 = "Kita berhenti ketika pasangannya bertemu di tengah, karena sesudah itu pasangannya hanya berulang.";

export const ADEGAN_LUAR_PASANG: AdeganStory = {
  id: "luar-pasang",
  judul: "Pair Up: Pasangkan",
  sumber: "Metode global: Pair Up (konsep)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Cara 2"), ...lantai("lt", 150), emo("rt", 150, 138, E.rantai, 36, { z: 3 })),
      tambah("Pair", teks("m1", 150, 60, "Pair Up", 14, W.merah, { z: 3 })),
      tambah("Pasangkan", teks("m2", 150, 84, "Pasangkan", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_Q2,
      bersih(0),
      tambah(0, judul("Pasangan pertama"), ...lantai("lt", 150)),
      tambah("satu", ...kartu("qa", 60, 46, 60, 34, W.daun, "1", 16)),
      tambah("bilangan", ...kartu("qb", 180, 46, 60, 34, W.kapur, "n", 16)),
      tambah("pertama", garis("ql", 120, 63, 60, 0, W.merah, 2.4, { z: 2 }), teks("pp", 150, 100, "pasangan pertama", 11, W.coklat, { z: 3 })),
      tambah("berikutnya", ...kartu("qc", 60, 116, 60, 28, W.putih, "?", 16), ...kartu("qd", 180, 116, 60, 28, W.putih, "?", 16)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Satu pasangan faktor"), ...lantai("lt", 150), teks("d2", 150, 40, "2 bilangan", 13, W.merah, { z: 3 }), ...kartu("xa", 60, 56, 60, 34, W.daun, "a", 16), ...kartu("xb", 180, 56, 60, 34, W.kapur, "b", 16)),
      tambah("dikali", teks("xk", 150, 78, "x", 16, W.biru, { z: 3 })),
      tambah("menghasilkan", teks("xe", 150, 116, "a x b = n", 15, W.biru, { z: 3 })),
      tambah("satu", teks("s1", 150, 142, "1 pasangan faktor", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Berhenti di tengah"), ...lantai("lt", 150), ...kartuBaris("z", 56)),
      tambah("pasangannya", ...kurung("z", 56)),
      sorotkan("tengah", "z2-k", "z3-k"),
      tambah("tengah", teks("tg", 150, 148, "bertemu di tengah", 10, W.merah, { z: 3 })),
      tambah("berulang", teks("bu", 150, 172, "sesudahnya berulang", 9, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Pair Up: terapan ------------------------------ */
const SUARA_R1 = "Citra mencari faktor tiga puluh enam: satu dan tiga puluh enam, dua dan delapan belas.";
const SUARA_R2 = "Lalu tiga dan dua belas, empat dan sembilan, serta enam dan enam.";
const SUARA_R3 = "Cocok untuk bilangan sedang, karena tiap pasangan memberi dua faktor sekaligus.";
const SUARA_R4 = "Kurang cocok kalau kita lupa satu pasangan, karena faktornya ikut hilang.";

const PASANGAN36: [number, number][] = [
  [1, 36],
  [2, 18],
  [3, 12],
  [4, 9],
  [6, 6],
];
const yP = (i: number): number => 48 + i * 30;
const barisPasang = (i: number) => [...kartu(`r${i}a`, 100, yP(i), 40, 22, W.daun, String(PASANGAN36[i][0]), 11), ...kartu(`r${i}b`, 148, yP(i), 44, 22, W.kapur, String(PASANGAN36[i][1]), 11)];

export const ADEGAN_LUAR_PASANG_TERAPAN: AdeganStory = {
  id: "luar-pasang-terapan",
  judul: "Pair Up: kapan cocok",
  sumber: "Metode global: Pair Up (terapan)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Pair Up: kapan cocok"), ...lantai("lt", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("tiga", teks("ft", 190, 34, "faktor 36", 12, W.merah, { z: 3 })),
      tambah("satu", ...barisPasang(0)),
      tambah("dua", ...barisPasang(1)),
    ),
    k(
      SUARA_R2,
      tambah("tiga", ...barisPasang(2)),
      tambah("empat", ...barisPasang(3)),
      tambah("enam", ...barisPasang(4)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Cocok: bilangan sedang"), ...lantai("lt", 150), emo("ok", 266, 90, E.benar, 28, { z: 3 })),
      tambah("pasangan", ...kartu("sa", 96, 70, 40, 30, W.daun, "a", 13), ...kartu("sb", 156, 70, 40, 30, W.kapur, "b", 13)),
      tambah("dua", teks("s2", 146, 124, "2 faktor sekaligus", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Lupa satu pasangan"), ...lantai("lt", 150), emo("xx", 266, 90, E.salah, 28, { z: 3 })),
      tambah("satu", teks("l1", 150, 50, "lupa 1 pasangan", 12, W.merah, { z: 3 })),
      tambah("faktornya", ...kartu("ua", 96, 70, 40, 30, W.putih, "?", 16), ...kartu("ub", 156, 70, 40, 30, W.putih, "?", 16)),
      tambah("hilang", teks("hl", 146, 124, "faktor ikut hilang", 11, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Divide Check: konsep ------------------------------ */
const SUARA_S1 = "Cara ketiga, Divide Check, atau Cek Bagi.";
const SUARA_S2 = "Kita membagi bilangan itu dengan satu bilangan percobaan, lalu melihat sisanya.";
const SUARA_S3 = "Kalau sisanya nol, bilangan percobaan itu adalah faktor.";
const SUARA_S4 = "Kalau bersisa, bilangan percobaan itu bukan faktor.";

export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Divide Check: Cek Bagi",
  sumber: "Metode global: Divide Check (konsep)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 3"), ...lantai("lt", 150), emo("cr", 150, 138, E.cari, 36, { z: 3 })),
      tambah("Divide", teks("m1", 150, 60, "Divide Check", 14, W.merah, { z: 3 })),
      tambah("Cek", teks("m2", 150, 84, "Cek Bagi", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Bagi dan lihat sisa"), ...lantai("lt", 150), teks("bg", 150, 60, "n : x", 18, W.biru, { z: 3 })),
      tambah("satu", teks("sp", 150, 90, "1 bilangan percobaan", 11, W.coklat, { z: 3 })),
      tambah("sisanya", teks("sq", 150, 124, "sisa = ?", 14, W.merah, { z: 3 })),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Sisa nol: faktor"), ...lantai("lt", 150)),
      tambah("sisanya", teks("s0", 150, 60, "sisa 0", 18, W.biru, { z: 3 })),
      tambah("faktor", teks("ff", 150, 100, "faktor", 16, W.hijauTua, { z: 3 }), emo("ok", 150, 136, E.benar, 30, { z: 3 })),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Ada sisa: bukan faktor"), ...lantai("lt", 150)),
      tambah("bersisa", teks("s1", 150, 60, "ada sisa", 18, W.merah, { z: 3 })),
      tambah("bukan", teks("bf", 150, 100, "bukan faktor", 16, W.coklat, { z: 3 }), emo("xx", 150, 136, E.salah, 30, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Divide Check: terapan ------------------------------ */
const SUARA_U1 = "Fajar memeriksa apakah tujuh faktor dua puluh delapan.";
const SUARA_U2 = "Bima membagi dua puluh delapan dengan tujuh, dan hasilnya empat tanpa sisa.";
const SUARA_U3 = "Cocok untuk memeriksa satu bilangan percobaan, karena jawabannya langsung terlihat.";
const SUARA_U4 = "Kurang cocok untuk mencari semua faktor, karena kita harus memeriksa bilangan satu per satu, dan itu memakan waktu.";

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Cek Bagi: kapan cocok",
  sumber: "Metode global: Divide Check (terapan)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Cek Bagi: kapan cocok"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("apakah", kotak("bb", 84, 40, 196, 56, W.putih, W.biru, { rx: 10, tebal: 1.6, z: 1 })),
      tambah("tujuh", teks("qf", 182, 74, "Apakah 7 faktor 28?", 12, W.biru, { z: 3 })),
      tambah("delapan", emo("qq", 262, 118, E.tanya, 20, { z: 3 })),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Bima membagi"), ...lantai("lt", 150), ...tokoh("bm", 268, 184, "Bima"), teks("hb", 150, 50, "28 : 7", 18, W.biru, { z: 3 })),
      ubah("hasilnya", { id: "hb", isi: "28 : 7 = 4" }),
      tambah("tanpa", teks("ts", 150, 84, "sisa 0", 14, W.merah, { z: 3 }), emo("ok", 150, 120, E.benar, 26, { z: 3 })),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Cocok: cek satu bilangan"), ...lantai("lt", 150), emo("ok", 266, 90, E.benar, 28, { z: 3 })),
      tambah("satu", teks("c1", 150, 60, "1 bilangan percobaan", 12, W.biru, { z: 3 })),
      tambah("jawabannya", teks("jw", 150, 100, "jawaban langsung terlihat", 10, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, judul("Kurang cocok: banyak cek"), ...lantai("lt", 150), emo("xx", 266, 60, E.salah, 28, { z: 3 })),
      tambah("mencari", teks("r1", 150, 56, "cek 1, cek 2, cek 3, ...", 11, W.biru, { z: 3 })),
      tambah("memeriksa", teks("r2", 150, 86, "satu per satu", 11, W.coklat, { z: 3 })),
      tambah("waktu", emo("jm", 150, 126, E.jam, 30, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_V1 = "Tiga cara sudah kita pelajari bersama Bu Wati, dan masing-masing punya saat yang tepat.";
const SUARA_V2 = "Melihat gambar faktor, pakai Potong dan Hitung. Mencari semua faktor, pakai Pasangkan. Memeriksa satu bilangan, pakai Cek Bagi.";
const SUARA_V3 = "Apa pun caranya, satu dan bilangan itu sendiri selalu termasuk faktor.";
const SUARA_V4 = "Menurutmu, untuk mencari semua faktor dari empat puluh delapan, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Tiga cara, tiga saat",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Tiga cara, tiga saat"), ...lantai("lt", 150), ...tokoh("bw", 40, 184, "Bu Wati"), teks("n3", 190, 34, "3 cara", 13, W.merah, { z: 3 })),
      tambah("pelajari", ...kartu("c0", 78, 52, 66, 40, W.daun, "Potong", 9), ...kartu("c1", 152, 52, 66, 40, W.langit, "Pasangkan", 9), ...kartu("c2", 226, 52, 66, 40, W.pink, "Cek Bagi", 9)),
      tambah("saat", emo("e0", 111, 116, E.gunting, 22, { z: 3 }), emo("e1", 185, 116, E.rantai, 22, { z: 3 }), emo("e2", 259, 116, E.cari, 22, { z: 3 })),
    ),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Cara yang tepat"), ...lantai("lt", 150), teks("v1", 140, 56, "melihat gambar: Potong dan Hitung", 10, W.biru, { z: 3 })),
      tambah("Potong", emo("g1", 270, 52, E.gunting, 20, { z: 3 })),
      tambah("Mencari", teks("v2", 140, 92, "mencari semua faktor: Pasangkan", 10, W.hijauTua, { z: 3 })),
      tambah("Pasangkan", emo("g2", 270, 88, E.rantai, 20, { z: 3 })),
      tambah("Memeriksa", teks("v3", 140, 128, "memeriksa 1 bilangan: Cek Bagi", 10, W.coklat, { z: 3 })),
      tambah("Cek", emo("g3", 270, 124, E.cari, 20, { z: 3 })),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Selalu faktor"), ...lantai("lt", 150)),
      tambah("satu", teks("a1", 150, 60, "1 dan bilangan itu", 13, W.biru, { z: 3 })),
      tambah("selalu", emo("bt", 150, 106, E.bintang, 34, { z: 3 })),
      tambah("faktor", teks("sf", 150, 140, "selalu faktor", 14, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Giliranmu"), ...lantai("lt", 150)),
      tambah("mencari", teks("q48", 150, 52, "faktor 48?", 18, W.merah, { z: 3 })),
      tambah("cara", ...kartu("d0", 20, 76, 80, 36, W.daun, "Potong", 11), ...kartu("d1", 110, 76, 80, 36, W.langit, "Pasangkan", 11), ...kartu("d2", 200, 76, 80, 36, W.pink, "Cek Bagi", 11)),
      tambah("cepat", teks("qq", 150, 140, "cara mana?", 12, W.biru, { z: 3 }), emo("pk", 150, 172, E.tanya, 20, { z: 3 })),
    ),
  ],
};
