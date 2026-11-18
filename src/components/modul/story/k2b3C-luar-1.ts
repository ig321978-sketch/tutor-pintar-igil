import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WK, benda, campur, emo, idBenda, idTasKain, judul, kartu, kotak, lantai, panah, tasKain, teks, tokoh } from "./k2b3C-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b3C-bantu";

/* Video metode global Sub-Bab C "Gudang Mainan Pak Rudi": pembuka, Mystery Bag (Tas Misteri), dan terapannya. */

export const NAMA_METODE = ["Mystery Bag", "Face Printing", "Top and Side Views"];
export const NAMA_METODE_ID = ["Tas Misteri", "Cetak Permukaan", "Pandangan Atas dan Samping"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Amplop tua: badan `${id}` dan tutup segitiga `${id}-f`. Pojok kiri-atas (x, y). */
const amplop = (id: string, x: number, y: number, w: number, h: number, warna: string): Obj[] => [
  kotak(id, x, y, w, h, warna, W.biru, { rx: 2, tebal: 1.6 }),
  { id: `${id}-f`, t: "jalur", x, y, d: `M0 0 L${w / 2} ${h * 0.55} L${w} 0 Z`, warna: campur(warna, 0.4), garis: W.biru, tebal: 1.4, z: 1 },
];

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Sebelum pulang, Pak Rudi menyerahkan tiga amplop tua yang ia temukan di laci gudang.";
const SUARA_O2 = "Bu Sari membukanya. Ternyata isinya tiga cara mengenali benda dari penjaga gudang zaman dulu!";
const SUARA_O3 = "Tiga cara itu: Mystery Bag, Face Printing, dan Top and Side Views.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Tas Misteri, Cetak Permukaan, dan Pandangan Atas dan Samping.";

const KERTAS = ["#FDE68A", "#BAE6FD", "#FBCFE8"];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga amplop tua dari laci gudang",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Laci gudang"), lantai("lt", 150), kotak("lc", 196, 100, 90, 40, WK.kayu, WK.kayuTua, { rx: 3, tebal: 2 }), teks("lc-n", 241, 94, "laci gudang", 8.6, WK.kayuTua)),
      tambah("Rudi", ...tokoh("rd", 36, 172, "rudi")),
      tambah("menyerahkan", emo("tg", 70, 150, E.tangan, 18)),
      tambah("tiga", ...[0, 1, 2].flatMap((i) => amplop(`am${i}`, 90 + 34 * i, 108, 28, 20, KERTAS[i])), ...kartu("tg3", 100, 70, 96, 20, W.krem, ["3 amplop tua"], 9)),
      tambah("laci", emo("lcs", 241, 122, E.kaca, 18)),
    ),
    k(
      SUARA_O2,
      hapus("Bu", "tg", "lc", "lc-n", "lcs"),
      tambah("Sari", ...tokoh("sr", 272, 172, "sari")),
      ubah("membukanya.", { id: "am0", y: 96 }, { id: "am0-f", y: 96 }),
      tambah("tiga", ...kartu("cr", 60, 56, 180, 20, W.hijauMuda, ["3 cara mengenali benda"], 9.6)),
      tambah("zaman", emo("sc", 150, 168, "\u{1F4DC}", 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 cara mengenali benda")),
      tambah("Mystery", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Mystery Bag"], 11)),
      tambah("Face", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Face Printing"], 11)),
      tambah("Top", ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Top and Side Views"], 11)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      tambah("Tas", ...kartu("n0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Tas Misteri"], 11)),
      tambah("Cetak", ...kartu("n1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Cetak Permukaan"], 11)),
      tambah("Pandangan", ...kartu("n2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Pandangan Atas dan Samping"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Mystery Bag (Tas Misteri) ------------------------------ */
const SUARA_T1 = "Cara pertama, Mystery Bag, atau Tas Misteri.";
const SUARA_T2 = "Sebuah benda disembunyikan di dalam tas, dan kita hanya boleh meraba.";
const SUARA_T3 = "Rasakan permukaannya, rata atau melengkung, lalu sebutkan cirinya satu per satu.";
const SUARA_T4 = "Dari ciri-ciri itu, kita menyebut nama bangun ruangnya.";

export const ADEGAN_LUAR_TAS: AdeganStory = {
  id: "luar-tas",
  judul: "Mystery Bag: Tas Misteri",
  sumber: "Metode global: Mystery Bag, konsep",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0), lantai("lt", 150)),
      tambah("Mystery", teks("mb", 150, 74, "Mystery Bag", 15, W.hijau)),
      tambah("Tas", ...tasKain("ts", 150, 112, 56)),
      tambah("Misteri.", teks("tm", 150, 172, "Tas Misteri", 13, W.ungu)),
    ),
    k(
      SUARA_T2,
      hapus("Sebuah", "mb", "tm"),
      tambah("benda", ...benda("bn", "kubus", 150, 78, 30)),
      hapus("dalam", ...idBenda("bn", "kubus")),
      ubah("tas,", { id: "ts-q", op: 0.9 }),
      tambah("hanya", ...kartu("hm", 80, 160, 140, 20, W.krem, ["hanya boleh meraba"], 9.4)),
      tambah("meraba.", emo("rb", 150, 136, E.raba, 22)),
    ),
    k(
      SUARA_T3,
      hapus("Rasakan", "hm-k", "hm-t0"),
      ubah("Rasakan", { id: "ts", x: 54 }, { id: "ts-t", x: 26 }, { id: "ts-q", x: 54 }),
      ubah("Rasakan", { id: "rb", x: 54, y: 138 }),
      tambah("rata", ...kartu("r1", 124, 56, 164, 22, W.hijauMuda, ["permukaan rata"], 9.6)),
      tambah("melengkung,", ...kartu("r2", 124, 90, 164, 22, W.merahMuda, ["permukaan lengkung"], 9.6)),
      tambah("satu", teks("c1", 112, 71, "1", 12, W.merah)),
      tambah("satu@2", teks("c2", 112, 105, "2", 12, W.merah)),
    ),
    k(
      SUARA_T4,
      hapus("Dari", "rb", "c1", "c2"),
      tambah("ciri-ciri", panah("pn", 86, 112, 120, 134, W.merah)),
      tambah("nama", ...kartu("nm", 124, 124, 164, 22, W.krem, ["nama bangun ruang"], 9.6)),
      tambah("ruangnya.", emo("jm", 270, 168, E.jempol, 22)),
    ),
  ],
};

/* ------------------------------ 3. Terapan Mystery Bag ------------------------------ */
const SUARA_P1 = "Chacha meraba benda di dalam tas. Permukaannya rata, dan bentuknya persis sama di semua sisi.";
const SUARA_P2 = "Ia menyimpulkan benda itu kubus, dan ternyata benar, sebuah dadu.";
const SUARA_P3 = "Cocok kalau kita ingin melatih mengenali ciri lewat rasa.";
const SUARA_P4 = "Kurang cocok untuk benda yang mirip, karena kubus dan balok sulit dibedakan hanya dengan meraba.";

export const ADEGAN_LUAR_TAS_TERAPAN: AdeganStory = {
  id: "luar-tas-terapan",
  judul: "Chacha meraba tas misteri",
  sumber: "Metode global: Mystery Bag, terapan",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(0), lantai("lt", 150), ...tasKain("ts", 150, 108, 56)),
      tambah("Chacha", ...tokoh("ch", 40, 172, "chacha")),
      tambah("meraba", emo("rb", 150, 138, E.raba, 22)),
      tambah("rata,", ...kartu("rt", 20, 62, 80, 20, W.hijauMuda, ["rata"], 10)),
      tambah("sama", ...kartu("sm", 196, 62, 90, 36, W.krem, ["semua sisi", "sama"], 9)),
    ),
    k(
      SUARA_P2,
      hapus("Ia", "rt-k", "rt-t0", "sm-k", "sm-t0", "sm-t1"),
      tambah("menyimpulkan", emo("lm", 40, 136, E.lampu, 20)),
      tambah("kubus,", ...kartu("kb", 100, 60, 100, 22, W.krem, ["kubus?"], 11)),
      hapus("ternyata", ...idTasKain("ts"), "rb"),
      tambah("ternyata", ...benda("dd", "dadu", 150, 104, 50)),
      tambah("benar,", emo("jm", 220, 100, E.jempol, 24)),
      tambah("dadu.", teks("dn", 150, 150, "dadu", 12, W.coklat)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, ...kepala(0), lantai("lt", 150)),
      tambah("Cocok", ...kartu("ck", 70, 62, 160, 26, W.hijauMuda, ["cocok untuk rasa"], 11), emo("jm", 252, 72, E.jempol, 22)),
      tambah("ciri", ...tasKain("ts", 70, 118, 40), ...kartu("cr", 130, 104, 150, 22, W.krem, ["mengenali ciri"], 9.6)),
      tambah("rasa.", emo("rb", 70, 140, E.raba, 20)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, ...kepala(0), lantai("lt", 150)),
      tambah("Kurang", ...kartu("kr", 70, 56, 160, 26, W.merahMuda, ["kurang cocok"], 11)),
      tambah("kubus", ...benda("kk", "kubus", 80, 112, 46), teks("kkn", 80, 144, "kubus", 10, W.coklat)),
      tambah("balok", ...benda("bb", "balok", 220, 112, 66), teks("bbn", 220, 144, "balok", 10, W.coklat)),
      tambah("sulit", emo("tn", 150, 114, E.tanya, 24)),
      tambah("meraba.", emo("rb", 150, 168, E.raba, 22)),
    ),
  ],
};
