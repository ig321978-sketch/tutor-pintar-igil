import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, garis, jalur, judul, kartu, kotak, panah, poligon, sel, teks } from "./k5b5a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b5a-bantu";

/* ------------------------------ 1. Pembuka bab: tujuan dan kata kunci (hlm. 131 dan 133; Panduan Guru hlm. 177) ------------------------------ */
const WARNA = [W.krem, W.langit, W.hijauMuda, W.pink, W.jingga, W.merahMuda];
const KATA_KUNCI = ["bangun datar", "bangun gabungan", "belah ketupat", "jajargenjang", "layang-layang", "luas daerah", "persegi", "persegi panjang", "trapesium"];
const chip = (i: number): Obj[] => kartu(`ch${i}`, 12 + (i % 3) * 96, 36 + Math.floor(i / 3) * 40, 90, 30, WARNA[i % 6], [KATA_KUNCI[i]], 8.2);

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 5: tujuan dan kata kunci",
  sumber: "Buku Siswa hlm. 131–133; Panduan Guru hlm. 177",
  latar: "#FFF7ED",
  kutipan: [
    "Setelah mempelajari bab ini, diharapkan kalian mampu menemukan",
    "cara menghitung luas berbagai daerah bangun datar dan",
    "mengetahui kapan harus menggunakannya.",
    "Bangun datar, bangun gabungan, belah ketupat, jajargenjang,",
    "layang-layang, luas daerah, persegi, persegi panjang, trapesium.",
    "Di kelas IV, kalian sudah belajar berbagai macam bangun datar",
    "mengenali situasi soal yang melibatkan luas bangun datar;",
  ],
  ketukan: [
    k(
      "Selamat datang di bab lima, Luas Daerah Bangun Datar. Setelah mempelajari bab ini, kalian diharapkan mampu menemukan cara menghitung luas berbagai daerah bangun datar dan mengetahui kapan harus menggunakannya.",
      tambah(0, judul("Bab 5: Luas Daerah Bangun Datar")),
      tambah("bab", emo("lg", 150, 96, "📐", 52)),
      tambah("mampu", ...kartu("tj", 30, 128, 240, 44, W.krem, ["menemukan cara menghitung luas", "berbagai daerah bangun datar"], 9)),
      tambah("kapan", teks("kp", 150, 190, "dan tahu kapan memakainya", 9, W.hijau)),
    ),
    k(
      "Di kelas empat, kalian sudah belajar berbagai macam bangun datar beserta ciri-cirinya. Di kelas lima, pengetahuan itu dipakai untuk belajar luas daerah.",
      bersih(0),
      tambah(0, judul("Dari kelas IV ke kelas V")),
      tambah("empat,", ...kartu("k4", 14, 44, 120, 44, W.langit, ["Kelas IV:", "bangun datar", "dan cirinya"], 8.6), poligon("g1", 40, 108, [[0, 0], [30, 0], [30, 22], [0, 22]], W.hijauMuda), poligon("g2", 84, 108, [[0, 0], [36, 0], [26, 22], [-8, 22]], W.krem)),
      tambah("lima,", panah("ar", 138, 66, 24, 0, W.biru, 2.4, { gambar: true }), ...kartu("k5", 166, 44, 120, 44, W.hijauMuda, ["Kelas V:", "luas daerah", "bangun datar"], 8.6)),
      tambah("luas", ...petakIsi("gp", 196, 106, 4, 3, 14)),
    ),
    k(
      "Ada sembilan kata kunci: bangun datar, bangun gabungan, belah ketupat, jajargenjang, layang-layang, luas daerah, persegi, persegi panjang, dan trapesium.",
      bersih(0),
      tambah(0, judul("Kata Kunci")),
      tambah("datar,", chip(0)),
      tambah("gabungan,", chip(1)),
      tambah("ketupat,", chip(2)),
      tambah("jajargenjang,", chip(3)),
      tambah("layang-layang,", chip(4)),
      tambah("daerah,", chip(5)),
      tambah("persegi,", chip(6)),
      tambah("panjang,", chip(7)),
      tambah("trapesium.", chip(8)),
    ),
    k(
      "Panduan guru menuliskan tiga tujuan. Pertama, mengenali situasi soal yang melibatkan luas bangun datar. Kedua, menemukan luas berbagai bangun datar. Ketiga, mengenali hubungan keliling dan luas.",
      bersih(0),
      tambah(0, judul("Tiga tujuan (Panduan Guru)")),
      tambah("Pertama,", ...kartu("p1", 14, 36, 272, 36, W.hijauMuda, ["1. Mengenali situasi soal yang", "melibatkan luas bangun datar"], 8.6)),
      tambah("Kedua,", ...kartu("p2", 14, 82, 272, 36, W.langit, ["2. Menemukan luas", "berbagai bangun datar"], 8.6)),
      tambah("Ketiga,", ...kartu("p3", 14, 128, 272, 36, W.krem, ["3. Mengenali hubungan", "keliling dan luas"], 8.6)),
    ),
    k(
      "Hari ini kita baru di tujuan pertama. Kita mengenali situasi soal luas dan memahami luas sebagai ukuran, lewat cerita pasir dan ubin lantai.",
      sorotkan("pertama", "p1-k", "p1-t0", "p1-t1"),
      ubah("Hari", ...["p2-k", "p2-t0", "p2-t1", "p3-k", "p3-t0", "p3-t1"].map((id) => ({ id, op: 0.3 }))),
      tambah("pasir", teks("pa", 70, 188, "pasir", 9.4, W.coklat), teks("ub", 150, 188, "dan", 9, W.biru), teks("ub2", 230, 188, "ubin lantai", 9.4, W.merah)),
    ),
  ],
};

