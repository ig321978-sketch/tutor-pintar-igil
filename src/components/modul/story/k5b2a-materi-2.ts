import type { AdeganStory } from "./logika-story";
import { E, W, deret, emo, garis, idDeret, idSel, judul, kotak, panah, tabelBil, tanah, teks, tokoh } from "./k5b2a-gambar";
import { bersih, hapus, idx, k, tambah, ubah, warnai } from "./k5b2a-bantu";

/*
 * Cerita orisinal IGIL "Lonceng Bu Marni" (Kelas 5 Bab 2 Sub-Bab A), awal cerita Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2a.md. Bagian ini: salah langkah Fajar (tepuk empat belas karena ada angka empat, taruhan membunyikan lonceng sepanjang malam),
 * memeriksa dengan pembagian (empat belas dibagi empat bersisa dua), dan tabel bilangan satu sampai lima puluh dengan kelipatan empat diwarnai.
 */

/* ------------------------------ 4. Tepuk bilangan: salah langkah dan taruhan ------------------------------ */
const SUARA_T1 = "Fajar mengajak bermain tepuk bilangan: kelipatan empat ditepuk, yang lain disebut.";
const SUARA_T2 = "Saat sampai empat belas, Fajar bertepuk lantang karena ada angka empatnya.";
const SUARA_T3 = "Kalau aku salah, aku membunyikan lonceng sepanjang malam, katanya sambil menepuk dada.";

export const ADEGAN_TEPUK: AdeganStory = {
  id: "tepuk",
  judul: "Tepuk Bilangan",
  sumber: "Materi: tepuk bilangan kelipatan",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tepuk Bilangan"), ...tanah("tn", 150)),
      tambah("Fajar", ...tokoh("fj", 40, 184, "Fajar")),
      tambah("tepuk", ...deret("tb", [1, 2, 3, 4, 5, 6, 7, 8], 20, 66, 32, 28, 24, W.putih, 13)),
      warnai(idx(SUARA_T1, "empat"), W.jingga, "tb3-k", "tb7-k"),
      tambah(idx(SUARA_T1, "empat"), emo("tp1", 142, 60, E.tepuk, 18), emo("tp2", 270, 60, E.tepuk, 18)),
      tambah("lain", teks("sb", 150, 114, "bilangan lain: disebut", 10, W.hijauTua)),
    ),
    k(
      SUARA_T2,
      hapus(0, ...idDeret("tb", 8), "tp1", "tp2", "sb"),
      tambah(0, ...deret("tc", [13, 15], 100, 66, 92, 40, 28, W.putih, 15)),
      tambah("empat", ...deret("td", [14], 146, 66, 0, 40, 28, W.jingga, 15)),
      tambah("bertepuk", emo("tf", 40, 140, E.tepuk, 22), teks("tpk", 80, 140, "Tepuk!", 11, W.merah)),
      tambah("angka", panah("pa", 166, 112, 0, -14, W.merah, 1.8), teks("ag", 166, 124, "ada angka 4", 10, W.merah)),
    ),
    k(
      SUARA_T3,
      hapus(0, ...idDeret("tc", 2), ...idDeret("td", 1), "tf", "tpk", "pa", "ag"),
      tambah("Kalau", kotak("bb", 70, 34, 170, 46, W.putih, W.merah, { rx: 8, tebal: 1.8, z: 1 }), teks("bt1", 155, 53, "Taruhan Fajar:", 10, W.merah, { z: 3 }), teks("bt2", 155, 69, "lonceng sepanjang malam", 10, W.biru, { z: 3 })),
      tambah("lonceng", emo("lc", 262, 100, E.lonceng, 34)),
      tambah("malam,", emo("bn", 262, 60, E.bulan, 22)),
      tambah("menepuk", emo("kt", 110, 120, E.kuat, 22)),
    ),
  ],
};

