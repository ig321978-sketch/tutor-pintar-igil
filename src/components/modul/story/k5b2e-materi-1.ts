import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, saringan, tabel, teks, bulat, warnaiSaringan } from "./k5b2e-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b2e-bantu";

/** Faktor suatu bilangan, dihitung dari definisinya (dipakai tabel faktor bilangan 1 sampai 10, Panduan Guru hlm. 78). */
export const faktorDari = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);

/** Bilangan prima di bawah 100 menurut Panduan Guru hlm. 78. */
export const PRIMA_100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

/** Kelipatan n yang lebih besar dari n sampai 100. */
const kelipatan = (n: number): number[] => Array.from({ length: Math.floor(100 / n) - 1 }, (_, i) => n * (i + 2));

/* ------------------------------ 1. Pembuka Sub-Bab E (Panduan Guru hlm. 76 sampai 77) ------------------------------ */
export const ADEGAN_PEMBUKA_E: AdeganStory = {
  id: "pembuka-e",
  judul: "Pembuka Sub-Bab E: menentukan KPK dan FPB dengan faktor prima",
  sumber: "Panduan Guru hlm. 76–77",
  latar: "#F0F9FF",
  kutipan: [
    "memahami bilangan prima",
    "menentukan bilangan prima di bawah 100",
    "menentukan faktor prima suatu bilangan",
    "menentukan KPK dan FPB dengan menggunakan bilangan prima",
    "membuat kesimpulan dari permasalahan yang terkait KPK dan FPB",
    "mengevaluasi kebenaran pernyataan yang terkait dengan KPK dan FPB",
    "Pensil warna atau krayon atau spidol warna",
    "Print out bilangan 1 sampai 100",
    "FPB dari 18 dan 24 adalah 72",
    "Menurutku 72 adalah KPK dari 18 dan 24",
    "Pendapat siapakah yang lebih tepat?",
  ],
  ketukan: [
    k(
      "Sub-Bab E, menentukan KPK dan FPB dengan faktor prima, adalah penutup Bab dua. Peserta didik diharapkan memahami bilangan prima, menentukan bilangan prima di bawah seratus, dan menentukan faktor prima suatu bilangan.",
      tambah(0, judul("Sub-Bab E: penutup bab"), ...kartu("e0", 30, 30, 240, 30, W.langit, ["E. KPK dan FPB dengan faktor prima"], 9.6)),
      tambah("memahami", ...kartu("a1", 14, 78, 84, 50, W.hijauMuda, ["memahami", "bilangan prima"], 8.6)),
      tambah("bawah", ...kartu("a2", 108, 78, 84, 50, W.krem, ["bilangan prima", "di bawah 100"], 8.6)),
      tambah("suatu", ...kartu("a3", 202, 78, 84, 50, W.pink, ["faktor prima", "suatu bilangan"], 8.6)),
    ),
    k(
      "Mereka juga diharapkan menentukan KPK dan FPB memakai bilangan prima, membuat kesimpulan dari masalah, dan mengevaluasi kebenaran pernyataan tentang KPK dan FPB.",
      bersih(0),
      tambah(0, judul("Tujuan berikutnya")),
      tambah("menentukan", ...kartu("t1", 20, 36, 260, 34, W.hijauMuda, ["KPK dan FPB dengan bilangan prima"], 9.4)),
      tambah("membuat", ...kartu("t2", 20, 82, 260, 34, W.langit, ["membuat kesimpulan dari masalah"], 9.4)),
      tambah("mengevaluasi", ...kartu("t3", 20, 128, 260, 34, W.krem, ["mengevaluasi pernyataan KPK dan FPB"], 9.4)),
    ),
    k(
      "Alat yang disiapkan adalah alat tulis, pensil warna atau krayon, dan cetakan bilangan satu sampai seratus dalam sepuluh kotak kali sepuluh kotak.",
      bersih(0),
      tambah(0, judul("Persiapan")),
      tambah("alat@2", emo("p1", 52, 90, "✏", 34)),
      tambah("pensil", emo("p2", 108, 90, "🖍", 34)),
      tambah("cetakan", ...kartu("p3", 150, 56, 136, 70, W.krem, ["cetakan bilangan", "1 sampai 100", "10 kotak × 10 kotak"], 8.6)),
    ),
    k(
      "Apersepsinya berupa cerita. Asep bilang FPB dari delapan belas dan dua puluh empat adalah tujuh puluh dua. Lukas bilang tujuh puluh dua adalah KPK-nya. Pendapat siapa yang lebih tepat?",
      bersih(0),
      tambah(0, judul("Apersepsi: Asep dan Lukas")),
      tambah("Asep", emo("as", 40, 70, "👦", 30), ...kartu("ac", 70, 38, 216, 44, W.merahMuda, ["Asep: FPB dari 18 dan 24", "adalah 72"], 9)),
      tambah("Lukas", emo("lu", 40, 134, "🧑", 30), ...kartu("lc", 70, 102, 216, 44, W.hijauMuda, ["Lukas: 72 adalah KPK", "dari 18 dan 24"], 9)),
      tambah("Pendapat", emo("tn", 150, 182, "❓", 24)),
    ),
    k(
      "Yang tepat Lukas. Faktor persekutuan terbesar dari delapan belas dan dua puluh empat adalah enam, sedangkan kelipatan persekutuan terkecilnya tujuh puluh dua. Jadi Asep keliru.",
      bersih(0),
      tambah(0, judul("Siapa yang tepat?"), ...kartu("fk", 14, 30, 272, 40, W.langit, ["faktor 18: 1, 2, 3, 6, 9, 18", "faktor 24: 1, 2, 3, 4, 6, 8, 12, 24"], 8.6)),
      tambah("enam,", ...kartu("g1", 14, 82, 130, 40, W.hijauMuda, ["FPB 18 dan 24", "adalah 6"], 9)),
      tambah("tujuh", ...kartu("g2", 156, 82, 130, 40, W.krem, ["KPK 18 dan 24", "adalah 72"], 9)),
      tambah("Asep", teks("ke", 150, 150, "Lukas tepat, Asep keliru", 11, W.merah), emo("ss", 150, 184, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 2. Bilangan prima (Buku Siswa hlm. 53, Panduan Guru hlm. 78) ------------------------------ */
export const ADEGAN_PRIMA: AdeganStory = {
  id: "prima",
  judul: "Bilangan prima dan tabel faktor 1 sampai 10",
  sumber: "Buku Siswa hlm. 53; Panduan Guru hlm. 78",
  latar: "#FFF7ED",
  kutipan: [
    "Tabel 2.4 Faktor Bilangan 1 Sampai 10",
    "Bilangan prima adalah bilangan yang hanya dapat dibagi oleh satu dan bilangan itu sendiri.",
    "Bilangan 1 bukan termasuk bilangan prima.",
    "Contoh bilangan prima terkecil yang kita ketahui adalah 2, 3, 5, 7, 11, 13, 17",
    "Bagaimana cara menentukan bilangan prima?",
    "Seorang ahli matematika dari Yunani, Eratosthenes mengenalkan cara sederhana untuk menentukan bilangan prima.",
  ],
  ketukan: [
    k(
      "Pemanasan: amati tabel faktor bilangan satu sampai sepuluh. Bilangan dua, tiga, lima, dan tujuh hanya punya dua faktor, yaitu satu dan bilangan itu sendiri.",
      tambah(0, judul("Faktor bilangan 1 sampai 10")),
      tambah(1, ...tabel("ft", 60, 26, [56, 124], [["Bilangan", "Faktor"], ...Array.from({ length: 10 }, (_, i) => [String(i + 1), faktorDari(i + 1).join(", ")])], 14.4, 8)),
      ubah(9, ...[2].flatMap((n) => [`ft-s${n}0`, `ft-s${n}1`].map((id) => ({ id, warna: W.emas })))),
      ubah(10, ...[3].flatMap((n) => [`ft-s${n}0`, `ft-s${n}1`].map((id) => ({ id, warna: W.emas })))),
      ubah(11, ...[5].flatMap((n) => [`ft-s${n}0`, `ft-s${n}1`].map((id) => ({ id, warna: W.emas })))),
      ubah(13, ...[7].flatMap((n) => [`ft-s${n}0`, `ft-s${n}1`].map((id) => ({ id, warna: W.emas })))),
    ),
    k(
      "Bilangan prima adalah bilangan yang hanya dapat dibagi oleh satu dan bilangan itu sendiri. Bilangan satu bukan bilangan prima, karena faktornya hanya satu.",
      bersih(0),
      tambah(0, judul("Bilangan prima")),
      tambah(0, ...kartu("df", 20, 34, 260, 60, W.hijauMuda, ["bilangan prima: hanya bisa dibagi", "oleh 1 dan bilangan itu sendiri", "contoh: 2, 3, 5, 7"], 9.2)),
      tambah("Bilangan@2", ...kartu("sa", 20, 112, 260, 50, W.merahMuda, ["1 bukan bilangan prima", "faktornya hanya 1"], 9.4)),
    ),
    k(
      "Contoh bilangan prima terkecil menurut buku: dua, tiga, lima, tujuh, sebelas, tiga belas, tujuh belas, dan seterusnya.",
      bersih(0),
      tambah(0, judul("Bilangan prima terkecil")),
      ...[2, 3, 5, 7, 11, 13, 17].map((n, i) => tambah(6 + (i < 5 ? i : i === 5 ? 5 : 7), bulat(`pc${n}`, 40 + i * 34, 98, 12, W.hijauMuda), teks(`pt${n}`, 40 + i * 34, 101.5, String(n), 9.4, W.biru))),
      tambah("seterusnya", teks("pdd", 280, 104, "…", 16, W.biru)),
    ),
    k(
      "Bagaimana menentukan bilangan prima yang lebih banyak? Seorang ahli matematika dari Yunani, Eratosthenes, mengenalkan cara sederhana yang disebut saringan Eratosthenes.",
      bersih(0),
      tambah(0, judul("Eratosthenes")),
      tambah("ahli", emo("er", 150, 78, "🏛", 44)),
      tambah("Yunani,", ...kartu("yn", 50, 100, 200, 38, W.krem, ["Eratosthenes, ahli matematika", "dari Yunani"], 9)),
      tambah("saringan", ...kartu("sr", 50, 150, 200, 32, W.hijauMuda, ["saringan Eratosthenes"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Saringan Eratosthenes (Buku Siswa hlm. 54, Panduan Guru hlm. 78) ------------------------------ */
const ABU = W.abu;
const EMAS = W.emas;
/** Isi panel kanan saringan: keterangan langkah di kolom 232 sampai 298. */
const panel = (id: string, baris: string[], warna: string = W.biru) => baris.map((b, i) => teks(`${id}${i}`, 266, 60 + i * 14, b, 9, warna));

export const ADEGAN_SARINGAN: AdeganStory = {
  id: "saringan",
  judul: "Saringan Eratosthenes: bilangan prima di bawah 100",
  sumber: "Buku Siswa hlm. 54; Panduan Guru hlm. 78",
  latar: "#F0FDF4",
  kutipan: [
    "Hapus 1.",
    "Ambil 2 dan hapus semua bilangan kelipatan 2 berikutnya.",
    "Ambil 3 dan hapus semua bilangan kelpatan 3 berikutnya.",
    "Ambil 5 dan hapus semua bilangan kelipatan 5 berikutnya.",
    "Ambil 7 dan hapus semua bilangan kelipatan 7 berikutnya.",
    "Ambil 11 dan hapus semua bilangan kelipatan 11 berikutnya.",
    "Proses ini belum selesai, lakukan terus dengan mengambil bilangan prima selanjutnya, sampai sudah tidak ada bilangan lagi yang dapat dihapus.",
    "Dari bilangan 1 sampai 100, ada berapa bilangan prima yang teman-teman temukan?",
    "Bilangan yang dieliminasi dapat diwarnai atau cukup disilang saja, agar lebih cepat.",
    "Bilangan prima tersebut adalah 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, dan 97.",
  ],
  ketukan: [
    k(
      "Ayo menyaring bilangan prima. Tulis bilangan satu sampai seratus dalam sepuluh baris. Bilangan yang dieliminasi boleh diwarnai atau cukup disilang.",
      tambah(0, judul("Saringan Eratosthenes")),
      tambah(1, ...saringan("s")),
      tambah("dieliminasi", teks("pl", 266, 60, "belum", 9, W.biru), teks("pl2", 266, 74, "disaring", 9, W.biru)),
    ),
    k(
      "Langkah pertama, hapus bilangan satu, karena satu bukan bilangan prima.",
      ubah("hapus", ...warnaiSaringan("s", ABU, [1])),
      tambah("hapus", ...panel("ph", ["hapus 1", "bukan prima"], W.merah)),
      hapus(0, "pl", "pl2"),
    ),
    k(
      "Ambil dua, lalu hapus semua bilangan kelipatan dua berikutnya. Semua bilangan genap selain dua ikut terhapus.",
      hapus(0, "ph0", "ph1"),
      ubah("Ambil", ...warnaiSaringan("s", EMAS, [2])),
      tambah("Ambil", ...panel("pa", ["ambil 2"], W.coklat)),
      ubah("hapus", ...warnaiSaringan("s", ABU, kelipatan(2))),
      tambah("hapus", teks("pb0", 266, 74, "hapus", 9, W.merah), teks("pb1", 266, 88, "kelipatan 2", 9, W.merah)),
    ),
    k(
      "Ambil tiga dan hapus semua kelipatan tiga berikutnya, misalnya sembilan, lima belas, dan dua puluh satu.",
      hapus(0, "pa0", "pb0", "pb1"),
      ubah("Ambil", ...warnaiSaringan("s", EMAS, [3])),
      tambah("Ambil", ...panel("pc", ["ambil 3"], W.coklat)),
      ubah("hapus", ...warnaiSaringan("s", ABU, kelipatan(3))),
      tambah("hapus", teks("pd0", 266, 74, "hapus", 9, W.merah), teks("pd1", 266, 88, "kelipatan 3", 9, W.merah)),
    ),
    k(
      "Ambil lima dan hapus kelipatan lima berikutnya, yaitu dua puluh lima, tiga puluh lima, dan seterusnya.",
      hapus(0, "pc0", "pd0", "pd1"),
      ubah("Ambil", ...warnaiSaringan("s", EMAS, [5])),
      tambah("Ambil", ...panel("pe", ["ambil 5"], W.coklat)),
      ubah("hapus", ...warnaiSaringan("s", ABU, kelipatan(5))),
      tambah("hapus", teks("pf0", 266, 74, "hapus", 9, W.merah), teks("pf1", 266, 88, "kelipatan 5", 9, W.merah)),
    ),
    k(
      "Ambil tujuh dan hapus kelipatan tujuh berikutnya. Lalu ambil sebelas dan seterusnya, sampai tidak ada bilangan lagi yang dapat dihapus.",
      hapus(0, "pe0", "pf0", "pf1"),
      ubah("Ambil", ...warnaiSaringan("s", EMAS, [7])),
      tambah("Ambil", ...panel("pg", ["ambil 7"], W.coklat)),
      ubah("hapus", ...warnaiSaringan("s", ABU, kelipatan(7))),
      ubah("sebelas", ...warnaiSaringan("s", EMAS, [11])),
      tambah("sebelas", teks("ph2", 266, 74, "ambil 11", 9, W.coklat), teks("ph3", 266, 88, "tak ada lagi", 9, W.merah), teks("ph4", 266, 102, "yang terhapus", 9, W.merah)),
    ),
    k(
      "Dari bilangan satu sampai seratus ada dua puluh lima bilangan prima, yaitu dua, tiga, lima, tujuh, sebelas, sampai sembilan puluh tujuh.",
      hapus(0, "pg0", "ph2", "ph3", "ph4"),
      ubah("seratus", ...warnaiSaringan("s", EMAS, PRIMA_100)),
      tambah("dua@2", teks("pz0", 266, 60, "25 bilangan", 9, W.hijau), teks("pz1", 266, 74, "prima", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Faktorisasi prima (Buku Siswa hlm. 55, Panduan Guru hlm. 79) ------------------------------ */
export const ADEGAN_FAKTORISASI: AdeganStory = {
  id: "faktorisasi",
  judul: "Faktorisasi prima dan cara membuat pohon faktor",
  sumber: "Buku Siswa hlm. 55; Panduan Guru hlm. 79",
  latar: "#FFFBEB",
  kutipan: [
    "Suatu bilangan ternyata dapat dinyatakan sebagai hasil kali dari bilangan prima.",
    "Cara menyatakan bilangan dalam bentuk perkalian bilangan-bilangan prima disebut faktorisasi prima.",
    "Faktorisasi prima dari 12 dan 30 adalah sebagai berikut.",
    "12 = 2 x 2 x 3",
    "30 = 2 x 3 x 5",
    "Bagaimana cara menentukan faktorisasi bilangan prima yang lebih besar? Misalnya bilangan 196 dan 300.",
    "kita dapat menggunakan pohon faktor",
    "Bilangan dibagi dengan bilangan prima. Mulailah dari bilangan prima terkecil yang dapat membagi bilangan yang diberikan.",
    "Lanjutkan membagi bilangan dengan bilangan prima lainnya.",
    "Proses akan berhenti jika hasil akhirnya sudah berupa bilangan prima.",
  ],
  ketukan: [
    k(
      "Suatu bilangan dapat dinyatakan sebagai hasil kali bilangan prima. Cara ini disebut faktorisasi prima.",
      tambah(0, judul("Faktorisasi prima")),
      tambah("hasil", ...kartu("fz", 20, 50, 260, 54, W.langit, ["faktorisasi prima:", "bilangan = hasil kali bilangan prima"], 9.6)),
      tambah("disebut", emo("fe", 150, 150, "🔢", 38)),
    ),
    k(
      "Contohnya, faktorisasi prima dari dua belas adalah dua kali dua kali tiga, dan dari tiga puluh adalah dua kali tiga kali lima.",
      bersih(0),
      tambah(0, judul("Dua contoh")),
      tambah("dua@1", teks("c1", 150, 80, "12 = 2 × 2 × 3", 20, W.biru)),
      tambah("tiga@2", teks("c2", 150, 138, "30 = 2 × 3 × 5", 20, W.hijau)),
    ),
    k(
      "Bagaimana bila bilangannya lebih besar, misalnya seratus sembilan puluh enam dan tiga ratus? Kita memakai pohon faktor.",
      bersih(0),
      tambah(0, judul("Bilangan yang lebih besar")),
      tambah("seratus", ...kartu("b1", 40, 40, 90, 44, W.krem, ["196"], 18)),
      tambah("tiga", ...kartu("b2", 170, 40, 90, 44, W.krem, ["300"], 18)),
      tambah("pohon", emo("bp", 150, 150, "🌳", 46), teks("bt", 150, 186, "pohon faktor", 10, W.hijau)),
    ),
    k(
      "Cara membuat pohon faktor menurut Panduan Guru: bagi bilangan dengan bilangan prima terkecil yang dapat membaginya, lanjutkan dengan bilangan prima lainnya, dan berhenti jika hasilnya sudah berupa bilangan prima.",
      bersih(0),
      tambah(0, judul("Cara membuat pohon faktor")),
      tambah("bagi", ...kartu("w1", 20, 34, 260, 34, W.langit, ["1. bagi dengan prima terkecil yang bisa"], 9.4)),
      tambah("lanjutkan", ...kartu("w2", 20, 80, 260, 34, W.hijauMuda, ["2. lanjutkan dengan prima lainnya"], 9.4)),
      tambah("berhenti", ...kartu("w3", 20, 126, 260, 34, W.krem, ["3. berhenti bila hasilnya prima"], 9.4)),
    ),
  ],
};
