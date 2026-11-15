import type { Aksi, AdeganStory } from "./logika-story";
import { W, judul, kartu, kartuAngka, papan } from "./k3b1B-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1B-bantu";

/* ------------------------------ 4. Angka sama, nilai berbeda ------------------------------ */
const OP = { x0: 14, w: 60, gap: 2, h: 30, u: 22 };
const QA = papan("qa", "600", { ...OP, y0: 44, nilaiY: 88 });
const QB = papan("qb", " 60", { ...OP, y0: 96, nilaiY: 140 });
const QC = papan("qc", "  6", { ...OP, y0: 148, nilaiY: 192 });
const SUARA_S1 = "Perhatikan angka enam. Angka enam bisa ada di tempat yang berbeda.";
const SUARA_S2 = "Pada bilangan enam ratus, angka enam ada di ratusan, jadi nilainya enam ratus.";
const SUARA_S3 = "Pada bilangan enam puluh, angka enam ada di puluhan, jadi nilainya enam puluh.";
const SUARA_S4 = "Pada bilangan enam, angka enam ada di satuan, jadi nilainya enam.";
const SUARA_S5 = "Angkanya sama, yaitu enam. Tetapi nilainya berbeda, yaitu enam ratus, enam puluh, dan enam.";

export const ADEGAN_ANGKA_SAMA: AdeganStory = {
  id: "angka-sama",
  judul: "Angka sama, nilai berbeda",
  sumber: "Materi: angka sama, nilai berbeda",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Angka enam"), ...QA.dasar), tambah(idx(SUARA_S1, "enam"), QA.digit(0)), tambah("berbeda.", QA.digit(1), QA.digit(2))),
    k(SUARA_S2, sorotkan("Pada", "qa_d0"), tambah("nilainya", QA.nilai(0))),
    k(SUARA_S3, redamkan(0, "qa_d0"), tambah(0, QB.kolom(0), QB.kolom(1), QB.kolom(2)), tambah("enam", QB.digit(1), QB.digit(2)), sorotkan("angka", "qb_d1"), tambah("nilainya", QB.nilai(1))),
    k(SUARA_S4, redamkan(0, "qb_d1"), tambah(0, QC.kolom(0), QC.kolom(1), QC.kolom(2)), tambah("enam", QC.digit(2)), sorotkan("angka", "qc_d2"), tambah("nilainya", QC.nilai(2))),
    k(SUARA_S5, sorotkan("Angkanya", "qa_d0", "qb_d1", "qc_d2"), tambah("berbeda,", ...kartu("sb", 208, 100, 84, 40, W.emas, ["angka sama,", "nilai beda"], 8.6))),
  ],
};

/* ------------------------------ 5. Angka delapan ada di mana ------------------------------ */
const PE = papan("te", "981", { y0: 52, h: 50 });
const SUARA_E1 = "Halim mencari angka delapan. Bilangan sembilan ratus delapan puluh satu.";
const SUARA_E2 = "Angka delapan ada di tempat puluhan, yaitu tempat di tengah.";
const SUARA_E3 = "Sekarang bilangan delapan ratus empat puluh lima. Angka delapan ada di ratusan.";
const SUARA_E4 = "Lalu bilangan seratus delapan. Angka delapan ada di satuan.";
const SUARA_E5 = "Terakhir bilangan delapan ratus. Angka delapan ada di ratusan, dan puluhan serta satuannya nol.";

export const ADEGAN_TEMPAT_ANGKA: AdeganStory = {
  id: "tempat-angka",
  judul: "Angka delapan ada di mana",
  sumber: "Materi: mencari tempat angka",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Angka delapan di mana?"), ...PE.dasar), tambah("sembilan", PE.digit(0)), tambah(idx(SUARA_E1, "delapan", 2), PE.digit(1)), tambah("satu.", PE.digit(2))),
    k(SUARA_E2, sorotkan("Angka", "te_d1")),
    k(
      SUARA_E3,
      redamkan(0, "te_d1"),
      ubah(idx(SUARA_E3, "delapan"), { id: "te_d0", isi: "8" }),
      ubah(idx(SUARA_E3, "empat"), { id: "te_d1", isi: "4" }),
      ubah(idx(SUARA_E3, "lima"), { id: "te_d2", isi: "5" }),
      sorotkan("Angka", "te_d0"),
    ),
    k(SUARA_E4, redamkan(0, "te_d0"), ubah("seratus", { id: "te_d0", isi: "1" }, { id: "te_d1", isi: "0" }), ubah("delapan", { id: "te_d2", isi: "8" }), sorotkan("Angka", "te_d2")),
    k(SUARA_E5, redamkan(0, "te_d2"), ubah(idx(SUARA_E5, "delapan"), { id: "te_d0", isi: "8" }), ubah(idx(SUARA_E5, "ratus"), { id: "te_d1", isi: "0" }, { id: "te_d2", isi: "0" }), sorotkan("Angka", "te_d0")),
  ],
};

