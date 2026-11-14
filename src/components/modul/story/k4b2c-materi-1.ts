import type { AdeganStory } from "./logika-story";
import { W, batang, emo, judul, kartu, kisi, kotak, pecahan, teks } from "./k4b2c-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, warnai } from "./k4b2c-bantu";

/* ------------------------------ 1. Pembuka subbab C (Buku Siswa hlm. 66; Panduan Guru hlm. 100) ------------------------------ */
const SUARA_P1 = "Kita masuk ke subbab C, Pecahan Senilai. Buku Siswa membukanya pada halaman enam puluh enam dengan Aktivitas dua, sedangkan Panduan Guru membukanya pada halaman seratus.";
const SUARA_P2 = "Pengalaman belajarnya, menurut panduan guru: setelah mempelajari subbab ini, peserta didik diharapkan mampu mengenali pecahan senilai menggunakan gambar dan simbol matematika.";
const SUARA_P3 = "Sarana yang disiapkan: dua lembar kertas berbentuk persegi atau kertas origami, gunting, lem, buku tulis, dan pensil warna.";
const SUARA_P4 = "Apersepsi di panduan guru: pecahan dikatakan senilai apabila punya nilai atau bentuk paling sederhana yang sama. Kalimat ini kita uji sebentar lagi lewat kertas dan coklat.";
const SUARA_P5 = "Dua pertanyaan pemantik: apakah pecahan senilai itu, dan bagaimana cara menentukan pecahan senilai? Jawabannya kita temukan lewat aktivitas, pengamatan, dan latihan.";

