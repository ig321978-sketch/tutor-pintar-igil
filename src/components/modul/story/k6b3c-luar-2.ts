import type { AdeganStory } from "./logika-story";
import { W, bersih, bulat, emo, garis, hapus, k, kisiTegak, kotak, lintasan, panah, redamkan, rute, sorotkan, tambah, teks, titik, ubah } from "./k6b3c-gambar";

/** Tujuh kotak berisi huruf kata gerak (K kanan, A atas) mulai (x, y). */
const kata7 = (id: string, x: number, y: number, kata: string) =>
  kata.split("").flatMap((h, i) => [kotak(`${id}-${i}`, x + i * 17, y, 15, 15, h === "K" ? "#BFDBFE" : "#FECACA", W.biru, { rx: 3, tebal: 1 }), teks(`${id}-t${i}`, x + i * 17 + 7.5, y + 11, h, 9, h === "K" ? W.biruMuda : W.merah)]);
const hitung = (id: string, p: [number, number], n: number, warna: string = W.putih) => [bulat(`${id}-b`, p[0], p[1], 8, warna, W.biru, { tebal: 1.1, z: 2 }), teks(`${id}-n`, p[0], p[1] + 3, String(n), 8.4, W.biru, { z: 3 })];

/* ------------------------------ LC5. Monotone Lattice Path: konsep ------------------------------ */
const L = kisiTegak("l", 50, 170, 30, 4, 5, 1, 8);

