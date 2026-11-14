import type { AdeganStory } from "./logika-story";
import { W, barisSel, emo, irisan, judul, kartu, teks } from "./k5b2d-gambar";
import { bersih, k, tambah, ubah } from "./k5b2d-bantu";

/** Perintah ubah warna sel sebuah baris (id `${id}-${i}`): emas bila bilangannya ada di `sama`, selain itu `lain`. */
const ubahSama = (id: string, isi: number[], sama: number[], lain: string) => isi.map((n, i) => ({ id: `${id}-${i}`, warna: sama.includes(n) ? W.emas : lain }));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk mencari FPB",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 48–53 dan Panduan Guru hlm. 72–76",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana mencari faktor persekutuan terbesar dua bilangan? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("Bagaimana", teks("pq", 150, 82, "FPB dari 12 dan 18 ?", 18, W.merah)),
      tambah("berbeda.", emo("gl", 150, 142, "🌍", 36)),
    ),
    k(
      "Empat metode itu: Common Factors List, GCF Concept, Euclid Preview, dan Equal Packing.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Common", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Common Factors List"], 9.6)),
      tambah("GCF", ...kartu("m2", 20, 70, 260, 30, W.langit, ["2. GCF Concept"], 9.6)),
      tambah("Euclid", ...kartu("m3", 20, 108, 260, 30, W.krem, ["3. Euclid Preview"], 9.6)),
      tambah("Equal", ...kartu("m4", 20, 146, 260, 30, W.pink, ["4. Equal Packing"], 9.6)),
    ),
    k(
      "Semua metode menuju satu hasil. Faktor persekutuan terbesar adalah bilangan terbesar yang membagi habis kedua bilangan. Bedanya, tiap metode menemukannya dengan jalan sendiri.",
      bersih(0),
      tambah(0, judul("Satu hasil yang sama")),
      tambah("Semua", teks("g1", 150, 62, "12 : 6 = 2", 17, W.hijau), teks("g2", 150, 92, "18 : 6 = 3", 17, W.hijau)),
      tambah("membagi", teks("g3", 150, 132, "6 membagi habis keduanya", 10.6, W.hitam)),
      tambah("jalan", teks("g4", 150, 164, "jalan menemukannya berbeda", 10.4, W.merah)),
    ),
    k(
      "Angka dari buku: dua belas dan delapan belas, soal tambahan, pasangan delapan dan dua puluh, mawar Nisa, dan paket Dania.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("belas", ...kartu("a1", 14, 32, 272, 28, W.hijauMuda, ["daftar: 12 dan 18; 18 dan 24; 14 dan 28"], 8.6)),
      tambah("pasangan", ...kartu("a2", 14, 68, 272, 28, W.langit, ["irisan: 8 dan 20; 12 dan 28; 6 dan 12"], 8.6)),
      tambah("mawar", ...kartu("a3", 14, 104, 272, 28, W.krem, ["selisih: 24 dan 18; 42 dan 12"], 8.6)),
      tambah("Dania.", ...kartu("a4", 14, 140, 272, 28, W.pink, ["paket: mawar 24 dan 18; Dania 36, 48, 24"], 8.2)),
    ),
  ],
};

