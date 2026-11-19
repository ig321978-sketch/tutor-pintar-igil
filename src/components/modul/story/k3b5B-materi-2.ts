import type { AdeganStory } from "./logika-story";
import { E, W, ember, emo, kotak, judul, tabel, teks, tokoh, turus } from "./k3b5B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k3b5B-bantu";

/*
 * Cerita orisinal IGIL "Tabel Bu Wulan" (Kelas 3 Bab 5 Sub-Bab B), akhir cerita Bengkel Sepeda Pak Hasan.
 * Naskah suara dari naskah/story-naskah-k3b5b.md. Bagian ini: salah hitung bundel, hitungan yang betul, dan tabel tiga kolom.
 */
const bundel = (o: ReturnType<typeof turus>) => o.filter((x) => x.id.includes("-b"));
const sisa = (o: ReturnType<typeof turus>) => o.filter((x) => x.id.includes("-s"));

/* ------------------------------ 4. Salah hitung ------------------------------ */
const SUARA_H1 = "Raka menghitung coretan miring sebagai garis tambahan, sehingga tiap bundel dihitungnya enam.";
const SUARA_H2 = "Ia berseru, enam, enam, dan tiga, jadi lima belas! Kalau salah, aku mencuci semua sepeda!";
const SUARA_H3 = "Salsa menggeleng, karena coretan miring itu sudah termasuk bagian dari lima.";
const TH = turus("th", 100, 70, 13, 30, 6);
const EM = ember("em", 85, 168);

