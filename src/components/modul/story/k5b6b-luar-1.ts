import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, kartu, kartuMetode, kertasSiku, kotak, panah, sudut, tanda, tandaSiku, teks } from "./k5b6b-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b6b-bantu";

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luarb-pembuka",
  judul: "Empat metode luar untuk memahami sudut",
  sumber: "Metode luar; empat cara memahami sudut",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk memahami sudut. Metode ini membantu kita memeriksa syarat sudut, menggolongkan jenisnya, memandang sudut sebagai putaran, dan menguji arah letaknya.",
      tambah(0, teks("jud", 150, 26, "Sudut: metode luar", 12.5, W.ungu)),
      tambah("memeriksa", emo("e1", 50, 100, "🔎", 36), teks("t1", 50, 124, "periksa syarat", 8.6, W.merah)),
      tambah("menggolongkan", emo("e2", 120, 100, "📐", 36), teks("t2", 120, 124, "golongkan jenis", 8.6)),
      tambah("putaran,", emo("e3", 190, 100, "🔄", 36), teks("t3", 190, 124, "besar putaran", 8.6, W.hijau)),
      tambah("menguji", emo("e4", 255, 100, "🧭", 36), teks("t4", 255, 124, "uji posisi", 8.6, W.ungu)),
    ),
    k(
      "Pertama, Vertex-Ray Model, yaitu memandang sudut sebagai satu titik sudut dan dua kaki yang keluar dari titik itu.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah(4, kartuMetode("m1", 10, 30, "#FDE68A", ["Vertex-Ray", "Model"], "titik dan dua kaki")),
    ),
    k(
      "Kedua, Acute-Right-Obtuse Classification, yaitu menggolongkan sudut dengan membandingkannya dengan patokan siku-siku.",
      tambah(2, kartuMetode("m2", 156, 30, "#FBCFE8", ["Acute-Right-Obtuse", "Classification"], "bandingkan patokan")),
    ),
    k(
      "Ketiga, Angle as Rotation, sudut sebagai besar putaran. Keempat, Orientation Invariance Test, menguji bahwa jenis sudut tidak berubah ketika letaknya diputar.",
      tambah(2, kartuMetode("m3", 10, 112, "#BBF7D0", ["Angle as", "Rotation"], "sudut sebagai putaran")),
      tambah(10, kartuMetode("m4", 156, 112, "#BFDBFE", ["Orientation", "Invariance Test"], "posisi tidak mengubah")),
    ),
  ],
};

