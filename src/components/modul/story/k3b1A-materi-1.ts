import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bungkus, butir, emo, judul, kardus, kartu, kotak, lantai, panah, rak, teks, toples, tokoh, troli } from "./k3b1A-gambar";
import { bersih, k, sorotkan, tambah } from "./k3b1A-bantu";

/*
 * Cerita orisinal IGIL "Toples Permen Pak Joko" (Kelas 3 Bab 1 Sub-Bab A, bilangan tiga angka), awal cerita Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1a.md. Bagian ini: gudang toko, tiga ukuran permen, dan tukar sepuluh jadi satu.
 */

/* ------------------------------ 1. Gudang toko ------------------------------ */
const SUARA_G1 = "Sore itu Toko Pak Joko kedatangan kiriman permen. Raka, Salsa, dan Bima membantu di gudang.";
const SUARA_G2 = "Kak Dewi, kurir berjaket oranye, menurunkan permen yang terbungkus dalam tiga ukuran.";
const SUARA_G3 = "Pak Joko ingin tahu banyak permen di rak, supaya bisa menulis daftar stok.";

export const ADEGAN_GUDANG_TOKO: AdeganStory = {
  id: "gudang-toko",
  judul: "Gudang toko dan kiriman permen",
  sumber: "Materi: gudang toko dan kiriman permen",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Kiriman Permen"), ...lantai("lt", 150), ...toples("tb", 170, 112, 26, 30)),
      tambah("kedatangan", ...kardus("kd1", 216, 118, 44, 24, "PERMEN"), ...kardus("kd2", 222, 94, 36, 24)),
      tambah("Raka,", ...tokoh("rk", 40, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 84, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 128, 184, "Bima")),
    ),
    k(
      SUARA_G2,
      tambah("Dewi,", ...tokoh("dw", 272, 184, "Kak Dewi")),
      tambah("menurunkan", ...troli("tr", 216, 143, 44)),
      tambah("terbungkus", butir("b1", 142, 140, 4), ...bungkus("bk", 150, 128, 18, 14)),
      tambah("tiga", teks("n3", 160, 106, "3 ukuran", 9, W.ungu)),
      sorotkan("ukuran.", "tb"),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Stok di Rak"), ...lantai("lt", 150), ...tokoh("pj", 40, 184, "Pak Joko")),
      tambah("tahu", emo("tq", 40, 118, E.tanya, 22)),
      tambah("rak,", ...rak("rk", 116, 118, 120, 32), ...toples("t1", 128, 88, 26, 30, 6), ...toples("t2", 170, 88, 26, 30, 6), ...toples("t3", 212, 88, 26, 30, 6)),
      tambah("daftar", ...kartu("ds", 100, 30, 100, 26, W.krem, ["DAFTAR STOK"], 8)),
      tambah("stok.", emo("ps", 214, 48, E.pensil, 16)),
    ),
  ],
};

/* ------------------------------ 2. Tiga ukuran ------------------------------ */
const SUARA_U1 = "Satu butir permen kita sebut satu satuan.";
const SUARA_U2 = "Sepuluh butir dimasukkan ke satu bungkus. Itu satu puluhan.";
const SUARA_U3 = "Sepuluh bungkus dituang ke satu toples besar. Itu satu ratusan, isinya seratus butir.";

/** Sepuluh butir mini dalam dua baris lima, id `${id}0`..`${id}9`, pojok kiri-atas (x, y). */
const sepuluhButir = (id: string, x: number, y: number): Obj[] => Array.from({ length: 10 }, (_, i) => butir(`${id}${i}`, x + (i % 5) * 8, y + Math.floor(i / 5) * 9, 3));

