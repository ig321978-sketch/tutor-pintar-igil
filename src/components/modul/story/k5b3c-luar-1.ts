import type { AdeganStory } from "./logika-story";
import { W, apel, emo, judul, kartu, rumus, sel, silang, teks } from "./k5b3c-gambar";
import { LUKAS, YOHANA } from "./k5b3c-materi-1";
import { bersih, k, tambah } from "./k5b3c-bantu";

/** Warna isi kotak yang diambil atau diberikan pada penerapan metode luar. */
const ABU = W.abu;

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk pengurangan pecahan",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 91–104",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana mengurangkan pecahan dengan tepat? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("mengurangkan", ...rumus("pr", 150, 52, "2/3 − 1/2 = ?", 16, W.biru, {}, false)),
      tambah("Guru", emo("pg", 150, 112, "🌍", 40)),
      tambah("empat", ...kartu("pq", 90, 140, 120, 38, W.krem, ["4 metode"], 14)),
    ),
    k(
      "Empat metode itu: Like Denominator Subtract, Common Denominator Subtract, Residual Area Model, dan Add-Up Check.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Like", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Like Denominator Subtract"], 9.6)),
      tambah("Common", ...kartu("m2", 20, 72, 260, 30, W.langit, ["2. Common Denominator Subtract"], 9.6)),
      tambah("Residual", ...kartu("m3", 20, 112, 260, 30, W.krem, ["3. Residual Area Model"], 9.6)),
      tambah("Add-Up", ...kartu("m4", 20, 152, 260, 30, W.pink, ["4. Add-Up Check"], 9.6)),
    ),
    k(
      "Semuanya bertumpu pada satu gagasan: mengurangi berarti mengambil sebagian dari keseluruhan, dan hanya potongan yang sama besar yang boleh dikurangkan.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("mengurangi", ...sel("g", 40, 56, 222, 40, 6, [0, 1, 2, 3, 4, 5], W.langit), teks("gt", 150, 116, "keseluruhan: 6 potongan sama besar", 9.6, W.biru)),
      tambah("mengambil", ...silang("g", 40, 56, 222, 40, 6, [4, 5]), teks("gu", 150, 140, "diambil: 2 potongan", 9.6, W.merah)),
      tambah("sama", teks("gv", 150, 170, "hanya potongan sama besar yang boleh dikurangkan", 9, W.hijau)),
    ),
    k(
      "Angkanya dari buku: kertas Yohana dan Lukas, delapan apel Asep, jarak ke sekolah, tali Komang, dan soal Uji Kompetensi.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("kertas", ...kartu("a1", 20, 32, 260, 30, W.langit, ["kertas Yohana dan Lukas"], 9.6)),
      tambah("apel", ...kartu("a2", 20, 72, 260, 30, W.hijauMuda, ["8 apel Asep"], 9.6)),
      tambah("jarak", ...kartu("a3", 20, 112, 260, 30, W.krem, ["jarak ke sekolah dan tali Komang"], 9.6)),
      tambah("Uji", ...kartu("a4", 20, 152, 260, 30, W.pink, ["soal Uji Kompetensi 3, 4, 6, 10"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Like Denominator Subtract: konsep ------------------------------ */
export const ADEGAN_LUAR_LDS: AdeganStory = {
  id: "luar-lds",
  judul: "Like Denominator Subtract: penyebut sama, kurangi pembilang",
  sumber: "Metode luar: Like Denominator Subtract",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Like Denominator Subtract, artinya mengurangi pecahan sepenyebut. Potongannya sama besar, jadi cukup mengurangi banyak potongan, yaitu pembilangnya.",
      tambah(0, judul("Like Denominator Subtract")),
      tambah("Metode", ...sel("lk", 40, 40, 222, 38, 5, [0, 1, 2, 3], W.langit)),
      tambah("Potongannya", ...silang("lk", 40, 40, 222, 38, 5, [3])),
      tambah("pembilangnya.", ...rumus("lr", 150, 128, "4/5 − 1/5 = 3/5", 22)),
    ),
    k(
      "Aturannya: pembilang dikurangi pembilang, penyebut tetap. Penyebut hanya memberi nama potongan, seperti lima bagian sama besar. Yang berubah cuma banyaknya potongan.",
      bersih(0),
      tambah(0, judul("Penyebut tetap")),
      tambah("pembilang", ...rumus("lr", 150, 56, "4/5 − 1/5 = 3/5", 22)),
      tambah("tetap.", ...kartu("l1", 20, 100, 124, 40, W.langit, ["pembilang:", "4 − 1 = 3"], 9.6)),
      tambah("Yang", ...kartu("l2", 156, 100, 124, 40, W.hijauMuda, ["penyebut tetap:", "5 bagian"], 9.6)),
    ),
    k(
      "Langkahnya dua: pastikan penyebut sama, lalu kurangi pembilangnya. Kalau hasilnya bisa disederhanakan, sederhanakan.",
      bersih(0),
      tambah(0, judul("Dua langkah")),
      tambah("pastikan", ...kartu("p1", 20, 34, 260, 34, W.langit, ["1. pastikan penyebut sama"], 9.6)),
      tambah("kurangi", ...kartu("p2", 20, 78, 260, 34, W.hijauMuda, ["2. kurangi pembilangnya"], 9.6)),
      tambah("disederhanakan,", ...kartu("p3", 20, 122, 260, 30, W.krem, ["bila bisa, sederhanakan"], 9.6), ...rumus("p3r", 150, 172, "4/8 = 1/2", 14)),
    ),
    k(
      "Kelebihannya cepat dan jarang salah hitung. Kekurangannya hanya berlaku bila penyebut sudah sama; kalau berbeda, perlu metode lain.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya", ...kartu("kl", 14, 40, 130, 54, W.hijauMuda, ["cepat dan", "jarang salah hitung"], 9), emo("kle", 79, 120, "👍", 24)),
      tambah("Kekurangannya", ...kartu("kk", 156, 40, 130, 54, W.merahMuda, ["hanya untuk", "penyebut yang sama"], 9), emo("kke", 221, 120, "🤔", 24)),
    ),
  ],
};

/* ------------------------------ 3. Like Denominator Subtract: penerapan ------------------------------ */
export const ADEGAN_LUAR_LDS_TERAPAN: AdeganStory = {
  id: "luar-lds-terapan",
  judul: "Like Denominator Subtract pada soal buku",
  sumber: "Metode luar: Like Denominator Subtract; Buku Siswa hlm. 91, 101, 104",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Eksplorasi tiga titik tiga A: Lukas melukis dua per tiga kertas dan sudah mengerjakan satu per tiga. Penyebutnya sama, jadi dua dikurangi satu sama dengan satu, hasilnya satu per tiga.",
      tambah(0, judul("Eksplorasi 3.3A: kertas Lukas")),
      tambah("Eksplorasi", ...sel("tk", 40, 44, 222, 34, 3, [0, 1], W.langit)),
      tambah("sudah", ...silang("tk", 40, 44, 222, 34, 3, [0])),
      tambah("Penyebutnya", ...rumus("tr", 150, 124, "2/3 − 1/3 = 1/3", 22)),
    ),
    k(
      "Ayo Berlatih soal b: dua per tujuh dikurangi satu per tujuh. Dua dikurangi satu sama dengan satu, penyebut tetap tujuh. Hasilnya satu per tujuh.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 1b")),
      tambah("Ayo", ...sel("ay", 40, 44, 222, 30, 7, [0, 1], W.langit)),
      tambah("Dua@2", ...silang("ay", 40, 44, 222, 30, 7, [0])),
      tambah("Hasilnya", ...rumus("ar", 150, 124, "2/7 − 1/7 = 1/7", 22)),
    ),
    k(
      "Uji Kompetensi empat: satu satu per delapan dikurangi satu per delapan. Meski campuran, penyebutnya sama. Pecahan satu per delapan habis, tinggal satu bulat.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 4")),
      tambah("dikurangi", ...rumus("ur", 150, 70, "1 1/8 − 1/8 = 1", 22)),
      tambah("Meski", ...rumus("us", 150, 124, "9/8 − 1/8 = 8/8 = 1", 18)),
      tambah("tinggal", ...kartu("uk", 70, 158, 160, 30, W.hijauMuda, ["sisa bika Ambon: 1 bulat"], 9.6)),
    ),
    k(
      "Apel Lukas: enam per delapan dikurangi dua per delapan. Penyebutnya sama, jadi enam dikurangi dua sama dengan empat. Hasilnya empat per delapan, atau setengah.",
      bersih(0),
      tambah(0, judul("Eksplorasi 3.3B: apel Lukas")),
      tambah("Apel", ...apel("ap", 80, 50, (i) => (YOHANA.includes(i) ? ABU : LUKAS.includes(i) ? W.hijau : W.putih))),
      tambah("Penyebutnya", ...rumus("pr", 150, 128, "6/8 − 2/8 = 4/8 = 1/2", 19)),
    ),
  ],
};

