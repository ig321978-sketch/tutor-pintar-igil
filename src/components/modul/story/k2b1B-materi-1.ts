import type { AdeganStory } from "./logika-story";
import { E, W, buSari, emo, gs, judul, kartu, kertasPesanan, kotakKue, lantai, lepas, mejaKasir, nia, pakAnto, panah, teks, tokoh, xBaris } from "./k2b1B-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k2b1B-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Kue Hari Olahraga" (Kelas 2 Bab 1 Sub-Bab B, puluhan dan satuan), tengah cerita Kue di Kantin Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b1b.md. Bagian ini: pesanan datang, salah baca (dua dan lima jadi tujuh), dan kotak kue (dua kotak dan lima lepas).
 */

/* ------------------------------ 1. Pesanan datang ------------------------------ */
const SUARA_P1 = "Pak Anto, guru olahraga, menyerahkan kertas pesanan untuk lomba lari hari Sabtu.";
const SUARA_P2 = "Di kertas tertulis dua puluh lima, jumlah kue yang dibuat dapur.";
const SUARA_P3 = "Bu Sari berkata, kalau salah baca, dapur membuat terlalu sedikit dan para pelari tidak kebagian!";

export const ADEGAN_PESANAN: AdeganStory = {
  id: "pesanan-datang",
  judul: "Pesanan datang",
  sumber: "Materi: pesanan 25 kue",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pesanan Kue Hari Olahraga"), lantai("tn", 150), ...mejaKasir("mj", 100, 112, 100)),
      tambah("Pak", ...pakAnto("pa", 52, 150)),
      tambah("olahraga,", emo("lr", 258, 150, E.lari, 26)),
      ubah("menyerahkan", { id: "pa", x: 76 }, { id: "pa-p", x: 84 }, { id: "pa-q", x: 74 }, { id: "pa-n", x: 76 }),
      tambah("kertas", ...kertasPesanan("kr", 106, 76, 52, 34)),
      tambah("lomba", ...kartu("lb", 200, 30, 90, 20, W.krem, ["lomba lari"], 8.6)),
    ),
    k(
      SUARA_P2,
      tambah("tertulis", teks("pn", 132, 98, "", 22, W.merah, { z: 2 })),
      ubah("dua", { id: "pn", isi: "2" }),
      ubah("puluh", { id: "pn", isi: "20" }),
      ubah("lima,", { id: "pn", isi: "25" }),
      tambah("kue", ...[0, 1, 2, 3].map((i) => lepas(`ke${i}`, xBaris(250, 4, i, 20), 100, 15))),
      tambah("dapur.", ...kartu("dp", 208, 56, 84, 20, W.krem, ["dapur sekolah"], 8.4)),
    ),
    k(
      SUARA_P3,
      tambah("Bu", ...buSari("bs", 222, 150)),
      tambah("salah", emo("sl", 132, 66, E.salah, 18)),
      ubah("sedikit", { id: "ke2", op: 0.2 }, { id: "ke3", op: 0.2 }),
      tambah("pelari", emo("pl", 262, 150, E.lari, 24)),
      tambah("kebagian!", emo("sd", 262, 122, E.sedih, 20)),
    ),
  ],
};

/* ------------------------------ 2. Dua dan lima jadi tujuh kue (salah langkah) ------------------------------ */
const SUARA_T1 = "Chacha membaca cepat. Dua dan lima, jadi tujuh kue saja!";
const SUARA_T2 = "Dika menggeleng. Kalau hanya tujuh kue, hampir semua pelari pulang dengan tangan kosong.";
const SUARA_T3 = "Bu Sari bertanya, mengapa dua puluh lima bukan dua ditambah lima? Nia menjawab, kita lihat dulu kuenya.";

const TUJUH: [number, number][] = [[218, 88], [238, 88], [258, 88], [278, 88], [228, 108], [248, 108], [268, 108]];

