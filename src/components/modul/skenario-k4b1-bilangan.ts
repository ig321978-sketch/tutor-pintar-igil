import type { DefSkenario } from "./skenario-umum";

/**
 * Empat skenario Kelas 4 Bab 1 untuk bilangan sampai 10.000 (Sub-Bab A–D). Tanpa jaringan, tanpa model bahasa.
 * Bilangan dan kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b1.mjs.
 *  - SKENARIO_K4B1A: Helen di Minimarket (membaca dan menulis; nol tidak dibaca; seribu)
 *  - SKENARIO_K4B1B: Struk Belanja Azizah (nilai tempat, uraian, tabel digit)
 *  - SKENARIO_K4B1C: Harga di Pasar (membandingkan dari ribuan, tanda, mengurutkan)
 *  - SKENARIO_K4B1D: Uang Helen (komposisi, dekomposisi, nol, uraian cara lain)
 */

export const SKENARIO_K4B1A: DefSkenario = {
  id: "helen-minimarket-k4b1",
  judul: "Helen di Minimarket",
  latar: "Bantu Helen membaca dan menulis bilangan empat angka di minimarket.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Helen. Aku mengantar Ibu ke minimarket. Banyak label harga dan bilangan empat angka di sini. Bantu aku membacanya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "peti",
      jenis: "hitung",
      cerita: "Di gudang ada peti air mineral. Satu peti berisi seribu botol. Tiap stik di bawah ini mewakili satu peti.",
      tanya: "Ketuk semua peti. Ada berapa peti?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! Tiga peti, jadi ada 3.000 botol, dibaca tiga ribu.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "harga",
      jenis: "soal",
      cerita: "Minuman yang kuminta harganya Rp6.750.",
      soal: [
        { teks: "6.750 dibaca enam ribu tujuh ratus …", jawaban: "lima puluh", opsi: ["lima", "lima puluh", "lima ratus"] },
        { teks: "Angka di tempat ratusan pada 6.750 adalah …", jawaban: "7", opsi: ["6", "5", "7"] },
        { teks: "Angka di tempat satuan pada 6.750 adalah …", jawaban: "0", opsi: ["0", "5", "7"] },
      ],
      sukses: "Hebat! Enam ribu tujuh ratus lima puluh. Ratusannya 7 dan satuannya 0.",
      salah: "Hmm, hitung tempat dari kiri: ribuan, ratusan, puluhan, satuan. Coba lagi.",
    },
    {
      id: "nol",
      jenis: "pilih",
      cerita: "Jarak minimarket ke rumah nenek 7.003 meter. Bagaimana membacanya?",
      opsi: [
        { teks: "Tujuh ribu nol ratus nol puluh tiga", benar: false, umpan: "Tempat yang berisi nol tidak dibaca. Ratusan dan puluhannya nol, jadi dilewati." },
        { teks: "Tujuh ribu tiga", benar: true, umpan: "Betul! Ratusan dan puluhan berisi nol, jadi dilewati. Tujuh ribu tiga." },
        { teks: "Tujuh ratus tiga", benar: false, umpan: "Angka 7 ada di ribuan, bukan ratusan. Jadi dibaca tujuh ribu." },
      ],
    },
    {
      id: "seribu",
      jenis: "pilih",
      cerita: "Ibu membeli tepung 1.025 gram. Bagaimana membacanya?",
      opsi: [
        { teks: "Satu ribu dua puluh lima", benar: false, umpan: "Ribuan 1 dibaca seribu, bukan satu ribu." },
        { teks: "Seratus dua puluh lima", benar: false, umpan: "Angka 1 ada di ribuan. Ratusannya 0, jadi tidak ada kata ratus." },
        { teks: "Seribu dua puluh lima", benar: true, umpan: "Betul! Ribuan 1 dibaca seribu, dan ratusan 0 dilewati." },
      ],
    },
    {
      id: "bungkus",
      jenis: "isi",
      cerita: "Aku menyusun 3.286 dengan kemasan: 3 peti, 2 dus, beberapa bungkus, dan 6 benda. Masukkan stik sebanyak bungkusnya. Satu stik satu bungkus.",
      objek: "stik",
      target: 8,
      maks: 12,
      sukses: "Pas! Puluhan pada 3.286 adalah 8, jadi ada 8 bungkus.",
      kurang: "Stiknya masih kurang. Lihat angka di tempat puluhan pada 3.286.",
      lebih: "Stiknya kelebihan. Lihat angka di tempat puluhan pada 3.286.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Sekarang aku bisa membaca semua label. Ingat: baca dari kiri, nol tidak dibaca, dan ribuan 1 dibaca seribu." },
  ],
};

