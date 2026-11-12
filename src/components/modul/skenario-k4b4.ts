import type { DefSkenario } from "./skenario-umum";

/**
 * Dua skenario Kelas 4 Bab 4 (Pengukuran Luas dan Volume). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b4.mjs (dihitung ulang dari data).
 *  - SKENARIO_K4B4A: Meja Lipat Helen (menutup tanpa celah, satuan tidak baku, cm², m² = 10.000 cm²)
 *  - SKENARIO_K4B4B: Dapur Helen (pencapaian bab: luas, botol A = 4B = 10C, kubus satuan, 1 l = 1.000 ml, cm³ = ml, m³)
 */

export const SKENARIO_K4B4A: DefSkenario = {
  id: "meja-helen-k4b4",
  judul: "Meja Lipat Helen",
  latar: "Bantu Helen mengukur luas meja lipat dan kertas berpetaknya.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Helen. Aku ingin tahu luas meja lipatku. Aku punya beberapa lembar uang kertas mainan untuk menutupinya. Bantu aku, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "susun",
      jenis: "pilih",
      cerita: "Bagaimana uang kertas harus disusun di atas meja?",
      opsi: [
        { teks: "Boleh bertumpuk supaya cepat", benar: false, umpan: "Kalau bertumpuk, bagian meja yang sama terhitung dua kali. Hitungan luasnya jadi salah." },
        { teks: "Boleh ada celah sedikit", benar: false, umpan: "Celah berarti ada bagian meja yang tidak terhitung. Luasnya jadi kurang." },
        { teks: "Rapat tanpa celah dan tidak bertumpuk", benar: true, umpan: "Betul! Luas diukur dengan menutup permukaan tanpa celah dan tanpa bertumpuk." },
      ],
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Meja tertutup 2 baris uang kertas, tiap baris 3 lembar. Tiap stik di bawah ini satu lembar uang kertas.",
      tanya: "Ketuk semua stik. Berapa lembar uang kertas menutupi meja?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Luas meja sama dengan enam lembar uang kertas.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "buku",
      jenis: "pilih",
      cerita: "Kakak menutup meja yang sama dengan buku tulis. Hanya butuh 4 buku. Mengapa hasilnya berbeda dari 6 uang kertas?",
      opsi: [
        { teks: "Mejanya menjadi lebih sempit", benar: false, umpan: "Mejanya tetap sama. Yang berbeda adalah benda penutupnya." },
        { teks: "Buku lebih besar, jadi butuh lebih sedikit", benar: true, umpan: "Betul! Satuan tidak baku berbeda ukuran, jadi banyaknya berbeda. Karena itu kita butuh satuan baku." },
        { teks: "Kakak pasti salah menghitung", benar: false, umpan: "Kakak menghitung dengan benar. Coba pikirkan ukuran buku dan uang kertas." },
      ],
    },
    {
      id: "kisi",
      jenis: "isi",
      cerita: "Helen menggambar persegi panjang 3 baris, tiap baris 4 persegi, di kertas berpetak 1 cm. Masukkan stik sebanyak luasnya dalam cm². Satu stik satu persegi.",
      objek: "stik",
      target: 12,
      maks: 16,
      sukses: "Pas! 3 × 4 = 12. Luasnya 12 cm².",
      kurang: "Stiknya masih kurang. Ada 3 baris, tiap baris 4 persegi.",
      lebih: "Stiknya kelebihan. Hitung 3 baris, tiap baris 4 persegi.",
    },
    {
      id: "meter",
      jenis: "soal",
      cerita: "Untuk lantai kelas, Helen memakai persegi bersisi 1 m. Ingat: 1 m = 100 cm.",
      soal: [
        { teks: "1 m² = … cm²", jawaban: "10.000", opsi: ["100", "10.000", "1.000"] },
        { teks: "Lantai 3 m² = … cm²", jawaban: "30.000", opsi: ["30.000", "300", "3.000"] },
      ],
      sukses: "Hebat! 1 m² = 100 × 100 = 10.000 cm², jadi 3 m² = 30.000 cm².",
      salah: "Hmm, luas memakai dua sisi: 100 × 100. Coba lagi.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Luas diukur dengan menutup tanpa celah. Satuan tidak baku bisa berbeda hasilnya, jadi kita memakai cm² dan m². Ingat: 1 m² = 10.000 cm²." },
  ],
};

