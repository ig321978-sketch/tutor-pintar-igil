import type { AdeganStory } from "./logika-story";
import { BUAYA, GX_KANAN, GX_KIRI, KUPU, LEBAH, W, emo, hasilBanding, judul, kalimatBanding, kartu, kartuBanding, keteranganKumpulan, kumpulan, labelPenanda, legenda, penanda, sumbu, sumbuSatuan, teks, ubahBanding } from "./k2b7B-gambar";
import { bersih, idx, k, redamKumpulan, sorotKumpulan, sorotkan, tambah, ubah } from "./k2b7B-bantu";

/** Letak tanda dan kata banding pada kartu bilangan yang berpojok atas di tinggi 48. */
export const Y_TANDA = 86;
export const Y_KATA = 128;

/* ------------------------------ 7. Beda puluhan: lima puluh enam dan enam puluh lima ------------------------------ */
const SUARA_P1 = "Halim mempunyai lima puluh enam kelereng. Satu kantong berisi sepuluh kelereng.";
const SUARA_P2 = "Malosi mempunyai enam puluh lima kelereng.";
const SUARA_P3 = "Kelereng siapa yang lebih banyak? Kita lihat dulu kantongnya.";
const SUARA_P4 = "Halim punya lima puluhan dan enam satuan. Malosi punya enam puluhan dan lima satuan.";
const SUARA_P5 = "Enam puluhan lebih banyak dari lima puluhan. Jadi lima puluh enam lebih kecil dari enam puluh lima.";

export const ADEGAN_BANDING_PULUHAN: AdeganStory = {
  id: "banding-puluhan",
  judul: "Membandingkan: puluhan berbeda",
  sumber: "Materi: puluhan lebih dulu",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Siapa lebih banyak?")), tambah(idx(SUARA_P1, "mempunyai"), kumpulan("a", 56, GX_KIRI, 44, "Halim")), tambah(idx(SUARA_P1, "kantong"), legenda())),
    k(SUARA_P2, tambah(idx(SUARA_P2, "mempunyai"), kumpulan("b", 65, GX_KANAN, 44, "Malosi"))),
    k(SUARA_P3, sorotKumpulan(idx(SUARA_P3, "kantongnya"), "a", 56, true, false), sorotKumpulan(idx(SUARA_P3, "kantongnya"), "b", 65, true, false)),
    k(
      SUARA_P4,
      redamKumpulan(0, "a", 56, true, false),
      redamKumpulan(0, "b", 65, true, false),
      tambah(idx(SUARA_P4, "satuan"), keteranganKumpulan("a", 56, GX_KIRI)),
      tambah(idx(SUARA_P4, "satuan", 2), keteranganKumpulan("b", 65, GX_KANAN)),
    ),
    k(SUARA_P5, tambah(idx(SUARA_P5, "Jadi"), hasilBanding(56, 65, 92, 146)), sorotKumpulan(idx(SUARA_P5, "lebih"), "b", 65, true, false)),
  ],
};

/* ------------------------------ 8. Puluhan sama: lihat satuan ------------------------------ */
const SUARA_Q1 = "Wei mempunyai lima puluh empat kelereng. Upe mempunyai lima puluh delapan kelereng.";
const SUARA_Q2 = "Lihat kantongnya. Keduanya punya lima puluhan, jadi puluhannya sama.";
const SUARA_Q3 = "Karena puluhannya sama, kita lihat satuannya. Satuan Wei empat, satuan Upe delapan.";
const SUARA_Q4 = "Delapan satuan lebih banyak dari empat satuan. Jadi lima puluh empat lebih kecil dari lima puluh delapan.";

export const ADEGAN_PULUHAN_SAMA: AdeganStory = {
  id: "puluhan-sama",
  judul: "Membandingkan: puluhan sama",
  sumber: "Materi: puluhan sama, lihat satuan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Puluhan yang sama")), tambah(idx(SUARA_Q1, "Wei"), kumpulan("a", 54, GX_KIRI, 44, "Wei")), tambah(idx(SUARA_Q1, "Upe"), kumpulan("b", 58, GX_KANAN, 44, "Upe"))),
    k(
      SUARA_Q2,
      sorotKumpulan(idx(SUARA_Q2, "kantongnya"), "a", 54, true, false),
      sorotKumpulan(idx(SUARA_Q2, "kantongnya"), "b", 58, true, false),
      tambah(idx(SUARA_Q2, "lima"), keteranganKumpulan("a", 54, GX_KIRI), keteranganKumpulan("b", 58, GX_KANAN)),
    ),
    k(
      SUARA_Q3,
      redamKumpulan(0, "a", 54, true, false),
      redamKumpulan(0, "b", 58, true, false),
      sorotKumpulan(idx(SUARA_Q3, "Satuan"), "a", 54, false, true),
      sorotKumpulan(idx(SUARA_Q3, "Satuan"), "b", 58, false, true),
    ),
    k(SUARA_Q4, redamKumpulan(0, "a", 54, false, true), redamKumpulan(0, "b", 58, false, true), tambah(idx(SUARA_Q4, "Jadi"), hasilBanding(54, 58, 92, 146))),
  ],
};

