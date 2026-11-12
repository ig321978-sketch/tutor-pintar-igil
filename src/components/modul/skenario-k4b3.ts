import type { DefSkenario } from "./skenario-umum";

/**
 * Dua skenario Kelas 4 Bab 3 (Pola Gambar dan Pola Bilangan). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b3.mjs (dihitung ulang dari pola).
 *  - SKENARIO_K4B3A: Jeruk dan Permen Dina (pola gambar membesar dan mengecil, tabel selisih)
 *  - SKENARIO_K4B3B: Pameran Pola Kelas 4 (pencapaian bab: pola gambar, pola bilangan, telur, dan produksi TV)
 */

export const SKENARIO_K4B3A: DefSkenario = {
  id: "jeruk-permen-k4b3",
  judul: "Jeruk dan Permen Dina",
  latar: "Bantu Dina menyusun jeruk dan permen menjadi pola gambar.",
  tokoh: "👧",
  nama: "Dina",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Dina. Aku menyusun jeruk di meja menjadi beberapa kumpulan. Kumpulan pertama 2 jeruk, kedua 4 jeruk, ketiga 6 jeruk. Bantu aku melanjutkan polanya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Ini kumpulan jeruk ketiga. Tiap stik di bawah ini satu jeruk.",
      tanya: "Ketuk semua stik. Ada berapa jeruk di kumpulan ketiga?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Kumpulan ketiga berisi enam jeruk.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "selisih",
      jenis: "pilih",
      cerita: "Jeruknya 2, 4, lalu 6. Berapa selisih tiap kumpulan?",
      opsi: [
        { teks: "Bertambah 4, karena 6 − 2 = 4", benar: false, umpan: "Itu selisih kumpulan pertama dan ketiga. Bandingkan dua kumpulan yang berurutan." },
        { teks: "Bertambah 2 setiap kumpulan", benar: true, umpan: "Betul! 2 ke 4 bertambah 2, 4 ke 6 bertambah 2. Selisihnya tetap." },
        { teks: "Berkurang 2 setiap kumpulan", benar: false, umpan: "Jeruknya makin banyak, jadi bertambah, bukan berkurang." },
      ],
    },
    {
      id: "empat",
      jenis: "isi",
      cerita: "Sekarang susun kumpulan keempat. Masukkan stik sebanyak jeruk di kumpulan keempat. Satu stik satu jeruk.",
      objek: "stik",
      target: 8,
      maks: 12,
      sukses: "Pas! 6 + 2 = 8 jeruk. Pola membesar.",
      kurang: "Stiknya masih kurang. Kumpulan keempat = kumpulan ketiga ditambah 2.",
      lebih: "Stiknya kelebihan. Tambahkan 2 saja dari kumpulan ketiga.",
    },
    {
      id: "tabel",
      jenis: "soal",
      cerita: "Aku membuat tabel: kumpulan pertama 2, kedua 4, ketiga 6, keempat 8. Lanjutkan tabelnya.",
      soal: [
        { teks: "Kumpulan kelima berisi … jeruk", jawaban: "10", opsi: ["9", "10", "12"] },
        { teks: "Kumpulan keenam berisi … jeruk", jawaban: "12", opsi: ["12", "14", "11"] },
        { teks: "Kumpulan ketujuh berisi … jeruk", jawaban: "14", opsi: ["16", "13", "14"] },
      ],
      sukses: "Hebat! Kumpulan ketujuh berisi 14 jeruk. Tiap baris tabel bertambah 2.",
      salah: "Hmm, tambahkan 2 pada baris sebelumnya. Coba lagi.",
    },
    {
      id: "permen",
      jenis: "pilih",
      cerita: "Sekarang permen: 9, 7, lalu 5. Pola apa ini?",
      opsi: [
        { teks: "Membesar, karena angkanya besar", benar: false, umpan: "Lihat arahnya: 9 ke 7 ke 5 makin sedikit." },
        { teks: "Tetap, karena selisihnya selalu 2", benar: false, umpan: "Selisihnya memang tetap, tetapi banyak permennya berubah. Pola tetap berarti banyaknya tidak berubah." },
        { teks: "Mengecil, berkurang 2 setiap kumpulan", benar: true, umpan: "Betul! Permennya makin sedikit, berkurang 2 setiap kumpulan." },
      ],
    },
    {
      id: "habis",
      jenis: "isi",
      cerita: "Permen 9, 7, 5, 3, lalu kumpulan kelima. Masukkan stik sebanyak permen di kumpulan kelima.",
      objek: "stik",
      target: 1,
      maks: 5,
      sukses: "Pas! 3 − 2 = 1 permen. Setelah itu permennya habis.",
      kurang: "Masukkan paling sedikit satu stik. Kumpulan kelima = 3 dikurangi 2.",
      lebih: "Stiknya kelebihan. Kurangi 2 dari kumpulan keempat.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Jeruk membesar dan permen mengecil. Ingat: bandingkan dua kumpulan yang berurutan, selisihnya tetap, lalu lanjutkan ke arah yang sama." },
  ],
};

