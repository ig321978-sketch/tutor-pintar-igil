import type { AdeganStory } from "./logika-story";
import {
  BANYAK,
  E,
  JENIS,
  URUT_JENIS,
  W,
  WK,
  bayangan,
  emo,
  gs,
  idKotak,
  idTabelMendatar,
  idTabelMenurun,
  judul,
  kapur,
  kartu,
  kotakCerita,
  orang,
  panah,
  papan,
  selBaris,
  selKolom,
  tabelMendatar,
  tabelMenurun,
  teks,
  turus,
  type JenisKotak,
} from "./k1b8A-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k1b8A-bantu";

/*
 * Cerita orisinal IGIL "Kotak Cerita Berantakan" (Kelas 1 Bab 8 Sub-Bab A). Naskah suara dari naskah/story-naskah-k1b8a.md.
 * Bagian ini: turus di papan kapur, tabel (baris, kolom, menurun, mendatar), dan paling banyak, paling sedikit, sama banyak.
 */

const DATA = URUT_JENIS.map((j) => ({ nama: JENIS[j].nama, n: BANYAK[j] }));

/* ------------------------------ 4. Turus ------------------------------ */
const SUARA_T1 = "Abang menghitung kotak hewan dengan turus. Satu kotak, satu goresan.";
const SUARA_T2 = "Setiap lima goresan dicoret miring. Kotak hewan ada enam.";
const SUARA_T3 = "Laut empat, roket lima, bunga tiga. Abang menggambar semua goresan di papan kapur.";

const BARIS_Y = [56, 86, 116, 146];
const TURUS_X = 74;
const ANGKA_X = 176;

export const ADEGAN_TURUS: AdeganStory = {
  id: "turus",
  judul: "Turus: satu kotak, satu goresan",
  sumber: "Materi: turus, lima dicoret miring",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Turus di papan kapur"), papan("pk", 18, 28, 212, 156)),
      tambah("Abang", ...orang("ab", 262, 100, E.abang, "Abang")),
      tambah("kotak", ...URUT_JENIS.map((j, i) => emo(`lb${i}`, 44, BARIS_Y[i] + 14, JENIS[j].e, 17))),
      tambah("Satu", kapur("n0", ANGKA_X, BARIS_Y[0] + 14, "1", 13, { warna: WK.kapurKuning })),
      tambah("goresan.", ...turus("t0", TURUS_X, BARIS_Y[0], 1)),
    ),
    k(
      SUARA_T2,
      tambah("Setiap", ...turus("t0", TURUS_X, BARIS_Y[0], 4).slice(1)),
      tambah("lima", ...turus("t0", TURUS_X, BARIS_Y[0], 5).slice(4)),
      ubah("lima", { id: "n0", isi: "5" }),
      sorotkan("dicoret", "t04"),
      tambah("enam.", ...turus("t0", TURUS_X, BARIS_Y[0], 6).slice(5)),
      ubah("enam.", { id: "n0", isi: "6" }, { id: "t04", sorot: false }),
    ),
    k(
      SUARA_T3,
      tambah("empat,", ...turus("t1", TURUS_X, BARIS_Y[1], BANYAK.laut), kapur("n1", ANGKA_X, BARIS_Y[1] + 14, "4", 13, { warna: WK.kapurKuning })),
      tambah("lima,", ...turus("t2", TURUS_X, BARIS_Y[2], BANYAK.roket), kapur("n2", ANGKA_X, BARIS_Y[2] + 14, "5", 13, { warna: WK.kapurKuning })),
      tambah("tiga.", ...turus("t3", TURUS_X, BARIS_Y[3], BANYAK.bunga), kapur("n3", ANGKA_X, BARIS_Y[3] + 14, "3", 13, { warna: WK.kapurKuning })),
      tambah("papan", emo("kp", 262, 150, E.pensil, 22)),
    ),
  ],
};

/* ------------------------------ 5. Tabel: judul, baris, kolom ------------------------------ */
const SUARA_B1 = "Kaka menyalin hasilnya ke tabel, berjudul Kotak Cerita Bergambar.";
const SUARA_B2 = "Garis ke samping disebut baris. Garis ke bawah disebut kolom. Jari Igil menyusuri baris sampai ke hidung Abang, dan Abang bersin!";
const SUARA_B3 = "Abang memutar tabel menjadi mendatar. Isinya sama, hanya bentuknya berbeda.";

