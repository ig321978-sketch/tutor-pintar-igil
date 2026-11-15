import type { AdeganStory } from "./logika-story";
import { W, anak, bendaBagi, emo, gelasAir, hasilBagi, hasilGelas, hasilLipat, judul, kartu, labelBagian, lingkaranPoli, lipatan, persegiPanjang, tarik, teks } from "./k2b5A-gambar";
import type { Titik } from "./k2b5A-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b5A-bantu";

/* ------------------------------ 9. Lipat gambar: pas menumpuk ------------------------------ */
export const POLI_LIPAT_PAS = persegiPanjang(108, 52, 84, 84);
const LP_ATAS: Titik = [150, 44];
const LP_BAWAH: Titik = [150, 144];
const LP = bendaBagi(1, POLI_LIPAT_PAS, LP_ATAS, LP_BAWAH, "#BBF7D0");
const TOMBOL_LIPAT = () => kartu("lp", 214, 150, 72, 26, W.emas, ["lipat"], 13);

const SUARA_F1 = "Ada cara untuk memeriksa bagian sama besar. Caranya dengan melipat. Kita lipat gambar di layar.";
const SUARA_F2 = "Lihat garis potong di tengah gambar. Garis ini juga bisa menjadi garis lipat.";
const SUARA_F3 = "Sekarang ketuk lipat. Bagian kanan dilipat ke atas bagian kiri.";
const SUARA_F4 = "Lihat, kedua sisi pas menumpuk. Tidak ada bagian yang menonjol.";
const SUARA_F5 = "Pas menumpuk berarti kedua bagian sama besar. Jadi tiap bagian adalah setengah.";
const SUARA_F6 = "Itulah cara memeriksa dengan melipat. Kalau pas menumpuk, bagian itu sama besar.";

export const ADEGAN_UJI_LIPAT: AdeganStory = {
  id: "lipat-pas",
  judul: "Lipat gambar: pas menumpuk",
  sumber: "Materi: lipat gambar pas menumpuk",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_F1, tambah(0, judul("Lipat gambar")), tambah(idx(SUARA_F1, "melipat."), ...kartu("ul", 80, 160, 140, 26, W.emas, ["lipat gambar"], 12)), tambah(idx(SUARA_F1, "gambar"), LP.w)),
    k(SUARA_F2, hapus(0, "ul-k", "ul-t0"), tambah(idx(SUARA_F2, "garis"), LP.gp), hapus(idx(SUARA_F2, "bisa"), "bn1-w"), tambah(idx(SUARA_F2, "bisa"), LP.a, LP.b)),
    k(SUARA_F3, tambah(idx(SUARA_F3, "ketuk"), ...TOMBOL_LIPAT()), hapus(idx(SUARA_F3, "dilipat"), "bn1-b"), tambah(idx(SUARA_F3, "dilipat"), lipatan(1, LP.titikB, LP_ATAS, LP_BAWAH))),
    k(SUARA_F4, tambah(idx(SUARA_F4, "pas"), hasilLipat(1, 150, 168, "pas"))),
    k(SUARA_F5, sorotkan(idx(SUARA_F5, "Pas"), "bn1-c"), tambah(idx(SUARA_F5, "setengah."), hasilBagi(1, 150, 186, "setengah"))),
    k(
      SUARA_F6,
      bersih(0),
      tambah(0, judul("Lipat gambar")),
      tambah(idx(SUARA_F6, "Itulah"), ...kartu("r1", 30, 36, 240, 32, W.hijauMuda, ["lipat gambar di layar"], 11)),
      tambah(idx(SUARA_F6, "pas"), ...kartu("r2", 30, 80, 240, 32, W.pink, ["pas menumpuk = sama besar"], 11)),
      tambah(idx(SUARA_F6, "sama"), ...kartu("r3", 30, 124, 240, 32, W.langit, ["sama besar = setengah"], 11)),
    ),
  ],
};

