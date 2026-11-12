import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 4 Bab 6 (Piktogram dan Diagram Batang). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b6.mjs (dihitung ulang dari data buku).
 *  - SKENARIO_K4B6A: Turus Kelas Karel (turus, keterangan simbol, simbol × skala, paling banyak, jumlah, selisih)
 */

export const SKENARIO_K4B6A: DefSkenario = {
  id: "turus-karel-k4b6",
  judul: "Turus Kelas Karel",
  latar: "Bantu Karel mencatat data dengan turus lalu menyajikannya sebagai piktogram.",
  tokoh: "👦",
  nama: "Karel",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Karel. Hari ini aku mendata mainanku dan siswa di sekolah. Kita catat dengan turus, lalu kita gambar sebagai piktogram. Bantu aku, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "turus",
      jenis: "hitung",
      cerita: "Karel mencatat kelerengnya dengan turus. Tiap stik di bawah ini satu turus.",
      tanya: "Ketuk semua stik. Berapa kelereng Karel?",
      objek: "stik",
      jumlah: 9,
      sukses: "Betul! Sembilan turus berarti sembilan kelereng. Kelompok lima diberi garis miring agar mudah dihitung.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "skala",
      jenis: "pilih",
      cerita: "Karel ingin menggambar siswa per kelas: 28, 24, 32, 20, 16, dan 12 siswa. Tiap baris paling banyak 10 simbol, dan semua simbol harus utuh. Keterangan mana yang Karel pilih?",
      opsi: [
        { teks: "1 simbol = 1 siswa", benar: false, umpan: "Kelas 3 punya 32 siswa, jadi butuh 32 simbol. Itu terlalu banyak untuk satu baris." },
        { teks: "1 simbol = 3 siswa", benar: false, umpan: "28 tidak habis dibagi 3, jadi ada simbol yang tidak utuh." },
        { teks: "1 simbol = 4 siswa", benar: true, umpan: "Betul! Semua data habis dibagi 4, dan baris terpanjang hanya 8 simbol. Hemat dan utuh." },
      ],
    },
    {
      id: "simbol",
      jenis: "isi",
      cerita: "Kelas 3 punya 32 siswa. Keterangannya 1 simbol = 4 siswa. Satu stik untuk satu simbol. Masukkan stik sebanyak simbol yang perlu digambar.",
      objek: "stik",
      target: 8,
      maks: 12,
      sukses: "Pas! 8 simbol × 4 = 32 siswa.",
      kurang: "Stiknya masih kurang. Berapa kali 4 sama dengan 32?",
      lebih: "Stiknya kelebihan. Ingat, satu simbol mewakili 4 siswa.",
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Karel membaca piktogram yang sudah jadi.",
      soal: [
        { teks: "Kelas 4 ada 5 simbol, 1 simbol = 4 siswa. Banyak siswa …", jawaban: "20", opsi: ["5", "20", "9"] },
        { teks: "Mainan Karel 6 + 4 + 3 + 1 + 9 = …", jawaban: "23", opsi: ["20", "25", "23"] },
        { teks: "Selisih kelereng 9 dan puzzle 1 …", jawaban: "8", opsi: ["8", "10", "9"] },
      ],
      sukses: "Hebat! Nilai sama dengan simbol dikali skala. Jumlah berarti ditambah semua, selisih berarti dikurangi.",
      salah: "Hmm, periksa keterangan simbolnya, lalu bedakan jumlah dan selisih. Coba lagi.",
    },
    {
      id: "lupa",
      jenis: "pilih",
      cerita: "Putu melihat 3 simbol di baris Kelas 6 dan berkata ada 3 siswa. Keterangannya 1 simbol = 4 siswa. Apa yang benar?",
      opsi: [
        { teks: "3 + 4 = 7 siswa", benar: false, umpan: "Simbol tidak ditambah skala. Tiap simbol mewakili 4 siswa, jadi dikali." },
        { teks: "3 × 4 = 12 siswa", benar: true, umpan: "Betul! Putu lupa membaca keterangan. Tiga simbol berarti 12 siswa." },
        { teks: "Tetap 3 siswa", benar: false, umpan: "Itu hanya banyak simbolnya. Baca baris keterangan dulu." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Turus membantu mencatat data. Piktogram memakai simbol, dan keterangan memberi tahu satu simbol mewakili berapa. Nilai sama dengan simbol dikali skala." },
  ],
};
