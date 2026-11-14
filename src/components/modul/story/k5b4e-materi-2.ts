import type { AdeganStory, Obj } from "./logika-story";
import { KOMANG_RECT, TITIK_EKSTRA, TITIK_DENAH, W, denahBingkai, denahHuruf, denahRuang, denahSisi, denahTepi, kartu, kotak, layar, teks, judul } from "./k5b4e-gambar";
import { bersih, hapus, k, tambah } from "./k5b4e-bantu";

/** Denah di sisi kiri kanvas: pojok kiri-atas (22, 36), 11 piksel per meter. */
const OX = 22;
const OY = 36;
const S = 11;
/** Pusat panel teks di sisi kanan. */
const PX = 234;

const ruang = (id: string, kode?: string[]): Obj[] => denahRuang(id, OX, OY, S, kode);
const tepi = (id: string, warna: string = W.merah): Obj => denahTepi(id, OX, OY, S, warna, 2.2, { z: 5 });
const sisi = (id: string, n: string, warna: string = W.merah): Obj => denahSisi(id, OX, OY, S, n, warna, 3.6, { z: 6 });
/** Huruf titik (denah atau titik bantu) di dekat titik meter, digeser (dx, dy) piksel. */
const huruf = (id: string, h: string, dx: number, dy: number, warna: string = W.merah): Obj => {
  const [x, y] = layar(OX, OY, S, TITIK_DENAH[h] ?? TITIK_EKSTRA[h]);
  return teks(id, x + dx, y + dy + 2, h, 7, warna);
};
/** Kotak dari rentang meter [x1, y1, x2, y2] (y ke atas). */
const rect = (id: string, [x1, y1, x2, y2]: [number, number, number, number], warna: string, tepiW: string, o: Partial<Obj> = {}): Obj => {
  const [x, y] = layar(OX, OY, S, [x1, y2]);
  return kotak(id, x, y, (x2 - x1) * S, (y2 - y1) * S, warna, tepiW, { rx: 0, tebal: 2.4, ...o });
};
/** Satu baris teks panel dengan nomor baris (0 mulai atas). */
const baris = (id: string, i: number, isi: string, u = 9.6, warna: string = W.biru): Obj => teks(id, PX, 58 + i * 17, isi, u, warna);

