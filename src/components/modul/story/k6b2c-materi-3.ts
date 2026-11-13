import type { AdeganStory } from "./logika-story";
import { W, emo, garis, kartu, tabel, teks } from "./k6b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b2c-bantu";

/* ------------------------------ 6. Latihan 2.3 nomor 2: Banyu berjalan (hlm. 72) ------------------------------ */
export const ADEGAN_BANYU: AdeganStory = {
  id: "latihan23-banyu",
  judul: "Latihan 2.3 nomor 2: Banyu menempuh jarak",
  sumber: "Buku Siswa hlm. 72",
  latar: "#F0F9FF",
  kutipan: ["Banyu dapat menempuh jarak sepanjang 1 km dalam waktu 30 menit", "Berapakah jarak yang ditempuh Banyu dalam waktu 1 jam", "Jika Banyu berjalan selama 3,5 jam, berapa jarak yang ia tempuh"],
  ketukan: [
    k(
      "Nomor 2. Banyu menempuh jarak 1 km dalam waktu 30 menit.",
      tambah(0, teks("jud", 150, 26, "Latihan 2.3 nomor 2", 13, W.ungu)),
      tambah("Banyu", emo("by", 50, 100, "🚶", 34)),
      tambah("1", garis("jl", 80, 100, 150, 0, W.hijau, 3, { gambar: true }), teks("tj", 155, 88, "1 km", 12, W.hijau)),
      tambah("30", emo("st", 150, 150, "⏱", 28), teks("tw", 150, 172, "30 menit", 12, W.merah)),
    ),
    k(
      "Bagian a: jarak dalam 1 jam. Satu jam sama dengan 60 menit, yaitu dua kali 30 menit, jadi jaraknya dua kali 1 km, yaitu 2 km.",
      bersih(0),
      tambah(0, teks("jd2", 150, 26, "a. jarak dalam 1 jam", 13, W.ungu)),
      tambah("Satu", ...tabel("ta", 60, 44, [90, 90], 28, [["Jarak", "Waktu"], ["1 km", "30 menit"]]).flat()),
      tambah("60", ...tabel("tb", 60, 100, [90, 90], 28, [["2 km", "60 menit"]]).flat()),
      tambah("dua", teks("x2", 262, 118, "× 2", 14, W.merah)),
    ),
    k(
      "Bagian b: waktu untuk 9 km. Dari 1 km menjadi 9 km berarti dikali 9, jadi waktunya 9 kali 30 menit, yaitu 270 menit.",
      bersih(0),
      tambah(0, teks("jd3", 150, 26, "b. waktu untuk 9 km", 13, W.ungu)),
      tambah("Dari", ...tabel("tc", 60, 44, [90, 90], 28, [["Jarak", "Waktu"], ["1 km", "30 menit"]]).flat()),
      tambah("9@2", ...tabel("td", 60, 100, [90, 90], 28, [["9 km", "270 menit"]]).flat()),
      tambah("dikali", teks("x9", 262, 118, "× 9", 14, W.merah)),
    ),
    k(
      "Ubah ke jam: 270 dibagi 60 sama dengan 4,5 jam. Jadi Banyu perlu empat setengah jam.",
      bersih(0),
      tambah("Ubah", emo("jm", 150, 70, "⏰", 36)),
      tambah("270", kartu("h1", 60, 100, 180, "270 menit : 60", W.langit, 13)),
      tambah("sama", kartu("h2", 60, 138, 180, "= 4,5 jam", W.obatMuda, 15)),
    ),
    k(
      "Bagian c: jarak dalam 3,5 jam. Karena dalam 1 jam menempuh 2 km, maka 3,5 jam menempuh 3,5 kali 2, yaitu 7 km.",
      bersih(0),
      tambah(0, teks("jd4", 150, 26, "c. jarak dalam 3,5 jam", 13, W.ungu)),
      tambah("Karena", kartu("l1", 60, 50, 180, "1 jam = 2 km", W.krem, 13)),
      tambah("maka", kartu("l2", 60, 90, 180, "3,5 jam = 3,5 × 2", W.langit, 13)),
      tambah("7", kartu("l3", 60, 130, 180, "= 7 km", W.obatMuda, 15)),
    ),
    k(
      "Ketiga jawaban memakai satu laju yang sama, yaitu 2 km setiap jam. Rasio satuan membuat soal waktu menjadi mudah.",
      bersih(0),
      tambah("Ketiga", kartu("r1", 40, 36, 220, "a. 2 km", W.krem, 12), kartu("r2", 40, 66, 220, "b. 270 menit = 4,5 jam", W.krem, 12), kartu("r3", 40, 96, 220, "c. 7 km", W.krem, 12)),
      tambah("laju", kartu("rl", 60, 140, 180, "laju: 2 km per jam", W.emas, 14)),
    ),
  ],
};

