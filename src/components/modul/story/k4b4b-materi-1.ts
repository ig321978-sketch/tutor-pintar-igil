import type { AdeganStory } from "./logika-story";
import { W, daftar, emo, kartu, judul, teks } from "./k4b4b-gambar";
import { bersih, k, tambah, ubah } from "./k4b4b-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab B (Buku Siswa hlm. 122; Panduan Guru hlm. 155-156) ------------------------------ */
export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Sub-Bab B: Pengukuran Volume",
  sumber: "Panduan Guru hlm. 155–156",
  latar: "#F0F9FF",
  kutipan: [
    "B. Pengukuran Volume",
    "Mengukur volume dengan satuan tidak baku.",
    "Mengukur volume dengan satuan baku.",
    "Mengonversi antara satuan baku.",
    "Istilah kapasitas merupakan istilah lain dari volume.",
    "Satuan volume tidak baku adalah satuan volume yang belum dibakukan.",
    "satuan volume baku adalah satuan volume yang sudah dibakukan secara internasional.",
    "Guru memberikan pengantar bagaimana mengukur volume ember.",
    "bagaimana jika ukuran gayung yang digunakan berbeda?",
    "Guru tidak perlu memberikan jawaban yang benar",
  ],
  ketukan: [
    k(
      "Sub-Bab B, Pengukuran Volume. Panduan Guru menyebut tiga pengalaman belajar: mengukur volume dengan satuan tidak baku, mengukur dengan satuan baku, dan mengonversi antarsatuan baku.",
      ...daftar("pb", "Pengukuran Volume", [
        { at: "tidak", t: "1. volume dengan satuan tidak baku", w: W.hijauMuda, u: 8.8 },
        { at: "baku@2", t: "2. volume dengan satuan baku", w: W.langit, u: 9 },
        { at: "mengonversi", t: "3. mengonversi antarsatuan baku", w: W.krem, u: 8.8 },
      ]),
    ),
    k(
      "Berapa air yang dapat ditampung bak mandi atau kolam disebut kapasitas, istilah lain dari volume. Satuan tidak baku memberi hasil berbeda, satuan baku sama di mana saja.",
      bersih(0),
      tambah(0, judul("Volume dan kapasitas")),
      tambah("bak", emo("bm", 52, 78, "🛁", 36)),
      tambah("kapasitas", ...kartu("p1", 100, 40, 188, 30, W.krem, ["kapasitas = volume"], 9.6)),
      tambah("tidak", ...kartu("p2", 12, 98, 276, 30, W.merahMuda, ["tidak baku: hasil ukur berbeda"], 9.4)),
      tambah("baku@2", ...kartu("p3", 12, 138, 276, 30, W.hijauMuda, ["baku: sama di seluruh dunia"], 9.4)),
      tambah("baku@2", emo("bd", 262, 162, "🌍", 18)),
    ),
    k(
      "Pemanasan: ember diisi air memakai gayung. Jika ukuran gayungnya berbeda, apakah banyak tuangannya sama? Jawabannya ditemukan lewat aktivitas.",
      ...daftar("pm", "Pemanasan", [
        { at: "ember", t: "ember diisi air memakai gayung", w: W.langit, u: 9 },
        { at: "berbeda?", t: "gayung berbeda ukuran?", w: W.krem, u: 9.4 },
        { at: "sama?", t: "banyak tuangannya sama?", w: W.pink, u: 9.4 },
      ]),
      tambah("Jawabannya", teks("pmc", 150, 168, "jawaban ditemukan lewat aktivitas", 8.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 2. Aktivitas 3: konsep volume (Buku Siswa hlm. 122; Panduan Guru hlm. 156) ------------------------------ */
export const ADEGAN_AKTIVITAS_3: AdeganStory = {
  id: "aktivitas-3",
  judul: "Aktivitas 3: konsep volume",
  sumber: "Buku Siswa hlm. 122; Panduan Guru hlm. 156",
  latar: "#FFFBEB",
  kutipan: [
    "Aktivitas 3 : Konsep Volume",
    "Perlengkapan yang dibutuhkan:",
    "Siapkan ember yang berisi air.",
    "Tuangkan air ke kotak makan menggunakan gelas sampai penuh.",
    "Tuangkan air ke kotak makan menggunakan botol minum sampai penuh.",
    "Apakah sama banyaknya air yang dituangkan",
    "Berapa banyak air yang harus dituangkan untuk mengisi kotak makan",
    "Presentasikan hasil diskusi kelompok di depan kelas.",
    "Guru perlu mempertimbangkan ukuran kotak makan, gelas, dan botol minum yang digunakan (uji coba terlebih dahulu).",
  ],
  ketukan: [
    k(
      "Aktivitas tiga, Konsep Volume. Kelompok tiga sampai empat orang menyiapkan botol minum, gelas, kotak makan, ember, dan air. Air dituang ke kotak makan memakai gelas sampai penuh.",
      bersih(0),
      tambah(0, judul("Aktivitas 3: Konsep Volume")),
      tambah("botol", emo("a1", 40, 84, "🍼", 30), emo("a2", 100, 84, "🥛", 30), emo("a3", 160, 84, "📦", 30), emo("a4", 220, 84, "💧", 30)),
      tambah("botol", teks("a1t", 40, 100, "botol", 8, W.coklat), teks("a2t", 100, 100, "gelas", 8, W.coklat), teks("a3t", 160, 100, "kotak makan", 8, W.coklat), teks("a4t", 220, 100, "air", 8, W.coklat)),
      tambah("gelas", ...kartu("a5", 30, 130, 240, 34, W.langit, ["tuang air memakai gelas", "sampai kotak makan penuh"], 8.6)),
    ),
    k(
      "Lalu ulangi memakai botol minum. Hitung berapa kali menuang sampai penuh, dan diskusikan: apakah banyak tuangan dengan gelas dan botol minum sama?",
      bersih(0),
      tambah(0, judul("Gelas atau botol?")),
      tambah(0, ...kartu("b1", 20, 36, 120, 64, W.hijauMuda, ["🥛 gelas", "berapa kali?"], 9.4)),
      tambah("Hitung", ...kartu("b2", 160, 36, 120, 64, W.krem, ["🍼 botol minum", "berapa kali?"], 9.4)),
      tambah("sama?", ...kartu("b3", 40, 120, 220, 36, W.pink, ["banyak tuangan sama?"], 10)),
    ),
    k(
      "Panduan Guru: uji coba dulu ukuran gelas dan botol, lalu presentasikan hasilnya.",
      ...daftar("c", "Hasil kelompok", [
        { at: "uji", t: "Guru: uji coba ukuran lebih dulu", w: W.krem, u: 8.8 },
                { at: "presentasikan", t: "presentasikan di depan kelas", w: W.hijauMuda, u: 9 },
      ]),
    ),
  ],
};

/* ------------------------------ 3. Botol sabun A, B, C (Buku Siswa hlm. 123-125; Panduan Guru hlm. 157) ------------------------------ */
export const ADEGAN_SABUN: AdeganStory = {
  id: "sabun",
  judul: "Botol sabun A, B, dan C: satuan tidak baku",
  sumber: "Buku Siswa hlm. 123–125; Panduan Guru hlm. 157",
  latar: "#F0FDF4",
  kutipan: [
    "Ibu Helen memiliki 3 macam botol sabun cair.",
    "Botol sabun A diisi dengan sabun dari botol sabun B.",
    "Volume botol sabun A adalah sama dengan 4 buah botol sabun B.",
    "Botol sabun A diisi dengan sabun dari botol sabun C.",
    "Volume botol sabun A adalah sama dengan 10 buah botol sabun C.",
    "Botol sabun B dan C berbeda ukuran",
    "Jadi, botol sabun A, B, dan C merupakan satuan volume tidak baku.",
    "1 Satuan Volume",
    "beberapa benda dapat digunakan sebagai satuan tidak baku untuk mengukur volume.",
  ],
  ketukan: [
    k(
      "Ayo mengamati. Helen mencuci tangan dengan sabun cair. Ibu punya tiga macam botol sabun: A besar, B sedang, dan C kecil.",
      bersih(0),
      tambah(0, judul("Tiga botol sabun")),
      tambah("besar", emo("sa", 60, 120, "🧴", 62), teks("sal", 60, 153, "A", 12, W.biru)),
      tambah("sedang", emo("sb", 156, 110, "🧴", 38), teks("sbl", 156, 142, "B", 12, W.biru)),
      tambah("kecil", emo("sc", 238, 100, "🧴", 22), teks("scl", 238, 142, "C", 12, W.biru)),
    ),
    k(
      "Kegiatan B satu: botol A diisi dengan sabun dari botol B. Volume botol A sama dengan empat buah botol B.",
      bersih(0),
      tambah(0, judul("Kegiatan B.1")),
      tambah(0, emo("ka", 44, 110, "🧴", 54), teks("kal", 44, 134, "A", 11, W.biru)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => emo(`kb${i}`, 118 + i * 38, 100, "🧴", 30)), teks("kbl", 192, 124, "4 botol B", 10, W.biru)),
      tambah("sama", ...kartu("kk", 50, 150, 200, 30, W.krem, ["A = 4 botol B"], 10.4)),
    ),
    k(
      "Kegiatan B dua: botol A diisi dari botol C. Volume botol A sama dengan sepuluh buah botol C.",
      bersih(0),
      tambah(0, judul("Kegiatan B.2")),
      tambah(0, emo("la", 44, 110, "🧴", 54), teks("lal", 44, 134, "A", 11, W.biru)),
      tambah("sepuluh", ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => emo(`lc${i}`, 108 + (i % 5) * 34, 78 + Math.floor(i / 5) * 40, "🧴", 22)), teks("lcl", 190, 148, "10 botol C", 10, W.biru)),
      tambah("sama", ...kartu("lk", 50, 160, 200, 30, W.krem, ["A = 10 botol C"], 10.4)),
    ),
    k(
      "Hasilnya berbeda karena botol B dan C berbeda ukuran. Jadi botol A, B, dan C adalah satuan volume tidak baku: satu satuan bisa satu botol B atau satu botol C.",
      bersih(0),
      tambah(0, judul("Satuan tidak baku")),
      tambah("Hasilnya", ...kartu("md", 12, 34, 276, 30, W.merahMuda, ["B dan C berbeda ukuran"], 9.6)),
      tambah("satuan", ...kartu("me", 12, 74, 276, 30, W.hijauMuda, ["A, B, C = satuan volume tidak baku"], 9)),
      tambah("botol@3", ...kartu("mf", 12, 114, 132, 30, W.langit, ["1 satuan = 1 botol B"], 8.4)),
      tambah("botol@4", ...kartu("mg", 156, 114, 132, 30, W.pink, ["1 satuan = 1 botol C"], 8.4)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Berlatih: hand sanitizer (Buku Siswa hlm. 126-128; Panduan Guru hlm. 157) ------------------------------ */
const SATUAN = [
  { h: "a", n: 5, penuh: 5 },
  { h: "b", n: 7, penuh: 7 },
  { h: "c", n: 3, penuh: 3 },
  { h: "d", n: 1, penuh: 1 },
  { h: "e", n: 2, penuh: 2 },
];
const BARIS_LATIH = SATUAN.flatMap((s, i) => [
  teks(`lb${i}`, 20, 52 + i * 26, `${s.h}.`, 9.6, W.biru, { anchor: "start" }),
  emo(`lbe${i}`, 46, 54 + i * 26, "🧴", 17),
  teks(`lbn${i}`, 66, 52 + i * 26, `${s.n} satuan`, 9, W.coklat, { anchor: "start" }),
  teks(`lbd${i}`, 130, 52 + i * 26, "●".repeat(s.penuh), 9, W.biru, { anchor: "start" }),
]);
export const ADEGAN_BERLATIH_1: AdeganStory = {
  id: "berlatih-1",
  judul: "Ayo Berlatih: botol besar dan botol kecil",
  sumber: "Buku Siswa hlm. 126–128; Panduan Guru hlm. 157",
  latar: "#FFF7ED",
  kutipan: [
    "Ibu Helen mempunyai satu botol besar hand sanitizer.",
    "terdapat 8 botol kecil satuan yang terisi penuh hand sanitizer.",
    "volume 1 buah botol besar adalah sama dengan 8 botol kecil",
    "Hubungkan gambar dengan satuan volumenya dengan cermat.",
    "Pada soal nomor 1, tentukan volume paling sedikit dan volume paling banyak?",
    "Volume paling sedikit yaitu 1 satuan volume",
    "Volume paling banyak yaitu 7 satuan volume",
    "Urutkan botol yang berisi hand sanitizer pada soal nomor 1",
  ],
  ketukan: [
    k(
      "Ayo berlatih. Ibu Helen menuang satu botol besar hand sanitizer ke botol kecil sampai habis. Hasilnya delapan botol kecil terisi penuh, jadi volume botol besar adalah delapan satuan volume.",
      bersih(0),
      tambah(0, judul("Hand sanitizer")),
      tambah("botol@1", emo("hs0", 50, 118, "🧴", 60)),
      tambah("delapan", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => emo(`hk${i}`, 132 + (i % 4) * 38, 84 + Math.floor(i / 4) * 40, "🧴", 26))),
      tambah("terisi", teks("hst", 205, 176, "8 botol kecil penuh", 9.6, W.coklat)),
      ubah("jadi", { id: "hst", op: 0 }),
      tambah("jadi", ...kartu("hu", 30, 168, 240, 28, W.krem, ["1 botol besar = 8 satuan volume"], 9.4)),
    ),
    k(
      "Soal satu: hubungkan botol berlabel lima, tujuh, tiga, satu, dan dua satuan volume dengan kelompok botol kecil sebanyak itu.",
      bersih(0),
      tambah(0, judul("Soal 1: hubungkan")),
      tambah("lima,", ...BARIS_LATIH.filter((o) => o.id.endsWith("0"))),
      tambah("tujuh,", ...BARIS_LATIH.filter((o) => o.id.endsWith("1"))),
      tambah("tiga,", ...BARIS_LATIH.filter((o) => o.id.endsWith("2"))),
      tambah("satu@2", ...BARIS_LATIH.filter((o) => o.id.endsWith("3"))),
      tambah("dua", ...BARIS_LATIH.filter((o) => o.id.endsWith("4"))),
    ),
    k(
      "Soal dua dan tiga: paling sedikit satu satuan, yaitu d, paling banyak tujuh satuan, yaitu b. Urutannya d, e, c, a, lalu b.",
      ubah("sedikit", { id: "lbd3", warna: W.hijau, sorot: true }, { id: "lbn3", warna: W.hijau }),
      ubah("banyak", { id: "lbd1", warna: W.merah, sorot: true }, { id: "lbn1", warna: W.merah }),
      tambah("Urutannya", teks("lbu", 150, 192, "d, e, c, a, b: 1, 2, 3, 5, 7", 9.4, W.ungu)),
    ),
  ],
};

/* ------------------------------ 5. Satuan baku liter dan mililiter (Buku Siswa hlm. 128-131; Panduan Guru hlm. 158) ------------------------------ */
export const ADEGAN_SATUAN_BAKU: AdeganStory = {
  id: "satuan-baku",
  judul: "Satuan baku: liter dan mililiter",
  sumber: "Buku Siswa hlm. 128–131; Panduan Guru hlm. 158",
  latar: "#EFF6FF",
  kutipan: [
    "Pengukuran volume dengan menggunakan satuan baku",
    "Slamet dan Ibu membeli air mineral, jus buah, dan susu UHT.",
    "Pada gambar B.3 (1), volume dari botol air mineral adalah 1 liter",
    "Pada gambar B.3 (2), volume dari botol jus buah adalah 256 ml",
    "Pada gambar B.3 (3), volume dari kotak susu UHT adalah 1.000 ml",
    "Jadi, satuan volume yang baku adalah mililiter (ml) dan liter (l)",
    "Kita tahu bahwa 1 liter = 1.000 mililiter",
    "volume ember air menampung 10 liter",
    "volume tong air menampung 150 liter",
    "Kalian dapat menggunakan liter saat mengukur volume cairan dalam jumlah",
    "volume satu sendok air adalah 5 ml.",
    "volume secangkir kopi adalah 240 ml.",
    "volume botol minuman adalah 330 ml.",
    "Kita dapat menggunakan mililiter saat mengukur volume cairan dalam jumlah",
    "1.000 ml = 1 l",
    "Jadi, volumenya adalah 1 l.",
  ],
  ketukan: [
    k(
      "Satuan baku. Di minimarket, botol air mineral berisi satu liter, botol jus buah dua ratus lima puluh enam mililiter, dan kotak susu UHT seribu mililiter.",
      bersih(0),
      tambah(0, judul("Volume di label")),
      tambah("Botol", ...kartu("n1", 12, 40, 276, 30, W.langit, ["🚰 air mineral: 1 liter"], 9.6)),
      tambah("jus", ...kartu("n2", 12, 80, 276, 30, W.hijauMuda, ["🧃 jus buah: 256 ml"], 9.6)),
      tambah("susu", ...kartu("n3", 12, 120, 276, 30, W.krem, ["🥛 susu UHT: 1.000 ml"], 9.6)),
    ),
    k(
      "Jadi satuan volume baku adalah mililiter dan liter. Kita tahu satu liter sama dengan seribu mililiter.",
      bersih(0),
      tambah(0, judul("Satuan volume baku")),
      tambah("mililiter", ...kartu("o1", 12, 46, 132, 36, W.hijauMuda, ["mililiter (ml)"], 10)),
      tambah("liter@2", ...kartu("o2", 156, 46, 132, 36, W.langit, ["liter (l)"], 10)),
      tambah("satu@2", ...kartu("o3", 40, 108, 220, 40, W.krem, ["1 l = 1.000 ml"], 13)),
    ),
    k(
      "Ayo mencoba: botol air mineral satu liter, ember sepuluh liter, tong air seratus lima puluh liter. Liter untuk jumlah besar.",
      bersih(0),
      tambah(0, judul("Liter: jumlah besar")),
      tambah("botol", emo("p1", 52, 96, "🍼", 36), teks("p1t", 52, 122, "1 l", 10, W.biru)),
      tambah("ember", emo("p2", 150, 96, "💧", 36), teks("p2t", 150, 122, "ember 10 l", 10, W.biru)),
      tambah("tong", emo("p3", 248, 96, "🛢", 36), teks("p3t", 248, 122, "tong 150 l", 10, W.biru)),
      tambah("Liter@4", ...kartu("p4", 40, 146, 220, 30, W.krem, ["liter untuk jumlah besar"], 9.4)),
    ),
    k(
      "Sendok berisi lima mililiter, secangkir kopi dua ratus empat puluh mililiter, botol minuman tiga ratus tiga puluh mililiter. Mililiter untuk jumlah kecil.",
      bersih(0),
      tambah(0, judul("Mililiter: jumlah kecil")),
      tambah("Sendok", emo("q1", 52, 96, "🥄", 36), teks("q1t", 52, 122, "5 ml", 10, W.biru)),
      tambah("secangkir", emo("q2", 150, 96, "☕", 36), teks("q2t", 150, 122, "240 ml", 10, W.biru)),
      tambah("botol", emo("q3", 248, 96, "🥤", 36), teks("q3t", 248, 122, "330 ml", 10, W.biru)),
      tambah("Mililiter@4", ...kartu("q4", 40, 146, 220, 30, W.hijauMuda, ["ml untuk jumlah kecil"], 9.4)),
    ),
    k(
      "Kotak susu UHT bervolume seribu mililiter. Seribu mililiter sama dengan satu liter. Jadi volumenya adalah satu liter.",
      bersih(0),
      tambah(0, judul("Mengubah ml ke liter")),
      tambah("Kotak", emo("r1", 150, 80, "🥛", 40)),
      tambah("Seribu@2", ...kartu("r2", 40, 100, 220, 36, W.krem, ["1.000 ml = 1 l"], 12)),
      tambah("Jadi", teks("r3", 150, 164, "volumenya 1 l", 11, W.hijau)),
    ),
  ],
};