/* ------------------------------ 9. Tiga kata untuk membandingkan ------------------------------ */
const SUARA_T1 = "Ada tiga kata untuk membandingkan dua bilangan: lebih besar dari, lebih kecil dari, dan sama dengan.";
const SUARA_T2 = "Pertama, lebih besar dari. Enam puluh lima lebih besar dari lima puluh enam.";
const SUARA_T3 = "Kedua, lebih kecil dari. Lima puluh enam lebih kecil dari enam puluh lima.";
const SUARA_T4 = "Ketiga, sama dengan. Lima puluh enam sama dengan lima puluh enam.";

export const ADEGAN_KATA: AdeganStory = {
  id: "tiga-kata",
  judul: "Tiga kata untuk membandingkan",
  sumber: "Materi: kata perbandingan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tiga kata")),
      tambah(idx(SUARA_T1, "besar"), ...kartu("kt1", 30, 36, 240, 32, W.hijauMuda, ["lebih besar dari"], 12)),
      tambah(idx(SUARA_T1, "kecil"), ...kartu("kt2", 30, 80, 240, 32, W.pink, ["lebih kecil dari"], 12)),
      tambah(idx(SUARA_T1, "sama"), ...kartu("kt3", 30, 124, 240, 32, W.langit, ["sama dengan"], 12)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Lebih besar dari"), kartuBanding(65, 56), hasilBanding(65, 56, Y_TANDA, Y_KATA)),
    ),
    k(SUARA_T3, ubah(0, ...ubahBanding(56, 65)), ubah(0, { id: "jud", isi: "Lebih kecil dari" })),
    k(SUARA_T4, ubah(0, ...ubahBanding(56, 56)), ubah(0, { id: "jud", isi: "Sama dengan" })),
  ],
};

/* ------------------------------ 10. Tanda yang seperti mulut buaya ------------------------------ */
const SUARA_U1 = "Ada tanda yang membantu kita membandingkan. Tandanya mirip mulut buaya yang lapar.";
const SUARA_U2 = "Mulut buaya selalu terbuka ke bilangan yang lebih besar.";
const SUARA_U3 = "Kalau bilangan yang besar ada di kanan, mulut buaya terbuka ke kanan.";
const SUARA_U4 = "Kalau kedua bilangan sama, kita memakai tanda sama dengan.";

export const ADEGAN_TANDA: AdeganStory = {
  id: "tanda-buaya",
  judul: "Tanda seperti mulut buaya",
  sumber: "Materi: tanda perbandingan",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Tanda perbandingan")),
      tambah(idx(SUARA_U1, "tanda"), teks("tx-a", 60, 118, ">", 50, W.merah), teks("tx-b", 240, 118, "<", 50, W.merah)),
      tambah(idx(SUARA_U1, "buaya"), emo("bu", 150, 120, BUAYA, 56)),
    ),
    k(
      SUARA_U2,
      { at: 0, hapus: ["tx-a", "tx-b", "bu"] },
      tambah(0, kartuBanding(65, 56), hasilBanding(65, 56, Y_TANDA, Y_KATA)),
      tambah(idx(SUARA_U2, "Mulut"), emo("bu", 150, 186, BUAYA, 28)),
    ),
    k(SUARA_U3, ubah(0, ...ubahBanding(56, 65))),
    k(SUARA_U4, ubah(0, ...ubahBanding(48, 48))),
  ],
};

/* ------------------------------ 10b. Membandingkan dengan garis bilangan ------------------------------ */
const S_BG = sumbuSatuan(60, 7, 100);
const SUARA_H1 = "Kita juga bisa membandingkan bilangan dengan garis bilangan. Kupu-kupu hinggap di enam puluh satu.";
const SUARA_H2 = "Lebah hinggap di enam puluh empat. Siapa yang ada di sebelah kanan?";
const SUARA_H3 = "Lebah ada di sebelah kanan, jadi enam puluh empat lebih besar dari enam puluh satu.";
const SUARA_H4 = "Kupu-kupu ada di sebelah kiri, jadi enam puluh satu lebih kecil dari enam puluh empat.";

export const ADEGAN_BANDING_GARIS: AdeganStory = {
  id: "banding-garis",
  judul: "Membandingkan dengan garis bilangan",
  sumber: "Materi: banding dengan garis bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Banding di garis")), tambah(0, sumbu(S_BG)), tambah(idx(SUARA_H1, "Kupu-kupu"), penanda(S_BG, 61, KUPU)), tambah(idx(SUARA_H1, "satu"), labelPenanda("Kupu-kupu di 61", 142))),
    k(SUARA_H2, tambah(idx(SUARA_H2, "Lebah"), penanda(S_BG, 64, LEBAH, true)), tambah(idx(SUARA_H2, "empat"), labelPenanda("Lebah di 64", 158, true))),
    k(SUARA_H3, sorotkan(idx(SUARA_H3, "kanan,"), "gb-m2"), tambah(idx(SUARA_H3, "jadi"), kalimatBanding(64, 61, 182))),
    k(SUARA_H4, ubah(0, { id: "gb-m2", sorot: false }), sorotkan(idx(SUARA_H4, "kiri,"), "gb-m"), tambah(idx(SUARA_H4, "jadi"), kalimatBanding(61, 64, 182))),
  ],
};