/* ------------------------------ 7. Refleksi dan Uji Kompetensi nomor 1 sampai 3 (hlm. 72 dan 73) ------------------------------ */
const TKLUB = tabel("tk", 70, 38, [100, 70], 20, [
  ["Klub", "Anggota"],
  ["Sains", "16"],
  ["Olahraga", "?"],
  ["Seni", "24"],
  ["Robotik", "?"],
]);

export const ADEGAN_UJI_1_3: AdeganStory = {
  id: "uji-1-3",
  judul: "Refleksi dan Uji Kompetensi nomor 1 sampai 3",
  sumber: "Buku Siswa hlm. 72–73",
  latar: "#FDF4FF",
  kutipan: [
    "Setelah mempelajari keseluruhan materi pada bab Rasio, ayo berefleksi",
    "Apakah kalian dapat menentukan rasio satuan",
    "jumlah siswa yang bergabung dalam berbagai klub di sekolah",
    "Dony membuat susu cokelat dengan 30 ml sirup cokelat untuk setiap 2 sendok teh susu",
    "Hana menambahkan 65 ml sirup cokelat untuk setiap 5 sendok teh susu",
    "Kotak susu kemasan mana yang kalian ambil",
    "Rp34.500",
  ],
  ketukan: [
    k(
      "Setelah mempelajari bab Rasio, ayo berefleksi. Apakah kamu paham pengertian rasio, bisa menyatakan rasio dua besaran, menulis rasio yang sama, dan menentukan rasio satuan?",
      tambah(0, teks("jud", 150, 26, "Refleksi bab Rasio", 14, W.ungu)),
      tambah("paham", kartu("f1", 30, 40, 240, "paham pengertian rasio?", W.krem, 10)),
      tambah("menyatakan", kartu("f2", 30, 72, 240, "dapat menyatakan rasio dua besaran?", W.krem, 10)),
      tambah("menulis", kartu("f3", 30, 104, 240, "dapat menulis rasio yang sama?", W.krem, 10)),
      tambah("menentukan", kartu("f4", 30, 136, 240, "dapat menentukan rasio satuan?", W.krem, 10)),
    ),
    k(
      "Uji Kompetensi nomor 1. Klub sains beranggota 16 orang dan klub seni 24 orang. Rasio sederhananya 16 banding 24 menjadi 2 banding 3.",
      bersih(0),
      tambah(0, teks("jd2", 150, 24, "Uji Kompetensi nomor 1", 13, W.ungu)),
      tambah("sains", TKLUB[0], TKLUB[1]),
      tambah("seni", TKLUB[2], TKLUB[3], TKLUB[4]),
      tambah("sederhananya", teks("s1", 150, 160, "16 : 24 = 2 : 3", 18, W.hijau)),
    ),
    k(
      "Olahraga banding seni adalah 3 banding 2, dan seni 24. Karena 24 dibagi 2 adalah 12, olahraga 3 kali 12 sama dengan 36.",
      hapus("Olahraga", "s1"),
      tambah("Karena", kartu("o1", 70, 134, 160, "24 : 2 = 12", W.langit, 12)),
      tambah("olahraga@2", kartu("o2", 70, 160, 160, "3 × 12 = 36", W.obatMuda, 12)),
      ubah("36", { id: "tk-2-1-t", isi: "36", warna: W.hijau }),
    ),
    k(
      "Olahraga banding robotik 4 banding 3, dan olahraga 36. Karena 36 dibagi 4 adalah 9, robotik 3 kali 9, yaitu 27 orang.",
      hapus("Olahraga", "o1-k", "o1-t", "o2-k", "o2-t"),
      tambah("Karena", kartu("p1", 70, 134, 160, "36 : 4 = 9", W.langit, 12)),
      tambah("robotik@2", kartu("p2", 70, 160, 160, "3 × 9 = 27", W.obatMuda, 12)),
      ubah("27", { id: "tk-4-1-t", isi: "27", warna: W.hijau }),
    ),
    k(
      "Nomor 2. Dony memakai 30 ml sirup untuk 2 sendok teh susu. Hana memakai 65 ml sirup untuk 5 sendok teh susu.",
      bersih(0),
      tambah(0, teks("jd3", 150, 24, "Uji Kompetensi nomor 2", 13, W.ungu)),
      tambah("Dony", emo("ed", 50, 84, "🥛", 26), kartu("dn", 76, 62, 190, "Dony: 30 ml sirup, 2 sendok susu", W.krem, 9)),
      tambah("Hana", emo("eh", 50, 134, "🥛", 26), kartu("hn", 76, 112, 190, "Hana: 65 ml sirup, 5 sendok susu", W.krem, 9)),
    ),
    k(
      "Sirup untuk satu sendok susu: Dony 30 dibagi 2 adalah 15 ml, Hana 65 dibagi 5 adalah 13 ml. Jadi susu cokelat Dony lebih terasa cokelatnya.",
      tambah("Dony", teks("pd", 150, 168, "Dony: 30 : 2 = 15 ml", 11, W.merah)),
      tambah("Hana", teks("ph", 150, 184, "Hana: 65 : 5 = 13 ml", 11, W.hijau)),
      sorotkan("Jadi", "dn-k"),
    ),
    k(
      "Nomor 3. Susu murni harganya Rp30.000 untuk 12 kotak, dan susu segar Rp34.500 untuk 15 kotak.",
      bersih(0),
      tambah(0, teks("jd4", 150, 24, "Uji Kompetensi nomor 3", 13, W.ungu)),
      tambah("murni", emo("sm", 70, 82, "🥛", 32), kartu("m1", 100, 62, 170, "susu murni Rp30.000 · 12 kotak", W.langit, 8.5)),
      tambah("segar", emo("sg", 70, 132, "🥛", 32), kartu("m2", 100, 112, 170, "susu segar Rp34.500 · 15 kotak", W.obatMuda, 8.5)),
    ),
    k(
      "Harga satu kotak susu murni adalah 30.000 dibagi 12, yaitu Rp2.500. Susu segar 34.500 dibagi 15, yaitu Rp2.300.",
      tambah("murni", teks("h1", 150, 168, "murni: 30.000 : 12 = Rp2.500", 10, W.biru)),
      tambah("segar", teks("h2", 150, 184, "segar: 34.500 : 15 = Rp2.300", 10, W.hijau)),
    ),
    k(
      "Karena Rp2.300 lebih murah daripada Rp2.500, kita memilih kemasan yang kedua, yaitu susu segar.",
      bersih(0),
      tambah("Karena", kartu("w1", 50, 50, 200, "Rp2.300 lebih murah dari Rp2.500", W.krem, 11)),
      tambah("memilih", kartu("w2", 50, 100, 200, "pilih kemasan kedua: susu segar", W.obatMuda, 12), emo("ok", 150, 160, "👍", 30)),
    ),
  ],
};

