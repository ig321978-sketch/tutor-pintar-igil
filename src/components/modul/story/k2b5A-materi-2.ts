import type { AdeganStory } from "./logika-story";
import { W, bendaBagi, garis, gelasAir, hasilBagi, hasilGelas, judul, kartu, lingkaranPoli, persegiPanjang, tarik, teks, titikTengah } from "./k2b5A-gambar";
import type { Titik } from "./k2b5A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b5A-bantu";

/* ------------------------------ 6. Setengah pada benda di layar: semangka dan gelas air ------------------------------ */
export const POLI_SEMANGKA = lingkaranPoli(82, 96, 38);
const S_KANAN = POLI_SEMANGKA[0];
const S_KIRI = POLI_SEMANGKA[20];
const SM = bendaBagi(1, POLI_SEMANGKA, S_KANAN, S_KIRI, "#86EFAC", "#F87171", "#FCA5A5");
/** Gelas air: tinggi gelas 84, air tepat setengahnya. */
export const GELAS = { x: 190, y: 44, w: 46, h: 84 };
const SUARA_S1 = "Setengah ada pada banyak benda di layar. Mari kita cari bersama Igil. Pertama, lihat semangka ini.";
const SUARA_S2 = "Semangka dipotong lewat tengah menjadi dua bagian sama besar.";
const SUARA_S3 = "Satu bagian semangka ini adalah setengah semangka.";
const SUARA_S4 = "Kedua, lihat gelas air ini. Airnya mengisi gelas sampai setengah.";
const SUARA_S5 = "Tinggi air sama dengan tinggi bagian yang kosong. Jadi gelas ini berisi setengah air.";
const SUARA_S6 = "Kalau gelas ditambah air sampai penuh, airnya tidak lagi setengah. Gelas penuh adalah satu utuh.";
const SUARA_S7 = "Setengah semangka dan setengah gelas air berbeda bendanya. Tapi artinya sama, yaitu dua bagian sama besar.";

export const ADEGAN_BENDA_LAYAR: AdeganStory = {
  id: "benda-layar",
  judul: "Setengah pada benda di layar",
  sumber: "Materi: setengah pada benda di layar",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Setengah pada benda")), tambah(idx(SUARA_S1, "semangka"), SM.w, teks("ns", 82, 152, "semangka", 9.6, W.coklat))),
    k(SUARA_S2, tambah(idx(SUARA_S2, "dipotong"), SM.gp), hapus(idx(SUARA_S2, "menjadi"), "bn1-w"), tambah(idx(SUARA_S2, "menjadi"), SM.a, SM.b), ubah(idx(SUARA_S2, "sama"), ...tarik(1, S_KANAN, S_KIRI, 5))),
    k(SUARA_S3, sorotkan(idx(SUARA_S3, "Satu"), "bn1-a"), tambah(idx(SUARA_S3, "setengah"), hasilBagi(1, 82, 170, "setengah"))),
    k(
      SUARA_S4,
      redamkan(0, "bn1-a"),
      tambah(idx(SUARA_S4, "gelas"), ...gelasAir(1, GELAS.x, GELAS.y, GELAS.w, GELAS.h, 0.5), teks("ng", 213, 148, "gelas air", 9.6, W.coklat)),
      tambah(idx(SUARA_S4, "setengah."), hasilGelas(1, 213, 166, "setengah")),
    ),
    k(
      SUARA_S5,
      tambah(idx(SUARA_S5, "Tinggi"), garis("gl1-gm", GELAS.x - 5, GELAS.y + GELAS.h / 2, GELAS.w + 10, 0, W.merah, 2, { putus: true, z: 3 })),
      tambah(idx(SUARA_S5, "air"), teks("ga", 163, 112, "air", 9, W.biru)),
      tambah(idx(SUARA_S5, "kosong."), teks("gk", 160, 70, "kosong", 9, W.biru)),
    ),
    k(
      SUARA_S6,
      hapus(idx(SUARA_S6, "airnya"), "gl1-gm", "ga", "gk"),
      ubah(idx(SUARA_S6, "penuh,"), { id: "gl1-a", y: GELAS.y, h: GELAS.h }, { id: "gl1-hs", isi: "penuh" }),
    ),
    k(
      SUARA_S7,
      bersih(0),
      tambah(0, judul("Setengah artinya sama")),
      tambah(idx(SUARA_S7, "semangka"), ...kartu("e1", 20, 44, 260, 34, W.hijauMuda, ["setengah semangka"], 11)),
      tambah(idx(SUARA_S7, "gelas"), ...kartu("e2", 20, 90, 260, 34, W.langit, ["setengah gelas air"], 11)),
      tambah(idx(SUARA_S7, "sama,"), ...kartu("e3", 20, 138, 260, 40, W.emas, ["dua bagian sama besar"], 12)),
    ),
  ],
};

