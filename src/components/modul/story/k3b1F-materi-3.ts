import type { AdeganStory, Obj } from "./logika-story";
import { E, W, busur, emo, garisBilangan, judul, kartu, kotak, kotakIsi, lantai, papan, rakKayu, tanda, teks, tokoh } from "./k3b1F-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k3b1F-bantu";

/*
 * Cerita orisinal IGIL "Telur Bu Mirna" (Kelas 3 Bab 1 Sub-Bab F, perkalian sampai seratus), Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1f.md. Bagian ini: lompat hitung, cerita enam kotak pensil, dan penutup (jembatan ke Sub-Bab G).
 */

/* ------------------------------ 7. Lompat hitung ------------------------------ */
const SUARA_L1 = "Salsa menghitung kali dua dengan lompatan: dua, empat, enam, delapan, sepuluh.";
const SUARA_L2 = "Tiap lompatan menambah banyak yang sama. Lima lompatan sebesar dua berarti sepuluh.";
const SUARA_L3 = "Lompat hitung membantu mengingat perkalian dengan cepat.";

/** Garis bilangan nol sampai sepuluh: titik v ada di x = 30 + 24 v, pada tinggi 120. */
const xv = (v: number): number => 30 + v * 24;

export const ADEGAN_LOMPAT_HITUNG: AdeganStory = {
  id: "lompat-hitung",
  judul: "Lompat hitung kali dua",
  sumber: "Materi: lompat hitung pada garis bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lompat Dua-Dua"), garisBilangan("gb", 30, 270, 120), ...tanda("t0", xv(0), 120, "0", 10, W.biru), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("kali", teks("kl", 150, 52, "kali 2", 12, W.ungu)),
      tambah("dua@2", busur("b1", xv(0), xv(2), 118, 22), ...tanda("t2", xv(2), 120, "2")),
      tambah("empat,", busur("b2", xv(2), xv(4), 118, 22), ...tanda("t4", xv(4), 120, "4")),
      tambah("enam,", busur("b3", xv(4), xv(6), 118, 22), ...tanda("t6", xv(6), 120, "6")),
      tambah("delapan,", busur("b4", xv(6), xv(8), 118, 22), ...tanda("t8", xv(8), 120, "8")),
      tambah("sepuluh.", busur("b5", xv(8), xv(10), 118, 22), ...tanda("t10", xv(10), 120, "10")),
    ),
    k(
      SUARA_L2,
      tambah("menambah", ...[0, 1, 2, 3, 4].map((i) => teks(`p${i}`, xv(2 * i + 1), 100, "+2", 9, W.hijau))),
      tambah("Lima", teks("n5", 150, 74, "5 lompatan", 11, W.merah)),
      tambah("dua", teks("n2", 150, 88, "tiap lompatan 2", 8.4, W.hijau)),
      tambah("sepuluh.", teks("hs", 170, 160, "5 × 2 = 10", 18, W.merah)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Kali Dua dengan Cepat"), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("membantu", emo("lm", 40, 130, E.lampu, 22)),
      tambah("mengingat", ...[2, 4, 6, 8, 10].flatMap((v, i) => kartu(`kr${i}`, 36 + i * 50, 66, 40, 34, W.krem, [String(v)], 16))),
      tambah("cepat.", emo("kt", 258, 130, E.kilat, 26)),
      ubah("cepat.", { id: "sl", isi: E.senyum }),
    ),
  ],
};

/* ------------------------------ 8. Cerita enam kotak pensil ------------------------------ */
const SUARA_C1 = "Di toko ada enam kotak pensil, tiap kotak berisi sepuluh pensil. Berapa pensilnya?";
const SUARA_C2 = "Enam kali sepuluh: sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh, enam puluh.";
const SUARA_C3 = "Pensilnya ada enam puluh buah, tidak lebih dari seratus.";

/** Enam kotak pensil di rak: tiga kolom, dua baris. Tiap kotak sepuluh pensil. Id `kp0`..`kp5`. */
const POSISI_KP: [number, number][] = [
  [13, 70],
  [107, 70],
  [201, 70],
  [13, 115],
  [107, 115],
  [201, 115],
];
const kp = (i: number): Obj[] => kotakIsi(`kp${i}`, POSISI_KP[i][0], POSISI_KP[i][1], 10, 10, 8, "pensil", "#FDE68A");
const ID_KP = [0, 1, 2, 3, 4, 5].map((i) => `kp${i}`);
const SEMUA_KP = [0, 1, 2, 3, 4, 5].flatMap(kp);

