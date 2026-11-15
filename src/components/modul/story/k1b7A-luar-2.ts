import type { AdeganStory } from "./logika-story";
import { OWL, W, X0, CW, bendaH, emo, garisAwal, garisUjung, judul, kartu, kotak, panjangH, teks } from "./k1b7A-gambar";
import { bersih, hapus, idx, isiHitung, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k1b7A-bantu";
import { kepala, WARNA_METODE, NAMA_METODE_ID } from "./k1b7A-luar-1";
import { batangNama, Y1, Y2 } from "./k1b7A-materi-1";

/** Nama benda di kiri baris benda tunggal (id `${s}-nm`). */
const namaBenda = (s: string, y: number, isi: string) => teks(`${s}-nm`, 4, y + 11, isi, 8.4, W.biru, { anchor: "start" });
const ids = (s: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${s}${dari + q}`);

/* ------------------------------ 4. Banding Panjang: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua bernama Banding Panjang. Kita meletakkan dua benda berdampingan, dengan ujung kiri di garis awal yang sama.";
const SUARA_C2 = "Lihat ujung kanannya. Ujung pita merah lebih jauh dari garis awal. Ujung pita biru lebih dekat.";
const SUARA_C3 = "Sisihkan dulu bagian yang sama panjang. Sisanya adalah bagian yang lebih panjang.";
const SUARA_C4 = "Jadi pita merah lebih panjang dari pita biru. Pita biru lebih pendek dari pita merah.";
const SUARA_C5 = "Ucapkan lagi mengikuti suara guru. Yang ujungnya paling jauh dari garis awal, itulah yang paling panjang.";
const YM = 70;
const YBI = 108;

export const ADEGAN_LUAR_BANDING: AdeganStory = {
  id: "luar-banding",
  judul: "Banding Panjang: ujung yang paling jauh",
  sumber: "Metode luar: Banding Panjang",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua", ...kepala(1)),
      tambah("meletakkan", bendaH("ua", YM, 9, W.pink), namaBenda("ua", YM, "Pita merah"), bendaH("ub", YBI, 6, W.langit), namaBenda("ub", YBI, "Pita biru")),
      tambah("garis", ...garisAwal(58, 140)),
    ),
    k(SUARA_C2, tambah("merah", garisUjung("m1", X0 + 9 * CW, 62, 134)), tambah("biru", garisUjung("m2", X0 + 6 * CW, 62, 134, W.merah))),
    k(SUARA_C3, tambah("Sisihkan", kotak("sm", X0, YM, 6 * CW, 16, W.abu, W.biru, { rx: 3, op: 0.75 })), tambah("Sisanya", kotak("ua-s", X0 + 6 * CW, YM, 3 * CW, 16, W.emas, W.biru, { rx: 3 }))),
    k(SUARA_C4, hapus(0, "sm"), tambah("Jadi", ...kartu("cj", 50, 152, 200, 28, W.hijauMuda, ["Pita merah lebih panjang"], 10))),
    k(SUARA_C5, tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 24)), tambah("paling", ...kartu("ck", 20, 152, 200, 28, W.krem, ["ujung paling jauh, paling panjang"], 8.6)), hapus("paling", "cj-k", "cj-t0")),
  ],
};

/* ------------------------------ 5. Banding Panjang: terapan ------------------------------ */
const SUARA_D1 = "Terapkan pada tiga stik. Ujung kiri ketiganya kita letakkan di garis awal yang sama.";
const SUARA_D2 = "Ujung kanan stik hijau paling jauh. Jadi stik hijau paling panjang.";
const SUARA_D3 = "Ujung kanan stik ungu paling dekat. Jadi stik ungu paling pendek. Stik kuning ada di tengah.";
const SUARA_D4 = "Pilih: stik mana yang paling panjang? Ketuk kartu hijau.";
const STIK3 = [
  { s: "ua", n: 8, y: 64, warna: W.hijauMuda, nama: "Stik hijau" },
  { s: "ub", n: 3, y: 98, warna: W.lavender, nama: "Stik ungu" },
  { s: "uc", n: 5, y: 132, warna: W.krem, nama: "Stik kuning" },
];

export const ADEGAN_LUAR_BANDING_TERAPAN: AdeganStory = {
  id: "luar-banding-terapan",
  judul: "Banding Panjang: tiga stik",
  sumber: "Metode luar: Banding Panjang, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah("Terapkan", ...kepala(1)),
      tambah("stik.", ...STIK3.flatMap((t) => [bendaH(t.s, t.y, t.n, t.warna), namaBenda(t.s, t.y, t.nama)])),
      tambah("garis", ...garisAwal(58, 152)),
    ),
    k(SUARA_D2, sorotkan(0, "ua-b"), tambah("jauh.", garisUjung("uj", X0 + 8 * CW, 60, 150))),
    k(SUARA_D3, redamkan(0, "ua-b"), sorotkan("dekat.", "ub-b"), ubah("tengah.", { id: "uj", warna: W.abu })),
    k(SUARA_D4, redamkan(0, "ub-b"), tambah("Pilih:", ...pilihKata(160, ["hijau", "ungu", "kuning"])), sorotkan("Ketuk", "c1-k")),
  ],
};

/* ------------------------------ 6. Satuan Tak Baku: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga bernama Satuan Tak Baku. Kita boleh memilih satuan sendiri, misalnya klip atau stik di layar.";
const SUARA_E2 = "Pita ini kita ukur dengan klip. Satu, dua, tiga, empat, lima, enam, tujuh, delapan. Panjangnya delapan klip.";
const SUARA_E3 = "Pita yang sama kita ukur dengan stik. Satu stik sama panjang dengan dua klip. Ketuk stik: satu, dua, tiga, empat. Panjangnya empat stik.";
const SUARA_E4 = "Satuannya berbeda, jadi hasilnya berbeda. Delapan klip, atau empat stik. Panjang pita tetap sama.";
const SUARA_E5 = "Karena itu, kalau membandingkan dua benda, pakai satu jenis satuan saja. Lalu sebutkan hasilnya dengan angka dan nama satuan.";
const YP = 62;
const YK = 96;
const YS = 130;

export const ADEGAN_LUAR_SATUAN: AdeganStory = {
  id: "luar-satuan",
  judul: "Satuan Tak Baku: klip dan stik",
  sumber: "Metode luar: Satuan Tak Baku",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga", ...kepala(2)),
      tambah(idx(SUARA_E1, "klip"), kotak("lg1", 60, 90, CW, 16, W.langit, W.biru, { rx: 1, tebal: 1.3 }), teks("lg1-t", 69, 118, "klip", 9.6, W.ungu)),
      tambah(idx(SUARA_E1, "stik"), kotak("lg2", 160, 90, 2 * CW, 16, W.krem, W.biru, { rx: 1, tebal: 1.3 }), teks("lg2-t", 178, 118, "stik", 9.6, W.ungu)),
    ),
    k(
      SUARA_E2,
      hapus(0, "lg1", "lg1-t", "lg2", "lg2-t"),
      tambah("Pita", bendaH("ua", YP, 8, W.pink), teks("ua-nm", 4, YP + 11, "Pita", 8.4, W.biru, { anchor: "start" })),
      tambah("ukur", ...garisAwal(54, 160)),
      ...isiHitung(SUARA_E2, "ua", YK, 8, W.langit, { setelah: "klip." }),
      tambah(idx(SUARA_E2, "delapan", 2), panjangH("ua", YK, 8, "8 klip")),
    ),
    k(
      SUARA_E3,
      hapus(0, "tg"),
      ...isiHitung(SUARA_E3, "ub", YS, 4, W.krem, { setelah: "klip.", cw: 2 * CW, tangan: false }),
      tambah(idx(SUARA_E3, "empat", 2), panjangH("ub", YS, 4, "4 stik", X0, 2 * CW)),
    ),
    k(SUARA_E4, tambah("Satuannya", garisUjung("uj", X0 + 8 * CW, 58, 150)), tambah("Delapan", ...kartu("sk", 50, 160, 200, 28, W.emas, ["8 klip, atau 4 stik"], 10.6))),
    k(SUARA_E5, hapus(0, "sk-k", "sk-t0"), tambah("pakai", ...kartu("sp", 30, 158, 240, 38, W.hijauMuda, ["pakai satu jenis satuan,", "sebut: angka dan nama satuan"], 9.6)), tambah("Karena", emo("ow", 262, 80, OWL, 22))),
  ],
};

/* ------------------------------ 7. Satuan Tak Baku: terapan ------------------------------ */
const SUARA_F1 = "Terapkan pada dua tali. Kita ukur keduanya dengan satuan yang sama, yaitu sedotan di layar.";
const SUARA_F2 = "Tali hijau panjangnya lima sedotan. Tali merah panjangnya tujuh sedotan.";
const SUARA_F3 = "Tali merah lebih panjang dari tali hijau. Tali merah lebih panjang dua sedotan dari tali hijau.";
const SUARA_F4 = "Sebutkan hasilnya dengan angka dan nama satuan. Tali merah, tujuh sedotan. Tali hijau, lima sedotan.";

export const ADEGAN_LUAR_SATUAN_TERAPAN: AdeganStory = {
  id: "luar-satuan-terapan",
  judul: "Satuan Tak Baku: tali dan sedotan",
  sumber: "Metode luar: Satuan Tak Baku, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah("Terapkan", ...kepala(2)),
      tambah("tali.", ...batangNama("ua", Y1, 5, W.hijauMuda, "Tali hijau"), ...batangNama("ub", Y2, 7, W.merahMuda, "Tali merah")),
      tambah("satuan", ...garisAwal(58, 150)),
    ),
    k(SUARA_F2, tambah(idx(SUARA_F2, "lima"), panjangH("ua", Y1, 5, "5 sedotan")), tambah(idx(SUARA_F2, "tujuh"), panjangH("ub", Y2, 7, "7 sedotan"))),
    k(SUARA_F3, sorotkan("lebih", ...ids("ub", 0, 6)), ubah("dua", ...ids("ub", 5, 6).map((id) => ({ id, warna: W.emas })))),
    k(SUARA_F4, redamkan(0, ...ids("ub", 0, 6)), tambah("Tali", ...kartu("hs", 30, 156, 240, 40, W.krem, ["tali merah: 7 sedotan", "tali hijau: 5 sedotan"], 10))),
  ],
};

/* ------------------------------ 8. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Metode pertama, Ulangi Satuan Panjang. Ketuk satuan satu demi satu, rapat dari garis awal, lalu hitung.";
const SUARA_R2 = "Metode kedua, Banding Panjang. Letakkan dua benda dari garis awal yang sama, lalu lihat ujung yang lebih jauh.";
const SUARA_R3 = "Metode ketiga, Satuan Tak Baku. Pilih satu jenis satuan, lalu sebutkan hasilnya dengan angka dan nama satuan.";
const SUARA_R4 = "Ketiganya membantu kita membandingkan panjang dengan benar. Hebat sekali, sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan: tiga metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("pertama,", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], [NAMA_METODE_ID[0], "ketuk satuan, lalu hitung"], 9.6))),
    k(SUARA_R2, tambah("kedua,", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], [NAMA_METODE_ID[1], "lihat ujung yang lebih jauh"], 9.6))),
    k(SUARA_R3, tambah("ketiga,", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], [NAMA_METODE_ID[2], "angka dan nama satuan"], 9.6))),
    k(SUARA_R4, bersih(0), tambah(0, judul("Sampai jumpa lagi!"), emo("sj", 150, 100, OWL, 50)), tambah("sekali,", emo("pa", 70, 160, "\u{1F31F}", 30), emo("pb", 230, 160, "\u{1F31F}", 30))),
  ],
};

