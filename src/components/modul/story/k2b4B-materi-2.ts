import type { AdeganStory } from "./logika-story";
import { E, M, W, bintang, bulat, dKurung, emo, idRantai, judul, kartu, kotak, kurung, lantai, lengkung, manik, rantai, teks, tokoh } from "./k2b4B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b4B-bantu";

/*
 * Cerita orisinal IGIL "Pita Hias Bu Mira" (Kelas 2 Bab 4 Sub-Bab B, pola), akhir cerita Pameran Kerajinan Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b4b.md. Bagian ini: cari satuan pola, pola bentuk dan warna, dan bukan pola.
 */

/* ------------------------------ 4. Cari satuan ------------------------------ */
const SUARA_4A = "Dika mengajarkan caranya. Cari dulu susunan yang muncul lagi dari awal.";
const SUARA_4B = "Itu satuan polanya. Lanjutkan dengan urutan yang sama, lalu periksa dari awal.";
const SUARA_4C = "Manik biru dipasang, dan pita jingga, jingga, biru pun tersambung rapi.";
const J8 = [M.jingga, M.jingga, M.biru, M.jingga, M.jingga, M.biru, M.jingga, M.jingga];
const XR = (i: number) => 26 + i * 29;

export const ADEGAN_CARI_SATUAN: AdeganStory = {
  id: "cari-satuan",
  judul: "Dika mencari satuan pola",
  sumber: "Materi: cari satuan dan periksa",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_4A,
      bersih(0),
      tambah(0, judul("Cari Satuan"), ...rantai("r", XR(0), 62, J8), ...tokoh("dk", 244, 156, "Dika")),
      tambah(idx(SUARA_4A, "susunan"), kurung("kr", XR(0) - 13, 78, XR(1) - XR(0) + 26)),
      ubah(idx(SUARA_4A, "muncul"), { id: "kr", d: dKurung(XR(2) - XR(0) + 26) }),
      tambah(idx(SUARA_4A, "lagi"), lengkung("lg", XR(0) - 13, 44, XR(3) - XR(0))),
      sorotkan(idx(SUARA_4A, "awal."), "r0"),
    ),
    k(
      SUARA_4B,
      sorotkan(idx(SUARA_4B, "satuan"), "kr"),
      tambah(idx(SUARA_4B, "satuan"), kotak("cat", 14, 98, 176, 60, "#FFFFFF", "#7C3AED", { rx: 6, tebal: 2, z: 0 }), teks("cl1", 102, 118, "1. Cari satuan", 9.6, W.biru, { z: 2 })),
      tambah(idx(SUARA_4B, "Lanjutkan"), teks("cl2", 102, 135, "2. Ulangi urutan", 9.6, W.biru, { z: 2 })),
      tambah(idx(SUARA_4B, "periksa"), teks("cl3", 102, 152, "3. Periksa dari awal", 9.6, W.biru, { z: 2 })),
    ),
    k(
      SUARA_4C,
      tambah(idx(SUARA_4C, "Manik"), manik("mb", 236, 126, 11, M.biru, { z: 4 })),
      ubah(idx(SUARA_4C, "dipasang,"), { id: "mb", x: XR(8), y: 62 }),
      tambah(idx(SUARA_4C, "pita"), emo("ok", XR(8), 38, E.benar, 18)),
      sorotkan(idx(SUARA_4C, "tersambung"), ...idRantai("r", 8).slice(1), "mb"),
      tambah(idx(SUARA_4C, "rapi."), emo("kl", 140, 40, E.kilau, 18)),
    ),
  ],
};

/* ------------------------------ 5. Pola bentuk dan pola warna ------------------------------ */
const SUARA_5A = "Bu Mira menunjukkan lembar hiasan berpola bentuk: bintang, bulat, bintang, bulat.";
const SUARA_5B = "Lembar lain berpola daun, daun, bunga, daun, daun, bunga.";
const SUARA_5C = "Pola bisa berasal dari bentuk atau warna. Tinggal lihat apa yang berulang dan teratur.";
const XH = (i: number) => 34 + i * 30;

