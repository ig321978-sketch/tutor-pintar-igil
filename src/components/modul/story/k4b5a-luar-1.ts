import type { AdeganStory } from "./logika-story";
import { W, bentuk, emo, judul, kartu, kotak, panah, sisiGaris, tandaSiku, teks, type NamaBangun } from "./k4b5a-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b5a-bantu";

export const NAMA_METODE = ["van Hiele Level 0-1", "Attribute Sort", "Geoboard", "Property Matrix"];
export const NAMA_METODE_ID = ["van Hiele Visual-Analisis", "Pilah Ciri", "Papan Paku", "Matriks Ciri"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🔍", "🗂", "📌", "📊"];

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana cara mengenali bangun datar lewat ciri-cirinya? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai bangun dari buku.";
const SUARA_O2 = "Empat metode itu: van Hiele Level nol dan satu, Attribute Sort, Geoboard, dan Property Matrix.";
const SUARA_O3 = "Semuanya menjawab pertanyaan yang sama dengan cara berbeda: mengamati bentuk lalu ciri, memilah dengan pertanyaan ya atau tidak, membuat bangun dengan karet, dan membandingkan dalam tabel.";
const SUARA_O4 = "Bangunnya dari buku: segitiga menurut sisinya dan sudutnya, lalu jajargenjang, persegi panjang, belah ketupat, persegi, layang-layang, trapesium, dan segiempat sembarang.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk ciri bangun datar",
  sumber: "Metode luar: pembuka; bangun Buku Siswa hlm. 147–165",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("mengenali", bentuk("p1", 22, 44, "sama-sisi", W.hijauMuda), bentuk("p2", 88, 46, "persegi", W.langit), bentuk("p3", 148, 38, "layang", W.krem, 0.9), bentuk("p4", 212, 50, "trapesium", W.pink)),
      tambah("berbagai", emo("gl", 150, 142, "🌍", 40)),
      tambah("empat", ...kartu("pk", 60, 160, 180, 28, W.emas, ["4 metode dari luar"], 9.4)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["van", "Attribute", "Geoboard,", "Property"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("mengamati", emo("i1", 45, 80, IKON_METODE[0], 34), teks("i1t", 45, 112, "mengamati", 8.4, W.biru)),
      tambah("memilah", emo("i2", 112, 80, IKON_METODE[1], 34), teks("i2t", 112, 112, "memilah", 8.4, W.biru)),
      tambah("membuat", emo("i3", 188, 80, IKON_METODE[2], 34), teks("i3t", 188, 112, "membuat", 8.4, W.biru)),
      tambah("membandingkan", emo("i4", 258, 80, IKON_METODE[3], 34), teks("i4t", 258, 112, "banding", 8.4, W.biru)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Bangun dari buku")),
      tambah("sisinya", ...kartu("a1", 14, 34, 272, 30, W.hijauMuda, ["segitiga menurut sisinya"], 9)),
      tambah("sudutnya,", ...kartu("a2", 14, 72, 272, 30, W.langit, ["segitiga menurut sudutnya"], 9)),
      tambah("jajargenjang,", ...kartu("a3", 14, 110, 272, 30, W.krem, ["jajargenjang, persegi panjang, belah ketupat, persegi"], 8.2)),
      tambah("layang-layang,", ...kartu("a4", 14, 148, 272, 30, W.pink, ["layang-layang, trapesium, segiempat sembarang"], 8.4)),
    ),
  ],
};

/* ------------------------------ 2. van Hiele Level 0-1: konsep ------------------------------ */
const SUARA_V1 = "Metode pertama, van Hiele Level nol dan satu, atau van Hiele Visual-Analisis. Ahli geometri van Hiele menjelaskan bahwa anak belajar bentuk dalam tahap. Tahap nol adalah visual: bangun dikenali dari tampak keseluruhannya.";
const SUARA_V2 = "Contohnya anak berkata, ini pintu, atau ini atap. Itu benar, tetapi anak belum menyebut ciri. Bentuk dikenali, sifatnya belum disebut.";
const SUARA_V3 = "Tahap satu adalah analisis: anak mulai menyebut ciri. Persegi panjang punya empat sisi, empat sudut siku-siku, dan sisi berhadapan sejajar. Kini bentuk dikenali lewat cirinya.";
const SUARA_V4 = "Guru menaikkan tahap dengan pertanyaan: kenapa kamu bilang itu persegi panjang? Jawaban berupa ciri berarti anak sudah berada di tahap analisis.";

export const ADEGAN_LUAR_VH: AdeganStory = {
  id: "luar-vh",
  judul: "van Hiele Level 0-1: dari bentuk ke ciri",
  sumber: "Metode luar: van Hiele Level 0-1",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("van Hiele Level 0-1")),
      tambah("pertama,", ...kartu("v1", 20, 30, 260, 28, W.hijauMuda, ["van Hiele Level 0-1"], 10.4)),
      tambah(idx(SUARA_V1, "Visual-Analisis"), ...kartu("v2", 20, 64, 260, 24, W.krem, ["van Hiele Visual-Analisis"], 9)),
      tambah(idx(SUARA_V1, "tahap"), ...kartu("v3", 150, 100, 130, 80, W.langit, ["tahap 1", "analisis"], 9.4)),
      tambah(idx(SUARA_V1, "nol", 2), ...kartu("v4", 20, 130, 120, 50, W.pink, ["tahap 0", "visual"], 9.4)),
    ),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Tahap 0: visual")),
      tambah("pintu,", bentuk("w1", 40, 48, "perpanjang", W.krem, 1.1), teks("w1t", 70, 110, "ini pintu!", 9.4, W.biru)),
      tambah("atap.", bentuk("w2", 190, 46, "sama-kaki", W.merahMuda, 1.1), teks("w2t", 218, 110, "ini atap!", 9.4, W.biru)),
      tambah("ciri.", ...kartu("w3", 30, 128, 240, 28, W.emas, ["benar, tapi belum menyebut ciri"], 8.6)),
      tambah("sifatnya", teks("w4", 150, 180, "bentuk dikenali, sifat belum", 8.6, W.coklat)),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Tahap 1: analisis")),
      tambah("Persegi", bentuk("x1", 24, 46, "perpanjang", W.krem, 1.4)),
      tambah(idx(SUARA_V3, "empat"), ...kartu("x2", 150, 38, 140, 24, W.hijauMuda, ["4 sisi"], 9)),
      tambah("siku-siku,", ...sikuEmpat1("xs", 24, 46, 78.4, 50.4), ...kartu("x3", 150, 68, 140, 24, W.langit, ["4 sudut siku-siku"], 9)),
      tambah("sejajar.", ...kartu("x4", 150, 98, 140, 24, W.pink, ["sisi berhadapan sejajar"], 8.6)),
      tambah("Kini", teks("x5", 150, 160, "bentuk dikenali lewat cirinya", 9, W.coklat)),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Naik dari tahap 0 ke 1")),
      tambah("Guru", ...kartu("y0", 20, 120, 110, 50, W.pink, ["tahap 0", "visual"], 9.4)),
      tambah("pertanyaan:", ...kartu("yq", 20, 34, 260, 34, W.emas, ["kenapa itu persegi panjang?"], 9.4)),
      tambah("Jawaban", panah("ya", 134, 146, 30, -12, W.hijau, 2.4)),
      tambah("ciri", ...kartu("y1", 170, 90, 110, 60, W.hijauMuda, ["tahap 1", "analisis"], 9.4)),
      tambah("analisis.", teks("yb", 225, 172, "jawaban = ciri", 8.6, W.hijau)),
    ),
  ],
};
/** Empat tanda siku di sudut persegi panjang (x, y, w, h). */
function sikuEmpat1(id: string, x: number, y: number, w: number, h: number) {
  return [
    tandaSiku(`${id}0`, x, y, [1, 0], [0, 1], 7),
    tandaSiku(`${id}1`, x + w, y, [-1, 0], [0, 1], 7),
    tandaSiku(`${id}2`, x + w, y + h, [-1, 0], [0, -1], 7),
    tandaSiku(`${id}3`, x, y + h, [1, 0], [0, -1], 7),
  ];
}

