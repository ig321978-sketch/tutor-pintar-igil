import type { DefSkenario } from "./skenario-umum";

/**
 * Empat skenario Kelas 3 Bab 3 (Pengukuran Panjang dan Berat). Tanpa jaringan, tanpa panggilan model bahasa.
 * Bilangan dan kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k3b3.mjs.
 *  - SKENARIO_K3B3A: Posyandu Alfa     (Sub-Bab A, mengukur panjang dengan penggaris dan meteran)
 *  - SKENARIO_K3B3B: Pita Meutia       (Sub-Bab B, meter dan sentimeter, menyambung dan memotong)
 *  - SKENARIO_K3B3C: Bahan Kue Meutia  (Sub-Bab C, menimbang dengan gram dan kilogram)
 *  - SKENARIO_K3B3D: Pasar Meutia      (Sub-Bab D, kilogram, ons, dan gram; sekaligus mengulang seluruh bab)
 */

export const SKENARIO_K3B3A: DefSkenario = {
  id: "posyandu-alfa-k3b3",
  judul: "Posyandu Alfa",
  latar: "Bantu Alfa mengukur panjang dengan penggaris dan meteran di posyandu.",
  tokoh: "🧒",
  nama: "Alfa",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Alfa. Hari ini aku membantu kader posyandu mengukur panjang benda dan tinggi badan. Bantu aku memilih alat ukur dan membaca hasilnya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "alat",
      jenis: "pilih",
      cerita: "Kader meminta tinggi badan adikku diukur. Tinggi adikku sekitar 90 cm. Alat ukur apa yang paling tepat?",
      opsi: [
        { teks: "Penggaris 30 cm", benar: false, umpan: "Penggaris hanya sampai 30 cm. Tinggi 90 cm lebih panjang, jadi perlu alat ukur yang lebih panjang." },
        { teks: "Timbangan", benar: false, umpan: "Timbangan mengukur berat, bukan panjang. Tinggi badan itu panjang." },
        { teks: "Meteran", benar: true, umpan: "Betul! Meteran lebih panjang dari penggaris, jadi cocok untuk tinggi badan. Satuannya sentimeter." },
      ],
    },
    {
      id: "nol",
      jenis: "soal",
      cerita: "Sebelum mengukur pensil, kita periksa dulu cara mengukurnya.",
      soal: [
        { teks: "Ujung benda diletakkan tepat di angka …", jawaban: "0", opsi: ["0", "1", "5"] },
        { teks: "Ujung kanan pensil di angka 15. Panjang pensil …", jawaban: "15 cm", opsi: ["5 cm", "10 cm", "15 cm"] },
        { teks: "Satuan baku panjang pada penggaris adalah …", jawaban: "sentimeter", opsi: ["gram", "detik", "sentimeter"] },
      ],
      sukses: "Hebat! Mulai dari angka nol, baca ujung yang lain, lalu tulis dengan satuan sentimeter.",
      salah: "Hmm, ingat: ujung benda di angka nol, lalu baca angka di ujung yang lain. Coba lagi.",
    },
    {
      id: "hitung-senti",
      jenis: "hitung",
      cerita: "Sebuah krayon panjangnya 9 cm. Anggap tiap batang stik di bawah ini satu sentimeter.",
      tanya: "Ketuk semua stik satu per satu. Ada berapa sentimeter?",
      objek: "stik",
      jumlah: 9,
      sukses: "Betul! Krayon itu panjangnya 9 cm.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "salah-mulai",
      jenis: "pilih",
      cerita: "Temanku meletakkan ujung penghapus di angka 3, lalu membaca ujung yang lain di angka 8 dan menulis panjangnya 8 cm. Apa yang kurang tepat?",
      opsi: [
        { teks: "Ujung benda harus tepat di angka 0", benar: true, umpan: "Betul! Kalau mulai dari angka 3, bacaan 8 terlalu besar. Dari angka 0 panjangnya hanya 5 cm." },
        { teks: "Tidak ada yang salah, 8 cm benar", benar: false, umpan: "Benda mulai dari angka 3, bukan 0. Bacaan 8 bukan panjang benda. Panjangnya 8 − 3 = 5 cm bila dihitung dari angka 0." },
        { teks: "Harusnya memakai meteran", benar: false, umpan: "Penghapus pendek, jadi penggaris sudah tepat. Yang salah adalah tempat mulainya." },
      ],
    },
    {
      id: "isi-batang",
      jenis: "isi",
      cerita: "Kader meminta batang kayu sepanjang 14 cm. Isi keranjang dengan stik sentimeter sebanyak panjang batang itu.",
      objek: "stik",
      target: 14,
      maks: 20,
      sukses: "Pas! Empat belas stik satu sentimeter panjangnya 14 cm.",
      kurang: "Stiknya masih kurang. Panjang batang 14 cm, jadi butuh 14 stik.",
      lebih: "Stiknya kelebihan. Panjang batang 14 cm, jadi cukup 14 stik.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kamu pandai memilih alat ukur dan mengukur dari angka nol. Ingat: baca ujung yang lain dan tulis satuannya." },
  ],
};