/* ------------------------------ 10. Uji lipat: tidak pas ------------------------------ */
export const POLI_LIPAT_GAGAL = persegiPanjang(80, 60, 140, 64);
const LG_ATAS: Titik = [115, 52];
const LG_BAWAH: Titik = [115, 132];
const LGG = bendaBagi(1, POLI_LIPAT_GAGAL, LG_ATAS, LG_BAWAH, "#FECACA");
const SUARA_H1 = "Sekarang kita uji gambar yang lain. Garis potongnya tidak lewat di tengah.";
const SUARA_H2 = "Gambar terbagi menjadi bagian kecil di kiri dan bagian besar di kanan.";
const SUARA_H3 = "Ketuk lipat. Bagian kanan dilipat ke atas bagian kiri.";
const SUARA_H4 = "Lihat, ada bagian yang menonjol keluar. Kedua sisi tidak pas menumpuk.";
const SUARA_H5 = "Tidak pas berarti tidak sama besar. Jadi bukan setengah.";
const SUARA_H6 = "Jadi melipat gambar membantu kita. Pas berarti setengah, tidak pas berarti bukan setengah.";

export const ADEGAN_LIPAT_GAGAL: AdeganStory = {
  id: "lipat-gagal",
  judul: "Lipat gambar: tidak pas",
  sumber: "Materi: lipat gambar tidak pas",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Lipat lagi")), tambah(idx(SUARA_H1, "gambar"), LGG.w), tambah(idx(SUARA_H1, "Garis"), LGG.gp)),
    k(
      SUARA_H2,
      hapus(idx(SUARA_H2, "menjadi"), "bn1-w"),
      tambah(idx(SUARA_H2, "menjadi"), LGG.a, LGG.b),
      tambah(idx(SUARA_H2, "kecil"), ...labelBagian(1, POLI_LIPAT_GAGAL, LG_ATAS, LG_BAWAH, "kecil", "besar", 0)),
    ),
    k(
      SUARA_H3,
      tambah(idx(SUARA_H3, "Ketuk"), ...kartu("lp", 214, 150, 72, 26, W.emas, ["lipat"], 13)),
      hapus(idx(SUARA_H3, "dilipat"), "bn1-b", "bn1-hb"),
      tambah(idx(SUARA_H3, "dilipat"), lipatan(1, LGG.titikB, LG_ATAS, LG_BAWAH)),
    ),
    k(SUARA_H4, sorotkan(idx(SUARA_H4, "menonjol"), "bn1-c"), tambah(idx(SUARA_H4, "tidak"), hasilLipat(1, 150, 156, "tidak pas"))),
    k(SUARA_H5, redamkan(0, "bn1-c"), tambah(idx(SUARA_H5, "setengah."), hasilBagi(1, 150, 178, "bukan setengah"))),
    k(SUARA_H6, tambah(idx(SUARA_H6, "Pas"), ...kartu("rg", 20, 184, 260, 14, W.emas, ["pas: setengah; tidak pas: bukan"], 8.4))),
  ],
};

/* ------------------------------ 11. Gambar A dan gambar B ------------------------------ */
export const POLI_AB = [persegiPanjang(12, 64, 124, 64), persegiPanjang(164, 64, 124, 64)];
export const GARIS_AB: [Titik, Titik][] = [
  [[74, 56], [74, 136]],
  [[195, 56], [195, 136]],
];
const AB = [0, 1].map((i) => bendaBagi(i + 1, POLI_AB[i], GARIS_AB[i][0], GARIS_AB[i][1], "#FDE68A"));
const SUARA_A1 = "Perhatikan dua gambar. Ada gambar A dan gambar B.";
const SUARA_A2 = "Kedua gambar dipotong menjadi dua bagian.";
const SUARA_A3 = "Gambar A dipotong menjadi dua bagian sama besar, jadi gambar A menunjukkan setengah.";
const SUARA_A4 = "Gambar B dipotong menjadi dua bagian tidak sama besar, jadi gambar B bukan setengah.";
const SUARA_A5 = "Ingat, setengah hanya ada kalau kedua bagian sama besar.";

