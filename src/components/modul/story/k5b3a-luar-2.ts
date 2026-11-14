import type { AdeganStory } from "./logika-story";
import { W, batang, emo, garis, garisBilangan, judul, kartu, panah, penanda, tabel, teks } from "./k5b3a-gambar";
import { bersih, k, tambah } from "./k5b3a-bantu";
import { G01 } from "./k5b3a-luar-1";

/* ------------------------------ 6. Mixed to Improper: konsep ------------------------------ */
export const ADEGAN_LUAR_CAMPURAN: AdeganStory = {
  id: "luar-campuran",
  judul: "Mixed to Improper: campuran ke biasa",
  sumber: "Metode luar: Mixed to Improper",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Mixed to Improper, atau campuran ke biasa. Ubah pecahan campuran menjadi pecahan biasa, lalu bandingkan sebagai pecahan biasa.",
      tambah(0, judul("Mixed to Improper")),
      tambah("Ubah", ...kartu("c1", 20, 70, 90, 44, W.hijauMuda, ["2 3/4"], 18)),
      tambah("menjadi", panah("cp", 114, 92, 70, 0, W.biru, 2.4, { gambar: true })),
      tambah("lalu", ...kartu("c2", 190, 70, 90, 44, W.langit, ["11/4"], 18)),
    ),
    k(
      "Rumusnya: bilangan bulat dikali penyebut, ditambah pembilang, dan penyebutnya tetap. Contoh dua dan tiga per empat: dua kali empat ditambah tiga adalah sebelas, jadi sebelas per empat.",
      bersih(0),
      tambah(0, judul("Rumus")),
      tambah("Rumusnya:", ...kartu("rm", 20, 32, 260, 34, W.krem, ["bulat × penyebut + pembilang"], 10), teks("rt", 150, 86, "penyebut tetap", 9.6, W.ungu)),
      tambah("Contoh", teks("ec", 150, 118, "2 3/4", 22, W.biru)),
      tambah("adalah", teks("ek", 150, 146, "(2 × 4) + 3 = 11", 13, W.biru)),
      tambah("jadi", teks("eh", 150, 178, "2 3/4 = 11/4", 18, W.merah)),
    ),
    k(
      "Gambarnya begini: dua batang utuh, masing-masing berisi empat per empat, ditambah satu batang berisi tiga per empat. Seluruhnya sebelas bagian per empat.",
      bersih(0),
      tambah(0, judul("Gambar: 11 bagian seperempat")),
      tambah("dua", ...batang("g1", 70, 40, 160, 28, 4, 4), ...batang("g2", 70, 78, 160, 28, 4, 4), teks("gl1", 252, 58, "4/4", 12, W.biru), teks("gl2", 252, 96, "4/4", 12, W.biru)),
      tambah("ditambah", ...batang("g3", 70, 116, 160, 28, 4, 3), teks("gl3", 252, 134, "3/4", 12, W.biru)),
      tambah("Seluruhnya", teks("gs", 150, 176, "4 + 4 + 3 = 11 bagian", 12, W.merah)),
    ),
    k(
      "Kelebihannya, hasilnya pecahan biasa yang mudah dibandingkan. Kekurangannya, pembilangnya jadi besar dan arti bagian bulatnya tidak langsung terlihat.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 40, 130, 62, W.hijauMuda, ["hasilnya pecahan", "biasa, mudah", "dibandingkan"], 8.6), emo("kle", 79, 128, "👍", 26)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 40, 130, 62, W.merahMuda, ["pembilang besar,", "arti bagian bulat", "tidak langsung terlihat"], 8.4)),
    ),
  ],
};

/* ------------------------------ 7. Mixed to Improper: penerapan pada pita Nisa ------------------------------ */
const BARIS_CAMPURAN = [
  { id: "r1", y: 62, campuran: "2 2/5", hitung: "(2 × 5) + 2 = 12", hasil: "12/5" },
  { id: "r2", y: 108, campuran: "2 1/4", hitung: "(2 × 4) + 1 = 9", hasil: "9/4" },
  { id: "r3", y: 154, campuran: "2 1/2", hitung: "(2 × 2) + 1 = 5", hasil: "5/2" },
];
const barisCampuran = (b: (typeof BARIS_CAMPURAN)[number]) => [
  teks(`${b.id}-m`, 46, b.y, b.campuran, 16, W.biru),
  teks(`${b.id}-h`, 150, b.y, b.hitung, 11, W.biru),
  teks(`${b.id}-r`, 254, b.y, b.hasil, 16, W.merah),
];

