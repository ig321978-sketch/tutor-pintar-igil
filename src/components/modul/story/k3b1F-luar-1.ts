import type { AdeganStory, Obj } from "./logika-story";
import { E, W, benda, busur, emo, garisBilangan, judul, kartu, kotakIsi, lantai, panah, rakKayu, teks, tokoh } from "./k3b1F-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1F-bantu";

/*
 * Cerita orisinal IGIL "Telur Bu Mirna" (Kelas 3 Bab 1 Sub-Bab F), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1f.md. Bagian ini: pembuka (tiga lembar catatan penjual telur), Equal Groups (Isi Sama), terapannya, dan konsep Array.
 */

export const NAMA_METODE = ["Equal Groups", "Array", "Skip Counting"] as const;
export const NAMA_METODE_ID = ["Isi Sama", "Susunan Baris Kolom", "Lompat Hitung"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di bawah rak telur, Raka menemukan tiga lembar catatan lama milik penjual telur, tulisannya masih rapi.";
const SUARA_O2 = "Bu Mirna berkata, itu tiga cara menghitung banyak barang yang isinya sama, supaya cepat dan tidak keliru.";
const SUARA_O3 = "Tiga cara itu: Equal Groups, Array, dan Skip Counting.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Isi Sama, Susunan Baris Kolom, dan Lompat Hitung.";

/** Tiga baris cara pada ketukan ketiga: gambar mini di kiri, nama Inggris di tengah, nama Indonesia di kanan. */
const BARIS_CARA = [64, 106, 148] as const;
const miniIsi: Obj[] = [0, 1, 2].flatMap((i) => kotakIsi(`mi${i}`, 14 + i * 22, BARIS_CARA[0] - 10, 2, 2, 7, "telur"));
const miniSusunan: Obj[] = Array.from({ length: 6 }, (_, i) => benda(`ms${i}`, 22 + (i % 3) * 14, BARIS_CARA[1] - 7 + Math.floor(i / 3) * 14, "kaleng", 4.4)).flat();
const miniLompat: Obj[] = [garisBilangan("ml", 14, 74, BARIS_CARA[2]), busur("mb1", 14, 34, BARIS_CARA[2] - 2, 12), busur("mb2", 34, 54, BARIS_CARA[2] - 2, 12), busur("mb3", 54, 74, BARIS_CARA[2] - 2, 12)];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga lembar catatan penjual telur",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Lembar Catatan Lama"), ...lantai("lt", 150)),
      tambah("rak", ...rakKayu("rk", 20, 50, 110, 90, 2), ...kotakIsi("rt1", 30, 74, 5, 5, 10), ...kotakIsi("rt2", 30, 118, 5, 5, 10)),
      tambah("Raka", ...tokoh("rka", 200, 184, "Raka")),
      tambah("tiga", teks("n3", 200, 62, "3 lembar", 10, W.ungu)),
      tambah("lembar", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 170 + i * 30, 76 + (i % 2) * 6, 26, 38, KUNING_KARTU, ["tulis"], 5))),
      tambah("rapi.", emo("ok", 150, 134, E.benar, 20)),
    ),
    k(
      SUARA_O2,
      tambah("Bu", ...tokoh("bu", 266, 184, "Bu Mirna")),
      ubah("tiga", { id: "n3", isi: "3 cara" }),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("barang", emo("e1", 150, 150, E.telur, 16), emo("e2", 166, 150, E.telur, 16), emo("e3", 182, 150, E.telur, 16)),
      tambah("keliru.", emo("ok2", 236, 130, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Menghitung"), teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Equal", teks("m0", 80, BARIS_CARA[0] + 4, "1. Equal Groups", 11, W.biru, { anchor: "start" }), ...miniIsi),
      tambah("Array,", teks("m1", 80, BARIS_CARA[1] + 4, "2. Array", 11, W.biru, { anchor: "start" }), ...miniSusunan),
      tambah("Skip", teks("m2", 80, BARIS_CARA[2] + 4, "3. Skip Counting", 11, W.biru, { anchor: "start" }), ...miniLompat),
    ),
    k(
      SUARA_O4,
      tambah("Isi", teks("g0", 240, BARIS_CARA[0] + 4, "Isi Sama", 9, W.ungu)),
      tambah("Susunan", teks("g1", 240, BARIS_CARA[1] + 4, "Susunan Baris Kolom", 8.4, W.ungu)),
      tambah("Lompat", teks("g2", 240, BARIS_CARA[2] + 4, "Lompat Hitung", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ Equal Groups: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Equal Groups, atau Isi Sama.";
const SUARA_C2 = "Barang dimasukkan ke dalam beberapa kotak yang isinya sama banyak.";
const SUARA_C3 = "Kita menjumlah isi kotak berulang sebanyak kotaknya.";
const SUARA_C4 = "Itulah arti perkalian, yaitu penjumlahan berulang dari isi yang sama.";

const X_EK = [51, 123, 195] as const;
const EK = [0, 1, 2].flatMap((i) => kotakIsi(`ek${i}`, X_EK[i], 80, 4, 4, 12));

export const ADEGAN_LUAR_ISI: AdeganStory = {
  id: "luar-isi",
  judul: "Equal Groups: Isi Sama",
  sumber: "Metode global: Equal Groups (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Equal Groups")),
      tambah("Equal", ...EK),
      tambah("Isi", teks("nm", 150, 150, "Isi Sama", 14, W.ungu)),
    ),
    k(
      SUARA_C2,
      tambah("beberapa", teks("bk", 150, 62, "beberapa kotak", 10, W.ungu)),
      tambah("isinya", teks("ib", 150, 120, "isi tiap kotak:", 9, W.coklat)),
      tambah("sama", teks("eq", 150, 134, "4 = 4 = 4", 14, W.hijau)),
    ),
    k(
      SUARA_C3,
      tambah("menjumlah", teks("jm", 150, 40, "4 + 4 + 4", 14, W.biru)),
      tambah("berulang", panah("pa", 117, 88, 6, 0, W.merah, 2), panah("pb", 189, 88, 6, 0, W.merah, 2)),
      tambah("sebanyak", teks("kl", 150, 168, "3 kali", 11, W.merah)),
    ),
    k(
      SUARA_C4,
      hapus(0, "bk", "ib", "eq", "kl"),
      tambah("Itulah", teks("kt", 150, 176, "3 × 4 = 12", 20, W.merah)),
      sorotkan("yaitu", ...[0, 1, 2].map((i) => `ek${i}`)),
    ),
  ],
};

