import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, X0, CW, emo, garisAwal, garisUjung, judul, kartu, kotak, namaH, panjangH, pusatH, satuanH, teks } from "./k1b7A-gambar";
import { geserBatang, hapus, hitungAksi, idx, k, pilihKata, sorotkan, tambah, ubah } from "./k1b7A-bantu";

export const Y1 = 76;
export const Y2 = 124;
/** Satu batang bernama: nama di kiri dan kotak satuan. */
export const batangNama = (s: string, y: number, n: number, warna: string, isi: string, x0 = X0): Obj[] => [namaH(s, y, isi), ...satuanH(s, y, n, warna, x0)];

/* ------------------------------ 1. Pita Kira dan pita Upe ------------------------------ */
const SUARA_P1 = "Hari ini Kira dan Upe memotong pita untuk hiasan. Pita Kira berwarna merah muda, pita Upe berwarna biru muda.";
const SUARA_P2 = "Kita letakkan ujung kiri kedua pita di garis awal yang sama. Dengan begitu, perbandingannya adil.";
const SUARA_P3 = "Sekarang kita hitung kotak satuan pita Kira. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan. Pita Kira panjangnya sembilan kotak.";
const SUARA_P4 = "Sekarang pita Upe. Satu, dua, tiga, empat, lima, enam. Pita Upe panjangnya enam kotak.";
const SUARA_P5 = "Pita Kira lebih panjang dari pita Upe. Sembilan kotak lebih dari enam kotak.";
const SUARA_P6 = "Pita Upe lebih pendek dari pita Kira. Ujung pita Upe tidak sampai ke ujung pita Kira.";
const SUARA_P7 = "Pita Kira lebih panjang tiga kotak dari pita Upe. Tiga kotak itu adalah lebihnya.";
export const PK = pusatH(Y1, 9);
export const PU = pusatH(Y2, 6);

