import type { AdeganStory } from "./logika-story";
import { W, bendaBagi, hasilBagi, hasilLipat, kartu, lipatan, persegiPanjang, tarik, teks } from "./k2b5A-gambar";
import type { Titik } from "./k2b5A-gambar";
import { hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b5A-bantu";
import { kepala } from "./k2b5A-luar-1";

/* ------------------------------ 5. Bagian Sama: konsep ------------------------------ */
export const POLI_CD = [persegiPanjang(40, 66, 70, 70), persegiPanjang(190, 66, 70, 70)];
export const GARIS_CD: [Titik, Titik][] = [
  [[75, 58], [75, 144]],
  [[207, 58], [207, 144]],
];
const CD = [0, 1].map((i) => bendaBagi(i + 1, POLI_CD[i], GARIS_CD[i][0], GARIS_CD[i][1], "#FDE68A"));
const SUARA_X1 = "Metode kedua bernama Bagian Sama. Setengah hanya ada kalau kedua bagian sama besar.";
const SUARA_X2 = "Ada dua gambar, yaitu gambar C dan gambar D. Keduanya dipotong menjadi dua bagian.";
const SUARA_X3 = "Periksa gambar C. Kedua bagiannya sama besar, jadi gambar C menunjukkan setengah.";
const SUARA_X4 = "Periksa gambar D. Satu bagiannya lebih besar, jadi gambar D bukan setengah.";
const SUARA_X5 = "Ingat, hanya bagian yang sama besar yang disebut setengah.";

export const ADEGAN_LUAR_BAGIAN: AdeganStory = {
  id: "luar-bagian",
  judul: "Bagian Sama: periksa besarnya",
  sumber: "Metode luar: Bagian Sama",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_X1, tambah(0, ...kepala(1)), tambah(idx(SUARA_X1, "kalau"), CD[0].w, CD[1].w)),
    k(
      SUARA_X2,
      tambah(idx(SUARA_X2, "C"), teks("huruf-c", 75, 58, "C", 13, W.ungu)),
      tambah(idx(SUARA_X2, "D."), teks("huruf-d", 225, 58, "D", 13, W.ungu)),
      tambah(idx(SUARA_X2, "dipotong"), CD[0].gp, CD[1].gp),
      hapus(idx(SUARA_X2, "menjadi"), "bn1-w", "bn2-w"),
      tambah(idx(SUARA_X2, "menjadi"), CD[0].a, CD[0].b, CD[1].a, CD[1].b),
    ),
    k(
      SUARA_X3,
      sorotkan(idx(SUARA_X3, "Periksa"), "bn1-a", "bn1-b"),
      ubah(idx(SUARA_X3, "sama"), ...tarik(1, GARIS_CD[0][0], GARIS_CD[0][1], 5)),
      tambah(idx(SUARA_X3, "setengah."), hasilBagi(1, 75, 164, "setengah")),
    ),
    k(
      SUARA_X4,
      redamkan(0, "bn1-a", "bn1-b"),
      sorotkan(idx(SUARA_X4, "Periksa"), "bn2-a", "bn2-b"),
      ubah(idx(SUARA_X4, "lebih"), ...tarik(2, GARIS_CD[1][0], GARIS_CD[1][1], 5)),
      tambah(idx(SUARA_X4, "setengah."), hasilBagi(2, 225, 164, "bukan setengah")),
    ),
    k(SUARA_X5, redamkan(0, "bn2-a", "bn2-b"), tambah(idx(SUARA_X5, "hanya"), ...kartu("xr", 30, 172, 240, 24, W.emas, ["hanya bagian sama besar: setengah"], 9.4))),
  ],
};

/* ------------------------------ 6. Bagian Sama: terapan ------------------------------ */
export const POLI_EF = [persegiPanjang(20, 62, 110, 56), persegiPanjang(170, 62, 110, 56)];
export const GARIS_EF: [Titik, Titik][] = [
  [[57, 54], [57, 126]],
  [[225, 54], [225, 126]],
];
const EF = [0, 1].map((i) => bendaBagi(i + 1, POLI_EF[i], GARIS_EF[i][0], GARIS_EF[i][1], "#FDE68A"));
const SUARA_Y1 = "Terapkan pada soal ini. Wei melihat gambar E dan gambar F. Keduanya dipotong menjadi dua bagian.";
const SUARA_Y2 = "Gambar mana yang menunjukkan setengah? Ketuk jawaban yang tepat.";
const SUARA_Y3 = "Betul! Gambar F dipotong menjadi dua bagian sama besar, jadi gambar F menunjukkan setengah. Hebat!";
const SUARA_Y4 = "Gambar E dipotong tidak sama besar, jadi gambar E bukan setengah.";

