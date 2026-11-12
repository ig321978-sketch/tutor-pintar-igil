import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 4 Bab 1 untuk perkalian, pembagian, serta faktor dan kelipatan (Sub-Bab G, H, I).
 * Tanpa jaringan, tanpa model bahasa. Bilangan dan kunci dicek di scripts/uji-skenario-umum.mjs dan
 * scripts/uji-lab-k4b1.mjs.
 *  - SKENARIO_K4B1G: Donat dan Koperasi (perkalian, array, menyimpan)
 *  - SKENARIO_K4B1H: Permen Pak Wicak   (pembagian sama banyak, bersusun, sisa, periksa dengan kali)
 *  - SKENARIO_K4B1I: Pameran Kelas 4    (pencapaian bab: mengulang Sub-Bab A sampai I)
 */

export const SKENARIO_K4B1G: DefSkenario = {
  id: "donat-koperasi-k4b1",
  judul: "Donat dan Koperasi",
  latar: "Bantu Helen menghitung donat, kelereng, dan pensil dengan perkalian.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Helen. Aku melihat 12 kotak donat, dan tiap kotak berisi 4 donat. Menjumlahkan satu-satu lama sekali. Bantu aku memakai perkalian, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "baris",
      jenis: "hitung",
      cerita: "Donat di satu baris rak ada 4. Tiap stik di bawah ini mewakili satu donat di baris itu.",
      tanya: "Ketuk semua stik. Ada berapa donat di satu baris?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Empat donat per baris. Ada 12 baris, jadi 12 × 4.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "kali",
      jenis: "soal",
      cerita: "Perkalian adalah penjumlahan berulang.",
      soal: [
        { teks: "12 × 4 = …", jawaban: "48", opsi: ["16", "48", "52"] },
        { teks: "14 × 5 = …", jawaban: "70", opsi: ["70", "19", "50"] },
        { teks: "12 × 8 = …", jawaban: "96", opsi: ["20", "104", "96"] },
      ],
      sukses: "Hebat! 12 × 4 = 48 donat, 14 × 5 = 70 kelereng, dan 12 × 8 = 96 pensil.",
      salah: "Hmm, kalikan dari satuan dan jangan lupa simpanannya. Coba lagi.",
    },
    {
      id: "panjang",
      jenis: "pilih",
      cerita: "Aku menguraikan 12 × 4 menjadi (10 + 2) × 4. Bagaimana cara melanjutkannya?",
      opsi: [
        { teks: "10 × 4 = 40 dan 2 × 4 = 8, lalu 40 + 8 = 48", benar: true, umpan: "Betul! Kalikan puluhan dan satuan dengan 4, lalu jumlahkan: 48." },
        { teks: "10 × 4 = 40 dan 2 + 4 = 6, lalu 40 + 6 = 46", benar: false, umpan: "Satuan 2 juga harus dikalikan dengan 4, bukan ditambah. 2 × 4 = 8." },
        { teks: "10 + 4 = 14 dan 2 + 4 = 6, lalu 14 + 6 = 20", benar: false, umpan: "Tanda perkalian tidak berubah menjadi tambah. Kalikan puluhan dan satuan dengan 4." },
      ],
    },
    {
      id: "simpan",
      jenis: "pilih",
      cerita: "14 × 5. Kolom satuan: 4 × 5 = 20. Apa yang ditulis?",
      opsi: [
        { teks: "Tulis 20 di satuan", benar: false, umpan: "Satu kolom hanya berisi satu angka. Tulis 0 dan simpan 2." },
        { teks: "Tulis 0, simpan 2 ke puluhan", benar: true, umpan: "Betul! Dua puluh satuan menjadi 2 puluhan yang disimpan. Lalu 1 × 5 + 2 = 7, hasilnya 70." },
        { teks: "Tulis 0, simpanan dibuang", benar: false, umpan: "Simpanan tidak boleh dibuang. Tanpa simpanan 2, hasilnya jadi 50, keliru." },
      ],
    },
    {
      id: "pak",
      jenis: "isi",
      cerita: "Koperasi sekolah menjual pensil: pak berisi 12 batang. Satu stik mewakili satu puluhan dari 96 pensil. Masukkan stik sebanyak angka puluhan pada 96.",
      objek: "stik",
      target: 9,
      maks: 12,
      sukses: "Pas! 96 punya 9 puluhan dan 6 satuan.",
      kurang: "Stiknya masih kurang. Lihat angka puluhan pada 96.",
      lebih: "Stiknya kelebihan. Lihat angka puluhan pada 96.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Perkalian bikin cepat. Ingat: kalikan dari satuan, dan simpanan selalu ikut dijumlahkan di puluhan." },
  ],
};

