import type { AdeganStory, Obj } from "./logika-story";
import { W, benda, hasil, judul, kotak, meja, pasangan, persamaan, pita, tanda, tempat, teks } from "./k2b5B-gambar";
import { hapus, idx, k, mejaSekaligus, sorotkan, tambah } from "./k2b5B-bantu";

/* ------------------------------ 12. Tabel: bagian, sisa, jenis ------------------------------ */
export const TABEL: { n: number }[] = [{ n: 4 }, { n: 6 }, { n: 7 }, { n: 10 }];
const CY_TAB = [62, 92, 122, 152];
const KOL = { n: 40, s: 120, r: 188, j: 250 };
const kepalaTabel = (): Obj[] => [
  teks("th0", KOL.n, 36, "Banyak", 9, W.ungu, { z: 3 }),
  teks("th1", KOL.s, 36, "Bagian", 9, W.ungu, { z: 3 }),
  teks("th2", KOL.r, 36, "Sisa", 9, W.ungu, { z: 3 }),
  teks("th3", KOL.j, 36, "Jenis", 9, W.ungu, { z: 3 }),
  ...CY_TAB.map((cy, r) => kotak(`tr${r}`, 8, cy - 17, 284, 28, r % 2 === 0 ? W.krem : W.hijauMuda, W.biru, { rx: 4, tebal: 1.2, z: 0 })),
];
export const selTabel = (j: number, apa: "n" | "s" | "r" | "j"): Obj => {
  const n = TABEL[j].n;
  const isi = apa === "n" ? String(n) : apa === "s" ? String(Math.floor(n / 2)) : apa === "r" ? String(n % 2) : n % 2 === 0 ? "Genap" : "Ganjil";
  return teks(`t${j + 1}-${apa}`, KOL[apa], CY_TAB[j] + 1, isi, apa === "j" ? 11 : 16, apa === "j" ? W.hijau : apa === "r" ? W.merah : W.biru, { z: 3 });
};

const SUARA_K1 = "Mari kita rangkum dalam tabel. Setiap baris memuat satu bilangan.";
const SUARA_K2 = "Baris pertama: empat. Tiap bagian dua, sisanya nol, jadi genap.";
const SUARA_K3 = "Baris kedua: enam. Tiap bagian tiga, sisanya nol, jadi genap.";
const SUARA_K4 = "Baris ketiga: tujuh. Tiap bagian tiga, sisanya satu, jadi ganjil.";
const SUARA_K5 = "Baris keempat: sepuluh. Tiap bagian lima, sisanya nol, jadi genap.";
const SUARA_K6 = "Lihat kolom sisa: bilangan genap tidak bersisa, dan bilangan ganjil selalu bersisa satu.";
const baris = (suara: string, j: number, kata: [string, string, string, string]) =>
  k(suara, tambah(idx(suara, kata[0]), selTabel(j, "n")), tambah(idx(suara, kata[1]), selTabel(j, "s")), tambah(idx(suara, kata[2]), selTabel(j, "r")), tambah(idx(suara, kata[3]), selTabel(j, "j")));

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel",
  judul: "Tabel bagian, sisa, dan jenis bilangan",
  sumber: "Materi: tabel bilangan genap dan ganjil",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Tabel bilangan")), tambah(idx(SUARA_K1, "tabel"), kepalaTabel())),
    baris(SUARA_K2, 0, ["empat", "dua", "nol", "genap"]),
    baris(SUARA_K3, 1, ["enam", "tiga", "nol", "genap"]),
    baris(SUARA_K4, 2, ["tujuh", "tiga", "satu", "ganjil"]),
    baris(SUARA_K5, 3, ["sepuluh", "lima", "nol", "genap"]),
    k(SUARA_K6, sorotkan(idx(SUARA_K6, "sisa:"), "th2", "t1-r", "t2-r", "t3-r", "t4-r")),
  ],
};

/* ------------------------------ 13. Pasangan: delapan bola ------------------------------ */
const SUARA_L1 = "Ada cara lain untuk mencari setengah, yaitu memasangkan benda berdua-berdua. Wei punya delapan bola.";
const SUARA_L2 = "Kita pasangkan bola berdua-berdua: satu pasang, dua pasang, tiga pasang, empat pasang.";
const SUARA_L3 = "Semua bola sudah berpasangan. Ada empat pasang, jadi setengah dari delapan bola adalah empat.";
const SUARA_L4 = "Setiap pasang berisi dua bola. Jadi empat pasang berisi delapan bola.";

export const ADEGAN_PASANGAN_DELAPAN: AdeganStory = {
  id: "pasangan-delapan",
  judul: "Memasangkan delapan bola",
  sumber: "Materi: setengah lewat pasangan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Pasang berdua"), meja()), mejaSekaligus(idx(SUARA_L1, "delapan"), 8, "bola")),
    k(SUARA_L2, ...[0, 1, 2, 3].map((j) => tambah(idx(SUARA_L2, "pasang", j + 1), pasangan(j, 8)))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Semua"), "ps0", "ps1", "ps2", "ps3")),
    k(SUARA_L4, tambah(idx(SUARA_L4, "Jadi"), ...pita("zz", "4 pasang = 8 bola", "#FEF08A"))),
  ],
};

