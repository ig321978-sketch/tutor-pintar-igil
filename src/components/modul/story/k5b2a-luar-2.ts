import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, kartu, kotak, panah, teks, judul } from "./k5b2a-gambar";
import { bersih, k, sebar, tambah } from "./k5b2a-bantu";

/** Satu kotak angka kecil dalam deret sepuluh kotak. Id `${id}-b{i}` (kotak) dan `${id}-a{i}` (angka). */
export const kotakDigit = (id: string, i: number, isi: string, y: number, warna: string, u = 9.6, x0 = 10, jarak = 28): Obj[] => [
  kotak(`${id}-b${i}`, x0 + i * jarak, y, 26, 28, warna, W.biru, { rx: 5 }),
  teks(`${id}-a${i}`, x0 + i * jarak + 13, y + 19, isi, u, W.biru),
];
/** Baris aturan cek habis dibagi: kartu ke-i. */
const aturan = (id: string, i: number, warna: string, baris: string) => kartu(id, 14, 32 + i * 32, 272, 26, warna, [baris], 8.8);

/* ------------------------------ 6. Divisibility Check: konsep ------------------------------ */
export const ADEGAN_LUAR_CEK: AdeganStory = {
  id: "luar-cek",
  judul: "Divisibility Check: cek habis dibagi",
  sumber: "Metode luar: Divisibility Check",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Divisibility Check, atau cek habis dibagi. Tanpa menulis semua kelipatan, kita periksa apakah suatu bilangan habis dibagi bilangan itu.",
      tambah(0, judul("Divisibility Check")),
      tambah("Divisibility", emo("lp", 150, 84, "🔍", 50)),
      tambah("habis@1", ...kartu("hb", 60, 112, 180, 40, W.emas, ["habis dibagi?"], 12)),
    ),
    k(
      "Aturan untuk dua: bilangan genap, satuannya nol, dua, empat, enam, atau delapan. Untuk lima: satuannya nol atau lima. Untuk sepuluh: satuannya nol.",
      bersih(0),
      tambah(0, judul("Aturan angka satuan")),
      tambah("dua:", ...aturan("r2", 0, W.hijauMuda, "kelipatan 2: satuan 0, 2, 4, 6, atau 8")),
      tambah("lima:", ...aturan("r5", 1, W.langit, "kelipatan 5: satuan 0 atau 5")),
      tambah("sepuluh:", ...aturan("r10", 2, W.krem, "kelipatan 10: satuan 0")),
    ),
    k(
      "Untuk tiga: jumlahkan semua angkanya. Jika jumlahnya kelipatan tiga, bilangan itu kelipatan tiga. Untuk sembilan: jumlah angkanya harus kelipatan sembilan.",
      tambah("tiga:", ...aturan("r3", 3, W.pink, "kelipatan 3: jumlah angka kelipatan 3")),
      tambah("sembilan:", ...aturan("r9", 4, W.jingga, "kelipatan 9: jumlah angka kelipatan 9")),
    ),
    k(
      "Contoh dua belas: satu ditambah dua sama dengan tiga, dan tiga adalah kelipatan tiga, jadi dua belas kelipatan tiga.",
      bersih(0),
      tambah(0, judul("Contoh: 12")),
      tambah("Contoh", ...kartu("c12", 100, 36, 100, 44, W.krem, ["12"], 20)),
      tambah("satu", teks("c1", 150, 118, "1 + 2 = 3", 14, W.biru)),
      tambah("kelipatan@1", ...kartu("c3", 60, 134, 180, 30, W.hijauMuda, ["3 kelipatan 3"], 10)),
      tambah("jadi", emo("cc", 150, 186, "✔", 22), teks("cj", 220, 182, "12 kelipatan 3", 9.6, W.hijau)),
    ),
    k(
      "Enam sama dengan dua kali tiga, jadi kelipatan enam harus lolos dua aturan sekaligus: genap, dan jumlah angkanya kelipatan tiga.",
      bersih(0),
      tambah(0, judul("Kelipatan 6: dua aturan")),
      tambah("Enam", ...kartu("e6", 100, 32, 100, 34, W.pink, ["6 = 2 × 3"], 12)),
      tambah("genap,", ...kartu("g1", 14, 84, 272, 32, W.hijauMuda, ["aturan 2: genap"], 9.6)),
      tambah("jumlah", ...kartu("g2", 14, 126, 272, 32, W.pink, ["aturan 3: jumlah angka kelipatan 3"], 9.6)),
      tambah(19, emo("g3", 150, 188, "✔", 20)),
    ),
  ],
};

