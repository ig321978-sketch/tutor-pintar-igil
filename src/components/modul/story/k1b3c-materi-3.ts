import type { AdeganStory } from "./logika-story";
import { W, benda, emo, judul, kartu, kartuAngka, teks } from "./k1b3c-gambar";
import { bersih, hapus, k, rangkai, sorotkan, tambah, ubah } from "./k1b3c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";

/* ------------------------------ 1. Menyusun keluarga bilangan di layar ------------------------------ */
const SUARA_U1 = "Sekarang giliranmu di layar. Di teras ada enam anak yang duduk, dan dua anak yang bersepeda.";
const SUARA_U2 = "Ketuk kartu bilangan untuk membuat keluarga bilangan. Ketuk dua, enam, dan delapan.";
const SUARA_U3 = "Susun dua kalimat penjumlahan dari kartu. Enam ditambah dua sama dengan delapan. Dua ditambah enam sama dengan delapan.";
const SUARA_U4 = "Lalu susun dua kalimat pengurangan. Delapan kurang dua sama dengan enam. Delapan kurang enam sama dengan dua.";
const SUARA_U5 = "Itu satu keluarga bilangan, dua tambah dan dua kurang, dari dua, enam, dan delapan. Ketuk tombol suara untuk mendengar lagi.";
const UBIN = [2, 4, 6, 8, 10];

export const ADEGAN_SUSUN: AdeganStory = {
  id: "susun-layar",
  judul: "Menyusun keluarga bilangan di layar",
  sumber: "Materi: menyusun keluarga bilangan",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_U1,
      bersih(0),
      tambah(0, judul("Anak-anak di teras")),
      tambah("enam", ...[0, 1, 2, 3, 4, 5].map((i) => emo(`ua${i}`, 40 + 44 * i, 84, ANAK, 26))),
      tambah("bersepeda.", ...[0, 1].map((i) => emo(`ub${i}`, 110 + 80 * i, 140, "\u{1F6B2}", 32))),
    ),
    k(
      SUARA_U2,
      hapus(0, ...[0, 1, 2, 3, 4, 5].map((i) => `ua${i}`), "ub0", "ub1"),
      tambah(0, judul("Pilih tiga kartu bilangan"), ...UBIN.flatMap((v, i) => kartuAngka(`n${v}`, 26 + 52 * i, 100, String(v), W.krem, 40, 34, 20))),
      sorotkan("dua,", "n2-k"),
      sorotkan("enam,", "n6-k"),
      sorotkan("delapan.", "n8-k"),
    ),
    k(
      SUARA_U3,
      hapus(0, ...UBIN.flatMap((v) => [`n${v}-k`, `n${v}-t`])),
      tambah(0, judul("Dua kalimat tambah")),
      ...rangkai(SUARA_U3, "sa", 80, ["6", "+", "2", "=", "8"], ["Enam", "ditambah", "dua", "sama", "delapan."], "kartu."),
      ...rangkai(SUARA_U3, "sb", 114, ["2", "+", "6", "=", "8"], ["Dua", "ditambah", "enam", "sama", "delapan."], "delapan"),
    ),
    k(
      SUARA_U4,
      ubah(0, { id: "jud", isi: "Dua kalimat kurang" }),
      ...rangkai(SUARA_U4, "sc", 148, ["8", "−", "2", "=", "6"], ["Delapan", "kurang", "dua", "sama", "enam."], "pengurangan."),
      ...rangkai(SUARA_U4, "sd", 182, ["8", "−", "6", "=", "2"], ["Delapan", "kurang", "enam", "sama", "dua."], "enam"),
    ),
    k(SUARA_U5, ubah(0, { id: "jud", isi: "Satu keluarga, empat kalimat" }), tambah("Ketuk", emo("sg", 268, 40, "\u{1F50A}", 26)), sorotkan("tombol", "sg")),
  ],
};