/* ------------------------------ 5. Memeriksa dengan pembagian ------------------------------ */
const SUARA_P1 = "Bima membagi empat belas dengan empat: hasilnya tiga, tetapi masih bersisa dua.";
const SUARA_P2 = "Bilangan yang tidak habis dibagi bukan kelipatan, dan angka empat di dalamnya tidak menentukan apa pun.";
const SUARA_P3 = "Fajar membunyikan lonceng sampai pengunjung menutup telinga, dan Pak Arif ikut menutup telinga sambil tertawa.";
/** Pita empat belas satuan: tiga potongan penuh empat satuan dan sisa dua satuan. */
const SATUAN_PITA = 260 / 14;
const potongan = [0, 1, 2].map((i) => ({ id: `pb${i}`, x: Math.round((20 + i * 4 * SATUAN_PITA) * 10) / 10, w: Math.round(4 * SATUAN_PITA * 10) / 10 }));
const XSISA = Math.round((20 + 12 * SATUAN_PITA) * 10) / 10;
const WSISA = Math.round(2 * SATUAN_PITA * 10) / 10;
const idPita = ["pb", ...potongan.flatMap((p) => [p.id, `${p.id}t`]), "pb3", "pb3t", "n14", "n3", "sis"];

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Periksa dengan Bagi",
  sumber: "Materi: memeriksa dengan pembagian",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Periksa dengan Bagi"), ...tanah("tn", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("membagi", kotak("pb", 20, 70, 260, 28, W.putih, W.coklat, { rx: 3, tebal: 1.8, z: 0 }), teks("n14", 150, 56, "14", 15, W.biru)),
      tambah("dengan", ...potongan.flatMap((p) => [kotak(p.id, p.x, 70, p.w, 28, W.jingga, W.coklat, { rx: 3, tebal: 1.4, z: 1 }), teks(`${p.id}t`, Math.round((p.x + p.w / 2) * 10) / 10, 89, "4", 14, W.biru, { z: 3 })])),
      tambah("tiga,", teks("n3", 150, 122, "3 potong", 11, W.hijauTua)),
      tambah("bersisa", kotak("pb3", XSISA, 70, WSISA, 28, W.merahMuda, W.merah, { rx: 3, tebal: 1.6, putus: true, z: 1 }), teks("pb3t", Math.round((XSISA + WSISA / 2) * 10) / 10, 89, "2", 14, W.merah, { z: 3 }), teks("sis", 261, 114, "sisa", 9, W.merah)),
    ),
    k(
      SUARA_P2,
      hapus(0, ...idPita),
      tambah("Bilangan", teks("b14", 110, 96, "14", 34, W.biru)),
      tambah("tidak", emo("xx", 176, 88, E.salah, 28)),
      tambah("bukan", teks("bkl", 150, 124, "bukan kelipatan 4", 12, W.merah)),
      tambah("angka", garis("gu", 118, 102, 18, 0, W.merah, 2.4), teks("ag", 150, 142, "angka 4 tidak menentukan", 9.5, W.coklat)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Periksa dengan Bagi"), ...tanah("tn", 150)),
      tambah("Fajar", ...tokoh("fj", 50, 184, "Fajar")),
      tambah("lonceng", emo("lc", 118, 100, E.lonceng, 34), teks("dn", 118, 52, "DING!", 12, W.merah)),
      tambah("pengunjung", emo("tl1", 232, 88, E.telinga, 24), emo("tl2", 266, 116, E.telinga, 24)),
      tambah("Pak", ...tokoh("pa", 200, 184, "Pak Arif")),
      tambah("tertawa.", emo("tw", 200, 144, E.tertawa, 22)),
    ),
  ],
};

/* ------------------------------ 6. Tabel bilangan satu sampai lima puluh ------------------------------ */
const SUARA_B1 = "Bu Marni menempel tabel bilangan satu sampai lima puluh di papan.";
const SUARA_B2 = "Citra mewarnai kelipatan empat: empat, delapan, dua belas, terus sampai empat puluh delapan.";
const SUARA_B3 = "Hasilnya dua belas bilangan berwarna, dan tidak satu pun tertinggal.";
const LANJUTAN_4 = [16, 20, 24, 28, 32, 36, 40, 44];

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel",
  judul: "Tabel Bilangan",
  sumber: "Materi: tabel bilangan satu sampai lima puluh",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tabel Bilangan"), ...tanah("tn", 150)),
      tambah("Marni", ...tokoh("bu", 40, 184, "Bu Marni")),
      tambah("tabel", kotak("pn", 12, 22, 276, 116, "#A16207", W.papan, { rx: 5, tebal: 2, z: -1 })),
      tambah("bilangan", ...tabelBil("tb", 50)),
      tambah("papan.", teks("sd", 190, 150, "1 sampai 50", 10, W.coklat)),
    ),
    k(
      SUARA_B2,
      hapus(0, "sd"),
      tambah("Citra", ...tokoh("ct", 110, 184, "Citra")),
      tambah("kelipatan", teks("lw", 190, 150, "kelipatan 4", 10, W.merah)),
      warnai(idx(SUARA_B2, "empat", 2), W.jingga, ...idSel("tb", 4)),
      warnai(idx(SUARA_B2, "delapan", 1), W.jingga, ...idSel("tb", 8)),
      warnai(idx(SUARA_B2, "dua"), W.jingga, ...idSel("tb", 12)),
      warnai("terus", W.jingga, ...idSel("tb", ...LANJUTAN_4)),
      warnai(idx(SUARA_B2, "delapan", 2), W.jingga, ...idSel("tb", 48)),
    ),
    k(
      SUARA_B3,
      ubah("dua", { id: "lw", isi: "12 bilangan berwarna" }),
      tambah("tertinggal.", emo("ok", 262, 150, E.benar, 18)),
    ),
  ],
};
