import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, WARNA_KEPING, P, angkaKeping, angkaSisi, bg, emo, garisSisi, garisUrai, hasilHitung, judul, kartu, namaBangun, persegi, teks, type Titik } from "./k2b3B-gambar";
import { hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k2b3B-bantu";

export const NAMA_METODE_ID = ["Susun Bangun", "Urai Bangun", "Tangram"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama kecil di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 20, 288, 14, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.2);

const keping = (i: number, pts: Titik[], o: Partial<Obj> = {}): Obj => bg(`kp${i}`, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 1, ...o });
const hasil = (id: string, pts: Titik[]): Obj => bg(id, pts, "none", { tebal: 2.4, z: 2 });

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan bangun datar dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Susun Bangun, Urai Bangun, dan Tangram.";
const SUARA_O3 = "Susun Bangun menggabungkan bangun kecil menjadi bangun besar. Urai Bangun memecah satu bangun menjadi beberapa bagian.";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk dan memilih jawaban dengan teliti.";
const SUARA_O5 = "Siap? Ayo kita mulai dengan metode pertama, yaitu Susun Bangun.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk bangun datar",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      { at: 0, bersih: true },
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Susun"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Urai"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Tangram."), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      { at: 0, bersih: true },
      tambah(0, judul("Gabung dan pecah")),
      tambah(idx(SUARA_O3, "Susun"), ...kartu("g0", 20, 46, 260, 44, WARNA_METODE[0], ["Susun Bangun", "gabung bangun kecil jadi besar"], 10)),
      tambah(idx(SUARA_O3, "Urai"), ...kartu("g1", 20, 104, 260, 44, WARNA_METODE[1], ["Urai Bangun", "pecah bangun menjadi bagian"], 10)),
    ),
    k(
      SUARA_O4,
      { at: 0, bersih: true },
      tambah(0, judul("Alat bantu hari ini")),
      tambah("gambar", bg("ua", persegi(60, 54, 40), W.krem), bg("ub", [P(150, 94), P(190, 94), P(150, 54)], W.pink), bg("uc", [P(220, 94), P(260, 94), P(240, 54)], W.langit)),
      tambah("mengetuk", emo("tg", 150, 150, "\u{1F446}", 26)),
    ),
    k(
      SUARA_O5,
      { at: 0, bersih: true },
      tambah(0, judul("Metode pertama")),
      tambah("Siap?", ...kartu("pm", 30, 60, 240, 44, WARNA_METODE[0], [NAMA_METODE_ID[0]], 14)),
      tambah("yaitu", emo("ow", 150, 150, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Susun Bangun: empat persegi kecil ------------------------------ */
export const EMPAT_KECIL = [persegi(120, 52, 30), persegi(150, 52, 30), persegi(120, 82, 30), persegi(150, 82, 30)];
export const PERSEGI_BESAR = persegi(120, 52, 60);
const GESER_EMPAT = [
  [-40, -8],
  [40, -8],
  [-40, 8],
  [40, 8],
];

const SUARA_N1 = "Metode pertama bernama Susun Bangun. Kita menggabungkan bangun kecil menjadi bangun besar.";
const SUARA_N2 = "Ada empat persegi kecil yang sama besar. Hitung: satu, dua, tiga, empat.";
const SUARA_N3 = "Kita rapatkan keempat persegi itu sampai sisinya saling menempel.";
const SUARA_N4 = "Hasilnya sebuah persegi yang lebih besar. Bangun kecil menjadi bangun besar.";
const SUARA_N5 = "Cara ini berguna untuk membuat bentuk baru dari bangun yang sudah ada.";
const POS_N2 = urutBilangan(SUARA_N2, 1, 4, "Hitung:");

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Susun Bangun: empat persegi menjadi satu",
  sumber: "Metode luar: Susun Bangun",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_N1, tambah(0, ...kepala(0)), tambah(idx(SUARA_N1, "kecil"), ...EMPAT_KECIL.map((p, i) => keping(i, p, { x: GESER_EMPAT[i][0], y: GESER_EMPAT[i][1] })))),
    k(SUARA_N2, ...POS_N2.map((p, q) => tambah(p, angkaKeping(q, geserTitik(EMPAT_KECIL[q], GESER_EMPAT[q]), String(q + 1), 9)))),
    k(SUARA_N3, ...EMPAT_KECIL.map((_, i) => ubah(idx(SUARA_N3, "rapatkan"), { id: `kp${i}`, x: 0, y: 0 })), ...EMPAT_KECIL.map((p, i) => ubah(idx(SUARA_N3, "rapatkan"), { id: `kn${i}`, x: angkaKeping(i, p).x, y: angkaKeping(i, p).y }))),
    k(SUARA_N4, tambah(idx(SUARA_N4, "persegi"), hasil("ht", PERSEGI_BESAR), namaBangun("ht", 150, 134, "persegi besar")), tambah(idx(SUARA_N4, "menjadi"), teks("hs", 150, 156, "4 persegi kecil, 1 persegi besar", 10, W.merah))),
    k(SUARA_N5, tambah(idx(SUARA_N5, "berguna"), ...kartu("sg", 40, 166, 220, 24, W.emas, ["bangun kecil jadi besar"], 10.4))),
  ],
};
function geserTitik(pts: Titik[], d: number[]): Titik[] {
  return pts.map((p) => P(p.x + d[0], p.y + d[1]));
}