/* ------------------------------ 6. Peran angka nol ------------------------------ */
const NL = papan("nl", "805", { y0: 38, h: 40, u: 26, nilaiY: 94 });
const NM = papan("nm", " 85", { y0: 114, h: 40, u: 26 });
const SUARA_N1 = "Ada angka yang istimewa, yaitu nol. Lihat bilangan delapan ratus lima.";
const SUARA_N2 = "Di tempat puluhan ada angka nol. Nol berarti tidak ada puluhan.";
const SUARA_N3 = "Angka nol di puluhan bernilai nol. Namun nol tetap penting, karena menjaga tempat.";
const SUARA_N4 = "Kalau nol dibuang, angkanya bergeser. Delapan ratus lima menjadi delapan puluh lima.";
const SUARA_N5 = "Jadi nol menjaga angka lain tetap di tempatnya. Tanpa nol, bilangannya berubah.";

export const ADEGAN_PERAN_NOL: AdeganStory = {
  id: "peran-nol",
  judul: "Peran angka nol",
  sumber: "Materi: peran angka nol",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Peran angka nol"), ...NL.dasar), tambah("delapan", NL.digit(0)), tambah(idx(SUARA_N1, "ratus"), NL.digit(1)), tambah(idx(SUARA_N1, "lima"), NL.digit(2))),
    k(SUARA_N2, sorotkan("Di", "nl_d1")),
    k(SUARA_N3, tambah("bernilai", NL.nilai(1))),
    k(SUARA_N4, redamkan(0, "nl_d1"), tambah(0, NM.kolom(0), NM.kolom(1), NM.kolom(2)), tambah(idx(SUARA_N4, "delapan", 2), NM.digit(1)), tambah(idx(SUARA_N4, "lima", 2), NM.digit(2))),
    k(SUARA_N5, tambah("Tanpa", ...kartu("nz", 30, 166, 240, 28, W.emas, ["nol menjaga tempat"], 10))),
  ],
};

/* ------------------------------ 7. Kartu angka dan tiga kotak ------------------------------ */
const KB = papan("kb", "346", { y0: 118, h: 50, u: 32 });
/** Kartu di baki: isi 4, 6, 3 (id kc0, kc1, kc2); tujuan tempat 1, 2, 0. */
const KARTU = [
  { id: "kc0", isi: "4", x: 36, tujuan: 1, warna: W.langit },
  { id: "kc1", isi: "6", x: 122, tujuan: 2, warna: W.merahMuda },
  { id: "kc2", isi: "3", x: 208, tujuan: 0, warna: W.hijauMuda },
];
const kartuBaki = (c: (typeof KARTU)[number]) => kartuAngka(c.id, c.x, 40, c.isi, c.warna, 56, 36, 22);
const keKotak = (c: (typeof KARTU)[number], at: string | number): Aksi => ({
  at,
  ubah: [
    { id: `${c.id}-k`, x: KB.xPusat(c.tujuan) - 28, y: 125 },
    { id: `${c.id}-t`, x: KB.xPusat(c.tujuan), y: 125 + 18 + 22 * 0.35 },
  ],
});
const SUARA_K1 = "Malosi punya tiga kotak. Kotaknya bernama ratusan, puluhan, dan satuan.";
const SUARA_K2 = "Malosi juga punya tiga kartu angka. Ada kartu empat, kartu enam, dan kartu tiga.";
const SUARA_K3 = "Malosi mau menyusun satu bilangan. Pertama, kartu tiga diseret ke kotak ratusan.";
const SUARA_K4 = "Kedua, kartu empat diseret ke kotak puluhan.";
const SUARA_K5 = "Ketiga, kartu enam diseret ke kotak satuan.";
const SUARA_K6 = "Sekarang semua kotak terisi. Terbentuk bilangan tiga ratus empat puluh enam.";

export const ADEGAN_KARTU_KOTAK: AdeganStory = {
  id: "kartu-kotak",
  judul: "Kartu angka masuk tiga kotak",
  sumber: "Materi: kartu angka dan tiga kotak",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Tiga kotak dan kartu"), ...KB.dasar)),
    k(SUARA_K2, tambah("empat,", ...kartuBaki(KARTU[0])), tambah("enam,", ...kartuBaki(KARTU[1])), tambah(idx(SUARA_K2, "tiga", 2), ...kartuBaki(KARTU[2]))),
    k(SUARA_K3, keKotak(KARTU[2], "diseret")),
    k(SUARA_K4, keKotak(KARTU[0], "diseret")),
    k(SUARA_K5, keKotak(KARTU[1], "diseret")),
    k(
      SUARA_K6,
      hapus(idx(SUARA_K6, "tiga"), "kc2-k", "kc2-t"),
      tambah(idx(SUARA_K6, "tiga"), KB.digit(0)),
      hapus(idx(SUARA_K6, "empat"), "kc0-k", "kc0-t"),
      tambah(idx(SUARA_K6, "empat"), KB.digit(1)),
      hapus(idx(SUARA_K6, "enam"), "kc1-k", "kc1-t"),
      tambah(idx(SUARA_K6, "enam"), KB.digit(2), KB.utuh(194, 18)),
    ),
  ],
};
