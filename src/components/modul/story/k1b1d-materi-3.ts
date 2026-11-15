import type { AdeganStory, Obj } from "./logika-story";
import { BIRU_BENDA, KUNING, W, benda, emo, judul, kartu, kepingBingkai, selBingkai, titikDua, teks, type Titik } from "./k1b1d-gambar";
import { bersih, hapus, hitungAksi, k, sorotkan, tambah, ubah, urutKata } from "./k1b1d-bantu";

const OWL = "\u{1F989}";
const CUPCAKE = "\u{1F9C1}";

/* ------------------------------ 1. Pasangan lima dan tujuh ------------------------------ */
const SUARA_Q1 = "Mari kita cari pasangan bilangan lima. Lima bisa dipisahkan menjadi satu dan empat.";
const SUARA_Q2 = "Lima juga bisa dipisahkan menjadi dua dan tiga. Dua dan tiga adalah pasangan yang lain.";
const SUARA_Q3 = "Lima mempunyai dua pasangan, yaitu satu dan empat, serta dua dan tiga.";
const SUARA_Q4 = "Sekarang bilangan tujuh. Tujuh bisa dipisahkan menjadi dua dan lima.";
const SUARA_Q5 = "Tujuh juga bisa dipisahkan menjadi tiga dan empat. Ini pasangan tujuh yang lain.";
const SUARA_Q6 = "Pasangan bilangan lima dan tujuh sudah kita temukan. Hebat sekali!";

export const ADEGAN_LIMA_TUJUH: AdeganStory = {
  id: "pasangan-lima-tujuh",
  judul: "Pasangan bilangan lima dan tujuh",
  sumber: "Materi: pasangan lima dan tujuh",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Pasangan lima")), tambah("pisahkan", ...titikDua("qa", 40, 70, 1, 4)), tambah("empat.", teks("qat", 200, 76, "1 dan 4", 16, W.merah))),
    k(SUARA_Q2, tambah("juga", ...titikDua("qb", 40, 120, 2, 3)), tambah("tiga.", teks("qbt", 200, 126, "2 dan 3", 16, W.merah))),
    k(SUARA_Q3, tambah("dua", ...kartu("qk", 40, 154, 220, 28, W.emas, ["lima: 1 dan 4, 2 dan 3"], 10)), sorotkan("pasangan,", "qa0", "qb0")),
    k(SUARA_Q4, bersih(0), tambah(0, judul("Pasangan tujuh")), tambah("dipisahkan", ...titikDua("qc", 40, 70, 2, 5)), tambah("lima.", teks("qct", 230, 76, "2 dan 5", 16, W.merah))),
    k(SUARA_Q5, tambah("juga", ...titikDua("qd", 40, 120, 3, 4)), tambah("empat.", teks("qdt", 230, 126, "3 dan 4", 16, W.merah))),
    k(SUARA_Q6, tambah("Hebat", emo("ow", 150, 182, OWL, 28)), sorotkan("tujuh", "qc0", "qd0")),
  ],
};

/* ------------------------------ 2. Karya pada bingkai sepuluh ------------------------------ */
const SUARA_S1 = "Kira, Upe, Malosi, dan Wei bermain bersama Igil. Mereka menyusun keping di dalam bingkai sepuluh.";
const SUARA_S2 = "Bingkai sepuluh punya sepuluh kotak, lima di atas dan lima di bawah.";
const SUARA_S3 = "Pertama mereka menyusun enam keping kuning. Satu, dua, tiga, empat, lima, enam.";
const SUARA_S4 = "Lalu mereka menyusun empat keping biru. Satu, dua, tiga, empat.";
const SUARA_S5 = "Enam keping kuning dan empat keping biru memenuhi bingkai. Semuanya jadi sepuluh!";
const SUARA_S6 = "Enam dan empat adalah pasangan bilangan yang membentuk sepuluh.";
const SUARA_S7 = "Bingkai yang penuh membantu kita melihat pasangan sepuluh dengan cepat. Ayo kita cari pasangan yang lain.";
const BX = 85;
const BY = 44;
const pos3 = urutKata(SUARA_S3, ["satu", "dua", "tiga", "empat", "lima", "enam"], "kuning.");
const pos4 = urutKata(SUARA_S4, ["satu", "dua", "tiga", "empat"], "biru.");

