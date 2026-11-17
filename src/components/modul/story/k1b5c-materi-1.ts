import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bungkus, emo, judul, kartu, karet, meja, orang, ikatanMini, tabel, angkaTabel, teks, rentang, type UkuranTabel } from "./k1b5c-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k1b5c-bantu";

/*
 * Cerita orisinal IGIL "Kemas Pakan dan Kantong" (Kelas 1 Bab 5 Sub-Bab C, puluhan dan satuan), lanjutan Akuarium Ikan Hias Abang.
 * Masalah: bungkus pakan dan kantong ikan berserakan, pembeli menunggu. Penyelesaian: tiap sepuluh diikat jadi satu puluhan, sisanya satuan, dicatat di tabel.
 */

/* ------------------------------ 1. Brak di meja lapak ------------------------------ */
const SUARA_B1 = "Brak! Tumpukan bungkus pakan roboh dan berhamburan di meja lapak. Kata Mamah, cepat dihitung, pembeli sudah menunggu!";
const SUARA_B2 = "Igil menghitung satu per satu, tetapi bungkusnya terus bergeser. Berkali-kali dihitung, hasilnya berbeda.";
const SUARA_B3 = "Kata Kaka, kita kemas dulu. Tiap sepuluh bungkus diikat jadi satu. Sisanya dipisah, supaya mudah dihitung.";

/** Tiga belas bungkus berserakan: [x, y, miring]. */
const BERSERAK: [number, number, number][] = [[24, 52, -18], [58, 86, 12], [40, 112, 30], [96, 48, -8], [84, 104, -25], [130, 76, 20], [150, 110, -12], [176, 50, 25], [190, 92, -30], [112, 124, 8], [20, 84, 15], [160, 70, -5], [200, 120, 18]];
/** Sepuluh bungkus rapi (lima tiap baris) di kiri, tiga sisanya terpisah di kanan. */
const RAPI = (i: number): [number, number] => (i < 10 ? [30 + (i % 5) * 20, i < 5 ? 56 : 80] : [160 + (i - 10) * 20, 84]);