/* ------------------------------ 2. Common Factors List: konsep ------------------------------ */
const L12 = [1, 2, 3, 4, 6, 12];
const L18 = [1, 2, 3, 6, 9, 18];
export const ADEGAN_LUAR_DAFTAR: AdeganStory = {
  id: "luar-daftar",
  judul: "Common Factors List: daftar faktor persekutuan",
  sumber: "Metode luar: Common Factors List",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Common Factors List, artinya daftar faktor persekutuan. Tulis semua faktor tiap bilangan, lalu tandai faktor yang muncul di kedua daftar.",
      tambah(0, judul("Common Factors List")),
      tambah("Tulis", ...kartu("d1", 20, 50, 260, 40, W.hijauMuda, ["1. tulis semua faktor", "tiap bilangan"], 9.4)),
      tambah("tandai", ...kartu("d2", 20, 110, 260, 40, W.langit, ["2. tandai faktor yang", "muncul di kedua daftar"], 9.4)),
    ),
    k(
      "Langkah satu: tulis faktor dua belas dan faktor delapan belas, dari yang terkecil. Pasangan faktor membantu: dua belas sama dengan satu kali dua belas, dua kali enam, dan tiga kali empat.",
      bersih(0),
      tambah(0, judul("Langkah 1: tulis faktor")),
      tambah("dua", teks("r12", 22, 62, "12", 11, W.hijau), ...barisSel("c12", 42, 46, 36, 24, L12, W.hijauMuda, 10)),
      tambah("delapan", teks("r18", 22, 100, "18", 11, W.merah), ...barisSel("c18", 42, 84, 36, 24, L18, W.merahMuda, 10)),
      tambah("Pasangan", teks("pf", 150, 140, "12 = 1 × 12 = 2 × 6 = 3 × 4", 12, W.coklat)),
    ),
    k(
      "Langkah dua: tandai bilangan yang ada di kedua daftar, yaitu satu, dua, tiga, dan enam. Bilangan empat, sembilan, dua belas, dan delapan belas hanya ada di satu daftar.",
      ubah("yaitu", ...ubahSama("c12", L12, [1, 2, 3, 6], W.hijauMuda), ...ubahSama("c18", L18, [1, 2, 3, 6], W.merahMuda)),
      ubah("hanya", ...ubahSama("c12", L12, [1, 2, 3, 6], W.abu), ...ubahSama("c18", L18, [1, 2, 3, 6], W.abu)),
      tambah("tandai", teks("tm", 150, 176, "emas: ada di kedua daftar", 10, W.coklat)),
    ),
    k(
      "Langkah tiga: ambil yang terbesar dari bilangan bertanda. Enam adalah yang terbesar, jadi FPB dua belas dan delapan belas adalah enam. Kelebihannya, mudah dan terlihat langsung.",
      bersih(0),
      tambah(0, judul("Langkah 3: ambil terbesar")),
      tambah("Langkah", ...barisSel("cm", 54, 46, 48, 28, [1, 2, 3, 6], [W.hijauMuda, W.hijauMuda, W.hijauMuda, W.emas], 12)),
      tambah("Enam", teks("hb", 150, 106, "yang terbesar: 6", 11, W.coklat)),
      tambah("jadi", teks("hf", 150, 142, "FPB dari 12 dan 18 adalah 6", 12, W.hijau)),
      tambah("Kelebihannya,", teks("hk", 150, 176, "mudah dan terlihat langsung", 10, W.biru)),
    ),
  ],
};

