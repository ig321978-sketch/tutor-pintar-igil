import type { AdeganStory, Obj } from "./logika-story";
import { W, WARNA_KEPING, P, bg, garisSisi, angkaSisi, garisUrai, geser, hasilHitung, idSisi, judul, kartu, namaBangun, persegi, potong, teks, type Titik } from "./k2b3B-gambar";
import { bersih, hapus, hitungKeping, idx, k, tambah, ubah, urutBilangan } from "./k2b3B-bantu";

/** Persegi besar di tengah layar dan dua cara membaginya. */
const SQ = persegi(110, 50, 80);
const TRI_A = [P(110, 50), P(190, 50), P(190, 130)];
const TRI_B = [P(110, 50), P(190, 130), P(110, 130)];
const KIRI = geser(persegi(110, 50, 40, 80), -44);
const KANAN = geser(persegi(150, 50, 40, 80), 44);
const keping = (i: number, pts: Titik[], o: Partial<Obj> = {}): Obj => bg(`kp${i}`, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 1, ...o });

/* ------------------------------ 1. Arti mengurai ------------------------------ */
const SUARA_A1 = "Hari ini Malosi punya sebuah persegi di layar. Hitung sisinya: satu, dua, tiga, empat.";
const SUARA_A2 = "Persegi punya empat sisi. Mengurai artinya memecah satu bangun menjadi beberapa bagian.";
const SUARA_A3 = "Caranya dengan menarik garis. Igil menarik garis lurus dari pojok ke pojok.";
const SUARA_A4 = "Persegi terpisah menjadi dua bagian. Setiap bagian kita sebut keping.";
const POS_A1 = urutBilangan(SUARA_A1, 1, 4, "sisinya:");

export const ADEGAN_URAI_ARTI: AdeganStory = {
  id: "urai-arti",
  judul: "Arti mengurai: satu bangun menjadi keping",
  sumber: "Materi: arti mengurai",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Mengurai persegi")),
      tambah(idx(SUARA_A1, "persegi"), bg("ut", SQ, W.krem), namaBangun("ut", 150, 152, "persegi")),
      ...POS_A1.map((p, q) => tambah(p, garisSisi("ut", SQ, q), angkaSisi("ut", SQ, q))),
    ),
    k(SUARA_A2, hapus(idx(SUARA_A2, "Mengurai"), ...idSisi("ut", 4)), tambah(idx(SUARA_A2, "Mengurai"), ...kartu("kk", 40, 164, 220, 26, W.emas, ["mengurai: 1 bangun jadi banyak"], 9.6))),
    k(SUARA_A3, tambah(idx(SUARA_A3, "menarik", 2), garisUrai(0, SQ[0], SQ[2]))),
    k(SUARA_A4, hapus(idx(SUARA_A4, "Persegi"), "ut", "ut-nm", "ug0"), tambah(idx(SUARA_A4, "Persegi"), keping(0, TRI_A), keping(1, TRI_B)), ubah(idx(SUARA_A4, "Setiap"), { id: "kp0", x: 22 }, { id: "kp1", x: -22 }), tambah(idx(SUARA_A4, "keping."), teks("kt", 150, 152, "keping", 10, W.ungu))),
  ],
};

/* ------------------------------ 2. Garis miring: dua segitiga ------------------------------ */
const SUARA_B1 = "Sekarang Malosi menarik garis miring, dari pojok kiri atas ke pojok kanan bawah.";
const SUARA_B2 = "Garis miring membagi persegi menjadi dua keping. Kedua keping itu sama besar.";
const SUARA_B3 = "Hitung sisi keping yang pertama: satu, dua, tiga.";
const SUARA_B4 = "Keping ini punya tiga sisi. Bangun datar bersisi tiga bernama segitiga.";
const SUARA_B5 = "Hitung keping kedua: satu, dua, tiga. Tiga sisi juga, jadi segitiga. Persegi diurai menjadi dua segitiga.";
const POS_B5 = urutBilangan(SUARA_B5, 1, 3, "kedua:");
const A_TRI = geser(TRI_A, 44);
const B_TRI = geser(TRI_B, -44);
const POS_B3 = urutBilangan(SUARA_B3, 1, 3, "pertama:");