/* ------------------------------ 3. Susun Bangun: rumah dari dua keping ------------------------------ */
export const RUMAH_BADAN = [P(130, 80), P(170, 80), P(170, 120), P(130, 120)];
export const RUMAH_ATAP = [P(130, 80), P(150, 56), P(170, 80)];
export const RUMAH_HASIL = [P(130, 120), P(130, 80), P(150, 56), P(170, 80), P(170, 120)];
const SUARA_T1 = "Coba lagi. Kita punya satu persegi dan satu segitiga.";
const SUARA_T2 = "Letakkan segitiga di atas persegi, dengan sisi yang sama panjang saling menempel.";
const SUARA_T3 = "Sekarang giliranmu. Bangun yang jadi punya berapa sisi? Ketuk jawabannya.";
const SUARA_T4 = "Betul, lima sisi! Persegi dan segitiga menjadi segi lima, seperti bentuk rumah.";
const SUARA_T5 = "Hitung sisinya: satu, dua, tiga, empat, lima.";
const POS_T5 = urutBilangan(SUARA_T5, 1, 5, "sisinya:");

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Susun Bangun: persegi dan segitiga",
  sumber: "Metode luar: Susun Bangun, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(0)), tambah(idx(SUARA_T1, "persegi"), keping(0, RUMAH_BADAN, { x: -50 })), tambah(idx(SUARA_T1, "segitiga."), keping(1, RUMAH_ATAP, { x: 60, y: 40 }))),
    k(SUARA_T2, ubah(idx(SUARA_T2, "Letakkan"), { id: "kp0", x: 0 }), ubah(idx(SUARA_T2, "atas"), { id: "kp1", x: 0, y: 0 })),
    k(SUARA_T3, tambah(idx(SUARA_T3, "Ketuk"), ...pilihKata(138, ["4 sisi", "5 sisi", "6 sisi"], 12))),
    k(SUARA_T4, sorotkan(idx(SUARA_T4, "Betul,"), "c2-k"), tambah(idx(SUARA_T4, "segi"), hasil("ht", RUMAH_HASIL), namaBangun("ht", 150, 184, "segi lima"))),
    k(SUARA_T5, redamkan(0, "c2-k"), ...POS_T5.map((p, q) => tambah(p, garisSisi("ht", RUMAH_HASIL, q), angkaSisi("ht", RUMAH_HASIL, q)))),
  ],
};

/* ------------------------------ 4. Urai Bangun: bentuk huruf L ------------------------------ */
export const BANGUN_L = [P(110, 50), P(150, 50), P(150, 90), P(190, 90), P(190, 130), P(110, 130)];
export const L_ATAS = [P(110, 50), P(150, 50), P(150, 90), P(110, 90)];
export const L_BAWAH = [P(110, 90), P(190, 90), P(190, 130), P(110, 130)];
const SUARA_U1 = "Metode kedua bernama Urai Bangun. Kita memecah satu bangun menjadi beberapa bagian.";
const SUARA_U2 = "Ini bangun yang bentuknya seperti huruf L. Hitung sisinya: satu, dua, tiga, empat, lima, enam.";
const SUARA_U3 = "Kita tarik satu garis lurus dari pojok yang menekuk sampai ke sisi kiri.";
const SUARA_U4 = "Bangun L terpecah menjadi dua keping. Keduanya segi empat.";
const SUARA_U5 = "Bangun yang rumit menjadi mudah dikenali setelah diurai.";
const POS_U2 = urutBilangan(SUARA_U2, 1, 6, "sisinya:");
const ARAH_L: Titik[] = [P(0, -1), P(1, 0), P(0, -1), P(1, 0), P(0, 1), P(-1, 0)];
const ARAH_T: Titik[] = [P(0, -1), P(1, 0), P(0, 1), P(1, 0), P(0, 1), P(-1, 0), P(0, 1), P(-1, 0)];