/* ------------------------------ 4. Common Denominator Subtract: konsep ------------------------------ */
export const ADEGAN_LUAR_CDS: AdeganStory = {
  id: "luar-cds",
  judul: "Common Denominator Subtract: samakan penyebut lewat KPK",
  sumber: "Metode luar: Common Denominator Subtract",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Common Denominator Subtract. Bila penyebut berbeda, cari penyebut persekutuan, biasanya lewat KPK, lalu ubah kedua pecahan ke penyebut itu.",
      tambah(0, judul("Common Denominator Subtract")),
      tambah("Bila", ...rumus("cr", 150, 52, "1/2 − 1/3", 24, W.biru, {}, false)),
      tambah("KPK,", ...kartu("ck", 70, 100, 160, 30, W.krem, ["KPK dari 2 dan 3 = 6"], 9.6)),
      tambah("ubah", ...rumus("cs", 150, 156, "3/6 − 2/6", 24, W.biru, {}, false)),
    ),
    k(
      "Mengapa? Potongan yang ukurannya berbeda tidak bisa langsung dikurangkan, seperti mengurangi apel dengan jeruk. Setelah penyebutnya sama, potongannya sama besar.",
      bersih(0),
      tambah(0, judul("Mengapa disamakan?")),
      tambah("apel", emo("ca", 90, 86, "🍎", 36), teks("cm", 150, 80, "−", 24, W.biru), emo("cj", 210, 86, "🍊", 36)),
      tambah("langsung", emo("cx", 150, 128, "❌", 24)),
      tambah("Setelah", ...sel("cb", 40, 146, 222, 28, 6, [0, 1, 2], W.langit), teks("cc", 150, 192, "6 potongan sama besar", 9, W.hijau)),
    ),
    k(
      "Langkahnya tiga: cari KPK dari penyebut, ubah menjadi pecahan senilai, lalu kurangi pembilangnya.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("cari", ...kartu("q1", 20, 34, 260, 32, W.hijauMuda, ["1. cari KPK dari penyebut"], 9.6)),
      tambah("ubah", ...kartu("q2", 20, 76, 260, 32, W.langit, ["2. ubah ke pecahan senilai"], 9.6)),
      tambah("kurangi", ...kartu("q3", 20, 118, 260, 32, W.krem, ["3. kurangi pembilangnya"], 9.6)),
    ),
    k(
      "Kelebihannya berlaku untuk semua pecahan. Kekurangannya perlu mencari KPK dan pecahan senilai, sehingga lebih panjang.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya", ...kartu("kl", 14, 40, 130, 54, W.hijauMuda, ["berlaku untuk", "semua pecahan"], 9), emo("kle", 79, 120, "👍", 24)),
      tambah("Kekurangannya", ...kartu("kk", 156, 40, 130, 54, W.merahMuda, ["perlu KPK dan", "pecahan senilai"], 9), emo("kke", 221, 120, "🤔", 24)),
    ),
  ],
};

