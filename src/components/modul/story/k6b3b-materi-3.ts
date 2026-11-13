import type { AdeganStory, Obj } from "./logika-story";
import { LATIHAN5, W, daduIso, emo, kartu, kubusMuka, mukaDadu, panah, susunanIso, tampak, teks } from "./k6b3b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b3b-bantu";

const ambil = (objs: Obj[], ...ids: string[]) => objs.filter((o) => ids.includes(o.id));

/* ------------------------------ 5. Latihan 3.2 nomor 1, 2, dan 5 (hlm. 88 dan 89) ------------------------------ */
const V5_DEPAN = tampak("d", 110, 74, 30, ["b.", "km"]).objs;
const V5_KANAN = tampak("r", 114, 74, 24, ["b.", "mh"]).objs;
const V5_ATAS = tampak("t", 206, 74, 24, ["h.", "bm"]).objs;
const L5 = susunanIso("c", 98, 148, 28, LATIHAN5);

export const ADEGAN_LATIHAN32: AdeganStory = {
  id: "latihan-32",
  judul: "Latihan 3.2: menggambar dan menyusun dari tampak",
  sumber: "Buku Siswa hlm. 88–89; Buku Panduan Guru hlm. 99–100",
  latar: "#EEF9FF",
  kutipan: ["Gambarkan kubus berikut dari tiga arah yang berbeda", "Sebuah kubus dengan sisi berwarna-warni dilihat dari tiga arah berbeda", "Berikut adalah tampilan susunan kubus dari berbagai arah", "Gunakan kubus kalian dan tentukan susunan yang dimaksud"],
  ketukan: [
    k(
      "Latihan 3.2 nomor 1: sebuah kubus punya sisi atas merah, sisi kiri biru, dan sisi kanan kuning. Gambarlah kubus itu dari tiga arah.",
      tambah(0, teks("jd", 150, 22, "Latihan 3.2 nomor 1", 12, W.ungu)),
      tambah("kubus", kubusMuka("kb", 124, 128, 34, { atas: "m", kiri: "b", kanan: "k" })),
      tambah("atas", teks("la", 154, 62, "atas: merah", 9, "#B91C1C")),
      tambah("kiri", teks("lk", 96, 168, "kiri: biru", 9, "#1D4ED8")),
      tambah("kanan", teks("lr", 214, 168, "kanan: kuning", 9, "#A16207")),
    ),
    k(
      "Hasilnya: dari depan terlihat biru, dari kanan terlihat kuning, dan dari atas terlihat merah. Kita sepakati sisi kiri pada gambar sebagai sisi depan.",
      bersih(0),
      tambah(0, kubusMuka("kb", 18, 124, 26, { atas: "m", kiri: "b", kanan: "k" })),
      tambah("depan", teks("td", 138, 72, "depan", 9), tampak("v1", 122, 80, 34, ["b"]).objs),
      tambah("kanan", teks("tk", 188, 72, "kanan", 9), tampak("v2", 172, 80, 34, ["k"]).objs),
      tambah("atas", teks("ta", 238, 72, "atas", 9), tampak("v3", 222, 80, 34, ["m"]).objs),
      tambah("sepakati", teks("sp", 170, 148, "sisi kiri gambar = sisi depan", 9.5, W.merah)),
    ),
    k(
      "Nomor 2: tampak depan berwarna merah, tampak kanan kuning, dan tampak atas hijau. Gambarlah kubusnya, dengan merah di kiri gambar, kuning di kanan, dan hijau di atas.",
      bersih(0),
      tambah(0, teks("jd", 150, 22, "Latihan 3.2 nomor 2", 12, W.ungu)),
      tambah("depan", tampak("a1", 24, 40, 34, ["m"]).objs, teks("b1", 66, 62, "depan", 9.5, W.biru, { anchor: "start" })),
      tambah("kanan", tampak("a2", 24, 86, 34, ["k"]).objs, teks("b2", 66, 108, "kanan", 9.5, W.biru, { anchor: "start" })),
      tambah("atas", tampak("a3", 24, 132, 34, ["h"]).objs, teks("b3", 66, 154, "atas", 9.5, W.biru, { anchor: "start" })),
      tambah("Gambarlah", kubusMuka("kb", 160, 136, 38, { atas: "h", kiri: "m", kanan: "k" })),
    ),
    k(
      "Nomor 5 memberi tiga tampak, dan kita harus menyusun kubusnya. Dari depan: biru di atas kuning, dengan merah di sebelah kanan.",
      bersih(0),
      tambah(0, teks("jd", 150, 22, "Latihan 3.2 nomor 5", 12, W.ungu)),
      tambah("depan:", teks("td", 140, 64, "tampak depan", 9.5)),
      tambah("biru", ambil(V5_DEPAN, "d-00")),
      tambah("kuning,", ambil(V5_DEPAN, "d-10")),
      tambah("merah", ambil(V5_DEPAN, "d-11")),
    ),
    k(
      "Dari kanan: biru di atas merah, dengan hijau di sebelahnya. Dari atas: hijau di baris belakang, sedangkan biru dan merah di baris depan.",
      bersih(0),
      tambah(0, tampak("d", 20, 74, 24, ["b.", "km"]).objs, teks("td", 44, 68, "depan", 8.5)),
      tambah("kanan:", teks("tk", 138, 68, "kanan", 8.5)),
      tambah("biru", ambil(V5_KANAN, "r-00")),
      tambah("merah,", ambil(V5_KANAN, "r-10")),
      tambah("hijau", ambil(V5_KANAN, "r-11")),
      tambah("atas@2", teks("ta", 230, 68, "atas", 8.5), teks("bl", 262, 80, "belakang", 6.5, W.merah), teks("dp", 262, 130, "depan", 6.5, W.merah)),
      tambah("hijau@2", ambil(V5_ATAS, "t-00")),
      tambah("biru@2", ambil(V5_ATAS, "t-10")),
      tambah("merah@2", ambil(V5_ATAS, "t-11")),
    ),
    k(
      "Gabungkan ketiganya: kuning di bawah biru, di depan kiri. Merah di depan kanan. Hijau di belakang kiri. Susunannya memakai 4 kubus, dan ketiga tampak cocok.",
      bersih(0),
      tambah("kuning", L5.objs.filter((o) => o.id.startsWith("c0-"))),
      sorotkan("kuning", ...L5.ids(0)),
      tambah("biru", L5.objs.filter((o) => o.id.startsWith("c1-"))),
      redamkan("biru", ...L5.ids(0)),
      sorotkan("biru", ...L5.ids(1)),
      tambah("Merah", L5.objs.filter((o) => o.id.startsWith("c2-"))),
      redamkan("Merah", ...L5.ids(1)),
      sorotkan("Merah", ...L5.ids(2)),
      tambah("Hijau", L5.objs.filter((o) => o.id.startsWith("c3-"))),
      redamkan("Hijau", ...L5.ids(2)),
      sorotkan("Hijau", ...L5.ids(3)),
      tambah("4", teks("jml", 150, 26, "4 kubus", 14, W.merah, { garis: W.emas })),
      redamkan("kubus,", ...L5.ids(3)),
      tambah("cocok", emo("ok", 252, 150, "✅", 30)),
    ),
  ],
};

