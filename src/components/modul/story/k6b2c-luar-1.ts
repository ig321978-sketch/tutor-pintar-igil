import type { AdeganStory } from "./logika-story";
import { W, deret, emo, garis, kartu, teks } from "./k6b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b2c-bantu";

/** Kartu metode pada peta empat metode: kotak berjudul dan satu baris keterangan. */
const metode = (id: string, x: number, y: number, nama: string, ket: string, warna: string) => [...kartu(id, x, y, 132, nama, warna, 7.4), teks(`${id}-s`, x + 66, y + 30, ket, 7.4, W.biru)];

/* ------------------------------ 1. Peta empat metode luar ------------------------------ */
export const ADEGAN_LUAR_C_PEMBUKA: AdeganStory = {
  id: "luarc-pembuka",
  judul: "Empat metode luar untuk penerapan rasio",
  sumber: "Metode luar: peta empat metode",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ada empat metode luar untuk penerapan rasio. Tiap metode kita lihat konsepnya, lalu kita terapkan pada contoh Toko Herbal Tani, pasar malam, dan Banyu.",
      tambah(0, teks("jud", 150, 26, "Empat Metode Luar", 15, W.ungu)),
      tambah("metode", emo("alat", 150, 76, "🧰", 34)),
      tambah("konsepnya", kartu("kn", 40, 100, 100, "konsep", W.krem, 11)),
      tambah("terapkan", kartu("tr", 160, 100, 100, "terapan", W.obatMuda, 11)),
    ),
    k(
      "Metode pertama, Additive Parts Sum, menjumlahkan semua bagian rasio lebih dulu untuk mencari nilai satu bagian.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Empat Metode Luar", 15, W.ungu)),
      tambah("pertama", metode("m1", 14, 46, "Additive Parts Sum", "jumlahkan bagian", W.hiasMuda)),
      sorotkan("Additive", "m1-k"),
    ),
    k(
      "Metode kedua, Part-to-Whole Ratio, membandingkan satu bagian dengan keseluruhan.",
      tambah("kedua", metode("m2", 156, 46, "Part-to-Whole Ratio", "bagian : seluruh", W.obatMuda)),
      sorotkan("Part-to-Whole", "m2-k"),
      ubah("kedua", { id: "m1-k", sorot: false }),
    ),
    k(
      "Metode ketiga, Common Time Unit Conversion, menyamakan satuan waktu sebelum membandingkan.",
      tambah("ketiga", metode("m3", 14, 112, "Common Time Unit Conversion", "samakan satuan waktu", W.langit)),
      sorotkan("Common", "m3-k"),
      ubah("ketiga", { id: "m2-k", sorot: false }),
    ),
    k(
      "Metode keempat, Time-Rate Scaling, memakai laju per satuan waktu untuk mengubah jarak atau pekerjaan menjadi waktu.",
      tambah("keempat", metode("m4", 156, 112, "Time-Rate Scaling", "laju per satuan waktu", W.krem)),
      sorotkan("Time-Rate", "m4-k"),
      ubah("keempat", { id: "m3-k", sorot: false }),
    ),
  ],
};

