import type { AdeganStory } from "./logika-story";
import { PX, W, bagan, bingkai, emo, isiBingkai, judul, kartu, kelompok, petak, silang, teks } from "./k1b3b-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b3b-bantu";

const ANAK = "\u{1F9D2}";
const BIRU_MUDA = "#93C5FD";

/* ------------------------------ 1. Bingkai sepuluh ------------------------------ */
const SUARA_G1 = "Cara yang ketiga memakai bingkai sepuluh. Bingkai ini punya sepuluh petak.";
const SUARA_G2 = "Wei punya sepuluh bola. Tujuh bola berwarna merah, jadi tujuh petak terisi titik merah.";
const SUARA_G3 = "Tiga petak masih kosong. Tiga bola berwarna biru.";
const SUARA_G4 = "Sepuluh dikurangi tujuh sama dengan tiga, karena tiga petak masih kosong.";
const SUARA_G5 = "Kita juga bisa membaca kalimat yang lain. Sepuluh dikurangi tiga sama dengan tujuh, karena tujuh petak terisi.";
const SUARA_G6 = "Bingkai sepuluh membantu kita melihat sisa dengan cepat. Petak kosong dan petak terisi jika digabung menjadi sepuluh.";
const DOT7 = [0, 1, 2, 3, 4, 5, 6].map((i) => `bk-t${i}`);

export const ADEGAN_BINGKAI: AdeganStory = {
  id: "bingkai",
  judul: "Bingkai sepuluh: sepuluh dikurangi tujuh",
  sumber: "Materi: pengurangan di bingkai sepuluh",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Bingkai sepuluh")), tambah("bingkai", ...bingkai("bk", 80, 60, 0, 28)), tambah(idx(SUARA_G1, "sepuluh", 2), teks("b10", 150, 142, "10 petak", 14, W.ungu))),
    k(
      SUARA_G2,
      tambah("Tujuh", ...isiBingkai("bk", 80, 60, 0, 7, 28)),
      tambah("terisi", teks("t7", 150, 158, "7 terisi", 11, W.merah)),
    ),
    k(
      SUARA_G3,
      ubah(0, ...[7, 8, 9].map((i) => ({ id: `bk-c${i}`, warna: BIRU_MUDA }))),
      tambah("biru.", teks("t3", 150, 174, "3 kosong", 11, W.biru)),
    ),
    k(SUARA_G4, hapus(0, "b10"), tambah("Sepuluh", teks("ds", 150, 198, "10 − 7 = 3", 22, W.hijau))),
    k(
      SUARA_G5,
      ubah(0, { id: "ds", x: 80, u: 15 }),
      tambah("Sepuluh", teks("d2", 220, 198, "10 − 3 = 7", 15, W.hijau)),
      sorotkan(idx(SUARA_G5, "tujuh", 2), ...DOT7),
    ),
    k(
      SUARA_G6,
      bersih(0),
      tambah(0, judul("Selalu sepuluh"), emo("ow", 150, 52, "\u{1F989}", 36), ...bingkai("bq", 80, 84, 7, 28)),
      ubah(0, ...[7, 8, 9].map((i) => ({ id: `bq-c${i}`, warna: BIRU_MUDA }))),
      tambah("Petak", ...kartu("gz", 30, 156, 240, 30, W.krem, ["kosong dan terisi jadi 10"], 10.5)),
    ),
  ],
};

