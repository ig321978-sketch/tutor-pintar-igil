import type { AdeganStory } from "./logika-story";
import { E, W, buSari, emo, geserKartuAngka, idAnto, idKertas, idMeja, idNia, idTokoh, isiTabelPS, judul, kartu, kartuAngka, kertasPesanan, kotakKue, lantai, lepas, mejaKasir, nia, pakAnto, panah, papanCatat, tabelPS, teks, tokoh, xBaris } from "./k2b1B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b1B-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Kue Hari Olahraga" (Kelas 2 Bab 1 Sub-Bab B, puluhan dan satuan), tengah cerita Kue di Kantin Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b1b.md. Bagian ini: tabel puluhan dan satuan, letak angka (tiga puluh empat dan empat puluh tiga), dan angka nol di satuan.
 */

/* ------------------------------ 4. Tabel puluhan dan satuan ------------------------------ */
const SUARA_T1 = "Dika menggambar tabel dengan dua kolom, puluhan dan satuan.";
const SUARA_T2 = "Angka dua ditaruh di kolom puluhan, dan angka lima di kolom satuan.";
const SUARA_T3 = "Dua di kolom puluhan artinya dua puluh. Lima di kolom satuan artinya lima saja.";

const TB = { x: 84, y: 50, w: 66, h: 26 };
const tabelKosong = () => tabelPS("tb", TB.x, TB.y, "", "", TB.w, TB.h);
const bagian = (ids: string[]) => tabelKosong().filter((o) => ids.includes(o.id));

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel",
  judul: "Tabel puluhan dan satuan",
  sumber: "Materi: tabel dua kolom",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tabel puluhan dan satuan"), lantai("tn", 150), ...tokoh("dk", 28, 150, E.dika, "Dika")),
      tambah("tabel", papanCatat("pc", 60, 28, 180, 118)),
      tambah("dua", ...kartu("k2", 84, 100, 132, 18, W.krem, ["2 kolom"], 9)),
      tambah("puluhan", ...bagian(["tb-hp", "tb-hpt", "tb-vp"])),
      tambah("satuan.", ...bagian(["tb-hs", "tb-hst", "tb-vs"])),
    ),
    k(
      SUARA_T2,
      hapus(0, "k2-k", "k2-t0"),
      tambah("dua", ...kartuAngka("ka", 40, 100, "2")),
      tambah("ditaruh", panah("pn", 58, 96, 80, 78, W.merah)),
      hapus("puluhan,", "ka", "ka-a", "pn"),
      tambah("puluhan,", isiTabelPS("tb", TB.x, TB.y, "p", "2", TB.w, TB.h)),
      tambah("lima", ...kartuAngka("kb", 260, 100, "5")),
      hapus("satuan.", "kb", "kb-a"),
      tambah("satuan.", isiTabelPS("tb", TB.x, TB.y, "s", "5", TB.w, TB.h)),
    ),
    k(
      SUARA_T3,
      tambah("artinya", panah("q1", 117, 94, 117, 108, W.merah)),
      tambah("puluh.", teks("e20", 117, 124, "= 20", 16, W.merah)),
      tambah(idx(SUARA_T3, "artinya", 2), panah("q2", 183, 94, 183, 108, W.merah)),
      tambah(idx(SUARA_T3, "lima", 2), teks("e5", 183, 124, "= 5", 16, W.merah)),
      sorotkan("puluhan", "tb-vp"),
      sorotkan(idx(SUARA_T3, "satuan", 1), "tb-vs"),
    ),
  ],
};

/* ------------------------------ 5. Letak angka: tiga puluh empat dan empat puluh tiga ------------------------------ */
const SUARA_L1 = "Nia menyusun kartu tiga dan empat menjadi tiga puluh empat.";
const SUARA_L2 = "Kartunya ditukar, jadilah empat puluh tiga. Angkanya sama, letaknya beda, artinya pun beda.";
const SUARA_L3 = "Bu Sari berkata, kalau tertukar, dapur membuat terlalu banyak kue yang terbuang.";