export const ADEGAN_GAMBAR_AB: AdeganStory = {
  id: "gambar-ab",
  judul: "Gambar A dan gambar B",
  sumber: "Materi: gambar A dan gambar B",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Gambar A dan gambar B")),
      tambah(idx(SUARA_A1, "gambar."), AB[0].w, AB[1].w),
      tambah(idx(SUARA_A1, "A"), teks("huruf-a", 74, 48, "A", 14, W.ungu)),
      tambah(idx(SUARA_A1, "B."), teks("huruf-b", 226, 48, "B", 14, W.ungu)),
    ),
    k(SUARA_A2, tambah(idx(SUARA_A2, "dipotong"), AB[0].gp, AB[1].gp), hapus(idx(SUARA_A2, "menjadi"), "bn1-w", "bn2-w"), tambah(idx(SUARA_A2, "menjadi"), AB[0].a, AB[0].b, AB[1].a, AB[1].b)),
    k(
      SUARA_A3,
      sorotkan(idx(SUARA_A3, "A"), "bn1-a", "bn1-b"),
      ubah(idx(SUARA_A3, "sama"), ...tarik(1, GARIS_AB[0][0], GARIS_AB[0][1], 5)),
      tambah(idx(SUARA_A3, "setengah."), hasilBagi(1, 74, 160, "setengah")),
    ),
    k(
      SUARA_A4,
      redamkan(0, "bn1-a", "bn1-b"),
      sorotkan(idx(SUARA_A4, "B"), "bn2-a", "bn2-b"),
      ubah(idx(SUARA_A4, "tidak"), ...tarik(2, GARIS_AB[1][0], GARIS_AB[1][1], 5)),
      tambah(idx(SUARA_A4, "setengah."), hasilBagi(2, 226, 160, "bukan setengah")),
    ),
    k(SUARA_A5, redamkan(0, "bn2-a", "bn2-b"), tambah(idx(SUARA_A5, "hanya"), ...kartu("ig", 30, 172, 240, 24, W.emas, ["hanya bagian sama besar yang setengah"], 9.4))),
  ],
};

/* ------------------------------ 11b. Martabak dibagi adil ------------------------------ */
const POLI_M_ADIL = lingkaranPoli(150, 92, 44);
const MA_ATAS = POLI_M_ADIL[30];
const MA_BAWAH = POLI_M_ADIL[10];
const MA = bendaBagi(1, POLI_M_ADIL, MA_ATAS, MA_BAWAH, "#FBBF24");
const SUARA_D1 = "Sekarang kita kembali ke martabak Kira. Kira dan Malosi ingin berbagi dengan adil.";
const SUARA_D2 = "Kira memakai garis potong yang lewat tepat di tengah martabak. Martabak terbagi menjadi dua bagian.";
const SUARA_D3 = "Kedua bagian sama besar, jadi Kira dan Malosi masing-masing mendapat setengah martabak.";
const SUARA_D4 = "Adil sekali! Tidak ada yang mendapat lebih banyak atau lebih sedikit. Igil ikut senang.";
const SUARA_D5 = "Ingat, adil artinya dua bagian sama besar, dan satu bagian adalah setengah.";

