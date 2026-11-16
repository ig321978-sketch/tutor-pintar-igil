import type { AdeganStory } from "./logika-story";
import { W, emo, garis, kartu, tabel, teks } from "./k6b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b2c-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 6. Latihan 2: Banyu berjalan ------------------------------ */
export const ADEGAN_BANYU: AdeganStory = {
  id: "latihan23-banyu",
  judul: "Latihan 2: Banyu menempuh jarak",
  sumber: "Materi: Latihan 2, Banyu berjalan",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k6b2c-materi-3.ts:1"),
  ketukan: [
    k(
      "Latihan dua. Banyu menempuh jarak satu kilometer dalam waktu tiga puluh menit.",
      tambah(0, teks("jud", 150, 26, "Latihan 2", 13, W.ungu)),
      tambah("Banyu", emo("by", 50, 100, "🚶", 34)),
      tambah("satu", garis("jl", 80, 100, 150, 0, W.hijau, 3, { gambar: true }), teks("tj", 155, 88, "1 km", 12, W.hijau)),
      tambah("tiga", emo("st", 150, 150, "⏱", 28), teks("tw", 150, 172, "30 menit", 12, W.merah)),
    ),
    k(
      "Bagian a: jarak dalam satu jam. Satu jam sama dengan enam puluh menit, yaitu dua kali tiga puluh menit, jadi jaraknya dua kali satu kilometer, yaitu dua kilometer.",
      bersih(0),
      tambah(0, teks("jd2", 150, 26, "a. jarak dalam 1 jam", 13, W.ungu)),
      tambah("Satu", ...tabel("ta", 60, 44, [90, 90], 28, [["Jarak", "Waktu"], ["1 km", "30 menit"]]).flat()),
      tambah("enam", ...tabel("tb", 60, 100, [90, 90], 28, [["2 km", "60 menit"]]).flat()),
      tambah("dua", teks("x2", 262, 118, "× 2", 14, W.merah)),
    ),
    k(
      "Bagian b: waktu untuk sembilan kilometer. Dari satu kilometer menjadi sembilan kilometer berarti dikali sembilan, jadi waktunya sembilan kali tiga puluh menit, yaitu dua ratus tujuh puluh menit.",
      bersih(0),
      tambah(0, teks("jd3", 150, 26, "b. waktu untuk 9 km", 13, W.ungu)),
      tambah("Dari", ...tabel("tc", 60, 44, [90, 90], 28, [["Jarak", "Waktu"], ["1 km", "30 menit"]]).flat()),
      tambah("sembilan@2", ...tabel("td", 60, 100, [90, 90], 28, [["9 km", "270 menit"]]).flat()),
      tambah("dikali", teks("x9", 262, 118, "× 9", 14, W.merah)),
    ),
    k(
      "Ubah ke jam: dua ratus tujuh puluh dibagi enam puluh sama dengan empat setengah jam. Jadi Banyu perlu empat setengah jam.",
      bersih(0),
      tambah("Ubah", emo("jm", 150, 70, "⏰", 36)),
      tambah("dua", kartu("h1", 60, 100, 180, "270 menit : 60", W.langit, 13)),
      tambah("sama", kartu("h2", 60, 138, 180, "= 4,5 jam", W.obatMuda, 15)),
    ),
    k(
      "Bagian c: jarak dalam tiga setengah jam. Karena dalam satu jam menempuh dua kilometer, maka tiga setengah jam menempuh tiga setengah kali dua, yaitu tujuh kilometer.",
      bersih(0),
      tambah(0, teks("jd4", 150, 26, "c. jarak dalam 3,5 jam", 13, W.ungu)),
      tambah("Karena", kartu("l1", 60, 50, 180, "1 jam = 2 km", W.krem, 13)),
      tambah("maka", kartu("l2", 60, 90, 180, "3,5 jam = 3,5 × 2", W.langit, 13)),
      tambah("tujuh", kartu("l3", 60, 130, 180, "= 7 km", W.obatMuda, 15)),
    ),
    k(
      "Ketiga jawaban memakai satu laju yang sama, yaitu dua kilometer setiap jam. Rasio satuan membuat soal waktu menjadi mudah.",
      bersih(0),
      tambah("Ketiga", kartu("r1", 40, 36, 220, "a. 2 km", W.krem, 12), kartu("r2", 40, 66, 220, "b. 270 menit = 4,5 jam", W.krem, 12), kartu("r3", 40, 96, 220, "c. 7 km", W.krem, 12)),
      tambah("laju", kartu("rl", 60, 140, 180, "laju: 2 km per jam", W.emas, 14)),
    ),
  ],
};

