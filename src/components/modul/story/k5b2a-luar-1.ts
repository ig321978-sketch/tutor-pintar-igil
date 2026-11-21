import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, busur, emo, garis, idKisi, idSel, judul, kelipatanSel, kisiMini, kotak, tabelBil, tanah, teks, tokoh } from "./k5b2a-gambar";
import { bersih, hapus, idx, k, tambah, ubah, warnai } from "./k5b2a-bantu";

/*
 * Cerita orisinal IGIL "Lonceng Bu Marni" (Kelas 5 Bab 2 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b2a.md. Bagian ini: pembuka (jadwal lonceng yang harus ditulis tanpa terlewat), Skip Counting (Lompat Hitung) dan terapannya,
 * Grid Marking (Warnai Tabel) dan terapannya.
 */

export const NAMA_METODE = ["Skip Counting", "Grid Marking", "Times Check"] as const;
export const NAMA_METODE_ID = ["Lompat Hitung", "Warnai Tabel", "Cek Kali"] as const;

export const KP = { merah: "#FCA5A5", biru: "#BAE6FD", kapur: "#FEF9C3", hijau: "#86EFAC" };
export const BAGI = "\u{2797}";

/** Kartu judul cara: papan gelap `pt`, nama Inggris `nm`, nama Indonesia `ni`, ikon `ik`. */
export const kartuCara = (suara: string, nomor: string, inggris: string, indonesia: string, ikon: string) => [
  tambah(0, judul(`Cara ${nomor}: ${inggris}`), kotak("pt", 8, 32, 284, 120, "#1E293B", "#0F172A", { rx: 6, tebal: 1.4, z: -1 })),
  tambah(idx(suara, inggris.split(" ")[0]), teks("nm", 150, 74, inggris, 14, KP.merah, { z: 3 })),
  tambah(idx(suara, indonesia.split(" ")[0]), teks("ni", 150, 96, indonesia, 10, KP.kapur, { z: 3 })),
  tambah(idx(suara, indonesia.split(" ")[1]), emo("ik", 150, 134, ikon, 24, { z: 3 })),
];

/** Garis lompat: garis dasar `${id}-g`, titik pendaratan `${id}-p{i}` (titik pertama putih: belum melompat), dan busur `${id}-b{i}` di antara titik berurutan. */
const dasarGL = (id: string, xs: number[], y: number): Obj[] => [
  garis(`${id}-g`, xs[0] - 14, y, xs[xs.length - 1] - xs[0] + 28, 0, W.coklat, 2.2),
  ...xs.map((x, i) => bulat(`${id}-p${i}`, x, y, i === 0 ? 4.5 : 4, i === 0 ? W.putih : W.merah, W.merah, { tebal: 1.8, z: 2 })),
];
const busurGL = (id: string, xs: number[], y: number): Obj[] => xs.slice(0, -1).map((x, i) => busur(`${id}-b${i}`, x, xs[i + 1], y - 4, W.hijauTua, 24));

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, lonceng Bu Marni berbunyi, dan daftar jadwalnya harus ditulis tanpa ada yang terlewat.";
const SUARA_O2 = "Ada tiga cara supaya daftar kelipatan tidak keliru dan tidak ada yang tertinggal.";
const SUARA_O3 = "Tiga cara itu: Skip Counting, Grid Marking, dan Times Check.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Lompat Hitung, Warnai Tabel, dan Cek Kali.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Jadwal Bu Marni",
  sumber: "Metode global: pembuka",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Jadwal Bu Marni"), ...tanah("tn", 150)),
      tambah("lonceng", emo("lc", 258, 100, E.lonceng, 34), kotak("tg", 256, 108, 5, 42, W.coklat, W.papan, { rx: 1, z: 0 })),
      tambah("Bu", ...tokoh("bu", 60, 184, "Bu Marni")),
      tambah("berbunyi,", teks("dg", 258, 62, "ding", 11, W.merah), emo("nd", 226, 80, E.nada, 18)),
      tambah("jadwalnya", kotak("pj", 80, 34, 120, 34, W.kapur, W.coklat, { rx: 3, tebal: 1.6, z: 1 }), teks("pjt", 140, 56, "JADWAL: ? ? ?", 11, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150)),
      tambah("tiga", teks("n3", 262, 44, "3 cara", 10, W.merah)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 20 + i * 92, 56, 80, 36, W.jingga, W.coklat, { rx: 4 }), teks(`c${i}-t`, 60 + i * 92, 79, "cara", 9, W.coklat)])),
      tambah("tidak", emo("x1", 60, 128, E.salah, 18), emo("x2", 240, 128, E.salah, 18)),
      tambah("tertinggal.", emo("ok", 150, 128, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      tambah("Skip", teks("m0", 120, 118, "1. Skip Counting", 10, W.hijauTua), emo("i0", 40, 118, E.jejak, 16)),
      tambah("Grid", teks("m1", 120, 138, "2. Grid Marking", 10, W.hijauTua), emo("i1", 40, 138, E.warna, 16)),
      tambah("Times", teks("m2", 120, 158, "3. Times Check", 10, W.hijauTua), emo("i2", 40, 158, BAGI, 16)),
    ),
    k(
      SUARA_O4,
      hapus(0, "x1", "x2", "ok"),
      tambah("Nama", kotak("bk", 190, 100, 104, 70, "#14532D", W.putih, { rx: 6, tebal: 1, z: -1 })),
      tambah("Lompat", teks("g0", 242, 118, "Lompat Hitung", 8.4, W.sorot)),
      tambah("Warnai", teks("g1", 242, 138, "Warnai Tabel", 8.4, W.sorot)),
      tambah("Cek", teks("g2", 242, 158, "Cek Kali", 9, W.sorot)),
    ),
  ],
};

