import type { AdeganStory } from "./logika-story";
import { W, batang, bulat, emo, judul, kartu, panah, teks } from "./k5b3b-gambar";
import { bersih, k, tambah, ubah } from "./k5b3b-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 8. Eksplorasi 3.2D: Masalah Kira dan Cara Upe (Buku Siswa hlm. 85 dan 86) ------------------------------ */
const KX = 40;
const KW = 150;

export const ADEGAN_NISA: AdeganStory = {
  id: "eks-d-nisa",
  judul: "Penyebut berbeda: Cara Upe",
  sumber: "Materi: kertas, Cara Upe",
  latar: "#FDF2F8",
  kutipan: kutipanLokal("k5b3b-materi-3.ts:1"),
  ketukan: [
    k(
      "Sekarang penyebutnya berbeda. Masalah Kira berikutnya: Kira punya sebagian kertas, lalu Halim memberi Kira sebagian kertas lagi. Berapa pecahan dari gabungan kedua kertas itu?",
      tambah(0, judul("Penyebut berbeda")),
      tambah("Kira", ...kartu("kl", 18, 44, 124, 40, W.langit, ["kertas Kira", "sebagian"], 9.4)),
      tambah("Halim", teks("kp", 150, 70, "+", 18, W.merah), ...kartu("kk", 158, 44, 124, 40, W.krem, ["kertas dari Halim", "sebagian"], 9.4)),
      tambah("Berapa", teks("kq", 150, 130, "gabungan = ?", 15, W.merah)),
    ),
    k(
      "Cara Upe. Amatilah gambar. Kertas Kira semula satu per tiga bagian: kertas dibagi tiga, satu bagian berwarna.",
      bersih(0),
      tambah(0, judul("Cara Upe: kertas Kira")),
      tambah("Kertas", ...batang("ka", KX, 46, KW, 34, 3, [[0, 1, W.hijauPita]]), teks("ka-t", 250, 68, "= 1/3", 15, W.hitam)),
      tambah("satu", teks("ka-n", KX + KW / 2, 100, "dibagi 3, diwarnai 1", 9.4, W.hijau)),
    ),
    k(
      "Hal ini senilai dengan dua per enam. Kertas yang sama dibagi enam, dan dua bagian berwarna.",
      tambah("senilai", ...batang("kb", KX, 118, KW, 34, 6, [[0, 2, W.hijauPita]]), teks("kb-t", 250, 140, "= 2/6", 15, W.hitam)),
      tambah("enam,", teks("kb-n", KX + KW / 2, 172, "dibagi 6, diwarnai 2", 9.4, W.hijau)),
    ),
    k(
      "Kertas yang diberikan Halim adalah empat per enam: kertas dibagi enam, empat bagian berwarna.",
      bersih(0),
      tambah(0, judul("Cara Upe: kertas Halim")),
      tambah("empat", ...batang("kc", KX, 60, KW, 34, 6, [[0, 4, W.jingga]]), teks("kc-t", 250, 82, "= 4/6", 15, W.hitam)),
      tambah("dibagi", teks("kc-n", KX + KW / 2, 116, "dibagi 6, diwarnai 4", 9.4, W.coklat)),
    ),
    k(
      "Ketika digabungkan, dua per enam ditambah empat per enam. Bagian hijau dua dan bagian jingga empat mengisi seluruh enam bagian.",
      bersih(0),
      tambah(0, judul("Digabungkan")),
      tambah("Ketika", ...batang("kd", KX, 52, KW, 34, 6, [[0, 2, W.hijauPita], [2, 6, W.jingga]]), teks("kd-t", 250, 74, "2/6 + 4/6", 11, W.hitam)),
      tambah("dua@2", teks("kd-n", KX + KW / 2, 108, "2 bagian + 4 bagian = 6 bagian", 9.4, W.hitam)),
    ),
    k(
      "Jadi gabungan kertas tersebut adalah dua per enam ditambah empat per enam sama dengan enam per enam. Enam bagian dari enam bagian berarti satu kertas utuh.",
      bersih(0),
      tambah(0, judul("Gabungan kertas")),
      tambah("Jadi", teks("h1", 150, 72, "2/6 + 4/6 = 6/6", 20, W.hitam)),
      tambah("utuh.", teks("h2", 150, 108, "6/6 = 1", 24, W.hijau)),
      tambah("utuh.", ...batang("h3", KX, 128, KW, 34, 6, [[0, 6, W.hijauPita]])),
    ),
  ],
};

