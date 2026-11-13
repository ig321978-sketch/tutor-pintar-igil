import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, kartu, kartuMetode, kotak, panah, teks } from "./k6b2b-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k6b2b-bantu";

/* ------------------------------ LB4. Unit Rate Method: konsep ------------------------------ */
export const ADEGAN_LUAR_SATUAN: AdeganStory = {
  id: "luarb2-satuan",
  judul: "Unit Rate Method: nilai untuk satu satuan",
  sumber: "Metode dari luar buku; rasio satuan, Buku Siswa hlm. 61–63",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Unit Rate Method berarti mencari nilai untuk 1 satuan lebih dulu. Satuan itu bisa harga per bibit atau bibit per jam.",
      tambah(0, teks("jud", 150, 24, "Unit Rate Method", 12, W.ungu)),
      tambah(7, bulat("u1", 150, 82, 28, "#FEF9C3", W.biru), teks("u1t", 150, 92, "1", 28, W.merah)),
      tambah("harga", ...kartu("c1", 20, 132, 120, 32, "#DCFCE7", ["harga per bibit"], 9.5)),
      tambah(18, ...kartu("c2", 160, 132, 120, 32, "#DBEAFE", ["bibit per jam"], 9.5)),
    ),
    k(
      "Langkahnya: bagi jumlah besaran dengan banyaknya. Setelah ada nilai per 1, dua penawaran berbeda jumlah bisa dibandingkan langsung.",
      bersih(0),
      tambah("bagi", ...kartu("rm", 30, 24, 240, 40, "#FEF9C3", ["total ÷ banyak = nilai per 1"], 11)),
      tambah("dua", ...kartu("pa", 30, 100, 100, 36, "#FFEDD5", ["penawaran A"], 10), ...kartu("pb", 170, 100, 100, 36, "#FFEDD5", ["penawaran B"], 10)),
      tambah("dibandingkan", teks("bd", 150, 124, "?", 18, W.merah), teks("bd2", 150, 172, "bandingkan nilai per 1", 11, W.hijau)),
    ),
    k(
      "Tulis satuannya dengan jelas, misalnya rupiah per bibit. Tanpa satuan, bilangan 12.500 tidak jelas artinya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Satuan wajib ditulis", 12, W.ungu)),
      tambah("rupiah", ...kartu("ya", 40, 50, 220, 40, "#BBF7D0", ["Rp12.500 per bibit"], 13, W.hijau)),
      tambah("Tanpa", ...kartu("tk", 40, 116, 220, 40, "#FEE2E2", ["12.500 = ?"], 13, W.merah)),
      tambah("tidak", teks("tg", 150, 184, "tanpa satuan, artinya tidak jelas", 10, W.merah)),
    ),
    k(
      "Ingat dua kebiasaan baik: nilai per 1 selalu dihitung dulu, dan satuannya selalu ditulis.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Dua kebiasaan baik", 12, W.ungu)),
      tambah("nilai", ...kartu("k1", 30, 54, 240, 38, "#DCFCE7", ["✓ hitung nilai per 1 dulu"], 11)),
      tambah(11, ...kartu("k2", 30, 110, 240, 38, "#DBEAFE", ["✓ tulis satuannya"], 11)),
    ),
  ],
};