export const ADEGAN_BINGKAI: AdeganStory = {
  id: "bingkai-sepuluh",
  judul: "Karya pasangan pada bingkai sepuluh",
  sumber: "Materi: karya bingkai sepuluh",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Bingkai sepuluh")), tambah("menyusun", ...selBingkai("bf", BX, BY)), tambah("sepuluh.", teks("s10", 150, 134, "10", 30, W.merah))),
    k(
      SUARA_S2,
      sorotkan("atas", ...[0, 1, 2, 3, 4].map((i) => `bf-c${i}`)),
      sorotkan("bawah.", ...[5, 6, 7, 8, 9].map((i) => `bf-c${i}`)),
      tambah("atas", teks("ra", 62, 63, "5", 16, W.merah)),
      tambah("bawah.", teks("rb", 62, 89, "5", 16, W.merah)),
    ),
    k(SUARA_S3, ...pos3.map((p, i) => tambah(p, ...kepingBingkai("ky", BX, BY, i, i + 1, KUNING)))),
    k(SUARA_S4, ...pos4.map((p, i) => tambah(p, ...kepingBingkai("bi", BX, BY, 6 + i, 7 + i, BIRU_BENDA)))),
    k(SUARA_S5, tambah("Semuanya", ...kartu("sk", 40, 152, 220, 30, W.emas, ["6 dan 4 jadi 10"], 12)), sorotkan("memenuhi", "bf-c0", "bf-c9")),
    k(SUARA_S6, tambah("pasangan", teks("sp", 150, 196, "pasangan sepuluh", 9, W.ungu)), ubah("pasangan", { id: "s10", op: 0.35 })),
    k(SUARA_S7, tambah("membantu", emo("lp", 262, 140, "\u{1F50E}", 30)), tambah("Ayo", emo("ow", 40, 140, OWL, 30))),
  ],
};

/* ------------------------------ 3. Semua pasangan bilangan sepuluh ------------------------------ */
const SUARA_T1 = "Sekarang kita cari semua pasangan bilangan sepuluh. Kita memakai bingkai sepuluh lagi.";
const SUARA_T2 = "Satu keping kuning dan sembilan keping biru. Satu dan sembilan adalah pasangan sepuluh.";
const SUARA_T3 = "Dua keping kuning dan delapan keping biru. Dua dan delapan juga pasangan sepuluh.";
const SUARA_T4 = "Tiga keping kuning dan tujuh keping biru. Tiga dan tujuh pasangan yang berikutnya.";
const SUARA_T5 = "Empat keping kuning dan enam keping biru. Empat dan enam pasangan yang lain lagi.";
const SUARA_T6 = "Lima keping kuning dan lima keping biru. Kedua bagiannya sama banyak.";
const SUARA_T7 = "Jadi pasangan sepuluh ada lima, yaitu satu dan sembilan, dua dan delapan, tiga dan tujuh, empat dan enam, serta lima dan lima.";
const SUARA_T8 = "Hafalkan pasangan sepuluh, ya. Pasangan ini sangat berguna untuk belajar berikutnya.";
const FX = 30;
const FY = 44;
const warnaKeping = (a: number): (Partial<Obj> & { id: string })[] => Array.from({ length: 10 }, (_, i) => ({ id: `pd${i}`, warna: i < a ? KUNING : BIRU_BENDA }));
const PASANG10: [number, number][] = [[1, 9], [2, 8], [3, 7], [4, 6], [5, 5]];
const butirDaftar = (i: number): Obj => teks(`dl${i}`, 235, 70 + 22 * i, `${PASANG10[i][0]} dan ${PASANG10[i][1]}`, 11, W.ungu);

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "pasangan-sepuluh",
  judul: "Semua pasangan bilangan sepuluh",
  sumber: "Materi: pasangan bilangan sepuluh",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Pasangan sepuluh"), ...selBingkai("pf", FX, FY)),
      tambah("memakai", ...kepingBingkai("pd", FX, FY, 0, 10, KUNING)),
      tambah("sepuluh.", teks("jl", 235, 46, "pasangan 10", 10, W.ungu)),
    ),
    k(SUARA_T2, ubah("Satu", ...warnaKeping(1)), tambah("Satu", teks("pe", 95, 134, "1 dan 9", 20, W.merah)), tambah("sembilan.", butirDaftar(0))),
    k(SUARA_T3, ubah("Dua", ...warnaKeping(2), { id: "pe", isi: "2 dan 8" }), tambah("delapan.", butirDaftar(1))),
    k(SUARA_T4, ubah("Tiga", ...warnaKeping(3), { id: "pe", isi: "3 dan 7" }), tambah("tujuh.", butirDaftar(2))),
    k(SUARA_T5, ubah("Empat", ...warnaKeping(4), { id: "pe", isi: "4 dan 6" }), tambah("enam.", butirDaftar(3))),
    k(SUARA_T6, ubah("Lima", ...warnaKeping(5), { id: "pe", isi: "5 dan 5" }), tambah("banyak.", butirDaftar(4))),
    k(SUARA_T7, hapus(0, "pe"), sorotkan("lima,", "dl0", "dl1", "dl2", "dl3", "dl4"), tambah("serta", emo("ow", 95, 150, OWL, 36))),
    k(SUARA_T8, tambah("Hafalkan", ...kartu("hf", 20, 164, 150, 26, W.emas, ["hafalkan pasangan 10"], 9.4)), tambah("berguna", emo("sm", 235, 190, "\u{1F4AA}", 26))),
  ],
};