/* ------------------------------ 2. Additive Parts Sum: konsep ------------------------------ */
export const ADEGAN_LUAR_C_JUMLAH: AdeganStory = {
  id: "luarc-jumlah",
  judul: "Additive Parts Sum: jumlahkan bagian dulu",
  sumber: "Metode luar: Additive Parts Sum",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Additive Parts Sum berarti menjumlahkan semua bagian rasio lebih dulu. Rasio empat banding lima berarti empat bagian untuk hias dan lima bagian untuk obat.",
      tambah(0, teks("jud", 150, 24, "Additive Parts Sum", 14, W.ungu)),
      tambah("empat", deret("h", 60, 60, 4, 18, W.hiasMuda), teks("lh", 98, 54, "4 bagian", 8, W.merah)),
      tambah("obat", deret("o", 144, 60, 5, 18, W.obatMuda), teks("lo", 189, 54, "5 bagian", 8, W.hijau)),
    ),
    k(
      "Jumlah semua bagian adalah empat ditambah lima sama dengan sembilan bagian. Bagian inilah yang dipakai sebagai pembagi total.",
      tambah("Jumlah", garis("br", 60, 92, 180, 0, W.biru, 2.5, { gambar: true })),
      tambah("ditambah", teks("sm", 150, 114, "4 + 5 = 9 bagian", 15, W.ungu)),
    ),
    k(
      "Total sebenarnya dibagi jumlah bagian menghasilkan nilai satu bagian. Misalkan total tujuh puluh dua, maka tujuh puluh dua dibagi sembilan sama dengan delapan.",
      tambah("Total", teks("tt", 150, 146, "total sebenarnya : jumlah bagian", 9, W.salem)),
      tambah("tujuh", teks("ts", 150, 168, "72 : 9 = 8", 16, W.merah)),
    ),
    k(
      "Setiap kotak bagian bernilai delapan. Hias punya empat kotak sehingga empat kali delapan sama dengan tiga puluh dua, obat punya lima kotak sehingga lima kali delapan sama dengan empat puluh.",
      hapus("Setiap", "tt"),
      tambah("Setiap", teks("sk", 150, 190, "1 kotak = 8", 11, W.merah)),
      ubah("tiga", { id: "lh", isi: "4 × 8 = 32", warna: W.merah }),
      ubah("empat@3", { id: "lo", isi: "5 × 8 = 40", warna: W.hijau }),
    ),
    k(
      "Aturannya: jumlahkan bagian, bagi total, lalu kalikan. Pemeriksaan: tiga puluh dua ditambah empat puluh harus kembali menjadi tujuh puluh dua.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Additive Parts Sum", 14, W.ungu)),
      tambah("jumlahkan", kartu("a1", 40, 44, 220, "1. jumlahkan semua bagian", W.hiasMuda, 11)),
      tambah("bagi@2", kartu("a2", 40, 78, 220, "2. total dibagi jumlah bagian", W.krem, 11)),
      tambah("kalikan.", kartu("a3", 40, 112, 220, "3. nilai satu bagian kali banyak bagian", W.obatMuda, 10)),
      tambah("tiga", teks("pk", 150, 168, "periksa: 32 + 40 = 72", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Additive Parts Sum: penerapan ------------------------------ */
export const ADEGAN_LUAR_C_JUMLAH_TERAPAN: AdeganStory = {
  id: "luarc-jumlah-terapan",
  judul: "Additive Parts Sum pada pasar malam dan toko pustaka",
  sumber: "Metode luar: Additive Parts Sum",
  latar: "#FEF2F2",
  ketukan: [
    k(
      "Terapkan pada pasar malam. Anak-anak banding dewasa adalah sembilan banding empat, dan total pengunjung tiga ratus sembilan puluh.",
      tambah(0, teks("jud", 150, 24, "Pasar malam", 14, W.ungu)),
      tambah("Anak-anak", deret("a", 36, 64, 9, 18, W.hiasMuda, 2), teks("la", 126, 56, "anak-anak 9", 8, W.merah)),
      tambah("dewasa", deret("d", 36 + 9 * 20, 64, 4, 18, W.obatMuda, 2), teks("ld", 36 + 9 * 20 + 40, 56, "dewasa 4", 8, W.hijau)),
      tambah("tiga", teks("t390", 150, 108, "total pengunjung 390", 11, W.biru)),
    ),
    k(
      "Jumlah bagian adalah sembilan ditambah empat sama dengan tiga belas. Jadi ada tiga belas kotak bagian.",
      tambah("Jumlah", teks("j13", 150, 140, "9 + 4 = 13 kotak", 15, W.ungu)),
    ),
    k(
      "Nilai satu bagian adalah tiga ratus sembilan puluh dibagi tiga belas sama dengan tiga puluh. Tiap kotak bernilai tiga puluh pengunjung.",
      tambah("Nilai", teks("n30", 150, 164, "390 : 13 = 30", 16, W.merah)),
      tambah("Tiap", teks("kb", 150, 184, "1 kotak = 30 orang", 10, W.merah)),
    ),
    k(
      "Anak-anak punya sembilan kotak, jadi sembilan kali tiga puluh sama dengan dua ratus tujuh puluh. Dewasa punya empat kotak, jadi empat kali tiga puluh sama dengan seratus dua puluh.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pasar malam", 14, W.ungu)),
      tambah("Anak-anak", kartu("p1", 50, 50, 200, "anak-anak: 9 × 30 = 270", W.hiasMuda, 12)),
      tambah("Dewasa", kartu("p2", 50, 88, 200, "dewasa: 4 × 30 = 120", W.obatMuda, 12)),
    ),
    k(
      "Sekarang Toko Pustaka: novel banding komik adalah sebelas banding empat, dan semua bacaan seratus dua puluh. Jumlah bagian lima belas, dan seratus dua puluh dibagi lima belas sama dengan delapan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Toko Pustaka", 14, W.ungu)),
      tambah("novel", deret("n", 30, 58, 11, 16, W.hiasMuda, 2), teks("ln", 120, 50, "novel 11", 8, W.merah)),
      tambah("komik", deret("c", 30 + 11 * 18, 58, 4, 16, W.obatMuda, 2), teks("lc", 30 + 11 * 18 + 34, 50, "komik 4", 8, W.hijau)),
      tambah("seratus", teks("t120", 150, 100, "semua bacaan 120", 11)),
      tambah("lima", teks("b15", 150, 132, "11 + 4 = 15 bagian", 14, W.ungu)),
      tambah("dibagi", teks("b8", 150, 158, "120 : 15 = 8", 16, W.merah)),
    ),
    k(
      "Novel sebelas kali delapan sama dengan delapan puluh delapan, komik empat kali delapan sama dengan tiga puluh dua. Hasilnya sama dengan jawaban memakai tabel rasio.",
      hapus("Novel", "t120", "b15", "b8"),
      tambah("Novel", kartu("q1", 50, 100, 200, "novel: 11 × 8 = 88", W.hiasMuda, 12)),
      tambah("komik", kartu("q2", 50, 134, 200, "komik: 4 × 8 = 32", W.obatMuda, 12)),
      tambah("tabel", teks("cc", 150, 186, "sama dengan cara tabel rasio", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Part-to-Whole Ratio: konsep ------------------------------ */
export const ADEGAN_LUAR_C_UTUH: AdeganStory = {
  id: "luarc-utuh",
  judul: "Part-to-Whole Ratio: satu bagian terhadap seluruh",
  sumber: "Metode luar: Part-to-Whole Ratio",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Part-to-Whole Ratio membandingkan satu bagian dengan keseluruhan. Pembilangnya satu bagian, penyebutnya seluruh bagian.",
      tambah(0, teks("jud", 150, 24, "Part-to-Whole Ratio", 14, W.ungu)),
      tambah("satu", deret("h", 60, 56, 4, 18, W.hiasMuda), teks("lb", 98, 50, "satu bagian", 8, W.merah)),
      tambah("keseluruhan", deret("o", 144, 56, 5, 18, W.obatMuda)),
      tambah("penyebutnya", garis("br", 60, 86, 180, 0, W.biru, 2.5, { gambar: true }), teks("ls", 150, 102, "seluruh bagian", 9, W.biru)),
    ),
    k(
      "Dari rasio empat banding lima, seluruhnya ada empat ditambah lima sama dengan sembilan bagian. Hias empat bagian dari sembilan, ditulis empat banding sembilan.",
      tambah("rasio", teks("r45", 150, 128, "4 : 5  →  4 + 5 = 9", 13, W.ungu)),
      tambah("ditulis", teks("r49", 150, 154, "hias : seluruh = 4 : 9", 15, W.merah)),
    ),
    k(
      "Obat lima bagian dari sembilan, ditulis lima banding sembilan. Rasio bagian terhadap keseluruhan selalu memakai jumlah semua bagian di belakang.",
      tambah("ditulis", teks("r59", 150, 180, "obat : seluruh = 5 : 9", 15, W.hijau)),
      sorotkan("Obat", "o0", "o1", "o2", "o3", "o4"),
    ),
    k(
      "Hati-hati, jangan tertukar. Empat banding lima membandingkan dua bagian, sedangkan empat banding sembilan membandingkan satu bagian dengan keseluruhan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Part-to-Whole Ratio", 14, W.ungu)),
      tambah("banding", kartu("w1", 40, 50, 220, "4 : 5  bagian : bagian", W.hiasMuda, 12)),
      tambah("sedangkan", kartu("w2", 40, 92, 220, "4 : 9  bagian : seluruh", W.obatMuda, 12), emo("rb", 150, 150, "🔍", 28)),
    ),
    k(
      "Dua bagian bersama-sama membentuk keseluruhan. Hias empat banding sembilan dan obat lima banding sembilan, jumlahnya sembilan banding sembilan, yaitu satu banding satu.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Dua bagian = satu utuh", 14, W.ungu)),
      tambah("Hias", kartu("u1", 50, 48, 200, "4 : 9  hias", W.hiasMuda, 12)),
      tambah("obat", kartu("u2", 50, 82, 200, "5 : 9  obat", W.obatMuda, 12)),
      tambah("jumlahnya", kartu("u3", 50, 124, 200, "9 : 9 = 1 : 1  (utuh)", W.emas, 13)),
    ),
  ],
};