/* ------------------------------ 3. Common Factors List: penerapan ------------------------------ */
const E18 = [1, 2, 3, 6, 9, 18];
const E24 = [1, 2, 3, 4, 6, 8, 12, 24];
const E14 = [1, 2, 7, 14];
const E28 = [1, 2, 4, 7, 14, 28];
export const ADEGAN_LUAR_DAFTAR_TERAPAN: AdeganStory = {
  id: "luar-daftar-terapan",
  judul: "Common Factors List pada soal tambahan buku",
  sumber: "Metode luar: Common Factors List; Panduan Guru hlm. 72 (soal tambahan 1 dan 2)",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Terapkan pada soal tambahan nomor satu: delapan belas dan dua puluh empat. Faktor delapan belas: satu, dua, tiga, enam, sembilan, delapan belas. Faktor dua puluh empat: satu, dua, tiga, empat, enam, delapan, dua belas, dua puluh empat.",
      tambah(0, judul("Soal tambahan 1: 18 dan 24")),
      tambah("Faktor", teks("s18", 20, 74, "18", 10.4, W.hijau), ...barisSel("t18", 38, 58, 31, 24, E18, W.hijauMuda, 9.6)),
      tambah("Faktor@2", teks("s24", 20, 122, "24", 10.4, W.merah), ...barisSel("t24", 38, 106, 31, 24, E24, W.merahMuda, 9.6)),
    ),
    k(
      "Bilangan yang ada di kedua daftar: satu, dua, tiga, dan enam. Terbesarnya enam, jadi FPB delapan belas dan dua puluh empat adalah enam.",
      ubah("kedua", ...ubahSama("t18", E18, [1, 2, 3, 6], W.abu), ...ubahSama("t24", E24, [1, 2, 3, 6], W.abu)),
      tambah("jadi", teks("sf", 150, 170, "FPB dari 18 dan 24 adalah 6", 12, W.hijau)),
    ),
    k(
      "Contoh kedua, soal tambahan nomor dua: empat belas dan dua puluh delapan. Faktor empat belas: satu, dua, tujuh, empat belas. Faktor dua puluh delapan: satu, dua, empat, tujuh, empat belas, dua puluh delapan.",
      bersih(0),
      tambah(0, judul("Soal tambahan 2: 14 dan 28")),
      tambah("Faktor", teks("u14", 20, 74, "14", 10.4, W.hijau), ...barisSel("v14", 40, 58, 40, 24, E14, W.hijauMuda, 10)),
      tambah("Faktor@2", teks("u28", 20, 122, "28", 10.4, W.merah), ...barisSel("v28", 40, 106, 40, 24, E28, W.merahMuda, 10)),
    ),
    k(
      "Faktor persekutuannya satu, dua, tujuh, dan empat belas. Terbesarnya empat belas, jadi FPB empat belas dan dua puluh delapan adalah empat belas.",
      ubah("persekutuannya", ...ubahSama("v14", E14, [1, 2, 7, 14], W.abu), ...ubahSama("v28", E28, [1, 2, 7, 14], W.abu)),
      tambah("jadi", teks("uf", 150, 162, "FPB dari 14 dan 28 adalah 14", 12, W.hijau)),
      tambah("Terbesarnya", teks("ug", 150, 184, "14 adalah faktor dari 28", 9.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 4. GCF Concept: konsep ------------------------------ */
export const ADEGAN_LUAR_GCF: AdeganStory = {
  id: "luar-gcf",
  judul: "GCF Concept: FPB dari irisan",
  sumber: "Metode luar: GCF Concept",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, GCF Concept, artinya FPB dari irisan. Faktor dua bilangan digambar sebagai dua lingkaran. Faktor persekutuan terletak di bagian yang saling beririsan.",
      tambah(0, judul("GCF Concept")),
      tambah("Faktor", ...irisan("g", 100, 160, 104, 44, [], [], []), teks("va", 76, 52, "bilangan A", 9.4, W.hijau), teks("vb", 184, 52, "bilangan B", 9.4, W.merah)),
      tambah("beririsan.", teks("vi", 150, 176, "irisan: faktor persekutuan", 10.4, W.coklat)),
    ),
    k(
      "Contohnya delapan dan dua puluh, dari soal b Eksplorasi dua titik empat A. Faktor delapan: satu, dua, empat, delapan. Faktor dua puluh: satu, dua, empat, lima, sepuluh, dua puluh.",
      ubah("Contohnya", { id: "va", isi: "faktor 8" }, { id: "vb", isi: "faktor 20" }),
      tambah("delapan@3", ...irisan("g", 100, 160, 104, 44, [8], [1, 2, 4], []).filter((o) => /^g-[lm]/.test(o.id))),
      tambah("puluh@3", ...irisan("g", 100, 160, 104, 44, [], [], [5, 10, 20]).filter((o) => /^g-r/.test(o.id))),
    ),
    k(
      "Bilangan di irisan, yaitu satu, dua, dan empat, adalah faktor persekutuan. Yang terbesar di irisan, yaitu empat, adalah FPB delapan dan dua puluh.",
      ubah("irisan,", { id: "g-m1", warna: W.hijau }, { id: "g-m2", warna: W.hijau }, { id: "g-m4", warna: W.hijau }),
      ubah("terbesar", { id: "g-m4", warna: W.merah, u: 12 }),
      tambah("FPB", teks("gf", 150, 192, "FPB dari 8 dan 20 adalah 4", 12, W.hijau)),
    ),
    k(
      "Ada sifat menarik: setiap bilangan di irisan membagi habis FPB. Satu, dua, dan empat semuanya membagi habis empat. Jadi faktor persekutuan dua bilangan tepat sama dengan faktor dari FPB-nya.",
      bersih(0),
      tambah(0, judul("Isi irisan membagi FPB")),
      tambah("setiap", teks("q1", 150, 56, "4 : 1 = 4", 15, W.hitam)),
      tambah("Satu,", teks("q2", 150, 84, "4 : 2 = 2", 15, W.hitam)),
      tambah("semuanya", teks("q3", 150, 112, "4 : 4 = 1", 15, W.hitam)),
      tambah("Jadi", teks("q4", 150, 150, "faktor dari 4: 1, 2, 4", 10.6, W.hijau), teks("q5", 150, 172, "sama dengan isi irisan", 10, W.coklat)),
    ),
  ],
};

/* ------------------------------ 5. GCF Concept: penerapan ------------------------------ */
export const ADEGAN_LUAR_GCF_TERAPAN: AdeganStory = {
  id: "luar-gcf-terapan",
  judul: "GCF Concept pada Eksplorasi 2.4A soal c dan a",
  sumber: "Metode luar: GCF Concept; Buku Siswa hlm. 49–50; Panduan Guru hlm. 70–71",
  latar: "#E0F2FE",
  ketukan: [
    k(
      "Terapkan pada soal c Eksplorasi dua titik empat A: dua belas dan dua puluh delapan. Faktor dua belas adalah satu, dua, tiga, empat, enam, dan dua belas.",
      tambah(0, judul("Soal c: 12 dan 28")),
      tambah("Terapkan", ...irisan("h", 100, 160, 100, 44, [], [], []), teks("va", 76, 50, "faktor 12", 9.4, W.hijau), teks("vb", 184, 50, "faktor 28", 9.4, W.merah)),
      tambah("Faktor", ...irisan("h", 100, 160, 100, 44, [3, 6, 12], [1, 2, 4], []).filter((o) => /^h-[lm]/.test(o.id))),
    ),
    k(
      "Faktor dua puluh delapan adalah satu, dua, empat, tujuh, empat belas, dan dua puluh delapan. Tujuh, empat belas, dan dua puluh delapan hanya milik dua puluh delapan.",
      tambah("tujuh,", ...irisan("h", 100, 160, 100, 44, [], [], [7, 14, 28]).filter((o) => /^h-r/.test(o.id))),
      tambah("hanya", teks("vt", 150, 172, "7, 14, 28 hanya milik 28", 10, W.coklat)),
    ),
    k(
      "Irisannya satu, dua, dan empat. Yang terbesar di irisan adalah empat, jadi FPB dua belas dan dua puluh delapan adalah empat, sesuai kunci Panduan Guru.",
      ubah("Irisannya", { id: "h-m1", warna: W.hijau }, { id: "h-m2", warna: W.hijau }, { id: "h-m4", warna: W.hijau }),
      ubah("terbesar", { id: "h-m4", warna: W.merah, u: 12 }),
      tambah("jadi", teks("hf", 150, 190, "FPB dari 12 dan 28 adalah 4", 11, W.hijau)),
    ),
    k(
      "Contoh kedua, soal a: enam dan dua belas. Faktor enam adalah satu, dua, tiga, dan enam. Semuanya juga faktor dua belas, sehingga bagian khusus enam kosong.",
      bersih(0),
      tambah(0, judul("Soal a: 6 dan 12")),
      tambah("Contoh", ...irisan("i", 100, 160, 100, 44, [], [], []), teks("ia", 76, 50, "faktor 6", 9.4, W.hijau), teks("ib", 184, 50, "faktor 12", 9.4, W.merah)),
      tambah("Faktor", ...irisan("i", 100, 160, 100, 44, [], [1, 2, 3, 6], []).filter((o) => /^i-m/.test(o.id))),
      tambah("Semuanya", ...irisan("i", 100, 160, 100, 44, [], [], [4, 12]).filter((o) => /^i-r/.test(o.id))),
      tambah("kosong.", teks("ik", 84, 104, "kosong", 8.4, W.coklat)),
    ),
    k(
      "Karena semua faktor enam ada di irisan, yang terbesar di irisan adalah enam sendiri. Jadi FPB enam dan dua belas adalah enam. Bila satu bilangan faktor dari yang lain, FPB-nya bilangan yang lebih kecil.",
      ubah("irisan,", { id: "i-m6", warna: W.merah, u: 12 }),
      tambah("Jadi", teks("if", 150, 176, "FPB dari 6 dan 12 adalah 6", 12, W.hijau)),
      tambah("lebih", teks("ig", 150, 192, "bilangan yang lebih kecil", 8.6, W.coklat)),
    ),
  ],
};

