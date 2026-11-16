import type { AdeganStory } from "./logika-story";
import { W, batang, emo, kartu, panah, teks } from "./k6b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k6b2c-bantu";

/* ------------------------------ 6. Common Time Unit Conversion: konsep ------------------------------ */
export const ADEGAN_LUAR_C_SATUAN: AdeganStory = {
  id: "luarc-satuan",
  judul: "Common Time Unit Conversion: samakan satuan waktu",
  sumber: "Metode luar: Common Time Unit Conversion",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Common Time Unit Conversion berarti menyamakan satuan waktu sebelum membuat rasio. Rasio hanya bermakna jika kedua waktu memakai satuan yang sama.",
      tambah(0, teks("jud", 150, 24, "Common Time Unit Conversion", 12, W.ungu)),
      tambah("menyamakan", kartu("x1", 40, 52, 220, "bulan : tahun  ✗  beda satuan", W.hiasMuda, 11)),
      tambah("bermakna", kartu("x2", 40, 94, 220, "bulan : bulan  ✓  satuan sama", W.obatMuda, 11), emo("tm", 150, 150, "⏳", 28)),
    ),
    k(
      "Pilih satu satuan bersama, biasanya satuan yang lebih kecil agar hasilnya bilangan bulat. Contohnya satu tahun sama dengan dua belas bulan, jadi bulan lebih kecil.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pilih satuan bersama", 14, W.ungu)),
      tambah("Contohnya", kartu("y1", 50, 56, 200, "1 tahun = 12 bulan", W.krem, 14)),
      tambah("kecil@2", kartu("y2", 50, 100, 200, "bulan lebih kecil: pakai bulan", W.langit, 11)),
    ),
    k(
      "Tangga satuan: satu jam sama dengan enam puluh menit, satu hari sama dengan dua puluh empat jam, satu minggu sama dengan tujuh hari, dan satu bulan sama dengan empat minggu.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tangga satuan waktu", 13, W.ungu)),
      tambah("jam", kartu("t1", 24, 40, 150, "1 jam = 60 menit", W.krem, 10)),
      tambah("hari", kartu("t2", 52, 74, 150, "1 hari = 24 jam", W.langit, 10)),
      tambah("minggu", kartu("t3", 80, 108, 150, "1 minggu = 7 hari", W.obatMuda, 10)),
      tambah("bulan", kartu("t4", 108, 142, 150, "1 bulan = 4 minggu", W.hiasMuda, 10)),
    ),
    k(
      "Mengubah ke satuan yang lebih kecil memakai kali, mengubah ke satuan yang lebih besar memakai bagi.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Arah mengubah satuan", 13, W.ungu)),
      tambah("kecil", kartu("z1", 30, 50, 240, "besar → kecil: dikali", W.obatMuda, 13), panah("pz1", 150, 80, 0, 18, W.hijau, 3, { gambar: true })),
      tambah("besar", kartu("z2", 30, 108, 240, "kecil → besar: dibagi", W.hiasMuda, 13), panah("pz2", 150, 138, 0, 18, W.merah, 3, { gambar: true })),
    ),
    k(
      "Setelah satuannya sama, bandingkan bilangannya dan sederhanakan rasionya. Itulah dua langkah metode ini.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Dua langkah", 14, W.ungu)),
      tambah("Setelah", kartu("l1", 40, 56, 220, "1. samakan satuan waktu", W.krem, 12)),
      tambah("bandingkan", kartu("l2", 40, 96, 220, "2. bandingkan dan sederhanakan", W.obatMuda, 12)),
      tambah("Itulah", emo("ok", 150, 160, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 7. Common Time Unit Conversion: penerapan ------------------------------ */
export const ADEGAN_LUAR_C_SATUAN_TERAPAN: AdeganStory = {
  id: "luarc-satuan-terapan",
  judul: "Common Time Unit Conversion pada masa panen dan menanam",
  sumber: "Metode luar: Common Time Unit Conversion",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Jahe merah tiga bulan dan lengkuas satu setengah tahun. Jangan langsung membandingkan tiga dengan satu setengah, karena satuannya berbeda.",
      tambah("Jahe", kartu("a1", 40, 44, 220, "jahe merah: 3 bulan", W.obatMuda, 12)),
      tambah("lengkuas", kartu("a2", 40, 80, 220, "lengkuas: 1,5 tahun", W.hiasMuda, 12)),
      tambah("Jangan", kartu("a3", 40, 126, 220, "3 : 1,5  ✗  satuan beda", W.krem, 13)),
    ),
    k(
      "Ubah tahun ke bulan: satu setengah kali dua belas sama dengan delapan belas bulan. Sekarang keduanya bulan: tiga banding delapan belas, yaitu satu banding enam.",
      bersih(0),
      tambah("Ubah", kartu("b1", 40, 46, 220, "1,5 × 12 = 18 bulan", W.langit, 14)),
      tambah("Sekarang", kartu("b2", 40, 92, 220, "3 : 18 = 1 : 6", W.obatMuda, 16), emo("ck", 150, 150, "✅", 26)),
    ),
    k(
      "Ayah menanam sepuluh menit, Kira dua pertiga jam. Samakan ke menit: dua pertiga kali enam puluh sama dengan empat puluh menit.",
      bersih(0),
      tambah("Ayah", emo("ea", 40, 56, "👨", 24), batang("ba", 66, 46, 40, 16, W.obatMuda), teks("va", 114, 58, "10 menit", 9, W.biru, { anchor: "start" })),
      tambah("Kira", emo("et", 40, 100, "🧒", 24), teks("vt", 66, 112, "2/3 jam", 9, W.biru, { anchor: "start" })),
      tambah("enam", teks("v60", 150, 154, "2/3 × 60 menit", 14, W.salem)),
      tambah("empat", batang("bt", 66, 90, 160, 16, W.hiasMuda), teks("v40", 150, 178, "= 40 menit", 15, W.merah)),
    ),
    k(
      "Rasio sepuluh banding empat puluh disederhanakan dengan dibagi sepuluh menjadi satu banding empat. Ayah empat kali lebih cepat.",
      bersih(0),
      tambah("Rasio", kartu("c1", 50, 48, 200, "10 : 40", W.krem, 16)),
      tambah("dibagi", kartu("c2", 50, 90, 200, "dibagi 10", W.langit, 14)),
      tambah("menjadi", kartu("c3", 50, 128, 200, "1 : 4  Ayah 4 kali lebih cepat", W.obatMuda, 11)),
    ),
    k(
      "Contoh lain: jahe merah tiga bulan dan kumis kucing dua belas minggu. Hati-hati, satu bulan empat minggu hanya pendekatan, jadi tiga bulan sama dengan dua belas minggu, dan rasionya satu banding satu.",
      bersih(0),
      tambah("jahe", kartu("d1", 40, 40, 220, "jahe merah 3 bulan", W.obatMuda, 12)),
      tambah("kumis", kartu("d2", 40, 74, 220, "kumis kucing 12 minggu", W.hiasMuda, 12)),
      tambah("empat", teks("d3", 150, 128, "1 bulan = 4 minggu", 11, W.salem)),
      tambah("sama", teks("d4", 150, 152, "3 bulan = 12 minggu", 13, W.ungu)),
      tambah("rasionya", teks("d5", 150, 180, "12 : 12 = 1 : 1", 17, W.hijau)),
    ),
    k(
      "Kencur enam bulan dan lengkuas delapan belas bulan menghasilkan enam banding delapan belas, yaitu satu banding tiga. Hasil yang sama muncul dalam satuan tahun.",
      bersih(0),
      tambah("Kencur", kartu("e1", 40, 40, 220, "kencur 6 bulan", W.obatMuda, 12)),
      tambah("lengkuas", kartu("e2", 40, 74, 220, "lengkuas 18 bulan", W.hiasMuda, 12)),
      tambah("menghasilkan", teks("e3", 150, 128, "6 : 18 = 1 : 3", 18, W.ungu)),
      tambah("tahun", teks("e4", 150, 160, "dalam tahun: 1/2 : 3/2 = 1 : 3", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Time-Rate Scaling: konsep ------------------------------ */
export const ADEGAN_LUAR_C_LAJU: AdeganStory = {
  id: "luarc-laju",
  judul: "Time-Rate Scaling: laju per satuan waktu",
  sumber: "Metode luar: Time-Rate Scaling",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Time-Rate Scaling memakai laju, yaitu banyaknya per satu satuan waktu. Contohnya dua kilometer per jam, atau dua puluh kata per menit.",
      tambah(0, teks("jud", 150, 24, "Time-Rate Scaling", 14, W.ungu)),
      tambah("laju", teks("lj", 150, 60, "laju = banyaknya per satu satuan waktu", 9)),
      tambah("dua", kartu("j1", 50, 80, 200, "2 km per jam", W.langit, 14)),
      tambah("puluh", kartu("j2", 50, 120, 200, "20 kata per menit", W.obatMuda, 14)),
    ),
    k(
      "Dari laju, jumlah dihitung dengan laju kali waktu. Sebaliknya, waktu sama dengan jumlah dibagi laju.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Dua rumus laju", 14, W.ungu)),
      tambah("Dari", kartu("k1", 40, 56, 220, "jumlah = laju × waktu", W.krem, 14)),
      tambah("Sebaliknya", kartu("k2", 40, 100, 220, "waktu = jumlah : laju", W.hiasMuda, 14)),
    ),
    k(
      "Untuk mencari laju per jam, bagi jumlahnya dengan waktunya. Misalnya satu kilometer dalam tiga puluh menit. Dalam enam puluh menit jaraknya dua kilometer, karena enam puluh dibagi tiga puluh sama dengan dua.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Mencari laju per jam", 14, W.ungu)),
      tambah("Misalnya", emo("bn", 50, 78, "🚶", 28), kartu("m1", 80, 60, 180, "1 km dalam 30 menit", W.krem, 12)),
      tambah("Dalam@2", kartu("m2", 80, 96, 180, "60 menit: 60 : 30 = 2", W.langit, 12)),
      tambah("jaraknya", kartu("m3", 80, 132, 180, "laju 2 km per jam", W.obatMuda, 13)),
    ),
    k(
      "Laju dapat ditulis dengan satuan berbeda. Seribu dua ratus kata per jam sama dengan dua puluh kata per menit, karena seribu dua ratus dibagi enam puluh sama dengan dua puluh.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Laju dengan satuan lain", 14, W.ungu)),
      tambah("Seribu", kartu("n1", 40, 52, 220, "1.200 kata per jam", W.krem, 14)),
      tambah("karena", kartu("n2", 40, 94, 220, "1.200 : 60 = 20", W.langit, 14)),
      tambah("sama@2", kartu("n3", 40, 136, 220, "20 kata per menit", W.obatMuda, 14)),
    ),
    k(
      "Pilih satuan waktu yang sama dengan pertanyaan. Jika ditanya menit, pakai laju per menit. Jika ditanya jam, pakai laju per jam.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Cocokkan satuannya", 14, W.ungu)),
      tambah("menit", kartu("o1", 40, 56, 220, "ditanya menit → laju per menit", W.hiasMuda, 11)),
      tambah("jam,", kartu("o2", 40, 98, 220, "ditanya jam → laju per jam", W.obatMuda, 11), emo("ab", 150, 156, "⏱", 28)),
    ),
  ],
};

