import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WT, Y_TANAH, balok, emo, judul, kartu, orang, panah, pohon, putus, rangka, tanah, teks } from "./k1b7A-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b7A-bantu";

/* Video metode global Sub-Bab A "Tiang dan Tangga": pembuka dan Direct Comparison (Banding Langsung). */

export const NAMA_METODE = ["Direct Comparison", "Indirect Comparison", "Seriation"];
export const NAMA_METODE_ID = ["Banding Langsung", "Banding dengan Perantara", "Menyusun Tangga"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Kakek Jaya menempelkan gambar di batang pohon jambu. Isinya tiga cara tukang membandingkan panjang.";
const SUARA_O2 = "Igil bertanya, cara mana yang paling pas untuk rumah pohon kita?";
const SUARA_O3 = "Tiga cara itu: Direct Comparison, Indirect Comparison, dan Seriation.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Banding Langsung, Banding dengan Perantara, dan Menyusun Tangga.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga cara tukang membandingkan panjang",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga cara tukang"), tanah("tn")),
      tambah("Kakek", ...orang("kj", 44, 176, E.kakek, "Kakek Jaya")),
      tambah("gambar", emo("kr", 226, 96, E.kertas, 26)),
      tambah("batang", ...pohon("pj", 262, Y_TANAH)),
      tambah("tiga", ...kartu("pk", 40, 60, 150, 34, W.emas, ["3 cara membandingkan"], 10)),
    ),
    k(
      SUARA_O2,
      tambah("Igil", ...orang("ig", 120, 176, E.igil, "Igil")),
      tambah("cara", ...kartu("bq", 70, 110, 120, 22, W.putih, ["cara mana yang pas?"], 9)),
      tambah("rumah", ...rangka("rp", 262, 96)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(idx(SUARA_O3, ["Direct", "Indirect", "Seriation"][i]), ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O4, ["Langsung", "Perantara", "Tangga"][i]), ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
  ],
};

/* ------------------------------ 2. Direct Comparison: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Direct Comparison, atau Banding Langsung. Dua benda diletakkan berdampingan.";
const SUARA_C2 = "Luruskan ujung kirinya di garis yang sama.";
const SUARA_C3 = "Lalu lihat ujung satunya. Benda yang melewati adalah yang lebih panjang.";
const SUARA_C4 = "Kalau ujung kanannya sejajar, kedua benda sama panjang.";

export const ADEGAN_LUAR_LANGSUNG: AdeganStory = {
  id: "luar-langsung",
  judul: "Direct Comparison: banding langsung",
  sumber: "Metode global: Direct Comparison",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("Direct", balok("ba", 60, 70, 140, WT.kuning)),
      tambah("Banding", balok("bb", 90, 100, 110, WT.hijau)),
      tambah("Dua", teks("dn", 246, 90, "2 benda", 12, W.biru)),
      tambah("berdampingan.", teks("bs", 150, 140, "berdampingan", 10, W.merah)),
    ),
    k(
      SUARA_C2,
      ubah("Luruskan", { id: "bb", x: 60 }),
      tambah("garis", putus("ga", 60, 58, 60, 122, W.merah, 2.2), teks("gt", 60, 138, "garis awal", 9, W.merah)),
      hapus("garis", "bs"),
    ),
    k(
      SUARA_C3,
      tambah("ujung", putus("gb", 170, 58, 170, 122, W.biru, 2)),
      tambah("melewati", balok("ek", 170, 70, 30, "#FCA5A5")),
      tambah("panjang.", ...kartu("kp", 40, 150, 220, 22, W.krem, ["yang melewati: lebih panjang"], 10)),
      sorotkan("melewati", "ek"),
    ),
    k(
      SUARA_C4,
      hapus(0, "ek", "kp-k", "kp-t0", "gb"),
      ubah("sejajar,", { id: "bb", w: 140 }),
      tambah("sejajar,", putus("gc", 200, 58, 200, 122, W.hijau, 2)),
      tambah("sama", ...kartu("sm", 70, 150, 160, 22, WT.kuning, ["sama panjang"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Direct Comparison: terapan ------------------------------ */
const SUARA_D1 = "Kaka meluruskan dua balok kecil di garis yang sama. Balok kuning melewati balok hijau, jadi kuning lebih panjang.";
const SUARA_D2 = "Tadi Igil mengira hijau lebih panjang, padahal ujung kirinya lebih maju. Setelah diluruskan, dia baru sadar.";
const SUARA_D3 = "Cara ini paling cepat kalau bendanya bisa digeser dan didekatkan.";
const SUARA_D4 = "Kurang cocok untuk benda yang tertanam di tanah, seperti pohon jambu di halaman.";

export const ADEGAN_LUAR_LANGSUNG_TERAPAN: AdeganStory = {
  id: "luar-langsung-terapan",
  judul: "Banding langsung: dua balok kecil",
  sumber: "Metode global: Direct Comparison, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("Kaka", ...orang("kk", 36, 176, E.kaka, "Kaka")),
      tambah("dua", teks("dn", 252, 84, "2 balok", 12, W.biru)),
      tambah("garis", putus("ga", 60, 58, 60, 124, W.merah, 2.2)),
      tambah("balok", balok("bk", 60, 70, 120, WT.kuning), balok("bh", 60, 100, 90, WT.hijau)),
      tambah("melewati", balok("ek", 150, 70, 30, "#FCA5A5")),
      tambah("panjang.", ...kartu("kl", 40, 140, 220, 22, W.krem, ["kuning lebih panjang"], 10)),
    ),
    k(
      SUARA_D2,
      hapus(0, "ek", "kl-k", "kl-t0", "ga", "kk", "kk-pita", "kk-n", "dn"),
      tambah("Igil", ...orang("ig", 36, 176, E.igil, "Igil")),
      ubah("mengira", { id: "bh", x: 100 }),
      tambah("mengira", teks("mg", 150, 140, "hijau tampak lebih panjang?", 9.4, W.merah)),
      tambah("maju,", panah("pm", 100, 128, 100, 118, W.merah, { tebal: 2.4 })),
      hapus("diluruskan,", "mg", "pm"),
      ubah("diluruskan,", { id: "bh", x: 60 }),
      tambah("diluruskan,", putus("gl", 60, 58, 60, 124, W.hijau, 2.2), teks("lu", 150, 140, "setelah lurus: kuning lebih panjang", 9.4, W.hijau)),
      tambah("sadar.", emo("sd", 260, 130, E.lampu, 26)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("bendanya", balok("ca", 40, 70, 90, WT.kuning), balok("cb", 170, 130, 90, WT.hijau)),
      ubah("digeser", { id: "cb", x: 40, y: 90 }),
      tambah("didekatkan.", teks("dk", 150, 62, "didekatkan", 9.4, W.merah)),
      tambah("paling", emo("kl", 232, 70, E.kilat, 26), ...kartu("pc", 90, 150, 120, 22, W.krem, ["paling cepat"], 10)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, ...kepala(0), tanah("tn", 160)),
      tambah("tertanam", ...pohon("pa", 90, 160)),
      tambah("pohon", ...pohon("pb", 210, 160)),
      tambah("Kurang", emo("sl", 150, 120, E.salah, 30), ...kartu("tk", 70, 170, 160, 20, W.pink, ["tidak bisa digeser"], 9.4)),
    ),
  ],
};
