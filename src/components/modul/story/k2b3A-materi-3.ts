import type { AdeganStory } from "./logika-story";
import { E, W, WARNA_BENTUK, WT, bangun, bulat, capTelur, emo, garis, judul, kapur, kotak, papanCatat, papanPetak, relSegiempat, rumput, teks, telur, tengahPetak, tokoh } from "./k2b3A-gambar";
import { hapus, k, tambah, ubah } from "./k2b3A-bantu";

/*
 * Cerita orisinal IGIL "Ubin untuk Taman Bermain" (Kelas 2 Bab 3 Sub-Bab A, bangun datar), awal cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3a.md. Bagian ini: ubin telur (bukan lingkaran), tiga pertanyaan Dika, dan penutup.
 */

/* ------------------------------ 7. Ubin telur ------------------------------ */
const SUARA_E1 = "Chacha memutar ubin yang berbentuk telur di atas cetakannya.";
const SUARA_E2 = "Ubin itu tidak pas lagi, jadi bukan lingkaran.";
const SUARA_E3 = "Chacha tertawa, ubin telurnya ikut berputar!";

export const ADEGAN_UBIN_TELUR: AdeganStory = {
  id: "ubin-telur",
  judul: "Ubin telur diputar",
  sumber: "Materi: ubin telur bukan lingkaran",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Ubin Telur"), rumput("rp"), kotak("kt", 70, 40, 160, 120, W.putih, W.abu, { rx: 4, tebal: 2, z: -1 })),
      tambah("Chacha", ...tokoh("ch", 40, 178, "Chacha")),
      tambah(0, capTelur("tl", 150, 100, 40, 26)),
      tambah("memutar", telur("tl", 150, 100, 40, 26, WARNA_BENTUK.lengkung)),
      ubah("berbentuk", { id: "tl", rot: 50 }),
      tambah("cetakannya.", emo("pt", 252, 72, "\u{1F504}", 18)),
    ),
    k(
      SUARA_E2,
      tambah("tidak", emo("xx", 210, 70, E.salah, 20)),
      ubah("tidak", { id: "tl", rot: 90 }),
      tambah("lagi,", teks("tn", 150, 176, "tidak pas", 10, W.merah)),
      tambah("bukan", teks("bl", 150, 190, "bukan lingkaran", 9, W.ungu)),
    ),
    k(
      SUARA_E3,
      hapus(0, "xx", "pt"),
      ubah("tertawa,", { id: "ch", isi: E.tertawa }),
      tambah("tertawa,", emo("ha", 66, 150, "\u{1F606}", 16)),
      ubah("telurnya", { id: "tl", rot: 160 }),
      ubah("berputar!", { id: "tl", rot: 300 }),
      tambah("berputar!", emo("pt2", 214, 70, "\u{1F504}", 18)),
    ),
  ],
};

/* ------------------------------ 8. Tiga pertanyaan Dika ------------------------------ */
const SUARA_Q1 = "Dika mencatat tiga pertanyaan di papan catatan kecilnya.";
const SUARA_Q2 = "Satu, tepinya garis lurus atau melengkung? Dua, kalau lurus, berapa sisinya?";
const SUARA_Q3 = "Tiga, kalau melengkung, pas atau tidak bila diputar?";