export const ADEGAN_LUAR_C_LATTICE: AdeganStory = {
  id: "luarc-lattice",
  judul: "Monotone Lattice Path: jalur ke kanan dan ke atas",
  sumber: "Metode dari luar buku; contoh dari Buku Panduan Guru hlm. 106–107",
  latar: "#F0FFF6",
  ketukan: [
    k("Metode ketiga: Monotone Lattice Path. Jalur monoton hanya bergerak ke kanan atau ke atas, tidak pernah mundur.", tambah(0, teks("jud", 150, 20, "Monotone Lattice Path", 12, W.ungu), L.garisV, L.garisH, L.labH, L.labN), tambah("kanan", panah("ak", 190, 80, 44, 0, W.biruMuda, 3, { gambar: true }), teks("akt", 212, 72, "K: ke kanan", 8, W.biruMuda)), tambah("atas,", panah("aa", 262, 130, 0, -44, W.merah, 3, { gambar: true }), teks("aat", 262, 142, "A: ke atas", 8, W.merah)), tambah("mundur.", teks("tm", 212, 104, "tanpa mundur", 8, W.abuTua))),
    k("Dari A 1 ke D 5 diperlukan 3 langkah ke kanan dan 4 langkah ke atas. Tiap jalur dapat ditulis sebagai kata, K untuk kanan dan A untuk atas.", hapus(0, "tm"), tambah("kanan", rute("p1", lintasan(L, ["A", 1], "KKK"), W.biruMuda, 3), teks("c3", 130, 186, "3 ke kanan", 8, W.biruMuda)), tambah("atas", rute("p1b", lintasan(L, ["D", 1], "AAAA"), W.biruMuda, 3), teks("c4", 176, 112, "4 ke atas", 8, W.biruMuda, { anchor: "start" })), tambah("kata,", kata7("w1", 176, 36, "KKKAAAA"), teks("w1t", 236, 62, "kata jalur", 7.6, W.ungu))),
    k("Jalur lain misalnya K A K A K A A. Semua kata memuat 3 K dan 4 A, jadi panjangnya 7.", ubah(0, { id: "p1", warna: W.abuTua, tebal: 1.6, op: 0.7 }, { id: "p1b", warna: W.abuTua, tebal: 1.6, op: 0.7 }), tambah("lain", rute("p2", lintasan(L, ["A", 1], "KAKAKAA"), W.merah, 2.8), ...kata7("w2", 176, 82, "KAKAKAA")), tambah("memuat", teks("t3", 200, 132, "3 K", 8.6, W.biruMuda), teks("t4", 232, 132, "4 A", 8.6, W.merah)), tambah("panjangnya", teks("t7", 236, 150, "panjang 7", 9, W.biru))),
    k("Memilih sebuah jalur sama dengan memilih tempat untuk 3 huruf K dari 7 tempat. Sisanya otomatis menjadi A.", bersih(0), tambah(0, teks("jud", 150, 24, "Memilih tempat untuk huruf K", 10.5, W.ungu)), tambah("tempat", ...[1, 2, 3, 4, 5, 6, 7].flatMap((n) => [kotak(`pt${n}`, 22 + (n - 1) * 38, 60, 32, 32, W.putih, W.biru, { rx: 5 }), teks(`pn${n}`, 38 + (n - 1) * 38, 108, String(n), 9, W.abuTua)])), tambah("huruf", ...[1, 3, 5].map((n) => teks(`pk${n}`, 38 + (n - 1) * 38, 83, "K", 14, W.biruMuda))), ubah("huruf", ...[1, 3, 5].map((n) => ({ id: `pt${n}`, warna: "#BFDBFE" }))), tambah("Sisanya", ...[2, 4, 6, 7].map((n) => teks(`pa${n}`, 38 + (n - 1) * 38, 83, "A", 14, W.merah)))),
    k("Banyaknya cara memilih 3 tempat dari 7 tempat adalah 7 kali 6 kali 5 dibagi 3 kali 2 kali 1, hasilnya 35.", hapus(0, "pa2", "pa4", "pa6", "pa7", "pk1", "pk3", "pk5"), ubah(0, ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({ id: `pt${n}`, warna: W.putih }))), tambah("kali", teks("f1", 150, 140, "7 × 6 × 5", 14, W.biruMuda), garis("fg", 90, 148, 120, 0, W.biru, 2), teks("f2", 150, 168, "3 × 2 × 1", 14, W.biruMuda)), tambah("hasilnya", teks("f3", 150, 196, "= 35 jalur", 13, W.merah, { garis: W.emas }))),
    k("Hasilnya sama jika kita memilih 4 tempat untuk huruf A dari 7 tempat, yaitu 35 juga.", hapus(0, "f1", "fg", "f2"), ubah(0, { id: "f3", isi: "35 jalur lagi", u: 12 }), tambah("memilih", ...[1, 2, 4, 6].map((n) => teks(`qa${n}`, 38 + (n - 1) * 38, 83, "A", 14, W.merah))), tambah("4", teks("q4", 150, 146, "memilih 4 dari 7", 11, W.merah)), sorotkan("juga.", "f3")),
  ],
};
/* ------------------------------ LC6. Monotone Lattice Path diterapkan ------------------------------ */
const N = kisiTegak("n", 56, 150, 36, 4, 3, 1, 8);
const np = N.pt;
const KATA_B3 = ["KAA", "AKA", "AAK"];
const KATA_C2 = ["KKA", "KAK", "AKK"];
const KATA_C3 = ["KKAA", "KAKA", "KAAK", "AKKA", "AKAK", "AAKK"];
const WARNA = [W.biruMuda, W.merah, W.hijau, W.ungu, W.salem, W.coklat];
const daftarKata = (id: string, daftar: string[]) => daftar.map((w, i) => teks(`${id}${i}`, 242, 56 + i * 13, w.split("").join(" "), 8.6, WARNA[i]));
const jalurKata = (id: string, daftar: string[]) => daftar.map((w, i) => rute(`${id}${i}`, lintasan(N, ["A", 1], w), WARNA[i], 2.4));