export const ADEGAN_TUJUH: AdeganStory = {
  id: "tujuh-kue",
  judul: "Dua dan lima jadi tujuh kue",
  sumber: "Materi: salah baca 2 + 5 = 7",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Salah baca"), lantai("tn", 150), ...mejaKasir("mj", 100, 112, 100)),
      tambah("Chacha", ...tokoh("ch", 52, 150, E.chacha, "Chacha")),
      tambah("membaca", ...kertasPesanan("kr", 106, 58, 56, 34), teks("d2", 124, 86, "2", 22, W.biru, { z: 2 }), teks("d5", 146, 86, "5", 22, W.biru, { z: 2 })),
      ubah("Dua", { id: "d2", warna: W.merah }),
      ubah("lima,", { id: "d5", warna: W.merah }),
      tambah("jadi", ...kartu("pj", 176, 28, 112, 22, W.putih, ["2 + 5 ="], 11)),
      ubah("tujuh", { id: "pj-t0", isi: "2 + 5 = 7" }),
      tambah("tujuh", ...TUJUH.map(([x, y], i) => lepas(`ke${i}`, x, y, 15))),
    ),
    k(
      SUARA_T2,
      tambah("Dika", ...tokoh("dk", 258, 150, E.dika, "Dika")),
      tambah("menggeleng.", emo("gl", 232, 140, E.salah, 18)),
      sorotkan("tujuh", ...TUJUH.map((_, i) => `ke${i}`)),
      tambah("pelari", ...[0, 1, 2].map((i) => emo(`pl${i}`, 22 + i * 22, 90, E.lari, 20))),
      tambah("kosong.", emo("sd", 44, 62, E.sedih, 22)),
    ),
    k(
      SUARA_T3,
      tambah("Bu", ...buSari("bs", 218, 150)),
      tambah("mengapa", emo("tq", 218, 124, E.tanya, 20)),
      tambah("lima", ...kartu("p25", 176, 54, 112, 22, W.hijauMuda, ["25 bukan 2 + 5"], 9.4)),
      tambah("bukan", gs("cr", 178, 30, 286, 48, W.merah, 2.5)),
      tambah("Nia", ...nia("ni", 22, 150)),
      tambah("lihat", emo("ms", 22, 122, E.mata, 20)),
      ubah("kuenya.", { id: "ni-n", warna: W.merah }),
    ),
  ],
};

/* ------------------------------ 3. Dikemas per sepuluh: dua kotak dan lima lepas ------------------------------ */
const SUARA_K1 = "Nia menyusun kue di kotak yang muat sepuluh. Hasilnya dua kotak penuh, ditambah lima kue lepas.";
const SUARA_K2 = "Dua puluh ditambah lima sama dengan dua puluh lima, jadi pesanannya benar.";
const SUARA_K3 = "Chacha melongo. Ternyata angka dua itu menyimpan dua kotak sepuluh!";

const LEPAS5 = [0, 1, 2, 3, 4];

export const ADEGAN_KOTAK: AdeganStory = {
  id: "kotak-kue",
  judul: "Dikemas per sepuluh",
  sumber: "Materi: dua kotak dan lima lepas",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Dikemas per sepuluh"), lantai("tn", 150)),
      tambah("Nia", ...nia("ni", 30, 150)),
      tambah("muat", ...kotakKue("bk0", 80, 100)),
      tambah("dua", ...kotakKue("bk1", 128, 100), ...kartu("kk", 58, 122, 92, 18, W.krem, ["2 kotak"], 9)),
      sorotkan("penuh,", "bk0", "bk1"),
      tambah("lima", ...LEPAS5.map((i) => lepas(`lp${i}`, xBaris(236, 5, i, 16), 100, 15)), ...kartu("ll", 196, 122, 80, 18, W.merahMuda, ["5 lepas"], 9)),
    ),
    k(
      SUARA_K2,
      ubah("Dua", { id: "bk0", sorot: false }, { id: "bk1", sorot: false }),
      tambah("Dua", teks("eq", 150, 54, "2", 16, W.merah)),
      ubah("puluh", { id: "eq", isi: "20" }),
      ubah("ditambah", { id: "eq", isi: "20 +" }),
      ubah("lima", { id: "eq", isi: "20 + 5" }),
      ubah("sama", { id: "eq", isi: "20 + 5 =" }),
      ubah("dua@2", { id: "eq", isi: "20 + 5 = 2" }),
      ubah("puluh@2", { id: "eq", isi: "20 + 5 = 20" }),
      ubah("lima@2", { id: "eq", isi: "20 + 5 = 25" }),
      tambah("benar.", emo("ok", 150, 82, E.benar, 20)),
    ),
    k(
      SUARA_K3,
      hapus(0, "eq", "ok", "kk-k", "kk-t0", "ll-k", "ll-t0"),
      tambah("Chacha", ...tokoh("ch", 258, 150, E.chacha, "Chacha")),
      tambah("melongo.", emo("ml", 258, 124, E.kaget, 22)),
      tambah("angka", teks("bg", 104, 52, "2", 30, W.merah)),
      tambah("menyimpan", panah("pn", 104, 58, 104, 74, W.merah)),
      ubah("sepuluh!", { id: "bk0-l", warna: W.merah }, { id: "bk1-l", warna: W.merah }),
    ),
  ],
};