/* ------------------------------ 9. Cara Halim dan Cara Igil untuk satu per tiga ditambah empat per enam (Buku Siswa hlm. 86 sampai 88) ------------------------------ */
export const ADEGAN_KOMANG_YOHANA: AdeganStory = {
  id: "eks-d-komang-yohana",
  judul: "Penyebut berbeda: Cara Halim dan Igil",
  sumber: "Materi: kertas, Cara Halim dan Igil",
  latar: "#FAF5FF",
  kutipan: kutipanLokal("k5b3b-materi-3.ts:2"),
  ketukan: [
    k(
      "Cara Halim memakai lingkaran kecil. Pertama, arsir kertas Kira semula, satu per tiga: dari tiga lingkaran, satu diarsir.",
      tambah(0, judul("Cara Halim: arsir")),
      tambah("Pertama,", ...[0, 1, 2].map((i) => bulat(`ca-${i}`, 90 + i * 30, 70, 12, i === 0 ? W.hijauPita : W.putih)), teks("ca-t", 150, 104, "1/3", 16, W.hitam)),
    ),
    k(
      "Kedua, arsir kertas Halim yang diberikan kepada Kira, empat per enam: dari enam lingkaran, empat diarsir.",
      tambah("Kedua,", ...[0, 1, 2, 3, 4, 5].map((i) => bulat(`cb-${i}`, 90 + (i % 3) * 30, 134 + Math.floor(i / 3) * 28, 11, i < 4 ? W.jingga : W.putih)), teks("cb-t", 210, 160, "4/6", 16, W.hitam)),
    ),
    k(
      "Ketiga, ubah satu per tiga menjadi pecahan senilai berpenyebut enam. Satu per tiga senilai dua per enam.",
      bersih(0),
      tambah(0, judul("Cara Halim: pecahan senilai")),
      tambah("Ketiga,", teks("sn1", 150, 80, "1/3 = 2/6", 22, W.hitam)),
      tambah("senilai@2", ...kartu("sn2", 40, 104, 220, 34, W.krem, ["penyebut 3 jadi penyebut 6"], 9.4)),
    ),
    k(
      "Keempat, gabungkan. Satu per tiga ditambah empat per enam sama dengan dua per enam ditambah empat per enam, sama dengan enam per enam, yaitu satu.",
      bersih(0),
      tambah(0, judul("Cara Halim: gabungkan")),
      tambah("Keempat,", teks("gb1", 150, 70, "1/3 + 4/6", 17, W.hitam)),
      tambah("sama@1", teks("gb2", 150, 100, "= 2/6 + 4/6", 17, W.hitam)),
      tambah("sama@2", teks("gb3", 150, 130, "= 6/6 = 1", 20, W.hijau)),
    ),
    k(
      "Cara Igil mencari KPK dulu untuk satu per tiga ditambah empat per enam. Kelipatan tiga: tiga, enam, sembilan. Kelipatan enam: enam, dua belas, delapan belas.",
      bersih(0),
      tambah(0, judul("Cara Igil: cari KPK")),
      tambah("untuk", teks("y1", 150, 48, "1/3 + 4/6", 15, W.hitam)),
      tambah("Kelipatan", ...kartu("y2", 20, 56, 260, 30, W.langit, ["kelipatan 3: 3, 6, 9, 12, ..."], 9.4)),
      tambah("enam@3", ...kartu("y3", 20, 92, 260, 30, W.krem, ["kelipatan 6: 6, 12, 18, ..."], 9.4)),
    ),
    k(
      "KPK dari tiga dan enam adalah enam. Enam dibagi tiga sama dengan dua, lalu dikali satu menjadi dua per enam.",
      ubah("KPK", { id: "y2-k", warna: W.hijauMuda }, { id: "y3-k", warna: W.hijauMuda }),
      tambah("KPK", ...kartu("y4", 90, 130, 120, 28, W.hijauMuda, ["KPK 3 dan 6 = 6"], 9.8)),
      tambah("dibagi", teks("y5", 150, 180, "1/3 = ((6 : 3) × 1)/6 = 2/6", 9.4, W.hitam)),
    ),
    k(
      "Sisanya sama: dua per enam ditambah empat per enam sama dengan enam per enam, yaitu satu. Ketiga cara memberi jawaban yang sama.",
      bersih(0),
      tambah(0, judul("Hasil tiga cara")),
      tambah("Sisanya", teks("z1", 150, 66, "2/6 + 4/6 = 6/6 = 1", 18, W.hitam)),
      tambah("Ketiga", ...kartu("z2", 20, 92, 82, 34, W.hijauMuda, ["Cara Upe"], 9), ...kartu("z3", 109, 92, 82, 34, W.langit, ["Cara Halim"], 9), ...kartu("z4", 198, 92, 82, 34, W.krem, ["Cara Igil"], 9)),
      tambah("sama.", emo("z5", 150, 160, "✅", 26)),
    ),
    k(
      "Wingko Kira yang tadi disimpan kini bisa dijawab. KPK dari dua dan tiga adalah enam. Satu per dua sama dengan tiga per enam, satu per tiga sama dengan dua per enam, jadi hasilnya lima per enam. Ini hitungan kita sendiri.",
      bersih(0),
      tambah(0, judul("Wingko Kira dijawab")),
      tambah("Wingko", teks("w1", 150, 62, "1/2 + 1/3", 17, W.hitam)),
      tambah("KPK", ...kartu("w2", 80, 74, 140, 28, W.krem, ["KPK 2 dan 3 = 6"], 9.4)),
      tambah("Satu@1", teks("w3", 150, 128, "= 3/6 + 2/6", 17, W.hitam)),
      tambah("hasilnya", teks("w4", 150, 160, "= 5/6", 22, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Eksplorasi 3.2E: denah rumah, Cara Igil dan Cara Kira (Buku Siswa hlm. 88 sampai 90) ------------------------------ */
export const ADEGAN_DENAH: AdeganStory = {
  id: "eks-e-denah",
  judul: "Jarak tiga rumah",
  sumber: "Materi: denah tiga rumah",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k5b3b-materi-3.ts:3"),
  ketukan: [
    k(
      "Masalah Halim. Perhatikan denah berikut. Pada denah, rumah Halim berada di antara rumah Igil dan rumah Kira.",
      tambah(0, judul("Denah tiga rumah")),
      tambah("Igil,", emo("r1", 50, 80, "🏠", 30), teks("r1t", 50, 104, "Igil", 9.4, W.biru)),
      tambah("Halim@2", emo("r2", 150, 80, "🏠", 30), teks("r2t", 150, 104, "Halim", 9.4, W.biru)),
      tambah("Kira.", emo("r3", 250, 80, "🏠", 30), teks("r3t", 250, 104, "Kira", 9.4, W.biru)),
      tambah("antara", panah("pa1", 78, 76, 44, 0, W.hitam, 1.6, { gambar: true }), panah("pa2", 178, 76, 44, 0, W.hitam, 1.6, { gambar: true })),
    ),
    k(
      "Jarak rumah Halim ke rumah Igil adalah satu satu per dua kilometer, dan ke rumah Kira dua satu per empat kilometer. Lebar rumah Halim satu per dua ratus kilometer. Berapa jarak rumah Igil ke rumah Kira?",
      tambah("satu", teks("j1", 100, 130, "1 1/2 km", 11, W.merah)),
      tambah("Kira", teks("j3", 200, 130, "2 1/4 km", 11, W.merah)),
      tambah("Lebar", teks("j2", 150, 152, "lebar rumah Halim 1/200 km", 10, W.coklat)),
      tambah("Berapa", teks("jq", 150, 182, "jarak Igil ke Kira = ?", 12, W.merah)),
    ),
    k(
      "Cara Igil, menjumlahkan pecahan campuran. Langkah satu, ubah pecahan campuran menjadi pecahan biasa. Satu satu per dua menjadi tiga per dua, dan dua satu per empat menjadi sembilan per empat.",
      bersih(0),
      tambah(0, judul("Cara Igil: langkah 1")),
      tambah("Langkah", ...kartu("yl", 30, 36, 240, 26, W.krem, ["ubah ke pecahan biasa"], 9.4)),
      tambah("Satu@2", teks("y1", 150, 96, "1 1/2 = 3/2", 17, W.hitam)),
      tambah("sembilan", teks("y2", 150, 126, "2 1/4 = 9/4", 17, W.hitam)),
      tambah("empat@2", teks("y3", 150, 156, "1/200 tetap 1/200", 11, W.coklat)),
    ),
    k(
      "Langkah dua, samakan penyebutnya menjadi dua ratus. Tiga per dua dikali seratus menjadi tiga ratus per dua ratus. Sembilan per empat dikali lima puluh menjadi empat ratus lima puluh per dua ratus.",
      bersih(0),
      tambah(0, judul("Cara Igil: langkah 2")),
      tambah("Langkah", ...kartu("y4", 30, 36, 240, 26, W.krem, ["samakan penyebut jadi 200"], 9.4)),
      tambah("seratus", teks("y5", 150, 98, "3/2 = (3 × 100)/(2 × 100) = 300/200", 11, W.hitam)),
      tambah("Sembilan", teks("y6", 150, 130, "9/4 = (9 × 50)/(4 × 50) = 450/200", 11, W.hitam)),
    ),
    k(
      "Langkah tiga, jumlahkan semuanya. Hasilnya tujuh ratus lima puluh satu per dua ratus, atau tiga dan seratus lima puluh satu per dua ratus.",
      bersih(0),
      tambah(0, judul("Cara Igil: langkah 3")),
      tambah("Langkah", ...kartu("y7", 30, 36, 240, 26, W.krem, ["jumlahkan"], 9.4)),
      tambah("Hasilnya", teks("y8", 150, 100, "300/200 + 450/200 + 1/200 = 751/200", 11, W.hitam)),
      tambah("atau", teks("y9", 150, 140, "751/200 = 3 151/200", 17, W.hijau)),
    ),
    k(
      "Cara Kira, memisahkan bilangan bulat dan pecahan. Bilangan bulatnya satu tambah dua sama dengan tiga.",
      bersih(0),
      tambah(0, judul("Cara Kira: bulat")),
      tambah("Cara", teks("l1", 150, 64, "1 1/2 + 2 1/4 + 1/200", 14, W.hitam)),
      tambah("bulatnya", ...kartu("l2", 40, 86, 220, 28, W.krem, ["bilangan bulat"], 9.4)),
      tambah("satu", teks("l3", 150, 146, "1 + 2 = 3", 18, W.hijau)),
    ),
    k(
      "Pecahannya: satu per dua, satu per empat, dan satu per dua ratus. Disamakan menjadi seratus, lima puluh, dan satu per dua ratus. Jumlahnya seratus lima puluh satu per dua ratus.",
      bersih(0),
      tambah(0, judul("Cara Kira: pecahan")),
      tambah("Pecahannya:", ...kartu("l4", 40, 34, 220, 28, W.langit, ["pecahan"], 9.4)),
      tambah("Disamakan", teks("l5", 150, 96, "1/2 + 1/4 + 1/200", 14, W.hitam)),
      tambah("seratus", teks("l6", 150, 124, "= 100/200 + 50/200 + 1/200", 12, W.hitam)),
      tambah("Jumlahnya", teks("l7", 150, 154, "= 151/200", 18, W.hijau)),
    ),
    k(
      "Terakhir, gabungkan bilangan bulat dan pecahan. Hasilnya sama dengan Cara Igil. Jadi jarak rumah Igil ke rumah Kira adalah tiga dan seratus lima puluh satu per dua ratus kilometer.",
      bersih(0),
      tambah(0, judul("Jarak Igil ke Kira")),
      tambah("gabungkan", teks("m1", 150, 70, "3 + 151/200 = 3 151/200", 15, W.hitam)),
      tambah("sama", ...kartu("m2", 40, 90, 220, 28, W.hijauMuda, ["sama dengan Cara Igil"], 9.4)),
      tambah("Jadi", ...kartu("m3", 40, 130, 220, 38, W.emas, ["jarak = 3 151/200 km"], 11)),
    ),
  ],
};

/* ------------------------------ 11. Akhir pembelajaran, miskonsepsi, diferensiasi, Refleksi nomor 3 (Panduan Guru hlm. 107; Buku Siswa hlm. 102 dan 103) ------------------------------ */
export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup-b",
  judul: "Hati-hati, tantangan, dan renungan",
  sumber: "Materi: hati-hati, tantangan, renungan",
  latar: "#FFFBEB",
  kutipan: kutipanLokal("k5b3b-materi-3.ts:4"),
  ketukan: [
    k(
      "Mari kita tutup bagian ini. Coba jelaskan hasil kerjamu kepada temanmu, lalu simpulkan hal-hal penting yang harus diperhatikan saat menjumlahkan pecahan.",
      tambah(0, judul("Menutup pelajaran")),
      tambah("jelaskan", ...kartu("a1", 30, 46, 240, 40, W.langit, ["jelaskan hasil kerjamu"], 10)),
      tambah("simpulkan", ...kartu("a2", 30, 106, 240, 40, W.hijauMuda, ["simpulkan hal penting"], 10)),
    ),
    k(
      "Pilihlah cara yang paling mudah dan paling kamu sukai. Cara Kira, Halim, Upe, atau Igil boleh kamu pakai, asalkan hasilnya sama.",
      bersih(0),
      tambah(0, judul("Pilih cara yang paling mudah")),
      tambah("Kira,", ...kartu("p1", 20, 46, 126, 36, W.langit, ["Cara Kira"], 9.4)),
      tambah("Halim,", ...kartu("p2", 154, 46, 126, 36, W.hijauMuda, ["Cara Halim"], 9.4)),
      tambah("Upe,", ...kartu("p3", 20, 94, 126, 36, W.pink, ["Cara Upe"], 9.4)),
      tambah("Igil", ...kartu("p4", 154, 94, 126, 36, W.krem, ["Cara Igil"], 9.4)),
      tambah("paling@2", emo("p5", 150, 168, "⭐", 26)),
    ),
    k(
      "Hati-hati, kesalahan yang sering terjadi ada dua: lupa menyamakan penyebut, dan keliru menjumlahkan pecahan campuran. Contohnya, satu per tiga ditambah empat per enam bukan lima per sembilan, sebab penyebut tidak ikut dijumlahkan.",
      bersih(0),
      tambah(0, judul("Hati-hati")),
      tambah("menyamakan", ...kartu("q1", 20, 40, 126, 36, W.merahMuda, ["menyamakan penyebut"], 9)),
      tambah("menjumlahkan", ...kartu("q2", 154, 40, 126, 36, W.merahMuda, ["bilangan campuran"], 9)),
      tambah("Contohnya,", teks("q3", 150, 108, "1/3 + 4/6 = 5/9 ?", 16, W.merah)),
      tambah("tidak", teks("q4", 150, 132, "penyebut ikut dijumlahkan: salah", 9.4, W.merah), teks("q5", 150, 156, "benar: 2/6 + 4/6 = 6/6 = 1", 11, W.hijau)),
    ),
    k(
      "Tantangan untukmu: carilah jumlah dua pecahan lain dengan cara yang kamu pilih, tanpa bantuan. Lalu bandingkan hasilmu dengan hasil temanmu, atau carilah contoh penjumlahan pecahan di sekitarmu.",
      bersih(0),
      tambah(0, judul("Tantangan")),
      tambah("carilah", ...kartu("d1", 20, 46, 126, 56, W.hijauMuda, ["cari jumlah", "pecahan lain"], 9.4)),
      tambah("bandingkan", ...kartu("d2", 154, 46, 126, 56, W.langit, ["bandingkan hasil", "dengan temanmu"], 9.4)),
      tambah("sekitarmu.", emo("d3", 150, 140, "🔎", 28)),
    ),
    k(
      "Renungan: apakah kamu sudah bisa menjumlahkan pecahan? Coba pikirkan dalam hati, bagian mana yang sudah kamu kuasai dan bagian mana yang masih membuatmu ragu.",
      bersih(0),
      tambah(0, judul("Renungan")),
      tambah("sudah@1", ...kartu("f1", 16, 40, 268, 50, W.hijauMuda, ["bagian mana yang", "sudah kamu kuasai?"], 9.4)),
      tambah("masih", ...kartu("f2", 16, 104, 268, 50, W.krem, ["bagian mana yang", "masih membuatmu ragu?"], 9.4)),
      tambah("hati,", emo("f4", 150, 178, "💭", 22)),
    ),
    k(
      "Itulah penjumlahan pecahan yang sudah kita pelajari. Penyebut sama, jumlahkan pembilangnya. Penyebut berbeda, samakan dulu dengan pecahan senilai. Pecahan campuran, ubah ke pecahan biasa atau pisahkan bilangan bulat dan pecahannya.",
      bersih(0),
      tambah(0, judul("Rangkuman penjumlahan pecahan")),
      tambah("sama,", ...kartu("r1", 20, 36, 260, 40, W.hijauMuda, ["penyebut sama:", "jumlahkan pembilang"], 9.4)),
      tambah("berbeda,", ...kartu("r2", 20, 84, 260, 40, W.pink, ["penyebut berbeda:", "samakan dulu"], 9.4)),
      tambah("campuran,", ...kartu("r3", 20, 132, 260, 40, W.krem, ["pecahan campuran:", "ubah atau pisahkan"], 9.4)),
    ),
  ],
};
