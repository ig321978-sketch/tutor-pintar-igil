import type { AdeganStory } from "./logika-story";
import { W, arsir, arsirPita, barisTabel, emo, garis, kartu, kisi, kotak, pecahan, pita, teks } from "./k6b1c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k6b1c-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 1. Latihan 1 dan 2: kain dan suhu ------------------------------ */
const LS = [150, 70];
const suhu = [
  ["Sumatra Selatan", "37,2"],
  ["Sumatra Utara", "33,3"],
  ["Nusa Tenggara Timur", "36,6"],
  ["Sulawesi Tengah", "38,5"],
  ["Kalimantan Utara", "36,8"],
];
const suhuUrut = [
  ["Sulawesi Tengah", "38,5"],
  ["Sumatra Selatan", "37,2"],
  ["Kalimantan Utara", "36,8"],
  ["Nusa Tenggara Timur", "36,6"],
  ["Sumatra Utara", "33,3"],
];

export const ADEGAN_LATIHAN13A: AdeganStory = {
  id: "latihan13-kain-suhu",
  judul: "Latihan 1 dan 2: kain dan suhu",
  sumber: "Materi: Latihan 1 dan 2",
  latar: "#FDF2F8",
  kutipan: kutipanLokal("k6b1c-materi-3.ts:1"),
  ketukan: [
    k(
      "Latihan satu: Rina mendapat pesanan kain sepanjang tiga perempat meter. Gambarlah tiga perempat pada persegi, lalu tulis nilainya dalam desimal.",
      tambah(0, teks("jud", 150, 22, "Latihan 1: kain 3/4 m", 12, W.ungu), emo("kn", 40, 100, "🧵", 30)),
      tambah("Gambarlah", pita("pt", 80, 60, 190, 60, 4)),
      tambah("persegi", arsirPita("pa", 80, 60, 190, 60, 4, 0, 3)),
      tambah("desimal", teks("qs", 175, 160, "3/4 meter = ... ?", 14, W.merah)),
    ),
    k(
      "Cara pertama dengan gambar. Persegi seratus petak diarsir tujuh puluh lima petak, sehingga tiga perempat sama dengan nol koma tujuh lima.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Cara 1: gambar", 12, W.ungu), kisi("kk", 20, 32, 130, 10, 10)),
      tambah("tujuh", arsir("a1", 20, 32, 130, 10, 10, 0, 0, 7, 10), arsir("a2", 20, 32, 130, 10, 10, 7, 0, 1, 5)),
      tambah("sehingga", pecahan("pq", 214, 76, "75", "100", 20, W.hijau), teks("dq", 214, 130, "= 0,75", 22, W.hijau)),
    ),
    k(
      "Latihan dua: suhu tertinggi di lima provinsi. Sumatra Selatan tiga puluh tujuh koma dua, Sumatra Utara tiga puluh tiga koma tiga, dan Nusa Tenggara Timur tiga puluh enam koma enam.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 2: suhu tertinggi (derajat C)", 11, W.ungu)),
      tambah("Selatan", ...barisTabel("s1", 40, 40, LS, 24, suhu[0], 8.4)),
      tambah("Utara", ...barisTabel("s2", 40, 64, LS, 24, suhu[1], 8.4)),
      tambah("Timur", ...barisTabel("s3", 40, 88, LS, 24, suhu[2], 8.4)),
    ),
    k(
      "Lalu Sulawesi Tengah tiga puluh delapan koma lima, dan Kalimantan Utara tiga puluh enam koma delapan. Urutkan kelimanya dari yang tertinggi.",
      tambah("Sulawesi", ...barisTabel("s4", 40, 112, LS, 24, suhu[3], 8.4)),
      tambah("Kalimantan", ...barisTabel("s5", 40, 136, LS, 24, suhu[4], 8.4)),
    ),
    k(
      "Dari yang tertinggi: Sulawesi Tengah tiga puluh delapan koma lima, Sumatra Selatan, Kalimantan Utara, Nusa Tenggara Timur, dan terakhir Sumatra Utara tiga puluh tiga koma tiga.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Dari yang tertinggi", 12, W.ungu)),
      tambah("Sulawesi", ...barisTabel("u1", 40, 40, LS, 24, suhuUrut[0], 8.4, W.mint)),
      tambah("Sumatra", ...barisTabel("u2", 40, 64, LS, 24, suhuUrut[1], 8.4)),
      tambah("Kalimantan", ...barisTabel("u3", 40, 88, LS, 24, suhuUrut[2], 8.4)),
      tambah("Nusa", ...barisTabel("u4", 40, 112, LS, 24, suhuUrut[3], 8.4)),
      tambah("terakhir", ...barisTabel("u5", 40, 136, LS, 24, suhuUrut[4], 8.4)),
    ),
  ],
};

