import type { AdeganStory } from "./logika-story";
import { E, W, WK, bingkaiSepuluh, emo, judul, kartu, kotak, kueEmo, lantai, pusatSel, teks, tokoh } from "./k2b1A-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b1A-bantu";

/*
 * Cerita orisinal IGIL "Kue Kiriman dari Dapur" (Kelas 2 Bab 1 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b1a.md. Bagian ini: pembuka (tiga kartu resep tua), Ten Frame, dan terapannya.
 */

export const NAMA_METODE = ["Ten Frame", "Skip Counting", "Counting On"] as const;
export const NAMA_METODE_ID = ["Bingkai Sepuluh", "Hitung Meloncat", "Hitung Lanjut"] as const;

const sel = (id: string, i: number) => `${id}-s${i}`;
const semuaSel = (id: string) => Array.from({ length: 10 }, (_, i) => sel(id, i));

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Saat membersihkan laci etalase, Nia menemukan tiga kartu resep tua milik penjaga kantin zaman dulu.";
const SUARA_O2 = "Bu Sari tertawa. Itu kartu cara menghitung kue dari kantin zaman dulu!";
const SUARA_O3 = "Tiga cara itu: Ten Frame, Skip Counting, dan Counting On.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Bingkai Sepuluh, Hitung Meloncat, dan Hitung Lanjut.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu resep tua",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kartu Resep Tua"), lantai("lt", 168)),
      tambah("laci", kotak("lc", 40, 50, 220, 70, WK.kayu, W.coklat, { rx: 6, tebal: 2.4, z: -1 }), kotak("gg", 138, 56, 24, 6, W.coklat, W.coklat, { rx: 3 })),
      tambah("etalase,", teks("ll", 150, 112, "laci etalase", 9, W.coklat)),
      tambah("Nia", ...tokoh("ni", 30, 178, "Nia")),
      tambah("menemukan", ...[0, 1, 2].flatMap((i) => kartu(`rk${i}`, 62 + i * 66, 72, 52, 30, W.krem, ["resep"], 8.4))),
      tambah("tiga", teks("n3", 150, 144, "3 kartu resep", 11, W.ungu)),
      ubah("tua", ...[0, 1, 2].map((i) => ({ id: `rk${i}-k`, warna: "#FDE68A" }))),
    ),
    k(
      SUARA_O2,
      tambah("Sari", ...tokoh("bs", 268, 178, "Bu Sari")),
      ubah("tertawa.", { id: "bs", isi: E.tertawa }),
      ubah("kartu", ...[0, 1, 2].map((i) => ({ id: `rk${i}-k`, sorot: true }))),
      tambah("menghitung", kueEmo("kq", 226, 152, 24)),
      tambah("zaman", emo("kl", 190, 152, E.kartuResep, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Menghitung")),
      tambah("Frame,", teks("m0", 80, 62, "1. Ten Frame", 14, W.biru)),
      tambah("Counting,", teks("m1", 80, 98, "2. Skip Counting", 14, W.biru)),
      tambah("On.", teks("m2", 80, 134, "3. Counting On", 14, W.biru)),
    ),
    k(
      SUARA_O4,
      tambah("Bingkai", teks("n0", 225, 62, "Bingkai Sepuluh", 11, W.ungu)),
      tambah("Sepuluh,", teks("s10", 168, 62, "10", 9, W.merah)),
      tambah("Meloncat,", teks("n1", 225, 98, "Hitung Meloncat", 11, W.ungu)),
      tambah("Lanjut.", teks("n2", 225, 134, "Hitung Lanjut", 11, W.ungu)),
    ),
  ],
};