/* ------------------------------ 8. Uji Kompetensi nomor 4 dan 5, Pengayaan, dan penutup bab (hlm. 73 dan 74) ------------------------------ */
const TBUKU = tabel("tn", 18, 66, [76, 62, 62, 66], 26, [
  ["", "Novel", "Komik", "Total"],
  ["Rasio", "11", "4", "11 + 4 = 15"],
  ["Sebenarnya", "?", "?", "120"],
]);

export const ADEGAN_UJI_4_5: AdeganStory = {
  id: "uji-4-5-pengayaan",
  judul: "Uji Kompetensi nomor 4 dan 5, Pengayaan, dan penutup bab",
  sumber: "Buku Siswa hlm. 73–74",
  latar: "#FFF1F2",
  kutipan: [
    "Rasio banyak novel dan komik adalah 11 : 4",
    "Seorang penulis berita dapat mengetik sebanyak 1.200 kata dalam waktu 1 jam",
    "untuk menuliskan 3.000 kata",
    "Indonesia adalah negara yang memiliki kekayaan hasil alam yang melimpah",
    "dalam porsi yang 3 kali lebih banyak",
  ],
  ketukan: [
    k(
      "Nomor 4. Toko Buku Pustaka hanya menjual novel dan komik dengan rasio 11 banding 4. Semua bukunya ada 120.",
      tambah(0, teks("jud", 150, 24, "Uji Kompetensi nomor 4", 13, W.ungu)),
      tambah("Toko", emo("bk", 70, 90, "📚", 34), teks("bt", 70, 108, "Toko Buku Pustaka", 8)),
      tambah("banding", teks("r114", 210, 84, "novel : komik = 11 : 4", 10, W.ungu)),
      tambah("120", kartu("b120", 140, 100, 140, "semua buku: 120", W.krem, 11)),
    ),
    k(
      "Jumlah rasio adalah 11 ditambah 4, yaitu 15. Karena 15 kali 8 sama dengan 120, semua angka rasio dikali 8.",
      bersih(0),
      tambah(0, TBUKU[0]),
      tambah("Jumlah", TBUKU[1]),
      tambah("Karena", TBUKU[2]),
      tambah("dikali", teks("k8", 150, 160, "semua angka rasio dikali 8", 13, W.merah)),
    ),
    k(
      "Novel 11 kali 8 sama dengan 88, komik 4 kali 8 sama dengan 32. Jumlahnya 120 buku.",
      ubah("88", { id: "tn-2-1-t", isi: "88", warna: W.merah }),
      ubah("32", { id: "tn-2-2-t", isi: "32", warna: W.hijau }),
      tambah("Jumlahnya", teks("jb", 150, 190, "88 + 32 = 120", 13, W.hijau)),
    ),
    k(
      "Nomor 5. Seorang penulis berita mengetik 1.200 kata dalam waktu 1 jam. Berapa kata yang diketik dalam 180 menit?",
      bersih(0),
      tambah(0, teks("jd2", 150, 24, "Uji Kompetensi nomor 5", 13, W.ungu)),
      tambah("penulis", emo("pn", 70, 90, "📰", 34)),
      tambah("1.200", kartu("c1", 110, 60, 170, "1.200 kata per 1 jam", W.krem, 12)),
      tambah("180", kartu("c2", 110, 100, 170, "berapa kata: 180 menit?", W.langit, 12)),
    ),
    k(
      "Karena 180 menit sama dengan 3 jam, jumlah katanya 3 kali 1.200 sama dengan 3.600 kata.",
      tambah("Karena", kartu("c3", 60, 140, 180, "180 menit = 3 jam", W.obatMuda, 12)),
      tambah("jumlah", kartu("c4", 60, 168, 180, "3 × 1.200 = 3.600 kata", W.emas, 12)),
    ),
    k(
      "Untuk menulis 3.000 kata, 3.000 dibagi 1.200 sama dengan 2,5 jam, atau 150 menit.",
      bersih(0),
      tambah(0, teks("jd3", 150, 40, "3.000 kata berapa lama?", 15, W.ungu)),
      tambah("dibagi", kartu("d1", 50, 70, 200, "3.000 : 1.200 = 2,5 jam", W.langit, 14)),
      tambah("atau", kartu("d2", 50, 118, 200, "2,5 jam = 150 menit", W.obatMuda, 14), emo("jam", 150, 180, "⏰", 28)),
    ),
    k(
      "Pengayaan. Pilih satu makanan khas daerahmu, tuliskan bahan untuk porsi 5 orang, lalu bahan untuk porsi 3 kali lebih banyak.",
      bersih(0),
      tambah(0, teks("jd4", 150, 26, "Pengayaan", 14, W.ungu), emo("mk", 150, 80, "🍲", 38)),
      tambah("porsi", kartu("g1", 50, 110, 200, "bahan untuk porsi 5 orang", W.krem, 11)),
      tambah("porsi@2", kartu("g2", 50, 142, 200, "bahan untuk porsi 3 kali lebih banyak", W.hiasMuda, 11)),
    ),
    k(
      "Contoh pempek dari Palembang: untuk 5 orang memakai 2 butir telur dan 150 gram tepung terigu. Untuk 3 kali lebih banyak, jadi 6 butir telur dan 450 gram tepung terigu.",
      bersih(0),
      tambah(0, teks("jd5", 150, 26, "Contoh: pempek Palembang", 12, W.ungu)),
      tambah("orang", ...tabel("tg", 40, 44, [90, 80, 80], 26, [["Bahan", "5 orang", "× 3"], ["telur", "2 butir", "6 butir"], ["terigu", "150 gram", "450 gram"]]).flat()),
    ),
    k(
      "Itulah isi Sub-Bab C. Rasio bagian terhadap bagian, bagian terhadap keseluruhan, dan rasio pada durasi waktu melengkapi Bab 2 Rasio.",
      bersih(0),
      tambah("Itulah", teks("jd6", 150, 28, "Bab 2 Rasio", 16, W.ungu)),
      tambah("bagian", kartu("z1", 50, 50, 200, "bagian : bagian", W.hiasMuda, 12)),
      tambah("keseluruhan", kartu("z2", 50, 84, 200, "bagian : keseluruhan", W.obatMuda, 12)),
      tambah("durasi", kartu("z3", 50, 118, 200, "durasi waktu", W.langit, 12), emo("ok", 150, 175, "🌟", 26)),
    ),
  ],
};
