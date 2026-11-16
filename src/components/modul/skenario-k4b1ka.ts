import type { DefSkenario } from "./skenario-umum";

/** Skenario Modul Kedua Kelas 4 Bab 1 Sub-Bab A: Gim Kebun Kira (membaca dan menulis; nol dilewati; seribu). Naskah orisinal IGIL, acuan topik Matematika SD/MI Kelas IV Bab 1 Sub-Bab A. Dicek di scripts/uji-lab-k4b1-kedua.mjs. */

export const SKENARIO_K4B1KA: DefSkenario = {
  id: "kira-gim-kebun-k4b1ka",
  judul: "Gim Kebun Kira",
  latar: "Bantu Kira membaca dan menulis bilangan empat angka di gim kebunnya.",
  tokoh: "🧒",
  nama: "Kira",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Kira. Di gim kebunku, semua hasil panen dicatat dengan bilangan empat angka. Bantu aku membacanya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "peti",
      jenis: "hitung",
      cerita: "Di gudang gim ada peti koin. Satu peti memuat seribu koin. Tiap stik di bawah ini mewakili satu peti.",
      tanya: "Ketuk semua peti. Ada berapa peti?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Empat peti, jadi ada 4.000 koin, dibaca empat ribu.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "harga",
      jenis: "soal",
      cerita: "Skor tertinggiku di gim ini 5.820 poin.",
      soal: [
        { teks: "5.820 dibaca lima ribu delapan ratus …", jawaban: "dua puluh", opsi: ["dua", "dua puluh", "dua ratus"] },
        { teks: "Angka di tempat ratusan pada 5.820 adalah …", jawaban: "8", opsi: ["5", "2", "8"] },
        { teks: "Angka di tempat satuan pada 5.820 adalah …", jawaban: "0", opsi: ["0", "2", "8"] },
      ],
      sukses: "Hebat! Lima ribu delapan ratus dua puluh. Ratusannya 8 dan satuannya 0.",
      salah: "Hmm, hitung tempat dari kiri: ribuan, ratusan, puluhan, satuan. Coba lagi.",
    },
    {
      id: "nol",
      jenis: "pilih",
      cerita: "Hari ini aku menempuh 5.007 langkah di kebun gim. Bagaimana membacanya?",
      opsi: [
        { teks: "Lima ribu nol ratus nol puluh tujuh", benar: false, umpan: "Tempat yang berisi nol dilewati. Ratusan dan puluhannya nol, jadi tidak dibaca." },
        { teks: "Lima ribu tujuh", benar: true, umpan: "Betul! Ratusan dan puluhan berisi nol, jadi dilewati. Lima ribu tujuh." },
        { teks: "Lima ratus tujuh", benar: false, umpan: "Angka 5 ada di ribuan, bukan ratusan. Jadi dibaca lima ribu." },
      ],
    },
    {
      id: "seribu",
      jenis: "pilih",
      cerita: "Kotak hadiahku berisi 1.308 koin emas. Bagaimana membacanya?",
      opsi: [
        { teks: "Satu ribu tiga ratus delapan", benar: false, umpan: "Ribuan 1 dibaca seribu, bukan satu ribu." },
        { teks: "Seratus tiga puluh delapan", benar: false, umpan: "Angka 1 ada di ribuan, jadi ada kata ribu di depan." },
        { teks: "Seribu tiga ratus delapan", benar: true, umpan: "Betul! Ribuan 1 dibaca seribu, lalu tiga ratus delapan." },
      ],
    },
    {
      id: "bungkus",
      jenis: "isi",
      cerita: "Aku menyusun 4.152 koin dengan kemasan: 4 peti, 1 dus, beberapa bungkus, dan 2 benda. Masukkan stik sebanyak bungkusnya. Satu stik satu bungkus.",
      objek: "stik",
      target: 5,
      maks: 12,
      sukses: "Pas! Puluhan pada 4.152 adalah 5, jadi ada 5 bungkus.",
      kurang: "Stiknya masih kurang. Lihat angka di tempat puluhan pada 4.152.",
      lebih: "Stiknya kelebihan. Lihat angka di tempat puluhan pada 4.152.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Sekarang aku bisa membaca semua catatan panen. Ingat: baca dari kiri, nol dilewati, dan ribuan 1 dibaca seribu." },
  ],
};