export const ADEGAN_LUAR_C_LATTICE_TERAPAN: AdeganStory = {
  id: "luarc-lattice-terapan",
  judul: "Monotone Lattice Path diterapkan pada titik kecil",
  sumber: "Metode dari luar buku; contoh dari Buku Panduan Guru hlm. 106",
  latar: "#FFF7ED",
  ketukan: [
    k("Uji dengan titik kecil. Dari A 1 ke B 3 diperlukan 1 langkah ke kanan dan 2 langkah ke atas, jadi kata berisi satu K dan dua A.", tambah(0, teks("jud", 150, 20, "Titik kecil dulu", 11, W.ungu), N.garisV, N.garisH, N.labH, N.labN), tambah(5, titik("a1", np("A", 1), W.hijau, 4.6)), tambah(8, titik("b3", np("B", 3), W.merah, 4.6)), tambah("kanan", teks("e1", 200, 150, "1 ke kanan", 8.6, W.biruMuda)), tambah("atas,", teks("e2", 200, 162, "2 ke atas", 8.6, W.merah))),
    k("Tiga kata yang mungkin: K A A, A K A, dan A A K. Jadi ke B 3 ada 3 jalur, sesuai tabel buku.", hapus(0, "e1", "e2"), tambah("Tiga", jalurKata("pb", KATA_B3)), tambah("kata", daftarKata("kb", KATA_B3)), tambah("jalur,", teks("n3", 242, 140, "3 jalur", 10, W.biru, { garis: W.emas }))),
    k("Ke C 2 diperlukan 2 K dan 1 A, jadi juga tiga kata: K K A, K A K, dan A K K. Cocok dengan buku, 3 cara.", hapus(0, "pb0", "pb1", "pb2", "kb0", "kb1", "kb2", "b3"), tambah("Ke", titik("c2", np("C", 2), W.merah, 4.6)), tambah("kata:", jalurKata("pc", KATA_C2), daftarKata("kc", KATA_C2)), ubah("cara.", { id: "n3", isi: "3 cara" })),
    k("Ke C 3 diperlukan 2 K dan 2 A. Ada 6 kata yang mungkin, misalnya K K A A, K A K A, dan A A K K.", hapus(0, "pc0", "pc1", "pc2", "kc0", "kc1", "kc2", "c2", "n3"), tambah("diperlukan", titik("c3", np("C", 3), W.merah, 4.6)), tambah("kata", jalurKata("pd", KATA_C3)), tambah("misalnya", daftarKata("kd", KATA_C3)), tambah("6", teks("n6", 242, 140, "6 jalur", 10, W.biru, { garis: W.emas }))),
    k("Memilih 2 tempat dari 4 tempat adalah 4 kali 3 dibagi 2 kali 1, yaitu 6. Angka 6 ini sama dengan tabel buku di C 3.", hapus(0, "pd0", "pd1", "pd2", "pd3", "pd4", "pd5", "kd0", "kd1", "kd2", "kd3", "kd4", "kd5"), tambah("kali", teks("g1", 242, 70, "4 × 3", 13, W.biruMuda), garis("gg", 214, 78, 56, 0, W.biru, 2), teks("g2", 242, 96, "2 × 1", 13, W.biruMuda)), tambah("yaitu", teks("g3", 242, 122, "= 6", 13, W.merah)), sorotkan("tabel", "c3", "n6")),
    k("Untuk A 1 ke D 5, kata memuat 3 K dan 4 A, panjangnya 7, sehingga banyaknya 35, sesuai jawaban buku.", hapus(0, "g1", "gg", "g2", "g3", "c3", "n6", "a1"), tambah("kata", kotak("fin", 196, 50, 98, 92, W.putih, W.biru, { rx: 8 }), teks("fa", 245, 70, "A 1 ke D 5", 9.4, W.ungu), teks("fb", 245, 88, "3 K dan 4 A", 9.4), teks("fc", 245, 106, "panjang kata 7", 9.4)), tambah("35,", teks("fd", 245, 130, "35 jalur", 12, W.merah, { garis: W.emas }))),
  ],
};
/* ------------------------------ LC7. Pascal Counting Recurrence ------------------------------ */
const P = kisiTegak("c", 56, 168, 30, 4, 5, 1, 8);
const pp = P.pt;
const nilai = (h: string, n: number, v: number) => hitung(`c${h}${n}`, pp(h, n), v);