/* ------------------------------ 2. Latihan 3 dan 4: lompat jauh dan nilai gizi ------------------------------ */
/** Batang banding mendatar: panjang sebanding dengan nilai (px per satuan `s`). */
const batang = (id: string, x: number, y: number, nilai: number, s: number, label: string, warna: string) => [teks(`${id}-n`, x - 4, y + 9, label, 8, W.biru, { anchor: "end" }), kotak(`${id}-b`, x, y, Math.max(2, nilai * s), 13, warna, W.biru, { rx: 2 })];
const gizi = [
  ["Protein", "1,3 g"],
  ["Lemak total", "5,4 g"],
  ["Karbohidrat", "28,6 g"],
  ["Serat pangan", "2,7 g"],
  ["Natrium", "88,6 mg"],
];

export const ADEGAN_LATIHAN13B: AdeganStory = {
  id: "latihan13-lompat-gizi",
  judul: "Latihan 3 dan 4: lompat jauh dan nilai gizi",
  sumber: "Materi: Latihan 3 dan 4",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k6b1c-materi-3.ts:2"),
  ketukan: [
    k(
      "Latihan tiga: lomba lompat jauh. Arman melompat tiga koma tujuh meter, Didi dua koma sembilan meter, dan Bayu tiga koma enam meter. Siapa yang paling jauh dan paling dekat?",
      tambah(0, teks("jud", 150, 22, "Latihan 3: lompat jauh (meter)", 12, W.ungu)),
      tambah("Arman", ...batang("j1", 70, 44, 3.7, 52, "Arman 3,7", W.arsir)),
      tambah("Didi", ...batang("j2", 70, 74, 2.9, 52, "Didi 2,9", W.arsir2)),
      tambah("Bayu", ...batang("j3", 70, 104, 3.6, 52, "Bayu 3,6", W.mint)),
    ),
    k(
      "Satuannya tiga, dua, dan tiga. Didi paling pendek. Arman dan Bayu sama-sama tiga, tetapi persepuluhan tujuh lebih besar dari enam. Jadi paling jauh Arman, paling dekat Didi.",
      sorotkan("Arman", "j1-b"),
      sorotkan("Didi", "j2-b"),
      tambah("Jadi", teks("hs", 150, 160, "terjauh: Arman, terdekat: Didi", 12, W.hijau)),
    ),
    k(
      "Latihan empat: label nilai gizi. Protein satu koma tiga gram, lemak total lima koma empat, karbohidrat dua puluh delapan koma enam, serat pangan dua koma tujuh, dan natrium delapan puluh delapan koma enam miligram.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 4: Informasi Nilai Gizi", 12, W.ungu)),
      tambah("protein", ...barisTabel("z1", 60, 36, [110, 80], 22, gizi[0], 8.6)),
      tambah("lemak", ...barisTabel("z2", 60, 58, [110, 80], 22, gizi[1], 8.6)),
      tambah("karbohidrat", ...barisTabel("z3", 60, 80, [110, 80], 22, gizi[2], 8.6)),
      tambah("serat", ...barisTabel("z4", 60, 102, [110, 80], 22, gizi[3], 8.6)),
      tambah("natrium", ...barisTabel("z5", 60, 124, [110, 80], 22, gizi[4], 8.6)),
    ),
    k(
      "Angka natrium delapan puluh delapan koma enam tampak paling besar, tetapi satuannya miligram. Satu gram sama dengan seribu miligram, jadi delapan puluh delapan koma enam miligram adalah nol koma nol delapan delapan enam gram.",
      sorotkan("natrium", "z5-s0", "z5-s1"),
      tambah("seribu", teks("kv", 150, 176, "1 g = 1000 mg", 11, W.merah)),
      tambah("adalah", teks("kv2", 150, 194, "88,6 mg = 0,0886 g", 12, W.hijau)),
    ),
    k(
      "Setelah satuannya sama, zat terbesar adalah karbohidrat, dua puluh delapan koma enam gram, dan zat terkecil adalah natrium. Itulah urutannya.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Semua dalam gram", 12, W.ungu)),
      tambah("karbohidrat", ...batang("g1", 90, 38, 28.6, 6, "karbohidrat 28,6", W.arsir)),
      tambah("Setelah", ...batang("g2", 90, 62, 5.4, 6, "lemak 5,4", W.arsir2)),
      tambah("terkecil", ...batang("g3", 90, 86, 0.0886, 6, "natrium 0,0886", W.merah)),
      tambah("Itulah", teks("gk", 150, 130, "terbesar: karbohidrat", 11, W.hijau), teks("gk2", 150, 150, "terkecil: natrium", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Uji 1 sampai 5 ------------------------------ */
export const ADEGAN_UJI: AdeganStory = {
  id: "refleksi-uji",
  judul: "Uji 1 sampai 5",
  sumber: "Materi: Uji 1 sampai 5",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k6b1c-materi-3.ts:3"),
  ketukan: [
    k(
      "Uji satu: Pak Arman menempuh enam ratus tiga puluh kilometer dan istirahat setelah dua per lima perjalanan. Enam ratus tiga puluh dibagi lima sama dengan seratus dua puluh enam, lalu dikali dua jadi dua ratus lima puluh dua.",
      tambah(0, teks("jud", 150, 22, "Uji 1: 2/5 dari 630 km", 12, W.ungu)),
      tambah("menempuh", pita("jb", 30, 44, 240, 40, 5), teks("jt", 150, 100, "630 km", 11)),
      tambah("dua", arsirPita("ja", 30, 44, 240, 40, 5, 0, 2)),
      tambah("dibagi", teks("j1", 150, 130, "630 : 5 = 126", 13)),
      tambah("dikali", teks("j2", 150, 152, "126 x 2 = 252 km", 14, W.hijau)),
    ),
    k(
      "Uji dua: Upe menyelesaikan tiga perempat dari seratus porsi nasi kotak. Satu per empat dari seratus adalah dua puluh lima, jadi tiga perempat adalah tujuh puluh lima porsi.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Uji 2: 3/4 dari 100 porsi", 12, W.ungu)),
      tambah("Upe", emo("nk", 40, 74, "🍱", 28), pita("nb", 70, 50, 200, 36, 4)),
      tambah("tiga", arsirPita("na", 70, 50, 200, 36, 4, 0, 3)),
      tambah("lima", teks("n1", 150, 120, "100 : 4 = 25", 13)),
      tambah("tujuh", teks("n2", 150, 144, "25 x 3 = 75 porsi", 14, W.hijau)),
    ),
    k(
      "Uji tiga: keluarga Dias makan dua per tiga kilogram beras sehari. Persediaan lima puluh kilogram akan habis dalam lima puluh kali tiga per dua, yaitu tujuh puluh lima hari.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Uji 3: 50 kg dibagi 2/3 kg", 12, W.ungu)),
      tambah("beras", emo("bs", 150, 66, "🍚", 30)),
      tambah("Persediaan", teks("m1", 150, 104, "50 : 2/3", 14)),
      tambah("kali", teks("m2", 150, 128, "= 50 x 3/2", 14)),
      tambah("tujuh", teks("m3", 150, 154, "= 75 hari", 16, W.hijau)),
    ),
    k(
      "Uji empat: Rania membagi lima per delapan potong kue ke empat kotak. Tiap kotak mendapat lima per delapan dibagi empat, yaitu lima per tiga puluh dua.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Uji 4: 5/8 dibagi 4 kotak", 12, W.ungu)),
      tambah("Rania", emo("kk", 150, 62, "🍰", 28)),
      tambah("kotak", teks("q1", 150, 100, "5/8 : 4 = 5/8 x 1/4", 13)),
      tambah("tiga", teks("q2", 150, 130, "= 5/32 potong", 16, W.hijau)),
    ),
    k(
      "Uji lima: Pak Made mengecat dinding seluas lima dan empat per lima meter persegi. Empat per lima sama dengan delapan per sepuluh, yaitu nol koma delapan, jadi luasnya lima koma delapan.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Uji 5: ubah ke desimal", 12, W.ungu)),
      tambah("Made", teks("w1", 150, 62, "5 4/5 m2", 18)),
      tambah("Empat@2", teks("w2", 150, 92, "4/5 = 8/10 = 0,8", 14)),
      tambah("luasnya", teks("w3", 150, 126, "5 + 0,8 = 5,8 m2", 18, W.hijau)),
      ubah("luasnya", { id: "w1", warna: W.merah }),
    ),
  ],
};

