import type { AdeganStory } from "./logika-story";
import { W, bentuk, bulat, emo, garis, judul, kartu, kurvaTerbuka, panah, setengahLingkaran, tabel, teks } from "./k4b5a-gambar";
import { bersih, idx, k, redamkan, sorotkan, tambah, ubah } from "./k4b5a-bantu";

/* ------------------------------ 1. Pembuka bab dan tujuan (Buku Siswa hlm. 139–140; Panduan Guru hlm. 175) ------------------------------ */
const TUJUAN = ["menuliskan ciri-ciri segitiga", "menuliskan ciri-ciri segiempat", "menyusun beberapa bangun datar", "mengurai satu bangun datar"];
const WARNA_TUJUAN = [W.hijauMuda, W.hijauMuda, W.langit, W.langit];
const chipTujuan = (i: number) => kartu(`tj${i}`, 10, 34 + i * 40, 280, 32, WARNA_TUJUAN[i], [`${i + 1}. ${TUJUAN[i]}`], 8.6);

const SUARA_P1 = "Selamat datang di bab lima, Bangun Datar. Buku membuka bab dengan pertanyaan: apakah ciri-ciri yang dimiliki setiap bangun datar segitiga dan segiempat? Bagaimana keterkaitan antar bangun datar?";
const SUARA_P2 = "Tujuan pembelajaran di Buku Siswa ada empat: menuliskan ciri-ciri segitiga, menuliskan ciri-ciri segiempat, menyusun beberapa bangun datar, dan mengurai satu bangun datar dengan berbagai cara.";
const SUARA_P3 = "Subbab A, Ciri-Ciri Bangun Datar, mengerjakan dua tujuan pertama saja. Dua tujuan lainnya, menyusun dan mengurai, menunggu giliran di subbab berikutnya.";
const SUARA_P4 = "Buku panduan guru menomori tujuan pertama: satu titik satu, mendeskripsikan ciri berbagai bentuk bangun datar. Kata kunci bab ini: segibanyak, segitiga, dan segiempat.";

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 5: tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 139–140; Panduan Guru hlm. 175",
  latar: "#FFF7ED",
  kutipan: [
    "Apakah ciri-ciri yang dimiliki setiap bangun datar segitiga dan",
    "Bagaimanakah keterkaitan antar bangun datar baik antar",
    "segitiga maupun antar segiempat?",
    "Bagaimanakah menyusun pengertian",
    "Setelah mempelajari bab ini kalian mampu:",
    "menuliskan ciri-ciri segitiga (sama kaki,",
    "menuliskan ciri-ciri segiempat",
    "Kata Kunci",
    "Segibanyak,",
    "Setelah mempelajari bab ini, peserta didik diharapkan dapat:",
    "1.1 mendeskripsikan ciri berbagai bentuk bangun datar (segiempat, segitiga, segibanyak)",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bab 5: Bangun Datar")),
      tambah("segitiga", bentuk("pa", 30, 42, "sama-sisi", W.hijauMuda)),
      tambah("segiempat?", bentuk("pb", 118, 44, "persegi", W.langit), bentuk("pc", 190, 38, "layang", W.krem, 0.9)),
      tambah("ciri-ciri", ...kartu("pq1", 20, 116, 260, 30, W.emas, ["ciri-ciri apa yang dimiliki bangun datar?"], 8.6)),
      tambah("keterkaitan", ...kartu("pq2", 20, 156, 260, 30, W.pink, ["bagaimana keterkaitan antar bangun datar?"], 8.6)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tujuan pembelajaran")),
      tambah("menuliskan", chipTujuan(0)),
      tambah("menuliskan@2", chipTujuan(1)),
      tambah("menyusun", chipTujuan(2)),
      tambah("mengurai", chipTujuan(3)),
    ),
    k(
      SUARA_P3,
      sorotkan("mengerjakan", "tj0-k", "tj1-k"),
      ubah("lainnya,", { id: "tj2-k", op: 0.35 }, { id: "tj2-t0", op: 0.35 }, { id: "tj3-k", op: 0.35 }, { id: "tj3-t0", op: 0.35 }),
      tambah("berikutnya.", teks("tj-t", 150, 196, "Subbab A: tujuan 1 dan 2", 8.6, W.merah)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Tujuan menurut Panduan Guru")),
      tambah("satu", ...kartu("pg", 14, 36, 272, 32, W.hijauMuda, ["1.1 mendeskripsikan ciri bangun datar"], 8.6)),
      tambah("kunci", teks("kk", 150, 94, "Kata kunci", 10, W.coklat)),
      tambah("segibanyak,", ...kartu("kw1", 14, 106, 86, 30, W.krem, ["segibanyak"], 8.6)),
      tambah("segitiga,", ...kartu("kw2", 107, 106, 86, 30, W.langit, ["segitiga"], 8.6)),
      tambah("segiempat.", ...kartu("kw3", 200, 106, 86, 30, W.pink, ["segiempat"], 8.6)),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, gambaran umum, keterampilan, skema (Buku Siswa hlm. 141; Panduan Guru hlm. 176–178) ------------------------------ */
const SUARA_K1 = "Peta konsep bab ini dimulai dari segibanyak. Segibanyak bercabang menjadi segitiga dan segiempat. Segitiga dikelompokkan berdasarkan sisinya dan berdasarkan sudutnya.";
const SUARA_K2 = "Berdasarkan sisinya ada segitiga sama kaki, segitiga sama sisi, dan segitiga sembarang. Berdasarkan sudutnya ada segitiga lancip, segitiga siku-siku, dan segitiga tumpul.";
const SUARA_K3 = "Cabang segiempat memuat layang-layang, jajargenjang, trapesium, dan segiempat sembarang. Dari jajargenjang bercabang persegi panjang, belah ketupat, dan persegi.";
const SUARA_K5 = "Keterampilan yang dilatih ada lima: menggambar, membaca dengan cermat, berkomunikasi, mengamati, dan berlatih. Skema pembelajaran memberi topik A dua puluh lima jam pelajaran.";
const SISI3 = ["sama kaki", "sama sisi", "sembarang"];
const SUDUT3 = ["lancip", "siku-siku", "tumpul"];
const SEGI4 = ["layang-layang", "jajargenjang", "trapesium", "segiempat sembarang"];
const JAJAR3 = ["persegi panjang", "belah ketupat", "persegi"];
const KETERAMPILAN = ["menggambar", "membaca dengan cermat", "berkomunikasi", "mengamati", "berlatih"];

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, gambaran umum, dan skema pembelajaran",
  sumber: "Buku Siswa hlm. 141; Panduan Guru hlm. 176–178",
  latar: "#F0FDF4",
  kutipan: [
    "Peta Konsep",
    "Segibanyak",
    "Berdasarkan",
    "Segitiga",
    "Sama Kaki",
    "Layang-layang",
    "Trapesium",
    "Segiempat",
    "Sembarang",
    "2. Peta Konsep",
    "4. Keterampilan yang Dilatih",
    "2. Membaca dengan cermat",
    "5. Skema Pembelajaran",
    "Topik A:",
    "25JP",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Peta konsep")),
      tambah("segibanyak.", ...kartu("pa", 100, 30, 100, 24, W.emas, ["Segibanyak"], 9.4)),
      tambah("bercabang", panah("pb1", 130, 56, -66, 14, W.biru, 1.6), panah("pb2", 170, 56, 66, 14, W.biru, 1.6)),
      tambah("segitiga", ...kartu("pt", 24, 74, 96, 24, W.hijauMuda, ["Segitiga"], 9.4)),
      tambah("segiempat.", ...kartu("pe", 180, 74, 96, 24, W.pink, ["Segiempat"], 9.4)),
      tambah("sisinya", ...kartu("ps", 4, 124, 124, 26, W.langit, ["berdasarkan sisinya"], 8.6), panah("pc1", 60, 100, 0, 22, W.biru, 1.4)),
      tambah("sudutnya.", ...kartu("pd", 4, 160, 124, 26, W.krem, ["berdasarkan sudutnya"], 8.6), panah("pc2", 40, 100, -34, 56, W.biru, 1.4)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Jenis segitiga")),
      tambah("sisinya", ...kartu("s0", 8, 30, 138, 24, W.langit, ["berdasarkan sisinya"], 8.6)),
      ...SISI3.map((n, i) => tambah([idx(SUARA_K2, "kaki"), idx(SUARA_K2, "sisi"), idx(SUARA_K2, "sembarang")][i], ...kartu(`si${i}`, 8, 60 + i * 34, 138, 28, W.hijauMuda, [`segitiga ${n}`], 8.6))),
      tambah("sudutnya", ...kartu("u0", 154, 30, 138, 24, W.krem, ["berdasarkan sudutnya"], 8.6)),
      ...SUDUT3.map((n, i) => tambah(["lancip,", "siku-siku,", "tumpul."][i], ...kartu(`su${i}`, 154, 60 + i * 34, 138, 28, W.pink, [`segitiga ${n}`], 8.6))),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Jenis segiempat")),
      tambah("segiempat", ...kartu("g0", 90, 28, 120, 24, W.emas, ["Segiempat"], 9.4)),
      ...SEGI4.map((n, i) => tambah(["layang-layang,", "jajargenjang,", "trapesium,", "sembarang."][i], ...kartu(`g${i + 1}`, 6 + (i % 2) * 148, 58 + Math.floor(i / 2) * 30, 140, 24, W.langit, [n], 8.6))),
      tambah("bercabang", ...kartu("j0", 90, 128, 120, 22, W.hijauMuda, ["jajargenjang"], 8.6), panah("jp", 150, 152, 0, 8, W.biru, 1.4)),
      ...JAJAR3.map((n, i) => tambah([idx(SUARA_K3, "panjang"), idx(SUARA_K3, "ketupat"), idx(SUARA_K3, "persegi", 2)][i], ...kartu(`jj${i}`, 6 + i * 98, 162, 92, 24, W.pink, [n], 8.2))),
    ),
    k(
      SUARA_K5,
      bersih(0),
      tambah(0, judul("Keterampilan dan skema")),
      ...KETERAMPILAN.map((n, i) => tambah(["menggambar,", "membaca", "berkomunikasi,", "mengamati,", "berlatih."][i], ...kartu(`kt${i}`, 14, 30 + i * 26, 160, 22, [W.hijauMuda, W.langit, W.krem, W.pink, W.jingga][i], [`${i + 1}. ${n}`], 8.2))),
      tambah("topik", ...kartu("jp", 186, 74, 100, 44, W.emas, ["Topik A", "25 JP"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Segi banyak (Buku Siswa hlm. 142–143) ------------------------------ */
const SUARA_S1 = "Banyak benda di sekitar kita berbentuk bangun datar. Di antaranya ada yang termasuk segi banyak, dan ada juga yang bukan segi banyak.";
const SUARA_S2 = "Contoh segi banyak: yang pertama punya tiga sisi berbentuk garis lurus, yang kedua punya empat sisi berbentuk garis lurus, dan antarsisinya membentuk kurva tertutup.";
const SUARA_S3 = "Contoh yang bukan segi banyak: ada yang punya satu sisi tidak lurus tetapi kurvanya tertutup, dan ada yang kurvanya terbuka.";
const SUARA_S4 = "Kesimpulan buku: segi banyak adalah suatu kurva tertutup yang dibatasi paling sedikit tiga buah ruas garis.";

export const ADEGAN_SEGIBANYAK: AdeganStory = {
  id: "segi-banyak",
  judul: "Segi banyak: kurva tertutup dari ruas garis",
  sumber: "Buku Siswa hlm. 142–143",
  latar: "#FEFCE8",
  kutipan: [
    "A. Ciri-Ciri Bangun Datar",
    "1. Segi Banyak",
    "A. Pengertian Segi Banyak",
    "Banyak benda di sekitar kita yang berbentuk bangun datar.",
    "Gambar 5.1 Segi banyak",
    "Gambar 5.2 Bukan segi banyak",
    "Mempunyai 3 sisi berbentuk garis lurus",
    "Antar sisi membentuk kurva tertutup",
    "Mempunyai 4 sisi berbentuk garis lurus",
    "Mempunyai 1 sisi tidak berbentuk garis lurus dan",
    "Antarsisi membentuk kurva terbuka",
    "suatu kurva tertutup yang dibatasi paling sedikit tiga buah ruas garis.",
  ],
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Segi banyak atau bukan?")),
      tambah("termasuk", ...kartu("sa", 8, 34, 136, 28, W.hijauMuda, ["segi banyak"], 9.4)),
      tambah("bukan", ...kartu("sb", 156, 34, 136, 28, W.merahMuda, ["bukan segi banyak"], 9.4)),
      tambah(idx(SUARA_S1, "banyak", 2), bentuk("sc", 30, 86, "sama-sisi", W.hijauMuda), bentuk("sd", 88, 90, "persegi", W.hijauMuda, 0.9)),
      tambah(idx(SUARA_S1, "banyak", 3), bulat("se", 196, 112, 26, W.merahMuda, W.biru), kurvaTerbuka("sf", 238, 88, 40, 40)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Contoh segi banyak")),
      tambah("pertama", bentuk("t3", 34, 46, "sama-sisi", W.hijauMuda, 1.3)),
      tambah("tiga", teks("l3", 66, 126, "3 sisi lurus", 9, W.biru)),
      tambah("kedua", bentuk("t4", 176, 46, "persegi", W.langit, 1.3)),
      tambah("empat", teks("l4", 202, 126, "4 sisi lurus", 9, W.biru)),
      tambah("kurva", ...kartu("lk", 40, 146, 220, 28, W.emas, ["antarsisi: kurva tertutup"], 8.6)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Contoh bukan segi banyak")),
      tambah("satu", setengahLingkaran("hl", 40, 60, 40, W.merahMuda)),
      tambah("tertutup,", teks("h1", 80, 128, "1 sisi tidak lurus", 8.6, W.biru), teks("h2", 80, 142, "kurva tertutup", 8.6, W.merah)),
      tambah("terbuka,", kurvaTerbuka("kt", 190, 56, 58, 52)),
      tambah("terbuka,", teks("k1", 220, 128, "kurva terbuka", 8.6, W.merah), teks("k2", 220, 142, "tidak tertutup", 8.6, W.biru)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Pengertian segi banyak")),
      tambah("segi", ...kartu("df", 20, 40, 260, 60, W.emas, ["segi banyak", "kurva tertutup"], 11)),
      tambah("dibatasi", ...kartu("dg", 20, 112, 260, 34, W.hijauMuda, ["dibatasi paling sedikit 3 ruas garis"], 8.6)),
      tambah("tiga", bentuk("dh", 114, 154, "sama-sisi", W.pink, 0.7)),
    ),
  ],
};

/* ------------------------------ 4. Aktivitas 1: jenis segi banyak (Buku Siswa hlm. 143–144; Panduan Guru hlm. 180–181) ------------------------------ */
export const SEGI_BANYAK = [
  { nama: "Segitiga", sudut: 3, sisi: 3 },
  { nama: "Segiempat", sudut: 4, sisi: 4 },
  { nama: "Segilima", sudut: 5, sisi: 5 },
  { nama: "Segienam", sudut: 6, sisi: 6 },
];
const SUARA_A1 = "Aktivitas satu, jenis segi banyak. Alat dan bahannya: sedotan atau lidi, gunting, lem, dan kertas.";
const SUARA_A2 = "Langkah kerja: potong sedotan menjadi tiga bagian, hubungkan ujung-ujungnya sambung-menyambung, lalu tempel di kertas. Bangun apa yang terbentuk? Gambarkan di buku.";
const SUARA_A3 = "Lakukan hal serupa dengan memotong sedotan menjadi empat, lima, dan enam bagian. Hasilnya segitiga, segiempat, segilima, dan segienam.";
const SUARA_A4 = "Tabel hasilnya menurut kunci panduan guru: segitiga punya tiga sudut dan tiga sisi, segiempat empat dan empat, segilima lima dan lima, segienam enam dan enam.";
const SUARA_A5 = "Pemberian nama pada segi banyak disesuaikan dengan banyaknya sisi. Pada tabel itu, banyak sudut selalu sama dengan banyak sisi.";

export const ADEGAN_AKTIVITAS1: AdeganStory = {
  id: "aktivitas-satu",
  judul: "Aktivitas 1: jenis segi banyak",
  sumber: "Buku Siswa hlm. 143–144; Panduan Guru hlm. 180–181",
  latar: "#FFF7ED",
  kutipan: [
    "Aktivitas 1. Jenis segi banyak",
    "Alat dan bahan:",
    "Sedotan/lidi",
    "Lem dan kertas",
    "Langkah Kerja:",
    "1. Potong sedotan/lidi menjadi 3 bagian",
    "2. Hubungkan ujung masing-masing secara sambung-menyambung dan",
    "ditempel di kertas",
    "3. Amatilah bangun apa yang terbentuk? Gambarkan di buku.",
    "Pemberian nama pada segi banyak ini disesuaikan dengan banyaknya sisi yang",
    "Aktivitas ini bertujuan untuk mengeksplorasi pikiran atau ide peserta didik.",
    "Segitiga adalah bangun datar memiliki 3 sisi.",
    "Segienam adalah bangun datar memiliki 6 sudut.",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Aktivitas 1: jenis segi banyak")),
      tambah("sedotan", emo("a1", 48, 90, "🥤", 36), teks("a1t", 48, 112, "sedotan", 8.6, W.biru)),
      tambah("gunting,", emo("a2", 108, 90, "✂", 34), teks("a2t", 108, 112, "gunting", 8.6, W.biru)),
      tambah("lem,", emo("a3", 172, 90, "🧴", 34), teks("a3t", 172, 112, "lem", 8.6, W.biru)),
      tambah("kertas.", emo("a4", 236, 90, "📄", 34), teks("a4t", 236, 112, "kertas", 8.6, W.biru)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Langkah kerja")),
      tambah("tiga", garis("ts1", 30, 70, 60, 0, W.merah, 4), garis("ts2", 30, 90, 60, 0, W.hijau, 4), garis("ts3", 30, 110, 60, 0, W.biru, 4), teks("tl", 60, 134, "3 potong sedotan", 8.6, W.biru)),
      tambah("hubungkan", panah("tp", 112, 90, 40, 0, W.coklat, 2)),
      tambah("sambung-menyambung,", bentuk("tg", 176, 54, "sama-sisi", "none", 1.2, { tebal: 4 })),
      tambah("tempel", ...kartu("tk", 160, 124, 100, 28, W.langit, ["tempel di kertas"], 8.2)),
      tambah("Gambarkan", teks("tq", 150, 186, "bangun apa yang terbentuk?", 9, W.merah)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Empat, lima, enam bagian")),
      tambah("empat,", bentuk("b4", 14, 52, "persegi", W.langit, 0.9), teks("b4t", 32, 112, "4 bagian", 8.2, W.biru)),
      tambah("lima,", bentuk("b5", 84, 46, "segilima", W.krem, 0.9), teks("b5t", 106, 112, "5 bagian", 8.2, W.biru)),
      tambah("enam", bentuk("b6", 152, 46, "segienam", W.pink, 0.9), teks("b6t", 174, 112, "6 bagian", 8.2, W.biru)),
      tambah("segitiga,", bentuk("b3", 224, 52, "sama-sisi", W.hijauMuda, 0.9), teks("b3t", 244, 112, "3 bagian", 8.2, W.biru)),
      tambah("segiempat,", teks("n4", 32, 136, "segiempat", 8.2, W.biru)),
      tambah("segilima,", teks("n5", 106, 136, "segilima", 8.2, W.biru)),
      tambah("segienam.", teks("n6", 174, 136, "segienam", 8.2, W.biru), teks("n3", 244, 136, "segitiga", 8.2, W.biru)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Tabel hasil Aktivitas 1")),
      tambah("tabel", ...tabel("tb", 40, 34, [100, 60, 60], [["Nama bangun", "Sudut", "Sisi"]], 20, 8.2)),
      ...SEGI_BANYAK.map((s, i) => tambah(["segitiga", "segiempat", "segilima", "segienam"][i], ...tabel(`tb${i}`, 40, 54 + i * 24, [100, 60, 60], [[s.nama, String(s.sudut), String(s.sisi)]], 24, 9.4))),
    ),
    k(
      SUARA_A5,
      sorotkan("nama", "tb0-s00", "tb1-s00", "tb2-s00", "tb3-s00"),
      redamkan("sudut", "tb0-s00", "tb1-s00", "tb2-s00", "tb3-s00"),
      sorotkan("sudut", ...[0, 1, 2, 3].flatMap((i) => [`tb${i}-t01`, `tb${i}-t02`])),
      tambah("selalu", ...kartu("ks", 30, 160, 240, 28, W.emas, ["banyak sudut sama dengan banyak sisi"], 8.6)),
    ),
  ],
};
