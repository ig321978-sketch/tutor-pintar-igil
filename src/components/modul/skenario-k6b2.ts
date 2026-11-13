import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 6 Bab 2 (Rasio). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k6b2.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K6B2A: Artus dan Lahan Bibit (Part-to-Part Ratio Language, GCF Simplify Ratio, dan Ordered-Ratio Protocol)
 */

export const SKENARIO_K6B2A: DefSkenario = {
  id: "artus-bibit-k6b2",
  judul: "Artus dan Lahan Bibit",
  latar: "Bantu Artus menata bibit pohon dengan rasio.",
  tokoh: "👨",
  nama: "Artus",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Artus. Hari ini aku menata bibit di lahan: ada 4 pucuk merah dan 6 cemara. Rasio adalah perbandingan dua besaran yang sejenis. Ayo kita tulis rasionya, sederhanakan, dan jaga arahnya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "bahasa",
      jenis: "pilih",
      cerita: "Part-to-Part Ratio Language: rasio pucuk merah terhadap cemara ditulis 4 : 6. Rasio itu dibaca dengan kalimat setiap ... ada .... Kalimat mana yang benar?",
      opsi: [
        { teks: "Setiap 6 pucuk merah ada 4 cemara", benar: false, umpan: "Angkanya tertukar. Angka kiri, yaitu 4, untuk pucuk merah, jadi bukan 6 pucuk merah." },
        { teks: "Setiap 4 pucuk merah ada 6 cemara", benar: true, umpan: "Betul! 4 : 6 dibaca 4 banding 6: setiap 4 pucuk merah ada 6 cemara." },
        { teks: "Setiap 4 cemara ada 6 pucuk merah", benar: false, umpan: "Jenis bendanya tertukar. Pucuk merah disebut lebih dulu, jadi angka 4 milik pucuk merah." },
      ],
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Aku memasang tanda pada tiap pucuk merah. Satu stik mewakili satu pucuk merah.",
      tanya: "Ketuk semua stik. Ada berapa pucuk merah?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Ada 4 pucuk merah dan 6 cemara, jadi rasio pucuk merah terhadap cemara adalah 4 : 6.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu pucuk merah, lalu hitung lagi.",
    },
    {
      id: "sederhana",
      jenis: "soal",
      cerita: "GCF Simplify Ratio: sederhanakan rasio dengan membagi kedua suku memakai FPB, yaitu faktor persekutuan terbesar.",
      soal: [
        { teks: "4 : 6, kedua suku dibagi FPB 2. Suku kirinya menjadi …", jawaban: "2", opsi: ["4", "3", "2"] },
        { teks: "6 : 9, kedua suku dibagi FPB 3 menjadi 2 : …", jawaban: "3", opsi: ["3", "6", "9"] },
      ],
      sukses: "Hebat! 4 : 6 = 2 : 3 dan 6 : 9 = 2 : 3. Kedua suku dibagi dengan bilangan yang sama.",
      salah: "Hmm, bagi suku kiri dan suku kanan dengan FPB yang sama. Coba lagi.",
    },
    {
      id: "kelompok",
      jenis: "isi",
      cerita: "Di kebun lain, rasio pucuk merah terhadap cemara 2 : 3. Satu kelompok berisi 2 pucuk merah. Masukkan satu stik untuk tiap pucuk merah pada satu kelompok itu.",
      objek: "stik",
      target: 2,
      maks: 6,
      sukses: "Betul! Satu kelompok berisi 2 pucuk merah untuk 3 cemara: setiap 2 pucuk merah ada 3 cemara.",
      kurang: "Pucuk merahnya masih kurang. Tambah lagi sampai 2.",
      lebih: "Pucuk merahnya kelebihan. Kurangi sampai 2.",
    },
    {
      id: "arah",
      jenis: "pilih",
      cerita: "Ordered-Ratio Protocol: urutan penulisan mengikuti kata terhadap. Rasio pucuk merah terhadap cemara adalah 2 : 3. Bagaimana rasio cemara terhadap pucuk merah?",
      opsi: [
        { teks: "2 : 3, sama saja", benar: false, umpan: "Cemara disebut lebih dulu sekarang, jadi angka cemara, yaitu 3, ditulis di kiri." },
        { teks: "5 : 2, kedua bilangan dijumlahkan", benar: false, umpan: "Rasio membandingkan dua besaran yang sejenis, bukan menjumlahkannya." },
        { teks: "3 : 2, urutan dibalik", benar: true, umpan: "Betul! Cemara terhadap pucuk merah adalah 3 : 2. Angkanya sama, urutannya terbalik." },
      ],
    },
    {
      id: "salah",
      jenis: "pilih",
      cerita: "Adikku menulis 2 : 3 sama saja dengan 3 : 2 di bukunya. Apa yang salah dari tulisannya?",
      opsi: [
        { teks: "Arahnya diabaikan, padahal 2 : 3 dan 3 : 2 berbeda makna", benar: true, umpan: "Betul! 2 : 3 berarti setiap 2 pucuk merah ada 3 cemara, sedangkan 3 : 2 berarti setiap 3 pucuk merah ada 2 cemara." },
        { teks: "Angka 3 harus diganti 4", benar: false, umpan: "Angkanya tidak salah. Yang perlu diperiksa adalah urutan, yaitu siapa yang disebut lebih dulu." },
        { teks: "Hanya suku kiri yang dibagi", benar: false, umpan: "Tidak ada pembagian di sini. Masalahnya ada pada urutan kedua angka." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Part-to-Part Ratio Language: 4 : 6 dibaca setiap 4 pucuk merah ada 6 cemara. GCF Simplify Ratio: bagi kedua suku dengan FPB, sehingga 4 : 6 menjadi 2 : 3. Ordered-Ratio Protocol: 2 : 3 tidak sama dengan 3 : 2, jadi jaga arahnya.",
    },
  ],
};