/* ------------------------------ LB1. Vertex-Ray Model: konsep ------------------------------ */
export const ADEGAN_LUAR_VRM: AdeganStory = {
  id: "luarb-vrm",
  judul: "Vertex-Ray Model: satu titik sudut dan dua kaki",
  sumber: "Metode luar; sudut sebagai titik sudut dan dua sinar",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Vertex-Ray Model memandang sudut sebagai satu vertex, yaitu titik sudut, dan dua ray, yaitu kaki sudut, yang keluar dari titik itu.",
      tambah(0, teks("jud", 150, 22, "Vertex-Ray Model", 13, W.ungu)),
      tambah("vertex,@2", ...sudut("v", 70, 150, 8, 45, 150).slice(3), teks("vt", 64, 178, "vertex = titik sudut", 8.6, W.merah)),
      tambah("ray,@2", ...sudut("v", 70, 150, 8, 45, 150).slice(0, 3), teks("vr", 232, 152, "ray = kaki sudut", 8.6, W.ungu)),
    ),
    k(
      "Cara memakainya, ajukan tiga pertanyaan. Satu, adakah satu titik tempat dua garis bertemu? Dua, adakah dua kaki yang keluar dari titik itu? Tiga, apakah pertemuannya runcing, bukan melengkung?",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tiga pertanyaan", 13, W.ungu)),
      tambah("Satu,", ...kartu("p1", 20, 38, 260, 32, W.hijauMuda, ["1. satu titik tempat dua garis bertemu?"], 8.8)),
      tambah("Dua,", ...kartu("p2", 20, 80, 260, 32, W.muda, ["2. dua kaki keluar dari titik itu?"], 8.8)),
      tambah("Tiga,", ...kartu("p3", 20, 122, 260, 32, W.krem, ["3. pertemuan runcing, bukan melengkung?"], 8.8)),
    ),
    k(
      "Kalau ketiganya dijawab ya, bangun itu sudut. Kalau satu saja dijawab tidak, bangun itu bukan sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hasil pemeriksaan", 13, W.ungu)),
      tambah("ketiganya", ...kartu("y1", 16, 44, 128, 60, W.hijauMuda, ["ya, ya, ya", "sudut"], 10), tanda("y1c", 80, 132, true, 28)),
      tambah("satu", ...kartu("y2", 156, 44, 128, 60, W.merahMuda, ["ada yang tidak", "bukan sudut"], 10), tanda("y2c", 220, 132, false, 28)),
    ),
    k(
      "Model ini sejalan dengan pengertian buku: dua garis yang bertemu di satu titik. Titik itu titik sudut dan garisnya kaki sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Sejalan dengan buku", 13, W.ungu)),
      tambah("pengertian", ...kartu("b1", 20, 40, 260, 40, W.krem, ["Sudut: daerah yang dibentuk dua garis", "yang bertemu di satu titik"], 8.4)),
      tambah("titik@3", ...sudut("bv", 70, 162, 15, 50, 80), teks("bvt", 60, 184, "titik sudut", 8.4, W.merah)),
      tambah("kaki", teks("bvk", 190, 160, "kaki sudut", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ LB2. Vertex-Ray Model: penerapan pada benda dari buku ------------------------------ */
const BENDA_V: Array<{ nama: string; ya: [boolean, boolean, boolean] }> = [
  { nama: "pojok kotak pensil", ya: [false, true, false] },
  { nama: "jarum jam pukul 08.00", ya: [true, true, true] },
  { nama: "gunting dibuka", ya: [true, true, true] },
  { nama: "pojokan jendela", ya: [true, true, true] },
];
const KOL_V = [132, 177, 222];
const barisV = (i: number): Obj[] => {
  const y = 52 + i * 34;
  return [
    kotak(`v${i}-k`, 6, y, 288, 28, i % 2 === 0 ? W.putih : W.krem, W.abu, { rx: 4, tebal: 1 }),
    teks(`v${i}-l`, 12, y + 18, BENDA_V[i].nama, 7.8, W.biru, { anchor: "start" }),
  ];
};
const tandaV = (i: number): Obj[] => BENDA_V[i].ya.map((y, j) => tanda(`v${i}c${j}`, KOL_V[j], 52 + i * 34 + 20, y, 14));
const jumlahV = (i: number): Obj => teks(`v${i}j`, 296, 52 + i * 34 + 18, `${BENDA_V[i].ya.filter(Boolean).length} dari 3`, 7.8, BENDA_V[i].ya.every(Boolean) ? W.hijau : W.merah, { anchor: "end" });

export const ADEGAN_LUAR_VRM_TERAPAN: AdeganStory = {
  id: "luarb-vrm-terapan",
  judul: "Vertex-Ray Model diterapkan pada benda dari buku",
  sumber: "Metode luar; penerapan pada Gambar 6.6 dan Soal 1",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Terapkan pada pojok kotak pensil dari buku. Garis pojoknya melengkung, jadi tidak ada satu titik temu yang runcing. Hasilnya bukan sudut, sesuai pendapat Yohana.",
      tambah(0, teks("jud", 150, 22, "Terapan: pemeriksaan benda", 12, W.ungu)),
      tambah("Terapkan", teks("h0", KOL_V[0], 44, "titik temu?", 7, W.ungu), teks("h1", KOL_V[1], 44, "dua kaki?", 7, W.ungu), teks("h2", KOL_V[2], 44, "runcing?", 7, W.ungu)),
      tambah("kotak", ...barisV(0)),
      tambah("melengkung,", ...tandaV(0)),
      tambah("sudut,", jumlahV(0)),
    ),
    k(
      "Sekarang jarum jam pukul delapan. Dua jarum bertemu di pusat jam, jadi ada satu titik temu, dua kaki, dan pertemuan yang runcing. Ketiganya ya.",
      tambah("jarum", ...barisV(1)),
      tambah("pusat", ...tandaV(1)),
      tambah("Ketiganya", jumlahV(1)),
    ),
    k(
      "Gunting dibuka dan pojokan jendela juga lolos ketiga pertanyaan. Engsel gunting adalah titik sudut, dan kedua bilahnya adalah kaki.",
      tambah("gunting", ...barisV(2), ...tandaV(2), jumlahV(2)),
      tambah("jendela", ...barisV(3), ...tandaV(3), jumlahV(3)),
    ),
    k(
      "Hitung centangnya. Kotak pensil hanya satu dari tiga, sedangkan tiga benda lainnya tiga dari tiga. Hanya yang tiga dari tiga yang disebut sudut.",
      sorotkan("Hitung", "v0j", "v1j", "v2j", "v3j"),
      tambah("sudut.", teks("vz", 150, 196, "tiga dari tiga = sudut", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB3. Acute-Right-Obtuse Classification: konsep ------------------------------ */
export const ADEGAN_LUAR_ARO: AdeganStory = {
  id: "luarb-aro",
  judul: "Acute-Right-Obtuse Classification: satu patokan, tiga golongan",
  sumber: "Metode luar; penggolongan sudut dengan patokan siku-siku",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Acute-Right-Obtuse Classification menggolongkan sudut dengan membandingkannya dengan satu patokan, yaitu sudut siku-siku dari lipatan kertas.",
      tambah(0, teks("jud", 150, 22, "Acute-Right-Obtuse", 13, W.ungu)),
      tambah("satu", kertasSiku("pk", 80, 150, 0, 90), tandaSiku("pks", 80, 150, 0, 11)),
      tambah("lipatan", teks("pkt", 235, 120, "patokan: pojok", 10, W.merah), teks("pkt2", 235, 136, "lipatan kertas", 10, W.merah)),
    ),
    k(
      "Ada tiga hasil. Lebih sempit dari patokan disebut acute, atau lancip. Sama besar disebut right, atau siku-siku. Lebih lebar disebut obtuse, atau tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tiga hasil", 13, W.ungu)),
      tambah("sempit", ...sudut("a0", 16, 120, 0, 40, 64), teks("a0t", 48, 156, "acute", 10.4, W.merah), teks("a0u", 48, 170, "= lancip", 8.6, W.biru)),
      tambah("Sama", ...sudut("a1", 112, 120, 0, 90, 64), tandaSiku("a1s", 112, 120, 0, 8), teks("a1t", 144, 156, "right", 10.4, W.merah), teks("a1u", 144, 170, "= siku-siku", 8.6, W.biru)),
      tambah("obtuse,", ...sudut("a2", 226, 120, 20, 120, 54), teks("a2t", 226, 156, "obtuse", 10.4, W.merah), teks("a2u", 226, 170, "= tumpul", 8.6, W.biru)),
    ),
    k(
      "Cara memakainya: letakkan pojok patokan pada titik sudut dan rapatkan satu kaki. Lalu lihat kaki yang lain jatuh di dalam pojok, tepat di tepi pojok, atau di luar pojok.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Cara memakai", 13, W.ungu)),
      tambah("pojok", kertasSiku("cp", 60, 150, 0, 80, { op: 0.7 }), ...sudut("cs", 60, 150, 0, 60, 100)),
      tambah("dalam", teks("c1", 225, 90, "di dalam pojok", 10, W.hijau), teks("c1u", 225, 104, "lancip", 9, W.hijau)),
      tambah("tepi", teks("c2", 225, 122, "tepat di tepi", 10, W.biru), teks("c2u", 225, 136, "siku-siku", 9, W.biru)),
      tambah("luar", teks("c3", 225, 154, "di luar pojok", 10, W.merah), teks("c3u", 225, 168, "tumpul", 9, W.merah)),
    ),
    k(
      "Dengan satu patokan saja, kita bisa menggolongkan sudut apa pun tanpa menebak. Itu sebabnya buku memakai lipatan kertas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Satu patokan", 13, W.ungu)),
      tambah("satu", ...kartu("o1", 100, 40, 100, 34, W.krem, ["1 patokan"], 11)),
      tambah("menggolongkan", panah("o2", 150, 76, 0, 22, W.ungu, 2.4), ...kartu("o3", 40, 104, 220, 34, W.hijauMuda, ["3 golongan sudut"], 11)),
      tambah("tanpa", teks("o4", 150, 170, "tanpa menebak", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ LB4. Acute-Right-Obtuse: penerapan pada enam benda Soal 1 ------------------------------ */
const POSISI_ARO: Record<string, { kol: number; urut: number }> = { b: { kol: 0, urut: 0 }, d: { kol: 0, urut: 1 }, f: { kol: 1, urut: 0 }, a: { kol: 2, urut: 0 }, c: { kol: 2, urut: 1 }, e: { kol: 2, urut: 2 } };
const NAMA_CHIP: Record<string, string> = { a: "a. jam pukul 08.00", b: "b. persimpangan", c: "c. tangga rumah", d: "d. gunting dibuka", e: "e. kipas dibuka", f: "f. pojokan jendela" };
const KOL_X = [8, 104, 200];
const chip = (h: string): Obj[] => {
  const p = POSISI_ARO[h];
  const y = 66 + p.urut * 28;
  return [kotak(`ch${h}-k`, KOL_X[p.kol], y, 92, 22, W.putih, W.biru, { rx: 5, tebal: 1.2 }), teks(`ch${h}-t`, KOL_X[p.kol] + 46, y + 15, NAMA_CHIP[h], 7.6)];
};

export const ADEGAN_LUAR_ARO_TERAPAN: AdeganStory = {
  id: "luarb-aro-terapan",
  judul: "Acute-Right-Obtuse Classification diterapkan pada soal satu",
  sumber: "Metode luar; penerapan pada enam benda Soal 1",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Terapkan pada enam benda soal satu. Pertama, kaki sudut jatuh di luar pojok patokan: jam pukul delapan, tangga rumah, dan kipas dibuka. Ketiganya tumpul.",
      tambah(0, teks("jud", 150, 22, "Terapan: enam benda soal 1", 12, W.ungu)),
      tambah("Terapkan", ...kartu("hl", 8, 34, 92, 24, W.hijauMuda, ["lancip"], 9.4), ...kartu("hs", 104, 34, 92, 24, W.krem, ["siku-siku"], 9.4), ...kartu("ht", 200, 34, 92, 24, W.merahMuda, ["tumpul"], 9.4)),
      tambah("jam", chip("a")),
      tambah("tangga", chip("c")),
      tambah("kipas", chip("e")),
    ),
    k(
      "Kedua, kaki sudut jatuh di dalam pojok patokan: persimpangan jalan dan gunting dibuka. Keduanya lancip.",
      tambah("persimpangan", chip("b")),
      tambah("gunting", chip("d")),
    ),
    k(
      "Ketiga, kaki sudut tepat di tepi pojok patokan: pojokan jendela. Hanya benda ini yang siku-siku.",
      tambah("pojokan", chip("f")),
      sorotkan("Hanya", "chf-k"),
    ),
    k(
      "Hitung hasilnya. Tiga tumpul ditambah dua lancip sama dengan lima, ditambah satu siku-siku sama dengan enam benda. Hasilnya sama dengan kunci buku.",
      ubah(0, { id: "chf-k", sorot: false }),
      tambah("tumpul", teks("s1", 150, 168, "3 + 2 = 5", 14, W.merah)),
      tambah("ditambah@2", teks("s2", 150, 188, "5 + 1 = 6", 14, W.merah)),
      tambah("kunci", tanda("s3", 262, 188, true, 20)),
    ),
  ],
};
