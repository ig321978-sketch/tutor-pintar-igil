import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b1.mjs (dihitung ulang dari data buku).
 *  - SKENARIO_K5B1A: Papan Data Desa (menulis, banyak digit, digit di satu tempat, nilai digit, nol penjaga)
 */

export const SKENARIO_K5B1A: DefSkenario = {
  id: "data-desa-k5b1",
  judul: "Papan Data Desa",
  latar: "Bantu Yohana menulis dan membaca data penduduk di papan desa.",
  tokoh: "👧",
  nama: "Yohana",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Yohana. Hari ini aku membantu Pak Kepala Desa menulis data penduduk di papan. Bilangannya besar, sampai puluhan ribu. Kita pakai tabel nilai tempat, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tulis",
      jenis: "pilih",
      cerita: "Pak Kepala Desa berkata, banyak penduduk dua puluh enam ribu sembilan ratus tiga puluh dua orang. Bagaimana Yohana menulisnya?",
      opsi: [
        { teks: "2.693", benar: false, umpan: "Ada digit yang hilang. Dua puluh enam ribu berarti ada digit di puluh ribuan dan ribuan." },
        { teks: "26.932", benar: true, umpan: "Betul! Dua puluh enam ribu ditulis 26, lalu sembilan ratus tiga puluh dua ditulis 932." },
        { teks: "29.632", benar: false, umpan: "Digit ribuan dan ratusan tertukar. Periksa kolom demi kolom." },
      ],
    },
    {
      id: "digit",
      jenis: "hitung",
      cerita: "Penduduk perempuan ada 13.578 orang. Yohana menaruh satu stik untuk tiap digit yang ditulis.",
      tanya: "Ketuk semua stik. Ada berapa digit pada 13.578?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! Lima digit: puluh ribuan, ribuan, ratusan, puluhan, dan satuan.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "puluhan",
      jenis: "isi",
      cerita: "Penduduk laki-laki ada 13.354 orang. Masukkan stik sebanyak digit di tempat puluhan.",
      objek: "stik",
      target: 5,
      maks: 10,
      sukses: "Pas! Digit di tempat puluhan adalah 5, jadi nilainya 50.",
      kurang: "Stiknya masih kurang. Hitung tempat dari kanan: satuan, lalu puluhan.",
      lebih: "Stiknya kelebihan. Digit puluhan ada di tempat kedua dari kanan.",
    },
    {
      id: "nilai",
      jenis: "soal",
      cerita: "Yohana memeriksa nilai tiap digit di papan.",
      soal: [
        { teks: "Nilai digit 9 pada 26.932 …", jawaban: "900", opsi: ["9", "9.000", "900"] },
        { teks: "Digit di tempat puluh ribuan pada 13.578 …", jawaban: "1", opsi: ["3", "1", "5"] },
        { teks: "Nol pada 20.040 gunanya …", jawaban: "menjaga tempat", opsi: ["menjaga tempat", "dihapus saja", "diganti satu"] },
      ],
      sukses: "Hebat! Nilai digit bergantung pada tempatnya, dan nol menjaga tempat yang kosong.",
      salah: "Hmm, lihat lagi tempat digitnya. Coba lagi.",
    },
    {
      id: "nol",
      jenis: "pilih",
      cerita: "Teman Yohana mendengar empat puluh ribu tiga ratus lima puluh, lalu menulis 4.035. Apa yang benar?",
      opsi: [
        { teks: "4.035 sudah benar", benar: false, umpan: "4.035 dibaca empat ribu tiga puluh lima. Itu bilangan lain." },
        { teks: "Tulis 403.500", benar: false, umpan: "Itu terlalu besar, enam digit. Bilangan kita hanya puluhan ribu." },
        { teks: "Tulis 40.350, nol menjaga tempat", benar: true, umpan: "Betul! Nol di ribuan dan satuan membuat 4 tetap di puluh ribuan." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Papan desa sudah rapi. Tiap digit punya nilai menurut tempatnya, kita membaca per kelompok tiga digit, dan nol menjaga tempat agar digit tidak bergeser.",
    },
  ],
};