export const ADEGAN_LUAR_BAGIAN_TERAPAN: AdeganStory = {
  id: "luar-bagian-terapan",
  judul: "Bagian Sama: gambar E dan F",
  sumber: "Metode luar: Bagian Sama",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_Y1, "gambar"), EF[0].w, EF[1].w),
      tambah(idx(SUARA_Y1, "E"), teks("huruf-e", 75, 54, "E", 13, W.ungu)),
      tambah(idx(SUARA_Y1, "F."), teks("huruf-f", 225, 54, "F", 13, W.ungu)),
      tambah(idx(SUARA_Y1, "dipotong"), EF[0].gp, EF[1].gp),
      hapus(idx(SUARA_Y1, "menjadi"), "bn1-w", "bn2-w"),
      tambah(idx(SUARA_Y1, "menjadi"), EF[0].a, EF[0].b, EF[1].a, EF[1].b),
    ),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "jawaban"), ...pilihKata(150, ["E", "F"], 14))),
    k(SUARA_Y3, sorotkan(idx(SUARA_Y3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_Y3, "gambar", 2), "bn2-a", "bn2-b"), tambah(idx(SUARA_Y3, "setengah."), hasilBagi(2, 225, 138, "setengah"))),
    k(SUARA_Y4, redamkan(0, "bn2-a", "bn2-b", "c2-k"), sorotkan(idx(SUARA_Y4, "E"), "bn1-a", "bn1-b"), tambah(idx(SUARA_Y4, "bukan"), hasilBagi(1, 75, 138, "bukan setengah"))),
  ],
};
/* ------------------------------ 7. Uji Lipat: konsep ------------------------------ */
export const POLI_UL = persegiPanjang(110, 56, 80, 80);
const UL_ATAS: Titik = [150, 48];
const UL_BAWAH: Titik = [150, 144];
const UL = bendaBagi(1, POLI_UL, UL_ATAS, UL_BAWAH, "#BBF7D0");
const SUARA_Z1 = "Metode ketiga bernama Uji Lipat. Kita lipat gambar di layar untuk memeriksa.";
const SUARA_Z2 = "Garis potong di tengah gambar menjadi garis lipat.";
const SUARA_Z3 = "Ketuk lipat. Bagian kanan dilipat ke atas bagian kiri.";
const SUARA_Z4 = "Kedua sisi pas menumpuk, jadi kedua bagian sama besar.";
const SUARA_Z5 = "Pas menumpuk berarti kedua bagian sama besar, jadi tiap bagian adalah setengah.";

export const ADEGAN_LUAR_LIPAT: AdeganStory = {
  id: "luar-lipat",
  judul: "Uji Lipat: pas menumpuk",
  sumber: "Metode luar: Uji Lipat",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Z1, tambah(0, ...kepala(2)), tambah(idx(SUARA_Z1, "gambar"), UL.w)),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Garis"), UL.gp), hapus(idx(SUARA_Z2, "menjadi"), "bn1-w"), tambah(idx(SUARA_Z2, "menjadi"), UL.a, UL.b)),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "Ketuk"), ...kartu("lp", 214, 150, 72, 26, W.emas, ["lipat"], 13)), hapus(idx(SUARA_Z3, "dilipat"), "bn1-b"), tambah(idx(SUARA_Z3, "dilipat"), lipatan(1, UL.titikB, UL_ATAS, UL_BAWAH))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "pas"), hasilLipat(1, 150, 162, "pas"))),
    k(SUARA_Z5, sorotkan(idx(SUARA_Z5, "Pas"), "bn1-c"), tambah(idx(SUARA_Z5, "setengah."), hasilBagi(1, 150, 184, "setengah"))),
  ],
};

/* ------------------------------ 8. Uji Lipat: terapan ------------------------------ */
export const POLI_UL2 = persegiPanjang(110, 58, 80, 80);
const UL2_ATAS: Titik = [130, 50];
const UL2_BAWAH: Titik = [130, 146];
const U2 = bendaBagi(1, POLI_UL2, UL2_ATAS, UL2_BAWAH, "#FECACA");
const SUARA_T1 = "Terapkan pada soal ini. Halim melihat persegi dengan garis potong di dekat sisi kiri.";
const SUARA_T2 = "Halim ketuk lipat. Bagian kanan dilipat ke atas bagian kiri. Apakah pas menumpuk? Ketuk jawaban.";
const SUARA_T3 = "Betul! Ada bagian yang menonjol, jadi tidak pas menumpuk. Hebat!";
const SUARA_T4 = "Tidak pas berarti tidak sama besar, jadi bukan setengah.";

export const ADEGAN_LUAR_LIPAT_TERAPAN: AdeganStory = {
  id: "luar-lipat-terapan",
  judul: "Uji Lipat: persegi Halim",
  sumber: "Metode luar: Uji Lipat",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(2)), tambah(idx(SUARA_T1, "persegi"), U2.a, U2.b), tambah(idx(SUARA_T1, "garis"), U2.gp)),
    k(
      SUARA_T2,
      tambah(idx(SUARA_T2, "ketuk"), ...kartu("lp", 214, 150, 72, 26, W.emas, ["lipat"], 13)),
      hapus(idx(SUARA_T2, "dilipat"), "bn1-b"),
      tambah(idx(SUARA_T2, "dilipat"), lipatan(1, U2.titikB, UL2_ATAS, UL2_BAWAH)),
      hapus(idx(SUARA_T2, "jawaban"), "lp-k", "lp-t0"),
      tambah(idx(SUARA_T2, "jawaban"), ...pilihKata(150, ["pas", "tidak pas"], 13)),
    ),
    k(SUARA_T3, sorotkan(idx(SUARA_T3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_T3, "menonjol,"), "bn1-c"), tambah(idx(SUARA_T3, "tidak"), hasilLipat(1, 150, 142, "tidak pas", 10))),
    k(SUARA_T4, redamkan(0, "bn1-c", "c2-k"), tambah(idx(SUARA_T4, "setengah."), hasilBagi(1, 150, 190, "bukan setengah"))),
  ],
};
