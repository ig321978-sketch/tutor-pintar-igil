import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 5 (Luas Daerah Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b5.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B5A: Ubin Alun-Alun (luas sebagai banyak petak satuan, baris dan kolom, petak dipindah luas tetap)
 *  - SKENARIO_K5B5B: Taman Bentuk-Bentuk (alas kali tinggi, tinggi bukan sisi miring, setengah, trapesium)
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

export const SKENARIO_K5B5B: DefSkenario = {
  id: "taman-bentuk-k5b5",
  judul: "Taman Bentuk-Bentuk",
  latar: "Bantu Komang menghitung luas petak taman.",
  tokoh: "🧒",
  nama: "Komang",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Komang. Taman sekolah kami dibagi menjadi petak berbentuk persegi, jajargenjang, segitiga, dan trapesium. Ayo bantu aku menghitung luas tiap petak dengan rumus!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tinggi",
      jenis: "pilih",
      cerita: "Petak jajargenjang beralas 8 m. Garis yang tegak lurus alas panjangnya 3 m, dan sisi miringnya 5 m. Untuk menghitung luas, alas dikali …",
      opsi: [
        { teks: "sisi miring 5 m", benar: false, umpan: "Sisi miring bukan tinggi. Yang dikali alas adalah garis yang tegak lurus alas." },
        { teks: "alas 8 m lagi", benar: false, umpan: "Alas tidak dikali alas. Luas jajargenjang adalah alas dikali tinggi yang tegak lurus." },
        { teks: "tinggi 3 m yang tegak lurus alas", benar: true, umpan: "Betul! Luasnya alas dikali tinggi, 8 × 3 = 24 m²." },
      ],
    },
    {
      id: "hitung-luas",
      jenis: "soal",
      cerita: "Komang menghitung luas dua petak taman.",
      soal: [
        { teks: "Petak persegi dengan sisi 4 m. Luasnya adalah … m².", jawaban: "16", opsi: ["8", "16", "20"] },
        { teks: "Petak jajargenjang beralas 8 m dan tinggi 3 m. Luasnya adalah … m².", jawaban: "24", opsi: ["24", "40", "11"] },
      ],
      sukses: "Hebat! Luas persegi dan jajargenjang dihitung dengan alas dikali tinggi.",
      salah: "Hmm, kalikan alas dengan tinggi yang tegak lurus. Coba lagi.",
    },
    {
      id: "segitiga",
      jenis: "hitung",
      cerita: "Petak segitiga beralas 6 m dan tinggi 4 m. Dua petak yang sama menyusun persegi panjang 6 m kali 4 m. Satu stik mewakili satu meter persegi.",
      tanya: "Ketuk stik sebanyak luas satu petak segitiga. Ada berapa meter persegi?",
      objek: "stik",
      jumlah: 12,
      sukses: "Betul! Luas satu segitiga ½ × 6 × 4 = 12 m².",
      salah: "Hmm, persegi panjangnya 24 m². Satu segitiga hanya setengahnya. Hitung lagi.",
    },
    {
      id: "trapesium",
      jenis: "isi",
      cerita: "Petak trapesium punya sisi sejajar 5 m dan 3 m, tingginya 4 m. Masukkan satu stik untuk tiap meter persegi luasnya.",
      objek: "stik",
      target: 16,
      maks: 20,
      sukses: "Pas! ½ × (5 + 3) × 4 = 16 m².",
      kurang: "Stiknya masih sedikit. Jumlahkan sisi sejajar, kalikan tinggi, lalu ambil setengahnya.",
      lebih: "Stiknya kebanyakan. Jangan lupa mengambil setengah dari jumlah sisi sejajar kali tinggi.",
    },
    {
      id: "lupa",
      jenis: "pilih",
      cerita: "Komang menghitung luas petak segitiga beralas 6 m dan tinggi 4 m, lalu menjawab 24 m². Apa yang terlewat?",
      opsi: [
        { teks: "dikali setengah, karena dua segitiga menyusun persegi panjang", benar: true, umpan: "Betul! 24 m² adalah luas persegi panjang. Satu segitiga setengahnya, yaitu 12 m²." },
        { teks: "ditambah tinggi lagi", benar: false, umpan: "Tinggi tidak ditambahkan. Yang terlewat adalah mengambil setengah dari alas kali tinggi." },
        { teks: "dikalikan sisi miring", benar: false, umpan: "Segitiga ini tidak memerlukan sisi miring. Luasnya setengah dari alas kali tinggi." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Luas persegi panjang, persegi, dan jajargenjang adalah alas kali tinggi. Luas segitiga, belah ketupat, dan layang-layang adalah setengah dari hasil kali, dan luas trapesium adalah setengah dikali jumlah sisi sejajar kali tinggi.",
    },
  ],
};