export const ADEGAN_LUAR_C_PASCAL: AdeganStory = {
  id: "luarc-pascal",
  judul: "Pascal Counting Recurrence: jumlah dua tetangga",
  sumber: "Metode dari luar buku; contoh dari Buku Panduan Guru hlm. 106–107",
  latar: "#F3F0FF",
  ketukan: [
    k("Metode keempat: Pascal Counting Recurrence, aturan berulang untuk menghitung jalur. Cara ke suatu titik sama dengan cara dari kiri ditambah cara dari bawah.", tambah(0, teks("jud", 150, 20, "Pascal Counting Recurrence", 11, W.ungu), P.garisV, P.garisH, P.labH, P.labN), tambah("suatu", bulat("ft", 252, 90, 10, "#FDE68A", W.biru), teks("ftt", 252, 94, "titik", 7.4)), tambah("kiri", bulat("fk", 200, 90, 10, W.putih, W.biruMuda), teks("fkt", 200, 94, "kiri", 7.4), panah("fka", 211, 90, 28, 0, W.biruMuda, 2.4, { gambar: true })), tambah("bawah.", bulat("fb", 252, 140, 10, W.putih, W.merah), teks("fbt", 252, 144, "bawah", 7.2), panah("fba", 252, 129, 0, -28, W.merah, 2.4, { gambar: true }))),
    k("Mulai dari titik awal A 1 yang diberi angka 1. Kolom A hanya bisa dicapai dengan naik, jadi semuanya 1. Baris 1 juga semuanya 1.", hapus(0, "ft", "ftt", "fk", "fkt", "fka", "fb", "fbt", "fba"), tambah("awal", nilai("A", 1, 1)), tambah("Kolom", [2, 3, 4, 5].flatMap((n) => nilai("A", n, 1))), tambah("Baris", ["B", "C", "D"].flatMap((h) => nilai(h, 1, 1)))),
    k("Baris 2: B 2 sama dengan 1 ditambah 1, yaitu 2. C 2 adalah 2 ditambah 1, yaitu 3. D 2 adalah 3 ditambah 1, yaitu 4.", tambah(10, nilai("B", 2, 2)), tambah(18, nilai("C", 2, 3)), tambah(26, nilai("D", 2, 4))),
    k("Baris 3: B 3 adalah 3, C 3 adalah 3 ditambah 3, yaitu 6, dan D 3 adalah 6 ditambah 4, yaitu 10.", tambah(5, nilai("B", 3, 3)), tambah(13, nilai("C", 3, 6)), tambah(22, nilai("D", 3, 10))),
    k("Baris 4: 1, 4, 10, dan 20. Baris 5: 1, 5, 15, dan akhirnya D 5 adalah 20 ditambah 15, yaitu 35.", tambah(3, nilai("B", 4, 4)), tambah(4, nilai("C", 4, 10)), tambah(6, nilai("D", 4, 20)), tambah(10, nilai("B", 5, 5)), tambah(11, nilai("C", 5, 15)), tambah(21, nilai("D", 5, 35)), sorotkan(21, "cD5-b")),
  ],
};

/* ------------------------------ LC8. Segitiga Pascal ------------------------------ */
const BARIS_PASCAL = (() => {
  const b: number[][] = [[1]];
  for (let r = 1; r <= 7; r += 1) b.push(Array.from({ length: r + 1 }, (_, i) => (i === 0 || i === r ? 1 : b[r - 1][i - 1] + b[r - 1][i])));
  return b;
})();
const sel = (r: number, i: number) => ({ x: 150 + (i - r / 2) * 25, y: 40 + r * 16 });
const barisPascal = (r: number) => BARIS_PASCAL[r].map((v, i) => teks(`ps${r}-${i}`, sel(r, i).x, sel(r, i).y, String(v), 8.4, W.biru));

export const ADEGAN_LUAR_C_PASCAL_SEGITIGA: AdeganStory = {
  id: "luarc-pascal-segitiga",
  judul: "Segitiga Pascal dan jumlah jalur",
  sumber: "Metode dari luar buku; contoh dari Buku Panduan Guru hlm. 107",
  latar: "#FFFBEB",
  ketukan: [
    k("Angka-angka itu bukan kebetulan. Dalam segitiga Pascal, setiap angka adalah jumlah dua angka di atasnya.", tambah(0, teks("jud", 150, 18, "Segitiga Pascal", 11, W.ungu), [0, 1, 2, 3].flatMap(barisPascal)), sorotkan("jumlah", "ps2-0", "ps2-1", "ps3-1")),
    k("Baris berikutnya: 1, 4, 6, 4, 1, lalu 1, 5, 10, 10, 5, 1, kemudian 1, 6, 15, 20, 15, 6, 1.", redamkan(0, "ps2-0", "ps2-1", "ps3-1"), tambah("berikutnya", barisPascal(4)), tambah("lalu", barisPascal(5)), tambah("kemudian", barisPascal(6))),
    k("Baris terakhir: 1, 7, 21, 35, 35, 21, 7, 1. Angka 35 ada di sini, sama dengan jumlah jalur dari A 1 ke D 5, karena ada 7 langkah dengan 3 K.", tambah("Baris", barisPascal(7)), sorotkan("35", "ps7-3", "ps7-4"), ubah("35", { id: "ps7-3", warna: W.merah }, { id: "ps7-4", warna: W.merah }), tambah("jalur", teks("kt", 150, 188, "35 = jalur dari A 1 ke D 5", 9, W.merah))),
    k("Angka 1, 3, 6, 10, 15 pada kolom C kisi tampak juga pada satu diagonal segitiga. Jadi dua cara berhitung ini saling cocok.", ubah(0, { id: "ps7-3", sorot: false, warna: W.biru }, { id: "ps7-4", sorot: false, warna: W.biru }), ubah(0, { id: "kt", op: 0 }), sorotkan("diagonal", "ps2-2", "ps3-2", "ps4-2", "ps5-2", "ps6-2"), tambah("cocok.", teks("kc", 150, 188, "diagonal ini sama dengan kolom C kisi", 8.6, W.hijau))),
  ],
};

