import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kartuAngka, papan, teks, uraian } from "./k3b1B-gambar";
import { idx, k, redamkan, sorotkan, tambah } from "./k3b1B-bantu";

/* ------------------------------ 8. Menyusun bilangan ------------------------------ */
const SA = papan("sa", "251", { y0: 44, h: 40, u: 26, nilaiY: 118 });
const cn = (i: number, isi: string) => teks(`sa_cn${i}`, SA.xPusat(i), 102, isi, 9, W.biru);
const SUARA_U1 = "Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan. Kita coba dengan dua ratus lima puluh satu.";
const SUARA_U2 = "Dua ratusan, lima puluhan, dan satu satuan.";
const SUARA_U3 = "Nilai dua ratusan adalah dua ratus. Nilai lima puluhan adalah lima puluh. Nilai satu satuan adalah satu.";
const SUARA_U4 = "Sekarang kita jumlahkan nilainya. Dua ratus tambah lima puluh tambah satu.";
const SUARA_U5 = "Hasilnya dua ratus lima puluh satu. Bilangan yang kita susun adalah dua ratus lima puluh satu.";

export const ADEGAN_SUSUN: AdeganStory = {
  id: "susun",
  judul: "Menyusun bilangan dari tiga nilai",
  sumber: "Materi: menyusun bilangan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Menyusun bilangan"), ...SA.dasar), tambah(idx(SUARA_U1, "dua"), SA.digit(0)), tambah(idx(SUARA_U1, "lima"), SA.digit(1)), tambah(idx(SUARA_U1, "satu"), SA.digit(2))),
    k(SUARA_U2, tambah(idx(SUARA_U2, "Dua"), cn(0, "2 ratusan")), tambah(idx(SUARA_U2, "lima"), cn(1, "5 puluhan")), tambah(idx(SUARA_U2, "satu"), cn(2, "1 satuan"))),
    k(SUARA_U3, tambah(idx(SUARA_U3, "ratus"), SA.nilai(0)), tambah(idx(SUARA_U3, "puluh"), SA.nilai(1)), tambah(idx(SUARA_U3, "satu", 2), SA.nilai(2))),
    k(SUARA_U4, tambah(idx(SUARA_U4, "satu"), uraian("sa", 152, "200 + 50 + 1 = 251", 15))),
    k(SUARA_U5, tambah(idx(SUARA_U5, "susun"), SA.utuh(186, 20)), tambah("Hasilnya", emo("ok", 262, 190, "✅", 22))),
  ],
};

/* ------------------------------ 9. Kira menyusun dari kartu nilai ------------------------------ */
const SB = papan("sb", "684", { y0: 104, h: 40, u: 26 });
const NILAI_B = [
  ["kv0", "600", W.hijauMuda],
  ["kv1", "80", W.langit],
  ["kv2", "4", W.merahMuda],
] as const;
const kv = (i: number) => kartuAngka(NILAI_B[i][0], 20 + i * 88, 36, NILAI_B[i][1], NILAI_B[i][2], 84, 36, 20);
const SUARA_V1 = "Kira punya tiga nilai. Enam ratus, delapan puluh, dan empat.";
const SUARA_V2 = "Enam ratus ditaruh di ratusan. Delapan puluh ditaruh di puluhan. Empat ditaruh di satuan.";
const SUARA_V3 = "Kira membaca angka pada papan dari kiri ke kanan. Enam, delapan, empat.";
const SUARA_V4 = "Bilangan yang tersusun adalah enam ratus delapan puluh empat. Nilainya dijumlahkan, jadi hasilnya sama.";

