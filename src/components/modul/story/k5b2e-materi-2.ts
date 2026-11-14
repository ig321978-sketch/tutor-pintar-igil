import type { AdeganStory, Obj } from "./logika-story";
import { W, judul, kartu, kotak, pohon, tabel, tangga, teks, type Pohon } from "./k5b2e-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b2e-bantu";

/* ------------------------------ 5. Pohon faktor 196, 300, 270, dan kunci 260 (Buku Siswa hlm. 56, Panduan Guru hlm. 79 sampai 81) ------------------------------ */
export const POHON_196 = tangga(196, [2, 2, 7, 7]);
export const POHON_300 = tangga(300, [2, 2, 3, 5, 5]);
/** Pohon 270 bentuk tangga dan bentuk lain (27 dan 10): Buku Siswa hlm. 56 membolehkan bentuk berbeda asalkan kaidahnya benar. */
export const POHON_270_A = tangga(270, [2, 3, 3, 3, 5]);
export const POHON_270_B: Pohon = { n: 270, a: { n: 27, a: { n: 3 }, b: { n: 9, a: { n: 3 }, b: { n: 3 } } }, b: { n: 10, a: { n: 2 }, b: { n: 5 } } };
/** Kunci Panduan Guru hlm. 81 untuk 260: angka 3 di bawah 130 salah, seharusnya 2 (130 = 2 x 65). */
export const POHON_260_BUKU: Pohon = { n: 260, a: { n: 2 }, b: { n: 130, a: { n: 3 }, b: { n: 65, a: { n: 5 }, b: { n: 13 } } } };
export const POHON_260_BENAR: Pohon = tangga(260, [2, 2, 5, 13]);

const p196 = pohon("p196", POHON_196, 150, 40, 30, 30, 8.5, 8.4, 0.7);
const p300 = pohon("p300", POHON_300, 150, 40, 30, 30, 8.5, 8.4, 0.7);
const p270a = pohon("p270a", POHON_270_A, 75, 40, 24, 26, 7.5, 7.6, 0.7);
const p270b = pohon("p270b", POHON_270_B, 225, 40, 36, 26, 7.5, 7.6, 0.62);
const p260a = pohon("p260a", POHON_260_BUKU, 80, 52, 28, 28, 7.5, 7.6, 0.7);
const p260b = pohon("p260b", POHON_260_BENAR, 220, 52, 28, 28, 7.5, 7.6, 0.7);