export const ADEGAN_LUAR_CAMPURAN_TERAPAN: AdeganStory = {
  id: "luar-campuran-terapan",
  judul: "Mixed to Improper pada pita Nisa",
  sumber: "Metode luar: Mixed to Improper; pita Nisa Buku Siswa hlm. 75",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada pita Nisa. Dua dan dua per lima menjadi dua kali lima ditambah dua, yaitu dua belas per lima.",
      tambah(0, judul("Pita Nisa menjadi pecahan biasa")),
      tambah(4, teks("r1-m", 46, 62, "2 2/5", 16, W.biru)),
      tambah("kali", teks("r1-h", 150, 62, "(2 × 5) + 2 = 12", 11, W.biru)),
      tambah("yaitu", teks("r1-r", 254, 62, "12/5", 16, W.merah)),
    ),
    k(
      "Dua dan satu per empat menjadi sembilan per empat. Dua dan satu per dua menjadi lima per dua.",
      tambah(6, ...barisCampuran(BARIS_CAMPURAN[1])),
      tambah(15, ...barisCampuran(BARIS_CAMPURAN[2])),
    ),
    k(
      "Penyebutnya lima, empat, dan dua. KPK-nya dua puluh. Maka dua belas per lima menjadi empat puluh delapan per dua puluh, sembilan per empat menjadi empat puluh lima per dua puluh, lima per dua menjadi lima puluh per dua puluh.",
      bersih(0),
      tambah(0, judul("Samakan penyebut: 20")),
      tambah("KPK-nya", teks("kp", 150, 48, "KPK 5, 4, 2 = 20", 12, W.ungu)),
      tambah("Maka", teks("q1", 150, 88, "12/5 = 48/20", 17, W.biru)),
      tambah("sembilan", teks("q2", 150, 128, "9/4 = 45/20", 17, W.biru)),
      tambah(30, teks("q3", 150, 168, "5/2 = 50/20", 17, W.biru)),
    ),
    k(
      "Bandingkan pembilangnya: empat puluh lima lebih kecil dari empat puluh delapan, yang lebih kecil dari lima puluh. Jadi pita terpendek dua dan satu per empat, lalu dua dan dua per lima, terpanjang dua dan satu per dua.",
      bersih(0),
      tambah(0, judul("Urutan pita dari terpendek")),
      tambah("Bandingkan", ...kartu("ub", 90, 30, 120, 28, W.emas, ["45 < 48 < 50"], 11)),
      tambah("terpendek", ...kartu("u1", 30, 72, 240, 30, W.hijauMuda, ["2 1/4 m (45/20)"], 10.4)),
      tambah("lalu", ...kartu("u2", 30, 112, 240, 30, W.langit, ["2 2/5 m (48/20)"], 10.4)),
      tambah("terpanjang", ...kartu("u3", 30, 152, 240, 30, W.krem, ["2 1/2 m (50/20)"], 10.4)),
    ),
  ],
};

/* ------------------------------ 8. Benchmark Half Comparison: konsep ------------------------------ */
const garisPatokan = (id: string) => garisBilangan(id, G01.x, G01.y, G01.satuan, 1, 10);
const titik = (id: string, nilai: number, label: string, warna: string, bawah = 14, u = 9) => penanda(id, G01.x, G01.y, G01.satuan, nilai, label, warna, bawah, u);
const patokanTanda = (id: string) => [garis(`${id}-t`, G01.x + G01.satuan / 2, G01.y - 12, 0, 24, W.merah, 2.4), teks(`${id}-n`, G01.x + G01.satuan / 2, G01.y - 18, "patokan 1/2", 8.6, W.merah)];

