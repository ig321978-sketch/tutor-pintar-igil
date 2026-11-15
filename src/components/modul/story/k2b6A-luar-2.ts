import type { AdeganStory } from "./logika-story";
import { W, deret, idBenda, idDeret, idPenunjuk, isiSisi, kartu, kerangka, labelSisi, penunjuk, spek, teks, ubahTimbang } from "./k2b6A-gambar";
import { hapus, idKartu, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b6A-bantu";
import { kepala } from "./k2b6A-luar-1";

/** Balok mainan ke-`j` di piringan kanan saja. */
const hanya = (sp: Parameters<typeof isiSisi>[0], j: number) => isiSisi(sp, "R").filter((o) => o.id.endsWith(`-${j}`));

/* ------------------------------ 5. Satuan Tak Baku Berat: konsep ------------------------------ */
const X0 = spek(1, "timbangan", [], []);
const Xa = spek(1, "timbangan", ["kotak"], []);
const balok = (n: number) => spek(1, "timbangan", ["kotak"], n ? [["balok_mainan", n]] : []);
const SUARA_X1 = "Metode kedua bernama Satuan Tak Baku Berat. Kita memakai benda acuan, yaitu balok mainan, untuk mengukur kotak.";
const SUARA_X2 = "Langkah pertama, taruh benda yang diukur di piringan kiri. Di sini ada kotak.";
const SUARA_X3 = "Langkah kedua, taruh balok mainan satu per satu di piringan kanan. Sekarang ada dua balok mainan, dan kotak masih lebih berat dari dua balok mainan.";
const SUARA_X4 = "Langkah ketiga, tambah sampai sejajar, lalu hitung. Sekarang ada tiga balok mainan, dan kedua ujung sejajar.";
const SUARA_X5 = "Jadi kotak sama berat dengan tiga balok mainan. Itulah hasil ukur dengan satuan tidak baku.";
const BD_X = deret(["kotak", "balok_mainan"], 100, 1.3, [100, 200]);

export const ADEGAN_LUAR_SATUAN: AdeganStory = {
  id: "luar-satuan",
  judul: "Satuan Tak Baku Berat: hitung satuan",
  sumber: "Metode luar: Satuan Tak Baku Berat",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_X1, tambah(0, ...kepala(1)), tambah(idx(SUARA_X1, "balok"), BD_X[2], BD_X[3]), tambah(idx(SUARA_X1, "kotak."), BD_X[0], BD_X[1])),
    k(
      SUARA_X2,
      hapus(0, ...idDeret(["kotak", "balok_mainan"])),
      tambah(0, kerangka(X0)),
      tambah(idx(SUARA_X2, "kotak."), ...isiSisi(Xa, "L"), labelSisi(Xa, "L")),
      ubah(idx(SUARA_X2, "kotak."), ...ubahTimbang(Xa, { L: true })),
      tambah(idx(SUARA_X2, "kiri."), ...penunjuk(Xa)),
    ),
    k(
      SUARA_X3,
      tambah(idx(SUARA_X3, "balok"), ...hanya(balok(2), 1)),
      tambah(idx(SUARA_X3, "satu"), ...hanya(balok(2), 2), labelSisi(balok(2), "R")),
      ubah(idx(SUARA_X3, "satu"), ...ubahTimbang(balok(2), { L: true, R: true })),
    ),
    k(
      SUARA_X4,
      tambah(idx(SUARA_X4, "tambah"), ...hanya(balok(3), 3)),
      ubah(idx(SUARA_X4, "tambah"), ...ubahTimbang(balok(3), { L: true, R: true })),
      hapus(idx(SUARA_X4, "sejajar,"), ...idPenunjuk(Xa)),
    ),
    k(SUARA_X5, sorotkan(idx(SUARA_X5, "Jadi"), idBenda(1, "L", "kotak", 1)), tambah(idx(SUARA_X5, "Itulah"), ...kartu("xs", 30, 164, 240, 26, W.emas, ["kotak = 3 balok mainan"], 11))),
  ],
};