/* ------------------------------ 9. Time-Rate Scaling: penerapan ------------------------------ */
export const ADEGAN_LUAR_C_LAJU_TERAPAN: AdeganStory = {
  id: "luarc-laju-terapan",
  judul: "Time-Rate Scaling pada Banyu dan penulis berita",
  sumber: "Metode luar: Time-Rate Scaling",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Banyu menempuh satu kilometer dalam tiga puluh menit. Dalam enam puluh menit jaraknya dua kilometer, jadi lajunya dua kilometer per jam.",
      tambah("Banyu", emo("by", 46, 66, "🚶", 30), kartu("p1", 80, 46, 180, "1 km dalam 30 menit", W.krem, 12)),
      tambah("Dalam", kartu("p2", 80, 82, 180, "60 menit: 2 km", W.langit, 12)),
      tambah("lajunya", kartu("p3", 80, 118, 180, "laju 2 km per jam", W.obatMuda, 13)),
    ),
    k(
      "Untuk sembilan kilometer, waktunya sembilan kali tiga puluh sama dengan dua ratus tujuh puluh menit, atau dua ratus tujuh puluh dibagi enam puluh sama dengan empat setengah jam.",
      bersih(0),
      tambah("Untuk", kartu("q1", 40, 44, 220, "9 km: 9 × 30 = 270 menit", W.krem, 12)),
      tambah("atau", kartu("q2", 40, 84, 220, "270 : 60 = 4,5 jam", W.obatMuda, 14)),
    ),
    k(
      "Untuk tiga setengah jam, jaraknya tiga setengah kali dua sama dengan tujuh kilometer. Laju yang sama dipakai untuk semua pertanyaan.",
      bersih(0),
      tambah("Untuk", kartu("r1", 40, 44, 220, "3,5 jam: 3,5 × 2 = 7 km", W.krem, 13)),
      tambah("Laju", kartu("r2", 40, 86, 220, "laju sama: 2 km per jam", W.langit, 13), emo("ok", 150, 150, "🚶", 30)),
    ),
    k(
      "Penulis berita mengetik seribu dua ratus kata per jam. Per menit lajunya seribu dua ratus dibagi enam puluh sama dengan dua puluh kata.",
      bersih(0),
      tambah("Penulis", emo("pn", 46, 66, "📰", 30), kartu("s1", 80, 46, 180, "1.200 kata per jam", W.krem, 12)),
      tambah("menit", kartu("s2", 80, 84, 180, "1.200 : 60 = 20", W.langit, 13)),
      tambah("kata@2", kartu("s3", 80, 122, 180, "20 kata per menit", W.obatMuda, 13)),
    ),
    k(
      "Dalam seratus delapan puluh menit: seratus delapan puluh kali dua puluh sama dengan tiga ribu enam ratus kata. Hasilnya sama dengan tiga jam kali seribu dua ratus kata.",
      bersih(0),
      tambah("Dalam", kartu("t1", 40, 44, 220, "180 menit: 180 × 20", W.krem, 13)),
      tambah("ribu", kartu("t2", 40, 84, 220, "= 3.600 kata", W.obatMuda, 15)),
      tambah("tiga@2", kartu("t3", 40, 124, 220, "cek: 3 jam × 1.200 = 3.600", W.langit, 11)),
    ),
    k(
      "Untuk tiga ribu kata: tiga ribu dibagi dua puluh sama dengan seratus lima puluh menit, yaitu dua setengah jam. Jadi satu laju menjawab semua pertanyaan.",
      bersih(0),
      tambah("Untuk", kartu("u1", 40, 44, 220, "3.000 kata: 3.000 : 20", W.krem, 13)),
      tambah("seratus", kartu("u2", 40, 84, 220, "= 150 menit", W.obatMuda, 15)),
      tambah("yaitu", kartu("u3", 40, 124, 220, "= 2,5 jam", W.emas, 15)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan empat metode luar ------------------------------ */
export const ADEGAN_LUAR_C_RINGKAS: AdeganStory = {
  id: "luarc-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan. Metode pertama, Additive Parts Sum: jumlahkan bagian, bagi total, lalu kalikan. Contohnya tiga belas bagian dan lima belas bagian.",
      tambah(0, teks("jud", 150, 24, "Ringkasan", 15, W.ungu)),
      tambah("Additive", kartu("g1", 20, 44, 260, "Additive Parts Sum", W.hiasMuda, 11)),
      tambah("tiga", teks("g1t", 150, 76, "13 bagian, 15 bagian", 9, W.biru)),
    ),
    k(
      "Metode kedua, Part-to-Whole Ratio: satu bagian dibandingkan seluruh bagian, seperti empat banding sembilan dan lima banding sembilan.",
      tambah("Part-to-Whole", kartu("g2", 20, 88, 260, "Part-to-Whole Ratio", W.obatMuda, 11)),
      tambah("seperti", teks("g2t", 150, 120, "4 : 9 dan 5 : 9", 9, W.biru)),
    ),
    k(
      "Metode ketiga, Common Time Unit Conversion: samakan satuan waktu dulu, seperti tiga bulan dan delapan belas bulan, atau sepuluh menit dan empat puluh menit.",
      tambah("Common", kartu("g3", 20, 132, 260, "Common Time Unit Conversion", W.langit, 11)),
      tambah("seperti", teks("g3t", 150, 164, "3 dan 18 bulan, 10 dan 40 menit", 9, W.biru)),
      hapus("seperti", "jud"),
    ),
    k(
      "Metode keempat, Time-Rate Scaling: cari laju per satu satuan waktu, seperti dua kilometer per jam dan dua puluh kata per menit.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Metode keempat", 14, W.ungu)),
      tambah("Time-Rate", kartu("g4", 20, 50, 260, "Time-Rate Scaling", W.krem, 12)),
      tambah("seperti", teks("g4t", 150, 90, "2 km per jam, 20 kata per menit", 10, W.biru)),
      sorotkan("seperti", "g4-k"),
    ),
    k(
      "Keempatnya membantu menyelesaikan soal rasio pada bab ini. Pilih metode sesuai soalnya, lalu periksa jawabanmu dengan tabel rasio.",
      bersih(0),
      tambah(0, teks("jud", 150, 28, "Bab 2 Rasio", 16, W.ungu)),
      tambah("Keempatnya", emo("tl", 150, 76, "🧰", 34)),
      tambah("Pilih", kartu("h1", 50, 100, 200, "pilih metode sesuai soal", W.obatMuda, 12)),
      tambah("periksa", kartu("h2", 50, 136, 200, "periksa dengan tabel rasio", W.langit, 12)),
    ),
  ],
};
