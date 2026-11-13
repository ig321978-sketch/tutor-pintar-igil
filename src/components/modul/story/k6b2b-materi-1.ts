import type { AdeganStory } from "./logika-story";
import { W, barisTabel, emo, kartu, kebun, kepalaTabel, kotak, lahan, panah, pengali, rak, sel, garis, teks } from "./k6b2b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b2b-bantu";

/* ------------------------------ 1. Rak polybag dan lahan (hlm. 56 dan 57) ------------------------------ */
export const ADEGAN_POLYBAG: AdeganStory = {
  id: "b2-polybag",
  judul: "Rak polybag dan lahan menanam",
  sumber: "Buku Siswa hlm. 56–57",
  latar: "#F0FDF4",
  kutipan: ["Satu rak dapat memuat 6 polybag", "Berapa polybag yang dapat ditampung jika memiliki 3 rak", "diperkirakan dapat menampung 12 bibit tanaman"],
  ketukan: [
    k(
      "Sub-Bab B membahas kesamaan rasio. Kita mulai dari tanaman. Selain pot, kita bisa memakai polybag sebagai media tanam.",
      tambah(0, teks("jud", 150, 26, "B. Konsep Kesamaan Rasio", 12, W.ungu)),
      tambah("pot,", kotak("pot", 50, 92, 44, 34, "#FB923C", W.coklat, { rx: 6 }), teks("pott", 72, 144, "pot", 9)),
      tambah("polybag", kotak("pb", 190, 90, 40, 46, W.hitam, "#111827", { rx: 8 }), emo("pbe", 210, 92, "🌱", 30), teks("pbt", 210, 154, "polybag", 9)),
    ),
    k(
      "Polybag disusun di rak. Satu rak dapat memuat 6 polybag.",
      bersih(0),
      tambah("rak.", rak("r1", 20, 56)),
      tambah("6", teks("l1", 50, 126, "1 rak = 6 polybag", 8.6, W.hijau)),
    ),
    k(
      "Berapa polybag yang dapat ditampung jika kita punya 3 rak? Tiga rak, masing-masing 6 polybag, jadi 18 polybag.",
      tambah("3", rak("r2", 120, 56), rak("r3", 220, 56)),
      tambah("18", teks("l2", 150, 148, "6 + 6 + 6 = 18", 11, W.merah), teks("l3", 150, 166, "3 rak = 18 polybag", 9.5, W.hijau)),
    ),
    k(
      "Itulah dasar kesamaan rasio: banyaknya rak berubah, tetapi perbandingan 1 rak dengan 6 polybag tetap sama.",
      tambah("perbandingan", kotak("ban", 50, 176, 200, 24, "#FEF9C3", W.biru, { rx: 8 }), teks("bant", 150, 193, "1 : 6 = 3 : 18", 12)),
      sorotkan(15, "ban"),
    ),
    k(
      "Sekarang Eksplorasi 2.3. Siswa kelas VI membawa bibit dalam polybag, dan polybag di lahan harus diberi jarak.",
      bersih(0),
      tambah("Eksplorasi", teks("jud2", 150, 26, "Eksplorasi 2.3: Lahan untuk Menanam", 10, W.ungu)),
      tambah("membawa", lahan("lh", 70, 56, 160, 106)),
      tambah("polybag", kebun("pk", 92, 72, 4, 3, 36, 30)),
      tambah("jarak.", garis("jr", 104, 80, 24, 0, W.merah, 2, { putus: true }), teks("jrt", 116, 70, "jarak", 6.5, W.merah)),
    ),
    k(
      "Pak Wayan menjelaskan bahwa lahan seluas 10 meter persegi diperkirakan dapat menampung 12 bibit tanaman.",
      sorotkan("lahan", "lh-f"),
      tambah("10", teks("lm", 150, 182, "lahan 10 m²", 11, W.coklat)),
      tambah("12", teks("lb", 150, 200, "12 bibit", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 2. Pertanyaan a, b, c Eksplorasi 2.3 (hlm. 57 sampai 59) ------------------------------ */
const TX = 50;
const TY = 36;
const TW = 70;
const TH = 24;
const sebelah = (id: string, dari: number, ke: number, label: string) => {
  const y0 = TY + (dari + 1) * TH + TH / 2;
  const y1 = TY + (ke + 1) * TH + TH / 2;
  return [panah(`${id}-p`, TX - 8, y0, 0, y1 - y0, W.merah, 2, { gambar: true }), teks(`${id}-t`, TX - 14, (y0 + y1) / 2 + 3, label, 9.5, W.merah, { anchor: "end" })];
};

export const ADEGAN_EKSPLORASI23: AdeganStory = {
  id: "b2-eksplorasi23",
  judul: "Pertanyaan a, b, c: rasio lahan dan bibit",
  sumber: "Buku Siswa hlm. 57–59",
  latar: "#FFFBEB",
  kutipan: ["Tuliskan rasio lahan dan bibit tanaman dalam bentuk yang paling sederhana", "Jika lahan yang tersedia seluas 25m2, berapa bibit yang dapat ditanam", "FPB dari 10 dan 12 adalah 2", "campuran semen dan pasir harus dalam perbandingan tertentu agar bangunan kokoh"],
  ketukan: [
    k(
      "Pertanyaan a: tuliskan rasio lahan dan bibit tanaman dalam bentuk paling sederhana. Rasio lahan terhadap bibit adalah 10 banding 12.",
      bersih(0),
      tambah("rasio", kepalaTabel("t", TX, TY, TW, TH, ["Lahan (m²)", "Bibit"])),
      tambah("10", barisTabel("t", 0, TX, TY, TW, TH, ["10", "12"])),
    ),
    k(
      "Untuk menyederhanakan, bagi kedua bilangan dengan FPB. Faktor persekutuan terbesar dari 10 dan 12 adalah 2.",
      tambah("FPB.", kartu("fpb", 50, 110, 160, 30, "#FEF9C3", ["FPB dari 10 dan 12 = 2"], 9.5)),
      sorotkan("terbesar", "fpb-k"),
    ),
    k(
      "Kedua bilangan dibagi 2. Sepuluh dibagi 2 menjadi 5, dan 12 dibagi 2 menjadi 6. Jadi rasio paling sederhana adalah 5 banding 6.",
      hapus(0, "fpb-k", "fpb-t0"),
      tambah("dibagi", sebelah("d", 0, 1, "÷ 2")),
      tambah("5,", sel("t-r1a", TX, TY + 2 * TH, TW, TH, "5")),
      tambah("6.", sel("t-r1b", TX + TW, TY + 2 * TH, TW, TH, "6")),
      sorotkan(15, "t-r1a-k", "t-r1b-k"),
    ),
    k(
      "Pertanyaan b: bila lahan seluas 25 meter persegi, berapa bibit? Dari 5 banding 6, lahan 5 menjadi 25, berarti dikali 5. Bibit 6 dikali 5 menjadi 30.",
      redamkan2(),
      tambah("25", sel("t-r2a", TX, TY + 3 * TH, TW, TH, "25")),
      tambah("dikali", pengali("m", 1, 2, TX, TY, TW, TH, "× 5")),
      tambah("30.", sel("t-r2b", TX + TW, TY + 3 * TH, TW, TH, "30")),
    ),
    k(
      "Pertanyaan c: jumlah bibit yang dibawa siswa kelas VI ada 24. Dari 6 menjadi 24 dikali 4, sehingga lahan 5 dikali 4 menjadi 20 meter persegi.",
      tambah("24.", sel("t-r3b", TX + TW, TY + 4 * TH, TW, TH, "24")),
      tambah("dikali", sebelah("e", 1, 3, "× 4")),
      tambah("20", sel("t-r3a", TX, TY + 4 * TH, TW, TH, "20")),
      sorotkan("meter", "t-r3a-k", "t-r3b-k"),
    ),
    k(
      "Mengapa kesamaan rasio penting? Campuran semen dan pasir harus dalam perbandingan tertentu agar bangunan kokoh. Bila rasionya berubah, kualitasnya berubah.",
      bersih(0),
      tambah("rasio", teks("mj", 150, 28, "Mengapa kesamaan rasio penting?", 11, W.ungu)),
      tambah("semen", emo("e1", 70, 96, "🧱", 32), teks("t1", 70, 114, "semen", 9)),
      tambah("pasir", emo("e2", 150, 96, "🏖", 32), teks("t2", 150, 114, "pasir", 9)),
      tambah("kokoh.", emo("e3", 230, 96, "🏠", 32), teks("t3", 230, 114, "kokoh", 9, W.hijau)),
      tambah("berubah,", kartu("rb", 40, 140, 220, 38, "#FEE2E2", ["rasio berubah", "kualitas berubah"], 9.5, W.merah)),
    ),
  ],
};

function redamkan2() {
  return ubah(0, { id: "t-r1a-k", sorot: false }, { id: "t-r1b-k", sorot: false });
}