function petakIsi(id: string, x: number, y: number, kol: number, baris: number, s: number): Obj[] {
  const out: Obj[] = [];
  for (let r = 0; r < baris; r += 1) for (let c = 0; c < kol; c += 1) out.push(sel(`${id}-${r}-${c}`, x + c * s, y + r * s, s, W.emas));
  return out;
}

/* ------------------------------ 2. Peta konsep dan skema (hlm. 132; Panduan Guru hlm. 178 sampai 180) ------------------------------ */
const cabang = (id: string, x: number, y: number, w: number, h: number, warna: string, b: string[], u = 8.2): Obj[] => kartu(id, x, y, w, h, warna, b, u);

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep dan empat subbab",
  sumber: "Buku Siswa hlm. 132; Panduan Guru hlm. 178–180",
  latar: "#F5F3FF",
  kutipan: [
    "Peta Konsep",
    "Segitiga Sembarang",
    "Segi Empat Sembarang",
    "Segi Lima Beraturan",
    "Bab ini terdiri atas empat subbab.",
    "Subbab A mendiskusikan tentang",
    "pengertian luas daerah bangun datar.",
  ],
  ketukan: [
    k(
      "Ini peta konsep bab lima. Di tengah ada luas daerah bangun datar. Cabangnya segitiga, segi empat, segi banyak, dan bangun gabungan.",
      tambah(0, judul("Peta Konsep")),
      tambah("tengah", ...kartu("pu", 80, 84, 140, 34, W.emas, ["Luas Daerah", "Bangun Datar"], 9.4)),
      tambah("segitiga,", garis("ga", 110, 84, -46, -22, W.biru, 1.6, { gambar: true }), ...cabang("ca", 8, 36, 108, 24, W.hijauMuda, ["Segitiga"], 9)),
      tambah("empat,", garis("gb", 190, 84, 46, -22, W.biru, 1.6, { gambar: true }), ...cabang("cb", 184, 36, 108, 24, W.langit, ["Segi Empat"], 9)),
      tambah("banyak,", garis("gc", 110, 118, -46, 34, W.biru, 1.6, { gambar: true }), ...cabang("cc", 8, 152, 108, 24, W.krem, ["Segi Banyak"], 9)),
      tambah("gabungan.", garis("gd", 190, 118, 46, 34, W.biru, 1.6, { gambar: true }), ...cabang("cd", 184, 152, 108, 24, W.pink, ["Bangun Gabungan"], 9)),
    ),
    k(
      "Segitiga terdiri atas sembarang, sama sisi, dan sama kaki. Segi empat memuat tujuh jenis, termasuk persegi dan trapesium. Segi banyak memuat segi lima, segi enam, dan segi delapan beraturan.",
      bersih(0),
      tambah(0, judul("Isi tiap cabang")),
      tambah("Segitiga", ...cabang("h1", 6, 32, 90, 18, W.hijauMuda, ["Segitiga"], 8.6), ...["Sembarang", "Sama Sisi", "Sama Kaki"].map((t, i) => teks(`l1-${i}`, 51, 66 + i * 13, t, 8, W.biru))),
      tambah("empat", ...cabang("h2", 104, 32, 90, 18, W.langit, ["Segi Empat"], 8.6), ...["Persegi Panjang", "Persegi", "Jajargenjang", "Layang-layang", "Belah Ketupat", "Trapesium", "Segi Empat Sembarang"].map((t, i) => teks(`l2-${i}`, 149, 66 + i * 13, t, 7.2, W.biru))),
      tambah("banyak", ...cabang("h3", 204, 32, 90, 18, W.krem, ["Segi Banyak"], 8.6), ...["Segi Lima", "Segi Enam", "Segi Delapan"].map((t, i) => teks(`l3-${i}`, 249, 66 + i * 13, t, 8, W.biru)), teks("l3-3", 249, 108, "(beraturan)", 7.6, W.ungu)),
    ),
    k(
      "Buku panduan menjelaskan empat subbab. A tentang pengertian luas daerah. B menemukan luas berbagai bangun. C tentang bangun gabungan. D tentang hubungan keliling dan luas.",
      bersih(0),
      tambah(0, judul("Empat subbab")),
      tambah("pengertian", ...kartu("sa", 12, 36, 276, 28, W.hijauMuda, ["A. Konsep luas daerah bangun datar"], 8.6)),
      tambah("menemukan", ...kartu("sb", 12, 70, 276, 28, W.langit, ["B. Luas daerah berbagai bangun datar"], 8.6)),
      tambah("gabungan.", ...kartu("sc", 12, 104, 276, 28, W.krem, ["C. Luas daerah bangun gabungan"], 8.6)),
      tambah("hubungan", ...kartu("sd", 12, 138, 276, 28, W.pink, ["D. Hubungan keliling dan luas"], 8.6)),
    ),
    k(
      "Waktu yang disarankan: subbab A empat jam pelajaran, B delapan, C dua, dan D dua. Guru boleh menyesuaikannya dengan keadaan kelas.",
      bersih(0),
      tambah(0, judul("Skema Pembelajaran")),
      ...["A", "B", "C", "D"].map((h, i) => tambah([4, 8, 10, 13][i], ...kartu(`sk${i}`, 12 + i * 72, 50, 66, 52, [W.hijauMuda, W.langit, W.krem, W.pink][i], [`Subbab ${h}`, ["4 JP", "8 JP", "2 JP", "2 JP"][i]], 8.8))),
      tambah("Guru", teks("cat", 150, 130, "JP = jam pelajaran (saran)", 8.8, W.ungu)),
    ),
    k(
      "Hari ini kita masuk subbab A, Konsep Luas Daerah Bangun Datar. Di sini kalian belum langsung diberi tahu konsepnya, tetapi menemukannya lewat kegiatan memasang ubin.",
      sorotkan("subbab", "sk0-k", "sk0-t0", "sk0-t1"),
      ubah("Hari", ...["sk1", "sk2", "sk3"].flatMap((p) => [`${p}-k`, `${p}-t0`, `${p}-t1`].map((id) => ({ id, op: 0.3 })))),
      tambah("memasang", emo("ub", 150, 168, "🧱", 34)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 5.1A: Alun-Alun Utara (hlm. 133 dan 134; Panduan Guru hlm. 183 dan 184) ------------------------------ */
export const ADEGAN_ALUN: AdeganStory = {
  id: "alun-alun",
  judul: "Eksplorasi 5.1A: pasir untuk Alun-Alun Utara",
  sumber: "Buku Siswa hlm. 133–134; Panduan Guru hlm. 183–184",
  latar: "#FEF3C7",
  kutipan: [
    "Eksplorasi 5.1A",
    "Alun-alun berasal dari kata \"alun\" yang bermakna ombak.",
    "terdapat tanah lapang yang sangat luas bernama Alun-Alun Utara.",
    "Pada tahun 2022, Keraton Yogyakarta memugar Alun-Alun Utara",
    "Berapa banyak pasir yang dibutuhkan untuk menutupi seluruh",
    "Apa yang harus dihitung terlebih dahulu untuk melakukan",
  ],
  ketukan: [
    k(
      "Eksplorasi lima titik satu A, Ayo Berpikir Kreatif. Di bagian utara kompleks Keraton Yogyakarta ada tanah lapang yang sangat luas, bernama Alun-Alun Utara.",
      tambah(0, judul("Eksplorasi 5.1A")),
      tambah("kompleks", emo("kr", 150, 62, "🏛", 40), teks("krt", 150, 80, "Keraton Yogyakarta", 8.6, W.coklat)),
      tambah("tanah", kotak("al", 40, 100, 220, 70, W.krem, W.coklat, { rx: 2, tebal: 2 }), teks("alt", 150, 140, "Alun-Alun Utara", 11, W.coklat)),
    ),
    k(
      "Alun-alun berasal dari kata alun yang berarti ombak. Dahulu tanah lapang berpasir ini menggambarkan gelombang ombak, mengajak orang menghayati pasang surut kehidupan.",
      bersih(0),
      tambah(0, judul("Alun-alun = ombak")),
      tambah("ombak.", jalur("om1", 30, 90, "M0 0 Q 30 -26 60 0 T 120 0 T 180 0 T 240 0", "none", W.biru, { tebal: 3, gambar: true }), jalur("om2", 30, 118, "M0 0 Q 30 -26 60 0 T 120 0 T 180 0 T 240 0", "none", W.langit, { tebal: 3, gambar: true })),
      tambah("berpasir", teks("ps", 150, 160, "tanah lapang berpasir", 9.4, W.coklat)),
      tambah("pasang", teks("pg", 150, 184, "pasang surut kehidupan", 9, W.ungu)),
    ),
    k(
      "Pada tahun dua ribu dua puluh dua, Keraton memugar Alun-Alun Utara dengan pasir dari pantai selatan Jawa. Selama beberapa bulan, banyak truk berlalu-lalang membawa pasir itu.",
      bersih(0),
      tambah(0, judul("Pemugaran tahun 2022")),
      tambah("Keraton", kotak("al", 70, 94, 160, 64, W.krem, W.coklat, { rx: 2, tebal: 2 }), teks("alt", 150, 130, "Alun-Alun Utara", 9.4, W.coklat)),
      tambah("pantai", teks("pn", 40, 54, "pantai selatan", 8.6, W.biru), emo("tk1", 40, 84, "🚚", 26)),
      tambah("truk", emo("tk2", 150, 78, "🚚", 26), emo("tk3", 250, 78, "🚚", 26)),
      tambah("pasir", teks("ps", 150, 184, "pasir pantai menutup alun-alun", 9, W.coklat)),
    ),
    k(
      "Coba pikirkan tiga pertanyaan. Berapa banyak pasir untuk menutupi seluruh alun-alun? Berapa truk, jika satu truk hanya menutupi sebagian luas tertentu? Dan apa yang harus dihitung lebih dulu?",
      bersih(0),
      tambah(0, judul("Coba pikirkan")),
      tambah("Berapa", ...kartu("q1", 14, 34, 272, 34, W.langit, ["1. Berapa banyak pasir untuk", "menutupi seluruh alun-alun?"], 8.6)),
      tambah("truk,", ...kartu("q2", 14, 78, 272, 34, W.hijauMuda, ["2. Berapa truk, bila satu truk", "menutupi sebagian luas tertentu?"], 8.6)),
      tambah("apa", ...kartu("q3", 14, 122, 272, 34, W.krem, ["3. Apa yang harus dihitung", "lebih dahulu?"], 8.6)),
    ),
    k(
      "Jawabannya: banyaknya pasir bergantung pada luas alun-alun. Makin luas alun-alun, makin banyak pasir, dan makin banyak pula truk yang dibutuhkan.",
      bersih(0),
      tambah(0, judul("Makin luas, makin banyak")),
      tambah("luas", ...kartu("lu", 12, 60, 80, 40, W.emas, ["luas", "alun-alun"], 9.4)),
      tambah("pasir,", panah("a1", 94, 80, 22, 0, W.biru, 2.4, { gambar: true }), ...kartu("pa", 118, 60, 80, 40, W.krem, ["banyak", "pasir"], 9.4)),
      tambah("truk", panah("a2", 200, 80, 22, 0, W.biru, 2.4, { gambar: true }), ...kartu("tr", 224, 60, 64, 40, W.jingga, ["banyak", "truk"], 9.4)),
      tambah("dibutuhkan.", teks("ak", 150, 140, "luas dihitung lebih dahulu", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Eksplorasi 5.1B: denah rumah dan pemasangan ubin (hlm. 134 sampai 136; Panduan Guru hlm. 184 sampai 187) ------------------------------ */
/** Denah ringkas (skala kecil): dua kamar tidur, dapur, kamar mandi, ruang tamu. Id kotak ruang `rm-*`. */
const denahRingkas = (id: string, x: number, y: number, s: number): Obj[] => [
  kotak(`${id}-t2`, x, y, 3 * s, 3 * s, W.hijauMuda, W.biru, { rx: 0 }),
  kotak(`${id}-t1`, x, y + 3 * s, 3 * s, 3 * s, W.hijauMuda, W.biru, { rx: 0 }),
  kotak(`${id}-dp`, x + 3 * s, y, 3 * s, 2 * s, W.krem, W.biru, { rx: 0 }),
  kotak(`${id}-tm`, x + 3 * s, y + 2 * s, 3 * s, 4 * s, W.langit, W.biru, { rx: 0 }),
  kotak(`${id}-km`, x + 4 * s, y + 2 * s, 2 * s, s, W.pink, W.biru, { rx: 0 }),
];
const labelDenah = (id: string, x: number, y: number, s: number): Obj[] => [
  teks(`${id}-lt2`, x + 1.5 * s, y + 1.6 * s, "Tidur 2", 7, W.biru),
  teks(`${id}-lt1`, x + 1.5 * s, y + 4.6 * s, "Tidur 1", 7, W.biru),
  teks(`${id}-ldp`, x + 4.5 * s, y + 1.2 * s, "Dapur", 7, W.biru),
  teks(`${id}-ltm`, x + 4.5 * s, y + 4.4 * s, "R. Tamu", 7, W.biru),
];

export const ADEGAN_DENAH: AdeganStory = {
  id: "denah-ubin",
  judul: "Eksplorasi 5.1B: denah rumah dan ubin",
  sumber: "Buku Siswa hlm. 134–136; Panduan Guru hlm. 184–187",
  latar: "#ECFEFF",
  kutipan: [
    "Pernahkah kalian melihat pekerja bangunan memasang ubin di",
    "terpasang ubin dengan rapat, tidak ada yang renggang ataupun",
    "Perhatikan denah rumah berikut.",
    "Jika seluruh lantai rumah tersebut akan dipasang ubin berukuran",
    "Ruangan manakah yang membutuhkan ubin paling",
    "Adakah ruangan yang membutuhkan ubin sama",
  ],
  ketukan: [
    k(
      "Eksplorasi lima titik satu B. Pernahkah kalian melihat pekerja memasang ubin di lantai? Pekerja memastikan seluruh lantai terpasang ubin dengan rapat, tidak ada yang renggang dan tidak ada yang berlubang.",
      tambah(0, judul("Eksplorasi 5.1B")),
      tambah("pekerja", emo("pk", 44, 76, "👷", 34)),
      tambah("rapat,", ...petakIsiBerwarna("ubn", 90, 50, 6, 4, 22)),
      tambah("renggang", teks("rg", 222, 172, "rapat: tanpa celah", 9, W.hijau)),
      tambah("berlubang.", teks("bl", 222, 188, "tanpa lubang", 9, W.hijau)),
    ),
    k(
      "Perhatikan denah rumah ini. Jika seluruh lantai dipasang ubin berukuran satu meter kali satu meter, dapatkah kalian memperkirakan banyaknya ubin yang dibutuhkan?",
      bersih(0),
      tambah(0, judul("Gambar 5.2: denah rumah")),
      tambah("denah", ...denahRingkas("dn", 24, 36, 21), ...labelDenah("dn", 24, 36, 21)),
      tambah("ubin", kotak("ub1", 168, 56, 22, 22, W.emas, W.biru, { rx: 0 }), teks("ub1t", 230, 70, "1 m × 1 m", 9.4, W.biru)),
      tambah("memperkirakan", teks("q", 228, 138, "berapa ubin?", 11, W.merah)),
    ),
    k(
      "Lukas dan teman-teman berbagi tugas. Ada yang menghitung ruangan terbesar, ada yang kamar tidur, ada yang dapur, dan ada yang kamar mandi.",
      bersih(0),
      tambah(0, judul("Berbagi tugas")),
      tambah("ruangan", ...kartu("t1", 14, 36, 130, 26, W.langit, ["ruangan terbesar"], 8.8)),
      tambah("kamar", ...kartu("t2", 156, 36, 130, 26, W.hijauMuda, ["kamar tidur"], 8.8)),
      tambah("dapur,", ...kartu("t3", 14, 74, 130, 26, W.krem, ["dapur"], 8.8)),
      tambah("kamar@2", ...kartu("t4", 156, 74, 130, 26, W.pink, ["kamar mandi"], 8.8)),
      tambah("Lukas", emo("tm", 150, 150, "👦", 36)),
    ),
    k(
      "Menurut kunci panduan guru, ruangan yang butuh ubin paling banyak adalah ruang tamu, karena ukurannya paling besar dan lantainya paling luas. Yang paling sedikit adalah kamar mandi, yang paling kecil.",
      bersih(0),
      tambah(0, judul("Paling banyak, paling sedikit")),
      tambah(0, ...denahRingkas("dn", 24, 36, 21), ...labelDenah("dn", 24, 36, 21)),
      ubah("tamu,", { id: "dn-tm", warna: W.emas }),
      tambah("tamu,", ...kartu("pl", 170, 44, 118, 36, W.emas, ["paling banyak:", "ruang tamu"], 9)),
      ubah("mandi,", { id: "dn-km", warna: W.merah }),
      tambah("mandi,", ...kartu("pk", 170, 100, 118, 36, W.pink, ["paling sedikit:", "kamar mandi"], 9)),
    ),
    k(
      "Ada juga ruangan yang butuh ubin sama banyak, yaitu kamar tidur satu dan kamar tidur dua. Keduanya berbentuk persegi dengan ukuran yang sama.",
      bersih(0),
      tambah(0, judul("Sama banyak")),
      tambah("kamar", ...petakIsiBerwarna("s1", 40, 44, 3, 3, 26), teks("s1t", 79, 140, "kamar tidur 1", 8.8, W.biru)),
      tambah("tidur@2", ...petakIsiBerwarna("s2", 180, 44, 3, 3, 26), teks("s2t", 219, 140, "kamar tidur 2", 8.8, W.biru)),
      tambah("persegi", teks("sm", 150, 100, "=", 22, W.merah)),
      tambah("ukuran", teks("pg", 150, 172, "keduanya persegi, ukuran sama", 9.4, W.hijau)),
    ),
  ],
};

function petakIsiBerwarna(id: string, x: number, y: number, kol: number, baris: number, s: number): Obj[] {
  const out: Obj[] = [];
  for (let r = 0; r < baris; r += 1) for (let c = 0; c < kol; c += 1) out.push(sel(`${id}-${r}-${c}`, x + c * s, y + r * s, s, (r + c) % 2 === 0 ? W.langit : W.hijauMuda));
  return out;
}
