import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kelompok, teks } from "./k4b1g-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b1g-bantu";

/* ------------------------------ 1. Pengalaman belajar, sarana, apersepsi (Panduan Guru hlm. 60–61) ------------------------------ */
const SUARA_P1 = "Subbab G membahas perkalian bilangan cacah sampai seratus. Panduan guru menyebut pengalaman belajarnya: memahami konsep perkalian dengan benda konkret, gambar, dan simbol matematika.";
const SUARA_P2 = "Sarana yang disiapkan: permen, kerikil, kelereng, manik-manik, kue, atau buku, dengan wadah dari kertas, karton, atau kardus.";
const SUARA_P3 = "Apersepsi: perkalian adalah penjumlahan berulang. Dengan perkalian kita tidak perlu menjumlahkan hal yang sama berkali-kali, sehingga hitungan lebih singkat, efektif, dan efisien.";

export const ADEGAN_PANDUAN_AWAL: AdeganStory = {
  id: "panduan-awal",
  judul: "Pengalaman belajar, sarana, dan apersepsi",
  sumber: "Panduan Guru hlm. 60–61",
  latar: "#FFF7ED",
  kutipan: [
    "G. Perkalian Bilangan Cacah sampai 100",
    "Pengalaman Belajar",
    "Setelah mempelajari sub bab ini, peserta didik dapat memahami",
    "konsep perkalian bilangan cacah sampai 100 menggunakan benda konkret, gambar, dan simbol matematika.",
    "Kebutuhan Sarana Prasarana dan Media",
    "Permen/kerikil/kelereng/manik-manik/kue/buku",
    "Apersepsi",
    "Secara umum konsep operasi perkalian merupakan penjumlahan berulang.",
    "tidak perlu menjumlahkan hal yang sama",
    "lebih efektif dan efisien",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Subbab G: perkalian sampai 100")),
      tambah("benda", ...kartu("a1", 10, 40, 86, 100, W.hijauMuda, ["benda", "konkret"], 9.4), emo("a1e", 53, 74, "🍬", 22)),
      tambah("gambar,", ...kartu("a2", 107, 40, 86, 100, W.langit, ["gambar"], 9.4), emo("a2e", 150, 74, "🎨", 22)),
      tambah("simbol", ...kartu("a3", 204, 40, 86, 100, W.krem, ["simbol", "matematika"], 9.4), emo("a3e", 247, 74, "🔢", 22)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Sarana dan media")),
      tambah("permen,", ...kartu("s1", 14, 34, 272, 60, W.hijauMuda, ["benda: permen, kerikil, kelereng,", "manik-manik, kue, buku"], 9.2)),
      tambah("wadah", ...kartu("s2", 14, 110, 272, 44, W.langit, ["wadah: kertas, karton, kardus"], 9.2)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Apersepsi: perkalian")),
      tambah("penjumlahan", ...kartu("r1", 14, 40, 272, 44, W.krem, ["perkalian = penjumlahan berulang"], 9.6)),
      tambah("tidak", ...kartu("r2", 14, 100, 272, 36, W.pink, ["tidak perlu menjumlahkan hal yang sama"], 9.2)),
      tambah("singkat,", ...kartu("r3", 14, 150, 272, 36, W.emas, ["lebih singkat, efektif, efisien"], 9.6)),
      sorotkan("perkalian", "r1-k"),
    ),
  ],
};

/* ------------------------------ 2. Pertanyaan pemantik dan pemanasan telur (Panduan Guru hlm. 61) ------------------------------ */
const SUARA_Q1 = "Sebelum mulai, ada tiga pertanyaan untuk kita pikirkan: bagaimana perkalian cara panjang, cara susun tanpa menyimpan, dan cara susun dengan menyimpan.";
const SUARA_Q2 = "Untuk pemanasan, bayangkan ada dua belas kardus, masing-masing berisi sepuluh butir telur. Apakah telur harus dihitung satu per satu?";
const SUARA_Q3 = "Kita tidak perlu menjawab dulu, sebab nanti kamu akan menemukannya lewat kegiatan. Hitungannya: dua belas kali sepuluh sama dengan seratus dua puluh butir.";

export const ADEGAN_PEMANTIK: AdeganStory = {
  id: "pemantik",
  judul: "Pertanyaan pemantik dan pemanasan",
  sumber: "Materi: pertanyaan pemantik",
  latar: "#F0FDF4",
  kutipan: [
    "Pertanyaan Esensi/Pemantik",
    "Bagaimana operasi perkalian cara panjang?",
    "Bagaimana operasi perkalian cara susun tanpa menyimpan?",
    "Bagaimana operasi perkalian cara susun dengan menyimpan",
    "Misalkan ada 12 kadus yang berisi masing-masing 10 butir",
    "Apakah telur harus dihitung satu per satu di setiap kardus?",
    "Guru tidak perlu memberikan jawaban yang benar",
  ],
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Tiga pertanyaan pemantik")),
      tambah("cara", ...kartu("q1", 14, 34, 272, 40, W.hijauMuda, ["1. perkalian cara panjang"], 9.6)),
      tambah("tanpa", ...kartu("q2", 14, 86, 272, 40, W.langit, ["2. cara susun tanpa menyimpan"], 9.6)),
      tambah("dengan", ...kartu("q3", 14, 138, 272, 40, W.krem, ["3. cara susun dengan menyimpan"], 9.6)),
    ),
    k(
      SUARA_Q2,
      bersih(0),
      tambah(0, judul("Pemanasan: telur dalam kardus")),
      tambah("kardus,", ...kelompok("tl", 22, 36, 12, 10, 6, 40, 30, 5, W.putih, W.jingga)),
      tambah("sepuluh", teks("tlt", 150, 128, "12 kardus × 10 butir telur", 10, W.biru)),
      tambah("Apakah", emo("tlq", 150, 168, "❓", 26)),
    ),
    k(
      SUARA_Q3,
      hapus("Kita", "tlq"),
      tambah("Hitungannya", teks("tlh", 150, 160, "12 × 10 = 120 butir", 13, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Mengamati: kotak donat (Buku Siswa hlm. 39) ------------------------------ */
const SUARA_D1 = "Kita mulai dengan mengamati. Gambarnya dua belas kotak donat, dua baris, masing-masing enam kotak.";
const SUARA_D2 = "Tiap kotak berisi empat donat. Untuk mengetahui jumlah seluruhnya, kita tambahkan empat sebanyak dua belas kali.";
const SUARA_D3 = "Hasilnya empat puluh delapan. Jadi ada dua belas kotak atau empat puluh delapan buah donat.";

export const ADEGAN_AMATI_DONAT: AdeganStory = {
  id: "amati-donat",
  judul: "Mengamati dua belas kotak donat",
  sumber: "Materi: penjumlahan berulang",
  latar: "#FFF1F2",
  kutipan: [
    "G. Perkalian Bilangan Cacah Sampai 100",
    "Ayo Mengamati",
    "Amatilah gambar di atas.",
    "Untuk mengetahui jumlah donat seluruhnya",
    "dengan menambahkan keseluruhan",
    "4 donat + 4 donat + 4 donal + 4 donat + 4 donat",
    "Jadi, jumlah donat pada gambar tersebut ada 12 kotak atau 48 buah donat.",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Mengamati: kotak donat")),
      tambah("Gambarnya", ...kelompok("dn", 22, 34, 12, 4, 6, 40, 30, 2, W.pink, W.krem)),
      tambah("baris,", teks("dnk", 150, 120, "12 kotak donat (6 + 6)", 10, W.biru)),
    ),
    k(
      SUARA_D2,
      tambah("berisi", teks("dnb", 150, 142, "tiap kotak: 4 donat", 9.6, W.coklat)),
      tambah("tambahkan", teks("dns", 150, 168, "4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4", 8, W.biru)),
      tambah("sebanyak", teks("dnj", 150, 188, "empat ditambahkan 12 kali", 8.6, W.coklat)),
    ),
    k(
      SUARA_D3,
      ubah("Hasilnya", { id: "dns", isi: "4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 = 48", warna: W.hijau }),
      hapus("Hasilnya", "dnj"),
      tambah("Jadi", ...kartu("dnh", 80, 172, 140, 24, W.emas, ["48 buah donat"], 10)),
    ),
  ],
};

/* ------------------------------ 4. Perkalian cara panjang: donat (Buku Siswa hlm. 40) ------------------------------ */
const SUARA_C1 = "Dengan perkalian kita lebih mudah menghitung donat. Cara pertama adalah cara panjang: ada dua belas kotak donat, setiap kotak berisi empat donat.";
const SUARA_C2 = "Langkah satu: ubah dua belas menjadi sepuluh tambah dua, lalu tulis dikali empat.";
const SUARA_C3 = "Langkah dua: sepuluh dikali empat, dan dua dikali empat. Jadi dua belas kali empat sama dengan sepuluh kali empat ditambah dua kali empat.";
const SUARA_C4 = "Langkah tiga: empat puluh tambah delapan sama dengan empat puluh delapan. Jadi banyaknya donat adalah empat puluh delapan donat.";

export const ADEGAN_CARA_PANJANG: AdeganStory = {
  id: "cara-panjang",
  judul: "Perkalian cara panjang: donat",
  sumber: "Metode: perkalian cara panjang",
  latar: "#FFFBEB",
  kutipan: [
    "Anak-anak, dengan menggunakan perkalian kita akan mudah menghitung banyak donat tersebut.",
    "Perkalian cara panjang",
    "Perhatikan dengan baik langkah-langkah untuk melakukan perkalian menggunakan cara panjang",
    "Ada 12 kotak donat, setiap kotak berisi 4 donat,",
    "12 × 4 = (10 + 2) × 4",
    "Ubah menjadi 10 + 2",
    "12 × 4 = (10 × 4) + ( 2 × 4)",
    "= 40 + 8 = 48",
    "Jadi banyaknya donat adalah 48 donat",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Perkalian cara panjang")),
      tambah("Cara", teks("cp0", 150, 62, "12 × 4 = ...", 18, W.biru)),
      tambah("ada", teks("cpa", 150, 38, "12 kotak, tiap kotak 4 donat", 9.6, W.coklat)),
    ),
    k(
      SUARA_C2,
      tambah("sepuluh", teks("cp1", 150, 92, "12 × 4 = (10 + 2) × 4", 15, W.biru)),
      tambah("tambah", teks("cp1n", 150, 108, "ubah menjadi 10 + 2", 8.6, W.hijau)),
    ),
    k(
      SUARA_C3,
      tambah("sepuluh", teks("cp2", 150, 134, "12 × 4 = (10 × 4) + (2 × 4)", 14, W.biru)),
      tambah("dua@2", teks("cp2n", 150, 150, "10 × 4 dan 2 × 4", 8.6, W.hijau)),
    ),
    k(
      SUARA_C4,
      tambah("empat", teks("cp3", 150, 172, "= 40 + 8", 14, W.biru)),
      tambah("delapan", teks("cp4", 150, 194, "= 48 donat", 14, W.hijau)),
    ),
  ],
};
