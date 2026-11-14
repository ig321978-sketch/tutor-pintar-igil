import type { AdeganStory } from "./logika-story";
import { W, barisSel, emo, judul, kartu, kotak, teks } from "./k5b2d-gambar";
import { bersih, k, tambah, ubah } from "./k5b2d-bantu";

/** Warna sel: emas bila bilangannya ada di daftar `sama`, selain itu `dasar`. */
const warnaSama = (isi: number[], sama: number[], dasar: string): string[] => isi.map((n) => (sama.includes(n) ? W.emas : dasar));
/** Perintah ubah warna sel sebuah baris (id `${id}-${i}`) menurut daftar isi dan daftar bilangan yang sama. */
const ubahSama = (id: string, isi: number[], sama: number[], dasar: string) => isi.map((n, i) => ({ id: `${id}-${i}`, warna: sama.includes(n) ? W.emas : dasar }));

/* ------------------------------ 9. Eksplorasi 2.4B: hasil dan diskusi (Buku Siswa hlm. 52; Panduan Guru hlm. 73 dan 74) ------------------------------ */
const F24 = [1, 2, 3, 4, 6, 8, 12, 24];
const F18 = [1, 2, 3, 6, 9, 18];
export const ADEGAN_EKS_B_HASIL: AdeganStory = {
  id: "eks-24b-hasil",
  judul: "Eksplorasi 2.4B: faktor persekutuan, FPB, dan jumlah vas",
  sumber: "Buku Siswa hlm. 52; Panduan Guru hlm. 73–74",
  latar: "#F0FDF4",
  kutipan: [
    "Coba kita perhatikan Tabel 2.2.",
    "Bilangan 2, 3, dan 6 adalah faktor persekutuan dari 18 dan 24.",
    "Bilangan 6 adalah FPB dari 24 dan 18.",
    "Jadi, Nisa dapat membagi bunga-bunga tersebut tersebut paling banyak ke dalam 6 buah vas.",
    "Setiap vas berisi 4 tangkai bunga mawar merah dan 3 tangkai bunga mawar putih.",
    "Ayo Berdiskusi",
    "Coba pikirkan, bagaimana hubungan faktor bilangan dengan cara pembagian benda seperti pada Eksplorasi 2.4B?",
    "Dengan demikian, 6 adalah faktor persekutuan terbesar dari 18 dan 24.",
    "Saat menyelesaikan permasalahan terkait pembagian barang, maka wadah",
    "yang dibutuhkan paling banyak sama saja dengan FPB dari banyaknya bilangan",
    "yang akan dibagi. Kata kuncinya adalah",
  ],
  ketukan: [
    k(
      "Perhatikan Tabel dua titik dua. Bilangan dua, tiga, dan enam adalah faktor persekutuan dari delapan belas dan dua puluh empat. Bilangan enam adalah FPB dari dua puluh empat dan delapan belas.",
      tambah("Perhatikan", teks("lb1", 22, 66, "24", 11, W.merah), ...barisSel("a", 40, 50, 31, 22, F24, W.merahMuda, 9.4), teks("lb2", 22, 108, "18", 11, W.hijau), ...barisSel("b", 40, 92, 31, 22, F18, W.hijauMuda, 9.4)),
      ubah("persekutuan", ...ubahSama("a", F24, [2, 3, 6], W.merahMuda), ...ubahSama("b", F18, [2, 3, 6], W.hijauMuda)),
      tambah("FPB", teks("fb", 150, 150, "FPB dari 24 dan 18 adalah 6", 12, W.coklat)),
    ),
    k(
      "Catatan guru: buku tidak menyebut satu, padahal satu juga faktor persekutuan keduanya. Daftar lengkapnya satu, dua, tiga, dan enam.",
      ubah("padahal", ...ubahSama("a", F24, [1, 2, 3, 6], W.merahMuda), ...ubahSama("b", F18, [1, 2, 3, 6], W.hijauMuda)),
      tambah("Daftar", teks("fc", 150, 176, "lengkap: 1, 2, 3, 6", 10.4, W.hitam)),
    ),
    k(
      "Jadi Nisa dapat membagi bunga paling banyak ke dalam enam vas. Setiap vas berisi empat tangkai mawar merah dan tiga tangkai mawar putih.",
      bersih(0),
      tambah(0, judul("Hasil: enam vas")),
      tambah("enam", ...Array.from({ length: 6 }, (_, i) => kotak(`vs${i}`, 14 + i * 46, 50, 42, 56, W.krem, W.coklat, { rx: 8 })), teks("vn", 150, 138, "6 vas", 16, W.coklat)),
      tambah("empat", ...Array.from({ length: 6 }, (_, i) => teks(`vm${i}`, 35 + i * 46, 74, "4 merah", 7.6, W.merah))),
      tambah("tiga", ...Array.from({ length: 6 }, (_, i) => teks(`vp${i}`, 35 + i * 46, 94, "3 putih", 7.6, W.hitam))),
    ),
    k(
      "Kita periksa: enam kali empat sama dengan dua puluh empat mawar merah, dan enam kali tiga sama dengan delapan belas mawar putih.",
      bersih(0),
      tambah(0, judul("Periksa hasilnya")),
      tambah("enam", teks("pe1", 150, 70, "6 × 4 = 24", 20, W.merah), teks("pe2", 150, 90, "mawar merah", 9.4, W.hitam)),
      tambah("enam@2", teks("pe3", 150, 128, "6 × 3 = 18", 20, W.hijau), teks("pe4", 150, 148, "mawar putih", 9.4, W.hitam)),
      tambah("putih.", teks("pe5", 150, 182, "semua bunga habis terpakai", 10, W.coklat)),
    ),
    k(
      "Kata kuncinya adalah paling banyak. Menurut Panduan Guru, wadah yang dibutuhkan paling banyak sama saja dengan FPB dari banyaknya bilangan yang akan dibagi.",
      bersih(0),
      tambah(0, judul("Kata kunci: paling banyak")),
      tambah("kuncinya", ...kartu("kk", 40, 44, 220, 40, W.emas, ["kata kunci:", "paling banyak"], 10.4)),
      tambah("wadah", ...kartu("kw", 20, 104, 260, 44, W.hijauMuda, ["wadah paling banyak", "sama dengan FPB banyak benda"], 9.4)),
    ),
    k(
      "Ayo Berdiskusi: apa hubungan faktor dengan pembagian benda? Banyak vas adalah faktor banyak bunga; yang cocok untuk kedua jenis bunga adalah faktor persekutuan, yang terbesar memberi vas terbanyak.",
      bersih(0),
      tambah(0, judul("Ayo Berdiskusi")),
      tambah("hubungan", ...kartu("d1", 20, 40, 260, 34, W.langit, ["banyak vas: faktor dari banyak bunga"], 9)),
      tambah("kedua", ...kartu("d2", 20, 84, 260, 34, W.krem, ["cocok untuk keduanya: faktor persekutuan"], 9)),
      tambah("terbesar", ...kartu("d3", 20, 128, 260, 34, W.hijauMuda, ["terbesar: vas paling banyak"], 9.4)),
      tambah("terbanyak.", teks("d4", 150, 182, "buku tanpa kunci: penjelasan dari tabel", 8.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 1 (Buku Siswa hlm. 52; Panduan Guru hlm. 75) ------------------------------ */
const F15 = [1, 3, 5, 15];
const F35 = [1, 5, 7, 35];
const F12 = [1, 2, 3, 4, 6, 12];
const F42 = [1, 2, 3, 6, 7, 14, 21, 42];
export const ADEGAN_BERLATIH_1: AdeganStory = {
  id: "berlatih-1",
  judul: "Ayo Berlatih nomor 1: FPB dua bilangan",
  sumber: "Buku Siswa hlm. 52; Panduan Guru hlm. 75–76",
  latar: "#FEFCE8",
  kutipan: [
    "Ayo Berlatih",
    "Temukan faktor persekutuan terbesar (FPB) dari bilangan-bilangan berikut.",
    "a. 15 dan 35",
    "b. 12 dan 42",
    "1, 3, 5, 15 1, 5, 7, 35 1, 5 5",
    "1, 2, 3, 4, 6, 12 1, 2, 3, 6, 7, 14, 21, 42 1, 2, 3, 6 6",
  ],
  ketukan: [
    k(
      "Ayo Berlatih nomor satu: temukan FPB dari lima belas dan tiga puluh lima. Faktor lima belas adalah satu, tiga, lima, dan lima belas. Faktor tiga puluh lima adalah satu, lima, tujuh, dan tiga puluh lima.",
      tambah(0, judul("Berlatih 1a: 15 dan 35")),
      tambah("Faktor", teks("n1", 26, 70, "15", 11, W.merah), ...barisSel("n15", 54, 54, 48, 26, F15, W.merahMuda, 11)),
      tambah("Faktor@2", teks("n2", 26, 118, "35", 11, W.hijau), ...barisSel("n35", 54, 102, 48, 26, F35, W.hijauMuda, 11)),
    ),
    k(
      "Faktor persekutuan lima belas dan tiga puluh lima adalah satu dan lima. Maka FPB-nya adalah lima.",
      ubah("persekutuan", ...ubahSama("n15", F15, [1, 5], W.merahMuda), ...ubahSama("n35", F35, [1, 5], W.hijauMuda)),
      tambah("FPB-nya", teks("n3", 150, 168, "FPB dari 15 dan 35 adalah 5", 12, W.coklat)),
    ),
    k(
      "Soal b: dua belas dan empat puluh dua. Faktor dua belas adalah satu, dua, tiga, empat, enam, dan dua belas. Faktor empat puluh dua adalah satu, dua, tiga, enam, tujuh, empat belas, dua puluh satu, dan empat puluh dua.",
      bersih(0),
      tambah(0, judul("Berlatih 1b: 12 dan 42")),
      tambah("Faktor", teks("o1", 24, 74, "12", 11, W.merah), ...barisSel("o12", 40, 58, 36, 26, F12, W.merahMuda, 10.4)),
      tambah("Faktor@2", teks("o2", 24, 122, "42", 11, W.hijau), ...barisSel("o42", 40, 106, 31, 26, F42, W.hijauMuda, 10)),
    ),
    k(
      "Faktor persekutuannya satu, dua, tiga, dan enam, sehingga FPB dua belas dan empat puluh dua adalah enam, sesuai kunci halaman tujuh puluh lima.",
      ubah("persekutuannya", ...ubahSama("o12", F12, [1, 2, 3, 6], W.merahMuda), ...ubahSama("o42", F42, [1, 2, 3, 6], W.hijauMuda)),
      tambah("sehingga", teks("o3", 150, 164, "FPB dari 12 dan 42 adalah 6", 12, W.coklat)),
      tambah("Kunci", teks("o4", 150, 184, "kunci: Panduan Guru hlm. 75", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berlatih nomor 2: paket ulang tahun Dania (Buku Siswa hlm. 53; Panduan Guru hlm. 76) ------------------------------ */
const P_SUSU = [36, 18, 12, 9, 6, 4, 3, 2, 1];
const P_PERMEN = [48, 24, 16, 12, 8, 6, 4, 3, 2, 1];
const P_BISKUIT = [24, 12, 8, 6, 4, 3, 2, 1];
const P_SAMA = [12, 6, 4, 3, 2, 1];
export const ADEGAN_BERLATIH_2: AdeganStory = {
  id: "berlatih-2",
  judul: "Ayo Berlatih nomor 2: paket ulang tahun Dania",
  sumber: "Buku Siswa hlm. 53; Panduan Guru hlm. 76",
  latar: "#FDF2F8",
  kutipan: [
    "Dania akan merayakan ulang tahun.",
    "Setiap paket berisi susu kotak, permen lolipop, dan biskuit.",
    "Banyaknya jenis barang pada setiap paket sama.",
    "Ia memiliki 36 susu kotak, 48 permen lolipop, dan 24 bungkus biskuit.",
    "Berapa paket paling banyak yang dapat dibuat?",
    "(Jumlah: 36 kotak)",
    "Banyaknya paket yang dapat dibuat 36 18 12 9 6 4 3 2 1",
    "(Jumlah: 48 kotak)",
    "Banyaknya paket yang dapat dibuat 48 24 16 12 8 6 4 3 2 1",
    "(Jumlah: 24 kotak)",
    "Banyaknya paket yang dapat dibuat 24 12 8 6 4 3 2 1",
    "Jadi, paling banyak dapat dibuat 12 paket bingkisan ulang tahun dengan setiap",
    "paket berisi 3 buah susu kotak, 4 buah permen, dan 2 bungkus biskuit.",
  ],
  ketukan: [
    k(
      "Nomor dua. Dania membuat bingkisan ulang tahun. Tiap paket berisi susu kotak, permen lolipop, dan biskuit dengan isi sama. Ia punya tiga puluh enam susu, empat puluh delapan permen, dan dua puluh empat biskuit. Berapa paket paling banyak?",
      tambah(0, judul("Paket ulang tahun Dania")),
      tambah("susu", emo("d1e", 38, 66, "🥛", 26), ...kartu("d1", 64, 40, 216, 34, W.langit, ["36 susu kotak"], 10)),
      tambah("permen", emo("d2e", 38, 110, "🍭", 26), ...kartu("d2", 64, 84, 216, 34, W.pink, ["48 permen lolipop"], 10)),
      tambah("biskuit.", emo("d3e", 38, 154, "🍪", 26), ...kartu("d3", 64, 128, 216, 34, W.krem, ["24 bungkus biskuit"], 10)),
      tambah("paling", teks("q2", 150, 190, "FPB dari 36, 48, dan 24 ?", 11, W.merah)),
    ),
    k(
      "Tabel kunci untuk susu kotak. Susu di tiap paket: satu, dua, tiga, empat, enam, sembilan, dua belas, delapan belas, tiga puluh enam. Paket yang dapat dibuat: tiga puluh enam, delapan belas, dua belas, sembilan, enam, empat, tiga, dua, satu.",
      bersih(0),
      tambah(0, judul("Tabel: 36 susu kotak")),
      tambah("Susu@2", teks("s1", 21, 80, "per paket", 7, W.hitam), ...barisSel("sa", 42, 64, 28, 24, [1, 2, 3, 4, 6, 9, 12, 18, 36], W.langit, 9)),
      tambah("paket@2", teks("s2", 21, 108, "paket", 7, W.hitam), ...barisSel("sb", 42, 92, 28, 24, P_SUSU, W.putih, 9)),
    ),
    k(
      "Tabel permen dan biskuit dibuat dengan cara yang sama. Jumlah paket yang muncul di ketiga tabel hanya dua belas, enam, empat, tiga, dua, dan satu. Yang terbanyak adalah dua belas.",
      bersih(0),
      tambah(0, judul("Jumlah paket di ketiga tabel")),
      tambah("Tabel", teks("pl1", 30, 44, "susu: paket yang dapat dibuat", 8.4, W.hitam, { anchor: "start" }), ...barisSel("ra", 30, 48, 26, 20, P_SUSU, warnaSama(P_SUSU, P_SAMA, W.putih), 8.6)),
      tambah("permen", teks("pl2", 30, 82, "permen: paket yang dapat dibuat", 8.4, W.hitam, { anchor: "start" }), ...barisSel("rb", 30, 86, 26, 20, P_PERMEN, warnaSama(P_PERMEN, P_SAMA, W.putih), 8.6)),
      tambah("biskuit", teks("pl3", 30, 120, "biskuit: paket yang dapat dibuat", 8.4, W.hitam, { anchor: "start" }), ...barisSel("rc", 30, 124, 26, 20, P_BISKUIT, warnaSama(P_BISKUIT, P_SAMA, W.putih), 8.6)),
      tambah("terbanyak", teks("pl4", 150, 172, "yang terbanyak: 12 paket", 12, W.coklat)),
    ),
    k(
      "Jadi paling banyak dapat dibuat dua belas paket. Setiap paket berisi tiga susu kotak, empat permen lolipop, dan dua bungkus biskuit.",
      bersih(0),
      tambah(0, judul("Hasil: dua belas paket")),
      tambah("dua", ...Array.from({ length: 12 }, (_, i) => kotak(`pk${i}`, 14 + (i % 6) * 46, 40 + Math.floor(i / 6) * 48, 42, 40, W.krem, W.coklat, { rx: 7 }))),
      tambah("tiga", ...Array.from({ length: 12 }, (_, i) => teks(`pt${i}`, 35 + (i % 6) * 46, 64 + Math.floor(i / 6) * 48, "3-4-2", 9, W.hitam))),
      tambah("Setiap", teks("pu", 150, 150, "12 paket: tiap paket 3 susu, 4 permen, 2 biskuit", 8.6, W.hijau)),
    ),
    k(
      "Catatan guru: kunci menulis permen empat puluh delapan kotak dan biskuit dua puluh empat kotak, padahal satuannya buah dan bungkus. Hitungannya tetap benar.",
      bersih(0),
      tambah(0, judul("Catatan kunci")),
      tambah("kunci", ...kartu("ck", 20, 40, 260, 36, W.merahMuda, ["kunci menulis: 48 kotak dan 24 kotak"], 9)),
      tambah("padahal", ...kartu("cs", 20, 86, 260, 36, W.hijauMuda, ["satuannya: buah dan bungkus"], 9.4)),
      tambah("Hitungannya", teks("c1", 150, 146, "12 × 3 = 36", 12, W.hijau), teks("c2", 150, 164, "12 × 4 = 48", 12, W.hijau), teks("c3", 150, 182, "12 × 2 = 24", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 12. Penutup: miskonsepsi, diferensiasi, dan refleksi (Panduan Guru hlm. 74 dan 75; Buku Siswa hlm. 60) ------------------------------ */
export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup-guru",
  judul: "Miskonsepsi, diferensiasi, dan refleksi Subbab D",
  sumber: "Panduan Guru hlm. 74–75; Buku Siswa hlm. 60",
  latar: "#F5F3FF",
  kutipan: [
    "Miskonsepsi",
    "Pemahaman peserta didik sering terbalik antara konsep faktor dan kelipatan",
    "yang dicari justru kelipatan yang dicari",
    "sering kali peserta didik keliru antara konsep KPK dan FPB.",
    "dapat disajikan dua buah bilangan dan dituliskan FPB-nya, tetapi sebenarnya yang dituliskan adalah KPK-",
    "peserta didik diminta untuk menganalisis tepat atau tidaknya",
    "Diferensiasi",
    "Peserta didik dengan kecepatan belajar tinggi (advanced) dapat diminta",
    "untuk mengerjakan latihan tanpa bantuan.",
    "Tentukan FPB dari kelompok bilangan berikut.",
    "a. 48 dan 60",
    "b. 60 dan 120",
    "c. 54, 72, dan 120",
    "Nyatakan pernyataan berikut benar atau salah.",
    "FPB dari 30 dan 90 adalah 90.",
    "FPB dari 42 dan 60 adalah 6.",
    "Bilangan 23 dan 27 tidak mempunyai FPB.",
    "melakukan releksi atas apa yang sudah mereka pelajari.",
    "Releksi dilakukan dengan menjawab pertanyaan releksi nomor 5, 6, dan 7 pada tabel releksi di buku siswa.",
    "Aku dapat menemukan faktor persekutuan dua",
    "bilangan atau lebih.",
    "Aku dapat menyelesaikan masalah menggunakan",
    "KPK dan FPB.",
  ],
  ketukan: [
    k(
      "Miskonsepsi pertama: peserta didik terbalik antara faktor dan kelipatan, sehingga yang dicari justru kelipatan, padahal seharusnya faktor.",
      tambah(0, judul("Miskonsepsi 1: faktor atau kelipatan")),
      tambah("terbalik", ...kartu("m1", 20, 44, 260, 40, W.hijauMuda, ["faktor 12: 1, 2, 3, 4, 6, 12", "(membagi habis 12)"], 9)),
      tambah("kelipatan,", ...kartu("m2", 20, 100, 260, 40, W.merahMuda, ["kelipatan 12: 12, 24, 36, ...", "(bukan yang dicari)"], 9)),
    ),
    k(
      "Miskonsepsi kedua: keliru antara KPK dan FPB. Guru dapat menyajikan dua bilangan dengan FPB tertulis, padahal sebenarnya KPK, lalu meminta peserta didik menganalisis tepat atau tidaknya.",
      bersih(0),
      tambah(0, judul("Miskonsepsi 2: KPK atau FPB")),
      tambah("menyajikan", ...kartu("x1", 20, 44, 260, 36, W.krem, ["FPB dari 12 dan 18 adalah 36 ?"], 10)),
      tambah("menganalisis", ...kartu("x2", 20, 94, 260, 40, W.hijauMuda, ["salah: 36 adalah KPK", "FPB 12 dan 18 adalah 6"], 9.4)),
      tambah("tidaknya.", teks("x3", 150, 166, "contoh kita sendiri", 9, W.coklat)),
    ),
    k(
      "Diferensiasi, soal tambahan satu: FPB dari empat puluh delapan dan enam puluh, enam puluh dan seratus dua puluh, serta lima puluh empat, tujuh puluh dua, dan seratus dua puluh.",
      bersih(0),
      tambah(0, judul("Diferensiasi: soal tambahan 1")),
      tambah("empat", teks("df1", 90, 70, "a. 48 dan 60", 13, W.hitam)),
      tambah("enam@2", teks("df2", 90, 104, "b. 60 dan 120", 13, W.hitam)),
      tambah("serta", teks("df3", 90, 138, "c. 54, 72, dan 120", 13, W.hitam)),
    ),
    k(
      "Kunci buku tidak ada. Hitungan mandiri kita: FPB-nya dua belas, enam puluh, dan enam.",
      tambah("belas,", teks("dg1", 235, 70, "FPB 12", 11, W.hijau)),
      tambah("puluh,", teks("dg2", 235, 104, "FPB 60", 11, W.hijau)),
      tambah("enam@2", teks("dg3", 235, 138, "FPB 6", 11, W.hijau)),
      tambah("Kunci", teks("dg4", 150, 182, "kunci: hitungan mandiri", 9, W.coklat)),
    ),
    k(
      "Soal tambahan dua, benar atau salah. A: FPB tiga puluh dan sembilan puluh adalah sembilan puluh. B: FPB empat puluh dua dan enam puluh adalah enam. C: dua puluh tiga dan dua puluh tujuh tidak mempunyai FPB.",
      bersih(0),
      tambah(0, judul("Soal tambahan 2: benar atau salah")),
      tambah("sembilan", ...kartu("bs1", 20, 40, 260, 34, W.langit, ["A. FPB dari 30 dan 90 adalah 90"], 9.4)),
      tambah("empat", ...kartu("bs2", 20, 84, 260, 34, W.krem, ["B. FPB dari 42 dan 60 adalah 6"], 9.4)),
      tambah("tujuh", ...kartu("bs3", 20, 128, 260, 34, W.pink, ["C. 23 dan 27 tidak mempunyai FPB"], 9.4)),
    ),
    k(
      "Hitungan mandiri: A salah, FPB-nya tiga puluh. B benar, FPB-nya enam. C salah: FPB-nya satu, sebab dua bilangan apa pun selalu punya FPB.",
      bersih(0),
      tambah(0, judul("Hitungan mandiri soal tambahan 2")),
      tambah("tiga", teks("bj1", 150, 70, "A salah: FPB-nya 30", 13, W.merah)),
      tambah("enam.", teks("bj2", 150, 108, "B benar: FPB-nya 6", 13, W.hijau)),
      tambah("satu;", teks("bj3", 150, 146, "C salah: FPB-nya 1", 13, W.merah)),
    ),
    k(
      "Terakhir, Refleksi nomor lima, enam, dan tujuh: aku dapat menemukan faktor persekutuan, aku dapat menemukan FPB, dan aku dapat menyelesaikan masalah memakai KPK dan FPB.",
      bersih(0),
      tambah(0, judul("Refleksi nomor 5, 6, dan 7")),
      tambah("lima,", ...kartu("rf1", 20, 40, 260, 34, W.hijauMuda, ["5. aku dapat menemukan faktor persekutuan"], 8.6)),
      tambah("enam,", ...kartu("rf2", 20, 84, 260, 34, W.langit, ["6. aku dapat menemukan FPB"], 9.4)),
      tambah("tujuh:", ...kartu("rf3", 20, 128, 260, 34, W.krem, ["7. aku dapat menyelesaikan masalah KPK dan FPB"], 8.4)),
    ),
  ],
};
