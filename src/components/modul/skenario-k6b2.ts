import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 6 Bab 2 (Rasio). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k6b2.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K6B2A: Artus dan Lahan Bibit (Part-to-Part Ratio Language, GCF Simplify Ratio, dan Ordered-Ratio Protocol)
 *  - SKENARIO_K6B2B: Artus, Resep, dan Paket Bibit (Equivalent Ratio Table, Fraction-Equivalence Bridge, dan Unit Rate Method)
 *  - SKENARIO_K6B2C: Artus, Pasar Malam, dan Lomba Jalan (Additive Parts Sum, Part-to-Whole Ratio, dan Time-Rate Conversion)
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

export const SKENARIO_K6B2B: DefSkenario = {
  id: "artus-paket-k6b2",
  judul: "Artus, Resep, dan Paket Bibit",
  latar: "Bantu Artus menjaga rasio tetap senilai dan memilih paket bibit yang hemat.",
  tokoh: "👨",
  nama: "Artus",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Artus. Lahan 10 m² memuat 12 bibit, jadi rasio lahan terhadap bibit adalah 10 : 12. Kalau lahannya diperluas, bibitnya harus ikut berubah dengan rasio yang senilai. Ayo kita pakai tabel, pecahan senilai, dan nilai satuan!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tabel",
      jenis: "pilih",
      cerita: "Equivalent Ratio Table: kalikan kedua suku dengan bilangan yang sama. Lahan 10 m² dengan 12 bibit dikali 5. Baris baru yang senilai adalah …",
      opsi: [
        { teks: "15 m² dengan 17 bibit", benar: false, umpan: "Itu hasil menambah 5 pada kedua suku. Menambah bilangan sama tidak menjaga rasio. Kalikan, jangan tambah." },
        { teks: "50 m² dengan 60 bibit", benar: true, umpan: "Betul! 10 × 5 = 50 dan 12 × 5 = 60, jadi 10 : 12 senilai dengan 50 : 60." },
        { teks: "50 m² dengan 12 bibit", benar: false, umpan: "Hanya suku kiri yang dikali. Suku kanan, yaitu 12, juga harus dikali 5." },
      ],
    },
    {
      id: "kelompok",
      jenis: "hitung",
      cerita: "Baris baru itu sama dengan 5 kelompok yang masing-masing berisi 10 m² dan 12 bibit. Satu stik mewakili satu kelompok.",
      tanya: "Ketuk semua stik. Ada berapa kelompok?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! 5 kelompok, jadi 10 : 12 menjadi 50 : 60. Kedua suku dikali 5, dan rasionya tetap senilai.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu kelompok, lalu hitung lagi.",
    },
    {
      id: "jembatan",
      jenis: "soal",
      cerita: "Fraction-Equivalence Bridge: kesamaan rasio sama dengan pecahan senilai. 10/12 dan 30/36 dihubungkan pengali yang sama pada pembilang dan penyebut.",
      soal: [
        { teks: "10/12 = (10×3)/(12×3) = 30/…", jawaban: "36", opsi: ["15", "36", "22"] },
        { teks: "10/12 disederhanakan dengan FPB 2 menjadi …", jawaban: "5/6", opsi: ["5/6", "6/5", "10/6"] },
      ],
      sukses: "Hebat! 10/12 = 30/36 dan 10/12 = 5/6. Kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama.",
      salah: "Hmm, pembilang dan penyebut memakai pengali yang sama. Coba lagi.",
    },
    {
      id: "satuan",
      jenis: "pilih",
      cerita: "Unit Rate Method: cari nilai untuk satu satuan agar perbandingan adil. Paket 5 bibit harganya Rp40.000. Berapa harga untuk satu bibit?",
      opsi: [
        { teks: "Rp40.000 per bibit", benar: false, umpan: "Itu harga seluruh paket. Nilai satuan didapat dengan membagi harga dengan banyak bibit." },
        { teks: "Rp5.000 per bibit", benar: false, umpan: "Itu bukan hasil Rp40.000 dibagi 5. Coba bagi lagi." },
        { teks: "Rp8.000 per bibit", benar: true, umpan: "Betul! Rp40.000 dibagi 5 bibit sama dengan Rp8.000 per bibit. Satuannya Rp per bibit." },
      ],
    },
    {
      id: "kemasan",
      jenis: "isi",
      cerita: "Di gudang, 12 bibit dikemas dalam 3 jam, jadi 4 bibit per jam. Untuk satu jam, masukkan satu stik untuk tiap bibit yang dikemas.",
      objek: "stik",
      target: 4,
      maks: 8,
      sukses: "Betul! 12 bibit dalam 3 jam sama dengan 4 bibit per jam. Dalam 4 jam jadi 4 × 4 = 16 bibit.",
      kurang: "Bibitnya masih kurang. Tambah lagi sampai 4.",
      lebih: "Bibitnya kelebihan. Kurangi sampai 4.",
    },
    {
      id: "salah",
      jenis: "pilih",
      cerita: "Adikku mengubah 4 : 6 menjadi 6 : 8 dengan menambah 2 pada kedua suku. Apa yang salah dari caranya?",
      opsi: [
        { teks: "Menambah tidak menjaga rasio, harus dikali atau dibagi dengan bilangan sama", benar: true, umpan: "Betul! 4 : 6 senilai dengan 8 : 12 (dikali 2), bukan 6 : 8." },
        { teks: "Bilangan 2 harus diganti 3", benar: false, umpan: "Bukan soal angkanya. Yang salah adalah operasinya: menambah tidak menjaga rasio." },
        { teks: "Hanya suku kiri yang boleh dikali", benar: false, umpan: "Kedua suku harus diperlakukan sama, kiri dan kanan." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Equivalent Ratio Table: kalikan atau bagi kedua suku dengan bilangan yang sama. Fraction-Equivalence Bridge: kesamaan rasio adalah pecahan senilai, dicek dengan perkalian silang. Unit Rate Method: cari nilai untuk satu satuan agar perbandingan adil, dan tulis satuannya.",
    },
  ],
};

