import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, garisBilangan, judul, kartu, panah, posisiBil, selKolom, tabelTempat, teks } from "./k5b1b-gambar";
import { bersih, hapus, k, tambah, warnai } from "./k5b1b-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membandingkan dan mengurutkan",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 10–15",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana kita memutuskan bilangan mana yang lebih besar? Guru di berbagai negara punya cara yang berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("Bagaimana", ...kartu("q1", 24, 56, 100, 38, W.langit, ["56.560"], 13), ...kartu("q2", 176, 56, 100, 38, W.krem, ["57.000"], 13), teks("qq", 150, 84, "?", 24, W.merah)),
      tambah("berbeda.", emo("gl", 150, 150, "🌍", 40)),
    ),
    k(
      "Empat metode itu: Leftmost Compare, Number Line Order, Benchmark Numbers, dan Rounding Estimate Compare.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Leftmost", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Leftmost Compare"], 9.4)),
      tambah("Number", ...kartu("m2", 20, 70, 260, 30, W.langit, ["2. Number Line Order"], 9.4)),
      tambah("Benchmark", ...kartu("m3", 20, 108, 260, 30, W.krem, ["3. Benchmark Numbers"], 9.4)),
      tambah("Rounding", ...kartu("m4", 20, 146, 260, 30, W.pink, ["4. Rounding Estimate Compare"], 9.4)),
    ),
    k(
      "Semuanya menjawab pertanyaan yang sama: bilangan mana yang lebih besar, dan bagaimana urutannya? Bedanya hanya cara memikirkannya: dari kiri, dari garis, dari patokan, atau dari perkiraan.",
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("kiri,", emo("i1", 45, 80, "🔍", 34), teks("i1t", 45, 112, "dari kiri", 8.6, W.biru)),
      tambah("garis,", emo("i2", 112, 80, "📏", 34), teks("i2t", 112, 112, "dari garis", 8.6, W.biru)),
      tambah("patokan,", emo("i3", 188, 80, "📍", 34), teks("i3t", 188, 112, "dari patokan", 8.6, W.biru)),
      tambah("perkiraan.", emo("i4", 255, 80, "🎯", 34), teks("i4t", 255, 112, "dari perkiraan", 8.6, W.biru)),
    ),
    k(
      "Angka yang kita pakai dari buku: harga empat papan dakon, tiga pasang bilangan di Ayo Berlatih nomor satu, dan empat pasang di nomor dua.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("harga", ...kartu("a1", 14, 38, 272, 36, W.hijauMuda, ["harga 4 papan dakon: 56.560, 65.750,", "57.000, 75.360"], 8.6)),
      tambah("tiga", ...kartu("a2", 14, 92, 128, 40, W.langit, ["nomor 1", "3 pasang bilangan"], 8.8)),
      tambah("empat", ...kartu("a3", 158, 92, 128, 40, W.krem, ["nomor 2", "4 pasang bilangan"], 8.8)),
    ),
  ],
};

/* ------------------------------ 2. Leftmost Compare: konsep ------------------------------ */
const LK = tabelTempat("lk", 10, 36, [{ nama: "1", n: 56475 }, { nama: "2", n: 43217 }]);
const LK2 = tabelTempat("lj", 10, 36, [{ nama: "1", n: 86567 }, { nama: "2", n: 86576 }]);

export const ADEGAN_LUAR_KIRI: AdeganStory = {
  id: "luar-kiri",
  judul: "Leftmost Compare: banding dari kiri",
  sumber: "Metode luar: Leftmost Compare",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Leftmost Compare, artinya banding dari kiri. Bandingkan angka di tempat paling kiri dulu. Bilangan dengan angka lebih besar di sana, itulah yang lebih besar.",
      tambah(0, judul("Leftmost Compare")),
      tambah(0, ...LK),
      warnai("kiri.", W.emas, ...selKolom("lk", 0, 2)),
      tambah("Bilangan", teks("ln", 150, 124, "5 lebih besar dari 4, jadi", 10.4, W.biru), teks("ln2", 150, 146, "56.475 lebih besar", 12, W.hijau)),
    ),
    k(
      "Kalau angka di tempat paling kiri sama, geser ke tempat berikutnya. Lakukan terus sampai ketemu angka yang berbeda. Perbedaan pertama itulah yang menentukan.",
      bersih(0),
      tambah(0, judul("Sama? geser ke kanan")),
      tambah(0, ...LK2),
      warnai("sama,", W.hijauPita, ...selKolom("lj", 0, 2), ...selKolom("lj", 1, 2), ...selKolom("lj", 2, 2)),
      warnai("berbeda.", W.emas, ...selKolom("lj", 3, 2)),
      tambah("Perbedaan", teks("lj-n", 150, 134, "beda pertama: puluhan, 6 dan 7", 10.4, W.merah)),
    ),
    k(
      "Kelebihannya, cepat dan tidak perlu menghitung apa pun, cukup melihat angka satu per satu. Cocok untuk dua bilangan yang tampak mirip.",
      bersih(0),
      tambah(0, judul("Kelebihan")),
      tambah("cepat", ...kartu("p1", 30, 44, 240, 40, W.hijauMuda, ["cepat, tanpa menghitung"], 10)),
      tambah("Cocok", ...kartu("p2", 30, 98, 240, 40, W.krem, ["cocok untuk bilangan yang mirip"], 10)),
      tambah("mirip.", emo("p3", 150, 172, "✅", 28)),
    ),
    k(
      "Kekurangannya, kalau jumlah angkanya berbeda kita harus menyamakan tempatnya dulu. Dan jangan mulai dari kanan, karena itu kesalahan yang sering terjadi.",
      bersih(0),
      tambah(0, judul("Kekurangan")),
      tambah("jumlah", ...kartu("w1", 30, 44, 240, 40, W.pink, ["jumlah angka berbeda:", "samakan tempat dulu"], 9.6)),
      tambah("kanan,", ...kartu("w2", 30, 98, 240, 40, W.krem, ["jangan mulai dari kanan"], 10)),
      tambah("kesalahan", emo("w3", 150, 172, "⚠", 28)),
    ),
  ],
};