/* ------------------------------ Skip Counting: konsep ------------------------------ */
const SUARA_L1 = "Cara pertama, Skip Counting, atau Lompat Hitung.";
const SUARA_L2 = "Kita melompat dengan jarak yang sama, dan tiap pendaratan adalah satu kelipatan.";
const SUARA_L3 = "Lompatan pertama mendarat di bilangan itu sendiri, lalu tiap lompatan menambah bilangan yang sama.";
const SUARA_L4 = "Nol tidak termasuk, karena kita belum melompat sama sekali.";
const XL = [40, 100, 160, 220];

export const ADEGAN_LUAR_LOMPAT: AdeganStory = {
  id: "luar-lompat",
  judul: "Skip Counting: Lompat",
  sumber: "Metode global: Skip Counting (konsep)",
  latar: W.malam,
  ketukan: [
    k(SUARA_L1, ...kartuCara(SUARA_L1, "1", "Skip Counting", "Lompat Hitung", E.jejak)),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Jarak yang Sama"), ...tanah("tn", 150), ...dasarGL("gl", XL, 110)),
      tambah("melompat", ...busurGL("gl", XL, 110)),
      tambah("jarak", teks("js", 130, 60, "jarak sama", 11, W.hijauTua)),
      tambah("pendaratan", ...[1, 2, 3].map((i) => emo(`bl${i}`, XL[i], 98, E.lonceng, 18, { z: 3 }))),
      tambah("kelipatan.", teks("kp", 130, 142, "pendaratan = kelipatan", 10, W.merah)),
    ),
    k(
      SUARA_L3,
      hapus(0, "kp"),
      tambah("pertama", teks("e1", XL[1], 134, "4", 12, W.merah)),
      tambah("menambah", teks("e2", XL[2], 134, "8", 12, W.merah), teks("e3", XL[3], 134, "12", 12, W.merah)),
      tambah("sama.", ...[0, 1, 2].map((i) => teks(`a${i}`, (XL[i] + XL[i + 1]) / 2, 78, "+4", 10, W.hijauTua))),
    ),
    k(
      SUARA_L4,
      tambah("Nol", teks("z0", XL[0], 134, "0", 12, W.merah), emo("zx", XL[0], 98, E.salah, 18)),
      tambah("belum", teks("bm", 130, 156, "belum melompat", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Skip Counting: terapan ------------------------------ */
const SUARA_M1 = "Bima melompat dengan jarak empat: empat, delapan, dua belas, enam belas, dua puluh.";
const SUARA_M2 = "Bima berhenti saat jadwal Bu Marni sudah cukup panjang.";
const SUARA_M3 = "Cocok untuk daftar yang pendek dan berurutan, karena tinggal menambah bilangan yang sama.";
const SUARA_M4 = "Kurang cocok untuk bilangan yang jauh, karena kita harus melompat dari awal.";
const XM = [24, 74, 124, 174, 224, 274];

export const ADEGAN_LUAR_LOMPAT_TERAPAN: AdeganStory = {
  id: "luar-lompat-terapan",
  judul: "Lompat: kapan cocok",
  sumber: "Metode global: Skip Counting (terapan)",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Lompat Jarak Empat"), ...tanah("tn", 150), ...dasarGL("gm", XM, 104)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("jarak", ...busurGL("gm", XM, 104)),
      tambah(idx(SUARA_M1, "empat", 1), teks("jr", 150, 56, "jarak 4", 11, W.merah)),
      tambah(idx(SUARA_M1, "empat", 2), teks("v1", XM[1], 130, "4", 12, W.merah)),
      tambah("delapan", teks("v2", XM[2], 130, "8", 12, W.merah)),
      tambah(idx(SUARA_M1, "dua", 1), teks("v3", XM[3], 130, "12", 12, W.merah)),
      tambah("enam", teks("v4", XM[4], 130, "16", 12, W.merah)),
      tambah(idx(SUARA_M1, "dua", 2), teks("v5", XM[5], 130, "20", 12, W.merah)),
    ),
    k(
      SUARA_M2,
      tambah("berhenti", emo("st", XM[5], 84, E.henti, 24)),
      tambah("jadwal", teks("jb", 150, 80, "jadwal Bu Marni", 9.5, W.coklat)),
      tambah("cukup", teks("cp", 150, 156, "cukup panjang", 10, W.hijauTua)),
    ),
    k(
      SUARA_M3,
      hapus(0, "st", "jb", "cp", "jr"),
      tambah("Cocok", emo("ok", 262, 156, E.benar, 22)),
      tambah("pendek", teks("dp", 150, 60, "daftar pendek dan berurutan", 10, W.hijauTua)),
      tambah("menambah", teks("mb", 150, 156, "tinggal tambah 4", 10, W.hijauTua)),
    ),
    k(
      SUARA_M4,
      hapus(0, "ok", "dp", "mb"),
      tambah("Kurang", emo("xs", 262, 156, E.salah, 22)),
      tambah("jauh,", teks("jh", 150, 60, "bilangan jauh: 96?", 10, W.merah)),
      tambah("awal.", teks("aw", 150, 156, "melompat dari 0 lagi", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Grid Marking: konsep ------------------------------ */
const SUARA_T1 = "Cara kedua, Grid Marking, atau Warnai Tabel.";
const SUARA_T2 = "Kita menulis bilangan satu sampai seratus dalam tabel, lalu mewarnai tiap kelipatan.";
const SUARA_T3 = "Kotak berwarna menunjukkan semua kelipatan sekaligus, sehingga tidak ada yang tertinggal.";
const SUARA_T4 = "Kita juga bisa melihat bilangan mana yang jatuh di luar warna.";

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Grid Marking: Tabel",
  sumber: "Metode global: Grid Marking (konsep)",
  latar: W.malam,
  ketukan: [
    k(SUARA_T1, ...kartuCara(SUARA_T1, "2", "Grid Marking", "Warnai Tabel", E.warna)),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Satu sampai Seratus")),
      tambah("menulis", ...kisiMini("km", 40, 30)),
      tambah("seratus", teks("lb", 150, 172, "1 sampai 100", 11, W.coklat)),
      warnai("mewarnai", W.jingga, ...idKisi("km", 5, 10)),
    ),
    k(
      SUARA_T3,
      warnai("berwarna", W.jingga, ...idKisi("km", ...kelipatanSel(5, 100))),
      ubah("semua", { id: "lb", isi: "kelipatan 5 berwarna" }),
      tambah("tertinggal.", emo("ok", 262, 172, E.benar, 20)),
    ),
    k(
      SUARA_T4,
      ubah("melihat", { id: "km-m14", garis: W.merah, tebal: 2.6, warna: "#E0F2FE" }),
      tambah("luar", teks("lw", 150, 192, "14 di luar warna", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Grid Marking: terapan ------------------------------ */
const SUARA_U1 = "Citra mewarnai kelipatan tujuh pada tabel: tujuh, empat belas, dua puluh satu, dua puluh delapan.";
const SUARA_U2 = "Ia terus sampai sembilan puluh delapan, dan tidak ada kelipatan yang terlewat.";
const SUARA_U3 = "Cocok untuk daftar panjang sampai seratus, karena semua kelipatan terlihat bersama.";
const SUARA_U4 = "Kurang cocok untuk bilangan yang lebih besar dari tabel, karena tabelnya tidak cukup.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Warnai: kapan cocok",
  sumber: "Metode global: Grid Marking (terapan)",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Kelipatan Tujuh"), ...tanah("tn", 150)),
      tambah("Citra", ...tokoh("ct", 40, 184, "Citra")),
      tambah("mewarnai", kotak("pn", 12, 22, 276, 116, "#A16207", W.papan, { rx: 5, tebal: 2, z: -1 })),
      tambah("tabel:", ...tabelBil("tb", 50)),
      warnai(idx(SUARA_U1, "tujuh", 2), W.jingga, ...idSel("tb", 7)),
      warnai(idx(SUARA_U1, "empat"), W.jingga, ...idSel("tb", 14)),
      warnai(idx(SUARA_U1, "dua", 1), W.jingga, ...idSel("tb", 21)),
      warnai(idx(SUARA_U1, "dua", 2), W.jingga, ...idSel("tb", 28)),
    ),
    k(
      SUARA_U2,
      warnai("terus", W.jingga, ...idSel("tb", 35, 42, 49)),
      tambah("sembilan", teks("sp", 190, 154, "terus sampai 98", 10, W.merah)),
      tambah("terlewat.", emo("ok", 262, 154, E.benar, 18)),
    ),
    k(
      SUARA_U3,
      hapus(0, "ok"),
      tambah("Cocok", emo("ok2", 262, 154, E.benar, 22)),
      ubah("seratus,", { id: "sp", isi: "daftar sampai 100", warna: W.hijauTua }),
    ),
    k(
      SUARA_U4,
      hapus(0, "ok2"),
      tambah("Kurang", emo("xs", 262, 154, E.salah, 22)),
      ubah("tabel,", { id: "sp", isi: "tabel habis di 50", warna: W.merah }),
    ),
  ],
};
