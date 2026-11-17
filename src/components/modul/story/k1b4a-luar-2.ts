import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, karet, kantong, karton, kartu, label, orang, paku, papanPaku, poligon, segiEmpatRel, segitigaRel, semuaSisi, semuaSudut, sisiKe, sudutMutlak, teks, tutupKaleng, WARNA_BAHAN } from "./k1b4a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b4a-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b4a-luar-1";

/* Video metode global Sub-Bab A: Geoboard (Papan Paku), Mystery Shape (Bentuk Misterius), dan ringkasan. */

const idPaku = (...cr: [number, number][]): string[] => cr.map(([c, r]) => `ppp${c}${r}`);

/* ------------------------------ 4. Geoboard: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Geoboard, atau Papan Paku. Papan ini punya paku yang berbaris rapi.";
const SUARA_C2 = "Kita kaitkan karet gelang pada beberapa paku. Karet membentuk sisi lurus di antara paku.";
const SUARA_C3 = "Paku tempat karet berbelok menjadi sudut. Banyak paku belokan sama dengan banyak sudut.";
const SUARA_C4 = "Jadi kita bisa membuat bentuk dan langsung menghitung sisi lurus serta sudutnya.";
const SUARA_C5 = "Papan paku cocok untuk membuat bentuk sendiri, tetapi karet tidak bisa membuat bentuk lengkung.";
const TRI = [paku(1, 0), paku(3, 3), paku(0, 3)];

export const ADEGAN_LUAR_PAKU: AdeganStory = {
  id: "luar-paku",
  judul: "Geoboard: papan paku",
  sumber: "Metode global: Geoboard",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah("Papan@2", ...papanPaku("pp")),
      sorotkan("berbaris", ...idPaku([0, 0], [1, 0], [2, 0], [3, 0], [4, 0])),
    ),
    k(
      SUARA_C2,
      tambah("karet", karet("kr", TRI, W.merah)),
      tambah("sisi", ...semuaSisi("kr", TRI, W.emas), teks("ls", 262, 100, "sisi lurus", 9, W.merah)),
    ),
    k(
      SUARA_C3,
      tambah("berbelok", ...semuaSudut("kr", TRI)),
      tambah("sudut.", teks("su", 262, 120, "sudut", 9, W.hijau)),
      tambah("Banyak", teks("bk", 262, 146, "3 paku", 9, W.coklat)),
      tambah("sudut.@2", teks("bk2", 262, 162, "3 sudut", 9, W.hijau)),
    ),
    k(
      SUARA_C4,
      ubah("membuat", { id: "kr", garis: W.hijau }),
      tambah("menghitung", ...kartu("hc", 40, 177, 220, 20, W.langit, ["buat bentuk, hitung sisi dan sudut"], 9)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("cocok", emo("bc", 40, 84, "👍", 26), ...kartu("bk", 64, 66, 222, 38, W.hijauMuda, ["cocok: membuat bentuk sendiri"], 9.4)),
      tambah("tetapi", emo("bt", 40, 142, "🚫", 26), ...kartu("bl", 64, 124, 222, 38, W.merahMuda, ["tidak bisa: bentuk lengkung"], 9.4)),
    ),
  ],
};

/* ------------------------------ 5. Geoboard: terapan ------------------------------ */
const SUARA_D1 = "Abang mengaitkan karet merah pada tiga paku. Jadilah segitiga, dengan tiga sudut di tiga paku itu.";
const SUARA_D2 = "Abang menghitung sisi lurusnya. Satu, dua, tiga. Tiga sisi lurus, tiga sudut.";
const SUARA_D3 = "Lalu Abang memasang karet biru pada empat paku. Jadilah segi empat.";
const SUARA_D4 = "Sisi lurusnya satu, dua, tiga, empat. Sudutnya juga empat, di empat paku belokan.";
const TRI2 = [paku(2, 0), paku(4, 3), paku(0, 3)];
const REC = [paku(1, 0), paku(4, 0), paku(4, 2), paku(1, 2)];
const posD2 = urutKata(SUARA_D2, ["satu,", "dua,", "tiga."], "lurusnya.");
const posD4 = urutKata(SUARA_D4, ["satu,", "dua,", "tiga,", "empat."], "lurusnya");