export const ADEGAN_POHON: AdeganStory = {
  id: "pohon",
  judul: "Pohon faktor 196, 300, 270, dan kunci 260",
  sumber: "Buku Siswa hlm. 56; Panduan Guru hlm. 79–81",
  latar: "#F0FDF4",
  kutipan: [
    "Faktorisasi prima dari 196 adalah 2 x 2 x 7 x 7",
    "Faktorisasi prima dari 300 adalah 2 x 2 x 3 x 5 x 5",
    "Coba pikirkan cara membuat pohon faktor tersebut.",
    "Selanjutnya, bagaimana bentuk pohon faktor dari 270?",
    "Kalian boleh membuat bentuk pohon faktor yang berbeda",
    "asalkan tetap memenuhi kaidah cara pembuatan pohon faktor yang benar.",
    "Faktorisasi prima dari 260 adalah 2 × 2 × 5 × 13",
    "Soal Tambahan",
    "Kunci Jawaban Soal Tambahan",
  ],
  ketukan: [
    k(
      "Pohon faktor seratus sembilan puluh enam: dibagi dua menjadi dua dan sembilan puluh delapan, lalu dibagi dua lagi menjadi dua dan empat puluh sembilan.",
      tambah(0, judul("Pohon faktor 196"), ...p196.tingkat[0]),
      tambah("dibagi", ...p196.tingkat[1]),
      tambah("lagi", ...p196.tingkat[2]),
    ),
    k(
      "Empat puluh sembilan sama dengan tujuh kali tujuh. Semua ujungnya prima, jadi faktorisasi prima seratus sembilan puluh enam adalah dua kali dua kali tujuh kali tujuh.",
      tambah(0, ...p196.tingkat[3]),
      tambah("jadi", teks("h196", 150, 176, "196 = 2 × 2 × 7 × 7", 11, W.hijau)),
    ),
    k(
      "Pohon faktor tiga ratus: tiga ratus dibagi dua, seratus lima puluh dibagi dua, tujuh puluh lima dibagi tiga, dan dua puluh lima menjadi lima kali lima. Jadi faktorisasi primanya dua, dua, tiga, lima, lima.",
      bersih(0),
      tambah(0, judul("Pohon faktor 300"), ...p300.tingkat[0]),
      tambah(6, ...p300.tingkat[1]),
      tambah(11, ...p300.tingkat[2]),
      tambah(16, ...p300.tingkat[3]),
      tambah(22, ...p300.tingkat[4]),
      tambah("Jadi", teks("h300", 150, 192, "300 = 2 × 2 × 3 × 5 × 5", 10, W.hijau)),
    ),
    k(
      "Ayo Berdiskusi: bagaimana pohon faktor dua ratus tujuh puluh? Bentuk pohon boleh berbeda asalkan kaidahnya benar. Pada hitungan kita, ujung akhirnya selalu dua, tiga, tiga, tiga, dan lima.",
      bersih(0),
      tambah(0, judul("Ayo Berdiskusi: 270"), ...p270a.semua),
      tambah("berbeda", ...p270b.semua),
      tambah("selalu", teks("h270", 150, 188, "270 = 2 × 3 × 3 × 3 × 5", 10, W.hijau)),
    ),
    k(
      "Catatan guru: pohon kunci dua ratus enam puluh di Panduan Guru menulis tiga di bawah seratus tiga puluh. Seharusnya dua, karena seratus tiga puluh sama dengan dua kali enam puluh lima.",
      bersih(0),
      tambah(0, judul("Soal tambahan: pohon 260")),
      tambah(0, teks("lb", 80, 32, "kunci buku", 8.6, W.merah), teks("lc", 220, 32, "yang benar", 8.6, W.hijau), ...p260a.semua, ...p260b.semua),
      ubah("menulis", { id: "p260a-nba", warna: W.merahMuda }, { id: "p260a-tba", warna: W.merah }),
      tambah("Seharusnya", teks("h260", 150, 192, "260 = 2 × 2 × 5 × 13", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. KPK dan FPB dengan faktorisasi prima (Buku Siswa hlm. 56 sampai 57, Panduan Guru hlm. 81) ------------------------------ */
const kolX = (i: number): number => 46 + i * 36;
/** Kotak faktor prima kecil di kolom i (pusat x, atas y). */
const chip = (id: string, i: number, y: number, n: number, warna: string): Obj[] => [kotak(`${id}-k`, kolX(i) - 14, y, 28, 22, warna, W.biru, { rx: 5 }), teks(`${id}-t`, kolX(i), y + 15.5, String(n), 11, W.biru)];
export const FAKTOR_72 = [2, 2, 2, 3, 3];
export const FAKTOR_150 = [2, 3, 5, 5];
/** Kolom tiap faktor pada gambar: faktor 72 di kolom 0 sampai 4, faktor 150 di kolom 0, 3, 5, 6 (faktor yang sama sejajar). */
export const KOLOM_150 = [0, 3, 5, 6];

export const ADEGAN_KPK_FPB_PRIMA: AdeganStory = {
  id: "kpk-fpb-prima",
  judul: "KPK dan FPB dari faktorisasi prima: 72 dan 150",
  sumber: "Buku Siswa hlm. 56–57; Panduan Guru hlm. 81",
  latar: "#FFFBEB",
  kutipan: [
    "Ayo, kita tentukan KPK dan PFB dari bilangan 72 dan 96 dengan menggunakan faktorisasi prima.",
    "Menuliskan faktorisasi prima dari 72 dan 150.",
    "72 = 2 x 2 x 2 x 3 x 3",
    "150 = 2 x 3 x 5 x 5",
    "Kita tuliskan bilangan prima yang memiliki pasangan cukup sekali saja, kemudian tuliskan semua bilangan prima yang tidak memiliki pasangan.",
    "Hasil perkalian semua bilangan tersebut merupakan KPK dari 72 dan 150.",
    "KPK dari 72 dan 150 adalah 2 x 3 x 2 x 2 x 3 x 5 x 5 = 1.800",
    "FPB merupakan hasil kali bilangan tersebut.",
    "FPB dari 72 dan 150 adalah 2 x 3 = 6",
    "Untuk bilangan-bilangan dengan hasil faktorisasi prima tidak memiliki bilangan prima yang berpasangan, maka FPB-nya adalah 1.",
    "FPB dari bilangan 15 dan 28 adalah 1",
    "15 = 3 x 5",
    "28 = 2 x 2 x 7",
  ],
  ketukan: [
    k(
      "Sekarang KPK dan FPB dengan faktorisasi prima, contoh buku: tujuh puluh dua dan seratus lima puluh. Tujuh puluh dua adalah dua, dua, dua, tiga, tiga. Seratus lima puluh adalah dua, tiga, lima, lima.",
      tambah(0, judul("KPK dan FPB dari faktor prima")),
      tambah("Tujuh@2", teks("e72", 150, 70, "72 = 2 × 2 × 2 × 3 × 3", 17, W.biru)),
      tambah("Seratus@2", teks("e150", 150, 118, "150 = 2 × 3 × 5 × 5", 17, W.hijau)),
    ),
    k(
      "Catatan: kalimat pengantar buku menyebut tujuh puluh dua dan sembilan puluh enam, tetapi langkahnya memakai seratus lima puluh. Kita ikuti seratus lima puluh.",
      bersih(0),
      tambah(0, judul("Catatan soal buku")),
      tambah("pengantar", ...kartu("n1", 20, 40, 260, 40, W.merahMuda, ["kalimat pengantar buku:", "72 dan 96"], 9.4)),
      tambah("langkahnya", ...kartu("n2", 20, 100, 260, 40, W.hijauMuda, ["langkah di buku:", "72 dan 150"], 9.4)),
    ),
    k(
      "Untuk KPK, bilangan prima yang berpasangan ditulis sekali saja, lalu semua yang tidak berpasangan. Dua, tiga, lalu dua, dua, tiga, lima, lima. Hasil kalinya seribu delapan ratus.",
      bersih(0),
      tambah(0, judul("KPK: pasangan sekali"), teks("l72", 12, 59, "72", 9, W.biru), teks("l150", 12, 91, "150", 9, W.biru)),
      ...FAKTOR_72.map((n, i) => tambah(0, chip(`u${i}`, i, 44, n, i === 0 || i === 3 ? W.emas : W.langit))),
      ...FAKTOR_150.map((n, i) => tambah(0, chip(`v${i}`, KOLOM_150[i], 76, n, i === 0 || i === 1 ? W.emas : W.jingga))),
      tambah("berpasangan", teks("pk", 150, 126, "pasangan (kuning) ditulis sekali", 8.6, W.coklat)),
      tambah("Hasil", teks("kpk", 150, 160, "KPK = 2 × 3 × 2 × 2 × 3 × 5 × 5 = 1.800", 10.5, W.hijau)),
    ),
    k(
      "Untuk FPB, cukup kalikan bilangan prima yang berpasangan, yaitu dua dan tiga. Hasilnya enam.",
      ubah(0, ...[1, 2, 4].map((i) => ({ id: `u${i}-k`, warna: W.abu })), ...[2, 3].map((i) => ({ id: `v${i}-k`, warna: W.abu }))),
      tambah("Hasilnya", teks("fpb", 150, 188, "FPB = 2 × 3 = 6", 12, W.merah)),
    ),
    k(
      "Jika tidak ada bilangan prima yang berpasangan, FPB-nya satu. Contohnya lima belas dan dua puluh delapan: tiga kali lima, dan dua kali dua kali tujuh, tidak berpasangan.",
      bersih(0),
      tambah(0, judul("Tanpa pasangan: FPB = 1")),
      tambah("lima@1", teks("t15", 150, 66, "15 = 3 × 5", 17, W.biru)),
      tambah("dua@2", teks("t28", 150, 108, "28 = 2 × 2 × 7", 17, W.hijau)),
      tambah("berpasangan@2", ...kartu("t1", 80, 132, 140, 40, W.krem, ["tidak ada pasangan", "FPB 15 dan 28 = 1"], 9.4)),
    ),
  ],
};

/* ------------------------------ 7. Pembagian berulang (Buku Siswa hlm. 58 sampai 59, Panduan Guru hlm. 82 sampai 83) ------------------------------ */
/** Tabel pembagian berulang untuk 72 dan 150 yang benar: pembagi, bilangan kiri, bilangan kanan sebelum dibagi. Buku Siswa hlm. 58 melewatkan baris 5 | 1 5. */
export const BARIS_BERULANG: [string, string, string][] = [
  ["2", "72", "150"],
  ["2", "36", "75"],
  ["2", "18", "75"],
  ["3", "9", "75"],
  ["3", "3", "25"],
  ["5", "1", "25"],
  ["5", "1", "5"],
  ["", "1", "1"],
];

export const ADEGAN_BERULANG: AdeganStory = {
  id: "berulang",
  judul: "Pembagian berulang untuk KPK dan FPB 72 dan 150",
  sumber: "Buku Siswa hlm. 58–59; Panduan Guru hlm. 82–83",
  latar: "#FFF7ED",
  kutipan: [
    "4. Menentukan KPK dan FPB Menggunakan Pembagian Berulang",
    "Bagian ini hanya sebagai referensi tambahan bagi peserta didik.",
    "Materi ini hanya bagian dari teknik, bukan konseptual",
    "Jika tidak habis dibagi dengan suatu bilangan, maka tuliskan bilangan yang sama di baris selanjutnya.",
    "Jika baris terakhir hasilnya semua sudah 1, artinya langkah sudah selesai.",
    "KPK dari 72 dan 150 adalah hasil perkalian semua pembagi prima pada pembagian berulang tersebut.",
    "KPK dari 72 dan 150 adalah 2 x 2 x 2 x 3 x 3 x 5 x 5 = 1.800",
    "FPB dari 75 dan 150 adalah hasil kali bilangan prima yang dapat membagi habis 75 dan 150.",
    "FPB dari 75 dan 150 adalah 2 x 3 = 6",
  ],
  ketukan: [
    k(
      "Cara keempat adalah pembagian berulang. Catatan Panduan Guru: ini hanya referensi tambahan, karena teknik, bukan konsep. Kuasai dulu cara biasa dan faktorisasi prima.",
      tambah(0, judul("Pembagian berulang")),
      tambah("referensi", ...kartu("g1", 20, 40, 260, 40, W.krem, ["referensi tambahan", "(teknik, bukan konsep)"], 9.4)),
      tambah("Kuasai", ...kartu("g2", 20, 100, 260, 40, W.hijauMuda, ["kuasai dulu cara biasa", "dan faktorisasi prima"], 9.4)),
    ),
    k(
      "Tulis dua bilangan, tujuh puluh dua dan seratus lima puluh. Bagi dengan bilangan prima yang dapat membagi, dan bilangan yang tidak habis dibagi ditulis lagi di baris berikutnya, seperti tujuh puluh lima.",
      bersih(0),
      tambah(0, judul("Tulis, bagi, ulangi")),
      tambah("Tulis", ...tabel("br", 55, 28, [70, 60, 60], [["Pembagi prima", "72", "150"], ...BARIS_BERULANG.slice(0, 4).map((b) => [...b])], 15, 8.6)),
      tambah("bilangan@3", ...tabel("bs", 55, 28 + 5 * 15, [70, 60, 60], BARIS_BERULANG.slice(4, 6).map((b) => [...b]), 15, 8.6, W.putih)),
    ),
    k(
      "Catatan: tabel buku melewatkan baris yang berisi satu dan lima. Dua puluh lima dibagi lima adalah lima, bukan satu, jadi masih ada satu pembagi lima lagi sampai semuanya satu.",
      tambah("melewatkan", ...tabel("bt", 55, 28 + 7 * 15, [70, 60, 60], BARIS_BERULANG.slice(6).map((b) => [...b]), 15, 8.6, W.putih)),
      ubah("melewatkan", { id: "bt-s00", warna: W.emas }, { id: "bt-s01", warna: W.emas }, { id: "bt-s02", warna: W.emas }),
      tambah("Dua", teks("cat", 150, 186, "baris 5 | 1 | 5 tidak ada di buku", 9, W.merah)),
    ),
    k(
      "KPK adalah hasil kali semua pembagi prima, yaitu seribu delapan ratus. FPB adalah hasil kali pembagi yang membagi habis kedua bilangan: dua dan tiga, hasilnya enam.",
      hapus(0, "cat"),
      ubah("tiga", { id: "br-s10", warna: W.emas }, { id: "br-s40", warna: W.emas }),
      tambah("KPK", teks("kp", 150, 178, "KPK = 2 × 2 × 2 × 3 × 3 × 5 × 5 = 1.800", 9.6, W.hijau)),
      tambah("hasilnya", teks("fp", 150, 194, "FPB = 2 × 3 = 6", 9.6, W.merah)),
    ),
    k(
      "Catatan lagi: buku menulis FPB dari tujuh puluh lima dan seratus lima puluh. Itu salah ketik, yang benar tujuh puluh dua dan seratus lima puluh.",
      bersih(0),
      tambah(0, judul("Salah ketik di buku")),
      tambah("menulis", ...kartu("s1", 20, 44, 260, 40, W.merahMuda, ["buku: FPB dari 75 dan 150", "adalah 6"], 9.4)),
      tambah("benar", ...kartu("s2", 20, 104, 260, 40, W.hijauMuda, ["seharusnya: FPB dari", "72 dan 150 adalah 6"], 9.4)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih dan soal tambahan (Buku Siswa hlm. 59, Panduan Guru hlm. 82 dan 84 sampai 86) ------------------------------ */
export const ADEGAN_LATIHAN: AdeganStory = {
  id: "latihan",
  judul: "Ayo Berlatih dan soal tambahan faktorisasi prima",
  sumber: "Buku Siswa hlm. 59; Panduan Guru hlm. 82, 84–86",
  latar: "#F0F9FF",
  kutipan: [
    "Tentukan faktorisasi prima dari bilangan-bilangan berikut dengan menggunakan pohon faktor.",
    "Tentukan KPK dan FPB dari bilangan-bilangan berikut dengan menggunakan cara faktorisasi prima dan cara pembagian berulang.",
    "a. 42, 60",
    "b. 27, 81",
    "c. 6, 10, 15",
    "d. 7, 18, 33",
    "e. 30, 64, 86",
    "Faktorisasi prima dari 60 adalah 2 × 2 × 3 × 5",
    "Faktorisasi prima dari 96 adalah 2 × 2 × 2 × 2 × 2 × 3",
    "FPB = 2 × 3 = 6",
    "KPK = 2 × 2 × 3 × 5 × 7 = 420",
    "FPB = 3 × 3 × 3 = 27",
    "KPK = 3 × 3 × 3 × 3 = 81",
    "FPB = 1 (karena tidak ada pembagi prima yang sama di ketiga bilangan)",
    "KPK = 2 × 3 × 5 = 30.",
    "KPK = 2 × 3 × 3 × 7 × 11 = 1.386",
    "KPK = 2 × 3 × 5 × 2 × 2 × 2 × 2 × 2 × 43 = 41.280",
    "Tentukan KPK dan FPB pasangan bilangan berikut dengan menggunakan faktorisasi prima.",
    "FPB = 2 × 2 × 3 × 3 = 36",
    "KPK = 2 × 2 × 3 × 3 × 3 = 108",
    "KPK = 5 × 2 × 3 × 5 × 7 = 1.050",
    "KPK = 2 × 3 × 2 × 2 × 5 × 2 × 2 = 1.080",
  ],
  ketukan: [
    k(
      "Ayo Berlatih nomor satu, pohon faktor. Enam puluh menjadi dua, dua, tiga, lima. Sembilan puluh enam menjadi lima faktor dua dan satu faktor tiga.",
      tambah(0, judul("Ayo Berlatih 1")),
      tambah("Enam", teks("a60", 150, 76, "60 = 2 × 2 × 3 × 5", 15, W.biru)),
      tambah("Sembilan", teks("a96", 150, 130, "96 = 2 × 2 × 2 × 2 × 2 × 3", 15, W.hijau)),
    ),
    k(
      "Nomor dua a, empat puluh dua dan enam puluh: FPB enam, KPK empat ratus dua puluh. Nomor dua b, dua puluh tujuh dan delapan puluh satu: FPB dua puluh tujuh, KPK delapan puluh satu.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 2a dan 2b")),
      tambah(2, ...kartu("b1", 14, 34, 272, 58, W.langit, ["42 dan 60", "FPB = 2 × 3 = 6", "KPK = 2 × 2 × 3 × 5 × 7 = 420"], 9.4)),
      tambah(18, ...kartu("b2", 14, 104, 272, 58, W.hijauMuda, ["27 dan 81", "FPB = 3 × 3 × 3 = 27", "KPK = 3 × 3 × 3 × 3 = 81"], 9.4)),
    ),
    k(
      "Nomor dua c, enam, sepuluh, dan lima belas: FPB satu, KPK tiga puluh. Nomor dua d, tujuh, delapan belas, tiga puluh tiga: FPB satu, KPK seribu tiga ratus delapan puluh enam.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 2c dan 2d")),
      tambah(2, ...kartu("c1", 14, 34, 272, 58, W.krem, ["6, 10, 15", "FPB = 1", "KPK = 2 × 3 × 5 = 30"], 9.4)),
      tambah(20, ...kartu("c2", 14, 104, 272, 58, W.pink, ["7, 18, 33", "FPB = 1", "KPK = 2 × 3 × 3 × 7 × 11 = 1.386"], 9.4)),
    ),
    k(
      "Nomor dua e, tiga puluh, enam puluh empat, dan delapan puluh enam: FPB dua, KPK empat puluh satu ribu dua ratus delapan puluh.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 2e")),
      tambah("tiga@1", teks("d30", 150, 52, "30 = 2 × 3 × 5", 12, W.biru)),
      tambah("enam", teks("d64", 150, 78, "64 = 2 × 2 × 2 × 2 × 2 × 2", 12, W.biru)),
      tambah("delapan", teks("d86", 150, 104, "86 = 2 × 43", 12, W.biru)),
      tambah("FPB", teks("dfp", 150, 140, "FPB = 2", 13, W.merah)),
      tambah("KPK", teks("dkp", 150, 172, "KPK = 2 × 2 × 2 × 2 × 2 × 2 × 3 × 5 × 43 = 41.280", 8.6, W.hijau)),
    ),
    k(
      "Soal tambahan Panduan Guru: tiga puluh enam dan seratus delapan, FPB tiga puluh enam, KPK seratus delapan. Lima puluh dan seratus lima, FPB lima, KPK seribu lima puluh.",
      bersih(0),
      tambah(0, judul("Soal tambahan")),
      tambah("tiga@1", ...kartu("e1", 14, 34, 272, 58, W.langit, ["36 dan 108", "FPB = 2 × 2 × 3 × 3 = 36", "KPK = 2 × 2 × 3 × 3 × 3 = 108"], 9.4)),
      tambah("Lima", ...kartu("e2", 14, 104, 272, 58, W.hijauMuda, ["50 dan 105", "FPB = 5", "KPK = 5 × 2 × 3 × 5 × 7 = 1.050"], 9.4)),
    ),
    k(
      "Soal ketiga, dua puluh empat, tiga puluh, dan lima puluh empat: FPB enam, KPK seribu delapan puluh. Catatan guru: perkalian di kunci bernilai empat ratus delapan puluh, jadi keliru.",
      bersih(0),
      tambah(0, judul("Soal tambahan 3: 24, 30, 54")),
      tambah("Soal", teks("f1", 150, 44, "24 = 2 × 2 × 2 × 3", 10, W.biru), teks("f2", 150, 60, "30 = 2 × 3 × 5", 10, W.biru), teks("f3", 150, 76, "54 = 2 × 3 × 3 × 3", 10, W.biru)),
      tambah("FPB", teks("f4", 150, 98, "FPB = 2 × 3 = 6", 10, W.merah)),
      tambah("KPK", teks("f5", 150, 118, "KPK = 2 × 2 × 2 × 3 × 3 × 3 × 5 = 1.080", 10, W.hijau)),
      tambah("Catatan", teks("f6", 150, 150, "kunci buku: 2 × 3 × 2 × 2 × 5 × 2 × 2 = 480", 8.8, W.merah), teks("f7", 150, 168, "hasil 1.080 tetap benar, perkaliannya yang keliru", 8.6, W.coklat)),
    ),
  ],
};