export const SKENARIO_K4B1H: DefSkenario = {
  id: "permen-wicak-k4b1",
  judul: "Permen Pak Wicak",
  latar: "Bantu Pak Wicak membagi permen sama banyak dan menghitung sisanya.",
  tokoh: "👨",
  nama: "Pak Wicak",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Pak Wicak. Aku punya 48 permen untuk Andi, Azizah, Drio, dan Candra. Tiap anak harus mendapat bagian sama banyak. Bantu aku membaginya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "wadah",
      jenis: "hitung",
      cerita: "Aku membagikan permen bergiliran ke 4 wadah. Tiap stik di bawah ini satu wadah.",
      tanya: "Ketuk semua stik. Ada berapa wadah?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Empat wadah. Tiap wadah akan mendapat bagian sama banyak.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "bagi",
      jenis: "soal",
      cerita: "Kita hitung dengan pembagian bersusun, dari puluhan ke satuan.",
      soal: [
        { teks: "48 : 4 = …", jawaban: "12", opsi: ["14", "12", "21"] },
        { teks: "81 : 3 = …", jawaban: "27", opsi: ["27", "72", "29"] },
        { teks: "55 : 5 = …", jawaban: "11", opsi: ["10", "15", "11"] },
      ],
      sukses: "Hebat! 48 : 4 = 12, 81 : 3 = 27, dan 55 : 5 = 11.",
      salah: "Hmm, mulai dari puluhan, lalu turunkan satuan. Coba lagi.",
    },
    {
      id: "sisa",
      jenis: "pilih",
      cerita: "Bagaimana jika 48 permen dibagi ke 5 wadah? 48 : 5 = 9 sisa 3. Apa artinya?",
      opsi: [
        { teks: "Habis dibagi, karena ada 9", benar: false, umpan: "Habis dibagi hanya bila sisanya nol. Di sini ada sisa 3." },
        { teks: "Tidak habis dibagi, masih sisa 3", benar: true, umpan: "Betul! Sisa 3 lebih kecil dari 5, jadi tidak bisa dibagi sama banyak lagi." },
        { teks: "Tiap wadah mendapat 3 permen", benar: false, umpan: "Tiga adalah sisanya. Tiap wadah mendapat 9 permen." },
      ],
    },
    {
      id: "kotak",
      jenis: "isi",
      cerita: "Ibu menaruh 81 kue ke kotak, tiap kotak 3 kue. Hasil bagi 81 : 3 adalah 27 kotak. Masukkan stik sebanyak angka satuan pada 27.",
      objek: "stik",
      target: 7,
      maks: 12,
      sukses: "Pas! Hasil bagi 27 punya angka satuan 7.",
      kurang: "Stiknya masih kurang. Lihat angka satuan pada 27.",
      lebih: "Stiknya kelebihan. Lihat angka satuan pada 27.",
    },
    {
      id: "periksa",
      jenis: "pilih",
      cerita: "Memeriksa 55 : 5 = 11. Cara memeriksa yang tepat adalah…",
      opsi: [
        { teks: "11 × 5 = 55, kembali ke bilangan awal", benar: true, umpan: "Betul! Hasil bagi dikali pembagi harus kembali ke bilangan yang dibagi." },
        { teks: "11 + 5 = 16, lebih dari 11", benar: false, umpan: "Pembagian dikembalikan dengan perkalian, bukan penjumlahan." },
        { teks: "55 − 11 = 44, hasilnya cocok", benar: false, umpan: "Memeriksa pembagian memakai perkalian: 11 × 5 = 55." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Semua permen terbagi adil. Ingat: bagi mulai dari puluhan, sisa nol berarti habis, dan periksa dengan kali." },
  ],
};

export const SKENARIO_K4B1I: DefSkenario = {
  id: "pameran-kelas4-k4b1",
  judul: "Pameran Kelas 4",
  latar: "Bantu Azizah menyiapkan pameran bilangan kelas 4 dari seluruh Bab 1.",
  tokoh: "👧",
  nama: "Azizah",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Azizah. Kelas kami membuat pameran bilangan. Ada bilangan besar, nilai tempat, dan operasi hitung. Bantu aku menyiapkannya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "bilangan",
      jenis: "soal",
      cerita: "Kartu pertama tentang membaca dan nilai tempat.",
      soal: [
        { teks: "6.002 dibaca enam ribu …", jawaban: "dua", opsi: ["dua", "dua ratus", "nol dua"] },
        { teks: "Angka 6 pada 8.463 bernilai …", jawaban: "60", opsi: ["600", "60", "6"] },
        { teks: "4.352 … 4.365", jawaban: "<", opsi: [">", "=", "<"] },
      ],
      sukses: "Hebat! Nol tidak dibaca, 6 di puluhan bernilai 60, dan puluhan menentukan: 4.352 < 4.365.",
      salah: "Hmm, lihat tempatnya dulu, dan bandingkan dari ribuan. Coba lagi.",
    },
    {
      id: "operasi",
      jenis: "soal",
      cerita: "Kartu kedua tentang menjumlah dan mengurang.",
      soal: [
        { teks: "189 + 245 = …", jawaban: "434", opsi: ["324", "434", "444"] },
        { teks: "241 − 129 = …", jawaban: "112", opsi: ["128", "122", "112"] },
        { teks: "14 × 5 = …", jawaban: "70", opsi: ["70", "50", "19"] },
      ],
      sukses: "Tepat! Tambah dengan menyimpan, kurang dengan mengambil, dan kali dengan menyimpan.",
      salah: "Hmm, mulai dari satuan, dan ingat simpanan atau mengambil. Coba lagi.",
    },
    {
      id: "uraian",
      jenis: "pilih",
      cerita: "Pameran punya 7.020 pengunjung. Uraian 7.020 menurut tempat adalah…",
      opsi: [
        { teks: "7.000 + 20", benar: false, umpan: "Jumlahnya benar, tetapi uraian menurut tempat menulis semua tempat, termasuk nol: 7.000 + 0 + 20 + 0." },
        { teks: "7.000 + 0 + 20 + 0", benar: true, umpan: "Betul! Nol tetap ditulis agar tempatnya terjaga." },
        { teks: "700 + 0 + 2 + 0", benar: false, umpan: "Nilainya bergeser satu tempat. Angka 7 di ribuan bernilai 7.000." },
      ],
    },
    {
      id: "bagi",
      jenis: "hitung",
      cerita: "Panitia membagi 48 kursi ke 4 baris sama banyak. Tiap stik di bawah ini satu kursi dalam satu baris.",
      tanya: "Ketuk semua stik. Ada berapa kursi per baris?",
      objek: "stik",
      jumlah: 12,
      sukses: "Betul! 48 : 4 = 12 kursi per baris, dan 12 × 4 = 48.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "faktor",
      jenis: "pilih",
      cerita: "Pameran punya 12 meja dan akan disusun dalam baris sama banyak. Mana yang bukan faktor 12?",
      opsi: [
        { teks: "5, karena 12 : 5 bersisa 2", benar: true, umpan: "Betul! Ada sisa, jadi 5 bukan faktor 12." },
        { teks: "4, karena 12 : 4 = 3 sisa 0", benar: false, umpan: "Empat habis membagi dua belas. Jadi 4 adalah faktor 12." },
        { teks: "6, karena 12 : 6 = 2 sisa 0", benar: false, umpan: "Enam habis membagi dua belas. Jadi 6 adalah faktor 12." },
      ],
    },
    {
      id: "kelipatan",
      jenis: "soal",
      cerita: "Kartu terakhir tentang kelipatan.",
      soal: [
        { teks: "Kelipatan 2 yang keempat adalah …", jawaban: "8", opsi: ["6", "8", "10"] },
        { teks: "Kelipatan 5 yang lebih dari 17 dan kurang dari 35 ada … bilangan.", jawaban: "3", opsi: ["3", "4", "2"] },
        { teks: "Kelipatan 3: 3, 6, 9, 12, …", jawaban: "15", opsi: ["14", "15", "18"] },
      ],
      sukses: "Tepat! Kelipatan didapat dari lompatan sama jauh: 20, 25, dan 30 ada di antara 17 dan 35.",
      salah: "Hmm, kelipatan adalah hasil kali berulang. Coba lagi.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Pameran kelas kami siap. Kita sudah membaca, membandingkan, menjumlah, mengurang, mengali, membagi, dan mencari faktor serta kelipatan." },
  ],
};
