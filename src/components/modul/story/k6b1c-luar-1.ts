import type { AdeganStory } from "./logika-story";
import { W, emo, kartu, panah, pecahan, teks } from "./k6b1c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k6b1c-bantu";

/** Kartu metode pada peta empat metode: kotak berjudul dan satu baris keterangan. */
const metode = (id: string, x: number, y: number, nama: string[], ket: string, warna: string) => [...kartu(id, x, y, 134, 64, warna, nama, 7.2), teks(`${id}-s`, x + 67, y + 56, ket, 7.2, W.biru)];

/* ------------------------------ 1. Peta empat metode luar ------------------------------ */
export const ADEGAN_LUAR_C_PEMBUKA: AdeganStory = {
  id: "luarc-pembuka",
  judul: "Empat metode luar untuk bilangan desimal",
  sumber: "Metode luar · peta empat metode",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk bilangan desimal. Tiap metode kita lihat konsepnya, lalu kita terapkan pada angka dari buku.",
      tambah(0, teks("jud", 150, 26, "Empat Metode Luar", 15, W.ungu)),
      tambah("metode", emo("alat", 150, 76, "🧰", 34)),
      tambah("konsepnya", kartu("kn", 40, 100, 100, 44, W.krem, ["konsep"], 11)),
      tambah("terapkan", kartu("tr", 160, 100, 100, 44, W.mint, ["terapan"], 11)),
    ),
    k(
      "Metode pertama, Equivalent Fraction to Tenths and Hundredths, menulis ulang pecahan agar penyebutnya 10 atau 100.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Empat Metode Luar", 14, W.ungu)),
      tambah("pertama", ...metode("m1", 10, 36, ["Equivalent Fraction to", "Tenths and Hundredths"], "penyebut jadi 10 atau 100", W.krem)),
      sorotkan("Equivalent", "m1-k"),
    ),
    k(
      "Metode kedua, Grid Tenths-Hundredths Link, menghubungkan pecahan dan desimal lewat kisi seratus petak.",
      tambah("kedua", ...metode("m2", 156, 36, ["Grid Tenths-", "Hundredths Link"], "kisi 100 petak", W.mint)),
      sorotkan("Grid", "m2-k"),
      ubah("kedua", { id: "m1-k", sorot: false }),
    ),
    k(
      "Metode ketiga, Decimal Place-Value Chart, menaruh tiap angka pada kolom nilai tempatnya.",
      tambah("ketiga", ...metode("m3", 10, 106, ["Decimal Place-", "Value Chart"], "tiap angka punya kolom", W.langit)),
      sorotkan("Decimal", "m3-k"),
      ubah("ketiga", { id: "m2-k", sorot: false }),
    ),
    k(
      "Metode keempat, Decimal Compare-and-Order, menyamakan angka di belakang koma lalu membandingkan dari kiri.",
      tambah("keempat", ...metode("m4", 156, 106, ["Decimal Compare-", "and-Order"], "samakan lalu bandingkan", W.mawar)),
      sorotkan("Compare-and-Order", "m4-k"),
      ubah("keempat", { id: "m3-k", sorot: false }),
    ),
  ],
};

/* ------------------------------ 2. Equivalent Fraction to Tenths and Hundredths: konsep ------------------------------ */
export const ADEGAN_LUAR_C_SENILAI: AdeganStory = {
  id: "luarc-senilai",
  judul: "Equivalent Fraction to Tenths and Hundredths: pecahan senilai",
  sumber: "Metode luar · Equivalent Fraction to Tenths and Hundredths",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Equivalent Fraction to Tenths and Hundredths berarti menulis pecahan dengan nilai sama, tetapi penyebutnya diubah menjadi 10 atau 100.",
      tambah(0, teks("jud", 150, 24, "Pecahan senilai, penyebut 10 atau 100", 11, W.ungu)),
      tambah("menulis", pecahan("a", 70, 90, "1", "2", 26), teks("ar", 106, 94, "=", 22)),
      tambah("penyebutnya", pecahan("b", 150, 90, "5", "10", 26, W.hijau), teks("ar2", 188, 94, "=", 22)),
      tambah("100", pecahan("c", 232, 90, "50", "100", 26, W.hijau)),
    ),
    k(
      "Langkah pertama, cari pengali. Bagi 10 atau 100 dengan penyebut. Untuk penyebut 5, pengalinya 2, karena 5 kali 2 sama dengan 10.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Langkah 1: cari pengali", 12, W.ungu)),
      tambah("Bagi", teks("l1", 150, 60, "10 : 5 = 2", 20)),
      tambah("pengalinya", pecahan("l2", 100, 130, "1 x 2", "5 x 2", 16), teks("l3", 150, 134, "=", 18), pecahan("l4", 200, 130, "2", "10", 18, W.hijau)),
    ),
    k(
      "Langkah kedua, kalikan pembilang dan penyebut dengan pengali yang sama. Dengan begitu nilai pecahan tidak berubah.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Langkah 2: kali atas dan bawah", 12, W.ungu)),
      tambah("pembilang", teks("m1", 90, 70, "atas x pengali", 11, W.merah), teks("m2", 90, 96, "bawah x pengali", 11, W.merah)),
      tambah("sama.", panah("mp", 160, 84, 50, 0, W.hijau, 2.5, { gambar: true }), teks("m3", 245, 88, "nilai sama", 11, W.hijau)),
    ),
    k(
      "Langkah ketiga, baca hasilnya sebagai desimal. Penyebut 10 memberi satu angka di belakang koma, penyebut 100 memberi dua angka.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Langkah 3: baca sebagai desimal", 12, W.ungu)),
      tambah("10", pecahan("n1", 70, 80, "2", "10", 20), teks("n1t", 110, 86, "= 0,2", 18, W.hijau), teks("n1k", 90, 120, "satu angka", 9, W.merah)),
      tambah("100", pecahan("n2", 200, 80, "25", "100", 20), teks("n2t", 252, 86, "= 0,25", 18, W.hijau), teks("n2k", 224, 120, "dua angka", 9, W.merah)),
    ),
    k(
      "Syaratnya, penyebut asli harus bisa menjadi 10 atau 100. Penyebut 2, 4, 5, 20, 25, dan 50 bisa. Penyebut 3 atau 6 tidak bisa.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Penyebut yang bisa", 12, W.ungu)),
      tambah("bisa", kartu("by", 20, 40, 120, 60, W.mint, ["bisa:", "2, 4, 5, 20, 25, 50"], 9)),
      tambah("tidak", kartu("bt", 160, 40, 120, 60, "#FEE2E2", ["tidak bisa:", "3, 6"], 9)),
    ),
  ],
};

