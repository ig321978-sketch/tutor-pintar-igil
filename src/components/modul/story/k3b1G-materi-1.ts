import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bingkisan, emo, idBingkisan, idMeja, idTumpukan, judul, kartu, keranjang, meja, teks, tokoLatar, tokoh, tumpukan, warnaKado } from "./k3b1G-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k3b1G-bantu";

/*
 * Cerita orisinal IGIL "Pesta Hari Jadi Toko" (Kelas 3 Bab 1 Sub-Bab G, pembagian sampai seratus), akhir cerita Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1g.md. Bagian ini: hari jadi toko (masalah), bagi rata satu-satu, dan menulis pembagian.
 */

/** Posisi keranjang ke-i pada meja bingkisan (bagi rata): pojok kiri-atas. */
export const KR_X = (i: number): number => 34 + i * 64;
export const KR_Y = 124;
/** Bingkisan ke-j di dalam keranjang ke-i; bingkisan nomor n = j * 4 + i dibagikan bergiliran. */
export const kadoDi = (i: number, j: number): Obj[] => bingkisan(`f${i}${j}`, KR_X(i) + 5 + (j % 3) * 10.5, KR_Y + 2 + Math.floor(j / 3) * 10.5, 8.5, warnaKado(j * 4 + i), { z: 2 });
export const idKadoDi = (i: number, j: number): string[] => idBingkisan(`f${i}${j}`);
/** Semua bingkisan di empat keranjang: `banyak` bingkisan tiap keranjang. */
export const semuaKado = (banyak: number): Obj[] => [0, 1, 2, 3].flatMap((i) => Array.from({ length: banyak }, (_, j) => kadoDi(i, j)).flat());
export const idSemuaKado = (banyak: number): string[] => [0, 1, 2, 3].flatMap((i) => Array.from({ length: banyak }, (_, j) => idKadoDi(i, j)).flat());
export const empatKeranjang = (): Obj[] => [0, 1, 2, 3].flatMap((i) => keranjang(`kr${i}`, KR_X(i), KR_Y, 40, 26));

/* ------------------------------ 1. Hari jadi ------------------------------ */
const SUARA_A1 = "Hari ini Toko Pak Joko berulang tahun, dan semua pelanggan mendapat bingkisan.";
const SUARA_A2 = "Pak Joko menyiapkan dua puluh empat bingkisan, dan Nenek Ijah, pelanggan pertama, datang membawa keranjang.";
const SUARA_A3 = "Bingkisan harus dibagi sama banyak ke empat keranjang. Berapa isi tiap keranjang?";

export const ADEGAN_HARI_JADI: AdeganStory = {
  id: "hari-jadi",
  judul: "Hari jadi Toko Pak Joko",
  sumber: "Materi: hari jadi toko dan bingkisan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      bersih(0),
      tambah(0, judul("Hari Jadi Toko"), ...tokoLatar("tk")),
      tambah("Toko", ...kartu("pn", 90, 36, 120, 20, W.krem, ["TOKO PAK JOKO"], 10)),
      tambah("berulang", emo("b1", 30, 92, E.balon, 28), emo("b2", 270, 92, E.balon, 28)),
      tambah("pelanggan", emo("p1", 70, 150, E.senyum, 20), emo("p2", 120, 150, E.senyum, 20), emo("p3", 180, 150, E.senyum, 20), emo("p4", 230, 150, E.senyum, 20)),
      tambah("bingkisan.", emo("h1", 96, 122, E.hadiah, 26), emo("h2", 204, 122, E.hadiah, 26), emo("kl", 150, 104, E.sorak, 24)),
    ),
    k(
      SUARA_A2,
      hapus(0, "p1", "p2", "p3", "p4", "h1", "h2", "kl"),
      tambah("Joko", ...tokoh("pj", 36, 172, "Pak Joko", 28)),
      tambah("menyiapkan", ...meja("mj", 80, 104, 140)),
      tambah("dua", teks("n24", 58, 96, "24", 20, W.merah)),
      tambah("bingkisan,", ...tumpukan("bk", 98, 66, 8, 24, 11, 13)),
      tambah("Nenek", ...tokoh("nn", 262, 172, "Nenek Ijah", 28)),
      tambah("keranjang.", emo("kn", 236, 152, E.keranjang, 24)),
    ),
    k(
      SUARA_A3,
      hapus(0, "kn"),
      tambah("empat", ...[0, 1, 2, 3].flatMap((i) => keranjang(`kr${i}`, 70 + i * 45, 134, 34, 20))),
      tambah("keranjang.", teks("n4", 150, 128, "4 keranjang", 9, W.coklat)),
      tambah("Berapa", emo("tz", 262, 120, E.tanya, 24)),
      tambah("isi", ...tokoh("rk", 100, 182, "Raka", 22, "Raka", 6.5), ...tokoh("sl", 150, 182, "Salsa", 22, "Salsa", 6.5), ...tokoh("bm", 200, 182, "Bima", 22, "Bima", 6.5)),
    ),
  ],
};