export const SKENARIO_K4B1B: DefSkenario = {
  id: "struk-azizah-k4b1",
  judul: "Struk Belanja Azizah",
  latar: "Bantu Azizah menentukan nilai tempat pada harga di struk belanja.",
  tokoh: "👧",
  nama: "Azizah",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Hai! Aku Azizah. Aku menjual kue. Slamet membeli kue seharga Rp7.350 dengan uang Rp9.500, dan mendapat kembalian Rp2.150. Bantu aku membaca nilai tempatnya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "nilai",
      jenis: "soal",
      cerita: "Lihat angka-angka pada struk belanjaku.",
      soal: [
        { teks: "Angka 7 pada 7.350 bernilai …", jawaban: "7.000", opsi: ["7", "700", "7.000"] },
        { teks: "Angka 5 pada 9.500 bernilai …", jawaban: "500", opsi: ["500", "5", "50"] },
        { teks: "Angka 2 pada 2.150 bernilai …", jawaban: "2.000", opsi: ["200", "2.000", "2"] },
      ],
      sukses: "Tepat! Tempat menentukan nilai: 7.000, 500, dan 2.000.",
      salah: "Hmm, lihat dulu tempat angkanya, lalu tentukan nilainya. Coba lagi.",
    },
    {
      id: "uraian",
      jenis: "pilih",
      cerita: "Aku ingin menulis uraian kembalian 2.150. Uraian mana yang benar?",
      opsi: [
        { teks: "2 + 1 + 5 + 0", benar: false, umpan: "Itu hanya digitnya. Uraian menulis nilai tiap tempat. Jumlahnya hanya 8, bukan 2.150." },
        { teks: "2.000 + 100 + 50 + 0", benar: true, umpan: "Betul! Nilai tiap tempat ditulis, termasuk nol. Jumlahnya 2.150." },
        { teks: "200 + 10 + 5 + 0", benar: false, umpan: "Nilainya bergeser satu tempat. Angka 2 di ribuan bernilai 2.000, bukan 200." },
      ],
    },
    {
      id: "puluhan-6",
      jenis: "hitung",
      cerita: "Pada 8.463, angka 6 ada di tempat puluhan. Tiap stik di bawah ini satu puluhan, yaitu sepuluh.",
      tanya: "Ketuk semua stik. Ada berapa puluhan?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Enam puluhan, jadi angka 6 pada 8.463 bernilai 60.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "tabel",
      jenis: "pilih",
      cerita: "Aku mengisi tabel nilai tempat untuk 7.812. Kolom ribuan diisi apa?",
      opsi: [
        { teks: "7000", benar: false, umpan: "Kolom ribuan sudah menunjukkan ribuan. Cukup tulis digitnya, yaitu 7." },
        { teks: "8", benar: false, umpan: "Angka 8 ada di ratusan. Kolom ribuan untuk 7.812 berisi 7." },
        { teks: "7", benar: true, umpan: "Betul! Tabel diisi digit: 7, 8, 1, 2." },
      ],
    },
    {
      id: "ratusan-6",
      jenis: "isi",
      cerita: "Pada 4.675, angka 6 ada di tempat ratusan. Masukkan stik sebanyak ratusannya. Satu stik satu ratusan.",
      objek: "stik",
      target: 6,
      maks: 10,
      sukses: "Pas! Enam ratusan, jadi angka 6 pada 4.675 bernilai 600.",
      kurang: "Stiknya masih kurang. Angka di ratusan pada 4.675 adalah 6.",
      lebih: "Stiknya kelebihan. Angka di ratusan pada 4.675 adalah 6.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Strukku sudah rapi. Ingat: tempat menentukan nilai, uraian menulis nilai tiap tempat, dan tabel diisi digit." },
  ],
};