/* ------------------------------ 3. Equivalent Fraction to Tenths and Hundredths: penerapan ------------------------------ */
export const ADEGAN_LUAR_C_SENILAI_TERAPAN: AdeganStory = {
  id: "luarc-senilai-terapan",
  judul: "Equivalent Fraction to Tenths and Hundredths: penerapan",
  sumber: "Metode luar · penerapan pada pecahan Latihan 1.3 dan Uji Kompetensi",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Penerapan pertama dari Latihan 1.3: kain tiga per empat meter. Penyebut 4 menjadi 100 dengan pengali 25, karena 100 dibagi 4 sama dengan 25.",
      tambah(0, teks("jud", 150, 24, "Latihan 1.3: 3/4 meter kain", 13, W.ungu)),
      tambah("Penyebut", teks("p1", 150, 56, "100 : 4 = 25", 16)),
      tambah("pengali", pecahan("p2", 70, 120, "3", "4", 22), teks("p3", 108, 126, "=", 18)),
    ),
    k(
      "Kalikan atas dan bawah dengan 25. Tiga kali 25 adalah 75, empat kali 25 adalah 100. Hasilnya 75 per 100.",
      tambah("Kalikan", pecahan("p4", 170, 120, "3 x 25", "4 x 25", 14), teks("p5", 222, 126, "=", 18)),
      tambah("hasilnya", pecahan("p6", 255, 120, "75", "100", 18, W.hijau)),
    ),
    k(
      "Dua angka di belakang koma, jadi tiga perempat sama dengan 0,75. Hasil ini sama dengan jawaban kunci Panduan Guru.",
      tambah("Dua", teks("p7", 150, 178, "3/4 = 0,75", 20, W.hijau)),
    ),
    k(
      "Penerapan kedua dari Uji Kompetensi nomor 5: empat per lima. Pengali penyebut 5 adalah 2, jadi 4 kali 2 per 5 kali 2 sama dengan 8 per 10.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "4/5 dari 5 4/5 meter persegi", 12, W.ungu)),
      tambah("Penerapan", pecahan("q1", 60, 100, "4", "5", 22), teks("q2", 94, 106, "=", 18)),
      tambah("pengali", pecahan("q3", 150, 100, "4 x 2", "5 x 2", 14), teks("q4", 196, 106, "=", 18)),
      tambah("10.", pecahan("q5", 240, 100, "8", "10", 22, W.hijau)),
    ),
    k(
      "Satu angka di belakang koma, jadi empat per lima sama dengan 0,8. Maka lima dan empat per lima sama dengan 5,8, tepat seperti kunci.",
      tambah("Satu", teks("q6", 150, 160, "4/5 = 0,8, jadi 5 4/5 = 5,8", 14, W.hijau)),
    ),
    k(
      "Bagaimana dengan satu per tiga? Penyebut 3 tidak bisa menjadi 10 atau 100. Metode ini tidak berlaku, maka kita bagi pembilang dengan penyebut dan dapat 0,3333 dan seterusnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "1/3 tidak bisa", 14, W.merah)),
      tambah("tiga", pecahan("r1", 70, 90, "1", "3", 24), teks("r2", 104, 96, "=", 18), teks("r3", 112, 96, "?", 22, W.merah, { anchor: "start" })),
      tambah("bagi", teks("r4", 150, 140, "1 : 3 = 0,3333...", 16, W.hijau)),
    ),
  ],
};
