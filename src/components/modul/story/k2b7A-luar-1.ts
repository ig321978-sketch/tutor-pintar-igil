import type { AdeganStory, Obj } from "./logika-story";
import { E, W, batangPuluh, benda, bingkai, bulat, busur, emo, garis, judul, kartu, kotak, kotakSatuan, lantai, teks, tokoh } from "./k2b7A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b7A-bantu";

/*
 * Cerita orisinal IGIL "Botol Pak Ujang" (Kelas 2 Bab 7 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b7a.md. Bagian ini: pembuka (tiga kartu lipat petugas), Ten Frame (Bingkai Sepuluh), dan terapannya.
 */

export const NAMA_METODE = ["Ten Frame", "Skip Counting", "Base Ten Blocks"] as const;
export const NAMA_METODE_ID = ["Bingkai Sepuluh", "Hitung Loncat", "Balok Puluhan"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di balik tumpukan karung, Nia menemukan tiga kartu lipat milik petugas bank sampah zaman dulu.";
const SUARA_O2 = "Pak Ujang tersenyum. Itu cara petugas menghitung barang dengan cepat dan tepat!";
const SUARA_O3 = "Tiga cara itu: Ten Frame, Skip Counting, dan Base Ten Blocks.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Bingkai Sepuluh, Hitung Loncat, dan Balok Puluhan.";

const karung = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 34, 30, "#D6B98C", W.coklat, { rx: 8, tebal: 1.8, z: 1 }),
  kotak(`${id}-s`, x + 11, y - 4, 12, 8, "#B08D57", W.coklat, { rx: 3, tebal: 1.4, z: 2 }),
];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu lipat petugas",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kartu Tua Petugas"), ...lantai("lt", 150), ...karung("kg1", 150, 120), ...karung("kg2", 186, 120)),
      tambah("Nia", ...tokoh("ni", 60, 184, "Nia")),
      tambah("tiga", teks("n3", 240, 60, "3 kartu", 10, W.ungu)),
      tambah("kartu", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 214 + i * 24, 70 + (i % 2) * 8, 30, 36, KUNING_KARTU, ["kartu"], 6))),
    ),
    k(
      SUARA_O2,
      tambah("Pak", ...tokoh("pu", 270, 184, "Pak Ujang")),
      ubah("tersenyum.", { id: "pu", isi: E.senyum }),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("barang", ...[0, 1, 2].flatMap((i) => benda(`bb${i}`, 110 + i * 14, 150, "botol"))),
      tambah("tepat!", emo("ok", 100, 104, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Petugas")),
      tambah("Tiga", teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Ten", teks("m0", 140, 76, "1. Ten Frame", 13, W.biru), ...bingkai("ib", 20, 62, 4, 8)),
      tambah("Skip", teks("m1", 140, 126, "2. Skip Counting", 13, W.biru), busur("ia", 20, 38, 134, 9), busur("ic", 38, 56, 134, 9), garis("il", 18, 134, 40, 0, W.biru, 1.6)),
      tambah("Base", teks("m2", 140, 176, "3. Base Ten Blocks", 13, W.biru), ...batangPuluh("ip", 24, 190, 8, 2.8), kotakSatuan("iq", 40, 190, 7)),
    ),
    k(
      SUARA_O4,
      tambah("Bingkai", teks("g0", 245, 96, "Bingkai Sepuluh", 10, W.ungu)),
      tambah("Hitung", teks("g1", 245, 146, "Hitung Loncat", 10, W.ungu)),
      tambah("Balok", teks("g2", 245, 194, "Balok Puluhan", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Ten Frame: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Ten Frame, atau Bingkai Sepuluh.";
const SUARA_C2 = "Bingkai itu punya sepuluh kotak, dua baris dengan lima kotak di tiap baris.";
const SUARA_C3 = "Isi satu kotak dengan satu benda. Bingkai yang penuh berarti sepuluh, yaitu satu puluhan.";
const SUARA_C4 = "Kotak yang tidak penuh kita hitung sebagai satuan.";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame: Bingkai Sepuluh",
  sumber: "Metode global: Ten Frame (konsep)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Ten Frame")),
      tambah("Ten", ...bingkai("bf", 80, 64, 0, 28)),
      tambah("Bingkai", teks("nm", 150, 160, "Bingkai Sepuluh", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      tambah("sepuluh", teks("n10", 150, 46, "10 kotak", 11, W.ungu)),
      tambah("dua", teks("n2", 54, 106, "2 baris", 9, W.merah), garis("br", 76, 92, -2, 0, W.merah, 2)),
      tambah("lima", teks("n5", 150, 136, "5 kotak", 9, W.merah), garis("bl", 80, 126, 140, 0, W.merah, 2)),
    ),
    k(
      SUARA_C3,
      hapus(0, "nm", "n10", "n2", "br", "n5", "bl"),
      tambah("satu", teks("t1", 150, 46, "1 kotak = 1 benda", 10, W.ungu), ...[0, 1, 2, 3, 4].map((i) => bulat(`bf-d${i}`, 94 + i * 28, 78, 9, "#F59E0B", "#92400E", { tebal: 1.2, z: 2 }))),
      tambah("penuh", ...[5, 6, 7, 8, 9].map((i) => bulat(`bf-d${i}`, 94 + (i - 5) * 28, 106, 9, "#F59E0B", "#92400E", { tebal: 1.2, z: 2 }))),
      tambah("yaitu", teks("t2", 150, 150, "penuh = 10 = 1 puluhan", 11, W.hijau), emo("ok", 262, 90, E.benar, 22)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Kotak yang Tidak Penuh"), ...bingkai("bs", 80, 70, 4, 28)),
      tambah("tidak", teks("kl", 150, 52, "belum penuh", 10, W.merah)),
      tambah("satuan.", teks("st", 150, 160, "dihitung satuan", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ Ten Frame: terapan ------------------------------ */
const SUARA_T1 = "Chacha mengisi bingkai dengan kaleng. Ada tiga bingkai penuh dan empat kaleng di bingkai berikutnya.";
const SUARA_T2 = "Tiga puluhan dan empat satuan, jadi ada tiga puluh empat kaleng. Hasilnya langsung terlihat.";
const SUARA_T3 = "Cocok kalau bendanya tidak terlalu banyak dan kita ingin menghitung tanpa lupa.";
const SUARA_T4 = "Kurang cocok kalau bendanya sangat banyak, karena butuh banyak sekali bingkai.";

const KALENG_DOT = "#FCA5A5";
const bingkaiKecil = (id: string, x: number, y: number, n: number): Obj[] => bingkai(id, x, y, n, 10, KALENG_DOT);

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame: bingkai kaleng Chacha",
  sumber: "Metode global: Ten Frame (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bingkai Kaleng"), ...lantai("lt", 150), ...tokoh("ch", 30, 184, "Chacha")),
      tambah("mengisi", ...bingkaiKecil("f0", 70, 80, 10)),
      tambah("tiga", ...bingkaiKecil("f1", 130, 80, 10), ...bingkaiKecil("f2", 190, 80, 10), teks("n3", 130, 62, "3 penuh", 10, W.ungu)),
      tambah("empat", ...bingkaiKecil("f3", 70, 116, 4), teks("n4", 95, 150, "4 kaleng", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("puluhan", teks("p3", 230, 94, "3 puluhan", 10, W.merah)),
      tambah("satuan,", teks("p4", 230, 114, "4 satuan", 10, W.merah)),
      tambah("tiga@2", teks("p34", 230, 142, "34 kaleng", 12, W.hijau)),
      tambah("terlihat.", emo("ok", 268, 70, E.benar, 22)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...bingkaiKecil("g1", 70, 100, 10)),
      tambah("Cocok", emo("ok", 262, 70, E.benar, 28)),
      tambah("tidak", ...kartu("cc", 50, 34, 200, 24, W.hijauMuda, ["benda tidak terlalu banyak"], 9)),
      tambah("menghitung", ...bingkaiKecil("g2", 130, 100, 7), emo("pk", 220, 130, E.senyum, 22)),
      tambah("lupa.", teks("lp", 150, 168, "tanpa lupa", 11, W.hijau)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 270, 46, E.salah, 28)),
      tambah("banyak", ...[0, 1, 2, 3, 4, 5, 6, 7].flatMap((i) => bingkai(`h${i}`, 20 + (i % 4) * 68, 64 + Math.floor(i / 4) * 34, 10, 10, KALENG_DOT))),
      tambah("butuh", emo("tq", 150, 150, E.tanya, 22)),
      tambah("bingkai.", teks("bn", 150, 190, "terlalu banyak bingkai", 10, W.merah)),
    ),
  ],
};