export const SKENARIO_K4B1C: DefSkenario = {
  id: "harga-pasar-k4b1",
  judul: "Harga di Pasar",
  latar: "Bantu Slamet membandingkan harga dan mengurutkan tinggi gunung.",
  tokoh: "🧒",
  nama: "Slamet",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Slamet. Ibu membeli manggis Rp7.500, apel Rp6.750, dan bengkoang Rp8.750. Bantu aku membandingkan harganya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "mahal",
      jenis: "pilih",
      cerita: "Mana yang lebih mahal, bengkoang Rp8.750 atau manggis Rp7.500?",
      opsi: [
        { teks: "Bengkoang, karena ribuannya 8 dan 7", benar: true, umpan: "Betul! Ribuan dibandingkan dulu. Delapan lebih dari tujuh, jadi 8.750 lebih mahal." },
        { teks: "Manggis, karena satuannya sama", benar: false, umpan: "Membandingkan dimulai dari ribuan, bukan satuan. Ribuan 8 lebih dari 7." },
        { teks: "Sama mahal", benar: false, umpan: "Harganya berbeda. Ribuannya saja sudah berbeda: 8 dan 7." },
      ],
    },
    {
      id: "tanda",
      jenis: "soal",
      cerita: "Isi tanda lebih dari, kurang dari, atau sama dengan.",
      soal: [
        { teks: "8.750 … 7.500", jawaban: ">", opsi: ["<", ">", "="] },
        { teks: "4.352 … 4.365", jawaban: "<", opsi: [">", "=", "<"] },
        { teks: "8.765 … 8.765", jawaban: "=", opsi: ["=", "<", ">"] },
      ],
      sukses: "Hebat! Tanda terbuka ke bilangan yang lebih besar, dan sama dengan bila semua tempat sama.",
      salah: "Hmm, bandingkan dari ribuan dulu, lalu ke kanan. Coba lagi.",
    },
    {
      id: "penentu",
      jenis: "pilih",
      cerita: "Pada 4.352 dan 4.365, tempat mana yang menentukan?",
      opsi: [
        { teks: "Ribuan", benar: false, umpan: "Ribuannya sama, 4 dan 4. Lanjut ke tempat di kanannya." },
        { teks: "Satuan", benar: false, umpan: "Jangan mulai dari satuan. Puluhan sudah berbeda lebih dulu: 5 dan 6." },
        { teks: "Puluhan", benar: true, umpan: "Betul! Ribuan dan ratusan sama. Puluhan 5 dan 6 yang pertama berbeda." },
      ],
    },
    {
      id: "gunung-tinggi",
      jenis: "hitung",
      cerita: "Tinggi tiga gunung: Sinabung 2.460 m, Semeru 3.676 m, dan Rinjani 3.726 m. Tiap stik di bawah ini satu gunung yang tingginya lebih dari 3.000 meter.",
      tanya: "Ketuk semua stik. Ada berapa gunung yang lebih dari 3.000 meter?",
      objek: "stik",
      jumlah: 2,
      sukses: "Betul! Semeru dan Rinjani. Ribuannya 3, sedangkan Sinabung ribuannya 2.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "urut",
      jenis: "pilih",
      cerita: "Urutan naik tinggi ketiga gunung itu adalah…",
      opsi: [
        { teks: "3.726, 3.676, 2.460", benar: false, umpan: "Itu urutan turun, dari yang tertinggi. Urutan naik dimulai dari yang terkecil." },
        { teks: "2.460, 3.726, 3.676", benar: false, umpan: "Bandingkan 3.676 dan 3.726: ratusannya 6 dan 7, jadi 3.676 lebih kecil." },
        { teks: "2.460, 3.676, 3.726", benar: true, umpan: "Betul! Sinabung, Semeru, lalu Rinjani." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Aku bisa membandingkan harga dan tinggi gunung. Ingat: mulai dari ribuan, lalu ke kanan sampai menemukan tempat yang berbeda." },
  ],
};

export const SKENARIO_K4B1D: DefSkenario = {
  id: "uang-helen-k4b1",
  judul: "Uang Helen",
  latar: "Bantu Helen menyusun dan mengurai bilangan serta uang di warung.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Hai! Aku Helen. Hari ini aku menjaga warung. Aku perlu menyusun dan mengurai bilangan, juga uang. Bantu aku, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "susun",
      jenis: "pilih",
      cerita: "Catatan stok: 6.000 + 300 + 40 + 8. Jika disusun menjadi satu bilangan, hasilnya…",
      opsi: [
        { teks: "6.384", benar: false, umpan: "Angka puluhan dan satuan tertukar. 40 di puluhan dan 8 di satuan." },
        { teks: "6.348", benar: true, umpan: "Betul! Enam ribuan, tiga ratusan, empat puluhan, dan delapan satuan." },
        { teks: "6.438", benar: false, umpan: "Angka ratusan dan puluhan tertukar. 300 di ratusan dan 40 di puluhan." },
      ],
    },
    {
      id: "urai",
      jenis: "soal",
      cerita: "Sekarang uraikan bilangan menurut tempatnya.",
      soal: [
        { teks: "6.849 = 6.000 + … + 40 + 9", jawaban: "800", opsi: ["8", "800", "80"] },
        { teks: "6.035 = 6.000 + … + 30 + 5", jawaban: "0", opsi: ["300", "3", "0"] },
        { teks: "7.020 = 7.000 + 0 + … + 0", jawaban: "20", opsi: ["20", "2", "200"] },
      ],
      sukses: "Hebat! Nol tetap ditulis agar tempatnya terjaga.",
      salah: "Hmm, lihat angka di tempat yang kosong, lalu tulis nilainya. Coba lagi.",
    },
    {
      id: "uang",
      jenis: "isi",
      cerita: "Slamet membeli kue seharga Rp7.300. Ia memberiku selembar Rp5.000 dan selembar Rp2.000. Berapa keping Rp100 lagi? Satu stik satu keping.",
      objek: "stik",
      target: 3,
      maks: 10,
      sukses: "Pas! Rp5.000, Rp2.000, dan tiga keping Rp100 berjumlah Rp7.300.",
      kurang: "Masih kurang. Rp5.000 dan Rp2.000 baru Rp7.000. Kurangnya Rp300.",
      lebih: "Kelebihan. Yang kurang hanya Rp300, yaitu tiga keping Rp100.",
    },
    {
      id: "cara-lain",
      jenis: "pilih",
      cerita: "Slamet berkata, \"5.000 + 1.348 juga uraian dari 6.348.\" Benarkah?",
      opsi: [
        { teks: "Salah, uraian harus menurut tempat", benar: false, umpan: "Uraian boleh dengan cara lain. Yang penting jumlahnya sama dengan bilangan semula." },
        { teks: "Salah, jumlahnya 5.348", benar: false, umpan: "Jumlahkan lagi: 5.000 dan 1.348 berjumlah 6.348." },
        { teks: "Benar, jumlahnya 6.348", benar: true, umpan: "Betul! Jumlahkan semua sukunya. Hasilnya sama dengan bilangan semula, jadi uraian itu benar." },
      ],
    },
    {
      id: "sepuluh-ribu",
      jenis: "hitung",
      cerita: "Uang Rp10.000 ditukar dengan lembaran Rp1.000. Tiap stik di bawah ini satu lembar Rp1.000.",
      tanya: "Ketuk semua stik. Ada berapa lembar?",
      objek: "stik",
      jumlah: 10,
      sukses: "Betul! Sepuluh lembar Rp1.000 sama dengan Rp10.000.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Warungku rapi. Ingat: komposisi menyusun, dekomposisi mengurai, dan jumlahkan uraian untuk memeriksa." },
  ],
};