/* ------------------------------ 14. Pasangan: tujuh bintang ------------------------------ */
const SUARA_M1 = "Sekarang Kira punya tujuh bintang. Kita pasangkan lagi berdua-berdua.";
const SUARA_M2 = "Satu pasang, dua pasang, tiga pasang.";
const SUARA_M3 = "Satu bintang tidak punya pasangan. Bintang itu tersisa sendirian.";
const SUARA_M4 = "Tiga pasang dan satu sisa, jadi tujuh bintang tidak punya setengah yang utuh.";

export const ADEGAN_PASANGAN_TUJUH: AdeganStory = {
  id: "pasangan-tujuh",
  judul: "Memasangkan tujuh bintang",
  sumber: "Materi: pasangan dan sisa",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Bintang Kira"), meja()), mejaSekaligus(idx(SUARA_M1, "tujuh"), 7, "bintang")),
    k(SUARA_M2, ...[0, 1, 2].map((j) => tambah(idx(SUARA_M2, "pasang", j + 1), pasangan(j, 7)))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "Satu"), "mj_6_bintang")),
    k(SUARA_M4, tambah(idx(SUARA_M4, "Tiga"), ...pita("zz", "3 pasang + 1 sisa = 7", W.merahMuda))),
  ],
};

/* ------------------------------ 15. Memeriksa dengan menggabung ------------------------------ */
const SUARA_N1 = "Cara memeriksa setengah adalah menggabungkan kedua bagian. Lihat enam ikan Halim, tiga di kiri dan tiga di kanan.";
const SUARA_N2 = "Kiri tiga ikan dan kanan tiga ikan. Kedua bagian sama banyak.";
const SUARA_N3 = "Sekarang kita gabungkan kedua bagian: tiga tambah tiga sama dengan enam.";
const SUARA_N4 = "Hasilnya enam ikan, sama dengan jumlah semula. Berarti pembagiannya benar.";
const duaBagian = (): Obj[] => [
  ...tempat("pa", "Kiri", 3),
  ...tempat("pb", "Kanan", 3),
  ...[0, 1, 2].map((i) => benda("pa", i, "ikan", 6)),
  ...[0, 1, 2].map((i) => benda("pb", i, "ikan", 6)),
  tanda(true),
];

export const ADEGAN_PERIKSA_GABUNG: AdeganStory = {
  id: "periksa-gabung",
  judul: "Memeriksa dengan menggabungkan",
  sumber: "Materi: memeriksa setengah",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Ikan Halim")), tambah(idx(SUARA_N1, "enam"), duaBagian())),
    k(SUARA_N2, sorotkan(idx(SUARA_N2, "Kiri"), "pa-jml"), sorotkan(idx(SUARA_N2, "kanan"), "pb-jml")),
    k(SUARA_N3, tambah(idx(SUARA_N3, "gabungkan"), persamaan(3, 3, 6, 70))),
    k(SUARA_N4, hapus(0, "ps-eq"), tambah(idx(SUARA_N4, "Hasilnya"), ...hasil("hs", "gabung kembali: 6 ikan"))),
  ],
};

/* ------------------------------ 16. Dari setengah kembali ke utuh ------------------------------ */
const SUARA_O1 = "Sekarang kebalikannya. Igil punya lima kartu, dan itu adalah setengah dari semua kartu.";
const SUARA_O2 = "Kita tambahkan setengah yang lain di kanan. Banyaknya sama, yaitu lima kartu juga.";
const SUARA_O3 = "Gabungkan keduanya: lima tambah lima sama dengan sepuluh. Jadi semuanya sepuluh kartu.";
const SUARA_O4 = "Kalau setengahnya lima, semuanya sepuluh. Semuanya adalah setengah ditambah setengah.";

export const ADEGAN_SETENGAH_UTUH: AdeganStory = {
  id: "setengah-utuh",
  judul: "Dari setengah kembali ke utuh",
  sumber: "Materi: dari setengah ke seluruhnya",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Kartu Igil")), tambah(0, tempat("pa", "Setengah", 5)), tambah(idx(SUARA_O1, "lima"), [0, 1, 2, 3, 4].map((i) => benda("pa", i, "kartu", 10)))),
    k(SUARA_O2, tambah(idx(SUARA_O2, "tambahkan"), tempat("pb", "Setengah", 5), [0, 1, 2, 3, 4].map((i) => benda("pb", i, "kartu", 10)))),
    k(SUARA_O3, tambah(idx(SUARA_O3, "lima"), persamaan(5, 5, 10, 70))),
    k(SUARA_O4, sorotkan(idx(SUARA_O4, "semuanya"), "ps-eq"), sorotkan(idx(SUARA_O4, "ditambah"), "pa-nm", "pb-nm")),
  ],
};
