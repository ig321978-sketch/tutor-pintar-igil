import type { AdeganStory, Obj } from "./logika-story";
import { E, W, busur, emo, garisLompat, geserIkanLompat, ikan, ikanLompat, judul, kartu, orang, rentang, teks } from "./k1b5b-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5b-bantu";

/* Video metode global Sub-Bab B "Rak Akuarium Bernomor": pembuka dan Number Line Hop (Lompat di Garis Bilangan). */

export const NAMA_METODE = ["Number Line Hop", "Number Grid", "Before and After"];
export const NAMA_METODE_ID = ["Lompat di Garis Bilangan", "Kisi Bilangan", "Sebelum dan Sesudah"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

const KOKI = "#F59E0B";
const NEON = "#22D3EE";
/** Lompatan berurutan: tiap kata bilangan dalam `daftar` menggambar busur dari bilangan sebelumnya dan memindahkan ikan penanda `ik`. */
export const lompatan = (suara: string, daftar: number[], maju: boolean, awalan: string) =>
  urutBilangan(suara, daftar).flatMap((p, j) => {
    const n = daftar[j];
    return [tambah(p, busur(`${awalan}${n}`, maju ? n - 1 : n + 1, maju)), ubah(p, ...geserIkanLompat("ik", n)), sorotkan(p, `gl-a${n}`)];
  });

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Pak RT lewat dan memberi Abang sebuah poster berisi tiga cara melangkah di deret bilangan. Igil bertanya, mana yang paling cepat untuk maju dan mundur?";
const SUARA_O2 = "Tiga metode itu: Number Line Hop, Number Grid, dan Before and After.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Lompat di Garis Bilangan, Kisi Bilangan, dan Sebelum dan Sesudah.";
const SUARA_O4 = "Semua metode membantu kita melangkah satu demi satu, maju ke kanan atau mundur ke kiri.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk menghitung maju dan mundur",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global"), ...ikan("i0", 112, 76, KOKI, 1.1), ...ikan("i1", 150, 70, "#FB923C", 1.1), ...ikan("i2", 188, 76, NEON, 1.1)),
      tambah("Igil", ...orang("kk", 40, 120, E.igil, "Igil")),
      tambah("poster", emo("gl", 262, 110, E.bintang, 40)),
      tambah("mundur.", teks("mm", 150, 118, "maju dan mundur", 10, W.ungu)),
      tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(["Line", "Grid,", "Before"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Lompat", "Kisi", "Sebelum"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu langkah demi satu langkah"), ...garisLompat("gl"), ...ikanLompat("ik", 10, KOKI)),
      tambah("satu", teks("l1", 150, 70, "langkah 1", 10, W.biru)),
      tambah("kanan", busur("hm", 10, true), teks("km", 230, 168, "maju ke kanan", 9, W.merah)),
      tambah("kiri.", busur("hk", 10, false), teks("kr", 70, 168, "mundur ke kiri", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Number Line Hop: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Number Line Hop, atau Lompat di Garis Bilangan. Ada garis dengan bilangan berurutan, dari nol sampai dua puluh.";
const SUARA_A2 = "Letakkan ikan penanda di sepuluh. Lompat ke kanan satu langkah, bilangannya bertambah satu. Itu menghitung maju.";
const SUARA_A3 = "Dari sebelas, lompat ke kiri satu langkah, bilangannya berkurang satu. Kembali ke sepuluh. Itu menghitung mundur.";
const SUARA_A4 = "Tiap lompatan sama besar, jadi tidak ada bilangan yang terlewat. Ikan melompat dari sepuluh ke sebelas, dua belas, tiga belas.";

export const ADEGAN_LUAR_LOMPAT: AdeganStory = {
  id: "luar-lompat",
  judul: "Number Line Hop: lompat di garis bilangan",
  sumber: "Metode global: Number Line Hop",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah("garis", ...garisLompat("gl")),
      sorotkan("nol", "gl-a0"),
      sorotkan("puluh.", "gl-a20"),
      tambah("puluh.", teks("rt", 150, 170, "dari 0 sampai 20", 10, W.ungu)),
    ),
    k(
      SUARA_A2,
      hapus(0, "rt"),
      tambah("penanda", ...ikanLompat("ik", 10, KOKI)),
      sorotkan("sepuluh.", "gl-a10"),
      tambah("kanan", busur("h11", 10, true)),
      ubah("kanan", ...geserIkanLompat("ik", 11)),
      tambah("bertambah", teks("tm", 150, 166, "10, lalu 11", 10, W.merah)),
      tambah("maju.", teks("mj", 150, 184, "maju: bertambah 1", 9.4, W.merah)),
    ),
    k(
      SUARA_A3,
      hapus(0, "h11", "tm", "mj"),
      sorotkan("sebelas,", "gl-a11"),
      tambah("kiri", busur("h10", 11, false)),
      ubah("kiri", ...geserIkanLompat("ik", 10)),
      tambah("berkurang", teks("tm", 150, 166, "11, lalu 10", 10, W.ungu)),
      tambah("mundur.", teks("md", 150, 184, "mundur: berkurang 1", 9.4, W.ungu)),
    ),
    k(
      SUARA_A4,
      hapus(0, "h10", "tm", "md"),
      tambah("sama", teks("sb", 150, 70, "lompatan sama besar", 9.4, W.biru)),
      ...lompatan(SUARA_A4, [11, 12, 13], true, "h"),
      tambah("terlewat.", teks("tl", 150, 176, "tidak ada yang terlewat", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Number Line Hop: terapan pada pakan dan lampu ------------------------------ */
const SUARA_B1 = "Igil memberi pakan dari delapan sampai lima belas. Di garis bilangan, ikan penanda mulai di delapan.";
const SUARA_B2 = "Lompat maju: sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas. Ada tujuh lompatan.";
const SUARA_B3 = "Kaka memeriksa lampu mulai dua puluh. Lompat mundur: sembilan belas, delapan belas, tujuh belas, enam belas.";
const SUARA_B4 = "Lalu lima belas, empat belas, tiga belas, dua belas. Kaka berhenti di dua belas setelah delapan lompatan.";

export const ADEGAN_LUAR_LOMPAT_TERAPAN: AdeganStory = {
  id: "luar-lompat-terapan",
  judul: "Number Line Hop: pakan dan lampu",
  sumber: "Metode global: Number Line Hop, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0), ...garisLompat("gl")),
      tambah("Igil", ...orang("ig", 30, 182, E.igil, "Igil")),
      tambah("pakan", emo("pk", 66, 182, E.pakan, 18)),
      sorotkan("belas.", "gl-a15"),
      tambah("belas.", teks("rg", 150, 70, "dari 8 sampai 15", 10, W.merah)),
      tambah(idx(SUARA_B1, "delapan.", 1), ...ikanLompat("ik", 8, KOKI)),
      sorotkan(idx(SUARA_B1, "delapan.", 2), "gl-a8"),
    ),
    k(
      SUARA_B2,
      ...lompatan(SUARA_B2, rentang(9, 15), true, "h"),
      tambah("tujuh", teks("jl", 150, 168, "7 lompatan maju", 10, W.merah)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, ...kepala(0), ...garisLompat("gl")),
      tambah("Kaka", ...orang("kk", 270, 182, E.kaka, "Kaka")),
      tambah("lampu", emo("sn", 232, 182, E.senter, 18)),
      tambah("puluh.", ...ikanLompat("ik", 20, NEON), teks("rg", 150, 70, "mulai dari 20", 10, W.ungu)),
      sorotkan("puluh.", "gl-a20"),
      ...lompatan(SUARA_B3, rentang(19, 16), false, "m"),
    ),
    k(
      SUARA_B4,
      ...lompatan(SUARA_B4, rentang(15, 12), false, "m"),
      ubah("berhenti", { id: "rg", isi: "dari 20 sampai 12" }),
      tambah("delapan", teks("jl", 150, 168, "8 lompatan mundur", 10, W.ungu)),
    ),
  ],
};