/* ------------------------------ 3. van Hiele Level 0-1: penerapan pada persegi panjang ABCD (Buku Siswa hlm. 159) ------------------------------ */
const SUARA_W1 = "Terapkan pada persegi panjang ABCD di Buku Siswa. Tahap visual: anak melihat bangunnya seperti daun pintu dan menyebutnya persegi panjang.";
const SUARA_W2 = "Tahap analisis: anak menghitung. Ada empat sisi dan empat titik sudut. AB sejajar CD, dan BC sejajar AD, jadi ada dua pasang sisi sejajar.";
const SUARA_W3 = "Anak juga memeriksa sudutnya dengan busur: sudut A, B, C, dan D sama besar, dan semuanya siku-siku, yaitu sembilan puluh derajat.";
const SUARA_W4 = "Naik lagi: anak membandingkan dengan jajargenjang. Jajargenjang juga punya dua pasang sisi sejajar, tetapi sudutnya tidak siku-siku. Ciri tambahan itu yang membedakan persegi panjang.";

export const ADEGAN_LUAR_VH_TERAPAN: AdeganStory = {
  id: "luar-vh-terapan",
  judul: "van Hiele Level 0-1 pada persegi panjang ABCD",
  sumber: "Metode luar: van Hiele Level 0-1; Buku Siswa hlm. 159",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Persegi panjang ABCD")),
      tambah("persegi", bentuk("r", 30, 50, "perpanjang", W.krem, 1.6), teks("rD", 22, 46, "D", 9.4, W.merah), teks("rC", 130, 46, "C", 9.4, W.merah), teks("rB", 130, 118, "B", 9.4, W.merah), teks("rA", 22, 118, "A", 9.4, W.merah)),
      tambah("visual:", ...kartu("t0", 156, 40, 136, 40, W.pink, ["tahap 0 (visual)", "seperti daun pintu"], 8.4)),
      sorotkan(idx(SUARA_W1, "pintu"), "r@perpanjang"),
    ),
    k(
      SUARA_W2,
      tambah("analisis:", ...kartu("t1", 156, 88, 136, 26, W.hijauMuda, ["tahap 1 (analisis)"], 8.4)),
      tambah(idx(SUARA_W2, "empat"), teks("c1", 224, 130, "4 sisi, 4 titik sudut", 8.2, W.biru)),
      tambah(idx(SUARA_W2, "AB"), sisiGaris("r0", 30, 50, "perpanjang", 0, W.merah, 1.6), sisiGaris("r2", 30, 50, "perpanjang", 2, W.merah, 1.6)),
      tambah(idx(SUARA_W2, "BC"), sisiGaris("r1", 30, 50, "perpanjang", 1, W.hijau, 1.6), sisiGaris("r3", 30, 50, "perpanjang", 3, W.hijau, 1.6), teks("c2", 224, 146, "2 pasang sejajar", 8.2, W.biru)),
    ),
    k(
      SUARA_W3,
      tambah("sudutnya", ...sikuEmpat1("rs", 30, 50, 89.6, 57.6)),
      tambah("sembilan", teks("c3", 224, 162, "tiap sudut 90°", 8.2, W.merah)),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, judul("Pembeda: sudut siku-siku")),
      tambah("jajargenjang.", bentuk("zb", 176, 52, "jajar", W.pink, 1.2), teks("zbt", 211, 116, "jajargenjang", 8.6, W.biru)),
      tambah("Naik", bentuk("za", 20, 54, "perpanjang", W.krem, 1.1), teks("zat", 52, 116, "persegi panjang", 8.6, W.biru)),
      tambah("dua", ...kartu("zk", 40, 130, 220, 24, W.hijauMuda, ["sama: 2 pasang sisi sejajar"], 8.6)),
      tambah("tidak", ...kartu("zm", 40, 160, 220, 24, W.merahMuda, ["beda: sudut siku-siku"], 8.6), ...sikuEmpat1("zs", 20, 54, 61.6, 39.6)),
    ),
  ],
};