export const ADEGAN_LUAR_URAI: AdeganStory = {
  id: "luar-urai",
  judul: "Urai Bangun: bentuk huruf L",
  sumber: "Metode luar: Urai Bangun",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_U1, tambah(0, ...kepala(1)), tambah(idx(SUARA_U1, "bangun", 2), bg("ut", BANGUN_L, W.krem))),
    k(SUARA_U2, tambah(idx(SUARA_U2, "huruf"), teks("ut-lb", 245, 112, "bangun L", 9, W.ungu)), ...POS_U2.map((p, q) => tambah(p, garisSisi("ut", BANGUN_L, q), angkaSisi("ut", BANGUN_L, q, 10, ARAH_L[q])))),
    k(SUARA_U3, hapus(idx(SUARA_U3, "Kita"), ...Array.from({ length: 6 }, (_, i) => [`uts${i}`, `utsn${i}`]).flat()), tambah(idx(SUARA_U3, "tarik"), garisUrai(0, P(150, 90), P(110, 90)))),
    k(SUARA_U4, tambah(idx(SUARA_U4, "dua"), keping(0, L_ATAS), keping(1, L_BAWAH)), ubah(idx(SUARA_U4, "Keduanya"), { id: "kp0", y: -6 }, { id: "kp1", y: 6 }), tambah(idx(SUARA_U4, "segi"), hasilHitung("2 segi empat", 160))),
    k(SUARA_U5, tambah(idx(SUARA_U5, "rumit"), ...kartu("ur", 40, 170, 220, 24, W.emas, ["pecah, lalu kenali tiap bagian"], 9.6))),
  ],
};

/* ------------------------------ 5. Urai Bangun: bentuk huruf T ------------------------------ */
export const BANGUN_T = [P(90, 50), P(210, 50), P(210, 80), P(165, 80), P(165, 130), P(135, 130), P(135, 80), P(90, 80)];
export const T_ATAS = [P(90, 50), P(210, 50), P(210, 80), P(90, 80)];
export const T_BATANG = [P(135, 80), P(165, 80), P(165, 130), P(135, 130)];
const SUARA_V1 = "Coba satu bangun lagi, yang bentuknya seperti huruf T.";
const SUARA_V2 = "Hitung sisinya: satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_V3 = "Kita tarik satu garis lurus mendatar tepat di bawah bagian atas huruf T.";
const SUARA_V4 = "Berapa keping yang terbentuk? Ketuk jawabannya.";
const SUARA_V5 = "Betul, dua keping! Keduanya segi empat.";
const POS_V2 = urutBilangan(SUARA_V2, 1, 8, "sisinya:");

export const ADEGAN_LUAR_URAI_TERAPAN: AdeganStory = {
  id: "luar-urai-terapan",
  judul: "Urai Bangun: bentuk huruf T",
  sumber: "Metode luar: Urai Bangun, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(1)), tambah(idx(SUARA_V1, "bangun"), bg("ut", BANGUN_T, W.krem), teks("ut-lb", 250, 104, "bangun T", 9, W.ungu))),
    k(SUARA_V2, ...POS_V2.map((p, q) => tambah(p, garisSisi("ut", BANGUN_T, q), angkaSisi("ut", BANGUN_T, q, 10, ARAH_T[q])))),
    k(SUARA_V3, hapus(idx(SUARA_V3, "Kita"), ...Array.from({ length: 8 }, (_, i) => [`uts${i}`, `utsn${i}`]).flat()), tambah(idx(SUARA_V3, "tarik"), garisUrai(0, P(90, 80), P(210, 80)))),
    k(SUARA_V4, tambah(idx(SUARA_V4, "Ketuk"), ...pilihKata(158, ["2 keping", "3 keping", "4 keping"], 11))),
    k(SUARA_V5, sorotkan(idx(SUARA_V5, "Betul,"), "c1-k"), tambah(idx(SUARA_V5, "dua"), keping(0, T_ATAS), keping(1, T_BATANG)), ubah(idx(SUARA_V5, "Keduanya"), { id: "kp1", y: 4 }), tambah(idx(SUARA_V5, "segi"), hasilHitung("2 segi empat", 146, 10))),
  ],
};