/* ------------------------------ 2. Pasangan sepuluh ------------------------------ */
const SUARA_S1 = "Sekarang bingkai yang terisi enam. Sepuluh dikurangi enam sama dengan empat.";
const SUARA_S2 = "Terisi empat saja. Sepuluh dikurangi empat sama dengan enam.";
const SUARA_S3 = "Sekarang terisi sembilan. Hanya satu petak yang kosong. Sepuluh dikurangi sembilan sama dengan satu.";
const SUARA_S4 = "Pasangan sepuluh perlu kita ingat. Satu dan sembilan, dua dan delapan, tiga dan tujuh, empat dan enam, lima dan lima.";
const SUARA_S5 = "Dari satu pasangan kita punya dua pengurangan. Sepuluh dikurangi tiga sama dengan tujuh, dan sepuluh dikurangi tujuh sama dengan tiga.";
const PS = ["1 dan 9", "2 dan 8", "3 dan 7", "4 dan 6", "5 dan 5"];
const WP = [W.langit, W.hijauMuda, W.pink, W.krem, W.lavender];
const AT_PS = [idx(SUARA_S4, "satu"), idx(SUARA_S4, "dua"), idx(SUARA_S4, "tiga"), idx(SUARA_S4, "empat"), idx(SUARA_S4, "lima")];

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sepuluh",
  judul: "Pasangan bilangan untuk sepuluh",
  sumber: "Materi: pasangan sepuluh",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bingkai yang berubah"), ...bingkai("bq", 80, 50, 6, 28)),
      tambah("terisi", teks("sl", 150, 128, "terisi 6, kosong 4", 10, W.ungu)),
      tambah("Sepuluh", teks("sd", 150, 172, "10 − 6 = 4", 24, W.hijau)),
    ),
    k(SUARA_S2, hapus(0, "bq-t4", "bq-t5"), ubah(0, { id: "sl", isi: "terisi 4, kosong 6" }), ubah("Sepuluh", { id: "sd", isi: "10 − 4 = 6" })),
    k(
      SUARA_S3,
      tambah(0, ...isiBingkai("bq", 80, 50, 4, 9, 28)),
      ubah("Hanya", { id: "sl", isi: "terisi 9, kosong 1" }),
      ubah("Sepuluh", { id: "sd", isi: "10 − 9 = 1" }),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Pasangan sepuluh")),
      ...PS.map((t, i) => tambah(AT_PS[i], ...kartu(`pq${i}`, 70, 30 + i * 32, 160, 28, WP[i], [t], 12))),
      tambah("lima", teks("p10", 262, 110, "jadi 10", 11, W.merah)),
    ),
    k(
      SUARA_S5,
      bersih(0),
      tambah(0, judul("Satu bagan, dua pengurangan"), ...bagan("sg", 150, 40, "10", "3", "7")),
      tambah("Sepuluh", teks("g1", 80, 190, "10 − 3 = 7", 15, W.hijau)),
      tambah(idx(SUARA_S5, "sepuluh", 2), teks("g2", 220, 190, "10 − 7 = 3", 15, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Memilih cara ------------------------------ */
const SUARA_P1 = "Kita sudah belajar tiga cara mengurangkan. Pertama, pasangan bilangan. Kedua, hitung mundur. Ketiga, bingkai.";
const SUARA_P2 = "Pasangan bilangan cocok kalau kita sudah tahu gabungan dan salah satu sebagiannya.";
const SUARA_P3 = "Hitung mundur cocok kalau pengurangnya kecil, seperti satu, dua, atau tiga langkah.";
const SUARA_P4 = "Bingkai cocok kalau kita mengurangi dari sepuluh. Petak yang kosong langsung memberi jawaban.";
const SUARA_P5 = "Boleh memilih cara yang paling kamu suka. Lalu periksa hasilnya dengan menggabungkan lagi. Pelan-pelan, pasti bisa.";

export const ADEGAN_PILIH: AdeganStory = {
  id: "pilih",
  judul: "Memilih cara yang cocok",
  sumber: "Materi: memilih cara mengurangkan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tiga cara mengurangkan")),
      tambah("Pertama,", ...kartu("c1", 20, 34, 260, 36, W.langit, ["Pasangan bilangan"], 10)),
      tambah("Kedua,", ...kartu("c2", 20, 80, 260, 36, W.hijauMuda, ["Hitung mundur"], 10)),
      tambah("Ketiga,", ...kartu("c3", 20, 126, 260, 36, W.pink, ["Bingkai sepuluh"], 10)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pasangan bilangan"), ...bagan("pq", 150, 44, "8", "3", "?")),
      tambah("sebagiannya.", teks("pt", 150, 178, "gabungan dan satu sebagian", 10, W.ungu)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Hitung mundur")),
      tambah("satu,", ...kartu("hm0", 14, 70, 82, 44, W.langit, ["1 langkah"], 11)),
      tambah("dua,", ...kartu("hm1", 109, 70, 82, 44, W.hijauMuda, ["2 langkah"], 11)),
      tambah("tiga", ...kartu("hm2", 204, 70, 82, 44, W.pink, ["3 langkah"], 11)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Bingkai"), ...bingkai("pb", 80, 50, 7, 28)),
      ubah(0, ...[7, 8, 9].map((i) => ({ id: `pb-c${i}`, warna: BIRU_MUDA }))),
      tambah("kosong", teks("pj", 150, 150, "10 − 7 = 3", 20, W.hijau)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Pilih caramu"), emo("ow", 150, 76, "\u{1F989}", 44)),
      tambah("periksa", ...kartu("pm", 40, 112, 220, 34, W.emas, ["periksa: gabungkan lagi"], 10.5)),
      tambah("Pelan-pelan,", emo("ku", 150, 184, "\u{1F422}", 30)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 1: kue Halim ------------------------------ */
const P8 = [...Array.from({ length: 5 }, (_, i) => ({ x: 50 + i * 50, y: 64 })), ...Array.from({ length: 3 }, (_, i) => ({ x: 50 + i * 50, y: 126 }))];
const SUARA_L1 = "Latihan satu. Halim punya delapan kue di piring. Lima kue dimakan. Berapa kue yang tersisa?";
const SUARA_L2 = "Kita coret lima kue yang sudah dimakan. Satu, dua, tiga, empat, lima.";
const SUARA_L3 = "Sekarang hitung kue yang tersisa. Satu, dua, tiga. Tersisa tiga kue.";
const SUARA_L4 = "Delapan dikurangi lima sama dengan tiga. Kita bisa memeriksa dengan menggabungkan tiga dan lima, jadinya delapan.";
const SUARA_L5 = "Ketuk jawaban yang benar. Pilihannya dua, tiga, atau empat. Tiga yang benar. Hebat sekali!";
const MAKAN = [3, 4, 5, 6, 7];
const AT_COBA = [idx(SUARA_L2, "satu"), idx(SUARA_L2, "dua"), idx(SUARA_L2, "tiga"), idx(SUARA_L2, "empat"), idx(SUARA_L2, "lima", 2)];

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: kue Halim",
  sumber: "Materi: latihan mengurangkan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), tambah("Halim", teks("hl", 262, 24, "Halim", 8.6, W.ungu)), tambah("delapan", ...kelompok("kue", "kq", 8, 0, 0, 0, 10).map((o, i) => ({ ...o, x: P8[i].x, y: P8[i].y + 8 })))),
    k(SUARA_L2, ...MAKAN.map((q, i) => tambah(AT_COBA[i], ...silang(`kx${q}`, P8[q].x, P8[q].y, 10)))),
    k(
      SUARA_L3,
      ubah(0, ...MAKAN.map((q) => ({ id: `kq${q}`, op: 0.3 }))),
      ...hitungAksi(SUARA_L3, "kq", P8.slice(0, 3), "tersisa."),
    ),
    k(SUARA_L4, hapus(0, "tg", "kqn0", "kqn1", "kqn2"), tambah("Delapan", teks("kd", 150, 190, "8 − 5 = 3", 20, W.hijau))),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Ketuk jawabannya")),
      tambah("dua,", ...kartu("o2", 30, 70, 60, 50, W.langit, ["2"], 24)),
      tambah("tiga,", ...kartu("o3", 120, 70, 60, 50, W.langit, ["3"], 24)),
      tambah("empat.", ...kartu("o4", 210, 70, 60, 50, W.langit, ["4"], 24)),
      sorotkan(idx(SUARA_L5, "tiga", 2), "o3-k"),
      tambah("Hebat", emo("ow", 150, 160, "\u{1F989}", 40)),
    ),
  ],
};

/* ------------------------------ 5. Latihan 2: bagan yang kosong ------------------------------ */
const SUARA_D1 = "Latihan dua. Gabungannya delapan. Satu sebagiannya tiga. Berapa sebagian yang satu lagi?";
const SUARA_D2 = "Kita cari dengan pengurangan. Delapan dikurangi tiga sama dengan lima.";
const SUARA_D3 = "Jadi sebagian yang lain adalah lima. Dari bagan ini ada dua pengurangan. Delapan dikurangi lima sama dengan tiga.";
const SUARA_D4 = "Sekarang bagan yang lain. Gabungannya tiga. Satu sebagiannya tiga. Sebagian yang lain adalah nol.";
const SUARA_D5 = "Tiga dikurangi tiga sama dengan nol. Tiga dikurangi nol sama dengan tiga. Hebat sekali!";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: bagan yang kosong",
  sumber: "Materi: latihan bagan pasangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Latihan 2")), tambah("Gabungannya", ...bagan("ld", 150, 40, "8", "3", "?")), sorotkan("lagi?", "ldpb")),
    k(SUARA_D2, redamkan(0, "ldpb"), ubah("lima.", { id: "ldpb-t", isi: "5" }), tambah("Delapan", teks("d1", 150, 190, "8 − 3 = 5", 20, W.hijau))),
    k(SUARA_D3, ubah(0, { id: "d1", x: 80, u: 15 }), tambah("Delapan", teks("d2", 220, 190, "8 − 5 = 3", 15, W.hijau)), sorotkan("dua", "ldpa")),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Bagan yang lain")),
      tambah("Gabungannya", ...bagan("le", 150, 40, "3", "3", "?")),
      ubah("nol.", { id: "lepb-t", isi: "0" }),
    ),
    k(
      SUARA_D5,
      tambah("Tiga", teks("e1", 80, 190, "3 − 3 = 0", 15, W.hijau)),
      tambah(idx(SUARA_D5, "tiga", 3), teks("e2", 220, 190, "3 − 0 = 3", 15, W.hijau)),
      tambah("Hebat", emo("ow", 150, 162, "\u{1F989}", 26)),
    ),
  ],
};

