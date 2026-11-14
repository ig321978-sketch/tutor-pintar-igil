import type { AdeganStory } from "./logika-story";
import { W, WARNA_PASANGAN, deret, emo, faktor, judul, kartu, kurungDeret, sebar, teks } from "./k5b2c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b2c-bantu";

/** Baris pasangan kali: a x b = n di tengah kanvas pada tinggi y. */
const pas = (id: string, y: number, a: number, b: number, n: number, warna: string, u = 15) => teks(id, 150, y, `${a} × ${b} = ${n}`, u, warna);

const xs6 = sebar(6, 40, 260);
const xs5 = sebar(5, 40, 260);
const c12 = deret("f12", xs6, 76, 15, faktor(12));
const k12 = kurungDeret("f12", xs6, 76, 15, 6);
const c5 = deret("g12", xs5, 76, 15, [1, 2, 3, 6, 12]);
const k5 = kurungDeret("g12", xs5, 76, 15, 5);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk mencari faktor",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 43–46",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana cara menemukan semua faktor sebuah bilangan? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("Bagaimana", teks("pq", 150, 80, "faktor dari 36 = ?", 20, W.merah)),
      tambah("berbeda.", emo("gl", 150, 140, "🌍", 36)),
      tambah("empat", teks("m4", 150, 176, "4 metode", 12, W.biru)),
    ),
    k(
      "Empat metode itu: Factor Pairs, Factor Rainbow, Array Model, dan Trial Division Ladder.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Pairs,", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Factor Pairs"], 9.4)),
      tambah("Rainbow,", ...kartu("m2", 20, 70, 260, 30, W.langit, ["2. Factor Rainbow"], 9.4)),
      tambah("Array", ...kartu("m3", 20, 108, 260, 30, W.krem, ["3. Array Model"], 9.4)),
      tambah("Trial", ...kartu("m4", 20, 146, 260, 30, W.pink, ["4. Trial Division Ladder"], 9.4)),
    ),
    k(
      "Semua metode berangkat dari gagasan yang sama: faktor adalah bilangan yang membagi habis sebuah bilangan, dan faktor selalu berpasangan. Bedanya, tiap metode menampilkannya dengan cara sendiri.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("membagi", ...kartu("g1", 30, 40, 240, 40, W.hijauMuda, ["faktor membagi habis bilangan"], 10)),
      tambah("berpasangan.", ...kartu("g2", 30, 92, 240, 40, W.langit, ["faktor selalu berpasangan"], 10)),
      tambah("sendiri.", teks("g3", 150, 164, "cara menampilkannya berbeda-beda", 10, W.merah)),
    ),
    k(
      "Angka yang kita pakai dari buku: dua belas dan delapan belas dari eksplorasi, serta dua puluh empat, tiga puluh enam, lima puluh empat, tujuh puluh dua, dan sembilan puluh enam dari Ayo Berlatih.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("dua", ...kartu("a1", 14, 36, 272, 44, W.hijauMuda, ["Eksplorasi 2.3A: 12", "Eksplorasi 2.3B: 18"], 9.4)),
      tambah("serta", ...kartu("a2", 14, 94, 272, 36, W.pink, ["Ayo Berlatih: 24, 36, 54, 72, 96"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Factor Pairs: konsep ------------------------------ */
export const ADEGAN_LUAR_PASANGAN: AdeganStory = {
  id: "luar-pasangan",
  judul: "Factor Pairs: pasangan faktor",
  sumber: "Metode luar: Factor Pairs",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Factor Pairs, artinya pasangan faktor. Tulis semua pasangan bilangan yang hasil kalinya sama dengan bilangan itu.",
      tambah(0, judul("Factor Pairs")),
      tambah("pasangan", teks("ab", 150, 84, "a × b = n", 26, W.biru)),
      tambah("hasil", ...kartu("fp", 30, 108, 240, 40, W.hijauMuda, ["hasil kali sama dengan", "bilangan itu"], 10)),
    ),
    k(
      "Mulai dari satu dan bilangan itu sendiri. Untuk dua belas: satu kali dua belas sama dengan dua belas. Itu pasangan pertama.",
      bersih(0),
      tambah(0, judul("Faktor dari 12")),
      tambah("Untuk", teks("u1", 150, 60, "faktor dari 12", 14, W.ungu)),
      tambah("kali", teks("u2", 150, 104, "1 × 12 = 12", 24, W.oranye)),
      tambah("pasangan", teks("u3", 150, 140, "pasangan pertama: 1 dan 12", 11, W.hitam)),
    ),
    k(
      "Lanjut: dua kali enam sama dengan dua belas, dan tiga kali empat juga dua belas. Berikutnya empat kali tiga, yang hanya mengulang pasangan tadi, jadi kita berhenti.",
      bersih(0),
      tambah(0, judul("Pasangan faktor dari 12")),
      tambah(0, pas("p1", 56, 1, 12, 12, WARNA_PASANGAN[0])),
      tambah(1, pas("p2", 84, 2, 6, 12, WARNA_PASANGAN[1])),
      tambah(9, pas("p3", 112, 3, 4, 12, WARNA_PASANGAN[2])),
      tambah(16, pas("p4", 140, 4, 3, 12, W.coklat), teks("p4n", 150, 160, "hanya mengulang pasangan tadi", 9.6, W.coklat)),
      tambah(26, teks("p5", 150, 186, "berhenti", 12, W.merah)),
    ),
    k(
      "Dari pasangan-pasangan itu kita peroleh semua faktornya: satu, dua, tiga, empat, enam, dan dua belas. Cara ini rapi dan mudah diperiksa, sebab tiap pasangan harus kembali ke bilangan semula.",
      bersih(0),
      tambah(0, judul("Hasil Factor Pairs")),
      tambah("faktornya", teks("fl", 150, 80, "faktor 12: 1, 2, 3, 4, 6, 12", 14, W.hijau)),
      tambah("diperiksa,", ...kartu("ck", 30, 110, 240, 40, W.krem, ["periksa: tiap pasangan", "dikali kembali 12"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Factor Pairs: penerapan ------------------------------ */
export const ADEGAN_LUAR_PASANGAN_TERAPAN: AdeganStory = {
  id: "luar-pasangan-terapan",
  judul: "Factor Pairs pada angka buku",
  sumber: "Metode luar: Factor Pairs; Buku Siswa hlm. 46",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Terapkan pada tiga puluh enam, Ayo Berlatih nomor dua. Pasangannya: satu kali tiga puluh enam, dua kali delapan belas, tiga kali dua belas, dan empat kali sembilan.",
      tambah(0, judul("Faktor dari 36")),
      tambah(5, teks("nb", 150, 36, "Ayo Berlatih nomor 2", 9, W.coklat)),
      tambah(10, pas("q1", 60, 1, 36, 36, WARNA_PASANGAN[0])),
      tambah(15, pas("q2", 88, 2, 18, 36, WARNA_PASANGAN[1])),
      tambah(19, pas("q3", 116, 3, 12, 36, WARNA_PASANGAN[2])),
      tambah(24, pas("q4", 144, 4, 9, 36, WARNA_PASANGAN[3])),
    ),
    k(
      "Lalu enam kali enam sama dengan tiga puluh enam. Pasangannya sama, jadi enam ditulis sekali. Faktornya ada sembilan.",
      tambah("Lalu", pas("q5", 172, 6, 6, 36, WARNA_PASANGAN[4])),
      sorotkan("sekali.", "q5"),
      tambah("Faktornya", teks("ql", 150, 192, "faktor 36: 1, 2, 3, 4, 6, 9, 12, 18, 36", 10, W.hijau)),
    ),
    k(
      "Sekarang lima puluh empat, Ayo Berlatih nomor tiga: satu kali lima puluh empat, dua kali dua puluh tujuh, tiga kali delapan belas, dan enam kali sembilan.",
      bersih(0),
      tambah(0, judul("Faktor dari 54")),
      tambah(4, teks("nb", 150, 36, "Ayo Berlatih nomor 3", 9, W.coklat)),
      tambah(8, pas("r1", 60, 1, 54, 54, WARNA_PASANGAN[0])),
      tambah(13, pas("r2", 88, 2, 27, 54, WARNA_PASANGAN[1])),
      tambah(18, pas("r3", 116, 3, 18, 54, WARNA_PASANGAN[2])),
      tambah(23, pas("r4", 144, 6, 9, 54, WARNA_PASANGAN[3])),
    ),
    k(
      "Faktornya: satu, dua, tiga, enam, sembilan, delapan belas, dua puluh tujuh, dan lima puluh empat. Angka empat tidak ada dalam satu pun pasangan, jadi empat bukan faktor.",
      tambah(0, teks("rl", 150, 172, "faktor 54: 1, 2, 3, 6, 9, 18, 27, 54", 11, W.hijau)),
      tambah(15, teks("r5", 150, 192, "4 tidak muncul, bukan faktor", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Factor Rainbow: konsep ------------------------------ */
export const ADEGAN_LUAR_PELANGI: AdeganStory = {
  id: "luar-pelangi",
  judul: "Factor Rainbow: diagram pelangi faktor",
  sumber: "Metode luar: Factor Rainbow",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Factor Rainbow, atau diagram pelangi faktor. Tulis faktor berurutan dari yang terkecil dalam satu baris.",
      tambah(0, judul("Factor Rainbow")),
      tambah("Tulis", c12),
      tambah("terkecil", teks("tk", 150, 124, "urut dari yang terkecil", 10, W.coklat)),
    ),
    k(
      "Lalu hubungkan pasangan faktor dengan busur. Pasangan terluar menghubungkan satu dengan bilangan itu sendiri, lalu pasangan berikutnya makin ke dalam.",
      tambah("busur.", emo("pg", 150, 184, "🌈", 26)),
      tambah(7, k12[0]),
      tambah(15, k12[1]),
      tambah(17, k12[2]),
    ),
    k(
      "Bentuknya seperti pelangi. Kalau semua faktor sudah terhubung dan tidak ada yang sendirian, berarti daftarnya lengkap.",
      sorotkan("pelangi.", "f12-k0", "f12-k1", "f12-k2"),
      tambah("terhubung", ...kartu("pl1", 30, 128, 240, 32, W.hijauMuda, ["semua terhubung = lengkap"], 10)),
    ),
    k(
      "Cara ini berguna untuk memeriksa. Misalkan seseorang menulis satu, dua, tiga, enam, dan dua belas. Faktor tiga tidak punya pasangan, jadi ada faktor yang terlewat.",
      bersih(0),
      tambah(0, judul("Memeriksa dengan pelangi", W.merah)),
      tambah(8, c5),
      tambah(14, k5[0], k5[1]),
      tambah(16, teks("tq", xs5[2], 122, "tanpa pasangan", 9, W.merah)),
      sorotkan(16, "g12-b2"),
      tambah(22, teks("tl", 150, 170, "terlewat: 4", 13, W.merah)),
    ),
  ],
};
