import type { AdeganStory, Obj } from "./logika-story";
import { TITIK_DENAH, W, bingkai, emo, garis, jalur, judul, kartu, kotak, panah, poligon, teks } from "./k5b4a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b4a-bantu";

/* ------------------------------ 1. Pembuka bab: tujuan (Buku Siswa hlm. 105; Panduan Guru hlm. 113) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 4: tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 105; Panduan Guru hlm. 113",
  latar: "#FFF7ED",
  kutipan: [
    "Setelah mempelajari bab ini, diharapkan kalian mampu mengetahui",
    "kapan kalian harus menggunakan keliling bangun datar.",
    "kalian diharapkan mampu menemukan cara menghitung keliling",
    "berbagai bangun datar.",
    "mengenali situasi soal yang melibatkan keliling bangun datar;",
    "menemukan keliling berbagai bangun datar sebagai jumlahan panjang",
    "mendekomposisi bangun datar gabungan, lalu menemukan cara",
  ],
  ketukan: [
    k(
      "Selamat datang di bab empat, Keliling Bangun Datar. Setelah mempelajari bab ini, kalian diharapkan mampu mengetahui kapan harus menggunakan keliling bangun datar.",
      tambah(0, judul("Bab 4: Keliling Bangun Datar")),
      tambah("empat,", emo("lg", 150, 92, "📏", 46)),
      tambah("mampu", ...kartu("tj1", 24, 118, 252, 36, W.krem, ["tahu kapan harus memakai", "keliling bangun datar"], 9)),
    ),
    k(
      "Selanjutnya, kalian diharapkan mampu menemukan cara menghitung keliling berbagai bangun datar. Jadi ada dua hal: tahu kapan memakainya, dan tahu cara menghitungnya.",
      tambah("menemukan", ...kartu("tj2", 24, 160, 252, 36, W.hijauMuda, ["menemukan cara menghitung keliling", "berbagai bangun datar"], 9)),
      sorotkan("kapan", "tj1-k"),
      ubah("menghitungnya.", { id: "tj1-k", sorot: false }, { id: "tj2-k", sorot: true }),
    ),
    k(
      "Buku panduan guru menuliskan tujuan lebih rinci. Pertama, mengenali situasi soal yang melibatkan keliling bangun datar. Kedua, menemukan keliling berbagai bangun datar sebagai jumlahan panjang sisi-sisinya.",
      bersih(0),
      tambah(0, judul("Tujuan menurut Panduan Guru")),
      tambah("Pertama,", ...kartu("p1", 14, 40, 272, 40, W.hijauMuda, ["4.1 Mengenali situasi soal yang", "melibatkan keliling bangun datar"], 8.8)),
      tambah("Kedua,", ...kartu("p2", 14, 96, 272, 40, W.langit, ["4.2 Menemukan keliling berbagai bangun datar", "sebagai jumlahan panjang sisi-sisinya"], 8.8)),
    ),
    k(
      "Tujuan kedua dirinci lagi. Menemukan cara menghitung keliling segitiga, segi empat, segi lima, segi enam, dan segi delapan beraturan. Lalu mendekomposisi bangun gabungan dan menentukan kelilingnya.",
      bersih(0),
      tambah(0, judul("Tujuan kedua dirinci")),
      tambah("Menemukan", ...kartu("r1", 14, 36, 272, 52, W.langit, ["4.2.1 Keliling segitiga dan segi empat,", "serta segi lima, segi enam, dan", "segi delapan beraturan"], 8.8)),
      tambah("mendekomposisi", ...kartu("r2", 14, 104, 272, 40, W.krem, ["4.2.2 Mendekomposisi bangun gabungan,", "lalu menentukan kelilingnya"], 8.8)),
    ),
    k(
      "Hari ini kita baru di tujuan pertama: mengenali situasi keliling lewat cerita lari di lapangan sepak bola, lalu menemukan konsep keliling.",
      bersih(0),
      tambah(0, judul("Hari ini: tujuan pertama")),
      tambah("pertama:", ...kartu("hi", 40, 34, 220, 34, W.hijauMuda, ["4.1 Mengenali situasi soal keliling"], 9)),
      tambah("lari", emo("lr", 90, 120, "🏃", 40)),
      tambah("lapangan", emo("sb", 210, 120, "⚽", 40)),
      tambah("konsep", ...kartu("kn", 70, 150, 160, 34, W.krem, ["menemukan konsep keliling"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, kata kunci, dan skema (Buku Siswa hlm. 106; Panduan Guru hlm. 114 sampai 117) ------------------------------ */