/* ------------------------------ 3. Leftmost Compare: penerapan (angka buku) ------------------------------ */
const LT = tabelTempat("lt", 10, 36, [{ nama: "a", n: 56560 }, { nama: "c", n: 57000 }]);
const LT2 = tabelTempat("lu", 10, 36, [{ nama: "1", n: 86567 }, { nama: "2", n: 86576 }]);
const LT3 = tabelTempat("lv", 10, 66, [{ nama: "1", n: 13234 }, { nama: "2", n: 13234 }]);

export const ADEGAN_LUAR_KIRI_TERAPAN: AdeganStory = {
  id: "luar-kiri-terapan",
  judul: "Banding dari kiri: angka dari buku",
  sumber: "Metode luar: Leftmost Compare; Buku Siswa hlm. 10 dan 15",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada papan dakon a dan c. Lima puluh enam ribu lima ratus enam puluh dan lima puluh tujuh ribu. Puluh ribuan sama-sama lima, jadi kita geser ke kanan.",
      tambah(0, judul("Papan a dan papan c")),
      tambah(0, ...LT),
      warnai("sama-sama", W.hijauPita, ...selKolom("lt", 0, 2)),
      tambah("geser", teks("lt-n", 150, 124, "puluh ribuan sama, geser ke kanan", 10.4, W.merah)),
    ),
    k(
      "Ribuan papan a enam, ribuan papan c tujuh. Perbedaan pertama ada di ribuan, tujuh lebih besar, jadi papan c lebih mahal daripada papan a.",
      warnai("Ribuan", W.emas, ...selKolom("lt", 1, 2)),
      tambah("jadi", teks("lt-m", 150, 150, "6 < 7, jadi 57.000 > 56.560", 12, W.hijau)),
      tambah("mahal", emo("lt-e", 150, 190, "💰", 24)),
    ),
    k(
      "Sekarang pasangan kedua nomor dua: delapan puluh enam ribu lima ratus enam puluh tujuh dan delapan puluh enam ribu lima ratus tujuh puluh enam. Tiga angka pertama sama, beda pertama di puluhan.",
      bersih(0),
      tambah(0, judul("Nomor 2, pasangan kedua")),
      tambah(0, ...LT2),
      warnai("Tiga", W.hijauPita, ...selKolom("lu", 0, 2), ...selKolom("lu", 1, 2), ...selKolom("lu", 2, 2)),
      warnai("puluhan.", W.emas, ...selKolom("lu", 3, 2)),
    ),
    k(
      "Enam lebih kecil dari tujuh, jadi bilangan pertama lebih kecil. Pasangan keempat, tiga belas ribu dua ratus tiga puluh empat dan bilangan yang sama, tidak punya angka yang berbeda, jadi keduanya sama.",
      bersih(0),
      tambah(0, judul("Beda pertama menentukan")),
      tambah(0, teks("lu-a", 150, 50, "86.567 < 86.576", 15, W.hijau)),
      tambah("Pasangan", ...LT3),
      warnai("sama.", W.hijauPita, ...selKolom("lv", 0, 2), ...selKolom("lv", 1, 2), ...selKolom("lv", 2, 2), ...selKolom("lv", 3, 2), ...selKolom("lv", 4, 2)),
      tambah("sama.", teks("lv-n", 150, 190, "13.234 = 13.234", 14, W.biru)),
    ),
  ],
};

