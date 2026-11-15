import type { AdeganStory } from "./logika-story";
import { W, deretBilangan, emo, judul, kartu, kartuAngka, pensilW, teks } from "./k1b2c-gambar";
import { hapus, k, langkahDeret, rangkai, redamkan, sorotkan, tambah, ubah, urutKata } from "./k1b2c-bantu";

const ANAK = "\u{1F9D2}";
const BURUNG = "\u{1F426}";
const x = (v: number): number => 33 + 26 * (v - 1);

/* ------------------------------ 1. Menulis kalimat penjumlahan ------------------------------ */
const SUARA_T1 = "Setelah mencari dua bilangan, kita tulis kalimat penjumlahan. Kita pakai cerita burung tadi: empat burung, datang lagi dua burung.";
const SUARA_T2 = "Tulis bilangan pertama, yaitu empat. Lalu tulis tanda tambah. Lalu tulis bilangan kedua, yaitu dua.";
const SUARA_T3 = "Lalu tulis tanda sama dengan. Tanda ini menunjukkan bahwa hasilnya akan kita tulis di sebelah kanan.";
const SUARA_T4 = "Terakhir, tulis hasilnya, yaitu enam. Jadi empat ditambah dua sama dengan enam.";
const SUARA_T5 = "Ayo baca bersama suara guru. Empat ditambah dua sama dengan enam. Ucapkan juga, ya!";
const KOTAK_T = (i: number, isi: string) => kartuAngka(`t${i}`, 14 + i * 56, 66, isi, isi === "+" || isi === "=" ? W.krem : i < 2 ? W.merahMuda : i === 2 ? W.hijauMuda : W.emas, 48, 56, 28);

export const ADEGAN_TULIS: AdeganStory = {
  id: "tulis-kalimat",
  judul: "Menulis kalimat penjumlahan",
  sumber: "Materi: menulis kalimat penjumlahan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Menulis kalimat penjumlahan")),
      tambah("empat", ...[0, 1, 2, 3].map((i) => emo(`tb${i}`, 30 + 28 * i, 96, BURUNG, 22))),
      tambah("lagi", teks("tp", 150, 96, "+", 22, W.biru)),
      tambah("dua", ...[4, 5].map((i) => emo(`tb${i}`, 186 + 28 * (i - 4), 96, BURUNG, 22))),
    ),
    k(
      SUARA_T2,
      hapus(0, "tb0", "tb1", "tb2", "tb3", "tb4", "tb5", "tp"),
      tambah("empat.", ...KOTAK_T(0, "4")),
      tambah("tanda", ...KOTAK_T(1, "+")),
      tambah("dua@2", ...KOTAK_T(2, "2")),
    ),
    k(SUARA_T3, tambah("sama", ...KOTAK_T(3, "=")), tambah("kanan.", emo("pk", 262, 150, "➡️", 26))),
    k(SUARA_T4, hapus(0, "pk"), tambah("enam.", ...KOTAK_T(4, "6")), sorotkan("enam.", "t4-k")),
    k(
      SUARA_T5,
      redamkan(0, "t4-k"),
      sorotkan("Empat", "t0-k"),
      sorotkan("ditambah", "t1-k"),
      sorotkan("dua", "t2-k"),
      sorotkan("sama@2", "t3-k"),
      sorotkan("enam.", "t4-k"),
      tambah("Ucapkan", emo("sp", 150, 160, "\u{1F5E3}️", 30)),
    ),
  ],
};

/* ------------------------------ 2. Kalimat jawaban ------------------------------ */
const SUARA_J1 = "Sesudah menulis kalimat penjumlahan, kita masih harus menjawab pertanyaan ceritanya. Pertanyaannya adalah, semua ada berapa burung?";
const SUARA_J2 = "Jawabannya enam. Tetapi kalau hanya menulis enam, jawabannya belum lengkap. Kita tidak tahu, enam apa.";
const SUARA_J3 = "Jawaban yang lengkap menyebut hasilnya dan nama bendanya. Semuanya ada enam burung.";
const SUARA_J4 = "Kalimat jawaban punya tiga bagian: kata semuanya ada, hasilnya, dan nama benda.";
const SUARA_J5 = "Sekarang lengkapi jawabannya di layar. Semuanya ada enam, lalu ketuk nama bendanya. Burung, bukan pensil. Benar!";