export const ADEGAN_BRAK: AdeganStory = {
  id: "brak",
  judul: "Brak! Bungkus pakan berserakan",
  sumber: "Materi: bungkus pakan berserakan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bungkus pakan berserakan"), meja("mj", 6, 34, 220, 116), teks("brak", 150, 100, "Brak!", 26, W.merah)),
      tambah("bungkus", ...BERSERAK.map(([x, y, r], i) => bungkus(`bk${i}`, x, y, r))),
      sorotkan("lapak.", "mj"),
      tambah("Mamah", ...orang("mm", 262, 60, E.mamah, "Mamah")),
      tambah("pembeli", emo("pb", 262, 108, E.pembeli, 22), teks("pbn", 262, 128, "pembeli", 8, W.ungu)),
    ),
    k(
      SUARA_B2,
      hapus(0, "brak"),
      tambah("Igil", ...orang("ig", 24, 182, E.igil, "Igil")),
      tambah("satu", emo("tj", 58, 176, E.tunjuk, 18), teks("sp", 106, 180, "1 per 1", 11, W.merah)),
      ubah("bergeser", { id: "bk1", x: 66, y: 92, rot: -10 }, { id: "bk4", x: 92, y: 96, rot: 10 }, { id: "bk6", x: 154, y: 104, rot: 5 }),
      tambah("berbeda.", teks("bd", 200, 180, "hasil beda-beda", 9.4, W.ungu)),
    ),
    k(
      SUARA_B3,
      hapus(0, "sp", "tj", "bd"),
      tambah("Kaka,", ...orang("kk", 276, 182, E.kaka, "Kaka")),
      ubah("kemas", ...rentang(0, 9).map((i): Partial<Obj> & { id: string } => ({ id: `bk${i}`, x: RAPI(i)[0], y: RAPI(i)[1], rot: 0 }))),
      tambah("sepuluh", ...kartu("kt", 60, 156, 180, 26, W.krem, ["tiap 10 diikat jadi 1"], 9.4)),
      tambah("diikat", karet("kb", 26, 52, 104, 50)),
      ubah("Sisanya", ...rentang(10, 12).map((i): Partial<Obj> & { id: string } => ({ id: `bk${i}`, x: RAPI(i)[0], y: RAPI(i)[1], rot: 0 }))),
      tambah("dipisah,", teks("ss", 180, 120, "sisa", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Ikatan sembilan, lalu sepuluh ------------------------------ */
const SUARA_I1 = "Ada enam belas bungkus pakan. Igil mengikat sebagian dengan karet dan berseru, puluhan sudah jadi!";
const SUARA_I2 = "Kaka menghitung isi ikatan. Baru sembilan, kata Kaka, belum sepuluh. Igil menambah satu bungkus lagi.";
const SUARA_I3 = "Sekarang sepuluh. Sepuluh yang diikat disebut satu puluhan. Enam bungkus sisanya adalah enam satuan.";
/** Sekat ke-i ikatan: lima tiap baris. Bungkus `sb{i}` (0 sampai 8) ada dalam ikatan, `sl{i}` (0 sampai 6) lepas di kanan. */
const SLOT = (i: number): [number, number] => [24 + (i % 5) * 20, i < 5 ? 64 : 88];
const LEPAS = (i: number): [number, number] => [164 + (i % 4) * 20, 64 + Math.floor(i / 4) * 24];
const hitungan = (j: number): Obj => teks(`d${j}`, SLOT(j - 1)[0] + 7, SLOT(j - 1)[1] - 3, String(j), 7, W.merah);

export const ADEGAN_IKAT_SEPULUH: AdeganStory = {
  id: "ikat-sepuluh",
  judul: "Ikatan baru sembilan, belum sepuluh",
  sumber: "Materi: ikat sepuluh jadi satu puluhan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Mengikat sepuluh bungkus")),
      tambah("belas", teks("j16", 150, 38, "16 bungkus pakan", 10, W.ungu)),
      tambah("bungkus", ...rentang(0, 8).map((i) => bungkus(`sb${i}`, SLOT(i)[0], SLOT(i)[1])), ...rentang(0, 6).map((i) => bungkus(`sl${i}`, LEPAS(i)[0], LEPAS(i)[1]))),
      tambah("Igil", ...orang("ig", 24, 182, E.igil, "Igil")),
      tambah("karet", karet("kb2", 20, 50, 106, 60)),
      tambah("berseru,", ...kartu("sr", 50, 150, 110, 20, W.krem, ["puluhan sudah jadi!"], 8.6)),
    ),
    k(
      SUARA_I2,
      hapus(0, "sr-k", "sr-t0"),
      tambah("Kaka", ...orang("kk", 276, 182, E.kaka, "Kaka")),
      tambah("menghitung", ...rentang(1, 9).map(hitungan)),
      tambah("sembilan,", teks("b9", 200, 134, "baru 9", 10, W.merah)),
      tambah("sepuluh.", teks("b10", 200, 150, "belum 10", 10, W.ungu)),
      ubah("menambah", { id: "sl0", x: SLOT(9)[0], y: SLOT(9)[1] }),
      tambah("bungkus", teks("d10", SLOT(9)[0] + 7, SLOT(9)[1] - 3, "10", 7, W.merah)),
    ),
    k(
      SUARA_I3,
      hapus(0, "b9", "b10"),
      sorotkan(idx(SUARA_I3, "sepuluh."), "kb2"),
      tambah("puluhan.", teks("lp", 73, 126, "1 puluhan", 11, W.merah)),
      sorotkan(idx(SUARA_I3, "Enam"), ...rentang(1, 6).map((i) => `sl${i}`)),
      tambah(idx(SUARA_I3, "satuan."), teks("ls", 200, 126, "6 satuan", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Tabel di papan persediaan ------------------------------ */
const SUARA_T1 = "Abang menggambar tabel di papan persediaan. Kolom kiri puluhan, kolom kanan satuan.";
const SUARA_T2 = "Satu ikatan masuk kolom puluhan. Enam bungkus lepas masuk kolom satuan.";
const SUARA_T3 = "Angkanya satu dan enam. Dibaca enam belas, yaitu satu puluhan dan enam satuan.";
const T: UkuranTabel = { x: 40, y: 30, w: 220, hk: 24, hb: 112 };

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel",
  judul: "Tabel di papan persediaan",
  sumber: "Materi: tabel puluhan dan satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...orang("ab", 24, 182, E.abang, "Abang")),
      tambah("tabel", ...tabel("tb", T)),
      sorotkan("puluhan,", "tb-hl", "tb-bl"),
      sorotkan("satuan.", "tb-hr", "tb-br"),
    ),
    k(
      SUARA_T2,
      tambah("ikatan", ...ikatanMini("im", 68, 68), teks("l1", 95, 118, "1 ikatan", 9.4, W.ungu)),
      tambah(idx(SUARA_T2, "Enam"), ...rentang(0, 5).map((i) => bungkus(`tz${i}`, 172 + (i % 3) * 22, 64 + Math.floor(i / 3) * 26))),
      tambah(idx(SUARA_T2, "lepas"), teks("l6", 205, 118, "6 bungkus", 9.4, W.ungu)),
    ),
    k(
      SUARA_T3,
      tambah(idx(SUARA_T3, "satu"), angkaTabel("tb", T, 0, "1", 26, 152)),
      tambah(idx(SUARA_T3, "enam"), angkaTabel("tb", T, 1, "6", 26, 152)),
      tambah("Dibaca", teks("bc", 150, 188, "16 dibaca enam belas", 10, W.merah)),
    ),
  ],
};