export const SKENARIO_K4B3B: DefSkenario = {
  id: "pameran-pola-k4b3",
  judul: "Pameran Pola Kelas 4",
  latar: "Bantu Raka memeriksa pola gambar dan pola bilangan di pameran kelas.",
  tokoh: "👦",
  nama: "Raka",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Raka. Kelas kami membuat pameran pola. Ada pola gambar dan pola bilangan. Bantu aku memeriksa setiap meja, ya.", tombol: "Ayo keliling! ➡" },
    {
      id: "gambar",
      jenis: "pilih",
      cerita: "Meja pertama: kumpulan jeruk 2, 4, 6. Berapa jeruk di kumpulan keempat?",
      opsi: [
        { teks: "10 jeruk", benar: false, umpan: "Itu menambah 4. Selisih tiap kumpulan hanya 2." },
        { teks: "7 jeruk", benar: false, umpan: "Itu menambah 1. Selisih tiap kumpulan 2." },
        { teks: "8 jeruk, karena 6 + 2 = 8", benar: true, umpan: "Betul! Pola gambar membesar dengan selisih 2." },
      ],
    },
    {
      id: "lanjut",
      jenis: "soal",
      cerita: "Meja kedua: kartu-kartu pola bilangan. Lanjutkan tiap pola.",
      soal: [
        { teks: "3, 5, 7, 9, 11, … bilangan berikutnya", jawaban: "13", opsi: ["13", "12", "15"] },
        { teks: "23, 18, 13, 8, … bilangan berikutnya", jawaban: "3", opsi: ["4", "3", "13"] },
      ],
      sukses: "Hebat! Beda tambah 2 dan beda kurang 5 dipakai terus sampai suku berikutnya.",
      salah: "Hmm, cari dulu beda dua suku yang berurutan. Coba lagi.",
    },
    {
      id: "beda",
      jenis: "pilih",
      cerita: "Kartu berikutnya: 1, 4, 7, 10. Berapa bedanya?",
      opsi: [
        { teks: "Tambah 6, karena 7 − 1 = 6", benar: false, umpan: "Itu suku pertama dan ketiga. Beda dihitung dari dua suku yang berurutan." },
        { teks: "Kurang 3", benar: false, umpan: "Bilangannya makin besar, jadi bedanya tambah, bukan kurang." },
        { teks: "Tambah 3, karena 4 − 1 = 3", benar: true, umpan: "Betul! Semua pasangan berbeda tambah 3." },
      ],
    },
    {
      id: "isi",
      jenis: "isi",
      cerita: "Kartu mengecil: 32, 28, 24, 20, 16. Suku berikutnya berkurang 4 lagi. Masukkan stik sebanyak suku berikutnya.",
      objek: "stik",
      target: 12,
      maks: 16,
      sukses: "Pas! 16 − 4 = 12. Polanya mengecil dengan beda kurang 4.",
      kurang: "Stiknya masih kurang. Suku berikutnya = 16 dikurangi 4.",
      lebih: "Stiknya kelebihan. Kurangi 4 dari 16.",
    },
    {
      id: "cerita",
      jenis: "soal",
      cerita: "Meja terakhir: cerita pola. Peternak mengumpulkan telur 20, 28, 36 butir. Pabrik membuat TV 70, 64, 58 buah tiap bulan sejak Januari.",
      soal: [
        { teks: "Telur hari kelima ada … butir", jawaban: "52", opsi: ["44", "60", "52"] },
        { teks: "TV bulan Juni (bulan keenam) ada … buah", jawaban: "40", opsi: ["40", "46", "34"] },
      ],
      sukses: "Hebat! Telur bertambah 8 setiap hari, jadi hari kelima 52. TV berkurang 6 setiap bulan, jadi Juni 40.",
      salah: "Hmm, buat tabel hari atau bulan, lalu tambah atau kurangi dengan beda yang sama. Coba lagi.",
    },
    {
      id: "simpul",
      jenis: "pilih",
      cerita: "Teman berkata, pola 70, 64, 58 membesar karena bilangannya besar. Apa kata kamu?",
      opsi: [
        { teks: "Setuju, bilangannya puluhan", benar: false, umpan: "Besar kecilnya bilangan tidak menentukan jenis pola. Lihat arahnya." },
        { teks: "Belum tepat, pola itu mengecil karena berkurang 6", benar: true, umpan: "Betul! 70 ke 64 ke 58 makin kecil, jadi pola mengecil." },
        { teks: "Belum tepat, pola itu tetap", benar: false, umpan: "Pola tetap berarti bilangannya tidak berubah. Di sini bilangannya berubah." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Pameran selesai! Kamu sudah memeriksa pola gambar dan pola bilangan. Ingat: cari beda dua suku yang berurutan, lihat apakah pola membesar atau mengecil, lalu lanjutkan dengan beda yang sama." },
  ],
};
