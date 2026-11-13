import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, frac, judul, kartu, panah, teks } from "./k6b1a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k6b1a-bantu";

/* ------------------------------ LB1. Straight-Arrow Multiply: konsep ------------------------------ */
export const ADEGAN_LUAR_PANAH: AdeganStory = {
  id: "luar-panah",
  judul: "Straight-Arrow Multiply: konsep",
  sumber: "Metode luar 3: perkalian dengan panah lurus",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Metode ketiga, Straight-Arrow Multiply, atau perkalian panah lurus. Metode ini menjaga agar angka dikalikan pada posisi yang benar.",
      tambah(0, judul("Straight-Arrow Multiply")),
      tambah("Metode@2", ...frac("s1", 80, 104, "a", "b", 22, W.biru), teks("sx", 120, 110, "×", 22, W.biru), ...frac("s2", 160, 104, "c", "d", 22, W.biru)),
      tambah("posisi", teks("sp", 150, 176, "atas dengan atas, bawah dengan bawah", 10, W.hijau)),
    ),
    k(
      "Panah pertama dibuat lurus di bagian atas, menghubungkan pembilang dengan pembilang. Hasil kalinya menjadi pembilang yang baru.",
      tambah("pertama", panah("pa1", 84, 70, 72, 0, W.hijau, 3, { gambar: true })),
      tambah("pembilang", teks("pa1t", 120, 60, "atas", 9, W.hijau)),
    ),
    k(
      "Panah kedua dibuat lurus di bagian bawah, menghubungkan penyebut dengan penyebut. Hasil kalinya menjadi penyebut yang baru.",
      tambah("kedua", panah("pa2", 84, 144, 72, 0, W.merah, 3, { gambar: true })),
      tambah("penyebut", teks("pa2t", 120, 158, "bawah", 9, W.merah)),
    ),
    k(
      "Hasilnya adalah pecahan dengan pembilang baru di atas dan penyebut baru di bawah.",
      hapus("Hasilnya", "sp"),
      tambah("pecahan", teks("sy", 205, 110, "=", 22, W.biru), ...frac("s3", 250, 104, "a × c", "b × d", 18, W.merah)),
    ),
    k(
      "Ingat, panah selalu lurus, atas dengan atas dan bawah dengan bawah, tidak pernah berpindah baris.",
      bersih(0),
      tambah(0, judul("panah selalu lurus")),
      tambah("lurus", ...frac("t1", 80, 92, "a", "b", 20, W.biru), teks("t2", 118, 98, "×", 20, W.biru), ...frac("t3", 156, 92, "c", "d", 20, W.biru), panah("tp1", 82, 62, 72, 0, W.hijau, 3), panah("tp2", 82, 130, 72, 0, W.merah, 3)),
      tambah("berpindah", emo("tk", 240, 100, "✅", 36), teks("tkt", 240, 124, "lurus", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB2. Straight-Arrow Multiply: penerapan ------------------------------ */
export const ADEGAN_LUAR_PANAH_TERAPAN: AdeganStory = {
  id: "luar-panah-terapan",
  judul: "Straight-Arrow Multiply: penerapan pada Ayo Berkomunikasi",
  sumber: "Metode luar 3: penerapan pada soal Ayo Berkomunikasi",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Terapan. Pada Ayo Berkomunikasi, hitunglah tiga per empat kali 8.",
      tambah(0, judul("penerapan: tiga per empat kali 8")),
      tambah("tiga", teks("q", 150, 100, "3/4 × 8", 30, W.biru)),
    ),
    k(
      "Tulis 8 sebagai delapan per satu, sehingga kedua bilangan berbentuk pecahan.",
      bersih(0),
      tambah(0, judul("8 ditulis 8 per 1")),
      tambah("Tulis", ...frac("u1", 90, 100, 3, 4, 24, W.biru), teks("u2", 135, 106, "×", 24, W.biru)),
      tambah("delapan", ...frac("u3", 180, 100, 8, 1, 24, W.merah)),
    ),
    k(
      "Panah atas: 3 kali 8 menjadi 24. Pembilang barunya adalah 24.",
      tambah("Panah", panah("up1", 92, 64, 88, 0, W.hijau, 3, { gambar: true })),
      tambah("24.", teks("up1t", 136, 52, "3 × 8 = 24", 12, W.hijau)),
    ),
    k(
      "Panah bawah: 4 kali 1 menjadi 4. Jadi hasilnya dua puluh empat per empat.",
      tambah("Panah", panah("up2", 92, 138, 88, 0, W.merah, 3, { gambar: true })),
      tambah("menjadi", teks("up2t", 136, 158, "4 × 1 = 4", 12, W.merah)),
      tambah("empat@2", teks("us", 225, 106, "=", 24, W.biru), ...frac("u4", 262, 100, 24, 4, 20, W.biru)),
    ),
    k(
      "Dua puluh empat per empat sama dengan 6. Hasil ini cocok dengan kunci Buku Panduan Guru, yaitu 6.",
      bersih(0),
      tambah(0, judul("hasil akhir")),
      tambah("Dua", teks("v1", 150, 80, "24/4 = 6", 28, W.merah)),
      tambah("cocok", emo("ok", 150, 144, "✅", 40), teks("v2", 150, 178, "cocok dengan kunci buku", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB3. Commutative Multiply Check: konsep ------------------------------ */
const titik = (id: string, x: number, y: number, baris: number, kolom: number) => Array.from({ length: baris * kolom }, (_, i) => bulat(`${id}${i}`, x + (i % kolom) * 22, y + Math.floor(i / kolom) * 22, 7, W.daun, W.hijau, { tebal: 1 }));

export const ADEGAN_LUAR_TUKAR: AdeganStory = {
  id: "luar-tukar",
  judul: "Commutative Multiply Check: konsep",
  sumber: "Metode luar 4: pemeriksaan dengan menukar urutan kali",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Metode keempat, Commutative Multiply Check, atau pemeriksaan dengan menukar urutan kali. Hasil kali tidak berubah ketika faktornya ditukar.",
      tambah(0, judul("Commutative Multiply Check")),
      tambah("Hasil", teks("c1", 150, 100, "a × b = b × a", 26, W.biru)),
      tambah("ditukar.", panah("c2", 110, 128, 80, 0, W.hijau, 3, { gambar: true }), teks("c3", 150, 156, "tukar tempat", 10, W.hijau)),
    ),
    k(
      "Contoh bilangan asli: 3 kali 4 dan 4 kali 3 sama-sama 12. Titik yang sama dapat dibaca dari dua arah.",
      bersih(0),
      tambah(0, judul("3 baris 4 kolom")),
      tambah("Titik", ...titik("d", 30, 50, 3, 4)),
      tambah("3", teks("d1", 215, 66, "3 × 4 = 12", 14, W.biru)),
      tambah("4@2", teks("d2", 215, 100, "4 × 3 = 12", 14, W.biru)),
    ),
    k(
      "Langkah satu, hitung dengan urutan asal. Langkah dua, tukar urutan lalu hitung lagi. Langkah tiga, bandingkan, dua hasil harus sama.",
      bersih(0),
      tambah(0, judul("tiga langkah pemeriksaan")),
      tambah("satu", ...kartu("g1", 20, 34, 260, 34, "#FEF9C3", ["1. hitung urutan asal"], 9.6)),
      tambah("dua", ...kartu("g2", 20, 80, 260, 34, "#DBEAFE", ["2. tukar urutan, hitung lagi"], 9.6)),
      tambah("tiga", ...kartu("g3", 20, 126, 260, 34, "#DCFCE7", ["3. bandingkan: hasil harus sama"], 9.6)),
    ),
    k(
      "Contoh pecahan: 6 kali dua per tiga sama dengan dua belas per tiga, yaitu 4. Ditukar menjadi dua per tiga kali 6, juga 4.",
      bersih(0),
      tambah(0, judul("contoh pecahan")),
      tambah("6", teks("e1", 150, 76, "6 × 2/3 = 12/3 = 4", 18, W.biru)),
      tambah("Ditukar", teks("e2", 150, 126, "2/3 × 6 = 12/3 = 4", 18, W.biru), emo("e3", 150, 168, "🔁", 28)),
    ),
    k(
      "Bila dua hasil berbeda, ada langkah yang keliru dan perlu dihitung ulang sebelum jawaban ditulis.",
      bersih(0),
      tambah(0, judul("hasil berbeda?")),
      tambah("berbeda", ...kartu("h1", 20, 44, 120, 56, "#FEE2E2", ["hasil berbeda", "hitung ulang"], 9.6), emo("hx", 80, 128, "❌", 30)),
      tambah("jawaban", ...kartu("h2", 160, 44, 120, 56, "#DCFCE7", ["hasil sama", "jawaban aman"], 9.6), emo("hv", 220, 128, "✅", 30)),
    ),
  ],
};

/* ------------------------------ LB4. Commutative Multiply Check: penerapan ------------------------------ */
export const ADEGAN_LUAR_TUKAR_TERAPAN: AdeganStory = {
  id: "luar-tukar-terapan",
  judul: "Commutative Multiply Check: penerapan pada soal nomor 4",
  sumber: "Metode luar 4: penerapan pada Latihan 1.1 nomor 4",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Terapan. Latihan 1.1 nomor 4 meminta cerita untuk satu per empat kali 20. Hitung dulu dengan urutan asal.",
      tambah(0, judul("penerapan: Latihan 1.1 nomor 4")),
      tambah("satu", teks("a1", 150, 100, "1/4 × 20", 30, W.biru)),
    ),
    k(
      "Satu kali 20 menjadi 20, penyebut tetap 4. Hasilnya dua puluh per empat, yaitu 5.",
      tambah("Hasilnya", teks("a2", 150, 160, "1/4 × 20 = 20/4 = 5", 16, W.merah)),
    ),
    k(
      "Sekarang tukar urutan menjadi 20 kali satu per empat. Hasilnya juga dua puluh per empat, yaitu 5.",
      bersih(0),
      tambah(0, judul("tukar urutan")),
      tambah("Sekarang", teks("b1", 150, 76, "20 × 1/4", 26, W.biru), emo("b2", 150, 116, "🔁", 28)),
      tambah("juga", teks("b3", 150, 170, "20 × 1/4 = 20/4 = 5", 16, W.merah)),
    ),
    k(
      "Kedua hasil sama-sama 5, jadi jawaban 5 dapat dipercaya. Ini cocok dengan cerita Rani, yaitu 5 kilometer.",
      bersih(0),
      tambah(0, judul("kedua hasil sama")),
      tambah("Kedua", ...kartu("k1", 20, 44, 120, 44, "#DBEAFE", ["1/4 × 20 = 5"], 11), ...kartu("k2", 160, 44, 120, 44, "#DBEAFE", ["20 × 1/4 = 5"], 11)),
      tambah("Rani", emo("rn", 150, 130, "🚶", 32), teks("rnt", 150, 154, "5 km", 12, W.hijau)),
    ),
    k(
      "Seandainya hasilnya berbeda, periksa lagi: apakah hanya pembilang yang dikali, dan penyebut dibiarkan seperti semula?",
      bersih(0),
      tambah(0, judul("bila hasil berbeda")),
      tambah("pembilang", ...kartu("p1", 30, 50, 240, 34, "#FEF9C3", ["pembilang dikali bilangan asli"], 10)),
      tambah("penyebut", ...kartu("p2", 30, 100, 240, 34, "#DCFCE7", ["penyebut dibiarkan seperti semula"], 10)),
      tambah("semula", emo("pc", 150, 178, "🔍", 30)),
    ),
  ],
};

/* ------------------------------ LB5. Ringkasan empat metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar Subbab A",
  sumber: "Ringkasan metode luar Subbab A",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan. Metode pertama, Area Model Multiplication: gambar petak, bagi sesuai penyebut, arsir, lalu hitung lajurnya.",
      tambah(0, judul("ringkasan empat metode")),
      tambah("Metode", ...kartu("m1", 10, 34, 134, 66, "#FDE68A", ["Area Model", "Multiplication", "petak dan lajur"], 8.6)),
    ),
    k(
      "Metode kedua, Whole-as-Fraction: tulis bilangan asli sebagai pecahan berpenyebut satu, supaya siap dikalikan.",
      tambah("kedua", ...kartu("m2", 156, 34, 134, 66, "#FBCFE8", ["Whole-as-Fraction", "bilangan asli", "ditulis a per 1"], 8.6)),
    ),
    k(
      "Metode ketiga, Straight-Arrow Multiply: panah lurus, atas dengan atas dan bawah dengan bawah.",
      tambah("ketiga", ...kartu("m3", 10, 112, 134, 66, "#BBF7D0", ["Straight-Arrow", "Multiply", "panah lurus"], 8.6)),
    ),
    k(
      "Metode keempat, Commutative Multiply Check: tukar urutan kali, dua hasil harus sama.",
      tambah("keempat", ...kartu("m4", 156, 112, 134, 66, "#BFDBFE", ["Commutative", "Multiply Check", "tukar urutan kali"], 8.6)),
    ),
    k(
      "Keempat metode ini membantu kita mengalikan bilangan asli dengan pecahan dan sebaliknya, serta memeriksa jawaban sendiri.",
      sorotkan("Keempat", "m1-k", "m2-k", "m3-k", "m4-k"),
      tambah("memeriksa", emo("ok", 150, 100, "✅", 40)),
    ),
  ],
};