export const ADEGAN_LUAR_PATOKAN: AdeganStory = {
  id: "luar-patokan",
  judul: "Benchmark Half Comparison: patokan setengah",
  sumber: "Metode luar: Benchmark Half Comparison",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Benchmark Half Comparison, atau membandingkan dengan patokan setengah. Pecahan dibandingkan dulu dengan patokan nol, satu per dua, dan satu. Tanyakan: pecahan itu di sebelah mana patokan?",
      tambah(0, judul("Benchmark Half Comparison")),
      tambah("nol,", ...garisPatokan("pk")),
      tambah("dua,", ...patokanTanda("pk")),
      tambah("sebelah", teks("zl", 95, 150, "lebih kecil dari 1/2", 8.8, W.hijau), teks("zr", 205, 150, "lebih besar dari 1/2", 8.8, W.ungu)),
    ),
    k(
      "Cara cepatnya: kalau pembilang kurang dari setengah penyebut, pecahan lebih kecil dari satu per dua. Kalau tepat setengah, sama dengan satu per dua. Kalau lebih, pecahan lebih besar.",
      bersih(0),
      tambah(0, judul("Cara cepat: 2 kali pembilang")),
      tambah("kurang", ...kartu("h1", 14, 36, 272, 40, W.hijauMuda, ["1/5: 2 × 1 = 2, kurang dari 5", "jadi lebih kecil dari 1/2"], 8.8)),
      tambah("tepat", ...kartu("h2", 14, 84, 272, 40, W.krem, ["3/6: 2 × 3 = 6, tepat sama dengan 6", "jadi sama dengan 1/2"], 8.8)),
      tambah(24, ...kartu("h3", 14, 132, 272, 40, W.langit, ["7/8: 2 × 7 = 14, lebih dari 8", "jadi lebih besar dari 1/2"], 8.8)),
    ),
    k(
      "Kalau dua pecahan berada di dua sisi patokan, urutannya langsung ketahuan, tanpa menyamakan penyebut. Itu kelebihannya.",
      bersih(0),
      tambah(0, judul("Kelebihan: dua sisi patokan")),
      tambah(0, ...garisPatokan("kb"), ...patokanTanda("kb")),
      tambah("sisi", ...titik("a1_5", 1 / 5, "1/5", W.biru)),
      tambah("patokan,", ...titik("a7_8", 7 / 8, "7/8", W.hijau)),
      tambah("kelebihannya.", ...kartu("kk", 50, 150, 200, 30, W.emas, ["1/5 < 1/2 < 7/8, tanpa KPK"], 9.4)),
    ),
    k(
      "Kekurangannya, kalau kedua pecahan sama-sama kurang atau sama-sama lebih dari satu per dua, patokan ini belum cukup. Kita perlu metode lain.",
      bersih(0),
      tambah(0, judul("Kekurangan: satu sisi saja")),
      tambah(0, ...garisPatokan("ks"), ...patokanTanda("ks")),
      tambah("kedua", ...titik("sa", 0.68, "A", W.biru), ...titik("sb", 0.9, "B", W.hijau)),
      tambah("belum", teks("sq", 150, 150, "A atau B yang lebih besar?", 9.8, W.merah)),
      tambah("metode", ...kartu("sm", 60, 164, 180, 28, W.krem, ["perlu cara lain"], 10)),
    ),
  ],
};

