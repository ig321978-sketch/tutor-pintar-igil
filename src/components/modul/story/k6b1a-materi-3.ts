import type { AdeganStory } from "./logika-story";
import { W, emo, frac, judul, kartu, kotak, panah, teks } from "./k6b1a-gambar";
import { bersih, k, sorotkan, tambah, warnai } from "./k6b1a-bantu";

/** Satu pita 1 meter terbagi `bagi` sel; id sel `${id}-${c}`. */
const pita = (id: string, x: number, y: number, bagi: number, lebar: number) => Array.from({ length: bagi }, (_, c) => kotak(`${id}-${c}`, x + c * (lebar / bagi), y, lebar / bagi, 16, W.putih, W.biru, { rx: 0, tebal: 1.1 }));
const sel = (id: string, dari: number, sampai: number) => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}-${dari + i}`);

/* ------------------------------ 7. Latihan 1.1 nomor 1 dan 2 (hlm. 15) ------------------------------ */
export const ADEGAN_LATIHAN_A: AdeganStory = {
  id: "latihan-11-a",
  judul: "Latihan 1.1 nomor 1 dan 2: pita Hani dan kue pastel Fina",
  sumber: "Buku Siswa hlm. 15 dan Buku Panduan Guru kunci Latihan 1.1",
  latar: "#F5F3FF",
  kutipan: [
    "Latihan 1.1",
    "Hani membuat 4 potong pita dengan panjang masing-masing",
    "Arsirlah masing-masing bagian pita yang dimiliki Hani",
    "Berapa meter panjang potongan pita seluruhnya yang dimiliki Hani",
    "Fina membuat 75 kue pastel untuk acara keluarganya",
    "telah dikonsumsi oleh keluarganya selama",
    "Banyaknya kue pastel yang sudah dikonsumsi oleh keluarga Fina",
    "Banyaknya kue pastel yang belum dikonsumsi oleh keluarga Fina",
  ],
  ketukan: [
    k(
      "Latihan 1.1 nomor 1. Hani membuat 4 potong pita, masing-masing tiga per empat meter. Kita arsir tiap pita, lalu hitung panjang seluruhnya.",
      tambah(0, judul("Latihan 1.1 nomor 1: pita Hani")),
      tambah("Hani", ...[0, 1, 2, 3].flatMap((i) => pita(`p${i}`, 70, 40 + i * 28, 4, 160)), teks("pk", 150, 160, "1 m tiap pita, 4 pita", 10, W.ungu)),
      warnai("arsir", W.daun, ...[0, 1, 2, 3].flatMap((i) => sel(`p${i}`, 0, 2))),
    ),
    k(
      "Tiap pita tiga per empat meter, dan ada 4 pita. Panjang seluruhnya 4 kali tiga per empat, yaitu dua belas per empat, sama dengan 3 meter.",
      sorotkan("Tiap", ...[0, 1, 2, 3].flatMap((i) => sel(`p${i}`, 0, 2))),
      tambah("Panjang", teks("eq", 150, 186, "4 × 3/4 = 12/4 = 3 m", 16, W.merah)),
    ),
    k(
      "Nomor 2. Fina membuat 75 kue pastel. Sebanyak dua per lima belas bagian sudah dimakan keluarganya. Berapa pastel yang sudah dimakan?",
      bersih(0),
      tambah(0, judul("Latihan 1.1 nomor 2: pastel Fina")),
      tambah("Fina", emo("pa", 150, 70, "🥟", 44), teks("pat", 150, 92, "75 kue pastel", 11, W.coklat)),
      tambah("dua", ...frac("pf", 150, 140, 2, 15, 20, W.merah), teks("pft", 150, 188, "bagian sudah dimakan", 9.4, W.merah)),
    ),
    k(
      "Bagi 75 menjadi 15 bagian sama, tiap bagian 5 kue. Dua bagian berarti 2 kali 5, yaitu 10 kue yang sudah dimakan.",
      bersih(0),
      tambah(0, judul("75 kue dalam 15 bagian")),
      tambah(0, ...Array.from({ length: 15 }, (_, i) => kotak(`b${i}`, 30 + (i % 5) * 48, 36 + Math.floor(i / 5) * 32, 46, 28, W.putih, W.coklat, { rx: 3, tebal: 1.1 }))),
      tambah("tiap", teks("e5", 150, 146, "75 ÷ 15 = 5 kue tiap bagian", 11, W.biru)),
      warnai("Dua", "#FCA5A5", "b0", "b1"),
      tambah("yaitu", teks("e10", 150, 172, "2 × 5 = 10 kue sudah dimakan", 12, W.merah)),
    ),
    k(
      "Kue yang belum dimakan adalah 75 dikurangi 10, yaitu 65 kue.",
      tambah("dikurangi", teks("e65", 150, 198, "75 - 10 = 65 kue belum dimakan", 12, W.hijau)),
      warnai("belum", W.daun, ...Array.from({ length: 13 }, (_, i) => `b${i + 2}`)),
    ),
  ],
};

/* ------------------------------ 8. Latihan 1.1 nomor 3 dan 4 (hlm. 15 dan 16) ------------------------------ */
export const ADEGAN_LATIHAN_B: AdeganStory = {
  id: "latihan-11-b",
  judul: "Latihan 1.1 nomor 3 dan 4: ekstrakurikuler dan soal cerita",
  sumber: "Buku Siswa hlm. 15–16 dan Buku Panduan Guru kunci Latihan 1.1",
  latar: "#ECFDF5",
  kutipan: [
    "Ada 180 siswa kelas 6 di SD Melati",
    "memilih ekstrakurikuler musik dan",
    "juga memilih ekstrakurikuler melukis",
    "Berapa banyak siswa kelas 6 yang mengikuti ekstrakurikuler musik",
    "Berapa banyak siswa kelas 6 yang mengikuti ekstrakurikuler melukis",
    "Sebutkan bentuk pecahan yang menunjukkan banyak siswa kelas 6",
    "Buatlah sebuah soal cerita yang menyatakan bentuk perkalian pecahan",
  ],
  ketukan: [
    k(
      "Nomor 3. Ada 180 siswa kelas 6 di SD Melati. Sebanyak satu per enam memilih ekstrakurikuler musik. Berapa siswa yang memilih musik?",
      tambah(0, judul("Latihan 1.1 nomor 3: SD Melati")),
      tambah("180", teks("s180", 150, 56, "👦👧👦👧👦👧", 20), teks("s180t", 150, 78, "180 siswa kelas 6", 11, W.ungu)),
      tambah("satu", ...frac("f16", 80, 130, 1, 6, 18, W.merah), teks("f16t", 80, 164, "memilih musik", 9, W.merah)),
      tambah("Berapa", teks("eq", 215, 140, "1/6 × 180 = 30 siswa", 11.6, W.merah)),
    ),
    k(
      "Dari 30 siswa musik, dua per tiga juga memilih melukis. Berapa siswa yang memilih melukis?",
      bersih(0),
      tambah(0, judul("yang juga memilih melukis")),
      tambah("30", kartu("m30", 100, 32, 100, 34, "#DBEAFE", ["30 siswa musik"], 10)),
      tambah("dua", ...frac("f23", 80, 120, 2, 3, 18, W.merah), teks("f23t", 80, 154, "juga melukis", 9, W.merah)),
      tambah("Berapa", teks("eq2", 215, 130, "2/3 × 30 = 60/3 = 20", 11.6, W.merah)),
    ),
    k(
      "Jadi 20 siswa memilih melukis. Pecahan untuk melukis terhadap seluruh siswa ditulis satu per enam kali dua per tiga kali 180.",
      bersih(0),
      tambah(0, judul("bentuk perkalian melukis")),
      tambah("20", emo("ok", 150, 64, "✅", 30), teks("t20", 150, 86, "20 siswa melukis", 12, W.hijau)),
      tambah("satu", teks("bt", 150, 130, "1/6 × 2/3 × 180 = 20", 16, W.merah)),
    ),
    k(
      "Nomor 4. Buat soal cerita untuk satu per empat kali 20. Contohnya, Rani menempuh seperempat dari jarak 20 kilometer, yaitu 5 kilometer.",
      bersih(0),
      tambah(0, judul("Latihan 1.1 nomor 4a")),
      tambah("Rani", emo("ra", 40, 100, "🚶", 30), kotak("jl", 70, 90, 200, 12, W.putih, W.biru, { rx: 3 }), teks("jlt", 170, 120, "jarak 20 km", 10, W.ungu)),
      tambah("seperempat", kotak("jl2", 70, 90, 50, 12, W.daun, W.biru, { rx: 3 })),
      tambah("yaitu", teks("e4", 150, 160, "1/4 × 20 = 5 km", 16, W.merah)),
    ),
    k(
      "Sisanya masih 15 kilometer lagi. Untuk 20 kali satu per empat: Rani butuh seperempat kilogram tepung tiap adonan, jadi 20 adonan butuh 5 kilogram.",
      bersih(0),
      tambah(0, judul("soal cerita nomor 4a dan 4b")),
      tambah("Sisanya", teks("e5", 150, 52, "20 - 5 = 15 km lagi", 14, W.biru)),
      tambah("tepung", emo("tp", 70, 110, "🍰", 32), teks("tpt", 70, 130, "1/4 kg per adonan", 8.6)),
      tambah("20@2", teks("e6", 215, 112, "20 × 1/4 = 5 kg", 13, W.merah)),
      tambah("5@2", teks("e7", 150, 176, "1/4 × 20 sama dengan 20 × 1/4", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 9. Ayo Berefleksi (hlm. 16) ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi-a",
  judul: "Ayo Berefleksi: perkalian pecahan",
  sumber: "Buku Siswa hlm. 16 dan Buku Panduan Guru",
  latar: "#FFF1F2",
  kutipan: [
    "Dari aktivitas yang telah kalian lakukan pada subbab ini, jawablah",
    "Bagaimana cara kalian mengalikan bilangan asli dengan pecahan",
    "Bagaimana cara kalian mengalikan pecahan dengan bilangan asli",
    "Ayo Berefleksi",
  ],
  ketukan: [
    k(
      "Ayo berefleksi. Bagaimana cara mengalikan bilangan asli dengan pecahan? Gandakan banyak bagian pecahan sebanyak bilangan asli itu.",
      tambah(0, judul("Ayo Berefleksi")),
      tambah("Bagaimana", ...kartu("r1", 20, 34, 260, 34, "#DBEAFE", ["bilangan asli × pecahan"], 10)),
      tambah("Gandakan", ...frac("ra", 90, 112, "b", "c", 18, W.biru), teks("rax", 56, 118, "a ×", 18, W.biru), teks("ras", 130, 118, "=", 18, W.biru), ...frac("rb", 190, 112, "a × b", "c", 18, W.merah)),
    ),
    k(
      "Bagaimana mengalikan pecahan dengan bilangan asli? Itu mencari banyak bagian tertentu dari sekumpulan benda.",
      bersih(0),
      tambah(0, judul("Ayo Berefleksi")),
      tambah("Bagaimana", ...kartu("r1", 20, 34, 260, 34, "#DBEAFE", ["pecahan × bilangan asli"], 10)),
      tambah("Itu", ...kartu("r2", 20, 140, 260, 34, "#DCFCE7", ["bagian tertentu dari sekumpulan benda"], 9)),
      tambah("benda.", ...frac("rd", 70, 108, "a", "c", 18, W.biru), teks("rdx", 112, 114, "× b =", 18, W.biru), ...frac("re", 200, 108, "a × b", "c", 18, W.merah)),
    ),
    k(
      "Caranya, kalikan pembilang dengan bilangan asli, sedangkan penyebut dibiarkan tetap seperti semula.",
      tambah("kalikan", teks("rc", 150, 196, "pembilang × bilangan asli, penyebut tetap", 9.4, W.merah)),
      sorotkan("kalikan", "re-a"),
    ),
    k(
      "Subbab A selesai. Berikutnya Subbab B tentang pembagian pecahan, dimulai dari botol Agam yang berisi 1 liter air.",
      bersih(0),
      tambah(0, judul("Subbab A selesai")),
      tambah("Berikutnya", ...kartu("sb", 60, 36, 180, 36, "#FEF9C3", ["Subbab B: pembagian pecahan"], 10)),
      tambah("botol", emo("bo", 100, 138, "🍶", 40), teks("bot", 100, 160, "1 liter air", 10, W.biru)),
      tambah("liter", panah("bp", 130, 126, 60, 0, W.hijau, 3, { gambar: true }), emo("gl", 220, 138, "🥛", 34)),
    ),
  ],
};