/* ------------------------------ 7. Divisibility Check: penerapan pada angka buku ------------------------------ */
const kartuUji = (id: string, y: number, bilangan: string, hitung: string, warna: string, hasil: string) => [
  ...kartu(`${id}-n`, 14, y, 70, 44, warna, [bilangan], 16),
  teks(`${id}-e`, 160, y + 24, hitung, 13, W.biru),
  teks(`${id}-h`, 262, y + 24, hasil, 16, W.hijau),
];

export const ADEGAN_LUAR_CEK_TERAPAN: AdeganStory = {
  id: "luar-cek-terapan",
  judul: "Divisibility Check pada kelipatan 9 dan 6 dari buku",
  sumber: "Metode luar: Divisibility Check; angka Buku Siswa hlm. 36–37",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Terapkan pada kelipatan sembilan dari buku. Lima puluh empat: lima ditambah empat sama dengan sembilan, jadi kelipatan sembilan.",
      tambah(0, judul("Cek kelipatan 9")),
      tambah("empat:", ...kartuUji("u54", 56, "54", "5 + 4 = 9", W.krem, "✔")),
      tambah("kelipatan@2", teks("ub", 150, 150, "9 kelipatan 9, jadi 54 lolos", 10, W.hijau)),
    ),
    k(
      "Tujuh puluh dua: tujuh ditambah dua sama dengan sembilan. Delapan puluh satu: delapan ditambah satu sama dengan sembilan. Keduanya lolos.",
      bersih(0),
      tambah(0, judul("Cek kelipatan 9")),
      tambah("dua:", ...kartuUji("u72", 40, "72", "7 + 2 = 9", W.krem, "✔")),
      tambah("satu:", ...kartuUji("u81", 100, "81", "8 + 1 = 9", W.krem, "✔")),
      tambah("Keduanya", teks("ul", 150, 176, "keduanya lolos", 10, W.hijau)),
    ),
    k(
      "Sembilan puluh: sembilan ditambah nol sama dengan sembilan. Sembilan puluh sembilan: sembilan ditambah sembilan sama dengan delapan belas, dan delapan belas kelipatan sembilan. Keduanya juga lolos.",
      bersih(0),
      tambah(0, judul("Cek kelipatan 9")),
      tambah("nol", ...kartuUji("u90", 40, "90", "9 + 0 = 9", W.krem, "✔")),
      tambah("delapan", ...kartuUji("u99", 100, "99", "9 + 9 = 18", W.krem, "✔")),
      tambah("juga", teks("ul", 150, 176, "18 = 2 × 9, jadi lolos", 10, W.hijau)),
    ),
    k(
      "Bilangan yang bukan kelipatan: delapan puluh dua. Delapan ditambah dua sama dengan sepuluh, bukan kelipatan sembilan, jadi tidak diwarnai.",
      bersih(0),
      tambah(0, judul("Bilangan yang gagal")),
      tambah("dua.", ...kartuUji("u82", 56, "82", "8 + 2 = 10", W.merahMuda, "❌")),
      tambah("bukan@2", teks("ug", 150, 150, "10 bukan kelipatan 9, jadi 82 gagal", 10, W.merah)),
    ),
    k(
      "Kelipatan enam pada nomor dua: tiga puluh. Satuannya nol, jadi genap, dan tiga ditambah nol sama dengan tiga, kelipatan tiga. Lolos dua aturan, jadi kelipatan enam.",
      bersih(0),
      tambah(0, judul("Cek kelipatan 6")),
      tambah("tiga@1", ...kartuUji("u30", 40, "30", "3 + 0 = 3", W.pink, "✔")),
      tambah("genap,", teks("ug1", 150, 112, "satuan 0: genap", 9.6, W.hijau)),
      tambah("Lolos", ...kartu("ug2", 40, 130, 220, 34, W.emas, ["30 kelipatan 6"], 11)),
    ),
  ],
};

/* ------------------------------ 8. Last Digit Pattern: konsep ------------------------------ */
const TIGA = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
const SATUAN_TIGA = [3, 6, 9, 2, 5, 8, 1, 4, 7, 0];
const SUARA_P2 =
  "Kelipatan tiga: tiga, enam, sembilan, dua belas, lima belas, delapan belas, dua puluh satu, dua puluh empat, dua puluh tujuh, tiga puluh. Angka satuannya: tiga, enam, sembilan, dua, lima, delapan, satu, empat, tujuh, nol.";
const POS_ATAS = [2, 3, 4, 6, 8, 10, 13, 16, 19, 21];
const POS_BAWAH = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33];