export const ADEGAN_TIGA_UKURAN: AdeganStory = {
  id: "tiga-ukuran",
  judul: "Tiga ukuran permen",
  sumber: "Materi: satuan, puluhan, ratusan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Satuan, Puluhan, Ratusan")),
      tambah("butir", butir("b1", 50, 96, 9)),
      tambah("Satu", teks("n1", 50, 66, "1", 16, W.sat)),
      tambah("satuan.", kotak("ls-k", 22, 140, 56, 20, "#FEE2E2", W.sat, { rx: 6 }), teks("ls", 50, 154, "satuan", 10, W.sat)),
    ),
    k(
      SUARA_U2,
      tambah("Sepuluh", ...sepuluhButir("sb", 104, 80), teks("n10", 124, 66, "10 butir", 9, W.ungu)),
      tambah("bungkus.", panah("pa", 150, 100, 18, 0, W.biru, 2), ...bungkus("pk", 176, 86, 34, 26)),
      tambah("satu@2", teks("n1b", 192, 66, "1 bungkus", 9, W.ungu)),
      tambah("puluhan.", kotak("lp-k", 138, 140, 62, 20, "#DBEAFE", W.pls, { rx: 6 }), teks("lp", 169, 154, "puluhan", 10, W.pls)),
    ),
    k(
      SUARA_U3,
      tambah("Sepuluh", teks("n10b", 252, 38, "10 bungkus", 8.4, W.ungu)),
      tambah("toples", ...toples("tp", 238, 62, 40, 56)),
      tambah("satu@2", teks("n1c", 258, 130, "1 toples", 9, W.ungu)),
      tambah("ratusan,", kotak("lr-k", 228, 140, 60, 20, "#DCFCE7", W.rts, { rx: 6 }), teks("lr", 258, 154, "ratusan", 10, W.rts)),
      tambah("seratus", teks("n100", 258, 176, "100 butir", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 3. Tukar sepuluh ------------------------------ */
const SUARA_T1 = "Salsa memasukkan sepuluh butir lepas ke dalam satu bungkus.";
const SUARA_T2 = "Sepuluh bungkus pun ia tuang ke satu toples. Sepuluh jadi satu, tempatnya naik.";
const SUARA_T3 = "Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan satu ratusan.";

export const ADEGAN_TUKAR_SEPULUH: AdeganStory = {
  id: "tukar-sepuluh",
  judul: "Tukar sepuluh jadi satu",
  sumber: "Materi: sepuluh jadi satu",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tukar Sepuluh Butir"), ...lantai("lt", 150), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("sepuluh", ...sepuluhButir("sb", 96, 74), teks("n10", 116, 62, "10 butir", 9, W.ungu)),
      tambah("lepas", emo("pg", 76, 96, "\u{1F449}", 16)),
      tambah("bungkus.", ...bungkus("pk", 180, 100, 44, 34)),
      tambah("satu", teks("n1", 202, 62, "1 bungkus", 9, W.ungu)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Tukar Sepuluh Bungkus"), ...lantai("lt", 150), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("Sepuluh", ...Array.from({ length: 10 }, (_, i) => bungkus(`mb${i}`, 84 + (i % 5) * 20, 66 + Math.floor(i / 5) * 20, 16, 12)).flat(), teks("n10", 124, 50, "10 bungkus", 9, W.ungu)),
      tambah("toples.", ...toples("tp", 214, 78, 52, 64)),
      tambah("satu@2", teks("n1", 240, 56, "1 toples", 9, W.ungu)),
      tambah("naik.", panah("nk", 150, 126, 0, -22, W.merah, 3), teks("tk", 150, 142, "naik", 9, W.merah)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Sepuluh Jadi Satu")),
      tambah("satuan", butir("ic1", 75, 50, 7), teks("a1", 75, 84, "10 satuan", 11, W.sat)),
      tambah("sama", teks("a2", 75, 102, "=", 14, W.merah)),
      tambah("puluhan,", teks("a3", 75, 120, "1 puluhan", 11, W.pls), ...bungkus("ic2", 62, 130, 26, 20)),
      tambah("sepuluh@2", ...bungkus("ic3", 212, 42, 26, 20), teks("b1", 225, 84, "10 puluhan", 11, W.pls)),
      tambah("sama@2", teks("b2", 225, 102, "=", 14, W.merah)),
      tambah("ratusan.", teks("b3", 225, 120, "1 ratusan", 11, W.rts), ...toples("ic4", 212, 138, 26, 28)),
      sorotkan("ratusan.", "b3"),
    ),
  ],
};