/* ------------------------------ 4. Attribute Sort: konsep ------------------------------ */
const SUARA_P1 = "Metode kedua, Attribute Sort, atau Pilah Ciri. Bangun dipilah ke dua kotak dengan satu pertanyaan ya atau tidak, misalnya, apakah semua sisinya sama panjang?";
const SUARA_P2 = "Langkahnya: pilih satu ciri, ajukan sebagai pertanyaan, lalu tiap bangun masuk ke kotak ya atau kotak tidak.";
const SUARA_P3 = "Satu pertanyaan hanya membagi satu cara. Pertanyaan baru bisa memilah lagi isi tiap kotak, sampai setiap bangun punya ciri sendiri.";
const SUARA_P4 = "Kelebihannya, anak harus menyebut ciri dengan tepat, sebab kotak ya hanya menerima bangun yang punya ciri itu.";

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Attribute Sort: pilah dengan pertanyaan ya atau tidak",
  sumber: "Metode luar: Attribute Sort",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Attribute Sort")),
      tambah("kedua,", ...kartu("q1", 30, 30, 240, 28, W.langit, ["Attribute Sort"], 10.4)),
      tambah(idx(SUARA_P1, "Pilah"), ...kartu("q2", 30, 64, 240, 24, W.krem, ["Pilah Ciri"], 9)),
      tambah("pertanyaan", emo("q3", 70, 130, "🗂", 40)),
      tambah("apakah", ...kartu("q4", 110, 108, 180, 50, W.emas, ["apakah semua sisinya", "sama panjang?"], 9)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Langkah memilah")),
      tambah("pilih", ...kartu("l1", 60, 28, 180, 24, W.emas, ["ciri: sisi sama panjang?"], 8.6)),
      tambah("kotak", kotak("ky", 10, 62, 130, 100, W.hijauMuda, W.hijau, { rx: 8 }), teks("kyt", 75, 78, "ya", 10.4, W.hijau), kotak("kt", 160, 62, 130, 100, W.merahMuda, W.merah, { rx: 8 }), teks("ktt", 225, 78, "tidak", 10.4, W.merah)),
      tambah(idx(SUARA_P2, "ya"), bentuk("b1", 24, 94, "persegi", W.hijauMuda, 0.9), bentuk("b2", 80, 96, "belah", W.hijauMuda, 0.9)),
      tambah(idx(SUARA_P2, "tidak"), bentuk("b3", 174, 100, "jajar", W.merahMuda, 0.9), bentuk("b4", 236, 100, "trapesium", W.merahMuda, 0.8)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Pertanyaan berikutnya")),
      tambah("membagi", kotak("ky", 10, 36, 130, 120, W.hijauMuda, W.hijau, { rx: 8 }), teks("kyt", 75, 52, "ya: sisi sama", 9.4, W.hijau)),
      tambah("Pertanyaan@2", ...kartu("q5", 150, 44, 140, 40, W.emas, ["siku-siku", "keempat sudutnya?"], 8.6)),
      tambah("tiap", kotak("k2", 18, 96, 56, 52, W.putih, W.hijau, { rx: 6 }), teks("k2t", 46, 108, "ya", 8.6, W.hijau), bentuk("c1", 28, 114, "persegi", W.hijauMuda, 0.6)),
      tambah("setiap", kotak("k3", 80, 96, 56, 52, W.putih, W.merah, { rx: 6 }), teks("k3t", 108, 108, "tidak", 8.6, W.merah), bentuk("c2", 88, 118, "belah", W.krem, 0.6)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Kelebihan Pilah Ciri")),
      tambah("menyebut", ...kartu("e1", 20, 34, 260, 34, W.hijauMuda, ["anak menyebut ciri dengan tepat"], 8.6)),
      tambah("kotak", ...kartu("e2", 20, 78, 260, 34, W.langit, ["kotak ya hanya menerima ciri itu"], 8.6)),
      sorotkan("tepat,", "e1-k"),
      tambah("itu.", ...kartu("e3", 20, 124, 260, 34, W.emas, ["ciri jelas, bangun terpilah benar"], 8.6)),
    ),
  ],
};