/* ------------------------------ 4. Number Line Order: konsep ------------------------------ */
const X0 = 20;
const PJ = 260;
const GB = garisBilangan("gb", X0, 112, PJ, 0, 100000, 20000);
const xb = (n: number) => posisiBil(X0, PJ, 0, 100000, n);

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line Order: urutan di garis bilangan",
  sumber: "Metode luar: Number Line Order",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Number Line Order, artinya urutan di garis bilangan. Letakkan bilangan pada garis. Makin ke kanan, makin besar.",
      tambah(0, judul("Number Line Order")),
      tambah(0, ...GB),
      tambah("Letakkan", bulat("d1", xb(43217), 112, 4.6, W.merahPita, W.biru), teks("d1t", xb(43217), 94, "43.217", 7.6, W.merah), bulat("d2", xb(56475), 112, 4.6, W.hijauPita, W.biru), teks("d2t", xb(56475), 94, "56.475", 7.6, W.hijau)),
      tambah("kanan,", panah("pk", 70, 158, 160, 0, W.hijau, 2.4), teks("pkt", 150, 176, "makin besar", 11, W.hijau)),
    ),
    k(
      "Mengurutkan berarti membaca titik dari kiri ke kanan. Yang paling kiri paling kecil, yang paling kanan paling besar.",
      hapus(0, "pk", "pkt"),
      tambah("kiri@2", teks("kc", 60, 160, "paling kecil", 10, W.merah), teks("kc2", 60, 174, "43.217", 10, W.merah)),
      tambah("kanan@2", teks("kb", 240, 160, "paling besar", 10, W.hijau), teks("kb2", 240, 174, "56.475", 10, W.hijau)),
    ),
    k(
      "Kelebihannya, jarak antarbilangan ikut terlihat, jadi kita bisa melihat seberapa jauh beda dua bilangan. Cocok untuk membayangkan urutan.",
      bersih(0),
      tambah(0, judul("Kelebihan")),
      tambah("jarak", ...kartu("p1", 30, 44, 240, 40, W.hijauMuda, ["jarak antarbilangan terlihat"], 10)),
      tambah("Cocok", ...kartu("p2", 30, 98, 240, 40, W.krem, ["cocok untuk membayangkan urutan"], 10)),
      tambah("urutan.", emo("p3", 150, 172, "✅", 28)),
    ),
    k(
      "Kekurangannya, bilangan yang berdekatan sulit dibedakan pada garis yang kasar. Garis perlu diperbesar pada bagian yang kita butuhkan.",
      bersih(0),
      tambah(0, judul("Kekurangan")),
      tambah("berdekatan", ...kartu("w1", 30, 44, 240, 40, W.pink, ["bilangan berdekatan sulit dibedakan"], 9.6)),
      tambah("diperbesar", ...kartu("w2", 30, 98, 240, 40, W.krem, ["garis perlu diperbesar"], 10)),
      tambah("butuhkan.", emo("w3", 150, 172, "🔎", 28)),
    ),
  ],
};

/* ------------------------------ 5. Number Line Order: penerapan (harga papan dakon) ------------------------------ */
const G2 = garisBilangan("gt", X0, 116, PJ, 50000, 80000, 10000);
const x2 = (n: number) => posisiBil(X0, PJ, 50000, 80000, n);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis bilangan: harga papan dakon",
  sumber: "Metode luar: Number Line Order; Buku Siswa hlm. 10 dan 13",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Terapkan pada harga papan dakon. Garisnya dari lima puluh ribu sampai delapan puluh ribu, tiap tanda sepuluh ribu.",
      tambah(0, judul("Harga papan dakon di garis")),
      tambah(0, ...G2),
      tambah("Garisnya", teks("lg1", 48, 52, "a: 56.560", 8.4, W.hijau), teks("lg2", 120, 52, "c: 57.000", 8.4, W.coklat), teks("lg3", 192, 52, "b: 65.750", 8.4, W.merah), teks("lg4", 262, 52, "d: 75.360", 8.4, W.biru)),
    ),
    k(
      "Titik papan a berada di antara lima puluh ribu dan enam puluh ribu, agak di tengahnya.",
      tambah("Titik", bulat("pa", x2(56560), 116, 4.6, W.hijauPita, W.biru), teks("pat", x2(56560) - 7, 98, "a", 11, W.hijau)),
    ),
    k(
      "Papan c juga di antara lima puluh ribu dan enam puluh ribu, sedikit di kanan papan a. Papan b di antara enam puluh ribu dan tujuh puluh ribu. Papan d di antara tujuh puluh ribu dan delapan puluh ribu.",
      tambah("Papan", bulat("pc", x2(57000), 116, 4.6, W.jingga, W.biru), teks("pct", x2(57000) + 9, 98, "c", 11, W.coklat)),
      tambah("Papan@3", bulat("pb", x2(65750), 116, 4.6, W.merahPita, W.biru), teks("pbt", x2(65750), 98, "b", 11, W.merah)),
      tambah("Papan@4", bulat("pd", x2(75360), 116, 4.6, W.langit, W.biru), teks("pdt", x2(75360), 98, "d", 11, W.biru)),
    ),
    k(
      "Bacalah dari kiri ke kanan: papan a, papan c, papan b, papan d. Itulah urutan dari termurah ke termahal, sama seperti tabel di buku.",
      tambah("Bacalah", panah("ur", 40, 164, 220, 0, W.hijau, 2.4)),
      tambah("termurah", teks("u1", 150, 186, "a  →  c  →  b  →  d", 14, W.hijau)),
      tambah("termahal,", teks("u2", 60, 148, "termurah", 9.4, W.hijau), teks("u3", 240, 148, "termahal", 9.4, W.merah)),
    ),
  ],
};
