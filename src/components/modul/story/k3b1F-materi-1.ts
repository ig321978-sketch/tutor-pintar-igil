import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, garis, judul, kotak, kotakIsi, lantai, meja, panah, papan, teks, tokoh } from "./k3b1F-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k3b1F-bantu";

/*
 * Cerita orisinal IGIL "Telur Bu Mirna" (Kelas 3 Bab 1 Sub-Bab F, perkalian sampai seratus), Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1f.md. Bagian ini: kotak telur, penjumlahan berulang, dan menulis perkalian.
 */

/* ------------------------------ 1. Kotak telur ------------------------------ */
const SUARA_K1 = "Bu Mirna, penjual telur, mengantar kotak telur ke Toko Pak Joko.";
const SUARA_K2 = "Satu kotak berisi lima telur. Ada empat kotak tersusun di meja.";
const SUARA_K3 = "Pak Joko bertanya, berapa telur semuanya? Raka, Salsa, dan Bima mencari cara cepat.";

/** Empat kotak telur di atas meja: dua baris dua kotak, tiap kotak lima telur. Id `kt0`..`kt3`. */
const POSISI_KT: [number, number][] = [
  [85, 94],
  [154, 94],
  [85, 70],
  [154, 70],
];
const kt = (i: number): Obj[] => kotakIsi(`kt${i}`, POSISI_KT[i][0], POSISI_KT[i][1], 5, 5, 11);

export const ADEGAN_KOTAK_TELUR: AdeganStory = {
  id: "kotak-telur",
  judul: "Kotak telur di meja depan",
  sumber: "Materi: kotak telur di meja",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Telur untuk Toko"), ...lantai("lt", 150), ...papan("pn", 90, 26, 120, 20, "TOKO PAK JOKO")),
      tambah("Bu", ...tokoh("bu", 28, 184, "Bu Mirna")),
      tambah("kotak", ...meja("mj", 60, 118, 180), ...kt(0)),
      tambah("Toko", ...tokoh("pj", 272, 184, "Pak Joko")),
    ),
    k(
      SUARA_K2,
      tambah("Satu", teks("n1", 150, 62, "1 kotak", 10, W.ungu)),
      tambah("lima", teks("n5", 115, 138, "5 telur", 9, W.merah)),
      tambah("empat", ...kt(1), ...kt(2), ...kt(3)),
      ubah("meja.", { id: "n1", isi: "4 kotak" }),
    ),
    k(
      SUARA_K3,
      tambah("bertanya,", emo("tq", 272, 128, E.tanya, 20)),
      tambah("Raka,", ...tokoh("rk", 100, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 160, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 220, 184, "Bima")),
      tambah("cara", emo("lm", 160, 142, E.lampu, 20)),
    ),
  ],
};

/* ------------------------------ 2. Tambah berulang ------------------------------ */
const SUARA_T1 = "Empat kotak, tiap kotak lima telur. Tambahkan berulang: lima, lima, lima, lima.";
const SUARA_T2 = "Lima ditambah lima sepuluh, ditambah lima lima belas, ditambah lima dua puluh.";
const SUARA_T3 = "Jadi semuanya dua puluh telur.";

const X_KB = [26, 90, 154, 218] as const;
const KB = [0, 1, 2, 3].flatMap((i) => kotakIsi(`kb${i}`, X_KB[i], 80, 5, 5, 10));
const ID_KB = [0, 1, 2, 3].map((i) => `kb${i}`);

export const ADEGAN_TAMBAH_BERULANG: AdeganStory = {
  id: "tambah-berulang",
  judul: "Tambah berulang isi kotak",
  sumber: "Materi: penjumlahan berulang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tambah Berulang"), ...KB),
      tambah("kotak,", teks("n4", 150, 52, "4 kotak", 10, W.ungu)),
      sorotkan("lima", "kb0"),
      tambah("lima@2", teks("a0", 54, 72, "5", 11, W.merah)),
      tambah("lima@3", teks("a1", 118, 72, "5", 11, W.merah)),
      tambah("lima@4", teks("a2", 182, 72, "5", 11, W.merah)),
      tambah("lima@5", teks("a3", 246, 72, "5", 11, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("ditambah@1", teks("p1", 86, 72, "+5", 9, W.hijau)),
      tambah("ditambah@2", teks("p2", 150, 72, "+5", 9, W.hijau)),
      tambah("ditambah@3", teks("p3", 214, 72, "+5", 9, W.hijau)),
      tambah("sepuluh,", teks("s1", 118, 118, "10", 13, W.merah)),
      tambah("belas,", teks("s2", 182, 118, "15", 13, W.merah)),
      tambah("puluh.", teks("s3", 246, 118, "20", 13, W.merah)),
    ),
    k(
      SUARA_T3,
      sorotkan("semuanya", ...ID_KB),
      tambah("dua", teks("tot", 150, 158, "20", 24, W.merah)),
      tambah("telur.", teks("tt", 150, 178, "telur", 11, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Menulis perkalian ------------------------------ */
const SUARA_P1 = "Penjumlahan berulang dengan isi yang sama ditulis sebagai perkalian: empat kali lima sama dengan dua puluh.";
const SUARA_P2 = "Empat artinya banyak kotak, lima artinya isi tiap kotak.";
const SUARA_P3 = "Dibaca empat kali lima sama dengan dua puluh, sama dengan penjumlahan berulang.";

export const ADEGAN_TULIS_KALI: AdeganStory = {
  id: "tulis-kali",
  judul: "Menulis perkalian",
  sumber: "Materi: menulis dan membaca perkalian",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Menulis Perkalian"), teks("pj", 150, 62, "5 + 5 + 5 + 5", 17, W.biru)),
      tambah("isi", teks("ik", 150, 82, "isi sama", 9, W.ungu)),
      tambah("perkalian:", panah("pk", 150, 90, 0, 18, W.merah, 2.4), teks("kl", 150, 138, "4 × 5", 24, W.merah)),
      tambah("dua", teks("hs", 150, 172, "= 20", 22, W.hijau)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Banyak Kotak dan Isi"), teks("m4", 122, 72, "4", 26, W.merah), teks("mx", 150, 72, "×", 22, W.biru), teks("m5", 178, 72, "5", 26, W.hijau)),
      tambah("banyak", panah("a4", 118, 84, -8, 16, W.merah, 2), teks("l4", 100, 118, "banyak kotak", 9, W.merah)),
      tambah("isi", panah("a5", 182, 84, 8, 16, W.hijau, 2), teks("l5", 205, 118, "isi tiap kotak", 9, W.hijau)),
      tambah("kotak.", ...[0, 1, 2, 3].map((i) => garis(`bk${i}`, 66 + i * 12, 146, 0, 14, W.merah, 6)), ...[0, 1, 2, 3, 4].map((i) => garis(`bi${i}`, 190 + i * 7, 146, 0, 14, W.hijau, 3.4))),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Dibaca dan Disamakan"), kotak("fr", 52, 36, 196, 38, W.krem, W.coklat, { rx: 8, tebal: 1.6, z: -1 }), teks("rm", 150, 62, "4 × 5 = 20", 24, W.merah)),
      tambah("empat", emo("mj", 52, 62, "\u{1F5E3}", 22)),
      tambah("sama@2", teks("sn", 150, 104, "sama dengan", 10, W.ungu)),
      tambah("penjumlahan", teks("rb", 150, 144, "5 + 5 + 5 + 5 = 20", 16, W.biru)),
    ),
  ],
};