export const ADEGAN_MARTABAK_ADIL: AdeganStory = {
  id: "martabak-adil",
  judul: "Martabak dibagi adil",
  sumber: "Materi: martabak dibagi adil",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Martabak dibagi adil")),
      tambah(idx(SUARA_D1, "martabak"), MA.w),
      tambah(idx(SUARA_D1, "Kira"), ...anak("kira", 40, 66)),
      tambah(idx(SUARA_D1, "Malosi"), ...anak("malosi", 260, 66)),
    ),
    k(SUARA_D2, tambah(idx(SUARA_D2, "garis"), MA.gp), hapus(idx(SUARA_D2, "terbagi"), "bn1-w"), tambah(idx(SUARA_D2, "terbagi"), MA.a, MA.b)),
    k(
      SUARA_D3,
      ubah(idx(SUARA_D3, "Kedua"), ...tarik(1, MA_ATAS, MA_BAWAH, 7)),
      tambah(idx(SUARA_D3, "setengah"), ...labelBagian(1, POLI_M_ADIL, MA_ATAS, MA_BAWAH, "setengah", "setengah", 7)),
    ),
    k(SUARA_D4, tambah(idx(SUARA_D4, "Adil"), emo("sn", 150, 170, "\u{1F60A}", 30)), tambah(idx(SUARA_D4, "Igil"), emo("ow", 150, 38, "\u{1F989}", 22))),
    k(SUARA_D5, hapus(0, "sn", "ow"), tambah(idx(SUARA_D5, "Ingat,"), ...kartu("ma", 40, 160, 220, 30, W.emas, ["adil: dua bagian sama besar"], 11))),
  ],
};

/* ------------------------------ 12. Latihan 1: gambar mana yang setengah ------------------------------ */
export const POLI_LATIHAN = [0, 1, 2].map((i) => persegiPanjang(10 + i * 100, 50, 80, 58));
export const GARIS_LATIHAN: [Titik, Titik][] = [
  [[30, 42], [30, 116]],
  [[150, 42], [150, 116]],
  [[300, 69], [200, 69]],
];
const LAT = [0, 1, 2].map((i) => bendaBagi(i + 1, POLI_LATIHAN[i], GARIS_LATIHAN[i][0], GARIS_LATIHAN[i][1], "#FDE68A"));
const HURUF = ["A", "B", "C"];
const SUARA_Q1 = "Latihan satu. Halim melihat tiga gambar di layar. Semuanya dipotong menjadi dua bagian.";
const SUARA_Q2 = "Gambar mana yang menunjukkan setengah? Ketuk jawaban yang tepat.";
const SUARA_Q3 = "Betul! Gambar B dipotong menjadi dua bagian sama besar, jadi gambar B menunjukkan setengah. Hebat!";
const SUARA_Q4 = "Gambar A dan gambar C tidak sama besar, jadi bukan setengah.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: gambar mana yang setengah",
  sumber: "Materi: latihan gambar yang setengah",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Latihan 1")),
      tambah(idx(SUARA_Q1, "gambar"), ...LAT.flatMap((g) => [g.a, g.b, g.gp]), ...HURUF.map((h, i) => teks(`huruf-${h.toLowerCase()}`, 50 + i * 100, 36, h, 13, W.ungu))),
    ),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "jawaban"), ...pilihKata(150, HURUF, 14))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_Q3, "gambar", 2), "bn2-a", "bn2-b"), tambah(idx(SUARA_Q3, "setengah."), hasilBagi(2, 150, 128, "setengah", 8.6))),
    k(
      SUARA_Q4,
      redamkan(0, "bn2-a", "bn2-b", "c2-k"),
      sorotkan(idx(SUARA_Q4, "A"), "bn1-a", "bn1-b"),
      sorotkan(idx(SUARA_Q4, "C"), "bn3-a", "bn3-b"),
      tambah(idx(SUARA_Q4, "bukan"), hasilBagi(1, 50, 128, "bukan setengah", 8.6), hasilBagi(3, 250, 128, "bukan setengah", 8.6)),
    ),
  ],
};