/* ------------------------------ 4. Sembilan kue mangkuk ------------------------------ */
const SUARA_U1 = "Malosi membawa sembilan kue mangkuk. Ia ingin membaginya ke dua piring.";
const SUARA_U2 = "Hitung dulu kue mangkuknya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan.";
const SUARA_U3 = "Malosi menaruh enam kue di piring kiri.";
const SUARA_U4 = "Sisanya, tiga kue, ditaruh di piring kanan.";
const SUARA_U5 = "Enam dan tiga adalah pasangan bilangan sembilan. Kalau digabung kembali, hasilnya sembilan kue.";
const PU: Titik[] = Array.from({ length: 9 }, (_, i) => ({ x: 21 + 31 * i, y: 70 }));
const LABEL_U = PU.map((_, i) => `kmn${i}`);
const letakKiri = (i: number) => ({ id: `km${i}`, x: 50 + 35 * (i % 3), y: 145 + 30 * Math.floor(i / 3) });
const letakKanan = (i: number) => ({ id: `km${i + 6}`, x: 190 + 35 * i, y: 160 });

export const ADEGAN_SEMBILAN: AdeganStory = {
  id: "sembilan-kue",
  judul: "Sembilan kue mangkuk Malosi",
  sumber: "Materi: sembilan kue mangkuk",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Kue mangkuk Malosi")),
      tambah("sembilan", ...PU.map((p, i) => emo(`km${i}`, p.x, p.y, CUPCAKE, 22, { z: 1 }))),
      tambah("membaginya", { id: "pk1", t: "kotak", x: 14, y: 118, w: 130, h: 70, warna: W.putih, garis: W.coklat, rx: 20, tebal: 2.4, z: -1 }, { id: "pk2", t: "kotak", x: 156, y: 118, w: 130, h: 70, warna: W.putih, garis: W.coklat, rx: 20, tebal: 2.4, z: -1 }),
    ),
    k(SUARA_U2, ...hitungAksi(SUARA_U2, "km", PU)),
    k(SUARA_U3, hapus(0, "tg", ...LABEL_U), ubah("menaruh", ...[0, 1, 2, 3, 4, 5].map(letakKiri)), tambah("enam", teks("u6", 79, 112, "6", 20, W.merah))),
    k(SUARA_U4, ubah("tiga", ...[0, 1, 2].map(letakKanan)), tambah("tiga", teks("u3", 221, 112, "3", 20, W.merah))),
    k(SUARA_U5, tambah("pasangan", ...kartu("uk", 50, 34, 200, 28, W.emas, ["6 dan 3 jadi 9"], 11)), tambah("digabung", emo("ow", 150, 100, OWL, 28))),
  ],
};

/* ------------------------------ 5. Latihan 1: menggabungkan layang-layang ------------------------------ */
const SUARA_L1 = "Latihan satu. Kira membawa dua layang-layang, dan Upe membawa lima layang-layang. Kalau digabung, ada berapa layang-layang?";
const SUARA_L2 = "Ayo hitung semuanya. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_L3 = "Dua dan lima digabung menjadi tujuh. Jadi ada tujuh layang-layang.";
const SUARA_L4 = "Betul! Latihan pertama sudah selesai. Hebat sekali!";
const PL7: Titik[] = Array.from({ length: 7 }, (_, i) => ({ x: 30 + 40 * i, y: 84 }));

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: menggabungkan layang-layang",
  sumber: "Materi: latihan menggabungkan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah("Kira", teks("nk", 50, 46, "Kira", 9, W.ungu), ...PL7.slice(0, 2).flatMap((p, i) => benda("layang", `ly${i}`, p.x, p.y, 11, i))),
      tambah("Upe", teks("nu", 190, 46, "Upe", 9, W.ungu)),
      tambah("lima", ...PL7.slice(2).flatMap((p, i) => benda("layang", `ly${i + 2}`, p.x, p.y, 11, i + 2))),
    ),
    k(SUARA_L2, ...hitungAksi(SUARA_L2, "ly", PL7, "semuanya.")),
    k(SUARA_L3, hapus(0, "tg", ...PL7.map((_, i) => `lyn${i}`)), tambah("Dua", ...kartu("l3", 50, 140, 200, 30, W.emas, ["2 dan 5 jadi 7"], 12))),
    k(SUARA_L4, tambah("Betul!", emo("ok", 60, 190, "✅", 30)), tambah("Hebat", emo("ow", 240, 190, OWL, 30))),
  ],
};