/* ------------------------------ 5. Part-to-Whole Ratio: penerapan ------------------------------ */
export const ADEGAN_LUAR_C_UTUH_TERAPAN: AdeganStory = {
  id: "luarc-utuh-terapan",
  judul: "Part-to-Whole Ratio pada Toko Herbal Tani, Toko Pustaka, dan pasar malam",
  sumber: "Metode luar: Part-to-Whole Ratio",
  latar: "#F0FDFA",
  ketukan: [
    k(
      "Toko Herbal Tani: hias banding obat adalah tiga banding dua. Seluruhnya tiga ditambah dua sama dengan lima bagian.",
      tambah(0, teks("jud", 150, 24, "Toko Herbal Tani", 14, W.ungu)),
      tambah("hias", deret("h", 80, 56, 3, 22, W.hiasMuda), deret("o", 80 + 3 * 24, 56, 2, 22, W.obatMuda), teks("l32", 150, 100, "hias : obat = 3 : 2", 11)),
      tambah("Seluruhnya", teks("s5", 150, 128, "3 + 2 = 5 bagian", 14, W.ungu)),
    ),
    k(
      "Maka hias terhadap seluruh adalah tiga banding lima, dan obat terhadap seluruh adalah dua banding lima.",
      tambah("hias", teks("p35", 150, 156, "hias : seluruh = 3 : 5", 14, W.merah)),
      tambah("obat", teks("p25", 150, 180, "obat : seluruh = 2 : 5", 14, W.hijau)),
    ),
    k(
      "Sekarang novel banding komik adalah sebelas banding empat. Seluruhnya lima belas bagian, jadi novel terhadap seluruh adalah sebelas banding lima belas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Toko Pustaka", 14, W.ungu)),
      tambah("novel", kartu("n1", 40, 46, 220, "novel : komik = 11 : 4", W.krem, 12)),
      tambah("Seluruhnya", kartu("n2", 40, 84, 220, "11 + 4 = 15 bagian", W.langit, 12)),
      tambah("jadi", kartu("n3", 40, 122, 220, "novel : seluruh = 11 : 15", W.hiasMuda, 12)),
    ),
    k(
      "Komik terhadap seluruh adalah empat banding lima belas. Dari seratus dua puluh bacaan, novel ada delapan puluh delapan, dan komik ada tiga puluh dua.",
      tambah("Komik", kartu("n4", 40, 150, 220, "komik : seluruh = 4 : 15", W.obatMuda, 12)),
      tambah("seratus", teks("n5", 150, 190, "120 bacaan: novel 88, komik 32", 9, W.biru)),
    ),
    k(
      "Periksa dengan hitungan: delapan puluh delapan banding seratus dua puluh dibagi delapan menjadi sebelas banding lima belas. Cocok dengan rasio bagian terhadap keseluruhan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Periksa", 14, W.ungu)),
      tambah("delapan", kartu("c1", 40, 56, 220, "88 : 120", W.krem, 14)),
      tambah("dibagi", kartu("c2", 40, 100, 220, "dibagi 8", W.langit, 14)),
      tambah("menjadi", kartu("c3", 40, 144, 220, "11 : 15  cocok", W.obatMuda, 14)),
    ),
    k(
      "Pasar malam: anak-anak terhadap seluruh adalah sembilan banding tiga belas. Pengunjung tiga ratus sembilan puluh, anak-anak dua ratus tujuh puluh, dan dua ratus tujuh puluh banding tiga ratus sembilan puluh dibagi tiga puluh sama dengan sembilan banding tiga belas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pasar malam", 14, W.ungu), emo("rm", 150, 62, "🎡", 28)),
      tambah("anak-anak", teks("a13", 150, 106, "anak-anak : seluruh = 9 : 13", 12, W.merah)),
      tambah("Pengunjung", teks("a390", 150, 132, "pengunjung 390, anak-anak 270", 10)),
      tambah("dua@2", teks("a270", 150, 160, "270 : 390  dibagi 30", 12, W.salem)),
      tambah("banding@3", teks("a913", 150, 184, "= 9 : 13", 16, W.hijau)),
    ),
  ],
};