/* ------------------------------ 6. Latihan 3: garis bilangan, bingkai, kalimat sendiri ------------------------------ */
const SUARA_E1 = "Latihan tiga. Kira berdiri di angka tujuh. Kira akan melompat tiga langkah ke belakang.";
const SUARA_E2 = "Ketuk angka satu langkah ke kiri, lagi dan lagi. Enam, lima, empat.";
const SUARA_E3 = "Kira mendarat di angka empat. Tujuh dikurangi tiga sama dengan empat.";
const SUARA_E4 = "Sekarang bingkai sepuluh. Terisi lima petak, jadi lima petak masih kosong. Sepuluh dikurangi lima sama dengan lima.";
const SUARA_E5 = "Sekarang susun kalimat pengurangan sendiri. Ketuk kartu bilangan, lalu kartu pengurang. Hasilnya tidak boleh kurang dari nol.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: mundur, bingkai, dan kalimat sendiri",
  sumber: "Materi: latihan hitung mundur",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Latihan 3"), ...petak()),
      tambah("berdiri", emo("kr", PX(7), 112, ANAK, 22), teks("kk", PX(7), 86, "Kira", 8.6, W.ungu)),
      sorotkan("tujuh.", "pt7"),
      tambah("langkah", teks("lg", 150, 52, "3 langkah ke belakang", 10, W.ungu)),
    ),
    k(
      SUARA_E2,
      redamkan(0, "pt7"),
      ...["Enam,", "lima,", "empat."].flatMap((kata, i) => [ubah(kata, { id: "kr", x: PX(6 - i) }, { id: "kk", x: PX(6 - i) }), tambah(kata, teks(`lm${i}`, PX(6 - i), 160, String(i + 1), 14, W.hijau))]),
    ),
    k(SUARA_E3, sorotkan("empat.", "pt4"), tambah("Tujuh", teks("es", 150, 196, "7 − 3 = 4", 20, W.hijau))),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Bingkai sepuluh"), ...bingkai("lk", 80, 56, 5, 28)),
      tambah("Terisi", teks("lt", 150, 138, "terisi 5, kosong 5", 10, W.ungu)),
      tambah(idx(SUARA_E4, "sepuluh", 2), teks("ed", 150, 180, "10 − 5 = 5", 22, W.hijau)),
    ),
    k(
      SUARA_E5,
      bersih(0),
      tambah(0, judul("Kalimatku sendiri")),
      tambah("kalimat", ...kartu("kx", 14, 36, 44, 38, W.krem, ["?"], 20), teks("kt", 78, 64, "−", 26, W.hijau), ...kartu("ky", 98, 36, 44, 38, W.krem, ["?"], 20), teks("ke", 160, 64, "=", 26, W.hijau), ...kartu("kz", 178, 36, 44, 38, W.krem, ["?"], 20)),
      tambah("bilangan,", ...Array.from({ length: 11 }, (_, i) => kartu(`ch${i}`, 8 + i * 26, 112, 24, 30, W.langit, [String(i)], 12)).flat()),
      tambah("nol.", emo("ow", 150, 178, "\u{1F989}", 30)),
    ),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Pengurangan artinya ada yang pergi, lalu kita cari sisanya. Tandanya kurang dan sama dengan.";