export const SKENARIO_K4B4B: DefSkenario = {
  id: "dapur-helen-k4b4",
  judul: "Dapur Helen",
  latar: "Bantu Helen mengukur luas dan volume di dapur ibu.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo lagi! Hari ini aku membantu ibu di dapur. Ada taplak meja, botol sabun, kubus gula, dan susu. Ayo ukur bersama!", tombol: "Ayo mulai! ➡" },
    {
      id: "taplak",
      jenis: "pilih",
      cerita: "Taplak meja makan luasnya 1 m². Berapa cm² luasnya?",
      opsi: [
        { teks: "1 m² = 100 cm², sebab 1 m = 100 cm", benar: false, umpan: "100 hanya panjang satu sisi. Luas memakai dua sisi: 100 × 100." },
        { teks: "1 m² = 1.000 cm²", benar: false, umpan: "Belum tepat. Hitung 100 × 100." },
        { teks: "1 m² = 10.000 cm²", benar: true, umpan: "Betul! 100 × 100 = 10.000 cm²." },
      ],
    },
    {
      id: "botol",
      jenis: "isi",
      cerita: "Botol sabun A diisi dari botol B sampai penuh. Masukkan stik sebanyak botol B yang dituang. Satu stik satu botol B.",
      objek: "stik",
      target: 4,
      maks: 12,
      sukses: "Pas! Botol A penuh dengan 4 botol B. Volume A = 4 kali volume B.",
      kurang: "Botol A belum penuh. Tambah botol B lagi.",
      lebih: "Tumpah! Botol A sudah penuh sebelum itu.",
    },
    {
      id: "takaran",
      jenis: "soal",
      cerita: "Botol A juga bisa diisi dari botol C yang lebih kecil, dan ada botol sanitizer besar dan kecil.",
      soal: [
        { teks: "Botol A penuh dengan … botol C", jawaban: "10", opsi: ["4", "8", "10"] },
        { teks: "Botol besar sanitizer = … botol kecil", jawaban: "8", opsi: ["8", "10", "4"] },
      ],
      sukses: "Hebat! A = 4 botol B = 10 botol C. Botol C lebih kecil, jadi butuh lebih banyak.",
      salah: "Hmm, ingat percobaan menuang. Coba lagi.",
    },
    {
      id: "gula",
      jenis: "hitung",
      cerita: "Ibu menyusun kubus gula bersisi 1 cm: 2 lapisan, tiap lapisan 2 baris berisi 3 kubus. Tiap stik satu kubus.",
      tanya: "Ketuk semua stik. Berapa cm³ volume susunan gula?",
      objek: "stik",
      jumlah: 12,
      sukses: "Betul! Satu lapisan 2 × 3 = 6 kubus, dua lapisan 12 kubus. Volumenya 12 cm³.",
      salah: "Hmm, ketuk tiap stik satu kali. Ingat ada dua lapisan.",
    },
    {
      id: "susu",
      jenis: "pilih",
      cerita: "Kotak susu bertuliskan 1.000 ml. Adik berkata susu itu 10 liter. Apa kata Helen?",
      opsi: [
        { teks: "Benar, sebab 1 l = 100 ml", benar: false, umpan: "1 l bukan 100 ml. Coba ingat isi gelas takar sampai penuh." },
        { teks: "Belum tepat, 1 l = 1.000 ml, jadi susu itu 1 l", benar: true, umpan: "Betul! 1.000 ml = 1 l." },
        { teks: "Belum tepat, susu itu 100 l", benar: false, umpan: "Seratus liter itu sangat banyak, sebesar bak mandi kecil." },
      ],
    },
    {
      id: "ubah",
      jenis: "soal",
      cerita: "Terakhir, Helen mengubah satuan volume.",
      soal: [
        { teks: "Kubus gula 12 cm³ = … ml", jawaban: "12", opsi: ["120", "1.200", "12"] },
        { teks: "Batu dicelup, air naik 50 ml. Volume batu … cm³", jawaban: "50", opsi: ["5", "50", "500"] },
        { teks: "Bak mandi 1 m³ = … l", jawaban: "1.000", opsi: ["1.000", "100", "10"] },
      ],
      sukses: "Hebat! 1 cm³ = 1 ml dan 1 m³ = 1.000 l.",
      salah: "Hmm, ingat 1 cm³ = 1 ml dan 1 m³ = 1.000 l. Coba lagi.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Luas menutup permukaan, memakai cm² dan m². Volume mengisi ruang, memakai ml, l, cm³, dan m³. Kamu sudah menuntaskan bab ini!" },
  ],
};