export const ADEGAN_LUAR_SATUAN: AdeganStory = {
  id: "luar-satuan",
  judul: "Last Digit Pattern: pola angka satuan kelipatan",
  sumber: "Metode luar: Last Digit Pattern",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Last Digit Pattern, atau pola angka satuan. Perhatikan angka terakhir tiap kelipatan: ia berulang dengan pola tertentu.",
      tambah(0, judul("Last Digit Pattern")),
      tambah("Metode", emo("ls", 150, 84, "🔢", 50)),
      tambah("terakhir", ...kartu("at", 60, 112, 180, 40, W.emas, ["angka terakhir"], 12)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Kelipatan 3 dan angka satuannya")),
      tambah(0, teks("c1", 150, 38, "kelipatan 3", 9, W.biru), teks("c2", 150, 96, "angka satuan", 9, W.biru)),
      ...TIGA.map((n, i) => tambah(POS_ATAS[i], ...kotakDigit("at", i, String(n), 42, W.krem))),
      ...SATUAN_TIGA.map((n, i) => tambah(POS_BAWAH[i], ...kotakDigit("bt", i, String(n), 102, W.merahMuda))),
    ),
    k(
      "Sepuluh angka satuan itu semuanya berbeda, lalu berulang lagi mulai tiga puluh tiga. Jadi polanya berulang setiap sepuluh kelipatan.",
      bersih(0),
      tambah(0, judul("Polanya berulang")),
      tambah("Sepuluh", ...kartu("p1", 14, 34, 272, 34, W.merahMuda, ["3 6 9 2 5 8 1 4 7 0"], 11)),
      tambah("berulang", panah("pa", 150, 72, 0, 22, W.biru, 2.4)),
      tambah("tiga@2", ...kartu("p2", 14, 100, 272, 34, W.merahMuda, ["3 6 9 2 5 8 1 4 7 0 ..."], 11)),
      tambah("setiap", teks("p3", 150, 162, "berulang tiap 10 kelipatan", 10, W.merah)),
    ),
    k(
      "Gunanya, pola ini membantu memeriksa lanjutan daftar: setelah satuan tujuh pasti satuan nol, lalu kembali ke tiga.",
      bersih(0),
      tambah(0, judul("Kegunaan pola")),
      tambah("tujuh", ...kartu("g7", 30, 70, 56, 44, W.merahMuda, ["7"], 16)),
      tambah("nol,", panah("ga", 90, 92, 24, 0, W.biru, 2.4), ...kartu("g0", 120, 70, 56, 44, W.hijauMuda, ["0"], 16)),
      tambah("tiga.", panah("gb", 180, 92, 24, 0, W.biru, 2.4), ...kartu("g3", 210, 70, 56, 44, W.merahMuda, ["3"], 16)),
    ),
  ],
};

/* ------------------------------ 9. Last Digit Pattern: penerapan pada kelipatan 9 ------------------------------ */
const SEMBILAN = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90];
const SATUAN_9 = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const PULUHAN_9 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const SUARA_Q1 =
  "Terapkan pada kelipatan sembilan dari buku: sembilan, delapan belas, dua puluh tujuh, tiga puluh enam, empat puluh lima, lima puluh empat, enam puluh tiga, tujuh puluh dua, delapan puluh satu, sembilan puluh.";
const SUARA_Q2 = "Angka satuannya turun satu setiap langkah: sembilan, delapan, tujuh, enam, lima, empat, tiga, dua, satu, nol.";
const SUARA_Q3 = "Sedangkan angka puluhannya naik satu: nol, satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan.";