/* ------------------------------ 7. Setengah pada lingkaran ------------------------------ */
const CX = [52, 150, 248];
const CY = 86;
const R = 34;
export const POLI_LINGKARAN = CX.map((c) => lingkaranPoli(c, CY, R));
/** Ujung garis potong lewat titik tengah: tegak (atas-bawah), mendatar (kanan-kiri), miring (kiri-atas ke kanan-bawah). */
export const GARIS_LINGKARAN: [Titik, Titik][] = [
  [POLI_LINGKARAN[0][30], POLI_LINGKARAN[0][10]],
  [POLI_LINGKARAN[1][0], POLI_LINGKARAN[1][20]],
  [POLI_LINGKARAN[2][25], POLI_LINGKARAN[2][5]],
];
const LG = [0, 1, 2].map((i) => bendaBagi(i + 1, POLI_LINGKARAN[i], GARIS_LINGKARAN[i][0], GARIS_LINGKARAN[i][1], "#FDE68A"));
const tarikLg = (i: number) => tarik(i + 1, GARIS_LINGKARAN[i][0], GARIS_LINGKARAN[i][1], 5);

const SUARA_L1 = "Sekarang kita lihat lingkaran. Lingkaran bentuknya bulat dan tidak punya sudut. Ada tiga lingkaran di layar.";
const SUARA_L2 = "Lingkaran pertama dipotong dengan garis tegak. Garis itu lewat titik tengah.";
const SUARA_L3 = "Hasilnya dua bagian sama besar. Tiap bagian adalah setengah.";
const SUARA_L4 = "Lingkaran kedua dipotong dengan garis mendatar. Garis itu juga lewat titik tengah.";
const SUARA_L5 = "Hasilnya juga dua bagian sama besar, jadi tiap bagian adalah setengah.";
const SUARA_L6 = "Lingkaran ketiga dipotong dengan garis miring. Garis itu tetap lewat titik tengah.";
const SUARA_L7 = "Hasilnya sama, yaitu dua bagian sama besar dan tiap bagian adalah setengah.";
const SUARA_L8 = "Jadi garis potong boleh tegak, mendatar, atau miring. Asalkan lewat titik tengah, hasilnya setengah.";

export const ADEGAN_LINGKARAN: AdeganStory = {
  id: "lingkaran",
  judul: "Setengah pada lingkaran",
  sumber: "Materi: setengah pada lingkaran",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Setengah pada lingkaran")),
      tambah(idx(SUARA_L1, "lingkaran."), LG[0].w),
      tambah(idx(SUARA_L1, "tiga"), LG[1].w),
      tambah(idx(SUARA_L1, "layar."), LG[2].w),
    ),
    k(SUARA_L2, tambah(idx(SUARA_L2, "garis"), LG[0].gp), tambah(idx(SUARA_L2, "lewat"), titikTengah(1, POLI_LINGKARAN[0])), hapus(idx(SUARA_L2, "titik"), "bn1-w"), tambah(idx(SUARA_L2, "titik"), LG[0].a, LG[0].b), ubah(idx(SUARA_L2, "tengah."), ...tarikLg(0))),
    k(SUARA_L3, tambah(idx(SUARA_L3, "Tiap"), hasilBagi(1, CX[0], 146, "setengah", 9))),
    k(SUARA_L4, tambah(idx(SUARA_L4, "garis"), LG[1].gp), tambah(idx(SUARA_L4, "lewat"), titikTengah(2, POLI_LINGKARAN[1])), hapus(idx(SUARA_L4, "titik"), "bn2-w"), tambah(idx(SUARA_L4, "titik"), LG[1].a, LG[1].b), ubah(idx(SUARA_L4, "tengah."), ...tarikLg(1))),
    k(SUARA_L5, tambah(idx(SUARA_L5, "tiap"), hasilBagi(2, CX[1], 146, "setengah", 9))),
    k(SUARA_L6, tambah(idx(SUARA_L6, "garis"), LG[2].gp), tambah(idx(SUARA_L6, "lewat"), titikTengah(3, POLI_LINGKARAN[2])), hapus(idx(SUARA_L6, "titik"), "bn3-w"), tambah(idx(SUARA_L6, "titik"), LG[2].a, LG[2].b), ubah(idx(SUARA_L6, "tengah."), ...tarikLg(2))),
    k(SUARA_L7, tambah(idx(SUARA_L7, "tiap"), hasilBagi(3, CX[2], 146, "setengah", 9))),
    k(
      SUARA_L8,
      sorotkan(idx(SUARA_L8, "tegak,"), "bn1-gp"),
      sorotkan(idx(SUARA_L8, "mendatar,"), "bn2-gp"),
      sorotkan(idx(SUARA_L8, "miring."), "bn3-gp"),
      tambah(idx(SUARA_L8, "hasilnya"), ...kartu("rk", 40, 162, 220, 30, W.emas, ["lewat titik tengah: setengah"], 10.5)),
    ),
  ],
};