export const ADEGAN_TIGA_TANYA: AdeganStory = {
  id: "tiga-tanya",
  judul: "Tiga pertanyaan Dika",
  sumber: "Materi: tiga pertanyaan Dika",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Papan Catatan Dika"), rumput("rp")),
      tambah("Dika", ...tokoh("dk", 270, 178, "Dika")),
      tambah("mencatat", emo("ct", 250, 150, E.catat, 18)),
      tambah("papan", papanCatat("pc", 40, 34, 200, 120)),
      tambah("tiga", kapur("p3", 140, 56, "3 pertanyaan", 11, { warna: "#FDE047" })),
    ),
    k(
      SUARA_Q2,
      hapus(0, "ct"),
      tambah("Satu,", kapur("r1", 128, 84, "1. lurus atau lengkung?", 9)),
      tambah("garis", garis("il", 206, 76, 24, 0, "#F8FAFC", 2.4, { z: 3 }), { id: "ik", t: "jalur", x: 206, y: 96, d: "M0 0 C6 -10 12 -10 18 0", warna: "none", garis: "#F8FAFC", tebal: 2.4, z: 3 }),
      tambah("Dua,", kapur("r2", 120, 108, "2. lurus: berapa sisi?", 9)),
      tambah("sisinya?", kapur("rs", 214, 108, "3 4 5 6", 9, { warna: "#FDE047" })),
    ),
    k(
      SUARA_Q3,
      tambah("Tiga,", kapur("r3", 128, 132, "3. lengkung: pas bila diputar?", 9)),
      tambah("diputar?", bulat("ic", 214, 126, 6, "none", "#F8FAFC", { tebal: 2.2, z: 3 }), emo("ik2", 232, 126, "\u{1F504}", 12, { z: 4 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Semua petak terisi pas, tanpa celah dan tanpa ada yang tersandung.";
const SUARA_N2 = "Dika merangkum. Lihat tepinya, hitung sisinya dengan satu tanda awal, lalu sebut namanya.";
const SUARA_N3 = "Bu Sari tersenyum. Besok ada papan puzzle. Menurutmu, satu persegi bisa dipotong menjadi bentuk apa saja? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Tono!";

const GX = 170;
const GY = 96;
const WARNA_PETAK = [WT.ubinKuning, WT.ubinHijau, "#F9A8D4", "#FDBA74", "#93C5FD", "#C4B5FD"];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Petak terisi dan pertanyaan penutup",
  sumber: "Materi: penutup dan jembatan ke puzzle",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Semua Petak Terisi"), rumput("rp"), ...papanPetak("pp", GX, GY, 3, 2, 30)),
      tambah("petak", ...[0, 1, 2, 3, 4, 5].map((i) => bangun(`ub${i}`, relSegiempat(26, 26), tengahPetak(GX, GY, 3, i, 30).x, tengahPetak(GX, GY, 3, i, 30).y, WARNA_PETAK[i]))),
      tambah("pas,", emo("ok", 215, 82, E.benar, 20)),
      tambah("celah", emo("an1", 60, 178, E.anak, 24)),
      tambah("tersandung.", emo("an2", 120, 178, E.senyum, 24)),
    ),
    k(
      SUARA_N2,
      hapus(0, "ok", "an1", "an2"),
      tambah("Dika", ...tokoh("dk", 262, 178, "Dika")),
      tambah("merangkum.", papanCatat("pc", 14, 34, 140, 86)),
      tambah("tepinya,", kapur("c1", 84, 62, "1. lihat tepinya", 8.6)),
      tambah("hitung", kapur("c2", 84, 82, "2. hitung sisinya", 8.6)),
      tambah("tanda", emo("bd", 128, 94, E.bendera, 12, { z: 4 })),
      tambah("namanya.", kapur("c3", 84, 102, "3. sebut namanya", 8.6)),
    ),
    k(
      SUARA_N3,
      { at: 0, bersih: true },
      tambah(0, judul("Besok: Papan Puzzle"), rumput("rp")),
      tambah("Sari", ...tokoh("bs", 210, 178, "Bu Sari")),
      tambah("puzzle.", kotak("pz", 40, 36, 220, 108, "#FEF3C7", W.coklat, { rx: 6, tebal: 4, z: -1 }), emo("qq", 238, 62, E.tanya, 22)),
      tambah("satu", bangun("sq", relSegiempat(50, 50), 150, 92, WT.ubinKuning), teks("sn", 150, 134, "1 persegi", 10, W.merah)),
      tambah("dipotong", garis("gp", 125, 117, 50, -50, W.merah, 3, { gambar: true, z: 3, putus: true })),
      tambah("Chacha,", ...tokoh("ch", 40, 178, "Chacha")),
      tambah("Dika,", ...tokoh("dk", 90, 178, "Dika")),
      tambah("Nia,", ...tokoh("ni", 150, 178, "Nia")),
      tambah("Sari,@2", emo("lb0", 210, 150, E.lambai, 16)),
      tambah("Tono!", ...tokoh("pt", 270, 178, "Pak Tono"), emo("lb1", 270, 150, E.lambai, 16)),
    ),
  ],
};