export const ADEGAN_LUAR_SATUAN_TERAPAN: AdeganStory = {
  id: "luar-satuan-terapan",
  judul: "Last Digit Pattern pada kelipatan 9 dari buku",
  sumber: "Metode luar: Last Digit Pattern; angka Buku Siswa hlm. 37",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Kelipatan 9: angka satuan")),
      tambah(0, teks("c1", 150, 38, "kelipatan 9", 9, W.biru)),
      ...SEMBILAN.map((n, i) => tambah([6, 8, 11, 14, 17, 20, 23, 26, 29, 31][i], ...kotakDigit("kn", i, String(n), 42, W.krem, 8.8))),
    ),
    k(
      SUARA_Q2,
      tambah(0, teks("c2", 150, 94, "angka satuan", 9, W.biru)),
      ...SATUAN_9.map((n, i) => tambah(sebar(SUARA_Q2, 10, 5)[i], ...kotakDigit("sa", i, String(n), 98, W.merahMuda))),
    ),
    k(
      SUARA_Q3,
      tambah(0, teks("c3", 150, 150, "angka puluhan", 9, W.biru)),
      ...PULUHAN_9.map((n, i) => tambah(sebar(SUARA_Q3, 10, 5)[i], ...kotakDigit("pu", i, String(n), 154, W.hijauMuda))),
    ),
    k(
      "Jumlah puluhan dan satuan selalu sembilan: nol ditambah sembilan, satu ditambah delapan, dan seterusnya. Itulah cek habis dibagi sembilan.",
      tambah("nol", teks("j1", 70, 196, "0 + 9 = 9", 9.6, W.hijau)),
      tambah(9, teks("j2", 160, 196, "1 + 8 = 9", 9.6, W.hijau)),
      tambah("Itulah", teks("j3", 250, 196, "2 + 7 = 9", 9.6, W.hijau)),
    ),
    k(
      "Setelah satuan nol, satuan kembali sembilan, jadi lanjutannya sembilan puluh sembilan. Dengan pola ini sebelas bilangan kelipatan sembilan sampai seratus lengkap.",
      bersih(0),
      tambah(0, judul("Lanjutan setelah 90")),
      tambah("nol,", ...kartu("w1", 30, 60, 96, 44, W.krem, ["90", "satuan 0"], 10.4)),
      tambah("sembilan@2", panah("wa", 130, 82, 28, 0, W.biru, 2.4), ...kartu("w2", 164, 60, 96, 44, W.hijauMuda, ["99", "satuan 9"], 10.4)),
      tambah("sebelas", ...kartu("w3", 60, 124, 180, 34, W.emas, ["11 bilangan kelipatan 9"], 10.4)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasan empat metode: Skip Counting melompat dari nol, Hundred Chart mewarnai tabel, Divisibility Check memeriksa jumlah angka, dan Last Digit Pattern membaca angka satuan.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Skip", ...kartu("s1", 12, 32, 276, 30, W.hijauMuda, ["Skip Counting: lompat dari nol"], 9.4)),
      tambah("Hundred", ...kartu("s2", 12, 70, 276, 30, W.langit, ["Hundred Chart: warnai tabel"], 9.4)),
      tambah("Divisibility", ...kartu("s3", 12, 108, 276, 30, W.krem, ["Divisibility Check: periksa angka"], 9.4)),
      tambah("Last", ...kartu("s4", 12, 146, 276, 30, W.pink, ["Last Digit Pattern: baca satuan"], 9.4)),
    ),
    k(
      "Apa pun metodenya, hasilnya harus sama. Kelipatan enam: enam, dua belas, delapan belas, dua puluh empat, tiga puluh. Kelipatan delapan: delapan, enam belas, dua puluh empat, tiga puluh dua, empat puluh.",
      bersih(0),
      tambah(0, judul("Hasilnya sama")),
      tambah("enam:", teks("l6", 150, 46, "kelipatan 6", 9, W.biru), ...[6, 12, 18, 24, 30].map((n, i) => kotakDigit("h6", i, String(n), 52, W.pink, 9.6, 70, 34)).flat()),
      tambah("delapan:", teks("l8", 150, 108, "kelipatan 8", 9, W.biru), ...[8, 16, 24, 32, 40].map((n, i) => kotakDigit("h8", i, String(n), 114, W.langit, 9.6, 70, 34)).flat()),
    ),
    k(
      "Kelipatan tujuh sampai seratus ada empat belas, kelipatan sembilan ada sebelas. Kunci buku untuk sembilan perlu dilengkapi sampai sembilan puluh sembilan.",
      bersih(0),
      tambah(0, judul("Banyak kelipatan sampai 100")),
      tambah("tujuh", ...kartu("b7", 14, 40, 272, 34, W.krem, ["kelipatan 7: 14 bilangan"], 10)),
      tambah("sembilan", ...kartu("b9", 14, 84, 272, 34, W.hijauMuda, ["kelipatan 9: 11 bilangan"], 10)),
      tambah("Kunci", ...kartu("bk", 14, 130, 272, 40, W.merahMuda, ["kunci buku untuk 9", "perlu sampai 99"], 10)),
    ),
    k(
      "Intinya, kelipatan sebuah bilangan adalah hasil kali bilangan itu dengan satu, dua, tiga, dan seterusnya. Nol tidak dihitung.",
      bersih(0),
      tambah(0, judul("Intinya")),
      tambah("satu,", ...kartu("i1", 20, 36, 128, 32, W.krem, ["1 × 9 = 9"], 10.4)),
      tambah("dua,", ...kartu("i2", 152, 36, 128, 32, W.krem, ["2 × 9 = 18"], 10.4)),
      tambah("tiga,", ...kartu("i3", 20, 78, 128, 32, W.krem, ["3 × 9 = 27"], 10.4)),
      tambah("Nol", ...kartu("i4", 40, 128, 220, 40, W.emas, ["nol tidak dihitung"], 11)),
    ),
  ],
};