/* ------------------------------ 9. Benchmark Half Comparison: penerapan ------------------------------ */
export const ADEGAN_LUAR_PATOKAN_TERAPAN: AdeganStory = {
  id: "luar-patokan-terapan",
  judul: "Benchmark Half Comparison pada angka buku",
  sumber: "Metode luar: Benchmark Half Comparison; Buku Siswa hlm. 66, 72–75",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Contoh pertama, dari soal Mengingat Kembali: satu per dua atau satu per lima? Satu per dua adalah patokannya. Satu per lima berada di kiri patokan, jadi lebih kecil. Maka satu per dua lebih besar.",
      tambah(0, judul("1/2 atau 1/5?")),
      tambah(0, ...garisPatokan("t1")),
      tambah("patokannya.", ...patokanTanda("t1")),
      tambah("lima?", ...titik("p1_5", 1 / 5, "1/5", W.biru)),
      tambah("kiri", teks("tkl", 95, 150, "di kiri patokan", 9.4, W.biru)),
      tambah("Maka", ...kartu("tk", 80, 164, 140, 28, W.emas, ["1/2 > 1/5"], 12)),
    ),
    k(
      "Contoh kedua, Ayo Berlatih d: tiga per enam dan dua per enam. Tiga per enam tepat setengah, sebab tiga adalah setengah dari enam. Dua per enam kurang dari setengah. Jadi tiga per enam lebih besar.",
      bersih(0),
      tambah(0, judul("3/6 atau 2/6?")),
      tambah(0, ...garisPatokan("t2"), ...patokanTanda("t2")),
      tambah(15, ...titik("p3_6", 3 / 6, "3/6", W.merah, 26)),
      tambah(26, ...titik("p2_6", 2 / 6, "2/6", W.biru)),
      tambah("Jadi", ...kartu("tj", 80, 164, 140, 28, W.emas, ["3/6 > 2/6"], 12)),
    ),
    k(
      "Contoh ketiga, lompatan Yohana: tujuh per delapan lebih dari setengah karena tujuh lebih dari empat, tetapi masih kurang dari satu. Sebelas per empat dan tujuh per dua sudah lebih dari satu. Jadi tujuh per delapan paling kecil.",
      bersih(0),
      tambah(0, judul("Lompatan Yohana")),
      tambah(0, ...garisPatokan("t3")),
      tambah("setengah", ...patokanTanda("t3")),
      tambah("tujuh", ...titik("p7_8", 7 / 8, "7/8", W.hijau)),
      tambah("Sebelas", ...kartu("ty", 20, 136, 260, 30, W.langit, ["11/4 dan 7/2: lebih dari 1 (di luar garis ini)"], 8.8)),
      tambah("Jadi", ...kartu("tz", 70, 172, 160, 24, W.emas, ["7/8 paling kecil"], 10.4)),
    ),
    k(
      "Tetapi pada Ayo Berlatih a, delapan per dua belas dan sebelas per dua belas. Keduanya lebih dari setengah, yaitu enam per dua belas. Patokan belum cukup, jadi bandingkan pembilangnya, delapan lebih kecil dari sebelas.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih a: patokan belum cukup")),
      tambah(0, ...garisPatokan("t4"), ...patokanTanda("t4")),
      tambah("delapan", ...titik("p8_12", 8 / 12, "8/12", W.biru)),
      tambah("sebelas", ...titik("p11_12", 11 / 12, "11/12", W.hijau)),
      tambah("belum", teks("tq", 150, 150, "keduanya di kanan patokan", 9.4, W.merah)),
      tambah("bandingkan", ...kartu("tb", 70, 164, 160, 28, W.emas, ["8 < 11, jadi 8/12 < 11/12"], 9.4)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan dan kunci ------------------------------ */
const KOLOM_KUNCI = [78, 110, 92];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dan hasil akhir",
  sumber: "Ringkasan metode luar; angka Buku Siswa hlm. 71–75",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Ringkasan empat metode. Garis bilangan: lebih kanan, lebih besar. Pecahan senilai: samakan penyebut. Campuran ke biasa: bulat kali penyebut ditambah pembilang. Patokan setengah: bandingkan dengan nol, setengah, dan satu.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Garis", ...kartu("s1", 12, 32, 276, 34, W.hijauMuda, ["Number Line Fractions", "lebih kanan = lebih besar"], 8.4)),
      tambah("senilai:", ...kartu("s2", 12, 72, 276, 34, W.langit, ["Equivalent Fractions", "samakan penyebut"], 8.4)),
      tambah("Campuran", ...kartu("s3", 12, 112, 276, 34, W.krem, ["Mixed to Improper", "bulat × penyebut + pembilang"], 8.4)),
      tambah("Patokan", ...kartu("s4", 12, 152, 276, 34, W.pink, ["Benchmark Half Comparison", "banding dengan 0, 1/2, dan 1"], 8.4)),
    ),
    k(
      "Pilih metode sesuai soalnya. Untuk banyak pecahan sekaligus, garis bilangan. Untuk penyebut berbeda, pecahan senilai. Untuk campuran, ubah dulu. Untuk perkiraan cepat, patokan.",
      bersih(0),
      tambah(0, judul("Kapan memakai apa?")),
      tambah("banyak", ...kartu("w1", 14, 32, 272, 30, W.hijauMuda, ["banyak pecahan: garis bilangan"], 9.2)),
      tambah("berbeda,", ...kartu("w2", 14, 70, 272, 30, W.langit, ["penyebut berbeda: pecahan senilai"], 9.2)),
      tambah("campuran,", ...kartu("w3", 14, 108, 272, 30, W.krem, ["ada campuran: ubah ke biasa dulu"], 9.2)),
      tambah("perkiraan", ...kartu("w4", 14, 146, 272, 30, W.pink, ["perkiraan cepat: patokan setengah"], 9.2)),
    ),
    k(
      "Apa pun metodenya, hasilnya harus sama. Lompatan Yohana dari terjauh: tiga dan satu per dua meter, dua dan tiga per empat meter, tujuh per delapan meter.",
      bersih(0),
      tambah(0, judul("Hasil akhir: kunci angka buku")),
      tambah("Apa", ...tabel("kn0", 10, 44, KOLOM_KUNCI, [["Soal", "Urutan", "Arah"]], 22, 8, W.krem)),
      tambah("Lompatan", ...tabel("kn1", 10, 66, KOLOM_KUNCI, [["Lompatan Yohana", "3 1/2 > 2 3/4 > 7/8", "jauh → dekat"]], 22, 7.6, W.putih)),
    ),
    k(
      "Pita Nisa dari yang terpendek: dua dan satu per empat meter, dua dan dua per lima meter, dua dan satu per dua meter. Itu sesuai kunci buku.",
      tambah("Pita", ...tabel("kn2", 10, 88, KOLOM_KUNCI, [["Pita Nisa", "2 1/4 < 2 2/5 < 2 1/2", "pendek → panjang"]], 22, 7.6, W.putih)),
      tambah("sesuai", emo("kc", 150, 150, "✅", 28), teks("kt", 150, 172, "hasil semua metode sama", 9.4, W.hijau)),
    ),
  ],
};