export const SKENARIO_K6B2C: DefSkenario = {
  id: "artus-pasar-k6b2",
  judul: "Artus, Pasar Malam, dan Lomba Jalan",
  latar: "Bantu Artus membagi jumlah menurut rasio dan menghitung laju dalam jam dan menit.",
  tokoh: "👨",
  nama: "Artus",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Artus. Hari ini aku menjual 72 bibit dengan rasio bibit hias terhadap bibit obat 4 : 5. Dengan rasio, jumlah seluruhnya bisa dibagi menurut bagiannya, dan laju bisa dihitung per jam. Ayo kita belajar penerapan rasio!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "bagian",
      jenis: "pilih",
      cerita: "Additive Parts Sum: jumlahkan suku rasio untuk mendapat banyak bagian seluruhnya. Rasio 4 : 5 berarti seluruhnya terbagi menjadi berapa bagian?",
      opsi: [
        { teks: "20 bagian", benar: false, umpan: "Itu hasil mengalikan 4 dengan 5. Suku rasio dijumlahkan, bukan dikali." },
        { teks: "9 bagian", benar: true, umpan: "Betul! 4 + 5 = 9 bagian seluruhnya. Satu bagian bernilai 72 ÷ 9 = 8." },
        { teks: "4 bagian", benar: false, umpan: "Itu hanya bagian untuk bibit hias. Seluruhnya adalah 4 ditambah 5." },
      ],
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Aku membagi 72 bibit ke dalam bagian-bagian sama besar. Satu stik mewakili satu bagian.",
      tanya: "Ketuk semua stik. Ada berapa bagian seluruhnya?",
      objek: "stik",
      jumlah: 9,
      sukses: "Betul! 9 bagian, dan 72 ÷ 9 = 8 bibit untuk tiap bagian. Bibit hias 4 × 8 = 32 dan bibit obat 5 × 8 = 40.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu bagian, lalu hitung lagi.",
    },
    {
      id: "seluruh",
      jenis: "soal",
      cerita: "Part-to-Whole Ratio: rasio bagian terhadap seluruhnya berbeda dari rasio bagian terhadap bagian.",
      soal: [
        { teks: "Hias : obat = 4 : 5. Hias terhadap seluruhnya = 4 : …", jawaban: "9", opsi: ["5", "9", "20"] },
        { teks: "Satu bagian 8, jadi bibit hias = 8 × 4 = …", jawaban: "32", opsi: ["32", "40", "36"] },
      ],
      sukses: "Hebat! 4 : 9 adalah bibit hias terhadap seluruhnya, dan bibit hias ada 32. Rasio 4 : 5 dan 4 : 9 berbeda makna.",
      salah: "Hmm, seluruhnya ada 4 + 5 bagian. Coba lagi.",
    },
    {
      id: "pasar",
      jenis: "pilih",
      cerita: "Di pasar malam, rasio anak-anak terhadap orang dewasa adalah 9 : 4 dan seluruh pengunjung ada 390. Berapa anak-anak?",
      opsi: [
        { teks: "120 anak-anak", benar: false, umpan: "Itu banyak orang dewasa, yaitu 4 × 30. Anak-anak mendapat 9 bagian." },
        { teks: "90 anak-anak", benar: false, umpan: "Itu bukan hasil 9 × 30. Hitung dulu satu bagian: 390 ÷ 13 = 30." },
        { teks: "270 anak-anak", benar: true, umpan: "Betul! 9 + 4 = 13 bagian, satu bagian 390 ÷ 13 = 30, jadi anak-anak 9 × 30 = 270." },
      ],
    },
    {
      id: "jalan",
      jenis: "isi",
      cerita: "Time-Rate Conversion: Banyu berlari 1 km dalam 30 menit. Satu jam sama dengan 60 menit. Masukkan satu stik untuk tiap kilometer yang ditempuh Banyu dalam satu jam.",
      objek: "stik",
      target: 2,
      maks: 6,
      sukses: "Betul! 60 menit adalah 2 kali 30 menit, jadi jaraknya 2 km per jam. Samakan satuan waktu dulu.",
      kurang: "Kilometernya masih kurang. Tambah lagi sampai 2.",
      lebih: "Kilometernya kelebihan. Kurangi sampai 2.",
    },
    {
      id: "waktu",
      jenis: "soal",
      cerita: "Dengan laju yang sama, kedua suku rasio dikali bilangan yang sama. Samakan dulu satuan waktu, lalu skala jarak atau kata.",
      soal: [
        { teks: "Banyu 1 km per 30 menit. Untuk 9 km: 9 × 30 = … menit", jawaban: "270", opsi: ["270", "39", "9"] },
        { teks: "Mengetik 1200 kata per jam. Dalam 180 menit, yaitu 3 jam, ada 3 × 1200 = … kata", jawaban: "3600", opsi: ["1200", "3600", "3000"] },
      ],
      sukses: "Tepat! 9 km butuh 270 menit, dan 3 jam mengetik menghasilkan 3600 kata. Satuan waktunya sudah disamakan.",
      salah: "Hmm, kalikan kedua suku dengan bilangan yang sama dan jaga satuan waktunya. Coba lagi.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Additive Parts Sum: jumlahkan suku rasio untuk mendapat banyak bagian, bagi seluruhnya, lalu kalikan. Part-to-Whole Ratio: bagian terhadap seluruhnya ditulis 4 : 9, berbeda dari 4 : 5. Time-Rate Conversion: samakan satuan waktu dulu, lalu skala jarak atau kata.",
    },
  ],
};
