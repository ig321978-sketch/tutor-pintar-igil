import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bak, bulat, emo, garis, judul, kapur, lantaiToko, loyang, papanKapur, rakKayu, susunTeks, teks, tokoh } from "./k3b1D-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k3b1D-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Bu Tuti" (Kelas 3 Bab 1 Sub-Bab D), bagian akhir.
 * Naskah suara dari naskah/story-naskah-k3b1d.md. Bagian ini: cerita penjumlahan di rak roti, periksa dengan menukar urutan dan menaksir, dan penutup (jembatan ke Sub-Bab E).
 */

/* ------------------------------ 7. Cerita penjumlahan ------------------------------ */
const SUARA_C1 = "Di rak ada empat puluh enam roti, Pak Joko menambah dua puluh sembilan. Berapa roti sekarang?";
const SUARA_C2 = "Kata tambah berarti penjumlahan. Enam ditambah sembilan lima belas, simpan satu.";
const SUARA_C3 = "Empat ditambah dua ditambah satu tujuh. Jadi roti di rak ada tujuh puluh lima.";

/** Sepuluh roti di dua tingkat rak: id `r1`..`r10`. */
const roti = (): Obj[] => Array.from({ length: 10 }, (_, i) => emo(`r${i + 1}`, 48 + (i % 5) * 26, i < 5 ? 74 : 107, E.roti, 14, { z: 2 }));