/* ------------------------------ 5. Common Denominator Subtract: penerapan ------------------------------ */
export const ADEGAN_LUAR_CDS_TERAPAN: AdeganStory = {
  id: "luar-cds-terapan",
  judul: "Common Denominator Subtract pada soal buku",
  sumber: "Metode luar: Common Denominator Subtract; Buku Siswa hlm. 98–102, 103",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Masalah Yohana: dua per tiga dikurangi satu per dua. KPK dari tiga dan dua adalah enam. Dua per tiga menjadi empat per enam, satu per dua menjadi tiga per enam. Selisihnya satu per enam.",
      tambah(0, judul("Masalah Yohana")),
      tambah("KPK", teks("kp", 150, 48, "KPK dari 3 dan 2 = 6", 10, W.coklat)),
      tambah("Dua@4", ...rumus("r", 150, 100, "2/3 − 1/2 = 4/6 − 3/6 = 1/6", 19)),
    ),
    k(
      "Uji Kompetensi tiga: tiga per sepuluh dikurangi satu per delapan. KPK dari sepuluh dan delapan adalah empat puluh. Hasilnya dua belas per empat puluh dikurangi lima per empat puluh, yaitu tujuh per empat puluh.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 3")),
      tambah("KPK", teks("kp", 150, 48, "KPK dari 10 dan 8 = 40", 10, W.coklat)),
      tambah("Hasilnya", ...rumus("r", 150, 100, "3/10 − 1/8 = 12/40 − 5/40 = 7/40", 17)),
    ),
    k(
      "Ayo Berlatih soal d: satu per tiga dikurangi satu per lima. KPK-nya lima belas, jadi lima per lima belas dikurangi tiga per lima belas sama dengan dua per lima belas.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 1d")),
      tambah("KPK-nya", teks("kp", 150, 48, "KPK dari 3 dan 5 = 15", 10, W.coklat)),
      tambah("jadi", ...rumus("r", 150, 100, "1/3 − 1/5 = 5/15 − 3/15 = 2/15", 17)),
    ),
    k(
      "Pecahan campuran, tali Komang: empat setengah dikurangi dua satu per tiga. Ubah ke pecahan biasa, sembilan per dua dan tujuh per tiga, lalu samakan penyebut menjadi enam.",
      bersih(0),
      tambah(0, judul("Tali Komang 1")),
      tambah("Pecahan", ...rumus("r", 150, 76, "4 1/2 − 2 1/3 = 9/2 − 7/3", 18)),
      tambah("samakan", ...rumus("s", 150, 140, "9/2 − 7/3 = 27/6 − 14/6", 18)),
    ),
    k(
      "Dua puluh tujuh per enam dikurangi empat belas per enam sama dengan tiga belas per enam, yaitu dua satu per enam meter. Komang perlu membeli dua satu per enam meter tali.",
      bersih(0),
      tambah(0, judul("Tali Komang 2")),
      tambah("Dua", ...rumus("r", 150, 86, "27/6 − 14/6 = 13/6 = 2 1/6", 20)),
      tambah("Komang", ...kartu("k", 50, 130, 200, 34, W.hijauMuda, ["tali yang dibeli: 2 1/6 m"], 9.6)),
    ),
  ],
};
