import type { AdeganStory } from "./logika-story";
import { E, PAPAN_100, PAPAN_50, PRIMA_100, PRIMA_50, W, bilanganPapan, bingkaiPapan, cincinPapan, emo, idBilanganPapan, judul, kartu, kelipatanDari, kotak, lantai, panah, teks, tokoh, bulat } from "./k5b2e-gambar";
import { bersih, hapus, k, pudarkan, tambah, ubah } from "./k5b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Bilangan Kak Lintang" (Kelas 5 Bab 2 Sub-Bab E), akhir cerita Pasar Kuliner Malam.
 * Video kedua: tiga metode global (Sieve It, Factor Tree, Divide Down), terpisah dari video materi.
 * Naskah suara dari naskah/story-naskah-k5b2e.md. Bagian ini: pembuka di papan Kak Lintang dan Sieve It (konsep dan terapan Citra).
 */

/** Nama tiga metode global (Inggris) dan nama Indonesianya; dipakai juga oleh uji Story. */
export const NAMA_METODE = ["Sieve It", "Factor Tree", "Divide Down"];
export const NAMA_METODE_ID = ["Saring", "Pohon Faktor", "Bagi Berulang"];
const X_KARTU = [8, 107, 206];

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_PEMBUKA1 = "Di papan Kak Lintang, bilangan prima menunggu ditemukan, dan KPK serta FPB menunggu dihitung.";
const SUARA_PEMBUKA2 = "Ada tiga cara supaya bilangan prima dan faktorisasinya tidak keliru.";
const SUARA_PEMBUKA3 = "Tiga cara itu: Sieve It, Factor Tree, dan Divide Down.";
const SUARA_PEMBUKA4 = "Nama dalam bahasa Indonesia: Saring, Pohon Faktor, dan Bagi Berulang.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Papan Kak Lintang menunggu",
  sumber: "Metode global: pembuka di pasar malam",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_PEMBUKA1,
      tambah(0, judul("Menunggu di Papan"), ...lantai("lt", 156)),
      tambah("papan", kotak("pb", 14, 40, 150, 100, W.papan, W.kayuTua, { rx: 4, tebal: 2.4 }), teks("pb-t", 89, 104, "?", 44, W.ungu)),
      tambah("Lintang", ...tokoh("kl", 258, 184, "Kak Lintang")),
      tambah("prima", ...kartu("q1", 184, 44, 100, 26, "#DCFCE7", ["prima ?"], 10)),
      tambah("KPK", ...kartu("q2", 184, 76, 100, 26, "#DBEAFE", ["KPK ?"], 10)),
      tambah("FPB", ...kartu("q3", 184, 108, 100, 26, "#FEF9C3", ["FPB ?"], 10)),
    ),
    k(
      SUARA_PEMBUKA2,
      bersih(0),
      tambah(0, judul("Tiga Cara"), ...lantai("lt", 156), ...tokoh("kl", 150, 184, "Kak Lintang")),
      tambah("tiga", ...X_KARTU.flatMap((x, i) => kartu(`c${i + 1}`, x, 40, 86, 64, "#E5E7EB", ["?"], 20))),
      tambah("keliru", teks("tc", 150, 128, "3 cara", 13, W.ungu), emo("ms", 150, 142, E.kilau, 14)),
    ),
    k(
      SUARA_PEMBUKA3,
      ubah("Sieve", { id: "c1-t0", isi: NAMA_METODE[0], u: 9 }, { id: "c1-k", warna: "#DCFCE7" }),
      ubah("Factor", { id: "c2-t0", isi: NAMA_METODE[1], u: 9 }, { id: "c2-k", warna: "#DBEAFE" }),
      ubah("Divide", { id: "c3-t0", isi: NAMA_METODE[2], u: 9 }, { id: "c3-k", warna: "#FEF9C3" }),
    ),
    k(
      SUARA_PEMBUKA4,
      hapus("Nama", "tc", "ms"),
      tambah("Saring", teks("c1-i", 51, 90, NAMA_METODE_ID[0], 8.4, W.coklat)),
      tambah("Pohon", teks("c2-i", 150, 90, NAMA_METODE_ID[1], 8.4, W.coklat)),
      tambah("Bagi", teks("c3-i", 249, 90, NAMA_METODE_ID[2], 8.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ Sieve It: konsep ------------------------------ */
const SUARA_SARING1 = "Cara pertama, Sieve It, atau Saring.";
const SUARA_SARING2 = "Kita menulis bilangan satu sampai seratus, lalu menghapus satu.";
const SUARA_SARING3 = "Kita mengambil bilangan prima berikutnya, lalu menghapus semua kelipatannya yang lebih besar.";
const SUARA_SARING4 = "Kita mengulang sampai tidak ada yang bisa dihapus, dan sisanya adalah bilangan prima.";

const KELIPATAN_2 = kelipatanDari(2, 100);
const KELIPATAN_357 = [...new Set([3, 5, 7].flatMap((p) => kelipatanDari(p, 100)))].filter((n) => n % 2 !== 0).sort((a, b) => a - b);
export const ADEGAN_LUAR_SARING: AdeganStory = {
  id: "luar-saring",
  judul: "Cara pertama: saring",
  sumber: "Metode global: Sieve It, konsep",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_SARING1,
      tambah(0, judul("Sieve It"), ...lantai("lt", 156), ...tokoh("kl", 262, 184, "Kak Lintang")),
      tambah("pertama", emo("tg", 40, 74, E.mata, 26), teks("n1", 40, 96, "cara 1", 9, W.coklat)),
      tambah("Sieve", ...kartu("m", 70, 44, 190, 64, "#DBEAFE", [NAMA_METODE[0], NAMA_METODE_ID[0]], 12)),
      tambah("Saring", emo("sa", 150, 130, E.kilau, 16)),
    ),
    k(
      SUARA_SARING2,
      bersih(0),
      tambah(0, judul("Tulis Satu Sampai Seratus"), ...lantai("lt", 156)),
      tambah("bilangan", bingkaiPapan("pp", 100, PAPAN_100), ...bilanganPapan("pp", 100, PAPAN_100), ...tokoh("kl", 256, 140, "Kak Lintang")),
      tambah("seratus", teks("lb", 256, 70, "1 - 100", 9, W.biru)),
      pudarkan("menghapus", "pp-n1"),
    ),
    k(
      SUARA_SARING3,
      tambah("mengambil", cincinPapan("pp", 2, PAPAN_100)),
      tambah("berikutnya", teks("lp", 256, 86, "prima: 2", 10, W.hijauTua)),
      pudarkan("kelipatannya", ...idBilanganPapan("pp", KELIPATAN_2)),
      tambah("besar", teks("lc", 256, 100, "hapus 4, 6, 8", 8.4, W.merah)),
    ),
    k(
      SUARA_SARING4,
      tambah("mengulang", cincinPapan("pp", 3, PAPAN_100), cincinPapan("pp", 5, PAPAN_100), cincinPapan("pp", 7, PAPAN_100)),
      pudarkan("mengulang", ...idBilanganPapan("pp", KELIPATAN_357)),
      tambah("sisanya", ...PRIMA_100.filter((n) => n > 7).map((n) => cincinPapan("pp", n, PAPAN_100))),
      tambah("prima", teks("sp", 256, 86, "sisa: 25", 9, W.hijauTua)),
      hapus("sisanya", "lp", "lc"),
    ),
  ],
};

/* ------------------------------ Sieve It: terapan Citra ------------------------------ */
const SUARA_SARINGT1 = "Citra menyaring papan sampai lima puluh: yang tersisa dua, tiga, lima, tujuh, sebelas, sampai empat puluh tujuh.";
const SUARA_SARINGT2 = "Semua bilangan lain terhapus karena punya faktor lebih dari dua.";
const SUARA_SARINGT3 = "Cocok untuk mencari banyak bilangan prima sekaligus, karena semuanya terlihat di papan.";
const SUARA_SARINGT4 = "Kurang cocok untuk memeriksa satu bilangan besar, karena papan harus ditulis sampai bilangan itu.";

const BUKAN_PRIMA_50 = Array.from({ length: 50 }, (_, i) => i + 1).filter((n) => !PRIMA_50.includes(n));
export const ADEGAN_LUAR_SARING_TERAPAN: AdeganStory = {
  id: "luar-saring-terapan",
  judul: "Citra menyaring papan lima puluh",
  sumber: "Metode global: Sieve It, terapan Citra",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_SARINGT1,
      tambah(0, judul("Citra Menyaring Papan"), ...lantai("lt", 166)),
      tambah("Citra", ...tokoh("ci", 262, 150, "Citra")),
      tambah("papan", bingkaiPapan("pp", 50, PAPAN_50), ...bilanganPapan("pp", 50, PAPAN_50, 10)),
      pudarkan("tersisa", ...idBilanganPapan("pp", BUKAN_PRIMA_50)),
      tambah("dua,", cincinPapan("pp", 2, PAPAN_50, W.hijauMuda, 8.4)),
      tambah("tiga,", cincinPapan("pp", 3, PAPAN_50, W.hijauMuda, 8.4)),
      tambah(10, cincinPapan("pp", 5, PAPAN_50, W.hijauMuda, 8.4)),
      tambah("tujuh,", cincinPapan("pp", 7, PAPAN_50, W.hijauMuda, 8.4)),
      tambah("sebelas,", ...PRIMA_50.filter((n) => n >= 11).map((n) => cincinPapan("pp", n, PAPAN_50, W.hijauMuda, 8.4))),
    ),
    k(
      SUARA_SARINGT2,
      tambah("terhapus", teks("th", 262, 68, "terhapus", 9, W.merah)),
      tambah("faktor", ...kartu("c1", 14, 138, 100, 24, "#FEE2E2", ["21 = 3 × 7"], 10)),
      tambah("lebih", ...kartu("c2", 124, 138, 100, 24, "#FEE2E2", ["49 = 7 × 7"], 10)),
      tambah("dua", teks("kt", 118, 178, "lebih dari 2 faktor", 10, W.merah)),
    ),
    k(
      SUARA_SARINGT3,
      tambah("Cocok", emo("ok", 262, 52, E.benar, 18), teks("lb", 262, 86, "cocok", 12, W.hijauTua)),
      tambah("banyak", teks("bn", 262, 100, "15 prima", 10, W.hijauTua)),
      ubah("semuanya", ...PRIMA_50.map((n) => ({ id: `pp-r${n}`, warna: W.emas }))),
    ),
    k(
      SUARA_SARINGT4,
      bersih(0),
      tambah(0, judul("Satu Bilangan Besar"), ...lantai("lt", 156), ...tokoh("ci", 262, 184, "Citra")),
      tambah("Kurang", emo("x1", 150, 56, E.salah, 22), teks("kc", 150, 78, "kurang cocok", 12, W.merah)),
      tambah("besar", ...kartu("bb", 14, 92, 110, 30, "#FEF9C3", ["bilangan besar?"], 10)),
      tambah("papan", ...[0, 1, 2, 3, 4].map((i) => kotak(`bx${i}`, 20 + i * 30, 138, 26, 18, W.papan, W.kayuTua, { rx: 2, tebal: 1.4 })), teks("bt", 190, 151, "...", 14, W.biru)),
      tambah("sampai", panah("pn", 140, 108, 100, 0, W.merah, 2), bulat("bq", 252, 108, 16, "#FEE2E2", W.merah), teks("bq-t", 252, 113, "?", 16, W.merah)),
    ),
  ],
};
