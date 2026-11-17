import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WARNA_IKAN, akuarium, deretAkuarium, emo, judul, kartu, kawanan, kotak, nomorAkuarium, orang, papanLabel, teks, wadah, sekat } from "./k1b5a-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b5a-bantu";

/* Akhir "Ikan Baru Datang": tiga akuarium berlabel, dua puluh akuarium kecil bernomor untuk pakan besok (jembatan ke Sub-Bab B), lalu penutup. Tanpa latihan. */

/* ------------------------------ 7. Akuarium berlabel ------------------------------ */
const SUARA_H1 = "Tiga akuarium kini berlabel. Guppy empat belas, koki sebelas, dan neon dua puluh.";
const SUARA_H2 = "Abang lalu menjajarkan dua puluh akuarium kecil bernomor di teras, dari satu sampai dua puluh.";
const SUARA_H3 = "Kata Abang, besok pagi semua ikan harus diberi pakan. Akuarium mana dulu, ya?";
const AQ_X = [14, 109, 204];
const diAkuarium = (x: number): { x: number; y: number }[] => [
  { x: x + 18, y: 52 },
  { x: x + 44, y: 60 },
  { x: x + 22, y: 76 },
  { x: x + 50, y: 84 },
];

export const ADEGAN_HASIL: AdeganStory = {
  id: "akuarium-berlabel",
  judul: "Akuarium berlabel",
  sumber: "Materi: hasil dan masalah berikutnya",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("3 akuarium berlabel")),
      tambah("akuarium", ...AQ_X.flatMap((x, i) => akuarium(`a${i}`, x, 34, 82, 70))),
      tambah("Guppy", ...kawanan("ga", diAkuarium(AQ_X[0]), WARNA_IKAN.guppy, 0.7), ...kartu("l0", 14, 112, 82, 34, W.krem, ["14", "empat belas"], 9.4)),
      tambah("koki", ...kawanan("ka", diAkuarium(AQ_X[1]), WARNA_IKAN.koki, 0.7), ...kartu("l1", 109, 112, 82, 34, W.krem, ["11", "sebelas"], 9.4)),
      tambah("neon", ...kawanan("na", diAkuarium(AQ_X[2]), WARNA_IKAN.neon, 0.7), ...kartu("l2", 204, 112, 82, 34, W.krem, ["20", "dua puluh"], 9.4)),
      tambah("puluh.", ...orang("mm", 150, 172, E.mamah, "Mamah"), emo("jp", 182, 168, E.jempol, 16)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("20 akuarium kecil"), kotak("ter", 6, 34, 288, 92, "#E7E5E4", "#A8A29E", { rx: 6, tebal: 2, z: -4 })),
      tambah("Abang", ...orang("ab", 40, 166, E.abang, "Abang")),
      tambah("menjajarkan", ...deretAkuarium("ra", 46), ...deretAkuarium("rb", 92)),
      tambah("bernomor", ...nomorAkuarium("ra", 46, 1), ...nomorAkuarium("rb", 92, 11)),
      sorotkan("satu", "ra0"),
      sorotkan("puluh.@2", "rb9"),
    ),
    k(
      SUARA_H3,
      tambah("besok", ...kartu("bs", 80, 140, 210, 22, W.pink, ["besok pagi: beri pakan"], 9.4)),
      tambah("pakan.", emo("pk", 270, 180, E.pakan, 20)),
      tambah("dulu,", teks("tq", 180, 182, "mulai nomor berapa?", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Q1 = "Ingat, ya. Satu benda, satu hitungan, tanpa terlewat dan tanpa diulang.";
const SUARA_Q2 = "Isi sepuluh dulu sampai penuh, lalu hitung sisanya. Belasan dibaca nama satuannya, lalu kata belas.";
const SUARA_Q3 = "Dua puluh adalah dua sepuluh penuh. Terima kasih, Igil, Kaka, Abang, dan Mamah!";
const baris = (i: number, warna: string): Obj => kotak(`p${i}`, 14, 32 + i * 50, 272, 42, warna, W.biru, { rx: 8, tebal: 1.6, z: -2 });
const tulis = (id: string, y: number, isi: string, u = 9.4, warna: string = W.biru): Obj => teks(id, 66, y, isi, u, warna, { anchor: "start" });
const penuhKecil = (id: string, x: number, y: number, s: number): Obj[] =>
  kawanan(id, Array.from({ length: 10 }, (_, i) => sekat(x, y, i, s)), WARNA_IKAN.neon, 0.4);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat cara menghitung",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Ingat, ya!")),
      tambah("Satu", baris(0, W.langit), ...kawanan("p0i", [{ x: 38, y: 53 }], WARNA_IKAN.guppy, 0.9), tulis("p0a", 50, "1 benda, 1 hitungan")),
      tambah("diulang.", tulis("p0b", 66, "tanpa terlewat, tanpa diulang", 8.6, W.ungu)),
    ),
    k(
      SUARA_Q2,
      tambah("sepuluh", baris(1, W.hijauMuda), ...wadah("p1w", 25, 96, 6), tulis("p1a", 100, "10 dulu sampai penuh")),
      tambah("sisanya.", tulis("p1b", 116, "lalu hitung sisanya", 8.6, W.ungu)),
      tambah("Belasan", baris(2, W.pink), ...papanLabel("p2l", 24, 138, 34, 26), teks("p2i", 41, 159, "14", 11, W.merah), tulis("p2a", 150, "14: empat belas")),
      tambah("belas@2", tulis("p2b", 166, "nama satuan, lalu belas", 8.6, W.ungu)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Terima kasih!")),
      tambah("Dua", ...wadah("q1", 60, 40, 14), ...wadah("q2", 170, 40, 14), ...penuhKecil("qa", 60, 40, 14), ...penuhKecil("qb", 170, 40, 14)),
      tambah("dua@2", teks("t2", 150, 108, "2 wadah penuh", 9.4, W.ungu)),
      tambah("penuh.", teks("q1n", 95, 90, "10", 10, W.merah), teks("q2n", 205, 90, "10", 10, W.merah), teks("tt", 150, 126, "20", 14, W.merah)),
      tambah("Igil,", ...orang("ig", 45, 158, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 158, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 158, E.abang, "Abang")),
      tambah("Mamah!", ...orang("mm", 255, 158, E.mamah, "Mamah")),
    ),
  ],
};