/* ------------------------------ Equal Groups: terapan ------------------------------ */
const SUARA_T1 = "Salsa melihat lima kotak berisi enam telur. Ia menjumlah enam lima kali.";
const SUARA_T2 = "Enam, dua belas, delapan belas, dua puluh empat, tiga puluh.";
const SUARA_T3 = "Cocok kalau barang sudah dikemas dalam kotak yang isinya sama banyak, seperti telur.";
const SUARA_T4 = "Kurang cocok kalau isi tiap kotak berbeda, karena harus dijumlah satu per satu.";

const X_TK = [44, 88, 132, 176, 220] as const;
const TK = [0, 1, 2, 3, 4].flatMap((i) => kotakIsi(`tk${i}`, X_TK[i], 80, 6, 3, 10));

export const ADEGAN_LUAR_ISI_TERAPAN: AdeganStory = {
  id: "luar-isi-terapan",
  judul: "Equal Groups: lima kotak telur Salsa",
  sumber: "Metode global: Equal Groups (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Lima Kotak Enam Telur"), ...lantai("lt", 150)),
      tambah("Salsa", ...tokoh("sl", 28, 184, "Salsa")),
      tambah("lima", ...TK),
      tambah("enam", teks("n6", 150, 118, "6 telur", 10, W.merah)),
      tambah("menjumlah", teks("jm", 150, 60, "6 + 6 + 6 + 6 + 6", 14, W.biru)),
      tambah("kali.", teks("n5", 150, 140, "5 kali", 11, W.ungu)),
    ),
    k(
      SUARA_T2,
      hapus(0, "n6"),
      tambah("Enam,", teks("c0", 62, 124, "6", 12, W.merah)),
      tambah("belas,", teks("c1", 106, 124, "12", 12, W.merah)),
      tambah("delapan", teks("c2", 150, 124, "18", 12, W.merah)),
      tambah("dua@2", teks("c3", 194, 124, "24", 12, W.merah)),
      tambah("tiga", teks("c4", 238, 124, "30", 12, W.merah)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("barang", ...kartu("cc", 50, 34, 200, 24, W.hijauMuda, ["kotak, isi sama banyak"], 9)),
      tambah("kotak", ...[0, 1, 2].flatMap((i) => kotakIsi(`cr${i}`, 51 + i * 72, 86, 4, 4, 12))),
      tambah("telur.", teks("rp", 150, 150, "rapi dan mudah dihitung", 10, W.hijau)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("berbeda,", ...kotakIsi("kc0", 66, 86, 3, 3, 12), ...kotakIsi("kc1", 120, 86, 5, 5, 12), ...kotakIsi("kc2", 192, 86, 2, 2, 12)),
      tambah("karena", teks("bd", 150, 62, "3 + 5 + 2 = 10", 12, W.merah)),
      tambah("satu", teks("sp", 150, 150, "1 per 1", 11, W.merah), emo("pz", 232, 168, E.pusing, 20)),
    ),
  ],
};