export const ADEGAN_LUAR_PAKU_TERAPAN: AdeganStory = {
  id: "luar-paku-terapan",
  judul: "Geoboard: karet Abang",
  sumber: "Metode global: Geoboard, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1), ...papanPaku("pp"), ...orang("ab", 264, 96, E.abang, "Abang")),
      tambah("karet", karet("kr", TRI2, W.merah)),
      sorotkan("tiga", ...idPaku([2, 0], [4, 3], [0, 3])),
      tambah("segitiga,", teks("nm", 264, 134, "segitiga", 9, W.biru)),
      tambah("sudut", ...semuaSudut("kr", TRI2), teks("su", 264, 152, "3 sudut", 9, W.hijau)),
    ),
    k(SUARA_D2, ...posD2.map((p, i) => tambah(p, ...sisiKe("kr", TRI2, i))), tambah("Tiga@2", teks("ls", 264, 170, "3 sisi lurus", 9, W.merah))),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, ...kepala(1), ...papanPaku("pp"), ...orang("ab", 264, 96, E.abang, "Abang")),
      tambah("karet", karet("kb", REC, "#2563EB")),
      sorotkan("empat", ...idPaku([1, 0], [4, 0], [4, 2], [1, 2])),
      tambah("paku.", teks("p4", 264, 134, "4 paku", 9, W.coklat)),
      tambah("segi", teks("nm", 264, 152, "segi empat", 9, W.biru)),
    ),
    k(
      SUARA_D4,
      ...posD4.map((p, i) => tambah(p, ...sisiKe("kb", REC, i))),
      tambah("Sudutnya", ...semuaSudut("kb", REC), teks("su", 264, 170, "4 sudut", 9, W.hijau)),
      sorotkan("belokan.", "kb"),
    ),
  ],
};

/* ------------------------------ 6. Mystery Shape: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Mystery Shape, atau Bentuk Misterius. Sebuah bentuk disembunyikan di dalam kantong.";
const SUARA_E2 = "Kita tidak melihatnya. Kita hanya mendengar petunjuk tentang sisi lurus dan sudutnya.";
const SUARA_E3 = "Dari petunjuk itu, kita menebak nama bentuknya. Lalu bentuk dikeluarkan untuk diperiksa.";
const SUARA_E4 = "Petunjuk tentang sisi lurus dan sudut lebih penting daripada warna atau ukuran.";
const SUARA_E5 = "Bentuk misterius cocok untuk melatih berpikir dari petunjuk, tetapi lebih lama daripada melihat langsung.";
const KELUAR = sudutMutlak(240, 112, segitigaRel(18));

export const ADEGAN_LUAR_MISTERI: AdeganStory = {
  id: "luar-misteri",
  judul: "Mystery Shape: bentuk misterius",
  sumber: "Metode global: Mystery Shape",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga,", ...kepala(2)),
      tambah("disembunyikan", karton("hd", 150, 104, 18)),
      tambah("kantong.", ...kantong("kt", 150, 110)),
      hapus("kantong.", "hd"),
    ),
    k(
      SUARA_E2,
      tambah("melihatnya.", teks("tl", 240, 100, "tidak terlihat", 8.4, W.ungu)),
      tambah("mendengar", emo("tg", 56, 116, E.telinga, 30)),
      tambah("petunjuk", ...kartu("pt", 40, 150, 220, 30, W.putih, ["petunjuk: sisi lurus? sudut?"], 9.4)),
    ),
    k(
      SUARA_E3,
      hapus(0, "tl"),
      tambah("menebak", teks("tb", 150, 194, "tebak nama bentuknya", 9, W.merah)),
      tambah("dikeluarkan", karton("hd", 240, 112, 18)),
      tambah("diperiksa.", ...semuaSudut("hd", KELUAR), emo("ok", 272, 82, E.benar, 14)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("sisi", ...label("c0", 30, 64, 240, "sisi lurus dan sudut", W.emas, 10)),
      sorotkan("penting", "c0-k"),
      tambah("penting", teks("pn", 150, 104, "penting", 10, W.merah)),
      tambah("warna", ...label("c1", 30, 130, 110, "warna", W.abu)),
      tambah("ukuran.", ...label("c2", 160, 130, 110, "ukuran", W.abu), teks("tp", 150, 176, "warna dan ukuran tidak penting", 9, W.ungu)),
    ),
    k(
      SUARA_E5,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("cocok", emo("bc", 40, 84, "👍", 26), ...kartu("bk", 64, 66, 222, 38, W.hijauMuda, ["cocok: berpikir dari petunjuk"], 9.4)),
      tambah("tetapi", emo("bt", 40, 142, "⏳", 26), ...kartu("bl", 64, 124, 222, 38, W.merahMuda, ["lebih lama dari melihat"], 9.4)),
    ),
  ],
};

/* ------------------------------ 7. Mystery Shape: terapan ------------------------------ */
const SUARA_F1 = "Kaka menyembunyikan sebuah bentuk di kantong. Petunjuknya: aku punya empat sisi lurus dan empat sudut.";
const SUARA_F2 = "Igil berpikir. Bentuk lengkung tidak punya sudut. Segitiga hanya punya tiga sudut.";
const SUARA_F3 = "Jadi tebakan Igil, segi empat! Kaka mengeluarkan bentuknya. Benar, sebuah segi empat.";
const SUARA_F4 = "Petunjuk kedua: aku tidak punya sisi lurus dan bisa menggelinding. Igil menebak lengkung, dan benar!";
const KELUAR_SE = sudutMutlak(150, 66, segiEmpatRel(40, 24));