export const ADEGAN_URAI_MIRING: AdeganStory = {
  id: "urai-miring",
  judul: "Garis miring: persegi menjadi dua segitiga",
  sumber: "Materi: mengurai dengan garis miring",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Garis miring")), tambah(idx(SUARA_B1, "Sekarang"), bg("ut", SQ, W.krem)), tambah(idx(SUARA_B1, "menarik"), garisUrai(0, SQ[0], SQ[2]))),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "dua"), keping(0, TRI_A), keping(1, TRI_B)),
      hapus(idx(SUARA_B2, "Kedua"), "ut", "ug0"),
      ubah(idx(SUARA_B2, "Kedua"), { id: "kp0", x: 44 }, { id: "kp1", x: -44 }),
    ),
    k(SUARA_B3, ...POS_B3.map((p, q) => tambah(p, garisSisi("kp0", A_TRI, q), angkaSisi("kp0", A_TRI, q)))),
    k(SUARA_B4, tambah(idx(SUARA_B4, "segitiga."), namaBangun("kp0", 194, 156, "segitiga"))),
    k(
      SUARA_B5,
      ...POS_B5.map((p, q) => tambah(p, garisSisi("kp1", B_TRI, q), angkaSisi("kp1", B_TRI, q))),
      tambah(idx(SUARA_B5, "segitiga", 1), namaBangun("kp1", 106, 156, "segitiga")),
      tambah(idx(SUARA_B5, "dua", 2), hasilHitung("2 segitiga", 180)),
    ),
  ],
};

/* ------------------------------ 3. Garis tengah: dua segi empat ------------------------------ */
const SUARA_C1 = "Malosi mencoba cara lain. Sekarang garisnya lurus dari tengah atas ke tengah bawah.";
const SUARA_C2 = "Garis itu membagi persegi menjadi dua keping. Kedua keping itu juga sama besar.";
const SUARA_C3 = "Hitung sisi keping kiri: satu, dua, tiga, empat.";
const SUARA_C4 = "Keping ini punya empat sisi. Bangun datar bersisi empat bernama segi empat.";
const SUARA_C5 = "Hitung keping kanan: satu, dua, tiga, empat. Empat sisi juga, jadi segi empat. Persegi diurai menjadi dua segi empat.";
const POS_C5 = urutBilangan(SUARA_C5, 1, 4, "kanan:");
const POS_C3 = urutBilangan(SUARA_C3, 1, 4, "kiri:");

export const ADEGAN_URAI_TENGAH: AdeganStory = {
  id: "urai-tengah",
  judul: "Garis tengah: persegi menjadi dua segi empat",
  sumber: "Materi: mengurai dengan garis tengah",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Garis tengah")), tambah(idx(SUARA_C1, "Malosi"), bg("ut", SQ, W.krem)), tambah(idx(SUARA_C1, "lurus"), garisUrai(0, P(150, 50), P(150, 130)))),
    k(
      SUARA_C2,
      tambah(idx(SUARA_C2, "dua"), keping(0, persegi(110, 50, 40, 80)), keping(1, persegi(150, 50, 40, 80))),
      hapus(idx(SUARA_C2, "Kedua"), "ut", "ug0"),
      ubah(idx(SUARA_C2, "Kedua"), { id: "kp0", x: -44 }, { id: "kp1", x: 44 }),
    ),
    k(SUARA_C3, ...POS_C3.map((p, q) => tambah(p, garisSisi("kp0", KIRI, q), angkaSisi("kp0", KIRI, q)))),
    k(SUARA_C4, tambah(idx(SUARA_C4, "segi", 1), namaBangun("kp0", 86, 156, "segi empat"))),
    k(
      SUARA_C5,
      ...POS_C5.map((p, q) => tambah(p, garisSisi("kp1", KANAN, q), angkaSisi("kp1", KANAN, q))),
      tambah(idx(SUARA_C5, "segi", 1), namaBangun("kp1", 214, 156, "segi empat")),
      tambah(idx(SUARA_C5, "dua", 2), hasilHitung("2 segi empat", 180)),
    ),
  ],
};

/* ------------------------------ 4. Cara berbeda, hasil berbeda ------------------------------ */
const SUARA_D1 = "Malosi membandingkan dua cara tadi. Persegi yang sama, tetapi garisnya berbeda.";
const SUARA_D2 = "Di sebelah kiri, garisnya miring. Hasilnya dua segitiga.";
const SUARA_D3 = "Di sebelah kanan, garisnya lurus di tengah. Hasilnya dua segi empat.";
const SUARA_D4 = "Persegi sama, tetapi cara mengurainya berbeda. Hasilnya pun berbeda.";
const KIRI_SQ = persegi(40, 50, 70);
const KANAN_SQ = persegi(190, 50, 70);