/* ------------------------------ 7. Renungan dan Uji 1 sampai Uji 3 ------------------------------ */
const TKLUB = tabel("tk", 70, 38, [100, 70], 20, [
  ["Klub", "Anggota"],
  ["Sains", "16"],
  ["Olahraga", "?"],
  ["Seni", "24"],
  ["Robotik", "?"],
]);

export const ADEGAN_UJI_1_3: AdeganStory = {
  id: "uji-1-3",
  judul: "Renungan dan Uji 1 sampai Uji 3",
  sumber: "Materi: Renungan dan Uji 1 sampai 3",
  latar: "#FDF4FF",
  kutipan: kutipanLokal("k6b2c-materi-3.ts:2"),
  ketukan: [
    k(
      "Renungan. Setelah mempelajari bab Rasio, coba tanyakan pada dirimu: apakah kamu paham pengertian rasio, bisa menyatakan rasio dua besaran, menulis rasio yang sama, dan menentukan rasio satuan?",
      tambah(0, teks("jud", 150, 26, "Renungan bab Rasio", 14, W.ungu)),
      tambah("paham", kartu("f1", 30, 40, 240, "paham pengertian rasio?", W.krem, 10)),
      tambah("menyatakan", kartu("f2", 30, 72, 240, "dapat menyatakan rasio dua besaran?", W.krem, 10)),
      tambah("menulis", kartu("f3", 30, 104, 240, "dapat menulis rasio yang sama?", W.krem, 10)),
      tambah("menentukan", kartu("f4", 30, 136, 240, "dapat menentukan rasio satuan?", W.krem, 10)),
    ),
    k(
      "Uji satu. Klub sains beranggota enam belas orang dan klub seni dua puluh empat orang. Rasio sederhananya enam belas banding dua puluh empat menjadi dua banding tiga.",
      bersih(0),
      tambah(0, teks("jd2", 150, 24, "Uji 1", 13, W.ungu)),
      tambah("sains", TKLUB[0], TKLUB[1]),
      tambah("seni", TKLUB[2], TKLUB[3], TKLUB[4]),
      tambah("sederhananya", teks("s1", 150, 160, "16 : 24 = 2 : 3", 18, W.hijau)),
    ),
    k(
      "Olahraga banding seni adalah tiga banding dua, dan seni dua puluh empat. Karena dua puluh empat dibagi dua adalah dua belas, olahraga tiga kali dua belas sama dengan tiga puluh enam.",
      hapus("Olahraga", "s1"),
      tambah("Karena", kartu("o1", 70, 134, 160, "24 : 2 = 12", W.langit, 12)),
      tambah("olahraga@2", kartu("o2", 70, 160, 160, "3 × 12 = 36", W.obatMuda, 12)),
      ubah("enam", { id: "tk-2-1-t", isi: "36", warna: W.hijau }),
    ),
    k(
      "Olahraga banding robotik empat banding tiga, dan olahraga tiga puluh enam. Karena tiga puluh enam dibagi empat adalah sembilan, robotik tiga kali sembilan, yaitu dua puluh tujuh orang.",
      hapus("Olahraga", "o1-k", "o1-t", "o2-k", "o2-t"),
      tambah("Karena", kartu("p1", 70, 134, 160, "36 : 4 = 9", W.langit, 12)),
      tambah("robotik@2", kartu("p2", 70, 160, 160, "3 × 9 = 27", W.obatMuda, 12)),
      ubah("tujuh", { id: "tk-4-1-t", isi: "27", warna: W.hijau }),
    ),
    k(
      "Uji dua. Dony memakai tiga puluh mililiter sirup untuk dua sendok teh susu. Hana memakai enam puluh lima mililiter sirup untuk lima sendok teh susu.",
      bersih(0),
      tambah(0, teks("jd3", 150, 24, "Uji 2", 13, W.ungu)),
      tambah("Dony", emo("ed", 50, 84, "🥛", 26), kartu("dn", 76, 62, 190, "Dony: 30 ml sirup, 2 sendok susu", W.krem, 9)),
      tambah("Hana", emo("eh", 50, 134, "🥛", 26), kartu("hn", 76, 112, 190, "Hana: 65 ml sirup, 5 sendok susu", W.krem, 9)),
    ),
    k(
      "Sirup untuk satu sendok susu: Dony tiga puluh dibagi dua adalah lima belas mililiter, Hana enam puluh lima dibagi lima adalah tiga belas mililiter. Jadi susu cokelat Dony lebih terasa cokelatnya.",
      tambah("Dony", teks("pd", 150, 168, "Dony: 30 : 2 = 15 ml", 11, W.merah)),
      tambah("Hana", teks("ph", 150, 184, "Hana: 65 : 5 = 13 ml", 11, W.hijau)),
      sorotkan("Jadi", "dn-k"),
    ),
    k(
      "Uji tiga. Susu murni harganya tiga puluh ribu rupiah untuk dua belas kotak, dan susu segar tiga puluh empat ribu lima ratus rupiah untuk lima belas kotak.",
      bersih(0),
      tambah(0, teks("jd4", 150, 24, "Uji 3", 13, W.ungu)),
      tambah("murni", emo("sm", 70, 82, "🥛", 32), kartu("m1", 100, 62, 170, "susu murni Rp30.000 · 12 kotak", W.langit, 8.5)),
      tambah("segar", emo("sg", 70, 132, "🥛", 32), kartu("m2", 100, 112, 170, "susu segar Rp34.500 · 15 kotak", W.obatMuda, 8.5)),
    ),
    k(
      "Harga satu kotak susu murni adalah tiga puluh ribu dibagi dua belas, yaitu dua ribu lima ratus rupiah. Susu segar tiga puluh empat ribu lima ratus dibagi lima belas, yaitu dua ribu tiga ratus rupiah.",
      tambah("murni", teks("h1", 150, 168, "murni: 30.000 : 12 = Rp2.500", 10, W.biru)),
      tambah("segar", teks("h2", 150, 184, "segar: 34.500 : 15 = Rp2.300", 10, W.hijau)),
    ),
    k(
      "Karena dua ribu tiga ratus rupiah lebih murah daripada dua ribu lima ratus rupiah, kita memilih kemasan yang kedua, yaitu susu segar.",
      bersih(0),
      tambah("Karena", kartu("w1", 50, 50, 200, "Rp2.300 lebih murah dari Rp2.500", W.krem, 11)),
      tambah("memilih", kartu("w2", 50, 100, 200, "pilih kemasan kedua: susu segar", W.obatMuda, 12), emo("ok", 150, 160, "👍", 30)),
    ),
  ],
};