/* ------------------------------ 13. Latihan 2: gelas yang setengah ------------------------------ */
export const ISI_LATIHAN_GELAS = [0.75, 0.25, 0.5];
const SUARA_R1 = "Latihan dua. Upe melihat tiga gelas air di layar.";
const SUARA_R2 = "Gelas mana yang airnya mengisi setengah? Ketuk jawaban yang tepat.";
const SUARA_R3 = "Betul! Gelas C berisi setengah. Tinggi air sama dengan tinggi bagian yang kosong. Hebat!";
const SUARA_R4 = "Gelas A berisi lebih dari setengah. Gelas B berisi kurang dari setengah.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: gelas yang setengah",
  sumber: "Materi: latihan gelas yang setengah",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Latihan 2")),
      tambah(idx(SUARA_R1, "gelas"), ...ISI_LATIHAN_GELAS.flatMap((isi, i) => [...gelasAirLatihan(i + 1, isi), teks(`huruf-${HURUF[i].toLowerCase()}`, 55 + i * 95, 40, HURUF[i], 13, W.ungu)])),
    ),
    k(SUARA_R2, tambah(idx(SUARA_R2, "jawaban"), ...pilihKata(150, HURUF, 14))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul!"), "c3-k"), tambah(idx(SUARA_R3, "Tinggi"), hasilGelas(3, 245, 140, "setengah"))),
    k(SUARA_R4, redamkan(0, "c3-k"), tambah(idx(SUARA_R4, "lebih"), hasilGelas(1, 55, 140, "lebih")), tambah(idx(SUARA_R4, "kurang"), hasilGelas(2, 150, 140, "kurang"))),
  ],
};

function gelasAirLatihan(n: number, isi: number) {
  return gelasAir(n, 55 + (n - 1) * 95 - 22, 48, 44, 84, isi);
}
export const GELAS_LATIHAN_X = [0, 1, 2].map((i) => 55 + i * 95 - 22);

/* ------------------------------ 14. Latihan 3: uji lipat pada persegi ------------------------------ */
export const POLI_LATIHAN_LIPAT = persegiPanjang(110, 46, 80, 80);
const LL_A: Titik = [110, 46];
const LL_B: Titik = [190, 126];
const LL = bendaBagi(1, POLI_LATIHAN_LIPAT, LL_A, LL_B, "#FDE68A");
const SUARA_Z1 = "Latihan tiga. Wei melihat sebuah persegi. Garis potongnya dari pojok ke pojok.";
const SUARA_Z2 = "Wei ketuk lipat. Satu bagian dilipat ke atas bagian yang lain.";
const SUARA_Z3 = "Apakah kedua bagian pas menumpuk? Ketuk jawaban yang tepat.";
const SUARA_Z4 = "Betul! Kedua bagian pas menumpuk, jadi sama besar. Hebat!";
const SUARA_Z5 = "Pas menumpuk berarti sama besar, jadi tiap bagian adalah setengah.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: lipat pada persegi",
  sumber: "Materi: latihan lipat gambar",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_Z1, "persegi."), LL.a, LL.b), tambah(idx(SUARA_Z1, "Garis"), LL.gp)),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "ketuk"), ...kartu("lp", 214, 150, 72, 26, W.emas, ["lipat"], 13)), hapus(idx(SUARA_Z2, "dilipat"), "bn1-b"), tambah(idx(SUARA_Z2, "dilipat"), lipatan(1, LL.titikB, LL_A, LL_B))),
    k(SUARA_Z3, hapus(0, "lp-k", "lp-t0"), tambah(idx(SUARA_Z3, "jawaban"), ...pilihKata(150, ["tidak pas", "pas"], 13))),
    k(SUARA_Z4, sorotkan(idx(SUARA_Z4, "Betul!"), "c2-k"), tambah(idx(SUARA_Z4, "pas"), hasilLipat(1, 150, 142, "pas", 10))),
    k(SUARA_Z5, redamkan(0, "c2-k"), tambah(idx(SUARA_Z5, "setengah."), emo("ow", 40, 110, "\u{1F989}", 26), hasilBagi(1, 150, 192, "setengah"))),
  ],
};
