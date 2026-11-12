import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 5 (Luas Daerah Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b5.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B5A: Ubin Alun-Alun (luas sebagai banyak petak satuan, baris dan kolom, petak dipindah luas tetap)
 */

export const SKENARIO_K5B5A: DefSkenario = {
  id: "ubin-alun-k5b5",
  judul: "Ubin Alun-Alun",
  latar: "Bantu Lukas menghitung ubin untuk menutup lantai.",
  tokoh: "👦",
  nama: "Lukas",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Lukas. Lantai pendapa Alun-Alun akan ditutup dengan ubin, begitu juga lantai pos jaga dan serambi. Ayo bantu aku menghitung luas daerah yang ditutup!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "arti",
      jenis: "pilih",
      cerita: "Pak Camat bertanya, luas daerah itu mengukur apa?",
      opsi: [
        { teks: "panjang jalan di tepi bangun", benar: false, umpan: "Panjang di tepi bukan luas. Luas mengukur daerah di dalam bangun." },
        { teks: "ukuran daerah di dalam batas bangun", benar: true, umpan: "Betul! Luas adalah ukuran daerah di dalam batas bangun, dihitung dengan petak satuan." },
        { teks: "banyak sudut bangun", benar: false, umpan: "Banyak sudut tidak memberi ukuran daerah. Luas dihitung dari petak yang menutup daerah." },
      ],
    },
    {
      id: "ubin-lantai",
      jenis: "soal",
      cerita: "Lukas menutup lantai dengan ubin yang luasnya 1 m². Tiap baris ditutup ubin sampai rapat.",
      soal: [
        { teks: "Lantai kamar 5 m dan 2 m. Banyak ubin yang menutup lantai adalah … buah.", jawaban: "10", opsi: ["7", "10", "14"] },
        { teks: "Lantai persegi, sisinya 3 m. Banyak ubin yang menutup lantai adalah … buah.", jawaban: "9", opsi: ["12", "6", "9"] },
      ],
      sukses: "Hebat! Banyak ubin sama dengan banyak baris dikali banyak petak tiap baris.",
      salah: "Hmm, hitung ubin tiap baris, lalu ulangi sebanyak baris. Coba lagi.",
    },
    {
      id: "pos",
      jenis: "hitung",
      cerita: "Lantai pos jaga 4 m dan 3 m ditutup ubin 1 m². Tiap ubin diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa ubin yang menutup lantai pos jaga?",
      objek: "stik",
      jumlah: 12,
      sukses: "Betul! Ada 12 ubin, sama dengan 4 × 3 = 12 petak satuan.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "serambi",
      jenis: "isi",
      cerita: "Serambi 6 m dan 3 m akan ditutup ubin 1 m². Masukkan satu stik untuk tiap ubin sampai seluruh serambi tertutup.",
      objek: "stik",
      target: 18,
      maks: 20,
      sukses: "Pas! 6 × 3 = 18 ubin. Luas serambi 18 m².",
      kurang: "Stiknya masih sedikit. Serambi punya 3 baris, tiap baris 6 ubin.",
      lebih: "Stiknya kebanyakan. Hitung 6 ubin tiap baris untuk 3 baris.",
    },
    {
      id: "yohana",
      jenis: "pilih",
      cerita: "Lantai di meja Lukas berbentuk tangga dari 6 petak. Satu petak menonjol dan ada satu lubang. Yohana memotong petak yang menonjol lalu menempelkannya di lubang sampai menjadi persegi panjang 2 baris dan 3 kolom. Luas sesudahnya …",
      opsi: [
        { teks: "bertambah satu petak karena petaknya ditempel", benar: false, umpan: "Petak itu hanya berpindah, tidak ada petak baru. Luasnya tidak bertambah." },
        { teks: "berkurang satu petak karena petaknya dipotong", benar: false, umpan: "Petak yang dipotong ditempel lagi, tidak ada yang hilang. Luasnya tidak berkurang." },
        { teks: "tetap enam petak, hanya berpindah tempat", benar: true, umpan: "Betul! Memotong lalu menempel tidak mengubah luas. Itulah cara Yohana." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Luas adalah ukuran daerah di dalam bangun, dihitung dengan petak satuan dan ditulis dengan cm² atau m². Persegi panjang punya baris dan kolom petak, dan petak yang dipindah tidak mengubah luas.",
    },
  ],
};