/* ------------------------------ LC9. Ringkasan ------------------------------ */
const kartuR = (id: string, x: number, y: number, warna: string, baris: string[], arti: string) => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 18 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 18 + baris.length * 12 + 2, arti, 7, W.ungu),
];
const hasilR = (id: string, x: number, y: number, isi: string) => teks(id, x + 67, y + 62, isi, 8, W.merah);

export const ADEGAN_LUAR_C_RINGKAS: AdeganStory = {
  id: "luarc-ringkas",
  judul: "Ringkasan empat metode luar Sub-Bab C",
  sumber: "Ringkasan metode luar; contoh dari Buku Siswa hlm. 91–98",
  latar: "#EAF2FF",
  ketukan: [
    k("Ringkasan empat metode. Grid Reference Pair menuliskan alamat titik, misalnya Angga di D 4.", tambah(0, teks("jud", 150, 18, "Ringkasan empat metode", 11, W.ungu)), tambah("Grid", kartuR("r1", 10, 28, "#FDE68A", ["Grid Reference", "Pair"], "alamat titik")), tambah("misalnya", hasilR("r1h", 10, 28, "Angga: D 4"))),
    k("Manhattan Distance mengukur jarak, misalnya dari B 5 ke E 1 jaraknya 7.", tambah("Manhattan", kartuR("r2", 156, 28, "#FBCFE8", ["Manhattan", "Distance"], "jarak menyusuri kotak")), tambah("misalnya", hasilR("r2h", 156, 28, "B 5 ke E 1: 7"))),
    k("Monotone Lattice Path menghitung jalur terpendek, misalnya dari A 1 ke D 5 ada 35 jalur.", tambah("Monotone", kartuR("r3", 10, 108, "#BBF7D0", ["Monotone", "Lattice Path"], "jalur kanan dan atas")), tambah("misalnya", hasilR("r3h", 10, 108, "A 1 ke D 5: 35"))),
    k("Pascal Counting Recurrence menghitung dengan penjumlahan, misalnya C 3 adalah 3 ditambah 3, yaitu 6.", tambah("Pascal", kartuR("r4", 156, 108, "#BFDBFE", ["Pascal Counting", "Recurrence"], "jumlah dua tetangga")), tambah("misalnya", hasilR("r4h", 156, 108, "C 3: 3 + 3 = 6"))),
    k("Pilih metode sesuai pertanyaan: untuk letak gunakan alamat, untuk jauhnya gunakan jarak, dan untuk banyak cara gunakan jalur atau penjumlahan. Buku tetap sumber utama kita.", bersih(0), tambah(0, teks("jud", 150, 22, "Pilih metode sesuai pertanyaan", 11, W.ungu)), tambah("letak", kotak("q1", 20, 40, 260, 36, "#FDE68A", W.biru, { rx: 8 }), teks("q1t", 150, 63, "Di mana?  →  alamat (Grid Reference Pair)", 8.6)), tambah("jauhnya", kotak("q2", 20, 84, 260, 36, "#FBCFE8", W.biru, { rx: 8 }), teks("q2t", 150, 107, "Berapa jauh?  →  jarak (Manhattan Distance)", 8.6)), tambah("banyak", kotak("q3", 20, 128, 260, 36, "#BBF7D0", W.biru, { rx: 8 }), teks("q3t", 150, 151, "Berapa cara?  →  jalur dan penjumlahan", 8.6)), tambah("Buku", emo("bk", 150, 192, "📘", 18))),
  ],
};