export const ADEGAN_PENGALAMAN: AdeganStory = {
  id: "pengalaman",
  judul: "Pembuka Subbab C: pengalaman belajar dan pemantik",
  sumber: "Buku Siswa hlm. 66; Panduan Guru hlm. 100",
  latar: "#FFF7ED",
  kutipan: [
    "C. Pecahan Senilai",
    "Aktivitas 2 : Konsep Pecahan Senilai",
    "C. Pecahan senilai",
    "Pengalaman Belajar",
    "mengenali pecahan senilai menggunakan gambar dan simbol matematika",
    "Kebutuhan Sarana Prasarana dan Media",
    "dua lembar kertas berbentuk persegi/kertas origami, gunting, lem, buku tulis dan pensil warna",
    "Pecahan dapat dikatakan senilai apabila pecahan tersebut mempunyai nilai atau bentuk paling sederhana yang sama",
    "Pertanyaan Esensi/Pemantik:",
    "1. apakah pecahan senilai?",
    "2. bagaimana cara menentukan pecahan senilai?",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Subbab C: Pecahan Senilai")),
      tambah("Senilai.", ...pecahan("e1", 112, 66, 2, 6, 16), teks("e2", 150, 70, "=", 22, W.merah), ...pecahan("e3", 188, 66, 1, 3, 16)),
      tambah("Siswa", ...kartu("bs", 14, 118, 130, 30, W.hijauMuda, ["Buku Siswa hlm. 66"], 8.6)),
      tambah("Panduan", ...kartu("bg", 156, 118, 130, 30, W.langit, ["Panduan Guru hlm. 100"], 8.6)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("mengenali", ...kartu("pg", 40, 36, 220, 34, W.emas, ["mengenali pecahan senilai"], 10)),
      tambah("gambar", emo("g1", 80, 108, "🎨", 30), teks("g2", 80, 134, "gambar", 9)),
      tambah("simbol", teks("s1", 220, 106, "2/6 = 1/3", 14), teks("s2", 220, 134, "simbol matematika", 9)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Sarana dan media")),
      tambah("lembar", emo("a1", 50, 66, "📄", 30), teks("a1t", 50, 92, "2 kertas persegi", 8.4)),
      tambah("gunting,", emo("a2", 150, 66, "✂", 30), teks("a2t", 150, 92, "gunting", 8.4)),
      tambah("lem,", emo("a3", 250, 66, "🧴", 30), teks("a3t", 250, 92, "lem", 8.4)),
      tambah("buku", emo("a4", 90, 138, "📓", 30), teks("a4t", 90, 164, "buku tulis", 8.4)),
      tambah("pensil", emo("a5", 210, 138, "🖍", 30), teks("a5t", 210, 164, "pensil warna", 8.4)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("senilai", ...kartu("ap", 20, 34, 260, 50, W.hijauMuda, ["senilai: nilai atau bentuk", "paling sederhananya sama"], 9.4)),
      tambah("uji", emo("au", 150, 120, "🔎", 30)),
      tambah("kertas", ...kartu("ak", 30, 140, 110, 34, W.krem, ["kertas lipat"], 9.4)),
      tambah("coklat.", ...kartu("ac", 160, 140, 110, 34, W.pink, ["coklat"], 9.4)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Dua pertanyaan pemantik")),
      tambah("apakah", ...kartu("q1", 14, 34, 272, 36, W.langit, ["1. apakah pecahan senilai?"], 9.6)),
      tambah("bagaimana", ...kartu("q2", 14, 78, 272, 36, W.krem, ["2. bagaimana menentukan pecahan senilai?"], 9)),
      tambah("aktivitas,", teks("q3", 60, 146, "aktivitas", 9.4, W.hijau)),
      tambah("pengamatan,", teks("q4", 150, 146, "pengamatan", 9.4, W.hijau)),
      tambah("latihan.", teks("q5", 240, 146, "latihan", 9.4, W.hijau), emo("q6", 150, 182, "🤔", 26)),
    ),
  ],
};

/* ------------------------------ 2. Aktivitas 2: alat dan langkah 1-3 (Buku Siswa hlm. 66; Panduan Guru hlm. 101) ------------------------------ */
const SUARA_A1 = "Ayo Beraktivitas. Aktivitas dua berjudul Konsep Pecahan Senilai. Alatnya dua lembar kertas persegi atau origami, gunting, lem, buku tulis, dan pensil warna.";
const SUARA_A2 = "Langkah satu: buat kelompok beranggotakan tiga sampai empat orang. Panduan guru menyarankan kelompok heterogen, yaitu campuran karakteristik dan kemampuan murid.";
const SUARA_A3 = "Langkah dua: lipat kertas pertama menjadi empat bagian yang sama, warnai satu kotak, lalu potong.";
const SUARA_A4 = "Langkah tiga: lipat kertas kedua menjadi enam belas bagian yang sama, warnai empat kotak, lalu potong.";

export const ADEGAN_AKTIVITAS_ALAT: AdeganStory = {
  id: "aktivitas-alat",
  judul: "Aktivitas 2: alat dan langkah 1 sampai 3",
  sumber: "Buku Siswa hlm. 66; Panduan Guru hlm. 101",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Beraktivitas",
    "Alat dan Bahan: dua lembar kertas berbentuk persegi/kertas origami, gunting, lem, buku tulis dan pensil warna.",
    "1. Buatlah kelompok beranggotakan 3-4 orang.",
    "2. Lipatlah kertas tersebut menjadi beberapa bagian yang sama (misalkan",
    "menjadi 4 bagian yang sama), kemudian warnailah salah satu kotak",
    "3. Lipatlah kertas kedua menjadi beberapa bagian yang sama (misal dibagi",
    "menjadi 16 bagian yang sama), kemudian warnailah 4 kotak tersebut lalu",
    "Guru membentuk kelompok heterogen (berdasarkan karakteristik dan kemampuan peserta didik)",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Aktivitas 2: Konsep Pecahan Senilai")),
      tambah("lembar", kotak("ka", 30, 44, 72, 72, W.krem, W.biru, { rx: 2 }), teks("kat", 66, 134, "kertas 1", 9), kotak("kb", 198, 44, 72, 72, W.langit, W.biru, { rx: 2 }), teks("kbt", 234, 134, "kertas 2", 9)),
      tambah("gunting,", emo("kg", 150, 72, "✂", 28)),
      tambah("pensil", emo("kp", 150, 112, "🖍", 28)),
      tambah("warna.", ...kartu("kh", 40, 150, 220, 30, W.emas, ["alat: kertas, gunting, lem, pensil"], 9.4)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Langkah 1: buat kelompok")),
      tambah("kelompok", emo("o1", 60, 70, "🙂", 28), emo("o2", 120, 70, "😀", 28), emo("o3", 180, 70, "😊", 28), emo("o4", 240, 70, "🤓", 28)),
      tambah("tiga", ...kartu("ok", 40, 92, 220, 28, W.hijauMuda, ["3 sampai 4 orang per kelompok"], 9.4)),
      tambah("heterogen,", ...kartu("oh", 20, 130, 260, 28, W.langit, ["heterogen: karakter dan kemampuan campur"], 9)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Langkah 2: kertas pertama")),
      tambah("pertama", ...kisi("k1", 114, 36, 36, 36, 2, 2, [], W.arsir, W.putih), teks("k1t", 150, 122, "kertas 1", 9)),
      tambah("empat", teks("k1u", 150, 138, "4 bagian sama", 9.4, W.hijau)),
      ubah("warnai", { id: "k1-c0", warna: W.arsir }),
      tambah("potong.", emo("k1s", 220, 58, "✂", 28), ...kartu("k1w", 60, 152, 180, 30, W.emas, ["1 kotak diwarnai, lalu dipotong"], 9)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Langkah 2 dan 3: dua kertas")),
      tambah("kertas", ...kisi("k1", 30, 36, 36, 36, 2, 2, [0], W.arsir, W.putih), teks("k1t", 66, 124, "kertas 1: 4 bagian", 8.4)),
      tambah("kedua", ...kisi("k2", 190, 36, 18, 18, 4, 4, [], W.arsir, W.putih), teks("k2t", 226, 124, "kertas 2: 16 bagian", 8.4)),
      ubah(idx(SUARA_A4, "warnai"), ...[0, 1, 4, 5].map((i) => ({ id: `k2-c${i}`, warna: W.arsir }))),
      tambah("potong.", emo("k2s", 150, 70, "✂", 28), ...kartu("k2w", 20, 150, 260, 34, W.emas, ["4 kotak kecil diwarnai dari 16 kotak"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Aktivitas 2: langkah 4-6 dan diskusi (Buku Siswa hlm. 66-67; Panduan Guru hlm. 101) ------------------------------ */
const SUARA_H1 = "Langkah empat: bandingkan kedua kertas yang sudah diwarnai. Kertas pertama memberi satu potong berwarna, sedangkan kertas kedua memberi empat potong berwarna yang kecil.";
const SUARA_H2 = "Diskusi a: tuliskan bentuk pecahan gambar satu dan gambar dua. Gambar satu adalah satu per empat, gambar dua adalah empat per enam belas.";
const SUARA_H3 = "Diskusi b: apakah kedua kertas yang telah diwarnai sama besar? Susun empat potong kecil tepat di atas satu potong besar, ternyata keduanya sama besar.";
const SUARA_H4 = "Langkah lima: presentasikan hasil diskusi kelompok di depan kelas, dengan menceritakan cara melipat, mewarnai, dan membandingkan.";
const SUARA_H5 = "Langkah enam: tulis kesimpulan. Menurut panduan guru, satu per empat sama dengan empat per enam belas. Dua pecahan bernilai sama seperti ini kita sebut pecahan senilai.";

const KECIL = [[196, 62], [220, 62], [196, 86], [220, 86]] as const;
const ANAK = ["Putu", "Karel", "Azizah"] as const;

export const ADEGAN_AKTIVITAS_HASIL: AdeganStory = {
  id: "aktivitas-hasil",
  judul: "Aktivitas 2: perbandingan, diskusi, dan kesimpulan",
  sumber: "Buku Siswa hlm. 66–67; Panduan Guru hlm. 101",
  latar: "#ECFDF5",
  kutipan: [
    "4. Selanjutnya, bandingkanlah kedua kertas yang telah diwarnai tersebut.",
    "5. Presentasikan hasil diskusi kelompok di depan kelas",
    "Diskusi :",
    "a. Pada gambar 1 dan gambar 2 tuliskan bentuk pecahannya!",
    "b. Apakah kedua kertas yang telah diwarnai tersebut sama besar?",
    "6. Tulislah kesimpulan yang diperoleh dari hasil percobaan tersebut",
    "guru meminta peserta didik untuk membandingkan kedua kertas yang telah diwarnai",
    "Guru mempersilahkan kelompok untuk mempresentasikan hasil diskusi",
    "Guru menyampaikan kesimpulan dari aktivitas yang dilakukan dengan menyatakan bahwa:",
  ],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Langkah 4: bandingkan potongan")),
      tambah("pertama", kotak("pa", 52, 62, 44, 44, W.arsir, W.biru, { rx: 0 }), teks("pat", 74, 128, "1 potong besar", 8.8)),
      tambah("kedua@2", ...KECIL.map(([x, y], i) => kotak(`pb${i}`, x, y, 22, 22, W.arsir, W.biru, { rx: 0 })), teks("pbt", 218, 128, "4 potong kecil", 8.8)),
      tambah("kecil.", teks("pq", 150, 90, "?", 24, W.merah)),
    ),
    k(
      SUARA_H2,
      tambah("empat", ...pecahan("f1", 74, 156, 1, 4, 13)),
      tambah("belas.", ...pecahan("f2", 218, 156, 4, 16, 13)),
    ),
    k(
      SUARA_H3,
      hapus(0, "pq"),
      ubah("Susun", { id: "pb0", x: 196, y: 62 }, { id: "pb1", x: 218, y: 62 }, { id: "pb2", x: 196, y: 84 }, { id: "pb3", x: 218, y: 84 }),
      tambah("tepat", teks("pe", 148, 92, "=", 24, W.merah)),
      tambah("sama@2", emo("pc", 150, 45, "✅", 24), teks("pcs", 150, 66, "sama besar", 9, W.hijau)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Langkah 5: presentasi")),
      tambah("presentasikan", emo("r1", 150, 66, "🎤", 32)),
      tambah("melipat,", ...kartu("r2", 14, 100, 84, 30, W.hijauMuda, ["melipat"], 9)),
      tambah("mewarnai,", ...kartu("r3", 108, 100, 84, 30, W.krem, ["mewarnai"], 9)),
      tambah("membandingkan.", ...kartu("r4", 202, 100, 84, 30, W.langit, ["membandingkan"], 9)),
      tambah("kelompok", teks("r5", 150, 164, "tiap kelompok bercerita di depan kelas", 8.8, W.coklat)),
    ),
    k(
      SUARA_H5,
      bersih(0),
      tambah(0, judul("Langkah 6: kesimpulan")),
      tambah("empat", ...pecahan("m1", 100, 76, 1, 4, 20), teks("m2", 150, 80, "=", 24, W.merah)),
      tambah("belas.", ...pecahan("m3", 200, 76, 4, 16, 20)),
      tambah("senilai.", ...kartu("m4", 50, 128, 200, 34, W.emas, ["pecahan senilai"], 11)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Mengamati: dua batang coklat (Buku Siswa hlm. 67) ------------------------------ */
const SUARA_C1 = "Ayo Mengamati. Ibu Guru mempunyai dua batang coklat. Coklat pertama dibagi menjadi enam bagian yang sama, dan coklat kedua dibagi menjadi tiga bagian yang sama.";
const SUARA_C2 = "Coklat pertama dibagikan kepada Putu, Karel, dan Azizah dengan bagian yang sama. Enam bagian untuk tiga anak, jadi tiap anak menerima dua bagian.";
const SUARA_C3 = "Coklat kedua juga dibagikan kepada ketiga anak itu dengan bagian yang sama. Tiga bagian untuk tiga anak, jadi tiap anak menerima satu bagian.";
const SUARA_C4 = "Bagian Putu pada pembagian pertama adalah dua per enam, dan pada pembagian kedua satu per tiga. Pertanyaan buku: apakah kedua coklat yang diterima Putu besarnya sama?";

const WARNA_ANAK = [W.jingga, W.hijauMuda, W.pink];
const NAMA_ANAK = ["Putu", "Karel", "Azizah"];

export const ADEGAN_AMATI_COKLAT: AdeganStory = {
  id: "amati-coklat",
  judul: "Ayo Mengamati: dua batang coklat untuk tiga anak",
  sumber: "Buku Siswa hlm. 67; Panduan Guru hlm. 102",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Mengamati",
    "Ibu Guru mempunyai 2 batang coklat. Coklat pertama dibagi menjadi 6 bagian",
    "yang sama. Coklat pertama akan dibagikan kepada Putu, Karel dan Azizah",
    "dengan bagian yang sama. Coklat kedua dibagi menjadi 3 bagian yang sama",
    "serta akan dibagikan kepada Putu, Karel, dan Azizah dengan bagian yang sama.",
    "pada pembagian pertama Putu mendapat",
    "pada pembagian kedua Putu mendapat",
    "Apakah kedua coklat yang diterima Putu besarnya sama?",
    "Guru meminta peserta didik untuk mengamati 2 gambar coklat yang dibagi menjadi 6 bagian dan 3 bagian yang sama.",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Ayo Mengamati: dua batang coklat")),
      tambah("pertama", ...batang("c1", 20, 50, 200, 28, 6, [], W.arsir, W.cok), teks("l1", 262, 68, "6 bagian", 8.6)),
      tambah("kedua", ...batang("c2", 20, 110, 200, 28, 3, [], W.arsir, W.cok), teks("l2", 262, 128, "3 bagian", 8.6)),
      tambah("tiga", emo("ce", 150, 180, "🍫", 24)),
    ),
    k(
      SUARA_C2,
      ...[0, 1, 2].map((a) => tambah(ANAK[a], teks(`n1${a}`, 53.3 + a * 66.7, 44, NAMA_ANAK[a], 8.6, W.biru))),
      ...[0, 1, 2].map((a) => warnai(ANAK[a], WARNA_ANAK[a], `c1-c${a * 2}`, `c1-c${a * 2 + 1}`)),
      tambah("tiga", teks("n1x", 120, 100, "6 : 3 = 2 bagian tiap anak", 8.4, W.hijau)),
    ),
    k(
      SUARA_C3,
      hapus(0, "ce"),
      ...[0, 1, 2].map((a) => warnai(["kepada", "anak", "itu"][a], WARNA_ANAK[a], `c2-c${a}`)),
      ...[0, 1, 2].map((a) => tambah(["kepada", "anak", "itu"][a], teks(`n2${a}`, 53.3 + a * 66.7, 154, NAMA_ANAK[a], 8.6, W.biru))),
      tambah("satu", teks("n2x", 120, 176, "3 : 3 = 1 bagian tiap anak", 8.4, W.hijau)),
    ),
    k(
      SUARA_C4,
      hapus(0, "l1", "l2", "n2x", "n1x"),
      sorotkan("Putu", "c1-c0", "c1-c1", "c2-c0"),
      tambah("enam,", ...pecahan("p1", 262, 62, 2, 6, 12)),
      tambah("tiga.", ...pecahan("p2", 262, 122, 1, 3, 12)),
      tambah("sama?", teks("pq", 262, 168, "sama?", 11, W.merah)),
    ),
  ],
};