export const ADEGAN_LUAR_MISTERI_TERAPAN: AdeganStory = {
  id: "luar-misteri-terapan",
  judul: "Mystery Shape: kantong Kaka",
  sumber: "Metode global: Mystery Shape, terapan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2)),
      tambah("Kaka", ...orang("kk", 40, 120, E.kaka, "Kaka")),
      tambah("kantong.", ...kantong("kt", 150, 110)),
      tambah("Petunjuknya:", ...kartu("pt", 30, 152, 240, 26, W.putih, ["aku punya 4 sisi lurus dan 4 sudut"], 9.6)),
      sorotkan("sudut.", "pt-k"),
    ),
    k(
      SUARA_F2,
      tambah("Igil", ...orang("ig", 262, 120, E.igil, "Igil")),
      tambah("lengkung", ...tutupKaleng("c0", 216, 70, 12)),
      tambah("sudut.", emo("x0", 216, 76, E.salah, 14)),
      tambah("Segitiga", karton("c1", 260, 72, 12)),
      tambah("tiga@2", teks("s3", 260, 98, "3 sudut", 8.4, W.hijau)),
      tambah("sudut.@2", emo("x1", 260, 78, E.salah, 14)),
    ),
    k(
      SUARA_F3,
      hapus(0, "c0", "c0-d", "x0", "c1", "s3", "x1"),
      tambah("segi", ...kartu("tb", 196, 56, 96, 22, W.emas, ["segi empat?"], 9)),
      tambah("mengeluarkan", poligon("hd", 150, 66, segiEmpatRel(40, 24), WARNA_BAHAN.kardus)),
      tambah("Benar,", emo("ok", 98, 70, E.benar, 16), ...semuaSudut("hd", KELUAR_SE)),
    ),
    k(
      SUARA_F4,
      hapus(0, "hd", "hd-s0", "hd-s1", "hd-s2", "hd-s3", "ok"),
      ubah("Petunjuk", { id: "pt-t0", isi: "aku tanpa sisi lurus, bisa menggelinding", u: 8.6 }),
      ubah("lengkung,", { id: "tb-t0", isi: "lengkung?" }),
      tambah("benar!", ...tutupKaleng("hc", 150, 66, 14), emo("ok", 98, 70, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Tiga metode, tiga kegunaan. Pilih yang paling cocok dengan keadaanmu saat menyiapkan festival.";
const SUARA_Z2 = "Kalau bendanya banyak di sekitar dan terlihat jelas, pakai Shape Hunt.";
const SUARA_Z3 = "Kalau ingin membuat dan memeriksa bentuk sendiri, pakai Geoboard.";
const SUARA_Z4 = "Kalau bendanya tersembunyi dan hanya ada petunjuk, pakai Mystery Shape.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan")),
      tambah("Tiga", emo("rk", 150, 96, E.bintang, 44), ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10)),
      tambah("festival.", ...tutupKaleng("f0", 90, 172, 12), karton("f1", 150, 176, 14), poligon("f2", 210, 172, segiEmpatRel(28, 20), WARNA_BAHAN.kardus)),
    ),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Shape", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], [NAMA_METODE[0], "benda banyak dan terlihat jelas"], 9.4))),
    k(SUARA_Z3, tambah("Geoboard.", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], [NAMA_METODE[1], "membuat dan memeriksa bentuk sendiri"], 9.4))),
    k(SUARA_Z4, tambah("Mystery", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], [NAMA_METODE[2], "benda tersembunyi, hanya petunjuk"], 9.4))),
  ],
};