const TX = 60;
const TY = 36;
const ID_MENURUN = idTabelMenurun("tb", 4);

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel",
  judul: "Tabel: baris dan kolom",
  sumber: "Materi: tabel menurun dan mendatar",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tabel data")),
      tambah("Kaka", ...orang("kk", 248, 170, E.kaka, "Kaka")),
      tambah("tabel,", ...tabelMenurun("tb", TX, TY, "Kotak Cerita Bergambar", DATA)),
      sorotkan("Bergambar.", "tb-jd-k"),
    ),
    k(
      SUARA_B2,
      ubah(0, { id: "tb-jd-k", sorot: false }),
      tambah("samping", panah("pb", TX, 144, TX + 116, 144, W.merah, { tebal: 2.6 })),
      tambah("baris.", teks("lbr", TX + 58, 158, "baris", 9.4, W.merah)),
      sorotkan("baris.", ...selBaris("tb", 0)),
      ubah("baris.", { id: "tb-r0a", warna: "#FDE68A" }, { id: "tb-r0b", warna: "#FDE68A" }),
      tambah("bawah", panah("pk", 30, TY + 20, 30, TY + 82, W.hijau, { tebal: 2.6 })),
      tambah("kolom.", teks("lkl", 30, TY + 96, "kolom", 9.4, W.hijau)),
      sorotkan("kolom.", ...selKolom("tb", 4)),
      tambah("Jari", ...orang("ig", 206, 150, E.igil, "Igil"), emo("jr", 190, 74, E.jari, 22)),
      ubah("menyusuri", { id: "jr", x: 200 }),
      tambah("hidung", ...orang("ab", 262, 78, E.abang, "Abang")),
      ubah("hidung", { id: "jr", x: 228 }),
      tambah("bersin!", emo("bs", 248, 54, E.angin, 20), emo("bn", 262, 50, E.bersin, 16)),
    ),
    k(
      SUARA_B3,
      hapus("memutar", ...ID_MENURUN, "pb", "pk", "lbr", "lkl", "jr", "bs", "bn", "ig", "ig-n"),
      tambah("memutar", emo("pt", 150, 84, E.putar, 30)),
      hapus("mendatar.", "pt"),
      tambah("mendatar.", ...tabelMendatar("tm", 24, 70, "Kotak Cerita Bergambar", DATA)),
      sorotkan("sama,", ...idTabelMendatar("tm", 4).filter((id) => /-c\dbt?$/.test(id) && !id.endsWith("t"))),
      tambah("berbeda.", ...kartu("sb", 60, 130, 180, 20, W.krem, ["isi sama, bentuk berbeda"], 9.4)),
    ),
  ],
};

/* ------------------------------ 6. Paling banyak, paling sedikit, sama banyak ------------------------------ */
const SUARA_Q1 = "Mamah bertanya, jenis mana yang paling banyak, dan jenis mana yang paling sedikit?";
const SUARA_Q2 = "Kaka membaca tabel. Hewan paling banyak, ada enam. Bunga paling sedikit, ada tiga.";
const SUARA_Q3 = "Roket ada lima. Kurang satu lagi, maka roket sama banyak dengan hewan.";

const QX = 14;
const QY = 34;
/** Tengah tinggi baris ke-i pada tabel menurun yang berpojok (QX, QY). */
const barisY = (i: number): number => QY + 15 * (i + 2) + 7.5;
const deretKotak = (j: JenisKotak, i: number) => Array.from({ length: BANYAK[j] }, (_, s) => kotakCerita(`q${i}-${s}`, 156 + s * 15, barisY(i), j, 12)).flat();
const idDeret = (i: number, j: JenisKotak) => Array.from({ length: BANYAK[j] }, (_, s) => idKotak(`q${i}-${s}`)).flat();

export const ADEGAN_TERBANYAK: AdeganStory = {
  id: "terbanyak",
  judul: "Paling banyak dan paling sedikit",
  sumber: "Materi: paling banyak, paling sedikit",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Membaca tabel"), ...tabelMenurun("tq", QX, QY, "Kotak Cerita Bergambar", DATA)),
      tambah(0, ...URUT_JENIS.flatMap((j, i) => deretKotak(j, i))),
      tambah("Mamah", ...orang("mm", 262, 168, E.mamah, "Mamah")),
      tambah("bertanya,", emo("tn", 236, 146, E.tanya, 22)),
      tambah("banyak,", ...kartu("q1", 14, 148, 116, 18, W.merahMuda, ["paling banyak?"], 9)),
      tambah("sedikit?", ...kartu("q2", 14, 172, 116, 18, W.langit, ["paling sedikit?"], 9)),
    ),
    k(
      SUARA_Q2,
      hapus(0, "q1-k", "q1-t0", "q2-k", "q2-t0", "tn"),
      tambah("Kaka", ...orang("kk", 206, 170, E.kaka, "Kaka")),
      ubah("banyak,", ...selBaris("tq", 0).map((id) => ({ id, warna: "#FCA5A5", sorot: true })), ...idDeret(0, "hewan").map((id) => ({ id, sorot: true }))),
      tambah("banyak,", ...kartu("h1", 14, 148, 116, 18, W.merahMuda, ["paling banyak: Hewan"], 8.4)),
      ubah("sedikit,", ...selBaris("tq", 3).map((id) => ({ id, warna: "#93C5FD", sorot: true })), ...idDeret(3, "bunga").map((id) => ({ id, sorot: true }))),
      tambah("sedikit,", ...kartu("h2", 14, 172, 116, 18, W.langit, ["paling sedikit: Bunga"], 8.4)),
    ),
    k(
      SUARA_Q3,
      hapus(0, "h1-k", "h1-t0", "h2-k", "h2-t0"),
      ubah(0, ...selBaris("tq", 0).map((id) => ({ id, sorot: false })), ...selBaris("tq", 3).map((id) => ({ id, sorot: false })), ...idDeret(0, "hewan").map((id) => ({ id, sorot: false })), ...idDeret(3, "bunga").map((id) => ({ id, sorot: false }))),
      ubah("Roket", ...selBaris("tq", 2).map((id) => ({ id, warna: "#FEF08A", sorot: true })), ...idDeret(2, "roket").map((id) => ({ id, sorot: true }))),
      tambah("Kurang", bayangan("by", 156 + 5 * 15, barisY(2), 12)),
      tambah("satu", teks("p1", 250, barisY(2) + 3, "+1", 11, W.merah)),
      sorotkan("maka", ...idDeret(0, "hewan")),
      tambah("sama", ...kartu("sm", 10, 160, 150, 20, W.krem, ["roket sama banyak dengan hewan"], 7.8)),
    ),
  ],
};