export const ADEGAN_BEDA_CARA: AdeganStory = {
  id: "beda-cara",
  judul: "Cara berbeda, hasil berbeda",
  sumber: "Materi: cara mengurai memengaruhi hasil",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Dua cara mengurai")), tambah(idx(SUARA_D1, "Persegi"), bg("ua", KIRI_SQ, W.krem), bg("ub", KANAN_SQ, W.krem))),
    k(
      SUARA_D2,
      tambah(idx(SUARA_D2, "garisnya"), garisUrai(0, KIRI_SQ[0], KIRI_SQ[2])),
      tambah(idx(SUARA_D2, "Hasilnya"), keping(0, [KIRI_SQ[0], KIRI_SQ[1], KIRI_SQ[2]]), keping(1, [KIRI_SQ[0], KIRI_SQ[2], KIRI_SQ[3]])),
      tambah(idx(SUARA_D2, "segitiga."), teks("ha", 75, 150, "2 segitiga", 10, W.merah)),
    ),
    k(
      SUARA_D3,
      tambah(idx(SUARA_D3, "garisnya"), garisUrai(1, P(225, 50), P(225, 120))),
      tambah(idx(SUARA_D3, "Hasilnya"), keping(2, persegi(190, 50, 35, 70)), keping(3, persegi(225, 50, 35, 70))),
      tambah(idx(SUARA_D3, "empat."), teks("hb", 225, 150, "2 segi empat", 10, W.merah)),
    ),
    k(SUARA_D4, tambah(idx(SUARA_D4, "berbeda,"), ...kartu("bd", 40, 160, 220, 26, W.emas, ["cara beda, hasil beda"], 10.4))),
  ],
};

/* ------------------------------ 5. Dua garis pada persegi panjang ------------------------------ */
const RA = P(70, 50);
const RB = P(230, 50);
const RC = P(230, 110);
const RD = P(70, 110);
const E1 = P(130, 110);
const F1 = P(170, 110);
const E2 = P(110, 110);
const F2 = P(190, 110);
const X2 = potong(RA, F2, RB, E2);
export const PANJANG = [RA, RB, RC, RD];
export const CARA_SATU = [[RA, RD, E1], [RA, RB, F1, E1], [RB, RC, F1]];
export const CARA_DUA = [[RA, RD, E2, X2], [RA, RB, X2], [E2, F2, X2], [RB, RC, F2, X2]];

const SUARA_E1 = "Sekarang Wei punya persegi panjang. Ia menarik dua garis dari pojok atas ke bawah.";
const SUARA_E2 = "Dua garis itu membagi bangun menjadi tiga keping: satu, dua, tiga. Ada dua segitiga dan satu segi empat.";
const SUARA_E3 = "Wei mencoba dua garis yang lain. Sekarang kedua garis itu saling bersilangan.";
const SUARA_E4 = "Hasilnya empat keping: satu, dua, tiga, empat. Ada dua segitiga dan dua segi empat.";
const SUARA_E5 = "Bangun yang sama, garis yang berbeda. Cara mengurai memengaruhi hasilnya.";

export const ADEGAN_DUA_GARIS: AdeganStory = {
  id: "dua-garis",
  judul: "Dua garis pada persegi panjang",
  sumber: "Materi: dua garis, hasil berbeda",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Dua garis")),
      tambah(idx(SUARA_E1, "punya"), bg("ut", PANJANG, W.krem), namaBangun("ut", 150, 134, "persegi panjang")),
      tambah(idx(SUARA_E1, "menarik"), garisUrai(0, RA, E1)),
      tambah(idx(SUARA_E1, "bawah."), garisUrai(1, RB, F1)),
    ),
    k(SUARA_E2, tambah(idx(SUARA_E2, "tiga"), ...CARA_SATU.map((p, i) => keping(i, p))), ...hitungKeping(SUARA_E2, CARA_SATU, { setelah: "keping:" }), tambah(idx(SUARA_E2, "Ada"), hasilHitung("2 segitiga + 1 segi empat", 182, 10.4))),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Dua garis bersilangan")),
      tambah(idx(SUARA_E3, "Wei"), bg("ut", PANJANG, W.krem), namaBangun("ut", 150, 134, "persegi panjang")),
      tambah(idx(SUARA_E3, "kedua"), garisUrai(0, RA, F2), garisUrai(1, RB, E2)),
    ),
    k(SUARA_E4, tambah(idx(SUARA_E4, "Hasilnya"), ...CARA_DUA.map((p, i) => keping(i, p))), ...hitungKeping(SUARA_E4, CARA_DUA, { setelah: "keping:" }), tambah(idx(SUARA_E4, "Ada"), hasilHitung("2 segitiga + 2 segi empat", 182, 10.4))),
    k(SUARA_E5, tambah(idx(SUARA_E5, "berbeda."), ...kartu("db", 50, 148, 200, 18, W.emas, ["garis beda, hasil beda"], 9.4))),
  ],
};