/* ------------------------------ 2. Bagi rata ------------------------------ */
const SUARA_B1 = "Salsa membagi satu-satu: satu untuk keranjang pertama, kedua, ketiga, keempat, lalu mulai lagi.";
const SUARA_B2 = "Setelah semua habis, tiap keranjang berisi enam bingkisan.";
const SUARA_B3 = "Itulah pembagian: dua puluh empat dibagi empat sama dengan enam.";

export const ADEGAN_BAGI_RATA: AdeganStory = {
  id: "bagi-rata",
  judul: "Bingkisan dibagi satu-satu",
  sumber: "Materi: membagi sama banyak",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Bagi Satu-Satu"), ...tokoLatar("tk"), ...meja("mj", 96, 96, 108), ...tumpukan("bk", 114, 48, 6, 24, 10, 12), ...empatKeranjang()),
      tambah("Salsa", ...tokoh("sl", 36, 182, "Salsa", 24, "Salsa", 7)),
      tambah("satu-satu", teks("s1", 150, 114, "1 untuk tiap keranjang", 8.5, W.coklat)),
      hapus("pertama", ...idBingkisan("bk0")),
      tambah("pertama", ...kadoDi(0, 0)),
      hapus("kedua", ...idBingkisan("bk1")),
      tambah("kedua", ...kadoDi(1, 0)),
      hapus("ketiga", ...idBingkisan("bk2")),
      tambah("ketiga", ...kadoDi(2, 0)),
      hapus("keempat", ...idBingkisan("bk3")),
      tambah("keempat", ...kadoDi(3, 0)),
      hapus("lagi.", ...idTumpukan("bk", 4, 4)),
      tambah("lagi.", ...kadoDi(0, 1), ...kadoDi(1, 1), ...kadoDi(2, 1), ...kadoDi(3, 1)),
    ),
    k(
      SUARA_B2,
      hapus(0, "s1"),
      hapus("habis,", ...idTumpukan("bk", 16, 8), ...idSemuaKado(2)),
      tambah("habis,", ...semuaKado(6)),
      tambah("enam", ...[0, 1, 2, 3].map((i) => teks(`h${i}`, KR_X(i) + 20, 118, "6", 12, W.merah))),
      tambah("bingkisan.", emo("ok", 150, 110, E.benar, 22)),
    ),
    k(
      SUARA_B3,
      hapus(0, ...idMeja("mj"), "ok"),
      tambah("dua", teks("kal", 150, 92, "24", 22, W.biru)),
      ubah("dibagi", { id: "kal", isi: "24 :" }),
      ubah("empat@2", { id: "kal", isi: "24 : 4" }),
      ubah("sama", { id: "kal", isi: "24 : 4 =" }),
      ubah("enam.", { id: "kal", isi: "24 : 4 = 6" }),
      tambah("enam.", emo("kl", 262, 96, E.kilau, 22)),
    ),
  ],
};

/* ------------------------------ 3. Tulis bagi ------------------------------ */
const SUARA_C1 = "Pembagian ditulis dua puluh empat dibagi empat sama dengan enam. Dua puluh empat adalah bilangan yang dibagi.";
const SUARA_C2 = "Empat adalah pembagi, yaitu banyak keranjang. Enam adalah hasil bagi.";
const SUARA_C3 = "Dibaca dua puluh empat dibagi empat sama dengan enam.";

export const ADEGAN_TULIS_BAGI: AdeganStory = {
  id: "tulis-bagi",
  judul: "Menulis dan membaca pembagian",
  sumber: "Materi: menulis dan membaca pembagian",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Menulis Pembagian"), ...tokoLatar("tk")),
      tambah(2, teks("a", 64, 92, "24", 34, W.biru)),
      tambah(5, teks("op", 112, 92, ":", 34, W.biru)),
      tambah(6, teks("g", 156, 92, "4", 34, W.biru)),
      tambah(7, teks("sd", 204, 92, "=", 34, W.biru)),
      tambah(9, teks("h", 248, 92, "6", 34, W.biru)),
      tambah("dibagi@2", ...kartu("la", 28, 108, 72, 20, W.biruMuda, ["yang dibagi"], 8.5)),
      sorotkan("dibagi@2", "a"),
    ),
    k(
      SUARA_C2,
      redamkan(0, "a"),
      sorotkan(0, "g"),
      tambah("pembagi,", ...kartu("lb", 118, 108, 76, 20, W.hijauMuda, ["pembagi"], 8.5)),
      tambah("keranjang.", emo("kb", 156, 152, E.keranjang, 26)),
      redamkan("Enam", "g"),
      sorotkan("Enam", "h"),
      tambah("hasil", ...kartu("lc", 206, 108, 80, 20, W.merahMuda, ["hasil bagi"], 8.5)),
    ),
    k(
      SUARA_C3,
      redamkan(0, "h"),
      hapus(0, "kb"),
      tambah("Dibaca", ...tokoh("pj", 262, 182, "Pak Joko", 24, "Pak Joko", 7)),
      tambah("dua", teks("rd", 150, 162, "24", 12, W.ungu)),
      ubah("dibagi", { id: "rd", isi: "24 dibagi" }),
      ubah("empat@2", { id: "rd", isi: "24 dibagi 4" }),
      ubah("enam.", { id: "rd", isi: "24 dibagi 4 sama dengan 6" }),
    ),
  ],
};