/* ------------------------------ 7. Selisih ------------------------------ */
const SUARA_S1 = "Berapa lebihnya kotak hewan dari kotak bunga? Igil memasangkan satu kotak hewan dengan satu kotak bunga.";
const SUARA_S2 = "Tiga kotak hewan tidak punya pasangan. Itu selisihnya.";
const SUARA_S3 = "Enam dikurangi tiga sama dengan tiga. Kotak hewan lebih banyak tiga.";

const SX = (i: number): number => 52 + i * 24;
const Y_HEWAN = 58;
const Y_BUNGA = 118;

export const ADEGAN_SELISIH: AdeganStory = {
  id: "selisih",
  judul: "Selisih dengan memasangkan",
  sumber: "Materi: selisih, dipasangkan satu-satu",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Selisih hewan dan bunga")),
      tambah("hewan", emo("lh", 24, Y_HEWAN + 6, E.hewan, 18), ...Array.from({ length: 6 }, (_, i) => kotakCerita(`sh${i}`, SX(i), Y_HEWAN, "hewan", 18)).flat()),
      tambah("bunga?", emo("lg", 24, Y_BUNGA + 6, E.bunga, 18), ...Array.from({ length: 3 }, (_, i) => kotakCerita(`sg${i}`, SX(i), Y_BUNGA, "bunga", 18)).flat()),
      tambah("Igil", ...orang("ig", 258, 90, E.igil, "Igil")),
      tambah("memasangkan", gs("pr0", SX(0), Y_HEWAN + 10, SX(0), Y_BUNGA - 10, W.merah, 2.2, { gambar: true })),
      tambah("satu", ...kartu("p1k", 196, 150, 92, 18, W.krem, ["1 pasang"], 9)),
    ),
    k(
      SUARA_S2,
      hapus(0, "p1k-k", "p1k-t0"),
      tambah("Tiga", gs("pr1", SX(1), Y_HEWAN + 10, SX(1), Y_BUNGA - 10, W.merah, 2.2, { gambar: true }), gs("pr2", SX(2), Y_HEWAN + 10, SX(2), Y_BUNGA - 10, W.merah, 2.2, { gambar: true }), teks("t3", 150, 38, "3", 14, W.merah)),
      sorotkan("hewan", ...[3, 4, 5].flatMap((i) => idKotak(`sh${i}`))),
      tambah("pasangan.", ...[3, 4, 5].map((i) => emo(`qs${i}`, SX(i), Y_HEWAN + 30, E.tanya, 14))),
      tambah("selisihnya.", ...kartu("sl", 196, 132, 92, 18, W.pink, ["selisih"], 9)),
    ),
    k(
      SUARA_S3,
      hapus(0, "sl-k", "sl-t0", "t3", ...[3, 4, 5].map((i) => `qs${i}`)),
      tambah("Enam", teks("k6", 92, 174, "6", 16, W.biru)),
      tambah("dikurangi", teks("km", 118, 174, "–", 16, W.biru)),
      tambah("tiga", teks("k3", 144, 174, "3", 16, W.biru)),
      tambah("sama", teks("ks", 170, 174, "=", 16, W.biru)),
      tambah("tiga.", teks("kh", 196, 174, "3", 16, W.merah)),
      sorotkan("lebih", ...[3, 4, 5].flatMap((i) => idKotak(`sh${i}`))),
      tambah("tiga@3", ...kartu("lb", 190, 130, 100, 18, W.merahMuda, ["hewan lebih 3"], 9)),
    ),
  ],
};