export const ADEGAN_POLA_BENTUK: AdeganStory = {
  id: "pola-bentuk",
  judul: "Pola bentuk dan pola warna",
  sumber: "Materi: pola bentuk dan warna",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_5A,
      bersih(0),
      tambah(0, judul("Lembar Hiasan")),
      tambah(idx(SUARA_5A, "Bu"), ...tokoh("bm", 262, 156, "Bu Mira")),
      tambah(idx(SUARA_5A, "lembar"), kotak("lh1", 14, 28, 200, 46, "#FFFBEB", "#B45309", { rx: 6, tebal: 2, z: 0 })),
      tambah(idx(SUARA_5A, "bintang,"), bintang("s0", XH(0), 51, 11, M.kuning, { z: 2 })),
      tambah(idx(SUARA_5A, "bulat,"), bulat("s1", XH(1), 51, 9, M.biru, W.biru, { z: 2 })),
      tambah(idx(SUARA_5A, "bintang,", 2), bintang("s2", XH(2), 51, 11, M.kuning, { z: 2 })),
      tambah(idx(SUARA_5A, "bulat.", 1), bulat("s3", XH(3), 51, 9, M.biru, W.biru, { z: 2 }), ...kartu("lb1", 14, 138, 92, 24, W.krem, ["pola bentuk"], 9.6)),
    ),
    k(
      SUARA_5B,
      tambah(idx(SUARA_5B, "Lembar"), kotak("lh2", 14, 84, 200, 46, "#F0FDF4", "#15803D", { rx: 6, tebal: 2, z: 0 })),
      tambah(idx(SUARA_5B, "daun,"), emo("d0", XH(0), 114, E.daun, 20, { z: 2 })),
      tambah(idx(SUARA_5B, "daun,", 2), emo("d1", XH(1), 114, E.daun, 20, { z: 2 })),
      tambah(idx(SUARA_5B, "bunga,"), emo("d2", XH(2), 114, E.bunga, 20, { z: 2 })),
      tambah(idx(SUARA_5B, "daun,", 3), emo("d3", XH(3), 114, E.daun, 20, { z: 2 })),
      tambah(idx(SUARA_5B, "daun,", 4), emo("d4", XH(4), 114, E.daun, 20, { z: 2 })),
      tambah(idx(SUARA_5B, "bunga.", 1), emo("d5", XH(5), 114, E.bunga, 20, { z: 2 })),
    ),
    k(
      SUARA_5C,
      sorotkan(idx(SUARA_5C, "bentuk"), "lb1-k"),
      tambah(idx(SUARA_5C, "warna."), ...kartu("lb2", 112, 138, 92, 24, W.hijauMuda, ["pola warna"], 9.6)),
      tambah(idx(SUARA_5C, "berulang"), lengkung("lg0", XH(0), 100, 88), lengkung("lg1", XH(3), 100, 60)),
      tambah(idx(SUARA_5C, "teratur."), emo("ok", 230, 112, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 6. Bukan pola ------------------------------ */
const SUARA_6A = "Nia menyusun manik sesuka hati: merah, biru, biru, merah, biru, merah. Ia mengira itu pola.";
const SUARA_6B = "Bu Mira bertanya. Adakah satuan yang berulang dan teratur? Dika memeriksa dan tidak menemukannya. Ini bukan pola.";
const SUARA_6C = "Barisan yang semuanya sama juga bukan pola, karena tidak ada unsur berbeda yang diulang.";
const ACAK = [M.merah, M.biru, M.biru, M.merah, M.biru, M.merah];

export const ADEGAN_BUKAN_POLA: AdeganStory = {
  id: "bukan-pola",
  judul: "Susunan yang bukan pola",
  sumber: "Materi: bukan pola",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_6A,
      bersih(0),
      tambah(0, judul("Susunan Sesuka Hati"), lantai("lt", 150), ...tokoh("ni", 40, 164, "Nia")),
      tambah(idx(SUARA_6A, "manik"), ...rantai("a", 30, 62, ACAK, 12, 34).slice(0, 1)),
      ...ACAK.map((c, i) => tambah(5 + i, manik(`a${i}`, 30 + i * 34, 62, 12, c))),
      tambah(idx(SUARA_6A, "mengira"), emo("pk", 80, 130, E.pikiran, 18)),
      tambah(idx(SUARA_6A, "pola", 1), ...kartu("qp", 116, 104, 64, 24, W.krem, ["pola?"], 10)),
      tambah(idx(SUARA_6A, "itu"), emo("sn", 232, 126, E.senyum, 20)),
    ),
    k(
      SUARA_6B,
      hapus(0, "sn", "pk", "qp-k", "qp-t0"),
      tambah(idx(SUARA_6B, "Bu"), ...tokoh("bm", 262, 164, "Bu Mira")),
      tambah(idx(SUARA_6B, "Adakah"), emo("qm", 120, 40, E.tanya, 18)),
      tambah(idx(SUARA_6B, "Dika"), ...tokoh("dk", 160, 164, "Dika")),
      tambah(idx(SUARA_6B, "memeriksa"), emo("kc", 214, 90, E.kaca, 20)),
      tambah(idx(SUARA_6B, "tidak"), emo("no", 242, 64, E.salah, 20)),
      tambah(idx(SUARA_6B, "bukan"), ...kartu("bp", 190, 112, 100, 26, W.merahMuda, ["bukan pola"], 11)),
    ),
    k(
      SUARA_6C,
      bersih(0),
      tambah(0, judul("Semuanya Sama"), lantai("lt", 150), ...rantai("m", 30, 70, [M.merah, M.merah, M.merah, M.merah, M.merah, M.merah], 12, 34)),
      sorotkan(idx(SUARA_6C, "sama"), ...idRantai("m", 6)),
      tambah(idx(SUARA_6C, "bukan"), ...kartu("bp", 90, 112, 120, 28, W.merahMuda, ["bukan pola"], 12), emo("no", 244, 72, E.salah, 20)),
      tambah(idx(SUARA_6C, "berbeda"), manik("bx", 256, 130, 12, M.biru, { z: 4 }), teks("ub", 256, 158, "unsur berbeda", 8, W.ungu)),
      tambah(idx(SUARA_6C, "diulang."), emo("ul", 150, 44, E.ulang, 18)),
    ),
  ],
};