/* ------------------------------ Array: konsep ------------------------------ */
const SUARA_S1 = "Cara kedua, Array, atau Susunan Baris Kolom.";
const SUARA_S2 = "Barang ditata dalam baris dan kolom, tiap baris sama panjang.";
const SUARA_S3 = "Banyak baris dikali banyak kolom sama dengan banyak semua barang.";
const SUARA_S4 = "Susunan ini juga menunjukkan bahwa urutan bilangan perkalian boleh ditukar.";

/** Dua belas kaleng: tiga baris, empat kolom (awal), lalu empat baris, tiga kolom (diputar). Id `ka0`..`ka11`. */
const SJ = 20;
const posTiga = (i: number): [number, number] => [150 + ((i % 4) - 1.5) * SJ, 92 + (Math.floor(i / 4) - 1) * SJ];
const posEmpat = (i: number): [number, number] => [150 + ((i % 3) - 1) * SJ, 82 + (Math.floor(i / 3) - 1.5) * SJ];
const kaTiga = (): Obj[] => Array.from({ length: 12 }, (_, i) => benda(`ka${i}`, posTiga(i)[0], posTiga(i)[1], "kaleng", 6.4)).flat();
const kaEmpat = (): Obj[] => Array.from({ length: 12 }, (_, i) => benda(`ka${i}`, posEmpat(i)[0], posEmpat(i)[1], "kaleng", 6.4)).flat();
const idKa = (dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `ka${dari + i}`);

export const ADEGAN_LUAR_SUSUNAN: AdeganStory = {
  id: "luar-susunan",
  judul: "Array: Susunan Baris Kolom",
  sumber: "Metode global: Array (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 2: Array")),
      tambah("Array,", ...kaTiga()),
      tambah("Susunan", teks("nm", 150, 160, "Susunan Baris Kolom", 12, W.ungu)),
    ),
    k(
      SUARA_S2,
      sorotkan("baris", ...idKa(0, 3)),
      tambah("baris", teks("lb", 54, 72, "baris", 10, W.merah), panah("pb", 72, 70, 20, 0, W.merah, 2)),
      sorotkan("kolom,", "ka0", "ka4", "ka8"),
      tambah("kolom,", teks("lk", 105, 38, "kolom", 10, W.hijau), panah("pk", 105, 42, 0, 14, W.hijau, 2)),
      tambah("sama", teks("sp", 232, 72, "sama panjang", 9, W.ungu)),
    ),
    k(
      SUARA_S3,
      hapus(0, "lb", "pb", "lk", "pk", "sp", "nm"),
      tambah("Banyak", teks("e1", 62, 160, "3 baris", 10, W.merah)),
      tambah("dikali", teks("e2", 104, 160, "×", 14, W.biru)),
      tambah("kolom", teks("e3", 146, 160, "4 kolom", 10, W.hijau)),
      tambah("dengan", teks("e4", 192, 160, "=", 14, W.biru)),
      tambah("semua", teks("e5", 222, 160, "12", 14, W.merah)),
    ),
    k(
      SUARA_S4,
      tambah("bahwa", emo("pt", 252, 92, E.putar, 24)),
      sorotkan("perkalian", ...idKa(0, 11)),
      ubah("ditukar.", ...kaEmpat().map((o) => ({ id: o.id, x: o.x, y: o.y })), { id: "e1", isi: "4 baris" }, { id: "e3", isi: "3 kolom" }),
    ),
  ],
};