export const ADEGAN_LETAK: AdeganStory = {
  id: "letak-angka",
  judul: "Letak angka menentukan artinya",
  sumber: "Materi: 34 dan 43",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Menyusun kartu angka"), lantai("tn", 150), ...nia("ni", 24, 150)),
      tambah("tiga", ...kartuAngka("k3", 116, 64, "3")),
      tambah("empat", ...kartuAngka("k4", 152, 64, "4")),
      tambah("menjadi", panah("pn", 134, 88, 134, 102, W.merah)),
      sorotkan("puluh", "k3"),
      tambah(idx(SUARA_L1, "empat", 2), teks("l34", 134, 128, "34", 26, W.merah)),
    ),
    k(
      SUARA_L2,
      hapus(0, "pn"),
      ubah("ditukar,", ...geserKartuAngka("k3", 152, 64), ...geserKartuAngka("k4", 116, 64)),
      tambah("jadilah", ...tabelPS("t1", 30, 96, "3", "4", 46, 22), ...tabelPS("t2", 178, 96, "4", "3", 46, 22)),
      ubah("jadilah", { id: "l34", x: 76, y: 156, u: 16 }),
      tambah("tiga.", teks("l43", 224, 156, "43", 16, W.merah)),
      sorotkan("sama,", "k3", "k4"),
      tambah("beda,", teks("ne", 150, 122, "≠", 24, W.merah)),
      tambah("beda.", emo("tq", 150, 176, E.tanya, 18)),
    ),
    k(
      SUARA_L3,
      hapus(0, "tq"),
      tambah("Bu", ...buSari("bs", 280, 150)),
      tambah("berkata,", emo("jr", 280, 124, E.jari, 20)),
      sorotkan("tertukar,", "t1-vp", "t1-vs", "t2-vp", "t2-vs"),
      tambah("banyak", ...[0, 1, 2, 3, 4, 5].map((i) => lepas(`bn${i}`, xBaris(150, 6, i, 24), 186, 16))),
      tambah("terbuang.", emo("bt", 150, 168, E.salah, 18)),
    ),
  ],
};

/* ------------------------------ 6. Angka nol di satuan: empat puluh kue ------------------------------ */
const SUARA_N1 = "Pak Anto menambah pesanan, empat puluh kue lagi untuk para penonton.";
const SUARA_N2 = "Chacha heran. Angka nol itu untuk apa? Ia mencari kue lepas, dan Nia cekikikan.";
const SUARA_N3 = "Dika menjelaskan, nol di satuan artinya tidak ada kue lepas. Empat puluh berarti empat kotak penuh.";

const BOX4 = [[216, 58], [260, 58], [216, 100], [260, 100]];

export const ADEGAN_NOL: AdeganStory = {
  id: "angka-nol",
  judul: "Angka nol di satuan",
  sumber: "Materi: 40 dan angka nol",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Pesanan tambahan"), lantai("tn", 150), ...mejaKasir("mj", 100, 112, 100)),
      tambah("Pak", ...pakAnto("pa", 52, 150)),
      tambah("pesanan,", ...kertasPesanan("kr", 106, 76, 52, 34), teks("pn", 132, 98, "4", 22, W.merah, { z: 2 })),
      ubah("puluh", { id: "pn", isi: "40" }),
      tambah("kue", ...BOX4.flatMap(([x, y], i) => kotakKue(`ba${i}`, x, y))),
      tambah("penonton.", emo("pt", 262, 150, E.penonton, 26)),
    ),
    k(
      SUARA_N2,
      hapus(0, ...idAnto("pa"), ...idKertas("kr"), "pn", "pt", ...idMeja("mj")),
      tambah("Chacha", ...tokoh("ch", 150, 150, E.chacha, "Chacha")),
      tambah("heran.", emo("hr", 150, 122, E.kaget, 22)),
      tambah("Angka", ...tabelPS("tb", 20, 40, "4", "", 46, 22)),
      tambah("nol", isiTabelPS("tb", 20, 40, "s", "0", 46, 22)),
      sorotkan("nol", "tb-vs"),
      tambah("mencari", emo("tg", 108, 140, E.raba, 22)),
      tambah("lepas,", emo("tq", 190, 128, E.tanya, 20)),
      tambah("Nia", ...nia("ni", 268, 150)),
      tambah("cekikikan.", emo("ck", 268, 124, E.cekikik, 20)),
    ),
    k(
      SUARA_N3,
      hapus(0, ...idTokoh("ch"), "hr", "tg", "tq", ...idNia("ni"), "ck"),
      tambah("Dika", ...tokoh("dk", 150, 150, E.dika, "Dika")),
      sorotkan("satuan", "tb-vs"),
      tambah("tidak", emo("nk", 89, 100, E.salah, 18)),
      tambah("puluh", teks("e40", 66, 126, "= 40", 16, W.merah)),
      sorotkan("kotak", ...BOX4.map((_, i) => `ba${i}`)),
    ),
  ],
};