export const ADEGAN_SUSUN_LAIN: AdeganStory = {
  id: "susun-lain",
  judul: "Kira menyusun dari tiga kartu nilai",
  sumber: "Materi: menyusun dari kartu nilai",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_V1, tambah(0, judul("Kira menyusun bilangan")), tambah(idx(SUARA_V1, "Enam"), ...kv(0)), tambah(idx(SUARA_V1, "delapan"), ...kv(1)), tambah(idx(SUARA_V1, "empat"), ...kv(2))),
    k(SUARA_V2, tambah(0, ...SB.dasar), tambah(idx(SUARA_V2, "Enam"), SB.digit(0)), tambah(idx(SUARA_V2, "Delapan"), SB.digit(1)), tambah(idx(SUARA_V2, "Empat"), SB.digit(2))),
    k(
      SUARA_V3,
      sorotkan(idx(SUARA_V3, "Enam"), "sb_d0"),
      redamkan(idx(SUARA_V3, "delapan"), "sb_d0"),
      sorotkan(idx(SUARA_V3, "delapan"), "sb_d1"),
      redamkan(idx(SUARA_V3, "empat"), "sb_d1"),
      sorotkan(idx(SUARA_V3, "empat"), "sb_d2"),
      tambah(idx(SUARA_V3, "empat"), SB.utuh(168, 20)),
    ),
    k(SUARA_V4, redamkan(0, "sb_d2"), tambah("dijumlahkan,", uraian("sb", 194, "600 + 80 + 4 = 684", 14))),
  ],
};

/* ------------------------------ 10. Mengurai bilangan ------------------------------ */
const UA = papan("ua", "602", { y0: 44, h: 40, u: 26, nilaiY: 116 });
const SUARA_W1 = "Mengurai berarti memecah bilangan menjadi ratusan, puluhan, dan satuan. Kita urai enam ratus dua.";
const SUARA_W2 = "Angka enam ada di ratusan, jadi nilainya enam ratus.";
const SUARA_W3 = "Angka nol ada di puluhan, jadi nilainya nol.";
const SUARA_W4 = "Angka dua ada di satuan, jadi nilainya dua.";
const SUARA_W5 = "Jadi enam ratus dua sama dengan enam ratus tambah nol tambah dua.";
const SUARA_W6 = "Mengurai dan menyusun saling berlawanan. Dari bilangan ke nilai, atau dari nilai ke bilangan.";

export const ADEGAN_URAI: AdeganStory = {
  id: "urai",
  judul: "Mengurai bilangan enam ratus dua",
  sumber: "Materi: mengurai bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_W1, tambah(0, judul("Mengurai bilangan"), ...UA.dasar), tambah(idx(SUARA_W1, "enam"), UA.digit(0)), tambah(idx(SUARA_W1, "ratus"), UA.digit(1)), tambah(idx(SUARA_W1, "dua"), UA.digit(2))),
    k(SUARA_W2, sorotkan("Angka", "ua_d0"), tambah("nilainya", UA.nilai(0))),
    k(SUARA_W3, redamkan(0, "ua_d0"), sorotkan("Angka", "ua_d1"), tambah("nilainya", UA.nilai(1))),
    k(SUARA_W4, redamkan(0, "ua_d1"), sorotkan("Angka", "ua_d2"), tambah("nilainya", UA.nilai(2))),
    k(SUARA_W5, redamkan(0, "ua_d2"), tambah("tambah", uraian("ua", 152, "600 + 0 + 2 = 602", 15))),
    k(SUARA_W6, tambah("Dari", ...kartu("dr", 20, 166, 260, 28, W.emas, ["602 ⇄ 600 + 0 + 2"], 11))),
  ],
};

/* ------------------------------ 11. Wei mengurai tujuh ratus dua puluh tiga ------------------------------ */
const UB = papan("ub", "723", { y0: 44, h: 40, u: 26, nilaiY: 116 });
const SUARA_X1 = "Sekarang Wei mengurai bilangan tujuh ratus dua puluh tiga.";
const SUARA_X2 = "Tujuh di ratusan, nilainya tujuh ratus. Dua di puluhan, nilainya dua puluh.";
const SUARA_X3 = "Tiga di satuan, nilainya tiga. Semua nilai itu kita jumlahkan.";
const SUARA_X4 = "Jadi tujuh ratus dua puluh tiga sama dengan tujuh ratus tambah dua puluh tambah tiga.";

