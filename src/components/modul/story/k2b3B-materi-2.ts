import type { AdeganStory, Obj } from "./logika-story";
import { W, WARNA_KEPING, P, angkaSisi, bg, garisSisi, hasilHitung, judul, kartu, namaBangun, type Titik } from "./k2b3B-gambar";
import { bersih, hapus, hitungKeping, idx, k, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k2b3B-bantu";

const keping = (i: number, pts: Titik[], o: Partial<Obj> = {}): Obj => bg(`kp${i}`, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 1, ...o });
const hasil = (id: string, pts: Titik[]): Obj => bg(id, pts, "none", { tebal: 2.4, z: 2 });

/* ------------------------------ 6. Menghitung keping pada perahu ------------------------------ */
export const PERAHU = [[P(100, 125), P(144, 125), P(144, 70)], [P(152, 125), P(200, 125), P(152, 85)], [P(90, 125), P(210, 125), P(190, 152), P(110, 152)]];

const SUARA_H1 = "Upe membuat perahu dari beberapa bangun datar. Mari kita hitung kepingnya.";
const SUARA_H2 = "Satu, dua, tiga. Ada tiga keping.";
const SUARA_H3 = "Dua keping punya tiga sisi. Keduanya segitiga.";
const SUARA_H4 = "Satu keping punya empat sisi. Itu segi empat.";
const SUARA_H5 = "Jadi perahu ini terdiri dari dua segitiga dan satu segi empat.";

export const ADEGAN_HITUNG_KEPING: AdeganStory = {
  id: "hitung-keping",
  judul: "Menghitung jenis keping pada perahu",
  sumber: "Materi: menghitung jenis keping",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Hitung keping")), tambah(idx(SUARA_H1, "perahu"), ...PERAHU.map((p, i) => keping(i, p)))),
    k(SUARA_H2, ...hitungKeping(SUARA_H2, PERAHU, { naik: -4 })),
    k(SUARA_H3, sorotkan(idx(SUARA_H3, "Dua"), "kp0", "kp1"), tambah(idx(SUARA_H3, "Keduanya"), hasilHitung("2 segitiga", 178))),
    k(SUARA_H4, redamkan(idx(SUARA_H4, "Satu"), "kp0", "kp1"), sorotkan(idx(SUARA_H4, "Satu"), "kp2")),
    k(SUARA_H5, redamkan(idx(SUARA_H5, "Jadi"), "kp2"), ubah(idx(SUARA_H5, "dua"), { id: "hs", isi: "2 segitiga + 1 segi empat" })),
  ],
};

/* ------------------------------ 7. Arti menyusun ------------------------------ */
const TA = [P(110, 50), P(190, 50), P(110, 130)];
const TB = [P(190, 50), P(190, 130), P(110, 130)];
const PERSEGI_HASIL = [P(110, 50), P(190, 50), P(190, 130), P(110, 130)];

const SUARA_U1 = "Tadi kita mengurai. Sekarang kita menyusun. Di layar ada dua segitiga yang sama besar.";
const SUARA_U2 = "Menyusun artinya menggabungkan beberapa bangun menjadi satu bentuk baru.";
const SUARA_U3 = "Kita geser kedua segitiga itu sampai sisi miringnya saling menempel.";
const SUARA_U4 = "Hasilnya sebuah persegi. Hitung sisinya: satu, dua, tiga, empat.";
const SUARA_U5 = "Dua segitiga menjadi satu persegi. Menyusun adalah kebalikan dari mengurai.";
const POS_U4 = urutBilangan(SUARA_U4, 1, 4, "sisinya:");