/* ------------------------------ 6. Latihan 2: pasangan sepuluh ------------------------------ */
const SUARA_M1 = "Latihan dua. Di dalam bingkai sepuluh sudah ada empat keping kuning. Berapa keping biru supaya bingkainya penuh?";
const SUARA_M2 = "Hitung kotak yang kosong sambil mengisinya dengan keping biru. Satu, dua, tiga, empat, lima, enam.";
const SUARA_M3 = "Enam keping biru memenuhi bingkai. Empat dan enam adalah pasangan sepuluh.";
const SUARA_M4 = "Betul! Jawabannya enam keping biru. Hebat sekali!";
const posM2 = urutKata(SUARA_M2, ["satu", "dua", "tiga", "empat", "lima", "enam"], "biru.");

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: pasangan sepuluh",
  sumber: "Materi: latihan pasangan sepuluh",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2"), ...selBingkai("lf", BX, BY)),
      tambah("empat", ...kepingBingkai("lk", BX, BY, 0, 4, KUNING)),
      tambah("sepuluh", teks("l10", 150, 134, "10", 30, W.merah)),
      tambah("Berapa", emo("tn", 262, 90, "❓", 30)),
    ),
    k(SUARA_M2, hapus(0, "tn"), ...posM2.map((p, i) => tambah(p, ...kepingBingkai("lb", BX, BY, 4 + i, 5 + i, BIRU_BENDA)))),
    k(SUARA_M3, tambah("Empat", ...kartu("m3", 40, 152, 220, 30, W.emas, ["4 dan 6 jadi 10"], 12)), sorotkan("memenuhi", "lf-c9")),
    k(SUARA_M4, tambah("Betul!", emo("ok", 40, 100, "✅", 32)), tambah("Hebat", emo("ow", 262, 100, OWL, 32))),
  ],
};

/* ------------------------------ 7. Latihan 3: bukan pasangan tujuh ------------------------------ */
const SUARA_N1 = "Latihan tiga. Manakah yang bukan pasangan tujuh? Tiga dan empat, dua dan lima, atau satu dan lima.";
const SUARA_N2 = "Tiga dan empat menjadi tujuh. Dua dan lima juga menjadi tujuh.";
const SUARA_N3 = "Satu dan lima hanya menjadi enam. Jadi satu dan lima bukan pasangan tujuh.";
const SUARA_N4 = "Betul! Jawabannya satu dan lima. Hebat sekali!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: bukan pasangan tujuh",
  sumber: "Materi: latihan pasangan tujuh",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3")),
      tambah("Tiga", teks("na", 50, 66, "3 dan 4", 12, W.ungu), ...titikDua("ma", 100, 62, 3, 4)),
      tambah("dua", teks("nb", 50, 106, "2 dan 5", 12, W.ungu), ...titikDua("mb", 100, 102, 2, 5)),
      tambah("satu", teks("nc", 50, 146, "1 dan 5", 12, W.ungu), ...titikDua("mc", 100, 142, 1, 5)),
    ),
    k(SUARA_N2, tambah("tujuh.", emo("oa", 262, 68, "✅", 24)), tambah("juga", emo("ob", 262, 108, "✅", 24))),
    k(SUARA_N3, tambah("enam.", emo("oc", 262, 148, "❌", 24)), sorotkan("bukan", "mc0", "mc1", "mc2", "mc3", "mc4", "mc5")),
    k(SUARA_N4, tambah("Betul!", ...kartu("n4", 60, 164, 180, 28, W.emas, ["bukan pasangan 7: 1 dan 5"], 9.6)), tambah("Hebat", emo("ow", 262, 190, OWL, 24))),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Satu bilangan yang utuh bisa dipisahkan menjadi dua bagian.";
const SUARA_Z2 = "Dua bagian bisa digabungkan lagi menjadi satu bilangan yang utuh.";
const SUARA_Z3 = "Satu bilangan punya banyak pasangan. Enam punya tiga pasangan, dan sepuluh punya lima pasangan.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("dipisahkan", ...kartu("z1", 14, 34, 272, 34, W.hijauMuda, ["yang utuh dipisah jadi dua bagian"], 9.6))),
    k(SUARA_Z2, tambah("digabungkan", ...kartu("z2", 14, 78, 272, 34, W.langit, ["dua bagian digabung jadi yang utuh"], 9.6))),
    k(SUARA_Z3, tambah("pasangan.", ...kartu("z3", 14, 122, 272, 34, W.krem, ["enam: tiga pasangan; 10: lima pasangan"], 9.6)), tambah("sepuluh", ...kartu("z4", 14, 166, 272, 28, W.pink, ["satu bilangan, banyak pasangan"], 9.6))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