/* ------------------------------ 6. Satuan Tak Baku Berat: terapan ------------------------------ */
const Y0 = spek(1, "timbangan", [], []);
const Ya = spek(1, "timbangan", ["apel"], []);
const Y = spek(1, "timbangan", ["apel"], [["kelereng", 3]]);
const SUARA_Y1 = "Terapkan pada soal ini. Igil mengukur apel memakai kelereng. Apel ada di piringan kiri.";
const SUARA_Y2 = "Igil menaruh kelereng sampai sejajar. Berapa kelereng yang sama berat dengan apel? Ketuk jawaban yang tepat.";
const SUARA_Y3 = "Betul! Apel sama berat dengan tiga kelereng. Hebat!";
const SUARA_Y4 = "Kelereng itu ringan, jadi kita perlu tiga kelereng untuk menyamai satu apel.";

export const ADEGAN_LUAR_SATUAN_TERAPAN: AdeganStory = {
  id: "luar-satuan-terapan",
  judul: "Satuan Tak Baku Berat: apel Igil",
  sumber: "Metode luar: Satuan Tak Baku Berat",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, ...kepala(1), kerangka(Y0)),
      tambah(idx(SUARA_Y1, "apel."), ...isiSisi(Ya, "L")),
      ubah(idx(SUARA_Y1, "apel."), ...ubahTimbang(Ya)),
      tambah(idx(SUARA_Y1, "kiri."), ...penunjuk(Ya)),
    ),
    k(
      SUARA_Y2,
      ...[1, 2, 3].map((j) => tambah(2 + j - 1, ...hanya(Y, j))),
      ubah(idx(SUARA_Y2, "sejajar."), ...ubahTimbang(Y)),
      hapus(idx(SUARA_Y2, "sejajar."), ...idPenunjuk(Ya)),
      tambah(idx(SUARA_Y2, "Berapa"), teks("tanya", 150, 152, "berapa kelereng?", 11, W.ungu)),
      tambah(idx(SUARA_Y2, "jawaban"), ...pilihKata(160, ["dua", "tiga", "empat"], 12)),
    ),
    k(SUARA_Y3, sorotkan(idx(SUARA_Y3, "Betul!"), "c2-k")),
    k(SUARA_Y4, redamkan(0, "c2-k"), hapus(idx(SUARA_Y4, "Kelereng"), "tanya", ...idPilihan(3)), tambah(idx(SUARA_Y4, "tiga"), ...kartu("yk", 30, 164, 240, 26, W.emas, ["apel = 3 kelereng"], 11))),
  ],
};

/* ------------------------------ 7. Lebih Berat Lebih Ringan: konsep ------------------------------ */
const SUARA_Z1 = "Metode ketiga bernama Lebih Berat Lebih Ringan. Metode ini memakai kata untuk membandingkan berat.";
const SUARA_Z2 = "Untuk dua benda kita punya tiga kata. Lebih berat, lebih ringan, dan sama berat.";
const SUARA_Z3 = "Mangga lebih berat dari jeruk. Jeruk lebih ringan dari mangga. Satu kalimat bisa dibalik, dan artinya tetap sama.";
const SUARA_Z4 = "Untuk tiga benda, ada mangga, jeruk, dan pisang. Mangga paling berat dan pisang paling ringan.";
const SUARA_Z5 = "Jadi kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan membantu kita bercerita tentang berat.";
const BD_Z3 = deret(["mangga", "jeruk"], 100, 1.3, [100, 200]);
const BD_Z4 = deret(["mangga", "jeruk", "pisang"], 110, 1.2);