export const ADEGAN_CERITA_KALI: AdeganStory = {
  id: "cerita-kali",
  judul: "Enam kotak pensil di rak",
  sumber: "Materi: cerita perkalian",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Rak Pensil"), ...rakKayu("rp", 6, 44, 288, 90, 2)),
      tambah("enam", teks("n6", 150, 36, "6 kotak", 10, W.ungu)),
      tambah("kotak", ...SEMUA_KP),
      tambah("sepuluh", teks("n10", 150, 152, "10 pensil", 11, W.merah)),
      tambah("Berapa", ...tokoh("pj", 270, 184, "Pak Joko"), emo("tq", 270, 140, E.tanya, 20)),
    ),
    k(
      SUARA_C2,
      ubah("sepuluh:", { id: "n10", isi: "6 × 10", u: 13 }),
      tambah("sepuluh@2", teks("c0", 56, 66, "10", 11, W.merah)),
      tambah("dua", teks("c1", 150, 66, "20", 11, W.merah)),
      tambah("tiga", teks("c2", 244, 66, "30", 11, W.merah)),
      tambah("empat", teks("c3", 56, 111, "40", 11, W.merah)),
      tambah("lima", teks("c4", 150, 111, "50", 11, W.merah)),
      tambah("enam@2", teks("c5", 244, 111, "60", 11, W.merah)),
    ),
    k(
      SUARA_C3,
      sorotkan("enam", ...ID_KP),
      ubah("enam", { id: "n10", isi: "60 pensil", u: 15, warna: W.hijau }),
      tambah("tidak", teks("bt", 150, 174, "tidak lebih dari 100", 10, W.ungu)),
      tambah("seratus.", emo("ok", 222, 172, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: jembatan ke Sub-Bab G ------------------------------ */
const SUARA_N1 = "Raka menepati taruhannya dan mengelap semua rak sampai mengilap.";
const SUARA_N2 = "Pak Joko mengumumkan, besok hari jadi toko! Semua pelanggan akan mendapat bingkisan.";
const SUARA_N3 = "Menurutmu, kalau dua puluh telur dibagi ke empat kotak, tiap kotak berisi berapa? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Bu Mirna!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Rak mengilap dan kabar hari jadi toko",
  sumber: "Materi: penutup dan jembatan ke Sub-Bab G",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Taruhan Ditepati"), ...lantai("lt", 164), ...rakKayu("rk", 110, 40, 150, 112, 3)),
      tambah("Raka", ...tokoh("rk", 50, 184, "Raka")),
      tambah("mengelap", emo("lp", 88, 128, E.lap, 24)),
      tambah("mengilap.", emo("k1", 140, 72, E.kilau, 20), emo("k2", 200, 112, E.kilau, 20), emo("k3", 240, 76, E.kilau, 18)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Pengumuman Toko"), ...lantai("lt", 164), kotak("pt", 110, 44, 90, 120, "#B7814A", "#6B4423", { rx: 3, tebal: 2, z: 0 })),
      tambah("Pak", ...tokoh("pj", 60, 184, "Pak Joko")),
      tambah("besok", ...papan("pg", 118, 60, 74, 36, "HARI JADI TOKO", "#FEF9C3", 7)),
      tambah("pelanggan", emo("pl", 240, 150, E.senyum, 26)),
      tambah("bingkisan.", emo("g1", 232, 100, "\u{1F381}", 26), emo("g2", 262, 110, "\u{1F381}", 22)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Sampai Jumpa!"), ...lantai("lt", 164)),
      tambah("dua", teks("t20", 150, 52, "20 telur", 16, W.merah)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => kotak(`eb${i}`, 22 + i * 68, 70, 52, 30, W.krem, W.coklat, { rx: 4, tebal: 1.6 })), teks("n4", 150, 124, "4 kotak", 10, W.ungu)),
      tambah("berapa?", ...[0, 1, 2, 3].map((i) => teks(`q${i}`, 48 + i * 68, 91, "?", 18, W.merah))),
      tambah("Raka,", ...tokoh("rk", 34, 184, "Raka")),
      tambah("Bima,", ...tokoh("sl", 92, 184, "Salsa"), ...tokoh("bm", 150, 184, "Bima")),
      tambah("Pak", ...tokoh("pj", 208, 184, "Pak Joko")),
      tambah("Bu", ...tokoh("bu", 266, 184, "Bu Mirna")),
    ),
  ],
};