/* ------------------------------ 4. Tantangan ------------------------------ */
export const ADEGAN_PENGAYAAN: AdeganStory = {
  id: "pengayaan-akhir",
  judul: "Tantangan: pecahan kali pecahan, pecahan bagi pecahan, desimal tak berhenti",
  sumber: "Materi: Tantangan",
  latar: "#F5F3FF",
  kutipan: kutipanLokal("k6b1c-materi-3.ts:4"),
  ketukan: [
    k(
      "Tantangan satu: tangki air Igil terisi setengah, lalu sepertiga dari isinya dipakai. Bagi setengah menjadi tiga bagian sama besar, ambil satu, yaitu seperenam.",
      tambah(0, teks("jud", 150, 22, "Tantangan 1: 1/3 dari 1/2", 12, W.ungu)),
      tambah("tangki", pita("tk", 40, 44, 220, 56, 2)),
      tambah("setengah", arsirPita("tk1", 40, 44, 220, 56, 2, 0, 1, W.arsir2)),
      tambah("tiga@2", garis("g3a", 40 + 110 / 3, 44, 0, 56, W.biru, 1.4), garis("g3b", 40 + 220 / 3, 44, 0, 56, W.biru, 1.4)),
      tambah("satu@2", arsirPita("tk2", 40, 44, 220, 56, 6, 0, 1, W.arsir)),
      tambah("seperenam", teks("tk3", 150, 130, "1/3 dari 1/2 = 1/6", 16, W.hijau)),
    ),
    k(
      "Tantangan dua: tiga gelas air memenuhi dua per tiga botol. Satu per tiga botol butuh tiga per dua gelas, sehingga satu botol butuh sembilan per dua gelas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tantangan 2: 3 gelas = 2/3 botol", 12, W.ungu)),
      tambah("gelas", emo("gl", 50, 80, "🥛", 30), teks("glt", 50, 100, "3 gelas", 8.4)),
      tambah("botol", pita("bt", 110, 50, 150, 40, 3), arsirPita("bta", 110, 50, 150, 40, 3, 0, 2, W.arsir2)),
      tambah("Satu", teks("bg1", 185, 120, "1/3 botol = 3/2 gelas", 10.4)),
      tambah("sembilan", teks("bg2", 185, 144, "1 botol = 3 x 3/2 = 9/2 gelas", 10.4, W.hijau)),
    ),
    k(
      "Tantangan tiga: setengah gelas memenuhi tiga per empat botol. Seperempat botol butuh seperenam gelas, jadi satu botol butuh empat per enam, yaitu dua per tiga gelas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tantangan 3: 1/2 gelas = 3/4 botol", 12, W.ungu)),
      tambah("setengah", pita("bq", 40, 44, 220, 40, 4), arsirPita("bqa", 40, 44, 220, 40, 4, 0, 3, W.arsir2)),
      tambah("Seperempat", teks("bk1", 150, 110, "1/4 botol = 1/6 gelas", 12)),
      tambah("jadi", teks("bk2", 150, 136, "1 botol = 4 x 1/6 = 4/6 = 2/3 gelas", 11, W.hijau)),
    ),
    k(
      "Kesimpulannya, membagi pecahan dengan pecahan sama dengan mengalikan dengan kebalikan pembagi. Secara umum, a per b dibagi c per d sama dengan a per b kali d per c.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kesimpulan", 13, W.ungu)),
      tambah("Kesimpulannya", kartu("ks", 20, 44, 260, 44, W.krem, ["bagi pecahan = kali kebalikan", "pembagi"], 9.4)),
      tambah("umum", teks("kf", 150, 130, "a/b : c/d = a/b x d/c", 15, W.hijau)),
    ),
    k(
      "Tantangan empat: Rani punya sepertiga liter jus jeruk dan seperenam liter jus jambu. Bentuk desimalnya nol koma tiga tiga tiga dan seterusnya, serta nol koma satu enam enam dan seterusnya. Angkanya tidak pernah berhenti.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tantangan 4: desimal tak berhenti", 12, W.ungu)),
      tambah("jus", emo("j1", 70, 70, "🧃", 28), teks("j1t", 70, 88, "1/3 liter jeruk", 8.4), emo("j2", 230, 70, "🧃", 28), teks("j2t", 230, 88, "1/6 liter jambu", 8.4)),
      tambah("desimalnya", teks("d1", 70, 130, "0,3333...", 16, W.hijau), teks("d2", 230, 130, "0,1666...", 16, W.hijau)),
      tambah("berhenti", teks("d3", 150, 176, "angkanya terus berulang", 11, W.merah)),
    ),
  ],
};
