import type { AdeganStory, Obj } from "./logika-story";
import { E, W, batang, emo, judul, kartu, kotak, kubus, lantai, lempeng, panah, tabel3, teks, tokoh } from "./k3b1A-gambar";
import { bersih, k, sorotkan, tambah } from "./k3b1A-bantu";

/*
 * Cerita orisinal IGIL "Toples Permen Pak Joko" (Kelas 3 Bab 1 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1a.md. Bagian ini: pembuka (tiga alat tua di laci Pak Joko), Dienes Blocks (Balok Dienes), dan terapannya.
 */

export const NAMA_METODE = ["Dienes Blocks", "Place-Value Chart", "Number Names"] as const;
export const NAMA_METODE_ID = ["Balok Dienes", "Tabel Tiga Tempat", "Nama Bilangan"] as const;

const KUNING_KARTU = "#FEF3C7";

/** Deret kubus satuan `n` buah dengan id `${id}0`..: pojok kiri-atas pertama (x, y), jarak g. */
const deretKubus = (id: string, x: number, y: number, n: number, g = 10, s = 8): Obj[] => Array.from({ length: n }, (_, i) => kubus(`${id}${i}`, x + i * g, y, s));
/** Deret lempeng `n` buah dengan id `${id}0`.. (tiap lempeng membawa sekat `${id}{i}-v1`..): pojok kiri-atas pertama (x, y), jarak g, sisi s. */
const deretLempeng = (id: string, x: number, y: number, n: number, g: number, s: number): Obj[] => Array.from({ length: n }, (_, i) => lempeng(`${id}${i}`, x + i * g, y, s)).flat();
const deretBatang = (id: string, x: number, y: number, n: number, g: number, h: number): Obj[] => Array.from({ length: n }, (_, i) => batang(`${id}${i}`, x + i * g, y, 7, h)).flat();

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di laci meja Pak Joko, Bima menemukan tiga alat tua untuk mendata bilangan.";
const SUARA_O2 = "Pak Joko berkata, alat itu dulu dipakai orang untuk membaca bilangan besar dengan cepat.";
const SUARA_O3 = "Tiga cara itu: Dienes Blocks, Place-Value Chart, dan Number Names.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Balok Dienes, Tabel Tiga Tempat, dan Nama Bilangan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga alat tua di laci Pak Joko",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Isi Laci Meja"), ...lantai("lt", 150), kotak("lc", 100, 100, 130, 40, "#C99A63", W.coklat, { rx: 3, z: 0 }), kotak("gg", 154, 108, 22, 6, W.krem, W.coklat, { rx: 2, z: 1 })),
      tambah("Bima", ...tokoh("bm", 44, 184, "Bima")),
      tambah("tiga", teks("n3", 165, 46, "3 alat", 10, W.ungu)),
      tambah("alat", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 120 + i * 30, 58 + (i % 2) * 10, 34, 34, KUNING_KARTU, ["alat"], 7))),
    ),
    k(
      SUARA_O2,
      tambah("Pak", ...tokoh("pj", 266, 184, "Pak Joko")),
      sorotkan("alat", "c0-k", "c1-k", "c2-k"),
      tambah("bilangan", teks("bb", 165, 32, "bilangan besar", 9, W.ungu)),
      tambah("cepat.", emo("cp", 232, 70, "\u{23E9}", 20), emo("ok", 100, 70, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Mendata Bilangan"), teks("n3", 252, 42, "3 cara", 10, W.ungu)),
      tambah("Dienes", teks("m0", 140, 72, "1. Dienes Blocks", 10.5, W.biru), kubus("mk", 24, 66, 8), ...batang("mb", 38, 56, 7, 22), ...lempeng("ml", 50, 56, 24)),
      tambah("Place-Value", teks("m1", 140, 124, "2. Place-Value Chart", 10.5, W.biru), ...tabel3("mt", 22, 106, 54, 8, 14)),
      tambah("Number", teks("m2", 140, 176, "3. Number Names", 10.5, W.biru), teks("mw", 50, 176, "tiga ratus", 8.4, W.hijauTua)),
    ),
    k(
      SUARA_O4,
      tambah("Balok", teks("g0", 256, 72, "Balok Dienes", 9, W.ungu)),
      tambah("Tabel", teks("g1", 256, 124, "Tabel Tiga Tempat", 9, W.ungu)),
      tambah("Nama", teks("g2", 256, 176, "Nama Bilangan", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ Dienes Blocks: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Dienes Blocks, atau Balok Dienes.";
const SUARA_C2 = "Satu kubus kecil adalah satu satuan, satu batang adalah sepuluh, satu lempeng adalah seratus.";
const SUARA_C3 = "Bilangan dilihat sebagai benda yang bisa dihitung dan ditukar sepuluh jadi satu.";
const SUARA_C4 = "Tiga lempeng, dua batang, dan lima kubus berarti tiga ratus dua puluh lima.";

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Dienes Blocks: Balok Dienes",
  sumber: "Metode global: Dienes Blocks (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Dienes Blocks")),
      tambah("Dienes", ...lempeng("lp", 60, 58, 56), ...batang("bt", 148, 48, 10, 66), kubus("kb", 196, 108, 12)),
      tambah("Balok", teks("nm", 150, 160, "Balok Dienes", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Kubus, Batang, Lempeng")),
      tambah("kubus", kubus("kb", 36, 96, 10), teks("a1", 41, 140, "1", 14, W.sat)),
      tambah("satuan,", teks("s1", 41, 156, "satuan", 8.4, W.sat)),
      tambah("batang", ...batang("bt", 120, 64, 10, 66), teks("a10", 125, 148, "10", 14, W.pls)),
      tambah("lempeng", ...lempeng("lp", 200, 50, 70), teks("a100", 235, 148, "100", 14, W.rts)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Sepuluh Jadi Satu")),
      tambah("dihitung", ...deretKubus("dk", 30, 100, 10, 12, 10), teks("n10", 90, 84, "10 kubus", 9, W.ungu)),
      tambah("ditukar", panah("pa", 90, 124, 0, 20, W.merah, 3)),
      tambah("sepuluh", ...batang("bt", 80, 150, 20, 10, W.pls), teks("n1", 150, 160, "1 batang", 10, W.ungu)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Rakit Bilangan")),
      tambah("Tiga", ...deretLempeng("lm", 24, 50, 3, 34, 30), teks("a3", 58, 108, "3", 16, W.rts)),
      tambah("dua", ...deretBatang("bj", 146, 46, 2, 14, 46), teks("a2", 153, 108, "2", 16, W.pls)),
      tambah("lima", ...deretKubus("kb", 204, 82, 5, 14, 10), teks("a5", 232, 108, "5", 16, W.sat)),
      tambah("tiga@2", teks("n325", 150, 160, "325", 22, W.merah)),
    ),
  ],
};

/* ------------------------------ Dienes Blocks: terapan ------------------------------ */
const SUARA_T1 = "Raka merakit empat lempeng, satu batang, dan tujuh kubus.";
const SUARA_T2 = "Ia menghitung per jenis, lalu menulis bilangannya, yaitu empat ratus tujuh belas.";
const SUARA_T3 = "Cocok untuk bilangan kecil yang butuh dilihat dan disentuh.";
const SUARA_T4 = "Kurang cocok untuk bilangan sangat besar, karena balok yang dibutuhkan terlalu banyak.";

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Dienes Blocks: rakitan Raka",
  sumber: "Metode global: Dienes Blocks (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Rakitan Raka"), ...lantai("lt", 150), ...tokoh("rk", 36, 184, "Raka")),
      tambah("empat", ...deretLempeng("lm", 70, 58, 4, 30, 26), teks("a4", 100, 108, "4", 14, W.rts)),
      tambah("satu", ...batang("bt", 202, 52, 8, 46, W.pls), teks("a1", 206, 108, "1", 14, W.pls)),
      tambah("tujuh", ...Array.from({ length: 7 }, (_, i) => kubus(`kb${i}`, 226 + (i % 4) * 11, 80 + Math.floor(i / 4) * 11, 8)), teks("a7", 246, 108, "7", 14, W.sat)),
    ),
    k(
      SUARA_T2,
      tambah("menghitung", teks("l4", 100, 130, "4 lempeng", 8.4, W.hijauTua), teks("l1", 206, 130, "1 batang", 8.4, W.pls)),
      tambah("jenis,", teks("l7", 250, 130, "7 kubus", 8.4, W.sat)),
      tambah("menulis", teks("n417", 150, 160, "417", 22, W.merah)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("kecil", ...lempeng("lm", 70, 70, 28), ...batang("bt", 120, 64, 7, 44, W.pls), ...deretKubus("kb", 150, 100, 3, 12, 10)),
      tambah("dilihat", emo("mt", 90, 150, E.mata, 20)),
      tambah("disentuh.", emo("tg", 150, 150, "\u{270B}", 20)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("balok", ...Array.from({ length: 12 }, (_, i) => lempeng(`lb${i}`, 36 + (i % 6) * 36, 50 + Math.floor(i / 6) * 40, 30)).flat()),
      tambah("banyak.", emo("pz", 150, 160, E.pusing, 26), teks("sa", 150, 190, "terlalu banyak", 10, W.merah)),
    ),
  ],
};