export const ADEGAN_SUSUN_ARTI: AdeganStory = {
  id: "susun-arti",
  judul: "Arti menyusun: banyak bangun menjadi satu",
  sumber: "Materi: arti menyusun",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Menyusun bangun")), tambah(idx(SUARA_U1, "dua"), keping(0, TA, { x: -52 }), keping(1, TB, { x: 52 }))),
    k(SUARA_U2, tambah(idx(SUARA_U2, "Menyusun"), ...kartu("sk", 40, 164, 220, 26, W.emas, ["menyusun: banyak jadi 1"], 9.6))),
    k(SUARA_U3, ubah(idx(SUARA_U3, "geser"), { id: "kp0", x: 0 }, { id: "kp1", x: 0 })),
    k(
      SUARA_U4,
      tambah(idx(SUARA_U4, "persegi."), hasil("ht", PERSEGI_HASIL), namaBangun("ht", 150, 156, "persegi")),
      ...POS_U4.map((p, q) => tambah(p, garisSisi("ht", PERSEGI_HASIL, q), angkaSisi("ht", PERSEGI_HASIL, q))),
    ),
    k(SUARA_U5, hapus(idx(SUARA_U5, "Dua"), "sk-k", "sk-t0"), tambah(idx(SUARA_U5, "Dua"), ...kartu("sj", 40, 164, 220, 26, W.hijauMuda, ["2 segitiga jadi 1 persegi"], 9.6))),
  ],
};

/* ------------------------------ 8. Dua segitiga, tiga bentuk ------------------------------ */
export const TIGA_CARA = [
  { a: [P(30, 60), P(70, 60), P(30, 100)], b: [P(70, 60), P(70, 100), P(30, 100)], hasil: [P(30, 60), P(70, 60), P(70, 100), P(30, 100)], nama: "persegi" },
  { a: [P(150, 100), P(190, 100), P(150, 60)], b: [P(150, 100), P(110, 100), P(150, 60)], hasil: [P(110, 100), P(190, 100), P(150, 60)], nama: "segitiga besar" },
  { a: [P(250, 60), P(290, 60), P(250, 100)], b: [P(250, 100), P(210, 100), P(250, 60)], hasil: [P(250, 60), P(290, 60), P(250, 100), P(210, 100)], nama: "segi empat miring" },
];
const figur = (n: number): Obj[] => [keping(n * 2, TIGA_CARA[n].a), keping(n * 2 + 1, TIGA_CARA[n].b), hasil(`r${"abc"[n]}`, TIGA_CARA[n].hasil), namaBangun(`r${"abc"[n]}`, [50, 150, 250][n], 120, TIGA_CARA[n].nama)];

const SUARA_G1 = "Upe punya dua segitiga yang sama besar. Ia akan menempelkan keduanya dengan tiga cara.";
const SUARA_G2 = "Cara pertama, tempelkan sisi miringnya. Hasilnya sebuah persegi.";
const SUARA_G3 = "Cara kedua, tempelkan sisi pendeknya dengan menghadap ke arah yang sama. Hasilnya segitiga yang lebih besar.";
const SUARA_G4 = "Cara ketiga, tempelkan sisi pendeknya dengan menghadap berlawanan. Hasilnya segi empat yang miring.";
const SUARA_G5 = "Dua segitiga yang sama, tiga cara menempel, tiga bentuk yang berbeda.";

export const ADEGAN_DUA_SEGITIGA: AdeganStory = {
  id: "dua-segitiga",
  judul: "Dua segitiga, tiga bentuk",
  sumber: "Materi: dua segitiga, tiga hasil",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Dua segitiga")), tambah(idx(SUARA_G1, "dua"), bg("pa", [P(100, 70), P(140, 70), P(100, 110)], WARNA_KEPING[0]), bg("pb", [P(160, 70), P(200, 70), P(160, 110)], WARNA_KEPING[1]))),
    k(SUARA_G2, hapus(0, "pa", "pb"), tambah(idx(SUARA_G2, "pertama,"), ...figur(0).slice(0, 2)), tambah(idx(SUARA_G2, "Hasilnya"), ...figur(0).slice(2))),
    k(SUARA_G3, tambah(idx(SUARA_G3, "kedua,"), ...figur(1).slice(0, 2)), tambah(idx(SUARA_G3, "Hasilnya"), ...figur(1).slice(2))),
    k(SUARA_G4, tambah(idx(SUARA_G4, "ketiga,"), ...figur(2).slice(0, 2)), tambah(idx(SUARA_G4, "Hasilnya"), ...figur(2).slice(2))),
    k(SUARA_G5, tambah(idx(SUARA_G5, "tiga", 1), ...kartu("tc", 50, 142, 200, 28, W.emas, ["2 segitiga sama, 3 bentuk"], 10))),
  ],
};