/* ------------------------------ 8. Uji 4, Uji 5, Tantangan, dan penutup bab ------------------------------ */
const TBUKU = tabel("tn", 18, 66, [76, 62, 62, 66], 26, [
  ["", "Novel", "Komik", "Total"],
  ["Rasio", "11", "4", "11 + 4 = 15"],
  ["Sebenarnya", "?", "?", "120"],
]);

export const ADEGAN_UJI_4_5: AdeganStory = {
  id: "uji-4-5-pengayaan",
  judul: "Uji 4, Uji 5, Tantangan, dan penutup bab",
  sumber: "Materi: Uji 4, Uji 5, dan Tantangan",
  latar: "#FFF1F2",
  kutipan: kutipanLokal("k6b2c-materi-3.ts:3"),
  ketukan: [
    k(
      "Uji empat. Toko Pustaka hanya menjual novel dan komik dengan rasio sebelas banding empat. Semua bacaannya ada seratus dua puluh.",
      tambah(0, teks("jud", 150, 24, "Uji 4", 13, W.ungu)),
      tambah("Toko", emo("bk", 70, 90, "📚", 34), teks("bt", 70, 108, "Toko Pustaka", 8)),
      tambah("banding", teks("r114", 210, 84, "novel : komik = 11 : 4", 10, W.ungu)),
      tambah("seratus", kartu("b120", 140, 100, 140, "semua bacaan: 120", W.krem, 11)),
    ),
    k(
      "Jumlah rasio adalah sebelas ditambah empat, yaitu lima belas. Karena lima belas kali delapan sama dengan seratus dua puluh, semua angka rasio dikali delapan.",
      bersih(0),
      tambah(0, TBUKU[0]),
      tambah("Jumlah", TBUKU[1]),
      tambah("Karena", TBUKU[2]),
      tambah("dikali", teks("k8", 150, 160, "semua angka rasio dikali 8", 13, W.merah)),
    ),
    k(
      "Novel sebelas kali delapan sama dengan delapan puluh delapan, komik empat kali delapan sama dengan tiga puluh dua. Jumlahnya seratus dua puluh bacaan.",
      ubah("puluh", { id: "tn-2-1-t", isi: "88", warna: W.merah }),
      ubah("tiga", { id: "tn-2-2-t", isi: "32", warna: W.hijau }),
      tambah("Jumlahnya", teks("jb", 150, 190, "88 + 32 = 120", 13, W.hijau)),
    ),
    k(
      "Uji lima. Seorang penulis berita mengetik seribu dua ratus kata dalam waktu satu jam. Berapa kata yang diketik dalam seratus delapan puluh menit?",
      bersih(0),
      tambah(0, teks("jd2", 150, 24, "Uji 5", 13, W.ungu)),
      tambah("penulis", emo("pn", 70, 90, "📰", 34)),
      tambah("seribu", kartu("c1", 110, 60, 170, "1.200 kata per 1 jam", W.krem, 12)),
      tambah("seratus", kartu("c2", 110, 100, 170, "berapa kata: 180 menit?", W.langit, 12)),
    ),
    k(
      "Karena seratus delapan puluh menit sama dengan tiga jam, jumlah katanya tiga kali seribu dua ratus sama dengan tiga ribu enam ratus kata.",
      tambah("Karena", kartu("c3", 60, 140, 180, "180 menit = 3 jam", W.obatMuda, 12)),
      tambah("jumlah", kartu("c4", 60, 168, 180, "3 × 1.200 = 3.600 kata", W.emas, 12)),
    ),
    k(
      "Untuk menulis tiga ribu kata, tiga ribu dibagi seribu dua ratus sama dengan dua setengah jam, atau seratus lima puluh menit.",
      bersih(0),
      tambah(0, teks("jd3", 150, 40, "3.000 kata berapa lama?", 15, W.ungu)),
      tambah("dibagi", kartu("d1", 50, 70, 200, "3.000 : 1.200 = 2,5 jam", W.langit, 14)),
      tambah("atau", kartu("d2", 50, 118, 200, "2,5 jam = 150 menit", W.obatMuda, 14), emo("jam", 150, 180, "⏰", 28)),
    ),
    k(
      "Tantangan. Pilih satu makanan khas daerahmu, tuliskan bahan untuk porsi lima orang, lalu bahan untuk porsi tiga kali lebih banyak.",
      bersih(0),
      tambah(0, teks("jd4", 150, 26, "Tantangan", 14, W.ungu), emo("mk", 150, 80, "🍲", 38)),
      tambah("porsi", kartu("g1", 50, 110, 200, "bahan untuk porsi 5 orang", W.krem, 11)),
      tambah("porsi@2", kartu("g2", 50, 142, 200, "bahan untuk porsi 3 kali lebih banyak", W.hiasMuda, 11)),
    ),
    k(
      "Contoh pempek dari Palembang: untuk lima orang memakai dua butir telur dan seratus lima puluh gram tepung terigu. Untuk tiga kali lebih banyak, jadi enam butir telur dan empat ratus lima puluh gram tepung terigu.",
      bersih(0),
      tambah(0, teks("jd5", 150, 26, "Contoh: pempek Palembang", 12, W.ungu)),
      tambah("orang", ...tabel("tg", 40, 44, [90, 80, 80], 26, [["Bahan", "5 orang", "× 3"], ["telur", "2 butir", "6 butir"], ["terigu", "150 gram", "450 gram"]]).flat()),
    ),
    k(
      "Itulah isi Sub-Bab C. Rasio bagian terhadap bagian, bagian terhadap keseluruhan, dan rasio pada durasi waktu melengkapi bab Rasio.",
      bersih(0),
      tambah("Itulah", teks("jd6", 150, 28, "Bab Rasio", 16, W.ungu)),
      tambah("bagian", kartu("z1", 50, 50, 200, "bagian : bagian", W.hiasMuda, 12)),
      tambah("keseluruhan", kartu("z2", 50, 84, 200, "bagian : keseluruhan", W.obatMuda, 12)),
      tambah("durasi", kartu("z3", 50, 118, 200, "durasi waktu", W.langit, 12), emo("ok", 150, 175, "🌟", 26)),
    ),
  ],
};