export const ADEGAN_PITA: AdeganStory = {
  id: "pita-kira",
  judul: "Pita Kira dan pita Upe",
  sumber: "Materi: membandingkan dua pita",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Dua pita")),
      tambah(idx(SUARA_P1, "Kira", 2), ...batangNama("ua", Y1, 9, W.pink, "Pita Kira")),
      tambah(idx(SUARA_P1, "Upe", 2), ...batangNama("ub", Y2, 6, W.langit, "Pita Upe")),
    ),
    k(SUARA_P2, tambah("garis", ...garisAwal(54, 150))),
    k(SUARA_P3, ...hitungAksi(SUARA_P3, "ua", PK, { setelah: "Kira." }), tambah(idx(SUARA_P3, "sembilan", 2), panjangH("ua", Y1, 9, "9 kotak"))),
    k(SUARA_P4, ...hitungAksi(SUARA_P4, "ub", PU, { setelah: "Upe.", tanganAda: true }), tambah(idx(SUARA_P4, "enam", 2), panjangH("ub", Y2, 6, "6 kotak"))),
    k(SUARA_P5, hapus(0, "tg"), tambah("lebih", ...kartu("ka", 50, 162, 200, 28, W.hijauMuda, ["Pita Kira lebih panjang"], 10))),
    k(SUARA_P6, hapus(0, "ka-k", "ka-t0"), tambah("Ujung", garisUjung("uj", X0 + 9 * CW, 60, 146)), tambah("pendek", ...kartu("kb", 50, 162, 200, 28, W.merahMuda, ["Pita Upe lebih pendek"], 10))),
    k(
      SUARA_P7,
      hapus(0, "kb-k", "kb-t0"),
      ubah("tiga", ...[6, 7, 8].map((i) => ({ id: `ua${i}`, warna: W.emas }))),
      tambah("itu", ...kartu("kc", 50, 162, 200, 28, W.emas, ["lebihnya: 3 kotak"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Kata untuk membandingkan panjang ------------------------------ */
const SUARA_K1 = "Sekarang kita belajar kata untuk membandingkan panjang. Ada lebih panjang, lebih pendek, dan sama panjang.";
const SUARA_K2 = "Lebih panjang dipakai untuk benda yang ujungnya lebih jauh dari garis awal. Pita Kira lebih panjang dari pita Upe.";
const SUARA_K3 = "Lebih pendek dipakai untuk benda yang ujungnya lebih dekat dengan garis awal. Pita Upe lebih pendek dari pita Kira.";
const SUARA_K4 = "Sama panjang dipakai kalau ujung kedua benda sejajar. Stik Wei sama panjang dengan stik Halim.";
const SUARA_K5 = "Untuk tinggi, kita memakai kata lebih tinggi, lebih rendah, dan sama tinggi. Cara memakainya sama saja.";
const SUARA_K6 = "Perhatikan! Kata lebih dipakai untuk dua benda. Nanti kita juga belajar kata paling, untuk tiga benda atau lebih.";
const KARTU_KATA = [
  { id: "wa", y: 30, warna: W.hijauMuda, kata: "lebih panjang", contoh: "pita Kira lebih panjang dari pita Upe" },
  { id: "wb", y: 74, warna: W.merahMuda, kata: "lebih pendek", contoh: "pita Upe lebih pendek dari pita Kira" },
  { id: "wc", y: 118, warna: W.krem, kata: "sama panjang", contoh: "stik Wei sama panjang dengan stik Halim" },
];
const kartuKata = (i: number): Obj[] => {
  const c = KARTU_KATA[i];
  return [kotak(`${c.id}-k`, 14, c.y, 272, 38, c.warna, W.biru, { rx: 8 }), teks(`${c.id}-t`, 150, c.y + 16, c.kata, 11, W.ungu)];
};
const contohKata = (i: number): Obj => teks(`${KARTU_KATA[i].id}-e`, 150, KARTU_KATA[i].y + 30, KARTU_KATA[i].contoh, 8.8, W.biru);

export const ADEGAN_KATA: AdeganStory = {
  id: "kata-panjang",
  judul: "Kata untuk membandingkan panjang",
  sumber: "Materi: kata pembanding panjang",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Kata pembanding")), tambah(idx(SUARA_K1, "Ada"), ...kartuKata(0)), tambah(idx(SUARA_K1, "pendek"), ...kartuKata(1)), tambah(idx(SUARA_K1, "sama"), ...kartuKata(2))),
    k(SUARA_K2, sorotkan(0, "wa-k"), tambah("Pita", contohKata(0))),
    k(SUARA_K3, sorotkan(0, "wb-k"), ubah(0, { id: "wa-k", sorot: false }), tambah("Pita", contohKata(1))),
    k(SUARA_K4, sorotkan(0, "wc-k"), ubah(0, { id: "wb-k", sorot: false }), tambah("Stik", contohKata(2))),
    k(SUARA_K5, ubah(0, { id: "wc-k", sorot: false }), tambah("tinggi,", ...kartu("kt", 14, 164, 272, 30, W.langit, ["lebih tinggi, lebih rendah, sama tinggi"], 9.6))),
    k(SUARA_K6, tambah("Perhatikan!", emo("ow", 262, 152, OWL, 22)), tambah("paling,", ...kartu("kp", 14, 164, 272, 30, W.pink, ["paling: tiga benda atau lebih"], 9.6)), hapus(0, "kt-k", "kt-t0")),
  ],
};

/* ------------------------------ 3. Sama panjang ------------------------------ */
const SUARA_S1 = "Wei dan Halim membuat stik dari kotak satuan. Mereka meletakkan ujung kiri stik di garis awal yang sama.";
const SUARA_S2 = "Kita hitung stik Wei. Satu, dua, tiga, empat, lima, enam, tujuh. Panjangnya tujuh kotak.";
const SUARA_S3 = "Sekarang stik Halim. Satu, dua, tiga, empat, lima, enam, tujuh. Panjangnya juga tujuh kotak.";
const SUARA_S4 = "Ujung kedua stik sejajar. Stik Wei sama panjang dengan stik Halim. Keduanya tujuh kotak.";
const SUARA_S5 = "Sekarang pilih. Stik Wei dan stik Halim, sama panjang atau beda? Ketuk kartu yang tepat.";
const SUARA_S6 = "Betul! Stik Wei dan stik Halim sama panjang, sama-sama tujuh kotak. Hebat!";
export const PW = pusatH(Y1, 7);
export const PH = pusatH(Y2, 7);

export const ADEGAN_SAMA: AdeganStory = {
  id: "sama-panjang",
  judul: "Dua stik sama panjang",
  sumber: "Materi: sama panjang",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Dua stik")),
      tambah(idx(SUARA_S1, "membuat"), ...batangNama("ua", Y1, 7, W.hijauMuda, "Stik Wei"), ...batangNama("ub", Y2, 7, W.krem, "Stik Halim")),
      tambah("garis", ...garisAwal(54, 150)),
    ),
    k(SUARA_S2, ...hitungAksi(SUARA_S2, "ua", PW, { setelah: "Wei." }), tambah(idx(SUARA_S2, "tujuh", 2), panjangH("ua", Y1, 7, "7 kotak"))),
    k(SUARA_S3, ...hitungAksi(SUARA_S3, "ub", PH, { setelah: "Halim.", tanganAda: true }), tambah(idx(SUARA_S3, "tujuh", 2), panjangH("ub", Y2, 7, "7 kotak"))),
    k(SUARA_S4, hapus(0, "tg"), tambah("Ujung", garisUjung("uj", X0 + 7 * CW, 60, 146)), tambah("sama", ...kartu("ks", 50, 162, 200, 28, W.emas, ["sama panjang"], 11))),
    k(SUARA_S5, hapus(0, "ks-k", "ks-t0"), tambah("atau", ...pilihKata(152, ["sama panjang", "beda panjang"])), sorotkan("Ketuk", "c1-k")),
    k(SUARA_S6, tambah("Betul!", emo("ok", 150, 197, "✅", 20)), tambah("Hebat!", emo("ow", 262, 197, OWL, 20))),
  ],
};

/* ------------------------------ 4. Mulai dari garis awal yang sama ------------------------------ */
const SUARA_G1 = "Awas, jangan tertipu! Tali merah dan tali hijau kelihatan berbeda panjangnya.";
const SUARA_G2 = "Lihat ujung kirinya. Ujung kiri tali hijau tidak sejajar dengan ujung kiri tali merah. Garis awalnya berbeda.";
const SUARA_G3 = "Geser tali hijau ke kiri, sampai ujung kirinya sejajar dengan tali merah. Sekarang garis awalnya sama.";
const SUARA_G4 = "Nah, sekarang ujung kanannya bisa dibandingkan. Tali merah sama panjang dengan tali hijau. Keduanya enam kotak.";
const SUARA_G5 = "Ingat, benda yang dibandingkan harus mulai dari garis awal yang sama. Kalau tidak, hasilnya tidak adil.";

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis-awal",
  judul: "Mulai dari garis awal yang sama",
  sumber: "Materi: garis awal yang sama",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Awas, jangan tertipu!")),
      tambah("merah", ...batangNama("ua", Y1, 6, W.merahMuda, "Tali merah")),
      tambah("hijau", ...batangNama("ub", Y2, 6, W.hijauMuda, "Tali hijau", X0 + 36)),
    ),
    k(SUARA_G2, tambah("kirinya.", garisUjung("m1", X0, 56, 150, W.merah)), tambah("sejajar", garisUjung("m2", X0 + 36, 56, 150, W.merah)), tambah("berbeda.", emo("x1", 150, 176, "❌", 24))),
    k(SUARA_G3, hapus(0, "m1", "m2", "x1"), geserBatang("sampai", "ub", 6, X0), tambah("Sekarang", ...garisAwal(54, 150))),
    k(SUARA_G4, tambah("sama", garisUjung("uj", X0 + 6 * CW, 60, 146)), tambah("enam", panjangH("ua", Y1, 6, "6 kotak"), panjangH("ub", Y2, 6, "6 kotak"))),
    k(SUARA_G5, tambah("Ingat,", ...kartu("ig", 14, 156, 272, 42, W.krem, ["mulai dari garis awal", "yang sama"], 10.4)), tambah("tidak", emo("ow", 262, 150, OWL, 20))),
  ],
};