/* ------------------------------ 9. Segi enam dari tiga keping ------------------------------ */
const KOTAK_S = [P(130, 70), P(170, 70), P(170, 110), P(130, 110)];
const SEGI_KIRI = [P(130, 70), P(130, 110), P(100, 90)];
const SEGI_KANAN = [P(170, 70), P(200, 90), P(170, 110)];
export const HEKSAGON_1 = [P(100, 90), P(130, 70), P(170, 70), P(200, 90), P(170, 110), P(130, 110)];
const SEGI_ATAS = [P(130, 70), P(150, 40), P(170, 70)];
const SEGI_BAWAH = [P(130, 110), P(170, 110), P(150, 140)];
export const HEKSAGON_2 = [P(150, 40), P(170, 70), P(170, 110), P(150, 140), P(130, 110), P(130, 70)];

const SUARA_S1 = "Wei punya dua segitiga dan satu segi empat. Kita susun menjadi satu bentuk.";
const SUARA_S2 = "Segitiga pertama kita letakkan di kiri, segitiga kedua di kanan.";
const SUARA_S3 = "Hasilnya bangun dengan enam sisi: satu, dua, tiga, empat, lima, enam.";
const SUARA_S4 = "Bangun datar bersisi enam bernama segi enam.";
const SUARA_S5 = "Sekarang segitiganya kita letakkan di atas dan di bawah. Hasilnya juga segi enam, tetapi berdiri tegak.";
const POS_S3 = urutBilangan(SUARA_S3, 1, 6, "sisi:");

export const ADEGAN_SUSUN_SEGIENAM: AdeganStory = {
  id: "susun-segienam",
  judul: "Dua segitiga dan satu segi empat jadi segi enam",
  sumber: "Materi: menyusun menjadi segi enam",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Menyusun tiga keping")), tambah(idx(SUARA_S1, "satu"), keping(0, KOTAK_S), keping(1, SEGI_KIRI, { x: -46 }), keping(2, SEGI_KANAN, { x: 46 }))),
    k(SUARA_S2, ubah(idx(SUARA_S2, "kiri,"), { id: "kp1", x: 0 }), ubah(idx(SUARA_S2, "kanan."), { id: "kp2", x: 0 })),
    k(
      SUARA_S3,
      tambah(idx(SUARA_S3, "bangun"), bg("ht", HEKSAGON_1, "none", { tebal: 2.4, z: 2 })),
      ...POS_S3.map((p, q) => tambah(p, garisSisi("ht", HEKSAGON_1, q), angkaSisi("ht", HEKSAGON_1, q, 11))),
    ),
    k(SUARA_S4, tambah(idx(SUARA_S4, "segi"), namaBangun("ht", 150, 152, "segi enam"))),
    k(
      SUARA_S5,
      bersih(0),
      tambah(0, judul("Cara lain menyusun")),
      tambah(idx(SUARA_S5, "atas"), keping(0, KOTAK_S), keping(1, SEGI_ATAS), keping(2, SEGI_BAWAH)),
      tambah(idx(SUARA_S5, "segi", 1), bg("ht", HEKSAGON_2, "none", { tebal: 2.4, z: 2 }), namaBangun("ht", 150, 160, "segi enam")),
    ),
  ],
};