const KATA_KUNCI = ["bangun datar", "bangun gabungan", "belah ketupat", "jajargenjang", "layang-layang", "persegi", "persegi panjang", "trapesium", "keliling"];
const WARNA = [W.krem, W.langit, W.hijauMuda, W.pink, W.jingga, W.merahMuda];
const chip = (i: number): Obj[] => kartu(`ch${i}`, 12 + (i % 3) * 96, 36 + Math.floor(i / 3) * 40, 90, 30, WARNA[i % 6], [KATA_KUNCI[i]], 8.2);
const cabang = (id: string, x: number, y: number, w: number, h: number, warna: string, b: string[], u = 8.2): Obj[] => kartu(id, x, y, w, h, warna, b, u);

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, kata kunci, dan lima subbab",
  sumber: "Buku Siswa hlm. 106; Panduan Guru hlm. 114–117",
  latar: "#F5F3FF",
  kutipan: [
    "Peta Konsep",
    "Kata Kunci",
    "Bangun datar, bangun gabungan, belah ketupat, jajargenjang,",
    "layang-layang, persegi, persegi panjang, trapesium, keliling.",
    "Bab ini terdiri atas lima subbab. Subbab A mendiskusikan tentang",
    "keliling bangun datar. Pada subbab ini, peserta didik tidak langsung diberi tahu",
    "menggunakan konteks benteng yang mengelilingi Keraton Yogyakarta.",
  ],
  ketukan: [
    k(
      "Ini peta konsep bab empat. Di tengah ada keliling bangun datar. Cabangnya segitiga, segi empat, segi banyak, dan bangun gabungan.",
      tambah(0, judul("Peta Konsep")),
      tambah("tengah", ...kartu("pu", 80, 84, 140, 34, W.emas, ["Keliling", "Bangun Datar"], 9.4)),
      tambah("segitiga,", garis("ga", 110, 84, -46, -22, W.biru, 1.6, { gambar: true }), ...cabang("ca", 8, 36, 108, 24, W.hijauMuda, ["Segitiga"], 9)),
      tambah("empat@2", garis("gb", 190, 84, 46, -22, W.biru, 1.6, { gambar: true }), ...cabang("cb", 184, 36, 108, 24, W.langit, ["Segi Empat"], 9)),
      tambah("banyak,", garis("gc", 110, 118, -46, 34, W.biru, 1.6, { gambar: true }), ...cabang("cc", 8, 152, 108, 24, W.krem, ["Segi Banyak"], 9)),
      tambah("gabungan.", garis("gd", 190, 118, 46, 34, W.biru, 1.6, { gambar: true }), ...cabang("cd", 184, 152, 108, 24, W.pink, ["Bangun Gabungan"], 9)),
    ),
    k(
      "Segitiga terdiri atas segitiga sembarang, sama sisi, dan sama kaki. Segi empat memuat persegi panjang, persegi, jajargenjang, layang-layang, belah ketupat, trapesium, dan segi empat sembarang. Segi banyak memuat segi lima, segi enam, dan segi delapan beraturan.",
      bersih(0),
      tambah(0, judul("Isi tiap cabang")),
      tambah("Segitiga", ...cabang("h1", 6, 32, 90, 18, W.hijauMuda, ["Segitiga"], 8.6), ...["Sembarang", "Sama Sisi", "Sama Kaki"].map((t, i) => teks(`l1-${i}`, 51, 66 + i * 13, t, 8, W.biru))),
      tambah("empat", ...cabang("h2", 104, 32, 90, 18, W.langit, ["Segi Empat"], 8.6), ...["Persegi Panjang", "Persegi", "Jajargenjang", "Layang-layang", "Belah Ketupat", "Trapesium", "Segi Empat Sembarang"].map((t, i) => teks(`l2-${i}`, 149, 66 + i * 13, t, 7.2, W.biru))),
      tambah("banyak", ...cabang("h3", 204, 32, 90, 18, W.krem, ["Segi Banyak"], 8.6), ...["Segi Lima", "Segi Enam", "Segi Delapan"].map((t, i) => teks(`l3-${i}`, 249, 66 + i * 13, t, 8, W.biru)), teks("l3-3", 249, 108, "(beraturan)", 7.6, W.ungu)),
    ),
    k(
      "Sembilan kata kunci bab ini: bangun datar, bangun gabungan, belah ketupat, jajargenjang, layang-layang, persegi, persegi panjang, trapesium, dan keliling.",
      bersih(0),
      tambah(0, judul("Kata Kunci")),
      tambah("datar,", chip(0)),
      tambah("gabungan,", chip(1)),
      tambah("ketupat,", chip(2)),
      tambah("jajargenjang,", chip(3)),
      tambah("layang-layang,", chip(4)),
      tambah("persegi,", chip(5)),
      tambah("panjang,", chip(6)),
      tambah("trapesium,", chip(7)),
      tambah("keliling.", chip(8)),
    ),
    k(
      "Buku panduan guru menjelaskan bahwa bab ini terdiri atas lima subbab. A tentang pengertian keliling bangun datar. B keliling segitiga. C keliling segi empat. D keliling segi banyak. E keliling bangun gabungan.",
      bersih(0),
      tambah(0, judul("Lima subbab")),
      tambah(11, ...kartu("sa", 12, 34, 276, 26, W.hijauMuda, ["A. Apakah keliling bangun datar itu?"], 8.6)),
      tambah(17, ...kartu("sb", 12, 66, 276, 26, W.langit, ["B. Keliling segitiga"], 8.6)),
      tambah(20, ...kartu("sc", 12, 98, 276, 26, W.krem, ["C. Keliling segi empat"], 8.6)),
      tambah(24, ...kartu("sd", 12, 130, 276, 26, W.pink, ["D. Keliling segi banyak"], 8.6)),
      tambah(28, ...kartu("se", 12, 162, 276, 26, W.jingga, ["E. Keliling bangun gabungan"], 8.6)),
    ),
    k(
      "Waktu yang disarankan: subbab A dua jam pelajaran, B empat, C empat, D dua, dan E empat. Guru boleh menyesuaikannya dengan keadaan kelas.",
      bersih(0),
      tambah(0, judul("Skema Pembelajaran")),
      ...["A", "B", "C", "D", "E"].map((h, i) => tambah([4, 8, 10, 12, 15][i], ...kartu(`sk${i}`, 8 + i * 57, 50, 52, 52, [W.hijauMuda, W.langit, W.krem, W.pink, W.jingga][i], [`Subbab ${h}`, ["2 JP", "4 JP", "4 JP", "2 JP", "4 JP"][i]], 8.2))),
      tambah("Guru", teks("cat", 150, 134, "JP = jam pelajaran (saran)", 8.8, W.ungu)),
    ),
    k(
      "Bab ini diawali masalah kontekstual dan memakai etnomatematika, yaitu benteng yang mengelilingi Keraton Yogyakarta. Di subbab A, kata keliling tidak diberitahukan langsung. Peserta didik sendiri yang memunculkannya lewat rute berlari.",
      bersih(0),
      tambah(0, judul("Cara bab ini belajar")),
      tambah("benteng", emo("bt", 70, 90, "🏰", 40), teks("btt", 70, 112, "benteng Keraton", 8.6, W.coklat)),
      tambah("diberitahukan", ...kartu("kk", 140, 56, 148, 44, W.krem, ["kata keliling tidak", "diberitahukan langsung"], 8.6)),
      tambah("rute", emo("rt", 214, 140, "🏃", 34), teks("rtt", 214, 160, "siswa memunculkannya", 8.2, W.hijau)),
    ),
    k(
      "Jadi hari ini kita masuk subbab A, Apakah Keliling Bangun Datar Itu? Kita mulai dari benteng, pagar, dan bingkai, lalu cerita lari Asep.",
      bersih(0),
      tambah(0, judul("Subbab A")),
      tambah("Apakah", ...kartu("jd", 30, 34, 240, 40, W.hijauMuda, ["A. Apakah Keliling", "Bangun Datar Itu?"], 10)),
      tambah("benteng,", emo("e1", 60, 118, "🏰", 34)),
      tambah("pagar,", emo("e2", 120, 118, "🏠", 34)),
      tambah("bingkai,", emo("e3", 180, 118, "🖼", 34)),
      tambah("Asep.", emo("e4", 240, 118, "🏃", 34), teks("e4t", 150, 160, "dari benteng sampai lapangan", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Berpikir Kritis: Benteng Baluwarti (Buku Siswa hlm. 107 dan 108; Panduan Guru hlm. 119 dan 120) ------------------------------ */
/** Tiga bagian sketsa denah benteng, titik relatif terhadap pojok kiri-atas sketsa (130 kali 80). */
const BAGIAN_DENAH: { id: string; p: [number, number][]; warna: string }[] = [
  { id: "dk", p: [[0, 22], [34, 22], [34, 80], [0, 80]], warna: W.hijauMuda },
  { id: "dt", p: [[34, 0], [96, 0], [96, 80], [34, 80]], warna: W.langit },
  { id: "dn", p: [[96, 22], [130, 22], [130, 80], [96, 80]], warna: W.krem },
];
const denahBagian = (x: number, y: number): Obj[] => BAGIAN_DENAH.map((b) => poligon(b.id, x, y, b.p, b.warna, W.biru, { tebal: 1.2 }));

export const ADEGAN_BENTENG: AdeganStory = {
  id: "benteng-baluwarti",
  judul: "Ayo Berpikir Kritis: Benteng Baluwarti",
  sumber: "Buku Siswa hlm. 107–108; Panduan Guru hlm. 119–120",
  latar: "#FEF3C7",
  kutipan: [
    "Dalam kehidupan sehari-hari, kita sering menghitung keliling suatu",
    "Benteng Baluwarti (kiri) adalah benteng pertahanan yang",
    "Perhatikan denah benteng tersebut (kanan). Berbentuk apakah",
    "berbagai bangun datar, ya. Bangun apa saja yang dapat kalian",
    "panjang keseluruhan benteng yang hendak dipugar. Kita dapat",
    "Coba pikirkan. Bagaimana cara kalian menghitung kelilingnya?",
    "Etnomatematika adalah pendekatan pembelajaran",
  ],
  ketukan: [
    k(
      "Subbab A dibuka dengan Ayo Berpikir Kritis. Dalam kehidupan sehari-hari, kita sering menghitung keliling suatu benda untuk berbagai keperluan. Lihat gambar empat titik satu: Benteng Baluwarti dan denahnya.",
      tambah(0, judul("Ayo Berpikir Kritis")),
      tambah("Lihat", emo("bw", 70, 100, "🏰", 46)),
      tambah("denahnya.", poligon("dn0", 150, 52, TITIK_DENAH, W.krem, W.coklat, { tebal: 2 }), teks("dnt", 215, 143, "denah (sketsa)", 8, W.coklat)),
      tambah("gambar", teks("g41", 150, 170, "Gambar 4.1: Benteng Baluwarti dan denahnya", 8.2, W.biru)),
    ),
    k(
      "Benteng Baluwarti adalah benteng pertahanan yang mengelilingi kompleks Keraton Yogyakarta. Dibangun pada masa Sri Sultan Hamengkubuwono pertama, tahun seribu tujuh ratus lima puluh lima sampai seribu tujuh ratus sembilan puluh dua, untuk bertahan dari serangan musuh.",
      bersih(0),
      tambah(0, judul("Benteng Baluwarti")),
      tambah("kompleks", poligon("kp", 20, 44, [[30, 20], [100, 20], [100, 60], [30, 60]], W.krem, W.coklat, { putus: true }), teks("kpt", 85, 86, "Keraton", 9, W.coklat)),
      tambah("mengelilingi", jalur("lg", 20, 44, "M0 22 L34 22 L34 0 L96 0 L96 22 L130 22 L130 80 L0 80 Z", "none", W.biru, { tebal: 2.6, gambar: true })),
      tambah("tahun", ...kartu("th", 168, 44, 120, 38, W.krem, ["dibangun", "1755 sampai 1792"], 9)),
      tambah("serangan", emo("pt", 228, 118, "🛡", 30), teks("ptt", 228, 138, "pertahanan", 8.4, W.biru)),
    ),
    k(
      "Perhatikan denahnya. Berbentuk apakah benteng itu? Tampaknya tersusun dari berbagai bangun datar. Bangun apa saja yang dapat kalian temukan?",
      bersih(0),
      tambah(0, judul("Bangun apa saja?")),
      tambah("Perhatikan", poligon("dn1", 85, 56, TITIK_DENAH, "none", W.coklat, { tebal: 2 })),
      tambah("tersusun", ...denahBagian(85, 56)),
      tambah("Bangun@2", teks("q1", 102, 112, "?", 16, W.merah), teks("q2", 150, 101, "?", 16, W.merah), teks("q3", 198, 112, "?", 16, W.merah)),
    ),
    k(
      "Kini Keraton memugar benteng itu. Saat memugar, mereka perlu tahu panjang keseluruhan benteng yang hendak dipugar. Kita dapat mengetahuinya dengan menghitung keliling benteng.",
      bersih(0),
      tambah(0, judul("Pemugaran benteng")),
      tambah("memugar", emo("pg", 245, 90, "👷", 36), poligon("dn2", 40, 52, TITIK_DENAH, W.krem, W.coklat, { tebal: 2 })),
      tambah("panjang", jalur("kl", 40, 52, "M0 22 L34 22 L34 0 L96 0 L96 22 L130 22 L130 80 L0 80 Z", "none", W.merah, { tebal: 3, gambar: true })),
      tambah("keliling", ...kartu("kb", 60, 150, 180, 30, W.merahMuda, ["panjang benteng = keliling benteng"], 8.8)),
    ),
    k(
      "Coba pikirkan: bagaimana cara kalian menghitung kelilingnya? Buku sengaja belum menjawabnya. Jawabannya akan kalian temukan sendiri lewat eksplorasi.",
      bersih(0),
      tambah(0, judul("Coba pikirkan")),
      tambah("bagaimana", teks("qb", 150, 100, "?", 60, W.merah)),
      tambah("kalian", ...kartu("qk", 40, 126, 220, 34, W.krem, ["Bagaimana cara menghitung", "keliling benteng?"], 9)),
      tambah("eksplorasi.", emo("ls", 240, 80, "🔍", 32)),
    ),
    k(
      "Panduan guru menyebut ini kajian etnomatematika, yaitu pendekatan yang mengangkat objek budaya di sekitar peserta didik sebagai titik awal pembelajaran. Manfaatnya, melestarikan nilai luhur bangsa dan membuat belajar lebih menyenangkan.",
      bersih(0),
      tambah(0, judul("Etnomatematika")),
      tambah("mengangkat", ...kartu("en", 14, 34, 272, 44, W.krem, ["objek budaya di sekitar siswa", "= titik awal belajar matematika"], 9)),
      tambah("melestarikan", ...kartu("m1", 14, 94, 132, 40, W.hijauMuda, ["melestarikan nilai", "luhur bangsa"], 8.6)),
      tambah("menyenangkan.", ...kartu("m2", 154, 94, 132, 40, W.langit, ["belajar lebih", "menyenangkan"], 8.6)),
      tambah("Manfaatnya,", emo("kr", 150, 170, "🏰", 28)),
    ),
  ],
};

/* ------------------------------ 4. Sekeliling kita: pagar dan bingkai (Buku Siswa hlm. 108 dan 109; Panduan Guru hlm. 118 dan 120) ------------------------------ */
export const ADEGAN_SEKELILING: AdeganStory = {
  id: "sekeliling",
  judul: "Benda sekeliling: pagar dan bingkai foto",
  sumber: "Buku Siswa hlm. 108–109; Panduan Guru hlm. 118 dan 120",
  latar: "#F0FDF4",
  kutipan: [
    "Sekarang, perhatikan sekeliling kalian.",
    "kalian hitung kelilingnya?",
    "pagar yang mengelilingi rumah atau kebun? Bagaimana cara",
    "Pernah jugakah kalian",
    "Denah kompleks istana, kebun, dan foto merupakan contoh benda-",
    "belajar menghitung keliling bangun datar.",
    "Alat tulis: pulpen, pensil, penggaris, spidol.",
  ],
  ketukan: [
    k(
      "Sekarang perhatikan sekeliling kalian. Benda apa saja yang biasa kalian hitung kelilingnya? Seperti benteng, pernahkah kalian melihat pagar yang mengelilingi rumah atau kebun?",
      tambah(0, judul("Lihat sekeliling")),
      tambah("Benda", teks("q", 150, 38, "benda apa yang dihitung kelilingnya?", 8.8, W.ungu)),
      tambah("pagar", kotak("pg", 40, 52, 100, 70, "none", W.coklat, { putus: true, tebal: 2.4 }), emo("rm", 90, 104, "🏠", 40), teks("pgt", 90, 140, "pagar rumah", 8.6, W.coklat)),
      tambah("kebun?", kotak("kb", 170, 52, 100, 70, "none", W.coklat, { putus: true, tebal: 2.4 }), emo("kn", 220, 104, "🌱", 40), teks("kbt", 220, 140, "pagar kebun", 8.6, W.coklat)),
    ),
    k(
      "Bagaimana cara menghitung panjang pagar itu? Pernah juga membantu membuat bingkai foto? Bagaimana cara menentukan panjang kayu yang diperlukan untuk membuatnya?",
      bersih(0),
      tambah(0, judul("Pagar dan bingkai")),
      tambah("pagar", kotak("pg", 30, 50, 100, 62, W.hijauMuda, W.coklat, { putus: true, tebal: 2.4 }), teks("pgt", 80, 132, "panjang pagar?", 9, W.coklat)),
      tambah("bingkai", ...bingkai("bk", 170, 50, 100, 62, 9)),
      tambah("kayu", teks("kyt", 220, 132, "panjang kayu?", 9, W.coklat)),
    ),
    k(
      "Denah kompleks istana, kebun, dan foto adalah contoh benda berbentuk bangun datar. Untuk mengetahui panjang benteng, pagar, atau bingkai, kalian perlu belajar menghitung keliling bangun datar.",
      bersih(0),
      tambah(0, judul("Semuanya bangun datar")),
      tambah("Denah", ...kartu("c1", 10, 34, 86, 28, W.krem, ["denah istana"], 8.4)),
      tambah("kebun,", ...kartu("c2", 107, 34, 86, 28, W.hijauMuda, ["kebun"], 8.4)),
      tambah("foto", ...kartu("c3", 204, 34, 86, 28, W.pink, ["foto"], 8.4)),
      tambah("bangun", panah("a1", 150, 66, 0, 24, W.biru, 2.2, { gambar: true }), ...kartu("c4", 70, 96, 160, 30, W.langit, ["berbentuk bangun datar"], 9)),
      tambah("belajar", panah("a2", 150, 130, 0, 24, W.biru, 2.2, { gambar: true }), ...kartu("c5", 70, 160, 160, 30, W.emas, ["belajar keliling"], 9.6)),
    ),
    k(
      "Guru menyiapkan alat tulis, penggaris, spidol, dan gambar lapangan sepak bola yang diperbesar. Untuk apersepsi, siswa harus sudah mengenal benda yang mewakili bangun datar, lalu guru mengajak tanya jawab.",
      bersih(0),
      tambah(0, judul("Persiapan guru")),
      tambah("alat", ...kartu("g1", 14, 34, 272, 28, W.krem, ["alat tulis, penggaris, spidol"], 8.8), emo("g1e", 266, 55, "📏", 16)),
      tambah("gambar", ...kartu("g2", 14, 70, 272, 28, W.langit, ["gambar lapangan sepak bola diperbesar"], 8.8)),
      tambah("apersepsi,", ...kartu("g3", 14, 106, 272, 40, W.hijauMuda, ["apersepsi: siswa mengenal benda", "yang mewakili bangun datar"], 8.8)),
      tambah("tanya", ...kartu("g4", 14, 154, 272, 28, W.pink, ["lalu tanya jawab di kelas"], 8.8)),
    ),
  ],
};