export const SKENARIO_K3B3B: DefSkenario = {
  id: "pita-meutia-k3b3",
  judul: "Pita Meutia",
  latar: "Bantu Meutia mengubah meter dan sentimeter, lalu menyambung dan memotong pita.",
  tokoh: "👧",
  nama: "Meutia",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Hai! Aku Meutia. Aku punya banyak pita dan kain. Bantu aku mengubah meter dan sentimeter, lalu menyambung dan memotongnya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "hubungan",
      jenis: "pilih",
      cerita: "Pita pertamaku panjangnya 3 m. Berapa sentimeter panjang pita itu?",
      opsi: [
        { teks: "30 cm", benar: false, umpan: "Itu hanya 3 × 10. Satu meter sama dengan 100 sentimeter, jadi kalikan dengan 100." },
        { teks: "3.000 cm", benar: false, umpan: "Itu 3 × 1.000. Satu meter sama dengan 100 sentimeter, bukan 1.000." },
        { teks: "300 cm", benar: true, umpan: "Betul! 3 m = 3 × 100 cm = 300 cm." },
      ],
    },
    {
      id: "ubah",
      jenis: "soal",
      cerita: "Kita periksa tiga hal tentang meter dan sentimeter.",
      soal: [
        { teks: "700 cm sama dengan …", jawaban: "7 m", opsi: ["70 m", "7 m", "700 m"] },
        { teks: "1 m 17 cm sama dengan …", jawaban: "117 cm", opsi: ["117 cm", "27 cm", "1.017 cm"] },
        { teks: "Untuk mengubah sentimeter ke meter, kita …", jawaban: "membagi 100", opsi: ["mengalikan 100", "membagi 100", "menambah 100"] },
      ],
      sukses: "Tepat! Meter ke sentimeter dikali 100, sentimeter ke meter dibagi 100.",
      salah: "Hmm, ingat: satu meter sama dengan seratus sentimeter. Coba lagi pelan-pelan.",
    },
    {
      id: "hitung-potong",
      jenis: "hitung",
      cerita: "Aku memotong pita menjadi potongan-potongan sepanjang 1 meter. Tiap stik di bawah ini satu potongan.",
      tanya: "Ketuk semua potongan. Ada berapa meter pita?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Enam potongan satu meter, jadi 6 m. Itu sama dengan 600 cm.",
      salah: "Hmm, ketuk tiap potongan satu kali, lalu hitung lagi.",
    },
    {
      id: "sambung",
      jenis: "pilih",
      cerita: "Aku menyambung pita 4 m 37 cm dengan pita 7 m 43 cm. Bagaimana cara menghitungnya?",
      opsi: [
        { teks: "Jumlahkan meter dengan meter dan sentimeter dengan sentimeter", benar: true, umpan: "Betul! 4 + 7 = 11 m dan 37 + 43 = 80 cm. Hasilnya 11 m 80 cm." },
        { teks: "Jumlahkan meter dengan sentimeter", benar: false, umpan: "Meter dan sentimeter tidak boleh dijumlahkan langsung. Satuan yang sama dijumlahkan dengan satuan yang sama." },
        { teks: "Kurangkan kedua pita", benar: false, umpan: "Pita disambung, jadi panjangnya ditambah, bukan dikurangi." },
      ],
    },
    {
      id: "isi-pita",
      jenis: "isi",
      cerita: "Aku butuh pita sepanjang 5 meter untuk hiasan. Isi keranjang dengan potongan pita satu meter.",
      objek: "stik",
      target: 5,
      maks: 10,
      sukses: "Pas! Lima potongan satu meter panjangnya 5 m, yaitu 500 cm.",
      kurang: "Potongannya masih kurang. Butuh 5 potongan satu meter.",
      lebih: "Potongannya kelebihan. Butuh 5 potongan satu meter saja.",
    },
    {
      id: "kain",
      jenis: "pilih",
      cerita: "Penjaga toko punya kain 75 m 80 cm dan menjual 38 m 45 cm. Berapa sisanya?",
      opsi: [
        { teks: "37 m 25 cm", benar: false, umpan: "Meternya benar, tetapi sentimeternya salah. 80 − 45 = 35, bukan 25." },
        { teks: "37 m 35 cm", benar: true, umpan: "Betul! 75 − 38 = 37 m dan 80 − 45 = 35 cm. Sisanya 37 m 35 cm." },
        { teks: "114 m 25 cm", benar: false, umpan: "Itu hasil penjumlahan. Kain dijual, jadi panjangnya dikurangi." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kamu pandai mengubah meter dan sentimeter, menyambung, dan memotong pita. Ingat: hitung satuan yang sama bersama-sama." },
  ],
};

export const SKENARIO_K3B3C: DefSkenario = {
  id: "bahan-kue-meutia-k3b3",
  judul: "Bahan Kue Meutia",
  latar: "Bantu Meutia menimbang bahan kue dengan gram dan kilogram.",
  tokoh: "👧",
  nama: "Meutia",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Meutia. Aku membantu ibu membuat kue dan harus menimbang gula, tepung, dan telur. Bantu aku menimbang dengan benar, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "nol",
      jenis: "pilih",
      cerita: "Layar timbangan digital menunjukkan 50 gram sebelum ada benda di atasnya. Apa yang harus kulakukan?",
      opsi: [
        { teks: "Langsung menimbang, lalu mengurangi 50 dari hasilnya", benar: false, umpan: "Cara itu bisa keliru. Timbangan harus mulai dari angka 0 sebelum benda diletakkan." },
        { teks: "Mengatur layar ke angka 0 dulu", benar: true, umpan: "Betul! Timbangan harus mulai dari angka 0. Baru letakkan bendanya." },
        { teks: "Menimbang saja, 50 gram tidak berpengaruh", benar: false, umpan: "50 gram itu berpengaruh. Bacaan jadi tertambah 50 gram dan hasilnya bukan berat benda yang sebenarnya." },
      ],
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Sekarang timbangan sudah mulai dari nol. Kita baca beratnya.",
      soal: [
        { teks: "Layar menunjukkan 250. Berat telur adalah …", jawaban: "250 g", opsi: ["250 g", "250 kg", "250 cm"] },
        { teks: "Gula 1.000 gram. Timbangan yang mudah dipakai untuk gram adalah …", jawaban: "timbangan digital", opsi: ["penggaris", "timbangan digital", "meteran"] },
        { teks: "Jarum timbangan duduk menunjuk angka 3. Beratnya …", jawaban: "3 kg", opsi: ["3 g", "3 kg", "3 cm"] },
      ],
      sukses: "Hebat! Gram dan kilogram dipakai untuk berat, sedangkan sentimeter untuk panjang.",
      salah: "Hmm, ingat: berat memakai gram atau kilogram. Coba lagi pelan-pelan.",
    },
    {
      id: "hitung-telur",
      jenis: "hitung",
      cerita: "Resep kue meminta beberapa butir telur yang sudah ditimbang. Tiap apel di bawah ini mewakili satu butir telur.",
      tanya: "Ketuk semua buahnya. Ada berapa butir telur?",
      objek: "apel",
      jumlah: 4,
      sukses: "Betul! Empat butir telur. Resep memakai bahan yang ditimbang dengan gram.",
      salah: "Hmm, ketuk tiap buah satu kali, lalu hitung lagi.",
    },
    {
      id: "pilih-satuan",
      jenis: "pilih",
      cerita: "Aku menimbang sekarung beras dan tepung sedikit untuk kue. Mana pasangan yang paling cocok?",
      opsi: [
        { teks: "Beras dalam kilogram, tepung dalam gram", benar: true, umpan: "Betul! Benda yang lebih berat memakai kilogram, benda ringan memakai gram." },
        { teks: "Beras dalam gram, tepung dalam kilogram", benar: false, umpan: "Terbalik. Sekarung beras berat, jadi cocok kilogram. Tepung sedikit ringan, jadi cocok gram." },
        { teks: "Keduanya dalam sentimeter", benar: false, umpan: "Sentimeter adalah satuan panjang. Berat memakai gram atau kilogram." },
      ],
    },
    {
      id: "isi-gula",
      jenis: "isi",
      cerita: "Gula ditimbang dalam kantong kecil. Satu kantong beratnya 100 gram. Isi keranjang dengan kantong sebanyak yang kita perlukan untuk 800 gram.",
      objek: "stik",
      target: 8,
      maks: 15,
      sukses: "Pas! Delapan kantong, masing-masing 100 gram, beratnya 800 gram.",
      kurang: "Kantongnya masih kurang. Butuh 8 kantong untuk 800 gram.",
      lebih: "Kantongnya kelebihan. Cukup 8 kantong untuk 800 gram.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kuenya jadi enak karena kamu menimbang dari angka nol. Ingat: gram untuk benda ringan, kilogram untuk benda berat." },
  ],
};