/* ------------------------------ 6. Soal dadu nomor 6 (hlm. 90) ------------------------------ */
const DADU1 = { atas: 6, kiri: 4, kanan: 5 } as const;
const E2 = daduIso("e2", 238, 130, 32, { atas: 6, kiri: 5, kanan: 0 });

export const ADEGAN_DADU: AdeganStory = {
  id: "latihan-32-dadu",
  judul: "Latihan 3.2 nomor 6: dadu dan sisi yang kosong",
  sumber: "Buku Siswa hlm. 90; Buku Panduan Guru hlm. 100",
  latar: "#FFF8E1",
  kutipan: ["Gambarkan tampilannya dari tiga arah yang berbeda", "Jika mata dadu pada dua sisi yang berlawanan berjumlah 7", "ada berapa mata dadu pada sisi yang kosong?"],
  ketukan: [
    k(
      "Nomor 6a: sebuah dadu menampakkan tiga sisi. Atas 6 mata, kiri 4 mata, dan kanan 5 mata. Gambarkan tampilannya dari tiga arah yang berbeda.",
      tambah(0, teks("jd", 150, 22, "Latihan 3.2 nomor 6a", 12, W.ungu)),
      tambah("sebuah", daduIso("d1", 66, 136, 36, DADU1)),
      tambah("Atas", teks("l1", 66, 64, "atas 6", 9.5, W.merah)),
      tambah("kiri", teks("l2", 28, 168, "kiri 4", 9.5, W.merah)),
      tambah("kanan", teks("l3", 106, 168, "kanan 5", 9.5, W.merah)),
      tambah("Gambarkan", mukaDadu("m1", 150, 84, 36, 6), mukaDadu("m2", 194, 84, 36, 4), mukaDadu("m3", 238, 84, 36, 5), teks("n1", 168, 76, "atas", 8.5), teks("n2", 212, 76, "kiri", 8.5), teks("n3", 256, 76, "kanan", 8.5)),
    ),
    k(
      "Nomor 6b: dadu yang sama dilihat dari arah lain. Atas tetap 6, kiri 5, dan sisi kanan kosong. Mata dadu pada dua sisi berlawanan berjumlah 7. Berapa mata di sisi kosong?",
      bersih(0),
      tambah(0, teks("jd", 150, 22, "Latihan 3.2 nomor 6b", 12, W.ungu)),
      tambah("lain.", daduIso("d2", 100, 138, 40, { atas: 6, kiri: 5, kanan: 0 })),
      tambah("Atas", teks("l1", 100, 64, "atas 6", 9.5, W.merah)),
      tambah("kiri", teks("l2", 50, 176, "kiri 5", 9.5, W.merah)),
      tambah("kanan", teks("l3", 150, 176, "kanan ?", 9.5, W.merah)),
      tambah("berjumlah", teks("sj", 232, 92, "sisi berlawanan", 9, W.ungu), teks("sj2", 232, 112, "jumlahnya 7", 13, W.merah)),
    ),
    k(
      "Pasangan sisi berlawanan adalah 1 dan 6, 2 dan 5, serta 3 dan 4, sebab tiap pasang berjumlah 7. Pada dadu pertama, sisi 6, 4, dan 5 bertemu di satu sudut.",
      bersih(0),
      tambah("1", kartu("p1", 22, 38, 120, 28, "#FEF3C7", ["1 + 6 = 7"], 11)),
      tambah("2", kartu("p2", 22, 74, 120, 28, "#FEF3C7", ["2 + 5 = 7"], 11)),
      tambah("3", kartu("p3", 22, 110, 120, 28, "#FEF3C7", ["3 + 4 = 7"], 11)),
      tambah("dadu", daduIso("d1", 220, 130, 30, DADU1)),
      tambah("bertemu", teks("sd", 220, 168, "6, 4, dan 5 satu sudut", 8, W.merah)),
    ),
    k(
      "Putar dadu pertama seperempat putaran, sampai sisi 5 berpindah ke kiri. Sisi yang muncul di kanan adalah lawan dari sisi 4, yaitu 3.",
      bersih(0),
      tambah(0, daduIso("e1", 62, 130, 32, DADU1), teks("e1a", 62, 66, "atas 6", 8.5), teks("e1b", 28, 160, "kiri 4", 8.5), teks("e1c", 100, 160, "kanan 5", 8.5)),
      tambah("Putar", panah("pu", 112, 100, 70, 0, W.hijau, 3, { gambar: true }), teks("pt", 148, 92, "putar", 9, W.hijau)),
      tambah("5", E2, teks("e2a", 238, 66, "atas 6", 8.5), teks("e2b", 204, 160, "kiri 5", 8.5)),
      tambah("lawan", teks("lw", 150, 188, "lawan sisi 4 adalah 3", 10, W.ungu)),
      hapus("3.", ...E2.map((o) => o.id)),
      tambah("3.", daduIso("e3", 238, 130, 32, { atas: 6, kiri: 5, kanan: 3 }), teks("e2c", 272, 160, "kanan 3", 8.5)),
    ),
    k(
      "Jadi sisi kosong berisi 3 mata dadu. Cocok dengan kunci buku panduan guru, dan benar: 3 dan 4 berjumlah 7, sedangkan dadu itu menunjukkan 6, 5, dan 3.",
      bersih(0),
      tambah(0, daduIso("f", 90, 134, 40, { atas: 6, kiri: 5, kanan: 3 }), teks("f1", 90, 64, "atas 6", 9.5), teks("f2", 44, 172, "kiri 5", 9.5), teks("f3", 136, 172, "kanan 3", 9.5, W.merah)),
      tambah("3", teks("jw", 232, 80, "jawaban: 3", 14, W.merah, { garis: W.emas })),
      tambah("Cocok", teks("cp", 232, 116, "3 + 4 = 7", 12, W.ungu), emo("ok", 232, 150, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 7. Uji Kompetensi nomor 2 dan refleksi (hlm. 90 dan 97) ------------------------------ */
export const ADEGAN_UJI_REFLEKSI: AdeganStory = {
  id: "uji-refleksi",
  judul: "Uji Kompetensi dadu bergambar dan refleksi",
  sumber: "Buku Siswa hlm. 90 dan 97; Buku Panduan Guru hlm. 100 dan 105",
  latar: "#F4EEFF",
  kutipan: ["Gambarkan dadu berikut jika dilihat dari tiga arah yang berbeda", "Apakah saya dapat menggambarkan tampilan bangun ruang dari berbagai arah?", "Apakah saya dapat menyusun susunan kubus jika diketahui tampilannya dari berbagai arah?"],
  ketukan: [
    k(
      "Uji Kompetensi nomor 2: sebuah dadu bergambar segitiga di sisi atas, persegi di sisi kiri, dan lingkaran di sisi kanan. Gambarkan dari tiga arah yang berbeda.",
      tambah(0, teks("jd", 150, 22, "Uji Kompetensi nomor 2", 12, W.ungu)),
      tambah("dadu", daduIso("u", 150, 132, 44, { atas: "segitiga", kiri: "persegi", kanan: "lingkaran" })),
      tambah("segitiga", teks("l1", 150, 56, "atas: segitiga", 9.5, W.merah)),
      tambah("persegi", teks("l2", 68, 168, "kiri: persegi", 9.5, W.merah)),
      tambah("lingkaran", teks("l3", 232, 168, "kanan: lingkaran", 9.5, W.merah)),
    ),
    k(
      "Jawabannya: tampak atas berupa segitiga, tampak kiri berupa persegi, dan tampak kanan berupa lingkaran. Panduan guru: sisi kiri boleh dianggap sisi depan, dan keduanya benar.",
      bersih(0),
      tambah("atas", mukaDadu("a", 40, 60, 54, "segitiga"), teks("at", 67, 52, "tampak atas", 9)),
      tambah("kiri", mukaDadu("b", 123, 60, 54, "persegi"), teks("bt", 150, 52, "tampak kiri", 9)),
      tambah("kanan", mukaDadu("c", 206, 60, 54, "lingkaran"), teks("ct", 233, 52, "tampak kanan", 9)),
      tambah("depan,", teks("dp", 150, 142, "sisi kiri = sisi depan", 12, W.merah), teks("dp2", 150, 162, "dua cara menamai, dua-duanya benar", 8.5, W.hijau)),
      ubah("keduanya", { id: "dp2", sorot: true }),
    ),
    k(
      "Refleksi: apakah saya dapat menggambarkan tampilan bangun ruang dari berbagai arah? Apakah saya dapat menyusun kubus, jika tampilannya dari berbagai arah diketahui?",
      bersih(0),
      tambah(0, teks("jd", 150, 24, "Ayo Berefleksi", 13, W.ungu)),
      tambah("menggambarkan", kartu("q1", 24, 44, 252, 50, W.putih, ["apakah saya dapat menggambar", "tampak dari berbagai arah?"], 9.5), emo("c1", 262, 76, "❓", 20)),
      tambah("menyusun", kartu("q2", 24, 108, 252, 50, W.putih, ["apakah saya dapat menyusun kubus", "dari gambar tampaknya?"], 9.5), emo("c2", 262, 140, "❓", 20)),
      tambah("diketahui?", emo("ok", 150, 190, "🙂", 24)),
    ),
  ],
};