export const ADEGAN_LUAR_LEBIH: AdeganStory = {
  id: "luar-lebih",
  judul: "Lebih Berat Lebih Ringan: kata banding",
  sumber: "Metode luar: Lebih Berat Lebih Ringan",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_Z1, tambah(0, ...kepala(2)), tambah(idx(SUARA_Z1, "kata"), ...kartu("w1", 20, 80, 260, 44, W.emas, ["kata untuk", "membandingkan berat"], 12))),
    k(
      SUARA_Z2,
      hapus(0, ...idKartu("w1", 2)),
      tambah(idx(SUARA_Z2, "Lebih"), ...kartu("w0", 30, 60, 240, 30, W.hijauMuda, ["lebih berat"], 12)),
      tambah(idx(SUARA_Z2, "lebih", 2), ...kartu("w2", 30, 98, 240, 30, W.pink, ["lebih ringan"], 12)),
      tambah(idx(SUARA_Z2, "sama"), ...kartu("w3", 30, 136, 240, 30, W.langit, ["sama berat"], 12)),
    ),
    k(
      SUARA_Z3,
      hapus(0, ...idKartu("w0"), ...idKartu("w2"), ...idKartu("w3")),
      tambah(idx(SUARA_Z3, "Mangga"), BD_Z3[0], BD_Z3[1]),
      tambah(idx(SUARA_Z3, "jeruk."), BD_Z3[2], BD_Z3[3]),
      tambah(idx(SUARA_Z3, "dibalik,"), ...kartu("w4", 30, 150, 240, 30, W.emas, ["dibalik, artinya tetap sama"], 10)),
    ),
    k(
      SUARA_Z4,
      hapus(0, ...idDeret(["mangga", "jeruk"]), ...idKartu("w4")),
      tambah(idx(SUARA_Z4, "mangga,"), BD_Z4[0], BD_Z4[1]),
      tambah(idx(SUARA_Z4, "jeruk,"), BD_Z4[2], BD_Z4[3]),
      tambah(idx(SUARA_Z4, "pisang."), BD_Z4[4], BD_Z4[5]),
      tambah(idx(SUARA_Z4, "paling"), teks("tg1", 60, 70, "paling berat", 9, W.merah)),
      tambah(idx(SUARA_Z4, "paling", 2), teks("tg2", 240, 70, "paling ringan", 9, W.merah)),
    ),
    k(SUARA_Z5, tambah(idx(SUARA_Z5, "membantu"), ...kartu("w5", 20, 150, 260, 30, W.emas, ["kata untuk bercerita tentang berat"], 10))),
  ],
};

/* ------------------------------ 8. Lebih Berat Lebih Ringan: terapan ------------------------------ */
const BD_A = deret(["batu", "mangga", "anggur"], 100, 1.2);
const SUARA_A1 = "Terapkan pada soal ini. Kira melihat tiga benda, yaitu batu, mangga, dan anggur.";
const SUARA_A2 = "Benda mana yang paling berat? Ketuk jawaban yang tepat.";
const SUARA_A3 = "Betul! Batu paling berat. Batu lebih berat dari mangga, dan mangga lebih berat dari anggur.";
const SUARA_A4 = "Jadi anggur paling ringan. Kita bercerita memakai kata lebih berat dan paling ringan.";

export const ADEGAN_LUAR_LEBIH_TERAPAN: AdeganStory = {
  id: "luar-lebih-terapan",
  judul: "Lebih Berat Lebih Ringan: benda Kira",
  sumber: "Metode luar: Lebih Berat Lebih Ringan",
  latar: "#FAE8FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_A1, "batu,"), BD_A[0], BD_A[1]),
      tambah(idx(SUARA_A1, "mangga,"), BD_A[2], BD_A[3]),
      tambah(idx(SUARA_A1, "anggur."), BD_A[4], BD_A[5]),
    ),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Benda"), teks("tanya", 150, 140, "mana yang paling berat?", 11, W.ungu)), tambah(idx(SUARA_A2, "jawaban"), ...pilihKata(150, ["batu", "mangga", "anggur"], 12))),
    k(SUARA_A3, sorotkan(idx(SUARA_A3, "Betul!"), "c1-k"), sorotkan(idx(SUARA_A3, "Batu"), "bd-1-batu")),
    k(
      SUARA_A4,
      redamkan(0, "c1-k", "bd-1-batu"),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_A4, "Jadi"), teks("tg1", 60, 76, "paling berat", 9, W.merah)),
      tambah(idx(SUARA_A4, "anggur"), teks("tg2", 240, 76, "paling ringan", 9, W.merah)),
      sorotkan(idx(SUARA_A4, "anggur"), "bd-3-anggur"),
    ),
  ],
};