export const SKENARIO_K3B3D: DefSkenario = {
  id: "pasar-meutia-k3b3",
  judul: "Pasar Meutia (pencapaian bab)",
  latar: "Bantu Meutia di pasar: menimbang dengan bandul, mengubah kilogram dan gram, dan mengukur panjang kain.",
  tokoh: "👧",
  nama: "Meutia",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Meutia. Hari ini aku belanja di pasar. Pedagang memakai timbangan kodok dan aku juga membeli kain. Bantu aku menghitung berat dan panjangnya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "hubungan",
      jenis: "soal",
      cerita: "Pedagang menjelaskan hubungan satuan berat pada timbangan kodok.",
      soal: [
        { teks: "Satu kilogram sama dengan … gram.", jawaban: "1.000", opsi: ["10", "1.000", "100"] },
        { teks: "Satu kilogram sama dengan … ons.", jawaban: "10", opsi: ["10", "100", "1.000"] },
        { teks: "Satu ons sama dengan … gram.", jawaban: "100", opsi: ["1.000", "10", "100"] },
      ],
      sukses: "Tepat! 1 kg = 1.000 g = 10 ons, dan 1 ons = 100 g.",
      salah: "Hmm, ingat: satu kilogram seribu gram, sepuluh ons. Satu ons seratus gram.",
    },
    {
      id: "bandul",
      jenis: "pilih",
      cerita: "Aku membeli tepung 750 gram. Bandul mana yang membuat timbangan kodok seimbang?",
      opsi: [
        { teks: "½ kg dan 2 ons dan ½ ons", benar: true, umpan: "Betul! 500 + 200 + 50 = 750 gram. Susunan lain juga bisa, misalnya 7 bandul 1 ons dan 1 bandul ½ ons." },
        { teks: "½ kg dan 1 ons", benar: false, umpan: "500 + 100 = 600 gram, belum cukup 750 gram. Jumlah bandul harus tepat sama dengan berat tepung." },
        { teks: "1 kg", benar: false, umpan: "Bandul 1 kg beratnya 1.000 gram, lebih berat dari tepung 750 gram." },
      ],
    },
    {
      id: "ubah",
      jenis: "pilih",
      cerita: "Timbangan digital menunjukkan tepung lain 1.753 gram. Bagaimana menuliskannya dengan kilogram dan gram?",
      opsi: [
        { teks: "17 kg 53 g", benar: false, umpan: "Itu memotong angkanya. Ambil tiap 1.000 gram sebagai 1 kilogram: 1.753 − 1.000 = 753." },
        { teks: "1 kg 53 g", benar: false, umpan: "Angka 7 hilang. 1.753 g = 1.000 g + 753 g." },
        { teks: "1 kg 753 g", benar: true, umpan: "Betul! 1.753 g = 1.000 g + 753 g = 1 kg 753 g." },
      ],
    },
    {
      id: "hitung-mangga",
      jenis: "hitung",
      cerita: "Aku membeli mangga. Pedagang menimbang tiap kantong 1 kilogram. Tiap mangga di bawah ini mewakili satu kantong.",
      tanya: "Ketuk semua kantong mangga. Ada berapa kilogram?",
      objek: "mangga",
      jumlah: 8,
      sukses: "Betul! Delapan kantong satu kilogram, jadi 8 kg atau 8.000 gram. Kalau 4 kg dijual, sisanya 4 kg.",
      salah: "Hmm, ketuk tiap kantong satu kali, lalu hitung lagi.",
    },
    {
      id: "kain",
      jenis: "pilih",
      cerita: "Di toko kain, aku menyambung kain 4 m 37 cm dengan 7 m 43 cm. Berapa panjangnya?",
      opsi: [
        { teks: "11 m 80 cm", benar: true, umpan: "Betul! 4 + 7 = 11 m dan 37 + 43 = 80 cm. Satuan yang sama dijumlahkan." },
        { teks: "11 m 70 cm", benar: false, umpan: "Sentimeternya salah. 37 + 43 = 80, bukan 70." },
        { teks: "80 m 11 cm", benar: false, umpan: "Meter dan sentimeter tertukar. Meter dijumlahkan dengan meter dan sentimeter dengan sentimeter." },
      ],
    },
    {
      id: "isi-bandul",
      jenis: "isi",
      cerita: "Pedagang ingin menimbang 1 kilogram gula hanya dengan bandul 1 ons. Isi keranjang dengan bandul 1 ons sebanyak yang diperlukan.",
      objek: "stik",
      target: 10,
      maks: 15,
      sukses: "Pas! Sepuluh bandul 1 ons sama dengan 1.000 gram, yaitu 1 kg.",
      kurang: "Bandulnya masih kurang. Satu kilogram sama dengan sepuluh ons.",
      lebih: "Bandulnya kelebihan. Satu kilogram sama dengan sepuluh ons saja.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kamu menguasai panjang dan berat: mulai dari nol, pilih alat dan satuan, dan ubah satuan dengan benar." },
  ],
};