export const ADEGAN_SALAH_HITUNG: AdeganStory = {
  id: "salah-hitung",
  judul: "Raka salah menghitung bundel",
  sumber: "Materi: salah hitung bundel",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Salah Hitung"), ...tokoh("rk", 36, 184, "Raka")),
      tambah("coretan", ...TH),
      sorotkan("miring", "th-b0m", "th-b1m"),
      tambah("enam.", teks("n6a", 110, 62, "6", 12, W.merah), teks("n6b", 141, 62, "6", 12, W.merah)),
    ),
    k(
      SUARA_H2,
      tambah("berseru,", emo("sr", 70, 142, "\u{1F4AC}", 16)),
      tambah("tiga,", teks("f1", 130, 124, "6 + 6 + 3", 11, W.biru)),
      tambah("belas!", teks("f2", 181, 124, "= 15", 11, W.merah), teks("b15", 240, 80, "15?", 24, W.merah)),
      tambah("mencuci", EM[0]),
      tambah("sepeda!", EM[1]),
    ),
    k(
      SUARA_H3,
      hapus(0, "f1", "f2", "n6a", "n6b", "sr"),
      tambah(0, ...tokoh("sl", 270, 184, "Salsa"), emo("gl", 262, 140, E.gelengan, 18)),
      tambah("karena", emo("xs", 275, 76, E.salah, 16)),
      sorotkan("miring", "th-b0m", "th-b1m"),
      tambah("termasuk", kotak("bd", 96, 64, 28, 42, undefined, W.hijau, { tebal: 2.4, rx: 5, z: 4 })),
      tambah("lima.", teks("n5", 110, 120, "5 garis", 10, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 5. Betul ------------------------------ */
const SUARA_B1 = "Salsa menunjuk satu bundel: empat tegak dan satu miring, semuanya lima.";
const SUARA_B2 = "Dua bundel berarti sepuluh, ditambah tiga garis menjadi tiga belas.";
const SUARA_B3 = "Raka cemberut dan mengambil spons, karena taruhan tetap taruhan.";
const BB = turus("bb", 100, 62, 5, 40, 9);
const BT = turus("bt", 90, 60, 13, 36, 8);
const EM3 = ember("em", 110, 168);
const BB_ID = BB.map((o) => o.id);

export const ADEGAN_BETUL: AdeganStory = {
  id: "betul",
  judul: "Hitungan yang betul",
  sumber: "Materi: hitungan yang betul",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Hitungan yang Betul"), ...tokoh("sl", 36, 184, "Salsa")),
      tambah("satu", ...BB, teks("b1t", 113, 54, "1 bundel", 9, W.ungu)),
      tambah("empat", teks("t4", 95, 116, "4 tegak", 9, W.ungu)),
      sorotkan("empat", "bb-b0g0", "bb-b0g1", "bb-b0g2", "bb-b0g3"),
      tambah("satu@2", teks("t1m", 150, 116, "1 miring", 9, W.merah)),
      sorotkan("miring,", "bb-b0m"),
      tambah("lima.", teks("t5", 205, 116, "= 5", 14, W.hijauTua)),
    ),
    k(
      SUARA_B2,
      hapus(0, ...BB_ID, "b1t", "t4", "t1m", "t5"),
      tambah(0, ...bundel(BT)),
      tambah("sepuluh,", teks("d2", 122, 112, "2 bundel = 10", 9, W.ungu)),
      tambah("tiga", ...sisa(BT), teks("d3", 205, 112, "+ 3 garis", 9, W.ungu)),
      tambah("belas.", teks("d13", 150, 140, "= 13", 18, W.hijauTua)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Taruhan Raka"), ...tokoh("rk", 60, 184, "Raka")),
      tambah("cemberut", emo("cm", 60, 146, E.cemberut, 18)),
      tambah("mengambil", EM3[0]),
      tambah("spons,", EM3[1]),
      tambah("taruhan", teks("tr", 190, 40, "taruhan!", 11, W.merah)),
      tambah("taruhan@2", teks("s15", 200, 110, "15", 22, W.abu), emo("x15", 200, 84, E.salah, 18), teks("s13", 250, 110, "13", 22, W.hijauTua), emo("o13", 250, 84, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 6. Tabel ------------------------------ */
const SUARA_L1 = "Bu Wulan menggambar tabel tiga kolom: jenis, turus, dan banyak.";
const SUARA_L2 = "Pada baris ban bocor, turusnya dua bundel dan tiga garis, banyaknya tiga belas.";
const SUARA_L3 = "Dengan tabel, data tersusun rapi dan mudah dibaca.";
const TBL = tabel("tl", 62, 34, [70, 90, 60], 22, ["jenis", "turus", "banyak"], [["ban bocor", "", ""], ["rantai lepas", "", ""], ["rem blong", "", ""]], 8);
const T13 = turus("tu", 136, 59, 13, 16, 3.2);
const dari = (...ids: string[]) => TBL.filter((o) => ids.includes(o.id));
const KOTAK_TBL = TBL.filter((o) => o.t === "kotak");

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel",
  judul: "Tabel tiga kolom",
  sumber: "Materi: tabel tiga kolom",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Tabel Tiga Kolom"), ...tokoh("bw", 30, 184, "Bu Wulan")),
      tambah("tabel", ...KOTAK_TBL),
      tambah("tiga", teks("k3", 240, 28, "3 kolom", 8, W.merah)),
      tambah("jenis,", ...dari("tl-ht0", "tl-t00", "tl-t10", "tl-t20")),
      tambah("turus,", ...dari("tl-ht1")),
      tambah("banyak.", ...dari("tl-ht2")),
    ),
    k(
      SUARA_L2,
      tambah("baris", kotak("hr", 62, 56, 220, 22, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("dua", ...bundel(T13), teks("a2", 130, 138, "2 bundel", 8, W.ungu)),
      tambah("tiga@1", ...sisa(T13), teks("a3", 200, 138, "+ 3 garis", 8, W.ungu)),
      tambah("tiga@2", teks("b13", 252, 70, "13", 10, W.hijauTua)),
    ),
    k(
      SUARA_L3,
      hapus(0, "a2", "a3", "hr"),
      tambah("tabel,", kotak("cb0", 62, 56, 70, 66, "#93C5FD", undefined, { op: 0.4, rx: 0, tebal: 0, z: 4 }), kotak("cb1", 132, 56, 90, 66, "#86EFAC", undefined, { op: 0.4, rx: 0, tebal: 0, z: 4 }), kotak("cb2", 222, 56, 60, 66, "#FDE047", undefined, { op: 0.4, rx: 0, tebal: 0, z: 4 })),
      tambah("tersusun", emo("ok", 224, 150, E.benar, 18)),
      tambah("rapi", teks("rp", 150, 146, "rapi", 12, W.hijauTua)),
      tambah("dibaca.", emo("mt", 262, 150, E.mata, 18)),
    ),
  ],
};