const SUARA_Z2 = "Pasangan bilangan membuat satu bagan menjadi dua pengurangan. Hitung mundur melompat ke arah angka yang lebih kecil.";
const SUARA_Z3 = "Bilangan dikurangi nol tetap sama. Bilangan dikurangi bilangan yang sama menjadi nol. Bingkai sepuluh menunjukkan sisa dari sepuluh.";
const SUARA_Z4 = "Sesudah ini, kerjakan latihan di layar. Ketuk benda, seret ke keranjang, pilih jawaban, lalu ucapkan jawabannya bersama suara guru.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Mari ingat lagi")),
      tambah("Pengurangan", ...kartu("z1", 20, 36, 260, 36, W.langit, ["ada yang pergi, cari sisanya"], 10)),
      tambah(idx(SUARA_Z1, "kurang"), ...kartu("z2", 20, 82, 120, 36, W.hijauMuda, ["−  kurang"], 12)),
      tambah("sama", ...kartu("z3", 160, 82, 120, 36, W.pink, ["=  sama dengan"], 11)),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Dua cara pertama")),
      tambah("Pasangan", ...kartu("y1", 20, 40, 260, 46, W.langit, ["pasangan bilangan", "satu bagan, dua pengurangan"], 10)),
      tambah("Hitung", ...kartu("y2", 20, 100, 260, 46, W.hijauMuda, ["hitung mundur", "ke arah angka yang kecil"], 10)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Tiga hal yang diingat")),
      tambah("Bilangan", ...kartu("x1", 20, 34, 260, 34, W.krem, ["dikurangi nol: tetap sama"], 10)),
      tambah(idx(SUARA_Z3, "bilangan", 2), ...kartu("x2", 20, 78, 260, 34, W.pink, ["dikurangi sama: jadi nol"], 10)),
      tambah("Bingkai", ...kartu("x3", 20, 122, 260, 34, W.hijauMuda, ["bingkai 10: lihat petak kosong"], 10)),
    ),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, judul("Sekarang giliranmu")),
      tambah("Ketuk", emo("w1", 60, 100, "\u{1F446}", 36)),
      tambah("seret", ...kartu("w2", 100, 76, 70, 36, W.emas, ["keranjang"], 10)),
      tambah("pilih", ...kartu("w3", 190, 76, 90, 36, W.langit, ["jawaban"], 10)),
      tambah("ucapkan", emo("w4", 150, 160, "\u{1F4AC}", 40)),
    ),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Hebat sekali!"), emo("ow", 150, 90, "\u{1F989}", 54)), tambah("Sampai", ...kartu("zh", 60, 126, 180, 34, W.emas, ["sampai jumpa!"], 12))),
  ],
};