/* ------------------------------ 2. Latihan 1: balon Kira ------------------------------ */
const SUARA_L1 = "Latihan satu. Kira punya lima balon merah dan dua balon biru. Itulah keluarga bilangan lima, dua, dan tujuh.";
const SUARA_L2 = "Susun dua kalimat penjumlahan dari kartu. Lima ditambah dua sama dengan tujuh. Dua ditambah lima sama dengan tujuh.";
const SUARA_L3 = "Sekarang pilih kalimat pengurangan yang sekeluarga. Ketuk tujuh kurang lima sama dengan dua.";
const SUARA_L4 = "Betul! Tujuh kurang lima sama dengan dua, dan tujuh kurang dua sama dengan lima. Hebat sekali!";
const BALON = (i: number) => ({ x: 36 + 36 * i, y: 70 });

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: balon Kira",
  sumber: "Materi: latihan balon Kira",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah("lima", ...[0, 1, 2, 3, 4].flatMap((i) => benda("balon", `lm${i}`, BALON(i).x, BALON(i).y, 11, i))),
      tambah("dua", ...[5, 6].flatMap((i) => benda("balon", `lm${i}`, BALON(i).x, BALON(i).y, 11, i))),
    ),
    k(
      SUARA_L2,
      ...rangkai(SUARA_L2, "la", 132, ["5", "+", "2", "=", "7"], ["Lima", "ditambah", "dua", "sama", "tujuh."], "kartu."),
      ...rangkai(SUARA_L2, "lb", 166, ["2", "+", "5", "=", "7"], ["Dua", "ditambah", "lima", "sama", "tujuh."], "tujuh"),
    ),
    k(
      SUARA_L3,
      hapus(0, ...["la", "lb"].flatMap((p) => [0, 1, 2, 3, 4].map((i) => `${p}${i}`))),
      tambah("kalimat", ...kartu("o1", 20, 116, 125, 32, W.langit, ["7 − 5 = 2"], 12), ...kartu("o2", 155, 116, 125, 32, W.pink, ["6 − 2 = 4"], 12)),
      sorotkan("Ketuk", "o1-k"),
    ),
    k(
      SUARA_L4,
      hapus(0, "o2-k", "o2-t0"),
      ubah(0, { id: "o1-k", warna: W.emas }),
      tambah("Betul!", emo("ok", 150, 100, "\u{2705}", 26)),
      tambah("dan", ...kartu("o4", 155, 116, 125, 32, W.hijauMuda, ["7 − 2 = 5"], 12)),
      tambah("Hebat", emo("ow", 150, 190, IGIL, 28)),
    ),
  ],
};

