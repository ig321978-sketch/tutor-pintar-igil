import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, hasilBanding, kartu, kartuBanding, pilih, tandaSaja, teks } from "./k2b7B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b7B-luar-1";

/* ------------------------------ 6. Tanda Banding: konsep ------------------------------ */
const SUARA_N1 = "Metode ketiga bernama Tanda Banding. Ada tiga tanda: lebih besar, lebih kecil, dan sama dengan.";
const SUARA_N2 = "Tanda ini seperti mulut buaya. Mulutnya terbuka ke bilangan yang lebih besar.";
const SUARA_N3 = "Dua puluh tujuh lebih kecil dari tujuh puluh dua, jadi tandanya ikut berbalik.";
const SUARA_N4 = "Kalau kedua bilangan sama, kita memakai tanda sama dengan. Empat puluh lima sama dengan empat puluh lima.";
const TANDA_3: [string, string][] = [
  [">", "lebih besar"],
  ["<", "lebih kecil"],
  ["=", "sama dengan"],
];
const kotakTanda = (i: number): Obj[] => {
  const x = 18 + i * 88;
  return [
    { id: `tn${i + 1}-k`, t: "kotak", x, y: 50, w: 84, h: 76, warna: WARNA_METODE[i], garis: W.biru, rx: 8, tebal: 1.5 },
    teks(`tn${i + 1}-s`, x + 42, 92, TANDA_3[i][0], 40, W.merah),
    teks(`tn${i + 1}-l`, x + 42, 116, TANDA_3[i][1], 10, W.biru),
  ];
};

export const ADEGAN_LUAR_TANDA: AdeganStory = {
  id: "luar-tanda",
  judul: "Tanda Banding: konsep",
  sumber: "Metode luar: Tanda Banding",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_N1, tambah(0, kepala(2)), tambah(idx(SUARA_N1, "besar"), kotakTanda(0)), tambah(idx(SUARA_N1, "kecil"), kotakTanda(1)), tambah(idx(SUARA_N1, "sama"), kotakTanda(2))),
    k(
      SUARA_N2,
      hapus(0, ...[1, 2, 3].flatMap((i) => [`tn${i}-k`, `tn${i}-s`, `tn${i}-l`])),
      tambah(0, kartuBanding(72, 27, 44), hasilBanding(72, 27, 82, 128)),
      tambah(idx(SUARA_N2, "buaya"), emo("bu", 150, 190, "\u{1F40A}", 28)),
    ),
    k(SUARA_N3, ubah(0, { id: "bd-a-t", isi: "27" }, { id: "bd-b-t", isi: "72" }, { id: "bd-s", isi: "<" }, { id: "bd-kata", isi: "lebih kecil dari" }, { id: "bd-ls", isi: "lihat puluhan dulu" })),
    k(SUARA_N4, ubah(0, { id: "bd-a-t", isi: "45" }, { id: "bd-b-t", isi: "45" }, { id: "bd-s", isi: "=" }, { id: "bd-kata", isi: "sama dengan" }, { id: "bd-ls", isi: "puluhan dan satuan sama" })),
  ],
};

/* ------------------------------ 7. Tanda Banding: terapan ------------------------------ */
const SUARA_D1 = "Sekarang pilih tandanya. Lihat bilangan lima puluh delapan dan enam puluh tiga.";
const SUARA_D2 = "Mulut tanda terbuka ke bilangan yang lebih besar. Ketuk tanda yang tepat.";
const SUARA_D3 = "Betul! Lima puluh delapan lebih kecil dari enam puluh tiga, jadi mulut terbuka ke kanan.";

export const ADEGAN_LUAR_TANDA_TERAPAN: AdeganStory = {
  id: "luar-tanda-terapan",
  judul: "Tanda Banding: coba sendiri",
  sumber: "Metode luar: Tanda Banding",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_D1, tambah(0, kepala(2)), tambah(idx(SUARA_D1, "bilangan"), kartuBanding(58, 63, 40))),
    k(SUARA_D2, tambah(idx(SUARA_D2, "Ketuk"), pilih(112, ["<", ">", "="], 26, 34))),
    k(SUARA_D3, sorotkan(idx(SUARA_D3, "Betul"), "c1-k"), tambah(idx(SUARA_D3, "jadi"), tandaSaja(58, 63, 78), ...hasilBanding(58, 63, 78, 166).slice(1))),
  ],
};

/* ------------------------------ 8. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ingat tiga metode dari luar. Pertama, Banding Puluhan Dulu: lihat puluhan lebih dulu.";
const SUARA_R2 = "Kedua, Garis Bilangan Seratus: bilangan di kanan lebih besar. Ketiga, Tanda Banding: mulut terbuka ke bilangan yang lebih besar.";
const SUARA_R3 = "Sekarang kamu punya tiga cara untuk membandingkan bilangan. Terima kasih, sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, teks("jud", 150, 18, "Ringkasan", 11, W.ungu)), tambah(idx(SUARA_R1, "Pertama"), ...kartu("r0", 20, 36, 260, 44, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`, "lihat puluhan lebih dulu"], 10))),
    k(
      SUARA_R2,
      tambah(idx(SUARA_R2, "Kedua"), ...kartu("r1", 20, 86, 260, 44, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`, "kanan lebih besar"], 10)),
      tambah(idx(SUARA_R2, "Ketiga"), ...kartu("r2", 20, 136, 260, 44, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`, "mulut terbuka ke yang lebih besar"], 10)),
    ),
    k(SUARA_R3, hapus(0, "r1-k", "r1-t0", "r1-t1", "r2-k", "r2-t0", "r2-t1"), tambah(idx(SUARA_R3, "tiga"), emo("ow", 150, 120, OWL, 40)), ubah(0, { id: "r0-k", warna: W.emas })),
  ],
};