export const ADEGAN_JAWAB: AdeganStory = {
  id: "kalimat-jawaban",
  judul: "Menjawab dengan kalimat lengkap",
  sumber: "Materi: kalimat jawaban",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Menjawab pertanyaan"), teks("pj", 150, 50, "4 + 2 = 6", 18, W.merah)), tambah("Pertanyaannya", ...kartu("jq", 40, 66, 220, 30, W.krem, ["Semua ada berapa burung?"], 10))),
    k(SUARA_J2, tambah("hanya", ...kartu("jx", 90, 106, 120, 34, W.merahMuda, ["6"], 22), emo("sl", 238, 132, "❌", 24)), tambah("apa.", emo("ta", 62, 132, "❓", 26))),
    k(SUARA_J3, hapus(0, "jx-k", "jx-t0", "sl", "ta"), tambah("Semuanya", ...kartu("jl", 30, 106, 240, 34, W.hijauMuda, ["Semuanya ada 6 burung."], 12), emo("ok", 262, 100, "✅", 24))),
    k(
      SUARA_J4,
      tambah("kata", ...kartu("b1", 14, 148, 110, 24, W.langit, ["Semuanya ada"], 9)),
      tambah("hasilnya,", ...kartu("b2", 130, 148, 40, 24, W.emas, ["6"], 12)),
      tambah("benda.", ...kartu("b3", 176, 148, 110, 24, W.pink, ["burung"], 9)),
    ),
    k(
      SUARA_J5,
      hapus(0, "b1-k", "b1-t0", "b2-k", "b2-t0", "b3-k", "b3-t0"),
      tambah("ketuk", ...kartu("c1", 40, 152, 100, 28, W.hijauMuda, ["burung"], 11), ...kartu("c2", 160, 152, 100, 28, W.merahMuda, ["pensil"], 11)),
      sorotkan("Burung,", "c1-k"),
      ubah("Benar!", { id: "c1-k", warna: W.emas }),
    ),
  ],
};

/* ------------------------------ 3. Soal pensil Halim ------------------------------ */
const SUARA_P1 = "Mari kita kerjakan satu soal cerita dari awal. Halim punya tiga pensil merah dan empat pensil hijau. Semua pensil Halim ada berapa?";
const SUARA_P2 = "Langkah pertama, baca dan cari bilangan. Bilangannya tiga dan empat. Kata petunjuknya, juga.";
const SUARA_P3 = "Langkah kedua, tulis kalimat penjumlahan. Tiga ditambah empat sama dengan tujuh.";
const SUARA_P4 = "Langkah ketiga, tulis kalimat jawaban. Halim punya tujuh pensil.";
const SUARA_P5 = "Langkah keempat, periksa jawabannya. Tukar tempat: empat ditambah tiga juga sama dengan tujuh. Cocok!";
const BAGIAN_P = ["3", "+", "4", "=", "7"];

export const ADEGAN_PENSIL: AdeganStory = {
  id: "soal-pensil",
  judul: "Soal cerita: pensil Halim",
  sumber: "Materi: soal cerita pensil Halim",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Soal cerita Halim"), emo("hl", 150, 62, ANAK, 26)),
      tambah("merah", ...[0, 1, 2].flatMap((i) => pensilW(`pm${i}`, 40 + 22 * i, 58, "#F87171"))),
      tambah("hijau", ...[0, 1, 2, 3].flatMap((i) => pensilW(`ph${i}`, 170 + 22 * i, 58, "#4ADE80"))),
      tambah("Semua", ...kartu("pq", 40, 80, 220, 26, W.krem, ["Semua pensil Halim ada berapa?"], 9.4)),
    ),
    k(SUARA_P2, tambah("pertama,", ...kartu("l1", 14, 112, 272, 24, W.hijauMuda, ["Langkah 1: baca dan cari"], 9.4)), tambah("tiga", ...kartuAngka("n1", 70, 140, "3", W.merahMuda, 36, 28, 18)), tambah("empat.", ...kartuAngka("n2", 194, 140, "4", W.hijauMuda, 36, 28, 18))),
    k(
      SUARA_P3,
      hapus(0, "l1-k", "l1-t0", "n1-k", "n1-t", "n2-k", "n2-t"),
      tambah("kedua,", ...kartu("l2", 14, 112, 272, 24, W.langit, ["Langkah 2: tulis kalimat penjumlahan"], 9.4)),
      ...rangkai(SUARA_P3, "ps", 170, BAGIAN_P, ["Tiga", "ditambah", "empat", "sama", "tujuh."], "penjumlahan."),
    ),
    k(SUARA_P4, hapus(0, "l2-k", "l2-t0"), tambah("ketiga,", ...kartu("l3", 14, 112, 272, 24, W.pink, ["Langkah 3: tulis kalimat jawaban"], 9.4)), tambah("Halim", ...kartu("pj", 50, 174, 200, 24, W.hijauMuda, ["Halim punya 7 pensil."], 10.4))),
    k(SUARA_P5, hapus(0, "l3-k", "l3-t0"), tambah("keempat,", ...kartu("l4", 14, 112, 272, 24, W.krem, ["Langkah 4: periksa"], 9.4)), tambah("Tukar", teks("pt", 150, 148, "4 + 3 = 7", 16, W.hijau)), tambah("Cocok!", emo("ok", 262, 140, "✅", 26))),
  ],
};