/* ------------------------------ Ten Frame: konsep ------------------------------ */
const SUARA_F1 = "Cara pertama, Ten Frame, atau Bingkai Sepuluh.";
const SUARA_F2 = "Bingkai ini punya sepuluh kotak, dua baris dengan lima kotak tiap baris.";
const SUARA_F3 = "Isi kotaknya dengan benda, satu kotak untuk satu benda.";
const SUARA_F4 = "Bingkai yang penuh berarti tepat sepuluh, jadi tidak perlu dihitung lagi.";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame: Bingkai Sepuluh",
  sumber: "Metode global: Ten Frame (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Cara 1: Ten Frame"), lantai("lt", 168)),
      tambah("Ten", ...bingkaiSepuluh("bf", 100, 70, 20)),
      tambah("Bingkai", teks("bn", 150, 132, "Bingkai Sepuluh", 12, W.ungu)),
      tambah("Sepuluh.", teks("s10", 150, 156, "10", 18, W.merah)),
    ),
    k(
      SUARA_F2,
      hapus(0, "bn", "s10"),
      tambah("sepuluh", teks("t10", 252, 94, "10 kotak", 10, W.merah)),
      ubah("dua", ...[0, 1, 2, 3, 4].map((i) => ({ id: sel("bf", i), warna: "#FEF9C3" }))),
      tambah("dua", teks("t2", 52, 86, "2 baris", 10, W.ungu)),
      tambah("lima", teks("t5", 150, 62, "5 kotak", 10, W.ungu)),
      ubah("lima", ...[0, 1, 2, 3, 4].map((i) => ({ id: sel("bf", i), sorot: true }))),
    ),
    k(
      SUARA_F3,
      hapus(0, "t10", "t2", "t5"),
      ubah(0, ...semuaSel("bf").map((id) => ({ id, sorot: false, warna: "#FFFFFF" }))),
      tambah("Isi", ...Array.from({ length: 5 }, (_, i) => kueEmo(`bk${i}`, ...pusatSel(100, 70, 20, i), 14))),
      tambah("benda,", ...Array.from({ length: 5 }, (_, i) => kueEmo(`bk${i + 5}`, ...pusatSel(100, 70, 20, i + 5), 14))),
      tambah("satu", teks("ee", 150, 136, "1 kotak = 1 benda", 11, W.ungu)),
    ),
    k(
      SUARA_F4,
      hapus(0, "ee"),
      ubah("penuh", ...semuaSel("bf").map((id) => ({ id, sorot: true, warna: "#DCFCE7" }))),
      tambah("sepuluh,", teks("pn", 150, 140, "= 10", 20, W.merah)),
      tambah("tidak", emo("xx", 236, 98, E.salah, 22)),
      tambah("dihitung", teks("hg", 150, 168, "tidak perlu dihitung lagi", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ Ten Frame: terapan ------------------------------ */
const SUARA_T1 = "Dika menaruh donat ke bingkai. Satu bingkai penuh, dan bingkai kedua baru terisi tujuh.";
const SUARA_T2 = "Sepuluh ditambah tujuh sama dengan tujuh belas donat.";
const SUARA_T3 = "Cocok kalau bendanya rapi dan jumlahnya tidak terlalu banyak.";
const SUARA_T4 = "Kurang cocok kalau bendanya ratusan, karena bingkainya terlalu banyak.";

const donat = (id: string, i: number, x: number, y: number) => {
  const [cx, cy] = pusatSel(x, y, 20, i);
  return emo(id, cx, cy + 5, E.donat, 14);
};

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame: menghitung donat",
  sumber: "Metode global: Ten Frame (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Menaruh Donat"), lantai("lt", 168), ...bingkaiSepuluh("f1", 20, 60, 20), ...bingkaiSepuluh("f2", 170, 60, 20)),
      tambah("Dika", ...tokoh("dk", 270, 178, "Dika")),
      tambah("donat", ...Array.from({ length: 5 }, (_, i) => donat(`d1-${i}`, i, 20, 60))),
      tambah("bingkai.", ...Array.from({ length: 5 }, (_, i) => donat(`d1-${i + 5}`, i + 5, 20, 60))),
      tambah("Satu", teks("a1", 70, 122, "1 bingkai penuh", 9.4, W.hijau)),
      tambah("terisi", ...Array.from({ length: 4 }, (_, i) => donat(`d2-${i}`, i, 170, 60))),
      tambah("tujuh.", ...Array.from({ length: 3 }, (_, i) => donat(`d2-${i + 4}`, i + 4, 170, 60)), teks("a7", 220, 122, "7 terisi", 9.4, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("Sepuluh", teks("p10", 50, 158, "10", 20, W.biru)),
      tambah("ditambah", teks("pp", 90, 158, "+", 20, W.biru)),
      tambah("tujuh", teks("p7", 126, 158, "7", 20, W.merah)),
      tambah("sama", teks("ps", 164, 158, "=", 20, W.biru)),
      tambah("belas", teks("p17", 206, 158, "17", 20, W.hijau)),
      ubah("donat.", ...[...semuaSel("f1"), ...semuaSel("f2").slice(0, 7)].map((id) => ({ id, warna: "#FEF9C3" }))),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...bingkaiSepuluh("g", 100, 56, 20)),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("rapi", ...Array.from({ length: 10 }, (_, i) => donat(`dg${i}`, i, 100, 56))),
      tambah("jumlahnya", ...kartu("cc", 70, 120, 160, 26, W.hijauMuda, ["rapi dan sedikit"], 10)),
      ubah("banyak.", { id: "cc-k", sorot: true }),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("ratusan,", ...Array.from({ length: 12 }, (_, i) => kotak(`mf${i}`, 20 + (i % 4) * 66, 44 + Math.floor(i / 4) * 32, 56, 24, W.putih, W.biru, { rx: 2, tebal: 1.4 }))),
      tambah("bingkainya", teks("rb", 150, 152, "ratusan benda = banyak bingkai", 9.4, W.merah)),
      tambah("banyak.", emo("xs", 150, 182, E.salah, 24)),
    ),
  ],
};
