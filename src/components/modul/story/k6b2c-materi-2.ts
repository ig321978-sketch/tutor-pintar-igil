import type { AdeganStory } from "./logika-story";
import { W, balon, batang, deret, emo, kartu, tabel, teks } from "./k6b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b2c-bantu";

/* ------------------------------ 3. Latihan bersama: tanaman obat dan masa panen ------------------------------ */
const T27 = tabel("t", 40, 36, [130, 90], 20, [
  ["Tanaman obat", "Masa panen"],
  ["Kumis kucing", "12 minggu"],
  ["Lengkuas", "1,5 tahun"],
  ["Jahe merah", "3 bulan"],
  ["Kencur", "6 bulan"],
  ["Buah merah", "3 tahun"],
  ["Kemangi", "30 hari"],
]);

export const ADEGAN_MASA_PANEN: AdeganStory = {
  id: "masa-panen",
  judul: "Latihan bersama: tanaman obat dan masa panen",
  sumber: "Materi: masa panen tanaman obat",
  latar: "#F7FEE7",
  kutipan: ["Hari ini Tigor membantu ayahnya menanam beberapa bibit tanaman obat", "Ada enam jenis bibit tanaman obat", "Kumis kucing 12 minggu", "Buah merah 3 tahun", "Kemangi 30 hari"],
  ketukan: [
    k(
      "Hari ini Tigor membantu ayahnya menanam beberapa bibit tanaman obat. Ada enam jenis bibit yang akan ditanam di kebun belakang rumah.",
      tambah(0, teks("jud", 150, 24, "Latihan bersama · Tanaman Obat", 12, W.ungu)),
      tambah("Tigor", emo("tigor", 46, 100, "🧒", 34), teks("tg", 46, 118, "Tigor", 8)),
      tambah("ayahnya", emo("ayah", 106, 100, "👨", 34), teks("ay", 106, 118, "Ayah", 8)),
      tambah("enam", teks("bib", 225, 104, "🌱🌱🌱🌱🌱🌱", 16), teks("jn", 225, 124, "enam jenis bibit", 8, W.hijau)),
    ),
    k(
      "Tigor ingin menanam buah merah di sebelah kemangi. Namun Ayah menjawab, bibit ditanam sesuai masa panennya, supaya yang lebih cepat panen bisa dipanen bersamaan.",
      bersih(0),
      tambah("Tigor", emo("e1", 40, 70, "🧒", 28), balon("b1", 110, 34, ["buah merah di", "sebelah kemangi?"], 96, W.putih)),
      tambah("Ayah", emo("e2", 260, 120, "👨", 28), balon("b2", 190, 96, ["tanam sesuai", "masa panennya"], 96, "#FEF9C3")),
      tambah("bersamaan.", emo("e3", 150, 176, "🌿", 26), teks("bs", 150, 198, "cepat panen, dipanen bersama", 8, W.hijau)),
    ),
    k(
      "Tabel masa panen. Kumis kucing dua belas minggu, lengkuas satu setengah tahun, dan jahe merah tiga bulan.",
      bersih(0),
      tambah(0, T27[0]),
      tambah("Kumis", T27[1]),
      tambah("lengkuas", T27[2]),
      tambah("jahe", T27[3]),
    ),
    k(
      "Kencur enam bulan, buah merah tiga tahun, dan kemangi tiga puluh hari.",
      tambah("Kencur", T27[4]),
      tambah("buah", T27[5]),
      tambah("kemangi", T27[6]),
    ),
    k(
      "Mana yang paling cepat dipanen? Kemangi, hanya tiga puluh hari. Paling lama? Buah merah, tiga tahun.",
      sorotkan("Kemangi", "t-6-0-k", "t-6-1-k"),
      tambah("Kemangi", teks("cp", 282, 160, "tercepat", 7, W.hijau)),
      sorotkan("Buah", "t-5-0-k", "t-5-1-k"),
      tambah("Buah", teks("lm", 282, 140, "terlama", 7, W.merah)),
    ),
    k(
      "Hati-hati, satuan waktunya berbeda-beda: minggu, tahun, bulan, dan hari. Untuk membandingkan, kita harus menyamakan satuannya lebih dulu.",
      bersih(0),
      tambah("minggu", ...["minggu", "tahun", "bulan", "hari"].map((s, i) => kartu(`u${i}`, 20 + (i % 2) * 130, 40 + Math.floor(i / 2) * 36, 110, s, [W.hiasMuda, W.obatMuda, W.langit, W.krem][i], 11))),
      tambah("menyamakan", teks("sm", 150, 140, "satuan harus sama dulu!", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Pembahasan rasio pada durasi waktu ------------------------------ */
const S = 8; // satu bulan = 8 titik pada batang
export const ADEGAN_SATUAN_WAKTU: AdeganStory = {
  id: "satuan-waktu",
  judul: "Rasio pada durasi waktu: satuan harus sama",
  sumber: "Materi: rasio pada durasi waktu",
  latar: "#EFF6FF",
  kutipan: ["satuan waktu yang digunakan pada besaran rasio tersebut harus sama", "1 jam = 60 menit", "1 tahun = 12 bulan", "Untuk menanam bibit tanaman obat, ayah membutuhkan waktu hanya 10 menit"],
  ketukan: [
    k(
      "Rasio waktu hanya bisa dibuat jika satuan waktunya sama. Hari dibandingkan dengan hari, bukan dengan tahun.",
      tambah(0, teks("jud", 150, 26, "Rasio pada Durasi Waktu", 13, W.ungu)),
      tambah("Hari", kartu("ok", 60, 50, 180, "hari : hari  ✓", W.obatMuda, 13)),
      tambah("bukan", kartu("no", 60, 96, 180, "hari : tahun  ✗", W.hiasMuda, 13)),
    ),
    k(
      "Bantuannya ada pada tabel hubungan satuan waktu: satu jam sama dengan enam puluh menit, satu minggu tujuh hari, satu bulan empat minggu, dan satu tahun dua belas bulan.",
      bersih(0),
      tambah("jam", kartu("s1", 50, 34, 200, "1 jam = 60 menit", W.krem, 11)),
      tambah("minggu", kartu("s2", 50, 66, 200, "1 minggu = 7 hari", W.langit, 11)),
      tambah("bulan", kartu("s3", 50, 98, 200, "1 bulan = 4 minggu", W.obatMuda, 11)),
      tambah("tahun", kartu("s4", 50, 130, 200, "1 tahun = 12 bulan", W.hiasMuda, 11)),
    ),
    k(
      "Jahe merah tiga bulan, lengkuas satu setengah tahun. Satu setengah tahun sama dengan delapan belas bulan, jadi rasionya tiga banding delapan belas, yaitu satu banding enam.",
      bersih(0),
      tambah("Jahe", teks("nj", 46, 62, "jahe merah", 8), batang("bj", 90, 50, 3 * S, 18, W.obatMuda), teks("vj", 130, 62, "3 bulan", 8, W.biru, { anchor: "start" })),
      tambah("lengkuas", teks("nl", 46, 100, "lengkuas", 8), teks("vl", 150, 80, "1,5 tahun = 18 bulan", 8, W.merah)),
      tambah("delapan", batang("bl", 90, 88, 18 * S, 18, W.hiasMuda)),
      tambah("banding", teks("rs", 150, 154, "3 : 18 = 1 : 6", 20, W.ungu)),
    ),
    k(
      "Kencur enam bulan sama dengan setengah tahun, dan lengkuas satu setengah tahun. Dalam tahun, rasio kencur banding lengkuas adalah satu banding tiga.",
      bersih(0),
      tambah("Kencur", teks("nk", 46, 62, "kencur", 8), batang("bk", 90, 50, 40, 18, W.obatMuda), teks("vk", 140, 62, "6 bulan = 1/2 tahun", 8, W.biru, { anchor: "start" })),
      tambah("lengkuas", teks("nl", 46, 100, "lengkuas", 8), batang("bl", 90, 88, 120, 18, W.hiasMuda), teks("vl", 150, 80, "1,5 tahun = 3/2 tahun", 8, W.merah)),
      tambah("banding", teks("rs", 150, 154, "1/2 : 3/2 = 1 : 3", 18, W.ungu)),
    ),
    k(
      "Jahe merah tiga bulan sama dengan dua belas minggu, karena satu bulan itu empat minggu. Hati-hati, itu hanya pendekatan. Kumis kucing juga dua belas minggu, jadi rasionya dua belas banding dua belas, yaitu satu banding satu.",
      bersih(0),
      tambah("Jahe", teks("nj", 46, 62, "jahe merah", 8), batang("bj", 90, 50, 120, 18, W.obatMuda), teks("vj", 150, 44, "3 bulan = 12 minggu", 8), teks("kb", 150, 34, "1 bulan = 4 minggu", 8, W.salem)),
      tambah("Kumis", teks("nm", 46, 100, "kumis kucing", 8), batang("bm", 90, 88, 120, 18, W.hiasMuda), teks("vm", 150, 80, "12 minggu", 8, W.merah)),
      tambah("banding", teks("rs", 150, 154, "12 : 12 = 1 : 1", 20, W.ungu)),
    ),
    k(
      "Dalam satu masa panen buah merah, yaitu tiga puluh enam bulan, kencur dipanen enam kali dan lengkuas dua kali. Sebab enam banding tiga puluh enam adalah satu banding enam, dan delapan belas banding tiga puluh enam adalah satu banding dua.",
      bersih(0),
      tambah("buah", batang("bb", 40, 28, 216, 18, W.krem), teks("vb", 150, 40, "buah merah 36 bulan", 8)),
      tambah("kencur", ...[0, 1, 2, 3, 4, 5].map((i) => batang(`kc${i}`, 40 + i * 36, 60, 36, 18, W.obatMuda)), teks("tk", 150, 96, "kencur 6 bulan: 6 kali", 8, W.hijau)),
      tambah("lengkuas", batang("lg0", 40, 106, 108, 18, W.hiasMuda), batang("lg1", 148, 106, 108, 18, W.hiasMuda), teks("tl", 150, 142, "lengkuas 18 bulan: 2 kali", 8, W.merah)),
      tambah("Sebab", teks("r1", 150, 164, "6 : 36 = 1 : 6", 11, W.ungu)),
      tambah("delapan", teks("r2", 150, 182, "18 : 36 = 1 : 2", 11, W.ungu)),
    ),
    k(
      "Ayah menanam bibit selama sepuluh menit, sedangkan Tigor dua pertiga jam. Dua pertiga dari enam puluh menit adalah empat puluh menit.",
      bersih(0),
      tambah("Ayah", emo("ea", 40, 54, "👨", 22), batang("ba", 70, 42, 40, 16, W.obatMuda), teks("va", 140, 54, "10 menit", 8, W.biru, { anchor: "start" })),
      tambah("Tigor", emo("et", 40, 94, "🧒", 22), batang("bt", 70, 82, 160, 16, W.hiasMuda), teks("vt", 240, 94, "2/3 jam", 8, W.biru, { anchor: "start" })),
      tambah("enam", teks("h60", 150, 140, "2/3 × 60 menit", 14)),
      tambah("empat", teks("h40", 150, 168, "= 40 menit", 16, W.merah)),
    ),
    k(
      "Rasio waktu Ayah banding Tigor adalah sepuluh banding empat puluh, yaitu satu banding empat. Jadi Ayah empat kali lebih cepat dibandingkan Tigor.",
      hapus("Rasio", "h60", "h40"),
      tambah("banding", teks("rs", 150, 140, "10 : 40 = 1 : 4", 20, W.ungu)),
      tambah("Jadi", kartu("cp", 70, 160, 160, "Ayah 4 kali lebih cepat", W.emas, 11)),
    ),
  ],
};

/* ------------------------------ 5. Latihan 1 dan Latihan 3 ------------------------------ */
const T231 = tabel("tp", 18, 58, [76, 62, 62, 66], 26, [
  ["", "Anak", "Dewasa", "Total"],
  ["Rasio", "9", "4", "9 + 4 = 13"],
  ["Sebenarnya", "?", "?", "390"],
]);
const T233 = tabel("tw", 60, 44, [50, 70, 70], 26, [
  ["No.", "Jam", "Minggu"],
  ["1", "?", "1"],
  ["2", "504", "3"],
  ["3", "840", "?"],
]);

export const ADEGAN_LATIHAN23A: AdeganStory = {
  id: "latihan23-pasar",
  judul: "Latihan 1: pasar malam, dan Latihan 3: jam dan minggu",
  sumber: "Materi: Latihan 1 dan Latihan 3",
  latar: "#FFFBEB",
  kutipan: ["Total pengunjung pasar malam berjumlah 390 orang", "Jika untuk 9 anak-anak terdapat 4 orang dewasa", "Lengkapi tabel rasio untuk mengonversi satuan waktu dari jam ke minggu atau minggu ke jam"],
  ketukan: [
    k(
      "Latihan satu. Total pengunjung pasar malam ada tiga ratus sembilan puluh orang, terdiri atas anak-anak dan orang dewasa.",
      tambah(0, teks("jud", 150, 26, "Latihan 1", 13, W.ungu)),
      tambah("pasar", emo("rm", 90, 96, "🎡", 34), emo("rm2", 210, 96, "🎪", 34)),
      tambah("tiga", kartu("k390", 70, 126, 160, "total 390 pengunjung", W.krem, 10)),
    ),
    k(
      "Untuk sembilan anak-anak ada empat orang dewasa, jadi rasio anak-anak banding dewasa adalah sembilan banding empat.",
      bersih(0),
      tambah("anak-anak", teks("la", 150, 40, "anak-anak", 9, W.merah), deret("a", 56, 48, 9, 18, W.hiasMuda)),
      tambah("dewasa", teks("ld", 150, 92, "dewasa", 9, W.hijau), deret("d", 56, 100, 4, 18, W.obatMuda)),
      tambah("banding", teks("r94", 150, 160, "anak : dewasa = 9 : 4", 17, W.ungu)),
    ),
    k(
      "Isi tabel rasio. Jumlah rasio adalah sembilan ditambah empat, yaitu tiga belas. Total sebenarnya tiga ratus sembilan puluh.",
      bersih(0),
      tambah(0, T231[0]),
      tambah("Jumlah", T231[1]),
      tambah("Total", T231[2]),
    ),
    k(
      "Karena tiga belas kali tiga puluh sama dengan tiga ratus sembilan puluh, semua angka rasio dikali tiga puluh.",
      tambah("kali", teks("k30", 150, 160, "semua angka rasio dikali 30", 13, W.merah)),
      sorotkan("kali", "tp-2-3-k"),
    ),
    k(
      "Anak-anak sembilan kali tiga puluh sama dengan dua ratus tujuh puluh, dewasa empat kali tiga puluh sama dengan seratus dua puluh. Jumlahnya tiga ratus sembilan puluh.",
      ubah("dua", { id: "tp-2-1-t", isi: "270", warna: W.merah }),
      ubah("seratus", { id: "tp-2-2-t", isi: "120", warna: W.hijau }),
      tambah("Jumlahnya", teks("jm", 150, 190, "270 + 120 = 390", 13, W.hijau)),
    ),
    k(
      "Periksa: dua ratus tujuh puluh ditambah seratus dua puluh sama dengan tiga ratus sembilan puluh, dan dua ratus tujuh puluh banding seratus dua puluh jika dibagi tiga puluh kembali menjadi sembilan banding empat.",
      bersih(0),
      tambah("dua", kartu("c1", 60, 50, 180, "270 + 120 = 390", W.obatMuda, 13)),
      tambah("banding", kartu("c2", 60, 96, 180, "270 : 120 = 9 : 4", W.langit, 13)),
      tambah("dibagi", teks("c3", 150, 150, "dibagi 30", 14, W.merah)),
    ),
    k(
      "Latihan tiga mengubah jam dan minggu. Satu minggu ada tujuh hari, satu hari dua puluh empat jam, jadi satu minggu sama dengan seratus enam puluh delapan jam.",
      bersih(0),
      tambah(0, teks("jd2", 150, 26, "Latihan 3: jam dan minggu", 13, W.ungu)),
      tambah("Satu", ...T233),
      tambah("tujuh", kartu("j7", 70, 170, 160, "7 × 24 = 168 jam", W.krem, 11)),
      ubah("seratus", { id: "tw-1-1-t", isi: "168", warna: W.merah }),
    ),
    k(
      "Pada baris kedua, lima ratus empat jam sama dengan tiga minggu. Pada baris ketiga, delapan ratus empat puluh dibagi seratus enam puluh delapan sama dengan lima, jadi lima minggu.",
      sorotkan("lima", "tw-2-1-k", "tw-2-2-k"),
      hapus("delapan", "j7-k", "j7-t"),
      ubah("delapan", { id: "tw-3-2-t", isi: "5", warna: W.hijau }),
      tambah("delapan", teks("m5", 150, 190, "840 : 168 = 5", 12, W.hijau)),
    ),
  ],
};