/* ------------------------------ 5. Mencari sisi yang belum diketahui (Buku Siswa hlm. 127; Panduan Guru hlm. 164) ------------------------------ */
export const ADEGAN_SISI_HILANG: AdeganStory = {
  id: "sisi-hilang",
  judul: "Cara Asep: mencari sisi yang belum diketahui",
  sumber: "Buku Siswa hlm. 127; Panduan Guru hlm. 164–165",
  latar: "#FFFBEB",
  kutipan: [
    "Perhatikan persegi panjang",
    "AOPN.",
    "AB = AO – …",
    "Karena BO = CD, maka",
    "= 8 – … = … .",
    "Apakah AB = MN? … .",
    "Maka, MN = … m.",
    "JD = … + … + …",
    "JD = JI + IE + ED",
    "Apakah IE = HF? … .",
    "Selanjutnya, perhatikan jarak",
    "titik J hingga D dan jarak titik I",
    "hingga E.",
  ],
  ketukan: [
    k(
      "Mulai dari A B. Perhatikan persegi panjang A O P N. Panjang A O adalah delapan meter, yaitu lebar ruang keluarga.",
      tambah(0, judul("Mencari A B")),
      tambah(0, ...ruang("sh"), tepi("sht", W.biru)),
      tambah("persegi", rect("rao", [-2, 4, 6, 8], "none", W.merah, { tebal: 3, z: 6 })),
      tambah("Panjang", huruf("hA", "A", -6, 6), huruf("hO", "O", 7, 6), huruf("hP", "P", 7, -4), huruf("hN", "N", -6, -4), baris("p1", 0, "AO = 8 m", 10, W.merah)),
    ),
    k(
      "Karena B O sama dengan C D, yaitu enam meter, maka A B sama dengan A O dikurangi C D. Delapan dikurangi enam, jadi dua meter.",
      tambah("Karena", sisi("sAB", "AB", W.hijau), baris("p2", 1, "BO = CD = 6 m")),
      tambah("maka", baris("p3", 2, "AB = AO − CD")),
      tambah("Delapan", baris("p4", 3, "8 − 6 = 2")),
      tambah("jadi", baris("p5", 4, "AB = 2 m", 11, W.hijau)),
    ),
    k(
      "Perhatikan A B dan M N pada persegi panjang A B M N. Keduanya sisi yang berhadapan, jadi sama panjang. Maka M N juga dua meter.",
      hapus(0, "rao", "p1", "p2", "p3", "p4", "p5", "hO", "hP"),
      tambah("persegi", rect("rab", [-2, 4, 0, 8], W.hijauMuda, W.hijau, { z: 2, op: 0.8 }), huruf("hB", "B", 6, 6)),
      tambah("Keduanya", baris("q1", 1, "AB = MN", 10.5)),
      tambah("Jadi", sisi("sMN", "MN", W.hijau), baris("q2", 2, "MN = 2 m", 11, W.hijau)),
    ),
    k(
      "Selanjutnya, jarak dari titik J ke titik D. J D sama dengan J P ditambah P O ditambah O D, yaitu empat, empat, empat, jadi dua belas meter.",
      hapus(0, "rab", "q1", "q2", "hA", "hN", "hB", "sAB", "sMN"),
      tambah("Selanjutnya,", huruf("hJ", "J", 6, -3), huruf("hDD", "D", 6, 8), huruf("hP2", "P", 7, 0), huruf("hO2", "O", 7, 0)),
      tambah("sama", sisi("sJD", "JD", W.ungu)),
      tambah("yaitu", baris("r1", 1, "JP + PO + OD"), baris("r2", 2, "4 + 4 + 4 = 12")),
      tambah("jadi", baris("r3", 3, "JD = 12 m", 11, W.ungu)),
    ),
    k(
      "J D juga sama dengan J I ditambah I E ditambah E D. I E sama dengan H F, sisi berhadapan, yaitu H G ditambah G F, empat ditambah empat, jadi delapan meter.",
      hapus(0, "r1", "r2", "r3", "hP2", "hO2", "hJ", "hDD"),
      tambah("juga", baris("t1", 1, "JD = JI + IE + ED", 9.2)),
      tambah("ditambah", sisi("sIE", "IE", W.hijau), sisi("sHF", "HF", W.biru), huruf("hI", "I", -6, 0), huruf("hE", "E", -6, 6), huruf("hH", "H", 7, -2), huruf("hF", "F", 7, 6)),
      tambah("sama@2", baris("t2", 2, "IE = HF = HG + GF")),
      tambah("empat", baris("t3", 3, "4 + 4 = 8")),
      tambah("jadi", baris("t4", 4, "IE = 8 m", 11, W.hijau)),
    ),
    k(
      "Karena J D dua belas dan I E delapan, J I ditambah E D sama dengan dua belas dikurangi delapan, yaitu empat meter. Dari gambar, masing-masing kira-kira dua meter.",
      hapus(0, "t1", "t2", "t3", "t4"),
      tambah("Karena", baris("u1", 1, "JI + ED = 12 − 8")),
      tambah("yaitu", baris("u2", 2, "JI + ED = 4 m", 11, W.merah)),
      tambah("kira-kira", baris("u3", 3, "tiap sisi ± 2 m", 8.6, W.coklat), baris("u4", 4, "(dari gambar)", 8.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 6. Menjumlahkan keliling (Buku Siswa hlm. 128; Panduan Guru hlm. 165) ------------------------------ */
export const ADEGAN_JUMLAH_ASEP: AdeganStory = {
  id: "jumlah-asep",
  judul: "Cara Asep: menjumlahkan semua sisi terluar",
  sumber: "Buku Siswa hlm. 128; Panduan Guru hlm. 165",
  latar: "#F0FDF4",
  kutipan: [
    "Semua panjang sisi yang Asep",
    "dibutuhkan sudah diketahui,",
    "maka,",
    "keliling denah =",
    "AB + BC + CD + DE + EF + FG + GH + HI + IJ + JK + KL + LM + MN",
    "+ NA",
    "AB + BC + CD + (JI + DE) + EF +",
    "FG + GH + HI + JK + KL + LM +",
    "MN + NA",
    "Dengan demikian diperoleh",
    "kelilingnya … m.",
  ],
  ketukan: [
    k(
      "Semua panjang sisi sudah diketahui. Keliling denah adalah A B ditambah B C ditambah C D, dan seterusnya sampai N A, empat belas sisi.",
      tambah(0, judul("Menjumlahkan sisi terluar")),
      tambah(0, ...ruang("jm"), tepi("jmt")),
      tambah("Keliling", ...denahHuruf("jh", OX, OY, S)),
      tambah("empat", teks("j14", PX, 100, "14 sisi", 12, W.merah), teks("j14b", PX, 116, "satu putaran", 9, W.merah)),
    ),
    k(
      "Sisi J I dan D E tidak diketahui sendiri-sendiri, jadi dikelompokkan: J I ditambah D E, yaitu empat meter. Maka tersisa tiga belas suku.",
      tambah("Sisi", sisi("jIJ", "IJ", W.ungu), sisi("jDE", "DE", W.ungu)),
      tambah("dikelompokkan", teks("j4", PX, 150, "JI + DE = 4 m", 9.6, W.ungu)),
      tambah("tiga", teks("j13", PX, 168, "13 suku", 10, W.merah)),
    ),
    k(
      "Tulis panjangnya berurutan. Tujuh suku pertama berjumlah dua puluh delapan, dan enam suku sisanya berjumlah dua puluh.",
      bersih(0),
      tambah(0, judul("Tulis semua panjangnya")),
      tambah("Tulis", teks("n1", 150, 70, "2 + 4 + 6 + 4 + 4 + 4 + 4 = 28", 13, W.biru), teks("n1a", 150, 86, "AB, BC, CD, (JI + DE), EF, FG, GH", 7.6, W.coklat)),
      tambah("enam", teks("n2", 150, 120, "4 + 2 + 4 + 4 + 2 + 4 = 20", 13, W.biru), teks("n2a", 150, 136, "HI, JK, KL, LM, MN, NA", 7.6, W.coklat)),
    ),
    k(
      "Jumlahnya empat puluh delapan. Jadi keliling dinding denah rumah adalah empat puluh delapan meter.",
      tambah("Jumlahnya", teks("n3", 150, 168, "28 + 20 = 48", 15, W.hijau)),
      tambah("keliling", ...kartu("n4", 100, 178, 100, 20, W.hijauMuda, ["keliling denah = 48 m"], 9)),
    ),
  ],
};

/* ------------------------------ 7. Cara Komang dan perbandingan (Buku Siswa hlm. 126 sampai 128; Panduan Guru hlm. 164 sampai 165) ------------------------------ */
const komang = (id: string, kode: string, warna: string): Obj => {
  const [x1, y1, x2, y2] = KOMANG_RECT[kode];
  const [x, y] = layar(OX, OY, S, [x1, y2]);
  return kotak(id, x, y, (x2 - x1) * S, (y2 - y1) * S, warna, W.biru, { rx: 0, tebal: 1.2, z: 1 });
};
const kelompok = (awalan: string, nama: string[], warna: string): Obj[] => nama.map((n) => sisi(`${awalan}${n}`, n, warna));

export const ADEGAN_KOMANG: AdeganStory = {
  id: "cara-komang",
  judul: "Cara Komang: persegi besar yang melingkupi denah",
  sumber: "Buku Siswa hlm. 126–128; Panduan Guru hlm. 164–165",
  latar: "#EFF6FF",
  kutipan: [
    "Aku hanya",
    "membagi denah",
    "menjadi 3 persegi",
    "panjang. Setelah",
    "itu, aku membuat",
    "persegi besar yang melingkupi",
    "semua persegi panjang yang",
    "ada dan mencari kesamaan",
    "ukuran-ukurannya.",
    "Pertama, carilah ruas garis",
    "yang sama panjang antara",
    "sisi-sisi persegi panjang dan",
    "persegi terluar.",
    "Sisi-sisi mendatar atas",
    "Sisi-sisi mendatar bagian bawah",
    "Sisi-sisi vertikal kiri",
    "Sisi-sisi vertikal kanan",
    "keliling denah = keliling persegi",
    "Di akhir eksplorasi, guru perlu memberikan penguatan kembali tentang",
    "cara menghitung keliling bangun gabungan beraturan serta memastikan",
    "pemahaman peserta didik melalui kegiatan tanya jawab.",
  ],
  ketukan: [
    k(
      "Cara Komang berbeda. Komang membagi denah menjadi tiga persegi panjang, lalu membuat persegi besar yang melingkupi semua persegi panjang itu.",
      tambah(0, judul("Cara Komang")),
      tambah("tiga", komang("kk", "kiri", W.hijauMuda), komang("kt", "tengah", W.jingga), komang("kn", "kanan", W.langit)),
      tambah("persegi@2", denahBingkai("bk", OX, OY, S, W.hijau, { z: 7 })),
      tambah("semua", teks("pb", PX, 90, "persegi besar", 10, W.hijau), teks("pb2", PX, 106, "12 m × 12 m", 10, W.hijau)),
    ),
    k(
      "Pertama, cari ruas garis yang sama panjang antara sisi denah dan persegi terluar. Sisi mendatar atas berjumlah dua, empat, dua, dan empat, yaitu dua belas, sama dengan sisi atas persegi besar.",
      hapus(0, "pb", "pb2"),
      tambah("Sisi", ...kelompok("at", ["MN", "KL", "JK", "HI"], W.biru)),
      tambah("berjumlah", teks("g1", PX, 70, "atas", 9, W.biru), teks("g1a", PX, 88, "2 + 4 + 2 + 4 = 12", 10, W.biru)),
      tambah("sama@2", teks("g1b", PX, 104, "sisi atas persegi besar", 7.8, W.hijau)),
    ),
    k(
      "Sisi-sisi mendatar bagian bawah juga begitu: dua, enam, dan empat, jumlahnya dua belas, sama dengan sisi bawah persegi besar.",
      tambah("Sisi-sisi", ...kelompok("bw", ["AB", "CD", "EF"], W.ungu)),
      tambah("dua,", teks("g2", PX, 128, "bawah", 9, W.ungu), teks("g2a", PX, 144, "2 + 6 + 4 = 12", 10, W.ungu)),
    ),
    k(
      "Sisi-sisi tegak di kiri berjumlah empat, empat, dan empat, yaitu dua belas. Sisi-sisi tegak di kanan berjumlah dua, empat, empat, dan dua, juga dua belas.",
      tambah("kiri", ...kelompok("kr", ["LM", "NA", "BC"], W.hijau)),
      tambah("kanan", ...kelompok("kn", ["DE", "FG", "GH", "IJ"], W.coklat)),
      tambah("kiri", teks("g3", PX, 166, "kiri: 4 + 4 + 4 = 12", 8.8, W.hijau)),
      tambah("kanan", teks("g4", PX, 182, "kanan: 2 + 4 + 4 + 2 = 12", 8.8, W.coklat)),
    ),
    k(
      "Jadi sisi terluar denah bersesuaian dengan persegi terluar. Keliling denah sama dengan keliling persegi besar, yaitu empat kali dua belas, empat puluh delapan meter.",
      bersih(0),
      tambah(0, judul("Keliling = keliling persegi besar")),
      tambah("bersesuaian", kotak("kb", 90, 44, 120, 120, W.hijauMuda, W.hijau, { rx: 0, tebal: 2.4, putus: true }), teks("kb1", 150, 100, "12 m", 12, W.hijau)),
      tambah("empat@2", teks("kb2", 150, 184, "4 × 12 = 48 m", 15, W.merah)),
    ),
    k(
      "Dua cara, satu hasil: empat puluh delapan meter. Cara Asep menjumlahkan empat belas sisi, cara Komang memakai persegi besar.",
      bersih(0),
      tambah(0, judul("Dua cara, satu hasil")),
      tambah("Asep", ...kartu("v1", 14, 40, 128, 70, W.krem, ["Cara Asep", "14 sisi satu per satu", "48 m"], 9)),
      tambah("Komang", ...kartu("v2", 158, 40, 128, 70, W.langit, ["Cara Komang", "persegi besar 12 × 12", "48 m"], 9)),
      tambah("hasil:", teks("v3", 150, 150, "hasil sama: 48 m", 13, W.hijau)),
    ),
    k(
      "Di akhir eksplorasi, guru menguatkan caranya dan memastikan pemahaman lewat tanya jawab.",
      bersih(0),
      tambah(0, judul("Akhir eksplorasi")),
      tambah("menguatkan", ...kartu("w1", 40, 44, 220, 36, W.hijauMuda, ["kuatkan cara menghitung keliling", "bangun gabungan beraturan"], 8.8)),
      tambah("memastikan", ...kartu("w2", 40, 96, 220, 30, W.krem, ["pastikan lewat tanya jawab"], 9)),
      tambah("tanya", teks("w3", 150, 160, "?  ?  ?", 22, W.merah)),
    ),
  ],
};