export const ADEGAN_URAI_LAIN: AdeganStory = {
  id: "urai-lain",
  judul: "Wei mengurai tujuh ratus dua puluh tiga",
  sumber: "Materi: mengurai bilangan lain",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_X1, tambah(0, judul("Wei mengurai bilangan"), ...UB.dasar), tambah("tujuh", UB.digit(0)), tambah(idx(SUARA_X1, "dua"), UB.digit(1)), tambah(idx(SUARA_X1, "tiga"), UB.digit(2))),
    k(SUARA_X2, sorotkan("Tujuh", "ub_d0"), tambah(idx(SUARA_X2, "nilainya", 1), UB.nilai(0)), redamkan(idx(SUARA_X2, "Dua"), "ub_d0"), sorotkan(idx(SUARA_X2, "Dua"), "ub_d1"), tambah(idx(SUARA_X2, "nilainya", 2), UB.nilai(1))),
    k(SUARA_X3, redamkan(0, "ub_d1"), sorotkan("Tiga", "ub_d2"), tambah("nilainya", UB.nilai(2))),
    k(SUARA_X4, redamkan(0, "ub_d2"), tambah("tambah", uraian("ub", 152, "700 + 20 + 3 = 723", 15))),
  ],
};

/* ------------------------------ 12. Tabel diisi dengan angka ------------------------------ */
const TB = papan("tb", "987", { y0: 44, h: 40, u: 26 });
const SALAH = [
  ["sl0", "900", W.hijauMuda],
  ["sl1", "80", W.langit],
  ["sl2", "7", W.merahMuda],
] as const;
const sl = (i: number) => kartuAngka(SALAH[i][0], 20 + i * 88, 112, SALAH[i][1], SALAH[i][2], 84, 32, 18);
const SUARA_Y1 = "Hati-hati saat mengisi tabel nilai tempat. Tabel diisi dengan angka, bukan nilai.";
const SUARA_Y2 = "Kita isi tabel untuk bilangan sembilan ratus delapan puluh tujuh.";
const SUARA_Y3 = "Angka yang diisikan adalah sembilan, delapan, dan tujuh.";
const SUARA_Y4 = "Jangan memasukkan sembilan ratus, delapan puluh, dan tujuh ke dalam tabel.";
const SUARA_Y5 = "Itu adalah nilainya, bukan angkanya. Tabel nilai tempat hanya berisi satu angka di tiap tempat.";

export const ADEGAN_TABEL_ANGKA: AdeganStory = {
  id: "tabel-angka",
  judul: "Tabel diisi dengan angka, bukan nilai",
  sumber: "Materi: mengisi tabel nilai tempat",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Isi tabel dengan angka"), ...TB.dasar)),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "sembilan"), TB.digit(0)), tambah(idx(SUARA_Y2, "delapan"), TB.digit(1)), tambah(idx(SUARA_Y2, "tujuh"), TB.digit(2))),
    k(
      SUARA_Y3,
      sorotkan(idx(SUARA_Y3, "sembilan"), "tb_d0"),
      redamkan(idx(SUARA_Y3, "delapan"), "tb_d0"),
      sorotkan(idx(SUARA_Y3, "delapan"), "tb_d1"),
      redamkan(idx(SUARA_Y3, "tujuh"), "tb_d1"),
      sorotkan(idx(SUARA_Y3, "tujuh"), "tb_d2"),
    ),
    k(SUARA_Y4, redamkan(0, "tb_d2"), tambah(idx(SUARA_Y4, "sembilan"), ...sl(0)), tambah(idx(SUARA_Y4, "delapan"), ...sl(1)), tambah(idx(SUARA_Y4, "tujuh"), ...sl(2)), tambah("tabel.", emo("sx", 28, 186, "❌", 22))),
    k(SUARA_Y5, tambah("Tabel", teks("tk", 160, 190, "tabel hanya berisi angka", 10.4, W.merah))),
  ],
};