/* ------------------------------ 3. Latihan 2: kue di meja ------------------------------ */
const SUARA_M1 = "Latihan dua. Ada sembilan kue di meja. Sebagian kue dimakan, dan tinggal lima kue. Berapa kue yang dimakan?";
const SUARA_M2 = "Pikirkan: lima ditambah berapa sama dengan sembilan. Pakai kebalikan, sembilan kurang lima.";
const SUARA_M3 = "Sembilan kurang lima sama dengan empat. Jadi empat kue yang dimakan. Ketuk jawaban empat di layar.";
const SUARA_M4 = "Periksa: lima ditambah empat sama dengan sembilan. Cocok! Hebat sekali!";
const KUE = (i: number) => (i < 5 ? { x: 50 + 50 * i, y: 70 } : { x: 75 + 50 * (i - 5), y: 116 });

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: kue di meja",
  sumber: "Materi: latihan kue di meja",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah("sembilan", ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => emo(`ku${i}`, KUE(i).x, KUE(i).y, "\u{1F370}", 26))),
      ubah("tinggal", ...[5, 6, 7, 8].map((i) => ({ id: `ku${i}`, op: 0.3 }))),
      tambah("Berapa", emo("tn", 268, 150, "\u{2753}", 28)),
    ),
    k(
      SUARA_M2,
      hapus(0, "tn"),
      ...rangkai(SUARA_M2, "ma", 150, ["5", "+", "?", "=", "9"], ["lima", "ditambah", "berapa", "sama", "sembilan."], "Pikirkan:"),
      tambah("sembilan@2", ...kartu("mb", 70, 164, 160, 28, W.krem, ["9 − 5 = ?"], 13)),
    ),
    k(
      SUARA_M3,
      hapus(0, "ma0", "ma1", "ma2", "ma3", "ma4", "mb-k", "mb-t0"),
      tambah(0, teks("mc", 150, 142, "9 − 5 = 4", 15, W.merah)),
      tambah("Ketuk", ...[3, 4, 5].flatMap((v, i) => kartuAngka(`jb${v}`, 60 + 70 * i, 152, String(v), W.krem, 40, 34, 20))),
      sorotkan("layar.", "jb4-k"),
    ),
    k(
      SUARA_M4,
      hapus(0, "mc", "jb3-k", "jb3-t", "jb4-k", "jb4-t", "jb5-k", "jb5-t"),
      ubah(0, ...[5, 6, 7, 8].map((i) => ({ id: `ku${i}`, op: 1 }))),
      ...rangkai(SUARA_M4, "md", 160, ["5", "+", "4", "=", "9"], ["lima", "ditambah", "empat", "sama", "sembilan."], "Periksa:"),
      tambah("Cocok!", emo("ok", 268, 160, "\u{2705}", 28)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 3: pilih tanda ------------------------------ */
const SUARA_N1 = "Latihan tiga. Halim punya soal: enam, tanda hilang, dua, sama dengan empat. Tanda apa yang cocok?";
const SUARA_N2 = "Dari enam menjadi empat, hasilnya berkurang. Jadi ketuk tanda kurang.";
const SUARA_N3 = "Susun kalimat: enam kurang dua sama dengan empat. Lalu periksa: empat ditambah dua sama dengan enam.";
const SUARA_N4 = "Betul! Tanda yang cocok adalah tanda kurang. Hebat sekali!";
const TOMBOL = () => [...kartu("bp", 40, 112, 90, 34, W.hijauMuda, ["+ tambah"], 11), ...kartu("bm", 170, 112, 90, 34, W.pink, ["− kurang"], 11)];

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: memilih tanda",
  sumber: "Materi: latihan memilih tanda",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3")),
      ...["6", "○", "2", "=", "4"].map((s, i) => tambah(["enam,", "hilang,", "dua,", "sama", "empat."][i], teks(`nn${i}`, 150 + (i - 2) * 28, 76, s, 22, i === 1 ? W.biru : W.merah))),
      tambah("apa", ...TOMBOL()),
    ),
    k(SUARA_N2, sorotkan("ketuk", "bm-k"), ubah(9, { id: "nn1", isi: "−" })),
    k(
      SUARA_N3,
      hapus(0, "nn0", "nn1", "nn2", "nn3", "nn4", "bp-k", "bp-t0", "bm-k", "bm-t0"),
      ...rangkai(SUARA_N3, "nr", 84, ["6", "−", "2", "=", "4"], ["enam", "kurang", "dua", "sama", "empat."], "kalimat:"),
      ...rangkai(SUARA_N3, "ns", 134, ["4", "+", "2", "=", "6"], ["empat", "ditambah", "dua", "sama", "enam."], "periksa:"),
    ),
    k(SUARA_N4, tambah("Betul!", emo("ok", 262, 84, "\u{2705}", 28)), tambah("Hebat", emo("ow", 150, 186, IGIL, 28)), sorotkan("kurang.", "nr1")),
  ],
};

/* ------------------------------ 5. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Tiga bilangan yang berhubungan adalah satu keluarga bilangan. Dari satu keluarga, lahir empat kalimat.";
const SUARA_Z2 = "Penjumlahan dan pengurangan saling berkebalikan. Penjumlahan boleh bertukar tempat, pengurangan tidak.";
const SUARA_Z3 = "Kita juga bisa memeriksa jawaban dengan kebalikan. Kebalikan juga membantu mencari bilangan yang hilang dan memilih tanda.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya. Teruslah berlatih di layar, ya.";
const LANGKAH = (i: number, isi: string, warna: string) => kartu(`z${i}`, 14, 30 + i * 40, 272, 32, warna, [isi], 10);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("keluarga", ...LANGKAH(0, "1. Satu keluarga, empat kalimat", W.hijauMuda))),
    k(SUARA_Z2, tambah("saling", ...LANGKAH(1, "2. Tambah dan kurang berkebalikan", W.langit)), tambah("boleh", ...LANGKAH(2, "3. Tambah boleh bertukar, kurang tidak", W.pink))),
    k(SUARA_Z3, tambah("memeriksa", ...LANGKAH(3, "4. Periksa, cari yang hilang, pilih tanda", W.krem))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, IGIL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