/* ------------------------------ 5. Attribute Sort: penerapan pada tujuh segiempat buku (Buku Siswa hlm. 163–164) ------------------------------ */
export const TUJUH_SEGIEMPAT: NamaBangun[] = ["jajar", "perpanjang", "belah", "persegi", "layang", "trapesium", "segiempat"];
const SKALA7 = [0.5, 0.5, 0.55, 0.55, 0.5, 0.5, 0.5];
const POSISI7: [number, number][] = [[10, 54], [52, 56], [94, 52], [140, 54], [176, 50], [208, 56], [252, 54]];
const bangun7 = (id: string) => TUJUH_SEGIEMPAT.map((n, i) => bentuk(`${id}${i}`, POSISI7[i][0], POSISI7[i][1], n, [W.pink, W.langit, W.krem, W.hijauMuda, W.jingga, W.lavender, W.merahMuda][i], SKALA7[i]));
const SUARA_Q1 = "Terapkan pada tujuh segiempat dari buku. Pertanyaan pertama: apakah keempat sisinya sama panjang?";
const SUARA_Q2 = "Jawaban ya hanya untuk belah ketupat dan persegi. Lima bangun lainnya masuk ke kotak tidak.";
const SUARA_Q3 = "Pertanyaan kedua untuk kotak ya: apakah keempat sudutnya siku-siku? Persegi ya, belah ketupat tidak.";
const SUARA_Q4 = "Dari dua pertanyaan, persegi punya dua ciri: sisi sama panjang dan sudut siku-siku. Belah ketupat hanya punya yang pertama, jadi persegi lebih khusus.";

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Attribute Sort pada tujuh segiempat",
  sumber: "Metode luar: Attribute Sort; Buku Siswa hlm. 163–164",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Tujuh segiempat dari buku")),
      tambah("segiempat", ...bangun7("s")),
      tambah("Pertanyaan", ...kartu("qa", 30, 120, 240, 40, W.emas, ["apakah keempat sisinya", "sama panjang?"], 9)),
    ),
    k(
      SUARA_Q2,
      bersih(0),
      tambah(0, judul("Pertanyaan 1: sisi sama panjang?")),
      tambah("Jawaban", kotak("ky", 8, 34, 100, 96, W.hijauMuda, W.hijau, { rx: 8 }), teks("kyt", 58, 48, "ya", 9.4, W.hijau), kotak("kt", 114, 34, 178, 96, W.merahMuda, W.merah, { rx: 8 }), teks("ktt", 203, 48, "tidak", 9.4, W.merah)),
      tambah("belah", bentuk("y1", 14, 66, "belah", W.krem, 0.7), bentuk("y2", 62, 68, "persegi", W.hijauMuda, 0.7)),
      tambah("Lima", bentuk("n1", 120, 72, "jajar", W.pink, 0.55), bentuk("n2", 156, 72, "perpanjang", W.langit, 0.5), bentuk("n3", 190, 62, "layang", W.jingga, 0.5), bentuk("n4", 220, 74, "trapesium", W.lavender, 0.5), bentuk("n5", 256, 70, "segiempat", W.merahMuda, 0.5)),
      tambah("tidak", teks("nn", 203, 118, "5 bangun lain", 8.2, W.merah), teks("ny", 58, 118, "2 bangun", 8.2, W.hijau)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Pertanyaan 2: sudut siku-siku?")),
      tambah("kedua", ...kartu("p2", 20, 28, 260, 26, W.emas, ["pada kotak ya: 4 sudut siku-siku?"], 8.6)),
      tambah(idx(SUARA_Q3, "Persegi"), kotak("a1", 30, 66, 100, 84, W.hijauMuda, W.hijau, { rx: 8 }), teks("a1t", 80, 82, "ya", 9.4, W.hijau), bentuk("a2", 62, 96, "persegi", W.hijauMuda, 0.9), teks("a3", 80, 140, "persegi", 8.2, W.biru)),
      tambah(idx(SUARA_Q3, "belah"), kotak("c1", 170, 66, 100, 84, W.merahMuda, W.merah, { rx: 8 }), teks("c1t", 220, 82, "tidak", 9.4, W.merah), bentuk("c2", 196, 96, "belah", W.krem, 0.9), teks("c3", 220, 140, "belah ketupat", 8.2, W.biru)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Persegi lebih khusus")),
      tambah("persegi", ...kartu("d1", 14, 34, 130, 60, W.hijauMuda, ["persegi", "2 ciri"], 9.4)),
      tambah("sisi", teks("d2", 79, 112, "sisi sama panjang", 8.2, W.biru), teks("d3", 79, 126, "sudut siku-siku", 8.2, W.biru)),
      tambah("Belah", ...kartu("d4", 156, 34, 130, 60, W.krem, ["belah ketupat", "1 ciri"], 9.4), teks("d5", 221, 112, "sisi sama panjang", 8.2, W.biru)),
      tambah("khusus.", ...kartu("d6", 40, 148, 220, 30, W.emas, ["persegi lebih khusus"], 9.4)),
    ),
  ],
};