/* ------------------------------ LB5. Unit Rate Method: penerapan ------------------------------ */
export const ADEGAN_LUAR_SATUAN_TERAPAN: AdeganStory = {
  id: "luarb2-satuan-terapan",
  judul: "Unit Rate Method: harga bibit, kemasan, dan pena",
  sumber: "Metode dari luar buku; penerapan Eksplorasi 2.4 dan Latihan 2.2, Buku Siswa hlm. 61–65",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapan pertama: harga satu bibit. Paket 3 bibit Rp37.500 menjadi Rp12.500 per bibit, paket 5 bibit Rp58.000 menjadi Rp11.600 per bibit.",
      tambah(0, teks("jud", 150, 24, "Terapan: harga satu bibit", 11, W.ungu)),
      tambah(6, ...kartu("ka", 15, 40, 125, 44, "#DCFCE7", ["Paket 3 bibit", "Rp37.500"], 9.5)),
      tambah(10, teks("ua", 77, 104, "Rp12.500 per bibit", 9, W.hijau)),
      tambah(14, ...kartu("kb", 160, 40, 125, 44, "#FEF9C3", ["Paket 5 bibit", "Rp58.000"], 9.5)),
      tambah(18, teks("ub", 222, 104, "Rp11.600 per bibit", 9, W.merah)),
    ),
    k(
      "Pilih yang satuannya lebih murah: Rp11.600, yaitu paket 5 bibit.",
      sorotkan("murah:", "kb-k"),
      tambah("yaitu", ...kartu("pil", 70, 130, 160, 34, "#BBF7D0", ["✓ paket 5 bibit"], 11, W.hijau)),
    ),
    k(
      "Terapan kedua: mengemas 6 bibit dalam 1,5 jam. Bagi dengan 1,5, hasilnya 4 bibit per jam.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Terapan: mengemas bibit", 11, W.ungu)),
      tambah(3, ...kartu("ar", 30, 44, 240, 36, "#FFEDD5", ["6 bibit : 1,5 jam"], 12)),
      tambah(10, panah("pn", 150, 84, 0, 30, W.merah, 2.5, { gambar: true }), teks("pnt", 190, 104, "÷ 1,5", 10, W.merah)),
      tambah(12, ...kartu("as", 30, 118, 240, 36, "#BBF7D0", ["4 bibit : 1 jam"], 12, W.hijau)),
    ),
    k(
      "Dengan 4 bibit per jam, untuk 4 jam tinggal dikali 4. Hasilnya 16 bibit. Satu rasio satuan menjawab banyak pertanyaan.",
      bersih(0),
      tambah(1, teks("jud", 150, 24, "4 bibit per jam", 12, W.ungu)),
      tambah(6, ...[1, 2, 3, 4].flatMap((n) => kartu(`j${n}`, 20 + (n - 1) * 65, 60, 55, 40, "#FEF9C3", [`jam ${n}`, "4 bibit"], 8.6))),
      tambah("dikali", teks("kl", 150, 130, "4 jam × 4 bibit", 12, W.merah)),
      tambah(12, teks("tt", 150, 170, "= 16 bibit", 16, W.hijau)),
      sorotkan("Satu", "tt"),
    ),
    k(
      "Begitu juga pena: Rp36.000 untuk 15 pena adalah Rp2.400 per pena, jadi 5 pena Rp12.000.",
      bersih(0),
      tambah(0, emo("pn", 150, 50, "✏", 30)),
      tambah(3, teks("p1", 150, 90, "36.000 untuk 15 pena", 12)),
      tambah(8, teks("p2", 150, 118, "= 2.400 per pena", 13, W.merah)),
      tambah(12, teks("p3", 150, 152, "5 pena = 12.000", 13, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB6. Recipe Scaling Factor: konsep ------------------------------ */
export const ADEGAN_LUAR_SKALA: AdeganStory = {
  id: "luarb2-skala",
  judul: "Recipe Scaling Factor: satu faktor untuk semua bahan",
  sumber: "Metode dari luar buku; resep wedang jahe, Buku Siswa hlm. 64",
  latar: "#FEF2F2",
  ketukan: [
    k(
      "Recipe Scaling Factor adalah faktor skala resep, yaitu satu bilangan yang mengalikan semua bahan sekaligus.",
      tambah(0, teks("jud", 150, 22, "Recipe Scaling Factor", 12, W.ungu)),
      tambah("faktor", bulat("fk", 150, 66, 24, "#FEF9C3", W.biru), teks("fkt", 150, 74, "× k", 18, W.merah)),
      tambah("mengalikan", panah("a1", 130, 86, -70, 40, W.merah, 2, { gambar: true }), panah("a2", 150, 90, 0, 36, W.merah, 2, { gambar: true }), panah("a3", 170, 86, 70, 40, W.merah, 2, { gambar: true })),
      tambah("bahan", ...kartu("b1", 30, 132, 70, 30, "#DCFCE7", ["bahan A"], 9), ...kartu("b2", 115, 132, 70, 30, "#DCFCE7", ["bahan B"], 9), ...kartu("b3", 200, 132, 70, 30, "#DCFCE7", ["bahan C"], 9)),
    ),
    k(
      "Cari faktornya dari satu bahan yang jumlahnya diketahui. Faktor itu sama dengan jumlah baru dibagi jumlah lama.",
      bersih(0),
      tambah(1, ...kartu("cr", 30, 30, 240, 40, "#FFEDD5", ["cari faktor dari satu bahan"], 11)),
      tambah("Faktor@2", ...kartu("fm", 30, 100, 240, 44, "#FEF9C3", ["faktor = jumlah baru ÷ jumlah lama"], 11, W.merah)),
    ),
    k(
      "Wedang jahe untuk 4 liter air memakai 12 jahe merah, 8 batang serai, dan 4 lemon. Kita ingin membuat 8 liter air.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Resep wedang jahe", 12, W.ungu)),
      tambah(3, teks("w1", 150, 56, "4 liter air", 12)),
      tambah(7, teks("w2", 150, 80, "12 jahe merah", 12, W.hijau)),
      tambah(10, teks("w3", 150, 104, "8 batang serai", 12, W.hijau)),
      tambah(14, teks("w4", 150, 128, "4 lemon", 12, W.hijau)),
      tambah(19, ...kartu("tg", 50, 150, 200, 34, "#FEE2E2", ["target: 8 liter air"], 11, W.merah)),
    ),
    k(
      "Faktornya adalah 8 dibagi 4 sama dengan 2.",
      tambah(2, teks("fx", 150, 195, "8 ÷ 4", 12, W.merah)),
      ubah(7, { id: "fx", isi: "faktor: 8 ÷ 4 = 2" }),
      tambah(7, bulat("fb", 252, 100, 26, "#FEF9C3", W.merah), teks("fbt", 252, 109, "× 2", 18, W.merah)),
    ),
  ],
};

/* ------------------------------ LB7. Recipe Scaling Factor: penerapan ------------------------------ */
export const ADEGAN_LUAR_SKALA_TERAPAN: AdeganStory = {
  id: "luarb2-skala-terapan",
  judul: "Recipe Scaling Factor: wedang jahe dan kopi Dona",
  sumber: "Metode dari luar buku; penerapan Latihan 2.2 nomor 1 dan 3, Buku Siswa hlm. 64–65",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Kalikan semua bahan dengan 2: jahe merah 12 menjadi 24, serai 8 menjadi 16, lemon 4 menjadi 8.",
      tambah(0, teks("jud", 150, 24, "Faktor skala 2", 12, W.ungu)),
      tambah(4, bulat("fk", 250, 60, 22, "#FEF9C3", W.merah), teks("fkt", 250, 68, "× 2", 16, W.merah)),
      tambah(7, teks("r1", 120, 70, "jahe merah 12", 12)),
      ubah(9, { id: "r1", isi: "jahe merah 12 → 24" }),
      tambah(11, teks("r2", 120, 104, "serai 8", 12)),
      ubah(13, { id: "r2", isi: "serai 8 → 16" }),
      tambah(15, teks("r3", 120, 138, "lemon 4", 12)),
      ubah(17, { id: "r3", isi: "lemon 4 → 8" }),
    ),
    k(
      "Sekarang kopi Dona. Ibu memakai 250 mililiter air dengan 1 sendok kopi dan 2 sendok gula. Teko Dona berisi 1 liter, yaitu 1.000 mililiter.",
      bersih(0),
      tambah("Ibu", kotak("ci", 15, 36, 130, 100, "#FEF9C3", W.biru, { rx: 8 }), teks("cit", 80, 54, "Resep Ibu", 10, W.ungu)),
      tambah(5, teks("c1", 80, 78, "250 ml air", 10)),
      tambah(9, teks("c2", 80, 98, "1 sendok kopi", 10)),
      tambah(13, teks("c3", 80, 118, "2 sendok gula", 10)),
      tambah("Teko", kotak("cd", 155, 36, 130, 100, "#DBEAFE", W.biru, { rx: 8 }), teks("cdt", 220, 54, "Teko Dona", 10, W.ungu)),
      tambah(19, teks("d1", 220, 82, "1 liter", 12)),
      tambah(22, teks("d2", 220, 108, "= 1.000 ml", 12, W.merah)),
    ),
    k(
      "Faktor skalanya 1.000 dibagi 250 sama dengan 4. Kopi 1 kali 4 sama dengan 4 sendok, dan gula 2 kali 4 sama dengan 8 sendok.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Faktor skala kopi Dona", 12, W.ungu)),
      tambah(2, teks("f1", 150, 62, "1.000 ÷ 250", 14, W.merah)),
      ubah(7, { id: "f1", isi: "1.000 ÷ 250 = 4" }),
      tambah(9, teks("f2", 150, 110, "kopi: 1 × 4", 13)),
      ubah(14, { id: "f2", isi: "kopi: 1 × 4 = 4 sendok" }),
      tambah(18, teks("f3", 150, 154, "gula: 2 × 4", 13)),
      ubah(23, { id: "f3", isi: "gula: 2 × 4 = 8 sendok", warna: W.hijau }),
    ),
    k(
      "Dona memakai gula 10 sendok, bukan 8. Satu bahan tidak ikut diskalakan, jadi kopi Dona terlalu manis.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Gula kopi Dona", 12, W.ungu)),
      tambah(3, kotak("bm", 40, 60, 120, 24, "#FCA5A5", W.merah, { rx: 4 }), teks("bmt", 170, 77, "dipakai 10", 10, W.merah, { anchor: "start" })),
      tambah(6, kotak("bh", 40, 100, 96, 24, "#86EFAC", W.hijau, { rx: 4 }), teks("bht", 146, 117, "seharusnya 8", 10, W.hijau, { anchor: "start" })),
      tambah("manis.", emo("ma", 150, 172, "🍬", 28), teks("mat", 150, 198, "kopi terlalu manis", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ LB8. Ringkasan empat metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luarb2-ringkas",
  judul: "Ringkasan empat metode luar Sub-Bab B",
  sumber: "Ringkasan metode luar Sub-Bab B",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan empat metode luar untuk Sub-Bab B.",
      tambah(0, teks("jud", 150, 20, "Ringkasan", 12, W.ungu)),
      tambah("empat", kartuMetode("m1", 10, 30, "#FDE68A", ["Equivalent", "Ratio Table"], "kali atau bagi sama"), kartuMetode("m2", 156, 30, "#FBCFE8", ["Fraction-Equivalence", "Bridge"], "kali silang")),
      tambah("metode", kartuMetode("m3", 10, 112, "#BBF7D0", ["Unit Rate", "Method"], "nilai per satu"), kartuMetode("m4", 156, 112, "#BFDBFE", ["Recipe Scaling", "Factor"], "faktor skala")),
    ),
    k(
      "Pertama, tabel rasio: kedua kolom dikali atau dibagi bilangan yang sama, seperti 10 banding 12 menjadi 5 banding 6.",
      sorotkan(0, "m1-k"),
      tambah(12, teks("d1", 77, 94, "10 : 12 → 5 : 6", 8, W.merah)),
    ),
    k(
      "Kedua, jembatan pecahan: periksa dengan kali silang, yaitu 10 kali 6 sama dengan 12 kali 5.",
      redamkan(0, "m1-k"),
      sorotkan(0, "m2-k"),
      tambah(8, teks("d2", 223, 94, "10 × 6 = 12 × 5", 8, W.merah)),
    ),
    k(
      "Ketiga, rasio satuan: Rp11.600 per bibit lebih murah daripada Rp12.500 per bibit, dan 4 bibit per jam.",
      redamkan(0, "m2-k"),
      sorotkan(0, "m3-k"),
      tambah(3, teks("d3", 77, 176, "11.600 < 12.500", 8, W.merah)),
      ubah(13, { id: "d3", isi: "11.600 < 12.500 · 4 bibit/jam" }),
    ),
    k(
      "Keempat, faktor skala: resep wedang dikali 2, resep kopi dikali 4. Semua bahan harus ikut dikali dengan faktor yang sama.",
      redamkan(0, "m3-k"),
      sorotkan(0, "m4-k"),
      tambah(6, teks("d4", 223, 176, "wedang × 2", 8, W.merah)),
      ubah(10, { id: "d4", isi: "wedang × 2 · kopi × 4" }),
    ),
  ],
};