/* ------------------------------ 8. Setengah pada persegi ------------------------------ */
const SISI = 62;
const PY = 58;
export const POLI_PERSEGI = CX.map((c) => persegiPanjang(c - SISI / 2, PY, SISI, SISI));
export const GARIS_PERSEGI: [Titik, Titik][] = [
  [[CX[0], PY - 8], [CX[0], PY + SISI + 8]],
  [[CX[1] + 40, PY + SISI / 2], [CX[1] - 40, PY + SISI / 2]],
  [[CX[2] - SISI / 2, PY], [CX[2] + SISI / 2, PY + SISI]],
];
const PG = [0, 1, 2].map((i) => bendaBagi(i + 1, POLI_PERSEGI[i], GARIS_PERSEGI[i][0], GARIS_PERSEGI[i][1], "#BBF7D0", "#FCA5A5", "#93C5FD"));
const tarikPg = (i: number) => tarik(i + 1, GARIS_PERSEGI[i][0], GARIS_PERSEGI[i][1], 5);

const SUARA_P1 = "Sekarang kita lihat persegi. Persegi punya empat sisi yang sama panjang. Ada tiga persegi di layar.";
const SUARA_P2 = "Persegi pertama dipotong dengan garis tegak di tengah. Hasilnya dua bagian sama besar.";
const SUARA_P3 = "Persegi kedua dipotong dengan garis mendatar di tengah. Hasilnya juga dua bagian sama besar.";
const SUARA_P4 = "Persegi ketiga dipotong dengan garis miring dari pojok ke pojok. Hasilnya dua segitiga yang sama besar.";
const SUARA_P5 = "Semua potongan ini membagi persegi menjadi dua bagian sama besar, jadi tiap bagian adalah setengah.";
const SUARA_P6 = "Bentuk potongannya berbeda, ada persegi panjang dan ada segitiga. Tapi tiap bagian tetap setengah.";

const potongPersegi = (i: number, suara: string, pemicu: string, hasil: string): ReturnType<typeof tambah>[] => [
  tambah(idx(suara, "garis"), PG[i].gp),
  hapus(idx(suara, pemicu), `bn${i + 1}-w`),
  tambah(idx(suara, pemicu), PG[i].a, PG[i].b),
  ubah(idx(suara, pemicu), ...tarikPg(i)),
  tambah(idx(suara, hasil), hasilBagi(i + 1, CX[i], 146, "sama besar", 9)),
];

export const ADEGAN_PERSEGI: AdeganStory = {
  id: "persegi",
  judul: "Setengah pada persegi",
  sumber: "Materi: setengah pada persegi",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Setengah pada persegi")),
      tambah(idx(SUARA_P1, "persegi."), PG[0].w),
      tambah(idx(SUARA_P1, "tiga"), PG[1].w),
      tambah(idx(SUARA_P1, "layar."), PG[2].w),
    ),
    k(SUARA_P2, ...potongPersegi(0, SUARA_P2, "tengah.", "Hasilnya")),
    k(SUARA_P3, ...potongPersegi(1, SUARA_P3, "tengah.", "Hasilnya")),
    k(SUARA_P4, ...potongPersegi(2, SUARA_P4, "pojok.", "Hasilnya")),
    k(SUARA_P5, ubah(idx(SUARA_P5, "tiap"), { id: "bn1-hs", isi: "setengah" }, { id: "bn2-hs", isi: "setengah" }, { id: "bn3-hs", isi: "setengah" })),
    k(SUARA_P6, tambah(idx(SUARA_P6, "Tapi"), ...kartu("bk", 30, 164, 240, 28, W.emas, ["bentuk beda, tetap setengah"], 11))),
  ],
};