/* ------------------------------ 4. Soal anak di taman ------------------------------ */
const SUARA_A1 = "Satu soal lagi. Ada lima anak di taman, lalu datang lagi tiga anak. Semua anak ada berapa?";
const SUARA_A2 = "Cari bilangannya, lima dan tiga. Kata petunjuknya, datang lagi. Jadi kita memakai tanda tambah.";
const SUARA_A3 = "Tulis kalimat penjumlahannya. Lima ditambah tiga sama dengan delapan.";
const SUARA_A4 = "Tulis kalimat jawabannya. Di taman ada delapan anak.";
const SUARA_A5 = "Sekarang periksa. Dari lima, kita maju: enam, tujuh, delapan. Hasilnya sama, yaitu delapan.";

export const ADEGAN_ANAK: AdeganStory = {
  id: "soal-anak",
  judul: "Soal cerita: anak di taman",
  sumber: "Materi: soal cerita anak di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Anak di taman")),
      tambah("lima", ...[0, 1, 2, 3, 4].map((i) => emo(`ka${i}`, 50 + 45 * i, 58, ANAK, 24))),
      tambah("tiga", ...[0, 1, 2].map((i) => emo(`kb${i}`, 95 + 45 * i, 94, ANAK, 24, { sorot: true }))),
    ),
    k(SUARA_A2, tambah("bilangannya,", ...kartu("a1", 20, 116, 110, 28, W.merahMuda, ["5 anak"], 11)), tambah("tiga.", ...kartu("a2", 170, 116, 110, 28, W.hijauMuda, ["3 anak"], 11)), tambah("tambah.", teks("pl", 150, 137, "+", 22, W.biru))),
    k(SUARA_A3, ...rangkai(SUARA_A3, "as", 172, ["5", "+", "3", "=", "8"], ["Lima", "ditambah", "tiga", "sama", "delapan."], "penjumlahannya.")),
    k(SUARA_A4, tambah("jawabannya.", ...kartu("aj", 50, 174, 200, 24, W.hijauMuda, ["Di taman ada 8 anak."], 10))),
    k(
      SUARA_A5,
      hapus(0, "a1-k", "a1-t0", "a2-k", "a2-t0", "pl"),
      tambah(0, ...deretBilangan("ak", 112), emo("up", x(5), 108, ANAK, 20)),
      ...langkahDeret(SUARA_A5, [5, 6, 7, 8], "ak", 112, "periksa."),
    ),
  ],
};

/* ------------------------------ 5. Satu cerita, dua pertanyaan ------------------------------ */
const SUARA_S1 = "Satu cerita bisa punya dua pertanyaan. Di jalan ada tiga sepeda dan satu becak.";
const SUARA_S2 = "Pertanyaan pertama, semua kendaraan ada berapa? Tiga ditambah satu sama dengan empat. Ada empat kendaraan.";
const SUARA_S3 = "Pertanyaan kedua, semua roda ada berapa? Sepeda punya dua roda. Becak punya tiga roda.";
const SUARA_S4 = "Kita hitung roda sepeda satu per satu. Dua, empat, enam. Jadi tiga sepeda punya enam roda.";
const SUARA_S5 = "Sekarang gabungkan dengan roda becak. Enam ditambah tiga sama dengan sembilan. Jadi semua roda ada sembilan.";
const SUARA_S6 = "Satu cerita, dua pertanyaan, dua jawaban. Ada empat kendaraan, dan ada sembilan roda. Hebat!";
const posS4 = urutKata(SUARA_S4, ["dua", "empat", "enam"], "satu.");

export const ADEGAN_SEPEDA: AdeganStory = {
  id: "sepeda-becak",
  judul: "Satu cerita, dua pertanyaan",
  sumber: "Materi: satu cerita, dua pertanyaan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Sepeda dan becak")), tambah("tiga", ...[0, 1, 2].map((i) => emo(`sp${i}`, 50 + 40 * i, 82, "\u{1F6B2}", 30))), tambah("becak.", emo("bc", 200, 82, "\u{1F6FA}", 30))),
    k(SUARA_S2, tambah("pertama,", ...kartu("kd", 40, 134, 220, 26, W.hijauMuda, ["kendaraan: 3 + 1 = 4"], 10)), tambah("empat.", emo("ok1", 276, 150, "✅", 18))),
    k(SUARA_S3, tambah("Sepeda", ...[0, 1, 2].map((i) => teks(`r${i}`, 50 + 40 * i, 96, "2 roda", 8.4, W.merah))), tambah("Becak", teks("rb", 200, 96, "3 roda", 8.4, W.merah))),
    k(
      SUARA_S4,
      ...[0, 1, 2].map((i) => tambah(posS4[i], teks(`rt${i}`, 50 + 40 * i, 52, String(2 * (i + 1)), 12, W.merah))),
      tambah("Jadi", ...kartu("rs", 40, 104, 220, 24, W.langit, ["3 sepeda: 6 roda"], 10)),
    ),
    k(SUARA_S5, ...rangkai(SUARA_S5, "rj", 186, ["6", "+", "3", "=", "9"], ["Enam", "ditambah", "tiga", "sama", "sembilan"], "becak.")),
    k(SUARA_S6, tambah("Hebat!", emo("ow", 262, 186, "\u{1F989}", 28), emo("ok2", 38, 186, "✅", 26))),
  ],
};