export const ADEGAN_CERITA_TAMBAH: AdeganStory = {
  id: "soal-cerita-tambah",
  judul: "Cerita penjumlahan",
  sumber: "Materi: cerita penjumlahan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cerita Penjumlahan"), ...lantaiToko("lt", 150), ...rakKayu("rk", 30, 44, 160, 100, 3)),
      tambah("empat", teks("n46", 110, 38, "46 roti", 10, W.ungu), ...roti()),
      tambah("Pak", ...tokoh("pj", 244, 184, "Pak Joko")),
      tambah("menambah", emo("t1", 218, 146, E.roti, 14)),
      tambah("dua", teks("n29", 244, 100, "29 roti", 10, W.merah)),
      tambah("Berapa", teks("tq", 244, 128, "?", 20, W.merah)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Kata Tambah"), papanKapur("pk", 30, 28, 240, 150), ...susunTeks("ls3", 46, 29, 170, 64)),
      tambah("Kata", kapur("kt", 150, 46, "kata tambah = +", 11, { warna: W.emas })),
      tambah("Enam", kapur("e6", 235, 84, "6", 11)),
      ubah("sembilan", { id: "e6", isi: "6 + 9" }),
      ubah("lima", { id: "e6", isi: "6 + 9 = 15" }),
      tambah("belas,", kapur("ls3-h-s", 170, 120, "5", 18, { anchor: "end" })),
      tambah("simpan", kapur("sm", 235, 110, "simpan 1", 11, { warna: W.emas })),
    ),
    k(
      SUARA_C3,
      tambah("Empat", kapur("e4", 235, 138, "4", 11)),
      ubah("dua", { id: "e4", isi: "4 + 2" }),
      ubah("satu", { id: "e4", isi: "4 + 2 + 1" }),
      ubah("tujuh.", { id: "e4", isi: "4 + 2 + 1 = 7" }),
      tambah("tujuh.", kapur("ls3-h-t", 160, 120, "7", 18, { anchor: "end" })),
      tambah("roti", teks("h75", 150, 164, "75 roti", 14, W.emas, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 8. Periksa dengan menukar urutan ------------------------------ */
const SUARA_X1 = "Salsa memeriksa dengan menukar urutan: dua puluh sembilan ditambah empat puluh enam hasilnya tujuh puluh lima.";
const SUARA_X2 = "Hasilnya sama, jadi urutan penjumlahan boleh dibalik.";
const SUARA_X3 = "Bima menaksir dulu: empat puluh enam hampir lima puluh, dua puluh sembilan hampir tiga puluh, jadi sekitar delapan puluh.";

/** Titik pada garis bilangan 0 sampai 100: x = 30 + 2,4 v. */
const gx = (v: number): number => Math.round((30 + v * 2.4) * 10) / 10;

export const ADEGAN_PERIKSA_TUKAR: AdeganStory = {
  id: "periksa-tukar",
  judul: "Periksa dengan menukar",
  sumber: "Materi: periksa tukar urutan dan taksiran",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Tukar Urutan"), ...tokoh("sl", 44, 184, "Salsa"), papanKapur("bA", 70, 40, 100, 62), kapur("a1", 120, 68, "46 + 29", 13), kapur("a2", 120, 90, "= 75", 13, { warna: W.emas })),
      tambah("menukar", papanKapur("bB", 185, 40, 100, 62), kapur("b1", 235, 68, "29 + 46", 13)),
      tambah("hasilnya", kapur("b2", 235, 90, "= 75", 13, { warna: W.emas })),
    ),
    k(
      SUARA_X2,
      sorotkan("Hasilnya", "bA", "bB"),
      tambah("sama,", teks("sm", 177, 84, "=", 20, W.hijauTua)),
      tambah("dibalik.", teks("bl", 177, 122, "dibalik", 9, W.ungu)),
    ),
    k(
      SUARA_X3,
      bersih(0),
      tambah(0, judul("Menaksir"), ...tokoh("bm", 44, 184, "Bima"), garis("gb", 30, 110, 240, 0, W.biru, 2.4, { z: 1 })),
      tambah("empat", bulat("d46", gx(46), 110, 4, W.merah, W.biru, { z: 2 }), teks("v46", gx(46), 94, "46", 10, W.merah)),
      tambah("lima", garis("t50", gx(50), 104, 0, 12, W.hijauTua, 2, { z: 2 }), teks("v50", gx(50), 130, "50", 10, W.hijauTua)),
      tambah("dua", bulat("d29", gx(29), 110, 4, W.merah, W.biru, { z: 2 }), teks("v29", gx(29), 94, "29", 10, W.merah)),
      tambah("tiga", garis("t30", gx(30), 104, 0, 12, W.hijauTua, 2, { z: 2 }), teks("v30", gx(30), 130, "30", 10, W.hijauTua)),
      tambah("sekitar", bulat("d75", gx(75), 110, 4, W.ungu, W.biru, { z: 2 }), teks("v75", gx(75), 94, "75", 10, W.ungu)),
      tambah("delapan", garis("t80", gx(80), 104, 0, 12, W.hijauTua, 2, { z: 2 }), teks("v80", gx(80), 130, "80", 10, W.hijauTua), teks("eq", 170, 160, "50 + 30 = 80", 13, W.biru)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Z1 = "Raka menepati taruhannya dan mencuci semua loyang sampai berkilau.";
const SUARA_Z2 = "Pak Anto, penjual mi instan, datang mengecek rak mi yang mulai kosong.";
const SUARA_Z3 = "Menurutmu, bagaimana cara tahu sisa mi di rak? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Bu Tuti!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup",
  sumber: "Materi: penutup, jembatan ke Sub-Bab E",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Taruhan Raka"), ...lantaiToko("lt", 150), ...tokoh("rk", 70, 184, "Raka")),
      tambah("menepati", teks("ts", 70, 128, "menepati!", 9, W.merah)),
      tambah("mencuci", ...bak("bk", 130, 96, 130, 54), bulat("bu1", 150, 104, 4, W.putih, "#38BDF8", { z: 2 }), bulat("bu2", 176, 101, 3, W.putih, "#38BDF8", { z: 2 }), bulat("bu3", 204, 105, 4, W.putih, "#38BDF8", { z: 2 }), bulat("bu4", 236, 102, 3, W.putih, "#38BDF8", { z: 2 })),
      tambah("loyang", ...loyang("ly1", 140, 118), ...loyang("ly2", 176, 118), ...loyang("ly3", 212, 118)),
      ubah("berkilau.", { id: "ly1", warna: "#E0F2FE", garis: "#0369A1" }, { id: "ly2", warna: "#E0F2FE", garis: "#0369A1" }, { id: "ly3", warna: "#E0F2FE", garis: "#0369A1" }),
      tambah("berkilau.", emo("kl1", 152, 112, E.berkilau, 12), emo("kl2", 220, 112, E.berkilau, 12)),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Pak Anto Datang"), ...lantaiToko("lt", 150), ...rakKayu("rm", 170, 44, 110, 96, 3)),
      tambah("Pak", ...tokoh("pa", 60, 184, "Pak Anto")),
      tambah("mi@1", emo("m1", 196, 76, E.mi, 14), emo("m2", 224, 76, E.mi, 14)),
      tambah("rak", emo("lc", 40, 40, "\u{1F514}", 16)),
      tambah("kosong.", teks("ks", 225, 38, "hampir kosong", 9, W.merah)),
    ),
    k(
      SUARA_Z3,
      tambah("tahu", teks("tq", 110, 90, "?", 28, W.merah)),
      tambah("Raka,", ...tokoh("rk", 110, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 150, 184, "Salsa")),
      tambah("Bima,", ...tokoh("bm", 190, 184, "Bima")),
      tambah("Joko,", ...tokoh("pj", 230, 184, "Pak Joko")),
      tambah("Tuti!", ...tokoh("bt", 270, 184, "Bu Tuti"), emo("w1", 110, 148, E.lambai, 12), emo("w2", 190, 148, E.lambai, 12), emo("w3", 270, 148, E.lambai, 12)),
    ),
  ],
};
